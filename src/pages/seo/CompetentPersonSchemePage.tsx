import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  FileCheck2,
  GraduationCap,
  Calculator,
  Home,
  PoundSterling,
  Scale,
  ClipboardCheck,
  Award,
  Users,
  Send,
  Star,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Competent Person Scheme', href: '/guides/competent-person-scheme-electrical' },
];

const tocItems = [
  { id: 'what-is-cps', label: 'What Is a Competent Person Scheme?' },
  { id: 'why-register', label: 'Why Register?' },
  { id: 'schemes-compared', label: 'Schemes Compared' },
  { id: 'niceic', label: 'NICEIC' },
  { id: 'napit', label: 'NAPIT' },
  { id: 'elecsa', label: 'ELECSA' },
  { id: 'bre', label: 'BRE Certification' },
  { id: 'how-to-register', label: 'How to Register' },
  { id: 'costs', label: 'Costs and Fees' },
  { id: 'assessment', label: 'The Assessment Process' },
  { id: 'elec-mate-cps', label: 'Managing Scheme Work with Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A competent person scheme allows registered electricians to self-certify notifiable electrical work under Part P of the Building Regulations, without involving building control.',
  'The four main schemes for electrical work in England and Wales are NICEIC, NAPIT, ELECSA, and BRE Certification. All are government-authorised and equally valid.',
  'Annual registration fees range from approximately £350 to £700 depending on the scheme, tier of registration, and number of operatives. The cost is typically recovered within a few notifiable jobs.',
  'To register, you need the 18th Edition qualification (C&G 2382), a relevant installation or inspection qualification, public liability insurance, and must pass a practical assessment of your work.',
  'Elec-Mate generates certificates in the correct BS 7671 format, ready to upload to your scheme provider portal for Part P notification.',
];

const faqs = [
  {
    question: 'Which competent person scheme should I join?',
    answer:
      'All four schemes — NICEIC, NAPIT, ELECSA, and BRE — are equally valid for self-certifying notifiable electrical work under Part P. The choice often comes down to cost, local reputation, and personal preference. NICEIC is the largest and best-known scheme, which can carry weight with customers who recognise the brand. NAPIT is often the most cost-effective and is well-regarded. ELECSA (part of the ECA group) offers a straightforward registration process. BRE is less common but equally valid. Some electricians choose based on which scheme their existing contacts or employers use. It is worth getting quotes from at least two schemes before deciding.',
  },
  {
    question: 'What qualifications do I need to register?',
    answer:
      'All schemes require the qualifying supervisor (the person whose qualifications the registration is based on) to hold: the current edition qualification — C&G 2382 (18th Edition IET Wiring Regulations) or equivalent; a relevant installation qualification — such as C&G 2357 (Electrotechnical Technology), NVQ Level 3 in Electrotechnical Services, or equivalent trade qualification; and ideally an inspection and testing qualification — C&G 2391 or equivalent. Some schemes accept a combination of qualifications and experience. If you do not hold the 2391 but have significant practical experience in inspection and testing, some schemes will accept this provided you can demonstrate competence during the assessment. Public liability insurance (minimum £2 million) is also required.',
  },
  {
    question: 'How much does it cost to join a competent person scheme?',
    answer:
      'Annual registration fees vary by scheme and tier. As a rough guide for a sole trader or small business doing domestic electrical work: NICEIC Domestic Installer costs approximately £400 to £500 per year; NAPIT costs approximately £350 to £450 per year; ELECSA costs approximately £400 to £500 per year; and BRE costs approximately £350 to £450 per year. There is usually a one-off joining fee (approximately £150 to £300) and an assessment fee for the initial assessment (approximately £200 to £400). Some schemes include the first assessment in the joining fee. The total first-year cost is typically £600 to £1,000. After the first year, it is the annual fee plus assessment fee. The cost is a tax-deductible business expense and is typically recovered within a few notifiable jobs (since the alternative building control route costs £250 to £400 per notification).',
  },
  {
    question: 'What happens during the scheme assessment?',
    answer:
      'The initial assessment and ongoing periodic assessments (typically annual) involve an assessor visiting your premises and one or more of your recent job sites. The assessor will: review a sample of your completed certificates and test results; inspect the quality of your electrical installation work on a recent job; check that your test equipment is correctly calibrated and in date; verify your qualifications, insurance, and business records; and ask technical questions to confirm your competence. The assessment is practical, not academic — the assessor wants to see that you can install, test, and certify electrical work to the required standard. If non-conformances are found, you will be given a period to correct them. Persistent or serious non-conformances can lead to suspension or removal from the scheme.',
  },
  {
    question: 'Can I register a company or just an individual?',
    answer:
      'Competent person scheme registration is for the business (sole trader, partnership, or limited company), not the individual. However, the registration is based on the qualifications of a named qualifying supervisor — the person responsible for the technical quality of the work. For a sole trader, this is usually the sole trader themselves. For a company, it is a named employee or director. If the qualifying supervisor leaves the company, the registration is at risk — the company must appoint a replacement qualifying supervisor who meets the qualification requirements, or the registration may be suspended. Some schemes allow multiple qualifying supervisors to be named, providing resilience if one leaves.',
  },
  {
    question: 'Do I need a competent person scheme for commercial work?',
    answer:
      'Part P of the Building Regulations applies only to dwellings, so a competent person scheme is not technically required for electrical work in commercial premises. However, many commercial clients, main contractors, and facilities managers require their electrical subcontractors to be registered with a competent person scheme as a condition of being awarded work. NICEIC Approved Contractor and NAPIT registration cover both domestic and commercial work. Being registered demonstrates competence and provides the client with assurance that the work has been independently assessed. For commercial work, the Electricity at Work Regulations 1989 and the Health and Safety at Work Act 1974 are the primary regulatory frameworks.',
  },
  {
    question: 'What is the difference between NICEIC Approved Contractor and Domestic Installer?',
    answer:
      'NICEIC offers several tiers of registration. The two main ones are: Approved Contractor — covers all types of electrical installation work including domestic, commercial, and industrial. This is the higher tier with a more rigorous assessment. It is suitable for electricians who do a mix of domestic and commercial work. Domestic Installer — covers electrical installation work in dwellings only (the Part P scope). The assessment is focused on domestic work. This is suitable for electricians who primarily do domestic work such as rewires, consumer unit changes, new circuits, and EICRs. Both tiers allow self-certification of notifiable domestic work under Part P. The key difference is the scope of work covered and the depth of assessment. Approved Contractor is more expensive but provides broader recognition.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/building-regulations-electrical',
    title: 'Building Regulations Electrical',
    description:
      'Approved Document P explained — notifiable work types, certification requirements, and building control.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-certificate-types-uk',
    title: 'Electrical Certificate Types UK',
    description:
      'EIC, Minor Works, EICR — which certificate for which job and how to complete them correctly.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/how-to-become-electrician',
    title: 'How to Become an Electrician UK',
    description:
      'Complete career guide from apprenticeship to qualified status including qualifications needed.',
    icon: GraduationCap,
    category: 'Guide',
  },
  {
    href: '/guides/starting-electrical-business',
    title: 'Starting an Electrical Business',
    description: 'Step-by-step guide to setting up as a self-employed electrician in the UK.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/cpd-for-electricians',
    title: 'CPD for Electricians',
    description:
      'Continuing professional development requirements and how to maintain your qualifications.',
    icon: Award,
    category: 'Guide',
  },
  {
    href: '/training/18th-edition',
    title: '18th Edition Course',
    description:
      'Study for C&G 2382 — the qualification required for competent person scheme registration.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-cps',
    heading: 'What Is a Competent Person Scheme?',
    content: (
      <>
        <p>
          A competent person scheme (CPS) is a government-authorised programme that allows
          registered businesses to self-certify that their work complies with the Building
          Regulations. For electricians, this means you can carry out notifiable electrical work
          under{' '}
          <SEOInternalLink href="/guides/building-regulations-electrical">
            Approved Document P
          </SEOInternalLink>{' '}
          and certify it yourself, without needing a separate building control inspection.
        </p>
        <p>
          The concept was introduced alongside Part P in 2005. The government recognised that
          requiring building control to inspect every notifiable electrical job would be impractical
          and expensive. Competent person schemes provide a proportionate alternative: electricians
          who demonstrate competence through assessment can be trusted to self-certify their own
          work.
        </p>
        <p>
          When a registered electrician completes notifiable work, they issue the appropriate
          certificate (EIC or Minor Works) and submit a notification to their scheme provider. The
          scheme provider forwards this to the local authority building control department, who
          issue a Building Regulations Compliance Certificate to the homeowner. The process is
          largely automated and the homeowner receives their certificate within a few weeks.
        </p>
        <p>
          Being registered with a competent person scheme is not the same as being "qualified."
          Qualifications demonstrate knowledge; scheme registration demonstrates that a business has
          been assessed and found to be competent to carry out electrical work to the required
          standard. The assessment includes reviewing completed work, checking test results, and
          confirming technical knowledge.
        </p>
      </>
    ),
  },
  {
    id: 'why-register',
    heading: 'Why Should You Register with a Competent Person Scheme?',
    content: (
      <>
        <p>
          Registration with a competent person scheme offers significant practical and commercial
          benefits:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-certification:</strong> complete notifiable work without building
                control involvement. No waiting for inspections, no building control fees passed to
                customers. Faster turnaround for the customer, less administration for you.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Customer confidence:</strong> the scheme logo on your van, website, and
                marketing materials gives customers assurance that your work has been independently
                assessed. Many customers specifically search for scheme-registered electricians.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Work opportunities:</strong> many main contractors, letting agents,
                insurance companies, and local authorities require their electrical contractors to
                be registered with a competent person scheme. Without registration, you may be
                excluded from these opportunities.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Technical support:</strong> most schemes offer a technical helpline for
                registered members. If you encounter an unusual installation or a tricky regulation
                question, you can call for guidance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dispute resolution:</strong> schemes provide a complaints and dispute
                resolution process. If a customer has a concern about your work, the scheme can
                mediate — protecting both parties.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The cost of registration (typically £350 to £700 per year) is quickly offset by the
          savings on building control fees. A single notifiable job through the building control
          route costs the homeowner £250 to £400. If you do just two or three notifiable jobs per
          year, scheme registration pays for itself.
        </p>
      </>
    ),
  },
  {
    id: 'schemes-compared',
    heading: 'Comparing the Schemes at a Glance',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <div className="grid grid-cols-4 gap-px bg-white/10">
            <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">Scheme</div>
            <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">
              Annual Fee (approx.)
            </div>
            <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">Scope</div>
            <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">
              Key Feature
            </div>
          </div>
          {[
            {
              scheme: 'NICEIC',
              fee: '£400-£700',
              scope: 'Domestic + Commercial',
              feature: 'Largest, most recognised',
            },
            {
              scheme: 'NAPIT',
              fee: '£350-£500',
              scope: 'Domestic + Commercial',
              feature: 'Competitive pricing',
            },
            {
              scheme: 'ELECSA',
              fee: '£400-£500',
              scope: 'Domestic + Commercial',
              feature: 'Part of ECA group',
            },
            {
              scheme: 'BRE',
              fee: '£350-£450',
              scope: 'Domestic + Commercial',
              feature: 'Building research focus',
            },
          ].map((row) => (
            <div key={row.scheme} className="grid grid-cols-4 gap-px bg-white/5">
              <div className="p-4 bg-[#0a0a0a] text-white text-sm font-medium">{row.scheme}</div>
              <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.fee}</div>
              <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.scope}</div>
              <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.feature}</div>
            </div>
          ))}
        </div>
        <p>
          All four schemes are equally valid for Part P self-certification. The choice is a business
          decision based on cost, brand recognition, and personal preference.
        </p>
      </>
    ),
  },
  {
    id: 'niceic',
    heading: 'NICEIC: The Largest Scheme',
    content: (
      <>
        <p>
          NICEIC (National Inspection Council for Electrical Installation Contracting) is the
          largest and best-known competent person scheme for electrical work in the UK. It has been
          operating since 1956 — predating Part P by almost 50 years. The NICEIC brand is widely
          recognised by consumers, which can be a commercial advantage.
        </p>
        <p>NICEIC offers several registration tiers:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Approved Contractor:</strong> the highest tier, covering domestic,
                commercial, and industrial electrical work. More rigorous assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Domestic Installer:</strong> covers Part P notifiable work in dwellings
                only. Suitable for electricians focusing on domestic work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional certifications:</strong> NICEIC also offers specialist
                certifications for EV charging, solar PV, energy storage, and fire detection.
              </span>
            </li>
          </ul>
        </div>
        <p>
          NICEIC assessments are thorough. The assessor visits your premises and inspects a sample
          of recent work. They check certificates, test results, workmanship, and technical
          knowledge. The assessment frequency is typically annual, with additional spot checks
          possible.
        </p>
      </>
    ),
  },
  {
    id: 'napit',
    heading: 'NAPIT: Competitive and Accessible',
    content: (
      <>
        <p>
          NAPIT (National Association of Professional Inspectors and Testers) is the second-largest
          competent person scheme and is known for competitive pricing and an accessible
          registration process. Many electricians choose NAPIT as a cost-effective alternative to
          NICEIC.
        </p>
        <p>
          NAPIT offers a similar range of registration options: domestic installer, full-scope
          electrical, and specialist certifications. The assessment process covers the same ground
          as NICEIC — inspection of completed work, review of certificates, equipment checks, and
          technical questions.
        </p>
        <p>
          NAPIT also covers multiple building trades beyond electrical work (plumbing, gas, building
          fabric), which can be useful for multi-trade businesses. Registration fees are generally
          at the lower end of the range, making it attractive for sole traders and small businesses.
        </p>
      </>
    ),
  },
  {
    id: 'elecsa',
    heading: 'ELECSA: Part of the ECA Group',
    content: (
      <>
        <p>
          ELECSA is a competent person scheme operated under the umbrella of the Electrical
          Contractors' Association (ECA). It offers a straightforward registration process and is
          well-regarded in the industry.
        </p>
        <p>
          ELECSA provides domestic installer registration for Part P self-certification, along with
          additional certifications for specialist areas. Being part of the ECA group gives ELECSA
          members access to ECA benefits including technical guidance, contract support, and
          industry representation.
        </p>
        <p>
          The assessment process is similar to the other schemes: practical inspection of completed
          work, certificate review, and technical competence verification. ELECSA is a solid choice
          for electricians who value the ECA connection and its associated benefits.
        </p>
      </>
    ),
  },
  {
    id: 'bre',
    heading: 'BRE Certification',
    content: (
      <>
        <p>
          BRE (Building Research Establishment) Certification is the least widely known of the four
          main electrical competent person schemes, but it is equally valid. BRE has a strong
          reputation in the broader building industry — the BRE is responsible for the BREEAM
          environmental assessment method and other widely used building standards.
        </p>
        <p>
          BRE Certification for electrical work covers the same scope as the other schemes. Fees
          tend to be competitive. The scheme is suitable for electricians who want a valid competent
          person registration at a reasonable cost without the higher profile (and higher fees) of
          NICEIC.
        </p>
      </>
    ),
  },
  {
    id: 'how-to-register',
    heading: 'How to Register: Step by Step',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Check your qualifications.</strong> You need: C&G 2382 (18th Edition), an
              installation qualification (C&G 2357, NVQ Level 3, or equivalent), and ideally C&G
              2391 (Inspection and Testing). Check with the specific scheme if your combination of
              qualifications is accepted.
            </li>
            <li>
              <strong>Get public liability insurance.</strong> Minimum £2 million cover is required
              by all schemes. Many schemes can recommend insurance providers if you do not already
              have cover.
            </li>
            <li>
              <strong>Apply to your chosen scheme.</strong> Complete the application form (usually
              online), providing details of your qualifications, insurance, and business structure.
              Pay the application fee.
            </li>
            <li>
              <strong>Prepare for the initial assessment.</strong> Have examples of your recent work
              available for inspection — ideally a job where you can show the assessor your
              installation, test results, and certificates. Ensure your test instruments are
              calibrated and in date.
            </li>
            <li>
              <strong>Pass the assessment.</strong> The assessor visits your premises and a job
              site. They review your work, certificates, test results, equipment, and technical
              knowledge. Minor non-conformances can usually be corrected; major non-conformances may
              require a re-assessment.
            </li>
            <li>
              <strong>Receive your registration.</strong> Once approved, you receive your
              registration certificate, scheme ID number, and access to the online portal for
              submitting Part P notifications. You can start self-certifying notifiable work
              immediately.
            </li>
          </ol>
        </div>
        <p>
          The entire process from application to registration typically takes 4 to 8 weeks,
          depending on the scheme's assessment schedule and your availability for the site visit.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Costs and Fees Breakdown',
    content: (
      <>
        <p>The total cost of competent person scheme registration includes several components:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Application/joining fee:</strong> £150 to £300 (one-off, first year only).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual registration fee:</strong> £350 to £700 depending on scheme and tier.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Assessment fee:</strong> £200 to £400 per assessment (typically annual).
                Some schemes include the first assessment in the joining fee.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Total first year:</strong> approximately £600 to £1,200.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Subsequent years:</strong> approximately £500 to £900 (annual fee +
                assessment).
              </span>
            </li>
          </ul>
        </div>
        <p>
          These costs are tax-deductible business expenses. The return on investment is clear: if
          you do three or more notifiable jobs per year, the scheme fee is less than the building
          control fees you would otherwise pass to customers (or absorb yourself). Most active
          domestic electricians do far more than three notifiable jobs annually.
        </p>
      </>
    ),
  },
  {
    id: 'assessment',
    heading: 'What Happens During the Assessment',
    content: (
      <>
        <p>
          The assessment is the most important part of the registration process. It is a practical
          assessment of your competence, not an academic exam. Here is what to expect:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certificate review:</strong> the assessor examines a sample of your
                completed EICs, Minor Works Certificates, and EICRs. They check that the
                certificates are correctly completed, test results are recorded accurately, and
                observations are properly classified.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Site inspection:</strong> the assessor visits a recent job site (with the
                customer's permission) to inspect the quality of your installation work. They check
                workmanship, compliance with BS 7671, and correct use of materials.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Equipment check:</strong> your test instruments must be in calibration
                (typically within the last 12 months) and in good condition. The assessor checks the
                calibration certificates and the physical condition of the instruments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Technical questions:</strong> the assessor asks technical questions to
                confirm your understanding of BS 7671, testing procedures, and safe working
                practices. These are practical questions, not textbook theory.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you produce good quality work, keep accurate records, and maintain your equipment, the
          assessment should be straightforward. The assessor is not trying to catch you out — they
          want to confirm that you are competent and that the scheme can trust you to self-certify.
        </p>
      </>
    ),
  },
  {
    id: 'elec-mate-cps',
    heading: 'Managing Scheme Work with Elec-Mate',
    content: (
      <>
        <p>
          Elec-Mate helps registered electricians maintain the standard expected by their competent
          person scheme:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Assessment-Ready Certificates</h4>
                <p className="text-white text-sm leading-relaxed">
                  Every certificate generated by Elec-Mate follows the BS 7671 Appendix 6 model
                  forms. When the assessor reviews your certificates, they will see correctly
                  formatted, complete documentation with full test results — exactly what the scheme
                  expects.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Send className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Instant PDF for Scheme Upload</h4>
                <p className="text-white text-sm leading-relaxed">
                  Export your completed certificate as a professional PDF and upload it directly to
                  your scheme provider portal. No re-typing, no paperwork delays. The Part P
                  notification can be submitted the same day the work is completed.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Pass your scheme assessment with confidence"
          description="Elec-Mate generates properly formatted BS 7671 certificates with complete test results. Your assessor will see exactly what they expect. Join 430+ UK electricians using Elec-Mate for professional certification. 7-day free trial."
          icon={ShieldCheck}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CompetentPersonSchemePage() {
  return (
    <GuideTemplate
      title="Competent Person Scheme | Electrical Registration UK"
      description="Complete guide to competent person schemes for UK electricians. NICEIC, NAPIT, ELECSA, and BRE compared. Costs, assessment process, qualification requirements, how to register, and the benefits of scheme membership."
      datePublished="2025-05-10"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Registration Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Competent Person Scheme:{' '}
          <span className="text-yellow-400">Electrical Registration in the UK</span>
        </>
      }
      heroSubtitle="Everything you need to know about competent person schemes for electricians. NICEIC, NAPIT, ELECSA, and BRE compared. Costs, qualifications needed, the assessment process, how to register, and how scheme membership benefits your business."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Competent Person Schemes"
      relatedPages={relatedPages}
      ctaHeading="Produce Scheme-Ready Certificates on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for EIC, Minor Works, and EICR certificates in the correct BS 7671 format. Professional PDFs ready for your scheme provider. 7-day free trial, cancel anytime."
    />
  );
}
