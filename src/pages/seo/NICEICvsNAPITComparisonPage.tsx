import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  ShieldCheck,
  PoundSterling,
  ClipboardCheck,
  Users,
  Building2,
  Scale,
  Star,
  Zap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Registration Schemes', href: '/guides/niceic-vs-napit-comparison' },
  { label: 'NICEIC vs NAPIT Comparison', href: '/niceic-vs-napit-comparison' },
];

const tocItems = [
  { id: 'overview', label: 'Scheme Overview' },
  { id: 'costs', label: 'Registration Costs' },
  { id: 'inspection-process', label: 'Inspection Process' },
  { id: 'consumer-appeal', label: 'Consumer Appeal' },
  { id: 'insurers-authorities', label: 'Insurers & Local Authorities' },
  { id: 'specialist-work', label: 'Specialist Work Types' },
  { id: 'customer-database', label: 'Customer Database Value' },
  { id: 'which-to-choose', label: 'Which Scheme to Choose' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'NICEIC (National Inspection Council for Electrical Installation Contracting) and NAPIT (National Association of Professional Inspectors and Testers) are both government-approved competent person schemes for Part P self-certification in England and Wales.',
  'Annual registration fees are broadly similar — NICEIC typically runs £400–£600/year for a sole trader, NAPIT is broadly comparable, though both offer discounted first-year rates and multi-discipline packages.',
  'NICEIC has higher public recognition due to its longer history (founded 1956) and wider consumer marketing. NAPIT is widely accepted by building control, local authorities, and insurers.',
  'Both schemes require an initial assessment visit and annual (or periodic) desk-based and site assessments to maintain registration.',
  'NAPIT covers a broader range of disciplines from a single membership, which can benefit electricians who also work in heating, plumbing, or solid fuel.',
];

const faqs = [
  {
    question: 'Is NICEIC or NAPIT better for electricians?',
    answer:
      'Neither is objectively better — both are government-approved competent person schemes that allow you to self-certify notifiable electrical work under Part P without involving building control. NICEIC has stronger consumer brand recognition, while NAPIT can offer broader multi-discipline coverage and is sometimes cheaper for sole traders. Your choice should depend on your local market, the type of work you do, and whether your clients or insurers have a preference.',
  },
  {
    question: 'How much does NICEIC registration cost?',
    answer:
      'NICEIC registration costs vary by scheme tier and company size. For a sole trader on the Approved Contractor scheme, expect to pay approximately £400–£600 per year including assessment costs. The Domestic Installer scheme (covering domestic work only) is lower, typically around £200–£350/year. NICEIC also offers a discounted first-year rate for new applicants. Prices change, so always check niceic.com for current fees.',
  },
  {
    question: 'How much does NAPIT registration cost?',
    answer:
      'NAPIT registration fees are broadly similar to NICEIC for like-for-like tiers. A sole trader electrical registration runs approximately £350–£550/year. NAPIT offers multi-discipline packages that can be cost-effective if you work across electrical, heating, and other regulated disciplines. Check napit.org.uk for current pricing as fees are updated periodically.',
  },
  {
    question: 'Do all insurers accept both NICEIC and NAPIT?',
    answer:
      "The vast majority of UK electrical contractors' insurers accept both NICEIC and NAPIT registration as evidence of competency. Public liability and professional indemnity insurers in the electrical sector generally do not distinguish between the two schemes. However, always confirm with your specific insurer — some niche or specialist policies may specify a particular scheme.",
  },
  {
    question: 'Which scheme do local authorities prefer?',
    answer:
      'Local authorities (building control departments) accept notifications from both NICEIC and NAPIT members under the Part P competent person scheme framework. Neither scheme has a formal preference position with local authorities — both are government-approved and listed on the Competent Person Scheme register. Some older building control departments may be more familiar with NICEIC simply due to its longer history.',
  },
  {
    question: 'Can I be registered with both NICEIC and NAPIT?',
    answer:
      'Yes, you can hold registration with more than one competent person scheme simultaneously, though this is unusual and doubles your annual costs. Some contractors do this if they have clients in different sectors with different scheme requirements. In practice, a single scheme registration is sufficient for all domestic and commercial electrical work.',
  },
  {
    question: 'What happens during the NICEIC or NAPIT assessment?',
    answer:
      'Both schemes follow a broadly similar process. At initial registration, an assessor visits your business premises and inspects sample installations you have completed. They verify your qualifications, test equipment calibration, insurance, and quality of work. Once registered, both schemes conduct periodic assessments (typically annually or bi-annually) including a site visit to inspect live work. NICEIC uses a points-based assessment system; NAPIT uses a similar competency-based framework.',
  },
  {
    question: 'Which scheme covers more specialist work types?',
    answer:
      'NAPIT covers a broader range of regulated trades from a single membership, including electrical, heating and ventilation, solid fuel, plumbing, and microgeneration. This makes NAPIT particularly attractive for multi-trade contractors. NICEIC focuses specifically on the electrotechnical sector but covers commercial, industrial, and domestic electrical work comprehensively.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/eca-membership-guide',
    title: 'ECA Membership Guide',
    description:
      'What ECA membership gives electricians — technical support, legal helpline, and lobbying.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/part-p-self-certification',
    title: 'Part P Self-Certification Guide',
    description:
      'How competent person schemes work, what work is notifiable, and Scotland/NI differences.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/select-electrical-registration',
    title: 'SELECT Electrical Registration Scotland',
    description:
      'The Scottish equivalent — how SELECT works and why it matters north of the border.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes',
    description: 'Understand C1, C2, C3 and FI codes and what action is required.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: Zap,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'NICEIC and NAPIT: Scheme Overview',
    content: (
      <>
        <p>
          Both NICEIC and NAPIT are government-approved competent person schemes operating under the
          Part P Building Regulations framework in England and Wales. Membership of either scheme
          allows electricians and electrical contractors to self-certify notifiable domestic
          electrical work without notifying local authority building control on each job.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC</strong> — the National Inspection Council for Electrical
                Installation Contracting. Founded in 1956, NICEIC is one of the UK's oldest and most
                recognised electrical contracting bodies. It is now part of the Certsure group
                (alongside ELECSA). NICEIC offers multiple registration tiers including Approved
                Contractor (all work types), Domestic Installer (domestic only), and Domestic Part P
                (restricted domestic). See{' '}
                <SEOInternalLink href="/eca-membership-guide">ECA membership</SEOInternalLink> for
                an alternative trade body option.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>NAPIT</strong> — the National Association of Professional Inspectors and
                Testers. NAPIT is a government-approved scheme covering electrical, heating and
                ventilation, solid fuel, plumbing, and microgeneration trades. It is particularly
                well-regarded in the domestic and commercial markets and is accepted by building
                control departments across England and Wales.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Government approval</strong> — both schemes are authorised by the Department
                for Energy Security and Net Zero (DESNZ) and listed on the official Competent Person
                Scheme register. Both submit completion certificates to local authority building
                control on behalf of their members.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For most electricians, the practical day-to-day experience of being registered with NICEIC
          or NAPIT is similar. The differences lie in brand recognition, multi-discipline coverage,
          assessment style, and cost.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Registration Costs: NICEIC vs NAPIT',
    content: (
      <>
        <p>
          Registration costs for both schemes are broadly comparable, though the precise figures
          vary depending on your scheme tier, company size, and whether you pay monthly or annually.
          The following are approximate figures for 2026 — always check the respective websites for
          current pricing.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC Approved Contractor (sole trader)</strong> — approximately
                £400–£600/year including annual assessment fee. This tier covers domestic,
                commercial, and industrial electrical work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC Domestic Installer</strong> — approximately £200–£350/year.
                Restricted to domestic electrical work only. Suitable for electricians who work
                exclusively in the domestic sector.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NAPIT Electrical Registration (sole trader)</strong> — approximately
                £350–£550/year for standard electrical registration. Multi-discipline bundles (e.g.,
                electrical + heating) can offer savings over registering separately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>First-year discounts</strong> — both NICEIC and NAPIT frequently offer
                reduced-rate first-year registration deals for new applicants. These can
                significantly lower the initial cost of joining.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For a sole trader doing primarily domestic work, the annual cost difference between NICEIC
          Domestic Installer and NAPIT is unlikely to exceed £100–£150. For larger firms with
          multiple engineers, both schemes charge additional fees per registered operative. Get a
          formal quote from both schemes before making a decision based on cost alone.
        </p>
      </>
    ),
  },
  {
    id: 'inspection-process',
    heading: 'Assessment and Inspection Process',
    content: (
      <>
        <p>
          Both NICEIC and NAPIT require an initial assessment before granting registration, and
          ongoing periodic assessments to maintain it. The process is broadly similar but differs in
          some details.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Initial site assessment</strong> — both schemes send an assessor to inspect
                a sample of your completed installations. They check workmanship quality, compliance
                with BS 7671, documentation, and test instrument calibration. You must hold
                appropriate qualifications (Level 3 NVQ/SVQ, 18th Edition, and inspection and
                testing qualifications for EICR work).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC assessment system</strong> — NICEIC uses a points-based marking
                system. Installations are graded and must achieve a minimum standard. Recurring
                assessment failures can lead to downgrading or loss of registration.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NAPIT assessment</strong> — NAPIT uses a competency framework approach.
                Assessors look at the overall quality of work and documentation systems rather than
                a rigid points score. Many contractors find NAPIT's approach slightly more
                collaborative.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ongoing assessments</strong> — both schemes conduct annual or bi-annual
                assessments after initial registration. These include a site visit to inspect live
                or recent work. Desk-based checks (insurance, qualifications) are also conducted
                periodically.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'consumer-appeal',
    heading: 'Consumer Appeal and Brand Recognition',
    content: (
      <>
        <p>
          Brand recognition matters because homeowners and landlords often search for registered
          electricians by scheme name. NICEIC has a significant advantage here due to its 70-year
          history and consistent consumer-facing marketing.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC public recognition</strong> — surveys consistently show that NICEIC
                is the most recognised electrical registration body among UK homeowners. Many
                clients specifically ask for "NICEIC registered" electricians. The NICEIC
                find-a-contractor directory receives significant consumer traffic.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NAPIT recognition</strong> — NAPIT is less well known to the general public
                but is fully recognised by industry professionals, insurers, and building control.
                For commercial and landlord clients (who understand the scheme landscape), NAPIT
                carries equal credibility to NICEIC.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Logo usage</strong> — both schemes allow registered members to use their
                logo on vehicles, business cards, and websites. The NICEIC logo is more likely to be
                recognised by a homeowner browsing a van parked outside a property.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If your primary market is domestic work and you win business from homeowners searching for
          local electricians, NICEIC's stronger consumer brand may give you a marginal marketing
          edge. For commercial, industrial, or landlord-focused work, the distinction is less
          relevant.
        </p>
      </>
    ),
  },
  {
    id: 'insurers-authorities',
    heading: 'Insurers and Local Authority Acceptance',
    content: (
      <>
        <p>
          Both NICEIC and NAPIT are accepted by the vast majority of UK insurers and all local
          authority building control departments. There is no meaningful practical difference in
          this regard.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public liability insurance</strong> — insurers providing public liability
                cover to electrical contractors accept both NICEIC and NAPIT registration as
                evidence of competency. Some insurers offer discounted premiums for scheme members;
                confirm with your broker whether they favour a particular scheme.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building control notifications</strong> — both schemes notify local
                authority building control on behalf of members for notifiable Part P work. The
                process is identical — you notify your scheme, they notify building control, and a
                completion certificate is issued to the homeowner.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Landlord compliance</strong> — for{' '}
                <SEOInternalLink href="/guides/eicr-for-landlords">
                  landlord EICR compliance
                </SEOInternalLink>
                , both schemes are equally recognised. The 2020 Electrical Safety Regulations
                require a "qualified and competent person" — membership of either scheme satisfies
                this requirement.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'specialist-work',
    heading: 'Specialist Work Types: Which Scheme Covers More?',
    content: (
      <>
        <p>
          For electricians who work exclusively in the electrotechnical sector, both schemes provide
          comprehensive coverage. The key differentiator arises when contractors work across
          multiple regulated disciplines.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC specialist categories</strong> — NICEIC covers domestic, commercial,
                industrial, and specialist electrical disciplines including electrical vehicle
                charging installations, solar PV, fire detection systems, and emergency lighting.
                Each specialist category may require additional evidence of competency.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NAPIT multi-discipline advantage</strong> — NAPIT covers electrical, heating
                and ventilation (Gas Safe equivalent pathway), solid fuel, plumbing, microgeneration
                (solar PV, heat pumps), and green deal. For a contractor who does electrical work
                and installs heat pumps or solar, a NAPIT multi-discipline registration can be more
                cost-effective than separate registrations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charging</strong> — both schemes support self-certification of EV
                charging point installations under Part P. OZEV (Office for Zero Emission Vehicles)
                grant schemes historically required OLEV-registered installers; check current OZEV
                requirements for any grant-funded work.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'customer-database',
    heading: 'Customer Database and Find-a-Contractor Value',
    content: (
      <>
        <p>
          Both NICEIC and NAPIT operate public directories where homeowners and businesses can
          search for registered contractors. The volume of consumer traffic to these directories
          varies and can influence how many leads you receive.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC find-a-contractor</strong> — NICEIC's consumer directory receives
                significant traffic from homeowners searching for local electricians. Being listed
                here can generate leads, particularly in areas where NICEIC registration is widely
                associated with quality electrical work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>NAPIT find-a-tradesperson</strong> — NAPIT's directory covers all registered
                disciplines, which can bring in leads from consumers searching for heating,
                plumbing, or other trades as well as electrical. For multi-discipline contractors,
                this broader reach can be advantageous.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Practical lead value</strong> — in practice, most electricians generate the
                majority of their work through word-of-mouth, social media, and platforms like
                Checkatrade or MyBuilder. The scheme directories are a supplementary source rather
                than a primary lead channel for most businesses.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'which-to-choose',
    heading: 'Which Scheme Should You Choose?',
    content: (
      <>
        <p>
          There is no universally correct answer — both schemes are reputable, government-approved,
          and widely accepted. The right choice depends on your circumstances.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Choose NICEIC if</strong> — you work primarily in the domestic sector and
                your clients are homeowners who recognise the NICEIC name; you want the strongest
                possible consumer brand on your van and website; or you already have relationships
                with NICEIC-registered contractors and want consistency.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Choose NAPIT if</strong> — you work across multiple regulated trades
                (electrical plus heating, solar, or plumbing) and want a single membership; your
                clients are predominantly commercial, industrial, or landlords who are less
                influenced by consumer brand; or you find NAPIT's pricing better for your situation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Also consider ELECSA</strong> — ELECSA (part of the Certsure group alongside
                NICEIC) is another government-approved scheme that some contractors prefer,
                particularly for domestic work. It operates under the same framework as NICEIC but
                is assessed and managed separately.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you are registered with{' '}
          <SEOInternalLink href="/select-electrical-registration">
            SELECT in Scotland
          </SEOInternalLink>
          , you will need a separate Part P scheme membership for any work you do in England or
          Wales, as SELECT covers Scottish Building Standards rather than Part P.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Managing Your Scheme Registration',
    content: (
      <>
        <p>
          Whichever scheme you choose, keeping your registration current means staying on top of
          assessment dates, qualifications renewals, and insurance documentation. Elec-Mate helps
          registered electricians manage the certificate and documentation side of their business.
        </p>
        <SEOAppBridge
          title="Certificate and document management for registered electricians"
          description="Join 1,000+ UK electricians using Elec-Mate to complete EICRs, Minor Works, and Electrical Installation Certificates on their phone. On-site PDF generation, AI board scanning, and instant report delivery. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function NICEICvsNAPITComparisonPage() {
  return (
    <GuideTemplate
      title="NICEIC vs NAPIT | Which Registration Scheme Is Best UK?"
      description="Compare NICEIC and NAPIT registration for UK electricians — costs (£400–£600/year), inspection processes, consumer appeal, insurer acceptance, specialist work coverage, and which scheme suits your business."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Registration Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          NICEIC vs NAPIT:{' '}
          <span className="text-yellow-400">Which Registration Scheme Is Best?</span>
        </>
      }
      heroSubtitle="A practical comparison of the UK's two leading electrical competent person schemes — registration costs, assessment processes, consumer recognition, insurer acceptance, specialist work coverage, and how to choose between them."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions: NICEIC vs NAPIT"
      relatedPages={relatedPages}
      ctaHeading="Manage Your Certifications With Elec-Mate"
      ctaSubheading="Complete EICRs, Minor Works Certificates, and Electrical Installation Certificates on your phone. AI board scanning, instant PDF export, and automatic report delivery. 7-day free trial."
    />
  );
}
