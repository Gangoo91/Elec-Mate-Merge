import { Microscope, Scale, Search, HardHat, Siren, GraduationCap } from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  { moduleNumber: 1, title: 'What is asbestos?', description: 'History, fibre types, where asbestos is found, and the devastating health effects of exposure.', icon: Microscope, duration: '30 mins', link: '../asbestos-awareness-module-1' },
  { moduleNumber: 2, title: 'Legislation & the duty to manage', description: 'Control of Asbestos Regulations 2012, Regulation 4 duties, surveys and the asbestos register.', icon: Scale, duration: '30 mins', link: '../asbestos-awareness-module-2' },
  { moduleNumber: 3, title: 'Identifying asbestos-containing materials', description: 'Common ACMs in boards, insulation, coatings and electrical installations — identification and presumption.', icon: Search, duration: '30 mins', link: '../asbestos-awareness-module-3' },
  { moduleNumber: 4, title: 'Safe working practices & PPE', description: 'Work categories, risk assessment, RPE selection, decontamination and controlled work techniques.', icon: HardHat, duration: '30 mins', link: '../asbestos-awareness-module-4' },
  { moduleNumber: 5, title: 'Emergency procedures & responsibilities', description: 'Accidental disturbance response, waste disposal, health surveillance and legal duties.', icon: Siren, duration: '30 mins', link: '../asbestos-awareness-module-5' },
  { moduleNumber: 6, title: 'Mock exam', description: '200-question bank, 20 random questions per attempt, 30-minute timer, 80% pass mark.', icon: GraduationCap, duration: '30 mins', link: '../asbestos-awareness-module-6', isExam: true },
];

export default function AsbestosCourse() {
  useSEO({
    title: 'Asbestos Awareness | General Upskilling | Elec-Mate',
    description:
      'Complete asbestos awareness training covering fibre types, legislation, identification, safe working practices, emergency procedures and mock exam preparation.',
  });

  return (
    <CourseShell
      backTo="/study-centre/general-upskilling"
      backLabel="General upskilling"
      eyebrow="General upskilling"
      title="Asbestos awareness"
      description="Identifying asbestos-containing materials and safe working procedures for all tradespeople."
      tone="orange"
      level="Foundation"
      modulesCount={modules.length}
      pagesCount="200+"
      totalDuration="3h"
    >
      {modules.map((mod, index) => (
        <ModuleCard
          key={mod.moduleNumber}
          to={mod.link}
          moduleNumber={mod.moduleNumber}
          title={mod.title}
          description={mod.description}
          icon={mod.icon}
          duration={mod.duration}
          isExam={mod.isExam}
          index={index}
        />
      ))}
    </CourseShell>
  );
}
