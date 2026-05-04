import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CommunicationMethods = () => {
  const sections = [
    {
      eyebrow: 'Verbal communication methods',
      items: [
        {
          title: 'Toolbox talks',
          text: "Brief, focused safety discussions at the start of shifts that address specific hazards or procedures relevant to the day's work.",
        },
        {
          title: 'Safety briefings',
          text: 'More comprehensive discussions covering broader safety topics, often scheduled weekly or monthly.',
        },
        {
          title: 'One-on-one instruction',
          text: 'Direct communication between supervisors and workers for specific task-related safety guidance.',
        },
      ],
    },
    {
      eyebrow: 'Visual communication methods',
      items: [
        {
          title: 'Safety signage',
          text: 'Clear, standardised signs that communicate hazards, required PPE, and safety procedures.',
        },
        {
          title: 'Safety boards',
          text: 'Dedicated display areas for safety information, incident reports, and current safety focus areas.',
        },
        {
          title: 'Colour coding',
          text: 'Using consistent colours to indicate different hazards or safety requirements (e.g., red for fire equipment, yellow for caution).',
        },
      ],
    },
    {
      eyebrow: 'Written communication methods',
      items: [
        {
          title: 'Safety manuals',
          text: 'Comprehensive documents containing all safety policies, procedures, and reference information.',
        },
        {
          title: 'Method statements',
          text: 'Detailed documents outlining how specific tasks should be performed safely.',
        },
        {
          title: 'Risk assessments',
          text: 'Written evaluations of potential hazards and control measures for specific tasks or environments.',
        },
      ],
    },
    {
      eyebrow: 'Digital communication methods',
      items: [
        {
          title: 'Safety apps',
          text: 'Mobile applications that provide real-time safety information, hazard reporting, and reference materials.',
        },
        {
          title: 'Emergency notification systems',
          text: 'Digital systems that can rapidly communicate emergency information to all workers through multiple channels.',
        },
        {
          title: 'Digital dashboards',
          text: 'Visual displays showing safety performance metrics, recent incidents, and current focus areas.',
        },
      ],
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
            Communication methods for electrical safety
          </h1>
          <p className="text-[14px] text-white/70 leading-relaxed max-w-2xl">
            Multiple communication methods help ensure safety information reaches all workers
            effectively.
          </p>
        </div>

        <div className="space-y-4">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                {section.eyebrow}
              </span>
              <div className="space-y-3">
                {section.items.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1"
                  >
                    <h3 className="text-[14px] font-semibold text-white">{item.title}</h3>
                    <p className="text-[14px] text-white/85 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Best practices for communication methods
            </span>
            <ul className="space-y-1.5">
              {[
                'Use multiple communication methods to reach workers with different learning preferences',
                'Ensure information is accessible to workers with different language abilities',
                'Keep messages clear, concise, and focused on key safety points',
                'Verify understanding through questions and demonstrations',
                'Regularly update and refresh safety communication to prevent complacency',
                'Enable two-way communication to encourage feedback and questions',
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
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

export default CommunicationMethods;
