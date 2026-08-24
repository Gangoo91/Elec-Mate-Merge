/**
 * guideToMockExam — which mock exam belongs at the foot of which public page.
 *
 * WHY THIS EXISTS
 * The mock exams are the best-converting format on the site: 6.4% click-through
 * from search against 1.3% for the guides, measured at the same ranking band.
 * They were also the least visible thing we publish — no nav entry, and only 17
 * of 1,391 public pages linked to one. Meanwhile the ten highest-impression
 * guides carry ~97,000 impressions a month between them and offered no route
 * to an exam at all.
 *
 * This map closes that gap without touching a single page component:
 * PublicPageLayout looks the current route up here and renders the block.
 *
 * ⚠️ PAIRINGS ARE HAND-MADE, NOT KEYWORD-MATCHED. A guide sent to a loosely
 * related exam is worse than no link — it reads as spam and it wastes the
 * click. Anything without an honest match is simply absent from this map, and
 * absent means no block renders. Pages about insurance, pricing and app
 * comparisons are deliberately not here; there is no exam that follows from
 * them.
 *
 * `reason` completes the sentence "…so you can " and must describe what the
 * exam actually covers, because the visitor is deciding whether it is worth
 * their next ten minutes.
 */
export interface MockExamPairing {
  /** Slug under /mock-exams/ — validated by scripts/check-topic-registry.mjs. */
  examSlug: string;
  /** Display name of the exam. */
  examName: string;
  /** Completes "…so you can {reason}". Lower case, no full stop. */
  reason: string;
}

export const GUIDE_TO_MOCK_EXAM: Record<string, MockExamPairing> = {
  // ── Inspection & testing → C&G 2391 ──────────────────────────────────────
  ...Object.fromEntries(
    [
      ['/guides/ze-values-uk', 'measuring Ze and the maximum values for each earthing arrangement'],
      ['/loop-impedance-testing-guide', 'loop impedance testing and what the readings mean'],
      ['/guides/maximum-zs-values-bs-7671', 'Zs limits and how they change with the protective device'],
      ['/guides/low-insulation-resistance', 'insulation resistance testing and Table 64 minimums'],
      ['/guides/earth-fault-loop-impedance-too-high', 'diagnosing a loop impedance that is out of limits'],
      ['/guides/earth-fault-loop-impedance-calculation', 'calculating Zs from Ze and R1+R2'],
      ['/guides/rcd-testing-procedure', 'RCD testing to the current amendment'],
      ['/polarity-test-guide', 'polarity testing and the rest of the dead-test sequence'],
      ['/continuity-testing-guide', 'continuity of protective conductors and ring final circuits'],
      ['/guides/testing-three-phase-installation', 'testing three-phase installations'],
      ['/guides/insulation-resistance-testing-bs7671', 'insulation resistance testing and Table 64 minimums'],
      ['/guides/safe-isolation-procedure', 'safe isolation and proving dead'],
      ['/tools/disconnection-time-calculator', 'disconnection times and the Zs limits behind them'],
      ['/tools/earth-loop-impedance-calculator', 'loop impedance and the maximum permitted values'],
    ].map(([route, reason]) => [
      route,
      { examSlug: '2391-inspection-testing', examName: 'C&G 2391 Inspection & Testing', reason },
    ])
  ),

  // ── Regulations and design → 18th Edition ────────────────────────────────
  ...Object.fromEntries(
    [
      ['/bonding-conductors-guide', 'protective bonding, Table 54.8 and when bonding can be omitted'],
      ['/guides/appendix-4-tables-bs-7671', 'reading the Appendix 4 tables under exam conditions'],
      ['/guides/reference-methods-cable-installation', 'reference methods and the ratings that follow from them'],
      ['/guides/cable-colour-codes-uk', 'cable identification and the rest of Part 5'],
      ['/guides/spur-socket-regulations', 'final circuit design and the rules for spurs'],
      ['/guides/radial-circuit-explained', 'radial and ring final circuit requirements'],
      ['/guides/electric-shower-installation', 'shower circuits, bathroom zones and Section 701'],
      ['/guides/prospective-fault-current-explained', 'prospective fault current and breaking capacity'],
      ['/guides/max-demand-calculation-guide', 'maximum demand and diversity'],
      ['/guides/electrical-regulations-timeline-uk', 'what actually changed in the current amendment'],
      ['/part-p-building-regulations', 'notifiable work and the wider regulatory framework'],
      ['/guides/electrical-symbols-chart', 'the regulations these symbols appear on drawings for'],
      ['/tools/cable-derating-calculator', 'correction factors and cable selection'],
      ['/tools/cable-sizing-calculator', 'cable selection start to finish'],
      ['/tools/cable-volt-drop-three-phase', 'voltage drop limits and cable selection'],
      ['/tools/conduit-fill-calculator', 'containment and the selection-and-erection requirements'],
    ].map(([route, reason]) => [
      route,
      { examSlug: '18th-edition-bs-7671', examName: '18th Edition (BS 7671)', reason },
    ])
  ),

  // ── Fault finding → Level 3 Fault Diagnosis ──────────────────────────────
  ...Object.fromEntries(
    [
      ['/guides/rcbo-keeps-tripping-common-causes', 'tracing nuisance tripping to its cause'],
      ['/guides/loose-neutral-symptoms', 'recognising a fault from its symptoms'],
      ['/guides/electric-shock-from-tap', 'diagnosing a fault from what the customer reports'],
      ['/guides/ring-circuit-fault-finding', 'fault diagnosis on ring final circuits'],
    ].map(([route, reason]) => [
      route,
      { examSlug: 'level-3-fault-diagnosis', examName: 'Level 3 Fault Diagnosis', reason },
    ])
  ),

  // ── 18th Edition (BS 7671) ──
  ...Object.fromEntries(
    [
      // Was two entries — /guides/earthing-arrangements now 301s here, and this is
      // an Object.fromEntries map keyed by guide URL, so keeping both would have
      // silently dropped one. Merged into the single surviving pairing.
      [
        '/guides/earthing-systems-tns-tncs-tt-explained',
        'TN-S, TN-C-S and TT, and the maximum Ze values for each arrangement',
      ],
      ['/guides/protective-earthing-bonding', 'protective earthing and bonding requirements'],
      ['/guides/ring-vs-radial-circuits', 'final circuit design and the rules for each arrangement'],
      ['/armoured-cable-installation', 'cable selection, glanding and containment'],
      ['/guides/construction-site-temporary-supply', 'construction site supplies and reduced low voltage'],
      ['/guides/special-locations-part-7-bs-7671', 'the Part 7 special locations'],
      ['/guides/swimming-pool-electrical-regulations', 'pool and fountain zones under Section 702'],
      ['/guides/bonding-in-bathroom', 'bathroom zones and supplementary bonding'],
      ['/guides/caravan-park-electrical', 'caravan and marina supplies'],
      ['/guides/bs-7671-18th-edition-guide', 'the current amendment end to end'],
      ['/rcbo-installation-guide', 'device selection and discrimination'],
      ['/fp200-gold-cable-guide', 'fire-resisting cable selection and support'],
      ['/guides/outbuilding-electrical-supply-guide', 'sub-main design and outbuilding supplies'],
      ['/generator-installation-guide', 'generating sets and switched alternative supplies'],
      ['/guides/three-phase-calculations', 'three-phase design calculations'],
      ['/tools/prospective-fault-current-calculator', 'prospective fault current and breaking capacity'],
      ['/tools/adiabatic-equation-calculator', 'protective conductor sizing and the adiabatic equation'],
      ['/tools/busbar-sizing-calculator', 'distribution design and busbar selection'],
      ['/tools/trunking-fill-calculator', 'containment capacity and selection'],
      ['/tools/cable-tray-sizing-calculator', 'containment selection and support'],
      ['/tools/lighting-lux-calculator', 'lighting circuit design'],
      ['/tools/earth-rod-resistance-calculator', 'earth electrodes and TT system requirements'],
    ].map(([route, reason]) => [
      route,
      { examSlug: '18th-edition-bs-7671', examName: '18th Edition (BS 7671)', reason },
    ])
  ),
  // ── C&G 2391 Inspection & Testing ──
  ...Object.fromEntries(
    [
      ['/guides/testing-sequence-guide', 'the dead and live test sequence in the right order'],
      ['/guides/minor-works-vs-eic', 'which certificate a job needs and how to complete it'],
      ['/guides/napit-certificate-guide', 'certification and the schedules that go with it'],
      ['/guides/eicr-limitations', 'agreeing and recording the extent and limitations'],
      ['/bs7671-observation-codes', 'coding observations C1, C2, C3 and FI'],
      ['/guides/safe-isolation-procedure-electricians', 'safe isolation and proving dead'],
      ['/part-p-self-certification', 'notification, certification and the schedules'],
    ].map(([route, reason]) => [
      route,
      { examSlug: '2391-inspection-testing', examName: 'C&G 2391 Inspection & Testing', reason },
    ])
  ),
  // ── Level 3 Fault Diagnosis ──
  ...Object.fromEntries(
    [
      ['/guides/electrical-fault-finding-methodology', 'working a fault through to its cause'],
      ['/guides/humming-noise-from-consumer-unit', 'diagnosing a fault from what the customer reports'],
      ['/electric-shower-fault-finding', 'fault diagnosis on high-current appliance circuits'],
    ].map(([route, reason]) => [
      route,
      { examSlug: 'level-3-fault-diagnosis', examName: 'Level 3 Fault Diagnosis', reason },
    ])
  ),
  // ── EV Charging Installation ──
  ...Object.fromEntries(
    [
      ['/guides/section-722-ev-charging-complete-guide', 'Section 722 and EV charging installation requirements'],
      ['/guides/ev-charger-certificate-requirements', 'EV charging installation and its certification'],
      ['/guides/cable-size-for-ev-charger', 'sizing and protecting an EV charging circuit'],
      ['/guides/v2h-bidirectional-ev-charging', 'bidirectional charging and the rules around it'],
    ].map(([route, reason]) => [
      route,
      { examSlug: 'ev-charging', examName: 'EV Charging Installation', reason },
    ])
  ),
  // ── Renewable Energy & Solar PV ──
  ...Object.fromEntries(
    [
      ['/guides/heat-pump-electrical-requirements', 'heat pump supplies and renewable technologies'],
      ['/guides/solar-pv-certificate-requirements', 'solar PV installation and its certification'],
      ['/tools/battery-backup-calculator', 'battery storage and renewable system design'],
    ].map(([route, reason]) => [
      route,
      { examSlug: 'renewable-energy', examName: 'Renewable Energy & Solar PV', reason },
    ])
  ),
  // ── Fire Alarm Systems (BS 5839-1) ──
  ...Object.fromEntries(
    [
      ['/guides/fire-alarm-certificate-requirements', 'fire alarm systems to BS 5839-1'],
    ].map(([route, reason]) => [
      route,
      { examSlug: 'fire-alarm', examName: 'Fire Alarm Systems (BS 5839-1)', reason },
    ])
  ),
  // ── Level 3 Health & Safety ──
  ...Object.fromEntries(
    [
      ['/guides/ppe-for-electricians', 'PPE duties and the wider health and safety law behind them'],
    ].map(([route, reason]) => [
      route,
      { examSlug: 'level-3-electrical-health-safety', examName: 'Level 3 Health & Safety', reason },
    ])
  ),
  // ── Level 2 Installation Practice ──
  ...Object.fromEntries(
    [
      ['/guides/first-fix-electrical', 'first-fix practice and installation methods'],
      ['/guides/kitchen-wiring-guide', 'domestic circuit installation practice'],
      ['/guides/underfloor-heating-electrical', 'heating circuit installation practice'],
    ].map(([route, reason]) => [
      route,
      { examSlug: 'level-2-installation-practice', examName: 'Level 2 Installation Practice', reason },
    ])
  ),
  // ── AM2 Online Knowledge Test ──
  ...Object.fromEntries(
    [
      ['/guides/am2-exam-tips', 'what the AM2 knowledge test actually asks'],
    ].map(([route, reason]) => [
      route,
      { examSlug: 'am2-online-knowledge-test', examName: 'AM2 Online Knowledge Test', reason },
    ])
  ),
  // ── Level 3 Career Development ──
  ...Object.fromEntries(
    [
      ['/guides/cpd-for-electricians', 'CPD, professional bodies and career routes'],
      ['/guides/gold-card-requirements-electrician', 'JIB grading and the route to a Gold Card'],
      ['/guides/electrician-working-abroad', 'qualifications, grading and career pathways'],
    ].map(([route, reason]) => [
      route,
      { examSlug: 'level-3-career-development', examName: 'Level 3 Career Development', reason },
    ])
  ),
  // ── PASMA Towers for Users ──
  ...Object.fromEntries(
    [
      ['/pasma-training', 'the PASMA Towers for Users theory assessment'],
    ].map(([route, reason]) => [
      route,
      { examSlug: 'pasma', examName: 'PASMA Towers for Users', reason },
    ])
  ),
  // ── Everything else, one at a time ───────────────────────────────────────
  '/guides/ecs-card-types': {
    examSlug: 'cscs-card',
    examName: 'CSCS Card HS&E Test',
    reason: 'sit the health, safety and environment test the card depends on',
  },
  '/ipaf-training': {
    examSlug: 'ipaf',
    examName: 'IPAF MEWP Operator',
    reason: 'check you are ready for the IPAF theory assessment',
  },
  '/extension-lead-safety': {
    examSlug: 'pat-testing',
    examName: 'PAT Testing (C&G 2377)',
    reason: 'in-service inspection and testing of portable equipment',
  },
  '/ev-charging-legislation': {
    examSlug: 'ev-charging',
    examName: 'EV Charging Installation',
    reason: 'EV charging installation requirements',
  },
  '/guides/apprentice-electrician-salary': {
    examSlug: 'level-3-career-development',
    examName: 'Level 3 Career Development',
    reason: 'JIB grading, qualifications and the routes that set your rate',
  },
  '/tools/power-factor-calculator': {
    examSlug: 'level-3-electrical-science',
    examName: 'Level 3 Electrical Science',
    reason: 'power factor, AC theory and the rest of the science unit',
  },
  '/guides/2391-exam-tips': {
    examSlug: '2391-inspection-testing',
    examName: 'C&G 2391 Inspection & Testing',
    reason: 'put the exam tips into practice on a timed paper',
  },
  '/guides/city-guilds-2382-exam-guide': {
    examSlug: '18th-edition-bs-7671',
    examName: '18th Edition (BS 7671)',
    reason: 'revise the regulations the 2382 paper examines',
  },
  '/guides/bathroom-electrical-zones-bs7671': {
    examSlug: '18th-edition-bs-7671',
    examName: '18th Edition (BS 7671)',
    reason: 'check your Section 701 zones and bonding knowledge',
  },
  '/consumer-unit-regulations': {
    examSlug: '18th-edition-bs-7671',
    examName: '18th Edition (BS 7671)',
    reason: 'revise consumer unit and device selection rules',
  },
  '/guides/electrical-equipment-symbols': {
    examSlug: '18th-edition-bs-7671',
    examName: '18th Edition (BS 7671)',
    reason: 'revise the regulations behind the drawings',
  },
  '/agricultural-electrical-installation': {
    examSlug: '18th-edition-bs-7671',
    examName: '18th Edition (BS 7671)',
    reason: 'revise Section 705 and the other special locations',
  },
  '/guides/marina-electrical-installations': {
    examSlug: '18th-edition-bs-7671',
    examName: '18th Edition (BS 7671)',
    reason: 'revise Section 709 and the other special locations',
  },
  '/guides/sauna-electrical-installation': {
    examSlug: '18th-edition-bs-7671',
    examName: '18th Edition (BS 7671)',
    reason: 'revise Section 703 and the other special locations',
  },
  '/fused-spur-installation-guide': {
    examSlug: '18th-edition-bs-7671',
    examName: '18th Edition (BS 7671)',
    reason: 'revise fused connection units and final circuit rules',
  },
  '/electric-boiler-installation': {
    examSlug: '18th-edition-bs-7671',
    examName: '18th Edition (BS 7671)',
    reason: 'revise heating circuit design and protection',
  },
  '/cable-basket-installation': {
    examSlug: '18th-edition-bs-7671',
    examName: '18th Edition (BS 7671)',
    reason: 'revise containment selection and support rules',
  },
  '/guides/best-electrical-books': {
    examSlug: '18th-edition-bs-7671',
    examName: '18th Edition (BS 7671)',
    reason: 'test what the reading has actually stuck',
  },
  '/guides/eicr-schedule-of-inspections': {
    examSlug: '2391-inspection-testing',
    examName: 'C&G 2391 Inspection & Testing',
    reason: 'practise the schedule of inspections under exam conditions',
  },
  '/guides/continuity-testing-r1-r2': {
    examSlug: '2391-inspection-testing',
    examName: 'C&G 2391 Inspection & Testing',
    reason: 'check your continuity testing and R1+R2 knowledge',
  },
  '/guides/how-to-fill-in-minor-works': {
    examSlug: '2391-inspection-testing',
    examName: 'C&G 2391 Inspection & Testing',
    reason: 'revise minor works certification and the tests behind it',
  },
  '/guides/best-multifunction-tester-2026': {
    examSlug: '2391-inspection-testing',
    examName: 'C&G 2391 Inspection & Testing',
    reason: 'practise the tests your new tester will be doing',
  },
  '/guides/hmo-electrical-requirements': {
    examSlug: '2391-51-periodic-inspection',
    examName: 'C&G 2391-51 Periodic Inspection',
    reason: 'revise periodic inspection on rented property',
  },
  '/holiday-let-electrical': {
    examSlug: '2391-51-periodic-inspection',
    examName: 'C&G 2391-51 Periodic Inspection',
    reason: 'revise the periodic inspection a holiday let needs',
  },
  '/eic-certificate': {
    examSlug: '2391-50-initial-verification',
    examName: 'C&G 2391-50 Initial Verification',
    reason: 'revise initial verification and the EIC that records it',
  },
  '/guides/iet-code-of-practice-ev': {
    examSlug: 'ev-charging',
    examName: 'EV Charging Installation',
    reason: 'test yourself on the material the code of practice covers',
  },
  '/guides/ground-source-heat-pump-electrical': {
    examSlug: 'renewable-energy',
    examName: 'Renewable Energy & Solar PV',
    reason: 'revise heat pump supplies and renewable technologies',
  },
  '/guides/knx-wiring-installation-guide-uk': {
    examSlug: 'smart-home',
    examName: 'Smart Home Technology',
    reason: 'revise smart building control systems and their wiring',
  },
  '/tools/motor-starting-current-calculator': {
    examSlug: 'industrial-electrical',
    examName: 'Industrial Electrical',
    reason: 'revise motor circuits, starting methods and protection',
  },
  '/guides/jib-grading-explained': {
    examSlug: 'am2-online-knowledge-test',
    examName: 'AM2',
    reason: 'prepare for the assessment that moves your grading up',
  },
  '/guides/permit-to-work-electrical-isolation': {
    examSlug: 'level-3-electrical-health-safety',
    examName: 'Level 3 Health & Safety',
    reason: 'revise permits to work and safe systems of work',
  },
};
