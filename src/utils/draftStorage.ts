// Local Draft Storage - Best-in-Class
// Saves form data to localStorage for instant access and crash recovery

const DRAFT_PREFIX = 'elec-mate-draft-';
const MAX_DRAFTS_PER_TYPE = 5;

interface DraftData {
  data: any;
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
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(`${DRAFT_PREFIX}${reportType}`)) {
      keys.push(key);
    }
  }
  return keys;
};

export const draftStorage = {
  /**
   * Save current form state to local storage
   * Called every 10 seconds during editing
   */
  saveDraft: (reportType: string, reportId: string | null, data: any): void => {
    try {
      const key = getDraftKey(reportType, reportId);
      const existing = localStorage.getItem(key);
      const existingData: DraftData | null = existing ? JSON.parse(existing) : null;

      const draft: DraftData = {
        data,
        lastModified: Date.now(),
        reportId,
        version: (existingData?.version || 0) + 1,
      };

      localStorage.setItem(key, JSON.stringify(draft));

      // Clean up old drafts if we have too many
      const keys = getDraftKeys(reportType);
      if (keys.length > MAX_DRAFTS_PER_TYPE) {
        // Sort by last modified, oldest first
        const sorted = keys
          .map(k => {
            try {
              const d = JSON.parse(localStorage.getItem(k) || '{}');
              return { key: k, lastModified: d.lastModified || 0 };
            } catch {
              return { key: k, lastModified: 0 };
            }
          })
          .sort((a, b) => a.lastModified - b.lastModified);

        // Remove oldest drafts
        const toRemove = sorted.slice(0, sorted.length - MAX_DRAFTS_PER_TYPE);
        toRemove.forEach(({ key: k }) => localStorage.removeItem(k));
      }
    } catch (error) {
      console.error('[DraftStorage] Failed to save draft:', error);
    }
  },

  /**
   * Load draft for recovery
   * Returns the most recent draft for this report type/id
   */
  loadDraft: (reportType: string, reportId?: string | null): { data: any; lastModified: Date } | null => {
    try {
      const key = getDraftKey(reportType, reportId);
      const stored = localStorage.getItem(key);

      if (stored) {
        const draft: DraftData = JSON.parse(stored);
        return {
          data: draft.data,
          lastModified: new Date(draft.lastModified),
        };
      }

      // If no specific draft, try the "new" draft
      if (reportId) {
        const newKey = getDraftKey(reportType, null);
        const newStored = localStorage.getItem(newKey);
        if (newStored) {
          const draft: DraftData = JSON.parse(newStored);
          return {
            data: draft.data,
            lastModified: new Date(draft.lastModified),
          };
        }
      }

      return null;
    } catch (error) {
      console.error('[DraftStorage] Failed to load draft:', error);
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
      const stored = localStorage.getItem(key);
      if (!stored) return false;

      const draft: DraftData = JSON.parse(stored);

      // Check if draft has meaningful data
      const hasData =
        draft.data?.clientName ||
        draft.data?.installationAddress ||
        draft.data?.propertyAddress ||
        (draft.data?.circuits && draft.data.circuits.length > 0) ||
        (draft.data?.scheduleOfTests && draft.data.scheduleOfTests.length > 0);

      // Check if draft is recent (within 7 days)
      const isRecent = Date.now() - draft.lastModified < 7 * 24 * 60 * 60 * 1000;

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
      localStorage.removeItem(key);

      // Also clear the "new" draft if we just synced a new report
      if (reportId) {
        const newKey = getDraftKey(reportType, null);
        localStorage.removeItem(newKey);
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
      const stored = localStorage.getItem(key);
      if (!stored) return null;

      const draft: DraftData = JSON.parse(stored);

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
      keys.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error('[DraftStorage] Failed to clear all drafts:', error);
    }
  },

  /**
   * Get all drafts for debugging/admin
   */
  getAllDrafts: (): { reportType: string; reportId: string | null; lastModified: Date }[] => {
    const drafts: { reportType: string; reportId: string | null; lastModified: Date }[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(DRAFT_PREFIX)) {
        try {
          const data = JSON.parse(localStorage.getItem(key) || '{}');
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
      const stored = localStorage.getItem(key);
      if (!stored) return false;

      const draft: DraftData = JSON.parse(stored);
      const localTime = draft.lastModified || 0;
      const cloudTime = cloudUpdatedAt ? new Date(cloudUpdatedAt).getTime() : 0;

      return localTime > cloudTime;
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
      const stored = localStorage.getItem(key);
      if (!stored) return null;

      const draft: DraftData = JSON.parse(stored);
      return draft.lastModified || null;
    } catch (error) {
      return null;
    }
  },
};
