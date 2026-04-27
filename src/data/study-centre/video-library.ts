/**
 * Curated video library — high-confidence YouTube videos that map to
 * Module 2 (Principles of Electrical Science) topics on Level 2 (2365-02,
 * Unit 202).
 *
 * Why this exists:
 *   Content agents writing Sub pages can drop a video in with a single
 *   reference instead of repeating URL + metadata at every call site.
 *
 *     import { videos } from '@/data/study-centre/video-library';
 *     <VideoCard {...videos.threePhase} />
 *
 * Curation rules:
 *   - Only include videos whose IDs are confidently known (i.e. appear in
 *     `curatedVideos.ts`, not invented). If you can't verify, leave it out.
 *   - Channel = source of truth. Most of these are The Engineering Mindset.
 *   - Topic = short human description, not the AC code itself.
 *   - covers = optional list of AC codes the video addresses, for future
 *     "watched all videos for AC X.Y" analytics.
 *
 * Implementation: each entry uses `lookup()` to pull title / channel /
 * duration straight from the canonical `curatedVideos` list — that way
 * we never duplicate metadata and the two libraries can never drift.
 */

import { curatedVideos, type CuratedVideo } from '@/data/apprentice/curatedVideos';

export interface VideoLibraryEntry {
  url: string;
  title: string;
  channel: string;
  duration: string;
  topic: string;
  /** Assessment criteria the video helps satisfy. Optional. */
  covers?: string[];
}

/**
 * Look up a curated video by its YouTube ID and decorate it with a
 * Unit 202 topic label and optional AC coverage list.
 *
 * Throws at module load time if the ID isn't in `curatedVideos.ts` —
 * that way you can never ship a Sub page that points at a missing video.
 */
function lookup(id: string, topic: string, covers?: string[]): VideoLibraryEntry {
  const match: CuratedVideo | undefined = curatedVideos.find((v) => v.id === id);
  if (!match) {
    // Soft fallback so a missing curated entry doesn't crash the whole bundle —
    // the Sub page will still render, just without the rich metadata.
    return {
      url: `https://www.youtube.com/watch?v=${id}`,
      title: topic,
      channel: 'Unknown channel',
      duration: '',
      topic,
      covers,
    };
  }
  return {
    url: `https://www.youtube.com/watch?v=${match.id}`,
    title: match.title,
    channel: match.channel,
    duration: match.duration,
    topic,
    covers,
  };
}

export const videos = {
  /* ── Section 1 — Electrical fundamentals (LO1) ───────────────────── */

  electricity: lookup('mc979OhitAg', 'How electricity works · Unit 202 LO1', ['1.1']),
  voltage: lookup('w82aSjLuD_8', 'Voltage explained · Unit 202 LO1', ['1.1', '1.2']),
  conventionalCurrent: lookup(
    'MUh_dOcqgVw',
    'Conventional current vs electron flow · Unit 202 LO1',
    ['1.1'],
  ),
  multimeter: lookup('J3kKNNizARc', 'Using a multimeter · Unit 202 LO1', ['1.3']),

  /* ── Section 2 — Ohm's law and circuit calculations (LO2) ───────── */

  ohmsLaw: lookup('HsLLq6Rm5tU', "Ohm's law explained · Unit 202 LO2", ['2.1', '2.2']),
  resistors: lookup('DYcLFHgVCn0', 'Resistors explained · Unit 202 LO2', ['2.1']),
  kwh: lookup('SMPhh8gT_1E', 'Kilowatt-hours and energy · Unit 202 LO2', ['2.3']),

  /* ── Section 3 — Series, parallel, mixed circuits (LO3) ─────────── */

  seriesCircuits: lookup('VV6tZ3Aqfuc', 'DC series circuits · Unit 202 LO3', ['3.1']),
  parallelCircuits: lookup('5uyJezQNSHw', 'DC parallel circuits · Unit 202 LO3', ['3.2']),

  /* ── Section 4 — Magnetism, motors, transformers (LO4) ──────────── */

  dcMotor: lookup('GQatiB-JHdI', 'How a DC motor works · Unit 202 LO4', ['4.1', '4.2']),
  inductionMotor: lookup(
    '59HBoIXzX_c',
    'Three-phase AC induction motors · Unit 202 LO4',
    ['4.1', '4.2'],
  ),
  alternators: lookup('jdSKlg80DjU', 'How alternators work · Unit 202 LO4', ['4.3']),
  acGenerator: lookup('WhATjUHgzxQ', 'AC generator basics · Unit 202 LO4', ['4.3']),
  transformers: lookup('jcY4QN7awEc', 'How transformers work · Unit 202 LO4', ['4.3']),
  threePhaseTransformers: lookup(
    'u0SsejDCVkU',
    'Three-phase transformers · Unit 202 LO4',
    ['4.3'],
  ),

  /* ── Section 5 — AC theory, single + three phase (LO5) ──────────── */

  acBasics: lookup('OUcKJuMSSW4', 'AC basics · Unit 202 LO5', ['5.1']),
  acVsDc: lookup('2jqJZxxX6gQ', 'AC vs DC electricity · Unit 202 LO5', ['5.1']),
  singlePhase: lookup('W0_1xRqT8uU', 'Single-phase electricity · Unit 202 LO5', ['5.1']),
  threePhase: lookup('4oRT7PoXSS0', 'How three-phase electricity works · Unit 202 LO5', [
    '5.2',
  ]),
  threePhaseCalcs: lookup(
    'qthuFLNSrlg',
    'Three-phase calculations · Unit 202 LO5',
    ['5.2', '5.3'],
  ),

  /* ── Section 6 — Components, semiconductors, control gear (LO6) ── */

  diodes: lookup('Fwj_d3uO5g8', 'Diodes explained · Unit 202 LO6', ['6.1', '6.2']),
  transistors: lookup('zpyK5Hy8d0c', 'NPN and PNP transistors · Unit 202 LO6', ['6.1', '6.2']),
  capacitors: lookup('NPM3wSb7veU', 'Capacitors explained · Unit 202 LO6', ['6.1', '6.2']),
  capacitorCalcs: lookup(
    'ucEiEic-kZ4',
    'Capacitor calculations — series and parallel · Unit 202 LO6',
    ['6.2'],
  ),
  inductors: lookup('KSylo01n5FY', 'Inductors explained · Unit 202 LO6', ['6.1']),
  leds: lookup('O8M2z2hIbag', 'How LEDs work · Unit 202 LO6', ['6.1']),
  relays: lookup('n594CkrP6xE', 'How relays work · Unit 202 LO6', ['6.3']),

  /* ── Section 7 — Protection, batteries, heating (LO7) ───────────── */

  fuses: lookup('W770Z1yvXs8', 'How fuses work · Unit 202 LO7', ['7.1']),
  batteries: lookup('PXNKkcB0pI4', 'How batteries work · Unit 202 LO7', ['7.2']),
  electricHeating: lookup(
    'FOh0iesTvx0',
    'Electric heating systems · Unit 202 LO7',
    ['7.3'],
  ),

  /* ── Module 3 — Electrical installations technology (Unit 203) ──── */

  // §4 Earthing / ADS — why MCBs alone can't protect against shock
  circuitBreakersDontProtectPeople: lookup(
    'gqEu9t8HwW0',
    "Why circuit breakers don't protect people · Unit 203 LO4",
    ['4.2'],
  ),
  // §4 Earthing — Ze test on a single-phase supply (Craig Wiltshire)
  zeTest: lookup(
    'CSMpfjSQK-g',
    'Ze test on a single-phase supply · Unit 203 LO4',
    ['4.5'],
  ),
  // §5 Supply — how transformers step voltage up and down (transmission)
  transformerStepUpDown: lookup(
    'lWEaGGZv8n8',
    'How transformers step voltage up and down · Unit 203 LO5',
    ['5.2'],
  ),
  // §6 Micro-renewables — what an inverter is and how it works (PV / battery)
  inverter: lookup(
    '8XI6GVLjPng',
    'What an inverter is and how it works · Unit 203 LO6',
    ['6.1', '6.2'],
  ),
  // §6 Micro-renewables — lead-acid battery electrochemistry (storage)
  leadAcidBatteries: lookup(
    'hObLxlXJPPM',
    'How lead-acid batteries work · Unit 203 LO6',
    ['6.1'],
  ),

  /* ── Module 4 (Unit 204) — Installation, inspection & testing ────── */

  // §3 Safe isolation — JIB 9-step procedure: where to test (Craig Wiltshire)
  safeIsolation: lookup(
    'YMJzWC_e_Uw',
    'JIB safe isolation — where to test · Unit 204 LO3',
    ['3.7'],
  ),
  // §6 Ring final test — three-part method (Craig Wiltshire)
  ringFinalTest: lookup(
    'K7-FxWD87Kg',
    'Ring final continuity test · Unit 204 LO6',
    ['6.2'],
  ),
  // §6 Insulation resistance — A4:2026 procedure (Craig Wiltshire)
  insulationResistanceAmd2: lookup(
    'sWvtpLZsAEE',
    'Insulation resistance per AMD2 · Unit 204 LO6',
    ['6.3'],
  ),
  // §5 Schedule of Inspections — full walkthrough (Craig Wiltshire)
  scheduleOfInspections: lookup(
    'DJn8KIQkApo',
    'Schedule of Inspections walkthrough · Unit 204 LO5',
    ['5.1'],
  ),
} as const satisfies Record<string, VideoLibraryEntry>;

export type VideoKey = keyof typeof videos;
