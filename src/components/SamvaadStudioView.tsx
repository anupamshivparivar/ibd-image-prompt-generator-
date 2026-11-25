import React, { useState } from "react";
import { SamvaadCategory, ChronoLightingTime, SamvaadMood, AspectRatio } from "../types";
import { Sparkles, Copy, Check, MessageSquare, Sun, Sunset, Moon, Sunrise, Heart, MessageCircle } from "lucide-react";

interface SamvaadStudioViewProps {
  customApiKey: string;
  onSetCustomApiKey: (key: string) => void;
  showToast: (msg: string) => void;
}

export const SamvaadStudioView: React.FC<SamvaadStudioViewProps> = ({
  customApiKey,
  onSetCustomApiKey,
  showToast,
}) => {
  const [category, setCategory] = useState<SamvaadCategory>(
    "Community Miracle (Viewer Story)"
  );
  const [timeOfDay, setTimeOfDay] = useState<ChronoLightingTime>(
    "Brahma Muhurta (Soft Gold/Pink 4AM)"
  );
  const [dim, setDim] = useState<AspectRatio>("9:16");
  const [mood, setMood] = useState<SamvaadMood>("Peaceful & Meditative");
  const [story, setStory] = useState(
    "A devotee in Uttarakhand shares how during an intense storm, a sudden radiant warm light in their home temple filled them with absolute fearless peace and protection"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [scriptResult, setScriptResult] = useState<string | null>(null);
  const [jsonResult, setJsonResult] = useState<any | null>(null);
  const [logicResult, setLogicResult] = useState<string | null>(null);

  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [copiedImagine, setCopiedImagine] = useState(false);

  const handleManifestSamvaad = async () => {
    if (!story.trim()) {
      setError("Please describe the devotee story, spiritual inquiry, or daily update.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/samvaad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          timeOfDay,
          dim,
          mood,
          story,
          customApiKey: customApiKey.trim() || undefined,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Siddhi Failure. Check Connection.");
      }

      setScriptResult(data.prompt);
      setJsonResult(data.metadata);
      setLogicResult(data.logic);
      showToast("V13 Samvaad Asset Manifested!");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to manifest Samvaad community asset.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, type: "script" | "json" | "imagine") => {
    navigator.clipboard.writeText(text);
    if (type === "script") {
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 2000);
    } else if (type === "json") {
      setCopiedJson(true);
      setTimeout(() => setCopiedJson(false), 2000);
    } else {
      setCopiedImagine(true);
      setTimeout(() => setCopiedImagine(false), 2000);
    }
    showToast("Copied to clipboard!");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Studio Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-2xl bg-gradient-to-r from-[#170f07] via-[#24170a] to-[#120817] border border-[#d4af37]/30 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff9933] to-[#d4af37] flex items-center justify-center text-black font-black">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-cinzel text-xl font-bold text-[#f4cf6a]">
              IBD Samvaad Studio
            </h2>
            <p className="text-[10px] font-mono-code text-[#ff9933] tracking-[0.25em] uppercase">
              V13 — THE COMMUNITY ARCHITECT
            </p>
          </div>
        </div>
        <span className="self-start sm:self-auto bg-gradient-to-r from-[#ff9933] to-[#d4af37] text-black px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-md">
          V-ALPHA 13 ACTIVE
        </span>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-[#0a0807] p-6 rounded-2xl border border-[#261e16]">
        <div className="md:col-span-4">
          <label className="block text-[10px] font-bold text-[#d4af37] uppercase tracking-wider mb-2">
            Sovereign API Access (Gemini Key)
          </label>
          <input
            type="password"
            value={customApiKey}
            onChange={(e) => onSetCustomApiKey(e.target.value)}
            placeholder="Connect to V13 Intelligence Field (Optional if server key configured)..."
            className="w-full bg-[#000] border border-[#2b2116] focus:border-[#d4af37] text-white px-4 py-3.5 rounded-xl text-sm outline-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-[10px] font-bold text-[#d4af37] uppercase tracking-wider mb-2">
            Community Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as SamvaadCategory)}
            className="w-full bg-[#000] border border-[#2b2116] focus:border-[#d4af37] text-white px-4 py-3.5 rounded-xl text-sm outline-none cursor-pointer"
          >
            <option value="Community Miracle (Viewer Story)">
              ✨ Community Miracle (Bhakt Anubhav)
            </option>
            <option value="Daily Darshan (Time-Sync Art)">
              🪔 Daily Darshan (Time-Sync Art)
            </option>
            <option value="Shastra Q&A (Visual Knowledge)">
              📜 Shastra Q&A (Siddhanta)
            </option>
            <option value="Live Stream Overlay (Branded)">
              🔴 Live Stream Overlay
            </option>
            <option value="Breaking News (Trending)">
              ⚡ Breaking News (Trending)
            </option>
            <option value="Health/Ayurveda Tip">
              🌿 Health / Ayurveda Tip
            </option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-[10px] font-bold text-[#d4af37] uppercase tracking-wider mb-2">
            Chrono-Lighting (Astronomical Time of Day)
          </label>
          <select
            value={timeOfDay}
            onChange={(e) => setTimeOfDay(e.target.value as ChronoLightingTime)}
            className="w-full bg-[#000] border border-[#2b2116] focus:border-[#d4af37] text-white px-4 py-3.5 rounded-xl text-sm outline-none cursor-pointer"
          >
            <option value="Brahma Muhurta (Soft Gold/Pink 4AM)">
              🌅 Brahma Muhurta (Dawn 4 AM - Rose Gold)
            </option>
            <option value="Abhijit Muhurta (Sharp/Overhead 12PM)">
              ☀️ Abhijit Muhurta (Noon 12 PM - Solar Zenith)
            </option>
            <option value="Sandhya (Warm Amber/Purple 6PM)">
              🌇 Sandhya Kaal (Twilight 6 PM - Amber/Purple)
            </option>
            <option value="Nishita Kaal (Midnight Blue/Moonlight)">
              🌙 Nishita Kaal (Midnight - Deep Celestial Lapis)
            </option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-[10px] font-bold text-[#d4af37] uppercase tracking-wider mb-2">
            Dimensions
          </label>
          <select
            value={dim}
            onChange={(e) => setDim(e.target.value as AspectRatio)}
            className="w-full bg-[#000] border border-[#2b2116] focus:border-[#d4af37] text-white px-4 py-3.5 rounded-xl text-sm outline-none cursor-pointer"
          >
            <option value="9:16">9:16 — Vertical (Shorts / Reels / TikTok)</option>
            <option value="4:5">4:5 — Instagram Portrait Feed</option>
            <option value="16:9">16:9 — YouTube / Banner</option>
            <option value="1:1">1:1 — Square Post</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-[10px] font-bold text-[#d4af37] uppercase tracking-wider mb-2">
            Target Audience Mood
          </label>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value as SamvaadMood)}
            className="w-full bg-[#000] border border-[#2b2116] focus:border-[#d4af37] text-white px-4 py-3.5 rounded-xl text-sm outline-none cursor-pointer"
          >
            <option value="Peaceful & Meditative">Peaceful & Meditative</option>
            <option value="Powerful & High-Energy">Powerful & High-Energy</option>
            <option value="Nostalgic & Emotional">Nostalgic & Emotional</option>
            <option value="Curious & Intellectual">Curious & Intellectual</option>
          </select>
        </div>

        <div className="md:col-span-4">
          <label className="block text-[10px] font-bold text-[#d4af37] uppercase tracking-wider mb-2">
            User Story / Question / Daily Update (Bhakt Experience)
          </label>
          <textarea
            rows={3}
            value={story}
            onChange={(e) => setStory(e.target.value)}
            placeholder="Enter the viewer's story, the spiritual question, or the daily update..."
            className="w-full bg-[#000] border border-[#2b2116] focus:border-[#d4af37] text-white p-4 rounded-xl text-sm outline-none"
          />
        </div>

        {error && (
          <div className="md:col-span-4 p-4 rounded-xl bg-[#260808] border border-[#ff4444] text-[#ff8888] text-xs">
            {error}
          </div>
        )}

        <div className="md:col-span-4">
          <button
            type="button"
            onClick={handleManifestSamvaad}
            disabled={isLoading}
            className="w-full py-4.5 bg-[#d4af37] hover:bg-white text-black font-black text-base uppercase rounded-xl cursor-pointer hover:tracking-wider active:scale-[0.99] transition-all shadow-xl shadow-[#d4af37]/20 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Sparkles className="w-5 h-5 animate-spin" />
                <span>Synchronizing Community Intelligence...</span>
              </>
            ) : (
              <>
                <MessageCircle className="w-5 h-5" />
                <span>Manifest Samvaad Asset</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results Display */}
      {scriptResult && (
        <div className="space-y-6 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-400">
          <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-[#291f16]">
            <h3 className="font-cinzel text-lg font-bold text-[#ffd700]">
              V13 Samvaad Production Results
            </h3>
            <button
              type="button"
              onClick={() =>
                copyToClipboard(`/imagine prompt: ${scriptResult}`, "imagine")
              }
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#20170e] hover:bg-[#2e2114] border border-[#d4af37]/40 text-xs font-mono-code text-[#ffd700]"
            >
              {copiedImagine ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>/imagine format</span>
            </button>
          </div>

          {/* Master Script Card */}
          <div className="p-6 rounded-2xl bg-[#090705] border-l-5 border-l-[#d4af37] border-y border-r border-[#261e16] relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono-code text-[#d4af37] uppercase tracking-wider font-bold">
                V13 Production Master Script
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(scriptResult, "script")}
                className="flex items-center gap-1 px-3 py-1 bg-[#1a140d] hover:bg-[#2b2014] text-xs text-[#ffd700] rounded-lg border border-[#3b2d1c]"
              >
                {copiedScript ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copiedScript ? "Copied" : "Copy Script"}</span>
              </button>
            </div>
            <div className="text-sm md:text-base leading-relaxed text-[#ffd700] font-medium whitespace-pre-wrap selection:bg-[#d4af37]/30">
              {scriptResult}
            </div>
          </div>

          {/* Community Pinned Comment & Heart Reply Cards */}
          {jsonResult && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jsonResult.pinnedCommentIdea && (
                <div className="p-5 rounded-2xl bg-[#140e08] border border-[#382613] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono-code uppercase text-[#ff9933] font-bold flex items-center gap-1.5">
                      📌 Pinned Community Comment Idea
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(jsonResult.pinnedCommentIdea);
                        showToast("Copied Pinned Comment!");
                      }}
                      className="text-xs text-[#ffd700] hover:underline"
                    >
                      Copy
                    </button>
                  </div>
                  <p className="text-xs text-[#eedec8] leading-relaxed italic bg-black/40 p-3 rounded-lg border border-[#2b1e10]">
                    {jsonResult.pinnedCommentIdea}
                  </p>
                </div>
              )}

              {jsonResult.heartWinningReply && (
                <div className="p-5 rounded-2xl bg-[#140817] border border-[#30163b] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono-code uppercase text-[#d685ff] font-bold flex items-center gap-1.5">
                      ❤️ Heart-Winning Creator Reply
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(jsonResult.heartWinningReply);
                        showToast("Copied Heart Reply!");
                      }}
                      className="text-xs text-[#d685ff] hover:underline"
                    >
                      Copy
                    </button>
                  </div>
                  <p className="text-xs text-[#eedec8] leading-relaxed italic bg-black/40 p-3 rounded-lg border border-[#251030]">
                    {jsonResult.heartWinningReply}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Community Engagement Strategy (JSON) */}
          {jsonResult && (
            <div className="p-6 rounded-2xl bg-[#040404] border border-[#261e16]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono-code text-[#6abf6a] uppercase tracking-wider font-bold">
                  Community Engagement Strategy (JSON)
                </span>
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(JSON.stringify(jsonResult, null, 2), "json")
                  }
                  className="flex items-center gap-1 px-3 py-1 bg-[#0d1f0d] hover:bg-[#152e15] text-xs text-[#6abf6a] rounded-lg border border-[#1f4a1f]"
                >
                  {copiedJson ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedJson ? "Copied JSON" : "Copy JSON"}</span>
                </button>
              </div>
              <pre className="text-xs font-mono-code text-[#6abf6a] overflow-x-auto p-4 rounded-xl bg-black/60 border border-[#1b2b1b]">
                {JSON.stringify(jsonResult, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
