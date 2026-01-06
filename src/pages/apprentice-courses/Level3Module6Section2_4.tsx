import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const Level3Module6Section2_4 = () => {
  useSEO(
    "RCD and RCBO Requirements in Design - Level 3 Electrical Systems Design",
    "Determining RCD and RCBO requirements and incorporating them into designs"
  );

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-white/10 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/70 hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="../section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6">
          2.4 RCD and RCBO Requirements in Design
        </h1>
        <p className="text-xl text-white/70 mb-8">
          Determining RCD and RCBO requirements and incorporating them into designs
        </p>

        <div className="prose prose-invert max-w-none">
          <p>Content for RCD and RCBO Requirements in Design will be added here.</p>
        </div>
      </div>
    </div>
  );
};

export default Level3Module6Section2_4;