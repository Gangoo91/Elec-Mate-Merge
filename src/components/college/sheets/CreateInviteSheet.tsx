import { useEffect, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import {
  SheetShell,
  PrimaryButton,
  SecondaryButton,
  Field,
  FormCard,
  FormGrid,
  inputClass,
  selectTriggerClass,
  selectContentClass,
} from '@/components/college/primitives';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

/* ==========================================================================
   CreateInviteSheet — generate a college invite code.

   There was no invite-creation path anywhere in the app, so the whole
   invite onboarding loop was unusable (no codes to hand out). This lets an
   admin/tutor mint a student or staff code, which a learner then redeems via
   CollegeInviteAccept -> accept_college_invite. Codes are uppercase to match
   the accept screen's uppercasing exactly.
   ========================================================================== */

// No ambiguous characters (0/O, 1/I) so codes are easy to read aloud / type.
const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function generateCode(len = 8): string {
  const bytes = new Uint32Array(len);
  crypto.getRandomValues(bytes);
  let out = '';
  for (let i = 0; i < len; i++) out += CODE_ALPHABET[bytes[i] % CODE_ALPHABET.length];
  return out;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated?: () => void;
}

const STAFF_ROLES = [
  { value: 'tutor', label: 'Tutor' },
  { value: 'head_of_department', label: 'Head of Department' },
  { value: 'support', label: 'Support' },
  { value: 'admin', label: 'Admin' },
];

const EXPIRY_OPTIONS = [
  { value: '0', label: 'No expiry' },
  { value: '7', label: '7 days' },
  { value: '30', label: '30 days' },
  { value: '90', label: '90 days' },
];

export function CreateInviteSheet({ open, onOpenChange, onCreated }: Props) {
  const { toast } = useToast();
  const [inviteType, setInviteType] = useState<'student' | 'staff'>('student');
  const [role, setRole] = useState('tutor');
  const [expiryDays, setExpiryDays] = useState('30');
  const [multiUse, setMultiUse] = useState(true);
  const [code, setCode] = useState(generateCode());
  const [creating, setCreating] = useState(false);
  const [createdCode, setCreatedCode] = useState<string | null>(null);
  const [uid, setUid] = useState<string | null>(null);
  const [collegeId, setCollegeId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [courses, setCourses] = useState<
    { id: string; name: string; code: string | null; level: string | null }[]
  >([]);
  const [courseId, setCourseId] = useState('');

  useEffect(() => {
    if (!open) return;
    setInviteType('student');
    setRole('tutor');
    setExpiryDays('30');
    setMultiUse(true);
    setCode(generateCode());
    setCreatedCode(null);
    setCourseId('');

    let cancelled = false;
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      const id = userData.user?.id ?? null;
      let cId: string | null = null;
      let admin = false;
      if (id) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('college_id, college_role')
          .eq('id', id)
          .maybeSingle();
        cId = (profile?.college_id as string | null) ?? null;
        admin = ['admin', 'head_of_department'].includes(
          (profile?.college_role as string | null) ?? ''
        );
      }
      let courseRows: typeof courses = [];
      if (cId) {
        // Only the college's own active courses that resolve to a qualification.
        const { data: cRows } = await supabase
          .from('college_courses')
          .select('id, name, code, level')
          .eq('college_id', cId)
          .eq('status', 'Active')
          .not('qualification_id', 'is', null)
          .order('name');
        courseRows = (cRows ?? []) as typeof courses;
      }
      if (cancelled) return;
      setUid(id);
      setCollegeId(cId);
      setIsAdmin(admin);
      setCourses(courseRows);
    })();
    return () => {
      cancelled = true;
    };
  }, [open]);

  const handleCreate = async () => {
    if (creating) return;
    setCreating(true);
    try {
      if (!uid) throw new Error('Not signed in.');
      if (!collegeId) throw new Error('Your account is not linked to a college.');
      // Defence in depth — RLS also blocks this, but don't even attempt it.
      if (inviteType === 'staff' && !isAdmin) {
        throw new Error('Only an admin can create staff invites.');
      }
      if (inviteType === 'student' && !courseId) {
        throw new Error('Choose the course this code enrols learners onto.');
      }

      const expires =
        expiryDays === '0'
          ? null
          : new Date(Date.now() + Number(expiryDays) * 86400_000).toISOString();

      // A student code is multi-use by default (a whole cohort redeems it);
      // a staff code is single-use unless multi-use is ticked.
      const maxUses = multiUse ? null : 1;

      const { data, error } = await supabase
        .from('college_invites')
        .insert({
          college_id: collegeId,
          invite_code: code,
          invite_type: inviteType,
          role_to_assign: inviteType === 'staff' ? role : null,
          course_id: inviteType === 'student' ? courseId : null,
          max_uses: maxUses,
          expires_at: expires,
          created_by: uid,
          is_active: true,
        })
        .select('invite_code');
      if (error) throw error;
      if (!data || data.length === 0) {
        throw new Error('Could not create the invite — you may not have permission.');
      }

      setCreatedCode(code);
      onCreated?.();
      toast({ title: 'Invite created', description: `Code ${code} is ready to share.` });
    } catch (e) {
      toast({
        title: 'Could not create invite',
        description: (e as Error).message ?? 'Try again.',
        variant: 'destructive',
      });
    } finally {
      setCreating(false);
    }
  };

  const joinLink = createdCode
    ? `${typeof window !== 'undefined' ? window.location.origin : 'https://elec-mate.com'}/college/join/${createdCode}`
    : '';

  const copyCode = async () => {
    if (!createdCode) return;
    try {
      await navigator.clipboard.writeText(createdCode);
      toast({ title: 'Copied', description: `${createdCode} copied to clipboard.` });
    } catch {
      /* clipboard may be blocked; the code is shown on screen regardless */
    }
  };

  const copyLink = async () => {
    if (!joinLink) return;
    try {
      await navigator.clipboard.writeText(joinLink);
      toast({ title: 'Join link copied', description: 'One tap for them — no code to type.' });
    } catch {
      /* clipboard may be blocked; the link is shown on screen regardless */
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent hideCloseButton
        side="bottom"
        className="h-[80vh] sm:max-w-lg sm:mx-auto p-0 rounded-t-2xl overflow-hidden border-white/10"
      >
        <SheetShell
          eyebrow="People · Invite"
          title={createdCode ? 'Invite ready' : 'Create an invite code'}
          description={
            createdCode
              ? 'Send the join link — one tap signs them in and links them automatically.'
              : 'Generate a code for a learner or staff member to join this college.'
          }
          footer={
            createdCode ? (
              <PrimaryButton onClick={() => onOpenChange(false)} fullWidth>
                Done
              </PrimaryButton>
            ) : (
              <>
                <SecondaryButton onClick={() => onOpenChange(false)} disabled={creating} fullWidth>
                  Cancel
                </SecondaryButton>
                <PrimaryButton
                  onClick={handleCreate}
                  disabled={creating || (inviteType === 'student' && !courseId)}
                  fullWidth
                >
                  {creating ? 'Creating…' : 'Create invite'}
                </PrimaryButton>
              </>
            )
          }
        >
          {createdCode ? (
            <FormCard>
              <div className="text-center py-4">
                <div className="text-[11px] uppercase tracking-[0.16em] text-white/50 mb-2">
                  Invite code
                </div>
                <div className="text-3xl font-mono font-semibold tracking-[0.3em] text-elec-yellow">
                  {createdCode}
                </div>
                <div className="mt-2 text-[12px] text-white/55">
                  {inviteType === 'staff' ? `Staff · ${role.replace(/_/g, ' ')}` : 'Learner'}
                  {' · '}
                  {multiUse ? 'Multi-use' : 'Single-use'}
                  {' · '}
                  {expiryDays === '0' ? 'No expiry' : `Expires in ${expiryDays} days`}
                </div>
                <div className="mt-4 flex flex-col items-center gap-2">
                  <button
                    onClick={copyLink}
                    className="h-11 px-6 rounded-full bg-elec-yellow text-sm font-semibold text-black hover:bg-elec-yellow/90 transition-colors touch-manipulation"
                  >
                    Copy join link
                  </button>
                  <button
                    onClick={copyCode}
                    className="h-9 px-4 text-[12.5px] font-medium text-white/55 hover:text-white transition-colors touch-manipulation"
                  >
                    or copy the code only
                  </button>
                </div>
                <p className="mt-3 text-[11px] text-white/70 break-all px-2">{joinLink}</p>
              </div>
            </FormCard>
          ) : (
            <FormCard>
              <Field label="Who is this for?">
                <Select
                  value={inviteType}
                  onValueChange={(v) => {
                    const t = v as 'student' | 'staff';
                    setInviteType(t);
                    // Learners share one cohort code (multi-use); a staff code
                    // grants a role and should be single-use by default.
                    setMultiUse(t === 'student');
                  }}
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    <SelectItem value="student">Learner</SelectItem>
                    {isAdmin && <SelectItem value="staff">Staff member</SelectItem>}
                  </SelectContent>
                </Select>
              </Field>

              {inviteType === 'staff' && (
                <Field label="Staff role">
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      {STAFF_ROLES.map((r) => (
                        <SelectItem key={r.value} value={r.value}>
                          {r.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}

              {inviteType === 'student' && (
                <Field label="Course" hint="The course from your curriculum that learners enrol onto">
                  {courses.length === 0 ? (
                    <p className="text-[12.5px] text-white/55 px-1 py-2">
                      No courses in your curriculum yet. Add a course (linked to its qualification)
                      first, then create the invite.
                    </p>
                  ) : (
                    <Select value={courseId} onValueChange={setCourseId}>
                      <SelectTrigger className={selectTriggerClass}>
                        <SelectValue placeholder="Choose a course…" />
                      </SelectTrigger>
                      <SelectContent className={selectContentClass}>
                        {courses.map((c) => (
                          <SelectItem key={c.id} value={c.id}>
                            {c.name}
                            <span className="text-white/70">
                              {c.level ? ` · ${c.level}` : ''}
                              {c.code ? ` · ${c.code}` : ''}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </Field>
              )}

              <FormGrid cols={2}>
                <Field label="Expiry">
                  <Select value={expiryDays} onValueChange={setExpiryDays}>
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      {EXPIRY_OPTIONS.map((o) => (
                        <SelectItem key={o.value} value={o.value}>
                          {o.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Re-usable" hint={multiUse ? 'Many people can redeem' : 'One person only'}>
                  <button
                    type="button"
                    onClick={() => setMultiUse((m) => !m)}
                    className={`h-11 w-full rounded-xl border text-sm font-medium touch-manipulation transition-colors ${
                      multiUse
                        ? 'border-elec-yellow/40 bg-elec-yellow/10 text-elec-yellow'
                        : 'border-white/[0.12] bg-white/[0.03] text-white/70'
                    }`}
                  >
                    {multiUse ? 'Multi-use' : 'Single-use'}
                  </button>
                </Field>
              </FormGrid>

              <Field label="Code" hint="Auto-generated — regenerate if you like">
                <div className="flex gap-2">
                  <input
                    value={code}
                    readOnly
                    className={`${inputClass} font-mono tracking-[0.25em] text-center`}
                  />
                  <button
                    type="button"
                    onClick={() => setCode(generateCode())}
                    className="h-11 px-4 rounded-xl border border-white/[0.12] bg-white/[0.04] text-sm font-medium text-white hover:border-white/25 transition-colors touch-manipulation whitespace-nowrap"
                  >
                    New
                  </button>
                </div>
              </Field>
            </FormCard>
          )}
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
