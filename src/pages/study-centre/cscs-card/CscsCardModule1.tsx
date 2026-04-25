import { BookOpen, CreditCard, ClipboardCheck, Lightbulb } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'What is CSCS?',
    icon: BookOpen,
    description:
      'The Construction Skills Certification Scheme, its purpose, who needs a card, and the different card types available.',
  },
  {
    id: 2,
    title: 'Card types & colour codes',
    icon: CreditCard,
    description:
      'Green labourer, blue skilled worker, gold advanced craft, black manager, white professionally qualified, and temporary visitor cards.',
  },
  {
    id: 3,
    title: 'The HS&E test format',
    icon: ClipboardCheck,
    description:
      'Test structure, question types, behavioural case studies, touch-screen format, 50 questions in 45 minutes, and pass marks.',
  },
  {
    id: 4,
    title: 'Booking, preparation & study tips',
    icon: Lightbulb,
    description:
      'How to book at Pearson VUE centres, what to bring on the day, effective study strategies and revision resources.',
  },
];

export default function CscsCardModule1() {
  useSEO({
    title: 'Module 1: Introduction to CSCS & the HS&E Test | CSCS Card Preparation | Elec-Mate',
    description:
      'The CSCS scheme, card types and colour codes, HS&E test format, and how to book and prepare for the test.',
  });

  return (
    <ModuleShell
      backTo="../cscs-card-course"
      backLabel="CSCS card preparation"
      moduleNumber={1}
      title="Introduction to CSCS & the HS&E test"
      description="The Construction Skills Certification Scheme, the different card types and colour codes, the HS&E test format, and how to book and prepare effectively."
      tone="green"
      sectionsCount={sections.length}
      duration="30 mins"
      nextModuleHref="../cscs-card-module-2"
      nextModuleLabel="General health & safety"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../cscs-card-module-1-section-${section.id}`}
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
