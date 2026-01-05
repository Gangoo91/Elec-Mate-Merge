import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export const EmergencyLightingModule5Section2Summary = () => {
  const keyPoints = [
    "Functional tests (monthly, 30-60 seconds) verify emergency mode switching and battery charging without significantly depleting battery capacity",
    "Annual 3-hour duration tests are mandatory to verify batteries can sustain illumination for the full rated period under BS 5266-1 requirements",
    "Duration tests must be scheduled outside occupied hours due to 3-hour test period plus 24-hour minimum recharge time before system returns to full capacity",
    "Common test failures include: battery capacity degradation (40-90 minute failures), non-switching to emergency mode (wiring faults), and inadequate illumination levels (wrong luminaire types or spacing)",
    "Comprehensive documentation is critical — logbooks, lux measurements at intervals, photographic evidence of failures, and clear client reporting protect all parties and demonstrate compliance"
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
          This section covered the essential procedures for functional testing and 3-hour duration testing of emergency lighting systems:
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
          <h4 className="font-semibold text-elec-yellow mb-3">Testing Readiness Checklist</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-elec-yellow">☐</span>
              <span className="text-foreground">Batteries fully charged for 24 hours before duration tests</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-elec-yellow">☐</span>
              <span className="text-foreground">Calibrated lux meter available with current certificate</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-elec-yellow">☐</span>
              <span className="text-foreground">Emergency lighting logbook prepared with luminaire reference numbers</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-elec-yellow">☐</span>
              <span className="text-foreground">Building occupants notified minimum 7 days in advance</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-elec-yellow">☐</span>
              <span className="text-foreground">Duration tests scheduled outside occupied hours</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-elec-yellow">☐</span>
              <span className="text-foreground">Camera/phone ready for documenting test results and failures</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-elec-yellow">☐</span>
              <span className="text-foreground">Accurate timer/stopwatch for 3-hour test monitoring</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-elec-yellow">☐</span>
              <span className="text-foreground">Access equipment available for high-mounted luminaires</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-elec-yellow">☐</span>
              <span className="text-foreground">Client report template prepared for test findings</span>
            </div>
          </div>
        </div>

        <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-4">
          <h4 className="font-semibold text-green-300 mb-2">Compliance Benefits Summary</h4>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-foreground">Verifies system readiness for real emergencies</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-foreground">Meets BS 5266-1 and BS 5266-8 requirements</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-foreground">Identifies battery degradation before failures</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-foreground">Provides documented evidence for insurers</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-foreground">Protects vulnerable building occupants</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-foreground">Reduces liability for building owners</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
          <h4 className="font-semibold text-blue-300 mb-2">Key Takeaway for Electricians</h4>
          <p className="text-foreground text-sm">
            Functional testing and duration testing are complementary — not alternatives. Monthly functional tests provide quick verification of system operation, but annual 3-hour duration tests are the only way to prove battery capacity meets regulatory requirements. The Leeds care home case study demonstrates the life-safety consequences of relying solely on short tests without comprehensive annual verification. Proper testing schedules, calibrated equipment, and thorough documentation are non-negotiable requirements for emergency lighting compliance.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
