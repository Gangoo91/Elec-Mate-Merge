
import React from 'react';

interface ChatMessageRendererProps {
  content: string;
  isUser: boolean;
}

const ChatMessageRenderer = ({ content, isUser }: ChatMessageRendererProps) => {
  const formatContent = (text: string) => {
    if (isUser) {
      return <p className="leading-relaxed">{text}</p>;
    }

    // Split into lines and process each one
    const lines = text.split('\n').filter(line => line.trim().length > 0);
    
    return lines.map((line, index) => {
      const trimmed = line.trim();
      
      if (!trimmed) return null;
      
      // Detect section headers with emojis (like "⚡ Key Points:")
      if (trimmed.match(/^[⚡🔧⚠️📋💡🎯📖🔍✅❓🚨📊🎓💪🛠️⭐]\s+[A-Z][^:]*:/)) {
        return (
          <h4 key={index} className="mb-4 mt-6 first:mt-0 text-elec-yellow font-semibold text-lg flex items-center gap-2">
            {trimmed}
          </h4>
        );
      }
      
      // Detect numbered steps (1. 2. 3. etc.)
      if (trimmed.match(/^\d+\.\s+/)) {
        return (
          <p key={index} className="mb-3 ml-4 leading-relaxed text-gray-100 flex items-start gap-3">
            <span className="text-elec-yellow font-semibold min-w-fit">
              {trimmed.match(/^\d+\./)?.[0]}
            </span>
            <span>{trimmed.replace(/^\d+\.\s+/, '')}</span>
          </p>
        );
      }
      
      // Detect bullet points (- or • )
      if (trimmed.match(/^[-•]\s+/)) {
        return (
          <p key={index} className="mb-2 ml-4 leading-relaxed text-gray-100 flex items-start gap-3">
            <span className="text-elec-yellow mt-2">•</span>
            <span>{trimmed.replace(/^[-•]\s+/, '')}</span>
          </p>
        );
      }
      
      // Detect safety warnings (lines with ⚠️ but not headers)
      if (trimmed.includes('⚠️') && !trimmed.match(/^⚠️\s+[A-Z][^:]*:/)) {
        return (
          <p key={index} className="mb-4 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg leading-relaxed text-orange-100 font-medium">
            {trimmed}
          </p>
        );
      }
      
      // Detect regulations/code references
      if (trimmed.match(/BS\s*7671|regulation|clause|IET/i)) {
        return (
          <p key={index} className="mb-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg leading-relaxed text-blue-100 text-sm">
            📖 {trimmed}
          </p>
        );
      }
      
      // Regular paragraphs
      return (
        <p key={index} className="mb-4 last:mb-0 leading-relaxed text-gray-100 bg-red-500">
          {trimmed}
        </p>
      );
    }).filter(Boolean);
  };

  return (
    <div className={`max-w-[85%] rounded-xl p-5 ${
      isUser 
        ? 'bg-elec-yellow text-elec-gray ml-4 shadow-lg' 
        : 'bg-gradient-to-br from-elec-gray to-gray-800 border border-gray-600 mr-4 shadow-xl'
    }`}>
      <div className={`${isUser ? 'text-elec-gray' : 'text-white'}`}>
        {isUser ? (
          <p className="leading-relaxed font-medium">{content}</p>
        ) : (
          <div className="space-y-1">
            {formatContent(content)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessageRenderer;
