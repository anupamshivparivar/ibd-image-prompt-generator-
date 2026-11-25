import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import {
  Download,
  Share,
  PlusSquare,
  Smartphone,
  Apple,
  CheckCircle2,
  X,
  Sparkles,
  Laptop,
  MoreVertical,
} from 'lucide-react';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, isAndroid, install } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'android' | 'ios' | 'desktop'>(
    isIOS ? 'ios' : isAndroid ? 'android' : 'android'
  );
  const [installSuccess, setInstallSuccess] = useState(false);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    const success = await install();
    if (success) {
      setInstallSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  return (
    <div
      id="pwa-install-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        id="pwa-install-modal"
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-amber-500/30 bg-[#0d0c0a] text-[#e5e0d5] shadow-2xl shadow-amber-900/20 animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-500/20 bg-gradient-to-r from-[#17140f] to-[#1e1912] p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-black shadow-lg shadow-amber-500/20">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold tracking-wide text-amber-300">
                Install IBD Studio
              </h3>
              <p className="text-xs text-amber-200/70">
                Offline Sacred AI Production Suite • Fast & Standalone
              </p>
            </div>
          </div>
          <button
            id="pwa-modal-close-btn"
            onClick={onClose}
            className="rounded-lg p-2 text-stone-400 hover:bg-white/10 hover:text-white transition"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Device Selection Tabs */}
        <div className="flex border-b border-amber-500/20 bg-[#120f0a] px-3 pt-2">
          <button
            id="pwa-tab-android"
            onClick={() => setActiveTab('android')}
            className={`flex flex-1 items-center justify-center gap-2 border-b-2 py-2.5 text-xs font-semibold tracking-wider uppercase transition ${
              activeTab === 'android'
                ? 'border-amber-400 text-amber-300 bg-amber-500/10'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Smartphone className="h-4 w-4 text-emerald-400" />
            Android
          </button>
          <button
            id="pwa-tab-ios"
            onClick={() => setActiveTab('ios')}
            className={`flex flex-1 items-center justify-center gap-2 border-b-2 py-2.5 text-xs font-semibold tracking-wider uppercase transition ${
              activeTab === 'ios'
                ? 'border-amber-400 text-amber-300 bg-amber-500/10'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Apple className="h-4 w-4 text-zinc-200" />
            iOS (iPhone / iPad)
          </button>
          <button
            id="pwa-tab-desktop"
            onClick={() => setActiveTab('desktop')}
            className={`flex flex-1 items-center justify-center gap-2 border-b-2 py-2.5 text-xs font-semibold tracking-wider uppercase transition ${
              activeTab === 'desktop'
                ? 'border-amber-400 text-amber-300 bg-amber-500/10'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Laptop className="h-4 w-4 text-sky-400" />
            PC / Mac
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 space-y-5">
          {isInstalled ? (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-4 text-center">
              <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-400 mb-2" />
              <h4 className="font-semibold text-emerald-300 text-sm">App Already Installed!</h4>
              <p className="mt-1 text-xs text-stone-300">
                IBD Studio is currently running in standalone app mode with offline sacred corpus caching.
              </p>
            </div>
          ) : installSuccess ? (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-4 text-center">
              <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-400 mb-2" />
              <h4 className="font-semibold text-emerald-300 text-sm">Installation Initiated!</h4>
              <p className="mt-1 text-xs text-stone-300">
                IBD Studio is being added to your home screen.
              </p>
            </div>
          ) : (
            <>
              {/* Android Tab Content */}
              {activeTab === 'android' && (
                <div className="space-y-4">
                  {isInstallable && (
                    <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4 text-center">
                      <p className="text-xs text-amber-200/90 mb-3">
                        Direct 1-tap browser installation is available for this device:
                      </p>
                      <button
                        id="pwa-native-install-android-btn"
                        onClick={handleInstallClick}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 text-sm font-bold text-black shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition active:scale-[0.98]"
                      >
                        <Download className="h-5 w-5" />
                        Install App Now (1-Tap)
                      </button>
                    </div>
                  )}

                  <div className="space-y-3">
                    <h5 className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                      Standard Android Installation Steps (Chrome / Samsung Internet / Edge):
                    </h5>
                    <ol className="space-y-2.5 text-xs text-stone-300">
                      <li className="flex items-start gap-3 rounded-lg bg-white/5 p-3 border border-white/5">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs">
                          1
                        </span>
                        <div>
                          <p className="font-medium text-white flex items-center gap-1.5">
                            Tap the browser menu <MoreVertical className="h-3.5 w-3.5 inline text-amber-400" />
                          </p>
                          <p className="text-stone-400 mt-0.5">
                            Located at top-right in Chrome, or bottom-right in Samsung Internet.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3 rounded-lg bg-white/5 p-3 border border-white/5">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs">
                          2
                        </span>
                        <div>
                          <p className="font-medium text-white">
                            Tap <span className="text-amber-300">"Install app"</span> or <span className="text-amber-300">"Add to Home screen"</span>
                          </p>
                          <p className="text-stone-400 mt-0.5">
                            This launches the native Android APK/WebAPK creation dialog.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3 rounded-lg bg-white/5 p-3 border border-white/5">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs">
                          3
                        </span>
                        <div>
                          <p className="font-medium text-white">Confirm "Install"</p>
                          <p className="text-stone-400 mt-0.5">
                            The IBD Studio golden Trishul icon will appear on your Android launcher.
                          </p>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
              )}

              {/* iOS Tab Content */}
              {activeTab === 'ios' && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-3.5 text-xs text-sky-200">
                    <p className="font-medium">
                      Apple Safari requires adding to Home Screen via the Share menu:
                    </p>
                  </div>

                  <ol className="space-y-2.5 text-xs text-stone-300">
                    <li className="flex items-start gap-3 rounded-lg bg-white/5 p-3 border border-white/5">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs">
                        1
                      </span>
                      <div>
                        <p className="font-medium text-white flex items-center gap-1.5">
                          Tap the <Share className="h-4 w-4 inline text-sky-400" /> Share button
                        </p>
                        <p className="text-stone-400 mt-0.5">
                          Found in the Safari toolbar at the bottom of your iPhone screen (or top of iPad).
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 rounded-lg bg-white/5 p-3 border border-white/5">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs">
                        2
                      </span>
                      <div>
                        <p className="font-medium text-white flex items-center gap-1.5">
                          Scroll down and tap <PlusSquare className="h-4 w-4 inline text-amber-400" /> "Add to Home Screen"
                        </p>
                        <p className="text-stone-400 mt-0.5">
                          Located in the actions list just below the contact row.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 rounded-lg bg-white/5 p-3 border border-white/5">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs">
                        3
                      </span>
                      <div>
                        <p className="font-medium text-white">
                          Tap <span className="text-amber-300">"Add"</span> at top-right
                        </p>
                        <p className="text-stone-400 mt-0.5">
                          IBD Studio will launch in full-screen standalone mode like a native iOS app.
                        </p>
                      </div>
                    </li>
                  </ol>
                </div>
              )}

              {/* Desktop Tab Content */}
              {activeTab === 'desktop' && (
                <div className="space-y-4">
                  {isInstallable ? (
                    <button
                      id="pwa-native-install-desktop-btn"
                      onClick={handleInstallClick}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 text-sm font-bold text-black shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition active:scale-[0.98]"
                    >
                      <Download className="h-5 w-5" />
                      Install on Desktop (1-Click)
                    </button>
                  ) : (
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-stone-300 space-y-2">
                      <p className="font-medium text-amber-300">Chrome, Edge & Brave on PC / Mac:</p>
                      <p>
                        Click the small <strong>Install Icon</strong> (<Download className="h-3.5 w-3.5 inline text-amber-400" />) on the right side of the browser URL / address bar.
                      </p>
                      <p className="text-stone-400">
                        Or click the three dots menu ⋮ &gt; <strong>"Save and share"</strong> &gt; <strong>"Install IBD Universal Studio Suite"</strong>.
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2 text-center text-xs">
                    <div className="rounded-lg bg-stone-900/60 p-3 border border-stone-800">
                      <span className="text-amber-400 font-semibold block mb-1">Windowed Mode</span>
                      <span className="text-stone-400 text-[11px]">No browser URL bar, custom titlebar</span>
                    </div>
                    <div className="rounded-lg bg-stone-900/60 p-3 border border-stone-800">
                      <span className="text-amber-400 font-semibold block mb-1">Offline Cache</span>
                      <span className="text-stone-400 text-[11px]">Works offline via Service Worker</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Feature Badges */}
          <div className="border-t border-amber-500/10 pt-4 grid grid-cols-3 gap-2 text-center text-[11px] text-stone-400">
            <div className="p-1">
              <span className="text-amber-300 block font-medium">Fast Boot</span>
              <span>Sub-second load</span>
            </div>
            <div className="p-1 border-x border-stone-800">
              <span className="text-amber-300 block font-medium">Zero Storage</span>
              <span>Lightweight PWA</span>
            </div>
            <div className="p-1">
              <span className="text-amber-300 block font-medium">Automatic</span>
              <span>Silent background sync</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
