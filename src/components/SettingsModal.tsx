import React, { useState } from "react";
import { X, Key, ShieldCheck, Check, Sparkles, AlertCircle } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  customApiKey: string;
  onSaveApiKey: (key: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  customApiKey,
  onSaveApiKey,
}) => {
  const [inputKey, setInputKey] = useState(customApiKey);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveApiKey(inputKey.trim());
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  const handleClear = () => {
    setInputKey("");
    onSaveApiKey("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#110e0a] border border-[#382d1c] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#262016] flex items-center justify-between bg-[#17130d]">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-[#d4af37]" />
            <h2 className="font-cinzel text-base font-bold text-[#f4cf6a]">
              Engine & API Configuration
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#a39274] hover:text-[#f4cf6a] hover:bg-[#251e16] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-4">
          <div className="bg-[#0a0805] p-3.5 rounded-xl border border-[#262016] flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#6abf6a] shrink-0 mt-0.5" />
            <div className="text-xs text-[#c5baa8] leading-relaxed">
              <span className="font-bold text-[#e5e0d5]">Server-Side Gemini 3.7 Flash Engine</span>
              <p className="text-[#8c7a5c] mt-0.5">
                The studio server comes pre-connected with the platform's GEMINI_API_KEY environment credentials. You can forge prompts immediately without entering a key.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold text-[#d4af37] tracking-wider uppercase font-mono-code flex items-center justify-between">
              <span>Custom Gemini API Key (Optional Override)</span>
              {customApiKey && (
                <span className="text-[#6abf6a] text-[10px] font-normal">Active Override</span>
              )}
            </label>
            <input
              type="password"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="AIzaSy... (Leave empty to use default server key)"
              className="w-full bg-[#050403] border border-[#262016] focus:border-[#d4af37] text-white px-4 py-3 rounded-xl text-sm outline-none transition-all"
            />
            <p className="text-[10px] text-[#8c7a5c]">
              Optional: If you have your own personal Google AI Studio API key with specific quota or billing, paste it here.
            </p>
          </div>

          <div className="pt-3 border-t border-[#1f1910] flex items-center justify-between gap-3">
            {customApiKey && (
              <button
                type="button"
                onClick={handleClear}
                className="px-3 py-2 rounded-lg text-xs font-mono-code text-[#ff6b6b] hover:bg-[#250d0d] transition-colors"
              >
                Reset to Server Key
              </button>
            )}
            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-xs text-[#a39274] hover:text-[#e5e0d5] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#f4cf6a] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:brightness-110 transition-all shadow-md"
              >
                {saved ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Saved!
                  </>
                ) : (
                  "Save Preference"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
