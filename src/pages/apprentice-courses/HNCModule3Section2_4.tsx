import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const HNCModule3Section2_4 = () => {
  useSEO(
    "Power factor – causes and effects on systems - HNC Module 3",
    "Learn about power factor impact on electrical efficiency and system performance"
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
          3.2.4 Power factor – causes and effects on systems
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Understanding power factor impact on electrical efficiency and system performance
        </p>

        <div className="prose prose-invert max-w-none">
          <p>Understand the causes and consequences of poor power factor in electrical installations. Learn how inductive loads like motors and fluorescent lighting affect power factor, and discover the economic and technical impacts including increased energy costs, cable losses, and reduced system capacity. This knowledge is crucial for efficient building services design.</p>
        </div>
      </div>
    </div>
  );
};

export default HNCModule3Section2_4;