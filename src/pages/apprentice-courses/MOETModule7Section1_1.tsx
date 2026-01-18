import { ArrowLeft, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const MOETModule7Section1_1 = () => {
  useSEO(
    "Section 7.1.1: Multiple-Choice Question Banks - MOET Module 7",
    "Practice question banks covering all module topics and learning outcomes"
  );

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../m-o-e-t-module7-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 7.1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-4 mb-6">
            <HelpCircle className="h-8 w-8 text-elec-yellow" />
            <div>
              <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                Section 7.1.1: Multiple-Choice Question Banks
              </h1>
              <p className="text-muted-foreground mt-2">
                Practice question banks covering all module topics and learning outcomes
              </p>
            </div>
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="bg-card/30 border border-elec-yellow/30 rounded-lg p-6 mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4">Learning Objectives</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Access and use comprehensive question banks for EPA preparation</li>
              <li>• Practice questions covering all MOET course modules and standards</li>
              <li>• Develop familiarity with EPA question formats and styles</li>
              <li>• Build confidence through repeated practice and feedback</li>
            </ul>
          </div>

          <p className="text-lg text-muted-foreground">
            This section provides access to extensive question banks designed to prepare you for the EPA knowledge test component.
          </p>
          
          <p>Content for this subsection will be added here covering multiple-choice question practice and preparation strategies.</p>
        </div>
      </div>
    </div>
  );
};

export default MOETModule7Section1_1;