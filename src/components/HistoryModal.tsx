import React, { useState } from "react";
import { SavedPromptItem } from "../types";
import {
  X,
  Bookmark,
  Search,
  Trash2,
  Copy,
  Check,
  Download,
  Sparkles,
  Star,
  Zap,
  FileText,
} from "lucide-react";

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedPrompts: SavedPromptItem[];
  onSelectPrompt: (item: SavedPromptItem) => void;
  onDeletePrompt: (id: string) => void;
  onClearAll: () => void;
  onToggleFavorite: (id: string) => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  savedPrompts,
  onSelectPrompt,
  onDeletePrompt,
  onClearAll,
  onToggleFavorite,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const filtered = savedPrompts.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.subject.toLowerCase().includes(q) ||
      item.story.toLowerCase().includes(q) ||
      item.prompt.toLowerCase().includes(q) ||
      item.targetEngine.toLowerCase().includes(q)
    );
  });

  const handleCopyText = (key: string, text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  const handleExportAll = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(savedPrompts, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute(
      "download",
      `IBD_Prompts_Sanctuary_Export_${Date.now()}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#110e0a] border border-[#382d1c] rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#262016] flex items-center justify-between bg-[#17130d]">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-[#d4af37]" />
            <h2 className="font-cinzel text-base font-bold text-[#f4cf6a]">
              Prompts Sanctuary ({savedPrompts.length})
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {savedPrompts.length > 0 && (
              <>
                <button
                  type="button"
                  onClick={handleExportAll}
                  className="px-2.5 py-1.5 rounded-lg bg-[#1a140d] hover:bg-[#261f14] border border-[#382d1c] text-xs font-mono-code text-[#d4af37] flex items-center gap-1 transition-colors"
                  title="Export All to JSON"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export All</span>
                </button>
                <button
                  type="button"
                  onClick={onClearAll}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-mono-code text-[#ff6b6b] hover:bg-[#2b1010] transition-colors"
                  title="Clear All History"
                >
                  Clear All
                </button>
              </>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#a39274] hover:text-[#f4cf6a] hover:bg-[#251e16] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-[#262016] bg-[#0c0906]">
          <div className="relative">
            <Search className="w-4 h-4 text-[#8c7a5c] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by deity, narrative, engine, keywords..."
              className="w-full bg-[#050403] border border-[#262016] focus:border-[#d4af37] text-white pl-9 pr-4 py-2 rounded-xl text-xs outline-none transition-all placeholder:text-[#5a4e3c]"
            />
          </div>
        </div>

        {/* List */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-3">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-[#8c7a5c] flex flex-col items-center justify-center gap-3">
              <Sparkles className="w-8 h-8 text-[#4a3b1a]" />
              <p className="text-sm font-medium">No forged prompts found in sanctuary.</p>
              <p className="text-xs text-[#5a4e3c]">
                Manifest a new prompt from the studio forge and click &apos;Save to Sanctuary&apos;.
              </p>
            </div>
          ) : (
            filtered.map((item) => {
              const midjourneyText = item.prompt.startsWith("/imagine")
                ? item.prompt
                : `/imagine prompt: ${item.prompt}`;

              const bundleText = `=== IBD PROMPT FORGE ELITE | V${item.version} ===\nSUBJECT: ${item.subject}\nENGINE: ${item.targetEngine}\nDIM: ${item.dim}\n\n[MASTER PROMPT]\n${item.prompt}\n\n[NEGATIVE]\n${item.negative}`;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectPrompt(item);
                    onClose();
                  }}
                  className="group cursor-pointer bg-[#080604] hover:bg-[#14100b] border border-[#262016] hover:border-[#d4af37] p-4 rounded-xl transition-all duration-200 flex flex-col gap-2.5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(item.id);
                        }}
                        className="text-[#8c7a5c] hover:text-[#ffd700] transition-colors"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            item.isFavorite ? "fill-[#ffd700] text-[#ffd700]" : ""
                          }`}
                        />
                      </button>
                      <h3 className="font-cinzel font-bold text-sm text-[#f4cf6a] group-hover:text-[#ffd700]">
                        {item.subject}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono-code font-bold px-1.5 py-0.5 rounded bg-[#1f180f] text-[#d4af37] border border-[#382d1c]">
                        V{item.version}
                      </span>
                      <span className="text-[10px] font-mono-code text-[#8c7a5c] px-1.5 py-0.5 rounded bg-[#120e09]">
                        {item.dim}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeletePrompt(item.id);
                        }}
                        className="p-1 rounded text-[#a39274] hover:text-[#ff6b6b] hover:bg-[#221a10] transition-colors ml-1"
                        title="Delete saved prompt"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-[#d4af37]/90 font-mono-code line-clamp-2 leading-relaxed bg-[#0e0b07] p-2.5 rounded-lg border border-[#1f180f]">
                    {item.prompt}
                  </p>

                  {/* Copy Options Action Strip on Card */}
                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#1a140d]">
                    <div className="flex items-center gap-2 text-[10px] font-mono-code text-[#73634b]">
                      <span>{item.targetEngine}</span>
                      <span>•</span>
                      <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      {/* Copy Prompt Button */}
                      <button
                        type="button"
                        onClick={(e) =>
                          handleCopyText(`${item.id}_prompt`, item.prompt, e)
                        }
                        className="px-2 py-1 rounded bg-[#1c160e] hover:bg-[#2e2316] text-[10px] font-mono-code text-[#f4cf6a] border border-[#382d1c] flex items-center gap-1 transition-colors"
                        title="Copy Master Prompt"
                      >
                        {copiedKey === `${item.id}_prompt` ? (
                          <>
                            <Check className="w-3 h-3 text-[#6abf6a]" />
                            <span className="text-[#6abf6a]">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-[#d4af37]" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>

                      {/* Copy /imagine format */}
                      <button
                        type="button"
                        onClick={(e) =>
                          handleCopyText(
                            `${item.id}_midjourney`,
                            midjourneyText,
                            e
                          )
                        }
                        className="px-2 py-1 rounded bg-[#1c160e] hover:bg-[#2e2316] text-[10px] font-mono-code text-[#a39274] hover:text-[#f4cf6a] border border-[#382d1c] flex items-center gap-1 transition-colors"
                        title="Copy /imagine prompt format"
                      >
                        {copiedKey === `${item.id}_midjourney` ? (
                          <>
                            <Check className="w-3 h-3 text-[#6abf6a]" />
                            <span className="text-[#6abf6a]">/imagine Copied</span>
                          </>
                        ) : (
                          <>
                            <Zap className="w-3 h-3 text-[#5865F2]" />
                            <span>/imagine</span>
                          </>
                        )}
                      </button>

                      {/* Copy Package */}
                      <button
                        type="button"
                        onClick={(e) =>
                          handleCopyText(`${item.id}_bundle`, bundleText, e)
                        }
                        className="px-2 py-1 rounded bg-[#1c160e] hover:bg-[#2e2316] text-[10px] font-mono-code text-[#a39274] hover:text-[#f4cf6a] border border-[#382d1c] flex items-center gap-1 transition-colors"
                        title="Copy Prompt Package"
                      >
                        {copiedKey === `${item.id}_bundle` ? (
                          <>
                            <Check className="w-3 h-3 text-[#6abf6a]" />
                            <span className="text-[#6abf6a]">Package Copied</span>
                          </>
                        ) : (
                          <>
                            <FileText className="w-3 h-3 text-[#8c7a5c]" />
                            <span>Package</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

