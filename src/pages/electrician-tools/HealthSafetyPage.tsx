import { ArrowLeft, Shield } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import HealthSafetyInterface from '@/components/electrician-tools/health-safety/HealthSafetyInterface';

const HealthSafetyPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fromAgentSelector = location.state?.fromAgentSelector;

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      {/* Business Hub sticky header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="px-4 py-2">
          <div className="flex items-center gap-3 h-11">
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                navigate(fromAgentSelector ? '/electrician/agent-selector' : '/electrician')
              }
              className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <Shield className="h-4 w-4 text-orange-400" />
              </div>
              <h1 className="text-base font-semibold text-white">Health & Safety</h1>
            </div>
          </div>
        </div>
      </div>

      <main className="px-4 py-5 space-y-5 max-w-3xl mx-auto">
        <HealthSafetyInterface />
      </main>
    </div>
  );
};

export default HealthSafetyPage;
