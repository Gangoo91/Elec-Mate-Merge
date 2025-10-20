import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import CommissioningInterface from "@/components/electrician-tools/commissioning/CommissioningInterface";

const CommissioningPage = () => {
  return (
    <div className="min-h-screen bg-elec-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 py-4 sm:py-6 max-w-7xl">
        <div className="space-y-4 sm:space-y-6 animate-fade-in">
          {/* Back Button */}
          <Link to="/electrician/agents">
            <Button variant="outline" size="sm" className="gap-2 touch-manipulation h-10">
              <ArrowLeft className="h-4 w-4" /> Back to Agent Selection
            </Button>
          </Link>

          {/* Header */}
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              Testing & Commissioning Specialist AI
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base mt-2">
              Test Procedures, Certification & Compliance Verification
            </p>
          </div>

          {/* Interface */}
          <CommissioningInterface />
        </div>
      </div>
    </div>
  );
};

export default CommissioningPage;
