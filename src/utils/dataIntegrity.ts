/**
 * Data Integrity & Validation Utilities
 * Ensures certificate data is never lost and always validates correctly
 *
 * PHILOSOPHY: Trust nothing, verify everything, never show empty data when data exists
 */

import { supabase } from '@/integrations/supabase/client';

// Minimum expected fields for each report type
const MINIMUM_FIELDS: Record<string, string[]> = {
  eic: ['clientName', 'installationAddress'],
  eicr: ['clientName', 'installationAddress'],
  'minor-works': ['clientName', 'installationAddress'],
};

// Fields that indicate meaningful data exists
const SIGNATURE_FIELDS = [
  'clientName',
  'installationAddress',
  'propertyAddress',
  'inspectorName',
  'contractorName',
  'inspectionDate',
  'workDate',
  'testDate',
];

export interface DataIntegrityResult {
  isValid: boolean;
  hasData: boolean;
  fieldCount: number;
  missingCriticalFields: string[];
  warnings: string[];
  suggestions: string[];
}

export interface LoadValidationResult {
  success: boolean;
  data: any;
  databaseId: string | null;
  integrity: DataIntegrityResult;
  source: 'cloud' | 'local' | 'backup' | 'failed';
  recoveryAttempted: boolean;
}

/**
 * Validates that loaded data actually contains meaningful content
 * Prevents showing empty forms when data should exist
 */
export function validateLoadedData(
  data: any,
  reportType: string
): DataIntegrityResult {
  const result: DataIntegrityResult = {
    isValid: false,
    hasData: false,
    fieldCount: 0,
    missingCriticalFields: [],
    warnings: [],
    suggestions: [],
  };

  // Null/undefined check
  if (!data || typeof data !== 'object') {
    result.warnings.push('Data is null or not an object');
    result.suggestions.push('Try refreshing the page or check your connection');
    return result;
  }

  // Count non-null, non-empty fields
  const nonEmptyFields = Object.entries(data).filter(([key, value]) => {
    if (value === null || value === undefined || value === '') return false;
    if (Array.isArray(value) && value.length === 0) return false;
    if (typeof value === 'object' && Object.keys(value).length === 0) return false;
    // Skip internal/metadata fields
    if (key.startsWith('_') || key === 'updated_at' || key === 'created_at') return false;
    return true;
  });

  result.fieldCount = nonEmptyFields.length;
  result.hasData = result.fieldCount > 0;

  // Check for signature fields (indicates real user data)
  const presentSignatureFields = SIGNATURE_FIELDS.filter(field => {
    const value = data[field];
    return value && typeof value === 'string' && value.trim().length > 0;
  });

  // Check minimum required fields
  const minimumFields = MINIMUM_FIELDS[reportType] || MINIMUM_FIELDS['eic'];
  result.missingCriticalFields = minimumFields.filter(field => {
    const value = data[field];
    return !value || (typeof value === 'string' && value.trim().length === 0);
  });

  // Determine validity
  if (presentSignatureFields.length >= 1 || result.fieldCount >= 3) {
    result.isValid = true;
  }

  // Add warnings for suspicious states
  if (result.fieldCount === 0) {
    result.warnings.push('No data fields found in loaded certificate');
  } else if (result.fieldCount < 3) {
    result.warnings.push(`Only ${result.fieldCount} fields loaded - this seems incomplete`);
  }

  if (result.missingCriticalFields.length > 0 && result.fieldCount > 5) {
    result.warnings.push(`Missing critical fields: ${result.missingCriticalFields.join(', ')}`);
  }

  return result;
}

/**
 * Triple-layer backup storage key generator
 */
function getBackupKey(reportType: string, reportId: string): string {
  return `elecmate_backup_${reportType}_${reportId}`;
}

/**
 * Save to localStorage backup (third layer of redundancy)
 */
export function saveToLocalStorageBackup(
  reportType: string,
  reportId: string,
  data: any
): boolean {
  try {
    const key = getBackupKey(reportType, reportId);
    const backup = {
      data,
      savedAt: new Date().toISOString(),
      reportType,
      reportId,
    };
    localStorage.setItem(key, JSON.stringify(backup));
    console.log('[DataIntegrity] Saved to localStorage backup:', key);
    return true;
  } catch (error) {
    console.warn('[DataIntegrity] Failed to save localStorage backup:', error);
    return false;
  }
}

/**
 * Load from localStorage backup
 */
export function loadFromLocalStorageBackup(
  reportType: string,
  reportId: string
): { data: any; savedAt: string } | null {
  try {
    const key = getBackupKey(reportType, reportId);
    const stored = localStorage.getItem(key);
    if (!stored) return null;

    const backup = JSON.parse(stored);
    console.log('[DataIntegrity] Found localStorage backup from:', backup.savedAt);
    return { data: backup.data, savedAt: backup.savedAt };
  } catch (error) {
    console.warn('[DataIntegrity] Failed to load localStorage backup:', error);
    return null;
  }
}

/**
 * Clear localStorage backup (after successful cloud sync)
 */
export function clearLocalStorageBackup(reportType: string, reportId: string): void {
  try {
    const key = getBackupKey(reportType, reportId);
    localStorage.removeItem(key);
  } catch (error) {
    // Ignore cleanup errors
  }
}

/**
 * List all localStorage backups for recovery
 */
export function listAllBackups(): Array<{
  reportType: string;
  reportId: string;
  savedAt: string;
  fieldCount: number;
}> {
  const backups: Array<{
    reportType: string;
    reportId: string;
    savedAt: string;
    fieldCount: number;
  }> = [];

  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('elecmate_backup_')) {
        const stored = localStorage.getItem(key);
        if (stored) {
          const backup = JSON.parse(stored);
          const fieldCount = Object.keys(backup.data || {}).filter(k => !k.startsWith('_')).length;
          backups.push({
            reportType: backup.reportType,
            reportId: backup.reportId,
            savedAt: backup.savedAt,
            fieldCount,
          });
        }
      }
    }
  } catch (error) {
    console.warn('[DataIntegrity] Error listing backups:', error);
  }

  return backups.sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime());
}

/**
 * Direct database check - bypasses all caching to verify data exists
 * Use when you suspect data load failed but data should exist
 */
export async function verifyDataExistsInDatabase(
  reportId: string,
  userId: string
): Promise<{ exists: boolean; fieldCount: number; hasData: boolean }> {
  try {
    const { data, error } = await supabase
      .from('reports')
      .select('data')
      .eq('report_id', reportId)
      .eq('user_id', userId)
      .is('deleted_at', null)
      .maybeSingle();

    if (error || !data) {
      return { exists: false, fieldCount: 0, hasData: false };
    }

    const reportData = data.data || {};
    const fieldCount = Object.keys(reportData).filter(k => !k.startsWith('_')).length;

    return {
      exists: true,
      fieldCount,
      hasData: fieldCount > 0,
    };
  } catch (error) {
    console.error('[DataIntegrity] Database verification failed:', error);
    return { exists: false, fieldCount: 0, hasData: false };
  }
}

/**
 * Emergency data recovery - tries all available sources
 */
export async function emergencyDataRecovery(
  reportType: string,
  reportId: string,
  userId: string
): Promise<{
  recovered: boolean;
  data: any;
  source: 'database' | 'indexeddb' | 'localstorage' | 'none';
  message: string;
}> {
  console.log('[DataIntegrity] Starting emergency data recovery for:', reportId);

  // Try 1: Direct database query
  try {
    const { data, error } = await supabase
      .from('reports')
      .select('data')
      .eq('report_id', reportId)
      .eq('user_id', userId)
      .is('deleted_at', null)
      .maybeSingle();

    if (!error && data?.data && Object.keys(data.data).length > 0) {
      console.log('[DataIntegrity] Recovered from database');
      return {
        recovered: true,
        data: data.data,
        source: 'database',
        message: 'Data recovered from cloud database',
      };
    }
  } catch (e) {
    console.warn('[DataIntegrity] Database recovery failed:', e);
  }

  // Try 2: IndexedDB (handled by existing useReportSync)
  // Skip here as the hook handles this

  // Try 3: localStorage backup
  const localBackup = loadFromLocalStorageBackup(reportType, reportId);
  if (localBackup?.data && Object.keys(localBackup.data).length > 0) {
    console.log('[DataIntegrity] Recovered from localStorage backup');
    return {
      recovered: true,
      data: localBackup.data,
      source: 'localstorage',
      message: `Data recovered from local backup (saved ${new Date(localBackup.savedAt).toLocaleString()})`,
    };
  }

  console.log('[DataIntegrity] No data could be recovered');
  return {
    recovered: false,
    data: null,
    source: 'none',
    message: 'No backup data found. The certificate may be new or was deleted.',
  };
}

/**
 * Log data integrity event for monitoring
 */
export function logIntegrityEvent(
  event: 'load_empty' | 'load_success' | 'recovery_attempted' | 'recovery_success' | 'recovery_failed' | 'backup_saved',
  details: {
    reportType: string;
    reportId?: string;
    fieldCount?: number;
    source?: string;
    error?: string;
  }
): void {
  const logEntry = {
    event,
    timestamp: new Date().toISOString(),
    ...details,
  };

  console.log('[DataIntegrity Event]', logEntry);

  // Store recent events for debugging
  try {
    const eventsKey = 'elecmate_integrity_events';
    const existing = JSON.parse(localStorage.getItem(eventsKey) || '[]');
    existing.unshift(logEntry);
    // Keep last 50 events
    localStorage.setItem(eventsKey, JSON.stringify(existing.slice(0, 50)));
  } catch (e) {
    // Ignore storage errors
  }
}

/**
 * Get recent integrity events for debugging
 */
export function getRecentIntegrityEvents(): any[] {
  try {
    return JSON.parse(localStorage.getItem('elecmate_integrity_events') || '[]');
  } catch {
    return [];
  }
}
