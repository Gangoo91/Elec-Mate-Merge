import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookmarkCheck, CheckCircle } from 'lucide-react';

export const EmergencyLightingSummary4_3 = () => {
  return (
    <Card className="bg-slate-200/20 border-slate-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookmarkCheck className="h-5 w-5 text-elec-yellow" />
          Section Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p className="leading-relaxed">
          Battery sizing and autonomy duration are critical factors in emergency lighting system reliability. 
          Correct calculations, accounting for real-world conditions and building-specific requirements, ensure 
          occupant safety during evacuations.
        </p>

        <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4">
          <h4 className="font-semibold text-elec-yellow mb-3">Key Takeaways</h4>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm">
                Autonomy duration must be based on evacuation time assessment, not arbitrary selection
              </p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm">
                Battery capacity calculations must include correction factors for ageing, temperature, and efficiency
              </p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm">
                Self-contained and central battery systems have different sizing considerations
              </p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm">
                Voltage drop must be considered in central battery system cable calculations
              </p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm">
                Regular testing and maintenance ensure batteries maintain required performance
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
          <h4 className="font-semibold text-blue-300 mb-3">Battery Sizing Checklist</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-elec-yellow">✓</span>
              <span>Determine required autonomy duration based on building type and evacuation assessment</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-elec-yellow">✓</span>
              <span>Calculate total load including luminaires, emergency drivers, and any conversion losses</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-elec-yellow">✓</span>
              <span>Apply correction factors for battery ageing (typically 25-30%)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-elec-yellow">✓</span>
              <span>Consider operating temperature and apply appropriate capacity adjustments</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-elec-yellow">✓</span>
              <span>For central systems, calculate and verify voltage drop to furthest luminaire</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-elec-yellow">✓</span>
              <span>Select appropriate battery technology for application and environment</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-elec-yellow">✓</span>
              <span>Verify recharge time meets BS 5266-1 requirement (24 hours)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-elec-yellow">✓</span>
              <span>Document calculations and specifications for future reference and audits</span>
            </div>
          </div>
        </div>

        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
          <p className="text-elec-yellow font-medium">
            <strong>Compliance Standard:</strong> All battery sizing must comply with BS 5266-1 and BS EN 50171, 
            with calculations documented and available for inspection during fire safety audits.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
