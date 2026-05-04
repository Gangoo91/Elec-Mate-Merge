import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronDown, Search, CheckCircle } from 'lucide-react';
import { allBS7671Tests, type BS7671Test } from '@/data/bs7671-testing/allBS7671Tests';
import InteractiveTestingGuide from './InteractiveTestingGuide';
import type { useBS7671Progress } from './hooks/useBS7671Progress';

interface TestingProceduresPanelProps {
  progress: ReturnType<typeof useBS7671Progress>;
}

const TestingProceduresPanel = ({ progress }: TestingProceduresPanelProps) => {
  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);
  const [activeTest, setActiveTest] = useState<BS7671Test | null>(null);

  const filtered = allBS7671Tests.filter((test) => {
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
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/55" />
          <Input
            placeholder="Search tests..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-11 text-base touch-manipulation border-white/[0.08] focus:border-elec-yellow/50 focus:ring-elec-yellow/20 bg-white/[0.02] text-white placeholder:text-white/55"
          />
        </div>
        <div className="flex gap-1.5">
          {['Beginner', 'Intermediate', 'Advanced'].map((level) => {
            const isActive = difficultyFilter === level;
            return (
              <button
                key={level}
                onClick={() => setDifficultyFilter((prev) => (prev === level ? null : level))}
                className={`px-3 rounded-lg text-[12px] font-medium border transition-all touch-manipulation h-11 ${
                  isActive
                    ? 'bg-elec-yellow text-black border-elec-yellow'
                    : 'bg-white/[0.02] text-white/85 border-white/[0.08] hover:bg-white/[0.04]'
                }`}
              >
                {level}
              </button>
            );
          })}
        </div>
      </div>

      {/* Test Cards */}
      <div className="space-y-2">
        {filtered.map((test) => {
          const stepsComplete = progress.getCompletedStepCount(test.id);
          const testDone = progress.isTestComplete(test.id);

          return (
            <Collapsible key={test.id}>
              <CollapsibleTrigger className="w-full flex items-center justify-between gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] touch-manipulation h-auto min-h-[44px] transition-colors text-left">
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-baseline gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    <span>{test.difficulty}</span>
                    <span className="text-white/25">·</span>
                    <span>{test.duration}</span>
                    {stepsComplete > 0 && (
                      <>
                        <span className="text-white/25">·</span>
                        <span className="font-mono normal-case tracking-normal">
                          {stepsComplete}/{test.steps.length}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="text-[14px] font-medium text-white truncate">{test.title}</div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {testDone && <CheckCircle className="h-4 w-4 text-elec-yellow" />}
                  <ChevronDown className="h-4 w-4 text-white/55 transition-transform [[data-state=open]>&]:rotate-180" />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-4 pb-4 pt-3 mt-1 space-y-4 text-[14px] rounded-b-xl bg-white/[0.02]">
                  <p className="text-white/85 leading-relaxed">{test.purpose}</p>

                  {test.testLimits.length > 0 && (
                    <div className="space-y-1.5">
                      <h4 className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                        Test limits
                      </h4>
                      <div className="space-y-1">
                        {test.testLimits.map((limit, idx) => (
                          <div
                            key={idx}
                            className="flex items-baseline justify-between gap-3 py-1.5 border-b border-white/[0.04] last:border-0 text-[13px]"
                          >
                            <span className="text-white/70">{limit.parameter}</span>
                            <span className="font-mono text-white text-right">
                              {limit.limit} {limit.unit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {test.commonIssues.length > 0 && (
                    <div className="space-y-1.5">
                      <h4 className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                        Common issues
                      </h4>
                      <ul className="space-y-1.5">
                        {test.commonIssues.map((issue, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-[13px]">
                            <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                            <span className="text-white/85 leading-relaxed">{issue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Button
                    onClick={() => setActiveTest(test)}
                    className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
                  >
                    {stepsComplete > 0 ? 'Continue test' : 'Start test'}
                  </Button>
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-8 text-white/55 text-[13px]">
            No tests match your search. Try different keywords.
          </div>
        )}
      </div>
    </div>
  );
};

export default TestingProceduresPanel;
