import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';

/**
 * MentalHealthPageLayout — shared editorial wrapper for /apprentice/mental-health
 * subpages. Drops the iconified, colour-coded hero in favour of the same
 * PageHero pattern used across the apprentice hub. Subpages keep passing
 * `title` + `description`; the `icon` and `color` props are accepted for
 * backwards-compat but ignored — editorial design is colour-restrained.
 */
interface MentalHealthPageLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  /** Backwards-compat — ignored under the editorial design. */
  icon?: ReactNode;
  /** Backwards-compat — ignored. All hero accents are elec-yellow now. */
  color?: string;
}

export default function MentalHealthPageLayout({
  title,
  description,
  children,
}: MentalHealthPageLayoutProps) {
  const navigate = useNavigate();

  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <Button
          variant="ghost"
          onClick={() => navigate('/apprentice/mental-health')}
          className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Wellbeing"
          title={title}
          description={description}
          tone="yellow"
        />
      </motion.div>

      {/* Quiet aside — replaces the loud "Take what helps" sidebar */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] px-5 py-4 sm:px-6 sm:py-5"
      >
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
            Note
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            · Take what helps
          </span>
        </div>
        <p className="text-[13px] leading-relaxed text-white/70 max-w-3xl">
          This space is designed to feel calmer, clearer and easier to use when you need it. Leave
          what doesn't fit — come back to it when it does.
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>{children}</motion.div>
    </PageFrame>
  );
}
