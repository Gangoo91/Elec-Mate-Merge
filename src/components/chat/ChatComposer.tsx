
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface ChatComposerProps {
  onSubmit: (content: string) => void;
}

const ChatComposer = ({ onSubmit }: ChatComposerProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSubmit(message);
      setMessage("");
    }
  };

  return (
    <div className="bg-elec-gray-light/10 p-4 rounded-lg border border-elec-yellow/10">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <Textarea
            placeholder="Share your thoughts, ask questions, or discuss electrical topics..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[100px] bg-elec-gray-light/5 border-elec-yellow/20 focus:border-elec-yellow focus:ring-elec-yellow/20"
          />
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={!message.trim()}
            className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/80 flex items-center gap-2"
          >
            <Send className="h-4 w-4" /> Post Message
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatComposer;
