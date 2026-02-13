import { ArrowLeft, BookOpen, CheckCircle, AlertTriangle, Shield, Scale, Megaphone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "lead-safety-cdm",
    question: "Under CDM 2015, which of the following is a specific duty of a supervisor on a construction site?",
    options: [
      "Writing the pre-construction information document for the client",
      "Appointing the principal designer for the project",
      "Ensuring safe systems of work are followed and that workers are competent for the tasks they carry out",
      "Setting the overall project budget and agreeing contract terms"
    ],
    correctIndex: 2,
    explanation: "Under CDM 2015, supervisors have a duty to ensure safe systems of work are followed, risk assessments are communicated and understood, PPE is worn, and competent workers carry out the tasks. Supervisors can be personally liable for safety failures within their area of responsibility."
  },
  {
    id: "lead-safety-culture",
    question: "What is the key difference between safety compliance and safety culture?",
    options: [
      "Compliance costs more money than culture",
      "Compliance is following rules because you have to; culture is following rules because you believe in them",
      "Culture only applies to large construction companies, not small teams",
      "There is no difference — they are the same thing"
    ],
    correctIndex: 1,
    explanation: "Safety compliance means following the rules because you have to (fear of punishment). Safety culture means following the rules because you believe in them (intrinsic commitment to safety). Research shows that transformational leadership drives safety participation (going beyond the minimum), while transactional leadership drives only compliance (meeting the minimum)."
  },
  {
    id: "lead-safety-stop",
    question: "When should a supervisor stop unsafe work on site?",
    options: [
      "Only when instructed to do so by the site manager",
      "Only when a member of their own team is at risk",
      "Whenever they believe work is unsafe — including their own team, other trades, and even people senior to them",
      "Only after completing a formal risk assessment and getting it signed off"
    ],
    correctIndex: 2,
    explanation: "A supervisor has the legal right AND the moral duty to stop any work they believe is unsafe. This includes their own team, other trades, and even people who are more senior. Programme pressure must never override safety. If pressured to compromise on safety, escalate immediately."
  }
];

const faqs = [
  {
    question: "Can I be personally prosecuted for a safety failure on my site?",
    answer: "Yes. Under Section 7 of the Health and Safety at Work Act 1974, every employee (including supervisors) has a duty to take reasonable care for the health and safety of themselves and others affected by their acts or omissions. Under Section 37, if an offence is committed with the consent, connivance, or neglect of a manager or officer, that individual can be personally prosecuted alongside the company. Supervisors have been personally fined and, in the most serious cases, imprisoned for safety failures. The courts consider whether you took all reasonably practicable steps to prevent the incident. Good records demonstrating that you carried out risk assessments, delivered toolbox talks, and enforced safety standards are your best protection."
  },
  {
    question: "What should I do if I am pressured by management to compromise on safety to meet a deadline?",
    answer: "Never compromise on safety, regardless of who is applying the pressure. If you are being pressured, first explain clearly why the work cannot proceed safely as instructed. Document the conversation (send a follow-up email). If the pressure continues, escalate to your employer's health and safety manager or director. You can also contact the HSE directly. Remember: if an accident occurs after you allowed unsafe work to continue, 'I was told to by my manager' is not a legal defence. You have a personal legal duty under HASAWA 1974 and can be held personally liable. The law protects whistleblowers who raise genuine safety concerns."
  },
  {
    question: "How often should site inductions be updated?",
    answer: "Site inductions should be reviewed and updated whenever conditions change significantly. This includes: new phases of work starting, new hazards being introduced (crane operations, live services, deep excavations), changes to emergency procedures or muster points, changes to access routes or welfare facilities, and seasonal changes (winter working, heat stress). At minimum, review the induction content monthly. If an incident or near-miss reveals that the induction did not adequately cover a hazard, update it immediately. A stale induction that does not reflect current site conditions is worse than useless — it gives a false sense of security."
  },
  {
    question: "What is the difference between a toolbox talk and a site induction?",
    answer: "A site induction is a comprehensive briefing given to every person when they first arrive on site. It covers all site-specific hazards, emergency procedures, welfare facilities, reporting requirements, and general rules. It is typically 30-60 minutes and is a one-off (unless conditions change significantly). A toolbox talk is a shorter, focused briefing (typically 10-15 minutes) on a specific topic, given regularly to the work team. Topics might include working at height, manual handling, electrical safety, or a recent incident lesson. Toolbox talks keep safety awareness fresh and address topical issues. Both are essential parts of a supervisor's safety communication toolkit."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Under which legislation can a supervisor be personally liable for safety failures?",
    options: [
      "The Building Regulations 2010 only",
      "The Health and Safety at Work Act 1974 and CDM 2015",
      "The Electricity at Work Regulations 1989 only",
      "The Employment Rights Act 1996 only"
    ],
    correctAnswer: 1,
    explanation: "Supervisors can be personally liable under the Health and Safety at Work Act 1974 (Section 7 — employee duties, Section 37 — individual liability) and CDM 2015 (duties on those carrying out construction work). Both pieces of legislation place specific responsibilities on individuals, not just organisations."
  },
  {
    id: 2,
    question: "The single most powerful influence on whether workers take safety shortcuts is:",
    options: [
      "The amount of safety signage displayed on site",
      "Whether there are CCTV cameras monitoring the work area",
      "What they see their supervisor do — leading by example",
      "The length of the site induction they received"
    ],
    correctAnswer: 2,
    explanation: "Research consistently shows that what workers see their supervisor do is the single most powerful influence on their own safety behaviour. If a supervisor walks past hazards without acting, does not wear PPE, or cuts corners under pressure, the team learns that these behaviours are acceptable. The reverse is equally true."
  },
  {
    id: 3,
    question: "Safety 'compliance' means workers follow safety rules because:",
    options: [
      "They genuinely believe in the importance of safety",
      "They want to go above and beyond the minimum requirements",
      "They fear punishment or disciplinary action if they do not",
      "They have been involved in developing the safety procedures"
    ],
    correctAnswer: 2,
    explanation: "Safety compliance means following the rules because you have to — driven by fear of punishment or disciplinary action. While compliance achieves the minimum standard, it does not create the proactive safety behaviours (reporting near-misses, suggesting improvements, challenging unsafe acts) that characterise a true safety culture."
  },
  {
    id: 4,
    question: "Transformational safety leadership is most likely to result in workers:",
    options: [
      "Only following rules when being observed",
      "Going beyond minimum requirements and actively participating in safety improvement",
      "Complying with rules only to avoid punishment",
      "Ignoring safety rules because they feel empowered"
    ],
    correctAnswer: 1,
    explanation: "Research shows that transformational leadership (inspiring, motivating, intellectually stimulating) drives safety PARTICIPATION — workers going beyond the minimum, reporting near-misses, suggesting improvements, and looking out for each other. This creates a genuine safety culture rather than mere compliance."
  },
  {
    id: 5,
    question: "A site induction should be updated when:",
    options: [
      "It is only updated annually as part of the company's management review",
      "Conditions change, new hazards are introduced, or emergency procedures are modified",
      "A new apprentice starts on site — only for them",
      "The client requests it during a site visit"
    ],
    correctAnswer: 1,
    explanation: "Site inductions must be reviewed and updated whenever conditions change significantly — new phases of work, new hazards, changes to emergency procedures or access routes, and after incidents that reveal gaps. An induction that does not reflect current site conditions gives a false sense of security."
  },
  {
    id: 6,
    question: "When stopping unsafe work, a supervisor should:",
    options: [
      "Wait until the end of the shift to avoid disrupting productivity",
      "Only stop work if the site manager gives permission first",
      "Intervene immediately — explain what was observed, why it is unsafe, and not restart until the hazard is controlled",
      "Take photographs but allow work to continue while writing a report"
    ],
    correctAnswer: 2,
    explanation: "When unsafe work is identified, the supervisor must intervene immediately. Stop the work, explain calmly and firmly what was observed and why it is unsafe, and do not allow the work to restart until the hazard is controlled. Waiting until later risks serious injury or death in the intervening period."
  },
  {
    id: 7,
    question: "Which of the following is a key supervisor duty under CDM 2015?",
    options: [
      "Appointing the principal contractor for the project",
      "Preparing the health and safety file for the client",
      "Ensuring risk assessments are communicated to workers and that safe systems of work are followed",
      "Designing the building to eliminate all construction risks"
    ],
    correctAnswer: 2,
    explanation: "Under CDM 2015, supervisors must ensure that risk assessments are communicated and understood by workers, safe systems of work are followed, PPE is worn, and competent workers carry out the tasks. These are practical, day-to-day duties that directly protect workers on site."
  },
  {
    id: 8,
    question: "The Management of Health and Safety at Work Regulations 1999 require employers to:",
    options: [
      "Only carry out risk assessments for tasks involving machinery",
      "Carry out suitable and sufficient risk assessments for all work activities",
      "Only assess risks for workers under the age of 18",
      "Only carry out risk assessments when requested by the HSE"
    ],
    correctAnswer: 1,
    explanation: "The Management of Health and Safety at Work Regulations 1999 require employers to carry out suitable and sufficient risk assessments for ALL work activities, not just those involving machinery or young workers. Supervisors play a critical role in ensuring these assessments are completed, communicated, and followed on the ground."
  }
];

export default function LeadershipModule5Section3() {
  useSEO({
    title: "Health, Safety, and Welfare as a Leader | Leadership Module 5.3",
    description: "Your legal duties as a supervisor under CDM 2015 and HASAWA 1974, leading by example, building safety culture, meaningful inductions, and stopping unsafe work.",
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
            <Link to="../leadership-module-5-section-2">
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
            <Shield className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Health, Safety, and Welfare as a Leader
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Your legal duties as a supervisor, leading by example, building safety culture beyond mere compliance, and having the courage to stop unsafe work
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Legal duty:</strong> Supervisors can be personally liable for safety failures</li>
              <li><strong>Key legislation:</strong> CDM 2015, HASAWA 1974, MHSWR 1999</li>
              <li><strong>Leading by example:</strong> Your behaviour is the strongest influence on your team</li>
              <li><strong>Stopping work:</strong> You have the legal right AND moral duty to stop unsafe work</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Culture vs Compliance</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Compliance:</strong> Following rules because you have to (minimum)</li>
              <li><strong>Culture:</strong> Following rules because you believe in them (beyond minimum)</li>
              <li><strong>Transformational:</strong> Inspires participation and ownership</li>
              <li><strong>Goal:</strong> Workers who look out for each other instinctively</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Identify your specific legal duties as a supervisor under CDM 2015 and HASAWA 1974",
              "Explain why leading by example is the most powerful safety leadership tool",
              "Distinguish between safety compliance and safety culture",
              "Deliver meaningful site inductions and toolbox talks",
              "Stop unsafe work confidently, legally, and professionally",
              "Respond appropriately when pressured to compromise on safety"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Your Legal Duties as a Supervisor */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Your Legal Duties as a Supervisor
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                As a supervisor on a construction site, you have specific legal duties under three key
                pieces of legislation. These are not optional guidelines &mdash; they are legal
                requirements, and failure to comply can result in personal prosecution, fines, and even
                imprisonment.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Key Legislation Affecting Supervisors</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-white/80">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 text-xs font-semibold mb-1">CDM 2015</p>
                    <p className="text-white/80 text-xs">Construction (Design and Management) Regulations 2015. Places duties on all who carry out construction work, including ensuring competence, cooperation, and coordination.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 text-xs font-semibold mb-1">HASAWA 1974</p>
                    <p className="text-white/80 text-xs">Health and Safety at Work Act. Section 7: duty to take reasonable care. Section 37: personal liability for managers/officers. The foundation of all UK health and safety law.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 text-xs font-semibold mb-1">MHSWR 1999</p>
                    <p className="text-white/80 text-xs">Management of Health and Safety at Work Regulations. Requires risk assessments, competent persons, emergency procedures, information and training for employees.</p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Scale className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Your Specific Duties</p>
                </div>
                <p className="text-sm text-white/80 mb-2">As a supervisor, you must ensure:</p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Safe systems of work are followed by everyone in your work area</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Risk assessments are communicated and understood by your team</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Appropriate PPE is worn correctly at all times</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Only competent workers carry out the tasks assigned to them</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Welfare facilities are adequate and maintained</span>
                  </li>
                </ul>
              </div>

              <p>
                You can be <strong>personally liable</strong> for safety failures. Under Section 37 of
                HASAWA 1974, if an offence is committed with the consent, connivance, or neglect of a
                manager or officer, that individual can be prosecuted alongside the company. Supervisors
                have been personally fined and, in the most serious cases involving fatalities, imprisoned.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Your Best Protection: Demonstrable Competence</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Keep records</strong> &mdash; risk assessments delivered, toolbox talks given, inductions completed, hazards reported, unsafe work stopped. These records demonstrate due diligence.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Stay trained</strong> &mdash; SMSTS, SSSTS, first aid, fire marshal. Keep your qualifications current and your knowledge up to date.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Act consistently</strong> &mdash; enforce the same standards every day, with every person. Inconsistent enforcement undermines your credibility and your legal position.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Escalate when needed</strong> &mdash; if you identify a risk you cannot control, escalate it immediately. Documented escalation shows you took all reasonably practicable steps.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Leading by Example */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Leading by Example
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The single most powerful influence on whether workers take safety shortcuts is
                <strong> what they see YOU do</strong>. Research consistently shows that a supervisor&rsquo;s
                visible safety behaviour has more impact on worker behaviour than any poster, policy
                document, or training course.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Ripple Effect of Your Behaviour</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">If you walk past a hazard without acting</strong> &mdash; your team learns that hazards are acceptable and intervention is optional</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">If you do not wear your PPE consistently</strong> &mdash; nobody else will feel obligated to wear theirs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">If you cut corners under programme pressure</strong> &mdash; your team will cut corners too, and they may cut different, more dangerous corners</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">If you treat safety briefings as a tick-box exercise</strong> &mdash; your team will treat safety as a tick-box exercise</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-500 mb-2">The Reverse Is Also True</p>
                <p className="text-sm text-white/80">
                  Consistent safety leadership creates a safety culture that runs almost on autopilot.
                  When a supervisor always wears PPE, always addresses hazards, always speaks up, and
                  always follows the rules &mdash; even when it is inconvenient &mdash; the team
                  internalises those standards. New starters are socialised into a safe way of working
                  by the team culture, not just by the induction. This is the goal of safety leadership.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Practical Examples of Leading by Example</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Always wear your full PPE</strong> &mdash; hard hat, hi-vis, safety boots, eye protection when required. No exceptions. Not even &ldquo;just for a minute&rdquo; or &ldquo;I&rsquo;m only popping to the cabin.&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Challenge unsafe behaviour immediately</strong> &mdash; if you see it, address it. Walking past sends the message that it is acceptable. Challenge respectfully but clearly.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Report near-misses yourself</strong> &mdash; if you want your team to report near-misses, show them that you do it too. It demonstrates that reporting is valued, not punished.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Refuse to take shortcuts</strong> &mdash; even under programme pressure. If the job needs scaffolding, get scaffolding. Do not lean a ladder against the wall because it is quicker.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Safety Culture vs Safety Compliance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Safety Culture vs Safety Compliance
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                There is a crucial difference between <strong>safety compliance</strong> and
                <strong> safety culture</strong>, and understanding this distinction is fundamental to
                effective safety leadership.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-rose-400 font-semibold text-sm mb-2">Safety Compliance</p>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Following rules because you <strong className="text-white">have to</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Driven by fear of punishment or disciplinary action</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Meets the minimum standard required</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Relies on policing and enforcement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Breaks down when nobody is watching</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-green-400 font-semibold text-sm mb-2">Safety Culture</p>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Following rules because you <strong className="text-white">believe in them</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Driven by intrinsic commitment to safety</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Goes beyond the minimum &mdash; active participation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Self-sustaining and peer-reinforced</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Operates consistently, even without supervision</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                Academic research shows that both <strong>transformational</strong> and
                <strong> transactional</strong> leadership influence safety outcomes, but in different
                ways. Transactional leadership (rewards and punishments) drives <strong>compliance</strong>
                &mdash; workers meet the minimum standard. Transformational leadership (inspiration,
                motivation, intellectual stimulation) drives <strong>participation</strong> &mdash; workers
                go beyond the minimum, report near-misses voluntarily, suggest improvements, and look out
                for each other. The goal is culture, not just compliance.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-500">The goal:</strong> A team where safety is so deeply
                  embedded that workers challenge each other&rsquo;s unsafe behaviour, report near-misses
                  without being asked, and take ownership of safety in their work area. This does not
                  happen through rules alone &mdash; it happens through consistent, visible, authentic
                  safety leadership.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Building Safety Culture &mdash; Practical Steps</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Involve your team in risk assessments</strong> &mdash; the people doing the work often spot hazards that the assessor missed. Their involvement creates ownership.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Praise safe behaviour publicly</strong> &mdash; when someone stops to secure a cable before it becomes a trip hazard, acknowledge it. Positive reinforcement is more powerful than punishment.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Treat near-miss reports as gifts</strong> &mdash; every near-miss reported is a serious accident prevented. Thank the reporter. Investigate the root cause. Share the learning.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Have safety conversations, not interrogations</strong> &mdash; walk the site and talk to your team about what they are doing and why. Show genuine interest in their safety, not just their productivity.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Site Inductions and Briefings */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Site Inductions and Briefings
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every person working in your area must be inducted. This applies to your own team,
                subcontractors, visitors, and anyone else who enters your work zone. A proper induction
                is not a tick-box exercise &mdash; it is a critical safety communication that could save
                someone&rsquo;s life.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Megaphone className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">What Your Induction Must Cover</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Site-specific hazards</strong> &mdash; live services, excavations, overhead work, asbestos, confined spaces, fragile surfaces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Emergency procedures</strong> &mdash; fire alarms, muster points, first aiders, emergency exits, accident reporting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Permit requirements</strong> &mdash; hot works, electrical isolation, confined space entry, excavation permits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Exclusion zones</strong> &mdash; crane operating areas, demolition zones, areas with restricted access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Welfare locations</strong> &mdash; toilets, drying rooms, canteen, drinking water, rest areas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Reporting procedures</strong> &mdash; how to report hazards, near-misses, accidents, and defects</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Make Inductions Meaningful</p>
                </div>
                <p className="text-sm text-white/80">
                  Do not just read from a script and get them to sign. Ask questions to check
                  understanding: &ldquo;Where would you go if the fire alarm sounded?&rdquo;
                  &ldquo;What would you do if you spotted a damaged cable?&rdquo; Update inductions
                  when conditions change. Keep records of who was inducted, when, and what was covered.
                  A meaningful ten-minute induction is worth more than a meaningless thirty-minute one.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Toolbox Talks &mdash; Keeping Safety Fresh</p>
                <p className="text-sm text-white/80 mb-3">
                  In addition to inductions, regular toolbox talks keep safety awareness alive. A good
                  toolbox talk is 10&ndash;15 minutes, focused on a single topic, and interactive.
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Deliver at least one toolbox talk per week to your team</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Choose topics relevant to the current work (e.g. working at height before scaffold work begins)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Use recent incidents or near-misses as learning opportunities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Ask questions to check understanding &mdash; do not just talk at your team</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Record attendance, topic, date, and any actions arising</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Stopping Unsafe Work */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Stopping Unsafe Work
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The hardest safety leadership decision you will ever make is stopping work. It costs time,
                money, and can create conflict. But you have the <strong>legal right</strong> and the
                <strong> moral duty</strong> to stop any work that you believe is unsafe. This includes
                your own team, other trades, and even people who are senior to you.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">How to Stop Unsafe Work</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Intervene calmly and firmly</strong> &mdash; do not shout or make it personal. Be clear and direct: &ldquo;I need you to stop what you are doing.&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Explain what you have observed</strong> &mdash; describe the specific hazard factually: &ldquo;I can see that the scaffold guard rail has been removed and you are working at the edge.&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Explain why it is unsafe</strong> &mdash; connect the hazard to the potential harm: &ldquo;Without the guard rail, there is a risk of falling three metres onto concrete.&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Do not restart until safe</strong> &mdash; the work must not resume until the hazard has been controlled and the area is safe</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Never Allow Programme Pressure to Override Safety</p>
                </div>
                <p className="text-sm text-white/80">
                  If you are ever pressured to compromise on safety &mdash; by a project manager, a
                  client, or anyone else &mdash; escalate immediately. Document the pressure in writing.
                  Contact your employer&rsquo;s health and safety manager. If necessary, contact the HSE
                  directly. &ldquo;I was told to by my manager&rdquo; is <strong className="text-white">not
                  a legal defence</strong> if someone is injured as a result of unsafe work you allowed
                  to continue.
                </p>
              </div>

              <p>
                Stopping work takes courage. It is one of the defining moments of your career as a safety
                leader. The workers you protect may never fully appreciate what you did &mdash; because the
                accident never happened. But that is exactly the point. The best safety outcomes are the
                incidents that <strong>never occur</strong> because a supervisor had the courage to
                intervene. Every experienced supervisor has a story about a time they stopped work and
                prevented a serious injury. Be the supervisor who can tell that story.
              </p>

              <p>
                Remember that you are protected by law. The Employment Rights Act 1996 protects workers
                who raise genuine health and safety concerns from detriment or dismissal. If you stop
                work in good faith because you believe there is a serious and imminent danger, you are
                acting within your legal rights. Document your reasons and the actions you took.
              </p>
            </div>
          </div>
        </section>

        {/* Section 06: Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Health and safety leadership is one of the most important responsibilities you hold as
                a supervisor. People go home safely because of the decisions you make every day. The key
                points from this section are:
              </p>

              <ul className="text-sm text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Legal duties:</strong> Under CDM 2015, HASAWA 1974, and MHSWR 1999, supervisors must ensure safe systems of work, communicate risk assessments, enforce PPE, and verify competence. Personal liability applies.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Lead by example:</strong> Your visible safety behaviour is the single most powerful influence on your team. Walk past a hazard and you normalise it. Address it and you set the standard.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Culture over compliance:</strong> Compliance meets the minimum. Culture goes beyond it. Transformational leadership creates safety participation; transactional leadership creates only compliance.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Meaningful inductions:</strong> Induct everyone. Cover site-specific hazards, emergencies, permits, exclusion zones, welfare, and reporting. Check understanding. Update when conditions change.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Stop unsafe work:</strong> You have the legal right and moral duty. Intervene calmly, explain the hazard, do not restart until safe. Never allow programme pressure to override safety.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Escalate pressure:</strong> If anyone pressures you to compromise on safety, document it and escalate. &ldquo;I was told to&rdquo; is not a legal defence.</span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-500">Next:</strong> In Section 4, we will explore how to
                  support apprentices and new starters &mdash; how people learn, effective mentoring
                  techniques, setting development goals, and the enormous impact you have on whether the
                  next generation stays in the trade.
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
                <p className="text-sm text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz
          title="Section 3 Knowledge Check"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../leadership-module-5-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../leadership-module-5-section-4">
              Next: Supporting Apprentices
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
