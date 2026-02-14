import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Users,
  GraduationCap,
  PoundSterling,
  ShieldCheck,
  ClipboardCheck,
  Award,
  BookOpen,
  Clock,
  Briefcase,
  FileText,
  AlertTriangle,
  CalendarDays,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Apprentice', href: '/study-centre' },
  { label: 'Employer Guide', href: '/guides/electrical-apprenticeship-employer-guide' },
];

const tocItems = [
  { id: 'why-take-apprentice', label: 'Why Take on an Apprentice?' },
  { id: 'funding-and-levy', label: 'Funding and the Apprenticeship Levy' },
  { id: 'training-providers', label: 'Choosing a Training Provider' },
  { id: 'supervision-duties', label: 'Supervision Duties' },
  { id: 'on-the-job-training', label: 'On-the-Job Training' },
  { id: 'epa-preparation', label: 'End-Point Assessment (EPA) Preparation' },
  { id: 'employer-responsibilities', label: 'Employer Responsibilities' },
  { id: 'common-mistakes', label: 'Common Employer Mistakes' },
  { id: 'elec-mate-apprenticeships', label: 'Elec-Mate for Apprentice Training' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Taking on an electrical apprentice is an investment in your business -- a well-trained apprentice becomes a productive team member within 18 to 24 months and a fully qualified electrician within 3 to 4 years, at a fraction of the cost of hiring a qualified operative.',
  'Funding is available for apprenticeships through the Apprenticeship Levy (for employers with a pay bill over 3 million pounds) or government co-funding (for smaller employers, the government pays 95 percent of the training costs up to the funding band maximum).',
  'Choosing the right training provider is critical -- look for a provider with strong industry links, high pass rates, experienced tutors, and a curriculum that covers the full scope of BS 7671 and the Level 3 Electrotechnical qualification.',
  'Employers must provide meaningful on-the-job training with progressive responsibility, not just use the apprentice as a labourer. The apprentice must spend at least 20 percent of their working hours on off-the-job training.',
  'Elec-Mate includes a complete apprentice learning platform covering Level 2, Level 3, and AM2 preparation -- your apprentice can study on their phone, track progress, and prepare for assessments alongside their on-the-job training.',
];

const faqs = [
  {
    question: 'How much does it cost to hire an electrical apprentice?',
    answer:
      'The cost of hiring an electrical apprentice includes several components. The apprentice minimum wage (from April 2025) is 7.55 pounds per hour for apprentices aged 16 to 18 or in their first year, rising to the age-related National Minimum Wage rate from the second year onwards. For a first-year apprentice working 37.5 hours per week, this is approximately 14,700 pounds per year in wages. Employer National Insurance and pension contributions add approximately 15 to 20 percent. The training costs are funded through the Apprenticeship Levy (for levy-paying employers) or government co-funding (for non-levy payers, you pay 5 percent of the training cost and the government pays 95 percent). The training cost for a Level 3 Installation Electrician apprenticeship is typically funded at the maximum band of 15,000 to 21,000 pounds, so a non-levy employer contribution would be 750 to 1,050 pounds over the duration of the apprenticeship. Additional costs include PPE, tools, travel expenses, and the AM2 assessment fee (approximately 800 to 1,000 pounds). You may also be eligible for a 1,000 pound incentive payment for hiring an apprentice aged 16 to 18.',
  },
  {
    question: 'What qualifications does an electrical apprentice work towards?',
    answer:
      'An electrical apprenticeship in England follows the Installation Electrician / Maintenance Electrician apprenticeship standard (Level 3). The apprentice works towards several qualifications during the programme: EAL or City and Guilds Level 3 Diploma in Electrotechnical Services (the technical qualification covering electrical science, installation practices, and the Wiring Regulations), the C&G 2365 or equivalent knowledge qualification, the AM2 practical assessment (the industry-recognised practical skills assessment that must be passed to obtain JIB grading), and the End-Point Assessment (EPA) which includes a knowledge test, a practical assessment, and a professional discussion. On successful completion of the apprenticeship, the apprentice achieves Level 3 certification and is eligible for JIB grading as an Installation Electrician or Maintenance Electrician. They can then pursue further qualifications such as the C&G 2391 (Inspection and Testing) and the 18th Edition certificate.',
  },
  {
    question: 'What is the Apprenticeship Levy?',
    answer:
      'The Apprenticeship Levy is a tax on UK employers with an annual pay bill exceeding 3 million pounds. Levy-paying employers pay 0.5 percent of their total pay bill into their Apprenticeship Service account, and receive a 15,000 pound annual allowance to offset against the levy. The funds in the account can only be used to pay for apprenticeship training through approved training providers. Levy funds expire after 24 months if not used. For smaller employers (non-levy payers), the government co-invests: you pay 5 percent of the training cost and the government pays the remaining 95 percent. This means a 15,000 pound apprenticeship training programme costs a non-levy employer just 750 pounds (spread over the duration of the apprenticeship). Small employers with fewer than 50 employees who hire an apprentice aged 16 to 18 pay nothing towards the training costs -- the government funds 100 percent.',
  },
  {
    question: 'How much time must the apprentice spend in college?',
    answer:
      'The apprenticeship funding rules require that at least 20 percent of the apprentice paid working hours are spent on off-the-job training. This training can take several forms: day release at a college or training provider (typically one day per week), block release (attending college full-time for a week or two at regular intervals), or a combination of on-site training, e-learning, and college attendance that totals at least 20 percent of hours. The specific model depends on the training provider and the employer agreement. Day release is the most common model for electrical apprenticeships -- the apprentice works four days a week with the employer and attends college on the fifth day. During college attendance, the apprentice receives training in electrical science, regulations, installation practices, and health and safety. The remaining four days are on-the-job training with the employer, applying what they have learned in a real working environment.',
  },
  {
    question: 'What are my duties as an employer of an apprentice?',
    answer:
      'As an employer, your duties include: providing a genuine job with a productive purpose and opportunities to develop skills, paying at least the Apprenticeship Minimum Wage, allowing the apprentice to attend off-the-job training (at least 20 percent of their paid hours), providing on-the-job training and mentoring with progressive responsibility, providing appropriate supervision (the apprentice must be supervised by a qualified electrician at all times when working on electrical installations), providing a safe working environment and appropriate PPE, signing an apprenticeship agreement and commitment statement, supporting the apprentice through their End-Point Assessment, and treating the apprentice fairly in accordance with employment law (apprentices have the same employment rights as other employees). You also have a duty to provide work that is relevant to the apprenticeship standard -- an apprentice who spends most of their time carrying materials and making tea is not receiving the training they are entitled to.',
  },
  {
    question: 'What supervision does an apprentice need on site?',
    answer:
      'An electrical apprentice must be supervised by a qualified electrician at all times when working on electrical installations. The level of direct supervision depends on the apprentice competence and the nature of the work. In the early stages (first 6 to 12 months), the apprentice should be under direct supervision -- the qualified electrician should be present in the same area and actively overseeing the work. As the apprentice develops competence (typically from the second year onwards), the level of supervision can be gradually reduced to general supervision, where the electrician may be working in the same building but not standing over the apprentice at all times. However, the supervising electrician must always be available to check work, answer questions, and intervene if necessary. The apprentice should never be left to work entirely unsupervised on live electrical systems or notifiable work, regardless of their stage of training. Under BS 7671, the apprentice is classed as a "skilled person (electrically)" only after achieving full qualification.',
  },
  {
    question: 'What is the End-Point Assessment (EPA)?',
    answer:
      'The End-Point Assessment is the final assessment that the apprentice must pass to complete their apprenticeship. It is carried out by an independent End-Point Assessment Organisation (EPAO), not by the training provider or employer, to ensure impartiality. For the Installation Electrician apprenticeship, the EPA typically consists of three components: a knowledge test (multiple choice and short answer questions covering electrical science, regulations, health and safety, and installation practices), a practical assessment (a practical installation task carried out under controlled conditions, similar in format to the AM2), and a professional discussion with portfolio (a structured discussion with the assessor, supported by a portfolio of evidence from the apprentice on-the-job training, covering their experience, competence, and professional development). The EPA is graded Pass, Merit, or Distinction. The apprentice must pass all three components to achieve the apprenticeship. Preparation for the EPA should begin well before the gateway date -- Elec-Mate study centre modules cover all the knowledge areas assessed in the EPA.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/courses/level-2-electrical',
    title: 'Level 2 Electrical Course',
    description:
      'Study materials for the Level 2 Diploma in Electrical Installations covering all core units.',
    icon: BookOpen,
    category: 'Study',
  },
  {
    href: '/courses/level-3-electrical',
    title: 'Level 3 Electrical Course',
    description:
      'Comprehensive Level 3 study materials covering electrical science, regulations, and installation practice.',
    icon: BookOpen,
    category: 'Study',
  },
  {
    href: '/courses/am2-exam-preparation',
    title: 'AM2 Exam Preparation',
    description:
      'AM2 practical assessment preparation with simulated tasks, time management, and marking scheme guidance.',
    icon: Award,
    category: 'Study',
  },
  {
    href: '/guides/starting-electrical-business',
    title: 'Starting an Electrical Business',
    description:
      'Setting up and growing your electrical business, including taking on your first employee or apprentice.',
    icon: Briefcase,
    category: 'Business Guide',
  },
  {
    href: '/tools/staff-management-electrician',
    title: 'Staff Management',
    description:
      'Track qualifications, manage schedules, and monitor apprentice progress alongside your full team.',
    icon: Users,
    category: 'Business Tool',
  },
  {
    href: '/courses/18th-edition',
    title: '18th Edition Course',
    description:
      'BS 7671:2018+A2:2022 study materials -- the regulations your apprentice needs to know.',
    icon: GraduationCap,
    category: 'Study',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'why-take-apprentice',
    heading: 'Why Take on an Electrical Apprentice?',
    content: (
      <>
        <p>
          The UK electrical industry has a well-documented skills shortage. Experienced electricians
          are retiring faster than new entrants are qualifying, and the demand for electrical work
          continues to grow -- driven by EV charging, renewable energy, smart home technology, and
          the ongoing need for maintenance and inspection of the existing building stock. Taking on
          an apprentice is not charity -- it is a business strategy.
        </p>
        <p>
          <strong className="text-yellow-400">The financial case is compelling.</strong> A
          first-year apprentice costs approximately 15,000 to 18,000 pounds per year in wages and
          on-costs, with the government funding up to 95 percent of the training costs for non-levy
          employers. By the second year, the apprentice is making a productive contribution -- first
          fixing, cable pulling, glanding, and assisting with testing. By the third year, they are
          completing significant tasks with reducing supervision. By qualification, you have a fully
          trained electrician who knows your standards, your clients, and your way of working -- at
          a fraction of the cost of recruiting a qualified electrician externally.
        </p>
        <p>
          Beyond the financial case, apprentices bring energy, enthusiasm, and digital fluency to
          your business. They are comfortable with technology (apps, digital certificates, cloud
          tools), they are eager to learn, and they often bring fresh perspectives on how to work
          more efficiently. Many of the most successful electrical contractors in the UK built their
          businesses by training their own staff through apprenticeships.
        </p>
        <p>
          This guide covers everything an employer needs to know about taking on an electrical
          apprentice: funding, training providers, supervision requirements, EPA preparation, and
          how{' '}
          <SEOInternalLink href="/courses/level-2-electrical">
            Elec-Mate study centre
          </SEOInternalLink>{' '}
          supports apprentice learning alongside on-the-job training.
        </p>
      </>
    ),
  },
  {
    id: 'funding-and-levy',
    heading: 'Funding and the Apprenticeship Levy',
    content: (
      <>
        <p>
          Understanding the funding system is essential before committing to an apprenticeship. The
          good news for most small electrical contractors is that the government funds the vast
          majority of the training costs.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Apprenticeship Levy payers</strong> -- employers with an annual pay bill
                over 3 million pounds pay 0.5 percent of their total pay bill into an Apprenticeship
                Service account. These funds can only be used to pay for apprenticeship training
                through approved providers. Levy funds expire after 24 months if not used. Levy
                payers can also transfer up to 25 percent of their levy funds to other employers in
                their supply chain.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Non-levy payers (most electrical contractors)</strong> -- the government
                co-invests 95 percent of the training costs up to the funding band maximum. For a
                Level 3 Installation Electrician apprenticeship funded at 15,000 pounds, the
                employer contribution is just 750 pounds over the entire duration of the
                apprenticeship. This is paid directly to the training provider.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small employer exemption</strong> -- employers with fewer than 50 employees
                who hire an apprentice aged 16 to 18 pay nothing towards the training costs. The
                government funds 100 percent.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Incentive payments</strong> -- employers may be eligible for a 1,000 pound
                incentive payment for hiring an apprentice aged 16 to 18. Additional incentives may
                be available depending on government programmes at the time of hiring.
              </span>
            </li>
          </ul>
        </div>
        <p>
          To access funding, you must register on the Apprenticeship Service (an online government
          portal), select a training provider, and agree a training plan and costs. The training
          provider will guide you through the process. For most small electrical contractors, the
          employer contribution to training costs is minimal -- the significant costs are the
          apprentice wages, PPE, tools, and the time invested in supervision and on-the-job
          training.
        </p>
      </>
    ),
  },
  {
    id: 'training-providers',
    heading: 'Choosing a Training Provider',
    content: (
      <>
        <p>
          The training provider delivers the off-the-job training and prepares the apprentice for
          their qualifications and EPA. Choosing the right provider is one of the most important
          decisions you will make -- a poor provider can set the apprentice back and waste your
          investment.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ofsted rating</strong> -- check the provider Ofsted inspection report. Look
                for Good or Outstanding ratings. A Requires Improvement or Inadequate rating is a
                red flag.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pass rates and achievement rates</strong> -- ask the provider for their pass
                rates on the Level 3 Electrotechnical qualification and the AM2 assessment. Compare
                against the national average. Providers with significantly below-average pass rates
                should be questioned.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Facilities and equipment</strong> -- visit the provider and inspect their
                workshops. They should have modern, well-maintained electrical installation
                workshops that reflect real working environments. Workshops with outdated equipment
                or insufficient space limit practical learning.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tutor experience</strong> -- the best tutors have significant industry
                experience in addition to their teaching qualifications. Ask about the tutors
                backgrounds -- have they worked as electricians? Are they up to date with current
                standards and practices?
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Employer engagement</strong> -- good providers maintain regular contact with
                employers, provide progress reports, and involve employers in the training plan.
                They should assign a dedicated employer liaison or skills coach who visits the
                workplace regularly.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Ask other electrical contractors in your area which providers they use and whether they
          are satisfied with the training. Word of mouth is often the most reliable indicator of
          provider quality. If possible, speak to current or recent apprentices about their
          experience with the provider.
        </p>
      </>
    ),
  },
  {
    id: 'supervision-duties',
    heading: 'Supervision Duties',
    content: (
      <>
        <p>
          Supervision is not just a legal requirement -- it is the mechanism through which the
          apprentice learns their trade. The quality of supervision directly determines the quality
          of the electrician that emerges from the apprenticeship.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Year 1: Direct supervision</strong> -- the apprentice should work alongside
                a qualified electrician at all times. Every task is an opportunity to teach: explain
                what you are doing, why you are doing it, and what the relevant regulation says. Let
                the apprentice carry out tasks under your direct observation, correcting technique
                as needed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Year 2: Guided practice</strong> -- the apprentice begins to carry out tasks
                with reducing supervision. You assign specific tasks (first fix a room, pull cables
                on a defined route, connect accessories), check the work, and provide feedback. You
                are still on site and available, but the apprentice is developing independence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Year 3: General supervision</strong> -- the apprentice carries out most
                tasks independently with periodic checking. You assign work, review completed tasks,
                and discuss any issues. The apprentice is building confidence and judgement.
                However, they must still be supervised on safety-critical tasks, testing, and any
                work they have not done before.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Year 4 and EPA preparation</strong> -- the apprentice is working at near
                qualified level with oversight. Focus shifts to preparing for the AM2 assessment and
                EPA, practising under timed conditions, and building the portfolio of evidence for
                the professional discussion.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The key principle is progressive responsibility. The apprentice should be stretched but
          not overwhelmed, given increasing independence as they demonstrate competence, and always
          supported when they encounter something new. Supervision is not the same as watching -- it
          is active teaching, coaching, and mentoring.
        </p>
      </>
    ),
  },
  {
    id: 'on-the-job-training',
    heading: 'On-the-Job Training',
    content: (
      <>
        <p>
          On-the-job training is where the apprentice applies their college learning in a real
          working environment. As an employer, you are responsible for ensuring the apprentice gets
          exposure to a range of electrical work that aligns with the apprenticeship standard.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Domestic installations</strong> -- rewires, extensions, consumer unit
                upgrades, additional circuits, socket and lighting installations. The bread and
                butter of most electrical businesses and essential training for any apprentice.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial work</strong> -- if your business does commercial work, expose
                the apprentice to trunking and conduit systems, three-phase installations,
                distribution board work, and commercial lighting. This broadens their skill set.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing and inspection</strong> -- from the second year onwards, involve the
                apprentice in testing. Show them how to use the multifunction tester, explain what
                each test measures and why, and let them take readings under your supervision. This
                prepares them for the C&G 2391 qualification after they qualify.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fault finding</strong> -- when faults arise on your jobs, use them as
                teaching opportunities. Walk the apprentice through your diagnostic process: what
                symptoms suggest, how to narrow down the location, what tests to carry out, and how
                to verify the repair.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Documentation and administration</strong> -- teach the apprentice how to
                complete certificates, write method statements, fill in permits to work, and
                maintain job records. These administrative skills are part of the apprenticeship
                standard and are essential for professional practice.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Keep a log of the work the apprentice has been exposed to and the skills they have
          developed. This forms part of the evidence portfolio for the EPA and helps the training
          provider tailor the off-the-job training to complement what the apprentice is learning on
          site.
        </p>
        <SEOAppBridge
          title="Apprentice Learning Platform"
          description="Elec-Mate Study Centre covers Level 2, Level 3, and AM2 preparation. Your apprentice studies on their phone alongside on-the-job training. Track progress through every module and identify areas that need more attention."
          icon={GraduationCap}
        />
      </>
    ),
  },
  {
    id: 'epa-preparation',
    heading: 'End-Point Assessment (EPA) Preparation',
    content: (
      <>
        <p>
          The End-Point Assessment is the final hurdle of the apprenticeship. It is carried out by
          an independent End-Point Assessment Organisation (EPAO) and consists of three components:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Knowledge test</strong> -- a written or online test covering electrical
                science, BS 7671, health and safety, and installation practices. The apprentice must
                demonstrate that they have the theoretical knowledge underpinning their practical
                skills. Elec-Mate study modules cover all the knowledge areas assessed in the EPA
                knowledge test.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Practical assessment</strong> -- a practical installation task carried out
                under controlled conditions. The apprentice must demonstrate competence in
                installation, wiring, termination, and testing within a set time. This is similar in
                format to the{' '}
                <SEOInternalLink href="/courses/am2-exam-preparation">
                  AM2 assessment
                </SEOInternalLink>{' '}
                and tests the same core practical skills.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Professional discussion with portfolio</strong> -- a structured conversation
                between the apprentice and the assessor, supported by a portfolio of evidence from
                the apprentice workplace experience. The apprentice discusses their learning
                journey, the work they have carried out, how they have applied their training, and
                their professional development. The portfolio should include evidence of the range
                of work they have completed, photographs, certificates, and reflections.
              </span>
            </li>
          </ul>
        </div>
        <p>
          <strong className="text-yellow-400">
            Preparation should start well before the gateway date.
          </strong>{' '}
          The gateway is the point at which the employer and training provider agree that the
          apprentice is ready for the EPA. This should be a genuine readiness decision, not a
          calendar-driven deadline. If the apprentice is not ready, delay the gateway until they are
          -- a failed EPA is demoralising and costly.
        </p>
        <p>
          As the employer, your role in EPA preparation is to ensure the apprentice has had
          sufficient breadth of experience, to help them build their evidence portfolio, and to
          support them in practising the practical tasks and preparing for the professional
          discussion. Mock assessments are invaluable -- set up practical tasks that mirror the EPA
          format and time them.
        </p>
      </>
    ),
  },
  {
    id: 'employer-responsibilities',
    heading: 'Employer Responsibilities',
    content: (
      <>
        <p>
          Taking on an apprentice brings legal and contractual obligations that go beyond normal
          employment. Here is a summary of your key responsibilities:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Apprenticeship agreement</strong> -- sign an apprenticeship agreement with
                the apprentice (a legal document under the Apprenticeships, Skills, Children and
                Learning Act 2009) and a commitment statement with the training provider, setting
                out each party responsibilities.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pay at least the minimum wage</strong> -- the Apprenticeship Minimum Wage
                rate for the first year, then the age-related NMW rate from the second year. Many
                employers pay above the minimum to attract better candidates and improve retention.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>20 percent off-the-job training</strong> -- allow at least 20 percent of the
                apprentice paid working hours for off-the-job training (college, e-learning,
                workshops). This is a funding condition -- failure to provide it can result in loss
                of funding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Safe working environment</strong> -- provide appropriate PPE, ensure the
                apprentice is inducted in health and safety procedures, and maintain a safe
                workplace. The apprentice is entitled to the same health and safety protections as
                any other employee.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Employment rights</strong> -- apprentices have the same employment rights as
                other employees: holiday entitlement, sick pay, protection from discrimination, and
                protection from unfair dismissal. An apprentice contract has additional protections
                -- you cannot dismiss an apprentice during the term of the apprenticeship except for
                gross misconduct or genuine redundancy, and even then the process must be carefully
                managed.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Treat the apprentice as an investment, not an expense. The time and effort you put into
          their training will be repaid many times over when they qualify and become a productive,
          loyal member of your team.
        </p>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Employer Mistakes',
    content: (
      <>
        <p>
          Many electrical contractors take on apprentices with the best intentions but make
          avoidable mistakes that undermine the training and create problems for both parties:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Using the apprentice as cheap labour</strong> -- an apprentice who spends
                most of their time carrying materials, sweeping up, and making tea is not being
                trained. They will fall behind in their qualifications, become demotivated, and may
                leave. Provide meaningful electrical work from day one.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not allowing college attendance</strong> -- preventing the apprentice from
                attending college or e-learning sessions because "they are needed on the job" is a
                breach of the apprenticeship agreement and the funding conditions. Plan your
                schedule around the apprentice college days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inadequate supervision</strong> -- leaving the apprentice unsupervised on
                site, particularly in the first two years, is both dangerous and a training failure.
                An unsupervised apprentice working on electrical installations can cause injuries,
                damage, and create liabilities for the employer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No progression plan</strong> -- keeping the apprentice on the same basic
                tasks without increasing responsibility. The apprentice should be given
                progressively more complex and independent work as they develop competence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Poor communication with the training provider</strong> -- not engaging with
                the training provider, not attending progress reviews, and not responding to
                concerns raised by the college. Successful apprenticeships require a three-way
                partnership between the employer, the apprentice, and the training provider.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The best employers approach the apprenticeship as a structured training programme, not
          just an employment arrangement. They plan the training, review progress regularly,
          communicate with the training provider, and invest time in mentoring the apprentice. The
          result is a well-trained electrician who is loyal, productive, and a credit to the
          business.
        </p>
      </>
    ),
  },
  {
    id: 'elec-mate-apprenticeships',
    heading: 'Elec-Mate for Apprentice Training',
    content: (
      <>
        <p>
          Elec-Mate includes a comprehensive learning platform designed specifically for electrical
          apprentices, covering every stage of the apprenticeship from Level 2 through to AM2 and
          EPA preparation:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <BookOpen className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Level 2 and Level 3 Study Modules</h4>
                <p className="text-white text-sm leading-relaxed">
                  Structured study modules covering every unit of the Level 2 and Level 3
                  Electrotechnical qualifications. Electrical science, regulations, installation
                  practices, health and safety, and more. Study on the phone during lunch breaks, on
                  the commute, or at home.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Award className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AM2 Preparation</h4>
                <p className="text-white text-sm leading-relaxed">
                  <SEOInternalLink href="/courses/am2-exam-preparation">
                    AM2 preparation modules
                  </SEOInternalLink>{' '}
                  with simulated tasks, time management guidance, marking scheme breakdowns, and
                  practice exercises. Prepare for the practical assessment with confidence.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Employer Progress Tracking</h4>
                <p className="text-white text-sm leading-relaxed">
                  As the employer, see your apprentice progress through the study modules. Identify
                  areas where they are strong and areas that need more on-the-job practice. Align
                  your on-site training with their college curriculum.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          Elec-Mate bridges the gap between college learning and on-the-job training. Your
          apprentice can study the theory on the app and then apply it on your jobs, reinforcing
          both. The platform tracks their progress and highlights areas that need attention, helping
          you provide targeted on-site training that complements their off-the-job learning.
        </p>
        <SEOAppBridge
          title="Train Your Apprentice with Elec-Mate"
          description="Level 2, Level 3, AM2 preparation, and EPA readiness. Your apprentice studies on their phone alongside on-the-job training. Track progress and identify areas that need more practice. 7-day free trial."
          icon={Users}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalApprenticeshipEmployerPage() {
  return (
    <GuideTemplate
      title="Electrical Apprenticeship Employer Guide | Hiring & Training"
      description="Complete employer guide to electrical apprenticeships. Funding, levy, training providers, supervision duties, EPA preparation, employer responsibilities, and how Elec-Mate supports apprentice training."
      datePublished="2026-01-28"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Employer Guide"
      badgeIcon={Users}
      heroTitle={
        <>
          Electrical Apprenticeship Employer Guide:{' '}
          <span className="text-yellow-400">Hiring and Training</span>
        </>
      }
      heroSubtitle="Taking on an electrical apprentice is one of the best investments you can make in your business. This guide covers everything an employer needs to know: funding, the Apprenticeship Levy, training providers, supervision duties, EPA preparation, and how Elec-Mate supports apprentice learning."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Apprenticeships for Employers"
      relatedPages={relatedPages}
      ctaHeading="Support Your Apprentice with Elec-Mate"
      ctaSubheading="Level 2, Level 3, AM2 preparation, and professional tools. Your apprentice learns on the same platform they will use throughout their career. 7-day free trial, cancel anytime."
    />
  );
}
