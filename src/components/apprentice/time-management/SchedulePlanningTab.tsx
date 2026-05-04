import { Button } from '@/components/ui/button';
import { useState } from 'react';

const SchedulePlanningTab = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const scheduleTemplates = [
    {
      id: 'early-bird',
      title: 'Early bird schedule',
      description: 'For apprentices who prefer starting early',
      schedule: {
        '5:30': 'Wake up, light breakfast',
        '6:00': 'Travel to site',
        '7:00': 'Work starts',
        '12:00': 'Lunch break',
        '16:30': 'Work ends, travel home',
        '17:30': 'Study time (1.5 hours)',
        '19:00': 'Dinner and family time',
        '21:00': 'Personal time/relaxation',
        '22:00': 'Prepare for next day',
        '22:30': 'Bedtime',
      },
    },
    {
      id: 'standard',
      title: 'Standard schedule',
      description: 'Balanced approach for most apprentices',
      schedule: {
        '6:30': 'Wake up, breakfast',
        '7:30': 'Travel to site',
        '8:00': 'Work starts',
        '12:30': 'Lunch break',
        '17:00': 'Work ends, travel home',
        '18:00': 'Study time (2 hours)',
        '20:00': 'Dinner',
        '21:00': 'Personal time',
        '22:30': 'Prepare for next day',
        '23:00': 'Bedtime',
      },
    },
    {
      id: 'flexible',
      title: 'Flexible schedule',
      description: 'For apprentices with varying site times',
      schedule: {
        Variable: 'Adjust wake-up based on site start time',
        'Site-1h': 'Travel buffer',
        'Site time': 'Work hours (track actual times)',
        'Site+30min': 'Travel home',
        Evening: '2-3 hours study (flexible timing)',
        Personal: '1-2 hours personal time',
        'Wind-down': '30 minutes preparation',
        Sleep: '7-8 hours target',
      },
    },
  ];

  const planningTools = [
    {
      title: 'Weekly planning session',
      description: 'Sunday evening review and planning',
      steps: [
        "Review previous week's achievements",
        'Identify upcoming deadlines and priorities',
        'Plan study topics for each day',
        'Schedule important personal activities',
        'Set three main goals for the week',
      ],
      time: '30-45 minutes',
    },
    {
      title: 'Daily planning routine',
      description: 'Morning or evening preparation',
      steps: [
        "Check tomorrow's site location and start time",
        'Prepare work clothes and tools',
        'Review study materials for the day',
        'Set 1-2 priority tasks',
        'Plan meal preparation',
      ],
      time: '10-15 minutes',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Schedule templates
        </span>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {scheduleTemplates.map((template) => {
            const active = selectedTemplate === template.id;
            return (
              <div
                key={template.id}
                className={`rounded-xl border p-4 transition-all duration-200 cursor-pointer touch-manipulation ${
                  active
                    ? 'border-elec-yellow/30 bg-elec-yellow/[0.04]'
                    : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]'
                }`}
                onClick={() => setSelectedTemplate(active ? null : template.id)}
              >
                <h3 className="text-[16px] font-semibold text-white leading-tight">
                  {template.title}
                </h3>
                <p className="text-[14px] text-white/70 leading-relaxed mt-1">
                  {template.description}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-white/15 text-white hover:bg-white/[0.05] touch-manipulation mt-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTemplate(template.id);
                  }}
                >
                  {active ? 'Hide details' : 'View schedule'}
                </Button>
              </div>
            );
          })}
        </div>

        {selectedTemplate && (
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              {scheduleTemplates.find((t) => t.id === selectedTemplate)?.title} — sample day
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(
                scheduleTemplates.find((t) => t.id === selectedTemplate)?.schedule || {}
              ).map(([time, activity]) => (
                <div
                  key={time}
                  className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3"
                >
                  <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] font-mono whitespace-nowrap">
                    {time}
                  </span>
                  <span className="text-[14px] text-white/85 leading-relaxed">{activity}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Planning routines
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {planningTools.map((tool, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-[14px] font-semibold text-white">{tool.title}</h4>
                <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] whitespace-nowrap">
                  {tool.time}
                </span>
              </div>
              <p className="text-[14px] text-white/85 leading-relaxed">{tool.description}</p>
              <ul className="space-y-1.5">
                {tool.steps.map((step, stepIndex) => (
                  <li
                    key={stepIndex}
                    className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Site-specific planning
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
            <h4 className="text-[14px] font-semibold text-white">Domestic sites</h4>
            <ul className="space-y-1.5">
              {[
                'Usually 8:00-16:30 working hours',
                'More predictable schedule',
                'Plan study time for 17:30-19:30',
                'Use travel time for audio learning',
              ].map((item, i) => (
                <li
                  key={i}
                  className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
            <h4 className="text-[14px] font-semibold text-white">Commercial sites</h4>
            <ul className="space-y-1.5">
              {[
                'May require early starts (6:00-7:00)',
                'Longer days possible',
                'Plan study for evenings or early mornings',
                'Consider batch cooking on weekends',
              ].map((item, i) => (
                <li
                  key={i}
                  className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePlanningTab;
