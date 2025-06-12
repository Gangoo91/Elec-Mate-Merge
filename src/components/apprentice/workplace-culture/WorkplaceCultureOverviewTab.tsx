
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MessageSquare, Users, Building, TrendingUp, Clock, CheckCircle, AlertTriangle, Star, Target } from "lucide-react";

const WorkplaceCultureOverviewTab = () => {
  const keyStats = [
    { label: "Communication Skills Impact", value: "85%", description: "of workplace success attributed to good communication" },
    { label: "Career Progression", value: "60%", description: "faster promotion with strong workplace relationships" },
    { label: "Job Satisfaction", value: "90%", description: "higher when workplace culture is understood" },
    { label: "Conflict Reduction", value: "70%", description: "fewer workplace issues with cultural awareness" }
  ];

  const cultureTopics = [
    { topic: "Professional Communication", progress: 75, category: "Essential" },
    { topic: "Site Hierarchy & Respect", progress: 85, category: "Critical" },
    { topic: "Electrical Industry Jargon", progress: 60, category: "Important" },
    { topic: "Regional Variations", progress: 45, category: "Useful" },
    { topic: "Client Interaction", progress: 70, category: "Essential" },
    { topic: "Team Collaboration", progress: 80, category: "Critical" }
  ];

  const workplaceChallenges = [
    {
      challenge: "Understanding Site Hierarchy",
      description: "Learning who to report to and how to communicate up the chain",
      tips: ["Always respect experience levels", "Ask questions through proper channels", "Show initiative without overstepping"]
    },
    {
      challenge: "Technical Language Barriers",
      description: "Mastering industry-specific terminology and abbreviations",
      tips: ["Keep a glossary of terms", "Ask for clarification when unsure", "Practice using terms in context"]
    },
    {
      challenge: "Regional Communication Differences",
      description: "Adapting to local working styles and communication preferences",
      tips: ["Observe local customs", "Be flexible in your approach", "Ask colleagues about local practices"]
    },
    {
      challenge: "Client-Facing Situations",
      description: "Representing your company professionally when dealing with customers",
      tips: ["Always be polite and professional", "Know when to refer to supervisor", "Keep clients informed of progress"]
    }
  ];

  const industryExpectations = [
    {
      area: "Punctuality & Reliability",
      description: "Being on time and consistent in your work habits",
      expectations: ["Arrive 10-15 minutes early", "Call ahead if running late", "Maintain consistent work quality", "Follow through on commitments"]
    },
    {
      area: "Safety Communication",
      description: "Speaking up about safety concerns and following protocols",
      expectations: ["Report hazards immediately", "Use proper safety terminology", "Ask questions about unfamiliar procedures", "Never compromise on safety for speed"]
    },
    {
      area: "Professional Appearance",
      description: "Maintaining appropriate dress and presentation standards",
      expectations: ["Clean, well-maintained PPE", "Company uniform worn correctly", "Personal hygiene standards", "Tools and equipment properly maintained"]
    },
    {
      area: "Work Ethic & Attitude",
      description: "Demonstrating commitment and positive approach to learning",
      expectations: ["Show enthusiasm for learning", "Take initiative when appropriate", "Accept feedback positively", "Support team goals"]
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Critical": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "Essential": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "Important": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Useful": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Workplace Culture & Communication Hub</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Understanding workplace culture in the UK electrical industry is crucial for your success as an apprentice. 
            This comprehensive guide covers everything from professional communication to regional differences and industry-specific protocols.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {keyStats.map((stat, index) => (
              <div key={index} className="text-center p-4 border border-elec-yellow/20 rounded-lg">
                <div className="text-2xl font-bold text-elec-yellow mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-white mb-1">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Common Workplace Challenges */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-elec-yellow" />
            Common Workplace Challenges for Apprentices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workplaceChallenges.map((item, index) => (
              <div key={index} className="space-y-3 p-4 border border-elec-yellow/20 rounded-lg">
                <h4 className="font-semibold text-elec-yellow">{item.challenge}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-white">Tips for Success:</h5>
                  {item.tips.map((tip, tipIndex) => (
                    <div key={tipIndex} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Industry Expectations */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Star className="h-5 w-5 text-elec-yellow" />
            Industry Expectations & Standards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {industryExpectations.map((area, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-elec-yellow" />
                  <h4 className="font-semibold text-white">{area.area}</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{area.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {area.expectations.map((expectation, expIndex) => (
                    <div key={expIndex} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{expectation}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-elec-yellow" />
              Your Culture Learning Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cultureTopics.map((topic, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white">{topic.topic}</span>
                    <Badge className={getCategoryColor(topic.category)} variant="outline">
                      {topic.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={topic.progress} className="flex-1" />
                    <span className="text-sm text-elec-yellow w-12 text-right">{topic.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Building className="h-5 w-5 text-elec-yellow" />
              Why Workplace Culture Matters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-white">Safety & Compliance</h4>
                  <p className="text-sm text-muted-foreground">Clear communication prevents accidents and ensures regulatory compliance</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-white">Career Advancement</h4>
                  <p className="text-sm text-muted-foreground">Strong relationships with colleagues and supervisors accelerate progression</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-white">Client Satisfaction</h4>
                  <p className="text-sm text-muted-foreground">Professional communication builds trust and secures repeat business</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-white">Industry Reputation</h4>
                  <p className="text-sm text-muted-foreground">Good workplace behaviour enhances the electrical trade's professional image</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-blue-500/20 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Getting Started Recommendation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            New to workplace culture? We recommend starting with these essential areas:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border border-blue-500/30 rounded-lg">
              <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <h4 className="font-medium text-white mb-1">Communication Basics</h4>
              <p className="text-xs text-muted-foreground">Learn fundamental workplace communication skills</p>
            </div>
            <div className="text-center p-4 border border-blue-500/30 rounded-lg">
              <Building className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <h4 className="font-medium text-white mb-1">Site Hierarchy</h4>
              <p className="text-xs text-muted-foreground">Understand roles and reporting structures</p>
            </div>
            <div className="text-center p-4 border border-blue-500/30 rounded-lg">
              <MessageSquare className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <h4 className="font-medium text-white mb-1">Professional Language</h4>
              <p className="text-xs text-muted-foreground">Master industry terminology and etiquette</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkplaceCultureOverviewTab;
