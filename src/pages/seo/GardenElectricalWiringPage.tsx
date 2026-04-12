import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  AlertTriangle,
  CheckCircle2,
  FileCheck2,
  ClipboardCheck,
  Calculator,
  ShieldCheck,
  FileText,
  Shovel,
  Cable,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Garden Electrical Wiring', href: '/guides/garden-electrical-wiring-regulations' },
];

const tocItems = [
  { id: 'overview', label: 'Garden Electrical Regulations Overview' },
  { id: 'bs7671-sections', label: 'BS 7671 Sections 705 and 714' },
  { id: 'armoured-cable', label: 'Armoured Cable Requirements' },
  { id: 'burial-depth', label: 'Cable Burial Depths' },
  { id: 'rcd-protection', label: 'RCD Protection — Regulation 411.3.3' },
  { id: 'outdoor-sockets', label: 'Outdoor Socket Outlets' },
  { id: 'garden-shed', label: 'Garden Shed Supply' },
  { id: 'part-p', label: 'Part P Notification' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'BS 7671 Section 714 covers outdoor lighting installations; Section 705 applies to agricultural and horticultural premises, including outbuildings on farms. Both apply to garden electrical work in different contexts.',
  'Armoured cable (SWA — Steel Wire Armoured) is the standard for buried garden circuits. Minimum burial depth is 0.5m in gardens and 0.45m under paved areas, with mechanical protection where depth cannot be achieved.',
  'Regulation 411.3.3 of BS 7671 requires that socket outlets rated up to 20A used outdoors must be protected by a 30mA RCD — this applies to all garden socket outlets and outdoor supplies.',
  'Outdoor socket outlets must have a minimum IP rating of IP44 and must be RCD protected. Garden sockets on posts or walls should be weatherproof enclosures rated IP65 for long-term reliability.',
  'All new outdoor circuits and garden supplies are notifiable under Part P of the Building Regulations, including supplies to garden sheds, summerhouses, and detached garages.',
];

const faqs = [
  {
    question: 'What type of cable should I use for a garden circuit?',
    answer:
      'The standard cable for buried garden circuits is Steel Wire Armoured (SWA) cable, typically 2-core plus earth or 3-core plus earth. SWA cable is mechanically robust and provides protection against damage from garden tools, ground movement, and moisture. The armour also provides a path for fault currents when connected to the earth terminal at both ends. For above-ground cable runs on the exterior of buildings, SWA or MICC (mineral insulated copper clad) cable can be used; alternatively, PVC-sheathed cable can be installed in rigid conduit or trunking for mechanical protection. Ordinary flat twin-and-earth (T&E) cable must not be buried in the ground or run in exposed outdoor locations without mechanical protection.',
  },
  {
    question: 'How deep does outdoor cable need to be buried?',
    answer:
      'BS 7671 and the IET On-Site Guide specify minimum burial depths to protect buried cables from damage. In gardens and open ground, the minimum depth is 0.5m (500mm) from the finished ground surface. Under paved areas (patios, paths, driveways), the minimum depth is 0.45m (450mm) — slightly less because the hard surface provides some mechanical protection. Where it is not practical to achieve these depths (for example, where the ground is shallow above rock), the cable must be protected by additional mechanical protection such as cable tiles above the cable and a warning tape at a shallower level. Under driveways used by vehicles, the depth should ideally be 0.6m or the cable should be in heavy-gauge steel conduit for additional protection.',
  },
  {
    question: 'Does RCD protection apply to all outdoor socket outlets?',
    answer:
      'Yes. Regulation 411.3.3 of BS 7671 requires that socket outlets rated up to 20A that are used outdoors must be protected by a residual current device with a rated residual operating current not exceeding 30mA. This applies to all garden socket outlets, regardless of their position or height. For socket outlets rated above 20A used outdoors (for example, a 32A caravan hook-up or workshop supply), additional protective measures under Regulation 411.3.4 apply. In practice, all outdoor socket outlets in domestic gardens should be RCD protected at 30mA as a minimum, which is best achieved by using an RCBO at the consumer unit or by connecting to an RCD-protected way.',
  },
  {
    question: 'What IP rating is required for outdoor socket outlets?',
    answer:
      'Outdoor socket outlets must be rated for outdoor use, with a minimum IP rating of IP44 (protection against solid objects greater than 1mm and against water splashing from any direction). For socket outlets in exposed garden locations (on posts, on external walls where rain can fall directly), IP65 rated outlets are recommended — this provides protection against low-pressure water jets from any direction, which is more appropriate for the UK weather. IP44 is the minimum for a sheltered outdoor location such as under a pergola or covered patio. IP44 sockets on an exposed wall are technically compliant but will deteriorate faster than IP65 rated alternatives.',
  },
  {
    question: 'Is a garden shed supply notifiable under Part P?',
    answer:
      'Yes. A new supply to a garden shed involves a new circuit originating at the consumer unit or a new sub-circuit from an existing consumer unit. This is notifiable under Part P of the Building Regulations in England. If you are registered with an approved competent person scheme (NICEIC, NAPIT, ELECSA), you can self-certify the work. If not, building control must be notified before work commences. For Wales, Scotland, and Northern Ireland, equivalent notification requirements apply under their respective building regulations.',
  },
  {
    question: 'Can I use an ordinary extension lead to power outdoor garden equipment?',
    answer:
      'Extension leads designed for indoor use should not be used outdoors permanently. Standard extension leads are not rated for outdoor conditions (they lack IP protection) and they do not provide RCD protection unless a specific RCD adapter is fitted. For temporary use of outdoor power tools, a suitable outdoor RCD adapter plug (30mA, available from electrical wholesalers and DIY stores) provides a level of protection when plugged into an indoor socket. However, for any permanent outdoor electrical supply — a garden socket, outdoor lighting, shed supply — a properly installed, permanently wired circuit is required.',
  },
  {
    question: 'How should I route cable from the house to a garden shed?',
    answer:
      'The two main options are underground (buried SWA cable) or overhead (aerial cable). Underground is the preferred route for most domestic installations because it is hidden and protected. The cable should be buried at the required depth (0.5m in garden, 0.45m under paving), with cable tiles above the cable and warning tape above that. Mark the route and keep a record of it. For overhead routes, the minimum clearance is 3.5m above ground level (5.2m over driveways used by vehicles) and the cable span must not impose excessive mechanical tension — a catenary wire or a self-supporting cable should be used for spans over approximately 3m. Overhead cables are subject to wind loading and UV degradation; they are less preferred than buried cables for long-term reliability.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/outbuilding-electrical-supply-guide',
    title: 'Outbuilding Electrical Supply Guide',
    description: 'Detailed guide to supplying garages, workshops, and summer houses with electricity.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size SWA cables for garden circuits and outdoor supplies correctly.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/part-p-building-regulations-electrical',
    title: 'Part P Building Regulations Guide',
    description: 'Garden and outdoor circuits are notifiable — understand the requirements.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Issue Electrical Installation Certificates for garden and outdoor work.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description: 'Check voltage drop on long garden cable runs to sheds and outbuildings.',
    icon: Zap,
    category: 'Tool',
  },
  {
    href: '/guides/electrical-work-notification-part-p',
    title: 'Electrical Work Notification Guide',
    description: 'How to notify building control for garden and outdoor electrical work.',
    icon: FileText,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Garden Electrical Regulations: The Basics',
    content: (
      <>
        <p>
          Garden and outdoor electrical installations are more demanding than indoor domestic work
          because of the environmental conditions — weather exposure, moisture, mechanical damage
          from gardening, and the increased risk of electric shock outdoors where the earth is
          a better conductor than a dry indoor floor.
        </p>
        <p>
          BS 7671 contains specific requirements for outdoor electrical installations, including
          Section 714 (outdoor lighting installations) and the general requirements of Part 4
          and Part 5 for cable selection, protection against the effects of weather, and RCD
          protection. All new garden and outdoor circuits in dwellings are notifiable under Part P
          of the Building Regulations.
        </p>
        <p>
          The three critical areas of compliance for garden electrical work are: using the correct
          cable type and burial depth, providing mandatory RCD protection, and using IP-rated
          equipment suitable for outdoor use. Getting any of these wrong creates a risk of
          electric shock or fire.
        </p>
      </>
    ),
  },
  {
    id: 'bs7671-sections',
    heading: 'Relevant BS 7671 Sections: 714 and 705',
    content: (
      <>
        <p>
          Two sections of BS 7671 are particularly relevant to garden and outdoor electrical work:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Section 714 — Outdoor Lighting</h3>
            <p className="text-white text-sm leading-relaxed">
              Section 714 applies to permanent outdoor lighting installations, including garden
              lighting, pathway lighting, security lighting, and external building illumination.
              Key requirements include: RCD protection for all outdoor lighting circuits, IP-rated
              luminaires appropriate to their location, and correct cable selection for outdoor use.
              Section 714 also covers festoon and decorative lighting, but temporary seasonal
              outdoor lighting connected via a standard socket outlet is generally treated under
              the socket outlet RCD protection requirements rather than Section 714.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Section 705 — Agricultural Premises</h3>
            <p className="text-white text-sm leading-relaxed">
              Section 705 applies to agricultural and horticultural premises, which includes
              outbuildings on farms, stables, and market garden installations. It requires 30mA
              RCD protection for all socket outlets, specific requirements for luminaires in
              locations where livestock is present (to avoid damage from animals), and earthing
              requirements for farm buildings. For domestic outbuildings that are not on
              agricultural premises, Section 705 does not directly apply, but its principles
              (robust installation, IP-rated equipment, earthing) represent good practice.
            </p>
          </div>
        </div>
        <p>
          For most domestic garden electrical work, the general requirements of BS 7671 (Part 4
          protection requirements, cable selection from Part 5, and the RCD rules in Regulation
          411.3.3) are the primary applicable standards. Section 714 applies specifically where
          a permanent outdoor lighting installation is being created.
        </p>
      </>
    ),
  },
  {
    id: 'armoured-cable',
    heading: 'Armoured Cable (SWA) Requirements',
    content: (
      <>
        <p>
          Steel Wire Armoured (SWA) cable is the standard for buried garden and outdoor circuits.
          The steel wire armour provides mechanical protection against accidental damage from spades,
          forks, and other garden tools, and also provides an earth continuity path when correctly
          terminated.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong>Cable type</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  2-core SWA (for single-phase supplies with earthing via the armour) or
                  3-core SWA (for single-phase supplies where a separate CPC is required).
                  The armour must be connected to earth at both ends via suitable SWA glands.
                  SWA cable is available in conductor sizes from 1.5mm to 300mm and above.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong>Termination</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  SWA cable must be terminated using appropriate brass SWA glands at both ends.
                  The armour is clamped between the inner and outer cones of the gland and must
                  make good electrical contact to provide the earth continuity path. Inside the
                  consumer unit or distribution board, the armour is terminated to the earth bar
                  via the gland plate. Outside (at the garden socket or shed consumer unit),
                  the armour is connected to the earth terminal of the enclosure.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong>Cable sizing</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  Garden cable must be sized for the load it supplies, accounting for burial depth
                  (which reduces the cable's ability to dissipate heat). SWA cable buried in the
                  ground can carry more current than the same cable installed in thermal insulation.
                  Use the{' '}
                  <SEOInternalLink href="/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>{' '}
                  and check voltage drop for the cable run length.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'burial-depth',
    heading: 'Cable Burial Depths',
    content: (
      <>
        <p>
          The minimum burial depth for cables in gardens is specified to protect cables from
          accidental damage during routine gardening. These depths are the minimum — deeper
          installation provides greater protection.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4 overflow-x-auto">
          <table className="w-full text-white text-sm">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-3 pr-4 font-semibold">Location</th>
                <th className="text-left py-3 pr-4 font-semibold">Minimum Depth</th>
                <th className="text-left py-3 font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="py-3 pr-4">Garden (general)</td>
                <td className="py-3 pr-4 text-yellow-400 font-semibold">0.5m (500mm)</td>
                <td className="py-3">Cable tiles and warning tape above the cable</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">Under paved areas (patio, paths)</td>
                <td className="py-3 pr-4 text-yellow-400 font-semibold">0.45m (450mm)</td>
                <td className="py-3">Paving provides some mechanical protection</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">Under driveways (vehicles)</td>
                <td className="py-3 pr-4 text-yellow-400 font-semibold">0.6m (600mm) preferred</td>
                <td className="py-3">Or use heavy steel conduit for additional protection</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">Where depth cannot be achieved</td>
                <td className="py-3 pr-4">Any depth</td>
                <td className="py-3">Additional mechanical protection (conduit) required</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5 my-4 flex items-start gap-4">
          <Shovel className="w-6 h-6 text-yellow-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-white text-sm leading-relaxed">
              <strong>Mark the cable route on an as-installed plan</strong> — cable routes
              should be recorded on an as-installed drawing given to the homeowner. This is
              essential for future gardening or building work. Cable route maps should show the
              route from the consumer unit to each termination point with accurate dimensions
              from fixed reference points.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'rcd-protection',
    heading: 'RCD Protection — Regulation 411.3.3',
    content: (
      <>
        <p>
          Regulation 411.3.3 of BS 7671 is the mandatory RCD protection requirement for outdoor
          socket outlets. It states that socket outlets rated up to 20A that are used outdoors
          (for equipment used outdoors) must be protected by an RCD with a rated residual operating
          current not exceeding 30mA.
        </p>
        <p>
          This requirement is non-negotiable — there is no circumstance in which an outdoor socket
          outlet in a domestic garden can be unprotected by a 30mA RCD. The reason is straightforward:
          outdoors, a person using electrical equipment is often standing on damp ground, which
          provides a better earth connection than a dry indoor floor. This means that a much smaller
          fault current can cause a fatal shock, and 30mA RCD protection is essential to disconnect
          within the time limits required by BS 7671 before a fatal shock can occur.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Best practice:</strong> Use an RCBO (combined MCB and RCD) at the consumer
                unit for each outdoor circuit — provides both overcurrent protection and 30mA RCD
                protection on a dedicated way, so a nuisance trip on the outdoor circuit does not
                affect other circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Alternative:</strong> Connect the outdoor circuit to an RCD-protected
                section of a split-load consumer unit. All circuits in that RCD section will be
                protected, which meets the requirement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD at the socket:</strong> An RCD-protected socket outlet (with built-in
                30mA RCD) can also be used, but only where a single outdoor socket is being
                added and replacing the socket with an RCD type is the most practical option.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'outdoor-sockets',
    heading: 'Outdoor Socket Outlets',
    content: (
      <>
        <p>
          Outdoor socket outlets must meet specific standards for weatherproofing and safety.
          The requirements are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minimum IP44</strong> — protection against solid particles and water
                splashing from any direction. IP44 is the minimum for outdoor use in sheltered
                positions. IP65 (protection against low-pressure water jets) is recommended for
                exposed positions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protected at 30mA</strong> — mandatory under Regulation 411.3.3.
                The RCD can be at the consumer unit (RCBO or RCD-protected way) or built into
                the socket outlet.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Weatherproof covers</strong> — all outdoor socket outlets should have
                spring-loaded covers that close automatically when the socket is not in use.
                Some socket units include a lid that can be closed with a plug inserted ("in-use"
                covers), which provides protection against rain when equipment is connected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mounting position</strong> — outdoor sockets should be mounted on a wall
                or post at a convenient height (typically 0.75m to 1.2m from the ground), clear
                of water run-off from above, and not in a position where they will be submerged
                in standing water.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Certificate garden and outdoor circuits on your phone"
          description="Elec-Mate's EIC app lets you complete the Electrical Installation Certificate for garden and outdoor circuit installations on site. AI-assisted, instant PDF to the customer. Part P self-certification made simple."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'garden-shed',
    heading: 'Garden Shed Electrical Supply: Best Practice',
    content: (
      <>
        <p>
          Supplying a garden shed with electricity is one of the most common garden electrical jobs.
          Best practice involves a dedicated circuit from the main consumer unit, SWA cable buried
          at the required depth, a consumer unit in the shed for local protection, and earth
          electrode provision if required.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong>Dedicated circuit from main CU</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  The supply to the shed should be a dedicated circuit from the main consumer unit,
                  protected by an RCBO or MCB of appropriate rating. Do not share the garden shed
                  supply with other circuits. Size the cable for the maximum load in the shed —
                  typically a 20A or 32A circuit depending on whether power tools, heaters, or
                  EV chargers will be used.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong>Consumer unit in the shed</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  The shed should have its own small consumer unit (typically 4 to 6 way), which
                  provides local overcurrent protection and isolation. This allows the shed's
                  individual circuits (lighting, sockets, specific equipment) to be controlled
                  and protected independently.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong>Earth electrode for TT systems</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  For sheds that are not connected by a metallic armouring to the main building
                  earth (TT system), an earth electrode (earth rod) must be installed at the shed
                  to provide a local earth reference. The electrode resistance should be measured
                  and must be low enough for the RCD to operate within the required disconnection
                  time. See the outbuilding electrical supply guide for TT earthing details.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'part-p',
    heading: 'Part P Notification for Garden Circuits',
    content: (
      <>
        <p>
          All new garden and outdoor circuits are notifiable under Part P of the Building
          Regulations in England. This includes:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>New outdoor socket circuits</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>New permanent garden lighting circuits</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Supply to a garden shed, summerhouse, or detached garage</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>EV charger supply in the garden or driveway</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Any new outdoor water feature or pool electrical supply</span>
            </li>
          </ul>
        </div>
        <p>
          Register with an approved competent person scheme to self-certify garden electrical work
          and issue the{' '}
          <SEOInternalLink href="/eic-certificate">
            Electrical Installation Certificate
          </SEOInternalLink>{' '}
          on site. This satisfies Part P without building control involvement.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Garden Electrical Work in Practice',
    content: (
      <>
        <p>
          Garden electrical work is high-value, repeat-business territory. Homeowners investing
          in garden landscaping, outdoor entertaining spaces, and garden offices are willing to
          spend on quality electrical installations. A professional job — correct cable, correct
          depth, IP-rated equipment, properly certified — builds lasting customer relationships.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing and Voltage Drop</h4>
                <p className="text-white text-sm leading-relaxed">
                  Long garden cable runs can cause significant voltage drop. Use the{' '}
                  <SEOInternalLink href="/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>{' '}
                  to confirm the SWA cable size is adequate for the run length, and check voltage
                  drop with the{' '}
                  <SEOInternalLink href="/voltage-drop-calculator">
                    voltage drop calculator
                  </SEOInternalLink>
                  .
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC Certificate on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Issue the{' '}
                  <SEOInternalLink href="/eic-certificate">
                    Electrical Installation Certificate
                  </SEOInternalLink>{' '}
                  on site before you leave. Include the cable route description, burial depth, and
                  the as-installed details. The homeowner gets their certificate immediately and
                  your Part P self-certification is processed automatically by your scheme.
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

export default function GardenElectricalWiringPage() {
  return (
    <GuideTemplate
      title="Garden Electrical Wiring Regulations UK | SWA Cable, RCD, BS 7671"
      description="Complete guide to garden electrical wiring regulations under BS 7671. SWA armoured cable requirements, burial depths (0.5m gardens, 0.45m paved), mandatory RCD protection under Regulation 411.3.3, outdoor socket IP ratings, garden shed supply, and Part P notification."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Garden Electrical Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Garden Electrical Wiring Regulations:{' '}
          <span className="text-yellow-400">SWA Cable, RCD, and Compliance</span>
        </>
      }
      heroSubtitle="Garden electrical installations require armoured cable, correct burial depths, mandatory 30mA RCD protection under Regulation 411.3.3, and IP-rated outdoor equipment. This guide covers everything from cable selection to Part P notification for outdoor circuits."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Garden Electrical Wiring"
      relatedPages={relatedPages}
      ctaHeading="Certificate Garden Electrical Work On Site"
      ctaSubheading="Elec-Mate lets UK electricians issue EICs for garden and outdoor circuit installations from their phone. AI board scanning, cable sizing calculator, and instant PDF. Part P self-certification done before you leave. 7-day free trial."
    />
  );
}
