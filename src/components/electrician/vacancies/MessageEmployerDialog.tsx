import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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
      const conversation = await startConversation.mutateAsync({
        employer_id: vacancy.employer?.id || '',
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
        description: `Your message has been sent to ${vacancy.employer?.company_name || 'the employer'}.`,
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
    .slice(0, 2) || 'EM';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[75vh] p-0 rounded-t-2xl overflow-hidden flex flex-col"
      >
        {/* Drag Handle - Native App Feel */}
        <div className="flex justify-center pt-3 pb-2 touch-manipulation">
          <div className="w-10 h-1 bg-muted-foreground/30 rounded-full" />
        </div>

        {/* Header */}
        <SheetHeader className="px-4 pb-3 border-b border-border">
          <SheetTitle className="flex items-center gap-2 text-lg">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <span className="block">Message Employer</span>
              <span className="text-sm font-normal text-muted-foreground">
                Reach out about this opportunity
              </span>
            </div>
          </SheetTitle>
        </SheetHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {/* Vacancy Info */}
          <Card className="bg-muted/50 border-border">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-14 w-14 rounded-xl">
                  <AvatarImage src={vacancy.employer?.logo_url || undefined} />
                  <AvatarFallback className="rounded-xl bg-emerald-500/20 text-emerald-400 font-bold text-lg">
                    {companyInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-base">{vacancy.title}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5">
                    <Building2 className="h-4 w-4" />
                    {vacancy.employer?.company_name || 'Employer'}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs h-6">
                      <MapPin className="h-3 w-3 mr-1" />
                      {vacancy.location}
                    </Badge>
                    <Badge variant="outline" className="text-xs h-6">
                      <Briefcase className="h-3 w-3 mr-1" />
                      {vacancy.type}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Info Notice */}
          <div className="flex gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-sm">
            <Info className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Tip for better responses</p>
              <p className="text-muted-foreground mt-1">
                Introduce yourself briefly and explain why you're interested in this role.
                Employers respond better to personalised messages.
              </p>
            </div>
          </div>

          {/* Message Input */}
          <div className="space-y-3">
            <Label htmlFor="message" className="text-sm font-medium">Your Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi, I'm interested in this position and wanted to reach out. I have experience in..."
              rows={5}
              className="resize-none text-base touch-manipulation"
            />
          </div>
        </div>

        {/* Sticky Footer - Action Buttons */}
        <div className="border-t border-border bg-background p-4 pb-6 flex gap-3">
          <Button
            variant="outline"
            className="flex-1 h-12 text-base touch-manipulation active:scale-[0.98] transition-transform"
            onClick={() => onOpenChange(false)}
            disabled={isSending}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 h-12 text-base bg-emerald-500 active:bg-emerald-400 text-white touch-manipulation active:scale-[0.98] transition-transform"
            onClick={handleSend}
            disabled={isSending || !message.trim() || !elecIdProfile}
          >
            {isSending ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
