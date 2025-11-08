import { Button } from "@/components/ui/button";
import { ArrowLeft, Wrench } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import InstallationSpecialistInterface from "@/components/electrician-tools/installation-specialist/InstallationSpecialistInterface";
import React from "react";

const InstallationSpecialistPage = () => {
  const location = useLocation();
  const fromAgentSelector = location.state?.fromAgentSelector;
  
  // Extract designer context (Phase 3: sessionStorage support)
  const [designerContext, setDesignerContext] = React.useState<any>(null);
  
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    
    // Check for session ID first (new method)
    const sessionId = params.get('sessionId');
    if (sessionId) {
      const storedContext = sessionStorage.getItem(sessionId);
      if (storedContext) {
        try {
          const parsed = JSON.parse(storedContext);
          setDesignerContext(parsed);
          console.log('📦 Loaded designer context from sessionStorage:', parsed);
          // Clean up after retrieval
          sessionStorage.removeItem(sessionId);
        } catch (err) {
          console.error('Failed to parse sessionStorage context:', err);
        }
      }
    } else {
      // Fallback to old URL param method (backward compatibility)
      const contextParam = params.get('designContext');
      if (contextParam) {
        try {
          const decoded = JSON.parse(decodeURIComponent(contextParam));
          setDesignerContext(decoded);
          console.log('📦 Loaded designer context from URL:', decoded);
        } catch (err) {
          console.error('Failed to parse URL designContext:', err);
        }
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-elec-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 py-4 sm:py-6">
        <div className="space-y-4 sm:space-y-6 animate-fade-in">
          {/* Back Button - Mobile optimised */}
          <Link to={fromAgentSelector ? "/electrician/agent-selector" : "/electrician"}>
            <Button variant="outline" size="sm" className="gap-2 touch-manipulation h-10">
              <ArrowLeft className="h-4 w-4" /> {fromAgentSelector ? "Back to Agent Selector" : "Back to Dashboard"}
            </Button>
          </Link>

          {/* Header */}
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground flex items-center justify-center sm:justify-start gap-2">
              <Wrench className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
              AI Installation Specialist
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base mt-1">
              Step-by-Step Installation Methods & Practical Guidance
            </p>
          </div>

          {/* Main Content */}
          <InstallationSpecialistInterface designerContext={designerContext} />
        </div>
      </div>
    </div>
  );
};

export default InstallationSpecialistPage;
