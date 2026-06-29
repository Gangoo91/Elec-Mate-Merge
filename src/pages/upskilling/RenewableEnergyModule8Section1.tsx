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
    id: 'm8s1-architectures',
    question:
      'Which three heat pump architectures dominate UK 2025-26 domestic and light-commercial installs?',
    options: [
      'Solar thermal, wood burner and direct electric resistance heating',
      'Air-to-air split AC, gas absorption units and CHP microturbines',
      'Direct electric boilers, storage heaters and immersion-only DHW',
      'Air source (ASHP), ground source (GSHP) and exhaust-air heat pumps',
    ],
    correctIndex: 3,
    explanation:
      'UK 2025-26 dominant heat pump architectures: (1) ASHP — air-to-water (heating + DHW via water cylinder) or air-to-air (split AC-style, less common in UK heating). Outdoor unit houses compressor + outdoor coil + fan; indoor side has hydraulic interface + circulation pumps + cylinder. (2) GSHP — extracts heat from ground via borehole (vertical, typical for higher heat loads) or horizontal collector (typical for rural with land available). Indoor unit only; ground loop drilled / trenched by specialist. (3) Exhaust-air — extracts heat from exhaust ventilation air; integrated unit; typical in MVHR-equipped airtight new builds. All run a vapour-compression refrigerant cycle driven by an electric compressor. UK 2025-26 stock heavily ASHP (~85% of new installs); GSHP minority (higher upfront cost; longer payback); exhaust-air a niche pattern.',
  },
  {
    id: 'm8s1-installer-scope',
    question: 'Where does the BS 7671 electrical installer’s scope end on a heat pump install?',
    options: [
      'At the electrical supply, circuit, ADS and commissioning — not the refrigerant circuit, sizing, hydraulic loop or MCS handover',
      'At the refrigerant circuit too, provided the electrician holds a Part P registration',
      'At the room-by-room heat loss calculation and MCS-approved product selection',
      'At nothing — the electrician covers the whole job end-to-end and issues the MCS handover',
    ],
    correctIndex: 0,
    explanation:
      'Heat pump install is multi-trade. ELECTRICAL installer (BS 7671 + Part P + competent person scheme): supply assessment + DNO liaison; dedicated circuit + RCBO + RCD architecture; ADS verification + Zs measurement; cable sizing + outdoor SWA + indoor cable run; isolator at outdoor unit; control wiring; immersion backup circuit; commissioning per Part 6 / Chapter 64; certification (EIC). NOT the electrical installer’s scope: refrigerant circuit (REFCOM F-Gas Cat 1 certified person; F-Gas Regs 2015 / 517/2014); heat pump sizing per MCS / MIS 3005-D:2025 methodology (room-by-room heat loss calc + MCS-approved product list); hydraulic loop / radiator / UFH design (heating engineer); MCS handover paperwork (MCS-certified company only). Cert evidence bundle for the electrical scope records the BS 7671 EIC; MCS handover is a separate document.',
  },
  {
    id: 'm8s1-load-profile',
    question: 'Typical UK 2025-26 domestic ASHP electrical load profile?',
    options: [
      'About 0.1 kW continuous like an LED lighting circuit, on a 6 A MCB with negligible inrush',
      'A flat 100 kW continuous draw needing a three-phase 250 A supply on every domestic install',
      'Single-phase ~1.5-4 kW electrical input continuous (COP ~3), inrush 3-8×, ~5-7 kW peak with immersion',
      'A fixed 13 A plug-in draw set by the 3 kW immersion element whatever the thermal output',
    ],
    correctIndex: 2,
    explanation:
      'UK 2025-26 domestic ASHP load profile: 5-12 kW thermal output is dominant for typical 3-4 bed property; COP ~3 (so electrical input ~1.5-4 kW continuous when compressor runs). Compressor start-up inrush: 3-8× running current for ~100-500 ms (~25-60 A peak from ~6-15 A running) — design constraint for protective device curve selection (C or D curve for motor inrush vs B for resistive). Add: 3 kW immersion backup element (for boost / legionella cycle / fault fallback); 100-300 W circulation pumps (primary + secondary); 50-150 W controls + sensors. Typical peak electrical demand: 5-7 kW for full-power running + immersion + pumps. Larger units (16-30 kW thermal, big houses / agricultural / commercial) move to three-phase. Cert evidence bundle records the manufacturer’s rated electrical input + sustained operating current + inrush characteristics.',
  },
  {
    id: 'm8s1-bs7671-scope',
    question: 'Where does BS 7671 specifically apply to a heat pump install?',
    options: [
      'Across Parts 4-7 — Reg 311.1, 314, 411.4, 415.1, 421/422, 522.2.1, 554 and 643',
      'Only to the outdoor SWA run between the consumer unit and the outdoor unit',
      'Only to the DHW cylinder immersion circuit and nothing else on the install',
      'Nowhere — heat pumps are exempt from BS 7671 and fall under MCS instead',
    ],
    correctIndex: 0,
    explanation:
      'BS 7671 has no dedicated Section for heat pumps (no "Section 754") — they’re treated as fixed equipment under general Parts 4-7. Regulatory anchors: Reg 311.1 (max demand calc — drives supply assessment); Reg 314 (division of installation — heat pump on its own dedicated circuit, mirroring M6 / M7 EV pattern); Reg 411.4 ADS + earth fault loop impedance verified at outdoor unit; Reg 415.1 30 mA RCD additional protection; Reg 421.11 + 421.1.4 + 422.3.2 thermal protection of fixed equipment (Section 421/422 explicitly addresses fixed equipment with concentration of heat — applies to compressor + immersion + circulation pump motors); Reg 522.2.1 wiring protection from external heat sources (relevant where cable runs near hot pipework or outdoor unit fan); Reg 554.2 / 554.3 heaters for liquids having immersed heating elements (the backup immersion in DHW cylinder — note 554.1 is electrode heaters, a different appliance); Reg 643.x Part 6 testing; EREC G98 / G99 for DNO notification. Cert evidence bundle records each regulation’s application per the install.',
  },
];

const quizQuestions = [
  {
    question:
      'A customer asks an electrician to "install a heat pump" — what is the realistic delivery model in UK 2025-26?',
    options: [
      'Multi-trade — MCS company sizes and supplies, F-Gas Cat 1 does refrigerant, heating engineer the hydraulics, electrician the supply, circuit, ADS and EIC',
      'The electrician sizes, supplies, fits and commissions the whole unit including refrigerant and hydraulics, then issues the MCS handover pack',
      'The plumber leads and the electrician simply connects a 13 A plug to the outdoor unit once the hydraulics are filled',
      'The customer buys the unit, a general builder fits it, and the electrician attends only to sign an EICR afterwards',
    ],
    correctAnswer: 0,
    explanation:
      'UK 2025-26 heat pump install reality: multi-trade. MCS-certified heat pump company (e.g. Octopus Energy Heat Pumps, British Gas Net Zero, Daikin Sustainable Home Network installers) sizes + supplies the unit per MCS / MIS 3005-D:2025 methodology; their subcontracted trades cover refrigerant (F-Gas Cat 1 person — REFCOM accredited), hydraulic loop (heating engineer / plumber), and electrical (this course’s scope — BS 7671 electrician under Part P competent person scheme). Customer typically signs a single contract with the MCS company; subcontractors deliver under that umbrella. Cert evidence bundle: electrical scope delivers BS 7671 EIC; MCS company delivers MCS handover pack which includes the EIC as one input. Boundary clarity at quote stage protects everyone.',
  },
  {
    question: 'What is the role of MCS / MIS 3005-I / -D:2025 for a heat pump install?',
    options: [
      'They are the electrical wiring standards that replace BS 7671 for any property fitted with a heat pump or other microgeneration equipment',
      'They are voluntary marketing badges with no bearing on grant eligibility, sizing methodology or installer competence requirements',
      'They are the MCS heat pump install (-I) and design (-D) standards setting sizing, product approval, competence and handover requirements, and are required to unlock the Boiler Upgrade Scheme grant',
      'They cover only the refrigerant circuit and F-Gas competence, leaving sizing and handover entirely to BS 7671',
    ],
    correctAnswer: 2,
    explanation:
      'MCS (Microgeneration Certification Scheme) is the UK certification body for low-carbon energy products + installers. The old monolithic MIS 3005 split in 2025 into MIS 3005-I:2025 (Installation Standard) and MIS 3005-D:2025 (Design Standard) — together the rulebook for heat pump design + install. Sets requirements for: sizing / design methodology (heat loss calc per BS EN 12831-1:2017 / SAP / Passivhaus PHPP — the -D standard); product approval (only MCS-approved heat pumps qualify for UK Government Boiler Upgrade Scheme grant funding, currently £7,500 in 2025-26); installer company competence (must be MCS-certified to issue handover paperwork that unlocks grant); customer-facing documentation including the MCS handover pack. Separate regulatory layer from BS 7671 (electrical wiring regs). The MCS company issues the MCS handover; the BS 7671 electrical scope is one input to that pack. Cert evidence bundle for the electrical scope records the BS 7671 EIC; MCS handover is the MCS company’s deliverable.',
  },
  {
    question: 'F-Gas Regulations 2015 — relevance to heat pump electrical install?',
    options: [
      'They set the cable sizing and RCD type for the heat pump supply, so the electrician applies them in place of BS 7671 Appendix 4',
      'They have no relevance whatsoever to a heat pump install because heat pumps do not contain refrigerant gases',
      'They allow any competent electrician to break and remake refrigerant joints provided the supply is isolated first',
      'They govern the refrigerant circuit, so connection / break / leak repair needs an F-Gas Cat 1 person — work the electrician must not do even temporarily',
    ],
    correctAnswer: 3,
    explanation:
      'F-Gas Regulations 2015 (UK retained law from EU Regulation 517/2014) govern refrigerants with high Global Warming Potential. UK 2025-26 typical refrigerants in new ASHP install: R32 (GWP 675, mainstream 2020-onwards) or R290 (propane, GWP 3 — emerging premium option). Legacy R410A (GWP 2088) being phased out. Refrigerant work (making / breaking / charging / repairing the gas-tight refrigerant circuit) requires F-Gas Cat 1 certified person, typically REFCOM accredited under the UK F-Gas scheme. Electrical installer scope explicitly does NOT include refrigerant work — even temporarily disconnecting a refrigerant line to move an outdoor unit triggers F-Gas requirements. Heat pump units typically arrive factory pre-charged + sealed; F-Gas Cat 1 person makes the install-time refrigerant connection. Cert evidence bundle for the electrical scope records the BS 7671 EIC + notes the F-Gas certified person on file for the refrigerant scope (boundary clarity).',
  },
  {
    question: 'Single-phase 7 kW ASHP vs three-phase 16 kW ASHP — what changes electrically?',
    options: [
      'The 7 kW unit (~10-13 A on 230 V) fits the existing 100 A supply; the 16 kW unit needs a three-phase supply most homes lack, so a DNO upgrade is typically required',
      'Both units run from a standard 13 A single-phase socket, so the only difference is the length of the outdoor cable run',
      'The three-phase unit draws less total power than the single-phase unit, so it needs no supply assessment or DNO involvement',
      'Nothing of substance changes; both are wired on identical 32 A single-phase circuits regardless of the available supply',
    ],
    correctAnswer: 0,
    explanation:
      'Single-phase 7 kW thermal ASHP: ~2-3 kW electrical input continuous (COP ~3); 10-13 A on 230 V running; existing 100 A single-phase domestic supply usually adequate after diversity + max demand calc per Reg 311.1. Three-phase 16 kW thermal ASHP: ~5-6 kW electrical input continuous; 8-9 A per phase on 400 V three-phase. Most existing UK domestic supplies are single-phase only — three-phase upgrade required from the DNO (timeline 3-12 months + cost £3-15k typical 2025-26). DNO heat pump notification portal (per-phase ≤16 A analogous to G98 generation threshold) typically covers pure-load heat pump; G99 if site has co-located generation (PV / BESS / V2G). Cert evidence bundle records: phase configuration + max demand calc + DNO correspondence + reference number.',
  },
  {
    question: 'A new build with 8 kW ASHP + MVHR + future EV charging — what is the supply design implication?',
    options: [
      'Size the supply to the heat pump alone today, since the EV charger and future PV can always be added on the same single-phase circuit later',
      'Fit a single 16 A circuit feeding the heat pump, MVHR and future charger in turn via a manual changeover switch',
      'Design for the total future load (~15 kW coincident peak), fitting three-phase upfront (~£500-1,500 extra) to future-proof for EV, PV, BESS and G99 export',
      'No supply design is needed on a new build because the DNO automatically gives three-phase to every new dwelling',
    ],
    correctAnswer: 2,
    explanation:
      'New build with electrified heat + EV — design for the total future load, not just today’s install. Coincident peak: 8 kW ASHP electrical (~3 kW) + 7 kW EV charger + 3 kW immersion + 2-4 kW base load ≈ 15 kW peak with diversity; single-phase 60-80 A. Adding three-phase at construction stage costs an extra £500-1,500 typically (vs £3-15k to upgrade retrospectively). Three-phase future-proofs for: 22 kW three-phase EV charger; co-located PV + BESS + V2G (Chapter 82 PEI integration); GSHP retrofit (typically larger thermal output); solar export EREC G99 generation; full house electrification. UK 2025-26 best-practice for new-build with electrified heat + EV: three-phase as default. Cert evidence bundle records the supply design rationale + future-proofing headroom + DNO connection agreement.',
  },
  {
    question: 'Heat-pump-ready electrical infrastructure as a separate scope from heat pump install — what does this mean?',
    options: [
      'Preparing the electrical infrastructure before the heat pump arrives — CU way, outdoor cable, isolator, supply upgrade — so the customer can stage the cost',
      'A manufacturer pre-charging the refrigerant circuit at the factory so no F-Gas person is needed on the install day',
      'A label the DNO applies to a property to confirm it already has a heat pump connected and notified',
      'A term for sizing the heat pump generously so that it never needs to call on the immersion backup element',
    ],
    correctAnswer: 0,
    explanation:
      'Heat-pump-ready electrical infrastructure = preparing the electrical scope ahead of the heat pump install. UK 2025-26 emerging service offering: customer commits to heat pump direction but stages the cost — electrical scope (dedicated CU way + outdoor cable routed + isolator at outdoor unit location + supply upgrade if three-phase) is done first; heat pump procurement + MCS install happens 3-24 months later when customer is ready. Reduces install-day complexity + lets customers plan the budget. Electrical scope deliverables: dedicated final circuit terminated at a junction box at the future outdoor unit location; supply upgraded; CU labelled. When the heat pump arrives, the MCS company connects the existing terminated cable + commissions. Cert evidence bundle records the heat-pump-ready scope + the future heat pump model expected + the planned connection.',
  },
];

const faqs = [
  {
    question: 'Why doesn’t BS 7671 have a dedicated heat pump section?',
    answer:
      'BS 7671 treats heat pumps as fixed current-using equipment — subject to general Parts 4-7. The thermal protection (Section 421/422), wiring protection (Reg 522.2), ADS (Reg 411), additional protection (Reg 415), and verification (Part 6) all apply. The heat pump industry has its own dedicated standards (MCS / MIS 3005-I / -D:2025 for design + install; F-Gas Regs for refrigerant; BS EN 14511 / BS EN 14825 for product performance). The electrical install side is a small slice of the total scope — but it’s the slice this course addresses.',
  },
  {
    question: 'Boiler Upgrade Scheme grant — what is it in UK 2025-26?',
    answer:
      'UK Government grant administered by Ofgem. £7,500 for an ASHP install (£7,500 for GSHP as of 2025-26). Eligibility: domestic property in England + Wales (Scotland + NI separate schemes), valid EPC, MCS-certified installer company, MCS-approved heat pump product. Customer’s scope: own the property + commit to operating + EPC. Installer’s scope: MCS certification + sizing per MIS 3005-D:2025 + handover pack + claim through Ofgem portal. Verify the current grant rate + eligibility at install / quote stage — scheme rates evolve.',
  },
  {
    question: 'Does a heat pump need its own consumer unit?',
    answer:
      'Industry-norm best practice: dedicated CU way (one RCBO) per heat pump on the existing CU. Where the heat pump is large (three-phase) or installed alongside extensive electrified heat / EV / PV / BESS, a separate sub-CU at the heat pump location (with its own busbar + RCBOs for compressor + immersion + pumps + controls) is common. Reflects M6 / M7 EV install pattern. Cert evidence bundle records the topology.',
  },
  {
    question: 'What about hybrid heat pump (gas + heat pump combined) installs?',
    answer:
      'Hybrid = heat pump as primary heat source with a gas / oil boiler backup for cold-weather peaks. UK 2025-26 niche but growing — useful for properties where full heat pump sizing would be prohibitive. Electrical scope: heat pump electrical install as normal; the gas / oil boiler is separate scope (Gas Safe / OFTEC). Controls integration to coordinate the two heat sources is the operational interface. MCS / MIS 3005-I / -D:2025 covers the hybrid system; F-Gas covers the heat pump refrigerant.',
  },
  {
    question: 'Heat pump noise — relevant to the electrical installer?',
    answer:
      'Marginally. The compressor + fan generate noise (typically 40-55 dB(A) at 1m). Planning permission / Permitted Development Rights specify maximum noise at neighbouring property boundary (usually 42 dB(A) at 1m from the neighbour’s building per UK PDR 2019). Outdoor unit siting must meet this; planning consent may be needed for non-PDR-compliant locations. Electrical installer’s indirect involvement: the outdoor unit location drives the cable run, isolator placement, condensate drain access — site survey at quote stage.',
  },
];

export default function RenewableEnergyModule8Section1() {
  const navigate = useNavigate();

  useSEO({
    title: 'Heat pumps in the UK electrical context | Renewable Energy 8.1 | Elec-Mate',
    description:
      'Heat pumps from the installer’s electrical side — ASHP / GSHP / exhaust-air, MCS / MIS 3005-I / -D:2025 framework as external installer competency, BS 7671 scope delineated, UK 2025-26 typical install patterns + load profile + multi-trade delivery model.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-8')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 8
          </button>

          <PageHero
            eyebrow="Module 8 · Section 1 · BS 7671:2018+A4:2026 · Fixed equipment scope"
            title="Heat pumps in the UK electrical context"
            description="ASHP / GSHP / exhaust-air heat pumps from the installer’s electrical perspective. What an electrician’s scope covers vs the MCS / MIS 3005-I / -D:2025 / F-Gas framework that surrounds it. UK 2025-26 install patterns, typical load profiles, multi-trade delivery model, where BS 7671 enters."
            tone="yellow"
          />

          <TLDR
            points={[
              'Heat pumps are NOT a dedicated BS 7671 Section. Treated as fixed equipment under general Parts 4-7 — Reg 311.1, Reg 314, Reg 411.4, Reg 415.1, Reg 421/422, Reg 522.2, Reg 554, Reg 643.',
              'UK 2025-26 architectures: ASHP (dominant, ~85% new installs), GSHP (minority — higher upfront, longer payback), exhaust-air (niche — MVHR-equipped new builds).',
              'Heat pump install is multi-trade. Electrical scope = one engineering layer alongside MCS-certified company (sizing + procurement), F-Gas Cat 1 person (refrigerant), heating engineer (hydraulic loop).',
              'MCS / MIS 3005-I / -D:2025 = the heat pump install (-I) and design (-D) standards. Required for the Boiler Upgrade Scheme grant (£7,500 typical 2025-26). Separate regulatory layer from BS 7671.',
              'F-Gas Regs 2015 govern refrigerants (typically R32 or R290 in UK 2025-26). Refrigerant work requires F-Gas Cat 1 certified person (REFCOM accredited). NOT electrical installer scope.',
              'Typical load profile: single-phase ASHP 5-12 kW thermal ≈ 1.5-4 kW electrical input continuous + 3 kW immersion + 100-300 W pumps. Larger units (16-30 kW thermal) shift to three-phase.',
              'Heat-pump-ready electrical infrastructure = emerging service offering. Customer stages the cost by doing electrical prep first, heat pump install later.',
              'BS 7671 enters at: supply assessment (Reg 311.1), dedicated circuit (Reg 314 + industry norm), thermal protection of fixed equipment (Reg 421/422), wiring from heat sources (Reg 522.2), ADS (Reg 411.4), 30 mA RCD (Reg 415.1), immersion backup (Reg 554), Part 6 verification (Reg 643).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Classify the three heat pump architectures (ASHP / GSHP / exhaust-air) and identify the electrical scope per architecture.',
              'Distinguish the BS 7671 electrical installer’s scope from the MCS / MIS 3005-I / -D:2025 / F-Gas / hydraulic engineer scopes.',
              'Apply the BS 7671 regulatory anchors that DO cover heat pumps: Reg 311.1, Reg 314, Reg 411.4, Reg 415.1, Reg 421/422, Reg 522.2, Reg 554, Reg 643.',
              'Estimate UK 2025-26 typical electrical load profile for single-phase and three-phase heat pump installs.',
              'Apply the multi-trade delivery model: MCS-certified company + F-Gas Cat 1 + heating engineer + electrical installer; boundary clarity at quote stage.',
              'Recognise the Boiler Upgrade Scheme grant context (£7,500 UK 2025-26) and the MCS / MIS 3005-I / -D:2025 certification requirement that unlocks it.',
              'Offer heat-pump-ready electrical infrastructure as a separate scope where customer is staging the cost.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            BS 7671 has no Section for heat pumps. The wiring regs don’t need one — fixed equipment under Parts 4-7 already covers it. The heat pump industry has its own standards on top.
          </Pullquote>

          <ContentEyebrow>What the heat pump industry looks like to an electrician</ContentEyebrow>

          <ConceptBlock
            title="The three heat pump architectures"
            plainEnglish="UK 2025-26 domestic + light-commercial heat pump installs cluster around three architectures: Air Source (ASHP — air-to-water dominant), Ground Source (GSHP — borehole or horizontal collector), and exhaust-air (integrated, MVHR-equipped new builds). All driven by an electric compressor running a vapour-compression refrigerant cycle."
            onSite="ASHP dominates because it has the lowest install complexity (no ground loop, no MVHR retrofit). GSHP suits larger heat loads + properties with land availability. Exhaust-air suits airtight new builds with mechanical ventilation. The electrical installer integrates with all three — the architecture changes the outdoor / indoor layout but not the BS 7671 scope materially."
          >
            <p>Architecture summary:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">ASHP air-to-water</strong> — outdoor
                unit (compressor + outdoor coil + fan) + indoor hydraulic interface +
                DHW cylinder. UK 2025-26 dominant (~85% new domestic installs)
              </li>
              <li>
                <strong className="text-white">ASHP air-to-air</strong> — split-system
                style (no water loop); less common in UK heating context but used in
                some apartment / commercial settings
              </li>
              <li>
                <strong className="text-white">GSHP borehole</strong> — vertical bore
                (typical 50-150 m deep per kW thermal); specialist drilling required;
                indoor unit only. Higher upfront cost; longer payback; minority share
              </li>
              <li>
                <strong className="text-white">GSHP horizontal collector</strong> —
                trenched ground loop (typical 1-1.5 m deep); needs land area (~150-300
                m² per kW thermal); rural / agricultural pattern
              </li>
              <li>
                <strong className="text-white">Exhaust-air</strong> — extracts heat
                from the home’s exhaust ventilation air; integrated unit; suits
                MVHR-equipped airtight new builds
              </li>
              <li>
                <strong className="text-white">Hybrid (gas + heat pump)</strong>
                — heat pump as primary; gas / oil boiler as cold-peak backup. Niche but
                growing for properties where full heat pump sizing would be prohibitive
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="MCS / MIS 3005-I / -D:2025 — the installer competency framework that surrounds the heat pump"
            plainEnglish="MCS (Microgeneration Certification Scheme) is the UK certification body for low-carbon energy products + installers. The old monolithic MIS 3005 split in 2025 into MIS 3005-I:2025 (Installation Standard) and MIS 3005-D:2025 (Design Standard) — together the rulebook covering design / sizing methodology, product approval, installer competence, and customer handover documentation. Required to issue the handover paperwork that unlocks the Boiler Upgrade Scheme grant."
            onSite="The MCS company is the customer’s primary contractor. They size the heat pump (per BS EN 12831 heat loss calc), select an MCS-approved product, coordinate the multi-trade install, and issue the MCS handover. The electrical installer (Part P competent person under BS 7671) delivers the electrical scope as a subcontract or partnership under that umbrella. Cert evidence bundle for the electrical scope sits inside the larger MCS handover pack."
          >
            <p>MCS framework elements:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Sizing methodology</strong> — BS EN
                12831 room-by-room heat loss calc + SAP / PHPP for whole-house; the
                heat pump is sized to match the building’s loss at design temperature
              </li>
              <li>
                <strong className="text-white">Product approval</strong> — only
                MCS-approved heat pumps qualify for UK Government grants. Approved
                products listed on the MCS website per category + capacity
              </li>
              <li>
                <strong className="text-white">Installer competence</strong> — company
                must be MCS-certified to issue the handover. Individual installers
                trained per MCS curriculum (typically LCL Awards Level 3 Award in the
                Installation + Maintenance of Heat Pumps)
              </li>
              <li>
                <strong className="text-white">Customer handover documentation</strong>
                — MCS pack includes sizing calc + commissioning record + product details +
                warranties + maintenance schedule + EIC (from the electrical install) +
                F-Gas record (from the refrigerant scope)
              </li>
              <li>
                <strong className="text-white">Boiler Upgrade Scheme
                  grant</strong> — UK Government grant £7,500 typical 2025-26;
                administered by Ofgem; customer claim submitted by MCS company;
                requires MCS handover + MCS-approved product
              </li>
              <li>
                <strong className="text-white">Boundary with BS 7671</strong> — MCS is
                the heat pump industry framework; BS 7671 is the wiring regs framework.
                Both apply to the same install; the cert evidence bundle records each
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 421.11 — Protection against thermal effects (fixed equipment context)"
            clause="Persons, livestock and property shall be protected against harmful effects of heat or fire which may be generated or propagated in electrical installations. Manufacturers’ instructions shall be taken into account in addition to the requirements of BS 7671."
            meaning="Reg 421.11 is the foundational fixed-equipment thermal-protection regulation. Heat pumps (compressor + fan + immersion + circulation pumps) generate heat in normal operation; the install must protect adjacent material from harmful thermal effects. Manufacturer’s install manual specifies clearance, ventilation, vibration isolation — these instructions are read TOGETHER with BS 7671 not in place of it. Cert evidence bundle records: outdoor unit clearance dimensions; cable routing distance from hot pipework / outdoor unit fan; immersion + cylinder enclosure thermal envelope; manufacturer install manual reference + version + date."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>The multi-trade delivery model</ContentEyebrow>

          <Pullquote>
            Electrical install is one engineering layer of four on a heat pump job. Knowing where your scope ends — and where the next person’s starts — is the install competence.
          </Pullquote>

          <ConceptBlock
            title="Four trades on every heat pump install"
            plainEnglish="A UK 2025-26 heat pump install involves four distinct trades. MCS-certified company owns the customer relationship + sizing + product selection + handover. F-Gas Cat 1 certified person (REFCOM accredited) makes the refrigerant connections. Heating engineer fits the hydraulic loop + radiators / UFH. Electrical installer (this course’s scope) delivers the BS 7671 electrical install."
            onSite="Customer signs one contract with the MCS company. Subcontractors deliver their layer. Each trade keeps their own competence + paperwork + certification. The MCS company orchestrates + issues the master handover. Cert evidence bundle for the electrical scope sits inside the larger pack."
          >
            <p>The four trades + boundaries:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">MCS-certified
                  company</strong> — sizing per MIS 3005-D:2025 + BS EN 12831-1:2017; product
                selection from MCS approved list; customer contract; MCS handover pack;
                Boiler Upgrade Scheme grant claim
              </li>
              <li>
                <strong className="text-white">F-Gas Cat 1 person
                  (REFCOM)</strong> — refrigerant circuit. Makes the install-time
                connection of the factory-charged outdoor unit; tests for leaks;
                commissions the refrigerant side; F-Gas record. NOT an electrical
                scope
              </li>
              <li>
                <strong className="text-white">Heating engineer</strong> — hydraulic
                loop, radiators / UFH, hot water cylinder hydraulic connections,
                circulation pumps, expansion vessel, system fill + balance.
                Traditional plumber / heating engineer trade
              </li>
              <li>
                <strong className="text-white">BS 7671 electrical
                  installer</strong> — this course’s scope. Supply assessment + DNO
                liaison; dedicated circuit + protective devices; RCD architecture; ADS
                verification + Zs; cable + isolator; immersion backup circuit; control
                wiring; commissioning per Part 6; EIC
              </li>
              <li>
                <strong className="text-white">Boundary clarity at
                  quote stage</strong> — define which trade does what. Especially
                important at the refrigerant / electrical interface (the outdoor unit
                electrical connection follows the refrigerant connection — sequence
                matters)
              </li>
              <li>
                <strong className="text-white">Cert evidence bundle
                  structure</strong> — electrical scope delivers the BS 7671 EIC
                + Schedule of Inspections + Schedule of Test Results; MCS handover pack
                includes the EIC as one input alongside the F-Gas record + sizing
                calc + commissioning report
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="F-Gas Regulations 2015 — what an electrician needs to know"
            plainEnglish="F-Gas Regulations 2015 (UK retained law from EU Regulation 517/2014) govern fluorinated greenhouse gas refrigerants. UK 2025-26 typical refrigerants in new ASHP install: R32 (GWP 675) or R290 (propane, GWP 3, emerging). Legacy R410A (GWP 2088) being phased out. Refrigerant work requires F-Gas Cat 1 certified person — NOT electrical installer scope."
            onSite="The electrical installer does not touch the refrigerant circuit. Even temporarily disconnecting a refrigerant line to reposition an outdoor unit triggers F-Gas certification requirements. Heat pump units arrive factory pre-charged + sealed; the F-Gas Cat 1 person makes the install-time refrigerant connection. Boundary clarity protects the electrician from F-Gas liability."
          >
            <p>F-Gas context for the electrical installer:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Refrigerants
                  governed</strong> — fluorinated greenhouse gases (R32, R410A
                legacy, R134a) + recently R290 propane (technically a hydrocarbon, F-Gas
                framework still relevant). High GWP = high regulatory attention
              </li>
              <li>
                <strong className="text-white">Cat 1 certified
                  person</strong> — required for refrigerant connection + leak repair
                + commissioning + decommissioning. UK 2025-26 typical accreditation
                via REFCOM
              </li>
              <li>
                <strong className="text-white">R290 propane</strong> —
                emerging premium refrigerant; lower GWP (3 vs 675 for R32); used in some
                new ASHP models (Vaillant aroTHERM Plus, Mitsubishi Ecodan R290).
                Hydrocarbon — flammable; additional siting + safety considerations
              </li>
              <li>
                <strong className="text-white">Electrical
                  installer’s role</strong> — none on refrigerant; presence at
                install for sequencing + electrical commissioning coordination
              </li>
              <li>
                <strong className="text-white">Sequencing on
                  install day</strong> — typically: hydraulic + electrical first
                fix (cable terminated at junction box at outdoor location);
                refrigerant Cat 1 person makes refrigerant connection + tests; electrical
                installer makes electrical connection at outdoor unit + commissioning
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — electrical scope records: F-Gas Cat 1 person’s
                name + REFCOM number + refrigerant connection date on file (for
                handover-pack cross-reference); electrical install only proceeds after
                refrigerant connection complete
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>UK 2025-26 install patterns + load profile</ContentEyebrow>

          <ConceptBlock
            title="Typical electrical load profile"
            plainEnglish="UK 2025-26 domestic ASHP electrical load profile: 5-12 kW thermal output (typical 3-4 bed property) ≈ 1.5-4 kW electrical input continuous when running (COP ~3). Start-up inrush 3-8× running current. Add 3 kW immersion backup + 100-300 W circulation pumps + 50-150 W controls = typical 5-7 kW peak electrical demand."
            onSite="Inrush drives protective device curve selection (C or D curve for motor inrush vs B for resistive loads). Continuous compressor running drives cable thermal sizing. Peak with immersion + pumps drives supply max demand assessment. UK 2025-26 typical wallbox-style approach: dedicated circuit + 32 A RCBO C-curve + 6 mm² T+E or 10 mm² SWA outdoor."
          >
            <p>Load profile breakdown:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Single-phase 7 kW
                  thermal ASHP</strong> — 2-3 kW electrical input continuous
                (COP ~3); 10-13 A on 230 V running; standard for 3-bed terraced /
                semi-detached property
              </li>
              <li>
                <strong className="text-white">Single-phase 12 kW
                  thermal ASHP</strong> — 3-4 kW electrical input continuous;
                13-18 A on 230 V running; standard for 4-bed detached property
              </li>
              <li>
                <strong className="text-white">Start-up inrush</strong>
                — 3-8× running current for ~100-500 ms (motor compressor starting +
                stabilising). Compressor start-current driver of protective device
                curve choice (C or D curve preferred over B)
              </li>
              <li>
                <strong className="text-white">Backup immersion</strong>
                — 3 kW typical; used for boost + legionella cycle + fault fallback.
                Reg 554.x applies (Section 6 details)
              </li>
              <li>
                <strong className="text-white">Circulation pumps</strong>
                — primary (between heat pump + buffer) + secondary (between buffer +
                emitters); 100-300 W combined typical
              </li>
              <li>
                <strong className="text-white">Controls + sensors</strong>
                — 50-150 W typical (thermostat + zone valves + OAT sensor + controller)
              </li>
              <li>
                <strong className="text-white">Three-phase
                  threshold</strong> — units &gt;12 kW thermal (typical 16, 20, 25, 30
                kW thermal for larger properties / agricultural / light commercial) move
                to three-phase 400 V supply for electrical reasons (higher input
                current would need uneconomically large single-phase cable / supply)
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — manufacturer’s rated electrical input + sustained
                operating current + inrush characteristics; supply max demand calc;
                protective device selection rationale
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Four UK 2025-26 install patterns"
            plainEnglish="UK 2025-26 heat pump installs cluster around four patterns. Retrofit gas-boiler swap (~70% by volume); new-build first-fit (~20%); upgrade from existing electric heating (~5%); leisure / agricultural / commercial-curtilage (~5%). Each pattern has distinct electrical implications."
            onSite="Pattern drives the supply assessment + DNO involvement + cable routing + customer experience. Retrofit gas swap is the dominant scenario but most disruptive (existing supply often inadequate). New-build first-fit is the cleanest (electrical infrastructure designed in from start). Site classification at quote stage."
          >
            <p>The four patterns:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Retrofit gas-boiler
                  swap</strong> — dominant pattern. Customer’s existing supply often
                inadequate (typical 60-100 A single-phase). New dedicated circuit for
                ASHP from CU. Possibly supply upgrade for larger units. Customer
                experience disruptive (heating off for 1-3 days)
              </li>
              <li>
                <strong className="text-white">New-build
                  first-fit</strong> — heat pump + electrical infrastructure
                designed in from start. Three-phase often default. Dedicated CU way
                + outdoor cable run + isolator at design stage. Boiler Upgrade Scheme
                grant applicable
              </li>
              <li>
                <strong className="text-white">Upgrade from
                  existing electric heating</strong> — replacing old direct-electric
                heating (storage heaters, electric boilers, immersion-only DHW) with
                heat pump. Electrical demand DROPS (heat pump uses ~1/3 the energy of
                direct electric for same output). Supply usually already adequate
              </li>
              <li>
                <strong className="text-white">Leisure / agricultural /
                  commercial-curtilage</strong> — caravan parks, holiday lets, rural
                cottages, agricultural buildings, small commercial premises. Often
                three-phase. Specialist supply considerations
              </li>
              <li>
                <strong className="text-white">Heat-pump-ready
                  prep</strong> — emerging UK 2025-26 service offering. Customer pays
                for electrical infrastructure now (CU way + outdoor cable + isolator +
                supply upgrade if needed); heat pump installed later when customer is
                financially ready or technology has matured further
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 311.1 + Reg 314 — max demand + division of installation"
            clause="Reg 311.1: For economic and reliable design, the maximum demand of the installation, including current demand, shall be determined. Reg 314.1: Every installation shall be divided into circuits, as necessary, to avoid danger and minimise inconvenience in the event of a fault, to facilitate safe operation, inspection, testing and maintenance, and to take account of hazards that may arise from the failure of a single circuit such as a lighting circuit."
            meaning="Reg 311.1 + Reg 314 frame the supply assessment + circuit-design conversation. For heat pump installs: Reg 311.1 max demand assessment determines whether the existing supply can accommodate the heat pump’s electrical input (continuous + inrush) plus existing site load with diversity; Reg 314 division of installation drives the industry-norm dedicated-circuit-per-heat-pump topology (mirroring M6 / M7 EV pattern). Cert evidence bundle records: max demand calc + diversity assumptions + supply capacity verification + dedicated circuit + protective device selection per circuit + DNO correspondence + reference if upgrade required."
          />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <Scenario
            title="Retrofit gas-boiler swap — 4-bed semi-detached"
            situation="Customer commits to replacing 35-year-old gas combi boiler with an ASHP. 4-bed semi-detached; current supply 100 A single-phase; existing CU 12-way with 4 spare ways. MCS-certified company has quoted: 9 kW Vaillant aroTHERM Plus R290 ASHP + 200 L unvented DHW cylinder + radiator upgrade. Customer eligible for £7,500 Boiler Upgrade Scheme grant."
            whatToDo="Electrical scope: max demand assessment per Reg 311.1 — 9 kW ASHP thermal ≈ 3 kW electrical input + 3 kW immersion + 200 W pumps + existing site load ~5 kW peak (cooker + appliances) = ~11 kW with diversity. 100 A single-phase supply (23 kW capacity) adequate. Dedicated circuit per Reg 314 + industry norm: 32 A Type A RCBO C-curve + 6 mm² T+E indoor + 10 mm² 3-core SWA from indoor termination to outdoor unit + outdoor isolator (BS EN 60947-3) + Earth electrode if PME-on-outdoor-equipment alternative applied per Reg 411.4 (heat pump outdoor unit similar to EV PME challenge — manufacturer typically supplies OPDD-equivalent or specifies TT electrode). Type A RCD covers AC + pulsating DC; if VSD inverter compressor declared internal smooth-DC leakage in DoC, escalate to Type F or B per §8.5. Backup immersion circuit: 16 A Type A RCBO + 30 mA additional protection per Reg 415.1. Controls wiring: low-voltage 0.75 mm² screened cable for OAT sensor + thermostat. Commissioning per Part 6: visual + IR + ADS + Zs + RCD trip-time + functional test of compressor + immersion + pumps + controls. EIC delivered to MCS company for inclusion in handover pack. F-Gas Cat 1 person (REFCOM) handles refrigerant + delivers F-Gas record separately. Heating engineer fits hydraulic loop + radiator upgrade. Customer experience: 2-day install (day 1: refrigerant + hydraulic + electrical first fix; day 2: electrical second fix + commissioning + handover)."
            whyItMatters="Retrofit gas swap is the dominant UK 2025-26 heat pump install pattern. The electrical scope is the smallest of the four trades by labour-hours (~4-8 hours typical) but critical: without the electrical commissioning + EIC, the MCS handover can’t complete + the grant can’t be claimed. Boundary clarity at quote stage (signed scope-of-works between MCS company + electrical subcontractor) protects everyone. Cert evidence bundle for the electrical scope sits inside the larger MCS handover pack delivered to customer + Ofgem for grant administration."
          />

          <Scenario
            title="New-build with heat pump + EV + PV — three-phase as default"
            situation="New-build 5-bed detached. Builder + architect designing-in: 8 kW ASHP + 7 kW EV charger (futureproofed for 22 kW three-phase upgrade) + 6 kWp PV + 5 kWh BESS for self-consumption. Customer wants minimum-fuss energy infrastructure."
            whatToDo="Three-phase 100 A supply specified at construction stage (extra ~£800 over single-phase 100 A; future-proofs the property). Dedicated three-phase CU + EV CU sub-distribution + heat pump dedicated circuit + PV dedicated circuit + BESS dedicated circuit. Heat pump electrical scope: 8 kW thermal ≈ 3 kW electrical input continuous; on single-phase from the three-phase supply (heat pump in this size range typically single-phase even on three-phase supply); dedicated 32 A Type A RCBO C-curve + 6 mm² T+E + 10 mm² SWA outdoor + isolator. Coordinate the install: heat pump + EV + PV + BESS all integrated under Chapter 82 PEI framework (Reg 826.x). Heat-pump-ready infrastructure: even if customer wants heat pump installed at handover, the design accommodates future capacity expansion (10-12 kW thermal upgrade later). Cert evidence bundle integrates Section 712 PV + Chapter 57 BESS + heat pump electrical scope + EV M6 / M7 scope under the PEI Chapter 82 umbrella. MCS handover pack incorporates the EIC."
            whyItMatters="New-build first-fit is the cleanest heat pump install pattern. Three-phase as default future-proofs for full house electrification + co-located PV + BESS + EV. UK 2025-26 best-practice for new builds with electrified heat: three-phase + PEI Chapter 82 integration. The marginal cost of three-phase at construction stage is small (~£800) compared to retrospective upgrade (£3-15k). Cert evidence bundle is structured + integrated across all four chapters from day one."
          />

          <CommonMistake
            title="Quoting the heat pump electrical scope as a single afternoon job"
            whatHappens="Electrician quotes 4 hours for the install — based on the wallbox-style mental model. Reality on the day: supply assessment reveals existing CU is full (no spare way), needs CU change first; outdoor cable run is 25 m through a non-existent containment route (needs new conduit + brick chasing); isolator location at outdoor unit clashes with refrigerant routing (sequencing issue); commissioning + functional test of integrated compressor + immersion + pump + controls + OAT sensor takes 2 hours alone. Reality: 1.5-2 days. Customer + MCS company unhappy; install delayed."
            doInstead="Quote with full site survey first. Walk the property: existing CU capacity, outdoor unit location + cable route, condensate drain path, isolator clearance, indoor termination point, controls wiring route, existing supply assessment. Coordinate with the MCS company on F-Gas / hydraulic sequencing. Allow 1-1.5 days typical for a domestic ASHP electrical scope. Cert evidence bundle records the survey + the scoped-out work; clear customer expectations from quote stage."
          />

          <CommonMistake
            title="Treating refrigerant work as ‘just unplugging something’"
            whatHappens="Outdoor unit needs to move 1 m to accommodate a customer planning request. Electrician assumes the disconnect-move-reconnect can be done quickly without specialist certification — has neither F-Gas Cat 1 certification nor REFCOM accreditation. Refrigerant escapes; F-Gas regulation breach; £-thousands fine + reportable incident; customer left without functional heating + a damaged outdoor unit."
            doInstead="Refrigerant work — ANY connection / disconnection / repositioning that affects the refrigerant circuit — requires F-Gas Cat 1 certified person (typically REFCOM accredited). Electrical installer’s role at this stage is COORDINATION not action. Even temporary line disconnections trigger F-Gas requirements. Move the outdoor unit BEFORE the F-Gas person makes the install-time refrigerant connection, or call the F-Gas person back to disconnect + reconnect. Cert evidence bundle records the boundary."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Heat pumps are NOT a dedicated BS 7671 section. Treated as fixed equipment under general Parts 4-7.',
              'Three UK 2025-26 architectures: ASHP (dominant), GSHP (minority — higher upfront), exhaust-air (niche — MVHR new builds).',
              'Heat pump install is multi-trade: MCS company (sizing + handover) + F-Gas Cat 1 (refrigerant) + heating engineer (hydraulic) + BS 7671 electrical installer (supply + circuit + commissioning).',
              'MCS / MIS 3005-I / -D:2025 are the heat pump install (-I) and design (-D) competency standards. Required for the Boiler Upgrade Scheme grant (£7,500 UK 2025-26).',
              'F-Gas Regs 2015 govern refrigerants — refrigerant work is F-Gas Cat 1 certified person scope, NOT electrical installer. UK 2025-26 typical refrigerants: R32 or R290 (propane).',
              'Single-phase 5-12 kW thermal ASHP ≈ 1.5-4 kW electrical input continuous (COP ~3); typical UK domestic range.',
              'Three-phase threshold: units &gt;12 kW thermal typically move to three-phase.',
              'BS 7671 enters at: Reg 311.1 max demand, Reg 314 division of installation (dedicated circuit per heat pump), Reg 411.4 ADS, Reg 415.1 30 mA RCD, Reg 421/422 thermal protection, Reg 522.2 wiring from heat sources, Reg 554 immersion backup, Reg 643 verification.',
              'Four UK 2025-26 install patterns: retrofit gas swap (~70%), new-build first-fit (~20%), upgrade from existing electric (~5%), leisure / agricultural / commercial-curtilage (~5%).',
              'Heat-pump-ready electrical infrastructure as an emerging service offering — customer stages the cost by doing the electrical prep before the heat pump arrives.',
              'Cert evidence bundle for the electrical scope: BS 7671 EIC + Schedule of Inspections + Schedule of Test Results. Sits inside the MCS handover pack alongside F-Gas record + sizing calc + commissioning report.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 1 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/renewable-energy-module-8')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 8
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-8-section-2')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                8.2 Supply assessment + DNO notification
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
