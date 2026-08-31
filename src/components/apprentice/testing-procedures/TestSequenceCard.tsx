import { CALLOUT_INSET, CHIP_ACCENT, PANEL } from '@/components/ui/panel-recipe';
import { cn } from '@/lib/utils';
/**
 * Where each test sits in the BS 7671 sequence.
 *
 * The page presented four tests as a flat dropdown, with nothing to say that
 * the order is prescribed rather than a matter of preference. Regulation 643.1
 * is explicit: the tests of 643.2 to 643.6 "shall be carried out in that order
 * before the installation is energized". Doing insulation resistance after
 * energising, or reaching for the loop tester before the dead tests have
 * passed, is a procedural error the old page gave no way to notice.
 *
 * 643.4 and 643.5 are listed for completeness — they apply only where SELV,
 * PELV, electrical separation or Regulation 418.1 are in play, so most jobs
 * step straight from insulation resistance to polarity.
 */

type Step = {
  reg: string;
  name: string;
  /** Which tab on this page covers it, if any. */
  covered?: boolean;
  note?: string;
};

const DEAD: Step[] = [
  { reg: '643.2', name: 'Continuity of protective conductors', covered: true },
  { reg: '643.3', name: 'Insulation resistance', covered: true },
  { reg: '643.4', name: 'Protection by SELV, PELV or electrical separation', note: 'where relevant' },
  { reg: '643.5', name: 'Resistance of floors and walls', note: 'where relevant' },
  { reg: '643.6', name: 'Polarity', covered: true },
];

const LIVE: Step[] = [{ reg: '643.7', name: 'Earth fault loop impedance', covered: true }];

const Row = ({ step, index }: { step: Step; index: number }) => (
  <li className="flex items-baseline gap-3">
    <span className="w-4 shrink-0 font-mono text-[12px] text-white/70">{index}</span>
    <span className="w-[52px] shrink-0 font-mono text-[12px] text-white/70">{step.reg}</span>
    <span className="text-[14px] leading-relaxed text-white">
      {step.name}
      {step.note && <span className="text-white/70"> — {step.note}</span>}
      {step.covered && (
        <span className={CHIP_ACCENT}>
          on this page
        </span>
      )}
    </span>
  </li>
);

const TestSequenceCard = () => (
  <div className={cn(PANEL, "space-y-4")}>
    <div className="space-y-1">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/70">
        The order is not optional
      </span>
      <p className="text-[14px] leading-relaxed text-white/85">
        Regulation 643.1 requires the tests below to be carried out in this order, and to be
        finished before the installation is energised. Each one depends on the last having passed.
      </p>
    </div>

    <div className="space-y-2">
      <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-white">Dead tests</p>
      <ul className="space-y-2">
        {DEAD.map((step, i) => (
          <Row key={step.reg} step={step} index={i + 1} />
        ))}
      </ul>
    </div>

    <div className="space-y-2 border-t border-white/[0.08] pt-4">
      <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-white">
        Then energise
      </p>
      <ul className="space-y-2">
        {LIVE.map((step, i) => (
          <Row key={step.reg} step={step} index={DEAD.length + i + 1} />
        ))}
      </ul>
      <p className="text-[13px] leading-relaxed text-white/85">
        Further live tests follow — RCD operation, phase sequence where relevant, and a functional
        check of the main switch.
      </p>
    </div>

    <div className={cn(CALLOUT_INSET, "space-y-1")}>
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow">
        If you find a fault
      </span>
      <p className="text-[14px] leading-relaxed text-white/85">
        A fault found by any test can invalidate the tests already done. Under Regulation 643.7.2,
        once you have put it right you repeat the earlier tests that the fault could have affected —
        you do not simply carry on from where you stopped.
      </p>
    </div>
  </div>
);

export default TestSequenceCard;
