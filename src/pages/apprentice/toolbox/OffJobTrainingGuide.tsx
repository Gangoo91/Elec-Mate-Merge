
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Clock, BookOpen, FileText, Calendar, Target, Users, Award, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import DeliveryMethodsCard from "@/components/apprentice/off-job-training/DeliveryMethodsCard";
import TrainingProvidersCard from "@/components/apprentice/off-job-training/TrainingProvidersCard";
import EvidenceCollectionCard from "@/components/apprentice/off-job-training/EvidenceCollectionCard";
import WeeklyStructureCard from "@/components/apprentice/off-job-training/WeeklyStructureCard";

const OffJobTrainingGuide = () => {
  const whatCounts = [
    { activity: "College/Training Provider Sessions", hours: "All classroom time", valid: true },
    { activity: "Online Learning Modules", hours: "Active learning time", valid: true },
    { activity: "Self-Study with Course Materials", hours: "Structured revision", valid: true },
    { activity: "Practice Exams & Mock Tests", hours: "Time spent testing", valid: true },
    { activity: "Webinars & Video Tutorials", hours: "Educational content", valid: true },
    { activity: "Reading Regulations/Standards", hours: "Study time only", valid: true },
    { activity: "Industry Visits & Exhibitions", hours: "Educational visits", valid: true },
    { activity: "Professional Development Sessions", hours: "Skills training", valid: true },
    { activity: "Watching YouTube Videos", hours: "Not structured learning", valid: false },
    { activity: "General Site Work", hours: "On-the-job experience", valid: false },
    { activity: "Travel Time to College", hours: "Transport time", valid: false },
    { activity: "Lunch Breaks", hours: "Not learning time", valid: false }
  ];

  const keyPrinciples = [
    {
      principle: "Structured Learning",
      description: "Must have clear learning objectives and outcomes",
      examples: ["Formal courses", "Guided study sessions", "Planned workshops"]
    },
    {
      principle: "Off-the-Job Context",
      description: "Takes place away from normal work duties",
      examples: ["College attendance", "Training centres", "Online learning"]
    },
    {
      principle: "Skill Development",
      description: "Directly contributes to apprenticeship standards",
      examples: ["Technical skills", "Knowledge acquisition", "Professional competencies"]
    },
    {
      principle: "Evidence-Based",
      description: "Must be documented and verifiable",
      examples: ["Certificates", "Attendance records", "Assessment results"]
    }
  ];

  const legalFramework = [
    {
      regulation: "Education & Skills Funding Agency",
      requirement: "Minimum 20% off-the-job training",
      details: "At least 6 hours per 30-hour week, excluding English and maths"
    },
    {
      regulation: "Apprenticeship Standards",
      requirement: "Mapped to knowledge, skills, and behaviours",
      details: "Must align with specific apprenticeship framework requirements"
    },
    {
      regulation: "End-Point Assessment",
      requirement: "Preparation and readiness",
      details: "Off-the-job training must prepare for final assessment"
    },
    {
      regulation: "Quality Assurance",
      requirement: "Regular monitoring and review",
      details: "Training providers must track and report on delivery"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Comprehensive Off-the-Job Training Guide</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Your complete resource for understanding, planning, and managing off-the-job training requirements
        </p>
        <Link to="/apprentice/toolbox" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Guidance Area
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="delivery">Delivery</TabsTrigger>
          <TabsTrigger value="providers">Providers</TabsTrigger>
          <TabsTrigger value="structure">Structure</TabsTrigger>
          <TabsTrigger value="evidence">Evidence</TabsTrigger>
          <TabsTrigger value="legal">Legal</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
            <CardHeader>
              <CardTitle className="text-elec-yellow flex items-center gap-2">
                <Clock className="h-5 w-5" />
                What is Off-the-Job Training?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-elec-light/80">
                  Off-the-job training is learning that takes place outside of your normal work duties during your paid working hours. 
                  You must spend at least 20% of your working time on this type of training during your apprenticeship - that's roughly 
                  one day per week or equivalent.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-elec-yellow">Key Principles:</h4>
                    <div className="space-y-3">
                      {keyPrinciples.map((principle, index) => (
                        <div key={index} className="p-3 bg-elec-dark rounded-lg">
                          <h5 className="font-medium text-white mb-1">{principle.principle}</h5>
                          <p className="text-sm text-muted-foreground mb-2">{principle.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {principle.examples.map((example, idx) => (
                              <span key={idx} className="text-xs bg-elec-yellow/20 text-elec-yellow px-2 py-1 rounded">
                                {example}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 text-elec-yellow">What Counts vs What Doesn't:</h4>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {whatCounts.map((item, index) => (
                        <div key={index} className={`flex items-center justify-between p-2 rounded text-sm ${
                          item.valid 
                            ? 'bg-green-500/20 border border-green-500/30' 
                            : 'bg-red-500/20 border border-red-500/30'
                        }`}>
                          <span className="flex-1 text-white">{item.activity}</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            item.valid ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                          }`}>
                            {item.valid ? 'Valid' : 'Invalid'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delivery">
          <DeliveryMethodsCard />
        </TabsContent>

        <TabsContent value="providers">
          <TrainingProvidersCard />
        </TabsContent>

        <TabsContent value="structure">
          <WeeklyStructureCard />
        </TabsContent>

        <TabsContent value="evidence">
          <EvidenceCollectionCard />
        </TabsContent>

        <TabsContent value="legal" className="space-y-6">
          <Card className="border-red-500/30 bg-gradient-to-br from-red-500/10 to-orange-500/10">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center gap-2">
                <Award className="h-5 w-5" />
                Legal Framework & Requirements
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Understanding the regulatory requirements and compliance standards
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {legalFramework.map((item, index) => (
                    <div key={index} className="p-4 bg-elec-gray/50 rounded-lg border border-red-500/20">
                      <h4 className="font-medium text-white mb-2">{item.regulation}</h4>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium text-red-400">Requirement:</span>
                          <p className="text-sm text-muted-foreground">{item.requirement}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-blue-400">Details:</span>
                          <p className="text-sm text-muted-foreground">{item.details}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                  <h4 className="font-medium text-yellow-400 mb-3">Important Compliance Notes</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      Off-the-job training time cannot be made up outside of contracted hours
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      English and maths functional skills don't count towards the 20%
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      Training must be directly relevant to the apprenticeship standard
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      Employers must maintain accurate records of off-the-job training
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-green-500/20 rounded-lg border border-green-500/30">
                  <h4 className="font-medium text-green-400 mb-3">Quality Assurance Standards</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium text-white">Training Provider Must:</span>
                      <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                        <li>• Monitor attendance and engagement</li>
                        <li>• Assess learning outcomes regularly</li>
                        <li>• Provide progress reports</li>
                        <li>• Maintain qualification standards</li>
                      </ul>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-white">Employer Must:</span>
                      <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                        <li>• Allow adequate time for training</li>
                        <li>• Support learning objectives</li>
                        <li>• Provide necessary resources</li>
                        <li>• Cooperate with assessments</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Using ElecMate for Off-the-Job Training
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h4 className="font-semibold text-white mb-2">This App Counts!</h4>
              <p className="text-sm text-muted-foreground">
                Time spent learning in the Study Centre, using calculators, reading guidance materials, 
                and completing assessments all count as structured off-the-job training.
              </p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-white mb-2">How to Log It</h4>
              <p className="text-sm text-muted-foreground">
                "Self-directed learning using apprenticeship platform - studied [specific topic], 
                completed practice questions, used electrical calculators"
              </p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-white mb-2">Evidence Collection</h4>
              <p className="text-sm text-muted-foreground">
                Screenshots of completed modules, progress tracking, calculator results, 
                or notes you've taken during learning sessions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OffJobTrainingGuide;
