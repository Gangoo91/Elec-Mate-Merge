/**
 * Section B — the visual inspection that comes before any test.
 *
 * AM2 plan, 6 Oct 2026. NET's AM2 pre-assessment manual lists "carry out a
 * visual inspection of the installation" in Section B, and Regulation 642.1
 * puts inspection before testing. The simulator went straight to the meter.
 *
 * Ten things to check on the rig, each tied to the regulation that sets the
 * requirement (wording checked against the printed BS 7671). A run plants
 * some defects at random; the learner judges each check acceptable or a
 * defect. Each check has what you see when it is right and when it isn't, so
 * the judgement is about the requirement, not spotting the word "missing".
 */
import type { SimMode } from '@/data/am2/sectionBRules';

export interface InspectionItem {
  id: string;
  /** Where on the rig. */
  where: string;
  /** What to look at, in Learn and behind "What to check". */
  check: string;
  /** What you see when it meets the requirement. */
  okSeen: string;
  /** What you see when it doesn't. */
  defectSeen: string;
  reg: string;
  /** The requirement, in plain words. */
  why: string;
}

export const INSPECTION_ITEMS: InspectionItem[] = [
  {
    id: 'chart',
    where: 'Distribution board',
    check: 'Is there a circuit chart in or next to the board?',
    okSeen:
      'Inside the board door: a typed chart listing the seven circuits, with the points each serves, its cable and its device.',
    defectSeen:
      'Inside the board door: an empty label holder. Nothing on the wall beside the board either.',
    reg: '514.9.1',
    why: 'A chart or schedule showing each circuit, its cables and its protective device must be provided in or next to the board.',
  },
  {
    id: 'labels',
    where: 'Distribution board',
    check: 'Can you tell which circuit each device protects?',
    okSeen: 'Each device in the board has a printed label — “Ring”, “Cooker”, “Lights” and so on.',
    defectSeen:
      'Five devices carry printed labels. The 6 A device and the 20 A device beside it have none.',
    reg: '514.8.1',
    why: 'Each protective device must be arranged and identified so the circuit it protects is easily recognised.',
  },
  {
    id: 'blanks',
    where: 'Distribution board',
    check: 'With the cover on, can anything live be touched?',
    okSeen: 'Two unused ways, each closed with a blanking piece. The cover is on.',
    defectSeen:
      'Two unused ways: one has a blanking piece, the other is an open slot in the cover beside the busbar.',
    reg: '416.2.1',
    why: 'Live parts must be inside enclosures or behind barriers giving at least IPXXB or IP2X — a finger can’t reach them.',
  },
  {
    id: 'topSurface',
    where: 'Adaptable box above the motor starter',
    check: 'Is the top face of the box closed?',
    okSeen:
      'Adaptable box above the starter, at shoulder height: all the knockouts on its top face are in place.',
    defectSeen:
      'Adaptable box above the starter, at shoulder height: one knockout on its top face is missing, about 20 mm across.',
    reg: '416.2.2',
    why: 'A readily accessible horizontal top surface must give at least IPXXD or IP4X — even a 1 mm wire mustn’t get in.',
  },
  {
    id: 'sleeving',
    where: 'Ring final — socket boxes',
    check: 'Is the bare cpc identified where it can be reached?',
    okSeen:
      'Socket boxes: in each one the bare cpc is in green-and-yellow sleeving up to the earth terminal.',
    defectSeen:
      'Socket 4’s box: the cpc is bare copper from the end of the sheath to the earth terminal.',
    reg: '543.3.201',
    why: 'Where the sheath is stripped back at a joint or termination, a bare cpc (up to 6 mm²) must be protected by insulating sleeving — green-and-yellow, the colour kept for protective conductors (514.4.2).',
  },
  {
    id: 'greenYellow',
    where: 'Two-way lighting — switches',
    check: 'Is green-and-yellow used only on the cpc?',
    okSeen:
      'Switches: green-and-yellow sleeving on the cpc; the strappers keep their own core colours.',
    defectSeen: 'Switch 2: one strapper has green-and-yellow sleeving on it, and so does the cpc.',
    reg: '514.4.2',
    why: 'Green-and-yellow is used only for a protective conductor and never for anything else.',
  },
  {
    id: 'joints',
    where: 'Lighting — ceiling void',
    check: 'Is every joint inside an enclosure?',
    okSeen: 'Ceiling void: the joint is in a junction box with its lid screwed on.',
    defectSeen:
      'Ceiling void: three cores twisted together and wrapped in insulating tape, lying on a joist.',
    reg: '526.5',
    why: 'Every joint and termination in a live conductor must be inside an accessory or an enclosure.',
  },
  {
    id: 'support',
    where: 'Cooker radial — cable run',
    check: 'Is the cable supported so nothing pulls on the terminals?',
    okSeen: 'Cooker cable: clipped along its run, entering the cooker switch from below.',
    defectSeen:
      'Cooker cable: the last clip is missing and about half a metre of cable hangs from the cooker switch.',
    reg: '522.8.5',
    why: 'Every cable must be supported so it isn’t under undue strain, and so its own weight doesn’t pull on the terminations.',
  },
  {
    id: 'bondingLabel',
    where: 'Main protective bonding — gas and water pipes',
    check: 'Is each bonding clamp labelled?',
    okSeen:
      'Gas and water bonding clamps: each carries a label reading “Safety Electrical Connection — Do Not Remove”.',
    defectSeen: 'Water bonding clamp: label in place. Gas bonding clamp: no label.',
    reg: '514.13.1',
    why: 'The “Safety Electrical Connection — Do Not Remove” notice must be fixed at or near every bonding connection to an extraneous-conductive-part.',
  },
  {
    id: 'fireSeal',
    where: 'Fire alarm — cable through the wall',
    check: 'Is the hole sealed where the cable passes through?',
    okSeen:
      'Fire-rated wall: the hole round the fire alarm cable is packed with fire-rated sealant.',
    defectSeen:
      'Fire-rated wall: the fire alarm cable passes through a hole about twice its diameter, with nothing round it.',
    reg: '527.2.1',
    why: 'Where a cable passes through a wall, floor or ceiling, the opening left must be sealed to the fire resistance that part of the building had.',
  },
];

export type InspectionVerdict = 'ok' | 'defect';

export interface InspectionState {
  /** The checks planted as defects this run. */
  defects: string[];
  answers: Record<string, InspectionVerdict>;
  done: boolean;
}

export const EMPTY_INSPECTION: InspectionState = { defects: [], answers: {}, done: false };

/** Defects for a run: two in Learn (to show what one looks like), two to four otherwise. */
export function seedInspection(mode: SimMode, rng: () => number = Math.random): InspectionState {
  const n = mode === 'learn' ? 2 : 2 + Math.floor(rng() * 3);
  const ids = INSPECTION_ITEMS.map((i) => i.id);
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  return { defects: ids.slice(0, n), answers: {}, done: false };
}
