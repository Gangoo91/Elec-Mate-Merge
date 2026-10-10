import { useState } from 'react';
import {
  ResponsiveFormModal,
  ResponsiveFormModalContent,
  ResponsiveFormModalHeader,
  ResponsiveFormModalTitle,
  ResponsiveFormModalBody,
} from '@/components/ui/responsive-form-modal';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { panel, StatusPill } from '@/components/employer/pageParts/PageParts';
import { useStartConversation } from '@/hooks/useConversations';
import { useSendMessage } from '@/hooks/useMessages';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import type { VerificationTier } from '@/components/employer/SparkProfileSheet';
import { getActingEmployerId } from '@/lib/actingEmployer';
import {
  Field,
  PrimaryButton,
  SecondaryButton,
  textareaClass,
} from '@/components/employer/editorial';

interface MessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  electrician: {
    id: string;
    elecIdProfileId: string;
    name: string;
    avatar?: string;
    location: string;
    verificationTier: VerificationTier;
  } | null;
  onSuccess?: (conversationId: string) => void;
}

const tierLabelMap: Record<VerificationTier, string> = {
  basic: 'Basic',
  verified: 'Verified',
  premium: 'Premium',
};

export function MessageDialog({ open, onOpenChange, electrician, onSuccess }: MessageDialogProps) {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const startConversation = useStartConversation();
  const sendMessage = useSendMessage();

  const handleSend = async () => {
    if (!electrician || !message.trim() || !user) {
      toast({
        title: 'Message Required',
        description: 'Please enter a message to send.',
        variant: 'destructive',
      });
      return;
    }

    setIsSending(true);

    try {
      // Create or get existing conversation
      const conversation = await startConversation.mutateAsync({
        // The firm, not the manager's own id, or the owner never sees it.
        employer_id: (await getActingEmployerId(user.id)) ?? user.id,
        electrician_profile_id: electrician.elecIdProfileId,
        initiated_by: 'employer',
      });

      // Send the first message
      await sendMessage.mutateAsync({
        conversation_id: conversation.id,
        sender_type: 'employer',
        sender_id: user.id,
        content: message.trim(),
        message_type: 'text',
      });

      toast({
        title: 'Message Sent',
        description: `Sent to ${electrician.name}. They can reply in Elec-Mate messages; their phone and email stay private unless they share them.`,
      });

      setMessage('');
      onOpenChange(false);
      onSuccess?.(conversation.id);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Message not sent',
        description: 'There was an error sending your message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSending(false);
    }
  };

  if (!electrician) return null;

  const initials = electrician.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <ResponsiveFormModal open={open} onOpenChange={onOpenChange}>
      <ResponsiveFormModalContent className="bg-[hsl(0_0%_8%)] border-white/[0.08] text-white">
        <ResponsiveFormModalHeader>
          <ResponsiveFormModalTitle className="text-white">
            Message {electrician.name}
          </ResponsiveFormModalTitle>
        </ResponsiveFormModalHeader>

        <ResponsiveFormModalBody className="pb-6">
          <div className="space-y-4">
            <div className={cn(panel, 'flex items-center gap-3 px-4 py-3 sm:px-5')}>
              <Avatar className="h-10 w-10">
                <AvatarImage src={electrician.avatar} alt={electrician.name} />
                <AvatarFallback className="bg-white/[0.1] text-[12.5px] font-bold text-white">
                  {initials.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-semibold text-white">{electrician.name}</p>
                <p className="truncate text-[13px] text-white">{electrician.location}</p>
              </div>
              {electrician.verificationTier !== 'basic' &&
                tierLabelMap[electrician.verificationTier] && (
                  <StatusPill tone="green">{tierLabelMap[electrician.verificationTier]}</StatusPill>
                )}
            </div>

            <p className="text-[13px] leading-snug text-white">
              You can message anyone here. They can reply once they apply to one of your vacancies.
            </p>

            {/* Message Input */}
            <Field
              label="Your message"
              hint="Be specific about the role or project you're hiring for."
            >
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hi, I saw your profile and have some work you might like."
                rows={4}
                className={textareaClass}
              />
            </Field>

            {/* Actions */}
            <div className="flex gap-2">
              <SecondaryButton fullWidth onClick={() => onOpenChange(false)} disabled={isSending}>
                Cancel
              </SecondaryButton>
              <PrimaryButton fullWidth onClick={handleSend} disabled={isSending || !message.trim()}>
                {isSending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send message
                  </>
                )}
              </PrimaryButton>
            </div>
          </div>
        </ResponsiveFormModalBody>
      </ResponsiveFormModalContent>
    </ResponsiveFormModal>
  );
}
