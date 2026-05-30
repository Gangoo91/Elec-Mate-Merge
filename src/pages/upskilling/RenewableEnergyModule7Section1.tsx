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
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm7s1-scope',
    question:
      'Commercial EV charging includes which install patterns?',
    options: [
      'Only motorway services',
      'Workplace AC (Mode 3 single-phase / three-phase), public AC bays (kerbside, car parks), public DC fast (motorway services, urban hubs), fleet depot (overnight + sequential), commercial / industrial customer-curtilage. All within Section 722 scope; layered with site-specific regulatory frameworks (PCAR 2023 for public, OZEV / Workplace Charging Scheme for workplace)',
      'Only domestic',
      'Only public',
    ],
    correctIndex: 1,
    explanation:
      'Commercial EV charging is a broad family. Workplace = employer providing chargers for staff (typically Mode 3 7-22 kW). Public AC bays = kerbside, council car parks, supermarket bays (typically Mode 3 7-22 kW with payment). Public DC fast = motorway services, urban rapid hubs (50-350 kW DC). Fleet = depot overnight charging for taxi / LCV / delivery vehicles (typically Mode 3 with sequential scheduling). Commercial / industrial = on customer curtilage (workshop, agricultural, business premises). All within Section 722 scope; each has its own additional regulatory layer (PCAR 2023 for public; OZEV / WCS for workplace; PAS 1899 accessibility for public).',
  },
  {
    id: 'm7s1-dno-thresholds',
    question:
      'When does the EV charging install require DNO notification under EREC G98 / G99?',
    options: [
      'Always',
      'Below ~3.68 kW per phase: G98 fast-track notification typically not required (well below thresholds). Above: G98 (single-phase ≤ 16 A per phase) OR G99 (above 16 A per phase, three-phase, or above 50 kW total) — formal DNO application with technical info required. Commercial sites with multiple chargers + BESS + PV always trigger G99',
      'Only above 1 MW',
      'Never',
    ],
    correctIndex: 1,
    explanation:
      'EREC G98 and G99 are Engineering Recommendations from the Energy Networks Association for connecting generating equipment to the public distribution network. G98 covers Type A (single-phase ≤ 16 A or three-phase ≤ 16 A per phase) — fast-track or post-installation notification. G99 covers larger installs — formal pre-installation application + DNO approval. For EV charging: pure load (not generation) is generally below DNO notification thresholds; but bidirectional V2G + BESS + PV co-located create generation that triggers G99. Always consult the local DNO at design stage for commercial sites with multi-charger / BESS / V2G capability. Cert evidence bundle records the DNO correspondence + reference number.',
  },
  {
    id: 'm7s1-61439-7',
    question:
      'BS EN IEC 61439-7:2023 covers which assemblies?',
    options: [
      'Only domestic CUs',
      'Low-voltage switchgear and controlgear assemblies for SPECIFIC APPLICATIONS — marinas, camping sites, market squares, ELECTRIC VEHICLE CHARGING STATIONS. Where multiple chargers are housed in a single assembly (commercial / public / fleet hub), this standard applies to the assembly itself. Single domestic wallbox usually NOT in BS EN IEC 61439-7 scope',
      'Only industrial',
      'Only residential',
    ],
    correctIndex: 1,
    explanation:
      'BS EN IEC 61439-7:2023 — "Low-voltage switchgear and controlgear assemblies — Assemblies for specific applications such as marinas, camping sites, market squares, electric vehicle charging stations". The standard sets type-test, routine-test, design and construction requirements for assemblies in these specific contexts. UK 2025-26 commercial EV reality: where multiple chargepoints share a common enclosure or distribution panel (public hub, workplace bank, fleet depot), the assembly must comply with BS EN IEC 61439-7. Single domestic wallbox is a factory-built complete unit (covered by BS EN 61851 + BS EN 62208) and 61439-7 is generally not directly invoked. Cert evidence bundle records the assembly’s 61439-7 conformity declaration.',
  },
  {
    id: 'm7s1-section-722-commercial',
    question:
      'How does Section 722 scale from domestic (M6) to commercial (M7)?',
    options: [
      'Different regulations apply',
      'Same Section 722 regulations apply; the install patterns change. Domestic: single-phase 7 kW Mode 3, PME-on-EV via OPDD, dedicated final circuit, smart-charging per SCP-Regs 2021. Commercial: three-phase 22 kW Mode 3 or Mode 4 DC fast, multiple chargers per site (BS EN IEC 61439-7 assemblies), OCPP for management, DLM across the cluster, PCAR 2023 for public charging — but Section 722.x regs (722.411.4 PME alternatives, 722.531.3.101 RCD architecture, IET CoP dedicated circuit per charger) still apply',
      'Commercial is exempt',
      'Domestic is exempt',
    ],
    correctIndex: 1,
    explanation:
      'Section 722 applies uniformly across domestic and commercial EV charging. The regulatory layers (PME alternatives per 722.411.4, RCD architecture per 722.531.3.101, dedicated final circuit per IET Code of Practice for EV Charging Equipment Installation) apply equally. What changes with commercial is the install scale + the additional regulatory frameworks LAYERED ON TOP: PCAR 2023 for public-access chargers; OZEV / Workplace Charging Scheme for workplaces; PAS 1899 for accessibility; BS EN IEC 61439-7 for multi-charger assemblies; OCPP for networked management. Cert evidence bundle for commercial install integrates Section 722 (BS 7671) + the layered commercial frameworks.',
  },
];

const quizQuestions = [
  {
    question:
      'A commercial customer wants four 22 kW three-phase chargers at their workplace, fed from a single three-phase 100 A supply. What is the regulatory stack?',
    options: [
      'Only BS 7671',
      'Layered stack: (1) BS 7671 Section 722 — earthing-tree per 722.411.4 (per charger), RCD architecture per 722.531.3.101 (per charger), dedicated final circuit per IET Code of Practice for EV Charging Equipment Installation (per charger); (2) BS EN IEC 61439-7:2023 — the multi-charger distribution assembly; (3) Reg 311.1 + Reg 722.311.201 — max demand with DLM (4 × 32 A per phase = 128 A per phase nominal vs 100 A supply — DLM mandatory); (4) EREC G99 — DNO notification for the multi-charger site if BESS / V2G present; (5) BS EN IEC 61851 series — charging equipment; (6) BS EN IEC 62196-2 — Type 2 connector; (7) OZEV Workplace Charging Scheme — grant funding eligibility',
      'Only domestic regs',
      'No regulations',
    ],
    correctAnswer: 1,
    explanation:
      'Commercial multi-charger sites integrate every regulatory layer. BS 7671 Section 722 provides the core electrical safety regs (applied per charger). BS EN IEC 61439-7 governs the multi-charger assembly (test reports + manufacturer conformity declaration). Reg 311.1 + Reg 722.311.201 enable DLM — essential because 4 × 32 A = 128 A per phase exceeds the 100 A supply (DLM throttles to fit). EREC G99 covers DNO notification where the site includes generation (BESS / V2G); pure load chargers below G99 thresholds may use G98. BS EN IEC 61851 + 62196-2 cover the charging equipment. OZEV Workplace Charging Scheme provides up to £350 per chargepoint grant funding for eligible workplaces. Cert evidence bundle integrates all layers.',
  },
  {
    question:
      'A workplace install for fleet vehicles. The customer asks "do we need PCAR 2023 compliance?" What is the answer?',
    options: [
      'Yes, always',
      'No — PCAR 2023 (Public Charge Point Regulations 2023) applies to PUBLIC charge points (open to the general public). Workplace chargers used only by employees + visitors are NOT public charge points under PCAR scope. They’re still in Section 722 scope (BS 7671) + OZEV Workplace Charging Scheme if grant-funded + SCP Regulations 2021 if smart-charging — but PCAR 2023 doesn’t apply',
      'PCAR 2023 doesn’t exist',
      'Only domestic',
    ],
    correctAnswer: 1,
    explanation:
      'PCAR 2023 = Public Charge Point Regulations 2023 (UK statutory regulations governing PUBLIC EV charging points). Applies to chargepoints "available for use by the public" — typically motorway services, supermarket car parks, urban kerbside hubs, public car parks. Workplace chargers used only by employees / visitors are NOT public chargepoints. They fall under: BS 7671 Section 722 (wiring regs), SCP Regulations 2021 (smart charging — if the workplace falls within the SCP-Regs scope), OZEV Workplace Charging Scheme (grant if applicable). Cert evidence bundle records the site classification (workplace not public) and the regulatory framework applied. PCAR 2023 is covered in §7.7.',
  },
  {
    question:
      'A site survey for a "public hub" of 6 × 150 kW DC fast chargers. Which DNO supply is needed?',
    options: [
      'Domestic 100 A single-phase',
      '6 × 150 kW = 900 kW nominal continuous (less with DLM). At 400 V three-phase: ~1,300 A per phase nominal. Requires a dedicated DNO HV connection (11 kV typically) with on-site transformer; G99 application + DNO approval; private substation + transformer + LV switchgear typically £100-£500k of grid infrastructure cost on top of the charger CapEx. Site selection often driven by DNO capacity availability',
      '32 A three-phase domestic',
      'No supply needed',
    ],
    correctAnswer: 1,
    explanation:
      '6 × 150 kW DC fast chargers = 900 kW peak demand. Real demand with DLM + diversity typically 50-70% of peak (~500-650 kW). At LV (400 V three-phase) this is ~720-940 A per phase — well above any LV supply capacity. Solution: dedicated DNO HV (11 kV typically) connection + on-site transformer + LV switchgear. EREC G99 + formal DNO application. Site economics dominated by grid infrastructure CapEx (£100-£500k + 6-18 month DNO lead time) on top of the charger hardware (~£40-80k per 150 kW unit). UK 2025-26 public-hub developer practice: site selection driven by DNO capacity availability + planning + grid connection cost.',
  },
  {
    question:
      'Cert evidence bundle for commercial multi-charger install — what does it integrate over the domestic equivalent?',
    options: [
      'Same as domestic',
      'Commercial bundle adds: (1) BS EN IEC 61439-7 assembly conformity declaration; (2) DNO correspondence + G99 reference (if applicable); (3) PCAR 2023 compliance evidence (if public); (4) PAS 1899 accessibility evidence (if public + accessibility scope); (5) OZEV / Workplace Charging Scheme grant docs (if applicable); (6) Multi-charger DLM configuration + per-charger contribution to max demand; (7) OCPP / CPMS integration documentation; (8) commissioning test results PER charger + the assembly itself; (9) ongoing operator responsibilities (CPO if public)',
      'Less than domestic',
      'No bundle needed',
    ],
    correctAnswer: 1,
    explanation:
      'Commercial cert evidence bundles are richer than domestic. The Section 722 layered compliance from M6 (earthing-tree, RCD, dedicated circuit) applies PER charger. Additional commercial-specific layers: assembly compliance (61439-7), DNO correspondence (G99), public regulations (PCAR + accessibility), grant scheme documentation (OZEV WCS), multi-charger management (DLM + OCPP), per-charger commissioning, ongoing operator obligations (CPO if public). UK 2025-26 commercial install cert evidence bundle is typically a structured digital folder hierarchy with each layer as its own subfolder + index document. Customer (commercial site owner) keeps a copy; installer keeps a copy; CPO if separate keeps a copy.',
  },
  {
    question:
      'Section 722 vs Section 708 (caravans / tents / market squares) — what is the relationship for EV install in those locations?',
    options: [
      'They are the same',
      'Both Sections apply at their interaction. Caravan-site EV charging = Section 708 governs the caravan / tent supply infrastructure (socket-outlets ≥ 16 A per 708.55.1.5, max 4 per enclosure per 708.55.1.3, individual OCPD per 708.533); Section 722 governs the EV charging circuit within that. Where the caravan pitch socket-outlet is being used for EV charging, both Sections layer on the install. BS EN IEC 61439-7 covers the pitch / charging assembly. Cert evidence bundle records compliance with both Sections',
      'Section 708 replaces 722',
      'Section 722 replaces 708',
    ],
    correctAnswer: 1,
    explanation:
      'Section 708 (caravans, motor caravans, camping sites + market squares + similar) and Section 722 (EV charging) both apply where EV charging happens at a caravan / camping / market-square location. Section 708 provides the special-location framework (708.55.1.x socket-outlet requirements; 708.533 individual OCPD; 708.537.2.1.1 isolation per distribution enclosure; 708.55.1.7 + BS EN IEC 61439-7 assembly compliance). Section 722 adds the EV-specific requirements (earthing-tree, RCD architecture, dedicated circuit, etc.). The layered compliance is the install’s evidence trail — cert evidence bundle records both Sections + the BS EN IEC 61439-7 assembly conformity.',
  },
  {
    question:
      'A commercial install includes a Type 2 socket-outlet rated 32 A. Reg 543.7.1.202 covers protective conductor current. What threshold triggers higher-integrity connection requirements?',
    options: [
      '1 mA',
      '10 mA — equipment having protective conductor current exceeding 10 mA shall be connected to the supply by one of the specified methods in Reg 543.7.1.202 (e.g. duplicate protective conductors, or dedicated PE with confirmed continuity). Modern EV charging stations typically have leakage currents well below 10 mA per charger, but multi-charger banks can accumulate; the assembly’s aggregate PE current is what triggers the threshold',
      '100 mA',
      '1 A',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 543.7.1.202 sets the 10 mA protective-conductor-current threshold for higher-integrity connection requirements. Above 10 mA: specified higher-integrity methods (duplicate PE conductors with separate terminations, dedicated PE with confirmed continuity, etc.). Modern EV chargers individually have leakage well below 10 mA (typically 1-3 mA per unit); BS EN IEC 62196 connector with PP/CP signalling minimises leakage. BUT in multi-charger banks where many chargers share a common PE return, the aggregate can exceed 10 mA — designer assesses cumulative PE current and applies Reg 543.7.1.202 methods to the shared PE conductor if needed. Cert evidence bundle records the PE current assessment + the chosen connection method.',
  },
];

const faqs = [
  {
    question: 'When is a workplace charger a "public" charger under PCAR 2023?',
    answer:
      'PCAR 2023 applies to chargepoints "available for use by the public". A workplace charger used only by employees / contractors / visitors is NOT public — it’s workplace, governed by SCP Regulations 2021 (if smart) + BS 7671 Section 722 + OZEV Workplace Charging Scheme. Where the workplace charger is opened to the public (e.g. supermarket allowing the public to use staff chargers after hours), PCAR 2023 then bites. The classification is based on actual access, not nominal intent. Cert evidence bundle records the site classification + the operator’s public-access policy.',
  },
  {
    question: 'OZEV Workplace Charging Scheme — what does it provide?',
    answer:
      'OZEV WCS = the UK Government grant for workplace charging. UK 2025-26 typical: £350 per chargepoint for up to 40 sockets per applicant (verify current scheme rates). Eligibility: registered business / charity / public sector body; chargepoint installed by OZEV-authorised installer; chargepoint model on the OZEV approved-product list. Separate from the EVCS (domestic) and PCAR (public). Cert evidence bundle records the OZEV WCS claim + installer accreditation.',
  },
  {
    question: 'How big a difference is the M6 install vs M7 install in cost terms?',
    answer:
      'Domestic M6 (7 kW single-phase Mode 3 wallbox): £600-£1,200 typically. Commercial M7 22 kW three-phase Mode 3: £2,000-£4,000 per charger + multi-charger DLM. Commercial M7 50 kW DC fast: £15,000-£25,000 per unit + grid infrastructure. Commercial M7 150-350 kW ultra-rapid: £40,000-£100,000 per unit + dedicated HV grid connection (£100-£500k+). Public charging hubs at the higher end are real estate / grid / planning projects, not just electrical installs.',
  },
  {
    question: 'Does V2G change the Section 722 install?',
    answer:
      'Yes. Bidirectional V2G means the EV becomes a SOURCE within the PEI when discharging. Chapter 82 (PEI integration) applies on top of Section 722. The Section 722 wiring still applies; Chapter 82 adds protective-measure-persistence requirements (Reg 826.1.1.2.2 neutral handling in island; Reg 551.7.5 anti-islanding when grid-connected). DNO involvement: G99 application typically required for any V2G site. V2G is covered in depth in M10 (Hybrid systems, EMS & smart export); this module focuses on charge direction (EV as load).',
  },
  {
    question: 'What about CHAdeMO connector — still relevant in UK 2025-26?',
    answer:
      'Declining but present. UK 2025-26 reality: CCS Combo 2 is the dominant DC fast standard (covered in §7.3). CHAdeMO survives for legacy Japanese-market EVs (early Nissan Leaf, certain Mitsubishi). New public DC fast installs in UK 2025-26 are predominantly CCS-only or CCS + Tesla NACS (USA-origin, expanding into UK). Dedicated CHAdeMO units are increasingly rare on new installs. Cert evidence bundle for a DC fast install records the connector standards available + the rationale.',
  },
];

export default function RenewableEnergyModule7Section1() {
  const navigate = useNavigate();

  useSEO({
    title: 'Commercial EV landscape & Section 722 scope | Renewable Energy 7.1 | Elec-Mate',
    description:
      'Commercial EV charging — workplace, public, fleet, DC fast. How Section 722 scales from domestic to commercial. Regulatory stack: BS 7671 + BS EN IEC 61439-7 + PCAR 2023 + OZEV Workplace Charging Scheme + EREC G98 / G99 + PAS 1899.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-7')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 7
          </button>

          <PageHero
            eyebrow="Module 7 · Section 1 · BS 7671:2018+A4:2026 · Section 722 + BS EN IEC 61439-7 + PCAR 2023"
            title="Commercial EV landscape & Section 722 scope"
            description="How Section 722 scales from domestic single-phase (M6) to commercial / workplace / public / fleet / DC fast. The regulatory stack — BS 7671 + BS EN IEC 61439-7 + PCAR 2023 + OZEV Workplace Charging Scheme + EREC G98 / G99 + PAS 1899 — and where each layer applies."
            tone="yellow"
          />

          <TLDR
            points={[
              'Commercial EV charging is a family: workplace (employer-provided), public (kerbside / hub / motorway services), fleet (depot scheduling), commercial-curtilage (business premises). All within Section 722 scope; each has its own additional regulatory layer.',
              'Section 722 regs apply per charger uniformly — domestic and commercial. Earthing-tree per 722.411.4, RCD architecture per 722.531.3.101, dedicated circuit per IET CoP, conformity per 722.511.101 — all the M6 layers scale up.',
              'BS EN IEC 61439-7:2023 governs the MULTI-CHARGER ASSEMBLY where two or more chargepoints share a common enclosure / distribution panel. Type-test + verification + manufacturer DoC.',
              'Reg 311.1 + Reg 722.311.201 enable DLM (covered in §7.5) — essential for commercial sites where multi-charger peak demand exceeds supply capacity.',
              'EREC G98 (single-phase ≤16 A) / G99 (above) — DNO notification for any site with generation (BESS / V2G / PV) or large export potential. Pure load chargers usually below G99 thresholds.',
              'PCAR 2023 (Public Charge Point Regulations) applies to chargepoints AVAILABLE TO THE PUBLIC — payment, reliability, pricing transparency, roaming, 24/7 helpline. Workplace chargers exempt.',
              'OZEV Workplace Charging Scheme — UK Government grant for workplace install. PAS 1899:2022 — accessibility standard for public chargepoints. SCP Regulations 2021 — smart-charging mandate.',
              'Cert evidence bundle for commercial install integrates all layers — Section 722 per charger, 61439-7 for the assembly, DNO correspondence, PCAR (if public), PAS 1899 (if public + accessibility), OZEV WCS (if grant), DLM config, OCPP integration, commissioning test results per charger + assembly.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Classify a commercial EV install: workplace vs public vs fleet vs commercial-curtilage; identify which regulatory layers apply to each.',
              'Apply Section 722 layered regs uniformly across charger types: earthing-tree, RCD architecture, dedicated final circuit, manufacturer conformity.',
              'Apply BS EN IEC 61439-7:2023 to multi-charger assemblies; verify manufacturer DoC at install + commissioning.',
              'Determine DNO notification threshold via EREC G98 / G99; engage the DNO at design stage for commercial multi-charger / BESS / V2G sites.',
              'Apply PCAR 2023 to public charge points; distinguish public from workplace classification based on actual access.',
              'Apply OZEV Workplace Charging Scheme eligibility + grant claim process where the customer is a registered business.',
              'Assemble the commercial cert evidence bundle — Section 722 + 61439-7 + DNO + PCAR + OZEV + DLM + OCPP + commissioning + ongoing operator responsibilities.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            Section 722 doesn’t change between domestic and commercial. What changes is the scale, the assembly, and the regulatory layers stacked on top.
          </Pullquote>

          <ContentEyebrow>The commercial EV charging family</ContentEyebrow>

          <ConceptBlock
            title="Five commercial EV install patterns"
            plainEnglish="Commercial EV charging covers five distinct install patterns in UK 2025-26: workplace, public AC, public DC fast, fleet depot, commercial-curtilage. Each has its own typical scale, customer type, and regulatory layer — but all sit within Section 722 of BS 7671."
            onSite="The site classification is the first quote-stage question for any commercial EV job. The classification determines: the regulatory stack (PCAR vs OZEV WCS vs SCP-Regs); the charger types (AC Mode 3 vs DC Mode 4); the assembly standard (61439-7 if multi-charger); the DNO involvement (G98 vs G99); the cert evidence bundle structure."
          >
            <p>The five patterns:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Workplace</strong> — employer provides chargers
                for staff / contractors / visitors. Typically Mode 3 7-22 kW per bay; 4-20 bays. Smart charging via OCPP; OZEV WCS grant funding common
              </li>
              <li>
                <strong className="text-white">Public AC</strong> — kerbside, council
                car parks, supermarket bays. Typically Mode 3 7-22 kW; payment integration (contactless card + RFID + app); PCAR 2023 compliance mandatory
              </li>
              <li>
                <strong className="text-white">Public DC fast</strong> — motorway services,
                urban rapid hubs. Mode 4 50-350 kW. Dedicated HV DNO connection typical; CCS Combo 2 + Tesla NACS connectors; PCAR + accessibility mandatory
              </li>
              <li>
                <strong className="text-white">Fleet depot</strong> — overnight charging for
                taxi / LCV / delivery / HGV fleets. Typically Mode 3 7-22 kW per bay; sequential scheduling via telematics integration; OCPP for fleet management
              </li>
              <li>
                <strong className="text-white">Commercial-curtilage</strong> — business
                premises (workshop, agricultural, customer-curtilage). Single or small cluster; Mode 3 typical; OZEV WCS may apply
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Section 722 — Scope (uniform across domestic and commercial)"
            clause="The particular requirements of Section 722 apply to circuits intended to supply electric vehicles for charging purposes. The Section 722 regulations apply to each individual charging circuit regardless of the install’s overall scale or context."
            meaning="Section 722’s scope wording is install-scale-agnostic. Every dedicated EV charging circuit — whether one 7 kW domestic wallbox or 200 chargers across a public hub — falls within Section 722 individually. The Section 722 regulations (PME-on-EV alternatives, RCD architecture, dedicated final circuit, manufacturer conformity, BS EN 61851 / 62196-2 compliance) apply to each charger’s install. The commercial-specific layers (BS EN IEC 61439-7 for multi-charger assemblies, PCAR for public access, OZEV for grants) sit ON TOP of Section 722, not in place of it."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 722.312.2.1 — TN systems: no PEN conductor in EV charging circuit"
            clause="A circuit supplying charging equipment for electric vehicles shall not include a PEN conductor."
            meaning="Reg 722.312.2.1 is the categorical PEN prohibition for EV charging circuits in TN systems. It applies at every install regardless of indoor/outdoor location — the PEN combined neutral-and-earth conductor must terminate at the consumer unit / origin, and the dedicated EV charging circuit downstream uses separated N and PE conductors. This is the underlying reg that makes the PME-on-EV outdoor prohibition (Reg 722.411.4) tractable: by the time you get to the charging point, there is no PEN to share. Cert evidence bundle records the circuit topology + the separated N and PE downstream of the origin."
          />

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>The regulatory stack — eight layers</ContentEyebrow>

          <Pullquote>
            Commercial EV install isn’t one regulation — it’s a stack. Knowing which layer applies to which type of site is the design competence.
          </Pullquote>

          <ConceptBlock
            title="The eight regulatory layers for UK commercial EV charging"
            plainEnglish="UK 2025-26 commercial EV charging is governed by a stack of overlapping regulations + standards + schemes. The competent designer identifies which layers apply to the specific site at design stage and integrates the compliance evidence in the cert evidence bundle."
            onSite="Walk through the eight layers per site at quote stage. Tick which apply: BS 7671 always; 61439-7 if multi-charger; G98/G99 if generation; PCAR if public; PAS 1899 if public + accessibility; OZEV if grant-funded; SCP-Regs if smart; OCPP if networked. The cert evidence bundle’s table of contents IS the layer-applicability checklist."
          >
            <p>The eight layers:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">1. BS 7671:2018+A4:2026
                  Section 722</strong> — always applies. Earthing-tree per 722.411.4; RCD architecture per 722.531.3.101; dedicated circuit per IET CoP; manufacturer conformity per 722.511.101
              </li>
              <li>
                <strong className="text-white">2. BS EN IEC 61439-7:2023</strong>
                — applies to multi-charger assemblies (where ≥2 chargepoints share an enclosure / distribution panel)
              </li>
              <li>
                <strong className="text-white">3. EREC G98 / G99</strong>
                — DNO notification + connection agreement. G98 fast-track for Type A. G99 formal application for larger installs / generation
              </li>
              <li>
                <strong className="text-white">4. PCAR 2023</strong>
                — Public Charge Point Regulations 2023. Applies to chargepoints AVAILABLE TO THE PUBLIC. Payment, reliability, pricing, roaming, 24/7 helpline, open data
              </li>
              <li>
                <strong className="text-white">5. PAS 1899:2022</strong>
                — Accessible Charge Points for EVs. Applies to public charging at scale. Mounting heights, connector reach, payment terminal accessibility, signage
              </li>
              <li>
                <strong className="text-white">6. OZEV schemes</strong>
                — Workplace Charging Scheme (workplace), EV Chargepoint Grant (domestic landlords / leaseholders), Public Charge Point grants. Eligibility + accredited installer requirement
              </li>
              <li>
                <strong className="text-white">7. UK SCP Regulations
                  2021</strong> — Default off-peak + randomised delay + security + data privacy. Workplace included; public excluded
              </li>
              <li>
                <strong className="text-white">8. BS EN 61851
                  series + BS EN IEC 62196 series + BS EN IEC 62955</strong> — charging equipment product safety + connector + RDC-PD. Always apply at the equipment level
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 708.55.1.7 NOTE 2 — BS EN IEC 61439-7:2023 reference"
            clause="BS EN IEC 61439-7:2023 — Low-voltage switchgear and controlgear assemblies — Assemblies for specific applications such as marinas, camping sites, market squares, ELECTRIC VEHICLE CHARGING STATIONS — is the applicable assembly standard. Switchgear and controlgear assemblies in these special-application contexts shall comply with this standard. Compliance is verified prior to commissioning via manufacturer DoC + test reports + markings."
            meaning="BS EN IEC 61439-7:2023 is the assembly standard for EV charging stations. Where multiple chargers share a common enclosure, distribution panel, or assembly, the standard applies. Type tests cover thermal, electrical, mechanical, fault-current, and environmental performance. UK 2025-26 commercial install: any public hub / workplace bank / fleet depot with shared distribution assembly must verify the assembly’s 61439-7 conformity. Cert evidence bundle records the manufacturer DoC + test report references."
          />

          <InlineCheck {...inlineChecks[1]} />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Site classification and the design conversation</ContentEyebrow>

          <ConceptBlock
            title="The site classification decision tree"
            plainEnglish="Quote-stage assessment: classify the site, identify which regulatory layers apply, scope the cert evidence bundle structure. Five questions answer the classification: who can access the chargers, who pays for the electricity, what charger types are needed, what supply is available, what funding applies."
            onSite="The classification drives every downstream decision: charger model selection, assembly standard, DNO involvement, grant eligibility, customer-facing operating model. UK 2025-26 mature commercial EV installers run a standard classification questionnaire at first contact; it filters out the cost / scope / timeline early."
          >
            <p>The classification decision tree:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Q1: Who accesses
                  the chargers?</strong> Public (any) = PCAR + PAS 1899 layer.
                Employees / contractors / visitors = workplace (no PCAR). Fleet drivers = fleet. Customer’s own staff / business = commercial-curtilage
              </li>
              <li>
                <strong className="text-white">Q2: Who pays
                  for the electricity?</strong> Public = chargepoint operator
                meters + bills end users (PCAR pricing rules apply). Workplace = employer pays (no per-session billing typically). Fleet = company owns electricity cost. Commercial-curtilage = business owns
              </li>
              <li>
                <strong className="text-white">Q3: What charger
                  types?</strong> AC Mode 3 7-22 kW = workplace, fleet,
                commercial-curtilage common. DC Mode 4 50-350 kW = public hub, motorway services, some fleet (rapid top-up)
              </li>
              <li>
                <strong className="text-white">Q4: What supply
                  is available?</strong> Existing DNO supply capacity vs new
                connection. Below ~100 A three-phase: probably no DNO upgrade needed. Above: G99 + new connection (months lead time + cost)
              </li>
              <li>
                <strong className="text-white">Q5: What funding
                  applies?</strong> Customer eligible for OZEV WCS
                (workplace, registered business)? Customer pursuing public charging grant funding (Local EV Infrastructure scheme)? Customer self-funded?
              </li>
              <li>
                <strong className="text-white">Output</strong> —
                site classification + applicable regulatory layers + scope
                document for design + quote. Customer signs off the
                classification before design proceeds. Cert evidence
                bundle starts here
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Section 722 vs Section 708 — where they overlap"
            plainEnglish="Section 708 of BS 7671 covers caravans, motor caravans, camping sites, market squares + similar special locations. Where EV charging happens in a caravan park (e.g. pitch socket-outlet upgraded to charge a tow-vehicle EV), Section 708 and Section 722 both apply."
            onSite="Caravan-park EV charging is a real UK 2025-26 install pattern as electric tow-vehicles + electric caravans + motorhomes proliferate. The caravan park’s existing pitch infrastructure (16 A socket-outlets per Reg 708.55.1.5) may not be suitable for Mode 3 EV charging at higher rates; upgraded charge points + Section 722 compliance required. Cert evidence bundle records both Sections."
          >
            <p>Section 708 + 722 layered compliance for caravan EV charging:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Reg 708.55.1.3</strong> — no
                more than 4 socket-outlets grouped per enclosure
              </li>
              <li>
                <strong className="text-white">Reg 708.55.1.5</strong> —
                socket-outlet minimum 16 A. For EV use, the actual current may be higher per Section 722; the pitch socket must accommodate
              </li>
              <li>
                <strong className="text-white">Reg 708.55.1.6</strong> —
                mounting height
              </li>
              <li>
                <strong className="text-white">Reg 708.55.1.7</strong> —
                switchgear / controlgear assembly compliance with BS EN IEC 61439-7
              </li>
              <li>
                <strong className="text-white">Reg 708.533</strong> — every
                socket-outlet individually protected by OCPD
              </li>
              <li>
                <strong className="text-white">Reg 708.537.2.1.1</strong> —
                at least one means of isolation per distribution enclosure
              </li>
              <li>
                <strong className="text-white">Section 722 layered on
                  top</strong> — earthing-tree per 722.411.4; RCD architecture per 722.531.3.101; dedicated circuit per IET CoP; equipment conformity per 722.511.101. Plus BS EN IEC 61851 + 62196-2
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="OZEV scheme variants — which grant applies where"
            plainEnglish="OZEV (Office for Zero Emission Vehicles) administers a portfolio of EV charging grant schemes — each scoped to a different install pattern. UK 2025-26 active schemes: EV Chargepoint Grant (domestic landlords + leaseholders + flat residents), Workplace Charging Scheme (registered businesses / charities / public sector), Local EV Infrastructure (local authorities for public charging at scale)."
            onSite="The customer’s scheme eligibility is part of the site classification conversation. UK 2025-26 installer practice: maintain OZEV authorisation across the relevant schemes; check the OZEV approved-product list for the chargers being quoted; submit grant claims through the OZEV installer portal (not the customer). Cert evidence bundle records the scheme + grant reference + installer authorisation evidence."
          >
            <p>The four UK 2025-26 OZEV scheme variants:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">EV Chargepoint Grant — flat
                  residents (landlords)</strong> — up to £350 per
                chargepoint for private leasehold + rental properties. Aimed at landlord-owned residential portfolios
              </li>
              <li>
                <strong className="text-white">EV Chargepoint Grant — sole-use
                  households without off-street parking</strong> — cross-pavement / through-pavement charging solutions
              </li>
              <li>
                <strong className="text-white">Workplace Charging Scheme
                  (WCS)</strong> — up to £350 per socket, max 40 sockets per
                applicant. Registered businesses, charities, public sector. Most relevant scheme for §7.1 commercial install patterns
              </li>
              <li>
                <strong className="text-white">Local EV Infrastructure (LEVI)</strong>
                — capital + capability funding for local authorities for at-scale public charging rollout. Tens of millions per LA award level
              </li>
              <li>
                <strong className="text-white">Verify current rates</strong>
                — OZEV scheme rates + scope evolve. Verify against the live OZEV scheme docs before quoting; rates above are UK 2025-26 indicative
              </li>
            </ul>
          </ConceptBlock>

          <Pullquote>
            The classification conversation is more than electrical scoping. It’s the regulatory layer applicability — and the grant scheme eligibility.
          </Pullquote>

          <ConceptBlock
            title="EREC G98 vs G99 — detailed threshold mapping"
            plainEnglish="Engineering Recommendation G98 covers Type A small-scale generation; G99 covers everything larger. For EV charging, the customer’s install is usually pure load (chargers consume power) — below G99 thresholds. But where the site has co-located BESS / PV / V2G generation, G99 applies."
            onSite="UK 2025-26 commercial DNO practice: engage the DNO at design stage (before quote sign-off) on any multi-charger site. The DNO confirms supply capacity, advises on G98 vs G99 + connection upgrade options, gives a connection reference for the cert evidence bundle. DNO lead times for new commercial supplies: 3-18 months typical. Project planning must allow for this."
          >
            <p>The G98 / G99 threshold table:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">G98 single-phase</strong> — up to
                16 A per phase generation. Fast-track post-installation notification (installer fills the G98 form online + sends to DNO)
              </li>
                <li>
                <strong className="text-white">G98 three-phase</strong> — up to
                16 A per phase per phase. Aggregate generation across the install
              </li>
              <li>
                <strong className="text-white">G99 single-phase</strong> — above
                16 A per phase, or where the install has generation that doesn’t fit G98 fast-track
              </li>
              <li>
                <strong className="text-white">G99 three-phase</strong> — above
                16 A per phase, or above 17 kVA total, or with BESS / V2G / connected generation. Formal pre-installation application
              </li>
              <li>
                <strong className="text-white">G99 high-power</strong> — above
                50 kW (LV) → DNO formal connection agreement; above 1 MW → HV connection (11 kV typical for public DC fast hubs)
              </li>
              <li>
                <strong className="text-white">Pure-load EV charging</strong> —
                typically NO G99 notification needed if the site has no generation. Cert evidence bundle records the DNO clarification reference (DNO confirms no notification required)
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The CPO / site host / installer triad"
            plainEnglish="UK 2025-26 commercial EV ownership model: three distinct roles often performed by three distinct parties. Site host owns the land + electricity supply; CPO (Chargepoint Operator) owns the chargers + commercial relationship with end users; installer designs + installs + commissions the electrical infrastructure. Cert evidence bundle structure reflects the triad."
            onSite="At quote stage, identify which model the site is operating under: site-host-as-CPO (single party owns everything — common in workplace), or hosted CPO (third-party CPO leases space from site host — common in public). The hosting model shapes the commercial structure + ongoing operator obligations + cert evidence handover. Each party in the triad keeps a copy of the evidence bundle."
          >
            <p>Triad responsibilities at install + handover:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Site host</strong> — owns the
                land, the electricity supply, the DNO connection. Responsible for site access + planning + ongoing electrical safety. Typically the customer in workplace / commercial-curtilage; landlord in public
              </li>
              <li>
                <strong className="text-white">Chargepoint Operator (CPO)</strong>
                — owns the charging hardware + back-office (CPMS) + customer payment relationship. Responsible for PCAR 2023 compliance + tariff + uptime + customer support. May be site host (vertically integrated) or third party
              </li>
              <li>
                <strong className="text-white">Installer</strong> —
                designs + installs + commissions the electrical infrastructure to BS 7671 + BS EN IEC 61439-7. Hands over the cert evidence bundle to both site host AND CPO at completion. Responsible for the install warranty + post-handover snagging
              </li>
              <li>
                <strong className="text-white">Cert evidence bundle copies</strong>
                — handed to each party in the triad. Site host needs it for insurance + EICR + ongoing electrical safety. CPO needs it for PCAR + uptime obligations. Installer keeps a copy for the install record + warranty support
              </li>
              <li>
                <strong className="text-white">PCAR responsibility</strong>
                — the CPO is the duty-holder for PCAR 2023 compliance (not the installer or site host). Installer’s deliverable is the install infrastructure that enables PCAR compliance; the CPO operates within it
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 543.7.1.202 — Protective conductor current ≥ 10 mA threshold"
            clause="Equipment having a protective conductor current exceeding 10 mA shall be connected to the supply by one of the specified higher-integrity methods (e.g. duplicate protective conductors with separate terminations, dedicated PE with confirmed continuity)."
            meaning="The 10 mA threshold matters for commercial EV installs where multi-charger banks share a common PE return. Individual chargers typically have leakage well below 10 mA (~1-3 mA per Mode 3 wallbox). But banks of 4+ chargers can accumulate to 10 mA+ on the shared PE conductor. Designer assesses cumulative PE current; where it exceeds 10 mA, Reg 543.7.1.202 higher-integrity connection methods apply. Cert evidence bundle records the PE current calculation + the chosen connection method (duplicate PE conductors, etc.)."
          />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <Scenario
            title="Commercial workplace — small business install"
            situation="A registered company wants 4 × 7 kW Mode 3 workplace chargers for staff. Existing three-phase 100 A supply on the business premises. ~30 staff with EVs. Smart-charging integration via OCPP to coordinate across the bank."
            whatToDo="Site classification: workplace (employees only, no public access). Regulatory stack: BS 7671 Section 722 per charger; BS EN IEC 61439-7 for the 4-bay distribution assembly; SCP Regulations 2021 (workplace included); OZEV Workplace Charging Scheme grant ~£350 × 4 = £1,400; G98 if no generation, G99 if planning to add BESS / PV. NOT PCAR (no public access). Section 722 layered regs per charger: PME-on-EV via OPDD-equipped wallboxes; Type A RCBO + integrated RDC-PD per Reg 722.531.3.101; dedicated final circuit per IET Code of Practice for EV Charging Equipment Installation PER bay (4 dedicated circuits). DLM: 4 × 32 A = 128 A nominal per phase; supply 100 A per phase → DLM throttles to fit. OCPP integration: chargers connect to a CPMS (e.g. Driivz, ChargePoint, Wallbox CPMS) for fleet-style scheduling. Customer handover: SCP-Regs default off-peak active; staff authentication via RFID + app. Cert evidence bundle: BS 7671 EIC per bay + 61439-7 assembly DoC + OZEV WCS grant claim + OCPP integration documentation."
            whyItMatters="The workplace install is the dominant UK 2025-26 commercial EV pattern by volume. The stack is manageable (Section 722 + 61439-7 + OZEV WCS + SCP-Regs + OCPP) without the heavier PCAR / PAS 1899 layers. Customer-facing simplicity: staff authenticate, charge, the employer pays. Total project ~£10-15k after grant for the 4-bay install + DLM + OCPP — payback via staff retention + green credentials."
          />

          <Scenario
            title="Public DC fast hub — motorway services site"
            situation="A motorway services operator wants 6 × 150 kW DC fast chargers for public use. Site has limited existing supply (~200 A LV). Public access; payment terminal at each unit; PCAR 2023 mandatory."
            whatToDo="Site classification: public DC fast. Full regulatory stack: BS 7671 Section 722 per charger; BS EN IEC 61439-7 for the multi-charger LV assembly (downstream of the transformer); BS EN 61851-23 for DC charging stations; BS EN IEC 62196-3 for CCS Combo 2; PCAR 2023 mandatory (payment, reliability, pricing transparency, roaming, 24/7 helpline, open data); PAS 1899:2022 accessibility (mounting heights, connector reach, payment terminal accessibility, signage); EREC G99 + dedicated DNO HV connection (11 kV typical → on-site transformer); Local EV Infrastructure (LEVI) grant funding if applicable. Charger procurement: ABB Terra, Tritium PKM, Alpitronic HYC, EVgo + Tesla 250 kW typical UK 2025-26 brands. Site infrastructure: dedicated substation (~30-50 m² footprint), transformer (typically 1000-2000 kVA), LV switchgear, water-cooled cables on 200 A+ designs, signage + lighting + canopy + payment integration. Cert evidence bundle: ALL eight regulatory layers, structured digital folder, kept by site operator + installer + CPO. Total project: £500k-£1.5m typical (depending on DNO connection cost + canopy + payment infra)."
            whyItMatters="Public DC fast hubs are commercial real-estate projects with electrical infrastructure inside. The regulatory stack is at full extent. The installer’s role is one of many — DNO, civils, transformer supplier, charger OEM, CPMS provider, payment infrastructure, planning authority, accessibility audit, signage / branding. Cert evidence bundle structures the multi-vendor compliance picture. UK 2025-26 reality: dozens of such hubs built per year by Gridserve, InstaVolt, IONITY, Tesla Supercharger, Octopus Electroverse + others."
          />

          <CommonMistake
            title="Treating a workplace install as a public install — over-engineering against PCAR"
            whatHappens="Installer quotes a workplace install (employees only) with full PCAR 2023 compliance — payment terminal at every bay, 24/7 helpline, public roaming integration, PAS 1899 accessibility everywhere. Customer pays for ~£10k of additional infrastructure they don’t need. Cert evidence bundle includes PCAR + PAS 1899 layers that don’t apply."
            doInstead="Site classification first. PCAR 2023 applies only to chargers AVAILABLE TO THE PUBLIC. Workplace chargers used only by employees / contractors / visitors are NOT public — PCAR doesn’t apply. SCP Regulations 2021 + Section 722 + OZEV WCS (if grant) cover workplace. The simpler stack saves the customer cost and the installer time. Cert evidence bundle records the workplace classification + the layers that actually apply."
          />

          <CommonMistake
            title="Skipping BS EN IEC 61439-7 on a multi-charger assembly"
            whatHappens="Installer fits 6 × wallboxes on a workplace site, each from a separate Henley block + dedicated cable. Doesn’t use a shared distribution assembly. Two years later, customer expands to 12 bays via a shared distribution panel. The new shared panel doesn’t carry BS EN IEC 61439-7 certification — assembly was site-fabricated. EICR + insurance review flags the gap."
            doInstead="For any multi-charger site, plan the distribution from the start. Use a manufacturer-certified BS EN IEC 61439-7 assembly (rather than site-fabricated). Future-proof for expansion. Cert evidence bundle records the assembly’s 61439-7 conformity DoC at install. Where existing site-fabricated distribution is encountered at retrofit, the upgrade is the right answer — not pretending the assembly is compliant."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Commercial EV charging covers five install patterns: workplace, public AC, public DC fast, fleet depot, commercial-curtilage. All within Section 722 scope.',
              'Section 722 regs apply per charger uniformly — domestic and commercial. The M6 layers (earthing-tree, RCD architecture, dedicated circuit, conformity) scale identically.',
              'BS EN IEC 61439-7:2023 governs multi-charger assemblies. Mandatory wherever ≥2 chargepoints share a common enclosure / distribution panel.',
              'EREC G98 (Type A: ≤16 A per phase) / G99 (above, or generation present) — DNO notification + connection agreement. Commercial sites with BESS / V2G always trigger G99.',
              'PCAR 2023 — Public Charge Point Regulations 2023. Applies only to chargepoints AVAILABLE TO THE PUBLIC. Workplace exempt.',
              'PAS 1899:2022 — accessibility for public charge points. Mounting heights, connector reach, payment terminal accessibility, signage.',
              'OZEV schemes — Workplace Charging Scheme (workplace, £350/socket × 40 max), Local EV Infrastructure (public), EV Chargepoint Grant (domestic landlords).',
              'SCP Regulations 2021 — default off-peak + randomised delay + security + data privacy. Workplace included; public excluded.',
              'Reg 543.7.1.202 — protective conductor current >10 mA threshold for higher-integrity connection. Multi-charger banks can accumulate; designer assesses cumulative PE current.',
              'Site classification is the quote-stage decision: who accesses, who pays, what charger types, what supply, what funding. Drives the regulatory stack + cert evidence bundle structure.',
              'Section 722 + Section 708 layer on caravan-park EV charging. Both Sections apply where EVs are charged from pitch infrastructure.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 1 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/renewable-energy-module-7')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 7
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-7-section-2')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                7.2 Three-phase 22 kW Mode 3 install
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
