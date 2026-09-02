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
        'Continuity of ring final circuit conductors — Regulation 643.2',
        'Insulation resistance — Regulation 643.3 (Table 64 values)',
        'Protection by SELV, PELV or electrical separation — Regulation 643.4',
        'Insulation resistance of non-conducting floors and walls (where Reg 418.1 applies) — Regulation 643.5',
        'Polarity — Regulation 643.6',
        'Earth fault loop impedance and earth electrode resistance — Regulation 643.7 (live test)',
        'Prospective fault current (PFC) — Regulation 643.8 (live test)',
        'Phase sequence check (three-phase) — Regulation 643.9 (live test)',
        'Functional testing including RCD operation — Regulation 643.10 (live test)',
        'Regulation 643.1: tests 643.2 to 643.6 are carried out in that order before the installation is energised; a failed test is repeated, with any earlier test it could have affected, once the fault is put right',
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
        'Identify the circuit or equipment to be isolated — and check for any second source (PV, UPS, generator, borrowed neutral)',
        'Switch off at the correct isolator and lock off with a personal padlock and warning notice',
        'Select an approved voltage indicator compliant with GS38 — inspect it for damage',
        'Prove the voltage indicator on a known live source or proving unit immediately before testing',
        'Test for dead between L-N, L-E and N-E (all conductors) at the point of work — every reading should show no voltage',
        'Re-prove the voltage indicator on the known live source — it must still work correctly',
        'Only then start work; the lock and key stay with you until the job is finished',
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
          heading: 'Insulation Resistance (Table 64, Regulation 643.3)',
          rows: [
            { label: 'SELV / PELV (250V DC test)', value: '\u2265 0.5 M\u03A9' },
            { label: 'Up to 500V exc. above (500V DC test)', value: '\u2265 1.0 M\u03A9' },
            { label: 'Above 500V (1000V DC test)', value: '\u2265 1.0 M\u03A9' },
          ],
        },
        {
          heading: 'RCD Test (Regulation 643.10 \u2014 A4:2026)',
          rows: [
            {
              label: 'At 1\u00D7 I\u0394n (e.g. 30mA), AC test',
              value: '\u2264 300ms (general); S-type 130\u2013500ms',
            },
            {
              label: '5\u00D7 I\u0394n test',
              value: 'Deleted at A4:2026 with Appendix 3 Table 3A \u2014 no longer required',
            },
            {
              label: 'Integral test button',
              value: 'Functional check only \u2014 not a substitute for the instrument test',
            },
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
            {
              label: 'TN-S',
              value: 'Separate earth conductor from DNO. Typical Ze \u2264 0.8 \u03A9',
            },
            {
              label: 'TN-C-S (PME)',
              value: 'Combined neutral/earth split at origin. Typical Ze \u2264 0.35 \u03A9',
            },
            {
              label: 'TT',
              value: 'Local earth electrode, no DNO earth. RCD required for fault protection',
            },
            {
              label: 'TN-C',
              value: 'Combined neutral/earth throughout. Not permitted in consumer installations',
            },
            {
              label: 'IT',
              value: 'Isolated supply, no direct earth connection. Used in specialist applications',
            },
          ],
        },
        {
          heading: 'Key Requirements',
          rows: [
            { label: 'TN-S max disconnection', value: '0.4s final circuits / 5s distribution' },
            {
              label: 'TN-C-S (PME) bonding',
              value: 'Main bonding to gas, water, oil, structural steel',
            },
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
            {
              label: 'IP20',
              value: 'Finger-safe, no water protection \u2014 indoor switchgear, consumer units',
            },
            {
              label: 'IP2X / IPXXB',
              value:
                'Basic protection by barriers or enclosures \u2014 live parts finger-safe (Regulation 416.2)',
            },
            {
              label: 'IP44',
              value: 'Splash-proof \u2014 bathrooms (Zone 2), covered outdoor areas',
            },
            {
              label: 'IP55',
              value: 'Dust-protected, low-pressure water jets \u2014 industrial, plant rooms',
            },
            {
              label: 'IP65',
              value: 'Dust-tight, water jets \u2014 outdoor lighting, garden sockets',
            },
            {
              label: 'IP66',
              value: 'Dust-tight, powerful water jets \u2014 car washes, exposed outdoor',
            },
            {
              label: 'IP67',
              value: 'Dust-tight, temporary immersion \u2014 ground-level fittings',
            },
            {
              label: 'IP68',
              value: 'Dust-tight, continuous immersion \u2014 swimming pools, pond lighting',
            },
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
            {
              colour: 'Brown',
              tailwindBg: 'bg-amber-700',
              function: 'Line (single-phase) / L1 (three-phase)',
            },
            { colour: 'Black', tailwindBg: 'bg-gray-900', function: 'L2 (three-phase)' },
            { colour: 'Grey', tailwindBg: 'bg-gray-500', function: 'L3 (three-phase)' },
            { colour: 'Blue', tailwindBg: 'bg-blue-500', function: 'Neutral' },
            {
              colour: 'Green/Yellow',
              tailwindBg: 'bg-gradient-to-r from-green-500 to-yellow-400',
              function: 'Protective Earth (CPC)',
            },
          ],
        },
        {
          heading: 'Pre-2004 UK Colours (may be found in older installations)',
          codes: [
            { colour: 'Red', tailwindBg: 'bg-red-600', function: 'Line (single-phase) / L1' },
            { colour: 'Yellow', tailwindBg: 'bg-elec-yellow', function: 'L2 (three-phase)' },
            {
              colour: 'Blue',
              tailwindBg: 'bg-blue-500',
              function: 'L3 (three-phase) / Neutral (single-phase)',
            },
            { colour: 'Black', tailwindBg: 'bg-gray-900', function: 'Neutral (three-phase)' },
            {
              colour: 'Green/Yellow',
              tailwindBg: 'bg-gradient-to-r from-green-500 to-yellow-400',
              function: 'Protective Earth (CPC)',
            },
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
        'Test leads must be protected against the effects of a fault \u2014 by HBC fuses (typically 500mA) or current-limiting resistors built into the probes',
        'Leads must be adequately insulated, clearly distinguishable (different colours), flexible, and not excessively long',
        'All test equipment must be rated for the installation category (CAT II, III, or IV) and voltage',
        'Probes, leads, and clips must be inspected before each use for damage or deterioration',
        'Voltage indicators must comply with GS38 \u2014 a multimeter is not suitable for proving dead, because it cannot tell a dead circuit from a flat battery or a broken lead',
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
