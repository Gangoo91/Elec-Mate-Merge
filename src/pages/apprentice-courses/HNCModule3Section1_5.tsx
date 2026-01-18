import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const HNCModule3Section1_5 = () => {
  useSEO(
    "Transient response in RC, RL and RLC circuits - HNC Module 3",
    "Learn time-domain behaviour of reactive circuits during switching and transient conditions"
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
          3.1.5 Transient response in RC, RL and RLC circuits
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Time-domain behaviour of reactive circuits during switching and transient conditions
        </p>

        <div className="prose prose-invert max-w-none">
          <p>Understand how circuits with capacitors and inductors respond during switching operations and transient events. This knowledge is essential for analysing motor starting currents, lighting circuit behaviour, and protecting equipment from transient overvoltages in building electrical systems.</p>
        </div>
      </div>
    </div>
  );
};

export default HNCModule3Section1_5;