import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// AM2 SEO page — content sourced from the in-app course at
// src/pages/apprentice-courses/AM2Module*Section*.tsx, grounded in the NET
// assessment specification. No invented timings, weightings or procedures.

const published = '2026-05-19';
const modified = '2026-05-19';

export const am2OverviewConfig: GeneratedGuideConfig = {
  pagePath: '/guides/am2-overview-and-structure',
  title: 'AM2 Assessment: Structure, Timings + Pass Criteria | UK 2026',
  description:
    'The AM2 is a 2½-day, 16.5-hour practical assessment for NVQ Level 3 electrical apprentices. Full structure: Sections A-E, real timings, pass criteria.',
  datePublished: published,
  dateModified: modified,
  readingTime: 10,
  badge: 'AM2 Assessment',
  badgeIcon: 'GraduationCap',
  breadcrumbLabel: 'AM2 Assessment',
  heroPrefix: 'AM2 Assessment:',
  heroHighlight: 'AM2 Assessment Structure',
  heroSuffix: '— 2½ days, 16.5 hours, 6 sections',
  heroSubtitle:
    "AM2 (Achievement Measurement 2) is the practical end-test for NVQ Level 3 electrical apprentices. 2½ days, ~16.5 hours, six sections that prove you're ready to work as a qualified electrician. Pass it and you can apply for your ECS Gold Card.",
  keyTakeaways: [
    'AM2 is a 2½-day, ~16.5-hour practical assessment that proves you are ready to work as a qualified UK electrician.',
    'Marked Competent / Not Yet Competent on each criterion — there is no percentage score to chase.',
    'Pass it and you can apply for your ECS Gold Card. Fail it and you sit it again — it is not an exam to wing.',
    'Six sections: A1 (Risk Assessment), A2-A5 (Composite Installation, 8.5 hrs), B (Inspection, Testing + Certification, 3.5 hrs), C (Safe Isolation, 45 min), D (Fault Diagnosis, 2 hrs), E (Online Knowledge Test, 1 hr).',
    'About 15,000 candidates take AM2 every year. Passers average around £8,000 salary uplift over their pre-AM2 rate.',
    'Most candidates who fail are not short on skill — they panic on the first hour or miss procedural detail (safe isolation, dead-before-live sequence).',
  ],
  sections: [
    {
      id: 'what-is-the-am2',
      heading: 'What the AM2 actually is',
      tocLabel: 'What the AM2 actually is',
      blocks: [
        {
          type: 'paragraph',
          text: 'AM2 (Achievement Measurement 2) is a 2½-day practical assessment totalling ~16.5 hours for electrical workers completing their NVQ Level 3. It proves your competency in electrical installation work and unlocks your ECS Gold Card. This is not just a test — it is your final step to becoming a fully qualified electrician. The assessment simulates real workplace conditions and you are evaluated on safety, technical skill, and professional standards.',
        },
      ],
    },
    {
      id: 'six-sections',
      heading: 'The six AM2 sections + real timings',
      tocLabel: 'The six AM2 sections + real …',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            'Section A1 — Risk Assessment + Initial Setup: hazard ID, method statements, PPE selection, workspace prep before installation begins.',
            'Section A2-A5 — Composite Installation (8 hours 30 minutes, the longest section): cable installation by various methods (conduit, trunking, clipping), SWA termination, mechanical protection, accessory installation, final connections.',
            'Section B — Inspection, Testing + Certification (3 hours 30 minutes): full test sequence, earth fault loop impedance, insulation resistance, RCD testing + verification, certificate completion.',
            'Section C — Safe Isolation of Circuits (45 minutes): three scenarios — single-phase equipment, three-phase isolator procedures, distribution board isolation.',
            'Section D — Fault Diagnosis + Rectification (2 hours): systematic diagnosis using test equipment, safe rectification, verification testing after repairs.',
            'Section E — Online Knowledge Test (1 hour): 30 multiple-choice questions on BS 7671, cable calculations, protective device selection, H&S + I&T procedures.',
          ],
        },
      ],
    },
    {
      id: 'how-marked',
      heading: 'How the AM2 is marked',
      tocLabel: 'How the AM2 is marked',
      blocks: [
        {
          type: 'paragraph',
          text: 'The AM2 uses competence-based assessment. Assessors judge each criterion as Competent or Not Yet Competent using objective Yes/No marking rather than percentage scores. Each practical skill is observed and graded on the day. Safety competence is non-negotiable — any safety violation can result in instant failure, particularly during safe isolation and live testing. The assessor is watching your method as much as your result: a candidate who finds the fault by a logical sequence scores higher than one who guesses correctly.',
        },
      ],
    },
    {
      id: 'common-failure-patterns',
      heading: 'Why candidates fail (and the patterns to avoid)',
      tocLabel: 'Why candidates fail (and the…',
      blocks: [
        {
          type: 'paragraph',
          text: 'Most candidates who fail are not short on skill — they fail on procedural detail. The top patterns: missing one of the 10 points in the safe isolation test sequence; rushing the dead-test sequence and missing continuity readings on the protective conductor; testing live before all dead tests complete; using the wrong cable size against the drawing; not following the GN3 testing order; running out of time on the composite installation because of poor first-hour planning. Each of these alone can be an instant fail.',
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
      question: 'How long is the AM2?',
      answer:
        'The AM2 is delivered over 2½ days and totals around 16.5 hours of assessed work. The longest single section is the Composite Installation (Section A2-A5) at 8 hours 30 minutes; the shortest is Safe Isolation (Section C) at 45 minutes. Timings vary slightly between assessment centres but the balance between sections is the same across all NET-approved providers.',
    },
    {
      question: 'Is AM2 the same as AM2E or AM2S?',
      answer:
        "AM2, AM2E and AM2S are different names for the same assessment over its evolution. The current NET specification is the AM2 (sometimes called AM2E for the electrotechnical pathway). The AM2S was an older variant. If you've signed up through an approved centre, you will be sitting the current AM2 against the current NET assessment criteria.",
    },
    {
      question: 'What happens if I fail the AM2?',
      answer:
        'You re-sit. There is no penalty for a first re-sit other than the time and (sometimes) cost — many candidates pass on the second attempt because they know what to expect. If safety competence was the failure reason, the resit typically focuses on the specific section that failed. Speak to your assessment centre for the specific resit policy.',
    },
    {
      question: 'How much does the AM2 cost?',
      answer:
        'AM2 fees vary by centre but are typically in the £400-£600 range, often covered by your employer or training provider as part of your apprenticeship. Self-funded candidates should budget for the assessment fee plus any travel/accommodation to the assessment centre.',
    },
    {
      question: 'Does passing AM2 mean I am a Qualified Electrician?',
      answer:
        'It is the final practical step. Once you pass AM2 and have your NVQ Level 3 certificate, you can apply for the ECS Gold Card — the recognised proof of qualified status across the UK trade. AM2 alone is not a qualification on its own; it is part of the apprenticeship + NVQ package that together produce a qualified electrician.',
    },
  ],
  faqHeading: 'AM2 Assessment — FAQ',
  relatedPages: [
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
      href: '/guides/am2-section-c-safe-isolation',
      title: 'AM2 Section C — Safe Isolation (45 min)',
      description: '10-step procedure + 10-point test sequence + six critical fails.',
      icon: 'Lock',
      category: 'AM2',
    },
    {
      href: '/guides/am2-section-d-fault-diagnosis',
      title: 'AM2 Section D — Fault Diagnosis (2h)',
      description: 'Typical NET faults + the logical method assessors mark you on.',
      icon: 'Search',
      category: 'AM2',
    },
    {
      href: '/guides/am2-section-e-online-knowledge-test',
      title: 'AM2 Section E — Online Knowledge Test (1h)',
      description: '30 MCQs on BS 7671, science, H&S, I&T.',
      icon: 'BookOpen',
      category: 'AM2',
    },
  ],
};
