import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  inputCn,
  labelCn,
} from '@/components/forms/fieldStyles';
import { useToast } from '@/hooks/use-toast';
import {
  useCollegeEmployers,
  useEmployerTokens,
  type CollegeEmployer,
} from '@/hooks/useCollegeEmployers';

/* ==========================================================================
   EmployerLinkSheet — manage the employer record for a given employer_id
   and issue/revoke magic-link tokens for the public /employer-view page.

   Three states:
   1. No employer record exists at this UUID → registration form
   2. Employer exists, no tokens → "Generate link" CTA
   3. Employer exists with tokens → list, copy, revoke, generate new
   ========================================================================== */

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** UUID stored on college_students.employer_id (pre-existing groups) */
  employerId: string;
  /** Best-guess label from the section (may just be "Employer abc12345") */
  presumedLabel?: string;
  /** Apprentice count rendered in the section for context */
  apprenticeCount?: number;
}

function publicUrl(token: string): string {
  if (typeof window === 'undefined') return `/employer-view/${token}`;
  return `${window.location.origin}/employer-view/${token}`;
}

export function EmployerLinkSheet({
  open,
  onOpenChange,
  employerId,
  presumedLabel,
  apprenticeCount,
}: Props) {
  const { toast } = useToast();
  const { employers, create, update } = useCollegeEmployers();

  const employer = useMemo(
    () => employers.find((e) => e.id === employerId) ?? null,
    [employers, employerId]
  );

  return !employer ? (
    <RegisterForm
      open={open}
      onOpenChange={onOpenChange}
      employerId={employerId}
      presumedLabel={presumedLabel}
      apprenticeCount={apprenticeCount}
      onCreate={async (input) => {
        try {
          await create({ ...input, id: employerId });
          toast({ title: 'Employer registered' });
        } catch (e) {
          toast({
            title: 'Could not register',
            description: (e as Error).message,
            variant: 'destructive',
          });
        }
      }}
      onClose={() => onOpenChange(false)}
    />
  ) : (
    <ManageView
      open={open}
      onOpenChange={onOpenChange}
      employer={employer}
      apprenticeCount={apprenticeCount}
      onUpdate={async (patch) => {
        try {
          await update(employer.id, patch);
          toast({ title: 'Saved' });
        } catch (e) {
          toast({
            title: 'Could not save',
            description: (e as Error).message,
            variant: 'destructive',
          });
        }
      }}
      onClose={() => onOpenChange(false)}
    />
  );
}

interface SheetState {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function RegisterForm({
  open,
  onOpenChange,
  employerId,
  presumedLabel,
  apprenticeCount,
  onCreate,
  onClose,
}: {
  employerId: string;
  presumedLabel?: string;
  apprenticeCount?: number;
  onCreate: (input: {
    company_name: string;
    contact_name?: string;
    contact_email?: string;
    contact_phone?: string;
  }) => Promise<void>;
  onClose: () => void;
} & SheetState) {
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!companyName.trim()) return;
    setSaving(true);
    try {
      await onCreate({
        company_name: companyName,
        contact_name: contactName,
        contact_email: contactEmail,
        contact_phone: contactPhone,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <FormSheet
      width="wide"
      open={open}
      onOpenChange={onOpenChange}
      eyebrow="Register employer"
      title={presumedLabel ?? `Employer ${employerId.slice(0, 8)}`}
      description={
        apprenticeCount
          ? `${apprenticeCount} apprentice${apprenticeCount === 1 ? ' is' : 's are'} placed here but the employer has no name yet. Add the company and a contact so you can share a read-only dashboard with them.`
          : 'Add the company name and a contact so you can share a read-only dashboard with them.'
      }
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button type="button" onClick={onClose} disabled={saving} className={buttonSecondaryCn}>
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || !companyName.trim()}
            className={buttonPrimaryCn}
          >
            {saving ? 'Saving…' : 'Register employer'}
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
        <Field
          id="el-company"
          label="Company name"
          value={companyName}
          onChange={setCompanyName}
          placeholder="e.g. Bright Spark Electrical Ltd"
          required
        />
        <Field
          id="el-contact"
          label="Main contact"
          value={contactName}
          onChange={setContactName}
          placeholder="e.g. Sarah Murphy"
        />
        <Field
          id="el-email"
          label="Contact email"
          value={contactEmail}
          onChange={setContactEmail}
          placeholder="sarah@brightspark.co.uk"
          type="email"
        />
        <Field
          id="el-phone"
          label="Contact phone"
          value={contactPhone}
          onChange={setContactPhone}
          placeholder="07… or 020…"
          type="tel"
        />
      </div>
    </FormSheet>
  );
}

function ManageView({
  open,
  onOpenChange,
  employer,
  apprenticeCount,
  onUpdate,
  onClose,
}: {
  employer: CollegeEmployer;
  apprenticeCount?: number;
  onUpdate: (patch: Partial<CollegeEmployer>) => Promise<void>;
  onClose: () => void;
} & SheetState) {
  const { toast } = useToast();
  const { tokens, loading, issue, revoke } = useEmployerTokens(employer.id);

  const activeTokens = tokens.filter(
    (t) => !t.revoked_at && new Date(t.expires_at).getTime() > Date.now()
  );

  const handleIssue = async () => {
    try {
      const t = await issue(365);
      if (t) {
        try {
          await navigator.clipboard?.writeText(publicUrl(t.token));
          toast({ title: 'Link generated', description: 'Copied to clipboard.' });
        } catch {
          toast({ title: 'Link generated' });
        }
      }
    } catch (e) {
      toast({
        title: 'Could not generate link',
        description: (e as Error).message,
        variant: 'destructive',
      });
    }
  };

  const handleCopy = async (token: string) => {
    try {
      await navigator.clipboard?.writeText(publicUrl(token));
      toast({ title: 'Link copied' });
    } catch {
      toast({ title: 'Copy failed — link shown below' });
    }
  };

  const handleRevoke = async (id: string) => {
    try {
      await revoke(id);
      toast({ title: 'Link revoked' });
    } catch (e) {
      toast({
        title: 'Could not revoke',
        description: (e as Error).message,
        variant: 'destructive',
      });
    }
  };

  const hasContact = !!(employer.contact_name || employer.contact_email || employer.contact_phone);

  return (
    <FormSheet
      width="wide"
      bodyClassName="grid items-start gap-x-10 gap-y-6 lg:grid-cols-[20rem_minmax(0,1fr)]"
      open={open}
      onOpenChange={onOpenChange}
      eyebrow="Employer · Share dashboard"
      title={employer.company_name}
      description={
        apprenticeCount
          ? `${apprenticeCount} apprentice${apprenticeCount === 1 ? '' : 's'} placed. Issue a read-only link the employer can open without signing in.`
          : 'Issue a read-only link the employer can open without signing in.'
      }
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button type="button" onClick={onClose} className={buttonSecondaryCn}>
            Close
          </button>
          <button type="button" onClick={handleIssue} className={buttonPrimaryCn}>
            New share link
          </button>
        </div>
      }
    >
      <section>
        <h3 className="text-[15px] font-semibold tracking-tight text-white">Contact</h3>
        {hasContact ? (
          <dl className="mt-2 divide-y divide-white/[0.08] border-y border-white/[0.08]">
            <ContactRow label="Name" value={employer.contact_name} />
            <ContactRow label="Email" value={employer.contact_email} />
            <ContactRow label="Phone" value={employer.contact_phone} />
          </dl>
        ) : (
          <p className="mt-2 text-[13.5px] text-white">No contact recorded.</p>
        )}
      </section>

      <section>
        <div className="flex items-end justify-between gap-3">
          <h3 className="text-[15px] font-semibold tracking-tight text-white">Share links</h3>
          <span className="text-[12.5px] tabular-nums text-white">
            {activeTokens.length} active · {tokens.length - activeTokens.length} expired or revoked
          </span>
        </div>

        {loading && <p className="mt-3 text-[13.5px] text-white">Loading links…</p>}
        {!loading && tokens.length === 0 && (
          <p className="mt-3 border-t border-white/[0.08] pt-4 text-[13.5px] leading-relaxed text-white">
            No links issued yet. Tap New share link to make one that works for a year. It is copied
            for you to paste into an email.
          </p>
        )}

        {tokens.length > 0 && (
          <ul className="mt-2 divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {tokens.map((t) => {
              const url = publicUrl(t.token);
              const revoked = !!t.revoked_at;
              const expired = new Date(t.expires_at).getTime() < Date.now();
              const inactive = revoked || expired;
              return (
                <li key={t.id} className="py-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-[13px] text-white">
                      {revoked ? (
                        <span className="font-semibold text-red-300">Revoked</span>
                      ) : expired ? (
                        <span className="font-semibold text-orange-300">Expired</span>
                      ) : (
                        <span className="font-semibold text-emerald-400">Active</span>
                      )}
                      {' · '}
                      {expired ? 'expired' : 'expires'}{' '}
                      {new Date(t.expires_at).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                      {' · '}opened {t.use_count} {t.use_count === 1 ? 'time' : 'times'}
                    </p>
                    {!inactive && (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleCopy(t.token)}
                          className="h-11 rounded-xl px-3 text-[13px] font-semibold text-elec-yellow touch-manipulation hover:bg-white/[0.06]"
                          aria-label="Copy link"
                        >
                          Copy link
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRevoke(t.id)}
                          className="h-11 rounded-xl px-3 text-[13px] font-semibold text-red-300 touch-manipulation hover:bg-red-500/10"
                          aria-label="Revoke link"
                        >
                          Revoke
                        </button>
                      </div>
                    )}
                  </div>
                  <code
                    className={cn(
                      'mt-1 block break-all font-mono text-[12px] text-white',
                      inactive && 'line-through decoration-white/40'
                    )}
                  >
                    {url}
                  </code>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </FormSheet>
  );
}

function ContactRow({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div className="flex items-baseline justify-between gap-3 py-2.5">
      <dt className="shrink-0 text-[13px] text-white">{label}</dt>
      <dd className="truncate text-[13.5px] font-medium text-white">{value}</dd>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'tel';
  required?: boolean;
}) {
  return (
    <div>
      <label className={labelCn} htmlFor={id}>
        {label}
        {required && <span className="ml-1 text-elec-yellow">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={inputCn}
      />
    </div>
  );
}
