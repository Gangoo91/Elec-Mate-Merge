import { ArrowLeft, ArrowRight, Accessibility, Users, ShieldCheck, Building2, Eye, Ear, Brain, HeartPulse, ClipboardList, UserCheck, DoorOpen, Armchair, AlertTriangle, GitBranch, FileText, Lock, RefreshCw, CheckCircle, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ------------------------------------------------------------------ */
/*  Inline Knowledge Checks (3)                                       */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: "minimum-buddies-per-person",
    question: "What is the minimum number of buddies that should be assigned to each person who needs a PEEP?",
    options: [
      "1 buddy",
      "2 buddies",
      "3 buddies",
      "4 buddies"
    ],
    correctIndex: 1,
    explanation:
      "A minimum of 2 buddies should be assigned to each person who needs a PEEP. This ensures that if one buddy is absent (due to holiday, sickness, or working in a different area), there is always at least one trained person available to assist during an evacuation. In practice, some organisations assign 3 or more buddies for individuals who require significant physical assistance, particularly in multi-shift workplaces. The buddy arrangement must be documented in the PEEP and all assigned buddies must receive appropriate training on the individual's specific needs, the agreed evacuation route, and any equipment they may need to use."
  },
  {
    id: "refuge-fire-resistance",
    question: "What is the minimum fire resistance required for a designated refuge area?",
    options: [
      "15 minutes",
      "20 minutes",
      "30 minutes",
      "60 minutes"
    ],
    correctIndex: 2,
    explanation:
      "A designated refuge must provide a minimum of 30 minutes of fire resistance. This is because the refuge is a temporary waiting area where a person who cannot use stairs waits for assistance from the fire and rescue service or trained evacuation personnel. The 30-minute fire resistance ensures the refuge remains tenable for a sufficient period. Some building designs and risk assessments may require 60-minute fire resistance for refuges, particularly in buildings with a longer anticipated fire service response time or where progressive horizontal evacuation strategies are used. The refuge must also include a communication system so the person can inform the control room or fire service of their presence."
  },
  {
    id: "peep-review-frequency",
    question: "How often should Personal Emergency Evacuation Plans (PEEPs) be reviewed as a minimum?",
    options: [
      "Monthly",
      "Quarterly",
      "Six-monthly",
      "At least annually (and on change of circumstances)"
    ],
    correctIndex: 3,
    explanation:
      "PEEPs should be reviewed at least annually as an absolute minimum. However, a review must also be triggered whenever the individual's circumstances change (e.g., their condition worsens or improves, they move to a different floor or work area, there are changes to the building layout or escape routes, or their assigned buddies change). Good practice is to review PEEPs at six-monthly intervals and to incorporate PEEP testing into fire drills so that the plan is validated under realistic conditions. The review should involve the individual concerned, their buddies, and the person responsible for fire safety."
  }
];

/* ------------------------------------------------------------------ */
/*  FAQs (4)                                                          */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: "Do temporary conditions such as a broken leg or pregnancy require a PEEP?",
    answer:
      "Yes, absolutely. A PEEP is not exclusively for people with permanent disabilities. Anyone who cannot self-evacuate without assistance needs a PEEP, even if their condition is temporary. A person with a broken leg in a plaster cast, a pregnant employee in the later stages of pregnancy, someone recovering from surgery, or a person using crutches following a knee operation all require a PEEP for the duration of their impairment. The PEEP should be put in place as soon as the temporary condition is known and removed or archived once the person has recovered and can self-evacuate. Failure to provide a PEEP for temporary conditions could constitute a breach of the Equality Act 2010 duty to make reasonable adjustments, and more importantly, could place a vulnerable person at serious risk during a real fire."
  },
  {
    question: "What arrangements should be made for visitors who may need a PEEP?",
    answer:
      "Visitors present a particular challenge because their needs may not be known in advance. The responsible person should have a system for identifying visitors who may need assistance during an evacuation. This is typically achieved through the visitor sign-in process, where visitors are asked whether they have any specific needs in the event of an emergency. If a visitor declares a need, a temporary PEEP should be activated. In practice, this usually means briefing the visitor on the nearest refuge location and evacuation route, assigning a member of staff to act as a buddy for the duration of the visit, and ensuring the reception desk or fire control room is aware. For premises that regularly receive visitors with disabilities (such as hospitals, council offices, or public buildings), a Generic Emergency Evacuation Plan (GEEP) should be in place that covers the general arrangements for evacuating persons with various types of impairment."
  },
  {
    question: "Are refuges a final destination during an evacuation, or is further rescue required?",
    answer:
      "A refuge is explicitly not a final destination. It is a temporary protected waiting area where a person who cannot use stairs can wait safely until assistance arrives to complete their evacuation from the building. The refuge must have a communication system (voice intercom, emergency telephone, or similar) that allows the person to communicate with the building's fire alarm panel, a manned control point, or the fire and rescue service. The purpose of the communication system is to inform rescuers of the person's presence and location so they can prioritise the rescue. The fire and rescue service, or trained evacuation personnel using evacuation chairs or other equipment, then completes the evacuation by moving the person out of the building. This is why it is critical that the location of occupied refuges is communicated to the fire and rescue service on their arrival. A person left in a refuge without communication or a rescue plan is in a dangerous and potentially fatal situation if the fire continues to develop."
  },
  {
    question: "What are the legal consequences if an employer fails to provide PEEPs for employees who need them?",
    answer:
      "Failure to provide PEEPs has legal consequences under two separate pieces of legislation. Under the Regulatory Reform (Fire Safety) Order 2005 (RRFSO), the responsible person must ensure that emergency routes and exits are adequate for all relevant persons, which includes persons with disabilities. Failure to do so is a criminal offence under Article 32, punishable by a fine or imprisonment (up to two years on conviction on indictment). Under the Equality Act 2010, employers have a duty to make reasonable adjustments for disabled employees. Failing to provide a PEEP could constitute a failure to make a reasonable adjustment, which is a form of unlawful disability discrimination. The employee could bring a claim in an employment tribunal, potentially resulting in compensation including injury to feelings. Beyond the legal consequences, the reputational damage to an organisation that failed to protect a disabled employee during a fire would be severe. Most importantly, the human consequence of failing to provide a PEEP is that a person may be unable to evacuate and could be seriously injured or killed."
  }
];

/* ------------------------------------------------------------------ */
/*  End-of-Section Quiz (8 questions)                                 */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      "What does PEEP stand for in the context of fire safety?",
    options: [
      "Public Emergency Escape Procedure",
      "Personal Emergency Evacuation Plan",
      "Premises Evacuation and Exit Protocol",
      "Personnel Emergency Equipment Plan"
    ],
    correctAnswer: 1,
    explanation:
      "PEEP stands for Personal Emergency Evacuation Plan. It is an individual, tailored evacuation plan developed for any person who cannot self-evacuate without assistance. The plan details the person's specific needs, the assistance required, the designated evacuation route, assigned buddies, any equipment needed, and the location of refuges. The key word is 'Personal' — each PEEP is unique to the individual and must take into account their specific impairment, the building they work in, and the resources available."
  },
  {
    id: 2,
    question:
      "Which of the following people would NOT typically require a Personal Emergency Evacuation Plan?",
    options: [
      "A wheelchair user working on the third floor",
      "An able-bodied office worker on the ground floor with a direct exit",
      "An employee with a broken ankle in a plaster cast",
      "A person with severe anxiety who may freeze during an alarm"
    ],
    correctAnswer: 1,
    explanation:
      "An able-bodied office worker on the ground floor with a direct exit to the outside would not typically require a PEEP, as they can self-evacuate without assistance. All of the other individuals have conditions that may prevent or significantly hinder their ability to evacuate unaided: a wheelchair user cannot use stairs, a person with a broken ankle has impaired mobility, and a person with severe anxiety may need a buddy to guide and reassure them during an evacuation. PEEPs cover physical, sensory, cognitive, and mental health conditions, as well as temporary impairments."
  },
  {
    id: 3,
    question:
      "What is the minimum number of buddies that should be assigned to each person with a PEEP?",
    options: [
      "1 buddy",
      "2 buddies",
      "3 buddies",
      "It depends entirely on the person's needs with no minimum"
    ],
    correctAnswer: 1,
    explanation:
      "A minimum of 2 buddies should be assigned to each person with a PEEP. This ensures continuity of cover: if one buddy is absent due to holiday, sickness, a different shift pattern, or working in a different area of the building, there is always at least one trained buddy available. Both buddies must be trained on the individual's specific needs, the agreed evacuation route, and any equipment they may need to use. In large organisations or where the individual requires significant physical assistance, 3 or more buddies may be appropriate."
  },
  {
    id: 4,
    question:
      "Which of the following is a requirement for a designated refuge area?",
    options: [
      "It must be located on the ground floor only",
      "It must have minimum 30-minute fire resistance and a communication system",
      "It must contain firefighting equipment such as hose reels",
      "It must be large enough to accommodate at least 10 wheelchair users"
    ],
    correctAnswer: 1,
    explanation:
      "A designated refuge must provide minimum 30-minute fire resistance and must include a communication system (voice intercom, emergency telephone, or similar) that allows the person waiting to communicate with the control room or fire and rescue service. Refuges are not restricted to the ground floor — they are typically located within protected stairways or protected lobbies on each floor. They do not need to contain firefighting equipment. The refuge must be large enough to accommodate a wheelchair without obstructing the escape route for other evacuees, and it must be clearly signed."
  },
  {
    id: 5,
    question:
      "What is the primary purpose of an evacuation chair?",
    options: [
      "To carry a person horizontally along a corridor",
      "To transport a person who cannot walk down staircases during an emergency",
      "To provide a comfortable seat in a refuge while waiting for rescue",
      "To move heavy equipment during an evacuation"
    ],
    correctAnswer: 1,
    explanation:
      "An evacuation chair is a device specifically designed to transport a person who cannot walk down staircases safely during an emergency evacuation. The chair typically features tracks or specialised wheels that allow controlled descent of staircases, operated by one or two trained persons. Evacuation chairs are usually positioned at the top of protected staircases and are a key piece of equipment documented in PEEPs for wheelchair users and persons with severe mobility impairments. Staff must be specifically trained in their use — using an evacuation chair without training is dangerous for both the operator and the person being evacuated."
  },
  {
    id: 6,
    question:
      "What are GEEPs and why were they introduced?",
    options: [
      "General Evacuation Emergency Procedures — introduced after the London bombings of 2005",
      "Generic Emergency Evacuation Plans — a post-Grenfell concept for residential buildings where individual PEEPs are impractical",
      "Government Emergency Exit Plans — mandatory for all commercial buildings since 2020",
      "Group Emergency Escape Protocols — required under the original RRFSO 2005"
    ],
    correctAnswer: 1,
    explanation:
      "GEEPs (Generic Emergency Evacuation Plans) are a concept that emerged following the Grenfell Tower Inquiry and were formalised through the Fire Safety (England) Regulations 2022. They are designed for residential buildings — particularly high-rise blocks — where the building owner or manager may not know the individual needs of every resident and therefore cannot create individual PEEPs. A GEEP provides a generic, building-wide framework for evacuating persons with disabilities, identifying the resources available (refuges, evacuation equipment, trained personnel) and the procedures to follow. They are floor-level plans showing refuge locations, equipment positions, and escape routes."
  },
  {
    id: 7,
    question:
      "How often should a PEEP be reviewed as a minimum?",
    options: [
      "Every month",
      "Every three months",
      "Every six months",
      "At least annually and whenever circumstances change"
    ],
    correctAnswer: 3,
    explanation:
      "PEEPs must be reviewed at least annually as an absolute minimum. However, a review must also be triggered whenever the individual's circumstances change — for example, if their condition worsens or improves, they move to a different floor or work area, the building layout or escape routes change, or their assigned buddies leave or change roles. Best practice is to review PEEPs six-monthly and to test them during fire drills. The review should involve the individual, their buddies, and the person responsible for fire safety in the building."
  },
  {
    id: 8,
    question:
      "Under which legislation do employers have a duty to make reasonable adjustments for disabled employees, including ensuring they can evacuate safely?",
    options: [
      "The Health and Safety at Work etc. Act 1974 only",
      "The Building Regulations 2010 only",
      "The Equality Act 2010 (alongside the RRFSO)",
      "The Fire and Rescue Services Act 2004 only"
    ],
    correctAnswer: 2,
    explanation:
      "The Equality Act 2010 places a duty on employers and service providers to make reasonable adjustments for disabled persons. In the context of fire safety, this includes ensuring that disabled persons can evacuate safely, which means providing PEEPs, assigning trained buddies, providing appropriate equipment (evacuation chairs, visual alarms), and ensuring refuges are available. The RRFSO also requires the responsible person to consider all relevant persons when planning emergency procedures. The two pieces of legislation work together: the RRFSO addresses fire safety in general, and the Equality Act specifically addresses the duty not to discriminate against disabled persons by failing to make reasonable adjustments."
  }
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
export default function FireSafetyModule4Section4() {
  useSEO({
    title: "Personal Emergency Evacuation Plans | Fire Safety Module 4.4",
    description:
      "Learn about PEEPs, the buddy system, refuges, evacuation equipment, GEEPs, and confidentiality requirements. Covers RRFSO and Equality Act 2010 obligations for evacuating persons with disabilities.",
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
            <Link to="../fire-safety-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">

        {/* ============================================================ */}
        {/*  PAGE TITLE                                                   */}
        {/* ============================================================ */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <Accessibility className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 4 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Personal Emergency Evacuation Plans
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Ensuring every person &mdash; regardless of ability &mdash; can evacuate safely through tailored planning, trained buddies, refuges, specialist equipment, and effective communication
          </p>
        </header>

        {/* ============================================================ */}
        {/*  QUICK SUMMARY BOXES                                          */}
        {/* ============================================================ */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>PEEP:</strong> Individual plan for anyone who cannot self-evacuate</li>
              <li><strong>Minimum 2 buddies</strong> per person to cover absences</li>
              <li><strong>Refuges:</strong> 30-min fire resistance with communication</li>
              <li><strong>Review:</strong> At least annually and on any change of circumstances</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Key Legislation</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>RRFSO Art. 14 &amp; 15:</strong> Emergency routes and procedures</li>
              <li><strong>Equality Act 2010:</strong> Reasonable adjustments for disabled persons</li>
              <li><strong>Fire Safety (England) Regulations 2022:</strong> GEEPs for residential</li>
              <li><strong>Building Regulations:</strong> Refuge and access requirements</li>
            </ul>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  LEARNING OUTCOMES                                            */}
        {/* ============================================================ */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define what a PEEP is and explain its legal basis under the RRFSO and Equality Act 2010",
              "Identify the range of persons who may require a PEEP, including temporary conditions",
              "Describe the essential contents of a PEEP and how it is developed",
              "Explain the buddy system, including minimum buddy numbers and training requirements",
              "State the requirements for designated refuge areas including fire resistance and communication",
              "Describe evacuation equipment types and their correct application",
              "Explain GEEPs and their purpose following the Grenfell Tower Inquiry",
              "Outline the requirements for communication, review, and confidentiality in PEEP management"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ============================================================ */}
        {/*  SECTION 01: What Is a PEEP?                                  */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">01</span>
              What Is a PEEP?
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A <strong>Personal Emergency Evacuation Plan (PEEP)</strong> is an individual, tailored plan developed for any person who cannot self-evacuate from a building without assistance during an emergency. The word &ldquo;personal&rdquo; is key &mdash; each PEEP is unique to the specific individual, taking into account their particular impairment or condition, the building they occupy, the resources available, and the escape routes they will use.
              </p>

              <p>
                PEEPs are not a new concept, but they have become increasingly important as awareness of inclusive fire safety has grown. The legal basis for PEEPs comes from two main pieces of legislation:
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
                  <ShieldCheck className="h-6 w-6 text-rose-400 mb-2" />
                  <p className="text-sm font-semibold text-rose-400 mb-1">RRFSO 2005</p>
                  <p className="text-xs text-white/70">Articles 14 and 15 require the responsible person to establish emergency procedures and ensure emergency routes and exits are adequate for <strong>all relevant persons</strong>, which includes persons with disabilities or impairments.</p>
                </div>
                <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
                  <Accessibility className="h-6 w-6 text-rose-400 mb-2" />
                  <p className="text-sm font-semibold text-rose-400 mb-1">Equality Act 2010</p>
                  <p className="text-xs text-white/70">Places a duty on employers and service providers to make <strong>reasonable adjustments</strong> for disabled persons. Ensuring a disabled person can evacuate safely is considered a reasonable adjustment.</p>
                </div>
              </div>

              <p>
                A common misconception is that PEEPs are only for wheelchair users. In reality, a PEEP is required for <strong>any person</strong> who may have difficulty evacuating without assistance. This includes people with mobility impairments, sensory impairments (visual or hearing), cognitive or learning disabilities, mental health conditions, and temporary impairments such as a broken leg or late-stage pregnancy. The scope is deliberately broad to ensure no one is overlooked.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Key Principle</p>
                <p className="text-sm text-white/80">
                  The responsible person under the RRFSO has a legal duty to identify all persons who may need a PEEP and to ensure a plan is in place <strong>before</strong> an emergency occurs. Discovering during a real fire that someone cannot evacuate is an unacceptable failure of fire safety management. PEEPs must be proactive, not reactive.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 02: Who Needs a PEEP?                                */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">02</span>
              Who Needs a PEEP?
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Any person who may need assistance to evacuate safely requires a PEEP. The range of conditions and situations that may necessitate a PEEP is broader than many people realise. It is the responsible person&rsquo;s duty to identify these individuals through the fire risk assessment, occupational health processes, employee self-declaration, and line management awareness.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Categories of Persons Who May Need a PEEP</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Accessibility className="h-4 w-4 text-rose-400" />
                      <p className="text-sm font-medium text-white">Wheelchair Users &amp; Mobility Impairments</p>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Wheelchair users, people who use walking frames, crutches, or sticks, people with conditions affecting balance or coordination (e.g., multiple sclerosis, Parkinson&rsquo;s disease), and anyone who cannot navigate stairs at the speed required for a safe evacuation. This is the most commonly recognised category, but it is far from the only one.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Eye className="h-4 w-4 text-rose-400" />
                      <p className="text-sm font-medium text-white">Visual Impairments</p>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed">
                      People who are blind or partially sighted may be unable to follow emergency exit signs, navigate unfamiliar escape routes, or identify hazards along the route. They may need a sighted buddy to guide them. Smoke reduces visibility for everyone, but for a person with an existing visual impairment, even light smoke can make navigation impossible.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Ear className="h-4 w-4 text-rose-400" />
                      <p className="text-sm font-medium text-white">Hearing Impairments</p>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed">
                      People who are deaf or hard of hearing may not hear the standard fire alarm. Their PEEP must address how they will be alerted: visual alarm beacons (flashing lights), vibrating pagers or wristband alerts, text message alerts, or a buddy who is assigned to alert them personally. In sleeping accommodation, bed or pillow vibrating devices may be required.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Brain className="h-4 w-4 text-rose-400" />
                      <p className="text-sm font-medium text-white">Cognitive &amp; Learning Disabilities</p>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed">
                      People with learning disabilities, autism, dementia, or other cognitive conditions may have difficulty understanding alarm signals, remembering the evacuation procedure, making decisions under stress, or navigating to exits. They may need clear, simple, repeated instructions and a buddy to guide them through each step of the evacuation.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <HeartPulse className="h-4 w-4 text-rose-400" />
                      <p className="text-sm font-medium text-white">Temporary Conditions</p>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed">
                      A broken leg, sprained ankle, recovery from surgery, late-stage pregnancy, or use of strong medication that affects alertness or mobility. These are often overlooked because people assume PEEPs are only for permanent conditions. A PEEP must be put in place for the duration of the temporary condition.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="h-4 w-4 text-rose-400" />
                      <p className="text-sm font-medium text-white">Mental Health Conditions</p>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Severe anxiety, panic disorder, PTSD, or other mental health conditions may cause a person to freeze, become disorientated, or experience a panic attack when a fire alarm sounds. Their PEEP should document how buddies will approach and support them, including calm communication techniques and a pre-agreed safe route.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Visitor Considerations</p>
                <p className="text-sm text-white/80">
                  Visitors who may need assistance should be identified through the visitor sign-in process. Reception staff should ask whether the visitor has any specific needs in the event of an evacuation. If so, a temporary arrangement &mdash; assigning a staff buddy, briefing the visitor on the nearest refuge and escape route &mdash; should be activated for the duration of the visit. For buildings that regularly receive visitors with disabilities, a Generic Emergency Evacuation Plan (GEEP) should cover general arrangements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check after Section 02 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/*  SECTION 03: PEEP Contents                                    */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">03</span>
              PEEP Contents
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A well-constructed PEEP is a detailed, practical document that provides all the information needed to evacuate a specific individual safely. It is not a generic form to be ticked &mdash; it must be tailored to the person, the building, and the available resources. The PEEP should be developed in <strong>consultation with the individual concerned</strong>, as they are the expert on their own capabilities and needs.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <ClipboardList className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Essential PEEP Contents</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { label: "Person's name and usual location", desc: "Full name, department, floor, room number, and usual working area or desk location" },
                    { label: "Nature of impairment", desc: "Clear description of the condition and how it affects evacuation ability (with the person's consent)" },
                    { label: "Assistance needed", desc: "Specific help required — physical support, guidance, verbal reassurance, equipment operation" },
                    { label: "Nominated buddies", desc: "Names and contact details of minimum 2 trained buddies, including backup arrangements" },
                    { label: "Escape route(s)", desc: "The specific route the person will use, which may differ from the standard route for other occupants" },
                    { label: "Refuge location", desc: "If applicable, the designated refuge where the person will wait for further assistance" },
                    { label: "Equipment needed", desc: "Evacuation chair, ski pad, carry chair, or other specialist equipment — and its storage location" },
                    { label: "Alarm awareness method", desc: "How the person will be made aware of the alarm — audible, visual beacon, vibrating pager, buddy alert" },
                    { label: "Assembly point arrangements", desc: "How the person will reach and be accounted for at the assembly point, including any transport needs" },
                    { label: "Review date", desc: "The next scheduled review date — minimum annually, sooner if circumstances change" }
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-3">
                      <p className="text-sm font-medium text-white">{item.label}</p>
                      <p className="text-xs text-white/70 mt-0.5">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <p>
                The PEEP must be a <strong>living document</strong>. It should be reviewed at regular intervals, tested during fire drills, and updated whenever the individual&rsquo;s circumstances change. A PEEP that sits in a filing cabinet unread and untested is worthless &mdash; it must be a practical, working plan that all relevant parties understand and can execute.
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span>The individual should be involved in developing their PEEP and should agree with the plan before it is finalised</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span>Buddies should be briefed on the PEEP contents and should practise the evacuation during drills</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span>Fire marshals should know who has a PEEP in their area and the key details of the plan</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span>A copy of the PEEP (or a summary) should be available at the fire panel or reception for the fire and rescue service</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 04: The Buddy System                                 */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">04</span>
              The Buddy System
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The buddy system is the practical mechanism by which a PEEP is executed during an emergency. A <strong>buddy</strong> is a nominated colleague who is trained and assigned to assist a specific person during an evacuation. The buddy system is fundamental to PEEP effectiveness &mdash; without trained, available buddies, a PEEP is just a piece of paper.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <UserCheck className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Buddy System Requirements</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Minimum 2 Buddies Per Person</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      A minimum of 2 buddies must be assigned to each person with a PEEP. This covers absences due to holiday, sickness, shift patterns, or the buddy working in a different part of the building. In organisations with complex shift patterns or where significant physical assistance is required, 3 or more buddies may be necessary. The key principle is that there must <strong>always</strong> be at least one trained buddy available whenever the individual is in the building.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Training Requirements</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      All buddies must be trained on: the individual&rsquo;s specific needs and how their impairment affects evacuation; the agreed evacuation route and any alternative routes; the operation of any equipment (evacuation chairs, ski pads); communication techniques appropriate to the individual; and the location of refuges and how to use communication systems. Training must be refreshed regularly and practised during fire drills.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Regular Practice</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Buddies must practise the PEEP during fire drills. An untested plan is an unreliable plan. Practice reveals problems that are not apparent on paper: a route that is too narrow for a wheelchair, an evacuation chair that is difficult to manoeuvre around a corner, or a communication system that is hard to use under pressure. The individual and their buddies should participate in at least one fire drill per year.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Buddy Responsibilities During and After Evacuation</p>
                <ul className="space-y-2 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>During evacuation:</strong> Go immediately to the individual&rsquo;s location, assist them along the agreed escape route, operate any required equipment, communicate with fire marshals about the individual&rsquo;s status and location, and if using a refuge, activate the communication system and wait for rescue</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>At the assembly point:</strong> Ensure the individual is accounted for during roll call, report to the fire marshal that the individual has been evacuated and their current condition, and remain with the individual until the all-clear is given or the fire and rescue service takes over</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>If the buddy is absent:</strong> The backup buddy must be aware that they are now the primary buddy for the day. A system must be in place to confirm buddy availability each day &mdash; for example, a check during the morning handover or a digital check-in system</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check after Section 04 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/*  SECTION 05: Refuges                                          */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">05</span>
              Refuges
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A <strong>refuge</strong> (sometimes called a &ldquo;refuge area&rdquo; or &ldquo;area of rescue assistance&rdquo;) is a protected waiting area within a building where a person who cannot use stairs can wait safely for assistance during an evacuation. Refuges are a critical component of the evacuation strategy for multi-storey buildings, and their provision is addressed in the Building Regulations (Approved Document B and Approved Document M) as well as BS 9999.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <DoorOpen className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Refuge Requirements</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { label: "Minimum 30-minute fire resistance", desc: "The refuge must be within a fire-resistant enclosure providing at least 30 minutes of protection. Some designs require 60 minutes." },
                    { label: "Communication system", desc: "A two-way voice intercom, emergency telephone, or similar system connecting to the fire panel, control room, or fire service." },
                    { label: "Signage", desc: "Clear signage indicating the refuge location, conforming to BS 5499 / ISO 7010 standards, with the international symbol of accessibility." },
                    { label: "Wheelchair accessible", desc: "Large enough to accommodate a wheelchair without obstructing the escape route for other occupants (minimum 900mm x 1400mm clear space)." },
                    { label: "Located on escape routes", desc: "Typically within protected stairways or protected lobbies adjacent to staircases, on each floor above or below ground level." },
                    { label: "Not a final destination", desc: "The refuge is a temporary waiting area only. Rescue by the fire service or trained personnel using evacuation equipment must follow." }
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-3">
                      <p className="text-sm font-medium text-white">{item.label}</p>
                      <p className="text-xs text-white/70 mt-0.5">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <p>
                The communication system is arguably the most critical feature of a refuge. Without it, a person waiting in the refuge has no way of informing anyone of their presence. If the fire and rescue service arrives and is not aware that someone is waiting in a refuge, the rescue may be delayed or overlooked entirely. The communication system must be tested as part of the regular fire alarm testing regime.
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Building Regulations requirement:</strong> Approved Document M requires that all new non-domestic buildings provide wheelchair-accessible refuges in protected stairways where the building has more than one storey</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Existing buildings:</strong> The provision of refuges in existing buildings may be required as a reasonable adjustment under the Equality Act 2010, depending on what is practicable</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Maintenance:</strong> Refuges must be kept clear of storage, equipment, and obstructions at all times. Regular checks should confirm that the communication system is operational and the signage is in good condition</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Fire marshal awareness:</strong> All fire marshals must know the location of refuges on their floor and must check them during an evacuation to confirm whether anyone is waiting</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 06: Evacuation Equipment                             */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">06</span>
              Evacuation Equipment
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Specialist evacuation equipment is often essential for executing PEEPs, particularly in multi-storey buildings where the person cannot use stairs. The type of equipment required depends on the individual&rsquo;s needs, the building&rsquo;s staircase design, and the number of trained operators available. The equipment must be specified in the individual&rsquo;s PEEP and its location clearly documented.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Armchair className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Types of Evacuation Equipment</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Evacuation Chairs (Stairway Descent)</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The most common type of evacuation equipment. Designed for descending staircases, these chairs have tracks or specialised wheels that allow controlled, smooth descent. Typically require one trained operator (some models require two). Positioned at strategic locations, usually at the top of protected staircases on each floor. Examples include the Evac+Chair, Escape-Carry Chair, and similar products. The person is transferred from their wheelchair to the evacuation chair before descending.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Ski Pads / Evacuation Sheets</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Flat, flexible devices designed for sliding a person down staircases. Commonly used in hospitals and care homes where patients may be lying down. The person is placed on the ski pad and slid down the stairs in a controlled manner by one or two operators. Particularly useful for bedridden patients or persons who cannot sit in an evacuation chair. Lightweight and can be stored under mattresses or in stairwell cupboards.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Carry Chairs</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Rigid chairs with handles that allow two or more operators to carry a person down staircases. Simpler than tracked evacuation chairs but require more physical effort from the operators. Used where tracked chairs are impractical or where the person&rsquo;s condition makes transfer to a tracked chair difficult. Less commonly used in workplace settings but still found in some healthcare environments.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Critical Requirements for All Evacuation Equipment</p>
                <ul className="space-y-2 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>Training is mandatory:</strong> An untrained person attempting to use an evacuation chair is a danger to themselves and the person being evacuated. All operators must be trained by the equipment manufacturer or an accredited trainer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>Regular inspection and maintenance:</strong> Equipment must be inspected at regular intervals (typically six-monthly) to ensure it is in good working order. Worn tracks, faulty brakes, or damaged harnesses must be repaired or replaced immediately</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>Location and access:</strong> Equipment must be stored in accessible, clearly signed locations close to the refuge or protected stairway where it will be used. It must not be locked away where operators cannot reach it quickly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>Practice during drills:</strong> Equipment should be used during fire drills (with the individual&rsquo;s consent) to ensure operators are proficient and to identify any practical difficulties with the route or staircase</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check after Section 06 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ============================================================ */}
        {/*  SECTION 07: GEEPs                                            */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">07</span>
              GEEPs (Generic Emergency Evacuation Plans)
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The concept of <strong>Generic Emergency Evacuation Plans (GEEPs)</strong> emerged from the Grenfell Tower Inquiry as a solution to a fundamental problem: in <strong>residential buildings</strong>, the building owner or manager often does not know the identity or specific needs of every resident who may need assistance to evacuate. Unlike a workplace, where the employer knows their employees and can develop individual PEEPs, a residential building manager cannot require residents to disclose disabilities.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Fire Safety (England) Regulations 2022</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  The Fire Safety (England) Regulations 2022 formalised the requirement for GEEPs in certain residential buildings. These regulations apply to <strong>all multi-occupied residential buildings in England</strong> (buildings containing two or more sets of domestic premises) and impose specific duties on the responsible person.
                </p>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">What a GEEP Contains</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Unlike a PEEP (which is for a named individual), a GEEP is a building-wide plan that identifies the general arrangements for evacuating persons with disabilities. It includes: floor-by-floor plans showing refuge locations, evacuation equipment positions, and escape routes; the types of equipment available (evacuation chairs, ski pads) and their locations; the general procedure for assisting persons with different types of impairment; the communication systems available; and the arrangements for informing the fire and rescue service about persons who may need assistance.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">The Grenfell Context</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The Grenfell Tower fire on 14 June 2017 tragically exposed the inadequacy of existing arrangements for evacuating disabled residents from high-rise buildings. Several of the 72 people who died were disabled residents who could not self-evacuate. The Grenfell Tower Inquiry Phase 1 Report recommended that building owners and managers of high-rise residential buildings be required to prepare Personal Emergency Evacuation Plans for all residents who would have difficulty self-evacuating. The government opted for GEEPs as a more proportionate and privacy-respecting approach, while still encouraging individual PEEPs where residents voluntarily disclose their needs.
                    </p>
                  </div>
                </div>
              </div>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Floor-level plans</strong> should show the precise location of refuges, evacuation equipment, escape routes suitable for wheelchair users, and any areas where assistance may be needed (e.g., steps, narrow corridors)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Premises information box:</strong> High-rise residential buildings (over 18 metres / 7 storeys) must have a premises information box containing the GEEP, floor plans, and other key information for the fire and rescue service</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Individual PEEPs alongside GEEPs:</strong> Where a resident voluntarily discloses their needs, the responsible person should develop an individual PEEP that works in conjunction with the building&rsquo;s GEEP</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Regular review:</strong> GEEPs must be reviewed regularly (at least annually) and updated whenever the building layout, equipment, or escape routes change</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 08: Communication, Review & Confidentiality          */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">08</span>
              Communication, Review &amp; Confidentiality
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Effective communication is essential throughout the PEEP process &mdash; from initial identification of need, through development and testing, to execution during an emergency. Equally important are the requirements for regular review and the duty to handle personal information with appropriate confidentiality and sensitivity.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Ear className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Communication Methods for Persons with Hearing Impairments</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { label: "Visual alarms (flashing beacons)", desc: "Bright flashing lights (typically red or white) synchronised with the fire alarm system. Installed in all areas where deaf or hard-of-hearing persons may be present." },
                    { label: "Vibrating pagers / wristbands", desc: "Personal devices that vibrate when the fire alarm is triggered. Particularly useful for persons who move around the building and may not always be near a visual alarm." },
                    { label: "Text / SMS alerts", desc: "Automated text messages sent to registered mobile phones when the fire alarm activates. Useful as a backup to other methods." },
                    { label: "Buddy alert", desc: "A designated buddy is assigned to physically alert the individual when the alarm sounds. Simple and effective, but requires the buddy to be available and nearby." }
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-3">
                      <p className="text-sm font-medium text-white">{item.label}</p>
                      <p className="text-xs text-white/70 mt-0.5">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <RefreshCw className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">PEEP Review Requirements</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Minimum Annual Review</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Every PEEP must be formally reviewed at least once per year, even if no changes have occurred. The annual review confirms that the plan remains valid, the individual&rsquo;s needs have not changed, the assigned buddies are still appropriate, the escape route is still suitable, and any equipment is still available and in good condition. The review should be documented with the date and the names of those involved.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Triggered Reviews</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      In addition to the annual review, a PEEP must be reviewed whenever circumstances change. Triggers include: the individual&rsquo;s condition changes (worsens, improves, or a new condition develops); the individual moves to a different floor, office, or work area; building works affect the escape route, refuge, or equipment location; assigned buddies leave the organisation or change roles; a fire drill reveals that the plan does not work as intended; or new evacuation equipment becomes available.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Lock className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Confidentiality &amp; Data Protection</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  PEEPs contain sensitive personal information about an individual&rsquo;s disability or health condition. This information is classified as <strong>special category data</strong> under the UK General Data Protection Regulation (UK GDPR) and must be handled with the utmost care.
                </p>
                <ul className="space-y-2 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>Need-to-know basis:</strong> Only share information that buddies and fire marshals need to fulfil their role. A buddy needs to know what assistance is required, but does not necessarily need a detailed medical diagnosis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>Consent:</strong> The individual should consent to the sharing of their information with buddies and fire marshals. Discuss with the individual what level of detail they are comfortable sharing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>Secure storage:</strong> PEEPs should be stored securely, whether in paper or electronic form. Access should be restricted to authorised personnel only</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>Fire service access:</strong> A summary of relevant information (person&rsquo;s name, floor, type of assistance needed) should be available at the fire panel or reception for the fire and rescue service, but detailed medical information should not be included unless the individual has consented</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>Retention:</strong> When a PEEP is no longer needed (the individual leaves the organisation or recovers from a temporary condition), the plan should be archived or securely destroyed in accordance with the organisation&rsquo;s data retention policy</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Balancing Safety and Privacy</p>
                <p className="text-sm text-white/80">
                  There can be tension between the need to share enough information for effective evacuation and the individual&rsquo;s right to privacy. The key principle is <strong>proportionality</strong>: share the minimum information necessary to ensure the person&rsquo;s safety. For example, a buddy needs to know that their colleague uses a wheelchair and requires assistance via the evacuation chair on the west staircase. The buddy does not need to know the medical diagnosis that caused the wheelchair use. The individual should always be involved in deciding what information is shared and with whom.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  PEEP DEVELOPMENT PROCESS DIAGRAM                             */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="my-6 p-4 sm:p-6 rounded-xl bg-white/[0.02] border border-rose-500/20">
            <h3 className="text-sm font-semibold text-rose-400 mb-4 flex items-center gap-2">
              <GitBranch className="h-4 w-4" />
              PEEP Development Process
            </h3>
            <div className="space-y-3">
              {/* Step 1 */}
              <div className="bg-rose-500/20 border border-rose-500/40 rounded-lg px-4 py-3 text-center">
                <p className="text-xs font-bold text-rose-400">1. IDENTIFY</p>
                <p className="text-[10px] text-white/50 mt-1">Risk assessment, occupational health, self-declaration, line manager awareness</p>
              </div>
              <div className="flex justify-center">
                <div className="w-px h-4 bg-rose-500/30" />
              </div>
              {/* Step 2 */}
              <div className="bg-rose-500/20 border border-rose-500/40 rounded-lg px-4 py-3 text-center">
                <p className="text-xs font-bold text-rose-400">2. CONSULT</p>
                <p className="text-[10px] text-white/50 mt-1">Discuss needs with the individual — they are the expert on their own capabilities</p>
              </div>
              <div className="flex justify-center">
                <div className="w-px h-4 bg-rose-500/30" />
              </div>
              {/* Step 3 */}
              <div className="bg-rose-500/20 border border-rose-500/40 rounded-lg px-4 py-3 text-center">
                <p className="text-xs font-bold text-rose-400">3. ASSESS ROUTE &amp; RESOURCES</p>
                <p className="text-[10px] text-white/50 mt-1">Walk the escape route, identify refuges, check equipment availability, note obstacles</p>
              </div>
              <div className="flex justify-center">
                <div className="w-px h-4 bg-rose-500/30" />
              </div>
              {/* Step 4 */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                    <p className="text-xs font-bold text-white">Assign Buddies</p>
                    <p className="text-[10px] text-white/50">Minimum 2 trained buddies</p>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-px h-3 bg-rose-500/30" />
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg px-3 py-2 text-center">
                    <UserCheck className="h-4 w-4 text-rose-400 mx-auto mb-1" />
                    <p className="text-xs font-bold text-rose-400">TRAIN BUDDIES</p>
                    <p className="text-[10px] text-white/50">Route, equipment, communication</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                    <p className="text-xs font-bold text-white">Document the Plan</p>
                    <p className="text-[10px] text-white/50">All 10 essential PEEP contents</p>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-px h-3 bg-rose-500/30" />
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg px-3 py-2 text-center">
                    <ClipboardList className="h-4 w-4 text-rose-400 mx-auto mb-1" />
                    <p className="text-xs font-bold text-rose-400">AGREE WITH INDIVIDUAL</p>
                    <p className="text-[10px] text-white/50">Consent and sign-off</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-px h-4 bg-rose-500/30" />
              </div>
              {/* Step 5 */}
              <div className="bg-rose-500/20 border border-rose-500/40 rounded-lg px-4 py-3 text-center">
                <p className="text-xs font-bold text-rose-400">5. TEST DURING FIRE DRILL</p>
                <p className="text-[10px] text-white/50 mt-1">Validate the plan under realistic conditions — identify and resolve any issues</p>
              </div>
              <div className="flex justify-center">
                <div className="w-px h-4 bg-rose-500/30" />
              </div>
              {/* Step 6 */}
              <div className="bg-rose-500/20 border border-rose-500/40 rounded-lg px-4 py-3 text-center">
                <p className="text-xs font-bold text-rose-400">6. REVIEW &amp; UPDATE</p>
                <p className="text-[10px] text-white/50 mt-1">Annually minimum, on change of circumstances, after every drill</p>
              </div>
              <p className="text-xs text-white/50 text-center mt-4">
                The PEEP development process is cyclical &mdash; step 6 feeds back into steps 2&ndash;5 as circumstances change and lessons are learned from drills.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  FAQ SECTION                                                  */}
        {/* ============================================================ */}
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

        {/* ============================================================ */}
        {/*  END-OF-SECTION QUIZ                                          */}
        {/* ============================================================ */}
        <Quiz
          title="Section 4 Knowledge Check"
          questions={quizQuestions}
        />

        {/* ============================================================ */}
        {/*  BOTTOM NAVIGATION                                            */}
        {/* ============================================================ */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../fire-safety-module-4-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Assembly Points &amp; Roll Call
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../fire-safety-module-5">
              Continue to Module 5
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

      </article>
    </div>
  );
}
