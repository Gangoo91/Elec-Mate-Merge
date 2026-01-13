import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Mail, UserPlus } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import type { TeamMemberRole } from '@/hooks/useTeamMembers';

const ROLES: { value: TeamMemberRole; label: string; description: string }[] = [
  { value: 'Admin', label: 'Admin', description: 'Full access to all features' },
  { value: 'Manager', label: 'Manager', description: 'Can manage jobs, employees, and view reports' },
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

    // Reset form
    setEmail('');
    setName('');
    setRole('Member');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={isMobile ? "max-w-[95vw] p-0" : "sm:max-w-md p-0"}>
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-elec-yellow via-elec-yellow to-elec-yellow/50 rounded-t-lg" />

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-elec-yellow" />
                Invite Team Member
              </DialogTitle>
              <DialogDescription>
                Send an invitation to join your employer dashboard
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="colleague@company.com"
                    className="h-12 pl-10 touch-manipulation"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Name (optional)</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Smith"
                  className="h-12 touch-manipulation"
                />
              </div>

              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={role} onValueChange={(v) => setRole(v as TeamMemberRole)}>
                  <SelectTrigger className="h-12 touch-manipulation">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="z-[100]">
                    {ROLES.map((r) => (
                      <SelectItem key={r.value} value={r.value}>
                        <div>
                          <span className="font-medium">{r.label}</span>
                          <span className="text-xs text-muted-foreground ml-2">{r.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex gap-3 p-6 pt-0">
            <Button
              type="button"
              variant="outline"
              className="flex-1 h-12"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 h-12"
              disabled={!email.trim() || isInviting}
            >
              {isInviting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Inviting...
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Send Invitation
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
