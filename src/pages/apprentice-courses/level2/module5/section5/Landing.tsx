/**
 * Module 5 · Section 5 — Communication, conflict and well-being
 * Maps to City & Guilds 2365-02 / Unit 210 / LO3
 *   3.1 — Identify suitable communication methods for use in work situations
 *   3.2 — Define methods of effective communication for people with physical
 *         disabilities, learning difficulties and language differences
 *   3.3 — State the actions to take to deal with conflicts between customers
 *         and operatives, co-workers, and supervisors and operatives
 *   3.4 — State the effects that poor communication may have on an organisation
 *
 * Sub 5 is supplementary — extends LO3 with industry-relevant well-being and
 * neurodiversity awareness. Construction is the UK sector with the highest
 * suicide rate (ONS data). The trade-side dyslexia / ADHD / autism prevalence
 * is materially higher than the general population. The Sub equips the
 * apprentice to (a) help a peer and (b) seek help themselves — it does not
 * diagnose and it is not clinical advice.
 */

import {
  MessagesSquare,
  Accessibility,
  Handshake,
  AlertTriangle,
  HeartPulse,
} from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: '5.1',
    title: 'Suitable communication methods (3.1)',
    description:
      'Verbal, written, visual and formal — picking the right medium for the message and leaving an audit trail when it matters.',
    icon: MessagesSquare,
    href: '5-1',
  },
  {
    number: '5.2',
    title: 'Effective comms across disabilities and language (3.2)',
    description:
      'Reasonable adjustments under the Equality Act 2010 — physical disabilities, learning differences and English-as-a-second-language workers.',
    icon: Accessibility,
    href: '5-2',
  },
  {
    number: '5.3',
    title: 'Conflict resolution (3.3)',
    description:
      'Customer / co-worker / supervisor disputes — de-escalation, grievance procedures, ACAS conciliation and the apprentice triangle.',
    icon: Handshake,
    href: '5-3',
  },
  {
    number: '5.4',
    title: 'Effects of poor communication (3.4)',
    description:
      'Financial, safety, reputational and legal — what happens when the message does not land. Real costs, real cases.',
    icon: AlertTriangle,
    href: '5-4',
  },
  {
    number: '5.5',
    title: 'Mental health and neurodiversity in the trade',
    description:
      'Construction has the highest suicide rate of any UK sector. Mates in Mind, Lighthouse Club, Electrical Industries Charity — peer support, not clinical advice.',
    icon: HeartPulse,
    href: '5-5',
  },
];

export default function Section5() {
  return (
    <SectionShell
      backTo=".."
      backLabel="Module 5"
      moduleNumber={5}
      sectionNumber={5}
      title="Communication, conflict and well-being"
      description="LO3 expanded — verbal and written methods, reasonable adjustments under the Equality Act 2010, conflict resolution, the cost of poor comms, and the well-being / neurodiversity content the trade has avoided talking about for too long."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section3"
      prevSectionLabel="Communication methods (overview)"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Section 5 is the deep-dive on LO3. Sections 1 to 3 of Module 5 covered
            the people on a site, the documents you'll lean on and the headline
            communication methods. This section takes those four assessment criteria
            and treats them as the apprentice-critical content they actually are —
            because most of the disputes, complaints and incidents that follow an
            electrician through their first five years come back to one of these
            four ACs.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            <span className="text-white font-medium">Sub 5.1</span> walks through
            verbal, written, visual and formal communication — and which one to
            reach for in which situation.{' '}
            <span className="text-white font-medium">Sub 5.2</span> is the
            reasonable-adjustments Sub — Equality Act 2010, BSL interpreters,
            plain-English briefings, translated safety material.{' '}
            <span className="text-white font-medium">Sub 5.3</span> is conflict
            resolution — customer, co-worker and supervisor disputes, including
            the apprentice triangle of tutor / mentor / employer.{' '}
            <span className="text-white font-medium">Sub 5.4</span> is the cost
            of getting it wrong — financial, safety, reputational and legal.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            <span className="text-white font-medium">Sub 5.5</span> is supplementary
            content — mental health and neurodiversity in the trade. Construction
            workers in the UK have suicide rates around three times the national
            male average (ONS data). Dyslexia, ADHD and autism are materially
            more common in trade roles than the general population. The Sub
            signposts UK charity helplines and reasonable adjustments — it is
            not clinical advice and it does not diagnose. The intent is that
            you finish it equipped to help a peer and to seek help yourself.
          </p>
        </div>
      }
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
}
