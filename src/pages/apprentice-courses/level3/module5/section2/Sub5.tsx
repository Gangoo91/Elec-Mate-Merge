/**
 * Module 5 · Section 2 · Subsection 5 — Special locations visual checks
 * Maps to C&G 2365-03 / Unit 304 / LO3 / AC 3.1
 *
 * The Part 7 location-specific visual additions — bathrooms (701), pools
 * (702), saunas (703), construction sites (704), agricultural (705),
 * marinas (709), exhibitions (711), solar PV (712), EV charging (722),
 * medical locations (710). Zone definitions, IP ratings, supplementary
 * bonding, isolators within reach.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

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
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Special locations visual checks | Level 3 Module 5.2.5 | Elec-Mate';
const DESCRIPTION =
  "Visual inspection additions for Part 7 special locations — bathrooms (701), pools (702), saunas (703), construction sites (704), agricultural (705), exhibitions (711), solar PV (712), EV charging (722). Zone definitions, IP ratings, supplementary bonding.";

const checks = [
  {
    id: 'm5-s2-sub5-bathroom-zones',
    question: 'Section 701 bathroom zones are defined as:',
    options: [
      'MCS Certificate, manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s commissioning records, design documentation including heat-loss calculation, system schematic, controls programming details, maintenance instructions and a Building Regs compliance certificate',
      'That the perimeter of the site or that part of the site on which construction work is carried out is identified by suitable signs and the site is so far as is reasonably practicable secured from unauthorised access',
      'Zone 0 (interior of bath/shower basin), Zone 1 (above Zone 0 to 2.25 m, plus the volume above), Zone 2 (0.6 m horizontal extension from Zone 1 to 2.25 m height) — each with specific IP rating and equipment requirements.',
      'Source phase winding → line conductor → fault at appliance → exposed-conductive-part → CPC → MET → earthing conductor → service position → DNO PEN → source neutral terminal — protective device sees the high fault current and disconnects.',
    ],
    correctIndex: 2,
    explanation:
      'Section 701 zones — Zone 0 (within bath/shower), Zone 1 (above to 2.25 m), Zone 2 (0.6 m horizontal from Zone 1, to 2.25 m). Each has IP rating requirements (Zone 0: IPX7; Zone 1: IPX4; Zone 2: IPX4 — also affected by water-jet use). Equipment selection per Section 701.55. Visual inspection confirms zone-appropriate equipment is installed.',
  },
  {
    id: 'm5-s2-sub5-evse',
    question: 'Section 722 (EV charging) requires the EV charging point installation to:',
    options: [
      'Create a private, safe environment, express what you have observed factually, reassure confidentiality within safety limits, and leave the door open for future conversations',
      'Have RCD providing ADS suitable for the load — typically 30 mA Type B (or Type A with integral 6 mA DC RCD inside the EVSE), dedicated final circuit, isolator within reach, and PEN-fault protection per Section 722.411.4 where supplied from PME.',
      'Physical damage, corrosion, loose or missing fixings, overloading, maintained fire barriers at penetrations, earth continuity of metallic systems, and presence of unauthorised cables or modifications',
      'Usually the MHSWR Reg 7 designated competent person — H&S manager, contracts manager, Qualified Supervisor, or director. Every firm with 5+ employees should have one named in the H&S policy.',
    ],
    correctIndex: 1,
    explanation:
      'Section 722 — EV charging requirements include: dedicated final circuit, RCD type suitable for the smooth DC fault possibility (Type B, OR Type A where the EVSE has integral 6 mA DC RCD), isolator local to the EVSE, and the Section 722.411.4 PEN-fault protection where supplied from a PME source (typically achieved via an O-PEN device or earthing arrangement that disconnects on PEN failure).',
  },
  {
    id: 'm5-s2-sub5-iprating',
    question: 'IP rating IP44 means:',
    options: [
      "To provide essential identification and reference information including drawing number, title, scale, projection, revision status and approval signatures",
      "Large motor starting currents, heavy inductive loads switching, and supply network events affecting the local transformer",
      "Protected against ingress of solid objects greater than 1 mm (4 = first digit) and protected against splashing water from any direction (4 = second digit).",
      "Implementing a no-blame reporting system with visible management commitment, feedback on actions taken, recognition for reporting, and integration of near-miss data into risk assessment reviews",
    ],
    correctIndex: 2,
    explanation:
      'IP rating: first digit = solid ingress (0-6, 6 = dust-tight); second digit = water ingress (0-9, 9 = high pressure / steam). IP44 = protected against solids over 1 mm and against splash water. Common requirement for Zone 2 bathroom equipment, outdoor accessories, weather-exposed installations.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Per Section 702, swimming pool Zone 0 IP rating requirement is:',
    options: [
      'Immediately, where the inspector believes there is a risk of serious personal injury',
      'IPX8 — equipment immersed in water requires the highest water-ingress rating.',
      'To formally transfer the completed installation to the client with documentation',
      'Fixed guards, then other guards/protection devices, then PPE',
    ],
    correctAnswer: 1,
    explanation:
      'Section 702 Zone 0 (interior of pool) — IPX8 (continuous immersion). Zone 1 (above pool surface to 2.5 m, 2 m horizontal) — IPX5 / IPX4 depending on detail. Zone 2 — IPX2 minimum. SELV at 12 V AC / 30 V DC max within Zone 0/1 areas. Visual inspection confirms IP rating against zone.',
  },
  {
    id: 2,
    question: 'Section 704 (construction sites) requires socket outlets to:',
    options: [
      'A licensed asbestos removal contractor must carry out the work, with full RPE, decontamination procedures, air monitoring, a specific asbestos plan of work and notification to the HSE where required',
      'Arguing for the higher controls before defaulting to PPE. The L3 supervisor pushes back on "just give them masks" and asks "what engineering controls have we considered?". Documents the hierarchy reasoning. Inverts only when genuinely no higher control is reasonably practicable.',
      'Be supplied by a 30 mA RCD or with double / reinforced insulation, use 110 V CTE supplies for tools where applicable, and have IP rating appropriate to the site environment (typically IP44 minimum, IP65 for outdoor wet).',
      'Body scanning first (immediate physical awareness) → ABC model (identifying triggering beliefs) → Gibbs\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\' Reflective Cycle (structured reflection on the full incident) → Johari Window (seeking external feedback to identify blind spots)',
    ],
    correctAnswer: 2,
    explanation:
      'Section 704 — construction sites use 110 V CTE for hand tools (centre-tapped earth, max 55 V to earth), 230 V for fixed equipment with RCD protection, IP rating matched to site (rain, dust, mud). Visual inspection confirms supply voltage, RCD presence, IP rating.',
  },
  {
    id: 3,
    question: 'Section 705 (agricultural / horticultural premises) supplementary bonding requirements:',
    options: [
      'The Approved Electrician you\\\\\\\\\\\\\\\'re paired with for that task. They direct the work at the immediate face, show you how to do it and check your work before sign-off. The Foreman or Charge-hand allocates the pairing; the Approved Electrician runs the pairing day to day.',
      'Where a specific risk assessment demonstrates that the particular task, equipment, and location are suitable for the actual conditions — for example, an enclosed MEWP in a sheltered courtyard',
      'Both have valid positions — a quote is generally fixed, but genuinely unforeseeable work can constitute a valid variation, provided it is documented and agreed before proceeding',
      'All exposed and extraneous-conductive-parts that could be touched by livestock connected to a supplementary equipotential bonding network — to prevent dangerous voltage differences across livestock body length (livestock is more sensitive than humans).',
    ],
    correctAnswer: 3,
    explanation:
      'Section 705 — livestock (especially dairy cattle) are extremely sensitive to small voltage differences across body length. Supplementary bonding network connects exposed and extraneous parts at floor level to prevent step / touch voltages. Reg 705.415.2.1 — equipotential plane required in livestock areas.',
  },
  {
    id: 4,
    question: 'Section 712 (solar PV) requires the DC isolator at the inverter to:',
    options: [
      'Be DC-rated and within easy reach for emergency disconnection of the DC array. The AC isolator is separate. Both labelled per Reg 514 with relevant warnings (DC live during daylight even when AC is off).',
      'XLPE insulation must be handled with extreme cleanliness — contamination (fingerprints, moisture, dust) on the insulation surface can cause partial discharge sites and eventual failure',
      'Items projecting at low level that catch a foot — cables across walking routes, materials left out, raised flooring edges, uneven surfaces, doors that open into walkways. Particular issue on construction sites and during installation work.',
      'Section 722 requirements: Type B (or Type A + DC monitor) RCD protection, BS 8519 / OPDP "open-PEN" protection on TN-C-S supplies, IP-rated outdoor enclosures, dedicated final circuit (not shared with general sockets).',
    ],
    correctAnswer: 0,
    explanation:
      "Section 712 — DC isolation between PV array and inverter is required for safe maintenance. The DC remains live during daylight regardless of AC supply state. Visual inspection confirms DC isolator presence, rating (DC-rated, not AC-rated), accessibility, and warning labels (typically the BS EN 60417 PV danger sign plus 'DC LIVE DURING DAYLIGHT').",
  },
  {
    id: 5,
    question: 'Bathroom Zone 1 socket outlets are:',
    options: [
      'Safe isolation procedures, permit to work systems, and live working controls for electrical maintenance',
      'Not permitted (per Section 701) except for shaver supply units complying with BS EN 61558-2-5 (which provide isolating transformer protection).',
      'The apprentice is withholding information, possibly due to low trust. The mentor should build rapport and create psychological safety to encourage self-disclosure',
      'Isolate the circuit, lock off, prove dead, disconnect the motor and any electronic drive equipment, then conduct the test',
    ],
    correctAnswer: 1,
    explanation:
      'Section 701 — sockets are not permitted in Zones 0, 1, or 2 of a bathroom. Exception: shaver supply units to BS EN 61558-2-5 (isolating transformer SELV/PELV output) — historically permitted even in Zone 2 due to the transformer protection. Visual inspection identifies socket type and confirms zone permission.',
  },
  {
    id: 6,
    question: "Section 722 EV charging — PEN-fault protection where supplied from a PME source is achieved by:",
    options: [
      "At least six years for civil liability under the Limitation Act, with most professional indemnity insurers and Competent Person Schemes requiring 10 to 25 years. Cloud storage of PDFs is standard contractor practice now.",
      "30 mA RCD at the pitch — TT installations require RCD protection because Ra x I-delta-n must satisfy the 50 V touch-voltage limit, and the high electrode resistance means an overcurrent device alone cannot achieve disconnection in the required time",
      "An open-PEN protective device (O-PEN device) that disconnects the supply if the PEN integrity is lost (typical V<159 V or V>253 V detection), OR by deriving the EVSE earth from a separate TT electrode rather than the PME terminal — preventing PEN-fault diverted-N current from appearing on the vehicle chassis.",
      "Noticing the thought and reframing it: \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"I am having the thought that I am a terrible leader. This is a thought, not a fact. Missing one deadline does not define my entire leadership capability\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\" — creating distance between the self and the thought",
    ],
    correctAnswer: 2,
    explanation:
      "Reg 722.411.4 — PEN failure on a PME supply can put diverted neutral current on the vehicle chassis (the vehicle becomes a 'extraneous-conductive-part' touched by a person standing on possibly different potential). Solutions: O-PEN device (commercially marketed PEN-fault detector inside or upstream of the EVSE) OR derive the EVSE earth from a separate TT electrode. Visual inspection confirms the chosen protection method matches design.",
  },
  {
    id: 7,
    question: 'Section 711 (exhibitions, shows and stands) requires:',
    options: [
      "Maintenance activities frequently involve lifting operations — using MEWPs, chain hoists, cable winches and lifting accessories to access and move heavy electrical equipment",
      "Accept — 0.95 Ω is below both the table max (1.37) and the 0.8 acceptance figure (1.10). The hot Zs in service will be ~0.95 × 1.20 = 1.14 Ω, comfortably below 1.37. Document the result on the schedule of test results and sign off.",
      "The premises must be equipped with appropriate fire-fighting equipment and fire detectors and alarms, and any non-automatic equipment must be easily accessible and indicated by signs",
      "30 mA RCD on all final circuits supplying the stands, double or reinforced insulation where applicable, careful management of cable routing to avoid trip hazards in public areas, and easy means of disconnection at the stand origin.",
    ],
    correctAnswer: 3,
    explanation:
      'Section 711 — exhibitions / shows / stands are public-access locations with temporary installations, often with cables in walkway areas. RCD additional protection (30 mA) on all final circuits, robust mechanical protection on cables in public areas, easy means of disconnection per stand. Visual inspection confirms all of these.',
  },
  {
    id: 8,
    question: "Section 710 (medical locations) Group 1 / Group 2 distinguishes:",
    options: [
      "The criticality of supply continuity and the patient contact category. Group 0 = no patient contact. Group 1 = patient contact, supply interruption acceptable but treatment may be affected. Group 2 = applied parts on patient (e.g. ICU, theatres, cardiac), supply interruption could be life-threatening — IT (medical IT) systems and 0.5 s changeover supplies required.",
      "The right not to suffer detriment for raising health and safety concerns. An employee who is dismissed, demoted, denied promotion, harassed or otherwise penalised for raising a genuine health and safety concern (or for refusing to work in conditions of serious and imminent danger) has a claim under s.44. The right is automatic and doesn't require a qualifying period of employment.",
      "A contractual provision that materials you supply remain your property until you have been paid in full. Protects you if a customer doesn't pay — you have legal grounds to reclaim unpaid materials, subject to the practicalities (the goods being identifiable and recoverable).",
      "Periodic visual inspection, checking for physical damage, verifying ventilation and cooling, reviewing BMS logs for cell imbalance or temperature anomalies, testing isolation and protection devices, confirming firmware is current, and checking earthing and bonding",
    ],
    correctAnswer: 0,
    explanation:
      'Section 710 — medical location grouping by criticality. Group 2 (life-critical) requires medical IT supply (isolated from earth, monitored), Class 1 changeover within 0.5 s, equipotential bonding to high level. Visual inspection of medical locations is highly specialised — typically by inspectors trained in BS 7671 Section 710 specifically.',
  },
];

const faqs = [
  {
    question: "How do I identify the bathroom zones on visual inspection?",
    answer:
      "Stand in the bathroom with Section 701 in hand. Zone 0 = interior of bath / shower basin. Zone 1 = directly above Zone 0 to 2.25 m height (typical ceiling), plus the basin volume itself. Zone 2 = horizontal projection 0.6 m from Zone 1 outward, up to 2.25 m height. Outside Zone 2 is unzoned but still subject to general bathroom rules. IP rating and equipment permission map onto the zones.",
  },
  {
    question: "What is the difference between SELV, PELV and FELV?",
    answer:
      "SELV (Separated ELV) — voltage source isolated from earth and from other circuits. Used for bathroom Zone 0 lighting (12 V) and similar. PELV (Protective ELV) — same low voltage but earthed. FELV (Functional ELV) — low voltage for functional reasons but does not satisfy SELV / PELV separation criteria — does not give the same shock protection. Visual inspection identifies which is in use and confirms the source meets the criteria for the application.",
  },
  {
    question: "When does an EV charger need a Type B RCD?",
    answer:
      "Section 722 — when supplied from an RCD that does not have the 6 mA DC residual current detection inside the EVSE itself. Most modern domestic-grade EVSE units provide an integral 6 mA DC RCD, allowing upstream Type A. Three-phase EVSEs and some commercial units do not, requiring upstream Type B. Visual inspection verifies the EVSE manufacturer documentation and the installed RCD type.",
  },
  {
    question: "How is solar PV DC isolation different from AC isolation?",
    answer:
      "DC remains live whenever the array is exposed to daylight — independent of AC. Section 712 requires DC isolators to be DC-rated (AC-rated isolators can fail to break a DC arc), accessible for emergency disconnection at the inverter, and clearly labelled. AC isolation between inverter and the consumer unit is required separately. Two isolators, two labels, both essential.",
  },
  {
    question: "What is an equipotential plane (Section 705)?",
    answer:
      "An equipotential bonding network across the floor of a livestock area (typically a steel mesh embedded in concrete, bonded to the supplementary bonding network). Prevents step voltage across livestock that could cause distress / death — cattle in milking parlours can detect voltage differences as low as a few volts and react. Visual inspection in agricultural locations confirms the equipotential plane is present and bonded.",
  },
  {
    question: "Are construction site cable colours different?",
    answer:
      "Cable colours are the same as standard BS 7671 — but plug and socket colours per BS EN 60309 are specific: yellow (110 V), blue (230 V), red (400 V three-phase). Plus the 110 V CTE arrangement (centre-tapped earth, max 55 V to earth) reduces shock energy. Visual inspection confirms the correct plug/socket colour for the supply and the IP rating for site conditions.",
  },
];

export default function Sub5() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module5-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 5 · Section 2 · Subsection 5"
            title="Special locations visual checks"
            description="Visual inspection additions for Part 7 — bathrooms (701), pools (702), saunas (703), construction sites (704), agricultural (705), exhibitions (711), solar PV (712), EV charging (722) — zones, IP ratings, supplementary bonding."
            tone="emerald"
          />

          <TLDR
            points={[
              "Each Part 7 location has its own visual inspection items added to the general schedule — zones, IP ratings, bonding, isolation, equipment selection.",
              "Bathrooms (701) — Zone 0/1/2 IP requirements. Sockets prohibited in zones except BS EN 61558-2-5 shaver units.",
              "EV charging (722) — Type B RCD or Type A with integral 6 mA DC RCD, PEN-fault protection on PME supplies (O-PEN device or TT earthing for the EVSE).",
              "Solar PV (712) — DC isolator separate from AC, DC-rated, accessible, labelled. DC live during daylight regardless of AC state.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify the Part 7 special locations relevant to a given installation.",
              "Apply Section 701 bathroom zones (0, 1, 2) and confirm equipment IP rating against the zone.",
              "Confirm Section 702 swimming pool zones and SELV requirements within Zones 0 and 1.",
              "Identify Section 704 construction site requirements — 110 V CTE, IP rating, RCD additional protection.",
              "Identify Section 705 agricultural equipotential plane and supplementary bonding for livestock protection.",
              "Verify Section 712 solar PV DC isolation and labelling requirements.",
              "Verify Section 722 EV charging RCD type, dedicated circuit, isolator, and PEN-fault protection on PME.",
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>The location-specific visual additions</ContentEyebrow>

          <ConceptBlock
            title="Why Part 7 exists — general rules don't fit specialised environments"
            plainEnglish="Bathrooms get wet. Pools immerse equipment in water. Saunas hit 100°C. Construction sites have mud, rain, and impact. Livestock is more sensitive to voltage than humans. Solar PV has DC running 24/7 in daylight. EVs introduce new fault modes. Part 7 of BS 7671 adapts the general rules to each environment with location-specific requirements."
            onSite="When you arrive on a job, identify which Part 7 sections apply BEFORE you start the visual. Print the relevant zone diagrams. Add the location-specific items to your schedule. Missing a Part 7 requirement is one of the most common verification failures."
          >
            <p>The Part 7 sections you'll encounter most often:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Section 701 — Bathrooms.</strong> Zones 0/1/2, IP rating per zone, sockets
                prohibited in zones (except BS EN 61558-2-5 shavers), supplementary bonding (or
                Reg 701.415.2 omission).
              </li>
              <li>
                <strong>Section 702 — Swimming pools and fountains.</strong> Zones 0/1/2, IPX8 in
                Zone 0, SELV / PELV at low voltages, supplementary bonding network.
              </li>
              <li>
                <strong>Section 703 — Sauna heaters.</strong> Heater zones 1/2/3, equipment for
                high temperature, isolation, IP rating.
              </li>
              <li>
                <strong>Section 704 — Construction and demolition site installations.</strong>
                110 V CTE for hand tools, 30 mA RCD, IP rating, BS EN 60309 plug/socket colours.
              </li>
              <li>
                <strong>Section 705 — Agricultural and horticultural premises.</strong>
                Equipotential plane, supplementary bonding, IP rating for damp/dusty environment,
                EM compatibility considerations.
              </li>
              <li>
                <strong>Section 709 — Marinas and similar locations.</strong> Galvanic isolation,
                IP rating for berths, supply pillars, RCD requirements.
              </li>
              <li>
                <strong>Section 710 — Medical locations.</strong> Groups 0/1/2 by criticality,
                medical IT systems, 0.5 s changeover supply, equipotential bonding.
              </li>
              <li>
                <strong>Section 711 — Exhibitions, shows and stands.</strong> 30 mA RCD on all
                circuits, robust cable management in public areas, easy means of disconnection.
              </li>
              <li>
                <strong>Section 712 — Solar PV.</strong> DC and AC isolation, DC-rated equipment,
                labelling for DC live during daylight, fault protection considering DC behaviour.
              </li>
              <li>
                <strong>Section 715 — Extra-low voltage lighting installations.</strong> SELV /
                PELV source compliance, conductor selection for low-voltage / high-current loads.
              </li>
              <li>
                <strong>Section 722 — Electric vehicle charging installations.</strong> Type B
                RCD or Type A with integral 6 mA DC, PEN-fault protection on PME, dedicated
                circuit, local isolator.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 722.411.4 (TN system) and 722.411.4.1 (PME on EV charging points)"
            clause={`A PME earthing facility shall not be used as the means of earthing for the protective conductor contact of a charging point located outdoors or that might reasonably be expected to be used to charge a vehicle outdoors unless one of the following methods is used:
(a) Deleted by BS 7671:2018+A2:2022.
(b) The main earthing terminal of the installation is connected to an installation earth electrode by a protective conductor complying with Regulation 544.1.1. The resistance of the earth electrode to Earth shall be such that the maximum voltage between the main earthing terminal of the installation and Earth in the event of an open-circuit fault in the PEN conductor of the low voltage network supplying the installation does not exceed 70 V RMS.
(c) Protection against electric shock is provided by a device which electrically disconnects the vehicle from the live conductors of the supply and from protective earth in accordance with Regulation 543.3.3.101(b) within 5 s in the event of the voltage between the circuit protective conductor and Earth exceeding 70 V RMS due to an open-circuit fault in the PEN conductor of the low voltage network. The device need not operate if the voltage exceeds 70 V RMS for less than 4 s.`}
            meaning={
              <>
                The 70 V RMS / 5 s threshold is the prescriptive figure — NOT a "70 V to 250 V"
                range. On a PME supply a PEN failure can put diverted neutral current onto the
                vehicle chassis; the regulation forbids using PME as the EVSE earth unless either
                method (b) — a dedicated earth electrode sized so PEN-fault voltage stays under
                70 V RMS — or method (c) — an O-PEN protection device that disconnects within 5 s
                if the CPC-to-Earth voltage exceeds 70 V RMS — is used. Method (a) was deleted by
                A2:2022. Visual inspection confirms which method is in use and that it matches
                the design.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 7, Section 722, Regulations 722.411.4 and 722.411.4.1."
          />

          <SectionRule />

          <ContentEyebrow>Bathrooms (701) — zones in detail</ContentEyebrow>

          <ConceptBlock
            title="Zone 0, Zone 1, Zone 2 — and what is permitted in each"
            plainEnglish="Section 701 is the most common Part 7 location you'll inspect. Zone 0 is the basin itself. Zone 1 is the volume directly above. Zone 2 is the 0.6 m extension outward. Each has IP rating requirements and equipment permissions. Sockets are prohibited in all three zones (except shaver supply units)."
          >
            <p>Section 701 zone definitions and requirements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Zone 0 — interior of bath / shower basin.</strong> IPX7 minimum
                (immersion). Equipment permitted: only fixed luminaires designed for Zone 0
                (typically SELV at 12 V). No sockets, no switches.
              </li>
                <li>
                  <strong>Zone 1 — directly above Zone 0 to 2.25 m, plus the basin volume itself.</strong>
                  IPX4 minimum (splash) — IPX5 if water jets used for cleaning. Equipment
                  permitted: SELV/PELV at safe voltages; specific Zone 1 luminaires; instantaneous
                  water heaters; whirlpool units; fixed luminaires complying with Section 701.55.
                  No general sockets.
                </li>
                <li>
                  <strong>Zone 2 — horizontal extension 0.6 m from Zone 1, to 2.25 m height.</strong>
                  IPX4 minimum (IPX5 with water jets). Equipment permitted: as Zone 1 plus
                  shaver supply units to BS EN 61558-2-5. Lighting fittings, heaters, fans
                  permitted with the IP rating.
                </li>
                <li>
                  <strong>Outside Zone 2.</strong> Unzoned space within the room. General sockets
                  may be permitted (with 30 mA RCD additional protection per Reg 415.1.1)
                  provided they are not within the zone areas defined.
                </li>
              </ul>
              <p>
                Visual inspection traces the zones on site (tape measure if needed), identifies
                each piece of equipment by zone, and confirms the IP rating against the zone
                requirement. Common defects: socket installed in Zone 2 (other than shaver
                supply), light fitting with insufficient IP rating, switch within Zone 1, no
                supplementary bonding where Reg 701.415.2 conditions are not all met.
              </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>EV charging (722) and Solar PV (712) — the new locations</ContentEyebrow>

          <ConceptBlock
            title="EV charging — the PME-fault problem and the solutions"
            plainEnglish="A PME supply combines neutral and earth on the DNO side. If the PEN connection fails upstream, diverted current can put the customer's earthing system at a raised voltage. Most of the time we don't notice — but when an EV charger is involved, the vehicle chassis becomes a touchable extraneous-conductive-part. Standing on the driveway, the user could be exposed to dangerous voltage. Section 722.411.4 requires either O-PEN device or TT earthing to break this path."
          >
            <p>Section 722 visual inspection items:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Dedicated final circuit.</strong> EVSE on its own circuit, not shared
                with general loads. Confirms cable sizing for the EVSE rating (typically 32 A,
                potentially 40 A for higher-power units).
              </li>
              <li>
                <strong>RCD type matched to EVSE.</strong> Type B (handles smooth DC) OR Type A
                where the EVSE has integral 6 mA DC RCD per manufacturer documentation.
                Mismatched type = blinded protection.
              </li>
              <li>
                <strong>PEN-fault protection on PME.</strong> O-PEN device (commercially marketed
                PEN-fault detector inside or upstream of the EVSE) OR separate TT earth
                electrode for the EVSE. Visible at the install — either an O-PEN module in the
                EVSE / DB, or a separate TT electrode termination.
              </li>
              <li>
                <strong>Local isolator.</strong> Means of isolation accessible to user / engineer
                near the EVSE for safe maintenance.
              </li>
              <li>
                <strong>Cable management for the charging cable.</strong> Tethered or untethered;
                if tethered, the cable storage / protection from damage.
              </li>
              <li>
                <strong>Labels.</strong> Per Reg 514, including the EVSE rating, the supply
                origin, and any specific PEN-fault protection labels.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Solar PV — the DC stays live regardless of the AC"
            plainEnglish="Section 712 deals with the unique fact of PV: the DC array is live whenever it sees daylight. Switching off the AC at the consumer unit does NOT make the inverter input safe. DC isolation is separate, must be DC-rated (AC isolators can arc-flash on DC), and must be accessible for emergency use. Labels everywhere."
          >
            <p>Section 712 visual inspection items:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>DC isolation between array and inverter.</strong> DC-rated isolator,
                accessible for emergency use, between the PV array and the inverter input.
              </li>
              <li>
                <strong>AC isolation between inverter and consumer unit.</strong> Standard AC
                isolator at the inverter output for maintenance / fault response.
              </li>
              <li>
                <strong>Equipment selection.</strong> All DC equipment rated for DC duty (cables,
                connectors, isolators, fuses). MC4 connectors common at array level.
              </li>
              <li>
                <strong>Earthing of array frame.</strong> Per the design — typically bonded to
                the customer earthing system. Confirms continuity to MET on dead testing.
              </li>
              <li>
                <strong>Labels at every isolator and at the consumer unit.</strong>
                "DANGER — DC LIVE DURING DAYLIGHT" at DC isolators. Solar warning sign at the CU.
                Origin labels showing the EICR / commissioning date.
              </li>
              <li>
                <strong>Documentation and commissioning record.</strong> Per Section 712 and
                MCS requirements, the commissioning pack covering inverter setup, generation
                meter installation, G98 / G99 DNO notification.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 712.537.2.2.104 (Measures to prevent DC on-load interruption)"
            clause="In order to prevent arcing, every device without breaking capacity that could be used to open a DC circuit shall be secured against inadvertent or unauthorized operation. This may be achieved by locating the device in a lockable space or enclosure or by padlocking. NOTE: Examples of devices to which this requirement applies are SPD carriages and fuse carriers."
            meaning={
              <>
                On the DC side of a PV array, devices without DC breaking capacity (SPD
                carriages, fuse carriers) must not be operable on-load — opening them under
                DC current produces a sustained arc that AC-only devices cannot clear. Visual
                inspection confirms such devices are inside a lockable enclosure, padlocked,
                or otherwise secured against unauthorised operation. A bare fuse carrier or
                unlocked SPD plug-in is a recordable defect on the DC side.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 7, Section 712, Regulation 712.537.2.2.104."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <CommonMistake
            title="Missing the Part 7 additions on a 'normal' install"
            whatHappens={
              <>
                Inspector treats a domestic install as Sections 1-6 only. The property has a
                solar PV system and an EV charging point — both Part 7 locations. The Section
                712 DC isolation and Section 722 PEN-fault protection are not on the inspection
                schedule. The EIC is signed without verifying these critical safety items. A
                later PEN failure causes a vehicle-chassis voltage rise; the inspector's EIC
                becomes evidence of inadequate verification.
              </>
            }
            doInstead={
              <>
                Before starting visual inspection, identify every Part 7 location that applies.
                Print the relevant section overviews. Add the location-specific items to your
                schedule (most schemes provide branded extension sheets for common locations).
                Tick / cross / N/A / LIM each item with comments. The general schedule plus the
                Part 7 additions = complete verification.
              </>
            }
          />

          <ConceptBlock
            title="Section 705 — agricultural and the equipotential plane"
            plainEnglish="Livestock are extremely sensitive to small voltage differences. Cattle in milking parlours can detect voltage differences of a few volts and react — distress, refusal to enter, milk yield drop. Section 705 requires an equipotential plane in livestock areas (typically a steel mesh embedded in concrete, bonded to the supplementary bonding network) to prevent step / touch voltages."
            onSite="When you visit an agricultural site with livestock — milking parlour, calf housing, sheep handling pen — verify the equipotential plane. The mesh is usually buried in the concrete floor. Bonded to the supplementary bonding network. Visible at exposed connection points. Test continuity from MET to representative points across the floor. Document the network."
          >
            <p>Section 705 specific items:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Equipotential plane in livestock areas.</strong> Steel mesh in floor
                bonded to the supplementary bonding network. Required where livestock are present
                — milking parlours especially.
              </li>
              <li>
                <strong>Supplementary bonding network.</strong> Connects exposed and
                extraneous-conductive-parts at floor level (cattle stalls, drinking water bowls,
                metal partitions, equipment frames) to the equipotential plane.
              </li>
              <li>
                <strong>RCD additional protection.</strong> 30 mA RCD on socket circuits and
                lighting in livestock areas; 100 mA delayed RCD on supply to address bulk fire
                protection.
              </li>
              <li>
                <strong>IP rating for damp / dusty environments.</strong> Typically IP65 or higher
                in milking parlours, IP54 in covered areas, IP44 in dry stores. Hose-down
                resistance often required.
              </li>
              <li>
                <strong>Equipment selection.</strong> Corrosion-resistant where livestock urine /
                effluent present. Covers and enclosures rated for the environment. Electrical
                fences on a separate dedicated supply.
              </li>
              <li>
                <strong>Heat / fire risk.</strong> Hay barns and grain stores need careful cable
                management — Reg 705 references Section 422 fire risk locations.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Section 712 — solar PV verification depth"
            plainEnglish="Solar PV introduces DC into a traditionally AC installation. The DC array is live whenever sunlight hits it — even at dawn / dusk small voltages exist. Switching off AC at the consumer unit does NOT make the inverter input safe. Section 712 plus IET CoP for solar PV systems address the verification: DC and AC isolation, DC-rated equipment, labelling, fault protection considering DC behaviour."
            onSite="When you arrive at a PV installation, identify every DC isolator (typically at the inverter input — sometimes at the array roof junction box too), every AC isolator (at the inverter output and at the consumer unit). DC isolators must be DC-rated (AC isolators can fail to break a DC arc). Labels everywhere — 'DC LIVE DURING DAYLIGHT' is the standard warning."
          >
            <p>Section 712 visual inspection items:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>DC isolation between array and inverter.</strong> DC-rated isolator,
                accessible for emergency disconnection, between PV array DC output and inverter
                DC input.
              </li>
              <li>
                <strong>AC isolation between inverter and consumer unit.</strong> Standard AC
                isolator at inverter output. Often a separate isolator near the inverter and at
                the CU.
              </li>
              <li>
                <strong>String / array configuration.</strong> Number of strings, number of
                modules per string, total array V_oc, V_mp, I_sc per module data. Compared to
                inverter input rating.
              </li>
              <li>
                <strong>DC cable selection.</strong> Cable rated for DC, UV-resistant where
                exposed (typically dual-insulated solar cable), MC4 connectors at array level.
              </li>
              <li>
                <strong>Earthing of array frame.</strong> Per design — typically bonded to the
                customer earthing system. Continuity testing confirms.
              </li>
              <li>
                <strong>Labels.</strong> "DANGER — DC LIVE DURING DAYLIGHT" at DC isolators. "PV
                ARRAY ON ROOF" at the supply intake / consumer unit. MCS / commissioning details.
              </li>
              <li>
                <strong>Inverter location and ventilation.</strong> Inverters generate heat;
                installed in well-ventilated locations, not enclosed in a sealed space without
                airflow.
              </li>
              <li>
                <strong>G98 / G99 DNO notification.</strong> For grid-connected systems, the DNO
                must be notified (G98 for systems up to 16 A per phase, G99 for larger). Visual
                inspection confirms documentation in the commissioning pack.
              </li>
              <li>
                <strong>Generation meter (where applicable).</strong> Required for some Smart
                Export Guarantee tariffs and for FiT (legacy systems).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Section 722 — EV charging PEN-fault protection in detail"
            plainEnglish="A PME supply can fail upstream — the combined PEN conductor breaks. Diverted neutral current goes through the customer's earthing system. The vehicle chassis becomes a touchable extraneous-conductive-part at raised potential. Standing on the driveway touching the vehicle, the user could be exposed to fatal voltage. Section 722.411.4 has two valid solutions — O-PEN device or separate TT earth electrode for the EVSE."
            onSite="Verify the chosen PEN-fault solution. O-PEN device — look for the device in the CU or upstream of the EVSE, manufacturer literature confirms operating voltage range (typically 159-253 V detection). TT earth electrode — separate buried electrode dedicated to the EVSE, with its own earthing conductor not connected to the customer MET. Either is acceptable; verify the chosen approach."
          >
            <p>Section 722.411.4 visual verification:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Identification of supply arrangement.</strong> Confirm PME from the DNO
                declaration. If TN-S or TT, the PEN-fault concern doesn't apply (TN-S has separate
                N and PE; TT has its own earth electrode).
              </li>
              <li>
                <strong>O-PEN device verification.</strong> Manufacturer marking, BS EN reference,
                operating voltage range (typically 159-253 V — disconnects supply if PEN voltage
                rises above this). Located in CU, near EVSE, or integrated within EVSE.
              </li>
              <li>
                <strong>OR TT earth electrode for EVSE.</strong> Separate buried earth electrode
                dedicated to the EVSE, with its own earthing conductor terminating at the EVSE
                chassis (not connected to the customer MET). Test link for periodic Ra retest.
              </li>
              <li>
                <strong>RCD type.</strong> Type B (handles smooth DC) OR Type A where EVSE has
                integral 6 mA DC RCD per manufacturer documentation. Mismatched type = blinded
                protection.
              </li>
              <li>
                <strong>Dedicated final circuit.</strong> EVSE on its own circuit, not shared
                with general loads.
              </li>
              <li>
                <strong>Local isolator.</strong> Means of isolation accessible to user / engineer
                near the EVSE for safe maintenance.
              </li>
              <li>
                <strong>Cable selection.</strong> Sized for the EVSE rating (typically 32 A —
                6 mm² T+E or 4 mm² SWA depending on route). Outdoor-rated where exposed.
              </li>
              <li>
                <strong>Labels.</strong> Per Reg 514, including EVSE rating, supply origin, and
                PEN-fault protection notice.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="IP / IK ratings — what the digits mean"
            plainEnglish="IP rating describes ingress protection — first digit for solids (0-6), second digit for water (0-9). IK rating describes impact protection — IK00 (none) to IK10 (20 J impact). Visual inspection confirms equipment selected matches the location's IP / IK requirement. A swimming pool needs IPX8 in Zone 0; a car park needs IK10 against vehicle impact."
            onSite="On every accessory and enclosure, check the IP / IK marking against what the location needs. IP44 isn't enough for outdoor exposure to direct rain (need IP55+). IK02 isn't enough for a car park bollard (need IK10). Mismatches are recordable; in many cases the cause of premature equipment failure is incorrect IP / IK selection at install."
          >
            <p>IP rating digits:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>First digit (solids).</strong> 0 = none. 1 = solids over 50 mm. 2 = over
                12.5 mm. 3 = over 2.5 mm. 4 = over 1 mm. 5 = dust-protected. 6 = dust-tight.
              </li>
              <li>
                <strong>Second digit (water).</strong> 0 = none. 1 = vertical drips. 2 = drips at
                15°. 3 = spray. 4 = splash. 5 = jets. 6 = powerful jets. 7 = immersion 1 m.
                8 = continuous immersion. 9 = high-pressure / steam.
              </li>
              <li>
                <strong>Common ratings.</strong> IP20 = indoor, finger-touch protected. IP44 =
                splash resistant (Zone 2 bathroom, basic outdoor). IP55 = jet resistant (most
                outdoor). IP65 = dust-tight + jets (harsh outdoor, washdown). IP67 = immersion-
                rated. IPX8 = continuous immersion (pool Zone 0).
              </li>
            </ul>
            <p>IK rating (impact resistance):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>IK ratings.</strong> IK00 (no impact testing) to IK10 (20 J — equivalent
                of 5 kg dropped from 400 mm). IK07 (2 J) = car park bollard typical. IK10 = exposed
                / vandal-prone areas.
              </li>
              <li>
                <strong>When IK matters.</strong> Public areas, vehicle proximity, sports
                facilities, schools, anywhere with foreseeable impact. Visual inspection confirms
                IK selection matches use environment.
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="Driveway EV charger on a PME supply"
            situation={
              <>
                You are commissioning a 7 kW EV charger installed on a domestic driveway. The
                supply is PME (DNO declared). The EVSE is a Type 2 commercial unit with built-in
                Type A RCD and integral 6 mA DC RCD. The installation has no separate TT
                electrode. The contractor has fitted an O-PEN device upstream of the EVSE (in
                the consumer unit).
              </>
            }
            whatToDo={
              <>
                Visual inspection items: (1) Dedicated 32 A circuit from the CU — verify cable
                sizing (typical 6 mm² T+E or 4 mm² SWA depending on route and method). (2) RCD
                arrangement — Type A in the CU is acceptable because the EVSE has integral 6 mA
                DC RCD per manufacturer documentation. Verify the documentation. (3) PEN-fault
                protection — O-PEN device present, manufacturer literature confirms operating
                range (typically 159-253 V detection), labels in place. (4) Local isolator —
                rotary isolator next to EVSE, IP rating IP65 (outdoor exposed). (5) Earthing —
                EVSE chassis bonded to the customer earth via the CPC; no separate TT electrode
                needed because the O-PEN device provides the protection. (6) Labels — PEN-fault
                protection notice, EVSE identification at CU. All items tick on schedule.
              </>
            }
            whyItMatters={
              <>
                Section 722.411.4 has two valid solutions to the PME / EV problem — O-PEN device
                or separate TT earth electrode. The contractor chose O-PEN; the inspector
                verifies it is correctly installed and labelled. Get this wrong and the user is
                exposed to potentially fatal touch voltage on the vehicle chassis under PEN
                failure. The visual inspection is the gate.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 722.411.4.1 (PEN-fault detection on TN-C-S)"
            clause={
              <>
                Regulation 722.411.4.1 concerning the use of a PME supply has been revised. The
                exception concerning reasonably practicable has been deleted. Changes have also
                been made to requirements for external influences, RCDs, socket-outlets and
                connectors.
              </>
            }
            meaning={
              <>
                EV charging visual inspection now has to confirm one of the three accepted
                PEN-fault arrangements is in place — built-in detection in the unit, a TT
                electrode for the EV, or an upstream PEN-fault detection device. The
                &quot;not reasonably practicable&quot; exemption that some older installs
                relied on has been deleted.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 722.411.4.1."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Each Part 7 section has its own visual inspection items — bathroom zones, pool zones, agricultural equipotential plane, EV PEN-fault protection, PV DC isolation, etc.",
              "Bathrooms (Section 701) — Zones 0/1/2 with specific IP rating and equipment permissions. Sockets prohibited in zones except BS EN 61558-2-5 shaver units.",
              "EV charging (Section 722) — RCD type matched to EVSE, dedicated circuit, local isolator, and PEN-fault protection (O-PEN device OR separate TT electrode) on PME supplies per Reg 722.411.4.",
              "Solar PV (Section 712) — DC isolator separate from AC, DC-rated, accessible, labelled. DC live during daylight regardless of AC state.",
              "Construction sites (Section 704) — 110 V CTE for hand tools, BS EN 60309 plug/socket colours by voltage, IP rating for site environment, 30 mA RCD additional protection.",
              "Agricultural / horticultural (Section 705) — equipotential plane in livestock areas, supplementary bonding, livestock voltage sensitivity drives the requirement.",
              "Section 710 medical locations — Groups 0/1/2 by criticality, Group 2 needs medical IT and 0.5 s changeover supply.",
              "Visual inspection identifies every Part 7 location BEFORE starting and adds the location-specific items to the schedule. Missing additions = incomplete verification.",
            ]}
          />

          <Quiz title="Special locations visual checks — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section2-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.4 Cable installation
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 3 — Dead testing
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
