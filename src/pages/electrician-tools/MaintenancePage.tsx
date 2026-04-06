import { ArrowLeft, Wrench } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MaintenanceMethodInterface } from '@/components/electrician-tools/maintenance-method/MaintenanceMethodInterface';
import { Button } from '@/components/ui/button';

const MaintenancePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fromAgentSelector = location.state?.fromAgentSelector;

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="px-4 py-2 max-w-3xl mx-auto">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                navigate(fromAgentSelector ? '/electrician/agent-selector' : '/electrician')
              }
              className="flex items-center gap-2 text-white active:scale-[0.98] transition-all touch-manipulation h-11 -ml-2 px-2 rounded-lg"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-sm font-medium">
                {fromAgentSelector ? 'Agent Selector' : 'Electrician Hub'}
              </span>
            </Button>
            <div className="flex items-center gap-2.5 ml-auto">
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <Wrench className="h-5 w-5 text-emerald-400" />
              </div>
              <span className="text-base font-semibold text-white">Maintenance Method</span>
            </div>
          </div>
        </div>
      </div>

      <main className="px-4 py-5 space-y-5 max-w-3xl mx-auto">
        <MaintenanceMethodInterface />
      </main>
    </div>
  );
};

export default MaintenancePage;
