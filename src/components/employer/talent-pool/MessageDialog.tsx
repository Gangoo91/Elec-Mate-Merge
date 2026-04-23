import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MessageSquare, Send, Loader2, Award, Shield, Info } from 'lucide-react';
import { useStartConversation } from '@/hooks/useConversations';
import { useSendMessage } from '@/hooks/useMessages';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import type { VerificationTier } from '@/components/employer/SparkProfileSheet';
import {
  Field,
  FormCard,
  Pill,
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

const tierIconMap: Record<VerificationTier, typeof Award | null> = {
  basic: null,
  verified: Shield,
  premium: Award,
};

const tierLabelMap: Record<VerificationTier, string> = {
  basic: 'Basic',
  verified: 'Verified',
  premium: 'Premium',
};

const tierToneMap: Record<VerificationTier, 'amber' | 'blue' | 'yellow'> = {
  basic: 'amber',
  verified: 'blue',
  premium: 'yellow',
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
        employer_id: user.id,
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
        description: `Your message has been sent to ${electrician.name}. They'll be able to reply once they apply to one of your vacancies.`,
      });

      setMessage('');
      onOpenChange(false);
      onSuccess?.(conversation.id);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Failed to Send',
        description: 'There was an error sending your message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSending(false);
    }
  };

  if (!electrician) return null;

  const TierIcon = tierIconMap[electrician.verificationTier];
  const initials = electrician.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-md bg-[hsl(0_0%_8%)] border border-white/[0.08] text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <MessageSquare className="h-5 w-5 text-elec-yellow" />
            Message {electrician.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Electrician Info */}
          <FormCard eyebrow="Sparky">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={electrician.avatar} alt={electrician.name} />
                <AvatarFallback className="bg-elec-yellow/20 text-elec-yellow font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium text-white">{electrician.name}</p>
                <p className="text-sm text-white">{electrician.location}</p>
              </div>
              <Pill tone={tierToneMap[electrician.verificationTier]}>
                {TierIcon && <TierIcon className="h-3 w-3 mr-1" />}
                {tierLabelMap[electrician.verificationTier]}
              </Pill>
            </div>
          </FormCard>

          {/* Info Notice */}
          <div className="flex gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-sm">
            <Info className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
            <p className="text-white">
              <span className="font-medium">How it works:</span> You can message any
              electrician. They'll be able to reply once they apply to one of your job vacancies.
            </p>
          </div>

          {/* Message Input */}
          <Field
            label="Your message"
            hint="Be specific about the role or project you're hiring for."
          >
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi, I came across your profile and would like to discuss a potential opportunity..."
              rows={4}
              className={textareaClass}
            />
          </Field>

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
              onClick={handleSend}
              disabled={isSending || !message.trim()}
            >
              {isSending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </>
              )}
            </PrimaryButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
