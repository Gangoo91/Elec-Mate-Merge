import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const ElecAiBanner = () => {
  return (
    <Link to="/electrician-tools/ai-tooling/assistant" className="block group touch-manipulation">
      <div className="relative overflow-hidden card-surface-interactive active:scale-[0.98] transition-all duration-200">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 opacity-30 group-hover:opacity-80 transition-opacity duration-200" />

        <div className="relative z-10 flex flex-col h-full p-3.5 sm:p-4 min-h-[110px]">
          <h3 className="text-[13px] sm:text-sm font-semibold text-white leading-tight group-hover:text-elec-yellow transition-colors">
            Elec-AI
          </h3>
          <p className="mt-0.5 text-[11px] sm:text-[12px] text-white leading-tight">
            Your personal electrical advisor
          </p>

          <div className="flex-grow" />

          <div className="mt-2 flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-medium text-elec-yellow">Open</span>
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center group-hover:bg-elec-yellow group-hover:border-elec-yellow transition-all duration-200">
              <ChevronRight className="w-3.5 h-3.5 text-white group-hover:text-black group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ElecAiBanner;
