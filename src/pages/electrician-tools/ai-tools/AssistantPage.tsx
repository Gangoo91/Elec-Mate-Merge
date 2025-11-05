import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ConversationalSearch from "@/components/electrician-tools/ai-tools/ConversationalSearch";

const AssistantPage = () => {
  return (
    <div className="min-h-screen bg-elec-dark">
      <div className="ai-tool-page-padding">
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
          <ConversationalSearch />
        </div>
      </div>
    </div>
  );
};

export default AssistantPage;