import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Building, AlertCircle } from 'lucide-react';

export const EmergencyLightingRealWorldSection2_1 = () => {
  const caseStudies = [
    {
      title: "Office Complex Escape Route Design",
      type: "Commercial",
      challenge: "Multi-storey office building with complex escape routes and varying ceiling heights",
      solution: "Implemented comprehensive escape lighting with LED luminaires at 2.5m intervals in corridors, dedicated stairwell lighting at each level change, and enhanced illumination at direction changes.",
      outcome: "Achieved full BS 5266 compliance with 95% energy savings compared to fluorescent alternatives"
    },
    {
      title: "Hospital Patient Area Lighting",
      type: "Healthcare", 
      challenge: "24/7 healthcare facility requiring 3-hour duration emergency lighting in patient areas",
      solution: "Installed maintained emergency lighting system with central battery backup, providing seamless transition during power failures and extended duration for patient safety.",
      outcome: "Ensured patient safety during emergency evacuations with reliable 3-hour emergency lighting provision"
    }
  ];

  return (
    <Card className="bg-elec-gray/30 border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <MapPin className="h-5 w-5 text-elec-yellow" />
          Real-World Applications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseStudies.map((study, index) => (
            <div key={index} className="bg-elec-dark/50 rounded-lg p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-foreground font-semibold">{study.title}</h3>
                <Badge className="bg-elec-yellow/20 text-elec-yellow text-xs">
                  {study.type}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="text-gray-300 font-medium text-sm mb-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Challenge:
                  </h4>
                  <p className="text-gray-400 text-sm">{study.challenge}</p>
                </div>
                
                <div>
                  <h4 className="text-gray-300 font-medium text-sm mb-1 flex items-center gap-1">
                    <Building className="h-3 w-3" />
                    Solution:
                  </h4>
                  <p className="text-gray-400 text-sm">{study.solution}</p>
                </div>
                
                <div className="bg-elec-yellow/10 rounded p-3">
                  <h4 className="text-elec-yellow font-medium text-sm mb-1">Outcome:</h4>
                  <p className="text-gray-300 text-sm">{study.outcome}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
          <h3 className="text-elec-yellow font-medium mb-2">Key Implementation Points:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div>
              <p><strong>Planning:</strong> Early design integration saves costs and ensures compliance</p>
              <p><strong>Technology:</strong> LED systems offer superior performance and longevity</p>
            </div>
            <div>
              <p><strong>Testing:</strong> Regular testing schedules ensure system reliability</p>
              <p><strong>Maintenance:</strong> Preventive maintenance reduces failure rates</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};