import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { itemVariants, type Tone } from '@/components/college/primitives';
import { HubSubPage } from '@/components/hub/HubSubPage';
import { HubToolGrid, HubSectionHeading } from '@/components/hub/HubPrimitives';

interface Section {
  number: string;
  eyebrow: string;
  title: string;
  slug: string;
  description: string;
  meta: string;
  tone: Tone;
}

const SECTIONS: Section[] = [
  {
    number: '01',
    eyebrow: 'How it works',
    title: 'Funding models',
    slug: 'funding-models',
    description:
      'The Apprenticeship Levy, co-investment, employer-led funding — what each one is and which one applies to you.',
    meta: '8 min read',
    tone: 'yellow',
  },
  {
    number: '02',
    eyebrow: 'Top-ups',
    title: 'Grants & incentives',
    slug: 'grants',
    description:
      'CITB grants, employer incentives, and the schemes that help cover the cost of training, tools and travel.',
    meta: '7 min read',
    tone: 'yellow',
  },
  {
    number: '03',
    eyebrow: 'Employer view',
    title: 'Employer information',
    slug: 'employer-info',
    description:
      "How your employer pays for your apprenticeship — useful for spotting whether they're funding you correctly.",
    meta: '6 min read',
    tone: 'yellow',
  },
  {
    number: '04',
    eyebrow: 'Rights',
    title: 'Your rights',
    slug: 'your-rights',
    description:
      "What you should never have to pay for, what your employer must cover, and what to do if they don't.",
    meta: '5 min read',
    tone: 'red',
  },
  {
    number: '05',
    eyebrow: 'Reference',
    title: 'FAQs & glossary',
    slug: 'faqs',
    description:
      "The terms you'll hear thrown around — Levy, EPA, EPAO, ILR, Standards — explained without the jargon.",
    meta: '5 min read',
    tone: 'yellow',
  },
];

const ApprenticeshipFunding = () => {
  const navigate = useNavigate();
  return (
    <HubSubPage
      title="How your apprenticeship is paid for"
      backTo="/apprentice/toolbox"
      description="The Apprenticeship Levy, co-investment, CITB grants and government incentives — explained without the jargon. Knowing where the money comes from is how you tell whether your employer's doing it right."
    >
      <motion.div variants={itemVariants}>
        <div className="rounded-xl border border-elec-yellow/20 bg-white/[0.05] p-4 sm:p-5 space-y-3">
          <div className="flex items-baseline gap-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
              Bottom line
            </span>
          </div>
          <p className="text-[13px] text-white leading-relaxed">
            You should never pay for your training, college fees, exam fees or End Point Assessment.
            If you're being asked to, something's wrong — flag it with your training provider, ACAS,
            or the National Apprenticeship Helpline.
          </p>
          <p className="text-[12px] text-white leading-relaxed pt-1 border-t border-white/[0.06]">
            This guide covers the England system (the Levy, the £23,000 band and Skills England).
            Wales, Scotland and Northern Ireland fund apprenticeships differently — check your
            nation's scheme if you're outside England.
          </p>
        </div>
      </motion.div>

      <motion.section variants={itemVariants} className="space-y-5 sm:space-y-6">
        <HubSectionHeading>Five chapters</HubSectionHeading>
        <HubToolGrid
          label=""
          columns="two"
          cards={SECTIONS.map((s) => ({
            id: s.slug,
            eyebrow: s.eyebrow,
            title: s.title,
            description: s.description,
            meta: s.meta,
            onClick: () => navigate(`/apprentice/toolbox/apprenticeship-funding/${s.slug}`),
          }))}
        />
      </motion.section>
    </HubSubPage>
  );
};

export default ApprenticeshipFunding;
