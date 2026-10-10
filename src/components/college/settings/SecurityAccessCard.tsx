/* ==========================================================================
   SecurityAccessCard: College settings, "Security and access".

   - Staff two-step sign-in (ELE-1915): require it for every staff member.
     The server refuses to switch it on unless the admin is signed in with two
     steps right now, so nobody is locked out by a college that cannot use it.
   - Elec-Mate support view-as (ELE-1966): the college's consent. Off by
     default. Turning it off ends any open session at once.
   - Sign in with Microsoft (ELE-1971): the college's email domains. A domain
     links only people already on the staff list or learner roster.
   Everyone on staff sees the state; only the admin or head of department can
   change it. Every change is written to the college's activity log.
   ========================================================================== */

import { useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useMyCollegeContext } from '@/hooks/useMyCollegeContext';
import { useCollegeSecurity } from '@/components/college/security/useCollegeSecurity';
import { MfaScreen } from '@/components/college/security/StaffMfaGate';
import { useMicrosoftSignInEnabled } from '@/components/auth/MicrosoftSignInButton';
import { PEOPLE_LIST, StatusChip } from '@/components/college/people/peopleKit';
import { COLLEGE_BTN, COLLEGE_BTN_PRIMARY } from '@/components/college/ui/CollegeUi';
import { inputCn, labelCn } from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';

const ROW = 'flex min-h-[64px] items-center gap-4 px-5 py-4 sm:px-6';

export function SecurityAccessCard() {
  const { profile } = useAuth();
  const { toast } = useToast();
  const { staff } = useMyCollegeContext();
  const collegeId = (profile?.college_id as string | null) ?? staff?.college_id ?? null;
  const role = staff?.role ?? (profile?.college_role as string | null) ?? null;
  const canChange = role === 'admin' || role === 'head_of_department';
  const sec = useCollegeSecurity(collegeId);
  const msEnabled = useMicrosoftSignInEnabled();

  const [aal, setAal] = useState<string | null>(null);
  const [factorId, setFactorId] = useState<string | null>(null);
  const [showSetup, setShowSetup] = useState(false);
  const [domain, setDomain] = useState('');
  const [tenant, setTenant] = useState('');
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      const [{ data: level }, { data: factors }] = await Promise.all([
        supabase.auth.mfa.getAuthenticatorAssuranceLevel(),
        supabase.auth.mfa.listFactors(),
      ]);
      setAal(level?.currentLevel ?? null);
      setFactorId(factors?.totp?.find((f) => f.status === 'verified')?.id ?? null);
    })();
  }, [showSetup]);

  const run = async (key: string, fn: () => Promise<void>, ok: string) => {
    setBusy(key);
    try {
      await fn();
      toast({ title: ok });
    } catch (e) {
      toast({
        title: 'Not changed',
        description: e instanceof Error ? e.message : String(e),
        variant: 'destructive',
      });
    } finally {
      setBusy(null);
    }
  };

  const s = sec.data;
  if (!collegeId) return null;

  return (
    <div className="space-y-3" data-testid="security-access-card">
      <div className={PEOPLE_LIST}>
        {/* Staff two-step sign-in */}
        <div className="px-5 py-4 sm:px-6">
          <div className="flex items-center gap-4">
            <div className="min-w-0 flex-1">
              <label htmlFor="require-staff-mfa" className="text-[14.5px] font-semibold text-white">
                Require two-step sign-in for staff
              </label>
              <p className="mt-0.5 text-[12.5px] leading-relaxed text-white">
                Staff sign in with their password and a code from an authenticator app before they
                can open the hub or any learner record. Learners are not affected.
              </p>
            </div>
            <Switch
              id="require-staff-mfa"
              checked={!!s?.requireStaffMfa}
              disabled={
                !canChange || !s || busy === 'mfa' || (!s.platformTotpEnabled && !s.requireStaffMfa)
              }
              onCheckedChange={(v) =>
                void run(
                  'mfa',
                  () => sec.setRequireStaffMfa(v),
                  v
                    ? 'Two-step sign-in is now required for staff'
                    : 'Two-step sign-in is now optional'
                )
              }
              aria-label="Require two-step sign-in for staff"
              className="relative touch-manipulation after:absolute after:-inset-x-2 after:-inset-y-2.5 after:content-['']"
            />
          </div>
          {s && !s.platformTotpEnabled && (
            <p className="mt-3 text-[12.5px] leading-relaxed text-white">
              Available as soon as Elec-Mate switches on two-step sign-in for everyone.
            </p>
          )}
          {canChange && s?.platformTotpEnabled && !s.requireStaffMfa && aal !== 'aal2' && (
            <div className="mt-3 space-y-3">
              <p className="text-[12.5px] leading-relaxed text-white">
                To switch this on, first sign in with two steps yourself, so you know it works for
                your college.
              </p>
              {showSetup ? (
                <div className="rounded-2xl border border-white/[0.10] p-4">
                  <MfaScreen
                    embedded
                    collegeName={null}
                    factorId={factorId}
                    collegeRequires={false}
                    onDone={() => {
                      setShowSetup(false);
                      setAal('aal2');
                    }}
                  />
                </div>
              ) : (
                <button type="button" onClick={() => setShowSetup(true)} className={COLLEGE_BTN}>
                  {factorId ? 'Enter my code' : 'Set up two-step sign-in for me'}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Safeguarding leads: on by default (DfE cyber standard: MFA on staff cloud accounts) */}
        <div className={ROW}>
          <div className="min-w-0 flex-1">
            <label htmlFor="require-dsl-mfa" className="text-[14.5px] font-semibold text-white">
              Always require it for safeguarding leads
            </label>
            <p className="mt-0.5 text-[12.5px] leading-relaxed text-white">
              Your designated and deputy safeguarding leads read the most sensitive records, so they
              sign in with two steps even when the rest of the staff do not. On by default.
              {s && !s.platformTotpEnabled
                ? ' Starts as soon as Elec-Mate switches on two-step sign-in for everyone.'
                : ''}
            </p>
          </div>
          <Switch
            id="require-dsl-mfa"
            checked={s ? s.requireSafeguardingMfa : true}
            disabled={!canChange || !s || busy === 'dsl'}
            onCheckedChange={(v) =>
              void run(
                'dsl',
                () => sec.setRequireSafeguardingMfa(v),
                v
                  ? 'Safeguarding leads must use two-step sign-in'
                  : 'Safeguarding leads follow the staff setting'
              )
            }
            aria-label="Always require two-step sign-in for safeguarding leads"
            className="relative touch-manipulation after:absolute after:-inset-x-2 after:-inset-y-2.5 after:content-['']"
          />
        </div>

        {/* Support view-as consent */}
        <div className={ROW}>
          <div className="min-w-0 flex-1">
            <label htmlFor="support-view-as" className="text-[14.5px] font-semibold text-white">
              Let Elec-Mate support see the hub as a staff member
            </label>
            <p className="mt-0.5 text-[12.5px] leading-relaxed text-white">
              When a member of staff asks for help, support can see their screens exactly as they
              do, read only, for up to an hour. Each time is logged here with the reason. Off until
              you turn it on; turning it off ends any session straight away.
            </p>
          </div>
          <Switch
            id="support-view-as"
            checked={!!s?.supportViewAs}
            disabled={!canChange || !s || busy === 'support'}
            onCheckedChange={(v) =>
              void run(
                'support',
                () => sec.setSupportViewAs(v),
                v ? 'Support can now view as a staff member' : 'Support access withdrawn'
              )
            }
            aria-label="Let Elec-Mate support see the hub as a staff member"
            className="relative touch-manipulation after:absolute after:-inset-x-2 after:-inset-y-2.5 after:content-['']"
          />
        </div>

        {/* Microsoft sign-in domains */}
        <div className="space-y-3 px-5 py-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[14.5px] font-semibold text-white">Sign in with Microsoft</h3>
            <StatusChip tone={msEnabled ? 'done' : 'neutral'}>
              {msEnabled ? 'Available' : 'Coming soon'}
            </StatusChip>
          </div>
          <p className="text-[12.5px] leading-relaxed text-white">
            Add your college&rsquo;s email domains. Staff and learners then sign in with their
            college Microsoft account. It only links people already on your staff list or learner
            roster with that exact email; it never gives anyone a role on its own. Apprentices can
            keep their own email sign-in so their record stays theirs when they leave.
          </p>
          {(s?.domains ?? []).length > 0 && (
            <ul className="divide-y divide-white/[0.06] rounded-xl border border-white/[0.10]">
              {s!.domains.map((d) => (
                <li key={d.id} className="flex min-h-[52px] items-center gap-3 px-4 py-2">
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[13.5px] text-white">{d.domain}</p>
                    <p className="text-[12px] text-white">
                      {d.azure_tenant_id
                        ? 'Your Microsoft organisation only'
                        : 'Any Microsoft organisation'}
                    </p>
                  </div>
                  {canChange && (
                    <button
                      type="button"
                      disabled={busy === d.id}
                      onClick={() =>
                        void run(d.id, () => sec.removeDomain(d.id), `${d.domain} removed`)
                      }
                      className={cn(COLLEGE_BTN, 'px-3')}
                    >
                      Remove
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
          {canChange && (
            <form
              className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end"
              onSubmit={(e) => {
                e.preventDefault();
                const dmn = domain.trim();
                if (!dmn) return;
                void run(
                  'domain',
                  async () => {
                    await sec.addDomain(dmn, tenant.trim() || null);
                    setDomain('');
                    setTenant('');
                  },
                  `${dmn} added`
                );
              }}
            >
              <div>
                <label htmlFor="sso-domain" className={labelCn}>
                  Email domain
                </label>
                <input
                  id="sso-domain"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="northgate.ac.uk"
                  autoCapitalize="none"
                  className={inputCn}
                />
              </div>
              <div>
                <label htmlFor="sso-tenant" className={labelCn}>
                  Microsoft tenant ID (optional, from your IT team)
                </label>
                <input
                  id="sso-tenant"
                  value={tenant}
                  onChange={(e) => setTenant(e.target.value)}
                  placeholder="00000000-0000-0000-0000-000000000000"
                  autoCapitalize="none"
                  className={inputCn}
                />
              </div>
              <button
                type="submit"
                disabled={busy === 'domain' || !domain.trim()}
                className={COLLEGE_BTN_PRIMARY}
              >
                Add domain
              </button>
            </form>
          )}
        </div>
      </div>
      {!canChange && (
        <p className="text-[12.5px] text-white">Only your college admin can change these.</p>
      )}
    </div>
  );
}
