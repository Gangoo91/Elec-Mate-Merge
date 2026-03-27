import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  ShieldCheck,
  FileCheck2,
  GraduationCap,
  ClipboardCheck,
  Wrench,
  Server,
  Gauge,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Specialist Work', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Data Centre Electrical Installation', href: '/guides/data-centre-electrical-installation' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'tier-classification', label: 'Tier Classification I–IV' },
  { id: 'critical-power', label: 'Critical Power: UPS, Generators, ATS' },
  { id: 'bs-en-50600', label: 'BS EN 50600 Standards' },
  { id: 'pdu-busbar', label: 'PDUs and Busbar Systems' },
  { id: 'earthing', label: 'Earthing in Data Centres' },
  { id: 'me-coordination', label: 'M&E Coordination' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Data centres are classified by the Uptime Institute Tier system (I to IV), with each tier defining increasing levels of redundancy and availability. Tier I has no redundancy; Tier IV has full fault tolerance with fully independent redundant capacity. The tier determines the electrical design philosophy.',
  'Critical power systems in a data centre typically comprise: uninterruptible power supplies (UPS), standby generators, automatic transfer switches (ATS), and static transfer switches (STS). The design ensures that no single component failure can interrupt power to the IT load.',
  'The BS EN 50600 series is the European standard for data centre facilities and infrastructure. It covers power distribution (BS EN 50600-2-2), environmental control (BS EN 50600-2-3), physical security, telecommunications cabling, and management. BS EN 50600-2-2 is directly relevant to electrical engineers.',
  'Power distribution within data centres uses power distribution units (PDUs), overhead busbar systems (to allow flexible IT equipment racking), and in-row power distribution. Type A PDU is a simple passive distribution board; Type B adds monitoring; Type C adds switching.',
  'Earthing in data centres requires careful consideration. Signal reference networks (SRN or MESBN — mesh-bonded signal reference network) are used for IT equipment earthing to minimise potential differences. The conflict between IT equipment requirements and BS 7671 earthing provisions must be resolved by careful design.',
];

const faqs = [
  {
    question: 'What is the Uptime Institute Tier classification system?',
    answer:
      'The Uptime Institute Tier classification is the globally recognised framework for defining data centre resilience and availability. Tier I: A basic data centre with a single path for power and cooling and no redundancy. Susceptible to disruption from any component failure or maintenance. Tier II: Has redundant components (N+1) but still a single path for power and cooling distribution. Can tolerate some component failures. Tier III: Has multiple active power and cooling distribution paths but only one is active at a time. All equipment can be maintained without disrupting the IT load. Tier IV: Has multiple active power and cooling distribution paths. Any single failure of a component, power path, or cooling path will not impact the IT load. Requires fully independent, physically separated systems — including separate distribution paths, separate UPS systems, and separate generators. The electrical design approach changes substantially between tiers. A Tier IV data centre may have 2N (dual redundant) UPS and generator capacity, dual-path PDUs in every rack, and physically separate power rooms.',
  },
  {
    question: 'What is an ATS and how does it differ from an STS?',
    answer:
      'An ATS (Automatic Transfer Switch) is a switch that automatically transfers an electrical load from its primary power source (the utility or UPS output) to a secondary source (typically a generator) when the primary source fails. The transfer time is typically 5 to 30 seconds — fast enough to be covered by UPS battery runtime. An STS (Static Transfer Switch) is a much faster transfer device that uses solid-state components (thyristors) rather than mechanical contacts to transfer between two sources. Transfer time is typically less than 4 milliseconds — within half a cycle of the mains frequency, fast enough that IT equipment does not notice the transfer. STSs are used in high-availability data centres to switch between two independent UPS systems (Path A and Path B). If Path A fails, the STS transfers the load to Path B in under 4ms. The load must meet the IT equipment\'s tolerance for momentary voltage disturbances, which is specified in the IEC 61000 series. STSs are significantly more expensive than ATSs but provide the near-instantaneous transfer that Tier IV data centres require.',
  },
  {
    question: 'What does BS EN 50600-2-2 cover for data centre electrical installations?',
    answer:
      'BS EN 50600-2-2 (Information technology — Data centre facilities and infrastructures — Part 2-2: Power distribution) is the European standard for electrical power distribution within data centres. It covers: power supply system design (utility intake, generator connections, UPS systems, switchgear); distribution systems (cabling, busbar, PDUs); power quality requirements; earthing and bonding; electrical protection; monitoring and control; and classification of the power distribution system in terms of availability. The standard aligns with the Uptime Institute tier concept but uses its own class (1 to 4) designation. BS EN 50600-2-2 is used alongside BS 7671 — BS 7671 governs the general electrical installation requirements; BS EN 50600-2-2 adds the data centre-specific requirements on top. In practice, data centre electrical engineers must be familiar with both standards and with the specialist requirements of UPS systems, battery strings, generator controls, and busbar systems.',
  },
  {
    question: 'Why does cooling account for 40–60% of a data centre\'s power budget?',
    answer:
      'Every watt consumed by IT equipment — servers, storage, network switches — is converted to heat. That heat must be removed from the data hall and rejected to the atmosphere to maintain IT equipment at its operating temperature (typically 18–27°C inlet temperature per ASHRAE A1/A2 guidelines). The cooling system — computer room air conditioners (CRACs), computer room air handlers (CRAHs), chillers, cooling towers, dry coolers, and in-row cooling units — must handle this heat load continuously. In a large data centre, the IT load may be 10MW or more. The cooling system for that load may consume 4 to 6MW of electrical power in addition. The ratio of total facility power to IT power is expressed as PUE (Power Usage Effectiveness). A PUE of 1.0 would be perfectly efficient (all power goes to IT). Modern data centres target PUE of 1.2 to 1.4; older and less efficient facilities may have PUE of 1.6 to 2.0. Understanding PUE is important for electrical engineers on data centre projects — the cooling electrical loads are a major part of the LV distribution design.',
  },
  {
    question: 'What is a mesh-bonded signal reference network (MESBN) in data centres?',
    answer:
      'A Mesh-Bonded Signal Reference Network (MESBN) is a bonding grid installed beneath the raised floor (or within the structure) of a data centre to provide a common reference potential for IT equipment. IT equipment generates high-frequency currents that require a low-impedance return path. A simple star-connected earth system (as typically used in domestic and commercial installations) has too high an impedance at high frequencies to prevent noise and interference. An MESBN provides a mesh of conductors bonded at frequent intervals, giving a low-impedance return path at all frequencies. The MESBN is connected to the building main earthing terminal. Each equipment rack is bonded to the MESBN directly beneath it. This approach can appear to conflict with BS 7671 earthing principles, which focus on fault current return paths. In data centres, the design must satisfy both the BS 7671 requirement for effective fault current return and the IT equipment requirement for an effective signal reference network. The solution, as described in BS EN 50600-2-2 and IEC/TR 27036 guidance, is an MESBN that is also the protective earthing conductor for the IT equipment, connected to the MET at the point of supply.',
  },
  {
    question: 'What types of busbar system are used in data centres?',
    answer:
      'Overhead busbar systems (also called overhead busway or busbar trunking) are widely used in data centres to distribute power to IT racks from above. They allow power connections to be made and broken without de-energising the entire distribution system — essential in live data centres where downtime is not acceptable. The main busbar types: Tap-off busbar — a continuously rated busway with tap-off boxes at regular centres (typically 600mm). IT racks connect to tap-off boxes via power cables or plug-in PDUs. Busbar current ratings for data centres typically range from 400A to 3200A (single busway). Plug-in tap-off PDU busbar — the tap-off box connects directly to an overhead PDU that hangs into the rack aisle, eliminating floor cables. This is the most common configuration in modern high-density data centres. The busbar system operates at 400V three-phase (UK and European standard). The electrical engineer must design the busbar layout to achieve maximum IT flexibility while respecting cable and busway current ratings, protection discrimination, and access for maintenance.',
  },
  {
    question: 'What is the role of the electrical engineer during data centre commissioning?',
    answer:
      'Data centre commissioning is a rigorous process that tests each system component individually (Level 1), then system integration (Level 2), then complete facility-wide scenarios including simulated failures (Level 3 and Level 4). The electrical engineer\'s responsibilities during commissioning include: witnessing factory acceptance testing (FAT) of UPS systems, switchgear, and generators; overseeing installation and pre-commissioning testing of all electrical systems; coordinating the energisation sequence (utility intake → HV switchgear → transformers → LV main switchboards → UPS → distribution → IT loads); performing and witnessing all LV tests per BS 7671 (insulation resistance, continuity, earth fault loop impedance, RCD testing) for the general electrical installation; participating in integrated systems testing including simulated mains fail and UPS bypass scenarios; and reviewing and signing off the commissioning test documentation. An Electrical Installation Certificate is required for all new LV work per BS 7671, even within a data centre.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/high-voltage-electrical-work-uk',
    title: 'High Voltage Electrical Work UK',
    description:
      'Large data centres connect at 11kV or 33kV. Understand HV authorisation, ENA standards, and DNO connections.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/clean-room-electrical-installation',
    title: 'Clean Room Electrical Installation',
    description:
      'Semiconductor data centre adjacent facilities. Similar validation and documentation requirements.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/building-management-systems-bms-electrical',
    title: 'Building Management Systems Electrical',
    description:
      'Data centres use sophisticated BMS and DCIM. Understand BACnet, Modbus, and DALI integration.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for data centre LV installations on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for data centre UPS feeds, generator supplies, and rack PDU connections.',
    icon: Gauge,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'C&G 2391 is essential for data centre commissioning electrical testing.',
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
    heading: 'Data Centre Electrical Installation: The Specialist Guide',
    content: (
      <>
        <p>
          Data centre construction is one of the most dynamic segments of UK electrical contracting.
          Hyperscaler campuses from Amazon Web Services, Microsoft, Google, and Meta, together with
          a rapidly growing co-location sector, are driving billions of pounds of construction
          activity. Data centres are mechanically and electrically intensive — the M&E package on a
          large data centre can be 60 to 70% of the total project cost.
        </p>
        <p>
          For electricians and electrical engineers, data centre work offers long-duration projects,
          complex and interesting technical challenges, and strong pay rates. The critical power
          philosophy — no single point of failure, always-available power — drives a design and
          installation rigour that is rewarding to work within.
        </p>
        <p>
          This guide covers the Uptime Institute Tier classification, critical power design
          (UPS, generators, ATS, STS), the relevant standard{' '}
          <strong>BS EN 50600</strong>, power distribution (PDUs and busbar), earthing in data
          centres, and M&E coordination.
        </p>
      </>
    ),
  },
  {
    id: 'tier-classification',
    heading: 'Tier Classification I–IV and Redundancy Design',
    content: (
      <>
        <p>
          The Uptime Institute Tier system defines four levels of data centre resilience. The tier
          dictates the electrical design philosophy — how much redundancy must be designed in and
          how many concurrent failures the system must tolerate.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-2">Tier I and II: N and N+1</h3>
            <p className="text-white text-sm leading-relaxed">
              Tier I has a single path — no redundancy. Tier II adds redundant components (N+1 UPS
              modules, N+1 generators) but only one distribution path. Component failure may not
              cause outage, but maintenance requires downtime. Typical for small enterprise data
              centres and server rooms.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-2">Tier III and IV: N+1 and 2N</h3>
            <p className="text-white text-sm leading-relaxed">
              Tier III has multiple active distribution paths — maintenance can be carried out
              without interruption. Tier IV has fully independent, dual systems (2N). Any single
              failure — component or path — has no impact on IT load. Typical for hyperscaler and
              financial sector co-location facilities.
            </p>
          </div>
        </div>
        <p>
          Most new-build data centres target Tier III as a minimum. Hyperscaler facilities often
          build to Tier III standards but with Tier IV levels of operational discipline. The
          electrical design for Tier III and IV requires dual-path UPS systems (Path A and Path B
          to every rack), independent generator sets on each path, and automatic transfer capability
          between paths.
        </p>
      </>
    ),
  },
  {
    id: 'critical-power',
    heading: 'Critical Power Design: UPS, Generators, ATS, and STS',
    content: (
      <>
        <p>
          The critical power system is the heart of a data centre electrical installation. It ensures
          that the IT load receives continuous, clean power regardless of utility supply issues.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Server className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>UPS (Uninterruptible Power Supply)</strong> — provides instant battery backup on utility failure, protecting the IT load until generators start. Modern large-scale data centres use modular UPS systems with N+1 or 2N module redundancy. Efficiency at full load: 95–97% (VFI double-conversion).</span>
            </li>
            <li className="flex items-start gap-3">
              <Server className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Standby generators</strong> — diesel or gas generators start within 10–15 seconds of utility failure and carry the full data centre load within 30 seconds. Battery runtime on the UPS bridges this gap. Generator sizing includes all IT loads plus cooling, lighting, and ancillary services.</span>
            </li>
            <li className="flex items-start gap-3">
              <Server className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>ATS (Automatic Transfer Switch)</strong> — transfers the non-UPS loads (cooling, lighting, ancillary) from utility to generator supply on utility failure. Transfer time 5–30 seconds. Mechanical switching device.</span>
            </li>
            <li className="flex items-start gap-3">
              <Server className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>STS (Static Transfer Switch)</strong> — transfers IT loads between two independent UPS paths in under 4 milliseconds using solid-state switching. Used in Tier III and IV for dual-path PDU switching. Much faster than an ATS but significantly more expensive.</span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'bs-en-50600',
    heading: 'BS EN 50600: Data Centre Electrical Standards',
    content: (
      <>
        <p>
          The BS EN 50600 series (Information technology — Data centre facilities and
          infrastructures) is the European standard framework for data centres. Key parts relevant
          to electrical engineers:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>BS EN 50600-1</strong> — General concepts. Defines terminology, reference models, and the availability class (1–4) framework corresponding to Tier I–IV.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>BS EN 50600-2-2</strong> — Power distribution. Covers utility intake, UPS, generators, distribution boards, PDUs, and earthing. The core electrical design standard for data centre power engineers.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>BS EN 50600-2-3</strong> — Environmental control. Cooling systems including CRAC, CRAH, chillers, and adiabatic cooling. Relevant to M&E coordination as cooling loads dominate the LV distribution design.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>BS EN 50600-3-1</strong> — Management and operational information. Covers monitoring, DCIM (Data Centre Infrastructure Management), and operational procedures relevant to the BMS and power monitoring installations.</span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pdu-busbar',
    heading: 'PDU Types and Busbar Systems',
    content: (
      <>
        <p>
          Power Distribution Units (PDUs) distribute power from the UPS output to the IT racks.
          The IEC 62040 series and BS EN 50600-2-2 define PDU types:
        </p>
        <div className="grid gap-4 sm:grid-cols-3 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-2">Type A PDU</h3>
            <p className="text-white text-sm leading-relaxed">
              Passive distribution. Input from UPS, output to in-rack PDUs via fixed cables. No
              monitoring, no switching. Simple and reliable but no real-time visibility of load.
              Used in lower-tier data centres.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-2">Type B PDU</h3>
            <p className="text-white text-sm leading-relaxed">
              Distribution with monitoring. Real-time current, voltage, and power measurement at
              branch circuit level. Enables capacity planning and load balancing. Standard in Tier
              III and IV data centres.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-2">Type C PDU</h3>
            <p className="text-white text-sm leading-relaxed">
              Distribution with monitoring and remote switching. Individual circuit breakers can be
              remotely operated — enables remote reboot of servers and selective load shedding.
              Used in high-density hyperscaler deployments.
            </p>
          </div>
        </div>
        <p>
          Overhead busbar systems allow tap-off points to be added or moved as IT equipment is
          reconfigured — essential in rapidly changing data centre environments. Busbar tap-off
          current ratings of 16A, 32A, and 63A per phase cover the full range of server rack power
          densities from 5kW to 30kW+.
        </p>
      </>
    ),
  },
  {
    id: 'earthing',
    heading: 'Earthing in Data Centres: Isolated Earth vs Common Earth',
    content: (
      <>
        <p>
          Earthing in data centres requires careful engineering to satisfy two conflicting sets of
          requirements: the BS 7671 requirement for effective fault current return paths, and the IT
          equipment requirement for a low-impedance, low-noise signal reference.
        </p>
        <p>
          The traditional approach of providing "isolated earth" (IE) sockets for IT equipment —
          separate from the protective earth — is now considered outdated and potentially unsafe.
          Current practice, consistent with BS EN 50600-2-2 and IEC guidance, uses a
          Mesh-Bonded Signal Reference Network (MESBN) as both the protective earth and the signal
          reference. The MESBN is a grid of conductors beneath the raised floor bonded at every
          crossing point, providing a low-impedance path at all frequencies.
        </p>
        <SEOAppBridge
          title="Certify data centre LV installations efficiently"
          description="Elec-Mate's EIC tools streamline the certification of data centre LV distributions. Multi-board certificate management, AI-assisted board scanning, and instant PDF export for client handover."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'me-coordination',
    heading: 'M&E Coordination: Cooling as 40–60% of Power Budget',
    content: (
      <>
        <p>
          Data centre M&E coordination is complex because the electrical and mechanical systems are
          tightly interdependent. The cooling system accounts for 40 to 60% of the total facility
          electrical load, meaning the LV distribution must be designed with this in mind.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Chiller plant</strong> — the largest single electrical load in most data centres. Chillers, cooling towers, condenser water pumps, and dry coolers can account for 30–40% of total facility electrical power at design capacity.</span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>CRAC/CRAH units</strong> — in-room cooling units circulate chilled water or direct expansion refrigerant in the data hall. Power density: 50–150kW per CRAH unit. Large data halls have dozens of these units.</span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Building services</strong> — lighting, security, fire suppression systems, and HVAC for office and plant rooms complete the non-IT electrical load. These loads must be on the same generator-backed supply as the cooling system but are typically not UPS-backed.</span>
            </li>
          </ul>
        </div>
        <p>
          The electrical engineer must work closely with the mechanical engineer to understand the
          starting characteristics of large cooling plant motors (DOL, star-delta, or variable speed
          drives), which affect the sizing of distribution boards, cable ratings, and protection
          device settings. Variable speed drives (VSDs) on chiller compressors and pumps also
          introduce harmonic currents that must be considered in the electrical design.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in the Data Centre Sector',
    content: (
      <>
        <p>
          Data centre projects suit electricians with strong commercial and industrial backgrounds.
          Key skills in demand include: UPS and generator installation and commissioning; cable
          containment systems at scale; overhead busbar installation; LV switchboard assembly
          and termination; and systematic testing and commissioning in line with BS 7671.
        </p>
        <p>
          The certification requirements for data centre work are the same as for any commercial
          electrical project — a current ECS Gold card, C&G 2391 (Inspection and Testing), and
          ideally experience with large-scale LV distribution. Data centre projects tend to run
          for 12 to 36 months, providing stable long-term contract opportunities.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function DataCentreElectricalInstallationPage() {
  return (
    <GuideTemplate
      title="Data Centre Electrical Installation UK | Tier I–IV, UPS, BS EN 50600"
      description="Complete guide to data centre electrical installation for UK electricians and engineers. Uptime Institute Tier I–IV classification, UPS, generators, ATS, STS, BS EN 50600-2-2, PDU types, overhead busbar, and earthing design."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Specialist Guide"
      badgeIcon={Server}
      heroTitle={
        <>
          Data Centre Electrical Installation:{' '}
          <span className="text-yellow-400">Tier Classification, Critical Power, and BS EN 50600</span>
        </>
      }
      heroSubtitle="Data centre construction is booming in the UK. This guide covers Tier I–IV redundancy design, UPS and generator critical power systems, BS EN 50600 standards, PDU types, overhead busbar, and earthing design for electrical engineers."
      readingTime={18}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Data Centre Electrical Installation"
      relatedPages={relatedPages}
      ctaHeading="Certify Data Centre LV Installations on Your Phone"
      ctaSubheading="Elec-Mate's EIC certificate tools handle complex multi-board data centre installations. AI-assisted testing, instant PDF output. 7-day free trial."
    />
  );
}
