import { Calculator, Cable, Shield, Folder, Zap } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Load estimation and diversity in practice',
    icon: Calculator,
    description: 'Calculating electrical loads and applying realistic diversity factors.',
  },
  {
    id: 2,
    title: 'Cable types, ratings and volt drop',
    icon: Cable,
    description: 'Selecting appropriate cables and calculating voltage drop.',
  },
  {
    id: 3,
    title: 'Circuit protection and RCD selection',
    icon: Shield,
    description: 'Choosing protective devices for EV charging circuits.',
  },
  {
    id: 4,
    title: 'Cable routing and containment',
    icon: Folder,
    description: 'Professional cable installation practices and containment selection.',
  },
  {
    id: 5,
    title: 'Future-proofing installations (dual EV, PV integration)',
    icon: Zap,
    description: 'Designing installations for future expansion and renewables integration.',
  },
];

export default function EVChargingModule3() {
  useSEO({
    title: 'Module 3: Electrical Design & Load Calculation | EV Charging | Elec-Mate',
    description:
      'Load estimation, diversity, cable sizing, voltage drop, RCD selection and future-proofing for EV charging.',
  });

  return (
    <ModuleShell
      backTo="../ev-charging-course"
      backLabel="EV charging installation"
      moduleNumber={3}
      title="Electrical design and load calculation"
      description="Designing electrical installations for EV charging systems."
      tone="green"
      sectionsCount={sections.length}
      duration="55 mins"
      prevModuleHref="../ev-charging-module-2"
      prevModuleLabel="EVSE types, modes and standards"
      nextModuleHref="../ev-charging-module-4"
      nextModuleLabel="Earthing and protection considerations"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../ev-charging-module-3-section-${section.id}`}
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
