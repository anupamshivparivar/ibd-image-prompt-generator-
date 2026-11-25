import React, { useEffect, useRef, useState } from "react";
import { ProductionMetadata, AspectRatio } from "../types";
import { Sparkles, Eye, Download, Maximize2, Shield, RefreshCw, Play, Tv } from "lucide-react";

interface VisualizerPreviewProps {
  subject: string;
  version: number;
  dim: AspectRatio;
  metadata?: ProductionMetadata;
  logic: string;
  prompt: string;
}

export const VisualizerPreview: React.FC<VisualizerPreviewProps> = ({
  subject,
  version,
  dim,
  metadata,
  prompt,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [animationActive, setAnimationActive] = useState(true);
  const [showOttOverlay, setShowOttOverlay] = useState(true);

  // Aspect ratio styling
  const getAspectClass = (d: AspectRatio) => {
    switch (d) {
      case "16:9":
        return "aspect-video";
      case "9:16":
        return "aspect-[9/16] max-w-[340px] mx-auto";
      case "2:3":
        return "aspect-[2/3] max-w-[380px] mx-auto";
      case "21:9":
        return "aspect-[21/9]";
      case "1:1":
        return "aspect-square max-w-[440px] mx-auto";
      case "4:5":
        return "aspect-[4/5] max-w-[400px] mx-auto";
      default:
        return "aspect-video";
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let tick = 0;

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = (rect.width || 800) * dpr;
    canvas.height = (rect.height || 450) * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width || 800;
    const height = rect.height || 450;

    // Particle system
    const numParticles = 80 + version * 18;
    const particles = Array.from({ length: numParticles }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5 - 0.2,
      opacity: Math.random() * 0.7 + 0.3,
      gold: Math.random() > 0.3,
      isViolet: version >= 9 && Math.random() > 0.6,
    }));

    const render = () => {
      tick += 0.016;
      ctx.clearRect(0, 0, width, height);

      // Deep obsidian and molten cosmic background with Sahasrara Violet tint for V10 and Singularity Void for V11
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height * 0.45,
        10,
        width / 2,
        height * 0.45,
        Math.max(width, height) * 0.75
      );
      if (version === 11) {
        bgGrad.addColorStop(0, "#2d005e"); // Divine Singularity Purple
        bgGrad.addColorStop(0.2, "#130026");
        bgGrad.addColorStop(0.5, "#08000f");
        bgGrad.addColorStop(1, "#000000"); // Primordial Void
      } else if (version === 10) {
        bgGrad.addColorStop(0, "#2c1a2e");
        bgGrad.addColorStop(0.25, "#1f1118");
        bgGrad.addColorStop(0.6, "#0f0a07");
        bgGrad.addColorStop(1, "#030202");
      } else {
        bgGrad.addColorStop(0, "#24190c");
        bgGrad.addColorStop(0.35, "#140e07");
        bgGrad.addColorStop(0.7, "#090705");
        bgGrad.addColorStop(1, "#030202");
      }

      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // V11 / V10 / V9 Universal String & Non-Dual Quantum Lines
      if (version >= 9) {
        ctx.save();
        ctx.lineWidth = version === 11 ? 1.2 : 0.8;
        const waveCount = version === 11 ? 6 : 4;
        for (let w = 0; w < waveCount; w++) {
          ctx.beginPath();
          ctx.strokeStyle =
            version === 11
              ? w % 2 === 0
                ? "rgba(255, 204, 51, 0.4)"
                : "rgba(155, 81, 224, 0.35)"
              : w % 2 === 0
              ? "rgba(155, 81, 224, 0.25)"
              : "rgba(244, 207, 106, 0.2)";
          for (let x = 0; x <= width; x += 12) {
            const y =
              height * 0.45 +
              Math.sin(x * 0.018 + tick * 2 + w) * (24 + w * 10) +
              Math.cos(x * 0.009 - tick * 1.5) * 18;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
        ctx.restore();
      }

      // Saptarishi / Atman-Sync Rays from zenith/center
      const numRays = version === 11 ? 12 : 7;
      ctx.save();
      ctx.translate(width / 2, height * 0.45);
      for (let i = 0; i < numRays; i++) {
        const angle = (i * (Math.PI * 2)) / numRays + tick * (version === 11 ? 0.25 : 0.15);
        const rayGrad = ctx.createLinearGradient(
          0,
          0,
          Math.cos(angle) * width * 0.85,
          Math.sin(angle) * height * 0.85
        );
        rayGrad.addColorStop(
          0,
          version === 11
            ? "rgba(255, 204, 51, 0.45)"
            : version === 10
            ? "rgba(255, 225, 140, 0.25)"
            : "rgba(244, 207, 106, 0.18)"
        );
        rayGrad.addColorStop(
          0.4,
          version === 11
            ? "rgba(155, 81, 224, 0.2)"
            : version === 10
            ? "rgba(155, 81, 224, 0.12)"
            : "rgba(212, 175, 55, 0.06)"
        );
        rayGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, width * 0.85, angle - 0.14, angle + 0.14);
        ctx.closePath();
        ctx.fillStyle = rayGrad;
        ctx.fill();
      }
      ctx.restore();


      // Sacred Sri Yantra / Mandala Geometry rings in the center
      const centerX = width / 2;
      const centerY = height * 0.45;
      const baseRadius = Math.min(width, height) * 0.28;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(tick * 0.05);

      // Outer golden lotus petals ring
      ctx.strokeStyle = "rgba(212, 175, 55, 0.28)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(0, 0, baseRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Intersecting sacred triangles (Shatkona / Sri Yantra homage)
      const numPoints = 8;
      for (let p = 0; p < numPoints; p++) {
        const a = (p * Math.PI * 2) / numPoints;
        const px = Math.cos(a) * baseRadius;
        const py = Math.sin(a) * baseRadius;
        ctx.beginPath();
        ctx.arc(px, py, baseRadius * 0.35, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(244, 207, 106, 0.15)";
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(0, 0, baseRadius * 0.65, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 215, 0, 0.4)";
      ctx.stroke();

      // Inner pulsating Bindu
      const binduPulse = Math.sin(tick * 2) * 4 + 14;
      const binduGrad = ctx.createRadialGradient(0, 0, 1, 0, 0, binduPulse * 2.5);
      binduGrad.addColorStop(0, "#ffffff");
      binduGrad.addColorStop(0.3, "#f4cf6a");
      binduGrad.addColorStop(0.7, "rgba(212, 175, 55, 0.5)");
      binduGrad.addColorStop(1, "rgba(212, 175, 55, 0)");

      ctx.beginPath();
      ctx.arc(0, 0, binduPulse * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = binduGrad;
      ctx.fill();

      ctx.restore();

      // Floating Cosmic Vibhuti and Golden Particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.gold
          ? `rgba(244, 207, 106, ${p.opacity * 0.8})`
          : `rgba(229, 224, 213, ${p.opacity * 0.6})`;
        ctx.fill();
      });

      // Frame Border Overlay (Fine Sacred Temple Inset)
      ctx.strokeStyle = "rgba(212, 175, 55, 0.4)";
      ctx.lineWidth = 1;
      ctx.strokeRect(12, 12, width - 24, height - 24);

      // Corner flourishes
      const cornerSize = 16;
      ctx.strokeStyle = "#f4cf6a";
      ctx.lineWidth = 2;

      // Top-Left
      ctx.beginPath();
      ctx.moveTo(12, 12 + cornerSize);
      ctx.lineTo(12, 12);
      ctx.lineTo(12 + cornerSize, 12);
      ctx.stroke();

      // Top-Right
      ctx.beginPath();
      ctx.moveTo(width - 12 - cornerSize, 12);
      ctx.lineTo(width - 12, 12);
      ctx.lineTo(width - 12, 12 + cornerSize);
      ctx.stroke();

      // Bottom-Left
      ctx.beginPath();
      ctx.moveTo(12, height - 12 - cornerSize);
      ctx.lineTo(12, height - 12);
      ctx.lineTo(12 + cornerSize, height - 12);
      ctx.stroke();

      // Bottom-Right
      ctx.beginPath();
      ctx.moveTo(width - 12 - cornerSize, height - 12);
      ctx.lineTo(width - 12, height - 12);
      ctx.lineTo(width - 12, height - 12 - cornerSize);
      ctx.stroke();

      // Bottom Studio Watermark Seal
      ctx.save();
      ctx.fillStyle = version === 11 ? "#ffcc33" : "rgba(212, 175, 55, 0.9)";
      ctx.font = "bold 10px 'Cinzel', serif";
      ctx.fillText(
        version === 11
          ? "IBD — AN INDIAN BHAKTI DHARA PRODUCTION [GEOMETRIC LIGHT ORIGIN]"
          : "IBD — AN INDIAN BHAKTI DHARA PRODUCTION",
        24,
        height - 22
      );

      ctx.fillStyle = version === 11 ? "#ffcc33" : "rgba(244, 207, 106, 0.65)";
      ctx.font = "9px 'JetBrains Mono', monospace";
      ctx.textAlign = "right";
      const vLabel =
        version === 11
          ? "V-PARATPAR ANANTA-BIJA"
          : version === 10
          ? "V10 MOKSHA-SIDDHI"
          : version === 9
          ? "V9 SRISHTI"
          : `V${version} ANANTA`;
      ctx.fillText(`${vLabel} | ${dim}`, width - 24, height - 22);
      ctx.restore();

      if (animationActive) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [subject, version, dim, animationActive]);

  const handleDownloadSnapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `IBD_V${version}_${subject.replace(/[^a-zA-Z0-9]/g, "_")}.png`;
    link.href = url;
    link.click();
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-[#d4af37] uppercase tracking-wider font-mono-code flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#f4cf6a]" />
          Visualizer Matrix ({dim})
        </span>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setShowOttOverlay((prev) => !prev)}
            className={`text-[10px] font-mono-code px-2.5 py-1 rounded border flex items-center gap-1 transition-colors cursor-pointer ${
              showOttOverlay
                ? "bg-amber-500/20 border-amber-400/50 text-amber-200 font-bold"
                : "bg-[#14100b] border-[#2b2214] text-[#a39274] hover:text-[#f4cf6a]"
            }`}
            title="Preview Subtitle, Soft Dark Gradient Scrim, and 5% Safe-Margin Watch Now & 4K Badges"
          >
            <Tv className="w-3 h-3" />
            {showOttOverlay ? "OTT Overlay: ON" : "OTT Overlay: OFF"}
          </button>

          <button
            type="button"
            onClick={() => setAnimationActive((prev) => !prev)}
            className="text-[10px] font-mono-code text-[#a39274] hover:text-[#f4cf6a] px-2 py-1 bg-[#14100b] rounded border border-[#2b2214] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 ${animationActive ? "animate-spin" : ""}`} />
            {animationActive ? "Live Effulgence" : "Paused"}
          </button>

          <button
            type="button"
            onClick={handleDownloadSnapshot}
            className="text-[10px] font-mono-code text-[#1a1408] bg-[#d4af37] hover:bg-[#f4cf6a] px-2.5 py-1 rounded font-bold flex items-center gap-1 transition-colors shadow-sm cursor-pointer"
          >
            <Download className="w-3 h-3" />
            Snapshot Key-Card
          </button>
        </div>
      </div>

      <div className={`relative overflow-hidden rounded-xl border border-[#382d1c] bg-[#050403] ${getAspectClass(dim)} shadow-2xl`}>
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Soft Dark Gradient Scrim behind text overlays for title legibility */}
        {showOttOverlay && (
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/70 via-black/15 to-black/85"
          />
        )}

        {/* Top Safe-Zone Title + Subtitle/Sub-Hook (Gold/White Contrast) */}
        <div className="absolute top-[5%] left-[5%] right-[5%] pointer-events-none flex justify-between items-start gap-3">
          <div className="bg-gradient-to-r from-black/80 via-black/60 to-transparent backdrop-blur-sm px-3.5 py-2 rounded-lg border-l-2 border-[#d4af37] text-left max-w-[78%]">
            <div className="text-[9px] uppercase tracking-widest text-white/80 font-mono-code font-bold">
              {metadata?.cinemaStyle ? `${metadata.cinemaStyle} • ` : ""}Divine Manifestation
            </div>
            <div className="text-sm sm:text-base font-cinzel font-bold text-[#f4cf6a] leading-tight truncate drop-shadow">
              {subject}
            </div>
            {showOttOverlay && (
              <div className="text-[10px] sm:text-[11px] font-sans font-medium text-white/95 mt-0.5 truncate drop-shadow">
                <span className="text-[#ffd700] font-semibold">Sacred Original</span>
                {" • "}
                <span>An Indian Bhakti Dhara Production</span>
              </div>
            )}
          </div>

          <div className="bg-[#0a0806]/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-[#382d1c] text-right shrink-0">
            <span className="text-[10px] font-bold font-mono-code text-[#f4cf6a]">
              V{version}
            </span>
          </div>
        </div>

        {/* Bottom 5% Safe-Margin OTT Pills & 4K Badges */}
        {showOttOverlay && (
          <>
            {/* Bottom-Left Watch Now Pill Button (5% inside edges) */}
            <div className="absolute bottom-[5%] left-[5%] pointer-events-none">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f4cf6a] text-black px-3.5 py-1.5 text-[11px] font-extrabold tracking-wide shadow-lg shadow-black/70">
                <Play className="w-3 h-3 fill-black" />
                <span>Watch Now</span>
              </div>
            </div>

            {/* Bottom-Right 4K & Sampler Badges (5% inside edges) */}
            <div className="absolute bottom-[5%] right-[5%] pointer-events-none flex items-center gap-1.5">
              <span className="rounded-md bg-black/80 border border-white/30 px-2 py-1 text-[10px] font-mono-code font-bold text-white tracking-wider shadow-md">
                4K HDR
              </span>
              <span className="rounded-md bg-black/80 border border-[#d4af37]/50 px-2 py-1 text-[10px] font-mono-code font-bold text-[#f4cf6a] shadow-md">
                {dim}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
