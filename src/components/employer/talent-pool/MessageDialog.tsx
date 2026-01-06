import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Loader2, Award, Shield, Info } from "lucide-react";
import { useStartConversation } from "@/hooks/useConversations";
import { useSendMessage } from "@/hooks/useMessages";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import type { VerificationTier } from "@/components/employer/SparkProfileSheet";

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

const tierConfig: Record<VerificationTier, { label: string; color: string; bg: string }> = {
  basic: { label: 'Basic', color: 'text-muted-foreground', bg: 'bg-muted' },
  verified: { label: 'Verified', color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  premium: { label: 'Premium', color: 'text-elec-yellow', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
};

export function MessageDialog({ open, onOpenChange, electrician, onSuccess }: MessageDialogProps) {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const startConversation = useStartConversation();
  const sendMessage = useSendMessage();

  const handleSend = async () => {
    if (!electrician || !message.trim() || !user) {
      toast({
        title: "Message Required",
        description: "Please enter a message to send.",
        variant: "destructive",
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
        title: "Message Sent",
        description: `Your message has been sent to ${electrician.name}. They'll be able to reply once they apply to one of your vacancies.`,
      });

      setMessage("");
      onOpenChange(false);
      onSuccess?.(conversation.id);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Failed to Send",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  if (!electrician) return null;

  const tier = tierConfig[electrician.verificationTier];
  const initials = electrician.name.split(' ').map(n => n[0]).join('');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-elec-yellow" />
            Message {electrician.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Electrician Info */}
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <Avatar className="w-12 h-12">
              <AvatarImage src={electrician.avatar} alt={electrician.name} />
              <AvatarFallback className="bg-elec-yellow/20 text-elec-yellow font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium">{electrician.name}</p>
              <p className="text-sm text-muted-foreground">{electrician.location}</p>
            </div>
            <Badge variant="outline" className={`${tier.bg} ${tier.color} border-0`}>
              {electrician.verificationTier === 'premium' ? (
                <Award className="h-3 w-3 mr-1" />
              ) : electrician.verificationTier === 'verified' ? (
                <Shield className="h-3 w-3 mr-1" />
              ) : null}
              {tier.label}
            </Badge>
          </div>

          {/* Info Notice */}
          <div className="flex gap-2 p-3 bg-blue-500/10 rounded-lg text-sm">
            <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-muted-foreground">
              <span className="font-medium text-foreground">How it works:</span> You can message any electrician.
              They'll be able to reply once they apply to one of your job vacancies.
            </p>
          </div>

          {/* Message Input */}
          <div className="space-y-2">
            <Label htmlFor="message">Your Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi, I came across your profile and would like to discuss a potential opportunity..."
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Be specific about the role or project you're hiring for.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 h-12"
              onClick={() => onOpenChange(false)}
              disabled={isSending}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 h-12"
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
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
