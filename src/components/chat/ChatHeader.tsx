
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface ChatHeaderProps {
  title: string;
  subtitle?: string;
  onNewPost: () => void;
}

const ChatHeader = ({ title, subtitle, onNewPost }: ChatHeaderProps) => {
  return (
    <div className="bg-black border-b border-elec-yellow/20 sticky top-0 z-10 py-3">
      <div className="flex justify-between items-center px-4 max-w-3xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold text-elec-yellow">{title}</h1>
          {subtitle && (
            <p className="text-sm text-elec-yellow/80 line-clamp-1">
              {subtitle}
            </p>
          )}
        </div>
        
        <Button
          onClick={onNewPost}
          size="sm"
          className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium"
        >
          <PlusCircle className="mr-1 h-4 w-4" />
          New Post
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
