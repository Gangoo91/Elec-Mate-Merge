
import React from 'react';

interface ChatMessageRendererProps {
  content: string;
  isUser: boolean;
}

const ChatMessageRenderer = ({ content, isUser }: ChatMessageRendererProps) => {
  // Format the content for better display
  const formatContent = (text: string) => {
    // Split into paragraphs and filter out empty ones
    const paragraphs = text.split('\n').filter(para => para.trim().length > 0);
    
    return paragraphs.map((paragraph, index) => {
      // Trim whitespace
      const trimmed = paragraph.trim();
      
      if (!trimmed) return null;
      
      return (
        <p key={index} className="mb-3 last:mb-0">
          {trimmed}
        </p>
      );
    }).filter(Boolean);
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[80%] rounded-lg p-4 ${
        isUser 
          ? 'bg-elec-yellow text-elec-gray ml-4' 
          : 'bg-elec-gray border border-gray-700 mr-4'
      }`}>
        <div className={`text-sm ${isUser ? 'text-elec-gray' : 'text-white'} leading-relaxed`}>
          {isUser ? (
            <p>{content}</p>
          ) : (
            <div className="space-y-0">
              {formatContent(content)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessageRenderer;
