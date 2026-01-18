import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const HNCModule3Section1_3 = () => {
  useSEO(
    "Thevenin's and Norton's theorems - HNC Module 3",
    "Learn circuit simplification techniques using equivalent circuits for complex network analysis"
  );

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
          3.1.3 Thevenin's and Norton's theorems
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Circuit simplification techniques using equivalent circuits for complex network analysis
        </p>

        <div className="prose prose-invert max-w-none">
          <p>Master powerful circuit analysis tools that allow complex networks to be simplified into equivalent circuits. Thevenin's theorem represents circuits as voltage sources with series resistance, whilst Norton's theorem uses current sources with parallel resistance. These techniques are invaluable for analysing building electrical distribution systems and load calculations.</p>
        </div>
      </div>
    </div>
  );
};

export default HNCModule3Section1_3;