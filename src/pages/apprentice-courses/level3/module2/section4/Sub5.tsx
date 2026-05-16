/**
 * Module 2 · Section 4 · Subsection 5 — BS 7671 Section 753 heating + heat pump regulatory chain + MCS MIS 3005
 * Maps to C&G 2365-03 / Unit 301 / LO2 / AC 2.1
 *   AC 2.1 — "state the relevant Building Regulations and other statutory and non-statutory
 *             requirements for the installation and maintenance of environmental technology
 *             systems"
 * Layered: 2357 Unit 312 ELTP02 / AC 3.1 (provide information on operational requirements
 * and benefits of environmental technology systems) and 2357 Unit 602 ELTK02 / AC 3.3
 * (Local Authority Building Control requirements which apply to the installation of
 * environmental technology systems).
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

const TITLE =
  'Section 753 heating, heat pump regulatory chain and MCS MIS 3005 (4.5) | Level 3 Module 2.4.5 | Elec-Mate';
const DESCRIPTION =
  'A regulatory deep dive into electrical heating systems and heat pumps — BS 7671:2018+A4:2026 Section 753 (heating cables and embedded electric heating systems), MCS MIS 3005 for heat pump installation competence, the Building Regs Part L chain, F-Gas Regulations for refrigerant work, and the documentation chain on a typical air-source heat pump install.';

const checks = [
  {
    id: 'l3-m2-s4-sub5-section-753-rcd',
    question:
      "An electrician has fitted underfloor heating on a domestic kitchen extension. They have used a 100 mA RCD on the supply because there is a long cable run with potential standing leakage. Section 753 — accept or reject?",
    options: [
      "Accept — 100 mA is fine for any heating circuit.",
      "Reject. All underfloor heating installations shall have additional protection by an RCD rated at 30 mA. Section 753 also requires that where a resistive fault may cause a fire (for example for overhead heating with heating film elements) the rated residual operating current shall not exceed 30 mA. The 100 mA RCD does not meet either requirement. The installer needs to fit a 30 mA RCD and address the standing leakage at source — typically by sectioning the heating into shorter zones or selecting Class II construction with the relevant Section 753 protective measure.",
      "Accept if the RCD is Type B.",
      "Accept if the heating is over 5 kW.",
    ],
    correctIndex: 1,
    explanation:
      "Section 753 is explicit on RCD ratings for electrical heating. The 30 mA limit is a fire-prevention requirement for resistive faults in heating elements, not just the conventional shock-protection limit. Standing leakage on long heating runs is a real installation challenge, but the answer is to design around it (sectioning, lower-leakage heating mat, Class II construction with appropriate Section 753 routes) rather than to relax the RCD rating. The acceptance rules are direct — 30 mA for underfloor heating, 30 mA where resistive faults could cause fire.",
  },
  {
    id: 'l3-m2-s4-sub5-floor-temperature',
    question:
      "Section 753 requires the maximum temperature of a heated floor to be limited where contact by skin or footwear is possible. What temperature limit applies and how is it achieved?",
    options: [
      "60 degrees Celsius limited by the customer turning the thermostat down.",
      "Where floor or ceiling heating units are installed, at least one of the measures listed in 753.424.201(a) to (c) shall be implemented to ensure the maximum temperature does not exceed 80 degrees Celsius. The measures include thermostatic limitation, embedded sensor temperature cut-out, or design-time limitation through the heating element's intrinsic characteristics. Reg 753.423 requires this where contact with skin or footwear is possible — the obligation is not limited to barefoot contact.",
      "100 degrees Celsius regardless of contact.",
      "There is no temperature limit in Section 753.",
    ],
    correctIndex: 1,
    explanation:
      "Section 753 sets a hard 80 degrees Celsius limit on floor and ceiling heated surfaces where contact is possible, with at least one of the three permitted measures actively implemented. The acceptance rules are explicit — the 80 degrees Celsius cap is mandatory where heating units are installed, and skin or footwear contact triggers Reg 753.423. The customer turning the thermostat down is not an acceptance route — the limit must be designed into the install.",
  },
  {
    id: 'l3-m2-s4-sub5-fgas',
    question:
      "An apprentice electrician on a heat pump install is asked to top up the refrigerant on the unit's external pipework because the manufacturer commissioning report shows a slight charge loss. The apprentice holds an L3 electrical qualification but no F-Gas certification. Should they do the refrigerant work?",
    options: [
      "Yes — refrigerant work is just plumbing.",
      "No. The F-Gas Regulations require any work on a sealed refrigerant circuit (charging, recovery, leak testing, brazing into the circuit) to be carried out by an F-Gas-certified person. Refrigerant work also requires the company holding the refrigerant to hold a company F-Gas certificate. The L3 electrical scope is the supply, isolation, controls, smart integration and external bonding. The trade boundary is firm — the electrician calls in an F-Gas-certified engineer for any refrigerant work, and the warranty on the heat pump remains valid.",
      "Yes — but only if the customer signs a waiver.",
      "Yes — under any UK qualification.",
    ],
    correctIndex: 1,
    explanation:
      "The F-Gas Regulations (the EU regulation retained in UK law plus the UK Fluorinated Greenhouse Gases Regulations 2015) place strict competence requirements on anyone handling refrigerants. The reasoning is environmental (refrigerants are potent greenhouse gases — R-410A has GWP around 2088, R-32 around 675) and safety (refrigerant-circuit work involves pressurised fluids and brazing into pressure systems). The L3 electrician on a heat pump install does the electrical work and the F-Gas-certified engineer does the refrigerant work. Crossing the boundary breaches the regulations and voids the warranty. R-290 (propane) heat pumps add ATEX and flammable-refrigerant handling rules on top.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What is the scope of BS 7671:2018+A4:2026 Section 753, and what kinds of heating system fall within it?",
    options: [
      "Only underfloor heating in new build.",
      "Section 753 covers heating cables and embedded electric heating systems — including underfloor heating, ceiling heating, wall heating, surface heating, trace heating, and the supply-side electrical work for heat pumps where the heating element forms part of the system. Provisions cover protection against electric shock (ADS, additional RCD protection at 30 mA for various configurations), surface temperature limitation (753.423 / 753.424.201 — 80 degrees Celsius cap), heating-free areas (753.522), heat-resistant cabling (753.522.1.3), and equipotential bonding interactions in special locations (702.55 floor heating in pool areas).",
      "Only ceiling heating in commercial premises.",
      "Only trace heating on industrial pipework.",
    ],
    correctAnswer: 1,
    explanation:
      "Section 753 is the BS 7671 home for the electrical install of all embedded heating systems. The underlying rationale is that embedded heating elements are inaccessible after install — they are buried in screed, plaster or roofing — so the electrical safety regime must be set up correctly at install and verified by test before the heating element disappears under the finish. RCD requirements, surface temperature caps and bonding interactions are all in scope. A4:2026 retains and refines the Section 753 provisions extensively.",
  },
  {
    id: 2,
    question:
      "What does Section 753 require for additional RCD protection on circuits supplying heating units?",
    options: [
      "300 mA RCD on every circuit.",
      "Circuits supplying heating units shall have additional protection by the use of RCDs in accordance with the characteristics specified in Regulation 415.1.1. Where a resistive fault may cause a fire, for example for overhead heating with heating film elements, the rated residual operating current shall not exceed 30 mA. All underfloor heating installations shall have additional protection by an RCD rated at 30 mA irrespective of location. In areas where occupants are not expected to be completely wet, a circuit supplying heating equipment of Class II construction (or equivalent insulation) shall be provided with additional protection by the use of an RCD with a rated residual operating current not exceeding 30 mA.",
      "30 mA RCD only on circuits over 16 A.",
      "No RCD requirement for embedded heating.",
    ],
    correctAnswer: 1,
    explanation:
      "The Section 753 RCD regime is layered. The base requirement is additional RCD protection per Reg 415.1.1. The fire-prevention overlay drops the rated residual operating current to at most 30 mA where a resistive fault could cause fire (for example overhead heating with heating film). The underfloor heating overlay applies a blanket 30 mA limit across all underfloor heating installations. Class II construction circuits in not-completely-wet areas also get the 30 mA limit. Section 753 captures all four rules.",
  },
  {
    id: 3,
    question:
      "What does Section 753 require for the maximum surface temperature of heated floors and ceilings, and how is the requirement evidenced?",
    options: [
      "There is no temperature limit.",
      "Where floor or ceiling heating units are installed, at least one of the measures listed in 753.424.201(a) to (c) shall be implemented to ensure the maximum temperature does not exceed 80 degrees Celsius. Reg 753.423 applies the surface temperature limit where contact with skin or footwear is possible — the obligation broadens application to include footwear contact, not only barefoot. Acceptance is by the documented presence of one of the three measures (thermostatic limit, embedded sensor cut-out, intrinsic element limitation) and by the commissioning record showing the installed cut-out responds at or below the design temperature.",
      "120 degrees Celsius is the limit.",
      "The customer chooses the limit.",
    ],
    correctAnswer: 1,
    explanation:
      "The 80 degrees Celsius cap is set by Reg 753.424.201 with at least one of the three measures actively implemented. Reg 753.423 widens the contact trigger from barefoot to include footwear contact — the regulator recognised that a heated floor at 90 degrees can burn through a thin shoe sole. The acceptance rules are explicit on both points.",
  },
  {
    id: 4,
    question:
      "Why does the L3 electrician's scope on a heat pump install stop at the refrigerant circuit, and what regulation enforces the boundary?",
    options: [
      "It does not stop — electricians can do refrigerant work.",
      "The F-Gas Regulations (the EU Fluorinated Greenhouse Gases Regulation retained in UK law plus the UK Fluorinated Greenhouse Gases Regulations 2015) require any work on a sealed refrigerant circuit (charging, recovery, leak testing, brazing into the circuit) to be carried out by an F-Gas-certified person. Companies handling F-Gas refrigerants must hold a company F-Gas certificate. The L3 electrician's scope is the electrical supply, isolation, controls, smart integration and external bonding. The trade boundary is firm — the electrician calls in an F-Gas-certified engineer for any refrigerant work.",
      "The Building Regs forbid electricians from working on heating systems.",
      "MCS rules restrict electricians to lighting work.",
    ],
    correctAnswer: 1,
    explanation:
      "The F-Gas Regulations are environmental safety legislation — refrigerants are potent greenhouse gases (R-410A GWP around 2088, R-32 around 675) and uncontrolled release contributes substantially to climate impact. F-Gas certification ensures the engineer working the circuit knows how to recover, charge and leak-test without releasing refrigerant. Crossing the boundary breaches the regulations and voids the equipment warranty. R-290 (propane) heat pumps add ATEX and flammable-refrigerant handling rules. The L3 electrician's scope on a heat pump install is the electrical side, full stop.",
  },
  {
    id: 5,
    question:
      "What does MCS MIS 3005 govern in the context of heat pump installation in the UK?",
    options: [
      "It governs the colour of the outdoor unit casing.",
      "MCS MIS 3005 is the Microgeneration Certification Scheme installer standard for heat pump systems — covering air-source, ground-source and water-source heat pumps. It sets competence requirements for the installing firm (design competence, installation competence, commissioning competence), defines the heat-loss calculation methodology, sets the SCOP estimation requirement, and defines the customer documentation pack. MCS MIS 3005 sits alongside BS 7671 (electrical install standard) and the F-Gas Regulations (refrigerant competence). The customer needs the MCS certificate to access the Boiler Upgrade Scheme grant and the heat pump SEG-equivalent payment routes.",
      "It governs heat pumps over 100 kW only.",
      "It is a voluntary marketing scheme with no funding link.",
    ],
    correctAnswer: 1,
    explanation:
      "MCS MIS 3005 is the competence and quality scheme for heat pump installation. The Boiler Upgrade Scheme (the current government grant for domestic heat pumps in England and Wales, with equivalent regimes elsewhere) requires the install to be by an MCS-certified firm. The MCS certificate also unlocks the customer documentation that consumer protection bodies and finance providers expect. Without MCS, the install is technically possible but excludes the customer from grant funding and most warranty / finance routes.",
  },
  {
    id: 6,
    question:
      "What does Section 753 require for cold leads and control leads installed in the zone of heated surfaces?",
    options: [
      "No special requirement — standard cable is fine.",
      "Reg 753.522.1.3 requires that for cold leads (circuit wiring) and control leads installed in the zone of heated surfaces, the increase of ambient temperature shall be taken into account. This means conductor current-carrying capacity, derating, insulation temperature ratings and routing shall be adjusted to reflect the higher ambient temperature where the lead is installed in the heated surface zone.",
      "Aluminium cable only.",
      "Cables must be removed before commissioning.",
    ],
    correctAnswer: 1,
    explanation:
      "Reg 753.522.1.3 closes a real-world failure mode — cold-lead cables and control wiring run within the heated zone of the floor or ceiling experience higher ambient temperature than the rest of the install, and standard 70 degrees Celsius cable can degrade prematurely. The fix is in design — derate the cable, select higher-temperature insulation, and route the lead to minimise time in the heated zone. The acceptance rule is direct — the increased ambient must be taken into account.",
  },
  {
    id: 7,
    question:
      "What is the role of Building Regulations Part L in the heat pump install regulatory chain, and how does it interact with MCS?",
    options: [
      "Part L is irrelevant to heat pumps.",
      "Building Regulations Part L (Conservation of Fuel and Power) applies to new build, extensions and major renovations. Heat pump installs in those contexts must demonstrate compliance with the relevant Part L primary energy and carbon emissions targets, typically through SAP (Standard Assessment Procedure) for dwellings. The Future Homes Standard expected to bring fossil-fuel boilers off new-build from 2025 elevates heat pumps to the default route for new-build. MCS MIS 3005 sits alongside Part L — MCS proves the installer is competent, Part L sets the building energy targets, and the SAP calculation that informs Part L compliance uses MCS-style heat-loss and SCOP methodology.",
      "Part L only applies to commercial property.",
      "Part L exempts heat pump installs from any energy reporting.",
    ],
    correctAnswer: 1,
    explanation:
      "Part L is the building energy efficiency arm of the Building Regulations and it is the construction-side enforcement mechanism for the Climate Change Act 2008 net-zero target. Heat pumps are increasingly the default heating route for compliant new-build because they push the SAP carbon and primary energy numbers in the right direction. MCS provides the competence layer the SAP calculation depends on. Local Authority Building Control covers the notification chain — Part L compliance evidence goes via the registered Competent Persons Scheme or directly to Building Control depending on the route.",
  },
  {
    id: 8,
    question:
      "An apprentice on a Section 753 install proposes to omit the embedded mesh metal grid required by Reg 753.411.3.2 because the heating unit is Class II. Is this acceptable?",
    options: [
      "Yes — Class II equipment is exempt from all bonding requirements.",
      "Conditionally yes — but only after the installer verifies and documents that the heating unit complies with Regulation 412.2.1.1 (Class II equipment type-tested and marked). Only when compliance with 412.2.1.1 is demonstrated may the mesh specified in Reg 753.411.3.2 be omitted. Verbal assurance is not acceptance — the documentary evidence of 412.2.1.1 conformity must be in the install file.",
      "No — Class II is never enough.",
      "Yes — Class II equipment is always exempt without checks.",
    ],
    correctAnswer: 1,
    explanation:
      "The mesh-omission route is conditional on documented Class II compliance per Reg 412.2.1.1. The acceptance rule is direct — verify and document before omitting the mesh. Class II equipment must be type-tested and marked to the relevant standards, and the install file must contain the evidence. A verifier confronted with a missing mesh and no Class II evidence shall record non-compliance.",
  },
];

const faqs = [
  {
    question: "Section 753 covers heat-pump electrical work — but where exactly does the electrician's scope end and the F-Gas-certified engineer's begin?",
    answer:
      "The electrician's scope is everything outside the sealed refrigerant circuit. That includes the supply (sized per the heat pump nameplate, typically 32 A or 40 A for a domestic unit), the means of isolation (outdoor accessible isolator), the protective devices (Type C MCB or RCBO depending on inrush characteristics, RCD per Section 753 requirements), the controls wiring (thermostat, weather compensation, smart integration), the bonding (chassis bonding where the outdoor unit is an extraneous-conductive-part, or where the design pack requires it), and the indoor wiring for any electric-resistance backup heater. The F-Gas-certified engineer does the refrigerant pipework, charging, leak testing and any brazing into the circuit. The boundary is firm — electricians touch the electrical, F-Gas engineers touch the refrigerant, and on commissioning the two trades hand over to each other on a documented checklist.",
  },
  {
    question: "Why is the underfloor heating RCD requirement 30 mA blanket — even outside bathrooms?",
    answer:
      "The 30 mA limit on underfloor heating is a fire-prevention requirement, not just a shock-protection requirement. Embedded heating elements live for the building's life under screed or tile, and a small resistive insulation fault that develops over the years can heat up enough to ignite floor coverings, particularly where a slow-developing fault sits below combustible material. The 30 mA RCD trips before the fault energy is enough to ignite. Section 753 captures this rule explicitly across all underfloor heating installations — not only in bathrooms or other special locations.",
  },
  {
    question: "On a Section 753 inspection, what evidence do I need to accept the 80 degrees Celsius surface temperature limit?",
    answer:
      "Reg 753.424.201 requires at least one of three measures actively implemented — (a) thermostatic limitation, (b) embedded sensor temperature cut-out, or (c) intrinsic element limitation by design. Acceptance evidence is the design pack documenting which measure is in use, the commissioning record showing the installed cut-out or thermostat responds at or below 80 degrees Celsius (functionally tested during commissioning), and the manufacturer documentation for the limiting device. The 80 degrees Celsius cap is hard — Reg 753.423 broadens the contact trigger to include footwear, so the cap applies in any room where someone will walk on the floor, not only in barefoot zones.",
  },
  {
    question: "Where do MCS MIS 3005, BS 7671 Section 753, the F-Gas Regulations and Building Regs Part L sit relative to each other on a typical heat pump install?",
    answer:
      "Four overlapping regimes. MCS MIS 3005 proves the installer firm is competent, sets the heat-loss methodology, requires the SCOP estimate, and unlocks the Boiler Upgrade Scheme grant for the customer. BS 7671 Section 753 sets the electrical installation standard for the supply and any electric-resistance backup heating. The F-Gas Regulations require any refrigerant work to be by an F-Gas-certified engineer. Building Regs Part L (in new build, extension or major renovation contexts) sets the building-level energy efficiency target through SAP. The four regimes interlock — you cannot complete a typical Boiler Upgrade Scheme heat pump install without all four. The L3 electrician applies Section 753 on site under the supervision of the firm's qualified person, with the F-Gas engineer covering the refrigerant work and the MCS process running in the background.",
  },
  {
    question: "Are there any specific Section 753 implications when the heat pump's outdoor unit shares a special location like a swimming pool surround?",
    answer:
      "Yes. Reg 702.55.4 covers floor heating units in pool areas with three permitted compliance options — option (a) protection by SELV with the source outside zones 0, 1 and 2; option (b) embedded unit with earthed metallic sheath connected to supplementary protective equipotential bonding plus additional RCD protection per Reg 415.1.1; option (c) embedded unit covered by an embedded earthed metallic grid plus the same bonding and RCD overlay. The Reg 702 special-location rules layer on top of Section 753, and Reg 702.55.4 captures all three options. On a heat pump install where the outdoor unit sits in or adjacent to a pool zone, the same special-location overlay applies to the unit's bonding.",
  },
  {
    question: "Why do Section 753 and Reg 753.412 specifically allow double or reinforced insulation as an alternative protective measure where ADS is impractical?",
    answer:
      "Reg 753.412 allows double or reinforced insulation as the protective measure in special locations where other protective measures (such as earthing and ADS) are impractical or inappropriate, subject to the requirements of the regulation and any relevant subsidiary clauses in Part 7. The reasoning is practical — embedded heating elements that already form part of a Class II equipment design (with type-test evidence per Reg 412.2.1.1) deliver shock protection without needing the mesh metal grid required by the alternative route in Reg 753.411.3.2. The mesh omission is conditional on documented Class II evidence — the install file must contain the type-test or declaration of conformity. The acceptance rule is direct on the verification requirement.",
  },
];

export default function Sub5() {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module2-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 2 · Section 4 · Subsection 5"
            title="Section 753 heating, heat pump regulatory chain and MCS MIS 3005"
            description="BS 7671:2018+A4:2026 Section 753 governs heating cables and embedded electric heating systems — RCD overlays, surface temperature limits, cold-lead derate, bonding interactions. Heat pump installs add MCS MIS 3005 (installer competence), F-Gas Regulations (refrigerant scope) and Building Regs Part L (building energy efficiency) to the regulatory stack."
            tone="emerald"
          />

          <TLDR
            points={[
              "BS 7671:2018+A4:2026 Section 753 covers heating cables and embedded electric heating systems — including underfloor, ceiling, wall, surface, trace heating and the supply-side electrical work for heat pumps.",
              "All underfloor heating installations require additional protection by an RCD rated at 30 mA. Where resistive faults could cause fire (overhead heating with heating film) the same 30 mA limit applies. Class II circuits in not-completely-wet areas also get the 30 mA limit.",
              "Reg 753.424.201 caps heated floor and ceiling surface temperatures at 80 degrees Celsius, with at least one of three permitted measures actively implemented. Reg 753.423 widens the contact trigger to include footwear contact.",
              "The L3 electrician's scope on a heat pump install is the electrical side. F-Gas Regulations require any refrigerant work to be by an F-Gas-certified engineer. MCS MIS 3005 covers installer competence and unlocks the Boiler Upgrade Scheme grant.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "State the relevant Building Regulations and other statutory and non-statutory requirements for the installation and maintenance of environmental technology systems (2365-03 Unit 301 / AC 2.1) — specifically BS 7671 Section 753, MCS MIS 3005, the F-Gas Regulations and Building Regs Part L for heat pumps.",
              "Provide information on the operational requirements and benefits of environmental technology systems (2357 Unit 312 ELTP02 / AC 3.1) — applied to embedded electrical heating and air-source heat pumps in the UK regulatory context.",
              "State the Local Authority Building Control requirements which apply to the installation of environmental technology systems (2357 Unit 602 ELTK02 / AC 3.3) — including the Part P (England and Wales) and Part L notification chains for heating installs.",
              "Apply the Section 753 RCD overlay rules — 30 mA for all underfloor heating, 30 mA where resistive faults could cause fire, 30 mA for Class II circuits in not-completely-wet areas, and the underlying additional protection requirement per Reg 415.1.1.",
              "Apply the surface-temperature cap of 80 degrees Celsius from Reg 753.424.201 with at least one of the three permitted measures actively implemented and documented.",
              "Recognise the trade boundary between L3 electrical scope and F-Gas-certified refrigerant scope on a heat pump install and document the handover correctly.",
              "Distinguish the four regulatory regimes that interlock on a typical Boiler Upgrade Scheme heat pump install — MCS MIS 3005, BS 7671 Section 753, F-Gas Regulations, Building Regs Part L.",
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>Section 753 — scope and the heating system family</ContentEyebrow>

          <ConceptBlock
            title="Section 753 covers heating cables and embedded electric heating systems"
            plainEnglish="BS 7671:2018+A4:2026 Section 753 is the electrical installation standard for heating cables and embedded electric heating systems. The scope covers underfloor heating, ceiling heating, wall heating, surface heating, trace heating on pipework, and the supply-side electrical work for heat pumps where the heating element forms part of the system. The unifying engineering theme is that the heating element is embedded — buried in screed, plaster or roofing — and inaccessible after install. The electrical safety regime must be set up correctly at install and verified by test before the heating element disappears under the finish."
            onSite="On site you treat Section 753 as additive to the general parts of BS 7671 — Parts 1 to 6 still apply, Section 753 layers heating-specific requirements on top. The embedded nature of the element drives most of the special requirements — RCD overlays at 30 mA for fire prevention, surface temperature caps because the element is in physical contact with finishes that people walk on, mesh metal grids for fault containment, cold-lead derate because cables in the heated zone see higher ambient than the rest of the install, and bonding interactions where heating runs into special locations like bathrooms and pool zones."
          >
            <p>
              The Section 753 clauses you are most likely to meet on site:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>753.411</strong> — ADS provision requirements, with selection of
                protective devices coordinated with earthing arrangements (TN-S, TN-C-S,
                TT). Subject to other BS 7671 disconnection time rules and special-location
                characteristics.
              </li>
              <li>
                <strong>753.411.3.2</strong> — embedded mesh metal grid requirement;
                conditional omission permitted only where Reg 412.2.1.1 Class II compliance
                is demonstrated and documented.
              </li>
              <li>
                <strong>753.412</strong> — protective measure of double or reinforced
                insulation in special locations where ADS is impractical.
              </li>
              <li>
                <strong>753.412.1.201</strong> — wall, floor and ceiling heating system
                provisions and prohibitions.
              </li>
              <li>
                <strong>753.413</strong> — wall heating system prohibition on electrical
                separation as a protective measure (general; applies regardless of subtype).
              </li>
              <li>
                <strong>753.415.1</strong> — additional protection by RCDs on circuits
                supplying heating units, per Reg 415.1.1 characteristics.
              </li>
              <li>
                <strong>753.423</strong> — surface-temperature contact trigger including
                footwear contact, not only barefoot.
              </li>
              <li>
                <strong>753.424.201</strong> — 80 degrees Celsius cap on heated floor and
                ceiling surfaces, with at least one of three permitted measures.
              </li>
              <li>
                <strong>753.522.1.3</strong> — increase of ambient temperature for cold
                leads and control leads installed in the zone of heated surfaces.
              </li>
              <li>
                <strong>753.522.4.3 / 753.522.6.201</strong> — heating-free areas and their
                identification.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 753.415.1 (additional RCD protection on heating-unit circuits)"
            clause={
              <>
                &quot;Circuits supplying heating units shall have additional protection by the use of RCDs having the characteristics specified in Regulation 415.1.1. Time delayed type RCDs shall not be used.&quot;
              </>
            }
            meaning={
              <>
                The base requirement is additional RCD protection per Reg 415.1.1 on every
                circuit supplying a heating unit. The specific 30 mA limits in other
                Section 753 clauses (underfloor heating, fire-prevention for resistive
                faults, Class II circuits in not-completely-wet areas) are overlays on top
                of this base requirement, not alternatives to it. A verifier confronted
                with a heating circuit lacking RCD protection at all shall record
                non-compliance under Reg 753.415.1.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Reg 753.415.1 — IET Wiring Regulations 18th Edition A4:2026."
          />

          <SectionRule />

          <ContentEyebrow>The 30 mA RCD overlay — three triggers</ContentEyebrow>

          <ConceptBlock
            title="Three Section 753 rules that drop the RCD limit to 30 mA"
            plainEnglish="Section 753 layers specific 30 mA RCD requirements on top of the base additional protection rule. The first applies to all underfloor heating installations — every underfloor heating circuit shall have an RCD rated at 30 mA, irrespective of location (so not only in bathrooms). The second applies where a resistive fault may cause a fire — for example overhead heating with heating film elements — where the rated residual operating current shall not exceed 30 mA. The third applies in areas where occupants are not expected to be completely wet but a circuit supplies heating equipment of Class II construction (or equivalent insulation) — that circuit also gets the 30 mA limit."
            onSite="The three rules can apply individually or in combination. A typical domestic underfloor heating installation in a kitchen extension hits the underfloor rule (rule 1) and likely the Class II rule (rule 3) if the heating mat is Class II. An overhead radiant film heater in a workshop hits the resistive-fault fire-prevention rule (rule 2). On site the answer is to size the RCD at 30 mA for every heating circuit and design around standing leakage by sectioning the heating into shorter zones, selecting lower-leakage product, or coordinating with the manufacturer's installation guide on RCD selection."
          >
            <p>
              Why the 30 mA limit applies to every underfloor heating, not only in
              bathrooms:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Embedded for life</strong> — the heating element lives under screed
                or tile for the building's life. A small insulation fault can develop
                slowly over years and is invisible until it fails.
              </li>
              <li>
                <strong>Combustible-finish proximity</strong> — many floor finishes (timber,
                laminate, vinyl, carpet) are combustible. A resistive insulation fault that
                heats up locally can ignite the finish.
              </li>
              <li>
                <strong>30 mA trips before ignition</strong> — the RCD trip time at 30 mA
                is fast enough that the fault energy released is well below the ignition
                threshold for typical floor finishes.
              </li>
              <li>
                <strong>Standing leakage challenge</strong> — long heating runs can show
                standing leakage that nuisance-trips a 30 mA RCD. The answer is design,
                not relaxing the RCD rating — section the heating into shorter zones, use
                lower-leakage product, or use Class II construction with the appropriate
                Section 753 route.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 753 underfloor heating RCD requirement (paraphrased)"
            clause={
              <>
                &quot;All underfloor heating installations shall have additional protection
                by an RCD rated at 30 mA. This requirement applies irrespective of location
                (including but not limited to bathrooms) according to the On-Site Guide
                clause.&quot;
              </>
            }
            meaning={
              <>
                The 30 mA limit on underfloor heating is a fire-prevention requirement, not
                only a shock-protection requirement. Embedded heating elements live for the
                building's life under screed or tile, and a small resistive insulation
                fault that develops over the years can heat up enough to ignite floor
                coverings. The 30 mA RCD trips before the fault energy is enough to ignite.
                Section 753 captures this rule explicitly across all underfloor heating
                installations — not only in special locations.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Section 753 and IET On-Site Guide — IET Wiring Regulations 18th Edition A4:2026."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 753 fire-prevention 30 mA limit (paraphrased)"
            clause={
              <>
                &quot;Where a resistive fault may cause a fire, for example for overhead
                heating with heating film elements, the rated residual operating current
                shall not exceed 30 mA. In such cases the generic 300 mA cap is superseded
                by the 30 mA limit to reduce risk of fire caused by resistive insulation
                faults.&quot;
              </>
            }
            meaning={
              <>
                The fire-prevention 30 mA limit is layered on top of the standard
                additional-protection requirement. It catches scenarios — overhead radiant
                film heaters, embedded heating mats below combustible coverings, trace
                heating on insulated pipework — where a slow resistive fault could heat the
                element above the ignition threshold of nearby material. The 30 mA RCD
                operates faster than the ignition timescale and prevents the fire from
                starting.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Section 753 — IET Wiring Regulations 18th Edition A4:2026."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Surface temperature limits — the 80 degrees Celsius cap</ContentEyebrow>

          <ConceptBlock
            title="Reg 753.424.201 caps heated floor and ceiling surfaces at 80 degrees Celsius"
            plainEnglish="A heated floor or ceiling sits in physical contact with people who walk on it or stand under it. Section 753 sets a hard surface-temperature cap to keep that contact safe. Reg 753.424.201 requires that where floor or ceiling heating units are installed, at least one of the measures listed in 753.424.201(a) to (c) shall be implemented to ensure the maximum temperature does not exceed 80 degrees Celsius. Reg 753.423 widens the contact trigger to include footwear contact — the regulator recognised that a floor at 90 degrees can burn through a thin shoe sole."
            onSite="The three permitted measures are (a) thermostatic limitation (a thermostat that opens the supply when surface temperature reaches the design limit), (b) embedded sensor temperature cut-out (a temperature-sensing element embedded in the heated zone that opens the supply at the limit), and (c) intrinsic element limitation (the heating element is designed so its physics limits its surface temperature regardless of supply conditions, for example self-regulating cable). At least one of the three shall be implemented and acceptance evidence is the design pack documenting which measure is in use plus the commissioning record showing functional testing."
          >
            <p>
              Practical points the L3 electrician needs to recognise:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Thermostat is not enough on its own</strong> — a room thermostat
                that controls the heating to maintain a comfortable air temperature does
                not satisfy Reg 753.424.201. The cap is on surface temperature, not air
                temperature. A separate floor-temperature limit thermostat or embedded
                sensor is the typical compliant arrangement.
              </li>
              <li>
                <strong>Functional test on commissioning</strong> — verify the limit
                actually responds. Most embedded sensors include a self-test routine. Where
                the manufacturer commissioning guide includes a high-temperature simulation
                test, run it and record the pass.
              </li>
              <li>
                <strong>Footwear contact widens the room scope</strong> — Reg 753.423 makes
                the cap apply wherever someone could walk on the floor in shoes. That
                covers most rooms in a typical install, not only bare-foot zones.
              </li>
              <li>
                <strong>Heating-free areas are separately required</strong> — Reg 753.522.4.3
                / 753.522.6.201 require heating-free areas where furniture or fixtures could
                trap heat (under built-in cupboards, under fixed kitchen units). Identify
                and mark them at design stage.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 753.424.201 (surface temperature cap, paraphrased)"
            clause={
              <>
                &quot;Where floor or ceiling heating units are installed, at least one of the
                measures listed in 753.424.201(a) to (c) shall be implemented to ensure the
                maximum temperature does not exceed 80 degrees Celsius. This is a proactive
                requirement tied to the presence of heating units.&quot;
              </>
            }
            meaning={
              <>
                The 80 degrees Celsius cap is a hard limit on the heated surface
                temperature, not on air temperature. At least one of the three permitted
                measures (thermostatic limitation, embedded sensor cut-out, intrinsic
                element limitation) shall be actively implemented and documented. Reg
                753.423 widens the contact trigger to include footwear, so the cap applies
                wherever someone could walk on the floor in shoes. Verbal assurance is not
                acceptance — the design pack and the commissioning record together evidence
                the chosen measure.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Reg 753.424.201 — IET Wiring Regulations 18th Edition A4:2026."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Heat pumps — four interlocking regulatory regimes</ContentEyebrow>

          <ConceptBlock
            title="MCS MIS 3005, BS 7671 Section 753, F-Gas Regulations, Building Regs Part L"
            plainEnglish="A typical Boiler Upgrade Scheme heat pump install in the UK sits inside four overlapping regulatory regimes. MCS MIS 3005 is the installer competence standard for heat pump systems (air-source, ground-source, water-source) — design competence, installation competence, commissioning competence, customer documentation. BS 7671 Section 753 sets the electrical installation standard for the supply and any electric-resistance backup heater. The F-Gas Regulations cover the refrigerant work — anyone working on the sealed refrigerant circuit must be F-Gas-certified, and the company must hold a company F-Gas certificate. Building Regs Part L applies in new build, extension or major renovation contexts and sets the building energy efficiency target through SAP."
            onSite="The four regimes interlock — you cannot complete a typical Boiler Upgrade Scheme heat pump install without all four touching the work. The L3 electrician applies Section 753 on site under the supervision of the firm's qualified person. The F-Gas-certified engineer handles the refrigerant work. The MCS process runs in the background — heat-loss survey, system design, SCOP calculation, customer documentation. Building Control covers the notification chain via the firm's registered Competent Persons Scheme."
          >
            <p>
              The trade boundary between L3 electrical scope and F-Gas-certified scope on a
              heat pump install:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>L3 electrical scope</strong> — supply (sized per nameplate, typically
                32 A or 40 A on a Type C MCB or RCBO for a domestic unit), means of
                isolation (outdoor accessible isolator), protective devices (per Section
                753 RCD requirements), controls wiring (thermostat, weather compensation,
                smart integration), bonding (chassis bonding where the outdoor unit is an
                extraneous-conductive-part or where the design pack requires it), indoor
                wiring for any electric-resistance backup heater.
              </li>
              <li>
                <strong>F-Gas-certified scope</strong> — refrigerant pipework, charging,
                recovery, leak testing, brazing into the sealed refrigerant circuit. ATEX
                and flammable-refrigerant handling for R-290 (propane) units.
              </li>
              <li>
                <strong>Shared scope on commissioning</strong> — the documented handover
                checklist that confirms electrical commissioning is complete (test results,
                RCD trip times, polarity, Zs) before refrigerant commissioning starts, and
                that refrigerant commissioning is complete (charge correct, no leaks,
                pressure stable) before the unit is energised in normal operation.
              </li>
              <li>
                <strong>MCS process scope</strong> — heat-loss calculation per the MCS
                methodology, system design (capacity, emitter sizing, flow temperatures),
                SCOP calculation, customer documentation pack.
              </li>
              <li>
                <strong>Building Regs / Building Control scope</strong> — Part L energy
                efficiency target compliance via SAP (in new build, extension or major
                renovation contexts). Part P notification of the electrical work in
                England and Wales via the firm's Competent Persons Scheme.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="MCS MIS 3005 — what it requires of the installing firm"
            plainEnglish="MCS MIS 3005 is the Microgeneration Certification Scheme installer standard for heat pump systems. It sets competence requirements for the installing firm, defines the heat-loss calculation methodology (room-by-room with documented inputs), sets the SCOP estimation requirement (so customers know what to expect on running costs), defines the customer documentation pack, and runs the audit regime that keeps installers in the scheme. MCS-certified installation is a precondition for the Boiler Upgrade Scheme grant in England and Wales (and equivalent regimes elsewhere)."
            onSite="As an L3 apprentice working for an MCS-certified firm you operate within the MIS 3005 process — pre-install survey, design pack, install, commissioning, documentation. The firm's internal quality assurance system audits a sample of installs against MIS 3005, and the MCS audit body audits the firm. Working outside MCS is technically possible but excludes the customer from the Boiler Upgrade Scheme grant, most warranty schemes, and many finance routes — so it is rare on domestic work."
          >
            <p>
              The documentation chain on a typical MCS-certified heat pump install:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Heat-loss survey</strong> — room-by-room calculation per the MCS
                methodology, documenting fabric u-values, ventilation rates, internal and
                external design temperatures.
              </li>
              <li>
                <strong>System design pack</strong> — heat pump capacity selection,
                emitter sizing (radiators or underfloor), flow-temperature design, hot-water
                cylinder sizing, controls strategy, single-line electrical diagram.
              </li>
              <li>
                <strong>SCOP estimate</strong> — the seasonal coefficient of performance
                expected for this specific install at this specific building, based on the
                emitter design and flow temperature.
              </li>
              <li>
                <strong>Quotation</strong> — capital, expected running cost vs the existing
                heating system, payback estimate, Boiler Upgrade Scheme grant value.
              </li>
              <li>
                <strong>Install records</strong> — install photos, label photos, electrical
                test results, EIC with Section 753 declaration.
              </li>
              <li>
                <strong>Commissioning records</strong> — heat pump commissioning checklist
                (refrigerant charge, pressures, leak test, electrical settings, controls
                programmed, cylinder programmed), MCS commissioning sheet.
              </li>
              <li>
                <strong>Notification</strong> — Building Regs Part P (England and Wales) via
                the firm's Competent Persons Scheme, MCS certificate to customer, Boiler
                Upgrade Scheme paperwork to Ofgem.
              </li>
              <li>
                <strong>Handover pack</strong> — full documentation given to the customer,
                including manufacturer manuals, warranty registration, recommended service
                schedule, and the consumer-facing version of the SCOP estimate so the
                customer understands expected performance.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="UK Fluorinated Greenhouse Gases Regulations 2015 (and retained EU Regulation 517/2014)"
            clause={
              <>
                The F-Gas Regulations require any work on a sealed refrigerant circuit
                (charging, recovery, leak testing, brazing into the circuit) to be carried
                out by an F-Gas-certified person. Companies handling F-Gas refrigerants
                must hold a company F-Gas certificate. The competence requirement applies
                to anyone touching the refrigerant — irrespective of other professional
                qualifications.
              </>
            }
            meaning={
              <>
                The L3 electrician's scope on a heat pump install is the electrical side —
                supply, isolation, controls, smart integration and external bonding. The
                F-Gas-certified engineer covers the refrigerant work. Crossing the boundary
                breaches the regulations and voids the equipment warranty. Refrigerants are
                potent greenhouse gases (R-410A GWP around 2088, R-32 around 675) and
                uncontrolled release contributes substantially to climate impact. R-290
                (propane) heat pumps add ATEX and flammable-refrigerant handling rules on
                top of the standard F-Gas regime.
              </>
            }
            cite="Source: UK Fluorinated Greenhouse Gases Regulations 2015 and retained EU Regulation 517/2014 — published on legislation.gov.uk; competence schemes operated by Refcom and equivalent bodies."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Heating-free areas, cold-lead derate and the small details</ContentEyebrow>

          <ConceptBlock
            title="Cold leads and control leads in the heated zone — Reg 753.522.1.3"
            plainEnglish="A heating mat or cable enters the heated zone via cold leads — the unheated lengths of cable that run from the connection terminal to the start of the heating element. Inside the heated zone, the cold lead sits in elevated ambient temperature alongside the active heating element. Reg 753.522.1.3 requires that for cold leads and control leads installed in the zone of heated surfaces, the increase of ambient temperature shall be taken into account. That means conductor current-carrying capacity, derating, insulation temperature ratings and routing shall be adjusted to reflect the higher ambient where the lead is installed in the heated zone."
            onSite="In practice — choose cable with insulation rated for the elevated temperature (silicone-insulated or PTFE rather than standard 70 degrees Celsius PVC), apply current-carrying capacity derate factors per BS 7671 Appendix 4 for the elevated ambient, and route the cold lead to minimise time in the heated zone. The manufacturer's installation manual normally specifies the cold-lead cable type and length — comply with it. The acceptance rule is direct — the increased ambient must be taken into account at design and install."
          >
            <p>
              Other Section 753 small details that the L3 electrician needs to recognise:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Heating-free areas</strong> — Reg 753.522.4.3 / 753.522.6.201
                require heating-free areas where furniture or fixtures could trap heat
                (under built-in cupboards, fixed kitchen units). Identify and mark at
                design stage; do not install heating element in those areas.
              </li>
              <li>
                <strong>Mechanical protection</strong> — heating cable shall be adequately
                protected from mechanical damage reasonably foreseeable during installation
                and use. Embed in screed per the manufacturer's instructions; protect any
                exposed sections.
              </li>
              <li>
                <strong>Wall heating prohibition</strong> — Reg 753.413 prohibits electrical
                separation as a protective measure on wall heating systems generally
                (without subtype limitation). Use ADS or SELV / PELV instead.
              </li>
              <li>
                <strong>Pool zone interaction</strong> — Reg 702.55.4 covers floor heating
                in pool areas with three permitted compliance options (SELV with source
                outside zones 0/1/2; embedded earthed metallic sheath plus bonding plus
                30 mA RCD; embedded earthed metallic grid plus bonding plus 30 mA RCD).
              </li>
              <li>
                <strong>Ignitability characteristic 'P'</strong> — heating cable shall be
                enclosed in material with ignitability characteristic 'P' to BS 6004 (or
                equivalent). The acceptance evidence is on the cable specification and the
                installation method.
              </li>
              <li>
                <strong>NOTE 2 leakage thresholds</strong> — heating equipment with leakage
                characteristics that could interact with a 30 mA RCD has suggested rated-
                power thresholds in NOTE 2. Where leakage is present or expected, consider
                the thresholds at design.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The Reg 412 / 753 Class II route — when ADS is impractical</ContentEyebrow>

          <ConceptBlock
            title="Reg 753.412 — double or reinforced insulation as the protective measure"
            plainEnglish="Section 753 recognises that ADS is not always practical or appropriate as the shock-protection route in special locations. Reg 753.412 allows double or reinforced insulation to be used as the protective measure where other measures are impractical or inappropriate, subject to the requirements of the regulation and any relevant subsidiary clauses in Part 7. The route is conditional on the heating equipment meeting Reg 412.2.1.1 — Class II equipment type-tested and marked, or assemblies of electrical equipment having total insulation per BS EN 61439 series declared equivalent to Class II, or basic-insulated equipment with supplementary insulation applied in the install process per Reg 412.2.1.2, or equipment with uninsulated live parts having reinforced insulation applied per Reg 412.2.1.3."
            onSite="On a Section 753 install where Reg 753.412 is the chosen protective measure, the verifier checks for documented Reg 412.2.1.1 compliance evidence — the type-test certificate, the manufacturer marking on the equipment, the declaration of conformity, or the BS EN 61439 series assembly evidence where applicable. The acceptance rule is direct on the verification requirement. Where the basic-insulated route is used (Reg 412.2.1.2), supplementary insulation must be applied during install per Reg 412.2.2.3 and the resulting safety must be equivalent to Reg 412.2.1.1 equipment. Where the uninsulated-parts route is used (Reg 412.2.1.3), reinforced insulation must be applied during install per Regs 412.2.2.2 and 412.2.2.3."
          >
            <p>
              Conditions and consequences of going down the Reg 753.412 route:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Mesh metal grid omission permitted</strong> only where Reg 412.2.1.1
                compliance is demonstrated and documented per Reg 753.411.3.2 acceptance.
                Verbal assurance is not acceptance — the install file must contain the
                type-test or declaration of conformity.
              </li>
              <li>
                <strong>Insulating enclosure required</strong> on parts relying on basic
                insulation only — Reg 412.2.2.1 requires the enclosure to afford at least
                IPXXB or IP2X protection when the equipment is ready for operation.
              </li>
              <li>
                <strong>Insulation integrity verified before handover</strong> — Reg 712.412
                acceptance criterion (the same principle applies under Reg 753.412) is that
                installations relying on double or reinforced insulation shall be inspected
                to confirm insulation integrity prior to handover.
              </li>
              <li>
                <strong>Pool zone interactions</strong> — where heating runs into a pool
                zone (Reg 702 special location) the Reg 702.55.4 options take precedence,
                and the Class II route under Reg 753.412 does not displace the Reg 702
                requirements.
              </li>
              <li>
                <strong>Documentation discipline</strong> — every assumption made in
                selecting the Reg 753.412 route must appear in the design pack and on the
                EIC. A future verifier should be able to confirm the protective measure
                from the file alone.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Pool zone heating — Reg 702.55.4 three options layered on top of Section 753"
            plainEnglish="Where electrical heating units are installed in or adjacent to a swimming pool surround, Reg 702 (special locations: swimming pools and other basins) overlays its zone-based protective regime on top of Section 753. Reg 702.55.4 gives three permitted compliance options for floor heating units in pool areas — option (a) protection by SELV with the source installed outside zones 0, 1 and 2; option (b) embedded electric heating unit with an earthed metallic sheath connected to the supplementary protective equipotential bonding specified in Reg 702.415.2 and supply circuit additionally protected by an RCD per Reg 415.1.1; option (c) embedded electric heating unit covered by an embedded earthed metallic grid connected to the same supplementary bonding plus the same RCD overlay."
            onSite="On a Section 753 install that touches a Reg 702 zone, the Reg 702.55.4 options take precedence and the design pack must declare which of the three options is in use. Acceptance evidence varies by option — option (a) requires the SELV source location to be documented and verified outside zones 0, 1 and 2; options (b) and (c) require the bonding scheme to be physically connected and continuity tested, and the RCD selection to be verified per Reg 415.1.1. Reg 702.55.4 captures all three options. The L3 electrician's job is to recognise the Reg 702 overlay early in the design — pool zones change the answer."
          >
            <p>
              When pool-zone considerations apply to a heat pump install:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Outdoor unit adjacent to pool</strong> — where the outdoor unit
                sits within or adjacent to a Reg 702 zone, the bonding regime for the unit
                chassis follows Reg 702 supplementary bonding requirements, not the
                generic Section 753 bonding alone.
              </li>
              <li>
                <strong>Indoor cylinder or buffer in pool plant room</strong> — the plant
                room may not be a Reg 702 zone but may be a separate special location
                (cylinder cupboard with bonded pipework) and bonding interactions need
                checking.
              </li>
              <li>
                <strong>Underfloor heating in pool surround</strong> — Reg 702.55.4 applies
                directly. Pick option (a), (b) or (c) at design and document the chosen
                protective measure on the EIC.
              </li>
              <li>
                <strong>30 mA RCD requirement</strong> — Section 753 already requires 30 mA
                RCD on underfloor heating; Reg 702.55.4 options (b) and (c) reinforce that
                requirement plus add the supplementary bonding overlay. Both apply
                together.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 702.55.4 (pool-zone floor heating, options paraphrased)"
            clause={
              <>
                <p className="mb-2">Three permitted options under Reg 702.55.4:</p>
                <ul className="space-y-1 list-disc pl-5">
                  <li>
                    <strong>Option (a)</strong> — &quot;The electric heating unit embedded
                    in the floor shall be protected by SELV (see Section 414), the source
                    of SELV being installed outside zones 0, 1 and 2.&quot;
                  </li>
                  <li>
                    <strong>Option (b)</strong> — &quot;The embedded electric heating unit
                    is permitted if it incorporates an earthed metallic sheath connected
                    to the supplementary protective equipotential bonding specified in
                    Regulation 702.415.2 and its supply circuit is additionally protected
                    by an RCD having the characteristics specified in Regulation
                    415.1.1.&quot;
                  </li>
                  <li>
                    <strong>Option (c)</strong> — &quot;It is permitted that the embedded
                    electric heating unit is covered by an embedded earthed metallic grid
                    connected to the supplementary protective equipotential bonding
                    specified in Regulation 702.415.2 and that its supply circuit is
                    additionally protected by an RCD having the characteristics specified
                    in Regulation 415.1.1.&quot;
                  </li>
                </ul>
              </>
            }
            meaning={
              <>
                Pool zones change the answer for embedded heating. The three options offer
                genuine design choice — SELV with a source outside the dangerous zones,
                or earthed sheath plus bonding plus 30 mA RCD, or earthed grid plus bonding
                plus 30 mA RCD. Pick one, document it, and verify it physically on
                acceptance. The Section 753 requirements still apply alongside — the Reg
                702 options are an overlay, not a replacement.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Reg 702.55.4 — IET Wiring Regulations 18th Edition A4:2026."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Fitting a 100 mA or 300 mA RCD on underfloor heating to avoid nuisance trips on long runs"
            whatHappens={
              <>
                The installer sees standing leakage on a long underfloor heating run that
                trips a 30 mA RCD during commissioning. The quick fix is to upsize the RCD
                to 100 mA or 300 mA so the system passes commissioning. Section 753 is
                breached — all underfloor heating shall have 30 mA RCD protection,
                irrespective of location. The fire-prevention rationale is bypassed and a
                slow resistive insulation fault that develops over the years can ignite
                the floor finish before the upsized RCD trips.
              </>
            }
            doInstead={
              <>
                Address the standing leakage at source. Section the heating into shorter
                zones each with its own 30 mA RCD. Select a lower-leakage product. Use
                Class II construction with the appropriate Section 753 route. Coordinate
                with the manufacturer's installation guide on RCD selection and standing
                leakage allowance. The 30 mA limit is non-negotiable on underfloor heating
                — design around it rather than around the regulation.
              </>
            }
          />

          <CommonMistake
            title="Treating the surface-temperature cap as an air-temperature thermostat job"
            whatHappens={
              <>
                The installer fits a standard room thermostat to control the heating to
                comfortable air temperature and considers Reg 753.424.201 satisfied. The
                cap is on surface temperature, not air temperature. On a sunny day in a
                south-facing room with an active heating mat, the floor surface can reach
                90+ degrees Celsius even with the air thermostat satisfied. Reg 753.423
                applies because someone could walk on the floor in shoes — the cap is
                breached and the install is non-compliant under acceptance.
              </>
            }
            doInstead={
              <>
                Fit at least one of the three permitted measures from Reg 753.424.201 — a
                floor-temperature limit thermostat, an embedded sensor temperature cut-out,
                or an intrinsically-limited heating element by design. Document which
                measure is in use and run the functional test at commissioning. The room
                thermostat alone does not satisfy the cap; the surface-temperature limit
                must be designed in.
              </>
            }
          />

          <Scenario
            title="Domestic 9 kW air-source heat pump install on existing radiators (low-temperature retrofit)"
            situation={
              <>
                You are installing a 9 kW monobloc air-source heat pump on a 1980s
                three-bed semi as a Boiler Upgrade Scheme retrofit replacing a 24 kW gas
                combi. The MCS-certified design pack shows the heat-loss calculation
                (room-by-room, total design heat loss 8.3 kW at minus 2 degrees Celsius
                external, 21 degrees Celsius internal), upsized radiators on the upper
                floor (the existing single-panel radiators were too small at the new flow
                temperature of 50 degrees Celsius), a 250-litre hot-water cylinder, weather
                compensation controls, and an integral 3 kW electric backup heater within
                the heat pump unit (for cold-snap top-up only). The supply will be a
                dedicated 32 A circuit on a Type C MCB with Type A 30 mA RCD upstream. The
                outdoor unit is on a level concrete base outside the kitchen wall, with the
                refrigerant pipework penetrating the wall to the indoor cylinder. F-Gas
                refrigerant work is being done by your firm's F-Gas-certified engineer
                colleague.
              </>
            }
            whatToDo={
              <>
                Coordinate the day's work — F-Gas engineer arrives with you, refrigerant
                work and electrical work happen in parallel where they do not interfere,
                and you each sign the other's commissioning sheet at the end. On the
                electrical side run the new 32 A radial from the consumer unit through to
                the outdoor isolator, terminate the outdoor unit per the manufacturer
                wiring diagram, terminate the controls wiring (thermostat, weather
                compensation sensor, cylinder thermostat, 0-10 V signals to the heat pump
                if applicable), bond the outdoor unit chassis where the design pack
                requires it (and where it forms an extraneous-conductive-part by definition
                — typically yes for a metal-framed unit on a concrete base). Verify the RCD
                is Type A and 30 mA per Section 753 default for the heating-supply circuit.
                Run the inspection — continuity, insulation resistance (with the heat pump
                disconnected for the IR test then reconnected and re-tested at 250 V if the
                manufacturer requires), polarity, Zs, RCD trip times, functional check on
                the controls. Sign the EIC with the Section 753 declaration. Hand over to
                the F-Gas engineer once they confirm refrigerant commissioning is complete.
                Together — energise the unit, run the manufacturer commissioning routine,
                programme the controls, demonstrate operation to the customer, hand over
                the documentation pack including the MCS certificate, the Boiler Upgrade
                Scheme paperwork, the heat pump user manual, the cylinder user manual, and
                the recommended service schedule.
              </>
            }
            whyItMatters={
              <>
                The retrofit scenario is the dominant UK heat pump install pattern through
                the rest of the decade. Customers are replacing failing gas boilers with
                heat pumps under the Boiler Upgrade Scheme, the radiators usually need
                upsizing for the lower flow temperature, and the success of the install
                depends on getting the four regulatory regimes (MCS MIS 3005, BS 7671
                Section 753, F-Gas Regulations, Building Regs Part L where applicable) to
                interlock cleanly. As the L3 electrician you do not run the MCS process or
                touch the refrigerant, but you are the trade who provides the supply, the
                isolation, the controls wiring and the bonding — and your work is what the
                EIC and the Section 753 declaration sign off on. Documentation discipline
                is what keeps the install on the customer's side of any future audit and
                what makes the warranty enforceable years later.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "BS 7671:2018+A4:2026 Section 753 covers heating cables and embedded electric heating systems — the embedded nature of the element drives most of the special requirements (RCD overlays, surface temperature caps, mesh metal grids, cold-lead derate).",
              "All underfloor heating installations require additional protection by an RCD rated at 30 mA, irrespective of location. Where resistive faults could cause fire (overhead heating with heating film) the same 30 mA limit applies. Class II circuits in not-completely-wet areas also get the 30 mA limit.",
              "Reg 753.424.201 caps heated floor and ceiling surfaces at 80 degrees Celsius with at least one of three permitted measures actively implemented. Reg 753.423 widens the contact trigger to include footwear contact.",
              "Reg 753.522.1.3 requires cold leads and control leads in the heated zone to account for the elevated ambient — derate the conductor and select higher-temperature insulation.",
              "Reg 753.411.3.2 mesh metal grid omission is conditional on documented Class II compliance per Reg 412.2.1.1 — the install file must contain the type-test or declaration of conformity.",
              "On a heat pump install the L3 electrician's scope is the electrical side. The F-Gas Regulations require any refrigerant work to be by an F-Gas-certified engineer.",
              "MCS MIS 3005 covers heat pump installer competence and unlocks the Boiler Upgrade Scheme grant for the customer. Building Regs Part L applies in new build, extension or major renovation contexts.",
              "Four regulatory regimes interlock on a typical heat pump install — MCS MIS 3005 (installer competence), BS 7671 Section 753 (electrical install), F-Gas Regulations (refrigerant work), Building Regs Part L (building energy efficiency).",
            ]}
          />

          <Quiz title="Section 753 heating, heat pump regulatory chain and MCS MIS 3005 — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section4-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                4.4 Section 722 EV + Open-PEN
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 5 — installation and commissioning
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
