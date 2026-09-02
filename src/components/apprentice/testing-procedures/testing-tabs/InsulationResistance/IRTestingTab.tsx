import { CALLOUT, PANEL } from '@/components/ui/panel-recipe';
import { cn } from '@/lib/utils';
import CommonIssuesCard from '../../CommonIssuesCard';
import { irIssues } from '../../commonIssues';
import { InsulationResistanceDiagram } from '../../diagrams/TestDiagrams';

const IRTestingTab = () => {
  const items = [
    'Isolate the supply and prove dead before connecting the instrument — this is a dead test at up to 1000 V DC',
    'Disconnect current-using equipment; leave the final circuits connected so the whole distribution circuit is covered',
    'Remove or disconnect anything that will be damaged by the test voltage, or will drag the reading down: SPDs, dimmers, electronic control gear, RCDs with electronic components',
    'On a TN-C-S supply, remove the neutral–earth link at the origin — leave it in and the L–E and N–E readings come back through it',
    'Test between line and neutral, line and earth, and neutral and earth',
    'Record every reading, not just a pass or fail — a falling value over successive inspections is the useful signal',
  ];

  /* Table 64, BS 7671:2018+A4:2026. */
  const table64 = [
    ['SELV and PELV', '250 V DC', '0.5 MΩ'],
    ['Up to and including 500 V (except SELV/PELV)', '500 V DC', '1.0 MΩ'],
    ['Above 500 V', '1000 V DC', '1.0 MΩ'],
  ];

  return (
    <div className="space-y-6">
      <div className={cn(PANEL, "space-y-4")}>
        <div className="space-y-1">
          <h2 className="text-[20px] sm:text-[22px] font-semibold text-white leading-tight">
            Insulation resistance (IR) testing
          </h2>
          <p className="text-[14px] text-white leading-relaxed">
            Tests the insulation resistance between live conductors and between live conductors and
            earth.
          </p>
        </div>

        <ul className="space-y-1.5">
          {items.map((item, i) => (
            <li
              key={i}
              className="text-[14px] text-white leading-relaxed flex items-start gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <InsulationResistanceDiagram />
      </div>

      <div className={cn(PANEL, "space-y-3")}>
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          Test voltages and minimum values — BS 7671 Table 64
        </span>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-white/[0.1]">
                <th className="py-1.5 pr-3 text-left font-medium text-white">Circuit</th>
                <th className="py-1.5 pr-3 text-left font-medium text-white">Test voltage</th>
                <th className="py-1.5 text-left font-medium text-white">Minimum</th>
              </tr>
            </thead>
            <tbody>
              {table64.map(([circuit, voltage, min]) => (
                <tr key={circuit} className="border-b border-white/[0.05] last:border-0">
                  <td className="py-2 pr-3 text-white">{circuit}</td>
                  <td className="py-2 pr-3 font-mono text-white">{voltage}</td>
                  <td className="py-2 font-mono text-white">{min}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[13px] text-white leading-relaxed">
          A typical 230 V final circuit is the middle row: test at 500 V DC, and it is satisfactory
          at 1.0 MΩ or above. Where equipment has to stay connected and would be damaged or would
          influence the result, Regulation 643.3.3 allows a 250 V DC test after connection, which
          must reach at least 1 MΩ — record that you used it and why.
        </p>
      </div>

      <div className={cn(CALLOUT, "space-y-1")}>
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow">
          Meeting the minimum is not the same as being healthy
        </span>
        <p className="text-[14px] text-white leading-relaxed">
          1.0 MΩ is the floor for compliance, not a target. A circuit reading a little above it is
          worth investigating rather than signing off — sound new wiring normally reads far higher,
          often beyond the range of the instrument.
        </p>
      </div>
      <CommonIssuesCard issues={irIssues} />
    </div>
  );
};

export default IRTestingTab;
