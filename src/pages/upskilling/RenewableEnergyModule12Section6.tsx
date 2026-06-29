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
import { McsHandoverPack } from '@/components/study-centre/diagrams/renewableM12';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm12s6-mcs-pack-purpose',
    question:
      'What is the purpose of an MCS handover pack?',
    options: [
      'A marketing brochure given to the customer to promote the installer’s other services and products',
      'An optional internal checklist the installer keeps for its own records but does not share with the customer',
      'A purely electrical certificate that satisfies BS 7671 alone and plays no part in unlocking grant funding',
      'The integrated customer-facing deliverable for an MCS-certified install that also unlocks grant funding',
    ],
    correctIndex: 3,
    explanation:
      'MCS handover pack purpose: (1) Customer-facing deliverable — single integrated package covering everything the customer needs at completion + over the install lifecycle. (2) Grant funding gate — UK 2025-26 Boiler Upgrade Scheme (heat pumps + biomass) + previously RHI + future grants all require MCS-certified company + MCS handover pack as the entry point for the grant submission. (3) Warranty support — manufacturer warranty registration + the MCS company\'s installation guarantee (typically 6-12 yr workmanship). (4) Insurance support — many home insurance policies require MCS-compliant install for LCT coverage. (5) Audit trail — supports future EICR-equivalent + any warranty / insurance / dispute resolution. (6) Components: MCS sizing report (heat loss survey for heat pump; yield modelling for PV; capacity sizing for BESS); product details + DoCs; commissioning record (BMS + inverter + anti-islanding + grid sync); BS 7671 EIC + Schedule of Inspections + Schedule of Test Results; DNO EREC G98 / G99 reference where applicable; grant submission paperwork; customer operating guide; warranty registrations; ongoing monitoring setup. (7) MCS company role — primary contractor; subcontracts specialist trades where needed (electrician, plumber, refrigerant engineer); orchestrates the install + handover.',
  },
  {
    id: 'm12s6-electrician-contribution',
    question:
      'What does the BS 7671 electrician contribute to the MCS handover pack?',
    options: [
      'The BS 7671 EIC, its Schedules of Inspections and Test Results, and the supporting protective-architecture and DNO evidence',
      'Nothing — the MCS company compiles the whole pack and the electrician only energises the supply afterwards',
      'Only the signed EIC itself, with the schedules and protective-architecture detail supplied by the manufacturer',
      'Only a verbal confirmation to the MCS company that the wiring was completed to a safe and tidy standard',
    ],
    correctIndex: 0,
    explanation:
      'BS 7671 electrician contribution to MCS handover pack: (1) Electrical Installation Certificate per Reg 644.5 — compiled + signed by skilled person competent to verify BS 7671 has been met; identifies the work + the designer + installer + verifier + customer + date + protective device data + Schedule references. (2) Schedule of Inspections per Reg 642.3 — items (a)-(r) checked + observation noted; supports the EIC. (3) Schedule of Test Results per Reg 643 — circuit-by-circuit test results: continuity, IR, polarity, loop impedance, RCD operation, prospective fault current; LCT extensions per Section 712 / Chapter 57 / Section 722 / Section 551 / Reg 712.421.101 IMD / Reg 722.411.4 OPDD / Reg 551.7.5 anti-islanding. (4) Addition / alteration per Reg 641.5 — existing-install assessment recorded + any remediation documented. (5) Protective architecture — RCD types, OPDD or TT alternative architecture choice + rationale; multi-source coordination per Reg 551.4.2 + Reg 415.1. (6) Cross-references — Section 712 PV / Chapter 57 BESS / Section 722 EV / Section 551 generating sets per applicable LCT. (7) Photographic / thermographic evidence per Reg 653.2 NOTE — supports findings. (8) DNO supporting documentation — EREC G98 / G99 reference; anti-islanding test record; ENA notification submission. The electrician\'s contribution is the BS 7671 anchor of the MCS handover pack.',
  },
  {
    id: 'm12s6-mis-3001-3008',
    question:
      'What are MIS 3001-3008 + how do they relate to the handover pack structure?',
    options: [
      'A single combined standard that applies identically to every renewable technology with no per-technology variation at all',
      'British Standards for cable sizing that the electrician applies the same way regardless of the generating technology',
      'Technology-specific MCS Installer Standards, each shaping the per-technology sections of a common handover pack structure',
      'Optional industry guidance documents that have no real bearing on the structure or content of the handover pack',
    ],
    correctIndex: 2,
    explanation:
      'MIS (MCS Installer Standards) framework: (1) Purpose — define the installer competency + product approval + customer documentation + warranty requirements per LCT technology. (2) MIS 3001 — Solar Thermal: collectors + DHW integration; sizing methodology + commissioning + customer guide. M9 §9.3 covered. (3) MIS 3002 — Solar PV: sizing yield model + product approval list + commissioning record + customer guide. M2-M4 covered. (4) MIS 3003 — Small Wind (≤50 kW): turbine + mast + electrical + planning. M9 §9.2 covered. (5) MIS 3004 — Biomass (wood / pellet): heat-only + biomass-CHP variants. M9 §9.4 covered. (6) MIS 3005 — Heat Pumps: ASHP / GSHP / exhaust-air; BUS grant gateway. M8 covered. (7) MIS 3006 — older Ground Source Heat Pumps; now consolidated into MIS 3005. (8) MIS 3007 — micro-CHP (≤50 kW): combined heat + electrical; Stirling engine + fuel cell + IC variants. M9 §9.5 covered. (9) MIS 3008 — micro-hydro (≤50 kW): turbine + civils + grid connection. M9 §9.7 covered. (10) Common handover pack structure across all MIS: sizing report + product details + DoCs + commissioning record + BS 7671 EIC + customer guide + warranty + grant paperwork. (11) Per-MIS technology-specific detail: sizing methodology + commissioning checklist + customer operating instructions specific to the technology. (12) MCS-certified company is the primary contractor; competency assessed per MIS scope.',
  },
  {
    id: 'm12s6-grant-funding',
    question:
      'What UK 2025-26 grants are relevant to MCS handover packs?',
    options: [
      'No grants exist for renewable installs in 2025-26; every government support scheme has now closed to new entrants',
      'The Boiler Upgrade Scheme is the only relevant route, and it covers every renewable technology including solar PV',
      'The Feed-in Tariff still pays for new PV exports, while the Renewable Heat Incentive still funds new heat pumps',
      'The Boiler Upgrade Scheme (heat pumps and some biomass) and the Smart Export Guarantee for exported generation',
    ],
    correctIndex: 3,
    explanation:
      'UK 2025-26 LCT grant landscape: (1) Boiler Upgrade Scheme (BUS) — government grant for low-carbon heating: ASHP £7,500 typical; GSHP £7,500 typical; biomass up to £5,000 (Wales) / not in England + Scotland for biomass 2025-26. Requires MCS-certified company + MCS handover pack + property eligibility + EPC certificate. Submitted to Ofgem. (2) Smart Export Guarantee (SEG) — replaced FIT in 2020; DNO-licensed energy suppliers must offer SEG tariff for exported electricity from PV / BESS / wind / hydro / CHP up to 5 MW; per-supplier rates (typically 1-15p/kWh in 2025-26 depending on supplier + contract); not a grant but ongoing income. Requires MCS-certified install + appropriate metering + EREC G98 / G99 + DNO submission. (3) Historical schemes: FIT (Feed-in Tariff) closed to new entrants 2019 — existing FIT contracts continue for 20-25 yr remaining lifetime per contract. RHI (Renewable Heat Incentive) closed to new entrants 2022 — existing RHI contracts continue for 7 yr lifetime per contract. (4) Regional variation: Wales has additional grants (HEEP); Scotland has Home Energy Scotland grants + loans; Northern Ireland has separate schemes. (5) Verification — installer + customer verify current scheme rates + eligibility at quote stage; cert evidence bundle integrates grant submission paperwork. (6) Future: A4:2026 + UK energy policy continuing evolution; grants likely to evolve through the 2025-30 horizon.',
  },
];

const quizQuestions = [
  {
    question:
      'PV install: 6 kWp domestic. What does the MCS handover pack typically contain?',
    options: [
      'Only the BS 7671 EIC, since that is the single document the grant bodies and energy suppliers actually require',
      'Only the MCS sizing report and yield model, with all the remaining paperwork held by the inverter manufacturer',
      'A sizing report, DoCs, commissioning record, EIC and schedules, EREC notification, warranty, customer guide and SEG paperwork',
      'A set of installation photographs and the customer’s signed acceptance, which together satisfy the MIS 3002 requirement',
    ],
    correctAnswer: 2,
    explanation:
      'PV MCS handover pack typical contents (MIS 3002): (1) MCS sizing report — yield modelling per MCS methodology (kWh/yr estimate for the specific roof + array + location + shading); payback estimate based on consumption + SEG tariff + self-consumption fraction; specification of modules + inverter + balance of system. (2) Product details + DoCs — PV modules with BS EN 61215-1-2, -1-4, -1-3:2017 compliance; inverter with BS EN 62109-1 + -2; mounting frame manufacturer; ancillary items. (3) Commissioning record — manufacturer engineer\'s commissioning of inverter (firmware version + commissioning checklist); Reg 712.421.101 IMD self-test result; Reg 551.7.5 anti-islanding test result; grid synchronisation + export verified. (4) BS 7671 EIC — Reg 644.5 signed by skilled person; Schedule of Inspections per Reg 642.3; Schedule of Test Results per Reg 643 + Section 712 extensions. (5) EREC notification — G98 (small ≤16 A per phase generation, fast-track post-install) or G99 (larger, formal pre-install application); DNO reference. (6) Warranty registration — modules typically 25 yr; inverter 10-25 yr; mounting + frame per manufacturer. (7) Customer operating guide — system overview, monitoring portal access, fault response, contacts. (8) SEG (Smart Export Guarantee) eligibility paperwork — submitted to energy supplier for export tariff. (9) Cert evidence bundle integrates the above for installer audit + customer + DNO + Ofgem.',
  },
  {
    question:
      'Heat pump install (ASHP, BUS grant claim). What additional handover pack items relate to the grant?',
    options: [
      'MCS heat-pump certification, a heat-loss survey, a valid EPC, the Ofgem BUS submission, customer consent and the payment route',
      'No grant-specific items at all; the BUS claim relies entirely on the standard MCS handover pack exactly as supplied',
      'Only the property EPC needs adding, since the rest of the BUS claim is handled entirely outside of the handover pack',
      'Only a separate insurance certificate for the heat pump, which Ofgem requires before it will release any grant money',
    ],
    correctAnswer: 0,
    explanation:
      'BUS grant-specific handover pack additions: (1) MCS Heat Pump certified company — MIS 3005 covering ASHP / GSHP / exhaust-air; the company\'s certification verified by Ofgem at submission. (2) Heat loss survey — MCS methodology room-by-room calculation; verifies heat pump capacity correctly sized for the property; not over- or under-sized. (3) MCS sizing report — aligns heat pump output capacity (kWth) to heat loss + DHW demand; defines flow temperature + emitter strategy. (4) EPC (Energy Performance Certificate) — UK 2025-26 BUS typically requires property to have a valid EPC of certain rating (band C or above for most BUS schemes, or with insulation improvements recommended) — verify current scheme requirements at quote stage. (5) BUS submission via Ofgem portal — property details + grant amount + system specs + MCS certification + customer consent. (6) Customer consent + acknowledgement — customer signs to confirm understanding of grant terms + their obligations (e.g. running system per intended design). (7) Grant payment route — typically Ofgem pays installer; installer deducts grant value from customer invoice; customer pays installer net + Ofgem pays grant; alternative: customer pays gross + Ofgem reimburses customer (less common). (8) Plus all standard MCS handover pack items (sizing + commissioning + BS 7671 EIC + customer guide + warranty registrations). (9) Cert evidence bundle integrates grant submission for audit.',
  },
  {
    question:
      'BESS install — MCS standard + handover pack components?',
    options: [
      'There is no MCS framework for battery storage, so a BESS install needs no formal handover documentation at all',
      'A BESS handover pack is identical to a PV pack and simply reuses the PV sizing report and the PV EIC unchanged',
      'BESS is never installed on its own and so is only ever documented as a short appendix to a heat-pump pack',
      'A sizing report, DoCs, BMS commissioning record, Chapter 57 compliance, anti-islanding evidence, EIC, warranty and guide',
    ],
    correctAnswer: 3,
    explanation:
      'BESS handover pack components (MCS Battery Storage develops; typical BESS handover): (1) Sizing report — BESS capacity (kWh) vs household average consumption + PV pairing + self-consumption modelling; payback estimate per SEG + electricity tariff. (2) Product details + DoCs — battery cells / modules per IEC 62619 + IEC 62133; inverter per BS EN 62109; BMS per manufacturer; ancillary equipment. (3) Manufacturer commissioning record — BMS commissioning (cell balance, communications, fault tolerance); initial SoC + SoH baseline; firmware version; alarm thresholds. (4) Chapter 57 install compliance — battery installation per BS 7671 Chapter 57; isolation, segregation, ventilation. (5) Reg 551.7.5 anti-islanding — BESS inverter disconnects on simulated grid-loss; DNO-witnessed or manufacturer self-test. (6) BS 7671 EIC — Reg 644.5; Schedule of Inspections + Schedule of Test Results; Chapter 57 + Section 551 + Section 712 (where co-located) cross-references. (7) EREC notification — G98 fast-track for small (≤16 A per phase) or G99 formal for larger. (8) Warranty registration — typically 10 yr with SoH ≥ 70-80% threshold + throughput limit. (9) Customer operating guide — portal access, expected lifecycle (SoH degradation curve), warranty terms, alert response, emergency shutdown, contacts. (10) Cert evidence bundle integrates for lifecycle audit + warranty + insurance.',
  },
  {
    question:
      'Multi-source LCT install (PV + BESS + heat pump + EV) — single handover pack OR per-source?',
    options: [
      'Always per-source — each technology must be documented in a completely separate pack with no integration at all',
      'Either an integrated single pack for a simultaneous install, or per-source packs when sources are added at different times',
      'Always a single combined certificate that omits the per-technology detail to keep the customer’s handover pack short',
      'A pack is only needed for the single highest-value source; the remaining technologies are just recorded informally',
    ],
    correctAnswer: 1,
    explanation:
      'Multi-source LCT handover pack: (1) Integrated approach (preferred for new-build + simultaneous multi-source install): single MCS company contracts the customer + integrates per-source MIS standard contributions; single comprehensive handover pack with per-source sections; single BS 7671 EIC covering the integrated electrical install with per-source schedules; single customer touchpoint + single warranty correspondence + single record for future EICR-equivalent. (2) Per-source approach (when sources added at different times by different installers): each MCS-certified installer provides their own MCS handover pack for the technology they installed; integration happens at the customer\'s record-keeping level; future EICR-equivalent verifier integrates the records. (3) Hybrid approach (most common in practice): customer initially installed PV via MCS PV installer (MIS 3002 handover pack); later adds BESS via same or different installer (BESS handover pack); later adds heat pump (MIS 3005 handover pack + BUS grant); later adds EV charger (separate). Customer accumulates multiple handover packs over years; cert evidence bundle at the property level integrates all. (4) MCS company coordination — for sites with multi-source, the MCS company often serves as the coordinator across the lifetime of the install + future additions; familiarity + records continuity. (5) UK 2025-26 reality: increasing integration as multi-source LCT becomes standard new-build + retrofit pattern; MCS framework adapting to support integrated handover.',
  },
  {
    question:
      'Cert evidence bundle vs MCS handover pack — same thing?',
    options: [
      'Yes — the two terms simply describe exactly the same document under two different interchangeable names',
      'No — the evidence bundle is only the test results, while the handover pack is only the customer’s operating guide',
      'Related but distinct: the handover pack is the snapshot at completion; the evidence bundle is the ongoing lifecycle record',
      'No — the handover pack is retained by the installer and the evidence bundle is the part given to the customer',
    ],
    correctAnswer: 2,
    explanation:
      'MCS handover pack vs cert evidence bundle: (1) MCS handover pack — customer-facing deliverable at completion; integrated package per MIS standard; given to customer in paper + digital format; supports warranty + insurance + grant + initial customer education. (2) Cert evidence bundle — installer\'s comprehensive lifecycle record; opens at install + grows over the install life; includes the MCS handover pack as the foundation + adds: periodic EICR-equivalent reports, firmware updates applied, alarm events + responses, manufacturer correspondence, warranty claims, customer touchpoint records, photographic + thermographic images over time, modification + addition records, end-of-life. (3) Overlap — most contents at completion are shared: sizing + commissioning + EIC + DoCs + manufacturer commissioning records + customer guide. (4) Differences — cert evidence bundle is ongoing + comprehensive lifecycle record (installer-side); MCS handover pack is the snapshot at completion (customer-facing). (5) Customer access — customer has the MCS handover pack at completion + can request relevant cert evidence bundle items at periodic reviews. (6) Installer obligation — retain cert evidence bundle for the install lifecycle + audit period (typically 6-10 yr post-install for tax + insurance + audit). (7) Throughout this course \"cert evidence bundle\" has been used as the installer\'s lifecycle record; MCS handover pack as the customer-facing deliverable. (8) UK 2025-26 reality: paper + digital coexist; cloud-based cert management platforms emerging.',
  },
  {
    question:
      'DNO submission within the MCS handover pack — what is typically included?',
    options: [
      'An EREC notification, single-line diagram, inverter DoC, connection and export details, test record and contractor details',
      'No DNO submission is needed at all, because the MCS certificate on its own already authorises the grid connection',
      'Only the sizing report, which the DNO then uses entirely on its own to decide whether to allow the connection',
      'Only the customer’s recent electricity bill, which proves the property has an adequate supply available for export',
    ],
    correctAnswer: 0,
    explanation:
      'DNO submission components within MCS handover pack: (1) EREC notification — G98 (post-install notification, fast-track) for generation ≤16 A per phase (typical small PV ≤ 3.68 kW single-phase or ≤ 11 kW three-phase); G99 (pre-install formal application) for larger or multi-source. ENA standard format. (2) Single-line diagram — system topology showing source(s), inverter(s), connection point, protective devices, isolators, anti-islanding device, meter location. (3) Inverter type + manufacturer DoC + BS EN 62109 compliance + anti-islanding certification — DNO needs to confirm the inverter meets G98 / G99 protection requirements (RoCoF + voltage / frequency deviation, active loss-of-mains detection — G99 disallows Vector Shift for type-tested generation, so RoCoF is the required loss-of-mains method on the type-tested inverters used in virtually all LCT installs; Vector Shift is legacy / non-type-tested only). (4) Connection point + supply capacity + estimated export — at which point the generation connects to the LV supply + the supply capacity (typically 100 A single-phase or 100 A per phase three-phase) + estimated peak + average export. (5) Anti-islanding test record per Reg 551.7.5 — at commissioning the inverter\'s anti-islanding function tested; DNO-witnessed or manufacturer self-test per their procedure. (6) Contractor + skilled person details — MCS-certified company + electrician\'s name + BS 7671 competency. (7) DNO reference returned — assigned by the DNO upon acceptance; included in MCS handover pack + cert evidence bundle. (8) SEG registration — once DNO reference assigned, customer registers with their chosen energy supplier for SEG tariff; supplier verifies MCS + DNO + handover pack.',
  },
];

const faqs = [
  {
    question: 'Who keeps the MCS handover pack?',
    answer:
      'Customer retains the primary copy (paper + digital) + the installer retains a copy in their cert evidence bundle. Grant body (Ofgem) keeps a submission copy where grant applicable. The customer\'s copy supports warranty claims + property sale + future EICR-equivalent verifier reference + insurance. The installer\'s copy supports audit + warranty correspondence + future service.',
  },
  {
    question: 'What happens to the MCS handover pack if the property is sold?',
    answer:
      'The handover pack travels with the property — included in the home sale conveyancing documents alongside EPC + planning + other property records. The new owner takes over the warranty (per manufacturer terms, often transferable) + the BUS grant continuation (BUS grant typically tied to property + system, not original owner). New owner contacts the original installer / manufacturer for continued service relationship.',
  },
  {
    question: 'Are MCS handover packs digital, paper, or both?',
    answer:
      'UK 2025-26 increasingly both: digital primary (PDF + cloud) + paper printed for customer records. MCS framework supports digital handover; some grant bodies require digital submission. Cloud-based cert management platforms (some MCS-certified, some 3rd-party) emerging for installer + customer + grant body access.',
  },
  {
    question: 'What if the installer is not MCS certified — can they still complete the LCT install?',
    answer:
      'For grant-eligible technology (heat pumps, biomass for BUS): MCS-certified company required for grant; non-MCS installer cannot unlock the grant. For non-grant technology (LCT installed without grant funding): MCS not strictly required; BS 7671 + manufacturer-certified-installer status + competent skilled person all required. Many non-MCS LCT installs happen + are entirely legal; the customer foregoes grant funding + may have reduced warranty / insurance flexibility.',
  },
  {
    question: 'Does the MCS handover pack include the maintenance schedule?',
    answer:
      'Yes — customer operating guide section typically includes recommended maintenance schedule + manufacturer service intervals + EICR-equivalent cycle (5-10 yr). Forward-looking commitments: annual customer self-check + portal review + manufacturer-recommended service + professional EICR-equivalent + future warranty review. Cert evidence bundle records each touchpoint as it happens.',
  },
];

export default function RenewableEnergyModule12Section6() {
  const navigate = useNavigate();

  useSEO({
    title: 'MCS handover packs — common structure across LCT | Renewable Energy 12.6 | Elec-Mate',
    description:
      'MCS handover pack as the integrating customer-facing document. Sizing report + commissioning record + DoC + EIC + grant submission + customer guide. Common structure across MIS 3001-3008. BS 7671 electrician contribution + cert evidence bundle integration. UK 2025-26 BUS grant + SEG path.',
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
            eyebrow="Module 12 · Section 6 · BS 7671:2018+A4:2026 · MCS framework + Reg 644.5"
            title="MCS handover packs — common structure across LCT"
            description="The MCS handover pack as the integrating customer-facing document — sizing report + commissioning record + product DoCs + BS 7671 EIC + grant submission + customer operating guide. Shared structure across MIS 3001-3008. The BS 7671 electrician\'s contribution + integration with the cert evidence bundle. UK 2025-26 grant landscape + DNO submission."
            tone="yellow"
          />

          <TLDR
            points={[
              'MCS handover pack = integrated customer-facing deliverable from MCS-certified company at install completion.',
              'Shared structure across MIS 3001-3008: sizing report + product DoCs + commissioning record + BS 7671 EIC + customer guide + warranty + grant paperwork.',
              'BS 7671 electrician contribution: EIC per Reg 644.5 + Schedule of Inspections (Reg 642.3) + Schedule of Test Results (Reg 643) + LCT extensions + Section / Chapter cross-references.',
              'MIS standards: 3001 solar thermal; 3002 PV; 3003 wind; 3004 biomass; 3005 heat pumps; 3007 micro-CHP; 3008 micro-hydro.',
              'UK 2025-26 grants: BUS (heat pumps + some biomass £7,500 typical); SEG (export tariff for generation up to 5 MW); regional schemes.',
              'DNO submission within MCS handover pack: EREC G98 / G99 + SLD + inverter DoC + anti-islanding test + DNO reference.',
              'Cert evidence bundle = installer\'s lifecycle record (ongoing); MCS handover pack = customer-facing deliverable (snapshot at completion).',
              'Multi-source LCT: integrated single handover pack OR per-source documents; common UK 2025-26 hybrid approach (different installers + dates).',
              'MCS handover pack travels with property — included in sale conveyancing documents.',
              'Digital + paper coexist; cloud-based cert management platforms emerging.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Describe the purpose + structure of the MCS handover pack.',
              'Identify the BS 7671 electrician contribution to the MCS handover pack.',
              'Map MIS 3001-3008 to the appropriate LCT technology.',
              'Identify UK 2025-26 grant funding routes (BUS, SEG, regional) relevant to MCS handover.',
              'Compose DNO submission components within the MCS handover pack.',
              'Distinguish MCS handover pack (customer-facing) from cert evidence bundle (installer lifecycle record).',
              'Approach multi-source LCT handover pack integration (single vs per-source).',
              'Position MCS handover pack alongside warranty + insurance + property sale + future EICR-equivalent.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            The MCS handover pack is what the customer takes away. The cert evidence bundle is what the installer keeps. Both matter — neither replaces the other.
          </Pullquote>

          <ContentEyebrow>MCS handover pack purpose + structure</ContentEyebrow>

          <ConceptBlock
            title="MCS handover pack — integrated customer-facing deliverable"
            plainEnglish="MCS (Microgeneration Certification Scheme) handover pack is the integrated customer-facing deliverable at completion of an MCS-certified LCT install. Single comprehensive document set covering sizing + product + commissioning + BS 7671 + grant + warranty + customer guide. The MCS-certified company orchestrates + signs off."
            onSite="The customer receives the handover pack in paper + digital format. It supports the customer over the install lifecycle — warranty claims, property sale, EICR-equivalent verifier reference, insurance, peace of mind. The cert evidence bundle (installer\'s lifecycle record) builds around the handover pack."
          >
            <p>MCS handover pack core contents:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">MCS sizing
                  report</strong> — yield modelling / heat loss survey / capacity sizing
                per MCS methodology + technology-specific MIS standard
              </li>
              <li>
                <strong className="text-white">Product
                  details + DoCs</strong> — manufacturer datasheets + DoCs for modules /
                inverter / BMS / heat pump / mounting / ancillary
              </li>
              <li>
                <strong className="text-white">Commissioning
                  record</strong> — manufacturer engineer commissioning (inverter +
                BMS); Reg 712.421.101 IMD (PV); Reg 551.7.5 anti-islanding (generators);
                grid synchronisation
              </li>
              <li>
                <strong className="text-white">BS 7671 EIC +
                  Schedules</strong> — electrician\'s Electrical Installation
                Certificate + Schedule of Inspections + Schedule of Test Results;
                Reg 644.5 signed
              </li>
              <li>
                <strong className="text-white">DNO
                  submission</strong> — EREC G98 / G99 + SLD + inverter DoC +
                anti-islanding test + DNO reference (where grid-paralleled)
              </li>
              <li>
                <strong className="text-white">Grant
                  submission paperwork</strong> — BUS / SEG / regional scheme + customer
                consent + property eligibility (EPC) + Ofgem submission
              </li>
              <li>
                <strong className="text-white">Warranty
                  registrations</strong> — manufacturer warranties (modules, inverter,
                BMS, heat pump per technology); installer workmanship guarantee
              </li>
              <li>
                <strong className="text-white">Customer
                  operating guide</strong> — system overview, monitoring portal access,
                fault response, emergency shutdown, maintenance schedule, contacts
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="BS 7671 electrician contribution to the handover pack"
            plainEnglish="The electrician\'s contribution is the BS 7671 anchor — the EIC + Schedule of Inspections + Schedule of Test Results + LCT-specific extensions. This sits alongside the MCS company\'s sizing + commissioning + customer guide content. Single integrated handover pack with multi-trade signatures."
            onSite="UK 2025-26 reality: the electrician\'s EIC is increasingly recognised as the foundational compliance document in the MCS handover pack. Warranty + insurance + future EICR-equivalent all reference the EIC. Comprehensive + clear + signed by the competent skilled person."
          >
            <p>Electrician contribution items:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">BS 7671 EIC
                  per Reg 644.5</strong> — work description, designer, installer,
                verifier, customer, date, protective device data, Schedule references;
                signed by skilled person
              </li>
              <li>
                <strong className="text-white">Schedule of
                  Inspections per Reg 642.3</strong> — items (a)-(r) checked +
                observation; supports the EIC
              </li>
              <li>
                <strong className="text-white">Schedule of
                  Test Results per Reg 643</strong> — circuit-by-circuit: continuity, IR,
                polarity, loop impedance, RCD operation, PFC; LCT extensions
              </li>
              <li>
                <strong className="text-white">Reg 641.5
                  addition / alteration verification</strong> — existing-install
                assessment + remediation record where applicable
              </li>
              <li>
                <strong className="text-white">Protective
                  architecture</strong> — RCD types, OPDD or TT alternative + rationale;
                multi-source coordination per Reg 551.4.2 + Reg 415.1
              </li>
              <li>
                <strong className="text-white">Section /
                  Chapter cross-references</strong> — Section 712 (PV) + Chapter 57 (BESS)
                + Section 722 (EV) + Section 551 (generating sets) per applicable LCT
              </li>
              <li>
                <strong className="text-white">Photographic
                  / thermographic evidence per Reg 653.2 NOTE</strong> — supports findings
                + provides audit trail
              </li>
              <li>
                <strong className="text-white">DNO supporting
                  documentation</strong> — anti-islanding test record + protective device
                data + SLD; integrates with the MCS company\'s DNO submission
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 644.5 — EIC compilation + signing"
            clause="Electrical Installation Certificates and Minor Electrical Installation Works Certificates shall be compiled and signed or otherwise authenticated by one or more skilled persons, competent to verify that the requirements of BS 7671 have been met."
            meaning="Reg 644.5 places the EIC in the hands of skilled persons competent to verify BS 7671. For the MCS handover pack the EIC is the foundational BS 7671 compliance document — supports the entire pack\'s validity for warranty + insurance + grant + property sale + future EICR-equivalent. The skilled person\'s signature on the EIC is the audit anchor. For LCT installs, the EIC carries the BS 7671 electrician\'s name + competency credentials; in multi-trade installs the MCS company\'s sign-off integrates with the BS 7671 EIC. UK 2025-26 reality: the EIC quality drives the MCS handover pack quality. A poorly-compiled EIC undermines the customer\'s entire LCT investment + jeopardises warranty + insurance. Investment in EIC discipline pays back across the install lifecycle. Cert evidence bundle keeps the electrician\'s copy of EIC + supporting evidence; MCS handover pack is the customer-facing version + the grant body submission."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>MIS standards + UK 2025-26 grant landscape</ContentEyebrow>

          <Pullquote>
            MIS 3001 to 3008 is the alphabet of LCT installer competency. Each standard wraps the same BS 7671 install in technology-specific sizing + commissioning + customer education.
          </Pullquote>

          <ConceptBlock
            title="MIS 3001-3008 + handover pack per technology"
            plainEnglish="MCS Installer Standards (MIS) cover technology-specific installer competency + product approval + customer documentation. Each MIS specifies the structure of the technology-specific handover pack components. The integrated MCS handover pack shares a common structure across all MIS + per-MIS technology-specific detail."
            onSite="The same MCS-certified company may hold multiple MIS certifications (e.g. MIS 3002 PV + MIS 3005 heat pumps + MIS 3004 biomass). The integrated handover pack assembles the relevant MIS components per the install."
          >
            <p>MIS standards + per-technology handover specifics:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">MIS 3001 Solar
                  Thermal</strong> — collectors + DHW integration; sizing methodology +
                commissioning + customer guide. Niche UK 2025-26 (M9 §9.3)
              </li>
              <li>
                <strong className="text-white">MIS 3002 Solar
                  PV</strong> — yield modelling per MCS PV methodology; product approval
                list; commissioning + customer guide; SEG paperwork. Dominant UK 2025-26
                LCT
              </li>
              <li>
                <strong className="text-white">MIS 3003 Small
                  Wind</strong> — wind turbines ≤50 kW; sizing + mast + electrical +
                planning + DNO. Lower-volume UK 2025-26 (M9 §9.2)
              </li>
              <li>
                <strong className="text-white">MIS 3004
                  Biomass</strong> — wood pellet + log biomass boilers; combustion +
                flue + control + customer guide. Wales BUS grant; not BUS England /
                Scotland 2025-26 (M9 §9.4)
              </li>
              <li>
                <strong className="text-white">MIS 3005 Heat
                  Pumps</strong> — ASHP / GSHP / exhaust-air; heat loss survey + sizing
                + commissioning + BUS grant pathway. Dominant UK 2025-26 LCT
                (M8 covered)
              </li>
              <li>
                <strong className="text-white">MIS 3006</strong>
                — older GSHP standard; consolidated into MIS 3005
              </li>
              <li>
                <strong className="text-white">MIS 3007
                  micro-CHP</strong> — ≤50 kW; Stirling engine + fuel cell + IC variants;
                Section 551 + heat-network. Limited UK 2025-26 deployment (M9 §9.5)
              </li>
              <li>
                <strong className="text-white">MIS 3008
                  micro-hydro</strong> — ≤50 kW; turbine + civils + Environment Agency
                + grid connection. Rural niche UK 2025-26 (M9 §9.7)
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="UK 2025-26 grant landscape + handover pack integration"
            plainEnglish="UK 2025-26 LCT grant landscape: Boiler Upgrade Scheme (BUS) covers heat pumps + (Wales) biomass — typical £7,500. Smart Export Guarantee (SEG) for export tariff from PV / BESS / wind / hydro / CHP. Regional schemes (Wales HEEP, Scotland HES). Verify current scheme rates + eligibility at quote stage. MCS handover pack integrates the grant submission paperwork."
            onSite="Grant funding drives much UK 2025-26 LCT install demand — particularly heat pumps under BUS. The MCS handover pack is the grant submission gate; without MCS-certified company + the handover pack the grant cannot be unlocked. Verification of grant eligibility happens at quote stage + the install proceeds on confirmed grant terms."
          >
            <p>UK 2025-26 grant + scheme integration:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Boiler Upgrade
                  Scheme (BUS)</strong> — government grant; ASHP £7,500 typical;
                GSHP £7,500; biomass £5,000 (Wales) / not BUS England + Scotland 2025-26.
                Requires MCS-certified + MCS handover pack + EPC + Ofgem submission
              </li>
              <li>
                <strong className="text-white">Smart Export
                  Guarantee (SEG)</strong> — DNO-licensed suppliers offer export tariff
                for generation up to 5 MW; per-supplier rates ~1-15p/kWh 2025-26;
                requires MCS install + EREC G98 / G99 + appropriate metering
              </li>
              <li>
                <strong className="text-white">Historical
                  schemes</strong> — FIT closed 2019 (20-25 yr existing contracts);
                RHI closed 2022 (7 yr existing contracts)
              </li>
              <li>
                <strong className="text-white">Regional
                  variation</strong> — Wales HEEP (Home Energy Efficiency Programme);
                Scotland HES (Home Energy Scotland) grants + loans; NI separate
                schemes
              </li>
              <li>
                <strong className="text-white">Eligibility +
                  EPC</strong> — most schemes require valid EPC + property eligibility
                + customer consent. Verify at quote stage
              </li>
              <li>
                <strong className="text-white">Submission
                  process</strong> — typically via Ofgem portal (BUS) or DNO + energy
                supplier (SEG); installer submits with MCS handover pack as supporting
                evidence
              </li>
              <li>
                <strong className="text-white">Payment route</strong>
                — BUS typically paid to installer who deducts from customer invoice;
                SEG paid by energy supplier to customer per tariff + export
              </li>
              <li>
                <strong className="text-white">Future
                  evolution</strong> — UK energy policy continuing through 2025-30
                horizon; grant schemes likely to evolve; track current rates +
                eligibility per install
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 551.7.5 — Anti-islanding for generating sets"
            clause="Means shall be provided to prevent the connection of a generating set to the system for distribution of electricity to the public in the event of loss of that supply or deviation of the voltage or frequency at the supply terminals from values required by Regulation 551.7.4. NOTE: For a generating set with an output not exceeding 16 A intended to operate in parallel with a system for distribution of electricity to the public, the requirements of Regulation 551.7 are deemed to be met by compliance with the relevant requirements of EREC G98."
            meaning="Reg 551.7.5 is the categorical anti-islanding requirement — non-negotiable for any generating set in parallel with the public supply. The NOTE confirms that for small (≤16 A per phase) generators, EREC G98 compliance deems Reg 551.7 satisfied — this is the fast-track DNO notification path. For larger generators (most commercial PV + wind + CHP + multi-source domestic) EREC G99 formal application is required + the anti-islanding device is verified per the DNO procedure. Within the MCS handover pack the DNO submission documents include: EREC G98 / G99 reference + inverter manufacturer DoC declaring anti-islanding compliance (RoCoF + voltage / frequency deviation — G99 disallows Vector Shift for type-tested generation, so RoCoF is the required loss-of-mains method on the type-tested inverters used in virtually all LCT installs; Vector Shift is legacy / non-type-tested only) + the anti-islanding test record at commissioning (DNO-witnessed or manufacturer self-test per procedure). Cert evidence bundle keeps the test record + DoC + DNO correspondence. The anti-islanding compliance is one of the most safety-critical documented items in the handover pack — protects DNO engineers + public from generation-back-feed during grid outage."
          />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Cert evidence bundle integration + lifecycle</ContentEyebrow>

          <ConceptBlock
            title="MCS handover pack vs cert evidence bundle"
            plainEnglish="MCS handover pack = customer-facing deliverable at completion (snapshot). Cert evidence bundle = installer\'s comprehensive lifecycle record (ongoing). Overlap at completion; cert evidence bundle grows with periodic + alarm + warranty + service events over the install life."
            onSite="UK 2025-26 cert evidence bundle is increasingly cloud-managed — paper copies for customer + manufacturer + grant body; digital primary for installer audit + future verifiers. The two records work together over the install lifecycle."
          >
            <p>MCS handover pack vs cert evidence bundle:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">MCS handover
                  pack</strong> — customer-facing; snapshot at completion; given to
                customer + grant body + property records
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — installer-side; lifecycle record; opens at install +
                grows over install life
              </li>
              <li>
                <strong className="text-white">Overlap</strong>
                — at completion both contain: sizing + commissioning + EIC + DoCs +
                customer guide + warranty + grant paperwork
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle additions</strong> — periodic EICR-equivalent reports; firmware
                updates; alarm events + responses; manufacturer correspondence; warranty
                claims; customer touchpoints; thermal images over time; modifications
                + additions; end-of-life
              </li>
              <li>
                <strong className="text-white">Customer access
                  to cert evidence bundle</strong> — customer can request relevant items
                at periodic reviews + warranty events; default retention is installer-side
              </li>
              <li>
                <strong className="text-white">Installer
                  obligation</strong> — retain cert evidence bundle for install lifecycle
                + audit period (typically 6-10 yr post-install)
              </li>
              <li>
                <strong className="text-white">Property
                  sale</strong> — customer\'s MCS handover pack travels with property;
                installer\'s cert evidence bundle remains with installer (or transfers
                to new servicing company)
              </li>
              <li>
                <strong className="text-white">Digital +
                  paper</strong> — UK 2025-26 coexistence; cloud-based platforms
                emerging for both customer + installer access
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Multi-source LCT handover pack integration"
            plainEnglish="Multi-source LCT (PV + BESS + heat pump + EV) handover pack integration: integrated single pack (preferred for simultaneous install) or per-source packs (when sources added at different times). UK 2025-26 hybrid approach common — different installers + dates lead to multiple handover packs accumulated at the property over years."
            onSite="The customer\'s record-keeping at the property level integrates the per-source handover packs. Future EICR-equivalent verifier accesses all available records. MCS company coordination across the install lifecycle helps continuity."
          >
            <p>Multi-source handover pack approaches:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Integrated
                  single pack</strong> — preferred for new-build + simultaneous multi-source
                install; single MCS company contracts customer + integrates per-MIS
                contributions; single BS 7671 EIC; single customer touchpoint
              </li>
              <li>
                <strong className="text-white">Per-source
                  packs</strong> — when sources added at different times by different
                installers; each MCS-certified installer provides their MCS handover
                pack for their technology
              </li>
              <li>
                <strong className="text-white">Hybrid
                  approach</strong> — most common UK 2025-26 reality; customer accumulates
                multiple packs over years (initial PV + later BESS + later heat pump +
                later EV)
              </li>
              <li>
                <strong className="text-white">MCS company
                  coordination</strong> — same MCS company across multiple installs
                helps continuity; alternative: customer-side integration at the
                property record level
              </li>
              <li>
                <strong className="text-white">BS 7671 EIC
                  per addition</strong> — each LCT addition gets its own EIC per Reg
                641.5 alteration + Reg 644.5; multi-source schedules can be on
                single EIC or per-addition EICs
              </li>
              <li>
                <strong className="text-white">Property-level
                  cert record</strong> — customer maintains property-level cert record
                integrating all MCS handover packs + EIC + EICR over time
              </li>
              <li>
                <strong className="text-white">Future
                  EICR-equivalent</strong> — verifier accesses all available records;
                where records incomplete (older installs without proper handover),
                the EICR-equivalent reconstructs baseline + records the gap
              </li>
              <li>
                <strong className="text-white">UK 2025-26
                  trend</strong> — increasing integration as multi-source becomes the
                standard new-build + retrofit pattern; MCS framework adapting
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 641.5 — Addition or alteration verification"
            clause="For an addition or alteration to an existing installation, it shall be verified that the addition or alteration complies with BS 7671 and does not impair the safety of the existing installation."
            meaning="Reg 641.5 is the addition / alteration verification gate. For multi-source LCT installs added over time, each addition triggers Reg 641.5: the new circuit complies with current BS 7671 + the existing installation safety is not impaired. The MCS handover pack for each addition reflects Reg 641.5 verification: existing-install assessment recorded + any remediation documented + the new EIC covers the work + the cert evidence bundle integrates with the property\'s existing records. Common UK 2025-26 scenario: customer added PV 5 years ago + now adds BESS. The BESS install triggers Reg 641.5 — does the BESS comply with current BS 7671 (yes, per Chapter 57 + Section 551) + does it impair the existing PV installation safety (assess: protective device coordination, RCD architecture, anti-islanding cross-source per Reg 551.4.2 + Reg 551.7.5). Any existing-install findings (e.g. existing CU lacks Type B for the new BESS) are addressed at the BESS install + documented in the new MCS handover pack. Cert evidence bundle reflects the addition lifecycle."
          />

          <InlineCheck {...inlineChecks[3]} />

          <McsHandoverPack
            caption="MCS handover pack + cert evidence bundle integration diagram. Top: MCS handover pack structure — sizing + product DoCs + commissioning record + BS 7671 EIC + Schedule of Inspections + Schedule of Test Results + DNO submission + grant paperwork + warranty + customer guide. Middle: MIS standards mapping — MIS 3001 thermal / 3002 PV / 3003 wind / 3004 biomass / 3005 heat pumps / 3007 CHP / 3008 hydro — each contributes technology-specific detail to common pack structure. Lower middle: UK 2025-26 grant landscape — BUS (heat pumps + Wales biomass), SEG (export tariff), regional schemes; integration via MCS handover pack. Bottom: cert evidence bundle as installer\'s lifecycle record — MCS handover pack as foundation + ongoing additions over install life (periodic EICR + alarms + warranty + firmware + customer touchpoints + thermal images + modifications). Customer-facing handover vs installer-side lifecycle record."
          />

          <SectionRule />

          <Scenario
            title="6 kWp PV + 10 kWh BESS new-build install — integrated MCS handover"
            situation="Mr + Mrs Walker, new-build 4-bed detached. House completed + handed over by housebuilder; included in the new-build spec: 6 kWp PV (south-facing roof) + 10 kWh BESS (garage). MCS company subcontracted by housebuilder + integrated into new-build handover. Single integrated MCS handover pack for the LCT."
            whatToDo="(1) MCS company role — primary contractor for the LCT install; MCS 3002 PV certified; subcontracts BS 7671 electrician for install + IV; manufacturer commissioning engineer for inverter + BMS. (2) Integrated handover pack contents: (a) MCS sizing report — PV yield ~5500 kWh/yr; BESS sizing 10 kWh matches household consumption + PV pairing; payback estimate per SEG tariff. (b) Product details + DoCs — PV modules (BS EN 61215 compliance + 25 yr warranty); inverter (BS EN 62109 + 10 yr warranty + Reg 712.421.101 IMD integrated); BESS battery (BS EN 62619 + 10 yr SoH warranty); BMS (BS EN 62619 + manufacturer commissioning). (c) Commissioning record — inverter manufacturer commissioning (firmware version + commissioning checklist + Reg 551.7.5 anti-islanding test + grid synchronisation); BMS commissioning (cell balance, comms, fault tolerance, SoH baseline 100%). (d) BS 7671 EIC — single integrated EIC covering PV + BESS + the new-build CU; signed by skilled person per Reg 644.5; Schedule of Inspections per Reg 642.3; Schedule of Test Results per Reg 643 + Section 712 extensions + Chapter 57 + Section 551 cross-references. (e) DNO submission — EREC G98 fast-track for the 6 kWp PV (single-phase ≤ 16 A); inverter manufacturer DoC declaring anti-islanding compliance; SLD; DNO reference returned. (f) SEG paperwork — eligibility confirmed; customer to register with energy supplier post-handover. (g) Customer operating guide — system overview, portal access (manufacturer app demo at handover), fault response, contacts, expected lifecycle. (h) Warranty registrations — completed in customer\'s name + property address. (3) Handover meeting: 60-90 min with customer; walkthrough of system + portal + key controls + emergency stop + contacts. (4) Cert evidence bundle: installer\'s lifecycle record opens with the handover pack as foundation; will grow with periodic + alarm + warranty + firmware events over the next 25 yr typical PV lifecycle. (5) Documentation flow: customer keeps paper + digital MCS handover pack; installer keeps cert evidence bundle; housebuilder retains warranty copy; DNO + Ofgem (where SEG submitted) + energy supplier each get relevant submission components."
            whyItMatters="Integrated single MCS handover pack at new-build is the ideal scenario — all sources installed simultaneously by coordinated MCS company; single touchpoint for customer at handover; single record for warranty + insurance + future EICR-equivalent. UK 2025-26 increasingly the new-build standard pattern. Cert evidence bundle as the installer-side lifecycle record supports the customer + warranty + audit + future service. The BS 7671 electrician\'s contribution (EIC + Schedules + LCT extensions) is the foundational compliance anchor of the entire pack."
          />

          <Scenario
            title="Heat pump retrofit + BUS grant — handover pack + grant submission"
            situation="Mr + Mrs Davies, semi-detached 1970s build, existing gas boiler. Apply for BUS grant + appoint MCS-certified installer for ASHP retrofit. EPC band C (acceptable for BUS); heat loss survey completed."
            whatToDo="(1) Quote stage — MCS-certified company (MIS 3005 heat pumps) conducts heat loss survey per MCS methodology; sizes ASHP (12 kW at -2°C design temp); proposes radiator upgrades + cylinder replacement; customer + installer agree quote inc BUS grant deduction. (2) BUS submission — installer submits via Ofgem portal: property details + EPC band + heat loss survey + heat pump specification + MCS certification + customer consent. BUS grant approved + £7,500 reserved against the install. (3) Install — over 5-7 days: outdoor unit + radiator upgrades + cylinder + control wiring + commissioning. BS 7671 electrician handles supply circuit + protective architecture (Type A + RDC-DD or Type B per manufacturer DoC); F-gas-qualified specialist handles refrigerant. Manufacturer commissioning engineer completes BMS + control + functional verification. (4) Handover pack contents: (a) MCS sizing report — heat loss survey + ASHP capacity + flow temp + emitter strategy; (b) Product details + DoCs — ASHP outdoor unit + indoor controller + cylinder (manufacturer DoC + warranty); (c) Commissioning record — manufacturer engineer commissioning + functional verification; (d) BS 7671 EIC — Reg 644.5 + Schedule of Inspections + Schedule of Test Results on the dedicated ASHP supply circuit + outdoor unit + earthing arrangement; (e) BUS grant paperwork — Ofgem submission record + customer consent + grant payment confirmation; (f) Warranty registrations — manufacturer warranty 7-10 yr typical; installer workmanship guarantee 6-12 yr; (g) Customer operating guide — heat pump operation, flow temp setting, holiday mode, fault response, contacts. (5) Customer handover meeting: walkthrough of system + controls + monitoring + maintenance schedule + emergency response + contacts. (6) Cert evidence bundle: installer\'s lifecycle record opens with handover pack as foundation; will integrate annual service records + EICR-equivalent + manufacturer correspondence over the heat pump lifetime. (7) Grant payment flow: Ofgem pays installer £7,500; installer deducts from customer invoice (customer pays net); cert evidence bundle records the grant payment trail."
            whyItMatters="BUS grant heat pump install is the dominant UK 2025-26 LCT install pattern. MCS handover pack as the grant submission gate + customer-facing deliverable + warranty + insurance support. BS 7671 electrician\'s EIC as the foundational compliance anchor. Cert evidence bundle integrates the grant payment + warranty + future service over the heat pump lifetime (typically 15-20 yr). The customer experience + the compliance + the grant funding all rest on the MCS handover pack quality."
          />

          <CommonMistake
            title="MCS handover pack with incomplete BS 7671 EIC"
            whatHappens="Installer provides MCS handover pack with EIC that lacks: Schedule of Inspections details; LCT-specific test results (DC IR not recorded; IMD test result missing); skilled person\'s competency signature illegible; protective architecture details vague. Customer receives the pack; warranty + insurance + future EICR-equivalent verifier rely on the EIC — finds gaps. Customer disputes; warranty claim weakened; future verifier has incomplete baseline."
            doInstead="EIC is the BS 7671 anchor of the MCS handover pack — invest time + discipline in compiling it properly. Reg 644.5: skilled person competent to verify BS 7671 has been met. Schedule of Inspections per Reg 642.3 (a)-(r) items + observations. Schedule of Test Results per Reg 643 + LCT extensions per Section 712 / Chapter 57 / Section 722 / Section 551. Photographic + thermographic evidence per Reg 653.2 NOTE supports findings. Cert evidence bundle keeps the electrician\'s copy as audit anchor + the MCS handover pack version is the customer-facing version. Comprehensive + clear + signed = supports the install\'s lifecycle + the customer\'s investment."
          />

          <CommonMistake
            title="Assuming the MCS handover pack and the cert evidence bundle are the same thing"
            whatHappens="Installer treats the MCS handover pack as the only record needed — gives a copy to the customer + closes the file. Doesn\'t open + maintain a cert evidence bundle. Years later, customer reports a fault or files a warranty claim; installer has no ongoing records, no firmware update history, no thermal images, no alarm response trail. Warranty position weakened; potential dispute; insurance position uncertain."
            doInstead="MCS handover pack = customer-facing snapshot at completion. Cert evidence bundle = installer\'s ongoing lifecycle record. Open the cert evidence bundle at install with the MCS handover pack as the foundation; grow it with periodic + alarm + warranty + firmware + service events. UK 2025-26 cloud-based cert management platforms make this efficient. Installer retention typically 6-10 yr post-install; the cert evidence bundle supports audit + warranty + insurance + future service + business reputation. Two records, two purposes — both essential."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'MCS handover pack = integrated customer-facing deliverable at install completion; supports warranty + insurance + grant + future EICR.',
              'Shared structure across MIS 3001-3008: sizing + product DoCs + commissioning + BS 7671 EIC + DNO + grant + warranty + customer guide.',
              'BS 7671 electrician contribution: EIC per Reg 644.5 + Schedule of Inspections + Schedule of Test Results + LCT extensions + Section / Chapter cross-references.',
              'MIS standards: 3001 thermal; 3002 PV; 3003 wind; 3004 biomass; 3005 heat pumps (3006 consolidated); 3007 CHP; 3008 hydro.',
              'UK 2025-26 grants: BUS (heat pumps + Wales biomass £7,500); SEG (export tariff); regional (Wales HEEP, Scotland HES, NI separate).',
              'DNO submission within MCS pack: EREC G98 / G99 + SLD + inverter DoC + anti-islanding test per Reg 551.7.5 + DNO reference.',
              'Cert evidence bundle = installer\'s lifecycle record (ongoing); grows from MCS handover pack foundation; supports audit + warranty + service.',
              'Multi-source LCT: integrated single pack (preferred new-build) or per-source packs (additions over time); UK 2025-26 hybrid common.',
              'Reg 641.5 addition / alteration: each LCT addition triggers existing-install assessment + new EIC + cert evidence bundle update.',
              'MCS handover pack travels with property at sale; cert evidence bundle remains with installer (or transfers with servicing).',
              'Digital + paper coexistence UK 2025-26; cloud-based cert platforms emerging for installer + customer access.',
              'The BS 7671 EIC quality drives the MCS handover pack quality — invest in discipline; protects the install lifecycle + the customer.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 6 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-12-section-5')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                12.5 EICR cycle + per-tech
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-12-section-7')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                12.7 Customer education + handover
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
