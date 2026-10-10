import { LEARN_CALLOUT, LEARN_CARD } from '@/components/apprentice/learn-ui/learnUi';
import { cn } from '@/lib/utils';
import CommonIssuesCard from '../../CommonIssuesCard';
import { zsIssues } from '../../commonIssues';
import { ZsLoopDiagram } from '../../diagrams/TestDiagrams';

const ZsTestingTab = () => {
  const items = [
    'Measure Ze at the origin first, with the installation isolated and the main earthing conductor disconnected',
    'Test between line and earth at the furthest point of each circuit — that is where Zs is highest',
    'Use the no-trip setting where an RCD or RCBO protects the circuit, or it will trip on the test current',
    'Compare the measured value against the maximum Zs for that device in BS 7671 Table 41.3',
    'Allow for temperature: the tabulated maxima assume the conductor at operating temperature, and you are measuring a cold circuit',
  ];

  return (
    <div className="space-y-6">
      <div className={cn(LEARN_CARD, "space-y-4")}>
        <div className="space-y-1">
          <h2 className="text-[20px] sm:text-[22px] font-semibold text-white leading-tight">
            Earth fault loop impedance (Zs) testing
          </h2>
          <p className="text-[14px] text-white leading-relaxed">
            Measures the impedance of the earth fault loop path to ensure protective devices will
            operate in fault conditions.
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

        <ZsLoopDiagram />
      </div>

      <div className={cn(LEARN_CARD, "space-y-2")}>
        <span className="text-[13px] font-semibold text-white">
          Measured or calculated
        </span>
        <p className="text-[14px] text-white leading-relaxed">
          You do not always have to measure Zs directly. Where you have measured Ze at the origin and
          R₁ + R₂ for the circuit during the continuity test, you can establish Zs by adding them —{' '}
          <span className="text-white">Zs = Ze + (R₁ + R₂)</span>. That is useful on circuits where a
          live test at the far point is impractical, and it is a sound cross-check on a value you did
          measure.
        </p>
        <p className="text-[14px] text-white leading-relaxed">
          Whichever route you take, the comparison is the same: the circuit's Zs must not exceed the
          maximum for its protective device, so the disconnection time in Chapter 41 is met.
        </p>
      </div>

      <div className={cn(LEARN_CALLOUT, "space-y-1")}>
        <span className="text-[13px] font-semibold text-elec-yellow">
          Live test
        </span>
        <p className="text-[14px] text-white leading-relaxed">
          Unlike continuity, insulation resistance and polarity, this one is carried out on a live
          installation. Treat it as live working: GS38 leads, the right PPE, and no test until the
          dead tests have passed and it is safe to energise.
        </p>
      </div>
      <CommonIssuesCard issues={zsIssues} />
    </div>
  );
};

export default ZsTestingTab;
