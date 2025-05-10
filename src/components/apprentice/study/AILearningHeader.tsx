
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot } from "lucide-react";

const AILearningHeader = () => {
  return (
    <Card className="col-span-full border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/90 transition-colors">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Bot className="h-6 w-6 text-elec-yellow" />
          AI-Powered Learning Assistant
        </CardTitle>
        <CardDescription>
          Use these AI tools to enhance your studies and prepare for UK electrical qualifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Our AI learning tools are designed specifically for UK electrical apprentices. They provide personalised
          support for studying BS 7671 regulations, preparing for exams, and understanding complex electrical concepts.
          Each tool adapts to your needs and learning style to help you succeed in your qualifications.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <div className="bg-elec-dark p-3 rounded-lg">
            <h3 className="text-sm font-medium text-elec-yellow mb-1">Regulations Search</h3>
            <p className="text-xs text-muted-foreground">Find and understand BS 7671 requirements</p>
          </div>
          <div className="bg-elec-dark p-3 rounded-lg">
            <h3 className="text-sm font-medium text-elec-yellow mb-1">Concept Explainer</h3>
            <p className="text-xs text-muted-foreground">Clear explanations of electrical theory</p>
          </div>
          <div className="bg-elec-dark p-3 rounded-lg">
            <h3 className="text-sm font-medium text-elec-yellow mb-1">Study Planner</h3>
            <p className="text-xs text-muted-foreground">Personalised study schedules</p>
          </div>
          <div className="bg-elec-dark p-3 rounded-lg">
            <h3 className="text-sm font-medium text-elec-yellow mb-1">Exam Bot</h3>
            <p className="text-xs text-muted-foreground">Practice with AI-generated questions</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AILearningHeader;
