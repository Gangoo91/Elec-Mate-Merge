import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, Plus, Target, ChevronRight, Download } from 'lucide-react';
import { useCPDData } from '@/hooks/cpd/useCPDData';
import { cpdExportService } from '@/services/cpdExportService';

interface MobileCPDTrackerProps {
  onAddEntry: () => void;
  onViewEntry: (id: string) => void;
  onViewHistory: () => void;
}

const MobileCPDTracker = ({ onAddEntry, onViewEntry, onViewHistory }: MobileCPDTrackerProps) => {
  const { stats, entries, goals, loading } = useCPDData();
  const [activeTab, setActiveTab] = useState<'overview' | 'recent' | 'goals'>('overview');

  if (loading || !stats) {
    return (
      <div className="space-y-4 animate-fade-in">
        <div className="h-14 rounded-xl border border-white/[0.06] bg-white/[0.02] animate-pulse" />
        <div className="h-32 rounded-xl border border-white/[0.06] bg-white/[0.02] animate-pulse" />
        <div className="h-12 rounded-xl border border-white/[0.06] bg-white/[0.02] animate-pulse" />
        <div className="h-40 rounded-xl border border-white/[0.06] bg-white/[0.02] animate-pulse" />
      </div>
    );
  }

  const recentEntries = entries.slice(0, 3);
  const activeGoals = goals.filter((goal) => goal.status === 'Active').slice(0, 2);

  const handleQuickExport = () => {
    if (stats && entries && goals) {
      cpdExportService.exportToPDF(entries, stats, goals);
    }
  };

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      <div className="sticky top-0 z-10 bg-elec-dark/95 backdrop-blur-sm py-3 -mx-4 px-4 border-b border-white/[0.06]">
        <Button
          onClick={onAddEntry}
          className="w-full h-12 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation font-medium"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add CPD entry
        </Button>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Hours this year
            </span>
            <div className="text-[20px] font-semibold text-white">{stats.hoursThisYear}</div>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Progress
            </span>
            <div className="text-[20px] font-semibold text-white">
              {stats.completionPercentage}%
            </div>
          </div>
        </div>
        <div className="space-y-2 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
          <div className="flex justify-between text-[13px]">
            <span className="text-white/55">Annual target</span>
            <span className="text-white font-mono">
              {stats.hoursThisYear} / {stats.targetHours} hours
            </span>
          </div>
          <Progress value={stats.completionPercentage} className="h-1 bg-white/5" />
        </div>
      </div>

      <div className="flex space-x-1 rounded-xl border border-white/[0.06] bg-white/[0.02] p-1">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'recent', label: 'Recent' },
          { id: 'goals', label: 'Goals' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'overview' | 'recent' | 'goals')}
            className={`flex-1 flex items-center justify-center px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors touch-manipulation ${
              activeTab === tab.id
                ? 'bg-elec-yellow text-black'
                : 'text-white/85 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Days left
              </span>
              <div className="text-[20px] font-semibold text-white">{stats.daysRemaining}</div>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                This month
              </span>
              <div className="text-[20px] font-semibold text-white">{stats.hoursThisMonth}</div>
            </div>
          </div>

          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Top categories
            </span>
            <div className="space-y-2">
              {stats.categoryBreakdown.slice(0, 3).map((category, index) => (
                <div key={index} className="space-y-1.5">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[13px] text-white/85">{category.category}</span>
                    <span className="text-[12px] text-white/55 font-mono">{category.hours}h</span>
                  </div>
                  <div className="w-full bg-white/[0.04] rounded-full h-1">
                    <div
                      className="h-1 rounded-full bg-white/40"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'recent' && (
        <div className="space-y-2">
          {recentEntries.map((entry) => (
            <button
              key={entry.id}
              className="w-full text-left rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:bg-white/[0.04] transition-colors touch-manipulation"
              onClick={() => onViewEntry(entry.id)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2 flex-1 min-w-0">
                  <h3 className="text-[14px] text-white line-clamp-2">{entry.activity}</h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                      {entry.date}
                    </span>
                    <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                      {entry.hours}h
                    </span>
                    <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                      {entry.status}
                    </span>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-white/55 flex-shrink-0" />
              </div>
            </button>
          ))}

          <Button
            variant="outline"
            onClick={onViewHistory}
            className="w-full h-11 border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.06] touch-manipulation"
          >
            View all entries
          </Button>
        </div>
      )}

      {activeTab === 'goals' && (
        <div className="space-y-2">
          {activeGoals.map((goal) => (
            <div
              key={goal.id}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-[14px] text-white">{goal.title}</h3>
                <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                  {goal.status}
                </span>
              </div>

              <div className="space-y-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                <div className="flex justify-between text-[13px]">
                  <span className="text-white/55">Progress</span>
                  <span className="text-white font-mono">
                    {goal.currentHours} / {goal.targetHours} hours
                  </span>
                </div>
                <Progress
                  value={(goal.currentHours / goal.targetHours) * 100}
                  className="h-1 bg-white/5"
                />
              </div>

              <div className="text-[12px] text-white/55 font-mono">
                Due: {new Date(goal.deadline).toLocaleDateString()}
              </div>
            </div>
          ))}

          {activeGoals.length === 0 && (
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 text-center space-y-2">
              <Target className="h-6 w-6 text-white/55 mx-auto" />
              <p className="text-[14px] text-white">No active goals</p>
              <p className="text-[12px] text-white/55">Create goals to track your progress</p>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={onViewHistory}
          className="h-11 border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.06] touch-manipulation"
        >
          <Clock className="mr-2 h-4 w-4" />
          History
        </Button>
        <Button
          variant="outline"
          onClick={handleQuickExport}
          className="h-11 border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.06] touch-manipulation"
        >
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  );
};

export default MobileCPDTracker;
