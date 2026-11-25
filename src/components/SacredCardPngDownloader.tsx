import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import {
  Download,
  Copy,
  Check,
  Sparkles,
  Smartphone,
  Layout,
  RefreshCw,
  Eye,
  Sliders,
  CheckCircle2,
  Share2,
  Maximize2,
  Palette,
  ShieldCheck,
  Feather,
  Layers,
  FolderArchive,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  ListOrdered,
  FileArchive,
  Flame,
  Image as ImageIcon,
} from "lucide-react";
import {
  BACKGROUND_VARIATIONS,
  BackgroundVariation,
  SacredAspectRatio,
  SacredCardData,
  DeityArtStyle,
  DEITY_ARTWORK_PRESETS,
  renderSacredCard,
  downloadCanvasPng,
  copyCanvasToClipboard,
  renderCardToBlob,
  downloadZipArchive,
  downloadSingleBlob,
} from "../utils/sacredCardCanvas";

export interface SacredCardPngDownloaderProps {
  cardData: SacredCardData;
  allSlidesData?: SacredCardData[];
  defaultAspectRatio?: SacredAspectRatio;
  defaultThemeId?: string;
  onNotify?: (msg: string) => void;
  fileNamePrefix?: string;
  onSelectSlideIndex?: (index: number) => void;
  activeSlideIndex?: number;
}

export const SacredCardPngDownloader: React.FC<SacredCardPngDownloaderProps> = ({
  cardData,
  allSlidesData,
  defaultAspectRatio = "9:16",
  defaultThemeId = "kailash_neelkanth_cyan",
  onNotify,
  fileNamePrefix = "Sacred_Card",
  onSelectSlideIndex,
  activeSlideIndex = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Aspect ratio & Theme
  const [aspectRatio, setAspectRatio] = useState<SacredAspectRatio>(defaultAspectRatio);
  const [selectedThemeId, setSelectedThemeId] = useState<string>(defaultThemeId);

  // Deity Artwork & Fill Controls
  const [deityArtStyle, setDeityArtStyle] = useState<DeityArtStyle>(cardData.deityArtStyle || "auto");
  const [showDeityFocalFrame, setShowDeityFocalFrame] = useState<boolean>(cardData.showDeityFocalFrame ?? true);
  const [deityBackdropOpacity, setDeityBackdropOpacity] = useState<number>(cardData.deityBackdropOpacity ?? 0.30);

  // Download Mode: "single" | "range" (1 to 10 slides deck) | "tenThemes" (1 slide in 10 themes)
  const [downloadMode, setDownloadMode] = useState<"single" | "range" | "tenThemes">("single");

  // Multi-slide range selection (e.g. Slide 1 to 10)
  const availableSlidesCount = allSlidesData && allSlidesData.length > 0 ? allSlidesData.length : 10;
  const maxAvailable = Math.min(10, availableSlidesCount);
  const [startSlide, setStartSlide] = useState<number>(1);
  const [endSlide, setEndSlide] = useState<number>(maxAvailable);

  // Background Theme Strategy for Multi-Slide Export:
  // "uniform" = All slides use currently selected theme
  // "cycle" = Each slide 1..10 gets one of the 10 sacred Vedic themes in sequence
  const [multiThemeStrategy, setMultiThemeStrategy] = useState<"uniform" | "cycle">("uniform");

  // Customization Options
  const [showShloka, setShowShloka] = useState<boolean>(cardData.showShloka ?? true);
  const [showHindi, setShowHindi] = useState<boolean>(cardData.showHindi ?? true);
  const [showEnglish, setShowEnglish] = useState<boolean>(cardData.showEnglish ?? true);
  const [showBranding, setShowBranding] = useState<boolean>(cardData.showBranding ?? true);
  const [fontSizeScale, setFontSizeScale] = useState<"compact" | "normal" | "large">("normal");

  // Status & Progress State
  const [copiedStatus, setCopiedStatus] = useState<"idle" | "copying" | "copied" | "error">("idle");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingProgress, setProcessingProgress] = useState<number>(0);
  const [processingMessage, setProcessingMessage] = useState<string>("");
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // Sync with prop updates
  useEffect(() => {
    if (defaultThemeId) {
      setSelectedThemeId(defaultThemeId);
    }
  }, [defaultThemeId]);

  useEffect(() => {
    if (defaultAspectRatio) {
      setAspectRatio(defaultAspectRatio);
    }
  }, [defaultAspectRatio]);

  const activeTheme = useMemo(() => {
    return (
      BACKGROUND_VARIATIONS.find((t) => t.id === selectedThemeId) ||
      BACKGROUND_VARIATIONS[0]
    );
  }, [selectedThemeId]);

  // Active card being rendered on canvas preview
  const currentRenderData: SacredCardData = useMemo(() => {
    return {
      ...cardData,
      deityArtStyle,
      showDeityFocalFrame,
      deityBackdropOpacity,
      showShloka,
      showHindi,
      showEnglish,
      showBranding,
      fontSizeScale,
    };
  }, [cardData, deityArtStyle, showDeityFocalFrame, deityBackdropOpacity, showShloka, showHindi, showEnglish, showBranding, fontSizeScale]);

  // Render to canvas whenever data or options change
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    renderSacredCard(canvas, currentRenderData, {
      aspectRatio,
      themeId: selectedThemeId,
      deityArtStyle,
      showDeityFocalFrame,
      deityBackdropOpacity,
      onRedraw: () => redrawCanvas(),
    });
  }, [currentRenderData, aspectRatio, selectedThemeId, deityArtStyle, showDeityFocalFrame, deityBackdropOpacity]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      redrawCanvas();
    }, 40);
    return () => clearTimeout(timeout);
  }, [redrawCanvas]);

  // Handle Single Card Download
  const handleSingleDownload = (targetRatio: SacredAspectRatio = aspectRatio) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsProcessing(true);
    setProcessingMessage(`Generating 1080p ${targetRatio} PNG with Deity Art...`);
    setProcessingProgress(40);

    // If downloading a different aspect ratio than currently viewed, render temporarily
    if (targetRatio !== aspectRatio) {
      renderSacredCard(canvas, currentRenderData, {
        aspectRatio: targetRatio,
        themeId: selectedThemeId,
        deityArtStyle,
        showDeityFocalFrame,
        deityBackdropOpacity,
      });
    }

    const cleanTitle = (cardData.title || "Sacred_Card")
      .replace(/[^a-zA-Z0-9_\u0900-\u097F]/g, "_")
      .slice(0, 30);
    const filename = `${fileNamePrefix}_${cleanTitle}_${targetRatio.replace(":", "x")}_${selectedThemeId}.png`;

    setTimeout(() => {
      setProcessingProgress(90);
      const success = downloadCanvasPng(canvas, filename);
      setIsProcessing(false);
      setProcessingProgress(0);
      setProcessingMessage("");

      if (targetRatio !== aspectRatio) {
        redrawCanvas();
      }

      if (success) {
        if (onNotify) {
          onNotify(`Downloaded 1080p ${targetRatio} PNG (${filename})`);
        }
      } else {
        if (onNotify) {
          onNotify("Failed to generate download. Please try again.");
        }
      }
    }, 150);
  };

  // Handle Multi-Slide (Slide 1 to 10) Deck Export as ZIP or Individual Files
  const handleBatchRangeDownload = async (exportAsZip: boolean = true) => {
    setIsProcessing(true);
    setProcessingProgress(5);
    setProcessingMessage("Initializing 1 to 10 Slide Generator with Deity Art...");

    // Determine target slide items
    const slideItems: { card: SacredCardData; index: number; themeId: string }[] = [];
    const fromIdx = Math.max(1, startSlide) - 1;
    const toIdx = Math.max(fromIdx + 1, Math.min(endSlide, availableSlidesCount));

    for (let i = fromIdx; i < toIdx; i++) {
      let targetCard: SacredCardData;
      if (allSlidesData && allSlidesData[i]) {
        targetCard = {
          ...allSlidesData[i],
          deityArtStyle,
          showDeityFocalFrame,
          deityBackdropOpacity,
          showShloka,
          showHindi,
          showEnglish,
          showBranding,
          fontSizeScale,
        };
      } else {
        // Fallback: Use current card with slide number annotation
        targetCard = {
          ...currentRenderData,
          categoryOrChapter: `${currentRenderData.categoryOrChapter} • Slide ${i + 1}`,
        };
      }

      // Assign theme based on strategy
      const themeForSlide =
        multiThemeStrategy === "cycle"
          ? BACKGROUND_VARIATIONS[i % BACKGROUND_VARIATIONS.length].id
          : selectedThemeId;

      slideItems.push({
        card: targetCard,
        index: i + 1,
        themeId: themeForSlide,
      });
    }

    const total = slideItems.length;
    const renderedFiles: { name: string; blob: Blob }[] = [];

    for (let step = 0; step < total; step++) {
      const item = slideItems[step];
      const progressPercent = Math.round(((step + 1) / (total + 1)) * 80);
      setProcessingProgress(progressPercent);
      setProcessingMessage(`Rendering Slide ${item.index} of ${total} with Sacred Deity Artwork...`);

      const blob = await renderCardToBlob(item.card, {
        aspectRatio,
        themeId: item.themeId,
        deityArtStyle,
        showDeityFocalFrame,
        deityBackdropOpacity,
      });

      if (blob) {
        const slideNumStr = String(item.index).padStart(2, "0");
        const cleanTitle = (item.card.title || "Verse")
          .replace(/[^a-zA-Z0-9_\u0900-\u097F]/g, "_")
          .slice(0, 24);
        const fileName = `${fileNamePrefix}_Slide${slideNumStr}_${cleanTitle}_${aspectRatio.replace(":", "x")}_${item.themeId}.png`;

        if (!exportAsZip) {
          // Direct individual file download with slight delay
          downloadSingleBlob(blob, fileName);
          await new Promise((r) => setTimeout(r, 120));
        } else {
          renderedFiles.push({
            name: fileName,
            blob,
          });
        }
      }
    }

    if (exportAsZip && renderedFiles.length > 0) {
      setProcessingMessage("Bundling into HD ZIP Archive...");
      setProcessingProgress(90);

      const zipName = `${fileNamePrefix}_Slides_${String(startSlide).padStart(2, "0")}_to_${String(toIdx).padStart(2, "0")}_${aspectRatio.replace(":", "x")}.zip`;
      const success = await downloadZipArchive(renderedFiles, zipName, (pct) => {
        setProcessingProgress(85 + Math.round(pct * 0.15));
      });

      if (success && onNotify) {
        onNotify(`Successfully downloaded ${renderedFiles.length} slides ZIP (${zipName})!`);
      }
    } else if (!exportAsZip && onNotify) {
      onNotify(`Downloaded ${total} slides in ${aspectRatio} format!`);
    }

    setIsProcessing(false);
    setProcessingProgress(0);
    setProcessingMessage("");
    redrawCanvas();
  };

  // Handle 10-Theme Deck Download for Current Card (1 Card in all 10 Backgrounds)
  const handleTenThemesDownload = async (exportAsZip: boolean = true) => {
    setIsProcessing(true);
    setProcessingProgress(5);
    setProcessingMessage("Generating 10-Theme Sacred Variations with Deity Art...");

    const renderedFiles: { name: string; blob: Blob }[] = [];
    const total = BACKGROUND_VARIATIONS.length;

    for (let i = 0; i < total; i++) {
      const theme = BACKGROUND_VARIATIONS[i];
      const progressPercent = Math.round(((i + 1) / (total + 1)) * 80);
      setProcessingProgress(progressPercent);
      setProcessingMessage(`Rendering Theme ${i + 1}/${total}: ${theme.name}...`);

      const blob = await renderCardToBlob(currentRenderData, {
        aspectRatio,
        themeId: theme.id,
        deityArtStyle,
        showDeityFocalFrame,
        deityBackdropOpacity,
      });

      if (blob) {
        const themeIndexStr = String(i + 1).padStart(2, "0");
        const cleanTitle = (cardData.title || "Sacred_Card")
          .replace(/[^a-zA-Z0-9_\u0900-\u097F]/g, "_")
          .slice(0, 24);
        const fileName = `${fileNamePrefix}_Theme${themeIndexStr}_${theme.id}_${cleanTitle}_${aspectRatio.replace(":", "x")}.png`;

        if (!exportAsZip) {
          downloadSingleBlob(blob, fileName);
          await new Promise((r) => setTimeout(r, 120));
        } else {
          renderedFiles.push({
            name: fileName,
            blob,
          });
        }
      }
    }

    if (exportAsZip && renderedFiles.length > 0) {
      setProcessingMessage("Creating 10-Theme ZIP Package...");
      setProcessingProgress(92);

      const zipName = `${fileNamePrefix}_10_Themes_Deck_${aspectRatio.replace(":", "x")}.zip`;
      const success = await downloadZipArchive(renderedFiles, zipName, (pct) => {
        setProcessingProgress(90 + Math.round(pct * 0.1));
      });

      if (success && onNotify) {
        onNotify(`Downloaded 10-Theme Sacred Deck ZIP (${zipName})!`);
      }
    } else if (!exportAsZip && onNotify) {
      onNotify(`Downloaded all 10 Sacred Themes for ${cardData.title}!`);
    }

    setIsProcessing(false);
    setProcessingProgress(0);
    setProcessingMessage("");
    redrawCanvas();
  };

  // Handle Copy to Clipboard
  const handleCopyImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setCopiedStatus("copying");
    const success = await copyCanvasToClipboard(canvas);
    if (success) {
      setCopiedStatus("copied");
      if (onNotify) onNotify("PNG copied to clipboard!");
      setTimeout(() => setCopiedStatus("idle"), 2500);
    } else {
      setCopiedStatus("error");
      if (onNotify) onNotify("Direct image copy not supported on this browser. Use Download button.");
      setTimeout(() => setCopiedStatus("idle"), 3000);
    }
  };

  // Randomize Background Theme
  const handleRandomizeTheme = () => {
    const available = BACKGROUND_VARIATIONS.filter((t) => t.id !== selectedThemeId);
    const random = available[Math.floor(Math.random() * available.length)];
    setSelectedThemeId(random.id);
    if (onNotify) {
      onNotify(`Switched background to: ${random.name}`);
    }
  };

  return (
    <div className="p-5 rounded-3xl bg-[#090514] border border-cyan-500/40 shadow-2xl space-y-6">
      {/* Header & Mode Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#201035]">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/30 flex items-center justify-center text-stone-950">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-cyan-200 font-cinzel">
                Sacred 1 to 10 Slide PNG Studio
              </h3>
              <span className="text-[10px] font-mono font-bold bg-cyan-400/20 text-cyan-300 px-2.5 py-0.5 rounded-full border border-cyan-400/40">
                1080p HD Studio
              </span>
            </div>
            <p className="text-xs text-stone-400">
              Download 1 slide or complete 1 to 10 slide decks with sacred backgrounds in 9:16 Shorts or 4:5 Feed formats.
            </p>
          </div>
        </div>

        {/* Aspect Ratio Switcher */}
        <div className="flex items-center gap-1.5 bg-[#120924] p-1.5 rounded-2xl border border-cyan-500/30 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setAspectRatio("9:16")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
              aspectRatio === "9:16"
                ? "bg-gradient-to-r from-cyan-400 to-sky-400 text-stone-950 shadow-md shadow-cyan-400/25 font-black scale-[1.02]"
                : "text-stone-300 hover:text-white"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>9:16 Shorts / Reel</span>
          </button>
          <button
            type="button"
            onClick={() => setAspectRatio("4:5")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
              aspectRatio === "4:5"
                ? "bg-gradient-to-r from-cyan-400 to-sky-400 text-stone-950 shadow-md shadow-cyan-400/25 font-black scale-[1.02]"
                : "text-stone-300 hover:text-white"
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            <span>4:5 Feed Post</span>
          </button>
        </div>
      </div>

      {/* 3 CORE DOWNLOAD MODES TABS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {/* Mode 1: Single Slide */}
        <button
          type="button"
          onClick={() => setDownloadMode("single")}
          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
            downloadMode === "single"
              ? "bg-gradient-to-r from-cyan-950/80 to-[#120a26] border-cyan-400 ring-2 ring-cyan-400/40 shadow-lg"
              : "bg-[#0d071d] border-[#251540] hover:border-cyan-500/40 opacity-85 hover:opacity-100"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold ${
                downloadMode === "single" ? "bg-cyan-400 text-stone-950 font-black" : "bg-[#1f1038] text-cyan-300"
              }`}
            >
              1
            </div>
            <div>
              <div className="text-xs font-bold text-cyan-200">Single Slide Export</div>
              <div className="text-[10px] text-stone-400">Download current slide (HD PNG)</div>
            </div>
          </div>
          {downloadMode === "single" && <Check className="w-4 h-4 text-cyan-400" />}
        </button>

        {/* Mode 2: 1 to 10 Slides Range Deck */}
        <button
          type="button"
          onClick={() => setDownloadMode("range")}
          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
            downloadMode === "range"
              ? "bg-gradient-to-r from-cyan-950/80 to-[#120a26] border-cyan-400 ring-2 ring-cyan-400/40 shadow-lg"
              : "bg-[#0d071d] border-[#251540] hover:border-cyan-500/40 opacity-85 hover:opacity-100"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold ${
                downloadMode === "range" ? "bg-cyan-400 text-stone-950 font-black" : "bg-[#1f1038] text-cyan-300"
              }`}
            >
              1-10
            </div>
            <div>
              <div className="text-xs font-bold text-cyan-200">1 to 10 Slide Deck</div>
              <div className="text-[10px] text-stone-400">Export range of slides (ZIP/PNGs)</div>
            </div>
          </div>
          {downloadMode === "range" && <Check className="w-4 h-4 text-cyan-400" />}
        </button>

        {/* Mode 3: 10 Themes Deck (1 Card in All 10 Themes) */}
        <button
          type="button"
          onClick={() => setDownloadMode("tenThemes")}
          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
            downloadMode === "tenThemes"
              ? "bg-gradient-to-r from-cyan-950/80 to-[#120a26] border-cyan-400 ring-2 ring-cyan-400/40 shadow-lg"
              : "bg-[#0d071d] border-[#251540] hover:border-cyan-500/40 opacity-85 hover:opacity-100"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold ${
                downloadMode === "tenThemes" ? "bg-cyan-400 text-stone-950 font-black" : "bg-[#1f1038] text-cyan-300"
              }`}
            >
              🎨 10
            </div>
            <div>
              <div className="text-xs font-bold text-cyan-200">10-Theme Variations</div>
              <div className="text-[10px] text-stone-400">Current slide in 10 background themes</div>
            </div>
          </div>
          {downloadMode === "tenThemes" && <Check className="w-4 h-4 text-cyan-400" />}
        </button>
      </div>

      {/* MULTI-SLIDE NAVIGATION & RANGE BAR (When in 1 to 10 Mode or when allSlidesData exists) */}
      {allSlidesData && allSlidesData.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-[#0e0720] border border-[#2b184d] space-y-2.5">
          <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
            <span className="text-cyan-300 font-bold flex items-center gap-1.5">
              <ListOrdered className="w-3.5 h-3.5 text-cyan-400" />
              <span>Slides in Active Collection ({allSlidesData.length} Total):</span>
            </span>
            <span className="text-[11px] text-stone-400">
              Active: Slide {activeSlideIndex + 1} of {allSlidesData.length}
            </span>
          </div>

          {/* Slide Pill Thumbnails (1 to 10) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            {allSlidesData.slice(0, 10).map((slide, idx) => {
              const isSelected = activeSlideIndex === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    if (onSelectSlideIndex) {
                      onSelectSlideIndex(idx);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 border ${
                    isSelected
                      ? "bg-gradient-to-r from-cyan-400 to-sky-400 text-stone-950 font-black border-cyan-200 shadow-md scale-105"
                      : "bg-[#180d30] text-stone-300 border-[#2d1a52] hover:border-cyan-500/50 hover:text-white"
                  }`}
                >
                  <span>Slide {idx + 1}</span>
                  <span className="text-[10px] opacity-75 truncate max-w-[80px]">
                    {slide.title.slice(0, 12)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Range Selection Controls (when in 1-10 range mode) */}
          {downloadMode === "range" && (
            <div className="pt-2 border-t border-[#261545] flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-300 font-mono">Export Slide Range:</span>
                <div className="flex items-center gap-1.5 bg-[#140b28] px-2.5 py-1 rounded-xl border border-cyan-500/30">
                  <span className="text-xs text-cyan-300 font-bold">Slide</span>
                  <input
                    type="number"
                    min={1}
                    max={endSlide}
                    value={startSlide}
                    onChange={(e) => setStartSlide(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-10 bg-black/60 text-center text-xs font-bold text-cyan-200 border border-cyan-500/40 rounded-lg p-0.5"
                  />
                  <span className="text-xs text-stone-400">to</span>
                  <input
                    type="number"
                    min={startSlide}
                    max={Math.min(10, availableSlidesCount)}
                    value={endSlide}
                    onChange={(e) =>
                      setEndSlide(
                        Math.min(
                          Math.min(10, availableSlidesCount),
                          Math.max(startSlide, parseInt(e.target.value) || 1)
                        )
                      )
                    }
                    className="w-10 bg-black/60 text-center text-xs font-bold text-cyan-200 border border-cyan-500/40 rounded-lg p-0.5"
                  />
                </div>
              </div>

              {/* Theme Strategy for Range */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-300 font-mono">Theme Strategy:</span>
                <div className="flex items-center gap-1 bg-[#140b28] p-1 rounded-xl border border-cyan-500/30">
                  <button
                    type="button"
                    onClick={() => setMultiThemeStrategy("uniform")}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
                      multiThemeStrategy === "uniform"
                        ? "bg-cyan-400 text-stone-950 font-black shadow-xs"
                        : "text-stone-300 hover:text-white"
                    }`}
                  >
                    Uniform ({activeTheme.hindiName})
                  </button>
                  <button
                    type="button"
                    onClick={() => setMultiThemeStrategy("cycle")}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
                      multiThemeStrategy === "cycle"
                        ? "bg-cyan-400 text-stone-950 font-black shadow-xs"
                        : "text-stone-300 hover:text-white"
                    }`}
                  >
                    🎨 10 Sacred Themes Cycle
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 10 SACRED BACKGROUND VARIATIONS SELECTOR */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-cyan-400" />
            <span>Select Sacred Background Theme ({BACKGROUND_VARIATIONS.length} Themes Available):</span>
          </span>
          <button
            type="button"
            onClick={handleRandomizeTheme}
            className="text-[11px] font-mono text-cyan-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Randomize Theme</span>
          </button>
        </div>

        {/* Theme Chips Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {BACKGROUND_VARIATIONS.map((theme) => {
            const isSelected = selectedThemeId === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => setSelectedThemeId(theme.id)}
                className={`p-2.5 rounded-2xl text-left transition-all cursor-pointer border relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? "border-cyan-400 ring-2 ring-cyan-400/50 shadow-lg scale-[1.02]"
                    : "border-[#251540] hover:border-cyan-500/40 opacity-80 hover:opacity-100"
                }`}
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.bgStart} 0%, ${theme.colors.bgMid} 50%, ${theme.colors.bgEnd} 100%)`,
                }}
              >
                {isSelected && (
                  <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-cyan-400 text-stone-950 flex items-center justify-center shadow">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}

                <div className="flex items-center gap-1.5">
                  <span className="text-sm">{theme.icon}</span>
                  <span
                    className="text-xs font-bold truncate"
                    style={{ color: theme.colors.accentGold }}
                  >
                    {theme.hindiName}
                  </span>
                </div>
                <div className="text-[10px] text-stone-300 truncate mt-1">
                  {theme.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* LIVE PREVIEW & CONTROLS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: LIVE HIGH-RESOLUTION CANVAS PREVIEW */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="w-full flex items-center justify-between text-xs font-mono font-bold text-cyan-300 mb-2 px-1">
            <span className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              <span>Live 1080p Canvas ({aspectRatio === "9:16" ? "1080×1920" : "1080×1350"})</span>
            </span>
            <span className="text-[10px] text-stone-400">{activeTheme.name}</span>
          </div>

          {/* Scaled Responsive Canvas Container */}
          <div
            className={`w-full relative rounded-3xl overflow-hidden shadow-2xl border-2 border-cyan-400/50 bg-black flex items-center justify-center p-1 transition-all ${
              aspectRatio === "9:16"
                ? "max-w-[320px] aspect-[9/16]"
                : "max-w-[360px] aspect-[4/5]"
            }`}
          >
            <canvas
              ref={canvasRef}
              className="w-full h-full object-contain rounded-2xl pointer-events-none"
            />
          </div>

          <div className="text-[11px] font-mono text-cyan-300/80 text-center mt-2.5">
            ✨ Consecrated Devanagari typography & 10-theme authentic sacred backgrounds
          </div>
        </div>

        {/* RIGHT COLUMN: CUSTOMIZATION & DOWNLOAD ACTION SUITE */}
        <div className="lg:col-span-6 space-y-4">
          {/* Customization Toggle Panel */}
          <div className="p-4 rounded-2xl bg-[#0f071d] border border-[#271542] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                <span>Card Elements & Typography:</span>
              </span>
              <button
                type="button"
                onClick={() => setShowSettings(!showSettings)}
                className="text-[11px] font-mono text-cyan-300 hover:text-white cursor-pointer"
              >
                {showSettings ? "Hide Details" : "Show Details"}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              {cardData.shlokaSanskrit && (
                <label className="flex items-center gap-2 p-2 rounded-xl bg-[#170c2d] border border-[#301a57] text-stone-200 cursor-pointer hover:bg-[#20103d] transition-colors">
                  <input
                    type="checkbox"
                    checked={showShloka}
                    onChange={(e) => setShowShloka(e.target.checked)}
                    className="accent-cyan-400 w-3.5 h-3.5"
                  />
                  <span>Sanskrit Shloka</span>
                </label>
              )}

              <label className="flex items-center gap-2 p-2 rounded-xl bg-[#170c2d] border border-[#301a57] text-stone-200 cursor-pointer hover:bg-[#20103d] transition-colors">
                <input
                  type="checkbox"
                  checked={showHindi}
                  onChange={(e) => setShowHindi(e.target.checked)}
                  className="accent-cyan-400 w-3.5 h-3.5"
                />
                <span>Hindi Bhawarth</span>
              </label>

              {cardData.englishText && (
                <label className="flex items-center gap-2 p-2 rounded-xl bg-[#170c2d] border border-[#301a57] text-stone-200 cursor-pointer hover:bg-[#20103d] transition-colors">
                  <input
                    type="checkbox"
                    checked={showEnglish}
                    onChange={(e) => setShowEnglish(e.target.checked)}
                    className="accent-cyan-400 w-3.5 h-3.5"
                  />
                  <span>English Meaning</span>
                </label>
              )}

              <label className="flex items-center gap-2 p-2 rounded-xl bg-[#170c2d] border border-[#301a57] text-stone-200 cursor-pointer hover:bg-[#20103d] transition-colors">
                <input
                  type="checkbox"
                  checked={showBranding}
                  onChange={(e) => setShowBranding(e.target.checked)}
                  className="accent-cyan-400 w-3.5 h-3.5"
                />
                <span>Sacred IBD Seal</span>
              </label>
            </div>

            {/* Typography scale */}
            <div className="flex items-center justify-between pt-1 border-t border-[#23123d]">
              <span className="text-[11px] font-mono text-stone-300">Text Scaling:</span>
              <div className="flex gap-1">
                {(["compact", "normal", "large"] as const).map((scale) => (
                  <button
                    key={scale}
                    type="button"
                    onClick={() => setFontSizeScale(scale)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase font-bold transition-all cursor-pointer ${
                      fontSizeScale === scale
                        ? "bg-cyan-400 text-stone-950 font-black"
                        : "bg-[#170c2d] text-stone-400 hover:text-white"
                    }`}
                  >
                    {scale}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* DEITY ARTWORK & BLANK SPACE FILLER PANEL */}
          <div className="p-4 rounded-2xl bg-[#0f071d] border border-cyan-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span>Deity Artwork & Space Fill:</span>
              </span>
              <span className="text-[10px] font-mono text-cyan-400/80 bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-500/30">
                Divya Darshanam
              </span>
            </div>

            {/* Deity Art Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {[
                { id: "auto" as const, label: "✨ Auto Deity", sub: "Auto Shastra" },
                { id: "shiva_meditation" as const, label: "🔱 Shiva Dhyana", sub: "ध्यान मुद्रा" },
                { id: "shiva_trishul" as const, label: "🕉️ Shiva Trishul", sub: "त्रिशूल व डमरू" },
                { id: "krishna_flute" as const, label: "🦚 Krishna Flute", sub: "मुरली मनोहर" },
                { id: "hanuman_bhakti" as const, label: "🚩 Veer Hanuman", sub: "भक्ति व गदा" },
                { id: "ram_kodanda" as const, label: "🏹 Shri Ram", sub: "कोदण्ड धनुष" },
              ].map((item) => {
                const isSelected = deityArtStyle === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setDeityArtStyle(item.id)}
                    className={`p-2 rounded-xl text-left transition-all cursor-pointer border ${
                      isSelected
                        ? "bg-gradient-to-r from-cyan-950 to-[#1e0e38] border-cyan-400 text-cyan-200 shadow-md scale-[1.02]"
                        : "bg-[#140a28] border-[#291745] text-stone-300 hover:border-cyan-500/40 hover:text-white"
                    }`}
                  >
                    <div className="text-[11px] font-bold truncate">{item.label}</div>
                    <div className="text-[9px] text-stone-400 truncate">{item.sub}</div>
                  </button>
                );
              })}
            </div>

            {/* Focal Frame & Backdrop Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-[#23123d] text-xs font-mono">
              <label className="flex items-center gap-2 p-2 rounded-xl bg-[#170c2d] border border-[#301a57] text-stone-200 cursor-pointer hover:bg-[#20103d] transition-colors">
                <input
                  type="checkbox"
                  checked={showDeityFocalFrame}
                  onChange={(e) => setShowDeityFocalFrame(e.target.checked)}
                  className="accent-cyan-400 w-3.5 h-3.5"
                />
                <span className="text-[11px]">Fill Blank Space (Portal)</span>
              </label>

              <div className="flex items-center justify-between p-2 rounded-xl bg-[#170c2d] border border-[#301a57]">
                <span className="text-[10px] text-stone-300">Backdrop Opacity:</span>
                <div className="flex gap-1">
                  {[
                    { val: 0.15, lbl: "15%" },
                    { val: 0.30, lbl: "30%" },
                    { val: 0.45, lbl: "45%" },
                  ].map((op) => (
                    <button
                      key={op.val}
                      type="button"
                      onClick={() => setDeityBackdropOpacity(op.val)}
                      className={`px-1.5 py-0.5 rounded text-[9px] font-bold transition-all cursor-pointer ${
                        Math.abs(deityBackdropOpacity - op.val) < 0.05
                          ? "bg-cyan-400 text-stone-950 font-black"
                          : "bg-[#251347] text-stone-400 hover:text-white"
                      }`}
                    >
                      {op.lbl}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* DYNAMIC ACTION SUITE BASED ON ACTIVE MODE */}
          <div className="p-4 rounded-2xl bg-gradient-to-b from-[#140a28] to-[#0a0514] border border-cyan-400/50 shadow-xl space-y-3.5">
            {/* Action Header */}
            <div className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>
                  {downloadMode === "single"
                    ? "Download Single Slide PNG"
                    : downloadMode === "range"
                    ? `Export Slides ${startSlide} to ${endSlide} Deck`
                    : "Export All 10 Theme Variations"}
                </span>
              </span>
              <span className="text-[10px] font-mono text-stone-400">
                {aspectRatio === "9:16" ? "9:16 (1080×1920)" : "4:5 (1080×1350)"}
              </span>
            </div>

            {/* Progress Bar (during batch generation) */}
            {isProcessing && (
              <div className="p-3 rounded-xl bg-[#090312] border border-cyan-500/40 space-y-2 animate-pulse">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-cyan-300 font-bold">{processingMessage}</span>
                  <span className="text-cyan-400 font-bold">{processingProgress}%</span>
                </div>
                <div className="w-full bg-[#180b2a] rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 h-full rounded-full transition-all duration-200"
                    style={{ width: `${processingProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* MODE 1: SINGLE SLIDE DOWNLOAD BUTTONS */}
            {downloadMode === "single" && (
              <div className="space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleSingleDownload("9:16")}
                    disabled={isProcessing}
                    className="py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:brightness-110 text-stone-950 font-black text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg shadow-cyan-500/25 active:scale-95 disabled:opacity-50"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download 9:16 PNG (Shorts)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSingleDownload("4:5")}
                    disabled={isProcessing}
                    className="py-3 px-4 rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 hover:brightness-110 text-white font-black text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg shadow-blue-500/25 active:scale-95 disabled:opacity-50"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download 4:5 PNG (Feed)</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleCopyImage}
                  disabled={copiedStatus === "copying" || isProcessing}
                  className="w-full py-2 px-3 rounded-xl bg-[#1e0e38] hover:bg-[#2b144f] border border-cyan-400/30 text-cyan-300 text-xs font-mono font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                >
                  {copiedStatus === "copied" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Copied 1080p Image to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy PNG to Clipboard</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* MODE 2: 1 TO 10 SLIDES DECK DOWNLOAD BUTTONS */}
            {downloadMode === "range" && (
              <div className="space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleBatchRangeDownload(true)}
                    disabled={isProcessing}
                    className="py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-400 to-sky-500 hover:brightness-110 text-stone-950 font-black text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg shadow-teal-500/25 active:scale-95 disabled:opacity-50"
                  >
                    <FolderArchive className="w-4 h-4" />
                    <span>📦 Download Slides {startSlide}-{endSlide} ZIP</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleBatchRangeDownload(false)}
                    disabled={isProcessing}
                    className="py-3 px-4 rounded-xl bg-[#200f3a] hover:bg-[#301657] border border-cyan-400/40 text-cyan-200 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md active:scale-95 disabled:opacity-50"
                  >
                    <Download className="w-4 h-4" />
                    <span>⚡ Download All {endSlide - startSlide + 1} PNGs</span>
                  </button>
                </div>

                <div className="text-[11px] font-mono text-stone-400 text-center">
                  💡 All slides rendered in crisp 1080p {aspectRatio} with{" "}
                  <strong className="text-cyan-300">
                    {multiThemeStrategy === "cycle"
                      ? "10 Sacred Themes Cycle"
                      : activeTheme.hindiName}
                  </strong>{" "}
                  background.
                </div>
              </div>
            )}

            {/* MODE 3: 10-THEME VARIATIONS DECK BUTTONS */}
            {downloadMode === "tenThemes" && (
              <div className="space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleTenThemesDownload(true)}
                    disabled={isProcessing}
                    className="py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-cyan-400 hover:brightness-110 text-stone-950 font-black text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg shadow-amber-500/25 active:scale-95 disabled:opacity-50"
                  >
                    <FolderArchive className="w-4 h-4" />
                    <span>📦 Download 10-Theme ZIP Package</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTenThemesDownload(false)}
                    disabled={isProcessing}
                    className="py-3 px-4 rounded-xl bg-[#200f3a] hover:bg-[#301657] border border-amber-400/40 text-amber-200 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md active:scale-95 disabled:opacity-50"
                  >
                    <Download className="w-4 h-4" />
                    <span>⚡ Download 10 PNGs Individually</span>
                  </button>
                </div>

                <div className="text-[11px] font-mono text-stone-400 text-center">
                  ✨ Exports 10 distinct variations of current verse across Kailash Cyan, Bhasma Obsidian, Ayodhya Gold & all Vedic palettes.
                </div>
              </div>
            )}

            {/* Metadata specs badge */}
            <div className="p-2.5 rounded-xl bg-black/50 border border-[#281544] text-[11px] font-mono text-stone-400 space-y-1">
              <div className="flex items-center justify-between">
                <span>Output Resolution:</span>
                <span className="text-cyan-300 font-bold">
                  {aspectRatio === "9:16" ? "1080 × 1920 px (9:16 Shorts)" : "1080 × 1350 px (4:5 Feed)"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Active Background Theme:</span>
                <span className="text-cyan-200">{activeTheme.hindiName} ({activeTheme.name})</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Rendering Engine:</span>
                <span className="text-stone-300">24-bit Lossless PNG • Multi-Slide ZIP Archiver</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
