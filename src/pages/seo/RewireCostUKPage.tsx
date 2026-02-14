import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  PoundSterling,
  Home,
  Clock,
  Zap,
  FileCheck2,
  Calculator,
  Receipt,
  Brain,
  Ruler,
  ShieldCheck,
  AlertTriangle,
  Wrench,
  Building2,
  Cable,
} from 'lucide-react';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Rewire Cost UK', href: '/guides/rewire-cost-uk' },
];

const tocItems = [
  { id: 'average-costs', label: 'Average Rewire Costs' },
  { id: 'what-affects-cost', label: 'What Affects the Cost' },
  { id: 'what-is-included', label: 'What Is Included in a Rewire' },
  { id: 'first-fix-second-fix', label: 'First Fix vs Second Fix' },
  { id: 'how-long-does-it-take', label: 'How Long Does It Take' },
  { id: 'do-you-need-to-move-out', label: 'Do You Need to Move Out' },
  { id: 'part-p-and-certificates', label: 'Part P and Certificates' },
  { id: 'signs-you-need-a-rewire', label: 'Signs You Need a Rewire' },
  { id: 'for-electricians', label: 'For Electricians: Pricing Rewires' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A full house rewire in the UK costs between £2,500 and £10,000+, depending on the size of the property, number of storeys, accessibility, and location.',
  'The most common rewire costs are: 1-bed flat £2,500-£4,000, 2-bed house £3,500-£5,500, 3-bed house £5,000-£7,500, 4-bed house £7,000-£10,000+.',
  'A rewire is notifiable work under Part P of the Building Regulations — the electrician must be registered with a competent person scheme or notify building control.',
  'An Electrical Installation Certificate (EIC) must be issued on completion of a rewire, confirming the new installation complies with BS 7671.',
  'A full rewire typically takes 5-10 working days depending on property size, with the homeowner usually needing to move out or live without power in sections of the house.',
];

const faqs = [
  {
    question: 'How much does it cost to rewire a 3-bedroom house in the UK?',
    answer:
      'A full rewire of a typical 3-bedroom semi-detached house in the UK costs between £5,000 and £7,500 in 2026, including materials, labour, a new consumer unit, and all required testing and certification. This price assumes a standard installation with a reasonable number of circuits and accessories (sockets, switches, light fittings), standard cable routes, and accessible loft and floor void spaces. Costs at the lower end of the range apply to properties with good access (e.g. suspended timber floors that can be lifted, accessible loft space, surface-run cables in garages or outbuildings), while costs at the upper end apply to properties with solid floors, multiple storeys, complex layouts, or extensive plastering requirements. In London and the South East, expect to pay 15-25% more. These prices are for the electrical work only — making good (plastering, decorating) is usually an additional cost unless you agree an all-inclusive package with the electrician.',
  },
  {
    question: 'How long does a full house rewire take?',
    answer:
      'A full house rewire typically takes between 5 and 10 working days for a standard domestic property, depending on the size and complexity of the installation. A 2-bedroom terraced house might take 5-6 days, while a 4-bedroom detached house could take 8-10 days or more. This timeframe covers first fix (chasing walls, running cables, fitting back boxes, installing containment), consumer unit installation, second fix (fitting sockets, switches, light fittings, connecting appliances), and initial verification testing plus certification. The work is usually done in two phases: first fix takes the majority of the time (3-6 days) and is the most disruptive, involving chasing walls, lifting floorboards, and running cables through the loft. Second fix (1-2 days) is less disruptive and involves fitting the visible accessories. If the property has solid concrete floors, no loft access, or particularly complex layouts, the timeline can extend significantly — sometimes to 2-3 weeks for a large or difficult property.',
  },
  {
    question: 'Do I need to move out during a rewire?',
    answer:
      'You do not strictly need to move out during a rewire, but most homeowners find it much easier to do so, particularly during the first fix phase. During first fix, the electrician will be chasing walls (creating channels for cables using an SDS drill or wall chaser, which generates a lot of dust and noise), lifting floorboards, working in the loft, and running cables throughout the property. The power supply will be disconnected for periods, and there will be debris, dust, and restricted access throughout the house. Some electricians can work room by room, maintaining power to parts of the house while working on others, but this is slower and more expensive. If you choose to stay, expect significant disruption for the first fix period (3-6 days). The second fix phase is much less disruptive — you can usually remain in the house while sockets, switches, and light fittings are installed and connected. If moving out is not feasible, discuss the work schedule with your electrician in advance so you can plan around the most disruptive phases.',
  },
  {
    question: 'What is included in a full rewire?',
    answer:
      "A full rewire includes the complete replacement of the fixed electrical installation from the consumer unit to every accessory in the property. Specifically, this includes: a new consumer unit (with RCBOs or dual-RCD configuration compliant with BS 7671:2018+A3:2024 and Amendment 1 of BS EN 61439-3), all new circuit cables (ring finals for sockets, radial circuits for high-current appliances, lighting circuits, dedicated circuits for cookers, showers, and immersion heaters), new accessory wiring (final connections to every socket, switch, ceiling rose, and fused spur), protective conductors (circuit protective conductors and main and supplementary bonding), new accessories (sockets, switches, light fittings, connection units — these may be basic white plastic or upgraded to a style of the homeowner's choice at additional cost), containment where required (mini-trunking, conduit, or surface-mounted cable management in areas where concealed routing is not possible), initial verification testing of every circuit (continuity, insulation resistance, polarity, earth fault loop impedance, prospective fault current, RCD operation), and an Electrical Installation Certificate (EIC) confirming compliance with BS 7671. What is typically NOT included: making good (plastering chased channels, filling holes, redecorating), external supply upgrades (if the meter tails or supply fuse need upgrading, this is arranged through the DNO), and any specialist circuits not discussed in the quote (such as EV charger preparation, smart home wiring, or garden lighting).",
  },
  {
    question: 'Is a rewire covered by home insurance?',
    answer:
      'A standard rewire is not covered by home insurance. Home insurance covers damage caused by insured events (fire, flood, storm, theft) — it does not cover the cost of upgrading or replacing installations that have deteriorated through age and normal wear. However, there are specific situations where insurance may be relevant. If your existing wiring causes a fire and the property needs rebuilding, the insurance would cover the rebuilding costs including new wiring as part of the reinstatement. If an EICR identifies dangerous wiring (C1 or C2 observations) and this leads to damage, your insurer may have views on whether the situation was a known risk that should have been addressed. Some insurance policies now require a satisfactory EICR as a condition of cover, particularly for older properties or buy-to-let properties. If your insurer requires remedial electrical work following an EICR, the cost of that work is your responsibility as the property owner. The rewire itself is a planned improvement to your property and is entirely at your own cost. Some homeowners fund rewires through savings, personal loans, or by adding the cost to a mortgage if they are purchasing or remortgaging a property that needs electrical work.',
  },
  {
    question: 'How do I know if my house needs a full rewire?',
    answer:
      'The definitive way to determine whether your house needs a rewire is to have a qualified electrician carry out an Electrical Installation Condition Report (EICR). The EICR will identify any defects, dangerous conditions, or areas that do not comply with current regulations, and the classification codes (C1, C2, C3, FI) will indicate the severity and urgency of any issues. However, there are several warning signs that suggest a rewire may be needed: the presence of old-style round-pin sockets, fabric-covered (rubber-insulated) wiring, lead-sheathed cables, or a wooden-backed fuseboard — these indicate pre-1960s wiring that is almost certainly past its safe service life. Frequent blown fuses or tripped MCBs, flickering lights, burning smells from sockets or switches, scorch marks around outlets, and buzzing or crackling sounds from the wiring are all warning signs. If your property still has a rewirable fuse board (with wire fuses rather than MCBs or RCBOs), the installation is likely old enough to need a rewire. As a general guide, electrical installations have a design life of 25-30 years, and any wiring over 30 years old should be inspected by a qualified electrician to determine whether a rewire is necessary.',
  },
  {
    question: 'Can I rewire my house myself?',
    answer:
      'Technically, there is no law that prevents a homeowner from carrying out their own electrical work, including a rewire. However, a full rewire is notifiable work under Part P of the Building Regulations in England and Wales, which means you must either be registered with a competent person scheme (NICEIC, NAPIT, ELECSA) to self-certify the work, or you must notify your local authority building control department before starting and arrange for their inspection on completion. If you are not a qualified electrician, you cannot join a competent person scheme, which means you would need to use the building control route — and they will require the work to be inspected and tested to BS 7671 standards. In practice, a DIY rewire is strongly inadvisable. Electrical work that is not carried out to a competent standard is a serious fire and electrocution risk. Incorrect cable sizing, inadequate fault protection, poor connections, and non-compliant earthing arrangements can all cause fatal consequences. A professional electrician will design the installation correctly, use appropriate materials, test every circuit thoroughly, and issue the required certification. The cost of a professional rewire is a small price for the safety of your household.',
  },
];

const sections = [
  {
    id: 'average-costs',
    heading: 'Average Rewire Costs in the UK (2026)',
    content: (
      <>
        <p>
          The cost of a full house rewire depends primarily on the size of the property, the number
          of circuits and accessories required, and your location. Here are the average costs for
          2026, based on standard installations with a reasonable specification.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">
            Average Rewire Costs by Property Size
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>1-bed flat:</strong> £2,500-£4,000 (3-5 days)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>2-bed terraced house:</strong> £3,500-£5,500 (5-7 days)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>3-bed semi-detached house:</strong> £5,000-£7,500 (6-8 days)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>4-bed detached house:</strong> £7,000-£10,000+ (8-12 days)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>5-bed+ large detached:</strong> £10,000-£15,000+ (10-15 days)
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices include materials (cables, consumer unit, accessories), labour, testing, and
          the Electrical Installation Certificate (EIC). They assume a standard specification —
          basic white plastic sockets and switches, standard cable routes, and accessible floor and
          ceiling voids. Upgraded accessories (brushed chrome, antique brass, smart switches),
          additional circuits (EV charger preparation, home office, garden lighting), or complex
          cable routes will increase costs.
        </p>
        <p>
          London and the South East typically add 15-25% to these prices, reflecting higher labour
          rates and operating costs. Rural areas may also command a premium if electricians have to
          travel significant distances. For a personalised quote, contact at least three local
          electricians registered with a{' '}
          <SEOInternalLink href="/guides/niceic-vs-napit">competent person scheme</SEOInternalLink>.
        </p>
        <SEOAppBridge
          title="AI Cost Engineer for Rewire Quotes"
          description="Electricians: describe the rewire job and the AI Cost Engineer generates a detailed quote with materials breakdown, labour hours, cable quantities, and profit margin. Uses real UK trade pricing data. Stop underquoting and start making proper money on rewires."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'what-affects-cost',
    heading: 'What Affects the Cost of a Rewire',
    content: (
      <>
        <p>
          The wide price ranges quoted above reflect the many factors that influence the cost of a
          rewire. Understanding these factors helps homeowners assess whether a quote is reasonable,
          and helps electricians price the work accurately.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Key Cost Factors</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Ruler className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Property size and number of rooms:</strong> More rooms mean more circuits,
                more cable, more accessories, and more labour. A 4-bed house might have 12-16
                circuits, while a 2-bed flat might have 6-8.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Number of storeys:</strong> Multi-storey properties require more cable
                (vertical runs between floors), more containment, and more time accessing different
                levels. A 3-storey townhouse costs significantly more than a single-storey bungalow
                of similar floor area.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Access and floor construction:</strong> Suspended timber floors allow cables
                to be run through the void without disturbing the finish. Solid concrete floors
                require surface-run cables, mini-trunking, or breaking into the concrete — all of
                which add cost and time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Property age and condition:</strong> Older properties may have lath and
                plaster walls (harder to chase), limited or no floor voids, asbestos-containing
                materials (requiring specialist removal), and other complications that increase
                cost.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Specification:</strong> The number and type of accessories (sockets, light
                fittings, switches, USB sockets, outdoor sockets), style of accessories (basic white
                plastic vs premium finishes), and any additional circuits (EV preparation, home
                office, garden, outbuildings) all affect cost.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Location:</strong> Labour rates vary significantly by region. London
                electricians charge £280-£350/day while rates in Wales or the North East might be
                £200-£260/day. This difference alone can account for 15-25% of the total cost.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Making good:</strong> Whether plastering and decorating is included in the
                quote or arranged separately. Some electricians include basic making good; others
                leave the plastering and decorating to the homeowner or a separate tradesperson.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'what-is-included',
    heading: 'What Is Included in a Full Rewire',
    content: (
      <>
        <p>
          A full rewire replaces the entire fixed electrical installation in the property —
          everything from the consumer unit to the accessories on the walls and ceilings. Here is
          exactly what should be included.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">What a Rewire Includes</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>New consumer unit:</strong> A modern consumer unit with RCBOs (or dual-RCD
                split-board) compliant with BS 7671:2018+A3:2024. RCBO boards are now the preferred
                option as they provide individual RCD protection for each circuit, avoiding nuisance
                tripping affecting the whole house.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>All new circuit cables:</strong> Twin and earth (6242Y) in the appropriate
                sizes — 2.5mm for socket circuits, 1.5mm for lighting, 6mm or 10mm for showers, 6mm
                for cookers, plus protective conductors for bonding. All cables run through chased
                channels, under floors, or through the loft.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>New accessories:</strong> All sockets, light switches, ceiling roses, fused
                connection units (spurs), cooker switches, shower pull cords, and any other
                accessories specified in the quote.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Earthing and bonding:</strong> Main protective bonding to gas, water, and
                oil (if applicable), plus supplementary bonding where required. The earthing system
                must be verified and upgraded if necessary.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Smoke and heat detectors:</strong> Under the current Building Regulations, a
                rewire triggers the requirement for a Grade D1 fire detection and alarm system —
                interlinked smoke detectors in hallways and landings, plus heat detectors in
                kitchens.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Initial verification testing:</strong> Every circuit must be tested —
                continuity of protective conductors (R1+R2), insulation resistance, polarity, earth
                fault loop impedance (Zs), prospective fault current (PFC), and RCD operation times.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Electrical Installation Certificate (EIC):</strong> The formal certificate
                confirming the new installation complies with BS 7671. This must be issued by the
                electrician on completion and a copy given to the homeowner. It is also required for
                Part P notification.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When comparing quotes, check exactly what is included. Some electricians quote for first
          fix only (cables and back boxes) with second fix priced separately. Others include making
          good (basic plastering of chased channels) while many do not. Ensure you understand what
          is and is not included before accepting a quote.
        </p>
        <SEOAppBridge
          title="EIC Certificate in the App"
          description="Electricians: complete the Electrical Installation Certificate for a rewire directly on your phone. Enter test results on site, capture digital signatures, and export a professional PDF — all before you leave. No going home to type it up."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'first-fix-second-fix',
    heading: 'First Fix vs Second Fix',
    content: (
      <>
        <p>
          A rewire is carried out in two distinct phases: first fix and second fix. Understanding
          the difference helps homeowners plan for the disruption and helps electricians coordinate
          with other trades.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-6">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">First Fix</h3>
            <p className="text-white text-sm leading-relaxed mb-3">
              First fix is the most disruptive phase. It involves:
            </p>
            <ul className="space-y-2 text-white text-sm">
              <li>Removing the old wiring and consumer unit</li>
              <li>Chasing walls for new cable routes</li>
              <li>Lifting floorboards to run cables under floors</li>
              <li>Running cables through the loft space</li>
              <li>Installing back boxes for sockets and switches</li>
              <li>Fitting containment (conduit, trunking) where needed</li>
              <li>Installing the new consumer unit</li>
              <li>Running all circuit cables and bonding conductors</li>
            </ul>
            <p className="text-white text-sm mt-3">
              <strong>Duration:</strong> 3-6 days depending on property size
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Second Fix</h3>
            <p className="text-white text-sm leading-relaxed mb-3">
              Second fix is carried out after plastering. It involves:
            </p>
            <ul className="space-y-2 text-white text-sm">
              <li>Fitting all faceplates to sockets and switches</li>
              <li>Installing ceiling roses and light fittings</li>
              <li>Connecting the cooker, shower, and other appliances</li>
              <li>Fitting smoke and heat detectors</li>
              <li>Final connections in the consumer unit</li>
              <li>Initial verification testing of all circuits</li>
              <li>Completing the EIC certificate</li>
              <li>Demonstrating the installation to the homeowner</li>
            </ul>
            <p className="text-white text-sm mt-3">
              <strong>Duration:</strong> 1-3 days depending on property size
            </p>
          </div>
        </div>
        <p>
          There is often a gap between first fix and second fix to allow the plasterer to make good
          the chased channels and any other damage to walls and ceilings. This gap can be a few days
          to a few weeks, depending on the plasterer's availability. The electrician should not
          carry out second fix until the plaster has dried — fitting accessories into wet plaster
          can cause problems with moisture ingress and premature corrosion.
        </p>
      </>
    ),
  },
  {
    id: 'how-long-does-it-take',
    heading: 'How Long Does a Rewire Take',
    content: (
      <>
        <p>
          The total duration of a rewire depends on the size and complexity of the property. Here
          are realistic timescales for different property types.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Typical Rewire Durations</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>1-bed flat:</strong> 3-5 working days (2-3 first fix, 1-2 second fix)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>2-bed terraced house:</strong> 5-7 working days (3-5 first fix, 2 second
                fix)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>3-bed semi-detached:</strong> 6-8 working days (4-6 first fix, 2-3 second
                fix)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>4-bed detached:</strong> 8-12 working days (5-8 first fix, 3-4 second fix)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>5-bed+ large property:</strong> 10-15+ working days
              </span>
            </li>
          </ul>
        </div>
        <p>
          These timescales are for the electrical work only. The total project duration from start
          to finish will be longer once you factor in the plastering gap between first fix and
          second fix (typically 1-3 weeks depending on plasterer availability), any additional
          trades needed (flooring, decoration), and scheduling around the homeowner's needs.
        </p>
        <p>
          Some electricians work alone, while others bring a mate or apprentice to speed things up.
          A two-person team can typically complete a rewire 30-40% faster than a single electrician,
          which may offset the higher labour cost if the homeowner wants the work done quickly.
        </p>
      </>
    ),
  },
  {
    id: 'do-you-need-to-move-out',
    heading: 'Do You Need to Move Out During a Rewire',
    content: (
      <>
        <p>
          This is one of the most common questions homeowners ask, and the honest answer is: you do
          not have to, but life will be much easier if you can. Here is what to expect if you stay.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">What to Expect If You Stay</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Dust and debris:</strong> Chasing walls produces significant amounts of
                dust. Even with dust sheets and extraction, the dust gets everywhere. If anyone in
                the household has asthma or respiratory conditions, moving out during first fix is
                strongly recommended.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Noise:</strong> Wall chasing and SDS drilling are extremely loud and can
                last several hours per day during first fix.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Power outages:</strong> The electrician will need to disconnect the power
                supply for periods during the work. They can sometimes arrange temporary supplies to
                essential rooms, but there will be periods without power.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Restricted access:</strong> Rooms being worked on will have floorboards up,
                cables hanging from ceilings, and tools and materials everywhere. You will need to
                stay out of these areas.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you do stay, discuss the work plan with your electrician. A good electrician will work
          room by room where possible, maintaining power to habitable areas and minimising
          disruption. They should provide a clear schedule so you know which rooms will be affected
          on which days. Consider staying with family or friends for the worst 2-3 days of first fix
          and returning for the rest of the work.
        </p>
      </>
    ),
  },
  {
    id: 'part-p-and-certificates',
    heading: 'Part P Building Regulations and Certificates',
    content: (
      <>
        <p>
          A full rewire is notifiable work under Part P of the Building Regulations in England and
          Wales. This means the work must either be carried out by an electrician registered with a{' '}
          <SEOInternalLink href="/guides/niceic-vs-napit">competent person scheme</SEOInternalLink>{' '}
          (who can self-certify the work) or the homeowner must notify the local authority building
          control department before starting and arrange for their inspection.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Certificates You Should Receive</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Electrical Installation Certificate (EIC):</strong> The primary certificate
                confirming the new installation complies with BS 7671. It includes a schedule of
                test results for every circuit, design details, and a declaration by the installer,
                designer, and inspector. You must receive a copy of this certificate on completion
                of the work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Building Regulation Compliance Certificate:</strong> If the electrician is
                registered with a competent person scheme, they notify the scheme of the completed
                work and a Building Regulation Compliance Certificate is issued. This confirms the
                work complies with Part P and is registered with the local authority. You should
                receive this within a few weeks of completion.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Keep both certificates safe. You will need them when selling the property — conveyancing
          solicitors routinely request evidence of Part P compliance for any electrical work carried
          out since 2005. Missing certificates can delay or jeopardise a property sale. If you have
          had work done without proper certification, you can arrange a retrospective{' '}
          <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> to demonstrate that
          the current installation is safe, although this does not replace the original EIC.
        </p>
        <SEOAppBridge
          title="EIC Certificate Built Into the App"
          description="Electricians: the full Electrical Installation Certificate form is built into Elec-Mate. Enter circuit details, record test results, capture signatures, and export a professional PDF — all from your phone on site. Notify your scheme provider and send the certificate to the homeowner before you leave."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'signs-you-need-a-rewire',
    heading: 'Signs You Need a Rewire',
    content: (
      <>
        <p>
          Not every property needs a full rewire. Many older installations can be upgraded,
          repaired, or partially replaced without stripping everything out and starting again.
          However, there are clear warning signs that indicate a full rewire is the safest and most
          cost-effective option.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Warning Signs</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Old round-pin sockets:</strong> These indicate pre-1947 wiring. The
                installation is almost certainly unsafe and past any reasonable service life.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Fabric-covered or rubber-insulated wiring:</strong> Used from the 1950s to
                1970s. The insulation degrades over time and becomes brittle, creating a fire and
                shock risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Lead-sheathed cables:</strong> Common in pre-1960s installations. The lead
                sheath can crack and expose live conductors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Wooden-backed or rewirable fuse board:</strong> A fuseboard with rewirable
                fuses (wire fuses rather than MCBs) indicates an old installation. While the fuses
                themselves may still work, the age of the installation means the wiring is likely
                degraded.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Frequent blown fuses or tripped MCBs:</strong> Can indicate overloaded
                circuits, deteriorating cable insulation, or poor connections — all of which may
                point to the need for a rewire.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Burning smells, scorch marks, or buzzing:</strong> These are serious warning
                signs of overheating connections or cables. Switch off the affected circuit and call
                a qualified electrician immediately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>No RCD protection:</strong> If your installation has no RCD (residual
                current device) protection at all, it lacks a critical safety feature. While an RCD
                can often be added via a consumer unit upgrade, the absence may indicate broader
                issues with the installation's age and condition.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Unsatisfactory EICR:</strong> If an EICR has returned an Unsatisfactory
                result with multiple C1 or C2 observations, and the remedial work would be
                extensive, a full rewire may be more cost-effective than piecemeal repairs.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The definitive way to know whether you need a rewire is to have a qualified electrician
          carry out an <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink>. The
          report will identify all defects and observations, and the electrician can then advise
          whether a full rewire is necessary or whether targeted repairs and upgrades will suffice.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Pricing Rewires Accurately',
    content: (
      <>
        <p>
          Rewires are one of the highest-value jobs a domestic electrician can take on, but they are
          also one of the most commonly underquoted. Getting the pricing right is essential —
          underquote and you work long days for slim margins; overquote and you lose the job to a
          competitor.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Rewire Pricing Checklist</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Survey the property thoroughly:</strong> Count every socket, switch, and
                light fitting. Check the floor construction (suspended timber or solid concrete).
                Check loft access. Measure cable runs. Note any complicating factors (solid walls,
                limited access, listed building restrictions).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Cost materials accurately:</strong> Cable quantities (measure, do not
                guess), consumer unit, accessories, back boxes, fixings, containment, bonding
                conductors, fire detection. Add 10-15% wastage allowance. Get trade prices from your
                usual supplier.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Estimate labour realistically:</strong> Use your experience of similar jobs.
                Add time for the unexpected — old properties always throw up surprises. If you are
                working alone, the job will take longer than if you have a mate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Include overheads:</strong> Van costs, insurance, scheme membership, test
                equipment calibration, accountancy — these must be covered by every job. Calculate
                your overhead cost per day and add it to the quote.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Add profit margin:</strong> You are running a business, not a charity. A
                15-25% profit margin on top of costs is standard for domestic electrical work. This
                is what allows you to invest in the business, save for quiet periods, and build
                financial security.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The most common pricing mistake on rewires is underestimating labour. A 3-bed semi rewire
          that you quote at 6 days might take 8 days once you account for the solid floor in the
          kitchen extension, the loft access that requires removing insulation, and the two trips to
          the wholesaler for additional materials. Build in a contingency or price for the realistic
          scenario, not the best case.
        </p>
        <SEOAppBridge
          title="AI Cost Engineer Prices Rewires for You"
          description="Describe the property and the specification, and the AI Cost Engineer generates a detailed quote — every cable, every accessory, every hour of labour, with real UK trade pricing. Adjust the specification, tweak the margin, and send a professional quote from your phone. Stop guessing and start earning what you deserve."
          icon={Brain}
        />
        <div className="mt-6">
          <SEOAppBridge
            title="Cable Sizing and Voltage Drop Calculators"
            description="Design the rewire properly with Elec-Mate's 70+ built-in calculators. Cable sizing calculator ensures every circuit uses the correct cable for the load, installation method, and grouping factors. Voltage drop calculator verifies compliance with BS 7671 Regulation 525. Maximum demand calculator sizes the main supply correctly."
            icon={Calculator}
          />
        </div>
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/house-rewire-guide',
    title: 'House Rewire Guide',
    description: 'Step-by-step guide to the rewiring process from survey to certification.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description: 'Current BS 7671 requirements for consumer units including Amendment 3.',
    icon: ShieldCheck,
    category: 'Regulations',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Calculate the correct cable size for any circuit — load, method, grouping, and temperature.',
    icon: Calculator,
    category: 'Calculator',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate',
    description:
      'Create the Electrical Installation Certificate required on completion of a rewire.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description: 'Which electrical work is notifiable and how to comply with Part P.',
    icon: Scale,
    category: 'Regulations',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Generate professional, detailed quotes for rewires and other electrical work.',
    icon: Receipt,
    category: 'Tool',
  },
];

export default function RewireCostUKPage() {
  return (
    <GuideTemplate
      title="Rewire Cost UK 2026 | How Much Does a House Rewire Cost?"
      description="Complete guide to house rewire costs in the UK for 2026. Average prices by property size (1-bed flat to 5-bed house), what affects the cost, what is included, first fix vs second fix, how long it takes, Part P requirements, and EIC certification."
      datePublished="2024-07-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          House Rewire Cost UK 2026:{' '}
          <span className="text-yellow-400">What You Should Actually Pay</span>
        </>
      }
      heroSubtitle="Honest, detailed pricing for a full house rewire in the UK. Average costs by property size, what affects the price, what is included, how long it takes, and the certificates you must receive. Updated for 2026."
      readingTime={16}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Rewire Costs"
      relatedPages={relatedPages}
      ctaHeading="Price rewires accurately with Elec-Mate"
      ctaSubheading="AI Cost Engineer, cable sizing calculator, voltage drop calculator, EIC certificates, and professional quoting tools. Start your 7-day free trial."
    />
  );
}
