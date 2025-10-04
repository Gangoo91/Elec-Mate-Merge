import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AIAssistant from "@/components/electrician-tools/ai-tools/AIAssistant";

const AssistantPage = () => {
  return (
    <div className="min-h-screen bg-elec-dark">
      <div className="px-2 sm:px-4 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto">
          {/* Navigation */}
          <div className="mb-8">
            <Link to="/electrician-tools/ai-tooling">
              <Button 
                variant="outline" 
                size="sm"
                className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 hover:border-elec-yellow/50"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to AI Tools
              </Button>
            </Link>
          </div>

          {/* Content */}
          <AIAssistant />
        </div>
      </div>
    </div>
  );
};

export default AssistantPage;