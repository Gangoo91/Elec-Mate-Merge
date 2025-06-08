
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FileText, AlertTriangle, Users, Calendar } from "lucide-react";

const CaseStudiesTab = () => {
  const caseStudies = [
    {
      title: "Fatal Arc Flash Incident - Industrial Facility",
      date: "March 2023",
      location: "Manufacturing Plant, Birmingham",
      severity: "Fatal",
      category: "Arc Flash",
      description: "Investigation into a fatal arc flash incident during maintenance work on a 11kV switchgear.",
      keyLearnings: ["Inadequate PPE selection", "Lack of arc flash risk assessment", "Insufficient training"],
      preventiveMeasures: ["Comprehensive arc flash studies", "Appropriate PPE programs", "Enhanced training protocols"],
      regulations: ["Electricity at Work Regulations 1989", "CDM Regulations 2015"]
    },
    {
      title: "Electric Shock from Faulty RCD",
      date: "January 2023",
      location: "Residential Property, Manchester",
      severity: "Serious",
      category: "Electric Shock",
      description: "Apprentice received electric shock due to faulty RCD protection on a domestic installation.",
      keyLearnings: ["Importance of regular RCD testing", "Visual inspection limitations", "Emergency response procedures"],
      preventiveMeasures: ["Monthly RCD testing", "Portable RCD for additional protection", "First aid training"],
      regulations: ["BS 7671:2018", "Electricity at Work Regulations 1989"]
    },
    {
      title: "Lockout/Tagout Failure",
      date: "November 2022",
      location: "Commercial Building, London",
      severity: "Near Miss",
      category: "Isolation Procedures",
      description: "Near miss incident caused by improper lockout/tagout procedures during maintenance.",
      keyLearnings: ["Communication breakdown", "Inadequate isolation verification", "Rushed work practices"],
      preventiveMeasures: ["Enhanced LOTO procedures", "Double verification systems", "Improved communication protocols"],
      regulations: ["BS EN 50110", "Electricity at Work Regulations 1989"]
    },
    {
      title: "Overhead Line Contact",
      date: "September 2022",
      location: "Construction Site, Leeds",
      severity: "Fatal",
      category: "Overhead Lines",
      description: "Fatal incident involving contact with overhead power lines during crane operations.",
      keyLearnings: ["Inadequate site planning", "Lack of exclusion zones", "Poor communication with DNO"],
      preventiveMeasures: ["Comprehensive site surveys", "Proper exclusion zones", "DNO coordination"],
      regulations: ["HSG47 Avoiding Danger from Overhead Power Lines", "CDM Regulations 2015"]
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Fatal": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "Serious": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "Near Miss": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
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
          <p className="text-muted-foreground">
            Learn from real incidents and near-misses in the electrical industry. These case studies provide 
            valuable insights into what can go wrong and how to prevent similar incidents.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {caseStudies.map((study, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-white text-lg mb-2">{study.title}</CardTitle>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge className={getSeverityColor(study.severity)}>
                      {study.severity}
                    </Badge>
                    <Badge variant="outline" className="text-muted-foreground">
                      {study.category}
                    </Badge>
                    <Badge variant="outline" className="text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {study.date}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Location:</strong> {study.location}
                  </p>
                </div>
                <AlertTriangle className="h-6 w-6 text-red-400 flex-shrink-0" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 text-sm">
                {study.description}
              </p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-red-400" />
                    Key Learning Points:
                  </h4>
                  <ul className="space-y-1">
                    {study.keyLearnings.map((learning, learningIndex) => (
                      <li key={learningIndex} className="text-xs text-muted-foreground flex items-center gap-2">
                        <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                        {learning}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-green-400" />
                    Preventive Measures:
                  </h4>
                  <ul className="space-y-1">
                    {study.preventiveMeasures.map((measure, measureIndex) => (
                      <li key={measureIndex} className="text-xs text-muted-foreground flex items-center gap-2">
                        <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                        {measure}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-400" />
                    Relevant Regulations:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {study.regulations.map((regulation, regIndex) => (
                      <Badge key={regIndex} variant="outline" className="text-blue-400 text-xs">
                        {regulation}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <Button className="w-full mt-4">
                <FileText className="mr-2 h-4 w-4" />
                View Full Case Study
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-orange-500/50 bg-orange-500/10">
        <CardHeader>
          <CardTitle className="text-orange-300 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Learning from Incidents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            These case studies are based on real incidents reported to the HSE and other safety organisations. 
            They highlight the importance of following proper safety procedures and the consequences when things go wrong.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400 mb-1">4</div>
              <div className="text-sm text-muted-foreground">Case Studies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400 mb-1">2</div>
              <div className="text-sm text-muted-foreground">Fatal Incidents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Preventable</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CaseStudiesTab;
