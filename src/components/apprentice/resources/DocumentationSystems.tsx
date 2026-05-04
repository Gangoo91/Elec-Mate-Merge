import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const DocumentationSystems = () => {
  const documentationTypes = [
    {
      title: 'Risk assessments',
      description:
        'Formal evaluations of potential hazards and the control measures required to mitigate them.',
      note: 'Required for all electrical work activities with significant risks.',
    },
    {
      title: 'Method statements',
      description:
        'Step-by-step procedures for completing tasks safely, incorporating risk assessment findings.',
      note: 'Particularly important for complex or high-risk electrical installations.',
    },
    {
      title: 'Toolbox talk records',
      description:
        'Documentation of daily safety briefings, including topics covered and attendees.',
      note: 'Provides evidence of ongoing safety communication and training.',
    },
    {
      title: 'Incident reports',
      description:
        'Detailed records of accidents, near-misses, and safety violations with investigation findings.',
      note: 'Critical for preventing recurrence and demonstrating regulatory compliance.',
    },
    {
      title: 'Electrical installation certificates',
      description:
        'Documentation confirming that electrical work meets required safety standards.',
      note: 'Legally required for most electrical installation work.',
    },
  ];

  const managementSystems = [
    {
      title: 'Paper-based systems',
      items: [
        'Traditional forms and files organised in binders or folders',
        'Accessible without technology but requires physical storage space',
        'Can be difficult to search and analyse for trends',
        'Still used in many workplaces, especially for signed documents',
      ],
    },
    {
      title: 'Digital documentation systems',
      items: [
        'Electronic forms and databases that store safety documentation',
        'Enables quick searching, analysis, and sharing of information',
        'Can include automated reminders for reviews and updates',
        'Requires technology access and backup systems',
      ],
    },
    {
      title: 'Mobile documentation apps',
      items: [
        'Smartphone or tablet applications for creating and accessing documentation',
        'Enables real-time documentation directly at the worksite',
        'Can include photo/video evidence and GPS location tagging',
        'Synchronises with central systems to ensure data consistency',
      ],
    },
  ];

  const templates = [
    {
      title: 'Risk assessment template',
      items: [
        'Hazard identification section',
        'Risk rating methodology',
        'Control measures required',
        'Residual risk evaluation',
        'Review and sign-off sections',
      ],
    },
    {
      title: 'Method statement template',
      items: [
        'Project details and scope',
        'Required resources and PPE',
        'Step-by-step procedure',
        'Safety considerations for each step',
        'Emergency procedures',
      ],
    },
    {
      title: 'Toolbox talk record template',
      items: [
        'Date, time, and location',
        'Topics discussed',
        'Attendee register with signatures',
        'Questions raised',
        'Follow-up actions required',
      ],
    },
    {
      title: 'Incident report template',
      items: [
        'Incident details (date, time, location)',
        'Persons involved',
        'Description of what happened',
        'Immediate actions taken',
        'Root cause analysis',
        'Corrective actions required',
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
            Safety documentation systems
          </h1>
          <p className="text-[14px] text-white/70 leading-relaxed max-w-2xl">
            Proper documentation creates records of safety communications, ensuring accountability
            and creating a traceable information flow.
          </p>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Types of safety documentation
          </span>
          <div className="space-y-3">
            {documentationTypes.map((type, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-1.5"
              >
                <h3 className="text-[14px] font-semibold text-white">{type.title}</h3>
                <p className="text-[14px] text-white/85 leading-relaxed">{type.description}</p>
                <p className="text-[12px] text-white/55 italic">{type.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Documentation management systems
          </span>
          <div className="space-y-3">
            {managementSystems.map((system, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
              >
                <h3 className="text-[14px] font-semibold text-white">{system.title}</h3>
                <ul className="space-y-1.5">
                  {system.items.map((item, i) => (
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

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Documentation templates
          </span>
          <p className="text-[14px] text-white/85 leading-relaxed">
            Standardised templates ensure consistent and complete documentation:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {templates.map((template, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2 h-full"
              >
                <h3 className="text-[14px] font-semibold text-white">{template.title}</h3>
                <ul className="space-y-1.5">
                  {template.items.map((item, i) => (
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

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Documentation best practices
          </span>
          <ul className="space-y-1.5">
            {[
              'Maintain consistent documentation formats across the organisation',
              'Ensure documentation is clear, concise, and using plain language',
              'Include version control to track changes to safety documents',
              'Establish a regular review schedule for all safety documentation',
              'Ensure documentation is readily accessible to all who need it',
              'Train workers on how to properly complete safety documentation',
              'Back up all safety documentation and protect confidential information',
              'Use documentation to identify trends and improve safety performance',
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

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Legal requirements
          </span>
          <p className="text-[14px] text-white/85 leading-relaxed">
            Many safety documents must be retained for specific periods to comply with
            regulations:
          </p>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
            <ul className="space-y-1.5">
              {[
                'Risk assessments: minimum 5 years or until superseded',
                'Accident reports: minimum 3 years after the date of the incident',
                'Electrical installation certificates: for the life of the installation',
                'Training records: duration of employment plus 2 years',
                'Equipment inspection records: 2 years from the inspection date',
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
            <p className="text-[12px] text-white/55 italic pt-2">
              Always verify current legal requirements for document retention in your
              jurisdiction.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Available templates
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              'Risk Assessment Template (DOCX)',
              'Method Statement Template (DOCX)',
              'Toolbox Talk Record Sheet (PDF)',
              'Incident Report Form (DOCX)',
              'Safety Meeting Minutes Template (DOCX)',
              'Safety Documentation Checklist (PDF)',
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

export default DocumentationSystems;
