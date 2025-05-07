
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface CommentInputProps {
  currentUserId?: string;
  onSubmit: (text: string) => void;
  onCancel: () => void;
}

const CommentInput = ({ currentUserId, onSubmit, onCancel }: CommentInputProps) => {
  const [commentText, setCommentText] = useState('');
  
  const handleSubmit = () => {
    if (commentText.trim()) {
      onSubmit(commentText);
      setCommentText('');
    }
  };
  
  return (
    <div className="bg-black/20 px-4 py-3 border-t border-elec-yellow/10">
      <div className="flex gap-3">
        <Avatar className="h-7 w-7 mt-1">
          <AvatarImage src={currentUserId ? "https://i.pravatar.cc/150?img=9" : undefined} alt="You" />
          <AvatarFallback className="bg-elec-yellow text-black text-xs">
            YOU
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="relative">
            <Textarea
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="min-h-[50px] bg-black/60 border border-elec-yellow/30 text-white resize-none text-sm"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
            <button 
              onClick={handleSubmit} 
              disabled={!commentText.trim()}
              className="absolute right-2 bottom-2 bg-elec-yellow text-black p-1 rounded-full disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <div className="flex justify-end mt-2">
            <button 
              onClick={onCancel}
              className="text-xs text-gray-400 hover:text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentInput;
