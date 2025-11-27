import { Settings } from "lucide-react";
import { Card } from "@/components/ui/card";

interface InstrumentSetupPanelProps {
  instrumentSetup: string;
}

export const InstrumentSetupPanel = ({ instrumentSetup }: InstrumentSetupPanelProps) => {
  // Try to parse structured setup instructions
  const lines = instrumentSetup.split('\n').filter(line => line.trim());
  const hasMultipleSteps = lines.length > 1;

  return (
    <Card className="bg-card border-elec-yellow/20">
      <div className="p-5">
        <div className="flex items-center gap-2 text-white text-base font-semibold mb-3">
          <Settings className="h-5 w-5 text-elec-yellow" />
          Instrument Setup
        </div>

        {hasMultipleSteps ? (
          <ol className="space-y-2.5">
            {lines.map((line, idx) => {
              // Remove existing numbering if present
              const cleanLine = line.replace(/^\d+\.\s*/, '').trim();
              
              return (
                <li key={idx} className="flex items-start gap-3">
                  <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold">
                    {idx + 1}
                  </span>
                  <span className="text-sm sm:text-base text-white/90 leading-relaxed flex-1">
                    {cleanLine}
                  </span>
                </li>
              );
            })}
          </ol>
        ) : (
          <p className="text-sm sm:text-base text-white/90 leading-relaxed">
            {instrumentSetup}
          </p>
        )}

        {/* Common instrument models hint */}
        <div className="mt-4 pt-4 border-t border-elec-yellow/20">
          <p className="text-xs text-white/60">
            Common models: Megger MFT1741, Fluke 1664FC, Kewtech KT65
          </p>
        </div>
      </div>
    </Card>
  );
};
