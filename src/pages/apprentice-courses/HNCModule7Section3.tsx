import { Calculator, Sun, Target, Eye, Grid3X3, FileText } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '3.1',
    title: 'Lighting fundamentals',
    description:
      'Luminous flux, illuminance, luminance, efficacy, colour temperature and colour rendering',
    icon: Calculator,
    href: '../h-n-c-module7-section3-1',
  },
  {
    number: '3.2',
    title: 'Lumen method calculations',
    description:
      'Room index, utilisation factors, maintenance factors and average illuminance calculations',
    icon: Sun,
    href: '../h-n-c-module7-section3-2',
  },
  {
    number: '3.3',
    title: 'Point-by-point method',
    description:
      'Inverse square law, cosine corrections, point calculations and computer-aided design',
    icon: Target,
    href: '../h-n-c-module7-section3-3',
  },
  {
    number: '3.4',
    title: 'Glare assessment',
    description:
      'Unified Glare Rating, glare sources, shielding angles and compliance with UGR limits',
    icon: Eye,
    href: '../h-n-c-module7-section3-4',
  },
  {
    number: '3.5',
    title: 'Uniformity and quality',
    description:
      'Uniformity ratios, diversity, modelling, cylindrical illuminance and visual comfort',
    icon: Grid3X3,
    href: '../h-n-c-module7-section3-5',
  },
  {
    number: '3.6',
    title: 'CIBSE standards',
    description:
      'Lighting Guide requirements, workplace standards, task lighting and SLL recommendations',
    icon: FileText,
    href: '../h-n-c-module7-section3-6',
  },
];

const HNCModule7Section3 = () => {
  useSEO(
    'Lighting design calculations - HNC Module 7 Section 3 | Lighting Systems',
    'Master lighting calculations: lumen method, point-by-point, glare rating, uniformity ratios and compliance with CIBSE Lighting Guides.'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module7"
      backLabel="Module 7"
      moduleNumber={7}
      sectionNumber={3}
      title="Lighting design calculations"
      description="Perform lighting calculations to achieve compliant and high-quality lighting installations."
      tone="purple"
      subsectionsCount={subsections.length}
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

export default HNCModule7Section3;
