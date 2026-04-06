import { ArrowLeft, Wrench } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
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
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="px-4 py-2 max-w-3xl mx-auto flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              navigate(fromAgentSelector ? '/electrician/agent-selector' : '/electrician')
            }
            className="h-9 w-9 rounded-lg text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <Wrench className="h-5 w-5 text-blue-400" />
            </div>
            <h1 className="text-lg font-bold text-white tracking-tight">Installation Guide</h1>
          </div>
        </div>
      </div>

      <main className="px-4 py-5 space-y-5 max-w-3xl mx-auto">
        <InstallationSpecialistInterface designerContext={designerContext} />
      </main>
    </div>
  );
};

export default InstallationSpecialistPage;
