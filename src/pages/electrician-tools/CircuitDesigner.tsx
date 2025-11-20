import { Button } from "@/components/ui/button";
import { ArrowLeft, Zap, Home, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { AIInstallationDesigner } from "@/components/electrician-tools/circuit-designer/AIInstallationDesigner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const CircuitDesigner = () => {
  const location = useLocation();
  const fromAgentSelector = location.state?.fromAgentSelector;

  return (
    <div className="min-h-screen bg-elec-dark">
      <div className="mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 2xl:px-16 max-w-[95vw] 2xl:max-w-[1800px] py-4 sm:py-6 pb-safe">
        <div className="space-y-3 sm:space-y-4 animate-fade-in">
          {/* Desktop Breadcrumb + Mobile Back Button */}
          <div className="flex items-center justify-between">
            {/* Breadcrumb - Hidden on mobile */}
            <Breadcrumb className="hidden lg:block">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/electrician" className="flex items-center gap-1">
                      <Home className="h-3.5 w-3.5" />
                      Dashboard
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>AI Circuit Designer</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* Back Button - Mobile only */}
            <Link to={fromAgentSelector ? "/electrician/agent-selector" : "/electrician"} className="lg:hidden">
              <Button variant="outline" size="sm" className="gap-2 touch-manipulation h-10">
                <ArrowLeft className="h-4 w-4" /> {fromAgentSelector ? "Back to Agent Selector" : "Back to Dashboard"}
              </Button>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center sm:text-left">
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-foreground flex items-center justify-center sm:justify-start gap-2">
              <Zap className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
              AI Circuit Designer
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base mt-1 leading-snug">
              BS 7671 18th Edition Compliant Design Generation
            </p>
          </div>

          {/* Main Content */}
          <AIInstallationDesigner />
        </div>
      </div>
    </div>
  );
};

export default CircuitDesigner;
