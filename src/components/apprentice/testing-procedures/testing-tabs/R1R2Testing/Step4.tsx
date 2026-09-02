import { PANEL_INSET } from '@/components/ui/panel-recipe';
import { cn } from '@/lib/utils';
import { RingFinalDiagram } from '../../diagrams/TestDiagrams';

/**
 * Ring final circuit continuity.
 *
 * Regulation 643.2.1 singles this out: continuity of *live* conductors has to
 * be verified by resistance measurement on ring final circuits, and on ring
 * final circuits only. The page previously mentioned rings in one line at the
 * end of step 3 — which left out the test apprentices most often get wrong.
 *
 * Values per GN3: three end-to-end readings, then two cross-connected steps
 * that should each read about a quarter of the corresponding loop.
 */
const R1R2Step4 = () => {
  const step1 = [
    'Disconnect both legs of the ring at the board and identify which end is which',
    'Measure end to end across the two line conductors — this is r₁',
    'Measure end to end across the two neutrals — this is rₙ',
    'Measure end to end across the two cpcs — this is r₂',
  ];

  const step2 = [
    'Cross-connect the line of one leg to the neutral of the other, and vice versa',
    'Measure between line and neutral at every socket on the ring',
    'Each reading should be close to (r₁ + rₙ) / 4, and they should all agree',
  ];

  const step3 = [
    'Undo the first cross-connection, then cross-connect line to cpc the same way',
    'Measure between line and cpc at every socket',
    'Each reading is that socket’s R₁ + R₂, and again they should all agree',
  ];

  const Block = ({ label, items }: { label: string; items: string[] }) => (
    <div className="space-y-1.5">
      <p className="text-[14px] font-medium text-white">{label}</p>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="text-[14px] text-white leading-relaxed flex items-start gap-2">
            <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          Step 4
        </span>
        <h3 className="text-[18px] font-semibold text-white leading-tight">
          Ring final circuits
        </h3>
        <p className="text-[14px] text-white leading-relaxed">
          A ring needs more than R₁ + R₂. Because the two legs form parallel paths, a ring wired as
          a long spur, or broken and back-fed, can still show continuity everywhere — so the live
          conductors have to be proved as well.
        </p>
      </div>

      <Block label="Step 1 — end to end" items={step1} />
      <Block label="Step 2 — line and neutral cross-connected" items={step2} />
      <Block label="Step 3 — line and cpc cross-connected" items={step3} />

      <RingFinalDiagram />

      <div className={cn(PANEL_INSET, "space-y-2")}>
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          Reading the results
        </span>
        <p className="text-[14px] text-white leading-relaxed">
          On 2.5/1.5 mm² twin and earth, expect r₁ and rₙ to be close to each other and r₂ to be
          noticeably higher — the cpc is the smaller conductor, so it has more resistance per metre.
          For the same reason the step 3 readings sit above the step 2 readings. What matters is
          that within each step the sockets agree with one another.
        </p>
        <p className="text-[14px] text-white leading-relaxed">
          One socket reading high in both steps is usually a spur — legitimate if it was designed
          in, a fault if it was not. Readings that climb steadily as you work round the ring point
          to it being wired as a radial rather than a ring. Both ends of the cpc must land on the
          earth bar at the origin.
        </p>
      </div>
    </div>
  );
};

export default R1R2Step4;
