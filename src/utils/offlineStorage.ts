import { openDB, DBSchema, IDBPDatabase } from 'idb';

// Database schema definition
interface ElecMateDB extends DBSchema {
  'form-drafts': {
    key: string;
    value: {
      reportType: string;
      data: any;
      updatedAt: string;
    };
  };
  'photos': {
    key: string;
    value: {
      reportId: string;
      blob: Blob;
      filename: string;
      timestamp: string;
    };
  };
  'inspector-profiles': {
    key: string;
    value: any;
  };
  'signature-profiles': {
    key: string;
    value: any;
  };
  'user-preferences': {
    key: string;
    value: any;
  };
  'test-instruments': {
    key: string;
    value: string[];
  };
  'table-preferences': {
    key: string;
    value: any;
  };
  'ui-positions': {
    key: string;
    value: { x: number; y: number };
  };
  'api-credentials': {
    key: string;
    value: { [key: string]: string };
  };
  'temp-report-ids': {
    key: string;
    value: string;
  };
  'migration-flags': {
    key: string;
    value: boolean;
  };
}

class OfflineStorageManager {
  private dbPromise: Promise<IDBPDatabase<ElecMateDB>>;
  private readonly DB_NAME = 'elecmate-storage';
  private readonly DB_VERSION = 1;

  constructor() {
    this.dbPromise = this.initDB();
  }

  private async initDB(): Promise<IDBPDatabase<ElecMateDB>> {
    return openDB<ElecMateDB>(this.DB_NAME, 2, {
      upgrade(db) {
        // Create object stores if they don't exist
        if (!db.objectStoreNames.contains('form-drafts')) {
          db.createObjectStore('form-drafts');
        }
        if (!db.objectStoreNames.contains('photos')) {
          db.createObjectStore('photos');
        }
        if (!db.objectStoreNames.contains('inspector-profiles')) {
          db.createObjectStore('inspector-profiles');
        }
        if (!db.objectStoreNames.contains('signature-profiles')) {
          db.createObjectStore('signature-profiles');
        }
        if (!db.objectStoreNames.contains('user-preferences')) {
          db.createObjectStore('user-preferences');
        }
        if (!db.objectStoreNames.contains('test-instruments')) {
          db.createObjectStore('test-instruments');
        }
        if (!db.objectStoreNames.contains('table-preferences')) {
          db.createObjectStore('table-preferences');
        }
        if (!db.objectStoreNames.contains('ui-positions')) {
          db.createObjectStore('ui-positions');
        }
        if (!db.objectStoreNames.contains('api-credentials')) {
          db.createObjectStore('api-credentials');
        }
        if (!db.objectStoreNames.contains('temp-report-ids')) {
          db.createObjectStore('temp-report-ids');
        }
        if (!db.objectStoreNames.contains('migration-flags')) {
          db.createObjectStore('migration-flags');
        }
      },
    });
  }

  // Form Drafts
  async saveDraft(reportType: string, data: any): Promise<void> {
    const db = await this.dbPromise;
    await db.put('form-drafts', {
      reportType,
      data,
      updatedAt: new Date().toISOString(),
    }, reportType);
  }

  async getDraft(reportType: string): Promise<any> {
    const db = await this.dbPromise;
    const draft = await db.get('form-drafts', reportType);
    return draft?.data || null;
  }

  async clearDraft(reportType: string): Promise<void> {
    const db = await this.dbPromise;
    await db.delete('form-drafts', reportType);
  }

  // Photos
  async savePhoto(reportId: string, blob: Blob, filename: string): Promise<string> {
    const db = await this.dbPromise;
    const photoId = crypto.randomUUID();
    await db.put('photos', {
      reportId,
      blob,
      filename,
      timestamp: new Date().toISOString(),
    }, photoId);
    return photoId;
  }

  async getPhotos(reportId: string): Promise<Array<{ id: string; blob: Blob; filename: string }>> {
    const db = await this.dbPromise;
    const tx = db.transaction('photos', 'readonly');
    const store = tx.objectStore('photos');
    const allPhotos = await store.getAll();
    const allKeys = await store.getAllKeys();
    
    return allPhotos
      .map((photo, index) => ({
        id: allKeys[index] as string,
        blob: photo.blob,
        filename: photo.filename,
      }))
      .filter(photo => allPhotos[allPhotos.indexOf(allPhotos.find(p => p.reportId === reportId)!)].reportId === reportId);
  }

  async deletePhoto(photoId: string): Promise<void> {
    const db = await this.dbPromise;
    await db.delete('photos', photoId);
  }

  // Inspector Profiles
  async saveInspectorProfile(profile: any): Promise<void> {
    const db = await this.dbPromise;
    await db.put('inspector-profiles', profile, profile.id);
  }

  async getInspectorProfiles(): Promise<any[]> {
    const db = await this.dbPromise;
    return await db.getAll('inspector-profiles');
  }

  async deleteInspectorProfile(id: string): Promise<void> {
    const db = await this.dbPromise;
    await db.delete('inspector-profiles', id);
  }

  // Signature Profiles
  async saveSignatureProfile(profile: any): Promise<void> {
    const db = await this.dbPromise;
    await db.put('signature-profiles', profile, profile.id);
  }

  async getSignatureProfiles(): Promise<any[]> {
    const db = await this.dbPromise;
    return await db.getAll('signature-profiles');
  }

  async deleteSignatureProfile(id: string): Promise<void> {
    const db = await this.dbPromise;
    await db.delete('signature-profiles', id);
  }

  // User Preferences
  async setPreference(key: string, value: any): Promise<void> {
    const db = await this.dbPromise;
    await db.put('user-preferences', value, key);
  }

  async getPreference(key: string): Promise<any> {
    const db = await this.dbPromise;
    return await db.get('user-preferences', key);
  }

  // Migration from localStorage
  async migrateFromLocalStorage(): Promise<void> {
    console.log('[OfflineStorage] Starting localStorage migration...');
    
    try {
      // Check if migration already completed
      const migrated = await this.getPreference('migration_completed');
      if (migrated) {
        console.log('[OfflineStorage] Migration already completed');
        return;
      }

      let migratedCount = 0;

      // Migrate form drafts
      const formDraftKeys = ['minorWorksForm_draft', 'eic-auto-save'];
      for (const key of formDraftKeys) {
        const data = localStorage.getItem(key);
        if (data) {
          try {
            const parsed = JSON.parse(data);
            const reportType = key.includes('minor') ? 'minor-works' : 'eic';
            await this.saveDraft(reportType, parsed.formData || parsed);
            migratedCount++;
          } catch (e) {
            console.error(`Failed to migrate ${key}:`, e);
          }
        }
      }

      // Migrate inspector profiles
      const inspectorProfiles = localStorage.getItem('inspector_profiles');
      if (inspectorProfiles) {
        try {
          const profiles = JSON.parse(inspectorProfiles);
          for (const profile of profiles) {
            await this.saveInspectorProfile(profile);
            migratedCount++;
          }
        } catch (e) {
          console.error('Failed to migrate inspector profiles:', e);
        }
      }

      // Migrate signature profiles
      const signatureProfiles = localStorage.getItem('signature_profiles');
      if (signatureProfiles) {
        try {
          const profiles = JSON.parse(signatureProfiles);
          for (const profile of profiles) {
            await this.saveSignatureProfile(profile);
            migratedCount++;
          }
        } catch (e) {
          console.error('Failed to migrate signature profiles:', e);
        }
      }

      // Migrate user preferences
      const prefsToMigrate = [
        'autoSaveEnabled',
        'autoSaveInterval',
        'minorWorks_smartDefaults',
        'elecmate-tour-completed'
      ];
      
      for (const key of prefsToMigrate) {
        const value = localStorage.getItem(key);
        if (value) {
          try {
            const parsed = value.startsWith('{') || value.startsWith('[') ? JSON.parse(value) : value;
            await this.setPreference(key, parsed);
            migratedCount++;
          } catch (e) {
            console.error(`Failed to migrate preference ${key}:`, e);
          }
        }
      }

      // Mark migration as complete
      await this.setPreference('migration_completed', true);
      
      console.log(`[OfflineStorage] Migration completed! Migrated ${migratedCount} items`);
      console.log('[OfflineStorage] Note: localStorage data preserved for compatibility');
    } catch (error) {
      console.error('[OfflineStorage] Migration failed:', error);
    }
  }

  // Test Instruments
  async saveRecentInstrument(instrument: string): Promise<void> {
    const db = await this.dbPromise;
    const existing = (await db.get('test-instruments', 'recent')) || [];
    const updated = [instrument, ...existing.filter((i: string) => i !== instrument)].slice(0, 3);
    await db.put('test-instruments', updated, 'recent');
  }

  async getRecentInstruments(): Promise<string[]> {
    const db = await this.dbPromise;
    return (await db.get('test-instruments', 'recent')) || [];
  }

  // Save full instrument details (make, serial, calibration) - keyed by instrument make
  async saveInstrumentDetails(make: string, details: { serialNumber: string; calibrationDate: string }): Promise<void> {
    if (!make || make === 'Other') return;
    const db = await this.dbPromise;
    await db.put('test-instruments', { ...details, lastUsed: Date.now() }, `details-${make}`);
  }

  // Get saved details for a specific instrument make
  async getInstrumentDetails(make: string): Promise<{ serialNumber: string; calibrationDate: string } | null> {
    if (!make || make === 'Other') return null;
    const db = await this.dbPromise;
    const details = await db.get('test-instruments', `details-${make}`);
    return details ? { serialNumber: details.serialNumber || '', calibrationDate: details.calibrationDate || '' } : null;
  }

  // Table Preferences
  async setTablePreference(key: string, value: any): Promise<void> {
    const db = await this.dbPromise;
    await db.put('table-preferences', value, key);
  }

  async getTablePreference(key: string): Promise<any> {
    const db = await this.dbPromise;
    return await db.get('table-preferences', key);
  }

  // UI Positions
  async saveUiPosition(componentId: string, position: { x: number; y: number }): Promise<void> {
    const db = await this.dbPromise;
    await db.put('ui-positions', position, componentId);
  }

  async getUiPosition(componentId: string): Promise<{ x: number; y: number } | null> {
    const db = await this.dbPromise;
    return (await db.get('ui-positions', componentId)) || null;
  }

  // API Credentials
  async saveApiCredential(service: string, key: string, value: string | null): Promise<void> {
    const db = await this.dbPromise;
    const existing = (await db.get('api-credentials', service)) || {};
    if (value === null) {
      delete existing[key];
    } else {
      existing[key] = value;
    }
    await db.put('api-credentials', existing, service);
  }

  async getApiCredentials(service: string): Promise<any> {
    const db = await this.dbPromise;
    return (await db.get('api-credentials', service)) || {};
  }

  // Temp Report IDs
  async saveTempReportId(reportType: string, tempId: string): Promise<void> {
    const db = await this.dbPromise;
    await db.put('temp-report-ids', tempId, reportType);
  }

  async getTempReportId(reportType: string): Promise<string | null> {
    const db = await this.dbPromise;
    return (await db.get('temp-report-ids', reportType)) || null;
  }

  async clearTempReportId(reportType: string): Promise<void> {
    const db = await this.dbPromise;
    await db.delete('temp-report-ids', reportType);
  }

  // Migration Flags
  async getMigrationFlag(key: string): Promise<boolean> {
    const db = await this.dbPromise;
    return (await db.get('migration-flags', key)) || false;
  }

  async setMigrationFlag(key: string, value: boolean): Promise<void> {
    const db = await this.dbPromise;
    await db.put('migration-flags', value, key);
  }

  // Clear all data (for testing)
  async clearAll(): Promise<void> {
    const db = await this.dbPromise;
    await db.clear('form-drafts');
    await db.clear('photos');
    await db.clear('inspector-profiles');
    await db.clear('signature-profiles');
    await db.clear('user-preferences');
    await db.clear('test-instruments');
    await db.clear('table-preferences');
    await db.clear('ui-positions');
    await db.clear('api-credentials');
    await db.clear('temp-report-ids');
    await db.clear('migration-flags');
    console.log('[OfflineStorage] All stores cleared');
  }
}

// Export singleton instance
export const offlineStorage = new OfflineStorageManager();
