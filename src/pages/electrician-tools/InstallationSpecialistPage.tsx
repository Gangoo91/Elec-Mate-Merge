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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 pb-safe">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <Wrench className="h-6 w-6 sm:h-7 sm:w-7 text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Installation Specialist
              </h1>
              <p className="text-sm text-white/60">Step-by-step installation guidance</p>
            </div>
          </div>
          <Link to={fromAgentSelector ? "/electrician/agent-selector" : "/electrician"}>
            <Button
              variant="outline"
              size="sm"
              className="h-10 px-4 border-white/20 text-white/70 hover:text-white hover:bg-white/10 gap-2 touch-manipulation"
            >
              <ArrowLeft className="h-4 w-4" />
              {fromAgentSelector ? "Back to Agents" : "Back to Hub"}
            </Button>
          </Link>
        </header>

        <InstallationSpecialistInterface designerContext={designerContext} />
      </main>
    </div>
  );
};

export default InstallationSpecialistPage;
