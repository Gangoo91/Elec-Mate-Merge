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
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Career Guides', href: '/guides/electrician-career-ladder-uk' },
  { label: 'Electrician Salary Manchester', href: '/guides/electrician-salary-manchester' },
];

const tocItems = [
  { id: 'overview', label: 'Manchester Salary Overview' },
  { id: 'employed', label: 'Employed Electrician Salaries' },
  { id: 'self-employed', label: 'Self-Employed Earnings' },
  { id: 'sectors', label: 'Top-Paying Sectors in Manchester' },
  { id: 'comparison', label: 'Comparison to UK Average' },
  { id: 'opportunity', label: 'Market Opportunity in Greater Manchester' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Employed electricians in Manchester typically earn £32,000 to £52,000 per year, broadly in line with the North West average and slightly above the UK national average.',
  'Self-employed and limited company electricians in Greater Manchester commonly achieve £45,000 to £70,000 per year, with specialist contractors reaching higher.',
  'Major development programmes — NOMA, Salford Quays, HS2 preparatory works — are sustaining high demand for skilled electricians in the region.',
  'Manchester day rates for self-employed electricians are typically £280 to £450, varying by sector and experience.',
  'The cost of doing business in Manchester is significantly lower than London, meaning the real-terms take-home for self-employed electricians often rivals London after costs.',
];

const faqs = [
  {
    question: 'What is the average salary for an electrician in Manchester?',
    answer:
      'For employed electricians, the Manchester average is £32,000 to £52,000 depending on experience, employer size, and sector. A newly qualified electrician on a small contractor might start at £32,000 to £36,000. An experienced site electrician on a major commercial scheme in the city centre can reach £44,000 to £52,000. Senior electricians and foremen on large M&E contracts regularly earn £52,000 to £62,000. Self-employed domestic electricians in Greater Manchester typically net £45,000 to £65,000 after costs, with commercial contractors achieving £55,000 to £70,000+.',
  },
  {
    question: 'How do Manchester electrician salaries compare to the UK average?',
    answer:
      'Manchester salaries are broadly in line with or slightly above the UK average, which is approximately £32,000 to £48,000 employed. The Greater Manchester labour market is more competitive than many other Northern cities, which keeps wages stronger. However, Manchester rates are typically 15 to 25% below London rates for equivalent work. The key advantage of working in Manchester versus London is lower operating costs — no congestion charge, lower van insurance, cheaper parking and materials — which means the net take-home for self-employed electricians is closer to London than the headline rates suggest.',
  },
  {
    question: 'Is there good demand for electricians in Manchester?',
    answer:
      'Yes. Greater Manchester has one of the strongest regional construction pipelines outside London. Major ongoing and planned projects include: the Northern Powerhouse Rail corridor preparatory works, continued Salford Quays and MediaCityUK development, the NOMA mixed-use district in the city centre, hospital and NHS trust capital programmes, and a significant industrial and logistics warehouse building programme across the M62 corridor. The residential market — both new-build apartment schemes and the substantial Victorian and Edwardian housing stock requiring rewires and upgrades — also provides consistent work for domestic electricians.',
  },
  {
    question: 'What day rates do self-employed electricians charge in Manchester?',
    answer:
      'Typical self-employed electrician day rates in Manchester in 2026 are: domestic work (rewires, consumer units, additions) — £280 to £380 as a sole trader; labour-only subcontract on commercial sites — £200 to £280; full electrical package (materials and labour) on domestic or light commercial — priced at £350 to £600 per day equivalent depending on job size. Specialist work (inspection and testing, fire alarm, data, EV charger) typically commands a premium of 20 to 30% above general electrical rates. These are net rates charged; after VAT (if registered), materials, insurance, and fuel, typical take-home is 40 to 55% of turnover for a sole trader.',
  },
  {
    question: 'What qualifications help Manchester electricians earn more?',
    answer:
      'The most impactful qualifications for increasing earnings in the Manchester market are: 2391 Inspection and Testing (opens lucrative EICR work for landlords and letting agents), EV charger installation qualifications (OZEV/OLEV approved installer), Solar PV and battery storage (MCS pathway), 18th Edition update (essential baseline), CSCS Gold Card for site access, and IPAF/PASMA for working at height on commercial sites. For those targeting the industrial M62 corridor, CompEx for hazardous areas adds a significant premium. The Manchester construction sector also values SMSTS for those moving into supervisory roles.',
  },
  {
    question: 'Are there opportunities for electricians in the Manchester area outside the city?',
    answer:
      'Yes. The broader Greater Manchester and North West region offers significant opportunities. Warrington and the Cheshire industrial corridor have substantial petrochem and process plant work, where CompEx-qualified electricians earn premium rates. The industrial estates along the M60 and M62 motorway corridors provide steady commercial and industrial maintenance work. The growth of logistics and e-commerce warehousing (particularly around Trafford Park, Haydock, and Wigan) has created significant demand for electrical installation on large warehouse builds. Salford and Stockport both have active construction programmes. Operationally, a Manchester-based electrician can cover a 30-mile radius and access a wide variety of work types.',
  },
  {
    question: 'How does the JIB agreement affect Manchester electrician pay?',
    answer:
      'JIB (Joint Industry Board) rates apply nationally, with a standard rate and a London plus rate. In Manchester, the standard JIB Approved Electrician rate of approximately £20.50 to £21.50 per hour applies for 2025–2026, equating to approximately £39,000 to £41,000 per year for a 38-hour week. Many Manchester M&E contractors pay above JIB rates to attract and retain quality electricians, particularly for larger projects where skill availability is tight. For self-employed electricians, JIB rates are a useful benchmark but not a ceiling — experienced self-employed electricians typically bill at rates 30 to 60% above the equivalent JIB employed rate.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrician-salary-london',
    title: 'Electrician Salary in London',
    description: 'How London compares — employed rates £38,000–£65,000, self-employed £55,000–£90,000.',
    icon: MapPin,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-salary-birmingham',
    title: 'Electrician Salary in Birmingham',
    description: 'Average salaries and day rates for Birmingham and West Midlands electricians.',
    icon: MapPin,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-career-ladder-uk',
    title: 'Electrician Career Ladder UK',
    description: 'From apprentice to electrical director — timelines, salaries, and qualifications.',
    icon: TrendingUp,
    category: 'Guide',
  },
  {
    href: '/guides/from-electrician-to-electrical-contractor',
    title: 'From Electrician to Contractor',
    description: 'How to go self-employed, build a customer base, and grow your business.',
    icon: Briefcase,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Build professional, itemised quotes fast and win more Manchester jobs.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete installation certificates on site, on your phone.',
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
    heading: 'Electrician Salaries in Manchester: 2026 Guide',
    content: (
      <>
        <p>
          Manchester and Greater Manchester represent one of the UK's most active regional
          construction and electrical markets outside London. A combination of major urban
          regeneration projects, sustained commercial development, a large stock of older housing
          requiring rewires and upgrades, and growing industrial demand along the M62 corridor
          means that skilled electricians in the area are consistently in demand.
        </p>
        <p>
          Salaries and day rates in Manchester are broadly in line with the North West average and
          slightly above the UK national average. While London rates are higher in absolute terms,
          lower operating costs in Manchester — no congestion zone, cheaper van insurance, lower
          parking and materials costs — mean the real-terms take-home pay is closer to London than
          the headline numbers suggest.
        </p>
        <p>
          This guide covers realistic employed salaries, self-employed day rates, the top-paying
          sectors, and how to position yourself for maximum earnings in the Greater Manchester
          market.
        </p>
      </>
    ),
  },
  {
    id: 'employed',
    heading: 'Employed Electrician Salaries in Manchester',
    content: (
      <>
        <p>
          Employed electricians working for M&amp;E contractors, FM companies, and commercial
          organisations in Manchester can expect the following salary ranges in 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Newly qualified (0–2 years)</strong> — £32,000 to £36,000. Working for
                smaller contractors on residential or light commercial work. JIB craft person or
                approved electrician grade.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Experienced electrician (3–7 years)</strong> — £36,000 to £46,000. On
                larger commercial or mixed-use projects. JIB approved electrician or electrician
                technician grade.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Senior electrician / working foreman</strong> — £46,000 to £52,000.
                Leading a small team. Often SSSTS or SMSTS qualified.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Contracts supervisor / project manager</strong> — £52,000 to £68,000.
                Commercial and technical management of electrical works on medium to large projects.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Many Manchester M&amp;E contractors offer travel allowances, van (or van allowance),
          tool allowance, and employer pension contributions on top of the headline salary. For
          site-based roles on major city-centre projects, subsistence allowances may also apply.
        </p>
      </>
    ),
  },
  {
    id: 'self-employed',
    heading: 'Self-Employed Electrician Earnings in Greater Manchester',
    content: (
      <>
        <p>
          Self-employed and limited company electricians typically earn more than their employed
          equivalents in Manchester, though they absorb all business costs. Typical earnings by
          work type:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Domestic</h3>
            <p className="text-white text-sm leading-relaxed">
              Rewires, CU upgrades, EICRs, EV charger installs. Manchester domestic electricians
              typically charge £280 to £380 per day. A well-booked sole trader can generate
              turnover of £70,000 to £100,000, netting £45,000 to £65,000 after costs.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Commercial / Industrial</h3>
            <p className="text-white text-sm leading-relaxed">
              Labour-only on commercial sites: £200 to £280 per day. Full package small commercial
              contractor: £300 to £450 per day equivalent. Established small contractors with
              2–4 operatives can achieve turnover of £200,000 to £350,000+.
            </p>
          </div>
        </div>
        <SEOAppBridge
          title="Quote Manchester jobs accurately and professionally"
          description="Elec-Mate's quoting app helps Manchester electricians win more work with professional, itemised quotes built in minutes. Materials, labour, and testing all covered."
          icon={Briefcase}
        />
      </>
    ),
  },
  {
    id: 'sectors',
    heading: 'Top-Paying Sectors for Manchester Electricians',
    content: (
      <>
        <p>
          Certain sectors in the Greater Manchester area consistently pay above average rates:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Petrochem and process plant (Warrington/Ellesmere Port)</strong> — CompEx
                qualified electricians earn £500 to £700 per day. Consistent demand from Shell,
                Essar, and chemical process operators.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Major M&amp;E construction (city centre)</strong> — large schemes such as
                St Michael's, Noma, and NHS capital projects sustain demand for experienced site
                electricians and foremen at premium rates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Industrial / logistics</strong> — the M60/M62 corridor warehouse build-out
                (Amazon, Ocado, Clipper, XPO) provides steady large-scale electrical installation
                work with consistent programmes and fair rates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Higher education and NHS</strong> — the universities (Manchester,
                Manchester Metropolitan, Salford) and NHS trusts are consistent clients for
                electrical maintenance and capital works, often with framework agreements providing
                regular, stable income.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'comparison',
    heading: 'Manchester vs UK Average Electrician Salaries',
    content: (
      <>
        <p>
          Manchester salaries generally sit slightly above the UK national average, reflecting the
          regional economic strength of Greater Manchester relative to many other parts of the
          country outside London.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-white">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 pr-4 font-semibold">Role</th>
                  <th className="text-left py-2 pr-4 font-semibold">UK Average</th>
                  <th className="text-left py-2 font-semibold">Manchester</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="py-2 pr-4">Newly qualified (employed)</td>
                  <td className="py-2 pr-4">£28,000–£34,000</td>
                  <td className="py-2">£32,000–£36,000</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Experienced electrician (employed)</td>
                  <td className="py-2 pr-4">£34,000–£44,000</td>
                  <td className="py-2">£36,000–£46,000</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Senior / foreman (employed)</td>
                  <td className="py-2 pr-4">£42,000–£54,000</td>
                  <td className="py-2">£46,000–£52,000</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Self-employed (domestic)</td>
                  <td className="py-2 pr-4">£40,000–£60,000</td>
                  <td className="py-2">£45,000–£65,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'opportunity',
    heading: 'Market Opportunity for Electricians in Greater Manchester',
    content: (
      <>
        <p>
          Greater Manchester has a growing and diversified economy that supports strong demand for
          electrical skills across multiple sectors. Key opportunities for electricians to build
          profitable businesses or advance their careers in the region include:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <GraduationCap className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EICR and landlord testing</h4>
                <p className="text-white text-sm leading-relaxed">
                  Manchester has a very large private rented sector. Mandatory EICR regulations
                  mean ongoing demand for inspection and testing work. An electrician with a 2391
                  qualification and a good letting agent relationship can fill their diary with EICR
                  work at £150 to £250 per certificate.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EV charging installation</h4>
                <p className="text-white text-sm leading-relaxed">
                  The large owner-occupier suburban areas of Greater Manchester (Didsbury,
                  Altrincham, Sale, Wilmslow) have strong demand for EV charger installation.
                  OZEV-approved installer status opens access to grant-funded installations and
                  referrals from vehicle dealers. Typical EV install: £800 to £1,500 per charger.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Manage your Manchester electrical business from your phone"
          description="Elec-Mate gives Manchester electricians professional quoting, on-site certificates, and business management tools. 7-day free trial."
          icon={Wrench}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianSalaryManchesterPage() {
  return (
    <GuideTemplate
      title="Electrician Salary Manchester 2026 | Employed & Self-Employed Rates"
      description="Realistic electrician salary figures for Manchester and Greater Manchester in 2026. Employed rates £32,000–£52,000, self-employed £45,000–£70,000. Key sectors, day rates, and market opportunity."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Salary Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Electrician Salary Manchester:{' '}
          <span className="text-yellow-400">Realistic 2026 Earnings Guide</span>
        </>
      }
      heroSubtitle="From newly qualified to contracts manager, this guide covers what electricians actually earn in Manchester and Greater Manchester in 2026 — employed salaries, self-employed day rates, and the sectors that pay the most."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrician Salaries in Manchester"
      relatedPages={relatedPages}
      ctaHeading="Run Your Manchester Electrical Business on Your Phone"
      ctaSubheading="Professional quoting, on-site certificates, and business management — all in one app. Join 430+ UK electricians using Elec-Mate. 7-day free trial."
    />
  );
}
