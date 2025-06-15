
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Users, Search, FileText, Target, CheckCircle, AlertTriangle } from "lucide-react";

const RecruitmentTab = () => {
  const recruitmentChannels = [
    {
      name: "Industry Job Boards",
      effectiveness: "High",
      cost: "Medium",
      examples: ["ElectricalJobs.com", "Indeed", "Reed", "Totaljobs"],
      tips: "Post detailed job descriptions with clear requirements"
    },
    {
      name: "Trade Associations",
      effectiveness: "High", 
      cost: "Low",
      examples: ["ECA", "NICEIC", "NAPIT", "SELECT"],
      tips: "Network at local branch meetings and events"
    },
    {
      name: "Local Colleges",
      effectiveness: "Medium",
      cost: "Low",
      examples: ["FE Colleges", "Training Providers", "University Technical Colleges"],
      tips: "Build relationships with tutors and attend career fairs"
    },
    {
      name: "Social Media",
      effectiveness: "Medium",
      cost: "Low",
      examples: ["LinkedIn", "Facebook Groups", "Twitter", "Instagram"],
      tips: "Share company culture and day-to-day work content"
    }
  ];

  const essentialSkills = [
    "18th Edition Wiring Regulations (BS 7671:2018+A2:2022)",
    "Inspection and Testing qualifications (2391/2394/2395)",
    "AM2 Assessment or equivalent practical qualification",
    "Health and Safety awareness (CSCS card preferred)",
    "Fault finding and diagnostic skills",
    "Customer service and communication skills"
  ];

  const interviewQuestions = [
    "Describe your experience with different electrical systems",
    "How do you approach fault finding on a complex circuit?",
    "What safety procedures do you follow before starting work?",
    "Tell me about a challenging installation you've completed",
    "How do you stay updated with regulation changes?",
    "Describe a time you dealt with a difficult customer"
  ];

  return (
    <div className="space-y-6">
      <Alert className="border-blue-500/50 bg-blue-500/10">
        <Target className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          Quality recruitment saves time and money in the long run. Take time to find the right candidates.
        </AlertDescription>
      </Alert>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Search className="h-5 w-5" />
            Recruitment Channels
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {recruitmentChannels.map((channel, index) => (
              <div key={index} className="border border-elec-yellow/10 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-white">{channel.name}</h4>
                  <div className="flex gap-2">
                    <Badge variant="outline" className={`${
                      channel.effectiveness === 'High' ? 'text-green-300 border-green-400/30' :
                      'text-yellow-300 border-yellow-400/30'
                    }`}>
                      {channel.effectiveness} Success
                    </Badge>
                    <Badge variant="outline" className="text-blue-300 border-blue-400/30">
                      {channel.cost} Cost
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{channel.tips}</p>
                <div className="flex flex-wrap gap-1">
                  {channel.examples.map((example, exIndex) => (
                    <Badge key={exIndex} variant="secondary" className="text-xs">
                      {example}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-green-500/50 bg-green-500/10">
          <CardHeader>
            <CardTitle className="text-green-300 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Essential Skills & Qualifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {essentialSkills.map((skill, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Badge variant="outline" className="mt-0.5 h-2 w-2 rounded-full p-0 border-green-400/50 bg-green-400/20" />
                  <span className="text-green-100">{skill}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-purple-500/50 bg-purple-500/10">
          <CardHeader>
            <CardTitle className="text-purple-300 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Interview Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {interviewQuestions.map((question, index) => (
                <li key={index} className="text-sm text-purple-100">
                  <strong>{index + 1}.</strong> {question}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Alert className="border-orange-500/50 bg-orange-500/10">
        <AlertTriangle className="h-4 w-4 text-orange-400" />
        <AlertDescription className="text-orange-200">
          <strong>Legal Reminder:</strong> Ensure all recruitment practices comply with equality legislation. 
          Focus on skills and qualifications, not personal characteristics.
        </AlertDescription>
      </Alert>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Quick Start Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm">Write clear job description with salary range</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm">Post on 2-3 relevant job boards</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm">Contact local college tutors</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm">Prepare interview questions and practical tests</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm">Check references and qualifications</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecruitmentTab;
