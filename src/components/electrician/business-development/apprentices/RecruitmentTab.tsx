
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Search, Target, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";

const RecruitmentTab = () => {
  const recruitmentChannels = [
    { name: "Apprenticeship.gov.uk", type: "Government Portal", cost: "Free", effectiveness: "High" },
    { name: "Local Colleges", type: "Educational Partnership", cost: "Free", effectiveness: "High" },
    { name: "Job Centre Plus", type: "Government Service", cost: "Free", effectiveness: "Medium" },
    { name: "Indeed/LinkedIn", type: "Commercial Job Board", cost: "£200-500", effectiveness: "Medium" },
    { name: "Local Schools", type: "Direct Outreach", cost: "Time", effectiveness: "High" },
    { name: "Word of Mouth", type: "Referrals", cost: "Free", effectiveness: "Very High" }
  ];

  const interviewQuestions = [
    "Why are you interested in becoming an electrician?",
    "What do you know about electrical safety?",
    "How do you handle working in a team environment?",
    "Describe a time when you had to learn something new quickly",
    "What are your career goals for the next 5 years?",
    "How comfortable are you with heights and confined spaces?",
    "Tell me about a practical project you've worked on",
    "What would you do if you didn't understand a task given to you?"
  ];

  const redFlags = [
    "Lack of interest in learning",
    "Poor communication skills",
    "Unreliable attendance history",
    "Unwillingness to follow safety procedures",
    "Expecting immediate high wages",
    "No questions about the role or company",
    "Negative attitude towards authority",
    "Unwillingness to commit to training duration"
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Effective Recruitment Strategies</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-white mb-3">Key Recruitment Channels</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recruitmentChannels.map((channel, index) => (
                  <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-medium text-white">{channel.name}</h5>
                      <Badge className={
                        channel.effectiveness === "Very High" ? "bg-green-500/20 text-green-400" :
                        channel.effectiveness === "High" ? "bg-blue-500/20 text-blue-400" :
                        "bg-amber-500/20 text-amber-400"
                      }>
                        {channel.effectiveness}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{channel.type}</p>
                    <p className="text-xs text-elec-yellow">Cost: {channel.cost}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Pro Tip: Building a Talent Pipeline
              </h4>
              <p className="text-sm text-muted-foreground">
                Start building relationships with local schools and colleges 6-12 months before you need apprentices. 
                Offer work experience placements and career talks to identify motivated candidates early.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-elec-yellow flex items-center gap-2">
              <Search className="h-5 w-5" />
              Interview Best Practices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-3">Essential Interview Questions</h4>
                <div className="space-y-2">
                  {interviewQuestions.map((question, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 bg-elec-dark/50 rounded">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{question}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                <h5 className="font-medium text-green-400 mb-2">What to Look For</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Genuine interest in the trade</li>
                  <li>• Willingness to learn and take direction</li>
                  <li>• Good communication skills</li>
                  <li>• Practical problem-solving ability</li>
                  <li>• Reliability and punctuality</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-500/20 bg-red-500/10">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Warning Signs to Avoid
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {redFlags.map((flag, index) => (
                <div key={index} className="flex items-start gap-2 p-2 bg-red-500/5 border border-red-500/20 rounded">
                  <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-red-200">{flag}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <h5 className="font-medium text-amber-400 mb-2">Remember</h5>
              <p className="text-sm text-amber-200">
                A poor apprentice hire can cost you thousands in wasted training, reduced productivity, 
                and potential safety issues. Take time to select the right candidate.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Useful Recruitment Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex-col gap-2 border-elec-yellow/30">
              <ExternalLink className="h-5 w-5 text-elec-yellow" />
              <span className="font-medium">Gov.uk Apprenticeships</span>
              <span className="text-xs text-muted-foreground">Official recruitment portal</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2 border-blue-500/30">
              <ExternalLink className="h-5 w-5 text-blue-400" />
              <span className="font-medium">CITB Careers Hub</span>
              <span className="text-xs text-muted-foreground">Industry career resources</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2 border-green-500/30">
              <ExternalLink className="h-5 w-5 text-green-400" />
              <span className="font-medium">Local College Finder</span>
              <span className="text-xs text-muted-foreground">Find training partners</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecruitmentTab;
