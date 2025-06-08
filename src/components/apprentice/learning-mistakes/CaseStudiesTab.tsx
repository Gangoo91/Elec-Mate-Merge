
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, BookOpen, ExternalLink } from "lucide-react";
import { useState } from "react";

const CaseStudiesTab = () => {
  const [selectedCase, setSelectedCase] = useState<number | null>(null);

  const caseStudies = [
    {
      id: 1,
      title: "The Wrong Circuit Breaker",
      category: "Technical Error",
      severity: "Moderate",
      scenario: "Jamie, a second-year apprentice, was tasked with replacing a faulty 20A MCB in a domestic consumer unit. In a rush to finish before lunch, Jamie grabbed what looked like the right breaker from the van and installed it without checking the rating. It was actually a 32A MCB.",
      discovery: "During testing, the electrician noticed the wrong rating and questioned Jamie about it. The error was caught before the installation was energised.",
      consequences: [
        "Circuit would have been overprotected",
        "Potential fire risk from cable overload",
        "Non-compliance with BS 7671",
        "Time lost replacing the correct MCB"
      ],
      lessons: [
        "Always verify component ratings before installation",
        "Rushing leads to mistakes - plan time properly",
        "Double-check work before calling for inspection",
        "Keep different ratings clearly separated in van stock"
      ],
      outcome: "Jamie implemented a labelling system in the van and created a pre-installation checklist. No similar errors occurred in the following 6 months.",
      prevention: "Use proper lighting in van, organise stock clearly, and always verify ratings"
    },
    {
      id: 2,
      title: "The Live Working Incident",
      category: "Safety Violation",
      severity: "Serious",
      scenario: "Alex was changing a faulty socket outlet in an office. The socket appeared dead (no power to a plugged-in device), so Alex assumed it was safe to work on without proper isolation. Unknown to Alex, the socket was on a different circuit that was still live.",
      discovery: "When Alex touched the live terminal while unscrewing the faceplate, there was an arc flash. Fortunately, Alex was wearing safety glasses and wasn't seriously injured, but it was a close call.",
      consequences: [
        "Risk of electrocution or serious burns",
        "Arc flash could have caused eye injury",
        "Potential for fire in the workplace",
        "Regulatory investigation possible"
      ],
      lessons: [
        "Never assume a circuit is dead without proper testing",
        "Use approved voltage indicators and test them",
        "Follow the isolation procedure completely",
        "PPE can prevent serious injury"
      ],
      outcome: "Alex attended additional safety training and now uses proper isolation procedures religiously. This experience reinforced the importance of safety protocols.",
      prevention: "Always test for dead, use proper PPE, follow isolation procedures without exception"
    },
    {
      id: 3,
      title: "The Communication Breakdown",
      category: "Communication",
      severity: "Minor",
      scenario: "Morgan was working on a lighting circuit and needed to isolate the supply. Morgan told the site supervisor 'I'm turning off the lights for a bit' but didn't specify which lights or for how long. The supervisor assumed it was just for 10 minutes.",
      discovery: "After 45 minutes, office workers complained they couldn't work in the dark. The supervisor came looking for Morgan, frustrated about the lack of communication.",
      consequences: [
        "Disrupted office productivity",
        "Frustrated building occupants",
        "Strained relationship with client",
        "Poor reflection on the company"
      ],
      lessons: [
        "Be specific when communicating about work impacts",
        "Provide time estimates and regular updates",
        "Consider the client's business needs",
        "Establish clear communication protocols"
      ],
      outcome: "Morgan learned to provide detailed work schedules and regular updates. Client relationships improved significantly.",
      prevention: "Clear communication plans, regular updates, and consideration for building users"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Serious':
        return 'destructive';
      case 'Moderate':
        return 'default';
      case 'Minor':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Real Apprentice Case Studies</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {caseStudies.map((caseStudy) => (
              <div
                key={caseStudy.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all hover:bg-white/5 ${
                  selectedCase === caseStudy.id ? 'border-elec-yellow bg-elec-yellow/10' : 'border-elec-yellow/20'
                }`}
                onClick={() => setSelectedCase(selectedCase === caseStudy.id ? null : caseStudy.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-white text-sm">{caseStudy.title}</h3>
                  <Badge variant={getSeverityColor(caseStudy.severity)} className="text-xs">
                    {caseStudy.severity}
                  </Badge>
                </div>
                
                <Badge variant="outline" className="mb-3 text-xs border-elec-yellow/40 text-elec-yellow">
                  {caseStudy.category}
                </Badge>
                
                <p className="text-xs text-muted-foreground line-clamp-3">
                  {caseStudy.scenario}
                </p>
                
                {selectedCase === caseStudy.id && (
                  <Button
                    size="sm"
                    className="mt-3 w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      // This would open a detailed view
                    }}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View Full Case
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedCase && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-elec-yellow">
              {caseStudies.find(c => c.id === selectedCase)?.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const currentCase = caseStudies.find(c => c.id === selectedCase);
              if (!currentCase) return null;

              return (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-white mb-2">The Scenario</h4>
                    <p className="text-sm text-muted-foreground">{currentCase.scenario}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">How It Was Discovered</h4>
                    <p className="text-sm text-muted-foreground">{currentCase.discovery}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-orange-300 mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Consequences
                      </h4>
                      <ul className="space-y-1">
                        {currentCase.consequences.map((consequence, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                            <div className="w-1 h-1 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                            {consequence}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-green-300 mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Lessons Learned
                      </h4>
                      <ul className="space-y-1">
                        {currentCase.lessons.map((lesson, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                            <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                            {lesson}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-blue-300 mb-2">Final Outcome</h4>
                    <p className="text-sm text-muted-foreground">{currentCase.outcome}</p>
                  </div>

                  <div className="bg-elec-yellow/10 p-4 rounded-lg">
                    <h4 className="font-semibold text-elec-yellow mb-2">Prevention Strategy</h4>
                    <p className="text-sm text-muted-foreground">{currentCase.prevention}</p>
                  </div>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CaseStudiesTab;
