/**
 * Module 2 · Section 4 · Subsection 2 — BS 7671 Section 712/722/753 + ENA G98/G99
 * Maps to City & Guilds 2365-03 / Unit 301 / LO2 / AC 2.1 + AC 2.2
 *   AC 2.1 — "state the relevant Building Regulations and other statutory and
 *             non-statutory requirements for the installation and maintenance of
 *             environmental technology systems"
 *   AC 2.2 — "describe the impact of environmental legislation on electrical
 *             installation work"
 *
 * Layered depth: 2357 Unit 602 ELTK02 / AC 1.4 (Building Regulations and Code for
 * Sustainable Homes for electrical installations).
 *
 * Note: Unit 301 is a 6-AC overview unit. Detailed BS 7671 application for PV / EV /
 * heating belongs in MCS standalone quals (2399 / 2921). This Sub gives the L3
 * electrician the regulatory map of which BS 7671 section applies to which
 * environmental tech, plus the ENA grid-connection framework.
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
  VideoCard,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'BS 7671 Section 712/722/753 + ENA G98/G99 (4.2) | Level 3 Module 2.4.2 | Elec-Mate';
const DESCRIPTION =
  'BS 7671:2018+A4:2026 Section 712 (PV), Section 722 (EV charging) and Section 753 (heating cables and embedded heating systems) plus ENA Engineering Recommendation G98 / G99 for parallel-connected generators. The electrical regulatory map for environmental technology systems on UK installs.';

const checks = [
  {
    id: 'l3-m2-s4-sub2-section-712-scope',
    question:
      'A customer has a PV array that\'s grid-connected via a hybrid inverter with battery storage, with optional islanded operation in a power cut. Which BS 7671 section governs the electrical install?',
    options: [
      "Section 551 'Low voltage generating sets'. Because the system contains a battery inverter that can run in islanded mode, it is classed as a standby generating set and the whole install is governed by Section 551 rather than by any PV-specific section. Section 712 only applies to grid-tied PV with no battery.",
      "Section 826 'Electrical energy storage systems'. Once a battery is added the installation is treated as an EESS and Section 826 takes over from Section 712 entirely, covering the PV array, the inverter and the battery as a single storage system. Section 712 no longer applies once storage is present.",
      "Section 717 'Mobile or transportable units'. A hybrid inverter that can island and run the property independently is treated as a transportable supply unit, so Section 717 governs the install in place of the PV-specific provisions.",
      "Section 712 of BS 7671:2018+A4:2026 — the PV special-installation chapter. It covers PV whether off-grid, in parallel with public distribution, or as an alternative to it, so a hybrid PV-plus-battery system with islanded mode falls within its scope.",
    ],
    correctIndex: 3,
    explanation:
      "Section 712 is the special-installation chapter for PV. It explicitly applies to PV installations not connected to public distribution, in parallel with it, or as an alternative to it — a hybrid inverter with battery and islanded mode falls within all three scopes at different operating moments. It sits in Part 7 (Special Installations or Locations) and applies in addition to the general requirements of Parts 1-6. The A4:2026 amendment extensively revised and expanded Section 712 to address modern PV-plus-storage architectures, so designers and installers must apply the current text. Detailed application is taught in MCS qualification 2399; Unit 301 requires you to recognise that Section 712 is the regulatory home for the electrical detail.",
  },
  {
    id: 'l3-m2-s4-sub2-section-722-pen-fault',
    question:
      'On a PME-supplied domestic property, what does Section 722 require regarding the EV charging point\'s earthing arrangement?',
    options: [
      "Nothing special — on a PME supply the EV charge point simply connects to the existing main earthing terminal like any other circuit. Because PME already provides a low-impedance earth, no additional protection is needed and a standard Type AC RCD is sufficient for the charging circuit.",
      "Section 722 requires the entire installation to be converted from PME to a TT earthing arrangement before any EV charge point can be fitted. The DNO must replace the PME service with a separate earth electrode for the whole property, and only then can the charge point be added on the new TT system.",
      "Section 722 requires the open-PEN risk on PME to be managed by either an open-PEN protection device (built into most modern charging units) or an earth electrode for the vehicle chassis (TT arrangement at the charge point). On PME a broken PEN can raise the vehicle's exposed-conductive-part toward line voltage relative to true earth.",
      "Section 722 requires only that the charge point be bonded to the gas and water services with a 10 mm² main bonding conductor. The PEN-fault risk is addressed by improving the main equipotential bonding rather than by any device at the charge point, so no open-PEN protection or earth electrode is needed.",
    ],
    correctIndex: 2,
    explanation:
      "The PEN-fault risk on EV charging is the specific Section 722 issue. Modern chargers from major manufacturers usually include the open-PEN protection function, which simplifies the install. Where the manufacturer's unit doesn't include it, the installer must provide an earth electrode and convert the EV chassis to a TT earthing arrangement. The 2025+ A4:2026 amendments refined the requirements; the certified installer applies them to each install.",
  },
  {
    id: 'l3-m2-s4-sub2-g98-vs-g99',
    question:
      'A property has an existing 4 kWp PV system on a G98-notified single-phase inverter. The customer wants to add 5 kWh of battery storage with a separate grid-connection inverter rated 3 kW single-phase. What\'s the connection notification path?',
    options: [
      "G99 pre-application. Even though each individual inverter is below the 16 A G98 threshold, G99 applies to any generator added at a site that already has a pre-existing G98 or G99 generator, so the DNO assesses the combined export capacity before the connection can be commissioned.",
      "No notification at all. Battery storage does not generate energy itself, so it is not a generator under the ENA Engineering Recommendations. Only the original PV array needed notifying, and adding battery storage on its own inverter is exempt from both G98 and G99 regardless of its export capability.",
      "A second G98 fast-track notification. Because the new battery inverter is only 3 kW (below 16 A single-phase), it qualifies for G98 in its own right. The installer simply submits a second G98 notification within 28 days of commissioning, the same as the original PV system, and no DNO pre-approval is required.",
      "A building-control Part P notification only. Adding battery storage is treated as new fixed wiring rather than as generation, so the connection path is via the competent-person scheme to Building Control. The DNO is not involved because the export capacity is unchanged from the existing PV system.",
    ],
    correctIndex: 0,
    explanation:
      "The 'first generator G98, second generator G99' rule catches a lot of installers out. Battery storage with grid-export capability is a generator under G98/G99, even though it doesn't generate energy itself. The combined export from PV + battery export inverter can exceed the 16 A G98 limit even if neither individual inverter does. The G99 application timeline (weeks to months depending on the DNO) needs to be factored into the customer's commissioning expectations.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What is BS 7671 Section 712 and what does it cover?',
    options: [
      "Section 712 'Solar thermal hot water systems' is the special-installations chapter of BS 7671 covering the electrical aspects of solar water heating — the pump, the controls and the immersion back-up. It does not cover photovoltaic systems, which are dealt with under the general requirements of Parts 1 to 6 rather than under a dedicated Part 7 section.",
      "Section 712 'Solar photovoltaic (PV) power supply systems' is the Part 7 special-installations chapter covering electrical requirements for PV installations — off-grid, in parallel with public distribution, or as an alternative to it. The content was extensively revised in BS 7671:2018+A4:2026.",
      "Section 712 is the chapter of BS 7671 dealing with battery energy storage systems. It covers battery isolation, the BMS, fire-stopping around the battery and ventilation of the storage enclosure. PV arrays are covered separately under Section 722, which Section 712 cross-references for the DC-side requirements.",
      "Section 712 is a guidance appendix rather than a numbered section of BS 7671. It sets out informative recommendations for renewable generation and carries no mandatory force; the actual requirements for PV are found in the IET Code of Practice for Grid-Connected Solar PV, which the appendix points to.",
    ],
    correctAnswer: 1,
    explanation:
      "Section 712 is one of the special-installation chapters of BS 7671 and applies in addition to the general requirements of Parts 1-6. Its topics include array DC voltage and isolation, DC and AC overcurrent protection, additional protection by RCD, equipotential bonding of array frames, signage and labelling, anti-islanding requirements, and PV-specific inspection and test. The A4:2026 amendment was significant — installers and designers must apply the current text. As an apprentice on Unit 301 you should recognise the section number and its scope; detailed application sits with the MCS-certified PV designer.",
  },
  {
    id: 2,
    question:
      'What is BS 7671 Section 722 and what does it cover?',
    options: [
      "Section 722 'Caravan and camping parks' is the special-installations chapter covering EV charging because most early charge points were installed at campsites. It sets out the pitch-supply requirements and the additional protection for outdoor sockets, and domestic EV charge points are installed to the same section by analogy.",
      "Section 722 'Agricultural and horticultural premises' is the chapter that governs EV charging, since the first vehicle-charging provisions were written for electric farm machinery. It covers the additional RCD protection and the robust enclosures needed in harsh outdoor environments, which is why it now applies to EV points generally.",
      "Section 722 'Electric vehicle charging installations' is the special-installations chapter of BS 7671 covering electrical requirements for EV charging points — including PEN-fault protection on PME supplies and RCD selection. It was significantly amended in BS 7671:2018+A4:2026.",
      "Section 722 'Marinas and similar locations' is the chapter applied to EV charging because both involve supplying vehicles or vessels in damp outdoor conditions. It sets the isolation and RCD requirements for shore-supply pedestals, and EV charge points borrow these provisions for the home charging circuit.",
    ],
    correctAnswer: 2,
    explanation:
      "Section 722 is the BS 7671 home for EV charging. Its topics include circuit design for the charging point, RCD selection (Type B or RDC-DD with DC fault detection), protection against the PEN-fault risk on PME supplies, isolation, and EV-specific inspection and test. The A4:2026 amendment refined RCD requirements and PEN-fault protection. As an apprentice you'll see Section 722-compliant kit on every EV charging install; the certified installer makes the regulatory judgement calls and the install pack documents Section 722 compliance.",
  },
  {
    id: 3,
    question:
      'What is BS 7671 Section 753 and what does it cover?',
    options: [
      "Section 753 'Floor and ceiling heating systems' covers only wet underfloor heating fed from a boiler or heat pump — the pipework layout, the manifold and the zone valves. Electric heating cables are excluded from Section 753 and are covered instead by the general requirements of Chapter 52 on wiring systems.",
      "Section 753 'Saunas and hot-air rooms' covers the electric heaters used in sauna cabins, setting the temperature zones and the IP ratings for accessories inside the cabin. It does not extend to underfloor heating or de-icing systems, which fall under separate special-location sections.",
      "Section 753 'Exhibitions, shows and stands' covers temporary electric heating used at events. It sets out the additional protection and inspection intervals for portable and embedded heaters at temporary installations, but does not apply to permanent embedded floor or ceiling heating in dwellings.",
      "Section 753 'Heating cables and embedded heating systems' covers electric heating cables embedded in floors, walls or ceilings, plus surface heating and de-icing / frost-prevention applications. The A4:2026 amendment completely revised and retitled it.",
    ],
    correctAnswer: 3,
    explanation:
      "Section 753 is relevant where heating cables form part of the install — typical in electric underfloor heating (LWHS — low-watt heating systems), trace heating on outdoor pipework, de-icing on gutters and roofs. The A4:2026 revision extended its scope, retitled it, and added new requirements relocated from Chapter 53 covering impact protection and installation of heating cables; industrial heating systems complying with BS EN 60519, BS EN 62395 and BS EN 60079 are excluded. Heat-pump-fed wet underfloor heating typically uses water pipes (governed by general Part 4-6 requirements, not Section 753). The complete revision in A4:2026 is one of the major changes designers and installers need to apply.",
  },
  {
    id: 4,
    question:
      'What\'s the practical 16 A per phase boundary for ENA G98 vs G99?',
    options: [
      "G98 fast-track applies to type-tested generators up to and including 16 A per phase per inverter (16 A × 230 V = 3.68 kW single-phase). Above that, or for any added generator at a site with pre-existing G98/G99, G99 pre-application applies with a DNO assessment timeline.",
      "The boundary is 16 kW per phase, not 16 A. G98 covers any single-phase generator up to 16 kW (the size of a large domestic array), and only commercial-scale systems above that need G99. A typical 4 kW domestic inverter sits comfortably inside the G98 range with no DNO assessment.",
      "The boundary is 3.68 A per phase. G98 applies only to micro-generators below 3.68 A (roughly 850 W), so almost all domestic PV inverters fall under G99 and require DNO pre-approval before commissioning regardless of how small the array is.",
      "There is no current boundary — the split between G98 and G99 is by technology, not by output. PV always notifies under G98 and battery storage always under G99, irrespective of the inverter rating per phase.",
    ],
    correctAnswer: 0,
    explanation:
      "The 16 A per phase per inverter boundary is a fundamental design constraint on UK domestic generation, and inverter manufacturers split product ranges around it — most domestic 4 kW PV inverters are deliberately limited to 3.68 kW max output to stay G98-eligible. Anything above triggers G99 with a DNO assessment timeline of weeks to months depending on the local network. Battery storage with grid-export capability counts toward the G98/G99 capacity. The MCS-certified installer manages the application; the apprentice should recognise which regime applies and the timeline implications.",
  },
  {
    id: 5,
    question:
      'What does anti-islanding mean in the context of grid-connected generators, and why is it a safety-critical requirement?',
    options: [
      "Anti-islanding is the inverter's ability to keep the property's lights on during a grid power cut by 'islanding' the home from the failed network. It is a required customer-convenience feature, and ENA G98/G99 mandate that every domestic inverter must be able to continue supplying the property when the grid drops out.",
      "Anti-islanding requires a grid-connected generator to disconnect when the public distribution grid fails, even though it could in principle keep exporting. The safety reason: a generator still exporting into a network the DNO has isolated for repair would expose line workers to conductors they believe are dead.",
      "Anti-islanding is the protection that stops two adjacent PV systems on the same street from feeding each other when one trips. It isolates a property's array from its neighbours' arrays, preventing one inverter from back-feeding another, and is enforced through the smart meter rather than the inverter.",
      "Anti-islanding is the surge-protection function that disconnects the inverter during a lightning strike or transient overvoltage. It guards the expensive power electronics against the grid spikes that occur when a nearby fault clears, and ENA G98/G99 set the let-through voltage limits it must achieve.",
    ],
    correctAnswer: 1,
    explanation:
      "Anti-islanding is one of the safety-critical requirements of grid-connected generation. Without it the grid could be 'islanded' by local generators after a DNO trip, putting line workers at risk during fault repair. Customers who want backup operation (lights stay on in a power cut) need either a hybrid inverter with deliberate islanded operation (which switches an internal Automatic Transfer Switch to disconnect from the grid before continuing to power local loads) or a separate ATS-and-battery arrangement. The certified installer handles both; the apprentice should recognise the limitation when explaining to customers.",
  },
  {
    id: 6,
    question:
      'What signage does BS 7671 Section 712 (and the MCS Code) require at the consumer unit / meter position on a PV-equipped property?',
    options: [
      "Just the standard 'Danger 230 V' warning label found at any consumer unit. A PV property needs no special signage because the inverter automatically disconnects on grid failure, so a maintainer who isolates the main switch is fully protected and there is nothing extra to warn them about.",
      "A label stating the date of the last EICR and the recommended date of the next inspection. This is the only labelling Section 712 requires at the meter position; the warning about on-site generation is placed at the inverter only, not at the consumer unit, because that is where the generator physically sits.",
      "Durable warning signs telling anyone working on the installation there is a parallel generation source on site — at the consumer unit, the main isolation, the inverter and any DC isolators — plus the DNO emergency contacts and the PV system identification.",
      "A green 'Smart Export Guarantee' sticker showing the supplier and the export tariff. This is the required label at the meter, placed so the energy supplier's meter reader can confirm the export arrangement; no warning label about the generation source itself is required at the consumer unit.",
    ],
    correctAnswer: 2,
    explanation:
      "Signage is a safety-critical requirement, not paperwork bureaucracy. A maintainer arriving without knowing about an on-site generator can expose themselves to live conductors after they've isolated the main switch. The signage convention is durable, visible, and at every isolation point. The MCS Code specifies the durable label format; BS 7671 Section 712 references the requirement; the DNO's connection conditions reinforce it.",
  },
  {
    id: 7,
    question:
      'What\'s the role of RDC-DD (Residual Direct Current Detecting Device) in EV charging, and where is it required under Section 722?',
    options: [
      "An RDC-DD is the residual-current device that protects the DC side of a PV array between the panels and the inverter. Section 722 requires one on every string so that a DC earth fault in the array is detected and disconnected; it has no application to EV charging, which is purely an AC circuit.",
      "An RDC-DD is a dwell-time delay device that holds the EV charge point off for a few seconds after power is restored, preventing all the local chargers from drawing inrush at once. Section 722 requires it on every charge point to protect the supply fuse from simultaneous restart currents.",
      "An RDC-DD is the data-communications module that lets a smart charger talk to the energy supplier for off-peak charging. Section 722 requires it so the charge point can comply with the Smart Charge Points Regulations; it performs no electrical protection function.",
      "An RDC-DD adds smooth-DC fault detection to a Type A RCD. Modern EV chargers can leak smooth DC under fault, which a Type AC RCD won't trip on, so Section 722 requires either a Type B RCD or a Type A RCD plus an RDC-DD.",
    ],
    correctAnswer: 3,
    explanation:
      "Smooth DC fault current is a specific issue for EV charging due to the topology of modern onboard chargers. Type B RCD (which detects AC, pulsating DC and smooth DC) or Type A + RDC-DD covers it; the cheaper Type AC RCD is not adequate. The RDC-DD route is often cheaper than fitting a Type B RCD because Type A RCDs are widely available and inexpensive, and the customer doesn't see the difference. Section 722 in A4:2026 refined the requirements; the manufacturer's instructions for the EV charging unit usually specify exactly what protection arrangement is required.",
  },
  {
    id: 8,
    question:
      'How does the L3 electrician\'s role differ between an MCS-certified install and a non-MCS install, in terms of BS 7671 compliance?',
    options: [
      "BS 7671 applies regardless of whether the install is MCS-certified — it's the electrical safety regulation. The L3 electrician's BS 7671 responsibility (design, install, inspection and test, EIC) is identical on either route; MCS only changes the customer's funding and warranty access.",
      "BS 7671 only applies to MCS-certified installs. The MCS scheme adopts BS 7671 as its technical standard, so on an MCS job the electrician must produce a full EIC, whereas on a non-MCS install a simple Minor Works certificate is sufficient because the Wiring Regulations do not bite.",
      "On a non-MCS install the electrician follows BS 7671, but on an MCS install they follow the MCS Installation Standards instead, which replace the Wiring Regulations. The two routes apply different technical rules, and an EIC is only needed on the non-MCS route.",
      "BS 7671 compliance is the certified installer's responsibility on an MCS job and the customer's responsibility on a non-MCS job. The L3 electrician only carries the BS 7671 duty when the install is non-MCS; on MCS work the inspection and testing is taken over by the MCS scheme assessor.",
    ],
    correctAnswer: 0,
    explanation:
      "The MCS / non-MCS split is a financial / quality scheme distinction. BS 7671 is the electrical safety regulation that applies always. The L3 electrician's electrical inspection-and-test responsibility is identical on either route. The customer-facing conversation about MCS is about funding access; the regulatory floor of BS 7671 compliance is the same.",
  },
];

const faqs = [
  {
    question: "Does the A4:2026 amendment of BS 7671 apply immediately or is there a transition period?",
    answer:
      "The A4:2026 amendment was published with an effective date that gives the industry a transition period before mandatory application — installations whose erection commenced before the effective date can be completed to the previous amendment. New installations from the effective date forward must comply with A4:2026. The IET publishes the effective dates and any transition arrangements; check the IET website for the current position. As an apprentice in 2026 you should be aware that A4:2026 includes significant changes to Sections 712 (PV), 722 (EV) and 753 (heating cables) — the three sections most relevant to environmental tech.",
  },
  {
    question: "If the manufacturer's instructions disagree with BS 7671, which wins?",
    answer:
      "BS 7671 is the regulatory floor — manufacturer instructions can be more restrictive than BS 7671 but cannot relax BS 7671 requirements. Where the manufacturer specifies (e.g.) a Type B RCD, that's binding even if BS 7671 in principle accepts a Type A. Where the manufacturer is silent on a point, BS 7671 fills the gap. Where the two genuinely conflict (rare) the safer / more restrictive requirement applies and you should refer the conflict to the certified installer / designer for written direction.",
  },
  {
    question: "What's the relationship between BS 7671 and the IET Wiring Regulations?",
    answer:
      "They are the same document. BS 7671 is the British Standard published jointly by the BSI and the IET; the IET publishes the user-facing version as the 'IET Wiring Regulations 18th Edition' (currently). Same content, different branding. Reference either as appropriate to the audience — 'BS 7671 Section 712' is the technical reference, 'the Wiring Regs' is the colloquial reference.",
  },
  {
    question: "Is the DNO a regulator?",
    answer:
      "The DNO (Distribution Network Operator — UK Power Networks, National Grid Electricity Distribution, etc.) is the operator of the local public distribution network at low and medium voltage. They are not a regulator (Ofgem is the regulator for the energy networks) but they enforce connection conditions on customers and generators connecting to their network — including ENA G98 / G99 for parallel generators. As the L3 electrician on a generation install you interact with the DNO via the certified installer's G98/G99 application; you don't typically deal with the DNO directly except for emergency / outage matters.",
  },
  {
    question: "What's the timeline impact of G99 on the customer's install date?",
    answer:
      "G99 pre-application timelines vary by DNO and by local network conditions. Simple connections (clear network capacity, standard inverter) can be approved in 2-4 weeks. Constrained networks, large systems or new substations can require months. The customer must be told this up front — the install can't commission until DNO approval. The MCS-certified installer manages the application and provides timeline expectations. As the apprentice you should never quote a commission date for a G99 install without confirmation from the certified installer.",
  },
  {
    question: "Does battery storage without grid-export capability still trigger G98/G99?",
    answer:
      "If the battery system is genuinely incapable of exporting to the grid (some inverters can be configured to charge from grid but never export; others have export-disable features), it doesn't trigger G98/G99. But many domestic battery systems are paired with a hybrid inverter that can export, so check the specific install configuration. The G98/G99 trigger is the export capability, not the storage itself. Where in doubt, the certified installer makes the assessment.",
  },
];

export default function Sub2() {
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
            eyebrow="Module 2 · Section 4 · Subsection 2"
            title="BS 7671 Section 712/722/753 + ENA G98/G99"
            description="The electrical regulatory map for environmental tech — Section 712 (PV), Section 722 (EV), Section 753 (heating cables) of BS 7671:2018+A4:2026, plus ENA Engineering Recommendation G98/G99 for parallel-connected generators."
            tone="emerald"
          />

          <TLDR
            points={[
              "BS 7671:2018+A4:2026 has three special-installation chapters most relevant to environmental tech — Section 712 (PV, extensively revised), Section 722 (EV charging, significantly amended), Section 753 (heating cables, completely revised).",
              "Each special-installation chapter applies in addition to the general requirements of Parts 1-6 of BS 7671. They're not standalone — they layer on top.",
              "ENA Engineering Recommendation G98 fast-track applies up to 16 A per phase per inverter (3.68 kW single-phase). G99 pre-application required above that — and for all generators at sites with pre-existing G98/G99 connections.",
              "Anti-islanding under G98/G99 requires the inverter to disconnect when the grid fails. Customer backup operation needs hybrid inverter with deliberate island mode or separate ATS-and-battery.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify BS 7671:2018+A4:2026 Section 712 as the special-installation chapter for solar PV electrical requirements.",
              "Identify BS 7671:2018+A4:2026 Section 722 as the special-installation chapter for EV charging electrical requirements, including the PEN-fault protection requirement on PME supplies.",
              "Identify BS 7671:2018+A4:2026 Section 753 as the special-installation chapter for heating cables and embedded heating systems.",
              "Distinguish ENA G98 fast-track notification (≤16 A per phase per inverter) from G99 pre-application (&gt;16 A per phase, or any second generator at a site with pre-existing G98/G99).",
              "Explain anti-islanding as a safety-critical requirement of grid-connected generators — protects line workers during DNO fault response.",
              "Recognise the signage requirements at consumer unit / meter position for environmental tech installs and their role in maintainer safety.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Section 712 — Solar PV</ContentEyebrow>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 712 'Solar photovoltaic (PV) power supply systems'"
            clause={
              <>
                <p className="mb-2">
                  Section 712 has been extensively revised and expanded in the A4:2026
                  amendment. The scope is unambiguous: &quot;The requirements of this section
                  shall apply to PV installations:
                </p>
                <ul className="space-y-1 list-disc pl-5 mb-2">
                  <li>not connected to a system for distribution of electricity to the public;</li>
                  <li>in parallel with a system for distribution of electricity to the public; and</li>
                  <li>as an alternative to a system for distribution of electricity to the public.&quot;</li>
                </ul>
                <p>
                  Topics within Section 712 include array DC voltage and isolation, DC and
                  AC overcurrent protection, additional protection by RCD where required,
                  equipotential bonding of array frames, signage and labelling, anti-
                  islanding requirements at the AC interface, and PV-specific inspection
                  and test.
                </p>
              </>
            }
            meaning={
              <>
                Section 712 is the electrical regulatory home for every PV installation in
                the UK — grid-connected, off-grid, and hybrid with battery storage. The
                A4:2026 revision was material — designers and installers must apply the
                current text. Section 712 sits in Part 7 of BS 7671 (Special Installations
                or Locations) and applies in addition to the general requirements of Parts
                1-6. Detailed application is taught in MCS qualification 2399.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Section 712 (paraphrased from the published amendment text — full content in IET Wiring Regulations 18th Edition, A4:2026)."
          />

          <VideoCard
            url={videos.inverter.url}
            title={videos.inverter.title}
            channel={videos.inverter.channel}
            duration={videos.inverter.duration}
            topic="The PV / hybrid inverter — what Section 712 actually regulates"
            caption={
              <>
                Section 712 is built around the inverter as the AC / DC interface. The Engineering
                Mindset opens an inverter and walks the IGBT bridge, MPPT and anti-islanding —
                useful context before you read the regs and the G98 / G99 grid-connection rules
                below.
              </>
            }
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Section 722 — EV charging</ContentEyebrow>

          <ConceptBlock
            title="The PEN-fault risk on PME supplies — Section 722's headline issue"
            plainEnglish="On a PME (TN-C-S) supply the supply earth is derived from the supply neutral via the PEN conductor in the service head. If the PEN conductor opens (broken, corroded, or DNO fault), the property's earth references rises toward line voltage relative to true earth. Any exposed-conductive-part inside the property — including an EV vehicle chassis connected to the property earth via the charger — can become live to true earth. Section 722 requires this risk to be managed, either via an open-PEN protection device built into the charger, or via a TT earth electrode for the EV chassis."
            onSite="Modern EV chargers from major manufacturers (Wallbox, Zappi, Hypervolt, Easee, etc.) usually include an integrated open-PEN protection function that disconnects the charger if PEN-fault is detected via voltage-rise sensing. Where the chosen unit doesn't include the function, the certified installer provides a local earth electrode and converts the EV to a TT earthing arrangement at the charge point. Section 722 (significantly amended in A4:2026) spells out the conditions; the certified installer applies them."
          >
            <p>
              The Section 722 specifics for an EV charging install:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>RCD selection</strong> — Type B RCD (detects AC, pulsating DC and
                smooth DC) OR Type A RCD plus RDC-DD (residual direct current detecting
                device that adds smooth-DC detection to a Type A RCD). Type AC RCD is not
                adequate for EV charging.
              </li>
              <li>
                <strong>PEN-fault protection</strong> — open-PEN protection device built
                into the charger, OR earth electrode for TT-earthed EV.
              </li>
              <li>
                <strong>Isolation</strong> — local accessible isolation at the charge point,
                dedicated MCB at the consumer unit.
              </li>
              <li>
                <strong>Cable selection</strong> — sized for sustained continuous load
                (charging sessions of hours), with thermal capacity the design constraint.
              </li>
              <li>
                <strong>Smart-charging compliance</strong> — the Smart Charge Point
                Regulations 2021 require demand-side response capability on units sold for
                installation. A separate regulation from BS 7671 but bites at the same
                install.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 722 'Electric vehicle charging installations'"
            clause={
              <>
                Section 722 has been significantly amended in A4:2026 to reflect updated
                requirements for EV charging installations, including refinements to RCD
                selection, open-PEN protection requirements for PME-supplied installations,
                and integration with smart-charging functionality. Regulation 715.524.201
                within Chapter 71 confirms that Section 722 covers electric vehicle charging
                installations.
              </>
            }
            meaning={
              <>
                Section 722 sits in Part 7 of BS 7671. The A4:2026 amendments are material —
                designers and installers must apply the current text. The PEN-fault risk
                management is the section&apos;s headline technical issue. As Unit 301 is
                overview level, recognise where Section 722 sits and what its main concerns
                are; detailed application is taught in EV-specific qualification 2921.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Section 722 (paraphrased from the published amendment text)."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Section 753 — Heating cables and embedded heating systems</ContentEyebrow>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 753 'Heating cables and embedded heating systems'"
            clause={
              <>
                Section 753 has been completely revised and retitled in A4:2026. Its scope
                has been extended to apply to embedded electric heating systems for surface
                heating. The requirements apply to electric heating systems for de-icing,
                frost prevention and similar applications and cover both indoor and outdoor
                systems. New regulations have been added (relocated from Chapter 53)
                covering impact protection and the installation of heating cables.
                Industrial and commercial heating systems complying with BS EN 60519,
                BS EN 62395 and BS EN 60079 are not covered by this section.
              </>
            }
            meaning={
              <>
                Section 753 is the special-installation chapter for electric heating cables
                — typically used in electric underfloor heating, trace heating on outdoor
                pipework, and de-icing on gutters and roofs. Pure water-based underfloor
                heating fed by a heat pump uses water pipes (not heating cables) and is
                governed by general Part 4-6 requirements, not Section 753. Hybrid systems
                combining wet underfloor with electric trace heating fall within Section 753.
                The complete revision in A4:2026 is one of the major changes designers and
                installers need to apply.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Section 753 (paraphrased from the published amendment text)."
          />

          <SectionRule />

          <ContentEyebrow>ENA G98 / G99 — the grid-connection regime</ContentEyebrow>

          <ConceptBlock
            title="One framework, two thresholds, all parallel-connected generators"
            plainEnglish="Every parallel-connected generator in the UK — PV, wind, micro-hydro, micro-CHP, battery storage with grid-export — connects under one of two ENA Engineering Recommendations. G98 is a fast-track notification process for inverters at or below 16 A per phase per inverter (3.68 kW single-phase). G99 is a pre-application process for anything bigger. The DNO uses the G98/G99 application to assess the impact on the local network and confirm or qualify the connection."
            onSite="The MCS-certified installer submits the G98 / G99 paperwork. As an apprentice you should know which scheme applies (look at the inverter rating and check for any pre-existing on-site generation) and what the timeline is. G98 is essentially fit-and-tell; G99 can take weeks to months."
          >
            <p>
              The two thresholds in detail:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>G98 fast-track</strong> — applies to fully-type-tested generators
                with output up to and including 16 A per phase per inverter. Connection
                notification can be made after commissioning (within 28 days). The DNO does
                not pre-approve the connection. Most domestic 4 kW PV inverters quote 3.68
                kW max output to stay G98-eligible.
              </li>
              <li>
                <strong>G99 pre-application</strong> — applies to generators above 16 A per
                phase, and to all generators (regardless of size) at sites where pre-
                existing G98 or G99 generators already exist. Pre-application required;
                the DNO assesses local network capacity and confirms or qualifies the
                connection. Typical approval timeline 2-12 weeks depending on local
                conditions.
              </li>
              <li>
                <strong>Storage included</strong> — battery storage with grid-export
                capability falls under the same G98/G99 rules. The total combined export
                capacity matters, not just the PV inverter rating.
              </li>
              <li>
                <strong>Three-phase</strong> — the 16 A per phase limit is per-phase, so
                three-phase G98 limit is 16 A × 230 V × 3 = 11.04 kW total. Some installers
                split a larger system into multiple G98 inverters across phases to avoid
                the G99 timeline.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Anti-islanding — why the lights go out in a power cut"
            plainEnglish="A grid-connected generator must disconnect when the grid fails. This is anti-islanding. The reason: if the generator continued exporting into a network the DNO had isolated for fault repair, line workers could be exposed to live conductors they thought were dead. ENA G98/G99 specifies the loss-of-mains detection settings (vector shift, ROCOF, voltage and frequency limits) and the maximum disconnection time. The customer's lights go off in a power cut even though the PV / wind / micro-CHP could in principle keep running."
            onSite="Customers who want backup operation (lights stay on in a power cut) need either a hybrid inverter with deliberate islanded operation (which switches an internal Automatic Transfer Switch to disconnect from the grid before continuing to power local loads via battery) or a separate ATS-and-battery arrangement. Both add cost and complexity. The certified installer specifies and configures both. As an apprentice you should be able to explain the limitation to the customer who asks."
          >
            <p>
              Why anti-islanding is a hard safety requirement, not a configuration choice:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Line workers respond to faults by isolating the affected section of the
                network. They expect the section to stay dead while they work on it.
              </li>
              <li>
                A local generator continuing to export into the isolated section creates a
                live conductor where the line worker expects no voltage. Result: shock
                risk, potentially fatal.
              </li>
              <li>
                The G98/G99 anti-islanding requirement protects line workers, not the
                customer. The customer&apos;s &quot;but I want power in a cut&quot; is
                addressed via deliberately-islanded hybrid inverters that disconnect from
                the grid first.
              </li>
              <li>
                Loss-of-mains detection settings (vector shift, ROCOF, voltage / frequency
                limits) are tested at commissioning and verified at periodic inspection.
                Tampering with the settings is a criminal offence under the Electricity
                Safety, Quality and Continuity Regulations 2002.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Assuming a battery-only install doesn't need G99 because 'it's just storage'"
            whatHappens={
              <>
                Customer has an existing G98-notified PV system. Installer adds a battery
                with a separate grid-connection inverter. Each inverter is below 16 A per
                phase, so installer assumes G98 covers it. The DNO disagrees — adding a
                second generator at a site with a pre-existing G98 connection triggers G99.
                The connection is non-compliant; the DNO may require disconnection until
                G99 application is approved retrospectively. Customer is unhappy; trade
                gets the blame.
              </>
            }
            doInstead={
              <>
                The G98/G99 rule is &quot;G98 applies to a single generator below 16 A;
                G99 applies above 16 A OR to any second generator at a pre-existing G98/G99
                site&quot;. Always check for pre-existing on-site generation before
                committing to a connection scheme. The MCS-certified installer manages the
                application; if you&apos;re first-fixing for the install, confirm with the
                installer which scheme applies before fitting any cable.
              </>
            }
          />

          <CommonMistake
            title="Missing the open-PEN protection requirement on a PME-supplied EV install"
            whatHappens={
              <>
                Apprentice fits an EV charger on a PME-supplied domestic property without
                checking the unit&apos;s open-PEN protection function or providing an
                earth electrode. PEN-fault eventually occurs (could be a DNO supply fault,
                could be corrosion at the cut-out neutral). The vehicle&apos;s exposed
                chassis rises toward line voltage relative to true earth; customer
                touching the vehicle while standing on the driveway gets a shock. The
                Section 722 / A4:2026 requirement was not satisfied.
              </>
            }
            doInstead={
              <>
                Always check the supply earthing arrangement before fitting an EV charger.
                On PME / TN-C-S, Section 722 requires either the unit&apos;s open-PEN
                protection function (most modern chargers include it) or a local earth
                electrode for the EV (TT-at-charge-point). Read the manufacturer&apos;s
                installation instructions — they usually specify exactly what protection
                arrangement is required. The certified installer signs off Section 722
                compliance; if you&apos;re first-fixing, follow the installer&apos;s
                design pack precisely.
              </>
            }
          />

          <Scenario
            title="Hybrid PV-and-battery install — full regulatory chain"
            situation={
              <>
                You&apos;re working on a 7 kWp PV install with 10 kWh battery storage on a
                hybrid inverter rated 5 kW single-phase. Customer wants the system
                operational in 8 weeks for the spring weather. The property has no
                pre-existing on-site generation. The DNO is UK Power Networks (London).
                The certified installer has confirmed the grid-connection application route.
                Customer asks &quot;what regulations does this lot fall under?&quot;.
              </>
            }
            whatToDo={
              <>
                Walk the customer through the regulatory chain: (1) BS 7671 Section 712 —
                the special-installation chapter for the PV electrical design, including
                DC and AC isolation, RCD, anti-islanding, signage, equipotential bonding;
                (2) MCS MIS 3002 (PV) and MIS 3012 (battery storage) — the installer
                competence and quality standards; (3) ENA G99 — pre-application required
                because the inverter is 5 kW (above the 16 A G98 limit). The DNO
                application is in. Approval timeline 4-8 weeks for a standard urban
                connection; (4) Building Regulations Part P — notifiable work, handled by
                the firm&apos;s competent-person scheme; (5) Building Regulations Part L —
                contributes to the property&apos;s SAP score, EPC will be re-issued; (6)
                Smart Export Guarantee — customer signs up with chosen supplier after
                commission for export tariff payment. Commission depends on G99 approval —
                so realistic commission date is when DNO clears the application, not when
                you finish first-fix.
              </>
            }
            whyItMatters={
              <>
                Customers ask &quot;what regulations apply?&quot; expecting a one-line
                answer. The honest answer is the chain — six different frameworks at
                different stages of the install. Walking the customer through it sets
                realistic expectations on the timeline (G99 is the long pole) and explains
                why the install pack is the size it is. As the L3 electrician you don&apos;t
                run any of these processes individually, but you should recognise where each
                sits and why the customer is paying for the certified install rather than
                a cheap non-MCS alternative.
              </>
            }
          />

          <ConceptBlock
            title="The certificate package — what the customer actually receives"
            plainEnglish="At the end of an MCS-certified install the customer receives a stack of paperwork. The MCS Installation Certificate is the headline document — it confirms the install meets the relevant MIS standard and is the key the customer uses to claim incentives. Alongside it comes the BS 7671 Electrical Installation Certificate (EIC), the manufacturer&apos;s commissioning records, the system handover pack with operating instructions, and any DNO confirmation (G98 deemed-acceptance reply or G99 connection agreement)."
            onSite="Hand the pack over in person. Walk the customer through the isolators, the labels, the inverter app and the &quot;what to do in a power cut&quot; logic. The certificates go in the customer&apos;s file; the labels go on the kit. A handover that is just &quot;here are the keys&quot; leaves a customer who can&apos;t use the system properly and ends up calling you back about non-faults."
          >
            <p>What the customer file should contain on day one:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>MCS Installation Certificate (the incentive-eligibility document).</li>
              <li>BS 7671 EIC plus any associated schedules of inspections and test results.</li>
              <li>Manufacturer commissioning records and warranty documents.</li>
              <li>System handover pack — operating instructions, isolation procedure, fault-finding flowcharts.</li>
              <li>DNO paperwork — G98 deemed acceptance or G99 connection agreement.</li>
              <li>Customer-facing quick-reference card with isolation steps and emergency contacts.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Where MCS sign-off fits with BS 7671 certification"
            plainEnglish="MCS and BS 7671 are complementary, not duplicative. The MCS Installation Certificate confirms the system meets the MIS standard for that technology — design, product selection, installer competence, commissioning. The BS 7671 EIC confirms the electrical installation meets the Wiring Regulations. Both are required on a typical PV / heat-pump / EV / battery install."
            onSite="As the L3 electrician you&apos;ll often produce the EIC; the MCS-certified installer (often the same firm, sometimes not) produces the MCS certificate. If the customer asks &quot;why two certificates?&quot;, the honest answer is that they cover different things — one for the technology-specific install standard, one for the BS 7671 electrical safety baseline."
          >
            <p>Practical division of certification responsibility:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>MCS Installation Certificate — issued by the MCS-certified installer / firm.</li>
              <li>BS 7671 EIC — issued by the competent person who designed, installed and tested the electrical works (often the same person on small jobs).</li>
              <li>BS 7671 Minor Works Certificate — used where the install is a small modification (rare on full PV / heat pump / EV jobs; common on small additions).</li>
              <li>EICR — periodic inspection report, issued by a competent person assessing an existing installation including any environmental tech additions.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Section 753 — heating cables and the underfloor heating special location"
            plainEnglish="BS 7671 Section 753 covers heating cables and embedded heating systems — underfloor heating mats and loose cable, freeze-protection trace heating, snow-melt for driveways and ramps. The section was completely revised in A4:2026. Key requirements include 30 mA RCD protection, conductor and cable type appropriate to the embedded environment, supply via dedicated circuit, and labelling of the heated area at the consumer unit and at any termination point."
            onSite="A typical electric underfloor heating retrofit on a kitchen / bathroom involves a heating mat (or loose cable) embedded in a self-levelling compound, a thermostat with floor sensor, a dedicated 16 A circuit on a 30 mA RCD, and a labelled isolation point. The L3 apprentice's scope: dedicated supply, RCD, thermostat, sensor cable. The heating mat install is normally by the heated-floor specialist or the bathroom installer; the electrician verifies the mat is bonded if metallic and that the controls are wired correctly. Document the heated area on the EIC schedule of inspections."
          >
            <p>
              Section 753 install considerations:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Dedicated final circuit</strong> — typically 16 A on
                a 30 mA RCD; sized to the mat's stated rating; do not share
                with adjacent socket circuits.
              </li>
              <li>
                <strong>RCD type</strong> — 30 mA general-purpose RCD or
                RCBO; Type AC adequate for resistive heating.
              </li>
              <li>
                <strong>Thermostat with floor sensor</strong> — sensor cable
                in conduit so the sensor is accessible for replacement
                without lifting the floor.
              </li>
              <li>
                <strong>Labelled isolation</strong> — at the consumer unit
                ('underfloor heating: kitchen') and at the local
                thermostat / isolator.
              </li>
              <li>
                <strong>Heated-area record</strong> — area of mat installed,
                manufacturer, mat reference, install date; goes on the
                customer pack so the future inspector can locate the mat
                without lifting the floor.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Diverters and battery export — the next-generation domestic energy install"
            plainEnglish="Beyond simple PV-and-battery, modern installs frequently include a power diverter that sends excess PV generation to the immersion heater (Solar iBoost, Eddi by myenergi) and a hybrid inverter that can do anything from charge the home battery to discharge to support the grid during peak. The L3 apprentice on these installs needs to understand the controls layer — which device is in charge of which output, what the export priority is, what the customer expects to see in the app."
            onSite="A typical 2026 install: PV array → hybrid inverter → home battery → consumer unit → priority diverter to immersion. The hybrid inverter's app shows live PV generation, battery state of charge, home demand, grid import / export. The customer expects: PV charges battery first, then meets demand, then exports to grid. Variations driven by tariffs (Octopus Agile, Octopus Flux, Intelligent Octopus Go for EVs). Document the priority strategy at handover so the customer can re-set it later."
          >
            <p>
              Common controls-layer arrangements in a diverter / battery install:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>PV-first to battery</strong> — every PV kWh charges
                the home battery before any export. Battery becomes the
                buffer for the household.
              </li>
              <li>
                <strong>PV-first to immersion</strong> — power diverter
                (myenergi Eddi or similar) sends excess PV to the immersion
                heater; battery charges only after the immersion is
                satisfied.
              </li>
              <li>
                <strong>Tariff-aware battery</strong> — battery charges
                from grid during cheap tariff windows (Octopus Go 00:30-04:30,
                or Agile dynamic), discharges during expensive evening
                peak.
              </li>
              <li>
                <strong>EV-first charge</strong> — Intelligent Octopus Go
                tariff schedules the EV charger and home battery jointly to
                cheap windows.
              </li>
              <li>
                <strong>Customer override</strong> — most apps allow a
                'force charge' button for cold weather or guests; brief the
                customer at handover.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Surge protective devices — the A4:2026 SPD requirement landscape"
            plainEnglish="A4:2026 strengthened the SPD requirement on the consumer unit. Most modern UK installations now fit a Type 2 SPD at the consumer unit as standard practice (some Type 1+2 in rural / overhead-supply locations). The SPD diverts surge currents from lightning and switching events to earth, protecting connected electronics. The L3 apprentice's scope on a CU upgrade now routinely includes specifying and fitting the SPD."
            onSite="Type 2 SPD at the consumer unit — DIN-rail mounted plug-in module on its own dedicated MCB (typically 16 A), bonded to the MET via a short low-impedance conductor (typically 6-16 mm² copper). Module status indicator (green = OK, red = consumed and needing replacement). Customer brief at handover — explain the SPD, the indicator, and the replacement cost (~£40-80 module, fitted in a few minutes). Surge events in the UK are mostly switching surges from the supply network rather than direct lightning; the SPD silently absorbs them and saves connected electronics."
          >
            <p>
              SPD types and where each is appropriate:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Type 1</strong> — direct-strike protection at the
                service entrance; for buildings with a structural lightning
                protection system per BS EN 62305.
              </li>
              <li>
                <strong>Type 2</strong> — switching surge and indirect
                lightning protection at the consumer unit; current standard
                practice for most UK installs.
              </li>
              <li>
                <strong>Type 3</strong> — equipment-end protection at
                sensitive accessories (server room, control panel,
                medical equipment); supplements Type 2.
              </li>
              <li>
                <strong>Type 1+2 combined</strong> — service-entrance
                location where the building lacks a lightning protection
                system but is at higher risk (rural, overhead supply,
                exposed location).
              </li>
              <li>
                <strong>End-of-life replacement</strong> — module-style SPDs
                are designed to be replaced when the indicator turns red;
                customer-friendly maintenance task.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "BS 7671:2018+A4:2026 has three special-installation chapters most relevant to environmental tech — Section 712 (PV, extensively revised), Section 722 (EV, significantly amended), Section 753 (heating cables, completely revised).",
              "Each special-installation chapter applies in addition to the general requirements of Parts 1-6 of BS 7671 — they layer on top, they don't stand alone.",
              "Section 722's headline requirement is PEN-fault protection on PME-supplied EV charging — open-PEN protection device built into the charger, or TT earth electrode for the EV.",
              "Section 722 requires Type B RCD or Type A + RDC-DD for EV charging. Type AC RCD is not adequate.",
              "ENA G98 fast-track applies up to 16 A per phase per inverter (3.68 kW single-phase). G99 pre-application required above that, and for all second generators at sites with pre-existing G98/G99.",
              "Battery storage with grid-export capability counts toward G98/G99 capacity — it's a generator under the framework, not just storage.",
              "Anti-islanding under G98/G99 protects DNO line workers during fault response. Customer backup operation requires hybrid inverter with deliberate island mode or separate ATS-and-battery.",
              "Signage at consumer unit / meter / inverter / DC isolators is required by BS 7671 Section 712 plus MCS Code plus DNO connection conditions — it's safety-critical for future maintainers, not paperwork.",
            ]}
          />

          <Quiz title="BS 7671 + ENA G98/G99 — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section4-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                4.1 Building Regs + MCS framework
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
                Section 5 — Installation, commissioning, maintenance
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
