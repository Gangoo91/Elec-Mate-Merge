import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const HNCModule3Section3_6 = () => {
  useSEO(
    "True, reactive and apparent power in AC systems - HNC Module 3",
    "Learn power relationships in AC circuits and their measurement techniques"
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
          3.3.6 True, reactive and apparent power in AC systems
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Power relationships in AC circuits and their measurement techniques
        </p>

        <div className="prose prose-invert max-w-none">
          <p>Understand the fundamental concepts of true power (kW), reactive power (kVAR), and apparent power (kVA) in AC electrical systems. Learn the mathematical relationships between these power types and their measurement using power meters. This knowledge is essential for sizing electrical equipment, calculating energy costs, and ensuring efficient operation of building services installations.</p>
        </div>
      </div>
    </div>
  );
};

export default HNCModule3Section3_6;