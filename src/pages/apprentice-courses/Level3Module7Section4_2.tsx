/**
 * Level 3 Module 7 Section 4.2 - Attending Courses and Seminars
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Attending Courses and Seminars - Level 3 Module 7 Section 4.2";
const DESCRIPTION = "Understanding formal CPD opportunities including training courses, industry seminars, manufacturer training, and professional development events.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the purpose of 18th Edition update training?",
    options: [
      "To replace the original 18th Edition qualification",
      "To learn about changes and amendments since the last edition you trained on",
      "It's only required for new electricians",
      "To qualify for building control approval"
    ],
    correctIndex: 1,
    explanation: "Update training covers changes between editions or amendments. If you qualified on the 18th Edition but Amendment 2 has been published, update training ensures you understand the changes. It builds on existing knowledge rather than starting from scratch."
  },
  {
    id: "check-2",
    question: "Which organisations commonly offer training for electricians in the UK?",
    options: [
      "Only colleges with City & Guilds centres",
      "Training providers, manufacturers, competent person schemes, trade bodies, and colleges",
      "Only the JIB",
      "Only the IET"
    ],
    correctIndex: 1,
    explanation: "Many organisations provide training: private training providers, manufacturers (product-specific), competent person schemes (NICEIC, NAPIT), trade bodies, local colleges, and online providers. Choose based on your needs and their reputation."
  },
  {
    id: "check-3",
    question: "Manufacturer training is valuable because it:",
    options: [
      "Replaces the need for BS 7671 knowledge",
      "Provides specific knowledge about products and often comes with recognised certificates",
      "Is only useful for sales purposes",
      "Is always free of charge"
    ],
    correctIndex: 1,
    explanation: "Manufacturer training provides detailed knowledge about specific products, installation requirements, commissioning, and troubleshooting. Many offer certificates that demonstrate competence with their equipment, which can be valuable for clients and employers."
  },
  {
    id: "check-4",
    question: "When choosing a training course, you should consider:",
    options: [
      "Only the price - cheaper is always better",
      "Course content, provider reputation, practical vs theory balance, and certification provided",
      "Only courses your employer chooses",
      "Only courses available locally"
    ],
    correctIndex: 1,
    explanation: "Evaluate courses on multiple factors: content relevance to your needs, provider reputation and qualifications, balance of practical and theory, what certification is provided, cost versus value, and logistics like location and timing."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A City & Guilds 2382 qualification covers:",
    options: [
      "Practical installation skills",
      "Understanding and applying BS 7671 (IET Wiring Regulations)",
      "Business management for electricians",
      "Health and safety only"
    ],
    correctAnswer: 1,
    explanation: "The City & Guilds 2382 is the qualification for understanding and applying BS 7671 (IET Wiring Regulations). It's essential for anyone involved in designing, installing, or certifying electrical work."
  },
  {
    id: 2,
    question: "Competent person schemes like NICEIC and NAPIT offer members:",
    options: [
      "No training support",
      "Technical helplines, training events, and updates on regulatory changes",
      "Only certification services",
      "Only public liability insurance"
    ],
    correctAnswer: 1,
    explanation: "Competent person schemes support members through technical helplines for advice, training events and seminars, updates on regulatory changes, and various resources. These are valuable CPD opportunities included with membership."
  },
  {
    id: 3,
    question: "Trade exhibitions and conferences are useful for:",
    options: [
      "Nothing practical - they're just marketing events",
      "Learning about new products, networking, and attending technical seminars",
      "Only sales staff",
      "Only company owners"
    ],
    correctAnswer: 1,
    explanation: "Trade exhibitions and conferences (like ELEX shows) offer opportunities to see new products, attend technical seminars, network with peers and suppliers, and learn about industry developments. They combine multiple CPD benefits."
  },
  {
    id: 4,
    question: "When your employer pays for training, you should:",
    options: [
      "See it as entirely their responsibility",
      "Take it seriously, apply what you learn, and provide value in return",
      "Only attend if it's during work hours",
      "Request time off in compensation"
    ],
    correctAnswer: 1,
    explanation: "Employer-funded training is an investment in you. Maximise the benefit by engaging fully, applying what you learn to improve your work, and demonstrating the value of the investment. This encourages further training opportunities."
  },
  {
    id: 5,
    question: "The IET provides members with:",
    options: [
      "Only the BS 7671 book",
      "Technical publications, guidance notes, events, and professional recognition",
      "Guaranteed employment",
      "Exemption from regulations"
    ],
    correctAnswer: 1,
    explanation: "IET membership provides access to technical publications and guidance notes, professional development events, networking opportunities, and professional recognition. These resources support ongoing learning and career development."
  },
  {
    id: 6,
    question: "Short courses (1-2 days) are best suited for:",
    options: [
      "Complete career changes",
      "Specific topics, updates, or refresher training",
      "Only beginners",
      "Nothing useful"
    ],
    correctAnswer: 1,
    explanation: "Short courses are effective for focused topics like regulatory updates, specific equipment training, refresher sessions, or adding knowledge in defined areas. They fit around work commitments better than longer programmes."
  },
  {
    id: 7,
    question: "Before attending a course, you should:",
    options: [
      "Do nothing - the trainer will explain everything",
      "Review pre-course material, identify learning goals, and prepare questions",
      "Assume you already know everything",
      "Wait for instructions from your employer"
    ],
    correctAnswer: 1,
    explanation: "Preparation maximises learning: review any pre-course material, think about what you want to gain, prepare questions about areas you find challenging, and arrive ready to engage. Active participation improves outcomes."
  },
  {
    id: 8,
    question: "Certificates from training courses:",
    options: [
      "Are worthless pieces of paper",
      "Provide evidence of CPD for ECS cards, scheme membership, and employers",
      "Replace the need for NVQ qualifications",
      "Are only useful for your first job"
    ],
    correctAnswer: 1,
    explanation: "Training certificates provide evidence of your CPD. Keep them safely - they support ECS card applications and renewals, competent person scheme requirements, job applications, and your professional portfolio."
  },
  {
    id: 9,
    question: "Seminars differ from courses primarily in that seminars:",
    options: [
      "Are always longer",
      "Typically focus on information sharing and updates rather than assessed learning",
      "Are only for managers",
      "Never provide useful information"
    ],
    correctAnswer: 1,
    explanation: "Seminars focus on sharing information, discussing developments, or exploring topics - often without formal assessment. Courses typically include structured learning with assessment. Both have value for different purposes."
  },
  {
    id: 10,
    question: "Networking at training events can:",
    options: [
      "Waste time that should be spent learning",
      "Create opportunities for knowledge sharing, career development, and business contacts",
      "Only benefit salespeople",
      "Be inappropriate in professional settings"
    ],
    correctAnswer: 1,
    explanation: "Networking during breaks and at training events creates valuable connections. Peers share practical experiences, industry contacts can lead to opportunities, and suppliers provide product insights. Don't undervalue informal interaction."
  },
  {
    id: 11,
    question: "If you disagree with something taught on a course, you should:",
    options: [
      "Stay silent and ignore it",
      "Raise questions professionally and seek clarification or evidence",
      "Walk out immediately",
      "Argue loudly with the trainer"
    ],
    correctAnswer: 1,
    explanation: "Question professionally if something seems incorrect or unclear. Good trainers welcome challenges - it leads to better understanding for everyone. You might learn something new, or help correct an error."
  },
  {
    id: 12,
    question: "Applying learning after a course is important because:",
    options: [
      "It's not important - the certificate is all that matters",
      "Knowledge is quickly forgotten if not applied, and application demonstrates value",
      "Employers don't expect you to change anything",
      "Regulations prevent you from using new knowledge"
    ],
    correctAnswer: 1,
    explanation: "Learning fades quickly without application. Actively using new knowledge reinforces it, improves your work, and demonstrates the value of training. Keep course notes for reference and look for opportunities to apply what you learned."
  }
];

const faqs = [
  {
    question: "How do I find reputable training providers?",
    answer: "Check if they're approved by awarding bodies (City & Guilds, EAL), look at reviews and recommendations, ask colleagues about their experiences, and verify trainer qualifications. Competent person schemes can recommend approved providers. Cheaper isn't always better - quality matters."
  },
  {
    question: "Should I train during work time or personal time?",
    answer: "This depends on your employer and the training type. Many employers provide time for essential training (like regulations updates). For career development beyond your current role, some personal time investment may be appropriate. Discuss with your employer - they may be more supportive than you expect."
  },
  {
    question: "What if I fail a course assessment?",
    answer: "Most courses offer resit opportunities. Review what went wrong, do additional study, and try again. A single fail isn't the end - it's part of learning. Some find that struggling with a topic initially leads to deeper understanding after additional work."
  },
  {
    question: "How often should I attend formal training?",
    answer: "At minimum, attend training when regulations update (typically every 3-4 years). Beyond that, aim for at least one meaningful training event annually. Combine formal courses with informal learning for balanced development."
  },
  {
    question: "Are online courses as good as classroom training?",
    answer: "Online courses offer flexibility and often lower cost. They work well for theory and knowledge-based learning. Practical skills typically need hands-on training. Consider a mix - online for theory, classroom for practical applications and networking."
  },
  {
    question: "What's the difference between a certificate and a qualification?",
    answer: "Qualifications (like 2382 or 2391) are formally assessed against defined standards and registered with awarding bodies. Certificates of attendance or completion show you participated in training but may not be formally assessed. Both have value but serve different purposes."
  }
];

const Level3Module7Section4_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module7-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 7.4.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Attending Courses and Seminars
          </h1>
          <p className="text-white/80">
            Making the most of formal training opportunities including 18th Edition updates
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Updates:</strong> Essential when regulations change</li>
              <li><strong>Providers:</strong> Many options - choose quality</li>
              <li><strong>Certificates:</strong> Evidence for ECS and schemes</li>
              <li><strong>Application:</strong> Use learning or lose it</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Common Course Types</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Regulations:</strong> 18th Edition and amendments</li>
              <li><strong>Testing:</strong> Inspection and certification</li>
              <li><strong>Specialist:</strong> Solar, EV, fire alarms</li>
              <li><strong>Safety:</strong> PAT, working at height</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand different types of formal training available",
              "Choose appropriate courses and providers",
              "Maximise learning from training events",
              "Apply training effectively in your work",
              "Maintain records for professional development",
              "Balance employer and personal development investment"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Types of Formal Training */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Types of Formal Training
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Formal training comes in many forms, from short update seminars to extensive qualifications. Understanding what's available helps you choose training that meets your needs and supports your career development effectively.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common training types for electricians:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Regulation updates:</strong> 18th Edition amendment courses, BS 7671 changes</li>
                <li><strong>Qualifications:</strong> 2382 (Regulations), 2391 (Inspection & Testing), 2377 (PAT)</li>
                <li><strong>Specialist areas:</strong> Solar PV, EV charging, fire alarm systems, emergency lighting</li>
                <li><strong>Manufacturer training:</strong> Specific products and systems</li>
                <li><strong>Safety training:</strong> Working at height, confined spaces, first aid</li>
                <li><strong>Business skills:</strong> Estimating, project management, customer service</li>
              </ul>
            </div>

            <p>
              Match training to your needs. If your employer works on solar installations, solar training is directly valuable. If you're planning to go self-employed, business skills training makes sense. Strategic choices maximise return on training investment.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Some training is essential (regulations updates), some is valuable for current work, and some prepares for future opportunities. Balance immediate needs with longer-term development.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Training Providers */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Choosing Training Providers
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The quality of training varies significantly between providers. A cheap course from an unknown provider may waste time and money. Investing in quality training from reputable organisations ensures you learn effectively and get recognised certification.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Training Providers</p>
                <ul className="text-sm text-white space-y-1">
                  <li>City & Guilds approved centres</li>
                  <li>EAL approved centres</li>
                  <li>NICEIC, NAPIT and scheme training</li>
                  <li>Manufacturer training academies</li>
                  <li>IET events and webinars</li>
                  <li>Private training companies</li>
                  <li>Colleges and universities</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Quality Indicators</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Awarding body approval</li>
                  <li>Trainer qualifications and experience</li>
                  <li>Reviews and recommendations</li>
                  <li>Practical workshop facilities</li>
                  <li>Group sizes and support</li>
                  <li>Certification provided</li>
                </ul>
              </div>
            </div>

            <p>
              Ask colleagues for recommendations. Check reviews online but be aware that extreme views may not be representative. Contact providers to ask about trainers, facilities, and course structure. Good providers are happy to explain what they offer.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> For an 18th Edition update, a City & Guilds approved centre with experienced trainers and hands-on examples will likely provide more value than an unknown provider offering the same content for half the price.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Manufacturer and Trade Body Training */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Manufacturer and Trade Body Training
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Beyond generic qualifications, manufacturers and trade bodies offer valuable training. Manufacturer training provides deep knowledge of specific products. Trade body events offer networking and industry insights. Both contribute to well-rounded professional development.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Benefits of manufacturer training:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Detailed product knowledge beyond data sheets</li>
                <li>Correct installation and commissioning procedures</li>
                <li>Troubleshooting and fault-finding techniques</li>
                <li>Certificates demonstrating competence</li>
                <li>Access to technical support</li>
                <li>Sometimes prerequisites for warranties</li>
              </ul>
            </div>

            <p>
              Major manufacturers like Schneider Electric, Hager, and ABB have training centres and online courses. EV charging manufacturers (Pod Point, Andersen, etc.) offer installation training. Solar and battery system manufacturers provide accreditation programmes. These add valuable specialisations.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Industry events:</strong> Trade shows like ELEX and conferences combine product exhibitions with technical seminars. Competent person schemes hold annual events. These combine learning with networking opportunities - valuable on multiple levels.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Maximising Training Value */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Maximising Training Value
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The value from training depends not just on the course quality but on your engagement before, during, and after. Active participation, thoughtful note-taking, and deliberate application of learning multiply the return on your time and money investment.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Before</p>
                <p className="text-white/90 text-xs">Review materials, identify goals, prepare questions</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">During</p>
                <p className="text-white/90 text-xs">Engage actively, take notes, ask questions</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">After</p>
                <p className="text-white/90 text-xs">Review notes, apply learning, share knowledge</p>
              </div>
            </div>

            <p>
              Don't just attend training - participate. Ask questions, discuss with other attendees during breaks, and challenge yourself to understand rather than just remember. The more you engage, the more you retain and the more value you extract.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Application is key:</strong> Research shows we forget most of what we learn within weeks if we don't apply it. Look for opportunities to use new knowledge immediately. Discuss it with colleagues. Refer back to course materials. Active application embeds learning.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Getting Maximum Value</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Research and prepare before attending</li>
                <li>Take notes you'll actually review later</li>
                <li>Network with other attendees during breaks</li>
                <li>Apply learning within days if possible</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">After the Course</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Store certificates safely with your portfolio</li>
                <li>Share key points with colleagues</li>
                <li>Identify opportunities to apply what you learned</li>
                <li>Record the CPD in your development log</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Training Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Price focus:</strong> Cheapest isn't always best value</li>
                <li><strong>Passive attendance:</strong> Just being present doesn't create learning</li>
                <li><strong>No follow-up:</strong> Learning fades without application</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Essential Training</p>
                <ul className="space-y-0.5">
                  <li>BS 7671 / 18th Edition and amendments</li>
                  <li>Inspection and testing (2391)</li>
                  <li>PAT testing (2377)</li>
                  <li>Relevant specialist areas</li>
                  <li>First aid and safety training</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Provider Types</p>
                <ul className="space-y-0.5">
                  <li>City & Guilds / EAL centres</li>
                  <li>Competent person schemes</li>
                  <li>Manufacturer training academies</li>
                  <li>Private training companies</li>
                  <li>Professional body events</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module7-section4-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Lifelong Learning
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module7-section4-3">
              Next: Online Learning Platforms
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module7Section4_2;
