/**
 * Talk instead of type — for gloved hands on site (ELE-2003). Each committed
 * phrase is appended to the field. Hidden where the device can't dictate.
 */
import { Mic, Square } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSpeechToText } from '@/hooks/useSpeechToText';

export function DictateButton({
  onText,
  className,
}: {
  onText: (chunk: string) => void;
  className?: string;
}) {
  const speech = useSpeechToText({
    continuous: true,
    onFinalChunk: (chunk) => {
      const t = chunk.trim();
      if (t) onText(t);
    },
  });
  if (!speech.isSupported) return null;
  const listening = speech.isListening;
  return (
    <button
      type="button"
      onClick={() => (listening ? speech.stopListening() : speech.startListening())}
      aria-pressed={listening}
      className={cn(
        'flex h-12 items-center justify-center gap-2 rounded-xl px-4 text-[15px] font-semibold touch-manipulation active:scale-[0.99]',
        listening
          ? 'bg-red-500 text-white'
          : 'border border-white/[0.18] bg-white/[0.06] text-white',
        className
      )}
    >
      {listening ? <Square className="h-4 w-4" /> : <Mic className="h-5 w-5 text-elec-yellow" />}
      {listening ? 'Stop' : 'Speak'}
    </button>
  );
}
