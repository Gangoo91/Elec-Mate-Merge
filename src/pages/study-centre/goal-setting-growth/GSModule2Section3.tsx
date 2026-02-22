import { ArrowLeft, Award, CheckCircle } from 'lucide-react';
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
    id: 'gs-2-3-check1',
    question:
      'An electrician holds a Level 3 Diploma and has completed the AM2 practical assessment. According to the JIB grading structure, they are now eligible for which grade?',
    options: [
      'Graded Electrician &mdash; the AM2 is not required for this grade',
      'Approved Electrician &mdash; the AM2 is the gateway assessment for this grade',
      'Technician &mdash; the AM2 automatically qualifies you for Technician status',
      'Senior Technician &mdash; the AM2 plus Level 3 Diploma is all that is required',
    ],
    correctIndex: 1,
    explanation:
      'The AM2 practical assessment is the gateway to Approved Electrician status within the JIB grading structure. It is a two-day practical assessment (conducted at one of the NET assessment centres across the UK) that tests real-world installation competence including conduit bending, trunking, wiring a consumer unit, fault finding, inspection and testing, and safe isolation. Passing the AM2 &mdash; combined with holding a Level 3 qualification such as the 2365 Diploma &mdash; entitles you to apply for the JIB Approved Electrician grade and the corresponding ECS Gold Card (Installation Electrician). This is a critical career milestone because many employers require Approved Electrician status for higher pay grades, and it is a prerequisite for working unsupervised on many sites. The Technician grade requires additional qualifications beyond the AM2, typically including the 2391 Inspection &amp; Testing qualification.',
  },
  {
    id: 'gs-2-3-check2',
    question:
      'Which qualification is essential for an electrician who wants to carry out periodic inspection and testing of existing electrical installations and issue Electrical Installation Condition Reports (EICRs)?',
    options: [
      'Level 2 Diploma in Electrical Installations (2365) &mdash; this covers all inspection work',
      'City &amp; Guilds 2396 Design and Verification of Electrical Installations',
      'City &amp; Guilds 2391 Inspection and Testing of Electrical Installations',
      'City &amp; Guilds 5357 PAT Testing &mdash; this covers all types of electrical testing',
    ],
    correctIndex: 2,
    explanation:
      'The City &amp; Guilds 2391 (full title: Level 3 Award in Inspection and Testing of Electrical Installations, now often referred to as the 2391-52) is the industry-standard qualification for inspection and testing. It covers the theory, practical skills, and documentation required to carry out initial verification of new installations and periodic inspection of existing installations, including completing Electrical Installation Certificates (EICs) and Electrical Installation Condition Reports (EICRs). While the Level 2 and Level 3 Diplomas include some testing content, they do not provide the depth of inspection and testing knowledge required for independent inspection work. The 2396 covers design and verification, not periodic inspection. The 5357 covers only portable appliance testing, which is a much narrower discipline. The 2391 is widely regarded as one of the most challenging qualifications in the electrical industry, but it is essential for anyone wanting to specialise in inspection and testing or to work towards Qualified Supervisor status with a competent person scheme.',
  },
  {
    id: 'gs-2-3-check3',
    question:
      'An electrician wants to achieve IET EngTech (Engineering Technician) professional registration. Which combination best describes the typical requirements?',
    options: [
      'A Level 3 qualification plus a minimum of one year&rsquo;s experience &mdash; no further assessment needed',
      'A relevant Level 3 or HNC qualification, evidence of professional competence and commitment to CPD, an application reviewed by professional assessors, and often a professional review interview',
      'A university degree in electrical engineering is the minimum requirement for any IET registration',
      'Completion of the AM2 assessment automatically grants EngTech status',
    ],
    correctIndex: 1,
    explanation:
      'IET EngTech (Engineering Technician) registration is a professional qualification awarded by the Institution of Engineering and Technology (IET), licensed by the Engineering Council. It requires applicants to demonstrate that they meet the UK Standard for Professional Engineering Competence (UK-SPEC) at Technician level. This typically involves holding a relevant Level 3 qualification (such as a Level 3 Diploma or HNC in Electrical Installation), providing evidence of professional competence through a detailed application describing your work experience and technical skills, demonstrating commitment to continuing professional development (CPD), and attending a professional review interview where assessors evaluate your competence against the UK-SPEC criteria. It is not automatic &mdash; it requires active engagement with the application process. The benefits include professional recognition, enhanced credibility with clients and employers, use of the post-nominal letters &ldquo;EngTech MIET&rdquo;, and a clear pathway to higher registration levels (IEng, CEng) if you continue to develop.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'How long does it typically take to go from apprentice to Approved Electrician?',
    answer:
      'The typical pathway from apprentice to Approved Electrician takes around four to five years. A standard electrical apprenticeship lasts three to four years (sometimes longer depending on the programme and employer), during which you complete the Level 3 Diploma (2365 or equivalent) and accumulate on-site experience. After completing the apprenticeship, you take the AM2 practical assessment. Some apprentices take the AM2 during their final year; others take it shortly after completing their apprenticeship. Once you pass the AM2 and hold the Level 3 qualification, you can apply for the JIB Approved Electrician grade and the corresponding ECS Gold Card. However, the exact timeline depends on several factors: whether you are on a full apprenticeship or a shorter adult training programme, the speed at which your training provider delivers the qualification, your employer&rsquo;s willingness to support AM2 preparation, and your own readiness for the assessment. Some electricians reach Approved status in three years through accelerated routes; others take six or seven years if they experience delays or take a less direct path.',
  },
  {
    question:
      'Is it worth getting professional registration (EngTech/IEng/CEng) as an electrician?',
    answer:
      'Professional registration offers several tangible benefits. EngTech MIET demonstrates to employers, clients, and colleagues that your skills and knowledge have been independently assessed against a national standard. It differentiates you from the many electricians who hold qualifications but have not pursued professional recognition. For career progression, it opens doors to roles that specifically require or prefer professionally registered engineers, including positions in consulting, project management, and technical management. It also provides a structured framework for CPD that keeps you current with industry developments. For those aspiring to run their own businesses, professional registration adds credibility when tendering for contracts, particularly for commercial and industrial work where clients may ask about professional qualifications. The cost is modest (IET membership plus the registration fee), and the application process, while requiring effort to prepare a thorough competence statement, is a valuable exercise in reflecting on your professional development. Many electricians who have achieved EngTech report that the process of preparing the application &mdash; reviewing their career, identifying their achievements, and articulating their competence &mdash; was itself a worthwhile development activity.',
  },
  {
    question: 'What is the difference between NICEIC, NAPIT, and ELECSA, and which should I join?',
    answer:
      'NICEIC, NAPIT, and ELECSA are all competent person scheme operators approved by the government to authorise electrical contractors to self-certify notifiable work under Part P of the Building Regulations (England and Wales). They perform broadly the same function: they assess your technical competence, inspect a sample of your work at regular intervals, and authorise you to issue building regulations compliance certificates without involving local authority building control. The main differences are in cost, brand recognition, and service. NICEIC is the oldest and most widely recognised, with the largest membership base. Some clients and main contractors specifically require NICEIC registration. NAPIT has grown significantly and offers competitive pricing with a broader range of scheme memberships (not just electrical). ELECSA offers a focused electrical scheme with competitive rates. All three are equally valid for Part P self-certification purposes &mdash; the government treats them identically. When choosing, consider: cost (compare like-for-like, including any hidden fees), the reputation and recognition of each scheme in your particular market (domestic, commercial, social housing), the quality of their technical support helpline, and whether they offer additional benefits such as insurance schemes, marketing support, or free technical publications. Many electricians choose based on whichever assessor or scheme they have the best personal experience with. The important thing is to be registered with at least one competent person scheme before self-certifying any notifiable work.',
  },
  {
    question:
      'I&rsquo;m a qualified electrician thinking about going self-employed. What qualifications do I need beyond my electrical ones?',
    answer:
      'Going self-employed requires both electrical and business competence. On the electrical side, you need as a minimum your Level 3 qualification, the AM2 (for Approved Electrician status), BS 7671 18th Edition, and ideally the 2391 Inspection &amp; Testing qualification. You must also be registered with a competent person scheme (NICEIC, NAPIT, or ELECSA) before you can self-certify notifiable work. Beyond electrical qualifications, you should consider: basic business and financial literacy (understanding invoicing, cash flow, tax obligations including VAT registration, CIS, and self-assessment), public liability insurance and professional indemnity insurance, registration with HMRC as self-employed or formation of a limited company, understanding of health and safety obligations (you may need SSSTS or SMSTS for site work), and potentially the Part P Competent Person Scheme requirements. While there are no formal qualifications required to start a business, many successful electrical contractors recommend investing in short business courses covering bookkeeping, quoting and estimating, marketing, and customer service. The Federation of Master Builders, the Electrical Contractors&rsquo; Association (ECA), and local enterprise partnerships often offer relevant workshops. Planning the transition carefully &mdash; ideally saving six months of expenses, building a client base while still employed, and getting your competent person scheme registration in place before going fully self-employed &mdash; significantly increases your chances of success.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      'In the JIB grading structure, what is the correct order of career progression from entry level to the highest grade?',
    options: [
      'Trainee Electrician &rarr; Graded Electrician &rarr; Approved Electrician &rarr; Technician &rarr; Senior Technician',
      'Electrical Labourer &rarr; Trainee Electrician &rarr; Graded Electrician &rarr; Approved Electrician &rarr; Technician &rarr; Senior Technician',
      'Apprentice &rarr; Approved Electrician &rarr; Graded Electrician &rarr; Technician &rarr; Senior Technician',
      'Electrical Labourer &rarr; Approved Electrician &rarr; Technician &rarr; Senior Technician &rarr; Master Electrician',
    ],
    correctAnswer: 1,
    explanation:
      'The full JIB (Joint Industry Board for the Electrical Contracting Industry) grading structure runs from Electrical Labourer through Trainee Electrician, Graded Electrician, Approved Electrician, Technician, to Senior Technician. Each grade has specific qualification and experience requirements. Electrical Labourer is the entry point for those without electrical qualifications. Trainee Electrician applies during the apprenticeship period. Graded Electrician is for those who have completed a Level 2 qualification but not yet achieved Level 3 and the AM2. Approved Electrician requires Level 3 plus the AM2 assessment. Technician requires additional qualifications such as the 2391 Inspection &amp; Testing. Senior Technician is the highest grade, typically requiring HNC/HND level qualifications plus significant experience. The JIB grades directly link to nationally agreed pay rates, so progression through the grades has a direct impact on earnings.',
  },
  {
    id: 2,
    question:
      'The AM2 practical assessment tests competence across multiple areas. Which of the following is NOT typically assessed in the AM2?',
    options: [
      'Conduit bending and installation',
      'Wiring a consumer unit with RCBOs and circuit protective devices',
      'Designing a three-phase industrial installation from scratch',
      'Fault finding on a prepared circuit with deliberate faults',
    ],
    correctAnswer: 2,
    explanation:
      'The AM2 (Achievement Measurement 2) is a practical assessment, not a design assessment. It tests hands-on installation competence across several key areas: conduit bending and installation, trunking work, wiring a consumer unit or distribution board (including selection and installation of circuit protective devices), cable installation, safe isolation procedures, fault finding on prepared circuits with deliberate faults, and basic inspection and testing. It does NOT include designing installations from scratch &mdash; that is the domain of the 2396 qualification. The AM2 is typically a two-day assessment conducted at a NET (National Electrotechnical Training) assessment centre. Candidates must demonstrate competence to a minimum standard in each area to pass. The assessment is timed, and the work must meet the standards set out in BS 7671 and the relevant installation practices. Many candidates report that time management is one of the biggest challenges, along with the pressure of being assessed in an unfamiliar workshop environment.',
  },
  {
    id: 3,
    question:
      'Which ECS (Electrotechnical Certification Scheme) card colour is associated with a fully qualified Installation Electrician who has passed the AM2?',
    options: [
      'Blue (Apprentice card)',
      'Red (Provisional card)',
      'Gold (Installation Electrician / Approved Electrician)',
      'Black (Senior Technician / Engineering Technician)',
    ],
    correctAnswer: 2,
    explanation:
      'The ECS (Electrotechnical Certification Scheme) card system uses colour coding to identify the qualification level of card holders. The Gold card is issued to fully qualified Installation Electricians who hold a Level 3 qualification and have passed the AM2 practical assessment &mdash; corresponding to the JIB Approved Electrician grade. The Blue card is for registered apprentices who are currently undertaking their training. The Red (Provisional) card is issued to those who hold some qualifications but have not yet achieved full Installation Electrician status. The Black card is for those holding higher-level qualifications such as HNC/HND or degree-level qualifications, corresponding to Technician or Engineering Technician grades. There are also white cards (Labourer), and various specialist cards for specific disciplines. The ECS card serves as the electrical industry&rsquo;s standard competence identification and is required for access to many construction sites, similar to the CSCS card used in the wider construction industry.',
  },
  {
    id: 4,
    question:
      'An electrician wants to specialise in periodic inspection and testing of existing installations. They already hold the Level 3 Diploma. What is the most appropriate next qualification?',
    options: [
      'City &amp; Guilds 2396 Design and Verification &mdash; this covers all testing work',
      'City &amp; Guilds 2391 Inspection and Testing of Electrical Installations',
      'City &amp; Guilds 5357 PAT Testing &mdash; this covers all types of testing',
      'City &amp; Guilds 2919 Electric Vehicle Charging Equipment Installation',
    ],
    correctAnswer: 1,
    explanation:
      'The City &amp; Guilds 2391 (Level 3 Award in Inspection and Testing of Electrical Installations) is the specific qualification designed for electricians who want to carry out initial verification of new installations and periodic inspection of existing installations. It covers the theory and practical skills required to inspect, test, and report on electrical installations in accordance with BS 7671, including understanding the sequence of tests, interpreting results, identifying defects, coding observations, and completing Electrical Installation Certificates (EICs) and Electrical Installation Condition Reports (EICRs). The 2396 covers design and verification, which is a different discipline focused on designing installations rather than inspecting existing ones. The 5357 covers only portable appliance testing, which is a narrow specialism. The 2919 covers EV charging installation, which is unrelated to periodic inspection. The 2391 is widely considered one of the most important qualifications an electrician can hold after the Level 3 Diploma and AM2, because inspection and testing work is in high demand and commands premium rates.',
  },
  {
    id: 5,
    question:
      'What is the primary purpose of registering with a competent person scheme such as NICEIC, NAPIT, or ELECSA?',
    options: [
      'To obtain a higher JIB grading and increased pay rate',
      'To gain the legal authority to self-certify notifiable electrical work under Part P of the Building Regulations without involving local authority building control',
      'To qualify for IET EngTech professional registration automatically',
      'To receive a free subscription to BS 7671 and all associated guidance notes',
    ],
    correctAnswer: 1,
    explanation:
      'The primary purpose of competent person scheme registration is to authorise electrical contractors to self-certify notifiable electrical work under Part P of the Building Regulations (England and Wales). Part P requires that certain types of electrical work in dwellings (such as new circuits, consumer unit changes, work in bathrooms and kitchens, and work in special locations) must either be carried out by a registered competent person or notified to and inspected by local authority building control. Registration with a competent person scheme (NICEIC, NAPIT, ELECSA, or others) allows electricians to self-certify their work, issue building regulations compliance certificates directly to homeowners, and avoid the delays and costs associated with building control notification. The scheme operators assess applicants&rsquo; technical competence, inspect a sample of completed work at regular intervals, and require evidence of appropriate qualifications, insurance, and equipment. Scheme registration does not directly affect JIB grading (though the qualifications required often overlap), does not automatically grant IET registration, and does not include free publications &mdash; although many schemes offer technical helplines and some discounted resources.',
  },
  {
    id: 6,
    question:
      'An electrician is considering the transition from employment to self-employment. Which of the following represents the most prudent approach to this transition?',
    options: [
      'Resign immediately, register as self-employed with HMRC, and start advertising for clients',
      'Build a client base and financial reserve while still employed, obtain competent person scheme registration, arrange insurance, and plan a phased transition',
      'Wait until you are made redundant &mdash; self-employment should only be considered when you have no other option',
      'Skip competent person scheme registration initially to reduce costs, and register once the business is profitable',
    ],
    correctAnswer: 1,
    explanation:
      'The most prudent approach to transitioning from employment to self-employment is a planned, phased transition. This involves: building a client base through word-of-mouth, referrals, and reputation while still in employment; saving a financial reserve (typically recommended at least three to six months of living expenses) to cover the period before income becomes consistent; obtaining competent person scheme registration (NICEIC, NAPIT, or ELECSA) before starting, because without it you cannot legally self-certify notifiable work; arranging public liability insurance and professional indemnity insurance; registering with HMRC as self-employed or forming a limited company; setting up basic business systems (invoicing, bookkeeping, client records); and understanding your tax obligations including self-assessment, National Insurance, VAT thresholds, and Construction Industry Scheme (CIS) requirements. Skipping competent person scheme registration is not a cost-saving measure &mdash; it is a legal risk that could result in enforcement action and reputational damage. The transition from employed to self-employed is one of the most significant career decisions an electrician can make, and thorough preparation significantly increases the likelihood of success.',
  },
  {
    id: 7,
    question:
      'The City &amp; Guilds 2919 qualification covers which growing specialism in the electrical industry?',
    options: [
      'Solar photovoltaic panel installation and maintenance',
      'Fire alarm system design, installation, and commissioning',
      'Electric vehicle charging equipment installation',
      'Data and communications cabling (Category 5e/6/6A)',
    ],
    correctAnswer: 2,
    explanation:
      'The City &amp; Guilds 2919 (Level 3 Award in Electric Vehicle Charging Equipment Installation) covers the installation of electric vehicle (EV) charging points. This is one of the fastest-growing specialisms in the electrical industry, driven by the UK government&rsquo;s commitment to phasing out new petrol and diesel car sales and the rapid increase in EV ownership. The qualification covers the types of EV charging equipment available (Mode 1 through Mode 4, covering everything from standard domestic sockets to rapid DC charging), the electrical requirements for EV charging installations (including earthing arrangements, circuit protection, cable sizing, and PME considerations), relevant regulations and standards (BS 7671 Section 722, IET Code of Practice for Electric Vehicle Charging Equipment Installation), and the practical skills required to install, commission, and certify charging installations. Electricians who obtain this qualification can access the growing domestic and commercial EV charging market. With the OZEV (Office for Zero Emission Vehicles) grant scheme driving demand, qualified EV installers are in high demand across the UK.',
  },
  {
    id: 8,
    question:
      'The National Careers Service Skills Health Check is a free online tool. What is its primary purpose and how can it benefit an electrician considering career development?',
    options: [
      'It is a formal assessment that results in a nationally recognised qualification',
      'It is a diagnostic tool that helps you identify your existing skills, interests, and potential career directions by assessing your strengths across multiple areas',
      'It is an employer-facing tool that generates a CV automatically based on your qualifications',
      'It is a mandatory assessment required before enrolling on any government-funded training course',
    ],
    correctAnswer: 1,
    explanation:
      'The National Careers Service Skills Health Check is a free online self-assessment tool provided by the UK government. It is not a formal qualification or mandatory assessment &mdash; it is a diagnostic tool designed to help individuals identify their existing skills, personal strengths, preferred working styles, and potential career directions. The assessment covers areas such as numerical ability, verbal reasoning, problem-solving, communication, teamwork, and personal effectiveness. For electricians considering career development, it can be valuable in several ways: it provides an objective view of your skills beyond just your electrical qualifications, it may highlight strengths you had not considered (for example, strong communication skills that would suit a training or supervisory role), it can suggest career directions aligned with your profile (such as project management, consulting, or specialist technical roles), and it serves as a starting point for goal-setting conversations. The tool is available at nationalcareers.service.gov.uk and takes approximately 30 to 45 minutes to complete. It is particularly useful for electricians at decision points in their career &mdash; such as whether to specialise, move into management, or start a business.',
  },
];

export default function GSModule2Section3() {
  useSEO({
    title: 'Career Goals for Electricians | Goal Setting & Growth Module 2.3',
    description:
      'JIB career pathway, ECS card types, qualification milestones, professional registration, competent person schemes, specialisation paths, and career transitions for electricians.',
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
            <Link to="../gs-module-2">
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
            <Award className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 2 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Career Goals for Electricians
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            The JIB career pathway, ECS card system, qualification milestones, professional
            registration, competent person schemes, specialisation paths, and the journey from
            employed to self-employed
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>JIB grades:</strong> Labourer &rarr; Trainee &rarr; Graded &rarr; Approved
                &rarr; Technician &rarr; Senior Technician
              </li>
              <li>
                <strong>Key milestones:</strong> Level 3 Diploma, AM2, 2391 Inspection &amp;
                Testing, BS 7671 18th Edition
              </li>
              <li>
                <strong>Professional registration:</strong> IET EngTech, IEng, CEng &mdash;
                independent recognition of your competence
              </li>
              <li>
                <strong>Specialisations:</strong> EV charging, fire alarm, testing, design,
                renewables, data/comms
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Pay progression:</strong> Each JIB grade increase brings a nationally agreed
                pay rise
              </li>
              <li>
                <strong>Employability:</strong> More qualifications open more doors and command
                higher rates
              </li>
              <li>
                <strong>Independence:</strong> The right qualifications and registration enable
                self-employment
              </li>
              <li>
                <strong>Future-proofing:</strong> Specialisation protects against market changes and
                increases demand for your skills
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Describe the full JIB grading structure from Electrical Labourer to Senior Technician',
              'Identify the key ECS card types and what each colour and grade represents',
              'Explain the role of the AM2 practical assessment as the gateway to Approved Electrician status',
              'List the major qualification milestones including 2391, 2396, 2919, 5357, and BS 7671',
              'Describe the IET professional registration pathway from EngTech through IEng to CEng',
              'Compare competent person schemes (NICEIC, NAPIT, ELECSA) and explain their purpose',
              'Identify at least six specialisation paths available to qualified electricians',
              'Outline the key considerations for transitioning from employment to self-employment',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The JIB Career Pathway */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            The JIB Career Pathway
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Joint Industry Board for the Electrical Contracting Industry (JIB) provides the
                standard grading structure for electricians working in the UK electrical contracting
                sector. Understanding this structure is essential for setting meaningful career
                goals because each grade carries specific qualification requirements, experience
                expectations, and &mdash; crucially &mdash; nationally agreed pay rates. The JIB
                grades form a clear ladder that every electrician can climb, provided they invest in
                the right qualifications and experience at each stage.
              </p>

              <p>
                <strong>Electrical Labourer</strong> is the entry point for those without formal
                electrical qualifications. Labourers assist qualified electricians with tasks such
                as chasing walls, pulling cables, carrying materials, and preparing work areas.
                While this grade does not require electrical qualifications, it provides invaluable
                exposure to the trade and is the starting point for many who later pursue
                apprenticeships. The JIB nationally agreed rate for Electrical Labourers is the
                lowest on the scale, reflecting the entry-level nature of the role. However, it is
                an honest starting point, and many successful electricians began here.
              </p>

              <p>
                <strong>Trainee Electrician</strong> applies during the apprenticeship period. Once
                you are enrolled on a recognised electrical apprenticeship programme and registered
                with the JIB, you move from Labourer to Trainee Electrician. This grade recognises
                that you are actively developing your skills and knowledge under supervision. The
                pay rate increases from the Labourer rate, with further increases in each year of
                the apprenticeship (typically Year 1, Year 2, Year 3, and Year 4 rates). The Trainee
                grade is maintained throughout the apprenticeship until you achieve the
                qualifications required for the next level.
              </p>

              <p>
                <strong>Graded Electrician</strong> is for those who have completed a Level 2
                qualification in electrical installations (such as the City &amp; Guilds 2365 Level
                2 Diploma) but have not yet achieved Level 3 and the AM2 assessment. This grade
                recognises partial qualification and provides a pay rate above the Trainee level.
                Some electricians remain at this grade if they leave their apprenticeship after
                Level 2 without completing Level 3, though this is not recommended as it limits
                career progression significantly. The Graded Electrician can carry out electrical
                work but typically under a higher level of supervision than an Approved Electrician,
                and they cannot independently certify their own work.
              </p>

              <p>
                <strong>Approved Electrician</strong> is the grade that most electricians aspire to
                as their primary career goal. It requires completion of the Level 3 Diploma (or
                equivalent, such as the NVQ Level 3 in Electrotechnical Services) and successful
                completion of the AM2 practical assessment. This is the grade at which you are
                considered a fully qualified electrician, capable of working independently and
                unsupervised. The JIB nationally agreed rate for Approved Electricians represents a
                significant step up from Graded Electrician. Many employers use the Approved
                Electrician rate as the baseline for fully qualified staff, and some add premiums
                for additional qualifications, experience, or responsibilities. The Approved
                Electrician grade is also the minimum typically required for registration with a
                competent person scheme (NICEIC, NAPIT, ELECSA) and for obtaining the ECS Gold Card.
              </p>

              <p>
                <strong>Technician</strong> represents the next level above Approved Electrician and
                requires additional qualifications beyond the Level 3 Diploma and AM2. The specific
                requirements include holding qualifications such as the 2391 Inspection &amp;
                Testing, 2396 Design and Verification, or equivalent higher-level qualifications.
                Technicians are expected to have deeper technical knowledge than Approved
                Electricians, including the ability to design installations, carry out complex
                inspection and testing, interpret technical specifications, and mentor less
                experienced colleagues. The JIB Technician rate is higher than the Approved
                Electrician rate, reflecting the additional competence and responsibility. This
                grade is a natural progression for electricians who want to develop beyond
                installation work into inspection, design, or technical management.
              </p>

              <p>
                <strong>Senior Technician</strong> is the highest grade in the JIB structure. It
                typically requires an HNC, HND, or degree-level qualification in electrical
                engineering or a related discipline, combined with significant professional
                experience and a broad range of technical competence. Senior Technicians are
                expected to have expertise across multiple areas of the trade, including design,
                installation, inspection, testing, commissioning, and fault diagnosis. They may also
                hold professional registration (EngTech, IEng, or CEng) with the IET or another
                relevant institution. The Senior Technician rate is the highest on the JIB pay
                scale, reflecting the advanced level of qualification and competence. Relatively few
                electricians reach this grade, making it a distinction that carries significant
                weight in the industry.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  JIB Pay Progression &mdash; Why It Matters
                </p>
                <p className="text-base text-white leading-relaxed">
                  The JIB nationally agreed rates are not just guidelines &mdash; they are the
                  contractual pay rates for electricians employed by JIB-registered employers. Each
                  grade increase brings a meaningful pay rise. Over a career, the difference between
                  remaining at Graded Electrician and progressing to Technician or Senior Technician
                  can amount to tens of thousands of pounds in additional earnings. Additionally,
                  many employers pay above the JIB rate for in-demand specialisms or in high-cost
                  areas such as London (which has a separate JIB London rate). Setting career goals
                  aligned with JIB grade progression is one of the most directly rewarding forms of
                  goal setting an electrician can undertake, because the link between qualification
                  achievement and pay increase is explicit and contractual.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: ECS Card Types */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            ECS Card Types &mdash; Your Industry Identity
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Electrotechnical Certification Scheme (ECS) card is the electrical
                industry&rsquo;s standard competence identification card, similar in function to the
                CSCS card used in the wider construction industry. It provides a quick, visual way
                for employers, site managers, and clients to verify that an individual holds the
                qualifications and competence appropriate to their role. Most major construction
                sites now require workers to hold a valid ECS card for site access, making it an
                essential item for any working electrician.
              </p>

              <p>
                The ECS card system uses colour coding to indicate the holder&rsquo;s qualification
                level and competence grade. Understanding the card colours and what they represent
                helps you set clear goals for your career progression, because moving from one card
                colour to the next is a tangible, visible marker of advancement.
              </p>

              <p>
                <strong>White Card &mdash; Electrical Labourer:</strong> Issued to those registered
                as Electrical Labourers with the JIB. This card confirms that the holder has
                completed health and safety awareness training (typically the CSCS Health, Safety
                and Environment test) but does not hold formal electrical qualifications. It permits
                access to sites for labouring and assisting roles only.
              </p>

              <p>
                <strong>Blue Card &mdash; Apprentice:</strong> Issued to individuals registered on a
                recognised electrical apprenticeship programme. The Blue card identifies the holder
                as a learner who is actively developing their skills under supervision. It is
                renewed annually and updated as the apprentice progresses through their training
                programme. The Blue card is a proud marker of commitment to the trade &mdash; it
                says &ldquo;I am actively investing in my future as an electrician&rdquo;.
              </p>

              <p>
                <strong>Red Card &mdash; Provisional:</strong> Issued to those who hold some
                electrical qualifications but have not yet achieved the full requirements for
                Installation Electrician status. This might include those who have completed Level 2
                but not Level 3, or those who hold Level 3 but have not yet passed the AM2
                assessment. The Red card recognises partial qualification and allows site access,
                but it signals that the holder is not yet fully qualified.
              </p>

              <p>
                <strong>Gold Card &mdash; Installation Electrician (Approved Electrician):</strong>{' '}
                This is the card that most apprentices and trainees work towards as their primary
                career goal. The Gold card is issued to those who hold a Level 3 qualification in
                electrical installation and have passed the AM2 practical assessment. It corresponds
                to the JIB Approved Electrician grade and identifies the holder as a fully qualified
                electrician, competent to work independently. The Gold card is widely recognised
                across the industry and is often a minimum requirement for employment at the
                Approved Electrician pay rate. Achieving the Gold card is one of the most
                significant milestones in an electrician&rsquo;s career.
              </p>

              <p>
                <strong>Gold Card &mdash; Qualified Supervisor:</strong> A variant of the Gold card
                issued to electricians who have been assessed and approved as Qualified Supervisors
                by a competent person scheme (NICEIC, NAPIT, or ELECSA). The Qualified Supervisor is
                the named individual responsible for the technical standard of work carried out by a
                registered electrical contractor. This card reflects a higher level of
                responsibility and typically requires additional qualifications such as the 2391
                Inspection &amp; Testing qualification, plus assessment by the scheme operator.
              </p>

              <p>
                <strong>Black Card &mdash; Engineering Technician / Senior Technician:</strong> The
                Black card is issued to those holding higher-level qualifications such as HNC, HND,
                or degree-level qualifications in electrical engineering. It corresponds to the JIB
                Technician and Senior Technician grades. Holders of the Black card are recognised as
                having advanced technical competence and are typically involved in design, project
                management, inspection, or technical leadership roles.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  ECS Card Renewal and Continuing Competence
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      ECS cards are valid for a set period (typically five years for full cards) and
                      must be renewed before expiry
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Renewal requires evidence of continuing professional development (CPD) and a
                      current BS 7671 qualification
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Allowing your card to lapse can prevent site access and may require
                      re-assessment to renew
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Setting a calendar reminder six months before expiry is a simple but effective
                      goal to prevent disruption to your work
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Qualification Milestones */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Key Qualification Milestones
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The electrical industry has a well-defined structure of qualifications that map
                directly to career progression. Understanding which qualifications you need &mdash;
                and in what order to pursue them &mdash; is essential for setting effective career
                goals. Each qualification opens specific doors, and the strategic sequencing of your
                qualifications can significantly accelerate your career development.
              </p>

              <p>
                <strong>
                  Level 2 Diploma in Electrical Installations (2365-02) &mdash; The Foundation:
                </strong>{' '}
                This is typically the first formal electrical qualification, covering the
                fundamental principles of electrical science, health and safety, installation
                methods and practices, and an introduction to electrical systems and equipment.
                Level 2 provides the theoretical foundation upon which all subsequent learning is
                built. It covers topics including basic electrical theory (voltage, current,
                resistance, Ohm&rsquo;s law, power), wiring systems and enclosures, earthing and
                bonding principles, circuit protection, and safe working practices. For apprentices,
                Level 2 is completed during the first phase of the apprenticeship, typically in
                years one and two. It is the minimum qualification required for the JIB Graded
                Electrician grade.
              </p>

              <p>
                <strong>
                  Level 3 Diploma in Electrical Installations (2365-03) &mdash; Full Qualification:
                </strong>{' '}
                The Level 3 Diploma builds substantially on Level 2 and covers advanced electrical
                principles, complex installation techniques, inspection and testing fundamentals,
                and fault diagnosis. Level 3 topics include three-phase systems, motor control,
                lighting design, fire alarm and emergency lighting systems, special locations
                (bathrooms, swimming pools, construction sites), earthing system design, and
                detailed cable selection and sizing calculations. This is the qualification that,
                combined with the AM2 practical assessment, qualifies you as a fully competent
                Installation Electrician (JIB Approved Electrician). The Level 3 Diploma is
                significantly more challenging than Level 2 &mdash; the theory is deeper, the
                practical expectations are higher, and the assessment is more rigorous. Many
                apprentices find the transition from Level 2 to Level 3 demanding, but it is a
                critical investment in long-term career capability.
              </p>

              <p>
                <strong>
                  AM2 Practical Assessment &mdash; The Gateway to Approved Electrician:
                </strong>{' '}
                The AM2 (Achievement Measurement 2) is a two-day practical assessment conducted at
                NET (National Electrotechnical Training) assessment centres across the UK. It is the
                industry&rsquo;s standard practical competence test and the gateway to the JIB
                Approved Electrician grade and the ECS Gold Card. The AM2 assesses hands-on
                competence across multiple areas: conduit bending and installation (including
                setting-out, measuring, and producing neat, accurate bends), trunking work, wiring
                and terminating a consumer unit or distribution board (including correct selection
                and installation of RCBOs, MCBs, and RCDs), cable installation and termination, safe
                isolation procedures, fault finding on prepared circuits with deliberate faults, and
                basic inspection and testing. The assessment is timed, and candidates must
                demonstrate competence to a minimum standard in each area. Preparation is essential
                &mdash; many training providers offer dedicated AM2 preparation courses, and
                self-preparation using the AM2 criteria documents (available from NET) is strongly
                recommended.
              </p>

              <p>
                <strong>
                  City &amp; Guilds 2391 Inspection &amp; Testing &mdash; Essential for Inspection
                  Work:
                </strong>{' '}
                The 2391 (now formally the Level 3 Award in the Initial and Periodic Inspection and
                Testing of Electrical Installations, often referred to as 2391-52) is widely
                regarded as one of the most important qualifications an electrician can hold after
                the Level 3 Diploma and AM2. It covers the complete inspection and testing process:
                understanding the purpose and legal requirements for inspection, planning and
                carrying out the sequence of tests (continuity of protective conductors, insulation
                resistance, polarity, earth fault loop impedance, RCD operation, prospective fault
                current), interpreting test results, identifying defects and coding them
                appropriately, and completing the required documentation (Electrical Installation
                Certificates and Electrical Installation Condition Reports). The 2391 is essential
                for anyone wanting to carry out periodic inspection of existing installations
                (EICRs), and it is a requirement for Qualified Supervisor status with most competent
                person schemes. It is also a stepping stone towards the JIB Technician grade. Many
                electricians find the 2391 to be the most challenging qualification they have
                attempted, but also the most rewarding in terms of the doors it opens.
              </p>

              <p>
                <strong>
                  City &amp; Guilds 2396 Design and Verification &mdash; For Designers:
                </strong>{' '}
                The 2396 (Level 4 Award in the Design and Verification of Electrical Installations)
                covers the design side of electrical work. This includes understanding client
                requirements, assessing the characteristics of the supply, selecting appropriate
                wiring systems, sizing cables for current-carrying capacity and voltage drop,
                selecting and coordinating protective devices for overload and fault protection,
                designing earthing and bonding arrangements, and producing compliant design
                documentation. The 2396 is aimed at electricians who want to move into design roles,
                project management, or consulting. It requires a strong grasp of BS 7671 and the
                ability to apply it in complex, real-world design scenarios. Combined with the 2391,
                it provides a comprehensive skill set that covers the full lifecycle of an
                electrical installation from design through to inspection and certification.
              </p>

              <p>
                <strong>
                  City &amp; Guilds 5357 PAT Testing &mdash; Portable Appliance Testing:
                </strong>{' '}
                The 5357 (Level 3 Award in the In-Service Inspection and Testing of Electrical
                Equipment) covers the inspection and testing of portable and transportable
                electrical equipment &mdash; commonly known as PAT testing. While sometimes
                dismissed as a basic qualification, PAT testing is a legitimate and profitable
                specialism. The qualification covers the legal requirements for appliance testing,
                types of equipment and their risk categories, visual inspection techniques, the
                testing process (earth continuity, insulation resistance, functional checks),
                interpreting results, and maintaining records. PAT testing services are in demand
                from landlords, offices, schools, and commercial premises, and the work can be
                carried out alongside other electrical work or as a standalone service. For
                electricians building a self-employed business, PAT testing can provide a steady
                stream of regular, repeat income.
              </p>

              <p>
                <strong>City &amp; Guilds 2919 EV Charging &mdash; Growing Specialism:</strong> The
                2919 (Level 3 Award in Electric Vehicle Charging Equipment Installation) covers the
                installation of EV charging points. This is one of the fastest-growing areas of the
                electrical industry, driven by the UK government&rsquo;s net zero commitments, the
                ban on new petrol and diesel car sales, and the rapid increase in EV ownership. The
                qualification covers EV charging modes (Mode 1 through Mode 4), the types of
                charging equipment available, electrical requirements (including earthing
                arrangements, PME considerations, circuit protection, and cable sizing), relevant
                regulations and standards (BS 7671 Section 722, IET Code of Practice), OZEV (Office
                for Zero Emission Vehicles) grant scheme requirements, and practical installation
                and commissioning skills. Electricians qualified in EV charging installation are in
                high demand, and the specialism commands premium rates. This is an excellent example
                of how a targeted qualification goal can significantly increase your earning
                potential and market relevance.
              </p>

              <p>
                <strong>
                  BS 7671 18th Edition (Wiring Regulations) &mdash; Required Knowledge for All:
                </strong>{' '}
                BS 7671:2018+A2:2022 (with amendment A3:2024) is the national standard for
                electrical installation in the UK. Every working electrician must hold a current BS
                7671 qualification, which is typically renewed with each new edition or amendment.
                The BS 7671 qualification is not a practical skills qualification &mdash; it is a
                knowledge-based assessment that tests your understanding of the regulations
                governing electrical installation design, construction, inspection, testing, and
                maintenance. Keeping your BS 7671 qualification current is not optional &mdash; it
                is a basic requirement for ECS card renewal, competent person scheme registration,
                and professional credibility. When a new edition or amendment is published, updating
                your qualification should be an immediate career goal.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Strategic Qualification Planning
                </p>
                <p className="text-base text-white leading-relaxed">
                  The most effective approach to qualifications is strategic sequencing. A common
                  and well-proven pathway is: Level 2 &rarr; Level 3 &rarr; AM2 &rarr; BS 7671
                  &rarr; 2391 Inspection &amp; Testing &rarr; then one or more specialist
                  qualifications (2396 Design, 2919 EV, 5357 PAT) depending on your chosen career
                  direction. Each qualification builds on the previous one, and completing them in
                  this order ensures you have the foundation needed for each subsequent step.
                  Setting a target date for each qualification creates a clear, measurable career
                  development timeline.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Professional Registration */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Professional Registration &mdash; IET EngTech, IEng, CEng
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Professional registration is an often-overlooked career goal for electricians, but
                it provides significant benefits in terms of credibility, recognition, and career
                advancement. The Institution of Engineering and Technology (IET) is the primary
                professional body for the electrical and electronics engineering sector in the UK,
                and it is licensed by the Engineering Council to award professional registration at
                three levels: Engineering Technician (EngTech), Incorporated Engineer (IEng), and
                Chartered Engineer (CEng).
              </p>

              <p>
                <strong>EngTech MIET &mdash; Engineering Technician:</strong> This is the most
                accessible level of professional registration for electricians and is achievable for
                anyone holding a Level 3 qualification with sufficient professional experience. To
                apply for EngTech, you need to demonstrate competence against the UK Standard for
                Professional Engineering Competence (UK-SPEC) at Technician level. This involves
                completing an application form that describes your qualifications, work experience,
                and technical competence, supported by evidence of continuing professional
                development (CPD). Your application is reviewed by professional assessors, and you
                may be invited to attend a professional review interview where you discuss your
                experience and demonstrate your competence. Successful applicants are awarded the
                title &ldquo;EngTech MIET&rdquo; (Engineering Technician, Member of the IET), which
                they can use after their name. The benefits include: professional recognition that
                is independent of your employer, enhanced credibility with clients and colleagues, a
                structured CPD framework, access to IET resources and networking opportunities, and
                a clear pathway to higher registration levels.
              </p>

              <p>
                <strong>IEng MIET &mdash; Incorporated Engineer:</strong> The next level of
                professional registration, IEng is aimed at engineers who maintain and manage
                applications of current and developing technology, and who may be involved in
                design, development, manufacture, construction, or operation. For electricians, IEng
                typically requires an HNC/HND or foundation degree in a relevant discipline (or
                equivalent combination of qualifications and experiential learning), plus
                substantial professional experience demonstrating competence at a higher level than
                EngTech. IEng holders are expected to demonstrate the ability to apply engineering
                knowledge to solve technical problems, to manage projects and resources, and to
                exercise independent professional judgement. This level of registration is
                well-suited to electricians who have progressed into design, project management,
                consulting, or technical leadership roles.
              </p>

              <p>
                <strong>CEng MIET &mdash; Chartered Engineer:</strong> The highest level of
                professional registration, CEng is aimed at engineers who develop solutions to
                engineering problems using new or existing technologies through innovation,
                creativity, and change. It typically requires a degree-level qualification (BEng or
                MEng) plus significant professional experience at a senior technical level. While
                CEng may seem out of reach for many electricians, it is important to know that it
                exists as a long-term aspiration. Some electricians who began as apprentices have
                achieved CEng through a combination of further education (part-time degrees, Open
                University), professional experience, and sustained CPD. The journey from apprentice
                to Chartered Engineer is long but not impossible, and it represents the ultimate
                professional recognition in the engineering field.
              </p>

              <p>
                The process of applying for professional registration &mdash; reviewing your career,
                articulating your competence, identifying your development needs &mdash; is itself a
                valuable goal-setting exercise. Many electricians who go through the process report
                that it gave them a clearer understanding of their strengths, their gaps, and their
                future direction. Even if you are not ready to apply immediately, understanding the
                requirements and setting it as a medium-term goal provides a powerful framework for
                your professional development.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  How to Get Started with IET Registration
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Join the IET:</strong> Membership is the first step. You can join at
                      an appropriate grade based on your qualifications and experience
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Understand UK-SPEC:</strong> Read the competence standards for EngTech
                      so you know what is expected before you apply
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Gather evidence:</strong> Start documenting your work, projects,
                      problems solved, and learning activities &mdash; you will need these for your
                      application
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Find a mentor or supporter:</strong> The IET offers mentoring for
                      applicants, and having a professionally registered colleague support your
                      application is invaluable
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Maintain CPD:</strong> Start recording your continuing professional
                      development now &mdash; courses attended, articles read, skills practised,
                      problems solved
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Competent Person Schemes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Competent Person Schemes &mdash; NICEIC, NAPIT, ELECSA
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Competent person schemes are a critical part of the UK electrical industry
                landscape, and registration with a scheme is an essential career goal for any
                electrician who wants to self-certify notifiable electrical work. Understanding what
                these schemes are, how they work, and when to pursue registration is fundamental to
                effective career planning.
              </p>

              <p>
                The background is this: Part P of the Building Regulations (England and Wales)
                requires that certain types of electrical work in domestic premises must be either
                carried out by a person registered with a government-approved competent person
                scheme, or notified to and inspected by the local authority building control
                department. Notifiable work includes: the installation of a new circuit, the
                replacement of a consumer unit, electrical work in bathrooms and other special
                locations, and electrical work associated with new building work. The purpose of
                this regulation is to ensure that electrical work in homes meets minimum safety
                standards. Competent person schemes provide the mechanism by which individual
                electricians and electrical contractors can demonstrate their competence and
                self-certify their work without the need for local authority inspection.
              </p>

              <p>
                <strong>
                  NICEIC (National Inspection Council for Electrical Installation Contracting)
                </strong>{' '}
                is the oldest and most widely recognised competent person scheme in the UK. Founded
                in 1956, NICEIC has built a strong brand that is recognised by many consumers and
                main contractors. NICEIC offers several levels of registration: Domestic Installer
                (for domestic work only), Approved Contractor (for domestic, commercial, and
                industrial work), and various specialist schemes. The assessment process involves a
                technical assessment of the principal duty holder (typically the Qualified
                Supervisor), inspection of a sample of completed work, and checks on qualifications,
                insurance, and equipment. NICEIC registration carries strong brand value &mdash;
                some main contractors and housing associations require NICEIC registration
                specifically, and many consumers recognise the NICEIC logo and associate it with
                quality.
              </p>

              <p>
                <strong>NAPIT (National Association of Professional Inspectors and Testers)</strong>{' '}
                has grown significantly in recent years and offers competitive pricing with a broad
                range of scheme memberships covering not just electrical work but also gas,
                plumbing, ventilation, and renewable energy. NAPIT&rsquo;s assessment process is
                similar to NICEIC&rsquo;s: technical assessment, work inspection, qualification
                checks. NAPIT is particularly popular with smaller contractors and sole traders due
                to its competitive pricing structure and responsive customer service. It is equally
                valid as NICEIC for Part P self-certification purposes.
              </p>

              <p>
                <strong>ELECSA</strong> is a focused electrical competent person scheme that offers
                straightforward registration with competitive rates. ELECSA&rsquo;s assessment
                process follows the same government-approved framework as NICEIC and NAPIT. It is a
                popular choice for electricians who want a no-frills competent person scheme
                registration at a competitive price. ELECSA merged with NICEIC under the Certsure
                brand but continues to operate as a separate scheme.
              </p>

              <p>
                For career goal setting, the key question is: when should you pursue competent
                person scheme registration? The typical answer is: when you are ready to work
                independently and self-certify your own work, which usually means you have achieved
                Approved Electrician status (Level 3 plus AM2), hold a current BS 7671
                qualification, ideally hold the 2391 Inspection &amp; Testing qualification, and
                have appropriate public liability insurance and test equipment. If you are employed,
                your employer may already be registered with a scheme, meaning you can carry out
                notifiable work under their registration. However, if you are self-employed or
                planning to become self-employed, your own scheme registration is essential. Setting
                &ldquo;achieve competent person scheme registration&rdquo; as a specific career
                goal, with a target date and a clear plan for meeting the requirements, is one of
                the most practical goals an electrician can set.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  The Qualified Supervisor Role
                </p>
                <p className="text-base text-white leading-relaxed">
                  Every registered electrical contractor must have at least one named Qualified
                  Supervisor (QS) &mdash; the individual who is personally responsible for the
                  technical standard of the work carried out by the business. The QS must
                  demonstrate a high level of technical competence, typically evidenced by holding
                  the Level 3 Diploma, AM2, 2391 Inspection &amp; Testing, and current BS 7671. The
                  QS is assessed by the scheme operator and must maintain their competence through
                  CPD. Becoming a Qualified Supervisor is a significant career milestone that
                  carries both professional recognition and personal responsibility. For employed
                  electricians, the QS role often comes with additional pay. For self-employed
                  electricians, it is a requirement for operating under a competent person scheme.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Specialisation Paths */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Specialisation Paths &mdash; Finding Your Niche
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the great strengths of the electrical industry is the breadth of
                specialisation paths available. Once you have achieved your core qualifications
                (Level 3, AM2, BS 7671), you have a platform from which to specialise in one or more
                areas that align with your interests, strengths, and market demand. Choosing a
                specialisation &mdash; or a combination of specialisations &mdash; is a major career
                decision that should be informed by self-assessment, market research, and strategic
                goal setting.
              </p>

              <p>
                <strong>Domestic Installation:</strong> The most common starting point for many
                electricians, domestic work covers rewires, consumer unit upgrades, additional
                circuits, lighting design, heating controls, garden electrics, and general
                maintenance in houses and flats. Domestic work requires competent person scheme
                registration for self-certification of notifiable work. The advantages include:
                steady demand (people always need electrical work done in their homes), relatively
                low barriers to entry, and the ability to work independently as a sole trader. The
                challenges include: price competition, customer expectations, and the administrative
                burden of Part P certification. Domestic specialists who also offer EV charging
                installation, smart home integration, and renewable energy systems can differentiate
                themselves and command higher rates.
              </p>

              <p>
                <strong>Commercial Installation:</strong> Commercial work covers offices, shops,
                restaurants, hotels, schools, healthcare facilities, and other non-domestic
                premises. It typically involves larger-scale installations, three-phase systems,
                more complex distribution arrangements, and compliance with additional regulations
                beyond Part P (such as fire safety, emergency lighting requirements, and energy
                efficiency standards). Commercial electricians often work as employees of larger
                electrical contractors rather than as sole traders, and the pay rates tend to be
                higher than domestic work. The pathway to commercial work typically involves gaining
                experience with a commercial contractor, developing competence in three-phase
                systems and commercial distribution, and obtaining relevant qualifications such as
                the 2391 and fire alarm qualifications.
              </p>

              <p>
                <strong>Industrial Installation and Maintenance:</strong> Industrial work covers
                factories, production facilities, warehouses, data centres, power generation, and
                heavy industry. It involves high-voltage systems, motor control (including PLCs and
                variable speed drives), hazardous areas (ATEX), heavy-duty cable installations, and
                complex fault diagnosis on production equipment. Industrial electricians are among
                the highest-paid in the trade due to the specialised knowledge and skills required.
                The pathway typically involves working for an industrial maintenance company or
                manufacturer, gaining experience with industrial control systems, and obtaining
                additional qualifications such as CompEx (for hazardous areas) or
                manufacturer-specific PLC programming certifications.
              </p>

              <p>
                <strong>Renewable Energy:</strong> The renewable energy sector is experiencing rapid
                growth, driven by government policy, falling technology costs, and increasing
                consumer demand. Specialisms include solar photovoltaic (PV) installation, battery
                storage systems, heat pump integration, and micro-wind systems. Qualifications
                include the Level 3 Award in the Installation and Maintenance of Solar Photovoltaic
                Systems and manufacturer-specific training for battery storage and heat pump
                systems. Electricians with renewable energy expertise are well-positioned for
                long-term career growth as the UK transitions towards net zero.
              </p>

              <p>
                <strong>EV Charging Installation:</strong> As discussed in the qualifications
                section, EV charging is one of the fastest-growing specialisms. The 2919
                qualification is the entry point, and many EV charging equipment manufacturers offer
                additional product-specific training and approved installer schemes (such as the
                OZEV-approved installer list). EV charging specialists can serve both domestic and
                commercial markets, with commercial installations (workplace charging, fleet depots,
                public charging infrastructure) offering the highest revenues.
              </p>

              <p>
                <strong>Fire Alarm Systems:</strong> Fire alarm design, installation, commissioning,
                and maintenance is a specialist discipline governed by BS 5839 (fire detection and
                fire alarm systems). It requires specific training in fire alarm system types
                (conventional, addressable, analogue-addressable), detection technology, system
                design (categories L1&ndash;L5 and P1&ndash;P2), installation practices,
                commissioning procedures, and maintenance requirements. Fire alarm specialists are
                in demand across all sectors &mdash; domestic, commercial, industrial, and
                institutional &mdash; and the specialism offers stable, recurring income from
                maintenance contracts. The FIA (Fire Industry Association) provides guidance and
                training resources for those entering this specialism.
              </p>

              <p>
                <strong>Data and Communications:</strong> Structured cabling, fibre optics, network
                infrastructure, CCTV, access control, and smart building systems represent a growing
                area of the electrical industry where the boundary between electrical and IT work is
                increasingly blurred. Qualifications and certifications from organisations such as
                CompTIA, Cisco, and cabling manufacturers provide pathways into this specialism.
                Data and communications work often commands premium rates due to the specialist
                knowledge required, and it is particularly in demand in commercial and industrial
                settings where robust IT infrastructure is essential.
              </p>

              <p>
                <strong>Testing and Inspection:</strong> Specialising in inspection and testing
                &mdash; carrying out EICRs on existing installations, initial verification of new
                installations, and specialist testing services &mdash; is a viable career path for
                electricians who enjoy the diagnostic and analytical aspects of the trade. The 2391
                qualification is essential, and many testing specialists also hold the 2396 Design
                and Verification qualification. Testing specialists may work independently,
                providing inspection services to other electrical contractors who do not have
                qualified inspectors in-house. The work requires a methodical approach, attention to
                detail, strong documentation skills, and the confidence to make judgement calls
                about the safety of installations.
              </p>

              <p>
                <strong>Design:</strong> Electrical design &mdash; creating designs for new
                installations or major alterations &mdash; is a specialist role that sits at the
                intersection of engineering and construction. The 2396 qualification is the formal
                entry point. Design work involves understanding client requirements, assessing
                supply characteristics, selecting wiring systems, performing cable calculations
                (current-carrying capacity, voltage drop, fault current), coordinating protective
                devices, designing earthing systems, and producing compliant documentation.
                Electrical designers may work in consulting engineering practices, for larger
                electrical contractors, or independently. The role typically commands higher rates
                than installation work and offers a clear pathway into project management and
                consulting.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Choosing Your Specialisation &mdash; Questions to Ask Yourself
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>What aspects of the trade do I enjoy most?</strong> If you love
                      problem-solving and diagnostics, testing and inspection or fault finding may
                      suit you. If you prefer creating, design or installation may be a better fit.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>What is the market demand in my area?</strong> Research what types of
                      electrical work are in demand locally. Rural areas may have high demand for
                      domestic and agricultural work; urban areas may favour commercial and data
                      cabling.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>What are the long-term growth prospects?</strong> Some specialisms (EV
                      charging, renewables, smart buildings) are growing rapidly, while others may
                      be more stable but less dynamic.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>What qualifications and investment are required?</strong> Some
                      specialisms require minimal additional training; others require significant
                      investment in qualifications, tools, and equipment.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Career Transition */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">07</span>
            Career Transition &mdash; Employed to Self-Employed to Employer
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most common career trajectories in the electrical industry is the
                progression from employed electrician to self-employed sole trader to employer
                running your own electrical contracting business. This is not the only valid career
                path &mdash; many excellent electricians choose to remain employed throughout their
                career, and there is no shame or limitation in that choice &mdash; but for those who
                aspire to self-employment or business ownership, understanding the typical
                trajectory and decision points is essential for effective career goal setting.
              </p>

              <p>
                <strong>Phase 1 &mdash; Employment (Building the Foundation):</strong> Most
                electricians begin their career as employees, typically starting with an
                apprenticeship and then working as a qualified electrician for one or more
                employers. This phase serves several critical purposes: you build technical
                competence across a range of work types and environments, you develop your
                professional network (colleagues, suppliers, clients), you learn how an electrical
                contracting business operates (quoting, project management, customer service,
                quality control), and you earn a stable income while accumulating the qualifications
                and experience needed for the next phase. The employed phase is not something to
                rush through &mdash; building a solid foundation of skills, knowledge, and
                professional relationships during this period pays dividends later.
              </p>

              <p>
                <strong>Phase 2 &mdash; Self-Employment (Going Solo):</strong> The transition to
                self-employment is a major career decision that requires careful planning. Key
                decision points include:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Qualifications readiness:</strong> Do you have all the qualifications
                    needed to operate independently? At minimum: Level 3, AM2, BS 7671, and ideally
                    2391. You also need competent person scheme registration if you will be doing
                    notifiable domestic work.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Financial readiness:</strong> Have you saved enough to cover at least
                    three to six months of expenses? Self-employed income is irregular, especially
                    in the early months. You also need capital for tools, a vehicle, insurance, and
                    scheme registration fees.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Client base:</strong> Do you have a network of potential clients?
                    Word-of-mouth referrals from previous employers, colleagues, and satisfied
                    customers are the most reliable source of work for new self-employed
                    electricians. Building this network while still employed is strongly
                    recommended.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Business knowledge:</strong> Do you understand invoicing, cash flow, tax
                    obligations (self-assessment, National Insurance, VAT, CIS), insurance
                    requirements, and basic marketing? Many technically excellent electricians
                    struggle with the business side of self-employment because they never prepared
                    for it.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Risk tolerance:</strong> Are you comfortable with the uncertainty of
                    self-employment? Income fluctuates, you are responsible for finding your own
                    work, and there is no sick pay, holiday pay, or employer pension contribution.
                    This is not for everyone, and that is perfectly fine.
                  </span>
                </li>
              </ul>

              <p>
                <strong>Phase 3 &mdash; Employer (Building a Business):</strong> Some self-employed
                electricians eventually transition to employing others, transforming from a sole
                trader into a small (and sometimes large) electrical contracting business. This
                requires a further set of skills and responsibilities: hiring and managing
                employees, payroll and HR obligations, scaling operations while maintaining quality,
                larger insurance requirements, health and safety management responsibilities, and
                the strategic management of a growing business. Many electricians find that this
                transition requires them to step back from hands-on electrical work and focus more
                on management, project coordination, and business development. This can be both
                rewarding and challenging &mdash; rewarding because you are building something
                larger than yourself, challenging because the skills that made you an excellent
                electrician are different from the skills needed to run a business.
              </p>

              <p>
                It is important to recognise that not every electrician wants or needs to follow
                this trajectory. There is no hierarchy of value between being an employed
                electrician, a self-employed sole trader, or a business owner. Each path has its own
                advantages and trade-offs. The key is to make a deliberate, informed choice based on
                your personal goals, risk tolerance, lifestyle preferences, and values &mdash;
                rather than drifting into self-employment without preparation or staying employed
                simply because you never considered the alternatives.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Self-Employment Checklist &mdash; Are You Ready?
                </p>
                <ul className="text-base text-white space-y-1.5">
                  <li>&bull; Level 3 qualification and AM2 passed</li>
                  <li>&bull; Current BS 7671 qualification</li>
                  <li>&bull; 2391 Inspection &amp; Testing (strongly recommended)</li>
                  <li>&bull; Competent person scheme registration (NICEIC, NAPIT, or ELECSA)</li>
                  <li>
                    &bull; Public liability insurance (minimum &pound;2 million, preferably &pound;5
                    million)
                  </li>
                  <li>&bull; Professional indemnity insurance</li>
                  <li>&bull; Registered with HMRC (self-employed or limited company)</li>
                  <li>
                    &bull; Understanding of CIS (Construction Industry Scheme) if subcontracting
                  </li>
                  <li>&bull; Financial reserve (three to six months of expenses)</li>
                  <li>&bull; Basic business systems (invoicing, bookkeeping, client records)</li>
                  <li>&bull; Suitable vehicle, tools, and test equipment</li>
                  <li>&bull; Network of potential clients and referral sources</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: National Careers Service Skills Health Check */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">08</span>
            National Careers Service Skills Health Check
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The National Careers Service Skills Health Check is a free online tool provided by
                the UK government that can be a valuable starting point for career goal setting. It
                is not specific to the electrical industry, but it provides a structured
                self-assessment that helps you identify your existing skills, personal strengths,
                preferred working styles, and potential career directions. For electricians at a
                decision point in their career &mdash; whether to specialise, pursue further
                qualifications, move into management, or start a business &mdash; it can provide
                useful insights.
              </p>

              <p>
                The Skills Health Check covers several areas: your skills (both technical and
                transferable), your personal strengths and attributes, your interests and
                motivations, and your preferred working environment. The assessment takes
                approximately 30 to 45 minutes and produces a profile that highlights your strongest
                areas and suggests career directions that align with your profile. For example, an
                electrician who scores highly in analytical thinking, attention to detail, and
                systematic problem-solving might be well-suited to inspection and testing or design
                work. An electrician who scores highly in communication, leadership, and
                interpersonal skills might be well-suited to training, supervisory, or management
                roles.
              </p>

              <p>
                The tool is available at nationalcareers.service.gov.uk and is completely free.
                While it should not be used as the sole basis for career decisions, it provides a
                useful data point and can prompt reflection on aspects of your professional self
                that you may not have considered. Many electricians who complete the assessment
                report that it confirmed intuitions they already had about their strengths and
                interests, while also highlighting areas they had not previously considered.
              </p>

              <p>
                Combining the Skills Health Check with the JIB career pathway, the qualification
                milestones, and the specialisation options outlined in this section creates a
                comprehensive framework for career goal setting. You can identify where you are now
                (current grade, qualifications, skills), where you want to be (target grade, desired
                specialisation, professional registration), and what steps you need to take to get
                there (specific qualifications, experience, training, and development activities).
                This is the foundation for the personal goal map that we will create in Section 4.
              </p>
            </div>
          </div>
        </section>

        {/* Section 09: Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">09</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has mapped the complete career landscape for electricians, providing
                the knowledge you need to set specific, informed career goals. The key points to
                carry forward are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The JIB grading structure</strong> provides a clear career ladder from
                    Electrical Labourer to Senior Technician, with each grade linked to nationally
                    agreed pay rates.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>ECS cards</strong> provide visible, colour-coded evidence of your
                    qualification level and are required for access to most construction sites.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Key qualification milestones</strong> &mdash; Level 2, Level 3, AM2,
                    2391, 2396, 2919, 5357, BS 7671 &mdash; form a strategic sequence for career
                    development.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Professional registration</strong> (EngTech, IEng, CEng) through the IET
                    provides independent recognition of your competence and opens doors to advanced
                    roles.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Competent person schemes</strong> (NICEIC, NAPIT, ELECSA) are essential
                    for self-certifying notifiable domestic electrical work under Part P.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Multiple specialisation paths</strong> are available, from domestic and
                    commercial to EV charging, renewables, fire alarms, data, testing, and design.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Career transitions</strong> from employed to self-employed to employer
                    require careful planning, adequate preparation, and informed decision-making.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The National Careers Service Skills Health Check</strong> is a free tool
                    that can help identify strengths and career directions.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 4, we will bring
                  everything together by creating your personal goal map &mdash; a structured,
                  actionable plan that combines your career aspirations, qualification targets,
                  specialisation choices, and professional development goals into a clear roadmap
                  for your electrical career.
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
            <Link to="../gs-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../gs-module-2-section-4">
              Next: Creating Your Personal Goal Map
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
