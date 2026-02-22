import { ArrowLeft, GraduationCap, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

/* ------------------------------------------------------------------ */
/*  Quick-check questions (InlineCheck — correctIndex, 0-indexed)      */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: 'gs-4-3-check1',
    question:
      'An electrician completed their NVQ Level 3 five years ago and has not undertaken any further training or study since. They state: &ldquo;I qualified once &mdash; that&rsquo;s all I need.&rdquo; Which of the following best explains why this position is problematic in the electrical industry?',
    options: [
      'It is only problematic if they work for a large company &mdash; sole traders do not need CPD',
      'BS 7671 has been amended multiple times since their qualification, new technologies have emerged, and competent person scheme membership requires evidence of ongoing learning &mdash; standing still means falling behind',
      'It is not problematic &mdash; a Level 3 qualification is valid for life and covers all future changes',
      'CPD is only required for engineers, not electricians',
    ],
    correctIndex: 1,
    explanation:
      'The electrical industry changes constantly. Since any five-year period will typically include at least one amendment to BS 7671 (e.g. A1:2020, A2:2022, A3:2024), plus new technologies (EV charging points, battery energy storage systems, arc fault detection devices), plus changes to Building Regulations Part P and competent person scheme requirements, an electrician who does not engage in CPD will quickly become out of date. Competent person schemes such as NICEIC and NAPIT require annual assessments that test knowledge of current regulations. ECS card renewal requires evidence of ongoing competence. The IET requires CPD for all professional registrations. The statement &ldquo;I qualified once &mdash; that&rsquo;s all I need&rdquo; reflects a fundamental misunderstanding of how professional competence works in a rapidly evolving industry. CPD is not optional &mdash; it is the mechanism by which electricians maintain their right to practise safely and legally.',
  },
  {
    id: 'gs-4-3-check2',
    question:
      'Which of the following activities would NOT typically count as valid CPD for an electrician seeking to maintain their professional registration or scheme membership?',
    options: [
      'Attending a manufacturer&rsquo;s training day on a new consumer unit range',
      'Reading the latest edition of IET Wiring Matters magazine and noting key changes',
      'Watching entertainment television unrelated to the electrical industry',
      'Mentoring a first-year apprentice on safe isolation procedures',
    ],
    correctIndex: 2,
    explanation:
      'CPD must be relevant to your professional development and competence. Attending manufacturer training (formal CPD), reading technical publications (self-directed CPD), and mentoring apprentices (on-the-job CPD) all contribute to maintaining and developing professional knowledge and skills. Watching entertainment television has no connection to professional development and would not be accepted as CPD by any professional body, competent person scheme, or registration authority. The key test for any CPD activity is: did it maintain or develop your professional competence? If the answer is no, it is not CPD regardless of how much time you spent on it. This distinction matters because CPD is about quality and relevance, not simply logging hours.',
  },
  {
    id: 'gs-4-3-check3',
    question:
      'The Engineering Council&rsquo;s UK-SPEC framework requires professionally registered individuals (EngTech, IEng, CEng) to undertake CPD. What is the primary purpose of this requirement?',
    options: [
      'To generate revenue for the Engineering Council through course fees',
      'To ensure that registered professionals maintain competence relevant to their current and future practice, protecting the public and the profession',
      'To prevent older engineers from continuing to work past retirement age',
      'To create unnecessary bureaucracy for working electricians',
    ],
    correctIndex: 1,
    explanation:
      'The Engineering Council&rsquo;s UK-SPEC (UK Standard for Professional Engineering Competence) requires CPD for all registered professionals because engineering knowledge and practice evolve continuously. The primary purpose is public protection: ensuring that professionals who hold EngTech, IEng, or CEng registration remain competent in their field. This is particularly important in electrical engineering where outdated knowledge can lead to unsafe installations. The requirement also protects the profession by maintaining standards and public trust. CPD must be planned (not random), recorded (documented with evidence), and relevant (connected to current or future practice). The Engineering Council conducts random audits of CPD records, and failure to maintain adequate CPD can result in removal from the register. For electricians holding EngTech MIET, this means that annual CPD is a condition of maintaining their professional title.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'How many hours of CPD do I need to complete each year as an electrician?',
    answer:
      'There is no single universal answer because different bodies have different requirements. The IET recommends a minimum of 30 hours of CPD per year for professionally registered members, though they emphasise quality over quantity. The Engineering Council does not specify a fixed number of hours but requires that CPD is sufficient to maintain competence. NICEIC and NAPIT assess competence through annual inspections and periodic assessments rather than counting hours. ECS card renewal requires evidence of ongoing competence but does not mandate a specific hourly total. The most practical approach is to aim for a minimum of 30 hours per year (roughly 2.5 hours per month) across a mix of formal training, self-directed study, and on-the-job learning. However, the focus should always be on the quality and relevance of the learning, not simply accumulating hours. An electrician who spends 10 hours genuinely studying a new BS 7671 amendment and applying it on site has achieved more meaningful CPD than one who sits through 40 hours of irrelevant presentations.',
  },
  {
    question: 'Does reading technical articles or watching YouTube tutorials count as CPD?',
    answer:
      'Yes &mdash; reading technical articles and watching educational videos can absolutely count as CPD, provided they are relevant to your professional development and you can demonstrate what you learned. This falls under &ldquo;self-directed&rdquo; or &ldquo;informal&rdquo; CPD. Reading IET Wiring Matters, Electrical Review, or manufacturer technical bulletins counts. Watching educational content about electrical installation techniques, testing methods, or regulation changes counts. The key is to record what you read or watched, when, and what you learned from it. Simply scrolling through content without engagement or reflection does not constitute meaningful CPD. A good practice is to keep a brief log: date, source, topic, and one or two sentences about what you learned or how it applies to your work. This turns passive consumption into active CPD that you can evidence if required.',
  },
  {
    question: 'I work for myself as a sole trader &mdash; do I still need to do CPD?',
    answer:
      'Absolutely. In fact, sole traders arguably need CPD more than employed electricians, because there is no employer providing training or keeping you updated. If you are registered with a competent person scheme (NICEIC, NAPIT, ELECSA, etc.), CPD is effectively mandatory &mdash; you must pass annual assessments that test your knowledge of current regulations and practice. If you hold an ECS card, renewal requires evidence of ongoing competence. If you are professionally registered with the IET (EngTech, IEng, CEng), annual CPD is a condition of registration. Even if none of these apply, the Electricity at Work Regulations 1989 require that persons working on electrical systems are competent &mdash; and competence must be maintained, not just initially achieved. From a business perspective, CPD also makes commercial sense: staying current with new technologies (EV charging, solar PV, battery storage) opens up new revenue streams, and demonstrating ongoing professional development builds client trust and justifies higher rates.',
  },
  {
    question: 'Can I get funding for CPD courses, or do I have to pay for everything myself?',
    answer:
      'There are several funding sources available. The Construction Industry Training Board (CITB) provides training grants to employers and individuals registered with them &mdash; these can cover a significant portion of course costs for qualifications, short courses, and manufacturer training. Some manufacturers offer free training days (often at their training centres or through wholesalers) as a way to promote their products &mdash; these are legitimate CPD even though they are commercially motivated. The IET offers free webinars and online resources to members. Trade wholesalers (Edmundson, CEF, Rexel) sometimes host free technical evenings. If you are employed, your employer may have a training budget &mdash; it is worth asking. If you are self-employed, training costs are a legitimate business expense that can be offset against tax. Some local councils and combined authorities offer skills funding for construction workers. The key message is that while some CPD does cost money (particularly formal qualifications and specialist courses), there is a significant amount of free or subsidised CPD available if you know where to look.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      'CPD stands for Continuing Professional Development. Which of the following best describes what CPD encompasses?',
    options: [
      'Only formal classroom-based training courses leading to certificates',
      'Any structured or unstructured learning activity that maintains and develops professional competence, including formal courses, self-directed study, on-the-job learning, and peer interaction',
      'Only activities that are directly paid for by an employer',
      'Only activities approved by the IET or Engineering Council',
    ],
    correctAnswer: 1,
    explanation:
      'CPD encompasses a very broad range of learning activities, not just formal courses. The IET, Engineering Council, and all competent person schemes recognise multiple forms of CPD: formal training (courses, qualifications, conferences), self-directed study (reading regulations, technical publications, online learning), on-the-job learning (new installation types, complex fault finding, mentoring), and professional interaction (peer discussion, technical forums, professional body events). The critical factor is not the format of the activity but whether it maintains or develops your professional competence. An electrician who spends two hours carefully studying the changes introduced by BS 7671 Amendment 3:2024 has undertaken valuable CPD, even though no certificate was issued and no course fee was paid.',
  },
  {
    id: 2,
    question:
      'BS 7671 has undergone several amendments in recent years. Which of the following correctly lists amendments that have been published?',
    options: [
      'A1:2018 and A2:2020 only',
      'A1:2020, A2:2022, and A3:2024',
      'There have been no amendments since BS 7671:2018 was published',
      'A1:2019, A2:2021, and A3:2023',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671:2018 (the 18th Edition) has been amended three times: Amendment 1:2020 (A1:2020), Amendment 2:2022 (A2:2022), and Amendment 3:2024 (A3:2024). A3:2024 was issued on 31 July 2024 and adds Regulation 530.3.201 concerning bidirectional and unidirectional devices. Each amendment introduces changes that affect how electrical installations are designed, installed, inspected, and tested. Electricians who do not keep up with these amendments risk non-compliant work. This is one of the most compelling reasons why CPD is not optional in the electrical trade &mdash; the regulations that govern your work change regularly, and ignorance of the current requirements is not a defence.',
  },
  {
    id: 3,
    question:
      'An electrician holds EngTech MIET registration through the IET. Which of the following statements about their CPD obligations is correct?',
    options: [
      'They are exempt from CPD because EngTech is a lifetime qualification',
      'They must undertake and record annual CPD that covers technical, professional, and personal development, and may be subject to random audit by the Engineering Council',
      'They only need to complete CPD every five years when their registration is renewed',
      'CPD is recommended but not mandatory for EngTech holders',
    ],
    correctAnswer: 1,
    explanation:
      'All professionally registered engineers (EngTech, IEng, CEng) are required by the Engineering Council to undertake CPD as a condition of maintaining their registration. This is set out in the UK-SPEC (UK Standard for Professional Engineering Competence). CPD must be planned, recorded, and evidenced. It should cover multiple areas: technical competence (keeping up with regulations, new technologies, best practice), professional skills (communication, project management, commercial awareness), and personal development (leadership, mentoring, career planning). The Engineering Council conducts random audits, and registrants may be asked to provide their CPD records at any time. Failure to maintain adequate CPD can result in professional registration being revoked. For electricians holding EngTech MIET, this means CPD is a non-negotiable annual commitment, not a one-off box-ticking exercise.',
  },
  {
    id: 4,
    question:
      'NICEIC and NAPIT are competent person schemes that allow electricians to self-certify notifiable electrical work under Building Regulations Part P. How do these schemes verify ongoing competence?',
    options: [
      'They do not &mdash; once registered, competence is assumed indefinitely',
      'They require members to pass a written exam every month',
      'They conduct annual assessments that test knowledge of current regulations and inspect a sample of completed work, and they issue technical bulletins on regulation changes',
      'They only check competence at initial registration and never again',
    ],
    correctAnswer: 2,
    explanation:
      'Competent person schemes such as NICEIC and NAPIT maintain standards through ongoing verification. This typically includes annual assessments where a scheme assessor visits the registered business, tests the qualified supervisor&rsquo;s knowledge of current BS 7671 requirements and safe working practices, and inspects a sample of completed work (including electrical installation certificates, minor works certificates, and the physical installations). The schemes also issue technical bulletins, guidance notes, and updates on regulation changes to help members stay current. Failure to meet the required standard at assessment can result in additional support visits, remedial action requirements, or ultimately removal from the scheme. This system means that CPD is effectively built into scheme membership &mdash; you cannot pass your annual assessment if you have not kept up with changes to BS 7671 and current best practice.',
  },
  {
    id: 5,
    question:
      'An electrician wants to claim CITB training grants to help fund their CPD. Which of the following is a requirement for accessing CITB grants?',
    options: [
      'The electrician must be under 25 years old',
      'The electrician (or their employer) must be registered with CITB and be levy-paying or a registered small employer',
      'CITB grants are only available for university-level qualifications',
      'CITB funding has been discontinued and is no longer available',
    ],
    correctAnswer: 1,
    explanation:
      'The Construction Industry Training Board (CITB) provides training grants to support skills development in the construction industry, including electrical installation. To access grants, the employer must be registered with CITB &mdash; this applies to most construction businesses. Levy-paying employers (those with a wage bill above the threshold) and registered small employers can both access grants, though the amounts and processes differ. CITB grants cover a wide range of training, from short courses and manufacturer training to formal qualifications like the 2391 or 2394/2395 Inspection and Testing awards. The grants do not cover the full cost but provide a meaningful contribution. Self-employed electricians may also be able to access CITB support through their registration as a principal contractor. Checking CITB eligibility and applying for grants is a practical step that many electricians overlook, potentially missing out on hundreds or thousands of pounds of training funding each year.',
  },
  {
    id: 6,
    question:
      'Which of the following represents the BEST approach to planning a CPD programme for the coming year?',
    options: [
      'Wait until your scheme assessment is due and then cram several courses into one week',
      'Identify knowledge gaps and career goals, plan a mix of formal and informal activities spread throughout the year, record activities and outcomes as you go, and review progress quarterly',
      'Complete only the minimum mandatory training required by your employer and nothing more',
      'Focus exclusively on formal courses because informal learning does not count as CPD',
    ],
    correctAnswer: 1,
    explanation:
      'Effective CPD planning follows a structured cycle: identify needs (what are your knowledge gaps? what does your career plan require? what has changed in regulations or technology?), plan activities (a mix of formal courses, self-directed study, on-the-job learning, and peer interaction, spread across the year), undertake the activities, record what you did and what you learned, and review and reflect on progress. This approach is recommended by the IET, the Engineering Council, and all competent person schemes. Cramming CPD into a single week before an assessment is ineffective because learning requires spaced repetition and time for reflection. Focusing only on mandatory employer training misses the point &mdash; CPD should be driven by your professional needs, not just your employer&rsquo;s minimum requirements. And informal learning absolutely counts, provided it is relevant, recorded, and reflected upon.',
  },
  {
    id: 7,
    question:
      'ECS (Electrotechnical Certification Scheme) cards are valid for a specified period and require renewal. Which of the following is TRUE about the renewal process?',
    options: [
      'ECS cards are valid for life and never need renewal',
      'Renewal is automatic &mdash; you just pay the fee and a new card is issued',
      'Renewal requires evidence of ongoing competence, which may include completing relevant CPD, holding current qualifications, and demonstrating continued professional activity',
      'ECS cards can only be renewed by sitting the full AM2 practical assessment again',
    ],
    correctAnswer: 2,
    explanation:
      'ECS cards (the industry&rsquo;s skills identification scheme, managed by the JIB) are valid for specified periods, typically 3-5 years depending on the card type. Renewal is not automatic &mdash; it requires evidence that the cardholder has maintained their competence during the card&rsquo;s validity period. This may include evidence of CPD activities, holding current and relevant qualifications, and demonstrating continued professional activity in the electrical sector. The specific requirements vary by card type and grade. Some renewals may require completion of an online assessment or evidence of having worked in the relevant occupational area. The key point is that an ECS card is not a lifetime certificate &mdash; it is a time-limited credential that must be actively maintained through ongoing professional development. Electricians who let their CPD lapse may find renewal more difficult or may need to provide additional evidence of competence.',
  },
  {
    id: 8,
    question:
      'An electrician records the following in their CPD log: &ldquo;Attended training. Learned stuff. 8 hours.&rdquo; Why is this CPD record inadequate?',
    options: [
      'It is not inadequate &mdash; recording the activity and hours is sufficient',
      'It lacks specific detail about what training was attended, who provided it, what topics were covered, what was learned, and how it applies to professional practice &mdash; making it impossible to verify or demonstrate meaningful learning',
      'CPD records do not need to include hours, only certificates',
      'The record is fine but should also include the cost of the training',
    ],
    correctAnswer: 1,
    explanation:
      'A CPD record must be detailed enough to demonstrate genuine learning and professional development. The entry &ldquo;Attended training. Learned stuff. 8 hours&rdquo; provides no evidence of what was studied, who delivered the training, what topics were covered, what new knowledge or skills were gained, or how the learning will be applied in practice. If audited by the Engineering Council, IET, or a competent person scheme, this record would not be accepted as evidence of meaningful CPD. A proper CPD record should include: the date, the activity (with specific details such as course title, provider, and topics), the duration, what was learned (key points, new knowledge, skills developed), and how it will be applied (changes to practice, areas for further study, impact on current work). This level of detail transforms a vague record into genuine evidence of professional development and also reinforces the learning through reflection.',
  },
];

export default function GSModule4Section3() {
  useSEO({
    title: 'CPD & Continuous Professional Development | Goal Setting & Growth Module 4.3',
    description:
      'Why CPD is essential for electricians: BS 7671 amendments, ECS card renewal, IET professional registration, NICEIC and NAPIT requirements, CPD planning and recording.',
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
            <Link to="../gs-module-4">
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
            <GraduationCap className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 4 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            CPD &amp; Continuous Professional Development
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Why CPD is not optional in the electrical trade, what counts, who requires it, and how
            to plan, record, and evidence your ongoing professional development
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>CPD</strong> is structured and unstructured learning that maintains and
                develops professional competence
              </li>
              <li>
                <strong>BS 7671 changes regularly</strong> &mdash; A1:2020, A2:2022, A3:2024 &mdash;
                and you must keep up
              </li>
              <li>
                <strong>ECS cards, IET registration, and scheme membership</strong> all require
                evidence of ongoing CPD
              </li>
              <li>
                <strong>CPD includes</strong> formal courses, self-study, on-the-job learning,
                mentoring, and peer discussion
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Legal compliance:</strong> Competence must be maintained, not just initially
                achieved &mdash; the Electricity at Work Regulations 1989 require it
              </li>
              <li>
                <strong>Career progression:</strong> New technologies (EV charging, battery storage,
                solar PV) create opportunities for those who invest in learning
              </li>
              <li>
                <strong>Client trust:</strong> Customers increasingly research and ask technical
                questions &mdash; staying current builds credibility
              </li>
              <li>
                <strong>Financial benefit:</strong> CITB grants and tax-deductible training costs
                mean CPD can be more affordable than you think
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Define CPD and explain why it is essential for all electricians, not just those with professional registration',
              'Identify the key bodies that require CPD: IET, Engineering Council, NICEIC, NAPIT, and the ECS card scheme',
              'Describe the different types of CPD activity: formal, informal, on-the-job, and self-directed',
              'Explain the CPD requirements for maintaining EngTech, IEng, or CEng professional registration',
              'Build a practical CPD plan covering what to learn, when, how, and how to evidence it',
              'Create effective CPD log entries that demonstrate genuine learning and professional development',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What CPD Actually Means */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            What CPD Actually Means
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                CPD stands for Continuing Professional Development. It is a broad term that covers
                any structured or unstructured learning activity that maintains, develops, and
                enhances your professional knowledge, skills, and competence. CPD is not a single
                course or qualification &mdash; it is a lifelong commitment to staying current and
                capable in your chosen field. For electricians, CPD encompasses everything from
                attending formal training courses and gaining additional qualifications to reading
                technical publications, studying regulation amendments, learning from on-site
                experience, mentoring colleagues, and engaging in professional discussion with
                peers.
              </p>

              <p>
                The concept of CPD is built on a simple but powerful principle: your initial
                qualification is the starting point of your professional competence, not the end
                point. The knowledge and skills you gained during your apprenticeship or training
                programme were accurate and sufficient at the time you qualified. But the electrical
                industry does not stand still. Regulations change, technologies evolve, best
                practices are updated, and new specialisms emerge. Without ongoing learning, your
                competence gradually erodes &mdash; not because you forgot what you learned, but
                because the industry moved forward while you stood still.
              </p>

              <p>
                Think of it in electrical terms: your initial qualification is like installing a
                consumer unit to the current edition of BS 7671. It was fully compliant on the day
                it was installed. But five years later, after two or three amendments to the
                regulations, some aspects of that installation may no longer represent current best
                practice. The installation still functions, but it has not kept pace with the
                evolving standard. CPD is the process of keeping your professional
                &ldquo;installation&rdquo; &mdash; your knowledge and skills &mdash; current with
                the latest requirements.
              </p>

              <p>
                CPD is formally defined by the Engineering Council as &ldquo;the systematic
                maintenance, improvement, and broadening of knowledge and skill, and the development
                of personal qualities necessary for the execution of professional and technical
                duties throughout the practitioner&rsquo;s working life.&rdquo; The IET (Institution
                of Engineering and Technology) defines it as &ldquo;the continuous process of
                learning and development that helps you maintain your professional
                competence.&rdquo; Both definitions emphasise that CPD is continuous (not periodic),
                systematic (not random), and focused on competence (not just attendance).
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Key Principle: CPD is About Competence, Not Compliance
                </p>
                <p className="text-base text-white leading-relaxed">
                  The most effective approach to CPD is to see it as an investment in your own
                  competence and career, not as a box-ticking exercise to satisfy scheme assessors
                  or professional bodies. Electricians who approach CPD with genuine curiosity and a
                  desire to improve find that it enriches their work, opens new opportunities, and
                  increases their confidence. Those who see it purely as an obligation tend to do
                  the minimum, gain little from it, and resent the time spent. The difference is
                  mindset &mdash; and everything we covered in Module 1 about growth mindset applies
                  directly to how you approach CPD.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Why CPD is Not Optional in the Electrical Trade */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Why CPD is Not Optional in the Electrical Trade
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Unlike some professions where the body of knowledge is relatively stable, the
                electrical industry is characterised by constant change. This makes CPD not a
                nice-to-have but a genuine necessity for safe, legal, and competent practice. There
                are four key drivers that make CPD essential for every working electrician.
              </p>

              <p>
                <strong>1. BS 7671 amendments change requirements regularly.</strong> The current
                edition of BS 7671 is the 18th Edition (BS 7671:2018), but it has already been
                amended three times: Amendment 1:2020 (A1:2020), Amendment 2:2022 (A2:2022), and
                Amendment 3:2024 (A3:2024). Each amendment introduces changes that affect
                installation design, product selection, installation practices, and inspection and
                testing procedures. A1:2020 introduced requirements for arc fault detection devices
                (AFDDs) in certain locations. A2:2022 brought further changes to cable sizing,
                protective device selection, and special installation requirements. A3:2024, issued
                on 31 July 2024, added Regulation 530.3.201 dealing with bidirectional and
                unidirectional devices &mdash; directly relevant to the growing number of
                installations with solar PV and battery storage that can export energy back to the
                grid. An electrician who qualified in 2018 and has not engaged in any CPD since will
                be working to outdated requirements in several important areas. Amendment 4 is
                expected in 2026, and the cycle continues.
              </p>

              <p>
                <strong>2. New technologies are transforming the industry.</strong> The electrical
                trade in 2026 looks very different from the trade in 2016. Electric vehicle (EV)
                charging points are being installed in homes, workplaces, and public locations at
                unprecedented scale, requiring knowledge of BS 7671 Section 722, dedicated circuits,
                smart charging protocols, and load management. Battery energy storage systems (BESS)
                are becoming common in domestic and commercial settings, raising new questions about
                circuit design, protection, and the interaction between generation, storage, and
                grid supply. Solar photovoltaic (PV) installations continue to grow, with new
                requirements for bidirectional protection devices addressed by A3:2024. Smart home
                systems &mdash; lighting control, heating automation, security integration &mdash;
                require electricians to understand data networking, wireless protocols, and software
                configuration alongside traditional wiring. Heat pump installations require
                understanding of high-current circuits, dedicated supplies, and integration with
                existing electrical infrastructure. Electricians who do not keep up with these
                technologies will find their available market shrinking as clients increasingly
                demand these services.
              </p>

              <p>
                <strong>3. Regulatory and legislative changes affect how you work.</strong> Beyond
                BS 7671, electricians must stay current with Building Regulations (particularly
                Approved Document P for electrical safety in dwellings), competent person scheme
                requirements, the Electricity at Work Regulations 1989, and health and safety
                legislation. Approved Document P has been updated multiple times, and the scope of
                notifiable work has changed. Competent person scheme requirements evolve &mdash;
                NICEIC and NAPIT periodically update their assessment criteria and technical
                standards. The CDM Regulations (Construction (Design and Management) Regulations
                2015) affect how electricians operate on construction sites. Fire safety
                regulations, particularly following the Grenfell Tower tragedy and subsequent
                Building Safety Act 2022, have introduced new requirements for electrical
                installations in higher-risk buildings. An electrician who is not aware of these
                changes risks non-compliant work, legal liability, and potential danger to building
                occupants.
              </p>

              <p>
                <strong>4. Client expectations are rising.</strong> Modern clients &mdash; both
                domestic and commercial &mdash; are more informed than ever before. They research
                online, read reviews, compare quotes, and ask technical questions. A homeowner
                considering an EV charger may have already read about smart charging, load
                balancing, and government grant requirements before they contact an electrician. A
                commercial client specifying a lighting upgrade may ask about LED driver
                compatibility, DALI control systems, and energy efficiency calculations.
                Electricians who cannot answer these questions confidently, or who are visibly
                unfamiliar with current technologies and regulations, will lose work to competitors
                who have invested in their CPD. Professional credibility is built on current
                competence, and current competence requires ongoing learning.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Cost of Not Doing CPD</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Non-compliant installations:</strong> Working to outdated BS 7671
                      requirements risks producing work that does not meet current standards,
                      leading to failed inspections, remedial work at your cost, and potential
                      liability
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Lost scheme membership:</strong> Failing your annual NICEIC or NAPIT
                      assessment because your knowledge is out of date can result in losing your
                      competent person status &mdash; and with it, the ability to self-certify
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Missed opportunities:</strong> Every new technology you do not learn
                      is revenue you cannot earn. EV charging, battery storage, and solar PV are
                      high-value, growing markets
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Safety risk:</strong> Outdated knowledge in a safety-critical industry
                      can have serious consequences for building occupants and for your professional
                      standing
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: ECS Card Renewal and CPD */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            ECS Card Renewal and CPD
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Electrotechnical Certification Scheme (ECS) is the industry&rsquo;s recognised
                skills identification card scheme for the electrotechnical sector. Managed by the
                Joint Industry Board (JIB), ECS cards are the standard way of proving your
                qualifications, competence level, and occupational status on construction sites and
                in the wider electrical industry. Increasingly, main contractors and site managers
                require valid ECS cards as a condition of site access.
              </p>

              <p>
                ECS cards are not lifetime credentials. They are valid for specified periods,
                typically 3&ndash;5 years depending on the card type and grade. When your card
                approaches its expiry date, you must apply for renewal &mdash; and renewal is not
                automatic. The renewal process requires you to demonstrate that you have maintained
                your competence during the card&rsquo;s validity period. This may include providing
                evidence of CPD activities, holding current and relevant qualifications, and
                demonstrating that you have been working in the relevant occupational area.
              </p>

              <p>
                The specific renewal requirements vary by card type. For Installation Electrician
                cards, you will typically need to show that your qualifications remain current (some
                qualifications have expiry dates or require renewal themselves), that you have been
                working in the electrical industry, and that you have engaged in professional
                development activities. Some card renewals may require completion of an online
                assessment covering current regulations and safe working practices. For higher-grade
                cards such as Approved Electrician, additional evidence of advanced competence may
                be required.
              </p>

              <p>
                CPD activities that count towards ECS card renewal include: completing formal
                training courses (especially those covering BS 7671 amendments and new
                technologies), gaining additional qualifications (such as the 2391 Inspection and
                Testing award, EV charging installation qualifications, or solar PV qualifications),
                attending manufacturer training days, completing online learning modules provided by
                trade bodies, and participating in professional development activities organised by
                the IET, SELECT, or other industry bodies. Keeping a record of these activities
                throughout the card&rsquo;s validity period makes the renewal process
                straightforward. Leaving it until the last minute creates unnecessary stress and may
                result in gaps in coverage if renewal is delayed.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Practical Tip: Start Your Renewal Early
                </p>
                <p className="text-base text-white leading-relaxed">
                  Do not wait until your ECS card is about to expire before thinking about renewal.
                  Check your card&rsquo;s expiry date now and work backwards. If your card expires
                  in twelve months, start gathering evidence and completing any required assessments
                  now. If you need additional qualifications or training to meet the renewal
                  criteria, plan them into your CPD schedule with time to spare. A lapsed ECS card
                  can prevent you from accessing construction sites and may cause problems with your
                  employer or clients.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: IET Professional Registration CPD Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            IET Professional Registration CPD Requirements
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Institution of Engineering and Technology (IET) is the professional body for
                engineers and technicians working in the electrical and electronic sectors. Many
                electricians are members of the IET and hold professional registration through the
                Engineering Council. The three main registration levels relevant to electricians
                are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>EngTech (Engineering Technician):</strong> The most common registration
                    level for qualified electricians. Demonstrates competence in applying proven
                    engineering techniques and procedures. Many electricians with Level 3
                    qualifications and relevant experience are eligible for EngTech registration.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>IEng (Incorporated Engineer):</strong> For those who have developed
                    higher technical competence, typically requiring Level 4 or Level 5
                    qualifications (such as an HNC or HND) plus substantial professional experience.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>CEng (Chartered Engineer):</strong> The highest level of professional
                    registration, requiring a Master&rsquo;s level qualification (or equivalent)
                    plus significant professional experience and demonstrated leadership in
                    engineering.
                  </span>
                </li>
              </ul>

              <p>
                All three registration levels require annual CPD as a condition of maintaining
                registration. The IET&rsquo;s CPD policy states that registered members must
                demonstrate learning across three domains: <strong>technical competence</strong>
                (keeping up with regulations, new technologies, best practice, and developments in
                your field), <strong>professional skills</strong> (communication, project
                management, commercial awareness, leadership, and business understanding), and{' '}
                <strong>personal development</strong> (career planning, mentoring, coaching,
                transferable skills, and self-awareness).
              </p>

              <p>
                CPD must be <strong>planned</strong> (not random or accidental &mdash; you should
                identify your development needs at the start of each year and create a plan),{' '}
                <strong>recorded</strong> (documented with sufficient detail to demonstrate what was
                done, what was learned, and how it was applied), and <strong>evidenced</strong>
                (supported by certificates, notes, reflective statements, or other proof of
                participation and learning). The IET provides templates and guidance for CPD
                recording, and many registered members use the IET&rsquo;s online Career Manager
                tool to plan and log their CPD activities.
              </p>

              <p>
                The Engineering Council, which oversees all professional registrations through
                institutions like the IET, conducts random audits of CPD records. If selected for
                audit, you must provide your CPD records demonstrating that you have undertaken
                sufficient, relevant CPD during the audit period. Failure to provide adequate
                records can result in your registration being suspended or revoked. This is not a
                theoretical risk &mdash; the Engineering Council takes CPD compliance seriously, and
                registrants have lost their professional titles for failing to maintain adequate CPD
                records.
              </p>

              <p>
                For electricians, the practical implication is clear: if you hold EngTech MIET (or
                any other professional registration), CPD is a non-negotiable annual obligation. But
                it should not be viewed negatively. Professional registration signals to clients,
                employers, and the public that you are committed to maintaining your competence. CPD
                is the mechanism that makes that commitment real. Electricians who embrace CPD as
                part of their professional identity tend to be more knowledgeable, more confident,
                and more successful than those who treat it as an unwelcome chore.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">IET CPD Recording Tips</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Use the IET Career Manager:</strong> Free online tool for IET members
                      to plan, record, and reflect on CPD activities throughout the year
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Record as you go:</strong> Do not wait until the end of the year to
                      recall what you did. Log activities within a week of completing them while the
                      details are fresh
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Reflect on learning:</strong> For each activity, write one or two
                      sentences about what you learned and how it applies to your work. This
                      transforms a record into evidence of genuine development
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Balance your CPD:</strong> Aim for a mix across all three domains
                      (technical, professional, personal). Do not focus exclusively on technical
                      training at the expense of professional and personal development
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Engineering Council UK-SPEC */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Engineering Council UK-SPEC
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Engineering Council is the UK regulatory body for the engineering profession. It
                maintains the national Register of Engineers and Technicians and sets the standards
                for professional engineering competence through a document called{' '}
                <strong>UK-SPEC</strong> (UK Standard for Professional Engineering Competence).
                UK-SPEC defines the competence and commitment required for registration at each
                level (EngTech, IEng, CEng, ICTTech) and includes explicit requirements for CPD.
              </p>

              <p>
                Under UK-SPEC, all registered professionals must undertake CPD that is{' '}
                <strong>relevant to current and future practice</strong>. This means your CPD should
                not only address your current role and responsibilities but should also prepare you
                for where you want your career to go. An electrician who currently works in domestic
                installation but aspires to move into commercial inspection and testing should
                include CPD activities related to both their current work and their future
                ambitions. An electrician who wants to specialise in renewable energy systems should
                be building knowledge in solar PV, battery storage, and EV charging alongside
                maintaining their core regulatory knowledge.
              </p>

              <p>
                The Engineering Council&rsquo;s CPD framework requires registrants to follow a
                continuous cycle of: <strong>planning</strong> (identifying development needs based
                on current role, career goals, and industry changes), <strong>action</strong>
                (undertaking CPD activities to address those needs), <strong>reflection</strong>
                (evaluating what was learned and how it applies to practice), and{' '}
                <strong>recording</strong> (documenting activities and outcomes for evidence). This
                cycle should repeat throughout the year, not just at assessment or audit time.
              </p>

              <p>
                An annual CPD return is required. This does not mean you submit a detailed report
                every year, but you must maintain records that can be produced on request if you are
                selected for random audit. The Engineering Council samples registrants from across
                all institutions (including the IET) and all registration levels. If your records
                are inadequate, you will be given a period to address the shortfall. Persistent
                failure to maintain CPD can result in removal from the professional register &mdash;
                meaning you would lose the right to use the EngTech, IEng, or CEng designation.
              </p>

              <p>
                UK-SPEC does not prescribe a minimum number of CPD hours, recognising that the
                amount of CPD required varies by individual, role, and career stage. However, the
                IET recommends a minimum of 30 hours per year as a guideline. The emphasis is on
                quality and relevance: 10 hours of highly relevant, well-reflected CPD is worth more
                than 50 hours of generic, unfocused activity. The Engineering Council&rsquo;s
                auditors look for evidence of genuine learning and professional growth, not simply a
                list of courses attended.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Why Professional Registration Matters for Electricians
                </p>
                <p className="text-base text-white leading-relaxed">
                  Professional registration (particularly EngTech MIET) is increasingly valued in
                  the electrical industry. It demonstrates to clients, employers, and the public
                  that you have met a nationally recognised standard of competence and that you are
                  committed to maintaining that competence through CPD. Some employers now require
                  or prefer professionally registered electricians. Some tender processes give
                  additional weighting to companies that employ registered professionals. And the
                  professional title itself carries weight &mdash; &ldquo;EngTech MIET&rdquo; after
                  your name signals a level of commitment and competence that goes beyond holding a
                  qualification.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: NICEIC and NAPIT CPD */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            NICEIC and NAPIT CPD Requirements
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                NICEIC (National Inspection Council for Electrical Installation Contracting) and
                NAPIT (National Association of Professional Inspectors and Testers) are the two
                largest competent person schemes for electrical installation work in England and
                Wales. Under Building Regulations Approved Document P, membership of a competent
                person scheme allows registered electricians to self-certify notifiable electrical
                work in dwellings without the need for separate building control inspection. This is
                a significant commercial advantage, and maintaining scheme membership is essential
                for many electrical businesses.
              </p>

              <p>
                Both NICEIC and NAPIT maintain standards through ongoing assessment of their
                members. The core mechanism is the annual assessment, during which a scheme assessor
                visits the registered business and evaluates the qualified supervisor&rsquo;s
                knowledge and the quality of their work. The assessment typically includes a
                technical knowledge test covering current BS 7671 requirements and safe working
                practices, a review of completed electrical installation certificates and minor
                works certificates for accuracy and compliance, and a physical inspection of a
                sample of completed installations to verify that the standard of work meets current
                requirements.
              </p>

              <p>
                These annual assessments effectively function as a CPD requirement, because you
                cannot pass them without staying current with regulation changes and maintaining
                your practical skills. If an amendment to BS 7671 has introduced new requirements
                (for example, A3:2024&rsquo;s requirements for bidirectional devices), the assessor
                will expect you to be aware of these changes and to be implementing them in your
                work. If a new Guidance Note has been published by the IET, the assessor may test
                your knowledge of its recommendations. Electricians who do not keep up with changes
                through regular CPD find themselves failing assessments &mdash; which can lead to
                additional support visits, remedial action requirements, or ultimately removal from
                the scheme.
              </p>

              <p>
                Beyond annual assessments, both NICEIC and NAPIT support their members&rsquo; CPD
                through several channels. They issue technical bulletins and guidance notes that
                explain regulation changes and clarify areas of common confusion. They publish
                newsletters and online content covering new technologies, best practice, and
                industry developments. They offer technical helplines where members can get expert
                advice on specific installation queries. And they provide access to training
                resources, webinars, and events. Making use of these resources throughout the year
                &mdash; rather than cramming before your assessment &mdash; is the most effective
                way to maintain your competence and pass assessments comfortably.
              </p>

              <p>
                Other competent person schemes, including ELECSA, BRE, Certsure, and Stroma, operate
                similar assessment regimes. The details vary, but the principle is the same: ongoing
                competence must be demonstrated through regular assessment, and regular assessment
                requires regular CPD.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Maximising Your Scheme Membership
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Read every technical bulletin:</strong> These are targeted CPD that
                      addresses exactly what your assessor will test. Do not bin them or let them
                      pile up unread
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Use the technical helpline:</strong> When you encounter an unusual
                      installation challenge, calling the helpline is CPD &mdash; you learn the
                      correct approach and it counts as professional development
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Review your certificates regularly:</strong> Your assessor will
                      inspect your paperwork. Make sure your EICs and MWCs are complete, accurate,
                      and reflect current BS 7671 requirements
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Treat your assessment as a learning opportunity:</strong> Rather than
                      dreading it, use the assessor&rsquo;s feedback to identify areas where you can
                      improve. This is high-quality, personalised CPD
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Types of CPD Activities */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">07</span>
            Types of CPD Activities
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                CPD is much broader than most electricians realise. Many people think of CPD as
                &ldquo;attending courses&rdquo;, but formal training is only one of four recognised
                categories of CPD activity. A well-rounded CPD programme should include activities
                from all four categories, because each provides a different type of learning and
                development.
              </p>

              <p>
                <strong>Formal CPD</strong> includes structured, organised learning activities that
                are typically delivered by a training provider, institution, or professional body.
                This category includes: attending training courses (whether face-to-face or online),
                studying for and completing qualifications (such as the 2391 Inspection and Testing
                award, the Level 4 Design and Verification qualification, EV charging installation
                qualifications, or solar PV qualifications), attending manufacturer training days
                (learning about specific products, systems, and installation techniques), attending
                conferences and seminars (such as IET events, trade exhibitions, or industry
                conferences), completing accredited online learning modules, and participating in
                structured workshops or masterclasses. Formal CPD provides the most obvious evidence
                (certificates, attendance records, qualification transcripts) and is often the type
                that assessors and auditors find easiest to verify. However, formal CPD alone is not
                sufficient &mdash; it needs to be complemented by other types of learning.
              </p>

              <p>
                <strong>Informal CPD</strong> covers unstructured learning activities that
                contribute to your professional development even though they are not formally
                organised or accredited. This includes: reading technical publications (IET Wiring
                Matters, Electrical Review, EC&amp;M, manufacturer technical guides), reading
                industry guidance (IET Guidance Notes, IET Codes of Practice, BRE publications),
                reading and studying BS 7671 amendments and their implications, following industry
                discussions and debates online (professional forums, LinkedIn groups, trade body
                social media), discussing technical issues with peers and colleagues (conversations
                about unusual installations, fault-finding approaches, interpretation of
                regulations), and attending trade events, exhibitions, or open evenings hosted by
                electrical wholesalers. Informal CPD is often undervalued because it does not come
                with a certificate, but it can be just as valuable as formal training &mdash; and
                sometimes more so, because it is driven by genuine curiosity and immediate practical
                relevance.
              </p>

              <p>
                <strong>On-the-job CPD</strong> is learning that happens through your day-to-day
                work. This is arguably the most valuable form of CPD for practical tradespeople
                because it directly connects learning to real-world application. On-the-job CPD
                includes: undertaking new types of installation that stretch your skills (your first
                EV charger installation, your first three-phase board, your first commercial
                inspection), complex fault finding that requires you to think deeply and apply
                theoretical knowledge, mentoring apprentices or less experienced colleagues
                (teaching others reinforces your own understanding and develops professional
                skills), taking on project management or supervisory responsibilities, learning new
                testing methods or using new equipment, and working alongside specialists in areas
                outside your usual expertise (e.g., working with a fire alarm specialist, a data
                cabling engineer, or a BMS technician). The key to turning on-the-job experience
                into CPD is reflection: consciously thinking about what you learned, what challenged
                you, and how you will apply the learning in future.
              </p>

              <p>
                <strong>Self-directed CPD</strong> is learning that you plan and undertake
                independently, based on your own identified needs and interests. This includes:
                systematically studying BS 7671 amendments and their practical implications, working
                through practice calculations (cable sizing, fault current, voltage drop, earth
                fault loop impedance), studying IET Guidance Notes (such as GN3: Inspection &amp;
                Testing, GN8: Earthing and Bonding), researching new technologies or specialisms you
                want to move into, developing business skills (estimating, project management,
                accounting, marketing), and pursuing personal development (communication skills,
                leadership, time management). Self-directed CPD requires self-discipline because
                there is no external structure or accountability, but it is often the most
                personally rewarding form of CPD because it directly addresses your specific needs
                and interests.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">A Balanced CPD Diet</p>
                <p className="text-base text-white leading-relaxed">
                  Just as a balanced diet requires a mix of food groups, a balanced CPD programme
                  requires a mix of activity types. An electrician who only does formal courses
                  misses the learning that comes from reading, reflection, and on-the-job
                  experience. An electrician who only learns on the job misses the structured
                  knowledge that formal training provides. Aim for a spread across all four
                  categories throughout the year: perhaps one or two formal courses, regular reading
                  of technical publications, conscious reflection on on-the-job learning, and
                  periodic self-directed study of areas you want to develop.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: CITB Training Grants */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">08</span>
            CITB Training Grants &amp; Funding CPD
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most common reasons electricians give for not doing more CPD is cost.
                Formal training courses can be expensive &mdash; a week-long 2391 Inspection and
                Testing course might cost &pound;800&ndash;&pound;1,200, and specialist
                qualifications in EV charging or solar PV can be similarly priced. However, there
                are several funding mechanisms that can significantly reduce or eliminate the cost
                of CPD for electricians.
              </p>

              <p>
                The <strong>Construction Industry Training Board (CITB)</strong> is the industry
                training board for the construction sector, including electrical installation. CITB
                is funded by a levy on construction employers and uses that funding to support
                training and skills development across the industry. If you are employed by a
                company that is registered with CITB (and most construction businesses are, or
                should be), your employer can claim grants towards the cost of your training. These
                grants cover a wide range of CPD activities including: short courses (up to several
                hundred pounds per course), qualifications (grants towards the cost of NVQs,
                technical qualifications, and professional certifications), apprenticeship support
                (additional funding for employers training apprentices), and specialist training
                (grants for courses in areas like working at height, asbestos awareness, and first
                aid, as well as technical training).
              </p>

              <p>
                For self-employed electricians, CITB registration is also possible. Self-employed
                subcontractors who register with CITB can access small employer grants and training
                support. The amounts available are smaller than for larger employers, but they still
                provide meaningful support for CPD costs. Additionally, training costs for
                self-employed electricians are a legitimate business expense that can be offset
                against tax, effectively reducing the real cost by your marginal tax rate.
              </p>

              <p>
                Beyond CITB, there are several other funding sources for electrician CPD. Many
                <strong> manufacturers offer free training</strong> as a way to promote their
                products and build brand loyalty among installers. Companies like Hager, Schneider
                Electric, Eaton, and others operate training centres and run regular courses on
                their product ranges, installation techniques, and new technologies. These are
                legitimate CPD even though they are commercially motivated &mdash; you are learning
                practical skills and product knowledge that you can apply on site.{' '}
                <strong>Trade wholesalers</strong>
                (Edmundson, CEF, Rexel, City Electrical Factors) sometimes host free technical
                evenings, product launches, and demonstration events that combine networking with
                learning.
              </p>

              <p>
                The <strong>IET offers free resources</strong> to its members, including webinars,
                online articles, technical guidance, and access to Wiring Matters magazine. These
                are high-quality CPD resources that cost nothing beyond your membership fee. Some
                local
                <strong> councils and combined authorities</strong> offer skills funding or adult
                education grants that can be used towards electrical training. The
                government&rsquo;s Skills Bootcamp programme has included electrotechnical and green
                skills courses in various regions. It is worth checking what is available locally,
                as funding opportunities change regularly.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Practical Steps to Fund Your CPD
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Check CITB eligibility:</strong> If you or your employer is not
                      registered with CITB, investigate whether registration would unlock grant
                      funding for your training
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Ask your employer:</strong> Many companies have training budgets that
                      go unspent because employees do not ask. Make a business case for the training
                      you want
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Sign up for manufacturer training:</strong> Contact your preferred
                      manufacturers or check their websites for free training days and courses
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Use free IET resources:</strong> If you are an IET member, make full
                      use of the free webinars, publications, and online content
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Claim tax relief:</strong> If self-employed, ensure you claim training
                      costs as a business expense. If employed and paying for your own training,
                      check whether you can claim tax relief on professional fees and training costs
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 09: Building a CPD Plan */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">09</span>
            Building a CPD Plan
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A CPD plan does not need to be a complicated document. At its simplest, it answers
                four questions: <strong>What</strong> do I need to learn? <strong>When</strong> will
                I learn it? <strong>How</strong> will I learn it? And{' '}
                <strong>how will I evidence it</strong>? Building a plan at the start of each year
                (or each CPD cycle) transforms CPD from a reactive, last-minute scramble into a
                structured programme of professional development.
              </p>

              <p>
                <strong>Step 1: Identify your learning needs.</strong> Start by assessing where you
                are now and where you want to be. What are your current knowledge gaps? Which recent
                regulation changes have you not yet studied? Are there new technologies that your
                clients are asking about but you do not yet feel confident delivering? What feedback
                have you received from assessors, clients, or colleagues? What are your career goals
                for the next 1&ndash;3 years, and what skills or knowledge do you need to achieve
                them? Be honest about your weaknesses &mdash; this is where CPD has the most value.
              </p>

              <p>
                <strong>Step 2: Prioritise and schedule.</strong> You cannot learn everything at
                once, so prioritise your learning needs. Which gaps pose the biggest risk to the
                quality and compliance of your current work? Which skills would open up the most
                valuable new opportunities? Which CPD activities have deadlines (e.g., studying a
                new BS 7671 amendment before your scheme assessment)? Once you have prioritised,
                schedule your CPD activities throughout the year. Aim for a regular rhythm &mdash;
                perhaps one formal course per quarter, monthly reading of technical publications,
                and weekly reflection on on-the-job learning &mdash; rather than concentrating
                everything into one period.
              </p>

              <p>
                <strong>Step 3: Choose appropriate methods.</strong> Match your learning method to
                the subject and your personal learning style. Some topics are best learned through
                formal courses (e.g., a new qualification requires structured learning and
                assessment). Others are better suited to self-directed study (e.g., reading and
                understanding a BS 7671 amendment). Practical skills are best developed on the job
                with guidance from a more experienced colleague. Business skills might be best
                learned through online courses, books, or mentoring. The mix should reflect your
                priorities, your budget, and your available time.
              </p>

              <p>
                <strong>Step 4: Record and reflect.</strong> As you complete CPD activities, record
                them in your CPD log (see next section). Include enough detail to demonstrate what
                you did, what you learned, and how it applies to your practice. At the end of each
                quarter, review your progress against your plan. Have you completed the activities
                you planned? If not, why not? Do you need to adjust your plan? Have new learning
                needs emerged that were not in your original plan? This reflective cycle keeps your
                CPD relevant and responsive to your evolving needs.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Example CPD Plan for a Domestic Electrician
                </p>
                <p className="text-base text-white leading-relaxed mb-3">
                  <strong>Q1 (January&ndash;March):</strong> Study BS 7671 A3:2024 changes
                  (self-directed, 3 hours). Attend manufacturer training day on AFDD technology
                  (formal, 1 day). Read IET Wiring Matters back issues (informal, 2 hours per
                  month).
                </p>
                <p className="text-base text-white leading-relaxed mb-3">
                  <strong>Q2 (April&ndash;June):</strong> Complete EV charging installation
                  qualification (formal, 3 days). Shadow experienced inspector on one commercial
                  EICR (on-the-job, 1 day). Study GN3 Chapter 8 on RCD testing (self-directed, 2
                  hours).
                </p>
                <p className="text-base text-white leading-relaxed mb-3">
                  <strong>Q3 (July&ndash;September):</strong> Attend IET local network event
                  (informal, 1 evening). Complete first solo EV charger installations and reflect on
                  learning (on-the-job, ongoing). Study solar PV fundamentals using online resources
                  (self-directed, 4 hours).
                </p>
                <p className="text-base text-white leading-relaxed">
                  <strong>Q4 (October&ndash;December):</strong> Prepare for NICEIC annual assessment
                  by reviewing recent technical bulletins (self-directed, 3 hours). Mentor new
                  apprentice on safe isolation procedures (on-the-job, ongoing). Attend wholesaler
                  technical evening on smart home systems (informal, 1 evening). Review year and
                  plan next year&rsquo;s CPD.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 10: The CPD Log */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">10</span>
            The CPD Log &mdash; Recording Your Development
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A CPD log is simply a record of your professional development activities. It does
                not need to be a fancy document or an expensive software system. A spreadsheet, a
                notebook, a Word document, or the IET&rsquo;s online Career Manager tool will all
                serve the purpose. What matters is not the format but the content: your log must
                capture enough detail to demonstrate genuine learning and professional development.
              </p>

              <p>Each CPD log entry should include the following information:</p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Date:</strong> When the activity took place
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Activity:</strong> What you did, with specific details. Not
                    &ldquo;attended training&rdquo; but &ldquo;attended Hager AFDD training day at
                    Telford training centre covering AFDD selection, installation requirements, and
                    BS 7671 Regulation 421.1.7&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Category:</strong> Formal, informal, on-the-job, or self-directed
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Duration:</strong> How many hours the activity took (including
                    preparation and travel time for formal courses)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>What I learned:</strong> The most important part. Summarise the key
                    points, new knowledge, or skills you gained. Be specific: not &ldquo;learned
                    about AFDDs&rdquo; but &ldquo;learned that AFDDs detect series and parallel arc
                    faults that RCDs and MCBs cannot detect, understood the installation
                    requirements in BS 7671 Regulation 421.1.7, and learned how to specify and
                    install Hager AFDD products&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>How I will apply this:</strong> How the learning connects to your
                    current or future work. For example: &ldquo;Will recommend AFDDs on bedroom
                    circuits in future domestic installations where the risk assessment supports
                    their use&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Evidence:</strong> Any supporting documentation &mdash; certificates,
                    attendance confirmations, notes, photographs, or copies of publications read
                  </span>
                </li>
              </ul>

              <p>
                The most common mistake electricians make with CPD logging is recording too little
                detail. An entry that says &ldquo;Attended training. 8 hours.&rdquo; provides no
                evidence of learning. An auditor reviewing this entry cannot determine what you
                studied, what you learned, or how it benefited your professional competence. In
                contrast, a detailed entry that specifies the training provider, the topics covered,
                the key learning points, and the planned application demonstrates genuine
                professional development.
              </p>

              <p>
                The second most common mistake is leaving CPD logging until the end of the year.
                Trying to recall six or twelve months of CPD activities from memory is unreliable
                and produces vague, low-quality entries. The best practice is to log each activity
                within a few days of completing it, while the details are still fresh. This takes
                only a few minutes per entry and produces a far better record than retrospective
                reconstruction.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Example CPD Log Entry</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Date:</strong> 15 March 2026
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Activity:</strong> Studied BS 7671 Amendment 3:2024 (A3:2024),
                      focusing on new Regulation 530.3.201 covering requirements for bidirectional
                      and unidirectional switching and protective devices
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Category:</strong> Self-directed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Duration:</strong> 2 hours
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>What I learned:</strong> A3:2024 introduces Regulation 530.3.201 which
                      requires that where energy can flow in both directions (e.g., solar PV with
                      battery storage exporting to the grid), switching and protective devices must
                      be suitable for bidirectional operation or separate unidirectional devices
                      must be provided for each direction of energy flow. This addresses a gap in
                      the previous edition where standard MCBs and RCDs rated for unidirectional
                      current flow might not provide adequate protection in bidirectional circuits.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>How I will apply this:</strong> I have two upcoming domestic solar PV
                      and battery storage installations. I will review the protection device
                      specifications to ensure they are rated for bidirectional operation or will
                      specify separate unidirectional devices as required by the new regulation. I
                      will also discuss this with my wholesaler to ensure the products they are
                      supplying meet the A3:2024 requirements.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 11: Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">11</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has established that CPD is not an optional extra for electricians but
                a fundamental requirement for maintaining professional competence in a rapidly
                evolving industry. The key points to carry forward are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>CPD is continuous learning</strong> that maintains and develops your
                    professional competence. It includes formal courses, informal reading,
                    on-the-job experience, and self-directed study.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>BS 7671 amendments</strong> (A1:2020, A2:2022, A3:2024) change
                    requirements regularly. Staying current is essential for compliant, safe work.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>New technologies</strong> (EV charging, battery storage, solar PV, smart
                    home systems) require continuous learning to access growing markets.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>ECS card renewal</strong> requires evidence of ongoing competence and
                    professional activity during the card&rsquo;s validity period.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>IET professional registration</strong> (EngTech, IEng, CEng) requires
                    annual CPD covering technical, professional, and personal development.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>NICEIC and NAPIT assessments</strong> test current knowledge and work
                    quality &mdash; ongoing CPD is essential for passing these assessments.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>CITB grants and other funding</strong> can significantly reduce the cost
                    of CPD for both employed and self-employed electricians.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>A CPD plan and log</strong> transform reactive, last-minute compliance
                    into structured, ongoing professional development.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 4, we will explore
                  accountability and support systems &mdash; how to build structures that keep you
                  on track with your goals and CPD commitments, including accountability partners,
                  peer groups, mentoring relationships, and professional networks.
                </p>
              </div>
            </div>
          </div>
        </section>

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
        <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../gs-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../gs-module-4-section-4">
              Next: Accountability &amp; Support Systems
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
