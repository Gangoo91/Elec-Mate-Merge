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
  Cable,
  Gauge,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Kitchen Electrical Regulations', href: '/guides/kitchen-electrical-regulations' },
];

const tocItems = [
  { id: 'overview', label: 'Kitchen Electrical Requirements' },
  { id: 'cooker-circuit', label: 'Cooker Circuit' },
  { id: 'appliance-circuits', label: 'Appliance Circuits' },
  { id: 'ring-final', label: 'Ring Final Circuit and Sockets' },
  { id: 'socket-heights', label: 'Socket Heights and Sink Proximity' },
  { id: 'island-supply', label: 'Kitchen Island Supply' },
  { id: 'part-p', label: 'Part P Notification' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A dedicated cooker circuit is required for electric ranges and built-in ovens with hobs — typically a 32A or 45A radial circuit in 6mm or 10mm cable depending on the cooker rated current.',
  'Fixed kitchen appliances such as dishwashers, washing machines, and tumble dryers should each have a dedicated radial circuit, typically 20A in 2.5mm cable, fused at the connection point.',
  'Regulation 553.1.3 of BS 7671 states that socket outlets should not be installed where they could be easily accessible to a person using a fixed appliance — relevant to positions near sinks.',
  'New circuits in kitchens are notifiable under Part P of the Building Regulations. Like-for-like replacement of accessories on existing circuits is non-notifiable.',
  'Kitchen island socket outlets should be accessible but positioned to avoid water risk, typically using floor-mounted power units or worktop-mounted pop-up sockets designed for island installation.',
];

const faqs = [
  {
    question: 'What size circuit is needed for a cooker?',
    answer:
      'The cooker circuit size depends on the rated current of the appliance. For most domestic electric ranges and double ovens, a 32A radial circuit in 6.0mm two-core and earth cable is sufficient for cookers rated up to 7.2kW single phase. For larger range cookers rated up to 10.8kW, a 45A radial circuit in 10.0mm cable is required. The calculation method follows BS 7671 Appendix 4: calculate the design current (using the diversity factor of 0.1 for cookers rated over 12kW, per Appendix 15), select the protective device rating, then select the cable size to carry that current in the installation method used, accounting for grouping and thermal insulation derating factors. The cooker outlet switch must be rated at 45A (double-pole cooker switch) even if the circuit is protected at 32A.',
  },
  {
    question: 'Does a dishwasher need its own circuit?',
    answer:
      'BS 7671 does not mandate a dedicated circuit for dishwashers, but it is strongly recommended practice and required by many cooker manufacturers as a warranty condition. A dishwasher draws 10A to 13A during the heating element cycle, which can cause nuisance tripping of the ring final circuit RCD if other high-current appliances are running simultaneously. A dedicated 20A radial circuit in 2.5mm cable, protected by a 20A MCB or RCBO, provides adequate capacity and ensures the dishwasher cannot be affected by faults on the ring final circuit. The same applies to washing machines and tumble dryers — each should have its own dedicated circuit to ensure reliability and correct circuit protection.',
  },
  {
    question: 'How close to a sink can a socket outlet be in a kitchen?',
    answer:
      'BS 7671 Regulation 553.1.3 requires that socket outlets should not be installed where they are accessible to a person who is in contact with earthed metalwork (such as the sink). In practice, this is interpreted as a 300mm minimum horizontal distance from the edge of a sink, and sockets should not be positioned directly above a sink where they could be splashed. Some local authority building control departments and network operators apply a 300mm rule; the IET Guidance Notes recommend 300mm as good practice. Sockets should also not be positioned where they can be splashed by water from the sink, which in practice means avoiding the wall directly behind the sink. Where socket positions are constrained by the kitchen layout, RCD-protected socket outlets (30mA) provide additional protection.',
  },
  {
    question: 'What is Regulation 553.1 in BS 7671 and does it apply to kitchens?',
    answer:
      'Regulation 553.1 of BS 7671 covers socket outlet and current using equipment. Regulation 553.1.3 specifically states that a socket outlet shall not be installed in a position where it is likely to cause danger, for example in a zone where it is readily accessible to a person using a fixed appliance. This is specifically relevant to kitchen sinks — a socket directly above or adjacent to the sink could be reached by a person whose hands are wet or who is in contact with the earthed metal sink. The 300mm horizontal distance rule is the practical implementation of this regulation. New kitchen sockets must also be RCD-protected under the general Part 4 protection requirements of BS 7671.',
  },
  {
    question: 'Can I add sockets to the kitchen ring final without notifying building control?',
    answer:
      'Adding sockets to an existing ring final circuit in a kitchen is notifiable under Part P if it involves extending the circuit or adding a new spur. Approved Document P (2013) includes "additions to a circuit in a kitchen" as notifiable work. Like-for-like replacement of a socket outlet on an existing circuit in a kitchen is non-notifiable. If you are a registered member of an approved competent person scheme (NICEIC, NAPIT, ELECSA), you can self-certify the work. If not, building control must be notified before the work commences.',
  },
  {
    question: 'What is the best way to supply a kitchen island with power?',
    answer:
      'Kitchen island power can be supplied by: (1) a pop-up socket unit installed in the island worktop surface — these are purpose-designed for worktop installation and retract when not in use; (2) a floor-mounted power outlet, used where the island is fixed and where cable routing through the floor is practical; (3) a worktop-level socket on the end panel of the island — positioning depends on the island layout and sink proximity rules. The supply cable should run from the consumer unit or from a dedicated spur point via armoured cable or conduit under the floor if a floor-mounted outlet is used, or via the island cabinetry if a worktop unit is used. All island socket outlets must be RCD protected at 30mA under BS 7671 Regulation 411.3.4.',
  },
  {
    question: 'Is a separate fridge circuit needed in a kitchen?',
    answer:
      'A dedicated fridge circuit is not required by BS 7671, and in domestic kitchens most refrigerators are plugged into the ring final circuit. However, for commercial kitchens and for domestic arrangements where supply continuity is critical (for example, for insulin storage), a dedicated unfused radial circuit ensures the fridge cannot be accidentally unplugged or affected by a fault on the ring final. If the kitchen ring final circuit is protected by an RCD, a fault anywhere on the circuit will disconnect the fridge as well as other loads. A dedicated 13A or 20A radial circuit on a separate MCB (without RCD, or with a separate RCBO) ensures the fridge stays powered during nuisance trips on the main ring circuit.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size cooker cables, appliance radial circuits, and kitchen ring finals.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/part-p-building-regulations-electrical',
    title: 'Part P Building Regulations Guide',
    description: 'Kitchen new circuits are notifiable — understand Part P requirements.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Issue Electrical Installation Certificates for kitchen rewires on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/minor-works-certificate',
    title: 'Minor Works Certificate',
    description: 'For additions to existing kitchen circuits — issue on site instantly.',
    icon: ClipboardCheck,
    category: 'Certificate',
  },
  {
    href: '/guides/electrical-work-notification-part-p',
    title: 'Electrical Work Notification Guide',
    description: 'Exactly what kitchen work is notifiable and how to handle it.',
    icon: FileText,
    category: 'Guide',
  },
  {
    href: '/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description: 'Check voltage drop on long cooker cable runs.',
    icon: Zap,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Kitchen Electrical Requirements: What the Regulations Say',
    content: (
      <>
        <p>
          Kitchens have some of the highest electrical demands of any room in a dwelling. High-power
          appliances (electric ranges, ovens, dishwashers, washing machines), numerous socket outlets,
          and the proximity of water from the sink all create a complex electrical environment that
          must be carefully designed and installed to comply with BS 7671.
        </p>
        <p>
          The key regulatory requirements for kitchen electrical installations are found in BS 7671
          (the IET Wiring Regulations), specifically Regulation 553.1 (socket outlets), the general
          cable sizing and circuit design requirements in Part 4 and Appendix 4, and the RCD
          protection requirements. For work in dwellings, Part P of the Building Regulations also
          applies — new circuits in kitchens are notifiable.
        </p>
        <p>
          A well-designed kitchen electrical installation typically includes: a dedicated cooker
          circuit, dedicated circuits for each major fixed appliance (dishwasher, washing machine,
          fridge freezer), a ring final circuit or multiple radial circuits for socket outlets, and
          separate lighting circuits. Understanding the requirements for each of these is essential
          for producing a safe, compliant, and functional kitchen installation.
        </p>
      </>
    ),
  },
  {
    id: 'cooker-circuit',
    heading: 'Cooker Circuit: Design and Regulation',
    content: (
      <>
        <p>
          A dedicated cooker circuit is required for electric ranges, double ovens, and combination
          hob-and-oven installations. The circuit design must account for the cooker rated current,
          diversity, cable routing, and voltage drop.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong>32A radial circuit — most domestic cookers</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  Suitable for cookers rated up to approximately 7.2kW at 230V. Cable: 6.0mm
                  two-core and earth, protected by a 32A Type B MCB or RCBO. This covers most
                  built-in ovens and separate hobs with a combined rated current up to 32A.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong>45A radial circuit — larger range cookers</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  For range cookers rated up to 10.8kW or where the design current calculated
                  using BS 7671 Appendix 15 diversity exceeds 32A. Cable: 10.0mm two-core and
                  earth, protected by a 45A Type B MCB. A 45A double-pole cooker switch (switch
                  outlet unit) is required regardless of the circuit protective device rating.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong>Cooker outlet unit</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  The cooker outlet unit (cooker switch) must be rated at 45A double-pole and
                  must be positioned so that it can be reached without leaning over the hob — the
                  IET On-Site Guide recommends positioning it within 2 metres of the cooker and
                  not directly above it. Many units include a 13A socket outlet, which is
                  permitted provided the socket is not directly above the hob.
                </p>
              </div>
            </li>
          </ul>
        </div>
        <p>
          Voltage drop on the cooker circuit must be calculated. BS 7671 limits voltage drop to
          3% for lighting circuits and 5% for power circuits from the origin of the installation.
          For a 32A cooker circuit, the{' '}
          <SEOInternalLink href="/voltage-drop-calculator">
            voltage drop calculator
          </SEOInternalLink>{' '}
          will confirm whether the cable size is adequate for the cable run length.
        </p>
        <SEOAppBridge
          title="Size the cooker cable correctly on site"
          description="Elec-Mate's cable sizing calculator handles cooker circuits with full derating for installation method, grouping, and thermal insulation. Get the right cable size before you quote."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'appliance-circuits',
    heading: 'Dedicated Appliance Circuits',
    content: (
      <>
        <p>
          Fixed kitchen appliances should each have a dedicated radial circuit from the consumer
          unit. This ensures that a fault or trip on one appliance circuit does not affect other
          loads, and that the circuit protection is correctly matched to the appliance rated current.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <table className="w-full text-white text-sm">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-3 pr-4 font-semibold">Appliance</th>
                <th className="text-left py-3 pr-4 font-semibold">Typical Rating</th>
                <th className="text-left py-3 pr-4 font-semibold">Circuit</th>
                <th className="text-left py-3 font-semibold">Cable</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="py-3 pr-4">Dishwasher</td>
                <td className="py-3 pr-4">2.2 – 2.5kW</td>
                <td className="py-3 pr-4">20A radial</td>
                <td className="py-3">2.5mm T&E</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">Washing machine</td>
                <td className="py-3 pr-4">2.0 – 2.4kW</td>
                <td className="py-3 pr-4">20A radial</td>
                <td className="py-3">2.5mm T&E</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">Tumble dryer</td>
                <td className="py-3 pr-4">2.0 – 3.5kW</td>
                <td className="py-3 pr-4">20A radial</td>
                <td className="py-3">2.5mm T&E</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">Fridge freezer</td>
                <td className="py-3 pr-4">100 – 200W</td>
                <td className="py-3 pr-4">Ring or 13A radial</td>
                <td className="py-3">2.5mm T&E</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">Microwave</td>
                <td className="py-3 pr-4">800W – 1.5kW</td>
                <td className="py-3 pr-4">Ring final socket</td>
                <td className="py-3">Ring T&E</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Each dedicated appliance circuit should terminate at a fused connection unit (FCU) or
          switched outlet, not a 13A socket outlet. A 13A FCU with the appropriate fuse rating
          (typically 13A for dishwashers and washing machines, or the rated fuse matching the
          appliance flex size) provides a permanent, non-removable connection point and prevents
          the socket from being used for other purposes.
        </p>
      </>
    ),
  },
  {
    id: 'ring-final',
    heading: 'Ring Final Circuit and Socket Outlets',
    content: (
      <>
        <p>
          The kitchen ring final circuit supplies the general-purpose 13A socket outlets in the
          kitchen. A kitchen ring final circuit should be dedicated to the kitchen — BS 7671
          Appendix 15 recommends that a kitchen has its own ring final circuit separate from the
          rest of the dwelling, given the high number of socket outlets and the loading from
          small kitchen appliances.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Circuit cable:</strong> 2.5mm two-core and earth, forming a ring from
                consumer unit back to consumer unit via all socket outlet positions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Protection:</strong> 32A Type B MCB or RCBO. Kitchen ring final circuits
                must be RCD protected under BS 7671 Regulation 411.3.4 (socket outlets used by
                ordinary persons). RCBOs on each way, or the circuit connected to an RCD-protected
                bank in the consumer unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Number of sockets:</strong> There is no maximum number of socket outlets
                on a ring final circuit in BS 7671, but the floor area served must not exceed
                100m² and the circuit loading must not exceed the design current of the protective
                device.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Number of outlets needed:</strong> The IET On-Site Guide and good practice
                guidance recommend a minimum of 8 to 10 double socket outlets in a family kitchen
                to avoid the use of extension leads.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'socket-heights',
    heading: 'Socket Heights and Sink Proximity — Regulation 553.1',
    content: (
      <>
        <p>
          BS 7671 Regulation 553.1.3 requires that socket outlets shall not be installed in a
          position where they are likely to cause danger — specifically where they are accessible
          to a person who is in contact with earthed metalwork such as a sink. This regulation
          governs socket placement relative to the kitchen sink.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>300mm minimum horizontal distance from the edge of a sink</strong> — the
                IET Guidance Notes and On-Site Guide recommend a minimum 300mm horizontal clearance
                between the edge of the sink and any socket outlet.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No sockets directly above the sink</strong> — socket outlets should not
                be positioned where water from the tap could reach them, or where a person
                operating the tap could reach up and touch the socket with wet hands.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket height:</strong> No specific height is mandated by BS 7671 for
                kitchen sockets, but good practice is 150mm to 200mm above the worktop surface
                (approximately 1.0m to 1.1m from the floor) for worktop-level sockets. Sockets
                positioned below worktop height should be avoided in kitchens for convenience
                and to avoid splash risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection for all kitchen sockets:</strong> All socket outlets in
                kitchens must be protected by a 30mA RCD under Regulation 411.3.4, which requires
                RCD protection for socket outlets rated up to 32A in domestic premises.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'island-supply',
    heading: 'Kitchen Island Supply',
    content: (
      <>
        <p>
          Kitchen islands create specific electrical challenges because they are free-standing
          structures in the middle of the room, away from the walls where electrical circuits
          typically run. Supplying power to a kitchen island requires careful planning for the
          cable route and socket positioning.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong>Floor-mounted supply</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  The most common approach for fixed islands. A cable runs under the floor to
                  a floor outlet box beneath the island, then up through the island cabinetry to
                  the socket outlets or pop-up unit. The cable should be in conduit or armoured
                  cable below the floor to protect it from damage. The floor outlet point must
                  be accessible for future inspection.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong>Pop-up socket units</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  Purpose-designed pop-up socket units installed in the island worktop surface
                  retract when not in use, keeping the worktop clear. These must be connected to
                  an RCD-protected circuit and should be positioned away from any island sink.
                  The 300mm sink distance rule applies to pop-up units as well as fixed sockets.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong>PELV considerations</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  Where the island includes a sink (making the island worktop a potentially
                  conductive surface), consideration should be given to supplementary bonding
                  of the island metalwork to the main protective bonding system. If the kitchen
                  island is entirely non-metallic, supplementary bonding is not required.
                </p>
              </div>
            </li>
          </ul>
        </div>
        <p>
          New circuits to a kitchen island are notifiable under Part P because they are new circuits
          originating at the consumer unit. Ensure you are registered with a competent person scheme
          to self-certify, or notify building control before commencing.
        </p>
      </>
    ),
  },
  {
    id: 'part-p',
    heading: 'Part P Notification for Kitchen Electrical Work',
    content: (
      <>
        <p>
          Part P of the Building Regulations requires notification for new circuits in kitchens.
          The following kitchen work is notifiable:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>New cooker circuit</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>New appliance circuits (dishwasher, washing machine, etc.)</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>New ring final circuit in the kitchen</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Adding sockets to an existing kitchen circuit (extension or new spur)</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>New lighting circuit in the kitchen</span>
            </li>
          </ul>
        </div>
        <p>
          Like-for-like replacement of existing socket outlets or switches in a kitchen (on an
          existing circuit, with no changes to the circuit itself) is non-notifiable. For all
          notifiable kitchen work, register with an approved competent person scheme to
          self-certify and issue the{' '}
          <SEOInternalLink href="/eic-certificate">
            Electrical Installation Certificate
          </SEOInternalLink>{' '}
          or{' '}
          <SEOInternalLink href="/tools/minor-works-certificate">
            Minor Works Certificate
          </SEOInternalLink>{' '}
          on site.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Kitchen Electrical Work in Practice',
    content: (
      <>
        <p>
          Kitchen rewires and upgrades are high-value domestic jobs that require careful planning.
          A full kitchen electrical installation for a new kitchen typically involves the cooker
          circuit, multiple appliance circuits, a ring final, lighting, and island supply — and all
          of it is notifiable under Part P.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing Calculator</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>{' '}
                  to size the cooker circuit cable, appliance radial circuits, and ring final.
                  Automatic derating for installation method and grouping.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete your{' '}
                  <SEOInternalLink href="/eic-certificate">
                    Electrical Installation Certificate
                  </SEOInternalLink>{' '}
                  for the kitchen installation on your phone. AI board scanning populates the
                  schedule of circuits. PDF issued to the homeowner before you leave.
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

export default function KitchenElectricalRegulationsPage() {
  return (
    <GuideTemplate
      title="Kitchen Electrical Regulations UK | Circuits, Sockets and Part P"
      description="Complete guide to kitchen electrical regulations under BS 7671. Cooker circuit sizing (32A/45A), appliance dedicated circuits, Regulation 553.1 socket placement near sinks, kitchen island supply, RCD protection requirements, and Part P notification for new kitchen circuits."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Kitchen Electrical Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Kitchen Electrical Regulations:{' '}
          <span className="text-yellow-400">Circuits, Sockets, and Compliance</span>
        </>
      }
      heroSubtitle="Kitchens have some of the highest electrical demands in a dwelling. This guide covers cooker circuits, dedicated appliance circuits, socket placement under Regulation 553.1, kitchen island supply, and Part P notification requirements for new kitchen circuits."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Kitchen Electrical Regulations"
      relatedPages={relatedPages}
      ctaHeading="Quote, Install, and Certify Kitchen Electrical Work"
      ctaSubheading="Elec-Mate helps UK electricians price kitchen rewires, size cables correctly, and issue EICs on site. AI board scanning, cable sizing, professional quoting — everything on your phone. 7-day free trial."
    />
  );
}
