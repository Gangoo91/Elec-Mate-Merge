/**
 * AM2 Section B — how to do each test, for the circuit you are on.
 *
 * Rewritten 5 Oct 2026. The old content was one paragraph per dial position,
 * so a lighting circuit's R₁+R₂ showed ring-final cross-connection advice, and
 * several statements were wrong:
 *   - ring step 3 was "cross-connect L1 to CPC and N to N" (GN3 2.6.6: line
 *     of one end to the cpc of the other end, and vice versa)
 *   - "spurs can mask a break in the ring" (GN3: a spur just reads higher)
 *   - "R₁+R₂ doesn't confirm polarity" (done at every point with the link at
 *     the board, it is how polarity is checked on the dead circuit)
 *   - "0.4 s for socket circuits, 5 s for fixed equipment" (411.3.2.2: 0.4 s
 *     for final circuits up to 63 A with sockets AND up to 32 A fixed)
 *   - "test the RCD button quarterly" (514.12.2 notice: six-monthly)
 *   - "Type S 130–500 ms" quoted for these RCDs (643.8 gives 300 ms for the
 *     general non-delay type these are; the S-type 130–500 ms window is in
 *     643.7.1, for TN and TT, and applies only to delay-type RCDs)
 *   - "a new circuit should read >200 MΩ" (no such figure; Table 64 is 1.0 MΩ)
 *   - mixed A3:2024 / A4:2026 references and GN3 section numbers we hadn't
 *     checked.
 *
 * Every figure below was read from the printed BS 7671:2018+A4:2026 or from
 * GN3 in the RAG. Limits are worked out for the circuit, not quoted generally.
 */

import type { AM2RigCircuit, RequiredTest } from '@/types/am2-testing-simulator';
import { irMinFor, measuredZsMax } from '@/data/am2RigCircuits';

export interface TestGuide {
  /** One or two sentences: what the reading tells you. */
  measures: string;
  /** How to do it on this circuit, in order. */
  steps: string[];
  /** What a good reading is on THIS circuit. */
  pass: string;
  /** Where it goes on the schedule of test results. */
  schedule: string;
  /** Mistakes assessors see. */
  wrong: string[];
  /** Where it comes from. */
  refs: string;
}

/** Appendix 3: a measured Zs must not exceed 0.8 × the tabulated maximum. */
export function measuredZsLimit(c: AM2RigCircuit): number {
  return measuredZsMax(c);
}

/** 411.3.2.2: 0.4 s for final circuits up to 63 A with sockets or up to 32 A
 *  fixed equipment; otherwise 5 s is permitted in TN (411.3.2.3). */
export function disconnectionTime(c: AM2RigCircuit): '0.4 s' | '5 s' {
  const sockets = c.testPoints.some((p) => p.type === 'socket');
  return (sockets && c.mcbRating <= 63) || c.mcbRating <= 32 ? '0.4 s' : '5 s';
}

const ohm = (n: number) => `${n.toFixed(2)} Ω`;

/** "Ceiling rose" → "ceiling rose" mid-sentence; acronyms (DOL, TPN) kept. */
export function inSentence(label: string): string {
  return /^[A-Z]{2}/.test(label) ? label : label.charAt(0).toLowerCase() + label.slice(1);
}

function where(c: AM2RigCircuit, t: RequiredTest): string {
  return inSentence(c.testPoints.find((p) => p.id === t.testPointId)?.label ?? 'test point');
}

function guide(c: AM2RigCircuit, t: RequiredTest): TestGuide | null {
  const ring = c.diagramLayout === 'ring';
  const threePhase = c.phaseType === '3P';
  const point = where(c, t);

  switch (`${t.dialPosition}:${t.subTest ?? ''}`) {
    // ── Ring final, step 1: end-to-end ─────────────────────────
    case 'CONTINUITY:r1':
    case 'CONTINUITY:rn':
    case 'CONTINUITY:r2': {
      const which =
        t.subTest === 'r1'
          ? { name: 'line', sym: 'r₁', col: 18 }
          : t.subTest === 'rn'
            ? { name: 'neutral', sym: 'rₙ', col: 19 }
            : { name: 'cpc', sym: 'r₂', col: 20 };
      return {
        measures: `Step 1 of the ring test: the resistance of the ${which.name} conductor all the way round the ring, end to end. It proves that conductor is a complete loop.`,
        steps: [
          'Circuit isolated and proved dead.',
          `At the board, find both ends of the ring ${which.name} and disconnect them.`,
          'Null your leads on the low-resistance ohms range.',
          `Measure between the two ends and record ${which.sym}.`,
        ],
        pass:
          t.subTest === 'r2'
            ? `With 2.5/1.5 mm² cable, r₂ is about 1.67 × r₁ because the cpc is smaller. If it isn't, the conductors are misidentified or there's a loose connection.`
            : `r₁ and rₙ should read the same: the line and neutral are the same size and length. GN3 compares each with its expected resistance (length × tabulated resistance) — higher than expected suggests a poor termination, lower a figure-of-eight.`,
        schedule: `Column ${which.col} — ring ${which.sym} (Ω)`,
        wrong: [
          'Not nulling the leads — their resistance ends up in the reading.',
          'Measuring with one end still on its terminal, so you read through the circuit, not round the ring.',
          t.subTest === 'r2'
            ? 'Expecting r₂ to equal r₁ — in 2.5/1.5 cable it is about 1.67 times higher.'
            : 'Not comparing r₁ with rₙ — if one reads clearly higher, look for a poor termination.',
        ],
        refs: 'BS 7671 Reg 643.2.1 · GN3 2.6.6',
      };
    }

    // ── Ring step 2: line and neutral cross-connected ─────────
    case 'CONTINUITY:ln':
      return {
        measures:
          'Step 2 of the ring test. With the line and neutral ends cross-connected, you read line to neutral at every socket — it proves the line and neutral form a continuous ring with no interconnections.',
        steps: [
          'After step 1 (r₁, rₙ and r₂ end to end), join the line of one end to the neutral of the other end, and the line of the other end to the neutral of the first.',
          'Null your leads on the low-resistance ohms range.',
          'Measure line to neutral at every socket on the ring.',
          'Check every reading is substantially the same, then take the cross-connections off before step 3.',
        ],
        pass: 'GN3: a correctly connected ring reads about a quarter of (r₁ + rₙ) at every socket, substantially the same each time. A socket on a spur reads higher, in proportion to the spur cable.',
        schedule:
          'Not recorded on the schedule — it proves the ring. Step 3 gives the R₁+R₂ that goes in column 21.',
        wrong: [
          'Joining line to neutral of the SAME end — the readings rise towards the middle of the ring instead of staying level.',
          'Testing one socket only — you need every socket to prove the ring.',
          'Skipping step 2 and going straight to R₁+R₂.',
        ],
        refs: 'BS 7671 Reg 643.2.1 · GN3 2.6.6',
      };

    // ── R₁+R₂ ──────────────────────────────────────────────────
    case 'CONTINUITY:r1r2':
      if (ring) {
        return {
          measures:
            'Step 3 of the ring test. With line and cpc cross-connected you read line to cpc at every socket; the highest reading is R₁+R₂ for the circuit.',
          steps: [
            'After step 1 (r₁, rₙ, r₂) and step 2 (line and neutral cross-connected), re-make the cross-connection with line and cpc.',
            'Join the line of one end to the cpc of the other end, and the line of the other end to the cpc of the first.',
            'Measure line to cpc at every socket on the ring.',
            'Record the highest reading as R₁+R₂. Remove the cross-connections and reconnect.',
          ],
          pass: `GN3: with twin and earth the cpc is smaller than the line, so the reading rises as you go round from the board to a maximum of about (r₁ + r₂) ÷ 4 at the mid-point of the ring, then falls again. The highest reading is R₁+R₂. (Where the cpc is the same size as the line, every socket reads about the same.) A socket on a spur reads higher.`,
          schedule: 'Column 21 — (R₁ + R₂) (Ω)',
          wrong: [
            'Testing one socket only. You need every socket to prove the ring and find the highest value.',
            'Recording the lowest reading. The schedule takes the highest.',
            'Leaving the cross-connections in when you energise.',
          ],
          refs: 'BS 7671 Reg 643.2.1 · GN3 2.6.6',
        };
      }
      return {
        measures:
          'The resistance of the line conductor plus the cpc out to the far end. It proves the cpc is continuous, and added to Ze it gives the Zs you expect.',
        steps: [
          'Circuit isolated and proved dead. Null your leads.',
          threePhase
            ? 'At the board, put a temporary link between one line and the cpc core of this circuit (a 4-core SWA: three lines and the cpc).'
            : 'At the board, put a temporary link between the line and the cpc of this circuit.',
          `Measure line to cpc at each point, ending at the ${point}.`,
          'Record the highest reading as R₁+R₂, then remove the link.',
        ],
        pass: `No limit on its own: Ze + R₁+R₂ has to come in under the measured Zs limit of ${ohm(measuredZsLimit(c))}. Here that means R₁+R₂ under ${ohm(Math.max(0, measuredZsLimit(c) - c.nominalValues.ze))} with Ze at ${ohm(c.nominalValues.ze)}.`,
        schedule: 'Column 21 — (R₁ + R₂) (Ω)',
        wrong: [
          'Forgetting the link at the board — the meter reads open circuit and it looks like a broken cpc.',
          'Testing only the far point. Doing it at every accessory is also your polarity check.',
          'Leaving the link in when you energise.',
        ],
        refs: 'BS 7671 Reg 643.2.1 · GN3 2.6.5 (test method 1)',
      };

    // ── Polarity (dead) ────────────────────────────────────────
    case 'CONTINUITY:polarity':
      return {
        measures:
          'That every switch, fuse and single-pole device is in the line conductor, and the wiring is connected correctly throughout.',
        steps: [
          'Circuit isolated and proved dead. Keep the line–cpc link in at the board from the R₁+R₂ test.',
          'At each switch, measure from the switch terminals to the cpc — you should get a low reading on the line side.',
          'At the light, check the switched line reaches the right terminal.',
          'On two-way switching, operate both switches and check each position.',
        ],
        pass: 'Every single-pole switch breaks the line, never the neutral. Centre-contact bayonet and Edison screw lampholders have the outer contact on the neutral (E14 and E27 lampholders to BS EN 60238 are excepted).',
        schedule: 'Column 26 — polarity (✓)',
        wrong: [
          'Checking two-way switching in one position only.',
          'Ticking polarity without testing at the switches.',
          'Assuming the board is right — check the supply polarity at the origin too.',
        ],
        refs: 'BS 7671 Reg 643.6',
      };

    // ── Insulation resistance ──────────────────────────────────
    case 'IR_500V:L-E':
    case 'IR_500V:L-L':
    case 'IR_500V:L1-L2':
    case 'IR_500V:L2-L3':
    case 'IR_500V:L3-L1': {
      const le = t.subTest === 'L-E';
      return {
        measures: le
          ? 'Insulation between the live conductors and earth, at 500 V DC.'
          : threePhase
            ? 'Insulation between each pair of live conductors (L1–L2, L2–L3, L3–L1 and each to N where there is one), at 500 V DC.'
            : 'Insulation between line and neutral, at 500 V DC.',
        steps: [
          'Circuit isolated and proved dead.',
          c.id === 3
            ? 'Remove the lamps, and operate both two-way switches so every section of the circuit is tested.'
            : c.id === 4
              ? 'Disconnect the motor at its terminals and test the cable right through to them — with the starter open you would leave the starter-to-motor cable out of the test.'
              : c.id === 5
                ? 'Disconnect the fire alarm panel — it would be damaged or affect the reading.'
                : c.id === 6
                  ? 'Unplug the cabinet equipment from the fused connection unit.'
                  : 'Disconnect anything plugged in or wired in that could affect the reading or be damaged.',
          le
            ? 'Join the live conductors together and test from them to the cpc.'
            : 'Test between the live conductors.',
          'Select 500 V, press test, read in MΩ and record it with the test voltage.',
          ...(le && (c.id === 4 || c.id === 5 || c.id === 6)
            ? [
                'Once the equipment is reconnected: test live conductors to the protective conductor at 250 V DC — at least 1 MΩ (Reg 643.3.3).',
              ]
            : []),
        ],
        pass:
          irMinFor(c) > 1
            ? `At least ${irMinFor(c).toFixed(1)} MΩ at 500 V DC. Table 64 asks for 1.0 MΩ, but Reg 643.3.2's note says fire alarm wiring has more specific requirements (BS 5839-1) — for fire alarm cables the figure is ${irMinFor(c).toFixed(1)} MΩ.`
            : 'At least 1.0 MΩ at 500 V DC (Table 64, circuits up to 500 V).',
        schedule: le
          ? 'Column 23 — test voltage (V) and column 25 — live to earth (MΩ)'
          : 'Column 23 — test voltage (V) and column 24 — live to live (MΩ)',
        wrong: [
          'Leaving equipment connected. If it can affect the reading or be damaged, test before it is connected (643.3.3).',
          c.id === 3
            ? le
              ? 'Leaving a two-way switch in one position only — the strapper it leaves open is never tested.'
              : 'Leaving lamps in — they put a load between line and neutral and the L–L reading collapses.'
            : 'Testing with the circuit still live — insulation resistance is a dead test.',
          'Not recording the test voltage. The schedule needs both columns.',
        ],
        refs: 'BS 7671 Regs 643.3.2, 643.3.3 · Table 64',
      };
    }

    // ── Earth fault loop impedance ─────────────────────────────
    case 'LOOP_ZS:':
      return {
        measures:
          'The earth fault loop impedance at the far end of the circuit. It is a live test: low enough and the device disconnects in time.',
        steps: [
          'All dead tests done and satisfactory. Energise the circuit.',
          `Connect at the ${point} — the furthest point.`,
          c.hasRcd
            ? 'This circuit has RCD protection, so use the three-wire no-trip loop test or the RCD will trip.'
            : 'Use the high-current two-wire loop test — there is no RCD on this circuit.',
          'Record the reading and compare it with the limit below.',
        ],
        pass: `Table 41.3 maximum for ${c.mcbRating} A Type ${c.mcbType}: ${ohm(c.maxZs)}. A measured reading is taken at a cooler conductor temperature, so it must be no more than 0.8 × that: ${ohm(measuredZsLimit(c))}. ${
          disconnectionTime(c) === '0.4 s'
            ? 'This circuit needs 0.4 s disconnection (Reg 411.3.2.2).'
            : 'Fixed equipment over 32 A, so 5 s is permitted (Reg 411.3.2.3) — the Type B figure is the same for both.'
        }`,
        schedule: 'Column 27 — maximum measured Zs (Ω)',
        wrong: [
          'Comparing with the table value instead of 0.8 × the table value.',
          'Using the high-current test on an RCD or RCBO circuit — it trips the device.',
          'Testing at the board rather than the furthest point.',
          'Not cross-checking: Zs should be close to Ze + R₁+R₂.',
        ],
        refs: 'BS 7671 Regs 411.3.2.2, 411.3.2.3, 643.7.3 · Table 41.3 · Appendix 3 · GN3',
      };

    // ── RCD ────────────────────────────────────────────────────
    case 'RCD_30:':
    case 'RCD_30:rcd180':
      return {
        measures:
          'How quickly the RCD disconnects when 30 mA (its rated residual current, 1 × IΔn) flows to earth.',
        steps: [
          'Circuit energised. Connect downstream of the RCD.',
          'Set 30 mA on the tester.',
          t.subTest === 'rcd180'
            ? 'Now the 180° half-cycle: switch the tester to 180° and test again.'
            : 'Test on the 0° half-cycle first, then at 180° — two tests.',
          'Record the longer of the two times.',
        ],
        pass: 'Disconnects within 300 ms at 1 × IΔn for a general non-delay RCD (Reg 643.8).',
        schedule: 'Column 28 — RCD operating time at IΔn (ms)',
        wrong: [
          'Testing one half-cycle only. Do both and record the longer.',
          'Recording a 5 × IΔn time. BS 7671 verifies the RCD with a test at its rated residual current.',
          'Connecting upstream of the RCD, so no test current goes through it.',
        ],
        refs: 'BS 7671 Reg 643.8 · GN3',
      };

    case 'RCD_30:test_button':
      return {
        measures: "The RCD's own test button trips it.",
        steps: [
          'Press the test button on the device.',
          'It should trip straight away.',
          'Switch it back on and record the result.',
        ],
        pass: 'The device trips when the button is pressed.',
        schedule: 'Column 29 — RCD test button operation (✓)',
        wrong: [
          'Skipping it because the instrument test passed — it is its own column.',
          'Leaving the RCD off afterwards.',
        ],
        refs: 'BS 7671 Reg 643.10 (the test facility of an RCD shall be verified) · 514.12.2 (where the notice is required, it tells the user to test six-monthly)',
      };

    // ── Prospective fault current ──────────────────────────────
    case 'PFC:':
      return {
        measures:
          'The fault current that would flow in a short circuit (line–neutral) or an earth fault (line–earth) at the board.',
        steps: [
          'Supply on. Connect at the board.',
          'Measure the prospective short-circuit current and the prospective earth fault current.',
          'Record the higher of the two, in kA.',
          'This rig’s supply is three-phase: GN3 — where the line–line value can’t be measured directly, take about twice the single-phase value as the three-phase figure for the certificate.',
        ],
        pass: `No higher than the breaking capacity of the devices it would have to clear — ${c.breakingCapacity} kA on this ${c.mcbRating} A device.`,
        schedule: 'Board details — prospective fault current Ipf (kA)',
        wrong: [
          'Measuring only one of the two and recording it.',
          'Not checking the kA rating on the devices against the reading.',
        ],
        refs: 'BS 7671 Regs 432.1, 643.7.3.201',
      };
  }
  return null;
}

/** The guide for one required test on one circuit. */
export function getTestGuide(c: AM2RigCircuit, t: RequiredTest): TestGuide | null {
  return guide(c, t);
}

/** One line for the task card: what a good result is. */
export function passShort(c: AM2RigCircuit, t: RequiredTest): string {
  switch (`${t.dialPosition}:${t.subTest ?? ''}`) {
    case 'CONTINUITY:r1':
    case 'CONTINUITY:rn':
      return 'r₁ and rₙ read the same';
    case 'CONTINUITY:r2':
      return 'About 1.67 × r₁ (2.5/1.5 cable)';
    case 'CONTINUITY:ln':
      return 'About (r₁ + rₙ) ÷ 4, the same at every socket';
    case 'CONTINUITY:r1r2':
      return c.diagramLayout === 'ring'
        ? 'Highest reading round the ring = R₁+R₂'
        : `Ze + R₁+R₂ under ${ohm(measuredZsLimit(c))}`;
    case 'CONTINUITY:polarity':
      return 'Switches in the line conductor';
    case 'IR_500V:L-E':
    case 'IR_500V:L-L':
    case 'IR_500V:L1-L2':
    case 'IR_500V:L2-L3':
    case 'IR_500V:L3-L1':
      return `At least ${irMinFor(c).toFixed(1)} MΩ at 500 V`;
    case 'LOOP_ZS:':
      return `Measured Zs no more than ${ohm(measuredZsLimit(c))} (0.8 × ${ohm(c.maxZs)})`;
    case 'RCD_30:':
    case 'RCD_30:rcd180':
      return 'Trips within 300 ms at 30 mA — record the longer of 0° and 180°';
    case 'RCD_30:test_button':
      return 'Device trips';
    case 'PFC:':
      return `No more than ${c.breakingCapacity} kA`;
  }
  return '';
}
