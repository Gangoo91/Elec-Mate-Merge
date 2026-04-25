import { Mail, ClipboardList, FileText, Smartphone } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Professional email essentials',
    icon: Mail,
    description:
      'Email structure, tone and formality, reply-all etiquette, the 24-hour rule, construction examples.',
  },
  {
    id: 2,
    title: 'Site diaries & technical reports',
    icon: ClipboardList,
    description:
      'JCT site diary requirements, NEC record-keeping, EICR/EIC report writing, factual vs opinion writing.',
  },
  {
    id: 3,
    title: 'Quotes, proposals & written agreements',
    icon: FileText,
    description:
      'Quote structure, professional language, avoiding ambiguity, domestic and commercial examples.',
  },
  {
    id: 4,
    title: 'Digital communication & social media',
    icon: Smartphone,
    description:
      'WhatsApp etiquette, negativity bias in text, phone vs text vs email, GDPR basics for tradespeople.',
  },
];

export default function CCModule4() {
  useSEO({
    title:
      'Module 4: Professional writing & digital communication | Communication & confidence | Elec-Mate',
    description:
      'Professional emails, site diaries and reports, quotes and proposals, digital communication and social media for construction professionals.',
  });

  return (
    <ModuleShell
      backTo="../communication-confidence"
      backLabel="Communication & confidence"
      moduleNumber={4}
      title="Professional writing & digital communication"
      description="Professional emails, site diaries and reports, quotes and proposals, and digital communication for construction professionals."
      tone="purple"
      sectionsCount={sections.length}
      duration="40 mins"
      prevModuleHref="../cc-module-3"
      prevModuleLabel="Speaking with confidence"
      nextModuleHref="../cc-module-5"
      nextModuleLabel="Negotiation, persuasion & difficult conversations"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../cc-module-4-section-${section.id}`}
          sectionNumber={section.id}
          title={section.title}
          description={section.description}
          icon={section.icon}
          index={index}
        />
      ))}
    </ModuleShell>
  );
}
