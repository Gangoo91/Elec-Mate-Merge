import { ArrowLeft, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const MOETModule5Section1_1 = () => {
  useSEO(
    "Section 5.1.1: Principles of Sensing (analogue vs digital) - MOET Module 5",
    "Understanding analogue and digital sensing principles and signal types"
  );

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 5.1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Gauge className="h-8 w-8 text-elec-yellow" />
            <div>
              <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                Section 5.1.1: Principles of Sensing (analogue vs digital)
              </h1>
              <p className="text-muted-foreground mt-2">
                Understanding analogue and digital sensing principles and signal types
              </p>
            </div>
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="bg-card/30 border border-elec-yellow/30 rounded-lg p-6 mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4">Learning Objectives</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Understand the difference between analogue and digital signals</li>
              <li>• Learn the principles of sensor operation and signal conversion</li>
              <li>• Recognise signal conditioning requirements</li>
              <li>• Identify applications for different sensor types</li>
            </ul>
          </div>

          <p className="text-lg text-muted-foreground">
            This section covers the fundamental principles of sensing and the differences between analogue and digital signal processing in control systems.
          </p>
          
          <p>Content for this subsection will be added here covering the principles of sensing and signal types.</p>
        </div>
      </div>
    </div>
  );
};

export default MOETModule5Section1_1;