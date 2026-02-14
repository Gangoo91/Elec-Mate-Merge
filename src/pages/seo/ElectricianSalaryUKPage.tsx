import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  PoundSterling,
  TrendingUp,
  MapPin,
  GraduationCap,
  Briefcase,
  Calculator,
  Zap,
  FileText,
  Receipt,
  BarChart3,
  Award,
  Clock,
} from 'lucide-react';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Electrician Salary UK', href: '/guides/electrician-salary-uk' },
];

const tocItems = [
  { id: 'average-salary', label: 'Average Salary 2026' },
  { id: 'salary-by-region', label: 'Salary by Region' },
  { id: 'salary-by-specialisation', label: 'Salary by Specialisation' },
  { id: 'apprentice-pay', label: 'Apprentice Pay Rates' },
  { id: 'jib-rates', label: 'JIB Pay Rates' },
  { id: 'day-rates', label: 'Day Rates & Overtime' },
  { id: 'self-employed-earnings', label: 'Self-Employed Earnings' },
  { id: 'increase-earnings', label: 'How to Earn More' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The average employed electrician salary in the UK in 2026 is between £32,000 and £45,000, with experienced electricians in London and the South East regularly exceeding £50,000.',
  'Self-employed electricians typically earn between £40,000 and £75,000 per year, with top earners in specialist fields such as EV charging and solar PV exceeding £80,000.',
  'Apprentice electricians start at around £14,000-£18,000 in Year 1, rising to £22,000-£28,000 by Year 4, depending on employer and region.',
  'Day rates for qualified electricians range from £200 to £350 depending on location, specialism, and whether the work is domestic, commercial, or industrial.',
  'The fastest route to higher earnings is specialisation — electricians who add EV, solar, fire alarm, or testing and inspection qualifications can charge significantly more per hour.',
];

const faqs = [
  {
    question: 'What is the average electrician salary in the UK in 2026?',
    answer:
      'The average salary for a qualified employed electrician in the UK in 2026 sits between £32,000 and £45,000 per year, depending on experience, location, and employer. Entry-level qualified electricians (newly completed apprenticeship or adult retraining) typically start at £28,000-£32,000. Electricians with 5-10 years of experience commonly earn £38,000-£45,000 in employed roles. Those working in London and the South East, or in specialist sectors like industrial, data centres, or rail, regularly exceed £50,000. These figures represent base salary only — overtime, call-out payments, and bonuses can add £5,000-£15,000 to annual earnings. Self-employed electricians generally earn more but take on additional business risk and costs.',
  },
  {
    question: 'How much do self-employed electricians earn compared to employed electricians?',
    answer:
      'Self-employed electricians typically earn more in gross income than their employed counterparts, with annual turnover commonly ranging from £40,000 to £75,000 and top performers exceeding £80,000-£100,000. However, it is essential to account for business costs that employed electricians do not face: van costs (lease, fuel, insurance — typically £5,000-£8,000 per year), tool replacement and calibration, public liability and professional indemnity insurance (£500-£1,500 per year), competent person scheme membership (£400-£800 per year), accountancy fees, marketing, and materials for quoted work. After deducting these costs, a self-employed electrician turning over £60,000 might take home £40,000-£48,000 in net profit before personal tax. The trade-off is flexibility, the ability to choose your own work, and no ceiling on earning potential — particularly if you build a small team or move into project management.',
  },
  {
    question: 'What are the current JIB pay rates for electricians?',
    answer:
      'The Joint Industry Board (JIB) sets nationally agreed pay rates for electricians working under the JIB grading structure in the electrical contracting industry. As of 2026, the JIB Approved Electrician rate is approximately £17.50-£18.50 per hour (rates are reviewed annually through SJIB/JIB negotiations and typically increase each January). The JIB Electrician (Technician) rate is higher at approximately £19.00-£20.50 per hour. Apprentice rates under JIB start at around £6.50-£7.50 per hour in Year 1 and increase each year to approximately £12.00-£14.00 in Year 4. These rates represent the minimum agreed pay — many employers pay above JIB rates to attract and retain skilled electricians, particularly in areas with high demand. JIB rates also come with a benefits package including holiday pay, sick pay, pension contributions, and death-in-service benefit, which adds significant value on top of the headline hourly rate.',
  },
  {
    question: 'Do electricians in London earn significantly more than the rest of the UK?',
    answer:
      'Yes, electricians in London typically earn 15-30% more than the national average, reflecting the higher cost of living and strong demand for skilled trades in the capital. An employed electrician in London can expect to earn £38,000-£55,000, compared to £30,000-£42,000 in the Midlands or North of England. Self-employed electricians in London often charge day rates of £280-£350 or more, compared to £200-£260 in other regions. However, higher earnings must be weighed against significantly higher living costs — particularly housing, transport, and parking. The congestion charge and ULEZ zone add daily costs for electricians driving into Central London. The South East outside London also commands higher-than-average rates, with areas like Surrey, Berkshire, and Hertfordshire offering strong earning potential without the congestion challenges of Central London. Scotland and Wales generally align with Northern England pay levels, though Edinburgh, Glasgow, and Cardiff offer somewhat higher rates than rural areas.',
  },
  {
    question: 'How can an electrician increase their earnings?',
    answer:
      'The most effective ways for an electrician to increase their earnings are specialisation, business skills, and certification. Specialisation means adding qualifications that allow you to work in higher-paying niches: EV charger installation (currently in high demand with strong margins), solar PV and battery storage, fire alarm systems (BS 5839), emergency lighting (BS 5266), inspection and testing (C&G 2391), and data and fibre optic cabling. Each of these specialisms commands a premium because the pool of qualified installers is smaller than the demand. Business skills matter because many electricians undercharge — learning to quote accurately (covering materials, labour, overheads, and profit margin), invoice promptly, and manage cash flow can add thousands to annual income without doing more hours. Finally, holding current certifications including the 18th Edition (BS 7671:2018+A3:2024), C&G 2391, and membership of a competent person scheme (NICEIC, NAPIT, ELECSA) signals competence to clients and allows you to self-certify notifiable work, which means you can take on more jobs without needing building control involvement.',
  },
  {
    question: 'What is the typical day rate for an electrician in the UK?',
    answer:
      'Day rates for qualified electricians in the UK in 2026 typically range from £200 to £350 per day, depending on several factors. For general domestic work outside London, £200-£240 per day is common. Commercial and industrial electricians command £240-£300 per day. Specialist work such as testing and inspection, fire alarm installation, or EV charger fitting can push rates to £280-£350 per day. London and the South East add a premium of 15-25% on top of these figures. Emergency and out-of-hours call-outs attract significantly higher rates, often £350-£500 or a fixed call-out fee plus hourly rate. When setting your day rate, you must account for non-chargeable time (quoting, travel, admin, purchasing materials), business costs, and the fact that you will not bill every working day of the year — most self-employed electricians realistically bill 200-230 days per year after holidays, sickness, training, and quiet periods.',
  },
  {
    question: 'How much do electrical apprentices earn in the UK?',
    answer:
      'Electrical apprentice pay in the UK varies by year of training, employer, and region. Under the JIB grading structure, Year 1 apprentices earn approximately £14,000-£18,000 per year (around £6.50-£8.50 per hour). This increases annually as the apprentice progresses through their training: Year 2 typically pays £16,000-£20,000, Year 3 pays £19,000-£24,000, and Year 4 pays £22,000-£28,000. These are gross figures before tax and National Insurance. Some larger employers, particularly those in industrial sectors, utilities, or major contractors, pay above JIB minimum rates and may offer additional benefits such as funded training, tool allowances, and company vehicles. The national minimum wage for apprentices provides a floor (currently £6.40 per hour for those under 19 or in Year 1 of an apprenticeship), but most electrical employers pay well above this. London apprenticeships typically pay 10-20% more than equivalent roles elsewhere. While apprentice pay may seem low, the investment pays off — a newly qualified electrician immediately earns £28,000-£35,000, and the career earnings trajectory is strong.',
  },
];

const sections = [
  {
    id: 'average-salary',
    heading: 'Average Electrician Salary UK 2026',
    content: (
      <>
        <p>
          The average salary for a qualified electrician in the UK in 2026 depends on whether you
          are employed or self-employed, your level of experience, and where you work. Here is a
          breakdown of typical earnings across the main employment types.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Employed Electrician Salary Ranges</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Newly qualified (0-2 years):</strong> £28,000-£32,000
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Experienced (3-5 years):</strong> £32,000-£40,000
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Senior / supervisory:</strong> £40,000-£50,000
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Project manager / contracts manager:</strong> £45,000-£60,000+
              </span>
            </li>
          </ul>
        </div>
        <p>
          These figures represent base salary before overtime, bonuses, or call-out payments. Many
          employed electricians boost their income by £5,000-£15,000 per year through overtime and
          out-of-hours work. Those working for large contractors on industrial, commercial, or
          infrastructure projects tend to earn at the higher end, while domestic installers working
          for smaller firms may earn slightly less but often enjoy more predictable hours.
        </p>
        <p>
          It is worth noting that electricians consistently rank among the highest-paid trades in
          the UK. According to industry surveys, only specialist roles such as control panel
          engineers, high-voltage engineers, and certain plumbing and heating specialists regularly
          out-earn general electricians. The trade offers a strong earning trajectory from
          apprenticeship through to senior and management roles, with realistic six-figure potential
          for those who{' '}
          <SEOInternalLink href="/guides/going-self-employed-electrician">
            go self-employed
          </SEOInternalLink>{' '}
          and build a successful business.
        </p>
        <SEOAppBridge
          title="Hourly Rate Calculator"
          description="Work out exactly what you need to charge per hour to hit your target salary — factoring in holidays, sick days, van costs, insurance, tools, and non-billable time. Most electricians undercharge because they do not account for these hidden costs."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'salary-by-region',
    heading: 'Electrician Salary by Region',
    content: (
      <>
        <p>
          Location is one of the biggest factors affecting electrician pay in the UK. London and the
          South East command premium rates, while other regions offer lower costs of living that can
          offset smaller headline salaries. Here is a regional breakdown for experienced, employed
          electricians.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">
            Regional Salary Ranges (Employed, Experienced)
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>London:</strong> £38,000-£55,000 (day rates £280-£350)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>South East (Surrey, Kent, Berkshire):</strong> £35,000-£48,000 (day rates
                £250-£320)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>South West:</strong> £30,000-£40,000 (day rates £220-£280)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Midlands (Birmingham, Coventry, Nottingham):</strong> £30,000-£42,000 (day
                rates £220-£280)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>North West (Manchester, Liverpool):</strong> £29,000-£40,000 (day rates
                £200-£270)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>North East (Newcastle, Sunderland):</strong> £28,000-£38,000 (day rates
                £200-£260)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Yorkshire & Humber:</strong> £28,000-£39,000 (day rates £200-£260)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Scotland:</strong> £28,000-£40,000 (day rates £200-£270)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Wales:</strong> £27,000-£38,000 (day rates £200-£260)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Northern Ireland:</strong> £26,000-£36,000 (day rates £190-£250)
              </span>
            </li>
          </ul>
        </div>
        <p>
          Remember that higher salaries in London and the South East must be weighed against
          significantly higher living costs. An electrician earning £35,000 in the North East may
          have more disposable income than someone earning £45,000 in Central London when housing,
          transport, and daily costs are factored in. The best approach is to consider your total
          package — salary, overtime, benefits, commute time, and cost of living — rather than
          headline salary alone.
        </p>
      </>
    ),
  },
  {
    id: 'salary-by-specialisation',
    heading: 'Electrician Salary by Specialisation',
    content: (
      <>
        <p>
          Specialising in a particular area of electrical work is one of the most effective ways to
          command higher rates. Specialist electricians fill niches where demand outstrips supply,
          allowing them to charge premium prices. Here is how different specialisms compare.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">
            Salary by Specialism (Employed & Self-Employed Ranges)
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Domestic installer:</strong> £28,000-£40,000 employed / £35,000-£55,000
                self-employed
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Commercial electrician:</strong> £32,000-£45,000 employed / £40,000-£65,000
                self-employed
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Industrial electrician:</strong> £35,000-£50,000 employed / £45,000-£70,000
                self-employed
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Testing and inspection (C&G 2391):</strong> £35,000-£50,000 employed /
                £45,000-£75,000 self-employed
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Fire alarm specialist (BS 5839):</strong> £34,000-£48,000 employed /
                £42,000-£65,000 self-employed
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>EV charger installer:</strong> £32,000-£45,000 employed / £45,000-£75,000+
                self-employed
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Solar PV and battery storage:</strong> £32,000-£45,000 employed /
                £45,000-£80,000+ self-employed
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Data and fibre cabling:</strong> £30,000-£42,000 employed / £40,000-£60,000
                self-employed
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>High-voltage (HV) engineer:</strong> £45,000-£65,000 employed /
                £60,000-£100,000+ self-employed
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Control panel / PLC engineer:</strong> £40,000-£60,000 employed /
                £55,000-£90,000 self-employed
              </span>
            </li>
          </ul>
        </div>
        <p>
          EV charger installation and solar PV are currently the fastest-growing specialisms in the
          UK, driven by the government's net-zero targets and increasing consumer demand.
          Electricians who hold the relevant qualifications and manufacturer accreditations (such as
          OZEV-approved installer status for EV chargers) are in high demand and can command premium
          rates. Similarly, testing and inspection specialists who hold the C&G 2391 qualification
          can earn excellent rates carrying out{' '}
          <SEOInternalLink href="/tools/eicr-certificate">EICRs</SEOInternalLink> for landlords,
          letting agents, and property management companies.
        </p>
        <SEOAppBridge
          title="50+ Training Courses to Upskill"
          description="Elec-Mate's study centre covers EV installation, solar PV, fire alarm (BS 5839), emergency lighting (BS 5266), inspection and testing, and more. Flashcards, mock exams, and AI tutoring help you pass first time — so you can start earning specialist rates sooner."
          icon={GraduationCap}
        />
      </>
    ),
  },
  {
    id: 'apprentice-pay',
    heading: 'Apprentice Electrician Pay Rates',
    content: (
      <>
        <p>
          Electrical apprenticeships typically last 3-4 years, and pay increases each year as the
          apprentice gains skills and takes on more responsibility. Most employers follow either the
          JIB grading structure or set their own rates above the national minimum wage for
          apprentices.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">
            Typical Apprentice Electrician Pay (2026)
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Year 1:</strong> £14,000-£18,000 per year (£6.50-£8.50/hr)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Year 2:</strong> £16,000-£20,000 per year (£7.50-£9.50/hr)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Year 3:</strong> £19,000-£24,000 per year (£9.00-£11.50/hr)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Year 4:</strong> £22,000-£28,000 per year (£10.50-£13.50/hr)
              </span>
            </li>
          </ul>
        </div>
        <p>
          Larger employers — particularly those in the industrial, utilities, and infrastructure
          sectors — often pay above these ranges and may provide additional benefits such as a
          company vehicle, funded training materials, and tool allowances. London apprenticeships
          typically pay 10-20% more than equivalent positions elsewhere.
        </p>
        <p>
          While apprentice pay may seem modest compared to other career paths, the long-term earning
          potential makes it a strong investment. A newly qualified electrician immediately earns
          £28,000-£35,000, and within a few years of building experience, earnings of £40,000+ are
          realistic. Unlike university graduates who may carry £50,000+ in student debt, electrical
          apprentices earn while they learn and qualify debt-free with a trade that is always in
          demand. For a complete breakdown of the apprenticeship route, see our{' '}
          <SEOInternalLink href="/guides/how-to-become-an-electrician">
            how to become an electrician
          </SEOInternalLink>{' '}
          guide.
        </p>
        <SEOAppBridge
          title="Apprentice Training Hub"
          description="Elec-Mate supports apprentices from Day 1 to qualification. Flashcards, mock exams, EPA simulator, AM2 simulator, OJT tracking, portfolio builder, and site diary — everything your college and employer expect, in your pocket."
          icon={GraduationCap}
        />
      </>
    ),
  },
  {
    id: 'jib-rates',
    heading: 'JIB Pay Rates for Electricians',
    content: (
      <>
        <p>
          The Joint Industry Board (JIB) sets nationally agreed pay rates, terms, and conditions for
          operatives in the electrical contracting industry. JIB rates are the benchmark that many
          employers follow, and they are reviewed and updated annually (usually effective from
          January each year) through collective negotiations between the JIB and the trade union
          Unite.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">
            JIB Grading and Approximate Hourly Rates (2026)
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Electrical Labourer:</strong> £12.50-£13.50/hr
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Electrician (Installer):</strong> £15.50-£16.50/hr
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Approved Electrician:</strong> £17.50-£18.50/hr
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Electrician (Technician):</strong> £19.00-£20.50/hr
              </span>
            </li>
          </ul>
        </div>
        <p>
          JIB rates represent the minimum agreed pay for each grade. Many employers pay above these
          rates, particularly in regions with high demand or skills shortages. The JIB package
          includes significant additional benefits beyond the headline hourly rate: 21 days of
          annual holiday plus bank holidays, weekly sick pay, a pension scheme, and death-in-service
          benefit. When these benefits are valued alongside the hourly rate, the total compensation
          package is considerably more than the rate alone suggests.
        </p>
        <p>
          To move up the JIB grading structure, electricians need to complete specific
          qualifications and demonstrate competence. Progression from Installer to Approved
          Electrician requires the AM2 assessment, while the Technician grade requires additional
          qualifications such as the C&G 2391 (Inspection and Testing). Each step up the grading
          ladder comes with a meaningful pay increase.
        </p>
      </>
    ),
  },
  {
    id: 'day-rates',
    heading: 'Electrician Day Rates and Overtime',
    content: (
      <>
        <p>
          Day rates are the standard way self-employed electricians and subcontractors charge for
          their time. Understanding the going rate for your area and specialism is essential for
          pricing work competitively without selling yourself short.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">
            Typical Day Rates by Work Type (2026)
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>General domestic work:</strong> £200-£260/day
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Commercial fit-out:</strong> £240-£300/day
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Industrial / factory:</strong> £260-£320/day
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Testing and inspection:</strong> £250-£350/day
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Fire alarm (BS 5839):</strong> £260-£320/day
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>EV charger installation:</strong> £280-£350/day
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Emergency / out-of-hours call-out:</strong> £350-£500+/day
              </span>
            </li>
          </ul>
        </div>
        <p>
          Overtime for employed electricians is typically paid at time-and-a-half (1.5x) for weekday
          evenings and Saturdays, and double time (2x) for Sundays and bank holidays. Under the JIB
          agreement, overtime rates kick in after the standard 37.5-hour working week. Some
          employers offer enhanced overtime rates to incentivise weekend working or late-night
          shutdowns.
        </p>
        <p>
          When setting your own day rate, do not forget to factor in non-billable time. Most
          self-employed electricians only bill 200-230 days per year once holidays, sickness,
          training days, quoting time, and admin are accounted for. Your day rate needs to cover
          your entire annual income requirement divided by actual billable days, not the 260 working
          days in a calendar year.
        </p>
        <SEOAppBridge
          title="Job Profitability Tracker"
          description="Track every job's actual costs against your quote — materials, labour hours, travel, extras. See your real profit margin per job, per week, per month. Stop guessing and start knowing which work actually makes you money."
          icon={BarChart3}
        />
      </>
    ),
  },
  {
    id: 'self-employed-earnings',
    heading: 'Self-Employed Electrician Earnings',
    content: (
      <>
        <p>
          Going self-employed as an electrician opens up significantly higher earning potential, but
          it also introduces business costs that employed electricians do not face. Understanding
          the full picture is essential for making an informed decision about your career path.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Self-Employed Earnings Breakdown</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Typical annual turnover:</strong> £40,000-£75,000 (one-person operation)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Top earners (specialist / high demand):</strong> £75,000-£100,000+
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Business costs (van, insurance, tools, scheme):</strong>{' '}
                £10,000-£18,000/year
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Realistic net profit (before personal tax):</strong> £30,000-£60,000
              </span>
            </li>
          </ul>
        </div>
        <p>
          The key advantage of self-employment is that there is no ceiling on your earnings.
          Employed electricians hit a pay ceiling relatively quickly — even with promotions and
          overtime, there is a limit to what an employer will pay. Self-employed electricians
          control their pricing, their workload, and their specialisms. Those who price jobs well,
          manage their time efficiently, and build a strong reputation can earn significantly more
          than any employed role would offer.
        </p>
        <p>
          For a detailed breakdown of everything involved in making the switch, including setting up
          as a sole trader or limited company, getting insured, joining a scheme, and managing tax,
          see our{' '}
          <SEOInternalLink href="/guides/going-self-employed-electrician">
            going self-employed guide
          </SEOInternalLink>
          .
        </p>
        <SEOAppBridge
          title="Cash Flow Planner"
          description="The biggest challenge for self-employed electricians is not earning enough — it is managing cash flow. Elec-Mate's cash flow planner tracks money in and money out, shows you upcoming tax liabilities, and warns you before you hit a crunch."
          icon={BarChart3}
        />
      </>
    ),
  },
  {
    id: 'increase-earnings',
    heading: 'How to Increase Your Earnings as an Electrician',
    content: (
      <>
        <p>
          Whether you are employed or self-employed, there are proven strategies to move your
          earnings upwards. The most effective approaches fall into three categories:
          specialisation, business skills, and certification.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Top Strategies for Higher Earnings</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Specialise in high-demand areas:</strong> EV charger installation, solar PV,
                battery storage, fire alarm systems, and testing and inspection all command premium
                rates. The investment in training (typically £500-£2,000 per qualification) pays for
                itself within a few jobs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Price jobs properly:</strong> Many electricians undercharge because they
                calculate their rate based on gross pay rather than accounting for all business
                costs, non-billable time, and profit margin. A proper pricing methodology can add
                20-30% to your income without doing more hours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Upsell and cross-sell:</strong> Every EICR is a chance to quote remedial
                work. Every rewire is a chance to quote for EV charger prep, smart home wiring, or
                fire alarm upgrades. Electricians who actively identify additional work on every job
                significantly increase average job value.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Stay current with certifications:</strong> Hold the 18th Edition (including
                Amendment 3:2024), C&G 2391, and membership of a competent person scheme. These
                credentials signal reliability to clients and allow you to self-certify notifiable
                work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Invoice promptly and chase payment:</strong> Slow invoicing is one of the
                biggest drains on self-employed income. Sending an invoice from site immediately
                after completing a job dramatically improves payment times.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Build recurring revenue:</strong> Maintenance contracts, annual EICR
                programmes for landlords, and testing contracts for commercial clients provide
                predictable income that smooths out the feast-and-famine cycle of one-off jobs.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Quoting and Invoicing Tools"
          description="Elec-Mate's AI Cost Engineer generates detailed quotes with materials and labour breakdowns. The invoice builder lets you send a professional invoice from site the moment the job is done. Stop losing money to slow quoting and late invoicing."
          icon={Receipt}
        />
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/how-to-become-an-electrician',
    title: 'How to Become an Electrician',
    description:
      'Complete guide to routes into the electrical trade — apprenticeships, retraining, qualifications.',
    icon: GraduationCap,
    category: 'Career Guide',
  },
  {
    href: '/guides/going-self-employed-electrician',
    title: 'Going Self-Employed',
    description: 'Everything you need to know about setting up as a self-employed electrician.',
    icon: Briefcase,
    category: 'Business Guide',
  },
  {
    href: '/guides/electrician-apprentice-salary',
    title: 'Apprentice Salary Guide',
    description: 'Detailed breakdown of apprentice electrician pay rates by year and region.',
    icon: PoundSterling,
    category: 'Salary Guide',
  },
  {
    href: '/guides/electrician-career-progression',
    title: 'Career Progression',
    description: 'From apprentice to contracts manager — the complete electrician career ladder.',
    icon: TrendingUp,
    category: 'Career Guide',
  },
  {
    href: '/guides/electrician-day-rates-uk',
    title: 'Day Rates UK',
    description: 'Current day rates for electricians across all UK regions and specialisms.',
    icon: Clock,
    category: 'Salary Guide',
  },
  {
    href: '/tools/hourly-rate-calculator',
    title: 'Hourly Rate Calculator',
    description: 'Calculate your true hourly rate after accounting for all business costs.',
    icon: Calculator,
    category: 'Tool',
  },
];

export default function ElectricianSalaryUKPage() {
  return (
    <GuideTemplate
      title="Electrician Salary UK 2026 | Average Pay & Earnings Guide"
      description="Complete guide to electrician salaries in the UK for 2026. Average pay by region, specialisation, and experience level. Apprentice rates, JIB pay, day rates, self-employed earnings, and how to increase your income."
      datePublished="2024-06-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Salary Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Electrician Salary UK 2026:{' '}
          <span className="text-yellow-400">What You Should Actually Be Earning</span>
        </>
      }
      heroSubtitle="From apprentice rates to six-figure self-employed earnings — a complete, honest breakdown of electrician pay in the UK. Updated for 2026 with regional data, JIB rates, day rates, and specialist premiums."
      readingTime={18}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrician Salaries"
      relatedPages={relatedPages}
      ctaHeading="Earn more with better tools"
      ctaSubheading="Hourly rate calculator, job profitability tracker, quoting tools, and 50+ training courses. Start your 7-day free trial."
    />
  );
}
