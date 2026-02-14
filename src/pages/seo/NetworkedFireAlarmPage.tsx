import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Flame,
  Zap,
  ShieldCheck,
  CheckCircle2,
  FileText,
  ClipboardCheck,
  Cable,
  Radio,
  AlertTriangle,
  Building,
  Cpu,
  Wrench,
} from 'lucide-react';

export default function NetworkedFireAlarmPage() {
  return (
    <GuideTemplate
      title="Networked Fire Alarm System | Addressable vs Conventional"
      description="Complete guide to networked fire alarm systems for electricians. Covers conventional zones, addressable loop wiring, analogue addressable panels, hybrid systems, BS 5839 categories, and when to specify each type for commercial and residential installations."
      datePublished="2026-01-20"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Guides', href: '/guides' },
        { label: 'Networked Fire Alarm', href: '/guides/networked-fire-alarm-system' },
      ]}
      tocItems={[
        { id: 'fire-alarm-categories', label: 'BS 5839 Categories' },
        { id: 'conventional-systems', label: 'Conventional Systems' },
        { id: 'addressable-systems', label: 'Addressable Systems' },
        { id: 'analogue-addressable', label: 'Analogue Addressable' },
        { id: 'hybrid-systems', label: 'Hybrid Systems' },
        { id: 'which-system', label: 'Which System to Use' },
        { id: 'wiring-requirements', label: 'Wiring Requirements' },
        { id: 'how-to', label: 'Step-by-Step Installation' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Guides' },
      ]}
      badge="Guide"
      badgeIcon={Flame}
      heroTitle={
        <>
          Networked Fire Alarm Systems
          <br />
          <span className="text-yellow-400">Addressable vs Conventional Explained</span>
        </>
      }
      heroSubtitle="Fire alarm systems range from simple conventional zone panels to sophisticated analogue addressable networks. Understanding the differences — and when to specify each type — is essential for electricians working on commercial installations, HMOs, and larger residential developments. This guide covers every system type, BS 5839 categories, and practical wiring requirements."
      readingTime={14}
      keyTakeaways={[
        'Conventional fire alarm systems divide the building into zones, each wired as a separate circuit. When a detector activates, the panel identifies the zone but not the individual device — suitable for smaller buildings with clearly defined zones.',
        'Addressable fire alarm systems wire all devices on a single loop circuit. Each device has a unique address, allowing the panel to identify exactly which detector has activated — essential for larger buildings where rapid location of the fire is critical.',
        'Analogue addressable systems provide the highest level of intelligence — devices continuously report their environmental readings to the panel, enabling pre-alarm warnings, drift compensation, and predictive maintenance.',
        'BS 5839-1 defines fire alarm system categories from M (manual only) through L1 (full property protection) and P1 (full property protection for property), with each category specifying different levels of coverage and detection.',
        'Hybrid systems combine conventional zones and addressable loops on a single panel — useful for phased upgrades of existing conventional systems or buildings with mixed requirements.',
      ]}
      sections={[
        {
          id: 'fire-alarm-categories',
          heading: 'BS 5839 Fire Alarm System Categories',
          content: (
            <>
              <p>
                Before selecting the system type, the category of the fire alarm system must be
                determined. BS 5839-1 (for non-domestic premises) and BS 5839-6 (for domestic
                premises) define the categories that specify the purpose and extent of fire
                detection and alarm coverage.
              </p>
              <div className="space-y-4 mt-4">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Category M — Manual System</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Manual call points (break glass units) only — no automatic detection. Relies on
                    occupants discovering the fire and activating the nearest call point. Typically
                    specified for buildings where the fire risk assessment does not require
                    automatic detection, or as a minimum baseline for simple commercial premises.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Category L — Life Protection</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    <strong className="text-white">L1</strong> — Detection throughout all areas of
                    the building. <strong className="text-white">L2</strong> — Detection in escape
                    routes and rooms opening onto escape routes, plus high-risk areas.{' '}
                    <strong className="text-white">L3</strong> — Detection in escape routes only.{' '}
                    <strong className="text-white">L4</strong> — Detection within escape routes
                    forming part of the means of escape only.{' '}
                    <strong className="text-white">L5</strong> — Detection in specific areas as
                    determined by the fire risk assessment. L2 and L3 are the most commonly
                    specified categories for commercial premises and{' '}
                    <SEOInternalLink href="/guides/eicr-for-landlords">HMOs</SEOInternalLink>.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">
                      Category P — Property Protection
                    </h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    <strong className="text-white">P1</strong> — Detection throughout all areas to
                    provide the earliest possible warning for property protection purposes.{' '}
                    <strong className="text-white">P2</strong> — Detection only in specified areas
                    of high risk. P categories are typically specified by insurers or for unoccupied
                    premises where fire damage must be minimised.
                  </p>
                </div>
              </div>
              <p className="mt-4">
                The category determines how many detectors are needed and where they must be placed,
                but it does not dictate whether the system should be conventional, addressable, or
                analogue addressable. That decision depends on the building size, layout, and
                operational requirements.
              </p>
            </>
          ),
        },
        {
          id: 'conventional-systems',
          heading: 'Conventional Fire Alarm Systems',
          content: (
            <>
              <p>
                A conventional fire alarm system divides the building into zones, with each zone
                wired as a separate circuit back to the fire alarm panel. All detectors and call
                points within a zone are connected to the same pair of wires. When any device in the
                zone activates, the panel identifies which zone is in alarm but cannot identify the
                specific device.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">How Conventional Zones Work</h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Two-wire circuit per zone</strong> — Each
                      zone uses a pair of conductors running from the panel to the first device,
                      then device to device in a radial or T-spur arrangement. An end-of-line
                      resistor terminates the circuit.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Zone indicator on panel</strong> — The
                      panel has individual zone LEDs. When a detector operates, the corresponding
                      zone LED illuminates and the sounders activate. The panel cannot tell which
                      detector in the zone has operated.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Zone planning</strong> — BS 5839-1
                      requires each zone to cover no more than 2,000m² of floor area and be confined
                      to a single floor. Zones should be planned so that the location of a fire can
                      be quickly identified by the responding person.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Maximum devices per zone</strong> —
                      Typically 20 to 30 devices per zone, depending on the panel manufacturer. Each
                      device draws a small current from the zone circuit.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                Conventional systems are cost-effective for smaller buildings with clearly defined
                areas — a small office, a shop, a restaurant, or a domestic HMO. The panels are
                simpler, the devices are less expensive, and the wiring is straightforward. However,
                in larger buildings, the number of separate zone cables running back to the panel
                becomes impractical.
              </p>
            </>
          ),
        },
        {
          id: 'addressable-systems',
          heading: 'Addressable Fire Alarm Systems',
          content: (
            <>
              <p>
                An addressable fire alarm system connects all devices — detectors, call points,
                sounders, and modules — on a single loop circuit. Each device is programmed with a
                unique address (typically a number from 1 to 126 or 1 to 250, depending on the
                panel). When a device activates, the panel identifies the exact device by its
                address and displays a text description (e.g., "Smoke Detector — Room 204, Second
                Floor").
              </p>
              <div className="space-y-4 mt-4">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Radio className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Loop Wiring</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    The loop starts at the panel, runs through every device on the loop, and returns
                    to the panel — forming a complete circuit. This provides inherent resilience: if
                    the loop cable is broken at any point, the panel can still communicate with all
                    devices by addressing them from both ends of the broken loop. This is a
                    significant advantage over conventional radial circuits, which lose all devices
                    beyond the break point.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Device Identification</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    The panel continuously polls each device on the loop, checking its status and
                    confirming communication. When a detector activates, the panel immediately knows
                    which device has triggered and displays its programmed text label. This allows
                    the responding person to go directly to the device rather than searching an
                    entire zone. In a large building, this can save minutes — which is critical in a
                    fire.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Cable className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Reduced Cabling</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Because all devices share a single loop, the total cable requirement is
                    significantly less than a conventional system with separate zone circuits. A
                    building that might need 20 conventional zone circuits (20 separate cable runs
                    back to the panel) can be served by a single addressable loop. This reduces
                    installation cost and time, particularly in large or complex buildings.
                  </p>
                </div>
              </div>
              <SEOAppBridge
                title="Fire Alarm Certificate Digital Form"
                description="Elec-Mate's digital fire alarm certificate captures all system details, zone or loop information, device locations, and commissioning test results. Generate professional BS 5839-compliant documentation for any fire alarm installation — conventional, addressable, or hybrid."
                icon={FileText}
              />
            </>
          ),
        },
        {
          id: 'analogue-addressable',
          heading: 'Analogue Addressable Systems',
          content: (
            <>
              <p>
                Analogue addressable systems represent the most advanced level of fire detection
                technology commonly used in commercial buildings. Unlike standard addressable
                systems (which report a simple "alarm" or "normal" status), analogue addressable
                devices continuously report their environmental readings to the panel — the actual
                smoke density, temperature, or CO level at each device.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">
                  Advantages of Analogue Addressable
                </h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Pre-alarm warnings</strong> — The panel
                      can issue pre-alarm warnings when readings approach the alarm threshold,
                      giving staff time to investigate before a full alarm activates. This reduces
                      false alarms and unnecessary evacuations.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Drift compensation</strong> — As detectors
                      age or accumulate contamination, their baseline readings change. Analogue
                      addressable panels automatically adjust for this drift, maintaining consistent
                      sensitivity over the detector's life. This significantly reduces false alarms
                      from contaminated detectors.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Individual sensitivity settings</strong> —
                      Each detector can have its sensitivity adjusted independently. A detector near
                      a kitchen can be set to a higher alarm threshold to avoid cooking-related
                      false alarms, while one in a server room can be set to maximum sensitivity for
                      early warning.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Predictive maintenance</strong> — The
                      panel monitors each detector's readings over time and can flag devices that
                      need cleaning or replacement before they fail or cause false alarms. This
                      makes maintenance planning much more efficient.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                Analogue addressable systems are standard for hospitals, schools, universities,
                office buildings, hotels, and any building where false alarm reduction and rapid
                fire location are priorities. The initial cost is higher than standard addressable
                or conventional systems, but the reduced false alarm rate and lower ongoing
                maintenance costs typically justify the investment for larger installations.
              </p>
            </>
          ),
        },
        {
          id: 'hybrid-systems',
          heading: 'Hybrid Fire Alarm Systems',
          content: (
            <>
              <p>
                Hybrid fire alarm panels accept both conventional zone circuits and addressable loop
                circuits. This makes them valuable in several scenarios:
              </p>
              <div className="space-y-4 mt-4">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Wrench className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Phased Upgrades</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    When upgrading an existing conventional system, a hybrid panel allows the
                    existing conventional zone wiring to be retained while new areas are added on
                    addressable loops. This avoids the cost and disruption of rewiring the entire
                    building at once. Over time, conventional zones can be migrated to the
                    addressable loop as budgets allow or when the conventional wiring reaches
                    end-of-life.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Mixed-Use Buildings</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Buildings with both simple areas (corridors, stores) and complex areas (offices,
                    server rooms) may benefit from conventional coverage in the simple zones and
                    addressable coverage in the complex areas. This optimises cost without
                    compromising detection capability where it matters most.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Budget Constraints</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Where the budget does not stretch to a full addressable system, a hybrid
                    approach provides addressable identification in critical areas while using less
                    expensive conventional devices elsewhere. The total system cost falls between a
                    fully conventional and fully addressable installation.
                  </p>
                </div>
              </div>
            </>
          ),
        },
        {
          id: 'which-system',
          heading: 'Which System Type Should You Specify?',
          content: (
            <>
              <p>
                The choice between conventional, addressable, and analogue addressable depends on
                the building size, complexity, budget, and the requirements of the fire risk
                assessment.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div>
                      <h4 className="font-bold text-white">Small shop / office / HMO</h4>
                      <p className="text-white text-sm">
                        Up to 4-6 zones, single floor or small multi-storey
                      </p>
                    </div>
                    <span className="font-bold text-yellow-400 text-sm text-right">
                      Conventional
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div>
                      <h4 className="font-bold text-white">
                        Medium commercial / school / care home
                      </h4>
                      <p className="text-white text-sm">
                        10-50 devices, multi-storey, multiple occupancy
                      </p>
                    </div>
                    <span className="font-bold text-yellow-400 text-sm text-right">
                      Addressable
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                    <div>
                      <h4 className="font-bold text-white">Large commercial / hospital / hotel</h4>
                      <p className="text-white text-sm">
                        50+ devices, complex layout, false alarm critical
                      </p>
                    </div>
                    <span className="font-bold text-yellow-400 text-sm text-right">
                      Analogue Addressable
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div>
                      <h4 className="font-bold text-white">Existing conventional being extended</h4>
                      <p className="text-white text-sm">
                        Budget for partial upgrade, mixed old/new areas
                      </p>
                    </div>
                    <span className="font-bold text-yellow-400 text-sm text-right">Hybrid</span>
                  </div>
                </div>
              </div>
              <p>
                Always check the{' '}
                <SEOInternalLink href="/guides/fire-alarm-certificate">
                  fire alarm certificate
                </SEOInternalLink>{' '}
                requirements for the specific building type. The fire risk assessment should specify
                the required category (L1, L2, L3, etc.) and any specific detection requirements. If
                in doubt, consult with a fire alarm specialist or the fire risk assessor.
              </p>
            </>
          ),
        },
        {
          id: 'wiring-requirements',
          heading: 'Wiring Requirements for Fire Alarm Systems',
          content: (
            <>
              <p>
                Fire alarm wiring has specific requirements that differ from standard mains wiring.
                The cable must maintain circuit integrity during a fire for long enough to raise the
                alarm and allow evacuation.
              </p>
              <div className="space-y-4 mt-4">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Cable className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Fire Resistant Cable</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    BS 5839-1 requires fire alarm cables to be fire resistant to BS 7629 or BS 8434.
                    Standard PVC cable (6242Y twin-and-earth) must not be used for fire alarm
                    circuits. The most common fire alarm cable is enhanced fire resistant cable
                    (often branded as FP200 or Firetuf), which maintains circuit integrity at
                    temperatures up to 950°C for at least 2 hours. This ensures the system continues
                    to operate during the fire.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Cable Segregation</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Fire alarm cables must be segregated from mains power cables to prevent
                    interference and ensure the alarm circuit is not compromised by a fault on the
                    mains wiring. BS 5839-1 recommends a minimum separation of 300mm from mains
                    cables, or the use of separate conduit or trunking. Where fire alarm cables
                    cross mains cables, they should do so at right angles.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Radio className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">
                      Loop Wiring for Addressable Systems
                    </h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Addressable loop circuits typically use 2-core fire resistant cable (1.0mm² or
                    1.5mm²). The loop must start and return to the panel — never terminate at a
                    device. Some panels support Class A (loop returns to panel) and Class B (radial
                    — does not return) loop configurations. Class A provides the highest resilience
                    and is the standard for most commercial installations. The{' '}
                    <SEOInternalLink href="/guides/testing-sequence">
                      testing sequence
                    </SEOInternalLink>{' '}
                    for fire alarm circuits includes loop resistance, insulation resistance, and
                    earth fault checks.
                  </p>
                </div>
              </div>
              <SEOAppBridge
                title="Emergency Lighting Certificate for Fire Safety"
                description="Fire alarm systems are often installed alongside emergency lighting. Elec-Mate's emergency lighting certificate form covers all BS 5266 requirements — monthly functional tests, annual duration tests, and comprehensive recording of all luminaire positions and test results."
                icon={ClipboardCheck}
              />
            </>
          ),
        },
      ]}
      howToHeading="Fire Alarm System Installation — Step-by-Step"
      howToDescription="A practical guide to installing a networked fire alarm system."
      howToSteps={[
        {
          name: 'Review the fire risk assessment and determine the system category',
          text: 'Obtain the fire risk assessment for the building. Identify the required BS 5839 category (M, L1-L5, P1-P2). Determine the detection type required for each area (smoke, heat, multi-sensor, CO). Assess the building layout and decide whether conventional, addressable, or analogue addressable is appropriate.',
        },
        {
          name: 'Design the system layout and zone/loop plan',
          text: 'Plan detector locations to ensure compliance with the specified category. Design zone boundaries (conventional) or loop routing (addressable). Position manual call points at exits. Plan sounder locations to achieve the required sound level (65dB or 75dB at bedhead). Identify power supply and battery backup requirements.',
        },
        {
          name: 'Install fire resistant cable and devices',
          text: 'Run fire resistant cable (FP200 or equivalent) for all fire alarm circuits. Install detectors, call points, sounders, and interface modules. Maintain correct segregation from mains cables. Install the fire alarm panel in a suitable location (typically the main entrance for fire service access).',
        },
        {
          name: 'Commission and test every device',
          text: 'Programme device addresses (addressable systems). Test every detector using approved test equipment (smoke aerosol, heat test lamps). Verify every call point operates correctly. Check sounder levels meet BS 5839 requirements throughout the building. Test battery backup and mains failure switchover.',
        },
        {
          name: 'Complete the fire alarm certificate and handover',
          text: 'Complete the commissioning certificate with all test results and system details. Prepare the system logbook. Issue the as-fitted drawings showing device locations and cable routes. Hand over to the responsible person with operating instructions and maintenance schedules.',
        },
      ]}
      faqs={[
        {
          question: 'What is the difference between addressable and conventional fire alarms?',
          answer:
            'A conventional fire alarm system divides the building into zones, with each zone wired as a separate circuit. When a detector activates, the panel shows which zone is in alarm but cannot identify the specific device. An addressable system connects all devices on a single loop — each device has a unique address, so the panel can identify exactly which detector has triggered. Addressable systems use less cable, provide better fault identification, and are essential for larger buildings where knowing the exact location of the fire is critical.',
        },
        {
          question:
            'When should I use an analogue addressable system instead of a standard addressable system?',
          answer:
            'Analogue addressable systems should be used in larger buildings (typically 50+ devices), buildings where false alarm reduction is a priority (hospitals, hotels, schools), and buildings with demanding environmental conditions (kitchens, dusty environments, high humidity areas). The key advantages are pre-alarm warnings, drift compensation, individual sensitivity adjustment, and predictive maintenance. For smaller buildings with simple layouts, a standard addressable or conventional system is more cost-effective.',
        },
        {
          question: 'Can I use standard PVC cable for fire alarm wiring?',
          answer:
            'No. BS 5839-1 requires fire alarm cables to be fire resistant to BS 7629 or BS 8434. Standard PVC twin-and-earth cable (6242Y) must not be used for fire alarm circuits because PVC cable will fail within minutes in a fire, potentially silencing the alarm system before all occupants have evacuated. Fire resistant cable (such as FP200) maintains circuit integrity at 950°C for at least 2 hours.',
        },
        {
          question: 'How many detectors can I put on one conventional zone?',
          answer:
            'This depends on the panel manufacturer, but typically 20-30 devices per zone. BS 5839-1 also limits each zone to a maximum floor area of 2,000m² and requires zones to be confined to a single floor (with some exceptions for stairwells). The practical limit is usually determined by the panel specification rather than the BS 5839 requirements. Always check the panel installation manual for the maximum devices per zone.',
        },
        {
          question: 'What category fire alarm system does an HMO need?',
          answer:
            'This depends on the specific building and the fire risk assessment, but LACORS (Local Authority Coordinators of Regulatory Services) guidance recommends Category LD2 (BS 5839-6) for most HMOs — detection in escape routes and rooms opening onto escape routes, plus high-risk areas such as kitchens. Larger HMOs or those with higher risk may require LD1 (full protection). The fire risk assessment should specify the required category. Some local authorities have their own specific requirements — always check with the local housing authority.',
        },
        {
          question: 'How does Elec-Mate help with fire alarm installations?',
          answer:
            'Elec-Mate provides digital fire alarm certificates that cover all BS 5839 commissioning requirements. The certificate form captures system details, zone or loop information, device locations, test results, and commissioning data. The app also includes emergency lighting certificate forms for BS 5266 compliance — fire alarm and emergency lighting systems are almost always installed together. All certificates are validated against the relevant standards and can be issued as professional PDF documents from your phone or tablet.',
        },
      ]}
      relatedPages={[
        {
          href: '/guides/fire-alarm-certificate',
          title: 'Fire Alarm Certificate',
          description: 'How to complete fire alarm commissioning certificates.',
          icon: FileText,
          category: 'Certification',
        },
        {
          href: '/guides/emergency-lighting-certificate',
          title: 'Emergency Lighting Certificate',
          description: 'BS 5266 emergency lighting certification guide.',
          icon: Zap,
          category: 'Certification',
        },
        {
          href: '/guides/emergency-lighting-testing',
          title: 'Emergency Lighting Testing',
          description: 'Monthly and annual testing requirements for emergency lighting.',
          icon: ClipboardCheck,
          category: 'Guide',
        },
        {
          href: '/guides/eicr-certificate',
          title: 'EICR Certificate',
          description: 'Electrical installation condition reports for commercial premises.',
          icon: ClipboardCheck,
          category: 'Certification',
        },
        {
          href: '/guides/eicr-for-landlords',
          title: 'EICR for Landlords',
          description: 'Landlord electrical safety requirements including HMOs.',
          icon: Building,
          category: 'Guide',
        },
        {
          href: '/guides/testing-sequence',
          title: 'Testing Sequence Guide',
          description: 'The correct sequence for electrical testing procedures.',
          icon: ShieldCheck,
          category: 'Guide',
        },
      ]}
      ctaHeading="Fire Alarm Certificates Made Simple With Elec-Mate"
      ctaSubheading="Digital fire alarm certificates, emergency lighting forms, and EICR documentation — all validated against BS 5839 and BS 5266. 7-day free trial, cancel anytime."
    />
  );
}
