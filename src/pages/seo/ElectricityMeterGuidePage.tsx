import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  FileCheck2,
  AlertTriangle,
  CheckCircle,
  Home,
  ShieldCheck,
  Clock,
  PoundSterling,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrical Guides', href: '/electrical-safety-at-home' },
  { label: 'Electricity Meter Guide', href: '/electricity-meter-guide' },
];

const tocItems = [
  { id: 'meter-types', label: 'Types of Electricity Meter' },
  { id: 'smart-meters', label: 'Smart Meters (SMETS2)' },
  { id: 'time-of-use', label: 'Time-of-Use Tariffs' },
  { id: 'how-to-read', label: 'How to Read Your Meter' },
  { id: 'estimated-bills', label: 'Estimated vs Actual Bills' },
  { id: 'faulty-meter', label: 'If Your Meter Is Faulty' },
  { id: 'meter-tampering', label: 'Meter Tampering' },
  { id: 'work-near-meter', label: 'Electrical Work Near the Meter' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The three main types of domestic electricity meter in the UK are single-rate (standard), Economy 7 dual-rate, and smart meters (SMETS2).',
  'SMETS2 smart meters communicate via the national Smart Metering Wide Area Network (WAN) and work with any supplier — meaning they do not go "dumb" if you switch energy supplier.',
  'Time-of-use tariffs such as Octopus Agile allow you to pay less for electricity during off-peak periods and charge EVs or heat pumps cheaply overnight.',
  'If you suspect your meter is faulty, contact your energy supplier — do not attempt to open or adjust the meter yourself. Your supplier can arrange a meter accuracy test.',
  'Meter tampering (bypassing or interfering with an electricity meter) is a criminal offence under the Theft Act 1968 and the Electricity Act 1989, with potential for imprisonment.',
  'Any electrical work that requires access to or work near the meter tails (the cables between the meter and consumer unit) must involve your Distribution Network Operator (DNO).',
];

const faqs = [
  {
    question: 'What is the difference between SMETS1 and SMETS2 smart meters?',
    answer:
      'SMETS1 (Smart Metering Equipment Technical Specifications version 1) meters were the first generation of smart meters installed from around 2011 onwards. A key problem with SMETS1 meters was that they often went "dumb" — losing smart functionality — when a customer switched energy supplier, reverting to behaving like a traditional meter. SMETS2 meters (from around 2018 onwards) communicate via a national Wide Area Network (WAN) managed by the DCC (Data Communications Company), making them supplier-agnostic. All meters being installed now are SMETS2.',
  },
  {
    question: 'Do I have to have a smart meter?',
    answer:
      'No — as of 2026, there is no legal obligation for domestic customers in the UK to accept a smart meter installation. Energy suppliers have targets to offer smart meters to all customers but cannot force installation. However, some time-of-use tariffs (such as Octopus Agile) require a smart meter to function, as they need half-hourly consumption data to bill correctly.',
  },
  {
    question: 'How do I read a traditional electricity meter?',
    answer:
      'For a standard digital display meter, read the digits from left to right, ignoring any digit shown in red or after a decimal point. For older analogue (dial) meters, read the dials from left to right — where the pointer is between two numbers, always read the lower number, except where it is between 9 and 0, in which case read 9. Ignore the final red dial. If in doubt, take a photograph of the meter display and submit that as your reading to your supplier.',
  },
  {
    question: 'What should I do if I think my electricity meter is running fast?',
    answer:
      'Contact your energy supplier and request a meter accuracy test. Suppliers are obliged to test your meter if you request it. If the meter is found to be inaccurate, your supplier must replace it and may refund overbilled amounts. If it tests accurate (within the ±2% tolerance), you may be charged for the test (typically £50 to £150). Do not attempt to open or adjust the meter yourself — this is illegal.',
  },
  {
    question: 'What is an Economy 7 meter and is it worth having?',
    answer:
      'Economy 7 meters record usage at two different rates — a cheaper overnight rate (typically midnight to 7am, though exact hours vary by supplier and region) and a higher daytime rate. Economy 7 was originally designed for storage heaters that charge overnight and release heat during the day. It can be beneficial if you use the majority of your electricity overnight — for example if you charge an electric vehicle or use a heat pump with a thermal store. If most of your usage is during the day, the higher daytime rate means Economy 7 could cost you more overall.',
  },
  {
    question: 'Can an electrician work near the electricity meter?',
    answer:
      'The meter and the meter tails (the cables from the meter to the consumer unit) are normally the property and responsibility of the energy supplier or Distribution Network Operator (DNO). Electricians can work on the consumer unit side of the meter tails but must not cut or disturb the meter tails or anything upstream of the main switch without DNO authorisation. If meter tail work is required — for example to extend them as part of a consumer unit relocation — the electrician must contact the DNO to make arrangements.',
  },
  {
    question: 'What happens if I am caught tampering with my electricity meter?',
    answer:
      'Meter tampering is a criminal offence under both the Theft Act 1968 and the Electricity Act 1989. Convictions can result in imprisonment (up to five years under the Theft Act) and a fine with no statutory limit. Energy suppliers and DNOs actively monitor for evidence of tampering through pattern analysis of smart meter data, physical inspections, and reports from neighbours. Back-billing for estimated stolen energy can run to tens of thousands of pounds.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/electrical-safety-at-home',
    title: 'Electrical Safety at Home',
    description:
      'Complete guide to home electrical safety including RCD testing and when to call an electrician.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/power-surge-protection',
    title: 'Power Surge Protection',
    description: 'Protect your home from power surges with Type 1, 2, and 3 SPDs.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-replacement-cost',
    title: 'Consumer Unit Replacement',
    description: 'How much it costs to replace a consumer unit and upgrade your fuse box.',
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
    id: 'meter-types',
    heading: 'Types of Electricity Meter in UK Homes',
    content: (
      <>
        <p>
          Understanding what type of electricity meter you have helps you manage your energy use
          effectively and ensure your bills are accurate. There are three main types of domestic
          electricity meter in use in the UK.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong>Single-rate (standard) meter</strong>
                <p className="mt-1">
                  The most common type. Records all electricity consumption at a single rate
                  regardless of time of day. Displays one reading register. Compatible with all
                  standard single-rate tariffs. Available in analogue (older rotating dial meters)
                  and digital display versions.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong>Economy 7 dual-rate meter</strong>
                <p className="mt-1">
                  Records electricity usage at two different rates — a cheaper overnight rate and a
                  more expensive daytime rate. Displays two register readings, often labelled
                  "Night" and "Day" or "Rate 1" and "Rate 2". Designed for use with storage heaters
                  and other overnight loads. The exact hours of the cheap rate vary by supplier and
                  region.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong>Smart meter (SMETS2)</strong>
                <p className="mt-1">
                  Records electricity consumption in half-hourly intervals and transmits the data
                  automatically to your supplier via the national Smart Metering Wide Area Network
                  (WAN). No manual meter readings required. Compatible with time-of-use tariffs.
                  Includes an In-Home Display (IHD) that shows your real-time energy usage and
                  estimated cost. All new installations since around 2018 are SMETS2.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'smart-meters',
    heading: 'Smart Meters (SMETS2): What You Need to Know',
    content: (
      <>
        <p>
          The UK government's smart meter rollout aims to replace all traditional meters with smart
          meters. As of 2026, approximately 60% of domestic meters in Great Britain are smart
          meters. All new smart meter installations use SMETS2 technology.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>How SMETS2 works</strong> — SMETS2 meters communicate via the national Smart
                Metering Wide Area Network, managed by the Data Communications Company (DCC).
                Because the meter communicates with a central national infrastructure rather than
                directly with your supplier, it continues to function as a smart meter even if you
                switch energy suppliers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Half-hourly data</strong> — SMETS2 meters record your energy consumption in
                30-minute intervals. This granular data is what makes time-of-use tariffs possible —
                your supplier can see exactly how much electricity you used at each time of day and
                bill accordingly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>In-Home Display (IHD)</strong> — your smart meter installation should
                include an IHD — a small wireless display unit that shows your current electricity
                usage in watts, your daily and weekly costs, and your meter readings. Keeping the
                IHD visible in your kitchen or living room helps raise awareness of energy use.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Privacy</strong> — you can choose how often your smart meter shares data
                with your supplier: every 30 minutes, daily, or monthly. You can change this
                preference by contacting your supplier. More frequent data sharing is required to
                access time-of-use tariffs.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'time-of-use',
    heading: 'Time-of-Use Tariffs: Octopus Agile and Others',
    content: (
      <>
        <p>
          Time-of-use (TOU) tariffs charge different prices for electricity at different times of
          day. They require a SMETS2 smart meter to function. They can offer significant savings for
          households with flexible loads — particularly EV owners and those with heat pumps or
          battery storage.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Octopus Agile</strong> — arguably the most well-known UK TOU tariff, Agile
                prices electricity in half-hourly slots based on the wholesale market price. Prices
                vary from very cheap (or occasionally negative — you are paid to use electricity)
                during low-demand periods such as windy nights, to higher during peak demand. An IHD
                or smart home system is helpful for managing your usage to take advantage of cheap
                periods.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overnight EV charging</strong> — most TOU tariffs offer a significantly
                cheaper overnight rate, typically midnight to 6am or 7am. For an EV owner charging
                from a low overnight rate, the savings compared to a flat-rate tariff can be
                substantial — effectively reducing the per-mile fuel cost to 2p to 4p per mile in
                many cases.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heat pump synergy</strong> — heat pumps can be paired with a thermal store
                and programmed to heat the store overnight using cheap electricity, then use the
                stored heat during the day. TOU tariffs make this significantly more economical.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>TOU tariffs require behaviour change</strong> — to benefit from a TOU tariff
                you need to shift discretionary loads (dishwasher, washing machine, EV charging)
                away from peak evening hours. Households that cannot or will not shift loads may pay
                more on a TOU tariff than on a flat rate.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'how-to-read',
    heading: 'How to Read Your Electricity Meter',
    content: (
      <>
        <p>
          Providing regular meter readings to your supplier ensures your bills are based on actual
          consumption rather than estimates. Here is how to read the most common meter types.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Digital display meter</strong> — read the digits shown on the display from
                left to right. Ignore any numbers shown in red or after a decimal point. For Economy
                7 meters, the display will cycle through two readings labelled R1 (or Day) and R2
                (or Night) — record both.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Analogue dial meter</strong> — read the dials left to right. For each dial,
                note the number the pointer has just passed (i.e., the lower number). If the pointer
                appears exactly on a number, write it down and put a question mark next to it —
                check the next dial to the right to confirm. Ignore the final dial (usually marked
                1/10). Ignore any red dials.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart meter</strong> — your SMETS2 meter automatically transmits readings to
                your supplier. If you need to read it manually (for a supplier switch or a
                complaint), press the button on the meter face to cycle through the display. Look
                for the reading labelled IMP (import — electricity you have consumed) in kWh.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'estimated-bills',
    heading: 'Estimated vs Actual Bills',
    content: (
      <>
        <p>
          If you do not have a smart meter and do not submit regular readings, your supplier will
          estimate your consumption based on historical usage data. Estimated bills can lead to
          overpaying or underpaying — resulting in a large catch-up bill later.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Submit readings at least quarterly</strong> — most suppliers accept online
                meter readings and will issue an accurate bill immediately. Quarterly readings are
                the minimum; monthly is better if your usage varies seasonally.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Back-billing limit</strong> — UK energy suppliers cannot back-bill for
                energy used more than 12 months before the bill date if the error was not the
                customer's fault. This provides protection against very large catch-up bills from
                long periods of underestimation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Read your meter when you move</strong> — always take a meter reading on the
                day you move in or out of a property and photograph the meter display. This prevents
                you being billed for the previous occupant's usage or losing energy credit on
                departure.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'faulty-meter',
    heading: 'If You Think Your Meter Is Faulty',
    content: (
      <>
        <p>
          Electricity meters are generally very reliable and rarely fault — but it does happen.
          Signs of a potentially faulty meter include bills that are significantly higher than
          expected with no obvious change in usage, or a meter display that appears blank, flashing,
          or showing an error code.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Contact your energy supplier first</strong> — your supplier is responsible
                for the meter and will arrange a meter accuracy test if you request one. Do not
                attempt to open or adjust the meter yourself.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Meter accuracy test</strong> — the supplier will arrange for the meter to be
                tested. If it is found to be outside the permitted ±2% accuracy tolerance, they must
                replace it and may refund overbilled amounts for up to 12 months.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Contact your DNO for outages</strong> — if you have lost power and suspect
                it is a network fault rather than a problem with your consumer unit or meter,
                contact your Distribution Network Operator (DNO) — not your energy supplier. The DNO
                is responsible for the network up to and including the meter. The DNO's 24-hour
                fault number can be found on your electricity bill or via the <strong>105</strong>{' '}
                emergency number (free, works from any phone).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'meter-tampering',
    heading: 'Meter Tampering: The Consequences',
    content: (
      <>
        <p>
          Meter tampering — bypassing, interfering with, or deliberately damaging an electricity
          meter to avoid paying for energy — is a criminal offence in the UK. It is also extremely
          dangerous.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Criminal offences</strong> — meter tampering is an offence under the Theft
                Act 1968 (abstracting electricity) and the Electricity Act 1989. Conviction can
                result in up to five years' imprisonment and an unlimited fine.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Back-billing</strong> — energy suppliers use smart meter data, physical
                inspections, and network loss data to detect tampering. When tampering is
                discovered, the supplier can back-bill estimated stolen energy — often running to
                tens of thousands of pounds — using industry standard calculations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Serious fire risk</strong> — bypassing a meter typically involves making
                unprotected connections in the live meter tails. These connections are upstream of
                any protection in the consumer unit, meaning any fault is unprotected and can cause
                a catastrophic fire. Deaths have resulted from tampered meters.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance invalidation</strong> — home insurance policies are invalidated if
                illegal electrical work is discovered. A fire caused by a tampered meter may leave
                the occupant with no insurance cover for the resulting damage.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'work-near-meter',
    heading: 'Electrical Work Near the Meter: What Requires DNO Permission',
    content: (
      <>
        <p>
          The electricity meter and the meter tails (the cables connecting the meter to the consumer
          unit main switch) are the property and responsibility of the energy supplier or
          Distribution Network Operator. Electricians must not work on these without DNO
          authorisation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What electricians can do</strong> — electricians can work on the consumer
                unit (from the main switch downwards) without DNO involvement. Replacing a consumer
                unit, adding circuits, and all downstream work does not require DNO permission.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What requires DNO involvement</strong> — extending or relocating meter
                tails, moving the meter position, upgrading from single-phase to three-phase supply,
                increasing the supply fuse size, and any work on the cutout (the sealed fuse before
                the meter) all require DNO authorisation. Contact the DNO in advance — this process
                can take several weeks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Isolation for consumer unit work</strong> — when replacing a consumer unit,
                the electrician needs the meter tails de-energised. The DNO can provide temporary
                isolation at the service cutout, or some suppliers have remote isolation capability
                for smart meters. Arrange this in advance.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Are you an electrician? Manage all your certification with Elec-Mate"
          description="Complete EICs, EICRs, and minor works certificates on your phone. Join 1,000+ UK electricians. 7-day free trial, cancel anytime."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricityMeterGuidePage() {
  return (
    <GuideTemplate
      title="Electricity Meter Guide UK | Smart Meters, Types & Readings"
      description="Complete UK electricity meter guide. Types of meter (single rate, Economy 7, smart SMETS2), time-of-use tariffs, how to read your meter, faulty meter action, meter tampering consequences, and what electrical work near the meter requires DNO permission."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Electrical Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Electricity Meter Guide UK:{' '}
          <span className="text-yellow-400">Smart Meters, Types & Readings</span>
        </>
      }
      heroSubtitle="Everything you need to know about your electricity meter in the UK — from the three types of meter and how smart SMETS2 meters work, to time-of-use tariffs, faulty meters, and the rules around electrical work near the meter."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricity Meters"
      relatedPages={relatedPages}
      ctaHeading="Are You an Electrician? Try Elec-Mate Free"
      ctaSubheading="Complete all your electrical certificates on your phone, including EICs for consumer unit work. Join 1,000+ UK electricians. 7-day free trial."
    />
  );
}
