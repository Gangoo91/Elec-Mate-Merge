import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Home,
  Building,
  PoundSterling,
  Award,
  GraduationCap,
  Briefcase,
  FileText,
  Wrench,
  Users,
  ShieldCheck,
  Scale,
  Zap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Career', href: '/guides/how-to-become-electrician' },
  { label: 'Domestic vs Commercial', href: '/guides/domestic-vs-commercial-electrician' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'domestic-work', label: 'Domestic Electrical Work' },
  { id: 'commercial-work', label: 'Commercial Electrical Work' },
  { id: 'qualifications-compared', label: 'Qualifications Compared' },
  { id: 'earning-potential', label: 'Earning Potential' },
  { id: 'career-paths', label: 'Career Paths' },
  { id: 'pros-and-cons', label: 'Pros and Cons' },
  { id: 'switching-sectors', label: 'Switching Sectors' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Domestic electricians work in houses and flats — rewires, consumer unit changes, EICRs, EV chargers, and new installations under Part P of the Building Regulations.',
  'Commercial electricians work in offices, shops, factories, hospitals, and other non-domestic buildings — often involving three-phase systems, containment, and larger-scale installations.',
  'Both sectors require the 18th Edition qualification (C&G 2382), but commercial work typically also requires CSCS/ECS cards, SSSTS or SMSTS, and experience with three-phase distribution.',
  'Domestic electricians who are self-employed can earn more per hour but have irregular workloads; employed commercial electricians have steadier income but longer commutes and site restrictions.',
  'Elec-Mate supports both sectors with digital certificates, quoting and invoicing tools, and training courses covering domestic and commercial electrical work.',
];

const faqs = [
  {
    question: 'Can a domestic electrician do commercial work?',
    answer:
      'Technically, any qualified electrician can carry out electrical work in any sector — the qualifications (C&G 2382, C&G 2391, AM2) are not sector-specific. However, a domestic electrician moving into commercial work may lack practical experience with three-phase systems, large containment runs, busbar trunking, and commercial-grade distribution boards. Most commercial contractors and main contractors require site-specific qualifications such as a CSCS or ECS card, SSSTS or SMSTS, and sometimes IPAF or PASMA. To transition from domestic to commercial, you would typically need to gain experience working alongside commercial electricians, possibly starting as a second electrician or mate on commercial projects, and obtaining the necessary site cards and training.',
  },
  {
    question: 'Is domestic or commercial electrical work more profitable?',
    answer:
      'It depends on how you define profitable. A self-employed domestic electrician who markets well, prices correctly, and keeps a steady pipeline of work can earn £50,000 to £80,000+ per year — sometimes more than an employed commercial electrician earning £38,000 to £50,000. However, the self-employed domestic electrician bears all business costs (van, tools, insurance, scheme registration, materials) and has no paid holidays, sick pay, or pension contributions. An employed commercial electrician has a more predictable income with employment benefits. The most profitable position is often a hybrid: a domestic electrician who also takes on light commercial work (shops, offices, small industrial units), maximising the variety and value of jobs.',
  },
  {
    question: 'Do I need a different competent person scheme for commercial work?',
    answer:
      'Most competent person schemes (NICEIC, NAPIT, ELECSA) offer both domestic and commercial registration categories. If you are currently registered as a Domestic Installer, your scheme membership covers domestic work only — you cannot self-certify commercial work through the scheme. To register for commercial work, you typically need to upgrade your scheme membership to a category that covers non-domestic work (for example, NICEIC Approved Contractor or NAPIT Approved Contractor). This usually requires a more comprehensive assessment and evidence of experience in commercial installations. Some commercial work does not require Building Regulations notification (and therefore does not require scheme registration), but many clients and main contractors prefer to work with scheme-registered contractors.',
  },
  {
    question: 'What is the difference between single-phase and three-phase?',
    answer:
      'Single-phase is the standard domestic supply in the UK — 230V, 50Hz, delivered via a line conductor and neutral. Most houses and flats have a single-phase supply with a 60A or 100A service fuse. Three-phase is used in larger properties and virtually all commercial and industrial buildings — it provides three line conductors, each at 230V to neutral (400V between phases), giving more power capacity and enabling the use of three-phase motors, large HVAC systems, and heavy industrial equipment. Commercial electricians must understand three-phase distribution, phase balancing, and the protection requirements for three-phase circuits. Domestic electricians rarely encounter three-phase unless working on large residential properties or barn conversions with three-phase supplies.',
  },
  {
    question: 'Which sector has better job security?',
    answer:
      'Both sectors are in demand, but for different reasons. Domestic work is driven by housing stock — there are approximately 29 million homes in the UK, all of which need periodic electrical inspection, maintenance, and upgrading. As long as people live in houses, domestic electricians will have work. Commercial work is driven by construction projects, fit-outs, refurbishments, and maintenance contracts. It tends to be more cyclical — busy during construction booms, quieter during recessions. However, employed commercial electricians on maintenance contracts often have very stable, long-term employment. In general, domestic work offers more independence but less predictability; commercial work offers more structure but is tied to the construction market.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrician-salary-uk',
    title: 'Electrician Salary UK 2026',
    description:
      'Detailed salary data for domestic, commercial, and industrial electricians by region and experience level.',
    icon: PoundSterling,
    category: 'Career',
  },
  {
    href: '/guides/electrical-specialisations',
    title: 'Electrical Specialisations',
    description:
      'Explore career options including fire alarm, EV charging, solar PV, data cabling, BMS, and testing specialist.',
    icon: Zap,
    category: 'Career',
  },
  {
    href: '/guides/electrician-self-employed',
    title: 'Self-Employed Electrician',
    description:
      'How to set up as a self-employed electrician — insurance, tax, scheme registration, and finding work.',
    icon: Briefcase,
    category: 'Business',
  },
  {
    href: '/guides/how-to-become-electrician',
    title: 'How to Become an Electrician',
    description:
      'Complete pathway from school leaver to qualified electrician — apprenticeships, courses, and qualifications.',
    icon: GraduationCap,
    category: 'Career',
  },
  {
    href: '/guides/niceic-vs-napit',
    title: 'NICEIC vs NAPIT',
    description:
      'Compare the two largest competent person schemes — costs, assessment, reputation, and switching.',
    icon: ShieldCheck,
    category: 'Career',
  },
  {
    href: '/guides/electrician-cv-guide',
    title: 'Electrician CV Guide',
    description:
      'Write a CV that gets you hired — whether you are targeting domestic or commercial roles.',
    icon: FileText,
    category: 'Career',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Domestic vs Commercial: Understanding the Two Main Sectors',
    content: (
      <>
        <p>
          The UK electrical industry broadly divides into two sectors: domestic and commercial (with
          industrial as a third, more specialised category). Most electricians start in one sector
          and either stay or transition to the other as their career develops. Understanding the
          differences helps you choose the right path — or at least make an informed decision about
          which direction to pursue.
        </p>
        <p>
          The distinction is not just about the type of building. Domestic and commercial electrical
          work differ in scale, complexity, regulation, business model, working environment, and
          career trajectory. A domestic electrician may work alone, running their own business,
          dealing directly with homeowners. A commercial electrician typically works as part of a
          team on larger projects, reporting to a site supervisor or project manager, with work
          programmed weeks or months in advance.
        </p>
        <p>
          Neither is inherently "better" — they suit different personalities, lifestyles, and career
          goals. This guide covers what each sector involves, what you need to work in each, what
          you can earn, and how to switch between them if you want to.
        </p>
      </>
    ),
  },
  {
    id: 'domestic-work',
    heading: 'Domestic Electrical Work: What It Involves',
    content: (
      <>
        <p>
          Domestic electricians work in houses, flats, bungalows, and residential properties. The
          work is governed by{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Part P of the Building Regulations
          </SEOInternalLink>{' '}
          (in England and Wales) and{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>.
          Typical domestic work includes:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full and partial rewires</strong> — replacing the fixed wiring in a
                property, from the consumer unit to every socket, switch, and light point.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit upgrades</strong> — replacing an old fuse board with a modern
                RCBO or dual-RCD consumer unit compliant with{' '}
                <SEOInternalLink href="/guides/consumer-unit-regulations">
                  current regulations
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Periodic inspection and testing (EICRs)</strong> — inspecting the condition
                of existing installations, particularly for{' '}
                <SEOInternalLink href="/guides/eicr-for-landlords">
                  landlord compliance
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New circuit installations</strong> — cooker circuits, shower circuits,
                garden supplies, outbuilding feeds, and additional ring circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charge point installations</strong> — a rapidly growing area of domestic
                work, installing 7kW home chargers with dedicated circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fault finding and repairs</strong> — diagnosing and fixing electrical faults
                in domestic properties, from tripping RCDs to intermittent supply issues.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Domestic electricians often work alone or with one other person. The relationship with the
          customer is direct — you are in their home, answering their questions, and managing their
          expectations. Strong customer service skills are essential. Self-employed domestic
          electricians are effectively running their own small business, handling marketing,
          quoting, invoicing, certification, and accounts alongside the electrical work itself.
        </p>
      </>
    ),
  },
  {
    id: 'commercial-work',
    heading: 'Commercial Electrical Work: What It Involves',
    content: (
      <>
        <p>
          Commercial electricians work in non-domestic buildings: offices, retail units,
          restaurants, hotels, hospitals, schools, factories, warehouses, and data centres. The work
          is governed by BS 7671, the Health and Safety at Work Act 1974, and the Electricity at
          Work Regulations 1989. Typical commercial work includes:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large-scale installation</strong> — new-build offices, schools, hospitals,
                and industrial units. This involves containment (trunking, tray, conduit),
                three-phase distribution, sub-main cabling, and coordinated protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial fit-outs and refurbishments</strong> — transforming
                shell-and-core office space into working environments with lighting, power, data,
                and fire alarm systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire alarm systems (BS 5839)</strong> — installation, commissioning, and
                maintenance of fire detection and alarm systems in commercial premises.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting (BS 5266)</strong> — design, installation, and testing of
                emergency lighting systems for means of escape and open areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Planned preventive maintenance (PPM)</strong> — regular maintenance
                contracts for commercial buildings, covering testing, lamp replacement, PAT testing,
                and system checks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-phase distribution and motor control</strong> — working with higher
                voltages, larger cables, and more complex protection arrangements.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Commercial electricians typically work as part of a team, often on multi-trade
          construction sites. You work alongside plumbers, HVAC engineers, data cablers, and other
          trades, all coordinated by a site manager. The pace is set by the project programme, and
          you are expected to work to daily or weekly targets.
        </p>
      </>
    ),
  },
  {
    id: 'qualifications-compared',
    heading: 'Qualifications: What Each Sector Requires',
    content: (
      <>
        <p>
          The core electrical qualifications are the same for both sectors. Where they differ is in
          the additional qualifications and site cards required:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Domestic Requirements</h3>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <Award className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>C&G 2382 — 18th Edition</span>
              </li>
              <li className="flex items-start gap-2">
                <Award className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>C&G 2391 — Inspection and Testing</span>
              </li>
              <li className="flex items-start gap-2">
                <Award className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>AM2 — Assessment of Competence</span>
              </li>
              <li className="flex items-start gap-2">
                <Award className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>Part P registration (via scheme)</span>
              </li>
              <li className="flex items-start gap-2">
                <Award className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>Domestic Installer scheme membership</span>
              </li>
              <li className="flex items-start gap-2">
                <Award className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>Public liability insurance</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Commercial Requirements</h3>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <Award className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>C&G 2382 — 18th Edition</span>
              </li>
              <li className="flex items-start gap-2">
                <Award className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>C&G 2391 — Inspection and Testing</span>
              </li>
              <li className="flex items-start gap-2">
                <Award className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>AM2 — Assessment of Competence</span>
              </li>
              <li className="flex items-start gap-2">
                <Award className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>ECS/JIB card (Installation Electrician)</span>
              </li>
              <li className="flex items-start gap-2">
                <Award className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>SSSTS or SMSTS (site safety)</span>
              </li>
              <li className="flex items-start gap-2">
                <Award className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>IPAF / PASMA (if working at height)</span>
              </li>
            </ul>
          </div>
        </div>
        <p>
          The key difference is site access cards. Most commercial construction sites require an ECS
          (Electrotechnical Certification Scheme) card issued by the JIB, along with site safety
          training (SSSTS for operatives, SMSTS for supervisors). Without these, you will not get
          through the site gate on most large projects.
        </p>
      </>
    ),
  },
  {
    id: 'earning-potential',
    heading: 'Earning Potential: Domestic vs Commercial',
    content: (
      <>
        <p>
          Earnings vary significantly based on location, experience, employment status, and
          specialisation. Here is a realistic comparison for 2026:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Domestic Earnings</h3>
            <ul className="space-y-3 text-white text-sm">
              <li>
                <strong>Employed:</strong> £28,000 - £40,000 per year
              </li>
              <li>
                <strong>Self-employed (average):</strong> £40,000 - £60,000 per year
              </li>
              <li>
                <strong>Self-employed (established):</strong> £60,000 - £80,000+ per year
              </li>
              <li>
                <strong>Day rate (sub-contract):</strong> £180 - £280 per day
              </li>
            </ul>
            <p className="text-white text-sm mt-3">
              Self-employed earnings are before tax and business costs (van, tools, insurance,
              materials, scheme registration).
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Commercial Earnings</h3>
            <ul className="space-y-3 text-white text-sm">
              <li>
                <strong>Employed (installer):</strong> £32,000 - £45,000 per year
              </li>
              <li>
                <strong>Employed (supervisor):</strong> £42,000 - £55,000 per year
              </li>
              <li>
                <strong>Employed (project manager):</strong> £50,000 - £70,000 per year
              </li>
              <li>
                <strong>Day rate (sub-contract):</strong> £200 - £320 per day
              </li>
            </ul>
            <p className="text-white text-sm mt-3">
              Employed commercial electricians often receive benefits: company van, pension, paid
              holidays, sick pay, and training allowances.
            </p>
          </div>
        </div>
        <p>
          For a detailed breakdown by region and experience level, see our{' '}
          <SEOInternalLink href="/guides/electrician-salary-uk">
            Electrician Salary UK 2026
          </SEOInternalLink>{' '}
          guide.
        </p>
        <SEOAppBridge
          title="Track your earnings and expenses"
          description="Elec-Mate's business tools let you track income, expenses, and job profitability in real time. See exactly what you are earning per job, per week, and per month — whether you are domestic, commercial, or both."
          icon={PoundSterling}
        />
      </>
    ),
  },
  {
    id: 'career-paths',
    heading: 'Career Paths in Each Sector',
    content: (
      <>
        <p>Both sectors offer progression, but the routes are different:</p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Domestic Career Path</h3>
            <ol className="space-y-2 text-white text-sm list-decimal list-inside">
              <li>Apprentice electrician</li>
              <li>Qualified domestic installer</li>
              <li>Self-employed / own business</li>
              <li>Grow the business (take on employees)</li>
              <li>
                Specialise:{' '}
                <SEOInternalLink href="/guides/electrical-specialisations">
                  EV charging, solar PV, smart home
                </SEOInternalLink>
              </li>
              <li>Become an assessor or trainer</li>
            </ol>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Commercial Career Path</h3>
            <ol className="space-y-2 text-white text-sm list-decimal list-inside">
              <li>Apprentice electrician</li>
              <li>Qualified installation electrician</li>
              <li>Approved electrician (JIB grading)</li>
              <li>Site supervisor / foreman</li>
              <li>Project manager / contracts manager</li>
              <li>Electrical design engineer or estimator</li>
            </ol>
          </div>
        </div>
        <p>
          The domestic path tends towards self-employment and business ownership. The commercial
          path tends towards management and project coordination. Both can lead to specialised roles
          — inspection and testing, design, training, or consultancy. Your{' '}
          <SEOInternalLink href="/guides/electrical-qualifications-pathway">
            qualification pathway
          </SEOInternalLink>{' '}
          shapes which direction you go.
        </p>
      </>
    ),
  },
  {
    id: 'pros-and-cons',
    heading: 'Pros and Cons of Each Sector',
    content: (
      <>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Domestic: Pros</h3>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <Scale className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Freedom and flexibility — set your own hours and choose your jobs</span>
              </li>
              <li className="flex items-start gap-2">
                <Scale className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Direct client relationships — rewarding when customers are happy</span>
              </li>
              <li className="flex items-start gap-2">
                <Scale className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Higher earning potential if self-employed and well-organised</span>
              </li>
              <li className="flex items-start gap-2">
                <Scale className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Varied work — no two jobs are the same</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Domestic: Cons</h3>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <Scale className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span>Irregular workload — feast and famine</span>
              </li>
              <li className="flex items-start gap-2">
                <Scale className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span>No sick pay, no paid holidays, no employer pension</span>
              </li>
              <li className="flex items-start gap-2">
                <Scale className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span>Admin burden — quoting, invoicing, chasing payments, accounts</span>
              </li>
              <li className="flex items-start gap-2">
                <Scale className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span>Working in occupied homes — dealing with pets, furniture, and mess</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Commercial: Pros</h3>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <Scale className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Steady, predictable income with employment benefits</span>
              </li>
              <li className="flex items-start gap-2">
                <Scale className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Clear career progression — supervisor, project manager, design engineer</span>
              </li>
              <li className="flex items-start gap-2">
                <Scale className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Work on larger, more complex, and technically interesting projects</span>
              </li>
              <li className="flex items-start gap-2">
                <Scale className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Employer provides tools, van, and materials</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Commercial: Cons</h3>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <Scale className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span>
                  Less freedom — fixed hours, site rules, travel to wherever the project is
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Scale className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span>Long commutes to site — some projects are hours from home</span>
              </li>
              <li className="flex items-start gap-2">
                <Scale className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span>
                  Repetitive tasks on large installations (pulling cable, fixing containment)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Scale className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span>Lower earning ceiling unless you move into management</span>
              </li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'switching-sectors',
    heading: 'How to Switch Between Domestic and Commercial',
    content: (
      <>
        <p>
          Switching sectors is common and achievable with the right preparation. Here is what you
          need to do in each direction:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Home className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Domestic to Commercial</h4>
                <p className="text-white text-sm leading-relaxed">
                  Get your ECS card (apply through the JIB). Complete SSSTS training (2-day course).
                  Consider <SEOInternalLink href="/training/ipaf">IPAF</SEOInternalLink> and{' '}
                  <SEOInternalLink href="/training/pasma">PASMA</SEOInternalLink> if you want to
                  work at height. Build experience with three-phase systems and containment — ask to
                  shadow a commercial electrician or take on light commercial work first. Update
                  your <SEOInternalLink href="/guides/electrician-cv-guide">CV</SEOInternalLink> to
                  highlight any commercial experience.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Building className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Commercial to Domestic</h4>
                <p className="text-white text-sm leading-relaxed">
                  Register with a competent person scheme as a Domestic Installer (NICEIC, NAPIT, or{' '}
                  <SEOInternalLink href="/guides/elecsa-registration">ELECSA</SEOInternalLink>). Get
                  public liability insurance (minimum £2 million). Set up your business — van,
                  tools, accounting, and marketing. Build experience with domestic-specific work:
                  rewires, consumer unit changes, landlord EICRs. Learn the business side — quoting,
                  invoicing, customer management — or use Elec-Mate to handle it digitally.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Run your domestic or commercial business from one app"
          description="Quoting, invoicing, expense tracking, digital certificates, and AI-powered tools — Elec-Mate handles the admin so you can focus on the electrical work. Whether you are domestic, commercial, or transitioning between the two."
          icon={Briefcase}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function DomesticVsCommercialElectricianPage() {
  return (
    <GuideTemplate
      title="Domestic vs Commercial Electrician | Key Differences"
      description="Complete comparison of domestic and commercial electrician careers in the UK. Work types, qualifications, earning potential, career paths, pros and cons, and how to switch between sectors."
      datePublished="2025-07-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Career Guide"
      badgeIcon={Scale}
      heroTitle={
        <>
          Domestic vs Commercial Electrician:{' '}
          <span className="text-yellow-400">Which Career Path Is Right for You?</span>
        </>
      }
      heroSubtitle="Two sectors, two very different working lives. Domestic electricians work in homes with direct client contact and self-employment freedom. Commercial electricians work on larger projects with team structures and career ladders. This guide compares everything — work types, qualifications, earning potential, and how to switch."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Domestic vs Commercial Electricians"
      relatedPages={relatedPages}
      ctaHeading="Tools for Every Electrician"
      ctaSubheading="Whether you work in domestic, commercial, or both sectors — Elec-Mate gives you digital certificates, AI tools, quoting, invoicing, and training courses. Join 430+ UK electricians. 7-day free trial."
    />
  );
}
