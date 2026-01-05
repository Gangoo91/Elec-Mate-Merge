import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export const EmergencyLightingSummary4_5 = () => {
  const keyPoints = [
    "Remote testing systems automate monthly function and annual duration tests, reducing labour by 60-80%",
    "Three main types: self-test luminaires, networked systems, and wireless monitoring — each suited to different applications",
    "Digital logs provide time-stamped compliance records, instant fault alerts, and audit-ready documentation meeting BS 5266-8",
    "Best suited for sites with 100+ luminaires, high occupancy risk, or limited maintenance resources (airports, hospitals, universities)",
    "Visual inspections are still required — remote systems cannot detect physical damage, obstructions, or dirt accumulation"
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
          This section covered the role of remote testing and monitoring systems in modern emergency lighting installations:
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
          <h4 className="font-semibold text-elec-yellow mb-3">System Selection Checklist</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-elec-yellow">☐</span>
              <span className="text-foreground">Count total luminaires and assess building complexity</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-elec-yellow">☐</span>
              <span className="text-foreground">Evaluate occupancy risk level and regulatory scrutiny</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-elec-yellow">☐</span>
              <span className="text-foreground">Assess maintenance staff availability and current testing burden</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-elec-yellow">☐</span>
              <span className="text-foreground">Calculate ROI: compare system cost vs labour savings over 10 years</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-elec-yellow">☐</span>
              <span className="text-foreground">Verify luminaire and battery compatibility with chosen system</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-elec-yellow">☐</span>
              <span className="text-foreground">Consider wireless for refurbishments, networked for new builds with high luminaire counts</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-elec-yellow">☐</span>
              <span className="text-foreground">Check client preference for local server vs cloud-based monitoring</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-elec-yellow">☐</span>
              <span className="text-foreground">Plan comprehensive training for building management team</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-elec-yellow">☐</span>
              <span className="text-foreground">Ensure visual inspection schedule remains in place after system commissioning</span>
            </div>
          </div>
        </div>

        <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-4">
          <h4 className="font-semibold text-green-300 mb-2">Compliance Benefits Summary</h4>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-foreground">100% test completion rate</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-foreground">Audit-ready electronic records</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-foreground">Instant failure detection and alerts</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-foreground">BS 5266-8 standard compliance</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-foreground">Reduced enforcement action risk</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-foreground">Predictive maintenance capabilities</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
          <h4 className="font-semibold text-blue-300 mb-2">Key Takeaway for Electricians</h4>
          <p className="text-foreground text-sm">
            Remote testing systems represent the future of emergency lighting maintenance in medium to large installations. 
            Understanding when to recommend these systems — and how to specify, install, and commission them correctly — 
            positions you as a forward-thinking professional offering modern solutions that deliver genuine value to clients. 
            Always remember that automation enhances compliance but does not eliminate the need for skilled electrical 
            expertise and regular visual inspections.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
