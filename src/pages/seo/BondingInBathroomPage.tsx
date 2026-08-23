import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Droplet,
  FileCheck2,
  Cable,
  GraduationCap,
  ClipboardCheck,
  Zap,
  Search,
} from 'lucide-react';

// -------------------------------------------------------------------
// Shared surfaces
// -------------------------------------------------------------------

/** Edge-to-edge on phones (the shell insets content by px-5), inset from sm: up. */
const cardCn =
  '-mx-5 my-5 rounded-none border-y border-white/[0.12] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-5 sm:mx-0 sm:rounded-2xl sm:border-x';

const listCn = 'space-y-4 text-white';
const thCn = 'py-3 pr-4 text-left font-semibold whitespace-nowrap';
const tdCn = 'py-3 pr-4 align-top';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Bathroom Bonding', href: '/guides/bonding-in-bathroom' },
];

const tocItems = [
  { id: 'when-omitted', label: 'Can It Be Omitted?' },
  { id: 'conductor-size', label: 'Conductor Sizes (Reg 544.2)' },
  { id: 'what-is-bonding', label: 'What Is Bonding?' },
  { id: 'main-vs-supplementary', label: 'Main vs Supplementary Bonding' },
  { id: 'when-required', label: 'When Is Bonding Required?' },
  { id: 'what-to-bond', label: 'What to Bond in a Bathroom' },
  { id: 'electric-showers', label: 'Electric Showers' },
  { id: 'testing-bonding', label: 'Testing Bonding Connections' },
  { id: 'for-electricians', label: 'For Electricians: Bonding on EICRs' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Reg 701.415.2 requires supplementary bonding in a room containing a bath or shower to connect the protective conductor terminals of every circuit supplying Class I and Class II equipment to the accessible extraneous-conductive-parts.',
  'It may be omitted only where the building has protective equipotential bonding to Reg 411.3.1.2 AND all three named conditions are met: (d) every final circuit of the location meets automatic disconnection per Reg 411.3.2; (e) every final circuit has additional protection by a 30 mA RCD per Reg 415.1.1; and (f) every extraneous-conductive-part of the location is effectively connected to that protective equipotential bonding.',
  'Where a supplementary bonding conductor is not mechanically protected, Reg 544.2 sets a floor of 4 mm². Where it is mechanically protected, the size depends on what is being joined — 2.5 mm² between two extraneous-conductive-parts, otherwise a conductance rule tied to the circuit protective conductor.',
  'Reg 701.415.2 names the parts to bond: (a) metallic pipes supplying services and metallic waste pipes, (b) metallic central heating pipes and air conditioning systems, and (c) accessible metallic structural parts of the building.',
  'Elec-Mate AI tools help electricians decide whether supplementary bonding can be omitted, and the EICR certificate records the bonding status with correct observation codes.',
];

const faqs = [
  {
    question: 'Is supplementary bonding still required in bathrooms?',
    answer:
      'Not always. BS 7671:2018+A4:2026 Regulation 701.415.2 sets out a prerequisite and three conditions. The prerequisite is that the location is in a building with a protective equipotential bonding system in accordance with Regulation 411.3.1.2 — main bonding conductors connecting the main earthing terminal to the extraneous-conductive-parts liable to introduce a dangerous potential difference, such as metallic water and gas installation pipes. Once that prerequisite is met, supplementary bonding may be omitted only if all three conditions are also satisfied: (d) all final circuits of the location comply with the requirements for automatic disconnection according to Regulation 411.3.2; (e) all final circuits of the location have additional protection by means of an RCD in accordance with Regulation 415.1.1; and (f) all extraneous-conductive-parts of the location are effectively connected to the protective equipotential bonding according to Regulation 411.3.1.2. Condition (f) is not a restatement of the prerequisite — it requires each individual extraneous-conductive-part inside the bathroom to be effectively connected. The NOTE to 701.415.2 says that effectiveness may be assessed, where necessary, by applying Regulation 415.2.2. If the prerequisite or any of the three conditions cannot be confirmed, supplementary bonding is still required.',
  },
  {
    question: 'What is supplementary bonding in a bathroom?',
    answer:
      'Supplementary bonding is an additional equipotential bonding connection. Regulation 415.2.1 requires it to include all simultaneously accessible exposed-conductive-parts of fixed equipment and extraneous-conductive-parts, and requires the bonding system to be connected to the protective conductors of all equipment including those of socket-outlets. In a bathroom, Regulation 701.415.2 puts it more specifically: it connects the terminals of the protective conductor of each circuit supplying Class I and Class II equipment to the accessible extraneous-conductive-parts within the room. The purpose is to equalise the potential between all accessible metalwork, so that if a fault occurs the voltage difference between any two parts a person could touch at the same time is limited. This matters most in bathrooms because body impedance falls when the skin is wet.',
  },
  {
    question: 'What size conductor is used for bathroom bonding?',
    answer:
      'Regulation 544.2 sizes it by what is being joined and whether the conductor is mechanically protected. Where mechanical protection is not provided, the minimum is 4 mm² in every case — which is why 4 mm² single-core green/yellow is the practical default for surface or behind-the-panel runs. Where the conductor is sheathed or otherwise mechanically protected: between two exposed-conductive-parts it must have a conductance not less than that of the smaller protective conductor connected to them (Reg 544.2.1); between an exposed-conductive-part and an extraneous-conductive-part, not less than half that of the protective conductor connected to the exposed-conductive-part (Reg 544.2.2); and between two extraneous-conductive-parts, not less than 2.5 mm² (Reg 544.2.3). Connections to pipes are made with clamps to BS 951, and Regulation 514.13.1 requires a warning notice marked "Safety Electrical Connection — Do Not Remove" at the point of connection of every bonding conductor to an extraneous-conductive-part; that notice may be provided on the BS 951 clamp itself.',
  },
  {
    question: 'Do plastic pipes need bonding in a bathroom?',
    answer:
      'No — plastic is not conductive, so a plastic pipe is not an extraneous-conductive-part and needs no bonding. There is a further point that is often got backwards. The NOTE to Regulation 411.3.1.2 states that where non-metallic pipes enter a building and are then connected to metallic pipes within the building, the metallic pipes within the building do not normally require protective bonding, as they are unlikely to be extraneous-conductive-parts. So a copper riser fed from a plastic incoming main is not automatically an extraneous-conductive-part. What decides it is whether that metalwork can introduce a potential — typically earth potential — into the location by some other route, for example a metallic gas installation pipe or metallic structural parts of the building. Where there is genuine doubt, measure rather than assume.',
  },
  {
    question: 'What happens if bonding is missing on an EICR?',
    answer:
      'If supplementary bonding is required (because the prerequisite and three conditions for omission under Regulation 701.415.2 are not all met) and it is found to be absent or inadequate during an EICR, the inspector records it as an observation. The classification depends on the circumstances. If the bathroom has no RCD protection and no bonding, this is typically a C2 (Potentially Dangerous) observation, because the risk of electric shock is significantly elevated. If RCD protection is present but one of the other conditions for omission is not met — for example the disconnection time cannot be verified — it might be classified C3 (Improvement Recommended) or C2 depending on the overall risk assessment. Missing main protective bonding is a separate and more serious finding and should be coded on its own merits. The observation text should reference Regulation 701.415.2 and state clearly which condition is not met.',
  },
  {
    question: 'Do I need to bond a metal bath?',
    answer:
      'Only if it is an extraneous-conductive-part — that is, if it is liable to introduce a potential into the bathroom, typically through metal waste or metal supply pipework that is itself connected to earth. If the bath has metal waste and supply connections into a metallic system, include it in the supplementary bonding, unless the conditions for omission under Regulation 701.415.2 are met. If the metal bath has plastic waste and plastic supply connections and nothing else connects it to earth, it is not an extraneous-conductive-part and bonding it achieves nothing. Modern acrylic and fibreglass baths are non-conductive and never require bonding. Where it is genuinely borderline, a bonding clamp on the underside of the bath behind the panel is cheap and removes the argument.',
  },
  {
    question:
      'Does the 30 mA RCD requirement apply to circuits that only pass through the bathroom?',
    answer:
      'Yes, for zones 1 and 2. Regulation 701.411.3.3 requires additional protection by one or more RCDs having the characteristics specified in Regulation 415.1.1 (rated residual operating current not exceeding 30 mA) for low voltage circuits (a) serving the location, and (b) passing through zones 1 and/or 2 not serving the location. So a lighting circuit crossing the bathroom ceiling void within zone 1 or 2 to supply an adjacent room must be RCD-protected even though it feeds nothing in the bathroom. When designing or inspecting, check the routing of every LV circuit in the vicinity. The NOTE to 701.411.3.3 refers you to Regulations 314.1(d) and 531.3.2 concerning the avoidance of unwanted tripping — divide circuits between devices rather than putting everything behind one RCD.',
  },
  {
    question: 'Where do I connect the bonding conductor at the other end?',
    answer:
      'To the protective conductor. Regulation 701.415.2 requires the bonding to connect the accessible extraneous-conductive-parts to the terminals of the protective conductor of each circuit supplying Class I and Class II equipment in the room — in practice the earth terminal of the shower switch, the light fitting, the fan connection unit or the socket, or a common connection point that is itself connected to those protective conductors. Regulation 415.2.1 reinforces this: the supplementary bonding system shall be connected to the protective conductors of all equipment including those of socket-outlets. It does not run back to the consumer unit. Regulation 701.415.2 also allows the bonding to be installed outside or inside the room, preferably close to the point of entry of the extraneous-conductive-parts into the room — which is usually a far easier place to work.',
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
    href: '/guides/earthing-systems-tns-tncs-tt-explained',
    title: 'Earthing Arrangements',
    description: 'TN-C-S, TN-S, and TT earthing systems explained with main bonding requirements.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/supplementary-bonding',
    title: 'Supplementary Bonding Guide',
    description:
      'Detailed technical guide to supplementary equipotential bonding in special locations.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/eighteenth-edition-course',
    title: '18th Edition Course',
    description:
      'Study BS 7671:2018+A4:2026 including Section 701 (bathrooms) on the Elec-Mate platform.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'when-omitted',
    heading: 'Can Supplementary Bonding Be Omitted?',
    content: (
      <>
        <p>
          Yes — but only against a prerequisite plus three named conditions, all of which have to
          hold. This is the whole of the omission allowance in Regulation 701.415.2 of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A4:2026
          </SEOInternalLink>
          .
        </p>
        <div className={cardCn}>
          <h3 className="text-sm font-semibold text-white">
            Prerequisite — before the conditions are even reached
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white">
            The location containing the bath or shower is in a building with a protective
            equipotential bonding system in accordance with Regulation 411.3.1.2. Without that, the
            conditions below do not come into play at all and supplementary bonding stays.
          </p>
          <div className="mt-5 border-t border-white/[0.1] pt-4">
            <h3 className="text-sm font-semibold text-white">
              Then all three conditions must be met
            </h3>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[520px] text-sm text-white">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className={thCn}>Condition</th>
                    <th className={thCn}>What Reg 701.415.2 requires</th>
                    <th className={thCn}>How you prove it</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  <tr>
                    <td className={`${tdCn} font-semibold text-elec-yellow`}>(d)</td>
                    <td className={tdCn}>
                      All final circuits of the location comply with the requirements for automatic
                      disconnection according to Reg 411.3.2
                    </td>
                    <td className={tdCn}>
                      Measure Zs and compare against the{' '}
                      <SEOInternalLink href="/guides/maximum-zs-values-bs-7671">
                        maximum Zs
                      </SEOInternalLink>{' '}
                      for the device
                    </td>
                  </tr>
                  <tr>
                    <td className={`${tdCn} font-semibold text-elec-yellow`}>(e)</td>
                    <td className={tdCn}>
                      All final circuits of the location have additional protection by means of an
                      RCD in accordance with Reg 415.1.1 (IΔn not exceeding 30 mA)
                    </td>
                    <td className={tdCn}>
                      Identify the device on every circuit and verify it per Reg 643.8
                    </td>
                  </tr>
                  <tr>
                    <td className={`${tdCn} font-semibold text-elec-yellow`}>(f)</td>
                    <td className={tdCn}>
                      All extraneous-conductive-parts of the location are effectively connected to
                      the protective equipotential bonding according to Reg 411.3.1.2
                    </td>
                    <td className={tdCn}>
                      The NOTE to 701.415.2 allows this to be assessed, where necessary, by applying
                      Reg 415.2.2
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <p>
          Condition (f) is not a restatement of the prerequisite. The prerequisite is about the
          building; (f) is about this room. Each accessible piece of metalwork in the bathroom has
          to be effectively connected into the bonding system — which is exactly what the NOTE gives
          you a method for.
        </p>
        <p>
          In a modern domestic installation with an RCBO or dual-RCD consumer unit and main bonding
          in place, all three conditions are typically met and supplementary bonding in the bathroom
          can be omitted. That is now the norm in new build and in properties with a recently
          upgraded consumer unit. It still has to be verified rather than assumed: check the
          presence and adequacy of main bonding, confirm RCD protection on every circuit of the
          location, and confirm disconnection through Zs testing. Only then can you record that
          supplementary bonding is not required.
        </p>
      </>
    ),
  },
  {
    id: 'conductor-size',
    heading: 'Conductor Sizes: What Regulation 544.2 Actually Says',
    content: (
      <>
        <p>
          The 4 mm² figure everyone quotes is the floor for an <strong>unprotected</strong>{' '}
          conductor, and it applies whatever is being joined. Where the conductor{' '}
          <em>is</em> sheathed or otherwise mechanically protected, the required size depends on
          which two parts it connects — and only one of those three cases gives you 2.5 mm².
        </p>
        <div className={cardCn}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm text-white">
              <thead>
                <tr className="border-b border-white/20">
                  <th className={thCn}>The conductor connects…</th>
                  <th className={thCn}>Mechanically protected</th>
                  <th className={thCn}>Not mechanically protected</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className={tdCn}>
                    Two exposed-conductive-parts
                    <span className="block text-xs text-white">Reg 544.2.1</span>
                  </td>
                  <td className={tdCn}>
                    Conductance not less than that of the smaller protective conductor connected to
                    them
                  </td>
                  <td className={`${tdCn} font-semibold text-elec-yellow`}>Not less than 4 mm²</td>
                </tr>
                <tr>
                  <td className={tdCn}>
                    An exposed-conductive-part to an extraneous-conductive-part
                    <span className="block text-xs text-white">Reg 544.2.2</span>
                  </td>
                  <td className={tdCn}>
                    Conductance not less than half that of the protective conductor connected to the
                    exposed-conductive-part
                  </td>
                  <td className={`${tdCn} font-semibold text-elec-yellow`}>Not less than 4 mm²</td>
                </tr>
                <tr>
                  <td className={tdCn}>
                    Two extraneous-conductive-parts
                    <span className="block text-xs text-white">Reg 544.2.3</span>
                  </td>
                  <td className={tdCn}>Not less than 2.5 mm²</td>
                  <td className={`${tdCn} font-semibold text-elec-yellow`}>Not less than 4 mm²</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white">
            Reg 544.2.3 carries an exception: where one of the two extraneous-conductive-parts is
            connected to an exposed-conductive-part in compliance with Reg 544.2.2, then 544.2.2
            applies to the conductor joining the two extraneous parts as well.
          </p>
        </div>
        <p>
          In practice, 4 mm² single-core green/yellow is what gets used for bathroom bonding,
          because running one 4 mm² cable behind a bath panel is quicker than installing conduit to
          justify a smaller size. Route it to minimise the risk of mechanical damage.
        </p>
        <div className={cardCn}>
          <ul className={listCn}>
            <li>
              <strong>Bonding need not always be a cable.</strong> Reg 544.2.4 allows supplementary
              bonding to be provided by a supplementary conductor, by a conductive part of a
              permanent and reliable nature, or by a combination of the two.
            </li>
            <li>
              <strong>Clamps to BS 951.</strong> Connections to pipework are made with purpose-made
              earthing and bonding clamps to BS 951. Clean the pipe first so the clamp makes proper
              metal-to-metal contact.
            </li>
            <li>
              <strong>The warning notice is a regulation, not a courtesy.</strong> Reg 514.13.1
              requires a notice clearly and durably marked "Safety Electrical Connection — Do Not
              Remove", securely fixed in a visible position at the point of connection of every
              bonding conductor to an extraneous-conductive-part. It may be provided on the BS 951
              clamp or on the label supplied with it.
            </li>
            <li>
              <strong>Keep it accessible.</strong> Connections sealed behind permanent panels or
              buried in walls cannot be inspected on a future EICR. Where access is tight, make sure
              the bath panel can still come off.
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'what-is-bonding',
    heading: 'What Is Bonding and Why Does It Matter in Bathrooms?',
    content: (
      <>
        <p>
          Bonding is the practice of connecting metalwork together with a conductor to create an
          equipotential zone — an area where all accessible metalwork sits at essentially the same
          potential. If a fault occurs and one piece of metalwork becomes live, bonding limits the
          voltage difference between it and any other metalwork a person could touch at the same
          time.
        </p>
        <p>
          In bathrooms this matters more than anywhere else in a dwelling, because body impedance
          falls sharply when the skin is wet. A voltage that would give a dry hand a mild tingle can
          give a dangerous shock to someone standing in a bath. The worst case is a person in
          contact with two pieces of metalwork sitting at different potentials — a metal bath fed by
          a water pipe and a radiator fed by a heating pipe, for example.
        </p>
        <p>
          BS 7671:2018+A4:2026 deals with this in Section 701, the particular requirements for
          locations containing a bath or shower. The bonding regulation is 701.415.2; the RCD
          regulation is 701.411.3.3.
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
          Two different things share the word "bonding". They are sized differently, sited
          differently, and only one of them can ever be left out.
        </p>
        <div className="my-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-5">
            <h3 className="mb-3 text-lg font-bold text-white">Main Protective Bonding</h3>
            <p className="text-sm leading-relaxed text-white">
              Reg 411.3.1.2 requires extraneous-conductive-parts liable to introduce a dangerous
              potential difference to be connected to the main earthing terminal. The regulation's
              own examples are metallic water installation pipes, metallic gas installation pipes,
              other metallic installation pipework and ducting, central heating and air conditioning
              systems, and exposed metallic structural parts of the building. Reg 544.1.2 requires
              the connection to be made as near as practicable to the point of entry, and within 600
              mm of a meter outlet union where practicable. Main bonding cannot be omitted.
            </p>
          </div>
          <div className="rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-5">
            <h3 className="mb-3 text-lg font-bold text-white">Supplementary Bonding</h3>
            <p className="text-sm leading-relaxed text-white">
              Reg 415.2, applied to bathrooms by Reg 701.415.2, is local bonding inside one
              location. It connects the protective conductor terminals of the circuits in the room
              to the accessible extraneous-conductive-parts, so that everything a person can touch
              at once is tied together. It is typically 4 mm² copper, and unlike main bonding it can
              be omitted where the prerequisite and the three conditions of 701.415.2 are all met.
            </p>
          </div>
        </div>
        <h3 className="mt-6 text-sm font-semibold text-white">
          Main bonding conductor size where PME conditions apply
        </h3>
        <p className="mt-2">
          Most UK domestic supplies are PME (TN-C-S). Where PME conditions apply, Reg 544.1.1 sizes
          the main protective bonding conductor against the PEN conductor of the supply using Table
          54.8 — not against the earthing conductor.
        </p>
        <div className={cardCn}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] text-sm text-white">
              <thead>
                <tr className="border-b border-white/20">
                  <th className={thCn}>Copper equivalent CSA of the PEN conductor</th>
                  <th className={thCn}>Minimum copper equivalent CSA of main bonding conductor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className={tdCn}>35 mm² or less</td>
                  <td className={`${tdCn} font-semibold`}>10 mm²</td>
                </tr>
                <tr>
                  <td className={tdCn}>Over 35 mm² up to 50 mm²</td>
                  <td className={`${tdCn} font-semibold`}>16 mm²</td>
                </tr>
                <tr>
                  <td className={tdCn}>Over 50 mm² up to 95 mm²</td>
                  <td className={`${tdCn} font-semibold`}>25 mm²</td>
                </tr>
                <tr>
                  <td className={tdCn}>Over 95 mm² up to 150 mm²</td>
                  <td className={`${tdCn} font-semibold`}>35 mm²</td>
                </tr>
                <tr>
                  <td className={tdCn}>Over 150 mm²</td>
                  <td className={`${tdCn} font-semibold`}>50 mm²</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white">
            Table 54.8 carries a NOTE that local distributor's network conditions may require a
            larger conductor. Where PME conditions do <em>not</em> apply, Reg 544.1.1 instead
            requires not less than half the cross-sectional area required for the earthing conductor
            of the installation.
          </p>
        </div>
        <p>
          Both sit inside the same{' '}
          <SEOInternalLink href="/guides/protective-earthing-bonding">
            fault protection strategy
          </SEOInternalLink>
          . Main bonding is always there. Supplementary bonding is the layer you may be able to drop
          once the rest of the installation is doing its job.
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
          Whenever you cannot confirm the prerequisite and all three conditions of Reg 701.415.2.
          Three situations account for almost all of it in practice.
        </p>
        <div className={cardCn}>
          <ul className={listCn}>
            <li>
              <strong>A circuit of the location has no 30 mA RCD.</strong> If any circuit serving
              the bathroom — lighting, sockets, shower, towel rail, underfloor heating — is not
              protected by an RCD to Reg 415.1.1, condition (e) fails and supplementary bonding is
              required.
            </li>
            <li>
              <strong>Disconnection cannot be verified.</strong> Condition (d) is compliance with
              Reg 411.3.2. Reg 411.3.2.2 applies the maximum disconnection times in Table 41.1 to
              final circuits with a rated current not exceeding 63 A with one or more socket-outlets,
              and 32 A supplying only fixed connected current-using equipment. Verification means
              measuring earth fault loop impedance and confirming it is within the maximum Zs for
              the protective device. No test results, no condition (d).
            </li>
            <li>
              <strong>Main bonding is absent, undersized or disconnected.</strong> The prerequisite
              fails, so the conditions never come into play. Missing main bonding is a finding in
              its own right on an{' '}
              <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> and should be
              put right as a priority rather than compensated for with supplementary bonding.
            </li>
          </ul>
        </div>
        <p>
          In an older property with a rewirable fuse board, metallic pipework and no main bonding,
          supplementary bonding in the bathroom is required and does real work: it holds the
          metalwork a bather can touch at a common potential while automatic disconnection deals
          with the fault.
        </p>
      </>
    ),
  },
  {
    id: 'what-to-bond',
    heading: 'What to Bond in a Bathroom',
    content: (
      <>
        <p>
          Reg 701.415.2 names three categories. Everything else is a judgement about whether a given
          piece of metalwork is actually an extraneous-conductive-part.
        </p>
        <div className={cardCn}>
          <ul className={listCn}>
            <li>
              <strong>(a) Metallic pipes supplying services and metallic waste pipes.</strong> The
              regulation's own examples are water and gas. Bond at the point of entry to the room or
              as close to it as practicable. Chrome and brass waste pipes count; plastic waste does
              not.
            </li>
            <li>
              <strong>(b) Metallic central heating pipes and air conditioning systems.</strong>{' '}
              Radiator flow and return pipes, and any metallic air conditioning pipework or fan-coil
              unit accessible within the room.
            </li>
            <li>
              <strong>(c) Accessible metallic structural parts of the building.</strong> Note the
              qualification the regulation itself adds: metallic door architraves, window frames and
              similar parts are <em>not</em> considered to be extraneous-conductive-parts unless
              they are connected to metallic structural parts of the building.
            </li>
          </ul>
        </div>
        <h3 className="mt-6 text-sm font-semibold text-white">The two common judgement calls</h3>
        <div className={cardCn}>
          <ul className={listCn}>
            <li>
              <strong>Metal baths.</strong> A steel or cast iron bath is an
              extraneous-conductive-part only if something connects it to earth — usually metallic
              waste or supply pipework. Acrylic and fibreglass baths never are.
            </li>
            <li>
              <strong>Towel rails.</strong> A rail plumbed into the heating system on metal pipe is
              an extraneous-conductive-part. An electric towel rail is Class I equipment: it is an
              exposed-conductive-part, earthed through its circuit protective conductor, and that
              protective conductor terminal is one of the points the supplementary bonding connects
              to.
            </li>
          </ul>
        </div>
        <p>
          Nothing non-conductive needs bonding: plastic pipes, plastic baths, plastic cisterns,
          ceramic tiles, glass shower screens. Where the whole bathroom is plumbed in plastic —
          increasingly common in new build and refurbishments — there may be no
          extraneous-conductive-parts in the room to bond at all.
        </p>
      </>
    ),
  },
  {
    id: 'electric-showers',
    heading: 'Electric Showers and Bonding',
    content: (
      <>
        <p>
          "Electric shower earth bonding" is one of the most searched versions of this question, and
          it usually rests on a misunderstanding. An electric shower is Class I fixed equipment. Its
          earthing comes from the circuit protective conductor of the shower circuit — that is
          protective earthing under Reg 411.3.1.1, not bonding, and it is never optional.
        </p>
        <p>
          Supplementary bonding is a different job. Where it is required, Reg 701.415.2 connects the
          terminals of the protective conductor of each circuit supplying Class I and Class II
          equipment to the accessible extraneous-conductive-parts. The shower's protective conductor
          terminal — normally at the shower's isolator or pull-cord switch — is therefore one{' '}
          <em>end</em> of the bond, not an extra thing to be bonded.
        </p>
        <div className={cardCn}>
          <ul className={listCn}>
            <li>
              <strong>The shower circuit needs a 30 mA RCD regardless.</strong> Reg 701.411.3.3
              requires additional protection by an RCD to Reg 415.1.1 for LV circuits serving the
              location. This applies whether or not supplementary bonding is present — RCD
              protection is not an alternative to it, it is one of the conditions for omitting it.
            </li>
            <li>
              <strong>Metal shower pipework is bonded on its own merits.</strong> If the hot and
              cold feeds to the shower are copper and are extraneous-conductive-parts, they fall
              under 701.415.2(a).
            </li>
            <li>
              <strong>Short flex to a nearby connection unit.</strong> Reg 544.2.5 covers this case:
              where supplementary bonding is applied to a fixed appliance supplied by a short length
              of flexible cable from an adjacent connection unit or accessory incorporating a flex
              outlet, the protective conductor within that flexible cable also provides the
              supplementary bonding connection to the appliance's exposed-conductive-parts. No
              separate bonding conductor is needed for that leg.
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'testing-bonding',
    heading: 'Testing Bonding Connections',
    content: (
      <>
        <p>
          Bonding is tested as part of initial verification and of any periodic inspection. The test
          is a continuity measurement with a low-resistance ohmmeter, and BS 7671 gives an explicit
          acceptance criterion for it.
        </p>
        <div className={cardCn}>
          <h3 className="text-sm font-semibold text-white">
            The acceptance criterion — Reg 415.2.2
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white">
            The resistance R between simultaneously accessible exposed-conductive-parts and
            extraneous-conductive-parts shall satisfy:
          </p>
          <p className="mt-3 text-base font-semibold text-elec-yellow">
            R ≤ 50 V / I<sub>a</sub> &nbsp;(AC systems)
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white">
            where I<sub>a</sub> is the operating current of the protective device: for RCDs, IΔn;
            for overcurrent devices, the 5 s operating current. In DC systems the numerator is 120
            V. The NOTE to Reg 701.415.2 points at this same regulation as the way to assess whether
            extraneous-conductive-parts are effectively connected — which is how you evidence
            condition (f).
          </p>
        </div>
        <div className={cardCn}>
          <ul className={listCn}>
            <li>
              <strong>Continuity.</strong> Measure between each bonded part and the protective
              conductor terminal it is bonded to, or between any two simultaneously accessible
              bonded parts. Null the leads first and make clean metal-to-metal contact with the
              probes — paint, corrosion or a poor probe contact produces a falsely high reading and
              a wrong verdict against the 50 V / I<sub>a</sub> criterion.
            </li>
            <li>
              <strong>Visual inspection.</strong> Check clamps are tight, correctly labelled per Reg
              514.13.1 and gripping bare metal. Check the conductor for kinks, cuts and signs of
              overheating, and confirm the size against Reg 544.2.
            </li>
            <li>
              <strong>Recording.</strong> Record the results on the schedule of test results. Where
              supplementary bonding has been omitted under Reg 701.415.2, say so on the certificate
              and record the evidence for the prerequisite and each of conditions (d), (e) and (f).
            </li>
          </ul>
        </div>
        <p>
          The most common finding is bonding that was sound when installed and has since been broken
          by plumbing work. A plumber replacing a section of copper with plastic breaks the path
          even though the clamp is still tight on the remaining copper. Trace the full path rather
          than trusting the clamp.
        </p>
        <SEOAppBridge
          title="Log the bonding decision, not just the reading"
          description="Elec-Mate records supplementary bonding against Reg 701.415.2 on the EICR — the omission conditions you verified, the continuity results, and the observation if it is missing."
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
          Bonding deficiencies are among the most common observations on domestic EICRs. Missing
          main bonding, missing supplementary bonding where the omission conditions are not met, and
          bonding broken by later plumbing alterations account for most of them.
        </p>
        <div className="my-5 space-y-4">
          <div className="rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-5">
            <h3 className="mb-1 font-bold text-white">AI observation coding</h3>
            <p className="text-sm leading-relaxed text-white">
              Describe the deficiency in plain English — "no supplementary bonding in bathroom,
              metal pipes accessible, no RCD on lighting" — and Elec-Mate returns the{' '}
              <SEOInternalLink href="/guides/eicr-observation-codes-explained">
                observation code
              </SEOInternalLink>{' '}
              with the BS 7671 reference already attached.
            </p>
          </div>
          <div className="rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-5">
            <h3 className="mb-1 font-bold text-white">Remedial quoting</h3>
            <p className="text-sm leading-relaxed text-white">
              Turn the observation into a priced remedial quote — 4 mm² cable, BS 951 clamps, labour
              — and send the EICR and the quote from the same visit.
            </p>
          </div>
          <div className="rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-5">
            <h3 className="mb-1 font-bold text-white">Certificate the remedial work</h3>
            <p className="text-sm leading-relaxed text-white">
              Issue a Minor Works Certificate for the bonding once it is in, with the continuity
              results and the items bonded recorded against it. Sent to the customer from your
              phone.
            </p>
          </div>
        </div>
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
      title="Bathroom Supplementary Bonding: When to Omit It"
      description="Supplementary bonding in bathrooms: omit under Reg 701.415.2 only with main bonding, 30 mA RCDs on every circuit and verified disconnection — else 4 mm²."
      datePublished="2025-05-20"
      dateModified="2026-08-07"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Droplet}
      heroTitle={
        <>
          Bonding in a Bathroom: <span className="text-yellow-400">When Is It Required?</span>
        </>
      }
      heroSubtitle="Supplementary bonding in bathrooms is one of the most common questions in domestic electrical work. This guide gives the omission test from Regulation 701.415.2 up front, then conductor sizes from Regulation 544.2, what to bond, how to test it, and how to record it on an EICR."
      readingTime={12}
      answerBox={{
        question: 'Is supplementary bonding still required in a bathroom?',
        answer:
          'Not always. Regulation 701.415.2 permits it to be omitted only where the building has protective equipotential bonding to Regulation 411.3.1.2 and all three conditions hold: (d) every final circuit of the location meets automatic disconnection per 411.3.2; (e) every final circuit has additional protection by an RCD per 415.1.1; and (f) every extraneous-conductive-part of the location is effectively connected to that bonding. If one fails, supplementary bonding is required.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Bathroom Bonding"
      relatedPages={relatedPages}
      ctaHeading="Record Bonding Observations on Your Phone"
      ctaSubheading="EICR certificates with AI observation coding, remedial quoting, and instant PDF delivery. Join 1,600+ UK electricians using Elec-Mate. 7-day free trial, cancel anytime."
    />
  );
}
