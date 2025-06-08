
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import PPETab from "@/components/apprentice/tools-guide/PPETab";

const PPESafety = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-elec-dark via-elec-gray to-elec-dark">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 animate-fade-in max-w-6xl">
        <div className="flex justify-start">
          <Link to="/apprentice/toolbox/tools-guide">
            <Button 
              variant="outline" 
              size="sm"
              className="bg-elec-gray/50 border-elec-yellow/30 hover:bg-elec-yellow/10 text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tools Guide
            </Button>
          </Link>
        </div>

        <div className="bg-elec-gray/50 backdrop-blur border border-elec-yellow/20 rounded-lg shadow-lg">
          <PPETab />
        </div>
      </div>
    </div>
  );
};

export default PPESafety;
