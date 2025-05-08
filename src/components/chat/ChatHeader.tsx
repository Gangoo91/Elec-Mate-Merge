
import { Button } from "@/components/ui/button";
import { PlusCircle, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

interface ChatHeaderProps {
  title: string;
  onNewPost: () => void;
}

const ChatHeader = ({ title, onNewPost }: ChatHeaderProps) => {
  const { profile } = useAuth();
  
  return (
    <div className="px-4 py-3 flex items-center justify-between max-w-3xl mx-auto w-full">
      <div className="flex items-center gap-2">
        <div className="bg-elec-yellow rounded-full p-1.5">
          <Users className="h-5 w-5 text-elec-dark" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">{title}</h1>
        <div className="hidden md:block ml-2 bg-elec-yellow/20 text-white text-xs rounded-full px-2 py-0.5">
          Online: 24
        </div>
      </div>
      
      <Button
        onClick={onNewPost}
        size="sm"
        className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/80 gap-1"
      >
        <PlusCircle className="h-4 w-4" />
        <span className="hidden sm:inline">Start Discussion</span>
        <span className="sm:hidden">Post</span>
      </Button>
    </div>
  );
};

export default ChatHeader;
