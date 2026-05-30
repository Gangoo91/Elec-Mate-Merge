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
    id: 'm12s8-renewable-electrician-identity',
    question:
      'What does it mean to be a "Renewable Electrician" beyond standard electrician scope?',
    options: [
      'Same scope',
      'The Renewable Electrician combines: (1) BS 7671 18th Edition + A4:2026 foundation (the baseline competency); (2) LCT-specific competencies — Section 712 PV, Chapter 57 BESS, Section 722 EV, Section 551 generating sets, Reg 722.411.4 outdoor LCT, Chapter 65 EICR-equivalent; (3) manufacturer-certified-installer status across relevant technologies; (4) multi-trade coordination ability (MCS company, refrigerant specialist, civils, planning); (5) systems thinking — multi-source integration vs technology-by-technology. The identity is BS 7671 expert + LCT specialist + customer-facing professional + lifecycle thinker',
      'Random',
      'Just PV',
    ],
    correctIndex: 1,
    explanation:
      'Renewable Electrician identity components: (1) BS 7671 18th Edition + A4:2026 foundation — the baseline competency is fully-qualified electrician with current standard knowledge; not a separate trade but a deepening + specialisation. (2) LCT-specific competencies — across the technologies covered in this course: Section 712 (PV M2-M4), Chapter 57 (BESS M5), Section 722 (EV M6-M7), Part 4-7 + manufacturer (heat pumps M8), Section 551 generating sets (other LCT M9), Chapter 82 PEI + integration (M10), Chapter 81 + lightning + fault (M11), Chapter 64 + 65 verification + EICR-equivalent (M12). (3) Manufacturer-certified-installer status — most LCT manufacturers require certified installer training for warranty + commissioning; the Renewable Electrician maintains current certification across the relevant manufacturers. (4) Multi-trade coordination — MCS company orchestrates; refrigerant specialist (F-gas) for heat pumps; civils + Environment Agency for hydro; planning + structural for wind; the electrician integrates the BS 7671 install with the technology-specific trades. (5) Systems thinking — multi-source LCT is not the sum of technologies but an integrated energy system; the Renewable Electrician designs + verifies + supports the integration. (6) Customer-facing — handover + ongoing engagement + lifecycle management = relationship + business. (7) UK 2025-26 market reality: shortage of competent Renewable Electricians vs demand; rates + opportunities reflect this; the identity is professionally + commercially valuable.',
  },
  {
    id: 'm12s8-course-synthesis',
    question:
      'How do M1-M11 + M12 fit together in the Renewable Electrician\'s mental model?',
    options: [
      'Linear list',
      'Layered model: M1 = renewable / LCT landscape + decarbonisation context (the why). M2-M4 = PV (the dominant LCT, foundational + most-frequent install). M5 = BESS (storage, increasingly paired with PV). M6-M7 = EV charging (mass-market growth path). M8 = heat pumps (the heating decarbonisation pillar, BUS-grant-driven). M9 = other LCT (wind, solar thermal, biomass, CHP, hydro, hydrogen). M10 = hybrid + EMS + smart export (multi-source integration). M11 = Chapter 81 + lightning + fault levels (regulatory framework integration). M12 = verification + EICR + handover (lifecycle discipline). All under BS 7671:2018+A4:2026 + the cert evidence bundle audit trail',
      'Random',
      'Reverse order',
    ],
    correctIndex: 1,
    explanation:
      'M1-M12 layered mental model: (1) M1 Foundations — renewable / LCT landscape + UK decarbonisation context + regulatory frameworks (BS 7671, MCS, EREC G98 / G99, BUS, SEG); sets the why + the system. (2) M2-M4 Solar PV — dominant LCT in UK 2025-26 + foundational install pattern; Section 712 + Reg 712.421.101 IMD + anti-islanding + EREC + MIS 3002. (3) M5 BESS — storage increasingly paired with PV; Chapter 57 + Section 551 + BMS lifecycle. (4) M6-M7 EV charging — mass-market growth path; Section 722 + Reg 722.411.4 + OPDD + RDC-DD. (5) M8 Heat pumps — heating decarbonisation pillar; BUS grant gateway; Part 4-7 + manufacturer commissioning + MIS 3005. (6) M9 Other LCT — wind / solar thermal / biomass / CHP / hydro / hydrogen; Section 551 unifying framework + per-MIS technology standards. (7) M10 Hybrid + EMS + smart export — multi-source integration; Chapter 82 PEI; SEG + EREC G100; V2G; grid-forming. (8) M11 Chapter 81 + lightning + fault levels — regulatory framework integration + BS EN 62305 LPS + fault contribution from multi-source. (9) M12 Verification + EICR + handover — lifecycle discipline; Chapter 64 IV + Chapter 65 EICR + MCS handover pack + customer education + cert evidence bundle. (10) Cross-cutting: BS 7671:2018+A4:2026 throughout + cert evidence bundle audit trail + skilled-person competency + customer-facing professional standard. (11) The layered model means each module deepens specific competency while contributing to the integrated Renewable Electrician identity.',
  },
  {
    id: 'm12s8-mock-exam-purpose',
    question:
      'What does the upcoming mock exam aim to assess?',
    options: [
      'Memorisation only',
      'The mock exam assesses applied competency across M1-M12: (1) regulatory knowledge — reg cites + meaning + application (Section 712 / Chapter 57 / Section 722 / Section 551 / Chapter 64 / Chapter 65); (2) technology-specific scenarios — PV / BESS / EV / heat pump / wind / hydro / CHP / hydrogen; (3) multi-source integration — Chapter 82 PEI + Reg 551.4.2 + Reg 551.7.5; (4) verification + EICR-equivalent + cert evidence bundle; (5) customer-facing scenarios — handover + fault response + lifecycle. Not memorisation — applied judgement on real-world install + verification + lifecycle problems',
      'Random',
      'Pure theory',
    ],
    correctIndex: 1,
    explanation:
      'Mock exam structure + purpose: (1) Regulatory knowledge — reg cites + meaning + application across the BS 7671 + LCT framework; Section 712 PV; Chapter 57 BESS; Section 722 EV; Section 551 generating sets; Chapter 64 IV; Chapter 65 EICR; Reg 722.411.4 outdoor LCT; Reg 712.421.101 IMD; Reg 551.7.5 anti-islanding; Reg 415.1 RCD; Reg 642 / 643 inspection + testing. (2) Technology-specific scenarios — applied problems on PV / BESS / EV / heat pumps / wind / solar thermal / biomass / CHP / micro-hydro / hydrogen + emerging LCT. (3) Multi-source integration — Chapter 82 PEI; Reg 551.4.2 multi-source RCD effectiveness; coordinated architecture; integrated EICR-equivalent. (4) Verification + EICR + cert evidence bundle — Chapter 64 IV procedures; Chapter 65 periodic; classification codes (C1/C2/C3/FI); MCS handover pack; cert evidence bundle integration. (5) Customer-facing scenarios — handover meeting; fault response; warranty events; property sale transitions. (6) Format — applied judgement on realistic install + verification + lifecycle problems; not memorisation. (7) Preparation — review M1-M12 systematically; practice scenario application; consolidate the integrated mental model; cert evidence bundle thinking. (8) Outcome — passing the mock exam validates the Renewable Electrician competency; supports professional standing + customer + manufacturer + DNO + Ofgem credibility.',
  },
  {
    id: 'm12s8-cpd-beyond-course',
    question:
      'What continued professional development (CPD) is appropriate beyond this course?',
    options: [
      'Nothing',
      'CPD beyond this course: (1) BS 7671 amendments — A4:2026 may be followed by future amendments; track + study + apply; (2) MCS standard updates — MIS 3001-3008 evolve; product approval lists updated; track; (3) manufacturer-certified-installer training — maintain certifications + new manufacturer products + technology evolutions; (4) emerging LCT — hydrogen, fuel cells, V2G, grid-forming inverters, advanced BMS chemistries; (5) industry CPD — IET, NICEIC, ECA, IEEE conferences + courses; (6) hands-on practice — install + verification + EICR experience builds competency; (7) cert evidence bundle review — your own installs taught backwards; (8) peer + manufacturer + DNO engagement — community learning',
      'Random',
      'Already finished',
    ],
    correctIndex: 1,
    explanation:
      'CPD beyond this course: (1) BS 7671 amendments — A4:2026 is current at course writing 2026-05-29; future amendments will follow (A5, future editions); track via IET, NICEIC, ECA publications; study + apply. (2) MCS standard updates — MIS 3001-3008 evolve as technologies mature; product approval lists updated frequently; track via MCS website + installer membership. (3) Manufacturer-certified-installer training — most LCT manufacturers offer ongoing courses + product updates + new technology training (Tesla, GivEnergy, Sonnen, Solis, Fronius, Mitsubishi, Daikin, Vaillant, Zappi, Ohme, etc); maintain certification cycles. (4) Emerging LCT — hydrogen + fuel cells + V2G bidirectional + grid-forming inverters + advanced BMS chemistries (solid-state, sodium-ion); the field continues to evolve. (5) Industry CPD — IET (Institution of Engineering + Technology) member CPD + Solar Energy UK + Heat Pump Federation + electric vehicles industry bodies + NICEIC + ECA + IEEE conferences + IET Wiring Regulations conferences. (6) Hands-on practice — install + verification + EICR experience builds tacit competency that complements formal knowledge; deliberate reflection on completed installs. (7) Cert evidence bundle review — your own installs over time provide rich learning when reviewed at EICR-equivalent + warranty events. (8) Peer + manufacturer + DNO engagement — community learning from other installers + manufacturer technical support + DNO connection engineers. (9) UK 2025-26 reality: LCT field is dynamic; CPD is competitive advantage + safety imperative + customer-protection responsibility.',
  },
];

const quizQuestions = [
  {
    question:
      'Course recap synthesis: what are the BS 7671 regs MOST frequently cited across M1-M12?',
    options: [
      'Random',
      'Top cross-cutting regs: (1) Reg 411.4 / 411.5 ADS + earthing arrangements; (2) Reg 415.1 30 mA RCD additional protection; (3) Reg 531.3.3 Type AC restriction + Type B / RDC-DD selection; (4) Reg 551.7.5 anti-islanding; (5) Reg 551.7.2.1 supply-side connection + BESS as generating set; (6) Reg 551.4.2 multi-source RCD effectiveness; (7) Reg 641.1-644.5 initial verification; (8) Reg 651-653 periodic inspection; (9) Reg 712.421.101 PV IMD; (10) Reg 722.411.4 outdoor EV PME restriction; (11) Reg 643.3 IR + Table 64. These regs anchor the LCT framework',
      'Only one reg',
      'No pattern',
    ],
    correctAnswer: 1,
    explanation:
      'Top cross-cutting regs across M1-M12: (1) Reg 411.4 + 411.5 ADS — fundamental fault protection across all LCT circuits; loop impedance + ADS time verified per Reg 643.7. (2) Reg 415.1 — 30 mA RCD additional protection; categorical for LCT circuits. (3) Reg 531.3.3 — Type AC restriction + matched-type selection (Type A + RDC-DD or Type B per LCT electronics). (4) Reg 551.7.5 — anti-islanding for generating sets; M2-M4 PV + M5 BESS + M9 wind / CHP / hydro all subject. (5) Reg 551.7.2.1 — supply-side connection + BESS as generating set. (6) Reg 551.4.2 — multi-source RCD effectiveness across combinations; critical for M10 integration + M12 verification. (7) Reg 641.1-644.5 — initial verification framework; M12 Section 1 core. (8) Reg 651-653 — periodic inspection + EICR; M12 Sections 3 + 5 core. (9) Reg 712.421.101 — PV IMD; M2-M4 + M12 Section 2. (10) Reg 722.411.4 — outdoor EV PME restriction; M6-M7 + M12 Section 4; A4:2026 deleted the former indent (a) so methods are now lettered (b)–(e). (11) Reg 643.3 + Table 64 — IR testing; M12 Section 2 DC IR focus. (12) Other regs heavily referenced: Reg 712.514 PV warning notices; Reg 514.9.1 diagrams; Reg 642.3 inspection items; Reg 643.7 ADS verification; Reg 415.1.1 30 mA additional protection operative; Reg 537 isolation + switching; Reg 542 earthing electrodes; Reg 411.5.3 TT system. (13) The regs cluster around: fault protection + additional protection + verification + LCT-specific extensions + multi-source coordination.',
  },
  {
    question:
      'UK 2025-26 LCT retrofit pipeline — what is the dominant install pattern?',
    options: [
      'PV only',
      'Dominant UK 2025-26 retrofit pattern: PV (often as first LCT addition; ~6 kWp typical for 3-4 bed semi) + BESS (added in same install or 1-3 yr later; ~10-13 kWh typical) + heat pump (BUS grant driven; ASHP ~10-15 kWth typical; replacing gas boiler) + EV charger (often added when EV purchased). Multi-source integration emerges over years rather than all at once. Section 712 + Chapter 57 + Reg 722.411.4 + MIS 3005 BUS heat pump = the core competency stack. Cert evidence bundle integrates over time',
      'Random',
      'No pattern',
    ],
    correctAnswer: 1,
    explanation:
      'UK 2025-26 dominant retrofit pipeline: (1) PV first — typically the first LCT addition for many households; 4-8 kWp typical for 3-4 bed semi; MCS 3002 + EREC G98 fast-track; SEG export tariff. (2) BESS added — often in same install (new-build PV + BESS combo) or 1-3 yr later (PV first, then BESS as customer experiences self-consumption value); 8-13 kWh typical residential; Chapter 57 + Section 551. (3) Heat pump retrofit — BUS-grant-driven (£7,500 ASHP) at end-of-life of existing gas boiler or as proactive decarbonisation; MIS 3005 + Part 4-7 + manufacturer commissioning; typically 10-15 kWth for 3-4 bed semi. (4) EV charger — added when household acquires EV (private or company car); Section 722 + Reg 722.411.4 + OPDD-integrated charger; 7 kW domestic AC charging dominant. (5) Multi-source integration — emerges over years rather than all at once for most households; new-build increasingly delivers integrated multi-source at handover. (6) Core competency stack: Section 712 PV + Chapter 57 BESS + Reg 722.411.4 outdoor EV + MIS 3005 heat pump + Section 551 generating sets + Chapter 64 + 65 verification. (7) Cert evidence bundle integrates per-addition over the property lifetime. (8) UK 2025-26 grant + policy direction: BUS heat pump grant continues; SEG remains; PV + BESS receive market support but no headline grant; EV charging is mature retail market. (9) Forward look 2026-30: integrated install patterns growing; V2G expanding; commercial + industrial LCT scaling.',
  },
  {
    question:
      'Mock exam preparation — what is the recommended approach?',
    options: [
      'Cram the night before',
      'Recommended approach: (1) review M1-M12 systematically — not memorisation but mental-model consolidation; (2) revisit the key regs (Reg 411 / 415 / 551 / 641-644 / 651-653 / 712 / 722); (3) practice applied scenarios — for any LCT install describe Reg + verification + cert evidence bundle; (4) test your multi-source thinking — coordinate Section 712 + Chapter 57 + Section 722 + Section 551 verification matrix; (5) revisit common mistakes from each module; (6) use the FAQs as quick-fire prompts; (7) cert evidence bundle thinking — what would you record for this install + verification + EICR; (8) rest before exam; engaged not exhausted',
      'Random',
      'Skip review',
    ],
    correctAnswer: 1,
    explanation:
      'Mock exam preparation approach: (1) Systematic review — go through M1-M12 module overviews + key takeaways; not memorisation but consolidation of the integrated mental model. (2) Key regs — revisit the cross-cutting regs: Reg 411.4 + 411.5 ADS; Reg 415.1 RCD; Reg 531.3.3 RCD type; Reg 551.7.5 anti-islanding + 551.7.2.1 + 551.4.2; Reg 641-644 IV; Reg 651-653 EICR; Reg 712.421.101 PV IMD; Reg 722.411.4 outdoor EV; Reg 643.3 IR + Table 64. (3) Applied scenarios — for any LCT install (single-source or multi-source) walk through: design considerations + applicable Section / Chapter regs + verification framework + cert evidence bundle. (4) Multi-source thinking — coordinate verification matrix across sources: per-source IV + Reg 551.4.2 + Reg 551.7.5 cross-source + outdoor LCT open-PEN architecture. (5) Common mistakes — review the CommonMistake sections in each module; pattern-recognition helps avoid in exam + practice. (6) FAQs as quick-fire — the FAQ sections cover common knowledge points; quick scan helps reinforce. (7) Cert evidence bundle thinking — for any scenario, what would you record + how does it integrate with MCS handover pack + customer + DNO. (8) Rest + nutrition + hydration before exam; engaged not exhausted. (9) On exam day: read questions carefully + identify the LCT technology / verification stage / customer-facing context; apply the mental model; answer methodically.',
  },
  {
    question:
      'What does the Renewable Electrician\'s career look like UK 2025-30?',
    options: [
      'Plateau',
      'Growth trajectory: (1) LCT install demand growing across PV + BESS + heat pumps + EV — BUS grant + SEG + decarbonisation targets driving; (2) competent LCT installers in short supply vs demand — premium rates + opportunities; (3) integration + multi-source LCT becoming standard — Renewable Electrician\'s integrated competency increasingly valuable; (4) commercial + industrial LCT scaling — larger projects + grid services + smart export + V2G; (5) lifecycle services growing — EICR-equivalent + monitoring + warranty + repair; (6) emerging tech — hydrogen, fuel cells, advanced BMS, grid-forming; (7) policy direction — UK 2030 + 2050 net-zero targets; (8) professional standing — manufacturer + DNO + Ofgem + customer recognition',
      'Random',
      'Decline',
    ],
    correctAnswer: 1,
    explanation:
      'UK 2025-30 Renewable Electrician career trajectory: (1) Install demand growth — BUS grant heat pumps (~50-100k/yr UK target rising), PV continues strong (~150-250k/yr), BESS accelerating (~30-80k/yr), EV chargers high-volume (~500k+ total UK). Multi-source new-build standard. (2) Competent installer shortage — industry reports + MCS data show LCT installer numbers growing but demand outpacing; premium rates for certified competent installers; opportunities. (3) Integration demand — multi-source LCT becoming standard new-build + retrofit pattern; the Renewable Electrician\'s integrated competency (BS 7671 + LCT-specific + multi-trade coordination + customer-facing) increasingly valuable. (4) Commercial + industrial — leisure centres + hospitals + offices + warehouses + farms adding LCT at scale; larger projects + grid services + smart export + V2G demand more advanced + multi-source competency. (5) Lifecycle services — installed base growing means EICR-equivalent + monitoring + warranty + repair + replacement services scale; recurring revenue beyond install. (6) Emerging tech — hydrogen (limited 2025-26 but policy direction); fuel cells; V2G expanding 2026-30; grid-forming inverters; advanced BMS chemistries. (7) Policy direction — UK 2030 + 2050 net-zero + heat decarbonisation + electrification of transport + decarbonisation of heat all support LCT growth. (8) Professional standing — manufacturer + DNO + Ofgem + customer recognition for competency; the Renewable Electrician identity is professionally + commercially valuable in this market.',
  },
  {
    question:
      'Beyond the mock exam — what next?',
    options: [
      'Stop learning',
      'Beyond mock exam: (1) apply the M1-M12 framework in actual installs + verifications + EICR-equivalents — practice is the consolidation; (2) maintain BS 7671 + LCT-specific competencies via CPD; (3) build manufacturer-certified-installer status across key LCT brands; (4) cert evidence bundle discipline on every install — your own portfolio; (5) customer relationship + ongoing engagement — the business + safety case; (6) industry engagement — IET / NICEIC / Solar Energy UK / HPF membership + events; (7) peer networking + knowledge sharing; (8) track A4:2026 + future BS 7671 amendments + UK policy + emerging LCT; (9) consider mentoring / apprentice training role',
      'Random',
      'Memorise only',
    ],
    correctAnswer: 1,
    explanation:
      'Beyond mock exam — career pathway: (1) Apply M1-M12 framework — actual install + verification + EICR-equivalent practice is where the consolidation happens; deliberate reflection on each install builds tacit competency; cert evidence bundle as the personal portfolio. (2) Maintain CPD — BS 7671 amendments + MCS standard updates + manufacturer training cycles + emerging LCT awareness. (3) Manufacturer-certified-installer status — key LCT brands (Tesla, GivEnergy, Sonnen, Solis, Fronius, Mitsubishi, Daikin, Vaillant, Zappi, Ohme, etc); maintain certification cycles; access to manufacturer support + warranty + commercial advantages. (4) Cert evidence bundle discipline — every install + verification + EICR-equivalent builds the personal portfolio; supports customer + warranty + audit + professional reputation + property value preservation. (5) Customer relationship — handover meeting discipline + annual touchpoint + EICR-equivalent + warranty support + property sale transitions = business + safety case. (6) Industry engagement — IET (Institution of Engineering + Technology) + NICEIC + ECA + Solar Energy UK + Heat Pump Federation + electric vehicles industry bodies — membership + events + CPD + networking + standards influence. (7) Peer networking — installer community + manufacturer technical + DNO engineers + Ofgem submissions; community learning. (8) Track regulatory + policy + tech evolution — A4:2026 + future amendments + UK 2030 / 2050 targets + emerging LCT. (9) Mentor + apprentice training — the next generation of Renewable Electricians; pay it forward; deepen your own understanding via teaching. (10) Professional standing matures over years; this course is foundation + actual practice + CPD + community build the career.',
  },
  {
    question:
      'Final synthesis: what is the single most important habit for a Renewable Electrician?',
    options: [
      'Speed',
      'Cert evidence bundle discipline. Every install + verification + EICR-equivalent + customer touchpoint feeds the cert evidence bundle. Comprehensive lifecycle record supports: customer safety + customer confidence + warranty + insurance + audit + property sale + your professional reputation + the wider safety case for LCT adoption. Without cert evidence bundle discipline = silent failures + warranty disputes + safety incidents + reputation damage. With cert evidence bundle discipline = comprehensive support + smooth operations + professional standing + business growth',
      'Random',
      'Memorisation',
    ],
    correctAnswer: 1,
    explanation:
      'Cert evidence bundle discipline as the single most important habit: (1) Comprehensive lifecycle record — every install (MCS handover pack + EIC + Schedule + commissioning + warranty + photos / thermal + customer touchpoint + sign-off) + every periodic visit (EICR-equivalent + BMS data + thermal + manufacturer correspondence + customer touchpoint) + every event (warranty claim + alarm response + firmware update + service visit). (2) Customer safety — the audit trail supports identification of issues before they become incidents; lifecycle picture catches degradation + drift. (3) Customer confidence — comprehensive documentation = customer knows what they have + trusts the installer + supports property value at sale. (4) Warranty + insurance — claims supported by comprehensive evidence; disputes minimised. (5) Audit — installer audit + DNO + Ofgem + manufacturer audit; comprehensive records protect. (6) Property sale — well-documented LCT install adds property value; poorly-documented detracts; cert evidence bundle is the audit anchor at sale. (7) Professional reputation — the installer\'s portfolio over years = the reputation = the business; cert evidence bundle is the proof. (8) Safety case for LCT — UK 2025-26 + 2050 LCT adoption depends on the wider industry maintaining safety + quality; every installer\'s discipline contributes. (9) Without cert evidence bundle discipline — silent failures + warranty disputes + safety incidents + reputation damage. (10) With discipline — comprehensive support + smooth operations + professional standing + business growth + safety case for the LCT industry. (11) Habit because it\'s repetitive + lifelong + cumulative — the discipline pays back over years.',
  },
];

const faqs = [
  {
    question: 'I\'ve finished M1-M12. What next?',
    answer:
      'Take the Renewable Energy mock exam to validate the integrated competency. Apply the framework in actual installs + verifications + EICR-equivalents — practice is consolidation. Maintain CPD via BS 7671 amendments + MCS standard updates + manufacturer certification cycles. Build manufacturer-certified-installer status. Engage with industry bodies (IET, NICEIC, Solar Energy UK, HPF). Track A4:2026 + future amendments + UK policy. The Renewable Electrician career is a multi-year build — this course is the foundation.',
  },
  {
    question: 'What if I encounter an LCT scenario the course didn\'t cover?',
    answer:
      'The course is comprehensive but not exhaustive — the LCT field is dynamic. For uncovered scenarios: (1) apply the framework — BS 7671 + relevant Section / Chapter + manufacturer DoC + cert evidence bundle thinking; (2) engage manufacturer technical support; (3) consult IET COP + industry guidance; (4) engage peer network + community knowledge; (5) engage DNO where grid-paralleled; (6) document the reasoning + decisions in cert evidence bundle. Skilled-person competency includes judgment in uncovered scenarios.',
  },
  {
    question: 'How do I know I\'m competent enough to install + verify LCT?',
    answer:
      'Layered evidence: (1) qualifications — BS 7671 18th Edition + A4:2026 + C&G 2391 IV + EICR; (2) LCT-specific manufacturer-certified-installer training + status; (3) MCS-certified company affiliation (where relevant); (4) hands-on experience — supervised then independent installs + verifications + EICR-equivalents; (5) cert evidence bundle portfolio over years; (6) peer + manufacturer + DNO + Ofgem recognition; (7) customer reviews + repeat business. Competency is an ongoing build; not a single certification.',
  },
  {
    question: 'Is BS 7671 + A4:2026 the only regulatory framework I need?',
    answer:
      'BS 7671 + A4:2026 is the baseline. Add: MCS Installer Standards (MIS 3001-3008) per LCT technology; EREC G98 / G99 for DNO notification; Reg 551 / Section 712 / Chapter 57 / Section 722 / Section 826 (PEI); manufacturer DoCs + BS EN compliance per equipment (BS EN 61557 instruments, BS EN 62109 inverters, BS EN 61215 PV modules, BS EN 62619 BESS cells, BS EN 62752 RDC-DD, BS EN 62305 LPS, etc); UK statutory requirements (Electrical Safety, EAW Regulations, Building Regulations, F-gas regulations for heat pumps). Layered framework — BS 7671 is the BS 7671 layer.',
  },
  {
    question: 'What is the role of the Mate AI agent in the Renewable Electrician\'s work?',
    answer:
      'Elec-Mate platform supports the Renewable Electrician via tools + reference + workflow — circuit designer, RAMS, cost engineer, inspection checklists, EICR digital + cert evidence bundle storage. The Mate AI agent provides on-demand assistance for regulatory questions + scenario navigation + reference lookup. The installer\'s judgment + competency + customer relationship remain central; the tools accelerate the work. UK 2025-26 reality: installers using the platform efficiently outpace those without; the Renewable Electrician + Elec-Mate combination is the productivity benchmark.',
  },
];

export default function RenewableEnergyModule12Section8() {
  const navigate = useNavigate();

  useSEO({
    title: 'The Renewable Electrician — synthesis + mock exam preview | Renewable Energy 12.8 | Elec-Mate',
    description:
      'The course-closing synthesis. The Renewable Electrician identity. M1-M12 integrated mental model. UK 2025-26 LCT install pipeline + career trajectory. Mock exam framing + preparation approach. Beyond the course — continued professional development.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-12')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 12
          </button>

          <PageHero
            eyebrow="Module 12 · Section 8 · Course-closing synthesis + mock exam preview"
            title="The Renewable Electrician — synthesis + mock exam preview"
            description="The course-closing synthesis. The Renewable Electrician identity — BS 7671 expert + LCT specialist + customer-facing professional + lifecycle thinker. M1-M12 integrated mental model. UK 2025-26 LCT install pipeline + career trajectory. Mock exam framing + preparation approach + what next. Beyond the course — continued professional development + the lifelong build."
            tone="yellow"
          />

          <TLDR
            points={[
              'M1-M12 framework: M1 LCT landscape; M2-M4 PV (dominant LCT); M5 BESS; M6-M7 EV; M8 heat pumps; M9 other LCT; M10 hybrid + EMS; M11 Chapter 81 + lightning + fault; M12 verification + EICR + handover.',
              'The Renewable Electrician identity: BS 7671 + A4:2026 baseline + LCT-specific competencies + manufacturer-certified status + multi-trade coordination + systems thinking + customer-facing.',
              'Top cross-cutting regs: Reg 411 / 415 / 531.3.3 / 551 / 641-644 / 651-653 / 712 / 722. Cluster around fault protection + additional protection + verification + LCT extensions + multi-source.',
              'UK 2025-26 dominant retrofit pipeline: PV first → BESS later → heat pump BUS-driven → EV charger when EV; multi-source emerges over years.',
              'UK 2025-30 career trajectory: install demand growing; competent installer shortage; integration + multi-source becoming standard; lifecycle services scaling; emerging tech (hydrogen, V2G, grid-forming).',
              'Mock exam: applied competency across M1-M12. Regulatory knowledge + technology-specific + multi-source + verification + customer-facing scenarios. Not memorisation — applied judgment.',
              'Mock exam prep: systematic review, key regs, applied scenarios, multi-source thinking, common mistakes, FAQs, cert evidence bundle thinking, rest before exam.',
              'CPD beyond course: BS 7671 amendments + MCS standard updates + manufacturer training + emerging LCT + industry CPD + hands-on practice + cert evidence bundle review + peer engagement.',
              'Single most important habit: cert evidence bundle discipline. Every install + verification + touchpoint feeds the lifecycle record. Supports safety + customer + warranty + audit + reputation.',
              'The Renewable Electrician + Elec-Mate combination is the UK 2025-26 productivity benchmark — tools + judgment + customer relationship + lifecycle thinking.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Articulate the Renewable Electrician identity + competency stack.',
              'Synthesise the M1-M12 framework into an integrated mental model.',
              'Identify the top cross-cutting BS 7671 regs across LCT.',
              'Describe the UK 2025-26 dominant retrofit pipeline + UK 2030 trajectory.',
              'Approach the Renewable Energy mock exam with applied scenario-thinking.',
              'Plan continued professional development beyond the course.',
              'Apply cert evidence bundle discipline as the lifelong habit.',
              'Position the Renewable Electrician + Elec-Mate combination as productivity benchmark.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            You came here to upgrade from electrician to Renewable Electrician. You\'ve walked through 11 modules of frameworks + technologies + verification + handover. The mock exam is next — the practice begins after.
          </Pullquote>

          <ContentEyebrow>The Renewable Electrician identity + M1-M12 synthesis</ContentEyebrow>

          <ConceptBlock
            title="The Renewable Electrician — who you are after this course"
            plainEnglish="The Renewable Electrician combines BS 7671 + A4:2026 foundation with LCT-specific competencies across PV, BESS, EV, heat pumps, and the broader LCT landscape. Manufacturer-certified-installer status + multi-trade coordination + systems thinking + customer-facing professional discipline. Not a separate trade but a deepening + specialisation of the electrician identity for the UK 2025-50 decarbonisation pipeline."
            onSite="UK 2025-26 reality: the Renewable Electrician is the professional standard the LCT install + verification industry needs at scale. Customer demand growing faster than competent installer supply; the qualification + experience commands premium rates + delivers safety + quality + customer + insurance + audit confidence."
          >
            <p>The Renewable Electrician\'s competency stack:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">BS 7671 + A4:2026
                  foundation</strong> — fully-qualified electrician with current standard
                knowledge; C&G 2382 + 2391 typical; ongoing CPD
              </li>
              <li>
                <strong className="text-white">LCT-specific
                  competencies</strong> — Section 712 PV + Chapter 57 BESS + Section 722 EV
                + Part 4-7 + manufacturer for heat pumps + Section 551 generating sets
                + Chapter 82 PEI + Reg 722.411.4 outdoor + Chapter 64 + 65 verification
              </li>
              <li>
                <strong className="text-white">Manufacturer-certified-installer
                  status</strong> — across the relevant LCT manufacturers; warranty +
                commissioning + warranty support pathways
              </li>
              <li>
                <strong className="text-white">Multi-trade
                  coordination</strong> — MCS company orchestrates; F-gas refrigerant
                specialist; civils + planning; the electrician integrates the BS 7671
                install
              </li>
              <li>
                <strong className="text-white">Systems
                  thinking</strong> — multi-source LCT is not the sum of technologies but
                an integrated energy system; design + verify + support the integration
              </li>
              <li>
                <strong className="text-white">Customer-facing
                  professional</strong> — handover meeting + operating guide + annual
                touchpoint + lifecycle management + property sale transitions
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle discipline</strong> — comprehensive lifecycle record per install
                supports safety + customer + warranty + audit + property + reputation
              </li>
              <li>
                <strong className="text-white">Lifelong
                  build</strong> — CPD + manufacturer cycles + emerging tech + industry
                engagement + peer + mentor. The Renewable Electrician identity matures
                over years
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="M1-M12 integrated mental model"
            plainEnglish="M1-M12 fit together as a layered competency build. M1 sets the LCT landscape + UK decarbonisation context. M2-M9 cover the technology stack (PV → BESS → EV → heat pumps → other LCT). M10 covers multi-source integration. M11 covers Chapter 81 + lightning + fault levels. M12 covers verification + EICR + handover lifecycle discipline. All under BS 7671:2018+A4:2026 + cert evidence bundle audit trail."
            onSite="The integrated mental model means: any LCT scenario you face can be approached by applying the relevant module(s) — technology + regulatory + verification + lifecycle. The Renewable Electrician thinks across the model, not within isolated technology silos."
          >
            <p>M1-M12 layered model:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">M1 Foundations</strong>
                — LCT landscape + UK decarbonisation context + regulatory frameworks
                (BS 7671 + MCS + EREC + BUS + SEG)
              </li>
              <li>
                <strong className="text-white">M2-M4 Solar PV</strong>
                — dominant LCT in UK 2025-26; Section 712 + Reg 712.421.101 IMD +
                anti-islanding + EREC + MIS 3002
              </li>
              <li>
                <strong className="text-white">M5 BESS</strong>
                — storage increasingly paired with PV; Chapter 57 + Section 551 + BMS
                lifecycle
              </li>
              <li>
                <strong className="text-white">M6-M7 EV
                  charging</strong> — mass-market growth path; Section 722 + Reg 722.411.4
                + OPDD + RDC-DD
              </li>
              <li>
                <strong className="text-white">M8 Heat pumps</strong>
                — heating decarbonisation pillar; BUS grant gateway; Part 4-7 + MIS 3005
              </li>
              <li>
                <strong className="text-white">M9 Other LCT</strong>
                — wind + solar thermal + biomass + CHP + hydro + hydrogen; Section 551
                unifying framework + per-MIS technology standards
              </li>
              <li>
                <strong className="text-white">M10 Hybrid +
                  EMS + smart export</strong> — multi-source integration; Chapter 82 PEI;
                SEG + EREC G100; V2G; grid-forming
              </li>
              <li>
                <strong className="text-white">M11 Chapter 81
                  + lightning + fault levels</strong> — regulatory framework integration +
                BS EN 62305 LPS + fault contribution from multi-source
              </li>
              <li>
                <strong className="text-white">M12 Verification
                  + EICR + handover</strong> — lifecycle discipline; Chapter 64 IV +
                Chapter 65 EICR + MCS handover + customer education + cert evidence bundle
              </li>
              <li>
                <strong className="text-white">Cross-cutting</strong>
                — BS 7671:2018+A4:2026 throughout; cert evidence bundle audit trail;
                skilled-person competency; customer-facing professional standard
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Top cross-cutting regs across M1-M12"
            clause="Reg 411.4 / 411.5 ADS + earthing arrangements; Reg 415.1 30 mA RCD additional protection; Reg 531.3.3 Type AC restriction; Reg 551.7.5 anti-islanding + 551.7.2.1 supply-side + 551.4.2 multi-source; Reg 641-644 initial verification; Reg 651-653 periodic inspection; Reg 712.421.101 PV IMD; Reg 722.411.4 outdoor EV PME; Reg 643.3 + Table 64 IR."
            meaning="These regs anchor the LCT framework across M1-M12. The cluster around: (1) Fault protection — Reg 411.4 ADS + Reg 411.5 TT system + RCD architecture. (2) Additional protection — Reg 415.1 30 mA RCD as the operative requirement. (3) RCD type — Reg 531.3.3 Type AC restriction + Type A + RDC-DD or Type B per LCT electronics. (4) Generating set framework — Reg 551 family (Reg 551.7.5 anti-islanding, Reg 551.7.2.1 supply-side, Reg 551.4.2 multi-source RCD effectiveness). (5) Initial verification — Chapter 64 + Reg 641-644 (Reg 644.5 EIC compilation). (6) Periodic inspection — Chapter 65 + Reg 651-653 (Reg 651.4 recording, Reg 651.5 skilled person, Reg 652.1 frequency). (7) PV specific — Reg 712.421.101 IMD + Reg 712.514 warning notices + Section 712 framework. (8) EV outdoor — Reg 722.411.4 PME restriction with OPDD voltage-detection device (indent (c)) / TT-style earth-electrode condition (indent (b)) (A4:2026 deleted the former indent (a); methods now (b)–(e)). (9) IR testing — Reg 643.3 + Table 64 test voltages + Reg 643.3.3 250 V re-test. (10) The Renewable Electrician\'s working knowledge of these regs + their application is the BS 7671 competency anchor. Cert evidence bundle records reg cross-references per install + verification."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>UK 2025-30 trajectory + mock exam framing</ContentEyebrow>

          <Pullquote>
            The next generation of homes will be born with PV, BESS, heat pumps, and EV chargers integrated. The next decade of retrofits will dwarf the last. The Renewable Electrician is the trade for that pipeline.
          </Pullquote>

          <ConceptBlock
            title="UK 2025-26 dominant retrofit pipeline + UK 2030 forward look"
            plainEnglish="UK 2025-26 LCT install pipeline is well-established + growing. PV + BESS + heat pumps + EV chargers are the dominant install patterns. BUS grant + SEG + decarbonisation targets drive demand. UK 2030 trajectory: install demand growing across categories; competent installer shortage; integration becoming standard; commercial + industrial scaling; lifecycle services growing; emerging tech (hydrogen, V2G, grid-forming inverters)."
            onSite="The Renewable Electrician\'s career trajectory aligns with the LCT pipeline. Premium rates + opportunities + professional standing + long-term work all reflect the demand. UK 2030 + 2050 net-zero targets backstop the multi-decade demand."
          >
            <p>UK 2025-30 LCT trajectory:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">PV install
                  volume</strong> — ~150-250k/yr UK 2025-26; growing toward higher with
                falling install costs + improving payback
              </li>
              <li>
                <strong className="text-white">BESS install
                  volume</strong> — ~30-80k/yr UK 2025-26; accelerating as costs fall +
                customers experience PV self-consumption value + grid arbitrage potential
              </li>
              <li>
                <strong className="text-white">Heat pump
                  install volume</strong> — ~50-100k/yr UK 2025-26 driven by BUS grant;
                UK 2030 target 600k/yr; substantial scaling required
              </li>
              <li>
                <strong className="text-white">EV charger
                  install volume</strong> — high-volume; ~500k+ EV chargers total UK;
                growth aligned with EV adoption (~1m/yr EV sales by 2030)
              </li>
              <li>
                <strong className="text-white">Multi-source
                  integration</strong> — increasingly standard new-build + retrofit
                pattern; the Renewable Electrician\'s integrated competency is the value
                proposition
              </li>
              <li>
                <strong className="text-white">Commercial +
                  industrial LCT</strong> — leisure centres, hospitals, offices,
                warehouses, farms scaling LCT; larger projects + grid services + smart
                export + V2G
              </li>
              <li>
                <strong className="text-white">Lifecycle
                  services</strong> — installed base growing means EICR-equivalent +
                monitoring + warranty + repair + replacement scales; recurring revenue
              </li>
              <li>
                <strong className="text-white">Emerging tech</strong>
                — hydrogen (policy direction); fuel cells; V2G expanding 2026-30;
                grid-forming inverters; advanced BMS chemistries (solid-state,
                sodium-ion)
              </li>
              <li>
                <strong className="text-white">Policy
                  backstop</strong> — UK 2030 + 2050 net-zero + heat decarbonisation +
                EV transition all support sustained LCT growth
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Renewable Energy mock exam — framing + preparation"
            plainEnglish="The upcoming Renewable Energy mock exam tests applied competency across M1-M12. Regulatory knowledge + technology-specific scenarios + multi-source integration + verification + customer-facing + lifecycle. Not memorisation — applied judgment on realistic install + verification + lifecycle problems. Pass = validation of the Renewable Electrician competency build."
            onSite="Mock exam preparation = systematic M1-M12 review + key regs revisit + applied scenarios practice + multi-source thinking + common mistakes review + FAQs as quick-fire + cert evidence bundle thinking. Rest + nutrition + hydration. On exam day: identify scenario context + apply mental model + answer methodically."
          >
            <p>Mock exam structure + prep approach:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Regulatory
                  knowledge</strong> — reg cites + meaning + application across Section
                712 / Chapter 57 / Section 722 / Section 551 / Chapter 64 / Chapter 65
              </li>
              <li>
                <strong className="text-white">Technology-specific
                  scenarios</strong> — PV / BESS / EV / heat pumps / wind / solar thermal /
                biomass / CHP / micro-hydro / hydrogen + emerging
              </li>
              <li>
                <strong className="text-white">Multi-source
                  integration</strong> — Chapter 82 PEI + Reg 551.4.2 + Reg 551.7.5 +
                coordinated architecture + integrated EICR-equivalent
              </li>
              <li>
                <strong className="text-white">Verification
                  + EICR + cert evidence bundle</strong> — Chapter 64 IV + Chapter 65 EICR
                + MCS handover pack + classification codes (C1/C2/C3/FI)
              </li>
              <li>
                <strong className="text-white">Customer-facing
                  scenarios</strong> — handover meeting + fault response + warranty events
                + property sale transitions
              </li>
              <li>
                <strong className="text-white">Format</strong>
                — applied judgment on realistic install + verification + lifecycle
                problems; multiple choice + scenario application
              </li>
              <li>
                <strong className="text-white">Preparation</strong>
                — systematic M1-M12 review; key regs revisit; applied scenarios; multi-source
                thinking; common mistakes; FAQs; cert evidence bundle thinking
              </li>
              <li>
                <strong className="text-white">Rest + day-of</strong>
                — rest before exam; engaged not exhausted; on exam day read questions
                carefully + identify context + apply mental model + answer methodically
              </li>
              <li>
                <strong className="text-white">Outcome</strong>
                — passing validates Renewable Electrician competency; supports
                professional standing + customer + manufacturer + DNO + Ofgem credibility
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 644.5 + Reg 651.5 — Skilled person competency"
            clause="Reg 644.5: EICs shall be compiled and signed by skilled persons competent to verify BS 7671 has been met. Reg 651.5: periodic inspection + testing shall be carried out by skilled persons competent in such work."
            meaning="These regs anchor the competency principle that runs through M1-M12. The skilled person\'s competency is the bedrock of safety + customer + warranty + insurance + audit + DNO + Ofgem confidence. For the Renewable Electrician completing this course + the mock exam: this is the foundational layer; layered with LCT-specific manufacturer-certified-installer + multi-trade coordination + systems thinking + customer-facing + cert evidence bundle discipline = the complete identity. UK 2025-26 reality: skilled person competency is increasingly recognised as the safety-critical anchor for LCT adoption at scale. Without competent skilled persons: install quality drops + safety incidents rise + customer confidence falls + the entire LCT industry suffers. With competent skilled persons: install quality + safety + customer + warranty + insurance + audit + reputation all support sustainable growth. The Renewable Electrician\'s commitment to competency + CPD + cert evidence bundle + customer-facing professionalism is the contribution to the UK 2030 + 2050 net-zero LCT pipeline."
          />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Beyond the course — CPD + the lifelong build</ContentEyebrow>

          <ConceptBlock
            title="Continued professional development beyond this course"
            plainEnglish="CPD beyond this course is essential — the LCT field is dynamic + the Renewable Electrician identity is a multi-year build. BS 7671 amendments + MCS standard updates + manufacturer training cycles + emerging LCT + industry CPD + hands-on practice + cert evidence bundle review + peer engagement. Each year of practice + CPD deepens competency + value."
            onSite="The most successful Renewable Electricians UK 2025-26 treat CPD as a continuous habit not an episodic event. Read amendments + attend manufacturer courses + maintain industry membership + engage peer network + reflect on own installs + mentor others. The cycle compounds."
          >
            <p>CPD pathways beyond this course:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">BS 7671
                  amendments</strong> — A4:2026 current at course writing; future
                amendments will follow; track via IET / NICEIC / ECA publications
              </li>
              <li>
                <strong className="text-white">MCS standard
                  updates</strong> — MIS 3001-3008 evolve; product approval lists updated;
                track via MCS website + installer membership
              </li>
              <li>
                <strong className="text-white">Manufacturer-certified-installer
                  training</strong> — ongoing courses + product updates + new technology;
                maintain certification cycles
              </li>
              <li>
                <strong className="text-white">Emerging LCT</strong>
                — hydrogen + fuel cells + V2G + grid-forming inverters + advanced BMS
                chemistries; track emerging
              </li>
              <li>
                <strong className="text-white">Industry CPD</strong>
                — IET (Institution of Engineering + Technology) + NICEIC + ECA + Solar
                Energy UK + Heat Pump Federation + IEEE conferences + IET Wiring
                Regulations conferences
              </li>
              <li>
                <strong className="text-white">Hands-on
                  practice</strong> — install + verification + EICR experience builds
                tacit competency; deliberate reflection on completed installs
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle review</strong> — your own installs over time are rich learning
                when reviewed at EICR-equivalent + warranty events
              </li>
              <li>
                <strong className="text-white">Peer +
                  manufacturer + DNO engagement</strong> — community learning + technical
                support + connection engineering insight
              </li>
              <li>
                <strong className="text-white">Mentoring
                  + apprentice training</strong> — next generation of Renewable Electricians;
                deepen own understanding via teaching
              </li>
              <li>
                <strong className="text-white">UK 2025-26 to
                  2050</strong> — the field will evolve substantially; the lifelong build
                is continuous; the Renewable Electrician identity matures over years
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The Renewable Electrician + Elec-Mate productivity benchmark"
            plainEnglish="The Renewable Electrician + Elec-Mate platform combination is the UK 2025-26 productivity benchmark. Elec-Mate provides tools (circuit designer, RAMS, cost engineer, inspection checklists, EICR digital + cert evidence bundle storage) + Mate AI agent for on-demand assistance. The installer\'s judgment + competency + customer relationship remain central; the tools accelerate the work."
            onSite="Installers using the Elec-Mate platform efficiently outpace those using ad-hoc + paper-based + multiple-fragmented-app workflows. The combination of competent Renewable Electrician + integrated platform = faster install + better cert evidence bundle + smoother customer handover + scalable lifecycle services."
          >
            <p>Renewable Electrician + Elec-Mate combination value:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Tools
                  acceleration</strong> — circuit designer for LCT supply circuits + RCD
                + protective architecture; RAMS for site safety; cost engineer for
                quote + project pricing
              </li>
              <li>
                <strong className="text-white">Inspection +
                  EICR digital</strong> — Schedule of Inspections + Schedule of Test
                Results + EICR-equivalent reports digital; cert evidence bundle storage
              </li>
              <li>
                <strong className="text-white">Reference
                  + lookup</strong> — BS 7671 regs + LCT-specific framework + manufacturer
                DoCs; on-demand
              </li>
              <li>
                <strong className="text-white">Mate AI
                  agent</strong> — on-demand assistance for regulatory questions + scenario
                navigation + reference lookup
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — comprehensive lifecycle record per install; supports
                customer + warranty + audit + property + reputation
              </li>
              <li>
                <strong className="text-white">Customer-facing
                  workflow</strong> — handover meeting digital tools + operating guide
                generation + annual touchpoint scheduling
              </li>
              <li>
                <strong className="text-white">Multi-trade
                  coordination</strong> — MCS company + refrigerant specialist +
                manufacturer commissioning + electrician on integrated platform
              </li>
              <li>
                <strong className="text-white">Lifecycle
                  services</strong> — EICR-equivalent + monitoring + warranty + customer
                annual touchpoint at scale; recurring revenue
              </li>
              <li>
                <strong className="text-white">Reality
                  2025-26</strong> — competent + tooled Renewable Electrician = productivity
                + quality + customer + business growth benchmark; the future of UK
                electrical contracting
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · The course-closing reflection"
            clause="The BS 7671:2018+A4:2026 standard is the regulatory foundation under which the Renewable Electrician operates. A4:2026 incorporates AFDD, TN-C-S (PNB) changes, outdoor EV PME changes (Reg 722.411.4 — former indent (a) deleted, methods now (b)–(e)), Schedule column updates, Model Form revisions, and the broader continued evolution of UK electrical safety standards for the LCT pipeline. Future amendments will follow."
            meaning="The course-closing reg reflection: BS 7671:2018+A4:2026 is your professional regulatory anchor. The standard continues to evolve to reflect industry experience + technology change + safety case + customer + DNO + insurance + audit expectations. As the Renewable Electrician you commit to: tracking amendments + applying them + supporting customers through the regulatory evolution. The cert evidence bundle records the standard applicable to each install + the verification per that standard. Future amendments will tighten + extend + clarify; some you\'ll welcome (better customer protection) + some you\'ll wrestle with (additional compliance work); all you\'ll apply professionally. UK 2025-50 net-zero LCT pipeline depends on the cumulative effect of every competent installer + every well-documented install + every comprehensive cert evidence bundle. You\'re part of that. The course-closing message: this is the foundation + the rest is your career."
          />

          <InlineCheck {...inlineChecks[3]} />

          <DiagramPlaceholder
            caption="The Renewable Electrician — M1-M12 synthesis + lifecycle + career diagram. Top: M1-M12 integrated model — M1 Foundations / M2-M4 PV / M5 BESS / M6-M7 EV / M8 heat pumps / M9 other LCT / M10 hybrid + EMS / M11 Chapter 81 + lightning + fault / M12 verification + EICR + handover. Middle: competency stack — BS 7671 + A4:2026 + LCT-specific + manufacturer-certified-installer + multi-trade coordination + systems thinking + customer-facing + cert evidence bundle discipline. Lower middle: UK 2025-30 trajectory — install demand growing across PV / BESS / heat pumps / EV / commercial-industrial; competent installer shortage; integration standard; emerging tech (hydrogen, V2G, grid-forming); UK 2030 + 2050 net-zero targets. Bottom: lifelong build — mock exam validation + ongoing CPD + manufacturer training cycles + industry engagement + hands-on practice + cert evidence bundle review + peer + mentoring + the Renewable Electrician identity matures over years."
            filename="renewable/m12s8-renewable-electrician-synthesis.png"
          />

          <SectionRule />

          <Scenario
            title="Five years on — the Renewable Electrician\'s portfolio in 2030"
            situation="You completed this course + passed the mock exam in 2026. Five years on (2030): cert evidence bundle portfolio across 200+ LCT installs (PV + BESS + heat pumps + EV chargers + a few wind + hydro). Manufacturer-certified-installer status across the dominant brands. Annual touchpoint relationships with most customers. EICR-equivalent cycle starting on the early 2026 installs (~5 yr cycle for some commercial)."
            whatToDo="(1) Portfolio composition (typical 5-yr build): ~120 PV installs (mostly 4-6 kWp domestic with growing commercial 20-50 kWp); ~80 BESS installs (paired with PV in many cases); ~50 heat pump installs (BUS-grant-funded); ~150 EV charger installs (high-volume); ~10 multi-source coordinated installs (new-build + retrofit); ~5 commercial multi-source sites (offices + hospitality + agricultural). (2) Manufacturer relationships: certified installer status across PV (Solis, Fronius, GivEnergy, SolarEdge, Enphase); BESS (Tesla, GivEnergy, Sonnen, Anker SOLIX); heat pumps (Mitsubishi, Daikin, Vaillant, Samsung); EV (Zappi, Ohme, Hypervolt, Easee, Pod Point). (3) Annual touchpoint relationships: ~150 customers on paid annual service contract; ~30 enterprise commercial monitoring contracts; the recurring revenue stream supplements install revenue. (4) EICR-equivalent cycle: 2026 commercial installs hit 5-yr periodic in 2031; comprehensive EICR-equivalent visits beginning; cert evidence bundle informs efficient delivery. (5) UK 2030 LCT market position: V2G expanding (started seeing first V2G chargers in 2028 customer installs); BESS chemistry diversifying (sodium-ion starting to appear); heat pump market scaling toward UK 2030 target; PV growing despite continued cost reduction; commercial + industrial LCT scaling. (6) Career: Renewable Electrician identity well-established; premium rates + business growing; team includes apprentices being trained + a multi-trade office; cert evidence bundle as the asset. (7) CPD: BS 7671 amendments tracked + applied (A5:2028 hypothetical); MCS standard evolution + manufacturer cycles + industry CPD + peer engagement; mentoring 2-3 apprentices into the Renewable Electrician pathway."
            whyItMatters="Five-year forward look demonstrates the Renewable Electrician career build. Cert evidence bundle portfolio = the audit + customer + warranty + reputation + business asset. Manufacturer relationships + annual touchpoints + EICR-equivalent cycle + commercial scaling = mature business + recurring revenue + customer relationships. The mock exam in 2026 was the foundation; the 5 years of practice + CPD + community engagement built the career. UK 2025-30 trajectory backs the demand; the Renewable Electrician identity is the supply side of the LCT pipeline."
          />

          <Scenario
            title="The mock exam — what good looks like + what next"
            situation="You\'re preparing for the Renewable Energy mock exam. M1-M12 complete; this is the validation moment for the integrated Renewable Electrician competency."
            whatToDo="(1) Final review approach: (a) systematic M1-M12 module overview pass (1-2 days); (b) key regs revisit — Reg 411 / 415 / 531.3.3 / 551 / 641-644 / 651-653 / 712 / 722 / 643.3 / Table 64 / 514.9.1 (1 day); (c) applied scenarios across PV + BESS + EV + heat pump + other LCT + multi-source (1-2 days); (d) common mistakes review across modules (half day); (e) FAQs as quick-fire prompts (half day); (f) cert evidence bundle thinking — for each scenario what would you record (continuous). (2) Day-of preparation: rest the night before; light breakfast; arrive early; bring required documentation. (3) During exam: read each question carefully + identify the LCT scenario + applicable Section / Chapter + verification stage + customer-facing context; apply the integrated mental model; answer methodically; flag questions for review if time permits. (4) Outcome: passing validates the Renewable Electrician competency build; supports professional standing + customer + manufacturer + DNO + Ofgem credibility. Failing is a setback but not a defeat — review + retake; the learning continues. (5) Post-exam: apply the framework in actual installs + verifications + EICR-equivalents; build the cert evidence bundle portfolio; maintain manufacturer-certified-installer cycles; engage industry CPD + peer network; over time the Renewable Electrician identity matures into the experienced professional. (6) Career pathway: the mock exam is one validation point; the lifelong build is the actual journey."
            whyItMatters="The mock exam is the validation moment for the integrated competency built across M1-M12. Preparation + application + ongoing CPD = the Renewable Electrician pathway. UK 2025-50 LCT pipeline depends on competent + certified installers at scale; you are part of that supply. Cert evidence bundle discipline + manufacturer relationships + customer relationships + industry engagement = the career build. This course\'s purpose is to set the foundation; your career builds on it."
          />

          <CommonMistake
            title="Treating the mock exam as the finish line"
            whatHappens="Course participant passes mock exam + treats it as completion. Stops the CPD + manufacturer training + cert evidence bundle discipline. 3 years later: BS 7671 has amended; MCS standards have updated; manufacturer products have evolved; competency has eroded. Customer install quality drops; warranty + audit + reputation suffer."
            doInstead="The mock exam is the foundation validation, not the finish line. The Renewable Electrician identity is a lifelong build. Maintain CPD: BS 7671 amendments + MCS standard updates + manufacturer training cycles + emerging LCT + industry engagement + hands-on practice + cert evidence bundle review + peer + mentoring. The 5-year forward look (2030) shows what good looks like — mature portfolio + business + relationships + reputation. The mock exam is mile zero of a multi-year journey."
          />

          <CommonMistake
            title="Skipping the cert evidence bundle discipline because it feels like extra work"
            whatHappens="Installer does competent work but skips the comprehensive cert evidence bundle. EIC + Schedule + handover pack provided to customer but no ongoing record-keeping; thermal images discarded; manufacturer correspondence lost; customer touchpoints not logged. Years later: warranty claim disputed (no evidence trail); customer disputes (no record of agreement); EICR-equivalent verifier has incomplete baseline; property sale documentation incomplete. The competent work was undermined by the absent discipline."
            doInstead="Cert evidence bundle discipline is the single most important habit — the course-closing emphasis. Every install + verification + EICR-equivalent + customer touchpoint + warranty event + service visit feeds the cert evidence bundle. Comprehensive lifecycle record per install supports: customer safety + customer confidence + warranty + insurance + audit + property sale + your professional reputation + the wider safety case for LCT adoption. The discipline pays back over years. UK 2025-26 cert management platforms make this efficient; the Renewable Electrician + Elec-Mate combination is the productivity benchmark."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'The Renewable Electrician identity = BS 7671 + A4:2026 baseline + LCT-specific competencies + manufacturer-certified-installer + multi-trade coordination + systems thinking + customer-facing + cert evidence bundle discipline.',
              'M1-M12 integrated mental model: M1 Foundations, M2-M4 PV, M5 BESS, M6-M7 EV, M8 heat pumps, M9 other LCT, M10 hybrid + EMS, M11 Chapter 81 + lightning + fault, M12 verification + EICR + handover.',
              'Top cross-cutting regs: Reg 411 / 415 / 531.3.3 / 551 / 641-644 / 651-653 / 712 / 722. Cluster around fault protection + additional protection + verification + LCT extensions + multi-source.',
              'UK 2025-26 dominant retrofit pipeline: PV first → BESS → heat pump BUS-driven → EV charger when EV; multi-source emerges over years.',
              'UK 2030 trajectory: install demand growing; competent installer shortage; integration standard; lifecycle services scaling; emerging tech (hydrogen, V2G, grid-forming).',
              'Mock exam: applied competency across M1-M12. Regulatory + technology-specific + multi-source + verification + customer-facing scenarios. Applied judgment not memorisation.',
              'Mock exam prep: systematic M1-M12 review + key regs + applied scenarios + multi-source thinking + common mistakes + FAQs + cert evidence bundle thinking + rest before exam.',
              'CPD beyond course: BS 7671 amendments + MCS updates + manufacturer cycles + emerging LCT + industry CPD + hands-on practice + cert evidence bundle review + peer + mentor.',
              'Single most important habit: cert evidence bundle discipline. Every install + verification + touchpoint feeds the lifecycle record.',
              'The Renewable Electrician + Elec-Mate combination is the UK 2025-26 productivity benchmark — tools + judgment + customer relationship + lifecycle thinking.',
              'Five-year forward look: cert evidence bundle portfolio + manufacturer relationships + annual touchpoint contracts + EICR-equivalent cycle + commercial scaling + mature career.',
              'The mock exam is the foundation validation, not the finish line. The Renewable Electrician identity is a lifelong build.',
              'You\'re part of the UK 2025-50 net-zero LCT pipeline. Every competent install + comprehensive cert evidence bundle contributes to the wider safety + adoption case.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 8 · Course-closing knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-12-section-7')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                12.7 Customer education + handover
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-mock-exam')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Course complete <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Renewable Energy mock exam
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
