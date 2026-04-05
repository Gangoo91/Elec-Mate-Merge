import { ArrowLeft, Shield } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import HealthSafetyInterface from '@/components/electrician-tools/health-safety/HealthSafetyInterface';

const HealthSafetyPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fromAgentSelector = location.state?.fromAgentSelector;

  return (
    <div className="bg-background min-h-screen">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="px-4 py-2">
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
          {/* Gradient top accent */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-orange-500 via-amber-400 to-red-500" />
          {/* Blur orb */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/[0.04] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

          <div className="relative z-10 p-5">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
                <Shield className="h-7 w-7 text-orange-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">Health & Safety</h1>
                <p className="text-sm text-white">AI-powered risk assessments & RAMS</p>
              </div>
            </div>
          </div>
        </div>

        <HealthSafetyInterface />
      </main>
    </div>
  );
};

export default HealthSafetyPage;
