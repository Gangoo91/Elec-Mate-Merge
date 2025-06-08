
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Target, Users } from "lucide-react";

const CaseStudiesTab = () => {
  const caseStudies = [
    {
      title: "The Mis-wired Consumer Unit",
      apprentice: "Jamie, 1st Year Apprentice",
      category: "Technical Error",
      severity: "High",
      scenario: {
        background: "Jamie was tasked with connecting circuits in a new consumer unit during a house rewire. Eager to impress, Jamie worked quickly and didn't double-check the circuit labelling.",
        mistake: "Connected the upstairs lighting circuit to a 32A MCB instead of a 6A MCB, and connected the ring main to the 6A breaker.",
        discovery: "During testing, the upstairs lights wouldn't work, and the ring main kept tripping immediately."
      },
      impact: {
        immediate: ["Lights wouldn't function", "Ring circuit constantly tripping", "Half day's work lost"],
        potential: ["Fire risk from undersized protection", "Damage to lighting circuits", "Failed inspection"]
      },
      recovery: {
        steps: [
          "Immediately isolated the entire consumer unit",
          "Called supervisor to report the error honestly",
          "Together, methodically checked every connection",
          "Re-terminated all circuits with proper labelling",
          "Conducted thorough testing of all circuits"
        ],
        timeImpact: "4 hours to correct",
        cost: "£50 in supervisor time"
      },
      lessons: [
        "Always double-check circuit schedules against actual connections",
        "Label cables clearly during first fix to prevent confusion",
        "Test each circuit individually before energising the board",
        "When in doubt, ask rather than guess",
        "Rushing quality work always costs more time in the end"
      ],
      outcome: "Jamie developed a systematic checking procedure and never repeated this type of error. The supervisor appreciated the honest reporting and used it as a training example for other apprentices."
    },
    {
      title: "The Emergency Stop Incident",
      apprentice: "Alex, 3rd Year Apprentice",
      category: "Safety Procedure",
      severity: "Critical",
      scenario: {
        background: "Alex was working on industrial machinery commissioning and needed to test motor operation. The usual supervisor was off sick, and Alex felt confident to proceed alone.",
        mistake: "Bypassed the emergency stop circuit 'temporarily' to test the motor, but forgot to reconnect it before declaring the work complete.",
        discovery: "During final commissioning, the client's engineer discovered the bypassed emergency stop during safety checks."
      },
      impact: {
        immediate: ["Work failed final inspection", "Client lost confidence in company", "Mandatory safety retraining"],
        potential: ["Serious injury if emergency occurred", "Legal liability for company", "Contract termination"]
      },
      recovery: {
        steps: [
          "Immediately admitted the bypass and reasoning",
          "Assisted in full safety system check",
          "Attended emergency safety retraining course",
          "Developed personal safety checklist for all future work",
          "Agreed to work under closer supervision until confidence restored"
        ],
        timeImpact: "2 days additional work",
        cost: "£800 in delays and retraining"
      },
      lessons: [
        "Safety systems must never be bypassed, even temporarily",
        "Always work with proper supervision on critical systems",
        "Use systematic checklists for safety-critical work",
        "If you don't know proper procedure, stop and ask",
        "Professional reputation takes years to build, seconds to damage"
      ],
      outcome: "Alex completed apprenticeship successfully but with renewed respect for safety procedures. Now mentors other apprentices on safety culture and has never had another safety incident."
    },
    {
      title: "The Cable Calculation Error",
      apprentice: "Sam, 2nd Year Apprentice",
      category: "Design Calculation",
      severity: "Medium",
      scenario: {
        background: "Sam was asked to calculate cable sizes for a small commercial installation. Having recently covered the theory, Sam felt confident to work independently.",
        mistake: "Used incorrect derating factors and didn't account for grouping, resulting in undersized cables for the load.",
        discovery: "During routine inspection, the building control officer questioned the cable sizes and asked to see the calculations."
      },
      impact: {
        immediate: ["Installation failed inspection", "All undersized cables needed replacement", "Project delayed by one week"],
        potential: ["Cable overheating and fire risk", "Insurance issues if problem not caught", "Prosecution under Building Regulations"]
      },
      recovery: {
        steps: [
          "Recalculated all cable sizes with supervisor oversight",
          "Ordered correct cables and scheduled replacement",
          "Reviewed calculation methodology with training officer",
          "Created reference sheets for future cable calculations",
          "Practiced similar calculations until confident"
        ],
        timeImpact: "5 days additional work",
        cost: "£400 in cable replacement plus labour"
      },
      lessons: [
        "Always have calculations checked by qualified person",
        "Understand all factors affecting cable sizing",
        "Create systematic calculation procedures",
        "Know when to seek help rather than guess",
        "Keep reference materials easily accessible"
      ],
      outcome: "Sam became very methodical with calculations and eventually became the go-to person for complex cable sizing in the company. The mistake became a valuable learning foundation."
    }
  ];

  const recoveryMetrics = [
    { metric: "Average Recovery Time", value: "4.3 hours", description: "Time to fully resolve typical apprentice mistakes" },
    { metric: "Learning Retention", value: "94%", description: "Apprentices who don't repeat similar mistakes after proper recovery" },
    { metric: "Career Impact", value: "Minimal", description: "Long-term effect on career progression when handled professionally" },
    { metric: "Supervisor Trust", value: "Increased", description: "Trust levels after honest mistake reporting and good recovery" }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Real Apprentice Case Studies</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {caseStudies.map((study, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white">{study.title}</h3>
                    <p className="text-sm text-muted-foreground">{study.apprentice}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="border-blue-500/40 text-blue-400">
                      {study.category}
                    </Badge>
                    <Badge 
                      variant={study.severity === 'Critical' ? 'destructive' : study.severity === 'High' ? 'destructive' : 'outline'}
                      className={study.severity === 'Medium' ? 'border-amber-500/40 text-amber-400' : ''}
                    >
                      {study.severity}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Scenario */}
                  <div className="bg-black/20 rounded-lg p-4">
                    <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-400" />
                      What Happened
                    </h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p><strong>Background:</strong> {study.scenario.background}</p>
                      <p><strong>The Mistake:</strong> {study.scenario.mistake}</p>
                      <p><strong>Discovery:</strong> {study.scenario.discovery}</p>
                    </div>
                  </div>

                  {/* Impact */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                      <h4 className="font-medium text-red-300 mb-2">Impact</h4>
                      <div className="space-y-2">
                        <div>
                          <h5 className="text-sm font-medium text-white">Immediate:</h5>
                          <ul className="text-sm text-muted-foreground">
                            {study.impact.immediate.map((item, i) => (
                              <li key={i}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-white">Potential:</h5>
                          <ul className="text-sm text-muted-foreground">
                            {study.impact.potential.map((item, i) => (
                              <li key={i}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                      <h4 className="font-medium text-blue-300 mb-2">Recovery Process</h4>
                      <div className="space-y-2">
                        <ol className="text-sm text-muted-foreground space-y-1">
                          {study.recovery.steps.map((step, i) => (
                            <li key={i}>{i + 1}. {step}</li>
                          ))}
                        </ol>
                        <div className="pt-2 border-t border-blue-500/30">
                          <p className="text-sm"><strong>Time:</strong> {study.recovery.timeImpact}</p>
                          <p className="text-sm"><strong>Cost:</strong> {study.recovery.cost}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Lessons */}
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <h4 className="font-medium text-green-300 mb-2 flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Key Lessons Learned
                    </h4>
                    <ul className="space-y-1">
                      {study.lessons.map((lesson, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                          {lesson}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Outcome */}
                  <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
                    <h4 className="font-medium text-elec-yellow mb-2">Long-term Outcome</h4>
                    <p className="text-sm text-muted-foreground">{study.outcome}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Recovery Success Metrics</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recoveryMetrics.map((metric, index) => (
              <div key={index} className="text-center p-4 border border-elec-yellow/20 rounded-lg">
                <div className="text-2xl font-bold text-elec-yellow mb-1">{metric.value}</div>
                <div className="font-medium text-white mb-2">{metric.metric}</div>
                <div className="text-sm text-muted-foreground">{metric.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300">The Common Thread</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            In every successful recovery story, the apprentice took ownership of the mistake, 
            communicated honestly with supervisors, learned systematically from the error, 
            and implemented changes to prevent recurrence. These case studies show that 
            mistakes, when handled professionally, become the foundation of expertise and 
            professional credibility.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CaseStudiesTab;
