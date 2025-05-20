
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ConceptExplainer from "@/components/apprentice/study/ConceptExplainer";
import StudyExamBot from "@/components/apprentice/study/StudyExamBot";
import AILearningHeader from "@/components/apprentice/study/AILearningHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RegulationsSearch from "@/components/apprentice/study/RegulationsSearch";

const AILearning = () => {
  // Track page view for analytics
  useEffect(() => {
    console.log("AI Learning page viewed");
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold">AI Learning Tools</h1>
          <p className="text-muted-foreground">Interactive AI-powered learning resources</p>
        </div>
        <Link to="/apprentice/study">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Study
          </Button>
        </Link>
      </div>

      <AILearningHeader />

      <Tabs defaultValue="concept-explainer" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="concept-explainer">Concept Explainer</TabsTrigger>
          <TabsTrigger value="exam-bot">Study Exam Bot</TabsTrigger>
          <TabsTrigger value="regulations">Regulations Search</TabsTrigger>
        </TabsList>
        
        <TabsContent value="concept-explainer">
          <ConceptExplainer />
        </TabsContent>
        
        <TabsContent value="exam-bot">
          <StudyExamBot />
        </TabsContent>
        
        <TabsContent value="regulations">
          <RegulationsSearch />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AILearning;
