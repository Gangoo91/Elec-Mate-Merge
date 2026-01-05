// One-time migration utility to move localStorage reports to cloud
import { supabase } from '@/integrations/supabase/client';

const MIGRATION_FLAG_KEY = 'legacy-data-migration-complete';

export const migrateLegacyData = {
  /**
   * Check if migration has already been completed
   */
  async hasCompletedMigration(): Promise<boolean> {
    try {
      const { offlineStorage } = await import('@/utils/offlineStorage');
      return await offlineStorage.getMigrationFlag('legacy-data-migration-complete');
    } catch {
      return false;
    }
  },

  /**
   * Mark migration as complete
   */
  async markMigrationComplete(): Promise<void> {
    try {
      const { offlineStorage } = await import('@/utils/offlineStorage');
      await offlineStorage.setMigrationFlag('legacy-data-migration-complete', true);
    } catch (error) {
      console.error('[Migration] Failed to mark migration complete:', error);
    }
  },

  /**
   * Get count of local reports that need migration
   */
  getLocalReportsCount(): number {
    return 0;
  },

  /**
   * Migrate all local reports to cloud
   */
  async migrateToCloud(userId: string): Promise<{ success: number; failed: number; errors: string[] }> {
    const result = { success: 0, failed: 0, errors: [] as string[] };
    return result;
  },

  /**
   * Clear all local reports after successful migration
   */
  clearLocalReports(): void {},
};
