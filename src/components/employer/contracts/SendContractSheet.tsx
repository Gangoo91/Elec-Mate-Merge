import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Check, Copy, Loader2, Send } from 'lucide-react';
import { FormSheet } from '@/components/forms/FormSheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Field,
  FormCard,
  LoadingBlocks,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  textareaClass,
} from '@/components/employer/editorial';
import { cn } from '@/lib/utils';
import { PlainEmpty } from '@/components/employer/pageParts/PageParts';
import { FireRehireNotice } from '@/components/employer/people/FireRehireNotice';
import { toast } from '@/hooks/use-toast';
import { copyToClipboard } from '@/utils/clipboard';
import {
  useEmploymentContractTemplates,
  type EmploymentContractTemplate,
} from '@/hooks/useContracts';
import { useEmployees } from '@/hooks/useEmployees';
import { useSendPersonContract, type SendPersonContractResult } from '@/hooks/usePersonContracts';

/* ==========================================================================
   SendContractSheet — ELE-1982. People → person → Send contract.

   Pick a template (employment or subcontractor, plus HR letters), the
   person's name, firm, dates and pay go in for you, anything else the
   template asks for is a field here. Send files it on the person and opens
   a signing request: they get the branded email and, if they are on Worker
   Tools, a notification to sign in Sign-offs. Owner/admin only: a contract
   carries pay, so the caller only opens this when canSeeMoney.
   ========================================================================== */

export interface ContractPerson {
  id: string;
  name: string;
  email?: string | null;
  teamRole?: string | null;
  hourlyRate?: number | null;
  annualSalary?: number | null;
  linked?: boolean;
  /** Their start date (join date or the hire offer). The contract start defaults to it. */
  joinDate?: string | null;
  /** Their job title on the roster (e.g. from the hire offer). Fills [Job Title]. */
  jobTitle?: string | null;
}

interface SendContractSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** The person. Leave out to pick someone first (from the Contracts page). */
  person?: ContractPerson | null;
}

/** Filled by the server from the person and the firm — never asked for. */
const AUTO_KEYS = new Set([
  '[Company Name]',
  '[Company Address]',
  '[Employee Name]',
  '[Subcontractor Name]',
  '[Candidate Name]',
  '[Employee First Name]',
  '[Candidate First Name]',
  '[Date]',
  '[Start Date]',
  '[End Date]',
]);

const isPayKey = (k: string) =>
  /rate|salary|pay(?!ment)|allowance|bonus|amount|annual|pilon|% ?\]|fixed price/i.test(k);

const label = (k: string) => k.replace(/^\[|\]$/g, '');

const GROUPS: Array<{ key: EmploymentContractTemplate['category']; title: string }> = [
  { key: 'Employment', title: 'Employment' },
  { key: 'Subcontractor', title: 'Subcontractor' },
  { key: 'HR Letters', title: 'Letters' },
];

const money = (n?: number | null) =>
  n && n > 0
    ? `£${n.toLocaleString('en-GB', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 })}`
    : '';

export function SendContractSheet({
  open,
  onOpenChange,
  person: givenPerson,
}: SendContractSheetProps) {
  const { data: templates = [], isLoading: templatesLoading } = useEmploymentContractTemplates();
  const { data: employees = [] } = useEmployees();
  const send = useSendPersonContract();

  const [pickedId, setPickedId] = useState<string | null>(null);
  const [templateId, setTemplateId] = useState<string | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<SendPersonContractResult | null>(null);

  const person: ContractPerson | null = useMemo(() => {
    if (givenPerson) return givenPerson;
    const e = employees.find((x) => x.id === pickedId);
    return e
      ? {
          id: e.id,
          name: e.name,
          email: e.email,
          teamRole: e.team_role,
          hourlyRate: e.hourly_rate,
          annualSalary: e.annual_salary,
          linked: !!e.user_id,
          // Gap §3C #25: someone picked here starts on their own join date too.
          joinDate: e.join_date,
          jobTitle: e.role,
        }
      : null;
  }, [givenPerson, employees, pickedId]);

  const isSub = person?.teamRole === 'Subcontractor';
  const template = templates.find((t) => t.id === templateId) ?? null;

  // Fresh form each time it opens; default the template to the person's type.
  const givenId = givenPerson?.id ?? null;
  const givenJoin = givenPerson?.joinDate ?? null;
  useEffect(() => {
    if (!open) return;
    setResult(null);
    setMessage('');
    // ELE-2091: the start date they were hired with, not today.
    setStartDate(givenJoin || new Date().toISOString().slice(0, 10));
    setEndDate('');
    if (!givenId) setPickedId(null);
  }, [open, givenId, givenJoin]);

  // A fresh template choice per person, so a subcontractor never gets the
  // employment contract picked for the last employee (ELE-2091).
  const personId = person?.id ?? null;
  const pickedJoin = givenId ? null : (person?.joinDate ?? null);
  useEffect(() => {
    setTemplateId(null);
  }, [personId]);

  // Picked on the Contracts page: their join date, not today.
  useEffect(() => {
    if (!open || givenId || !personId) return;
    setStartDate(pickedJoin || new Date().toISOString().slice(0, 10));
  }, [open, givenId, personId, pickedJoin]);

  useEffect(() => {
    if (!open || templates.length === 0) return;
    const wanted = isSub ? 'Subcontractor' : 'Employment';
    setTemplateId(
      (cur) => cur ?? templates.find((t) => t.category === wanted)?.id ?? templates[0].id
    );
  }, [open, templates, isSub, personId]);

  useEffect(() => {
    setEmail(person?.email ?? '');
  }, [person?.id, person?.email]);

  // Prefill what we already know about pay when the template asks for it.
  useEffect(() => {
    if (!template) return;
    const pre: Record<string, string> = {};
    const ph = template.placeholders ?? [];
    if (ph.includes('[Hourly Rate]') && person?.hourlyRate)
      pre['[Hourly Rate]'] = money(person.hourlyRate);
    if (person?.annualSalary) {
      for (const k of ['[Salary]', '[Annual Salary]'])
        if (ph.includes(k)) pre[k] = money(person.annualSalary);
    }
    if (ph.includes('[Job Title]') && person?.teamRole && person.teamRole !== 'Subcontractor') {
      pre['[Job Title]'] =
        person.jobTitle?.trim() ||
        (person.teamRole === 'Operative' ? 'Electrician' : person.teamRole);
    }
    setValues(pre);
  }, [
    template,
    person?.id,
    person?.hourlyRate,
    person?.annualSalary,
    person?.teamRole,
    person?.jobTitle,
  ]);

  const asks = (template?.placeholders ?? []).filter((k) => !AUTO_KEYS.has(k));
  const payKeys = asks.filter(isPayKey);
  const otherKeys = asks.filter((k) => !isPayKey(k));
  const wantsStart = template?.placeholders?.includes('[Start Date]') ?? true;
  const wantsEnd = template?.placeholders?.includes('[End Date]') ?? false;

  const ready = !!person && !!template && !send.isPending;

  const handleSend = async () => {
    if (!person || !template) return;
    try {
      const r = await send.mutateAsync({
        employeeId: person.id,
        templateId: template.id,
        values,
        startDate: wantsStart ? startDate : undefined,
        endDate: wantsEnd ? endDate || undefined : undefined,
        signerEmail: email,
        message,
      });
      setResult(r);
      if (r.emailError) {
        toast({
          title: 'Contract ready, email not sent',
          description: r.emailError,
          variant: 'destructive',
        });
      }
    } catch (e) {
      toast({
        title: 'Contract not sent',
        description: e instanceof Error ? e.message : 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  const signingLink = result ? `${window.location.origin}/sign/${result.accessToken}` : '';
  const first = person?.name.split(' ')[0] || 'They';

  const field = (k: string) => (
    <Field key={k} label={label(k)}>
      <Input
        value={values[k] ?? ''}
        onChange={(e) => setValues((v) => ({ ...v, [k]: e.target.value }))}
        className={inputClass}
        placeholder={isPayKey(k) ? 'e.g. £18.50' : undefined}
      />
    </Field>
  );

  let body: ReactNode;
  if (result) {
    body = (
      <div className="mx-auto max-w-xl space-y-5 py-4 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15">
          <Check className="h-7 w-7 text-emerald-400" />
        </span>
        <div>
          <p className="text-[20px] font-semibold text-white">Sent to {person?.name}</p>
          <p className="mt-2 text-[13.5px] leading-relaxed text-white">
            {[
              result.emailed ? `${first} has an email with a link to read and sign.` : null,
              result.workerLinked ? 'It is also waiting in Worker Tools, Sign-offs.' : null,
              !result.emailed && !result.workerLinked
                ? `${first} has no email or Worker Tools yet. Copy the link and send it by text or WhatsApp.`
                : null,
            ]
              .filter(Boolean)
              .join(' ')}{' '}
            Its status shows on their record, and you countersign once they have signed.
          </p>
        </div>
        <SecondaryButton
          className="mx-auto"
          onClick={async () => {
            try {
              await copyToClipboard(signingLink);
              toast({ title: 'Link copied' });
            } catch {
              toast({ title: 'Copy failed', variant: 'destructive' });
            }
          }}
        >
          <Copy className="mr-2 h-4 w-4" /> Copy signing link
        </SecondaryButton>
      </div>
    );
  } else if (templatesLoading) {
    body = <LoadingBlocks />;
  } else if (templates.length === 0) {
    body = <PlainEmpty text="Contract templates could not be loaded. Try again shortly." />;
  } else {
    body = (
      <div className="grid gap-5 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-8">
        {/* Left on desktop: who and which template */}
        <div className="space-y-5">
          {!givenPerson && (
            <FormCard eyebrow="Who is it for">
              {employees.length === 0 ? (
                <p className="text-[13px] text-white">Add someone to your team first.</p>
              ) : (
                <div className="grid max-h-[260px] gap-2 overflow-y-auto pr-1">
                  {employees
                    .filter((e) => (e.status || 'active') !== 'archived')
                    .map((e) => (
                      <button
                        key={e.id}
                        type="button"
                        onClick={() => setPickedId(e.id)}
                        className={cn(
                          'flex min-h-[48px] items-center justify-between gap-3 rounded-xl border px-3 text-left text-[13.5px] touch-manipulation',
                          pickedId === e.id
                            ? 'border-elec-yellow bg-white/[0.06] font-semibold text-white'
                            : 'border-white/[0.1] bg-white/[0.04] text-white'
                        )}
                      >
                        <span className="truncate">{e.name}</span>
                        <span className="shrink-0 text-[12px] text-white">{e.team_role}</span>
                      </button>
                    ))}
                </div>
              )}
            </FormCard>
          )}

          <FormCard eyebrow="Template">
            <div className="space-y-4">
              {GROUPS.map((g) => {
                const list = templates.filter((t) => t.category === g.key);
                if (list.length === 0) return null;
                return (
                  <div key={g.key} className="space-y-2">
                    <p className="text-[12px] font-medium text-white">{g.title}</p>
                    <div className="grid gap-2">
                      {list.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setTemplateId(t.id)}
                          aria-pressed={templateId === t.id}
                          className={cn(
                            'flex min-h-[48px] items-center gap-3 rounded-xl border px-3 py-2 text-left touch-manipulation',
                            templateId === t.id
                              ? 'border-elec-yellow bg-white/[0.06]'
                              : 'border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.07]'
                          )}
                        >
                          <span
                            aria-hidden
                            className={cn(
                              'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2',
                              templateId === t.id
                                ? 'border-elec-yellow bg-elec-yellow'
                                : 'border-white/30'
                            )}
                          >
                            {templateId === t.id && <Check className="h-3 w-3 text-black" />}
                          </span>
                          <span className="min-w-0">
                            <span className="block text-[13.5px] font-semibold text-white">
                              {t.name}
                            </span>
                            {t.summary && (
                              <span className="mt-0.5 line-clamp-2 text-[12px] leading-snug text-white">
                                {t.summary}
                              </span>
                            )}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </FormCard>
        </div>

        {/* Right on desktop: the details that go into it */}
        <div className="min-w-0 space-y-5">
          {/* ELE-2075: advisory only, on a change to contracted terms */}
          {template && /variation/i.test(template.name) && <FireRehireNotice />}
          <FormCard eyebrow="Details">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name on the contract">
                <Input
                  value={person?.name ?? ''}
                  readOnly
                  className={inputClass}
                  placeholder="Pick a person"
                />
              </Field>
              <Field
                label="Email for the signing link"
                hint={person?.linked ? 'They also get it in Worker Tools.' : undefined}
              >
                <Input
                  type="email"
                  inputMode="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  placeholder="name@example.com"
                />
              </Field>
              {wantsStart && (
                <Field label="Start date">
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className={inputClass}
                  />
                </Field>
              )}
              {wantsEnd && (
                <Field label="End date">
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className={inputClass}
                  />
                </Field>
              )}
            </div>
          </FormCard>

          {payKeys.length > 0 && (
            <FormCard eyebrow="Pay">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{payKeys.map(field)}</div>
            </FormCard>
          )}

          {otherKeys.length > 0 && (
            <FormCard eyebrow="The rest of the contract">
              <p className="text-[12.5px] leading-relaxed text-white">
                Fill what you know. Anything left blank prints as a line to complete by hand.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{otherKeys.map(field)}</div>
            </FormCard>
          )}

          <Field label="Message (optional)">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, 1000))}
              rows={3}
              className={textareaClass}
              placeholder="Welcome aboard. Have a read and sign when you are ready."
            />
          </Field>
        </div>
      </div>
    );
  }

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      title={result ? 'Contract sent' : person ? `Contract for ${person.name}` : 'Send a contract'}
      description={
        result
          ? undefined
          : 'Pick a template. Name, firm, dates and pay go in for you. They sign on their phone and keep a copy.'
      }
      footer={
        result ? (
          <div className="flex justify-end gap-2">
            <PrimaryButton
              className="h-12 flex-1 rounded-xl text-[15px] sm:min-w-[160px] sm:flex-none"
              onClick={() => onOpenChange(false)}
            >
              Done
            </PrimaryButton>
          </div>
        ) : (
          <div className="flex gap-2">
            <SecondaryButton
              className="h-12 flex-1 rounded-xl sm:min-w-[120px] sm:flex-none"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </SecondaryButton>
            <PrimaryButton
              className="h-12 flex-1 rounded-xl text-[15px] sm:min-w-[200px] sm:flex-none"
              disabled={!ready}
              onClick={handleSend}
            >
              {send.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              Send for signature
            </PrimaryButton>
          </div>
        )
      }
    >
      {body}
    </FormSheet>
  );
}
