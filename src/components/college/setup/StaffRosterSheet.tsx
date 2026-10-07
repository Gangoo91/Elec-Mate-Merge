import { useEffect, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { FormSheet } from '@/components/forms/FormSheet';
import { buttonPrimaryCn, buttonSecondaryCn, labelCn, textareaCn } from '@/components/forms/fieldStyles';
import { chipCn } from '@/components/college/ui/CollegeUi';
import { cn } from '@/lib/utils';
import { TempLoginsPanel } from '@/components/college/setup/TempLoginsPanel';
import {
  OUTCOME_LABEL,
  OUTCOME_TONE,
  openEmailPreview,
  previewRosterEmail,
  runRoster,
  type RosterItem,
  type RosterResult,
  type RosterRowIn,
} from '@/lib/collegeRoster';

/* ==========================================================================
   StaffRosterSheet — add a college's staff in one go (ELE-1900, "same for
   staff"; ELE-1855 step "Add your staff").

   Paste "name, email, role" lines (role optional, the default below is
   used). The college-roster-import function makes a login for anyone new,
   links it to the staff list (which turns on their College Hub and free app
   access), or, for someone who already has an Elec-Mate account, adds them
   to the staff list and emails a staff join link. Dry run first, itemised
   result after, safe to run twice. Admin / head of department only (the
   function enforces it).

   `collegeId` is only for a platform admin acting on a college from
   Admin → Colleges; college staff never pass it.
   ========================================================================== */

const ROLES = [
  { value: 'tutor', label: 'Tutor' },
  { value: 'assessor', label: 'Assessor' },
  { value: 'iqa', label: 'IQA' },
  { value: 'head_of_department', label: 'Head of Department' },
  { value: 'admin', label: 'Admin' },
  { value: 'support', label: 'Support' },
] as const;

const ROLE_WORDS: Record<string, string> = {
  tutor: 'tutor',
  lecturer: 'tutor',
  teacher: 'tutor',
  assessor: 'assessor',
  iqa: 'iqa',
  'internal quality assurer': 'iqa',
  hod: 'head_of_department',
  head: 'head_of_department',
  'head of department': 'head_of_department',
  head_of_department: 'head_of_department',
  admin: 'admin',
  administrator: 'admin',
  support: 'support',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Parsed {
  index: number;
  name: string;
  email: string;
  role: string;
  error?: string;
  /** Did not stop the row (an unknown role word). */
  note?: string;
}

/** "jane smith" or "JANE SMITH" → "Jane Smith"; a name typed with its own capitals is left alone. */
function tidyName(name: string): string {
  const n = name.replace(/\s+/g, ' ').trim();
  if (!n || (n !== n.toLowerCase() && n !== n.toUpperCase())) return n;
  return n.toLowerCase().replace(/(^|[\s'-])([a-z])/g, (_m, p: string, c: string) => p + c.toUpperCase());
}

function parse(text: string, defaultRole: string): Parsed[] {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  const out: Parsed[] = [];
  lines.forEach((line, i) => {
    const cells = (line.includes('\t') ? line.split('\t') : line.split(/[,;]/)).map((c) => c.trim());
    if (i === 0 && cells.some((c) => /^(name|full name|first name|forename|surname|last name|e-?mail|email address|role)$/i.test(c)))
      return; // header row
    // "Jane Smith <jane@x>" works too.
    const angle = line.match(/^(.*)<([^>]+)>\s*(.*)$/);
    let name = '';
    let email = '';
    let role = '';
    if (angle) {
      name = angle[1].replace(/[,;\t]/g, ' ').trim();
      email = angle[2].trim();
      role = angle[3].replace(/^[,;\t\s]+/, '').trim();
    } else {
      // First name and surname in separate columns are joined; a cell that
      // is a role word is the role wherever it sits.
      const emailIdx = cells.findIndex((c) => c.includes('@'));
      email = emailIdx >= 0 ? cells[emailIdx] : '';
      const rest = cells.filter((c, k) => k !== emailIdx && c);
      const roleIdx = rest.findIndex((c) => ROLE_WORDS[c.toLowerCase()]);
      role = roleIdx >= 0 ? rest[roleIdx] : emailIdx >= 0 ? (cells.slice(emailIdx + 1).find(Boolean) ?? '') : '';
      name = rest
        .filter((c, k) => k !== roleIdx && c !== role && (emailIdx < 0 || cells.indexOf(c) < emailIdx))
        .join(' ');
    }
    const mapped = ROLE_WORDS[role.toLowerCase()] ?? (role ? '' : defaultRole);
    const p: Parsed = {
      index: out.length,
      name: tidyName(name),
      email: email.replace(/\s+/g, '').toLowerCase(),
      role: mapped || defaultRole,
    };
    if (!email) p.error = 'Missing email';
    else if (!EMAIL_RE.test(p.email)) p.error = 'Invalid email';
    else if (!name) p.error = 'Missing name';
    else if (role && !mapped) p.note = `Role "${role}" not recognised, added as ${roleLabel(p.role)}`;
    out.push(p);
  });
  return out;
}

const roleLabel = (r: string) => ROLES.find((x) => x.value === r)?.label ?? r;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Platform admin acting from Admin → Colleges. */
  collegeId?: string;
  /** Pre-filled lines, e.g. the first admin from the create-college sheet. */
  initialText?: string;
  onDone?: (result: RosterResult) => void;
}

export function StaffRosterSheet({ open, onOpenChange, collegeId, initialText, onDone }: Props) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [text, setText] = useState('');
  const [defaultRole, setDefaultRole] = useState('tutor');
  const [sendEmail, setSendEmail] = useState(true);
  const [plan, setPlan] = useState<RosterResult | null>(null);
  const [planError, setPlanError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<RosterResult | null>(null);

  useEffect(() => {
    if (open) {
      setText(initialText ?? '');
      setDefaultRole('tutor');
      setSendEmail(true);
      setPlan(null);
      setPlanError(null);
      setResult(null);
    }
  }, [open, initialText]);

  const rows = useMemo(() => parse(text, defaultRole), [text, defaultRole]);
  const payload: RosterRowIn[] = useMemo(
    () => rows.filter((r) => !r.error).map((r) => ({ index: r.index, name: r.name, email: r.email, role: r.role })),
    [rows]
  );
  const key = JSON.stringify(payload);

  useEffect(() => {
    if (!open || result) return;
    if (payload.length === 0) {
      setPlan(null);
      setPlanError(null);
      return;
    }
    let cancelled = false;
    setChecking(true);
    const t = window.setTimeout(() => {
      runRoster({ kind: 'staff', rows: payload, college_id: collegeId ?? null, dry_run: true })
        .then((p) => !cancelled && (setPlan(p), setPlanError(null)))
        .catch((e: Error) => !cancelled && (setPlan(null), setPlanError(e.message)))
        .finally(() => !cancelled && setChecking(false));
    }, 600);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, open, result, collegeId]);

  const planBy = useMemo(() => new Map((plan?.items ?? []).map((i) => [i.index, i])), [plan]);
  const toAdd = plan ? plan.summary.created + plan.summary.matched : payload.length;

  const submit = async () => {
    if (running || payload.length === 0) return;
    setRunning(true);
    try {
      const res = await runRoster({ kind: 'staff', rows: payload, college_id: collegeId ?? null, send_email: sendEmail });
      const local: RosterItem[] = rows
        .filter((r) => r.error)
        .map((r) => ({ index: r.index, name: r.name, email: r.email, outcome: 'skipped' as const, detail: r.error }));
      const items = [...res.items, ...local].sort((a, b) => a.index - b.index);
      const full = { ...res, items, summary: { ...res.summary, total: items.length, skipped: res.summary.skipped + local.length } };
      setResult(full);
      void queryClient.invalidateQueries({ queryKey: ['college-staff'] });
      onDone?.(full);
    } catch (e) {
      toast({ title: 'Nothing was saved', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setRunning(false);
    }
  };

  const preview = async () => {
    try {
      const p = await previewRosterEmail({
        kind: 'staff',
        rows: payload.length ? payload.slice(0, 1) : [{ index: 0, name: 'Sam Taylor', email: 'sam.taylor@example.ac.uk', role: defaultRole }],
        college_id: collegeId ?? null,
      });
      openEmailPreview(p.html);
    } catch (e) {
      toast({ title: 'Could not show the email', description: (e as Error).message, variant: 'destructive' });
    }
  };

  if (result) {
    const s = result.summary;
    return (
      <FormSheet
        open={open}
        onOpenChange={onOpenChange}
        width="wide"
        eyebrow="Add staff"
        title={`${s.created + s.matched} added, ${s.already} already on`}
        description={
          result.sent_email === false
            ? 'Nobody was emailed. Hand out the new logins below; give anyone who already had an account their staff join code.'
            : 'New staff have their login and are linked. Staff who already had an Elec-Mate account are linked when they open their join link.'
        }
        footer={
          <button type="button" onClick={() => onOpenChange(false)} className={cn(buttonPrimaryCn, 'w-full')}>
            Done
          </button>
        }
      >
        <div className="space-y-6">
          <TempLoginsPanel items={result.items} kind="staff" />
          <ResultList items={result.items} />
        </div>
      </FormSheet>
    );
  }

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]"
      eyebrow="Add staff"
      title="Your team in one go"
      description="One person per line: name, email and role. Each gets a College Hub login (or a link to join, if they already use Elec-Mate)."
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button type="button" onClick={() => onOpenChange(false)} disabled={running} className={buttonSecondaryCn}>
            Cancel
          </button>
          <button
            type="button"
            onClick={() => void submit()}
            disabled={running || payload.length === 0 || !!planError}
            className={buttonPrimaryCn}
          >
            {running
              ? 'Adding…'
              : payload.length === 0
                ? 'Add some people'
                : `Add ${toAdd} ${toAdd === 1 ? 'person' : 'people'}${sendEmail ? ' and email' : ''}`}
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        <div>
          <label htmlFor="staff-paste" className={labelCn}>
            Name, email, role
          </label>
          <textarea
            id="staff-paste"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={7}
            spellCheck={false}
            placeholder={'Sam Taylor, sam.taylor@college.ac.uk, Tutor\nPriya Shah, p.shah@college.ac.uk, Assessor'}
            className={cn(textareaCn, 'min-h-[170px] font-mono text-[13px] leading-relaxed md:text-[13px]')}
          />
          <p className="mt-1.5 text-[12px] leading-relaxed text-white">
            Roles: Tutor, Assessor, IQA, Head of Department, Admin, Support. A line without a role uses the default.
          </p>
        </div>
        <div>
          <span className={labelCn}>Default role</span>
          <div className="mt-1 flex flex-wrap gap-2">
            {ROLES.map((r) => (
              <button key={r.value} type="button" onClick={() => setDefaultRole(r.value)} className={cn(chipCn(defaultRole === r.value), 'h-11')}>
                {r.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <span className={labelCn}>Tell them</span>
          <div className="mt-1 flex flex-wrap gap-2">
            <button type="button" onClick={() => setSendEmail(true)} className={cn(chipCn(sendEmail), 'h-11')}>
              Email each person
            </button>
            <button type="button" onClick={() => setSendEmail(false)} className={cn(chipCn(!sendEmail), 'h-11')}>
              Don't email
            </button>
          </div>
          {!sendEmail && (
            <p className="mt-2 text-[12.5px] leading-relaxed text-white">
              Logins are still made and linked. After you add them, you see each new login (email and temporary
              password) to hand out.
            </p>
          )}
          <button
            type="button"
            onClick={() => void preview()}
            className="mt-1 inline-flex h-11 items-center px-1 text-[13px] font-semibold text-elec-yellow touch-manipulation"
          >
            See the email they get
          </button>
        </div>
      </div>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[15px] font-semibold tracking-tight text-white">Check before you add</h3>
          {rows.length > 0 && <span className="text-[12px] text-white">{checking ? 'Checking…' : `${rows.length} people`}</span>}
        </div>
        {planError && (
          <p className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-3 py-2.5 text-[12.5px] text-orange-300">{planError}</p>
        )}
        {rows.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/[0.14] px-5 py-10 text-center">
            <p className="text-[14px] font-semibold text-white">Nobody added yet</p>
            <p className="mx-auto mt-1 max-w-sm text-[13px] leading-relaxed text-white">
              Each person is checked first: bad emails, people already on your staff list, and people who belong to
              another college. Nothing is saved until you press Add.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-white/[0.06] overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025]">
            {rows.map((r) => {
              const p = planBy.get(r.index);
              const blocked = !!r.error || p?.outcome === 'skipped';
              return (
                <li key={r.index} className="flex items-start gap-3 px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[14px] font-medium text-white">
                      {r.name || 'No name'} <span className="font-normal">· {roleLabel(r.role)}</span>
                    </div>
                    <div className="truncate text-[12px] text-white">{r.email || 'No email'}</div>
                    {(r.error || p?.detail) && (
                      <div className={cn('mt-1 text-[12.5px] leading-snug', blocked ? 'text-orange-300' : 'text-white')}>
                        {r.error ?? p?.detail}
                      </div>
                    )}
                    {r.note && !r.error && <div className="mt-0.5 text-[12.5px] text-orange-300">{r.note}</div>}
                    {p?.notes?.map((n) => (
                      <div key={n} className="mt-0.5 text-[12.5px] text-orange-300">
                        {n}
                      </div>
                    ))}
                  </div>
                  <span className={cn('shrink-0 pt-0.5 text-[12.5px] font-semibold', blocked ? 'text-orange-300' : p ? OUTCOME_TONE[p.outcome] : 'text-white')}>
                    {blocked ? "Won't go in" : p ? OUTCOME_LABEL[p.outcome] : 'Checking'}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </FormSheet>
  );
}

export function ResultList({ items }: { items: RosterItem[] }) {
  return (
    <ul className="divide-y divide-white/[0.06] overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025]">
      {items.map((it) => (
        <li key={it.index} className="flex items-start gap-3 px-4 py-3">
          <div className="min-w-0 flex-1">
            <div className="truncate text-[14px] font-medium text-white">{it.name || 'No name'}</div>
            <div className="truncate text-[12px] text-white">
              {it.email}
              {it.join_code ? ` · join code ${it.join_code}` : ''}
            </div>
            {it.detail && <div className="mt-1 text-[12.5px] leading-snug text-white">{it.detail}</div>}
            {it.emailed === true && <div className="mt-0.5 text-[12px] text-emerald-300">Emailed</div>}
            {it.emailed === false && (
              <div className="mt-0.5 text-[12px] text-orange-300">Email not sent{it.email_error ? `: ${it.email_error}` : ''}</div>
            )}
          </div>
          <span className={cn('shrink-0 pt-0.5 text-[12.5px] font-semibold', OUTCOME_TONE[it.outcome])}>{OUTCOME_LABEL[it.outcome]}</span>
        </li>
      ))}
    </ul>
  );
}
