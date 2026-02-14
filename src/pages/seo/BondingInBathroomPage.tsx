import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Droplet,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Cable,
  GraduationCap,
  ClipboardCheck,
  Calculator,
  Gauge,
  CheckCircle,
  Zap,
  Search,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Bathroom Bonding', href: '/guides/bonding-in-bathroom' },
];

const tocItems = [
  { id: 'what-is-bonding', label: 'What Is Bonding?' },
  { id: 'main-vs-supplementary', label: 'Main vs Supplementary Bonding' },
  { id: 'when-required', label: 'When Is Bonding Required?' },
  { id: 'when-omitted', label: 'When Can It Be Omitted?' },
  { id: 'conductor-size', label: '4mm Conductor Requirements' },
  { id: 'what-to-bond', label: 'What to Bond in a Bathroom' },
  { id: 'testing-bonding', label: 'Testing Bonding Connections' },
  { id: 'for-electricians', label: 'For Electricians: Bonding on EICRs' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Supplementary bonding in bathrooms connects all simultaneously accessible extraneous-conductive-parts and exposed-conductive-parts to equalise potential and reduce electric shock risk.',
  'Under BS 7671 Regulation 701.415.2, supplementary bonding can be omitted if the bathroom circuits are RCD-protected at 30mA AND all circuits meet the disconnection time requirements AND main protective bonding is in place.',
  'Where supplementary bonding is required, the conductor must be at least 4mm2 copper (or 2.5mm2 if mechanically protected in conduit or trunking).',
  'Typical items to bond include metal pipework (water, gas, central heating), metal baths, metal waste pipes, and any other extraneous-conductive-parts accessible from within the bathroom zones.',
  'Elec-Mate AI tools help electricians decide whether supplementary bonding can be omitted, and the EICR certificate records the bonding status with correct observation codes.',
];

const faqs = [
  {
    question: 'What is supplementary bonding in a bathroom?',
    answer:
      'Supplementary bonding is an additional equipotential bonding connection that links all extraneous-conductive-parts (metalwork that is not part of the electrical installation but can introduce earth potential, such as metal water pipes, radiator pipes, and metal baths) and exposed-conductive-parts (metalwork that is part of the electrical installation, such as an earthed light fitting or shower unit) within the bathroom. The purpose is to equalise the electrical potential between all accessible metalwork, so that if a fault occurs, the voltage difference between any two pieces of metalwork that a person could simultaneously touch is reduced to a safe level. This is particularly important in bathrooms because the human body resistance is lower when wet, increasing the risk of electric shock from even relatively low voltages.',
  },
  {
    question: 'Is supplementary bonding still required in bathrooms?',
    answer:
      'Not always. BS 7671:2018+A3:2024 Regulation 701.415.2 states that supplementary bonding can be omitted in a bathroom if ALL of the following conditions are met: (1) All circuits serving the bathroom are protected by a 30mA RCD; (2) All circuits meet the maximum disconnection times specified in Regulation 411.3.2 (0.4 seconds for 230V circuits); (3) Main protective bonding is in place to the incoming gas, water, and oil supply pipes in accordance with Regulation 411.3.1.2. If any of these conditions cannot be confirmed, supplementary bonding is still required. In practice, most modern domestic installations with a compliant consumer unit and main bonding in place can omit supplementary bonding — but the electrician must verify all three conditions during the inspection.',
  },
  {
    question: 'What size conductor is used for bathroom bonding?',
    answer:
      'Supplementary bonding conductors in bathrooms must be at least 4mm2 copper if they are not mechanically protected (for example, run along the surface of a wall or behind a bath panel). If the conductor is enclosed in conduit, trunking, or otherwise mechanically protected, 2.5mm2 copper is permitted. The conductor can be single-core green/yellow PVC insulated cable. It must be securely connected to the metalwork using BS EN 60998-compliant clamps — purpose-made earth clamps that grip the pipe firmly and are labelled "Safety Electrical Connection — Do Not Remove." Wrap-around pipe clamps are the most common type. The bonding conductor should be as short as practicable and routed to minimise the risk of mechanical damage.',
  },
  {
    question: 'Do plastic pipes need bonding in a bathroom?',
    answer:
      'No. Plastic pipes (including plastic water supply pipes, plastic waste pipes, and plastic push-fit plumbing) are non-conductive and are therefore not extraneous-conductive-parts. They do not require bonding. This is increasingly relevant because modern properties often have plastic plumbing throughout — in which case there may be no metalwork in the bathroom that requires supplementary bonding. However, be careful to check the full run of the pipework: if plastic pipes are connected to metal pipes elsewhere in the system (for example, the plastic supply pipe connects to a copper riser in the airing cupboard), the metal section could still introduce earth potential into the bathroom. Check what is accessible within the bathroom itself and whether any metal pipework enters the room.',
  },
  {
    question: 'What happens if bonding is missing on an EICR?',
    answer:
      'If supplementary bonding is required (because the conditions for omission under Regulation 701.415.2 are not met) and it is found to be absent or inadequate during an EICR, the inspector should record this as an observation. The classification depends on the circumstances. If the bathroom has no RCD protection and no bonding, this is typically a C2 (Potentially Dangerous) observation because the risk of electric shock is significantly elevated. If RCD protection is present but one of the other conditions for omission is not met (for example, the disconnection time cannot be verified), it might be classified as C3 (Improvement Recommended) or C2 depending on the overall risk assessment. If main bonding is also missing, this is likely C1 (Danger Present). The observation text should reference Regulation 701.415.2 and clearly state which condition is not met.',
  },
  {
    question: 'Do I need to bond a metal bath?',
    answer:
      'A metal bath is an extraneous-conductive-part if it is connected to the metalwork of the building (for example, via metal waste pipes or metal water supply pipes). If the bath has metal waste and supply connections, it should be included in the supplementary bonding — unless the conditions for omission under Regulation 701.415.2 are met. If the metal bath has plastic waste and plastic water supply connections, and there is no other metalwork connecting it to earth, it may not be an extraneous-conductive-part — but this requires careful assessment. In practice, if there is any doubt, bond it. A bonding clamp on the underside of a metal bath (accessible behind the bath panel) is straightforward to install and eliminates any risk. Modern acrylic and fibreglass baths are non-conductive and do not require bonding.',
  },
  {
    question: 'Where do I connect the bonding conductor at the other end?',
    answer:
      'The supplementary bonding conductor connects each piece of extraneous-conductive-part metalwork to the nearest exposed-conductive-part earth terminal — typically the earth terminal of a socket, light switch, or the bathroom circuit junction box. Alternatively, all the bonding conductors can be brought together at a common bonding point (a connector strip or terminal block) that is connected to the circuit protective conductor. The important thing is that all the metalwork in the bathroom is connected together and connected to the circuit protective conductor, creating an equipotential zone. The bonding does not need to run back to the consumer unit — it connects locally within or near the bathroom.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Record bonding observations and test results on the EICR with AI-assisted coding.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'Observation Codes Explained',
    description:
      'C1, C2, and C3 codes for missing or inadequate bonding — with regulation references.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/bathroom-electrical-regulations',
    title: 'Bathroom Electrical Regulations',
    description:
      'Complete guide to bathroom zones, IP ratings, RCD requirements, and permitted equipment.',
    icon: Droplet,
    category: 'Guide',
  },
  {
    href: '/guides/earthing-arrangements',
    title: 'Earthing Arrangements',
    description: 'TN-C-S, TN-S, and TT earthing systems explained with main bonding requirements.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/supplementary-bonding-guide',
    title: 'Supplementary Bonding Guide',
    description:
      'Detailed technical guide to supplementary equipotential bonding in special locations.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/training/18th-edition-course',
    title: '18th Edition Course',
    description:
      'Study BS 7671:2018+A3:2024 including Section 701 (bathrooms) on the Elec-Mate platform.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-bonding',
    heading: 'What Is Bonding and Why Does It Matter in Bathrooms?',
    content: (
      <>
        <p>
          Bonding is the practice of connecting metalwork together with a conductor to create an
          equipotential zone — an area where all accessible metalwork is at the same electrical
          potential. If a fault occurs and one piece of metalwork becomes live, the bonding ensures
          that the voltage difference between that metalwork and any other metalwork a person could
          simultaneously touch is minimised.
        </p>
        <p>
          In bathrooms, this is particularly important because water reduces the skin resistance of
          the human body. A voltage that might cause a mild tingle on dry skin can cause a dangerous
          electric shock when a person is wet. The risk is highest when a person is in a bath or
          shower and can simultaneously touch metalwork connected to different earth potentials —
          for example, a metal bath connected to a water pipe and a metal radiator connected to a
          heating pipe.
        </p>
        <p>
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          addresses this in Section 701, which covers the particular requirements for electrical
          installations in locations containing a bath or shower. The key regulation for bonding is
          Regulation 701.415.2.
        </p>
      </>
    ),
  },
  {
    id: 'main-vs-supplementary',
    heading: 'Main Bonding vs Supplementary Bonding',
    content: (
      <>
        <p>
          There are two types of equipotential bonding, and it is important to understand the
          difference because they serve different purposes and have different requirements.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Main Protective Bonding</h3>
            <p className="text-white text-sm leading-relaxed">
              Main bonding (Regulation 411.3.1.2) connects the main earthing terminal of the
              installation to the incoming metallic services — gas, water, and oil supply pipes — at
              or near the point of entry to the building. Main bonding conductors are typically
              10mm2 or 16mm2 copper depending on the size of the earthing conductor. Main bonding is
              required in every installation and cannot be omitted. Its purpose is to connect all
              incoming metallic services to the earthing system of the installation, ensuring they
              are at the same potential as the electrical earth.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Supplementary Bonding</h3>
            <p className="text-white text-sm leading-relaxed">
              Supplementary bonding (Regulation 415.2 and 701.415.2 for bathrooms) is an additional
              local bonding connection within a specific area — in this case, the bathroom. It
              connects all extraneous-conductive-parts (metal pipes, metal baths, etc.) and
              exposed-conductive-parts (earthed electrical equipment) within the bathroom together.
              Supplementary bonding conductors are typically 4mm2 copper. Unlike main bonding,
              supplementary bonding in bathrooms can be omitted if certain conditions are met.
            </p>
          </div>
        </div>
        <p>
          Both types of bonding are essential parts of the{' '}
          <SEOInternalLink href="/guides/protective-earthing-bonding">
            fault protection strategy
          </SEOInternalLink>{' '}
          defined in BS 7671. Main bonding must always be in place. Supplementary bonding in
          bathrooms is additional protection that can be omitted only when the three conditions of
          Regulation 701.415.2 are satisfied.
        </p>
      </>
    ),
  },
  {
    id: 'when-required',
    heading: 'When Is Supplementary Bonding Required in a Bathroom?',
    content: (
      <>
        <p>
          Supplementary bonding is required in a bathroom when any of the three conditions for
          omission under Regulation 701.415.2 cannot be confirmed. If you cannot verify all three
          conditions, supplementary bonding must be installed.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD protection on bathroom circuits:</strong> If any circuit serving the
                bathroom (lighting, socket, shower, underfloor heating) is not protected by a 30mA
                RCD, supplementary bonding is required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Disconnection time cannot be verified:</strong> If you cannot confirm that
                all circuits serving the bathroom meet the 0.4-second disconnection time for 230V
                circuits (Regulation 411.3.2), supplementary bonding is required. This typically
                requires verifying that the earth fault loop impedance (Zs) is within the maximum
                values for the protective device.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main bonding is absent or inadequate:</strong> If main protective bonding to
                the incoming gas, water, and oil pipes is not in place or is undersized,
                supplementary bonding is required. In practice, if main bonding is missing, this
                should be rectified as a priority — it is a C1 or C2 observation on an{' '}
                <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink>.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In older properties with rewirable fuse boards (no RCDs), metal pipework, and no main
          bonding, supplementary bonding in the bathroom is essential — and is often the only
          protection against electric shock from a fault on the bathroom circuits.
        </p>
      </>
    ),
  },
  {
    id: 'when-omitted',
    heading: 'When Can Supplementary Bonding Be Omitted?',
    content: (
      <>
        <p>
          BS 7671:2018+A3:2024 Regulation 701.415.2 permits supplementary bonding to be omitted in a
          bathroom if ALL three of the following conditions are satisfied:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Condition 1:</strong> All circuits serving the location are protected by a
                30mA RCD (Regulation 701.411.3.3). This includes the lighting circuit, any socket
                circuit (if sockets are installed in the bathroom), the shower circuit, the electric
                towel rail circuit, and any underfloor heating circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Condition 2:</strong> All extraneous-conductive-parts within the location
                are effectively connected to the protective equipotential bonding according to
                Regulation 411.3.1.2 — meaning main bonding is in place to the incoming water, gas,
                and oil pipes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Condition 3:</strong> All circuits serving the location meet the maximum
                disconnection times of Regulation 411.3.2.2 (0.4 seconds for 230V final circuits).
                This is verified by measuring the earth fault loop impedance (Zs) and confirming it
                is within the{' '}
                <SEOInternalLink href="/guides/maximum-zs-values">
                  maximum Zs values
                </SEOInternalLink>{' '}
                for the protective device.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In a modern domestic installation with a dual-RCD or RCBO consumer unit and main bonding
          in place, all three conditions are typically met — and supplementary bonding in the
          bathroom can be omitted. This is now the norm in new-build properties and properties with
          recently upgraded consumer units.
        </p>
        <p>
          However, the electrician must verify each condition — not assume. During an EICR, check
          for the presence and adequacy of main bonding, confirm RCD protection on all bathroom
          circuits, and verify disconnection times through Zs testing. Only if all three are
          confirmed can you record that supplementary bonding is not required.
        </p>
      </>
    ),
  },
  {
    id: 'conductor-size',
    heading: '4mm Conductor: Size and Installation Requirements',
    content: (
      <>
        <p>
          Where supplementary bonding is required, the conductor must meet specific size and
          installation requirements set out in BS 7671.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>4mm2 copper:</strong> The minimum cross-sectional area for a supplementary
                bonding conductor that is not mechanically protected. This is single-core
                green/yellow PVC insulated cable. It must be routed to minimise the risk of
                mechanical damage — typically behind bath panels, under the floor, or clipped along
                skirting boards.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>2.5mm2 copper:</strong> Permitted where the conductor is mechanically
                protected — enclosed in conduit, trunking, or a recognised protective enclosure. In
                practice, 4mm2 is used in most bathroom bonding installations because it is easier
                to run a single 4mm2 cable than to install conduit for 2.5mm2.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Clamp connections:</strong> Bonding connections to pipes must use
                purpose-made earth clamps that conform to BS EN 60998. Each clamp must be labelled
                "Safety Electrical Connection — Do Not Remove." The clamp must make a secure,
                low-resistance connection to the pipe — clean the pipe surface before fitting the
                clamp to ensure good metal-to-metal contact.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Accessibility:</strong> Bonding connections should be accessible for
                inspection and testing. Connections hidden behind permanently sealed panels or
                buried in walls cannot be inspected during future EICRs. Where access is limited
                (for example, behind a fitted bath panel), ensure the panel can be removed.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'what-to-bond',
    heading: 'What to Bond in a Bathroom',
    content: (
      <>
        <p>
          When supplementary bonding is required, you must bond all extraneous-conductive-parts and
          exposed-conductive-parts that are simultaneously accessible within the bathroom. Here is
          what to look for:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Metal water pipes:</strong> Hot and cold supply pipes entering the bathroom.
                Bond at the point of entry to the room or as close as practicable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Metal central heating pipes:</strong> Radiator flow and return pipes. Bond
                at the radiator valves or at the point where the pipes enter the bathroom.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Metal waste pipes:</strong> If the bath, basin, or shower waste pipe is
                metal (typically chrome or brass), bond it. Plastic waste pipes do not require
                bonding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Metal baths:</strong> A steel or cast iron bath connected to metal pipework
                is an extraneous-conductive-part and should be bonded. Acrylic and fibreglass baths
                are non-conductive and do not require bonding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Metal towel rails:</strong> If the towel rail is plumbed into the central
                heating system with metal pipe connections, it is an extraneous-conductive-part.
                Electric towel rails are exposed-conductive-parts and should be earthed via the
                circuit protective conductor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Structural metalwork:</strong> Any accessible structural steelwork, metal
                window frames (if conductive and earthed), or metal door frames within the bathroom.
                This is uncommon in domestic properties but should be checked.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Items that do not need bonding: plastic pipes, plastic baths, plastic cisterns, ceramic
          tiles, glass shower screens, and any non-conductive material. If the entire plumbing
          system in the bathroom is plastic (increasingly common in modern and renovated
          properties), there may be no extraneous-conductive-parts to bond at all.
        </p>
      </>
    ),
  },
  {
    id: 'testing-bonding',
    heading: 'Testing Bonding Connections',
    content: (
      <>
        <p>
          Bonding connections must be tested as part of any periodic inspection (EICR) or initial
          verification (EIC). The key test is the continuity of supplementary bonding conductors.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Continuity test:</strong> Using a low-resistance ohmmeter, measure the
                resistance between each bonded item and the nearest exposed-conductive-part earth
                terminal (or between any two simultaneously accessible bonded items). The resistance
                should be low — typically well under 1 ohm for short bonding conductors. A high
                resistance indicates a loose clamp, corroded connection, or broken conductor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visual inspection:</strong> Check that all bonding clamps are tight,
                correctly labelled, and making good contact with the metalwork. Check the conductor
                for damage — kinks, cuts, or signs of overheating. Verify the conductor size is
                adequate (4mm2 minimum unprotected).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Recording results:</strong> Record the bonding test results on the EICR
                schedule of test results or in the general condition section. Note which items are
                bonded and confirm the adequacy of the connections. If supplementary bonding has
                been omitted under Regulation 701.415.2, note this and confirm that all three
                conditions for omission are met.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A common EICR finding is bonding that was adequate when installed but has been compromised
          by subsequent plumbing work. A plumber replacing a section of copper pipe with plastic
          effectively breaks the bonding path — even though the bonding clamp is still attached to
          the remaining copper section. Always trace the full path from the bonding clamp to the
          incoming metal service to confirm continuity.
        </p>
        <SEOAppBridge
          title="Record bonding observations on the EICR instantly"
          description="Found missing or inadequate bonding? Elec-Mate's AI assigns the correct observation code (C1, C2, or C3) with the BS 7671 regulation reference. Complete the EICR on your phone and send it to the customer before you leave."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Bonding Issues on EICRs',
    content: (
      <>
        <p>
          Bonding deficiencies are one of the most common observations on domestic EICRs,
          particularly in older properties. Missing main bonding, missing supplementary bonding in
          bathrooms, and bonding that has been broken by plumbing alterations are all frequent
          findings.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Observation Coding</h4>
                <p className="text-white text-sm leading-relaxed">
                  Describe the bonding deficiency in plain English — "no supplementary bonding in
                  bathroom, metal pipes accessible" — and Elec-Mate's AI returns the correct{' '}
                  <SEOInternalLink href="/guides/eicr-observation-codes-explained">
                    observation code
                  </SEOInternalLink>{' '}
                  with the BS 7671 regulation reference. No more looking up codes in the book.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Remedial Quoting</h4>
                <p className="text-white text-sm leading-relaxed">
                  Turn the bonding observation into a priced remedial quote. Elec-Mate's estimator
                  prices the bonding work — 4mm2 cable, earth clamps, labour — and generates a quote
                  for the customer. Send the EICR and the remedial quote in the same visit.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certificate the Remedial Work</h4>
                <p className="text-white text-sm leading-relaxed">
                  After installing the bonding, issue a Minor Works Certificate for the remedial
                  work using Elec-Mate. Record the continuity test results and the items bonded.
                  Send the certificate to the customer from your phone.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="EICR, bonding observations, remedial quotes — all on your phone"
          description="Join 430+ UK electricians completing EICR certificates with AI observation coding, remedial quoting, and instant delivery. 7-day free trial, cancel anytime."
          icon={Droplet}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function BondingInBathroomPage() {
  return (
    <GuideTemplate
      title="Bonding in a Bathroom | When Is It Required? UK Guide"
      description="Complete guide to supplementary bonding in bathrooms under BS 7671. When bonding is required, when it can be omitted under Regulation 701.415.2, 4mm conductor requirements, what to bond, testing procedures, and EICR observation coding."
      datePublished="2025-05-20"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Droplet}
      heroTitle={
        <>
          Bonding in a Bathroom: <span className="text-yellow-400">When Is It Required?</span>
        </>
      }
      heroSubtitle="Supplementary bonding in bathrooms is one of the most common questions in domestic electrical work. This guide explains when bonding is required, when it can be omitted under Regulation 701.415.2, what to bond, conductor sizing, testing procedures, and how to record bonding observations on the EICR."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Bathroom Bonding"
      relatedPages={relatedPages}
      ctaHeading="Record Bonding Observations on Your Phone"
      ctaSubheading="EICR certificates with AI observation coding, remedial quoting, and instant PDF delivery. Join 430+ UK electricians using Elec-Mate. 7-day free trial, cancel anytime."
    />
  );
}
