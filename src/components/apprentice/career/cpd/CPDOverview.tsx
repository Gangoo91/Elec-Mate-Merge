import { Progress } from '@/components/ui/progress';

const CPDOverview = () => {
  const currentYear = new Date().getFullYear();
  const hoursCompleted = 28;
  const hoursTarget = 35;
  const progressPercentage = Math.round((hoursCompleted / hoursTarget) * 100);

  const recentActivities = [
    { date: '2024-01-15', activity: 'BS 7671 Update Seminar', hours: 4, type: 'Formal Learning' },
    { date: '2024-01-10', activity: 'Cable Sizing Workshop', hours: 3, type: 'Technical Training' },
    {
      date: '2024-01-05',
      activity: 'Health & Safety Refresher',
      hours: 2,
      type: 'Safety Training',
    },
  ];

  const categoryBreakdown = [
    { category: 'Technical Skills', hours: 12 },
    { category: 'Regulations', hours: 8 },
    { category: 'Safety', hours: 5 },
    { category: 'Management', hours: 3 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            Hours this year
          </span>
          <div className="text-[20px] font-semibold text-white">{hoursCompleted}</div>
          <p className="text-[12px] text-white">of {hoursTarget} target</p>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            Progress
          </span>
          <div className="text-[20px] font-semibold text-white">{progressPercentage}%</div>
          <p className="text-[12px] text-white">Target completion</p>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            Days remaining
          </span>
          <div className="text-[20px] font-semibold text-white">187</div>
          <p className="text-[12px] text-white">Until year end</p>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            Compliance
          </span>
          <div className="text-[20px] font-semibold text-white">On track</div>
          <p className="text-[12px] text-white">Professional bodies</p>
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          {currentYear} CPD progress
        </span>
        <div className="space-y-2">
          <div className="flex justify-between text-[13px] text-white">
            <span>Annual progress</span>
            <span className="font-mono">
              {hoursCompleted} / {hoursTarget} hours
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
        <p className="text-[13px] text-white">
          You need {hoursTarget - hoursCompleted} more hours to meet your annual target.
        </p>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          Hours by category
        </span>
        <div className="space-y-3">
          {categoryBreakdown.map((category, index) => (
            <div key={index} className="space-y-1.5">
              <div className="flex justify-between items-baseline">
                <span className="text-[13px] text-white">{category.category}</span>
                <span className="text-[12px] text-white font-mono">{category.hours} hrs</span>
              </div>
              <div className="w-full bg-white/[0.04] rounded-full h-1">
                <div
                  className="h-1 rounded-full bg-white/40"
                  style={{ width: `${(category.hours / hoursCompleted) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          Recent activities
        </span>
        <div className="space-y-2">
          {recentActivities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] p-3"
            >
              <div className="space-y-0.5">
                <div className="text-[13px] text-white">{activity.activity}</div>
                <div className="text-[11px] text-white">{activity.date}</div>
              </div>
              <div className="text-right space-y-0.5">
                <div className="text-[13px] text-white font-mono">{activity.hours}h</div>
                <span className="text-[11px] text-white">{activity.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CPDOverview;
