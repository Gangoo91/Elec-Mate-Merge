import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface InspectorMessageProps {
  message: {
    role: 'user' | 'assistant';
    content: string;
    citations?: Array<{ number: string; title: string }>;
    agentName?: string;
  };
  isStreaming?: boolean;
}

export const InspectorMessage = ({ message, isStreaming }: InspectorMessageProps) => {
  const isUser = message.role === 'user';

  const handleCopy = () => {
    if (navigator.clipboard && message.content) {
      navigator.clipboard.writeText(message.content);
      toast.success('Copied to clipboard');
    }
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[95%] sm:max-w-[85%] rounded-2xl px-4 sm:px-5 py-3 sm:py-4 shadow-sm transition-[height] duration-150 ease-out will-change-contents ${
        isUser
          ? 'bg-primary text-primary-foreground'
          : 'bg-muted text-white'
      }`} style={{ minHeight: '60px' }}>
        {message.agentName && (
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
            <span className="text-lg">{message.agentName === 'inspector' ? '🔍' : message.agentName === 'designer' ? '📐' : '🔧'}</span>
            <span className="text-xs font-semibold text-white/90">
              {message.agentName === 'inspector' ? 'Inspector' : message.agentName === 'designer' ? 'Designer' : 'Installer'}
            </span>
          </div>
        )}
        
        <div className="inspector-message prose prose-sm sm:prose-base max-w-none text-white">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-base sm:text-lg font-bold mt-4 mb-2 first:mt-0 text-white text-left">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-base sm:text-lg font-bold mt-6 mb-3 first:mt-0 text-white text-left pb-2 border-b-2 border-elec-yellow/30">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-sm sm:text-base font-semibold mt-4 mb-2 first:mt-0 text-elec-yellow text-left">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-sm sm:text-base leading-relaxed my-3 text-white text-left">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="space-y-1.5 my-3 pl-4">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="space-y-1.5 my-3 pl-4 list-decimal">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-sm sm:text-base leading-relaxed list-disc marker:text-white/60 text-white text-left">
                  {children}
                </li>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-white">
                  {children}
                </strong>
              ),
              code: ({ children }) => (
                <code className="bg-black/30 px-1.5 py-0.5 rounded text-xs font-mono text-elec-yellow">
                  {children}
                </code>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-elec-yellow/50 pl-3 my-2 italic text-white/90">
                  {children}
                </blockquote>
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
          
          {isStreaming && (
            <span className="inline-block w-0.5 h-5 ml-1 bg-elec-yellow animate-[blink_1s_ease-in-out_infinite]" />
          )}
        </div>

        {message.citations && message.citations.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/10">
            {message.citations.map((citation, i) => (
              <Badge key={i} variant="secondary" className="text-xs bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20">
                📖 {citation.title}
              </Badge>
            ))}
          </div>
        )}

        {!isUser && (
          <div className="mt-3 pt-3 border-t border-white/10 flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-8 px-3 text-xs text-white/80 hover:text-white hover:bg-white/10"
            >
              <Copy className="h-3.5 w-3.5 mr-1.5" />
              Copy
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};