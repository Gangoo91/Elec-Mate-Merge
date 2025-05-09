
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ChatHeaderProps {
  title: string;
  onNewPost: () => void;
}

const ChatHeader = ({ title, onNewPost }: ChatHeaderProps) => {
  return (
    <div className="bg-black border-b border-elec-yellow/20 py-3">
      <div className="flex justify-between items-center px-4 max-w-3xl mx-auto">
        <div>
          <h1 className="text-xl font-bold text-elec-yellow">{title}</h1>
        </div>
        
        <Button
          onClick={onNewPost}
          size="icon"
          variant="ghost"
          className="text-elec-yellow hover:bg-elec-yellow/10"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
