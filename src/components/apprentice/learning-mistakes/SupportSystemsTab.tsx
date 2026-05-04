import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { openExternalUrl } from '@/utils/open-external-url';

const SupportSystemsTab = () => {
  const supportContacts = [
    {
      title: 'Your Training Provider',
      description: 'Assessors and tutors who understand your learning journey',
      contact: 'Available during office hours',
      action: 'Contact through college portal or phone',
    },
    {
      title: 'Workplace Mentor',
      description: 'Experienced electrician assigned to guide your development',
      contact: 'Daily workplace support',
      action: 'Speak to them about any challenges',
    },
    {
      title: 'NICEIC/NAPIT Helplines',
      description: 'Technical guidance on electrical regulations and standards',
      contact: '0333 015 6626 (NICEIC) / 0345 543 0330 (NAPIT)',
      action: 'Call for technical regulation queries',
    },
    {
      title: 'Apprentice Support Networks',
      description: 'Connect with other apprentices facing similar challenges',
      contact: 'Online forums and local groups',
      action: 'Search "ElectriciansForums.net" — largest UK electrical apprentice community',
    },
  ];

  const mentalHealthResources = [
    {
      service: 'Samaritans',
      description: '24/7 emotional support for anyone in distress',
      contact: '116 123 (free from any phone)',
      website: 'samaritans.org',
    },
    {
      service: 'Lighthouse Construction Industry Charity',
      description:
        'Free wellbeing, financial, and legal support for construction workers and families',
      contact: '0345 605 1956',
      website: 'lighthouseclub.org',
    },
    {
      service: 'Mind',
      description: 'Mental health information and local support services',
      contact: '0300 123 3393',
      website: 'mind.org.uk',
    },
    {
      service: 'Apprentice Support',
      description: 'Government support for apprentice wellbeing',
      contact: '0800 015 0400',
      website: 'gov.uk/apprenticeships-guide',
    },
  ];

  const practicalSupport = [
    {
      area: 'Technical Questions',
      resources: [
        'IET Wiring Regulations forum',
        'Electrical Safety First guidance',
        'Manufacturer technical support lines',
        'eFIXX and John Ward Electrical on YouTube — UK regulation walkthroughs',
      ],
    },
    {
      area: 'Career Guidance',
      resources: [
        'JIB careers advice',
        'CITB apprentice support',
        'Local college career services',
        'LinkedIn electrical industry groups',
      ],
    },
    {
      area: 'Financial Support',
      resources: [
        'Government apprentice minimum wage info',
        'Student loan eligibility',
        'Local council support schemes',
        'Union advice services',
      ],
    },
    {
      area: 'Rights & Workplace Issues',
      resources: [
        'ACAS employment advice',
        'Unite the Union apprentice support',
        'Citizens Advice employment guidance',
        'Apprentice complaints procedure',
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Your support network
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {supportContacts.map((contact, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
            >
              <h3 className="text-[16px] font-semibold text-white">{contact.title}</h3>
              <p className="text-[14px] text-white/85 leading-relaxed">{contact.description}</p>
              <div className="space-y-1.5 pt-1">
                <div className="text-[13px] text-white/85">
                  <span className="text-white/55">Contact: </span>
                  {contact.contact}
                </div>
                <span className="inline-block text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                  {contact.action}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 sm:p-5 space-y-4">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
          Mental health & wellbeing support
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mentalHealthResources.map((resource, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
            >
              <h4 className="text-[16px] font-semibold text-white">{resource.service}</h4>
              <p className="text-[14px] text-white/85 leading-relaxed">{resource.description}</p>
              <div className="space-y-2 pt-1">
                <div className="text-[13px] text-white/85">
                  <span className="text-white/55">Phone: </span>
                  {resource.contact}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-9 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
                  onClick={() => openExternalUrl(`https://${resource.website}`)}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  {resource.website}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Practical support resources
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {practicalSupport.map((support, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
            >
              <h4 className="text-[16px] font-semibold text-white">{support.area}</h4>
              <ul className="space-y-1.5">
                {support.resources.map((resource, resourceIndex) => (
                  <li
                    key={resourceIndex}
                    className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{resource}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Remember
        </span>
        <ul className="space-y-2">
          {[
            'Asking for help is a sign of professionalism — it shows you care about doing quality work',
            "Your training provider wants you to succeed — they're invested in your development",
            'Experienced electricians remember being apprentices — most are happy to share knowledge',
            'Early intervention prevents bigger problems — speak up about concerns quickly',
            "You're not alone in this journey — thousands of apprentices face similar challenges",
          ].map((point, idx) => (
            <li
              key={idx}
              className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SupportSystemsTab;
