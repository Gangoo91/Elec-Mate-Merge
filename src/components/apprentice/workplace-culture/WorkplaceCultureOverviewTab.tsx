
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MessageSquare, Users, Building, TrendingUp, Clock, CheckCircle } from "lucide-react";

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
