import { useCallback, useMemo, useState } from 'react';
import { useMaterialsLists, normaliseItemName } from '@/hooks/useMaterialsLists';
import { toast } from '@/hooks/use-toast';

/**
 * Save quote/invoice lines into the price book.
 *
 * The price book is used by a fraction of the people who quote, and under 6% of
 * quote lines come from one — while 236 distinct material lines get retyped by
 * hand, 191 of them never saved anywhere. Asking someone to build a price book
 * before they get any value from it is the wrong way round. This lets the book
 * assemble itself out of work they were doing anyway.
 *
 * Shared by both wizards deliberately: quotes and invoices should not drift
 * into disagreeing about what "already in your price book" means.
 */

/** The list every self-assembled item lands in. */
const PRICE_BOOK_LIST = 'Price Book';

/**
 * The shape both wizards' lines share. Structural rather than importing
 * QuoteItem, so the invoice wizard does not need a cast to use this.
 */
export interface PriceBookSourceLine {
  id: string;
  description?: string;
  category?: string;
  quantity?: number;
  unit?: string;
  unitPrice?: number;
  hours?: number;
  notes?: string;
}

/** Only stock-like lines belong in a materials price book — a labour line
 *  belongs on the rate card, and a one-off manual line is not a product. */
export const isSaveableToPriceBook = (item: PriceBookSourceLine) =>
  (item.category === 'materials' || item.category === 'equipment') && !!item.description?.trim();

export function useSaveToPriceBook(allItems: PriceBookSourceLine[]) {
  const { lists, bulkUpsertItems, createList } = useMaterialsLists();
  const [saving, setSaving] = useState(false);

  /** Every name already in the book, matched the way the importer matches. */
  const priceBookNames = useMemo(() => {
    const set = new Set<string>();
    for (const list of lists) for (const item of list.items) set.add(normaliseItemName(item.name));
    return set;
  }, [lists]);

  const isInPriceBook = useCallback(
    (description?: string) => !!description && priceBookNames.has(normaliseItemName(description)),
    [priceBookNames]
  );

  /** Lines on this document that could be saved but are not in the book yet. */
  const unsavedItems = useMemo(
    () => allItems.filter((i) => isSaveableToPriceBook(i) && !isInPriceBook(i.description)),
    [allItems, isInPriceBook]
  );

  /**
   * Turn a document line into a price-book row.
   *
   * Carries the unit, because £45.99 per roll is not £45.99 each and defaulting
   * to 'each' mis-prices the item on every quote afterwards. Also recovers the
   * labour allowance: an item priced from the book writes a paired
   * "Labour — <name>" line, so the document already knows the time and nobody
   * should have to key it in twice.
   */
  const toRow = useCallback(
    (item: PriceBookSourceLine) => {
      const name = item.description!.trim();
      const qty = item.quantity || 1;
      const paired = allItems.find(
        (l) => l.category === 'labour' && l.description?.trim() === `Labour — ${name}`
      );
      const pairedHours = paired ? (paired.hours ?? paired.quantity ?? 0) : 0;
      const supplier = item.notes?.match(/Supplier:\s*(.+)/i)?.[1]?.trim();

      return {
        name,
        current_price: item.unitPrice ?? 0,
        unit: item.unit,
        supplier_name: supplier || undefined,
        labour_hours: pairedHours > 0 ? Math.round((pairedHours / qty) * 100) / 100 : undefined,
      };
    },
    [allItems]
  );

  const save = useCallback(
    async (items: PriceBookSourceLine[]) => {
      const rows = items.filter(isSaveableToPriceBook).map(toRow);
      if (rows.length === 0) return;

      setSaving(true);
      try {
        let list = lists.find((l) => l.name === PRICE_BOOK_LIST);
        if (!list) {
          const created = await createList(
            PRICE_BOOK_LIST,
            'Items added directly to My Price Book'
          );
          if (!created) return;
          list = created;
        }
        // Upsert rather than append: saving something already there refreshes
        // its price instead of leaving them with two of everything.
        const { added, updated } = await bulkUpsertItems(list.id, rows);
        toast({
          title:
            updated > 0 && added > 0
              ? `${added} saved · ${updated} updated`
              : updated > 0
                ? `${updated} ${updated === 1 ? 'price' : 'prices'} updated`
                : `${added} ${added === 1 ? 'item' : 'items'} saved to your price book`,
          description: rows.length === 1 ? rows[0].name : undefined,
        });
      } finally {
        setSaving(false);
      }
    },
    [lists, bulkUpsertItems, createList, toRow]
  );

  return { save, saving, isInPriceBook, unsavedItems };
}
