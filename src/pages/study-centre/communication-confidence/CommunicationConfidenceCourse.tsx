import { MessageCircle, Ear, Mic, PenLine, Handshake, GraduationCap } from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  {
    moduleNumber: 1,
    title: 'Understanding communication',
    description:
      'What communication is, verbal/nonverbal/written channels, communication styles and overcoming barriers.',
    icon: MessageCircle,
    duration: '40 mins',
    link: '../cc-module-1',
  },
  {
    moduleNumber: 2,
    title: 'Listening & understanding others',
    description:
      'The art of listening, active listening techniques, asking effective questions, listening in high-stakes situations.',
    icon: Ear,
    duration: '40 mins',
    link: '../cc-module-2',
  },
  {
    moduleNumber: 3,
    title: 'Speaking with confidence',
    description:
      'Understanding confidence, overcoming speaking anxiety, delivering toolbox talks, presentations and client conversations.',
    icon: Mic,
    duration: '40 mins',
    link: '../cc-module-3',
  },
  {
    moduleNumber: 4,
    title: 'Professional writing & digital communication',
    description:
      'Professional emails, site diaries and reports, quotes and proposals, digital communication and social media.',
    icon: PenLine,
    duration: '40 mins',
    link: '../cc-module-4',
  },
  {
    moduleNumber: 5,
    title: 'Negotiation, persuasion & difficult conversations',
    description:
      'Principled negotiation, the DESC model, influence and persuasion, handling difficult conversations.',
    icon: Handshake,
    duration: '40 mins',
    link: '../cc-module-5',
  },
  {
    moduleNumber: 6,
    title: 'Mock exam',
    description:
      '200-question bank, 20 random questions per attempt, 30-minute timer, 80% pass mark.',
    icon: GraduationCap,
    duration: '30 mins',
    link: '../cc-module-6',
    isExam: true,
  },
];

export default function CommunicationConfidenceCourse() {
  useSEO({
    title: 'Communication & confidence | Personal development | Elec-Mate',
    description:
      'Toolbox talks, client conversations, professional writing, negotiation and mock exam. Based on Toastmasters Pathways, Harvard Negotiation Project and ILM Level 2.',
  });

  return (
    <CourseShell
      backTo="/study-centre/personal-development"
      backLabel="Personal development"
      eyebrow="Personal development"
      title="Communication & confidence"
      description="Toolbox talks, client conversations, professional writing and negotiation skills for construction professionals."
      tone="purple"
      level="Foundation"
      modulesCount={modules.length}
      pagesCount="200+"
      totalDuration="5h"
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
