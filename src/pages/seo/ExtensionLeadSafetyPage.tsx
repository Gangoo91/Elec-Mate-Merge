import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import { ShieldCheck, Zap, FileCheck2, Home } from 'lucide-react';

// -------------------------------------------------------------------
// Shared layout classes — edge-to-edge on phones, inset from sm: up
// -------------------------------------------------------------------

// The article column is px-5 on phones (SEOPageShell), so -mx-5 is a true full
// bleed on mobile; from sm: up the cards inset and round as normal.
const tableWrap =
  '-mx-5 my-5 overflow-x-auto rounded-none border-y border-white/[0.12] bg-[hsl(0_0%_9%)] ' +
  'sm:mx-0 sm:rounded-2xl sm:border-x';

const cardWrap =
  '-mx-5 my-5 rounded-none border-y border-white/[0.12] bg-[hsl(0_0%_9%)] p-5 ' +
  'sm:mx-0 sm:rounded-2xl sm:border-x sm:p-6';

const th = 'px-4 py-3 text-left font-semibold text-white whitespace-nowrap';
const td = 'px-4 py-3 align-top text-white';
const tdNum = 'px-4 py-3 align-top text-white whitespace-nowrap tabular-nums';
const tdReg = 'px-4 py-3 align-top font-mono text-elec-yellow whitespace-nowrap';
const subHead = 'mt-8 mb-3 text-[17px] font-semibold tracking-tight text-white';
const termList = 'space-y-4 text-white';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrical Safety', href: '/guides/electrical-safety-at-home' },
  { label: 'Extension Lead Safety', href: '/extension-lead-safety' },
];

const tocItems = [
  { id: 'why-it-matters', label: 'Why Extension Lead Safety Matters' },
  { id: 'load-calculation', label: 'Load Calculation' },
  { id: 'daisy-chaining', label: 'Daisy-Chaining' },
  { id: 'rcd-protected-leads', label: 'RCD-Protected Extension Leads' },
  { id: 'coiled-cable-reels', label: 'Coiled Cable Reels' },
  { id: 'outdoor-use', label: 'Outdoor Extension Leads' },
  { id: 'when-to-upgrade', label: 'When to Get a Socket Installed' },
  { id: 'choosing-a-lead', label: 'Choosing a Safe Extension Lead' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Never exceed 13 A total across everything plugged into one extension lead — that is about 3,000 W at 230 V. Overloading is the leading cause of extension lead fires.',
  'Never daisy-chain extension leads (plug one into another) — it puts the whole combined load through the original socket and creates an extra connection that can arc.',
  'Always fully unwind a cable drum before applying any load. Coiled cable cannot shed the heat it generates and can melt its own insulation.',
  'Outdoor leads should be IP44 or better, and must be RCD-protected: BS 7671:2018+A4:2026 Reg 411.3.3(c) requires 30 mA RCD protection for mobile equipment rated up to 32 A used outdoors, with no risk-assessment exception.',
  'Reg 411.3.3 also requires 30 mA RCD protection for socket-outlets up to 32 A. The documented risk-assessment exception applies only to indent (b) — never where ordinary persons (BA1) or children (BA2) are liable to use the socket, so it is not available in a home.',
  'If an RCD lead trips repeatedly, treat it as a fault. Reg 531.3.2(c) expects total leakage downstream of an RCD to stay below 30% of its rating — 9 mA on a 30 mA device.',
  'If you need an extension lead permanently in the same spot, the right answer is an additional socket-outlet fitted by a registered electrician.',
];

const faqs = [
  {
    question: 'How many appliances can I plug into an extension lead?',
    answer:
      'There is no fixed maximum number of appliances — what matters is the total current draw. A standard UK extension lead is rated at 13 A, which at 230 V is a maximum of about 3,000 W. Add up the wattages of everything you intend to run at the same time and divide by 230 to get the total current in amps. That total must not exceed 13 A. High-wattage appliances such as kettles (2,500 W, about 10.9 A) or electric heaters (2,000-3,000 W) should not share an extension lead with anything else.',
  },
  {
    question: 'Is it safe to plug an extension lead into another extension lead?',
    answer:
      'No. Daisy-chaining extension leads is unsafe and should never be done. The combined load of everything on both leads passes through the original socket-outlet and through the plug-and-socket joint between the two leads, and neither is designed to be a permanent load-bearing connection. That joint can work loose under load and arc, which generates heat. If you need more outlets, use a single lead with enough sockets, or have additional sockets installed.',
  },
  {
    question: 'Do I need to uncoil my extension lead fully?',
    answer:
      'Yes, for cable drum extension leads. The reason is thermal, not magnetic: a conductor carrying current generates heat in proportion to the square of that current, and on a drum each turn of cable is surrounded by other warm turns and by the drum body, so the heat has nowhere to go. A coiled drum carrying a heavy load can exceed the temperature its insulation is rated for and melt it. Always unwind the drum completely before you plug the load in, even for a short run. If a drum carries a reduced rating for coiled use, that lower figure is the only load it may carry wound on.',
  },
  {
    question: 'What IP rating do I need for an outdoor extension lead?',
    answer:
      'Look for IP44 or better. The first digit, 4, means protection against solid objects of 1 mm and larger; the second digit, 4, means protection against splashing water from any direction. For very wet conditions or near irrigation, IP55 or higher is preferable. Never use an indoor-rated lead outdoors — its insulation and connectors are not built to keep moisture out. Note that IP44 is a product rating on the lead, not a figure set by BS 7671.',
  },
  {
    question: 'What is an RCD-protected extension lead?',
    answer:
      'It is an extension lead with a residual current device built into the plug or the socket block. The RCD monitors the current flowing out and back, and disconnects if the two do not match — which is what happens when current leaks to earth through a damaged cable or through a person. Choose 30 mA: that is the rating BS 7671 recognises for additional protection against electric shock. Higher ratings such as 100 mA or 300 mA are used for fire protection and will not protect a person. Under Reg 643.8, a general non-delay RCD is deemed effective where it disconnects within 300 ms on an AC test at its rated residual operating current.',
  },
  {
    question: 'Why does my RCD extension lead keep tripping?',
    answer:
      'Repeated tripping is nearly always leakage to earth, not a faulty RCD. Every connected appliance leaks a small current to earth even when healthy, and BS 7671 Reg 531.3.2(c) expects the accumulated protective conductor and earth leakage current downstream of an RCD to stay below 30% of its rated residual operating current — 9 mA on a 30 mA device. Several tools or appliances on one lead can reach that between them before anything is actually wrong. Damp connectors, wet tools and water-ingress in a damaged cable all add leakage. Unplug everything, then reconnect one item at a time to find the culprit. Never fit a higher-rated RCD or bypass one to stop the tripping.',
  },
  {
    question: 'Can I use an extension lead permanently?',
    answer:
      'Extension leads are designed for temporary use. Running one permanently — especially under carpets, around door frames, or anywhere it is hidden and cannot be inspected — is a fire risk. If you regularly need power in the same position, have a registered electrician install additional socket-outlets. It is safer, it is neater, and the work is certificated.',
  },
  {
    question: 'What fuse should be in an extension lead plug?',
    answer:
      'BS 7671 Table 55.1 lists BS 1363 as the standard for 13 A fused plugs and shuttered socket-outlets, with fuses to BS 1362. Most extension leads are rated 13 A and take a 13 A fuse (brown). Lighter-duty leads and trailing sockets may be rated lower and fitted with a smaller fuse — check the rating label on the lead rather than assuming. Never fit a higher-rated fuse to stop a lead blowing: a fuse that keeps operating is reporting a fault that needs investigating.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrical-safety-at-home',
    title: 'Electrical Safety at Home',
    description:
      'Complete guide to home electrical safety including RCD testing, socket hazards, and DIY rules.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/power-surge-protection',
    title: 'Power Surge Protection',
    description:
      'SPDs explained — Type 1, Type 2, and Type 3 surge protection devices and BS 7671 requirements.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/finding-emergency-electrician',
    title: 'Finding an Emergency Electrician',
    description:
      'What counts as an electrical emergency and how to find a 24/7 NICEIC-registered electrician.',
    icon: ShieldCheck,
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
    id: 'why-it-matters',
    heading: 'Why Extension Lead Safety Matters',
    content: (
      <>
        <p>
          Extension leads are among the most commonly misused items in UK homes and workplaces. Four
          habits account for almost all of the harm they cause: loading them past 13 A, plugging one
          into another, running them straight off a coiled drum, and taking an indoor lead outside.
          Each of those is a fire or shock risk on its own, and they tend to happen together.
        </p>
        <p>
          The good news is that every one of them is avoidable without any specialist knowledge. The
          rest of this guide covers the load limit, the two rules that are never worth breaking, the
          RCD requirements that BS 7671:2018+A4:2026 actually sets, and the point at which a fixed
          socket-outlet becomes the correct answer.
        </p>
      </>
    ),
  },
  {
    id: 'load-calculation',
    heading: 'Load Calculation: Do Not Exceed 13 A',
    content: (
      <>
        <p>
          A standard UK extension lead is rated at 13 A. At 230 V that is a ceiling of roughly 3,000
          W across everything plugged into it at once — not per socket. To check a combination,
          divide each appliance wattage by 230 and add up the results.
        </p>
        <div className={cardWrap}>
          <p className="text-[15px] font-semibold text-white">Amps = Watts ÷ 230 V</p>
          <p className="mt-2 text-[14.5px] leading-relaxed text-white">
            13 A × 230 V = 2,990 W. Once the running total passes 13 A, something has to come off
            the lead.
          </p>
        </div>
        <div className={tableWrap}>
          <table className="w-full min-w-[420px] border-collapse text-[14.5px]">
            <thead className="border-b border-white/[0.12]">
              <tr>
                <th className={th}>Appliance</th>
                <th className={th}>Typical power</th>
                <th className={th}>Approx. current at 230 V</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.08]">
              <tr>
                <td className={td}>Kettle</td>
                <td className={tdNum}>2,500 W</td>
                <td className={tdNum}>10.9 A</td>
              </tr>
              <tr>
                <td className={td}>Electric heater</td>
                <td className={tdNum}>2,000 W</td>
                <td className={tdNum}>8.7 A</td>
              </tr>
              <tr>
                <td className={td}>Microwave</td>
                <td className={tdNum}>1,000 W</td>
                <td className={tdNum}>4.3 A</td>
              </tr>
              <tr>
                <td className={td}>Television</td>
                <td className={tdNum}>100 W</td>
                <td className={tdNum}>0.4 A</td>
              </tr>
              <tr>
                <td className={td}>Laptop charger</td>
                <td className={tdNum}>65 W</td>
                <td className={tdNum}>0.3 A</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          A kettle alone draws close to 11 A — almost the whole capacity of the lead. Add the
          microwave and you are over the limit before anything else is plugged in. Heating loads are
          the ones that catch people out; electronics barely register.
        </p>
        <p>
          Check the rating label on the back or underside of each appliance and add the totals.
          Extension leads carry a maximum load label too, and it is worth reading: some economy
          leads are rated below 13 A even though they are fitted with a 13 A plug fuse.
        </p>
      </>
    ),
  },
  {
    id: 'daisy-chaining',
    heading: 'Daisy-Chaining Extension Leads: Never Do It',
    content: (
      <>
        <p>
          Daisy-chaining — plugging one extension lead into another — is one of the most dangerous
          things you can do with extension leads. It is prohibited in many workplace settings and is
          a common cause of electrical fires in homes.
        </p>
        <div className={cardWrap}>
          <ul className={termList}>
            <li>
              <strong>Compound overloading.</strong> The total load on the chain appears at the
              original socket-outlet and at the joint between the two leads. That original socket,
              its wiring and its plug connection carry the full combined load, however sensible each
              individual lead looks.
            </li>
            <li>
              <strong>Arcing at the joint.</strong> The connection between the first lead&rsquo;s
              socket and the second lead&rsquo;s plug is a mechanical contact that can work loose
              under load. A loose contact under load arcs, and arcing generates heat inside a
              plastic enclosure.
            </li>
            <li>
              <strong>The correct answer.</strong> Use one lead with enough sockets, or have extra
              socket-outlets installed. See the section below on when to upgrade.
            </li>
          </ul>
        </div>
        <h3 className={subHead}>Where AFDDs fit in</h3>
        <p>
          An arc fault detection device (AFDD) watches a circuit continuously and disconnects it on
          the current signature of a series arc — exactly what a worn or loosened plug connection
          produces. It catches a fault that a fuse or MCB cannot see, because an arcing loose
          connection does not necessarily draw enough current to operate either of them.
        </p>
        <p>
          BS 7671:2018+A4:2026 Regulation 421.1.7 was redrafted at Amendment 4. AFDDs conforming to
          BS EN 62606 are now <strong>required</strong> for single-phase AC final circuits supplying
          socket-outlets rated up to 32 A in high-rise residential buildings, houses in multiple
          occupation, purpose-built student accommodation and care homes. For all other premises,
          including an ordinary house, the regulation <strong>recommends</strong> them rather than
          requiring them. Where they are used they must be placed at the origin of the circuit
          protected (Reg 421.1.7, and Reg 532.6 for AC single-phase circuits not exceeding 230 V) —
          in practice, in the consumer unit. Fitting one does not remove the need for the other
          protective measures BS 7671 requires.
        </p>
      </>
    ),
  },
  {
    id: 'rcd-protected-leads',
    heading: 'RCD-Protected Extension Leads',
    content: (
      <>
        <p>
          A residual current device compares the current flowing out along the line conductor with
          the current returning along the neutral. If they differ, current is escaping somewhere it
          should not — through a damaged cable, a wet connection, or a person — and the RCD
          disconnects. A 30 mA device is the rating BS 7671 recognises for additional protection
          against electric shock. Under Reg 643.8, a general non-delay RCD is deemed effective where
          it disconnects within 300 ms on an alternating current test at its rated residual
          operating current.
        </p>
        <h3 className={subHead}>What Regulation 411.3.3 actually requires</h3>
        <p>
          Amendment 4 redrafted Reg 411.3.3 into three indents. In AC systems, additional protection
          by an RCD rated not more than 30 mA shall be provided for:
        </p>
        <div className={tableWrap}>
          <table className="w-full min-w-[560px] border-collapse text-[14.5px]">
            <thead className="border-b border-white/[0.12]">
              <tr>
                <th className={th}>Indent</th>
                <th className={th}>Applies to</th>
                <th className={th}>Risk-assessment exception?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.08]">
              <tr>
                <td className={tdReg}>411.3.3(a)</td>
                <td className={td}>
                  Socket-outlets rated up to 32 A in locations where they are liable to be used by
                  ordinary persons (BA1) or children (BA2)
                </td>
                <td className={td}>No</td>
              </tr>
              <tr>
                <td className={tdReg}>411.3.3(b)</td>
                <td className={td}>Socket-outlets rated up to 32 A in other locations</td>
                <td className={td}>
                  Yes — only on a suitably documented risk assessment undertaken with the
                  involvement of a skilled person (electrically), supplied with the certificate
                </td>
              </tr>
              <tr>
                <td className={tdReg}>411.3.3(c)</td>
                <td className={td}>
                  Mobile equipment rated up to 32 A for use outdoors — power tools, mowers, hedge
                  trimmers
                </td>
                <td className={td}>No</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Two things follow. A home is a location liable to be used by ordinary persons and
          children, so indent (a) applies and there is no exception to fall back on. And anything
          portable you take outside falls under indent (c) in its own right — so a mower or a drill
          used in the garden needs 30 mA RCD protection whether or not the socket it is fed from
          happens to have it.
        </p>
        <p>
          That protection can come from the RCD or RCBO in the consumer unit, from an RCD built into
          the lead, or from a plug-in RCD adaptor that sits between the plug and the socket. All
          three work; the point is that one of them is present.
        </p>
        <h3 className={subHead}>Why an RCD lead trips constantly</h3>
        <p>
          Persistent tripping is normally leakage, not a defective device. Every healthy appliance
          leaks a small current to earth, and Reg 531.3.2(c) expects the accumulated protective
          conductor and earth leakage currents downstream of an RCD to be no more than 30% of its
          rated residual operating current — <strong>9 mA on a 30 mA RCD</strong>. Put several
          tools, a jet washer and a site radio on one lead and they can pass that between them with
          nothing actually faulty.
        </p>
        <div className={cardWrap}>
          <ul className={termList}>
            <li>
              <strong>Split the load.</strong> Reg 531.3.2(a) and (b), and Reg 314.1(d), address
              exactly this: subdivide circuits so that normal leakage does not trip the device.
              Practically, run high-leakage tools off their own lead rather than ganging everything
              onto one.
            </li>
            <li>
              <strong>Dry the connections.</strong> Water in a plug, a socket or a nicked cable is a
              leakage path. Damp is the single most common cause of an outdoor lead tripping in the
              rain.
            </li>
            <li>
              <strong>Find the appliance.</strong> Unplug everything, reset, then add items back one
              at a time. The one that trips it is the one to have looked at.
            </li>
            <li>
              <strong>Never work around it.</strong> Do not fit a higher-rated RCD, bypass the
              device or hold the test button. A device that keeps operating is reporting something.
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'coiled-cable-reels',
    heading: 'Coiled Cable Reels: Always Uncoil Fully',
    content: (
      <>
        <p>
          Cable drum extension leads carry a hazard that flat leads do not: they overheat if used
          while still wound on the drum.
        </p>
        <div className={cardWrap}>
          <ul className={termList}>
            <li>
              <strong>Why coiling overheats.</strong> A conductor carrying current generates heat in
              proportion to the square of that current (P = I²R). On a drum, every turn of cable is
              surrounded by other warm turns and by the drum body, so the heat has nowhere to go.
              The temperature climbs until the cable is losing as much heat as it makes — and on a
              fully wound drum under load that point can be well above what the insulation is rated
              for.
            </li>
            <li>
              <strong>The fire risk is real.</strong> Wound drums are a known cause of fires. The
              insulation softens and melts, the conductors touch each other or the drum, and it goes
              from there. Under a heavy load it does not take long.
            </li>
            <li>
              <strong>The rule.</strong> Unwind the whole cable before you plug anything in, even
              for a short run. If the drum carries a separate reduced rating for coiled use, that
              lower figure is the only load it may carry wound on — and it is usually a few hundred
              watts, not enough for a heater or a kettle.
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'outdoor-use',
    heading: 'Outdoor Extension Leads: IP Rating and RCD Requirements',
    content: (
      <>
        <p>
          Choosing a lead for outdoor power tools comes down to four checks. Get these right and the
          lead will neither overheat nor nuisance-trip.
        </p>
        <div className={tableWrap}>
          <table className="w-full min-w-[520px] border-collapse text-[14.5px]">
            <thead className="border-b border-white/[0.12]">
              <tr>
                <th className={th}>Check</th>
                <th className={th}>What good looks like</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.08]">
              <tr>
                <td className={td}>Weather rating</td>
                <td className={td}>
                  IP44 or better, marked on the lead body itself and not only on the packaging.
                  Higher, such as IP55, for very wet conditions
                </td>
              </tr>
              <tr>
                <td className={td}>RCD</td>
                <td className={td}>
                  30 mA — built into the lead, a plug-in adaptor, or the socket it feeds from. Reg
                  411.3.3(c) requires it for mobile equipment up to 32 A used outdoors, with no
                  exception
                </td>
              </tr>
              <tr>
                <td className={td}>Cable</td>
                <td className={td}>
                  Fully unwound off the drum before any load is applied, and long enough to reach
                  without a second lead joined on
                </td>
              </tr>
              <tr>
                <td className={td}>Load</td>
                <td className={td}>
                  Everything running at once under 13 A in total, about 3,000 W. One tool per lead
                  where the tool is a heavy one
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          IP44 is a product rating under BS EN 60529, not a figure set by BS 7671. The first digit
          means protection against solid objects of 1 mm and larger; the second means protection
          against splashing water from any direction. An indoor lead has neither, which is why it
          must never be used in a garden, on a patio, or anywhere it can be rained on.
        </p>
        <div className={cardWrap}>
          <ul className={termList}>
            <li>
              <strong>Keep the connections out of the wet.</strong> Even a weatherproof lead should
              not have its socket end lying in standing water. If a connection does get wet, let it
              dry completely before reconnecting.
            </li>
            <li>
              <strong>Store it indoors.</strong> UV, frost and temperature cycling degrade the
              sheath. Bring outdoor leads in after use and look them over before each use for
              cracking, cuts and crushed sections.
            </li>
            <li>
              <strong>Watch the leakage.</strong> Wet tools and damp connectors are the usual reason
              an outdoor lead trips repeatedly — see the RCD section above before assuming the
              device is faulty.
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'when-to-upgrade',
    heading: 'When to Get a Socket Installed Instead',
    content: (
      <>
        <p>
          Extension leads are a temporary solution. If you are reaching for one in the same place
          every day, or running leads across floors, under rugs or through doorways, it is time to
          have a qualified electrician fit additional socket-outlets.
        </p>
        <div className={cardWrap}>
          <ul className={termList}>
            <li>
              <strong>Cost.</strong> Adding a double socket-outlet is commonly quoted in the region
              of £80 to £200 depending on the position and how easily new cable can be run. It is a
              one-off cost that removes a standing risk.
            </li>
            <li>
              <strong>Certification.</strong> A socket-outlet fitted by a registered electrician
              comes with an Electrical Installation Certificate or a Minor Electrical Installation
              Works Certificate, recording the tests carried out and the compliance of the work.
            </li>
            <li>
              <strong>Outdoor sockets.</strong> If you use power tools or garden equipment
              regularly, a dedicated weatherproof outdoor socket is far better than feeding a lead
              out through a window or door every time.
            </li>
          </ul>
        </div>
        <div className={cardWrap}>
          <p className="text-[15px] font-semibold text-white">
            What A4:2026 means for a new socket
          </p>
          <p className="mt-2 text-[14.5px] leading-relaxed text-white">
            Under Reg 411.3.3, a new or replacement socket-outlet rated up to 32 A in a home needs
            additional protection by an RCD not exceeding 30 mA, and the documented risk-assessment
            exception is not available where ordinary persons or children are liable to use it. That
            protection usually comes from an RCD or RCBO in the consumer unit. Where running a new
            protected circuit is impractical, Reg 531.3.6 also recognises a socket-outlet
            incorporating an RCD (an SRCD) to BS 7288 for additional protection — but note that BS
            7288 devices are intended to provide additional protection only, so the circuit still
            needs its fault protection from the device at the origin.
          </p>
        </div>
        <p>
          In England and Wales this work sits under Part P of the Building Regulations: it must
          either be notified to building control or carried out by a registered competent person who
          self-certifies it. Scotland and Northern Ireland have their own equivalent building
          standards. A NICEIC or NAPIT registered electrician can handle the notification as part of
          the job.
        </p>
      </>
    ),
  },
  {
    id: 'choosing-a-lead',
    heading: 'Choosing a Safe Extension Lead',
    content: (
      <>
        <p>
          Not all extension leads on the UK market are equal. Very cheap leads may use undersized
          conductors or sub-standard insulation, which makes them unsafe at the current printed on
          the label.
        </p>
        <div className={cardWrap}>
          <ul className={termList}>
            <li>
              <strong>A BS 1363 plug.</strong> BS 7671 Table 55.1 lists BS 1363 as the standard for
              13 A fused plugs and shuttered socket-outlets, with fuses to BS 1362, and Reg
              553.1.201 requires socket-outlets for household use to be of the shuttered type. Look
              for the BS 1363 marking moulded into the plug body — an unmarked plug is a warning
              sign.
            </li>
            <li>
              <strong>UKCA or CE marking.</strong> This is the manufacturer&rsquo;s declaration that
              the lead has been assessed against the applicable safety standards. Avoid anything
              without clear conformity marking.
            </li>
            <li>
              <strong>Conductor size.</strong> A lead intended for the full 13 A should state its
              conductor size, and a thin flex on a 13 A label is the classic corner cut — it will
              get hot long before the fuse notices. Good leads print the size on the sheath.
            </li>
            <li>
              <strong>Individually switched sockets.</strong> Being able to switch an appliance off
              without unplugging it makes the lead easier to live with and cuts the standby load
              sitting on it.
            </li>
            <li>
              <strong>Surge protection, for electronics only.</strong> For computers, televisions
              and audio equipment, a surge-protected lead adds metal oxide varistors that clamp
              voltage spikes. It does nothing for overload or shock risk. See our guide on{' '}
              <SEOInternalLink href="/power-surge-protection">
                power surge protection
              </SEOInternalLink>{' '}
              for the detail.
            </li>
          </ul>
        </div>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ExtensionLeadSafetyPage() {
  return (
    <GuideTemplate
      title="Extension Lead Safety: 13A Max, 30mA RCD, IP44"
      description="Never exceed 13 A (about 3,000 W) on one extension lead, never daisy-chain leads, fully uncoil cable drums, and use IP44 with a 30 mA RCD outdoors."
      datePublished="2026-03-27"
      dateModified="2026-08-07"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Safety Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Extension Lead Safety UK: <span className="text-elec-yellow">The Complete Guide</span>
        </>
      }
      heroSubtitle="How to use extension leads safely in the UK — the 13 A load limit, why daisy-chaining and coiled drums start fires, what BS 7671:2018+A4:2026 requires for RCD protection outdoors, and when a fixed socket is the right answer."
      readingTime={10}
      answerBox={{
        question: 'Are extension leads safe to use permanently in the UK?',
        answer:
          'Extension leads are designed for temporary use, not permanent wiring. The main risks are overloading (a standard 4-gang lead is rated 13 A total — the combined appliance wattages must stay under roughly 3,000 W), daisy-chaining leads together, using a cable drum still wound, and trailing-cable trip hazards. For a load needed permanently, have an electrician fit a fixed socket-outlet. Outdoors, BS 7671 Reg 411.3.3(c) requires 30 mA RCD protection for mobile equipment rated up to 32 A.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Extension Lead Safety"
      relatedPages={relatedPages}
      ctaHeading="Are You an Electrician? Try Elec-Mate Free"
      ctaSubheading="Complete EICRs on your phone, generate quotes instantly, and manage all your certificates in one place. Join 1,600+ UK electricians. 7-day free trial."
    />
  );
}
