import { R1R2Diagram, WanderLeadDiagram } from '../../diagrams/TestDiagrams';

const R1R2Step2 = () => {
  /*
   * This step used to read "connect one lead to the main earth terminal,
   * connect the other to each point being tested" — that is GN3 test method 2,
   * the wander lead, and it measures the protective conductor alone (R₂). It
   * cannot produce R₁ + R₂, which is what this tab is about and what the
   * schedule of test results asks for. Method 1 is the one that links line and
   * cpc at the board; the wander lead is kept below as the alternative it is.
   */
  const items = [
    'Set the instrument to continuity and null the test leads so their resistance is out of the reading',
    'At the board, disconnect the circuit and link the line conductor to the circuit protective conductor',
    'Measure between line and cpc at each point on the circuit — socket, switch, luminaire, accessory',
    'The reading is R₁ + R₂ for that point: both conductors, out and back',
    'Record the highest reading — that is the furthest point, and the one the circuit is judged on',
    'Remove the temporary link before energising',
  ];

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/70">
          Step 2
        </span>
        <h3 className="text-[18px] font-semibold text-white leading-tight">Perform the test</h3>
      </div>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2">
            <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <R1R2Diagram />

      <div className="space-y-2">
        <p className="text-[14px] text-white/85 leading-relaxed">
          Where the line conductor cannot be linked — a protective conductor downstream of a control
          device that is open-circuit with the supply off, for instance — use the wander lead
          instead. It verifies the protective conductor, but the value it gives you is R₂ on its
          own.
        </p>
        <WanderLeadDiagram />
      </div>
    </div>
  );
};

export default R1R2Step2;
