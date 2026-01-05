import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export const EmergencyLightingModule5Section1Summary = () => {
  const keyPoints = [
    "Initial inspection and verification is mandatory before energising emergency lighting systems — it identifies defects and ensures compliance with BS 5266-1 and BS 7671",
    "Systematic inspection sequence: Document review → Visual inspection → Electrical testing → Luminaire verification → Documentation",
    "Critical visual checks include cable types, non-combustible fixings (BS 7671 Reg. 521.10.202), circuit segregation, luminaire positioning, and signage orientation",
    "Mandatory electrical tests: Continuity (R1+R2), Insulation Resistance (minimum 1MΩ), Polarity verification, and Earth Fault Loop Impedance (Zs)",
    "Comprehensive documentation (photographs, test results, defect registers) protects all parties and forms the basis for certification and handover"
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground">
          This section covered the essential procedures for initial inspection and verification of emergency lighting installations:
        </p>
        
        <div className="space-y-3">
          {keyPoints.map((point, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-foreground">{point}</span>
            </div>
          ))}
        </div>

        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4 mt-6">
          <h4 className="font-semibold text-elec-yellow mb-3">Inspection Readiness Checklist</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-elec-yellow">☐</span>
              <span className="text-foreground">Obtain complete set of approved design drawings and specifications</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-elec-yellow">☐</span>
              <span className="text-foreground">Review luminaire schedule, cable specifications, and circuit arrangements</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-elec-yellow">☐</span>
              <span className="text-foreground">Prepare inspection checklist and defect register forms</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-elec-yellow">☐</span>
              <span className="text-foreground">Ensure calibrated multifunction tester available with valid certificate</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-elec-yellow">☐</span>
              <span className="text-foreground">Bring camera/phone for photographic documentation</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-elec-yellow">☐</span>
              <span className="text-foreground">Confirm safe access to all areas (ladders, working at height equipment)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-elec-yellow">☐</span>
              <span className="text-foreground">Verify system isolation before commencing electrical testing</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-elec-yellow">☐</span>
              <span className="text-foreground">Allow adequate time for thorough inspection (don't rush)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-elec-yellow">☐</span>
              <span className="text-foreground">Plan re-inspection schedule for defect rectification verification</span>
            </div>
          </div>
        </div>

        <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-4">
          <h4 className="font-semibold text-green-300 mb-2">Compliance Benefits Summary</h4>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-foreground">Prevents dangerous defects from remaining hidden</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-foreground">Ensures BS 5266-1 and BS 7671 compliance</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-foreground">Identifies defects before costly commissioning</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-foreground">Provides evidence for certification</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-foreground">Protects contractor from liability claims</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-foreground">Reduces project risk and delays</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
          <h4 className="font-semibold text-blue-300 mb-2">Key Takeaway for Electricians</h4>
          <p className="text-foreground text-sm">
            Initial inspection and verification is your professional responsibility to ensure emergency lighting 
            installations are safe, compliant, and fit for purpose. Never skip this critical stage — the defects 
            you identify now could prevent system failure during an actual emergency evacuation when lives depend 
            on proper operation. Thorough inspection protects building occupants, your professional reputation, and 
            all project stakeholders from the serious consequences of non-compliant installations.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};