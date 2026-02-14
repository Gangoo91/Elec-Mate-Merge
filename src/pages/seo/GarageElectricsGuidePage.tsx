import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Building,
  Cable,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Calculator,
  Zap,
  Wrench,
  Car,
  Droplets,
  GraduationCap,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Garage Electrics', href: '/guides/garage-electrics' },
];

const tocItems = [
  { id: 'overview', label: 'Garage Electrics Overview' },
  { id: 'swa-cable-supply', label: 'SWA Cable from the House' },
  { id: 'sub-distribution-board', label: 'Sub-Distribution Board' },
  { id: 'ip-ratings', label: 'IP Ratings for Garage Accessories' },
  { id: 'rcd-protection', label: 'RCD Protection Requirements' },
  { id: 'sockets-lighting', label: 'Sockets, Lighting and Power' },
  { id: 'ev-charger-prep', label: 'EV Charger Preparation' },
  { id: 'testing-certification', label: 'Testing and Certification' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A detached or integral garage with a new circuit supply from the house is notifiable work under Part P of the Building Regulations and requires certification.',
  'Steel Wire Armoured (SWA) cable is the standard choice for underground supplies to a detached garage, buried at a minimum depth of 500mm (or 600mm under a driveway) with warning tape above.',
  'All socket outlets and lighting circuits in a garage must be protected by a 30mA RCD, and accessories must have an appropriate IP rating for the environment.',
  'A sub-distribution board in the garage simplifies circuit protection and allows for future additions such as EV charger circuits, workshop machinery, or additional lighting.',
  'Elec-Mate cable sizing calculator accounts for SWA cable derating, burial conditions, and voltage drop over the full cable run from the main consumer unit to the garage board.',
];

const faqs = [
  {
    question: 'Do I need Part P notification for garage electrics?',
    answer:
      'Yes, if you are adding a new circuit to supply the garage. Under Approved Document P, new circuits are notifiable work. If the garage already has a supply and you are simply replacing a light fitting or socket on the existing circuit, that is non-notifiable maintenance. However, adding a new radial circuit, installing a sub-distribution board, or running an SWA cable to a detached garage all count as notifiable work. The simplest route to compliance is to use an electrician registered with a competent person scheme (NICEIC, NAPIT, ELECSA) who will self-certify and notify building control. If the electrician is not registered, a building control application must be made before work begins, which involves a separate fee and inspection schedule.',
  },
  {
    question: 'What size SWA cable do I need for a garage?',
    answer:
      'The SWA cable size depends on the total load you plan to supply, the length of the cable run, and the voltage drop. For a typical domestic garage with a few sockets, lighting, and possibly a small workshop tool, a 4.0mm 3-core SWA cable is often sufficient. If you are planning to install an EV charger (which can draw 7.4kW on a 32A circuit) or heavy workshop machinery, you may need 6.0mm or even 10.0mm SWA. The cable must be sized to keep the voltage drop within BS 7671 limits (3% for lighting, 5% for other circuits) over the full length of the run. Use the Elec-Mate cable sizing calculator to determine the correct size — enter the load, cable length, installation method, and the calculator applies all relevant correction factors including burial depth derating.',
  },
  {
    question: 'How deep should the SWA cable be buried?',
    answer:
      'BS 7671 and the IET On-Site Guide recommend a minimum burial depth of 500mm in a garden or open ground. Under a driveway, path, or any area subject to vehicle traffic, the minimum depth increases to 600mm. The cable should be laid on a bed of fine sand or sifted soil (not sharp stones or rubble), covered with a further layer of sand, and then a cable warning tape should be laid above the cable at approximately half the depth of the trench. The trench route should be recorded on a drawing so that future work in the garden does not accidentally damage the cable. If the cable route crosses a boundary or public footpath, additional protection such as a duct may be required — check with the local authority.',
  },
  {
    question: 'What IP rating do I need for garage sockets and switches?',
    answer:
      'The minimum IP rating depends on the conditions inside the garage. For a dry, enclosed integral garage with a concrete floor, standard domestic accessories (IP20) may be acceptable. For a detached garage that is not heated, may experience condensation, or has an up-and-over door that allows rain ingress, IP44 or IP55 rated accessories are recommended. If the garage is used as a workshop with water, oil, or dust present, IP55 or higher is appropriate. BS 7671 does not specify a blanket IP rating for garages — the electrician must assess the external influences (AD classification in BS 7671 Appendix 5) and select accessories accordingly. In practice, using IP55 weatherproof accessories in a detached garage is good practice and avoids any ambiguity.',
  },
  {
    question: 'Can I install an EV charger in my garage?',
    answer:
      'Yes, a garage is one of the most common locations for a domestic EV charger. The charger typically requires a dedicated circuit (usually 32A for a 7.4kW unit) from the consumer unit or garage sub-distribution board. The cable must be appropriately sized for the load and cable run length. Under BS 7671:2018+A3:2024, the EV charger circuit must be RCD-protected (30mA Type A minimum, or Type B if the charger manufacturer requires it). The charger unit itself must be installed by a qualified electrician and comply with BS 7671 and the IET Code of Practice for Electric Vehicle Charging Equipment Installation. If the charger is installed outside the garage (on the external wall), it must be at least IP65 rated. Planning the cable route and spare way in the sub-distribution board during the initial garage electrical installation avoids costly retrofitting later.',
  },
  {
    question: 'Does a garage need its own earth rod?',
    answer:
      'Not necessarily. If the garage is supplied by an SWA cable from the house, the SWA armour provides an earth path back to the main earthing terminal, and the garage sub-board earth is connected via the SWA armour and a separate CPC (circuit protective conductor) within the SWA cable. This is the standard arrangement. A separate earth rod at the garage is only required if the earthing arrangement demands it — for example, in TT earthing systems where the main earth is provided by an earth rod, or where the garage supply is a separate installation with its own meter. If the property has a TN-S or TN-C-S earthing system and the SWA cable is correctly installed, no additional earth rod is needed at the garage. The SWA armour must be correctly terminated and bonded at both ends using proper SWA glands.',
  },
  {
    question: 'How much does it cost to wire a garage?',
    answer:
      'The cost varies based on the distance from the house, the number of circuits, and the scope of work. As a rough guide: running a 10-metre SWA cable from the house to a detached garage, installing a small consumer unit with 2 to 4 ways, fitting 2 to 3 double sockets, 2 light points, and an external security light typically costs between £800 and £1,500 including materials and labour. If an EV charger circuit is included, add £200 to £400 for the additional cable and circuit (the charger unit itself is separate). A longer cable run (20 to 30 metres), trenching through a patio or driveway, or a larger sub-board with more circuits will increase the price. Get a detailed quote that breaks down materials, labour, trenching, and certification costs separately.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size SWA cables for garage supplies with burial depth derating, voltage drop checks, and grouping factors.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description:
      'Check voltage drop on long SWA cable runs from the consumer unit to the garage sub-board.',
    icon: Zap,
    category: 'Tool',
  },
  {
    href: '/guides/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description:
      'Complete guide to Part P notification for domestic electrical work including outbuilding supplies.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete digital Electrical Installation Certificates on your phone for garage installations.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'Full guide to domestic EV charger installation including BS 7671 requirements and IET Code of Practice.',
    icon: Car,
    category: 'Guide',
  },
  {
    href: '/guides/earthing-arrangements',
    title: 'Earthing Arrangements',
    description:
      'TN-S, TN-C-S, and TT earthing systems explained with implications for outbuilding supplies.',
    icon: GraduationCap,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Garage Electrics: Planning the Installation',
    content: (
      <>
        <p>
          Whether it is a detached garage used as a workshop, an integral garage converted to a
          utility space, or a double garage with an EV charger, the electrical installation must be
          designed, installed, and certified to comply with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          and notified under{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Part P of the Building Regulations
          </SEOInternalLink>
          .
        </p>
        <p>
          A garage electrical installation typically involves supplying power from the house via an
          underground SWA (Steel Wire Armoured) cable, installing a sub-distribution board in the
          garage, and wiring individual circuits for sockets, lighting, and any specialist
          equipment. The environment inside a garage — unheated, potentially damp, subject to dust
          and mechanical damage — places specific requirements on the IP ratings of accessories and
          the cable installation methods used.
        </p>
        <p>
          This guide covers everything from SWA cable selection and burial depth through to EV
          charger preparation and the certification requirements on completion.
        </p>
      </>
    ),
  },
  {
    id: 'swa-cable-supply',
    heading: 'SWA Cable Supply from the House',
    content: (
      <>
        <p>
          The standard method of supplying a detached garage is an SWA (Steel Wire Armoured) cable
          run underground from the house consumer unit to a sub-distribution board in the garage.
          SWA cable is designed for direct burial — the steel wire armour provides mechanical
          protection and also serves as the circuit protective conductor (CPC) for the earth path.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable selection</strong> — 3-core SWA (line, neutral, earth) or 2-core SWA
                (line and neutral, using the armour as the earth). 3-core is preferred as it
                provides a dedicated CPC in addition to the armour. Common sizes are 4.0mm, 6.0mm,
                and 10.0mm depending on the load and cable run length.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Burial depth</strong> — minimum 500mm in a garden or open ground, 600mm
                under a driveway or path. The cable must be laid on a bed of fine sand (minimum
                50mm), covered with sand, and cable warning tape placed at approximately half trench
                depth above the cable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SWA glands</strong> — the cable must be properly terminated at both ends
                using SWA glands (indoor type at the house board, outdoor type or IP-rated at the
                garage board). The armour must be bonded to earth at both ends via the gland.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Route protection</strong> — where the cable enters or exits the ground
                (risers), it should be protected by a short length of galvanised steel conduit or a
                protective duct to prevent mechanical damage from lawnmowers, spades, or foot
                traffic.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The <SEOInternalLink href="/tools/cable-sizing-calculator">cable sizing</SEOInternalLink>{' '}
          must account for the installation method (direct burial), the soil thermal resistivity,
          and the voltage drop over the full cable run. For a typical 10 to 15 metre run supplying a
          light workshop load, 4.0mm 3-core SWA is usually sufficient. For runs exceeding 20 metres
          or loads including an EV charger, upsize to 6.0mm or 10.0mm.
        </p>
      </>
    ),
  },
  {
    id: 'sub-distribution-board',
    heading: 'Sub-Distribution Board in the Garage',
    content: (
      <>
        <p>
          A sub-distribution board (often called a garage consumer unit) is installed in the garage
          to distribute power to the individual circuits. This is preferable to running individual
          cables from the main house board for several reasons:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local isolation</strong> — all garage circuits can be isolated at the garage
                board without affecting the house supply. This is essential for safe maintenance and
                troubleshooting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection</strong> — a split-load board or RCBO-equipped board provides
                individual RCD protection for each circuit without nuisance tripping affecting the
                whole garage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Future expansion</strong> — install a board with spare ways for future
                additions such as an EV charger circuit, additional sockets for a workshop, or
                external lighting. A 6-way or 8-way board is a sensible minimum even if you only
                need 2 or 3 circuits initially.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The sub-distribution board should be a metal enclosure (as required by Amendment 3 of BS
          7671 for domestic premises). It should be mounted at a height that is accessible but
          protected from accidental damage — typically 1.2m to 1.8m above floor level. The incoming
          SWA cable should enter via a properly fitted SWA gland, and the board should include a
          main switch or isolator for the incoming supply.
        </p>
        <p>
          The main switch in the garage board acts as the means of isolation for the garage
          installation. It must be readily accessible and clearly labelled. If the garage is used by
          multiple people (for example, a shared workshop), consider a lockable isolator for
          additional safety.
        </p>
      </>
    ),
  },
  {
    id: 'ip-ratings',
    heading: 'IP Ratings for Garage Accessories',
    content: (
      <>
        <p>
          The IP (Ingress Protection) rating of electrical accessories must match the environmental
          conditions in the garage. BS 7671 requires the electrician to assess the external
          influences at the installation location and select accessories with the appropriate
          protection.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dry integral garage (enclosed, heated)</strong> — standard domestic
                accessories (IP20) are acceptable. This is the same specification as indoor rooms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unheated detached garage (possible condensation)</strong> — IP44 or IP55
                rated accessories recommended. Weatherproof socket enclosures with spring-loaded
                lids protect against moisture ingress.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Workshop with dust or water</strong> — IP55 or IP65 rated accessories.
                Dust-tight and splash-proof enclosures prevent contamination of contacts and reduce
                fire risk from dust accumulation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>External accessories (outside the garage)</strong> — IP65 or IP66 rated.
                External sockets, PIR security lights, and EV charger isolators must be fully
                weatherproof.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Lighting in a garage should be robust and appropriately rated. LED batten lights with IP65
          rating are a popular choice — they provide excellent illumination, are resistant to
          moisture and dust, and are energy-efficient. For a workshop area, consider higher lumen
          output fittings positioned to minimise shadows on the workbench.
        </p>
      </>
    ),
  },
  {
    id: 'rcd-protection',
    heading: 'RCD Protection Requirements',
    content: (
      <>
        <p>
          All socket outlets rated up to 32A and all lighting circuits in a garage must be protected
          by a 30mA RCD in accordance with BS 7671 Regulation 411.3.4. This requirement applies
          regardless of whether the garage is integral or detached.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>30mA sensitivity</strong> — the RCD must have a rated residual operating
                current of 30mA or less for additional protection against electric shock. This is
                particularly important in a garage environment where tools, extension leads, and
                damp conditions increase the risk of earth faults.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type A or Type AC</strong> — for standard circuits, a Type AC RCD is
                acceptable. If the circuits supply equipment with electronic controls (such as an EV
                charger, inverter, or variable speed drive), a Type A RCD is required as a minimum.
                Some EV charger manufacturers specify a Type B RCD — check the charger installation
                manual.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Discrimination</strong> — if the garage sub-board is supplied from an
                RCD-protected circuit at the main house board, time-delayed (Type S) RCDs should be
                used at the main board to provide discrimination. This prevents a fault in the
                garage from tripping the house RCD and losing power to the entire property.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Using RCBOs (combined MCB and RCD in one device) in the garage sub-board is the best
          practice approach. Each circuit gets its own RCD protection, so a fault on one circuit
          does not trip the protection on another. This avoids the common complaint of "the garage
          RCD keeps tripping and I lose all power."
        </p>
      </>
    ),
  },
  {
    id: 'sockets-lighting',
    heading: 'Sockets, Lighting, and Power Circuits',
    content: (
      <>
        <p>
          The number and position of sockets and lights depends on how the garage will be used. A
          basic single garage used for car parking and light storage needs fewer outlets than a
          double garage workshop. Plan the layout with the homeowner before installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket outlets</strong> — minimum 2 double sockets for a basic garage. For a
                workshop, 4 to 6 double sockets distributed around the workbench and machinery
                positions. Mount sockets at bench height (approximately 1.0m to 1.2m above floor
                level) in workshop areas. Consider a dedicated 16A or 32A commando socket for heavy
                power tools.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lighting</strong> — LED batten lights are the standard choice for garages.
                One or two 5-foot battens provide good general illumination for a single garage. For
                a workshop, add task lighting over the workbench. Include a switch at the entrance
                door — a PIR-activated switch is a practical addition so the lights come on
                automatically when you enter.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>External lighting</strong> — a PIR security light above the garage door is a
                common addition. This should be on a separate circuit or switched independently from
                the internal lighting. Use an IP65 rated fitting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Freezer or fridge circuit</strong> — many homeowners keep a freezer in the
                garage. This should ideally be on a dedicated circuit or at minimum on a circuit
                that is not shared with workshop tools (to avoid nuisance tripping from a power tool
                fault cutting power to the freezer).
              </span>
            </li>
          </ul>
        </div>
        <p>
          Cable routing in a garage is typically surface-mounted in PVC mini-trunking or conduit,
          clipped directly to the wall surface, or run in the roof void above the ceiling. Surface
          mounting is practical and allows easy future modification. Ensure cables are routed in
          safe zones (horizontal and vertical from accessories) or protected by RCD where they are
          not in safe zones.
        </p>
      </>
    ),
  },
  {
    id: 'ev-charger-prep',
    heading: 'EV Charger Preparation',
    content: (
      <>
        <p>
          Even if the homeowner does not currently own an electric vehicle, preparing the garage
          electrical installation for a future EV charger is sensible and adds value to the
          property. The cost of adding a spare way and running a cable during the initial
          installation is minimal compared to retrofitting later.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Spare way in the sub-board</strong> — install a sub-distribution board with
                at least one spare way for a future 32A EV charger circuit. A 6-way or 8-way board
                provides adequate capacity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable route</strong> — run a 6.0mm twin-and-earth or SWA cable from the
                spare way to the proposed charger location (typically on the garage wall adjacent to
                the parking space). Leave the cable coiled and capped at the charger location for
                future connection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SWA sizing</strong> — if the garage is fed by SWA from the house, ensure the
                SWA cable is sized to carry the additional EV charger load (typically 32A / 7.4kW).
                This means the total maximum demand of all garage circuits plus the EV charger must
                be within the SWA cable capacity.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For full details on EV charger installation requirements, see the{' '}
          <SEOInternalLink href="/guides/ev-charger-installation">
            EV Charger Installation Guide
          </SEOInternalLink>
          . The key point for garage installations is to plan the capacity and cable routes at the
          design stage, not as an afterthought.
        </p>
        <SEOAppBridge
          title="Size the SWA cable for the full garage load"
          description="Elec-Mate's cable sizing calculator handles SWA derating for direct burial, voltage drop on long runs, and maximum demand calculations including future EV charger load. Get the right cable size first time."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'testing-certification',
    heading: 'Testing and Certification',
    content: (
      <>
        <p>
          All new garage electrical work must be tested in accordance with BS 7671 Chapter 6
          (Initial Verification) and certified with an Electrical Installation Certificate (EIC).
          The tests are the same as for any new domestic circuit:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Continuity of protective conductors (including SWA armour continuity)</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Insulation resistance (minimum 1 megohm at 500V DC)</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Polarity at every point</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Earth fault loop impedance (Zs) — note the additional impedance from the SWA cable
                run
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Prospective fault current (PSCC) at the garage sub-board</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>RCD operation — rated current and 5 times rated current trip times</span>
            </li>
          </ul>
        </div>
        <p>
          The{' '}
          <SEOInternalLink href="/tools/eic-certificate">
            Electrical Installation Certificate
          </SEOInternalLink>{' '}
          must cover all new circuits including the SWA cable supply. If you are registered with a
          competent person scheme, the EIC is used to self-certify the work and notify building
          control. The homeowner should receive a copy of the EIC and the schedule of test results
          for their records.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Quoting and Delivering Garage Work',
    content: (
      <>
        <p>
          Garage electrical installations are bread-and-butter work for domestic electricians. They
          are relatively straightforward, have good margins (particularly on the SWA cable and
          trenching), and often lead to follow-on work such as EV charger installation, workshop
          fit-outs, or additional outbuilding supplies.
        </p>
        <p>
          The key to profitability is accurate quoting on the first visit and efficient on-site
          delivery. Here is how Elec-Mate helps:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing Calculator</h4>
                <p className="text-white text-sm leading-relaxed">
                  Size the SWA cable on site during the survey.{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    Enter the load, cable length, and installation method
                  </SEOInternalLink>{' '}
                  — the calculator applies burial depth derating, soil thermal resistivity, and
                  voltage drop checks automatically. Know exactly what cable to order before you
                  leave.
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
                  Price the garage installation with Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . SWA cable by the metre, trenching labour, sub-board, accessories, testing, and
                  certification — all calculated with your margins and sent to the customer as a
                  professional PDF quote.
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
                  Complete the Electrical Installation Certificate on site. AI board scanning reads
                  the new garage sub-board, voice test entry fills in the schedule of test results
                  while you test. Export as PDF and send to the homeowner before you pack up.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote, wire, and certify garage electrics in one workflow"
          description="Join 430+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site EIC certification. Everything you need for garage installations. 7-day free trial."
          icon={Building}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function GarageElectricsGuidePage() {
  return (
    <GuideTemplate
      title="Garage Electrics | Wiring, Sockets & Lighting Guide"
      description="Complete guide to garage electrics in the UK. SWA cable from house, sub-distribution board, IP ratings, RCD protection, sockets and lighting, EV charger preparation, and EIC certification requirements."
      datePublished="2025-07-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Building}
      heroTitle={
        <>
          Garage Electrics:{' '}
          <span className="text-yellow-400">Wiring, Sockets, and Lighting Guide</span>
        </>
      }
      heroSubtitle="From SWA cable selection and burial depth to sub-distribution boards, IP ratings, and EV charger preparation. This guide covers the full scope of garage electrical installations for UK electricians and homeowners."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Garage Electrics"
      relatedPages={relatedPages}
      ctaHeading="Size SWA Cables and Certify Garage Installations on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for cable sizing with burial depth derating, professional quoting, and on-site EIC certificates. 7-day free trial, cancel anytime."
    />
  );
}
