
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface ChatHeaderProps {
  title: string;
  onNewPost: () => void;
}

const ChatHeader = ({ title, onNewPost }: ChatHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-elec-yellow/20">
      <h1 className="text-xl font-semibold text-white">{title}</h1>
      <Button 
        onClick={onNewPost}
        variant="default"
        className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/80"
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        New Post
      </Button>
    </div>
  );
};

export default ChatHeader;
