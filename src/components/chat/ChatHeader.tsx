
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
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleBack}
          className="rounded-full h-8 w-8 text-white hover:bg-zinc-800"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold text-yellow-500">
          {title}
        </h1>
      </div>
      <Button 
        onClick={onNewPost}
        variant="default"
        size="sm"
        className="flex items-center gap-1 rounded-full bg-yellow-500 text-black hover:bg-yellow-600"
      >
        <MessageSquarePlus className="h-4 w-4" />
        <span>New Post</span>
      </Button>
    </div>
  );
};

export default ChatHeader;
