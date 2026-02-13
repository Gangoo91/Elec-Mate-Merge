import { useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ChevronDown,
  Search,
  Zap,
  CheckCircle,
  Clock,
  PlayCircle,
} from 'lucide-react';
import { allBS7671Tests, type BS7671Test } from '@/data/bs7671-testing/allBS7671Tests';
import InteractiveTestingGuide from './InteractiveTestingGuide';
import type { useBS7671Progress } from './hooks/useBS7671Progress';

interface TestingProceduresPanelProps {
  progress: ReturnType<typeof useBS7671Progress>;
}

const difficultyConfig: Record<string, { bg: string; text: string; border: string }> = {
  Beginner: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30' },
  Intermediate: { bg: 'bg-elec-yellow/10', text: 'text-elec-yellow', border: 'border-elec-yellow/30' },
  Advanced: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' },
};

const TestingProceduresPanel = ({ progress }: TestingProceduresPanelProps) => {
  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);
  const [activeTest, setActiveTest] = useState<BS7671Test | null>(null);

  const filtered = allBS7671Tests.filter(test => {
    const matchesSearch =
      !search ||
      test.title.toLowerCase().includes(search.toLowerCase()) ||
      test.description.toLowerCase().includes(search.toLowerCase());
    const matchesDifficulty = !difficultyFilter || test.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  if (activeTest) {
    return (
      <InteractiveTestingGuide
        guide={activeTest}
        progress={progress}
        onComplete={() => setActiveTest(null)}
        onBack={() => setActiveTest(null)}
      />
    );
  }

  return (
    <div className="space-y-4 text-left">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
          <Input
            placeholder="Search tests..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10 h-11 text-base touch-manipulation border-white/20 focus:border-cyan-500 focus:ring-cyan-500 bg-white/5 text-white placeholder:text-white"
          />
        </div>
        <div className="flex gap-2">
          {['Beginner', 'Intermediate', 'Advanced'].map(level => (
            <button
              key={level}
              onClick={() => setDifficultyFilter(prev => (prev === level ? null : level))}
              className={`
                px-3 py-2 rounded-lg text-xs font-medium border transition-all touch-manipulation h-11
                ${
                  difficultyFilter === level
                    ? `${difficultyConfig[level].bg} ${difficultyConfig[level].text} ${difficultyConfig[level].border}`
                    : 'bg-white/5 text-white border-white/10'
                }
              `}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Test Cards */}
      <div className="space-y-3">
        {filtered.map(test => {
          const config = difficultyConfig[test.difficulty] || difficultyConfig.Beginner;
          const stepsComplete = progress.getCompletedStepCount(test.id);
          const testDone = progress.isTestComplete(test.id);

          return (
            <Collapsible key={test.id}>
              <CollapsibleTrigger className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 touch-manipulation h-auto min-h-[44px] hover:border-cyan-500/30 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  {testDone ? (
                    <div className="p-1.5 rounded-lg bg-green-500/20 flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    </div>
                  ) : (
                    <div className="p-1.5 rounded-lg bg-cyan-500/10 flex-shrink-0">
                      <Zap className="h-4 w-4 text-cyan-400" />
                    </div>
                  )}
                  <div className="text-left min-w-0">
                    <div className="text-sm font-semibold text-white truncate">{test.title}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge className={`text-[10px] px-1.5 py-0 ${config.bg} ${config.text} border ${config.border}`}>
                        {test.difficulty}
                      </Badge>
                      <span className="text-xs text-white flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {test.duration}
                      </span>
                      {stepsComplete > 0 && (
                        <span className="text-xs text-cyan-400 font-medium">
                          {stepsComplete}/{test.steps.length}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-white flex-shrink-0 transition-transform [[data-state=open]>&]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-4 pb-4 pt-3 mt-1 space-y-3 text-sm rounded-b-xl bg-white/[0.02]">
                  <p className="text-white">{test.purpose}</p>

                  {test.testLimits.length > 0 && (
                    <div className="space-y-1">
                      <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-wide">Test Limits</h4>
                      {test.testLimits.map((limit, idx) => (
                        <div key={idx} className="text-xs p-2 rounded bg-white/[0.03] text-left">
                          <span className="text-white">{limit.parameter}: </span>
                          <span className="font-mono text-cyan-400">
                            {limit.limit} {limit.unit}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {test.commonIssues.length > 0 && (
                    <div className="space-y-1">
                      <h4 className="text-xs font-semibold text-orange-400 uppercase tracking-wide">Common Issues</h4>
                      {test.commonIssues.map((issue, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs">
                          <span className="w-1 h-1 bg-orange-400 rounded-full mt-1.5 flex-shrink-0" />
                          <span className="text-white">{issue}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <Button
                    onClick={() => setActiveTest(test)}
                    className="w-full h-11 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold touch-manipulation active:scale-[0.98] transition-all"
                  >
                    <PlayCircle className="h-4 w-4 mr-2" />
                    {stepsComplete > 0 ? 'Continue Test Procedure' : 'Start Test Procedure'}
                  </Button>
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-8 text-white">
            No tests match your search. Try different keywords.
          </div>
        )}
      </div>
    </div>
  );
};

export default TestingProceduresPanel;
