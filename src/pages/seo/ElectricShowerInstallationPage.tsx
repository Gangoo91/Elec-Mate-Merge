import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Cable,
  Zap,
  Calculator,
  ShieldCheck,
  AlertTriangle,
  CircuitBoard,
  Wrench,
  FileCheck2,
  Home,
  Droplets,
  Gauge,
  GraduationCap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/electrical-installation' },
  { label: 'Electric Shower', href: '/guides/electric-shower-installation' },
];

const tocItems = [
  { id: 'shower-circuit-basics', label: 'Electric Shower Circuit Basics' },
  { id: 'kw-ratings', label: 'kW Ratings and Current Demand' },
  { id: 'cable-sizing', label: 'Cable Sizing by kW Rating' },
  { id: 'mcb-rating', label: 'MCB Rating and Type' },
  { id: 'isolation-switching', label: 'Pull Cord vs Ceiling Switch' },
  { id: 'rcd-protection', label: 'RCD and Additional Protection' },
  { id: 'part-p', label: 'Part P and Building Regulations' },
  { id: 'bathroom-zones', label: 'Bathroom Zones and IP Ratings' },
  { id: 'common-mistakes', label: 'Common Installation Mistakes' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Electric showers range from 7.5kW to 10.8kW (and some models up to 12kW), with cable sizes ranging from 6mm\u00B2 to 16mm\u00B2 depending on the kW rating and installation conditions.',
  'A dedicated radial circuit from the distribution board is mandatory — electric showers must never share a circuit with other equipment.',
  'A double-pole isolator must be installed adjacent to the shower, typically a ceiling-mounted pull-cord switch rated at 45A or 50A — this provides local isolation as required by BS 7671.',
  'Electric shower installation in a bathroom is notifiable work under Part P of the Building Regulations and must be carried out by a registered competent person or notified to Building Control.',
  "Elec-Mate's cable sizing calculator handles shower circuit design including correction factors, voltage drop, and Zs verification against BS 7671 tables.",
];

const faqs = [
  {
    question: 'What cable size do I need for a 9.5kW shower?',
    answer:
      'A 9.5kW electric shower draws approximately 41.3A at 230V. The standard cable for this load is 10mm\u00B2 twin and earth (6242Y) protected by a 40A or 45A MCB. Under Reference Method C (clipped direct), 10mm\u00B2 twin and earth has a current-carrying capacity of 64A — adequate with significant headroom. Under Reference Method A (enclosed in conduit in a thermally insulating wall), the capacity drops to 43A, which still covers the 41.3A load. However, if correction factors apply (grouping with other cables, high ambient temperature, or cables passing through thermal insulation), you must recalculate. In some cases, particularly where the cable passes through loft insulation, you may need to increase to 16mm\u00B2. Always check voltage drop for the actual cable length — a 15-metre run of 10mm\u00B2 at 41.3A gives a voltage drop of approximately 4.5V (within the 11.5V limit).',
  },
  {
    question: 'Can I use 6mm\u00B2 cable for an electric shower?',
    answer:
      "Yes, but only for lower-rated showers. A 6mm\u00B2 cable on a 32A MCB is suitable for showers up to approximately 7.2kW (31.3A at 230V). This covers some basic 7.5kW showers, but only if the actual current draw is within 32A — always check the manufacturer's data for the actual current rating, as some 7.5kW showers draw slightly more than 32A at the declared supply voltage. For any shower rated at 8.5kW or above, 6mm\u00B2 cable is not adequate. The most common shower ratings installed today are 8.5kW and 9.5kW, which require 10mm\u00B2 cable. If in doubt, size up — the additional cost of 10mm\u00B2 versus 6mm\u00B2 cable is small compared to the cost of having to replace the cable later if the homeowner upgrades the shower.",
  },
  {
    question: 'Do I need Part P notification for a shower installation?',
    answer:
      'Yes. Installing a new electric shower circuit is notifiable work under Part P of the Building Regulations because it involves a new circuit in a special location (bathroom). If you are registered with a competent person scheme (NICEIC, NAPIT, ELECSA), you can self-certify the work and notify Building Control directly through the scheme. If you are not registered, you must notify your local Building Control body before starting the work — they will arrange for the work to be inspected. Failure to notify is a criminal offence, and un-notified work can cause problems when the property is sold, as the solicitor will look for a Building Regulations completion certificate or a competent person scheme certificate for any electrical work in bathrooms.',
  },
  {
    question: 'What type of isolator switch do I need for a shower?',
    answer:
      'BS 7671 requires a means of local isolation for the shower circuit. This is typically a ceiling-mounted pull-cord switch rated at 45A or 50A (double-pole). The switch must be accessible from the shower position and must isolate both the line and neutral conductors (double-pole). A wall-mounted switch is acceptable if it is outside the bathroom zones (outside zones 0, 1, and 2 — typically outside the room or at least 0.6m horizontally from the bath or shower tray). In practice, the ceiling-mounted pull-cord switch is the standard solution for UK bathrooms because it can be positioned inside the room without violating the zone requirements (ceiling-mounted switches are considered outside zone 2 provided they are at ceiling level). The switch must be rated for the full load current of the shower circuit.',
  },
  {
    question: 'Can I replace a shower with a higher kW model on the same cable?',
    answer:
      'Only if the existing cable is rated to carry the higher current. For example, if the existing circuit uses 10mm\u00B2 cable on a 45A MCB, you can safely upgrade from a 9.5kW shower (41.3A) to a 10.5kW shower (45.7A) — but you would need to check that the MCB rating and cable capacity (after correction factors) still cover the higher current. Upgrading from a 7.5kW shower on 6mm\u00B2 cable to a 9.5kW shower is not possible without replacing the cable and MCB. Always verify the existing cable size, MCB rating, and cable condition before upgrading. If the cable is old or shows signs of degradation, it is good practice to install a new cable regardless of the size.',
  },
  {
    question: 'Where should the shower unit be positioned relative to the bathroom zones?',
    answer:
      'The electric shower unit itself is typically positioned in Zone 1 (directly above the bath or shower tray, up to 2.25m from the floor). Equipment installed in Zone 1 must be rated to at least IPX4 (splash-proof) and must be suitable for the zone. Electric showers designed for UK bathrooms meet this requirement. The supply cable to the shower should enter from above or from behind (through the wall), avoiding Zone 0 (inside the bath or shower tray). The double-pole isolator switch should be ceiling-mounted (outside Zone 2) or wall-mounted outside the zones entirely. The distribution board and MCB are outside the bathroom and outside all zones.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Calculate the correct cable size for any electric shower rating with automatic correction factors and voltage drop check.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description:
      'Check voltage drop for shower circuits — critical for longer cable runs on high-current circuits.',
    icon: Gauge,
    category: 'Tool',
  },
  {
    href: '/guides/bathroom-electrical-regulations',
    title: 'Bathroom Electrical Regulations',
    description:
      'Complete guide to bathroom zones, IP ratings, and BS 7671 requirements for electrical work in bathrooms.',
    icon: Droplets,
    category: 'Guide',
  },
  {
    href: '/guides/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description:
      'Which electrical work is notifiable, competent person schemes, and Building Control notification.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/cooker-circuit-guide',
    title: 'Cooker Circuit Guide',
    description:
      'Cable sizing, diversity factor, and circuit protection for dedicated cooker circuits.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/guides/radial-circuit-explained',
    title: 'Radial Circuit Explained',
    description:
      'How radial circuits work and when to use them — the foundation of every shower circuit design.',
    icon: Cable,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'shower-circuit-basics',
    heading: 'Electric Shower Circuit Basics',
    content: (
      <>
        <p>
          An electric shower heats cold mains water instantaneously using a high-power heating
          element. Because of the power required, electric showers are among the highest-current
          fixed appliances in a domestic installation — a 9.5kW shower draws over 41 amps. This
          means the shower must be supplied by a dedicated{' '}
          <SEOInternalLink href="/guides/radial-circuit-explained">radial circuit</SEOInternalLink>{' '}
          from the distribution board, with cable and protection sized specifically for the shower's
          kW rating.
        </p>
        <p>
          The circuit comprises four main elements: the MCB or RCBO at the{' '}
          <SEOInternalLink href="/guides/distribution-board-wiring">
            distribution board
          </SEOInternalLink>
          , the supply cable from the board to the bathroom, a double-pole isolator switch
          (typically a ceiling-mounted pull-cord), and the cable from the isolator to the shower
          unit itself. Each element must be correctly rated for the shower's full load current.
        </p>
        <p>
          Electric shower installation in a bathroom is notifiable work under{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Part P of the Building Regulations
          </SEOInternalLink>
          . It must be carried out by an electrician registered with a competent person scheme or
          notified to Building Control before the work starts. An{' '}
          <SEOInternalLink href="/guides/eic-certificate">
            Electrical Installation Certificate
          </SEOInternalLink>{' '}
          must be issued on completion.
        </p>
      </>
    ),
  },
  {
    id: 'kw-ratings',
    heading: 'kW Ratings and Current Demand',
    content: (
      <>
        <p>
          Electric showers are available in a range of kW ratings. The higher the kW rating, the
          more water the shower can heat to a comfortable temperature — and the more current it
          draws. Here are the common ratings and their approximate current demand at 230V:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>7.5kW</strong> — approximately 32.6A. Budget models, suitable for small
                bathrooms and low water flow. Cable: 6mm{'\u00B2'} on 32A MCB (tight) or 10mm
                {'\u00B2'} on 40A MCB (preferred).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>8.5kW</strong> — approximately 37A. Mid-range, most popular replacement
                model. Cable: 10mm{'\u00B2'} on 40A MCB.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>9.5kW</strong> — approximately 41.3A. High performance, good flow rate even
                in winter. Cable: 10mm{'\u00B2'} on 45A MCB.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>10.5kW</strong> — approximately 45.7A. Premium models, best flow rate.
                Cable: 10mm{'\u00B2'} on 45A MCB (check correction factors) or 16mm{'\u00B2'} on 50A
                MCB.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>10.8kW to 12kW</strong> — approximately 47A to 52A. High-end models. Cable:
                16mm{'\u00B2'} on 50A MCB. These require larger cable and may need a supply capacity
                check.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When advising customers, recommend sizing the cable for a potential future upgrade. If the
          customer installs an 8.5kW shower now, they may want to upgrade to a 9.5kW or 10.5kW model
          in a few years. Installing 10mm{'\u00B2'} cable from the start avoids having to replace
          the cable later.
        </p>
      </>
    ),
  },
  {
    id: 'cable-sizing',
    heading: 'Cable Sizing by kW Rating',
    content: (
      <>
        <p>
          The <SEOInternalLink href="/guides/cable-sizing-guide-bs7671">cable size</SEOInternalLink>{' '}
          depends on the shower rating, the installation method, and the applicable correction
          factors. The cable must carry the full load current continuously — diversity does not
          apply to electric shower circuits because the full load operates whenever the shower is in
          use.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Quick Reference: Shower Cable Sizes</h3>
          <div className="space-y-3 text-white text-sm">
            <p>
              <strong>7.5kW (32.6A):</strong> 6mm{'\u00B2'} on 32A MCB or 10mm{'\u00B2'} on 40A MCB
            </p>
            <p>
              <strong>8.5kW (37A):</strong> 10mm{'\u00B2'} on 40A MCB
            </p>
            <p>
              <strong>9.5kW (41.3A):</strong> 10mm{'\u00B2'} on 45A MCB
            </p>
            <p>
              <strong>10.5kW (45.7A):</strong> 10mm{'\u00B2'} on 45A MCB or 16mm{'\u00B2'} on 50A
              MCB
            </p>
            <p>
              <strong>10.8kW+ (47A+):</strong> 16mm{'\u00B2'} on 50A MCB
            </p>
          </div>
        </div>
        <p>
          These sizes assume standard installation conditions with no adverse correction factors. If
          the cable is grouped with other cables, passes through thermal insulation, or is installed
          in a high ambient temperature, apply the{' '}
          <SEOInternalLink href="/guides/correction-factors-guide">
            correction factors
          </SEOInternalLink>{' '}
          from Appendix 4 of BS 7671. After applying correction factors, the cable's adjusted
          current-carrying capacity must still exceed the MCB rating.
        </p>
        <p>
          Check{' '}
          <SEOInternalLink href="/guides/voltage-drop-guide-bs7671">voltage drop</SEOInternalLink>{' '}
          for the actual cable length and design current. Shower circuits often have longer cable
          runs because the distribution board may be on the ground floor and the shower on the first
          floor or in a loft conversion. A 20-metre run of 10mm{'\u00B2'} at 41.3A gives a voltage
          drop of approximately 6.1V — within the 11.5V limit, but check your specific run length.
        </p>
        <SEOAppBridge
          title="Size shower cables in seconds"
          description="Enter the shower kW rating, cable length, and installation method. Elec-Mate's cable sizing calculator applies all BS 7671 correction factors and checks voltage drop automatically. No manual Appendix 4 lookups."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'mcb-rating',
    heading: 'MCB Rating and Type for Shower Circuits',
    content: (
      <>
        <p>
          The MCB (or RCBO) at the distribution board must be rated to carry the full load current
          of the shower without tripping, while providing overcurrent protection for the cable.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCB rating selection</strong> — the MCB rated current (In) must be greater
                than or equal to the design current (Ib = shower current) and less than or equal to
                the cable's current-carrying capacity after correction factors (Iz). For a 9.5kW
                shower (41.3A), a 45A MCB is the standard choice with 10mm{'\u00B2'} cable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type B MCB</strong> — suitable for electric showers because the heating
                element is a resistive load with no significant inrush current. Type B trips at 3 to
                5 times rated current.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Disconnection time</strong> — the shower circuit supplies fixed equipment
                (not socket outlets), so the maximum disconnection time is 5 seconds. However, if
                the circuit is protected by a 30mA RCD (which it should be for a bathroom circuit),
                the RCD provides the primary protection against earth faults and the disconnection
                time is effectively instantaneous.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In a modern RCBO consumer unit, the shower circuit gets a dedicated RCBO combining
          overcurrent and 30mA RCD protection in a single device. This is the simplest and most
          reliable arrangement.
        </p>
      </>
    ),
  },
  {
    id: 'isolation-switching',
    heading: 'Pull Cord vs Ceiling Switch: Local Isolation',
    content: (
      <>
        <p>
          BS 7671 requires a means of local isolation for the shower circuit — a double-pole switch
          that disconnects both the line and neutral conductors. This switch must be accessible to
          the person using the shower and must be clearly identifiable.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Ceiling Pull-Cord Switch</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>Most common choice for UK bathrooms</li>
              <li>45A or 50A double-pole rating</li>
              <li>Ceiling-mounted — outside Zone 2</li>
              <li>Operated by pull cord — no direct hand contact</li>
              <li>Neon indicator shows on/off status</li>
              <li>Accessible while standing near the shower</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Wall-Mounted DP Switch</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>Must be outside zones 0, 1, and 2</li>
              <li>Often positioned outside the bathroom door</li>
              <li>45A or 50A double-pole rating</li>
              <li>Clear labelling required ("SHOWER")</li>
              <li>Used when ceiling mounting is impractical</li>
              <li>Must be readily accessible in an emergency</li>
            </ul>
          </div>
        </div>
        <p>
          The pull-cord ceiling switch is the standard choice for most UK bathroom installations
          because it can be positioned inside the room at ceiling height, which is outside the
          defined bathroom zones. A wall-mounted switch must be at least 0.6 metres horizontally
          from the edge of the bath or shower tray (outside Zone 2) — in small bathrooms, this often
          means mounting it outside the room entirely.
        </p>
      </>
    ),
  },
  {
    id: 'rcd-protection',
    heading: 'RCD and Additional Protection',
    content: (
      <>
        <p>
          Electric shower circuits require 30mA RCD protection under BS 7671. The specific
          regulations are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 701.411.3.3</strong> — all circuits in locations containing a
                bath or shower (Section 701) must be protected by a 30mA RCD, regardless of whether
                they supply socket outlets or fixed equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional protection</strong> — the 30mA RCD provides additional protection
                against direct contact faults. This is particularly important in bathrooms where the
                risk of electric shock is increased due to the presence of water and the user being
                in contact with earthed metalwork (pipes, taps, shower fittings).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supplementary bonding</strong> — under BS 7671:2018+A3:2024, supplementary
                bonding in bathrooms can be omitted if the installation meets certain conditions:
                all circuits in the bathroom are RCD-protected, the main protective bonding is
                confirmed, and all extraneous-conductive-parts are effectively bonded through the
                main bonding. In practice, many electricians still install supplementary bonding as
                a belt-and-braces approach.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When testing the completed installation, the{' '}
          <SEOInternalLink href="/guides/rcd-testing-guide">RCD must be tested</SEOInternalLink> at
          rated residual operating current (30mA) and at 5x (150mA). The trip times must be within
          300ms at 1x and 40ms at 5x.
        </p>
      </>
    ),
  },
  {
    id: 'part-p',
    heading: 'Part P and Building Regulations',
    content: (
      <>
        <p>
          Installing a new electric shower circuit is{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">
            notifiable work under Part P
          </SEOInternalLink>{' '}
          of the Building Regulations (England and Wales). This is because the work involves a new
          circuit in a special location (a room containing a bath or shower).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme route</strong> — if you are registered with NICEIC,
                NAPIT, ELECSA, or another competent person scheme, you can self-certify the work.
                The scheme provider notifies Building Control on your behalf and issues a Building
                Regulations compliance certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Control notification route</strong> — if you are not registered
                with a competent person scheme, you must notify Building Control before starting the
                work. They will arrange for an inspection during or after the installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certification</strong> — an Electrical Installation Certificate (EIC) must
                be issued for the new circuit. The EIC covers the design, construction, inspection,
                and testing of the installation and must be given to the customer on completion.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Simply replacing a shower unit on an existing circuit (like-for-like replacement) is not
          notifiable, provided no new wiring is installed and the circuit is not altered. However,
          if the new shower has a higher kW rating and the cable needs upgrading, that becomes a new
          circuit and is notifiable.
        </p>
      </>
    ),
  },
  {
    id: 'bathroom-zones',
    heading: 'Bathroom Zones and IP Ratings',
    content: (
      <>
        <p>
          <SEOInternalLink href="/guides/bathroom-electrical-regulations">
            Bathroom zone requirements
          </SEOInternalLink>{' '}
          under BS 7671 Section 701 define where electrical equipment can be installed relative to
          baths and showers. The three zones are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone 0</strong> — inside the bath or shower tray itself. Only SELV (12V)
                equipment rated IPX7 can be installed here. No electric shower components are placed
                in Zone 0.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone 1</strong> — directly above the bath or shower tray to a height of
                2.25m from the floor. Electric shower units are typically installed in Zone 1.
                Equipment must be rated at least IPX4 (splash-proof) and must be suitable for the
                zone. Current-using equipment (like the shower itself) is permitted if specifically
                designed for Zone 1 installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone 2</strong> — extends 0.6m horizontally from the edge of Zone 1, up to
                2.25m from the floor. Switches and accessories rated at least IPX4 are permitted.
                The pull-cord switch is typically ceiling-mounted (above Zone 2).
              </span>
            </li>
          </ul>
        </div>
        <p>
          Outside all zones, standard accessories can be used. The distribution board and MCB are
          always outside the bathroom and outside all zones. Cable routes should avoid Zones 0 and 1
          where possible, and cables in Zone 1 should be routed vertically to the shower unit from
          above or horizontally from behind the wall.
        </p>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Electric Shower Installation Mistakes',
    content: (
      <>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable undersized for the shower rating.</strong> Using 6mm{'\u00B2'} cable
                for a 9.5kW shower. This is a C1 (Danger Present) defect — the cable will overheat
                under normal operation. Always match the cable size to the kW rating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No local isolation switch.</strong> Connecting the shower directly to the
                supply cable without a double-pole isolator. BS 7671 requires a local means of
                isolation accessible from the shower position.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Single-pole switch instead of double-pole.</strong> A single-pole switch
                only disconnects the line conductor, leaving the neutral connected. The isolator
                must be double-pole to disconnect both conductors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD protection.</strong> All circuits in bathrooms require 30mA RCD
                protection. This is a mandatory requirement under Section 701 of BS 7671 and its
                absence would be coded C2 on an EICR.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not notifying Building Control.</strong> A new shower circuit in a bathroom
                is notifiable under Part P. Failure to notify can result in enforcement action and
                complications when the property is sold.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Create the EIC on site after installation"
          description="Elec-Mate generates the Electrical Installation Certificate for your new shower circuit on your phone. Enter the test results, describe the installation, and send the certificate to the customer instantly."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricShowerInstallationPage() {
  return (
    <GuideTemplate
      title="Electric Shower Installation | Cable Size & Circuit Guide"
      description="Complete guide to electric shower installation in the UK. Cable sizing for 7.5kW to 12kW showers, MCB rating, pull cord vs ceiling switch, RCD protection, bathroom zones, Part P notification, and common installation mistakes under BS 7671."
      datePublished="2025-06-20"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Droplets}
      heroTitle={
        <>
          Electric Shower Installation:{' '}
          <span className="text-yellow-400">Cable Size and Circuit Guide</span>
        </>
      }
      heroSubtitle="Electric showers draw up to 52 amps — making the shower circuit one of the most demanding in a domestic installation. This guide covers cable sizing for every kW rating, MCB selection, pull cord vs ceiling switch options, RCD protection, bathroom zone requirements, Part P notification, and the installation mistakes that result in EICR defects."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electric Shower Installation"
      relatedPages={relatedPages}
      ctaHeading="Design Shower Circuits with Elec-Mate"
      ctaSubheading="Cable sizing calculator, voltage drop checker, and digital EIC certificates on your phone. Join 430+ UK electricians designing and certifying shower installations on site. 7-day free trial."
    />
  );
}
