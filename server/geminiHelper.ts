import { GoogleGenAI } from "@google/genai";

interface CallGeminiParams {
  apiKey?: string;
  systemInstruction?: string;
  prompt: string;
  timeoutMs?: number;
}

/**
 * Robust Gemini caller with multi-model fallback:
 * 1. Tries primary model: `gemini-3.7-flash`
 * 2. If 503 / 429 / overloaded, falls back to `gemini-3.1-flash-lite`
 * 3. Handles timeouts and network errors gracefully without crashing
 */
export async function callGeminiSafe({
  apiKey,
  systemInstruction,
  prompt,
  timeoutMs = 12000,
}: CallGeminiParams): Promise<string | null> {
  const effectiveKey = apiKey?.trim() || process.env.GEMINI_API_KEY;
  if (!effectiveKey) {
    return null;
  }

  const ai = new GoogleGenAI({
    apiKey: effectiveKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });

  // Prioritized models for text tasks with high availability:
  const modelsToTry = [
    "gemini-3.7-flash",
    "gemini-3.1-flash-lite",
    "gemini-3.1-pro-preview",
  ];

  for (const model of modelsToTry) {
    // Retry up to 2 times per model for transient errors with backoff
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const fullContents = systemInstruction
          ? `${systemInstruction}\n\nUser Request:\n${prompt}`
          : prompt;

        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error(`Timeout after ${timeoutMs}ms`)), timeoutMs)
        );

        const generatePromise = ai.models.generateContent({
          model,
          contents: [
            {
              role: "user",
              parts: [{ text: fullContents }],
            },
          ],
        });

        const response: any = await Promise.race([generatePromise, timeoutPromise]);
        const text = response?.text?.trim();
        if (text) {
          return text;
        }
      } catch (err: any) {
        const isTransient =
          err?.status === 503 ||
          err?.status === 429 ||
          err?.message?.includes("503") ||
          err?.message?.includes("429") ||
          err?.message?.includes("UNAVAILABLE") ||
          err?.message?.includes("high demand") ||
          err?.message?.includes("RESOURCE_EXHAUSTED") ||
          err?.message?.includes("Timeout");

        console.warn(
          `Gemini [${model}] attempt ${attempt} error: ${err?.message || "unknown"}.${
            isTransient ? " Backing off..." : ""
          }`
        );

        if (isTransient && attempt < 2) {
          // Exponential backoff delay (350ms)
          await new Promise((resolve) => setTimeout(resolve, 350 * attempt));
          continue;
        }
        break; // proceed to next model in hierarchy
      }
    }
  }

  return null;
}

/**
 * Robust parser for structured sections (LOGIC, PROMPT, NEGATIVE, JSON)
 */
export function parseStructuredAIResponse(
  fullText: string,
  defaults: {
    defaultLogic?: string;
    defaultNegative?: string;
    defaultMetadata?: any;
  }
) {
  let logic = defaults.defaultLogic || "";
  let promptText = "";
  let negative = defaults.defaultNegative || "";
  let metadataJson = defaults.defaultMetadata || null;

  try {
    if (fullText.includes("PROMPT:")) {
      const parts = fullText.split("PROMPT:");
      if (parts[0].includes("LOGIC:")) {
        logic = parts[0].replace("LOGIC:", "").trim();
      }

      const afterPrompt = parts[1];
      if (afterPrompt.includes("NEGATIVE:")) {
        const promptAndRest = afterPrompt.split("NEGATIVE:");
        promptText = promptAndRest[0].trim();
        const afterNegative = promptAndRest[1];

        if (afterNegative.includes("JSON:")) {
          const negAndJson = afterNegative.split("JSON:");
          negative = negAndJson[0].trim();
          const jsonStr = cleanJsonString(negAndJson[1]);
          try {
            metadataJson = JSON.parse(jsonStr);
          } catch {}
        } else {
          negative = afterNegative.trim();
        }
      } else if (afterPrompt.includes("JSON:")) {
        const promptAndJson = afterPrompt.split("JSON:");
        promptText = promptAndJson[0].trim();
        const jsonStr = cleanJsonString(promptAndJson[1]);
        try {
          metadataJson = JSON.parse(jsonStr);
        } catch {}
      } else {
        promptText = afterPrompt.trim();
      }
    } else {
      promptText = fullText;
    }
  } catch (parseErr) {
    console.warn("Parse warning:", parseErr);
    if (!promptText) promptText = fullText;
  }

  return {
    logic: logic || defaults.defaultLogic || "Synthesized via IBD Alchemical Engine.",
    prompt: promptText || fullText,
    negative:
      negative ||
      defaults.defaultNegative ||
      "extra limbs, deformed hands, western superhero tropes, cartoon, plastic textures, oversaturated anime style, bad anatomy, modern clothing",
    metadata: metadataJson || defaults.defaultMetadata,
  };
}

function cleanJsonString(raw: string): string {
  return raw
    .replace(/^```json/im, "")
    .replace(/^```/im, "")
    .replace(/```$/m, "")
    .replace(/```/g, "")
    .trim();
}
