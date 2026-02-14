import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Layers,
  Calculator,
  Zap,
  Activity,
  BookOpen,
  FileText,
  Gauge,
  Cable,
  ArrowDownUp,
  Thermometer,
  Building2,
  GraduationCap,
  AlertTriangle,
  ShieldCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Calculators', href: '/tools/electrical-testing-calculators' },
  { label: 'Reference Methods', href: '/guides/reference-methods-cable-installation' },
];

const tocItems = [
  { id: 'what-are-reference-methods', label: 'What Are Reference Methods?' },
  { id: 'method-a', label: 'Methods A1 and A2' },
  { id: 'method-b', label: 'Method B' },
  { id: 'method-c', label: 'Method C' },
  { id: 'method-d', label: 'Method D' },
  { id: 'methods-efg', label: 'Methods E, F, and G' },
  { id: 'choosing-method', label: 'How to Choose the Right Method' },
  { id: 'impact-on-capacity', label: 'Impact on Current-Carrying Capacity' },
  { id: 'common-installations', label: 'Common Installation Scenarios' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Installation reference methods (A to G) describe how a cable is physically installed and directly determine the current-carrying capacity from the Appendix 4 tables in BS 7671.',
  'The same cable can have vastly different current-carrying capacities depending on the reference method — for example, 2.5 mm² T+E is rated at 20 A under Method A but 27 A under Method C.',
  'The most restrictive section of the cable run determines the reference method for the entire run, even if that restrictive section is only a short distance.',
  'Method C (clipped direct) is the most common for domestic T+E cable. Method A (enclosed in conduit in an insulating wall) is used when cables are chased into masonry with conduit.',
  'Elec-Mate handles reference method selection as part of its cable sizing calculator, automatically applying the correct column from the Appendix 4 tables across its suite of 50+ calculators.',
];

const faqs = [
  {
    question: 'What is a reference method in BS 7671?',
    answer:
      'A reference method is a standardised description of how a cable is installed. BS 7671 Table 4C1 defines the installation reference methods (A1, A2, B, C, D, E, F, G), each describing a specific physical arrangement — for example, a cable enclosed in conduit in a thermally insulating wall (Method A), a cable clipped directly to a surface (Method C), or a cable on an open perforated tray (Method E). The reference method determines which column of the current-carrying capacity tables in Appendix 4 you use to look up the cable capacity. Different reference methods give different capacities for the same cable because the installation arrangement affects how well the cable can dissipate heat. A cable in free air on an open tray dissipates heat much more effectively than one enclosed in conduit buried in an insulated wall.',
  },
  {
    question: 'Which reference method is most common for domestic work?',
    answer:
      'For domestic installations using flat twin-and-earth (T+E) cable, the two most common reference methods are Method C (clipped direct to a surface, such as clipped to joists or battens) and Method A (enclosed in conduit in a thermally insulating wall, such as PVC conduit chased into masonry). Method C applies when the cable is fixed directly to joists, walls, or ceilings without being enclosed in conduit or trunking. Method A applies when the cable is installed in conduit that is chased into or plastered into a masonry wall. The distinction matters because Method A gives a lower current-carrying capacity than Method C due to the reduced heat dissipation when the cable is enclosed. Many domestic circuits use a combination of both — the cable might be in conduit for the section chased into the wall and then clipped to joists in the loft. In this case, the most restrictive method (A) applies for the whole run.',
  },
  {
    question: 'What if the cable changes reference method along its route?',
    answer:
      'If a cable route includes sections installed under different reference methods — for example, clipped to joists (Method C) for most of the run but passing through conduit in a wall (Method A) for a short section — the most restrictive method applies to the entire cable run. This is because the cable must be sized for the worst-case conditions it encounters along its route. A cable that is adequately rated for Method C may be underrated for Method A. The only exception is if the restrictive section is very short and has no significant impact on the cable temperature — BS 7671 and the IET Guidance Notes allow some engineering judgement here, but the default approach is to use the most restrictive method for the full run.',
  },
  {
    question: 'When would I use Method D for buried cables?',
    answer:
      'Method D applies to cables installed directly in the ground — for example, an armoured cable (SWA) buried in a trench to supply an outbuilding, garage, garden office, or external lighting. The cable is typically laid in a trench at a depth of at least 500 mm (or deeper depending on the location and whether it crosses a road or driveway), surrounded by sand or fine fill, and covered with cable tiles or warning tape. Method D gives a specific set of current-carrying capacities in the XLPE/SWA tables (4E series) because the thermal properties of the surrounding soil affect heat dissipation. The soil thermal resistivity, depth of burial, and whether other cables are buried nearby all influence the capacity. For most standard domestic buried SWA runs, the tabulated values for Method D at a standard soil thermal resistivity of 2.5 K.m/W are used directly.',
  },
  {
    question: 'What is the difference between Methods E, F, and G?',
    answer:
      'Methods E, F, and G all involve cables installed in free air with good heat dissipation, but they differ in the physical arrangement. Method E covers cables on an open or ventilated perforated cable tray — common in commercial and industrial cable management. Method F covers cables on a cable ladder or cleats — typically seen in industrial settings where large cables are secured to wall-mounted cleats or horizontal ladders. Method G covers cables touching a wall or ceiling surface in free air (not on a tray). These methods give the highest current-carrying capacities because the cables have maximum air circulation for heat dissipation. In domestic work, these methods are rarely used. In commercial and industrial installations, they are common for submains, distribution cables, and large power circuits.',
  },
  {
    question: 'Does the reference method affect voltage drop calculations?',
    answer:
      'The reference method itself does not directly change the voltage drop per metre — the mV/A/m values in Appendix 4 are the same regardless of installation method. However, the reference method indirectly affects voltage drop because it determines the cable size you select. A more restrictive reference method (like Method A) may require a larger cable to meet current-carrying capacity requirements, and a larger cable has a lower voltage drop per metre. So while the voltage drop formula is independent of the reference method, the cable size — which is determined partly by the reference method — directly affects the result. The Elec-Mate cable sizing calculator checks both current-carrying capacity and voltage drop simultaneously.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/appendix-4-tables-bs-7671',
    title: 'Appendix 4 Tables Guide',
    description: 'How to use the current-carrying capacity tables in BS 7671 for cable selection.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Automated cable sizing with reference method selection and correction factor application.',
    icon: Calculator,
    category: 'Calculator',
  },
  {
    href: '/guides/correction-factors-guide',
    title: 'Correction Factors Guide',
    description:
      'Ambient temperature, grouping, and thermal insulation correction factors explained.',
    icon: Thermometer,
    category: 'Guide',
  },
  {
    href: '/guides/voltage-drop-guide-bs-7671',
    title: 'Voltage Drop Guide',
    description:
      'Calculating voltage drop for cable runs and ensuring compliance with BS 7671 limits.',
    icon: ArrowDownUp,
    category: 'Guide',
  },
  {
    href: '/guides/how-to-size-cables-bs-7671',
    title: 'How to Size Cables',
    description:
      'Complete cable sizing process from design current through to final cable selection.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/guides/max-demand-calculation-guide',
    title: 'Max Demand Guide',
    description:
      'Calculating max demand using diversity factors before sizing the incoming supply cable.',
    icon: Gauge,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-are-reference-methods',
    heading: 'What Are Installation Reference Methods?',
    content: (
      <>
        <p>
          Installation reference methods are standardised descriptions of how a cable is physically
          installed in a building or site. They are defined in Table 4C1 of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          and are fundamental to the cable sizing process. The reference method you select
          determines which column of the{' '}
          <SEOInternalLink href="/guides/appendix-4-tables-bs-7671">
            Appendix 4 current-carrying capacity tables
          </SEOInternalLink>{' '}
          you read, and therefore the maximum current the cable can safely carry.
        </p>
        <p>
          The reason reference methods matter is heat dissipation. A cable generates heat when it
          carries current (I²R losses). How effectively that heat can escape into the surrounding
          environment depends entirely on the physical installation arrangement. A cable in free air
          on an open tray can shed heat freely in all directions. The same cable enclosed in conduit
          inside a masonry wall, surrounded by plaster and possibly thermal insulation, cannot
          dissipate heat nearly as well — so its safe current-carrying capacity is lower.
        </p>
        <p>
          There are seven main reference methods: A1, A2, B, C, D, E, F, and G. Each represents a
          different installation arrangement, from the most restrictive (enclosed in insulation) to
          the least restrictive (open air on a perforated tray). Selecting the correct reference
          method is not optional — it is a required step in every cable sizing calculation.
        </p>
        <SEOAppBridge
          title="All reference methods built into the calculator"
          description="Select the installation method from a dropdown and Elec-Mate pulls the correct current-carrying capacity from the right Appendix 4 table. No need to figure out which table column to use."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'method-a',
    heading: 'Methods A1 and A2: Enclosed in Conduit in an Insulating Wall',
    content: (
      <>
        <p>
          Method A covers cables installed in conduit or trunking that is itself enclosed in a
          thermally insulating wall — typically PVC conduit chased into masonry and then plastered
          over, or cables directly in a thermally insulating wall.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Method A1:</strong> Cables in conduit in a thermally insulating wall.
                Single-core cables in conduit chased into masonry. This is the most restrictive
                common reference method and gives the lowest current-carrying capacities.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Method A2:</strong> Multicore cable in conduit in a thermally insulating
                wall. Similar to A1 but for multicore cables (such as T+E in conduit chased into a
                wall). Also gives low current-carrying capacities.
              </span>
            </li>
          </ul>
        </div>
        <p>
          <strong>When it applies:</strong> Any time you chase conduit into a masonry or stud wall
          and plaster over it. This is common for switch drops, socket feeds through walls, and any
          cable run that needs to be concealed in a solid wall with conduit protection. The
          surrounding masonry and plaster act as thermal insulation, restricting heat dissipation.
        </p>
        <p>
          <strong>Capacity example:</strong> A 2.5 mm² T+E cable under Method A has a
          current-carrying capacity of just 20 A. Compare this with 27 A under Method C. That 7 A
          difference can determine whether you need to use 4 mm² cable instead of 2.5 mm².
        </p>
      </>
    ),
  },
  {
    id: 'method-b',
    heading: 'Method B: Enclosed in Conduit on a Wall or in Trunking',
    content: (
      <>
        <p>
          Method B covers cables enclosed in conduit or trunking that is mounted on a wall or
          ceiling surface — not buried in the wall. The conduit or trunking is exposed and can
          dissipate some heat into the surrounding air, but the cable inside is still partially
          restricted.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-3 text-white text-sm">
            <li>Surface-mounted PVC conduit on a wall or ceiling</li>
            <li>Surface-mounted steel conduit on a wall or ceiling</li>
            <li>Surface-mounted PVC or metal trunking</li>
            <li>
              Cables in conduit or trunking running along the surface of a plasterboard ceiling
            </li>
          </ul>
        </div>
        <p>
          Method B gives slightly higher current-carrying capacities than Method A because the
          conduit or trunking is not embedded in insulating material — it is on the surface and can
          radiate heat into the air. However, the capacity is still lower than Method C (clipped
          direct) because the conduit or trunking restricts airflow around the cable.
        </p>
        <p>
          <strong>Common use:</strong> Commercial and industrial installations where cables are run
          in surface-mounted conduit or trunking for protection and appearance. Also used in
          domestic garages, workshops, and utility rooms where surface wiring is acceptable.
        </p>
      </>
    ),
  },
  {
    id: 'method-c',
    heading: 'Method C: Clipped Direct to a Surface',
    content: (
      <>
        <p>
          Method C is the most common reference method for domestic installations using flat
          twin-and-earth (T+E) cable. It covers cables fixed directly to a wall, ceiling, joist, or
          other surface using clips, without any conduit or trunking enclosure.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-3 text-white text-sm">
            <li>T+E cable clipped to joists in a loft</li>
            <li>T+E cable clipped to battens on a wall</li>
            <li>Cables clipped to the surface of a stud wall or ceiling</li>
            <li>SWA cable clipped to a wall with saddle clips</li>
          </ul>
        </div>
        <p>
          Method C provides good heat dissipation because the cable is in contact with the mounting
          surface on one side and exposed to air on the other. The mounting surface (wood, masonry,
          plaster) absorbs and conducts some heat away from the cable, while the exposed side
          radiates and convects heat into the air.
        </p>
        <p>
          <strong>Capacity example:</strong> A 2.5 mm² T+E cable under Method C has a
          current-carrying capacity of 27 A — a 35% increase over Method A (20 A) for the same
          cable. This is why the reference method selection has such a significant impact on cable
          sizing decisions.
        </p>
        <p>
          <strong>Important note:</strong> If a cable that is mostly clipped to joists (Method C)
          passes through a section of conduit in a wall (Method A) at any point, the more
          restrictive Method A applies to the entire run. Design for the worst case.
        </p>
      </>
    ),
  },
  {
    id: 'method-d',
    heading: 'Method D: Buried in the Ground',
    content: (
      <>
        <p>
          Method D covers cables installed directly in the ground. This is the standard method for
          armoured cable (SWA) runs supplying outbuildings, garages, garden offices, external
          lighting, and any other installation that requires an underground cable route.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard burial depth:</strong> At least 500 mm below finished ground level
                for areas with no vehicular traffic. 600 mm or more where vehicles may cross. Deeper
                burial under roads or driveways.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable protection:</strong> SWA cable provides its own mechanical protection
                via the steel wire armour. The cable is typically laid on a bed of fine sand or
                sieved fill, covered with more sand, and then protected with yellow cable warning
                tiles or tape before backfilling.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Soil thermal resistivity:</strong> The standard tables assume a soil thermal
                resistivity of 2.5 K.m/W. Dry sandy soils may have a higher resistivity (less heat
                dissipation), requiring derating. Wet clay soils dissipate heat better.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Method D is unique because the thermal environment (soil) is very different from air. The
          current-carrying capacities for Method D are given in separate columns in the Appendix 4
          tables — usually in the{' '}
          <SEOInternalLink href="/guides/appendix-4-tables-bs-7671">
            4E series (XLPE/SWA)
          </SEOInternalLink>
          . Grouping of buried cables (multiple circuits in the same trench) also has a significant
          impact and uses specific grouping factors from Table 4A1.
        </p>
      </>
    ),
  },
  {
    id: 'methods-efg',
    heading: 'Methods E, F, and G: Free Air Installation',
    content: (
      <>
        <p>
          Methods E, F, and G cover cables installed in free air — on open trays, ladders, or cleats
          — where air can circulate freely around the cable. These methods give the highest
          current-carrying capacities because heat dissipation is maximised.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Layers className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Method E: Perforated Cable Tray</h4>
                <p className="text-white text-sm leading-relaxed">
                  Cables on a horizontal or vertical perforated tray. The perforations allow air to
                  circulate beneath and around the cables. Common in commercial and industrial cable
                  management for distribution cables and submains.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Layers className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Method F: Cable Ladder or Cleats</h4>
                <p className="text-white text-sm leading-relaxed">
                  Cables on horizontal or vertical cable ladders, or secured to wall-mounted cleats.
                  Maximum air circulation around the cables. Used for large power cables in
                  industrial installations, switchrooms, and plant rooms.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Layers className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Method G: Spaced from a Surface</h4>
                <p className="text-white text-sm leading-relaxed">
                  Cables spaced from a wall or ceiling surface in free air, not touching the
                  surface. Provides slightly better heat dissipation than touching the surface
                  (Method C) because air can circulate on all sides.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          These methods are rarely used in domestic work but are essential for commercial and
          industrial installations. The higher current-carrying capacities they provide can mean
          smaller (and cheaper) cables for the same circuit, which makes a significant cost
          difference on large installations with many long cable runs.
        </p>
      </>
    ),
  },
  {
    id: 'choosing-method',
    heading: 'How to Choose the Right Reference Method',
    content: (
      <>
        <p>Selecting the correct reference method is a three-step process:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Survey the entire cable route.</strong> Walk the route from the distribution
              board to the final point. Note every section: through the wall in conduit, clipped to
              joists, through a floor void, passing through insulation, on a tray, etc.
            </li>
            <li>
              <strong>Identify the reference method for each section.</strong> Refer to Table 4C1 in
              BS 7671. Match the physical installation arrangement of each section to the correct
              reference method.
            </li>
            <li>
              <strong>Use the most restrictive method for the whole run.</strong> If the cable
              passes through multiple installation arrangements, the section with the lowest
              current-carrying capacity determines the reference method for the entire cable. Design
              for the worst case.
            </li>
          </ol>
        </div>
        <p>
          In practice, for most domestic work, the choice is between Method A (conduit in wall) and
          Method C (clipped direct). If any section of the cable route is in conduit in a wall,
          Method A applies. For commercial work with tray and trunking, you may be choosing between
          Method B (trunking) and Method E (perforated tray). Always document your reference method
          choice — it forms part of the design records required by BS 7671.
        </p>
        <SEOAppBridge
          title="50+ calculators built for UK electricians"
          description="Cable sizing, voltage drop, max demand, Zs, PFC, adiabatic equation, conduit fill, trunking fill, power factor, diversity factor, three-phase power — all in one app, all working to BS 7671. 7-day free trial."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'impact-on-capacity',
    heading: 'Impact on Current-Carrying Capacity',
    content: (
      <>
        <p>
          The difference in current-carrying capacity between reference methods is substantial. Here
          is a comparison for common cable sizes using Table 4D5 (multicore PVC copper T+E):
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4 overflow-x-auto">
          <table className="w-full text-white text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 pr-4 font-semibold">Cable Size</th>
                <th className="text-left py-3 pr-4 font-semibold">Method A (A)</th>
                <th className="text-left py-3 pr-4 font-semibold">Method B (A)</th>
                <th className="text-left py-3 pr-4 font-semibold">Method C (A)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr>
                <td className="py-3 pr-4">1.5 mm²</td>
                <td className="py-3 pr-4">14.5</td>
                <td className="py-3 pr-4">17.5</td>
                <td className="py-3 pr-4">20</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">2.5 mm²</td>
                <td className="py-3 pr-4">20</td>
                <td className="py-3 pr-4">24</td>
                <td className="py-3 pr-4">27</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">4 mm²</td>
                <td className="py-3 pr-4">27</td>
                <td className="py-3 pr-4">32</td>
                <td className="py-3 pr-4">37</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">6 mm²</td>
                <td className="py-3 pr-4">34</td>
                <td className="py-3 pr-4">40</td>
                <td className="py-3 pr-4">47</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">10 mm²</td>
                <td className="py-3 pr-4">46</td>
                <td className="py-3 pr-4">54</td>
                <td className="py-3 pr-4">64</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">16 mm²</td>
                <td className="py-3 pr-4">61</td>
                <td className="py-3 pr-4">73</td>
                <td className="py-3 pr-4">85</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          As you can see, the difference between Method A and Method C is approximately 25 to 40%
          for the same cable. This can easily mean the difference between a 2.5 mm² and a 4 mm²
          cable, or a 6 mm² and a 10 mm² cable. The cost and physical size difference is significant
          — especially for long runs or when conduit sizing is a constraint.
        </p>
        <p>
          These tabulated values are <strong>before</strong>{' '}
          <SEOInternalLink href="/guides/correction-factors-guide">
            correction factors
          </SEOInternalLink>{' '}
          for grouping, ambient temperature, and thermal insulation are applied. After applying
          those factors, the effective capacity is lower still. The{' '}
          <SEOInternalLink href="/tools/cable-sizing-calculator">
            Elec-Mate cable sizing calculator
          </SEOInternalLink>{' '}
          handles all of this in one step.
        </p>
      </>
    ),
  },
  {
    id: 'common-installations',
    heading: 'Common Installation Scenarios',
    content: (
      <>
        <p>
          Here are the reference methods for the most common cable installation scenarios you will
          encounter:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Building2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Domestic Ring Final Circuit</h4>
                <p className="text-white text-sm leading-relaxed">
                  T+E cable clipped to joists under the floor and dropping down through conduit in
                  the wall to socket outlets. The section in conduit in the wall is Method A; the
                  section clipped to joists is Method C.{' '}
                  <strong>Use Method A for the whole run.</strong>
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Building2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Shower Circuit</h4>
                <p className="text-white text-sm leading-relaxed">
                  Dedicated circuit from the consumer unit to the shower. Cable typically clipped to
                  joists (Method C) then drops through the bathroom wall in conduit (Method A).{' '}
                  <strong>Use Method A.</strong> Given the high current (40 A+), the reference
                  method has a significant impact on the cable size required.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Building2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">SWA to Outbuilding</h4>
                <p className="text-white text-sm leading-relaxed">
                  Armoured cable from the main distribution board, through the wall, buried in the
                  ground across the garden, and into the outbuilding. The buried section is Method
                  D; the section inside each building clipped to the wall is Method C.{' '}
                  <strong>Use Method D for the buried section</strong> (usually the most restrictive
                  for SWA cable).
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Building2 className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Commercial Distribution</h4>
                <p className="text-white text-sm leading-relaxed">
                  Submain cables on perforated cable tray from the main switchboard to a
                  sub-distribution board. <strong>Method E</strong> for the tray section. If the
                  cable enters trunking at any point, that section becomes Method B. Use the most
                  restrictive method — or size each section individually if the design allows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ReferenceMethodsGuidePage() {
  return (
    <GuideTemplate
      title="Reference Methods for Cable Installation | BS 7671"
      description="Complete guide to BS 7671 installation reference methods A to G. How each method affects current-carrying capacity, when to use each method, common domestic and commercial scenarios, and how to select the correct method for every cable run."
      datePublished="2025-04-20"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Technical Guide"
      badgeIcon={Layers}
      heroTitle={
        <>
          Reference Methods:{' '}
          <span className="text-yellow-400">How Cable Installation Affects Capacity</span>
        </>
      }
      heroSubtitle="The same cable can carry 20 A or 27 A depending on how it is installed. Reference methods A to G define the installation arrangement and directly determine the current-carrying capacity from the BS 7671 Appendix 4 tables. This guide explains each method, when it applies, and how to choose correctly."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Reference Methods"
      relatedPages={relatedPages}
      ctaHeading="Cable Sizing with Automatic Reference Methods"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate's 50+ calculators. Select the installation method, enter the conditions — cable sizing is done in seconds with the correct Appendix 4 table applied automatically. 7-day free trial, cancel anytime."
    />
  );
}
