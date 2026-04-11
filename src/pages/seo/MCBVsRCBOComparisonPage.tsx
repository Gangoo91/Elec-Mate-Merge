import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  Calculator,
  Zap,
  Cable,
  FileCheck2,
  GraduationCap,
  ClipboardCheck,
  CheckCircle2,
  XCircle,
  PoundSterling,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/electrical-certificate-types-uk' },
  { label: 'MCB vs RCBO', href: '/guides/mcb-vs-rcbo' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'mcb-explained', label: 'MCBs Explained' },
  { id: 'rcbo-explained', label: 'RCBOs Explained' },
  { id: 'split-load', label: 'Split-Load Board Design' },
  { id: 'rcbo-board', label: 'Full RCBO Board Design' },
  { id: 'cost', label: 'Cost Comparison' },
  { id: 'nuisance-tripping', label: 'Nuisance Tripping' },
  { id: 'regulations', label: 'BS 7671 Requirements' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'An MCB (miniature circuit breaker) protects against overcurrent and short circuit only. An RCBO (residual current circuit breaker with overload) combines MCB overcurrent protection with RCD earth leakage protection in a single device.',
  'A split-load consumer unit uses MCBs behind one or two RCDs — cheaper but a single earth fault trips multiple circuits. A full RCBO board gives each circuit independent earth leakage protection.',
  'RCBOs cost more per circuit (typically £15 to £30 each vs £3 to £8 for an MCB) but eliminate nuisance tripping of unrelated circuits and make fault-finding significantly easier.',
  'BS 7671 Regulation 411.3.3 requires additional protection by a 30mA RCD for all socket outlets rated up to 32A, mobile equipment up to 32A outdoors, and all circuits in bathrooms. RCBOs satisfy this requirement per circuit.',
  'Full RCBO boards are now the preferred choice for new domestic installations — the higher upfront cost is offset by fewer callbacks for nuisance tripping and faster fault diagnosis.',
];

const faqs = [
  {
    question: 'What is the difference between an MCB and an RCBO?',
    answer:
      'An MCB (miniature circuit breaker) provides overcurrent and short-circuit protection only. It trips when the current exceeds its rated value (for example, 32A for a ring final) or when a short circuit occurs. An RCBO (residual current circuit breaker with overload) combines the overcurrent protection of an MCB with the earth leakage protection of an RCD in a single device. An RCBO trips if the current exceeds its rating OR if it detects an earth leakage current above its residual current rating (typically 30mA). In simple terms, an MCB protects against overload and short circuit; an RCBO protects against overload, short circuit, and earth faults.',
  },
  {
    question: 'Is a full RCBO board a legal requirement in the UK?',
    answer:
      'No. BS 7671 does not require a full RCBO board. The regulations require RCD protection (30mA) for specific circuits — socket outlets up to 32A (Regulation 411.3.3), circuits in bathrooms (Regulation 701.411.3.3), and certain other circuits. This can be achieved with either a split-load board (MCBs behind RCDs) or individual RCBOs. A full RCBO board exceeds the minimum regulatory requirement but provides practical benefits in terms of nuisance tripping reduction and fault-finding ease.',
  },
  {
    question: 'Why does a split-load board cause nuisance tripping?',
    answer:
      'In a split-load board, multiple circuits share a single RCD. Every circuit behind that RCD contributes a small amount of standing earth leakage current (from filters in electronic equipment, long cable runs, and moisture). The cumulative leakage from all circuits can approach the RCD trip threshold. If one circuit then develops a minor fault or a connected appliance produces a momentary leakage spike, the RCD trips — disconnecting every circuit behind it. This is nuisance tripping: the circuit with the issue is lost among multiple circuits that all went off at the same time. With RCBOs, only the circuit with the fault trips.',
  },
  {
    question: 'How much more does an RCBO board cost than a split-load board?',
    answer:
      'A split-load consumer unit with MCBs typically costs £80 to £150 for the enclosure plus MCBs. A full RCBO board costs £200 to £400 depending on the manufacturer and number of ways. The per-circuit cost difference is roughly £12 to £22 extra per circuit (RCBO vs MCB). For a typical 12-way domestic board, the total extra cost is approximately £150 to £250 in materials. However, this is often recovered through fewer callbacks — a single nuisance tripping visit can cost more than the price difference.',
  },
  {
    question: 'Can I mix MCBs and RCBOs in the same consumer unit?',
    answer:
      'Yes, some consumer unit designs allow a mix of MCBs and RCBOs. For example, circuits that do not require RCD protection (such as a fire alarm circuit or a smoke detector circuit) can use a plain MCB, while socket circuits and bathroom circuits use RCBOs. Some boards have a section behind an RCD for MCBs and a section for individual RCBOs. However, many electricians prefer a uniform approach — either all RCBOs or all MCBs behind RCDs — for clarity and ease of maintenance.',
  },
  {
    question: 'Do RCBOs eliminate all nuisance tripping?',
    answer:
      'RCBOs significantly reduce nuisance tripping by isolating each circuit independently, but they do not eliminate it entirely. A circuit with a genuine standing leakage close to 30mA (from a faulty appliance, damp wiring, or a long cable run) may still trip its individual RCBO. The difference is that only that one circuit trips — not the entire house — and the fault is immediately identifiable because you know exactly which circuit has the problem. If a single RCBO trips repeatedly, the fault is on that specific circuit, making diagnosis much faster.',
  },
  {
    question: 'What RCBO type do I need for domestic installations?',
    answer:
      'For most domestic circuits, Type A RCBOs (30mA) are the standard choice. Type A detects both AC and pulsating DC earth fault currents, which is important for modern loads such as LED lighting, EV chargers, and electronic equipment. Type AC (which detects only sinusoidal AC fault currents) is no longer recommended for new domestic installations. Some specific loads — such as certain EV chargers and variable-speed drives — may require Type F or Type B RCBOs. Check the appliance manufacturer instructions and refer to BS 7671 Regulation 531.3.3 for guidance on RCD type selection.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/split-load-vs-rcbo-consumer-unit',
    title: 'Split-Load vs RCBO Board',
    description: 'Detailed comparison of consumer unit designs for domestic installations.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/rcd-types-a-b-f-explained',
    title: 'RCD Types Explained',
    description: 'Type AC, A, F, and B — when each is required and what they detect.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for consumer unit upgrades on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'Master MCB, RCD, and RCBO testing for C&G 2391.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'MCB vs RCBO: Understanding the Difference',
    content: (
      <>
        <p>
          The choice between MCBs and RCBOs is one of the most common decisions in UK domestic
          electrical work. Every consumer unit upgrade, rewire, and new installation requires this
          decision — and it has a direct impact on cost, safety, and the homeowner experience.
        </p>
        <p>
          This guide explains what each device does, when to use each, the cost implications, how
          nuisance tripping is affected, and what{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          actually requires.
        </p>
      </>
    ),
  },
  {
    id: 'mcb-explained',
    heading: 'MCBs: Miniature Circuit Breakers',
    content: (
      <>
        <p>
          An MCB protects a circuit against overcurrent (a sustained current above the conductor
          rating) and short circuit (a very high current caused by a direct fault between live
          conductors). When the current exceeds the MCB rating, the thermal element heats up and
          trips the device. For short circuits, the magnetic element trips the MCB almost
          instantaneously.
        </p>
        <p>
          MCBs are classified by their tripping characteristic — Type B trips at 3 to 5 times rated
          current (standard for domestic circuits), Type C trips at 5 to 10 times (used for motor
          loads and some commercial circuits), and Type D trips at 10 to 20 times (for heavy
          inductive loads). Most domestic installations use Type B.
        </p>
        <p>
          An MCB does <strong>not</strong> detect earth leakage. If a live conductor touches an
          earthed metal part (an earth fault), the MCB will only trip if the fault current is high
          enough to exceed its rating. Low-level earth faults — which are often the most dangerous
          to people — will not trip an MCB.
        </p>
      </>
    ),
  },
  {
    id: 'rcbo-explained',
    heading: 'RCBOs: Residual Current Circuit Breakers with Overload',
    content: (
      <>
        <p>
          An RCBO combines the overcurrent and short-circuit protection of an MCB with the earth
          leakage detection of an RCD in a single device. It monitors the balance of current between
          the line and neutral conductors. If there is an imbalance (indicating current is leaking
          to earth), the RCBO trips — even if the leakage is as small as 30mA.
        </p>
        <p>This means an RCBO provides three types of protection:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overcurrent protection</strong> — trips if the circuit current exceeds the
                rated value (same as an MCB)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Short-circuit protection</strong> — trips on high fault currents (same as an
                MCB)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth leakage protection</strong> — trips on current imbalance above 30mA
                (same as an RCD)
              </span>
            </li>
          </ul>
        </div>
        <p>
          Because each RCBO protects an individual circuit, an earth fault on one circuit does not
          affect any other circuit. This is the key advantage over a split-load arrangement where
          multiple circuits share a single RCD.
        </p>
      </>
    ),
  },
  {
    id: 'split-load',
    heading: 'Split-Load Board Design',
    content: (
      <>
        <p>
          A split-load consumer unit divides the circuits into two or more groups, each protected by
          a separate RCD. Behind each RCD are several MCBs — one per circuit. The RCD provides earth
          leakage protection for all circuits in its group; the MCBs provide overcurrent protection
          for individual circuits.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Split-Load Advantages</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>Lower upfront cost — MCBs are significantly cheaper than RCBOs</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>Familiar design — widely used in existing UK domestic installations</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                Two RCDs provide partial discrimination — a fault on one group does not affect the
                other
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Split-Load Disadvantages</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                A single earth fault trips all circuits behind that RCD — half the house goes off
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                Cumulative standing leakage from multiple circuits can cause nuisance tripping
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Fault-finding is harder — the tripped RCD covers multiple circuits</span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rcbo-board',
    heading: 'Full RCBO Board Design',
    content: (
      <>
        <p>
          A full RCBO board replaces the split-load arrangement entirely. Every circuit has its own
          RCBO, providing independent overcurrent and earth leakage protection. There is no shared
          RCD — each circuit stands alone.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Full RCBO Board Benefits</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                An earth fault on one circuit trips only that circuit — the rest of the house stays
                on
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                Immediate fault identification — the tripped RCBO tells you exactly which circuit
                has the problem
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>No cumulative leakage issues — each RCBO only monitors its own circuit</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                Fewer callbacks — the homeowner can identify and isolate the faulty circuit
                themselves
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cost',
    heading: 'Cost Comparison: MCB vs RCBO',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4 overflow-x-auto">
          <table className="w-full text-white text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 pr-4 font-bold">Item</th>
                <th className="text-left py-3 pr-4 font-bold">Split-Load (MCB)</th>
                <th className="text-left py-3 font-bold">Full RCBO</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr>
                <td className="py-3 pr-4">Consumer unit (12-way)</td>
                <td className="py-3 pr-4">£40 to £80</td>
                <td className="py-3">£60 to £120</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">2x RCD (63A, 30mA)</td>
                <td className="py-3 pr-4">£30 to £60</td>
                <td className="py-3">Not needed</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">10x protective devices</td>
                <td className="py-3 pr-4">£30 to £80 (MCBs)</td>
                <td className="py-3">£150 to £300 (RCBOs)</td>
              </tr>
              <tr className="font-bold">
                <td className="py-3 pr-4">Typical total</td>
                <td className="py-3 pr-4">£100 to £220</td>
                <td className="py-3">£210 to £420</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">Extra cost per board</td>
                <td className="py-3 pr-4">Baseline</td>
                <td className="py-3">£110 to £200 more</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The extra material cost is typically £110 to £200 per installation. A single callback for
          nuisance tripping — including travel time, fault-finding, and the homeowner inconvenience
          — easily exceeds this difference. Most electricians now build the RCBO cost into the
          standard quote and position it as a premium, professional installation.
        </p>
      </>
    ),
  },
  {
    id: 'nuisance-tripping',
    heading: 'Nuisance Tripping: The Real-World Problem',
    content: (
      <>
        <p>
          Nuisance tripping is the most common complaint with split-load consumer units. It occurs
          when the cumulative earth leakage from all circuits behind one RCD exceeds the trip
          threshold (30mA) — even though no single circuit has a fault.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Common Causes of Cumulative Leakage</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                LED downlighters with capacitive filters (1 to 3mA each — 10 downlighters = 10 to
                30mA)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                IT equipment with EMC filters (computers, printers, routers — 1 to 5mA each)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                White goods with suppression capacitors (washing machines, dishwashers — 1 to 3mA
                each)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Long cable runs with moisture ingress (garden circuits, outbuildings)</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>EV chargers and heat pump inverters with DC leakage components</span>
            </li>
          </ul>
        </div>
        <p>
          With an RCBO board, each circuit has its own 30mA threshold. The leakage from one circuit
          does not affect any other. This is particularly important in modern homes with many
          electronic loads, LED lighting, and power-hungry appliances.
        </p>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'BS 7671 Requirements',
    content: (
      <>
        <p>
          BS 7671 does not mandate either MCBs or RCBOs specifically. It sets performance
          requirements that can be met by either arrangement:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 411.3.3</strong> — additional protection by an RCD with a rated
                residual operating current not exceeding 30mA shall be provided for socket outlets
                with a rated current not exceeding 32A, and for mobile equipment with a rated
                current not exceeding 32A for use outdoors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 314.1</strong> — every installation shall be divided into
                circuits as necessary to avoid danger and minimise inconvenience in the event of a
                fault. This regulation supports the use of individual RCBOs, as it reduces the
                impact of a fault to a single circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 531.3.3</strong> — where RCD protection is required, the type of
                RCD must be selected according to the type of fault current expected. Type A is the
                minimum for most domestic loads; Type F or B may be required for specific equipment.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Making the Right Choice',
    content: (
      <>
        <p>
          The industry trend is clearly towards full RCBO boards for new domestic installations. The
          cost difference is modest, the callback rate is lower, and the customer experience is
          better. Here is how Elec-Mate helps:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quoting App</h4>
                <p className="text-white text-sm leading-relaxed">
                  Price consumer unit upgrades with itemised RCBO costs using the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Show the customer the cost difference between split-load and RCBO boards with
                  clear justification.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC Certificate</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete your{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Electrical Installation Certificate
                  </SEOInternalLink>{' '}
                  on site with RCD test recording and instant PDF export.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote, install, and certify consumer unit upgrades"
          description="Join 1,000+ UK electricians using Elec-Mate for professional quoting, cable sizing, and on-site EIC certification. 7-day free trial."
          icon={ShieldCheck}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function MCBVsRCBOComparisonPage() {
  return (
    <GuideTemplate
      title="MCB vs RCBO | When to Use Each | Cost Comparison UK"
      description="Complete comparison of MCBs vs RCBOs for UK electricians. Split-load vs RCBO board, cost difference, nuisance tripping, BS 7671 requirements, and when each protective device is the right choice."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Technical Comparison"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          MCB vs RCBO: <span className="text-yellow-400">When to Use Each</span>
        </>
      }
      heroSubtitle="MCBs are cheaper but require a shared RCD for earth leakage protection. RCBOs cost more but give each circuit independent protection. This guide covers the cost difference, nuisance tripping, BS 7671 requirements, and the honest pros and cons of split-load vs RCBO boards."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About MCBs and RCBOs"
      relatedPages={relatedPages}
      ctaHeading="Quote and Certify Consumer Unit Upgrades on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for professional quoting and on-site EIC certification. 7-day free trial, cancel anytime."
    />
  );
}
