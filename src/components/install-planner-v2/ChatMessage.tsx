import { MobileGestureHandler } from "@/components/ui/mobile-gesture-handler";
import { toast } from "sonner";
import { Copy, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatMessageProps {
  message: {
    role: 'user' | 'assistant';
    content: string;
    agentName?: string;
  };
  onCopy?: () => void;
}

const AGENT_INFO: Record<string, { name: string; emoji: string }> = {
  designer: { name: 'Circuit Designer', emoji: '📐' },
  'cost-engineer': { name: 'Cost Engineer', emoji: '💷' },
  installer: { name: 'Installation Specialist', emoji: '🔧' },
  'health-safety': { name: 'Health & Safety Officer', emoji: '⚠️' },
  commissioning: { name: 'Testing & Commissioning', emoji: '✅' },
  compliance: { name: 'Compliance Specialist', emoji: '📋' }
};

export const ChatMessage = ({ message, onCopy }: ChatMessageProps) => {
  const isUser = message.role === 'user';
  const agent = message.agentName ? AGENT_INFO[message.agentName] : null;

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
      onCopy?.();
    }
  };

  return (
    <MobileGestureHandler
      onLongPress={handleLongPress}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-foreground'
        }`}
      >
        {agent && (
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border/50">
            <span className="text-lg">{agent.emoji}</span>
            <span className="text-xs font-semibold opacity-80">{agent.name}</span>
          </div>
        )}
        <div className="text-sm whitespace-pre-wrap break-words">
          {message.content}
        </div>
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
