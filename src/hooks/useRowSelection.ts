/**
 * Row selection for the schedule of tests — ELE-1494.
 *
 * The bulk tools we have act on a whole board, or on rows matched by a rule.
 * Neither says "these six circuits". On a 23-way board where the upstairs
 * lighting shares a limitation, that is six separate edits.
 *
 * The scoped write already exists: `handleBulkFieldUpdate(field, value, ids)`
 * takes an arbitrary id list and already skips spare ways. Nothing ever passed
 * it a user selection — both call sites hand it `circuits.map(c => c.id)`, i.e.
 * the whole board. This hook is the missing half.
 *
 * Kept as a hook rather than component state so the selection is one object
 * with one set of rules, and a second surface (mobile long-press) can adopt it
 * without reimplementing shift-range behaviour.
 */
import { useCallback, useMemo, useState } from 'react';

export interface RowSelection {
  selectedIds: Set<string>;
  count: number;
  isSelected: (id: string) => boolean;
  /** Plain click. `orderedIds` is the on-screen order, for shift-ranges. */
  toggle: (id: string, orderedIds: string[], shiftKey?: boolean) => void;
  selectAll: (ids: string[]) => void;
  clear: () => void;
  /** True when every id given is selected — drives the header checkbox. */
  allSelected: (ids: string[]) => boolean;
  /** True when some but not all are selected — the indeterminate state. */
  someSelected: (ids: string[]) => boolean;
  /** Drops ids that no longer exist, after a delete or a board switch. */
  retain: (ids: string[]) => void;
}

export const useRowSelection = (): RowSelection => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  // Anchor for shift-click. Held separately from the selection because the
  // range runs from the last row *clicked*, not the last row selected — those
  // differ the moment a shift-click deselects.
  const [anchorId, setAnchorId] = useState<string | null>(null);

  const isSelected = useCallback((id: string) => selectedIds.has(id), [selectedIds]);

  const toggle = useCallback(
    (id: string, orderedIds: string[], shiftKey = false) => {
      setSelectedIds((prev) => {
        const next = new Set(prev);

        if (shiftKey && anchorId && anchorId !== id) {
          const from = orderedIds.indexOf(anchorId);
          const to = orderedIds.indexOf(id);
          if (from !== -1 && to !== -1) {
            const [lo, hi] = from < to ? [from, to] : [to, from];
            // A shift-range always selects. Using it to deselect makes the
            // outcome depend on the anchor's state, which is invisible.
            for (let i = lo; i <= hi; i++) next.add(orderedIds[i]);
            return next;
          }
        }

        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
      setAnchorId(id);
    },
    [anchorId]
  );

  const selectAll = useCallback((ids: string[]) => {
    setSelectedIds(new Set(ids));
    setAnchorId(null);
  }, []);

  const clear = useCallback(() => {
    setSelectedIds(new Set());
    setAnchorId(null);
  }, []);

  const allSelected = useCallback(
    (ids: string[]) => ids.length > 0 && ids.every((id) => selectedIds.has(id)),
    [selectedIds]
  );

  const someSelected = useCallback(
    (ids: string[]) => ids.some((id) => selectedIds.has(id)) && !ids.every((id) => selectedIds.has(id)),
    [selectedIds]
  );

  const retain = useCallback((ids: string[]) => {
    const keep = new Set(ids);
    setSelectedIds((prev) => {
      const next = new Set<string>();
      for (const id of prev) if (keep.has(id)) next.add(id);
      // Preserve identity when nothing changed, so consumers do not re-render.
      return next.size === prev.size ? prev : next;
    });
  }, []);

  return useMemo(
    () => ({
      selectedIds,
      count: selectedIds.size,
      isSelected,
      toggle,
      selectAll,
      clear,
      allSelected,
      someSelected,
      retain,
    }),
    [selectedIds, isSelected, toggle, selectAll, clear, allSelected, someSelected, retain]
  );
};
