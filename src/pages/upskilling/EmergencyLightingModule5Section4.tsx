import { ArrowLeft, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'elm5-s4-luminairelabel',
    question: 'What is the minimum information that should appear on a luminaire label / asset record?',
    options: [
      'A sequential number only, allocated when the luminaire is fitted on site.',
      'Reference, make, model, lamp, battery install date and chemistry, circuit and location.',
      'The housing colour and finish, recorded so future replacements visually match.',
      'The mounting position and orientation only, taken from the as-built drawing.',
    ],
    correctIndex: 1,
    explanation:
      'The label turns the physical luminaire into an identifiable asset with a documentation trail: a unique reference (matched to the as-built drawing), manufacturer, model, lamp type and wattage, battery installation date (the start of the battery life clock), battery chemistry, the final-circuit reference, and the area/location. Without it future maintenance cannot identify the right spare, tell battery age, or trace the circuit. Each field has an operational purpose; missing fields cost time and money at every future visit. The 2025 standard reinforces the asset-register approach.',
  },
  {
    id: 'elm5-s4-battery-date',
    question: 'Why is the battery installation date a critical label field?',
    options: [
      'It is not a critical field; battery condition is only ever judged by the duration test.',
      'Battery life is finite, so the install date lets replacement be planned, not reactive.',
      'It lets the replacement battery housing be colour-matched to the original luminaire.',
      'It is needed to calculate the luminaire weight for the mounting-fixing assessment.',
    ],
    correctIndex: 1,
    explanation:
      'Battery life is finite (typically 3-5 years for NiCd, 4-7 years for LiFePO4) and tracking installation dates is the only reliable way to plan replacement. Without the date, end-of-life is detected reactively — a failed duration test or a real emergency. With it, replacement is planned in advance, batteries ordered, the schedule kept. Battery age is the single most predictive failure parameter; the labels are the data and the planning is the use of that data. The 2025 standard expects this asset-register discipline.',
  },
  {
    id: 'elm5-s4-logbook-content',
    question: 'What does the BS 5266-1:2025 logbook contain?',
    options: [
      'The date of each test only, sufficient to show the cadence was maintained.',
      'Date, type, scope, method, results, faults, corrective action, recovery and signature.',
      'The tester signatures only, as evidence that a competent person attended each visit.',
      'A photograph of each illuminated luminaire taken during the test, with nothing else.',
    ],
    correctIndex: 1,
    explanation:
      'A logbook entry is a structured record sufficient to reconstruct what was done years later. Per entry: date and time; type (functional / duration / visual / photometric / fault investigation / repair); scope (whole installation, zone, or individual luminaire); method; observations and per-luminaire results (or summary tables for large installations); faults identified; corrective actions; verification re-tests; recovery confirmation for duration tests; and the tester/inspector name, qualification and signature. It is the contemporaneous record relied on by insurers, fire authorities and tribunals. The 2025 standard expects this depth; thin entries are inadequate.',
  },
  {
    id: 'elm5-s4-retention',
    question: 'How long should BS 5266-1 logbook records be retained?',
    options: [
      'For 6 months, after which the previous period\'s records can be discarded.',
      'For the operational life of the installation, with an insurer-aware extension.',
      'For 1 day only, since the next daily and monthly checks supersede the record.',
      'Indefinitely from day one, with every record archived permanently off site.',
    ],
    correctIndex: 1,
    explanation:
      'BS 5266-1:2025 expects logbook records retained for the operational life of the installation. The RRO 2005 expects records available for any future incident investigation (typically several years); insurer-aware practice retains the full installation life plus a defined post-decommissioning period (often 6 years). Self-test electronic logs are typically held indefinitely on the controller; paper logbooks are kept and archived. The retention policy itself should be documented in the building management procedures and followed.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the purpose of the luminaire label / asset record?',
    options: [
      'To uniquely identify each luminaire and link it to the documentation pack — as-built drawing, battery age, circuit and area — so maintenance is planned rather than reactive.',
      'To provide a decorative finish that matches the luminaire to the building interior scheme.',
      'To colour-code luminaires by escape route so occupants can follow them in a fire.',
      'To record the purchase cost of each luminaire for the building asset depreciation account.',
    ],
    correctAnswer: 0,
    explanation:
      'The label is the physical-to-documentation link. Every periodic test, every fault investigation, every replacement references the luminaire by its label. Without it, the documentation pack cannot connect to the physical asset and the periodic regime cannot deliver evidence by luminaire.',
  },
  {
    id: 2,
    question: 'Which of the following is NOT typically required on the central battery enclosure?',
    options: [
      'A warning notice at the lockable supply isolator.',
      'A do-not-switch-off label on the supply isolator handle.',
      'Identification of the system as an emergency lighting central battery.',
      'A decorative livery panel matching the building interior scheme.',
    ],
    correctAnswer: 3,
    explanation:
      'Warning notices, do-not-switch-off labels, and system identification are all BS 5266-1 / BS EN 50171 requirements. Marketing colour scheme is irrelevant. The labels exist for safety and operational purposes — to prevent inadvertent isolation that would defeat the system.',
  },
  {
    id: 3,
    question: 'A 2025-NEW addition to the BS 5266-1 logbook structure is which column?',
    options: [
      'A column recording the lamp colour temperature of each luminaire.',
      'A column recording the per-luminaire replacement cost for budgeting.',
      'A column recording the date of the last five-year photometric verification and the next due date.',
      'A column recording the manufacturer technical support phone number.',
    ],
    correctAnswer: 2,
    explanation:
      'The five-year photometric column is one of the practical 2025 logbook updates. It surfaces the photometric cycle in the everyday logbook so that the cadence is tracked alongside the monthly / annual cadences, not separately filed and forgotten.',
  },
  {
    id: 4,
    question: 'How long should daily check book entries be retained?',
    options: [
      'Until the end of the working day on which they were made.',
      'For a single calendar month, then discarded as routine.',
      'They may be discarded as soon as the next monthly functional test is signed off.',
      'Per the documented retention policy — typically aligned with the logbook (operational life, with insurer-aware practice often setting six years).',
    ],
    correctAnswer: 3,
    explanation:
      'Daily checks are short entries but valuable as cumulative evidence of oversight. Retain on the same policy as the logbook — operational life with insurer-aware extension. The volume is low (a small notebook or electronic log).',
  },
  {
    id: 5,
    question: 'Why is "do-not-switch-off" labelling on the central battery supply isolator important?',
    options: [
      'Because the central battery needs continuous mains to stay charged — inadvertent isolation discharges it and loses the emergency capability, so the label warns against operating the isolator.',
      'Because it gives the panel room a tidier, more professional appearance on inspection.',
      'Because it allows the isolator to be colour-matched to the surrounding switchgear.',
      'Because building insurers require all isolators to carry an identifying label of some kind.',
    ],
    correctAnswer: 0,
    explanation:
      'The label prevents inadvertent isolation. The central battery is a safety system; operating its supply isolator is a safety event. The label communicates this to anyone with access to the isolator. BS EN 50171 mandates the warning notice.',
  },
  {
    id: 6,
    question: 'Self-test electronic logs are stored on the central addressable controller. How are they integrated with the BS 5266-1 logbook?',
    options: [
      'They fully replace the BS 5266-1 logbook, removing the need for any human-led records.',
      'They are integrated as a component of the logbook — reviewed and signed by the competent person, with visual, photometric and BS 7671 records joining them to form the complete logbook.',
      'They are printed to paper monthly and the electronic copy is then deleted.',
      'They are kept solely for warranty purposes and play no part in the logbook.',
    ],
    correctAnswer: 1,
    explanation:
      'Electronic logs are valid as a logbook component; they do not replace the human-led elements. The competent person ratifies; the visual / photometric / BS 7671 elements add to the logbook. The combined record is the BS 5266-1 logbook for self-test installations.',
  },
  {
    id: 7,
    question: 'What is the asset register for an emergency lighting installation?',
    options: [
      'A roster of the staff trained to carry out the monthly functional checks.',
      'A file of purchase receipts and invoices for the installed luminaires.',
      'A structured database of every luminaire and component — reference, location, make, lamp/battery details, install date, circuit, photometric assumption, service history and status.',
      'A photographic album of the building recorded at handover for marketing use.',
    ],
    correctAnswer: 2,
    explanation:
      'The asset register is the operational data layer. Every luminaire, every detail, current status. Maintainable via spreadsheet, dedicated facilities management software, or a central addressable controller with asset register features. Without it, every visit reinvents itself.',
  },
  {
    id: 8,
    question: 'A photographic record of every luminaire is increasingly common at handover. What does it support?',
    options: [
      'Brochure and marketing imagery for the installing contractor to reuse.',
      'A general visual impression of the building for the facilities team to browse.',
      'Asset identification, maintenance dispatch, insurer evidence and dispute resolution — each photo cross-referenced to the as-built drawing.',
      'Confirmation of the decorative scheme so future refurbishments can match it.',
    ],
    correctAnswer: 2,
    explanation:
      'Photographic asset records are operationally and evidentially valuable. They cost little to produce at commissioning and pay back over the contract life. The 2025 update implicitly supports this practice through the emphasis on documentation pack completeness.',
  },
  {
    id: 9,
    question: 'What information is shown on a typical emergency luminaire label fixed at the luminaire itself?',
    options: [
      'Just the manufacturer logo, for brand identification.',
      'Just the purchase cost, for asset accounting.',
      'Only the escape-route direction the luminaire serves.',
      'Two labels: a manufacturer label (make, model, lamp, serial, standards) and an installation label (unique reference, area, circuit, battery install date).',
    ],
    correctAnswer: 3,
    explanation:
      'Manufacturer label + installation label = full identification. Manufacturer side gives type and standards; installation side gives reference, location, and operational data (battery date). At the luminaire, both are visible to a maintainer.',
  },
  {
    id: 10,
    question: 'Why does BS 5266-1:2025 strengthen the documentation expectations relative to previous editions?',
    options: [
      'To increase the sales of dedicated emergency lighting management software.',
      'Because earlier installations were often maintained on assumed knowledge that was lost when staff, contractors or owners changed — the 2025 update makes documentation the load-bearing operational memory.',
      'Because the photometric design method changed and needs more paperwork to record.',
      'Because the standard now requires luminaires to be replaced more frequently.',
    ],
    correctAnswer: 1,
    explanation:
      'Documentation is the operational memory of the installation. The 2025 standard recognises that without it, future maintenance, future verification, and future investigation all fail. The strengthening is in step with insurer and authority expectations.',
  },
];

const EmergencyLightingModule5Section4 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'System labelling and maintenance records | Emergency Lighting Module 5.4 | Elec-Mate',
    description:
      'BS 5266-1:2025 system labelling, asset register, photographic record, and BS 5266-1 logbook structure including the new five-year photometric column.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 4"
            title="System labelling and maintenance records"
            description="The documentation backbone of an emergency lighting installation: luminaire labels and asset register, central battery warning notices, photographic record, and the BS 5266-1:2025 logbook structure (with the new five-year photometric column). The records are not bureaucracy — they are the operational memory that makes the periodic regime work and the compliance evidence that insurers and fire authorities expect."
            tone="yellow"
          />

          <TLDR
            points={[
              'Luminaire label: unique reference, manufacturer, model, lamp, battery installation date, battery chemistry, circuit, area. The label connects the physical luminaire to the documentation pack.',
              'Asset register: structured database of every luminaire and component, with all the above plus photometric design assumption, service history, current status. The operational backbone.',
              'Central battery warning notices: lockable supply isolator, do-not-switch-off label, system identification, fire-rated enclosure marking. Required by BS 5266-1 / BS EN 50171.',
              'BS 5266-1 logbook: contemporaneous record of every test, inspection, fault, repair. Date / type / scope / method / observations / faults / corrective action / recovery / signature.',
              '2025 NEW column: date of last five-year photometric verification — surfaces the photometric cadence in the logbook so it cannot be silently skipped.',
              'Retention: per BS 5266-1:2025, operational life of installation. Insurer-aware practice extends 6 years post-decommissioning. Self-test electronic logs typically indefinite on controller.',
              'Photographic record at commissioning: every luminaire photographed with location and reference. Operational and evidential value across contract life.',
              'Self-test electronic logs are valid logbook components when supported by visual / photometric / BS 7671 records and ratified by competent person signature.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Specify the contents of a luminaire label and an installation label per BS 5266-1:2025',
              'Build and maintain an asset register linking the physical installation to the documentation pack',
              'Apply the central battery warning notice requirements per BS EN 50171:2021 and BS 5266-1',
              'Compile a BS 5266-1:2025 logbook entry with the structure expected by the standard',
              'Identify the new 2025 logbook columns including the date of last five-year photometric verification',
              'Set retention policies for paper and electronic records aligned with BS 5266-1:2025 and insurer expectations',
              'Capture a photographic asset record at commissioning and use it across the contract life',
              'Integrate self-test electronic logs with the human-led elements to form the complete BS 5266-1 logbook',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Luminaire labels and the asset register</ContentEyebrow>

          <ConceptBlock
            title="Two label types per luminaire"
            plainEnglish="Every emergency luminaire carries two labels. The MANUFACTURER label is factory-fitted and shows what the luminaire is — manufacturer, model, lamp type and wattage, batch / serial number, standards compliance markings (CE / UKCA, BS EN 60598). The INSTALLATION label is added during commissioning and shows where it sits in the design — unique luminaire reference matching the as-built drawing, area, circuit reference, and battery installation date. Together they turn an anonymous luminaire on a ceiling into an identifiable asset with a documentation trail."
            onSite="Without installation labels, future maintenance starts every visit by re-identifying which luminaire is which on the drawing. Cost: time, errors, frustration. With installation labels, every visit can move directly to action — the luminaire's identity, circuit, and battery age are visible at a glance."
          >
            <p>The label fields and their operational purpose:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Unique luminaire reference.</strong> Matches the as-built drawing. Format is design-team choice — typical patterns: EL-001, EL-002... or area-based EL-G-01, EL-G-02 (where G = Ground floor).
              </li>
              <li>
                <strong>Manufacturer.</strong> The maker. Identifies the spare parts catalogue, the technical manual, and the warranty contact.
              </li>
              <li>
                <strong>Model.</strong> The specific product type. Determines spare lamp / battery part number.
              </li>
              <li>
                <strong>Lamp type and wattage.</strong> Identifies the replacement lamp. For LED luminaires (most modern installations), the lamp is integrated with the luminaire; the model number is sufficient.
              </li>
              <li>
                <strong>Battery chemistry.</strong> NiCd / NiMH / LiFePO4 / SLA. Determines replacement battery part. Different chemistries are not interchangeable — substituting wrong chemistry damages charging electronics.
              </li>
              <li>
                <strong>Battery installation date.</strong> The start of the battery life clock. Critical for planned replacement — typical lives are 3-5 years for NiCd, 4-7 years for LiFePO4. The date on the label tells the maintainer at a glance whether the battery is mid-life, late-life, or end-of-life.
              </li>
              <li>
                <strong>Circuit reference.</strong> The final circuit feeding the luminaire (e.g. DB-G/4 = Distribution board G, way 4). Lets a fault investigation start at the right circuit.
              </li>
              <li>
                <strong>Area / location reference.</strong> Where the luminaire is in the building — corridor, room, level. Cross-references to the design lux calculation grid.
              </li>
            </ul>
            <p>
              The two labels are typically applied: manufacturer label on the luminaire body (factory) and installation label on a fixed surface inside or beside the luminaire enclosure (added at commissioning). Both must be readable during routine maintenance access.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · Clause 7.4 (Identification and labelling)"
            clause={
              <>
                Each emergency luminaire shall be uniquely identified and labelled with reference to the as-built drawings and the maintenance records. The label shall include sufficient information to enable maintenance personnel to identify the luminaire, its specifications, and its supply circuit without recourse to off-site documentation. Battery installation date shall be recorded on the luminaire or in an associated record clearly linked to the luminaire by reference.
              </>
            }
            meaning="The clause is firm on identification and on the battery installation date. The label is on the luminaire OR clearly linked by reference (i.e. via an asset register). Either physical labels OR an electronic asset register is acceptable, but the link from physical luminaire to operational data must exist."
          />

          <ConceptBlock
            title="The asset register"
            plainEnglish="The asset register is the structured database that the labels reference. It contains every detail about every luminaire — far more than fits on a label — and is the working tool of the maintenance contractor. A typical asset register is a spreadsheet (small installations), a facilities management software record (medium installations), or a database integrated with a central addressable controller (large self-test installations). The register is updated at every periodic maintenance visit — battery replacement entered, faults logged, status updated."
          >
            <p>Asset register fields per luminaire:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>Unique reference (matched to label and drawing).</li>
              <li>Manufacturer, model, manufacturing date, batch / serial.</li>
              <li>Lamp type and wattage; LED L70 rating where applicable.</li>
              <li>Battery: chemistry, capacity (Ah or Wh), installation date, expected end-of-life.</li>
              <li>Circuit reference, distribution board reference, protective device.</li>
              <li>Location: building, floor, area / room, mounting position (height, orientation).</li>
              <li>Photometric design assumption: design lux contribution at design grid points.</li>
              <li>Class (maintained / non-maintained / sustained), response class (0.5 s / 5 s / 15 s), rated duration.</li>
              <li>Self-test capability and address (where applicable).</li>
              <li>Service history: faults, corrective actions, replacements, dates.</li>
              <li>Current status: in service / fault / pending replacement / decommissioned.</li>
              <li>Photograph reference (link to photographic record).</li>
              <li>Most recent functional / duration / photometric test results (or links).</li>
            </ul>
            <p>
              The register is comprehensive but maintainable — most fields are static (manufacturer, model, location) and rarely change; dynamic fields (battery date, status, service history) are updated at maintenance visits. Modern facilities management software can present the register as a queryable database; legacy spreadsheets work for smaller installations.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          {/* Luminaire label + logbook diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Luminaire label anatomy and BS 5266-1:2025 logbook structure
            </h4>
            <svg
              viewBox="0 0 820 600"
              className="w-full h-auto"
              role="img"
              aria-label="Two-part diagram. Left: anatomy of the manufacturer label and installation label on an emergency luminaire. Right: BS 5266-1:2025 logbook structure showing the columns including the new five-year photometric column."
            >
              {/* Left half — labels */}
              <text x="40" y="36" fill="#FBBF24" fontSize="13" fontWeight="bold">Luminaire labels</text>

              {/* Manufacturer label */}
              <rect x="40" y="56" width="320" height="160" rx="8" fill="rgba(34,211,238,0.06)" stroke="#22D3EE" strokeWidth="1.4" />
              <text x="58" y="78" fill="#22D3EE" fontSize="11" fontWeight="bold">Manufacturer label (factory)</text>
              <text x="58" y="100" fill="rgba(255,255,255,0.85)" fontSize="10">EL-PRO 8000-LED</text>
              <text x="58" y="116" fill="rgba(255,255,255,0.7)" fontSize="9.5">Acme Lighting Ltd</text>
              <text x="58" y="132" fill="rgba(255,255,255,0.7)" fontSize="9.5">LED 6 W · 320 lm · 4000 K</text>
              <text x="58" y="148" fill="rgba(255,255,255,0.7)" fontSize="9.5">BS EN 60598 · CE · UKCA</text>
              <text x="58" y="164" fill="rgba(255,255,255,0.7)" fontSize="9.5">Battery: NiCd 4.8 V 800 mAh</text>
              <text x="58" y="180" fill="rgba(255,255,255,0.55)" fontSize="9">Serial: 230412-A4823</text>
              <text x="58" y="196" fill="rgba(255,255,255,0.55)" fontSize="9">Manuf. 2026-01</text>

              {/* Installation label */}
              <rect x="40" y="226" width="320" height="200" rx="8" fill="rgba(251,191,36,0.06)" stroke="#FBBF24" strokeWidth="1.4" />
              <text x="58" y="248" fill="#FBBF24" fontSize="11" fontWeight="bold">Installation label (commissioning)</text>
              <text x="58" y="270" fill="rgba(255,255,255,0.85)" fontSize="11" fontWeight="bold">EL-G-014</text>
              <text x="58" y="286" fill="rgba(255,255,255,0.7)" fontSize="9.5">Ground · Reception corridor</text>
              <text x="58" y="302" fill="rgba(255,255,255,0.7)" fontSize="9.5">Circuit: DB-G/4</text>
              <text x="58" y="318" fill="rgba(255,255,255,0.7)" fontSize="9.5">Class: maintained · 5 s · 3 h</text>
              <text x="58" y="338" fill="#FBBF24" fontSize="10" fontWeight="bold">Battery installed: 2026-04-15</text>
              <text x="58" y="354" fill="rgba(251,191,36,0.7)" fontSize="9">expected end-of-life 2030</text>
              <text x="58" y="378" fill="rgba(255,255,255,0.55)" fontSize="9">As-built drawing ref: EL-AB-12</text>
              <text x="58" y="394" fill="rgba(255,255,255,0.55)" fontSize="9">Asset reg: AR-EL-014</text>
              <text x="58" y="410" fill="rgba(255,255,255,0.55)" fontSize="9">Photo: P-EL-014.jpg</text>

              {/* Connection arrow */}
              <line x1="200" y1="450" x2="200" y2="490" stroke="rgba(251,191,36,0.6)" strokeWidth="1.4" strokeDasharray="4,3" />
              <polygon points="200,490 196,484 204,484" fill="rgba(251,191,36,0.6)" />
              <text x="200" y="510" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9.5">references → asset register</text>
              <text x="200" y="524" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">→ as-built drawing</text>
              <text x="200" y="538" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">→ design lux calculation</text>
              <text x="200" y="552" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">→ logbook entries</text>

              {/* Right half — logbook */}
              <text x="430" y="36" fill="#FBBF24" fontSize="13" fontWeight="bold">BS 5266-1:2025 logbook columns</text>

              {/* Logbook header row */}
              <rect x="430" y="56" width="370" height="32" rx="4" fill="rgba(251,191,36,0.12)" stroke="#FBBF24" strokeWidth="1.4" />
              <text x="450" y="76" fill="#FBBF24" fontSize="9.5" fontWeight="bold">Date  Type  Scope  Method  Result  Faults  Corr. action  5-yr photo  Sig.</text>

              {/* Logbook example rows */}
              <rect x="430" y="98" width="370" height="44" rx="4" fill="rgba(34,211,238,0.06)" stroke="rgba(34,211,238,0.3)" strokeWidth="1" />
              <text x="450" y="118" fill="rgba(255,255,255,0.85)" fontSize="9.5" fontWeight="bold">2026-04-04 · Functional · whole · 10-min sim · all pass</text>
              <text x="450" y="132" fill="rgba(255,255,255,0.65)" fontSize="9">no faults · n/a · 2026-04 due 2031-04 · J. Smith</text>

              <rect x="430" y="150" width="370" height="44" rx="4" fill="rgba(168,85,247,0.06)" stroke="rgba(168,85,247,0.3)" strokeWidth="1" />
              <text x="450" y="170" fill="rgba(255,255,255,0.85)" fontSize="9.5" fontWeight="bold">2026-10-25 · Duration · whole · 3-h discharge · all pass</text>
              <text x="450" y="184" fill="rgba(255,255,255,0.65)" fontSize="9">recovery 19 h to 80% · n/a · J. Smith</text>

              <rect x="430" y="202" width="370" height="44" rx="4" fill="rgba(34,197,94,0.06)" stroke="rgba(34,197,94,0.3)" strokeWidth="1" />
              <text x="450" y="222" fill="rgba(255,255,255,0.85)" fontSize="9.5" fontWeight="bold">2026-10-25 · Photometric · escape route · lux survey</text>
              <text x="450" y="236" fill="rgba(255,255,255,0.65)" fontSize="9">all ≥ design · 2026-10 next 2031-10 · J. Smith</text>

              <rect x="430" y="254" width="370" height="44" rx="4" fill="rgba(239,68,68,0.06)" stroke="rgba(239,68,68,0.3)" strokeWidth="1" />
              <text x="450" y="274" fill="rgba(255,255,255,0.85)" fontSize="9.5" fontWeight="bold">2026-11-12 · Reactive · EL-G-014 · battery fail</text>
              <text x="450" y="288" fill="rgba(255,255,255,0.65)" fontSize="9">batt replaced 2026-11-12 · n/a · J. Smith</text>

              {/* NEW 2025 column callout */}
              <rect x="430" y="316" width="370" height="60" rx="6" fill="rgba(251,191,36,0.08)" stroke="#FBBF24" strokeWidth="1.4" strokeDasharray="4,3" />
              <text x="615" y="338" textAnchor="middle" fill="#FBBF24" fontSize="11" fontWeight="bold">⚠ NEW 2025: 5-year photometric column</text>
              <text x="615" y="354" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">Surfaces the photometric cadence in the everyday logbook</text>
              <text x="615" y="368" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">Date of last + next due — cannot be silently skipped</text>

              {/* Retention */}
              <rect x="430" y="392" width="370" height="60" rx="6" fill="rgba(34,211,238,0.06)" stroke="rgba(34,211,238,0.4)" strokeWidth="1" />
              <text x="450" y="414" fill="#22D3EE" fontSize="10" fontWeight="bold">Retention</text>
              <text x="450" y="430" fill="rgba(255,255,255,0.7)" fontSize="9">BS 5266-1:2025 · operational life of installation</text>
              <text x="450" y="444" fill="rgba(255,255,255,0.7)" fontSize="9">Insurer-aware practice: 6 yr post-decommissioning</text>

              {/* Footer */}
              <text x="410" y="490" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                The label points the maintainer to the asset register · the asset register is the index into the logbook
              </text>
              <text x="410" y="506" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                Together they form the operational memory of the installation across its life
              </text>
              <text x="410" y="540" textAnchor="middle" fill="rgba(251,191,36,0.65)" fontSize="9.5" fontWeight="bold">
                Without the records, the periodic regime cannot deliver compliance evidence
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>Central battery warning notices</ContentEyebrow>

          <ConceptBlock
            title="The labels that protect the central battery"
            plainEnglish="A central battery installation has a small number of safety-critical components: the battery enclosure, the supply isolator, the output sub-circuits. Each carries warning notices that prevent inadvertent action that would compromise the safety system. BS EN 50171:2021 and BS 5266-1 specify the minimum labelling; insurers and fire authorities expect to see it on inspection."
          >
            <p>The required notices and their purpose:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Lockable supply isolator.</strong> The isolator that feeds the central battery from the building supply must be lockable in the ON position. The lock prevents unauthorised isolation. The label adjacent reads "EMERGENCY LIGHTING SUPPLY — DO NOT SWITCH OFF" or equivalent. The lock has documented key control.
              </li>
              <li>
                <strong>Do-not-switch-off label on the isolator handle.</strong> Even with the lock, an additional warning label on the isolator handle reinforces the message.
              </li>
              <li>
                <strong>System identification on the central battery enclosure.</strong> The enclosure carries a label identifying the system as emergency lighting central battery, with reference to the design and to the responsible person's contact. Anyone encountering the enclosure understands what it is and who is responsible.
              </li>
              <li>
                <strong>Fire-rated enclosure marking.</strong> Where the central battery is housed in a fire-rated enclosure (typically a separate fire-rated room), the door carries the fire rating (e.g. FD60, FD120) and a "KEEP CLOSED" or "FIRE DOOR — KEEP LOCKED" label per the design.
              </li>
              <li>
                <strong>Output sub-circuit labels.</strong> The central battery distributes via sub-circuits to slave luminaires across the building. Each sub-circuit at the central battery is labelled with the area it feeds, the circuit reference, and the design load.
              </li>
              <li>
                <strong>Battery hazard warnings.</strong> The battery enclosure carries the appropriate hazard warnings — chemistry-specific (e.g. "lead-acid — corrosive electrolyte" for SLA, "lithium — fire risk if damaged" for LiFePO4), voltage warning (where the system DC voltage is hazardous), and PPE requirements for any maintenance.
              </li>
              <li>
                <strong>Test facility identification.</strong> Where a test facility (key-operated test switch, test mode button on the panel) is provided, it is labelled with its function and the operating procedure.
              </li>
            </ul>
            <p>
              The labels are not bureaucracy — they are the safety control that prevents inadvertent operation. A facility manager moving lightbulb-changing contractors through the building can point to the labelled lockable isolator and the warning notices and brief them not to operate it without coordination. The labels are the operational interface to the safety system.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 50171:2021 · Clause 5.7 (Identification and warning notices)"
            clause={
              <>
                The central power system shall be clearly identified as serving emergency lighting. Warning notices shall be provided at the supply isolator stating that the supply must not be interrupted other than under controlled conditions, at the battery enclosure indicating any hazards associated with the battery chemistry, and at any test facility identifying the function of the controls.
              </>
            }
            meaning="Three notice categories specified: system identification, supply non-interruption warning, battery hazard warning. The intent is to prevent inadvertent action that would compromise the system. The clause is firm — these are not optional."
          />

          <CommonMistake
            title="Lockable isolator without the lock fitted"
            whatHappens="The central battery supply isolator is specified and installed as lockable. The lock and key control were never finalised at handover; the isolator sits in the ON position with no lock fitted. A year into operation, a contractor working on unrelated electrical work in the panel room sees the labelled isolator, doesn\'t understand its function, and switches it off to safely work in the same enclosure. The central battery loses charge over the next 12 hours; the next monthly functional test reveals widespread failure. Investigation traces the isolation event."
            doInstead="The lock is part of the protective measure. It must be fitted before commissioning is signed off. The label alone is necessary but not sufficient — the physical lock is what stops a misunderstanding from becoming an isolation event. Key control is documented in the building management procedures: who holds the key, who can operate the isolator, what the procedure is for any planned isolation. The 2025 standard tightens this — a labelled-but-unlocked isolator is a non-conformance."
          />

          <SectionRule />

          <ContentEyebrow>The BS 5266-1:2025 logbook</ContentEyebrow>

          <ConceptBlock
            title="The contemporaneous record"
            plainEnglish="The BS 5266-1 logbook is the contemporaneous record of every test, every inspection, every fault, every repair across the operational life of the installation. Each entry is created the day the activity happens, signed by the person who carried it out, in enough detail to reconstruct what was done years later. Insurers, fire authorities, and tribunal investigators rely on the logbook as the primary evidence of compliance with the periodic regime. A logbook missing entries, with backdated entries, or with vague entries provides no defence."
            onSite="The logbook is filled in on site at the time, not at the office afterwards. The discipline is to carry the logbook (or open the electronic logbook on a tablet) and complete the entry while the activity is fresh. Filling in later is a category of practice that introduces errors and undermines the contemporaneous nature of the record."
          >
            <p>Per-entry content for a BS 5266-1:2025 logbook:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Date and time.</strong> When the activity took place. Start and end times for substantial activities (duration tests).
              </li>
              <li>
                <strong>Activity type.</strong> Functional test / duration test / visual inspection / photometric survey / fault investigation / repair / battery replacement / commissioning. Specific.
              </li>
              <li>
                <strong>Scope.</strong> What was covered — whole installation / specific zone / specific circuit / individual luminaire (with reference). For a partial test, document why.
              </li>
              <li>
                <strong>Method.</strong> How the activity was carried out — circuit interrupted / test facility used / central battery test mode / controller-initiated / lux meter survey at design grid. Sufficient to allow reconstruction.
              </li>
              <li>
                <strong>Observations / results.</strong> Per-luminaire results (in summary tables for large installations; per-luminaire detail for fault investigations). Self-test electronic logs as appendix.
              </li>
              <li>
                <strong>Faults identified.</strong> Any luminaire or system that did not pass. Reference, observation, suspected cause.
              </li>
              <li>
                <strong>Corrective action.</strong> What was done about the fault — replacement, repair, escalation. Date of corrective action; verification re-test.
              </li>
              <li>
                <strong>Recovery.</strong> For duration tests, recovery start time and 24-h confirmation of ≥ 80% capacity.
              </li>
              <li>
                <strong>5-year photometric column (NEW 2025).</strong> Date of last photometric verification and date next due. Surfaces the photometric cadence in the everyday logbook.
              </li>
              <li>
                <strong>Tester / inspector.</strong> Name, qualification, signature. The competent person.
              </li>
              <li>
                <strong>Cross-references.</strong> Photometric survey (if same visit), visual inspection (if same visit), BS 7671 verification (if same visit). The logbook ties together the elements of the periodic regime.
              </li>
            </ul>
            <p>
              The logbook can be paper or electronic. Modern self-test installations typically use the central addressable controller as the electronic logbook for the automated test results, with the human-led elements appended separately. Either format is acceptable; what matters is contemporaneous creation, completeness of fields, and signature by the competent person.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <RegsCallout
            source="Regulatory Reform (Fire Safety) Order 2005 · Article 23 (Records)"
            clause={
              <>
                The responsible person shall keep a record of any maintenance, testing, or other measures taken under the Order in respect of the premises, and shall make these records available for inspection by the relevant authority. Records shall be retained for the period during which the measures relate to the premises and for such further period as may be necessary for any investigation.
              </>
            }
            meaning="The legal driver for the logbook. The RRO 2005 makes record-keeping a duty of the responsible person; the BS 5266-1 logbook is the practical implementation for emergency lighting. The retention obligation is open-ended — operational life plus 'such further period as may be necessary for any investigation' (typically several years)."
          />

          <Scenario
            title="Tribunal inspection of a five-year-old logbook"
            situation="A tribunal investigation follows a workplace incident where an evacuation was hampered by partial emergency lighting failure. Investigators request the BS 5266-1 logbook for the past five years, the asset register, the photometric survey records, and the EICR records."
            whatToDo="A clean record set demonstrates the periodic regime: 60 monthly functional test entries (each with date, scope, method, result, signature), 5 annual duration test entries (each with recovery confirmation), 1 five-year photometric report, 1 current EICR. Several reactive fault entries with clear corrective actions and verifications. The investigation can establish that the system was being maintained to standard; the failure that affected the incident was a recent step-change failure (post the most recent monthly test) rather than a longstanding undetected condition. The compliance record forms the responsible person\'s defence."
            whyItMatters="The logbook is the legal evidence of maintenance. Without it, the responsible person cannot demonstrate compliance with Article 17 of the RRO 2005. With it, the regime\'s operation is visible; failures are visible too but are seen in their context as part of an actively maintained system. The contemporaneous logbook is the responsible person\'s position in any investigation."
          />

          <SectionRule />

          <ContentEyebrow>Photographic record at commissioning</ContentEyebrow>

          <ConceptBlock
            title="A photograph of every luminaire"
            plainEnglish="The photographic record is becoming standard practice at handover. Every emergency luminaire is photographed at commissioning — typically a single image showing the luminaire in its location with a clearly readable installation label, taken from a distance that captures the luminaire and enough surrounding context for orientation. The photographs are filed against the as-built drawing and the asset register. They serve multiple purposes across the installation life."
          >
            <p>What the photographic record supports:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Asset identification.</strong> A maintainer attending a fault on a specific luminaire reference can pull up the photograph to see exactly what they will encounter — type, mounting, accessibility, surroundings. Reduces wasted journeys for the wrong spare or wrong access equipment.
              </li>
              <li>
                <strong>Verification of installation.</strong> Comparing as-installed against design intent — the photographs confirm the luminaire was actually mounted where the design specified and at the design height.
              </li>
              <li>
                <strong>Insurer / fire authority evidence.</strong> Photographs are tangible evidence of the system as installed. They support the acceptance certificate by giving the auditor visual confirmation.
              </li>
              <li>
                <strong>Dispute resolution.</strong> Any later dispute about original installation (e.g. an insurance claim raising whether a luminaire was correctly positioned) can be settled by reference to the commissioning photographs.
              </li>
              <li>
                <strong>Post-incident investigation.</strong> Compares the system as-installed to the system as found at the incident — identifies any changes (damage, removal, modification).
              </li>
            </ul>
            <p>
              Production cost is low — a single competent photographer with a good camera can photograph a 200-luminaire installation in a day. The photographs are filed in a structured folder (one per luminaire, named by reference) and indexed against the asset register. Modern installations sometimes use 360° photography or video walk-throughs for further context. The investment pays back across years of operation.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Photographic record done at handover and never updated"
            whatHappens="A 2020 commissioning produced a comprehensive photographic record. Five years later, the building has had several refurbishments — new ceilings, new partitions, some luminaires moved or replaced. The photographic record no longer matches the building. A maintainer attending a fault uses the photo and finds it bears no resemblance to the current state."
            doInstead="The photographic record needs maintenance like every other part of the documentation pack. Each significant change to a luminaire (replacement, relocation, modification) should generate a new photograph that supersedes the original. The five-year photometric / EICR visit is a natural opportunity for a photographic refresh — verify the records, update where needed. Without the refresh, the photographic record drifts out of usefulness over time."
          />

          <SectionRule />

          <ContentEyebrow>Retention policy</ContentEyebrow>

          <ConceptBlock
            title="How long to keep the records"
            plainEnglish="Retention is not infinite — at some point, very old records have negligible operational or legal value and can be archived or disposed of. But the period over which they retain value is longer than many people assume. BS 5266-1:2025 expects records retained for the operational life of the installation. Insurers often expect 6 years post-decommissioning. The RRO 2005 Article 23 requires retention for any period during which an investigation might still relate to the records — open-ended in practice."
          >
            <p>Working retention guidance:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>BS 5266-1 logbook.</strong> Operational life of the installation, plus 6 years post-decommissioning for insurer-aware practice. Typical commercial installation life 15-25 years, so logbooks may be retained for 25+ years.
              </li>
              <li>
                <strong>Asset register.</strong> Same as logbook — operational life plus post-decommissioning. The register is typically a single living document updated continuously; archive snapshots at major milestones (commissioning, each EICR, decommissioning).
              </li>
              <li>
                <strong>Daily check book.</strong> Operational life plus 6 years post-decommissioning, aligned with logbook. Volume is small (a small notebook per year typical).
              </li>
              <li>
                <strong>Self-test electronic logs.</strong> Typically retained indefinitely on the controller (storage cost is trivial). Periodic exports to long-term archive.
              </li>
              <li>
                <strong>Photometric survey records.</strong> Operational life plus 6 years post-decommissioning. Each survey is the baseline for the next; never discard the most recent.
              </li>
              <li>
                <strong>Acceptance certificate, design drawings, manuals.</strong> Permanent retention until decommissioning, plus 6 years post-decommissioning. These are the foundational documents — destroy too early and the installation cannot be properly maintained.
              </li>
              <li>
                <strong>Fault investigation records.</strong> 6 years minimum from the date of investigation, longer where the fault has ongoing implications.
              </li>
            </ul>
            <p>
              The retention policy itself should be documented in the building management procedures so that staff turnover does not result in records being inadvertently disposed of. The cost of retention is low (digital archive, a box of paper); the cost of premature disposal can be substantial in any future investigation.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Practical asset register and label workflow</ContentEyebrow>

          <ConceptBlock
            title="Building the records as you commission"
            plainEnglish="The labels and the asset register are most efficiently built as the installation is being commissioned, not after. The contractor walks the as-built drawing, references each luminaire, applies the installation label, takes the photograph, and enters the row into the asset register — all in one pass. By the end of commissioning, the labels are on, the photographs are filed, the register is populated. Any attempt to retrofit this after handover is two or three times the work and tends to leave gaps."
          >
            <p>The integrated workflow at commissioning:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Pre-commissioning preparation.</strong> The asset register template is set up (spreadsheet rows or facilities management software records, one per luminaire from the as-built drawing). Installation label templates are designed (matching format, weatherproof, ready to print). Photograph naming convention agreed.
              </li>
              <li>
                <strong>Visual / mechanical inspection pass.</strong> While walking the as-built drawing for the BS 5266-1 visual inspection, the inspector confirms each luminaire matches the design, applies the installation label (with the unique reference, area, circuit, battery date), and takes a photograph. The asset register row is populated with the manufacturer details and the installation details.
              </li>
              <li>
                <strong>BS 7671 verification pass.</strong> Continuity, IR, polarity, Zs at each accessible point — the asset register row is updated with the recorded values for that luminaire.
              </li>
              <li>
                <strong>Photometric pass.</strong> Lux meter readings on the design grid — the asset register photometric row is updated with the design assumption for that luminaire and any contribution to specific design grid points.
              </li>
              <li>
                <strong>Switch-on pass.</strong> Per-luminaire response time observation — recorded against the asset register row.
              </li>
              <li>
                <strong>Duration pass.</strong> Per-luminaire end-of-test observation — recorded against the asset register row.
              </li>
              <li>
                <strong>Handover.</strong> The asset register, the labelled luminaires, the photographs, the logbook (with the commissioning entry referenced), and the acceptance certificate together form the handover documentation pack.
              </li>
            </ul>
            <p>
              The integrated workflow is standard in installations carried out by BAFE SP203-4-registered contractors. Non-registered contractors sometimes treat documentation as a post-hoc exercise; the result is gaps, inconsistencies, and rework. The 2025 standard implicitly favours the integrated workflow by demanding completeness across all the documentation elements at handover.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Two label types per luminaire: manufacturer label (factory) + installation label (commissioning). Together they identify the asset and connect it to the documentation pack.',
              'Installation label minimum: unique reference, area, circuit, class/response/duration, battery installation date, links to as-built / asset register / photo.',
              'Asset register: structured database of every luminaire — manufacturer, model, lamp, battery (chemistry + installed date + expected EOL), circuit, location, photometric assumption, service history, current status.',
              'Central battery: lockable supply isolator (lock fitted), do-not-switch-off label, system identification, fire-rated enclosure marking, output sub-circuit labels, battery hazard warnings, test facility labels.',
              'BS 5266-1:2025 logbook columns: date / type / scope / method / observations / faults / corrective action / recovery / 5-year photometric (NEW 2025) / signature.',
              'NEW 2025 column: date of last 5-year photometric verification + next due. Surfaces the cadence in the everyday logbook.',
              'Retention: BS 5266-1:2025 = operational life. Insurer-aware = 6 years post-decommissioning. RRO 2005 Article 23 = "such further period as may be necessary for any investigation".',
              'Photographic record at commissioning: one photo per luminaire, indexed against asset register and as-built. Refresh at five-year cycles or on significant changes.',
              'Self-test electronic logs are valid logbook components when supported by visual / photometric / BS 7671 records and competent person signature.',
              'The records ARE the compliance evidence. A perfectly maintained system with no records is regulatorily indistinguishable from a neglected one.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Can the installation label be combined with the manufacturer label?',
                answer:
                  'No — they should be separate. The manufacturer label is the factory record of what the luminaire is and what it complies with. The installation label is the site record of where it is and how it relates to the design. Combining them creates ambiguity about who is responsible for which information and makes updates difficult (the installation label may need updating during the luminaire\'s life — circuit changes, area renaming — without disturbing the factory information).',
              },
              {
                question: 'How do I label a luminaire that is hard to access (high ceiling, sealed enclosure)?',
                answer:
                  'The label has to be readable during the access regime that maintenance uses. For a high-ceiling luminaire reached only with elevated access equipment, label position should be on a face visible from below (so a maintainer at floor level can read with binoculars or a long lens) AND on a face accessible at maintenance level (for hands-on work). For sealed enclosures, the installation label may be inside the housing accessible only when the luminaire is opened — supplemented by a smaller external reference label for at-a-glance identification.',
              },
              {
                question: 'Is the BS 5266-1 logbook the same as the fire alarm logbook?',
                answer:
                  'No — they are separate documents covering different systems. The BS 5266-1 logbook is for emergency lighting; the BS 5839-1 logbook is for fire alarm. Both are required where both systems exist; both follow similar principles (contemporaneous, structured, signed by competent person) but cover different test cycles, different acceptance criteria, and different design references. Some buildings keep the two logbooks together in a single fire safety file for convenience; the documents themselves remain separate.',
              },
              {
                question: 'Can I keep the logbook entirely electronically?',
                answer:
                  'Yes — BS 5266-1:2025 accepts electronic logbooks where they meet the contemporaneous, structured, signed expectations. The competent person\'s electronic signature is acceptable where it has integrity controls (e.g. authenticated user, timestamp, tamper-evidence). Self-test installations frequently keep the entire logbook electronically on the controller plus the human-led elements in a linked electronic file. Backup discipline is important — a single-point-of-failure electronic system that loses years of records is a regulatory exposure.',
              },
              {
                question: 'What if the original installation labels have faded or been damaged?',
                answer:
                  'Replace them. Faded labels that cannot be read defeat their purpose. A relabel exercise is straightforward — a copy of the asset register, a roll of weatherproof labels, a few hours of access. Document the relabel in the logbook (date, scope, signature). The updated labels reference the same asset register entries; the asset register itself is unchanged. Where labels have been damaged repeatedly, consider higher-spec labels (engraved metal tags, robust polymer with UV-stable print) for the next round.',
              },
              {
                question: 'How does the responsible person verify the contractor\'s logbook entries are honest?',
                answer:
                  'Several mechanisms. (a) Sample inspection — the responsible person spot-checks logbook entries against the actual luminaire status (e.g. find the luminaires marked as recent battery replacements and verify the new dates). (b) Cross-reference — the daily check book records (kept by the responsible person\'s staff) should be consistent with the contractor\'s monthly entries. (c) Self-test electronic logs — where present, these are objective evidence that supports or contradicts the contractor\'s manual entries. (d) Periodic third-party audit — every few years, an independent competent person reviews the logbook for completeness and consistency. Honest contractors welcome these checks; dishonest ones cannot survive them.',
              },
              {
                question: 'What goes in the asset register that does not go on the label?',
                answer:
                  'The label is brief — visible on the luminaire, has limited space. The asset register is comprehensive — visible only via documentation, has unlimited space. The register adds: full service history (every fault and repair), photometric design assumption (the lux contribution this luminaire is supposed to make), self-test address (for addressable systems), photograph reference, design class details (response time, duration), and current operational status. The label has the working subset; the register has the full picture.',
              },
              {
                question: 'Can the asset register be replaced by the central addressable controller database?',
                answer:
                  'Where the controller carries comprehensive luminaire data (manufacturer, model, battery chemistry, dates, location, service history) and supports queryable reporting and retention, it can be the asset register. Many modern self-test systems are designed for this. The competent person should verify that all required fields are captured and that the data is exportable for backup and audit purposes — relying on a single proprietary system without exportable data is a long-term risk if the system is later replaced or fails.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="System labelling and maintenance records — Module 5.4" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 5
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-5-section-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.5 Certification and commissioning checklists
              </div>
            </button>
          </div>

          <div className="hidden">
            <Activity />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default EmergencyLightingModule5Section4;
