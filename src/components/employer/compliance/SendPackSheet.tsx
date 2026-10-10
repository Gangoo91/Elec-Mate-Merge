/**
 * "Send our pack" (ELE-2076): what a main contractor's prequalification asks
 * for (CHAS, SSIP, Constructionline or a custom list): insurance
 * certificates, policies, accreditations and the safety score evidence.
 * Send it as an expiring link (token-keyed, opened signed out at
 * /firm-pack/:token) or download a zip. Owner and admins only.
 *
 * Files stay in the private compliance bucket. A share stores which
 * documents it holds (document_id), never a file link: the public page asks
 * the firm-pack-files edge function for 10-minute links while the share is
 * live, so stopping it recalls the files within minutes, whoever uploaded
 * them. Until that function is deployed, the old path is used: links signed
 * in the browser, which only works for your own uploads, so a file someone
 * else uploaded stops the send with a clear message rather than going out
 * empty.
 */
import { useEffect, useMemo, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import JSZip from 'jszip';
import { Copy, FileDown, Link2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { getActingEmployerId } from '@/lib/actingEmployer';
import { copyToClipboard } from '@/utils/clipboard';
import { saveOrShareFile } from '@/utils/save-or-share-file';
import { FormSheet } from '@/components/forms/FormSheet';
import { useComplianceDocuments } from '@/hooks/useComplianceDocuments';
import { useFirmSafetyOverview } from '@/hooks/useFirmSafetyOverview';
import { useEmployerRole } from '@/hooks/useEmployerRole';
import {
  Field,
  PrimaryButton,
  SecondaryButton,
  LoadingBlocks,
  inputClass,
} from '@/components/employer/editorial';
import {
  panel,
  PanelHead,
  Row,
  Rows,
  PlainEmpty,
  StatusPill,
  plural,
} from '@/components/employer/pageParts/PageParts';
import { guessInsuranceKind, insuranceLabel, money } from './insurance';
import { packFilesServerReady, signFirmDocuments } from './packFiles';
import { accreditationLabel, isSettingsDoc, mergeCredentials } from './credentials';
import { useFirmCredentials } from '@/hooks/useFirmCredentials';
import type { ComplianceDocument } from '@/hooks/useComplianceDocuments';

/** The register row that holds a document's file. A Settings record (public
 *  liability, scheme) keeps its certificate on its own row (Gap #10). */
const fileId = (d: ComplianceDocument) => (isSettingsDoc(d) ? (d.certificate_id ?? null) : d.id);

type Questionnaire = 'chas' | 'ssip' | 'constructionline' | 'custom';

const QUESTIONNAIRES: { id: Questionnaire; label: string; asks: string }[] = [
  {
    id: 'chas',
    label: 'CHAS',
    asks: 'CHAS Advanced is an SSIP member scheme: health and safety policy, risk assessment, training, insurance.',
  },
  {
    id: 'ssip',
    label: 'SSIP',
    asks: 'SSIP core criteria: health and safety policy and organisation, arrangements, competent advice, training, qualifications, monitoring, accident reporting, risk assessment, welfare.',
  },
  {
    id: 'constructionline',
    label: 'Constructionline',
    asks: 'Insurance certificates (employers’ liability, public liability, professional indemnity), health and safety policies and accreditations.',
  },
  { id: 'custom', label: 'Custom list', asks: 'Choose what the main contractor asked for.' },
];

const DAYS = [7, 14, 30];

interface Share {
  id: string;
  token: string;
  questionnaire: Questionnaire;
  recipient: string | null;
  items: unknown[];
  expires_at: string;
  revoked_at: string | null;
  view_count: number;
  last_viewed_at: string | null;
  created_at: string;
}

const ukDate = (iso?: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : '';

const shareUrl = (token: string) => `${window.location.origin}/firm-pack/${token}`;

const safeName = (s: string) => s.replace(/[^\w.-]+/g, '_').slice(0, 80);

function usePackShares(enabled: boolean) {
  return useQuery({
    queryKey: ['employer-pack-shares'],
    enabled,
    queryFn: async (): Promise<Share[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];
      const firm = (await getActingEmployerId(user.id)) ?? user.id;
      const { data, error } = await supabase
        .from('employer_pack_shares' as never)
        .select(
          'id, token, questionnaire, recipient, items, expires_at, revoked_at, view_count, last_viewed_at, created_at'
        )
        .eq('employer_id' as never, firm as never)
        .order('created_at' as never, { ascending: false })
        .limit(20);
      if (error) throw error;
      return (data ?? []) as unknown as Share[];
    },
  });
}

export function SendPackSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const qc = useQueryClient();
  const { data: role } = useEmployerRole();
  const allowed = !!role?.canSeeMoney;
  const { data: registerDocs = [] } = useComplianceDocuments();
  // Gap #10: the Settings policy and scheme are part of the pack too.
  const { data: creds } = useFirmCredentials({ enabled: open && allowed });
  const { data: safety } = useFirmSafetyOverview();
  const { data: shares = [], isLoading: sharesLoading } = usePackShares(open && allowed);
  const { data: policies = [] } = useQuery({
    queryKey: ['pack-policies'],
    enabled: open && allowed,
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];
      const firm = (await getActingEmployerId(user.id)) ?? user.id;
      const { data } = await supabase
        .from('employer_policies')
        .select('id, name, content, status, published_version, version, published_at, review_date')
        .eq('user_id', firm)
        .neq('status', 'Archived')
        .order('name');
      return (data ?? []) as unknown as {
        id: string;
        name: string;
        content: string;
        status: string | null;
        published_version: number | null;
        version: number | null;
        published_at: string | null;
        review_date: string | null;
      }[];
    },
  });
  const { data: company } = useQuery({
    queryKey: ['pack-company'],
    enabled: open && allowed,
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return null;
      const firm = (await getActingEmployerId(user.id)) ?? user.id;
      const { data } = await supabase
        .from('company_profiles')
        .select(
          'company_name, registration_scheme, registration_number, registration_expiry, company_registration, vat_number'
        )
        .eq('user_id', firm)
        .maybeSingle();
      return { firm, ...(data ?? {}) } as {
        firm: string;
        company_name?: string | null;
        registration_scheme?: string | null;
        registration_number?: string | null;
        registration_expiry?: string | null;
        company_registration?: string | null;
        vat_number?: string | null;
      };
    },
  });

  const [q, setQ] = useState<Questionnaire>('ssip');
  const [recipient, setRecipient] = useState('');
  const [days, setDays] = useState(14);
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [withScore, setWithScore] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [made, setMade] = useState<string | null>(null);

  const documents = useMemo(
    () => mergeCredentials(registerDocs, creds, company?.firm ?? ''),
    [registerDocs, creds, company?.firm]
  );
  const today = new Date().toISOString().slice(0, 10);
  const docs = useMemo(
    () =>
      documents
        .filter((d) => d.status !== 'Draft')
        .map((d) => ({
          d,
          lapsed: !!d.expiry_date && d.expiry_date.slice(0, 10) < today,
          ins: guessInsuranceKind(d),
        })),
    [documents, today]
  );

  // Default choice: in-date documents with a file, and published policies.
  useEffect(() => {
    if (!open) return;
    setMade(null);
    setPicked(
      new Set([
        ...docs.filter((x) => !x.lapsed && x.d.file_url).map((x) => `doc:${x.d.id}`),
        ...policies
          .filter((p) => p.published_version || p.status === 'Active')
          .map((p) => `pol:${p.id}`),
      ])
    );
  }, [open, docs.length, policies.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = (k: string) =>
    setPicked((s) => {
      const n = new Set(s);
      if (n.has(k)) n.delete(k);
      else n.add(k);
      return n;
    });

  const summary = () => ({
    company_name: company?.company_name ?? null,
    registration_scheme: company?.registration_scheme ?? null,
    registration_number: company?.registration_number ?? null,
    registration_expiry: company?.registration_expiry ?? null,
    company_number: company?.company_registration ?? null,
    safety_score: withScore ? (safety?.score ?? null) : undefined,
    safety_parts: withScore ? (safety?.parts ?? null) : undefined,
    produced_on: today,
  });

  const chosenDocs = docs.filter((x) => picked.has(`doc:${x.d.id}`));
  const chosenPolicies = policies.filter((p) => picked.has(`pol:${p.id}`));
  const count = chosenDocs.length + chosenPolicies.length;

  const createLink = async () => {
    if (!company || !count || busy) return;
    setBusy('Making the link');
    try {
      const seconds = days * 86400;
      const server = await packFilesServerReady();
      // Old path (function not deployed yet): sign in the browser for the
      // life of the pack, and stop if any file cannot be reached.
      const legacy = server
        ? {}
        : await signFirmDocuments(
            chosenDocs
              .filter((x) => fileId(x.d))
              .map((x) => ({ id: fileId(x.d)!, file_url: x.d.file_url })),
            seconds
          );
      if (!server) {
        const blocked = chosenDocs.filter(
          (x) => x.d.file_url && !legacy[fileId(x.d) ?? '']
        );
        if (blocked.length)
          throw new Error(
            `${blocked.length === 1 ? 'This file was' : 'These files were'} uploaded by someone else, so ${blocked.length === 1 ? 'it' : 'they'} can't go in a link from your account yet: ${blocked.map((x) => x.d.title).join(', ')}. Untick ${blocked.length === 1 ? 'it' : 'them'}, or ask whoever uploaded ${blocked.length === 1 ? 'it' : 'them'} to make the link.`
          );
      }
      const items: Record<string, unknown>[] = [];
      for (const x of chosenDocs) {
        items.push({
          type: 'document',
          document_id: fileId(x.d),
          has_file: !!x.d.file_url,
          title: x.d.title,
          category: x.ins
            ? insuranceLabel(x.ins)
            : x.d.accreditation
              ? accreditationLabel(x.d.accreditation)
              : (x.d.category ?? x.d.document_type ?? 'Document'),
          insurer: x.d.insurance_kind ? (x.d.insurer ?? null) : null,
          policy_number: x.d.policy_number ?? null,
          cover:
            x.d.cover_amount != null ? money(x.d.cover_amount) : (x.d.cover_text ?? null),
          expiry: x.d.expiry_date ?? null,
          url: server ? null : (legacy[fileId(x.d) ?? ''] ?? null),
        });
      }
      for (const p of chosenPolicies)
        items.push({
          type: 'policy',
          title: p.name,
          version: p.published_version ?? p.version,
          review_date: p.review_date,
          content: p.content?.slice(0, 40000) ?? '',
        });
      const { data, error } = await supabase.rpc(
        'create_pack_share' as never,
        {
          p_firm: company.firm,
          p_questionnaire: q,
          p_recipient: recipient.trim() || null,
          p_items: items,
          p_summary: summary(),
          p_days: days,
        } as never
      );
      if (error)
        throw new Error(
          error.message.includes('NOT_AUTHORISED')
            ? 'Only the owner or an admin can send the pack.'
            : error.message
        );
      const token = (data as unknown as { token: string }).token;
      setMade(shareUrl(token));
      qc.invalidateQueries({ queryKey: ['employer-pack-shares'] });
      toast({
        title: 'Link ready',
        description: `It stops working on ${ukDate(new Date(Date.now() + seconds * 1000).toISOString())}.`,
      });
    } catch (e) {
      toast({
        title: 'Could not make the link',
        description: e instanceof Error ? e.message : 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setBusy(null);
    }
  };

  const downloadZip = async () => {
    if (!count || busy) return;
    setBusy('Building the zip');
    try {
      const zip = new JSZip();
      const s = summary();
      zip.file(
        'about-us.txt',
        [
          s.company_name ?? 'Our firm',
          s.registration_scheme
            ? `Registered with ${s.registration_scheme}${s.registration_number ? `, number ${s.registration_number}` : ''}${s.registration_expiry ? `, until ${ukDate(s.registration_expiry)}` : ''}`
            : '',
          s.company_number ? `Company number ${s.company_number}` : '',
          withScore && safety?.score != null
            ? `Safety score ${safety.score} out of 100, from the last 30 to 90 days of our records.`
            : '',
          `Prepared ${ukDate(today)}.`,
        ]
          .filter(Boolean)
          .join('\n')
      );
      const missing: string[] = [];
      const links = await signFirmDocuments(
        chosenDocs
          .filter((x) => fileId(x.d))
          .map((x) => ({ id: fileId(x.d)!, file_url: x.d.file_url }))
      );
      for (const x of chosenDocs) {
        if (!x.d.file_url) {
          missing.push(`${x.d.title}: no file attached`);
          continue;
        }
        const url = links[fileId(x.d) ?? ''];
        const blob = url
          ? await fetch(url)
              .then((r) => (r.ok ? r.blob() : null))
              .catch(() => null)
          : null;
        if (!blob) {
          missing.push(
            `${x.d.title}: ${url ? 'the file could not be downloaded' : 'uploaded by someone else, so only they can add it for now'}`
          );
          continue;
        }
        const tail = x.d.file_url.split('.').pop()?.toLowerCase();
        const ext = tail && tail.length <= 4 ? `.${tail}` : blob.type.includes('pdf') ? '.pdf' : '';
        zip.folder('documents')!.file(`${safeName(x.d.title)}${ext}`, blob);
      }
      for (const p of chosenPolicies)
        zip.folder('policies')!.file(`${safeName(p.name)}.txt`, p.content ?? '');
      if (missing.length)
        zip.file(
          'MISSING.txt',
          `These could not be added to the zip:\n${missing.map((m) => `- ${m}`).join('\n')}\n`
        );
      const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
      await saveOrShareFile(blob, `${q}-pack-${today}.zip`);
      if (missing.length)
        toast({
          title: `${plural(missing.length, 'file')} not in the zip`,
          description: 'MISSING.txt in the zip says which and why.',
        });
    } catch (e) {
      toast({
        title: 'Could not build the zip',
        description: e instanceof Error ? e.message : 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setBusy(null);
    }
  };

  const revoke = async (id: string) => {
    const { error } = await supabase.rpc('revoke_pack_share' as never, { p_id: id } as never);
    if (error) {
      toast({ title: 'Could not stop the link', variant: 'destructive' });
      return;
    }
    qc.invalidateQueries({ queryKey: ['employer-pack-shares'] });
    toast({ title: 'Link stopped' });
  };

  const checkRow = (key: string, title: string, detail: string, warn?: string) => (
    <label
      key={key}
      className="flex min-h-[60px] cursor-pointer items-center gap-3 px-4 py-3 touch-manipulation sm:px-5"
    >
      <input
        type="checkbox"
        checked={picked.has(key)}
        onChange={() => toggle(key)}
        className="h-5 w-5 shrink-0 accent-elec-yellow"
      />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] font-semibold text-white">{title}</span>
        <span className="block truncate text-[13px] text-white">{detail}</span>
      </span>
      {warn && <StatusPill tone="red">{warn}</StatusPill>}
    </label>
  );

  const asks = QUESTIONNAIRES.find((x) => x.id === q)!;

  if (!allowed) {
    return (
      <FormSheet
        open={open}
        onOpenChange={onOpenChange}
        width="wide"
        eyebrow="Compliance"
        title="Send our pack"
      >
        <PlainEmpty text="Only the owner or an admin can send the firm's pack to a main contractor." />
      </FormSheet>
    );
  }

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Compliance"
      title="Send our pack"
      description={`${plural(count, 'item')} chosen. Send a link that stops working after ${days} days, or download a zip.`}
      footer={
        <div className="flex gap-3">
          <SecondaryButton
            onClick={downloadZip}
            disabled={!count || !!busy}
            className="flex-1 sm:flex-none"
          >
            <FileDown className="mr-2 h-4 w-4" />
            Zip
          </SecondaryButton>
          <PrimaryButton
            onClick={createLink}
            disabled={!count || !!busy || !company}
            className="flex-1"
          >
            <Link2 className="mr-2 h-4 w-4" />
            {busy ?? 'Make the link'}
          </PrimaryButton>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start">
        <div className="min-w-0 space-y-5">
          <Field label="Their questionnaire">
            <div className="flex flex-wrap gap-2">
              {QUESTIONNAIRES.map((x) => (
                <button
                  key={x.id}
                  type="button"
                  onClick={() => setQ(x.id)}
                  className={cn(
                    'h-11 rounded-full border px-4 text-[13px] touch-manipulation',
                    q === x.id
                      ? 'bg-elec-yellow border-elec-yellow text-black font-semibold'
                      : 'bg-white/[0.06] border-white/[0.12] text-white font-medium'
                  )}
                >
                  {x.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-[13px] leading-snug text-white">{asks.asks}</p>
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Main contractor (optional)">
              <input
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Who it is for"
                className={inputClass}
              />
            </Field>
            <Field label="Link works for">
              <div className="flex gap-2">
                {DAYS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDays(d)}
                    className={cn(
                      'h-11 flex-1 rounded-full border px-3 text-[13px] touch-manipulation',
                      days === d
                        ? 'bg-elec-yellow border-elec-yellow text-black font-semibold'
                        : 'bg-white/[0.06] border-white/[0.12] text-white font-medium'
                    )}
                  >
                    {d} days
                  </button>
                ))}
              </div>
            </Field>
          </div>

          <section className={cn(panel, 'overflow-hidden')}>
            <PanelHead title="Certificates and insurance" meta={`${chosenDocs.length}`} />
            {docs.length === 0 ? (
              <PlainEmpty
                bare
                text="Nothing on the compliance register yet. Add your insurance first."
              />
            ) : (
              <div className="divide-y divide-white/[0.07]">
                {docs.map((x) =>
                  checkRow(
                    `doc:${x.d.id}`,
                    x.d.title,
                    [
                      x.ins ? insuranceLabel(x.ins) : x.d.category,
                      x.d.expiry_date ? `renews ${ukDate(x.d.expiry_date)}` : null,
                      x.d.file_url ? null : 'no file attached',
                    ]
                      .filter(Boolean)
                      .join(' · '),
                    x.lapsed ? 'Lapsed' : undefined
                  )
                )}
              </div>
            )}
          </section>

          <section className={cn(panel, 'overflow-hidden')}>
            <PanelHead title="Policies" meta={`${chosenPolicies.length}`} />
            {policies.length === 0 ? (
              <PlainEmpty bare text="No policies adopted yet." />
            ) : (
              <div className="divide-y divide-white/[0.07]">
                {policies.map((p) =>
                  checkRow(
                    `pol:${p.id}`,
                    p.name,
                    [
                      p.published_version ? `version ${p.published_version}` : 'not published',
                      p.review_date ? `review ${ukDate(p.review_date)}` : null,
                    ]
                      .filter(Boolean)
                      .join(' · ')
                  )
                )}
              </div>
            )}
          </section>

          <label className="flex min-h-[44px] items-center gap-3 text-[14px] text-white touch-manipulation">
            <input
              type="checkbox"
              checked={withScore}
              onChange={(e) => setWithScore(e.target.checked)}
              className="h-5 w-5 accent-elec-yellow"
            />
            Include our safety score
            {safety?.score != null ? ` (${safety.score} out of 100)` : ' (not started yet)'} and our
            scheme registration
          </label>
        </div>

        <div className="min-w-0 space-y-6">
          {made && (
            <section className={cn(panel, 'overflow-hidden')}>
              <PanelHead title="Your link" />
              <div className="space-y-3 px-4 py-3 sm:px-5">
                <p className="break-all text-[13px] text-white">{made}</p>
                <SecondaryButton
                  fullWidth
                  onClick={async () => {
                    await copyToClipboard(made);
                    toast({ title: 'Link copied' });
                  }}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy the link
                </SecondaryButton>
              </div>
            </section>
          )}
          <section className={cn(panel, 'overflow-hidden')}>
            <PanelHead title="Links sent" meta={shares.length ? `${shares.length}` : undefined} />
            {sharesLoading ? (
              <LoadingBlocks />
            ) : shares.length === 0 ? (
              <PlainEmpty bare text="No links sent yet." />
            ) : (
              <Rows>
                {shares.map((s) => {
                  const live = !s.revoked_at && new Date(s.expires_at).getTime() > Date.now();
                  return (
                    <Row
                      key={s.id}
                      title={
                        s.recipient ||
                        QUESTIONNAIRES.find((x) => x.id === s.questionnaire)?.label ||
                        'Pack'
                      }
                      detail={`${plural(s.items.length, 'item')} · opened ${s.view_count} ${s.view_count === 1 ? 'time' : 'times'} · ${live ? `until ${ukDate(s.expires_at)}` : s.revoked_at ? 'stopped' : 'expired'}`}
                      trailing={
                        live ? (
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={async () => {
                                await copyToClipboard(shareUrl(s.token));
                                toast({ title: 'Link copied' });
                              }}
                              className="h-11 px-2 text-[12.5px] font-semibold text-elec-yellow touch-manipulation"
                            >
                              Copy
                            </button>
                            <button
                              type="button"
                              onClick={() => revoke(s.id)}
                              className="h-11 px-2 text-[12.5px] font-semibold text-red-400 touch-manipulation"
                            >
                              Stop
                            </button>
                          </div>
                        ) : (
                          <StatusPill>{s.revoked_at ? 'Stopped' : 'Expired'}</StatusPill>
                        )
                      }
                    />
                  );
                })}
              </Rows>
            )}
          </section>
        </div>
      </div>
    </FormSheet>
  );
}
