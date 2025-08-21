import VisualAnalysis from "@/components/electrician-tools/ai-tools/VisualAnalysis";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const VisualAnalysisPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-3 sm:p-6 space-y-4 sm:space-y-8">
        {/* Custom header for Visual Analysis page */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">AI Tooling</h1>
            <p className="text-muted-foreground">
              Advanced AI tools to enhance your electrical work efficiency and accuracy.
            </p>
          </div>
          <Link to="/electrician-tools/ai-tooling">
            <Button variant="outline" className="flex items-center gap-2 border-border text-foreground hover:bg-accent/50">
              <ArrowLeft className="h-4 w-4" /> Back to AI Tools
            </Button>
          </Link>
        </div>
        <VisualAnalysis />
      </div>
    </div>
  );
};

export default VisualAnalysisPage;