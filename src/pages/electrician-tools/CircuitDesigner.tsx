import { Button } from "@/components/ui/button";
import { ArrowLeft, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { AIInstallationDesigner } from "@/components/electrician-tools/circuit-designer/AIInstallationDesigner";

const CircuitDesigner = () => {
  return (
    <div className="min-h-screen bg-elec-dark">
      <div className="container mx-auto px-6 lg:px-12 xl:px-20 py-6">
        <div className="space-y-6 animate-fade-in">
          {/* Header */}
          <div className="relative">
            <div className="absolute top-0 left-0 md:hidden">
              <Link to="/electrician">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between pt-12 md:pt-0">
              <div className="text-center md:text-left md:flex md:items-center md:gap-3">
                <Link to="/electrician" className="hidden md:block">
                  <Button variant="outline" size="sm" className="gap-2">
                    <ArrowLeft className="h-4 w-4" /> Back
                  </Button>
                </Link>
                
                <div>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground flex items-center justify-center md:justify-start gap-2">
                    <Zap className="h-8 w-8 text-primary" />
                    AI Circuit Designer
                  </h1>
                  <p className="text-muted-foreground text-sm md:text-base mt-1">
                    BS 7671:2018+A2:2022 Compliant Design Generation
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <AIInstallationDesigner />
        </div>
      </div>
    </div>
  );
};

export default CircuitDesigner;
