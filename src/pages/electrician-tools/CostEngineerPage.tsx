import { ArrowLeft, Calculator, Settings } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import CostEngineerInterface from '@/components/electrician-tools/cost-engineer/CostEngineerInterface';

const CostEngineerPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fromAgentSelector = location.state?.fromAgentSelector;
  const backPath = fromAgentSelector ? '/electrician/agent-selector' : '/electrician';
  const backLabel = fromAgentSelector ? 'Agents' : 'Electrician Hub';

  return (
    <div className="bg-background min-h-screen">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="px-4 py-2 flex items-center justify-between max-w-3xl mx-auto">
          <button
            onClick={() => navigate(backPath)}
            className="flex items-center gap-2 text-white h-11 touch-manipulation active:scale-[0.98] transition-all -ml-2 px-2 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">{backLabel}</span>
          </button>
          <div className="w-8 h-8 rounded-lg bg-elec-yellow flex items-center justify-center">
            <Calculator className="h-4 w-4 text-black" />
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="relative px-4 py-5 max-w-3xl mx-auto">
        <CostEngineerInterface />
      </main>
    </div>
  );
};

export default CostEngineerPage;
