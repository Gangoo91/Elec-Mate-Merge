import { ArrowLeft, ShieldAlert, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'pf-5-2-check1',
    question:
      'A self-employed electrician causes water damage to a customer&rsquo;s kitchen while installing a new consumer unit. Which type of insurance covers this?',
    options: [
      'Income protection insurance',
      'Public liability insurance',
      'Life insurance',
      'Van insurance',
    ],
    correctIndex: 1,
    explanation:
      'Public liability insurance covers claims from third parties (customers, members of the public) for injury or property damage caused by your work. Water damage to a customer&rsquo;s kitchen while you are working is a classic public liability claim. Without this cover, you would have to pay the repair costs and any legal fees out of your own pocket.',
  },
  {
    id: 'pf-5-2-check2',
    question:
      'You design and certify a commercial lighting installation. Six months later, the client claims your design was faulty and caused a fire. Which insurance policy would respond to this claim?',
    options: [
      'Public liability insurance',
      'Professional indemnity insurance',
      'Tools and equipment insurance',
      'Critical illness cover',
    ],
    correctIndex: 1,
    explanation:
      'Professional indemnity insurance covers claims arising from your professional advice, design work, and certification. If a client claims that your design was negligent or your certification was incorrect, professional indemnity responds. Public liability covers physical damage during the work itself; professional indemnity covers alleged errors in your professional judgment and documentation.',
  },
  {
    id: 'pf-5-2-check3',
    question:
      'A self-employed electrician breaks their wrist and cannot work for 3 months. They have no emergency fund. Which type of insurance would replace part of their lost income?',
    options: [
      'Public liability insurance',
      'Professional indemnity insurance',
      'Income protection insurance',
      'Tools and equipment insurance',
    ],
    correctIndex: 2,
    explanation:
      'Income protection insurance pays a regular monthly benefit (typically 50&ndash;70% of your normal income) if you are unable to work due to illness or injury. For a self-employed electrician with no employer sick pay, this is the insurance that keeps money coming in while you recover. It is one of the most important policies a self-employed tradesperson can hold.',
  },
];

const faqs = [
  {
    question: 'Is public liability insurance a legal requirement for electricians?',
    answer:
      'Public liability insurance is not technically a legal requirement in the UK. However, it is practically essential. Most customers, main contractors, and commercial clients will not hire you without proof of public liability cover. Membership of many trade bodies and competent person schemes also requires it. The cost is relatively low (typically &pound;50&ndash;&pound;150 per year for a sole trader), and the financial consequences of not having it can be catastrophic &mdash; a single claim for injury or property damage could cost tens of thousands of pounds.',
  },
  {
    question: 'What level of public liability cover do I need?',
    answer:
      'Most electricians choose between &pound;1 million and &pound;5 million of public liability cover. For domestic work, &pound;1 million is usually sufficient. For commercial work, main contractors typically require &pound;2 million or &pound;5 million minimum. Some large commercial and industrial clients require &pound;10 million. Check what your main clients and contracts require before choosing your level of cover. The price difference between &pound;1 million and &pound;5 million is usually modest &mdash; often only &pound;30&ndash;&pound;50 per year more.',
  },
  {
    question: 'I am employed &mdash; do I still need income protection?',
    answer:
      'It depends on your employer&rsquo;s sick pay policy. If you only receive Statutory Sick Pay (&pound;116.75 per week in 2024/25), that is unlikely to cover your essential outgoings. Income protection can top up your income during a long-term absence. If your employer offers a generous occupational sick pay scheme (for example, 6 months full pay followed by 6 months half pay), income protection is less urgent but still worth considering for very long-term illness. Self-employed electricians, however, should treat income protection as a high priority &mdash; you have zero sick pay.',
  },
  {
    question: 'Can I insure my tools and equipment under my home contents insurance?',
    answer:
      'Standard home contents insurance typically does not cover tools used for business purposes, and it rarely covers tools stored in a van. You need a specialist tools and equipment policy or a van insurance policy with tools-in-transit cover. Make a detailed inventory of all your tools with serial numbers, photographs, and purchase receipts. This makes claiming much faster and reduces disputes with the insurer. Keep the inventory updated whenever you buy or replace tools. Some specialist providers include Rhino Trade Insurance, Tradesman Saver, and Policy Expert.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does public liability insurance cover?',
    options: [
      'Your own injuries while working',
      'Claims from third parties for injury or property damage caused by your work',
      'Damage to your own tools and equipment',
      'Your tax bill if you cannot pay',
    ],
    correctAnswer: 1,
    explanation:
      'Public liability insurance covers claims made against you by third parties &mdash; customers, members of the public, or other workers &mdash; for injury or property damage that you or your work has caused. It does not cover your own injuries (that is income protection or personal accident cover) or your own equipment (that is tools cover).',
  },
  {
    id: 2,
    question:
      'Which type of insurance is most important if you design and certify electrical installations?',
    options: [
      'Tools and equipment insurance',
      'Van insurance',
      'Professional indemnity insurance',
      'Travel insurance',
    ],
    correctAnswer: 2,
    explanation:
      'Professional indemnity insurance covers claims arising from your professional advice, design work, and certification. If a client alleges that your design was negligent, your calculations were wrong, or your certification was incorrect, professional indemnity insurance pays the legal costs and any compensation. This is essential for anyone doing design, specification, or certification work.',
  },
  {
    id: 3,
    question:
      'What is a typical annual cost for public liability insurance for a sole-trader electrician?',
    options: [
      '&pound;500&ndash;&pound;1,000 per year',
      '&pound;50&ndash;&pound;150 per year',
      '&pound;1,000&ndash;&pound;2,000 per year',
      '&pound;10&ndash;&pound;20 per year',
    ],
    correctAnswer: 1,
    explanation:
      'Public liability insurance for a sole-trader electrician typically costs between &pound;50 and &pound;150 per year, depending on the level of cover, your turnover, and the insurer. This makes it one of the most affordable and essential business expenses. The potential cost of a single uninsured claim would dwarf decades of premium payments.',
  },
  {
    id: 4,
    question: 'Why is income protection particularly important for self-employed electricians?',
    options: [
      'Because it covers the cost of replacing stolen tools',
      'Because self-employed electricians have no employer sick pay, so their income drops to zero if they cannot work',
      'Because it pays your mortgage directly',
      'Because HMRC requires all self-employed workers to hold it',
    ],
    correctAnswer: 1,
    explanation:
      'Self-employed electricians have no employer-provided sick pay. If you are ill or injured and cannot work, your income stops immediately. Income protection insurance replaces 50&ndash;70% of your normal income during a period of incapacity, keeping you afloat while you recover. It is not a legal requirement, but it is one of the most important financial protections a self-employed tradesperson can have.',
  },
  {
    id: 5,
    question:
      'What is the purpose of a deferred period (waiting period) on an income protection policy?',
    options: [
      'It is the period after the policy ends when you can still claim',
      'It is the number of days you must be unable to work before the policy starts paying out',
      'It is the maximum number of months the policy will pay for',
      'It is the notice period you must give before cancelling',
    ],
    correctAnswer: 1,
    explanation:
      'The deferred period (also called the waiting period) is the number of days you must be continuously unable to work before income protection benefits begin. Common options are 4 weeks, 8 weeks, 13 weeks, or 26 weeks. A longer deferred period means lower premiums but a longer gap before you receive any money. Your emergency fund bridges this gap &mdash; which is why income protection and an emergency fund work together.',
  },
  {
    id: 6,
    question:
      'Why should you keep a detailed inventory of your tools with serial numbers and photographs?',
    options: [
      'Because HMRC requires it for tax purposes',
      'Because it makes insurance claims faster and reduces disputes with the insurer',
      'Because it increases the resale value of your tools',
      'Because your employer needs it for auditing',
    ],
    correctAnswer: 1,
    explanation:
      'A detailed tool inventory with serial numbers, photographs, and purchase receipts makes the insurance claims process much faster and smoother. Without proof of ownership and value, the insurer may dispute the claim or reduce the payout. Update the inventory whenever you buy or replace tools. Store a copy digitally (cloud storage or email to yourself) so it is not lost if your tools are stolen.',
  },
  {
    id: 7,
    question: 'What does van insurance with &ldquo;tools-in-van&rdquo; cover protect?',
    options: [
      'It covers damage to the van only',
      'It covers your tools and equipment if they are stolen from or damaged in your van',
      'It covers the cost of hiring a replacement van',
      'It covers speeding fines and parking tickets',
    ],
    correctAnswer: 1,
    explanation:
      'Tools-in-van cover is an add-on to your van insurance that protects your tools and equipment if they are stolen from or damaged in your van. Standard van insurance only covers the vehicle itself. Given that an electrician&rsquo;s toolkit can be worth &pound;5,000&ndash;&pound;15,000 or more, tools-in-van cover is essential. Note that insurers often require the van to be locked and may require additional security measures (lockbox, deadlocks, alarm) for higher-value claims.',
  },
  {
    id: 8,
    question: 'Which of the following is true about life insurance for tradespeople?',
    options: [
      'Life insurance is only for people over 60',
      'Life insurance is a legal requirement for all self-employed workers',
      'Life insurance is most important if you have a mortgage, dependants, or financial obligations that would fall on your family if you died',
      'Life insurance pays out if you break your arm',
    ],
    correctAnswer: 2,
    explanation:
      'Life insurance pays a lump sum to your beneficiaries if you die during the policy term. It is most important if other people depend on your income &mdash; a partner, children &mdash; or if you have financial obligations like a mortgage that would need to be paid off. It does not pay out for illness or injury (that is income protection or critical illness cover). It is not a legal requirement, but it is a responsible financial decision if others rely on you.',
  },
];

export default function PFModule5Section2() {
  useSEO({
    title: 'Insurance for Tradespeople | Personal Finance Module 5.2',
    description:
      'Public liability, professional indemnity, tools cover, van insurance, income protection, and life insurance for UK electricians.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pf-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <ShieldAlert className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Insurance for Tradespeople
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            The essential insurance policies every electrician should understand &mdash; from public
            liability to income protection
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Public liability:</strong> Covers third-party injury/damage &mdash;
                practically essential
              </li>
              <li>
                <strong>Professional indemnity:</strong> Covers design &amp; certification claims
              </li>
              <li>
                <strong>Income protection:</strong> Replaces income if you cannot work
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>One claim:</strong> Can cost tens of thousands without insurance
              </li>
              <li>
                <strong>Tools theft:</strong> Average toolkit worth &pound;5,000&ndash;&pound;15,000
              </li>
              <li>
                <strong>No sick pay?</strong> Income protection keeps money coming in
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain what public liability insurance covers and why it is practically essential for all electricians',
              'Distinguish between public liability and professional indemnity insurance and identify when each applies',
              'Describe the options for insuring tools and equipment, including specialist providers and van cover',
              'Explain the importance of business-use classification on van insurance policies',
              'Describe how income protection insurance works, including deferred periods and benefit levels',
              'Identify when life insurance and critical illness cover are most important for tradespeople',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Public Liability Insurance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            Public Liability Insurance
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Public liability insurance is the most fundamental insurance policy for any
                tradesperson. It covers claims made against you by <strong>third parties</strong>{' '}
                &mdash; customers, members of the public, other workers on site &mdash; for injury
                or property damage caused by you or your work.
              </p>
              <p>
                Although it is not a strict legal requirement in the UK, public liability insurance
                is practically essential. Most customers will ask for proof of cover before hiring
                you. Most main contractors require it before allowing you on site. Membership of
                trade bodies and competent person schemes (NICEIC, NAPIT, ELECSA) typically requires
                it. Without it, a single claim could bankrupt you.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">What Public Liability Covers</p>
                <div className="space-y-2">
                  {[
                    'Injury to a customer, visitor, or member of the public caused by your work or your presence on site',
                    'Damage to a customer&rsquo;s property caused by your work &mdash; for example, water damage from drilling through a pipe',
                    'Damage to third-party property &mdash; for example, accidentally damaging a neighbouring property',
                    'Legal costs and compensation if someone sues you for injury or damage',
                    'Accidental damage during installation, testing, or commissioning',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-white">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg text-center">
                  <p className="text-sm font-medium text-rose-400 mb-1">&pound;1 Million</p>
                  <p className="text-white text-sm">
                    Minimum level. Suitable for small domestic jobs only. Many clients now require
                    higher cover.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg text-center">
                  <p className="text-sm font-medium text-rose-400 mb-1">
                    &pound;2&ndash;&pound;5 Million
                  </p>
                  <p className="text-white text-sm">
                    Standard for most electricians. Required by most main contractors and commercial
                    clients. The most common level held.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg text-center">
                  <p className="text-sm font-medium text-rose-400 mb-1">&pound;10 Million</p>
                  <p className="text-white text-sm">
                    Required by some large commercial and industrial clients. Higher premium but
                    opens doors to bigger contracts.
                  </p>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Cost Perspective</p>
                <p className="text-white text-sm">
                  A sole-trader electrician typically pays{' '}
                  <strong>&pound;50&ndash;&pound;150 per year</strong> for &pound;1&ndash;&pound;5
                  million of public liability cover. That is roughly &pound;1&ndash;&pound;3 per
                  week. A single uninsured claim for water damage to a customer&rsquo;s kitchen
                  could easily cost &pound;10,000&ndash;&pound;30,000 including repair costs and
                  legal fees. The insurance pays for itself many times over in a single claim.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Professional Indemnity Insurance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            Professional Indemnity Insurance
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Professional indemnity insurance covers claims arising from your{' '}
                <strong>professional advice, design work, and certification</strong>. While public
                liability covers physical damage caused during the work, professional indemnity
                covers alleged errors in your professional judgment, calculations, or documentation.
              </p>
              <p>
                As an electrician, professional indemnity becomes important when you are doing more
                than just installation work. If you design electrical installations, specify
                equipment, carry out condition reports, issue Electrical Installation Certificates
                (EICs), or provide written advice that clients rely on, you need professional
                indemnity cover.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  When You Need Professional Indemnity
                </p>
                <div className="space-y-2">
                  {[
                    'You design electrical installations and produce circuit schematics or layouts',
                    'You specify equipment, cable sizes, or protection devices for clients',
                    'You issue Electrical Installation Certificates (EICs) or Electrical Installation Condition Reports (EICRs)',
                    'You provide written reports or recommendations that clients use to make decisions',
                    'You act as the designer under CDM Regulations for electrical elements',
                    'You provide energy assessments, Part P certificates, or building regulations compliance documentation',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-white">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Real-World Example</p>
                <p className="text-white text-sm">
                  You design and certify a commercial lighting installation. Six months later, the
                  client discovers that the emergency lighting does not meet the required lux levels
                  and they fail a fire safety inspection. They claim your design was negligent and
                  seek compensation for the cost of remedial work plus the fine from the fire
                  authority. Professional indemnity insurance covers your legal defence and any
                  compensation awarded. Without it, you pay everything out of your own pocket.
                </p>
              </div>

              <p>
                Professional indemnity policies are typically &ldquo;claims made&rdquo; policies,
                meaning they cover claims made during the policy period, regardless of when the work
                was done. This is important &mdash; if you let the policy lapse, you lose cover for
                all past work. Most policies offer &ldquo;run-off cover&rdquo; if you retire or
                cease trading, which extends the cover period.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Tools & Equipment Insurance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            Tools &amp; Equipment Insurance
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Your tools are your means of production. Without them, you cannot work, and without
                work, you have no income. A typical electrician&rsquo;s toolkit &mdash; including
                test instruments, power tools, hand tools, and consumables &mdash; can easily be
                worth <strong>&pound;5,000 to &pound;15,000</strong> or more. Specialist test
                equipment alone (multifunction tester, insulation resistance tester, earth loop
                impedance tester) can represent several thousand pounds.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Key Points About Tools Insurance
                </p>
                <div className="space-y-2">
                  {[
                    'Standard home contents insurance typically does NOT cover tools used for business',
                    'Standard van insurance covers the vehicle but NOT the tools inside it',
                    'You need either a specialist tools policy or tools-in-van cover as an add-on',
                    'Specialist providers include Rhino Trade Insurance, Tradesman Saver, and Policy Expert',
                    'Policies cover theft, accidental damage, and sometimes loss',
                    'Insurers may require proof of security measures (van deadlocks, lockbox, alarm system)',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-white">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Create Your Tool Inventory Now
                </p>
                <p className="text-white text-sm">
                  The single most important thing you can do right now is create a detailed
                  inventory of all your tools and equipment. For each item, record: (1) description
                  and brand, (2) model number, (3) serial number, (4) date of purchase, (5) purchase
                  price or replacement cost, (6) photograph. Store this digitally &mdash; email it
                  to yourself, save it to cloud storage, or keep it in a notes app. If your tools
                  are stolen, this inventory transforms a difficult, disputed insurance claim into a
                  straightforward, fast payout.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Van Security Requirements</p>
                <p className="text-white text-sm">
                  Many insurers require specific security measures before they will cover tools in a
                  van. Common requirements include: deadlocks on all doors, a separate lockable
                  toolbox or vault inside the van, an alarm system, the van being parked in a locked
                  garage or on a driveway (not on the street) overnight, and all tools removed from
                  the van if it is left unattended for extended periods. Check your policy wording
                  carefully &mdash; failing to meet security requirements can void your cover
                  entirely.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Van Insurance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            Van Insurance
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Your van is your mobile workshop and your means of getting to site. Van insurance
                for tradespeople has some important differences from standard car insurance that you
                need to understand.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Business Use Classification</p>
                <p className="text-white text-sm mb-3">
                  When insuring your van, you must declare the correct class of use. Using a van for
                  business without the correct classification invalidates your insurance entirely
                  &mdash; meaning you are effectively driving uninsured.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong>Social, domestic &amp; pleasure only:</strong> NOT suitable for trade
                      work. This is personal use only.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong>Social, domestic, pleasure &amp; commuting:</strong> Only covers
                      travel to a single, fixed place of work. NOT suitable for electricians who
                      visit different sites.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Business use (Class 1):</strong> Covers travel to different sites for
                      your work. This is the minimum you need as an electrician visiting customer
                      premises.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Business use (Class 2/3):</strong> Required if employees or named
                      drivers also use the van for business. Check with your insurer.
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Additional Van Cover Options</p>
                <div className="space-y-2">
                  {[
                    'Tools-in-van cover: protects your tools and equipment while stored in or stolen from the van',
                    'Hire vehicle cover: pays for a replacement van while yours is being repaired',
                    'Breakdown cover: includes recovery and roadside assistance',
                    'Legal expenses cover: pays legal costs if you need to pursue a claim',
                    'Personal accident cover: pays a lump sum if you are injured in a van accident',
                    'Goods-in-transit cover: protects materials and stock you are transporting for a job',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-white">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Critical: Hire Vehicle Cover
                </p>
                <p className="text-white text-sm">
                  If your van is off the road for repairs after an accident, how do you get to site?
                  How do you carry your tools? Hire vehicle cover provides a temporary replacement
                  van so you can continue working. Without it, you lose income every day your van is
                  in the garage. A week without a van could cost you &pound;1,000&ndash;&pound;2,000
                  in lost earnings &mdash; far more than the additional premium for hire vehicle
                  cover.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Income Protection Insurance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            Income Protection Insurance
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Income protection insurance pays a regular monthly benefit &mdash; typically{' '}
                <strong>50&ndash;70% of your normal income</strong> &mdash; if you are unable to
                work due to illness or injury. For self-employed electricians with no employer sick
                pay, this is arguably the most important insurance policy you can hold after public
                liability.
              </p>
              <p>
                Consider the reality: your income depends entirely on your physical ability to work.
                A back injury, a broken wrist, a knee operation, a serious illness &mdash; any of
                these can keep you off work for weeks or months. Without income protection, your
                only options are your emergency fund (which will run out), Universal Credit (which
                takes 5 weeks to arrive and pays very little), or borrowing.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">How Income Protection Works</p>
                <div className="space-y-2">
                  {[
                    'You choose a monthly benefit amount (typically 50&ndash;70% of your average income)',
                    'You choose a deferred period (4, 8, 13, or 26 weeks) &mdash; the waiting time before payments start',
                    'If you are unable to work due to illness or injury, you claim on the policy',
                    'After the deferred period, the insurer pays your chosen benefit monthly until you return to work or the policy term ends',
                    'Longer deferred periods mean lower premiums &mdash; your emergency fund bridges the gap',
                    'Some policies are &ldquo;own occupation&rdquo; (pays if you cannot do YOUR job) or &ldquo;any occupation&rdquo; (pays only if you cannot do ANY job)',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-white">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Own Occupation vs Any Occupation
                </p>
                <p className="text-white text-sm">
                  Always try to get an <strong>&ldquo;own occupation&rdquo;</strong> policy. This
                  pays out if you cannot perform your specific job as an electrician. An &ldquo;any
                  occupation&rdquo; policy only pays out if you cannot do any job at all &mdash;
                  which is a much harder threshold to meet. With an &ldquo;any occupation&rdquo;
                  policy, the insurer could argue that you could work in an office or a call centre,
                  even though you are unable to do electrical work. Own occupation policies cost
                  more, but they are significantly more likely to pay out when you need them.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Emergency Fund + Income Protection = Complete Safety Net
                </p>
                <p className="text-white text-sm">
                  Your emergency fund and income protection work together. The emergency fund covers
                  the deferred period (the weeks before income protection starts paying). Income
                  protection then takes over and provides ongoing income for as long as you are
                  unable to work. Together, they form a complete financial safety net. This is why a
                  13-week deferred period with a 3-month emergency fund works well &mdash; the fund
                  bridges the gap until the insurance kicks in, and the longer deferred period keeps
                  your premiums lower.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Life Insurance & Critical Illness */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">06</span>
            Life Insurance &amp; Critical Illness Cover
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Life insurance and critical illness cover protect your family and dependants. While
                income protection covers your own ability to earn, life insurance and critical
                illness cover ensure that the people who depend on you are financially secure if the
                worst happens.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-rose-400 mb-2">Life Insurance</p>
                  <p className="text-white text-sm mb-2">
                    Pays a <strong>lump sum</strong> to your beneficiaries if you die during the
                    policy term.
                  </p>
                  <div className="space-y-1.5">
                    {[
                      'Essential if you have a mortgage &mdash; can pay it off entirely',
                      'Essential if you have dependants (partner, children)',
                      'Term life insurance is affordable &mdash; typically &pound;10&ndash;&pound;30 per month',
                      'Choose a sum assured that covers your mortgage plus 10 years of family living costs',
                      'Write the policy in trust to avoid inheritance tax delays',
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-white">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-rose-400 mb-2">Critical Illness Cover</p>
                  <p className="text-white text-sm mb-2">
                    Pays a <strong>lump sum</strong> if you are diagnosed with a specified critical
                    illness (cancer, heart attack, stroke, etc.).
                  </p>
                  <div className="space-y-1.5">
                    {[
                      'Can be standalone or added to a life insurance policy',
                      'Pays out while you are alive &mdash; you choose how to use the money',
                      'Can cover mortgage payments, medical costs, adaptations to your home',
                      'More expensive than life insurance alone &mdash; typically &pound;30&ndash;&pound;80 per month',
                      'Check the list of covered conditions carefully before buying',
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-white">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  When Is Life Insurance Most Important?
                </p>
                <div className="space-y-2">
                  {[
                    'You have a mortgage &mdash; life insurance can pay it off, keeping your family in their home',
                    'You have a partner who depends on your income &mdash; the payout replaces years of lost earnings',
                    'You have children &mdash; the payout covers childcare, education, and living costs',
                    'You have business debts or personal guarantees &mdash; the payout prevents debts falling on your family',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-white">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Writing in Trust</p>
                <p className="text-white text-sm">
                  Ask your insurer or adviser about writing your life insurance policy &ldquo;in
                  trust.&rdquo; This means the payout goes directly to your named beneficiaries
                  without going through probate. It is faster (your family gets the money in weeks
                  rather than months), and the payout does not form part of your estate for
                  inheritance tax purposes. Most insurers offer trust forms free of charge &mdash;
                  you just need to fill in the paperwork.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pf-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pf-module-5-section-3">
              Next: Tax-Efficient Saving
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
