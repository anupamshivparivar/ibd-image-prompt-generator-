import React, { useState, useEffect } from "react";
import {
  ForgeRequest,
  ForgeResult,
  SavedPromptItem,
  DivinePreset,
} from "./types";
import { ForgeHeader, StudioTabType } from "./components/ForgeHeader";
import { ForgeForm } from "./components/ForgeForm";
import { ForgeResults } from "./components/ForgeResults";
import { OttLevelL1L30Tool } from "./components/OttLevelL1L30Tool";
import { CinemaSamplerView } from "./components/CinemaSamplerView";
import { ParatparSingularityView } from "./components/ParatparSingularityView";
import { UniversalStudioView } from "./components/UniversalStudioView";
import { VishwaVartaView } from "./components/VishwaVartaView";
import { SamvaadStudioView } from "./components/SamvaadStudioView";
import { DharmaSutraView } from "./components/DharmaSutraView";
import { TeerthMatrix10xView } from "./components/TeerthMatrix10xView";
import { SovereignV15V21View } from "./components/SovereignV15V21View";
import { V26CarouselView } from "./components/V26CarouselView";
import { V25CommandView } from "./components/V25CommandView";
import { VP21SanctumStudio } from "./components/VP21SanctumStudio";
import { TempleSanctuaryView } from "./components/TempleSanctuaryView";
import { DailyShortsStudioView } from "./components/DailyShortsStudioView";
import { KrishnaSuvicharView } from "./components/KrishnaSuvicharView";
import { BhagavadGitaView } from "./components/BhagavadGitaView";
import { SunderkandRamcharitmanasView } from "./components/SunderkandRamcharitmanasView";
import { ShivMantraView } from "./components/ShivMantraView";
import { PresetSelector } from "./components/PresetSelector";
import { HistoryModal } from "./components/HistoryModal";
import { SettingsModal } from "./components/SettingsModal";
import { SampleShowcaseModal } from "./components/SampleShowcaseModal";
import { GitHubPublishModal } from "./components/GitHubPublishModal";
import { OfflineIndicator } from "./components/OfflineIndicator";
import { DIVINE_PRESETS } from "./data/presets";
import { resolveDeityAutoProfile } from "./data/deityAutoProfiles";
import { AlertTriangle, Sparkles, Flame, CheckCircle2 } from "lucide-react";
import { soloRunLock, runWithSoloLock } from "./utils/soloRunLock";

const INITIAL_FORM: ForgeRequest = {
  subject: "Param-Shiva (Ananta-Bija Singularity)",
  story:
    "Param-Shiva as the Ananta-Bija Singularity. The unmanifest absolute void (Nirguna) and manifest cosmic geometry (Saguna) collapse into a non-dual point of golden origin. Atman-Sync Gaze exhibiting Non-Dual Realism, looking directly through the soul of the viewer. Swayam-Jyoti self-effulgent light physics where the Deity is the primordial light source, casting impossible golden and violet shadows across quantum fractal geometry. Subtle holographic Sanskrit seal: 'IBD — An Indian Bhakti Dhara Production'.",
  dim: "16:9",
  version: 11,
  targetEngine: "Midjourney v6.1",
  mood: "V-Paratpar / Ananta-Bija (The Singularity)",
  lightingStyle: "Atman-Sync Swayam-Jyoti (Geometric Source)",
  shastraDetails: [
    "Planck-length Detail",
    "Sanskrit Yantra Geometry",
    "Vibhuti & Rudraksha Textures",
    "Sacred Gold & Stone Seal",
    "8K Octane Octahedral Polish",
  ],
  sampler: "DPM++ 2M Karras",
  autoDeityMode: true,
};

const STORAGE_KEY_PROMPTS = "ibd_forge_saved_prompts";
const STORAGE_KEY_APIKEY = "ibd_forge_custom_api_key";
const STORAGE_KEY_ACTIVE_TAB = "ibd_studio_active_tab";

export default function App() {
  const [activeTab, setActiveTab] = useState<StudioTabType>(() => {
    try {
      return (localStorage.getItem(STORAGE_KEY_ACTIVE_TAB) as StudioTabType) || "forge";
    } catch {
      return "forge";
    }
  });

  const [formData, setFormData] = useState<ForgeRequest>(() => {
    return { ...INITIAL_FORM };
  });

  const [result, setResult] = useState<ForgeResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isParatparMode, setIsParatparMode] = useState(false);

  const [savedPrompts, setSavedPrompts] = useState<SavedPromptItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PROMPTS);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [customApiKey, setCustomApiKey] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_APIKEY) || "";
    } catch {
      return "";
    }
  });

  const [presetModalOpen, setPresetModalOpen] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [showcaseOpen, setShowcaseOpen] = useState(false);
  const [githubPublishOpen, setGithubPublishOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSoloRunLock, setIsSoloRunLock] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem("ibd_solo_run_lock");
      return stored !== null ? stored === "true" : true;
    } catch {
      return true;
    }
  });

  const toggleSoloRunLock = () => {
    setIsSoloRunLock((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("ibd_solo_run_lock", String(next));
      } catch (e) {
        console.error("Failed to save solo run lock:", e);
      }
      showToast(next ? "🛡️ Solo-Run Lock Active: Strict 1-Module Token Protection" : "⚠️ Multi-Module Execution Enabled");
      return next;
    });
  };

  // Save active tab
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ACTIVE_TAB, activeTab);
    } catch (e) {
      console.error("Failed to save active tab:", e);
    }
  }, [activeTab]);

  // Save prompts to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROMPTS, JSON.stringify(savedPrompts));
    } catch (e) {
      console.error("Failed to save prompts to localStorage:", e);
    }
  }, [savedPrompts]);

  // Save API key to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_APIKEY, customApiKey);
    } catch (e) {
      console.error("Failed to save API key to localStorage:", e);
    }
  }, [customApiKey]);

  // Hotkey support: Cmd+Enter / Ctrl+Enter to forge
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        if (!isLoading) {
          handleForge();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [formData, isLoading, customApiKey]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleFormChange = (updates: Partial<ForgeRequest>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleSelectSubjectChip = (subj: string) => {
    if (formData.autoDeityMode) {
      const auto = resolveDeityAutoProfile(subj);
      setFormData((prev) => ({
        ...prev,
        subject: subj,
        version: auto.version,
        dim: auto.dim,
        targetEngine: auto.targetEngine,
        mood: auto.mood,
        lightingStyle: auto.lightingStyle,
        cinemaStyle: auto.cinemaStyle,
        sampler: auto.sampler,
        shastraDetails: [...auto.shastraDetails],
        story: auto.autoStory,
      }));
      showToast(`✨ Auto-Configured for ${auto.shortLabel}: ${auto.matchReason}`);
    } else {
      setFormData((prev) => ({ ...prev, subject: subj }));
    }
  };

  const handleSelectPreset = (preset: DivinePreset) => {
    setFormData({
      subject: preset.deity,
      story: preset.story,
      dim: preset.dim,
      version: preset.version,
      targetEngine: preset.targetEngine,
      mood: preset.mood,
      lightingStyle: preset.lightingStyle,
      shastraDetails: [...preset.shastraDetails],
      autoDeityMode: false,
    });
    showToast(`Loaded Preset: ${preset.title}`);
  };

  const handleLoadV10ShivMaster = () => {
    const v10Preset = DIVINE_PRESETS.find((p) => p.id === "v10-mahadev-moksha");
    if (v10Preset) {
      handleSelectPreset(v10Preset);
    }
  };

  const handleSelectSavedPrompt = (item: SavedPromptItem) => {
    setFormData({
      subject: item.subject,
      story: item.story,
      dim: item.dim,
      version: item.version,
      targetEngine: item.targetEngine,
      mood: item.mood,
      lightingStyle: item.lightingStyle,
      shastraDetails: [...item.shastraDetails],
      sampler: item.sampler || "DPM++ 2M Karras",
      cinemaStyle: item.cinemaStyle,
    });
    setResult({
      success: true,
      logic: item.logic,
      prompt: item.prompt,
      negative: item.negative,
      metadata: item.metadata,
    });
    showToast(`Loaded "${item.subject}" into studio`);
  };

  const handleForge = async (overrideRequest?: ForgeRequest) => {
    const activeReq = overrideRequest || formData;
    if (!activeReq.subject.trim()) {
      setError("Please specify a Divine Subject / Deity to forge.");
      return;
    }

    if (isSoloRunLock) {
      await runWithSoloLock(
        "forge",
        "V10/V11 Forge Studio",
        async () => {
          setIsLoading(true);
          setError(null);

          try {
            const response = await fetch("/api/forge", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...activeReq,
                customApiKey: customApiKey.trim() || undefined,
              }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
              throw new Error(
                data.error || "Studio Engine failed to manifest the prompt."
              );
            }

            setResult(data);
            showToast("V" + activeReq.version + " Asset Manifested!");
          } catch (err: any) {
            console.error("Forge Error:", err);
            setError(
              err.message ||
                "An unexpected error occurred while communicating with the engine."
            );
          } finally {
            setIsLoading(false);
          }
        },
        (blockedMsg) => {
          setError(blockedMsg);
          showToast(blockedMsg);
        }
      );
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/forge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...activeReq,
          customApiKey: customApiKey.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Studio Engine failed to manifest the prompt."
        );
      }

      setResult(data);
      showToast("V" + activeReq.version + " Asset Manifested!");
    } catch (err: any) {
      console.error("Forge Error:", err);
      setError(
        err.message ||
          "An unexpected error occurred while communicating with the engine."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToSanctuary = () => {
    if (!result) return;
    const newItem: SavedPromptItem = {
      id: "ibd_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5),
      timestamp: Date.now(),
      subject: formData.subject,
      story: formData.story,
      version: formData.version,
      dim: formData.dim,
      targetEngine: formData.targetEngine,
      mood: formData.mood,
      lightingStyle: formData.lightingStyle,
      shastraDetails: formData.shastraDetails,
      sampler: formData.sampler,
      cinemaStyle: formData.cinemaStyle,
      logic: result.logic,
      prompt: result.prompt,
      negative: result.negative,
      metadata: result.metadata,
      isFavorite: false,
    };

    setSavedPrompts((prev) => [newItem, ...prev]);
    showToast("Saved to Prompts Sanctuary!");
  };

  const handleDeleteSavedPrompt = (id: string) => {
    setSavedPrompts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleClearAllSaved = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all saved sanctuary prompts?"
      )
    ) {
      setSavedPrompts([]);
      showToast("Sanctuary cleared");
    }
  };

  const handleToggleFavorite = (id: string) => {
    setSavedPrompts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const isCurrentResultSaved =
    !!result &&
    savedPrompts.some(
      (p) => p.prompt === result.prompt && p.subject === formData.subject
    );

  return (
    <div className="min-h-screen bg-[#070503] text-[#e5e0d5] py-8 px-4 sm:px-6 lg:px-8 cosmic-radial font-sans selection:bg-[#d4af37]/30 selection:text-[#f4cf6a]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#17120a] border border-[#d4af37] text-[#f4cf6a] px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 font-cinzel text-xs font-bold animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Sparkles className="w-4 h-4 text-[#ffd700]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Studio Wrapper */}
      <main className="max-w-5xl mx-auto flex flex-col gap-8">
        {/* Studio Header */}
        <div className="bg-[#0e0b08] border border-[#262016] rounded-3xl p-6 sm:p-8 shadow-[0_30px_100px_rgba(0,0,0,0.9)] relative overflow-hidden">
          {/* Subtle Ambient Gold Glow at Top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-28 bg-[#d4af37]/10 blur-3xl pointer-events-none rounded-full" />

          <ForgeHeader
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            onOpenPresets={() => setPresetModalOpen(true)}
            onOpenHistory={() => setHistoryModalOpen(true)}
            onOpenSettings={() => setSettingsModalOpen(true)}
            onOpenShowcase={() => setShowcaseOpen(true)}
            onOpenGitHubPublish={() => setGithubPublishOpen(true)}
            onToggleParatparMode={() => setIsParatparMode((prev) => !prev)}
            isParatparMode={isParatparMode}
            savedCount={savedPrompts.length}
            isSoloRunLock={isSoloRunLock}
            onToggleSoloRunLock={toggleSoloRunLock}
          />

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-[#1f0a0a] border border-[#ff4444] text-[#ff7777] flex items-start gap-3 text-xs font-mono-code leading-relaxed animate-in fade-in">
              <AlertTriangle className="w-5 h-5 text-[#ff4444] shrink-0" />
              <div className="flex-1">
                <div className="font-bold text-[#ff9999] uppercase tracking-wider mb-0.5">
                  Engine Manifestation Error
                </div>
                <div>{error}</div>
              </div>
            </div>
          )}

          {/* ACTIVE STUDIO VIEW */}
          {activeTab === "l1-l30-master" ? (
            <OttLevelL1L30Tool
              initialSubject={formData.subject}
              onNotify={showToast}
              onSendToForge={(customReq) => {
                setFormData((prev) => ({
                  ...prev,
                  ...customReq,
                }));
                setActiveTab("forge");
              }}
            />
          ) : activeTab === "cinema-sampler" ? (
            <CinemaSamplerView
              onNotify={showToast}
              onSendToForge={(customReq) => {
                setFormData((prev) => ({
                  ...prev,
                  ...customReq,
                }));
                setActiveTab("forge");
              }}
            />
          ) : activeTab === "krishna-suvichar" ? (
            <KrishnaSuvicharView
              customApiKey={customApiKey}
              onNotify={showToast}
              onSendToForge={(customReq) => {
                setFormData((prev) => ({
                  ...prev,
                  ...customReq,
                }));
                setActiveTab("forge");
              }}
            />
          ) : activeTab === "bhagavad-gita" ? (
            <BhagavadGitaView
              customApiKey={customApiKey}
              onNotify={showToast}
              onSendToForge={(customReq) => {
                setFormData((prev) => ({
                  ...prev,
                  ...customReq,
                }));
                setActiveTab("forge");
              }}
            />
          ) : activeTab === "sunderkand-ramcharitmanas" ? (
            <SunderkandRamcharitmanasView
              customApiKey={customApiKey}
              onNotify={showToast}
              onSendToForge={(customReq) => {
                setFormData((prev) => ({
                  ...prev,
                  ...customReq,
                }));
                setActiveTab("forge");
              }}
            />
          ) : activeTab === "shiv-mantra" ? (
            <ShivMantraView
              customApiKey={customApiKey}
              onNotify={showToast}
              onSendToForge={(customReq) => {
                setFormData((prev) => ({
                  ...prev,
                  ...customReq,
                }));
                setActiveTab("forge");
              }}
            />
          ) : activeTab === "daily-shorts" ? (
            <DailyShortsStudioView onNotify={showToast} />
          ) : activeTab === "temple-sanctuary" ? (
            <TempleSanctuaryView
              onNotify={showToast}
            />
          ) : activeTab === "v25-command" ? (
            <V25CommandView
              customApiKey={customApiKey}
              showToast={showToast}
              onSendToForge={(customReq) => {
                setFormData((prev) => ({
                  ...prev,
                  ...customReq,
                }));
                setActiveTab("forge");
              }}
            />
          ) : activeTab === "vp21-sanctum" ? (
            <VP21SanctumStudio
              customApiKey={customApiKey}
              showToast={showToast}
              onSendToForge={(customReq) => {
                setFormData((prev) => ({
                  ...prev,
                  ...customReq,
                }));
                setActiveTab("forge");
              }}
            />
          ) : activeTab === "v26-carousel" ? (
            <V26CarouselView
              customApiKey={customApiKey}
              showToast={showToast}
              onSendToForge={(customReq) => {
                setFormData((prev) => ({
                  ...prev,
                  ...customReq,
                }));
                setActiveTab("forge");
              }}
            />
          ) : activeTab === "sovereign-v15-v21" ? (
            <SovereignV15V21View
              customApiKey={customApiKey}
              showToast={showToast}
              onSendToForge={(customReq) => {
                setFormData((prev) => ({
                  ...prev,
                  ...customReq,
                }));
                setActiveTab("forge");
              }}
            />
          ) : activeTab === "teerth-10x" ? (
            <TeerthMatrix10xView
              showToast={showToast}
              onSendToForge={(customReq) => {
                setFormData((prev) => ({
                  ...prev,
                  ...customReq,
                }));
                setActiveTab("forge");
              }}
            />
          ) : activeTab === "universal" ? (
            <UniversalStudioView
              customApiKey={customApiKey}
              onSetCustomApiKey={setCustomApiKey}
              showToast={showToast}
            />
          ) : activeTab === "vishwa-varta" ? (
            <VishwaVartaView
              customApiKey={customApiKey}
              onSetCustomApiKey={setCustomApiKey}
              showToast={showToast}
            />
          ) : activeTab === "samvaad" ? (
            <SamvaadStudioView
              customApiKey={customApiKey}
              onSetCustomApiKey={setCustomApiKey}
              showToast={showToast}
            />
          ) : activeTab === "dharma-sutra" ? (
            <DharmaSutraView
              customApiKey={customApiKey}
              onSetCustomApiKey={setCustomApiKey}
              showToast={showToast}
            />
          ) : isParatparMode ? (
            <ParatparSingularityView
              formData={formData}
              onFormChange={handleFormChange}
              onForge={handleForge}
              isLoading={isLoading}
              result={result}
              onSwitchToFullStudio={() => setIsParatparMode(false)}
            />
          ) : (
            <>
              {/* Forge Input Form */}
              <ForgeForm
                formData={formData}
                onChange={handleFormChange}
                onSubmit={() => handleForge()}
                onAutoForge={(autoReq) => {
                  setFormData(autoReq);
                  handleForge(autoReq);
                }}
                isLoading={isLoading}
                onSelectSubjectChip={handleSelectSubjectChip}
              />

              {/* Results Area */}
              {result && (
                <ForgeResults
                  result={result}
                  subject={formData.subject}
                  version={formData.version}
                  dim={formData.dim}
                  onSaveToSanctuary={handleSaveToSanctuary}
                  isSaved={isCurrentResultSaved}
                />
              )}
            </>
          )}

          {/* Studio Footer */}
          <footer className="mt-12 pt-6 border-t border-[#1f1910] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#73634b] font-mono-code">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ffd700]" />
              <span className="font-semibold text-[#a39274]">
                IBD Prompt Forge Elite
              </span>
              <span>• An Indian Bhakti Dhara Production</span>
            </div>

            <div className="flex items-center gap-4 text-[#8c7a5c]">
              <button
                type="button"
                onClick={() => setIsParatparMode((prev) => !prev)}
                className="text-[#ffcc33] hover:underline transition-colors"
              >
                {isParatparMode ? "Standard Studio" : "V-Paratpar Console"}
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setShowcaseOpen(true)}
                className="text-[#ffd700] hover:underline transition-colors"
              >
                Shiv Key Art
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setPresetModalOpen(true)}
                className="hover:text-[#f4cf6a] transition-colors"
              >
                Canon Presets
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setSettingsModalOpen(true)}
                className="hover:text-[#f4cf6a] transition-colors"
              >
                Config
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setGithubPublishOpen(true)}
                className="text-amber-400 hover:text-amber-300 transition-colors font-medium flex items-center gap-1"
              >
                Publish to GitHub
              </button>
            </div>
          </footer>
        </div>
      </main>

      {/* Offline Connectivity Indicator */}
      <OfflineIndicator />

      {/* Modals */}
      <GitHubPublishModal
        isOpen={githubPublishOpen}
        onClose={() => setGithubPublishOpen(false)}
      />

      <SampleShowcaseModal
        isOpen={showcaseOpen}
        onClose={() => setShowcaseOpen(false)}
        onLoadIntoForge={handleLoadV10ShivMaster}
      />

      <PresetSelector
        isOpen={presetModalOpen}
        onClose={() => setPresetModalOpen(false)}
        onSelectPreset={handleSelectPreset}
      />

      <HistoryModal
        isOpen={historyModalOpen}
        onClose={() => setHistoryModalOpen(false)}
        savedPrompts={savedPrompts}
        onSelectPrompt={handleSelectSavedPrompt}
        onDeletePrompt={handleDeleteSavedPrompt}
        onClearAll={handleClearAllSaved}
        onToggleFavorite={handleToggleFavorite}
      />

      <SettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        customApiKey={customApiKey}
        onSaveApiKey={(key) => setCustomApiKey(key)}
      />
    </div>
  );
}

