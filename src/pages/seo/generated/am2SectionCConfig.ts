import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// AM2 SEO page — content sourced from the in-app course at
// src/pages/apprentice-courses/AM2Module*Section*.tsx, grounded in the NET
// assessment specification. No invented timings, weightings or procedures.

const published = '2026-05-19';
const modified = '2026-05-19';

export const am2SectionCConfig: GeneratedGuideConfig = {
  pagePath: '/guides/am2-section-c-safe-isolation',
  title: 'AM2 Section C — Safe Isolation (45 min) | 10-Step + 10-Point Test',
  description:
    'AM2 Section C: 45 minutes of safe isolation across single-phase, three-phase, and distribution board scenarios. 10-step procedure, 10-point test sequence, critical fails.',
  datePublished: published,
  dateModified: modified,
  readingTime: 10,
  badge: 'AM2 Section C',
  badgeIcon: 'GraduationCap',
  breadcrumbLabel: 'AM2 Section C',
  heroPrefix: 'AM2 Section C:',
  heroHighlight: 'AM2 Section C — Safe Isolation',
  heroSuffix: '— 45 minutes — three scenarios',
  heroSubtitle:
    'Section C is safe isolation. 45 minutes, three scenarios: single-phase equipment, three-phase isolator, and distribution board. The 10-step procedure must be followed cleanly with no shortcuts. Of every AM2 section, this is the one where a single missed step is an instant fail.',
  keyTakeaways: [
    'Section C is 45 minutes total, covering three isolation scenarios: single-phase equipment, three-phase isolator, distribution board.',
    'The 10-step safe isolation procedure must be followed in order. Skipping a step is an instant fail.',
    'Prove your voltage indicator before AND after the dead test, against a known live source.',
    'The 10-point test sequence covers L-N, L-E, N-E at both origin and point of work.',
    'Lock-off device + warning notice + key in your possession at all times. The key never leaves you.',
    'Allow 10-15 minutes per scenario including documentation. Rushing the procedure is the most common failure pattern.',
  ],
  sections: [
    {
      id: 'what-section-c-covers',
      heading: 'What Section C covers',
      tocLabel: 'What Section C covers',
      blocks: [
        {
          type: 'paragraph',
          text: 'Section C is three separate safe isolation scenarios. You demonstrate the 10-step procedure on (1) a single-phase fixed appliance, (2) a three-phase isolator, and (3) the distribution board itself. The assessor watches every step. Safe isolation is the single most-failed skill on the AM2 — get it wrong and the rest of the day is over. The procedure must be the same every time, performed cleanly without shortcuts.',
        },
      ],
    },
    {
      id: 'ten-step-procedure',
      heading: 'The 10-step safe isolation procedure',
      tocLabel: 'The 10-step safe isolation p…',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            'Identify the correct circuit using drawings + specification.',
            'Inform anyone affected that the circuit will be isolated.',
            'Switch off the circuit at the isolator.',
            'Lock off using a lock and retain the key.',
            'Attach a warning notice to the device.',
            'Prove your tester on a known live source.',
            'Test the circuit (L-N, L-E, N-E, and combinations at all points).',
            'Re-prove your tester on the known live source.',
            'Confirm the circuit is dead and safe to work on.',
            'Keep lock + key under your control until the job is finished.',
          ],
        },
      ],
    },
    {
      id: 'ten-point-test',
      heading: 'The 10-point test sequence (every accessible point)',
      tocLabel: 'The 10-point test sequence (…',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            'L-N at origin.',
            'L-E at origin.',
            'L-N at point of work.',
            'L-E at point of work.',
            'N-E at origin.',
            'N-E at point of work.',
          ],
        },
      ],
    },
    {
      id: 'critical-fails',
      heading: 'The six critical fails (instant section fail)',
      tocLabel: 'The six critical fails (inst…',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            'Not proving the tester before AND after the dead test.',
            'Missing part of the 10-point test sequence.',
            'Testing at the wrong switch position.',
            'Isolating the wrong circuit.',
            'Not fitting the lock-off device or not attaching the warning notice.',
            'Leaving the key unsecured.',
          ],
        },
      ],
    },
    {
      id: 'equipment-needed',
      heading: 'Equipment for Section C',
      tocLabel: 'Equipment for Section C',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            'Multi-function tester (MFT) or approved voltage indicator (GS38-compliant).',
            'Lock-off devices — padlocks with unique keys.',
            'Warning notices — electrical isolation labels.',
            'Known live source for proving the tester (proving unit).',
            'Circuit drawings + specifications.',
            'PPE — insulated gloves, eye protection where required.',
            'Test leads + probes with fused tips and finger guards (GS38).',
            'Documentation — isolation certificate or sheet.',
          ],
        },
      ],
    },
    {
      id: 'study-with-elec-mate',
      heading: 'Study with Elec-Mate',
      tocLabel: 'Study with Elec-Mate',
      blocks: [
        {
          type: 'paragraph',
          text: 'The Elec-Mate apprentice tier covers every AM2 section in detail — 8 modules across ~16.5 hours, 40+ pages of NET-grounded content, plus the AM2 Testing Simulator and Mock Day. Built specifically for UK NVQ Level 3 candidates preparing for the practical assessment.',
        },
        {
          type: 'callout',
          tone: 'info',
          heading: 'AM2 Mock Day — practice under real timings',
          body: 'The Elec-Mate AM2 Mock Day mirrors the real assessment phases with the actual NET timings. Times you on each phase and scores you against the readiness rubric — the closest practice you can get to the real day.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'How long is Section C of the AM2?',
      answer:
        "Section C is 45 minutes total, covering three separate safe isolation scenarios — single-phase equipment, three-phase isolator, and distribution board. Allow 10-15 minutes per scenario including documentation and the 10-point test sequence. The total budget is tight but achievable if you don't rush or improvise the procedure.",
    },
    {
      question: 'What is the safe isolation procedure for the AM2?',
      answer:
        'The 10-step procedure: (1) identify correct circuit, (2) inform anyone affected, (3) switch off at isolator, (4) lock off + retain key, (5) attach warning notice, (6) prove tester on known live source, (7) test the circuit at all required points, (8) re-prove tester on known live source, (9) confirm dead + safe, (10) keep lock + key on you until the job is finished.',
    },
    {
      question: 'How do you prove a voltage indicator?',
      answer:
        'Test the voltage indicator against a known live source — a proving unit, a known-live socket, or the supply terminals before isolation. The indicator must show the expected reading. You do this BEFORE the dead test (to confirm the indicator works) and AGAIN AFTER the dead test (to confirm the indicator was still working when you tested dead). Missing either prove step is an instant fail.',
    },
    {
      question: 'What is the 10-point test in safe isolation?',
      answer:
        'The 10-point test sequence covers every conductor combination at both the origin (where you isolated) and the point of work (where you intend to work). You test L-N, L-E, N-E at the origin, then the same combinations at the point of work. Some scenarios add additional points if the circuit branches.',
    },
    {
      question: 'Why is safe isolation the most common AM2 failure?',
      answer:
        'Two reasons. First, the procedure is unforgiving — miss one step out of ten and the section is failed. Second, candidates rush it because the 45-minute budget feels tight. The fix is rehearsal: practise the 10-step procedure until you can perform it without thinking. By the time you sit AM2 you should be able to safe-isolate single-phase equipment in your sleep.',
    },
  ],
  faqHeading: 'AM2 Section C — FAQ',
  relatedPages: [
    {
      href: '/guides/am2-overview-and-structure',
      title: 'AM2 Assessment Structure',
      description: 'What AM2 is, the 6 sections, marking criteria + common fail patterns.',
      icon: 'GraduationCap',
      category: 'AM2',
    },
    {
      href: '/guides/am2-section-a-composite-installation',
      title: 'AM2 Section A — Composite Installation (8.5h)',
      description: 'The longest section: cable, containment, terminations, time management.',
      icon: 'Wrench',
      category: 'AM2',
    },
    {
      href: '/guides/am2-section-b-inspection-testing-certification',
      title: 'AM2 Section B — Inspection + Testing (3.5h)',
      description: 'GN3 dead-then-live sequence + EIC certification.',
      icon: 'ClipboardCheck',
      category: 'AM2',
    },
    {
      href: '/guides/am2-section-d-fault-diagnosis',
      title: 'AM2 Section D — Fault Diagnosis (2h)',
      description: 'Typical NET faults + the logical method assessors mark you on.',
      icon: 'Search',
      category: 'AM2',
    },
  ],
};
