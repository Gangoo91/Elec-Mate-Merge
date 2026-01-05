import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, CheckCircle, Eye, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const BS7671Module5Section6Practical = () => {
  const practicalSteps = [
    {
      title: "Site Environmental Assessment",
      icon: <Eye className="h-4 w-4" />,
      steps: [
        "Conduct thorough site survey before cable selection",
        "Identify all environmental hazards (moisture, chemicals, temperature)",
        "Document environmental conditions using BS7671 codes",
        "Consider future environmental changes (building use, industrial processes)"
      ]
    },
    {
      title: "Cable Selection Process", 
      icon: <CheckCircle className="h-4 w-4" />,
      steps: [
        "Match cable specification to environmental conditions",
        "Verify IP rating requirements for terminations and accessories",
        "Check temperature rating vs ambient conditions",
        "Consider mechanical protection requirements",
        "Verify chemical resistance if applicable"
      ]
    },
    {
      title: "Installation Best Practices",
      icon: <Wrench className="h-4 w-4" />,
      steps: [
        "Use appropriate cable entry methods for IP-rated enclosures",
        "Install cable supports suitable for environmental conditions",
        "Maintain IP rating integrity throughout installation",
        "Apply appropriate sealing methods for harsh environments",
        "Document all environmental protection measures"
      ]
    }
  ];

  const ipGuidance = [
    { rating: "IP20", use: "Dry internal locations only", example: "Domestic consumer units" },
    { rating: "IP44", use: "Protected from splashing water", example: "Bathroom zones 2&3" },
    { rating: "IP54", use: "Limited dust and water jets", example: "Industrial workshops" },
    { rating: "IP65", use: "Dust-tight and water jets", example: "External installations" },
    { rating: "IP66", use: "Heavy seas and dust protection", example: "Marine environments" },
    { rating: "IP67", use: "Temporary immersion protection", example: "Flood-prone areas" },
    { rating: "IP68", use: "Continuous submersion", example: "Underwater installations" }
  ];

  return (
    <div className="space-y-6">
      {/* Practical Implementation Steps */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Wrench className="h-5 w-5 text-elec-yellow" />
            Practical Implementation Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <p>
            Follow this systematic approach to ensure proper environmental protection 
            in accordance with BS7671 requirements.
          </p>
          
          <div className="space-y-6">
            {practicalSteps.map((section, index) => (
              <div key={index} className="bg-elec-dark p-4 rounded-lg border border-gray-600">
                <div className="flex items-center gap-2 mb-4">
                  <div className="text-elec-yellow">{section.icon}</div>
                  <h4 className="font-semibold text-lg">{section.title}</h4>
                </div>
                <div className="space-y-2">
                  {section.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* IP Rating Selection Guide */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground">IP Rating Selection Guide</CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-4">
          <p>
            Select the appropriate IP rating based on the installation environment and BS7671 requirements.
          </p>
          
          <div className="overflow-x-auto">
            <div className="grid gap-3 min-w-full">
              {ipGuidance.map((ip, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 bg-elec-dark rounded-lg border border-gray-600">
                  <Badge variant="secondary" className="bg-elec-yellow text-elec-dark font-bold w-fit">
                    {ip.rating}
                  </Badge>
                  <div className="flex-1">
                    <div className="font-medium">{ip.use}</div>
                    <div className="text-gray-300 text-sm">{ip.example}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-950/20 p-4 rounded-lg border border-blue-800/30 mt-6">
            <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              BS7671 Compliance Note
            </h4>
            <p className="text-gray-300 text-sm">
              BS7671 Regulation 512.2 requires that equipment shall be selected and erected so that 
              its operation is not impaired by the environmental conditions to which it is likely to be exposed.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BS7671Module5Section6Practical;