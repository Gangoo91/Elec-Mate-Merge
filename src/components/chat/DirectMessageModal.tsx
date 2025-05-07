
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

interface DirectMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipient: {
    id: string;
    name: string;
    avatar?: string;
  } | null;
}

const DirectMessageModal = ({ isOpen, onClose, recipient }: DirectMessageModalProps) => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  if (!recipient) return null;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // In a real app, we would save the message to the database
    // For now, we'll just navigate to the messages page
    toast({
      title: "Message sent",
      description: `Your message was sent to ${recipient.name}`,
    });
    
    // Navigate to Messages with the conversation context
    navigate("/messages", { 
      state: { 
        conversationId: `direct-${recipient.id}`,
        recipientName: recipient.name
      } 
    });
    
    onClose();
    setMessage("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-elec-gray text-white border-elec-yellow/20 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={recipient.avatar} alt={recipient.name} />
              <AvatarFallback className="bg-elec-yellow text-black">
                {getInitials(recipient.name)}
              </AvatarFallback>
            </Avatar>
            <span>Message to {recipient.name}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <Textarea
            placeholder="Write your message..."
            className="min-h-[100px] bg-black/30 border-elec-yellow/20 text-white resize-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        
        <DialogFooter>
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSendMessage}
            className="bg-elec-yellow text-black hover:bg-elec-yellow/80"
            disabled={!message.trim()}
          >
            <Send className="h-4 w-4 mr-2" />
            Send Message
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DirectMessageModal;
