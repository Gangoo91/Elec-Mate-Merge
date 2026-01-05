import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const HNCModule3Section5_3 = () => {
  useSEO(
    "Single-Phase vs Three-Phase Transformers - HNC Module 3 Section 5.3",
    "Comparison of transformer types and their applications in building services"
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
          3.5.3 Single-Phase vs Three-Phase Transformers
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Comparison of transformer types and their applications in building services
        </p>

        <div className="prose prose-invert max-w-none">
          <p>Content for Single-Phase vs Three-Phase Transformers will be added here.</p>
        </div>
      </div>
    </div>
  );
};

export default HNCModule3Section5_3;