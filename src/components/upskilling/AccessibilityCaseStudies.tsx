
import { AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const AccessibilityCaseStudies = () => {
  const caseStudies = [
    {
      title: "Commercial Office Block - Suspended Ceiling Issues",
      situation: "Distribution boards installed above suspended ceiling tiles with no proper access panels. Ceiling tiles need to be removed to access boards.",
      problems: ["Fragile ceiling tiles break during access", "Inadequate lighting above ceiling", "Risk of debris falling", "Time-consuming access procedure"],
      solution: "Request client to install proper access panels or relocate boards to accessible positions",
      outcome: "Limitation recorded, return visit arranged after remedial work",
      status: "limitation"
    },
    {
      title: "Retail Unit - Equipment Blocking Access",
      situation: "Consumer unit installed behind large commercial refrigerator that's been moved after installation.",
      problems: ["Heavy equipment difficult to move safely", "Risk of damage to refrigeration pipework", "Potential food safety issues", "Access requires multiple personnel"],
      solution: "Coordinate with client to safely relocate equipment during testing, or install secondary isolation",
      outcome: "Testing completed with client coordination and extra time allowance",
      status: "resolved"
    },
    {
      title: "Residential Property - Missing Circuit Labels",
      situation: "Modern consumer unit with all MCBs present but no circuit identification labels on any protective devices.",
      problems: ["Cannot safely identify circuits", "Risk of incorrect isolation", "Testing accuracy compromised", "Future maintenance difficulties"],
      solution: "Systematic circuit tracing required before testing can commence safely",
      outcome: "Additional time charged to client for circuit identification and labelling",
      status: "resolved"
    },
    {
      title: "Industrial Unit - Height Access Issues",
      situation: "Main distribution board mounted 3.5m high with no fixed access platform. Only portable ladder available on site.",
      problems: ["Unsafe working at height", "Inadequate platform for testing equipment", "Risk of falls during testing", "Poor lighting at working height"],
      solution: "Proper scaffold or mobile elevated work platform required for safe access",
      outcome: "Testing postponed until safe access provided",
      status: "limitation"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'limitation':
        return <XCircle className="h-4 w-4 text-red-400" />;
      default:
        return <Info className="h-4 w-4 text-blue-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'border-green-600/20 bg-green-600/10';
      case 'limitation':
        return 'border-red-600/20 bg-red-600/10';
      default:
        return 'border-blue-600/20 bg-blue-600/10';
    }
  };

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <AlertTriangle className="h-5 w-5 text-elec-yellow" />
          Real-World Case Studies
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-foreground leading-relaxed text-base sm:text-lg">
          These real-world scenarios demonstrate common accessibility and labelling challenges encountered during electrical inspections, 
          along with practical solutions and professional approaches to each situation.
        </p>

        <div className="space-y-6">
          {caseStudies.map((study, index) => (
            <div key={index} className={`rounded-lg border p-6 ${getStatusColor(study.status)}`}>
              <div className="flex items-start gap-3 mb-4">
                {getStatusIcon(study.status)}
                <div className="flex-1">
                  <h3 className="text-foreground font-semibold text-lg mb-2">{study.title}</h3>
                  <p className="text-foreground text-sm leading-relaxed">{study.situation}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-foreground font-medium mb-2">Key Problems Identified</h4>
                  <ul className="space-y-1">
                    {study.problems.map((problem, problemIndex) => (
                      <li key={problemIndex} className="text-foreground text-sm flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        {problem}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-foreground font-medium mb-2">Professional Solution</h4>
                  <p className="text-foreground text-sm leading-relaxed">{study.solution}</p>
                </div>
              </div>

              <div className="border-t border-gray-600/30 pt-3">
                <h4 className="text-foreground font-medium mb-2">Outcome</h4>
                <p className="text-foreground text-sm">{study.outcome}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
          <h3 className="text-blue-200 font-medium mb-3 flex items-center gap-2">
            <Info className="h-4 w-4" />
            Key Learning Points
          </h3>
          <ul className="space-y-2 text-foreground text-sm sm:text-base">
            <li>• Always assess accessibility before beginning any testing procedures</li>
            <li>• Document limitations clearly and communicate with clients immediately</li>
            <li>• Never compromise safety for the sake of completing a test</li>
            <li>• Build contingency time into schedules for accessibility issues</li>
            <li>• Maintain professional standards even under commercial pressure</li>
            <li>• Consider liability implications of incomplete testing due to poor access</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
