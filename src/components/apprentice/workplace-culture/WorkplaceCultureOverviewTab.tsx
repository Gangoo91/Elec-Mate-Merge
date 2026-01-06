
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
      default: return "bg-white/10 text-white border-white/20";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Header */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
              <MessageSquare className="h-5 w-5 text-elec-yellow" />
            </div>
            Workplace Culture & Communication Hub
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <p className="text-white/70 mb-6">
            Understanding workplace culture in the UK electrical industry is crucial for your success as an apprentice.
            This comprehensive guide covers everything from professional communication to regional differences and industry-specific protocols.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {keyStats.map((stat, index) => (
              <div key={index} className="text-center p-4 rounded-xl bg-white/10 border border-elec-yellow/20 hover:border-elec-yellow/40 transition-all">
                <div className="text-2xl font-bold text-elec-yellow mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-white mb-1">{stat.label}</div>
                <div className="text-xs text-white/60">{stat.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Common Workplace Challenges */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-orange-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/30">
              <AlertTriangle className="h-5 w-5 text-orange-400" />
            </div>
            Common Workplace Challenges for Apprentices
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workplaceChallenges.map((item, index) => (
              <div key={index} className="space-y-3 p-4 rounded-xl bg-white/10 border border-white/10 hover:border-orange-500/30 transition-all">
                <h4 className="font-semibold text-orange-400">{item.challenge}</h4>
                <p className="text-sm text-white/60">{item.description}</p>
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-white">Tips for Success:</h5>
                  {item.tips.map((tip, tipIndex) => (
                    <div key={tipIndex} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/70">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Industry Expectations */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-purple-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30">
              <Star className="h-5 w-5 text-purple-400" />
            </div>
            Industry Expectations & Standards
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 relative">
          {industryExpectations.map((area, index) => (
            <div key={index} className="p-4 rounded-xl bg-white/10 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <Target className="h-4 w-4 text-purple-400" />
                </div>
                <h4 className="font-semibold text-white">{area.area}</h4>
              </div>
              <p className="text-sm text-white/60 mb-4">{area.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {area.expectations.map((expectation, expIndex) => (
                  <div key={expIndex} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-white/70">{expectation}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-cyan-500/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardHeader className="relative">
            <CardTitle className="text-white flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/30">
                <TrendingUp className="h-4 w-4 text-cyan-400" />
              </div>
              Your Culture Learning Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 relative">
            {cultureTopics.map((topic, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">{topic.topic}</span>
                  <Badge className={getCategoryColor(topic.category)} variant="outline">
                    {topic.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full transition-all duration-500"
                      style={{ width: `${topic.progress}%` }}
                    />
                  </div>
                  <span className="text-sm text-cyan-400 w-12 text-right font-medium">{topic.progress}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-green-500/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardHeader className="relative">
            <CardTitle className="text-white flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30">
                <Building className="h-4 w-4 text-green-400" />
              </div>
              Why Workplace Culture Matters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 relative">
            {[
              { title: "Safety & Compliance", description: "Clear communication prevents accidents and ensures regulatory compliance" },
              { title: "Career Advancement", description: "Strong relationships with colleagues and supervisors accelerate progression" },
              { title: "Client Satisfaction", description: "Professional communication builds trust and secures repeat business" },
              { title: "Industry Reputation", description: "Good workplace behaviour enhances the electrical trade's professional image" }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-white/10 border border-white/10">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-white">{item.title}</h4>
                  <p className="text-sm text-white/60">{item.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-blue-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30">
              <Clock className="h-5 w-5 text-blue-400" />
            </div>
            Getting Started Recommendation
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <p className="text-white/70 mb-4">
            New to workplace culture? We recommend starting with these essential areas:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Users, title: "Communication Basics", description: "Learn fundamental workplace communication skills" },
              { icon: Building, title: "Site Hierarchy", description: "Understand roles and reporting structures" },
              { icon: MessageSquare, title: "Professional Language", description: "Master industry terminology and etiquette" }
            ].map((item, index) => (
              <div key={index} className="text-center p-4 rounded-xl bg-white/10 border border-blue-500/20 hover:border-blue-500/40 transition-all">
                <div className="p-3 rounded-xl bg-blue-500/10 w-fit mx-auto mb-3">
                  <item.icon className="h-6 w-6 text-blue-400" />
                </div>
                <h4 className="font-medium text-white mb-1">{item.title}</h4>
                <p className="text-xs text-white/60">{item.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkplaceCultureOverviewTab;
