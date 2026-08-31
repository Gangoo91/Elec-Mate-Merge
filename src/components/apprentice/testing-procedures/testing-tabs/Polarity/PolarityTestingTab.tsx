import { CALLOUT_DANGER, PANEL } from '@/components/ui/panel-recipe';
import { cn } from '@/lib/utils';
import CommonIssuesCard from '../../CommonIssuesCard';
import { polarityIssues } from '../../commonIssues';
import { PolarityDiagram } from '../../diagrams/TestDiagrams';

const PolarityTestingTab = () => {
  const items = [
    'Verify that every fuse and single-pole control or protective device is connected in the line conductor only — Regulation 643.6(a)',
    'Check that centre contact bayonet and Edison screw lampholders have the outer or screwed contact connected to the neutral, so the shell is not live',
    'Confirm that all socket outlets have line, neutral and earth landed on the correct terminals',
    'Prove polarity with a continuity test on the dead circuit, before it is energised',
    'Pay particular attention to two-way and intermediate switching, where the common and the strappers are easily crossed',
  ];

  return (
    <div className="space-y-6">
      <div className={cn(PANEL, "space-y-4")}>
        <div className="space-y-1">
          <h2 className="text-[20px] sm:text-[22px] font-semibold text-white leading-tight">
            Polarity testing
          </h2>
          <p className="text-[14px] text-white/70 leading-relaxed">
            Verifies that all connections are correctly wired and switches/fuses are in the line
            conductor.
          </p>
        </div>

        <ul className="space-y-1.5">
          {items.map((item, i) => (
            <li
              key={i}
              className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <PolarityDiagram />
      </div>

      <div className={cn(PANEL, "space-y-1")}>
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/70">
          The lampholder exception worth knowing
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Regulation 643.6(b) requires centre contact bayonet and Edison screw lampholders to have
          the outer contact on the neutral — but it explicitly excepts{' '}
          <span className="text-white">E14 and E27 lampholders to BS EN 60238</span>. Those are the
          common small and standard screw sizes, and their construction already protects against
          contact with the shell. Knowing the exception matters: coding a modern E27 fitting as a
          fault because the shell is not on the neutral is a wrong call.
        </p>
      </div>

      <div className={cn(CALLOUT_DANGER, "space-y-1")}>
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-400">
          Safety warning
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Incorrect polarity is a serious safety issue that can result in electric shock hazards and
          incorrectly isolated circuits. Always double-check polarity tests and immediately rectify
          any issues found.
        </p>
      </div>
      <CommonIssuesCard issues={polarityIssues} />
    </div>
  );
};

export default PolarityTestingTab;
