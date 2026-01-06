import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const Level3Module5Section6_3 = () => {
  useSEO(
    "Rectification Procedures - Level 3 Inspection, Testing & Commissioning",
    "Procedures for rectifying faults and defects found during inspection and testing"
  );

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-white/10 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/70 hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="../section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6">
          6.3 Rectification Procedures
        </h1>
        <p className="text-xl text-white/70 mb-8">
          Procedures for rectifying faults and defects found during inspection and testing
        </p>

        <div className="prose prose-invert max-w-none">
          <p>Content for Rectification Procedures will be added here.</p>
        </div>
      </div>
    </div>
  );
};

export default Level3Module5Section6_3;