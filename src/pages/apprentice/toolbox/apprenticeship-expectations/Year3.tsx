
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Zap, Users, Target, CheckCircle, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const Year3 = () => {
  const isMobile = useIsMobile();

  const learningOutcomes = [
    "Perform electrical testing and inspection procedures",
    "Diagnose and resolve electrical faults independently", 
    "Interact professionally with customers and clients",
    "Work with minimal supervision on routine installations",
    "Complete Level 3 practical assessments and assignments"
  ];

  const specialistAreas = [
    {
      area: "Testing & Inspection",
      level: "Advanced",
      description: "PAT testing, EICR completion, fault diagnosis",
      skills: ["Multimeter proficiency", "Test sequence knowledge", "Report writing", "Compliance verification"]
    },
    {
      area: "Customer Relations", 
      level: "Developing",
      description: "Professional communication and service delivery",
      skills: ["Clear explanations", "Problem solving", "Complaint handling", "Professional appearance"]
    },
    {
      area: "Independent Working",
      level: "Competent", 
      description: "Managing own workload and making decisions",
      skills: ["Time management", "Quality control", "Risk assessment", "Resource planning"]
    },
    {
      area: "Specialisation Choice",
      level: "Exploring",
      description: "Identifying areas of interest for future development",
      skills: ["Commercial systems", "Industrial control", "Renewable energy", "Smart home technology"]
    }
  ];

  const responsibilities = [
    {
      category: "Technical Leadership",
      items: [
        "Lead simple installations from start to finish",
        "Train and mentor first and second year apprentices", 
        "Make technical decisions within your competence",
        "Identify when to escalate complex problems",
        "Ensure work meets BS 7671 requirements"
      ]
    },
    {
      category: "Customer Interaction",
      items: [
        "Explain electrical work to non-technical customers",
        "Provide accurate time and cost estimates",
        "Handle customer concerns professionally",
        "Complete customer satisfaction surveys",
        "Represent your company's values and standards"
      ]
    }
  ];

  const assessments = [
    {
      type: "Practical Assessments",
      description: "Hands-on electrical installation tasks",
      preparation: ["Practice wiring techniques", "Review testing procedures", "Study circuit designs", "Time management"]
    },
    {
      type: "Knowledge Tests", 
      description: "Written examinations on electrical theory",
      preparation: ["Review BS 7671", "Practice calculations", "Study past papers", "Group revision sessions"]
    },
    {
      type: "Portfolio Review",
      description: "Evidence of learning and competence development", 
      preparation: ["Collect work evidence", "Reflect on learning", "Document achievements", "Seek feedback"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-elec-dark via-elec-gray to-elec-dark">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-6 animate-fade-in max-w-7xl">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex justify-start">
            <Link to="/apprentice/toolbox/apprenticeship-expectations">
              <Button 
                variant="outline" 
                size={isMobile ? "sm" : "default"} 
                className="bg-elec-gray/50 border-elec-yellow/30 hover:bg-elec-yellow/10 text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                {isMobile ? "Back" : "Back to Journey"}
              </Button>
            </Link>
          </div>
          
          <div className="text-center space-y-3 px-2">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="p-3 rounded-lg bg-orange-500/20 border border-orange-500/30">
                <Calendar className="h-8 w-8 text-orange-400" />
              </div>
              <div>
                <h1 className={`font-bold tracking-tight text-elec-yellow leading-tight ${isMobile ? 'text-2xl' : 'text-4xl'}`}>
                  Year 3: Competence
                </h1>
                <p className="text-orange-400 font-medium">Independence & Specialisation</p>
              </div>
            </div>
            <p className={`text-muted-foreground leading-relaxed max-w-3xl mx-auto ${isMobile ? 'text-sm px-1' : 'text-base'}`}>
              Year 3 focuses on developing independence, customer interaction skills, and beginning to 
              explore specialisation areas that will shape your future electrical career.
            </p>
          </div>
        </div>

        {/* Learning Outcomes */}
        <Card className="border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-amber-500/10 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl text-orange-400 flex items-center gap-2">
              <Target className="h-5 w-5" />
              Year 3 Learning Outcomes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {learningOutcomes.map((outcome, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-elec-gray/50 rounded-lg border border-orange-500/20">
                  <CheckCircle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{outcome}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Specialist Areas */}
        <Card className="border-elec-yellow/20 bg-elec-gray/30 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl text-elec-yellow flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Specialist Area Development
            </CardTitle>
            <p className="text-sm text-muted-foreground">Advanced skills and potential career specialisations</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {specialistAreas.map((area, index) => (
                <div key={index} className="p-4 bg-elec-gray/50 rounded-lg border border-elec-yellow/20">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-white">{area.area}</h4>
                    <Badge variant="outline" className="border-orange-500/30 text-orange-400 text-xs">
                      {area.level}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{area.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {area.skills.map((skill, skillIndex) => (
                      <Badge 
                        key={skillIndex} 
                        variant="secondary" 
                        className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20 text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Responsibilities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {responsibilities.map((section, index) => (
            <Card key={index} className="border-elec-yellow/20 bg-elec-gray/30 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-lg text-elec-yellow flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {section.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Assessment Preparation */}
        <Card className="border-elec-yellow/20 bg-elec-gray/30 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl text-elec-yellow flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Level 3 Assessment Preparation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {assessments.map((assessment, index) => (
                <div key={index} className="p-4 bg-elec-gray/50 rounded-lg border border-elec-yellow/20">
                  <h4 className="font-medium text-white mb-2">{assessment.type}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{assessment.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {assessment.preparation.map((prep, prepIndex) => (
                      <div key={prepIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                        <span className="text-xs text-muted-foreground">{prep}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Career Exploration */}
        <Card className="border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
          <CardHeader>
            <CardTitle className="text-blue-400">Exploring Your Future Career Path</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-white mb-3">Specialisation Options</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Domestic electrical installations</li>
                  <li>• Commercial building services</li>
                  <li>• Industrial maintenance and control</li>
                  <li>• Renewable energy systems</li>
                  <li>• Smart home and automation</li>
                  <li>• Testing and inspection services</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-3">Next Steps to Consider</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Research Level 4 qualifications</li>
                  <li>• Explore additional certifications</li>
                  <li>• Network with industry professionals</li>
                  <li>• Consider business management training</li>
                  <li>• Look into continuing professional development</li>
                  <li>• Plan for post-apprenticeship employment</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Success Indicators */}
        <Card className="border-green-500/30 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
          <CardHeader>
            <CardTitle className="text-green-400">You're Succeeding in Year 3 When...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-white mb-2">Technical Competence</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Independent fault diagnosis</li>
                  <li>• Confident testing procedures</li>
                  <li>• Quality installation work</li>
                  <li>• Regulatory compliance</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Professional Skills</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Positive customer feedback</li>
                  <li>• Effective mentoring of juniors</li>
                  <li>• Professional communication</li>
                  <li>• Problem-solving confidence</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Career Development</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Clear specialisation interest</li>
                  <li>• Post-apprenticeship planning</li>
                  <li>• Industry network building</li>
                  <li>• Continuous learning mindset</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Year3;
