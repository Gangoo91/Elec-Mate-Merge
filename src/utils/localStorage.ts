// DEPRECATED: This file is kept for compatibility only
// All storage is now cloud-based via useCloudSync

export interface SavePoint {
  id: string;
  name: string;
  timestamp: number;
  data: any;
}

export const localStorage = {
  saveDraft: (data: any) => {},
  loadDraft: () => null,
  clearDraft: () => {},
  saveSavePoint: (savePoint: SavePoint) => {},
  getSavePoints: (): SavePoint[] => [],
  deleteSavePoint: (id: string) => {},
};
