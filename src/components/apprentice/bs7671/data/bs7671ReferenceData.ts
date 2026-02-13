export interface BS7671ReferenceCard {
  id: string;
  title: string;
  color: string;
  icon: string;
  content: BS7671ReferenceContent;
}

export type BS7671ReferenceContent =
  | { type: 'steps'; steps: string[] }
  | { type: 'key-points'; points: string[]; source?: string }
  | { type: 'table'; rows: { label: string; value: string }[] }
  | {
      type: 'grouped-table';
      groups: { heading: string; rows: { label: string; value: string }[] }[];
    }
  | {
      type: 'colour-codes';
      sections: {
        heading: string;
        codes: { colour: string; tailwindBg: string; function: string }[];
      }[];
    };

export const bs7671ReferenceCards: BS7671ReferenceCard[] = [
  {
    id: 'testing-sequence',
    title: 'Correct Testing Sequence',
    color: 'cyan',
    icon: 'ListOrdered',
    content: {
      type: 'steps',
      steps: [
        'Continuity of protective conductors (including main and supplementary bonding) — Regulation 643.2',
        'Continuity of ring final circuit conductors — Regulation 643.3',
        'Insulation resistance — Regulation 643.3',
        'Protection by SELV, PELV or electrical separation — Regulation 643.4',
        'Protection by barriers or enclosures (basic protection) — Regulation 643.5',
        'Insulation of non-conducting walls and floors — Regulation 643.6',
        'Polarity — Regulation 643.7',
        'Earth fault loop impedance (Zs) — Regulation 643.7 (live test)',
        'Prospective fault current (PFC) — Regulation 643.8 (live test)',
        'Phase sequence check (three-phase) — Regulation 643.9 (live test)',
        'Functional testing including RCD operation — Regulation 643.10 (live test)',
      ],
    },
  },
  {
    id: 'safe-isolation',
    title: 'Safe Isolation Procedure',
    color: 'red',
    icon: 'ShieldAlert',
    content: {
      type: 'steps',
      steps: [
        'Select an approved voltage indicator compliant with GS38 — inspect for damage',
        'Prove the voltage indicator on a known live source or proving unit',
        'Identify the circuit or equipment to be isolated',
        'Switch off at the correct isolator and lock off with a personal padlock and warning notice',
        'Verify dead: test between L-N, L-E, and N-E (all conductors) at the point of work',
        'Confirm dead: all readings should show zero/no voltage',
        'Re-prove the voltage indicator on the known live source — must still work correctly',
      ],
    },
  },
  {
    id: 'test-limits',
    title: 'Key BS 7671 Test Limits',
    color: 'green',
    icon: 'Gauge',
    content: {
      type: 'grouped-table',
      groups: [
        {
          heading: 'Insulation Resistance (Table 6A, Regulation 643.3)',
          rows: [
            { label: 'SELV / PELV (250V DC test)', value: '\u2265 0.5 M\u03A9' },
            { label: 'Up to 500V exc. above (500V DC test)', value: '\u2265 1.0 M\u03A9' },
            { label: 'Above 500V (1000V DC test)', value: '\u2265 1.0 M\u03A9' },
          ],
        },
        {
          heading: 'RCD Trip Times (Regulation 643.10)',
          rows: [
            { label: 'At \u00BD\u00D7 I\u0394n (e.g. 15mA)', value: 'Must NOT trip' },
            { label: 'At 1\u00D7 I\u0394n (e.g. 30mA)', value: '\u2264 300ms' },
            { label: 'At 5\u00D7 I\u0394n (e.g. 150mA)', value: '\u2264 40ms' },
          ],
        },
        {
          heading: 'Max Zs \u2014 Type B MCB at 0.4s (Table 41.3, Cmin = 0.95)',
          rows: [
            { label: '6A', value: '7.28 \u03A9 (measured: 5.82 \u03A9)' },
            { label: '10A', value: '4.37 \u03A9 (measured: 3.50 \u03A9)' },
            { label: '16A', value: '2.73 \u03A9 (measured: 2.18 \u03A9)' },
            { label: '20A', value: '2.19 \u03A9 (measured: 1.75 \u03A9)' },
            { label: '32A', value: '1.37 \u03A9 (measured: 1.10 \u03A9)' },
            { label: '40A', value: '1.09 \u03A9 (measured: 0.87 \u03A9)' },
            { label: '50A', value: '0.87 \u03A9 (measured: 0.70 \u03A9)' },
          ],
        },
      ],
    },
  },
  {
    id: 'earthing-systems',
    title: 'Earthing Systems',
    color: 'yellow',
    icon: 'Anchor',
    content: {
      type: 'grouped-table',
      groups: [
        {
          heading: 'System Types (Part 3, Section 312)',
          rows: [
            { label: 'TN-S', value: 'Separate earth conductor from DNO. Typical Ze \u2264 0.8 \u03A9' },
            { label: 'TN-C-S (PME)', value: 'Combined neutral/earth split at origin. Typical Ze \u2264 0.35 \u03A9' },
            { label: 'TT', value: 'Local earth electrode, no DNO earth. RCD required for fault protection' },
            { label: 'TN-C', value: 'Combined neutral/earth throughout. Not permitted in consumer installations' },
            { label: 'IT', value: 'Isolated supply, no direct earth connection. Used in specialist applications' },
          ],
        },
        {
          heading: 'Key Requirements',
          rows: [
            { label: 'TN-S max disconnection', value: '0.4s final circuits / 5s distribution' },
            { label: 'TN-C-S (PME) bonding', value: 'Main bonding to gas, water, oil, structural steel' },
            { label: 'TT earth electrode', value: 'Must achieve Ra \u00D7 I\u0394n \u2264 50V' },
          ],
        },
      ],
    },
  },
  {
    id: 'max-zs-values',
    title: 'Maximum Zs Values',
    color: 'blue',
    icon: 'Table',
    content: {
      type: 'grouped-table',
      groups: [
        {
          heading: 'Type B MCB (BS EN 60898) \u2014 0.4s (Cmin = 0.95)',
          rows: [
            { label: '6A', value: '7.28 \u03A9' },
            { label: '10A', value: '4.37 \u03A9' },
            { label: '16A', value: '2.73 \u03A9' },
            { label: '20A', value: '2.19 \u03A9' },
            { label: '32A', value: '1.37 \u03A9' },
            { label: '40A', value: '1.09 \u03A9' },
            { label: '50A', value: '0.87 \u03A9' },
          ],
        },
        {
          heading: 'Type C MCB (BS EN 60898) \u2014 0.4s (Cmin = 0.95)',
          rows: [
            { label: '6A', value: '3.64 \u03A9' },
            { label: '10A', value: '2.19 \u03A9' },
            { label: '16A', value: '1.37 \u03A9' },
            { label: '20A', value: '1.09 \u03A9' },
            { label: '32A', value: '0.68 \u03A9' },
            { label: '40A', value: '0.55 \u03A9' },
            { label: '50A', value: '0.44 \u03A9' },
          ],
        },
        {
          heading: 'BS 3036 Fuse \u2014 0.4s (Cmin = 0.95)',
          rows: [
            { label: '5A', value: '9.10 \u03A9' },
            { label: '15A', value: '2.43 \u03A9' },
            { label: '20A', value: '1.68 \u03A9' },
            { label: '30A', value: '1.04 \u03A9' },
            { label: '45A', value: '0.56 \u03A9' },
          ],
        },
      ],
    },
  },
  {
    id: 'ip-ratings',
    title: 'IP Ratings Reference',
    color: 'purple',
    icon: 'ShieldCheck',
    content: {
      type: 'grouped-table',
      groups: [
        {
          heading: 'Common IP Ratings (BS EN 60529)',
          rows: [
            { label: 'IP20', value: 'Finger-safe, no water protection \u2014 indoor switchgear, consumer units' },
            { label: 'IP2X', value: 'Minimum for consumer units (Regulation 421.1.201)' },
            { label: 'IP44', value: 'Splash-proof \u2014 bathrooms (Zone 2), covered outdoor areas' },
            { label: 'IP55', value: 'Dust-protected, low-pressure water jets \u2014 industrial, plant rooms' },
            { label: 'IP65', value: 'Dust-tight, water jets \u2014 outdoor lighting, garden sockets' },
            { label: 'IP66', value: 'Dust-tight, powerful water jets \u2014 car washes, exposed outdoor' },
            { label: 'IP67', value: 'Dust-tight, temporary immersion \u2014 ground-level fittings' },
            { label: 'IP68', value: 'Dust-tight, continuous immersion \u2014 swimming pools, pond lighting' },
          ],
        },
        {
          heading: 'Bathroom Zones (Section 701)',
          rows: [
            { label: 'Zone 0 (inside bath/shower)', value: 'IPX7 minimum' },
            { label: 'Zone 1 (above bath/shower)', value: 'IPX4 minimum (IPX5 if jets used)' },
            { label: 'Zone 2 (0.6m from Zone 1)', value: 'IPX4 minimum' },
            { label: 'Outside zones', value: 'General rules apply' },
          ],
        },
      ],
    },
  },
  {
    id: 'cable-colour-codes',
    title: 'Cable Colour Codes',
    color: 'amber',
    icon: 'Palette',
    content: {
      type: 'colour-codes',
      sections: [
        {
          heading: 'Current Harmonised Colours (post-2004)',
          codes: [
            { colour: 'Brown', tailwindBg: 'bg-amber-700', function: 'Line (single-phase) / L1 (three-phase)' },
            { colour: 'Black', tailwindBg: 'bg-gray-900', function: 'L2 (three-phase)' },
            { colour: 'Grey', tailwindBg: 'bg-gray-500', function: 'L3 (three-phase)' },
            { colour: 'Blue', tailwindBg: 'bg-blue-500', function: 'Neutral' },
            { colour: 'Green/Yellow', tailwindBg: 'bg-gradient-to-r from-green-500 to-yellow-400', function: 'Protective Earth (CPC)' },
          ],
        },
        {
          heading: 'Pre-2004 UK Colours (may be found in older installations)',
          codes: [
            { colour: 'Red', tailwindBg: 'bg-red-600', function: 'Line (single-phase) / L1' },
            { colour: 'Yellow', tailwindBg: 'bg-yellow-400', function: 'L2 (three-phase)' },
            { colour: 'Blue', tailwindBg: 'bg-blue-500', function: 'L3 (three-phase) / Neutral (single-phase)' },
            { colour: 'Black', tailwindBg: 'bg-gray-900', function: 'Neutral (three-phase)' },
            { colour: 'Green/Yellow', tailwindBg: 'bg-gradient-to-r from-green-500 to-yellow-400', function: 'Protective Earth (CPC)' },
          ],
        },
      ],
    },
  },
  {
    id: 'gs38-requirements',
    title: 'GS38 Requirements',
    color: 'orange',
    icon: 'Wrench',
    content: {
      type: 'key-points',
      source: 'HSE Guidance Note GS38 \u2014 Electrical Test Equipment for Electricians',
      points: [
        'Test probes must have finger barriers or guards against accidental contact with live parts',
        'Exposed metal tip must not exceed 4mm (2mm or less strongly recommended, or use spring-loaded retractable tips)',
        'Test leads must have HBC (high breaking capacity) fuses \u2014 typically 500mA for voltage indicators, 10A for loop/RCD testers',
        'Leads must be adequately insulated, clearly distinguishable (different colours), flexible, and not excessively long',
        'All test equipment must be rated for the installation category (CAT II, III, or IV) and voltage',
        'Probes, leads, and clips must be inspected before each use for damage or deterioration',
        'Voltage indicators must comply with GS38 \u2014 multimeters alone are NOT recommended for proving dead',
      ],
    },
  },
  {
    id: 'emergency-procedures',
    title: 'Electric Shock Response',
    color: 'red',
    icon: 'HeartPulse',
    content: {
      type: 'steps',
      steps: [
        'Do NOT touch the casualty if they are still in contact with the electrical source',
        'Switch off the supply at the nearest isolator, consumer unit, or emergency stop',
        'If you cannot switch off, use a dry non-conductive object (wooden broom, rubber mat) to separate the casualty from the source',
        'Call 999 immediately \u2014 state "electric shock" so the correct response is dispatched',
        'If the casualty is not breathing, begin CPR: 30 chest compressions then 2 rescue breaths',
        'Use a defibrillator (AED) if available \u2014 follow the spoken instructions',
        'Do not move the casualty unless there is immediate danger \u2014 treat for shock (keep warm, legs raised) and monitor until paramedics arrive',
      ],
    },
  },
];
