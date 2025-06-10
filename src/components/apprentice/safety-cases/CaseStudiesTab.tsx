
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FileText, AlertTriangle, Users, Calendar, MapPin, Clock, Eye, Download, Share2 } from "lucide-react";
import { useState } from "react";

const CaseStudiesTab = () => {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const caseStudies = [
    {
      id: "case-001",
      title: "Fatal Arc Flash Incident - Industrial Facility",
      date: "March 2023",
      location: "Manufacturing Plant, Birmingham",
      severity: "Fatal",
      category: "Arc Flash",
      industry: "Manufacturing",
      description: "Investigation into a fatal arc flash incident during maintenance work on a 11kV switchgear. The victim was an experienced electrician performing routine maintenance when an arc flash occurred.",
      detailedDescription: "A 45-year-old qualified electrician was performing routine maintenance on an 11kV switchgear panel when an arc flash incident occurred. The electrician was wearing standard PPE but not arc-rated clothing. The incident resulted in severe burns and ultimately proved fatal.",
      keyLearnings: [
        "Inadequate PPE selection for arc flash risk level",
        "Lack of comprehensive arc flash risk assessment",
        "Insufficient training on arc flash hazards",
        "No energised electrical work permit system in place"
      ],
      preventiveMeasures: [
        "Comprehensive arc flash studies and labelling",
        "Implementation of appropriate PPE programs",
        "Enhanced training protocols for arc flash awareness",
        "Development of energised work permit systems"
      ],
      regulations: ["Electricity at Work Regulations 1989", "CDM Regulations 2015", "PUWER 1998"],
      timeline: [
        "09:30 - Work commenced on switchgear maintenance",
        "10:15 - Arc flash incident occurred",
        "10:16 - Emergency services called",
        "10:45 - Victim transported to hospital",
        "Investigation commenced same day"
      ],
      rootCauses: [
        "Inadequate risk assessment",
        "Inappropriate PPE selection",
        "Lack of arc flash awareness training",
        "Absence of safety management systems"
      ],
      lessonsLearned: "This incident highlights the critical importance of comprehensive arc flash risk assessments and appropriate PPE selection. All electrical work must be properly planned with appropriate safety measures.",
      impact: "High",
      investigationDuration: "6 months",
      fineAmount: "£300,000",
      views: 1247,
      difficulty: "Advanced"
    },
    {
      id: "case-002",
      title: "Electric Shock from Faulty RCD Protection",
      date: "January 2023",
      location: "Residential Property, Manchester",
      severity: "Serious",
      category: "Electric Shock",
      industry: "Domestic",
      description: "An apprentice electrician received an electric shock due to faulty RCD protection on a domestic installation during routine testing work.",
      detailedDescription: "A second-year apprentice was conducting routine electrical testing in a domestic property when they received an electric shock from a socket outlet. Investigation revealed that the RCD protection had failed but this wasn't detected during previous testing.",
      keyLearnings: [
        "Importance of regular RCD testing procedures",
        "Limitations of visual inspection methods",
        "Critical need for emergency response procedures",
        "Proper use of voltage indicators and proving units"
      ],
      preventiveMeasures: [
        "Implementation of monthly RCD testing schedules",
        "Use of portable RCD devices for additional protection",
        "Enhanced first aid training for electrical incidents",
        "Improved testing and verification procedures"
      ],
      regulations: ["BS 7671:2018", "Electricity at Work Regulations 1989", "Health and Safety at Work Act 1974"],
      timeline: [
        "14:00 - Testing work commenced",
        "14:30 - Electric shock incident",
        "14:31 - Emergency procedures activated",
        "14:45 - Paramedics arrived on site",
        "15:30 - Investigation began"
      ],
      rootCauses: [
        "Faulty RCD device",
        "Inadequate testing procedures",
        "Lack of additional protection measures",
        "Insufficient supervision of apprentice"
      ],
      lessonsLearned: "Regular testing of protective devices is essential. This case demonstrates why additional protection measures and proper supervision are crucial when working with electricity.",
      impact: "Medium",
      investigationDuration: "3 months",
      fineAmount: "£50,000",
      views: 892,
      difficulty: "Intermediate"
    },
    {
      id: "case-003",
      title: "Lockout/Tagout Failure - Commercial Building",
      date: "November 2022",
      location: "Office Complex, London",
      severity: "Near Miss",
      category: "Isolation Procedures",
      industry: "Commercial",
      description: "A near-miss incident caused by improper lockout/tagout procedures during maintenance work on a commercial electrical system.",
      detailedDescription: "During planned maintenance work on a commercial building's electrical system, a contractor nearly worked on live equipment due to inadequate isolation procedures. The incident was prevented when another worker noticed the error.",
      keyLearnings: [
        "Critical importance of communication between teams",
        "Need for proper isolation verification procedures",
        "Dangers of rushed work practices under pressure",
        "Importance of double-checking isolation"
      ],
      preventiveMeasures: [
        "Enhanced lockout/tagout procedures and training",
        "Implementation of double verification systems",
        "Improved communication protocols between shifts",
        "Regular safety briefings and toolbox talks"
      ],
      regulations: ["BS EN 50110", "Electricity at Work Regulations 1989", "CDM Regulations 2015"],
      timeline: [
        "08:00 - Day shift isolation procedure",
        "16:00 - Shift change",
        "16:30 - Night shift commenced work",
        "17:00 - Near miss discovered",
        "17:15 - Work stopped and investigation began"
      ],
      rootCauses: [
        "Poor communication between shifts",
        "Inadequate isolation verification",
        "Time pressure affecting safety procedures",
        "Insufficient lockout/tagout training"
      ],
      lessonsLearned: "Effective communication and proper isolation procedures are fundamental to electrical safety. This near-miss shows how easily accidents can occur without proper systems.",
      impact: "Low",
      investigationDuration: "1 month",
      fineAmount: "No fine",
      views: 654,
      difficulty: "Beginner"
    },
    {
      id: "case-004",
      title: "Overhead Line Contact - Construction Site",
      date: "September 2022",
      location: "Construction Site, Leeds",
      severity: "Fatal",
      category: "Overhead Lines",
      industry: "Construction",
      description: "Fatal incident involving contact with overhead power lines during crane operations on a construction site.",
      detailedDescription: "A crane operator was moving materials when the crane's jib contacted 11kV overhead power lines. The operator was electrocuted and died at the scene. Investigation revealed inadequate site planning and lack of exclusion zones.",
      keyLearnings: [
        "Critical importance of comprehensive site planning",
        "Need for proper exclusion zones around overhead lines",
        "Importance of coordination with Distribution Network Operators",
        "Essential nature of height restriction measures"
      ],
      preventiveMeasures: [
        "Comprehensive site surveys including overhead line mapping",
        "Implementation of proper exclusion zones and barriers",
        "Enhanced coordination with DNO for line identification",
        "Use of height restriction devices on mobile plant"
      ],
      regulations: ["HSG47 Avoiding Danger from Overhead Power Lines", "CDM Regulations 2015", "Electricity at Work Regulations 1989"],
      timeline: [
        "07:30 - Crane operations commenced",
        "09:45 - Contact with overhead lines",
        "09:46 - Emergency services alerted",
        "10:30 - Site evacuated and secured",
        "Investigation commenced immediately"
      ],
      rootCauses: [
        "Inadequate site planning and risk assessment",
        "Lack of overhead line identification",
        "Absence of exclusion zones",
        "Poor coordination with electricity supplier"
      ],
      lessonsLearned: "Overhead lines present significant risks that must be properly managed through planning, identification, and control measures. This tragic case emphasises the need for comprehensive site safety planning.",
      impact: "High",
      investigationDuration: "8 months",
      fineAmount: "£500,000",
      views: 1856,
      difficulty: "Advanced"
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Intermediate": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Advanced": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const filteredCaseStudies = caseStudies.filter(study => {
    const severityMatch = filterSeverity === "all" || study.severity === filterSeverity;
    const categoryMatch = filterCategory === "all" || study.category === filterCategory;
    return severityMatch && categoryMatch;
  });

  const handleViewCase = (caseId: string) => {
    setSelectedCase(caseId);
    // Here you would typically navigate to detailed case view
    console.log(`Viewing case: ${caseId}`);
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Interactive Case Studies Library</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Learn from real incidents and near-misses in the electrical industry. Each case study includes detailed 
            analysis, interactive elements, downloadable reports, and practical learning outcomes.
          </p>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex gap-2">
              <Button
                variant={filterSeverity === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterSeverity("all")}
              >
                All Severity
              </Button>
              <Button
                variant={filterSeverity === "Fatal" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterSeverity("Fatal")}
              >
                Fatal
              </Button>
              <Button
                variant={filterSeverity === "Serious" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterSeverity("Serious")}
              >
                Serious
              </Button>
              <Button
                variant={filterSeverity === "Near Miss" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterSeverity("Near Miss")}
              >
                Near Miss
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {filteredCaseStudies.map((study, index) => (
          <Card key={study.id} className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-white text-lg mb-3">{study.title}</CardTitle>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge className={getSeverityColor(study.severity)}>
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      {study.severity}
                    </Badge>
                    <Badge variant="outline" className="text-muted-foreground">
                      {study.category}
                    </Badge>
                    <Badge className={getDifficultyColor(study.difficulty)}>
                      {study.difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-blue-400">
                      <Calendar className="h-3 w-3 mr-1" />
                      {study.date}
                    </Badge>
                    <Badge variant="outline" className="text-green-400">
                      {study.industry}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {study.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {study.investigationDuration} investigation
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {study.views} views
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 text-sm">
                {study.detailedDescription}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-red-400" />
                    Root Causes:
                  </h4>
                  <ul className="space-y-1">
                    {study.rootCauses.slice(0, 3).map((cause, causeIndex) => (
                      <li key={causeIndex} className="text-xs text-muted-foreground flex items-center gap-2">
                        <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                        {cause}
                      </li>
                    ))}
                    {study.rootCauses.length > 3 && (
                      <li className="text-xs text-elec-yellow">+{study.rootCauses.length - 3} more causes</li>
                    )}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-green-400" />
                    Prevention Measures:
                  </h4>
                  <ul className="space-y-1">
                    {study.preventiveMeasures.slice(0, 3).map((measure, measureIndex) => (
                      <li key={measureIndex} className="text-xs text-muted-foreground flex items-center gap-2">
                        <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                        {measure}
                      </li>
                    ))}
                    {study.preventiveMeasures.length > 3 && (
                      <li className="text-xs text-elec-yellow">+{study.preventiveMeasures.length - 3} more measures</li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-white mb-2">Key Learning Outcome:</h4>
                <p className="text-xs text-muted-foreground italic bg-elec-dark/40 p-3 rounded">
                  "{study.lessonsLearned}"
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {study.regulations.slice(0, 2).map((regulation, regIndex) => (
                    <Badge key={regIndex} variant="outline" className="text-blue-400 text-xs">
                      {regulation}
                    </Badge>
                  ))}
                  {study.regulations.length > 2 && (
                    <Badge variant="outline" className="text-muted-foreground text-xs">
                      +{study.regulations.length - 2} more
                    </Badge>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-3 w-3 mr-1" />
                    Report
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-3 w-3" />
                  </Button>
                  <Button size="sm" onClick={() => handleViewCase(study.id)}>
                    <Eye className="mr-2 h-3 w-3" />
                    View Full Analysis
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-orange-500/50 bg-orange-500/10">
        <CardHeader>
          <CardTitle className="text-orange-300 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Case Studies Analytics & Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            These case studies are based on real incidents reported to the HSE and other safety organisations. 
            They represent valuable learning opportunities that have shaped current safety practices and regulations.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400 mb-1">{caseStudies.length}</div>
              <div className="text-sm text-muted-foreground">Case Studies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400 mb-1">{caseStudies.filter(c => c.severity === 'Fatal').length}</div>
              <div className="text-sm text-muted-foreground">Fatal Incidents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Preventable</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">{caseStudies.reduce((acc, c) => acc + c.views, 0)}</div>
              <div className="text-sm text-muted-foreground">Total Views</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">{caseStudies.filter(c => c.difficulty === 'Advanced').length}</div>
              <div className="text-sm text-muted-foreground">Advanced Cases</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CaseStudiesTab;
