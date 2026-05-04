import { Button } from '@/components/ui/button';

const ARComingSoonTab = () => {
  const arFeatures = [
    {
      title: '3D circuit visualisation',
      description: 'See electrical circuits in 3D space with real-time current flow animations',
      status: 'In development',
    },
    {
      title: 'Virtual equipment training',
      description: 'Practice with virtual test equipment before using the real thing',
      status: 'Planned',
    },
    {
      title: 'Interactive safety scenarios',
      description: 'Experience safety situations in a controlled virtual environment',
      status: 'Research phase',
    },
    {
      title: 'Remote mentoring',
      description: 'Share your view with mentors for real-time guidance on-site',
      status: 'Concept',
    },
  ];

  const developmentMilestones = [
    { phase: 'Research & design', progress: 100, status: 'Complete' },
    { phase: 'Prototype development', progress: 75, status: 'In progress' },
    { phase: 'Beta testing', progress: 0, status: 'Upcoming' },
    { phase: 'Public release', progress: 0, status: '2025 Q3' },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3 text-center">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Augmented reality training
        </span>
        <p className="text-[16px] text-white/85 leading-relaxed">
          The future of electrical apprentice training is here
        </p>
        <span className="inline-block text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
          Coming soon — 2025 Q3
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed max-w-2xl mx-auto">
          Imagine being able to see electrical circuits in 3D, practice with virtual equipment, and
          receive real-time guidance from mentors — all through augmented reality.
        </p>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Planned AR features
          </span>
          <p className="text-[14px] text-white/85 leading-relaxed">
            Revolutionary training experiences powered by augmented reality technology
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {arFeatures.map((feature, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-[14px] font-semibold text-white">{feature.title}</h4>
                <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] whitespace-nowrap">
                  {feature.status}
                </span>
              </div>
              <p className="text-[14px] text-white/85 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Development progress
          </span>
          <p className="text-[14px] text-white/85 leading-relaxed">
            Track our progress towards bringing AR training to Elec-Mate
          </p>
        </div>
        <div className="space-y-3">
          {developmentMilestones.map((milestone, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between items-center gap-2">
                <span className="text-[14px] font-semibold text-white">{milestone.phase}</span>
                <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                  {milestone.status}
                </span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-elec-yellow transition-all duration-500"
                  style={{ width: `${milestone.progress}%` }}
                />
              </div>
              <div className="text-[11px] text-white/55 font-mono">
                {milestone.progress}% complete
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            AR preview concept
          </span>
          <p className="text-[14px] text-white/85 leading-relaxed">
            Get a glimpse of what AR training will look like
          </p>
        </div>
        <div className="rounded-xl border border-dashed border-white/15 p-6 text-center space-y-3">
          <p className="text-[14px] font-semibold text-white">AR experience preview</p>
          <p className="text-[14px] text-white/85 leading-relaxed">
            Point your device at electrical equipment to see interactive 3D overlays, safety
            information, and step-by-step guidance.
          </p>
          <span className="inline-block text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
            Demo coming soon
          </span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            'Circuit visualisation',
            'Mobile compatible',
            'Real-time feedback',
          ].map((label) => (
            <div
              key={label}
              className="text-center text-[13px] text-white/85 leading-relaxed"
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Stay updated
          </span>
          <p className="text-[14px] text-white/85 leading-relaxed">
            Be the first to know when AR training becomes available
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            className="flex-1 h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
          >
            Join AR beta list
          </Button>
          <Button className="flex-1 h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation">
            Get notified on release
          </Button>
        </div>
        <p className="text-[12px] text-white/55 text-center">
          Expected release: Q3 2025 · Beta testing available Q2 2025
        </p>
      </div>
    </div>
  );
};

export default ARComingSoonTab;
