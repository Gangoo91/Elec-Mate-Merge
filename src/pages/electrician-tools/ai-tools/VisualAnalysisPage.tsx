import VisualAnalysisRedesigned from "@/components/electrician-tools/ai-tools/VisualAnalysisRedesigned";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { EICRProvider } from "@/contexts/EICRContext";

const VisualAnalysisPage = () => {
  return (
    <EICRProvider>
      <div className="min-h-screen bg-neutral-900 text-white">
        <div className="max-w-6xl mx-auto p-3 sm:p-6 space-y-4 sm:space-y-8">
          {/* Simple back navigation */}
          <div className="flex justify-start">
            <Link to="/electrician-tools/ai-tooling">
              <Button variant="outline" className="flex items-center gap-2 border-neutral-600 text-gray-300 hover:bg-neutral-700/50">
                <ArrowLeft className="h-4 w-4" /> Back to AI Tools
              </Button>
            </Link>
          </div>
          <VisualAnalysisRedesigned />
        </div>
      </div>
    </EICRProvider>
  );
};

export default VisualAnalysisPage;