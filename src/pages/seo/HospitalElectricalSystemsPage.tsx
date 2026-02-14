import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Hospital,
  ShieldCheck,
  AlertTriangle,
  Zap,
  FileCheck2,
  Calculator,
  GraduationCap,
  ClipboardCheck,
  Brain,
  Search,
  HeartPulse,
  Activity,
  Clock,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Hospital Electrical', href: '/guides/hospital-electrical-systems' },
];

const tocItems = [
  { id: 'htm-06-01-overview', label: 'HTM 06-01 Overview' },
  { id: 'essential-supplies', label: 'Essential Supply Systems' },
  { id: 'medical-it-systems', label: 'Medical IT (IPS) Systems' },
  { id: 'rcm-monitoring', label: 'Residual Current Monitoring (RCM)' },
  { id: 'medical-location-groups', label: 'Medical Location Groups (0, 1, 2)' },
  { id: 'testing-intervals', label: 'Testing and Inspection Intervals' },
  { id: 'common-compliance-issues', label: 'Common Compliance Issues' },
  { id: 'for-electricians', label: 'For Electricians in Healthcare' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'HTM 06-01 (Electrical Services Supply and Distribution) is the Health Technical Memorandum governing electrical installations in NHS and healthcare facilities in England.',
  'Essential supply systems ensure that life-critical equipment (operating theatres, ICU, renal dialysis, NICU) remains powered during a mains failure — with automatic changeover within 0.5 seconds for Category 1 supplies.',
  'Medical IT systems (IPS — Isolated Power Supply) use an isolation transformer to create an unearthed system in Group 2 medical locations, preventing a first fault from disconnecting the supply to life-support equipment.',
  'Residual Current Monitoring (RCM) devices are used instead of RCDs in medical IT systems because an RCD would disconnect the supply on the first earth fault — exactly the behaviour that must be avoided in a Group 2 location.',
  'Elec-Mate allows electricians to complete EICR and EIC certificates for healthcare installations on site, with specialist observation coding for HTM 06-01 and BS 7671 Section 710 requirements.',
];

const faqs = [
  {
    question: 'What is HTM 06-01 and who does it apply to?',
    answer:
      'HTM 06-01 (Electrical Services Supply and Distribution) is a Health Technical Memorandum published by NHS England (formerly the Department of Health). It provides guidance on the design, installation, commissioning, operation, and maintenance of electrical services in healthcare premises. While it is specifically applicable to NHS facilities in England, it is widely adopted as the standard for private hospitals, healthcare centres, dental practices, and other healthcare settings across the UK. HTM 06-01 does not replace BS 7671 — it supplements it with healthcare-specific requirements. The document covers essential supply systems (generators, UPS, battery systems), distribution network design, medical IT systems (IPS), medical location classifications (Group 0, 1, and 2), testing and maintenance intervals, and resilience requirements for critical care areas. Compliance with HTM 06-01 is typically a condition of NHS ERIC (Estates Return Information Collection) reporting, CQC (Care Quality Commission) registration, and NHS trust governance frameworks. Electricians working in healthcare must understand both BS 7671 Section 710 (Medical Locations) and HTM 06-01.',
  },
  {
    question: 'What are the categories of essential supply?',
    answer:
      'HTM 06-01 defines several categories of essential supply, each with different requirements for changeover time and duration. Category 1 (No-Break) requires an uninterruptible power supply with zero changeover time — typically provided by a UPS (Uninterruptible Power Supply) with battery backup. This category covers life-critical equipment such as operating theatre lighting, patient monitoring, and ventilators. Category 2 (Short-Break) requires automatic changeover to the standby generator within 0.5 seconds. This covers operating theatre power, ICU, NICU, renal dialysis, and other areas where a brief interruption is tolerable but extended loss of supply is not. Category 3 (Long-Break) allows automatic changeover within 15 seconds and covers general essential supplies such as emergency lighting, fire alarm systems, medical gas alarms, and communication systems. Category 4 is for loads that can tolerate an extended interruption and may be manually reconnected after the generator starts. The essential supply system must be tested monthly (generator start and run test) and annually (full load test with actual changeover simulation). Detailed records of all tests must be maintained.',
  },
  {
    question: 'What is a medical IT system and where is it required?',
    answer:
      'A medical IT system — also called an IPS (Isolated Power Supply) or IT system (in the IEC sense, not information technology) — is an electrical supply arrangement that uses an isolation transformer to create an unearthed (isolated from earth) power system. In a normal TN system, a fault between live and earth causes a large fault current that trips the protective device (MCB or RCD) and disconnects the supply. In a medical IT system, a first fault between live and earth does not cause a large fault current because there is no direct connection to earth — the fault current is limited to the leakage capacitance of the system. This means the supply continues to operate despite the first fault. This is critical in Group 2 medical locations (operating theatres, ICU, cardiac catheterisation labs) where disconnection of the supply during a surgical procedure could be life-threatening. The medical IT system is monitored by an Insulation Monitoring Device (IMD) that continuously measures the insulation resistance of the system. When a first fault occurs and the insulation resistance drops below a threshold (typically 50 kohms), the IMD activates a visual and audible alarm — but does not disconnect the supply. This alerts the staff that a fault exists and maintenance is needed, while the supply continues uninterrupted.',
  },
  {
    question: 'Why are RCDs not used in Group 2 medical locations?',
    answer:
      'RCDs (Residual Current Devices) are not used in Group 2 medical locations because their fundamental operating principle — disconnecting the supply when a residual current (earth fault) is detected — is exactly the behaviour that must be avoided in these critical areas. In an operating theatre, disconnection of the supply during a surgical procedure could be fatal for the patient. Instead, Group 2 medical locations use a combination of medical IT systems (which do not disconnect on the first fault) and Residual Current Monitoring (RCM) devices (which alarm on fault detection without disconnecting). The RCM device monitors the insulation resistance of the circuit and provides a visual and audible alarm when the residual current exceeds a set threshold. This alerts maintenance staff to investigate and rectify the fault — but the supply continues to operate. BS 7671 Regulation 710.411.6.3.1 specifies that for Group 2 medical locations supplied by a medical IT system, an insulation monitoring device (IMD) to BS EN 61557-8 shall be provided, and a locator system to BS EN 61557-9 should be provided to identify the faulty circuit without disconnecting the supply.',
  },
  {
    question: 'What are the testing intervals for hospital electrical installations?',
    answer:
      'Testing intervals for hospital electrical installations are specified in HTM 06-01 and are generally shorter than for domestic or commercial installations. The fixed electrical installation (distribution boards, sub-mains, final circuits) should be inspected and tested at intervals of no more than 5 years — the same as the general BS 7671 recommendation. However, HTM 06-01 recommends more frequent testing for specific areas: essential supply systems (generators, UPS, ATS) require monthly functional tests, quarterly load tests, and annual full-load changeover tests. Medical IT systems (IPS) require continuous monitoring by the IMD, monthly functional testing of the alarm system, and annual insulation resistance testing of the isolation transformer. RCDs protecting non-IT circuits in Group 1 medical locations require 6-monthly testing. Emergency lighting requires monthly functional tests and annual full-duration tests. Fire alarm systems require weekly testing and 6-monthly full inspection. These intervals are minimums — the Authorised Person (Electrical) at the healthcare facility may specify more frequent testing based on risk assessment, equipment age, or previous findings.',
  },
  {
    question: 'What qualifications are needed to work on hospital electrical installations?',
    answer:
      "Electricians working on hospital and healthcare electrical installations need, at a minimum, the standard qualifications required for any commercial electrical work: the 18th Edition qualification (C&G 2382 or equivalent), an inspection and testing qualification (C&G 2391 or equivalent), and registration with a competent person scheme. However, healthcare work requires additional competence that goes beyond standard qualifications. Electricians should have a working knowledge of BS 7671 Section 710 (Medical Locations), HTM 06-01 (Electrical Services Supply and Distribution), medical IT system operation and testing, essential supply systems (generators, UPS, ATS), and the specific safety protocols for working in clinical environments (permits to work, infection control, lone working). Many NHS trusts and private hospitals require electricians to complete site-specific induction training, hold a valid DBS check, and be approved by the Authorised Person (Electrical) before they can work on the electrical installation. Some specialist courses are available for healthcare electrical systems, and CPD in this area is essential for electricians who regularly work in hospital environments. Elec-Mate's training platform includes modules on medical locations and essential supply systems.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates on your phone. AI board scanner, voice test entry, and professional PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description:
      'Complete overview of BS 7671:2018+A2:2022 including Section 710 (Medical Locations).',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/emergency-lighting-certificate',
    title: 'Emergency Lighting Certificate',
    description:
      'Guide to emergency lighting testing, certification, and compliance for healthcare facilities.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/prospective-fault-current-calculator',
    title: 'Prospective Fault Current Calculator',
    description:
      'Calculate Ipf values for distribution systems and verify protective device coordination.',
    icon: Calculator,
    category: 'Calculator',
  },
  {
    href: '/guides/fire-alarm-certificate',
    title: 'Fire Alarm Certificate',
    description:
      'Guide to fire alarm system testing, commissioning certificates, and compliance documentation.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/training/18th-edition',
    title: '18th Edition Course',
    description:
      'Study for C&G 2382 with 50+ structured training modules including Section 710 (Medical Locations).',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'htm-06-01-overview',
    heading: 'HTM 06-01: The Standard for Healthcare Electrical Systems',
    content: (
      <>
        <p>
          Health Technical Memorandum 06-01 (Electrical Services Supply and Distribution) is the
          definitive guidance document for electrical installations in healthcare facilities in
          England. Published by NHS England, it provides comprehensive requirements for the design,
          installation, commissioning, operation, and maintenance of all electrical services within
          hospitals, clinics, and healthcare centres.
        </p>
        <p>
          HTM 06-01 works alongside{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A2:2022
          </SEOInternalLink>{' '}
          Section 710 (Medical Locations) but goes further in several areas. While BS 7671 Section
          710 sets out the general wiring regulations for medical locations, HTM 06-01 provides
          healthcare-specific guidance on essential supply systems, resilience planning, generator
          and UPS requirements, medical gas pipeline system interaction, and maintenance regimes.
        </p>
        <p>
          The consequences of electrical failure in a healthcare setting are fundamentally different
          from any other type of building. A power failure in an operating theatre during surgery,
          the loss of ventilator power in an ICU, or a failure of medical gas alarm systems can
          directly cause patient death. The entire electrical design philosophy for healthcare
          buildings is built around one principle: the supply must never fail to the most critical
          areas.
        </p>
        <p>
          For electricians, healthcare electrical work is the most demanding and technically
          challenging sector of the industry. The regulations are complex, the standards are
          exacting, and the consequences of error are severe. It is also some of the most rewarding
          and well-compensated work available.
        </p>
      </>
    ),
  },
  {
    id: 'essential-supplies',
    heading: 'Essential Supply Systems: Keeping Critical Areas Powered',
    content: (
      <>
        <p>
          The essential supply system is the backbone of hospital electrical resilience. It ensures
          that critical areas remain powered during a mains supply failure. HTM 06-01 defines four
          categories of essential supply:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <HeartPulse className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Category 1 — No-Break Supply.</strong> Zero changeover time. Provided by UPS
                (Uninterruptible Power Supply) with battery backup. Covers life-critical equipment:
                operating theatre lighting, patient monitoring systems, ventilators, anaesthetic
                machines, and surgical equipment. The UPS must provide power for a minimum of 3
                hours (or until the generator starts and reaches stable output).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HeartPulse className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Category 2 — Short-Break Supply (less than 0.5 seconds).</strong> Automatic
                changeover to standby generator within 0.5 seconds. Covers operating theatre power
                (other than lighting), ICU, NICU, high dependency units, renal dialysis, cardiac
                catheterisation labs, and other areas where brief interruption is tolerable but not
                extended loss.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HeartPulse className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Category 3 — Long-Break Supply (less than 15 seconds).</strong> Automatic
                changeover within 15 seconds. Covers emergency lighting, fire alarm systems, medical
                gas alarms, nurse call systems, communication systems, lifts, and general essential
                lighting in corridors and stairwells.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HeartPulse className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Category 4 — Extended-Break Supply.</strong> Manual reconnection after
                generator has started. Covers non-critical loads that can tolerate an extended
                interruption: heating, catering, laundry, and general-purpose power.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The automatic transfer switch (ATS) is the device that detects mains failure and switches
          the essential circuits to the generator supply. Modern ATS equipment can achieve
          changeover times well under 0.5 seconds. The ATS must be tested monthly to verify correct
          operation, and the generator must be load-tested quarterly and annually to confirm it can
          sustain the required load for the required duration.
        </p>
      </>
    ),
  },
  {
    id: 'medical-it-systems',
    heading: 'Medical IT Systems (IPS): Isolated Power for Group 2 Locations',
    content: (
      <>
        <p>
          A medical IT system — often called an IPS (Isolated Power Supply) — is one of the most
          important and least understood concepts in healthcare electrical design. It uses an
          isolation transformer to create an electrically isolated (unearthed) supply within Group 2
          medical locations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>How it works.</strong> An isolation transformer is installed between the
                normal TN supply and the medical IT system. The secondary winding of the transformer
                is not connected to earth — creating an "IT" system (Isolated Terra). In this
                arrangement, a single fault between a live conductor and earth does not create a
                large fault current because there is no return path through earth. The circuit
                continues to operate normally despite the first fault.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulation Monitoring Device (IMD).</strong> The medical IT system is
                continuously monitored by an IMD conforming to BS EN 61557-8. The IMD measures the
                insulation resistance between the live conductors and earth. When a first fault
                reduces the insulation resistance below a set threshold (typically 50 kohms), the
                IMD triggers a visual and audible alarm — but does not disconnect the supply.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fault locator system.</strong> A fault locator system conforming to BS EN
                61557-9 should be provided to identify which circuit has the fault, allowing
                maintenance staff to isolate and repair the faulty circuit without disconnecting the
                entire medical IT system.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Where required.</strong> Medical IT systems are required in Group 2 medical
                locations where life-support equipment is in use, interruption of the supply could
                endanger the patient, or the medical procedure involves direct contact with the
                patient's heart (intracardiac procedures). This includes operating theatres, ICU,
                cardiac catheterisation labs, and endoscopy suites.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The medical IT system is not a standalone installation — it is integrated with the
          essential supply system. The isolation transformer is typically supplied from the Category
          1 (UPS-backed) essential supply, ensuring that the medical IT system continues to operate
          during a mains failure with no interruption.
        </p>
        <SEOAppBridge
          title="Document complex healthcare installations"
          description="Elec-Mate's certificate templates support multi-board installations, medical IT system documentation, and essential supply categorisation. Complete the paperwork on site, not at a desk three days later."
          icon={Activity}
        />
      </>
    ),
  },
  {
    id: 'rcm-monitoring',
    heading: 'Residual Current Monitoring: Alarm Without Disconnection',
    content: (
      <>
        <p>
          In standard electrical installations, RCDs (Residual Current Devices) provide protection
          against electric shock and fire by disconnecting the supply when a residual current is
          detected. In Group 2 medical locations, this disconnection behaviour is unacceptable
          because it could endanger patients by removing power from life-support equipment.
        </p>
        <p>
          Instead, Residual Current Monitoring (RCM) devices are used. An RCM device measures the
          residual current in a circuit and activates an alarm when the current exceeds a set
          threshold — but crucially, it does not disconnect the supply. This provides the safety
          benefit of fault detection without the risk of supply interruption.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">RCD (Standard Installation)</h3>
            <p className="text-white text-sm leading-relaxed">
              Detects residual current (earth fault) and immediately disconnects the supply.
              Protects against electric shock and fire. Used in domestic, commercial, and Group 1
              medical locations. Disconnection is the protection — it removes the hazard by cutting
              the power.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">RCM (Medical IT System)</h3>
            <p className="text-white text-sm leading-relaxed">
              Detects residual current (insulation degradation) and activates an alarm — visual
              indicator and audible sounder. Does not disconnect the supply. Staff are alerted to
              investigate and rectify the fault while the supply continues to operate. Used in Group
              2 medical locations where supply continuity is critical to patient safety.
            </p>
          </div>
        </div>
        <p>
          The RCM alarm panel is typically located at the nurse station or in a location visible to
          the staff responsible for the area. The alarm indicates which circuit has the fault, and
          the maintenance team can investigate and repair the fault at the earliest safe opportunity
          — which may be between surgical procedures or during a planned maintenance window.
        </p>
        <p>
          A second fault on the same medical IT system — before the first fault has been repaired —
          could create a fault current large enough to be dangerous. This is why the first fault
          must be investigated and repaired promptly after the RCM alarm activates. The medical IT
          system provides tolerance of one fault, not indefinite faults.
        </p>
      </>
    ),
  },
  {
    id: 'medical-location-groups',
    heading: 'Medical Location Groups: 0, 1, and 2',
    content: (
      <>
        <p>
          BS 7671 Section 710 classifies medical locations into three groups based on the type of
          medical procedures performed and the risk to patients from electrical failure:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Group 0.</strong> Medical locations where no applied parts are used (medical
                equipment in direct contact with the patient). Examples: consulting rooms, offices,
                general waiting areas, and corridors in healthcare facilities. The electrical
                installation in Group 0 locations follows the general rules of BS 7671 with no
                additional requirements beyond those for standard commercial installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Group 1.</strong> Medical locations where applied parts are used but not for
                intracardiac procedures, and where loss of supply is not immediately life-
                threatening. Examples: hospital wards, outpatient treatment rooms, dental surgeries,
                physiotherapy rooms, and minor procedure rooms. Group 1 locations require 30 mA RCD
                protection on all circuits supplying medical equipment and supplementary
                equipotential bonding of all extraneous-conductive-parts within the patient
                environment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Group 2.</strong> Medical locations where applied parts are used for
                intracardiac procedures, life-support equipment is in use, or loss of supply could
                be immediately life-threatening. Examples: operating theatres, intensive care units
                (ICU), neonatal intensive care (NICU), cardiac catheterisation labs, endoscopy
                suites, and recovery rooms with ventilated patients. Group 2 locations require
                medical IT systems (IPS) for circuits supplying life-support and surgical equipment,
                RCM monitoring instead of RCDs, supplementary equipotential bonding, and essential
                supply systems (Category 1 and 2).
              </span>
            </li>
          </ul>
        </div>
        <p>
          The classification of each room or area within a healthcare facility is determined by the
          clinical function and the types of medical procedures performed there. The classification
          must be documented and reviewed whenever the clinical use of a space changes — for
          example, if a standard ward bay is converted to a high-dependency area, the electrical
          installation may need to be upgraded from Group 1 to Group 2 requirements.
        </p>
      </>
    ),
  },
  {
    id: 'testing-intervals',
    heading: 'Testing and Inspection Intervals for Healthcare',
    content: (
      <>
        <p>
          Testing intervals for healthcare electrical installations are defined by both HTM 06-01
          and the general requirements of BS 7671. The healthcare-specific intervals are generally
          more frequent than those for standard commercial installations:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fixed installation (EICR):</strong> Maximum 5-year interval for the general
                fixed wiring. Some NHS trusts specify 3-year intervals for high-risk areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Generator — start test:</strong> Monthly. The generator should be started
                and run under no-load conditions to verify it starts correctly and reaches stable
                speed and voltage within the required time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Generator — load test:</strong> Quarterly. The generator should be run under
                load (using a load bank or actual load transfer) to verify it can sustain the
                required output for the required duration.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ATS changeover test:</strong> Annually. A full simulation of mains failure
                with automatic changeover to the generator and return to mains when restored.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Medical IT system (IPS):</strong> Continuous monitoring by IMD. Monthly
                functional test of the alarm system. Annual insulation resistance testing of the
                isolation transformer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCDs (Group 1 locations):</strong> 6-monthly testing at the rated residual
                operating current with trip time recorded.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting:</strong> Monthly functional test, annual full-duration
                test (3 hours for escape routes, 1 hour for open areas).
              </span>
            </li>
          </ul>
        </div>
        <p>
          All test results must be recorded, retained, and available for inspection by the CQC, NHS
          trust governance, and external auditors. A comprehensive testing and maintenance programme
          is typically managed by the Authorised Person (Electrical) within the healthcare
          facility's estates department.
        </p>
      </>
    ),
  },
  {
    id: 'common-compliance-issues',
    heading: 'Common Compliance Issues in Healthcare Electrical Installations',
    content: (
      <>
        <p>
          Despite the rigorous standards, compliance issues are regularly identified during EICR
          inspections and audits of healthcare electrical installations. The most common issues
          include:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Missing or incomplete supplementary bonding.</strong> The patient
                environment in Group 1 and Group 2 locations requires supplementary equipotential
                bonding of all extraneous-conductive-parts — including bed frames, gas outlets, wash
                basin pipes, and radiators. Missing bonds are a C2 defect.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Medical IT system alarms not functional.</strong> IMD alarm panels that are
                disconnected, silenced permanently, or not visible to staff. A non-functional RCM
                alarm undermines the entire safety strategy of the medical IT system.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Generator testing overdue.</strong> Monthly start tests and quarterly load
                tests not carried out or not documented. Generator maintenance records incomplete or
                missing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Room classification not reviewed.</strong> Clinical rooms repurposed (for
                example, a standard ward converted to a high-dependency bay) without reviewing the
                medical location group classification and upgrading the electrical installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overloaded distribution boards.</strong> Additional circuits added over time
                without upgrading the distribution board or verifying that the prospective fault
                current and maximum demand are still within limits.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Accurate documentation of these issues — with correct{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            observation codes
          </SEOInternalLink>{' '}
          and specific BS 7671/HTM 06-01 regulation references — is essential. Healthcare facility
          managers rely on the EICR to prioritise remedial work and allocate budgets.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Healthcare Electrical Work with Elec-Mate',
    content: (
      <>
        <p>
          Healthcare electrical work is the pinnacle of the profession. It demands deep technical
          knowledge, meticulous attention to detail, and the ability to work within a complex
          clinical environment. The paperwork requirements are proportionally demanding — EICRs for
          healthcare facilities can run to dozens of pages with multiple distribution boards,
          essential supply systems, and medical IT circuits.
        </p>
        <p>Elec-Mate supports the full healthcare certification workflow:</p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Observation Code Assistant</h4>
                <p className="text-white text-sm leading-relaxed">
                  Describe the defect — "supplementary bonding missing from gas outlet in Group 2
                  operating theatre" — and the AI returns the correct observation code with the
                  matching BS 7671 Section 710 regulation reference. Healthcare-specific regulation
                  numbers at your fingertips.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Search className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Multi-Board EICR Support</h4>
                <p className="text-white text-sm leading-relaxed">
                  Healthcare facilities have complex distribution systems with multiple sub-mains,
                  essential supply panels, and medical IT distribution boards. Elec-Mate supports
                  multi-board certificates with separate schedules for each distribution point.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Professional PDF Reports</h4>
                <p className="text-white text-sm leading-relaxed">
                  Generate comprehensive PDF EICR reports that meet the documentation standards
                  expected by NHS estates departments, CQC auditors, and healthcare governance
                  teams. Include photographs, regulation references, and detailed observations.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          Healthcare work pays well, provides long-term contracts, and builds a reputation that
          opens doors to other high-value sectors. The electrician who delivers professional,
          thorough, and well-documented work in the healthcare sector is recognised as a specialist
          — and charged accordingly.
        </p>
        <SEOAppBridge
          title="Professional healthcare EICRs on your phone"
          description="Join 430+ UK electricians creating professional certificates with AI observation coding, multi-board support, and instant PDF delivery. Built for complex installations. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function HospitalElectricalSystemsPage() {
  return (
    <GuideTemplate
      title="Hospital Electrical Systems | HTM 06-01 Guide"
      description="Complete guide to hospital electrical systems under HTM 06-01 and BS 7671 Section 710. Essential supply categories, medical IT systems (IPS), residual current monitoring (RCM), medical location groups, and testing intervals for healthcare facilities."
      datePublished="2025-09-05"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Healthcare Guide"
      badgeIcon={Hospital}
      heroTitle={
        <>
          Hospital Electrical Systems:{' '}
          <span className="text-yellow-400">HTM 06-01 and Section 710 Explained</span>
        </>
      }
      heroSubtitle="Healthcare electrical installations operate to the highest standards in the industry. Essential supply systems, medical IT systems, residual current monitoring, and Group 2 medical locations require specialist knowledge that goes beyond standard BS 7671. This guide covers everything electricians need to know."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Hospital Electrical Systems"
      relatedPages={relatedPages}
      ctaHeading="Complete Healthcare EICRs on Your Phone"
      ctaSubheading="Join 430+ UK electricians creating professional certificates with AI observation coding, multi-board support, and instant PDF delivery. Built for the most demanding installations. 7-day free trial, cancel anytime."
    />
  );
}
