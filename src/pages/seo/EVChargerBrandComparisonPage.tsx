import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  BarChart2,
  Zap,
  ShieldCheck,
  PoundSterling,
  Star,
  Settings,
  Smartphone,
  FileCheck2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'EV Charging Guides', href: '/ev-charger-grants' },
  { label: 'EV Charger Brand Comparison UK', href: '/ev-charger-brand-comparison' },
];

const tocItems = [
  { id: 'zappi', label: 'Zappi (myenergi)' },
  { id: 'pod-point', label: 'Pod Point' },
  { id: 'ohme', label: 'Ohme' },
  { id: 'easee', label: 'Easee' },
  { id: 'wallbox', label: 'Wallbox' },
  { id: 'tethered-vs-untethered', label: 'Tethered vs Untethered' },
  { id: 'comparison-table', label: 'At-a-Glance Comparison' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Zappi (myenergi) is the leading choice for homes with solar PV — its CT clamp-based solar diversion (ECO+ mode) allows zero-cost EV charging using surplus generation.',
  'Pod Point is one of the most widely installed charger brands in the UK, with a large network and strong app — well suited to renters and straightforward domestic installations.',
  'Ohme ePod offers the tightest smart tariff integration, communicating directly with the vehicle API and energy supplier to optimise charging automatically without manual scheduling.',
  'Easee Charge stands out for multi-charger commercial installations — its power-sharing architecture is designed for fleet and workplace use without a separate load management controller.',
  'Wallbox Pulsar Plus is a compact, feature-rich charger suitable for domestic and light commercial use, with strong app control and solar integration via third-party CT clamps.',
];

const faqs = [
  {
    question: 'Which EV charger is best for a home with solar panels?',
    answer:
      'The Zappi from myenergi is widely regarded as the best EV charger for homes with solar PV. Its built-in CT clamp monitoring detects surplus solar generation and diverts it into the EV (ECO+ mode), achieving zero-cost charging when the sun is generating more than the household is consuming. The myenergi app allows scheduling, solar diversion mode switching, and monitoring of both solar generation and EV charging. The Zappi also integrates with the myenergi hub for combined control of solar, battery storage (Libbi), and EV charging.',
  },
  {
    question: 'What is the difference between a tethered and untethered EV charger?',
    answer:
      'A tethered charger has a fixed cable permanently attached to the unit — you simply plug the other end into your car. An untethered charger has a socket (Type 2 outlet) and no cable — you provide your own Mode 3 charging cable. Tethered chargers are more convenient (no need to handle a loose cable) but are tied to one cable type (almost always Type 2 in the UK). Untethered chargers offer future flexibility if cable standards change and allow users with different connector types to use the same charger with their own cable. See our full guide to tethered vs untethered chargers for a detailed comparison.',
  },
  {
    question: 'How much does a 7kW home EV charger cost installed in the UK?',
    answer:
      'A 7.4kW smart home EV charger costs approximately £800–1,400 supply and install from an OZEV-approved installer. This includes the charger unit (typically £400–700 for a quality smart charger from brands such as Ohme, Pod Point, Zappi, or Wallbox), cabling, circuit protective device, earthing where required, commissioning, and a BS 7671 electrical installation certificate. The Zappi tends to sit at the higher end due to its solar integration capability (approximately £650–900 for the unit). Premium brands such as Wallbox or Ohme with vehicle API integration are typically £500–750 for the unit alone.',
  },
  {
    question: 'Does Ohme work with Intelligent Octopus Go?',
    answer:
      'Yes. Ohme chargers (particularly the Ohme ePod) integrate directly with Octopus Energy\'s Intelligent Octopus Go tariff. The charger communicates with the vehicle API (for compatible vehicles including Tesla, BMW, Volkswagen Group vehicles, and others) and with the Octopus API to receive half-hourly pricing signals. The Ohme ePod then automatically charges the vehicle during the cheapest available slots within the user\'s required departure time window — without any manual scheduling. This "set and forget" approach makes Ohme one of the most convenient smart chargers for Octopus Energy customers.',
  },
  {
    question: 'Which EV charger is best for a flat or rented property?',
    answer:
      'For a flat or rented property, ease of installation and good app control are the key criteria. Pod Point and Ohme ePod are popular choices — both are compact, straightforward to install (particularly where cable runs are short in communal parking areas), and have user-friendly apps. The Pod Point Solo 3 is tethered (very convenient for flat residents) and has a good energy monitoring app. Ohme ePod is untethered, suitable for shared bays where different residents may need to use the same charger with their own cables. Both are OZEV-approved for EVHS grant claims.',
  },
  {
    question: 'Which EV charger is best for a business or fleet?',
    answer:
      "For commercial and fleet installations, Easee Charge and Pod Point Pro are leading options. Easee's power-sharing architecture allows multiple chargers to automatically share the available supply without a separate load management controller — reducing installation complexity and cost. Pod Point Pro provides a full fleet management portal with session reporting, access control, and cost allocation. Wallbox Commander 2 is also suited to fleet use, with a 22kW three-phase option, integrated screen, and fleet management software. For large-scale fleet depots with 40+ chargers, a bespoke design using dedicated load management controllers from brands such as ABB or Schneider may be more appropriate than consumer-grade chargers.",
  },
  {
    question: 'What warranty do UK EV chargers come with?',
    answer:
      "Most major EV charger brands offer a 3-year manufacturer's warranty as standard. myenergi (Zappi) offers 3 years. Pod Point offers 3 years. Ohme offers 3 years. Easee offers 3 years. Wallbox offers 2–3 years depending on the model. Some brands offer extended warranty options at additional cost. Installers should check the current warranty terms at the time of installation and communicate these to customers — warranty claims typically go through the manufacturer's customer service team, not through the installing electrician.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tethered-vs-untethered-ev-charger',
    title: 'Tethered vs Untethered EV Charger',
    description: 'Full guide to tethered and untethered charger pros, cons, and recommendations.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/smart-ev-charging',
    title: 'Smart EV Charging UK',
    description: 'Smart Charge Points Regulations, off-peak tariffs, and solar PV diversion.',
    icon: Settings,
    category: 'Guide',
  },
  {
    href: '/ev-charger-grants',
    title: 'EV Charger Grants UK',
    description: 'EVHS and WCS grant eligibility, amounts, and how to apply.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/ev-charging-legislation',
    title: 'EV Charging Legislation UK',
    description: 'Smart Charge Points Regulations 2021, Part S, and BS 7671 Section 722.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/ev-charging-certificate',
    title: 'EV Charging Certificate App',
    description: 'Complete BS 7671 EV charging certificates on your phone with instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'zappi',
    heading: 'Zappi (myenergi) — Best for Solar PV Integration',
    content: (
      <>
        <p>
          The Zappi is manufactured by myenergi, a UK-based company founded in Lincolnshire. It is
          the most popular solar-integrated EV charger in the UK and is widely regarded as the
          benchmark for homes with solar PV or battery storage systems.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solar diversion</strong> — ECO mode and ECO+ mode use a CT clamp on the grid
                meter to detect surplus solar generation and divert it into the EV. ECO+ mode
                charges only from surplus solar; ECO mode tops up from the grid to maintain a
                minimum charge rate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>myenergi ecosystem</strong> — integrates with the myenergi hub, Libbi
                battery storage, and Eddi hot water diverter. The myenergi app provides unified
                control of all devices and real-time energy monitoring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tethered or untethered</strong> — available in both configurations. The
                Zappi 2 is available as a 7.4kW (single-phase) or 22kW (three-phase) model, in
                tethered (5m or 8.5m cable) or untethered versions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Approximate installed cost</strong> — £1,000–1,400 supply and install (7.4kW
                tethered). One of the more expensive domestic chargers, but justified for solar PV
                households where payback on solar diversion is rapid.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Warranty</strong> — 3 years manufacturer's warranty. OZEV-approved.
                Available through OZEV-approved installers for EVHS and WCS grant applications.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pod-point',
    heading: 'Pod Point — Best All-Rounder for Domestic Use',
    content: (
      <>
        <p>
          Pod Point is one of the UK's largest EV charging companies, founded in London in 2009 and
          now majority-owned by EDF Energy. The Pod Point Solo 3 is their primary domestic charger
          and one of the most widely installed in UK homes.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart scheduling</strong> — the Pod Point app allows schedule-based charging
                with time-of-use tariff integration. Supports Octopus Go, Intelligent Octopus, and
                other tariffs via the OCPP protocol.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Universal compatibility</strong> — Solo 3 works with all Type 2 vehicles
                (all modern EVs sold in the UK). Available in 7.4kW (single-phase) and 22kW
                (three-phase) variants. Tethered (5m cable) or untethered (socket).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pod Point network</strong> — Pod Point offers a commercial network for
                workplace and public charging, with access via app, RFID, or contactless payment.
                The Pod Point Pro is their commercial product with fleet management portal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Approximate installed cost</strong> — £800–1,100 supply and install (7.4kW
                tethered). Mid-range pricing; strong value for a reliable, well-supported charger.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ohme',
    heading: 'Ohme — Best for Smart Tariff Integration',
    content: (
      <>
        <p>
          Ohme is a UK-based EV charger company whose products are designed specifically around
          smart tariff and vehicle API integration. The Ohme ePod and Ohme Home Pro are popular
          domestic chargers with some of the most sophisticated smart charging capabilities on the
          market.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Smartphone className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Vehicle API integration</strong> — the Ohme app integrates with the APIs of
                compatible vehicles (Tesla, BMW, Volkswagen Group, Ford, and others) to read state
                of charge and send charge commands directly to the vehicle. This enables true smart
                charging without manual scheduling.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Smartphone className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Intelligent Octopus integration</strong> — Ohme is the preferred hardware
                partner for Octopus Energy's Intelligent Octopus Go tariff. The charger
                automatically charges during the cheapest half-hourly slots, chosen by the Octopus
                algorithm to minimise cost and grid stress simultaneously.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Smartphone className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ohme ePod vs Home Pro</strong> — the ePod is the entry-level untethered
                7.4kW model; the Home Pro adds solar integration via CT clamp, dynamic load
                management, and a colour display. The Home Pro competes more directly with the Zappi
                for solar-equipped homes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Approximate installed cost</strong> — Ohme ePod: £850–1,100; Ohme Home Pro:
                £1,050–1,350. Both OZEV-approved for EVHS and WCS grant applications.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'easee',
    heading: 'Easee — Best for Multi-Charger Commercial Installations',
    content: (
      <>
        <p>
          Easee is a Norwegian EV charger brand that has grown rapidly in the UK commercial market.
          Its innovative power-sharing architecture makes it particularly suited to fleet and
          workplace installations where multiple chargers share a single supply.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
              <span>
                <strong>Power sharing</strong> — multiple Easee chargers can be linked (up to 3 per
                circuit, or via an Equalizer load management hub) to share available power
                automatically. No separate load management controller required for smaller
                installations, reducing hardware cost and installation complexity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
              <span>
                <strong>Equalizer</strong> — the Easee Equalizer is a dedicated load management hub
                that monitors the incoming supply via CT clamp and distributes available capacity
                across a cluster of Easee chargers. Supports up to 12 chargers per Equalizer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial management portal</strong> — the Easee cloud portal provides
                session history, energy consumption reporting, access control (RFID or app), and
                remote management for fleet operators and property managers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
              <span>
                <strong>Approximate installed cost</strong> — Easee Charge: £800–1,100 supply and
                install (single charger, 7.4kW). Equalizer hub adds approximately £200–350.
                Three-phase 22kW version available. OZEV-approved for WCS grant applications.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'wallbox',
    heading: 'Wallbox — Premium Compact Charger',
    content: (
      <>
        <p>
          Wallbox is a Spanish manufacturer with a UK operation and a range of compact, stylish
          chargers popular for both domestic and light commercial installations. The Pulsar Plus and
          Copper SB are their most commonly installed domestic models.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pulsar Plus</strong> — compact 7.4kW charger (one of the smallest on the
                market) with strong app control, scheduled charging, and solar integration via
                third-party CT clamp. Tethered (7.5m cable) or untethered.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Copper SB</strong> — Wallbox's premium domestic model with an integrated
                screen, gesture control, RFID access, and V2G (Vehicle-to-Grid) capability for
                compatible vehicles. One of the few domestic AC chargers with bidirectional charging
                support.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>myWallbox portal</strong> — fleet management portal with real-time
                monitoring, session history, access management, and integration with third-party
                energy management systems. Commander 2 is the commercial product with 22kW
                three-phase capability and a large touchscreen.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Approximate installed cost</strong> — Pulsar Plus: £850–1,150; Copper SB:
                £1,300–1,800. Both OZEV-approved. Wallbox chargers carry a 2-year manufacturer's
                warranty (extendable to 3 years on registration).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'tethered-vs-untethered',
    heading: 'Tethered vs Untethered: Which Should You Specify?',
    content: (
      <>
        <p>
          The choice between tethered and untethered chargers is one of the most common questions
          electricians face when specifying EV chargers. The right answer depends on the
          installation context. For a fuller comparison, see our dedicated guide to{' '}
          <SEOInternalLink href="/tethered-vs-untethered-ev-charger">
            tethered vs untethered EV chargers
          </SEOInternalLink>
          .
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tethered — best for single-vehicle households</strong> — convenient, no
                cable to manage, ideal where one household always charges the same EV with the same
                connector (Type 2 in the UK). Most popular choice for domestic residential
                installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Untethered — best for commercial and shared charging</strong> — allows
                multiple users with different vehicles and their own cables to use the same charger.
                Essential where public or visitor access is required. More future-proof if cable
                standards evolve.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'comparison-table',
    heading: 'At-a-Glance Brand Comparison',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BarChart2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zappi (myenergi)</strong> — solar diversion: excellent; smart tariff: good;
                app quality: excellent; tethered/untethered: both; commercial use: limited;
                warranty: 3 years; installed cost (7.4kW): £1,000–1,400.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BarChart2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pod Point Solo 3</strong> — solar diversion: limited; smart tariff: good;
                app quality: good; tethered/untethered: both; commercial use: via Pod Point Pro;
                warranty: 3 years; installed cost (7.4kW): £800–1,100.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BarChart2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ohme ePod / Home Pro</strong> — solar diversion: Home Pro only; smart
                tariff: excellent (Intelligent Octopus native); app quality: excellent;
                tethered/untethered: untethered; commercial use: limited; warranty: 3 years;
                installed cost (7.4kW): £850–1,350.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BarChart2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Easee Charge</strong> — solar diversion: via Equalizer; smart tariff: good;
                app quality: good; tethered/untethered: both; commercial use: excellent (power
                sharing); warranty: 3 years; installed cost (7.4kW): £800–1,100.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BarChart2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wallbox Pulsar Plus</strong> — solar diversion: via third-party CT; smart
                tariff: good; app quality: excellent; tethered/untethered: both; commercial use: via
                Commander 2; warranty: 2–3 years; installed cost (7.4kW): £850–1,150.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All prices above are approximate 2025 supply-and-install figures before any OZEV grant
          deduction. The EVHS grant (£350 for eligible flat residents and renters) and WCS grant
          (£350 per socket for businesses) apply to all brands listed above, as all are
          OZEV-approved. See our{' '}
          <SEOInternalLink href="/ev-charger-grants">EV charger grants guide</SEOInternalLink> for
          full eligibility details.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Specifying the Right Charger',
    content: (
      <>
        <p>
          The best charger brand for your customer depends on their specific situation. Asking five
          key questions will narrow the choice quickly: Do they have solar PV? (Zappi.) Do they want
          automatic smart tariff optimisation? (Ohme.) Is it a commercial or fleet installation?
          (Easee or Pod Point Pro.) Is it for a flat with limited space? (Wallbox Pulsar Plus or
          Ohme ePod.) Is it a straightforward domestic installation? (Any of the above — choose the
          brand you know best and have stock of.)
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certificate Every Installation</h4>
                <p className="text-white text-sm leading-relaxed">
                  Regardless of brand, every EV charger installation requires a BS 7671 Section 722
                  electrical installation certificate. Use the{' '}
                  <SEOInternalLink href="/tools/ev-charging-certificate">
                    Elec-Mate EV charging certificate app
                  </SEOInternalLink>{' '}
                  to complete the certificate on site and export to PDF before you leave —
                  professional documentation builds repeat business and supports OZEV grant claims.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Clearly with Grant Deductions</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to present quotes with the EVHS or WCS grant clearly itemised. Customers who see
                  £350 deducted from their net cost are more likely to proceed — showing the gross
                  cost, grant, and net cost on a single professional quote page removes friction
                  from the buying decision.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Win more EV charger installations with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for EV certificates, quoting, and job management. Complete every installation professionally. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EVChargerBrandComparisonPage() {
  return (
    <GuideTemplate
      title="Best EV Charger UK 2025 | Ohme vs Zappi vs Pod Point vs Myenergi"
      description="Compare the best EV chargers in the UK for 2025. Zappi vs Pod Point vs Ohme vs Easee vs Wallbox — solar integration, smart tariffs, tethered vs untethered, commercial use, costs installed, app quality, and warranty compared."
      datePublished="2025-01-01"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EV Charger Comparison"
      badgeIcon={BarChart2}
      heroTitle={
        <>
          Best EV Charger UK 2025:{' '}
          <span className="text-yellow-400">Ohme vs Zappi vs Pod Point vs Wallbox</span>
        </>
      }
      heroSubtitle="An independent comparison of the UK's leading EV home and workplace chargers for 2025 — Zappi (myenergi), Pod Point, Ohme, Easee, and Wallbox. Solar integration, smart tariff support, app quality, tethered vs untethered options, commercial use, installed costs, and warranty compared side by side."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EV Charger Brands"
      relatedPages={relatedPages}
      ctaHeading="Complete EV Charging Certificates on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for EV certificates, quoting, and job management. Every brand, every installation. 7-day free trial, cancel anytime."
    />
  );
}
