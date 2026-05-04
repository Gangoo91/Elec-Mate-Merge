const ZsLookupGuidance = () => {
  return (
    <div className="space-y-6">
      {/* When to Use 80% vs 100% */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          When to use 80% vs 100% test values
        </span>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Use 80% test values when
            </span>
            <ul className="space-y-1.5">
              {[
                'Testing existing installations',
                'Verifying circuit protection',
                'Periodic inspection & testing',
                'Fault finding & diagnostics',
              ].map((item, i) => (
                <li
                  key={i}
                  className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Use 100% tabulated values when
            </span>
            <ul className="space-y-1.5">
              {[
                'Designing new circuits',
                'Circuit calculations',
                'Determining maximum cable length',
                'Academic / training purposes',
              ].map((item, i) => (
                <li
                  key={i}
                  className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-[13px] text-white/85 leading-relaxed">
          <strong>Why the 80% factor?</strong> Under fault conditions, conductor temperature rises
          significantly. The 80% factor accounts for increased resistance due to this temperature
          rise, ensuring protection operates correctly.
        </p>
      </div>

      {/* TN vs TT Systems */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          TN vs TT system considerations
        </span>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <h4 className="text-[14px] text-white font-medium">
              TN systems (most UK installations)
            </h4>
            <ul className="space-y-1.5">
              {[
                'Exposed metalwork connected to supply neutral',
                'Low impedance fault path',
                'Overcurrent protection can provide fault protection',
                'Use standard Zs tables from BS 7671',
              ].map((item, i) => (
                <li
                  key={i}
                  className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-[14px] text-white font-medium">TT systems (some rural areas)</h4>
            <ul className="space-y-1.5">
              {[
                'Installation earth electrode independent of supply',
                'Higher impedance fault path',
                'RCD protection required for fault protection',
                'Check: RA × IΔn ≤ 50V',
              ].map((item, i) => (
                <li
                  key={i}
                  className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-[13px] text-white/85 leading-relaxed">
          <strong>For TT systems:</strong> RCD operation verification is critical. Check that RA ×
          IΔn ≤ 50V where RA is earth electrode resistance and IΔn is RCD rated current.
        </p>
      </div>

      {/* MCB/RCBO Curve Types */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          MCB / RCBO curve types
        </span>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-[11px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] mt-0.5">
              Type B
            </span>
            <div className="flex-1">
              <p className="text-[13px] text-white font-mono">3-5 × In trip current</p>
              <p className="text-[12px] text-white/55">
                Resistive loads, lighting, heating, general domestic circuits
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-[11px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] mt-0.5">
              Type C
            </span>
            <div className="flex-1">
              <p className="text-[13px] text-white font-mono">5-10 × In trip current</p>
              <p className="text-[12px] text-white/55">
                Inductive loads, fluorescent lighting, small motors, transformers
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-[11px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] mt-0.5">
              Type D
            </span>
            <div className="flex-1">
              <p className="text-[13px] text-white font-mono">10-20 × In trip current</p>
              <p className="text-[12px] text-white/55">
                High inrush current loads, large motors, welding equipment
              </p>
            </div>
          </div>
        </div>

        <p className="text-[13px] text-white/85 leading-relaxed">
          <strong>Curve selection affects Zs:</strong> Higher curves (C, D) allow more fault current
          before tripping, requiring lower Zs values to ensure 0.4s disconnection time compliance.
        </p>
      </div>

      {/* Worked Examples */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Worked examples
        </span>

        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
          <h4 className="text-[14px] text-white font-medium mb-1">
            Example 1: Testing a socket circuit
          </h4>
          <div className="text-[13px] text-white/85 space-y-0.5 font-mono">
            <p>Protection: 32A Type B MCB</p>
            <p>Maximum Zs (100%): 1.44Ω</p>
            <p>Test limit (80%): 1.44 × 0.8 = 1.15Ω</p>
            <p>Measured Zs: 0.85Ω</p>
            <p>Result: Pass (good margin)</p>
          </div>
        </div>

        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
          <h4 className="text-[14px] text-white font-medium mb-1">Example 2: Circuit design check</h4>
          <div className="text-[13px] text-white/85 space-y-0.5 font-mono">
            <p>Protection: 16A Type C MCB</p>
            <p>Maximum Zs (100%): 1.44Ω</p>
            <p>Calculated Zs: 1.35Ω</p>
            <p>Safety margin: (1.44 - 1.35) / 1.44 = 6.3%</p>
            <p>Result: Pass but low margin</p>
          </div>
        </div>
      </div>

      {/* Common Pitfalls */}
      <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
          Common mistakes
        </span>
        <ul className="space-y-1.5">
          {[
            'Using 100% values for testing (should use 80%)',
            'Ignoring temperature effects on resistance',
            'Not accounting for parallel earth paths',
            'Forgetting to include all circuit components in Zs',
          ].map((item, i) => (
            <li
              key={i}
              className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Best practices
        </span>
        <ul className="space-y-1.5">
          {[
            'Always use 80% test values for verification testing',
            'Allow design margin for temperature / aging effects',
            'Consider voltage drop in your calculations',
            'Test at the furthest point on the circuit',
          ].map((item, i) => (
            <li
              key={i}
              className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Testing Procedures */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Testing procedures
        </span>
        <ol className="space-y-2 list-decimal list-inside text-[13px] text-white/85 leading-relaxed">
          <li>
            <strong>Safety first:</strong> Isolate circuit and prove dead
          </li>
          <li>
            <strong>Test method:</strong> Use loop impedance tester or Ze + (R1+R2) method
          </li>
          <li>
            <strong>Test points:</strong> Test at the furthest point and at each outlet
          </li>
          <li>
            <strong>Record results:</strong> Compare against 80% test values
          </li>
          <li>
            <strong>Documentation:</strong> Record on appropriate test certificate
          </li>
        </ol>

        <p className="text-[13px] text-white/85 leading-relaxed">
          <strong>Testing tip:</strong> If testing shows marginal results, consider measurement
          uncertainty and conductor temperature at time of test vs operating temperature.
        </p>
      </div>
    </div>
  );
};

export default ZsLookupGuidance;
