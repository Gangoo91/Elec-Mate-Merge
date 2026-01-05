// Utility functions for mobile horizontal scrolling table

export type ColumnGroup = 
  | 'circuit'
  | 'conductors'
  | 'protection'
  | 'continuity'
  | 'insulation'
  | 'other'
  | 'rcd';

export interface ColumnGroupConfig {
  id: ColumnGroup;
  label: string;
  icon: string;
  color: string;
  columns: number;
  width: number; // in pixels
}

export const columnGroups: ColumnGroupConfig[] = [
  { id: 'circuit', label: 'Circuit', icon: '⚡', color: 'bg-blue-50', columns: 5, width: 410 },
  { id: 'conductors', label: 'Conductors', icon: '🔌', color: 'bg-green-50', columns: 2, width: 160 },
  { id: 'protection', label: 'Protection', icon: '🛡️', color: 'bg-amber-50', columns: 5, width: 405 },
  { id: 'rcd', label: 'RCD', icon: '🔒', color: 'bg-red-50', columns: 4, width: 320 },
  { id: 'continuity', label: 'Continuity', icon: '🔗', color: 'bg-blue-50', columns: 5, width: 400 },
  { id: 'insulation', label: 'Insulation', icon: '⚡', color: 'bg-green-50', columns: 3, width: 240 },
  { id: 'other', label: 'Other', icon: '📊', color: 'bg-purple-50', columns: 2, width: 160 },
];

export const getVisibleColumnGroup = (scrollLeft: number, containerWidth: number): ColumnGroup => {
  let accumulatedWidth = 0;
  const scrollCenter = scrollLeft + containerWidth / 2;

  for (const group of columnGroups) {
    accumulatedWidth += group.width;
    if (scrollCenter < accumulatedWidth) {
      return group.id;
    }
  }

  return columnGroups[columnGroups.length - 1].id;
};

export const smoothScrollToGroup = (
  container: HTMLElement | null,
  groupId: ColumnGroup
) => {
  if (!container) return;

  const groupIndex = columnGroups.findIndex(g => g.id === groupId);
  if (groupIndex === -1) return;

  let scrollPosition = 0;
  for (let i = 0; i < groupIndex; i++) {
    scrollPosition += columnGroups[i].width;
  }

  container.scrollTo({
    left: scrollPosition,
    behavior: 'smooth'
  });
};

export const GESTURE_HINT_KEY = 'mobile_table_gesture_hint_shown';

export const hasSeenGestureHint = async (): Promise<boolean> => {
  const { offlineStorage } = await import('@/utils/offlineStorage');
  return (await offlineStorage.getTablePreference('gesture_hint_shown')) === true;
};

export const markGestureHintSeen = async (): Promise<void> => {
  const { offlineStorage } = await import('@/utils/offlineStorage');
  await offlineStorage.setTablePreference('gesture_hint_shown', true);
};

export const TABLE_VIEW_PREFERENCE_KEY = 'mobile_test_table_view_preference';

export const getTableViewPreference = async (): Promise<'table' | 'card'> => {
  const { offlineStorage } = await import('@/utils/offlineStorage');
  const pref = await offlineStorage.getTablePreference('table_view_preference');
  return pref === 'card' ? 'card' : 'table'; // Default to table view
};

export const setTableViewPreference = async (view: 'table' | 'card'): Promise<void> => {
  const { offlineStorage } = await import('@/utils/offlineStorage');
  await offlineStorage.setTablePreference('table_view_preference', view);
};
