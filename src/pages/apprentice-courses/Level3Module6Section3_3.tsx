import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const Level3Module6Section3_3 = () => {
  useSEO(
    "Consumer Units and Distribution Boards - Level 3 Electrical Systems Design",
    "Selecting appropriate consumer units and distribution boards for installations"
  );

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-white/10 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/70 hover:text-white p-0 text-sm sm:text-base" asChild>
            <Link to="../section3">
              <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
              Back to Section 3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
        <h1 className="text-xl sm:text-2xl lg:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6">
          3.3 Consumer Units and Distribution Boards
        </h1>
        <p className="text-lg sm:text-xl text-white/70 mb-6 sm:mb-8">
          Selecting appropriate consumer units and distribution boards for installations
        </p>

        <div className="prose prose-invert max-w-none">
          <p>Content for Consumer Units and Distribution Boards will be added here.</p>
        </div>
      </div>
    </div>
  );
};

export default Level3Module6Section3_3;