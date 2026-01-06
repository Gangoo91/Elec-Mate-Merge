import { ArrowLeft, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const MOETModule6Section1_1 = () => {
  useSEO(
    "Section 6.1.1: Engineering Drawing Conventions - MOET Module 6",
    "Standard conventions, line types, projection methods and drawing layouts"
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../m-o-e-t-module6-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6.1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-4 mb-6">
            <PenTool className="h-8 w-8 text-elec-yellow" />
            <div>
              <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                Section 6.1.1: Engineering Drawing Conventions
              </h1>
              <p className="text-muted-foreground mt-2">
                Standard conventions, line types, projection methods and drawing layouts
              </p>
            </div>
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="bg-card/30 border border-elec-yellow/30 rounded-lg p-6 mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4">Learning Objectives</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Understand standard engineering drawing conventions and practices</li>
              <li>• Recognise different line types and their meanings</li>
              <li>• Learn projection methods used in technical drawings</li>
              <li>• Understand drawing layouts and title block requirements</li>
            </ul>
          </div>

          <p className="text-lg text-muted-foreground">
            This section covers the fundamental conventions used in engineering drawings and technical documentation.
          </p>
          
          <p>Content for this subsection will be added here covering engineering drawing standards and conventions.</p>
        </div>
      </div>
    </div>
  );
};

export default MOETModule6Section1_1;