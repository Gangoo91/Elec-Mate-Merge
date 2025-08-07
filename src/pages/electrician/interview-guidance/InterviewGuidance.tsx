import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropdownTabs } from "@/components/ui/dropdown-tabs";
import { MessageCircle, FileText, Users, Lightbulb, HandHeart, AlertTriangle } from "lucide-react";
import InterviewPrepTab from "./tabs/InterviewPrepTab";
import InterviewTypesTab from "./tabs/InterviewTypesTab";
import CommonQuestionsTab from "./tabs/CommonQuestionsTab";
import PresentationSkillsTab from "./tabs/PresentationSkillsTab";
import FollowUpTab from "./tabs/FollowUpTab";
import TroubleshootingTab from "./tabs/TroubleshootingTab";

export default function InterviewGuidance() {
  const tabs = [
    {
      value: "preparation",
      label: "Interview Preparation",
      icon: FileText,
      content: <InterviewPrepTab />
    },
    {
      value: "types",
      label: "Interview Types & Formats",
      icon: Users,
      content: <InterviewTypesTab />
    },
    {
      value: "questions",
      label: "Common Questions & Answers",
      icon: MessageCircle,
      content: <CommonQuestionsTab />
    },
    {
      value: "presentation",
      label: "Presentation & Professional Skills",
      icon: Lightbulb,
      content: <PresentationSkillsTab />
    },
    {
      value: "followup",
      label: "Follow-up & Negotiation",
      icon: HandHeart,
      content: <FollowUpTab />
    },
    {
      value: "troubleshooting",
      label: "Troubleshooting Challenges",
      icon: AlertTriangle,
      content: <TroubleshootingTab />
    }
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="space-y-6">
          <BackButton customUrl="/electrician/job-vacancies" label="Back to Job Vacancies" />
          
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Interview Guidance
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Master every aspect of the electrical job interview process. From preparation strategies to post-interview follow-up, 
              we'll help you showcase your skills and secure the role you want in the UK electrical industry.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <DropdownTabs
          tabs={tabs}
          defaultValue="preparation"
          placeholder="Select interview topic"
          className="w-full"
        />

        {/* Key Reminder Card */}
        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <MessageCircle className="h-5 w-5" />
              Interview Success Formula
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Remember: Technical competence + Professional presentation + Cultural fit = Interview success
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">BS 7671 Knowledge</Badge>
              <Badge variant="secondary">Safety First Mindset</Badge>
              <Badge variant="secondary">Professional Communication</Badge>
              <Badge variant="secondary">Problem-Solving Skills</Badge>
              <Badge variant="secondary">Continuous Learning</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}