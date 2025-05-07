
import { useState, useEffect } from 'react';
import { Textarea } from "@/components/ui/textarea";

interface MessageContentProps {
  content: string;
  isEditing: boolean;
  onSaveEdit: (newContent: string) => void;
  onCancelEdit: () => void;
}

const MessageContent = ({ content, isEditing, onSaveEdit, onCancelEdit }: MessageContentProps) => {
  const [editText, setEditText] = useState(content);
  
  // Update edit text when content changes (for example, when editing a different message)
  useEffect(() => {
    setEditText(content);
  }, [content, isEditing]);
  
  const handleSubmitEdit = () => {
    if (editText.trim()) {
      onSaveEdit(editText);
    }
  };
  
  if (isEditing) {
    return (
      <div className="mb-4">
        <Textarea
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="min-h-[80px] bg-black/60 border border-elec-yellow/30 text-white resize-none"
        />
        <div className="flex justify-end gap-2 mt-2">
          <button 
            onClick={onCancelEdit}
            className="text-xs text-gray-400 hover:text-white px-2 py-1"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmitEdit}
            className="text-xs bg-elec-yellow text-black px-2 py-1 rounded"
          >
            Save Changes
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <p className="text-white mb-4">{content}</p>
  );
};

export default MessageContent;
