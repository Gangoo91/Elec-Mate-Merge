import { ArrowLeft, ArrowRight, MessageSquare, Users, Phone, Presentation, ShieldAlert, Handshake, HardHat, UserCheck } from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useSEO from "@/hooks/useSEO";

const FunctionalSkillsModule2Section3 = () => {
  useSEO(
    "Section 3: Communication Skills - English for Electricians",
    "Develop professional communication skills for client interactions, site meetings, telephone conversations, and working with other trades on site."
  );

  const quizQuestions = [
    {
      id: 1,
      question: "A homeowner is worried about the cost of a full rewire. What is the best approach to this conversation?",
      options: [
        "Tell them they have no choice — it has to be done",
        "Explain the safety reasons, outline the work involved, and offer to break it into phases if possible",
        "Reduce your price to avoid an argument",
        "Tell them to get other quotes and come back"
      ],
      correctAnswer: 1,
      explanation: "The best approach is to be empathetic and informative. Explain why the rewire is necessary (safety), what the work involves, and if possible offer practical solutions like phased work. This builds trust and shows you understand their concerns while maintaining your professional recommendation."
    },
    {
      id: 2,
      question: "During a site meeting, a project manager asks you to confirm that your first-fix work will be complete by Friday. You are not sure you can meet this deadline. What should you do?",
      options: [
        "Say yes to avoid conflict, then explain later if you cannot finish",
        "Refuse to commit to any date",
        "Be honest about the situation, explain what is achievable, and discuss any obstacles",
        "Blame other trades for the delay"
      ],
      correctAnswer: 2,
      explanation: "Honesty is essential in professional communication. Giving an unrealistic commitment damages trust far more than being upfront about challenges. Explain what you can achieve, identify the obstacles, and work with the project manager to find a realistic solution."
    },
    {
      id: 3,
      question: "A client telephones to report that their RCD keeps tripping. You cannot visit until tomorrow. What information should you gather during the call?",
      options: [
        "Just their address — you will investigate when you arrive",
        "When it started, which RCD is tripping, whether they have noticed any patterns, and whether any new appliances have been connected",
        "Their credit card details to take payment in advance",
        "Tell them to hold the RCD in the on position with tape"
      ],
      correctAnswer: 1,
      explanation: "Gathering information over the phone helps you prepare for the visit and may even help the client in the meantime. Asking about timing, patterns, and any changes to the installation gives you a starting point for your investigation. Never advise a client to override a safety device."
    },
    {
      id: 4,
      question: "You need to explain to a homeowner why their consumer unit needs replacing. Which explanation is most appropriate?",
      options: [
        "Your fuseboard is ancient — it could catch fire any day",
        "The current consumer unit does not provide the level of protection required by current regulations. A new unit with RCDs will protect you and your family from electric shock and reduce the risk of electrical fire.",
        "I cannot certify the work without a new one, so you have to pay for it",
        "Everyone else on your street has had theirs done"
      ],
      correctAnswer: 1,
      explanation: "The best explanation is honest, factual, and focuses on the benefit to the client (safety). It avoids scare tactics, avoids making the client feel pressured, and uses language they can understand. Mentioning RCDs and their purpose helps the client understand the value of the upgrade."
    },
    {
      id: 5,
      question: "A plumber on site has accidentally drilled through one of your cables. How should you handle this?",
      options: [
        "Shout at the plumber in front of the other trades",
        "Report the damage to the site manager, assess the situation calmly, arrange a repair, and discuss how to prevent it happening again",
        "Ignore it — it is the plumber's problem",
        "Fix the cable and say nothing to avoid conflict"
      ],
      correctAnswer: 1,
      explanation: "The professional approach is to stay calm, report the damage through the proper channels (site manager), assess and repair the damage safely, and work with the plumber and site manager to prevent future occurrences. Losing your temper solves nothing, and ignoring damage creates a safety risk."
    },
    {
      id: 6,
      question: "When presenting at a toolbox talk about safe isolation, what is the most important thing to remember?",
      options: [
        "Use as much technical jargon as possible to sound knowledgeable",
        "Read directly from BS 7671 word for word",
        "Speak clearly, use practical demonstrations, and check that everyone understands before finishing",
        "Keep it under two minutes so people can get back to work quickly"
      ],
      correctAnswer: 2,
      explanation: "A toolbox talk must be effective, not just delivered. Speaking clearly, using demonstrations (e.g. showing the prove-test-prove procedure with actual equipment), and checking understanding ensures the safety message gets through. The goal is that everyone leaves the talk able to apply what they have learned."
    },
    {
      id: 7,
      question: "A client complains that the light fittings you installed are not the ones they chose. You check and discover you installed the correct fittings as specified on the order. How should you respond?",
      options: [
        "Tell them they are wrong and show them the order",
        "Listen to their concern, show them the specification they approved, and work together to find a solution if they are unhappy",
        "Replace the fittings at your own cost to avoid a bad review",
        "Tell them to speak to your office and refuse to discuss it on site"
      ],
      correctAnswer: 1,
      explanation: "Even when you have done nothing wrong, the professional approach is to listen first, acknowledge the client's concern, and then calmly present the facts. Showing them the approved specification (which they signed) in a non-confrontational way usually resolves the issue. If they are still unhappy, working together on a solution maintains the relationship."
    },
    {
      id: 8,
      question: "What is the most effective way to communicate with trades who speak English as a second language on a multi-trade site?",
      options: [
        "Speak very loudly and slowly",
        "Use clear, simple language, avoid slang and idioms, supplement verbal instructions with diagrams or written notes, and confirm understanding",
        "Only communicate through their supervisor",
        "Use hand gestures instead of words"
      ],
      correctAnswer: 1,
      explanation: "Clear, simple language combined with visual aids (diagrams, written notes, colour-coded labels) is the most effective approach. Confirming understanding by asking the person to repeat the key points back to you ensures the message has been received correctly. Speaking loudly does not help if the language is unclear."
    }
  ];

  return (
    <div className="pb-24 bg-elec-dark min-h-screen">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-elec-dark/95 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Link to="/study-centre/apprentice/functional-skills/module2" className="p-2 -ml-2 touch-manipulation">
            <ArrowLeft className="w-5 h-5 text-white/60" />
          </Link>
          <div>
            <p className="text-[11px] font-semibold text-green-400 uppercase tracking-wider">Module 2 &bull; Section 3</p>
            <h1 className="text-base font-bold text-white">Communication Skills</h1>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-elec-dark via-neutral-900 to-elec-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-600/10 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-8 text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="relative inline-flex mb-4">
              <div className="absolute inset-0 bg-green-500/30 rounded-2xl blur-xl animate-pulse" />
              <div className="relative p-4 rounded-2xl bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 shadow-2xl shadow-green-500/25">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Communication Skills</h2>
            <p className="text-sm text-white/50 max-w-lg mx-auto">Master the verbal and interpersonal skills needed to communicate effectively with clients, colleagues, and other trades on site.</p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 mt-6">

        {/* Section 01 — Professional Communication */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">01</span>
            <h3 className="text-lg font-bold text-white">Professional Communication</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>Communication is the foundation of professional success in the electrical trade. Your technical knowledge means nothing if you cannot explain it to clients, coordinate effectively with other trades, or present yourself professionally in meetings. The way you communicate shapes how others perceive your competence, reliability, and trustworthiness.</p>
            <p>As an electrician, you communicate in many different contexts: explaining work to homeowners, coordinating with plumbers and builders on site, reporting to project managers, presenting at toolbox talks, and negotiating with suppliers. Each context requires a slightly different approach, but the core principles remain the same.</p>

            <h4 className="text-white font-semibold pt-2">The five principles of professional communication</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Be clear:</strong> Say what you mean in simple, direct language. Avoid unnecessary jargon when speaking to non-technical people.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Be honest:</strong> If you do not know something, say so. If there is a problem, raise it early. Honesty builds trust; dishonesty destroys it.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Be respectful:</strong> Treat everyone with courtesy, regardless of their role. The labourer, the client, and the project director all deserve your respect.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Be concise:</strong> Get to the point. Busy people appreciate communication that is clear and efficient. Do not waffle.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Listen actively:</strong> Communication is not just about talking. Listen to what others are saying, ask clarifying questions, and show that you have understood.</span></li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">Your communication skills are as important to your career as your technical skills. Clients hire electricians they trust and feel comfortable with. Colleagues want to work with people who communicate clearly and reliably. Good communication is a competitive advantage.</p>
            </div>

            <h4 className="text-white font-semibold pt-2">Adapting your communication style</h4>
            <p>The way you speak to a homeowner should be different from the way you speak to a fellow electrician or a project manager. This is not about being fake — it is about adjusting your language and approach to suit your audience:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">With clients:</strong> Use plain English, avoid jargon, explain the "why" behind your recommendations, and be patient with questions</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">With colleagues:</strong> Use technical language as appropriate, be direct, and focus on the practical details</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">With project managers:</strong> Be professional, focus on progress, timelines, and any issues that need resolving</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">With other trades:</strong> Be respectful of their expertise, coordinate clearly, and work collaboratively</span></li>
            </ul>
          </div>
        </motion.div>

        {/* Section 02 — Client Communication */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">02</span>
            <h3 className="text-lg font-bold text-white">Client Communication</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>Client communication is where your interpersonal skills matter most. For domestic clients in particular, having an electrician in their home can feel stressful. They may not understand the work you are doing, worry about the cost, or feel anxious about the disruption. Your ability to communicate with empathy, clarity, and professionalism makes all the difference.</p>

            <h4 className="text-white font-semibold pt-2">First impressions</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Arrive on time:</strong> Punctuality shows respect for your client's time. If you will be late, call ahead to let them know.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Introduce yourself:</strong> "Good morning, I'm [name] from [company]. I'm here to [purpose of visit]."</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Wear clean, branded workwear:</strong> Your appearance reflects your professionalism.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Use shoe covers or ask:</strong> "Would you like me to remove my boots?" shows consideration for their home.</span></li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Scenario: Explaining why a rewire is needed</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-2">
              <p className="text-white/90 font-semibold mb-2">The situation:</p>
              <p className="text-white/70 mb-3">You are carrying out an EICR on a 1960s property. You discover that the original rubber-insulated wiring is still in use, insulation resistance values are very low, and there is no RCD protection. The installation needs a full rewire. The homeowner, Mrs Davis, is a retired pensioner on a limited income.</p>
              <p className="text-white/90 font-semibold mb-2">How to explain it:</p>
              <p className="text-white/70 italic">"Mrs Davis, I've completed the inspection and I need to discuss some of the findings with you. The wiring in your home is the original wiring from when the house was built in the 1960s. Over sixty years, the insulation around the cables has deteriorated, which means there's an increased risk of electric shock and electrical fire. Your installation also doesn't have the modern safety devices — called RCDs — that would protect you if a fault developed. I would strongly recommend a rewire, which would bring your home up to current safety standards. I understand this is a significant expense, and I'm happy to discuss options, including whether the work could be done in stages to spread the cost."</p>
            </div>

            <h4 className="text-white font-semibold pt-2">Key principles for client conversations</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Explain in plain English:</strong> "The insulation around the cables has broken down" is better than "Your R2 values are non-compliant"</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Focus on safety benefits:</strong> Clients respond to understanding how the work protects their family</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Offer options where possible:</strong> Phased work, payment plans, or prioritising the most critical items first</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Never use scare tactics:</strong> Be factual and honest without exaggerating the danger to pressure a sale</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Put it in writing:</strong> Follow up verbal conversations with a written summary (email or letter) so there is a clear record</span></li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">The best client communication combines technical accuracy with empathy. You are not just telling someone their wiring is dangerous — you are helping them understand a situation they know nothing about and supporting them in making an informed decision.</p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after Section 02 */}
        <InlineCheck
          id="m2s3-client-comms"
          question="A client asks you to explain what an RCD does. Which explanation is most appropriate for a non-technical person?"
          options={[
            "It monitors the current flowing in the line and neutral conductors and trips when it detects an imbalance exceeding 30mA",
            "It is a safety device that cuts the power very quickly if it detects a fault that could cause electric shock — like a safety net for your electrics",
            "It is required by Regulation 411.3.3 of BS 7671",
            "It is the thing that trips when something goes wrong"
          ]}
          correctIndex={1}
          explanation="For non-technical clients, the best explanation uses simple language and relatable concepts. Describing it as a 'safety device' that 'cuts the power quickly' and using the analogy of a 'safety net' makes the concept accessible without being inaccurate."
        />

        {/* Section 03 — Site Meetings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">03</span>
            <h3 className="text-lg font-bold text-white">Site Meetings</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>On commercial and industrial projects, regular site meetings are held to review progress, coordinate between trades, and resolve issues. As an electrical apprentice or improver, you may attend these meetings with your supervisor. As you progress, you will be expected to contribute and eventually represent your company independently.</p>

            <h4 className="text-white font-semibold pt-2">Types of site meetings</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Progress meetings:</strong> Usually weekly. Review what has been completed, what is planned for the coming week, and any issues affecting the programme.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Coordination meetings:</strong> Focus on how different trades will work together — especially important when multiple trades need access to the same areas.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Health and safety meetings:</strong> Review safety performance, discuss incidents or near misses, and plan for upcoming high-risk activities.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Design meetings:</strong> Discuss design changes, resolve clashes between services, and agree solutions.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Toolbox talks:</strong> Short, focused safety briefings on specific topics — often delivered at the start of a shift or before a particular task.</span></li>
            </ul>

            <h4 className="text-white font-semibold pt-2">How to contribute effectively</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Prepare:</strong> Know what work your team has completed, what is planned next, and any issues you need to raise</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Be factual:</strong> Report on what has happened, not what you hope will happen. If you are behind programme, say so and explain why.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Raise issues early:</strong> If you can see a problem coming, raise it before it becomes a crisis</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Take notes:</strong> Record any decisions or actions that affect your work. Do not rely on memory alone.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Follow up:</strong> If you are given an action, do it and confirm completion.</span></li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Speaking with confidence</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Prepare what you want to say before the meeting — even just a few bullet points</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Speak clearly and at a steady pace — do not rush</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Stick to facts and avoid speculation</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>If you do not know the answer to a question, say "I'll find out and get back to you" rather than guessing</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Remember that everyone in the room was once new to meetings — confidence comes with practice</span></li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">The most respected people in site meetings are those who speak honestly, raise issues early, and follow through on their commitments. You do not need to say a lot — you need to say the right things at the right time.</p>
            </div>
          </div>
        </motion.div>

        {/* Section 04 — Telephone Skills */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">04</span>
            <h3 className="text-lg font-bold text-white">Telephone Skills</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>Telephone communication is essential in the electrical trade. You will use the phone to arrange site visits, discuss work with clients, coordinate with suppliers, report to your office, and respond to emergency callouts. Without the benefit of body language and facial expressions, your words and tone carry even more weight.</p>

            <h4 className="text-white font-semibold pt-2">Answering calls professionally</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Identify yourself:</strong> "Good morning, [Company Name], [Your Name] speaking. How can I help?"</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Answer promptly:</strong> Try to answer within three or four rings. If you cannot answer, call back as soon as possible.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Listen first:</strong> Let the caller explain their situation before you start asking questions or offering solutions.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Take notes:</strong> Have a notepad and pen by the phone. Write down names, numbers, addresses, and key details.</span></li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Making calls effectively</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Plan before calling:</strong> Know what you need to say and what information you need.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">State your purpose:</strong> "Hi, this is [Name] from [Company]. I'm calling about the electrical work at [Address]."</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Confirm key details:</strong> Repeat back important information: "So that's 27 Elm Street, next Tuesday at 9am — is that correct?"</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">End professionally:</strong> Summarise what was agreed and thank the person for their time.</span></li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Handling emergency calls</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Stay calm — your composure will help calm the caller</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Ask about immediate safety: "Is anyone injured?" "Can you smell burning?"</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Give clear safety advice: "Turn off the main switch in your consumer unit if it is safe to do so"</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Never advise a client to touch damaged equipment or investigate a fault themselves</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Confirm when you will attend and ensure the client has your contact number</span></li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">On the phone, your voice is your only tool. Speak clearly, use a friendly but professional tone, and always confirm important details by repeating them back. A missed detail on a phone call can lead to wasted journeys, wrong materials, or missed appointments.</p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after Section 04 */}
        <InlineCheck
          id="m2s3-telephone"
          question="A client calls to report a burning smell from their consumer unit. What is the first thing you should ask?"
          options={[
            "What is your postcode?",
            "Is anyone injured and can you safely turn off the main switch?",
            "When was your last EICR?",
            "What brand is your consumer unit?"
          ]}
          correctIndex={1}
          explanation="In any emergency call, safety comes first. Before gathering diagnostic information, you must check that no one is injured and advise the client on immediate safety measures — in this case, turning off the main switch if it is safe to do so. If there is any doubt about safety, advise them to call 999."
        />

        {/* Section 05 — Explaining Technical Work */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">05</span>
            <h3 className="text-lg font-bold text-white">Explaining Technical Work</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>One of the most valuable skills you can develop is the ability to explain complex technical concepts in simple terms. Whether you are describing a fault to a homeowner, explaining test results to a property manager, or justifying a design decision to an architect, your ability to bridge the gap between technical and non-technical understanding sets you apart.</p>

            <h4 className="text-white font-semibold pt-2">Techniques for clear explanations</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Use analogies:</strong> "An RCD is like a safety net — if a fault develops, it catches it before it can cause harm"</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Relate to their experience:</strong> "You know how a fuse in a plug blows when something goes wrong? An MCB does the same job, but you can just switch it back on instead of replacing it"</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Start with the "why":</strong> Explain why the work matters before explaining what it involves</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Use visual aids:</strong> Show the client what you are talking about. Point to the consumer unit, show them the old cable vs the new cable</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Check understanding:</strong> Ask "Does that make sense?" or "Do you have any questions about that?"</span></li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Common explanations you will need to give</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-2">
              <div className="space-y-3">
                <div>
                  <p className="text-white/90 font-semibold text-xs mb-1">Why the power needs to be off:</p>
                  <p className="text-white/70 italic">"I need to switch off the power to work safely. For your protection and mine, I cannot work on live electrics. It will be off for approximately [time]. I'll let you know before I switch it off and as soon as it's back on."</p>
                </div>
                <div className="border-t border-white/10 pt-3">
                  <p className="text-white/90 font-semibold text-xs mb-1">Why additional work is needed:</p>
                  <p className="text-white/70 italic">"While carrying out the work, I've discovered that [description of issue]. This wasn't visible before I started, but it needs to be addressed to make the installation safe. I'd recommend [solution]. The additional cost would be approximately [amount]. I won't proceed without your approval."</p>
                </div>
                <div className="border-t border-white/10 pt-3">
                  <p className="text-white/90 font-semibold text-xs mb-1">What the test results mean:</p>
                  <p className="text-white/70 italic">"I've tested your installation and everything is within the safe limits set by the regulations. The main thing I check is that all the safety devices are working correctly, the wiring is in good condition, and the earthing system is providing proper protection. I'll leave you with a certificate that shows all the results."</p>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">The ability to explain technical concepts in plain English is one of the most valuable skills you can develop. Clients who understand what you are doing and why you are doing it are more likely to trust your recommendations, approve additional work, and recommend you to others.</p>
            </div>
          </div>
        </motion.div>

        {/* Section 06 — Dealing with Complaints */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">06</span>
            <h3 className="text-lg font-bold text-white">Dealing with Complaints</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>No matter how good you are at your job, at some point you will receive a complaint. How you handle it will determine whether you lose a client or strengthen the relationship. A well-handled complaint can actually increase client loyalty — because the client sees that you take their concerns seriously and act to resolve them.</p>

            <h4 className="text-white font-semibold pt-2">The LEAP framework for handling complaints</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Listen:</strong> Let the client explain their concern fully without interrupting. Show that you are listening by nodding, making eye contact, and not looking at your phone.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Empathise:</strong> Acknowledge their frustration. "I understand that must be frustrating" or "I can see why you're concerned about that."</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Apologise (if appropriate):</strong> If you or your company made an error, apologise sincerely. "I'm sorry that happened. Let me put it right."</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Problem-solve:</strong> Offer a clear plan to resolve the issue. "Here's what I'm going to do..." and then follow through.</span></li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Common complaint scenarios</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Work not completed on time:</strong> Apologise for the delay, explain the reason honestly, and provide a firm new completion date</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Mess left behind:</strong> Apologise and return to clean up properly. Going forward, clean as you go</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Something not working after your visit:</strong> Return promptly, investigate, and fix the issue. If it was caused by your work, do it at no additional charge</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Cost higher than quoted:</strong> This should not happen if you quoted properly. If additional work was needed, you should have communicated the additional cost before doing the work</span></li>
            </ul>

            <h4 className="text-white font-semibold pt-2">What NOT to do</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">&bull;</span><span>Do not become defensive or argumentative</span></li>
              <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">&bull;</span><span>Do not blame the client, another trade, or your supplier</span></li>
              <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">&bull;</span><span>Do not ignore the complaint or hope it goes away</span></li>
              <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">&bull;</span><span>Do not discuss the complaint with other clients or on social media</span></li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">A complaint handled well can turn a dissatisfied client into your strongest advocate. The key is to listen, empathise, and act. Most people do not expect perfection — they expect you to care when things go wrong and to take responsibility for putting them right.</p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after Section 06 */}
        <InlineCheck
          id="m2s3-complaints"
          question="A client calls to say that a socket you installed last week has stopped working. What is the best first response?"
          options={[
            "It was working when I left, so it must be something you've done",
            "I'm sorry to hear that. I'll come and take a look — when would be convenient for me to visit?",
            "That's impossible — I tested it myself",
            "You'll need to pay for a callout if it's not my fault"
          ]}
          correctIndex={1}
          explanation="The best response shows empathy and a willingness to investigate. Apologising for the inconvenience (not admitting fault) and offering to visit demonstrates professionalism. You can determine the cause when you investigate on site — there is no need to assign blame during the initial call."
        />

        {/* Section 07 — Working with Other Trades */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">07</span>
            <h3 className="text-lg font-bold text-white">Working with Other Trades</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>On most construction sites, you will work alongside plumbers, carpenters, plasterers, bricklayers, roofers, mechanical engineers, and many other trades. Effective communication and coordination with these professionals is essential to keeping the project on programme, avoiding conflicts, and ensuring the quality of everyone's work.</p>

            <h4 className="text-white font-semibold pt-2">Common coordination challenges</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Cable routes vs pipework:</strong> Plumbers and electricians often need the same routes through walls, floors, and ceilings. Coordinate early to avoid clashes.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Timing of first and second fix:</strong> Electrical first fix must be complete before plasterboard is installed. Second fix happens after plastering and painting.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Shared spaces:</strong> Consumer units, boilers, and plumbing manifolds often share the same utility area. Agree the layout before installation begins.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Damage to completed work:</strong> Other trades may inadvertently damage your cables, containment, or accessories. Clear marking and communication help prevent this.</span></li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Scenario: Coordinating with a plumber</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-2">
              <p className="text-white/90 font-semibold mb-2">The situation:</p>
              <p className="text-white/70 mb-3">You are working on a new-build house. The plumber has installed pipework through a floor void that now blocks your planned cable route to the kitchen sockets.</p>
              <p className="text-white/90 font-semibold mb-2">Professional approach:</p>
              <p className="text-white/70 italic">"Hi Dave, I've noticed the hot water pipes in the void under the kitchen are running across where I need to route my cables. Can we have a look together and see if we can find a route that works for both of us? If not, I'll raise it with the site manager so we can get it sorted before we lose any time."</p>
            </div>

            <h4 className="text-white font-semibold pt-2">Tips for good inter-trade relationships</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Communicate early:</strong> The earlier you coordinate, the easier problems are to solve</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Respect their work:</strong> Treat other trades' installations with the same care you want them to treat yours</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Be flexible:</strong> Construction is a collaborative process. Be willing to adjust your plans when possible</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Keep the site tidy:</strong> Clear your waste, tidy your cables, and leave shared areas in good condition</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Resolve conflicts professionally:</strong> If a disagreement arises, discuss it calmly. If you cannot agree, escalate to the site manager</span></li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">The electricians who are most valued on site are those who communicate well with other trades, coordinate proactively, and contribute to a positive working environment. Your reputation follows you from site to site — make sure it is a good one.</p>
            </div>
          </div>
        </motion.div>

        {/* Section 08 — Building Professional Relationships */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">08</span>
            <h3 className="text-lg font-bold text-white">Building Professional Relationships</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>Your career in the electrical trade will be built on relationships as much as technical skill. The clients who recommend you, the contractors who employ you, the colleagues who support you, and the suppliers who prioritise your orders — all of these relationships are built through consistent, professional communication over time.</p>

            <h4 className="text-white font-semibold pt-2">Building trust with clients</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Do what you say you will do:</strong> If you promise to arrive at 9am, arrive at 9am. If you say you will send a quote by Friday, send it by Friday.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Keep clients informed:</strong> A quick text saying "Running 15 minutes late" or "Work completed today, certificate will follow by email" keeps clients feeling valued.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Follow up after completion:</strong> A week after completing work, a brief call or message asking "Everything working well?" shows you care about quality.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Ask for reviews:</strong> Happy clients are usually willing to leave a review if you ask politely.</span></li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Networking in the trade</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Industry events:</strong> Attend trade shows, manufacturer training days, and industry seminars</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Professional bodies:</strong> Join the IET, attend local branch meetings, and engage with CPD opportunities</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Online communities:</strong> Participate in professional forums and social media groups. Share your knowledge and build your reputation</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Mentoring:</strong> As you gain experience, mentoring apprentices strengthens your own knowledge and gives back to the trade</span></li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Managing your professional reputation</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Your reputation is built one interaction at a time. Every phone call, every site visit, every completed job contributes to it.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>It takes years to build a good reputation and minutes to destroy it. Think before you speak or write.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Be careful on social media. What you post publicly reflects on you and your company.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Never speak negatively about other electricians or companies. It reflects poorly on you, not on them.</span></li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">The electrical trade is built on trust and reputation. Your technical skills get you through the door, but your communication skills, reliability, and professionalism keep you there. Invest in your relationships as seriously as you invest in your technical development.</p>
            </div>
          </div>
        </motion.div>

        {/* Quiz */}
        <Quiz questions={quizQuestions} title="Section 3: Communication Skills Quiz" />

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <Link to="/study-centre/apprentice/functional-skills/module2/section2" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors touch-manipulation">
            <ArrowLeft className="w-4 h-4" />Technical Writing
          </Link>
          <Link to="/study-centre/apprentice/functional-skills/module2/section4" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-green-500 hover:bg-green-600 transition-colors touch-manipulation shadow-lg shadow-green-500/25">
            Spelling &amp; Grammar<ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FunctionalSkillsModule2Section3;
