import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const Level3Module6Section3_2 = () => {
  useSEO(
    "Characteristics of Protective Devices (Icn, Ics, In, curve types) - Level 3 Electrical Systems Design",
    "Understanding protective device characteristics and their application in design"
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground p-0 text-sm sm:text-base" asChild>
            <Link to="../section3">
              <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
              Back to Section 3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
        <h1 className="text-xl sm:text-2xl lg:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4 sm:mb-6">
          3.2 Characteristics of Protective Devices (Icn, Ics, In, curve types)
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8">
          Understanding protective device characteristics and their application in design
        </p>

        <div className="prose prose-invert max-w-none">
          <p>Content for Characteristics of Protective Devices will be added here.</p>
        </div>
      </div>
    </div>
  );
};

export default Level3Module6Section3_2;