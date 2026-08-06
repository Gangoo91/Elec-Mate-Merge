/**
 * ELE-1445 — flatten a cross-tab labour-times sheet into price-book rows.
 *
 * Trade labour books are not lists. Sean Mulcahy's (EES "Electrical
 * Installation Times", Issue E — 53 tabs) is laid out as a grid: the row names
 * the item rating, the columns name the variant, each cell is decimal hours.
 *
 *     Rating   Single Pole & Neutral   Double Pole   Triple Pole & Neutral
 *     16.0     0.45                    0.55          0.65
 *     20.0     0.65                    0.75          0.85
 *
 * and often two tables side by side on the same rows to save paper:
 *
 *     Fix connect   1-2 Pole  3-4 Pole  |  Fix connect  1-2 Pole  3-4 Pole
 *     16 to 40amp   0.30      0.45      |  250amp       0.70      1.05
 *
 * Read one-item-per-row, "0.30" becomes the price of an item called
 * "16 to 40amp" and everything else is lost.
 *
 * ## Why structure comes from the header, not from the cells
 *
 * The obvious approach — "a text cell starts a block, numbers after it are its
 * values" — fails on a third of this book, because plenty of tabs use PURELY
 * NUMERIC row labels: sizes in mm, ratings in amps. "16.0" is a label in
 * ISOLATORS and a time in another column. Nothing about the cell says which.
 *
 * So the header row decides: column 0 is always a label, and any later column
 * whose header repeats column 0's header starts another block. Everything else
 * carrying a header is a value column. Ratings then stay ratings.
 *
 * Deliberately does NOT guess prices: these books carry times only. Rows come
 * back with hours and no price, and merge onto matching price-book items
 * without touching what they cost.
 */

export interface MatrixRow {
  name: string;
  labourHours: number;
}

export interface MatrixParseResult {
  rows: MatrixRow[];
  /** Section headings picked up on the way, for the preview to show. */
  sections: string[];
  /** Column headers treated as variants. */
  variants: string[];
  /** Rows that carried numbers but produced nothing, so the UI can say so. */
  ignored: number;
}

const splitCells = (line: string): string[] => {
  // Quoted CSV, or a spreadsheet paste (tabs). Tabs win when present because a
  // pasted cell can legitimately contain a comma.
  if (line.includes('\t')) return line.split('\t').map((c) => c.trim());
  const out: string[] = [];
  let cur = '';
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (quoted && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else quoted = !quoted;
    } else if (ch === ',' && !quoted) {
      out.push(cur.trim());
      cur = '';
    } else cur += ch;
  }
  out.push(cur.trim());
  return out;
};

/**
 * A time. Trade times run roughly 0.01–40 hours. The cap matters: a rating of
 * "63" sitting in a value column would otherwise import as 63 hours.
 */
const asHours = (cell: string): number | null => {
  const v = cell.trim();
  if (!v || !/^\d*\.?\d+$/.test(v)) return null;
  const n = parseFloat(v);
  if (!isFinite(n) || n <= 0 || n > 40) return null;
  return n;
};

const isNumeric = (cell: string) => /^\d*\.?\d+$/.test(cell.trim());
const nonEmpty = (cells: string[]) => cells.filter((c) => c.trim().length > 0);

/** How many cells in this row parse as a time. */
const valueCount = (cells: string[]) => cells.filter((c) => asHours(c) !== null).length;

/**
 * Tidy a label: the sheet stores 16 as "16.0", which reads oddly, and a bare
 * number gets the axis unit appended so the name says what it means.
 */
const tidyLabel = (raw: string, unit: string | null) => {
  let v = raw.trim();
  if (/^\d+\.0+$/.test(v)) v = String(parseInt(v, 10));
  else if (/^\d+\.\d+$/.test(v)) v = String(parseFloat(v));
  if (unit && /^\d+(\.\d+)?$/.test(v)) return `${v}${unit === 'mm' ? '' : ' '}${unit}`;
  return v;
};

/**
 * Axis and unit labels that sit alone on a row and must not be mistaken for a
 * section heading. Real headings in these books are multi-word or a long single
 * word ("ENCLOSURES", "MCB / MCCB / HRC FUSE UNITS").
 */
const AXIS_WORDS = new Set([
  'type',
  'amps',
  'amp',
  'size',
  'sizes',
  'watts',
  'watt',
  'rating',
  'ratings',
  'mm',
  'kw',
  'volts',
  'metres',
  'meters',
  'each',
  'no',
  'qty',
]);

/**
 * Axis words that are also UNITS. These sheets put the unit on its own row
 * above a column of bare numbers, so "16" under an "Amps" row means 16 amps.
 * Dropping it entirely left items named "ISOLATORS FUSED SWITCHES — 20 — ...",
 * and searching "20a isolator" then found nothing.
 */
const UNIT_WORDS: Record<string, string> = {
  amps: 'amp',
  amp: 'amp',
  watts: 'watt',
  watt: 'watt',
  mm: 'mm',
  kw: 'kW',
  volts: 'volt',
  metres: 'm',
  meters: 'm',
};

/**
 * Publisher boilerplate that sits in the top rows of every tab and gets picked
 * up as a column header. "Electrical Installation Times" is the title of the
 * BOOK — it was ending up as the variant on 140 of Sean's items, giving names
 * like "LUMINAIRES GENERAL — Ceiling Rose — Electrical Installation Times".
 */
const BOILERPLATE = [
  /electrical installation times/i,
  /^ees data$/i,
  /^issue [a-z0-9]$/i,
  /copyright/i,
  /^issue date/i,
  /^section [a-z] ?\d*$/i,
];

const isBoilerplate = (raw: string) => {
  const v = raw.trim();
  return v.length > 0 && BOILERPLATE.some((re) => re.test(v));
};

const unitFor = (raw: string): string | null => {
  const bare = raw.trim().toLowerCase().replace(/[^a-z]/g, '');
  return UNIT_WORDS[bare] ?? null;
};

/**
 * Lowercase function words. A heading in these books is a title — ALL CAPS or
 * Title Case. A NOTE reads as a sentence: "Installed at a normal working height
 * or from a platform". Both sit alone on a row, so length and case are the only
 * things telling them apart. Read as headings, 155 of Sean's 1,256 items were
 * named after a note instead of the thing they are.
 */
const NOTE_WORDS = new Set([
  'a', 'or', 'at', 'to', 'of', 'in', 'from', 'the', 'on', 'for', 'with', 'and', 'is', 'be',
]);

const isSectionHeading = (raw: string) => {
  const v = raw.trim();
  if (!v) return false;
  const bare = v.toLowerCase().replace(/[^a-z]/g, '');
  if (AXIS_WORDS.has(bare)) return false;
  // Long enough to be a sentence is long enough to be a note.
  if (v.length > 45) return false;
  if (v[0] === v[0].toLowerCase() && v[0] !== v[0].toUpperCase()) return false;
  const words = v.match(/[A-Za-z]+/g) ?? [];
  if (words.length === 0) return false;
  if (words.some((w) => w === w.toLowerCase() && NOTE_WORDS.has(w.toLowerCase()))) return false;
  // Multi-word, or a single word long enough to be a real title.
  return v.includes(' ') || v.length > 6;
};

interface Header {
  cells: string[];
  labelIdxs: number[];
}

/**
 * Work out the label columns from a header row. Column 0 always labels; a later
 * column repeating column 0's header (the side-by-side case) labels too.
 */
const readHeader = (cells: string[]): Header => {
  const first = (cells[0] || '').trim().toLowerCase();
  const labelIdxs = [0];
  if (first) {
    cells.forEach((c, i) => {
      if (i > 0 && c.trim().toLowerCase() === first) labelIdxs.push(i);
    });
  }
  return { cells, labelIdxs };
};

/**
 * Fall back to cell shape when a row arrives with no header to go on: a
 * non-numeric cell starts a block. Only correct for text-labelled sheets, which
 * is exactly when it is used.
 */
const inferLabelIdxs = (cells: string[]): number[] => {
  const idxs: number[] = [];
  cells.forEach((c, i) => {
    const v = c.trim();
    if (v && !isNumeric(v)) idxs.push(i);
  });
  return idxs.length > 0 ? idxs : [0];
};

export const parseLabourMatrix = (
  text: string,
  options: { defaultSection?: string } = {}
): MatrixParseResult => {
  const lines = text.split(/\r?\n/).filter((l) => nonEmpty(splitCells(l)).length > 0);

  const rows: MatrixRow[] = [];
  const sections: string[] = [];
  const variantsSeen = new Set<string>();
  let ignored = 0;

  let header: Header | null = null;
  // The sheet TAB name is always a real category ("EMERGENCY LIGHTING"), so it
  // is the floor: an item never ends up named after a note or nothing at all.
  const defaultSection = (options.defaultSection || '').trim();
  let section = defaultSection;
  let axisUnit: string | null = null;

  for (const line of lines) {
    const cells = splitCells(line);
    const populated = nonEmpty(cells);
    const values = valueCount(cells);

    // No times on this line: it is a heading or a header row.
    if (values === 0) {
      if (populated.length === 1) {
        // A lone cell is USUALLY a section heading — but these sheets also put
        // the axis unit on its own row ("Amps", "Type", "Size mm"). Letting
        // those through renames every item beneath them: the isolators tab came
        // out as "Amps — 16 — Double Pole" instead of naming the isolator, and
        // nobody searching "isolator" would ever find it.
        const unit = unitFor(populated[0]);
        if (unit) {
          // "Amps" / "Watts" on its own row labels the column beneath it.
          axisUnit = unit;
        } else if (isSectionHeading(populated[0])) {
          section = populated[0];
          axisUnit = null;
          if (!sections.includes(section)) sections.push(section);
        } else {
          // A note, not a heading. Fall back to the tab so the item is still
          // filed under something meaningful.
          section = defaultSection;
        }
      } else if (populated.length > 1) {
        // Every tab opens with two rows of publisher boilerplate. Adopting one
        // as the header was actively WRONG on two-column list tabs: the label
        // columns were never recognised, so a value from the RIGHT-hand list
        // was attached to the item on the LEFT. "Ceiling Rose Pendant" came out
        // carrying "Wall Washers" time. With no header, per-row inference reads
        // those tabs correctly.
        if (populated.every(isBoilerplate)) continue;
        const candidate = readHeader(cells);
        // A continuation line ("Wall" / "Bracket" split over two rows) extends
        // the header rather than replacing it.
        if (header && populated.length < header.cells.filter((c) => c.trim()).length) {
          header = {
            cells: header.cells.map((c, i) => (cells[i]?.trim() ? `${c} ${cells[i]}`.trim() : c)),
            labelIdxs: header.labelIdxs,
          };
        } else {
          header = candidate;
        }
      }
      continue;
    }

    const labelIdxs = header ? header.labelIdxs : inferLabelIdxs(cells);

    // Pair each label column with the value columns up to the next label.
    let produced = 0;
    for (let b = 0; b < labelIdxs.length; b++) {
      const start = labelIdxs[b];
      const end = b + 1 < labelIdxs.length ? labelIdxs[b + 1] : cells.length;
      const label = tidyLabel(cells[start] || '', axisUnit);
      if (!label) continue;

      for (let i = start + 1; i < end; i++) {
        const hours = asHours(cells[i]);
        if (hours === null) continue;

        const rawVariant = (header?.cells[i] || '').trim();
        const variant = isBoilerplate(rawVariant) ? '' : rawVariant;
        if (variant) variantsSeen.add(variant);

        // Section first so related items sort together in the price book.
        const name = [section, label, variant].filter((p) => p && p.trim()).join(' — ');
        if (!name) continue;
        rows.push({ name, labourHours: hours });
        produced++;
      }
    }
    if (produced === 0) ignored++;
  }

  // Books repeat rows across sections; keep the first, which sits under the
  // heading the reader was actually looking at.
  const seen = new Set<string>();
  const deduped = rows.filter((r) => {
    const key = r.name.toLowerCase().replace(/\s+/g, ' ');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return {
    rows: deduped,
    sections,
    variants: Array.from(variantsSeen),
    ignored: ignored + (rows.length - deduped.length),
  };
};

/**
 * Does this paste look like a cross-tab rather than a list? Used to switch the
 * import sheet into matrix mode without asking.
 *
 * The signal is rows carrying MORE THAN ONE time, which a one-item-per-row list
 * never does.
 */
export const looksLikeLabourMatrix = (text: string): boolean => {
  const lines = text.split(/\r?\n/).slice(0, 60);
  let multiValueRows = 0;
  for (const line of lines) {
    if (valueCount(splitCells(line)) >= 2) multiValueRows++;
  }
  return multiValueRows >= 2;
};
