/**
 * Keyboard movement around the schedule of test results (ELE-1485).
 *
 * `EnhancedValidatedInput` has always described this behaviour — Enter and the
 * arrows move between cells — through two optional callbacks. No caller ever
 * passed them, and because the component calls `preventDefault()` *before*
 * invoking them, the keys were not merely inert: it cancelled the browser's own
 * behaviour and put nothing in its place. On a thirty-column grid that left Tab
 * as the only way through, while the legend under the table advertised arrows.
 *
 * Wiring the callbacks would have meant threading props through fifteen cell
 * components. The grid is a real table, so the DOM already holds the geometry —
 * one handler on the scroll container reads it and moves focus. Nothing here
 * touches certificate data.
 */

export type GridDirection = 'up' | 'down' | 'left' | 'right';

/**
 * Cells we are willing to land on: enabled text inputs.
 *
 * Deliberately not selects or comboboxes. They own their arrow keys — a select
 * uses Up/Down to change its value — and this only ever runs while a text input
 * has focus, so their behaviour is untouched.
 */
const FOCUSABLE_IN_CELL =
  'input:not([disabled]):not([readonly]):not([type="checkbox"]):not([type="radio"])';

const isNavigableInput = (el: Element | null): el is HTMLInputElement => {
  if (!(el instanceof HTMLInputElement)) return false;
  if (el.disabled || el.readOnly) return false;
  if (el.type === 'checkbox' || el.type === 'radio') return false;
  // A combobox that happens to be an input still owns its own arrow keys.
  return el.getAttribute('role') !== 'combobox' && !el.closest('[role="combobox"]');
};

/** The nearest ancestor that actually scrolls horizontally. */
const horizontalScroller = (from: Element): HTMLElement | null => {
  let el = from.parentElement;
  while (el) {
    const overflowX = getComputedStyle(el).overflowX;
    if ((overflowX === 'auto' || overflowX === 'scroll') && el.scrollWidth > el.clientWidth) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
};

/**
 * Scroll a newly focused cell out from under the frozen columns.
 *
 * The way and description columns are `position: sticky`, so they paint over
 * whatever scrolls beneath them. The browser's own focus scrolling doesn't know
 * that: moving left lands focus on a cell that is technically in view and
 * completely hidden, and the electrician types into a field they cannot see.
 */
const clearOfStickyColumns = (cell: Element): void => {
  const row = cell.closest('tr');
  if (!row || getComputedStyle(cell).position === 'sticky') return;

  let stickyRight = 0;
  for (const sibling of Array.from(row.children)) {
    if (sibling === cell) continue;
    if (getComputedStyle(sibling).position === 'sticky') {
      stickyRight = Math.max(stickyRight, sibling.getBoundingClientRect().right);
    }
  }
  if (stickyRight === 0) return;

  const overlap = stickyRight - cell.getBoundingClientRect().left;
  if (overlap <= 0) return;

  // A little past the edge, so the cell sits clear rather than flush against it.
  horizontalScroller(cell)?.scrollBy({ left: -(overlap + 12) });
};

/** Focus the first usable input in a cell. Returns false if there isn't one. */
const focusCell = (cell: Element | null | undefined): boolean => {
  const input = cell?.querySelector<HTMLInputElement>(FOCUSABLE_IN_CELL);
  if (!input || input.disabled) return false;
  input.focus();
  input.select?.();
  if (cell) clearOfStickyColumns(cell);
  return true;
};

/**
 * Move focus one cell in `direction`, relative to whatever is focused now.
 *
 * Returns true when focus moved, so the caller can leave the event alone when
 * it didn't — pressing Down on the last row should do nothing rather than
 * swallow the key, which is the failure this replaces.
 */
export const moveGridFocus = (direction: GridDirection): boolean => {
  const active = document.activeElement;
  if (!isNavigableInput(active)) return false;

  const cell = active.closest('td');
  const row = cell?.closest('tr');
  const body = row?.parentElement;
  if (!cell || !row || !body) return false;

  if (direction === 'up' || direction === 'down') {
    const rows = Array.from(body.children).filter((r): r is HTMLTableRowElement =>
      r instanceof HTMLTableRowElement
    );
    const rowIndex = rows.indexOf(row as HTMLTableRowElement);
    if (rowIndex === -1) return false;

    // Same column, next row. Column is the cell's position in its own row —
    // every row renders the same cells, so the index is the field.
    const columnIndex = Array.prototype.indexOf.call(row.children, cell);
    const target = rows[rowIndex + (direction === 'down' ? 1 : -1)];
    return focusCell(target?.children[columnIndex]);
  }

  // Horizontal: walk outwards until a cell has something to focus, so the
  // select-only columns are stepped over rather than acting as dead ends.
  const cells = Array.from(row.children);
  const from = cells.indexOf(cell);
  const step = direction === 'right' ? 1 : -1;
  for (let i = from + step; i >= 0 && i < cells.length; i += step) {
    if (focusCell(cells[i])) return true;
  }
  return false;
};

/**
 * Translate a keydown into a move. Returns true when the grid handled it.
 *
 * Plain Left/Right are left alone — they belong to the caret inside the field.
 * Horizontal movement is Cmd/Ctrl-modified, matching what `EnhancedValidatedInput`
 * already documented.
 */
export const handleGridKeyDown = (e: React.KeyboardEvent | KeyboardEvent): boolean => {
  const mod = e.metaKey || e.ctrlKey;

  let direction: GridDirection | null = null;
  if (e.key === 'Enter' && !mod && !e.shiftKey) direction = 'down';
  else if (e.key === 'ArrowDown' && !mod && !e.shiftKey) direction = 'down';
  else if (e.key === 'ArrowUp' && !mod && !e.shiftKey) direction = 'up';
  else if (e.key === 'ArrowRight' && mod) direction = 'right';
  else if (e.key === 'ArrowLeft' && mod) direction = 'left';

  if (!direction) return false;
  if (!moveGridFocus(direction)) return false;

  e.preventDefault();
  e.stopPropagation();
  return true;
};
