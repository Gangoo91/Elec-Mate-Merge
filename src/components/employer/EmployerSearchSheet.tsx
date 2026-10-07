/**
 * EmployerSearchSheet — the Employer Hub's search on a phone (ELE-1939).
 *
 * Desktop keeps the ⌘K palette; a phone gets this full-screen sheet over the
 * same index: every hub section, the palette's quick actions and Ask Mate,
 * plus the firm's people, jobs, clients, quotes and invoices from one
 * firm-scoped call (search_employer_hub, no money). Recent items come back
 * when the box is empty.
 *
 * Keyboard-safe: the field sits at the top, the sheet is sized to the
 * dynamic viewport so the keyboard never covers a result, scrolling the
 * results drops the keyboard, and Search on the keyboard opens the top hit.
 */
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Clock, Search, Sparkles, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useActingFirmId } from '@/hooks/useEmployerHome';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { autoCompleteOff } from '@/lib/textEntry';
import { cn } from '@/lib/utils';
import { QUICK_ACTIONS, type CommandSection } from '@/components/employer/EmployerCommandPalette';

type Kind = 'section' | 'action' | 'person' | 'job' | 'client' | 'quote' | 'invoice';

export interface SearchHit {
  key: string;
  kind: Kind;
  title: string;
  sub?: string;
  section: string;
  params?: Record<string, string>;
}

interface HubResults {
  people: { id: string; name: string; role: string | null; joined: boolean }[];
  jobs: { id: string; title: string; client: string | null; location: string | null; status: string | null }[];
  clients: { id: string; name: string; company: string | null; postcode: string | null }[];
  quotes: { id: string; number: string | null; client: string | null; title: string | null; state: string | null }[];
  invoices: { id: string; number: string | null; client: string | null; title: string | null; state: string | null }[];
}

const KIND_LABEL: Record<Kind, string> = {
  section: 'Page',
  action: 'Action',
  person: 'Person',
  job: 'Job',
  client: 'Client',
  quote: 'Quote',
  invoice: 'Invoice',
};

/** "Quote 2026/040", but never "Invoice Invoice/337". */
const numbered = (word: string, n: string | null) =>
  !n ? word : /^[0-9]/.test(n) ? `${word} ${n}` : n;
const cap = (s: string | null | undefined) => (s ? s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, ' ') : '');

const RECENT_MAX = 6;
const recentKey = (uid?: string) => `employer-search-recent:${uid ?? 'anon'}`;
function readRecent(uid?: string): SearchHit[] {
  try {
    const v = JSON.parse(window.localStorage.getItem(recentKey(uid)) || '[]');
    return Array.isArray(v) ? (v as SearchHit[]).slice(0, RECENT_MAX) : [];
  } catch {
    return [];
  }
}
function writeRecent(uid: string | undefined, hit: SearchHit) {
  try {
    const next = [hit, ...readRecent(uid).filter((h) => h.key !== hit.key)].slice(0, RECENT_MAX);
    window.localStorage.setItem(recentKey(uid), JSON.stringify(next));
  } catch {
    /* private mode: nothing remembered */
  }
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sections: CommandSection[];
  /** Pages opened lately (the palette's Recent group). */
  recentPages?: CommandSection[];
  onGo: (section: string, params?: Record<string, string>) => void;
  onAskMate: (query: string) => void;
}

export function EmployerSearchSheet({
  open,
  onOpenChange,
  sections,
  recentPages = [],
  onGo,
  onAskMate,
}: Props) {
  const { user } = useAuth();
  const { data: firmId } = useActingFirmId();
  const [query, setQuery] = useState('');
  const [recent, setRecent] = useState<SearchHit[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const q = query.trim();
  const debounced = useDebouncedValue(q, 200);

  useEffect(() => {
    if (!open) return;
    setRecent(readRecent(user?.id));
    // Focus after the sheet's slide-in so iOS raises the keyboard.
    const t = window.setTimeout(() => inputRef.current?.focus(), 120);
    return () => window.clearTimeout(t);
  }, [open, user?.id]);

  const { data: found, isFetching } = useQuery({
    queryKey: ['employer-hub-search', firmId, debounced],
    enabled: open && !!firmId && debounced.length >= 2,
    staleTime: 30_000,
    placeholderData: (prev) => prev,
    queryFn: async (): Promise<HubResults> => {
      // Cast: this RPC postdates the last types.ts regeneration.
      const { data, error } = await supabase.rpc('search_employer_hub' as never, {
        p_firm: firmId,
        p_q: debounced,
        p_limit: 5,
      } as never);
      if (error) throw new Error(error.message);
      return data as unknown as HubResults;
    },
  });

  const groups = useMemo(() => {
    if (!q) return [] as { title: string; hits: SearchHit[] }[];
    const needle = q.toLowerCase();
    const sectionHits: SearchHit[] = sections
      .filter((s) => `${s.title} ${s.eyebrow} ${s.key}`.toLowerCase().includes(needle))
      .slice(0, 6)
      .map((s) => ({ key: `section:${s.key}`, kind: 'section', title: s.title, sub: s.eyebrow, section: s.key }));
    const actionHits: SearchHit[] = QUICK_ACTIONS.filter((a) => a.label.toLowerCase().includes(needle)).map((a) => ({
      key: `action:${a.label}`,
      kind: 'action',
      title: a.label,
      section: a.section,
    }));
    const r = debounced === q || found ? found : undefined;
    const people: SearchHit[] = (r?.people ?? []).map((p) => ({
      key: `person:${p.id}`,
      kind: 'person',
      title: p.name,
      sub: [p.role, p.joined ? null : 'Not joined yet'].filter(Boolean).join(' · ') || undefined,
      section: 'team',
      params: { member: p.id },
    }));
    const jobs: SearchHit[] = (r?.jobs ?? []).map((j) => ({
      key: `job:${j.id}`,
      kind: 'job',
      title: j.title,
      sub: [j.client, j.location, j.status].filter(Boolean).join(' · ') || undefined,
      section: 'jobs',
      params: { job: j.id },
    }));
    const clients: SearchHit[] = (r?.clients ?? []).map((c) => ({
      key: `client:${c.id}`,
      kind: 'client',
      title: c.name,
      sub: [c.company, c.postcode].filter(Boolean).join(' · ') || undefined,
      section: 'clients',
      params: { client: c.id },
    }));
    const money: SearchHit[] = [
      ...(r?.quotes ?? []).map((x) => ({
        key: `quote:${x.id}`,
        kind: 'quote' as const,
        title: [numbered('Quote', x.number), x.client].filter(Boolean).join(' · '),
        sub: [x.title, cap(x.state)].filter(Boolean).join(' · ') || undefined,
        section: 'quotes',
        params: { quote: x.id },
      })),
      ...(r?.invoices ?? []).map((x) => ({
        key: `invoice:${x.id}`,
        kind: 'invoice' as const,
        title: [numbered('Invoice', x.number), x.client].filter(Boolean).join(' · '),
        sub: [x.title, cap(x.state)].filter(Boolean).join(' · ') || undefined,
        section: 'quotes',
        params: { invoice: x.id },
      })),
    ];
    return [
      { title: 'Jobs', hits: jobs },
      { title: 'People', hits: people },
      { title: 'Clients', hits: clients },
      { title: 'Quotes and invoices', hits: money },
      { title: 'Pages', hits: [...actionHits, ...sectionHits] },
    ].filter((g) => g.hits.length > 0);
  }, [q, debounced, found, sections]);

  const flat = groups.flatMap((g) => g.hits);
  const waiting = q.length >= 2 && (isFetching || debounced !== q);

  const close = () => {
    setQuery('');
    onOpenChange(false);
  };
  const pick = (hit: SearchHit) => {
    writeRecent(user?.id, hit);
    close();
    onGo(hit.section, hit.params);
  };
  const ask = () => {
    close();
    onAskMate(q);
  };

  // Scrolling the list means the person is reading: drop the keyboard.
  const dropKeyboard = () => {
    if (document.activeElement === inputRef.current) inputRef.current?.blur();
  };

  return (
    <Sheet open={open} onOpenChange={(o) => (o ? onOpenChange(true) : close())}>
      <SheetContent
        side="bottom"
        hideCloseButton
        className="h-[100dvh] max-h-[100dvh] p-0 rounded-none border-0 bg-[hsl(0_0%_7%)]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <SheetTitle className="sr-only">Search the hub</SheetTitle>
        <div className="flex h-full flex-col">
          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              if (flat[0]) pick(flat[0]);
              else if (q) ask();
            }}
            className="shrink-0 border-b border-white/[0.08] bg-[hsl(0_0%_9%)] px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3"
          >
            <div className="flex items-center gap-2">
              <div className="relative min-w-0 flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white" aria-hidden />
                <input
                  ref={inputRef}
                  type="search"
                  inputMode="search"
                  enterKeyHint="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Jobs, people, clients…"
                  aria-label="Search the hub"
                  autoComplete={autoCompleteOff}
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  className="h-11 w-full rounded-xl border border-white/[0.14] bg-white/[0.06] pl-9 pr-10 text-base text-white placeholder:text-white/50 caret-elec-yellow outline-none focus:border-elec-yellow [&::-webkit-search-cancel-button]:hidden touch-manipulation"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('');
                      inputRef.current?.focus();
                    }}
                    aria-label="Clear"
                    className="absolute right-0 top-0 inline-flex h-11 w-11 items-center justify-center text-white touch-manipulation"
                  >
                    <X className="h-4 w-4" aria-hidden />
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={close}
                className="h-11 shrink-0 px-2 text-[15px] font-semibold text-elec-yellow touch-manipulation"
              >
                Cancel
              </button>
            </div>
          </form>

          <div
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-[max(1rem,env(safe-area-inset-bottom))]"
            onTouchMove={dropKeyboard}
            onScroll={dropKeyboard}
          >
            {!q ? (
              <>
                {recent.length > 0 && (
                  <Group title="Recent">
                    {recent.map((h) => (
                      <Row key={h.key} hit={h} icon={<Clock className="h-4 w-4" aria-hidden />} onPick={pick} />
                    ))}
                  </Group>
                )}
                {recentPages.length > 0 && (
                  <Group title="Pages you opened lately">
                    {recentPages.slice(0, 4).map((p) => (
                      <Row
                        key={p.key}
                        hit={{ key: `section:${p.key}`, kind: 'section', title: p.title, sub: p.eyebrow, section: p.key }}
                        icon={<ArrowRight className="h-4 w-4" aria-hidden />}
                        onPick={pick}
                        hideKind
                      />
                    ))}
                  </Group>
                )}
                <Group title="Quick actions">
                  {QUICK_ACTIONS.map((a) => (
                    <Row
                      key={a.label}
                      hit={{ key: `action:${a.label}`, kind: 'action', title: a.label, section: a.section }}
                      icon={<ArrowRight className="h-4 w-4" aria-hidden />}
                      onPick={pick}
                      hideKind
                    />
                  ))}
                </Group>
                <p className="px-4 pt-4 text-[13px] leading-relaxed text-white">
                  Type a name, job, street, postcode or invoice number. Pages like Timesheets or RAMS work too.
                </p>
              </>
            ) : (
              <>
                <Group title="Ask">
                  <button
                    type="button"
                    onClick={ask}
                    className="w-full min-h-[44px] flex items-center gap-3 px-4 py-2.5 text-left touch-manipulation active:bg-white/[0.06]"
                  >
                    <Sparkles className="h-4 w-4 shrink-0 text-elec-yellow" aria-hidden />
                    <span className="min-w-0 flex-1 truncate text-[15px] font-semibold text-white">
                      Ask Mate: &ldquo;{q}&rdquo;
                    </span>
                  </button>
                </Group>
                {groups.map((g) => (
                  <Group key={g.title} title={g.title}>
                    {g.hits.map((h) => (
                      <Row key={h.key} hit={h} onPick={pick} hideKind={g.title !== 'Pages'} />
                    ))}
                  </Group>
                ))}
                {waiting && groups.length === 0 && (
                  <p className="px-4 py-6 text-[14px] text-white">Searching…</p>
                )}
                {!waiting && groups.length === 0 && (
                  <p className="px-4 py-6 text-[14px] text-white">
                    Nothing matches &ldquo;{q}&rdquo;.{q.length < 2 ? ' Keep typing.' : ' Try a surname, postcode or number.'}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="pt-3">
      <h2 className="px-4 pb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">{title}</h2>
      <div className="divide-y divide-white/[0.06]">{children}</div>
    </section>
  );
}

function Row({
  hit,
  icon,
  onPick,
  hideKind,
}: {
  hit: SearchHit;
  icon?: ReactNode;
  onPick: (h: SearchHit) => void;
  hideKind?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => onPick(hit)}
      className="w-full min-h-[44px] flex items-center gap-3 px-4 py-2.5 text-left touch-manipulation active:bg-white/[0.06]"
    >
      {icon && <span className="shrink-0 text-white">{icon}</span>}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] font-semibold text-white">{hit.title}</span>
        {hit.sub && <span className="block truncate text-[13px] text-white">{hit.sub}</span>}
      </span>
      {!hideKind && (
        <span
          className={cn(
            'shrink-0 rounded-full border border-white/[0.16] px-2 py-0.5 text-[11.5px] font-semibold text-white'
          )}
        >
          {KIND_LABEL[hit.kind]}
        </span>
      )}
    </button>
  );
}
