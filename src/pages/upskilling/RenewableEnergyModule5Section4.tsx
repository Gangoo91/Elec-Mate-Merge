import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  Pullquote,
  DiagramPlaceholder,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm5s4-62485-overview',
    question:
      'BS EN IEC 62485 series — what is it, and which part is most relevant for UK domestic LFP BESS?',
    options: [
      'Just one document',
      'BS EN IEC 62485 is a multi-part international standard family covering safety of secondary batteries and battery installations. Parts: -1 general safety + hazards; -2 stationary batteries (Pb-acid, VRLA, NiCd specifics); -3 traction batteries (industrial trucks); -4 small Li-ion (consumer / portable); -5 Li-ion stationary (the part most relevant for UK domestic BESS). UK domestic LFP BESS conformance is via the manufacturer&rsquo;s product certification declaration. Reg 570.6.1.1.1 mandates conformance to the relevant parts',
      'Only -1 applies',
      'No standard exists',
    ],
    correctIndex: 1,
    explanation:
      'BS EN IEC 62485 is the international standard family for battery installation safety. Five parts: -1 general (basic safety principles, hazard mitigation, common requirements); -2 stationary batteries (Pb-acid, VRLA, NiCd, alkaline) — covers hydrogen ventilation, charging safety, traditional chemistry installation; -3 traction batteries (forklifts, automated guided vehicles); -4 small Li-ion (consumer / portable, not stationary BESS); -5 Li-ion stationary — the part directly applicable to UK domestic LFP BESS. For UK domestic install: Part -1 (general principles) + Part -5 (Li-ion stationary specifics) are the relevant ones. Pb-acid legacy off-grid: Part -1 + Part -2. Reg 570.6.1.1.1 mandates conformance via &ldquo;the relevant parts&rdquo;. Manufacturer&rsquo;s product certification declares which parts applied. Cert evidence bundle records the declaration.',
  },
  {
    id: 'm5s4-pas-63100',
    question:
      'PAS 63100:2024 — what is it, and how does it interact with BS 7671 Chapter 57?',
    options: [
      'Same thing',
      'PAS 63100:2024 = &ldquo;Specification for the installation and safe use of battery energy storage systems in electrical installations of dwellings.&rdquo; UK-specific Publicly Available Specification (PAS) published by BSI in 2024. Operational install guidance: location rules, clearances, fire detection, signage, commissioning workflow. Reg 570.6.7.203 (Chapter 57) EXPLICITLY cross-references PAS 63100 for batteries in UK dwellings. So: Chapter 57 = regulatory framework; PAS 63100 = UK domestic install detail. The competent installer complies with BOTH',
      'Replaces Chapter 57',
      'Optional',
    ],
    correctIndex: 1,
    explanation:
      'PAS 63100:2024 is the UK-specific installation specification for domestic BESS. Published by BSI in 2024 to address the rapid growth of UK home BESS installs. Title: &ldquo;Specification for the installation and safe use of battery energy storage systems in electrical installations of dwellings.&rdquo; Covers: install location (no habitable spaces, clearances from windows/doors/escape routes); fire detection (smoke / heat detector requirements); signage; commissioning workflow; customer information; multi-occupancy considerations. Cross-referenced by Reg 570.6.7.203: &ldquo;Stationary secondary batteries in dwellings shall be installed in a suitable location taking account of manufacturer&rsquo;s instructions and PAS 63100.&rdquo; UK domestic BESS install must comply with BOTH Chapter 57 (regulatory framework) AND PAS 63100 (install spec). Commercial / non-dwelling installs: PAS 63100 doesn&rsquo;t apply directly; fire strategy + other UK regs.',
  },
  {
    id: 'm5s4-62485-1-general',
    question:
      'BS EN IEC 62485-1 (general safety) — what high-level safety principles does it set for battery installations?',
    options: [
      'No principles',
      'Part -1 sets common safety principles applicable to all secondary battery installations regardless of chemistry: (1) electrical safety — shock protection, basic insulation, separation, isolation; (2) chemical safety — gas evolution mitigation, electrolyte handling, spill containment; (3) thermal safety — ventilation, temperature limits, fire-risk mitigation; (4) mechanical safety — mounting, vibration, impact; (5) maintenance procedures — safe-work practices, PPE, training. The chemistry-specific parts (-2, -5) build on Part -1\'s common framework',
      'Customer\'s choice',
      'Only for Pb-acid',
    ],
    correctIndex: 1,
    explanation:
      'BS EN IEC 62485-1 establishes the common safety framework applicable to all battery installation chemistries. Topics: electrical safety (shock prevention, basic insulation per IEC 61140, isolation per IEC 60364-4-46); chemical safety (gas / electrolyte / spill); thermal safety (ventilation calculation principles, fire risk); mechanical safety (mounting, vibration, impact resistance); maintenance procedures (PPE, lock-out / tag-out, training requirements). The chemistry-specific parts (-2 stationary Pb-acid, -5 Li-ion stationary) reference back to Part -1 for the common framework + add chemistry-specific detail. UK domestic LFP install: Part -1 + Part -5 together cover the full safety scope. Manufacturer&rsquo;s product certification declares conformance to the relevant parts.',
  },
  {
    id: 'm5s4-62485-5-lithium',
    question:
      'BS EN IEC 62485-5 (Li-ion stationary) — what Li-ion-specific safety topics does it address that don\'t apply to Pb-acid?',
    options: [
      'No differences',
      'Part -5 covers Li-ion-specific safety: (1) THERMAL RUNAWAY scenarios — propagation prevention, fire-rated enclosures, escape routes; (2) BMS function — V/I/T monitoring per cell, balancing, fault detection, contactor control; (3) cell-level safety — over-V / under-V / over-T limits; (4) communication protocols — CAN bus / Modbus / proprietary; (5) commissioning tests — capacity baseline, BMS handshake, first cycle; (6) end-of-life + disposal — Li-ion-specific recycling. Pb-acid Part -2 covers hydrogen evolution (irrelevant for LFP) + electrolyte handling — different focus',
      'Customer\'s choice',
      'Same as Pb-acid',
    ],
    correctIndex: 1,
    explanation:
      'Part -5 (Li-ion stationary) addresses safety topics specific to lithium-ion chemistry that don\'t apply to Pb-acid: (1) THERMAL RUNAWAY — propagation prevention via cell-level fusing + fire-rated enclosures + escape routes (different from Pb-acid hydrogen-evolution risk); (2) BMS function — explicit cell-level monitoring + balancing + fault response (Pb-acid doesn\'t have cell-level BMS); (3) commissioning tests — BMS handshake, first cycle, capacity baseline (Pb-acid commissioning is electrolyte + V checks); (4) end-of-life recycling — Li-ion has different chemical hazards in disposal vs Pb-acid. Pb-acid Part -2 covers: hydrogen ventilation calc, electrolyte spill containment, equalisation overcharge procedures, monthly maintenance checks — all irrelevant for LFP. UK domestic LFP cert evidence bundle: Part -5 conformance via manufacturer certification.',
  },
  {
    id: 'm5s4-pas-location-rules',
    question:
      'PAS 63100:2024 location rules for UK domestic BESS — what are the key prohibitions and requirements?',
    options: [
      'No rules',
      'PROHIBITED locations: (a) habitable rooms — bedrooms, lounge, dining, kitchen; (b) main escape routes / hallways serving as escape; (c) directly above / below bedrooms with insufficient fire separation. REQUIREMENTS: (1) location accessible for maintenance + emergency response; (2) clearances from windows / doors / openings to habitable spaces (typically &gt;1 m); (3) interconnected smoke / heat detection in the BESS room + adjoining areas; (4) appropriate fire-rated separation if multi-occupancy; (5) signage per Reg 570.6.8.201/202. Typical acceptable: garage (preferred), utility room, outbuilding, fire-rated external enclosure',
      'Customer\'s choice',
      'Anywhere indoors',
    ],
    correctIndex: 1,
    explanation:
      'PAS 63100:2024 location rules are the most important install-level constraint for UK domestic BESS. PROHIBITED: habitable rooms (bedrooms, lounges, dining rooms, kitchens — places where people sleep or spend extended time); main escape routes; locations that would expose occupants in event of thermal runaway. REQUIREMENTS: maintenance + emergency-response accessibility; clearances from openings to habitable spaces (typically &gt;1 m, varies by manufacturer); interconnected smoke / heat detection; fire-rated separation in flats / multi-occupancy; signage. Typical UK acceptable locations: integral garage (most common), separate garage, utility room (with restrictions on adjoining bedrooms), outbuilding, fire-rated external enclosure (e.g. battery cabinet on external wall). Cert evidence bundle records the location decision + the PAS 63100 compliance evidence (photos, manufacturer clearance diagrams, smoke detector spec).',
  },
  {
    id: 'm5s4-pas-fire-detection',
    question:
      'PAS 63100:2024 fire detection requirements — what does it specify, and how does it integrate with the dwelling alarm?',
    options: [
      'No detection',
      'PAS 63100 requires smoke / heat detection IN the BESS location AND interconnection with the dwelling\'s main fire alarm where present. Specifics: (a) appropriate detector type for the location — smoke detector (typical) OR heat detector (where smoke false-alarms likely, e.g. dusty garage); (b) detector connected to mains-powered fire alarm circuit per BS 5839-6 grades; (c) battery backup per BS 5839-6; (d) interconnection — when BESS-room detector activates, dwelling alarm sounds; (e) testing per annual EICR + smoke alarm service schedule. Customer information pack includes the detector location + test procedure',
      'Customer\'s discretion',
      'Only for commercial',
    ],
    correctIndex: 1,
    explanation:
      'PAS 63100:2024 fire detection: mandatory in the BESS location for UK dwellings. Requirements: (1) detector type — smoke (typical living spaces) or heat (dusty garage / outbuilding where smoke false-alarms common); (2) detector grade — typically BS 5839-6 Grade D mains-powered with battery backup for new dwellings, Grade F (battery-only) acceptable for some existing dwelling adaptations; (3) interconnection — BESS-room detector must trigger the dwelling&rsquo;s main alarm so occupants are alerted; (4) location — manufacturer-specified clearances from BESS unit; (5) testing — annual customer test + periodic professional service. Modern UK practice: install BESS with the local smoke/heat detector wired into the dwelling fire alarm at install commissioning. Cert evidence bundle records the detector model + location + interconnection evidence + BS 5839-6 grade.',
  },
  {
    id: 'm5s4-manufacturer-cert',
    question:
      'How does the installer verify a BESS product\'s BS EN IEC 62485 conformance?',
    options: [
      'Trust the brand',
      'Read the manufacturer\'s product certification declaration. Reputable UK BESS brands (GivEnergy, Tesla, Sigenergy, FoxESS, Huawei, Enphase, BYD) publish: (a) Declaration of Conformity citing BS EN IEC 62485 parts applied; (b) test reports from accredited test labs (TÜV, UL, Intertek, etc.); (c) UKCA / CE marking documentation; (d) datasheets with safety + performance specs. Cert evidence bundle includes the manufacturer DoC + datasheet + the test certificate references. The installer doesn\'t test cells themselves — verifies via the manufacturer documentation',
      'Customer verifies',
      'No verification needed',
    ],
    correctIndex: 1,
    explanation:
      'Manufacturer certification is the installer\'s verification path. Reputable UK BESS brands publish: (1) Declaration of Conformity (DoC) listing all standards applied — BS EN IEC 62485 parts, BS EN 62619 (Li-ion safety), IEC 62133 (cell-level safety), product-specific standards; (2) accredited test lab reports (TÜV Rheinland, UL, Intertek, SGS, etc.) confirming testing; (3) UKCA marking (post-Brexit UK) or CE marking (Northern Ireland) — declaring conformity with relevant UK / EU regulations; (4) product datasheets with safety specs (V/I limits, T range, fault response, install requirements). Installer responsibility: collect this documentation at install + include in cert evidence bundle. Cell-level testing is the manufacturer\'s job; the installer verifies via paperwork. Cert evidence bundle is the long-term proof of compliance.',
  },
  {
    id: 'm5s4-overlap-summary',
    question:
      'For a UK domestic LFP BESS install, what\'s the FULL set of standards / specs / regs that apply?',
    options: [
      'Just BS 7671',
      'Integrated stack: (1) BS 7671:2018+A4:2026 Chapter 57 (regulatory framework); (2) BS 7671:2018+A4:2026 Chapter 82 (PEI integration where hybrid PV+BESS or multi-source); (3) BS EN IEC 62485-1 + -5 (international safety standard for Li-ion stationary batteries); (4) PAS 63100:2024 (UK domestic-specific install spec); (5) BS EN 62619 (Li-ion battery safety); (6) BS 5839-6 (fire detection in dwellings); (7) BS 5839 series (general fire detection if multi-occupancy); (8) Approved Document B (Building Regulations fire safety); (9) MCS MIS 3001 / 3002 (for grant-funded installs). The competent installer references all of these in the cert evidence bundle',
      'Customer\'s problem',
      'Just one standard',
    ],
    correctIndex: 1,
    explanation:
      'UK domestic LFP BESS install navigates an integrated standards stack: BS 7671 (Chapter 57 + Chapter 82) as the regulatory authority; BS EN IEC 62485 series as the international safety standard; PAS 63100:2024 as the UK-specific install spec; BS EN 62619 for Li-ion cell-level safety; BS 5839-6 for fire detection grades in dwellings; Approved Document B (Building Regulations Part B) for fire safety in dwellings; MCS MIS 3001 (PV install) + MIS 3002 (BESS) for grant-funded installs. The cert evidence bundle integrates compliance against each: BS 7671 design pack + electrical certificate; BS EN IEC 62485 manufacturer DoC; PAS 63100 install location + signage + fire detection evidence; BS EN 62619 manufacturer certification; BS 5839-6 detector spec + test certificate; AD-B compliance assessment; MCS certificate (where applicable). Customer handover includes references to each.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Customer install: 10 kWh GivEnergy LFP BESS in integral garage. Which standards / regs apply, and where do they each touch the install?',
    options: [
      'Just BS 7671',
      'Integrated stack: (1) BS 7671 Chapter 57 — regulatory framework, all Reg 570.x apply; (2) BS 7671 Chapter 82 — PEI integration (this is a PEI install with PV+BESS); (3) BS EN IEC 62485-1 + -5 — manufacturer product certification; (4) PAS 63100:2024 — install location (integral garage acceptable per UK rules), clearances, fire detection (smoke alarm in garage interconnected with dwelling alarm), signage; (5) BS EN 62619 — Li-ion cell safety, manufacturer cert; (6) BS 5839-6 — fire detection grade (D mains-powered for new build), interconnection; (7) Approved Document B — fire separation between garage and dwelling habitable space. Cert evidence bundle integrates all',
      'No standards apply',
      'Customer\'s choice',
    ],
    correctAnswer: 1,
    explanation:
      'Comprehensive standards stack for a UK domestic LFP BESS install in integral garage: BS 7671 (Chapter 57 protection regs + Chapter 82 PEI design); BS EN IEC 62485-1 (general battery safety) + -5 (Li-ion stationary); PAS 63100:2024 (location, clearances, fire detection, signage); BS EN 62619 (cell-level Li-ion safety); BS 5839-6 (smoke/heat detector grades in dwellings); Approved Document B (Building Reg Part B fire safety, including garage-to-habitable separation). Each touches a different aspect: regulatory framework (BS 7671), international product safety (62485, 62619), UK install spec (PAS 63100), fire detection (5839-6), fire-rated separation (AD-B). Cert evidence bundle records compliance against each. The competent installer treats this as a checklist at design + commissioning.',
  },
  {
    id: 2,
    question:
      'Customer wants the BESS in a small utility room that adjoins a master bedroom. PAS 63100 review?',
    options: [
      'Approve',
      'INVESTIGATE the adjoining-room concern. PAS 63100 prohibits installation in habitable rooms AND requires consideration of adjacent habitable rooms for fire propagation risk. If the utility room has a non-fire-rated common wall with the bedroom, this is a problem — thermal-runaway scenario could expose the bedroom occupants. Mitigation options: (a) relocate to safer location (integral garage if available); (b) upgrade the utility-room/bedroom wall to fire-rated construction (typically 30-minute rating per AD-B); (c) accept the risk after written customer-informed-decision (rare for compliant installs). Cert evidence bundle records the location decision + the PAS 63100 assessment',
      'Customer\'s decision',
      'No issue',
    ],
    correctAnswer: 1,
    explanation:
      'PAS 63100:2024 location rules consider not just the BESS room itself but also adjacent rooms. A utility room adjoining a bedroom is borderline: the utility room itself isn\'t habitable, but a thermal-runaway scenario could affect the bedroom through non-fire-rated walls. Assessment factors: (1) wall construction (timber stud + plasterboard vs fire-rated drywall / masonry); (2) door between utility + bedroom — fire-rated FD30 vs standard door; (3) ventilation paths between rooms; (4) escape route through the affected area. Mitigations: relocate to integral garage (best); upgrade wall to 30-min FR construction; install in fire-rated cabinet within utility room. The competent surveyor identifies the issue at site visit; cert evidence bundle records the assessment + the chosen mitigation. PAS 63100 explicitly addresses adjacent-room considerations.',
  },
  {
    id: 3,
    question:
      'A customer has an existing LFP BESS install commissioned in 2022 (before PAS 63100:2024). EICR-style review identifies no smoke detector in the BESS room. Is this a finding?',
    options: [
      'No finding',
      'YES — likely C3 (improvement recommended). The install pre-dates PAS 63100:2024 so wasn\'t retrospectively non-compliant when commissioned. However: best-practice expects updating to current standards where reasonable. EICR would record: &ldquo;PAS 63100:2024 not in force at original commissioning; current recommended practice requires smoke detector interconnected with dwelling alarm in BESS location. Recommend retrofit&rdquo;. C3 = recommend improvement, not immediate hazard. Customer informed; if they want to remediate, fit detector + record in cert evidence bundle',
      'C1 immediate danger',
      'Customer ignores it',
    ],
    correctAnswer: 1,
    explanation:
      'EICR coding for pre-PAS install: typically C3 (improvement recommended). The install was compliant when commissioned (2022, before PAS 63100:2024 effective). It doesn\'t become retrospectively non-compliant. However: EICR evaluates against current best practice as well as the standards in force at commission. Missing smoke detection in a current-practice context is a recommended improvement. C3 communicates this to the customer without implying immediate danger. C1 (immediate danger) would be for an actively-dangerous condition (live exposed parts, etc.). C2 (potentially dangerous) for a situation that could become dangerous. C3 captures the &ldquo;below current best practice but operating safely&rdquo; case. Cert evidence bundle records the EICR coding + any remediation undertaken.',
  },
  {
    id: 4,
    question:
      'Customer asks if their NEW BESS install needs UKCA marking or CE marking. What\'s the UK 2025-2026 position?',
    options: [
      'No marking needed',
      'UK 2025-2026: UKCA marking is the UK post-Brexit conformity mark for products sold in Great Britain (England, Scotland, Wales). CE marking remains valid for Northern Ireland (which follows EU rules) and is accepted in GB through transition arrangements. Most BESS manufacturers carry BOTH UKCA + CE markings to cover the whole UK market. The marking declares conformity with relevant UK / EU regulations covering electrical safety + EMC + radio (for any wireless interfaces). Cert evidence bundle includes the manufacturer\'s DoC citing the markings and the standards applied',
      'CE only',
      'Customer\'s choice',
    ],
    correctAnswer: 1,
    explanation:
      'UK conformity marking 2025-2026: UKCA (UK Conformity Assessed) is the post-Brexit mark for Great Britain. CE marking remains valid in Northern Ireland (still aligned with EU rules) and is accepted in GB during ongoing transition. Most BESS manufacturers carry both to cover the whole UK + EU. The marking declares conformity with: Electrical Equipment (Safety) Regulations 2016 (UK), Low Voltage Directive 2014/35/EU (EU), EMC Regulations 2016 + Directive 2014/30/EU, Radio Equipment Regulations 2017 + Directive 2014/53/EU (for wireless interfaces). Standards underlying the marking: BS EN IEC 62485 series, BS EN 62619, BS EN 61000 series (EMC), etc. Cert evidence bundle includes the manufacturer\'s DoC + the markings + the standards list.',
  },
  {
    id: 5,
    question:
      'A customer\'s BESS install in a flat (multi-occupancy building) — what additional PAS 63100 + Approved Document B considerations apply?',
    options: [
      'Same as single dwelling',
      'Multi-occupancy raises the bar significantly. PAS 63100: (1) fire-rated separation between BESS and other dwellings/common areas (typically 60-minute or 90-minute per the building&rsquo;s fire strategy); (2) consultation with the building&rsquo;s fire strategy and fire safety officer; (3) coordination with the building&rsquo;s fire alarm system; (4) potential planning permission or building regs application. Approved Document B + Building Regs: stricter rules in flats / shared buildings — fire spread between dwellings must be controlled; BESS introduces a fire load that must be assessed. Some buildings prohibit domestic BESS install in individual flats; commercial communal BESS may be the alternative',
      'No flats allowed',
      'Customer\'s choice',
    ],
    correctAnswer: 1,
    explanation:
      'BESS in flats / multi-occupancy = significantly higher bar than single dwelling. PAS 63100 + AD-B + fire strategy considerations: (1) fire-rated separation between the BESS and neighbouring dwellings + common areas — typically 60-min FR construction minimum, 90-min in higher-risk buildings; (2) fire strategy consultation — the building&rsquo;s overall fire strategy must accommodate the BESS; (3) building owner / managing agent involvement — they may have policies prohibiting individual BESS installs; (4) fire detection coordination — BESS local detector interconnected with the building alarm system; (5) planning permission may be needed; (6) Building Regulations notice (Part P / Part B) for the install. Some UK multi-occupancy buildings now prohibit individual BESS installs due to insurance + fire safety concerns. Alternative: commercial communal BESS at the building level. Cert evidence bundle records the multi-occupancy assessment + the chosen approach.',
  },
  {
    id: 6,
    question:
      'Reg 570.6.7.203 says BESS in dwellings must be installed taking account of PAS 63100. If PAS 63100 conflicts with the manufacturer instructions, which wins?',
    options: [
      'Customer chooses',
      'Both must be satisfied — neither alone is sufficient. Reg 570.6.7.203: &ldquo;taking account of manufacturer\'s instructions AND PAS 63100&rdquo;. If they appear to conflict, the more restrictive applies (taking the union of all requirements). In practice: manufacturer instructions tend to focus on product-specific safety (clearances, electrical, environmental); PAS 63100 focuses on UK domestic location + fire detection. They\'re generally complementary, not conflicting. Where genuine conflict exists, raise with manufacturer support + PAS 63100 query channel; document the resolution in the cert evidence bundle',
      'Manufacturer wins',
      'PAS 63100 wins',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 570.6.7.203 uses &ldquo;taking account of&rdquo; both — implying both must be satisfied. In practice the two rarely conflict because they cover complementary aspects: manufacturer instructions handle product-level safety (clearances, electrical config, environmental limits, mounting); PAS 63100 handles location-level UK domestic install practice (no habitable rooms, fire detection, signage, multi-occupancy). Where apparent conflict arises (e.g. manufacturer permits installation in a location PAS 63100 prohibits, or vice versa): the MORE RESTRICTIVE wins — the install satisfies BOTH. Real conflicts are rare; usually clarification reveals one or both was misread. Cert evidence bundle records the location decision + the compliance evidence for both manufacturer + PAS 63100.',
  },
  {
    id: 7,
    question:
      'A customer asks if their BESS commissioning needs to include any tests specific to BS EN IEC 62485-5 (Li-ion stationary). What does the standard require?',
    options: [
      'No specific tests',
      'Part -5 commissioning typically includes: (1) capacity baseline test — full charge then controlled discharge to BMS cut-off; record actual Ah delivered; comparison to nameplate; (2) BMS handshake — verify CAN bus / Modbus communication between BMS and PCE; verify limits published correctly; (3) first cycle — observe complete charge / discharge cycle for any anomalies; (4) cell balance check — confirm all cells finish within tolerance; (5) fault simulation — verify protective responses (over-V trip, comms loss, etc.); (6) warning notice verification — confirm all Reg 570.6.8.x notices in place; (7) cert evidence bundle assembly. Most modern UK BESS PCE includes a guided commissioning workflow that walks through these',
      'Customer\'s choice',
      'No tests',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN IEC 62485-5 commissioning for Li-ion stationary BESS includes specific tests beyond standard BS 7671 Part 6: (1) CAPACITY BASELINE — first full-charge-to-empty cycle measures actual usable Ah; records the baseline for future comparison (warranty + EICR tracking); (2) BMS HANDSHAKE — verifies communication between BMS and PCE; commissioning app typically shows the battery profile + max charge/discharge currents being respected; (3) FIRST CYCLE — observation for anomalies; modern BMS logs cell-level V trajectories; (4) BALANCE CHECK — at end of first full charge, all cells should be within manufacturer tolerance (~30-50 mV typical); (5) FAULT SIMULATION — manufacturer-guided test of over-V trip, comms-loss response (where supported); (6) NOTICES — all warning notices per Reg 570.6.8.x in place + photographed; (7) BUNDLE — cert evidence bundle assembled with commissioning records. Manufacturer apps (GivEnergy, Tesla, Sigenergy etc.) typically guide this workflow. Section 5.7 covers commissioning in depth.',
  },
  {
    id: 8,
    question:
      'For a hybrid PV+BESS install, the cert evidence bundle integrates multiple compliance packages. What\'s the typical bundle contents?',
    options: [
      'One certificate',
      'Comprehensive bundle: (1) MCS MIS 3002 PV design pack (Module 3 content); (2) Chapter 57 BESS design pack + manufacturer DoC + BS EN IEC 62485 + PAS 63100 compliance evidence (this module); (3) Chapter 82 PEI design pack (Module 4 Section 5); (4) BS EN 62446-1 PV commissioning records (Module 3 Section 7); (5) BESS commissioning records per BS EN IEC 62485-5 (Section 5.7); (6) EREC G98/G99/G100 paperwork + DNO confirmation (Module 4 Section 7); (7) BS 5839-6 fire detection + interconnection evidence; (8) Approved Document B compliance assessment; (9) UKCA / CE markings + manufacturer datasheets for each component; (10) customer information pack + handover record',
      'Customer\'s problem',
      'No bundle needed',
    ],
    correctAnswer: 1,
    explanation:
      'Hybrid PV+BESS cert evidence bundle is comprehensive — integrates multiple compliance packages: MCS MIS 3002 PV (Section 712); Chapter 57 BESS (manufacturer DoC + BS EN IEC 62485 + PAS 63100); Chapter 82 PEI design pack; BS EN 62446-1 PV commissioning; BS EN IEC 62485-5 BESS commissioning; EREC G98/G99/G100 + DNO; BS 5839-6 fire detection; AD-B fire safety; UKCA / CE markings; customer handover record. The bundle is the install&rsquo;s long-term legibility — supports future EICR, MCS audit, insurance claims, ownership transfer, fault investigation. Modern UK installers increasingly deliver this as a digital package alongside the paper certs. Customer handover includes a copy + access credentials for any manufacturer cloud portals.',
  },
];

const faqs = [
  {
    question: 'When did PAS 63100:2024 come into force and what triggered it?',
    answer:
      'PAS 63100:2024 published February 2024 by BSI. Triggered by the rapid growth of UK domestic BESS installs (~25,000/year in 2020 → ~100,000/year by 2024); installer practice varied widely; insurance industry concerns about fire risk in dwellings; high-profile incidents in EU + US prompted UK-specific install spec development. PAS 63100 fills the gap between BS 7671 (regulatory authority) and product-level standards (BS EN IEC 62485) — provides UK domestic-specific install spec. Reg 570.6.7.203 (A4:2026) explicitly references it for UK dwelling installs, giving PAS 63100 regulatory anchor through Chapter 57.',
  },
  {
    question: 'Is PAS 63100 mandatory or guidance?',
    answer:
      'PAS 63100:2024 is a Publicly Available Specification — not a regulation in itself. However, Reg 570.6.7.203 of BS 7671:2018+A4:2026 explicitly mandates &ldquo;taking account of PAS 63100&rdquo; for batteries in UK dwellings. So: PAS 63100 has indirect mandatory status via the BS 7671 reference. EICR / MCS audits expect PAS 63100 compliance for post-A4:2026 UK domestic BESS installs. Insurance providers increasingly require PAS 63100 compliance as a condition of cover. The competent installer treats it as mandatory.',
  },
  {
    question: 'BS EN IEC 62485-4 (small Li-ion) vs -5 (Li-ion stationary) — which applies to UK domestic BESS?',
    answer:
      'Part -5 (Li-ion stationary). Part -4 covers small Li-ion batteries (consumer / portable devices, hand tools, small backup systems). UK domestic BESS at 5-15 kWh is firmly in stationary territory — Part -5 applies. Part -5 covers cell-level safety, BMS function, thermal-runaway propagation prevention, fault detection, commissioning, end-of-life. Manufacturer product certification typically declares Part -5 conformance for UK domestic BESS. For very small backup / cabin LFP systems (~1-3 kWh portable): Part -4 may apply instead, but these are rarely in BS 7671 scope at all.',
  },
  {
    question: 'BS EN 62619 vs BS EN IEC 62485 — what\'s the difference?',
    answer:
      'BS EN 62619 = &ldquo;Secondary cells and batteries containing alkaline or other non-acid electrolytes — Safety requirements for secondary lithium cells and batteries, for use in industrial applications.&rdquo; CELL-LEVEL + BATTERY-PACK-LEVEL safety: thermal abuse testing, overcharge testing, short-circuit testing, mechanical tests. The product safety standard. BS EN IEC 62485 series = battery INSTALLATION safety — how the battery is installed in an electrical install. So: 62619 = the BATTERY is safe; 62485 = the INSTALL is safe. Both apply to UK BESS. Manufacturer certification declares both. Cert evidence bundle references both.',
  },
  {
    question: 'BS 5839-6 fire detection grades — which grade for BESS in UK domestic?',
    answer:
      'BS 5839-6 grades for fire detection in dwellings: Grade A (full system with control panel) — large / multi-occupancy; Grade B / C / D (variations with mains-powered detection + battery backup); Grade F (battery-only, simple). For new-build UK dwelling BESS install: typically Grade D (mains-powered detector with battery backup) interconnected with the dwelling alarm. For older dwellings adapting: Grade F may be acceptable for low-risk simple installs but Grade D recommended. Multi-occupancy / commercial-domestic mix: Grade A typically required. PAS 63100 references BS 5839-6; cert evidence bundle records the detector grade + installation evidence.',
  },
  {
    question: 'Does PAS 63100 apply to commercial / non-dwelling BESS installs?',
    answer:
      'No — PAS 63100:2024 is specifically &ldquo;for installation and safe use of battery energy storage systems in electrical installations of DWELLINGS&rdquo;. Commercial / industrial / non-dwelling BESS: PAS 63100 not directly applicable. Different compliance framework: Chapter 57 + Chapter 82 still apply (regulatory); BS EN IEC 62485 still applies (international); fire safety per the building&rsquo;s fire strategy + Building Regs Part B + insurance requirements; commercial BESS specifications (PAS 63100-2 for commercial under development at time of writing). Cert evidence bundle for commercial: BS 7671 design + manufacturer cert + fire strategy compliance + building specific requirements.',
  },
  {
    question: 'How does Approved Document B (Building Regs Part B) interact with BESS install?',
    answer:
      'AD-B is the UK Building Regulations Part B guidance — fire safety in buildings. Relevant to BESS: (1) fire separation between garage and habitable spaces (typical UK garage adjoining dwelling: 30-min FR construction required); (2) fire detection requirements in dwellings (cross-references BS 5839-6); (3) escape routes (BESS shouldn\'t obstruct or expose); (4) compartmentation in multi-occupancy buildings. For most UK domestic BESS in integral garage: AD-B already satisfied via standard garage construction (FR wall + FR door to dwelling). Multi-occupancy + commercial: more detailed AD-B compliance assessment. Cert evidence bundle records the AD-B compliance assessment.',
  },
  {
    question: 'Does the customer need to do anything to maintain PAS 63100 compliance over the install life?',
    answer:
      'Modest customer responsibilities: (1) keep the BESS room accessible — don\'t block with stored items; (2) maintain the smoke / heat detector (test monthly, replace battery as scheduled per BS 5839-6); (3) don\'t modify the install (no DIY enclosure changes, no relocation, no obstruction); (4) report any unusual smell / sound / heat from the BESS to the installer / manufacturer immediately; (5) annual self-check + 5-yearly professional EICR-style inspection. The cert evidence bundle includes a customer information sheet with these responsibilities. Most are common sense; the smoke detector maintenance is the most often-skipped item — installer should emphasise at handover.',
  },
  {
    question: 'How does MCS MIS 3002 relate to Chapter 57 + PAS 63100?',
    answer:
      'MCS MIS 3002 = the MCS scheme&rsquo;s install standard for solar PV (and increasingly BESS). MCS is the UK scheme for renewable energy installer certification + product certification — required for grant-funded installs (SEG, BUS, ECO4 etc.). MIS 3002 references BS 7671 + relevant standards + adds MCS-specific contractor requirements (training, quality systems, customer service). For an MCS-grant-funded BESS install: MIS 3002 design + commissioning + handover required ON TOP OF BS 7671 / Chapter 57 / PAS 63100 / BS EN IEC 62485. Cert evidence bundle includes MCS certificate + MIS 3002 compliance evidence. For non-grant installs: MCS optional but many customers still want MCS-certified contractor for quality assurance.',
  },
];

export default function RenewableEnergyModule5Section4() {
  const navigate = useNavigate();

  useSEO({
    title: 'BS EN IEC 62485 + PAS 63100 | Renewable Energy 5.4 | Elec-Mate',
    description:
      'BS EN IEC 62485 series (-1 general, -2 stationary Pb-acid, -5 Li-ion stationary) + PAS 63100:2024 (UK domestic install spec). Manufacturer certification, location rules, fire detection, integrated standards stack for UK domestic LFP BESS install.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 4 · BS 7671:2018+A4:2026 · Chapter 57"
            title="BS EN IEC 62485 series + PAS 63100:2024"
            description="The international product-safety standard family + the UK domestic install specification. -1 general, -2 stationary Pb-acid, -5 Li-ion stationary. PAS 63100 location rules, fire detection, signage. Reg 570.6.7.203 + 570.6.1.1.1 anchor both in Chapter 57."
            tone="yellow"
          />

          <TLDR
            points={[
              'BS EN IEC 62485 series — international safety standard family. Parts: -1 general; -2 stationary Pb-acid + VRLA + NiCd; -3 traction; -4 small Li-ion; -5 Li-ion stationary. Reg 570.6.1.1.1 mandates conformance to the relevant parts.',
              'For UK domestic LFP BESS: Part -1 (general principles) + Part -5 (Li-ion stationary) are the relevant parts. Manufacturer product certification declares conformance.',
              'Part -1 sets common safety principles: electrical, chemical, thermal, mechanical, maintenance. Part -5 adds Li-ion-specific: thermal runaway, BMS function, cell-level safety, commissioning, end-of-life.',
              'PAS 63100:2024 = &ldquo;Specification for the installation and safe use of BESS in electrical installations of dwellings.&rdquo; UK domestic-specific install spec published BSI 2024. Reg 570.6.7.203 explicitly references for dwellings.',
              'PAS 63100 location rules: NO habitable rooms (bedroom / lounge / dining / kitchen); NO main escape routes; clearances from windows / doors / openings; interconnected smoke / heat detection per BS 5839-6; signage; fire-rated separation for multi-occupancy.',
              'BS EN 62619 = cell-level + pack-level Li-ion safety (the BATTERY is safe). BS EN IEC 62485 = INSTALLATION safety (the INSTALL is safe). Both apply; manufacturer declares both.',
              'Integrated UK standards stack: BS 7671 (Chapter 57 + 82) + BS EN IEC 62485 series + PAS 63100:2024 + BS EN 62619 + BS 5839-6 + Approved Document B + MCS MIS 3002 (if grant-funded). Cert evidence bundle integrates all.',
              'Manufacturer certification path: Declaration of Conformity + accredited test lab reports (TÜV / UL / Intertek) + UKCA / CE marking + datasheets. Installer verifies via documentation; cell-level testing is manufacturer responsibility.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the BS EN IEC 62485 series parts (-1 / -2 / -5) and which apply to UK domestic LFP BESS.',
              'Apply PAS 63100:2024 UK domestic install location rules, clearances, fire detection requirements, signage.',
              'Cross-reference Reg 570.6.1.1.1 to BS EN IEC 62485 and Reg 570.6.7.203 to PAS 63100.',
              'Distinguish BS EN 62619 (cell + pack safety) from BS EN IEC 62485 (install safety); recognise both apply.',
              'Verify a BESS product\'s BS EN IEC 62485 conformance via manufacturer Declaration of Conformity + accredited test reports + UKCA / CE marking.',
              'Map the integrated UK standards stack for a domestic LFP BESS install — BS 7671, 62485, PAS 63100, 62619, 5839-6, AD-B, MCS.',
              'Apply BS 5839-6 fire detection grades + interconnection requirements for the BESS room.',
              'Recognise multi-occupancy / flat-install constraints requiring fire-rated separation + fire strategy consultation.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>Chapter 57 = framework. BS EN IEC 62485 = product safety. PAS 63100 = UK domestic install. All three matter.</Pullquote>

          <ContentEyebrow>BS EN IEC 62485 series — five parts</ContentEyebrow>

          <ConceptBlock
            title="The BS EN IEC 62485 family"
            plainEnglish="BS EN IEC 62485 is a multi-part international standard covering safety of secondary batteries and battery installations. Five parts cover different chemistries / applications. Reg 570.6.1.1.1 (Chapter 57) mandates BESS installations conform to the relevant parts."
            onSite="For UK domestic LFP BESS, Part -1 (general) + Part -5 (Li-ion stationary) are the directly relevant parts. Manufacturer product certification declares which parts applied. For legacy Pb-acid off-grid, Part -1 + Part -2 apply. The installer verifies conformance via the manufacturer Declaration of Conformity + accredited test reports."
          >
            <p>The five parts:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Part -1 General safety information</strong> — common safety principles across all secondary battery installations: electrical safety, chemical safety, thermal safety, mechanical safety, maintenance procedures. Foundation for the chemistry-specific parts</li>
              <li><strong className="text-white">Part -2 Stationary batteries</strong> — Pb-acid (VRLA, GEL), NiCd, alkaline. Covers hydrogen ventilation calculations (Annex A), equalisation procedures, electrolyte handling, monthly maintenance</li>
              <li><strong className="text-white">Part -3 Traction batteries</strong> — industrial trucks (forklifts), AGVs (automated guided vehicles). Not relevant for UK domestic</li>
              <li><strong className="text-white">Part -4 Small Li-ion batteries</strong> — consumer / portable Li-ion, hand tools, small backup. Generally not BS 7671 scope; manufacturer-level product safety</li>
              <li><strong className="text-white">Part -5 Li-ion stationary</strong> — the part directly applicable to UK domestic LFP BESS. Covers: thermal-runaway prevention + propagation, BMS function, cell-level safety, commissioning tests, end-of-life</li>
            </ul>
            <p>The competent installer references the applicable parts in the cert evidence bundle. UK domestic LFP: Part -1 + Part -5. Legacy Pb-acid off-grid: Part -1 + Part -2.</p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 570.6.1.1.1 — BS EN IEC 62485 conformance"
            clause="Stationary secondary battery installations shall conform to the relevant parts of the BS EN IEC 62485 series. Where appropriate, bidirectional protective devices shall be selected."
            meaning="Reg 570.6.1.1.1 is the anchor reg tying UK BS 7671 to the international BS EN IEC 62485 series. &ldquo;Relevant parts&rdquo; means whichever parts apply to the specific install: -1 + -5 for UK domestic LFP; -1 + -2 for Pb-acid. Manufacturer product certification declares conformance — the installer verifies via the Declaration of Conformity + accredited test reports. The bidirectional protective device clause pairs with Reg 826.1.2.2 (Chapter 82) for hybrid PV+BESS where current flows either direction. Cert evidence bundle records the 62485 conformance evidence per applicable parts."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[2]} />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>PAS 63100:2024 — UK domestic install spec</ContentEyebrow>

          <Pullquote>PAS 63100: no habitable rooms. Smoke detection. Signage. The UK domestic install rulebook.</Pullquote>

          <ConceptBlock
            title="PAS 63100:2024 — what it is and what it covers"
            plainEnglish="PAS 63100:2024 = &ldquo;Specification for the installation and safe use of battery energy storage systems in electrical installations of dwellings.&rdquo; A UK-specific Publicly Available Specification published by BSI in 2024. Provides the install-level guidance that Chapter 57 + manufacturer instructions don&rsquo;t cover in full. Reg 570.6.7.203 explicitly cross-references it for dwellings."
            onSite="UK domestic BESS install must comply with Chapter 57 (regulatory framework) AND PAS 63100 (install detail). The two are complementary; PAS 63100 fills the gap between the regulatory framework and product-level safety. Insurance providers + MCS audits increasingly require PAS 63100 compliance."
          >
            <p>PAS 63100 coverage areas:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Install location</strong> — prohibited rooms (habitable spaces), permitted locations (garage, utility, outbuilding, fire-rated external), adjacent-room considerations</li>
              <li><strong className="text-white">Clearances</strong> — from windows / doors / openings to habitable spaces (typically &gt;1 m); from ignition sources; from fuel storage</li>
              <li><strong className="text-white">Fire detection</strong> — smoke / heat detector required in BESS location; BS 5839-6 grade; interconnection with dwelling alarm; testing schedule</li>
              <li><strong className="text-white">Signage</strong> — supports Reg 570.6.8.x warning notices; specific wording + placement + visibility</li>
              <li><strong className="text-white">Multi-occupancy considerations</strong> — fire-rated separation, fire strategy consultation, building-level coordination</li>
              <li><strong className="text-white">Commissioning</strong> — install verification, customer handover, documentation requirements</li>
              <li><strong className="text-white">Customer information pack</strong> — operating instructions, maintenance schedule, emergency procedures, manufacturer support contacts</li>
              <li><strong className="text-white">Maintenance + inspection</strong> — periodic inspection schedule, customer responsibilities</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="PAS 63100 location rules — the most important constraint"
            plainEnglish="The single most important PAS 63100 rule for UK domestic BESS install: NO HABITABLE ROOMS. The BESS cannot be installed in any space where people sleep, live, or spend extended time. This is not a manufacturer preference — it&rsquo;s a UK install requirement reflecting the fire-safety reality of Li-ion thermal runaway."
            onSite="UK domestic BESS install location decision is made at survey. The competent surveyor identifies a compliant location BEFORE quoting; raises any concerns with the customer; offers alternatives if the customer&rsquo;s preferred location isn&rsquo;t suitable. Cert evidence bundle records the location + the PAS 63100 compliance evidence."
          >
            <p>Location rules in detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">PROHIBITED — habitable rooms</strong> — bedrooms, lounge, dining, kitchen, study/office, any room where people regularly sleep / live / work</li>
              <li><strong className="text-white">PROHIBITED — main escape routes</strong> — corridors / hallways used as primary escape from upper floors</li>
              <li><strong className="text-white">PROHIBITED — under stairs in dwellings</strong> — restricts access in event of incident</li>
              <li><strong className="text-white">PREFERRED — integral garage</strong> — fire-rated separation from dwelling already provided by Building Regs; good ventilation; accessible</li>
              <li><strong className="text-white">ACCEPTABLE — utility room</strong> — if separated by fire-rated construction from habitable spaces; clearances respected; ventilation adequate</li>
              <li><strong className="text-white">ACCEPTABLE — outbuilding</strong> — separate from dwelling; weatherproof; accessible; signage</li>
              <li><strong className="text-white">ACCEPTABLE — fire-rated external enclosure</strong> — purpose-built cabinet on external wall; weatherproof; ventilated</li>
              <li><strong className="text-white">Adjacent-room consideration</strong> — even in acceptable locations, consider thermal-runaway exposure to adjacent rooms; fire-rated walls preferred</li>
              <li><strong className="text-white">Multi-occupancy / flat</strong> — significantly higher bar; fire-rated separation 60-90 min; fire strategy consultation; possible building-level prohibition</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 570.6.7.203 — PAS 63100 reference for dwellings"
            clause="Stationary secondary batteries in dwellings shall be installed in a suitable location taking account of manufacturer&rsquo;s instructions and PAS 63100. In other premises, the location of storage batteries and fire protection requirements shall be selected taking into account the fire strategy for the premises."
            meaning="Reg 570.6.7.203 is the regulatory anchor for PAS 63100:2024 in UK domestic BESS installs. &ldquo;Taking account of&rdquo; means both manufacturer instructions AND PAS 63100 — both must be satisfied. For dwellings: PAS 63100 is the operational rulebook. For other premises (commercial, industrial, multi-occupancy): the building&rsquo;s fire strategy is the reference; PAS 63100 doesn&rsquo;t directly apply but its principles inform best practice. Cert evidence bundle for dwelling install records both: PAS 63100 compliance evidence (location, clearances, fire detection, signage) AND manufacturer install instructions evidence (clearances, mounting, environmental)."
          />

          <DiagramPlaceholder
            caption="Standards stack diagram for UK domestic LFP BESS — vertical layer cake. Bottom layer: BS EN 62619 (cell + pack safety, the BATTERY is safe). Second layer: BS EN IEC 62485 series — Part -1 (general safety) + Part -5 (Li-ion stationary, the INSTALL is safe). Third layer: BS 7671:2018+A4:2026 Chapter 57 (regulatory framework, Reg 570.x). Fourth layer: BS 7671 Chapter 82 (PEI integration, Reg 826.x) where hybrid PV+BESS or multi-source. Fifth layer: PAS 63100:2024 (UK domestic install specification). Sixth layer: BS 5839-6 (fire detection grades). Top layer: Approved Document B (Building Regulations Part B, fire safety). Plus MCS MIS 3002 sidebar where grant-funded. Cert evidence bundle integrates all layers."
            filename="renewable/m5s4-standards-stack.png"
          />

          <InlineCheck {...inlineChecks[1]} />

          <InlineCheck {...inlineChecks[4]} />

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>Manufacturer certification + verification</ContentEyebrow>

          <Pullquote>Manufacturer DoC + test reports + UKCA/CE marking. The installer verifies via paperwork — not cell-by-cell.</Pullquote>

          <ConceptBlock
            title="How the installer verifies BS EN IEC 62485 conformance"
            plainEnglish="The installer doesn&rsquo;t test individual cells — that&rsquo;s the manufacturer&rsquo;s job. The installer verifies via the manufacturer&rsquo;s product certification documentation. Reputable UK BESS brands publish a Declaration of Conformity (DoC) + accredited test lab reports + UKCA / CE marking."
            onSite="Cert evidence bundle includes: (a) manufacturer DoC; (b) accredited test report summaries (TÜV / UL / Intertek); (c) UKCA / CE marking documentation; (d) datasheets with safety + performance specs. The installer collects these at install and integrates into the bundle for customer handover."
          >
            <p>Verification path:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Manufacturer Declaration of Conformity (DoC)</strong> — formal statement listing all standards applied: BS EN IEC 62485 parts, BS EN 62619, IEC 62133 (cell safety), product-specific standards. Signed by the manufacturer&rsquo;s authorised representative</li>
              <li><strong className="text-white">Accredited test lab reports</strong> — TÜV Rheinland, UL, Intertek, SGS, BSI — accredited bodies that test the product against the relevant standards. Manufacturer references the test report number + lab in the DoC</li>
              <li><strong className="text-white">UKCA marking</strong> — UK post-Brexit conformity assessment. Declares compliance with UK regulations: Electrical Equipment (Safety) Regulations 2016, EMC Regulations 2016, Radio Equipment Regulations 2017</li>
              <li><strong className="text-white">CE marking</strong> — EU conformity mark. Valid for Northern Ireland; accepted in GB during transition. Many BESS carry both UKCA + CE</li>
              <li><strong className="text-white">Product datasheets</strong> — safety specs (V/I limits, T range, fault response); install requirements (clearances, mounting); performance specs (capacity, cycle life, warranty)</li>
              <li><strong className="text-white">Installer&rsquo;s job</strong> — collect these documents at install delivery; verify product matches the DoC; include in cert evidence bundle</li>
              <li><strong className="text-white">Customer handover</strong> — DoC + datasheet copy + manufacturer support contact in customer information pack</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[6]} />

          <InlineCheck {...inlineChecks[7]} />

          <SectionRule />

          <ContentEyebrow>What it looks like in the wild</ContentEyebrow>

          <Scenario
            title="UK domestic LFP install — comprehensive standards stack compliance"
            situation="Customer wants 10 kWh GivEnergy LFP BESS in integral garage, alongside existing 5 kWp PV. Install Q2 2026 (post-A4:2026 effective)."
            whatToDo="Comprehensive standards-stack compliance package: (1) BS 7671 Chapter 57 — apply all Reg 570.x sub-clauses (Section 5.3 covered); (2) BS 7671 Chapter 82 — PEI design pack covers operating modes, multi-source isolation, bidirectional OCPDs, transient protection (Module 4 Section 5); (3) BS EN IEC 62485-1 + -5 — verify GivEnergy DoC + accredited test reports (TÜV typically); include in bundle; (4) PAS 63100:2024 — integral garage acceptable per UK rules; clearances per GivEnergy + PAS 63100 (typically 200-500 mm sides, 200-300 mm above; &gt;1 m from windows / doors to habitable spaces); interconnected smoke detector (BS 5839-6 Grade D) in garage + interconnection to dwelling alarm; PAS 63100 signage; (5) BS EN 62619 — GivEnergy cell certification, included in DoC; (6) BS 5839-6 — Grade D detector spec + interconnection evidence; (7) Approved Document B — integral garage FR construction per existing Building Regs satisfies separation from habitable; (8) UKCA + CE markings on GivEnergy DoC; (9) Reg 570.6.8.x warning notices at origin + metering + CU + battery enclosure + PCE; (10) MCS MIS 3002 design pack (if grant-funded). Cert evidence bundle: ~30-50 page PDF integrating all standards + photos + certificates."
            whyItMatters="Modern UK domestic BESS install in 2025-2026 navigates an integrated standards stack. The competent installer treats each layer (Chapter 57, 62485, PAS 63100, 62619, 5839-6, AD-B, MCS) as a checklist; cert evidence bundle integrates all into one customer-handover package. Missing layers = EICR / MCS audit findings; reputation + insurance issues. UK 2025-2026 install practice: comprehensive, documented, traceable."
          />

          <Scenario
            title="Multi-occupancy flat install — significantly higher bar"
            situation="Customer in a 4-storey block of flats wants 10 kWh LFP BESS in their own utility room (top floor). Building managing agent neutral; building&rsquo;s fire strategy from 2018 doesn&rsquo;t mention BESS."
            whatToDo="Significantly higher compliance bar than single dwelling. (1) PAS 63100 multi-occupancy considerations — fire-rated separation between the BESS and other flats / common areas; typically 60-min FR minimum, 90-min in higher-risk buildings; (2) consultation with the building&rsquo;s fire strategy author — if 2018 strategy doesn&rsquo;t mention BESS, formal addendum may be needed; (3) building managing agent + insurance — confirm policies allow individual BESS install; some buildings now prohibit; (4) BS 5839-6 grade may need to be higher (Grade A for some multi-occupancy); (5) potentially Building Regs application for material change to the flat. Cert evidence bundle: ALL the single-dwelling content PLUS fire strategy addendum + managing-agent agreement + Building Regs notice (if applicable). Total compliance cost: significantly higher than single dwelling — typically £500-1,500 extra for the additional assessments + documentation."
            whyItMatters="Multi-occupancy is the most complex UK domestic BESS install context. PAS 63100 explicitly addresses it; AD-B fire-spread provisions are stricter; insurance providers + building owners increasingly cautious. The competent installer raises the higher bar with the customer EARLY — sometimes the right answer is &ldquo;not in this building&rdquo;. Cert evidence bundle records the multi-occupancy assessment + the chosen approach + all supporting documentation."
          />

          <CommonMistake
            title="Installer assumes BS EN IEC 62485 conformance from brand reputation alone"
            whatHappens="Installer fits a BESS from a reputable UK brand without collecting the manufacturer Declaration of Conformity. Customer&rsquo;s cert evidence bundle has the install certs + datasheets but no DoC. Later EICR / MCS audit asks for the DoC; installer scrambles to obtain it from the manufacturer (sometimes weeks of delay); install is technically non-compliant during the gap."
            doInstead="ALWAYS collect manufacturer DoC at install delivery. Reputable UK brands publish DoCs on their product pages or in their installer portals — typically 1-2 page PDF per product. Include in cert evidence bundle from day one. Reg 570.6.1.1.1 mandates BS EN IEC 62485 conformance; the DoC is the verification evidence. Without it the install is undocumented for compliance purposes. Cert evidence bundle is a forward-looking document — the install&rsquo;s long-term legibility depends on completeness at handover."
          />

          <CommonMistake
            title="Skipping the BS 5839-6 smoke detector interconnection at BESS commissioning"
            whatHappens="Installer fits a smoke detector in the BESS room (integral garage) but doesn&rsquo;t interconnect it with the dwelling&rsquo;s main fire alarm. Customer sleeps upstairs; in event of garage BESS fire alarm, customer wouldn&rsquo;t hear it. PAS 63100 requires interconnection. EICR finding C2 (potentially dangerous — fire safety compromised)."
            doInstead="PAS 63100 + BS 5839-6 require BESS-room detector INTERCONNECTED with the dwelling alarm. Modern dwellings typically have mains-powered interconnected smoke alarms (BS 5839-6 Grade D); the BESS detector wired into the same loop. For older dwellings: install new interconnected alarm system or use radio-interconnected detectors (BS 5839-6 Grade D with radio-link option). Cert evidence bundle records the detector model + the interconnection evidence + a test record at commissioning. The customer hears the alarm wherever they are in the dwelling."
          />

          <CommonMistake
            title="Treating PAS 63100 as &ldquo;guidance not regulation&rdquo; and skipping compliance"
            whatHappens="Installer reads PAS 63100 as &ldquo;guidance&rdquo; (technically a Publicly Available Specification, not a regulation in itself) and skips parts of it — e.g. allows install in a small utility room adjoining a bedroom. Customer&rsquo;s install operates; insurance survey 6 months later flags PAS 63100 non-compliance; insurance refused or premium increased substantially."
            doInstead="PAS 63100:2024 has indirect mandatory status via Reg 570.6.7.203 of BS 7671:2018+A4:2026 — &ldquo;taking account of PAS 63100&rdquo;. EICR + MCS audits + insurance + warranty all expect PAS 63100 compliance. The competent installer treats PAS 63100 as effectively mandatory for UK domestic BESS installs. Cert evidence bundle records compliance against PAS 63100 + manufacturer instructions + Chapter 57 — the integrated compliance package is the customer&rsquo;s long-term protection."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'BS EN IEC 62485 series — international safety standard for secondary batteries + installations. Five parts: -1 general; -2 stationary Pb-acid; -3 traction; -4 small Li-ion; -5 Li-ion stationary.',
              'For UK domestic LFP BESS: Part -1 + Part -5 apply. For legacy Pb-acid off-grid: Part -1 + Part -2. Manufacturer product certification declares conformance per applicable parts.',
              'Reg 570.6.1.1.1 mandates BS EN IEC 62485 conformance + bidirectional protective devices. The anchor reg tying UK BS 7671 to the international standard family.',
              'PAS 63100:2024 = &ldquo;Specification for the installation and safe use of BESS in electrical installations of dwellings.&rdquo; UK-specific install spec published BSI 2024.',
              'Reg 570.6.7.203 explicitly references PAS 63100 for UK dwellings. PAS 63100 has indirect mandatory status via this cross-reference.',
              'PAS 63100 location rules: NO habitable rooms; NO main escape routes; clearances from openings to habitable; interconnected smoke/heat detection per BS 5839-6; signage; multi-occupancy fire-rated separation.',
              'Acceptable UK domestic locations: integral garage (preferred), utility room (with restrictions on adjacent habitable), outbuilding, fire-rated external enclosure.',
              'BS EN 62619 = cell-level + pack-level Li-ion safety (the BATTERY is safe). BS EN IEC 62485 = INSTALLATION safety (the INSTALL is safe). Both apply; manufacturer certifies both.',
              'Manufacturer verification path: Declaration of Conformity + accredited test reports (TÜV / UL / Intertek) + UKCA / CE marking + datasheets. Installer collects + includes in cert evidence bundle.',
              'Integrated UK standards stack for domestic LFP BESS install: BS 7671 (Chapter 57 + 82) + BS EN IEC 62485 series + PAS 63100:2024 + BS EN 62619 + BS 5839-6 + Approved Document B + MCS MIS 3002 (where grant-funded). Cert evidence bundle integrates all.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 4 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-5-section-3')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 3
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Chapter 57 protection deep dive
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-5-section-5')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.5 Fire safety + thermal runaway
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
