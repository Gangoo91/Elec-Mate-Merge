import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  ClipboardCheck,
  FileCheck2,
  Users,
  Briefcase,
  Shield,
  FileText,
  Building2,
  Camera,
  BookOpen,
  CheckCircle2,
  Wrench,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business', href: '/guides/how-to-get-first-electrical-customer' },
  { label: 'Project Handover', href: '/guides/electrical-project-handover-guide' },
];

const tocItems = [
  { id: 'overview', label: 'Why Handover Matters' },
  { id: 'documentation', label: 'Documentation Checklist' },
  { id: 'eic-eicr', label: 'Electrical Certificates (EIC / EICR)' },
  { id: 'om-manuals', label: 'Operation and Maintenance Manuals' },
  { id: 'as-built-drawings', label: 'As-Built Drawings' },
  { id: 'client-walkthrough', label: 'Client Walkthrough' },
  { id: 'warranty', label: 'Warranty and Aftercare' },
  { id: 'commercial-handover', label: 'Commercial Project Handover' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A professional handover includes: the Electrical Installation Certificate (EIC) or Minor Works certificate, operation and maintenance information, as-built drawings or a schedule of circuits, photos of concealed work, and a client walkthrough.',
  'The EIC is a legal requirement for all new circuits notifiable under Part P of the Building Regulations. Without it, the customer cannot prove the work is safe and compliant, and you are in breach of your competent person scheme obligations.',
  'O&M (operation and maintenance) information is a legal requirement under the CDM Regulations 2015 for commercial projects. For domestic work it is not legally required but is expected by professional customers and adds significant value.',
  'As-built drawings (or a circuit schedule with locations) tell the next electrician where everything is. This is especially important for concealed wiring where cable routes are not visible. Photos taken before plasterboard goes up serve the same purpose.',
  'The client walkthrough is your chance to demonstrate the installation, explain how everything works, hand over documentation, and leave the customer feeling confident. This is also where you collect final payment and ask for a review.',
];

const faqs = [
  {
    question: 'What documentation should I hand over for a domestic rewire?',
    answer:
      'For a domestic rewire, hand over: (1) The Electrical Installation Certificate (EIC) — this is the primary legal document proving the installation complies with BS 7671. (2) A schedule of test results — attached to the EIC, showing the results for every circuit. (3) A circuit chart — labelling every circuit in the consumer unit with its purpose and the rooms/areas it serves. (4) Manufacturer instructions for any equipment installed (consumer unit, smoke detectors, dimmer switches, programmable devices). (5) Photos of concealed cable routes taken before plastering — either printed or shared digitally. (6) A brief description of the work carried out and any assumptions or limitations. This package takes 30 to 60 minutes to prepare and is the mark of a professional electrician.',
  },
  {
    question: 'Do I need to provide an EIC for every job?',
    answer:
      'An EIC is required for all new installations and alterations that are notifiable under Part P of the Building Regulations. This includes: new circuits, consumer unit replacements, rewires, additions to existing circuits in bathrooms and kitchens (in some cases), and outdoor electrical work. A Minor Electrical Installation Works Certificate (MEIWC) is appropriate for minor additions to existing circuits (such as adding a socket to an existing ring final). For inspection and testing only (no new work), an Electrical Installation Condition Report (EICR) is the correct certificate. Check your competent person scheme guidance for which certificate applies to each job.',
  },
  {
    question: 'What is an O&M manual and do I need to provide one?',
    answer:
      'An O&M (operation and maintenance) manual is a document that tells the building owner how to operate and maintain the electrical installation. For commercial projects, it is a legal requirement under the CDM Regulations 2015 — the document forms part of the "health and safety file" that the principal designer must compile. For domestic work, there is no legal requirement, but providing basic O&M information (how to reset the RCD, what each circuit controls, when to schedule the next EICR, manufacturer instructions for equipment) is excellent professional practice. A simple 2 to 4 page document plus manufacturer data sheets is sufficient for domestic work.',
  },
  {
    question: 'How do I create as-built drawings?',
    answer:
      'As-built drawings show the electrical installation as it was actually installed — including any changes from the original design. For domestic work, a formal drawing is rarely needed. Instead, provide: a clear circuit chart in the consumer unit (laminated, stuck to the inside of the cover), photos of cable routes before they were concealed (with annotations showing which circuit each cable serves), and a written description of any non-standard routing. For commercial work, as-built drawings should be produced using CAD software or at minimum updated on the original design drawings. Mark up any changes from the design in red. As-built drawings are a contractual requirement on most commercial contracts and must be submitted as part of the O&M manual.',
  },
  {
    question: 'What should I cover in the client walkthrough?',
    answer:
      'Walk the customer through the entire installation: show them the consumer unit and explain what each circuit does, demonstrate how to reset the RCD and MCBs, show them the smoke detection system and how to silence a false alarm, demonstrate any smart or programmable devices, explain the outdoor lighting controls, point out the location of isolation switches for fixed appliances. Also explain: when the next EICR is due (every 5 years for rented properties, recommended every 10 years for owner-occupied), how to spot signs of electrical faults (burning smell, warm sockets, flickering lights, tripping circuits), and who to call in an emergency. This walkthrough typically takes 15 to 30 minutes and is enormously appreciated by customers.',
  },
  {
    question: 'What warranty should I provide for electrical work?',
    answer:
      'There is no statutory requirement to provide a specific warranty period for electrical work, but industry standard is: workmanship guarantee of 1 to 2 years (covering defects in your installation), which is in addition to the customer consumer rights (up to 6 years for faulty workmanship under the Limitation Act 1980). Products and equipment carry the manufacturer warranty (typically 1 to 5 years for accessories, 5 to 10 years for consumer units and quality fittings). State your warranty clearly in your terms and conditions: what is covered (defects in workmanship and materials you supplied), what is not covered (damage by others, misuse, wear and tear, modifications by others), the duration, and how to make a claim. A written warranty demonstrates confidence in your work and differentiates you from competitors.',
  },
  {
    question: 'What additional documentation is needed for commercial handover?',
    answer:
      'Commercial project handover requires significantly more documentation: EIC with full schedule of test results, O&M manual (including all manufacturer data sheets, commissioning records, and maintenance schedules), as-built drawings (CAD format, updated from design), fire alarm commissioning certificate (if applicable), emergency lighting commissioning certificate (if applicable), health and safety file contributions, product warranties and guarantees, spare parts schedule, training records (if you trained the client staff on systems), and snagging list sign-off. On larger commercial projects, the handover is a formal process with a documented meeting, punch list review, and sign-off by the client or their representative.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete your EIC on site and include it in the handover package.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/working-with-other-trades-electrician',
    title: 'Working with Other Trades',
    description:
      'Coordinate handover timing with other trades on multi-trade projects.',
    icon: Users,
    category: 'Guide',
  },
  {
    href: '/guides/health-safety-policy-electrician',
    title: 'Health and Safety Policy',
    description:
      'H&S documentation feeds into the commercial handover health and safety file.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/guides/finding-commercial-electrical-work',
    title: 'Finding Commercial Work',
    description:
      'Professional handovers win repeat commercial contracts.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-estimating-guide',
    title: 'Electrical Estimating Guide',
    description:
      'Include handover time in your estimates — it is billable work.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/how-to-get-first-electrical-customer',
    title: 'Getting Your First Customer',
    description:
      'A great handover leads to reviews and referrals — your best marketing.',
    icon: Briefcase,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Project Handover: Finish Like a Professional',
    content: (
      <>
        <p>
          The way you finish a job is what the customer remembers. A clean, professional
          handover — with all documentation, a walkthrough, and a clear explanation — turns a
          completed job into a lasting impression. It is also what gets you five-star reviews,
          referrals, and repeat business.
        </p>
        <p>
          Too many electricians finish the work, test, slap the certificate on the worktop,
          and leave. That is a missed opportunity. A proper handover takes 30 to 60 minutes
          and includes documentation, demonstration, and a conversation about ongoing
          maintenance. It is billable time and it is time well spent.
        </p>
        <p>
          This guide covers what you need to hand over for domestic and commercial projects,
          how to conduct a client walkthrough, and what warranty and aftercare to provide.
        </p>
      </>
    ),
  },
  {
    id: 'documentation',
    heading: 'Documentation Checklist',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-4 flex items-center gap-2">
            <ClipboardCheck className="w-4 h-4 text-yellow-400" /> Domestic Handover Checklist
          </h4>
          <ul className="space-y-3 text-white text-sm">
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
              <span>Electrical Installation Certificate (EIC) or Minor Works Certificate</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
              <span>Schedule of test results</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
              <span>Circuit chart (labelled, inside consumer unit cover)</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
              <span>Manufacturer instructions for installed equipment</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
              <span>Photos of concealed cable routes</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
              <span>Written description of work carried out</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
              <span>Warranty statement</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
              <span>Building Regulations notification confirmation (from your CPS)</span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eic-eicr',
    heading: 'Electrical Certificates: EIC, MEIWC, and EICR',
    content: (
      <>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-blue-400" /> EIC (Electrical Installation Certificate)
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Required for all new installations and major alterations. Confirms the
              installation complies with BS 7671 at the time of completion. Must include
              full schedule of test results for every circuit. This is the certificate you
              issue for rewires, new circuits, consumer unit replacements, and other
              notifiable work.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-green-400" /> MEIWC (Minor Works Certificate)
            </h3>
            <p className="text-white text-sm leading-relaxed">
              For minor additions or alterations to existing circuits — such as adding a
              socket to an existing ring final, replacing a light fitting, or adding an FCU.
              Does not require a full schedule of test results but must confirm the work
              complies with BS 7671 and includes relevant test results.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-purple-400" /> EICR (Electrical Installation Condition Report)
            </h3>
            <p className="text-white text-sm leading-relaxed">
              For inspection and testing of existing installations — no new work involved.
              Reports on the condition of the installation and identifies any defects. Required
              every 5 years for rental properties (England, from 2020). Recommended every 10
              years for owner-occupied domestic and every 5 years for commercial.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'om-manuals',
    heading: 'Operation and Maintenance Manuals',
    content: (
      <>
        <p>
          An O&M manual tells the building owner how to operate and maintain the electrical
          installation. For domestic work, a simple document is sufficient. For commercial
          work, it is a contractual and legal requirement.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-4">Domestic O&M Contents (2 to 4 pages)</h4>
          <ul className="space-y-2 text-white text-sm">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
              Description of the installation
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
              How to reset the RCD and MCBs after a trip
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
              How to test the RCD (press the test button monthly)
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
              Smoke detector maintenance (test weekly, replace batteries annually)
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
              When to schedule the next EICR
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
              Signs of electrical faults to watch for
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
              Your contact details for aftercare
            </li>
          </ul>
        </div>
        <p>
          Attach manufacturer data sheets for all installed equipment — consumer unit, smoke
          detectors, dimmer switches, timers, smart devices. Customers lose individual
          instruction leaflets; the O&M manual keeps everything in one place.
        </p>
      </>
    ),
  },
  {
    id: 'as-built-drawings',
    heading: 'As-Built Drawings and Cable Routes',
    content: (
      <>
        <p>
          As-built drawings show the installation as it was actually installed. For domestic
          work, this does not need to be a formal CAD drawing — photographs and a circuit
          schedule serve the same purpose.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
              <Camera className="w-5 h-5 text-blue-400" /> Domestic: Photos
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Photograph every cable route before it is concealed — in walls before
              plasterboard, under floors before boards go down, in the loft before insulation
              covers cables. Annotate the photos with circuit numbers. Share digitally with
              the customer (email or app) so they have a permanent record.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-400" /> Commercial: Drawings
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Update the original design drawings to show the installation as built. Mark all
              changes from the design in red (known as "red-line" drawings). Include: circuit
              routes, containment routes, distribution board locations, switch and socket
              positions, fire alarm and emergency lighting layouts. Submit in both PDF and
              editable format (DWG/DXF).
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'client-walkthrough',
    heading: 'Client Walkthrough: Show, Explain, Impress',
    content: (
      <>
        <p>
          The client walkthrough is the most personal part of the handover. It is your chance
          to demonstrate the quality of your work, educate the customer, and leave a lasting
          positive impression.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-4">Walkthrough Agenda (15 to 30 minutes)</h4>
          <div className="space-y-3 text-white text-sm">
            <div className="border-b border-white/10 pb-2">
              <strong>1. Consumer unit</strong> — explain what each circuit controls, demonstrate
              RCD test button, show how to reset a tripped MCB or RCBO.
            </div>
            <div className="border-b border-white/10 pb-2">
              <strong>2. Smoke detection</strong> — test the system, show how to silence a false
              alarm, explain battery replacement if applicable.
            </div>
            <div className="border-b border-white/10 pb-2">
              <strong>3. Room-by-room tour</strong> — demonstrate switches, sockets, lighting
              controls, and any special features (dimmers, timers, outdoor lighting controls).
            </div>
            <div className="border-b border-white/10 pb-2">
              <strong>4. Smart devices and programmable controls</strong> — set up and
              demonstrate any smart thermostats, lighting controls, or automation.
            </div>
            <div className="border-b border-white/10 pb-2">
              <strong>5. Documentation handover</strong> — present the complete handover pack
              (EIC, O&M, photos, manufacturer instructions) and explain what each document is.
            </div>
            <div className="pb-2">
              <strong>6. Aftercare</strong> — explain your warranty, when to schedule the next
              EICR, and how to contact you if there is a problem.
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'warranty',
    heading: 'Warranty and Aftercare',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-yellow-400" /> Standard Warranty Coverage
          </h4>
          <div className="space-y-3 text-white text-sm">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Workmanship (your installation)</span>
              <strong className="text-yellow-400">1 to 2 years</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Consumer units (manufacturer)</span>
              <strong className="text-yellow-400">5 to 10 years</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Wiring accessories (manufacturer)</span>
              <strong className="text-yellow-400">1 to 5 years</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Smoke detectors (manufacturer)</span>
              <strong className="text-yellow-400">5 to 10 years</strong>
            </div>
            <div className="flex justify-between pb-2">
              <span>Cable (manufacturer)</span>
              <strong className="text-yellow-400">20 to 25+ years</strong>
            </div>
          </div>
        </div>
        <p>
          <strong>Consumer rights:</strong> Under the Consumer Rights Act 2015 and the
          Limitation Act 1980, customers can claim for faulty workmanship for up to 6 years.
          Your formal warranty period does not limit their statutory rights. A clear warranty
          statement shows confidence in your work and sets expectations for what you will
          fix proactively versus what requires a formal claim.
        </p>
      </>
    ),
  },
  {
    id: 'commercial-handover',
    heading: 'Commercial Project Handover',
    content: (
      <>
        <p>
          Commercial handover is more formal and documentation-heavy. The handover package
          typically includes:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white text-sm">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
              EIC with full schedule of test results
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
              O&M manual (comprehensive, with all manufacturer data)
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
              As-built drawings (PDF and editable format)
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
              Fire alarm commissioning certificate (BS 5839)
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
              Emergency lighting commissioning certificate (BS 5266)
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
              Health and safety file contributions
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
              Warranties and guarantees
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
              Spare parts schedule
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
              Training records for client staff
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
              Snagging list sign-off
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: The Handover Is Part of the Job',
    content: (
      <>
        <p>
          Include handover time in your quote — it is billable work, not an afterthought.
          Budget 30 to 60 minutes for domestic and 2 to 4 hours for commercial. The handover
          is also when you collect final payment, ask for a review, and plant the seed for
          future work ("Your next EICR is due in 2031 — I will send you a reminder").
        </p>
        <SEOAppBridge
          title="Generate handover documentation on site"
          description="Elec-Mate creates professional EICs, test schedules, and handover packs digitally — complete on site and share instantly with your customer. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalProjectHandoverPage() {
  return (
    <GuideTemplate
      title="Electrical Project Handover Guide UK 2026 | Documentation Checklist"
      description="Complete guide to electrical project handover. EIC certificates, O&M manuals, as-built drawings, client walkthrough, warranty, and commercial handover requirements."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Project Guide"
      badgeIcon={FileCheck2}
      heroTitle={
        <>
          Electrical Project Handover Guide:{' '}
          <span className="text-yellow-400">Documentation, Walkthrough, and Warranty</span>
        </>
      }
      heroSubtitle="What to hand over, how to conduct a client walkthrough, and what warranty to provide. The complete handover guide for domestic and commercial electrical projects."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Project Handover"
      relatedPages={relatedPages}
      ctaHeading="Create Professional Handover Packs On Site"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for certificates, test schedules, and handover documentation. Complete everything on site, share instantly. 7-day free trial, cancel anytime."
    />
  );
}
