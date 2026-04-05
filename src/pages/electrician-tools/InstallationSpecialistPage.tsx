import { ArrowLeft, Wrench } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import InstallationSpecialistInterface from '@/components/electrician-tools/installation-specialist/InstallationSpecialistInterface';
import React from 'react';

const InstallationSpecialistPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fromAgentSelector = location.state?.fromAgentSelector;

  const [designerContext, setDesignerContext] = React.useState<any>(null);

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sessionId = params.get('sessionId');
    if (sessionId) {
      const storedContext = sessionStorage.getItem(sessionId);
      if (storedContext) {
        try {
          setDesignerContext(JSON.parse(storedContext));
          sessionStorage.removeItem(sessionId);
        } catch (err) {
          console.error('Failed to parse sessionStorage context:', err);
        }
      }
    } else {
      const contextParam = params.get('designContext');
      if (contextParam) {
        try {
          setDesignerContext(JSON.parse(decodeURIComponent(contextParam)));
        } catch (err) {
          console.error('Failed to parse URL designContext:', err);
        }
      }
    }
  }, [location]);

  return (
    <div className="bg-background min-h-screen">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="px-4 py-2 max-w-3xl mx-auto">
          <button
            onClick={() =>
              navigate(fromAgentSelector ? '/electrician/agent-selector' : '/electrician')
            }
            className="flex items-center gap-2 text-white active:scale-[0.98] transition-all touch-manipulation h-11 -ml-2 px-2 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">
              {fromAgentSelector ? 'Agent Selector' : 'Electrician Hub'}
            </span>
          </button>
        </div>
      </div>

      <main className="px-4 py-5 space-y-5 max-w-3xl mx-auto">
        {/* Premium Hero */}
        <div className="relative overflow-hidden glass-premium rounded-2xl">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400" />
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/[0.04] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

          <div className="relative z-10 p-5">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 flex-shrink-0">
                <Wrench className="h-7 w-7 text-blue-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">Installation Specialist</h1>
                <p className="text-sm text-white">Step-by-step method statements & guidance</p>
              </div>
            </div>
          </div>
        </div>

        <InstallationSpecialistInterface designerContext={designerContext} />
      </main>
    </div>
  );
};

export default InstallationSpecialistPage;
