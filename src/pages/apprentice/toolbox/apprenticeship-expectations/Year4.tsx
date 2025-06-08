
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Award, Trophy, Users, Target, CheckCircle, Briefcase, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const Year4 = () => {
  const isMobile = useIsMobile();

  const learningOutcomes = [
    "Complete advanced electrical installations independently",
    "Lead and mentor junior apprentices effectively",
    "Take project responsibility and manage timelines",
    "Pass final Level 3 assessments and EPA (End Point Assessment)",
    "Transition successfully to qualified electrician status"
  ];

  const advancedSkills = [
    {
      skill: "Project Leadership",
      level: "Advanced",
      description: "Managing complete installations from planning to commissioning",
      capabilities: ["Resource planning", "Timeline management", "Quality assurance", "Team coordination"]
    },
    {
      skill: "Advanced Installations",
      level: "Expert", 
      description: "Complex electrical systems and cutting-edge technology",
      capabilities: ["Smart home systems", "EV charging points", "Solar PV integration", "Industrial control panels"]
    },
    {
      skill: "Mentoring & Training",
      level: "Proficient",
      description: "Developing the next generation of apprentices",
      capabilities: ["Teaching techniques", "Assessment skills", "Feedback delivery", "Progress monitoring"]
    },
    {
      skill: "Business Awareness",
      level: "Developing",
      description: "Understanding the commercial aspects of electrical work",
      capabilities: ["Cost estimation", "Customer relations", "Compliance management", "Quality standards"]
    }
  ];

  const finalAssessments = [
    {
      assessment: "End Point Assessment (EPA)",
      components: ["Knowledge test", "Practical observation", "Professional discussion"],
      preparation: "12-month preparation period with portfolio building and skills demonstration"
    },
    {
      assessment: "Level 3 Portfolio",
      components: ["Work evidence", "Reflective accounts", "Witness testimonies", "Competency demonstrations"],
      preparation: "Ongoing documentation throughout Year 4 with assessor support"
    },
    {
      assessment: "Professional Discussion",
      components: ["Technical questioning", "Problem-solving scenarios", "Regulatory knowledge", "Safety awareness"],
      preparation: "Mock interviews and scenario-based practice sessions"
    }
  ];

  const careerOptions = [
    {
      path: "Employed Electrician",
      description: "Join an established electrical contractor",
      benefits: ["Steady income", "Continued learning", "Team environment", "Career progression"],
      considerations: ["Less autonomy", "Fixed salary", "Company policies", "Limited control over projects"]
    },
    {
      path: "Self-Employed Electrician", 
      description: "Start your own electrical business",
      benefits: ["Be your own boss", "Higher earning potential", "Choose your projects", "Build your reputation"],
      considerations: ["Business responsibilities", "Finding customers", "Financial management", "Insurance requirements"]
    },
    {
      path: "Specialisation Route",
      description: "Focus on specific electrical disciplines",
      benefits: ["Expert knowledge", "Premium rates", "Niche market", "Professional recognition"],
      considerations: ["Additional training", "Limited market", "Specialist equipment", "Continuous development"]
    }
  ];

  const transitionSupport = [
    {
      area: "CV and Job Applications",
      support: ["Professional CV building", "Interview preparation", "Portfolio presentation", "Reference management"]
    },
    {
      area: "Continued Professional Development",
      support: ["Further qualifications", "Specialist training", "Industry networking", "Skills updating"]
    },
    {
      area: "Business Setup (if self-employed)",
      support: ["Business registration", "Insurance guidance", "Marketing basics", "Financial planning"]
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
              <div className="p-3 rounded-lg bg-purple-500/20 border border-purple-500/30">
                <Award className="h-8 w-8 text-purple-400" />
              </div>
              <div>
                <h1 className={`font-bold tracking-tight text-elec-yellow leading-tight ${isMobile ? 'text-2xl' : 'text-4xl'}`}>
                  Year 4: Mastery
                </h1>
                <p className="text-purple-400 font-medium">Qualification & Career Transition</p>
              </div>
            </div>
            <p className={`text-muted-foreground leading-relaxed max-w-3xl mx-auto ${isMobile ? 'text-sm px-1' : 'text-base'}`}>
              Your final year focuses on mastering advanced skills, completing your qualification, 
              and preparing for the transition to qualified electrician status.
            </p>
          </div>
        </div>

        {/* Learning Outcomes */}
        <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl text-purple-400 flex items-center gap-2">
              <Target className="h-5 w-5" />
              Year 4 Learning Outcomes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {learningOutcomes.map((outcome, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-elec-gray/50 rounded-lg border border-purple-500/20">
                  <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{outcome}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Advanced Skills Development */}
        <Card className="border-elec-yellow/20 bg-elec-gray/30 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl text-elec-yellow flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Advanced Skills Mastery
            </CardTitle>
            <p className="text-sm text-muted-foreground">Professional-level competencies expected in Year 4</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {advancedSkills.map((skill, index) => (
                <div key={index} className="p-4 bg-elec-gray/50 rounded-lg border border-elec-yellow/20">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-white">{skill.skill}</h4>
                    <Badge variant="outline" className="border-purple-500/30 text-purple-400 text-xs">
                      {skill.level}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{skill.description}</p>
                  <div className="grid grid-cols-2 gap-1">
                    {skill.capabilities.map((capability, capIndex) => (
                      <div key={capIndex} className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                        <span className="text-xs text-muted-foreground">{capability}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Final Assessments */}
        <Card className="border-elec-yellow/20 bg-elec-gray/30 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl text-elec-yellow flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Final Assessments & EPA
            </CardTitle>
            <p className="text-sm text-muted-foreground">End Point Assessment and qualification completion</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {finalAssessments.map((assessment, index) => (
                <div key={index} className="p-4 bg-elec-gray/50 rounded-lg border border-elec-yellow/20">
                  <h4 className="font-medium text-white mb-2">{assessment.assessment}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{assessment.preparation}</p>
                  <div className="flex flex-wrap gap-2">
                    {assessment.components.map((component, compIndex) => (
                      <Badge 
                        key={compIndex} 
                        variant="outline" 
                        className="border-purple-500/30 text-purple-400 text-xs"
                      >
                        {component}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Career Path Options */}
        <Card className="border-elec-yellow/20 bg-elec-gray/30 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl text-elec-yellow flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Post-Apprenticeship Career Options
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {careerOptions.map((option, index) => (
                <div key={index} className="p-4 bg-elec-gray/50 rounded-lg border border-elec-yellow/20">
                  <h4 className="font-medium text-white mb-2">{option.path}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{option.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-green-400 text-sm mb-2">Benefits</h5>
                      <ul className="space-y-1">
                        {option.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="text-xs text-muted-foreground flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-orange-400 text-sm mb-2">Considerations</h5>
                      <ul className="space-y-1">
                        {option.considerations.map((consideration, consIndex) => (
                          <li key={consIndex} className="text-xs text-muted-foreground flex items-center gap-2">
                            <span className="w-3 h-3 border border-orange-400 rounded-full flex-shrink-0"></span>
                            {consideration}
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

        {/* Transition Support */}
        <Card className="border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Transition Support Available
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {transitionSupport.map((support, index) => (
                <div key={index}>
                  <h4 className="font-medium text-white mb-3">{support.area}</h4>
                  <ul className="space-y-2">
                    {support.support.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Congratulations Card */}
        <Card className="border-green-500/30 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Congratulations on Completing Your Apprenticeship!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Completing a 4-year electrical apprenticeship is a significant achievement. You've developed 
                the skills, knowledge, and professional attributes needed to succeed as a qualified electrician 
                in the UK electrical industry.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <h4 className="font-medium text-green-400 mb-1">Technical Skills</h4>
                  <p className="text-muted-foreground">Expert electrical installation and testing abilities</p>
                </div>
                <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <h4 className="font-medium text-green-400 mb-1">Professional Development</h4>
                  <p className="text-muted-foreground">Leadership, mentoring, and business awareness</p>
                </div>
                <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <h4 className="font-medium text-green-400 mb-1">Career Ready</h4>
                  <p className="text-muted-foreground">Prepared for employment or self-employment</p>
                </div>
              </div>
              <p className="text-elec-yellow font-medium">
                Welcome to the professional electrical industry!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Year4;
