import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Briefcase, Send, Loader2, MapPin, Check, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { createInvitation } from '@/services/conversationService';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import {
  Field,
  FormCard,
  PrimaryButton,
  SecondaryButton,
  Pill,
  textareaClass,
} from '@/components/employer/editorial';

interface Vacancy {
  id: string;
  title: string;
  location: string;
  status: string;
  created_at: string;
}

interface InviteToApplyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  electrician: {
    id: string;
    elecIdProfileId: string;
    name: string;
    avatar?: string;
    location: string;
  } | null;
  onSuccess?: () => void;
}

export function InviteToApplyDialog({
  open,
  onOpenChange,
  electrician,
  onSuccess,
}: InviteToApplyDialogProps) {
  const { user } = useAuth();
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVacancy, setSelectedVacancy] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [alreadyInvited, setAlreadyInvited] = useState<Set<string>>(new Set());

  // Fetch active vacancies and existing invitations
  useEffect(() => {
    if (!open || !user || !electrician) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch active vacancies
        const { data: vacanciesData, error: vacanciesError } = await supabase
          .from('employer_vacancies')
          .select('id, title, location, status, created_at')
          .eq('employer_id', user.id)
          .eq('status', 'open')
          .order('created_at', { ascending: false });

        if (vacanciesError) throw vacanciesError;
        setVacancies(vacanciesData || []);

        // Check which vacancies already have invitations for this electrician
        const { data: invitations } = await supabase
          .from('employer_vacancy_invitations')
          .select('vacancy_id')
          .eq('electrician_profile_id', electrician.elecIdProfileId);

        setAlreadyInvited(new Set((invitations || []).map((i) => i.vacancy_id)));
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load vacancies.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [open, user, electrician]);

  const handleSendInvite = async () => {
    if (!electrician || !selectedVacancy || !user) return;

    setIsSending(true);

    try {
      await createInvitation({
        vacancy_id: selectedVacancy,
        electrician_profile_id: electrician.elecIdProfileId,
        invited_by: user.id,
        message: message.trim() || undefined,
      });

      const vacancy = vacancies.find((v) => v.id === selectedVacancy);
      toast({
        title: 'Invitation Sent',
        description: `${electrician.name} has been invited to apply for "${vacancy?.title}".`,
      });

      setSelectedVacancy(null);
      setMessage('');
      onOpenChange(false);
      onSuccess?.();
    } catch (error: any) {
      console.error('Error sending invitation:', error);
      if (error.code === '23505') {
        toast({
          title: 'Already Invited',
          description: `${electrician.name} has already been invited to this vacancy.`,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to send invitation. Please try again.',
          variant: 'destructive',
        });
      }
    } finally {
      setIsSending(false);
    }
  };

  if (!electrician) return null;

  const initials = electrician.name
    .split(' ')
    .map((n) => n[0])
    .join('');
  const availableVacancies = vacancies.filter((v) => !alreadyInvited.has(v.id));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-lg bg-[hsl(0_0%_8%)] border border-white/[0.08] text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <Briefcase className="h-5 w-5 text-elec-yellow" />
            Invite to Apply
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Electrician Info */}
          <FormCard eyebrow="Sparky">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={electrician.avatar} alt={electrician.name} />
                <AvatarFallback className="bg-elec-yellow/20 text-elec-yellow font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-white">{electrician.name}</p>
                <p className="text-sm text-white">{electrician.location}</p>
              </div>
            </div>
          </FormCard>

          {/* Vacancy Selection */}
          <Field label="Select a vacancy">
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            ) : availableVacancies.length === 0 ? (
              <div className="bg-[hsl(0_0%_9%)] border border-dashed border-white/[0.12] rounded-xl p-4 text-center">
                <AlertCircle className="h-8 w-8 text-white mx-auto mb-2" />
                <p className="text-sm text-white">
                  {vacancies.length === 0
                    ? 'No active vacancies. Create a job posting first.'
                    : 'This person has been invited to all your active vacancies.'}
                </p>
              </div>
            ) : (
              <ScrollArea className="h-48">
                <div className="space-y-2 pr-4">
                  {availableVacancies.map((vacancy) => {
                    const isSelected = selectedVacancy === vacancy.id;
                    return (
                      <button
                        type="button"
                        key={vacancy.id}
                        onClick={() => setSelectedVacancy(vacancy.id)}
                        className={`w-full text-left rounded-xl border p-3 flex items-center gap-3 touch-manipulation transition-colors ${
                          isSelected
                            ? 'border-elec-yellow/60 bg-elec-yellow/5'
                            : 'border-white/[0.08] bg-[hsl(0_0%_9%)] hover:bg-white/[0.04]'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'border-elec-yellow bg-elec-yellow'
                              : 'border-white/[0.2]'
                          }`}
                        >
                          {isSelected && <Check className="h-3 w-3 text-black" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-white truncate">{vacancy.title}</p>
                          <div className="flex items-center gap-1 text-sm text-white">
                            <MapPin className="h-3 w-3" />
                            <span className="truncate">{vacancy.location}</span>
                          </div>
                        </div>
                        <Pill tone="yellow" className="shrink-0 capitalize">
                          {vacancy.status}
                        </Pill>
                      </button>
                    );
                  })}
                </div>
              </ScrollArea>
            )}
          </Field>

          {/* Personal Message (Optional) */}
          {selectedVacancy && (
            <Field label="Personal message (optional)">
              <Textarea
                id="invite-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Add a personal note to make your invitation stand out..."
                rows={3}
                className={textareaClass}
              />
            </Field>
          )}

          {/* Already Invited Info */}
          {alreadyInvited.size > 0 && (
            <p className="text-xs text-white">
              {alreadyInvited.size} vacancy invitation{alreadyInvited.size > 1 ? 's' : ''} already
              sent to this person.
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <SecondaryButton
              fullWidth
              onClick={() => onOpenChange(false)}
              disabled={isSending}
            >
              Cancel
            </SecondaryButton>
            <PrimaryButton
              fullWidth
              onClick={handleSendInvite}
              disabled={isSending || !selectedVacancy}
            >
              {isSending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Invitation
                </>
              )}
            </PrimaryButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
