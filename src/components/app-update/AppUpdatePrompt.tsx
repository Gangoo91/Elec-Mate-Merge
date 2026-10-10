/**
 * AppUpdatePrompt.tsx
 *
 * Displays update prompts when the native app is out of date:
 * - Force update: full-screen blocking modal (cannot dismiss)
 * - Optional update: dismissable banner at the top of the screen
 *
 * Only renders on native platforms when an update is needed.
 */

import { useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useDemoMode } from '@/lib/demoMode';
import { useMyCollegeContext } from '@/hooks/useMyCollegeContext';
import { collegeGateDecision, isBelowFeatureFloor, type FeatureMinimums } from '@/utils/featureGate';
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
  const demo = useDemoMode();

  if (!versionStatus) return null;

  if (versionStatus.needsForceUpdate) {
    return (
      <ForceUpdateModal
        currentVersion={versionStatus.currentVersion}
        minimumVersion={versionStatus.minimumVersion}
      />
    );
  }

  // Demo accounts (ELE-1856) skip the optional banner; a forced update still shows.
  const optional =
    versionStatus.needsOptionalUpdate && !dismissed && !demo ? (
      <OptionalUpdateBanner
        currentVersion={versionStatus.currentVersion}
        latestVersion={versionStatus.latestVersion}
        onDismiss={() => setDismissed(true)}
      />
    ) : null;

  // ELE-1969: the College Hub can require a newer build of college-linked
  // users only. The college lookup runs only when this build is below the
  // college floor, so up-to-date devices make no extra request.
  if (
    isBelowFeatureFloor(
      versionStatus.featureMinimums?.college,
      versionStatus.currentVersion,
      versionStatus.currentBuild
    )
  ) {
    return (
      <CollegeFeatureGate
        minimums={versionStatus.featureMinimums}
        currentVersion={versionStatus.currentVersion}
        currentBuild={versionStatus.currentBuild}
        fallback={optional}
      />
    );
  }

  return optional;
}

/**
 * ELE-1969: a college learner or staff member on a build older than the
 * college floor. Blocking on College Hub screens (they must never see a
 * different hub from their tutor's), a banner elsewhere. Anyone not linked to
 * a college sees the normal prompts.
 */
function CollegeFeatureGate({
  minimums,
  currentVersion,
  currentBuild,
  fallback,
}: {
  minimums: FeatureMinimums;
  currentVersion: string;
  currentBuild: string;
  fallback: ReactNode;
}) {
  const { pathname } = useLocation();
  const { isLearner, isStaff, loading } = useMyCollegeContext();
  const [dismissed, setDismissed] = useState(false);

  if (loading) return <>{fallback}</>;
  const decision = collegeGateDecision({
    minimums,
    currentVersion,
    currentBuild,
    isCollegeLinked: isLearner || isStaff,
    pathname,
  });

  if (decision === 'block') {
    return (
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="college-update-title"
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-6 backdrop-blur-sm"
      >
        <div className="w-full max-w-sm space-y-5 rounded-xl border border-white/[0.12] bg-[#1a1a2e] p-6 text-center">
          <div className="space-y-2">
            <h2 id="college-update-title" className="text-xl font-bold text-white">
              Update to use your college
            </h2>
            <p className="text-sm text-white">
              Your college uses a newer version of Elec-Mate. Update so you see exactly what your
              {isStaff ? ' learners' : ' tutor'} sees. The rest of the app still works on this
              version.
            </p>
          </div>
          <button
            type="button"
            onClick={handleUpdate}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-elec-yellow text-base font-semibold text-black transition-transform touch-manipulation active:scale-[0.98]"
          >
            <Download className="h-5 w-5" aria-hidden />
            Update from {getStoreName()}
          </button>
          <a
            href="/dashboard"
            className="flex h-11 w-full items-center justify-center rounded-xl text-sm font-medium text-white touch-manipulation"
          >
            Back to the dashboard
          </a>
        </div>
      </div>
    );
  }

  if (decision === 'nudge' && !dismissed) {
    return (
      <div className="fixed left-0 right-0 top-0 z-[9998] safe-area-top">
        <div className="mx-3 mt-2 flex items-start gap-3 rounded-xl border border-white/[0.12] bg-[#1a1a2e] p-4 shadow-lg">
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-semibold text-white">Update for your college</p>
              <button
                type="button"
                onClick={() => setDismissed(true)}
                className="-m-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg touch-manipulation active:bg-white/10"
                aria-label="Dismiss"
              >
                <X className="h-4 w-4 text-white" aria-hidden />
              </button>
            </div>
            <p className="text-[13px] text-white">
              Your college needs a newer version of Elec-Mate before you open the College Hub.
            </p>
            <button
              type="button"
              onClick={handleUpdate}
              className="h-11 rounded-lg bg-elec-yellow px-4 text-sm font-semibold text-black transition-transform touch-manipulation active:scale-[0.98]"
            >
              Update now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{fallback}</>;
}
