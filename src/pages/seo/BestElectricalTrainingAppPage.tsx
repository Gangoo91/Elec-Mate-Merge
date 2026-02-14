import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  GraduationCap,
  Brain,
  FileCheck2,
  Calculator,
  BookOpen,
  Sparkles,
  Smartphone,
  WifiOff,
  ClipboardCheck,
  FlaskConical,
  Trophy,
  Briefcase,
} from 'lucide-react';

export default function BestElectricalTrainingAppPage() {
  return (
    <GuideTemplate
      title="Best Electrical Training App UK 2026 | Top Study Apps"
      description="Compare the best electrical training apps for UK electricians and apprentices in 2026. Elec-Mate, IET apps, BS 7671 apps, YouTube, and online course providers reviewed. Practice questions, mock exams, AI tutoring, flashcards, and progress tracking compared."
      datePublished="2026-01-28"
      dateModified="2026-02-14"
      breadcrumbs={[
        { label: 'Guides', href: '/guides' },
        { label: 'Best Electrical Training App', href: '/guides/best-electrical-training-app' },
      ]}
      tocItems={[
        { id: 'why-training-apps-matter', label: 'Why Training Apps Matter' },
        { id: 'what-to-look-for', label: 'What to Look for' },
        { id: 'elec-mate-training', label: 'Elec-Mate Training Platform' },
        { id: 'iet-apps', label: 'IET On-Site Guide and BS 7671 Apps' },
        { id: 'youtube-channels', label: 'YouTube Channels' },
        { id: 'online-course-providers', label: 'Online Course Providers' },
        { id: 'standalone-quiz-apps', label: 'Standalone Quiz Apps' },
        { id: 'comparison-summary', label: 'Comparison Summary' },
        { id: 'our-recommendation', label: 'Our Recommendation' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="2026 Guide"
      badgeIcon={GraduationCap}
      heroTitle={
        <>
          Best <span className="text-yellow-400">Electrical Training App</span> UK 2026
        </>
      }
      heroSubtitle="Whether you are an apprentice studying for your Level 2/3 exams, preparing for the AM2 assessment, or a qualified electrician revising the 18th Edition, having the right training app makes a measurable difference. This guide reviews every major option available to UK electricians in 2026."
      readingTime={14}
      keyTakeaways={[
        'Elec-Mate offers 46+ courses, 2,000+ practice questions, flashcards with spaced repetition, mock exams, EPA simulator, and AM2 simulator — plus you get certificates, calculators, and business tools in the same subscription.',
        'IET apps provide authoritative reference material but are designed as reference tools, not structured learning platforms with practice questions and progress tracking.',
        'YouTube is free but lacks structure, practice questions, progress tracking, and exam simulation. It works best as a supplement to structured study.',
        'Standalone quiz apps typically cover a narrow topic and cannot replace a comprehensive training platform with full courses, flashcards, and mock exams.',
        'The best training app for electricians is one that combines study material with professional tools, so you can study between jobs without switching apps.',
      ]}
      sections={[
        {
          id: 'why-training-apps-matter',
          heading: 'Why Training Apps Matter for Electricians',
          content: (
            <>
              <p>
                The electrical industry requires continuous learning. BS 7671 is amended regularly —
                Amendment 3 (A3:2024) was issued in July 2024 — and new technologies like EV
                chargers, battery storage, and solar PV installations require electricians to
                constantly update their knowledge.
              </p>
              <p>
                For apprentices, the stakes are even higher. The Level 2 and Level 3 Electrical
                Installation qualifications involve substantial theory content that must be learned
                alongside practical skills. The AM2 assessment is a high-pressure practical exam
                that many candidates fail on their first attempt. And the End Point Assessment (EPA)
                for apprentices under the new standards requires preparation that goes beyond what
                most college courses provide.
              </p>
              <p>
                A good training app lets you study between jobs, on the commute, or during quiet
                periods. It provides structured courses, practice questions with instant feedback,
                and progress tracking so you know which topics need more work. The best apps use
                proven learning techniques like spaced repetition flashcards and mock exam
                conditions to maximise retention and exam readiness.
              </p>
            </>
          ),
        },
        {
          id: 'what-to-look-for',
          heading: 'What to Look for in an Electrical Training App',
          content: (
            <>
              <p>
                Not all training apps are equal. Here are the key features that separate genuinely
                useful learning tools from basic question banks:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-white">
                    Practice questions with explanations
                  </span>{' '}
                  — multiple-choice questions are only useful if wrong answers include detailed
                  explanations of why the correct answer is right and where to find the relevant
                  regulation or standard.
                </li>
                <li>
                  <span className="font-semibold text-white">
                    Mock exams under timed conditions
                  </span>{' '}
                  — practising individual questions is different from completing a full exam paper
                  under time pressure. The best apps simulate real exam conditions.
                </li>
                <li>
                  <span className="font-semibold text-white">AI tutoring</span> — the ability to ask
                  questions about topics you do not understand and receive explanations tailored to
                  your level of knowledge.
                </li>
                <li>
                  <span className="font-semibold text-white">
                    Flashcards with spaced repetition
                  </span>{' '}
                  — spaced repetition is the most scientifically validated learning technique for
                  retention. Cards you get wrong appear more frequently; cards you know well appear
                  less often.
                </li>
                <li>
                  <span className="font-semibold text-white">Progress tracking</span> — knowing
                  which topics you have mastered and which need more work helps you focus your study
                  time where it matters most.
                </li>
                <li>
                  <span className="font-semibold text-white">Offline access</span> — you need to be
                  able to study on the tube, in a van, or on a break with no signal.
                </li>
                <li>
                  <span className="font-semibold text-white">Course breadth</span> — does the app
                  cover just one topic, or does it include the full range of qualifications and
                  specialisms you might need?
                </li>
              </ul>
            </>
          ),
        },
        {
          id: 'elec-mate-training',
          heading: 'Elec-Mate — The Complete Training Platform',
          content: (
            <>
              <p>
                Elec-Mate includes the most comprehensive training platform of any electrician app
                in the UK. With 46+ courses, 2,000+ practice questions, flashcards with spaced
                repetition, mock exams, an EPA simulator, and an AM2 simulator, it covers every
                stage of an electrician's learning journey.
              </p>
              <p>
                <strong>Courses available include:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>18th Edition (BS 7671:2018+A3:2024) — complete regulation coverage</li>
                <li>City and Guilds Level 2 Electrical Installation</li>
                <li>City and Guilds Level 3 Electrical Installation</li>
                <li>AM2 assessment preparation with practical scenario simulation</li>
                <li>End Point Assessment (EPA) simulator</li>
                <li>EV charger installation (including 18th Edition requirements)</li>
                <li>Solar PV systems</li>
                <li>Fire alarm systems (BS 5839)</li>
                <li>Emergency lighting (BS 5266)</li>
                <li>BMS (Building Management Systems)</li>
                <li>Safe isolation procedures</li>
                <li>Inspection and testing</li>
                <li>IPAF and PASMA awareness</li>
                <li>Manual handling</li>
                <li>And many more specialist and CPD courses</li>
              </ul>
              <SEOAppBridge
                title="46+ Training Courses — Built Into Elec-Mate"
                description="2,000+ practice questions, flashcards with spaced repetition, mock exams, EPA simulator, AM2 simulator, and AI study assistant. All included in your subscription alongside certificates, calculators, and business tools."
                icon={GraduationCap}
              />
              <p>
                What makes Elec-Mate's training unique is that it sits alongside professional tools.
                You can study the 18th Edition during your lunch break, then use the{' '}
                <SEOInternalLink href="/tools/electrical-testing-calculators">
                  70+ BS 7671 calculators
                </SEOInternalLink>{' '}
                to apply what you have learned on site. You can revise safe isolation in the
                morning, then use the{' '}
                <SEOInternalLink href="/tools/ai-electrician">AI tools</SEOInternalLink> to help
                with a real inspection in the afternoon. The learning and the doing happen in the
                same app.
              </p>
              <p>
                The AI study assistant lets you ask questions about any topic and receive
                explanations that reference the specific BS 7671 regulations, tables, and guidance
                notes. Unlike generic AI assistants, Elec-Mate's AI is trained on UK electrical
                standards and gives regulation-accurate answers.
              </p>
              <p>
                <strong>Pricing:</strong> All training is included in the standard Elec-Mate
                subscription from £4.99/month. There are no separate training fees or per-course
                charges. The 7-day free trial includes full access to all courses.
              </p>
            </>
          ),
        },
        {
          id: 'iet-apps',
          heading: 'IET On-Site Guide and BS 7671 Apps',
          content: (
            <>
              <p>
                The IET (Institution of Engineering and Technology) publishes the official On-Site
                Guide and Guidance Notes that accompany BS 7671. They offer digital versions of
                these publications as apps, providing authoritative reference material on your
                phone.
              </p>
              <p>
                <strong>Strengths:</strong> Authoritative content from the body that publishes BS
                7671. The On-Site Guide is an essential reference for UK electricians. Digital
                format means you always have it to hand on site.
              </p>
              <p>
                <strong>Limitations:</strong> These are reference tools, not training platforms.
                They do not include practice questions, mock exams, progress tracking, flashcards,
                or AI tutoring. You can read the regulations, but you cannot test your understanding
                or track your progress. The apps are typically purchased individually and can be
                expensive when you need multiple Guidance Notes.
              </p>
              <p>
                <strong>Best for:</strong> Supplementary reference alongside a structured training
                platform. Every electrician should have access to the On-Site Guide, but it is not a
                substitute for a training app with questions and exam simulation.
              </p>
            </>
          ),
        },
        {
          id: 'youtube-channels',
          heading: 'YouTube Channels for Electricians',
          content: (
            <>
              <p>
                YouTube hosts a large amount of electrical training content, from regulation
                explainers to practical installation tutorials. Channels like Electrician U, Jordan
                Sherwood, and Art Maybury provide valuable content that has helped many apprentices
                and qualified electricians alike.
              </p>
              <p>
                <strong>Strengths:</strong> Free. Visual demonstrations of practical skills. Wide
                range of topics. Some channels have very high production quality. Comments sections
                can provide additional insights.
              </p>
              <p>
                <strong>Limitations:</strong> No structure — you have to find and organise content
                yourself. No practice questions or exam simulation. No progress tracking. No
                flashcards. Cannot work offline without a premium subscription. Quality varies
                enormously between creators. Some content is US-focused (NEC, not BS 7671) which can
                cause confusion. No AI tutoring. Adverts interrupt the learning flow on free plans.
              </p>
              <p>
                <strong>Best for:</strong> Supplementary visual learning alongside a structured
                training platform. Excellent for practical demonstrations but not sufficient as a
                primary study resource for exams.
              </p>
            </>
          ),
        },
        {
          id: 'online-course-providers',
          heading: 'Online Course Providers',
          content: (
            <>
              <p>
                Various online course providers offer electrical training courses, including the
                18th Edition, inspection and testing, and EV charger installation. These range from
                established training organisations to individual tutors selling courses through
                platforms like Udemy.
              </p>
              <p>
                <strong>Strengths:</strong> Structured courses with clear learning outcomes. Some
                providers offer tutor support. Established training organisations may provide
                recognised certificates of completion. Courses can be very detailed and thorough.
              </p>
              <p>
                <strong>Limitations:</strong> Typically charged per course (£100-500+ each), which
                makes accessing multiple courses expensive. Separate from your professional tools —
                you study in one platform and work in another. Most do not include practice
                questions, mock exams, or flashcards. Mobile experience varies. No AI tutoring or
                spaced repetition.
              </p>
              <p>
                <strong>Best for:</strong> Electricians who need a single, specific qualification
                (such as an 18th Edition update) and prefer a traditional course structure with
                tutor access. Less cost-effective if you need multiple courses.
              </p>
            </>
          ),
        },
        {
          id: 'standalone-quiz-apps',
          heading: 'Standalone Quiz Apps',
          content: (
            <>
              <p>
                Several standalone quiz apps on the App Store and Google Play focus on electrical
                questions for UK electricians. These typically offer multiple-choice questions on BS
                7671, Level 2/3 topics, or AM2 preparation.
              </p>
              <p>
                <strong>Strengths:</strong> Quick, focused practice. Usually inexpensive or free.
                Good for revision on the go. Some have large question banks.
              </p>
              <p>
                <strong>Limitations:</strong> Cover only one topic or qualification level. No full
                course content — just questions without teaching material. No flashcards with spaced
                repetition. No mock exams under timed conditions. No integration with professional
                tools. Quality and accuracy of questions varies. Some have not been updated for the
                latest BS 7671 amendments.
              </p>
              <p>
                <strong>Best for:</strong> Quick revision sessions to supplement a more
                comprehensive training platform. Not sufficient as a primary study resource.
              </p>
            </>
          ),
        },
        {
          id: 'comparison-summary',
          heading: 'Comparison Summary',
          content: (
            <>
              <p>Here is how the options compare across the key criteria:</p>
              <div className="overflow-x-auto my-6">
                <table className="w-full text-sm text-white border-collapse">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-3 pr-4 font-semibold">Feature</th>
                      <th className="text-centre py-3 px-3 font-semibold text-yellow-400">
                        Elec-Mate
                      </th>
                      <th className="text-centre py-3 px-3 font-semibold">IET Apps</th>
                      <th className="text-centre py-3 px-3 font-semibold">YouTube</th>
                      <th className="text-centre py-3 px-3 font-semibold">Online Courses</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    <tr>
                      <td className="py-2 pr-4">Structured Courses</td>
                      <td className="py-2 px-3 text-green-400 text-centre font-semibold">46+</td>
                      <td className="py-2 px-3 text-centre">Reference only</td>
                      <td className="py-2 px-3 text-centre">Unstructured</td>
                      <td className="py-2 px-3 text-centre">Per-course</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Practice Questions</td>
                      <td className="py-2 px-3 text-centre font-semibold">2,000+</td>
                      <td className="py-2 px-3 text-centre">No</td>
                      <td className="py-2 px-3 text-centre">No</td>
                      <td className="py-2 px-3 text-centre">Varies</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Mock Exams</td>
                      <td className="py-2 px-3 text-green-400 text-centre font-semibold">Yes</td>
                      <td className="py-2 px-3 text-centre">No</td>
                      <td className="py-2 px-3 text-centre">No</td>
                      <td className="py-2 px-3 text-centre">Rare</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">AI Tutoring</td>
                      <td className="py-2 px-3 text-green-400 text-centre font-semibold">Yes</td>
                      <td className="py-2 px-3 text-centre">No</td>
                      <td className="py-2 px-3 text-centre">No</td>
                      <td className="py-2 px-3 text-centre">No</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Flashcards (Spaced Repetition)</td>
                      <td className="py-2 px-3 text-green-400 text-centre font-semibold">Yes</td>
                      <td className="py-2 px-3 text-centre">No</td>
                      <td className="py-2 px-3 text-centre">No</td>
                      <td className="py-2 px-3 text-centre">No</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Progress Tracking</td>
                      <td className="py-2 px-3 text-green-400 text-centre font-semibold">Yes</td>
                      <td className="py-2 px-3 text-centre">No</td>
                      <td className="py-2 px-3 text-centre">No</td>
                      <td className="py-2 px-3 text-centre">Some</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">EPA Simulator</td>
                      <td className="py-2 px-3 text-green-400 text-centre font-semibold">Yes</td>
                      <td className="py-2 px-3 text-centre">No</td>
                      <td className="py-2 px-3 text-centre">No</td>
                      <td className="py-2 px-3 text-centre">No</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">AM2 Simulator</td>
                      <td className="py-2 px-3 text-green-400 text-centre font-semibold">Yes</td>
                      <td className="py-2 px-3 text-centre">No</td>
                      <td className="py-2 px-3 text-centre">No</td>
                      <td className="py-2 px-3 text-centre">No</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Offline Access</td>
                      <td className="py-2 px-3 text-green-400 text-centre font-semibold">Yes</td>
                      <td className="py-2 px-3 text-centre">Yes</td>
                      <td className="py-2 px-3 text-centre">Premium only</td>
                      <td className="py-2 px-3 text-centre">Varies</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Professional Tools Included</td>
                      <td className="py-2 px-3 text-green-400 text-centre font-semibold">Yes</td>
                      <td className="py-2 px-3 text-centre">No</td>
                      <td className="py-2 px-3 text-centre">No</td>
                      <td className="py-2 px-3 text-centre">No</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Price</td>
                      <td className="py-2 px-3 text-centre font-semibold">From £4.99/mo</td>
                      <td className="py-2 px-3 text-centre">Per app</td>
                      <td className="py-2 px-3 text-centre">Free (ads)</td>
                      <td className="py-2 px-3 text-centre">£100-500+/course</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          ),
        },
        {
          id: 'our-recommendation',
          heading: 'Our Recommendation',
          content: (
            <>
              <p>
                For comprehensive electrical training that goes beyond basic question banks,
                Elec-Mate is the clear leader. No other single platform offers 46+ courses, 2,000+
                practice questions, flashcards with spaced repetition, mock exams, EPA and AM2
                simulators, and an AI study assistant — all alongside professional tools like
                certificates, calculators, and business management.
              </p>
              <p>
                The integration between training and professional tools is the key differentiator.
                An apprentice studying with Elec-Mate uses the same app that they will use as a
                qualified electrician for certificates, calculations, and business management. There
                is no transition, no learning a new platform, and no additional cost.
              </p>
              <SEOAppBridge
                title="Study and Work in One App"
                description="46+ courses, 2,000+ questions, flashcards, mock exams, EPA simulator, AM2 simulator — plus 8 certificate types, 70+ calculators, and AI tools. All from £4.99/month."
                icon={GraduationCap}
              />
              <p>
                For the best results, combine Elec-Mate's structured courses with supplementary
                resources: the IET On-Site Guide for authoritative reference, YouTube for visual
                demonstrations of practical skills, and your college course for hands-on supervised
                practice. But make Elec-Mate the backbone of your study — the practice questions,
                mock exams, and spaced repetition flashcards are the most effective tools for exam
                preparation.
              </p>
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'What is the best training app for electrical apprentices in the UK?',
          answer:
            'Elec-Mate is the most comprehensive training app for UK electrical apprentices in 2026. It includes 46+ courses covering Level 2 and Level 3 Electrical Installation, 18th Edition (BS 7671:2018+A3:2024), AM2 assessment preparation, and EPA simulator. The platform offers 2,000+ practice questions with detailed explanations, flashcards with spaced repetition for maximum retention, mock exams under timed conditions, and an AI study assistant that can explain any topic with BS 7671 regulation references. All training is included in the standard subscription from £4.99/month — there are no per-course charges. Apprentices also get access to professional tools (8 certificate types, 70+ calculators, AI tools, business management) that they will use throughout their career.',
        },
        {
          question: 'Is there an app for 18th Edition revision?',
          answer:
            'Yes. Elec-Mate includes a complete 18th Edition course covering BS 7671:2018+A3:2024, including the changes introduced by Amendment 3 (A3:2024) such as Regulation 530.3.201 for bidirectional and unidirectional devices. The course includes structured learning content, practice questions, and flashcards covering all parts of BS 7671 — from fundamental principles and general characteristics through to inspection and testing. You can also use the AI study assistant to ask questions about specific regulations and receive detailed explanations. The IET also offers digital versions of the On-Site Guide and Guidance Notes, which are valuable reference tools but do not include practice questions or exam simulation.',
        },
        {
          question: 'How can I prepare for the AM2 assessment?',
          answer:
            'The AM2 assessment is a practical exam that tests your ability to carry out electrical installation work safely and competently. The best preparation combines practical experience with structured study. Elec-Mate includes an AM2 simulator that walks through typical assessment scenarios, tests your knowledge of safe isolation procedures, testing sequences, and BS 7671 requirements, and helps you understand what assessors look for. The app also includes practice questions specific to AM2 content, flashcards for key facts and procedures, and the AI study assistant can answer questions about assessment scenarios. For practical preparation, hands-on practice under supervision and attending an AM2 preparation course at a training centre are also recommended.',
        },
        {
          question: 'What is spaced repetition and why does it matter?',
          answer:
            'Spaced repetition is a learning technique where you review information at increasing intervals based on how well you know it. If you get a flashcard wrong, it appears again soon. If you get it right, it appears less frequently — but never disappears entirely, ensuring long-term retention. Research consistently shows that spaced repetition is the most effective technique for retaining factual information, which makes it ideal for learning BS 7671 regulations, cable current-carrying capacities, maximum Zs values, and other technical data that electricians need to recall. Elec-Mate includes flashcards with a spaced repetition algorithm that automatically adjusts review frequency based on your performance, so your study time is always focused on the material you need to practise most.',
        },
        {
          question: 'Can I study for Level 2 and Level 3 on the same app?',
          answer:
            'Yes. Elec-Mate includes courses for both Level 2 and Level 3 Electrical Installation, aligned with the City and Guilds curriculum. Both courses are included in the standard subscription — there are no per-course charges. You also get 18th Edition content, AM2 preparation, EPA simulator, and 40+ additional specialist courses covering EV charging, solar PV, fire alarm systems, BMS, safe isolation, and more. This makes Elec-Mate suitable for the entire apprenticeship journey from Level 2 through to EPA and AM2, and beyond into CPD and specialist training as a qualified electrician.',
        },
        {
          question: 'Do I need an internet connection to study?',
          answer:
            'Elec-Mate is designed for offline study. Course content, practice questions, and flashcards are available without an internet connection, so you can study on the tube, in a van, or during breaks on site with no signal. Progress syncs to the cloud when connectivity returns, so you can switch between devices without losing your place. The AI study assistant requires an internet connection because AI processing happens on cloud servers, but all other training features work offline.',
        },
        {
          question: 'How much does electrical training cost?',
          answer:
            'Training costs vary enormously depending on the delivery method. Traditional classroom courses for the 18th Edition typically cost £200-400 per course. Online courses from training providers range from £100-500+ per course. Individual BS 7671 quiz apps may be free or a few pounds but cover only one topic. Elec-Mate includes 46+ courses, 2,000+ practice questions, flashcards, mock exams, simulators, and an AI study assistant — all for £4.99/month with the standard subscription. For an apprentice who needs Level 2, Level 3, 18th Edition, AM2 preparation, and EPA simulator, Elec-Mate provides all of these for less than the cost of a single traditional course.',
        },
      ]}
      relatedPages={[
        {
          href: '/courses/18th-edition',
          title: '18th Edition Course',
          description:
            'Complete BS 7671:2018+A3:2024 course with practice questions, flashcards, and AI study assistant.',
          icon: BookOpen,
          category: 'Training',
        },
        {
          href: '/courses/am2-exam-preparation',
          title: 'AM2 Exam Preparation',
          description:
            'AM2 simulator with practical scenarios, testing sequences, and assessor expectations.',
          icon: Trophy,
          category: 'Training',
        },
        {
          href: '/courses/epa-preparation',
          title: 'EPA Preparation',
          description: 'End Point Assessment simulator for electrical installation apprentices.',
          icon: ClipboardCheck,
          category: 'Training',
        },
        {
          href: '/guides/best-eicr-software-uk',
          title: 'Best EICR Software UK',
          description:
            'Compare EICR software options — Elec-Mate, iCertifi, CertsApp, Easy EICR, and desktop software.',
          icon: FileCheck2,
          category: 'Guide',
        },
        {
          href: '/tools/electrical-testing-calculators',
          title: 'Electrical Calculators',
          description:
            '70+ BS 7671 calculators for cable sizing, voltage drop, maximum demand, and more.',
          icon: Calculator,
          category: 'Tools',
        },
        {
          href: '/tools/electrician-app-for-iphone',
          title: 'Electrician App for iPhone',
          description:
            'Full feature set on iPhone — training, certificates, calculators, and AI tools.',
          icon: Smartphone,
          category: 'Tools',
        },
      ]}
      ctaHeading="Start learning with Elec-Mate"
      ctaSubheading="46+ courses, 2,000+ questions, flashcards, mock exams, EPA simulator, AM2 simulator. All included alongside certificates, calculators, and business tools. 7-day free trial."
    />
  );
}
