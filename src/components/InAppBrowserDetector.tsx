import { useState, useEffect } from 'react';
import { ExternalLink, X } from 'lucide-react';

/**
 * Detects if user is in an in-app browser (Facebook, Instagram, LinkedIn, etc.)
 * and prompts them to open in their default browser for better performance.
 */
export function InAppBrowserDetector() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [browserName, setBrowserName] = useState('');

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || '';

    // Detect common in-app browsers
    const inAppBrowsers = [
      { pattern: /FBAN|FBAV/i, name: 'Facebook' },
      { pattern: /Instagram/i, name: 'Instagram' },
      { pattern: /LinkedInApp/i, name: 'LinkedIn' },
      { pattern: /Twitter/i, name: 'Twitter' },
      { pattern: /Snapchat/i, name: 'Snapchat' },
      { pattern: /TikTok/i, name: 'TikTok' },
    ];

    for (const browser of inAppBrowsers) {
      if (browser.pattern.test(ua)) {
        setBrowserName(browser.name);
        // Check if user dismissed before (session only)
        const dismissed = sessionStorage.getItem('inapp-browser-dismissed');
        if (!dismissed) {
          setShowPrompt(true);
        }
        break;
      }
    }
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem('inapp-browser-dismissed', 'true');
    setShowPrompt(false);
  };

  const handleOpenInBrowser = () => {
    // Try to open in default browser
    const url = window.location.href;

    // iOS: Use x-safari scheme or intent
    // Android: Use intent scheme
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);

    if (isIOS) {
      // iOS Safari
      window.location.href = `x-safari-${url}`;
      // Fallback after short delay
      setTimeout(() => {
        window.open(url, '_system');
      }, 500);
    } else if (isAndroid) {
      // Android Chrome intent
      const intentUrl = `intent://${url.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`;
      window.location.href = intentUrl;
      // Fallback
      setTimeout(() => {
        window.open(url, '_system');
      }, 500);
    } else {
      window.open(url, '_blank');
    }
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4 animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-elec-yellow/20 flex items-center justify-center">
              <ExternalLink className="h-6 w-6 text-elec-yellow" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Open in Browser</h2>
              <p className="text-sm text-white/50">{browserName} browser detected</p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="p-2 -m-2 text-white/40 hover:text-white/70 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Message */}
        <p className="text-[15px] text-white/70 leading-relaxed">
          For the best experience, open Elec-Mate in your phone's browser (Safari or Chrome).
          The {browserName} browser can be slower and may have issues.
        </p>

        {/* Actions */}
        <div className="space-y-2">
          <button
            onClick={handleOpenInBrowser}
            className="w-full h-12 rounded-xl bg-elec-yellow text-black font-semibold text-[15px] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          >
            <ExternalLink className="h-4 w-4" />
            Open in Browser
          </button>
          <button
            onClick={handleDismiss}
            className="w-full h-12 rounded-xl bg-white/5 text-white/70 font-medium text-[15px] active:bg-white/10 transition-colors"
          >
            Continue Anyway
          </button>
        </div>

        {/* Help text */}
        <p className="text-xs text-white/40 text-center">
          Tap the menu (•••) and select "Open in Browser"
        </p>
      </div>
    </div>
  );
}

export default InAppBrowserDetector;
