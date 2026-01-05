import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const HNCModule3Section1_2 = () => {
  useSEO(
    "Series, parallel and combination circuits - HNC Module 3",
    "Learn analysis techniques for different circuit configurations and their electrical characteristics"
  );

  return (
    <div className="min-h-screen bg-background">
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
          3.1.2 Series, parallel and combination circuits
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Analysis techniques for different circuit configurations and their electrical characteristics
        </p>

        <div className="prose prose-invert max-w-none">
          <p>Explore the fundamental circuit topologies used in electrical installations. This section covers series circuits where current flows through a single path, parallel circuits with multiple current paths, and combination circuits that merge both approaches. Understanding these configurations is essential for designing and troubleshooting building electrical systems.</p>
        </div>
      </div>
    </div>
  );
};

export default HNCModule3Section1_2;