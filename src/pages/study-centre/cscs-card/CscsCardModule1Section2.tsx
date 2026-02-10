import {
  ArrowLeft,
  CheckCircle,
  CreditCard,
  Layers,
  ShieldCheck,
  Award,
  Crown,
  Briefcase,
  GraduationCap,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'green-card-requirements',
    question:
      'What are the minimum requirements for a CSCS Green Labourer Card?',
    options: [
      'NVQ Level 2 in a construction trade + Operatives HS&E test',
      'Pass the Operatives HS&E test + have achieved, be registered for, or have applied for a Level 1 qualification',
      'Pass the Managers & Professionals HS&E test + 5 years of site experience',
      'Complete a CITB apprenticeship + pass the Specialists HS&E test',
    ],
    correctIndex: 1,
    explanation:
      'The CSCS Green Labourer Card requires passing the Operatives HS&E test and having achieved, being registered for, or having applied for a Level 1 qualification (or equivalent). It is the most common entry-level card and the minimum requirement for most site access. Over 500,000 green cards are currently in circulation.',
  },
  {
    id: 'blue-vs-gold',
    question:
      'What is the key difference between a Blue Skilled Worker Card and a Gold Advanced Craft Card?',
    options: [
      'Blue is for labourers, Gold is for managers',
      'Blue requires NVQ Level 2, Gold requires NVQ Level 3 or above',
      'Blue is valid for 3 years, Gold is valid for 10 years',
      'Blue requires the Managers HS&E test, Gold requires the Operatives HS&E test',
    ],
    correctIndex: 1,
    explanation:
      'The Blue Skilled Worker Card requires NVQ Level 2 or above in the relevant trade, whilst the Gold Advanced Craft Card requires NVQ Level 3 or above. Both require passing the appropriate HS&E test. The Gold card demonstrates a higher level of competence and may also be issued in a Supervisory variant for those with supervisory qualifications.',
  },
  {
    id: 'black-card-role',
    question:
      'Which HS&E test must a holder of the Black Manager Card have passed?',
    options: [
      'Operatives HS&E test',
      'Specialists HS&E test',
      'Supervisors HS&E test',
      'Managers & Professionals HS&E test',
    ],
    correctIndex: 3,
    explanation:
      'The Black Manager Card requires passing the Managers & Professionals HS&E test, along with holding NVQ Level 6 or 7 in construction management (or an equivalent degree/qualification). This test is more demanding than the Operatives or Supervisors tests and covers management-level health and safety responsibilities.',
  },
];

const faqs = [
  {
    question: 'Can I work on a construction site without a CSCS card?',
    answer:
      'Legally, there is no law that mandates a CSCS card. However, the vast majority of UK construction sites — particularly those run by major contractors — require all workers to hold a valid CSCS card before they are allowed on site. The Build UK Code of Practice and most principal contractors make it a contractual requirement. In practice, not having a card will prevent you from accessing the overwhelming majority of construction sites in the UK.',
  },
  {
    question: 'What happens if my CSCS card expires?',
    answer:
      'CSCS cards are valid for 5 years. You must renew before expiry to maintain site access. Renewal requires passing the appropriate HS&E test again (tests are valid for 2 years for renewal purposes) and demonstrating that your qualifications are still current. If your card has already expired, you will need to apply for a new card rather than renewing. Some sites may allow a short grace period, but this is at the discretion of the site management and is not guaranteed.',
  },
  {
    question: 'What is the difference between CSCS and CPCS cards?',
    answer:
      'CSCS (Construction Skills Certification Scheme) cards cover general construction occupations — labourers, skilled tradespeople, supervisors, managers, and professionals. CPCS (Construction Plant Competence Scheme) cards are specifically for plant operators — those who operate machinery such as excavators, cranes, telehandlers, and dumpers. CPCS cards carry the CSCS logo and are accepted as equivalent to CSCS cards for site access purposes. Both schemes are managed under the umbrella of the Construction Industry Training Board (CITB).',
  },
  {
    question: 'I have an ECS card from the JIB. Do I still need a CSCS card?',
    answer:
      'No. The Electrotechnical Certification Scheme (ECS) card, issued by the Joint Industry Board (JIB), carries the CSCS logo and is accepted as equivalent to a CSCS card for site access. ECS cards are specifically designed for the electrotechnical sector and cover roles from apprentice through to approved electrician and beyond. If you hold a valid ECS card, you do not need a separate CSCS card.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What colour is the CSCS card for a general labourer?',
    options: ['Red', 'Blue', 'Green', 'Gold'],
    correctAnswer: 2,
    explanation:
      'The Green Labourer Card is the most common entry-level CSCS card. It is issued to workers who have passed the Operatives HS&E test and have achieved, are registered for, or have applied for a Level 1 qualification. It is the minimum card for most site access.',
  },
  {
    id: 2,
    question:
      'A worker holds an NVQ Level 2 in Plumbing and has passed the Operatives HS&E test. Which CSCS card colour are they entitled to?',
    options: [
      'Green — because they are still a labourer',
      'Blue — because they hold NVQ Level 2 in their trade',
      'Gold — because they have a formal qualification',
      'White — because plumbing is a professional role',
    ],
    correctAnswer: 1,
    explanation:
      'The Blue Skilled Worker Card is issued to workers who hold a relevant NVQ/SVQ at Level 2 or above in their specific trade. A plumber with NVQ Level 2 in Plumbing qualifies for the blue card, which shows their specific occupation on the card itself.',
  },
  {
    id: 3,
    question: 'Which CSCS card is issued to registered apprentices?',
    options: [
      'Green Labourer Card',
      'Blue Skilled Worker Card',
      'Red Trainee/Apprentice Card',
      'White Provisional Card',
    ],
    correctAnswer: 2,
    explanation:
      'The Red Trainee/Apprentice Card is issued to those registered in an apprenticeship or trainee programme who are working towards their NVQ. Requirements include a registered apprenticeship/traineeship and having passed the Operatives HS&E test. The card is valid for 5 years or until the qualification is achieved.',
  },
  {
    id: 4,
    question:
      'What qualification level is typically required for a Black Manager Card?',
    options: [
      'NVQ Level 2 in construction',
      'NVQ Level 3 in a supervisory role',
      'NVQ Level 4 or 5 in project management',
      'NVQ Level 6 or 7 in construction management (or equivalent degree)',
    ],
    correctAnswer: 3,
    explanation:
      'The Black Manager Card requires NVQ Level 6 or 7 in construction management, or an equivalent degree or professional qualification, plus passing the Managers & Professionals HS&E test. This card demonstrates the ability to manage construction projects and sites and is required for principal contractor roles on many major projects.',
  },
  {
    id: 5,
    question: 'How long is a standard CSCS card valid for?',
    options: ['1 year', '3 years', '5 years', '10 years'],
    correctAnswer: 2,
    explanation:
      'Standard CSCS cards (Green, Blue, Gold, Black, White) are valid for 5 years from the date of issue. After this period, the card must be renewed by passing the appropriate HS&E test again and providing evidence of current qualifications. Provisional cards are an exception, being valid for only 6 months.',
  },
  {
    id: 6,
    question:
      'Which of the following professionals would hold a White Professionally Qualified Person Card?',
    options: [
      'A site foreman with 20 years of experience',
      'A chartered surveyor who is a member of RICS',
      'An electrician with NVQ Level 3',
      'A plant operator with CPCS certification',
    ],
    correctAnswer: 1,
    explanation:
      'The White Professionally Qualified Person Card is for chartered professionals such as architects, engineers, surveyors, and building control officers. It requires membership of a recognised professional body (RICS, ICE, CIOB, RIBA, etc.) plus passing the Managers & Professionals HS&E test. It is not for hands-on construction work but for professional and design roles.',
  },
  {
    id: 7,
    question: 'What is the validity period of a CSCS Provisional Card?',
    options: ['1 month', '3 months', '6 months', '12 months'],
    correctAnswer: 2,
    explanation:
      'Provisional CSCS cards are valid for 6 months only. They are issued when qualification evidence is pending — for example, when a worker has completed their NVQ but is awaiting the certificate. Provisional cards cannot be renewed; the worker must obtain their full card within the 6-month window.',
  },
  {
    id: 8,
    question:
      'An experienced worker with 15 years on site but no formal qualifications wants a CSCS card. What is their route?',
    options: [
      'They cannot obtain a CSCS card without formal qualifications',
      'They can apply for an Experienced Worker card and must register and complete an assessment within a set period',
      'They automatically receive a Gold Advanced Craft card based on experience alone',
      'They must start a full apprenticeship before any card can be issued',
    ],
    correctAnswer: 1,
    explanation:
      'The Experienced Worker route allows workers with extensive practical experience but no formal qualifications to obtain a CSCS card. They must register for and complete an appropriate assessment (typically an NVQ achieved through on-site assessment of existing competence) within a set period. This route recognises that many skilled workers gained their competence through years of practical work rather than formal education.',
  },
];

export default function CscsCardModule1Section2() {
  useSEO({
    title: 'Card Types & Colour Codes | CSCS Card Module 1.2',
    description:
      'CSCS card colour codes explained: red trainee, green labourer, blue skilled worker, gold advanced craft, black manager, white professional, provisional, experienced worker, and ECS equivalents.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cscs-card-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-400/20 border border-green-500/30 mb-4">
            <CreditCard className="h-7 w-7 text-green-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-3 mx-auto">
            <span className="text-green-400 text-xs font-semibold">MODULE 1 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Card Types &amp; Colour Codes
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            How the CSCS colour-coded card system works, what each colour represents, the
            qualifications and tests required for each card, and special card types for
            provisional, experienced, and visiting workers
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
            <p className="text-green-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Colour = competence level</strong> visible at a glance
              </li>
              <li>
                <strong>Green:</strong> Labourer &bull; <strong>Blue:</strong> Skilled Worker &bull;{' '}
                <strong>Gold:</strong> Advanced/Supervisor
              </li>
              <li>
                <strong>Black:</strong> Manager &bull; <strong>White:</strong> Chartered Professional
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
            <p className="text-green-400/90 text-base font-medium mb-2">Key Facts</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>All cards</strong> require passing the appropriate HS&amp;E test
              </li>
              <li>
                <strong>Standard validity:</strong> 5 years (provisional cards: 6 months)
              </li>
              <li>
                <strong>ECS cards (JIB)</strong> carry the CSCS logo and are accepted on site
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Identify each CSCS card colour and explain the competence level it represents',
              'State the qualification and HS&E test requirements for Green, Blue, Gold, Black, and White cards',
              'Explain the difference between the Gold Advanced Craft and Gold Supervisory variants',
              'Describe the purpose and validity of Provisional and Experienced Worker cards',
              'Recognise ECS (JIB) and CPCS cards as CSCS-equivalent for site access',
              'Explain why the colour-coded system exists and how it is used on site',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-green-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Colour-Coded Card System */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">01</span>
            The Colour-Coded Card System
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                CSCS uses a colour-coded system to instantly identify a worker&rsquo;s qualification
                level and role on site. Gate staff and site managers can quickly determine whether
                someone holds the right level of competence for the work they will be doing. Each
                colour represents a specific level of training, qualification, and experience.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Why Colour Codes Matter:</strong> On a busy
                  construction site with hundreds of workers, colour-coded cards allow instant visual
                  identification. A site manager checking workers at the gate can immediately see
                  whether someone holds a card appropriate to the work they have been engaged to do
                  &mdash; without needing to read every detail on the card.
                </p>
              </div>

              <p>
                The system was introduced to raise standards across the construction industry by
                ensuring that workers can demonstrate their competence. It is now so widely adopted
                that the vast majority of UK construction sites &mdash; particularly those run by
                major contractors operating under the Build UK Code of Practice &mdash; will not
                permit access without a valid CSCS card (or recognised equivalent such as ECS or
                CPCS).
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">How the System Works on Site</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Workers present their CSCS card at the site gate during induction or daily
                      sign-in
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Gate staff check that the card colour matches the role the worker has been
                      engaged to perform
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      The card&rsquo;s smart chip can be scanned to verify authenticity and check
                      expiry dates electronically
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Cards also display the holder&rsquo;s photo, name, occupation, registration
                      number, and expiry date
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Random spot checks may be carried out during the working day to verify all
                      workers hold valid cards
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Red Trainee/Apprentice Card */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">02</span>
            Red Trainee/Apprentice Card
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Red Trainee/Apprentice Card is for those registered in an apprenticeship or
                trainee programme who are working towards their NVQ. It allows the holder to work on
                site under supervision while they complete their training. The card shows the
                apprentice&rsquo;s trade and the qualification they are working towards.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-7 rounded bg-red-500 border border-red-400/50 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white">RED</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      Trainee/Apprentice Card
                    </p>
                    <p className="text-xs text-white/60">Working towards qualification</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-white/50 text-xs font-medium min-w-[80px]">
                      Requirements
                    </span>
                    <span>
                      Registered apprenticeship or traineeship + passed the Operatives HS&amp;E test
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-white/50 text-xs font-medium min-w-[80px]">Validity</span>
                    <span>5 years or until the qualification is achieved (whichever comes first)</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-white/50 text-xs font-medium min-w-[80px]">
                      Supervision
                    </span>
                    <span>
                      Must work under supervision at all times &mdash; not permitted to work
                      independently
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-white/50 text-xs font-medium min-w-[80px]">
                      Card Shows
                    </span>
                    <span>
                      The apprentice&rsquo;s trade and the qualification being worked towards
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Key Point:</strong> The red card is specifically
                  for those in a structured training programme. A worker who is simply &ldquo;learning
                  on the job&rdquo; without being registered on a formal apprenticeship or traineeship
                  would not qualify for this card &mdash; they would need a Green Labourer Card
                  instead.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Green Labourer Card */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">03</span>
            Green Labourer Card (CSCS Green)
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Green Labourer Card is the most common entry-level CSCS card. It is the minimum
                card required for most site access and is held by general labourers working on
                construction sites. Over 500,000 green cards are currently in circulation across the
                UK, making it by far the most widely held card type.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-7 rounded bg-green-500 border border-green-400/50 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white">GRN</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Labourer Card</p>
                    <p className="text-xs text-white/60">Entry-level site access</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-white/50 text-xs font-medium min-w-[80px]">
                      Requirements
                    </span>
                    <span>
                      Pass the Operatives HS&amp;E test + have achieved, be registered for, or have
                      applied for a Level 1 qualification (or equivalent)
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-white/50 text-xs font-medium min-w-[80px]">Validity</span>
                    <span>5 years from date of issue</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-white/50 text-xs font-medium min-w-[80px]">Role</span>
                    <span>
                      General labouring duties on construction sites &mdash; this is the minimum card
                      for most site access
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-white/50 text-xs font-medium min-w-[80px]">Volume</span>
                    <span>Over 500,000 green cards in circulation across the UK</span>
                  </div>
                </div>
              </div>

              <p>
                Holders of the green card can work as general labourers on construction sites. The
                card does not qualify the holder to carry out skilled trade work &mdash; for that,
                they would need a Blue Skilled Worker Card with the relevant occupation listed. The
                green card demonstrates that the holder has a basic understanding of health and
                safety on construction sites and has begun the process of gaining formal
                qualifications.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Progression:</strong> Many workers start with a
                  Green Labourer Card and progress to a Blue Skilled Worker Card once they have
                  achieved their NVQ Level 2 in a specific trade. The green card is often the first
                  step on the CSCS pathway.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Blue Skilled Worker Card */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">04</span>
            Blue Skilled Worker Card
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Blue Skilled Worker Card is for workers who hold a relevant NVQ/SVQ at Level 2
                or above in their specific trade. It is the standard card for qualified tradespeople
                and is the most common card held by skilled construction workers across the UK. The
                card displays the holder&rsquo;s specific occupation &mdash; for example,
                &ldquo;Electrician&rdquo;, &ldquo;Plumber&rdquo;, or &ldquo;Carpenter&rdquo;.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-7 rounded bg-blue-500 border border-blue-400/50 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white">BLU</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Skilled Worker Card</p>
                    <p className="text-xs text-white/60">Qualified tradesperson</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-white/50 text-xs font-medium min-w-[80px]">
                      Requirements
                    </span>
                    <span>
                      Pass the appropriate HS&amp;E test (Operatives or Specialists depending on
                      role) + hold NVQ Level 2 or above in the relevant occupation
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-white/50 text-xs font-medium min-w-[80px]">Validity</span>
                    <span>5 years from date of issue</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-white/50 text-xs font-medium min-w-[80px]">
                      Card Shows
                    </span>
                    <span>
                      The holder&rsquo;s specific occupation (e.g., &ldquo;Electrician&rdquo;,
                      &ldquo;Plumber&rdquo;, &ldquo;Carpenter&rdquo;)
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-white/50 text-xs font-medium min-w-[80px]">HS&amp;E Test</span>
                    <span>
                      Operatives test for most trades; Specialists test for certain roles (e.g.,
                      demolition, highways maintenance)
                    </span>
                  </div>
                </div>
              </div>

              <p>
                Most qualified tradespeople in the UK construction industry hold a blue card. It
                confirms that the holder has been formally assessed and has demonstrated competence
                in their specific trade to at least NVQ Level 2 standard. The occupation listed on
                the card must match the work being carried out on site &mdash; a worker with a blue
                card showing &ldquo;Bricklayer&rdquo; should not be carrying out electrical work.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Important:</strong> The HS&amp;E test type
                  depends on the role. Most skilled workers take the Operatives test, but certain
                  specialist occupations (such as demolition, highways maintenance, and some
                  plant-related roles) require the Specialists HS&amp;E test, which contains
                  additional occupation-specific questions.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Gold Advanced Craft/Supervisory Card */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">05</span>
            Gold Advanced Craft/Supervisory Card
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Gold Card comes in two variants: <strong>Gold (Advanced Craft)</strong> for
                workers with NVQ Level 3 and above in their trade, and{' '}
                <strong>Gold (Supervisory)</strong> for those with supervisory qualifications. Both
                variants demonstrate enhanced competence and the ability to oversee work carried out
                by others.
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-7 rounded bg-yellow-500 border border-yellow-400/50 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-white">GLD</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Advanced Craft</p>
                      <p className="text-xs text-white/60">NVQ Level 3+ in trade</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-white/80">
                      <p className="text-white/50 text-xs font-medium mb-1">Requirements</p>
                      <ul className="space-y-1">
                        <li className="flex items-start gap-2">
                          <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                          <span>NVQ Level 3 or above in their specific trade</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                          <span>Passed the appropriate HS&amp;E test</span>
                        </li>
                      </ul>
                    </div>
                    <div className="text-sm text-white/80">
                      <p className="text-white/50 text-xs font-medium mb-1">Validity</p>
                      <span>5 years from date of issue</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-7 rounded bg-yellow-600 border border-yellow-500/50 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-white">GLD</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Supervisory</p>
                      <p className="text-xs text-white/60">NVQ Level 3 in supervision</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-white/80">
                      <p className="text-white/50 text-xs font-medium mb-1">Requirements</p>
                      <ul className="space-y-1">
                        <li className="flex items-start gap-2">
                          <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                          <span>NVQ Level 3 in a supervisory role</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                          <span>Passed the Supervisors HS&amp;E test</span>
                        </li>
                      </ul>
                    </div>
                    <div className="text-sm text-white/80">
                      <p className="text-white/50 text-xs font-medium mb-1">Validity</p>
                      <span>5 years from date of issue</span>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                The Gold Advanced Craft card recognises workers who have progressed beyond the
                standard skilled worker level. They may be leading a team of tradespeople, mentoring
                apprentices, or carrying out highly complex work in their trade. The Gold Supervisory
                card specifically recognises the ability to supervise and manage other workers on
                site, including responsibility for their health and safety.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Note:</strong> The Supervisory variant requires
                  the <strong>Supervisors HS&amp;E test</strong>, which is different from the
                  standard Operatives test. It includes additional questions on supervisory
                  responsibilities, managing teams, and site management duties. The Advanced Craft
                  variant uses the same HS&amp;E test as the blue card for that occupation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Black Manager Card */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">06</span>
            Black Manager Card
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Black Manager Card is for construction managers and those in senior management
                positions. It demonstrates the ability to manage construction projects and sites and
                is required for principal contractor roles on many major projects. This is one of the
                highest-level cards in the CSCS system.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-7 rounded bg-gray-800 border border-gray-600/50 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white">BLK</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Manager Card</p>
                    <p className="text-xs text-white/60">Senior management &amp; project leadership</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-white/50 text-xs font-medium min-w-[80px]">
                      Requirements
                    </span>
                    <span>
                      NVQ Level 6 or 7 in construction management (or equivalent degree/qualification)
                      + Managers &amp; Professionals HS&amp;E test
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-white/50 text-xs font-medium min-w-[80px]">Validity</span>
                    <span>5 years from date of issue</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-white/50 text-xs font-medium min-w-[80px]">Role</span>
                    <span>
                      Construction project management, site management, principal contractor duties
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-white/50 text-xs font-medium min-w-[80px]">HS&amp;E Test</span>
                    <span>
                      Managers &amp; Professionals HS&amp;E test (more demanding than Operatives or
                      Supervisors tests)
                    </span>
                  </div>
                </div>
              </div>

              <p>
                The Managers &amp; Professionals HS&amp;E test is significantly more demanding than
                the Operatives or Supervisors tests. It covers management-level health and safety
                responsibilities, CDM Regulations, duty of care, risk management at a strategic
                level, and the legal responsibilities of those who control construction work. The
                black card is essential for those operating in roles where they have overall
                responsibility for the health and safety of workers on site.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">CDM Relevance:</strong> Under the Construction
                  (Design and Management) Regulations 2015, principal contractors must ensure that
                  all workers on site are competent. The black card demonstrates that the holder has
                  been assessed to the highest management level and is qualified to oversee large-scale
                  construction operations.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: White Professionally Qualified Person Card */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">07</span>
            White Professionally Qualified Person Card
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The White Professionally Qualified Person Card is for chartered professionals
                &mdash; architects, engineers, surveyors, building control officers, and other
                professionals who work in the built environment. It is not intended for hands-on
                construction work but for those operating in professional or design roles who need to
                access construction sites.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-7 rounded bg-white border border-white/50 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-gray-800">WHT</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      Professionally Qualified Person Card
                    </p>
                    <p className="text-xs text-white/60">Chartered professional</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-white/50 text-xs font-medium min-w-[80px]">
                      Requirements
                    </span>
                    <span>
                      Membership of a recognised professional body (RICS, ICE, CIOB, RIBA, etc.) +
                      Managers &amp; Professionals HS&amp;E test
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-white/50 text-xs font-medium min-w-[80px]">Validity</span>
                    <span>5 years from date of issue</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-white/50 text-xs font-medium min-w-[80px]">Role</span>
                    <span>
                      Professional/design roles in the built environment &mdash; not for hands-on
                      construction work
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Recognised Professional Bodies
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm text-white/80">
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          <strong className="text-white">RICS</strong> &mdash; Royal Institution of
                          Chartered Surveyors
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          <strong className="text-white">ICE</strong> &mdash; Institution of Civil
                          Engineers
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          <strong className="text-white">CIOB</strong> &mdash; Chartered Institute
                          of Building
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="text-sm text-white/80">
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          <strong className="text-white">RIBA</strong> &mdash; Royal Institute of
                          British Architects
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          <strong className="text-white">IStructE</strong> &mdash; Institution of
                          Structural Engineers
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          <strong className="text-white">CIBSE</strong> &mdash; Chartered
                          Institution of Building Services Engineers
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                The white card acknowledges that chartered professionals have achieved a high level
                of education and professional competence in their field, even though their role on
                site is not hands-on construction. They still need to understand site safety
                &mdash; hence the requirement for the Managers &amp; Professionals HS&amp;E test
                &mdash; but their primary function is design, specification, inspection, or
                management rather than physical construction work.
              </p>
            </div>
          </div>
        </section>

        {/* Section 08: Other Card Types & Special Cases */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">08</span>
            Other Card Types &amp; Special Cases
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Beyond the main colour-coded cards, the CSCS system includes several additional card
                types to cover specific situations. These ensure that workers in transitional
                periods, those with non-standard qualifications, visitors, plant operators, and
                electrotechnical workers are all properly accounted for on site.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Layers className="h-5 w-5 text-amber-400" />
                    <p className="text-sm font-medium text-amber-400">Provisional Cards</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    Issued when qualification evidence is pending &mdash; for example, when a worker
                    has completed their NVQ assessment but is awaiting the official certificate.
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Valid for <strong className="text-white">6 months only</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        Cannot be renewed &mdash; the worker must obtain their full card within the
                        6-month window
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        Acts as a bridge between completing qualifications and receiving the permanent
                        card
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-5 w-5 text-blue-400" />
                    <p className="text-sm font-medium text-blue-400">Experienced Worker Cards</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    For those with extensive practical experience but no formal qualification. This
                    route recognises that many skilled workers gained their competence through years
                    of hands-on work rather than formal education.
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        Must register for and complete an appropriate assessment (typically an NVQ
                        achieved through on-site assessment of existing competence)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        Assessment must be completed within a set period (check current CSCS
                        guidelines for timeframes)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        Provides a pathway for experienced workers to formalise their skills without
                        starting a full apprenticeship
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-purple-400" />
                    <p className="text-sm font-medium text-purple-400">Visitor Cards</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    For non-construction personnel visiting sites &mdash; clients, consultants,
                    inspectors, or other parties who are not carrying out construction work.
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Temporary &mdash; typically valid for one day only</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        Visitors must be accompanied by a responsible person at all times on site
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        A site-specific induction is still required before the visitor enters the
                        working area
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="h-5 w-5 text-orange-400" />
                    <p className="text-sm font-medium text-orange-400">
                      Plant Operator Cards (CPCS)
                    </p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    The Construction Plant Competence Scheme (CPCS) covers plant operators &mdash;
                    those who operate excavators, cranes, telehandlers, dumpers, and other machinery.
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        CPCS cards carry the CSCS logo and are accepted as equivalent for site
                        access
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        Two types: Red Trained Operator (initial competence) and Blue Competent
                        Operator (full NVQ achieved)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        Managed under the CITB umbrella alongside CSCS
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="h-5 w-5 text-green-400" />
                    <p className="text-sm font-medium text-green-400">ECS Cards (JIB)</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    The Electrotechnical Certification Scheme (ECS) card is issued by the Joint
                    Industry Board (JIB) specifically for the electrotechnical sector.
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        Carries the CSCS logo and is accepted as equivalent to a CSCS card for site
                        access
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        Covers roles from apprentice through to approved electrician and beyond
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        If you hold a valid ECS card, you do not need a separate CSCS card
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        The ECS scheme uses its own colour system that maps to equivalent CSCS levels
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Card Colour Reference Chart */}
        <section className="mb-10">
          <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
            <p className="text-sm font-medium text-white mb-4 text-center">
              Card Colour Reference Chart
            </p>
            <div className="space-y-2">
              {/* Red */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="w-8 h-6 rounded bg-red-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">Red &mdash; Trainee/Apprentice</p>
                  <p className="text-xs text-white/60">
                    Registered apprenticeship + Operatives HS&amp;E &bull; 5 years / until qualified
                  </p>
                </div>
              </div>

              {/* Green */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="w-8 h-6 rounded bg-green-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">Green &mdash; Labourer</p>
                  <p className="text-xs text-white/60">
                    Operatives HS&amp;E + Level 1 qualification (or applied/registered) &bull; 5
                    years
                  </p>
                </div>
              </div>

              {/* Blue */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <div className="w-8 h-6 rounded bg-blue-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">Blue &mdash; Skilled Worker</p>
                  <p className="text-xs text-white/60">
                    NVQ Level 2+ in trade + Operatives/Specialists HS&amp;E &bull; 5 years
                  </p>
                </div>
              </div>

              {/* Gold */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <div className="w-8 h-6 rounded bg-yellow-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">
                    Gold &mdash; Advanced Craft / Supervisory
                  </p>
                  <p className="text-xs text-white/60">
                    NVQ Level 3+ in trade or supervision + HS&amp;E test &bull; 5 years
                  </p>
                </div>
              </div>

              {/* Black */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-500/10 border border-gray-500/20">
                <div className="w-8 h-6 rounded bg-gray-800 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">Black &mdash; Manager</p>
                  <p className="text-xs text-white/60">
                    NVQ Level 6/7 in construction management + Managers &amp; Professionals HS&amp;E
                    &bull; 5 years
                  </p>
                </div>
              </div>

              {/* White */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10 border border-white/20">
                <div className="w-8 h-6 rounded bg-white flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">
                    White &mdash; Professionally Qualified Person
                  </p>
                  <p className="text-xs text-white/60">
                    Professional body membership + Managers &amp; Professionals HS&amp;E &bull; 5
                    years
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Card Hierarchy Pyramid */}
        <section className="mb-10">
          <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
            <p className="text-sm font-medium text-white mb-4 text-center">
              Card Hierarchy Pyramid
            </p>
            <p className="text-xs text-white/50 text-center mb-6">
              From entry level (base) to professional/management level (top)
            </p>

            <div className="flex flex-col items-center gap-0">
              {/* White - Professional */}
              <div className="w-full max-w-[180px] bg-gradient-to-r from-white/15 to-white/10 border border-white/30 rounded-t-xl p-3 text-center">
                <p className="text-xs font-bold text-white">WHITE</p>
                <p className="text-[10px] text-white/60">Chartered Professional</p>
              </div>
              <div className="flex flex-col items-center py-0.5">
                <div className="w-0.5 h-2 bg-white/20" />
              </div>

              {/* Black - Manager */}
              <div className="w-full max-w-[220px] bg-gradient-to-r from-gray-700/30 to-gray-600/20 border border-gray-500/30 p-3 text-center">
                <p className="text-xs font-bold text-white">BLACK</p>
                <p className="text-[10px] text-white/60">
                  Manager &bull; NVQ Level 6/7
                </p>
              </div>
              <div className="flex flex-col items-center py-0.5">
                <div className="w-0.5 h-2 bg-white/20" />
              </div>

              {/* Gold - Advanced/Supervisory */}
              <div className="w-full max-w-[280px] bg-gradient-to-r from-yellow-500/20 to-yellow-400/10 border border-yellow-500/30 p-3 text-center">
                <p className="text-xs font-bold text-yellow-400">GOLD</p>
                <p className="text-[10px] text-white/60">
                  Advanced Craft / Supervisory &bull; NVQ Level 3+
                </p>
              </div>
              <div className="flex flex-col items-center py-0.5">
                <div className="w-0.5 h-2 bg-white/20" />
              </div>

              {/* Blue - Skilled Worker */}
              <div className="w-full max-w-[360px] bg-gradient-to-r from-blue-500/20 to-blue-400/10 border border-blue-500/30 p-3 text-center">
                <p className="text-xs font-bold text-blue-400">BLUE</p>
                <p className="text-[10px] text-white/60">
                  Skilled Worker &bull; NVQ Level 2+
                </p>
              </div>
              <div className="flex flex-col items-center py-0.5">
                <div className="w-0.5 h-2 bg-white/20" />
              </div>

              {/* Green - Labourer */}
              <div className="w-full max-w-[440px] bg-gradient-to-r from-green-500/20 to-green-400/10 border border-green-500/30 rounded-b-xl p-3 text-center">
                <p className="text-xs font-bold text-green-400">GREEN</p>
                <p className="text-[10px] text-white/60">
                  Labourer &bull; Level 1 qualification + Operatives HS&amp;E
                </p>
              </div>
            </div>

            <p className="text-xs text-white/40 text-center mt-4 italic">
              Red (Trainee/Apprentice) cards sit alongside the pyramid &mdash; holders progress
              into the appropriate level once their qualification is achieved.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{faq.answer}</p>
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
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cscs-card-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-green-500 text-white hover:bg-green-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cscs-card-module-1-section-3">
              Next: The HS&amp;E Test Format
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
