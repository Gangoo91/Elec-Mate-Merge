/**
 * Line-item reorder — ELE-1548
 *
 * Move a quote or invoice line up/down. The order is how the job reads to the
 * client, and the first thing on the page is what they judge the price against.
 * Before this, the only way to reorder was to delete lines and re-add them.
 *
 * Deliberately simpler than `circuitReorder.ts`:
 *
 *  - **No renumbering.** Circuits carry a `circuitNumber` that has to stay in
 *    step with the row order. A line item has no positional identity, so a
 *    plain swap is the whole operation.
 *  - **No scoping.** Circuit moves are scoped to a board so a way can't jump
 *    between consumer units. Both builders render their items as one flat list
 *    (no category grouping in the builder), so a whole-list swap matches what
 *    the user sees. Invoices keep `items` and `additional_invoice_items` as
 *    separate arrays and each reorders within itself — again matching how they
 *    are displayed.
 *
 * Persistence is free: items carry a stable `id`, `quotes.items` is a JSON
 * array, and array order *is* the order. No `sort_order` column, and the
 * existing autosave picks the new order up unchanged.
 */

/** Minimum shape needed to reorder — anything with a stable id. */
interface Identified {
  id: string;
}

const move = <T extends Identified>(items: T[], id: string, direction: -1 | 1): T[] => {
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return items;

  const swapIndex = index + direction;
  if (swapIndex < 0 || swapIndex >= items.length) return items;

  const next = [...items];
  [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  return next;
};

export const moveLineItemUp = <T extends Identified>(items: T[], id: string): T[] =>
  move(items, id, -1);

export const moveLineItemDown = <T extends Identified>(items: T[], id: string): T[] =>
  move(items, id, 1);

/**
 * Move within whichever of several lists holds the item, leaving the others
 * untouched. Returns the same array references when nothing moved, so a
 * setState from this can't cause a needless re-render.
 *
 * Used by invoices, where a line lives in either `items` or
 * `additional_invoice_items` and `removeInvoiceItem` already treats the two as
 * one search space.
 */
export const moveLineItemAcross = <T extends Identified>(
  lists: T[][],
  id: string,
  direction: 'up' | 'down'
): T[][] =>
  lists.map((list) =>
    list.some((item) => item.id === id)
      ? move(list, id, direction === 'up' ? -1 : 1)
      : list
  );
