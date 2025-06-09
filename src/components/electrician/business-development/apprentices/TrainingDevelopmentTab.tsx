
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Target, Calendar, Users, TrendingUp, Award } from "lucide-react";

const TrainingDevelopmentTab = () => {
  const trainingStructure = [
    {
      period: "Months 1-6",
      phase: "Foundation Phase",
      onSite: [
        "Basic health and safety awareness",
        "Tool familiarisation and care",
        "Simple cable installation tasks",
        "Observation of experienced electricians",
        "Site induction and procedures"
      ],
      offSite: [
        "Electrical theory fundamentals",
        "Health and safety regulations",
        "Basic electrical calculations",
        "Wiring regulations introduction",
        "Technical drawing interpretation"
      ]
    },
    {
      period: "Months 7-18",
      phase: "Development Phase",
      onSite: [
        "Circuit installation under supervision",
        "Use of testing equipment",
        "Fault finding assistance",
        "Customer interaction basics",
        "Quality control procedures"
      ],
      offSite: [
        "Advanced electrical theory",
        "Testing and inspection procedures",
        "Wiring regulations (BS 7671)",
        "Motor control systems",
        "Emergency lighting systems"
      ]
    },
    {
      period: "Months 19-36",
      phase: "Competency Phase",
      onSite: [
        "Independent circuit design",
        "Complex installation work",
        "Fault diagnosis and repair",
        "Customer consultation",
        "Site management responsibilities"
      ],
      offSite: [
        "Specialised systems training",
        "Business and commercial awareness",
        "Advanced testing procedures",
        "New technology and innovations",
        "EPA preparation"
      ]
    }
  ];

  const progressTracking = [
    { skill: "Health & Safety Awareness", beginner: "Basic understanding", competent: "Identifies hazards", expert: "Leads safety initiatives" },
    { skill: "Technical Knowledge", beginner: "Theory basics", competent: "Applies principles", expert: "Solves complex problems" },
    { skill: "Practical Skills", beginner: "Simple tasks", competent: "Standard installations", expert: "Complex systems" },
    { skill: "Customer Service", beginner: "Observes interactions", competent: "Basic communication", expert: "Manages relationships" },
    { skill: "Problem Solving", beginner: "Follows instructions", competent: "Identifies solutions", expert: "Innovates approaches" }
  ];

  const mentorshipTips = [
    "Assign a dedicated mentor for consistent guidance",
    "Schedule regular one-to-one feedback sessions",
    "Rotate apprentices between different projects",
    "Encourage questions and create a safe learning environment",
    "Provide constructive feedback, both positive and corrective",
    "Set clear expectations and learning objectives",
    "Document progress and celebrate achievements",
    "Address any issues early before they become problems"
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Training Structure & Progression
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {trainingStructure.map((phase, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-white">{phase.phase}</h4>
                  <Badge className="bg-elec-yellow/20 text-elec-yellow">
                    {phase.period}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-blue-400 mb-2 flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      On-Site Training (80%)
                    </h5>
                    <ul className="space-y-1">
                      {phase.onSite.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1 h-1 bg-blue-400 rounded-full" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-green-400 mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Off-Site Training (20%)
                    </h5>
                    <ul className="space-y-1">
                      {phase.offSite.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1 h-1 bg-green-400 rounded-full" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Skills Development Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {progressTracking.map((skill, index) => (
              <div key={index} className="space-y-2">
                <h4 className="font-medium text-white">{skill.skill}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <h5 className="text-sm font-medium text-red-400 mb-1">Beginner</h5>
                    <p className="text-xs text-red-200">{skill.beginner}</p>
                  </div>
                  <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                    <h5 className="text-sm font-medium text-amber-400 mb-1">Competent</h5>
                    <p className="text-xs text-amber-200">{skill.competent}</p>
                  </div>
                  <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <h5 className="text-sm font-medium text-green-400 mb-1">Expert</h5>
                    <p className="text-xs text-green-200">{skill.expert}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-500/20 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Effective Mentorship Strategies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mentorshipTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-2 p-3 bg-purple-500/5 border border-purple-500/20 rounded-lg">
                <Award className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-purple-200">{tip}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="border-purple-500/30 hover:bg-purple-500/20">
              Download Mentorship Guide
            </Button>
            <Button variant="outline" className="border-blue-500/30 hover:bg-blue-500/20">
              Progress Tracking Templates
            </Button>
            <Button variant="outline" className="border-green-500/30 hover:bg-green-500/20">
              Training Resources Library
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainingDevelopmentTab;
