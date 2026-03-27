import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  AlertTriangle,
  Shield,
  Settings,
  FileCheck2,
  Activity,
  Building2,
  Thermometer,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Industrial Guides', href: '/industrial-electrical-installation' },
  { label: 'Transformer Installation Guide', href: '/transformer-installation-guide' },
];

const tocItems = [
  { id: 'types-of-transformers', label: 'Types of Transformer' },
  { id: 'installation-requirements', label: 'Installation Requirements' },
  { id: 'oil-vs-dry-type', label: 'Oil-Filled vs Dry-Type' },
  { id: 'primary-secondary-protection', label: 'Primary and Secondary Protection' },
  { id: 'dno-notification', label: 'DNO Notification Requirements' },
  { id: 'commissioning-tests', label: 'Commissioning Tests' },
  { id: 'maintenance-schedule', label: 'Maintenance Schedule' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Transformers must be installed with adequate ventilation clearances — oil-filled transformers require fire containment (bund or fire-resistant construction) to BS EN 61936-1 and IET Guidance Note 4.',
  'Oil-filled (ONAN) transformers are cheaper and more efficient for large ratings but require an oil containment bund and fire wall; dry-type (AN/AF) transformers are preferred for indoor and high-rise installations where oil is not permitted.',
  'Primary protection (HV fuses or HV circuit breaker) must be sized to the transformer full load current on the primary side; secondary protection must coordinate with the primary protection to ensure discrimination.',
  'DNO notification is required before connecting any transformer above a threshold capacity to the distribution network — typically via an Engineering Recommendation (ER) such as ER G99 for generation or ER P2 for demand.',
  'Commissioning tests must include insulation resistance (primary-to-secondary, primary-to-earth, secondary-to-earth), turns ratio check, polarity test, and no-load loss measurement before energisation.',
  'Transformer maintenance intervals depend on type and loading — oil-filled transformers require oil sampling every 1–3 years; dry-type transformers require visual inspection and cleaning annually.',
];

const faqs = [
  {
    question: 'What is the difference between an isolation transformer and a step-down transformer?',
    answer:
      'An isolation transformer has a 1:1 turns ratio — the output voltage equals the input voltage. Its purpose is to provide galvanic isolation between the primary and secondary circuits, breaking any earth connection and preventing shock from a single contact with the secondary live conductor. An earth referenced IT system is commonly created using an isolation transformer. A step-down transformer has a higher primary turns count than secondary, reducing voltage (e.g., 11 kV to 400 V for a distribution transformer, or 400 V to 110 V for a site safety transformer). An autotransformer uses a single winding with a tapping point — it is smaller and cheaper but provides no galvanic isolation.',
  },
  {
    question: 'What ventilation clearances are required around a transformer?',
    answer:
      'Ventilation clearances depend on the transformer type, rating, and manufacturer\'s recommendations. As a general guide: dry-type transformers (AN — air natural cooled) require at least 300 mm clearance above and on all sides for natural convection cooling; clearances increase with rating (consult the manufacturer data sheet). Oil-filled transformers require similar clearances plus fire separation from combustible materials. Both types must be positioned so that cooling airflow is not obstructed by adjacent equipment, walls, or ductwork. High-voltage clearances to live parts must also be maintained in accordance with BS EN 61936-1 for voltages above 1 kV.',
  },
  {
    question: 'When must I notify the DNO before installing a transformer?',
    answer:
      'DNO notification is required in several situations: (1) connecting a new load transformer above the capacity that the existing supply agreement covers — the DNO may need to reinforce the network; (2) connecting a generator or other source of generation through a step-up transformer — Engineering Recommendation G99 applies for connections above 16 A per phase (3.68 kW single phase, 11 kW three phase); (3) installing a high-voltage (HV) transformer connected to an HV supply — a formal connection agreement is required. Even for purely secondary distribution (e.g., 400 V to 110 V site safety transformers) where no new supply is needed, check that the existing supply agreement covers the additional demand.',
  },
  {
    question: 'What are the commissioning tests for a new distribution transformer?',
    answer:
      'Commissioning tests for a distribution transformer (e.g., 11 kV/400 V) typically include: insulation resistance measurement (primary to earth, secondary to earth, primary to secondary) using a 5 kV insulation resistance tester; turns ratio test (using a transformer turns ratio meter — should be within ±0.5% of nameplate ratio); polarity/vector group test (confirming Dyn11 or other vector group is correct); winding resistance measurement (compared to factory test certificate values); no-load loss measurement; and oil dielectric strength test (oil-filled only, minimum 30 kV/2.5 mm gap to BS EN 60156). Results must be recorded and compared to the factory type test certificate.',
  },
  {
    question: 'How often does transformer oil need to be sampled and tested?',
    answer:
      'Oil-filled distribution transformers in service should have oil sampled and tested every 2–3 years under normal operating conditions, or more frequently if the transformer is loaded above 80% of its rating, installed in a polluted or humid environment, or if previous test results indicated degradation. Dissolved Gas Analysis (DGA) is the most valuable oil test — it detects thermal and electrical faults inside the transformer by identifying gases dissolved in the oil (hydrogen, methane, ethylene, acetylene). Moisture content (Karl Fischer), dielectric strength, and acid number are also measured. Oil condition testing is performed by specialist laboratories from a sample drawn while the transformer is energised (not de-energised).',
  },
  {
    question: 'What fire containment is required for an oil-filled transformer installed indoors?',
    answer:
      'Oil-filled transformers installed indoors require fire containment measures because burning oil can spread and cause structural fire damage. Requirements depend on the oil quantity and building type, but typically include: an oil retention bund (sump) capable of containing 100% of the transformer oil volume plus fire-fighting water; fire-resistant construction of the transformer chamber (typically 2 hours fire resistance); self-closing fire dampers on ventilation openings; and clearance from combustible materials. Detailed guidance is given in the IET Code of Practice for In-Service Inspection and Testing of Electrical Equipment and in BS EN 61936-1 for HV installations. Many insurance policies require sprinkler systems in transformer chambers above a threshold oil quantity.',
  },
  {
    question: 'What is a tap changer on a transformer and how is it set?',
    answer:
      'Distribution transformers are fitted with an off-load tap changer (OLTC) that allows the turns ratio to be adjusted in steps (typically ±2.5% and ±5% from nominal) to compensate for supply voltage variations. Setting the tap position adjusts the secondary voltage — selecting a higher primary tap reduces secondary voltage; selecting a lower primary tap increases secondary voltage. The tap changer is only operated when the transformer is de-energised and isolated. The correct tap position is determined by measuring the secondary no-load voltage and adjusting to achieve the target busbar voltage. Large HV/HV autotransformers use on-load tap changers (OLTC) that can adjust under load.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/industrial-earthing-systems',
    title: 'Industrial Earthing Systems',
    description: 'TN-S, TN-C-S, and TT earthing for industrial premises, EMC earthing, and testing.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/generator-installation-guide',
    title: 'Generator Installation Guide',
    description: 'Standby generators, ATS, DNO requirements, earthing, and commissioning.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/power-factor-correction',
    title: 'Power Factor Correction',
    description: 'Capacitor banks, harmonic detuning, and payback calculation for industrial users.',
    icon: Activity,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-installation-certificate',
    title: 'Electrical Installation Certificate',
    description: 'Complete EICs on your phone and export PDF instantly for transformer installations.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'types-of-transformers',
    heading: 'Types of Electrical Transformer',
    content: (
      <>
        <p>
          Transformers are static electromagnetic devices that transfer electrical energy between
          circuits at different voltages using electromagnetic induction. All transformer
          installations in the UK must comply with BS EN 61558 (small power transformers) or
          BS EN 60076 (power transformers above 1 kVA) and with BS 7671 or BS EN 61936-1 for the
          associated electrical installation. The principal types encountered in UK electrical
          work are as follows.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Isolation transformers (1:1)</strong> — provide galvanic isolation without
                changing voltage. Used for medical locations (BS 7671 Section 710), swimming pool
                pump rooms, IT systems requiring floating earth, and where safety isolation from
                the earthed supply system is needed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step-down transformers</strong> — reduce voltage for specific applications.
                Common examples: 400 V to 110 V centre-tapped for construction site tools (BS EN
                60742), 11 kV to 400 V distribution transformers for LV supply, 33 kV to 11 kV
                for primary distribution substations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Autotransformers</strong> — single winding with a tapping point. Smaller
                and cheaper than double-wound transformers for the same rating, but provide no
                galvanic isolation. Used in star-delta motor starters, voltage regulators, and
                some HVAC equipment. Not permitted where isolation is required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Distribution transformers (HV/LV)</strong> — the most common large
                transformer type on UK sites. Typically 11 kV or 33 kV primary, 400 V secondary,
                rated from 100 kVA to 3 MVA or more. Either oil-filled or dry-type. Installed
                in a dedicated transformer chamber or outdoor compound.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'installation-requirements',
    heading: 'Installation Requirements: Ventilation, Clearances, and Fire Containment',
    content: (
      <>
        <p>
          Transformer installation requirements depend primarily on the voltage class and the
          installation environment. Installations above 1 kV must comply with BS EN 61936-1
          (Power installations exceeding 1 kV AC). LV transformer installations are covered by
          BS 7671. The critical installation parameters are ventilation, clearances to live parts,
          and fire containment for oil-filled units.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ventilation</strong> — natural ventilation (AN) requires openings at low
                level (inlet) and high level (outlet) with total area sufficient for the heat
                dissipation. Forced ventilation (AF) uses fans to move air, allowing higher
                transformer loading. Ventilation openings must be protected against entry of
                vermin and insects without significantly restricting airflow.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical clearances</strong> — minimum phase-to-earth and phase-to-phase
                clearances in air depend on voltage. At 11 kV, minimum clearance is 120 mm
                phase-to-earth, 160 mm phase-to-phase in accordance with BS EN 61936-1 Table 1
                for internal installations. HV terminals must be inaccessible to unauthorised
                persons — enclosed in locked switchgear or in a locked room.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire containment (oil-filled)</strong> — the transformer chamber must be
                constructed with walls, floor, and ceiling of minimum 2 hours fire resistance.
                An oil retention sump (bund) must be provided under and around the transformer,
                sized to contain 100% of the transformer oil volume. Drainage from the sump should
                go to an oil separator, not directly to a surface water drain.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Access and safety</strong> — HV transformer chambers must be lockable,
                with warning notices (yellow triangular HV warning signs) on all access doors.
                A safety document system (permit to work) must be in place before any work is
                carried out near HV equipment. Earthing facilities (earthing sticks) must be
                provided for safely earthing isolated conductors.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'oil-vs-dry-type',
    heading: 'Oil-Filled vs Dry-Type Transformers',
    content: (
      <>
        <p>
          The choice between oil-filled and dry-type transformers is one of the most important
          decisions in transformer specification. Both types are available from approximately
          100 kVA to several MVA. The correct choice depends on the installation environment,
          fire risk, maintenance capability, and lifetime cost.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Oil-filled (ONAN/ONAF)</strong> — mineral oil provides both insulation
                and cooling. Lower purchase cost for equivalent rating, lower no-load losses,
                proven long service life (30+ years with proper oil maintenance). Requires fire
                containment, periodic oil sampling, and disposal of condemned oil to licensed
                waste contractor. Preferred for outdoor substations and large indoor installations
                where fire containment can be provided economically.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dry-type (AN/AF, cast resin)</strong> — epoxy resin or open-wound dry
                coils, cooled by air. No oil, no fire hazard, no bund required. Preferred for
                indoor urban buildings, hospitals, shopping centres, and high-rise buildings where
                oil storage is not permitted. Higher purchase cost than oil-filled equivalent.
                Less tolerant of overloading (no oil thermal buffer). Cast resin type has excellent
                moisture resistance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ester fluid-filled</strong> — synthetic or natural ester dielectric fluid
                as an alternative to mineral oil. Higher fire point than mineral oil (fire point
                &gt;300°C vs ~160°C), biodegradable (natural ester), and can be installed in
                locations where mineral oil transformers are not permitted. Higher fluid cost than
                mineral oil but may eliminate the need for expensive fire containment construction.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For new indoor substation installations, dry-type or ester-filled transformers are
          increasingly specified to simplify planning consent and reduce the cost and complexity
          of fire containment. Consult with the building insurer before specifying the transformer
          type — some insurers have specific requirements.
        </p>
      </>
    ),
  },
  {
    id: 'primary-secondary-protection',
    heading: 'Primary and Secondary Protection',
    content: (
      <>
        <p>
          Transformer protection prevents damage to the transformer from overloads and faults on
          either the primary (HV) or secondary (LV) side. Protection must be coordinated so that
          faults are cleared by the closest protective device, and the primary protection does not
          operate unnecessarily for secondary faults that the secondary protection can clear.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>HV primary protection</strong> — HV fuses (for transformers up to
                approximately 1 MVA) or HV circuit breakers with overcurrent and earth fault
                relays (for larger transformers) protect the primary winding. Fuses are sized
                to the transformer rated primary current, allowing for magnetising inrush (typically
                10–12 times rated current for 100 ms) without blowing. Coordinate with the DNO's
                protection — the DNO fuse or breaker must discriminate with the customer's primary
                protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>LV secondary protection</strong> — the main LV circuit breaker (ACB or
                MCCB) on the secondary side protects the transformer from secondary faults and
                overload. Sized to the transformer rated secondary current. Must have a breaking
                capacity sufficient to interrupt the maximum prospective short-circuit current
                at the LV terminals (can be very high — 50 kA or more for large transformers
                on a stiff HV supply).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Buchholz relay (oil-filled)</strong> — a Buchholz relay installed in the
                pipe between the transformer tank and the conservator detects gas accumulation
                (indicating internal arcing or overheating) and oil surge (indicating a serious
                fault). Provides both alarm (slow gas accumulation) and trip (oil surge) signals.
                Standard on all oil-filled transformers above approximately 500 kVA.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Winding temperature protection</strong> — winding temperature indicators
                (WTI) and oil temperature indicators (OTI) provide alarm and trip signals at
                preset temperatures (typically alarm at 100°C, trip at 115°C for oil-filled).
                Dry-type transformers use PT100 or thermistor sensors embedded in the windings.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dno-notification',
    heading: 'DNO Notification Requirements',
    content: (
      <>
        <p>
          The Distribution Network Operator (DNO) must be notified before connecting certain
          transformer installations to the distribution network. Failure to notify can result in
          the connection being refused, the installation having to be modified, or the customer
          being disconnected. The relevant Engineering Recommendations (ERs) are published by
          the Energy Networks Association (ENA).
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>ER G99</strong> — applies to generation connected to the distribution
                network above 16 A per phase (3.68 kW single phase, 11 kW three phase). Any
                transformer associated with a generator (step-up transformer for export) requires
                G99 application and DNO approval before connection. G99 specifies protection
                requirements (loss of mains protection, vector shift, ROCOF) and connection
                procedures.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>ER P2</strong> — the DNO's security of supply standard. Large new demand
                connections (including large transformer installations) may require a formal
                capacity assessment under ER P2 to ensure the network can supply the load reliably.
                The DNO may require network reinforcement works, which are funded by the connecting
                customer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>HV supply connections</strong> — connecting a private HV/LV transformer
                to the DNO's HV network always requires a formal connection agreement. The DNO
                specifies the metering arrangement (typically at HV), protection relay settings,
                and earthing requirements. The site HV switchgear must meet DNO specifications.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Timescales</strong> — DNO connection agreements for HV supplies and
                large LV supplies typically take 3–12 months to process, depending on the network
                complexity. Plan well in advance and submit the application as early in the project
                as possible to avoid programme delays.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'commissioning-tests',
    heading: 'Commissioning Tests',
    content: (
      <>
        <p>
          A new transformer must be tested before energisation to verify it has not been damaged
          in transit, is correctly installed, and its protection systems are functional.
          Commissioning tests are carried out by the transformer manufacturer's representative
          or by a specialist high-voltage testing contractor. An Electrical Installation
          Certificate is required for the associated LV installation work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulation resistance tests</strong> — using a 5 kV insulation resistance
                tester (for HV/LV transformers): primary to earth, secondary to earth, primary to
                secondary. Minimum acceptable IR values depend on the transformer voltage class and
                winding temperature — compare results to the factory test certificate. A significant
                reduction from factory values indicates moisture ingress or insulation damage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Turns ratio test</strong> — verifies the transformation ratio matches
                the nameplate data and confirms the tap changer is set correctly. Carried out
                with a TTR (transformer turns ratio) meter applied to each phase. Result should
                be within ±0.5% of nameplate ratio. Incorrect ratio indicates a winding fault
                or incorrect tap position.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Vector group test</strong> — confirms the phase relationship between
                primary and secondary voltages (e.g., Dyn11 — delta primary, star secondary with
                neutral, 30° lag). Incorrect vector group causes circulating currents and potential
                damage if the transformer is paralleled with another unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Oil dielectric strength (oil-filled)</strong> — oil sample tested to
                BS EN 60156 using a standard oil test set. Minimum breakdown voltage 30 kV for
                a 2.5 mm gap. Low dielectric strength indicates moisture or contamination in the
                oil — oil must be filtered or replaced before energisation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'maintenance-schedule',
    heading: 'Maintenance Schedule',
    content: (
      <>
        <p>
          Transformers are long-life assets but require planned maintenance to achieve their design
          life and to provide early warning of developing faults. The Electricity at Work
          Regulations 1989 require that electrical systems are maintained to prevent danger.
          The specific maintenance requirements depend on the transformer type.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual visual inspection</strong> — check for oil leaks (oil-filled),
                external damage, corrosion, termination integrity, label legibility, condition
                of cable boxes and glands, operation of temperature indicators, and Buchholz
                relay (oil-filled). Record and act on all defects found.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Oil sampling (oil-filled) — every 2–3 years</strong> — dissolved gas
                analysis (DGA), moisture content, dielectric strength, acid number, and interfacial
                tension. DGA results interpreted against IEC 60599 (Guide to the Interpretation
                of Dissolved and Free Gases Analysis) to identify developing faults.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thermographic survey — every 2–3 years</strong> — infrared thermography
                of all LV and HV terminations identifies loose connections and overloaded
                conductors before they cause failures. Requires the transformer to be loaded to
                at least 70% of rated capacity during the survey.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Protection relay testing — every 3–5 years</strong> — secondary injection
                testing of overcurrent and earth fault relays to verify operating times and
                current settings match the protection coordination study. Buchholz relay float
                test. Winding temperature relay simulation test.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Transformer Installation Certification',
    content: (
      <>
        <p>
          All fixed installation work associated with a transformer — LV connections, earth
          conductor sizing, cable installations, and protective device installation — requires
          an Electrical Installation Certificate under BS 7671. HV work on the transformer itself
          requires specialist HV-qualified personnel.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete the EIC on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-installation-certificate">
                    Elec-Mate EIC app
                  </SEOInternalLink>{' '}
                  to record all LV commissioning test results and complete the Electrical
                  Installation Certificate on your phone. Record insulation resistance values,
                  earth conductor details, prospective fault current, and protective device
                  ratings — then export the PDF certificate before leaving site.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Certificate transformer installations with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for on-site EIC completion, commissioning test records, and instant PDF export. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function TransformerInstallationGuidePage() {
  return (
    <GuideTemplate
      title="Transformer Installation UK | Electrical Transformer Guide"
      description="Complete guide to electrical transformer installation in the UK. Isolation, step-down, and autotransformers — ventilation requirements, oil-filled vs dry-type, primary and secondary protection, DNO notification, commissioning tests, and maintenance."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Industrial Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Transformer Installation UK:{' '}
          <span className="text-yellow-400">Complete Electrical Guide</span>
        </>
      }
      heroSubtitle="Everything UK electricians and engineers need to know about electrical transformer installation — types of transformer, ventilation and clearance requirements, oil-filled vs dry-type selection, primary and secondary protection, DNO notification, commissioning tests, and maintenance schedules."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Transformer Installation"
      relatedPages={relatedPages}
      ctaHeading="Complete Transformer Installation EICs on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site electrical installation certification, commissioning test records, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
