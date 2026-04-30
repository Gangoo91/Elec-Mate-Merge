/**
 * ProvisionMateSheet — admin-side bottom sheet to provision a Mate (Elec-AI) agent for an existing user.
 *
 * Flow: pick existing profile → enter phone (E.164) → choose role → Provision.
 * Calls the admin-mate-provision edge function which handles profile + routing + VPS workspace creation.
 */

import { useMemo, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronLeft, Loader2, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAdminUsersBase, type AdminUser } from '@/hooks/useAdminUsersBase';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  ListBody,
  ListRow,
  Avatar,
  Pill,
  EmptyState,
  type Tone,
} from '@/components/admin/editorial';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProvisioned?: () => void;
}

const PHONE_REGEX = /^\+[1-9]\d{6,14}$/;

function getInitials(name: string | null | undefined) {
  if (!name) return '·';
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function roleTone(role?: string): Tone {
  if (role === 'electrician') return 'yellow';
  if (role === 'apprentice') return 'blue';
  if (role === 'employer') return 'purple';
  return 'amber';
}

export default function ProvisionMateSheet({ open, onOpenChange, onProvisioned }: Props) {
  const { data: users, isLoading: usersLoading } = useAdminUsersBase();
  const [search, setSearch] = useState('');
  const [picked, setPicked] = useState<AdminUser | null>(null);
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);

  const filtered = useMemo(() => {
    if (!users) return [];
    const q = search.trim().toLowerCase();
    const list = q
      ? users.filter(
          (u) =>
            u.full_name?.toLowerCase().includes(q) ||
            u.email?.toLowerCase().includes(q) ||
            u.role?.toLowerCase().includes(q)
        )
      : users.slice(0, 50);
    return list.slice(0, 50);
  }, [users, search]);

  const reset = () => {
    setSearch('');
    setPicked(null);
    setPhone('');
    setRole('');
  };

  const handleClose = () => {
    if (submitting) return;
    reset();
    onOpenChange(false);
  };

  const phoneOk = PHONE_REGEX.test(phone);

  const submit = async () => {
    if (!picked || !phoneOk) return;
    setSubmitting(true);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');
      const { data, error } = await supabase.functions.invoke('admin-mate-provision', {
        headers: { Authorization: `Bearer ${session.access_token}` },
        body: {
          user_id: picked.id,
          phone,
          role: role || picked.role,
          full_name: picked.full_name,
        },
      });
      if (error) throw error;
      const result = data as {
        ok: boolean;
        error?: string;
        steps?: { step: string; ok: boolean; detail?: string }[];
      };
      if (!result.ok) {
        const failed = result.steps?.find((s) => !s.ok);
        throw new Error(failed?.detail ?? result.error ?? 'Provisioning failed');
      }
      toast({
        title: 'Mate provisioned',
        description: `${picked.full_name ?? 'User'} can now message Mate from ${phone}.`,
      });
      onProvisioned?.();
      reset();
      onOpenChange(false);
    } catch (err) {
      toast({
        title: 'Provisioning failed',
        description: err instanceof Error ? err.message : String(err),
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={(o) => (o ? onOpenChange(true) : handleClose())}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden bg-[hsl(0_0%_8%)] border-white/[0.06]"
      >
        <div className="flex flex-col h-full">
          <SheetHeader className="px-5 sm:px-6 py-4 border-b border-white/[0.06] text-left">
            <SheetTitle className="text-white text-[18px] font-semibold tracking-tight">
              {picked ? 'Provision Mate' : 'Pick a user'}
            </SheetTitle>
            <p className="text-[12.5px] text-white/60">
              {picked
                ? 'Confirm phone and role, then provision the agent.'
                : 'Choose an existing profile to enable Mate for.'}
            </p>
          </SheetHeader>

          {!picked ? (
            // STEP 1 — pick a user
            <>
              <div className="px-5 sm:px-6 py-3 border-b border-white/[0.06]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <Input
                    autoFocus
                    placeholder="Search name, email, role…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-11 pl-10 text-base touch-manipulation bg-[hsl(0_0%_12%)] border-white/[0.08] focus:border-elec-yellow/60 text-white"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {usersLoading ? (
                  <div className="flex items-center justify-center py-20">
                    <Loader2 className="h-5 w-5 text-white/40 animate-spin" />
                  </div>
                ) : filtered.length === 0 ? (
                  <EmptyState
                    title="No users found"
                    description="Try a different search."
                    className="m-5"
                  />
                ) : (
                  <ListBody>
                    {filtered.map((u) => (
                      <ListRow
                        key={u.id}
                        lead={<Avatar initials={getInitials(u.full_name)} />}
                        title={u.full_name ?? 'Unknown'}
                        subtitle={u.email ?? '—'}
                        trailing={
                          u.role ? <Pill tone={roleTone(u.role)}>{u.role}</Pill> : undefined
                        }
                        onClick={() => {
                          setPicked(u);
                          setRole(u.role ?? '');
                        }}
                      />
                    ))}
                  </ListBody>
                )}
              </div>
            </>
          ) : (
            // STEP 2 — confirm phone + role
            <>
              <div className="flex-1 overflow-y-auto">
                <button
                  onClick={() => setPicked(null)}
                  disabled={submitting}
                  className="px-5 sm:px-6 py-3 text-[12px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors flex items-center gap-1 touch-manipulation disabled:opacity-50"
                >
                  <ChevronLeft className="h-3.5 w-3.5" /> Change user
                </button>

                <div className="px-5 sm:px-6 pb-3">
                  <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-4 flex items-center gap-3">
                    <Avatar initials={getInitials(picked.full_name)} />
                    <div className="min-w-0 flex-1">
                      <div className="text-[14px] font-medium text-white truncate">
                        {picked.full_name ?? 'Unknown'}
                      </div>
                      <div className="text-[12px] text-white/60 truncate">
                        {picked.email ?? '—'}
                      </div>
                    </div>
                    {picked.role && <Pill tone={roleTone(picked.role)}>{picked.role}</Pill>}
                  </div>
                </div>

                <div className="px-5 sm:px-6 space-y-4 pb-6">
                  <div>
                    <label className="block text-[11px] font-semibold text-white/70 uppercase tracking-[0.14em] mb-1.5">
                      WhatsApp number (E.164)
                    </label>
                    <Input
                      placeholder="+447700900123"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.trim())}
                      autoFocus
                      inputMode="tel"
                      className={cn(
                        'h-11 text-base touch-manipulation bg-[hsl(0_0%_12%)] border-white/[0.08] focus:border-elec-yellow/60 text-white',
                        phone && !phoneOk && 'border-red-500/60 focus:border-red-500'
                      )}
                    />
                    {phone && !phoneOk && (
                      <p className="mt-1.5 text-[11px] text-red-400">
                        Must start with + and country code (e.g. +447700900123)
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-white/70 uppercase tracking-[0.14em] mb-1.5">
                      Role
                    </label>
                    <Select value={role} onValueChange={setRole}>
                      <SelectTrigger className="h-11 touch-manipulation bg-[hsl(0_0%_12%)] border-white/[0.08] focus:border-elec-yellow/60 text-white">
                        <SelectValue placeholder="Choose role" />
                      </SelectTrigger>
                      <SelectContent className="bg-[hsl(0_0%_12%)] border-white/[0.08] text-white">
                        <SelectItem value="electrician">Electrician</SelectItem>
                        <SelectItem value="apprentice">Apprentice</SelectItem>
                        <SelectItem value="employer">Employer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-4 text-[12.5px] text-white/70 leading-relaxed">
                    Provisioning will:
                    <ul className="mt-2 space-y-1 list-disc list-inside text-white/80">
                      <li>Enable Business AI on the profile</li>
                      <li>Verify the phone and add to the routing table</li>
                      <li>Create the workspace, mint a 90-day JWT, bind WhatsApp</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="px-5 sm:px-6 py-4 border-t border-white/[0.06] flex items-center gap-3">
                <Button
                  variant="ghost"
                  onClick={handleClose}
                  disabled={submitting}
                  className="text-white/70 hover:text-white touch-manipulation"
                >
                  Cancel
                </Button>
                <Button
                  onClick={submit}
                  disabled={!phoneOk || !role || submitting}
                  className="ml-auto h-11 px-6 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold touch-manipulation"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Provisioning…
                    </>
                  ) : (
                    'Provision Mate'
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
