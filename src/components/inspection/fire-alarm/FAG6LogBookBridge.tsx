/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * G6 ⇄ Fire Alarm Log Book bridge (ELE-1397).
 *
 * If the building has a live log book (ELE-1396), the periodic cert's
 * false-alarm and service history write themselves: pick the building,
 * see everything logged since the last inspection, insert it in one tap.
 * This is the link a paper log book physically cannot make.
 */
import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import type { FireAlarmLogBook, FireAlarmLogEntry } from '@/hooks/useFireAlarmLogBook';

interface Props {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

interface HistorySummary {
  since: string;
  weeklyTests: number;
  falseAlarms: FireAlarmLogEntry[];
  services: FireAlarmLogEntry[];
  batteries: FireAlarmLogEntry[];
  openFaultEntries: FireAlarmLogEntry[];
}

const fmt = (iso: string) => format(new Date(iso + 'T00:00:00'), 'd MMM yyyy');

function normalise(s: string): string {
  return (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

export default function FAG6LogBookBridge({ formData, onUpdate }: Props) {
  const db = supabase as any;
  const [books, setBooks] = useState<FireAlarmLogBook[]>([]);
  const [selectedId, setSelectedId] = useState<string>(formData.linkedLogBookId || '');
  const [summary, setSummary] = useState<HistorySummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [inserted, setInserted] = useState(false);

  useEffect(() => {
    db.from('fire_alarm_log_books')
      .select('*')
      .is('archived_at', null)
      .order('building_name')
      .then(({ data }: { data: FireAlarmLogBook[] | null }) => setBooks(data ?? []));
  }, [db]);

  // Suggest a match on premises address / building name
  const suggestedId = useMemo(() => {
    if (selectedId) return null;
    const site = normalise(formData.premisesAddress || formData.clientAddress || '');
    const client = normalise(formData.clientName || '');
    if (!site && !client) return null;
    const hit = books.find((b) => {
      const bn = normalise(b.building_name);
      const ba = normalise(b.building_address);
      return (
        (bn && (site.includes(bn) || client.includes(bn))) ||
        (ba.length > 6 && (site.includes(ba) || ba.includes(site)))
      );
    });
    return hit?.id ?? null;
  }, [books, formData.premisesAddress, formData.clientAddress, formData.clientName, selectedId]);

  // Load history when a book is selected
  useEffect(() => {
    if (!selectedId) {
      setSummary(null);
      return;
    }
    const since =
      formData.previousInspectionDate ||
      new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().slice(0, 10);
    setLoading(true);
    db.from('fire_alarm_log_entries')
      .select('*')
      .eq('log_book_id', selectedId)
      .gte('entry_date', since)
      .order('entry_date', { ascending: true })
      .then(({ data }: { data: FireAlarmLogEntry[] | null }) => {
        const entries = data ?? [];
        setSummary({
          since,
          weeklyTests: entries.filter((e) => e.entry_type === 'weekly_test').length,
          falseAlarms: entries.filter((e) => e.entry_type === 'false_alarm'),
          services: entries.filter((e) => e.entry_type === 'service'),
          batteries: entries.filter((e) => e.entry_type === 'battery'),
          openFaultEntries: entries.filter(
            (e) => e.entry_type === 'fault' && e.resolved !== true
          ),
        });
        setLoading(false);
      });
  }, [selectedId, formData.previousInspectionDate, db]);

  const insert = () => {
    if (!summary) return;
    const book = books.find((b) => b.id === selectedId);

    onUpdate('linkedLogBookId', selectedId);
    onUpdate('falseAlarmCount', String(summary.falseAlarms.length));
    if (summary.falseAlarms.length > 0) {
      const causes = [
        ...new Set(summary.falseAlarms.map((e) => e.data.cause || e.data.category).filter(Boolean)),
      ];
      if (causes.length) onUpdate('falseAlarmCause', causes.join('; '));
      const actions = [
        ...new Set(summary.falseAlarms.map((e) => e.data.action).filter(Boolean)),
      ];
      if (actions.length) onUpdate('falseAlarmAction', actions.join('. '));
    }

    const serviceLines = [
      ...summary.services.map(
        (e) =>
          `${fmt(e.entry_date)} — service visit${e.data.contractor ? ` by ${e.data.contractor}` : ''}${e.data.scope ? `: ${e.data.scope}` : ''}${e.data.outcome ? ` (${e.data.outcome})` : ''}`
      ),
      ...summary.batteries.map(
        (e) =>
          `${fmt(e.entry_date)} — battery change${e.data.battery_type ? ` (${e.data.battery_type})` : ''}${e.data.location ? ` at ${e.data.location}` : ''}`
      ),
    ].join('\n');
    onUpdate(
      'serviceHistorySummary',
      serviceLines ||
        `No service visits recorded in the ${book?.building_name ?? 'building'} log book since ${fmt(summary.since)}.`
    );

    // Open faults carry into the G6 defects list (deduped on description)
    if (summary.openFaultEntries.length > 0) {
      const existing: { description?: string }[] = Array.isArray(formData.defectsFound)
        ? formData.defectsFound
        : [];
      const existingDescs = new Set(existing.map((d) => d.description));
      const imported = summary.openFaultEntries
        .map((f) => ({
          id: crypto.randomUUID(),
          description: `${f.data.description || 'Fault'}${f.data.zone ? ` — ${f.data.zone}` : ''} (open in log book since ${fmt(f.entry_date)})`,
          severity: 'non-critical',
          rectified: false,
          rectificationDate: '',
        }))
        .filter((d) => !existingDescs.has(d.description));
      if (imported.length) onUpdate('defectsFound', [...existing, ...imported]);
    }

    onUpdate('logbookReviewed', true);
    if (summary.weeklyTests > 0) onUpdate('weeklyRecordsReviewed', true);
    setInserted(true);
  };

  if (books.length === 0) return null;

  return (
    <div className="rounded-xl bg-white/[0.05] border border-white/[0.08] overflow-hidden">
      <div className="px-4 pt-3.5 pb-3">
        <p className="text-[13px] font-semibold text-white">Fire alarm log book</p>
        <p className="mt-1 text-[12.5px] text-white/80 leading-relaxed">
          This building keeps its log in Elec-Mate? Pull the false alarm and service history
          straight into the certificate.
        </p>
      </div>

      <div className="px-4 pb-4 space-y-3">
        <select
          value={selectedId}
          onChange={(e) => {
            setSelectedId(e.target.value);
            setInserted(false);
          }}
          className="w-full h-12 px-3 rounded-lg text-base touch-manipulation bg-[hsl(0_0%_16%)] border border-white/[0.12] text-white focus:border-elec-yellow focus:outline-none [color-scheme:dark]"
        >
          <option value="">Select a log book…</option>
          {books.map((b) => (
            <option key={b.id} value={b.id}>
              {b.building_name}
              {b.building_address ? ` — ${b.building_address}` : ''}
            </option>
          ))}
        </select>

        {!selectedId && suggestedId && (
          <button
            type="button"
            onClick={() => setSelectedId(suggestedId)}
            className="w-full min-h-11 text-left px-3.5 py-2.5 rounded-lg bg-white/[0.06] border border-elec-yellow/40 touch-manipulation active:scale-[0.98] transition-all"
          >
            <span className="text-[12px] text-elec-yellow font-medium">
              Looks like {books.find((b) => b.id === suggestedId)?.building_name} — tap to link
            </span>
          </button>
        )}

        {loading && <div className="h-16 rounded-lg bg-white/[0.04] animate-pulse" />}

        {summary && !loading && (
          <>
            <div className="rounded-lg bg-white/[0.05] border border-white/[0.08] divide-y divide-white/[0.06]">
              <div className="px-3.5 py-2 text-[11px] text-white/80">
                Logged since {fmt(summary.since)}
                {formData.previousInspectionDate ? ' (last inspection)' : ' (12 months)'}
              </div>
              {(
                [
                  ['Weekly tests', summary.weeklyTests],
                  ['False alarms', summary.falseAlarms.length],
                  ['Service visits', summary.services.length],
                  ['Battery changes', summary.batteries.length],
                  ['Open faults', summary.openFaultEntries.length],
                ] as [string, number][]
              ).map(([label, n]) => (
                <div key={label} className="flex items-center justify-between px-3.5 py-2">
                  <span className="text-[12.5px] text-white/80">{label}</span>
                  <span
                    className={cn(
                      'text-[13px] font-bold tabular-nums',
                      label === 'Open faults' && n > 0 ? 'text-orange-300' : 'text-white'
                    )}
                  >
                    {n}
                  </span>
                </div>
              ))}
            </div>

            {summary.openFaultEntries.length > 0 && (
              <p className="text-[11.5px] text-orange-300 leading-relaxed">
                {summary.openFaultEntries.length} unresolved fault
                {summary.openFaultEntries.length > 1 ? 's' : ''} in the log — inserted into the
                Defects tab for this inspection.
              </p>
            )}

            <button
              type="button"
              onClick={insert}
              disabled={inserted}
              className={cn(
                'w-full h-12 rounded-xl font-semibold text-[13.5px] touch-manipulation transition-colors active:scale-[0.98]',
                inserted
                  ? 'bg-white/[0.06] text-green-400 border border-green-500/40'
                  : 'bg-elec-yellow text-black hover:bg-elec-yellow/90'
              )}
            >
              {inserted ? 'Inserted into certificate' : 'Insert history into certificate'}
            </button>
            <p className="text-[11px] text-white/80">
              Fills the false alarm records and service history below — you can edit them after.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
