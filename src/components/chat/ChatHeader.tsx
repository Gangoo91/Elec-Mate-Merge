
import { Button } from "@/components/ui/button";
import { PlusCircle, Users, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

interface ChatHeaderProps {
  title: string;
  onNewPost: () => void;
}

const ChatHeader = ({ title, onNewPost }: ChatHeaderProps) => {
  const { profile } = useAuth();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="px-4 py-3 flex items-center justify-between max-w-3xl mx-auto w-full"
    >
      <div className="flex items-center gap-2">
        <div className="bg-elec-yellow rounded-full p-1.5">
          <MessageSquare className="h-5 w-5 text-elec-dark" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">{title}</h1>
        <div className="hidden md:flex items-center gap-1.5 ml-2 bg-elec-yellow/20 text-white text-xs rounded-full px-2 py-0.5">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse"></span>
          <span>24 online</span>
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
    </motion.div>
  );
};

export default ChatHeader;
