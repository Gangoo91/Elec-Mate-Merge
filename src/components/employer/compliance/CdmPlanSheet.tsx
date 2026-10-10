/**
 * Construction phase plan for a job (ELE-2076), from Compliance. Choose the
 * job; the plan pulls the job, crew, RAMS and inductions (job pack sign-offs)
 * and asks for what only the firm knows: services, asbestos, welfare,
 * emergency. The F10 check runs as the figures are typed. Saved per job in
 * employer_cdm_plans so the PDF can be rebuilt after a change.
 */
import { useEffect, useMemo, useState } from 'react';
import { FileDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { getActingEmployerId } from '@/lib/actingEmployer';
import { useJobs } from '@/hooks/useJobs';
import { saveOrShareFile } from '@/utils/save-or-share-file';
import { openExternalUrl } from '@/utils/open-external-url';
import { FormSheet } from '@/components/forms/FormSheet';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import {
  Field,
  FormGrid,
  PrimaryButton,
  SecondaryButton,
  LoadingBlocks,
  inputClass,
  textareaClass,
} from '@/components/employer/editorial';
import { panel, PanelHead, PlainEmpty } from '@/components/employer/pageParts/PageParts';
import {
  EMPTY_DETAILS,
  F10_URL,
  ROLE_LABEL,
  f10Check,
  ramsHazards,
  type CdmDetails,
  type FirmRole,
} from './cdm';

const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';
const chip = 'min-h-11 rounded-full border px-4 py-2 text-[13px] text-left touch-manipulation';

type Crew = { employee_id: string; name: string; role: string | null; phone: string | null };

interface Loaded {
  firm: string;
  planId: string | null;
  crew: Crew[];
  rams: { title: string; status: string | null; hazards: string[] }[];
  inducted: { name: string; at: string }[];
}

const num = (s: string) => (s.trim() === '' ? null : Math.max(0, Math.round(Number(s))));

export function CdmPlanSheet({
  open,
  onOpenChange,
  presetJobId,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  presetJobId?: string | null;
}) {
  const { data: jobs = [] } = useJobs();
  const [jobId, setJobId] = useState(presetJobId ?? '');
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState<Loaded | null>(null);
  const [role, setRole] = useState<FirmRole>('only_contractor');
  const [domestic, setDomestic] = useState(true);
  const [days, setDays] = useState('');
  const [workers, setWorkers] = useState('');
  const [personDays, setPersonDays] = useState('');
  const [details, setDetails] = useState<CdmDetails>(EMPTY_DETAILS);
  const [busy, setBusy] = useState(false);

  const job = jobs.find((j) => j.id === jobId);
  const jobOptions = useMemo(
    () =>
      jobs
        .filter((j) => !j.archived_at && !j.is_template)
        .map((j) => ({
          value: j.id,
          label: j.title || 'Untitled job',
          description: [j.client, j.location].filter(Boolean).join(' · '),
        })),
    [jobs]
  );

  useEffect(() => {
    if (open && presetJobId) setJobId(presetJobId);
  }, [open, presetJobId]);

  // Load the plan, crew, RAMS and inductions for the chosen job.
  useEffect(() => {
    if (!open || !jobId) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) throw new Error('Not signed in');
        const firm = (await getActingEmployerId(user.id)) ?? user.id;
        const [planRes, crewRes, ramsRes, packsRes] = await Promise.all([
          supabase
            .from('employer_cdm_plans' as never)
            .select('*')
            .eq('job_id' as never, jobId as never)
            .maybeSingle(),
          supabase
            .from('employer_job_assignments')
            .select(
              'employee_id, role_on_job, status, employee:employer_employees(name, role, phone)'
            )
            .eq('job_id', jobId),
          supabase
            .from('rams_documents')
            .select('project_name, status, risks')
            .eq('employer_job_id', jobId),
          supabase
            .from('employer_job_packs')
            .select('id, employer_job_pack_acknowledgements(employee_id, acknowledged_at)')
            .eq('job_id', jobId),
        ]);
        if (cancelled) return;
        const crew: Crew[] = (
          (crewRes.data ?? []) as unknown as {
            employee_id: string;
            role_on_job: string | null;
            status: string | null;
            employee: { name: string; role: string | null; phone: string | null } | null;
          }[]
        )
          .filter((a) => !['cancelled', 'removed'].includes((a.status ?? '').toLowerCase()))
          .map((a) => ({
            employee_id: a.employee_id,
            name: a.employee?.name ?? 'Team member',
            role: a.role_on_job || a.employee?.role || null,
            phone: a.employee?.phone ?? null,
          }));
        const byId = new Map(crew.map((c) => [c.employee_id, c.name]));
        const inducted = (
          (packsRes.data ?? []) as unknown as {
            employer_job_pack_acknowledgements: { employee_id: string; acknowledged_at: string }[];
          }[]
        )
          .flatMap((p) => p.employer_job_pack_acknowledgements ?? [])
          .filter((a) => byId.has(a.employee_id))
          .map((a) => ({ name: byId.get(a.employee_id)!, at: a.acknowledged_at }));
        const rams = (
          (ramsRes.data ?? []) as {
            project_name: string | null;
            status: string | null;
            risks: unknown;
          }[]
        ).map((r) => ({
          title: r.project_name || 'RAMS',
          status: r.status,
          hazards: ramsHazards(r.risks),
        }));
        const plan = planRes.data as unknown as {
          id: string;
          firm_role: FirmRole;
          domestic_client: boolean;
          working_days: number | null;
          peak_workers: number | null;
          person_days: number | null;
          details: Partial<CdmDetails>;
        } | null;
        setLoaded({ firm, planId: plan?.id ?? null, crew, rams, inducted });
        setRole(plan?.firm_role ?? 'only_contractor');
        setDomestic(plan?.domestic_client ?? true);
        const j = jobs.find((x) => x.id === jobId);
        const autoDays =
          j?.start_date && j?.end_date
            ? Math.max(
                1,
                Math.round(
                  (new Date(j.end_date).getTime() - new Date(j.start_date).getTime()) / 86400000
                ) + 1
              )
            : null;
        setDays(
          plan?.working_days != null ? String(plan.working_days) : autoDays ? String(autoDays) : ''
        );
        setWorkers(
          plan?.peak_workers != null
            ? String(plan.peak_workers)
            : crew.length
              ? String(crew.length)
              : ''
        );
        setPersonDays(
          plan?.person_days != null
            ? String(plan.person_days)
            : autoDays && crew.length
              ? String(autoDays * crew.length)
              : ''
        );
        setDetails({
          ...EMPTY_DETAILS,
          scope: j?.description ?? '',
          ...(plan?.details ?? {}),
        });
      } catch (e) {
        toast({
          title: 'Could not load the job',
          description: e instanceof Error ? e.message : 'Please try again.',
          variant: 'destructive',
        });
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [open, jobId, jobs]);

  const f10 = f10Check({
    workingDays: num(days),
    peakWorkers: num(workers),
    personDays: num(personDays),
    domestic,
    firmRole: role,
  });

  // Until all three figures are in, "not notifiable" would be a guess.
  const f10Pending = !f10.notifiable && (!days || !workers || !personDays);

  const set = (k: keyof CdmDetails, v: string) => setDetails((p) => ({ ...p, [k]: v }));

  const saveAndBuild = async () => {
    if (!job || !loaded || busy) return;
    setBusy(true);
    try {
      const row = {
        employer_id: loaded.firm,
        job_id: job.id,
        firm_role: role,
        domestic_client: domestic,
        working_days: num(days),
        peak_workers: num(workers),
        person_days: num(personDays),
        details,
        generated_at: new Date().toISOString(),
      };
      const { error } = await supabase
        .from('employer_cdm_plans' as never)
        .upsert(row as never, { onConflict: 'job_id' });
      if (error) throw error;
      const [{ generateCdmPlanPdf }, companyRes] = await Promise.all([
        import('./generateCdmPlanPdf'),
        supabase
          .from('company_profiles')
          .select('company_name, company_address, company_phone, accent_color, primary_color')
          .eq('user_id', loaded.firm)
          .maybeSingle(),
      ]);
      const responsible = loaded.crew.find(
        (c) => c.employee_id === details.responsible_employee_id
      );
      const pdf = generateCdmPlanPdf({
        company: companyRes.data as never,
        job: {
          title: job.title,
          client: job.client ?? null,
          location: job.location ?? null,
          start_date: job.start_date ?? null,
          end_date: job.end_date ?? null,
          description: job.description ?? null,
          site_contact_name: (job as { site_contact_name?: string | null }).site_contact_name,
          site_contact_phone: (job as { site_contact_phone?: string | null }).site_contact_phone,
          access_notes: (job as { access_notes?: string | null }).access_notes,
        },
        plan: {
          firm_role: role,
          domestic_client: domestic,
          working_days: num(days),
          peak_workers: num(workers),
          person_days: num(personDays),
          details,
        },
        crew: loaded.crew,
        responsible: responsible ? { name: responsible.name, phone: responsible.phone } : null,
        rams: loaded.rams,
        inducted: loaded.inducted,
      });
      const safe = (job.title || 'job').replace(/[^\w]+/g, '-').slice(0, 40);
      await saveOrShareFile(pdf.output('blob'), `construction-phase-plan-${safe}.pdf`);
      toast({ title: 'Construction phase plan saved' });
    } catch (e) {
      toast({
        title: 'Could not make the plan',
        description: e instanceof Error ? e.message : 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setBusy(false);
    }
  };

  const area = (k: keyof CdmDetails, label: string, placeholder: string, rows = 3) => (
    <Field label={label}>
      <textarea
        value={details[k]}
        onChange={(e) => set(k, e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className={textareaClass}
      />
    </Field>
  );

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Compliance"
      title="Construction phase plan"
      description={
        job
          ? `${job.title}. Every project needs one under CDM 2015; on a single-contractor job you draw it up.`
          : 'Pick the job. Every project needs a plan under CDM 2015.'
      }
      footer={
        <PrimaryButton fullWidth onClick={saveAndBuild} disabled={!job || !loaded || busy}>
          <FileDown className="mr-2 h-4 w-4" />
          {busy ? 'Making the plan' : 'Save and download the plan'}
        </PrimaryButton>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start">
        <div className="min-w-0 space-y-4">
          {!presetJobId && (
            <Field label="Job">
              <MobileSelectPicker
                value={jobId}
                onValueChange={setJobId}
                options={jobOptions}
                placeholder="Choose a job"
                title="Choose a job"
              />
            </Field>
          )}
          {!jobId ? (
            <PlainEmpty text="Choose the job the plan is for." />
          ) : loading || !loaded ? (
            <LoadingBlocks />
          ) : (
            <>
              <Field label="Our role on this job">
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(ROLE_LABEL) as FirmRole[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={cn(chip, role === r ? chipOn : chipOff)}
                    >
                      {ROLE_LABEL[r]}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="Client">
                <div className="flex flex-wrap gap-2">
                  {[
                    { v: true, l: 'Domestic (a homeowner)' },
                    { v: false, l: 'Business or landlord' },
                  ].map((o) => (
                    <button
                      key={String(o.v)}
                      type="button"
                      onClick={() => setDomestic(o.v)}
                      className={cn(chip, domestic === o.v ? chipOn : chipOff)}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
              </Field>
              {area('scope', 'Description of the work', 'What is being done and where', 3)}
              {area(
                'services',
                'Services and isolation points',
                'Where the supply, main switch, gas and water stopcocks are; any overhead or buried services'
              )}
              {area(
                'asbestos',
                'Asbestos',
                'Survey seen? Any known or suspected asbestos, and what you will do if you find it',
                2
              )}
              {area(
                'hazards',
                'Main dangers and how they are controlled',
                'Anything not already in the RAMS: working at height, live working nearby, the public, dust',
                3
              )}
              {area(
                'welfare',
                'Welfare',
                'Toilets, washing, drinking water and somewhere to rest and eat',
                2
              )}
              <FormGrid cols={2}>
                {area('first_aid', 'First aid', 'Who is the first aider, where the kit is', 2)}
                {area('fire', 'Fire', 'Extinguishers, assembly point, hot works', 2)}
              </FormGrid>
              {area(
                'emergency',
                'Emergency',
                'Nearest A&E, how to call for help, what to do in an electrical accident',
                2
              )}
              {area('site_rules', 'Site rules', '', 6)}
              <FormGrid cols={2}>
                {area('induction', 'Induction', '', 3)}
                {area('cooperation', 'Working with others', '', 3)}
              </FormGrid>
              <Field label="Person responsible for running the job safely">
                <MobileSelectPicker
                  value={details.responsible_employee_id || '__none__'}
                  onValueChange={(v) => set('responsible_employee_id', v === '__none__' ? '' : v)}
                  options={[
                    { value: '__none__', label: 'Not chosen' },
                    ...loaded.crew.map((c) => ({ value: c.employee_id, label: c.name })),
                  ]}
                  title="Person responsible"
                />
              </Field>
            </>
          )}
        </div>

        <div className="min-w-0 space-y-6">
          <section className={cn(panel, 'overflow-hidden')}>
            <PanelHead title="Does HSE need an F10?" />
            <div className="space-y-4 px-4 py-3 sm:px-5">
              <div className="grid grid-cols-3 gap-3">
                <Field label="Working days">
                  <input
                    inputMode="numeric"
                    value={days}
                    onChange={(e) => setDays(e.target.value.replace(/\D/g, ''))}
                    placeholder="e.g. 12"
                    className={inputClass}
                  />
                </Field>
                <Field label="Most at once">
                  <input
                    inputMode="numeric"
                    value={workers}
                    onChange={(e) => setWorkers(e.target.value.replace(/\D/g, ''))}
                    placeholder="e.g. 3"
                    className={inputClass}
                  />
                </Field>
                <Field label="Person days">
                  <input
                    inputMode="numeric"
                    value={personDays}
                    onChange={(e) => setPersonDays(e.target.value.replace(/\D/g, ''))}
                    placeholder="e.g. 36"
                    className={inputClass}
                  />
                </Field>
              </div>
              <p
                className={cn(
                  'text-[15px] font-semibold',
                  f10.notifiable ? 'text-elec-yellow' : 'text-white'
                )}
              >
                {f10.notifiable
                  ? 'Notifiable to HSE'
                  : f10Pending
                    ? 'Enter the numbers'
                    : 'Not notifiable'}
              </p>
              {f10Pending ? (
                <p className="text-[13px] leading-snug text-white">
                  Fill in all three figures and we check whether HSE needs an F10.
                </p>
              ) : (
                <>
                  <p className="text-[13px] leading-snug text-white">{f10.reason}</p>
                  <p className="text-[13px] leading-snug text-white">
                    {f10.notifiable
                      ? f10.who
                      : 'No F10 is needed. You still need this plan, and check again if the job grows.'}
                  </p>
                </>
              )}
              <p className="text-[12px] leading-snug text-white">
                CDM 2015 regulation 6: notify if the work lasts more than 30 working days with more
                than 20 people at once, or is more than 500 person days.
              </p>
              {f10.notifiable && (
                <SecondaryButton fullWidth onClick={() => openExternalUrl(F10_URL)}>
                  Open the HSE F10 form
                </SecondaryButton>
              )}
            </div>
          </section>
          {loaded && (
            <section className={cn(panel, 'overflow-hidden')}>
              <PanelHead title="Pulled from the job" />
              <div className="space-y-2 px-4 py-3 text-[13.5px] text-white sm:px-5">
                <p>
                  Crew:{' '}
                  {loaded.crew.length
                    ? loaded.crew.map((c) => c.name).join(', ')
                    : 'nobody assigned yet'}
                  .
                </p>
                <p>
                  RAMS:{' '}
                  {loaded.rams.length
                    ? loaded.rams.map((r) => r.title).join(', ')
                    : 'none linked to the job'}
                  .
                </p>
                <p>
                  Inducted (job pack signed):{' '}
                  {loaded.inducted.length
                    ? loaded.inducted.map((i) => i.name).join(', ')
                    : 'nobody yet'}
                  .
                </p>
              </div>
            </section>
          )}
        </div>
      </div>
    </FormSheet>
  );
}
