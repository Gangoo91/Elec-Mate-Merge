import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Bell,
  AlertTriangle,
  FileCheck2,
  ClipboardCheck,
  CheckCircle2,
  Building2,
  ShieldCheck,
  PoundSterling,
  FileText,
  Calculator,
  Zap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Electrical Work Notification', href: '/guides/electrical-work-notification-part-p' },
];

const tocItems = [
  { id: 'overview', label: 'Why Notification Exists' },
  { id: 'notifiable-work', label: 'Specifically Notifiable Work' },
  { id: 'how-to-notify', label: 'How to Notify Building Control' },
  { id: 'competent-person', label: 'Using a Competent Person Scheme' },
  { id: 'costs', label: 'Cost of Building Notice' },
  { id: 'completion-cert', label: 'Completion Certificate' },
  { id: 'property-sale', label: 'Importance for Property Sale' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Notifiable electrical work in dwellings must be either self-certified by a registered competent person or notified to the local authority building control department before commencement.',
  'Specifically notifiable work includes: new circuits, consumer unit replacements, all work in kitchens involving new circuits, all work in bathrooms, and new outdoor or outbuilding supplies.',
  'Building notice fees at most local authorities range from £200 to £400 for typical domestic electrical jobs — significantly more than annual scheme membership for a working electrician.',
  'The completion certificate issued by building control (or the self-certification certificate from a scheme) is essential evidence of Building Regulations compliance for property sale.',
  'Competent person scheme members notify the local authority automatically on behalf of the homeowner within 30 days of completing notifiable work.',
];

const faqs = [
  {
    question: 'What is the difference between a building notice and a full plans application?',
    answer:
      'A building notice is a simplified notification that does not require detailed plans to be submitted in advance. The homeowner submits the notice before work commences, the work is carried out, and building control inspects at the end. If the work fails, the homeowner bears the cost of rectification. A full plans application involves submitting detailed plans for prior approval by building control. The council reviews and approves the plans before work starts, then inspects during and after the work. Full plans provide greater certainty but are slower and more expensive. For typical domestic electrical work such as a consumer unit replacement or new kitchen circuit, a building notice is the standard route.',
  },
  {
    question: 'How do I notify building control for electrical work?',
    answer:
      'If you are not registered with a competent person scheme, the homeowner submits a building notice to the local authority building control department before work commences. Most councils accept online submissions through the Planning Portal or their own website. The notice includes: a description of the work to be done, the address of the property, the applicant\'s details, and the fee payment. Building control will acknowledge the notice and arrange an inspection on completion. If you are registered with a competent person scheme (NICEIC, NAPIT, ELECSA, etc.), you notify building control through your scheme on behalf of the homeowner after the work is complete.',
  },
  {
    question: 'How much does a building notice cost for electrical work?',
    answer:
      'Building notice fees are set by each local authority and vary across the country. For typical domestic electrical work, fees generally range from £200 to £400. Consumer unit replacements and new circuit installations tend to attract fees in the £200 to £300 range. More complex jobs or multiple items of notifiable work at the same property may attract higher fees. Some councils charge a percentage of the estimated cost of the work rather than a fixed fee. For comparison, annual membership of an approved competent person scheme typically costs £200 to £600, covering unlimited self-certifications — making scheme membership more cost-effective for electricians who carry out regular domestic work.',
  },
  {
    question: 'What happens if I start notifiable work before notifying building control?',
    answer:
      'Starting notifiable work before submitting a building notice (or before an approved competent person scheme member is engaged) is a breach of Part P. However, a building notice can be submitted as a regularisation application after the work is completed, though some councils charge higher fees for regularisation. The building control officer will inspect the completed work and may require invasive inspection (opening walls, etc.) if they cannot verify compliance visually. If the work cannot be inspected adequately, the council may require it to be removed and redone. Regularisation does not protect the homeowner from enforcement action, though in practice councils generally prefer to achieve compliance rather than prosecute.',
  },
  {
    question: 'Does the completion certificate affect my home insurance?',
    answer:
      'Yes. Most home insurance policies require that electrical work is carried out by qualified persons and in compliance with Building Regulations. If a claim arises from electrical work that has not been notified or certified, the insurer may refuse to pay on the grounds that the homeowner failed to comply with their policy conditions. The completion certificate (from building control or a competent person scheme) provides evidence that the work meets the required standards. Homeowners should keep certificates indefinitely — not just for insurance purposes, but also for eventual property sale.',
  },
  {
    question: 'Can I use an indemnity insurance policy instead of a completion certificate?',
    answer:
      'Indemnity insurance policies are sometimes used in property transactions when a completion certificate cannot be produced for old work. The policy protects the buyer financially if the local authority takes enforcement action. However, indemnity policies are not a substitute for proper certification — they do not confirm the work is safe or compliant, and they do not protect against the consequences of a fault in the installation. Many mortgage lenders and buyers now refuse to accept indemnity policies for electrical work and require the work to be properly inspected and certified. An EICR carried out by a qualified electrician provides the buyer with actual evidence of the electrical installation\'s condition.',
  },
  {
    question: 'How long does it take for building control to issue a completion certificate?',
    answer:
      'After the building control officer inspects the completed work and is satisfied that it complies with Building Regulations, they issue a completion certificate. The timescale from inspection to certificate varies by council but is typically 2 to 6 weeks. Some councils issue certificates faster. If building control requests additional information or a further inspection, the process takes longer. In contrast, competent person scheme self-certification is typically much faster — the electrician issues the homeowner with a certificate on the day, and the scheme notifies the council within 30 days.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/part-p-building-regulations-electrical',
    title: 'Part P Building Regulations Guide',
    description: 'Full overview of Part P — what it covers, notifiable vs non-notifiable work.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Issue Electrical Installation Certificates on site from your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/minor-works-certificate',
    title: 'Minor Works Certificate',
    description: 'Issue Minor Electrical Installation Works Certificates instantly.',
    icon: ClipboardCheck,
    category: 'Certificate',
  },
  {
    href: '/guides/electrical-handover-documentation',
    title: 'Electrical Handover Documentation',
    description: 'All the documents required on completion of notifiable electrical work.',
    icon: FileText,
    category: 'Guide',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size cables for new circuits requiring Part P notification.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/competent-person-scheme-electricians',
    title: 'Competent Person Scheme Guide',
    description: 'NICEIC, NAPIT, ELECSA — which scheme to join and the benefits of membership.',
    icon: ShieldCheck,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Why Electrical Work Notification Exists',
    content: (
      <>
        <p>
          Part P of the Building Regulations (England) introduced mandatory notification for
          certain types of domestic electrical work in January 2005. The notification requirement
          exists because electrical installations in dwellings had historically been carried out
          without any form of oversight, and the consequences — house fires, electrocution, and
          dangerous installations — were significant.
        </p>
        <p>
          The system is based on two routes to compliance: self-certification by a registered
          competent person scheme member, or prior notification to building control. The intent is
          that higher-risk electrical work — work that creates new circuits, work in dangerous
          locations such as kitchens and bathrooms, or work that involves the main distribution
          equipment — is checked by someone who can verify it is safe and compliant with BS 7671.
        </p>
        <p>
          Approved Document P was revised in 2013, narrowing the scope of notifiable work
          significantly. The 2013 revision removed the notification requirement for adding sockets
          to existing circuits in most rooms, which reduced the administrative burden considerably
          while maintaining oversight of higher-risk work.
        </p>
      </>
    ),
  },
  {
    id: 'notifiable-work',
    heading: 'Specifically Notifiable Work Under Part P',
    content: (
      <>
        <p>
          Approved Document P (2013) defines notifiable work precisely. The following categories
          of electrical work in dwellings are notifiable:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <div>
                <strong>New circuits originating at the consumer unit</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  Any new circuit — for an EV charger, heat pump, battery storage system, new
                  kitchen appliance circuit, additional lighting circuit, or any other purpose —
                  is notifiable. This includes new circuits installed as part of a loft conversion
                  or extension.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <div>
                <strong>Consumer unit replacement</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  Replacing a consumer unit (fuse board) with a new unit is notifiable regardless
                  of the reason. This is one of the most common notifiable jobs — consumer unit
                  upgrades to provide RCD protection, metal enclosures (required post-2016), or
                  additional ways.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <div>
                <strong>All electrical work in kitchens (where a new circuit is involved)</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  Installing new circuits for a cooker, dishwasher, washing machine, or additional
                  sockets in a kitchen is notifiable. Like-for-like replacement of existing
                  accessories in a kitchen on an existing circuit is non-notifiable.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <div>
                <strong>All electrical work in bathrooms and shower rooms</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  Any electrical work in a bathroom or shower room — other than like-for-like
                  replacement of accessories on existing circuits — is notifiable. This includes
                  new shower circuits, electric towel rail supplies, fan circuits, lighting
                  changes, and shaver socket installation.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <div>
                <strong>Outdoor supplies and new garden circuits</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  New outdoor socket circuits, garden lighting circuits, and supplies to
                  outbuildings (garages, sheds, summer houses, workshops) are all notifiable
                  because they involve new circuits from the consumer unit.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'how-to-notify',
    heading: 'How to Notify Building Control',
    content: (
      <>
        <p>
          Where the electrician is not registered with a competent person scheme, the homeowner
          must notify the local authority building control department before notifiable work
          commences. The process is:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li className="flex items-start gap-3">
              <span className="font-bold text-yellow-400 text-lg shrink-0">1.</span>
              <span>
                Identify the local authority for the property address. This is the district or
                borough council, not the county council.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-yellow-400 text-lg shrink-0">2.</span>
              <span>
                Visit the council's building control website or the Planning Portal
                (planningportal.co.uk) to submit a building notice application online. Most councils
                also accept paper applications.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-yellow-400 text-lg shrink-0">3.</span>
              <span>
                Complete the building notice form: description of work, address, applicant details,
                estimated cost of work, and declaration. Pay the building notice fee.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-yellow-400 text-lg shrink-0">4.</span>
              <span>
                Await acknowledgement from building control (usually within 2 to 5 working days).
                Work should not commence until the notice has been acknowledged.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-yellow-400 text-lg shrink-0">5.</span>
              <span>
                Carry out the work to BS 7671 standards. Building control may visit during the
                work; they will definitely inspect on completion.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-yellow-400 text-lg shrink-0">6.</span>
              <span>
                Notify building control on completion. They will arrange an inspection and, if
                satisfied, issue a completion certificate.
              </span>
            </li>
          </ol>
        </div>
        <p>
          The building notice remains valid for 3 years from the date of submission. If work does
          not commence within 3 years, a new building notice must be submitted.
        </p>
      </>
    ),
  },
  {
    id: 'competent-person',
    heading: 'Using a Competent Person Scheme: The Easier Route',
    content: (
      <>
        <p>
          For working electricians, the most practical route to Part P compliance is membership of
          an approved competent person scheme. Registered members can self-certify notifiable work
          without involving building control. The scheme notifies the local authority automatically
          within 30 days of the work being completed.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Advantages for Electricians</h3>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span>No building control fees per job</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span>No delays waiting for building control acknowledgement</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span>Certificate issued to homeowner on the day</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span>Professional credibility — scheme logo on marketing</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span>Appears on scheme's public register — generates leads</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Advantages for Homeowners</h3>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Certificate on the day — no waiting for council inspection</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>No building notice fee to pay</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Work certified by independently assessed competent person</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Scheme complaints procedure if issues arise</span>
              </li>
            </ul>
          </div>
        </div>
        <SEOAppBridge
          title="Self-certify with confidence"
          description="Elec-Mate's EIC and Minor Works Certificate apps are designed for competent person scheme members. Complete your certificates on site, issue them to the homeowner, and upload to your scheme portal — all from your phone."
          icon={ShieldCheck}
        />
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Cost of Building Notice for Electrical Work',
    content: (
      <>
        <p>
          Building notice fees are set by each local authority and can vary significantly. The table
          below gives typical fee ranges for common notifiable electrical work:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4 overflow-x-auto">
          <table className="w-full text-white text-sm">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-3 pr-4 font-semibold">Type of Work</th>
                <th className="text-left py-3 font-semibold">Typical Fee Range</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="py-3 pr-4">Consumer unit replacement</td>
                <td className="py-3">£180 – £320</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">New single circuit (e.g. EV charger, cooker)</td>
                <td className="py-3">£200 – £350</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">New bathroom electrical work</td>
                <td className="py-3">£200 – £380</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">Outbuilding supply (new circuit)</td>
                <td className="py-3">£200 – £400</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">Full rewire (multiple circuits)</td>
                <td className="py-3">£400 – £800+</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          These fees represent a significant cost per job compared with the annual membership fee
          for a competent person scheme. An electrician carrying out just 3 to 4 notifiable jobs
          per year who is not scheme-registered would pay more in building notice fees than a year's
          scheme membership. For electricians doing regular domestic work, competent person scheme
          membership is nearly always the more economical route.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5 my-4 flex items-start gap-4">
          <PoundSterling className="w-6 h-6 text-yellow-400 shrink-0 mt-0.5" />
          <p className="text-white text-sm leading-relaxed">
            Building notice fees are the homeowner's cost, not the electrician's. However, the time
            delays associated with building control — waiting for acknowledgement before starting,
            arranging the completion inspection — are the electrician's problem. Scheme membership
            eliminates these delays.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'completion-cert',
    heading: 'Completion Certificate and Its Importance',
    content: (
      <>
        <p>
          A completion certificate (also called a Building Regulations completion certificate) is
          issued by building control after they have inspected the completed notifiable work and
          are satisfied that it complies with the Building Regulations. For work self-certified
          by a competent person scheme member, an equivalent certificate is issued by the
          electrician on behalf of the scheme.
        </p>
        <p>
          The certificate confirms:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>The electrical work described has been carried out at the address stated.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                The work has been inspected and tested and is believed to comply with Part P and
                BS 7671.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                The local authority has been notified (either directly via building control or by
                the competent person scheme).
              </span>
            </li>
          </ul>
        </div>
        <p>
          The homeowner should keep the completion certificate indefinitely. It is a permanent record
          of the electrical work carried out and will be requested by buyers' solicitors when the
          property is sold. Losing the certificate does not extinguish the record — building control
          maintains records, and the competent person scheme database retains records — but
          obtaining a copy retrospectively takes time and may cause delays in a property sale.
        </p>
        <p>
          The{' '}
          <SEOInternalLink href="/tools/eic-certificate">
            Electrical Installation Certificate
          </SEOInternalLink>{' '}
          or{' '}
          <SEOInternalLink href="/tools/minor-works-certificate">
            Minor Works Certificate
          </SEOInternalLink>{' '}
          issued by the electrician is separate from the Part P completion certificate but is an
          important companion document. The EIC or MEIWC records the technical details of the
          installation, including test results, and should be issued alongside the Part P
          certificate for every notifiable job.
        </p>
      </>
    ),
  },
  {
    id: 'property-sale',
    heading: 'Why the Completion Certificate Matters for Property Sale',
    content: (
      <>
        <p>
          When a homeowner sells their property, the conveyancing process requires disclosure of
          any building work carried out. The buyer's solicitors will ask for evidence of Building
          Regulations compliance for any notifiable electrical work. Without a completion
          certificate, the sale can be delayed or complicated.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Indemnity insurance requirement</strong> — without a certificate, the buyer's
                solicitor may require an indemnity insurance policy, which can cost £100 to £500.
                Some buyers refuse to accept indemnity policies and require the work to be properly
                certified before exchange.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Price renegotiation</strong> — a buyer may use missing certificates as a
                basis for renegotiating the purchase price downwards, to cover the cost of having the
                electrical installation inspected and certified retrospectively.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mortgage implications</strong> — some mortgage lenders require evidence of
                Building Regulations compliance as a condition of the mortgage offer. If the buyer's
                lender insists on a certificate, the sale may not be able to proceed until the
                work is certified.
              </span>
            </li>
          </ul>
        </div>
        <p>
          An{' '}
          <SEOInternalLink href="/guides/electrical-safety-checks-new-home">
            EICR carried out at point of sale
          </SEOInternalLink>{' '}
          can provide some assurance about the condition of the electrical installation, but it does
          not substitute for Part P compliance documentation for specific notifiable works. Both
          the EICR and the original certificates serve different purposes.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Streamlining the Notification Process',
    content: (
      <>
        <p>
          The notification process should be seamless for electricians who are registered with an
          approved competent person scheme. The key is issuing the correct certificates at the end
          of every job and ensuring the scheme processes the notification promptly.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Issue Certificates on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Elec-Mate lets you complete your{' '}
                  <SEOInternalLink href="/tools/eic-certificate">EIC</SEOInternalLink>{' '}
                  or{' '}
                  <SEOInternalLink href="/tools/minor-works-certificate">
                    Minor Works Certificate
                  </SEOInternalLink>{' '}
                  on your phone on site, and send the PDF to the homeowner immediately. No
                  forgetting to issue certificates, no chasing paperwork later.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI-Assisted Compliance Checks</h4>
                <p className="text-white text-sm leading-relaxed">
                  Not sure if a specific job is notifiable? Elec-Mate's AI assistant can check
                  Part P requirements on site and help you advise the homeowner accurately. Avoid
                  missing a notification or over-notifying non-notifiable work.
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

export default function ElectricalWorkNotificationGuidePage() {
  return (
    <GuideTemplate
      title="Electrical Work Notification Part P | What Must Be Notified"
      description="Detailed guide to electrical work notification under Part P Building Regulations. What work is specifically notifiable, how to notify building control, building notice costs, completion certificates, and why documentation matters for property sale."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Part P Guide"
      badgeIcon={Bell}
      heroTitle={
        <>
          Electrical Work Notification:{' '}
          <span className="text-yellow-400">Part P — What Must Be Notified</span>
        </>
      }
      heroSubtitle="Part P requires notification to building control for specific types of domestic electrical work. This guide covers exactly what is notifiable, how the building notice process works, what it costs, and why the completion certificate is essential."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Work Notification"
      relatedPages={relatedPages}
      ctaHeading="Issue Part P Certificates On Site, Instantly"
      ctaSubheading="Elec-Mate lets competent person scheme members issue EICs and Minor Works Certificates on site from their phone. AI board scanning, voice test entry, instant PDF — documentation done before you leave. 7-day free trial."
    />
  );
}
