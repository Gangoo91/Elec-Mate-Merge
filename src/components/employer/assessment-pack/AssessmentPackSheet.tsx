/**
 * Scheme assessment pack (ELE-2069), opened from Compliance. Pick the scheme
 * and the period; the readiness list shows the real gaps in our records with
 * a link to fix each; then download the pack PDF, or the PDF with a zip of
 * the source documents.
 */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FileDown, Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { getActingEmployerId } from '@/lib/actingEmployer';
import { saveOrShareFile } from '@/utils/save-or-share-file';
import { openExternalUrl } from '@/utils/open-external-url';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  Field,
  FormGrid,
  PrimaryButton,
  SecondaryButton,
  LoadingBlocks,
  inputClass,
} from '@/components/employer/editorial';
import {
  panel,
  PanelHead,
  PanelTitle,
  Row,
  RowList,
  PlainEmpty,
  KeyValue,
  StatusPill,
  plural,
} from '@/components/employer/pageParts/PageParts';
import type { AssessmentPackData, PackDocument } from './types';
import { fetchFirmCredentials } from '@/hooks/useFirmCredentials';
import { settingsDocuments } from '@/components/employer/compliance/credentials';
import { SCHEMES, getScheme, schemeFor, type SchemeId } from './schemes';
import { findGaps } from './readiness';
import { suggestSample } from './sample';

const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const yearAgo = () => {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 1);
  d.setDate(d.getDate() + 1);
  return iso(d);
};

const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';

export function useAssessmentPack(from: string, to: string, enabled: boolean) {
  return useQuery({
    queryKey: ['assessment-pack', from, to],
    enabled: enabled && !!from && !!to && from <= to,
    staleTime: 60 * 1000,
    queryFn: async (): Promise<AssessmentPackData & { firmId: string }> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not signed in');
      const firmId = (await getActingEmployerId(user.id)) ?? user.id;
      const { data, error } = await supabase.rpc(
        'get_assessment_pack' as never,
        { p_firm: firmId, p_from: from, p_to: to } as never
      );
      if (error) throw new Error(error.message);
      const pack = data as unknown as AssessmentPackData;
      // Gap #10: one source. The Settings record (public liability, scheme)
      // joins the register; rows that only hold its certificate drop out.
      const creds = await fetchFirmCredentials(firmId).catch(() => []);
      const certIds = new Set(
        creds.filter((c) => c.source === 'settings' && c.document_id).map((c) => c.document_id)
      );
      const settings: PackDocument[] = settingsDocuments(creds, firmId).map((d) => ({
        id: d.id,
        title: d.title,
        category: d.category ?? null,
        document_type: d.document_type ?? null,
        expiry_date: d.expiry_date ?? null,
        file_url: d.file_url ?? null,
        insurance_kind: d.insurance_kind ?? null,
        insurer: d.insurer ?? null,
        policy_number: d.policy_number ?? null,
        cover_amount: d.cover_amount ?? null,
        status: d.status,
        source: 'settings',
        file_id: d.certificate_id ?? null,
        accreditation: d.accreditation ?? null,
        cover_text: d.cover_text ?? null,
      }));
      return {
        ...pack,
        documents: [...settings, ...(pack.documents ?? []).filter((d) => !certIds.has(d.id))],
        firmId,
      };
    },
  });
}

export function AssessmentPackSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const navigate = useNavigate();
  const today = iso(new Date());
  const [from, setFrom] = useState(yearAgo());
  const [to, setTo] = useState(today);
  const [schemeId, setSchemeId] = useState<SchemeId | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const { data, isLoading, isError, refetch } = useAssessmentPack(from, to, open);

  useEffect(() => {
    if (data && !schemeId) setSchemeId(schemeFor(data.firm?.registration_scheme));
  }, [data, schemeId]);

  const scheme = getScheme(schemeId ?? 'niceic');
  const gaps = useMemo(() => (data ? findGaps(data, today, scheme) : []), [data, today, scheme]);
  const { sample, poolSize } = useMemo(
    () => (data ? suggestSample(data.certificates, scheme, to) : { sample: [], poolSize: 0 }),
    [data, scheme, to]
  );
  const red = gaps.filter((g) => g.tone === 'red').length;

  const build = async (withZip: boolean) => {
    if (!data || busy) return;
    setBusy('Building the PDF');
    try {
      const [{ buildPackPdf }, brandRow] = await Promise.all([
        import('./buildPackPdf'),
        supabase
          .from('company_profiles')
          .select('accent_color, primary_color')
          .eq('user_id', data.firmId)
          .maybeSingle(),
      ]);
      const pdf = buildPackPdf({
        data,
        scheme,
        sample,
        gaps,
        brand: brandRow.data as { accent_color?: string | null; primary_color?: string | null },
      });
      const name = `${scheme.id}-assessment-pack-${to}.pdf`;
      if (!withZip) {
        await saveOrShareFile(pdf.output('blob'), name);
      } else {
        const { buildPackZip } = await import('./buildPackZip');
        const blob = await buildPackZip({
          data,
          pdf,
          pdfName: name,
          sample,
          gaps,
          onProgress: setBusy,
        });
        await saveOrShareFile(blob, `${scheme.id}-assessment-pack-${to}.zip`);
      }
      toast({ title: withZip ? 'Pack and documents downloaded' : 'Pack downloaded' });
    } catch (e) {
      toast({
        title: 'Could not build the pack',
        description: e instanceof Error ? e.message : 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setBusy(null);
    }
  };

  const go = (route: string) => {
    if (!route) return;
    onOpenChange(false);
    navigate(route);
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Compliance"
      title="Assessment pack"
      description={
        isLoading
          ? 'Reading your records.'
          : isError
            ? 'Your records could not be read.'
            : gaps.length
              ? `${plural(gaps.length, 'thing')} to put right before the visit${red ? `, ${red} an assessor would raise` : ''}.`
              : `Ready for your ${scheme.name} visit. Nothing found to put right.`
      }
      footer={
        <div className="flex gap-3">
          <SecondaryButton
            onClick={() => build(false)}
            disabled={!data || !!busy}
            className="flex-1 sm:flex-none"
          >
            <FileDown className="mr-2 h-4 w-4" />
            PDF
          </SecondaryButton>
          <PrimaryButton onClick={() => build(true)} disabled={!data || !!busy} className="flex-1">
            <Package className="mr-2 h-4 w-4" />
            {busy ?? 'Pack and documents (zip)'}
          </PrimaryButton>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start">
        <div className="space-y-6 min-w-0">
          <div className="space-y-4">
            <Field label="Scheme">
              <div className="flex flex-wrap gap-2">
                {SCHEMES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSchemeId(s.id)}
                    className={cn(
                      'h-11 rounded-full border px-4 text-[13px] touch-manipulation',
                      scheme.id === s.id ? chipOn : chipOff
                    )}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </Field>
            <FormGrid cols={2}>
              <Field label="Work from">
                <input
                  type="date"
                  value={from}
                  max={to}
                  onChange={(e) => setFrom(e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="To">
                <input
                  type="date"
                  value={to}
                  min={from}
                  max={today}
                  onChange={(e) => setTo(e.target.value)}
                  className={inputClass}
                />
              </Field>
            </FormGrid>
          </div>

          <section data-help="assessment.readiness">
            <PanelTitle
              title="Before the visit"
              meta={data ? (gaps.length ? `${gaps.length}` : 'Nothing to fix') : undefined}
            />
            {isLoading ? (
              <LoadingBlocks />
            ) : isError ? (
              <PlainEmpty
                text="We could not read your records."
                action="Try again"
                onAction={() => refetch()}
              />
            ) : gaps.length === 0 ? (
              <PlainEmpty text="Nothing in your records needs putting right for this period." />
            ) : (
              <RowList>
                {gaps.map((g) => (
                  <Row
                    key={g.key}
                    onClick={g.route ? () => go(g.route) : undefined}
                    title={<span className="block whitespace-normal line-clamp-2">{g.text}</span>}
                    detail={g.area}
                    trailing={
                      <StatusPill tone={g.tone === 'red' ? 'red' : 'volt'}>
                        {g.tone === 'red' ? 'Likely raised' : 'To tidy'}
                      </StatusPill>
                    }
                  />
                ))}
              </RowList>
            )}
          </section>
        </div>

        <div className="space-y-6 min-w-0">
          {data && (
            <section className={cn(panel, 'overflow-hidden')}>
              <PanelHead title="In the pack" />
              <div className="divide-y divide-white/[0.07]">
                <KeyValue label="Certificates issued" value={data.certificates.length} />
                <KeyValue label="Suggested sample" value={`${sample.length} of ${poolSize}`} />
                <KeyValue label="QS reviews" value={data.qs_reviews.length} />
                <KeyValue label="Test instruments" value={data.instruments.length} />
                <KeyValue label="People and their qualifications" value={data.team.length} />
                <KeyValue label="Complaints" value={data.complaints.length} />
                <KeyValue label="Insurance and documents" value={data.documents.length} />
                <KeyValue label="Policies" value={data.policies.length} />
                <KeyValue
                  label="Part P notifications made"
                  value={data.certificates.filter((c) => c.part_p?.status === 'submitted').length}
                />
              </div>
            </section>
          )}
          <section className={cn(panel, 'overflow-hidden')}>
            <PanelHead title={`What ${scheme.name} looks at`} />
            <div className="space-y-3 px-4 py-3 text-[13.5px] leading-snug text-white sm:px-5">
              <p>{scheme.sampling}</p>
              {scheme.note && <p>{scheme.note}</p>}
              <ul className="space-y-2">
                {scheme.requirements.map((r) => (
                  <li key={`${r.section}-${r.source}`}>
                    <span className="font-semibold">{r.section}.</span> {r.text}{' '}
                    <span className="text-[12px]">({r.source})</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-white/[0.07]">
              {scheme.sources.map((s) => (
                <button
                  key={s.url}
                  type="button"
                  onClick={() => openExternalUrl(s.url)}
                  className="flex min-h-[44px] w-full items-center px-4 text-left text-[13px] font-medium text-elec-yellow touch-manipulation sm:px-5"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </FormSheet>
  );
}
