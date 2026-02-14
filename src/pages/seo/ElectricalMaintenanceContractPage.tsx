import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Wrench,
  Clock,
  FileText,
  ShieldCheck,
  PoundSterling,
  ClipboardCheck,
  CalendarDays,
  BarChart3,
  Users,
  AlertTriangle,
  Briefcase,
  Receipt,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business', href: '/tools' },
  { label: 'Maintenance Contract', href: '/guides/electrical-maintenance-contract' },
];

const tocItems = [
  { id: 'what-is-maintenance-contract', label: 'What Is a Maintenance Contract?' },
  { id: 'ppm-schedule', label: 'PPM Schedule' },
  { id: 'response-times', label: 'Response Times and SLAs' },
  { id: 'sla-terms', label: 'SLA Terms to Include' },
  { id: 'pricing-models', label: 'Pricing Models' },
  { id: 'documentation', label: 'Documentation and Record Keeping' },
  { id: 'client-retention', label: 'Client Retention and Contract Renewal' },
  { id: 'common-mistakes', label: 'Common Contract Mistakes' },
  { id: 'elec-mate-maintenance', label: 'Elec-Mate for Maintenance Contracts' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A well-structured electrical maintenance contract provides predictable recurring revenue and protects both the electrician and the client with clear obligations, response times, and pricing.',
  'Planned Preventive Maintenance (PPM) schedules should cover all statutory requirements -- EICR every 5 years, emergency lighting testing monthly and annually, fire alarm testing quarterly and annually, and PAT testing at agreed intervals.',
  'Response time SLAs must be realistic and tiered -- emergency (2 to 4 hours for safety-critical faults), urgent (same day or next business day), and routine (within 5 to 10 business days).',
  'Pricing models range from fixed monthly retainers (predictable for both parties) to pay-as-you-go with discounted rates for contract clients -- choose the model that suits the client portfolio size.',
  'Elec-Mate tracks PPM schedules, generates certificates on site, logs all maintenance visits, and sends compliance reports to clients automatically -- turning maintenance contracts into a streamlined, professional service.',
];

const faqs = [
  {
    question: 'What should an electrical maintenance contract include?',
    answer:
      'A comprehensive electrical maintenance contract should include: the scope of works (what equipment and systems are covered), a PPM schedule listing all planned inspections and tests with their frequencies, response time commitments for reactive callouts categorised by urgency, pricing structure (fixed retainer, per-visit rates, or hybrid), payment terms, contract duration and renewal provisions, exclusions (what is not covered, such as major rewiring or new installations), liability and insurance requirements, termination clauses with notice periods, and key performance indicators (KPIs) if the client requires them. The contract should reference the applicable standards -- BS 7671 for the fixed installation, BS 5839 for fire alarm systems, BS 5266 for emergency lighting, and the IET Code of Practice for PAT testing.',
  },
  {
    question: 'How do I price a maintenance contract?',
    answer:
      'Pricing depends on the size and complexity of the installation. Start by estimating the total annual cost of all planned maintenance visits: the number of visits, hours per visit, travel time, and any consumables. Add a contingency for reactive callouts -- typically 10 to 20 percent of the planned maintenance cost for well-maintained installations, more for older or problematic sites. Then add your overhead recovery and profit margin. Divide the total by 12 for a monthly retainer, or present it as a quarterly or annual fee. A typical maintenance contract for a small commercial premises (single distribution board, emergency lighting, fire alarm) might be in the range of 80 to 150 pounds per month. Larger or multi-site contracts are priced individually based on the PPM schedule.',
  },
  {
    question: 'What PPM frequencies are required by law?',
    answer:
      'For commercial and rented properties, the following frequencies are typically required or recommended: EICR every 5 years (mandatory for rented properties under the 2020 Regulations, recommended every 5 years for commercial under BS 7671), emergency lighting monthly function tests and annual full-duration tests (BS 5266), fire alarm weekly call point tests, quarterly full system tests, and annual service (BS 5839), and PAT testing at intervals determined by the risk assessment (IET Code of Practice provides guidance, typically annually for most portable equipment in a commercial environment). The maintenance contract should schedule all of these at the correct intervals.',
  },
  {
    question: 'Should I offer a fixed price or hourly rate?',
    answer:
      'Both models work, and the best choice depends on the client and the installation. A fixed monthly retainer gives the client predictable costs and gives you predictable revenue -- this is generally preferred by larger clients and property management companies. An hourly or per-visit rate with a minimum visit charge works well for smaller clients who may not justify a fixed retainer. A hybrid model -- fixed price for planned maintenance with hourly rates for reactive callouts -- is popular because it combines predictability for the scheduled work with flexibility for the unplanned. Whichever model you choose, be clear about what is included and what attracts additional charges.',
  },
  {
    question: 'How do I handle emergency callouts under a maintenance contract?',
    answer:
      'Define emergency callout procedures clearly in the contract. Specify who at the client organisation is authorised to request emergency callouts. Define what constitutes an emergency (loss of power, safety-critical fault, fire alarm system failure) versus an urgent issue (partial loss of power, non-critical fault). State your response time commitment for each category -- typically 2 to 4 hours for a genuine emergency, same day or next business day for urgent, and within 5 to 10 business days for routine. Specify whether emergency callouts are included in the contract price or charged separately (most contracts charge separately for reactive callouts, with contract clients receiving a discounted rate). Include your out-of-hours callout rate if applicable.',
  },
  {
    question: 'What records should I keep for maintenance contract work?',
    answer:
      'Maintain a complete record for every site visit: date and time of attendance, work carried out, any defects found and their classification, remedial work completed or recommended, test results, certificates issued (EICR, fire alarm certificate, emergency lighting certificate, PAT test records), parts and materials used, and the operative who carried out the work. These records serve multiple purposes: they demonstrate compliance to the client and any regulatory bodies, they provide continuity when different operatives attend the site, and they protect you legally if a dispute arises about the standard of work or the condition of the installation. Digital records stored in Elec-Mate are searchable, shareable, and cannot be lost or damaged.',
  },
  {
    question: 'How long should a maintenance contract run?',
    answer:
      'An initial contract term of 12 months is standard, with automatic renewal for successive 12-month periods unless either party gives written notice (typically 60 to 90 days before renewal). Some larger contracts run for 3 to 5 years with annual price review clauses. Avoid contracts that lock either party in without a reasonable exit mechanism -- this builds trust and demonstrates confidence in your service quality. Include a break clause that allows either party to terminate with 30 days notice for cause (such as persistent poor performance, non-payment, or material breach of terms).',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/schedule-manager-electrician',
    title: 'Schedule Manager',
    description:
      'Manage PPM schedules, reactive callouts, and recurring maintenance visits across all contract clients.',
    icon: CalendarDays,
    category: 'Business Tool',
  },
  {
    href: '/tools/job-profitability-calculator',
    title: 'Job Profitability Calculator',
    description:
      'Calculate true profit margins on maintenance contracts including labour, travel, materials, and overhead.',
    icon: BarChart3,
    category: 'Business Tool',
  },
  {
    href: '/guides/how-to-price-electrical-jobs',
    title: 'How to Price Electrical Jobs',
    description:
      'Pricing methodology covering labour rates, materials markup, overheads, and profit margin calculation.',
    icon: PoundSterling,
    category: 'Business Guide',
  },
  {
    href: '/guides/starting-electrical-business',
    title: 'Starting an Electrical Business',
    description:
      'From sole trader to employer -- setting up and growing a profitable electrical contracting business.',
    icon: Briefcase,
    category: 'Business Guide',
  },
  {
    href: '/tools/customer-management-electrician',
    title: 'Customer Management',
    description:
      'Track all contract clients, site details, equipment records, and communication history in one place.',
    icon: Users,
    category: 'Business Tool',
  },
  {
    href: '/tools/expenses-manager-electrician',
    title: 'Expenses Manager',
    description:
      'Track materials, mileage, and consumables against specific maintenance contracts for accurate costing.',
    icon: Receipt,
    category: 'Business Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-maintenance-contract',
    heading: 'What Is an Electrical Maintenance Contract?',
    content: (
      <>
        <p>
          An electrical maintenance contract is a formal agreement between an electrician or
          electrical contractor and a client (typically a commercial property owner, landlord, or
          facilities manager) to carry out planned electrical maintenance and respond to reactive
          faults over an agreed period.
        </p>
        <p>
          The contract defines what systems are covered, what maintenance activities will be
          performed and at what frequency, how quickly the contractor will respond to faults, and
          how the work is priced. A good maintenance contract benefits both parties: the client gets
          reliable, scheduled maintenance that keeps their installation safe and compliant, and the
          contractor gets predictable, recurring revenue that forms the backbone of a sustainable
          business.
        </p>
        <p>
          Maintenance contracts are particularly valuable for electricians looking to build a stable
          income stream. Unlike one-off installations that require constant marketing and quoting,
          maintenance contracts provide guaranteed work at regular intervals. A portfolio of 20 to
          30 maintenance contracts can provide enough base revenue to cover all business overheads,
          with installation and project work generating the growth and profit.
        </p>
        <p>
          The key to a successful maintenance contract is clarity. Both parties must understand
          exactly what is included, what is excluded, how quickly faults will be attended to, and
          what the costs are. Ambiguity leads to disputes. A well-drafted contract with a clear{' '}
          <SEOInternalLink href="/tools/schedule-manager-electrician">PPM schedule</SEOInternalLink>{' '}
          prevents misunderstandings and sets expectations from the start.
        </p>
      </>
    ),
  },
  {
    id: 'ppm-schedule',
    heading: 'Planned Preventive Maintenance (PPM) Schedule',
    content: (
      <>
        <p>
          The PPM schedule is the core of any maintenance contract. It lists every maintenance
          activity, the system or equipment it applies to, the frequency, the applicable standard,
          and the estimated duration. A comprehensive PPM schedule for a commercial premises
          typically includes the following:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR (Electrical Installation Condition Report)</strong> -- full inspection
                and testing of the fixed electrical installation every 5 years (or at the interval
                recommended by the previous inspector). Complies with BS 7671 and the IET Guidance
                Note 3.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting</strong> -- monthly 30-second function tests, 6-monthly
                visual inspections, and annual 3-hour full-duration tests. Complies with BS 5266-1.
                Results recorded and certificates issued annually.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire alarm system</strong> -- weekly call point tests (often done by the
                client), quarterly full system tests including all detectors and sounders, and
                annual service. Complies with BS 5839. Certificates issued after quarterly and
                annual inspections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PAT testing</strong> -- portable appliance testing at intervals determined
                by the risk assessment and the IET Code of Practice. Typically annually for most
                commercial environments, though some equipment may require more frequent testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Distribution board inspections</strong> -- annual thermal imaging or visual
                inspection of distribution boards, checking for signs of overheating, loose
                connections, and deterioration. Not a statutory requirement but excellent practice
                and a value-add for the client.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The PPM schedule should be presented as a calendar or Gantt chart showing exactly when
          each activity occurs throughout the year. This makes it easy for the client to plan access
          and for you to schedule the work efficiently, potentially grouping multiple activities
          into a single site visit to reduce travel costs.
        </p>
        <SEOAppBridge
          title="PPM Schedule Tracking"
          description="Set up recurring PPM schedules for every maintenance contract in Elec-Mate. Automatic reminders when inspections are due. Track completion status across all client sites from one dashboard."
          icon={CalendarDays}
        />
      </>
    ),
  },
  {
    id: 'response-times',
    heading: 'Response Times and Callout Commitments',
    content: (
      <>
        <p>
          Response time commitments are one of the most important elements of a maintenance
          contract. They define how quickly you will attend site when the client reports a fault.
          Getting this right requires balancing client expectations with your operational capacity.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency (2 to 4 hours)</strong> -- safety-critical faults where there is
                an immediate risk to life, property, or business continuity. Examples: complete loss
                of power, exposed live conductors, fire alarm system failure in an occupied
                building, electrical fire or burning smell. These require immediate attendance
                regardless of time of day.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Urgent (same day or next business day)</strong> -- faults that affect
                operations but do not pose an immediate safety risk. Examples: partial loss of
                power, RCD tripping intermittently, non-critical lighting failure, socket outlet not
                working. Attend within working hours on the same or next business day.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Routine (5 to 10 business days)</strong> -- non-urgent issues that can be
                scheduled. Examples: additional socket required, light fitting replacement, minor
                repair to an accessory, cosmetic issues. Schedule at mutual convenience within the
                agreed timeframe.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Be realistic about what you can deliver. If you are a sole trader, committing to a 2-hour
          emergency response across a wide geographical area is impractical and will lead to
          breaches. Better to commit to 4 hours and consistently deliver within 2 than to promise 2
          hours and regularly miss the target. For larger contractors with multiple operatives,
          tighter response times are achievable but must be backed by an on-call rota and clear
          escalation procedures.
        </p>
        <p>
          Define what happens when you cannot meet the response time -- for example, if you are
          already committed to another emergency. The contract should include provisions for
          escalation to a named backup contractor in exceptional circumstances.
        </p>
      </>
    ),
  },
  {
    id: 'sla-terms',
    heading: 'SLA Terms Every Contract Should Include',
    content: (
      <>
        <p>
          A Service Level Agreement (SLA) defines the measurable standards to which you commit.
          Beyond response times, a comprehensive SLA for an electrical maintenance contract should
          include the following terms:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>First-time fix rate target</strong> -- the percentage of reactive callouts
                resolved on the first visit (typically 80 to 90 percent). This requires carrying
                common spares and having the right test equipment on every callout.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PPM completion rate</strong> -- all planned maintenance visits completed
                within the scheduled month or quarter (target 100 percent, with rescheduling
                provisions for client-caused delays).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Documentation turnaround</strong> -- certificates, test results, and visit
                reports provided within an agreed timeframe (typically 24 to 48 hours for routine
                work, same day for emergency callouts).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Compliance guarantee</strong> -- all work carried out to the current edition
                of BS 7671 and all applicable British Standards. All operatives qualified and
                registered with a competent person scheme.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Quarterly reporting</strong> -- a summary report provided to the client each
                quarter covering all PPM activities completed, reactive callouts attended,
                outstanding defects, compliance status, and recommendations for the coming quarter.
              </span>
            </li>
          </ul>
        </div>
        <p>
          SLA terms should be measurable and achievable. Avoid vague commitments like "prompt
          attendance" or "best endeavours" -- these are unenforceable and create room for dispute.
          Instead, use specific numbers: "attend within 4 hours", "certificate issued within 48
          hours", "95 percent first-time fix rate measured quarterly". Clear metrics protect both
          parties and provide a framework for reviewing performance.
        </p>
      </>
    ),
  },
  {
    id: 'pricing-models',
    heading: 'Pricing Models for Maintenance Contracts',
    content: (
      <>
        <p>
          Choosing the right pricing model affects both your profitability and the client's
          perception of value. There are three common approaches:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fixed monthly retainer</strong> -- the client pays a fixed amount each month
                that covers all planned maintenance. Reactive callouts may be included (up to a
                capped number of hours) or charged separately at a discounted rate. This model
                provides predictable revenue for you and predictable costs for the client. Best
                suited to larger commercial clients and{' '}
                <SEOInternalLink href="/guides/electrical-maintenance-contract">
                  property management companies
                </SEOInternalLink>{' '}
                with multiple sites.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Per-visit pricing</strong> -- each PPM visit and reactive callout is priced
                individually, with contract clients receiving a discounted rate compared to ad-hoc
                customers. This model works well for smaller clients who may not justify a monthly
                retainer but value the priority service and discounted rates that come with a
                contract.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hybrid model</strong> -- fixed price for all planned maintenance (PPM), with
                reactive callouts charged at an agreed hourly rate plus materials. This combines the
                predictability of a retainer for the scheduled work with the flexibility of
                pay-as-you-go for the reactive element. Most popular model for medium-sized
                contracts.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When calculating your contract price, include all direct costs (labour, travel,
          consumables, certification), overhead recovery (insurance, vehicle, tools, software,
          administration), and your profit margin. Use the{' '}
          <SEOInternalLink href="/tools/job-profitability-calculator">
            job profitability calculator
          </SEOInternalLink>{' '}
          to model different pricing scenarios and ensure every contract is profitable. A common
          mistake is underpricing maintenance contracts to win the work and then finding that the
          actual cost of delivery exceeds the revenue. Better to lose a contract at a profitable
          price than win one at a loss.
        </p>
      </>
    ),
  },
  {
    id: 'documentation',
    heading: 'Documentation and Record Keeping',
    content: (
      <>
        <p>
          Professional documentation is what separates a maintenance contract from ad-hoc callout
          work. Every visit should generate a documented record that demonstrates what was done,
          what was found, and what needs attention next. This protects you legally, provides
          evidence of compliance to the client, and builds a maintenance history that improves the
          quality of future inspections.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visit reports</strong> -- a record of every maintenance visit including
                date, time, operative, work carried out, observations, and any defects found with
                their classification (C1, C2, C3, or FI).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certificates</strong> --{' '}
                <SEOInternalLink href="/guides/eicr-explained">EICR</SEOInternalLink>,{' '}
                <SEOInternalLink href="/guides/fire-alarm-certificate">
                  fire alarm certificate
                </SEOInternalLink>
                , emergency lighting certificate, and PAT test records issued on completion of the
                relevant inspections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Defect log</strong> -- a running log of all defects found, their
                classification, the recommended remedial action, whether the work has been
                completed, and the date of completion.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Quarterly compliance report</strong> -- a summary document for the client
                showing all PPM activities completed, upcoming scheduled maintenance, outstanding
                defects, and the overall compliance status of the installation.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Paper-based documentation is slow, prone to loss, and difficult to search. Digital
          documentation using Elec-Mate means every visit report, certificate, and defect record is
          stored securely in the cloud, searchable by site, date, or operative, and shareable with
          the client at the tap of a button. When a client asks "when was the last emergency
          lighting test at our Birmingham office?" you can answer in seconds, not hours.
        </p>
      </>
    ),
  },
  {
    id: 'client-retention',
    heading: 'Client Retention and Contract Renewal',
    content: (
      <>
        <p>
          Winning a maintenance contract is valuable. Keeping it is more valuable still. The cost of
          acquiring a new contract client (marketing, site surveys, proposals, negotiations) is
          typically 5 to 10 times the cost of retaining an existing one. Focus on retention as a
          core business strategy.
        </p>
        <p>
          <strong className="text-yellow-400">
            The factors that drive retention are straightforward:
          </strong>{' '}
          turn up when you say you will, do the work properly, provide clear documentation promptly,
          respond to faults within the agreed timeframe, communicate proactively about issues and
          recommendations, and be easy to deal with. Most clients do not switch contractors because
          they found someone cheaper -- they switch because the current contractor is unreliable,
          uncommunicative, or provides poor documentation.
        </p>
        <p>
          Before each contract renewal, prepare a review document showing everything you have done
          during the contract period: all PPM visits completed, reactive callouts attended, defects
          found and remedied, certificates issued, and your SLA performance against the agreed
          targets. This tangible evidence of value makes the renewal conversation straightforward
          and justifies any price increases.
        </p>
        <p>
          Proactive recommendations also drive retention. If you notice the distribution boards are
          ageing, suggest a phased replacement programme. If the{' '}
          <SEOInternalLink href="/guides/emergency-lighting-certificate">
            emergency lighting
          </SEOInternalLink>{' '}
          system is nearing end of life, propose an upgrade. Clients value a contractor who thinks
          ahead and prevents problems rather than just reacting to them.
        </p>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Maintenance Contract Mistakes',
    content: (
      <>
        <p>
          Electricians new to maintenance contracts often make avoidable mistakes that undermine
          profitability or damage client relationships. Here are the most common pitfalls:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Underpricing to win the contract</strong> -- setting the price below cost to
                beat competitors. You win the contract but lose money on every visit. Price for
                profitability from day one.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Vague scope of works</strong> -- failing to define exactly what is covered.
                The client expects everything to be included; you expected reactive work to be
                charged separately. This leads to disputes and erodes trust.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No exclusions clause</strong> -- without clear exclusions, the client may
                expect the contract to cover major works such as rewiring, consumer unit
                replacements, or new circuit installations. Define what is out of scope.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unrealistic response times</strong> -- committing to response times you
                cannot consistently deliver. One missed SLA target is recoverable; repeated failures
                give the client grounds to terminate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Poor record keeping</strong> -- failing to document every visit, test, and
                finding. Without records, you cannot demonstrate value at renewal time, and you have
                no defence if a dispute arises about the standard of your work.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Every one of these mistakes is preventable with proper planning, a well-drafted contract,
          and systematic record keeping. Take the time to get the contract right before the work
          starts -- it saves countless problems later.
        </p>
      </>
    ),
  },
  {
    id: 'elec-mate-maintenance',
    heading: 'Elec-Mate for Maintenance Contracts',
    content: (
      <>
        <p>
          Elec-Mate provides every tool an electrician needs to run professional maintenance
          contracts efficiently and profitably:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <CalendarDays className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">PPM Schedule Management</h4>
                <p className="text-white text-sm leading-relaxed">
                  Set up recurring maintenance schedules for every contract client. Elec-Mate
                  automatically schedules visits at the correct intervals and sends reminders when
                  inspections are due. Never miss a PPM visit again.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">On-Site Certification</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete <SEOInternalLink href="/guides/eicr-explained">EICRs</SEOInternalLink>,
                  fire alarm certificates, emergency lighting certificates, and PAT test records on
                  your phone during the visit. Send the certificate to the client before you leave
                  site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <BarChart3 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Contract Profitability Tracking</h4>
                <p className="text-white text-sm leading-relaxed">
                  Track time, materials, and expenses against each contract to see your true
                  profitability. Identify contracts that are underpriced and adjust at renewal.
                  Ensure every contract contributes to business growth.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          For electricians building a portfolio of maintenance contracts, Elec-Mate transforms the
          administrative burden into a streamlined process. Every visit, every certificate, every
          defect, and every client communication is captured in one platform. Professional,
          efficient, and profitable.
        </p>
        <SEOAppBridge
          title="Run Maintenance Contracts Professionally"
          description="PPM scheduling, on-site certification, defect tracking, and client reporting. Everything you need to run maintenance contracts efficiently. 7-day free trial, cancel anytime."
          icon={Wrench}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalMaintenanceContractPage() {
  return (
    <GuideTemplate
      title="Electrical Maintenance Contract | What to Include UK"
      description="Complete guide to electrical maintenance contracts. PPM schedules, response times, SLA terms, pricing models, documentation, and how Elec-Mate helps you run maintenance contracts professionally and profitably."
      datePublished="2026-01-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Business Guide"
      badgeIcon={Wrench}
      heroTitle={
        <>
          Electrical Maintenance Contract:{' '}
          <span className="text-yellow-400">What to Include UK</span>
        </>
      }
      heroSubtitle="A well-structured electrical maintenance contract provides predictable recurring revenue and protects both parties. This guide covers PPM schedules, response times, SLA terms, pricing models, documentation requirements, and how Elec-Mate helps you manage maintenance contracts efficiently."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Maintenance Contracts"
      relatedPages={relatedPages}
      ctaHeading="Run Maintenance Contracts Like a Pro"
      ctaSubheading="PPM scheduling, on-site certification, client reporting, and profitability tracking. Join 430+ UK electricians using Elec-Mate to manage their business. 7-day free trial, cancel anytime."
    />
  );
}
