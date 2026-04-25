import { Square, Shield, Zap, Star, AlertTriangle } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
    {
      number: '5.3.1',
      title: 'Emergency stop circuits',
      description: 'E-stop requirements, wiring methods and testing procedures',
      icon: Square,
      href: '/study-centre/apprentice/m-o-e-t-module5-section3-1',
    },
    {
      number: '5.3.2',
      title: 'Guarding and interlocking devices',
      description: 'Safety switches, light curtains and guard interlocking systems',
      icon: Shield,
      href: '/study-centre/apprentice/m-o-e-t-module5-section3-2',
    },
    {
      number: '5.3.3',
      title: 'Safety relays and controllers',
      description: 'Safety relay modules, monitoring relays and safety controllers',
      icon: Zap,
      href: '/study-centre/apprentice/m-o-e-t-module5-section3-3',
    },
    {
      number: '5.3.4',
      title: 'Category and performance levels (ISO 13849)',
      description: 'Safety categories, performance levels and risk assessment',
      icon: Star,
      href: '/study-centre/apprentice/m-o-e-t-module5-section3-4',
    },
    {
      number: '5.3.5',
      title: 'Functional safety principles',
      description: 'SIL levels, safety lifecycle and functional safety management',
      icon: AlertTriangle,
      href: '/study-centre/apprentice/m-o-e-t-module5-section3-5',
    },
  ];


const MOETModule5Section3 = () => {
  useSEO(
    'Section 5.3: Safety Circuits and Interlocks - MOET Module 5',
    'Emergency stops, interlocking devices, safety relays and functional safety principles'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/m-o-e-t-module5"
      backLabel="Module 5"
      moduleNumber={5}
      sectionNumber={3}
      title="Safety circuits and interlocks"
      description="Emergency stops, interlocking devices, safety relays and functional safety principles."
      tone="orange"
      subsectionsCount={subsections.length}
    >
      {subsections.map((subsection, index) => (
        <ModuleCard
          key={index}
          number={subsection.number}
          title={subsection.title}
          description={subsection.description}
          icon={subsection.icon}
          href={subsection.href}
        />
      ))}
    </SectionShell>
  );
};

export default MOETModule5Section3;
