import { Zap } from "lucide-react";

interface InstrumentSetupPanelProps {
  instrumentSetup: string;
}

export const InstrumentSetupPanel = ({ instrumentSetup }: InstrumentSetupPanelProps) => {
  // Try to parse structured setup instructions
  const lines = instrumentSetup.split('\n').filter(line => line.trim());
  const hasMultipleSteps = lines.length > 1;

  return (
    <div className="bg-blue-500/10 border-2 border-blue-500/30 rounded-lg p-4 sm:p-5">
      <div className="flex items-center gap-2 text-blue-300 text-base font-semibold mb-3">
        <Zap className="h-5 w-5" />
        Instrument Setup
      </div>

      {hasMultipleSteps ? (
        <ol className="space-y-2.5">
          {lines.map((line, idx) => {
            // Remove existing numbering if present
            const cleanLine = line.replace(/^\d+\.\s*/, '').trim();
            
            return (
              <li key={idx} className="flex items-start gap-3">
                <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold">
                  {idx + 1}
                </span>
                <span className="text-sm sm:text-base text-foreground leading-relaxed flex-1">
                  {cleanLine}
                </span>
              </li>
            );
          })}
        </ol>
      ) : (
        <p className="text-sm sm:text-base text-foreground leading-relaxed">
          {instrumentSetup}
        </p>
      )}

      {/* Common instrument models hint */}
      <div className="mt-4 pt-4 border-t border-border/40">
        <p className="text-xs text-foreground/60">
          💡 Common models: Megger MFT1741, Fluke 1664FC, Kewtech KT65
        </p>
      </div>
    </div>
  );
};
