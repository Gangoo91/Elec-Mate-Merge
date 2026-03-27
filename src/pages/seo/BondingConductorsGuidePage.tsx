import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Settings,
  Info,
  ClipboardCheck,
  Home,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Wiring Guides', href: '/guides/bs-7671-18th-edition-guide' },
  { label: 'Bonding Conductors UK Guide', href: '/bonding-conductors-guide' },
];

const tocItems = [
  { id: 'what-is-bonding', label: 'What Is Bonding?' },
  { id: 'main-bonding', label: 'Main Protective Bonding' },
  { id: 'main-bonding-sizing', label: 'Main Bonding Conductor Sizing' },
  { id: 'supplementary-bonding', label: 'Supplementary Bonding in Bathrooms' },
  { id: 'supplementary-omission', label: 'When Supplementary Bonding Can Be Omitted' },
  { id: 'common-mistakes', label: 'Common Bonding Mistakes' },
  { id: 'bonding-clamps', label: 'Bonding Clamps and Connections' },
  { id: 'eicr-findings', label: 'Bonding Defects on EICRs' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Main protective bonding connects all metallic services entering the building (gas, water, oil pipes) to the main earthing terminal, ensuring they are all at the same potential and preventing dangerous voltage differences between them.',
  'BS 7671 18th Edition requires main bonding conductors to be of a minimum cross-sectional area based on the incoming neutral conductor size — typically 10mm² for most domestic supplies.',
  'Supplementary bonding in bathroom zones connects simultaneously accessible metallic parts (taps, pipework, radiators, baths, shower trays) to prevent dangerous potential differences within the bathroom.',
  'Supplementary bonding in a bathroom can be omitted if all circuits serving the bathroom are protected by a 30mA RCD — a common approach in new installations with all-RCBO consumer units.',
  'Missing or inadequate main bonding is one of the most common C2 observations on EICRs, particularly in older properties where gas or water services have been renewed without reconnecting bonding.',
  'Bonding conductors must be labelled with the safety label "Safety Electrical Connection — Do Not Remove" at each connection point.',
];

const faqs = [
  {
    question: 'What is the difference between earthing and bonding?',
    answer:
      'Earthing and bonding are related but distinct concepts. Earthing (or protective earthing) connects exposed metallic parts of electrical equipment — the parts that could become live if a fault occurs — back to the main earthing terminal and thence to the earth, so that fault currents operate protective devices. Bonding connects together metallic services and structural elements that are not part of the electrical installation (gas pipes, water pipes, structural steelwork) to ensure they are all at the same electrical potential, preventing dangerous voltage differences between them. Both are essential for electrical safety.',
  },
  {
    question: 'What services need to be bonded in a domestic property?',
    answer:
      'BS 7671 18th Edition requires main protective bonding to be applied to all metallic services entering the building, including: the incoming gas main (bonded as close as practicable to the meter), the incoming water main (bonded as close as practicable to the meter or entry point), and oil service pipes. Structural steelwork in contact with earth, and lightning protection systems, also require main bonding. Central heating systems fed from a bonded water main do not normally require separate bonding as they are already connected via the pipework, though this should be confirmed on a case-by-case basis.',
  },
  {
    question: 'What size bonding conductor do I need?',
    answer:
      'The minimum cross-sectional area (csa) of main bonding conductors is determined by reference to the cross-sectional area of the incoming neutral conductor (or the PEN conductor on PME supplies). BS 7671 18th Edition provides a table relating neutral conductor csa to the minimum main bonding conductor csa. For most domestic properties with a 100A single-phase supply (using 16mm² or 25mm² service cable), a 10mm² main bonding conductor is required. For larger supplies, the conductor must be proportionately larger. The absolute minimum is 6mm² regardless of supply size, and 25mm² is the maximum required. For supplementary bonding, the minimum is 2.5mm² if mechanically protected or 4mm² if not.',
  },
  {
    question: 'Is supplementary bonding required in bathrooms?',
    answer:
      'Supplementary bonding in bathrooms is required by BS 7671 18th Edition unless all circuits serving the bathroom are protected by a 30mA RCD. In practice, if the bathroom is served by an all-RCBO consumer unit or by circuits under a 30mA RCCB, supplementary bonding can be omitted. If any circuit serving the bathroom (lighting, socket in adjacent area, electric heating) is not RCD protected, supplementary bonding of all simultaneously accessible metallic parts within the bathroom is required. This assessment must be made on a circuit-by-circuit basis for the specific installation.',
  },
  {
    question: 'Can I remove a bonding conductor if I am replacing pipework with plastic?',
    answer:
      'If metallic pipework is replaced with plastic (uPVC, CPVC, or similar), the bonding conductor connected to that pipework may no longer serve its purpose, as there is nothing conductive to bond. However, you must ensure that any remaining metallic pipework downstream (including metallic fittings, taps, radiators, and baths) remains bonded. If the replacement creates a break in a previously bonded metallic circuit, the downstream metallic parts must be bonded separately. Do not simply disconnect bonding conductors from plastic pipework without checking the downstream metalwork.',
  },
  {
    question: 'What is the most common bonding defect found on EICRs?',
    answer:
      'The most common bonding defects found on EICRs are: (1) missing main bonding — often the gas bond or water bond was never installed, or has been removed during meter replacement or plumbing works; (2) undersized bonding conductors — older properties may have 6mm² bonding where 10mm² is now required; (3) bonding connected after an appliance (e.g. after the gas meter rather than before) which means the appliance itself is not bonded; (4) broken or corroded bonding clamps; and (5) missing safety labels on bonding conductors. All of these are typically C2 observations on an EICR, making the report Unsatisfactory.',
  },
  {
    question: 'Where exactly should the gas bonding conductor be connected?',
    answer:
      'The gas main bonding conductor should be connected to the gas installation pipework as close as practicable to the gas meter, and before the first appliance or fitting. It must be connected on the consumer\'s side of the meter (not to the gas provider\'s inlet pipe). The connection must be made using an approved bonding clamp that does not damage the pipe. The conductor then runs back to the main earthing terminal (MET) at the consumer unit. The connection point must be accessible and labelled with the safety electrical connection label.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/earthing-systems-guide',
    title: 'Earthing Systems Guide',
    description: 'TN-S, TN-C-S and TT earthing systems explained with practical examples.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/rcd-types-guide',
    title: 'RCD Types UK Guide',
    description: 'RCCB, RCBO, SRCD and RCDM explained with BS 7671 requirements.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes',
    description: 'C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Landlord EICR requirements, compliance deadlines, and common defects.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-bonding',
    heading: 'What Is Bonding and Why Is It Required?',
    content: (
      <>
        <p>
          Protective bonding connects metallic parts of services (gas, water, oil pipes) and
          structural elements to a common reference point — the main earthing terminal — to ensure
          they are all at the same electrical potential. Without bonding, a fault in the electrical
          installation could cause a dangerous voltage difference to appear between, for example,
          a metal bath (connected to water pipes) and a metal radiator (connected to gas pipework),
          creating a risk of electric shock to anyone touching both simultaneously.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Equipotential zone</strong> — bonding creates an equipotential zone within
                the building, where all metallic parts accessible to occupants are at the same
                potential. Even if that potential is raised above true earth during a fault, the
                absence of a potential difference between simultaneously accessible parts prevents
                current flowing through a person.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two types of bonding</strong> — BS 7671 18th Edition distinguishes between
                main protective bonding (connecting services entering the building to the main
                earthing terminal) and supplementary bonding (connecting simultaneously accessible
                metallic parts within specific locations such as bathrooms). Both serve the same
                fundamental purpose but apply in different contexts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory, not optional</strong> — bonding requirements in BS 7671 18th
                Edition are prescriptive requirements, not recommendations. Missing bonding is
                consistently recorded as a C2 (potentially dangerous) or C1 (danger present)
                observation on EICRs, depending on the specific circumstances.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'main-bonding',
    heading: 'Main Protective Bonding',
    content: (
      <>
        <p>
          Main protective bonding conductors connect all metallic services entering the building —
          gas, water, and oil pipes — to the main earthing terminal (MET) at the consumer unit.
          The bonding connection must be made as close as practicable to the point where the service
          enters the building, before any branch or appliance connection.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Gas service</strong> — bond to the gas installation pipework as close as
                practicable to the gas meter, on the consumer's side of the meter. The bonding
                must be before the first fitting or appliance. Where plastic gas pipes are used
                for the incoming service, bond to the first metallic fitting inside the building.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Water service</strong> — bond to the incoming water main as close as
                practicable to the water meter or the point of entry into the building. If the
                incoming service is in plastic, bond to the first metallic section of the internal
                pipework. Ensure the bond is before any branch to individual rooms or appliances.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Oil service</strong> — bond to the oil supply pipework entering the
                building, as close as practicable to the entry point or the oil storage tank
                supply connection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Route to MET</strong> — main bonding conductors run directly from each
                service connection to the main earthing terminal at the consumer unit. They should
                be installed in a way that minimises damage risk and is accessible for inspection
                and testing. Where the run crosses walls or passes through hazardous locations,
                mechanical protection should be provided.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'main-bonding-sizing',
    heading: 'Main Bonding Conductor Sizing',
    content: (
      <>
        <p>
          The minimum cross-sectional area (csa) of main protective bonding conductors is specified
          in BS 7671 18th Edition Table 54.5 by reference to the csa of the incoming neutral (or
          PEN) conductor — the bonding conductor must be at least half the csa of the line
          conductor, subject to a minimum of 6mm² and a maximum of 25mm². In practice, for most
          domestic properties with a 60A to 100A main fuse (typically served by a 16mm² or 25mm²
          service cable), <strong>10mm² is the standard main bonding conductor size</strong>. The
          6mm² minimum is the absolute minimum only and applies to installations with a smaller
          supply cable — where in doubt, 10mm² should always be used.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Typical domestic supply (up to 100A)</strong> — a standard 100A
                single-phase domestic supply uses a service cable with a 16mm² or 25mm² neutral.
                BS 7671 18th Edition requires a minimum 10mm² main bonding conductor for these
                supplies. This is the most common bonding conductor size for domestic properties
                in the UK.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smaller supplies and the 6mm² minimum</strong> — 6mm² is the absolute
                minimum main bonding conductor size under BS 7671, regardless of supply size. It
                applies only to installations with a very small supply cable (below approximately
                10mm² neutral). For the overwhelming majority of UK domestic properties — where the
                supply neutral is 16mm² or 25mm² — 10mm² is correct and 6mm² would be undersized.
                Never specify 6mm² on a standard domestic supply: it will typically be flagged C2
                on the next EICR.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maximum requirement</strong> — the maximum required csa for main bonding
                conductors is 25mm², regardless of the supply neutral size. This prevents
                impractically large conductors being specified for large industrial supplies.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Older installations with 6mm²</strong> — many older properties have 6mm²
                main bonding conductors installed when a smaller supply rating was standard. If the
                supply has since been uprated (e.g. from a 60A to a 100A fuse), the bonding
                conductor may now be undersized. This is commonly observed as a C2 during EICRs.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'supplementary-bonding',
    heading: 'Supplementary Bonding in Bathrooms',
    content: (
      <>
        <p>
          Supplementary protective bonding is required in bathrooms and other specified locations
          to connect all simultaneously accessible metallic parts within the location, ensuring
          no dangerous potential differences exist between them. Bathrooms are the most common
          location requiring supplementary bonding in domestic installations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>What must be bonded</strong> — in a bathroom, supplementary bonding
                connects: metal baths and shower trays, exposed metallic taps and pipework,
                metal radiators and heated towel rails, and the earth terminals of all fixed
                electrical equipment within the bathroom (electric shower, extractor fan, shaver
                socket, towel rail). All parts that a person could simultaneously touch must be
                bonded together.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conductor sizing</strong> — supplementary bonding conductors must be a
                minimum of 2.5mm² if mechanically protected (e.g. in conduit or under plaster)
                or 4mm² if not mechanically protected. This is smaller than the main bonding
                conductor requirement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zones</strong> — BS 7671 18th Edition defines zones within bathrooms
                (Zone 0, 1, 2, and outside zones) based on proximity to the water source. The
                zone designation affects what electrical equipment can be installed, but
                supplementary bonding applies to all metallic parts accessible within and
                near the bathroom regardless of zone.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'supplementary-omission',
    heading: 'When Supplementary Bonding Can Be Omitted',
    content: (
      <>
        <p>
          BS 7671 18th Edition allows supplementary bonding to be omitted in bathrooms provided
          that all circuits serving the bathroom are protected by a 30mA RCD. This provision
          reflects the understanding that rapid RCD disconnection limits the duration of any
          dangerous potential difference to a level that is unlikely to cause harm.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>All circuits must be RCD protected</strong> — the omission of
                supplementary bonding is only permitted if every circuit that could affect the
                bathroom is RCD protected. This includes not just the bathroom lighting and
                electric shower circuits, but also circuits in adjacent rooms that supply
                pipework or metal parts accessible from the bathroom.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Practical implication</strong> — in a new installation with an all-RCBO
                consumer unit, all circuits are individually RCD protected, so supplementary
                bonding in the bathroom can be omitted. In an older installation with some circuits
                not RCD protected, supplementary bonding in the bathroom is required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Assessment responsibility</strong> — the electrician must assess and
                document whether the RCD protection condition is met for the specific bathroom.
                Simply assuming that supplementary bonding is not required without checking all
                circuits is not acceptable — if the assessment is wrong, the installation may be
                unsafe.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main bonding still required</strong> — the omission of supplementary
                bonding does not affect the requirement for main protective bonding of incoming
                services (gas, water). Main bonding is always required regardless of RCD protection.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Bonding Mistakes',
    content: (
      <>
        <p>
          Bonding errors are among the most frequently observed defects on EICRs. Understanding
          the common mistakes helps electricians avoid them in new work and identify them correctly
          during inspections.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bonding after the meter</strong> — connecting the gas or water bond
                downstream of the meter means the meter body itself is not bonded. The bond must
                be applied to the consumer's pipework, typically just after the meter on the
                consumer's side.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bonding to the wrong point</strong> — bonding the gas pipe to an
                earthing conductor in a socket circuit rather than to the main earthing terminal
                directly is incorrect. All main bonding conductors must run back to the MET at
                the consumer unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Broken continuity due to plastic inserts</strong> — plastic isolating
                sections in gas or water pipework (installed to prevent galvanic corrosion) break
                the metallic continuity of the pipe. Bonding must be applied to each section of
                metallic pipework separated by such inserts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Missing safety labels</strong> — BS 7671 requires bonding conductors to
                be labelled at each connection point with the safety label "Safety Electrical
                Connection — Do Not Remove". Missing labels are a commonly observed FI (Further
                Investigation) item on EICRs and a C3 observation in many cases.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Poor bonding clamp contact</strong> — bonding clamps that are incorrectly
                sized for the pipe diameter, poorly tightened, or applied over paint or corrosion
                may not make reliable electrical contact. The bonding continuity test will reveal
                high resistance at a defective clamp.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'bonding-clamps',
    heading: 'Bonding Clamps and Connection Requirements',
    content: (
      <>
        <p>
          The quality and type of the bonding clamp is critical to reliable bonding. A poor
          connection creates high resistance in the bonding path, which defeats the purpose of
          the bonding installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Approved clamp types</strong> — bonding clamps for gas and water pipes
                must be approved BS 951 pattern clamps. They must be sized to suit the pipe
                diameter and must not damage the pipe. The clamp must make direct metal-to-metal
                contact with the pipe surface.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Surface preparation</strong> — paint, lacquer, or corrosion on the pipe
                surface at the clamp contact point must be removed before fitting the clamp.
                A poor surface contact is one of the most common reasons for high-resistance
                bonding connections found during EICR testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Gas safety</strong> — when fitting a bonding clamp to a gas pipe,
                ensure the work is carried out by a Gas Safe registered engineer or by an
                electrician working on the electrical bonding only (not the gas pipework itself).
                The clamp must not damage the pipe or its protective coating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Safety labelling</strong> — fit the "Safety Electrical Connection — Do
                Not Remove" label to the bonding clamp and conductor at each connection point.
                This is a BS 7671 requirement and also alerts future workers (including gas fitters
                and plumbers) not to disconnect the bonding without understanding the implications.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eicr-findings',
    heading: 'Bonding Defects on EICRs — Observation Codes',
    content: (
      <>
        <p>
          Bonding defects are among the most commonly observed items on{' '}
          <SEOInternalLink href="/tools/eicr-certificate">EICRs</SEOInternalLink> for older
          domestic properties. Understanding how to classify bonding defects correctly ensures
          accurate and consistent reporting.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>C2 — Missing main bonding</strong> — absent gas or water bonding
                conductors are typically C2 (potentially dangerous) as they leave metallic
                services at an indeterminate potential relative to the installation's earth.
                Under certain fault conditions, this could produce a dangerous touch voltage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>C2 — Undersized bonding conductors</strong> — bonding conductors below
                the minimum csa required by BS 7671 for the supply size are typically C2. The
                undersized conductor may not be capable of carrying the fault current required
                to operate the protective device within the disconnection time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C3 — Missing safety labels</strong> — absent bonding conductor labels
                are typically C3 (improvement recommended) as the lack of labels does not
                immediately create an electrical hazard but could lead to the bonding being
                disconnected inadvertently by uninformed workers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>FI — High continuity resistance</strong> — where the bonding conductor
                and clamp appear to be present but the continuity resistance measurement is high
                (above approximately 0.05 ohms), this should be recorded as FI (Further
                Investigation) or C2 depending on the resistance value and circumstances.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Testing and Certification of Bonding',
    content: (
      <>
        <p>
          Bonding continuity must be tested and recorded during both new installation commissioning
          and EICR inspections. The test verifies that a low-resistance path exists between
          bonded parts and the main earthing terminal.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Record Bonding Results on Certificate</h4>
                <p className="text-white text-sm leading-relaxed">
                  Main bonding continuity resistance values must be recorded on the Schedule of
                  Test Results on the EIC or EICR. Typical acceptable values are below 0.05 ohms
                  for a well-installed bonding conductor. Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to record bonding test results on site and generate a compliant PDF instantly.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Settings className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">New Installation Bonding</h4>
                <p className="text-white text-sm leading-relaxed">
                  When installing a new consumer unit, always check for and install main bonding
                  conductors to all incoming metallic services. Quote for bonding as a standard
                  item of every consumer unit replacement — the small additional cost prevents
                  a C2 observation on the next EICR and ensures the installation is safe from
                  day one.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Record bonding tests and complete EICRs on your phone"
          description="Join 430+ UK electricians using Elec-Mate for on-site EICR completion with bonding test recording, AI board scanning, and instant PDF export. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function BondingConductorsGuidePage() {
  return (
    <GuideTemplate
      title="Bonding Conductors UK Guide | Main & Supplementary Bonding"
      description="Complete guide to bonding conductors in UK electrical installations. Main protective bonding of gas, water and oil services, supplementary bonding in bathrooms, conductor sizing, when bonding can be omitted, and common EICR bonding defects."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Wiring Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Bonding Conductors UK Guide:{' '}
          <span className="text-yellow-400">Main and Supplementary Bonding Explained</span>
        </>
      }
      heroSubtitle="A complete practical guide to protective bonding conductors in UK electrical installations — main bonding of gas, water and oil services, supplementary bonding in bathrooms, conductor sizing, when bonding can be omitted with RCD protection, and common bonding defects found on EICRs."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Bonding Conductors"
      relatedPages={relatedPages}
      ctaHeading="Complete Bonding Tests and EICRs on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site EICR completion with bonding continuity recording, AI board scanning, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
