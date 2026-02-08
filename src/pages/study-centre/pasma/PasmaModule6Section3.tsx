import { ArrowLeft, LifeBuoy, CheckCircle, AlertTriangle, Clock, Phone, Stethoscope, GraduationCap, FileWarning } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "rescue-plan-legal-requirement",
    question: "Under the Work at Height Regulations 2005, when must a rescue plan be in place?",
    options: [
      "Only when working above 10 metres",
      "Before any work at height begins",
      "Only when working over water",
      "Only when the HSE inspector visits"
    ],
    correctIndex: 1,
    explanation: "The Work at Height Regulations 2005 (WAHR) require that rescue procedures are planned and in place BEFORE any work at height begins — regardless of the height involved. You cannot rely on making it up as you go or assuming the emergency services will arrive in time. The plan must be specific to the work activity and location."
  },
  {
    id: "rescue-suspension-trauma-time",
    question: "How quickly can suspension trauma (orthostatic intolerance) cause circulatory failure in a person suspended in a harness?",
    options: [
      "2-4 hours",
      "30-60 minutes",
      "5-15 minutes",
      "It cannot cause circulatory failure"
    ],
    correctIndex: 2,
    explanation: "Suspension trauma can cause circulatory failure in as little as 5-15 minutes. When a person is suspended motionless in a harness, blood pools in the legs due to the harness compressing the femoral veins. This reduces the volume of blood returning to the heart, leading to unconsciousness and potentially death. This is why rapid rescue is absolutely critical."
  },
  {
    id: "rescue-hierarchy-levels",
    question: "What are the three levels of the PASMA rescue hierarchy, in order?",
    options: [
      "Call 999, wait for ambulance, go to hospital",
      "Self-rescue, assisted rescue by colleagues, professional rescue by emergency services",
      "Run, hide, call for help",
      "PPE check, risk assessment, method statement"
    ],
    correctIndex: 1,
    explanation: "The PASMA rescue hierarchy has three levels: (1) Self-rescue — the operative descends unaided, (2) Assisted rescue — colleagues help the operative descend using planned equipment and procedures, (3) Professional rescue — emergency services attend. Planning must always cover all three levels, and you must always plan for the worst case (Level 3) even when hoping for the best (Level 1)."
  }
];

const faqs = [
  {
    question: "Do I need a rescue plan for every tower, even a small one?",
    answer: "Yes. The Work at Height Regulations 2005 require rescue procedures to be in place before any work at height begins, with no minimum height threshold. Even a fall from a 2-metre platform can cause life-threatening injuries. The complexity of the rescue plan should be proportionate to the risk — a simple tower in an accessible location may need a straightforward plan, while a tower in a remote area or at considerable height will need more detailed arrangements. But every tower requires a plan."
  },
  {
    question: "What is suspension trauma and why is it so dangerous?",
    answer: "Suspension trauma (also called orthostatic intolerance or harness hang syndrome) occurs when a person is suspended motionless in a harness. The leg straps compress the femoral veins, causing blood to pool in the legs. With less blood returning to the heart, cardiac output drops, blood pressure falls, and the brain is starved of oxygen. The person may lose consciousness within 5-15 minutes and can die if not rescued and placed in a recovery position promptly. Even after rescue, sudden release of the pooled blood can cause 'reflow syndrome,' which can trigger cardiac arrest. Rescued casualties should be placed in a sitting or W-position, not laid flat."
  },
  {
    question: "Can I rely on calling 999 as my rescue plan?",
    answer: "No. While calling emergency services is an important part of any rescue plan, it cannot be the only provision. Ambulance response times vary significantly depending on location — in urban areas it may be 8-15 minutes, in rural areas it could be 30 minutes or more. For suspension trauma casualties, this delay can be fatal. Your rescue plan must include provisions for colleagues to carry out an assisted rescue within minutes, before emergency services arrive. The 999 call should happen in parallel with the on-site rescue, not instead of it."
  },
  {
    question: "How often should rescue plans be practised?",
    answer: "Rescue plans should be practised through drills at regular intervals — at minimum annually, but more frequently for high-risk work or when team members change. A rescue plan that has never been practised is a plan that will fail when needed. Drills reveal practical problems that look fine on paper: equipment that is stored in an inaccessible location, team members who cannot remember their roles, communication methods that do not work, or rescue equipment that does not fit the actual tower configuration. After each drill, the plan should be reviewed and updated based on what was learned."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Under which regulation is the requirement for rescue procedures before work at height established?",
    options: [
      "The Electricity at Work Regulations 1989",
      "The Work at Height Regulations 2005 (WAHR)",
      "The Construction Design and Management Regulations 2015",
      "The Personal Protective Equipment Regulations 2022"
    ],
    correctAnswer: 1,
    explanation: "The Work at Height Regulations 2005 (WAHR) specifically require that every employer ensures, so far as is reasonably practicable, that rescue procedures (including rescue equipment) are in place before any work at height begins. This is a legal duty, not optional good practice."
  },
  {
    id: 2,
    question: "Why can you NOT rely solely on emergency services for rescue from a mobile tower?",
    options: [
      "Emergency services do not attend construction sites",
      "Response times may be too long, especially for suspension trauma casualties who can deteriorate in 5-15 minutes",
      "Emergency services do not have ladders tall enough",
      "It is only illegal to call 999 on Sundays"
    ],
    correctAnswer: 1,
    explanation: "Emergency service response times are variable and can be 15-30+ minutes depending on location and demand. For a casualty suffering suspension trauma, this delay can be fatal — circulatory failure can occur in as little as 5-15 minutes. On-site assisted rescue capability is essential to bridge this gap."
  },
  {
    id: 3,
    question: "What is the FIRST level in the PASMA rescue hierarchy?",
    options: [
      "Professional rescue by the fire service",
      "Assisted rescue by trained colleagues",
      "Self-rescue — the operative descends unaided",
      "Helicopter evacuation"
    ],
    correctAnswer: 2,
    explanation: "Self-rescue is the first and most desirable level. If the operative is conscious, mobile, and able to descend the tower unaided using the internal ladder, this is the quickest and simplest form of rescue. The rescue plan should facilitate self-rescue wherever possible — for example, by ensuring the internal ladder route is always clear."
  },
  {
    id: 4,
    question: "A written rescue plan for tower work must include which of the following?",
    options: [
      "Only the telephone number for 999",
      "The rescue team, available equipment, communication methods, access for emergency services, nearest A&E, and first-aid provision",
      "Only the name of the site manager",
      "Only the height of the tower"
    ],
    correctAnswer: 1,
    explanation: "A comprehensive rescue plan must cover: who forms the rescue team and their training, what rescue equipment is available and where it is stored, communication methods for raising the alarm, access arrangements for emergency services, the location of the nearest A&E department, and on-site first-aid provision including trained first aiders and equipment."
  },
  {
    id: 5,
    question: "What is the primary danger of suspension trauma?",
    options: [
      "The harness may cause bruising",
      "Blood pools in the legs, reducing cardiac output and potentially causing circulatory failure and death within minutes",
      "The person may get sunburnt while waiting",
      "The harness may stretch and become uncomfortable"
    ],
    correctAnswer: 1,
    explanation: "Suspension trauma causes blood to pool in the legs when the harness compresses the femoral veins. With blood trapped in the lower extremities, less returns to the heart, cardiac output drops, blood pressure falls, and the brain is deprived of oxygen. Without rescue and treatment, this sequence can lead to unconsciousness and death in as little as 5-15 minutes."
  },
  {
    id: 6,
    question: "After rescuing a casualty who has been suspended in a harness, what position should they be placed in?",
    options: [
      "Laid completely flat on their back",
      "Sitting position or W-position (knees raised) — NOT laid flat, to prevent reflow syndrome",
      "Standing upright immediately",
      "Hung upside down to restore blood flow"
    ],
    correctAnswer: 1,
    explanation: "A casualty rescued from suspension must NOT be laid flat immediately. The sudden return of pooled, oxygen-depleted blood from the legs can overwhelm the heart and cause cardiac arrest (reflow syndrome). The casualty should be placed in a sitting position or W-position (legs raised at the knees) and monitored closely. Medical advice should be sought even if the casualty appears to recover."
  },
  {
    id: 7,
    question: "What communication method is MOST important to have in place before work at height begins?",
    options: [
      "A semaphore flag system",
      "A reliable method of raising the alarm that works from the platform — mobile phone with signal, two-way radio, or buddy system with agreed signals",
      "A postal address for written correspondence",
      "An email distribution list"
    ],
    correctAnswer: 1,
    explanation: "The rescue plan must include a reliable method of raising the alarm from the working platform. This could be a mobile phone (confirm signal coverage first), two-way radios, or a buddy system with agreed visual or audible signals. The method must work from the platform height and in the specific location — not all sites have mobile phone coverage."
  },
  {
    id: 8,
    question: "Why must rescue plans be practised through drills, not just written?",
    options: [
      "To give the team a break from productive work",
      "Because drills reveal practical problems — equipment access issues, unclear roles, communication failures — that are invisible on paper",
      "Because the HSE sells drill equipment",
      "Drills are optional and provide no benefit"
    ],
    correctAnswer: 1,
    explanation: "A plan that looks perfect on paper may fail completely in practice. Drills reveal problems such as: rescue equipment stored in a locked room with no key available, team members unsure of their roles, communication methods that do not work at the actual location, or procedures that take too long. Regular drills ensure the plan is realistic, the team is competent, and the equipment is available and functional."
  }
];

export default function PasmaModule6Section3() {
  useSEO({
    title: "Rescue Procedures | PASMA Module 6.3",
    description: "Rescue plan requirements under WAHR, PASMA rescue hierarchy, suspension trauma, communication during emergencies, first aid at height, and rescue drill training for mobile tower work.",
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
            <Link to="../pasma-module-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-elec-yellow/20 to-amber-500/20 border border-elec-yellow/30 mb-4">
            <LifeBuoy className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3 mx-auto">
            <span className="text-elec-yellow text-xs font-semibold">MODULE 6 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Rescue Procedures
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Planning, practising, and executing rescue procedures for mobile tower emergencies &mdash; from legal requirements to suspension trauma and first aid at height
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Legal duty:</strong> Rescue plan required BEFORE work at height begins</li>
              <li><strong>Suspension trauma:</strong> Can kill in 5&ndash;15 minutes &mdash; rapid rescue essential</li>
              <li><strong>3 levels:</strong> Self-rescue &rarr; assisted rescue &rarr; professional rescue</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Plan:</strong> Written rescue plan, team roles, equipment identified</li>
              <li><strong>Communicate:</strong> Everyone knows how to raise the alarm</li>
              <li><strong>Practise:</strong> Drill regularly &mdash; a plan on paper is not enough</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the legal requirement for rescue procedures under WAHR",
              "Describe the three levels of the PASMA rescue hierarchy",
              "Identify the essential contents of a written rescue plan",
              "Recognise the symptoms and dangers of suspension trauma",
              "Outline effective communication methods for tower emergencies",
              "Understand the importance of practising rescue plans through drills"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why a Rescue Plan Is Essential */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Why a Rescue Plan Is Essential
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Work at Height Regulations 2005 (WAHR) are unambiguous: rescue procedures must be planned and in place <strong>before</strong> any work at height begins. This is not guidance or best practice &mdash; it is a legal requirement. Regulation 4(1) specifically states that every employer must plan work at height, including the rescue of any person in the event of an emergency.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Why You Cannot Rely on Emergency Services Alone</p>
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  <p>Emergency service response times are variable and depend on location, demand, and access. In urban areas, an ambulance may arrive in 8&ndash;15 minutes. In rural or remote areas, it may take 30 minutes or longer. For a fire service rescue involving specialist equipment, the wait may be longer still.</p>
                  <p>For a casualty suffering suspension trauma, even 8 minutes may be too long. For someone with a serious bleed, every minute counts. A rescue plan that consists solely of &ldquo;call 999&rdquo; is not a plan &mdash; it is an abdication of responsibility.</p>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-2">Planning Saves Lives</p>
                <p className="text-sm text-white/80">
                  A well-prepared rescue plan reduces the time between an incident occurring and the casualty receiving help. It ensures equipment is available and accessible, team members know their roles, communication methods are established, and emergency services can find and access the location. Every minute saved in the early stages of an emergency significantly improves the casualty&rsquo;s chance of survival.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Regulation 4 &mdash; Key Requirements</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Work at height must be properly planned</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Planning must include emergency procedures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Rescue must be possible without exposing rescuers to undue risk</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Equipment for rescue must be available at the work location</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Personnel must be trained in rescue procedures</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">What Happens Without a Plan</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Panic and confusion delay the rescue response</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>No rescue equipment immediately available</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>No one knows who should do what</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Emergency services cannot find the location</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Precious minutes are wasted &mdash; potentially fatal minutes</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: PASMA Rescue Hierarchy */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            PASMA Rescue Hierarchy
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                PASMA teaches a three-level rescue hierarchy. The plan must address all three levels, because you cannot predict what state the casualty will be in or what resources will be available at the moment an emergency occurs. Always plan for the worst case.
              </p>

              <div className="space-y-3">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-500/30 text-green-300 text-sm font-bold flex-shrink-0">1</span>
                    <p className="text-sm font-medium text-green-300">Self-Rescue</p>
                  </div>
                  <p className="text-sm text-white/80">
                    The operative is conscious, mobile, and able to descend the tower unaided using the internal ladder. This is the quickest form of rescue and should be facilitated wherever possible &mdash; keep the internal ladder route clear at all times, ensure trapdoors are functional, and do not block the descent path with tools or materials. Self-rescue applies when the operative recognises a developing problem (feeling unwell, weather deteriorating) and descends before the situation becomes critical.
                  </p>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-500/30 text-amber-300 text-sm font-bold flex-shrink-0">2</span>
                    <p className="text-sm font-medium text-amber-300">Assisted Rescue</p>
                  </div>
                  <p className="text-sm text-white/80">
                    The operative is unable to descend unaided — perhaps due to injury, illness, or incapacitation. Colleagues on site carry out a rescue using pre-planned procedures and equipment. This may involve climbing the tower to assist the casualty, lowering the casualty using a rescue system, or helping the casualty descend with physical support. All team members must be trained in the assisted rescue procedure before work begins.
                  </p>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-500/30 text-red-300 text-sm font-bold flex-shrink-0">3</span>
                    <p className="text-sm font-medium text-red-300">Professional Rescue</p>
                  </div>
                  <p className="text-sm text-white/80">
                    Emergency services attend to carry out the rescue. This is the last resort and typically involves the fire service with specialist rescue equipment. While waiting for emergency services, the on-site team should provide first aid, monitor the casualty, maintain communication, and ensure clear access for the response vehicles. The rescue plan must include the site address, grid reference, access instructions, and any restrictions (low bridges, narrow lanes, security gates).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Written Rescue Plan Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Written Rescue Plan Requirements
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The rescue plan must be written, site-specific, and available to everyone involved in the work. A rescue plan that exists only in someone&rsquo;s memory is not a rescue plan. The document should be concise enough to be read quickly but comprehensive enough to cover all foreseeable emergency scenarios.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <FileWarning className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">Rescue Plan Must Cover</p>
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">Rescue team:</strong> Named individuals who form the on-site rescue team, their training and competence, and how they will be contacted.</p>
                  <p><strong className="text-white">Rescue equipment:</strong> What equipment is available (first-aid kit, stretcher, rescue harness, lowering device), where it is stored, and who is trained to use it.</p>
                  <p><strong className="text-white">Communication methods:</strong> How to raise the alarm from the platform — mobile phone (with confirmed signal), two-way radio, whistle, verbal call. Emergency contact numbers.</p>
                  <p><strong className="text-white">Access for emergency services:</strong> Site address with postcode, grid reference or what3words location, access route instructions, gate codes or security arrangements, any restrictions on vehicle size.</p>
                  <p><strong className="text-white">Nearest A&amp;E:</strong> Name and address of the nearest accident and emergency department, with estimated travel time.</p>
                  <p><strong className="text-white">First-aid provision:</strong> Location of the nearest first-aid kit, identity of trained first aiders on site, and any specialist first-aid equipment (AED, burns kit, trauma dressings).</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">The Plan Must Be Accessible</p>
                <p className="text-sm text-white/80">
                  The rescue plan should be kept at the work location, not locked in an office. Every member of the team must know where it is and have read it before work begins. In an emergency, no one should have to search for instructions. Key information &mdash; emergency numbers, A&amp;E location, access routes &mdash; should be prominently displayed.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Site-Specific Considerations</p>
                <p className="text-sm text-white/80">
                  The rescue plan must account for the specific challenges of the site. On a roof, how will the casualty be brought down from the roof level as well as from the tower? In a building under construction, are stairwells complete and passable for stretcher access? On a remote rural site, can an air ambulance land nearby and is there mobile phone signal? In an occupied building, how will the building&rsquo;s occupants be managed during the emergency? Each of these scenarios requires different provisions in the rescue plan.
                </p>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-2">Lone Working and Rescue</p>
                <p className="text-sm text-white/80">
                  If an operative is working alone on or near a tower, the rescue plan becomes even more critical. Who will raise the alarm if the lone worker becomes incapacitated? Regular check-in calls, personal alarm devices, and buddy systems at defined intervals are all methods of ensuring a lone worker&rsquo;s condition is monitored. In many cases, the risk assessment may conclude that lone working on a tower is not acceptable because an adequate rescue cannot be guaranteed.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Multi-Tower Sites</p>
                <p className="text-sm text-white/80">
                  On sites where multiple towers are in use simultaneously, the rescue plan must cover all towers. This includes ensuring there are enough trained rescuers to respond to an incident on any tower, that rescue equipment is available near each tower (not stored centrally where it may take minutes to retrieve), and that communication between tower locations is reliable. A single rescue plan that assumes only one tower is in use at a time is inadequate for a multi-tower site. Each tower should have its own brief rescue addendum covering location-specific details.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Night Work and Rescue</p>
                <p className="text-sm text-white/80">
                  If tower work takes place during hours of darkness or reduced visibility, the rescue plan must account for the additional challenges. Adequate lighting must be available at the tower and along the rescue route. Torches should be immediately available for rescue team members. The access route for emergency services must be illuminated and clearly marked. Identifying a casualty&rsquo;s condition is harder in poor light, and descent takes longer when visibility is limited.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Rescue Equipment Checklist</p>
                <div className="grid md:grid-cols-2 gap-3 text-sm text-white/80">
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Comprehensive first-aid kit (accessible from platform)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Trauma dressings and tourniquet</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Rescue harness or lowering device (if applicable)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Spinal board or scoop stretcher</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>AED location identified and route planned</span>
                    </li>
                  </ul>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Mobile phone (charged, with signal confirmed)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Two-way radios (charged, tested)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Emergency contact list (laminated, at the tower)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Torch/headtorch (for poor visibility work)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Whistle (for audible alarm signal)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Suspension Trauma (Orthostatic Intolerance) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Suspension Trauma (Orthostatic Intolerance)
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Suspension trauma &mdash; also known as orthostatic intolerance or harness hang syndrome &mdash; is one of the most critical dangers in work at height rescue. It is poorly understood by many in the construction industry, yet it can kill a healthy person in minutes. Every person involved in tower work must understand this hazard.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">5&ndash;15 Minutes to Circulatory Failure</p>
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  <p>When a person hangs motionless in a harness, the leg straps compress the femoral veins in the upper thighs. This prevents blood in the legs from returning to the heart. With progressively less blood available to circulate, the heart&rsquo;s output drops, blood pressure falls, and vital organs &mdash; including the brain &mdash; are starved of oxygen.</p>
                  <p>This cascade can proceed from initial discomfort to unconsciousness in as little as 5 minutes, and to death in 15 minutes or less. The speed depends on the individual&rsquo;s health, the harness fit, ambient temperature, and whether the person is able to move their legs.</p>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Symptoms — Progressive Deterioration</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Early:</strong> Tingling in the legs, numbness, dizziness, light-headedness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Developing:</strong> Nausea, sweating, grey or pale skin, increasing anxiety</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Advanced:</strong> Confusion, inability to respond to instructions, vision disturbance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Critical:</strong> Loss of consciousness, irregular heart rhythm, cardiac arrest</span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Recovery Position — Do NOT Lay Flat</p>
                </div>
                <p className="text-sm text-white/80">
                  After rescue, the casualty must NOT be laid flat on their back. The sudden return of pooled, oxygen-depleted, acid-rich blood from the legs to the heart can trigger cardiac arrest &mdash; known as &ldquo;reflow syndrome.&rdquo; Instead, place the casualty in a sitting position or a W-position with knees raised. Monitor closely and seek immediate medical attention, even if the person appears to recover. Internal damage may not be immediately apparent.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Suspension Trauma Prevention Measures</p>
                <p className="text-sm text-white/80">
                  While rapid rescue is the primary response, suspension trauma risk can be reduced through: using a harness with wider leg straps that distribute pressure more evenly, fitting trauma straps (stirrups) that allow the suspended person to stand in the harness and activate their leg muscles, and training operatives to keep moving their legs if suspended &mdash; even small movements help pump blood back towards the heart. However, none of these measures replace the need for rapid rescue; they only buy additional time.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Hospital Follow-Up Is Essential</p>
                <p className="text-sm text-white/80">
                  Any person who has been suspended in a harness for more than a few minutes must be taken to hospital, even if they appear to have recovered fully. The effects of suspension trauma can be delayed &mdash; kidney damage from the breakdown products of oxygen-deprived muscle tissue (rhabdomyolysis) may not become apparent for hours. Inform the hospital that the casualty was suspended in a harness and for how long, so that appropriate blood tests and monitoring can be carried out.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Communication During Emergencies */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Communication During Emergencies
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In an emergency, clear and rapid communication is the difference between a timely rescue and a delayed one. The communication plan must be established before work begins, tested to confirm it works at the specific location, and understood by every member of the team.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Phone className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">Raising the Alarm</p>
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">Mobile phone:</strong> Check signal coverage at the exact working location and at platform height. Store emergency numbers in the phone (999, site office, first aider, supervisor). Keep the phone charged and accessible, not in a bag at the bottom of the tower.</p>
                  <p><strong className="text-white">Two-way radios:</strong> Essential where mobile phone signal is unreliable. Test range and clarity before work begins. Ensure batteries are charged. Agree an emergency channel or call sign.</p>
                  <p><strong className="text-white">Buddy system:</strong> Always work with at least one other person within visual or audible range. The buddy remains at ground level and can raise the alarm, call for help, and coordinate the initial response.</p>
                  <p><strong className="text-white">Signal words and whistles:</strong> Agree standard emergency signals &mdash; for example, three blasts on a whistle means &ldquo;emergency, help needed.&rdquo; This works when verbal communication is not possible due to distance, noise, or the casualty&rsquo;s condition.</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Who to Call and in What Order</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">1. On-site rescue team:</strong> Alert colleagues to begin assisted rescue immediately</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">2. Emergency services (999):</strong> Ambulance as a minimum; fire service if specialist rescue is needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">3. Site management:</strong> Notify the site supervisor or principal contractor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">4. Own employer:</strong> Report the incident to your company&rsquo;s emergency contact</span>
                  </li>
                </ul>
                <p className="text-sm text-white/80 mt-2">
                  Steps 1 and 2 should happen simultaneously if there are enough people. One person begins the rescue while another calls 999. Do not delay the physical rescue to make phone calls.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Information for the 999 Call</p>
                <p className="text-sm text-white/80">
                  When calling emergency services, provide: the exact location (address, postcode, what3words or grid reference), the nature of the emergency (fall from height, person suspended, medical emergency), the number of casualties, the height involved, any specific hazards at the scene (overhead power lines, chemicals, confined spaces), the access route for emergency vehicles, and a contact phone number for a person who will meet and guide the emergency crew. Have this information pre-prepared in the rescue plan &mdash; in an emergency, clear thinking is difficult.
                </p>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Communication Equipment Checks</p>
                </div>
                <p className="text-sm text-white/80">
                  Communication equipment must be tested before each work session. Confirm mobile phone signal at the working location and at platform height. Charge two-way radio batteries fully. Test whistle audibility from the platform to the ground-level buddy. If any communication method is found to be unreliable, implement an alternative before work begins. A communication failure during an emergency can turn a survivable incident into a fatality.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: First Aid at Height */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            First Aid at Height
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Providing first aid to someone on a tower platform presents unique challenges. Space is limited, equipment access is restricted, and the height itself adds risk to both the casualty and the first aider. Deciding when to treat in situ versus when to lower the casualty to the ground is a critical judgement.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Stethoscope className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">First-Aid Considerations on a Tower Platform</p>
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">Space limitations:</strong> Tower platforms are typically 0.85m &times; 1.8m or 1.35m &times; 1.8m — barely enough room for one person to lie down, let alone for a first aider to work alongside them. Treatment options are limited by the confined space.</p>
                  <p><strong className="text-white">Equipment access:</strong> The first-aid kit should be accessible from the platform. If it is at ground level, someone must climb up with it. Consider keeping a compact first-aid kit on the platform for immediate response.</p>
                  <p><strong className="text-white">AED access:</strong> If the casualty has suffered a cardiac arrest, an automated external defibrillator (AED) must be brought to the platform. AED location and access route should be identified in the rescue plan.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Treat in Situ When:</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>The casualty has a suspected spinal injury &mdash; do not move</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Bleeding can be controlled with direct pressure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>The casualty is conscious and being lowered would increase risk</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Professional rescue is imminent and can manage the lowering</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Lower to Ground When:</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>CPR is needed and cannot be effectively performed on the platform</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>The casualty is unconscious and at risk of further injury on the platform</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>More effective treatment is available at ground level</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Emergency services need ground-level access for treatment</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Spinal Injury Considerations</p>
                </div>
                <p className="text-sm text-white/80">
                  If a fall or impact has occurred, always suspect spinal injury until proven otherwise. Do not move the casualty unless there is an immediate threat to life (fire, further collapse). Keep the casualty still, support the head and neck in a neutral position, and wait for paramedics with spinal immobilisation equipment. Incorrect handling of a spinal injury can cause permanent paralysis.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Bleeding Control at Height</p>
                <p className="text-sm text-white/80">
                  Serious bleeding from a fall or impact with tower components requires immediate action. Apply direct pressure with a clean pad or trauma dressing. If blood soaks through, add another pad on top &mdash; do not remove the first one. Elevate the injured limb if possible. For catastrophic bleeding from limbs, a tourniquet may be necessary if direct pressure cannot control the bleed. First aiders should be trained in the use of haemostatic dressings and tourniquets where these are provided in the first-aid kit.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Keep the Casualty Informed</p>
                <p className="text-sm text-white/80">
                  Even if the casualty appears unconscious, speak to them calmly and explain what is happening. Tell them help is on the way, that you are with them, and what you are doing. Reassurance reduces anxiety and may help prevent shock from worsening. If the casualty is conscious, keep them talking &mdash; this helps you monitor their level of consciousness and provides comfort during a frightening situation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Training & Practice */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Training &amp; Practice
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A rescue plan that has never been practised is a plan that will fail when it matters most. Under stress, people revert to their training &mdash; if there has been no training, there is nothing to revert to. Regular rescue drills are not optional extras; they are an essential part of a safe system of work at height.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">Rescue Drill Requirements</p>
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">Frequency:</strong> As a minimum, rescue drills should be conducted annually. For high-risk work or when team composition changes, drill more frequently. New team members should participate in a drill before beginning work at height.</p>
                  <p><strong className="text-white">Simulated scenarios:</strong> Vary the scenario each time — unconscious casualty, casualty with a leg injury, casualty suspended off the platform, communication equipment failure. This tests the team&rsquo;s ability to adapt, not just follow a memorised script.</p>
                  <p><strong className="text-white">Timed exercises:</strong> Record how long the rescue takes from alarm to casualty at ground level. Compare against the suspension trauma timeline. If the rescue takes longer than 10 minutes, the plan needs improvement.</p>
                  <p><strong className="text-white">Debriefing:</strong> After every drill, hold a structured debrief. What went well? What went badly? What needs to change? Update the rescue plan based on the findings.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Common Problems Found in Drills</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Rescue equipment stored in a locked room with no key</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Team members unsure of their roles or the sequence</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Communication equipment not working or uncharged</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Rescue took longer than 15 minutes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>No one knew the address to give to 999</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Involving Emergency Services</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Invite the local fire service to observe drills</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>They can advise on access and rescue techniques</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Pre-visit familiarisation helps response times</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Agree protocols for how they will approach the site</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Share the rescue plan with them in advance</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Updating the Plan After Practice</p>
                <p className="text-sm text-white/80">
                  Every drill should result in at least one improvement to the rescue plan. If a drill reveals no issues, the scenario was probably not challenging enough. Record the drill date, participants, scenario, observations, and actions taken to improve the plan. These records demonstrate competence and due diligence if ever questioned by an enforcing authority.
                </p>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-2">Psychological Preparedness</p>
                <p className="text-sm text-white/80">
                  Rescue is not just a physical skill &mdash; it is a psychological one. In a real emergency, people experience stress, fear, tunnel vision, and impaired decision-making. Drill practice builds not just physical competence but psychological resilience. People who have practised a rescue scenario respond more calmly, think more clearly, and act more decisively when the real thing happens. This is why the military, emergency services, and aviation industry all practise emergency procedures repeatedly &mdash; and why the construction industry should do the same.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Post-Incident Support</p>
                <p className="text-sm text-white/80">
                  After a rescue or serious incident, the people involved &mdash; the casualty, the rescuers, and witnesses &mdash; may experience significant psychological effects including flashbacks, anxiety, difficulty sleeping, and reluctance to return to height work. Employers have a duty to provide appropriate support, which may include access to counselling, time off, gradual return to duties, and a supportive debrief. Ignoring the psychological impact of a workplace emergency is neither responsible nor effective. People need support to recover and return to work safely.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Documenting Rescue Readiness</p>
                <p className="text-sm text-white/80">
                  Maintain records of: the current rescue plan for each work location, all rescue drills conducted (date, participants, scenario, outcome, actions), the training and competence records of rescue team members, equipment inspection dates and condition, and any amendments made to the plan following drills or incidents. These records serve two purposes: they ensure the plan stays current and effective, and they provide evidence of competence if the plan is ever tested by a real emergency or examined by an enforcing authority. A well-documented rescue programme demonstrates professional commitment to worker safety.
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
            <Link to="../pasma-module-6-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Risk Assessment
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pasma-module-6-section-4">
              Next: Physical Fitness
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}