/**
 * Safe Working Practices and Planning — the AM2S v1's first hour.
 *
 * AM2 plan, 6 Oct 2026. NET's AM2S v1 Pre-Assessment Manual (v2025.03) opens
 * the day with this section (1 hour, 10 minutes' reading): isolate the
 * assessment unit distribution board (ASSESSMENT_BOARD_ISOLATION in
 * safeIsolationScenarios), review safe working practices and do a risk
 * assessment — identify the hazards, decide who might be harmed and how,
 * evaluate the risks and decide on precautions, and where there's no risk
 * record "No action required" — then plan the composite installation.
 *
 * The bay below is OUR practice bay, not NET's. The precautions are
 * grounded in the safety guidance in the RAG (stepladder set-up and checks,
 * PPE chosen by risk assessment, housekeeping), in our own words.
 */

export type WhoKey = 'you' | 'candidates' | 'staff';

export const WHO: { key: WhoKey; label: string }[] = [
  { key: 'you', label: 'You' },
  { key: 'candidates', label: 'Other candidates' },
  { key: 'staff', label: 'Centre staff' },
];

export interface BayObservation {
  id: string;
  /** What you see in the bay. */
  seen: string;
  /** null = no risk here: record "No action required". */
  hazard: null | {
    what: string;
    /** Who must be named. */
    who: WhoKey[];
    /** Only these people — naming anyone else is wrong (where the key is
     *  unambiguous, e.g. a hazard to the person using the tool). */
    whoExact?: boolean;
    /** The right precaution first; shuffled when shown. */
    precautions: [string, string, string];
  };
  why: string;
  /** No hazard: what a learner who wrongly calls it a hazard is offered —
   *  as specific as the real precautions, so the options give nothing away. */
  distractors?: [string, string, string];
}

export const PRACTICE_BAY: BayObservation[] = [
  {
    id: 'liveBoard',
    seen: 'The assessment board in your bay is supplied and live until you isolate it.',
    hazard: {
      what: 'Electric shock',
      who: ['you', 'staff'],
      precautions: [
        'Safe isolation before any work: lock off, warning notice, prove dead on all 10 combinations',
        'Switch off the board’s outgoing MCBs and start work',
        'Ask the assessor to keep an eye on the board while you work',
      ],
    },
    why: 'Nothing in the board is safe to touch until it is isolated, locked off and proved dead — and anyone who reaches into the bay is exposed too.',
  },
  {
    id: 'floorWaste',
    seen: 'Off-cuts of cable, sheath strippings and packaging are building up on the floor of the bay.',
    hazard: {
      what: 'Slips and trips',
      who: ['you', 'candidates', 'staff'],
      precautions: [
        'Clear waste into the bin as you go and keep the walkway clear',
        'Push it under the bench out of the way',
        'Leave it until the end of the day and clear it all at once',
      ],
    },
    why: 'Waste underfoot trips you and anyone walking past the bay — the assessor included. Good housekeeping is the control, done as you go.',
  },
  {
    id: 'platform',
    seen: 'You’ll use a step-up platform to reach the high-level trunking.',
    hazard: {
      what: 'A fall from height',
      who: ['you'],
      whoExact: true,
      precautions: [
        'Check it’s undamaged and stands firm and level before each use, and don’t overreach',
        'Stand on the bench instead — it’s higher',
        'Use it as it is; it was set out by the centre',
      ],
    },
    why: 'All the feet must sit firmly on level ground and the steps must not be worn or damaged — check before you climb, and move it rather than lean.',
  },
  {
    id: 'cutting',
    seen: 'You’ll cut and drill steel trunking and conduit.',
    hazard: {
      what: 'Sharp edges and swarf — cuts and eye injuries',
      who: ['you', 'candidates'],
      precautions: [
        'Wear eye protection, deburr every cut edge and clear the swarf',
        'Work faster so the job is over sooner',
        'Wear gloves only — eyes are fine at arm’s length',
      ],
    },
    why: 'Swarf flies and cut edges are sharp. Eye protection is chosen by the risk assessment for exactly this; deburring protects you and the cables.',
  },
  {
    id: 'screwdriver',
    seen: 'The insulation on one of your screwdrivers is nicked near the tip.',
    hazard: {
      what: 'Electric shock or a short from a damaged tool',
      who: ['you'],
      whoExact: true,
      precautions: [
        'Take it out of use and replace it',
        'Wrap the nick in insulating tape',
        'Only use it on circuits you’ve isolated',
      ],
    },
    why: 'Damaged work equipment comes out of use. Tape isn’t a repair, and you can’t guarantee every circuit you meet is dead.',
  },
  {
    id: 'lifting',
    seen: 'The cable drum and the boxed accessories need moving into the bay.',
    hazard: {
      what: 'Manual handling injury — back or hands',
      who: ['you'],
      whoExact: true,
      precautions: [
        'Assess the load first, keep it close, lift with your legs, and get help or a trolley if it’s heavy',
        'Lift it quickly in one go so you’re not holding it long',
        'Roll the drum along the walkway past the other bays',
      ],
    },
    why: 'Look at the load before you lift; heavy or awkward loads need help or an aid. Rolling a drum through other bays makes a new hazard for them.',
  },
  {
    id: 'exit',
    seen: 'The fire exit beside your bay is clear and signed.',
    hazard: null,
    distractors: [
      'Prop the fire door open so the route stays clear while you work',
      'Put your tool bag across the exit so nobody walks through your bay',
      'Ask the assessor to move the exit sign so it doesn’t distract you',
    ],
    why: 'Nothing to control here — a clear, signed exit is how it should be. Record “No action required”.',
  },
  {
    id: 'induction',
    seen: 'The centre explained the first-aid point and the emergency procedure at the start of the day.',
    hazard: null,
    distractors: [
      'Ask the centre to repeat the full emergency briefing before every section',
      'Bring your own first-aid kit into the bay and keep it on the bench',
      'Write the emergency procedure out and tape it to the board you’re wiring',
    ],
    why: 'You know where to go and what to do — no action needed. Record “No action required”.',
  },
];

export interface RiskAnswer {
  /** true = you said there is a hazard here; false = "No action required". */
  hazard?: boolean;
  who: WhoKey[];
  precaution?: string;
}

/** Each observation is worth one mark when it's all right: the hazard call,
 *  everyone who might be harmed, and the right precaution. */
export function markRisk(o: BayObservation, a: RiskAnswer | undefined) {
  if (!a || a.hazard === undefined) return { right: false, why: 'Not answered.' };
  if (!o.hazard) return { right: a.hazard === false, why: o.why };
  if (a.hazard === false) return { right: false, why: o.why };
  const whoOk =
    o.hazard.who.every((w) => a.who.includes(w)) &&
    (!o.hazard.whoExact || a.who.every((w) => o.hazard!.who.includes(w)));
  const precOk = a.precaution === o.hazard.precautions[0];
  return {
    right: whoOk && precOk,
    whoOk,
    precOk,
    why: o.why,
  };
}

/** NET: during this hour you also plan the composite installation, with the
 *  Candidate Manual, the drawings, the bay and its materials, and notepaper. */
export const PLANNING_STEPS = [
  'Read the Candidate Manual and the drawings for the composite installation',
  'Walk the bay and check the materials and equipment against what the drawings need',
  'Decide the order you’ll install in, and roughly how long each part will take',
  'Fill in your timesheet as you go — start and finish times for each section, breaks included',
];
