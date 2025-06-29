
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Users, 
  BookOpen,
  ArrowRight,
  Calendar,
  Target,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "@/components/common/BackButton";
import SalaryProgressionChart from "@/components/apprentice/apprenticeship-expectations/SalaryProgressionChart";

const ApprenticeshipExpectations = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const apprenticeshipStages = [
    {
      year: 1,
      title: "Foundation Year",
      duration: "Months 1-12",
      focus: "Basic electrical principles and safety",
      salary: "£15,000 - £18,000",
      keyMilestones: [
        "Health & Safety fundamentals",
        "Basic electrical theory",
        "Tool familiarisation",
        "First college assessments"
      ],
      challenges: [
        "Adjusting to workplace environment",
        "Learning technical vocabulary",
        "Managing college and work balance"
      ]
    },
    {
      year: 2,
      title: "Development Year",
      duration: "Months 13-24",
      focus: "Installation methods and regulations",
      salary: "£18,000 - £22,000",
      keyMilestones: [
        "BS 7671 Wiring Regulations",
        "Installation techniques",
        "Testing and inspection basics",
        "Portfolio development"
      ],
      challenges: [
        "Complex regulation understanding",
        "Practical application of theory",
        "Increased responsibility on site"
      ]
    },
    {
      year: 3,
      title: "Progression Year",
      duration: "Months 25-36",
      focus: "Advanced installations and fault-finding",
      salary: "£24,000 - £28,000",
      keyMilestones: [
        "Advanced fault diagnosis",
        "Commercial installations",
        "Supervisory experience",
        "End Point Assessment preparation"
      ],
      challenges: [
        "Leading junior apprentices",
        "Complex problem solving",
        "EPA preparation stress"
      ]
    },
    {
      year: 4,
      title: "Mastery Year",
      duration: "Months 37-48",
      focus: "Specialisation and EPA completion",
      salary: "£28,000 - £35,000",
      keyMilestones: [
        "End Point Assessment",
        "Specialisation choice",
        "Industry certifications",
        "Qualification completion"
      ],
      challenges: [
        "EPA performance pressure",
        "Career direction decisions",
        "Job market preparation"
      ]
    }
  ];

  const expectationCategories = [
    {
      title: "Learning Structure",
      icon: BookOpen,
      items: [
        "20% off-the-job training (approximately 7.5 hours per week)",
        "80% on-the-job practical experience",
        "Regular college attendance (typically 1 day per week)",
        "Portfolio development throughout apprenticeship"
      ]
    },
    {
      title: "Assessment Methods",
      icon: CheckCircle,
      items: [
        "Continuous assessment of practical skills",
        "Written examinations and assignments",
        "Portfolio evidence collection",
        "End Point Assessment (EPA) in final year"
      ]
    },
    {
      title: "Support Available",
      icon: Users,
      items: [
        "Workplace mentor/supervisor guidance",
        "College tutor support",
        "Apprenticeship coordinator oversight",
        "Peer learning opportunities"
      ]
    },
    {
      title: "Career Progression",
      icon: TrendingUp,
      items: [
        "Fully qualified electrician status",
        "Potential specialisation opportunities",
        "Further education pathways available",
        "Professional development continuing"
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Apprenticeship Expectations</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4 text-sm sm:text-base">
          Your comprehensive guide to what to expect during your electrical apprenticeship journey
        </p>
        <BackButton customUrl="/apprentice/toolbox" label="Back to Toolbox" />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="journey">Journey</TabsTrigger>
          <TabsTrigger value="expectations">Expectations</TabsTrigger>
          <TabsTrigger value="salary">Salary</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5">
            <CardHeader>
              <CardTitle className="text-elec-yellow flex items-center gap-2">
                <GraduationCap className="h-6 w-6" />
                Your Apprenticeship Journey
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-elec-light/90">
                An electrical apprenticeship is a 4-year journey that combines practical on-the-job training 
                with theoretical learning. You'll progress from basic electrical principles to becoming a 
                fully qualified electrician.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-elec-yellow">Duration</h4>
                  <p className="text-sm text-elec-light/80">48 months (4 years) full-time</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-elec-yellow">Qualification Level</h4>
                  <p className="text-sm text-elec-light/80">Level 3 Advanced Apprenticeship</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-elec-yellow">Training Split</h4>
                  <p className="text-sm text-elec-light/80">80% workplace / 20% college</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-elec-yellow">Final Assessment</h4>
                  <p className="text-sm text-elec-light/80">End Point Assessment (EPA)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {expectationCategories.map((category, index) => (
              <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <category.icon className="h-5 w-5 text-elec-yellow" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="journey" className="space-y-6">
          <div className="space-y-6">
            {apprenticeshipStages.map((stage, index) => (
              <Card key={index} className="border-elec-yellow/20 bg-elec-gray relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-elec-yellow/20 to-transparent" />
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-elec-yellow text-elec-dark">Year {stage.year}</Badge>
                      <div>
                        <CardTitle className="text-xl">{stage.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{stage.duration}</p>
                      </div>
                    </div>
                    <Link to={`/apprentice/toolbox/apprenticeship-expectations/year-${stage.year}`}>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        View Details
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold text-elec-yellow mb-2">Focus Area</h4>
                      <p className="text-sm text-elec-light/80">{stage.focus}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-400 mb-2">Expected Salary</h4>
                      <p className="text-sm text-elec-light/80">{stage.salary}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-400 mb-2">Key Milestones</h4>
                      <ul className="text-sm text-elec-light/80 space-y-1">
                        {stage.keyMilestones.slice(0, 2).map((milestone, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <Target className="h-3 w-3 text-blue-400" />
                            {milestone}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {stage.challenges.length > 0 && (
                    <div className="border-t border-elec-yellow/10 pt-4">
                      <h4 className="font-semibold text-orange-400 mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Common Challenges
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {stage.challenges.map((challenge, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {challenge}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="expectations" className="space-y-6">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-elec-yellow" />
                What to Expect Throughout Your Apprenticeship
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="border-l-2 border-elec-yellow pl-4">
                  <h4 className="font-semibold text-elec-yellow">First Few Months</h4>
                  <ul className="text-sm text-elec-light/80 space-y-1 mt-2">
                    <li>• Workplace induction and safety training</li>
                    <li>• Basic tool introduction and handling</li>
                    <li>• College enrolment and initial assessments</li>
                    <li>• Meeting your mentor and supervisors</li>
                  </ul>
                </div>
                
                <div className="border-l-2 border-blue-400 pl-4">
                  <h4 className="font-semibold text-blue-400">Mid-Apprenticeship</h4>
                  <ul className="text-sm text-elec-light/80 space-y-1 mt-2">
                    <li>• Increased independence on installations</li>
                    <li>• More complex college assignments</li>
                    <li>• Portfolio evidence building</li>
                    <li>• Potential for specialisation choices</li>
                  </ul>
                </div>
                
                <div className="border-l-2 border-green-400 pl-4">
                  <h4 className="font-semibold text-green-400">Final Year</h4>
                  <ul className="text-sm text-elec-light/80 space-y-1 mt-2">
                    <li>• End Point Assessment preparation</li>
                    <li>• Advanced project work</li>
                    <li>• Career planning and job searching</li>
                    <li>• Professional qualification completion</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-green-500/30 bg-green-500/5">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  What's Provided
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Basic hand tools (usually)</li>
                  <li>• Safety equipment and PPE</li>
                  <li>• College tuition fees covered</li>
                  <li>• Regular wage throughout</li>
                  <li>• Workplace training and mentorship</li>
                  <li>• Professional qualification</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-orange-500/30 bg-orange-500/5">
              <CardHeader>
                <CardTitle className="text-orange-400 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Your Responsibilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Regular college attendance</li>
                  <li>• Portfolio maintenance</li>
                  <li>• Professional behaviour on site</li>
                  <li>• Commitment to learning</li>
                  <li>• Following safety procedures</li>
                  <li>• Meeting assessment deadlines</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="salary" className="space-y-6">
          <SalaryProgressionChart />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApprenticeshipExpectations;
