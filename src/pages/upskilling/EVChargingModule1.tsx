import { Zap, Building, Users, FileText, Wrench } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'EV basics and charging principles',
    icon: Zap,
    description: 'Understanding electric vehicle charging fundamentals and power flow.',
  },
  {
    id: 2,
    title: 'Domestic vs commercial installations',
    icon: Building,
    description: 'Different requirements for residential and commercial charging.',
  },
  {
    id: 3,
    title: 'Installer responsibilities and regulations',
    icon: Users,
    description: 'Professional duties and the regulatory landscape.',
  },
  {
    id: 4,
    title: 'Key standards: BS 7671, IET CoP, G98/G99',
    icon: FileText,
    description: 'Essential standards and codes of practice every installer must know.',
  },
  {
    id: 5,
    title: 'Overview of market-ready hardware',
    icon: Wrench,
    description: 'Current charging equipment, manufacturers and feature sets.',
  },
];

export default function EVChargingModule1() {
  useSEO({
    title: 'Module 1: Introduction to EV Charging Infrastructure | Elec-Mate',
    description:
      'EV charging fundamentals, domestic vs commercial, installer responsibilities, key standards and market hardware.',
  });

  return (
    <ModuleShell
      backTo="../ev-charging-course"
      backLabel="EV charging installation"
      moduleNumber={1}
      title="Introduction to EV charging infrastructure"
      description="The fundamentals of electric vehicle charging systems and the installer's responsibilities."
      tone="green"
      sectionsCount={sections.length}
      duration="40 mins"
      nextModuleHref="../ev-charging-module-2"
      nextModuleLabel="EVSE types, modes and standards"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../ev-charging-module-1-section-${section.id}`}
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
