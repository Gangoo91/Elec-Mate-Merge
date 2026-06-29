import { ArrowLeft, Shield, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Use of Approved Spare Parts - MOET Module 4.4.4';
const DESCRIPTION =
  'Guide to approved spare parts management for electrical maintenance: OEM vs third-party components, specifications matching, obsolescence management, critical spares holding, stock management, quality assurance, traceability and warranty considerations under ST1426.';

const quickCheckQuestions = [
  {
    id: 'oem-vs-third',
    question:
      'What is the primary advantage of using OEM (Original Equipment Manufacturer) spare parts?',
    options: [
      'Guaranteed exact specification match, maintaining warranty and compatibility',
      'They are always the cheapest option available on the open market',
      'They never require any incoming inspection before being fitted to equipment',
      'They have the shortest procurement lead time of any source of supply',
    ],
    correctIndex: 0,
    explanation:
      'OEM spare parts are manufactured or approved by the original equipment manufacturer, guaranteeing exact specification match, compatibility and quality. Using OEM parts typically maintains the equipment warranty. However, they may be more expensive and have longer lead times than third-party alternatives. The trade-off between OEM and quality third-party alternatives must be assessed on a case-by-case basis.',
  },
  {
    id: 'obsolescence',
    question: 'What is the BEST strategy for managing component obsolescence?',
    options: [
      'Monitor end-of-life notices, qualify alternatives early, and stock critical obsolescent parts',
      'Wait until a component fails, then search the market for any available replacement',
      'Replace the whole item of equipment immediately whenever any single part is discontinued',
      'Buy the cheapest unbranded equivalent on the market as soon as stock runs low',
    ],
    correctIndex: 0,
    explanation:
      'Proactive obsolescence management involves monitoring manufacturer product lifecycle announcements, subscribing to end-of-life notifications, identifying and qualifying replacement alternatives before discontinuation, and holding strategic buffer stock of critical obsolescent components. This prevents emergency situations where a failed component cannot be replaced, causing extended downtime.',
  },
  {
    id: 'critical-spares',
    question:
      'Which criterion is MOST important when deciding whether to hold a component as a critical spare?',
    options: [
      "The physical size of the component and the storage space it would occupy",
      "The colour scheme and the type of packaging the manufacturer supplies it in",
      "Whether the component is sourced from an OEM or from a third-party supplier",
      "The consequence of its failure on safety and production, plus replacement lead time",
    ],
    correctIndex: 3,
    explanation:
      'Critical spares decisions are based on the consequence of failure (safety impact, production loss, environmental impact) combined with the lead time to obtain a replacement. A component that would cause a safety shutdown or significant production loss AND has a long procurement lead time should be held as a critical spare. The cost of holding the spare is weighed against the cost of extended downtime.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'When sourcing a third-party replacement for an OEM component, the minimum requirement is:',
    options: [
      'It must be physically able to fit into the same mounting space as the original',
      'It must meet or exceed every critical specification — electrical, thermal, dimensional and certification',
      'It must be cheaper than the OEM part in order to justify the substitution',
      'It must carry the same brand name and logo as the original component',
    ],
    correctAnswer: 1,
    explanation:
      "Third-party components must meet or exceed every critical specification: electrical ratings, environmental ratings, certifications (CE, UKCA, relevant BS/EN standards), physical dimensions and functional performance. A lower specification in any critical parameter could compromise safety or reliability. Verification should include checking datasheets, certificates and, where possible, obtaining manufacturer's cross-reference documentation.",
  },
  {
    id: 2,
    question: 'Traceability of spare parts means:',
    options: [
      "Keeping spare parts in a locked store with access restricted to authorised staff",
      "Recording only the date on which a part was fitted to the equipment",
      "Tracing a part's manufacturer, batch, date, spec and supply chain through to installation",
      "Labelling the storage shelf with the part number and the quantity held",
    ],
    correctAnswer: 2,
    explanation:
      'Traceability is the ability to trace the complete history of a component from manufacture through supply chain to installation. This includes manufacturer identity, part number, batch/lot number, date of manufacture, test certificates, supply chain documentation and installation records. Traceability is essential for quality assurance, warranty claims, product recall response and regulatory compliance. In safety-critical applications, traceability may be a legal requirement.',
  },
  {
    id: 3,
    question:
      "A critical spare for a 400 kW motor's main contactor has been stored in the spares store for 3 years. Before fitting, you should:",
    options: [
      'Fit it straight away, since a sealed spare cannot deteriorate while in storage',
      'Return it to the supplier for a freshly manufactured unit before fitting it',
      'Energise it on the test bench at full voltage to confirm that it still works',
      'Inspect for damage and corrosion, check coil and contacts, and confirm it is within shelf-life',
    ],
    correctAnswer: 3,
    explanation:
      'Components held in storage can deteriorate over time due to humidity, temperature cycling, corrosion, elastomer degradation (seals, gaskets) and mechanical settling. Before fitting a stored spare, carry out a thorough inspection: visual check for damage and corrosion, functional check of mechanical parts, electrical check of coils and contacts, and verification of shelf-life limits. Electronic components such as electrolytic capacitors in drives may have a limited shelf life of 2-5 years.',
  },
  {
    id: 4,
    question: 'Which document provides the definitive technical specification for a spare part?',
    options: [
      "The manufacturer's datasheet, backed by the relevant BS/EN standard and design documents",
      "The delivery note that was supplied with the component at goods-in",
      "The CMMS work order that records the details of the original fault",
      "The supplier's online product listing or printed catalogue entry",
    ],
    correctAnswer: 0,
    explanation:
      "The manufacturer's technical datasheet provides the definitive specification including electrical ratings, environmental ratings, physical dimensions, performance curves, derating factors and certification information. This should be cross-referenced with the relevant standard (e.g., BS EN 60947 for switchgear) and the specific equipment design documentation that specifies the exact requirements for the application.",
  },
  {
    id: 5,
    question: 'Stock management for maintenance spares should ensure:',
    options: [
      'The largest possible quantity of every part is always held in stock',
      'Stock levels balance availability against cost, with FIFO rotation and reorder triggers',
      'Only OEM parts are ever held, regardless of their cost or lead time',
      'The newest stock is always issued first to keep the parts held current',
    ],
    correctAnswer: 1,
    explanation:
      'Effective stock management balances availability (ensuring parts are available when needed to minimise downtime) against holding cost (storage space, capital tied up, deterioration risk). Key practices include: defined reorder points and quantities, FIFO (First In First Out) rotation to prevent ageing, regular stock audits, proper storage conditions (temperature, humidity, dust control), and clear labelling with part numbers and shelf-life dates.',
  },
  {
    id: 6,
    question:
      'If an MCB has a UKCA marking but not a CE marking, is it acceptable for use in a UK installation?',
    options: [
      'No — only CE-marked products may lawfully be used anywhere in the UK',
      'No — an MCB must carry both the UKCA and the CE mark to be valid',
      'Yes — UKCA is the UK equivalent of CE for the GB market and confirms compliance',
      'Yes — but only if a separate test certificate is also obtained for it',
    ],
    correctAnswer: 2,
    explanation:
      "Following the UK's departure from the EU, the UKCA marking is the UK conformity assessment marking for products placed on the GB market. UKCA-marked products have been assessed against the relevant UK designated standards and meet UK regulatory requirements. CE marking is still required for products placed on the Northern Ireland market (under the NI Protocol). Both markings confirm that the product meets the relevant technical standards.",
  },
  {
    id: 7,
    question:
      'Why should electrical spare parts be stored in their original packaging where possible?',
    options: [
      "Because removing the packaging automatically voids the product warranty",
      "Because the original packaging is needed to return the part for a credit",
      "Because spare parts must legally remain sealed until the day they are fitted",
      "It protects against damage and moisture and carries identification and storage data",
    ],
    correctAnswer: 3,
    explanation:
      'Original packaging is designed to protect the component during transport and storage. It provides physical protection, moisture barriers, anti-static protection (for electronic components), and UV protection. The packaging also carries essential identification information (part number, batch number, date code) that supports traceability. Storage instructions (temperature range, humidity limits, shelf life) may be printed on the packaging.',
  },
  {
    id: 8,
    question:
      'When a spare part is used, the CMMS (Computerised Maintenance Management System) should be updated to record:',
    options: [
      'Part details, batch, issue date, issuer, the equipment fitted to, and work order number',
      'Only the part number and the quantity of stock remaining afterwards',
      'Only the name of the technician who physically fitted the part',
      'Nothing — the CMMS updates the spares records entirely automatically',
    ],
    correctAnswer: 0,
    explanation:
      'Complete CMMS records support traceability, stock management, cost tracking, warranty management and maintenance history. Recording which parts were used on which equipment enables failure analysis, product recall response, and warranty claims. Linking parts to work orders provides an audit trail connecting the fault, the repair action, the parts used and the outcome.',
  },
  {
    id: 9,
    question: "What is a 'last-time buy' in the context of obsolescence management?",
    options: [
      'The final purchase made from a supplier before the financial year-end',
      'A bulk buy before discontinuation, giving buffer stock until an alternative is ready',
      'The cheapest possible purchase of a component near the end of its production life',
      'A single replacement bought only after the original part has already failed',
    ],
    correctAnswer: 1,
    explanation:
      "A 'last-time buy' (LTB) is a planned bulk purchase of components when a manufacturer announces end-of-life (EOL) discontinuation. The quantity is calculated based on expected demand over the remaining equipment life, failure rate data, and the time needed to qualify and implement an alternative. LTB decisions require careful analysis to avoid both under-buying (running out before an alternative is ready) and over-buying (tying up capital in excess stock).",
  },
  {
    id: 10,
    question: 'Quality assurance for incoming spare parts should include:',
    options: [
      'Fitting the part immediately and checking it only if a fault later occurs',
      'Accepting the delivery on trust without opening the outer packaging',
      'Checking damage, part number, certificates, quantity and storage against the order',
      'Recording only the quantity received against the relevant purchase order',
    ],
    correctAnswer: 2,
    explanation:
      'Incoming quality assurance (IQA) ensures that received parts are correct, undamaged, and genuine. Checks include: physical condition (no transport damage), part number verification (matches order and specification), quantity check, review of certificates of conformity and test certificates, check for appropriate markings (UKCA/CE, BS/EN references), and confirmation of storage requirements. For safety-critical or high-value components, additional checks such as dimensional verification or sample testing may be required.',
  },
  {
    id: 11,
    question: 'Warranty on a variable speed drive is typically voided if:',
    options: [
      'The drive is operated continuously at its full rated output load',
      'The drive is mounted inside an approved control panel enclosure',
      'The drive is serviced only by a manufacturer-authorised service engineer',
      'Non-approved parts, unauthorised opening, parameter changes or out-of-spec operation',
    ],
    correctAnswer: 3,
    explanation:
      'Drive warranties typically have conditions including: only approved spare parts and accessories must be used, repairs must be carried out by manufacturer-authorised service engineers, the drive must be operated within specified environmental conditions (temperature, humidity, altitude, supply quality), and any modifications or parameter changes outside the scope of the installation manual may void the warranty. Check warranty terms before undertaking any work on warrantied equipment.',
  },
  {
    id: 12,
    question: 'A counterfeit electrical component poses which specific danger?',
    options: [
      'It may miss its claimed ratings and fail under fault, risking fire or electrocution',
      'It always costs more to buy than the genuine OEM equivalent part',
      'It always has a longer procurement lead time than a genuine component',
      'It can only ever be fitted by a manufacturer-authorised service engineer',
    ],
    correctAnswer: 0,
    explanation:
      'Counterfeit electrical components — particularly MCBs, RCDs, circuit breakers and fuses — may appear identical to genuine products but fail to meet the claimed safety ratings. They may use inferior materials, lack proper calibration, have inadequate breaking capacity, or fail to trip at the correct current. Under fault conditions, a counterfeit protective device may explode, fail to interrupt the fault, or catch fire. Always source components from authorised distributors and verify authenticity.',
  },
];

const faqs = [
  {
    question:
      'How do I verify that a third-party spare part is genuinely equivalent to the OEM original?',
    answer:
      "Compare the complete technical datasheets parameter by parameter: electrical ratings (voltage, current, frequency), environmental ratings (temperature range, IP rating, pollution degree), certifications (UKCA, CE, relevant BS/EN standards), physical dimensions, and performance characteristics. Request the manufacturer's cross-reference document if available. For safety-critical applications, consider requesting third-party test certificates or carrying out independent verification testing.",
  },
  {
    question: 'What should I do if a critical spare part is no longer available from any supplier?',
    answer:
      'Options include: consulting the original equipment manufacturer for an approved alternative or upgrade path; engaging a specialist obsolescence management company who may have stock or can source from secondary markets; considering a reverse-engineering and custom-manufacture approach for simple components; or planning an equipment upgrade or replacement if no viable spare part solution exists. Document the obsolescence issue and escalate to management for a decision on the most appropriate course of action.',
  },
  {
    question: 'Is it acceptable to fit a reconditioned or refurbished component?',
    answer:
      'Reconditioned components can be acceptable provided they have been professionally refurbished by a competent organisation, tested to the original specification, and supplied with a certificate of conformity and warranty. However, some components — particularly those with limited fatigue life (e.g., springs in circuit breakers) or those where internal degradation is difficult to detect (e.g., VSD power modules) — should generally be replaced with new parts. The decision should be based on a risk assessment considering the criticality of the application.',
  },
  {
    question:
      'How long should electrical spare parts be kept in storage before they are considered too old to use?',
    answer:
      "Shelf life varies by component type. Rubber and elastomer seals: typically 5-10 years. Electrolytic capacitors: 2-5 years (check the manufacturer's data — capacitors can dry out and lose capacitance). Electronic modules with batteries: limited by battery life. Mechanical components (contactors, relays, switches): generally long shelf life if stored correctly, but check for corrosion and deterioration before use. Always follow manufacturer's storage life guidance where available, and carry out pre-installation checks regardless of age.",
  },
  {
    question:
      "What is the difference between a 'safety-critical' spare and a 'production-critical' spare?",
    answer:
      'A safety-critical spare is a component whose failure could directly cause injury, death or environmental harm — for example, a protection relay, an RCD, an emergency stop contactor, or fire detection equipment. These must always be available and must meet the highest quality and specification standards. A production-critical spare is one whose failure causes significant production loss or downtime but does not directly affect safety — for example, a VSD, a PLC module or a process instrument. Both categories warrant holding strategic stock, but safety-critical spares have the highest priority and the strictest specification requirements.',
  },
];

const MOETModule4Section4_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 4.4.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Use of Approved Spare Parts
          </h1>
          <p className="text-white">
            OEM vs third-party selection, obsolescence management, critical spares, stock control
            and quality assurance
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">
              In 30 Seconds
            </p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1">
                <strong>OEM preferred:</strong> Guaranteed compatibility and warranty retention
              </li>
              <li className="pl-1">
                <strong>Third-party:</strong> Acceptable if specifications are verified and matched
              </li>
              <li className="pl-1">
                <strong>Obsolescence:</strong> Monitor lifecycle, last-time buy, plan alternatives
              </li>
              <li className="pl-1">
                <strong>Traceability:</strong> Full chain from manufacturer to installation
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">
              Key Principles
            </p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1">
                <strong>Quality assurance:</strong> Incoming inspection, certificates, authenticity
              </li>
              <li className="pl-1">
                <strong>Critical spares:</strong> Based on failure consequence and lead time
              </li>
              <li className="pl-1">
                <strong>Stock management:</strong> FIFO rotation, reorder points, storage conditions
              </li>
              <li className="pl-1">
                <strong>ST1426:</strong> Professional approach to materials and resources
              </li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Compare OEM and third-party spare parts and identify the criteria for acceptable substitution',
              'Match component specifications to ensure replacement parts meet all critical requirements',
              'Implement obsolescence management strategies including end-of-life monitoring and last-time buy decisions',
              'Apply critical spares analysis to determine which components should be held in stock',
              'Manage spare parts stock using FIFO rotation, reorder triggers and condition monitoring',
              'Ensure quality assurance through incoming inspection, traceability and counterfeit awareness',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            OEM vs Third-Party Spare Parts
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When a component fails and requires replacement, the maintenance technician faces a
              fundamental decision: source an OEM (Original Equipment Manufacturer) spare or select
              a third-party alternative. This decision has implications for safety, reliability,
              warranty, cost and lead time. Understanding the factors that should guide this
              decision is an important competence for maintenance technicians.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                OEM vs Third-Party Comparison
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">OEM</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Third-Party</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">
                        Specification match
                      </td>
                      <td className="border border-white/10 px-3 py-2">Guaranteed exact match</td>
                      <td className="border border-white/10 px-3 py-2">
                        Must be verified by the user
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Warranty</td>
                      <td className="border border-white/10 px-3 py-2">
                        Maintains equipment warranty
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        May void equipment warranty
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Cost</td>
                      <td className="border border-white/10 px-3 py-2">Generally higher</td>
                      <td className="border border-white/10 px-3 py-2">Generally lower</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Lead time</td>
                      <td className="border border-white/10 px-3 py-2">
                        Can be longer (specialist items)
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Often shorter (wider availability)
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">
                        Quality assurance
                      </td>
                      <td className="border border-white/10 px-3 py-2">Manufacturer's QA system</td>
                      <td className="border border-white/10 px-3 py-2">
                        Must be independently verified
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">
                        Counterfeit risk
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Low (via authorised channels)
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Higher (especially from unfamiliar sources)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">
                Counterfeit Components Warning
              </p>
              <p className="text-sm text-white">
                Counterfeit electrical components are a growing problem globally. Fake MCBs, RCDs
                and fuses that appear identical to genuine products have been found to contain
                inferior internal mechanisms, incorrect calibration, and substandard materials. They
                may fail to operate under fault conditions, resulting in fire, explosion or
                electrocution. Always source components from authorised distributors and be
                suspicious of prices significantly below market norms. Report suspected counterfeit
                products to the manufacturer and Trading Standards.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Specifications Matching and Quality Assurance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Whether using OEM or third-party components, the maintenance technician must verify
              that the replacement part meets all the requirements of the application. This
              verification process is known as specifications matching and is a critical quality
              assurance step that prevents incorrect parts being fitted.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Specifications to Match
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Electrical ratings:</strong> Voltage (Ue), current (In/Ie), frequency,
                  power, breaking capacity (Icu/Icn), making capacity (Icm)
                </li>
                <li className="pl-1">
                  <strong>Performance characteristics:</strong> Trip curves, time-current
                  characteristics, response times, accuracy class
                </li>
                <li className="pl-1">
                  <strong>Environmental ratings:</strong> Temperature range, IP rating, pollution
                  degree, altitude limits, vibration resistance
                </li>
                <li className="pl-1">
                  <strong>Certifications:</strong> UKCA/CE marking, relevant BS/EN standards,
                  third-party test house approvals
                </li>
                <li className="pl-1">
                  <strong>Physical dimensions:</strong> Mounting centres, DIN rail width (modules),
                  overall dimensions, terminal positions, cable entry sizes
                </li>
                <li className="pl-1">
                  <strong>Functional compatibility:</strong> Communication protocols, I/O
                  configuration, software compatibility, accessory compatibility
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Incoming Quality Assurance Checklist
              </p>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1">
                  Verify part number matches the purchase order and specification
                </li>
                <li className="pl-1">
                  Inspect packaging for damage, tampering or signs of being opened
                </li>
                <li className="pl-1">Check quantity matches the order</li>
                <li className="pl-1">
                  Verify markings: UKCA/CE, part number, date code, batch number
                </li>
                <li className="pl-1">Review certificate of conformity (if supplied)</li>
                <li className="pl-1">
                  Visual inspection of the component for physical damage or defects
                </li>
                <li className="pl-1">Compare physical characteristics with the datasheet</li>
                <li className="pl-1">Record in the CMMS with all identification details</li>
              </ol>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Obsolescence Management
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Component obsolescence is an inevitable challenge in electrical maintenance.
              Manufacturers discontinue products for various reasons: declining demand, technology
              advancement, material supply issues, or regulatory changes. The maintenance team must
              proactively manage obsolescence to avoid situations where a critical component fails
              and no replacement is available.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Obsolescence Management Strategy
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Monitor:</strong> Subscribe to manufacturer end-of-life (EOL)
                  notifications, monitor product lifecycle stages (active, mature, last-order,
                  obsolete)
                </li>
                <li className="pl-1">
                  <strong>Assess:</strong> When an EOL notice is received, assess the impact — how
                  many of the component are installed, what is the failure rate, what is the
                  remaining equipment life?
                </li>
                <li className="pl-1">
                  <strong>Plan:</strong> Identify alternative components, assess compatibility, plan
                  qualification testing if needed
                </li>
                <li className="pl-1">
                  <strong>Last-time buy:</strong> Calculate the required quantity based on failure
                  rate, installed base and remaining equipment life. Place the order before the
                  last-order date
                </li>
                <li className="pl-1">
                  <strong>Implement:</strong> Transition to the alternative component through
                  planned replacement or next-failure replacement
                </li>
                <li className="pl-1">
                  <strong>Review:</strong> Periodically review the obsolescence register and update
                  risk assessments
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">
                Technology Refresh Planning
              </p>
              <p className="text-sm text-white">
                For equipment approaching end-of-support, consider a technology refresh rather than
                stockpiling obsolete spares indefinitely. Modern replacements often offer improved
                performance, better energy efficiency, enhanced diagnostics and predictive
                maintenance capabilities. A planned technology refresh can be more cost-effective
                than managing obsolescence for ageing equipment — particularly when spare parts
                become scarce and expensive on the secondary market.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Critical Spares Holding, Stock Management and Warranty
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Not every spare part needs to be held in stock. The decision to hold a component as a
              critical spare is based on a structured analysis of the consequences of failure, the
              probability of failure, and the lead time to obtain a replacement. Effective stock
              management ensures that parts are available when needed, stored correctly, and used
              before they deteriorate.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Critical Spares Analysis Matrix
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>High consequence + long lead time:</strong> MUST hold as critical spare —
                  e.g., custom transformer, specialist protection relay, large motor
                </li>
                <li className="pl-1">
                  <strong>High consequence + short lead time:</strong> CONSIDER holding — depends on
                  the acceptable downtime period
                </li>
                <li className="pl-1">
                  <strong>Low consequence + long lead time:</strong> CONSIDER holding — may be
                  acceptable to wait for delivery
                </li>
                <li className="pl-1">
                  <strong>Low consequence + short lead time:</strong> ORDER when needed — no need to
                  hold stock
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Stock Management Best Practice
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>FIFO rotation:</strong> First In, First Out — oldest stock used first to
                  prevent shelf-life expiry
                </li>
                <li className="pl-1">
                  <strong>Reorder point:</strong> Defined minimum stock level that triggers a
                  reorder — set based on lead time and usage rate
                </li>
                <li className="pl-1">
                  <strong>Storage conditions:</strong> Clean, dry, temperature-controlled
                  environment. Anti-static storage for electronic components. Protection from dust,
                  moisture and UV
                </li>
                <li className="pl-1">
                  <strong>Labelling:</strong> Clear identification with part number, description,
                  date received, shelf-life date and storage location
                </li>
                <li className="pl-1">
                  <strong>Regular audits:</strong> Physical stock count compared with CMMS records,
                  condition assessment of stored items
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Warranty Considerations
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Check before work:</strong> Always verify whether equipment is under
                  warranty before commencing repairs
                </li>
                <li className="pl-1">
                  <strong>OEM parts:</strong> Using non-OEM parts may void the equipment
                  manufacturer's warranty
                </li>
                <li className="pl-1">
                  <strong>Authorised personnel:</strong> Some warranties require repairs to be
                  carried out by manufacturer-trained personnel
                </li>
                <li className="pl-1">
                  <strong>Documentation:</strong> Warranty claims require evidence of proper
                  maintenance, correct operating conditions and genuine parts usage
                </li>
                <li className="pl-1">
                  <strong>Extended warranties:</strong> Consider extended warranty or service
                  contracts for critical and expensive equipment
                </li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> Managing spare parts effectively demonstrates the
              professional approach to maintenance resources expected of a competent maintenance
              technician. The ability to source correct parts, verify specifications and manage
              stock contributes directly to equipment reliability and safety.
            </p>
          </div>
        </section>

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <Quiz title="Test Your Knowledge — Approved Spare Parts" questions={quizQuestions} />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section4-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Cable Jointing
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section4-5">
              Next: Recommissioning Procedures
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule4Section4_4;
