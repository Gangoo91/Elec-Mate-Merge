import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const CommunicationStructures = () => {
  const sections = [
    {
      eyebrow: 'Reporting hierarchies',
      lede: 'Clear reporting hierarchies establish who to contact in different safety scenarios:',
      items: [
        'Direct supervisors for immediate workplace hazards',
        'Health and safety representatives for ongoing concerns',
        'Emergency contacts for urgent dangerous situations',
        'Senior management for systemic safety issues',
      ],
    },
    {
      eyebrow: 'Formal communication procedures',
      lede: 'Standardised procedures ensure consistent and effective information flow:',
      items: [
        'Incident reporting forms and processes',
        'Risk assessment documentation',
        'Safety briefing protocols',
        'Emergency response communication chains',
      ],
    },
    {
      eyebrow: 'Clear lines of authority',
      lede: 'Understanding who has authority in safety matters prevents confusion:',
      items: [
        'Site safety officers and their jurisdiction',
        "Project managers' safety responsibilities",
        "Client representatives' safety authority",
        'Regulatory inspectors and their powers',
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
            Communication structures in electrical safety
          </h1>
          <p className="text-[14px] text-white/70 leading-relaxed max-w-2xl">
            Effective communication structures ensure safety information flows efficiently
            throughout an organisation.
          </p>
        </div>

        <div className="space-y-4">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                {section.eyebrow}
              </span>
              <p className="text-[14px] text-white/85 leading-relaxed">{section.lede}</p>
              <ul className="space-y-1.5 pt-1">
                {section.items.map((item, i) => (
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

          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Communication flow charts
            </span>
            <p className="text-[14px] text-white/85 leading-relaxed">
              Visual representations help clarify who to contact in different situations:
            </p>
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 text-center">
              <p className="text-[13px] text-white/55 italic">
                Flow chart visualisation would be displayed here
              </p>
            </div>
            <p className="text-[14px] text-white/85 leading-relaxed">
              Flow charts should be posted in visible locations and included in safety manuals for
              quick reference.
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Best practices
            </span>
            <ul className="space-y-1.5">
              {[
                'Review communication structures regularly to ensure effectiveness',
                'Train all personnel on communication protocols during onboarding',
                'Test emergency communication chains periodically',
                'Update contact information and procedures as personnel changes occur',
                'Ensure communication structures account for language barriers and shift work',
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

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Additional resources
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              'HSE Communication Guidelines',
              'Sample Communication Structure Templates',
              'Electrical Industry Safety Communication Standards',
              'Communication Effectiveness Assessment Tools',
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

export default CommunicationStructures;
