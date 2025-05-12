
import { MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatEmptyStateProps {
  onNewPost?: () => void;
}

const ChatEmptyState = ({ onNewPost }: ChatEmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 my-12">
      <div className="bg-elec-gray-light/5 rounded-full p-6 mb-6">
        <MessageSquarePlus className="h-12 w-12 text-elec-yellow/50" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No messages yet</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        Be the first to start a conversation. Share your thoughts, ask questions, or provide helpful tips for the community.
      </p>
      {onNewPost && (
        <Button 
          onClick={onNewPost}
          className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
        >
          <MessageSquarePlus className="mr-2 h-4 w-4" />
          Start a conversation
        </Button>
      )}
    </div>
  );
};

export default ChatEmptyState;
