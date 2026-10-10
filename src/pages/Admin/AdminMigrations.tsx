/**
 * Admin → Migrations (ELE-2067). Firms that asked "move me across for free":
 * their system, files, the times that suit a call, and a short checklist.
 * Files are in the private firm-migration-files bucket; links here are
 * signed for 10 minutes.
 */
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { format, formatDistanceToNowStrict } from 'date-fns';
import { Download, Mail, Phone, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  PageFrame,
  PageHero,
  StatStrip,
  Pill,
  EmptyState,
  LoadingBlocks,
  IconButton,
  type Tone,
} from '@/components/admin/editorial';

type Status = 'new' | 'call_booked' | 'importing' | 'done' | 'cancelled';
interface Req {
  id: string;
  employer_id: string;
  source_system: string;
  contact_name: string | null;
  contact_phone: string | null;
  contact_email: string | null;
  preferred_times: string[];
  preferred_note: string | null;
  what_to_move: string[];
  notes: string | null;
  files: { path: string; name: string; size: number }[];
  status: Status;
  checklist: Record<string, boolean>;
  call_at: string | null;
  admin_notes: string | null;
  created_at: string;
}

const STATUS: Record<Status, [string, Tone]> = {
  new: ['New', 'yellow'],
  call_booked: ['Call booked', 'blue'],
  importing: ['Moving', 'cyan'],
  done: ['Done', 'emerald'],
  cancelled: ['Cancelled', 'red'],
};

const CHECKS: [string, string][] = [
  ['files_received', 'Files received'],
  ['call_done', 'Call done'],
  ['imported', 'Imported into their hub'],
  ['checked_with_customer', 'Checked with them'],
];

const TABS = [
  { key: 'open', label: 'To do' },
  { key: 'done', label: 'Done' },
] as const;

const SOURCE_LABEL: Record<string, string> = {
  tradify: 'Tradify',
  fergus: 'Fergus',
  powered_now: 'Powered Now',
  simpro: 'simPRO',
  servicem8: 'ServiceM8',
  jobber: 'Jobber',
  commusoft: 'Commusoft',
  joblogic: 'Joblogic',
  generic: 'Something else',
};

export default function AdminMigrations() {
  const qc = useQueryClient();
  const [tab, setTab] = useState<(typeof TABS)[number]['key']>('open');
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [callAt, setCallAt] = useState<Record<string, string>>({});

  const {
    data: rows = [],
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['admin-migration-requests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('employer_migration_requests' as never)
        .select('*')
        .order('created_at', { ascending: false })
        .limit(300);
      if (error) throw error;
      return (data ?? []) as unknown as Req[];
    },
  });

  const { data: firms = {} } = useQuery({
    queryKey: ['admin-migration-firms', rows.map((r) => r.employer_id).join(',')],
    enabled: rows.length > 0,
    queryFn: async () => {
      const ids = [...new Set(rows.map((r) => r.employer_id))];
      const { data } = await supabase
        .from('company_profiles')
        .select('user_id, company_name')
        .in('user_id', ids);
      return Object.fromEntries(
        ((data ?? []) as { user_id: string; company_name: string | null }[]).map((c) => [
          c.user_id,
          c.company_name,
        ])
      );
    },
  });

  const open = rows.filter((r) => r.status !== 'done' && r.status !== 'cancelled');
  const list =
    tab === 'open' ? open : rows.filter((r) => r.status === 'done' || r.status === 'cancelled');

  const save = async (r: Req, patch: Partial<Req>) => {
    const { error } = await supabase
      .from('employer_migration_requests' as never)
      .update(patch as never)
      .eq('id', r.id);
    if (error) {
      toast({ title: 'Could not save', description: error.message, variant: 'destructive' });
      return;
    }
    qc.invalidateQueries({ queryKey: ['admin-migration-requests'] });
  };

  const openFile = async (path: string) => {
    const { data, error } = await supabase.storage
      .from('firm-migration-files')
      .createSignedUrl(path, 600, { download: true });
    if (error || !data) {
      toast({
        title: 'Could not open the file',
        description: error?.message,
        variant: 'destructive',
      });
      return;
    }
    window.open(data.signedUrl, '_blank', 'noopener');
  };

  const stats = [
    { label: 'New', value: rows.filter((r) => r.status === 'new').length, tone: 'yellow' as Tone },
    {
      label: 'Call booked',
      value: rows.filter((r) => r.status === 'call_booked').length,
      tone: 'blue' as Tone,
    },
    {
      label: 'Moving',
      value: rows.filter((r) => r.status === 'importing').length,
      tone: 'cyan' as Tone,
    },
    {
      label: 'Done',
      value: rows.filter((r) => r.status === 'done').length,
      tone: 'emerald' as Tone,
    },
  ];

  return (
    <PageFrame>
      <PageHero
        eyebrow="Migrations"
        title="Free moves across"
        description="Firms that asked us to bring their data in from another system. On the call, they import the files from Settings, Bring your data across, and we check the match with them."
        tone="yellow"
        actions={
          <IconButton onClick={() => refetch()} aria-label="Refresh">
            <RefreshCw className={cn('h-4 w-4', isFetching && 'animate-spin')} />
          </IconButton>
        }
      />
      <StatStrip stats={stats} columns={4} />

      <div className="mt-6 flex gap-1 rounded-xl border border-white/[0.1] bg-white/[0.03] p-1">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={cn(
              'h-11 flex-1 rounded-lg px-3 text-[13px] font-semibold touch-manipulation',
              tab === t.key ? 'bg-elec-yellow text-black' : 'text-white'
            )}
          >
            {t.label}{' '}
            <span className="tabular-nums">
              {t.key === 'open' ? open.length : rows.length - open.length}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        {isLoading ? (
          <LoadingBlocks />
        ) : list.length === 0 ? (
          <EmptyState
            title="Nothing here"
            description="Requests come from Settings, Bring your data across, Move me across for free."
          />
        ) : (
          list.map((r) => {
            const [label, tone] = STATUS[r.status];
            return (
              <div
                key={r.id}
                className="rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-[15px] font-semibold text-white">
                      {firms[r.employer_id] ?? r.contact_name ?? 'Firm'} · from{' '}
                      {SOURCE_LABEL[r.source_system] ?? r.source_system}
                    </p>
                    <p className="text-[12.5px] text-white">
                      Asked {formatDistanceToNowStrict(new Date(r.created_at), { addSuffix: true })}
                      {r.preferred_times?.length ? ` · suits ${r.preferred_times.join(', ')}` : ''}
                      {r.preferred_note ? ` (${r.preferred_note})` : ''}
                    </p>
                    {r.what_to_move?.length > 0 && (
                      <p className="text-[12.5px] text-white">
                        Move: {r.what_to_move.join(', ').replace(/_/g, ' ')}
                      </p>
                    )}
                  </div>
                  <Pill tone={tone}>{label}</Pill>
                </div>

                {r.notes && (
                  <p className="mt-3 whitespace-pre-wrap rounded-xl bg-black/20 p-3 text-[13px] text-white">
                    {r.notes}
                  </p>
                )}

                <div className="mt-3 flex flex-wrap gap-2">
                  {r.contact_phone && (
                    <a
                      href={`tel:${r.contact_phone.replace(/\s+/g, '')}`}
                      className="inline-flex h-11 items-center gap-1.5 rounded-lg border border-white/[0.12] px-3 text-[13px] font-medium text-white touch-manipulation"
                    >
                      <Phone className="h-4 w-4" /> {r.contact_phone}
                    </a>
                  )}
                  {r.contact_email && (
                    <a
                      href={`mailto:${r.contact_email}?subject=${encodeURIComponent('Moving you across to Elec-Mate')}`}
                      className="inline-flex h-11 items-center gap-1.5 rounded-lg border border-white/[0.12] px-3 text-[13px] font-medium text-white touch-manipulation"
                    >
                      <Mail className="h-4 w-4" /> {r.contact_email}
                    </a>
                  )}
                  {(r.files ?? []).map((f) => (
                    <button
                      key={f.path}
                      type="button"
                      onClick={() => openFile(f.path)}
                      className="inline-flex h-11 items-center gap-1.5 rounded-lg border border-white/[0.12] px-3 text-[13px] font-medium text-white touch-manipulation"
                    >
                      <Download className="h-4 w-4" /> {f.name}
                    </button>
                  ))}
                </div>

                <div className="mt-3 grid gap-2 border-t border-white/[0.08] pt-3 sm:grid-cols-2">
                  {CHECKS.map(([k, l]) => (
                    <label
                      key={k}
                      className="flex h-11 items-center gap-2 text-[13.5px] text-white touch-manipulation"
                    >
                      <input
                        type="checkbox"
                        className="h-5 w-5 accent-[#facc15]"
                        checked={!!r.checklist?.[k]}
                        onChange={(e) =>
                          save(r, { checklist: { ...(r.checklist ?? {}), [k]: e.target.checked } })
                        }
                      />
                      {l}
                    </label>
                  ))}
                </div>

                <div className="mt-3 flex flex-wrap items-end gap-2">
                  <div className="min-w-[200px] flex-1">
                    <p className="text-[12px] font-medium text-white">Call booked for</p>
                    <input
                      type="datetime-local"
                      value={
                        callAt[r.id] ??
                        (r.call_at ? format(new Date(r.call_at), "yyyy-MM-dd'T'HH:mm") : '')
                      }
                      onChange={(e) => setCallAt((m) => ({ ...m, [r.id]: e.target.value }))}
                      className="h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base text-white caret-elec-yellow [color-scheme:dark] focus:border-elec-yellow focus:outline-none focus:ring-0"
                    />
                  </div>
                  <button
                    type="button"
                    disabled={!callAt[r.id]}
                    onClick={() =>
                      save(r, {
                        call_at: new Date(callAt[r.id]).toISOString(),
                        status: r.status === 'new' ? 'call_booked' : r.status,
                      })
                    }
                    className="h-11 rounded-lg bg-white/[0.08] px-4 text-[13px] font-semibold text-white touch-manipulation disabled:opacity-40"
                  >
                    Save call
                  </button>
                </div>

                <div className="mt-3">
                  <p className="text-[12px] font-medium text-white">Our notes</p>
                  <textarea
                    rows={2}
                    defaultValue={r.admin_notes ?? ''}
                    onChange={(e) => setNotes((m) => ({ ...m, [r.id]: e.target.value }))}
                    onBlur={() =>
                      notes[r.id] !== undefined &&
                      notes[r.id] !== (r.admin_notes ?? '') &&
                      save(r, { admin_notes: notes[r.id] })
                    }
                    className="w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 py-2 text-base text-white caret-elec-yellow focus:border-elec-yellow focus:outline-none focus:ring-0"
                  />
                </div>

                <div className="mt-3 flex flex-wrap gap-2 border-t border-white/[0.08] pt-3">
                  {r.status !== 'importing' && r.status !== 'done' && r.status !== 'cancelled' && (
                    <button
                      type="button"
                      onClick={() => save(r, { status: 'importing' })}
                      className="h-11 rounded-lg bg-white/[0.08] px-4 text-[13px] font-semibold text-white touch-manipulation"
                    >
                      Moving now
                    </button>
                  )}
                  {r.status !== 'done' && r.status !== 'cancelled' && (
                    <button
                      type="button"
                      onClick={() => save(r, { status: 'done' })}
                      className="h-11 rounded-lg bg-emerald-500 px-4 text-[13px] font-semibold text-black touch-manipulation"
                    >
                      Mark done
                    </button>
                  )}
                  {r.status !== 'cancelled' && r.status !== 'done' && (
                    <button
                      type="button"
                      onClick={() => save(r, { status: 'cancelled' })}
                      className="h-11 rounded-lg px-4 text-[13px] font-semibold text-white underline touch-manipulation"
                    >
                      Cancel
                    </button>
                  )}
                  {(r.status === 'done' || r.status === 'cancelled') && (
                    <button
                      type="button"
                      onClick={() => save(r, { status: 'new' })}
                      className="h-11 rounded-lg bg-white/[0.08] px-4 text-[13px] font-semibold text-white touch-manipulation"
                    >
                      Reopen
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </PageFrame>
  );
}
