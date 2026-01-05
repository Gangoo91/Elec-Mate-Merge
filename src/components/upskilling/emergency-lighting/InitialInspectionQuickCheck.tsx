import { CheckCircle2 } from 'lucide-react';

export const InitialInspectionQuickCheck = () => {
  return (
    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 sm:p-6">
      <div className="flex items-start gap-3">
        <CheckCircle2 className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
        <div>
          <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            ✅ Quick Check
          </h4>
          <p className="text-foreground text-sm sm:text-base leading-relaxed">
            <span className="font-semibold">Before starting functional tests:</span> Have you verified all luminaires are correctly positioned per design drawings, confirmed fire-resistant cabling is used throughout, checked circuit protection devices are correctly rated, and documented any installation defects for remedial action?
          </p>
        </div>
      </div>
    </div>
  );
};
