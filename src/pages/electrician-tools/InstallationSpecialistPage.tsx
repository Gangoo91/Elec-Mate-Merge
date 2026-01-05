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
          console.log('Loaded designer context from sessionStorage:', parsed);
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
          console.log('Loaded designer context from URL:', decoded);
        } catch (err) {
          console.error('Failed to parse URL designContext:', err);
        }
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-elec-dark via-elec-grey to-elec-dark">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-elec-dark/80 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <Wrench className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                  Installation Specialist
                </h1>
                <p className="text-xs text-white/50 hidden sm:block">Step-by-step guidance</p>
              </div>
            </div>
            <Link to={fromAgentSelector ? "/electrician/agent-selector" : "/electrician"}>
              <Button
                variant="ghost"
                size="sm"
                className="h-10 px-3 sm:px-4 text-white/70 hover:text-white hover:bg-white/10 gap-1.5 touch-manipulation"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">{fromAgentSelector ? "Agents" : "Hub"}</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6 pb-safe">
        <InstallationSpecialistInterface designerContext={designerContext} />
      </main>
    </div>
  );
};

export default InstallationSpecialistPage;
