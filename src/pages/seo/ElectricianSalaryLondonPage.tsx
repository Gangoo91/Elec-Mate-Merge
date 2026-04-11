import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  TrendingUp,
  MapPin,
  Briefcase,
  GraduationCap,
  Wrench,
  FileCheck2,
  Calculator,
  Star,
  Clock,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Career Guides', href: '/guides/electrician-career-ladder-uk' },
  { label: 'Electrician Salary London', href: '/guides/electrician-salary-london' },
];

const tocItems = [
  { id: 'overview', label: 'London Salary Overview' },
  { id: 'employed', label: 'Employed Electrician Salaries' },
  { id: 'self-employed', label: 'Self-Employed and Limited Company' },
  { id: 'specialist', label: 'Specialist and Senior Roles' },
  { id: 'why-london', label: 'Why London Rates Are Higher' },
  { id: 'comparison', label: 'Comparison to UK Average' },
  { id: 'maximise', label: 'How to Maximise Your Earnings' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Employed electricians in London typically earn £38,000 to £65,000 per year, around 20 to 35% above the UK national average for the same role.',
  'Self-employed and limited company electricians in London commonly achieve £55,000 to £90,000 per year, with established contractors billing significantly more.',
  'Specialist roles — HV, data centre, rail, ATEX — command £70,000 to £100,000+ in London, reflecting both skill scarcity and the concentration of major infrastructure projects.',
  'London allowances, congestion zone costs, and higher overhead are factored into London rates, but take-home pay still exceeds most other UK regions.',
  'Electricians operating in London should quote at least 25 to 30% above standard regional rates to account for costs, competition for work, and the higher cost of living.',
];

const faqs = [
  {
    question: 'What is the average salary for an electrician in London?',
    answer:
      'For employed electricians, the London average sits between £38,000 and £65,000 depending on experience, employer type, and sector. A newly qualified electrician on an M&E contractor site might start at £38,000 to £42,000, while a senior electrician on a large commercial project can reach £55,000 to £65,000. Foremen and site supervisors regularly exceed £65,000. Self-employed electricians working domestic and light commercial jobs typically earn £55,000 to £80,000 in London, with established contractors achieving £80,000 to £90,000 or more.',
  },
  {
    question: 'Is it worth being self-employed as an electrician in London?',
    answer:
      'For most qualified and experienced electricians, self-employment or operating through a limited company delivers significantly higher earnings than employment in London. The downside is that self-employed electricians bear all business costs — van, tools, insurance, materials, marketing, accounting — and have no sick pay, holiday pay, or employer pension contributions. However, a sole trader billing £1,000 per day (achievable for fit-out and commercial work in London) for 200 days per year generates £200,000 turnover, with take-home profits after costs and tax often exceeding £80,000. A limited company structure allows for further tax efficiency through dividend payments.',
  },
  {
    question: 'How does London weighting work for electricians?',
    answer:
      'There is no formal London weighting for self-employed electricians — you set your own rates. For employed electricians, London weighting is either built into the headline salary or paid as a separate allowance, typically £2,000 to £5,000 per year on top of the base pay. JIB (Joint Industry Board) graded electricians in London are entitled to London plus rates under the JIB national agreement, which add approximately 20 to 25% above the standard graded rate. Many M&E contractors offer a consolidated London rate rather than a separate allowance.',
  },
  {
    question: 'What is the JIB rate for an electrician in London in 2026?',
    answer:
      'JIB rates are agreed annually between the Electrical Contractors Association (ECA) and Unite the Union. For 2025–2026, the JIB Approved Electrician rate in London is approximately £23.50 to £24.50 per hour (London plus rate), equating to approximately £45,000 to £47,000 per year for a standard 38-hour week. Electrical Technicians earn more, and craft persons earn slightly less. These are minimum rates under the JIB agreement — many London contractors pay above the JIB rate to attract and retain skilled electricians in a competitive market.',
  },
  {
    question: 'How does the cost of living affect electrician earnings in London?',
    answer:
      'London electricians earn more in absolute terms, but the higher cost of living reduces the real-terms advantage. Rent and mortgage costs in London are typically two to three times the national average. Travel costs (transport or congestion zone charges for the van) are a significant business expense. However, for electricians who live outside London and work in the city — commuting in by van or public transport to commercial sites — the London earnings premium is largely retained while living costs are controlled. Many London contractors live in Essex, Kent, or Hertfordshire for this reason.',
  },
  {
    question: 'What types of work pay the most for London electricians?',
    answer:
      'In London, the highest-paying work types are: high-rise residential and commercial fit-out (complex, time-pressured, high value per project), data centre installation and maintenance (specialist skills, 24/7 operations, premium rates), high-voltage (HV) and substation work (specialist qualification required, significant premium), rail and transport infrastructure (Crossrail, Underground, Transport for London — well-funded, long programmes), and commercial refurbishment in the City and Canary Wharf financial districts (demanding schedules, high day rates). Domestic work in prime London postcodes (SW1, W1, NW3, SE1) also commands premium rates because of the high property values and high-net-worth clients.',
  },
  {
    question: 'Do electricians need any additional qualifications to work in London specifically?',
    answer:
      'There are no London-specific qualifications, but several qualifications are particularly valuable in the London market. CSCS (Construction Skills Certification Scheme) Gold or Black card is effectively mandatory for site work in London — most principal contractors will not admit workers without it. Asbestos awareness (often mandatory on older commercial and public buildings in London). CCNSG Safety Passport for petrochem and industrial sites. ECS (Electrotechnical Certification Scheme) card from JIB. For rail work: Personal Track Safety (PTS). For data centres: BICSI or manufacturer-specific certifications. DBS checks are required for work in schools, hospitals, and other regulated environments in London.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrician-salary-manchester',
    title: 'Electrician Salary in Manchester',
    description: 'Average salaries and self-employed earnings for Manchester electricians.',
    icon: MapPin,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-career-ladder-uk',
    title: 'Electrician Career Ladder UK',
    description:
      'From apprentice to electrical director — timelines, salaries, and qualifications.',
    icon: TrendingUp,
    category: 'Guide',
  },
  {
    href: '/guides/from-electrician-to-electrical-contractor',
    title: 'From Electrician to Contractor',
    description: 'How to go self-employed, build a customer base, and grow a contracting business.',
    icon: Briefcase,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote faster and win more London jobs with professional estimates.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete Electrical Installation Certificates on site on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/specialist-electrician-routes-uk',
    title: 'Specialist Electrician Routes',
    description: 'ATEX, HV, rail, data centre and other high-earning specialist paths.',
    icon: Star,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Electrician Salaries in London: What You Can Realistically Earn',
    content: (
      <>
        <p>
          London is the highest-paying region for electricians in the United Kingdom. A combination
          of high demand, major infrastructure projects, high-net-worth domestic clients, and the
          city's elevated cost of doing business means that London electrician rates consistently
          exceed the national average by 20 to 40%.
        </p>
        <p>
          Whether you are employed on a large M&amp;E contractor, running your own domestic
          electrical business, or working as a specialist on a data centre or rail project, your
          earnings in London reflect both the complexity of the work and the premium the market
          places on skilled electrical labour in the capital.
        </p>
        <p>
          This guide breaks down realistic London salary and day-rate figures for 2026, explains why
          London rates are higher, and shows how to position yourself to maximise your earnings
          whether you are employed or self-employed.
        </p>
      </>
    ),
  },
  {
    id: 'employed',
    heading: 'Employed Electrician Salaries in London',
    content: (
      <>
        <p>
          Employed electricians in London — those working for M&amp;E contractors, facilities
          management companies, local authorities, or large commercial organisations — typically
          earn the following:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Newly qualified electrician (0–2 years post-qualification)</strong> —
                £38,000 to £44,000 per year. Typically working on residential or light commercial
                projects for smaller contractors. JIB craft person or approved electrician grade.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Experienced electrician (3–7 years)</strong> — £44,000 to £55,000. Working
                on larger commercial or residential schemes for established M&amp;E contractors. JIB
                approved electrician or technician grade.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Senior electrician / working foreman</strong> — £55,000 to £65,000. Leading
                a small team on a section of a large project. Often SSSTS qualified. May receive
                additional allowances for responsibility.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical foreman / site supervisor</strong> — £60,000 to £75,000.
                Supervising multiple electricians on a major project. SMSTS qualification common.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Contracts supervisor / project manager</strong> — £65,000 to £85,000.
                Managing the electrical scope of a project commercially and technically, from
                procurement through to commissioning and handover.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These figures represent headline salary. Many London employed positions include additional
          benefits: van or travel allowance, tool allowance, employer pension contributions of 4 to
          8%, private health insurance, and in some cases profit share or annual bonus.
        </p>
      </>
    ),
  },
  {
    id: 'self-employed',
    heading: 'Self-Employed and Limited Company Electrician Earnings in London',
    content: (
      <>
        <p>
          Self-employed and limited company electricians in London typically earn substantially more
          than their employed counterparts, though at the cost of higher overheads and business
          risk. Realistic earnings by trade type:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Domestic Electrical</h3>
            <p className="text-white text-sm leading-relaxed">
              Rewires, consumer unit upgrades, EICRs, additions. Day rates of £350 to £600 for a
              sole trader are typical in London. Annual turnover for a consistently booked domestic
              electrician: £80,000 to £120,000. After costs (van, tools, insurance, materials,
              accountancy), take-home profit: £55,000 to £80,000.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Commercial / Fit-Out</h3>
            <p className="text-white text-sm leading-relaxed">
              Office refurbishment, retail, hospitality. Day rates of £250 to £350 as a subbied
              spark or £400 to £600 as a labour-only subcontractor. Established small contractors
              pricing full packages can achieve turnover of £200,000 to £400,000+ with two or three
              operatives.
            </p>
          </div>
        </div>
        <SEOAppBridge
          title="Quote your London jobs accurately"
          description="Elec-Mate's quoting app lets you build professional, itemised quotes in minutes — materials, labour, testing, certificates. Win more jobs with polished estimates sent directly from your phone."
          icon={Briefcase}
        />
      </>
    ),
  },
  {
    id: 'specialist',
    heading: 'Specialist and Senior Electrician Roles in London',
    content: (
      <>
        <p>
          London's concentration of major infrastructure, data centre investment, HV distribution
          networks, and specialist industrial facilities creates significant demand for electricians
          with advanced qualifications and specialist experience. Typical earnings for specialist
          roles:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>High-voltage (HV) electrician</strong> — £70,000 to £95,000 employed, £500
                to £700 per day self-employed. Authorised Person (AP) or Competent Person (CP) roles
                on distribution networks and large building substations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Data centre electrician</strong> — £60,000 to £85,000 employed, with
                significant shift and on-call supplements. Critical environment work requiring
                structured cabling, UPS, and generator expertise.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rail and transport electrician</strong> — £55,000 to £80,000 employed on
                TfL, Network Rail, and Crossrail successor projects. Shift and weekend working
                supplements can add £10,000 to £20,000 annually.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Management Systems (BMS) / controls</strong> — £60,000 to £80,000.
                Programming and commissioning of Trend, Siemens, Honeywell, or Johnson Controls BMS
                systems on large commercial buildings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical contracts manager</strong> — £80,000 to £110,000. Managing
                multiple electrical projects commercially, including P&amp;L responsibility.
                Typically 10+ years of experience.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'why-london',
    heading: 'Why London Electrician Rates Are Higher',
    content: (
      <>
        <p>London rates are higher than the rest of the UK for several interconnected reasons:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Higher cost of doing business</strong> — congestion zone charges (£15 per
                day in the central zone), higher van insurance, more expensive parking, higher
                accountancy and business service costs, and premium trade counter pricing all
                increase the cost base for London electricians, which must be recovered in day
                rates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supply and demand</strong> — London has a structural shortage of skilled
                trades. Despite higher wages, many electricians choose not to work in London because
                of congestion, travel time, and living costs. This reduces the available pool and
                pushes rates up.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Project complexity</strong> — London projects are often more complex than
                equivalent regional work. High-rise residential, deep basement parking, heritage
                buildings with difficult access, live commercial environments with strict working
                hours — all require more skill and command higher rates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Client wealth</strong> — domestic clients in prime London postcodes have
                higher budgets and higher expectations. A high-net-worth client in Mayfair or
                Hampstead will pay premium rates for quality, reliability, and professionalism
                without the price sensitivity common in other markets.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'comparison',
    heading: 'London vs UK Average: How Do the Rates Compare?',
    content: (
      <>
        <p>
          The UK-wide average employed electrician salary in 2026 is approximately £32,000 to
          £48,000. London sits 20 to 35% above this range. For self-employed electricians, the UK
          national average is approximately £40,000 to £60,000; London self-employed electricians
          consistently achieve £55,000 to £90,000.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-white">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 pr-4 font-semibold">Role</th>
                  <th className="text-left py-2 pr-4 font-semibold">UK Average</th>
                  <th className="text-left py-2 font-semibold">London</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="py-2 pr-4">Newly qualified (employed)</td>
                  <td className="py-2 pr-4">£28,000–£34,000</td>
                  <td className="py-2">£38,000–£44,000</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Experienced electrician (employed)</td>
                  <td className="py-2 pr-4">£34,000–£44,000</td>
                  <td className="py-2">£44,000–£55,000</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Senior / foreman (employed)</td>
                  <td className="py-2 pr-4">£42,000–£54,000</td>
                  <td className="py-2">£55,000–£65,000</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Self-employed domestic</td>
                  <td className="py-2 pr-4">£40,000–£60,000</td>
                  <td className="py-2">£55,000–£80,000</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Specialist (HV, data centre, rail)</td>
                  <td className="py-2 pr-4">£45,000–£65,000</td>
                  <td className="py-2">£70,000–£95,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p>
          After adjusting for London's higher living costs, the real-terms advantage over other UK
          regions narrows, but for electricians who commute into London from lower-cost areas, the
          financial advantage remains significant.
        </p>
      </>
    ),
  },
  {
    id: 'maximise',
    heading: 'How to Maximise Your Earnings as a London Electrician',
    content: (
      <>
        <p>
          Whether employed or self-employed, here are the most effective ways to increase your
          earnings in the London market:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <GraduationCap className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Gain specialist qualifications</h4>
                <p className="text-white text-sm leading-relaxed">
                  The biggest single salary step-changes come from specialist qualifications. CompEx
                  for explosive atmospheres, HV authorisation, 2391 inspection and testing, and BMS
                  qualifications all deliver immediate rate increases of 20 to 50%.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Briefcase className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Go self-employed or limited company</h4>
                <p className="text-white text-sm leading-relaxed">
                  For most experienced London electricians, the move to self-employment or a limited
                  company structure adds £15,000 to £30,000 per year in effective take-home pay
                  compared to equivalent employment, once business costs and tax efficiency are
                  factored in.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Target premium London sectors</h4>
                <p className="text-white text-sm leading-relaxed">
                  Focus on the highest-value London work: prime residential, commercial fit-out,
                  data centres, and HV. These sectors pay 30 to 80% above general electrical rates
                  and have a more resilient demand profile than new-build residential.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Run your London electrical business more efficiently"
          description="Elec-Mate helps London electricians quote accurately, complete certificates on site, and manage jobs on the go. Join 1,000+ UK electricians using the app to save hours each week."
          icon={Wrench}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianSalaryLondonPage() {
  return (
    <GuideTemplate
      title="Electrician Salary London 2026 | Employed & Self-Employed Rates"
      description="Realistic electrician salary figures for London in 2026. Employed rates £38,000–£65,000, self-employed £55,000–£90,000, specialist roles £70,000+. Why London rates are higher and how to maximise your earnings."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Salary Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Electrician Salary London:{' '}
          <span className="text-yellow-400">What You Can Earn in 2026</span>
        </>
      }
      heroSubtitle="London electricians earn 20 to 40% above the UK average. This guide covers realistic employed and self-employed earnings, specialist role premiums, and practical advice on maximising your income in the capital."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrician Salaries in London"
      relatedPages={relatedPages}
      ctaHeading="Quote, Certify and Manage Your London Electrical Business"
      ctaSubheading="Elec-Mate helps London electricians quote faster, complete certificates on site, and manage jobs professionally. 7-day free trial, no card required."
    />
  );
}
