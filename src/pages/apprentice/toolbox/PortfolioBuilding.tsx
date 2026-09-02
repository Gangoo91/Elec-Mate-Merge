import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { itemVariants, type Tone } from '@/components/college/primitives';
import { HubSubPage } from '@/components/hub/HubSubPage';
import { HubToolGrid, HubSectionHeading } from '@/components/hub/HubPrimitives';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

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
    eyebrow: 'Start',
    title: 'Getting started',
    slug: 'getting-started',
    description:
      'What a portfolio actually is, what it has to prove, and the early habits that turn a paperwork chore into a real record of your work.',
    meta: '8 min read',
    tone: 'yellow',
  },
  {
    number: '02',
    eyebrow: 'Structure',
    title: 'Structure & planning',
    slug: 'structure',
    description:
      'How to lay the portfolio out, what to keep where, and the structure your assessor + EPAO actually want to see.',
    meta: '7 min read',
    tone: 'yellow',
  },
  {
    number: '03',
    eyebrow: 'Evidence',
    title: 'Evidence collection',
    slug: 'evidence',
    description:
      'Photos, sign-offs, witness testimonies, certificates and observations — what counts, what doesn’t, and how to keep it tidy.',
    meta: '9 min read',
    tone: 'yellow',
  },
  {
    number: '04',
    eyebrow: 'Reflection',
    title: 'Reflective practice',
    slug: 'reflective-practice',
    description:
      'The bit most apprentices fluff. Real reflection — what changed, what you learnt, what you’d do differently — is what turns raw evidence into proof of genuine understanding.',
    meta: '7 min read',
    tone: 'yellow',
  },
  {
    number: '05',
    eyebrow: 'Standards',
    title: 'Industry guidance',
    slug: 'industry-guidance',
    description:
      'How ST0152 KSBs map to evidence, what the major EPAOs (NET, City & Guilds, EAL) want to see, and where standards differ.',
    meta: '8 min read',
    tone: 'yellow',
  },
];

const PortfolioBuilding = () => {
  const navigate = useNavigate();
  return (
    <HubSubPage
      title="Your portfolio is your proof"
      backTo="/apprentice/toolbox"
      description="The most important record you'll build during your training. It proves your competence, maps to ST0152 KSBs, and underpins your gateway sign-off for End-Point Assessment. Start from day one — don't leave it until your final year."
    >
      <motion.div variants={itemVariants}>
        <div className={cn('rounded-2xl border border-elec-yellow/35 p-5 space-y-3', CARD_SURFACE)}>
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            Quick facts
          </span>
          <ul className="space-y-2.5">
            {[
              'Underpins your gateway sign-off / NVQ competence',
              'Maps to Knowledge, Skills & Behaviours (KSBs)',
              '6 main evidence types to collect',
              'Reviewed by your training provider to confirm gateway readiness',
              'The EPA itself is the AM2S practical assessment, not a portfolio review',
              'Start early — do not leave it until your final year',
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-[13px] text-white leading-relaxed"
              >
                <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="rounded-2xl border border-elec-yellow/25 bg-white/[0.05] p-5 space-y-3">
          <div className="flex items-baseline gap-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
              Worked example
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
              · What a strong entry looks like
            </span>
          </div>
          <p className="text-[13px] leading-relaxed text-white max-w-3xl">
            A weak entry is a photo captioned &ldquo;wired a board&rdquo;. A strong entry tells the
            assessor what you did, why, and how you know it was right:
          </p>
          <div className="rounded-xl border border-white/[0.08] bg-black/30 p-4 space-y-1.5">
            <p className="text-[12.5px] leading-relaxed text-white max-w-3xl">
              <span className="text-white">Task:</span> Installed and terminated a 6&nbsp;mm² radial
              for a 32&nbsp;A cooker circuit, board to isolator.
            </p>
            <p className="text-[12.5px] leading-relaxed text-white max-w-3xl">
              <span className="text-white">What I did:</span> Selected cable and protective device
              for the load and installation method, set the route, terminated at both ends, and
              carried out continuity and insulation-resistance testing before energising.
            </p>
            <p className="text-[12.5px] leading-relaxed text-white max-w-3xl">
              <span className="text-white">Evidence:</span> Dated photos of the termination and test
              instrument readings, plus a witness statement from the supervising electrician.
            </p>
            <p className="text-[12.5px] leading-relaxed text-white max-w-3xl">
              <span className="text-white">Reflection:</span> First termination was loose on the
              retest, so I re-made it to the correct torque — a reminder to check every connection
              before testing.
            </p>
          </div>
          <p className="text-[12.5px] leading-relaxed text-white max-w-3xl">
            <span className="text-elec-yellow font-semibold">KSB tip:</span> name the specific
            Knowledge, Skill and Behaviour codes each entry proves rather than tagging it
            &ldquo;general&rdquo;. One well-mapped task often covers several KSBs — say which, and
            track your coverage so nothing is left with zero evidence at gateway.
          </p>
          <div className="pt-1">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
              Why entries get rejected
            </span>
            <ul className="mt-2 space-y-2">
              {[
                'Evidence not mapped to a specific KSB',
                'Undated photos, or unsigned witness statements',
                'Description of the task with no reflection on what you learnt',
                'Everything piled on the easy KSBs, gaps on the rest',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[12.5px] text-white leading-relaxed"
                >
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-elec-yellow/70" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
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
            onClick: () => navigate(`/apprentice/toolbox/portfolio-building/${s.slug}`),
          }))}
        />
      </motion.section>

      <motion.div
        variants={itemVariants}
        className={cn(
          'rounded-2xl border border-elec-yellow/35 px-5 py-4 sm:px-6 sm:py-5',
          CARD_SURFACE
        )}
      >
        <p className="text-[11.5px] leading-relaxed text-white max-w-3xl">
          Based on the Level 3 Installation Electrician / Maintenance Electrician apprenticeship
          standard (ST0152 v1.2) and current EPAO requirements. Your training provider may have
          specific portfolio formats — always check their guidance alongside this guide.
        </p>
      </motion.div>
    </HubSubPage>
  );
};

export default PortfolioBuilding;
