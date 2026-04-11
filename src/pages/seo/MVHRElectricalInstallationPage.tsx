import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Fan,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Calculator,
  Zap,
  Wrench,
  Cable,
  GraduationCap,
  ClipboardCheck,
  Droplets,
  Thermometer,
  Home,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/electrical-certificate-types-uk' },
  { label: 'MVHR Electrical Installation', href: '/guides/mvhr-electrical-installation' },
];

const tocItems = [
  { id: 'overview', label: 'What Is MVHR?' },
  { id: 'dedicated-circuit', label: 'Dedicated Circuit Requirements' },
  { id: 'boost-switch', label: 'Boost Switch Wiring' },
  { id: 'summer-bypass', label: 'Summer Bypass Controls' },
  { id: 'condensate-pump', label: 'Condensate Pump Circuit' },
  { id: 'duct-heater', label: 'Duct Heater Circuit' },
  { id: 'building-regs', label: 'Building Regulations Part F' },
  { id: 'commissioning', label: 'Commissioning and Testing' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'MVHR (Mechanical Ventilation with Heat Recovery) units require a dedicated fused spur or MCB circuit from the consumer unit — typically a 3A or 5A fused connection unit for units drawing 50 to 200W.',
  'Boost switch wiring connects a momentary or latched switch (typically in the kitchen and bathroom) to the MVHR controller, triggering high-speed extraction during cooking or bathing.',
  'A summer bypass control allows the MVHR to bring in fresh air without passing through the heat exchanger when the outdoor temperature is higher than desired — controlled by an automatic damper motor wired to the MVHR controller.',
  'Condensate drain or pump is required because the heat exchanger produces condensate. If gravity drainage is not possible, a condensate pump needs a power supply.',
  'Building Regulations Approved Document F (Ventilation) sets the minimum ventilation rates that the MVHR system must achieve, and the system must be commissioned to demonstrate compliance.',
];

const faqs = [
  {
    question: 'What is MVHR and why does it need an electrician?',
    answer:
      'MVHR (Mechanical Ventilation with Heat Recovery) is a whole-house ventilation system that extracts stale air from wet rooms (kitchen, bathroom, utility) and supplies fresh air to habitable rooms (bedrooms, living room). A heat exchanger recovers up to 90% of the heat from the extracted air and transfers it to the incoming fresh air. The electrical work includes the dedicated power supply circuit, boost switch wiring in kitchens and bathrooms, summer bypass control wiring, condensate pump circuit (if needed), post-heater circuit (if fitted), and the final commissioning. MVHR is increasingly standard in new-build and retrofit projects where the building is well-sealed.',
  },
  {
    question: 'What size circuit does an MVHR unit need?',
    answer:
      'Most domestic MVHR units draw between 50W and 200W at normal speed, increasing to 300W or more at boost speed. This is a low-power load — typically supplied via a 3A or 5A fused connection unit (FCU) or a dedicated 6A MCB at the consumer unit. The cable is usually 1.5mm twin and earth. The unit must have a local means of isolation (the FCU provides this). Some larger commercial MVHR units may require a higher-rated supply — always check the manufacturer specification.',
  },
  {
    question: 'How does the boost switch work?',
    answer:
      'The boost switch is a wall-mounted switch (momentary push-button or latched rocker) installed in the kitchen, bathroom, or utility room. When activated, it signals the MVHR controller to increase the fan speed to the boost rate for a set period (typically 15 to 30 minutes, configurable). The wiring is typically a 2-core low-voltage signal cable from the switch to the MVHR controller, though some systems use a 230V switched live connection. Some MVHR systems also support humidity sensors that trigger boost automatically when humidity rises — these sensors need a power supply and signal connection to the controller.',
  },
  {
    question: 'What is the summer bypass and how is it wired?',
    answer:
      'In summer, the heat recovery function is not needed — you do not want to heat the incoming air when the outdoor temperature is already comfortable. The summer bypass is an automatic damper inside the MVHR unit that diverts the incoming air around the heat exchanger. The damper motor is wired to the MVHR controller and activates based on temperature sensors (outdoor temperature vs indoor temperature). Some systems have a manual override switch. The wiring is typically a low-voltage signal connection between the damper motor and the controller — follow the manufacturer wiring diagram.',
  },
  {
    question: 'Does an MVHR system need a condensate pump?',
    answer:
      'The heat exchanger produces condensate (water extracted from the warm, moist outgoing air). This condensate must be drained — ideally by gravity to an internal waste pipe or external drain. If gravity drainage is not possible (for example, if the MVHR unit is in a loft space below the nearest waste pipe), a condensate pump is needed. The condensate pump requires a power supply — typically a 3-pin plug connection or a fused spur. The pump itself draws very little power (10 to 30W) but must be on a circuit that remains energised whenever the MVHR is running.',
  },
  {
    question: 'When is a duct heater needed and how is it wired?',
    answer:
      'A post-heater (also called a duct heater or in-line heater) is installed in the supply air duct after the MVHR unit to provide additional heating to the incoming air during very cold weather. This is sometimes used in Passivhaus or highly insulated buildings where the MVHR supply air serves as the primary heating source. A typical duct heater is 1 to 3kW and requires its own dedicated circuit — a 10A or 16A MCB with appropriately sized cable. The heater is controlled by the MVHR system (activated when the supply air temperature falls below a setpoint) or by a separate thermostat in the duct.',
  },
  {
    question: 'What commissioning is required for an MVHR system?',
    answer:
      'Building Regulations Approved Document F requires the MVHR system to be commissioned to demonstrate that the ventilation rates meet the minimum requirements. Commissioning involves measuring the airflow at each supply and extract terminal using a balometer or anemometer, adjusting the dampers and fan speed to achieve the design flow rates, recording the results on a commissioning sheet, and providing the commissioning data to Building Control as part of the completion certificate. The electrician is responsible for verifying the electrical installation (testing, EIC) and may assist with the commissioning alongside the ventilation installer.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/air-source-heat-pump-electrical',
    title: 'Air Source Heat Pump Electrical',
    description: 'MVHR is often installed alongside heat pumps in energy-efficient homes.',
    icon: Thermometer,
    category: 'Guide',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size cables for MVHR circuits, duct heaters, and condensate pumps.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for MVHR installations on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/building-regulations-electrical',
    title: 'Building Regulations Electrical',
    description:
      'MVHR installations must comply with Part F and Part P of the Building Regulations.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote MVHR electrical work professionally with itemised costs.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 with structured training modules covering all installation types.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'MVHR Electrical Installation: What Electricians Need to Know',
    content: (
      <>
        <p>
          Mechanical Ventilation with Heat Recovery (MVHR) is becoming standard in new-build homes
          and energy-efficient retrofits. As buildings become better insulated and more airtight,
          natural ventilation through gaps and openings is no longer sufficient — and opening
          windows defeats the purpose of insulation. MVHR provides controlled ventilation while
          recovering up to 90% of the heat that would otherwise be lost.
        </p>
        <p>
          An MVHR system consists of a central unit (typically installed in a utility room, loft, or
          cupboard) connected to a network of ducts that supply fresh air to habitable rooms and
          extract stale air from wet rooms. The heart of the system is the heat exchanger, which
          transfers heat from the outgoing air to the incoming air without the two airstreams
          mixing.
        </p>
        <p>
          The electrical scope includes the dedicated power supply, boost switch wiring, summer
          bypass control, condensate pump circuit (if needed), duct heater circuit (if fitted), and
          commissioning. This guide covers each element in detail.
        </p>
      </>
    ),
  },
  {
    id: 'dedicated-circuit',
    heading: 'Dedicated Circuit Requirements',
    content: (
      <>
        <p>
          The MVHR unit requires a dedicated electrical supply. Although the power consumption is
          low (50 to 300W), a dedicated circuit ensures the unit is not affected by other loads
          tripping and provides a clear means of isolation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supply arrangement</strong> — a switched fused connection unit (FCU) with a
                3A or 5A fuse is the standard arrangement. The FCU provides local isolation and
                overcurrent protection. Alternatively, a dedicated 6A MCB at the consumer unit with
                a double-pole switch adjacent to the unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable</strong> — 1.5mm twin and earth is adequate for the low power draw.
                Route the cable to the MVHR unit location, terminating at the FCU or double-pole
                switch. The unit is then connected via a flex outlet plate or direct connection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Location</strong> — the MVHR unit must be accessible for filter changes
                (every 3 to 6 months) and servicing. Common locations include utility rooms, large
                cupboards, and loft spaces. If in the loft, ensure the circuit and isolator are
                accessible without specialist equipment.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'boost-switch',
    heading: 'Boost Switch Wiring',
    content: (
      <>
        <p>
          Boost switches allow the occupant to temporarily increase the MVHR fan speed for rapid air
          extraction — typically during cooking, bathing, or when humidity is high.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Switch type</strong> — momentary push-button (press once to activate boost,
                it runs for a timed period then returns to normal) or latched rocker switch (on/off
                manual control). Some systems accept both types — check the MVHR controller input
                specification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wiring</strong> — most MVHR systems use a low-voltage signal input for the
                boost switch — typically a volt-free contact (two wires from the switch to the
                controller terminal strip). Some systems use a 230V switched live input. Run a
                2-core (or 3-core if 230V) cable from each boost switch location to the MVHR
                controller.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Locations</strong> — install boost switches in the kitchen, bathroom, and
                any other room with an extract terminal. Position at standard light switch height
                (1.0 to 1.2m). Some systems use a dedicated boost switch plate; others can use a
                standard retractive light switch.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Humidity sensors</strong> — as an alternative (or addition) to manual boost
                switches, humidity sensors can trigger boost automatically. These are wired to the
                MVHR controller and powered from the controller or a separate supply.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'summer-bypass',
    heading: 'Summer Bypass Controls',
    content: (
      <>
        <p>
          The summer bypass is a critical feature that prevents the MVHR from heating incoming air
          when heat recovery is not wanted. In summer, fresh air is routed around the heat exchanger
          to provide ventilation cooling.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Automatic bypass</strong> — a motorised damper inside the MVHR unit diverts
                the incoming air around the heat exchanger. The damper motor is controlled by the
                MVHR controller based on indoor and outdoor temperature sensors. The wiring is
                internal to the unit in many cases, but some systems require an external temperature
                sensor to be wired to the controller.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Manual override</strong> — some systems include a manual bypass override
                switch on the controller or a remote switch. This allows the occupant to force
                bypass mode regardless of temperature conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Temperature sensors</strong> — if the MVHR requires external temperature
                sensors for bypass control, these are typically NTC thermistors on 2-core cable,
                mounted at the supply air intake and in a habitable room. Run the sensor cables back
                to the MVHR controller.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'condensate-pump',
    heading: 'Condensate Pump Circuit',
    content: (
      <>
        <p>
          The heat exchanger in an MVHR unit extracts moisture from the outgoing air, producing
          condensate that must be drained. The volume is modest — typically 1 to 3 litres per day in
          a domestic system — but it must be managed.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Gravity drainage</strong> — the preferred option. A 22mm overflow pipe from
                the MVHR condensate outlet to a nearby waste pipe or external drain. No electrical
                work needed for the drain itself.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Condensate pump</strong> — needed when the MVHR is below the nearest drain
                point or in a loft space. A small pump (10 to 30W) lifts the condensate to a waste
                pipe. The pump requires a power supply — typically a 3-pin plug to a nearby socket
                or a fused spur. The pump must remain energised whenever the MVHR is running.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overflow alarm</strong> — some condensate pumps include an overflow sensor
                that can signal the MVHR controller to shut down if the pump fails or the drain
                blocks. Wire the alarm output to the MVHR controller fault input if available.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'duct-heater',
    heading: 'Duct Heater Circuit',
    content: (
      <>
        <p>
          A post-heater (duct heater) is an electric heating element installed in the supply air
          duct after the MVHR unit. It provides additional heating to the incoming air during very
          cold weather and is most commonly found in Passivhaus and ultra-low energy buildings where
          the MVHR supply air is the primary heating delivery mechanism.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Power rating</strong> — domestic duct heaters are typically 1 to 3kW. A 2kW
                heater draws approximately 8.7A at 230V. This requires its own dedicated circuit — a
                10A or 16A MCB with 1.5mm or 2.5mm cable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Safety interlocks</strong> — the duct heater must be interlocked with the
                MVHR fan so it cannot operate without airflow (which would cause overheating). This
                interlock is typically managed by the MVHR controller, which provides a control
                signal or relay contact to enable the heater only when the fan is running.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thermal cut-out</strong> — the duct heater must have a manual-reset thermal
                cut-out to prevent overheating if the airflow drops below the safe level. This is
                usually built into the heater element but must be verified during commissioning.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Duct fire rating</strong> — where a duct heater is installed, the ducting
                must be suitable for the temperatures involved. Metallic ductwork is required in the
                immediate vicinity of the heater element. Fire dampers may be needed in duct
                penetrations through fire compartment walls.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'building-regs',
    heading: 'Building Regulations Approved Document F',
    content: (
      <>
        <p>
          Building Regulations Approved Document F (Ventilation) sets the minimum requirements for
          ventilation in dwellings. MVHR is one of the approved ventilation strategies (System 4 in
          the Approved Document). The key requirements are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minimum extract rates</strong> — kitchen: 13 litres per second (l/s) at
                boost, bathroom: 8 l/s, utility room: 8 l/s, WC: 6 l/s. These are the minimum rates
                that the MVHR must achieve at boost speed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Whole-house ventilation rate</strong> — the continuous background
                ventilation rate (trickle speed) must provide at least 0.3 l/s per m2 of internal
                floor area. For a 100m2 dwelling, this is 30 l/s continuous.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Specific Fan Power (SFP)</strong> — the MVHR must achieve a Specific Fan
                Power of no more than 1.5 W/(l/s) for the whole system. This limits the total
                electrical power consumption relative to the airflow delivered.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commissioning</strong> — the system must be commissioned and the results
                recorded. The commissioning data is submitted to Building Control as evidence of
                compliance.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The electrical installation is notifiable under Part P of the Building Regulations (new
          circuit from the consumer unit). Notify through your competent person scheme.
        </p>
      </>
    ),
  },
  {
    id: 'commissioning',
    heading: 'Commissioning and Testing',
    content: (
      <>
        <p>
          Commissioning an MVHR system involves both electrical testing and airflow verification.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical testing</strong> — continuity of protective conductors,
                insulation resistance, polarity, earth fault loop impedance, and RCD operation on
                the MVHR circuit (and duct heater circuit if fitted). Issue an EIC or Minor Works
                Certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Functional testing</strong> — verify the MVHR operates on all speed settings
                (trickle, normal, boost). Test each boost switch. Verify the summer bypass activates
                and deactivates at the correct temperature thresholds. Test the condensate pump (if
                fitted). Test the duct heater interlock and thermal cut-out (if fitted).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Airflow commissioning</strong> — measure the airflow at each supply and
                extract terminal using a balometer or anemometer. Adjust duct dampers and fan speed
                to achieve the design flow rates per Approved Document F. Record the results on the
                commissioning sheet.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Documentation</strong> — the commissioning record, EIC, and MVHR system
                specifications are submitted to Building Control as part of the completion
                certificate. Provide the homeowner with the commissioning data, filter replacement
                schedule, and operating instructions.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: The MVHR Opportunity',
    content: (
      <>
        <p>
          MVHR installation is growing rapidly as Building Regulations tighten and more homes are
          built (or retrofitted) to high insulation standards. The electrical scope is typically
          worth £300 to £800 per installation, with more complex systems (duct heaters, multiple
          zones, humidity sensors) commanding higher prices.
        </p>
        <p>
          Building relationships with ventilation installers and new-build developers provides a
          steady stream of MVHR electrical work. As an electrician, your value is in getting the
          wiring right first time — incorrect boost switch wiring or missing condensate pump
          circuits are common snags that delay handover.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing Calculator</h4>
                <p className="text-white text-sm leading-relaxed">
                  Size the MVHR circuit and duct heater circuit with the{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>
                  .
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quoting App</h4>
                <p className="text-white text-sm leading-relaxed">
                  Price MVHR electrical work with Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Dedicated circuit, boost switches, condensate pump, duct heater — all itemised.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC Certificate on Your Phone</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete the EIC for MVHR circuits on site. AI board scanning, voice test entry,
                  and instant PDF export for the Building Control documentation package.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote, install, and certify MVHR electrical work"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site EIC certification. Everything you need for MVHR installations. 7-day free trial."
          icon={Fan}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function MVHRElectricalInstallationPage() {
  return (
    <GuideTemplate
      title="MVHR Electrical Installation | Ventilation Wiring Guide"
      description="Complete guide to MVHR electrical installation in the UK. Dedicated circuit, boost switch wiring, summer bypass controls, condensate pump, duct heater circuit, Building Regulations Part F compliance, and commissioning requirements."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Emerging Technology"
      badgeIcon={Fan}
      heroTitle={
        <>
          MVHR Electrical Installation:{' '}
          <span className="text-yellow-400">Ventilation Wiring Guide for UK Electricians</span>
        </>
      }
      heroSubtitle="Mechanical Ventilation with Heat Recovery is becoming standard in energy-efficient homes. This guide covers the dedicated circuit, boost switch wiring, summer bypass, condensate pump, duct heater, Building Regs Part F compliance, and commissioning."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About MVHR Electrical Installation"
      relatedPages={relatedPages}
      ctaHeading="Size Cables and Certify MVHR Installations on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site EIC certificates for MVHR installations. 7-day free trial, cancel anytime."
    />
  );
}
