import { CheckCircle2 } from 'lucide-react';

export const LuminaireComplianceQuickCheck = () => {
  return (
    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 sm:p-6">
      <div className="flex items-start gap-3">
        <CheckCircle2 className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
        <div>
          <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            ✅ Quick Check
          </h4>
          <p className="text-foreground text-sm sm:text-base leading-relaxed">
            <span className="font-semibold">Luminaire compliance verification:</span> Do all luminaires carry CE marking and BS EN 60598-2-22 certification? Are maintained/non-maintained types correct for each location? Have you checked rated duration (1hr or 3hr) matches design requirements? Are battery and lamp types as specified in the design?
          </p>
        </div>
      </div>
    </div>
  );
};
