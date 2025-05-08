
import { Button } from "@/components/ui/button";
import { MessageSquarePlus, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface ChatEmptyStateProps {
  onStartDiscussion?: () => void;
}

const ChatEmptyState = ({ onStartDiscussion }: ChatEmptyStateProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-16 px-6 bg-gradient-to-br from-elec-gray-light/30 to-elec-gray border border-elec-yellow/10 rounded-lg"
    >
      <div className="mx-auto bg-elec-yellow/20 rounded-full w-16 h-16 flex items-center justify-center mb-4">
        <MessageSquarePlus className="h-8 w-8 text-elec-yellow" />
      </div>
      <h3 className="text-xl font-medium mb-2 text-white">Start the Conversation</h3>
      <p className="text-gray-400 mb-6 max-w-md mx-auto">
        Be the first to start a discussion in the community. Share your expertise, 
        ask questions, or post helpful tips that could benefit everyone.
      </p>
      
      <div className="space-y-4">
        <Button 
          className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
          onClick={onStartDiscussion}
        >
          <MessageSquarePlus className="mr-2 h-4 w-4" />
          Start New Discussion
        </Button>
        
        <div className="flex justify-center items-center gap-2 text-sm text-elec-yellow">
          <Sparkles className="h-3 w-3" />
          <span>Be the first to earn points!</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatEmptyState;
