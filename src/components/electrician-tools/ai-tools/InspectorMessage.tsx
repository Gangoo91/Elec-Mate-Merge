import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <Card className={`max-w-[95%] sm:max-w-[85%] p-3 sm:p-4 ${
        message.role === 'user' 
          ? 'bg-primary text-primary-foreground' 
          : 'bg-muted/80 backdrop-blur-sm'
      }`}>
        {message.agentName && (
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" className="text-xs border-elec-yellow/30 text-elec-yellow">
              {message.agentName === 'inspector' ? '🔍 Inspector' : '🔧 Installer'}
            </Badge>
          </div>
        )}
        
        <div className="inspector-message prose prose-sm sm:prose-base max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-base sm:text-lg font-bold text-elec-yellow mt-4 mb-2 first:mt-0">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-sm sm:text-base font-semibold text-elec-yellow/90 mt-3 mb-2 first:mt-0">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xs sm:text-sm font-semibold text-elec-yellow/80 mt-2 mb-1 first:mt-0">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-sm sm:text-base leading-relaxed my-2 text-foreground">
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
                <li className="text-sm sm:text-base leading-relaxed before:content-['⚡'] before:text-elec-yellow before:mr-2 before:font-bold list-none">
                  {children}
                </li>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-white">
                  {children}
                </strong>
              ),
              code: ({ children }) => (
                <code className="bg-elec-dark/50 px-1 py-0.5 rounded text-xs sm:text-sm text-elec-yellow font-mono">
                  {children}
                </code>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-elec-yellow/50 pl-3 my-2 text-muted-foreground italic">
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
      </Card>
    </div>
  );
};