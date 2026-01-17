import { Link } from 'react-router-dom';
import { Brain, ChevronRight, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const ElecAiBanner = () => {
  return (
    <Link to="/electrician-tools/ai-tooling/assistant">
      <Card className="border border-purple-500/20 bg-gradient-to-r from-purple-500/5 via-transparent to-transparent hover:border-purple-500/40 hover:from-purple-500/10 transition-all duration-300 group">
        <div className="flex items-center justify-between p-2.5 sm:p-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 group-hover:bg-purple-500/15 transition-colors">
              <Brain className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm text-white">Elec-AI</h3>
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-purple-500/20 text-purple-400 rounded-full flex items-center gap-1">
                  <Sparkles className="h-2.5 w-2.5" />
                  AI
                </span>
              </div>
              <p className="text-xs text-white/60">
                Your personal electrical advisor
              </p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-white/40 group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all" />
        </div>
      </Card>
    </Link>
  );
};

export default ElecAiBanner;
