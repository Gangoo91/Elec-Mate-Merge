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

          {/* Header - Enhanced Design */}
          <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-primary/5 shadow-lg">
            {/* Decorative Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(147,51,234,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.03)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
            
            {/* Content */}
            <div className="relative px-6 sm:px-8 py-6 sm:py-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                {/* Icon with Glow */}
                <div className="relative shrink-0">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
                  <div className="relative p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 shadow-lg">
                    <Zap className="h-10 w-10 sm:h-12 sm:w-12 text-primary" strokeWidth={2.5} />
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex-1 text-center sm:text-left space-y-3">
                  {/* Title */}
                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent leading-tight">
                    AI Circuit Designer
                  </h1>

                  {/* Subtitle with Badges */}
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 shadow-sm">
                      <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-sm font-semibold text-foreground">
                        BS 7671:2018+A3:2024 Compliant
                      </span>
                    </div>
                    
                    <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-accent/50 border border-accent">
                      <span className="text-xs font-medium text-accent-foreground">
                        18th Edition
                      </span>
                    </div>
                  </div>

                  {/* Optional: Additional Context */}
                  <p className="text-sm text-muted-foreground max-w-2xl hidden lg:block">
                    Professional electrical installation design with automated compliance checking and circuit calculations
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Accent Line */}
            <div className="h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          </div>

          {/* Main Content */}
          <AIInstallationDesigner />
        </div>
      </div>
    </div>
  );
};

export default CircuitDesigner;
