import React, { useState } from 'react';
import { Github, Copy, Check, ExternalLink, X, Terminal, ArrowRight, FolderGit2 } from 'lucide-react';

interface GitHubPublishModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubPublishModal: React.FC<GitHubPublishModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const gitCommands = [
    {
      title: '1. Initialize Git Repository & Commit',
      command: 'git init\ngit add .\ngit commit -m "feat: Initial release of IBD Universal Studio Suite with PWA"',
    },
    {
      title: '2. Link Remote GitHub Repository',
      command: 'git remote add origin https://github.com/YOUR_USERNAME/ibd-universal-studio.git',
    },
    {
      title: '3. Push to Main Branch',
      command: 'git branch -M main\ngit push -u origin main',
    },
  ];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div
      id="github-publish-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        id="github-publish-modal"
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-stone-700 bg-[#0e0d0b] text-[#e5e0d5] shadow-2xl shadow-black/60 animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-800 bg-gradient-to-r from-[#171614] to-[#201e1a] p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white border border-white/10 shadow-lg">
              <Github className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold tracking-wide text-stone-100 flex items-center gap-2">
                Publish to GitHub
                <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-mono text-amber-300 font-normal">
                  Ready
                </span>
              </h3>
              <p className="text-xs text-stone-400">
                Full repository arranged with PWA, CI Workflow, and Sacred Corpus
              </p>
            </div>
          </div>
          <button
            id="github-modal-close-btn"
            onClick={onClose}
            className="rounded-lg p-2 text-stone-400 hover:bg-white/10 hover:text-white transition"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Method 1: AI Studio Settings */}
          <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-amber-500/20 p-2 text-amber-300 shrink-0">
                <ExternalLink className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-amber-200 text-sm">Method 1: 1-Click AI Studio Export</h4>
                <p className="mt-1 text-xs text-stone-300 leading-relaxed">
                  In Google AI Studio, open the top-right <strong>Settings Menu</strong> (gear or three dots) &gt; click <strong>"Export to GitHub"</strong> or <strong>"Download ZIP"</strong>.
                  AI Studio will authenticate your GitHub account and create the repository automatically!
                </p>
              </div>
            </div>
          </div>

          {/* Method 2: Manual Terminal Commands */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 flex items-center gap-2">
              <Terminal className="h-4 w-4 text-emerald-400" />
              Method 2: Command Line Push (Terminal)
            </h4>
            <p className="text-xs text-stone-400">
              Create a new empty repository on <a href="https://github.com/new" target="_blank" rel="noreferrer" className="text-amber-400 hover:underline">github.com/new</a>, then execute these commands:
            </p>

            <div className="space-y-3">
              {gitCommands.map((item, idx) => (
                <div key={idx} className="rounded-xl border border-stone-800 bg-[#141311] p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-medium text-stone-300">
                    <span>{item.title}</span>
                    <button
                      onClick={() => handleCopy(item.command, idx)}
                      className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 transition"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="overflow-x-auto rounded-lg bg-black/60 p-2.5 font-mono text-[11px] text-emerald-400/90 whitespace-pre-wrap">
                    {item.command}
                  </pre>
                </div>
              ))}
            </div>
          </div>

          {/* Repository Inclusions */}
          <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-4 space-y-2">
            <h5 className="text-xs font-semibold text-stone-200 flex items-center gap-2">
              <FolderGit2 className="h-4 w-4 text-amber-400" />
              Pre-Configured GitHub Assets Included:
            </h5>
            <ul className="grid grid-cols-2 gap-2 text-[11px] text-stone-400">
              <li className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>GitHub Actions CI (<code>.github/workflows/ci.yml</code>)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Full Documentation (<code>README.md</code>)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>PWA Manifest & Icons in <code>/public</code></span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Safe <code>.gitignore</code> & MIT License</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-stone-800 bg-[#12110f] p-4 flex items-center justify-between">
          <a
            href="https://github.com/new"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition"
          >
            <span>Create New Repository on GitHub</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <button
            onClick={onClose}
            className="rounded-lg bg-stone-800 px-4 py-2 text-xs font-medium text-stone-200 hover:bg-stone-700 transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
