
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Award, CheckCircle, AlertTriangle, Target, TrendingUp, Users, PoundSterling, Briefcase, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const Year4 = () => {
  const isMobile = useIsMobile();

  const learningOutcomes = [
    "Complete advanced electrical installations independently",
    "Mentor and train junior apprentices effectively",
    "Take project responsibility and manage timelines",
    "Pass all final assessments and portfolio requirements",
    "Prepare for transition to qualified electrician status"
  ];

  const skillsDeveloped = [
    { skill: "Project Management", level: "Advanced", description: "Planning jobs, managing resources, meeting deadlines" },
    { skill: "Mentoring & Training", level: "Competent", description: "Teaching techniques, knowledge transfer, leadership" },
    { skill: "Advanced Installations", level: "Expert", description: "Complex wiring, motor control, emergency lighting" },
    { skill: "Business Awareness", level: "Developing", description: "Cost awareness, customer relations, quality standards" }
  ];

  const salaryProgression = {
    year4: "£28,000 - £35,000",
    postQualification: "£32,000 - £45,000",
    yearlyIncrease: "15-25%",
    regional: {
      london: "£35,000 - £42,000",
      manchester: "£28,000 - £35,000",
      birmingham: "£30,000 - £37,000"
    }
  };

  const apprenticeStory = {
    name: "Emma R.",
    location: "Newcastle",
    quote: "Year 4 felt like I was already a qualified electrician in everything but name. I was running my own jobs, training the new apprentices, and even helping with quotes. The final assessments were nerve-wracking but all the preparation paid off.",
    achievement: "Achieved distinction in final portfolio assessment"
  };

  const finalAssessments = [
    {
      assessment: "End Point Assessment (EPA)",
      format: "Practical demonstration + Professional discussion",
      duration: "2 days",
      passRate: "85%",
      preparation: "6 months structured revision"
    },
    {
      assessment: "Portfolio Review",
      format: "Evidence compilation + Presentation", 
      duration: "Ongoing",
      passRate: "95%",
      preparation: "Regular portfolio updates throughout apprenticeship"
    },
    {
      assessment: "Knowledge Test",
      format: "Multiple choice exam",
      duration: "90 minutes",
      passRate: "78%",
      preparation: "Practice tests and revision sessions"
    }
  ];

  const careerTransitionPlan = [
    {
      milestone: "Months 1-3",
      focus: "EPA Preparation",
      activities: ["Portfolio completion", "Practice assessments", "Revision planning"],
      outcome: "Ready for formal assessment"
    },
    {
      milestone: "Months 4-6", 
      focus: "Assessment Period",
      activities: ["Complete EPA", "Final college submissions", "Job application preparation"],
      outcome: "Pass all assessments"
    },
    {
      milestone: "Months 7-9",
      focus: "Qualification Transition",
      activities: ["JIB registration", "Qualified role negotiation", "Continued development planning"],
      outcome: "Transition to qualified electrician"
    },
    {
      milestone: "Months 10-12",
      focus: "Career Development", 
      activities: ["Specialisation training", "Advanced qualifications", "Professional development"],
      outcome: "Established qualified electrician"
    }
  ];

  const businessSkills = [
    "Understanding job costing and pricing",
    "Customer relationship management",
    "Quality control and standards",
    "Health and safety leadership",
    "Efficient work planning and execution"
  ];

  const postQualificationOptions = [
    {
      path: "Employed Electrician",
      description: "Continue with current employer as qualified electrician",
      pros: ["Job security", "Regular income", "Continued learning", "Career progression"],
      cons: ["Limited earning potential", "Less flexibility", "Company procedures"],
      suitability: "Good for stable career progression"
    },
    {
      path: "Self-Employed",
      description: "Start own electrical contracting business",
      pros: ["Higher earning potential", "Flexibility", "Choose clients", "Build business"],
      cons: ["Irregular income", "Business risk", "Admin responsibilities", "Insurance costs"],
      suitability: "For entrepreneurial mindset"
    },
    {
      path: "Specialisation",
      description: "Focus on specific electrical discipline",
      pros: ["Expert knowledge", "Premium rates", "Less competition", "Job satisfaction"],
      cons: ["Narrower market", "Additional training", "Equipment investment"],
      suitability: "For technical experts"
    }
  ];

  const mentoringTips = [
    "Share your early apprenticeship experiences honestly",
    "Demonstrate proper techniques rather than just explaining",
    "Be patient - everyone learns at different speeds",
    "Encourage questions and create a safe learning environment",
    "Lead by example in safety and professionalism"
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
                <p className="text-purple-400 font-medium">Preparing for Qualification and Career Success</p>
              </div>
            </div>
            <p className={`text-muted-foreground leading-relaxed max-w-3xl mx-auto ${isMobile ? 'text-sm px-1' : 'text-base'}`}>
              Your final year focuses on mastering advanced skills, mentoring others, and successfully completing 
              your apprenticeship to become a qualified electrician.
            </p>
          </div>
        </div>

        {/* Salary Progression */}
        <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl text-purple-400 flex items-center gap-2">
              <PoundSterling className="h-5 w-5" />
              Year 4 & Post-Qualification Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-white mb-3">Year 4 Apprentice Salary</h4>
                <div className="text-center p-4 bg-elec-gray/50 rounded-lg mb-4">
                  <p className="text-2xl font-bold text-purple-400">{salaryProgression.year4}</p>
                  <p className="text-sm text-muted-foreground">{salaryProgression.yearlyIncrease} increase</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-white mb-3">Qualified Electrician Salary</h4>
                <div className="text-center p-4 bg-elec-gray/50 rounded-lg mb-4">
                  <p className="text-2xl font-bold text-green-400">{salaryProgression.postQualification}</p>
                  <p className="text-sm text-muted-foreground">Upon qualification</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="text-center p-3 bg-elec-gray/30 rounded-lg">
                <h5 className="text-sm font-medium text-white">London</h5>
                <p className="text-lg font-bold text-purple-400">{salaryProgression.regional.london}</p>
              </div>
              <div className="text-center p-3 bg-elec-gray/30 rounded-lg">
                <h5 className="text-sm font-medium text-white">Manchester</h5>
                <p className="text-lg font-bold text-purple-400">{salaryProgression.regional.manchester}</p>
              </div>
              <div className="text-center p-3 bg-elec-gray/30 rounded-lg">
                <h5 className="text-sm font-medium text-white">Birmingham</h5>
                <p className="text-lg font-bold text-purple-400">{salaryProgression.regional.birmingham}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Apprentice Story */}
        <Card className="border-elec-yellow/30 bg-gradient-to-r from-elec-yellow/5 to-purple-500/5">
          <CardHeader>
            <CardTitle className="text-elec-yellow">Year 4 Success Story</CardTitle>
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
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                  {apprenticeStory.achievement}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final Assessments */}
        <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Final Assessments & Requirements
            </CardTitle>
            <p className="text-sm text-muted-foreground">What you need to pass to become qualified</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {finalAssessments.map((assessment, index) => (
                <div key={index} className="p-4 bg-elec-gray/50 rounded-lg border border-blue-500/20">
                  <h4 className="font-medium text-white mb-2">{assessment.assessment}</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-blue-400">Format:</span> {assessment.format}</p>
                    <p><span className="text-green-400">Duration:</span> {assessment.duration}</p>
                    <p><span className="text-orange-400">Pass Rate:</span> {assessment.passRate}</p>
                    <p><span className="text-purple-400">Preparation:</span> {assessment.preparation}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Career Transition Timeline */}
        <Card className="border-elec-yellow/20 bg-elec-gray/30 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl text-elec-yellow">Year 4 Career Transition Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {careerTransitionPlan.map((phase, index) => (
                <div key={index} className="p-4 bg-elec-gray/50 rounded-lg border border-elec-yellow/20">
                  <h4 className="font-medium text-white mb-2">{phase.milestone}</h4>
                  <p className="text-sm text-elec-yellow mb-3 font-medium">{phase.focus}</p>
                  <ul className="space-y-1 mb-3">
                    {phase.activities.map((activity, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                        <span className="text-green-400 mt-1">•</span>
                        {activity}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs font-medium text-green-400">{phase.outcome}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Learning Outcomes & Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-xl text-purple-400 flex items-center gap-2">
                <Target className="h-5 w-5" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {learningOutcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-elec-gray/50 rounded-lg border border-purple-500/20">
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
                Advanced Skills Development
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillsDeveloped.map((skill, index) => (
                  <div key={index} className="p-3 bg-elec-gray/50 rounded-lg border border-elec-yellow/20">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-white text-sm">{skill.skill}</h4>
                      <Badge variant="outline" className="border-purple-500/30 text-purple-400 text-xs">
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

        {/* Post-Qualification Career Options */}
        <Card className="border-green-500/30 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Post-Qualification Career Options
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {postQualificationOptions.map((option, index) => (
                <div key={index} className="p-4 bg-elec-gray/50 rounded-lg border border-green-500/20">
                  <h4 className="font-medium text-white mb-2">{option.path}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{option.description}</p>
                  
                  <div className="space-y-2 mb-3">
                    <div>
                      <h5 className="text-xs font-medium text-green-400 mb-1">Pros:</h5>
                      <ul className="text-xs text-muted-foreground">
                        {option.pros.map((pro, idx) => (
                          <li key={idx}>• {pro}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-xs font-medium text-orange-400 mb-1">Cons:</h5>
                      <ul className="text-xs text-muted-foreground">
                        {option.cons.map((con, idx) => (
                          <li key={idx}>• {con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <p className="text-xs font-medium text-blue-400">{option.suitability}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Business Skills & Mentoring */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-elec-yellow/20 bg-elec-gray/30 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-elec-yellow flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Business Skills Development
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {businessSkills.map((skill, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 bg-elec-gray/50 rounded-lg">
                    <span className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm text-muted-foreground">{skill}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Mentoring Junior Apprentices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {mentoringTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 bg-elec-gray/50 rounded-lg border border-blue-500/20">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Success Tips */}
        <Card className="border-green-500/30 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Success Tips for Year 4
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-white mb-2">Assessment Success</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Start EPA preparation early in the year</li>
                  <li>• Keep portfolio updated throughout</li>
                  <li>• Practice professional discussions</li>
                  <li>• Seek feedback from assessors regularly</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Career Preparation</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Network with qualified electricians</li>
                  <li>• Research post-qualification opportunities</li>
                  <li>• Consider additional specialisation courses</li>
                  <li>• Plan your first steps as qualified electrician</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final Message */}
        <Card className="border-elec-yellow/50 bg-gradient-to-r from-elec-yellow/10 to-purple-500/10">
          <CardHeader>
            <CardTitle className="text-elec-yellow flex items-center gap-2">
              <Award className="h-5 w-5" />
              Congratulations on Your Journey
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed text-center">
              Completing your electrical apprenticeship is a significant achievement. You've developed from someone who 
              knew nothing about the trade to a skilled professional ready to take on the challenges of being a qualified 
              electrician. The skills, knowledge, and work ethic you've developed will serve you throughout your career. 
              <strong className="text-elec-yellow"> Well done, and welcome to the electrical industry!</strong>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Year4;
