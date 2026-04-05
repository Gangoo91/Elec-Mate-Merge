/**
 * AppUpdatePrompt.tsx
 *
 * Displays update prompts when the native app is out of date:
 * - Force update: full-screen blocking modal (cannot dismiss)
 * - Optional update: dismissable banner at the top of the screen
 *
 * Only renders on native platforms when an update is needed.
 */

import { useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { useAppVersionCheck } from '@/utils/app-version';
import { openExternalUrl } from '@/utils/open-external-url';
import { AlertTriangle, Download, X } from 'lucide-react';

const STORE_URLS = {
  ios: 'https://apps.apple.com/app/id6758948665',
  android: 'https://play.google.com/store/apps/details?id=com.elecmate.app',
};

function getStoreUrl(): string {
  const platform = Capacitor.getPlatform();
  return platform === 'ios' ? STORE_URLS.ios : STORE_URLS.android;
}

function getStoreName(): string {
  const platform = Capacitor.getPlatform();
  return platform === 'ios' ? 'App Store' : 'Play Store';
}

function handleUpdate() {
  openExternalUrl(getStoreUrl());
}

/**
 * Full-screen blocking modal for force updates. Cannot be dismissed.
 */
function ForceUpdateModal({ currentVersion, minimumVersion }: { currentVersion: string; minimumVersion: string }) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-6">
      <div className="w-full max-w-sm bg-[#1a1a2e] border border-elec-yellow/30 rounded-xl p-6 space-y-5 text-center">
        <div className="mx-auto w-14 h-14 rounded-full bg-elec-yellow/20 flex items-center justify-center">
          <AlertTriangle className="w-7 h-7 text-elec-yellow" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white">Update Required</h2>
          <p className="text-sm text-white">
            Your version ({currentVersion}) is no longer supported. Please update to
            version {minimumVersion} or later to continue using Elec-Mate.
          </p>
        </div>

        <button
          onClick={handleUpdate}
          className="w-full h-12 rounded-xl bg-elec-yellow text-black font-semibold text-base touch-manipulation flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
        >
          <Download className="w-5 h-5" />
          Update from {getStoreName()}
        </button>
      </div>
    </div>
  );
}

/**
 * Dismissable banner for optional updates.
 */
function OptionalUpdateBanner({
  currentVersion,
  latestVersion,
  onDismiss,
}: {
  currentVersion: string;
  latestVersion: string;
  onDismiss: () => void;
}) {
  return (
    <div className="fixed top-0 left-0 right-0 z-[9998] safe-area-top">
      <div className="mx-3 mt-2 bg-[#1a1a2e] border border-elec-yellow/30 rounded-xl p-4 flex items-start gap-3 shadow-lg">
        <div className="shrink-0 w-9 h-9 rounded-full bg-elec-yellow/20 flex items-center justify-center mt-0.5">
          <Download className="w-4 h-4 text-elec-yellow" />
        </div>

        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-semibold text-white">Update Available</p>
            <button
              onClick={onDismiss}
              className="shrink-0 p-1 rounded-lg touch-manipulation active:bg-white/10"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
          <p className="text-xs text-white">
            Version {latestVersion} is available (you have {currentVersion}).
          </p>
          <button
            onClick={handleUpdate}
            className="h-9 px-4 rounded-lg bg-elec-yellow text-black text-sm font-semibold touch-manipulation active:scale-[0.98] transition-transform"
          >
            Update Now
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Top-level component. Renders nothing on web or when no update is needed.
 */
export function AppUpdatePrompt() {
  const { versionStatus } = useAppVersionCheck();
  const [dismissed, setDismissed] = useState(false);

  if (!versionStatus) return null;

  if (versionStatus.needsForceUpdate) {
    return (
      <ForceUpdateModal
        currentVersion={versionStatus.currentVersion}
        minimumVersion={versionStatus.minimumVersion}
      />
    );
  }

  if (versionStatus.needsOptionalUpdate && !dismissed) {
    return (
      <OptionalUpdateBanner
        currentVersion={versionStatus.currentVersion}
        latestVersion={versionStatus.latestVersion}
        onDismiss={() => setDismissed(true)}
      />
    );
  }

  return null;
}
