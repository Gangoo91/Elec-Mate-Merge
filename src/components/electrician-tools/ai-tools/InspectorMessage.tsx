import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MobileGestureHandler } from "@/components/ui/mobile-gesture-handler";
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

  const handleLongPress = () => {
    if (navigator.clipboard && message.content) {
      navigator.clipboard.writeText(message.content);
      toast.success('Copied to clipboard');
    }
  };

  const handleCopy = () => {
    if (navigator.clipboard && message.content) {
      navigator.clipboard.writeText(message.content);
      toast.success('Copied to clipboard');
    }
  };

  return (
    <MobileGestureHandler
      onLongPress={handleLongPress}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
        isUser
          ? 'bg-primary text-primary-foreground'
          : 'bg-muted text-foreground'
      }`}>
        {message.agentName && (
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border/50">
            <span className="text-lg">{message.agentName === 'inspector' ? '🔍' : '🔧'}</span>
            <span className="text-xs font-semibold opacity-80">
              {message.agentName === 'inspector' ? 'Inspector' : 'Installer'}
            </span>
          </div>
        )}
        
        <div className="inspector-message prose prose-sm sm:prose-base max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-base sm:text-lg font-bold mt-3 mb-2 first:mt-0">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-sm sm:text-base font-semibold mt-3 mb-2 first:mt-0">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xs sm:text-sm font-semibold mt-2 mb-1 first:mt-0">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-sm leading-relaxed my-1.5">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="space-y-1 my-2 pl-4">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="space-y-1 my-2 pl-4 list-decimal">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-sm leading-relaxed before:content-['⚡'] before:text-elec-yellow before:mr-2 before:font-bold list-none">
                  {children}
                </li>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold">
                  {children}
                </strong>
              ),
              code: ({ children }) => (
                <code className="bg-muted/50 px-1.5 py-0.5 rounded text-xs font-mono">
                  {children}
                </code>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-border/50 pl-3 my-2 italic opacity-80">
                  {children}
                </blockquote>
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
          
          {isStreaming && (
            <span className="inline-block w-2 h-4 ml-1 bg-elec-yellow animate-pulse" />
          )}
        </div>

        {message.citations && message.citations.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3 pt-2 border-t border-border/50">
            {message.citations.map((citation, i) => (
              <Badge key={i} variant="secondary" className="text-xs bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20">
                📖 {citation.title}
              </Badge>
            ))}
          </div>
        )}

        {!isUser && (
          <div className="mt-2 pt-2 border-t border-border/30 flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-7 px-2 text-xs"
            >
              <Copy className="h-3 w-3 mr-1" />
              Copy
            </Button>
          </div>
        )}
      </div>
    </MobileGestureHandler>
  );
};