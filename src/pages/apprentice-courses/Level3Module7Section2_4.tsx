/**
 * Level 3 Module 7 Section 2.4 - Professional Behaviour on Site
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Professional Behaviour on Site - Level 3 Module 7 Section 2.4";
const DESCRIPTION = "Understanding professional conduct, client relations, site etiquette, and workplace behaviour standards for electrical contractors.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the most important aspect of professional behaviour when working in a client's home?",
    options: [
      "Finishing as quickly as possible",
      "Respect for the client's property and clear communication",
      "Avoiding any conversation with the client",
      "Using only the cheapest materials"
    ],
    correctIndex: 1,
    explanation: "Respecting the client's property (protecting floors, cleaning up, not smoking) and maintaining clear communication about the work builds trust and reflects well on you and the industry."
  },
  {
    id: "check-2",
    question: "How should you handle a disagreement with another trade on site?",
    options: [
      "Argue loudly to establish your position",
      "Complain directly to the client",
      "Discuss professionally, involve supervision if needed, never escalate in front of clients",
      "Ignore them completely and work around them"
    ],
    correctIndex: 2,
    explanation: "Professional disagreements should be resolved calmly through discussion or escalation to supervision. Never argue in front of clients or create a hostile atmosphere - it damages everyone's reputation."
  },
  {
    id: "check-3",
    question: "What should you do if you accidentally cause damage to a client's property?",
    options: [
      "Hide it and hope they don't notice",
      "Blame another trade or the age of the building",
      "Inform the client honestly and arrange for repair or compensation",
      "Leave quickly before they discover it"
    ],
    correctIndex: 2,
    explanation: "Honesty is essential. Inform the client, apologise, and arrange to put it right. Hiding damage destroys trust and often leads to much bigger problems when discovered later."
  },
  {
    id: "check-4",
    question: "Professional appearance on site includes:",
    options: [
      "Whatever you find comfortable",
      "Clean workwear, appropriate PPE, and personal hygiene",
      "Fashionable clothing regardless of practicality",
      "Only PPE when supervisors are present"
    ],
    correctIndex: 1,
    explanation: "Professional appearance includes clean, appropriate workwear, required PPE at all times, and good personal hygiene. This creates confidence in clients and shows respect for the work environment."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A client asks you to do additional work 'while you're here' that wasn't quoted for. You should:",
    options: [
      "Just do it and add it to the bill later",
      "Refuse outright without discussion",
      "Discuss scope, provide a cost estimate, and get agreement before proceeding",
      "Do it for free to keep them happy"
    ],
    correctAnswer: 2,
    explanation: "Variations and additional work are normal but should be properly agreed. Discuss what's involved, provide a clear cost indication, and get agreement before doing extra work. This prevents disputes later."
  },
  {
    id: 2,
    question: "What is appropriate mobile phone use on site?",
    options: [
      "Personal calls whenever convenient",
      "Business calls only, personal use during breaks, never while working at height or with live equipment",
      "No phone use ever allowed",
      "Unlimited use as long as work gets done"
    ],
    correctAnswer: 1,
    explanation: "Phone use should be limited to essential business calls, with personal use restricted to breaks. Never use phones while working at height, with live equipment, or when concentration is required for safety."
  },
  {
    id: 3,
    question: "When working in an occupied building, you should:",
    options: [
      "Treat it exactly like an empty construction site",
      "Minimise disruption, keep areas clean, and communicate planned disruptions in advance",
      "Work only when occupants are out",
      "Ignore the occupants to avoid bothering them"
    ],
    correctAnswer: 1,
    explanation: "Occupied buildings require additional consideration. Communicate timing of noisy work or power outages, keep work areas tidy, protect furnishings, and be mindful of the impact on people living or working there."
  },
  {
    id: 4,
    question: "If a client offers you a cup of tea, the professional response is:",
    options: [
      "Refuse - it's unprofessional to accept anything",
      "Accept graciously if practical, and clean up after yourself",
      "Ask for something more substantial instead",
      "Accept and take a long break"
    ],
    correctAnswer: 1,
    explanation: "Accepting hospitality politely is fine and helps build rapport. Be gracious, don't abuse it by taking excessive breaks, and always clean up after yourself. It's about building positive relationships."
  },
  {
    id: 5,
    question: "What is the correct approach to discussing other electricians' work with clients?",
    options: [
      "Criticise it to make yourself look better",
      "Be factual and professional - report safety issues objectively without personal attacks",
      "Refuse to comment on anything",
      "Recommend they sue the previous electrician"
    ],
    correctAnswer: 1,
    explanation: "Report safety issues factually using EICR codes or similar. Never personally attack other electricians or use it as a sales opportunity. Be professional - you may not know the full context of previous work."
  },
  {
    id: 6,
    question: "Personal protective equipment (PPE) should be worn:",
    options: [
      "Only when supervisors are watching",
      "Whenever the specific hazards require it, consistently",
      "Only on commercial sites",
      "When it's convenient"
    ],
    correctAnswer: 1,
    explanation: "PPE is worn based on hazard assessment, not who's watching. The same hazards exist whether you're supervised or not. Consistent use protects you and sets the right example for others."
  },
  {
    id: 7,
    question: "A client makes inappropriate personal comments. The professional response is:",
    options: [
      "Respond in kind to maintain rapport",
      "Politely deflect and maintain professional boundaries",
      "Leave the job immediately",
      "Report them to the police"
    ],
    correctAnswer: 1,
    explanation: "Maintain professional boundaries with polite deflection. Most situations can be managed by keeping conversation work-focused. If behaviour becomes serious or threatening, escalate to your employer."
  },
  {
    id: 8,
    question: "Confidentiality on site means:",
    options: [
      "Never speaking to anyone about anything",
      "Not discussing clients' personal information or security details outside of work requirements",
      "Only applicable to commercial work",
      "Something that only applies to managers"
    ],
    correctAnswer: 1,
    explanation: "You may learn sensitive information - security codes, building layouts, personal circumstances. This information should never be shared with others outside professional requirements. Breach of confidentiality damages trust and can create security risks."
  },
  {
    id: 9,
    question: "When you arrive at a job and find existing work that's unsafe, you should:",
    options: [
      "Proceed with your work and ignore it",
      "Make it safe if immediately dangerous, document it, and inform the client in writing",
      "Refuse to work and leave",
      "Post about it on social media"
    ],
    correctAnswer: 1,
    explanation: "Your duty of care requires action. If immediately dangerous, make it safe. Document what you find, inform the client/duty holder in writing, and record any refusal to address issues. Never post details on social media."
  },
  {
    id: 10,
    question: "Smoking on client premises is:",
    options: [
      "Acceptable if you ask permission first",
      "Only allowed in designated smoking areas, never inside buildings",
      "Fine as long as you don't leave butts",
      "Acceptable if the client smokes too"
    ],
    correctAnswer: 1,
    explanation: "Smoking is prohibited inside workplaces by law. Even outside, use designated areas, don't leave litter, and be mindful of smoke reaching building occupants. Many clients prohibit smoking on their entire premises."
  },
  {
    id: 11,
    question: "If running late for a job, professional practice is to:",
    options: [
      "Just turn up when you can",
      "Contact the client as early as possible to explain and give new estimated arrival time",
      "Make up an excuse when you arrive",
      "Cancel and reschedule for another day"
    ],
    correctAnswer: 1,
    explanation: "Clients may have rearranged their day for your visit. Contact them as soon as you know you'll be late, apologise, and give a realistic new arrival time. This shows respect for their time."
  },
  {
    id: 12,
    question: "End-of-day site protocol should include:",
    options: [
      "Leaving everything as is for tomorrow",
      "Securing work, making areas safe, cleaning up, and confirming next steps with the client",
      "Just locking your tools away",
      "Finishing as quickly as possible to avoid traffic"
    ],
    correctAnswer: 1,
    explanation: "Before leaving: secure any exposed work, ensure areas are safe (no exposed wires, trip hazards removed), clean up work areas, and let the client know the status and when you'll return."
  }
];

const faqs = [
  {
    question: "How do I handle unreasonable client expectations?",
    answer: "Set clear expectations from the start about what's included in the quote and timeline. If clients expect unreasonable extras, politely explain why they're outside scope and offer to quote for additional work. Document everything. If they become abusive, you have the right to walk away - but consult your employer first if applicable."
  },
  {
    question: "What if I need to use the client's toilet?",
    answer: "It's generally acceptable to ask to use client facilities, but ask politely and leave everything clean. On commercial sites, use designated facilities. Avoid using bathroom facilities excessively - plan ahead. Some electricians carry portable hand washing equipment for sites without facilities."
  },
  {
    question: "How much should I chat with clients while working?",
    answer: "Balance friendliness with productivity. Some conversation builds rapport and helps with customer satisfaction, but don't get so distracted that work suffers. If clients want to chat extensively, politely explain you need to concentrate on the work for safety and quality reasons."
  },
  {
    question: "Should I give quotes for other work I notice while on site?",
    answer: "If you notice genuinely useful improvements, mentioning them is good service - but don't be pushy or create fear to generate work. Focus on genuine recommendations, not upselling. If they're interested, provide a separate quote rather than trying to add work to the current job."
  },
  {
    question: "What if clients try to pay me cash to avoid VAT or receipts?",
    answer: "Never engage in tax evasion - it's illegal and puts your business at risk. Politely explain that all work must be invoiced properly for warranty, certification, and insurance purposes. If they insist, decline the work. Proper documentation protects both parties."
  },
  {
    question: "How should I dress for different types of jobs?",
    answer: "Clean, appropriate workwear suitable for the environment. Domestic work: clean, presentable clothes that protect you but don't look scruffy. Industrial/commercial: site-specific requirements including proper PPE. Always wear appropriate footwear. Company uniforms or branded clothing look professional."
  }
];

const Level3Module7Section2_4 = () => {
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
            <Link to="/study-centre/apprentice/level3-module7-section2">
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
            <span>Module 7.2.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Professional Behaviour on Site
          </h1>
          <p className="text-white/80">
            Client relations, workplace etiquette, and professional standards
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Respect:</strong> Treat property and people with care</li>
              <li><strong>Communication:</strong> Clear, honest, timely updates</li>
              <li><strong>Appearance:</strong> Clean, appropriate workwear and PPE</li>
              <li><strong>Reliability:</strong> On time, prepared, and professional</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Business Impact</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Referrals:</strong> Good behaviour generates recommendations</li>
              <li><strong>Repeat work:</strong> Clients return to professionals they trust</li>
              <li><strong>Reputation:</strong> Word spreads about both good and bad</li>
              <li><strong>Career:</strong> Professional conduct opens doors</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand professional standards for client interaction",
              "Know appropriate workplace behaviour and etiquette",
              "Manage difficult situations professionally",
              "Present yourself and your work positively",
              "Handle variations and additional work requests",
              "Maintain confidentiality and trust"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Client Relations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Client Relations and Communication
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Your relationship with clients starts before you arrive and extends beyond completion of the work. How you communicate, present yourself, and treat their property determines whether they'll recommend you and use you again. In an industry where referrals are valuable, professional behaviour directly impacts your career.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Keys to positive client relations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Confirm appointments and arrive on time (or communicate delays)</li>
                <li>Explain work clearly in terms they understand, avoiding jargon</li>
                <li>Keep them informed of progress and any issues discovered</li>
                <li>Provide clear costs before doing additional work</li>
                <li>Be honest about problems, timelines, and your capabilities</li>
                <li>Follow up after completion to ensure satisfaction</li>
              </ul>
            </div>

            <p>
              Domestic clients are often anxious about having someone in their home and about the cost and disruption. Reassurance, clear communication, and respect for their property goes a long way. Commercial clients have different concerns - often about timelines, minimising disruption to operations, and meeting their own deadlines.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> A dissatisfied client tells many more people than a satisfied one. One bad experience can undo years of reputation building. Invest in getting client relations right.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Workplace Etiquette */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Workplace Etiquette and Behaviour
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Professional behaviour extends to how you conduct yourself on site throughout the working day. This includes interactions with clients, other trades, and your own colleagues. Creating a positive, respectful work environment makes the job more pleasant and productive for everyone.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Do:</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Protect floors and furnishings in client properties</li>
                  <li>Clean up at end of day, especially in occupied spaces</li>
                  <li>Be courteous to other trades and coordinate work</li>
                  <li>Use appropriate language at all times</li>
                  <li>Keep noise and disruption to minimum practical levels</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Don't:</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Smoke inside or leave litter anywhere</li>
                  <li>Play loud music or use excessive language</li>
                  <li>Argue with other trades in front of clients</li>
                  <li>Make personal comments about property or occupants</li>
                  <li>Use client facilities excessively</li>
                </ul>
              </div>
            </div>

            <p>
              On multi-trade sites, coordination and mutual respect are essential. Electricians, plumbers, carpenters, and other trades all have schedules and requirements. Professional collaboration makes everyone's job easier. Territorial disputes and blame games achieve nothing positive.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Career tip:</strong> Your reputation among other trades matters. Main contractors and site managers remember who's professional and who causes problems. Being known as someone good to work with leads to more opportunities.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Handling Difficult Situations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Handling Difficult Situations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Not every job goes smoothly. You'll encounter difficult clients, unexpected problems, and stressful situations. How you handle these challenges defines your professionalism. Staying calm, finding solutions, and maintaining integrity under pressure sets you apart.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common challenges and professional responses:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Discovering unsafe previous work:</strong> Document it, inform the client factually, don't personally attack previous electricians</li>
                <li><strong>Scope creep and extras:</strong> Get agreement before doing additional work, provide clear costs</li>
                <li><strong>Client complaints:</strong> Listen, don't become defensive, find reasonable solutions</li>
                <li><strong>Accidental damage:</strong> Be honest, arrange repair or compensation, learn from mistakes</li>
                <li><strong>Unreasonable demands:</strong> Set boundaries firmly but politely, escalate if needed</li>
              </ul>
            </div>

            <p>
              Documentation becomes crucial when things go wrong. Keep records of what was agreed, what was found, what you communicated, and any responses. If disputes escalate, having contemporaneous records protects your position.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Walking away from a genuinely impossible situation is sometimes the right choice. But exhaust professional options first, and never abandon a site in an unsafe condition.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Appearance and Presentation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Appearance and Presentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              First impressions matter. When you arrive at a client's door, your appearance influences their confidence in you before you've even started work. Clean, appropriate workwear, proper PPE, and good personal hygiene demonstrate professionalism and care.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Clothing</p>
                <p className="text-white/90 text-xs">Clean workwear, appropriate for the environment, properly fitting</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">PPE</p>
                <p className="text-white/90 text-xs">Correct for hazards, worn consistently, in good condition</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Hygiene</p>
                <p className="text-white/90 text-xs">Personal cleanliness, clean hands, fresh workwear</p>
              </div>
            </div>

            <p>
              Your van and tools also contribute to impressions. A tidy, organised van suggests organised work. Well-maintained tools suggest professionalism and care. This doesn't mean everything has to be brand new - but clean and organised costs nothing.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Career tip:</strong> Company uniforms or branded clothing add to the professional image. If you're self-employed, consider simple branded workwear - it looks professional and provides low-cost marketing.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Daily Professional Checklist</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Clean workwear and appropriate PPE ready</li>
                <li>Job details confirmed and materials checked</li>
                <li>Arrive on time or communicate delays early</li>
                <li>End-of-day cleanup and secure work areas</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Building Positive Relationships</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Remember names and use them</li>
                <li>Follow through on what you promise</li>
                <li>Show appreciation for referrals and repeat business</li>
                <li>Be helpful beyond the minimum requirements</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Reputation Killers to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Unreliability:</strong> Late arrivals and missed appointments without communication</li>
                <li><strong>Messy work:</strong> Leaving debris and damage to property</li>
                <li><strong>Poor communication:</strong> Unexpected costs and unexplained delays</li>
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
                <p className="font-medium text-white mb-1">Professional Essentials</p>
                <ul className="space-y-0.5">
                  <li>Punctuality and communication</li>
                  <li>Clean and tidy working</li>
                  <li>Respect for property</li>
                  <li>Honesty about issues</li>
                  <li>Follow-up after completion</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Conflict Resolution</p>
                <ul className="space-y-0.5">
                  <li>Stay calm and listen</li>
                  <li>Focus on solutions</li>
                  <li>Document everything</li>
                  <li>Escalate if needed</li>
                  <li>Never become abusive</li>
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
            <Link to="/study-centre/apprentice/level3-module7-section2-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Documentation
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module7-section3">
              Next: Section 3 - Communication
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module7Section2_4;
