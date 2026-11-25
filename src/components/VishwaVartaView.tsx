import React, { useState } from "react";
import { VishwaVartaCategory, AspectRatio } from "../types";
import { Flame, Copy, Check, Radio, Sparkles, TrendingUp, HelpCircle, AlertCircle, Quote } from "lucide-react";

interface VishwaVartaViewProps {
  customApiKey: string;
  onSetCustomApiKey: (key: string) => void;
  showToast: (msg: string) => void;
}

export const VishwaVartaView: React.FC<VishwaVartaViewProps> = ({
  customApiKey,
  onSetCustomApiKey,
  showToast,
}) => {
  const [category, setCategory] = useState<VishwaVartaCategory>(
    "Breaking News (Urgent/Trending)"
  );
  const [story, setStory] = useState(
    "Ancient Sanskrit inscription unearthed revealing precise planetary alignments documented 5000 years ago"
  );
  const [dim, setDim] = useState<AspectRatio>("9:16");
  const [vLevel, setVLevel] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [scriptResult, setScriptResult] = useState<string | null>(null);
  const [jsonResult, setJsonResult] = useState<any | null>(null);
  const [logicResult, setLogicResult] = useState<string | null>(null);

  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [copiedImagine, setCopiedImagine] = useState(false);

  const handleForgeViral = async () => {
    if (!story.trim()) {
      setError("Please describe the headline, discovery fact, or quiz question.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/vishwa-varta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          story,
          dim,
          version: vLevel,
          customApiKey: customApiKey.trim() || undefined,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Manifestation Failed.");
      }

      setScriptResult(data.prompt);
      setJsonResult(data.metadata);
      setLogicResult(data.logic);
      showToast("V12 Vishwa-Varta Asset Manifested!");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Vishwa-Varta engine encountered an error.");
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-2xl bg-gradient-to-r from-[#140b0b] via-[#201010] to-[#120808] border-t-4 border-t-[#ffcc33] border-x border-b border-[#361818] shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#e50914]/20 border border-[#e50914] flex items-center justify-center text-[#ff4d4d]">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-cinzel text-xl font-bold text-[#ffcc33]">
              IBD Vishwa-Varta
            </h2>
            <p className="text-[10px] font-mono-code text-[#ffcc33] tracking-[0.25em] uppercase">
              V12 — UNIVERSAL VIRAL ENGINE
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 bg-[#e50914] text-white px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider animate-pulse shadow-md">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            PRODUCTION LIVE
          </span>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#0a0707] p-6 rounded-2xl border border-[#261515]">
        <div className="md:col-span-3">
          <label className="block text-[10px] font-bold text-[#ffcc33] uppercase tracking-wider mb-2">
            Master API Key (Google AI Studio)
          </label>
          <input
            type="password"
            value={customApiKey}
            onChange={(e) => onSetCustomApiKey(e.target.value)}
            placeholder="Enter IBD Master Key (Optional if server key configured)..."
            className="w-full bg-[#000] border border-[#2a1717] focus:border-[#ffcc33] text-white px-4 py-3.5 rounded-xl text-sm outline-none"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-[#ffcc33] uppercase tracking-wider mb-2">
            Content Topic
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as VishwaVartaCategory)}
            className="w-full bg-[#000] border border-[#2a1717] focus:border-[#ffcc33] text-white px-4 py-3.5 rounded-xl text-sm outline-none cursor-pointer"
          >
            <option value="Breaking News (Urgent/Trending)">
              🚨 Breaking News (Trending)
            </option>
            <option value="Kya Aap Jante Hain (Facts/Discovery)">
              🤔 Kya Aap Jante Hain? (Facts)
            </option>
            <option value="Aaj Ka Sawal (Quiz/Interaction)">
              🧠 Aaj Ka Sawal (Quiz)
            </option>
            <option value="Suvichar (Wisdom/Quotes)">
              🌸 Suvichar (Daily Wisdom)
            </option>
            <option value="Festival Alert (Cultural/Celebration)">
              🪔 Festival / Event Alert
            </option>
            <option value="Devotional (Divine/Mythology)">
              🕉️ Devotional (Darshan)
            </option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-[#ffcc33] uppercase tracking-wider mb-2">
            Dimensions / Aspect Ratio
          </label>
          <select
            value={dim}
            onChange={(e) => setDim(e.target.value as AspectRatio)}
            className="w-full bg-[#000] border border-[#2a1717] focus:border-[#ffcc33] text-white px-4 py-3.5 rounded-xl text-sm outline-none cursor-pointer"
          >
            <option value="9:16">9:16 — Shorts / Reels / TikTok</option>
            <option value="4:5">4:5 — Instagram Portrait Feed</option>
            <option value="16:9">16:9 — YouTube / Banner</option>
            <option value="1:1">1:1 — Square Post</option>
          </select>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-[10px] font-bold text-[#ffcc33] uppercase tracking-wider">
              Evolution (V1 - V12)
            </label>
            <span className="text-xs font-mono-code font-bold text-[#ffcc33] px-2 py-0.5 bg-[#201010] rounded border border-[#3b1c1c]">
              V{vLevel}
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={12}
            value={vLevel}
            onChange={(e) => setVLevel(Number(e.target.value))}
            className="w-full h-2 bg-[#201010] rounded-lg appearance-none cursor-pointer accent-[#ffcc33]"
          />
          <div className="flex justify-between text-[10px] text-[#8c5a5a] mt-1 font-mono-code">
            <span>V1 Basic</span>
            <span>V6 Neural</span>
            <span>V12 Vishwa-Varta</span>
          </div>
        </div>

        <div className="md:col-span-3">
          <label className="block text-[10px] font-bold text-[#ffcc33] uppercase tracking-wider mb-2">
            Subject & Core Information (The Truth / Headline)
          </label>
          <textarea
            rows={3}
            value={story}
            onChange={(e) => setStory(e.target.value)}
            placeholder="Enter the news headline, the fact, or the question..."
            className="w-full bg-[#000] border border-[#2a1717] focus:border-[#ffcc33] text-white p-4 rounded-xl text-sm outline-none"
          />
        </div>

        {error && (
          <div className="md:col-span-3 p-4 rounded-xl bg-[#2b0808] border border-[#ff4444] text-[#ff8888] text-xs">
            {error}
          </div>
        )}

        <div className="md:col-span-3">
          <button
            type="button"
            onClick={handleForgeViral}
            disabled={isLoading}
            className="w-full py-4.5 bg-gradient-to-r from-[#b8860b] via-[#ffcc33] to-[#ffd700] text-black font-black text-base uppercase rounded-xl cursor-pointer hover:brightness-110 active:scale-[0.99] transition-all shadow-lg shadow-[#ffcc33]/20 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Sparkles className="w-5 h-5 animate-spin" />
                <span>Manifesting Vishwa-Varta Asset...</span>
              </>
            ) : (
              <>
                <Flame className="w-5 h-5" />
                <span>Forge IBD Viral Asset</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results Display */}
      {scriptResult && (
        <div className="space-y-6 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-400">
          <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-[#2d1b1b]">
            <h3 className="font-cinzel text-lg font-bold text-[#ffcc33]">
              V12 Viral Production Manifestation
            </h3>
            <button
              type="button"
              onClick={() =>
                copyToClipboard(`/imagine prompt: ${scriptResult}`, "imagine")
              }
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#201010] hover:bg-[#301818] border border-[#ffcc33]/40 text-xs font-mono-code text-[#ffcc33]"
            >
              {copiedImagine ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>/imagine format</span>
            </button>
          </div>

          {/* Master Script Card */}
          <div className="p-6 rounded-2xl bg-[#090606] border-l-4 border-l-[#ffcc33] border-y border-r border-[#261515] relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono-code text-[#ffcc33] uppercase tracking-wider font-bold">
                IBD Production Master Script
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(scriptResult, "script")}
                className="flex items-center gap-1 px-3 py-1 bg-[#1f1010] hover:bg-[#301818] text-xs text-[#ffcc33] rounded-lg border border-[#4a2222]"
              >
                {copiedScript ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copiedScript ? "Copied" : "Copy Script"}</span>
              </button>
            </div>
            <div className="text-sm md:text-base leading-relaxed text-[#ffcc33] font-medium whitespace-pre-wrap selection:bg-[#ffcc33]/30">
              {scriptResult}
            </div>
          </div>

          {/* Viral Strategy Headlines Banner if available */}
          {jsonResult?.viralHeadlines && jsonResult.viralHeadlines.length > 0 && (
            <div className="p-5 rounded-2xl bg-[#140c0c] border border-[#3b1d1d] space-y-3">
              <span className="text-xs font-mono-code uppercase text-[#ff8888] font-bold block">
                🔥 3 Viral High-CTR Hindi Headlines
              </span>
              <div className="space-y-2">
                {jsonResult.viralHeadlines.map((h: string, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-black/50 border border-[#2b1616] text-sm text-[#f0e8dc]"
                  >
                    <span className="font-semibold">{h}</span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(h);
                        showToast(`Copied Headline ${idx + 1}`);
                      }}
                      className="text-xs text-[#ffcc33] hover:underline shrink-0 ml-2"
                    >
                      Copy
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Viral Strategy & Metadata JSON Block */}
          {jsonResult && (
            <div className="p-6 rounded-2xl bg-[#040404] border border-[#261515]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono-code text-[#6abf6a] uppercase tracking-wider font-bold">
                  Viral Strategy, Hashtags & SEO Tags (JSON)
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
