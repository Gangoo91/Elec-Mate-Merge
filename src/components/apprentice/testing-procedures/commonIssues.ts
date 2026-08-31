import type { Issue } from './CommonIssuesCard';

/**
 * Test-specific troubleshooting. Each entry is a symptom someone actually sees
 * on the instrument, paired with what causes it — not generic advice about
 * checking connections.
 */

export const r1r2Issues: Issue[] = [
  {
    title: 'Reading much higher than you calculated',
    description: 'The measured value is well above the figure worked out from the cable length.',
    solution:
      'A loose termination is the usual cause — check the ends before anything else. Then consider whether the run is longer than you assumed, whether there is a joint in it, and whether the cpc is a smaller size than you allowed for. Confirm the leads were nulled: unnulled leads add a consistent offset to every reading.',
  },
  {
    title: 'Near zero at every point on the circuit',
    description: 'Each point reads a few milliohms, barely more than the leads.',
    solution:
      'You are almost certainly reading across the temporary link rather than through the circuit — check you are on the right conductors at the far end, not still at the board. If the link is genuinely correct and the values are still identical everywhere, the circuit is shorter than you think or the points are all fed from the same position.',
  },
  {
    title: 'Reading will not settle',
    description: 'The value drifts or jumps while the probes are held on.',
    solution:
      'Poor probe contact is the common cause — a painted terminal, a corroded screw, or a probe resting on insulation rather than metal. Press onto clean metal and hold steady. A reading that changes when you wiggle the cable points at a termination that is barely making contact.',
  },
  {
    title: 'Open circuit',
    description: 'The instrument shows overrange or no continuity at all.',
    solution:
      'Either the conductor is broken, or you are not testing the circuit you linked at the board. Prove the link and the identification first — testing a different circuit to the one you linked gives exactly this result.',
  },
];

export const irIssues: Issue[] = [
  {
    title: 'Low L–E or N–E reading across the whole board',
    description: 'Every circuit reads low to earth rather than one specific circuit.',
    solution:
      'Something is still connected. On a TN-C-S supply the neutral–earth link is the usual culprit — with it in place the reading comes back through it. Otherwise look for a load left connected, an SPD, or electronic control gear. A fault in one circuit shows on that circuit, not on all of them.',
  },
  {
    title: 'Reading climbs slowly instead of settling',
    description: 'The value rises steadily for several seconds before stabilising.',
    solution:
      'Normal on a long run — the cable behaves as a capacitor and takes time to charge. Let it settle and record the stable value, not the first number shown. Do not mistake the rising value for a failing circuit.',
  },
  {
    title: 'One circuit reads very low or zero',
    description: 'A single circuit fails while everything else is healthy.',
    solution:
      'This is a genuine insulation fault. Damaged insulation from a fixing driven through a cable, moisture in an outdoor or buried enclosure, or a conductor pinched under a terminal screw. Split the circuit and retest each section to narrow down where.',
  },
  {
    title: 'The instrument will not reach the test voltage',
    description: 'It cannot maintain 500 V and reports a low or unstable value.',
    solution:
      'The circuit is loading the instrument, which means something is still connected across it. Disconnect equipment and retest. Where equipment genuinely has to stay connected, use the 250 V DC test allowed by Regulation 643.3.3 and record why.',
  },
];

export const zsIssues: Issue[] = [
  {
    title: 'Measured Zs is higher than the maximum for the device',
    description: 'The value exceeds the figure in Table 41.3 for that protective device.',
    solution:
      'Work out which half is responsible: measure Ze at the origin and compare. A high Ze is a supply problem for the DNO. A high R₁ + R₂ is yours — a long circuit, an undersized cpc, or a poor connection somewhere in the earth path.',
  },
  {
    title: 'The RCD trips as soon as you test',
    description: 'The protective device operates during the measurement.',
    solution:
      'Use the no-trip setting on the instrument. It applies a much smaller test current so the RCD stays in. If it still trips on the no-trip range, the RCD may be faulty or unusually sensitive.',
  },
  {
    title: 'Measured Zs is lower than Ze',
    description: 'The circuit reads a lower impedance than the supply feeding it.',
    solution:
      'Not physically possible for that circuit alone, so there is a parallel earth path — usually the bonding, a metallic water or gas pipe, or another circuit cpc making contact. The reading is real but it is not the circuit you think you are measuring.',
  },
  {
    title: 'The value differs each time you test',
    description: 'Repeat measurements at the same point disagree by more than a little.',
    solution:
      'Check probe contact first. Beyond that, a loose connection in the earth path will give a value that changes as the joint moves, and that is worth finding — it is exactly the kind of fault this test exists to catch.',
  },
];

export const polarityIssues: Issue[] = [
  {
    title: 'The accessory stays live with the switch off',
    description: 'Switching does not remove the voltage from the point it controls.',
    solution:
      'The switch is in the neutral rather than the line. It will appear to work — the load turns off — but the accessory stays live, which is precisely the hazard this test exists to find. Correct it at the switch and retest.',
  },
  {
    title: 'A socket tester shows a fault but the terminals look right',
    description: 'The accessory is wired correctly yet the tester still indicates a problem.',
    solution:
      'The fault is upstream. Work back to the board — a crossed line and neutral at an earlier point on the circuit, or at the board itself, shows up at every point downstream of it. A borrowed neutral from another circuit gives the same picture.',
  },
  {
    title: 'Two-way switching behaves unpredictably',
    description: 'The lamp responds from one position but not the other, or only in combination.',
    solution:
      'The strappers and the common are crossed at one of the switches. Identify the common conductor positively at both ends rather than by colour alone — two-way wiring is the place where colour convention is least reliable.',
  },
  {
    title: 'The lampholder shell is live',
    description: 'The screw shell of an ES lampholder shows voltage to earth.',
    solution:
      'Line and neutral are reversed at the lampholder. Line belongs on the centre contact so the shell is not live when a lamp is being changed. Reverse the connections and confirm before energising.',
  },
];
