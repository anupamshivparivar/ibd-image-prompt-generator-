import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { PWAInstallModal } from './PWAInstallModal';
import { Download, Smartphone, CheckCircle } from 'lucide-react';

interface PWAInstallButtonProps {
  className?: string;
  variant?: 'header' | 'floating' | 'banner';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  className = '',
  variant = 'header',
}) => {
  const { isInstallable, isInstalled, isIOS } = usePWAInstall();
  const [modalOpen, setModalOpen] = useState(false);

  // If already installed and running standalone, display a subtle confirmation badge
  if (isInstalled) {
    if (variant === 'header') {
      return (
        <span
          id="pwa-installed-badge"
          className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-950/60 border border-emerald-500/30 text-emerald-300"
          title="Running in Standalone PWA Mode"
        >
          <CheckCircle className="w-3 h-3 text-emerald-400" />
          PWA Active
        </span>
      );
    }
    return null;
  }

  return (
    <>
      <button
        id="pwa-install-trigger-btn"
        onClick={() => setModalOpen(true)}
        className={`group relative inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold tracking-wide transition active:scale-95 ${
          variant === 'header'
            ? 'border border-amber-500/40 bg-gradient-to-r from-amber-500/15 via-amber-600/20 to-amber-500/15 text-amber-300 hover:border-amber-400 hover:bg-amber-500/25 shadow-lg shadow-amber-950/40'
            : 'border border-amber-500/60 bg-amber-500 text-black hover:bg-amber-400 shadow-xl'
        } ${className}`}
        title="Install IBD Studio on Android, iOS, or PC"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
        </span>
        {isIOS ? (
          <Smartphone className="h-3.5 w-3.5 text-amber-300 group-hover:scale-110 transition" />
        ) : (
          <Download className="h-3.5 w-3.5 text-amber-300 group-hover:scale-110 transition" />
        )}
        <span>Install App</span>
        <span className="hidden md:inline-block rounded bg-amber-400/20 px-1 py-0.2 text-[10px] font-mono text-amber-200 uppercase">
          {isIOS ? 'iOS' : 'Android / Web'}
        </span>
      </button>

      <PWAInstallModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};
