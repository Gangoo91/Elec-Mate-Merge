import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { openExternalUrl } from '@/utils/open-external-url';

const ProductivityToolsTab = () => {
  const mobileApps = [
    {
      name: 'Forest',
      description: 'Stay focused by growing virtual trees during study sessions',
      category: 'Focus',
      price: 'Free + Premium',
      features: ['Pomodoro timer', 'Study statistics', 'Focus challenges'],
    },
    {
      name: 'Todoist',
      description: 'Organise tasks and projects with natural language processing',
      category: 'Task management',
      price: 'Free + Premium',
      features: ['Project organisation', 'Due date reminders', 'Progress tracking'],
    },
    {
      name: 'RescueTime',
      description: 'Automatically track how you spend time on devices',
      category: 'Time tracking',
      price: 'Free + Premium',
      features: ['Automatic tracking', 'Detailed reports', 'Goal setting'],
    },
    {
      name: 'Headspace',
      description: 'Guided meditation and mindfulness for stress management',
      category: 'Wellbeing',
      price: 'Free trial + Subscription',
      features: ['Guided meditations', 'Sleep stories', 'Focus music'],
    },
  ];

  const webTools = [
    {
      name: 'Trello',
      description: 'Visual project management using boards and cards',
      category: 'Project management',
      url: 'https://trello.com',
      features: ['Kanban boards', 'Team collaboration', 'Due dates'],
    },
    {
      name: 'Google Calendar',
      description: 'Schedule management with integration across devices',
      category: 'Scheduling',
      url: 'https://calendar.google.com',
      features: ['Multiple calendars', 'Event reminders', 'Mobile sync'],
    },
    {
      name: 'Notion',
      description: 'All-in-one workspace for notes, tasks, and planning',
      category: 'Note-taking',
      url: 'https://notion.so',
      features: ['Database functionality', 'Template gallery', 'Team sharing'],
    },
  ];

  const techniques = [
    {
      title: 'Pomodoro technique',
      description: 'Work for 25 minutes, then take a 5-minute break',
      benefits: ['Maintains focus', 'Prevents burnout', 'Improves time awareness'],
      howTo: [
        'Choose a task to work on',
        'Set timer for 25 minutes',
        'Work until timer rings',
        'Take 5-minute break',
        'After 4 cycles, take longer 15-30 minute break',
      ],
    },
    {
      title: 'Time blocking',
      description: 'Assign specific time slots to different activities',
      benefits: [
        'Reduces decision fatigue',
        'Ensures important tasks get time',
        'Creates routine',
      ],
      howTo: [
        'List all regular activities (work, college, study, personal)',
        'Estimate time needed for each',
        'Block out fixed commitments first',
        'Assign remaining time to flexible tasks',
        'Include buffer time for unexpected issues',
      ],
    },
    {
      title: 'Two-minute rule',
      description: 'If a task takes less than 2 minutes, do it immediately',
      benefits: ['Prevents small task accumulation', 'Maintains momentum', 'Reduces mental load'],
      howTo: [
        'When you encounter a small task, assess if it takes under 2 minutes',
        'If yes, complete it immediately',
        'If no, add it to your task list or calendar',
        'Apply to emails, quick calls, filing, brief research',
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Recommended mobile apps
          </span>
          <p className="text-[14px] text-white/85 leading-relaxed">
            Apps specifically useful for apprentices managing work and study
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mobileApps.map((app, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-[14px] font-semibold text-white">{app.name}</h4>
                  <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] inline-block mt-1">
                    {app.category}
                  </span>
                </div>
                <div className="text-[12px] text-white/55">{app.price}</div>
              </div>
              <p className="text-[14px] text-white/85 leading-relaxed">{app.description}</p>
              <div className="space-y-1">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Key features
                </span>
                <ul className="space-y-1">
                  {app.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Web-based tools
          </span>
          <p className="text-[14px] text-white/85 leading-relaxed">
            Browser-based tools for planning and organisation
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {webTools.map((tool, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3"
            >
              <div>
                <h4 className="text-[14px] font-semibold text-white">{tool.name}</h4>
                <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] inline-block mt-1">
                  {tool.category}
                </span>
              </div>
              <p className="text-[14px] text-white/85 leading-relaxed">{tool.description}</p>
              <div className="space-y-1">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Features
                </span>
                <ul className="space-y-1">
                  {tool.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
                onClick={() => openExternalUrl(tool.url)}
              >
                Visit site
                <ExternalLink className="ml-2 h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Proven productivity techniques
          </span>
          <p className="text-[14px] text-white/85 leading-relaxed">
            Time-tested methods for maximising efficiency
          </p>
        </div>
        <div className="space-y-4">
          {techniques.map((technique, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3"
            >
              <div>
                <h3 className="text-[16px] font-semibold text-white leading-tight">
                  {technique.title}
                </h3>
                <p className="text-[14px] text-white/70 leading-relaxed mt-1">
                  {technique.description}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
                    Benefits
                  </span>
                  <ul className="space-y-1">
                    {technique.benefits.map((benefit, idx) => (
                      <li
                        key={idx}
                        className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    How to implement
                  </span>
                  <ol className="space-y-1">
                    {technique.howTo.map((step, idx) => (
                      <li
                        key={idx}
                        className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                      >
                        <span className="text-elec-yellow font-medium mt-0">{idx + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductivityToolsTab;
