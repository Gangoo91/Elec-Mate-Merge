import { Shield, Zap, BookOpen, Cog, ArrowUp, FileText } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
    {
      number: '1.4.1',
      title: 'Health & safety at work act',
      description: 'Foundation health and safety legislation and duties',
      icon: Shield,
      href: '/study-centre/apprentice/m-o-e-t-module1-section4-1',
    },
    {
      number: '1.4.2',
      title: 'Electricity at work regulations',
      description: 'Legal requirements for electrical work and maintenance',
      icon: Zap,
      href: '/study-centre/apprentice/m-o-e-t-module1-section4-2',
    },
    {
      number: '1.4.3',
      title: 'BS7671 wiring regulations',
      description: 'IET Wiring Regulations for electrical installations',
      icon: BookOpen,
      href: '/study-centre/apprentice/m-o-e-t-module1-section4-3',
    },
    {
      number: '1.4.4',
      title: 'PUWER (provision & use of work equipment regulations)',
      description: 'Requirements for work equipment selection, maintenance and use',
      icon: Cog,
      href: '/study-centre/apprentice/m-o-e-t-module1-section4-4',
    },
    {
      number: '1.4.5',
      title: 'LOLER (lifting operations & lifting equipment regulations)',
      description: 'Safety requirements for lifting equipment and operations',
      icon: ArrowUp,
      href: '/study-centre/apprentice/m-o-e-t-module1-section4-5',
    },
    {
      number: '1.4.6',
      title: 'Other industry-specific guidance',
      description: 'HSG guidance, NFPA standards and site-specific rules',
      icon: FileText,
      href: '/study-centre/apprentice/m-o-e-t-module1-section4-6',
    },
  ];


const MOETModule1Section4 = () => {
  useSEO(
    'Regulations and Standards - MOET Module 1',
    'HSWA, Electricity at Work, BS7671, PUWER, LOLER and industry guidance'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/m-o-e-t-module1"
      backLabel="Module 1"
      moduleNumber={1}
      sectionNumber={4}
      title="Regulations and standards"
      description="HSWA, Electricity at Work, BS7671, PUWER, LOLER and industry guidance."
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

export default MOETModule1Section4;
