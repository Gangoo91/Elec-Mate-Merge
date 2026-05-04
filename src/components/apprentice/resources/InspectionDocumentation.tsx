import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const InspectionDocumentation = () => {
  const sections = [
    {
      eyebrow: 'Standardised forms',
      lede: 'Using standardised forms ensures consistency in inspections and makes it easier to track trends over time.',
      items: [
        {
          label: 'Header information',
          text: "Date, time, location, inspector's name and position",
        },
        {
          label: 'Inspection categories',
          text: 'Organised sections for different types of hazards',
        },
        {
          label: 'Compliance rating',
          text: 'Yes/No/N/A or numeric scale for each item',
        },
        {
          label: 'Action planning',
          text: 'Sections for corrective actions, responsibilities and due dates',
        },
      ],
    },
    {
      eyebrow: 'Recording findings',
      lede: 'Thorough documentation of inspection findings creates an audit trail and ensures issues are addressed.',
      items: [
        {
          label: 'Detailed descriptions',
          text: 'Specific information about each hazard or issue found',
        },
        {
          label: 'Risk assessment',
          text: 'Evaluation of the severity and likelihood of each hazard',
        },
        {
          label: 'Visual evidence',
          text: 'Photographs of hazards to provide clear documentation',
        },
        {
          label: 'Contextual information',
          text: 'Work activities and conditions at the time of inspection',
        },
      ],
    },
    {
      eyebrow: 'Tracking corrective actions',
      lede: 'A robust tracking system ensures that identified hazards are addressed in a timely manner.',
      items: [
        {
          label: 'Assignment process',
          text: 'Clear designation of responsibility for each corrective action',
        },
        {
          label: 'Follow-up procedures',
          text: 'Regular reviews of outstanding actions and verification',
        },
        {
          label: 'Tracking tools',
          text: 'Action registers, digital platforms or visual management boards',
        },
        {
          label: 'Escalation process',
          text: 'Procedures for when corrective actions are not completed',
        },
      ],
    },
    {
      eyebrow: 'Analysing trends',
      lede: 'Analysing inspection data over time can reveal patterns and systemic issues.',
      items: [
        {
          label: 'Data collection',
          text: 'Gathering information from multiple inspections for analysis',
        },
        {
          label: 'Pattern identification',
          text: 'Spotting recurring issues across locations or time periods',
        },
        {
          label: 'Root cause analysis',
          text: 'Investigating underlying causes of repeated findings',
        },
        {
          label: 'Prevention planning',
          text: 'Using trend data to develop preventative measures',
        },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 animate-fade-in">
      <Link to="/apprentice/study/eal/level-2-diploma-in-electrical-installation/unit/elec2-01/section/2/subsection/2.1">
        <Button
          variant="outline"
          className="mb-6 h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Workplace Inspection Procedures
        </Button>
      </Link>

      <div className="space-y-6">
        <div className="space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Workplace inspections
          </span>
          <h1 className="text-[24px] sm:text-[28px] font-bold tracking-tight text-white leading-tight">
            Documentation process for workplace inspections
          </h1>
          <p className="text-[14px] text-white/70 leading-relaxed max-w-2xl">
            Effective documentation is essential for tracking hazards, ensuring accountability, and
            maintaining a record of safety efforts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                {section.eyebrow}
              </span>
              <p className="text-[14px] text-white/85 leading-relaxed">{section.lede}</p>
              <ul className="space-y-2">
                {section.items.map((item, i) => (
                  <li
                    key={i}
                    className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>
                      <span className="font-medium text-white">{item.label}: </span>
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Documentation best practices
          </span>
          <ul className="space-y-1.5">
            {[
              'Keep inspection records for a minimum of three years (or as required by regulations)',
              'Make records accessible to relevant stakeholders while maintaining confidentiality',
              'Use clear file naming conventions and organised storage systems',
              'Regularly back up electronic documentation',
              'Review and update documentation processes as part of continuous improvement',
              'Ensure inspection forms align with current regulations and company policies',
              'Train inspectors on proper documentation techniques and importance',
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
  );
};

export default InspectionDocumentation;
