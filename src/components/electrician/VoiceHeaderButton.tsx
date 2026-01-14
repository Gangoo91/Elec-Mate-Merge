import React from 'react';
import { Button } from '@/components/ui/button';
import { Mic, Loader2, Volume2 } from 'lucide-react';
import { useQuoteInvoiceVoice } from '@/hooks/useQuoteInvoiceVoice';
import { cn } from '@/lib/utils';

interface VoiceHeaderButtonProps {
  hint?: string;
  currentSection: 'quotes' | 'invoices';
  onToolResult?: () => void;
  className?: string;
}

export const VoiceHeaderButton: React.FC<VoiceHeaderButtonProps> = ({
  hint,
  currentSection,
  onToolResult,
  className,
}) => {
  const {
    isConnecting,
    isActive,
    isSpeaking,
    toggleVoice,
  } = useQuoteInvoiceVoice({
    currentSection,
    onToolResult,
  });

  const getButtonText = () => {
    if (isConnecting) return 'Connecting...';
    if (isSpeaking) return 'Speaking...';
    if (isActive) return 'Listening...';
    return hint || 'Voice';
  };

  const getIcon = () => {
    if (isConnecting) {
      return <Loader2 className="h-4 w-4 animate-spin" />;
    }
    if (isSpeaking) {
      return <Volume2 className="h-4 w-4 animate-pulse" />;
    }
    return <Mic className={cn("h-4 w-4", isActive && "animate-pulse")} />;
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleVoice}
      disabled={isConnecting}
      className={cn(
        "h-11 gap-2 touch-manipulation active:scale-[0.98] transition-all",
        isActive && "bg-green-500/20 border-green-500 text-green-600",
        isConnecting && "bg-yellow-500/20 border-yellow-500 text-yellow-600 animate-pulse",
        !isActive && !isConnecting && "hover:bg-elec-yellow/10 hover:border-elec-yellow/50",
        className
      )}
    >
      {getIcon()}
      <span className="hidden sm:inline text-sm font-medium">
        {getButtonText()}
      </span>
    </Button>
  );
};

export default VoiceHeaderButton;
