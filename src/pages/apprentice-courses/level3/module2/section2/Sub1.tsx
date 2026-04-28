/**
 * Module 2 · Section 2 · Subsection 1 — BS 7671 Section 712 (PV) deeper
 * Maps to City & Guilds 2365-03 / Unit 301 / LO2 / AC 2.1 (regulations and standards)
 *
 * Layered depth: 2357 Unit 602 ELTK02 / AC 2.1 (regulations) and AC 2.2 (statutory framework);
 * 2357 Unit 312 ELTP02 / AC 2.1 (regulatory framework for environmental technology systems).
 *
 * Note: Unit 301 is overview-level. This subsection deepens the BS 7671 Section 712 (Solar
 * photovoltaic) content beyond the principles overview in Section 1, focusing on the
 * specific regulation map an L3 apprentice should recognise on a PV install.
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
  'BS 7671 Section 712 (PV) deeper (2.1) | Level 3 Module 2.2.1 | Elec-Mate';
const DESCRIPTION =
  "BS 7671 Section 712 covering solar PV power supply systems at recognition level for the L3 electrician — DC isolation, string and array architecture, A4:2026 changes, the relationship with Section 826 (storage) on hybrid systems, MCS MIS 3002 install standard and ENA G98/G99 grid notification.";

const checks = [
  {
    id: "l3-m2-s2-sub1-dc-isolation",
    question:
      "Why does Section 712 of BS 7671 require a DC isolator on the array side of every PV install?",
    options: [
      "Because the DNO requires it for grid-connection notification.",
      "Because PV arrays are unique — you cannot switch them off. As long as light hits the panels, the array generates DC voltage at the inverter terminals. The DC isolator gives the installer (and emergency responders) a means of breaking that DC circuit before working on the inverter or the strings. AC isolators downstream of the inverter only break the inverter-to-grid path; they do not de-energise the DC side. A4:2026 has refined the DC isolation requirements alongside the broader Section 712 update — typically the isolator is sited adjacent to the inverter on the DC entry side, accessible without disturbing the panel array.",
      "It is a brand-name-only requirement and not actually mandatory.",
      "It is required only on systems above 10 kWp.",
    ],
    correctIndex: 1,
    explanation:
      "DC isolation is the headline difference between PV and any other domestic install. You cannot pull a fuse and de-energise a PV array — sunlight keeps generating. Section 712 requires a means of disconnection on the DC side, accessible for safe work and emergency response. Typically the isolator is fitted at the inverter; some installs add a roof-side isolator for additional safety on rescue access.",
  },
  {
    id: "l3-m2-s2-sub1-pv-fire",
    question:
      "What does fire-fighter safety mean in the context of a PV installation and how does Section 712 / IET CoP address it?",
    options: [
      "PV is fireproof so fire safety does not apply.",
      "PV systems remain energised during a fire — water from a hose hitting an energised DC string can produce a shock hazard for the fire-fighter. The IET Code of Practice for Grid-Connected Solar Photovoltaic Systems (currently 4th edition with 2026 update) addresses this through (1) clear external labelling identifying the property as having PV, (2) DC isolation accessible from outside the building where practicable, (3) emergency switching that de-energises the strings as far as is practical, and (4) optional rapid-shutdown technology that drops module-level voltage to safe levels on a signal. Section 712 references the IET CoP as the practical implementation guide. Some manufacturers now bake rapid-shutdown into the panel optimisers as standard.",
      "It only applies to commercial PV systems.",
      "Fire-fighters are trained to ignore PV systems.",
    ],
    correctIndex: 1,
    explanation:
      "PV fire safety is genuinely complex because of the inability to de-energise the modules themselves with conventional isolation. The IET Code of Practice is the practical reference; A4:2026 has refined the BS 7671 cross-references. As an apprentice you should recognise the labelling and the rapid-shutdown features when you see them, and not assume a PV system is dead just because the AC isolator is open.",
  },
  {
    id: "l3-m2-s2-sub1-mcs",
    question:
      "Why is MCS MIS 3002 separate from BS 7671 Section 712, and what does each cover?",
    options: [
      "MIS 3002 is a competing standard to BS 7671.",
      "BS 7671 Section 712 covers the electrical safety of the PV installation — the wiring, isolation, protective measures, cable ratings and earthing. MCS MIS 3002 is the installer competence and product certification standard required for the customer to claim Smart Export Guarantee payments and to demonstrate quality assurance on the install. The two work alongside each other — every MCS-certified PV install must also comply with BS 7671 Section 712 (which is the legal underpinning); not every BS 7671-compliant PV install needs MCS (e.g. an off-grid install with no SEG claim does not require MCS, though most reputable installers still hold it).",
      "MIS 3002 is for inverters only and BS 7671 is for cabling only.",
      "Only one applies at a time depending on the customer.",
    ],
    correctIndex: 1,
    explanation:
      "BS 7671 is the safety standard (legal underpinning); MCS is the quality / market-access scheme (commercial pathway to grants and tariffs). They cover different aspects and both apply to most UK domestic PV installs. As an apprentice you contribute to both — the wiring satisfies BS 7671, the install paperwork satisfies MCS.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What is the scope statement of BS 7671 Section 712 in plain English?",
    options: [
      "Only off-grid PV installations.",
      "All PV installations — installations not connected to a system for distribution of electricity to the public, installations in parallel with such a system, and installations as an alternative to such a system. Section 712 has been substantially revised in A4:2026 to reflect modern PV practice including hybrid PV-battery systems, microinverters and module-level power electronics. Every PV configuration the L3 apprentice will see in the UK is within the Section 712 scope.",
      "Only systems above 16 A per phase.",
      "Only systems on commercial buildings.",
    ],
    correctAnswer: 1,
    explanation:
      "Section 712 covers every UK PV install, full stop. A4:2026 has substantially refreshed the section to reflect a decade of technology change since the original 18th Edition. The IET Code of Practice for Grid-Connected Solar Photovoltaic Systems is the practical companion that walks through the application detail.",
  },
  {
    id: 2,
    question:
      "What is the typical DC voltage on a domestic PV string and why does it matter for the install architecture?",
    options: [
      "Always 12 V DC like a car battery.",
      "Modern crystalline silicon modules typically have a Voc (open-circuit voltage) of 40-50 V per module. A residential string of 8-12 modules in series produces a string Voc of 350-600 V DC under standard conditions, with voltages running higher in cold conditions (Voc rises as temperature falls — the temperature-corrected maximum is what determines the inverter input rating). String inverters operate at these voltages; microinverters convert DC to AC at module level so the cable run between modules and the rest of the system is at AC; module-level DC optimisers raise or lower module voltage to keep the string at MPPT regardless of shading on individual modules. The architecture choice affects the cable type, the protective measures and the rapid-shutdown options.",
      "Always 24 V DC for safety reasons.",
      "Always above 1500 V DC.",
    ],
    correctAnswer: 1,
    explanation:
      "DC voltage architecture is the headline electrical difference between PV systems. String inverter (most common UK domestic) — high DC voltage to the inverter, single-point MPPT, simplest install. Microinverter (Enphase) — module-level conversion, AC-only system cable from the roof, more components but immune to single-module shading. DC optimisers (SolarEdge) — module-level DC-DC, single string inverter, panel-level monitoring and rapid shutdown.",
  },
  {
    id: 3,
    question:
      "What does the term anti-islanding mean for a grid-connected PV inverter?",
    options: [
      "Stopping the panels from being installed on islands like the Isle of Wight.",
      "Anti-islanding is the inverter's ability to detect when the grid has gone down and to disconnect itself within milliseconds — preventing the inverter from continuing to feed a portion of the local network ('islanding') with the DNO's workers expecting that section to be dead. ENA G98 (and G99 for larger systems) defines the protection settings the inverter must implement (typically G99/1-7 or earlier G83/G59 protection settings depending on inverter age). Modern inverters self-test the anti-islanding regularly. A4:2026 has refined the BS 7671 cross-references to G98/G99.",
      "It is a setting that prevents PV panels from charging the battery.",
      "It is a feature exclusive to off-grid systems.",
    ],
    correctAnswer: 1,
    explanation:
      "Anti-islanding is the safety-critical reason a PV inverter must be type-tested to G98 or G99. Without anti-islanding, an unintentional islanded section of the local network with the inverter still feeding it could shock a DNO worker thinking the section is dead. Every grid-connected inverter sold in Great Britain must hold a G98 or G99 type-test certificate.",
  },
  {
    id: 4,
    question:
      "On a hybrid PV-battery system, how do BS 7671 Sections 712 and 826 interact?",
    options: [
      "They contradict each other — only one applies.",
      "They apply together. Section 712 covers the PV-side electrical requirements (DC isolation, string protection, inverter compliance, AC connection). Section 826 covers the EESS aspects (battery isolation, BMS, fire safety, signage). The hybrid inverter is a single piece of equipment that has to comply with both — the manufacturer's certification typically demonstrates compliance with both sections. The IET Codes of Practice for Grid-Connected PV and for EESS both reference each other. A4:2026 has clarified the interaction in places where ambiguity existed in the 18th Edition.",
      "Section 826 replaces Section 712 once a battery is added.",
      "Only Section 712 applies on hybrid systems.",
    ],
    correctAnswer: 1,
    explanation:
      "Hybrid PV-battery systems sit at the intersection of Sections 712 and 826. Both apply. The MCS-certified designer (often holding both MIS 3002 PV and MIS 3012 storage certifications) handles the design; the apprentice's wiring needs to satisfy both regulation strands. Documentation should reference both sections.",
  },
  {
    id: 5,
    question:
      "What is the role of overcurrent protection on the DC side of a PV string and when is it required?",
    options: [
      "Always required regardless of string configuration.",
      "Overcurrent protection on the DC side is required when the maximum reverse current that could flow into a string under fault conditions exceeds the string cable's or module's reverse-current rating. This depends on the array configuration — single-string systems often do not require DC fuses (no reverse current possible), multi-string systems in parallel may require string fuses to protect each string from reverse current driven by the other strings under fault. Section 712 sets the framework; the MCS-certified designer calculates whether fuses are needed for the specific array configuration. A4:2026 has refined the DC overcurrent requirements alongside the broader update.",
      "Only required on systems above 10 kWp.",
      "Never required because PV is current-limited.",
    ],
    correctAnswer: 1,
    explanation:
      "DC string protection is configuration-specific. Single string — typically no DC fuses needed because no reverse current path. Multi-string in parallel — DC fuses on each string protect against reverse current from the other strings during a single-string fault. The MCS designer runs the calculation; the apprentice fits per the design. A4:2026 has clarified the requirement.",
  },
  {
    id: 6,
    question:
      "What does the labelling on a domestic PV install need to include per Section 712 and the IET Code of Practice?",
    options: [
      "Just the manufacturer's logo.",
      "External label identifying the property as having a PV system (typically near the meter and at the main isolator); internal labels at the AC isolator (identifying it as the PV AC isolator, not a generic isolator), at the DC isolator (warning that the array remains energised in light), at the inverter (warning of dual supply), and on the consumer unit (identifying the PV final circuit). The labelling is for the customer (so they know what their isolators do), the next electrician (so they understand the install years later), and the fire-fighter (so they know the building has PV before forcing entry). Section 514 of BS 7671 covers identification; Section 712 and the IET CoP add PV-specific requirements.",
      "Only an external sticker.",
      "Labelling is optional under Section 712.",
    ],
    correctAnswer: 1,
    explanation:
      "Labelling is non-glamorous but legally and operationally important. Multiple labels in multiple locations is the norm on a PV install. The IET Code of Practice for Grid-Connected Solar Photovoltaic Systems gives the practical wording recommendations. Skipping labelling under time pressure on the day of install creates a long-term cost for everyone who comes later.",
  },
  {
    id: 7,
    question:
      "What is the difference between MCS MIS 3002 and the IET Code of Practice for Grid-Connected Solar Photovoltaic Systems?",
    options: [
      "They are the same document with different names.",
      "MIS 3002 is the MCS installer-competence and product-certification standard required for the customer to claim Smart Export Guarantee payments and demonstrate quality assurance. The IET Code of Practice is the practical implementation guide that walks through how to apply BS 7671 Section 712 on a real install — system architecture, cable selection, protective devices, labelling, commissioning. Both reference each other; both should be on the bench when the MCS designer is producing the install drawings. Neither replaces BS 7671 — Section 712 is the legal floor; MIS 3002 and the IET CoP build on top.",
      "MIS 3002 only applies to inverters.",
      "The IET CoP only applies to off-grid systems.",
    ],
    correctAnswer: 1,
    explanation:
      "MCS and IET serve different purposes. MCS is a market-access scheme (the customer needs MCS for grants and SEG); IET CoPs are practical guidance documents (helping installers apply the wiring regs in real-world scenarios). Both reference BS 7671 Section 712 as the legal underpinning. As an apprentice you should recognise the names and what they do.",
  },
  {
    id: 8,
    question:
      "Why is a PV cable run typically through a steel conduit on a roof void or external installation?",
    options: [
      "Steel conduit looks more professional.",
      "PV cables on a roof void or external run are exposed to UV, mechanical damage from foot traffic and rodents, and elevated temperatures (loft voids hit 50+ degC in summer). Steel conduit provides physical protection, UV shielding, and a fault-current path. The cable inside is typically a UV-stable single-core PV cable (often dual-insulated H1Z2Z2-K type) rated for the elevated temperatures. The conduit is bonded to the main earthing terminal. Section 712 references the general BS 7671 requirements for cable installation methods and the elevated-temperature derating; the IET CoP gives the practical guidance on conduit selection and routing.",
      "Steel conduit is cheaper than the alternatives.",
      "PV cable installation does not need any protection.",
    ],
    correctAnswer: 1,
    explanation:
      "PV cable installation is a real specialism — UV, heat, mechanical exposure all factor in. The MCS-certified PV installer specifies the cable and the installation method; the apprentice typically assists with the run and termination. Steel conduit, fire-rated cable trays, dedicated PV cable in protected routes — all part of the standard PV installation toolkit.",
  },
];

const faqs = [
  {
    question: "Why does PV need its own section in BS 7671 rather than just using the general regulations?",
    answer:
      "PV creates two unique challenges that ordinary installations do not have. First, the source cannot be switched off — sunlight keeps the modules energised. Second, the inverter is feeding back into the network, not just consuming from it, which changes the protective measure framework (anti-islanding, export protection, dual supply considerations). Section 712 addresses both. A4:2026 has substantially refreshed Section 712 to reflect modern PV practice including hybrid systems, microinverters and module-level power electronics — the technology has moved on substantially since the 18th Edition was originally published.",
  },
  {
    question: "Does an off-grid PV install need to comply with Section 712?",
    answer:
      "Yes. Section 712 applies to PV installations 'not connected to a system for distribution of electricity to the public', 'in parallel with' such a system, and 'as an alternative to' such a system. The off-grid case is explicitly in scope. The off-grid install does not need ENA G98/G99 (no grid connection to notify) but it does need BS 7671 Section 712 compliance for the electrical safety, plus typically Section 826 for any battery storage involved.",
  },
  {
    question: "What is the practical role of A4:2026 changes for a PV apprentice?",
    answer:
      "A4:2026 has refreshed Section 712 to reflect modern PV practice. Key apprentice-relevant changes: clarified DC isolation requirements; updated cross-references to ENA G98/G99 connection regulations; updated language around hybrid PV-battery systems and Section 826 interaction; refined DC overcurrent protection requirements for multi-string arrays; updated AFDD references where applicable to the AC side. The apprentice does not need to memorise A4:2026 line by line — but should recognise that any PV install commissioned from 2026 onwards is to A4:2026, not to the 2018 baseline.",
  },
  {
    question: "When does an installer apply for G99 rather than G98?",
    answer:
      "G98 covers connect-and-notify for inverter-connected generation up to 16 A per phase (about 3.68 kW single-phase, 11 kW three-phase). G99 covers everything above that, plus any multi-inverter system that aggregates above the threshold, plus any system with non-standard protection settings. Most domestic PV installs (4-5 kWp single-phase inverters) sit comfortably inside G98. Larger PV (8+ kWp), hybrid systems with substantial battery export capability, and three-phase commercial installs typically need G99. G99 requires DNO application and approval before energising; G98 only requires notification within 28 days of energising.",
  },
  {
    question: "Is there a difference between SEG and the historical Feed-in Tariff (FiT)?",
    answer:
      "Yes — substantial. The Feed-in Tariff (FiT) was the 2010-2019 export support scheme that paid generators a generation tariff plus an export tariff for a fixed period (typically 20-25 years). FiT closed to new applicants in March 2019. The Smart Export Guarantee (SEG) replaced it for new installs from January 2020 — SEG is a market-rate export tariff offered by larger energy suppliers (mandatory above a customer threshold), with rates set by each supplier and changing periodically. Most current SEG rates are 5-15 p/kWh; some suppliers offer higher rates with conditions. MCS certification is required for SEG eligibility.",
  },
  {
    question: "Does the apprentice's CPS scheme membership cover PV installation work?",
    answer:
      "CPS (Competent Person Scheme) membership covers BS 7671 work — the electrical safety side of any installation including PV. It does not cover MCS — the install-quality and product-certification scheme separately required for SEG eligibility. So the apprentice's employer typically holds CPS membership (NICEIC, NAPIT, ELECSA, etc.) for the BS 7671 sign-off and MCS certification (MIS 3002 for PV) separately for the SEG side. The two schemes work alongside each other; the apprentice contributes to both.",
  },
];

export default function Sub1() {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module2-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 2 · Subsection 1"
            title="BS 7671 Section 712 (Solar PV) — deeper dive"
            description="Section 712 governs every UK PV installation. A4:2026 has substantially refreshed the section to reflect modern PV practice. This subsection covers the regulation map, the DC isolation rationale, the relationship with Section 826 on hybrid systems, the IET Code of Practice for Grid-Connected Solar PV, MCS MIS 3002 install certification and ENA G98/G99 grid notification."
            tone="emerald"
          />

          <TLDR
            points={[
              "Section 712 applies to all UK PV installs — off-grid, grid-parallel and grid-alternative. A4:2026 has substantially refreshed it to reflect modern PV technology including hybrid systems, microinverters and module-level optimisers.",
              "DC isolation is the unique PV requirement — you cannot switch a PV array off, only break its DC circuit. Section 712 mandates a DC isolator; the IET Code of Practice covers its siting and labelling.",
              "Section 712 (PV) and Section 826 (storage) apply together on hybrid PV-battery systems. The hybrid inverter must satisfy both.",
              "MCS MIS 3002 is the installer competence / product certification scheme required for SEG eligibility. ENA G98 / G99 covers the grid-connection notification. Both work alongside BS 7671 — they do not replace it.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "State the scope of BS 7671 Section 712 and identify which PV installations fall within it.",
              "Describe the rationale for DC isolation on a PV system and identify the typical isolator location.",
              "Explain how Section 712 (PV) and Section 826 (EESS) interact on hybrid PV-battery systems.",
              "Identify the role of MCS MIS 3002 alongside BS 7671 Section 712 and explain when each applies.",
              "Describe the labelling requirements for a domestic PV installation per Section 712 and the IET Code of Practice.",
              "Recognise the key A4:2026 changes to Section 712 that an L3 apprentice should know on a 2026-onwards install.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Scope of Section 712</ContentEyebrow>

          <ConceptBlock
            title="Section 712 covers every UK PV installation, full stop"
            plainEnglish="The scope statement of Section 712 names three cases: PV installations not connected to the public network (off-grid), PV installations in parallel with the public network (the standard UK domestic case), and PV installations as an alternative to the public network (also off-grid, but framed as the customer's primary supply). All three are within scope. A4:2026 has substantially revised Section 712 to reflect modern PV practice."
            onSite="On any UK PV install the apprentice will encounter, Section 712 applies. There is no PV configuration outside the scope. The MCS-certified designer specifies the install per Section 712 and the IET Code of Practice for Grid-Connected Solar Photovoltaic Systems; the apprentice executes the wiring per the design and per the general BS 7671 requirements (Sections 411, 514, 522, 532, etc.) that work alongside the Section 712 specifics."
          >
            <p>
              Section 712 is read alongside other BS 7671 sections that apply generally:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Section 411</strong> — protective measure (ADS) for general installations including the AC side of PV.
              </li>
              <li>
                <strong>Section 514</strong> — identification and notices, supplemented by PV-specific labels per Section 712 and the IET CoP.
              </li>
              <li>
                <strong>Section 522</strong> — selection and erection in relation to external influences (UV, temperature, mechanical for the cable side).
              </li>
              <li>
                <strong>Section 532</strong> — RCD requirements for the AC side of the inverter.
              </li>
              <li>
                <strong>Section 826</strong> — applies on hybrid PV-battery systems alongside Section 712.
              </li>
              <li>
                <strong>Appendix 4</strong> — current-carrying capacity and voltage drop calculations.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 712 (Solar photovoltaic (PV) power supply systems), scope"
            clause={
              <>
                "The requirements of this section apply to PV installations: not connected to a system for distribution of electricity to the public; in parallel with a system for distribution of electricity to the public; and as an alternative to a system for distribution of electricity to the public. The requirements supplement and modify the general requirements of this Standard."
              </>
            }
            meaning={
              <>
                Section 712 is the BS 7671 anchor for every UK PV installation. A4:2026 has substantially refreshed the section to reflect modern PV practice including hybrid PV-battery systems, microinverters, module-level power electronics and refined DC isolation requirements. The IET Code of Practice for Grid-Connected Solar Photovoltaic Systems (currently 4th edition with 2026 update) is the practical implementation guide. MCS MIS 3002 is the installer / product certification scheme. ENA G98 / G99 covers grid connection notification.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Section 712 (paraphrased from published commentary on the A4:2026 amendment — full text in IET Wiring Regulations 18th Edition, A4:2026, and the IET Code of Practice for Grid-Connected Solar Photovoltaic Systems)."
          />

          <SectionRule />

          <ContentEyebrow>DC isolation — the unique PV requirement</ContentEyebrow>

          <ConceptBlock
            title="You cannot switch a PV array off — you can only break its DC circuit"
            plainEnglish="Every other domestic source of electricity can be switched off — pull a fuse, isolate the supply, the source goes dead. PV is the exception. As long as light hits the modules, they generate DC voltage at the inverter terminals. The DC isolator is the apprentice's only means of de-energising the inverter and the DC strings for safe work and emergency response."
            onSite="The DC isolator is typically sited adjacent to the inverter on the DC entry side, accessible without disturbing the panel array on the roof. Some installs add a roof-side isolator for additional safety on rescue access — fire-fighters can drop module-level voltage from outside the building. Modern systems with module-level power electronics (Enphase microinverters, SolarEdge optimisers) include rapid-shutdown features that drop module voltage on a signal — this satisfies emerging codes for fire-fighter safety more comprehensively than a single inverter-side isolator. The MCS-certified designer specifies; the apprentice fits per the design."
          >
            <p>
              The four DC isolation considerations on a PV install:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Inverter-side isolator</strong> — required on every install by Section 712. Used by the installer for safe work on the inverter.
              </li>
              <li>
                <strong>Roof-side isolator</strong> — optional but increasingly recommended in the IET Code of Practice for fire-fighter safety. Some MCS designers specify one as standard.
              </li>
              <li>
                <strong>Module-level rapid shutdown</strong> — provided by microinverter and DC-optimiser systems. Drops module voltage to safe levels on signal. Best practice for fire safety on new installs.
              </li>
              <li>
                <strong>Labelling</strong> — the DC isolator is labelled with a warning that the array remains energised on the source side in light. Standard wording is given in the IET CoP.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Section 712 plus Section 826 on hybrid systems</ContentEyebrow>

          <ConceptBlock
            title="Hybrid PV-battery systems must satisfy both Section 712 and Section 826"
            plainEnglish="A hybrid inverter is a single piece of equipment that combines a PV inverter, a battery inverter and an AC grid connection in one box. The PV side falls under Section 712; the battery side falls under Section 826. Both apply. The manufacturer's certification typically demonstrates compliance with both sections; the install must satisfy the combined requirements."
            onSite="On a hybrid install the apprentice should expect: DC isolation on the PV string side (Section 712), DC isolation on the battery side (Section 826), AC isolation between the inverter and the consumer unit (general BS 7671), labelling at each isolator identifying its purpose, and the dual-supply notice on the consumer unit. The MCS-certified designer typically holds both MIS 3002 (PV) and MIS 3012 (storage); the apprentice's wiring satisfies both regulation strands. A4:2026 has clarified the interaction in places where ambiguity existed in the original 18th Edition."
          >
            <p>
              Hybrid system regulation map:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS 7671 Section 712</strong> — PV side electrical requirements.
              </li>
              <li>
                <strong>BS 7671 Section 826</strong> — EESS aspects (battery isolation, BMS, fire safety, signage).
              </li>
              <li>
                <strong>IET Code of Practice for Grid-Connected Solar PV</strong> — practical PV implementation.
              </li>
              <li>
                <strong>IET Code of Practice for Electrical Energy Storage Systems</strong> — practical EESS implementation.
              </li>
              <li>
                <strong>MCS MIS 3002</strong> — installer competence and product certification for PV.
              </li>
              <li>
                <strong>MCS MIS 3012</strong> — installer competence and product certification for storage.
              </li>
              <li>
                <strong>ENA G98 / G99</strong> — grid connection notification covering the combined export profile.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>MCS, IET CoP, ENA and BS 7671 — the four-document map</ContentEyebrow>

          <ConceptBlock
            title="Four documents talk to each other on every UK PV install"
            plainEnglish="A typical UK domestic PV install sits at the intersection of four regulatory and quasi-regulatory documents — BS 7671 Section 712 (legal electrical safety), the IET Code of Practice for Grid-Connected Solar PV (practical implementation guide), MCS MIS 3002 (installer competence and product certification), and ENA G98 / G99 (grid connection notification). Each does a different job; all four apply."
            onSite="The MCS-certified designer holds the documentation map together. The apprentice should recognise the names and what each does, even if the day-to-day work focuses on the BS 7671 wiring side. When the customer asks 'why does my installer need MCS?' or 'what is the difference between MCS and the wiring regs?', the apprentice should be able to give a coherent answer."
          >
            <p>
              The four-document map at a glance:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS 7671 Section 712</strong> — legal floor for electrical safety. Mandatory under the Building Regulations and CDM. A4:2026 substantially refreshed the section.
              </li>
              <li>
                <strong>IET Code of Practice for Grid-Connected Solar Photovoltaic Systems</strong> — practical implementation guide. Currently 4th edition with 2026 update reflecting A4:2026 changes. Not legally mandatory but referenced by MCS and by reasonable-installer expectations.
              </li>
              <li>
                <strong>MCS MIS 3002</strong> — installer competence and product certification scheme. Required for the customer to claim Smart Export Guarantee payments and demonstrate quality assurance.
              </li>
              <li>
                <strong>ENA G98 / G99</strong> — grid connection notification regulations. G98 connect-and-notify up to 16 A per phase; G99 application-and-approval above that.
              </li>
            </ul>
            <p>
              Without any one of these four, the install has a gap. BS 7671 alone — the install is electrically safe but the customer cannot claim SEG and the grid connection is unauthorised. MCS alone — the customer has SEG eligibility but the install may not satisfy BS 7671. The four go together.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Anti-islanding — the safety rail under every grid-tied PV inverter</ContentEyebrow>

          <ConceptBlock
            title="Anti-islanding stops the PV inverter from energising a 'dead' grid"
            plainEnglish="When the local distribution network drops out — a fault on the cable in the road, a planned DNO outage, a transformer trip — every grid-tied inverter on that section of the network must stop exporting within milliseconds. Without anti-islanding the inverter would keep pushing energy into the dead network, energising cables that the DNO and the fire service believe are de-energised. ENA G98 and G99 define the protection settings; the inverter manufacturer demonstrates compliance through type approval; the installer commissions the unit per the manual."
            onSite="The L3 apprentice does not configure the anti-islanding settings — they are factory-set and locked on a G98 / G99-compliant inverter. But the apprentice should recognise the function exists, understand why it is non-negotiable, and know what symptoms a faulty anti-islanding system would show. A typical scenario: the inverter trips on a brief grid blip and refuses to reconnect for 60-180 seconds (deliberate reconnection delay per G98). Customer reports &quot;solar stops working sometimes&quot;; the apprentice recognises the reconnection delay as designed behaviour, not a fault, and explains it to the customer."
          >
            <p>
              The four protection layers on every G98 / G99 inverter:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Over-voltage / under-voltage trip</strong> — disconnects if the
                grid voltage moves outside the acceptable envelope (typically 207-253 V
                on UK single-phase). Standard G98 / G99 setting.
              </li>
              <li>
                <strong>Over-frequency / under-frequency trip</strong> — disconnects if
                grid frequency moves outside the acceptable envelope (47.5-51.5 Hz
                typical). Detects island formation because an islanded section drifts
                quickly.
              </li>
              <li>
                <strong>Loss of mains (LOM) detection</strong> — active or passive method
                detecting that the grid reference has been lost. Active methods inject
                a small frequency or voltage perturbation and watch for an unstable
                response. Required by G98 / G99.
              </li>
              <li>
                <strong>Reconnection delay</strong> — after a grid trip, the inverter
                stays disconnected for a defined hold-off period (typically 60-180
                seconds for G98, longer for G99) before attempting reconnection. Stops
                the inverter from oscillating in and out of an unstable network.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>DC string fusing and overcurrent protection</ContentEyebrow>

          <ConceptBlock
            title="DC overcurrent protection is configuration-specific — single string vs multi-string parallel"
            plainEnglish="A single PV string flowing into a single MPPT input on the inverter typically does NOT need a string fuse — the array short-circuit current is limited by the modules themselves and a fault cannot exceed it. Multiple strings paralleled into a single MPPT input typically DO need string fuses — a fault in one string can be back-fed by the parallel strings, exceeding the safe rating of any single string&apos;s cabling. The MCS-certified designer runs the calculation per IEC 62548 / the IET Code of Practice for Grid-Connected Solar PV; the apprentice fits per the design."
            onSite="On a typical UK domestic install with a single string per MPPT input, you will not see string fuses — the inverter input fuses are sufficient. On larger installs (commercial, agricultural, multi-string parallel) the apprentice will see DC string fuses in a combiner box at the array side, sized per the module short-circuit current with appropriate margin. Modern microinverter installs (Enphase) do not use traditional DC strings at all — each module has its own AC microinverter, so the DC overcurrent question disappears at the module boundary. Module-level optimiser systems (SolarEdge) still have a DC bus from the optimisers to the inverter; whether string fusing is needed depends on the topology."
          >
            <p>
              When string fusing is required:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Single string per MPPT input</strong> — typically no string fuse
                required. The inverter input fuses suffice. Most UK domestic 3-6 kWp
                installs.
              </li>
              <li>
                <strong>Two or three strings paralleled into one MPPT input</strong> —
                string fuses required because a faulted string can be back-fed by the
                parallel strings. Designer specifies fuse rating per the module data
                sheet and the IEC 62548 calculation.
              </li>
              <li>
                <strong>Microinverter systems (Enphase)</strong> — DC question disappears
                at the module boundary; AC trunk cable from microinverters to the
                consumer unit fuses on the AC side per Section 411.
              </li>
              <li>
                <strong>Module-level optimisers (SolarEdge)</strong> — depends on
                topology. The MCS-certified designer specifies.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The A4:2026 changes worth knowing</ContentEyebrow>

          <ConceptBlock
            title="A4:2026 has substantively refreshed Section 712 — what an L3 apprentice should know"
            plainEnglish="The A4:2026 amendment to BS 7671:2018 made significant changes to several sections, including a substantial refresh of Section 712 to reflect the modern PV-plus-battery world. The L3 apprentice does not need to memorise every clause but should recognise the headline changes that affect everyday installs from 2026 onwards."
            onSite="On a 2026-onwards install, the apprentice should expect: refined DC isolation requirements (clearer rules on roof-side isolators and module-level rapid shutdown), explicit treatment of microinverters and module-level power electronics (which barely existed when the original 18th Edition was drafted), clarified interaction with Section 826 on hybrid systems, updated labelling wording aligned with the IET Code of Practice, and tighter requirements on AC-side protection alongside the broader A4:2026 push on AFDDs in residential settings. The MCS-certified designer applies the detail; the apprentice recognises that &apos;Section 712 has changed&apos; is the right framing for any install paperwork older than 2026."
          >
            <p>
              The headline A4:2026 PV themes worth recognising:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Modern topology coverage</strong> — explicit treatment of
                microinverters, module-level optimisers, hybrid PV-battery inverters and
                AC-coupled retrofits. The original 18th Edition predated much of this
                kit.
              </li>
              <li>
                <strong>DC isolation refinement</strong> — clearer rules on roof-side
                isolators, module-level rapid shutdown, and the labelling that goes with
                them. Improves fire-fighter safety on rescue access.
              </li>
              <li>
                <strong>Section 826 interface clarification</strong> — hybrid PV-battery
                systems now have explicit guidance on how the two sections interact,
                replacing case-by-case interpretation.
              </li>
              <li>
                <strong>AFDDs in residential</strong> — the broader A4:2026 push on AFDDs
                in residential premises affects the AC side of PV installs in the
                consumer unit.
              </li>
              <li>
                <strong>Updated labelling wording</strong> — Section 514 plus 712-specific
                labels aligned with the IET CoP. Old labels from pre-2026 installs may
                read differently — they are not non-compliant retrospectively but new
                installs follow the updated wording.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>EICR scope on a property with PV</ContentEyebrow>

          <ConceptBlock
            title="An EICR on a PV-equipped property has additional checks beyond the standard"
            plainEnglish="A standard Electrical Installation Condition Report covers the property&apos;s electrical installation against BS 7671. On a PV-equipped property the EICR scope expands to cover the PV side as well — DC isolation function, AC isolation function, labelling per the current IET Code of Practice, generation-meter operation, anti-islanding behaviour (typically tested by deliberately opening the AC isolator and verifying the inverter trips and respects the reconnection delay), and visual inspection of the DC string cabling for UV degradation, mechanical damage and termination integrity."
            onSite="As the L3 electrician you may be the inspector. The L3 apprentice should recognise that periodic inspection of a PV install is a real scope — typically every 5 years for landlord properties under the Electrical Safety Standards in the Private Rented Sector regulations, and recommended at the same interval for owner-occupied. The IET Code of Practice for Grid-Connected Solar PV recommends an annual visual inspection plus the 5-year EICR; many MCS contractors offer the visual inspection as a paid annual aftercare contract. Defects on the PV side are coded against the BS 7671 framework; common findings are missing or degraded labels, inadequate DC isolation provision on older installs, and UV damage to DC string insulation."
          >
            <p>
              PV-specific EICR additions:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>DC isolator function</strong> — operate, verify isolation,
                inspect for damage and labelling integrity.
              </li>
              <li>
                <strong>Anti-islanding test</strong> — open the AC isolator, verify the
                inverter trips, verify the reconnection delay before re-energising.
              </li>
              <li>
                <strong>Labelling audit</strong> — every required label present, legible,
                and aligned with the current IET CoP wording. Replace faded or missing
                labels.
              </li>
              <li>
                <strong>DC string visual inspection</strong> — UV damage to insulation
                where exposed, mechanical damage at penetration points, termination
                integrity at the inverter and any combiner boxes.
              </li>
              <li>
                <strong>Generation meter check</strong> — confirm the meter is
                operational and the generation reading aligns with the inverter portal
                data within reasonable tolerance.
              </li>
              <li>
                <strong>Earthing and bonding verification</strong> — the array frame
                bonding (if specified by the design) and the inverter chassis earth
                continuity.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Treating the AC isolator as the only isolation point on a PV install"
            whatHappens={
              <>
                Apprentice opens the AC isolator at the consumer unit, assumes the inverter is now de-energised, and starts work on the inverter terminals. The DC side of the inverter is still live — sunlight is still hitting the panels and pushing 350-600 V DC into the inverter input terminals. Worker takes a serious DC shock from cable terminations they thought were dead.
              </>
            }
            doInstead={
              <>
                Open the DC isolator before any work on the inverter or DC strings. Verify dead with an appropriate DC-rated tester (an AC-only voltmeter may not register DC fault voltages reliably). Confirm the inverter has discharged — capacitors inside hold residual voltage for some time after isolation. The IET Code of Practice gives the recommended sequence. Section 712 mandates the isolator; using it correctly is the apprentice's responsibility every time.
              </>
            }
          />

          <CommonMistake
            title="Skipping PV-specific labelling and assuming generic CU labels are enough"
            whatHappens={
              <>
                Apprentice fits the AC isolator and the consumer unit RCBO for the PV final circuit but only labels them as 'isolator' and 'PV'. The DC isolator at the inverter is unlabelled. The consumer unit has no dual-supply notice. Three years later the customer calls a different electrician for an unrelated job; the new electrician does not realise the property has PV until they open the consumer unit and find an unlabelled feeder coming in. Investigation time wasted; safety concern raised.
              </>
            }
            doInstead={
              <>
                Use the labelling wording recommended by the IET Code of Practice — 'PV DC ISOLATOR — OPEN BEFORE WORKING ON INVERTER OR DC CABLES — ARRAY REMAINS ENERGISED IN LIGHT'; 'PV AC ISOLATOR'; 'WARNING — DUAL SUPPLY — DO NOT WORK ON THIS INSTALLATION WITHOUT ISOLATING BOTH GRID AND PV SUPPLY' on the CU. External label identifying the property as PV-equipped. The labels are cheap; the operational and safety value is high.
              </>
            }
          />

          <Scenario
            title="Apprentice on a 5 kWp PV plus 5 kWh battery hybrid install"
            situation={
              <>
                You are the apprentice on a 5 kWp PV plus 5 kWh battery hybrid install at a 2010s detached house. The MCS-certified designer (holding both MIS 3002 and MIS 3012) has specified a SolarEdge hybrid inverter with module-level DC optimisers, a wall-mounted LFP battery, and the standard package of DC isolation, AC isolation, dual-supply labelling and rapid-shutdown labelling. The DNO connection is being notified under G98 because the inverter rating sits inside the 16 A per phase threshold. Cable runs include the PV DC strings from roof to inverter via a steel conduit through the loft, the battery DC connection (short run inside the same plant cupboard as the inverter), the inverter AC output to a new RCBO in the consumer unit, the BMS comms cable from battery to inverter, and Cat6 to the inverter location for the SolarEdge monitoring portal.
              </>
            }
            whatToDo={
              <>
                First fix: pull PV DC strings through the steel conduit from roof to plant cupboard; pull AC supply from CU to plant cupboard; pull Cat6 to plant cupboard. Second fix: terminate PV DC strings at the inverter with the DC isolator on the source side; terminate battery DC connection per the hybrid inverter manual; install BMS comms cable per the manufacturer's specified pinout; terminate AC output to the new RCBO in the CU; install dual-supply notice on the CU; install PV DC isolator label per the IET CoP wording; install external 'PV INSTALLED' label near the meter cabinet. Coordinate commissioning with the MCS designer: PV side energised first, battery side commissioned, integrated test (PV charging battery, battery discharging through inverter to property), G98 notification submitted within 28 days. Customer handover including the integrated documentation pack covering both Section 712 (PV) and Section 826 (battery) sides.
              </>
            }
            whyItMatters={
              <>
                Hybrid PV-battery installs are increasingly the norm in 2024-2026. The L3 apprentice should expect to encounter them and recognise that two BS 7671 sections (712 and 826), two MCS standards (MIS 3002 and MIS 3012), two IET Codes of Practice and one ENA G98 notification all apply. Recognising the regulation map is half the job; executing the wiring per the design is the other half.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 712 scope"
            clause={
              <>
                Requirements of Section 712 shall apply to PV installations not connected to a
                system for distribution of electricity to the public, in parallel with a system
                for distribution of electricity to the public, and as an alternative to a system
                for distribution of electricity to the public.
              </>
            }
            meaning={
              <>
                Section 712 doesn&apos;t care whether the array is grid-tied, off-grid or
                replacement-supply — the same regulation applies to all three. A4:2026
                expanded and rewrote the section. Read the manufacturer&apos;s instructions
                alongside Section 712 and the relevant MCS MIS 3002 standard for installer
                competence.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Section 712 — verbatim from published facets."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 421.1.7 (Arc fault detection devices)"
            clause={
              <>
                Regulation 421.1.7 has been introduced recommending the installation of arc
                fault detection devices (AFDDs) to mitigate the risk of fire in AC final
                circuits of a fixed installation due to the effects of arc fault currents.
              </>
            }
            meaning={
              <>
                For PV AC sub-circuits, AFDDs are recommended in BS 7671 itself — and high-rise
                residential buildings (HRRBs) bring AFDDs in as a mandatory measure via the
                Building Safety Act 2022 framework. On a typical domestic PV install you&apos;ll
                see AFDDs increasingly fitted on the AC inverter feed even though the regulation
                stops at recommendation.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 421.1.7 — verbatim from published facets."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "BS 7671 Section 712 applies to every UK PV install — off-grid, grid-parallel and grid-alternative. A4:2026 has substantially refreshed the section to reflect modern PV technology.",
              "DC isolation is the unique PV requirement — sunlight keeps the modules energised, so the DC isolator is the only safe means of working on the inverter or DC strings.",
              "Section 712 (PV) and Section 826 (storage) apply together on hybrid PV-battery systems. The hybrid inverter must satisfy both regulation strands.",
              "Anti-islanding is the safety-critical inverter feature that disconnects on grid loss, preventing the inverter from feeding an unintentionally islanded section of the local network. Defined in ENA G98 / G99.",
              "DC overcurrent protection on the string side is configuration-specific — single string typically does not need fuses, multi-string in parallel typically does. The MCS designer runs the calculation.",
              "Labelling is non-glamorous but legally and operationally important. Multiple labels at multiple locations per Section 514 plus the IET Code of Practice PV-specific wording.",
              "Four-document map applies to every UK PV install — BS 7671 Section 712 (legal), IET CoP (practical), MCS MIS 3002 (installer / SEG), ENA G98 / G99 (grid).",
              "The MCS-certified designer holds the documentation map together. The apprentice's wiring satisfies BS 7671; the install paperwork satisfies MCS; both contribute to a compliant install the customer can claim SEG on.",
            ]}
          />

          <Quiz title="BS 7671 Section 712 deeper — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section1-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.5 Whole-system integration
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section2-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.2 BS 7671 Section 722 (EV)
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
