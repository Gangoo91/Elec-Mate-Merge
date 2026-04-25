import { Shield, Zap, FileCheck, BookOpen, Leaf, AlertTriangle } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Safe systems of work', icon: Shield, description: 'Permits to work, isolation, lock-out tag-out, work at height and confined spaces.' },
  { id: 2, title: 'Electrical safety', icon: Zap, description: 'Electrical dangers, safe tool use, PPE, approach distances and earthing.' },
  { id: 3, title: 'Risk assessment and method statements', icon: FileCheck, description: 'Hazard identification, evaluation, controls and dynamic assessments.' },
  { id: 4, title: 'Regulations and standards', icon: BookOpen, description: 'HSWA, Electricity at Work, BS 7671, PUWER, LOLER and industry guidance.' },
  { id: 5, title: 'Environmental and sustainability practices', icon: Leaf, description: 'Waste management, COSHH, energy efficiency and environmental legislation.' },
  { id: 6, title: 'Emergency procedures and first aid', icon: AlertTriangle, description: 'Fire safety, electrical first aid, evacuation and incident reporting.' },
];

export default function MOETModule1() {
  useSEO({
    title: 'Module 1: Health, Safety and Compliance | MOET | Elec-Mate',
    description: 'Safe systems of work, electrical safety, RAMS, regulations, environment and emergency procedures for maintenance operations.',
  });

  return (
    <ModuleShell
      backTo="../moet"
      backLabel="MOET"
      moduleNumber={1}
      title="Health, safety and compliance"
      description="Essential health and safety, risk management and regulatory compliance for maintenance operations."
      tone="orange"
      sectionsCount={sections.length}
      duration="4h"
      nextModuleHref="../m-o-e-t-module2"
      nextModuleLabel="Engineering principles and electrical theory"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../m-o-e-t-module1-section${section.id}`}
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
