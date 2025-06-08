
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, AlertCircle, CheckCircle, Clock, MapPin, Users } from "lucide-react";
import { useState } from "react";

const CaseStudiesTab = () => {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);

  const caseStudies = [
    {
      id: "factory-fire",
      title: "Electrical Fire at Manufacturing Plant",
      date: "March 2023",
      location: "West Midlands",
      severity: "Major",
      outcome: "No injuries",
      industry: "Manufacturing",
      description: "A major electrical fire caused by overloaded circuits and inadequate maintenance procedures at a food processing facility.",
      incident: {
        what: "An electrical panel fire occurred during peak production hours, triggered by overloaded circuits that had been operating beyond capacity for several months.",
        when: "Tuesday morning, 09:45 during shift change",
        where: "Main electrical distribution board in production area",
        why: "Poor maintenance, overloaded circuits, inadequate monitoring"
      },
      investigation: [
        "Circuit loading was 150% of rated capacity",
        "Maintenance records showed missed inspections",
        "Thermal imaging had not been conducted for 18 months",
        "Staff reported smell of burning for several days prior",
        "Emergency procedures were not followed correctly"
      ],
      lessons: [
        "Regular thermal imaging prevents overheating",
        "Load monitoring prevents circuit overloading", 
        "Maintenance schedules must be strictly followed",
        "Staff concerns should be investigated immediately",
        "Emergency response training saves lives and property"
      ],
      preventive: [
        "Implement monthly thermal imaging surveys",
        "Install load monitoring on all main circuits",
        "Establish clear maintenance schedules with accountability",
        "Create reporting system for early warning signs",
        "Conduct regular emergency response drills"
      ]
    },
    {
      id: "apprentice-shock",
      title: "Apprentice Electric Shock Incident",
      date: "January 2023", 
      location: "London",
      severity: "Serious",
      outcome: "Hospitalised",
      industry: "Commercial",
      description: "A first-year apprentice received an electric shock while working on office lighting installations due to inadequate supervision.",
      incident: {
        what: "Apprentice contacted live 230V conductor while installing lighting circuit in suspended ceiling",
        when: "Friday afternoon, 15:30 near end of working week",
        where: "Office building suspended ceiling space",
        why: "Inadequate supervision, rushed work, failed isolation verification"
      },
      investigation: [
        "Circuit isolation was not properly verified",
        "Supervisor was attending to other tasks",
        "Apprentice worked alone in ceiling space",
        "Prove dead test was not conducted",
        "Emergency response was delayed by 3 minutes"
      ],
      lessons: [
        "Apprentices must never work unsupervised on live systems",
        "Isolation procedures must be verified by competent person",
        "Prove dead testing is mandatory, not optional",
        "Communication systems essential in confined spaces",
        "Emergency response procedures must be practiced"
      ],
      preventive: [
        "Mandatory supervision ratios for apprentices",
        "Electronic lock-off systems with verification",
        "Communication devices for isolated workers",
        "Regular competency assessments",
        "Immediate first aid training for all staff"
      ]
    },
    {
      id: "arc-flash-incident",
      title: "Arc Flash During Maintenance",
      date: "September 2022",
      location: "Scotland",
      severity: "Critical",
      outcome: "Severe burns",
      industry: "Heavy Industry",
      description: "Maintenance engineer suffered severe burns from arc flash while working on 11kV switchgear without appropriate PPE.",
      incident: {
        what: "Arc flash occurred during routine maintenance on 11kV switchgear when engineer contacted busbar",
        when: "Monday morning during planned maintenance window",
        where: "Primary electrical substation",
        why: "Inadequate PPE, procedural failure, risk assessment gap"
      },
      investigation: [
        "Arc flash risk assessment was outdated",
        "PPE specification was incorrect for voltage level",
        "Maintenance procedure had not been updated",
        "Engineer did not follow prescribed safe working distance",
        "Arc flash incident energy was not calculated"
      ],
      lessons: [
        "Arc flash assessments must be current and accurate",
        "PPE must match calculated incident energy levels",
        "Procedures must be reviewed and updated regularly",
        "Safe working distances are not suggestions",
        "Incident energy calculations save lives"
      ],
      preventive: [
        "Annual arc flash risk assessments",
        "PPE matching to specific incident energy levels",
        "Regular procedure reviews and updates",
        "Remote operating tools where possible",
        "Comprehensive arc flash awareness training"
      ]
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Minor": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Serious": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Major": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "Critical": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Real-World Case Studies</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Learn from real electrical safety incidents that have occurred in the UK electrical industry. 
            These detailed case studies provide valuable insights into what went wrong and how similar incidents can be prevented.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400 mb-1">
                {caseStudies.filter(c => c.severity === "Critical").length}
              </div>
              <div className="text-sm text-muted-foreground">Critical Incidents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400 mb-1">
                {caseStudies.filter(c => c.severity === "Major" || c.severity === "Serious").length}
              </div>
              <div className="text-sm text-muted-foreground">Major/Serious</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow mb-1">
                {caseStudies.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Cases</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {caseStudies.map((caseStudy) => (
          <Card key={caseStudy.id} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-white mb-2">{caseStudy.title}</CardTitle>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge className={getSeverityColor(caseStudy.severity)}>
                      {caseStudy.severity}
                    </Badge>
                    <Badge variant="outline" className="text-muted-foreground">
                      {caseStudy.industry}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {caseStudy.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {caseStudy.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {caseStudy.outcome}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{caseStudy.description}</p>
              
              <Button
                variant="outline"
                onClick={() => setSelectedCase(selectedCase === caseStudy.id ? null : caseStudy.id)}
                className="w-full"
              >
                {selectedCase === caseStudy.id ? "Hide Details" : "View Full Case Study"}
              </Button>

              {selectedCase === caseStudy.id && (
                <div className="space-y-6 border-t border-elec-yellow/20 pt-6 mt-4">
                  <div>
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-400" />
                      Incident Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm font-medium text-white">What happened:</span>
                        <p className="text-sm text-muted-foreground mt-1">{caseStudy.incident.what}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-white">When:</span>
                        <p className="text-sm text-muted-foreground mt-1">{caseStudy.incident.when}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-white">Where:</span>
                        <p className="text-sm text-muted-foreground mt-1">{caseStudy.incident.where}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-white">Why:</span>
                        <p className="text-sm text-muted-foreground mt-1">{caseStudy.incident.why}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-3">Investigation Findings</h4>
                    <ul className="space-y-2">
                      {caseStudy.investigation.map((finding, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                          {finding}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Key Lessons Learned
                    </h4>
                    <ul className="space-y-2">
                      {caseStudy.lessons.map((lesson, index) => (
                        <li key={index} className="text-sm text-green-300 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                          {lesson}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-3">Preventive Measures</h4>
                    <ul className="space-y-2">
                      {caseStudy.preventive.map((measure, index) => (
                        <li key={index} className="text-sm text-blue-300 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                          {measure}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-orange-500/20 bg-orange-500/10">
        <CardHeader>
          <CardTitle className="text-orange-300 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Learning from Real Incidents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            These case studies are based on real incidents reported to the HSE and industry safety organisations. 
            Learning from others' experiences is one of the most effective ways to prevent similar incidents in your own work.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-white mb-2">Study Approach</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Analyse the sequence of events</li>
                <li>• Identify multiple contributing factors</li>
                <li>• Understand human and system failures</li>
                <li>• Apply lessons to your own workplace</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Discussion Points</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• How could this have been prevented?</li>
                <li>• What warning signs were missed?</li>
                <li>• How do our procedures compare?</li>
                <li>• What changes should we make?</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CaseStudiesTab;
