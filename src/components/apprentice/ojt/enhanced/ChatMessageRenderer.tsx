
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
    const lines = text.split('\n');

    return lines.map((line, index) => {
      const trimmed = line.trim();

      // Empty lines create spacing
      if (!trimmed) {
        return <div key={index} className="h-2" />;
      }

      // Enhanced regex patterns
      const technicalTerms = /\b(RCD|RCBO|MCB|MCCB|RCM|AFDD|SPD|CU|DB|EICR|PIR|EIC|PAT|Zs|Ze|Zdb|PFC|PSCC|TN-S|TN-C-S|TT|IT|IP\d{2}|CSA|CPC|PME|SWA|MICC|FP200|XLPE|PVC|LSZH|BS\s*7671|IET|Part\s*P|SELV|PELV|FELV)\b/gi;
      const measurements = /\b(\d+(?:\.\d+)?)\s*(A|mA|V|kV|W|kW|VA|kVA|Ω|mΩ|mm²?|m|cm|Hz|°C|lx|lm|cd)\b/g;
      const regulationNumbers = /\b(\d{3}\.\d+(?:\.\d+)?(?:\.\d+)?)\b/g;

      // Process markdown-style bold **text**
      const processBold = (text: string) => {
        return text.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-elec-yellow font-semibold">$1</strong>');
      };

      // Horizontal rule ---
      if (trimmed === '---' || trimmed === '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━') {
        return <hr key={index} className="border-elec-yellow/30 my-4" />;
      }

      // Main headers with ###
      if (trimmed.startsWith('### ')) {
        const headerText = trimmed.replace('### ', '');
        return (
          <h3 key={index} className="text-lg font-bold text-elec-yellow mt-4 mb-2 flex items-center gap-2">
            {headerText}
          </h3>
        );
      }

      // Sub headers with **Header**
      if (trimmed.match(/^\*\*[^*]+\*\*\s*[-–]?\s*$/)) {
        const headerText = trimmed.replace(/\*\*/g, '').replace(/[-–]\s*$/, '').trim();
        return (
          <h4 key={index} className="text-base font-semibold text-white mt-4 mb-2 border-l-2 border-elec-yellow pl-3">
            {headerText}
          </h4>
        );
      }

      // Regulation headers: **Regulation 411.3.2** - Title
      if (trimmed.match(/^\*\*Regulation\s+[\d.]+\*\*/i)) {
        const processed = processBold(trimmed);
        return (
          <div key={index} className="mt-4 mb-2 p-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-l-4 border-purple-500 rounded-r-lg">
            <p className="font-semibold text-white" dangerouslySetInnerHTML={{ __html: processed }} />
          </div>
        );
      }

      // Step headers: **Step 1: Action**
      if (trimmed.match(/^\*\*Step\s+\d+:/i)) {
        const processed = processBold(trimmed);
        return (
          <div key={index} className="mt-3 mb-1">
            <p className="font-semibold text-elec-yellow" dangerouslySetInnerHTML={{ __html: processed }} />
          </div>
        );
      }

      // Blockquotes > text
      if (trimmed.startsWith('> ')) {
        const quoteText = trimmed.replace('> ', '');
        return (
          <blockquote key={index} className="border-l-4 border-elec-yellow/50 pl-4 py-2 my-2 bg-elec-yellow/5 rounded-r italic text-white/80">
            {quoteText}
          </blockquote>
        );
      }

      // Section headers with emoji (like ⚡ Key Points:)
      if (trimmed.match(/^[⚡🔧⚠️📋💡🎯📖🔍✅❓🚨📊🎓💪🛠️⭐]\s+[A-Z][^:]*:/)) {
        return (
          <div key={index} className="mb-3 mt-5 first:mt-0">
            <h4 className="text-elec-yellow font-semibold text-base flex items-center gap-2 border-b border-elec-yellow/20 pb-2">
              {trimmed}
            </h4>
          </div>
        );
      }

      // Warning/Important boxes with ⚠️
      if (trimmed.startsWith('**⚠️') || (trimmed.includes('⚠️') && trimmed.includes('Important'))) {
        const warningText = trimmed.replace(/\*\*/g, '').replace('⚠️', '').trim();
        return (
          <div key={index} className="my-3 p-3 bg-gradient-to-r from-amber-500/15 to-orange-500/15 border border-amber-500/40 rounded-lg">
            <div className="flex items-start gap-2">
              <span className="text-amber-400 text-lg shrink-0">⚠️</span>
              <p className="text-amber-100 font-medium text-sm">{warningText}</p>
            </div>
          </div>
        );
      }

      // Key requirements header
      if (trimmed.match(/^\*\*Key requirements:\*\*$/i)) {
        return (
          <p key={index} className="text-sm font-semibold text-white mt-3 mb-2 uppercase tracking-wide">
            Key Requirements
          </p>
        );
      }

      // Numbered steps (1. 2. 3.)
      if (trimmed.match(/^\d+\.\s+/)) {
        const stepNum = trimmed.match(/^(\d+)\./)?.[1];
        const stepText = trimmed.replace(/^\d+\.\s+/, '');
        let processed = processBold(stepText);
        processed = processed
          .replace(technicalTerms, '<span class="px-1 py-0.5 bg-blue-500/20 text-blue-300 rounded text-sm font-medium">$&</span>')
          .replace(measurements, '<span class="px-1 py-0.5 bg-green-500/20 text-green-300 rounded text-xs font-mono">$&</span>');

        return (
          <div key={index} className="mb-2 flex items-start gap-3">
            <span className="text-elec-yellow font-bold text-sm bg-elec-yellow/10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
              {stepNum}
            </span>
            <span className="text-white/90 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: processed }} />
          </div>
        );
      }

      // Bullet points (- or • or *)
      if (trimmed.match(/^[-•*]\s+/)) {
        const bulletText = trimmed.replace(/^[-•*]\s+/, '');
        let processed = processBold(bulletText);
        processed = processed
          .replace(technicalTerms, '<span class="px-1 py-0.5 bg-blue-500/20 text-blue-300 rounded text-sm font-medium">$&</span>')
          .replace(measurements, '<span class="px-1 py-0.5 bg-green-500/20 text-green-300 rounded text-xs font-mono">$&</span>')
          .replace(regulationNumbers, '<span class="px-1 py-0.5 bg-purple-500/20 text-purple-300 rounded text-xs font-semibold">$&</span>');

        return (
          <div key={index} className="mb-1.5 flex items-start gap-2 ml-1">
            <span className="text-elec-yellow text-xs mt-1.5">●</span>
            <span className="text-white/90 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: processed }} />
          </div>
        );
      }

      // Follow-up questions (usually at the end, starts with question words or contains ?)
      if ((trimmed.match(/^(Does|Do|Have|Has|Is|Are|What|Would|Could|Can|Should|Want|Did)\s/i) || trimmed.endsWith('?')) && index > lines.length - 5) {
        return (
          <div key={index} className="mt-4 p-3 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-lg">
            <div className="flex items-start gap-2">
              <span className="text-amber-400 text-base shrink-0">💬</span>
              <p className="text-amber-100 text-sm italic">{trimmed}</p>
            </div>
          </div>
        );
      }

      // Regulations/code references in text
      if (trimmed.match(/BS\s*7671|regulation\s+\d|clause|Section\s*\d+/i)) {
        let processed = processBold(trimmed);
        processed = processed
          .replace(regulationNumbers, '<span class="px-1.5 py-0.5 bg-purple-500/25 text-purple-300 rounded font-semibold">$&</span>')
          .replace(/BS\s*7671/gi, '<span class="px-1.5 py-0.5 bg-blue-500/25 text-blue-300 rounded font-semibold">$&</span>');

        return (
          <p key={index} className="mb-2 text-sm text-white/90 leading-relaxed" dangerouslySetInnerHTML={{ __html: processed }} />
        );
      }

      // Checkmarks and X marks
      if (trimmed.startsWith('✅') || trimmed.startsWith('✓')) {
        return (
          <div key={index} className="mb-1.5 flex items-start gap-2 ml-1">
            <span className="text-green-400 text-sm shrink-0">✓</span>
            <span className="text-white/90 text-sm">{trimmed.replace(/^[✅✓]\s*/, '')}</span>
          </div>
        );
      }

      if (trimmed.startsWith('❌') || trimmed.startsWith('✗')) {
        return (
          <div key={index} className="mb-1.5 flex items-start gap-2 ml-1">
            <span className="text-red-400 text-sm shrink-0">✗</span>
            <span className="text-white/90 text-sm">{trimmed.replace(/^[❌✗]\s*/, '')}</span>
          </div>
        );
      }

      // Regular paragraphs with enhanced formatting
      let processed = processBold(trimmed);
      processed = processed
        .replace(technicalTerms, '<span class="px-1 py-0.5 bg-blue-500/15 text-blue-300 rounded text-sm">$&</span>')
        .replace(measurements, '<span class="px-1 py-0.5 bg-green-500/15 text-green-300 rounded text-xs font-mono">$&</span>')
        .replace(regulationNumbers, '<span class="px-1 py-0.5 bg-purple-500/15 text-purple-300 rounded text-xs font-medium">$&</span>');

      return (
        <p key={index} className="mb-2 text-sm text-white/90 leading-relaxed" dangerouslySetInnerHTML={{ __html: processed }} />
      );
    }).filter(Boolean);
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[90%] rounded-xl ${
        isUser
          ? 'bg-elec-yellow text-elec-gray px-4 py-3 shadow-lg'
          : 'bg-gradient-to-br from-white/10 to-white/5 border border-white/15 px-4 py-4 shadow-xl'
      }`}>
        <div className={`${isUser ? 'text-elec-gray' : 'text-white'}`}>
          {isUser ? (
            <p className="leading-relaxed text-sm font-medium">{content}</p>
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
