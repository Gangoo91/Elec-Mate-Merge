/**
 * MOET · Module 3 · Section 3.6 · Subsection 5 — Electric Vehicle Charging
 * Infrastructure
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. NOT ST0154 (the "MOET" the course is named after) —
 * ST0154 v1.6 is still live, but its own EPA plan records that the Electrical
 * Technician option "was retired 31/12/2025" and was replaced by ST1426
 * (single discipline) or ST1443 (dual discipline). The course keeps the MOET
 * name because that is what employers and colleges still call the role.
 *
 * KSBs covered, quoted rather than numbered — the published K/S/B
 * numbering is unverified, so never write a code here:
 *   · "Electrical. Electrical plant, equipment, and systems maintenance
 *     requirements: removing and replacing parts, inspecting, testing,
 *     setting up, adjusting, cleaning, and functional testing."
 *   · "Electrical. Different types of cables; their specifications and
 *     application."
 *   · "Electrical. Electricity at Work regulations. IET wiring regulations."
 *
 * This is the last page of Module 3 — the "next" link moves on to Module 4.
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  Bleed,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  Prerequisites,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import {
  EvDedicatedCircuitSld,
  ThreePhaseEvSld,
} from '@/components/study-centre/diagrams/renewableSld';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Electric Vehicle Charging Infrastructure - MOET Module 3.6.5';
const DESCRIPTION =
  'Comprehensive guide to EV charging infrastructure for electrical maintenance technicians: charging modes and types, BS 7671 Section 722, cable sizing, earthing requirements, smart charging, load management, DNO notification, vehicle-to-grid technology and maintenance under ST1426.';

/* ------------------------------------------------------------------ */
/*  Quick-check questions (4) — shown after each content section       */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: 'ev-charging-modes',
    question: 'What are the four IEC 61851 charging modes for electric vehicles?',
    options: [
      'Mode 1 single-phase AC, Mode 2 three-phase AC, Mode 3 single-phase DC, Mode 4 three-phase DC, by phases',
      'Mode 1 trickle, Mode 2 fast, Mode 3 rapid and Mode 4 ultra-rapid, defined solely by kilowatt rating alone',
      'Mode 1 tethered, Mode 2 socketed, Mode 3 wireless, Mode 4 battery-swap, by the physical delivery method',
      'Mode 1 socket no protection, Mode 2 socket with ICCD, Mode 3 dedicated EVSE with pilot, Mode 4 DC rapid',
    ],
    correctIndex: 3,
    explanation:
      'IEC 61851 defines four charging modes. Mode 1 uses a standard domestic socket with no additional protection (not recommended in the UK). Mode 2 uses a domestic socket with an in-cable control device (ICCD) providing earth fault and overcurrent protection — used for occasional/emergency charging. Mode 3 is the standard for permanent installations: a dedicated EVSE (Electric Vehicle Supply Equipment) with a Type 1 or Type 2 connector, control pilot communication, and integral protection. Mode 4 provides DC rapid charging where the charger contains the AC-DC converter, delivering DC directly to the vehicle battery via CCS or CHAdeMO connectors.',
  },
  {
    id: 'bs7671-section722',
    question: 'What does BS 7671 Section 722 specifically require for EV charging installations?',
    options: [
      'A single shared final circuit may supply several charge points, with normal household diversity applied to the cable',
      'A 100 mA time-delayed Type AC RCD on every charge point, since EV standby leakage would trip a more sensitive device',
      'A dedicated circuit per point, sized for continuous full output, with a 30 mA Type A RCD (Type B if no integral DC protection)',
      'A means of manual isolation only, with no residual current protection because the vehicle provides its own earth fault detection',
    ],
    correctIndex: 2,
    explanation:
      'BS 7671 Section 722 covers the specific requirements for EV charging. Key requirements include: Regulation 722.411.4.1 — RCD protection (minimum 30 mA Type A, with Type B or Type B+ required if the EVSE does not have integral DC fault detection); Regulation 722.531.3 — dedicated circuit for each charging point; Regulation 722.311 — supply cable rated for continuous maximum demand (not diversity-reduced); Regulation 722.411.4 — PME earthing restrictions (earth rod may be required); and appropriate labelling. These requirements reflect the high-power, continuous-duty nature of EV charging.',
  },
  {
    id: 'pme-earthing',
    question:
      'Why does BS 7671 impose restrictions on using the PME earth for EV charging outdoors?',
    options: [
      'On PME (TN-C-S), an open-PEN fault can raise the EVSE and vehicle metalwork to a dangerous voltage, riskier outdoors',
      'The PME earth carries too much harmonic current from the charger, which corrodes the buried neutral and weakens the supply',
      'Outdoor chargers draw more current than indoor ones, so the PME earth conductor is undersized and overheats under load',
      'The combined PEN conductor introduces a dangerous DC offset to the vehicle battery, avoided only by isolating the PME earth',
    ],
    correctIndex: 0,
    explanation:
      'In a PME (TN-C-S) system, the neutral and earth are combined in the DNO supply cable (PEN conductor). If this conductor is lost (open PEN fault), all metalwork connected to the installation earth rises towards line voltage via the load currents. Outdoors, a person has better contact with true earth (standing on wet ground), so the shock risk is much higher than indoors. BS 7671 Regulation 722.411.4 addresses this by requiring either: a separate earth electrode (TT earthing for the EV circuit); or the EVSE manufacturer confirming the equipment has appropriate protection against open PEN conditions.',
  },
  {
    id: 'smart-charging',
    question: 'What is smart EV charging and why is it important?',
    options: [
      'Smart charging simply means a charger that displays the cost of each charging session on a screen for the user to see',
      'Smart charging refers to a charger that automatically selects the fastest possible charge rate regardless of grid state',
      'Smart charging dynamically manages charge rate and timing to suit grid conditions, tariffs and constraints, avoiding overload',
      'Smart charging is a feature that lets the driver start and stop a charge from a smartphone app, with no effect on grid demand',
    ],
    correctIndex: 2,
    explanation:
      'Smart charging is critical for managing the impact of mass EV adoption on the electricity network. A typical 7 kW home charger draws the equivalent of 2-3 additional houses. If millions of EVs charge simultaneously during the evening peak (when drivers arrive home), the additional demand would overwhelm local distribution networks. Smart charging shifts demand to off-peak periods (typically overnight), responds to grid frequency signals, participates in DSR, and manages local load to stay within the DNO connection capacity. The UK Electric Vehicles (Smart Charge Points) Regulations 2021 mandate that all new domestic and workplace chargers must have smart functionality.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (12) — end-of-page assessment                       */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: 'A Type 2 connector (Mennekes) is:',
    options: [
      'A two-pin DC-only connector used exclusively for rapid charging at motorway service stations',
      'The UK and European standard 7-pin AC connector, supporting single-phase up to 7.4 kW and three-phase up to 22 kW',
      'A round three-pin domestic plug rated at 13 A that any electric vehicle can be charged from safely',
      'A wireless inductive charging pad that requires no physical connector at all between vehicle and supply',
    ],
    correctAnswer: 1,
    explanation:
      'The Type 2 (IEC 62196-2) connector is the standard for AC EV charging in the UK and Europe. It has 7 pins: L1, L2, L3 (three phases — only L1 used for single-phase), N (neutral), PE (protective earth), CP (control pilot — communication between EVSE and vehicle), and PP (proximity pilot — cable current rating identification and plug detection). Single-phase charging via Type 2 delivers up to 7.4 kW (32 A at 230 V). Three-phase delivers up to 22 kW (32 A at 400 V). The Type 2 socket is incorporated into the EVSE; the vehicle end may be Type 2 (tethered cable) or a vehicle inlet.',
  },
  {
    id: 2,
    question: 'The Electric Vehicles (Smart Charge Points) Regulations 2021 require:',
    options: [
      'That all charge points be hard-wired to the grid with no ability to communicate or update remotely',
      'That every domestic charge point be limited to a maximum output of 3.6 kW to protect the network',
      'All new domestic and workplace charge points to be smart by default, with delay, DSR response and remote updates',
      'That charge points only operate during daylight hours so as to coincide with solar PV generation',
    ],
    correctAnswer: 2,
    explanation:
      'The 2021 Regulations mandate that all new domestic and workplace charge points must: be smart by default (capable of sending and receiving information); have a randomised delay of up to 10 minutes at first installation (preventing thousands of chargers starting simultaneously at the same off-peak tariff trigger); be able to respond to demand-side response signals; support scheduled charging; have remote firmware update capability; and meet cybersecurity requirements. These regulations are critical for managing the grid impact of mass EV adoption.',
  },
  {
    id: 3,
    question: 'The cable supplying a 7 kW single-phase EV charger must be rated for:',
    options: [
      '13 A, the same as a standard ring final circuit, because the charger limits its own current internally',
      '32 A but with the usual household diversity applied, allowing a smaller cable size to be used',
      '16 A continuous, which is sufficient because EV chargers rarely draw their full rated output',
      '32 A continuous with no diversity, sized for 100% of rated current using BS 7671 correction factors',
    ],
    correctAnswer: 3,
    explanation:
      'BS 7671 Regulation 722.311 requires EV charging circuits to be sized for the maximum demand of the charger with no diversity applied. A 7 kW single-phase charger draws 30.4 A at 230 V, requiring a 32 A circuit. The cable must be rated for 32 A continuous load, applying all relevant correction factors (ambient temperature Cf, grouping Cg, thermal insulation Ci, installation method). For a typical domestic installation in clipped cable, 6 mm² T+E is commonly used. Three-phase 22 kW chargers require a 32 A three-phase supply with appropriate cable sizing.',
  },
  {
    id: 4,
    question: 'CCS (Combined Charging System) is:',
    options: [
      'A Type 2 AC connector with two added DC pins below it, allowing both AC and DC rapid charging up to 350 kW',
      'An AC-only connector that combines single-phase and three-phase pins but cannot deliver any DC charging',
      'A wireless charging standard that combines inductive and resonant magnetic coupling in a single pad',
      'A control protocol that combines the control pilot and proximity pilot signals onto one shared data pin',
    ],
    correctAnswer: 0,
    explanation:
      'CCS (also called Combo 2 in Europe) is the dominant DC rapid charging connector. It adds two large DC pins below the standard Type 2 AC connector, creating a single vehicle inlet that supports both AC and DC charging. Current CCS standards support up to 350 kW DC charging (500 V at 500 A or 920 V at 500 A). Most new EVs in the UK use CCS. The alternative DC standard, CHAdeMO (used primarily by older Nissan and Mitsubishi models), is being phased out in favour of CCS. Tesla vehicles in the UK now use CCS (or Type 2 for AC) following adoption of the European standard.',
  },
  {
    id: 5,
    question: 'Load management for multiple EV chargers involves:',
    options: [
      'Permanently fixing each charger to a low output so the total can never exceed the supply, even with one vehicle',
      'Dynamically sharing the available supply capacity across the chargers, trimming rates as the site limit is approached',
      'Switching off the building’s other electrical loads whenever an EV is charging in order to free up capacity',
      'Allowing every charger to draw full power at all times and relying on the main fuse to disconnect if overloaded',
    ],
    correctAnswer: 1,
    explanation:
      'Load management (also called load balancing or dynamic power sharing) is essential for sites with multiple chargers where the total installed charger capacity exceeds the available supply. For example, ten 7 kW chargers on a 100 A three-phase supply: if all charge at full power simultaneously, the total demand (70 kW) exceeds the supply capacity. A load management system monitors the total site demand and dynamically adjusts individual charger outputs to stay within the supply limit. As vehicles complete charging, the released capacity is redistributed to remaining vehicles. This avoids the cost of DNO supply upgrades.',
  },
  {
    id: 6,
    question:
      'When installing an EV charger on a PME (TN-C-S) supply, the recommended earthing solution is:',
    options: [
      'Bond the EVSE metalwork directly to the nearest water pipe to provide a low-resistance earth path',
      'Convert the entire installation, including the dwelling, from PME to TT earthing before fitting the charger',
      'Fit a separate earth electrode (TT) with RCD for the EV circuit, or use an EVSE with confirmed open-PEN protection',
      'Leave the charger without any earth connection, relying on the vehicle’s own chassis as the earth reference',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 Regulation 722.411.4 addresses the PME earthing risk for EV charging. The preferred solutions are: (1) Install a local earth electrode (typically an earth rod driven to achieve less than 200 ohms) and protect the EV circuit with an RCD, creating a TT earthing arrangement for the EV circuit only. The main installation remains on PME. (2) Use an EVSE with integral open-PEN protection (some manufacturers incorporate this, but the installer must verify compliance). The reason: outdoor EV charging presents a higher shock risk during an open-PEN fault because the vehicle occupant/charger user has better contact with true earth.',
  },
  {
    id: 7,
    question: 'The control pilot (CP) signal in a Mode 3 EVSE:',
    options: [
      'Carries the full charging current from the EVSE to the vehicle battery through a dedicated power pin',
      'Is a fixed 230 V AC signal used only to confirm that mains power is present at the charging socket',
      'Is a one-way radio link that allows the driver to start the charge remotely from a mobile phone',
      'Is a ±12 V PWM signal that tells the vehicle EVSE availability, maximum current and charge enable',
    ],
    correctAnswer: 3,
    explanation:
      'The control pilot is a 1 kHz PWM signal defined in IEC 61851-1. The EVSE generates a ±12 V square wave. The PWM duty cycle encodes the maximum current the EVSE can deliver (e.g., 50% duty cycle = 30 A). The vehicle modifies the signal to communicate its status: +12 V indicates no vehicle connected; +9 V indicates vehicle connected, not ready to charge; +6 V indicates vehicle connected, ready to charge; +3 V indicates vehicle requires ventilation. The EVSE uses the pilot state to control the supply contactor. This is the core safety interlock — the supply is only connected when a vehicle is correctly connected and requests charging.',
  },
  {
    id: 8,
    question: 'Vehicle-to-Grid (V2G) technology:',
    options: [
      'Lets an EV discharge stored energy back to the grid or building at peak, acting as distributed storage',
      'Allows two electric vehicles to charge each other directly without any connection to the mains supply',
      'Increases the maximum charge rate of an EV by drawing extra power from neighbouring grid-connected properties',
      'Lets the grid operator remotely disable a vehicle’s traction motor during periods of network stress',
    ],
    correctAnswer: 0,
    explanation:
      'V2G is an emerging technology that makes EV batteries available as grid-connected storage. During off-peak hours (cheap electricity), the EV charges. During peak hours (expensive electricity or grid stress), the EV discharges stored energy back to the grid or building. This requires: a bidirectional charger (capable of both AC-DC and DC-AC conversion); appropriate control systems; grid connection compliance (G98/G99 for export); and user consent/scheduling. V2G creates commercial value for EV owners (earning revenue from grid services) and provides network operators with distributed storage. Pilot projects in the UK are demonstrating V2G viability.',
  },
  {
    id: 9,
    question: 'The DNO must be notified of EV charger installations when:',
    options: [
      'Never, since EV chargers are exempt from any form of notification because they are plug-in appliances',
      'All installations should be notified; those above 3.68 kW single-phase may need prior approval on constrained networks',
      'Only when the charger is rated above 50 kW DC, since smaller AC chargers have no effect on the network',
      'Only after the charger has actually caused a recorded fault or nuisance trip on the local network',
    ],
    correctAnswer: 1,
    explanation:
      'DNO notification requirements: all installations should be notified through the Building Regulations Part P notification process. The DNO needs to know about EV chargers because: they represent a significant additional load (7 kW is equivalent to 2-3 average houses); multiple installations on the same feeder can cause voltage drop and thermal overloading; the DNO needs demand data for network planning. Some DNOs require prior approval for chargers above 3.68 kW on single-phase supplies or in areas with known network constraints. Smart charging data also helps DNOs manage their networks. The installer should check the local DNO requirements before installation.',
  },
  {
    id: 10,
    question: 'When maintaining an EV charger, the technician should:',
    options: [
      'Test only the smart communication features, since electrical safety is guaranteed by the manufacturer for life',
      'Replace the entire charger unit at every service visit rather than inspecting and testing the existing one',
      'Carry out visual inspection, electrical testing, smart-function checks and verify the control pilot signal',
      'Carry out a visual check of the enclosure only, as opening the unit for electrical testing is never permitted',
    ],
    correctAnswer: 2,
    explanation:
      'Comprehensive EVSE maintenance includes: visual inspection (cable condition including UV degradation, connector pin condition including carbon/corrosion, enclosure damage/water ingress, earthing connections, labels); electrical testing (protective earth continuity, insulation resistance at 500 V DC, RCD trip test — both time and current, earth fault loop impedance for TT installations, prospective fault current verification); functional testing (connect a vehicle or test adapter, verify pilot signal, check contactor operation, test emergency stop if fitted); smart features (verify communication with cloud platform, check firmware version, test scheduled charging, verify load management response); and documentation.',
  },
  {
    id: 11,
    question: 'A tethered EV charger differs from a socketed charger in that:',
    options: [
      'A tethered charger can only deliver DC rapid charging, whereas a socketed charger is strictly AC only',
      'A tethered charger has no need for an RCD at all, whereas a socketed charger always requires one fitted',
      'A tethered charger must be installed indoors, whereas a socketed charger must always be installed outdoors',
      'A tethered charger has a fixed attached cable, while a socketed charger has a Type 2 socket and the user supplies the cable',
    ],
    correctAnswer: 3,
    explanation:
      "Tethered chargers are standard for domestic installations: the cable (typically 5-10 m with Type 2 or Type 1 vehicle connector) is permanently attached, making charging as simple as plugging into the vehicle. Socketed chargers have a Type 2 socket on the unit: the user provides their own cable (which comes with the vehicle). Socketed chargers are preferred for: workplace installations (different employees have different vehicles/cables), public charging (Type 2 is universal), and locations where cable theft is a risk. The charging cable contains the proximity pilot, which communicates the cable's current rating to the EVSE.",
  },
  {
    id: 12,
    question: 'Under the Building Regulations 2022 (Part S), new buildings in England must:',
    options: [
      'Provide charge points or cable routes: one per new dwelling with parking, and one per five non-residential spaces',
      'Install at least one DC rapid charger in every new dwelling regardless of whether it has associated parking',
      'Fit solar panels sized to fully power any EV charge points that are provided within the new building',
      'Provide a three-phase supply to every single new home so that 22 kW charging is always made available',
    ],
    correctAnswer: 0,
    explanation:
      'Building Regulations Part S (introduced in England from June 2022) requires: new residential buildings with associated parking to have at least one charge point per dwelling (minimum 7 kW, Mode 3, smart-enabled); new non-residential buildings with more than 10 parking spaces to provide one charge point for every five spaces plus cable routes to every remaining space; and major renovations of non-residential buildings with more than 10 spaces to provide at least one charge point. These requirements ensure that the building infrastructure supports EV charging from day one, avoiding the much higher cost of retrofit. Similar requirements apply in Scotland and Wales under their respective building regulations.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQs (5)                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'Do I need specific qualifications to install EV chargers?',
    answer:
      'EV charger installation is notifiable electrical work under Building Regulations Part P. Installers must be competent electricians (e.g., holding a Level 3 Electrotechnical qualification or equivalent) and should hold EV charger installation training (e.g., City & Guilds 2919 or equivalent). Registration with a competent person scheme (e.g., NICEIC, NAPIT) enables self-certification. Additionally, familiarity with BS 7671 Section 722, the IET Code of Practice for EV Charging, and specific EVSE manufacturer training is essential. Under ST1426, maintenance technicians should understand EV charging as part of the emerging technologies module.',
  },
  {
    question: 'How do I determine if a DNO supply upgrade is needed for EV charging?',
    answer:
      'Assess the existing supply: check the main fuse rating (typically 60 A or 100 A single-phase for domestic), measure the maximum demand (using a demand logger or smart meter data), and calculate the available headroom. A 7 kW charger requires 32 A continuously. If the existing maximum demand plus the charger exceeds the supply fuse rating, options include: smart charging with load limiting (reducing charge rate when other demand is high); a DNO supply upgrade (can take 6-12 weeks and cost GBP 500-3,000+); or a three-phase supply upgrade. Load management systems can often avoid the need for a supply upgrade.',
  },
  {
    question: 'What maintenance does an EV charger require?',
    answer:
      "EVSE maintenance varies by type and location. Domestic chargers: annual visual inspection and electrical test (earth continuity, insulation resistance, RCD test). Workplace/public chargers: more frequent inspection (monthly visual, quarterly electrical) due to higher usage and vandalism risk. All chargers: check cable and connector condition (pins, scoring, contamination); verify RCD operation; check earthing connections; test smart functionality (communication, scheduling); update firmware; clean connectors and enclosure; check ventilation (forced-cooled units); and verify labelling. The manufacturer's maintenance schedule takes precedence where specified.",
  },
  {
    question: 'What is the difference between AC and DC EV charging?',
    answer:
      "In AC charging (Mode 2 and 3), the EVSE delivers AC power to the vehicle, and the vehicle's onboard charger converts AC to DC to charge the battery. Onboard chargers are typically rated at 3.6-22 kW, limiting AC charge speed. In DC charging (Mode 4), the external charger converts AC to DC and delivers DC power directly to the vehicle battery, bypassing the onboard charger. This enables much higher charge rates (50-350 kW) because the external charger can be much larger and more powerful than the onboard unit. DC chargers are significantly more expensive and require higher-rated electrical supplies.",
  },
  {
    question: 'How does V2G (Vehicle-to-Grid) affect the electrical installation?',
    answer:
      'V2G requires a bidirectional charger that can both charge the EV battery and discharge it back to the building or grid. This has significant implications for the electrical installation: the charger acts as a generator (requiring G98/G99 compliance for grid export); anti-islanding protection is mandatory; the RCD selection must accommodate bidirectional current flow; metering must record both import and export; and the DNO must be notified of the generation capability. V2G systems also require sophisticated control systems to manage charge/discharge schedules, protect battery health (limiting V2G cycles to preserve battery life), and respond to grid signals. Pilot schemes in the UK are establishing best practices.',
  },
];

const MOETModule3Section6_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 3 · Section 3.6 · Subsection 5"
        title="Electric Vehicle Charging Infrastructure"
        backTo="/study-centre/apprentice/m-o-e-t-module3-section6"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            EV charging systems, installation requirements and maintenance for electrical
            technicians.
          </p>

          <TLDR
            points={[
              'Modes: Mode 2 (ICCD), Mode 3 (dedicated EVSE), Mode 4 (DC rapid).',
              'Connectors: Type 2 (AC standard), CCS (DC rapid), CHAdeMO (legacy).',
              'Standards: BS 7671 Section 722, IEC 61851, Building Regs Part S.',
              'Smart: Mandatory smart functionality for new domestic/workplace chargers.',
            ]}
          />

          <ConceptBlock title="Maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Growth: EV charger installations exceeding 500,000 in UK.</li>
              <li>PME earthing: Earth electrode often required for outdoor charging.</li>
              <li>Load management: Dynamic power sharing for multi-charger sites.</li>
              <li>ST1426: Emerging technologies knowledge required.</li>
            </ul>
          </ConceptBlock>

          <Prerequisites
            items={[
              {
                term: 'Circuit protection and earthing',

                gist: 'Fuses, circuit breakers, RCDs and RCBOs, earthing arrangements and protective bonding — what each device protects against and how fault current gets back to source.',

                where: '2.4',
              },

              {
                term: 'BS 7671 and where it sits',

                gist: 'The Wiring Regulations are a standard, not statute — compliance is how you demonstrate the EAWR duties have been met. Current edition 2018+A4:2026.',

                where: '1.4.3',
              },

              {
                term: 'Switchgear and earthing arrangements',

                gist: 'HV and LV switchgear types, and how TN-C-S, TN-S and TT arrangements differ at the service position.',

                where: '3.1.1',
              },
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Describe the four IEC 61851 charging modes and connector types for EV charging',
              'Apply BS 7671 Section 722 requirements including RCD selection and PME earthing',
              'Explain smart charging requirements under the 2021 Smart Charge Points Regulations',
              'Design load management solutions for multi-charger installations',
              'Carry out EV charger inspection, testing and maintenance procedures',
              'Understand Vehicle-to-Grid technology and its implications for electrical installations',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Charging modes, connectors and power levels</ContentEyebrow>

          <ConceptBlock title="From trickle charging to ultra-rapid">
            <p>
              Electric vehicle charging encompasses a range of technologies from slow overnight
              domestic charging to ultra-rapid motorway charging. Understanding the different
              charging modes, connector types, and power levels is fundamental for the maintenance
              technician, as each type has distinct installation requirements, protection measures,
              and maintenance needs. The IEC 61851 standard defines four charging modes, while IEC
              62196 specifies the connector types used across the industry.
            </p>
            <p>
              The UK is transitioning rapidly towards electrified transport. The government has
              confirmed that no new petrol or diesel cars will be sold from 2035, and EV
              registrations already represent over 20% of new car sales. This drives massive demand
              for charging infrastructure — and for technicians who can install and maintain it. The
              scale of change is significant: the UK electricity system must accommodate an
              additional 30-40 TWh of annual demand as the vehicle fleet electrifies, equivalent to
              roughly 10% of current total generation.
            </p>
            <p>
              From the technician&apos;s perspective, the critical distinction is between AC
              charging (Modes 2 and 3) and DC charging (Mode 4). In AC charging, the vehicle&apos;s
              onboard charger performs the AC-to-DC conversion, which limits the charge rate to the
              onboard charger&apos;s capacity (typically 3.6-11 kW for domestic vehicles, up to 22
              kW for some premium models). In DC charging, an external charger performs the
              conversion and delivers DC directly to the battery, enabling charge rates of 50-350
              kW. The electrical installation requirements differ substantially between these two
              approaches — DC rapid chargers require three-phase supplies, larger cable
              cross-sections, and more sophisticated protection arrangements.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Charging modes and power levels">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Mode</th>
                    <th className="py-2 pr-4 font-medium text-white">Supply</th>
                    <th className="py-2 pr-4 font-medium text-white">Power</th>
                    <th className="py-2 font-medium text-white">Typical use</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Mode 2</td>
                    <td className="py-2 pr-4">Domestic socket + ICCD</td>
                    <td className="py-2 pr-4">2.3 kW (10 A) max</td>
                    <td className="py-2">Emergency/occasional only</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Mode 3 (single-phase)</td>
                    <td className="py-2 pr-4">Dedicated EVSE, Type 2</td>
                    <td className="py-2 pr-4">3.6-7.4 kW</td>
                    <td className="py-2">Home, workplace (standard)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Mode 3 (three-phase)</td>
                    <td className="py-2 pr-4">Dedicated EVSE, Type 2</td>
                    <td className="py-2 pr-4">11-22 kW</td>
                    <td className="py-2">Workplace, destination</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Mode 4 (DC rapid)</td>
                    <td className="py-2 pr-4">External DC charger, CCS</td>
                    <td className="py-2 pr-4">50-350 kW</td>
                    <td className="py-2">Motorway, en-route, fleet</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ThreePhaseEvSld caption="A three-phase 22 kW point draws around 32 A per phase — a 4-pole Type A RCBO (plus RDC-PD for smooth DC detection) switches all three lines and neutral, and an integrated OPDD handles the open-PEN requirement on a PME supply." />

          <ConceptBlock title="Connector types">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Type 2 (Mennekes):</strong> 7-pin AC connector — the UK/European standard
                for Mode 3 charging. Supports single and three-phase. The control pilot (CP) and
                proximity pilot (PP) pins enable communication between the EVSE and vehicle.
              </li>
              <li>
                <strong>CCS (Combined Charging System):</strong> Type 2 AC pins plus two DC pins —
                the dominant DC rapid charging standard. Up to 350 kW. Also known as Combo 2 in
                Europe.
              </li>
              <li>
                <strong>CHAdeMO:</strong> Japanese DC rapid charging standard (up to 100 kW). Being
                phased out in favour of CCS. Used on older Nissan Leaf and Mitsubishi Outlander
                PHEV.
              </li>
              <li>
                <strong>Type 1 (J1772):</strong> 5-pin AC connector used on some older/imported
                vehicles. Declining in the UK market.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Control pilot signal — the communication backbone">
            <p>
              The control pilot (CP) is a 1 kHz pulse-width modulated (PWM) signal defined in IEC
              61851-1 that forms the fundamental communication link between the EVSE and the
              vehicle. The EVSE generates a ±12 V square wave, and the PWM duty cycle encodes the
              maximum available current.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Pilot voltage</th>
                    <th className="py-2 pr-4 font-medium text-white">State</th>
                    <th className="py-2 font-medium text-white">Meaning</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">+12 V (DC)</td>
                    <td className="py-2 pr-4">A</td>
                    <td className="py-2">No vehicle connected</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">+9 V (PWM)</td>
                    <td className="py-2 pr-4">B</td>
                    <td className="py-2">Vehicle connected, not ready</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">+6 V (PWM)</td>
                    <td className="py-2 pr-4">C</td>
                    <td className="py-2">Vehicle connected, charging</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">+3 V (PWM)</td>
                    <td className="py-2 pr-4">D</td>
                    <td className="py-2">Ventilation required</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Safety: continuous loading">
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
              <p className="text-sm text-white">
                EV charging is a continuous load — the charger draws its rated current for extended
                periods (often 4-8 hours overnight). Unlike most domestic loads that cycle on and
                off, EV charging represents a sustained thermal load on cables, connections, and
                protective devices. BS 7671 Regulation 722.311 requires cable sizing for 100% of the
                rated output with no diversity reduction. Under-rated cables or connections can
                overheat, leading to fire. The most common installation fault is inadequate cable
                sizing or loose terminations that deteriorate under continuous thermal loading.
              </p>
            </div>
            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> A 7 kW home charger represents a load equivalent to 2-3
              average UK houses. This has major implications for cable sizing, DNO supply capacity,
              and local network loading — especially when multiple chargers are installed on the
              same street or estate.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>BS 7671 Section 722 and installation requirements</ContentEyebrow>

          <ConceptBlock title="Requirements that supplement the general wiring regulations">
            <p>
              BS 7671 Section 722 contains specific requirements for EV charging installations that
              supplement the general wiring regulations. These requirements address the unique
              characteristics of EV charging: high continuous current, outdoor exposure, connection
              to vehicles (which are extraneous-conductive-parts), and the PME earthing safety
              concern. The maintenance technician must understand these requirements for periodic
              inspection and testing.
            </p>
            <p>
              The 18th Edition of BS 7671 (Amendment 2:2022) strengthened the EV charging
              requirements, particularly around RCD selection and PME earthing. One of the most
              significant changes was the explicit requirement for Type B or Type B+ RCD protection
              where the EVSE does not incorporate its own DC fault detection. This is because the
              power electronics in the vehicle&apos;s onboard charger can generate DC fault currents
              that a standard Type A RCD cannot detect — potentially leaving an earth fault
              unprotected. The IET Code of Practice for Electric Vehicle Charging Equipment
              Installation (now in its 4th Edition) provides essential supplementary guidance for
              implementing Section 722.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Key Section 722 requirements">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>722.311:</strong> The supply cable shall be rated for the maximum demand of
                the EVSE with no diversity applied (continuous load).
              </li>
              <li>
                <strong>722.411.4.1:</strong> RCD protection: minimum 30 mA Type A RCD. Where the
                EVSE does not incorporate DC fault detection, a Type B or Type B+ (Type A with 6 mA
                DC detection) RCD is required.
              </li>
              <li>
                <strong>722.411.4:</strong> PME earthing restrictions for outdoor charging — earth
                electrode (TT) or EVSE with integral open-PEN protection.
              </li>
              <li>
                <strong>722.531.3:</strong> Each charge point shall be supplied by a dedicated
                circuit.
              </li>
              <li>
                <strong>722.55:</strong> EVSE shall comply with BS EN 61851-1 and the connector with
                BS EN 62196.
              </li>
              <li>
                <strong>722.514:</strong> Appropriate labelling at the distribution board and at the
                EVSE.
              </li>
            </ul>
          </ConceptBlock>

          <EvDedicatedCircuitSld caption="A single-phase domestic point: a dedicated Type A RCBO plus RDC-DD feeds a 6 mm² T+E/SWA cable to the EV charge point (Section 722) — sized for the full 7.4 kW continuous demand with no diversity." />

          <ConceptBlock title="RCD selection guide for EV charging">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">EVSE type</th>
                    <th className="py-2 pr-4 font-medium text-white">DC fault detection</th>
                    <th className="py-2 pr-4 font-medium text-white">Required RCD</th>
                    <th className="py-2 font-medium text-white">Typical cost</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">EVSE with integral DC detection</td>
                    <td className="py-2 pr-4">Built in (6 mA DC)</td>
                    <td className="py-2 pr-4">Type A 30 mA</td>
                    <td className="py-2">GBP 20-40</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">EVSE without DC detection</td>
                    <td className="py-2 pr-4">None</td>
                    <td className="py-2 pr-4">Type B or Type B+</td>
                    <td className="py-2">GBP 150-300</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Three-phase EVSE</td>
                    <td className="py-2 pr-4">Varies by model</td>
                    <td className="py-2 pr-4">Type B (if no integral DC detection)</td>
                    <td className="py-2">GBP 200-350</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="PME earthing solution">
            <p>
              The PME earthing issue is one of the most important installation considerations for EV
              charging. In a TN-C-S (PME) system, an open-PEN fault can cause exposed metalwork to
              rise to dangerous voltage. For outdoor EV charging, where a person touching the
              vehicle has good contact with true earth, this presents an increased risk of fatal
              electric shock.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Option 1:</strong> Install an earth electrode (earth rod) for the EV
                circuit, creating TT earthing with RCD protection. The main installation remains on
                PME. The earth rod must achieve adequate resistance (typically below 200 ohms for 30
                mA RCD).
              </li>
              <li>
                <strong>Option 2:</strong> Use an EVSE with manufacturer-confirmed integral open-PEN
                protection (PEN fault detection that disconnects the supply within safe limits).
              </li>
              <li>
                <strong>Option 3:</strong> Where the EVSE is indoors (e.g., in an integral garage),
                the PME earth may be acceptable subject to risk assessment, as the reduced contact
                with true earth lowers the shock risk.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Inspection note: common installation defects">
            <div className="rounded-lg border border-orange-500/30 bg-orange-500/10 p-4">
              <p className="text-sm text-white">
                During periodic inspection of EV charging circuits, the maintenance technician
                should be alert to common defects: incorrect RCD type (Type AC instead of Type A
                minimum); absence of earth electrode where required on PME installations; cable
                undersized for continuous load (diversity incorrectly applied); lack of labelling at
                the distribution board; tethered cable showing UV degradation or rodent damage; and
                loose terminations at the charger or distribution board caused by thermal cycling
                under continuous load.
              </p>
            </div>
            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The IET Code of Practice for Electric Vehicle Charging
              Equipment Installation (4th Edition) provides detailed guidance on implementing
              Section 722 requirements. It is essential reading for anyone installing or maintaining
              EV charging equipment.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Smart charging and load management</ContentEyebrow>

          <ConceptBlock title="Smart charging is not optional">
            <p>
              Smart charging is not optional — the Electric Vehicles (Smart Charge Points)
              Regulations 2021 mandate that all new domestic and workplace charge points must have
              smart functionality. This reflects the critical importance of managing EV charging
              demand on the electricity network. Without smart charging, mass EV adoption would
              require billions of pounds in network reinforcement to handle the additional peak
              demand.
            </p>
            <p>
              The core challenge is straightforward: if 10 million EVs in the UK all begin charging
              at 7 kW when their owners arrive home between 17:00 and 19:00, the additional demand
              would be 70 GW — more than double the current UK peak demand of approximately 45 GW.
              Smart charging addresses this by shifting demand to off-peak periods (typically
              00:00-05:00), responding to real-time grid signals, and coordinating with local
              network constraints. For the maintenance technician, smart charging adds an IT and
              communications dimension to what was traditionally purely electrical work — chargers
              must connect to cloud platforms via WiFi, Ethernet, or 4G/5G, and firmware updates
              must be managed.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Smart charge point requirements (2021 Regulations)">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Must be capable of sending and receiving data (WiFi, cellular, or Ethernet).</li>
              <li>Must support scheduled/delayed charging (shift to off-peak).</li>
              <li>
                Must have a randomised delay of up to 10 minutes at installation (preventing
                synchronised start).
              </li>
              <li>Must respond to demand-side response signals.</li>
              <li>Must support remote firmware updates.</li>
              <li>Must meet cybersecurity requirements (ETSI EN 303 645).</li>
              <li>Must default to off-peak charging schedule.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Load management solutions">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Static load management:</strong> Fixed maximum power allocation per charger
                (simple but inefficient).
              </li>
              <li>
                <strong>Dynamic load management:</strong> CT clamp on mains monitors total site
                demand; charger output adjusts in real-time.
              </li>
              <li>
                <strong>Sequential charging:</strong> Chargers take turns at full power (suitable
                for overnight fleet charging).
              </li>
              <li>
                <strong>First-come priority:</strong> First vehicle connected gets full power;
                subsequent vehicles share remaining capacity.
              </li>
              <li>
                <strong>Equal sharing:</strong> Available capacity divided equally among all
                connected vehicles.
              </li>
              <li>
                <strong>Priority-based:</strong> Certain chargers (e.g., emergency vehicles,
                disabled bays) get priority allocation.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Worked example: workplace load management">
            <p>
              A workplace has a 100 A three-phase supply (69 kW at 400 V) with an existing maximum
              demand of 45 kW. The available headroom is 24 kW. The client wants to install 10 x 7
              kW chargers (70 kW total installed capacity).
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Without load management:</strong> Only 3 chargers could operate
                simultaneously (21 kW) within the 24 kW headroom — a DNO supply upgrade would be
                needed at significant cost.
              </li>
              <li>
                <strong>With dynamic load management:</strong> All 10 chargers are installed, but
                the system monitors total site demand via a CT clamp and limits total EV charging to
                the available headroom. If 10 vehicles connect, each receives 2.4 kW (sufficient for
                8-hour overnight charge). As building load drops in the evening, more capacity is
                released to the chargers.
              </li>
              <li>
                <strong>Result:</strong> All vehicles are charged by morning without exceeding the
                supply capacity and without a DNO upgrade — saving GBP 10,000-30,000+ in
                infrastructure costs.
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Load management is often the difference between needing a
              DNO supply upgrade (GBP 3,000-30,000+) and working within the existing supply
              capacity. A CT clamp on the incoming supply combined with a smart load management
              controller can support significantly more chargers than the supply could handle with
              dumb chargers.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Maintenance, V2G and future developments</ContentEyebrow>

          <ConceptBlock title="Wear, corrosion and environmental exposure">
            <p>
              EV charging infrastructure requires regular maintenance to ensure safety, reliability,
              and compliance. As chargers operate in exposed outdoor environments with high
              continuous currents and frequent connect/disconnect cycles, they are subject to wear,
              corrosion, and environmental damage. Additionally, emerging technologies such as
              Vehicle-to-Grid (V2G), wireless charging, and ultra-rapid charging are expanding the
              scope of EV infrastructure maintenance.
            </p>
            <p>
              The maintenance regime for EVSE differs from traditional fixed electrical equipment
              because of the high number of mechanical cycles (connect/disconnect), the exposure to
              weather and UV radiation, the continuous thermal loading on cables and terminations,
              and the software/firmware dimension of smart chargers. A public rapid charger may see
              20-50 connections per day, each involving mechanical insertion and removal of a heavy
              connector — pin wear, contact resistance increase, and latch mechanism failure are all
              common maintenance issues that have no equivalent in conventional fixed electrical
              installations.
            </p>
          </ConceptBlock>

          <ConceptBlock title="EVSE maintenance checklist">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Cable condition: UV degradation, cuts, kinks, rodent damage.</li>
              <li>Connector pins: corrosion, carbon deposits, mechanical wear.</li>
              <li>Enclosure: water ingress, impact damage, ventilation.</li>
              <li>RCD trip test: 30 mA, verify trip time within limits.</li>
              <li>Earth continuity: main earth and earth electrode (TT).</li>
              <li>Insulation resistance: 500 V DC test.</li>
              <li>Smart features: communication, firmware, scheduling.</li>
              <li>Labels: condition, legibility, compliance.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Future EV charging technologies">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>V2G:</strong> Bidirectional charging enabling EV batteries to provide grid
                services.
              </li>
              <li>
                <strong>V2H:</strong> Vehicle-to-home — EV powers household during outages.
              </li>
              <li>
                <strong>Wireless charging:</strong> Inductive charging pads in parking spaces.
              </li>
              <li>
                <strong>Ultra-rapid:</strong> 350 kW+ DC charging (10-80% in 15-20 minutes).
              </li>
              <li>
                <strong>Battery swapping:</strong> Automated battery exchange stations.
              </li>
              <li>
                <strong>Solar canopy:</strong> PV-integrated car park charging structures.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Vehicle-to-grid (V2G) implications">
            <p>
              V2G transforms the EV from a passive load into an active distributed energy resource.
              The implications for electrical installations are significant:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                Bidirectional charger required (not standard — additional cost and complexity).
              </li>
              <li>G98/G99 compliance required for grid export capability.</li>
              <li>Anti-islanding protection mandatory (same as PV and battery storage).</li>
              <li>Export metering required for revenue settlement.</li>
              <li>DNO notification of generation capability.</li>
              <li>
                Battery degradation management (limiting V2G cycles to protect battery health).
              </li>
              <li>Cybersecurity for bidirectional energy flow and grid services commands.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Maintenance frequency guide">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">EVSE location</th>
                    <th className="py-2 pr-4 font-medium text-white">Visual inspection</th>
                    <th className="py-2 pr-4 font-medium text-white">Electrical test</th>
                    <th className="py-2 font-medium text-white">Firmware check</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Domestic</td>
                    <td className="py-2 pr-4">Annually</td>
                    <td className="py-2 pr-4">Annually</td>
                    <td className="py-2">Automatic (OTA)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Workplace</td>
                    <td className="py-2 pr-4">Monthly</td>
                    <td className="py-2 pr-4">Quarterly</td>
                    <td className="py-2">Quarterly</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Public (AC)</td>
                    <td className="py-2 pr-4">Monthly</td>
                    <td className="py-2 pr-4">Quarterly</td>
                    <td className="py-2">Monthly</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Public (DC Rapid)</td>
                    <td className="py-2 pr-4">Weekly</td>
                    <td className="py-2 pr-4">Quarterly</td>
                    <td className="py-2">Monthly</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <p className="text-sm text-white italic">
            <strong>Note:</strong> Under ST1426, maintenance technicians must demonstrate knowledge
            of EV charging technology as part of the emerging technologies module. With EV charger
            installations growing exponentially and Building Regulations Part S requiring EV
            provision in new buildings, EV charging maintenance will become a core competency for
            electrical maintenance technicians. Technicians who develop expertise in EV charging
            installation and maintenance will be well-positioned in a rapidly growing market.
          </p>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Building Regulations Part S and the growing EV market</ContentEyebrow>

          <ConceptBlock title="A landmark requirement for new buildings in England">
            <p>
              The Building Regulations 2022 (Approved Document S) represent a landmark requirement
              for EV charging infrastructure in new buildings across England. Similar provisions
              apply in Scotland and Wales under their respective building regulations. For the
              maintenance technician, Part S means that every new building with associated parking
              will have EV charging infrastructure from day one — creating a significant and growing
              maintenance workload.
            </p>
            <p>
              The rationale behind Part S is economic: retrofitting EV charging infrastructure into
              existing buildings typically costs 3-5 times more than installing it during
              construction. By requiring cable routes, electrical capacity, and active charge points
              from the outset, Part S ensures that buildings are future-proofed for the transition
              to electric vehicles. For large commercial developments, this means hundreds of cable
              routes and dozens of active charge points — each requiring commissioning, periodic
              inspection, and ongoing maintenance.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Part S requirements summary">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>New residential:</strong> At least one charge point per dwelling with
                associated parking — minimum 7 kW, Mode 3, smart-enabled.
              </li>
              <li>
                <strong>New non-residential:</strong> One charge point per five parking spaces plus
                cable routes to every remaining space (buildings with more than 10 spaces).
              </li>
              <li>
                <strong>Major renovations:</strong> Non-residential buildings with more than 10
                spaces undergoing major renovation must provide at least one charge point.
              </li>
              <li>
                <strong>Cable routes:</strong> Where charge points are not installed immediately,
                cable routes (ducting, containment) must be provided to enable future installation.
              </li>
              <li>
                <strong>Smart functionality:</strong> All charge points must comply with the
                Electric Vehicles (Smart Charge Points) Regulations 2021.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Impact on the maintenance technician">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Volume:</strong> Hundreds of thousands of new charge points installed
                annually, all requiring periodic inspection and testing under BS 7671.
              </li>
              <li>
                <strong>Diversity:</strong> Multiple manufacturers, models, and firmware versions
                across different sites — maintenance technicians need broad product knowledge.
              </li>
              <li>
                <strong>Smart systems:</strong> Charge point management platforms require
                IT/networking skills alongside traditional electrical competence.
              </li>
              <li>
                <strong>Load management:</strong> Multi-charger sites with dynamic load management
                need commissioning verification and ongoing functional testing.
              </li>
              <li>
                <strong>Career opportunity:</strong> EV charging maintenance is a rapidly growing
                specialism — technicians with this expertise are in high demand.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Case study: new-build office development">
            <p>
              A new office building in Manchester has a 200-space car park. Under Part S
              requirements:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Active charge points:</strong> 40 (one per five spaces), each 7 kW Mode 3
                with smart functionality — total installed capacity 280 kW.
              </li>
              <li>
                <strong>Cable routes:</strong> Ducting and containment to all remaining 160 spaces
                for future charge point installation.
              </li>
              <li>
                <strong>Electrical infrastructure:</strong> Three-phase supply upgrade, dedicated EV
                distribution board, dynamic load management system with CT monitoring on the main
                incomer.
              </li>
              <li>
                <strong>Maintenance contract:</strong> Monthly visual inspection, quarterly
                electrical testing, firmware management via cloud platform, 24/7 fault monitoring
                with 4-hour response SLA.
              </li>
              <li>
                <strong>Annual maintenance cost:</strong> Approximately GBP 15,000-25,000 per year
                for 40 chargers — a significant recurring revenue stream for electrical maintenance
                contractors.
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Part S ensures that EV charging is not an afterthought but
              a fundamental building service. The maintenance technician who understands EV charging
              installation standards, smart charging systems, and load management will be equipped
              for one of the fastest-growing areas in electrical maintenance.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'Mode 2: domestic socket + ICCD (2.3 kW max). Mode 3: dedicated EVSE + Type 2 (3.6-22 kW).',
              'Mode 4: DC rapid + CCS/CHAdeMO (50-350 kW). Type 2 (Mennekes): 7-pin AC standard.',
              'CCS: Type 2 + DC pins (dominant rapid). Control pilot: 1 kHz PWM, duty cycle = max current.',
              'BS 7671 Section 722: EV charging requirements. IEC 61851: EV charging modes. IEC 62196: connector types.',
              'Part S (2022, England): EV provision in new builds. Smart Charge Points Regs 2021: mandatory smart.',
              '722.411.4: PME earthing restrictions. 722.311: no diversity (continuous load).',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section6-4')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Smart Grids and Smart Meters
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next module <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Module 4 · Maintenance techniques and fault diagnosis
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule3Section6_5;
