import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Users,
  Shield,
  Scale,
  Briefcase,
  CheckCircle2,
  BookOpen,
  Award,
  DollarSign,
  GraduationCap,
  HardHat,
  FileCheck2,
  Building,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Electrical Trade Unions | Unite & GMB Guide UK';
const PAGE_DESCRIPTION =
  'Complete guide to trade union membership for UK electricians. Unite the Union, GMB, JIB agreements, benefits of membership, collective bargaining, legal support, pay rates, dispute resolution, and how unions support your electrical career.';

const breadcrumbs = [
  { label: 'Career', href: '/guides' },
  { label: 'Union Membership', href: '/guides/electrical-union-membership' },
];

const tocItems = [
  { id: 'why-join-a-union', label: 'Why Join a Union?' },
  { id: 'unite-the-union', label: 'Unite the Union' },
  { id: 'gmb-union', label: 'GMB Union' },
  { id: 'jib-agreements', label: 'JIB Agreements' },
  { id: 'collective-bargaining', label: 'Collective Bargaining' },
  { id: 'legal-support', label: 'Legal Support' },
  { id: 'training-and-development', label: 'Training & Development' },
  { id: 'when-not-to-join', label: 'When Is a Union Less Relevant?' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Unite and GMB are the two main trade unions representing UK electricians, both offering legal representation, collective bargaining, training support, and employment advice as core membership benefits.',
  'The JIB (Joint Industry Board for the Electrical Contracting Industry) sets nationally agreed pay rates, working conditions, and grading structures for the electrical contracting sector, negotiated jointly between employers and unions.',
  'Union legal representation is worth the membership fee alone — unions provide free legal advice and representation for workplace disputes, personal injury claims, and employment tribunal cases that would otherwise cost thousands in solicitor fees.',
  'Collective bargaining through unions secures industry-wide pay rises, holiday entitlement, sick pay, and pension contributions that individual electricians cannot negotiate alone.',
  'Elec-Mate complements union membership by providing the digital tools, CPD tracking, and professional documentation that support your career progression through the JIB grading system.',
];

const faqs = [
  {
    question: 'Which union should an electrician join in the UK?',
    answer:
      'The two main unions for electricians in the UK are Unite the Union and GMB. Unite has a dedicated construction and allied trades section with a strong presence in the electrical contracting industry, and it is one of the union parties to the JIB national agreement. GMB also represents electricians and has a strong presence in the energy, utilities, and maintenance sectors. The choice between the two often depends on which union is recognised at your workplace or on the sites where you work. If you work for a JIB-registered employer, Unite is the natural choice as it directly negotiates the JIB terms and conditions. If you work in energy, utilities, or facilities management, GMB may have a stronger presence. Both unions offer similar core benefits including legal representation, collective bargaining, and employment advice. Some electricians are members of both, though this is unusual and generally unnecessary.',
  },
  {
    question: 'How much does union membership cost for electricians?',
    answer:
      'Union membership fees vary depending on your income level and employment status. Unite charges monthly subscriptions on a sliding scale based on earnings, typically ranging from around GBP 10-15 per month for lower earners to GBP 15-25 per month for higher earners. GMB charges similar rates. Apprentices receive significantly reduced rates, often around GBP 2-5 per month. Most unions offer the first month free or at a reduced rate. The cost is tax-deductible as a professional subscription. When compared to the cost of a single employment tribunal case (which can cost GBP 5,000-20,000 in legal fees without union representation) or a personal injury claim, the annual membership fee represents outstanding value for money.',
  },
  {
    question: 'What is the JIB and how does it affect electricians?',
    answer:
      'The JIB (Joint Industry Board for the Electrical Contracting Industry) is the body that sets nationally agreed terms and conditions for employed electricians working for JIB-registered electrical contractors. It is jointly run by the Electrical Contractors Association (ECA) representing employers and Unite representing employees. The JIB sets the national pay rates for each grade (labourer, electrician, approved electrician, technician), defines working conditions (hours, overtime rates, shift allowances, travel time), manages the industry grading system, administers industry sick pay and death benefit schemes, and provides dispute resolution services. If you work for a JIB-registered employer, your pay and conditions are determined by the JIB national agreement. The JIB grading system (from electrical improver through to senior technician) provides a clear career progression pathway with defined pay rates at each level.',
  },
  {
    question: 'Can self-employed electricians join a union?',
    answer:
      'Yes, self-employed electricians can join unions, and both Unite and GMB accept self-employed members. The benefits for self-employed members are different from those for employed members. Self-employed electricians cannot benefit from collective bargaining in the traditional sense (as there is no employer to negotiate with), but they can still access legal advice, professional indemnity insurance (at group rates), tax advice, contract review services, and representation in disputes with clients or main contractors. Some self-employed electricians join unions primarily for the legal protection — if a client refuses to pay or a dispute arises on a commercial site, having union backing can be invaluable. Self-employed membership rates are typically the same as employed rates.',
  },
  {
    question: 'What legal support do unions provide to electricians?',
    answer:
      'Union legal support is one of the most valuable membership benefits. Both Unite and GMB provide free legal advice on employment rights, contract disputes, and workplace issues through dedicated helplines and local representatives. If a dispute escalates to an employment tribunal or court, the union funds the legal representation, which can cost thousands of pounds if you were to instruct a solicitor privately. Unions also handle personal injury claims arising from workplace accidents, typically on a no-win-no-fee basis with no deduction from the compensation (unlike private no-win-no-fee solicitors who take a percentage). This covers injuries sustained on site, occupational diseases (such as hand-arm vibration syndrome or noise-induced hearing loss), and accidents involving faulty equipment. The legal support extends to criminal prosecutions under health and safety legislation, regulatory investigations by the HSE, and disputes over pay, holiday entitlement, and redundancy.',
  },
  {
    question: 'How does Elec-Mate support union members?',
    answer:
      'Elec-Mate complements union membership by providing the digital tools that support your career progression. The JIB grading system requires evidence of qualifications and competence at each level, and Elec-Mate stores all your certificates, test results, and CPD records digitally, making it easy to compile the evidence needed for grading assessments. The study centre provides preparation materials for the qualifications needed to progress through the grades, including 18th Edition, 2391 inspection and testing, and AM2. The CPD tracker ensures you maintain the continuing professional development that demonstrates ongoing competence. The business tools help self-employed electricians manage quoting, invoicing, and financial tracking. Union membership protects your rights; Elec-Mate provides the professional tools to advance your career.',
  },
];

const sections = [
  {
    id: 'why-join-a-union',
    heading: 'Why Join a Trade Union as an Electrician?',
    content: (
      <>
        <p>
          Trade union membership for electricians in the UK provides a combination of legal
          protection, collective bargaining power, training support, and professional advocacy that
          is difficult to replicate through any other means. Whether you are employed by a large
          contractor, working for a small firm, or operating as a self-employed sole trader, union
          membership offers tangible benefits that justify the monthly subscription many times over.
        </p>
        <p>
          The electrical contracting industry has a strong union tradition. The JIB national
          agreement — which sets pay rates, working conditions, and grading structures for the
          industry — exists because of collective bargaining between Unite and the ECA. Without
          union representation, there would be no nationally agreed minimum rates, no industry
          grading system, and no formal mechanism for resolving disputes between electricians and
          their employers.
        </p>
        <p>
          Union membership is not compulsory, and many electricians choose not to join. However,
          those who do join consistently report that the legal protection alone is worth the
          membership fee. A single employment tribunal case or personal injury claim would cost far
          more in private solicitor fees than a lifetime of union subscriptions.
        </p>
        <p>
          For electricians building their careers, union membership also provides access to training
          grants, discounted courses, and career advice that complement the tools available through
          platforms like Elec-Mate. Understanding your rights under{' '}
          <SEOInternalLink href="/guides/electrician-salary-uk">JIB pay agreements</SEOInternalLink>{' '}
          and knowing when to seek help are valuable skills at every stage of your career.
        </p>
      </>
    ),
  },
  {
    id: 'unite-the-union',
    heading: 'Unite the Union for Electricians',
    content: (
      <>
        <p>
          Unite is the largest trade union in the UK and Ireland, and it is the primary union
          representing electricians in the electrical contracting industry. Unite's Construction,
          Allied Trades and Technicians (CATT) section has a dedicated electrical branch that
          specifically represents the interests of electricians, electrical technicians, and
          electrical apprentices.
        </p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Key Unite Benefits for Electricians</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">JIB negotiation</strong> — Unite is the employee
                side of the JIB, directly negotiating pay rates, conditions, and grading structures
                that affect every JIB-registered electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Free legal representation</strong> — Employment
                tribunals, personal injury claims, HSE investigations, and contract disputes are all
                covered by your membership at no additional cost.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Site representation</strong> — Unite shop
                stewards and site representatives are present on major construction sites, providing
                immediate on-the-ground support for workplace issues.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Training and education</strong> — Access to
                Unite's education programme including health and safety courses, union
                representative training, and professional development opportunities.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Financial benefits</strong> — Discounted
                insurance, mortgage advice, legal will service, and member discounts with various
                retailers and services.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Unite has a strong track record of campaigning on issues that directly affect
          electricians, including opposing deskilling, defending industry agreements, and
          challenging bogus self-employment practices. The union's electrical section is led by
          electricians who understand the trade, not career bureaucrats with no site experience.
        </p>
      </>
    ),
  },
  {
    id: 'gmb-union',
    heading: 'GMB Union for Electricians',
    content: (
      <>
        <p>
          GMB is one of the UK's largest general trade unions and represents electricians across
          several sectors including energy, utilities, facilities management, manufacturing, and
          construction. While Unite is the dominant union in the JIB-registered electrical
          contracting sector, GMB has a significant presence in sectors where electricians work
          outside the JIB framework.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Where GMB Is Strong</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Energy sector</strong> — Electricians working
                for energy companies, power stations, and renewable energy installations. GMB has
                recognition agreements with several major energy employers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Utilities</strong> — Water, gas, and electricity
                distribution companies employ maintenance electricians, and GMB represents many of
                them. These roles often come with company-specific agreements that GMB negotiates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Facilities management</strong> — Building
                maintenance electricians working for FM companies such as Mitie, CBRE, and ISS often
                fall under GMB recognition agreements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Manufacturing</strong> — Factory-based
                electricians maintaining production equipment and control systems. GMB has a strong
                manufacturing section with recognition at many large employers.
              </span>
            </li>
          </ul>
        </div>
        <p>
          GMB offers the same core benefits as Unite — legal representation, collective bargaining,
          employment advice, and member services. The choice between the two typically comes down to
          which union is recognised at your workplace. If both are recognised, speak to colleagues
          and shop stewards to understand which union is more active and effective on your site or
          in your company.
        </p>
      </>
    ),
  },
  {
    id: 'jib-agreements',
    heading: 'JIB Agreements and What They Mean for You',
    content: (
      <>
        <p>
          The JIB (Joint Industry Board for the Electrical Contracting Industry) is a unique body in
          the UK construction sector. Jointly governed by the ECA (representing employers) and Unite
          (representing employees), it sets the framework for pay, conditions, and career
          progression in the electrical contracting industry. Understanding the JIB is essential for
          every electrician working in the sector.
        </p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-4">JIB Grading System</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/10">
              <span className="text-white font-medium">Electrical Improver</span>
              <span className="text-yellow-400 font-bold">Entry level (post-apprenticeship)</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/10">
              <span className="text-white font-medium">Electrician</span>
              <span className="text-yellow-400 font-bold">Qualified (Level 3 + AM2)</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/10">
              <span className="text-white font-medium">Approved Electrician</span>
              <span className="text-yellow-400 font-bold">Experienced + 2391</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/10">
              <span className="text-white font-medium">Technician</span>
              <span className="text-yellow-400 font-bold">Senior technical role</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/10">
              <span className="text-white font-medium">Senior Technician</span>
              <span className="text-yellow-400 font-bold">Highest technical grade</span>
            </div>
          </div>
        </div>
        <p>
          Each JIB grade has a nationally agreed minimum hourly rate that is reviewed annually. The
          JIB also sets overtime rates (typically time-and-a-half for the first four hours, double
          time thereafter), shift allowances, travel time and expenses, tool allowances, and holiday
          entitlement. These are minimum standards — employers can pay above JIB rates but cannot
          pay below them for JIB-graded work.
        </p>
        <p>
          The JIB grading system links directly to your{' '}
          <SEOInternalLink href="/guides/electrical-qualifications-pathway">
            electrical qualifications
          </SEOInternalLink>
          . Progressing from electrician to approved electrician requires the{' '}
          <SEOInternalLink href="/guides/city-guilds-2391">
            2391 inspection and testing qualification
          </SEOInternalLink>
          , and further progression to technician requires additional qualifications and experience.
        </p>
      </>
    ),
  },
  {
    id: 'collective-bargaining',
    heading: 'Collective Bargaining: How It Works',
    content: (
      <>
        <p>
          Collective bargaining is the process by which unions negotiate with employers on behalf of
          their members to agree pay rates, working conditions, and other terms of employment. For
          electricians, the most significant collective bargaining outcome is the JIB national
          agreement, but collective bargaining also takes place at company level and site level.
        </p>
        <p>
          At the national level, Unite negotiates the annual JIB pay review with the ECA. This
          determines the percentage increase applied to all JIB grades, affecting the pay of every
          electrician employed by a JIB-registered contractor. The negotiation considers inflation,
          industry profitability, recruitment and retention challenges, and comparisons with other
          skilled trades. Without collective bargaining, there would be no mechanism for
          industry-wide pay standards, and individual electricians would have to negotiate their own
          rates with each employer.
        </p>
        <p>
          At the company level, unions negotiate specific agreements with individual employers
          covering matters beyond the JIB minimum — such as enhanced sick pay, company pension
          contributions, bonus schemes, and flexible working arrangements. At the site level, shop
          stewards negotiate local agreements covering welfare facilities, parking, working hours,
          and health and safety arrangements specific to that project.
        </p>
        <p>
          The strength of collective bargaining comes from solidarity — a union is only as powerful
          as its membership. Higher membership density (the proportion of workers who are union
          members) gives the union a stronger negotiating position. This is why unions encourage all
          electricians to join, even those who feel they do not personally need the legal or advice
          services.
        </p>
      </>
    ),
  },
  {
    id: 'legal-support',
    heading: 'Legal Support and Representation',
    content: (
      <>
        <p>
          Legal support is consistently cited as the single most valuable benefit of union
          membership. The cost of private legal representation for employment disputes makes union
          membership an extraordinarily cost-effective form of legal insurance.
        </p>
        <div className="space-y-4 mt-6">
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Scale className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Employment Disputes</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Unfair dismissal, constructive dismissal, redundancy disputes, discrimination claims,
              and breach of contract cases are all covered by union legal services. The union
              provides free legal advice from the outset and, if the case has merit, funds full
              legal representation at the employment tribunal. A privately funded employment
              tribunal case typically costs GBP 5,000-20,000 in solicitor fees. Union members pay
              nothing beyond their regular subscription.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Personal Injury Claims</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Work-related injuries and occupational diseases are handled by the union's legal team
              on a no-deduction basis. Unlike private no-win-no-fee solicitors who deduct 25-40% of
              your compensation, union-funded personal injury claims pay out 100% of the
              compensation to the member. For electricians, common claims include falls from height,
              electric shock injuries, hand-arm vibration syndrome (HAVS), musculoskeletal injuries,
              and asbestos-related diseases from older installations.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <HardHat className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Health and Safety</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              If you face prosecution under health and safety legislation, the union can provide
              legal representation. If you are victimised for raising health and safety concerns
              (which is illegal under Section 44 of the Employment Rights Act 1996), the union will
              pursue the matter vigorously. Union safety representatives also have legal rights
              under the Safety Representatives and Safety Committees Regulations 1977 to inspect
              workplaces, investigate complaints, and consult with the employer on safety matters.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'training-and-development',
    heading: 'Training and Professional Development',
    content: (
      <>
        <p>
          Both Unite and GMB provide training and education opportunities for their members, ranging
          from union representative training to industry-specific courses and professional
          development support.
        </p>
        <p>
          Unite offers an education programme through its Unite Learning arm, which includes funded
          training courses, bursaries for members pursuing further education, and partnerships with
          training providers for discounted course fees. For electricians, this can include support
          towards the cost of{' '}
          <SEOInternalLink href="/guides/18th-edition-course">18th Edition courses</SEOInternalLink>
          ,{' '}
          <SEOInternalLink href="/guides/inspection-testing-course">
            2391 inspection and testing
          </SEOInternalLink>
          , and other qualifications needed for career progression through the JIB grading system.
        </p>
        <p>
          GMB similarly offers education and training support through its regional structure,
          including courses in health and safety, employment law, and professional skills. Both
          unions provide health and safety representative training, which is a valuable
          qualification in its own right — IOSH-accredited safety representative courses give
          electricians a broader understanding of site safety management.
        </p>
        <SEOAppBridge
          title="Track your CPD and career progression"
          description="Elec-Mate's CPD tracker records all your training, courses, and professional development activities. Build evidence for JIB grading assessments and demonstrate ongoing competence. Everything documented, nothing forgotten."
          icon={GraduationCap}
        />
        <p>
          Union membership and digital professional tools like Elec-Mate work together. The union
          secures your rights, pay, and legal protection. Elec-Mate provides the practical tools for
          daily work — certificates, calculations, study materials, and business management.
          Together they give you both the collective power and the individual capability to build a
          strong electrical career.
        </p>
      </>
    ),
  },
  {
    id: 'when-not-to-join',
    heading: 'When Is a Union Less Relevant?',
    content: (
      <>
        <p>
          Union membership is not universally necessary, and it is fair to acknowledge the
          situations where the benefits are less compelling. Understanding this helps you make an
          informed decision rather than being pressured in either direction.
        </p>
        <p>
          If you are a self-employed{' '}
          <SEOInternalLink href="/guides/electrician-self-employed">
            domestic electrician
          </SEOInternalLink>{' '}
          working entirely on your own in the residential market, the collective bargaining benefits
          of union membership are less relevant because there is no employer to bargain with.
          However, the legal support and advice services can still be valuable if a client dispute
          arises or if you are injured on site.
        </p>
        <p>
          If you run your own{' '}
          <SEOInternalLink href="/guides/starting-electrical-business">
            electrical business
          </SEOInternalLink>{' '}
          and employ other electricians, you are an employer, and union membership as an individual
          may feel awkward. In this case, ECA membership (the employers' association) is more
          appropriate, though there is nothing to prevent a working employer from also holding union
          membership.
        </p>
        <p>
          Ultimately, the decision to join a union is personal. The legal protection alone provides
          value that far exceeds the subscription cost, and most electricians who have ever needed
          to use the legal services are grateful they had union backing. The monthly cost is modest,
          and the peace of mind is genuine.
        </p>
        <SEOAppBridge
          title="Professional tools for every electrician"
          description="Whether you are employed, self-employed, or running a team, Elec-Mate provides the certificates, calculators, study tools, and business features you need. Union membership covers your rights — Elec-Mate covers your workflow."
          icon={Briefcase}
        />
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/electrician-salary-uk',
    title: 'Electrician Salary UK',
    description: 'JIB pay rates, regional variations, and how to maximise your earning potential.',
    icon: DollarSign,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-qualifications-pathway',
    title: 'Electrical Qualifications Pathway',
    description: 'From apprentice to senior technician — every qualification mapped out.',
    icon: GraduationCap,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-self-employed',
    title: 'Self-Employed Electrician Guide',
    description: 'Tax, insurance, and business management for self-employed electricians.',
    icon: Briefcase,
    category: 'Guide',
  },
  {
    href: '/guides/starting-electrical-business',
    title: 'Starting an Electrical Business',
    description: 'How to set up your own electrical contracting company in the UK.',
    icon: Building,
    category: 'Guide',
  },
  {
    href: '/guides/cpd-for-electricians',
    title: 'CPD for Electricians',
    description: 'Continuing professional development tracking and requirements.',
    icon: Award,
    category: 'Guide',
  },
  {
    href: '/guides/how-to-price-electrical-jobs',
    title: 'How to Price Electrical Jobs',
    description: 'Pricing strategies, labour rates, and material mark-ups for electrical work.',
    icon: FileCheck2,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalUnionMembershipPage() {
  return (
    <GuideTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Career Guide"
      badgeIcon={Users}
      heroTitle={
        <>
          Electrical Trade Unions: <span className="text-yellow-400">Unite, GMB & JIB Guide</span>
        </>
      }
      heroSubtitle="Everything UK electricians need to know about trade union membership. Unite and GMB compared, JIB agreements explained, collective bargaining, legal representation, training support, and how unions protect your pay, conditions, and career."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Track your career progression with Elec-Mate"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for CPD tracking, qualification management, and professional development. Build the evidence you need for JIB grading assessments. 7-day free trial, cancel anytime."
    />
  );
}
