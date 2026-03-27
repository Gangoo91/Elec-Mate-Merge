import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Globe,
  PoundSterling,
  FileCheck2,
  GraduationCap,
  Briefcase,
  TrendingUp,
  Star,
  AlertTriangle,
  CheckCircle,
  Plane,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Career Guides', href: '/guides/electrician-career-ladder-uk' },
  { label: 'Working Abroad', href: '/guides/electrician-working-abroad-uk' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'middle-east', label: 'Middle East (UAE, Qatar, Saudi)' },
  { id: 'australia', label: 'Australia' },
  { id: 'canada', label: 'Canada' },
  { id: 'qualifications', label: 'Qualification Equivalency' },
  { id: 'visas', label: 'Visa and Work Permit Overview' },
  { id: 'considerations', label: 'Practical Considerations' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'UK electricians are in demand in the Middle East, Australia, and Canada — all of which have structural shortages of qualified electrical trades.',
  'UAE salaries for experienced UK electricians range from £55,000 to £100,000 equivalent, typically tax-free, with accommodation and flights often included.',
  'Australia requires skills assessment through the relevant state or territory authority and a licence to perform electrical work — the process takes 3 to 12 months.',
  'Canada requires provincial licensing — the Interprovincial Red Seal programme is the main route, and UK qualifications can often be credited towards the assessment.',
  'BS 7671 is not used outside the UK. UAE and Qatar use IEC standards (with local amendments); Australia uses AS/NZS 3000; Canada and the USA use the NEC. Electricians must study the local standard before working in each country.',
];

const faqs = [
  {
    question: 'Is there demand for UK electricians working abroad?',
    answer:
      'Yes, particularly in the Middle East, Australia, and Canada. The Middle East (UAE, Qatar, Saudi Arabia) has large infrastructure and construction programmes funded by oil and gas revenues and sovereign wealth funds, with a chronic shortage of qualified Western electrical engineers. Australia has a structural trades shortage driven by the mining boom, energy transition, and housing construction. Canada also faces a significant skilled trades gap, particularly in provinces like Alberta, British Columbia, and Ontario. UK electricians with good BS 7671 training and solid experience are well regarded internationally as a baseline — the key requirement is adapting to the local electrical standard and obtaining the relevant local licence or registration.',
  },
  {
    question: 'Do I need to resit any qualifications to work in the UAE?',
    answer:
      'For the UAE, the requirements vary by emirate. In Dubai, the Dubai Electricity and Water Authority (DEWA) issues the Approved Electrical Contractor (AEC) licence for contracting companies, and electricians require a DEWA-approved wiring test and an Ejari-registered employer. Abu Dhabi uses the Abu Dhabi Distribution Company (ADDC) and Al Ain Distribution Company (AADC) systems. In practice, most UK electricians working in the UAE are employed by international M&E contractors (Emcor, Idemia, Laing O\'Rourke, etc.) who manage the local licensing requirements. For individual registration, you will need to demonstrate equivalent qualifications — typically a copy of your AM2 certificate, NVQ Level 3, 18th Edition, and experience evidence. Qatar requires registration with QNEB (Qatar National Electricity and Water Bureau) or QCDD (Civil Defence) for fire and safety work.',
  },
  {
    question: 'How does BS 7671 compare to the Australian AS/NZS 3000 wiring rules?',
    answer:
      'BS 7671 and AS/NZS 3000 are both based on IEC standards and share many fundamental principles — cable sizing methodology, earthing systems, protective device co-ordination. The key differences include: voltage system (Australia uses 230V single phase and 400V three phase, same as UK; however, socket outlets and plug configurations are completely different — Australian GPOs use the AS 3112 flat-pin configuration), earthing terminology (the Australian standard uses different terminology for earthing system types), RCD requirements (Australia has very broad mandatory RCD requirements — virtually all circuits in domestic premises must be RCD-protected), and testing procedures. UK electricians working in Australia typically need to study the local standard formally and sit the licensing examination for the relevant state or territory.',
  },
  {
    question: 'What is the Red Seal programme in Canada and how does it affect UK electricians?',
    answer:
      'The Interprovincial Red Seal programme in Canada standardises the trade qualifications across provinces, allowing qualified electricians to work in any province without having to re-qualify. UK electricians seeking to work in Canada must have their qualifications assessed by the provincial authority (for example, BCSA in British Columbia, OACETT in Ontario). The assessment typically involves a review of UK qualifications, a period of Canadian electrical work experience, and sitting the provincial licensing examination. The TIQA (Trade and Industry Qualification Assessment) process determines which aspects of the Canadian curriculum need to be completed. The process typically takes 6 to 18 months from application to full licence. Some provinces (particularly BC and Alberta) actively recruit UK electricians and have streamlined the assessment process.',
  },
  {
    question: 'How much can a UK electrician earn in Qatar?',
    answer:
      'Qatar has seen significant demand for electrical engineers and electricians as part of the post-World Cup 2022 infrastructure legacy and ongoing LNG (liquefied natural gas) plant construction. Experienced UK electricians working for international contractors in Qatar can expect: junior to mid-level electrician — £35,000 to £55,000 equivalent (tax-free), senior electrician or foreman — £55,000 to £75,000 equivalent (tax-free), specialist (HV, instrumentation, CompEx) — £75,000 to £110,000+ equivalent (tax-free). Most packages in Qatar include accommodation (or accommodation allowance), flights home (typically twice per year), and medical insurance. Qatar has no personal income tax for expatriate workers, so the effective take-home is substantially higher than the equivalent UK salary. Registration with QNEB is required for most electrical work; QCDD registration is additionally required for fire and safety system work.',
  },
  {
    question: 'What are the main challenges of working as a UK electrician abroad?',
    answer:
      'The main challenges are: regulatory — learning and working to a different electrical standard (AS/NZS 3000, NEC, IEC with local amendments) requires genuine study, not just the assumption that UK training transfers directly; licensing — most countries require a local licence or registration which takes time and sometimes examinations to obtain; cultural — working practices, health and safety culture, and construction site culture vary significantly between countries; family — working long rotations abroad (4 weeks on, 2 weeks home is common in the Middle East) places strain on family life; and financial planning — managing money across two countries, pension contributions, and UK tax obligations (if returning) requires careful planning, ideally with an accountant familiar with expatriate tax.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/master-electrician-uk',
    title: 'Master Electrician in the UK',
    description: 'UK qualifications and how they compare to international master electrician systems.',
    icon: Star,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-career-ladder-uk',
    title: 'Electrician Career Ladder UK',
    description: 'Complete UK career progression guide from apprentice to electrical director.',
    icon: TrendingUp,
    category: 'Guide',
  },
  {
    href: '/guides/specialist-electrician-routes-uk',
    title: 'Specialist Electrician Routes',
    description: 'HV, CompEx, data centre and other specialist routes that command overseas premiums.',
    icon: Star,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-salary-london',
    title: 'Electrician Salary in London',
    description: 'Compare overseas earnings to what you can earn in London.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Training',
    description: 'C&G 2391 — a key qualification valued by international employers.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Professional electrical certification — build your portfolio before going abroad.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'UK Electricians Working Abroad: Opportunities and Requirements',
    content: (
      <>
        <p>
          UK-trained electricians are internationally competitive. A solid grounding in BS 7671,
          practical experience across diverse installation types, and strong safety culture makes
          UK electricians attractive to international employers — particularly in regions with
          rapidly growing infrastructure programmes and a shortage of local qualified trades.
        </p>
        <p>
          The most popular destinations for UK electricians are the Middle East (UAE, Qatar, Saudi
          Arabia), Australia, and Canada. Each offers different opportunities, earnings, visa
          pathways, and regulatory requirements. The common thread is that UK qualifications are
          recognised as a strong baseline, but local licensing and study of the local electrical
          standard are always required.
        </p>
        <p>
          This guide covers the main destination countries, earnings expectations, qualification
          equivalency, and the practical steps to working abroad as a UK electrician.
        </p>
      </>
    ),
  },
  {
    id: 'middle-east',
    heading: 'Middle East: UAE, Qatar, and Saudi Arabia',
    content: (
      <>
        <p>
          The Gulf region offers the most financially attractive packages for UK electricians,
          combining high salaries, tax-free income, and employer-provided accommodation and flights.
          The trade-off is the working environment (extreme heat in summer, long working days on
          large construction sites) and extended separation from family.
        </p>
        <div className="grid gap-4 sm:grid-cols-3 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">UAE</h3>
            <p className="text-white text-sm leading-relaxed mb-2">
              Salary range: £45,000–£90,000 equivalent (tax-free)
            </p>
            <p className="text-white text-sm leading-relaxed">
              Dubai and Abu Dhabi have large ongoing residential, commercial, and infrastructure
              programmes. DEWA and ADDC registration required. Many UK electricians work for
              international M&amp;E contractors.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Qatar</h3>
            <p className="text-white text-sm leading-relaxed mb-2">
              Salary range: £55,000–£110,000+ equivalent (tax-free)
            </p>
            <p className="text-white text-sm leading-relaxed">
              LNG plant construction, post-World Cup legacy, and Lusail City development. QNEB
              registration required. Strong demand for HV and instrumentation specialists.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Saudi Arabia</h3>
            <p className="text-white text-sm leading-relaxed mb-2">
              Salary range: £50,000–£100,000+ equivalent (tax-free)
            </p>
            <p className="text-white text-sm leading-relaxed">
              Vision 2030 mega-projects (NEOM, The Line, Diriyah), oil and gas expansion.
              ARAMCO and SEC contractor work available. Large compound-based expat community.
            </p>
          </div>
        </div>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
            <p className="text-white text-sm">
              <strong>Important:</strong> All Gulf states use IEC-based electrical standards with
              local amendments — not BS 7671. UK electricians must study the local standard before
              working. The physical infrastructure (sockets, plugs, earthing systems) differs from
              the UK. Always verify employment contracts carefully before signing and travelling —
              the kafala (sponsorship) system in some Gulf states ties your residency to your
              employer.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'australia',
    heading: 'Australia: Skills Assessment and Licensing',
    content: (
      <>
        <p>
          Australia has a significant and sustained shortage of qualified electricians, driven by
          mining, energy transition (solar, wind, battery storage), and housing construction.
          Salaries are strong, quality of life is high, and permanent residency pathways exist
          for skilled trades.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Plane className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Salary range</strong> — AUD $80,000 to $120,000 (approximately £40,000
                to £62,000 at 2026 exchange rates). Higher for supervisory and specialist roles.
                Mining and resources sector pays premium rates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plane className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Skills assessment</strong> — VETASSESS or the relevant state training
                authority assesses UK qualifications. NVQ Level 3 and AM2 are generally recognised
                but a period of local work and examination is still required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plane className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical licence</strong> — each state and territory issues its own
                electrical worker's licence. TAFE (Technical and Further Education) colleges offer
                bridging courses covering AS/NZS 3000 and local requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plane className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visa</strong> — Skilled Worker (Subclass 482) or Employer Sponsored
                (Subclass 186). Electrician (ANZSCO 341111) is on the skills shortage list and
                eligible for the Skilled Nominated Visa (Subclass 190) and Global Talent routes.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'canada',
    heading: 'Canada: Red Seal and Provincial Licensing',
    content: (
      <>
        <p>
          Canada has a persistent shortage of qualified electricians, particularly in Alberta,
          British Columbia, and Ontario. The Interprovincial Red Seal programme allows electricians
          to work across provinces once licensed.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Salary range</strong> — CAD $70,000 to $110,000 (approximately £40,000
                to £64,000 at 2026 exchange rates). Alberta oil sands and BC mining sectors pay
                premium rates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualification assessment</strong> — UK qualifications are assessed by the
                provincial authority (e.g., BCSA in BC, OACETT in Ontario). The assessment
                determines which elements of the Canadian curriculum need to be completed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical standard</strong> — Canada uses the Canadian Electrical Code
                (CEC), which is closely related to the US NEC but with Canadian amendments.
                Study of the CEC is required before working in Canada.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visa</strong> — Express Entry (Federal Skilled Trades), Provincial Nominee
                Programme (PNP), or Temporary Foreign Worker Programme. Electricians (NOC 72200)
                are in demand and score well in Express Entry draws.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'qualifications',
    heading: 'Qualification Equivalency: BS 7671 vs International Standards',
    content: (
      <>
        <p>
          UK electricians trained to BS 7671 have a strong technical foundation, but must
          understand how this translates to international standards:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-white">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 pr-4 font-semibold">Country/Region</th>
                  <th className="text-left py-2 pr-4 font-semibold">Standard</th>
                  <th className="text-left py-2 font-semibold">Key Differences from BS 7671</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="py-2 pr-4">UAE / Qatar / Saudi</td>
                  <td className="py-2 pr-4">IEC 60364 (local amendments)</td>
                  <td className="py-2">Local plug/socket types, different DNO interface requirements</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Australia</td>
                  <td className="py-2 pr-4">AS/NZS 3000</td>
                  <td className="py-2">Flat-pin sockets (AS 3112), broad mandatory RCD requirements, different wiring colours historically</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Canada</td>
                  <td className="py-2 pr-4">Canadian Electrical Code (CEC)</td>
                  <td className="py-2">120/240V system, different conduit/raceway rules, North American wiring conventions</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">USA</td>
                  <td className="py-2 pr-4">NEC (NFPA 70)</td>
                  <td className="py-2">120/240V system, AWG cable sizes, different overcurrent device ratings and enclosure types</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'visas',
    heading: 'Visa and Work Permit Overview',
    content: (
      <>
        <p>
          Each destination country has different immigration routes for skilled tradespeople. The
          headline position in 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>UAE</strong> — employment visa tied to employer (kafala system). Your
                employer sponsors your residency visa. No path to citizenship for most expatriates.
                Process is managed by employer, typically taking 2 to 6 weeks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Australia</strong> — Employer Sponsored (Subclass 482, valid 2–4 years,
                pathway to 186 permanent), Skilled Independent (Subclass 189), or State Nominated
                (Subclass 190). Electrician is on the priority skills list. Process: 3 to 12 months.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Canada</strong> — Temporary Foreign Worker (employer-led), Express Entry
                Federal Skilled Trades, or Provincial Nominee Programme. ITA (Invitation to Apply)
                for Express Entry typically issued within 6 to 12 months for trades in demand.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qatar / Saudi Arabia</strong> — work visa tied to employer sponsor.
                Government-managed process, typically employer-handled. Saudi Arabia introduced
                the Premium Residency scheme for long-term residents in certain categories.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'considerations',
    heading: 'Practical Considerations Before Going Abroad',
    content: (
      <>
        <p>
          Before making the move to work abroad, UK electricians should consider:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">UK tax obligations</h4>
                <p className="text-white text-sm leading-relaxed">
                  Working abroad for more than the split-year threshold may affect your UK tax
                  residency status. Tax-free Gulf salaries may still be reportable if you retain
                  UK ties. Take advice from an expat tax specialist before going.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Briefcase className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Pension continuity</h4>
                <p className="text-white text-sm leading-relaxed">
                  Working abroad typically means no employer pension contributions unless your
                  employer has an international scheme. Consider maintaining voluntary NI
                  contributions to preserve State Pension entitlement. A SIPP (Self-Invested
                  Personal Pension) can be maintained while abroad.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Keep UK qualifications current</h4>
                <p className="text-white text-sm leading-relaxed">
                  Maintain your 18th Edition, scheme membership, and professional body membership
                  while abroad. This ensures you can return to UK practice without gaps. NICEIC
                  and NAPIT membership can be maintained at a reduced rate for periods of absence.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Manage your electrical business and certificates wherever you are"
          description="Elec-Mate works on iOS and Android — complete certificates, manage jobs, and stay on top of your business whether you are in the UK or working abroad."
          icon={Globe}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianWorkingAbroadPage() {
  return (
    <GuideTemplate
      title="UK Electricians Working Abroad | UAE, Australia, Canada Guide 2026"
      description="Guide for UK electricians working abroad — Middle East salaries (UAE £55,000–£100,000 tax-free), Australia, Canada. Qualification equivalency (BS 7671 vs NEC, AS/NZS 3000), visa routes, and practical considerations."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Career Guide"
      badgeIcon={Globe}
      heroTitle={
        <>
          UK Electricians Working Abroad:{' '}
          <span className="text-yellow-400">UAE, Australia & Canada Guide</span>
        </>
      }
      heroSubtitle="UK-trained electricians are in demand globally. This guide covers the most popular destinations — UAE, Qatar, Saudi Arabia, Australia, and Canada — with salary expectations, qualification equivalency, visa routes, and practical advice."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About UK Electricians Working Abroad"
      relatedPages={relatedPages}
      ctaHeading="Keep Your UK Qualifications and Business Running Wherever You Are"
      ctaSubheading="Elec-Mate gives UK electricians professional tools for quoting, certification, and job management — on iOS and Android, wherever in the world you are working."
    />
  );
}
