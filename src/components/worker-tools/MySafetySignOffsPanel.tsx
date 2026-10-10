/**
 * MySafetySignOffsPanel — toolbox talks, RAMS and company policies a worker
 * signs in the app (ELE-1817, ELE-1946, ELE-2010, ELE-2031).
 *
 * The firm's toolbox talks (Site Safety `team_briefings` with a firm) reach a
 * worker when they are named on the register or are on the job's crew. The
 * firm's RAMS for a job reach its crew. The firm's published policies reach
 * everyone on its roster. Each opens in a sheet with the content and a
 * signature. Signing records who, when and (if the phone allows) where; the
 * worker can download a signed copy for their own records.
 *
 * Deep links: ?briefing=<id>, ?rams=<id>, ?policy=<id> open that item (the
 * push notifications use these).
 *
 * Renders nothing when there is nothing from the firm.
 */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format, parseISO } from 'date-fns';
import { BookOpenCheck, ClipboardCheck, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import SignatureInput from '@/components/signature/SignatureInput';
import { Eyebrow, Pill } from '@/components/employer/editorial';
import { policyProseClass, sanitizePolicyHtml } from '@/utils/policyHtml';
import { currentSigningLocation, describeLocation } from '@/lib/signingLocation';
import { downloadSignedCopy, htmlToSections, type SignedCopySection } from '@/utils/signedCopyPdf';
import {
  MY_SAFETY_SIGNOFFS_KEY,
  useMySafetySignoffs,
  type BriefingToSign,
  type PolicyToSign,
  type RamsToSign,
} from '@/hooks/useMySafetySignoffs';

type Selected =
  | { kind: 'briefing'; item: BriefingToSign }
  | { kind: 'rams'; item: RamsToSign }
  | { kind: 'policy'; item: PolicyToSign };

interface RamsDetail {
  activities: string[] | null;
  required_ppe: string[] | null;
  risks: Array<{ hazard?: string; controls?: string; controlMeasures?: string }> | null;
}

const day = (iso?: string | null) => {
  if (!iso) return '';
  try {
    return format(parseISO(iso), 'd MMM yyyy');
  } catch {
    return '';
  }
};

const KIND_LABEL: Record<Selected['kind'], string> = {
  briefing: 'Toolbox talk',
  rams: 'RAMS',
  policy: 'Company policy',
};

const titleOf = (s: Selected) =>
  s.kind === 'briefing'
    ? s.item.briefing_name || 'Toolbox talk'
    : s.kind === 'rams'
      ? s.item.project_name || 'RAMS'
      : s.item.name || 'Company policy';

const clean = (items: string[] | null | undefined) =>
  (items ?? []).filter((x) => typeof x === 'string' && x.trim());

/** "manual-handling" → "Manual handling", as the briefing screens show it. */
const hazardLabel = (h: string) => {
  const t = h
    .replace(/^custom-/, '')
    .replace(/-/g, ' ')
    .trim();
  return t.charAt(0).toUpperCase() + t.slice(1);
};

const ramsHazards = (detail: RamsDetail | null) =>
  (detail?.risks ?? [])
    .map((r) => [r.hazard, r.controls || r.controlMeasures].filter(Boolean).join(': '))
    .filter(Boolean);

export function MySafetySignOffsPanel({ className }: { className?: string }) {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState<Selected | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  const { data } = useMySafetySignoffs();

  // A RAMS's content is read under the crew policy (firm RAMS for my job).
  const ramsId = selected?.kind === 'rams' ? selected.item.id : null;
  const { data: ramsDetail } = useQuery({
    queryKey: [...MY_SAFETY_SIGNOFFS_KEY, 'rams', ramsId],
    enabled: !!ramsId,
    queryFn: async (): Promise<RamsDetail | null> => {
      const cols: string = 'id, project_name, location, activities, required_ppe, risks';
      const { data: row, error } = await supabase
        .from('rams_documents')
        .select(cols)
        .eq('id', ramsId as string)
        .maybeSingle();
      if (error) throw error;
      return row as unknown as RamsDetail | null;
    },
  });

  // Open the item a push notification points at, once the list has it.
  const linkBriefing = searchParams.get('briefing');
  const linkRams = searchParams.get('rams');
  const linkPolicy = searchParams.get('policy');
  useEffect(() => {
    if (!data || selected) return;
    let next: Selected | null = null;
    if (linkBriefing) {
      const b = data.briefings.find((x) => x.id === linkBriefing);
      if (b) next = { kind: 'briefing', item: b };
    } else if (linkRams) {
      const r = data.rams.find((x) => x.id === linkRams);
      if (r) next = { kind: 'rams', item: r };
    } else if (linkPolicy) {
      const p = data.policies.find((x) => x.id === linkPolicy);
      if (p) next = { kind: 'policy', item: p };
    }
    if (next) {
      setSignature(null);
      setSelected(next);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, linkBriefing, linkRams, linkPolicy]);

  const close = () => {
    setSelected(null);
    if (linkBriefing || linkRams || linkPolicy) {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.delete('briefing');
          next.delete('rams');
          next.delete('policy');
          return next;
        },
        { replace: true }
      );
    }
  };

  const sign = useMutation({
    mutationFn: async () => {
      if (!selected || !signature) throw new Error('Draw your signature first.');
      const location = await currentSigningLocation();
      const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : null;
      if (selected.kind === 'briefing') {
        const { error } = await supabase.rpc(
          'sign_team_briefing_in_app' as never,
          { p_briefing_id: selected.item.id, p_signature: signature, p_location: location } as never
        );
        if (error) throw error;
      } else if (selected.kind === 'rams') {
        const { error } = await supabase.rpc(
          'acknowledge_firm_rams' as never,
          {
            p_rams_document_id: selected.item.id,
            p_signature: signature,
            p_location: location,
            p_user_agent: userAgent,
          } as never
        );
        if (error) throw error;
      } else {
        const { error } = await supabase.rpc(
          'acknowledge_firm_policy' as never,
          {
            p_policy_id: selected.item.id,
            p_signature: signature,
            p_location: location,
            p_user_agent: userAgent,
          } as never
        );
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success('Signed. The office can see it now.');
      close();
      setSignature(null);
      void queryClient.invalidateQueries({ queryKey: MY_SAFETY_SIGNOFFS_KEY });
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : 'Could not sign. Try again.');
    },
  });

  const briefings = data?.briefings ?? [];
  const rams = data?.rams ?? [];
  const policies = data?.policies ?? [];
  if (briefings.length === 0 && rams.length === 0 && policies.length === 0) return null;

  const toSign =
    briefings.filter((b) => !b.signed_at).length +
    rams.filter((r) => !r.signed_at).length +
    policies.filter((p) => !p.signed_at).length;

  const rows: Array<{
    key: string;
    icon: typeof ShieldCheck;
    eyebrow: string;
    title: string;
    detail: string;
    signedAt: string | null;
    open: () => void;
  }> = [
    ...briefings.map((b) => ({
      key: `b-${b.id}`,
      icon: ClipboardCheck,
      eyebrow: b.company_name ? `Toolbox talk · ${b.company_name}` : 'Toolbox talk',
      title: b.briefing_name || 'Toolbox talk',
      detail: [day(b.briefing_date), b.job_title || b.location].filter(Boolean).join(' · '),
      signedAt: b.signed_at,
      open: () => setSelected({ kind: 'briefing', item: b }),
    })),
    ...rams.map((r) => ({
      key: `r-${r.id}`,
      icon: ShieldCheck,
      eyebrow: r.company_name ? `RAMS · ${r.company_name}` : 'RAMS',
      title: r.project_name || 'RAMS',
      detail: [r.job_title, r.version ? `Version ${r.version}` : ''].filter(Boolean).join(' · '),
      signedAt: r.signed_at,
      open: () => setSelected({ kind: 'rams', item: r }),
    })),
    ...policies.map((p) => ({
      key: `p-${p.id}`,
      icon: BookOpenCheck,
      eyebrow: p.company_name ? `Policy · ${p.company_name}` : 'Company policy',
      title: p.name || 'Company policy',
      detail: [
        p.version ? `Version ${p.version}` : '',
        p.published_at ? `Sent ${day(p.published_at)}` : '',
      ]
        .filter(Boolean)
        .join(' · '),
      signedAt: p.signed_at,
      open: () => setSelected({ kind: 'policy', item: p }),
    })),
  ].sort((a, b) => Number(!!a.signedAt) - Number(!!b.signedAt));

  const signedAt = selected?.item.signed_at ?? null;

  const downloadCopy = async () => {
    if (!selected || !selected.item.signed_at) return;
    setDownloading(true);
    try {
      let sections: SignedCopySection[] = [];
      let facts: Array<{ label: string; value: string | null | undefined }> = [];
      if (selected.kind === 'briefing') {
        const b = selected.item;
        sections = [
          ...(b.safety_warning ? [{ heading: 'Warning', lines: [b.safety_warning] }] : []),
          ...(b.briefing_description
            ? [{ heading: 'The talk', lines: b.briefing_description.split(/\n+/) }]
            : []),
          ...(b.work_scope && b.work_scope !== b.briefing_description
            ? [{ heading: 'The work', lines: b.work_scope.split(/\n+/) }]
            : []),
          { heading: 'Hazards', lines: clean(b.identified_hazards).map(hazardLabel), list: true },
          { heading: 'Key points', lines: clean(b.key_points), list: true },
          { heading: 'Safety points', lines: clean(b.safety_points), list: true },
        ];
        facts = [
          { label: 'Date', value: day(b.briefing_date) },
          { label: 'Site', value: b.location },
          { label: 'Job', value: b.job_title },
          { label: 'Given by', value: b.conductor_name },
        ];
      } else if (selected.kind === 'rams') {
        const r = selected.item;
        sections = [
          { heading: 'Activities', lines: clean(ramsDetail?.activities), list: true },
          { heading: 'Hazards and controls', lines: ramsHazards(ramsDetail ?? null), list: true },
          { heading: 'PPE', lines: clean(ramsDetail?.required_ppe), list: true },
        ];
        facts = [
          { label: 'Job', value: r.job_title },
          { label: 'Site', value: r.location },
          { label: 'Version', value: r.version ? String(r.version) : null },
        ];
      } else {
        const p = selected.item;
        sections = htmlToSections(p.content || '');
        facts = [
          { label: 'Version', value: p.version ? String(p.version) : null },
          { label: 'Sent to the team', value: day(p.published_at) },
        ];
      }
      await downloadSignedCopy({
        kind: KIND_LABEL[selected.kind],
        title: titleOf(selected),
        from: selected.item.company_name,
        facts,
        sections,
        signerName: selected.item.my_name,
        signedAt: selected.item.signed_at,
        signature: selected.item.my_signature,
        location: selected.item.my_location,
      });
    } catch {
      toast.error('Could not make the signed copy. Try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section className={cn('space-y-3', className)} aria-label="Toolbox talks, RAMS and policies">
      <div className="flex items-center gap-2">
        <Eyebrow className={toSign > 0 ? 'text-amber-400' : undefined}>
          {toSign > 0 ? 'Safety and policies to sign' : 'Toolbox talks, RAMS and policies'}
        </Eyebrow>
        {toSign > 0 && <Pill tone="amber">{toSign}</Pill>}
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {rows.map((r) => {
          const Icon = r.icon;
          return (
            <div
              key={r.key}
              className={cn(
                'rounded-2xl border bg-white/[0.04] p-4',
                r.signedAt ? 'border-white/[0.08]' : 'border-amber-500/40'
              )}
            >
              <div className="flex items-start gap-3">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-elec-yellow" aria-hidden />
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-semibold text-white">{r.eyebrow}</p>
                  <p className="mt-1 text-[15px] font-semibold leading-snug text-white">
                    {r.title}
                  </p>
                  {r.detail && <p className="mt-1 text-[12.5px] text-white">{r.detail}</p>}
                  <p className="text-[12.5px] text-white">
                    {r.signedAt ? `You signed on ${day(r.signedAt)}` : 'Not signed yet'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSignature(null);
                  r.open();
                }}
                className={cn(
                  'mt-4 inline-flex h-11 w-full items-center justify-center rounded-full px-4 text-[13.5px] font-semibold touch-manipulation active:scale-[0.98]',
                  r.signedAt
                    ? 'border border-white/[0.14] bg-white/[0.06] text-white'
                    : 'bg-elec-yellow text-black'
                )}
              >
                {r.signedAt ? 'Read again' : 'Read and sign'}
              </button>
            </div>
          );
        })}
      </div>

      <Sheet open={!!selected} onOpenChange={(o) => !o && close()}>
        <SheetContent
          side="bottom"
          className="h-[85vh] overflow-y-auto rounded-t-2xl border-white/[0.08] bg-[hsl(0_0%_8%)] p-0"
        >
          {selected && (
            <div className="mx-auto max-w-6xl space-y-5 px-4 pb-10 pt-6 sm:px-6 lg:px-10">
              <div>
                <p className="text-[12.5px] font-semibold text-elec-yellow">
                  {KIND_LABEL[selected.kind]}
                  {selected.item.company_name ? ` · ${selected.item.company_name}` : ''}
                </p>
                <h2 className="mt-1 text-[20px] font-semibold leading-tight text-white">
                  {titleOf(selected)}
                </h2>
                <p className="mt-1 text-[13px] text-white">
                  {selected.kind === 'briefing'
                    ? [
                        day(selected.item.briefing_date),
                        selected.item.location,
                        selected.item.conductor_name
                          ? `Given by ${selected.item.conductor_name}`
                          : '',
                      ]
                        .filter(Boolean)
                        .join(' · ')
                    : selected.kind === 'rams'
                      ? [selected.item.job_title, selected.item.location]
                          .filter(Boolean)
                          .join(' · ')
                      : [
                          selected.item.version ? `Version ${selected.item.version}` : '',
                          selected.item.published_at
                            ? `Sent ${day(selected.item.published_at)}`
                            : '',
                        ]
                          .filter(Boolean)
                          .join(' · ')}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
                <div className="min-w-0">
                  {selected.kind === 'briefing' ? (
                    <BriefingBody b={selected.item} />
                  ) : selected.kind === 'rams' ? (
                    <RamsBody detail={ramsDetail ?? null} />
                  ) : (
                    <div
                      className={policyProseClass}
                      dangerouslySetInnerHTML={{
                        __html: sanitizePolicyHtml(selected.item.content || ''),
                      }}
                    />
                  )}
                </div>
                <div className="min-w-0 lg:sticky lg:top-6 lg:self-start">
                  {signedAt ? (
                    <div className="space-y-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
                      <p className="text-[13.5px] text-white">
                        You signed this on {day(signedAt)}
                        {describeLocation(selected.item.my_location)
                          ? `, at ${describeLocation(selected.item.my_location)}`
                          : ''}
                        .
                      </p>
                      <button
                        type="button"
                        onClick={downloadCopy}
                        disabled={downloading || (selected.kind === 'rams' && !ramsDetail)}
                        className="inline-flex h-11 w-full items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.06] px-4 text-[14px] font-semibold text-white touch-manipulation disabled:opacity-50"
                      >
                        {downloading ? 'Making the PDF…' : 'Download signed copy'}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
                      <Eyebrow>Your signature</Eyebrow>
                      <p className="text-[12.5px] leading-relaxed text-white">
                        By signing you confirm you have read and understood this, and will work to
                        it. Your phone's location is recorded with your signature if it allows.
                      </p>
                      <SignatureInput value={signature || undefined} onChange={setSignature} />
                      <button
                        type="button"
                        disabled={!signature || sign.isPending}
                        onClick={() => sign.mutate()}
                        className="inline-flex h-11 w-full items-center justify-center rounded-full bg-elec-yellow px-4 text-[14px] font-semibold text-black touch-manipulation disabled:opacity-50"
                      >
                        {sign.isPending ? 'Signing…' : 'Sign'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </section>
  );
}

function List({ title, items }: { title: string; items: string[] | null | undefined }) {
  const list = clean(items);
  if (list.length === 0) return null;
  return (
    <div className="space-y-2">
      <h3 className="text-[14px] font-semibold text-white">{title}</h3>
      <ul className="space-y-1.5">
        {list.map((x, i) => (
          <li key={i} className="text-[13.5px] leading-relaxed text-white">
            {x}
          </li>
        ))}
      </ul>
    </div>
  );
}

function BriefingBody({ b }: { b: BriefingToSign }) {
  return (
    <div className="space-y-5">
      {b.safety_warning && (
        <p className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-3 text-[13.5px] text-orange-300">
          {b.safety_warning}
        </p>
      )}
      {b.briefing_description && (
        <p className="whitespace-pre-line text-[14px] leading-relaxed text-white">
          {b.briefing_description}
        </p>
      )}
      {b.work_scope && b.work_scope !== b.briefing_description && (
        <div className="space-y-1">
          <h3 className="text-[14px] font-semibold text-white">The work</h3>
          <p className="whitespace-pre-line text-[13.5px] leading-relaxed text-white">
            {b.work_scope}
          </p>
        </div>
      )}
      <List title="Hazards" items={clean(b.identified_hazards).map(hazardLabel)} />
      <List title="Key points" items={b.key_points} />
      <List title="Safety points" items={b.safety_points} />
    </div>
  );
}

function RamsBody({ detail }: { detail: RamsDetail | null }) {
  if (!detail) return <p className="text-[13px] text-white">Loading the RAMS…</p>;
  return (
    <div className="space-y-5">
      <List title="Activities" items={detail.activities} />
      <List title="Hazards and controls" items={ramsHazards(detail)} />
      <List title="PPE" items={detail.required_ppe} />
    </div>
  );
}

export default MySafetySignOffsPanel;
