import { useState, useEffect } from 'react';

interface UseReportIdOptions {
  reportType: 'eicr' | 'eic' | 'mwc';
  currentReportId?: string | null;
}

/**
 * Hook to manage report IDs, generating temporary UUIDs for unsaved reports
 * This allows photo uploads before a report is officially saved to the database
 */
export const useReportId = ({ reportType, currentReportId }: UseReportIdOptions) => {
  const [tempReportId, setTempReportId] = useState<string | null>(null);

  // Generate a temporary report ID if none exists
  useEffect(() => {
    const initTempId = async () => {
      if (!currentReportId && !tempReportId) {
        const { offlineStorage } = await import('@/utils/offlineStorage');
        const existingTempId = await offlineStorage.getTempReportId(reportType);
        
        if (existingTempId) {
          setTempReportId(existingTempId);
        } else {
          // Generate new UUID for temporary report ID
          const newTempId = crypto.randomUUID();
          await offlineStorage.saveTempReportId(reportType, newTempId);
          setTempReportId(newTempId);
        }
      }
    };
    initTempId();
  }, [currentReportId, tempReportId, reportType]);

  // Clean up temporary ID when report gets a real ID
  useEffect(() => {
    const clearTempId = async () => {
      if (currentReportId && tempReportId) {
        const { offlineStorage } = await import('@/utils/offlineStorage');
        await offlineStorage.clearTempReportId(reportType);
        setTempReportId(null);
      }
    };
    clearTempId();
  }, [currentReportId, tempReportId, reportType]);

  // Return the effective report ID (real or temporary)
  const effectiveReportId = currentReportId || tempReportId || '';

  return {
    effectiveReportId,
    isTempId: !currentReportId && !!tempReportId,
  };
};
