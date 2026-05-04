import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const SafetyMeetings = () => {
  const meetingTypes = [
    {
      title: 'Daily toolbox talks (5–15 minutes)',
      items: [
        'Focus on immediate daily tasks and hazards',
        'Conducted at the start of each shift',
        'Led by site supervisor or foreman',
        "Topics directly relevant to the day's work",
      ],
    },
    {
      title: 'Weekly safety meetings (15–30 minutes)',
      items: [
        "Review of the week's incidents or near-misses",
        'Discussion of upcoming work and associated risks',
        'Focus on one specific safety topic in depth',
        'Opportunity for workers to raise safety concerns',
      ],
    },
    {
      title: 'Monthly safety committee meetings (30–60 minutes)',
      items: [
        'Formal review of safety performance metrics',
        'Discussion of ongoing safety initiatives',
        'Review of regulatory changes or updates',
        'Planning for safety training and improvements',
      ],
    },
    {
      title: 'Emergency response drills (varies)',
      items: [
        'Practical exercises testing emergency procedures',
        'Immediate debrief and feedback session',
        'Identification of improvements needed',
        'Assignment of corrective actions',
      ],
    },
  ];

  const meetingStructure = [
    {
      title: 'Opening (1–2 minutes)',
      items: [
        'Welcome participants and take attendance',
        'State the meeting purpose and agenda',
        'Set expectations for participation',
      ],
    },
    {
      title: 'Review (3–5 minutes)',
      items: [
        'Recap previous safety points or concerns',
        'Update on any action items from previous meetings',
        'Review recent incidents or near-misses',
      ],
    },
    {
      title: 'Main topic discussion (5–15 minutes)',
      items: [
        'Present the main safety topic with clear information',
        'Use visual aids when possible',
        'Relate the topic to current work activities',
        'Include real examples or case studies',
      ],
    },
    {
      title: 'Interactive element (5–10 minutes)',
      items: [
        'Demonstration of proper techniques or equipment',
        'Guided discussion or Q&A session',
        'Brief practical exercise when applicable',
      ],
    },
    {
      title: 'Open forum (3–5 minutes)',
      items: [
        'Invite workers to raise safety concerns',
        'Discuss potential hazards identified by the team',
        'Gather suggestions for safety improvements',
      ],
    },
    {
      title: 'Action items & closure (2–3 minutes)',
      items: [
        'Summarise key points discussed',
        'Assign any action items with clear responsibilities',
        'Preview the next meeting topic',
        'Thank participants and close the meeting',
      ],
    },
  ];

  const bestPractices = [
    {
      title: 'Keep it relevant',
      description:
        'Focus on topics directly applicable to current work tasks and actual conditions on site.',
    },
    {
      title: 'Use visual aids',
      description:
        'Include photos, diagrams, or actual equipment to illustrate key points and improve retention.',
    },
    {
      title: 'Encourage participation',
      description:
        'Ask questions, invite experiences, and create an environment where workers feel comfortable contributing.',
    },
    {
      title: 'Rotate leadership',
      description:
        'Allow different team members to lead meetings to increase engagement and develop safety leadership.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 animate-fade-in">
      <Link to="/apprentice/study/eal/level-2-diploma-in-electrical-installation/unit/elec2-01/section/2/subsection/2.3">
        <Button
          variant="outline"
          className="mb-6 h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Safety Communication
        </Button>
      </Link>

      <div className="space-y-6">
        <div className="space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Safety communication
          </span>
          <h1 className="text-[24px] sm:text-[28px] font-bold tracking-tight text-white leading-tight">
            Safety meeting structure guide
          </h1>
          <p className="text-[14px] text-white/70 leading-relaxed max-w-2xl">
            Well-structured safety meetings maintain awareness and ensure all workers stay updated
            with critical safety information.
          </p>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Types of safety meetings
          </span>
          <div className="space-y-3">
            {meetingTypes.map((type, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
              >
                <h3 className="text-[14px] font-semibold text-white">{type.title}</h3>
                <ul className="space-y-1.5">
                  {type.items.map((item, i) => (
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
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Effective meeting structure
          </span>
          <ol className="space-y-3">
            {meetingStructure.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-elec-yellow font-mono text-[12px] mt-0.5 flex-shrink-0">
                  {idx + 1}.
                </span>
                <div className="space-y-1.5 flex-1">
                  <p className="text-[14px] font-semibold text-white">{step.title}</p>
                  <ul className="space-y-1">
                    {step.items.map((item, i) => (
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
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Meeting documentation
          </span>
          <p className="text-[14px] text-white/85 leading-relaxed">
            Every safety meeting should be documented to track attendance and content covered:
          </p>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Essential documentation elements
            </span>
            <ul className="space-y-1.5">
              {[
                'Date, time, and location of meeting',
                'List of attendees (with signatures when possible)',
                'Meeting leader name',
                'Topics discussed',
                'Key points covered',
                'Questions raised',
                'Action items assigned (with responsible persons and deadlines)',
                'Planned date for next meeting',
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Best practices for engaging safety meetings
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {bestPractices.map((practice, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-1.5"
              >
                <h4 className="text-[14px] font-semibold text-white">{practice.title}</h4>
                <p className="text-[14px] text-white/85 leading-relaxed">{practice.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Meeting resources
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              'Toolbox Talk Templates',
              'Safety Meeting Attendance Log',
              'Monthly Safety Topics Calendar',
              'Safety Meeting Evaluation Form',
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 rounded-md border border-white/[0.06] bg-white/[0.02]"
              >
                <FileText className="h-4 w-4 text-white/55" />
                <span className="text-[13px] text-white/85">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyMeetings;
