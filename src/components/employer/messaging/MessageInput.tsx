import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, Paperclip, X } from "lucide-react";
import { ReplyPreview, ReplyToMessage } from "@/components/messaging/MessageReply";
import { FilePreview, DropZone } from "@/components/messaging/FileAttachment";
import { MentionSuggestions, MentionUser, useMentions } from "@/components/messaging/Mentions";
import { useFileDrop } from "@/hooks/useFileUpload";
import { validateFile } from "@/services/fileUploadService";
import { toast } from "@/hooks/use-toast";

interface MessageInputProps {
  onSend: (content: string, attachments?: File[], replyToId?: string) => void;
  onTyping?: (isTyping: boolean) => void;
  disabled?: boolean;
  isSending?: boolean;
  placeholder?: string;
  replyTo?: ReplyToMessage | null;
  onCancelReply?: () => void;
  mentionUsers?: MentionUser[];
}

export function MessageInput({
  onSend,
  onTyping,
  disabled,
  isSending,
  placeholder = "Type a message...",
  replyTo,
  onCancelReply,
  mentionUsers = [],
}: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mentions handling
  const {
    showSuggestions,
    mentionQuery,
    selectedIndex,
    filteredUsers,
    handleInputChange,
    handleKeyDown: handleMentionKeyDown,
    selectMention,
    insertMention,
    closeSuggestions,
  } = useMentions({
    users: mentionUsers,
    onMentionComplete: (user) => {
      const newMessage = insertMention(message, user);
      setMessage(newMessage);
      closeSuggestions();
    },
  });

  // Drag and drop
  const handleFileDrop = useCallback((files: File[]) => {
    const validFiles = files.filter(file => {
      const validation = validateFile(file);
      if (!validation.valid) {
        toast({
          title: "Invalid File",
          description: `${file.name}: ${validation.error}`,
          variant: "destructive",
        });
        return false;
      }
      return true;
    });
    setAttachments(prev => [...prev, ...validFiles].slice(0, 5)); // Max 5 files
  }, []);

  const { isDragging, dragHandlers } = useFileDrop(handleFileDrop);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [message]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMessage(value);

    // Handle mentions
    const cursorPosition = e.target.selectionStart || 0;
    handleInputChange(value, cursorPosition);

    // Handle typing indicator
    if (onTyping) {
      onTyping(true);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      typingTimeoutRef.current = setTimeout(() => {
        onTyping(false);
      }, 2000);
    }
  };

  const handleSend = () => {
    if ((!message.trim() && attachments.length === 0) || disabled || isSending) return;

    onSend(message.trim(), attachments.length > 0 ? attachments : undefined, replyTo?.id);
    setMessage("");
    setAttachments([]);

    if (onTyping) {
      onTyping(false);
    }
    if (onCancelReply) {
      onCancelReply();
    }

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Handle mention navigation
    if (showSuggestions) {
      handleMentionKeyDown(e);
      if (['ArrowUp', 'ArrowDown', 'Enter', 'Tab', 'Escape'].includes(e.key)) {
        return;
      }
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFileDrop(files);
    e.target.value = '';
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="relative" {...dragHandlers}>
      {/* Drop zone overlay */}
      <DropZone isDragging={isDragging} />

      {/* Reply preview */}
      {replyTo && (
        <div className="px-3 pt-2">
          <ReplyPreview replyTo={replyTo} onClear={onCancelReply} />
        </div>
      )}

      {/* File previews */}
      {attachments.length > 0 && (
        <div className="flex gap-2 px-3 pt-2 overflow-x-auto">
          {attachments.map((file, index) => (
            <FilePreview
              key={`${file.name}-${index}`}
              file={file}
              onRemove={() => removeAttachment(index)}
            />
          ))}
        </div>
      )}

      {/* Mention suggestions */}
      {showSuggestions && filteredUsers.length > 0 && (
        <div className="absolute bottom-full left-0 right-0 mb-1 mx-3 bg-background border border-border rounded-lg shadow-lg max-h-48 overflow-y-auto z-20">
          <MentionSuggestions
            users={filteredUsers}
            query={mentionQuery}
            onSelect={selectMention}
            selectedIndex={selectedIndex}
          />
        </div>
      )}

      {/* Input area */}
      <div className="flex items-end gap-2 p-3 border-t border-border bg-background">
        {/* Attachment button */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt,.csv"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-11 w-11 shrink-0"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled || isSending}
        >
          <Paperclip className="h-5 w-5" />
        </Button>

        <Textarea
          ref={textareaRef}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || isSending}
          rows={1}
          className="min-h-[44px] max-h-[120px] resize-none bg-elec-gray border-border"
        />

        <Button
          onClick={handleSend}
          disabled={(!message.trim() && attachments.length === 0) || disabled || isSending}
          size="icon"
          className="h-11 w-11 shrink-0 bg-elec-yellow hover:bg-elec-yellow/90 text-black"
        >
          {isSending ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </Button>
      </div>
    </div>
  );
}
