import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Thermometer,
  AlertTriangle,
  ShieldCheck,
  FileCheck2,
  Zap,
  Settings,
  Search,
  Clock,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Fault Finding', href: '/guides/electrical-fault-finding-guide' },
  { label: 'Heat Pump Electrical Fault', href: '/heat-pump-electrical-fault' },
];

const tocItems = [
  { id: 'control-board', label: 'Control Board Issues' },
  { id: 'compressor-starting', label: 'Compressor Starting Problems' },
  { id: 'power-supply', label: 'Power Supply Problems' },
  { id: 'dedicated-circuit', label: 'Dedicated Circuit Requirements' },
  { id: 'wiring-issues', label: 'Common Wiring Problems' },
  { id: 'when-to-call', label: 'When to Call an Engineer' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Heat pumps draw significantly higher starting currents than their running currents — a 5 kW air source heat pump may have a compressor start current of 25 A or more. An undersized supply cable or MCB rated too close to the running current is a common cause of electrical faults.',
  'Heat pump control boards govern the entire system including compressor sequencing, defrost cycles, and communication with the domestic hot water cylinder. A failed control board typically causes the system to be completely inoperative or stuck in a fault or defrost loop.',
  'Dedicated circuit requirements under BS 7671:2018+A2:2022 apply to heat pumps as high-load fixed equipment. The circuit must be sized for the maximum continuous current of the unit and protected by an MCB of appropriate type and rating.',
  'Low or fluctuating supply voltage is a common cause of compressor starting failures. The compressor motor requires its full starting torque to overcome the refrigerant pressure difference — voltage below approximately 207 V can prevent reliable starting.',
  'Any electrical work on the heat pump supply circuit, including fault finding, cable replacement, or protective device changes, must be carried out by a qualified electrician registered with a competent person scheme. The work must be notified to Building Control unless carried out by a scheme member.',
];

const faqs = [
  {
    question: 'Why has my heat pump stopped working completely?',
    answer:
      "Complete failure of a heat pump is most commonly caused by a tripped MCB or RCD on the dedicated supply circuit, a lockout fault on the heat pump control board (often following a power outage or transient), a failed control board, or a refrigerant-side fault that has triggered an electrical safety interlock. Check the consumer unit for a tripped protective device first. If all protective devices are closed, check the heat pump's display or indicator lights for a fault code and consult the manufacturer's manual.",
  },
  {
    question: 'Why does my heat pump keep tripping the MCB?',
    answer:
      'Repeated MCB tripping on a heat pump circuit is most frequently caused by a compressor that is drawing excessive current during starting — either because the MCB is undersized relative to the compressor start current (requiring a Type C or Type D MCB for motor loads), or because the compressor windings have developed an insulation fault and are partially earthed. An electrician should carry out insulation resistance testing on the compressor supply before concluding the MCB is undersized.',
  },
  {
    question: 'My heat pump runs but produces very little heat — is this an electrical fault?',
    answer:
      'Reduced heat output from an otherwise-running heat pump is more commonly a refrigerant or controls issue than a primary electrical fault. However, low supply voltage causing the compressor to run below full speed, a defrost cycle that is running too frequently (often a defrost sensor or control board fault), or a heat pump modulating below optimum due to incorrect controller settings can all cause low output. If the unit is running but the flow temperature is consistently below setpoint, contact the installer.',
  },
  {
    question: 'What size MCB does a heat pump need?',
    answer:
      "MCB sizing for a heat pump depends on the unit's maximum continuous current and its starting current. For a typical 5 kW to 8 kW air source heat pump, a 16 A to 32 A MCB is common. Critically, motor loads require Type C MCBs (which tolerate a momentary inrush of 5 to 10 times rated current without tripping) rather than the Type B MCBs used for most domestic circuits. Refer to the heat pump manufacturer's installation manual for the specific MCB type and rating required.",
  },
  {
    question: 'Can the heat pump installation cause problems with my other circuits?',
    answer:
      'A heat pump on an inadequately sized supply can cause voltage depression affecting other circuits in the property — particularly during compressor starting. Heat pump inverter drives can also introduce harmonic currents that may cause nuisance tripping of electronic RCDs. Surge protection devices (SPDs) at the consumer unit are best practice for properties with heat pumps, under BS 7671:2018+A2:2022 Regulation 443.',
  },
  {
    question: 'Does a heat pump installation need to be notified to Building Control?',
    answer:
      'Yes. Heat pump installation is notifiable work under the Building Regulations in England and Wales. However, electricians registered with a competent person scheme (NICEIC, NAPIT, ELECSA) can self-certify the electrical work without separate Building Control notification, providing the necessary certificates to the building owner and local authority. The overall heat pump installation (including pipework) may require separate notification by the heat pump installer.',
  },
  {
    question: 'Why does my heat pump make a clicking noise when it tries to start?',
    answer:
      'A clicking or chattering noise during attempted start-up, with no sustained running, typically indicates that the compressor is failing to start. This can be caused by low supply voltage preventing the compressor from developing starting torque, a failed start capacitor (in single-phase units with capacitor-start compressors), high refrigerant pressure on the high side preventing rotation, or a seized compressor. An electrician can measure the supply voltage and check the starting circuit; a refrigerant engineer is needed if a refrigerant-side fault is suspected.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrical-fault-finding-guide',
    title: 'Electrical Fault Finding',
    description: 'Systematic fault finding for domestic and commercial electrical installations.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'Complete guide to BS 7671:2018+A3:2024 — the IET Wiring Regulations.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description: 'Guide to EV charger installation alongside other high-load equipment.',
    icon: Zap,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'control-board',
    heading: 'Heat Pump Control Board Issues',
    content: (
      <>
        <p>
          The control board is the brain of the heat pump system. It manages compressor sequencing,
          defrost cycles, heating and cooling mode switching, domestic hot water priority, and
          communication with the room thermostat and hot water cylinder sensor. A faulty control
          board can present in many ways — from complete system failure to subtle misbehaviour such
          as incorrect defrost cycle timing or inability to switch between heating and hot water
          modes.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fault codes and lockout</strong> — modern heat pump control boards log fault
                codes with timestamps. A heat pump that has locked out after a fault will not
                restart until the fault is acknowledged, either via the controller display or by a
                power cycle. Note the displayed fault code before resetting — it is the primary
                diagnostic information.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Stuck defrost loop</strong> — a heat pump that appears to be constantly
                defrosting, or that produces minimal heat output despite running, may have a faulty
                outdoor coil temperature sensor feeding incorrect data to the control board. The
                control board believes the coil is frosted when it is not, and runs the defrost
                cycle continuously. Replace the suspect sensor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Communication faults</strong> — many heat pump systems use proprietary
                two-wire or CAN bus communication between the indoor controller, outdoor unit, and
                hot water cylinder. A break in this communication link, or a mismatch in firmware
                versions following a software update, can cause the control board to log a
                communication fault and disable outputs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Control board replacement</strong> — control board replacement is a
                manufacturer or specialist installer task. The replacement board must be the correct
                part number for the unit and may require configuration via the service menu.
                Incorrect board installation or configuration can damage the compressor inverter
                drive.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'compressor-starting',
    heading: 'Compressor Starting Problems',
    content: (
      <>
        <p>
          The compressor is the highest-power component in a heat pump and the most demanding load
          on the electrical supply. Starting problems — where the compressor fails to reach running
          speed — are among the most stressful events for the electrical installation and can damage
          both the compressor and the supply circuit if the fault is not diagnosed and corrected.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inverter-driven vs. fixed-speed compressors</strong> — most modern heat
                pumps use variable-speed (inverter-driven) compressors that have a soft-start
                characteristic and lower starting currents. Fixed-speed compressors have a hard
                start with inrush currents of five to eight times the running current. If the supply
                impedance is high, a hard-start compressor will cause a voltage dip that can exceed
                the motor's operating tolerance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Equalisation period</strong> — after shutdown, the refrigerant pressure
                difference across the compressor needs time to equalise before a restart is
                possible. Starting against a pressure difference causes very high starting current
                and torque. Heat pump control boards enforce a minimum off-time (typically 3 to 5
                minutes) for this reason. A power cycle that bypasses this delay can cause repeated
                starting failures and compressor damage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Failed inverter drive</strong> — in inverter-driven heat pumps, the inverter
                PCB converts the AC supply to DC and then synthesises variable-frequency AC for the
                compressor motor. A failed inverter drive causes a fault code and complete
                compressor failure. Inverter drive failure is often caused by voltage transients on
                the supply — SPD protection is recommended.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'power-supply',
    heading: 'Power Supply Problems',
    content: (
      <>
        <p>
          Heat pumps place a continuous, high-current demand on the property's electrical
          installation. Supply-side problems that are invisible to other loads can manifest
          dramatically when a heat pump is running, particularly during cold weather when the heat
          pump operates at maximum capacity for extended periods.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>High supply impedance</strong> — older rural properties with long service
                cable runs from the DNO transformer can have high supply impedance. Under the heat
                pump's running current, the voltage drop across the supply impedance may reduce the
                terminal voltage at the consumer unit below 207 V. Measure voltage at the consumer
                unit under maximum heat pump load. If below 207 V, report to the DNO.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Corroded or undersized consumer unit connections</strong> — the meter tail
                connections, main switch, and circuit breakers in an older consumer unit may have
                higher resistance than specified due to age, corrosion, or insufficient tightening
                torque at installation. Under heat pump load, this resistance causes localised
                heating. Thermal imaging of the consumer unit under heat pump load can identify
                high-resistance connections before they fail.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Neutral fault</strong> — a high-resistance or broken neutral connection
                anywhere in the supply chain causes voltage asymmetry across the installation and
                can result in voltages outside equipment operating limits. Heat pump control boards
                are sensitive to supply quality and will fault on abnormal voltages.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dedicated-circuit',
    heading: 'Dedicated Circuit Requirements',
    content: (
      <>
        <p>
          Heat pump manufacturers and BS 7671:2018+A2:2022 both require a dedicated final circuit
          for the heat pump supply. This is not merely good practice — it is a mandatory requirement
          of most manufacturer warranties and the Building Regulations compliance package.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable sizing</strong> — the supply cable must be sized to carry the heat
                pump's maximum continuous current with the voltage drop within BS 7671 limits
                (typically 3% on a final circuit, under Appendix 4). For a 5 kW to 8 kW heat pump
                running at 32 A, 6 mm² or 10 mm² twin and earth is typically required depending on
                the route length and installation method.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCB type and rating</strong> — heat pump compressors require Type C MCBs to
                tolerate the starting inrush current without nuisance tripping. Use the
                manufacturer's specified MCB rating — do not uprate the MCB beyond the specified
                value as this removes the short-circuit protection for the supply cable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection</strong> — a 30 mA RCD is required on the heat pump circuit
                for additional protection. Type A is generally sufficient for inverter-driven heat
                pumps but confirm with the manufacturer. Some heat pump manufacturers specify Type B
                RCDs for specific models.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Isolation and switching</strong> — a means of isolation must be provided
                adjacent to the heat pump (accessible for maintenance) in addition to the MCB at the
                consumer unit. This is typically a 45 A double-pole isolator or a suitably rated
                rotary isolator.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'wiring-issues',
    heading: 'Common Wiring Problems on Heat Pump Installations',
    content: (
      <>
        <p>
          Wiring errors on heat pump installations can cause intermittent faults that are difficult
          to diagnose without systematic testing. Many heat pump installations are carried out by
          plumbing contractors who may subcontract the electrical work to electricians who are
          unfamiliar with heat pump-specific requirements.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reversed live and neutral</strong> — reversing L and N at the heat pump
                connection terminals can damage the control electronics and inverter drive. Some
                units will appear to function but will have reduced protection and may fail
                prematurely. Verify polarity with a voltage tester before energising.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Undersized cable for the route length</strong> — cable routes that pass
                through insulation or are buried in thermal insulation dramatically reduce the
                cable's current-carrying capacity. A 6 mm² cable installed in thermal insulation may
                be derated to less than 20 A continuous capacity, insufficient for a heat pump
                running at 25 A.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Poor earth connection</strong> — the heat pump enclosure must be connected
                to the protective earthing conductor. A missing or high-resistance earth connection
                will cause the heat pump's internal earth fault monitoring to operate and will
                prevent the unit from starting.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'when-to-call',
    heading: 'When to Call an Engineer',
    content: (
      <>
        <p>
          Some heat pump issues can be resolved by the owner — checking for a tripped MCB,
          acknowledging a lockout fault on the controller, or waiting for the pressure equalisation
          delay. However, any fault that persists after basic checks requires a qualified engineer.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Call immediately</strong> — burning smell or visible scorching on the heat
                pump supply cable or connections, MCB that trips immediately on reset, or supply
                voltage significantly outside BS EN 50160 limits. Switch off the dedicated circuit
                at the consumer unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Call promptly (within 24 to 48 hours)</strong> — in cold weather, a heat
                pump that is not working is a risk to vulnerable occupants. Most heat pump
                manufacturers and installers offer emergency call-out services. Contact the original
                installer first as they will have system documentation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical vs. refrigerant engineer</strong> — an electrician can diagnose
                and repair supply circuit faults, control board wiring faults, and sensor faults. A
                refrigerant engineer (F-Gas registered) is required for any fault involving the
                refrigerant circuit, compressor, or heat exchanger. Many heat pump specialists hold
                both qualifications.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Heat Pump Electrical Work and Certification',
    content: (
      <>
        <p>
          Heat pump electrical installation and fault finding is a growing specialist area. As the
          UK government targets 600,000 heat pump installations per year by 2028, the demand for
          electricians competent in heat pump supply circuits, controls wiring, and certification is
          expanding rapidly.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Thermometer className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Minor Works and Installation Certificates
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Heat pump supply circuit work requires an Electrical Installation Certificate
                  (EIC) or Minor Works Certificate depending on scope. Use the{' '}
                  <SEOInternalLink href="/eic-certificate">Elec-Mate EIC app</SEOInternalLink>{' '}
                  to complete certificates on site with test results, circuit details, and instant
                  PDF export.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EICR and Heat Pump Circuits</h4>
                <p className="text-white text-sm leading-relaxed">
                  When carrying out an EICR on a property with a heat pump, verify the dedicated
                  circuit MCB type, cable sizing, RCD provision, and isolator arrangement. Record
                  the heat pump circuit in the schedule of inspections. Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to generate compliant reports on site.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Certificate heat pump installations with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate to certificate heat pump supply circuits, complete EICRs, and generate BS 7671-compliant documentation on site. 7-day free trial."
          icon={Thermometer}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function HeatPumpElectricalFaultPage() {
  return (
    <GuideTemplate
      title="Heat Pump Electrical Fault | Heat Pump Wiring Problems UK"
      description="Heat pump electrical fault? This guide covers control board issues, compressor starting problems, power supply faults, dedicated circuit requirements, and when to call a qualified engineer."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Fault Finding Guide"
      badgeIcon={Thermometer}
      heroTitle={
        <>
          Heat Pump Electrical Fault:{' '}
          <span className="text-yellow-400">Wiring Problems and Fault Finding</span>
        </>
      }
      heroSubtitle="Your heat pump has stopped working or is showing an electrical fault. This guide covers control board issues, compressor starting problems, power supply faults, dedicated circuit requirements, and when you need a qualified engineer."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Heat Pump Electrical Faults"
      relatedPages={relatedPages}
      ctaHeading="Certificate Heat Pump Installations on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for heat pump installation certificates, EICRs, and BS 7671-compliant documentation. 7-day free trial, cancel anytime."
    />
  );
}
