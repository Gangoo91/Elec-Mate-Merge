
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Send } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { getInitials } from "@/utils/stringUtils";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface DirectMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipient: {
    id: string;
    name: string;
    avatar?: string;
    type?: string;
  } | null;
}

const DirectMessageModal = ({ isOpen, onClose, recipient }: DirectMessageModalProps) => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!recipient) return null;

  const handleSendMessage = async () => {
    if (!message.trim() || !user) return;
    
    setIsSending(true);
    
    try {
      // Determine if this is a mental health message
      const isMentalHealthMessage = recipient.type === 'mental-health';
      
      if (isMentalHealthMessage) {
        // In a production app, save the message to the database
        // For now, we'll just simulate it
        
        // Navigate to Messages with the mental health conversation context
        navigate("/messages", { 
          state: { 
            activeTab: 'mental-health',
            conversationId: `mental-health-${recipient.id}`,
            contact: recipient.id
          }
        });
        
        toast({
          title: "Message sent",
          description: `Your message was sent to ${recipient.name}`,
        });
      } else {
        // Handle regular direct messages
        // Navigate to Messages with the conversation context
        navigate("/messages", { 
          state: { 
            conversationId: `direct-${recipient.id}`,
            recipientName: recipient.name
          } 
        });
        
        toast({
          title: "Message sent",
          description: `Your message was sent to ${recipient.name}`,
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
      onClose();
      setMessage("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-elec-gray text-white border-elec-yellow/20 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={recipient.avatar} alt={recipient.name} />
              <AvatarFallback className={`text-black ${recipient.type === 'mental-health' ? 'bg-purple-400' : 'bg-elec-yellow'}`}>
                {getInitials(recipient.name)}
              </AvatarFallback>
            </Avatar>
            <span>
              Message to {recipient.name}
              {recipient.type === 'mental-health' && (
                <span className="text-xs text-purple-400 block">Mental Health Mate</span>
              )}
            </span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <Textarea
            placeholder="Write your message..."
            className="min-h-[100px] bg-black/30 border-elec-yellow/20 text-white resize-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isSending}
          />
        </div>
        
        <DialogFooter>
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
            disabled={isSending}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSendMessage}
            className={`${recipient.type === 'mental-health' ? 'bg-purple-500 hover:bg-purple-600' : 'bg-elec-yellow hover:bg-elec-yellow/80'} text-black`}
            disabled={!message.trim() || isSending}
          >
            <Send className="h-4 w-4 mr-2" />
            {isSending ? "Sending..." : "Send Message"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DirectMessageModal;
