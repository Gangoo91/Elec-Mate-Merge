import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const Level3Module6Section2_6 = () => {
  useSEO(
    "Thermal Effects and Grouping Factors - Level 3 Electrical Systems Design",
    "Understanding thermal effects and applying appropriate grouping factors"
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
          2.6 Thermal Effects and Grouping Factors
        </h1>
        <p className="text-xl text-white/70 mb-8">
          Understanding thermal effects and applying appropriate grouping factors
        </p>

        <div className="prose prose-invert max-w-none">
          <p>Content for Thermal Effects and Grouping Factors will be added here.</p>
        </div>
      </div>
    </div>
  );
};

export default Level3Module6Section2_6;