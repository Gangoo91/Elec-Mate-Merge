
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, CheckCircle, AlertTriangle, Target, TrendingUp, Users, PoundSterling, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const Year3 = () => {
  const isMobile = useIsMobile();

  const learningOutcomes = [
    "Carry out testing and inspection procedures independently",
    "Diagnose and rectify common electrical faults",
    "Interact professionally with customers and clients",
    "Plan and execute installations with minimal supervision",
    "Complete advanced college modules and prepare for final assessments"
  ];

  const skillsDeveloped = [
    { skill: "Testing & Inspection", level: "Competent", description: "PAT testing, EICR inspections, fault finding" },
    { skill: "Customer Service", level: "Developing", description: "Professional communication, explaining work to clients" },
    { skill: "Independent Working", level: "Advanced", description: "Planning jobs, managing time, quality control" },
    { skill: "Fault Diagnosis", level: "Intermediate", description: "Systematic fault finding, using test equipment" }
  ];

  const salaryProgression = {
    year3: "£24,000 - £28,000",
    yearlyIncrease: "20-30%",
    regional: {
      london: "£27,000 - £32,000",
      manchester: "£23,000 - £27,000",
      birmingham: "£24,000 - £28,000"
    }
  };

  const apprenticeStory = {
    name: "James T.",
    location: "Bristol",
    quote: "Year 3 was when I really felt like a proper electrician. I was doing full rewires, dealing with customers directly, and even training the new apprentices. The testing course was tough but so worth it - now I can do EICR inspections.",
    achievement: "Completed first independent domestic rewire project"
  };

  const careerPathways = [
    {
      path: "Domestic Electrician",
      description: "Focus on residential work, rewires, consumer unit upgrades",
      futureEarnings: "£30,000 - £45,000",
      requirements: "Strong customer service, attention to detail"
    },
    {
      path: "Commercial Electrician", 
      description: "Office buildings, shops, schools, larger installations",
      futureEarnings: "£35,000 - £50,000",
      requirements: "Understanding of 3-phase systems, fire alarms"
    },
    {
      path: "Industrial Electrician",
      description: "Factories, manufacturing, heavy machinery maintenance",
      futureEarnings: "£40,000 - £55,000",
      requirements: "PLC knowledge, motor control, health & safety focus"
    }
  ];

  const testingQualifications = [
    {
      course: "City & Guilds 2391-52",
      description: "Initial Verification and Certification",
      duration: "5 days",
      cost: "£800 - £1,200",
      importance: "Essential for independent testing work"
    },
    {
      course: "City & Guilds 2377-22", 
      description: "PAT Testing",
      duration: "1 day",
      cost: "£200 - £300",
      importance: "Additional income stream"
    }
  ];

  const employerExpectations = [
    "Complete installations independently with quality checks",
    "Handle customer enquiries and explain work professionally", 
    "Mentor and guide Year 1 and 2 apprentices effectively",
    "Contribute to job costing and material ordering",
    "Identify opportunities for additional work on sites"
  ];

  const financialPlanning = {
    toolInvestment: "£2,000 - £3,000",
    vanCosts: "£150 - £300/month",
    insurance: "£800 - £1,200/year",
    tips: [
      "Start building credit history for future van finance",
      "Consider tool insurance policies",
      "Save for qualification costs (£1,500 - £2,500 total)",
      "Build emergency fund for potential future self-employment"
    ]
  };

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
                <p className="text-orange-400 font-medium">Building Independence and Expertise</p>
              </div>
            </div>
            <p className={`text-muted-foreground leading-relaxed max-w-3xl mx-auto ${isMobile ? 'text-sm px-1' : 'text-base'}`}>
              Year 3 focuses on developing independence, customer interaction skills, and advanced technical competencies 
              including testing and inspection procedures.
            </p>
          </div>
        </div>

        {/* Salary Progression */}
        <Card className="border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-amber-500/10 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl text-orange-400 flex items-center gap-2">
              <PoundSterling className="h-5 w-5" />
              Year 3 Salary Expectations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-elec-gray/50 rounded-lg">
                <h4 className="font-medium text-white mb-2">National Average</h4>
                <p className="text-2xl font-bold text-orange-400">{salaryProgression.year3}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {salaryProgression.yearlyIncrease} increase from Year 2
                </p>
              </div>
              <div className="text-center p-4 bg-elec-gray/50 rounded-lg">
                <h4 className="font-medium text-white mb-2">London</h4>
                <p className="text-xl font-bold text-orange-400">{salaryProgression.regional.london}</p>
                <p className="text-sm text-muted-foreground">Higher cost of living</p>
              </div>
              <div className="text-center p-4 bg-elec-gray/50 rounded-lg">
                <h4 className="font-medium text-white mb-2">Manchester/Birmingham</h4>
                <p className="text-xl font-bold text-orange-400">{salaryProgression.regional.manchester}</p>
                <p className="text-sm text-muted-foreground">Regional rates</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Career Pathways */}
        <Card className="border-elec-yellow/20 bg-elec-gray/30 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl text-elec-yellow">Future Career Pathways</CardTitle>
            <p className="text-sm text-muted-foreground">Start thinking about your specialisation</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {careerPathways.map((pathway, index) => (
                <div key={index} className="p-4 bg-elec-gray/50 rounded-lg border border-elec-yellow/20">
                  <h4 className="font-medium text-white mb-2">{pathway.path}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{pathway.description}</p>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="text-green-400 font-medium">Potential Earnings:</span> {pathway.futureEarnings}
                    </p>
                    <p className="text-sm">
                      <span className="text-blue-400 font-medium">Key Requirements:</span> {pathway.requirements}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Apprentice Story */}
        <Card className="border-elec-yellow/30 bg-gradient-to-r from-elec-yellow/5 to-orange-500/5">
          <CardHeader>
            <CardTitle className="text-elec-yellow">Year 3 Success Story</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <blockquote className="text-muted-foreground italic leading-relaxed border-l-4 border-elec-yellow pl-4">
                "{apprenticeStory.quote}"
              </blockquote>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">{apprenticeStory.name}</p>
                  <p className="text-sm text-muted-foreground">{apprenticeStory.location}</p>
                </div>
                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                  {apprenticeStory.achievement}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Testing Qualifications */}
        <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center gap-2">
              <Award className="h-5 w-5" />
              Testing & Inspection Qualifications
            </CardTitle>
            <p className="text-sm text-muted-foreground">Essential certifications for Year 3 and beyond</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testingQualifications.map((qual, index) => (
                <div key={index} className="p-4 bg-elec-gray/50 rounded-lg border border-blue-500/20">
                  <h4 className="font-medium text-white mb-2">{qual.course}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{qual.description}</p>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-blue-400">Duration:</span> {qual.duration}</p>
                    <p><span className="text-green-400">Cost:</span> {qual.cost}</p>
                    <p><span className="text-elec-yellow">Importance:</span> {qual.importance}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Learning Outcomes & Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-amber-500/10 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-xl text-orange-400 flex items-center gap-2">
                <Target className="h-5 w-5" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {learningOutcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-elec-gray/50 rounded-lg border border-orange-500/20">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{outcome}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-elec-yellow/20 bg-elec-gray/30 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg text-elec-yellow flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Skills Development
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillsDeveloped.map((skill, index) => (
                  <div key={index} className="p-3 bg-elec-gray/50 rounded-lg border border-elec-yellow/20">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-white text-sm">{skill.skill}</h4>
                      <Badge variant="outline" className="border-orange-500/30 text-orange-400 text-xs">
                        {skill.level}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{skill.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Financial Planning */}
        <Card className="border-green-500/30 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <PoundSterling className="h-5 w-5" />
              Financial Planning for Year 3
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-white mb-3">Investment Requirements</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="text-green-400">Professional Tools:</span> {financialPlanning.toolInvestment}</p>
                  <p><span className="text-blue-400">Van Costs:</span> {financialPlanning.vanCosts}</p>
                  <p><span className="text-orange-400">Insurance:</span> {financialPlanning.insurance}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-white mb-3">Financial Tips</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {financialPlanning.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Employer Expectations */}
        <Card className="border-elec-yellow/20 bg-elec-gray/30 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-elec-yellow flex items-center gap-2">
              <Users className="h-5 w-5" />
              Employer Expectations in Year 3
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {employerExpectations.map((expectation, index) => (
                <li key={index} className="flex items-start gap-3 p-3 bg-elec-gray/50 rounded-lg">
                  <span className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-sm text-muted-foreground">{expectation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Success Tips */}
        <Card className="border-green-500/30 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Success Tips for Year 3
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-white mb-2">Technical Excellence</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Master testing procedures thoroughly</li>
                  <li>• Develop systematic fault-finding approach</li>
                  <li>• Practice customer communication skills</li>
                  <li>• Stay updated with regulation changes</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Career Preparation</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Research specialisation options</li>
                  <li>• Build professional network</li>
                  <li>• Consider additional qualifications</li>
                  <li>• Plan for qualified electrician transition</li>
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
