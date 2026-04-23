import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Mail, UserPlus } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import type { TeamMemberRole } from '@/hooks/useTeamMembers';
import {
  FormCard,
  Field,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  selectTriggerClass,
  selectContentClass,
} from '@/components/employer/editorial';

const ROLES: { value: TeamMemberRole; label: string; description: string }[] = [
  { value: 'Admin', label: 'Admin', description: 'Full access to all features' },
  {
    value: 'Manager',
    label: 'Manager',
    description: 'Can manage jobs, employees, and view reports',
  },
  { value: 'Member', label: 'Member', description: 'Limited view access only' },
];

interface InviteTeamMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInvite: (data: { email: string; name?: string; role: TeamMemberRole }) => Promise<void>;
  isInviting?: boolean;
}

export function InviteTeamMemberDialog({
  open,
  onOpenChange,
  onInvite,
  isInviting,
}: InviteTeamMemberDialogProps) {
  const isMobile = useIsMobile();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<TeamMemberRole>('Member');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    await onInvite({
      email: email.trim(),
      name: name.trim() || undefined,
      role,
    });

    setEmail('');
    setName('');
    setRole('Member');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={
          isMobile
            ? 'max-w-[95vw] p-5 bg-[hsl(0_0%_8%)] border-white/[0.08]'
            : 'sm:max-w-md p-6 bg-[hsl(0_0%_8%)] border-white/[0.08]'
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-white">
              <UserPlus className="h-5 w-5 text-elec-yellow" />
              Invite team member
            </DialogTitle>
            <DialogDescription className="text-white">
              Send an invitation to join your employer dashboard.
            </DialogDescription>
          </DialogHeader>

          <FormCard eyebrow="Invitation">
            <Field label="Email address" required>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="colleague@company.com"
                  className={`${inputClass} pl-10`}
                  required
                />
              </div>
            </Field>
            <Field label="Name (optional)">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Smith"
                className={inputClass}
              />
            </Field>
            <Field label="Role">
              <Select value={role} onValueChange={(v) => setRole(v as TeamMemberRole)}>
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  {ROLES.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      <div>
                        <span className="font-medium">{r.label}</span>
                        <span className="text-[11px] text-white ml-2">{r.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </FormCard>

          <div className="flex gap-2 pt-1">
            <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
              Cancel
            </SecondaryButton>
            <PrimaryButton type="submit" disabled={!email.trim() || isInviting} fullWidth>
              {isInviting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Inviting...
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4 mr-1.5" />
                  Send invitation
                </>
              )}
            </PrimaryButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
