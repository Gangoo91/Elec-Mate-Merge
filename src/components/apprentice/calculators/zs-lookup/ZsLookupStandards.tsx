const ZsLookupStandards = () => {
  return (
    <div className="space-y-6">
      {/* BS7671 Regulatory References */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          BS 7671 regulatory references
        </span>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-3">
            <div className="space-y-1">
              <span className="text-[11px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] inline-block font-mono">
                Regulation 411.4.5
              </span>
              <p className="text-[13px] text-white/85 leading-relaxed">
                <strong>Automatic disconnection requirement:</strong> Protective devices must
                disconnect supply within specified time when earth fault occurs.
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] inline-block font-mono">
                Table 41.2
              </span>
              <p className="text-[13px] text-white/85 leading-relaxed">
                <strong>Maximum disconnection times:</strong> 0.4s for final circuits ≤32A, 5s for
                distribution circuits.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <span className="text-[11px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] inline-block font-mono">
                Table 41.3
              </span>
              <p className="text-[13px] text-white/85 leading-relaxed">
                <strong>MCB / RCBO values:</strong> Maximum earth fault loop impedance for circuit
                breakers to BS EN 60898 and BS EN 61009.
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] inline-block font-mono">
                Table 41.4
              </span>
              <p className="text-[13px] text-white/85 leading-relaxed">
                <strong>Fuse values:</strong> Maximum earth fault loop impedance for general
                purpose and HRC fuses.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Disconnection Time Requirements */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Disconnection time requirements
        </span>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <h4 className="text-[14px] text-white font-medium">
              0.4 second limit (final circuits)
            </h4>
            <ul className="space-y-1.5">
              {[
                'Prevents dangerous electric shock',
                'Based on body impedance studies',
                'Critical for socket outlets, hand-held equipment',
                'Applies to circuits ≤32A serving final distribution',
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
            <h4 className="text-[14px] text-white font-medium">5 second limit (distribution)</h4>
            <ul className="space-y-1.5">
              {[
                'Prevents fire risk from sustained fault current',
                'Allows for selective discrimination',
                'Protects fixed wiring and equipment',
                'Distribution boards, sub-mains, fixed equipment',
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
          <strong>International basis:</strong> These requirements align with IEC 60364 international
          standards and extensive research into electrical safety thresholds.
        </p>
      </div>

      {/* Origin of Zs Values */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Origin of BS 7671 Zs values
        </span>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Calculation method
            </span>
            <p className="text-[13px] text-white/85 leading-relaxed font-mono">Zs = Uo / Ia</p>
            <ul className="space-y-1 text-[13px] text-white/85">
              <li>
                <strong>Uo:</strong> Nominal voltage to earth (230V)
              </li>
              <li>
                <strong>Ia:</strong> Current causing automatic operation in specified time
              </li>
            </ul>
            <p className="text-[12px] text-white/55">
              Values derived from device manufacturer test data and BS / EN standards.
            </p>
          </div>

          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Temperature considerations
            </span>
            <ul className="space-y-1 text-[13px] text-white/85">
              <li>Conductor at 70°C (normal operating temp)</li>
              <li>Ambient temperature: 20°C</li>
              <li>No derating factors applied</li>
            </ul>
            <p className="text-[12px] text-white/55">
              80% test factor accounts for temperature rise under fault conditions.
            </p>
          </div>
        </div>
      </div>

      {/* TT System Considerations */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          TT system special requirements
        </span>

        <h4 className="text-[14px] text-white font-medium">TT system RCD verification</h4>

        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
          <p className="text-[13px] text-white/85 leading-relaxed">
            <strong>Key requirement:</strong> RA × IΔn ≤ 50V
          </p>
          <div className="grid gap-2 sm:grid-cols-2 text-[13px] text-white/85">
            <div className="space-y-0.5">
              <p>
                <strong>RA:</strong> Earth electrode resistance (Ω)
              </p>
              <p>
                <strong>IΔn:</strong> RCD rated residual current (A)
              </p>
            </div>
            <div className="space-y-0.5">
              <p>
                <strong>50V:</strong> Maximum touch voltage
              </p>
              <p>
                <strong>Example:</strong> If RA = 100Ω, need IΔn ≤ 500mA
              </p>
            </div>
          </div>
        </div>

        <p className="text-[13px] text-white/85 leading-relaxed">
          <strong>Why this matters:</strong> In TT systems, fault current may be limited by earth
          electrode resistance. Standard Zs tables don't apply — RCD must operate before dangerous
          voltages develop.
        </p>
      </div>

      {/* Voltage Factors */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Voltage factor considerations
        </span>

        <h4 className="text-[14px] text-white font-medium">Standard vs actual voltages</h4>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <h5 className="text-[13px] text-white/85 font-medium">BS 7671 standard values</h5>
            <ul className="space-y-1.5">
              {[
                'Single phase: 230V nominal',
                'Three phase: 400V nominal',
                'Based on European harmonisation',
                'Tables calculated for these voltages',
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
            <h5 className="text-[13px] text-white/85 font-medium">UK supply reality</h5>
            <ul className="space-y-1.5">
              {[
                'Declared voltage: 230V ±10%',
                'Actual supply often ~240V',
                'Higher voltage = higher fault current',
                'Additional safety margin in practice',
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
          <strong>Practical impact:</strong> UK supply voltages typically provide additional safety
          margin over BS 7671 calculated values, but design should still use standard 230V figures.
        </p>
      </div>

      {/* Related Standards */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Related standards & documents
        </span>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <h5 className="text-[13px] text-white/85 font-medium">Device standards</h5>
            <ul className="space-y-1.5">
              {[
                'BS EN 60898: MCBs for household use',
                'BS EN 61009: RCBOs for household use',
                'BS 88: HRC fuses',
                'BS 1361: Cartridge fuses (domestic)',
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
            <h5 className="text-[13px] text-white/85 font-medium">Test standards</h5>
            <ul className="space-y-1.5">
              {[
                'GS 38: Test equipment safety',
                'BS 7671 Part 6: Inspection & testing',
                'IET Code of Practice: Testing procedures',
                'NICEIC / NAPIT: Industry guidance',
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

        <p className="text-[12px] text-white/55 leading-relaxed">
          <strong>Note:</strong> This tool provides guidance based on BS 7671:2018+A3:2024. Always
          refer to the latest edition of BS 7671 and relevant standards for authoritative
          requirements.
        </p>
      </div>
    </div>
  );
};

export default ZsLookupStandards;
