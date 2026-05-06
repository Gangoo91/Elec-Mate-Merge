import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Clock, Target, Download, Plus } from 'lucide-react';
import { useCPDData } from '@/hooks/cpd/useCPDData';
import { cpdExportService } from '@/services/cpdExportService';

interface CPDDashboardProps {
  onAddEntry: () => void;
  onViewHistory: () => void;
  onManageGoals: () => void;
}

const CPDDashboard = ({ onAddEntry, onViewHistory, onManageGoals }: CPDDashboardProps) => {
  const { stats, entries, goals, loading } = useCPDData();

  const handleExportPDF = () => {
    if (stats && entries && goals) {
      cpdExportService.exportToPDF(entries, stats, goals);
    }
  };

  if (loading || !stats) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
            >
              <div className="h-16 bg-white/[0.04] rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const getComplianceStatus = () => {
    if (stats.completionPercentage >= 100) return 'Compliant';
    if (stats.completionPercentage >= 80) return 'On track';
    if (stats.completionPercentage >= 60) return 'Monitor';
    return 'Attention needed';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={onAddEntry}
          className="h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add CPD entry
        </Button>
        <Button
          variant="outline"
          onClick={onViewHistory}
          className="h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
        >
          <Clock className="mr-2 h-4 w-4" />
          View history
        </Button>
        <Button
          variant="outline"
          onClick={onManageGoals}
          className="h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
        >
          <Target className="mr-2 h-4 w-4" />
          Manage goals
        </Button>
        <Button
          variant="outline"
          onClick={handleExportPDF}
          className="h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
        >
          <Download className="mr-2 h-4 w-4" />
          Export PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-2xl border border-white/[0.10] bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5 space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Hours this year
          </span>
          <div className="text-[20px] font-semibold text-white">{stats.hoursThisYear}</div>
          <p className="text-[12px] text-white/55">of {stats.targetHours} target</p>
        </div>
        <div className="rounded-2xl border border-white/[0.10] bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5 space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Progress
          </span>
          <div className="text-[20px] font-semibold text-white">{stats.completionPercentage}%</div>
          <p className="text-[12px] text-white/55">Target completion</p>
        </div>
        <div className="rounded-2xl border border-white/[0.10] bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5 space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Days remaining
          </span>
          <div className="text-[20px] font-semibold text-white">{stats.daysRemaining}</div>
          <p className="text-[12px] text-white/55">Until year end</p>
        </div>
        <div className="rounded-2xl border border-white/[0.10] bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5 space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Compliance
          </span>
          <div className="text-[16px] font-semibold text-white">{getComplianceStatus()}</div>
          <p className="text-[12px] text-white/55">Professional bodies</p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.10] bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5 sm:p-6 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          {new Date().getFullYear()} CPD progress
        </span>
        <div className="space-y-2">
          <div className="flex justify-between text-[13px]">
            <span className="text-white/55">Annual progress</span>
            <span className="text-white font-mono">
              {stats.hoursThisYear} / {stats.targetHours} hours
            </span>
          </div>
          <Progress value={stats.completionPercentage} className="h-2" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-3 space-y-0.5">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Hours this month
            </span>
            <div className="text-[16px] font-semibold text-white">{stats.hoursThisMonth}</div>
          </div>
          <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-3 space-y-0.5">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Monthly average
            </span>
            <div className="text-[16px] font-semibold text-white">
              {stats.averageHoursPerMonth.toFixed(1)}
            </div>
          </div>
        </div>
        {stats.completionPercentage < 100 && (
          <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-3 text-[13px] text-white/85">
            You need{' '}
            <span className="text-white font-mono">
              {stats.targetHours - stats.hoursThisYear}
            </span>{' '}
            more hours to meet your annual target.
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-white/[0.10] bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5 sm:p-6 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Hours by category
        </span>
        <div className="space-y-3">
          {stats.categoryBreakdown.map((category, index) => (
            <div key={index} className="space-y-1.5">
              <div className="flex justify-between items-baseline">
                <span className="text-[13px] text-white/85">{category.category}</span>
                <span className="text-[12px] text-white font-mono">
                  {category.hours} hrs ({category.percentage}%)
                </span>
              </div>
              <div className="w-full bg-white/[0.04] rounded-full h-1">
                <div
                  className="h-1 rounded-full bg-white/40 transition-all duration-500"
                  style={{ width: `${category.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CPDDashboard;
