import { CheckCircle2 } from 'lucide-react';

export const VisualChecksQuickCheck = () => {
  return (
    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 sm:p-6">
      <div className="flex items-start gap-3">
        <CheckCircle2 className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
        <div>
          <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            ✅ Quick Check
          </h4>
          <p className="text-foreground text-sm sm:text-base leading-relaxed">
            <span className="font-semibold">Visual inspection checklist:</span> Are all luminaires securely mounted with no visible damage? Are safety labels present and legible? Is the viewing distance and mounting height correct for escape route signs? Have you checked for correct luminaire types in each location?
          </p>
        </div>
      </div>
    </div>
  );
};
