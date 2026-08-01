/**
 * SafetyDocShell — the form chrome for Site Safety *documents*.
 *
 * Site Safety already had one canonical layout, `SafetyModuleShell`, and it is
 * the right one for a module you *browse*: hero, stat strip, filter bar, list.
 * But a COSHH assessment, a permit to work, a method statement or an equipment
 * record is not a list — it is a document you fill in, step by step, and it was
 * wearing the browse chrome. An audit of the eight safety form flows found
 * **none** of them showed progress, and only two showed any save state, even
 * though several already had real multi-step logic inside.
 *
 * A specialist certificate has had that chrome for a while: fixed header, back,
 * document reference, a save state written as a word, a progress ring, and
 * full-width step tabs that mark themselves complete. Sixteen certs wire it.
 * There is no reason a permit to work should feel worse to complete than an EV
 * charging certificate.
 *
 * So this composes the same header rather than cloning it — the cert shell is
 * fully generic, and its own docstring warns against copies. One design, two
 * areas. Filling in a safety document now looks and behaves exactly like
 * filling in a certificate.
 *
 * Modules that only browse keep using SafetyModuleShell. This is for documents.
 */

import React from 'react';
import CertShellHeader, {
  type CertShellStep,
} from '@/components/inspection/shared/CertShellHeader';
import type { SyncStatus } from '@/hooks/useReportSync';

export type SafetyDocStep = CertShellStep;

interface SafetyDocShellProps {
  onBack: () => void;
  /** Document name, e.g. "Permit to Work". */
  title: string;
  /**
   * The reference line under the title. Follows the certificate convention of
   * "<reference> · <standard>", e.g. "PTW-2026-0012 · HSG250" — an electrician
   * reading a printed document should recognise the same two facts in the app.
   */
  subtitle?: string | null;
  isSaving?: boolean;
  onManualSave?: () => void;
  syncStatus?: SyncStatus;
  progressPercent: number;
  steps: SafetyDocStep[];
  currentStep: string;
  onStepChange: (step: string) => void;
  completedSteps: Record<string, boolean>;
}

const SafetyDocShell: React.FC<SafetyDocShellProps> = ({
  onBack,
  title,
  subtitle,
  isSaving,
  onManualSave,
  syncStatus,
  progressPercent,
  steps,
  currentStep,
  onStepChange,
  completedSteps,
}) => (
  <CertShellHeader
    onBack={onBack}
    title={title}
    subtitle={subtitle}
    isSaving={isSaving}
    onManualSave={onManualSave}
    syncStatus={syncStatus}
    progressPercent={progressPercent}
    steps={steps}
    currentTab={currentStep}
    onTabChange={onStepChange}
    completedTabs={completedSteps}
  />
);

export default SafetyDocShell;

// ─── Step completion ────────────────────────────────────────────────────────

export interface SafetyDocStepConfig<TStep extends string> {
  id: TStep;
  label: string;
  /** Fields that must be non-empty for the step to count as complete. */
  requiredFields: string[];
}

export interface SafetyDocProgress<TStep extends string> {
  steps: SafetyDocStep[];
  completedSteps: Record<string, boolean>;
  progressPercent: number;
  /** The first incomplete step — where "continue" should land. */
  nextIncomplete: TStep | null;
}

const filled = (v: unknown): boolean => {
  if (v === null || v === undefined) return false;
  if (typeof v === 'string') return v.trim().length > 0;
  if (Array.isArray(v)) return v.length > 0;
  if (typeof v === 'boolean') return true;
  if (typeof v === 'number') return Number.isFinite(v);
  return true;
};

/** Read `a.b.c` out of a form object without throwing on a missing branch. */
const at = (obj: unknown, path: string): unknown =>
  path
    .split('.')
    .reduce<unknown>(
      (acc, k) => (acc == null ? undefined : (acc as Record<string, unknown>)[k]),
      obj
    );

/**
 * Derive step completion and overall progress from the form data.
 *
 * Deliberately the same shape the certificates use: a step is complete when its
 * required fields are filled, and progress is the proportion of required fields
 * filled across the whole document — not the proportion of steps *visited*.
 * Visiting a step is not the same as completing it, and a progress ring that
 * counts visits tells the user something untrue about their document.
 */
export function computeSafetyDocProgress<TStep extends string>(
  configs: SafetyDocStepConfig<TStep>[],
  formData: unknown
): SafetyDocProgress<TStep> {
  const completedSteps: Record<string, boolean> = {};
  let requiredTotal = 0;
  let requiredFilled = 0;
  let nextIncomplete: TStep | null = null;

  for (const cfg of configs) {
    const fields = cfg.requiredFields ?? [];
    const done = fields.filter((f) => filled(at(formData, f))).length;
    requiredTotal += fields.length;
    requiredFilled += done;

    // A step with no required fields is optional — never blocks, never claims
    // completion it has not earned.
    const complete = fields.length > 0 && done === fields.length;
    completedSteps[cfg.id] = complete;
    if (!complete && nextIncomplete === null && fields.length > 0) nextIncomplete = cfg.id;
  }

  const progressPercent =
    requiredTotal === 0 ? 0 : Math.round((requiredFilled / requiredTotal) * 100);

  return {
    steps: configs.map(({ id, label }) => ({ id, label })),
    completedSteps,
    progressPercent,
    nextIncomplete,
  };
}
