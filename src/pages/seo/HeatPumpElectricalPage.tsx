import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Wind,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Cable,
  GraduationCap,
  Calculator,
  Gauge,
  CheckCircle,
  Zap,
  PoundSterling,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Heat Pump', href: '/guides/heat-pump-electrical-requirements' },
];

const tocItems = [
  { id: 'overview', label: 'Heat Pump Electrical Overview' },
  { id: 'single-vs-three-phase', label: 'Single Phase vs Three Phase' },
  { id: 'cable-sizing', label: 'Cable Sizing' },
  { id: 'mcb-rating', label: 'MCB Rating and Protection' },
  { id: 'dedicated-circuit', label: 'Dedicated Circuit Design' },
  { id: 'bus-grant', label: 'BUS Grant and MCS Requirements' },
  { id: 'commissioning', label: 'Commissioning and Certification' },
  { id: 'for-electricians', label: 'For Electricians Installing Heat Pumps' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Most domestic air source heat pumps (5-12kW) run on a single-phase 230V supply with a dedicated radial circuit, typically 32A MCB with 6mm2 or 10mm2 cable depending on the current draw and run length.',
  'Larger heat pumps (above 14kW) and ground source systems may require a three-phase 400V supply, which involves a DNO application and potentially a new three-phase meter.',
  'The heat pump must have its own dedicated circuit from the consumer unit — it cannot share with other loads. An isolator switch must be installed within reach of the outdoor unit.',
  'BUS (Boiler Upgrade Scheme) grants of up to £7,500 require the installation to be completed by an MCS-certified installer and the electrical work to be signed off with an EIC.',
  'Elec-Mate cable sizing calculators, circuit design tools, and EIC certificates let electricians design, verify, and certify heat pump electrical supplies on site.',
];

const faqs = [
  {
    question: 'What electrical supply does a heat pump need?',
    answer:
      'The electrical supply depends on the heat pump model and its power consumption. Most domestic air source heat pumps (ASHP) in the 5 to 12kW thermal output range have an electrical input of approximately 1.5 to 4kW and run on a standard single-phase 230V supply. They require a dedicated radial circuit from the consumer unit, typically protected by a 20A or 32A MCB depending on the maximum current draw. Larger heat pumps — particularly ground source heat pumps (GSHP) or high-output ASHPs above 14kW — may draw more than the single-phase supply can provide, requiring a three-phase 400V supply. Always check the manufacturer data sheet for the maximum electrical input, starting current (which can be significantly higher than the running current due to compressor inrush), and the recommended MCB/fuse rating. The manufacturer installation manual will specify the supply requirements, cable size, and protection details.',
  },
  {
    question: 'How do I size the cable for a heat pump?',
    answer:
      'Cable sizing follows the standard BS 7671 Appendix 4 method. Start with the design current (Ib) from the manufacturer data — this is the maximum current draw during normal operation, typically stated on the data plate or in the installation manual. Select an MCB rating (In) that is equal to or greater than Ib. Then select a cable size whose current carrying capacity (Iz), after applying correction factors for ambient temperature (Ca), grouping (Cg), and thermal insulation (Ci), is equal to or greater than In. Finally, check voltage drop — the maximum allowable is 5% (11.5V at 230V) from the origin to the heat pump. For a typical 12kW ASHP with a maximum electrical input of 4kW (approximately 17A at 230V) on a 20A MCB, 4mm2 twin and earth is often sufficient for short runs (under 25m), while 6mm2 is needed for longer runs. For higher-powered units on a 32A MCB, 6mm2 or 10mm2 is typically required. Use SWA (steel wire armoured) cable for the external run from the building to the outdoor unit.',
  },
  {
    question: 'Does a heat pump need its own circuit breaker?',
    answer:
      'Yes. A heat pump must be supplied by a dedicated circuit from the consumer unit with its own MCB or RCBO. The circuit must not be shared with any other load. This is because the heat pump draws significant current for extended periods (it is a continuous load) and has specific protection requirements. The MCB type depends on the starting current of the compressor — Type C MCBs are commonly specified for heat pumps because the compressor inrush current (which can be 3 to 5 times the running current for a fraction of a second) may nuisance-trip a Type B MCB. Check the manufacturer installation manual for the recommended MCB type and rating. Additionally, a local isolator switch must be installed adjacent to the outdoor unit, within arm reach, to allow safe isolation for maintenance and servicing.',
  },
  {
    question: 'Do I need RCD protection for a heat pump circuit?',
    answer:
      'Under BS 7671:2018+A3:2024, all circuits in domestic premises require 30mA RCD protection (Regulation 411.3.3). The heat pump circuit is no exception. An RCBO at the consumer unit is the preferred solution — it provides both MCB and RCD protection in a single device without affecting other circuits if it trips. Some heat pump manufacturers recommend a Type A or Type B RCD rather than a standard Type AC, because the inverter-driven compressor in modern heat pumps can produce DC fault currents that a Type AC RCD may not detect. Check the manufacturer data sheet for the recommended RCD type. If a Type B RCD is specified, be aware that these are significantly more expensive than standard RCBOs and require a deeper consumer unit enclosure. Type A RCDs are more commonly available and are sufficient for most heat pump installations.',
  },
  {
    question: 'What is the BUS (Boiler Upgrade Scheme) grant?',
    answer:
      'The Boiler Upgrade Scheme (BUS) is a UK Government grant providing up to £7,500 towards the cost of installing an air source heat pump (ASHP) or ground source heat pump (GSHP) in an existing domestic property in England and Wales. The grant was originally £5,000 for ASHPs and £6,000 for GSHPs, but was increased to £7,500 for both types from October 2023. To qualify, the property must have an existing valid Energy Performance Certificate (EPC) with no outstanding recommendations for loft or cavity wall insulation, and the installation must be carried out by an MCS (Microgeneration Certification Scheme) certified installer. The electrical work must be completed to BS 7671 standards with an Electrical Installation Certificate (EIC) issued for the new circuit. The grant is applied for by the MCS installer, not the homeowner, and is paid directly to the installer to offset the installation cost.',
  },
  {
    question: 'Can my existing consumer unit handle a heat pump?',
    answer:
      'This depends on the available spare capacity in your consumer unit and the main incoming supply. A heat pump drawing 17A continuously on top of the existing household load may push the total demand close to or beyond the capacity of a standard 100A single-phase supply. Before installing a heat pump, calculate the maximum demand of the property including the heat pump using BS 7671 Appendix 15 (formerly Appendix 1). If the total maximum demand exceeds the supply capacity, you may need to apply to the Distribution Network Operator (DNO) for a supply upgrade. The consumer unit must also have a spare way (or be extended with an additional enclosure) for the heat pump RCBO. If the existing consumer unit is old, does not have RCD protection, or does not comply with current regulations, a consumer unit upgrade may be required as part of the heat pump installation.',
  },
  {
    question: 'Do I need to notify the DNO before installing a heat pump?',
    answer:
      'You should notify the Distribution Network Operator (DNO) before installing a heat pump, particularly if the installation significantly increases the maximum demand on the supply. Most DNOs require notification for any load above 13.8kW (60A on a single-phase supply) or for any three-phase installation. Even for smaller heat pumps, notification is good practice because the DNO needs to maintain an accurate record of the loads on their network. If a supply upgrade is needed (for example, from a single-phase 60A to a single-phase 100A supply, or from single-phase to three-phase), the DNO application must be submitted well in advance — lead times of 8 to 12 weeks are common, and complex upgrades can take longer. The MCS installer typically handles the DNO notification as part of the installation process, but the electrician should confirm this during the design stage.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size the dedicated circuit for any heat pump installation with full BS 7671 correction factors.',
    icon: Calculator,
    category: 'Calculator',
  },
  {
    href: '/tools/max-demand-calculator',
    title: 'Max Demand Calculator',
    description:
      'Calculate the total maximum demand of the property including the new heat pump load.',
    icon: Gauge,
    category: 'Calculator',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete the Electrical Installation Certificate for the new heat pump circuit on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description: 'MCB, RCBO, and SPD requirements for adding new circuits to the consumer unit.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description: 'Verify voltage drop on long SWA runs to outdoor heat pump units.',
    icon: Gauge,
    category: 'Calculator',
  },
  {
    href: '/guides/three-phase-installation',
    title: 'Three Phase Installation Guide',
    description:
      'Everything you need to know about three-phase supplies for larger heat pump installations.',
    icon: Zap,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Heat Pump Electrical Requirements: What Electricians Need to Know',
    content: (
      <>
        <p>
          Heat pumps are replacing gas boilers across the UK as part of the Government's drive
          towards net zero carbon emissions by 2050. For electricians, this represents a major
          growth area — every heat pump installation requires a dedicated electrical supply, and the
          electrical work must be designed, installed, tested, and certified to{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          standards.
        </p>
        <p>
          The electrical requirements depend on the type and size of heat pump. Air source heat
          pumps (ASHPs) are the most common domestic installation, with thermal outputs typically
          between 5kW and 16kW. Ground source heat pumps (GSHPs) tend to be larger, from 8kW to
          45kW. The electrical input (the power the heat pump draws from the mains) is lower than
          the thermal output because heat pumps are not 100% efficient heaters — they move heat
          rather than generating it, achieving coefficients of performance (COP) of 2.5 to 4.5.
        </p>
        <p>
          This guide covers the key electrical design decisions: single-phase vs three-phase supply,
          cable sizing, MCB selection, dedicated circuit design, and the certification requirements
          for BUS grant compliance.
        </p>
      </>
    ),
  },
  {
    id: 'single-vs-three-phase',
    heading: 'Single Phase vs Three Phase Supply',
    content: (
      <>
        <p>
          The choice between single-phase and three-phase supply depends on the heat pump's
          electrical input and the existing supply to the property.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Single Phase (230V)</h3>
            <p className="text-white text-sm leading-relaxed">
              Suitable for most domestic ASHPs up to about 12kW thermal output (approximately 4kW
              electrical input, drawing up to 17A). The existing single-phase supply is usually
              sufficient, provided the total maximum demand of the property (including the heat
              pump) does not exceed the supply capacity (typically 100A for modern supplies, 60A or
              80A for older supplies). A dedicated radial circuit from the consumer unit is
              required. This is the simplest and most common installation type.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Three Phase (400V)</h3>
            <p className="text-white text-sm leading-relaxed">
              Required for larger heat pumps — typically GSHPs or high-output ASHPs above 14kW
              thermal output (approximately 5kW+ electrical input). Three-phase supply distributes
              the load across three phases, reducing the current on each phase and allowing higher
              total power. If the property does not already have a three-phase supply, a DNO
              application is required — this involves installing a new three-phase meter and may
              require cable upgrades from the transformer. Lead times are typically 8 to 16 weeks
              and the cost varies by location.
            </p>
          </div>
        </div>
        <p>
          Before specifying the supply type, always check the manufacturer's installation manual for
          the specific model. Some heat pumps are available in both single-phase and three-phase
          variants. For borderline cases (around 12-14kW thermal output), check the maximum
          electrical input current and compare it with the available supply capacity using a{' '}
          <SEOInternalLink href="/tools/max-demand-calculator">
            maximum demand calculation
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'cable-sizing',
    heading: 'Cable Sizing for Heat Pump Circuits',
    content: (
      <>
        <p>
          The supply cable from the consumer unit to the heat pump must be correctly sized using the
          standard BS 7671 Appendix 4 methodology. Heat pump installations have some specific
          considerations that affect the cable selection.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Design current (Ib):</strong> The maximum operating current from the
                manufacturer data sheet. For a typical domestic ASHP, this is between 10A and 20A on
                single phase. This is a continuous load — no diversity reduction.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Starting current:</strong> Compressors draw a high inrush current at
                start-up, typically 3 to 5 times the running current for a fraction of a second.
                This affects MCB selection (Type C recommended) but does not affect cable sizing —
                the inrush duration is too short to cause cable heating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>External cable run:</strong> The cable from the building to the outdoor heat
                pump unit is typically SWA (steel wire armoured) to provide mechanical protection.
                SWA cable has different current ratings and mV/A/m values than T&E — use the correct
                tables from{' '}
                <SEOInternalLink href="/guides/cable-sizing-guide-bs-7671">
                  BS 7671 Appendix 4
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Voltage drop:</strong> Long runs from the consumer unit through the building
                and externally to the heat pump can result in significant voltage drop. Maximum 5%
                (11.5V at 230V). Calculate for both the internal T&E section and the external SWA
                section, and add them together.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Typical Cable Sizes</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small ASHP (5-8kW thermal, up to 12A):</strong> 4mm2 T&E internal + 4mm2 SWA
                external, 20A Type C MCB
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Medium ASHP (8-12kW thermal, up to 17A):</strong> 6mm2 T&E internal + 6mm2
                SWA external, 20A or 32A Type C MCB
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large ASHP/GSHP (12-16kW thermal, up to 25A):</strong> 10mm2 T&E internal +
                10mm2 SWA external, 32A Type C MCB
              </span>
            </li>
          </ul>
        </div>
        <p>
          These are typical sizes — always calculate for your specific installation using the actual
          design current, cable route length, and applicable correction factors.
        </p>
        <SEOAppBridge
          title="Size the heat pump circuit in seconds"
          description="Enter the design current, cable length, installation method, and correction factors into Elec-Mate's cable sizing calculator. It confirms the cable size, MCB rating, and voltage drop — and flags any issues before you install."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'mcb-rating',
    heading: 'MCB Rating and Circuit Protection',
    content: (
      <>
        <p>
          Selecting the correct MCB (or RCBO) for a heat pump circuit requires consideration of both
          the running current and the starting current of the compressor.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type C MCB:</strong> Most heat pump manufacturers specify a Type C MCB
                because the compressor starting current (typically 3-5 times running current) would
                nuisance-trip a Type B MCB. Type C MCBs trip at 5-10 times their rated current for
                instantaneous operation, accommodating the inrush without false tripping.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCB rating:</strong> The MCB rating (In) must be equal to or greater than
                the design current (Ib). Common ratings for domestic heat pumps are 20A (for units
                drawing up to 20A) or 32A (for larger units or where a margin is needed for starting
                currents). Check the manufacturer installation manual for the recommended rating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection:</strong> A 30mA RCD is required under BS 7671 Regulation
                411.3.3. An RCBO (combined MCB and RCD) is the preferred device. Some manufacturers
                require a Type A or Type B RCD due to the DC components in the inverter output.
                Check the data sheet.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SPD protection:</strong> Surge protection is recommended for heat pump
                circuits, as the electronic control boards are sensitive to voltage spikes. BS 7671
                now requires{' '}
                <SEOInternalLink href="/guides/spd-surge-protection">
                  SPD protection
                </SEOInternalLink>{' '}
                at the origin of most new installations and alterations.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dedicated-circuit',
    heading: 'Dedicated Circuit Design',
    content: (
      <>
        <p>
          The heat pump requires a dedicated radial circuit from the consumer unit to the outdoor
          unit. The circuit design must include a local isolator switch and proper cable management
          for both the internal and external sections.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local isolator:</strong> A lockable isolator switch must be installed within
                arm's reach of the outdoor unit. This allows safe isolation for maintenance and
                servicing. A double-pole isolator rated for the circuit current is standard. The
                isolator should be IP65 rated for outdoor installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable route:</strong> The cable typically runs from the consumer unit
                through the building (T&E in walls/ceiling voids), exits the building through a wall
                sleeve, and continues externally to the heat pump (SWA cable, clipped to the wall or
                buried). Where the cable changes type (T&E to SWA), a junction box or isolator
                switch provides the transition point.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth electrode:</strong> If the SWA armour is used as the circuit
                protective conductor for the external section, it must be terminated correctly at
                both ends. Some installations use a separate earth electrode at the outdoor unit for
                additional protection — check the manufacturer requirements and the{' '}
                <SEOInternalLink href="/guides/earthing-arrangements">
                  earthing arrangement
                </SEOInternalLink>{' '}
                of the supply.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Controls wiring:</strong> In addition to the power supply, the heat pump
                typically needs a low-voltage controls connection to the indoor controller, room
                thermostat, or cylinder. This is usually a separate low-voltage cable (not mains)
                and is specified by the MCS installer or heating engineer.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'bus-grant',
    heading: 'BUS Grant and MCS Certification Requirements',
    content: (
      <>
        <p>
          The Boiler Upgrade Scheme (BUS) grant provides up to £7,500 towards heat pump installation
          costs. For the grant to be valid, the installation must meet specific quality and
          certification requirements.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCS-certified installer:</strong> The heat pump must be installed by an MCS
                (Microgeneration Certification Scheme) certified installer. The MCS installer is
                responsible for the system design, heat loss calculation, and overall installation.
                The electrical work can be subcontracted to a qualified electrician, but the MCS
                installer is responsible for the overall project.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>EIC required:</strong> An Electrical Installation Certificate (EIC) must be
                issued for the new dedicated circuit. This is a BS 7671 requirement for any new
                circuit and is also a mandatory document for MCS compliance and BUS grant
                validation. The EIC must be completed by a qualified electrician (or the MCS
                installer if they are also electrically qualified).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part P notification:</strong> The new circuit is notifiable work under Part
                P of the Building Regulations. If the electrician is registered with a competent
                person scheme (NICEIC, NAPIT, ELECSA), they can self-certify. Otherwise, Building
                Control notification is required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>EPC requirement:</strong> The property must have a valid Energy Performance
                Certificate (EPC) with no outstanding recommendations for loft or cavity wall
                insulation. This is a pre-requisite for the BUS grant application.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For electricians, heat pump work is an excellent revenue stream. The electrical
          installation is typically subcontracted by the MCS installer, and the value of the
          electrical work (circuit design, cable installation, consumer unit work, testing, and
          certification) is significant — typically £800 to £2,000 depending on the complexity.
        </p>
      </>
    ),
  },
  {
    id: 'commissioning',
    heading: 'Commissioning and Certification',
    content: (
      <>
        <p>
          The electrical commissioning of a heat pump installation follows the standard BS 7671
          initial verification procedure. All tests must be completed and recorded on the Electrical
          Installation Certificate before the heat pump is energised.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Continuity:</strong> Test R1+R2 for the dedicated circuit, including both
                the internal T&E section and the external SWA section. If SWA armour is used as the
                CPC, confirm the resistance of the armour path.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulation resistance:</strong> Test at 500V DC between L-E, N-E, and L-N.
                Minimum 1M ohm. Disconnect the heat pump before testing to avoid damage to the
                electronic control board.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth fault loop impedance:</strong> Measure Zs at the heat pump isolator to
                confirm the circuit meets the maximum Zs value for the protective device. This is
                critical for confirming the disconnection time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD test:</strong> Test the RCBO at the consumer unit — confirm trip at
                rated current (30mA) and within the required time (300ms for general type, 40ms for
                the 5x rated current test).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Polarity:</strong> Confirm correct polarity at the heat pump isolator and
                connection point.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Complete the EIC with all test results and circuit details. Provide a copy to the MCS
          installer (for the MCS documentation pack), the homeowner, and Building Control (if the
          work is being notified through Building Control rather than a competent person scheme).
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Heat Pump Installations as a Growth Area',
    content: (
      <>
        <p>
          The UK Government's target is 600,000 heat pump installations per year by 2028. With the
          BUS grant extended and the planned phase-out of new gas boiler installations, heat pump
          electrical work is one of the fastest-growing areas for electricians. Building
          relationships with MCS installers and heating engineers is key to securing a steady
          pipeline of work.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Circuit Design Tools</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>{' '}
                  and{' '}
                  <SEOInternalLink href="/tools/max-demand-calculator">
                    max demand calculator
                  </SEOInternalLink>{' '}
                  to design the heat pump circuit. Check cable size, voltage drop, and supply
                  capacity — all on your phone during the survey visit.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete the Electrical Installation Certificate on your phone. Enter the test
                  results, circuit details, and designer/installer information. Export as a
                  professional PDF and send to the MCS installer, homeowner, and Building Control.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote and Invoice</h4>
                <p className="text-white text-sm leading-relaxed">
                  Price the electrical work for the heat pump installation using Elec-Mate's quoting
                  tool. Send a professional quote to the MCS installer, complete the work, and send
                  the invoice — all from your phone. No desk time.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Design, certify, and invoice heat pump electrical work"
          description="Cable sizing, max demand, EIC certificates, quoting, and invoicing — all on your phone. Join 430+ UK electricians using Elec-Mate. 7-day free trial."
          icon={Wind}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function HeatPumpElectricalPage() {
  return (
    <GuideTemplate
      title="Heat Pump Electrical Requirements | Supply & Circuit Guide"
      description="Complete guide to heat pump electrical requirements for UK electricians. Single phase vs three phase supply, cable sizing, MCB rating, dedicated circuit design, BUS grant requirements, MCS compliance, and EIC certification."
      datePublished="2025-08-10"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Wind}
      heroTitle={
        <>
          Heat Pump Electrical Requirements:{' '}
          <span className="text-yellow-400">Supply, Circuit, and Certification Guide</span>
        </>
      }
      heroSubtitle="Every heat pump installation needs a dedicated electrical circuit designed and certified to BS 7671. This guide covers single-phase vs three-phase supply, cable sizing, MCB selection, circuit protection, BUS grant requirements, and the EIC certification that MCS installers need from you."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Heat Pump Electrical Requirements"
      relatedPages={relatedPages}
      ctaHeading="Design and Certify Heat Pump Circuits on Your Phone"
      ctaSubheading="Cable sizing calculators, max demand tools, EIC certificates, and invoicing — all in one app. Join 430+ UK electricians using Elec-Mate. 7-day free trial, cancel anytime."
    />
  );
}
