import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { ENTRY_TYPE_LABELS, type LogEntryType } from '@/hooks/useFireAlarmLogBook';

/**
 * Review and create a fire alarm log book read from paper (ELE-1781).
 *
 * The reader returns the book's front matter and one row per dated entry.
 * Everything is editable here because handwriting is exactly where a model
 * is least sure, and a wrong date on a fire alarm log is not a small thing.
 * A row can be deleted; nothing is written until "Create log book".
 */

export interface ImportedLogBook {
  found: boolean;
  book: Record<string, string>;
  entries: ImportedEntry[];
  count: number;
  entriesSeen: number;
  truncated: boolean;
  pagesRead: number;
  pageCount: number;
}

export interface ImportedEntry {
  entry_date: string;
  entry_type: string;
  zone?: string;
  location?: string;
  description: string;
  result?: string;
  tester_name?: string;
}

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation';
const labelCn = 'text-[12px] font-medium text-white mb-1 block';
const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const BOOK_FIELDS: { key: string; label: string }[] = [
  { key: 'building_name', label: 'Premises' },
  { key: 'building_address', label: 'Address' },
  { key: 'system_category', label: 'System category' },
  { key: 'panel_make', label: 'Panel make' },
  { key: 'panel_model', label: 'Panel model' },
  { key: 'panel_location', label: 'Panel location' },
  { key: 'responsible_person', label: 'Responsible person' },
  { key: 'servicing_org', label: 'Servicing organisation' },
  { key: 'installation_date', label: 'Installation date' },
];

const TYPE_OPTIONS = (Object.keys(ENTRY_TYPE_LABELS) as LogEntryType[]).map((v) => ({
  value: v,
  label: ENTRY_TYPE_LABELS[v],
}));

const isIso = (v: string) => /^\d{4}-\d{2}-\d{2}$/.test(v);

/** The row's `data` in the shape each entry type's editor reads it back. */
function entryData(e: ImportedEntry): Record<string, string> {
  const zone = e.zone || '';
  const location = e.location || '';
  const text = e.description || '';
  switch (e.entry_type) {
    case 'weekly_test':
      return { call_point: location, zone, location, result: e.result || '' };
    case 'fault':
      return { description: text, zone, cause: '', remedial_action: e.result || '' };
    case 'false_alarm':
      return { zone: zone || location, cause: text, action: e.result || '' };
    case 'fire_event':
      return { zone: zone || location, description: text, action: e.result || '' };
    case 'drill':
      return { description: text, outcome: e.result || '' };
    case 'monthly_check':
      return { checks: text, defects: e.result || '' };
    case 'service':
      return { contractor: e.tester_name || '', scope: text, outcome: e.result || '' };
    default:
      return { description: text, zone, location, result: e.result || '' };
  }
}

interface Props {
  imported: ImportedLogBook;
  pageNames: string[];
}

export default function LogBookImportReview({ imported, pageNames }: Props) {
  const navigate = useNavigate();
  const [book, setBook] = useState<Record<string, string>>({ ...imported.book });
  const [entries, setEntries] = useState<ImportedEntry[]>(
    imported.entries.map((e) => ({ ...e, entry_type: e.entry_type || 'panel_event' }))
  );
  const [creating, setCreating] = useState(false);

  const setEntry = (i: number, patch: Partial<ImportedEntry>) =>
    setEntries((prev) => prev.map((e, k) => (k === i ? { ...e, ...patch } : e)));
  const removeEntry = (i: number) => setEntries((prev) => prev.filter((_, k) => k !== i));

  const badDates = entries.filter((e) => !isIso(e.entry_date)).length;
  const canCreate = !!book.building_name?.trim() && badDates === 0 && !creating;

  const create = async () => {
    setCreating(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not signed in');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const db = supabase as any;
      const { data: created, error } = await db
        .from('fire_alarm_log_books')
        .insert({
          user_id: user.id,
          building_name: book.building_name.trim(),
          building_address: book.building_address || '',
          system_category: book.system_category || '',
          panel_make: book.panel_make || '',
          panel_model: book.panel_model || '',
          panel_location: book.panel_location || '',
          responsible_person: book.responsible_person || '',
          servicing_org: book.servicing_org || '',
          installation_date: isIso(book.installation_date || '') ? book.installation_date : null,
          notes: `Imported from paper (${imported.pageCount} page${imported.pageCount === 1 ? '' : 's'}) on ${new Date().toISOString().slice(0, 10)}.`,
        })
        .select('id')
        .single();
      if (error) throw error;
      if (entries.length) {
        const rows = entries.map((e) => ({
          log_book_id: created.id,
          user_id: user.id,
          entry_type: e.entry_type,
          entry_date: e.entry_date,
          data: entryData(e),
          tester_name: e.tester_name || '',
          // A fault read from an old book is history, not an open fault to chase.
          resolved: e.entry_type === 'fault' ? true : null,
        }));
        const { error: entryError } = await db.from('fire_alarm_log_entries').insert(rows);
        if (entryError) throw entryError;
      }
      toast.success(
        `Log book created with ${entries.length} entr${entries.length === 1 ? 'y' : 'ies'}`
      );
      navigate(`/electrician/inspection-testing/fire-alarm-log-books/${created.id}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Could not create the log book';
      toast.error(msg);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-5">
      {!imported.found && (
        <div className="-mx-4 border-y border-orange-500/30 bg-orange-500/10 p-4 sm:mx-0 sm:rounded-2xl sm:border-x">
          <p className="text-[14px] font-semibold text-orange-300">
            This may not be a fire alarm log book
          </p>
          <p className="mt-1 text-[13px] leading-snug text-white">
            The pages did not read like one. Check what came back below, or go back and try again.
          </p>
        </div>
      )}

      {imported.truncated && (
        <div className="-mx-4 border-y border-amber-400/35 bg-amber-400/[0.10] p-4 sm:mx-0 sm:rounded-2xl sm:border-x">
          <p className="text-[14px] font-semibold text-amber-300">
            {imported.entriesSeen} rows on the page{imported.pagesRead === 1 ? '' : 's'},{' '}
            {imported.count} read
          </p>
          <p className="mt-1 text-[13px] leading-snug text-white">
            Some rows could not be read. Add them by hand in the log book afterwards rather than
            guessing here.
          </p>
        </div>
      )}

      {imported.pageCount > imported.pagesRead && (
        <p className="text-[12px] leading-snug text-white">
          Only the first {imported.pagesRead} of {imported.pageCount} pages were read for entries.
          Import the rest as a second batch into the same book.
        </p>
      )}

      <div className={cardCn}>
        <h2 className="text-[15px] font-semibold tracking-tight text-white">The book</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {BOOK_FIELDS.map((f) => (
            <div key={f.key}>
              <label className={labelCn} htmlFor={`lb-${f.key}`}>
                {f.label}
                {f.key === 'building_name' && ' *'}
              </label>
              <Input
                id={`lb-${f.key}`}
                value={book[f.key] || ''}
                onChange={(e) => setBook((prev) => ({ ...prev, [f.key]: e.target.value }))}
                className={inputCn}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={cardCn}>
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-[15px] font-semibold tracking-tight text-white">
            {entries.length} entr{entries.length === 1 ? 'y' : 'ies'}
          </h2>
          {badDates > 0 && (
            <span className="text-[12px] font-semibold text-orange-300">
              {badDates} without a valid date
            </span>
          )}
        </div>
        {pageNames.length > 1 && (
          <p className="text-[12px] leading-snug text-white">
            Read from {pageNames.length} pages, in filename order.
          </p>
        )}
        <ul className="divide-y divide-white/[0.1]">
          {entries.map((e, i) => (
            <li key={i} className="space-y-3 py-4">
              <div className="grid gap-3 sm:grid-cols-[150px_1fr_44px]">
                <div>
                  <label className={labelCn}>Date</label>
                  <Input
                    type="date"
                    value={e.entry_date}
                    onChange={(ev) => setEntry(i, { entry_date: ev.target.value })}
                    className={inputCn + (isIso(e.entry_date) ? '' : ' border-orange-400')}
                  />
                </div>
                <div>
                  <label className={labelCn}>Type</label>
                  <MobileSelectPicker
                    value={e.entry_type}
                    onValueChange={(v) => setEntry(i, { entry_type: v })}
                    options={TYPE_OPTIONS}
                    placeholder="Entry type"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeEntry(i)}
                  aria-label="Remove this entry"
                  className="mt-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.12] text-white touch-manipulation active:scale-[0.97]"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <label className={labelCn}>Zone</label>
                  <Input
                    value={e.zone || ''}
                    onChange={(ev) => setEntry(i, { zone: ev.target.value })}
                    className={inputCn}
                  />
                </div>
                <div>
                  <label className={labelCn}>Device / location</label>
                  <Input
                    value={e.location || ''}
                    onChange={(ev) => setEntry(i, { location: ev.target.value })}
                    className={inputCn}
                  />
                </div>
                <div>
                  <label className={labelCn}>Signed by</label>
                  <Input
                    value={e.tester_name || ''}
                    onChange={(ev) => setEntry(i, { tester_name: ev.target.value })}
                    className={inputCn}
                  />
                </div>
              </div>
              <div>
                <label className={labelCn}>What was written</label>
                <Input
                  value={e.description}
                  onChange={(ev) => setEntry(i, { description: ev.target.value })}
                  className={inputCn}
                />
              </div>
              <div>
                <label className={labelCn}>Result / action</label>
                <Input
                  value={e.result || ''}
                  onChange={(ev) => setEntry(i, { result: ev.target.value })}
                  className={inputCn}
                />
              </div>
            </li>
          ))}
        </ul>
        {entries.length === 0 && (
          <p className="text-[13px] leading-snug text-white">
            No dated rows were read. The book itself can still be created.
          </p>
        )}
      </div>

      <button
        type="button"
        disabled={!canCreate}
        onClick={create}
        className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-elec-yellow text-[15px] font-semibold text-black transition-transform touch-manipulation active:scale-[0.98] disabled:bg-white/[0.08] disabled:text-white/70"
      >
        {creating ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
        {creating ? 'Creating…' : 'Create log book'}
      </button>
      {!book.building_name?.trim() && (
        <p className="text-[12px] leading-snug text-white">
          Give the book a premises name to create it.
        </p>
      )}
    </div>
  );
}
