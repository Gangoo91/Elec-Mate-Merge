import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Copy } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  inputCn,
  labelCn,
} from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import {
  CollegeAccessCard,
  ConsoleSummary,
  EndingSoonList,
  MonthlyAccessList,
  loadConsole,
  type ConsoleData,
} from '@/components/college/setup/HubCollegeAccess';

/* ==========================================================================
   HubCollegesSheet — Admin → Colleges → Hub colleges (ELE-1855, ELE-1899).

   The College Hub side of the scheme, for a platform admin:
     - every hub college with its staff and learner counts;
     - the discount codes its cohort join codes carry at sign-up (one per
       plan, from promo_offers). A learner then types ONE code: it enrols
       them and applies the discount. No Stripe object is made here;
     - set-up codes: a one-time code for a college with a signed order, so
       its lead creates the college at /college/setup/<code>;
     - "Create a college now": the same page as a platform admin, no code.
     - Pilot access and the founder pilot console (7 Oct 2026, ELE-1965):
       per college status, days left, people, usage, a nudge draft, and the
       actions start / extend / contract / lapse / open as this college;
       the monthly count of learners with access for invoicing.
   ========================================================================== */

interface HubCollege {
  id: string;
  name: string;
  code: string;
  is_active: boolean;
  staff: number;
  learners: number;
  learners_linked: number;
  apprentice_code: string | null;
  electrician_code: string | null;
}

interface SetupCode {
  code: string;
  org_name: string;
  email: string | null;
  expires_at: string;
  used_at: string | null;
  revoked_at: string | null;
  college_name: string | null;
}

const day = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export function HubCollegesSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [colleges, setColleges] = useState<HubCollege[]>([]);
  const [codes, setCodes] = useState<SetupCode[]>([]);
  const [offerCodes, setOfferCodes] = useState<{ code: string; plan_id: string }[]>([]);
  const [edits, setEdits] = useState<Record<string, { a: string; e: string }>>({});
  const [org, setOrg] = useState('');
  const [email, setEmail] = useState('');
  const [issuing, setIssuing] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [consoleData, setConsoleData] = useState<ConsoleData | null>(null);

  const load = useCallback(async () => {
    const [{ data, error }, { data: offers }, consoleRes] = await Promise.all([
      supabase.rpc('admin_list_hub_colleges' as never),
      supabase.from('promo_offers').select('code, plan_id').eq('is_active', true).order('code'),
      loadConsole().then(
        (d) => ({ d, e: null as string | null }),
        (e: unknown) => ({ d: null, e: e instanceof Error ? e.message : String(e) })
      ),
    ]);
    if (consoleRes.e)
      toast({
        title: 'Could not load pilot figures',
        description: consoleRes.e,
        variant: 'destructive',
      });
    setConsoleData(consoleRes.d);
    if (error) {
      toast({
        title: 'Could not load hub colleges',
        description: error.message,
        variant: 'destructive',
      });
      return;
    }
    const d = data as { colleges: HubCollege[]; setup_codes: SetupCode[] } | null;
    setColleges(d?.colleges ?? []);
    setCodes(d?.setup_codes ?? []);
    setOfferCodes((offers ?? []) as { code: string; plan_id: string }[]);
    setEdits(
      Object.fromEntries(
        (d?.colleges ?? []).map((c) => [
          c.id,
          { a: c.apprentice_code ?? '', e: c.electrician_code ?? '' },
        ])
      )
    );
  }, [toast]);

  useEffect(() => {
    if (open) void load();
  }, [open, load]);

  const saveOffers = async (id: string) => {
    const e = edits[id];
    const { error } = await supabase.rpc(
      'set_college_signup_offers' as never,
      {
        p_college: id,
        p_apprentice_code: e?.a || null,
        p_electrician_code: e?.e || null,
      } as never
    );
    if (error) toast({ title: 'Not saved', description: error.message, variant: 'destructive' });
    else {
      toast({ title: 'Discount codes linked' });
      void load();
    }
  };

  const issue = async () => {
    if (!org.trim() || issuing) return;
    setIssuing(true);
    const { data, error } = await supabase.rpc(
      'issue_college_setup_code' as never,
      {
        p_org_name: org.trim(),
        p_email: email.trim() || null,
        p_days: 14,
      } as never
    );
    setIssuing(false);
    if (error) {
      toast({ title: 'No code issued', description: error.message, variant: 'destructive' });
      return;
    }
    const code = (data as { code: string }).code;
    setOrg('');
    setEmail('');
    await copy(`${window.location.origin}/college/setup/${code}`, code);
    toast({
      title: `Set-up code ${code}`,
      description: 'Link copied. Valid for 14 days, single use.',
    });
    void load();
  };

  const revoke = async (code: string) => {
    const { error } = await supabase.rpc(
      'revoke_college_setup_code' as never,
      { p_code: code } as never
    );
    if (error)
      toast({ title: 'Not withdrawn', description: error.message, variant: 'destructive' });
    else void load();
  };

  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      window.setTimeout(() => setCopied(null), 1600);
    } catch {
      /* clipboard blocked: the code is on screen */
    }
  };

  const apprenticeCodes = offerCodes.filter((o) => o.plan_id === 'apprentice').map((o) => o.code);
  const electricianCodes = offerCodes.filter((o) => o.plan_id === 'electrician').map((o) => o.code);

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]"
      eyebrow="College Hub"
      title="Hub colleges"
      description="Each college's pilot or contract, who it covers, how the pilot is going, the monthly count for invoicing, discount codes and set-up codes."
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button type="button" onClick={() => onOpenChange(false)} className={buttonSecondaryCn}>
            Close
          </button>
          <button
            type="button"
            onClick={() => navigate('/college/setup?new=1')}
            className={buttonPrimaryCn}
          >
            Create a college now
          </button>
        </div>
      }
    >
      <section className="space-y-4">
        {consoleData && <ConsoleSummary data={consoleData} />}
        <h3 className="text-[15px] font-semibold tracking-tight text-white">
          {colleges.length} hub colleges
        </h3>
        <p className="text-[12.5px] leading-relaxed text-white">
          A college with access gives every linked learner (Active or On Break) and its staff the
          full app free, until 14 days after the pilot or contract ends. Counts leave out test and
          fixture accounts.
        </p>
        <datalist id="hub-app-codes">
          {apprenticeCodes.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
        <datalist id="hub-elec-codes">
          {electricianCodes.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
        <ul className="divide-y divide-white/[0.06] overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025]">
          {colleges.map((c) => {
            const e = edits[c.id] ?? { a: '', e: '' };
            const dirty = e.a !== (c.apprentice_code ?? '') || e.e !== (c.electrician_code ?? '');
            const cc = consoleData?.colleges.find((x) => x.id === c.id);
            const codesEditor = (
              <div className="grid gap-3 border-t border-white/[0.06] pt-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
                <div>
                  <label htmlFor={`a-${c.id}`} className={labelCn}>
                    Apprentice discount
                  </label>
                  <input
                    id={`a-${c.id}`}
                    list="hub-app-codes"
                    value={e.a}
                    onChange={(ev) =>
                      setEdits((x) => ({
                        ...x,
                        [c.id]: { ...e, a: ev.target.value.toUpperCase() },
                      }))
                    }
                    placeholder="None"
                    className={cn(inputCn, 'font-mono')}
                  />
                </div>
                <div>
                  <label htmlFor={`e-${c.id}`} className={labelCn}>
                    Electrician discount
                  </label>
                  <input
                    id={`e-${c.id}`}
                    list="hub-elec-codes"
                    value={e.e}
                    onChange={(ev) =>
                      setEdits((x) => ({
                        ...x,
                        [c.id]: { ...e, e: ev.target.value.toUpperCase() },
                      }))
                    }
                    placeholder="None"
                    className={cn(inputCn, 'font-mono')}
                  />
                </div>
                <button
                  type="button"
                  disabled={!dirty}
                  onClick={() => void saveOffers(c.id)}
                  className={buttonSecondaryCn}
                >
                  Save
                </button>
              </div>
            );
            if (cc) {
              return (
                <CollegeAccessCard key={c.id} c={cc} onChanged={() => void load()}>
                  {codesEditor}
                </CollegeAccessCard>
              );
            }
            return (
              <li key={c.id} className="space-y-3 px-4 py-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-[14.5px] font-semibold text-white">
                    {c.name} <span className="font-mono text-[12px] font-normal">{c.code}</span>
                  </p>
                  <p className="text-[12.5px] tabular-nums text-white">
                    {c.staff} staff · {c.learners} learners · {c.learners_linked} linked
                  </p>
                </div>
                {codesEditor}
              </li>
            );
          })}
        </ul>
      </section>

      <div className="space-y-8">
        {consoleData && <EndingSoonList data={consoleData} />}
        {consoleData && <MonthlyAccessList data={consoleData} />}
        <section className="space-y-4">
          <h3 className="text-[15px] font-semibold tracking-tight text-white">
            Set-up code for a new college
          </h3>
          <p className="text-[13px] leading-relaxed text-white">
            For a college with a signed order. Their lead opens the link, makes a staff account and
            creates the college themselves; its 6-week pilot starts straight away. Single use, valid
            14 days.
          </p>
          <div>
            <label htmlFor="sc-org" className={labelCn}>
              College name
            </label>
            <input
              id="sc-org"
              value={org}
              onChange={(e) => setOrg(e.target.value)}
              className={inputCn}
            />
          </div>
          <div>
            <label htmlFor="sc-email" className={labelCn}>
              Lock to their email (optional)
            </label>
            <input
              id="sc-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputCn}
            />
          </div>
          <button
            type="button"
            onClick={() => void issue()}
            disabled={!org.trim() || issuing}
            className={cn(buttonPrimaryCn, 'w-full')}
          >
            {issuing ? 'Issuing…' : 'Issue code and copy link'}
          </button>
          {codes.length > 0 && (
            <ul className="divide-y divide-white/[0.06] overflow-hidden rounded-2xl border border-white/[0.08]">
              {codes.map((c) => {
                const state = c.used_at
                  ? `Used ${day(c.used_at)}${c.college_name ? `: ${c.college_name}` : ''}`
                  : c.revoked_at
                    ? 'Withdrawn'
                    : new Date(c.expires_at) < new Date()
                      ? 'Expired'
                      : `Open until ${day(c.expires_at)}`;
                const live = !c.used_at && !c.revoked_at && new Date(c.expires_at) > new Date();
                return (
                  <li key={c.code} className="flex items-start gap-3 px-4 py-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[13px] font-semibold text-white">{c.code}</p>
                      <p className="text-[12.5px] text-white">
                        {c.org_name}
                        {c.email ? ` · ${c.email}` : ''}
                      </p>
                      <p className={cn('text-[12px]', live ? 'text-emerald-300' : 'text-white')}>
                        {state}
                      </p>
                    </div>
                    {live && (
                      <div className="flex shrink-0 gap-1">
                        <button
                          type="button"
                          aria-label="Copy link"
                          onClick={() =>
                            void copy(`${window.location.origin}/college/setup/${c.code}`, c.code)
                          }
                          className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-white touch-manipulation hover:text-elec-yellow"
                        >
                          {copied === c.code ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => void revoke(c.code)}
                          className="inline-flex h-11 items-center px-2 text-[12.5px] font-semibold text-white touch-manipulation hover:text-red-300"
                        >
                          Withdraw
                        </button>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </FormSheet>
  );
}
