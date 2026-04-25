import {
  Swords,
  MessageCircle,
  Users,
  HardHat,
  Shield,
  GraduationCap,
} from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  {
    moduleNumber: 1,
    title: 'Understanding conflict',
    description:
      'What conflict actually is, the five conflict styles (Thomas-Kilmann), common triggers in construction, and your default response.',
    icon: Swords,
    duration: '35 mins',
    link: '../cr-module-1',
  },
  {
    moduleNumber: 2,
    title: 'Communication for difficult conversations',
    description:
      'Active listening, Nonviolent Communication (Rosenberg), the Crucial Conversations framework, and assertiveness vs aggression.',
    icon: MessageCircle,
    duration: '35 mins',
    link: '../cr-module-2',
  },
  {
    moduleNumber: 3,
    title: 'Resolving client disputes',
    description:
      'Non-paying clients, scope creep conversations, complaint handling, and managing client expectations.',
    icon: Users,
    duration: '35 mins',
    link: '../cr-module-3',
  },
  {
    moduleNumber: 4,
    title: 'Site & workplace conflicts',
    description:
      'Disputes with other trades, main contractor conflicts, the Construction Act, and team management.',
    icon: HardHat,
    duration: '35 mins',
    link: '../cr-module-4',
  },
  {
    moduleNumber: 5,
    title: 'Prevention & professional relationships',
    description:
      'Contracts and written agreements, de-escalation techniques, building relationships, and your action plan.',
    icon: Shield,
    duration: '35 mins',
    link: '../cr-module-5',
  },
  {
    moduleNumber: 6,
    title: 'Mock exam',
    description: '200-question bank, 20 random questions per attempt, 30-minute timer, 80% pass mark.',
    icon: GraduationCap,
    duration: '30 mins',
    link: '../cr-module-6',
    isExam: true,
  },
];

export default function ConflictResolutionCourse() {
  useSEO({
    title: 'Conflict Resolution & Difficult Conversations | Personal Development | Elec-Mate',
    description:
      'Conflict resolution for electricians and tradespeople — ACAS, Thomas-Kilmann, Crucial Conversations and Nonviolent Communication.',
  });

  return (
    <CourseShell
      backTo="/study-centre/personal-development"
      backLabel="Personal development"
      eyebrow="Personal development"
      title="Conflict resolution & difficult conversations"
      description="Non-paying clients, site disputes, awkward conversations and professional boundaries — based on ACAS, Thomas-Kilmann, Crucial Conversations and Nonviolent Communication."
      tone="red"
      level="Intermediate"
      modulesCount={modules.length}
      pagesCount="200+"
      totalDuration="4h"
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
