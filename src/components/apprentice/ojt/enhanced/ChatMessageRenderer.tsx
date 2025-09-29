
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
      
      // Enhanced regex patterns for better detection
      const technicalTerms = /\b(RCD|RCBO|MCB|MCCB|RCM|AFDD|SPD|CU|DB|EICR|PIR|EIC|PAT|Zs|Ze|Zdb|PFC|PSCC|TN-S|TN-C-S|TT|IT|IP\d{2}|CSA|CPC|PME|SWA|MICC|FP200|XLPE|PVC|LSZH|BS\s*7671|IET|Part\s*P)\b/gi;
      const measurements = /\b(\d+(?:\.\d+)?)\s*(A|mA|V|kV|W|kW|VA|kVA|Ω|mΩ|mm²?|m|cm|Hz|°C|lx|lm|cd)\b/g;
      const regulationNumbers = /\b(\d{3}\.\d+(?:\.\d+)?)\b/g;
      
      // Detect section headers with emojis (like "⚡ Key Points:")
      if (trimmed.match(/^[⚡🔧⚠️📋💡🎯📖🔍✅❓🚨📊🎓💪🛠️⭐]\s+[A-Z][^:]*:/)) {
        return (
          <div key={index} className="mb-4 mt-6 first:mt-0">
            <h4 className="text-elec-yellow font-semibold text-lg mb-3 flex items-center gap-2 border-b border-elec-yellow/20 pb-2">
              {trimmed}
            </h4>
          </div>
        );
      }
      
      // Detect main section headers (ANALYSIS, REGULATIONS, etc.)
      if (trimmed.match(/^(ANALYSIS|REGULATIONS?|TECHNICAL|COMPLIANCE|CALCULATION|SIZING|ASSESSMENT|RECOMMENDATION):?$/i)) {
        return (
          <div key={index} className="mb-4 mt-6 first:mt-0">
            <h3 className="text-elec-yellow font-bold text-xl mb-4 flex items-center gap-2 border-l-4 border-elec-yellow pl-4">
              {trimmed.includes('ANALYSIS') && '🔍'}
              {trimmed.includes('REGULATION') && '📖'}
              {trimmed.includes('TECHNICAL') && '⚡'}
              {trimmed.includes('COMPLIANCE') && '✅'}
              {trimmed.includes('CALCULATION') && '📊'}
              {trimmed.includes('SIZING') && '📏'}
              {trimmed.includes('ASSESSMENT') && '🎯'}
              {trimmed.includes('RECOMMENDATION') && '💡'}
              <span className="ml-2">{trimmed}</span>
            </h3>
          </div>
        );
      }
      
      // Detect numbered steps (1. 2. 3. etc.)
      if (trimmed.match(/^\d+\.\s+/)) {
        const stepText = trimmed.replace(/^\d+\.\s+/, '');
        const processedText = stepText
          .replace(technicalTerms, '<span class="px-1.5 py-0.5 bg-blue-500/20 text-blue-200 rounded font-medium">$&</span>')
          .replace(measurements, '<span class="px-1 py-0.5 bg-green-500/20 text-green-200 rounded text-sm font-mono">$&</span>')
          .replace(regulationNumbers, '<span class="px-1.5 py-0.5 bg-purple-500/20 text-purple-200 rounded font-semibold">$&</span>');
        
        return (
          <div key={index} className="mb-4 ml-4 p-3 bg-gray-800/50 rounded-lg border border-gray-600/30">
            <div className="leading-relaxed text-gray-100 flex items-start gap-3">
              <span className="text-elec-yellow font-bold text-lg min-w-fit bg-elec-yellow/10 px-2 py-1 rounded">
                {trimmed.match(/^\d+\./)?.[0]}
              </span>
              <span dangerouslySetInnerHTML={{ __html: processedText }} className="flex-1" />
            </div>
          </div>
        );
      }
      
      // Detect bullet points (- or • )
      if (trimmed.match(/^[-•]\s+/)) {
        const bulletText = trimmed.replace(/^[-•]\s+/, '');
        const processedText = bulletText
          .replace(technicalTerms, '<span class="px-1.5 py-0.5 bg-blue-500/20 text-blue-200 rounded font-medium">$&</span>')
          .replace(measurements, '<span class="px-1 py-0.5 bg-green-500/20 text-green-200 rounded text-sm font-mono">$&</span>')
          .replace(regulationNumbers, '<span class="px-1.5 py-0.5 bg-purple-500/20 text-purple-200 rounded font-semibold">$&</span>');
        
        return (
          <div key={index} className="mb-2 ml-4">
            <div className="leading-relaxed text-gray-100 flex items-start gap-3 p-2 hover:bg-gray-800/30 rounded">
              <span className="text-elec-yellow text-lg">•</span>
              <span dangerouslySetInnerHTML={{ __html: processedText }} className="flex-1" />
            </div>
          </div>
        );
      }
      
      // Detect safety warnings (lines with ⚠️ but not headers)
      if (trimmed.includes('⚠️') && !trimmed.match(/^⚠️\s+[A-Z][^:]*:/)) {
        return (
          <div key={index} className="mb-4 p-4 bg-gradient-to-r from-orange-500/15 to-red-500/15 border border-orange-500/40 rounded-lg shadow-lg">
            <div className="flex items-start gap-3">
              <span className="text-orange-400 text-xl">⚠️</span>
              <p className="leading-relaxed text-orange-100 font-medium flex-1">
                {trimmed.replace('⚠️', '').trim()}
              </p>
            </div>
          </div>
        );
      }
      
      // Detect regulations/code references
      if (trimmed.match(/BS\s*7671|regulation|clause|IET|Part\s*\d+|Chapter\s*\d+|Section\s*\d+|Appendix\s*\d+/i)) {
        const processedText = trimmed
          .replace(regulationNumbers, '<span class="px-2 py-1 bg-purple-500/30 text-purple-200 rounded font-bold">$&</span>')
          .replace(/BS\s*7671/gi, '<span class="px-2 py-1 bg-blue-500/30 text-blue-200 rounded font-bold">$&</span>')
          .replace(/(Part|Chapter|Section|Appendix)\s*(\d+)/gi, '<span class="px-2 py-1 bg-indigo-500/30 text-indigo-200 rounded font-semibold">$&</span>');
        
        return (
          <div key={index} className="mb-3 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg">
            <div className="flex items-start gap-3">
              <span className="text-blue-400 text-lg">📖</span>
              <p className="leading-relaxed text-blue-100 text-sm w-full" dangerouslySetInnerHTML={{ __html: processedText }} />
            </div>
          </div>
        );
      }
      
      // Detect calculations and formulas
      if (trimmed.match(/[=×÷+\-]\s*\d+|formula|equation|calculate/i) || trimmed.includes('=')) {
        return (
          <div key={index} className="mb-3 p-4 bg-gradient-to-r from-green-500/10 to-teal-500/10 border border-green-500/30 rounded-lg">
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-lg">🧮</span>
              <p className="leading-relaxed text-green-100 font-mono text-sm w-full">
                {trimmed}
              </p>
            </div>
          </div>
        );
      }
      
      // Regular paragraphs with enhanced formatting
      const processedText = trimmed
        .replace(technicalTerms, '<span class="px-1.5 py-0.5 bg-blue-500/20 text-blue-200 rounded font-medium">$&</span>')
        .replace(measurements, '<span class="px-1 py-0.5 bg-green-500/20 text-green-200 rounded text-sm font-mono">$&</span>')
        .replace(regulationNumbers, '<span class="px-1.5 py-0.5 bg-purple-500/20 text-purple-200 rounded font-semibold">$&</span>');
      
      return (
        <p key={index} className="mb-4 last:mb-0 leading-relaxed text-gray-100" dangerouslySetInnerHTML={{ __html: processedText }} />
      );
    }).filter(Boolean);
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
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
    </div>
  );
};

export default ChatMessageRenderer;
