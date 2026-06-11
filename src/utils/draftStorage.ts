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
const getDraftKey = (reportType: string, reportId?: string | null): string => {
  if (reportId) {
    return `${DRAFT_PREFIX}${reportType}-${reportId}`;
  }
  return `${DRAFT_PREFIX}${reportType}-new`;
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
      const key = getDraftKey(reportType, reportId);
      const existingData = safeGetJSON<DraftData | null>(key, null);

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
          best = { draft, reportId: idPart === 'new' ? null : idPart };
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
      const key = getDraftKey(reportType, null);
      const draft = safeGetJSON<DraftData | null>(key, null);
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
  clearDraft: (reportType: string, reportId?: string | null): void => {
    try {
      const key = getDraftKey(reportType, reportId);
      safeRemove(key);

      // Also clear the "new" draft if we just synced a new report
      if (reportId) {
        const newKey = getDraftKey(reportType, null);
        safeRemove(newKey);
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
      const key = getDraftKey(reportType, null);
      const draft = safeGetJSON<DraftData | null>(key, null);
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
