
import { Button } from "@/components/ui/button";
import { MessageSquarePlus, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ChatHeaderProps {
  title: string;
  onNewPost: () => void;
}

const ChatHeader = ({ title, onNewPost }: ChatHeaderProps) => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1);
  };
  
  return (
    <div className="flex items-center justify-between p-4 border-b border-elec-yellow/10">
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleBack}
          className="rounded-full h-8 w-8 text-muted-foreground hover:text-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold bg-gradient-to-r from-elec-yellow to-amber-400 bg-clip-text text-transparent">
          {title}
        </h1>
      </div>
      <Button 
        onClick={onNewPost}
        variant="default"
        size="sm"
        className="flex items-center gap-1 rounded-full bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
      >
        <MessageSquarePlus className="h-4 w-4" />
        <span>New Post</span>
      </Button>
    </div>
  );
};

export default ChatHeader;
