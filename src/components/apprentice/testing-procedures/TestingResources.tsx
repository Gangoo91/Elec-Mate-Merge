import { LEARN_CARD } from '@/components/apprentice/learn-ui/learnUi';
import { cn } from '@/lib/utils';
/**
 * Source note for the testing procedures.
 *
 * This card used to carry two buttons — "Download full testing guide" and
 * "Print checklist PDF" — with no onClick on either. Neither guide nor PDF
 * exists, so both were decoration that looked like function. Removed rather
 * than wired: a print action would also need print styles, since every page in
 * the app is white text on a dark background and browsers drop backgrounds when
 * printing, which would send a sheet of white-on-white to the printer.
 */
const TestingResources = () => {
  return (
    <div className={cn(LEARN_CARD, "space-y-1")}>
      <span className="text-[13px] font-semibold text-white">
        Source
      </span>
      <p className="text-[14px] text-white leading-relaxed">
        These procedures follow BS 7671:2018+A4:2026 and Guidance Note 3: Inspection and Testing.
        They are here to help you understand and prepare for each test — the standards themselves
        remain the definitive guidance, and nothing here replaces training or supervision.
      </p>
    </div>
  );
};

export default TestingResources;
