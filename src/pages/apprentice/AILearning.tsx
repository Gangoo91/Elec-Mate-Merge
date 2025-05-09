
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BackButton from "@/components/common/BackButton";
import { Book, Bot, GraduationCap } from "lucide-react";
import StudyExamBot from "@/components/apprentice/study/StudyExamBot";

const AILearning = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">AI Learning Tools</h1>
        <BackButton customUrl="/apprentice/study" label="Back to Study Centre" />
      </div>
      
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-elec-yellow" />
            AI Learning Assistant
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Our AI learning tools are designed to help UK electrical apprentices master complex concepts
            and prepare for qualifications with personalized guidance.
          </p>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <Card className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="h-5 w-5 text-elec-yellow" />
              Concept Explainer
            </CardTitle>
            <CardDescription>
              Get clear explanations of complex electrical concepts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Ask questions about any electrical theory or practical concept and receive easy-to-understand
              explanations based on UK standards and regulations.
            </p>
            <Button className="w-full">
              Open Explainer
            </Button>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-elec-yellow" />
              Study Planner
            </CardTitle>
            <CardDescription>
              Generate personalized study plans for your qualification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Input your qualification goals and timeframe to get a structured study plan
              tailored to your learning style and schedule.
            </p>
            <Button className="w-full">
              Create Study Plan
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <StudyExamBot />
    </div>
  );
};

export default AILearning;
