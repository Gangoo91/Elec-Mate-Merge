import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import { SmartBackButton } from '@/components/ui/smart-back-button';

const yearPhases = [
  {
    label: 'Year 1: Foundation Building',
    colour: 'text-blue-400',
    border: 'border-blue-500/20',
    desc: 'Focus on electrical fundamentals, safety regulations, and basic practical skills. Expect 60-80% theory-based learning.',
    topics: [
      'Electrical science fundamentals (Ohm\'s law, power, energy)',
      'Health & safety regulations and safe working practices',
      'Basic wiring systems and cable types',
      'Introduction to BS 7671 and the IET Wiring Regulations',
      'Hand tool skills and basic termination techniques',
    ],
  },
  {
    label: 'Year 2-3: Skill Development',
    colour: 'text-green-400',
    border: 'border-green-500/20',
    desc: 'Balance theory with practical application. Specialisation areas and advanced techniques. 50-70% practical focus.',
    topics: [
      'Advanced circuit design and load calculations',
      'Three-phase systems and industrial installations',
      'Inspection and testing procedures (initial verification)',
      'Fault finding and diagnostic techniques',
      'Earthing and bonding — detailed study',
    ],
  },
  {
    label: 'Year 4: Mastery & Assessment',
    colour: 'text-orange-400',
    border: 'border-orange-500/20',
    desc: 'Portfolio completion, EPA preparation, and advanced troubleshooting. Assessment-focused learning.',
    topics: [
      'EPA preparation and mock assessments',
      'AM2 practical assessment practice',
      'Portfolio finalisation and KSB gap analysis',
      'Advanced fault diagnosis scenarios',
      'Professional discussion preparation',
    ],
  },
];

const monthlyAllocation = [
  { label: 'College / Training Centre', value: '40-60%' },
  { label: 'Online Learning', value: '20-30%' },
  { label: 'Practical Workshops', value: '15-25%' },
  { label: 'Industry Visits / Events', value: '5-15%' },
];

const sampleWeek = [
  { day: 'Monday', activity: 'On-site work (on-the-job)', type: 'work' },
  { day: 'Tuesday', activity: 'On-site work (on-the-job)', type: 'work' },
  { day: 'Wednesday', activity: 'College — theory and practical workshop', type: 'ojt' },
  { day: 'Thursday', activity: 'On-site work (on-the-job)', type: 'work' },
  { day: 'Friday AM', activity: 'On-site work (on-the-job)', type: 'work' },
  { day: 'Friday PM', activity: 'Online learning module + evidence logging', type: 'ojt' },
];

const catchUpStrategies = [
  {
    title: 'When training is cancelled',
    desc: 'Ask your provider to reschedule within the same month. Log the cancellation and the rescheduled date. If college cancels a session, it is their responsibility to offer a replacement.',
  },
  {
    title: 'When you fall behind on hours',
    desc: 'Speak to your training provider immediately — do not wait. They may offer additional sessions, online catch-up modules, or intensive blocks. Your employer must release you for make-up time.',
  },
  {
    title: 'When work is busy',
    desc: 'Your employer cannot cancel OJT because of workload. If this happens, document it and raise it at your next progress review. Training time is protected by your apprenticeship agreement.',
  },
  {
    title: 'Sickness or absence',
    desc: 'If you miss OJT due to illness, you will need to make up the hours. Work with your provider to plan catch-up sessions. Extended absence may require a break in learning.',
  },
];

const seasonalTips = [
  {
    season: 'Spring (Mar-May)',
    colour: 'text-green-400',
    tip: 'Construction picks up — plan your OJT around the surge. Book college days well in advance and remind your employer early.',
  },
  {
    season: 'Summer (Jun-Aug)',
    colour: 'text-amber-400',
    tip: 'Peak construction season. Employers may push to skip training — do not let them. This is also when many colleges run intensive blocks, which is a good way to bank hours.',
  },
  {
    season: 'Autumn (Sep-Nov)',
    colour: 'text-orange-400',
    tip: 'New college year starts. Good time to reset your training plan and catch up on any shortfall from summer.',
  },
  {
    season: 'Winter (Dec-Feb)',
    colour: 'text-blue-400',
    tip: 'Construction slows down — ideal for extra OJT. Use quieter periods for online learning, portfolio work, and mock assessments.',
  },
];

const PlanningPage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">Planning Your Training</h1>
      </div>

      {/* Annual Approach */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-400" />
          <h2 className="text-base font-semibold text-white">Annual Planning Approach</h2>
        </div>

        {yearPhases.map((phase) => (
          <Card key={phase.label} className={`${phase.border} bg-white/5`}>
            <CardContent className="p-4 space-y-2">
              <h3 className={`font-medium text-sm ${phase.colour}`}>{phase.label}</h3>
              <p className="text-white text-sm">{phase.desc}</p>
              <ul className="space-y-1 mt-2">
                {phase.topics.map((topic) => (
                  <li key={topic} className="flex items-start gap-2 text-sm text-white">
                    <span className={`${phase.colour} mt-0.5`}>•</span>
                    {topic}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sample Weekly Schedule */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-400" />
          <h2 className="text-base font-semibold text-white">Sample Weekly Schedule</h2>
        </div>

        <Card className="border-purple-500/20 bg-white/5">
          <CardContent className="p-4 space-y-2">
            <p className="text-white text-sm mb-3">
              A typical week for a day-release apprentice:
            </p>
            {sampleWeek.map((row) => (
              <div
                key={row.day}
                className={`flex justify-between items-center p-2 rounded ${
                  row.type === 'ojt' ? 'bg-purple-500/10' : 'bg-white/5'
                }`}
              >
                <span className="text-sm text-white font-medium">{row.day}</span>
                <span
                  className={`text-sm ${row.type === 'ojt' ? 'text-purple-400' : 'text-white'}`}
                >
                  {row.activity}
                </span>
              </div>
            ))}
            <p className="text-white text-xs mt-2">
              Purple rows = off-the-job training. Your schedule may differ — block release
              apprentices attend college full-time for 1-2 week blocks instead.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Allocation */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-400" />
          <h2 className="text-base font-semibold text-white">Monthly Allocation Breakdown</h2>
        </div>

        <Card className="border-purple-500/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            <p className="text-white text-sm mb-2">
              How your OJT hours are typically split across activities:
            </p>
            {monthlyAllocation.map((row) => (
              <div key={row.label} className="flex justify-between items-center">
                <span className="text-sm text-white">{row.label}</span>
                <span className="text-elec-yellow font-medium text-sm">{row.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Catching Up on Missed Hours */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <h2 className="text-base font-semibold text-white">Catching Up on Missed Hours</h2>
        </div>

        {catchUpStrategies.map((item) => (
          <Card key={item.title} className="border-red-500/20 bg-white/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-2 mb-1">
                <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                <h3 className="font-medium text-white text-sm">{item.title}</h3>
              </div>
              <p className="text-white text-sm ml-6">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Seasonal Considerations */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400" />
          <h2 className="text-base font-semibold text-white">Seasonal Considerations</h2>
        </div>

        <p className="text-white text-sm">
          Construction work follows seasonal patterns — plan your OJT around them:
        </p>

        {seasonalTips.map((item) => (
          <Card key={item.season} className="border-white/10 bg-white/5">
            <CardContent className="p-4">
              <h3 className={`font-medium text-sm ${item.colour}`}>{item.season}</h3>
              <p className="text-white text-sm mt-1">{item.tip}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Planning Tip */}
      <Card className="border-amber-500/20 bg-amber-500/10">
        <CardContent className="p-4">
          <h3 className="text-amber-400 font-semibold text-sm mb-2">Planning Tip</h3>
          <p className="text-white text-sm leading-relaxed">
            Coordinate with your employer to ensure your fixed training hours are
            protected and scheduled in advance. Last-minute changes can disrupt learning
            progression. Use the hours defined in your training plan, not an arbitrary
            percentage. Review your training plan at every progress review (minimum
            every 12 weeks) to check you are on track.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlanningPage;
