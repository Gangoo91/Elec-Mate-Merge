// DEPRECATED: Auto-save now handled by useCloudSync

export const useAutoSave = (options?: any) => ({
  hasUnsavedChanges: false,
  isSaving: false,
  lastSaveTime: undefined,
  manualSave: async () => {},
});
