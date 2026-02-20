import React from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

/** 3-phase test matrix labels */
const conductors = ['L1', 'L2', 'L3', 'N', 'E'] as const;

/** Which cell pairs must be tested (row, col) — lower-triangle only */
const requiredTests: [number, number][] = [
  [1, 0],
  [2, 0],
  [2, 1],
  [3, 0],
  [3, 1],
  [3, 2],
  [4, 0],
  [4, 1],
  [4, 2],
  [4, 3],
];

const isRequired = (row: number, col: number) =>
  requiredTests.some(([r, c]) => r === row && c === col);

const ProveDeadTab = () => (
  <div className="space-y-4 sm:space-y-5">
    {/* Reference note */}
    <p className="text-xs text-white">
      Verified against Regulation 132.8 (three-step prove-dead), Regulation 714.537 (two-stage
      prove-dead), and the practical work intelligence database
    </p>

    {/* Prove-Test-Prove */}
    <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
      <div className="px-4 py-3.5">
        <h4 className="font-semibold text-white text-sm sm:text-base">Prove-Test-Prove Method</h4>
      </div>
      {[
        {
          num: '1',
          title: 'PROVE',
          desc: 'Prove the tester works on a known live source',
          accent: 'text-green-400',
          dot: 'bg-green-400',
        },
        {
          num: '2',
          title: 'TEST',
          desc: 'Test the circuit dead at the point of work (L-E, N-E, L-N)',
          accent: 'text-red-400',
          dot: 'bg-red-400',
        },
        {
          num: '3',
          title: 'REPROVE',
          desc: 'Reprove the tester on the same known live source',
          accent: 'text-green-400',
          dot: 'bg-green-400',
        },
      ].map((step) => (
        <div key={step.num} className="flex items-center gap-3 px-4 py-3">
          <div className={`w-2 h-2 rounded-full ${step.dot} flex-shrink-0`} />
          <div className="flex-1 min-w-0">
            <span className={`text-sm font-bold ${step.accent}`}>
              {step.num}. {step.title}
            </span>
            <p className="text-xs text-white mt-0.5">{step.desc}</p>
          </div>
        </div>
      ))}
      <div className="px-4 py-3">
        <p className="text-xs text-white">
          If the tester fails to indicate voltage at step 3, the dead test at step 2 cannot be
          trusted. Stop work, obtain a replacement tester, and repeat the entire sequence.
        </p>
      </div>
    </div>

    {/* Single-phase testing order */}
    <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
      <div className="px-4 py-3.5">
        <h4 className="font-semibold text-white text-sm sm:text-base">
          Single-Phase Testing Order
        </h4>
        <p className="text-xs text-white mt-0.5">Always test earth connections first</p>
      </div>
      {[
        { test: 'L \u2013 E', label: 'Line to Earth', dot: 'bg-purple-400' },
        { test: 'N \u2013 E', label: 'Neutral to Earth', dot: 'bg-blue-400' },
        { test: 'L \u2013 N', label: 'Line to Neutral', dot: 'bg-orange-400' },
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-3 px-4 py-3">
          <div className={`w-2 h-2 rounded-full ${item.dot} flex-shrink-0`} />
          <span className="font-mono font-bold text-white text-sm w-12 flex-shrink-0">
            {item.test}
          </span>
          <span className="text-xs text-white">{item.label}</span>
        </div>
      ))}
    </div>

    {/* 3-Phase Test Matrix */}
    <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
      <h4 className="font-semibold text-white text-sm sm:text-base mb-1">3-Phase Test Matrix</h4>
      <p className="text-xs text-white mb-3">10 tests required between all conductors</p>

      <div className="overflow-x-auto" role="table" aria-label="3-phase test matrix">
        <table className="w-full text-xs sm:text-sm border-collapse min-w-[260px]">
          <thead>
            <tr>
              <th className="p-1.5 sm:p-2 text-white font-medium text-left" />
              {conductors.map((c) => (
                <th key={c} className="p-1.5 sm:p-2 text-white font-bold text-center">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {conductors.map((rowLabel, rowIdx) => (
              <tr key={rowLabel}>
                <td className="p-1.5 sm:p-2 text-white font-bold">{rowLabel}</td>
                {conductors.map((colLabel, colIdx) => {
                  if (colIdx === rowIdx) {
                    return (
                      <td key={colLabel} className="p-1.5 sm:p-2 text-center text-white">
                        &mdash;
                      </td>
                    );
                  }
                  if (colIdx > rowIdx) {
                    return <td key={colLabel} className="p-1.5 sm:p-2" />;
                  }
                  if (isRequired(rowIdx, colIdx)) {
                    return (
                      <td key={colLabel} className="p-1.5 sm:p-2 text-center">
                        <CheckCircle2 className="h-4 w-4 text-green-400 mx-auto" />
                      </td>
                    );
                  }
                  return <td key={colLabel} className="p-1.5 sm:p-2" />;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center gap-4 mt-2 text-xs text-white">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
          Must test
        </span>
      </div>
    </div>

    {/* Voltage thresholds */}
    <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
      <div className="px-4 py-3.5">
        <h4 className="font-semibold text-white text-sm sm:text-base">Voltage Danger Thresholds</h4>
      </div>
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="w-2 h-2 rounded-full bg-orange-400 flex-shrink-0" />
        <div className="flex-1">
          <span className="text-sm font-medium text-white">Dry conditions</span>
          <p className="text-xs text-white">AC &gt;50V or DC &gt;120V = danger</p>
        </div>
      </div>
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
        <div className="flex-1">
          <span className="text-sm font-medium text-white">Wet / damp conditions</span>
          <p className="text-xs text-white">AC &gt;25V or DC &gt;60V = danger</p>
        </div>
      </div>
    </div>

    {/* Common errors */}
    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3.5 sm:p-4">
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle className="h-5 w-5 text-red-400" />
        <h4 className="font-semibold text-red-400 text-sm">Common Prove-Dead Errors</h4>
      </div>
      <ul className="space-y-1.5 text-sm text-white">
        <li>
          <strong>Back-fed supplies</strong> (Reg 514.15.1) &mdash; Solar PV, battery storage, or
          generators can feed circuits that appear isolated from the mains.
        </li>
        <li>
          <strong>Shared neutrals</strong> &mdash; A shared neutral from another circuit can create
          a parallel path, keeping conductors live.
        </li>
        <li>
          <strong>Induced voltage</strong> &mdash; Long cable runs adjacent to live circuits can
          carry induced voltage sufficient to cause harm.
        </li>
        <li>
          <strong>Capacitive charge</strong> (Reg 416.2.5) &mdash; Capacitors can hold a dangerous
          charge long after isolation. Allow discharge time and verify with a voltage indicator.
        </li>
      </ul>
    </div>
  </div>
);

export default ProveDeadTab;
