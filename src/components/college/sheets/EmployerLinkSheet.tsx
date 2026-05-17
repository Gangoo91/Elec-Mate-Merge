import { useEffect, useMemo, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Check, Copy, Link as LinkIcon, Trash2, Briefcase, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  SheetShell,
  PrimaryButton,
  SecondaryButton,
} from '@/components/college/primitives';
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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[88vh] sm:max-w-2xl sm:mx-auto p-0 rounded-t-2xl overflow-hidden border-white/10"
      >
        {!employer ? (
          <RegisterForm
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
        )}
      </SheetContent>
    </Sheet>
  );
}

function RegisterForm({
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
}) {
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
    <SheetShell
      eyebrow="Register employer"
      title={presumedLabel ?? `Employer ${employerId.slice(0, 8)}`}
      description={
        apprenticeCount
          ? `Currently shows as a UUID with ${apprenticeCount} apprentice${apprenticeCount === 1 ? '' : 's'} placed. Add the company name and a contact so you can share a read-only dashboard with them.`
          : 'Add the company name and a contact so you can share a read-only dashboard.'
      }
      footer={
        <>
          <SecondaryButton onClick={onClose} disabled={saving} fullWidth>
            Cancel
          </SecondaryButton>
          <PrimaryButton
            onClick={handleSave}
            disabled={saving || !companyName.trim()}
            fullWidth
          >
            <Check className="h-3.5 w-3.5 mr-1.5" strokeWidth={3} />
            {saving ? 'Saving…' : 'Register employer'}
          </PrimaryButton>
        </>
      }
    >
      <Field
        label="Company name"
        value={companyName}
        onChange={setCompanyName}
        placeholder="e.g. Bright Spark Electrical Ltd"
        required
      />
      <Field
        label="Primary contact"
        value={contactName}
        onChange={setContactName}
        placeholder="e.g. Sarah Murphy"
      />
      <Field
        label="Contact email"
        value={contactEmail}
        onChange={setContactEmail}
        placeholder="sarah@brightspark.co.uk"
        type="email"
      />
      <Field
        label="Contact phone"
        value={contactPhone}
        onChange={setContactPhone}
        placeholder="07… or 020…"
        type="tel"
      />
    </SheetShell>
  );
}

function ManageView({
  employer,
  apprenticeCount,
  onUpdate,
  onClose,
}: {
  employer: CollegeEmployer;
  apprenticeCount?: number;
  onUpdate: (patch: Partial<CollegeEmployer>) => Promise<void>;
  onClose: () => void;
}) {
  const { toast } = useToast();
  const { tokens, loading, issue, revoke } = useEmployerTokens(employer.id);

  const activeTokens = tokens.filter((t) => !t.revoked_at && new Date(t.expires_at).getTime() > Date.now());

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

  return (
    <SheetShell
      eyebrow="Employer · Share dashboard"
      title={employer.company_name}
      description={
        apprenticeCount
          ? `${apprenticeCount} apprentice${apprenticeCount === 1 ? '' : 's'} placed. Issue a read-only link the employer can open without signing in.`
          : 'Issue a read-only link the employer can open without signing in.'
      }
      footer={
        <>
          <SecondaryButton onClick={onClose} fullWidth>
            Close
          </SecondaryButton>
          <PrimaryButton onClick={handleIssue} fullWidth>
            <Plus className="h-3.5 w-3.5 mr-1.5" strokeWidth={3} />
            New share link
          </PrimaryButton>
        </>
      }
    >
      {/* Contact card */}
      <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-5 py-4">
        <div className="flex items-center gap-2 mb-2">
          <Briefcase className="h-3.5 w-3.5 text-elec-yellow" />
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Contact
          </span>
        </div>
        <ContactRow label="Name" value={employer.contact_name} />
        <ContactRow label="Email" value={employer.contact_email} />
        <ContactRow label="Phone" value={employer.contact_phone} />
      </div>

      {/* Active tokens */}
      <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-5 py-4">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <LinkIcon className="h-3.5 w-3.5 text-elec-yellow" />
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Share links
            </span>
          </div>
          <span className="text-[10.5px] text-white/55 tabular-nums">
            {activeTokens.length} active · {tokens.length - activeTokens.length} expired/revoked
          </span>
        </div>

        {loading && <div className="text-[12px] text-white/55">Loading…</div>}
        {!loading && tokens.length === 0 && (
          <div className="rounded-lg border border-dashed border-white/[0.10] px-4 py-6 text-center text-[12px] text-white/45">
            No links issued yet. Tap "New share link" to mint one valid for a year.
          </div>
        )}

        {tokens.length > 0 && (
          <ul className="space-y-2">
            {tokens.map((t) => {
              const url = publicUrl(t.token);
              const revoked = !!t.revoked_at;
              const expired = new Date(t.expires_at).getTime() < Date.now();
              const inactive = revoked || expired;
              return (
                <li
                  key={t.id}
                  className={cn(
                    'rounded-lg border px-3 py-2.5',
                    inactive
                      ? 'border-white/[0.06] bg-white/[0.02] opacity-60'
                      : 'border-white/[0.08] bg-[hsl(0_0%_10%)]'
                  )}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                    <span className="text-[10.5px] uppercase tracking-[0.14em] text-white/55">
                      Expires {new Date(t.expires_at).toLocaleDateString('en-GB')} ·{' '}
                      Used {t.use_count}×
                      {revoked && <span className="ml-1 text-red-300">· Revoked</span>}
                      {!revoked && expired && (
                        <span className="ml-1 text-white/55">· Expired</span>
                      )}
                    </span>
                    {!inactive && (
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleCopy(t.token)}
                          className="inline-flex items-center gap-1 h-7 px-2 rounded-md bg-white/[0.06] hover:bg-white/[0.10] text-[11px] text-white touch-manipulation"
                          aria-label="Copy link"
                        >
                          <Copy className="h-3 w-3" /> Copy
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRevoke(t.id)}
                          className="inline-flex items-center gap-1 h-7 px-2 rounded-md bg-red-500/[0.10] hover:bg-red-500/[0.20] text-[11px] text-red-200 touch-manipulation"
                          aria-label="Revoke link"
                        >
                          <Trash2 className="h-3 w-3" /> Revoke
                        </button>
                      </div>
                    )}
                  </div>
                  <code className="block text-[10.5px] font-mono text-white/75 break-all">
                    {url}
                  </code>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </SheetShell>
  );
}

function ContactRow({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div className="flex items-baseline gap-3 py-1">
      <span className="text-[10.5px] uppercase tracking-[0.14em] text-white/45 w-16 shrink-0">
        {label}
      </span>
      <span className="text-[12.5px] text-white truncate">{value}</span>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'tel';
  required?: boolean;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
        {label}
        {required && <span className="ml-1 text-elec-yellow">*</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-11 px-3 rounded-lg bg-[hsl(0_0%_12%)] border border-white/[0.08] text-[14px] text-white placeholder:text-white/40 focus:border-elec-yellow/40 focus:ring-1 focus:ring-elec-yellow/20 outline-none touch-manipulation"
      />
    </label>
  );
}
