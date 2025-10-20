import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import TutorInterface from "@/components/electrician-tools/ai-agents/TutorInterface";

const TutorPage = () => {
  return (
    <div className="min-h-screen bg-elec-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 py-4 sm:py-6">
        <div className="space-y-6 animate-fade-in">
          {/* Back Button */}
          <Link to="/electrician/agent-selector">
            <Button variant="outline" size="sm" className="gap-2 touch-manipulation h-10">
              <ArrowLeft className="h-4 w-4" /> Back to Agent Selector
            </Button>
          </Link>

          {/* Header */}
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              Training Tutor
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base mt-2">
              Educational guidance, exam prep & concept explanations for apprentices
            </p>
          </div>

          {/* Main Interface */}
          <TutorInterface />
        </div>
      </div>
    </div>
  );
};

export default TutorPage;
