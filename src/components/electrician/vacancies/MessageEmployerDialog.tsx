import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Send, Loader2, Building2, MapPin, Info, Briefcase } from "lucide-react";
import { useStartConversation } from "@/hooks/useConversations";
import { useSendMessage } from "@/hooks/useMessages";
import { useAuth } from "@/contexts/AuthContext";
import { useElecIdProfile } from "@/hooks/useElecIdProfile";
import { toast } from "@/hooks/use-toast";
import type { InternalVacancy } from "./InternalVacancyCard";

interface MessageEmployerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vacancy: InternalVacancy | null;
  onSuccess?: (conversationId: string) => void;
}

export function MessageEmployerDialog({
  open,
  onOpenChange,
  vacancy,
  onSuccess,
}: MessageEmployerDialogProps) {
  const { user } = useAuth();
  const { profile: elecIdProfile } = useElecIdProfile();
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const startConversation = useStartConversation();
  const sendMessage = useSendMessage();

  const handleSend = async () => {
    if (!vacancy || !message.trim() || !user || !elecIdProfile) {
      if (!elecIdProfile) {
        toast({
          title: "Profile Required",
          description: "Please complete your Elec-ID profile first to message employers.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Message Required",
          description: "Please enter a message to send.",
          variant: "destructive",
        });
      }
      return;
    }

    setIsSending(true);

    try {
      // Create or get existing conversation
      // Note: employer_id here is the employer's user_id
      const conversation = await startConversation.mutateAsync({
        employer_id: vacancy.employer?.id || '', // This should be the employer's auth.uid()
        electrician_profile_id: elecIdProfile.id,
        vacancy_id: vacancy.id,
        initiated_by: 'electrician',
      });

      // Send the message
      await sendMessage.mutateAsync({
        conversation_id: conversation.id,
        sender_type: 'electrician',
        sender_id: user.id,
        content: message.trim(),
        message_type: 'text',
      });

      toast({
        title: "Message Sent",
        description: `Your message has been sent to ${vacancy.employer?.company_name}.`,
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

  if (!vacancy) return null;

  const companyInitials = vacancy.employer?.company_name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || '??';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-elec-yellow" />
            Message Employer
          </DialogTitle>
          <DialogDescription>
            Reach out about this opportunity
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Vacancy Info */}
          <Card className="bg-muted/50">
            <CardContent className="p-3">
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12 rounded-lg">
                  <AvatarImage src={vacancy.employer?.logo_url || undefined} />
                  <AvatarFallback className="rounded-lg bg-elec-yellow/20 text-elec-yellow font-bold">
                    {companyInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground">{vacancy.title}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Building2 className="h-3.5 w-3.5" />
                    {vacancy.employer?.company_name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      <MapPin className="h-3 w-3 mr-1" />
                      {vacancy.location}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <Briefcase className="h-3 w-3 mr-1" />
                      {vacancy.type}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Info Notice */}
          <div className="flex gap-2 p-3 bg-blue-500/10 rounded-lg text-sm">
            <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-muted-foreground">
              <span className="font-medium text-foreground">Tip:</span> Introduce yourself briefly
              and explain why you're interested in this role. Employers respond better to
              personalized messages.
            </p>
          </div>

          {/* Message Input */}
          <div className="space-y-2">
            <Label htmlFor="message">Your Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi, I'm interested in this position and wanted to reach out. I have experience in..."
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 h-11"
              onClick={() => onOpenChange(false)}
              disabled={isSending}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 h-11 bg-elec-yellow text-black hover:bg-elec-yellow/90"
              onClick={handleSend}
              disabled={isSending || !message.trim() || !elecIdProfile}
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
