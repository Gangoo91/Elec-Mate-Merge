import { ArrowLeft, Wrench } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import InstallationSpecialistInterface from "@/components/electrician-tools/installation-specialist/InstallationSpecialistInterface";
import React from "react";

const InstallationSpecialistPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-background pb-24">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-3">
          <button
            onClick={() => navigate(fromAgentSelector ? "/electrician/agent-selector" : "/electrician")}
            className="flex items-center gap-2 text-white active:opacity-70 transition-opacity touch-manipulation"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">
              {fromAgentSelector ? "Agent Selector" : "Electrician Hub"}
            </span>
          </button>
        </div>
      </div>

      <main className="px-4 py-4 space-y-5">
        {/* Hero Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/10 border border-blue-500/20">
            <Wrench className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Installation Specialist</h1>
            <p className="text-sm text-white/50">Step-by-step installation guidance</p>
          </div>
        </div>

        <InstallationSpecialistInterface designerContext={designerContext} />
      </main>
    </div>
  );
};

export default InstallationSpecialistPage;
