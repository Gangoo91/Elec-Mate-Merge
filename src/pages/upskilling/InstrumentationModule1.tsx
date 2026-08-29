import { BookOpen, Map, Settings, FileText, ShieldAlert } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

/**
 * Section titles and descriptions must match the pages themselves — a card that
 * promises something the page does not deliver is worse than a vague one.
 *
 * 🔴 Section 4's title previously read "Key industry standards (BS EN, UKAS,
 * ISO/IEC 17025)". The rewritten page deliberately cites NO BS EN numbers,
 * because none of the ones the old page listed could be verified and at least
 * one appeared to have been withdrawn. Advertising them on the card would
 * promise a learner something the page correctly refuses to invent.
 */
const sections = [
  {
    id: 1,
    title: 'What instrumentation is, and what it is for',
    icon: BookOpen,
    description:
      'The measure–decide–act loop, the five terms that make drawings readable, and how to read an instrument tag.',
  },
  {
    id: 2,
    title: 'Where and why instrumentation is used',
    icon: Map,
    description:
      'HVAC and buildings, process industries and renewable generation — and the five reasons any instrument gets bought.',
  },
  {
    id: 3,
    title: 'Measurement, indication and control',
    icon: Settings,
    description:
      'Accuracy, precision, resolution and repeatability are four different things. Open loop versus closed loop, and what feedback buys you.',
  },
  {
    id: 4,
    title: 'Standards, traceability and why they matter',
    icon: FileText,
    description:
      'A calibration is only as good as the standard behind it. The traceability chain, uncertainty, and what a certificate should tell you.',
  },
  {
    id: 5,
    title: 'Working safely around instrumentation',
    icon: ShieldAlert,
    description:
      'Instrument work happens on running plant, often in a classified area. DSEAR, the hazardous area zones, and the hazards that have no installation equivalent.',
  },
];

export default function InstrumentationModule1() {
  useSEO({
    title: 'Module 1: Introduction to Instrumentation | Instrumentation | Elec-Mate',
    description:
      'Fundamentals of electrical instrumentation, where it is used, the difference between measurement and control, and key standards.',
  });

  return (
    <ModuleShell
      backTo="../instrumentation-course"
      backLabel="Instrumentation"
      moduleNumber={1}
      title="Introduction to electrical instrumentation"
      description="What instrumentation is, where it is used, how measurement differs from control, and why a reading is only as trustworthy as the chain behind it."
      tone="cyan"
      sectionsCount={sections.length}
      duration="3.5 hours"
      nextModuleHref="../instrumentation-module-2"
      nextModuleLabel="Sensors and transducers explained"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../instrumentation-module-1-section-${section.id}`}
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
