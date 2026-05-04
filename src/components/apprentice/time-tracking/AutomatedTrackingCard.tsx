import { useTimeEntries } from '@/hooks/time-tracking/useTimeEntries';
import { useAutoPortfolioIntegration } from '@/hooks/portfolio/useAutoPortfolioIntegration';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const AutomatedTrackingCard = () => {
  const { entries } = useTimeEntries();
  const { autoSyncEnabled, setAutoSyncEnabled, lastSyncTimestamp } = useAutoPortfolioIntegration();

  const automaticEntries = entries.filter((entry) => entry.isAutomatic || entry.isQuiz);
  const totalAutomaticTime = automaticEntries.reduce((total, entry) => total + entry.duration, 0);
  const hours = Math.floor(totalAutomaticTime / 60);
  const minutes = totalAutomaticTime % 60;

  const recentAutoEntries = automaticEntries
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Smart portfolio integration
        </span>

        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <Label htmlFor="auto-sync" className="text-[14px] text-white/85">
              Auto-sync to portfolio
            </Label>
            <p className="text-[12px] text-white/55 mt-0.5 leading-relaxed">
              Automatically add activities to your portfolio with smart categorisation
            </p>
          </div>
          <Switch id="auto-sync" checked={autoSyncEnabled} onCheckedChange={setAutoSyncEnabled} />
        </div>

        {lastSyncTimestamp && (
          <div className="text-[11px] text-white/55 font-mono">
            Last sync: {formatDate(lastSyncTimestamp)}
          </div>
        )}
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Automated tracking overview
        </span>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
            <div className="text-2xl font-mono text-white">
              {hours}h {minutes}m
            </div>
            <div className="text-[11px] text-white/55 mt-1">Total auto-tracked</div>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
            <div className="text-2xl font-mono text-white">{automaticEntries.length}</div>
            <div className="text-[11px] text-white/55 mt-1">Activities tracked</div>
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Recent automatic activities
          </span>

          {recentAutoEntries.length === 0 ? (
            <p className="text-[14px] text-white/55 leading-relaxed py-4">
              No automatic activities yet. Complete quizzes or study sessions to see them here.
            </p>
          ) : (
            <div className="space-y-2">
              {recentAutoEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between gap-3 p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] text-white truncate">{entry.activity}</div>
                    <div className="text-[11px] text-white/55 font-mono mt-0.5">
                      {formatDate(entry.date)}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                      {entry.isQuiz ? 'Quiz' : 'Study'}
                    </span>
                    <div className="text-[11px] text-white/55 font-mono mt-1">
                      {Math.floor(entry.duration / 60)}h {entry.duration % 60}m
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Integration features
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Active integrations
            </span>
            <ul className="space-y-1.5">
              {[
                'Quiz completion tracking',
                'Study session monitoring',
                'Course progress tracking',
                'Smart portfolio sync',
              ].map((label) => (
                <li
                  key={label}
                  className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Smart features
            </span>
            <ul className="space-y-1.5">
              {[
                'Auto-categorisation',
                'Skill detection',
                'Learning outcome generation',
                'Progress analytics',
              ].map((label) => (
                <li
                  key={label}
                  className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomatedTrackingCard;
