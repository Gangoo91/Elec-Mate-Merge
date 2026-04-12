import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
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
  { label: 'Electrician Salary Birmingham', href: '/guides/electrician-salary-birmingham' },
];

const tocItems = [
  { id: 'overview', label: 'Birmingham Salary Overview' },
  { id: 'employed', label: 'Employed Electrician Salaries' },
  { id: 'self-employed', label: 'Self-Employed Earnings' },
  { id: 'sectors', label: 'Top-Paying Sectors' },
  { id: 'comparison', label: 'Comparison to UK Average' },
  { id: 'opportunity', label: 'Market Opportunity' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Employed electricians in Birmingham typically earn £30,000 to £50,000 per year, broadly in line with the West Midlands average.',
  'Self-employed and limited company electricians in Birmingham and the wider West Midlands commonly achieve £42,000 to £65,000 per year.',
  'Commonwealth Games legacy infrastructure, HS2, and Birmingham City Council\'s ongoing regeneration programme are sustaining demand for electrical skills in the region.',
  'Day rates for self-employed Birmingham electricians range from £260 to £420 depending on sector, experience, and job type.',
  'The West Midlands manufacturing and automotive supply chain (Jaguar Land Rover, GKN, National Grid substations) creates consistent demand for industrial electricians at premium rates.',
];

const faqs = [
  {
    question: 'What is the average salary for an electrician in Birmingham?',
    answer:
      'For employed electricians, the Birmingham average is £30,000 to £50,000 depending on experience, employer type, and sector. A newly qualified electrician starting with a smaller West Midlands contractor typically earns £30,000 to £34,000. An experienced site electrician on a large commercial project in the city centre can earn £40,000 to £50,000. Senior electricians and working foremen regularly reach £50,000 to £60,000. Self-employed domestic electricians in the Birmingham area typically net £42,000 to £58,000 after costs, with established small contractors achieving £55,000 to £65,000+.',
  },
  {
    question: 'Is self-employment viable for electricians in Birmingham?',
    answer:
      'Self-employment is a very viable route for experienced Birmingham electricians. The West Midlands has a large private rented sector (landlord testing), a substantial owner-occupier housing stock (rewires, CU upgrades, EV chargers), and active commercial and industrial construction. Operating costs in Birmingham are significantly lower than London — no congestion zone, lower van insurance, and cheaper materials and parking. A sole trader billing £300 per day for 200 days generates £60,000 turnover; after costs (van, insurance, tools, accountancy, materials), take-home profit is typically £38,000 to £48,000 for a domestic-focused electrician. Commercial and industrial rates are higher.',
  },
  {
    question: 'What impact has HS2 had on Birmingham electrician salaries?',
    answer:
      'HS2 has created significant sustained demand for electrical skills in the West Midlands. Direct electrical work on the HS2 route (tunnels, civils, stations, depots) has absorbed a significant number of skilled electricians from the regional labour pool, tightening supply and pushing rates up for other employers and self-employed contractors who are competing for the same workforce. Electricians with rail experience (PTS, DCCR, or signalling familiarity) command particularly strong rates on HS2 and related infrastructure. The indirect demand effect from construction workers living in the region and spending on housing upgrades has also bolstered the domestic electrical market.',
  },
  {
    question: 'What are the best areas in the West Midlands for self-employed electricians?',
    answer:
      'The most productive areas for self-employed domestic electricians in the West Midlands are Solihull, Sutton Coldfield, Edgbaston, Harborne, and the four towns (Lichfield, Tamworth, Redditch, Stratford-upon-Avon) where higher household incomes support premium rates. For commercial and industrial work, the Black Country (Wolverhampton, Walsall, West Bromwich, Dudley) has a large industrial base. Coventry is a separate but closely related market with strong automotive and aerospace sector work. The M42 corridor (Birmingham International, NEC, Solihull) has consistent commercial and hospitality sector demand.',
  },
  {
    question: 'How does the JIB agreement apply to Birmingham electricians?',
    answer:
      'Birmingham falls under the standard JIB national rate (not the London plus rate). For 2025–2026, the JIB Approved Electrician standard rate is approximately £20.50 to £21.50 per hour, equating to £39,000 to £41,000 per year for a 38-hour week. The JIB rate is a minimum; many Birmingham M&E contractors pay above JIB rates for experienced electricians, particularly on large projects where retaining a consistent workforce is important. Electricians working on JIB-covered contracts are entitled to sick pay, holiday pay, and death and disability benefits under the JIB rules, in addition to the base wage.',
  },
  {
    question: 'What qualifications increase earnings the most for Birmingham electricians?',
    answer:
      'In the Birmingham market, the qualifications that deliver the most significant earnings uplift are: 2391 Inspection and Testing (mandatory for profitable EICR work — mandatory for landlords and letting agents), EV charger installation (OZEV approved installer — consistent demand across the West Midlands), 18th Edition (baseline, but required for all work), Solar PV and battery storage (growing residential demand, MCS pathway), CSCS Gold Card (mandatory for most site work), and CompEx (for petrochem and chemical work in the West Midlands industrial corridor). For those targeting the automotive supply chain, PSSR (Pressure Systems Safety Regulations) awareness and familiarity with machine safety standards (BS EN 60204-1) are valued.',
  },
  {
    question: 'Are there opportunities for Birmingham electricians in the new-build residential sector?',
    answer:
      'Yes. Birmingham and the surrounding areas have significant new-build residential programmes — from large housing association schemes to private developer apartment blocks and suburban housing estates. New-build residential electrical work is typically priced by house type (detached, semi, terraced, apartment) on a fixed-price per-plot basis. Rates in the West Midlands for new-build plots are typically £2,500 to £5,000 per detached house (first fix and second fix combined), depending on size and specification. The work is consistent and volume-based, which suits electricians who can price efficiently and manage their time well. Plot work is generally less lucrative per day than domestic service work but provides consistent forward order books.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrician-salary-london',
    title: 'Electrician Salary in London',
    description: 'How Birmingham compares to London — rates £38,000–£65,000 employed.',
    icon: MapPin,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-salary-manchester',
    title: 'Electrician Salary in Manchester',
    description: 'Salaries and day rates for Manchester and Greater Manchester electricians.',
    icon: MapPin,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-career-ladder-uk',
    title: 'Electrician Career Ladder UK',
    description: 'From apprentice to electrical director — timelines, salaries, qualifications.',
    icon: TrendingUp,
    category: 'Guide',
  },
  {
    href: '/guides/from-electrician-to-electrical-contractor',
    title: 'From Electrician to Contractor',
    description: 'How to go self-employed and build a profitable contracting business.',
    icon: Briefcase,
    category: 'Guide',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Professional quotes in minutes — win more West Midlands jobs.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/eic-certificate',
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
    heading: 'Electrician Salaries in Birmingham: 2026 Guide',
    content: (
      <>
        <p>
          Birmingham is the UK's second largest city and sits at the heart of the West Midlands
          economic region. A diverse economy spanning manufacturing, automotive, construction,
          public sector, and a growing professional services sector means consistent and varied
          demand for electrical skills across Birmingham and the wider conurbation.
        </p>
        <p>
          Electrician salaries in Birmingham are broadly in line with the West Midlands average and
          the national average, making Birmingham a solid market for both employed electricians and
          those building their own contracting businesses. Operating costs are significantly lower
          than London, which means the real take-home for self-employed electricians in Birmingham
          is competitive with many higher-rate regions.
        </p>
        <p>
          This guide covers employed salary ranges, self-employed earnings, the best-paying sectors
          in the region, and how to maximise your earning potential in the Birmingham and West
          Midlands market.
        </p>
      </>
    ),
  },
  {
    id: 'employed',
    heading: 'Employed Electrician Salaries in Birmingham',
    content: (
      <>
        <p>
          Employed electricians in Birmingham working for M&amp;E contractors, FM companies,
          local authorities, and commercial organisations earn the following salary ranges in 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Newly qualified (0–2 years)</strong> — £30,000 to £34,000. Entry-level
                positions with smaller West Midlands contractors on residential or light commercial
                work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Experienced electrician (3–7 years)</strong> — £34,000 to £44,000. On
                larger commercial, industrial, or infrastructure projects in the West Midlands.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Senior electrician / working foreman</strong> — £44,000 to £50,000.
                Leading small teams on commercial or infrastructure projects.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Contracts supervisor / project manager</strong> — £50,000 to £65,000.
                Commercial and technical management of electrical contract scopes.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Benefits packages for Birmingham M&amp;E contractor employees typically include a van or
          travel allowance, tool allowance, and employer pension contributions. Some larger
          contractors also offer health cash plans, life assurance, and annual leave above the
          statutory minimum.
        </p>
      </>
    ),
  },
  {
    id: 'self-employed',
    heading: 'Self-Employed Electrician Earnings in Birmingham',
    content: (
      <>
        <p>
          Self-employment is a well-established route for Birmingham electricians. Typical day
          rates and annual earnings by work type:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Domestic</h3>
            <p className="text-white text-sm leading-relaxed">
              Rewires, consumer units, EICRs, EV chargers. Day rate equivalent: £260 to £360.
              Annual turnover: £60,000 to £90,000. Take-home after costs: £42,000 to £58,000.
              Higher in affluent suburbs (Solihull, Sutton Coldfield, Edgbaston).
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Commercial / Industrial</h3>
            <p className="text-white text-sm leading-relaxed">
              Labour-only sub-contract: £190 to £260 per day. Full small contractor: £280 to £420
              per day equivalent. Industrial and manufacturing sector rates are at the higher end.
              Established small contractors with 2–3 operatives: £150,000 to £280,000 turnover.
            </p>
          </div>
        </div>
        <SEOAppBridge
          title="Quote Birmingham jobs professionally and win more work"
          description="Elec-Mate's quoting app helps Birmingham electricians build detailed, professional estimates in minutes. Get paid faster with polished invoices and certificates."
          icon={Briefcase}
        />
      </>
    ),
  },
  {
    id: 'sectors',
    heading: 'Top-Paying Sectors for Birmingham Electricians',
    content: (
      <>
        <p>
          Several sectors in Birmingham and the West Midlands consistently pay above the regional
          average for electrical work:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Automotive and manufacturing (JLR, GKN, tier-1 suppliers)</strong> —
                Industrial maintenance electricians with machine safety and PLC familiarity earn
                premium rates at automotive plants. Day rates of £300 to £500 for shutdown and
                planned maintenance work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HS2 and transport infrastructure</strong> — Rail-qualified electricians
                with PTS certification earn £350 to £500+ per day on HS2 and associated
                infrastructure projects in the West Midlands.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NHS and healthcare</strong> — The large NHS trust capital programmes
                (University Hospitals Birmingham, BCHC, Sandwell and West Birmingham) provide
                consistent, well-funded electrical work with framework rates above commercial
                market rates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Retail and leisure fit-out</strong> — Birmingham's Bullring, Grand Central,
                and Resorts World provide consistent retail and hospitality fit-out work for
                electricians experienced in phased refurbishments and live-environment working.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'comparison',
    heading: 'Birmingham vs UK Average: How Do the Rates Compare?',
    content: (
      <>
        <p>
          Birmingham salaries generally sit at or slightly below the UK national average for
          employed electricians, with self-employed rates roughly in line with the national average.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-white">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 pr-4 font-semibold">Role</th>
                  <th className="text-left py-2 pr-4 font-semibold">UK Average</th>
                  <th className="text-left py-2 font-semibold">Birmingham</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="py-2 pr-4">Newly qualified (employed)</td>
                  <td className="py-2 pr-4">£28,000–£34,000</td>
                  <td className="py-2">£30,000–£34,000</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Experienced electrician (employed)</td>
                  <td className="py-2 pr-4">£34,000–£44,000</td>
                  <td className="py-2">£34,000–£44,000</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Senior / foreman (employed)</td>
                  <td className="py-2 pr-4">£42,000–£54,000</td>
                  <td className="py-2">£44,000–£50,000</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Self-employed (domestic)</td>
                  <td className="py-2 pr-4">£40,000–£60,000</td>
                  <td className="py-2">£42,000–£58,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p>
          Because Birmingham's operating costs are significantly lower than London and the South
          East, the real-terms financial position of a Birmingham-based self-employed electrician
          is competitive — lower gross earnings are offset by lower overhead and a lower cost
          of living.
        </p>
      </>
    ),
  },
  {
    id: 'opportunity',
    heading: 'Market Opportunity for Electricians in Birmingham',
    content: (
      <>
        <p>
          Birmingham and the West Midlands offer several strong growth opportunities for
          electricians looking to expand their income:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <GraduationCap className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EICR and landlord compliance</h4>
                <p className="text-white text-sm leading-relaxed">
                  Birmingham has one of the largest private rented sectors of any UK city outside
                  London. Mandatory EICR regulations create consistent recurring demand. A 2391
                  qualified electrician with good letting agent relationships can build a very
                  profitable testing and remedial works business.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Solar PV and heat pump growth</h4>
                <p className="text-white text-sm leading-relaxed">
                  The West Midlands has significant uptake of solar PV and air source heat pumps,
                  driven by the Boiler Upgrade Scheme and falling panel costs. Electricians with
                  MCS accreditation for solar PV and battery storage, or RECC registration for
                  heat pump electrical connections, can access a growing and well-paying market.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Manage your Birmingham electrical business efficiently"
          description="Quotes, certificates, invoices, and job management — all in one app built for UK electricians. Try Elec-Mate free for 7 days."
          icon={Wrench}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianSalaryBirminghamPage() {
  return (
    <GuideTemplate
      title="Electrician Salary Birmingham 2026 | Employed & Self-Employed Rates"
      description="Realistic electrician salary figures for Birmingham and the West Midlands in 2026. Employed rates £30,000–£50,000, self-employed £42,000–£65,000. Top sectors, day rates, and market opportunities."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Salary Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Electrician Salary Birmingham:{' '}
          <span className="text-yellow-400">Realistic 2026 Earnings Guide</span>
        </>
      }
      heroSubtitle="What do electricians actually earn in Birmingham and the West Midlands in 2026? This guide covers employed salaries, self-employed day rates, the top-paying sectors, and how to grow your income in the region."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrician Salaries in Birmingham"
      relatedPages={relatedPages}
      ctaHeading="Quote, Certify, and Manage Your West Midlands Electrical Business"
      ctaSubheading="Professional quoting, on-site EIC certificates, and job management for UK electricians. 7-day free trial on Elec-Mate."
    />
  );
}
