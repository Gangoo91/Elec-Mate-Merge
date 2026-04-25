import { Shield, Cable, CheckCircle, TestTube, Users, FileText } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Safe installation: isolation and site prep',
    icon: Shield,
    description: 'Safety procedures and site preparation before installation begins.',
  },
  {
    id: 2,
    title: 'Cable termination and routing',
    icon: Cable,
    description: 'Professional cable termination and routing practices.',
  },
  {
    id: 3,
    title: 'BS 7671 Part 722 testing procedure',
    icon: CheckCircle,
    description: 'EV charging specific testing requirements and the test sequence.',
  },
  {
    id: 4,
    title: 'RCD and functional testing (Type A, B, EV-RCDs)',
    icon: TestTube,
    description: 'Testing protective devices and the EV-specific RCD types.',
  },
  {
    id: 5,
    title: 'Customer walkthrough and labelling',
    icon: Users,
    description: 'Customer handover procedures and the system labelling requirements.',
  },
  {
    id: 6,
    title: 'Certificate, test sheet and handover pack',
    icon: FileText,
    description: 'Completing documentation and packaging the customer handover.',
  },
];

export default function EVChargingModule6() {
  useSEO({
    title: 'Module 6: Installation, Inspection & Testing | EV Charging | Elec-Mate',
    description:
      'Safe installation, cable termination, BS 7671 Part 722 testing, RCD types and customer handover documentation.',
  });

  return (
    <ModuleShell
      backTo="../ev-charging-course"
      backLabel="EV charging installation"
      moduleNumber={6}
      title="Installation, inspection and testing procedures"
      description="Professional installation and testing practices for EV charging."
      tone="green"
      sectionsCount={sections.length}
      duration="60 mins"
      prevModuleHref="../ev-charging-module-5"
      prevModuleLabel="Load management and diversity in EV systems"
      nextModuleHref="../ev-charging-module-7"
      nextModuleLabel="Government incentives and certification (OZEV, etc.)"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../ev-charging-module-6-section-${section.id}`}
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
