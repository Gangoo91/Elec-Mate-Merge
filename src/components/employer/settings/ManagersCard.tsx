/**
 * Managers (co-admins) — ELE-1986.
 *
 * A manager runs the Employer Hub on the owner's account: jobs, team, quotes,
 * invoices, safety. They do not own the subscription and cannot add other
 * managers. The owner adds them by email; the person is asked to accept the
 * next time they open the app (CoAdminInvitePrompt) and nothing switches on
 * until they do.
 */
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Trash2, UserPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useEmployerCoAdmin } from '@/hooks/useEmployerCoAdmin';
import { toast } from '@/hooks/use-toast';
import {
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Avatar,
  Pill,
  Field,
  FormGrid,
  PrimaryButton,
  SecondaryButton,
  inputClass,
} from '@/components/employer/editorial';

interface ManagerRow {
  id: string;
  email: string;
  full_name: string | null;
  job_title: string | null;
  status: string;
  created_at: string;
  access_role: 'admin' | 'office';
}

// ELE-1831. Admin = everything you can do; Office = runs the hub without
// money (job profit, pay rates), certificate sign-off or confirming hours.
const ROLE_COPY: Record<ManagerRow['access_role'], { label: string; hint: string }> = {
  office: {
    label: 'Office',
    hint: "Jobs, team, quotes, invoices and approvals. Can't see job profit or pay rates, sign certificates or confirm apprentice hours.",
  },
  admin: {
    label: 'Admin',
    hint: 'Everything you can do, including money, certificate sign-off and confirming apprentice hours.',
  },
};

const initials = (name: string) =>
  name
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('');

export function ManagersCard() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data: isCoAdmin } = useEmployerCoAdmin(user?.id);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [accessRole, setAccessRole] = useState<ManagerRow['access_role']>('office');
  const [adding, setAdding] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState<string | null>(null);

  const { data: managers = [], isLoading } = useQuery({
    queryKey: ['employer-managers', user?.id],
    enabled: !!user && isCoAdmin === false,
    queryFn: async (): Promise<ManagerRow[]> => {
      const { data, error } = await supabase
        .from('employer_admins')
        .select('id, email, full_name, job_title, status, created_at, access_role')
        .eq('employer_id', user!.id)
        .in('status', ['pending', 'active'])
        .order('created_at', { ascending: true });
      if (error) throw error;
      return (data ?? []) as ManagerRow[];
    },
  });

  const invite = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.rpc(
        'invite_co_admin' as never,
        {
          p_email: email.trim(),
          p_full_name: name.trim() || null,
          p_job_title: jobTitle.trim() || null,
          p_access_role: accessRole,
        } as never
      );
      if (error) throw error;
      return data as unknown as { already: boolean; status?: string };
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['employer-managers'] });
      toast({
        title: res.already ? 'Already a manager' : 'Manager added',
        description: res.already
          ? 'That email is already on your list.'
          : 'Next time they open Elec-Mate with that email, they are asked to accept.',
      });
      setEmail('');
      setName('');
      setJobTitle('');
      setAccessRole('office');
      setAdding(false);
    },
    onError: (e: Error) => {
      toast({ title: 'Not added', description: e.message, variant: 'destructive' });
    },
  });

  const changeRole = useMutation({
    mutationFn: async ({ id, role }: { id: string; role: ManagerRow['access_role'] }) => {
      const { error } = await supabase.rpc(
        'set_co_admin_role' as never,
        { p_id: id, p_access_role: role } as never
      );
      if (error) throw error;
      return role;
    },
    onSuccess: (role) => {
      queryClient.invalidateQueries({ queryKey: ['employer-managers'] });
      toast({ title: `Now ${ROLE_COPY[role].label}`, description: ROLE_COPY[role].hint });
    },
    onError: (e: Error) => {
      toast({ title: 'Role not changed', description: e.message, variant: 'destructive' });
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      // Revoked, not deleted: the row keeps their past uploads readable.
      const { error } = await supabase.rpc('remove_co_admin' as never, { p_id: id } as never);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employer-managers'] });
      toast({ title: 'Manager removed', description: 'Their access has ended.' });
      setConfirmRemove(null);
    },
    onError: (e: Error) => {
      toast({ title: 'Not removed', description: e.message, variant: 'destructive' });
    },
  });

  if (isCoAdmin) {
    return (
      <ListCard>
        <ListCardHeader
          tone="yellow"
          title="Managers"
          meta={<Pill tone="cyan">You are a manager</Pill>}
        />
        <div className="px-5 sm:px-6 py-4">
          <p className="text-[13px] text-white leading-relaxed">
            You manage this firm's Employer Hub on the owner's account. Only the owner can add or
            remove managers.
          </p>
        </div>
      </ListCard>
    );
  }

  const validEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim());

  return (
    <ListCard>
      <ListCardHeader
        tone="yellow"
        title="Managers"
        meta={<Pill tone="yellow">{managers.length}</Pill>}
        action={adding ? undefined : 'Add manager'}
        onAction={adding ? undefined : () => setAdding(true)}
      />
      <div className="px-5 sm:px-6 pt-3">
        <p className="text-[13px] text-white leading-relaxed">
          Managers run the Employer Hub with you. Office managers handle jobs, team, quotes,
          invoices and approvals without seeing job profit or pay rates; Admins can do everything
          you can. Neither can change billing or add managers, and neither needs a paid seat.
        </p>
      </div>

      {managers.length > 0 && (
        <ListBody>
          {managers.map((m) => {
            const label = m.full_name || m.email;
            return (
              <ListRow
                key={m.id}
                lead={<Avatar initials={initials(label)} />}
                title={label}
                subtitle={[
                  m.full_name ? m.email : null,
                  ROLE_COPY[m.access_role]?.label ?? null,
                  m.job_title,
                  m.status === 'pending'
                    ? 'Waiting for them to accept'
                    : `Since ${format(new Date(m.created_at), 'd MMM yyyy')}`,
                ]
                  .filter(Boolean)
                  .join(' · ')}
                trailing={
                  confirmRemove === m.id ? (
                    <div className="flex gap-2">
                      <SecondaryButton size="sm" onClick={() => setConfirmRemove(null)}>
                        Keep
                      </SecondaryButton>
                      <PrimaryButton
                        size="sm"
                        onClick={() => remove.mutate(m.id)}
                        disabled={remove.isPending}
                      >
                        Remove
                      </PrimaryButton>
                    </div>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          changeRole.mutate({
                            id: m.id,
                            role: m.access_role === 'admin' ? 'office' : 'admin',
                          })
                        }
                        disabled={changeRole.isPending}
                        aria-label={`Change ${label} to ${m.access_role === 'admin' ? 'Office' : 'Admin'}`}
                        className="h-11 px-2 text-[12px] font-medium text-white underline underline-offset-4 touch-manipulation"
                      >
                        Make {m.access_role === 'admin' ? 'Office' : 'Admin'}
                      </button>
                      <Pill tone={m.status === 'active' ? 'emerald' : 'amber'}>
                        {m.status === 'active' ? 'Active' : 'Invited'}
                      </Pill>
                      <button
                        type="button"
                        aria-label={`Remove ${label}`}
                        onClick={() => setConfirmRemove(m.id)}
                        className="h-11 w-11 -mr-2 flex items-center justify-center text-white touch-manipulation"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </>
                  )
                }
              />
            );
          })}
        </ListBody>
      )}

      {!isLoading && managers.length === 0 && !adding && (
        <div className="px-5 sm:px-6 py-4">
          <SecondaryButton fullWidth onClick={() => setAdding(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add your first manager
          </SecondaryButton>
        </div>
      )}

      {adding && (
        <div className="px-5 sm:px-6 py-4 space-y-3 border-t border-white/[0.06]">
          <Field label="Email" required hint="The email they sign in to Elec-Mate with.">
            <Input
              type="email"
              inputMode="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="office@yourfirm.co.uk"
              className={inputClass}
            />
          </Field>
          <FormGrid cols={2}>
            <Field label="Name">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Job title">
              <Input
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Office manager"
                className={inputClass}
              />
            </Field>
          </FormGrid>
          <Field label="What they can do">
            <div className="grid grid-cols-2 gap-2">
              {(['office', 'admin'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setAccessRole(r)}
                  className={
                    'h-11 rounded-xl text-[13px] font-semibold border touch-manipulation ' +
                    (accessRole === r
                      ? 'bg-elec-yellow border-elec-yellow text-black'
                      : 'bg-white/[0.06] border-white/[0.12] text-white')
                  }
                >
                  {ROLE_COPY[r].label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-[12px] text-white leading-relaxed">
              {ROLE_COPY[accessRole].hint}
            </p>
          </Field>
          <div className="grid grid-cols-2 gap-2">
            <SecondaryButton onClick={() => setAdding(false)}>Cancel</SecondaryButton>
            <PrimaryButton
              onClick={() => invite.mutate()}
              disabled={!validEmail || invite.isPending}
            >
              {invite.isPending ? 'Adding…' : 'Add manager'}
            </PrimaryButton>
          </div>
        </div>
      )}
    </ListCard>
  );
}
