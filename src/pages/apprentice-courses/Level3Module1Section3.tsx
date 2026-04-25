import { PowerOff, Lock, AlertTriangle, Zap, TestTube, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '3.1',
    title: 'Safe isolation procedures (tools, proving dead, test instruments)',
    description: 'Step-by-step procedures for safely isolating electrical systems and proving dead',
    icon: PowerOff,
    href: '../level3-module1-section3-1',
  },
  {
    number: '3.2',
    title: 'Lock-off and tagging methods',
    description: 'Physical isolation techniques and identification systems for electrical safety',
    icon: Lock,
    href: '../level3-module1-section3-2',
  },
  {
    number: '3.3',
    title: 'Live working restrictions and when it is permitted',
    description: 'Legal requirements and circumstances for working on live electrical systems',
    icon: AlertTriangle,
    href: '../level3-module1-section3-3',
  },
  {
    number: '3.4',
    title: 'Earthing and bonding in temporary works',
    description: 'Temporary earthing and bonding arrangements for safe electrical work',
    icon: Zap,
    href: '../level3-module1-section3-4',
  },
  {
    number: '3.5',
    title: 'Electrical test equipment safety requirements (GS38 standards)',
    description: 'Safety standards and requirements for electrical test equipment and probes',
    icon: TestTube,
    href: '../level3-module1-section3-5',
  },
  {
    number: '3.6',
    title: 'Residual current devices (RCDs) and protection systems in practice',
    description: 'Application and testing of RCD protection in workplace electrical systems',
    icon: Shield,
    href: '../level3-module1-section3-6',
  },
];

const Level3Module1Section3 = () => {
  useSEO(
    'Section 3: Electrical Safety in the Workplace - Level 3 Module 1',
    'Workplace electrical safety protocols, procedures and emergency response'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module1"
      backLabel="Module 1"
      moduleNumber={1}
      sectionNumber={3}
      title="Electrical safety in the workplace"
      description="Workplace electrical safety protocols, procedures and emergency response."
      tone="blue"
      subsectionsCount={subsections.length}
      prevSectionHref="../level3-module1-section2"
      prevSectionLabel="Risk assessment and method statements"
      nextSectionHref="../level3-module1-section4"
      nextSectionLabel="Hazard identification and control"
    >
      {subsections.map((s, i) => (
        <ModuleCard
          key={i}
          number={s.number}
          title={s.title}
          description={s.description}
          icon={s.icon}
          href={s.href}
        />
      ))}
    </SectionShell>
  );
};

export default Level3Module1Section3;
