import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CircuitDesigner from "@/components/electrician-tools/ai-tools/CircuitDesigner";

const CircuitDesignerPage = () => {
  return (
    <div className="min-h-screen bg-elec-dark">
      <div className="px-2 py-4 sm:px-4 sm:py-6">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="mb-4 sm:mb-8">
            <Link to="/electrician-tools/ai-tooling">
              <Button 
                variant="outline" 
                size="sm"
                className="border-elec-yellow/50 text-elec-yellow hover:bg-elec-yellow/20 hover:border-elec-yellow/70"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to AI Tools
              </Button>
            </Link>
          </div>

          {/* Content */}
          <CircuitDesigner />
        </div>
      </div>
    </div>
  );
};

export default CircuitDesignerPage;