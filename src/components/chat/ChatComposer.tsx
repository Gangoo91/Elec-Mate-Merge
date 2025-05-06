
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Image } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";

interface ChatComposerProps {
  onSubmit: (content: string) => void;
}

const ChatComposer = ({ onSubmit }: ChatComposerProps) => {
  const [message, setMessage] = useState("");
  const { profile } = useAuth();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSubmit(message);
      setMessage("");
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="bg-black border border-elec-yellow/20 rounded-xl p-3 shadow-lg">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10 mt-1 border-2 border-elec-yellow/20 flex-shrink-0">
            <AvatarImage src={profile?.avatar_url} alt={profile?.full_name || "User"} />
            <AvatarFallback className="bg-elec-yellow text-elec-dark">
              {getInitials(profile?.full_name)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <Textarea
              placeholder="Share your thoughts or ask questions..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[70px] bg-black border-elec-yellow/20 focus:border-elec-yellow focus:ring-elec-yellow/20 text-white mb-2 resize-none rounded-xl"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            
            <div className="flex items-center justify-between">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-elec-yellow"
              >
                <Image className="h-4 w-4 mr-1" /> Add Image
              </Button>
              
              <Button
                type="submit"
                disabled={!message.trim()}
                className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 px-5"
              >
                <Send className="h-4 w-4 mr-2" /> Post
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatComposer;
