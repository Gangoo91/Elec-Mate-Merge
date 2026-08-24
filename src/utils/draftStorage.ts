// Local Draft Storage - Best-in-Class
// Saves form data to localStorage for instant access and crash recovery

import { safeSetJSON, safeGetJSON, safeRemove } from '@/lib/localStorage';

const DRAFT_PREFIX = 'elec-mate-draft-';
const MAX_DRAFTS_PER_TYPE = 15;
const DRAFT_EXPIRY_DAYS = 30;

interface DraftData {
  data: Record<string, unknown>;
  lastModified: number;
  reportId: string | null;
  version: number;
}

interface DraftPreview {
  clientName?: string;
  installationAddress?: string;
  propertyAddress?: string;
  lastModified: Date;
  reportId: string | null;
}

/**
 * Get storage key for a draft
 */
const getDraftKey = (
  reportType: string,
  reportId?: string | null,
  clientCertId?: string | null
): string => {
  if (reportId) {
    return `${DRAFT_PREFIX}${reportType}-${reportId}`;
  }
  /*
   * ELE-1599 — an unsaved certificate is keyed by its own identity.
   *
   * This used to return a single `-new` key per report type, so EVERY unsaved
   * certificate of a type shared one localStorage entry and each new one
   * destroyed the last. Reproduced: save cert A, save cert B, A is gone.
   *
   * Worst for EIC and Minor Works, where `useEICAutoSave` passes a null
   * reportId on every save — so their drafts landed on the shared key always,
   * not just while unsaved. Live storage showed 12 correctly-keyed EICR drafts
   * against exactly one EIC key holding the entire EIC draft store.
   *
   * `_clientCertId` is minted per certificate in form state (ELE-1592), so it
   * is the natural key. Falls back to the bare `-new` key when absent, which
   * keeps every other draft type (quote, invoice, site visit, designers)
   * behaving exactly as before.
   */
  if (clientCertId) {
    return `${DRAFT_PREFIX}${reportType}-new-${clientCertId}`;
  }
  return `${DRAFT_PREFIX}${reportType}-new`;
};

/**
 * Does this key suffix denote an UNSAVED draft? Covers the legacy bare `new`
 * and the per-certificate `new-<id>` form.
 *
 * ⚠️ Used to derive `reportId` from a key. Getting this wrong would hand
 * callers "new-<uuid>" as though it were a real report id.
 */
const isNewIdPart = (idPart: string): boolean =>
  idPart === 'new' || idPart.startsWith('new-');

/** The identity a certificate carries in its own form data (ELE-1592). */
const certIdOf = (data: Record<string, unknown> | null | undefined): string | null => {
  const v = data?._clientCertId;
  return typeof v === 'string' && v ? v : null;
};

/**
 * Most recently modified UNSAVED draft for a type, across both key forms.
 * Recovery used to read the single `-new` key directly; with per-certificate
 * keys it has to look for the newest one instead.
 */
const findLatestNewDraft = (
  reportType: string
): { key: string; draft: DraftData } | null => {
  const prefix = `${DRAFT_PREFIX}${reportType}-`;
  let best: { key: string; draft: DraftData } | null = null;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key?.startsWith(prefix)) continue;
    if (!isNewIdPart(key.slice(prefix.length))) continue;
    const draft = safeGetJSON<DraftData | null>(key, null);
    if (!draft?.data) continue;
    if (!best || draft.lastModified > best.draft.lastModified) best = { key, draft };
  }
  return best;
};

/**
 * Get all draft keys for a report type
 */
const getDraftKeys = (reportType: string): string[] => {
  const keys: string[] = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(`${DRAFT_PREFIX}${reportType}`)) {
        keys.push(key);
      }
    }
  } catch {
    // localStorage not available (private browsing)
  }
  return keys;
};

export const draftStorage = {
  /**
   * Save current form state to local storage
   * Called every 2 seconds (debounced) during editing
   * Returns true if the save succeeded, false on quota/error
   */
  saveDraft: (
    reportType: string,
    reportId: string | null,
    data: Record<string, unknown>
  ): boolean => {
    try {
      /*
       * ELE-1599 — the per-certificate identity is taken from the payload, so
       * every existing caller gets the fix without changing. `useEICAutoSave`
       * passes a null reportId unconditionally and would otherwise keep
       * writing every EIC and Minor Works draft to one shared key.
       */
      const clientCertId = certIdOf(data);
      const key = getDraftKey(reportType, reportId, clientCertId);
      const existingData = safeGetJSON<DraftData | null>(key, null);

      // Once a certificate has a real report id its unsaved-draft entry is
      // redundant — drop it so per-certificate keys cannot accumulate.
      if (reportId && clientCertId) {
        safeRemove(getDraftKey(reportType, null, clientCertId));
      }

      // Clean up BEFORE saving to free space first
      const keys = getDraftKeys(reportType);
      const expiryMs = DRAFT_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
      const now = Date.now();

      // Purge expired drafts and trim to MAX_DRAFTS_PER_TYPE
      const sorted = keys
        .map((k) => {
          const d = safeGetJSON<{ lastModified?: number }>(k, {});
          return { key: k, lastModified: d.lastModified || 0 };
        })
        .sort((a, b) => a.lastModified - b.lastModified);

      // Remove expired drafts
      sorted.forEach(({ key: k, lastModified }) => {
        if (now - lastModified > expiryMs) {
          safeRemove(k);
        }
      });

      // Remove oldest if still over limit (accounting for the one we're about to save)
      const remaining = sorted.filter(({ lastModified }) => now - lastModified <= expiryMs);
      if (remaining.length >= MAX_DRAFTS_PER_TYPE) {
        const toRemove = remaining.slice(0, remaining.length - MAX_DRAFTS_PER_TYPE + 1);
        toRemove.forEach(({ key: k }) => safeRemove(k));
      }

      const draft: DraftData = {
        data,
        lastModified: now,
        reportId,
        version: (existingData?.version || 0) + 1,
      };

      return safeSetJSON(key, draft);
    } catch (error) {
      console.error('[DraftStorage] Failed to save draft:', error);
      return false;
    }
  },

  /**
   * Load draft for recovery
   * Returns the most recent draft for this report type/id
   */
  loadDraft: (
    reportType: string,
    reportId?: string | null
  ): { data: Record<string, unknown>; lastModified: Date } | null => {
    try {
      const key = getDraftKey(reportType, reportId);
      const draft = safeGetJSON<DraftData | null>(key, null);

      if (draft) {
        return {
          data: draft.data,
          lastModified: new Date(draft.lastModified),
        };
      }

      // IMPORTANT: Do NOT fall back to the "-new" draft when loading an existing record.
      // A stale/blank abandoned new-form draft must never overwrite a saved certificate.
      // If no specific draft exists for this reportId, return null and load from cloud.
      return null;
    } catch (error) {
      console.error('[DraftStorage] Failed to load draft:', error);
      return null;
    }
  },

  /**
   * Load the most recent draft of a type regardless of which id it was
   * saved under. Needed where the form generates its own uuid up-front
   * (site visits): drafts save under `-<uuid>` keys, so loadDraft(type, null)
   * — which only checks the `-new` key — never finds them. That exact
   * mismatch made site-visit recovery a no-op (ELE-1069).
   * `isMeaningful` lets the caller define what counts as recoverable data.
   */
  loadLatestDraft: (
    reportType: string,
    isMeaningful?: (data: Record<string, unknown>) => boolean
  ): { data: Record<string, unknown>; lastModified: Date; reportId: string | null } | null => {
    try {
      const prefix = `${DRAFT_PREFIX}${reportType}-`;
      const expiryMs = DRAFT_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
      const now = Date.now();
      let best: { draft: DraftData; reportId: string | null } | null = null;

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key?.startsWith(prefix)) continue;
        const draft = safeGetJSON<DraftData | null>(key, null);
        if (!draft?.data) continue;
        if (now - draft.lastModified > expiryMs) continue;
        if (isMeaningful && !isMeaningful(draft.data)) continue;
        if (!best || draft.lastModified > best.draft.lastModified) {
          const idPart = key.slice(prefix.length);
          // ELE-1599 — `new-<certId>` is still an unsaved draft, not a report id.
          best = { draft, reportId: isNewIdPart(idPart) ? null : idPart };
        }
      }

      if (!best) return null;
      return {
        data: best.draft.data,
        lastModified: new Date(best.draft.lastModified),
        reportId: best.reportId,
      };
    } catch (error) {
      console.error('[DraftStorage] Failed to load latest draft:', error);
      return null;
    }
  },

  /**
   * Check if there's a recoverable draft for a new report
   * Only returns true for "new" drafts (not existing reports)
   */
  hasRecoverableDraft: (reportType: string): boolean => {
    try {
      // ELE-1599 — the newest unsaved draft, across legacy and per-cert keys.
      const found = findLatestNewDraft(reportType);
      const draft = found?.draft ?? null;
      if (!draft) return false;

      // Check if draft has meaningful data
      const d = draft.data as Record<string, unknown>;
      const nonEmptyArr = (v: unknown): v is unknown[] => Array.isArray(v) && v.length > 0;
      const hasData =
        d?.clientName ||
        d?.installationAddress ||
        d?.propertyAddress ||
        nonEmptyArr(d?.circuits) ||
        nonEmptyArr(d?.scheduleOfTests) ||
        // Drafts staged by the Renewable Design Suite handoffs: quote drafts
        // carry items/jobDetails; cert drafts carry kit details but no client.
        nonEmptyArr(d?.items) ||
        (d?.jobDetails as { title?: string } | undefined)?.title ||
        (Array.isArray(d?.arrays) &&
          (d.arrays as { panelMake?: string }[]).some((a) => a?.panelMake)) ||
        (Array.isArray(d?.inverters) &&
          (d.inverters as { make?: string }[]).some((i) => i?.make)) ||
        d?.batteryManufacturer ||
        d?.chargerMake;

      // Check if draft is recent (within DRAFT_EXPIRY_DAYS)
      const isRecent = Date.now() - draft.lastModified < DRAFT_EXPIRY_DAYS * 24 * 60 * 60 * 1000;

      return hasData && isRecent;
    } catch (error) {
      return false;
    }
  },

  /**
   * Clear draft after successful cloud sync
   */
  clearDraft: (
    reportType: string,
    reportId?: string | null,
    clientCertId?: string | null
  ): void => {
    try {
      const key = getDraftKey(reportType, reportId, clientCertId);
      safeRemove(key);

      // Also clear the "new" draft if we just synced a new report
      if (reportId) {
        // ELE-1599 — clear BOTH forms: this certificate's own unsaved key when
        // we know its identity, and the legacy shared key. Deliberately never
        // clears every `new-*` key: that would delete a DIFFERENT unsaved
        // certificate's draft, which is the bug this ticket exists to fix.
        if (clientCertId) safeRemove(getDraftKey(reportType, null, clientCertId));
        safeRemove(getDraftKey(reportType, null));
      }
    } catch (error) {
      console.error('[DraftStorage] Failed to clear draft:', error);
    }
  },

  /**
   * Get draft preview for recovery dialog
   * Shows user what they're about to recover
   */
  getDraftPreview: (reportType: string): DraftPreview | null => {
    try {
      // ELE-1599 — preview the newest unsaved draft, whichever key holds it.
      const draft = findLatestNewDraft(reportType)?.draft ?? null;
      if (!draft) return null;

      return {
        clientName: draft.data?.clientName,
        installationAddress: draft.data?.installationAddress,
        propertyAddress: draft.data?.propertyAddress,
        lastModified: new Date(draft.lastModified),
        reportId: draft.reportId,
      };
    } catch (error) {
      return null;
    }
  },

  /**
   * Clear all drafts for a report type
   * Used when user explicitly starts fresh
   */
  clearAllDrafts: (reportType: string): void => {
    try {
      const keys = getDraftKeys(reportType);
      keys.forEach((key) => safeRemove(key));
    } catch (error) {
      console.error('[DraftStorage] Failed to clear all drafts:', error);
    }
  },

  /**
   * Get all drafts for debugging/admin
   */
  getAllDrafts: (): { reportType: string; reportId: string | null; lastModified: Date }[] => {
    const drafts: { reportType: string; reportId: string | null; lastModified: Date }[] = [];

    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(DRAFT_PREFIX)) {
          try {
            const data = safeGetJSON<{ lastModified?: number }>(key, {});
            const parts = key.replace(DRAFT_PREFIX, '').split('-');
            const reportType = parts[0];
            const reportId = parts.slice(1).join('-') || null;

            drafts.push({
              reportType,
              reportId: reportId === 'new' ? null : reportId,
              lastModified: new Date(data.lastModified || 0),
            });
          } catch {
            // Skip invalid entries
          }
        }
      }
    } catch {
      // localStorage not available
    }

    return drafts.sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime());
  },

  /**
   * Check if local draft is newer than cloud data
   * Used to decide whether to use local or cloud data on load
   */
  isLocalDraftNewer: (
    reportType: string,
    reportId: string | null,
    cloudUpdatedAt: string | null
  ): boolean => {
    try {
      const key = getDraftKey(reportType, reportId);
      const draft = safeGetJSON<DraftData | null>(key, null);
      if (!draft) return false;

      const localTime = draft.lastModified || 0;
      const cloudTime = cloudUpdatedAt ? new Date(cloudUpdatedAt).getTime() : 0;

      // Require 10s+ gap to prefer local over cloud (clock-skew tolerance)
      const CLOCK_SKEW_BUFFER_MS = 10_000;
      return localTime > cloudTime + CLOCK_SKEW_BUFFER_MS;
    } catch (error) {
      console.error('[DraftStorage] Failed to compare timestamps:', error);
      return false;
    }
  },

  /**
   * Get the last modified timestamp of a draft
   */
  getDraftTimestamp: (reportType: string, reportId: string | null): number | null => {
    try {
      const key = getDraftKey(reportType, reportId);
      const draft = safeGetJSON<DraftData | null>(key, null);
      if (!draft) return null;

      return draft.lastModified || null;
    } catch (error) {
      return null;
    }
  },
};
