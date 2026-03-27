import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  Calculator,
  Zap,
  Wrench,
  FileCheck2,
  PoundSterling,
  Home,
  Flame,
  Cable,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Cooker Connection Cost', href: '/guides/cooker-connection-cost' },
];

const tocItems = [
  { id: 'overview', label: 'Cooker Connection Overview' },
  { id: 'cost-breakdown', label: 'Cost Breakdown' },
  { id: 'circuit-requirements', label: 'Circuit Requirements' },
  { id: 'cooker-types', label: 'Cost by Cooker Type' },
  { id: 'factors', label: 'Factors Affecting Price' },
  { id: 'regulations', label: 'Regulations and Certification' },
  { id: 'diy-warning', label: 'Can I Connect a Cooker Myself?' },
  { id: 'for-electricians', label: 'For Electricians: Quoting Cooker Connections' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Connecting an electric cooker to an existing cooker circuit typically costs between £100 and £250 including labour, a new cooker connection unit, and testing.',
  'If a new dedicated cooker circuit needs to be run from the consumer unit, the cost increases to £250 to £500 depending on cable run length and the need for a spare way in the consumer unit.',
  'Electric cookers require a dedicated radial circuit, typically rated at 32A with 6mm² cable, or 45A with 10mm² cable for higher-powered models (above 13.5kW). The circuit must be protected by an appropriately rated MCB or RCBO.',
  'Regulation 411.3.3 of BS 7671 requires 30mA RCD protection on cooker circuits in domestic premises where the circuit serves socket outlets up to 32A. A dedicated cooker circuit with a cooker connection unit (not a socket outlet) may not require RCD protection, but current best practice and many competent person schemes recommend it.',
  'A cooker connection unit with a 45A switch and neon indicator is the standard termination point, mounted on the wall within 2 metres of the cooker.',
];

const faqs = [
  {
    question: 'How much does it cost to connect an electric cooker in 2026?',
    answer:
      'Connecting an electric cooker to an existing cooker circuit costs between £100 and £250 in 2026. This covers the electrician\'s labour (1 to 2 hours), a new cooker connection unit if needed (£10 to £25), any cable extensions or tail connections, testing, and a Minor Electrical Installation Works Certificate. If a new circuit needs to be run from the consumer unit, the total cost is £250 to £500.',
  },
  {
    question: 'Do I need an electrician to connect an electric cooker?',
    answer:
      'Yes. Connecting an electric cooker involves working on a high-current circuit (32A or 45A) that, if incorrectly installed, can cause fire or electric shock. While connecting a cooker to an existing cooker connection unit is not technically notifiable under Part P (as it is not a new circuit), the work should still be carried out by a competent person. If a new circuit is required, the work is notifiable and must be carried out by a registered electrician or inspected by Building Control.',
  },
  {
    question: 'What size cable do I need for an electric cooker?',
    answer:
      'The cable size depends on the cooker\'s power rating and the circuit protection. For cookers up to 13.5kW on a 32A circuit, 6mm² twin and earth cable is standard. For cookers above 13.5kW or on a 45A circuit, 10mm² cable is required. The electrician will apply the diversity calculation from BS 7671 Appendix A to determine the actual design current — a 13kW cooker does not draw 13kW continuously, so diversity allows a smaller cable and protective device than the full rated current would suggest.',
  },
  {
    question: 'Can I plug an electric cooker into a normal socket?',
    answer:
      'No. Electric cookers draw far more current than a standard 13A socket outlet can safely supply. A typical electric cooker is rated between 8kW and 16kW, which equates to 35A to 70A at full load — far exceeding the 13A rating of a plug and socket. Attempting to use a cooker on a 13A socket risks overheating the socket, melting the plug, and potentially causing a fire. A dedicated cooker circuit with a cooker connection unit is essential.',
  },
  {
    question: 'What is a cooker connection unit?',
    answer:
      'A cooker connection unit is a wall-mounted switch that provides the termination point for the cooker circuit. It typically incorporates a 45A double-pole switch (to isolate both live and neutral) and a neon indicator light. Some units also include a 13A socket outlet for small appliances (a kettle or toaster), though these dual units are less common in modern installations. The unit is installed on the wall within 2 metres of the cooker, at a height accessible for switching.',
  },
  {
    question: 'Does a cooker circuit need RCD protection?',
    answer:
      'Under Regulation 411.3.3 of BS 7671, 30mA RCD protection is required for socket outlet circuits up to 32A in domestic premises. A dedicated cooker circuit terminated at a cooker connection unit (not a socket outlet) may not strictly require RCD protection under this regulation. However, current best practice, IET guidance, and many competent person schemes recommend RCD or RCBO protection on all domestic circuits. If the cooker connection unit includes a 13A socket, RCD protection is required.',
  },
  {
    question: 'How long does it take to connect a cooker?',
    answer:
      'Connecting a cooker to an existing cooker circuit typically takes 1 to 2 hours. This includes pulling the cooker out, connecting the cooker\'s terminal block to the cooker connection unit cable, testing the circuit (insulation resistance, earth fault loop impedance, RCD trip time if applicable), and completing paperwork. If a new circuit needs to be run from the consumer unit, the job takes 3 to 5 hours depending on the cable run length.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/consumer-unit-replacement-cost',
    title: 'Consumer Unit Replacement Cost',
    description: 'If a new cooker circuit requires an additional way, a consumer unit upgrade may be needed.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/rewire-cost-uk',
    title: 'Rewire Cost UK 2026',
    description: 'Full house rewire costs — including dedicated cooker circuits.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Issue EICs and Minor Works certificates for cooker installations on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote cooker connections and kitchen electrical work with professional PDF output.',
    icon: Calculator,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Cooker Connection: What Is Involved?',
    content: (
      <>
        <p>
          An electric cooker requires a dedicated high-current circuit from the consumer unit,
          terminated at a cooker connection unit on the wall near the cooker. The connection
          involves wiring the cooker's terminal block to the connection unit using heat-resistant
          flexible cable, testing the circuit, and ensuring the installation is safe and compliant
          with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>
          .
        </p>
        <p>
          This is one of the most common domestic electrical jobs. In many cases, an existing
          cooker circuit is already in place and the job is simply connecting the new cooker to the
          existing circuit — a straightforward task for a qualified electrician. If no cooker
          circuit exists (for example, in a property converting from gas to electric cooking), a
          new dedicated circuit must be installed from the consumer unit.
        </p>
      </>
    ),
  },
  {
    id: 'cost-breakdown',
    heading: 'Cost Breakdown',
    content: (
      <>
        <p>Here are realistic 2026 costs for cooker connections in the UK:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Connection to existing circuit</strong> — £100 to £250 total. Labour: £80
                to £180 (1 to 2 hours). Materials: £15 to £40 (cooker connection unit, cable tail,
                connector block). Testing and MEIWC included.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New cooker circuit (short run, under 10m)</strong> — £250 to £400 total.
                Materials: £50 to £100 (6mm² or 10mm² cable, cooker connection unit, MCB/RCBO).
                Labour: £150 to £250 (3 to 4 hours). Includes testing and EIC.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New cooker circuit (long run or difficult route)</strong> — £350 to £500
                total. Longer cable runs, routes through multiple rooms, or channelling through
                solid walls increase both material and labour costs.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'circuit-requirements',
    heading: 'Circuit Requirements for Electric Cookers',
    content: (
      <>
        <p>
          Electric cookers must be supplied by a dedicated radial circuit from the consumer unit.
          The circuit specification depends on the cooker's rated power:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cookers up to 13.5kW</strong> — 32A circuit with 6mm² twin and earth
                cable. Protected by a 32A MCB or RCBO at the consumer unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cookers above 13.5kW</strong> — 45A circuit with 10mm² twin and earth
                cable. Protected by a 45A MCB or RCBO. Required for large range cookers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cooker connection unit</strong> — 45A double-pole switch mounted within 2
                metres of the cooker. Provides local isolation for maintenance and emergency.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Flexible cable from connection unit to cooker</strong> — heat-resistant
                flexible cable rated for the circuit current. Typically 6mm² or 10mm² 3-core
                flex.
              </span>
            </li>
          </ul>
        </div>
        <p>
          BS 7671 Appendix A provides diversity calculations for cooking appliances. A cooker
          rated at 13kW does not draw 13kW continuously — the diversity calculation accounts for
          the fact that all heating elements are rarely on simultaneously at full power, allowing
          the circuit to be designed for a lower demand current than the full rated current.
        </p>
      </>
    ),
  },
  {
    id: 'cooker-types',
    heading: 'Cost by Cooker Type',
    content: (
      <>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Standard Electric Cooker</h3>
            <p className="text-white text-sm leading-relaxed">
              Typically 8kW to 13kW. Fits on a standard 32A circuit with 6mm² cable. Connection
              cost: £100 to £250 on an existing circuit.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Range Cooker</h3>
            <p className="text-white text-sm leading-relaxed">
              Often 13kW to 18kW or more. May require a 45A circuit with 10mm² cable if the
              rating exceeds 13.5kW. Connection cost: £150 to £300 on an existing 45A circuit,
              or £350 to £500 if a new circuit is needed.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Induction Hob (Separate)</h3>
            <p className="text-white text-sm leading-relaxed">
              Typically 3kW to 7.4kW. Can be connected to a 32A cooker circuit via the cooker
              connection unit. If installed alongside a separate oven, both can share the cooker
              circuit (with diversity applied). Connection cost: £100 to £200.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Built-in Oven (Single)</h3>
            <p className="text-white text-sm leading-relaxed">
              Typically 2kW to 3.5kW. Can be connected to a dedicated 20A radial or to the
              cooker circuit. Some ovens under 3kW can be connected via a 13A fused connection
              unit on a ring circuit. Connection cost: £80 to £180.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'factors',
    heading: 'Factors Affecting Price',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Existing circuit availability</strong> — if a cooker circuit already
                exists, the job is quick and inexpensive. If a new circuit is needed, the cost
                doubles or more.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable run length</strong> — a short run from the consumer unit to the
                kitchen (under 10m) is straightforward. Longer runs or routes through multiple
                rooms increase material and labour costs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit capacity</strong> — if there is no spare way in the consumer
                unit for a new cooker circuit, a board upgrade may be needed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cooker power rating</strong> — high-powered range cookers requiring 10mm²
                cable and a 45A circuit cost more in materials than standard cookers on 6mm² cable.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Regulations and Certification',
    content: (
      <>
        <p>
          Installing a new cooker circuit is notifiable under Part P of the Building Regulations,
          as it involves adding a new circuit. The electrician must be registered with a competent
          person scheme or Building Control must be notified. An EIC must be issued for new
          circuits.
        </p>
        <p>
          Connecting a cooker to an existing circuit (like-for-like replacement) is not notifiable
          under Part P, but a Minor Electrical Installation Works Certificate (MEIWC) should
          still be issued to document the work and test results. This protects both the homeowner
          and the electrician.
        </p>
        <p>
          Under Regulation 411.3.3 of BS 7671, 30mA RCD protection is required for socket outlet
          circuits up to 32A. A cooker connection unit is not a socket outlet, so a dedicated
          cooker circuit may not strictly require RCD protection under this regulation. However,
          if the cooker connection unit includes a 13A socket, RCD protection is required for that
          socket. Current best practice recommends RCD or RCBO protection on all domestic
          circuits regardless.
        </p>
      </>
    ),
  },
  {
    id: 'diy-warning',
    heading: 'Can I Connect a Cooker Myself?',
    content: (
      <>
        <p>
          Connecting a cooker to an existing cooker connection unit is technically straightforward,
          but it involves working on a high-current circuit. The consequences of an incorrect
          connection — loose terminals, wrong polarity, inadequate earth — include fire risk and
          electric shock.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
            <div className="text-white">
              <p className="font-bold mb-2">We strongly recommend using a qualified electrician for
              all cooker connections.</p>
              <p className="text-sm">
                Even connecting to an existing circuit, you should isolate the circuit safely, make
                secure connections in the cooker's terminal block, verify earth continuity, test
                insulation resistance, and check polarity. If you are not confident with these
                procedures, call an electrician — at £100 to £250, the cost of professional
                installation is modest compared to the risk.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Quoting Cooker Connections',
    content: (
      <>
        <p>
          Cooker connections are quick, profitable jobs. Most take 1 to 2 hours for an existing
          circuit and represent excellent use of call-out time.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Check Before You Quote</h4>
                <p className="text-white text-sm leading-relaxed">
                  Ask the customer what cooker they are installing (make, model, kW rating) and
                  whether there is an existing cooker circuit. This tells you whether you need
                  6mm² or 10mm² cable, and whether a new circuit is required. Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  for a professional PDF quote.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote cooker connections in minutes"
          description="Elec-Mate's quoting app builds professional quotes for cooker connections and kitchen electrical work. 7-day free trial."
          icon={Calculator}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CookerConnectionCostPage() {
  return (
    <GuideTemplate
      title="Cooker Connection Cost 2026 | UK Price Guide"
      description="How much does it cost to connect an electric cooker in 2026? UK price guide covering existing circuit connections, new cooker circuits, cable sizes, and regulations. £100-250 for existing circuits, £250-500 for new circuits."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Cooker Connection Cost:{' '}
          <span className="text-yellow-400">UK Price Guide 2026</span>
        </>
      }
      heroSubtitle="How much does it cost to connect an electric cooker? Whether you have an existing cooker circuit or need a new one installed, this guide covers realistic 2026 UK pricing, circuit requirements, and the regulations that apply."
      readingTime={8}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Cooker Connection Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote Cooker Connections Professionally"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for quoting, certification, and AI cost engineering. 7-day free trial, cancel anytime."
    />
  );
}
