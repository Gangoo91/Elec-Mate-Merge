import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Send, MessageCircle } from "lucide-react";
import { format } from "date-fns";

interface Message {
  id: string;
  message: string;
  sender_type: string;
  created_at: string;
}

interface PortalMessagingProps {
  token: string;
  jobId: string;
  messages: Message[];
  clientName: string;
  onMessageSent: () => void;
}

export default function PortalMessaging({ token, jobId, messages, clientName, onMessageSent }: PortalMessagingProps) {
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    setSending(true);
    try {
      const { error } = await supabase
        .from("client_messages")
        .insert({
          access_token: token,
          job_id: jobId,
          message: newMessage.trim(),
          sender_type: "client"
        });

      if (error) throw error;

      setNewMessage("");
      toast({ title: "Message sent" });
      onMessageSent();
    } catch (err) {
      console.error("Error sending message:", err);
      toast({
        title: "Failed to send message",
        variant: "destructive"
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Messages
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Message List */}
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {messages.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No messages yet. Send a message to your contractor below.
            </p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-3 rounded-lg ${
                  msg.sender_type === "client"
                    ? "bg-primary/10 ml-4"
                    : "bg-muted mr-4"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium">
                    {msg.sender_type === "client" ? clientName : "Contractor"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(msg.created_at), "d MMM, HH:mm")}
                  </span>
                </div>
                <p className="text-sm">{msg.message}</p>
              </div>
            ))
          )}
        </div>

        {/* Message Input */}
        <div className="flex gap-2">
          <Textarea
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="min-h-[80px] resize-none"
          />
          <Button
            onClick={handleSend}
            disabled={!newMessage.trim() || sending}
            className="self-end"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
