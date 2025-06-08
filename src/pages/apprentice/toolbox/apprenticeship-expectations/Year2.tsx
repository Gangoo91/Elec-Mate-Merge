
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, CheckCircle, AlertTriangle, Target, TrendingUp, BookOpen, PoundSterling } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const Year2 = () => {
  const isMobile = useIsMobile();

  const learningOutcomes = [
    "Work more independently on basic electrical tasks",
    "Understand circuit design and cable selection principles",
    "Use power tools safely and maintain them properly",
    "Assist with installation planning and material ordering",
    "Complete intermediate college coursework and prepare for 18th Edition"
  ];

  const skillsDeveloped = [
    { skill: "Independent Working", level: "Developing", description: "Taking ownership of routine tasks with minimal supervision" },
    { skill: "Circuit Knowledge", level: "Intermediate", description: "Understanding lighting, socket and basic control circuits" },
    { skill: "Power Tool Mastery", level: "Competent", description: "Safe operation of drills, angle grinders, and specialised tools" },
    { skill: "Installation Planning", level: "Basic", description: "Contributing to job planning and material requirements" }
  ];

  const salaryProgression = {
    year2: "£18,000 - £22,000",
    yearlyIncrease: "15-25%",
    regional: {
      london: "£20,000 - £25,000",
      manchester: "£17,000 - £21,000",
      birmingham: "£17,500 - £21,500"
    }
  };

  const apprenticeStory = {
    name: "Sarah M.",
    location: "Leeds",
    quote: "Year 2 was when things really clicked for me. I started feeling like a proper electrician rather than just someone who carried tools around. The 18th Edition course was challenging but my employer was brilliant at giving me time to study.",
    achievement: "Completed first solo domestic socket installation"
  };

  const collegeExpectations = [
    {
      subject: "18th Edition Wiring Regulations",
      hours: "120 hours",
      assessment: "Online exam (66% pass rate)",
      importance: "Essential for progression to Year 3"
    },
    {
      subject: "Electrical Installation Work",
      hours: "80 hours",
      assessment: "Practical assessments",
      importance: "Builds on Year 1 fundamentals"
    },
    {
      subject: "Electrical Science",
      hours: "60 hours", 
      assessment: "Written assignments",
      importance: "Understanding electrical principles"
    }
  ];

  const employerExpectations = [
    "Take initiative on familiar tasks without being asked",
    "Mentor new Year 1 apprentices when appropriate",
    "Contribute ideas during job planning meetings",
    "Complete basic installations under supervision",
    "Maintain accurate records of work completed"
  ];

  const commonChallenges = [
    {
      challenge: "18th Edition Complexity",
      solution: "Create revision cards, join study groups, use online resources",
      support: "Ask your training provider for extra support sessions"
    },
    {
      challenge: "Increased Responsibility Pressure",
      solution: "Communicate concerns early, ask for clarification when needed",
      support: "Regular check-ins with supervisor about workload"
    },
    {
      challenge: "Balancing Work and Study",
      solution: "Create a study timetable, use commute time for revision",
      support: "Negotiate study time with employer if struggling"
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
              <div className="p-3 rounded-lg bg-green-500/20 border border-green-500/30">
                <Users className="h-8 w-8 text-green-400" />
              </div>
              <div>
                <h1 className={`font-bold tracking-tight text-elec-yellow leading-tight ${isMobile ? 'text-2xl' : 'text-4xl'}`}>
                  Year 2: Development
                </h1>
                <p className="text-green-400 font-medium">Growing Your Skills and Confidence</p>
              </div>
            </div>
            <p className={`text-muted-foreground leading-relaxed max-w-3xl mx-auto ${isMobile ? 'text-sm px-1' : 'text-base'}`}>
              Year 2 is about developing independence, building technical skills, and taking on increased responsibility 
              while preparing for your 18th Edition qualification.
            </p>
          </div>
        </div>

        {/* Salary Progression */}
        <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl text-green-400 flex items-center gap-2">
              <PoundSterling className="h-5 w-5" />
              Year 2 Salary Expectations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-elec-gray/50 rounded-lg">
                <h4 className="font-medium text-white mb-2">National Average</h4>
                <p className="text-2xl font-bold text-green-400">{salaryProgression.year2}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {salaryProgression.yearlyIncrease} increase from Year 1
                </p>
              </div>
              <div className="text-center p-4 bg-elec-gray/50 rounded-lg">
                <h4 className="font-medium text-white mb-2">London</h4>
                <p className="text-xl font-bold text-green-400">{salaryProgression.regional.london}</p>
                <p className="text-sm text-muted-foreground">Higher cost of living</p>
              </div>
              <div className="text-center p-4 bg-elec-gray/50 rounded-lg">
                <h4 className="font-medium text-white mb-2">Manchester/Birmingham</h4>
                <p className="text-xl font-bold text-green-400">{salaryProgression.regional.manchester}</p>
                <p className="text-sm text-muted-foreground">Regional rates</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Apprentice Story */}
        <Card className="border-elec-yellow/30 bg-gradient-to-r from-elec-yellow/5 to-orange-500/5">
          <CardHeader>
            <CardTitle className="text-elec-yellow">Year 2 Success Story</CardTitle>
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
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  {apprenticeStory.achievement}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Learning Outcomes */}
        <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl text-green-400 flex items-center gap-2">
              <Target className="h-5 w-5" />
              Learning Outcomes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {learningOutcomes.map((outcome, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-elec-gray/50 rounded-lg border border-green-500/20">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{outcome}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* College Expectations */}
        <Card className="border-elec-yellow/20 bg-elec-gray/30 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl text-elec-yellow flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              College & Training Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {collegeExpectations.map((subject, index) => (
                <div key={index} className="p-4 bg-elec-gray/50 rounded-lg border border-elec-yellow/20">
                  <h4 className="font-medium text-white mb-2">{subject.subject}</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">Duration: {subject.hours}</p>
                    <p className="text-muted-foreground">Assessment: {subject.assessment}</p>
                    <p className="text-green-400 font-medium">{subject.importance}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skills Development & Employer Expectations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                      <Badge variant="outline" className="border-green-500/30 text-green-400 text-xs">
                        {skill.level}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{skill.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-elec-yellow/20 bg-elec-gray/30 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg text-elec-yellow flex items-center gap-2">
                <Users className="h-5 w-5" />
                Employer Expectations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {employerExpectations.map((expectation, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm text-muted-foreground">{expectation}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Common Challenges */}
        <Card className="border-orange-500/30 bg-orange-500/10">
          <CardHeader>
            <CardTitle className="text-orange-400 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Common Year 2 Challenges & Solutions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {commonChallenges.map((item, index) => (
                <div key={index} className="p-4 bg-elec-gray/50 rounded-lg border border-orange-500/20">
                  <h4 className="font-medium text-white mb-2">{item.challenge}</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong className="text-green-400">Solution:</strong> {item.solution}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-blue-400">Support Available:</strong> {item.support}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Success Tips */}
        <Card className="border-green-500/30 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Success Tips for Year 2
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-white mb-2">Technical Development</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Master the 18th Edition regulations early</li>
                  <li>• Practice circuit design at home</li>
                  <li>• Build a personal tool collection</li>
                  <li>• Learn from different tradespeople on site</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Professional Growth</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Take on leadership with Year 1 apprentices</li>
                  <li>• Volunteer for challenging projects</li>
                  <li>• Join electrical trade associations</li>
                  <li>• Build relationships with suppliers</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Year2;
