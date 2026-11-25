import React, { useState } from "react";
import { DharmaStrategy, TargetScriptLanguage, AspectRatio } from "../types";
import { Globe, Copy, Check, Sparkles, BookOpen, Layers, ShieldCheck, Film } from "lucide-react";

interface DharmaSutraViewProps {
  customApiKey: string;
  onSetCustomApiKey: (key: string) => void;
  showToast: (msg: string) => void;
}

export const DharmaSutraView: React.FC<DharmaSutraViewProps> = ({
  customApiKey,
  onSetCustomApiKey,
  showToast,
}) => {
  const [strategy, setStrategy] = useState<DharmaStrategy>(
    "Heartland (Traditional/Regional Focus)"
  );
  const [language, setLanguage] = useState<TargetScriptLanguage>(
    "Hindi/Sanskrit (Devanagari)"
  );
  const [dim, setDim] = useState<AspectRatio>("16:9");
  const [series, setSeries] = useState("Ramayana Katha-Vahini Series Part 1");
  const [story, setStory] = useState(
    "Lord Rama in profound contemplation on the shores of the southern ocean before constructing the Setu bridge, with golden arrows and bow, twilight ocean mist, and celestial starlight"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [scriptResult, setScriptResult] = useState<string | null>(null);
  const [jsonResult, setJsonResult] = useState<any | null>(null);
  const [logicResult, setLogicResult] = useState<string | null>(null);

  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [copiedImagine, setCopiedImagine] = useState(false);

  const handleManifestDharma = async () => {
    if (!story.trim()) {
      setError("Please define the scriptural intent or episode context.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/dharma-sutra", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          strategy,
          language,
          dim,
          series,
          story,
          customApiKey: customApiKey.trim() || undefined,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Sutra Failure. Check Key.");
      }

      setScriptResult(data.prompt);
      setJsonResult(data.metadata);
      setLogicResult(data.logic);
      showToast("V14 Dharma-Sutra Asset Manifested!");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to weave global narrative asset.");
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-2xl bg-gradient-to-r from-[#170e08] via-[#24130a] to-[#140a0a] border-t-2 border-t-[#ff4500] border-x border-b border-[#301c10] shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff4500] to-[#ffcc33] flex items-center justify-center text-black font-black">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-cinzel text-xl font-bold text-[#ffcc33]">
              IBD Dharma-Sutra
            </h2>
            <p className="text-[10px] font-mono-code text-[#ff8c00] tracking-[0.25em] uppercase">
              V14 — GLOBAL NARRATIVE ARCHITECT
            </p>
          </div>
        </div>
        <span className="self-start sm:self-auto border border-[#ffcc33] text-[#ffcc33] px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
          GLOBAL PRODUCTION ACTIVE
        </span>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-[#080706] p-6 rounded-2xl border border-[#211912]">
        <div className="md:col-span-4">
          <label className="block text-[10px] font-bold text-[#ffcc33] uppercase tracking-wider mb-2">
            Sovereign API Key (Gemini)
          </label>
          <input
            type="password"
            value={customApiKey}
            onChange={(e) => onSetCustomApiKey(e.target.value)}
            placeholder="Connect to V14 Dharma-Sutra Engine (Optional if server key configured)..."
            className="w-full bg-[#000] border border-[#2c2014] focus:border-[#ffcc33] text-white px-4 py-3.5 rounded-xl text-sm outline-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-[10px] font-bold text-[#ffcc33] uppercase tracking-wider mb-2">
            Global Narrative Strategy
          </label>
          <select
            value={strategy}
            onChange={(e) => setStrategy(e.target.value as DharmaStrategy)}
            className="w-full bg-[#000] border border-[#2c2014] focus:border-[#ffcc33] text-white px-4 py-3.5 rounded-xl text-sm outline-none cursor-pointer"
          >
            <option value="Heartland (Traditional/Regional Focus)">
              🪔 Heartland (Traditional / Vibrant Focus)
            </option>
            <option value="Diaspora (Modern/Minimalist Focus)">
              ✨ Diaspora (Modern / High-Concept Minimalist)
            </option>
            <option value="Series Continuity (Episodic Style)">
              🎬 Series Key Art (Katha-Vahini Continuity)
            </option>
            <option value="Educational (Infographic/Gyan)">
              📐 Gyan-Chitra (Infographic Architecture)
            </option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-[10px] font-bold text-[#ffcc33] uppercase tracking-wider mb-2">
            Target Language (Script Layout Optimization)
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as TargetScriptLanguage)}
            className="w-full bg-[#000] border border-[#2c2014] focus:border-[#ffcc33] text-white px-4 py-3.5 rounded-xl text-sm outline-none cursor-pointer"
          >
            <option value="Hindi/Sanskrit (Devanagari)">
              ॐ Hindi / Sanskrit (Devanagari Layout)
            </option>
            <option value="English (Latin)">
              🌐 English (Universal Latin Layout)
            </option>
            <option value="Tamil/Telugu/Kannada (Dravidian)">
              🏛️ South Indian (Dravidian Layout)
            </option>
            <option value="Bengali/Gujarati (Regional)">
              📜 East / West Indian Scripts
            </option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-[10px] font-bold text-[#ffcc33] uppercase tracking-wider mb-2">
            Aspect Ratio
          </label>
          <select
            value={dim}
            onChange={(e) => setDim(e.target.value as AspectRatio)}
            className="w-full bg-[#000] border border-[#2c2014] focus:border-[#ffcc33] text-white px-4 py-3.5 rounded-xl text-sm outline-none cursor-pointer"
          >
            <option value="16:9">YouTube / Global Banner (16:9)</option>
            <option value="9:16">Shorts / Reels / Story (9:16)</option>
            <option value="4:5">Instagram Feed (4:5)</option>
            <option value="2:3">Cinema Theatrical Poster (2:3)</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-[10px] font-bold text-[#ffcc33] uppercase tracking-wider mb-2">
            Visual DNA (Series Consistency)
          </label>
          <input
            type="text"
            value={series}
            onChange={(e) => setSeries(e.target.value)}
            placeholder="e.g. Ramayana Part 1, Health Series 2026..."
            className="w-full bg-[#000] border border-[#2c2014] focus:border-[#ffcc33] text-white px-4 py-3.5 rounded-xl text-sm outline-none"
          />
        </div>

        <div className="md:col-span-4">
          <label className="block text-[10px] font-bold text-[#ffcc33] uppercase tracking-wider mb-2">
            The Scriptural Intent (Narrative Thread)
          </label>
          <textarea
            rows={3}
            value={story}
            onChange={(e) => setStory(e.target.value)}
            placeholder="Define the narrative thread, the global message, or the episode context..."
            className="w-full bg-[#000] border border-[#2c2014] focus:border-[#ffcc33] text-white p-4 rounded-xl text-sm outline-none"
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
            onClick={handleManifestDharma}
            disabled={isLoading}
            className="w-full py-5 bg-white hover:bg-[#ffcc33] text-black font-black text-lg uppercase rounded-2xl cursor-pointer hover:tracking-widest active:scale-[0.99] transition-all shadow-xl shadow-[#ffcc33]/20 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Sparkles className="w-5 h-5 animate-spin" />
                <span>Weaving the Global Narrative...</span>
              </>
            ) : (
              <>
                <Film className="w-5 h-5" />
                <span>Manifest Dharma-Sutra Asset</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results Display */}
      {scriptResult && (
        <div className="space-y-6 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-400">
          <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-[#291b12]">
            <h3 className="font-cinzel text-lg font-bold text-[#ffcc33]">
              V14 Global Master Key-Art
            </h3>
            <button
              type="button"
              onClick={() =>
                copyToClipboard(`/imagine prompt: ${scriptResult}`, "imagine")
              }
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#20140c] hover:bg-[#301c10] border border-[#ffcc33]/40 text-xs font-mono-code text-[#ffcc33]"
            >
              {copiedImagine ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>/imagine format</span>
            </button>
          </div>

          {/* Master Script Card */}
          <div className="p-6 rounded-2xl bg-[#080605] border border-[#2b1d12] relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono-code text-[#ffcc33] uppercase tracking-wider font-bold">
                V14 Global Master Script
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(scriptResult, "script")}
                className="flex items-center gap-1 px-3 py-1 bg-[#1a120a] hover:bg-[#2b1c10] text-xs text-[#ffcc33] rounded-lg border border-[#3b2716]"
              >
                {copiedScript ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copiedScript ? "Copied" : "Copy Script"}</span>
              </button>
            </div>
            <div className="text-sm md:text-base leading-relaxed text-[#ffcc33] font-medium whitespace-pre-wrap selection:bg-[#ffcc33]/30">
              {scriptResult}
            </div>
          </div>

          {/* Safe-Zones and Cultural Hooks Summary */}
          {jsonResult && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jsonResult.languageSafeZones && (
                <div className="p-5 rounded-2xl bg-[#140e08] border border-[#362211] space-y-2">
                  <span className="text-xs font-mono-code uppercase text-[#ffaa00] font-bold block">
                    📐 Script Typography Safe-Zones ({language})
                  </span>
                  <p className="text-xs text-[#dcd7cc] leading-relaxed">
                    {jsonResult.languageSafeZones}
                  </p>
                </div>
              )}

              {jsonResult.culturalHooks && (
                <div className="p-5 rounded-2xl bg-[#170a0a] border border-[#381616] space-y-2">
                  <span className="text-xs font-mono-code uppercase text-[#ff7777] font-bold block">
                    🌍 Cultural Resonance Hooks
                  </span>
                  <p className="text-xs text-[#dcd7cc] leading-relaxed">
                    {jsonResult.culturalHooks}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Linguistic & Cultural Context (JSON) */}
          {jsonResult && (
            <div className="p-6 rounded-2xl bg-[#040404] border border-[#211912]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono-code text-[#6abf6a] uppercase tracking-wider font-bold">
                  Linguistic & Cultural Context (JSON)
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
