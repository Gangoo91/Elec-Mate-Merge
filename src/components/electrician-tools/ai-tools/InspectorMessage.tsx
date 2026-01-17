import { memo, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy, Check, Zap, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface InspectorMessageProps {
  message: {
    role: 'user' | 'assistant';
    content: string;
    citations?: Array<{ number: string; title: string }>;
    agentName?: string;
    imageUrl?: string;
  };
  isStreaming?: boolean;
}

/**
 * InspectorMessage - Premium AI Response Component
 *
 * Features:
 * - Glassmorphism design with subtle gradients
 * - Smooth copy animation with checkmark feedback
 * - Beautiful markdown rendering with visual hierarchy
 * - Animated streaming cursor
 * - Source attribution with branded styling
 */
export const InspectorMessage = memo(function InspectorMessage({
  message,
  isStreaming
}: InspectorMessageProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = async () => {
    if (navigator.clipboard && message.content) {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      toast.success('Copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // User message - clean, simple
  if (isUser) {
    return (
      <div className="flex justify-end">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-[85%] sm:max-w-[75%] space-y-2"
        >
          {/* Attached Image */}
          {message.imageUrl && (
            <div className="rounded-xl overflow-hidden shadow-lg ml-auto">
              <img
                src={message.imageUrl}
                alt="Attached"
                className="max-w-full max-h-40 sm:max-h-48 object-cover rounded-xl"
              />
            </div>
          )}
          {/* Text Content */}
          <div className="rounded-2xl rounded-tr-sm px-4 py-3 bg-gradient-to-br from-elec-yellow to-elec-yellow/90 text-elec-dark shadow-lg shadow-elec-yellow/20">
            <div className="whitespace-pre-wrap break-words font-medium text-sm sm:text-base">
              {message.content}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Assistant message - premium design
  return (
    <div className="flex justify-start w-full">
      <div className="w-full max-w-none space-y-3">
        {/* Agent Header */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-elec-blue/20 to-elec-yellow/20 border border-elec-yellow/30 flex items-center justify-center shadow-lg shadow-elec-yellow/10">
              <Zap className="w-4.5 h-4.5 text-elec-yellow" />
            </div>
            {isStreaming && (
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background animate-pulse" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              {message.agentName || 'Elec-AI'}
              {isStreaming && (
                <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              )}
            </span>
            <span className="text-[11px] text-muted-foreground">
              {message.agentName === 'Dave' ? 'Master Electrician • 20+ Years' : 'Electrical Expert'}
            </span>
          </div>
        </div>

        {/* Response Content */}
        <motion.div
          initial={false}
          animate={{ opacity: 1 }}
          className={cn(
            "relative rounded-2xl rounded-tl-sm overflow-hidden",
            // Premium glassmorphism
            "bg-gradient-to-br from-card/95 via-card/90 to-card/85",
            "backdrop-blur-xl",
            "border border-border/50",
            "shadow-xl shadow-black/5"
          )}
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/[0.02] via-transparent to-elec-blue/[0.02] pointer-events-none" />

          {/* Content */}
          <div className="relative px-4 sm:px-5 py-4 sm:py-5">
            <div className="inspector-message prose prose-sm sm:prose-base max-w-none text-foreground">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  // Section Headers - Clear visual hierarchy
                  h1: ({ children }) => (
                    <h1 className="text-lg sm:text-xl font-bold mt-6 mb-3 first:mt-0 text-foreground flex items-center gap-2">
                      <span className="w-1 h-6 bg-elec-yellow rounded-full" />
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-base sm:text-lg font-bold mt-6 mb-3 first:mt-0 text-foreground pb-2 border-b border-elec-yellow/20 flex items-center gap-2">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-sm sm:text-base font-semibold mt-5 mb-2 first:mt-0 text-elec-yellow/90">
                      {children}
                    </h3>
                  ),
                  // Paragraphs - Readable line height
                  p: ({ children }) => (
                    <p className="text-sm sm:text-[15px] leading-relaxed my-3 text-foreground/90">
                      {children}
                    </p>
                  ),
                  // Lists - Clear spacing
                  ul: ({ children }) => (
                    <ul className="space-y-2 my-4 ml-1">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="space-y-2 my-4 ml-1 list-decimal list-inside">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-sm sm:text-[15px] leading-relaxed text-foreground/90 flex items-start gap-2">
                      <span className="text-elec-yellow mt-1.5 shrink-0">•</span>
                      <span>{children}</span>
                    </li>
                  ),
                  // Strong - Accent color
                  strong: ({ children }) => (
                    <strong className="font-semibold text-foreground">
                      {children}
                    </strong>
                  ),
                  // Code - Technical styling
                  code: ({ className, children }) => {
                    const isInline = !className;
                    if (isInline) {
                      return (
                        <code className="bg-elec-yellow/10 text-elec-yellow px-1.5 py-0.5 rounded text-[13px] font-mono border border-elec-yellow/20">
                          {children}
                        </code>
                      );
                    }
                    return (
                      <code className={cn(
                        "block bg-black/40 rounded-lg p-4 my-3 text-sm font-mono overflow-x-auto",
                        "border border-white/10",
                        className
                      )}>
                        {children}
                      </code>
                    );
                  },
                  // Blockquote - Important notes
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-3 border-elec-yellow bg-elec-yellow/5 rounded-r-lg pl-4 pr-3 py-2 my-4 text-foreground/90">
                      {children}
                    </blockquote>
                  ),
                  // Tables - Clean professional look
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-4 rounded-lg border border-border/50">
                      <table className="w-full text-sm">
                        {children}
                      </table>
                    </div>
                  ),
                  thead: ({ children }) => (
                    <thead className="bg-muted/50 border-b border-border/50">
                      {children}
                    </thead>
                  ),
                  th: ({ children }) => (
                    <th className="px-3 py-2 text-left font-semibold text-foreground">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="px-3 py-2 border-t border-border/30 text-foreground/90">
                      {children}
                    </td>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>

              {/* Streaming cursor */}
              <AnimatePresence>
                {isStreaming && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="inline-block w-0.5 h-5 ml-0.5 bg-elec-yellow rounded-full animate-[blink_0.8s_ease-in-out_infinite]"
                  />
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Footer Actions - Only show when not streaming */}
          {!isStreaming && message.content && (
            <div className="border-t border-border/30 bg-muted/30 px-4 py-2 flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                <Zap className="w-3 h-3" />
                Powered by Elec-AI • BS 7671
              </span>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className={cn(
                  "h-7 px-2.5 text-xs transition-all",
                  copied
                    ? "text-green-500"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="flex items-center gap-1"
                    >
                      <Check className="h-3.5 w-3.5" />
                      Copied
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="flex items-center gap-1"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      Copy
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom memo comparison for optimal re-renders

  // Always re-render if streaming state changes
  if (prevProps.isStreaming !== nextProps.isStreaming) return false;

  // During streaming, always allow re-renders (content changing)
  if (nextProps.isStreaming) return false;

  // After streaming stops, only re-render if content or role actually changed
  return (
    prevProps.message.content === nextProps.message.content &&
    prevProps.message.role === nextProps.message.role
  );
});

export default InspectorMessage;
