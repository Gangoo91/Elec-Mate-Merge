import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const Level3Module5Section3_4 = () => {
  useSEO(
    "Earth Fault Loop Impedance Testing - Level 3 Inspection, Testing & Commissioning",
    "Testing earth fault loop impedance to verify protective device effectiveness"
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
          3.4 Earth Fault Loop Impedance Testing
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Testing earth fault loop impedance to verify protective device effectiveness
        </p>

        <div className="prose prose-invert max-w-none">
          <p>Content for Earth Fault Loop Impedance Testing will be added here.</p>
        </div>
      </div>
    </div>
  );
};

export default Level3Module5Section3_4;