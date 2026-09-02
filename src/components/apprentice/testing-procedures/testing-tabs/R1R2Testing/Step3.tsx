import { PANEL_INSET } from '@/components/ui/panel-recipe';
import { cn } from '@/lib/utils';
const R1R2Step3 = () => {
  /*
   * The old "maximum permissible values" panel said radial R₁ + R₂ "should be
   * less than the value that would cause excessive volt drop". That is the
   * wrong test to judge it by — volt drop is a design check on the line and
   * neutral loop, whereas R₁ + R₂ feeds Zs = Ze + (R₁ + R₂), which is compared
   * against the maximum Zs for the protective device in BS 7671 Table 41.3.
   * The ring line also used R₁+R₂ for the end-to-end values; those are lower
   * case r₁ and r₂, and the distinction is the whole point of the /4.
   */
  const items = [
    'Compare each reading against the value you calculated in step 1 from the cable length',
    'A reading well above the calculated value means a loose termination, a damaged conductor or a longer run than expected',
    'A reading near zero on every point suggests the temporary link is still in place, or the leads were not nulled',
    'Record the highest R₁ + R₂ on the schedule of test results',
  ];

  const table9a = [
    ['1.0', '18.1'],
    ['1.5', '12.1'],
    ['2.5', '7.41'],
    ['4.0', '4.61'],
    ['6.0', '3.08'],
    ['10', '1.83'],
    ['16', '1.15'],
    ['25', '0.727'],
  ];

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          Step 3
        </span>
        <h3 className="text-[18px] font-semibold text-white leading-tight">Evaluate results</h3>
      </div>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="text-[14px] text-white leading-relaxed flex items-start gap-2">
            <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className={cn(PANEL_INSET, 'space-y-2')}>
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          What the value is judged against
        </span>
        <p className="text-[14px] text-white leading-relaxed">
          R₁ + R₂ is not judged on its own. It is added to the external earth fault loop impedance
          to give the circuit's Zs — <span className="text-white">Zs = Ze + (R₁ + R₂)</span> — and
          that is what must not exceed the maximum Zs for the protective device in BS 7671 Table
          41.3.
        </p>
        <p className="text-[14px] text-white leading-relaxed">
          On a ring final circuit, measure the end-to-end resistances r₁ and r₂ first. With the ring
          cross-connected, R₁ + R₂ at every socket on the ring should be close to{' '}
          <span className="text-white">(r₁ + r₂) / 4</span>, and roughly the same at each one.
        </p>
      </div>

      <div className={cn(PANEL_INSET, 'space-y-3')}>
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          Expected values — On-Site Guide Table I1 (GN3 Table B1), copper at 20 °C
        </span>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-white/[0.1]">
                <th className="py-1.5 pr-3 text-left font-medium text-white">CSA (mm²)</th>
                <th className="py-1.5 text-left font-medium text-white">Resistance (mΩ/m)</th>
              </tr>
            </thead>
            <tbody>
              {table9a.map(([csa, r]) => (
                <tr key={csa} className="border-b border-white/[0.05] last:border-0">
                  <td className="py-1.5 pr-3 font-mono text-white">{csa}</td>
                  <td className="py-1.5 font-mono text-white">{r}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[13px] text-white leading-relaxed">
          Add the line and cpc figures together, multiply by the run length in metres, and divide by
          1,000 for ohms. A 2.5/1.5 mm² twin and earth run of 18 m gives (7.41 + 12.1) × 18 ÷ 1000 ={' '}
          <span className="text-white">0.35 Ω</span> at 20 °C. Apply the temperature correction
          factor — commonly 1.20 — when comparing against a value at operating temperature.
        </p>
      </div>
    </div>
  );
};

export default R1R2Step3;
