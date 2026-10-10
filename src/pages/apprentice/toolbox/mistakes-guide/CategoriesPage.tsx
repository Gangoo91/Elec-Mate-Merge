import { CheckCircle2 } from 'lucide-react';
import MistakeCategoriesTab from '@/components/apprentice/learning-mistakes/MistakeCategoriesTab';
import { motion } from 'framer-motion';
import { itemVariants } from '@/components/college/primitives';
import { CollegeHeading } from '@/components/college/ui/CollegeUi';
import { GuidePage } from '@/components/apprentice/shared/GuideKit';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

const CategoriesPage = () => {
  return (
    <GuidePage
      section="Apprentice · Resilience"
      area="Learning from mistakes"
      title="Mistake Categories"
      backTo="/apprentice/toolbox/learning-from-mistakes"
    >
      <motion.div
        variants={itemVariants}
        className={cn(
          'space-y-4 -mx-4 rounded-none border-y border-white/[0.08] sm:mx-0 sm:rounded-2xl sm:border-x px-4 py-4 sm:p-5',
          CARD_SURFACE
        )}
      >
        <CollegeHeading>Common mistakes in the electrical trade</CollegeHeading>
        <p className="text-white text-sm leading-relaxed">
          Understanding the types of mistakes that commonly occur helps you recognise and avoid
          them. From technical errors to communication breakdowns, every category of mistake has
          patterns you can learn to spot early.
        </p>

        <div className="space-y-2 sm:rounded-md sm:border sm:border-white/[0.08] sm:bg-white/[0.05] sm:p-4">
          <span className="text-[13px] font-semibold text-elec-yellow">Categories Covered</span>
          <ul className="space-y-1.5">
            {[
              'Technical mistakes — wiring errors, calculation mistakes',
              'Safety mistakes — shortcuts, PPE failures, isolation errors',
              'Communication mistakes — misunderstood instructions',
              'Professional mistakes — timekeeping, attitude, appearance',
              'Study mistakes — poor preparation, wrong techniques',
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-[14px] text-white leading-relaxed"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <MistakeCategoriesTab />
    </GuidePage>
  );
};

export default CategoriesPage;
