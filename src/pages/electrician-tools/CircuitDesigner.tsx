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
          <div className="space-y-4">
            <Link to="/electrician">
              <Button variant="outline" size="sm" className="gap-2 touch-manipulation">
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
            </Link>
            
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground flex items-center justify-center sm:justify-start gap-2">
                <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                AI Circuit Designer
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base mt-1">
                BS 7671:2018+A2:2022 Compliant Design Generation
              </p>
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
