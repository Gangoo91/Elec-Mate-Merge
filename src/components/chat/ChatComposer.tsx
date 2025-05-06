
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
    <div className="bg-[#2c2c2c] border border-elec-yellow/30 rounded-lg overflow-hidden">
      <form onSubmit={handleSubmit} className="flex items-center p-2">
        <Avatar className="h-10 w-10 mr-2 border-2 border-elec-yellow/20">
          <AvatarImage src={profile?.avatar_url} alt={profile?.full_name || "User"} />
          <AvatarFallback className="bg-elec-yellow text-black">
            {getInitials(profile?.full_name)}
          </AvatarFallback>
        </Avatar>
        
        <input
          type="text"
          placeholder="Write a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 bg-transparent border-none text-white focus:outline-none px-2"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        
        <div className="flex gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-elec-yellow"
          >
            <Image className="h-5 w-5" />
          </Button>
          
          <Button
            type="submit"
            disabled={!message.trim()}
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90 rounded-full h-10 w-10 p-0"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatComposer;
