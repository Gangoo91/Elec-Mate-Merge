import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Role of First Responders on Site - MOET Module 1 Section 6.5";
const DESCRIPTION = "Comprehensive guide to the role of first responders on site for electrical maintenance technicians: appointed person requirements, first aider qualifications (FAW, EFAW), first aid needs assessment, AED locations and training, coordination with emergency services, mental health first aid and lone worker considerations.";

const quickCheckQuestions = [
  {
    id: "appointed-vs-first-aider",
    question: "What is the key difference between an appointed person and a qualified first aider?",
    options: [
      "An appointed person earns more money than a first aider",
      "An appointed person takes charge of first aid arrangements but is not trained to provide treatment; a first aider holds a qualification and can provide first aid",
      "There is no difference — the terms are interchangeable",
      "An appointed person can only work on construction sites"
    ],
    correctIndex: 1,
    explanation: "An appointed person is designated to take charge of first aid arrangements (calling 999, maintaining the first aid kit, managing the situation) but is not formally trained to provide first aid treatment. A qualified first aider holds a valid FAW (3-day) or EFAW (1-day) certificate and is trained to provide hands-on first aid treatment. Every workplace must have at least an appointed person."
  },
  {
    id: "first-aid-needs",
    question: "Which factors should be considered in a first aid needs assessment for an electrical maintenance workplace?",
    options: [
      "Only the number of employees and the size of the building",
      "The nature of hazards, number of workers, location, shift patterns, history of incidents and distance from emergency services",
      "Only whether there is a hospital within 5 miles",
      "The age profile of employees only"
    ],
    correctIndex: 1,
    explanation: "A first aid needs assessment must consider all relevant factors: the nature of the work and associated hazards (electric shock, arc flash, burns, falls), the number of workers (including contractors), the layout and location of the workplace, shift patterns and lone working, the history of accidents and incidents, and the proximity of emergency medical services."
  },
  {
    id: "aed-awareness",
    question: "Who is legally permitted to use an AED (automated external defibrillator)?",
    options: [
      "Only qualified doctors and paramedics",
      "Only trained first aiders with a current FAW certificate",
      "Anyone — AEDs are designed to be used by members of the public with no training",
      "Only persons who have completed a specific AED operator course"
    ],
    correctIndex: 2,
    explanation: "AEDs are designed to be used by anyone, including members of the public with no formal training. The device provides voice and visual prompts, analyses the heart rhythm automatically, and will only deliver a shock if a shockable rhythm is detected. While training improves confidence and speed of use, lack of training is never a reason not to use an AED in a cardiac arrest emergency."
  },
  {
    id: "lone-worker-first-aid",
    question: "What additional first aid consideration applies to lone workers carrying out electrical maintenance?",
    options: [
      "Lone workers do not need first aid provision as they are on their own",
      "They must carry a personal first aid kit and have a means of summoning emergency help (mobile phone, personal alarm, check-in system)",
      "Lone workers are exempt from first aid regulations",
      "They must always have a paramedic on standby"
    ],
    correctIndex: 1,
    explanation: "Lone workers must carry a personal first aid kit appropriate to the risks they face and have a reliable means of summoning help. This includes a charged mobile phone with signal, a personal alarm or man-down device, and a check-in/welfare monitoring system. The first aid needs assessment must specifically address lone working arrangements."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The minimum first aid provision for any workplace is:",
    options: [
      "A first aid room with a bed and washing facilities",
      "An appointed person and a suitably stocked first aid kit",
      "Two qualified first aiders on every shift",
      "A defibrillator in every room"
    ],
    correctAnswer: 1,
    explanation: "At minimum, every workplace must have an appointed person to take charge of first aid arrangements and a suitably stocked first aid kit (to BS 8599-1). The actual provision required depends on the first aid needs assessment — higher-risk workplaces will need qualified first aiders and additional equipment."
  },
  {
    id: 2,
    question: "A First Aid at Work (FAW) certificate is valid for:",
    options: [
      "1 year",
      "2 years",
      "3 years",
      "5 years"
    ],
    correctAnswer: 2,
    explanation: "FAW and EFAW certificates are valid for 3 years. First aiders must attend a requalification course before their certificate expires to maintain their qualification. If the certificate lapses, the person is no longer a qualified first aider. Annual refresher training is strongly recommended (though not mandatory) to maintain skills between requalification courses."
  },
  {
    id: 3,
    question: "The difference between FAW and EFAW qualifications is:",
    options: [
      "FAW is a 3-day course covering a full range of first aid; EFAW is a 1-day course covering life-saving skills only",
      "FAW is for construction sites only; EFAW is for offices",
      "FAW is a refresher course; EFAW is the initial qualification",
      "There is no difference — they cover the same content"
    ],
    correctAnswer: 0,
    explanation: "First Aid at Work (FAW) is a comprehensive 3-day course covering life-saving techniques, treatment of injuries and illnesses, management of unconscious casualties, and use of AEDs. Emergency First Aid at Work (EFAW) is a 1-day course covering basic life-saving skills only — CPR, treatment of choking, basic wound care, and recognition of life-threatening conditions."
  },
  {
    id: 4,
    question: "When calling 999 for an electric shock casualty on a construction site, you should ensure:",
    options: [
      "The emergency services have clear access to the site, gates are unlocked and someone meets the ambulance",
      "All work on site stops until the ambulance arrives",
      "The site manager calls instead, as they have more authority",
      "You call 111 first for advice before calling 999"
    ],
    correctAnswer: 0,
    explanation: "It is critical that emergency services can reach the casualty quickly. Ensure site gates are open/unlocked, access roads are clear of plant and vehicles, someone is sent to the site entrance to guide the ambulance to the exact location, and any overhead barriers or height restrictions are communicated. Delays in access can be fatal."
  },
  {
    id: 5,
    question: "AEDs (automated external defibrillators) should ideally be located:",
    options: [
      "In the site manager's locked office for security",
      "In clearly signed, accessible locations where they can be reached within 3-5 minutes of a cardiac arrest",
      "In the first aid room only, as they require medical supervision",
      "In the vehicle of the most senior person on site"
    ],
    correctAnswer: 1,
    explanation: "AEDs should be placed in clearly signed, accessible locations (not locked away) where they can be reached within 3-5 minutes. For every minute without defibrillation, survival from cardiac arrest drops by 7-10%. AEDs should be near high-traffic areas and areas of higher risk (workshops, switchrooms). Multiple AEDs may be needed on large sites."
  },
  {
    id: 6,
    question: "Information that should be provided to paramedics when they arrive at an electric shock incident includes:",
    options: [
      "The casualty's home address and next of kin only",
      "Voltage level, duration of contact, current pathway, whether the casualty lost consciousness, and any CPR/AED treatment given",
      "The serial number of the electrical equipment involved",
      "The name of the electrical contractor's insurance company"
    ],
    correctAnswer: 1,
    explanation: "Paramedics need clinical information to guide their treatment: the voltage level (LV/HV), estimated duration of contact, the current pathway through the body (hand-to-hand, hand-to-foot), whether consciousness was lost, details of any CPR performed (how long, compressions only or with breaths), any AED shocks delivered, and the time of the incident."
  },
  {
    id: 7,
    question: "Mental health first aid in the workplace involves:",
    options: [
      "Diagnosing mental health conditions and prescribing medication",
      "Providing initial support to someone experiencing a mental health crisis, listening non-judgementally and guiding them towards professional help",
      "Forcing someone to discuss their personal problems",
      "Only the employer's occupational health team can provide this"
    ],
    correctAnswer: 1,
    explanation: "Mental health first aiders provide initial support to colleagues experiencing mental health difficulties or crises. This includes recognising signs of distress, listening non-judgementally, providing reassurance, and guiding the person towards appropriate professional help (GP, counsellor, EAP). They do not diagnose or treat — just as physical first aiders stabilise until professional help arrives."
  },
  {
    id: 8,
    question: "For a lone worker carrying out electrical maintenance in a remote location, the first aid needs assessment should consider:",
    options: [
      "Only the standard first aid kit contents",
      "Personal first aid kit, reliable communications, welfare check-in system, personal alarm/man-down device, and emergency response times",
      "The nearest pub where they can get help",
      "Whether they have a car to drive themselves to hospital"
    ],
    correctAnswer: 1,
    explanation: "Lone workers face additional risks because there is no one nearby to help if they are injured. The assessment must consider: a personal first aid kit appropriate to the risks, reliable mobile phone signal (or alternative communications), a welfare check-in system with escalation procedures, a personal alarm or man-down device, and realistic emergency response times for the location."
  },
  {
    id: 9,
    question: "A first aid needs assessment should be reviewed:",
    options: [
      "Only when the HSE inspects the premises",
      "Regularly, and whenever there is a significant change in the workplace, workforce or work activities",
      "Every 10 years as part of a general review",
      "Only if someone complains about the first aid provision"
    ],
    correctAnswer: 1,
    explanation: "The first aid needs assessment must be reviewed regularly (typically annually) and whenever there is a significant change — new work activities, changes in the number of employees, new hazards, changes in the building layout, new shift patterns, or after a first aid incident that revealed inadequacies. It is a living document, not a one-off exercise."
  },
  {
    id: 10,
    question: "On a multi-contractor site, responsibility for first aid coordination typically lies with:",
    options: [
      "Each individual contractor for their own employees only",
      "The principal contractor or site operator, who coordinates first aid provision for the whole site",
      "The local authority",
      "No one — each person is responsible for themselves"
    ],
    correctAnswer: 1,
    explanation: "On multi-contractor sites (particularly construction sites under CDM 2015), the principal contractor is responsible for coordinating first aid provision, ensuring adequate coverage across the site, and communicating first aid arrangements to all contractors. Individual contractors may supplement with their own provision, but overall coordination must be managed centrally."
  },
  {
    id: 11,
    question: "If an AED is used on a casualty and it advises 'no shock', you should:",
    options: [
      "Assume the person is dead and stop all treatment",
      "Continue CPR immediately and follow the AED prompts — it will re-analyse every 2 minutes",
      "Remove the AED pads and try a different AED",
      "Turn off the AED and rely on CPR alone"
    ],
    correctAnswer: 1,
    explanation: "If the AED advises 'no shock', it means the heart rhythm is not shockable at that moment — but the casualty still needs CPR. Continue chest compressions and rescue breaths immediately. Leave the AED pads attached — the AED will re-analyse the rhythm every 2 minutes and will advise a shock if the rhythm changes to a shockable one. Do not turn off the AED."
  },
  {
    id: 12,
    question: "Under the Health and Safety (First-Aid) Regulations 1981, the employer's duty includes:",
    options: [
      "Providing first aid training to every employee",
      "Providing adequate and appropriate first aid equipment, facilities and personnel based on a needs assessment",
      "Employing a full-time doctor on every site",
      "Providing free private healthcare to all employees"
    ],
    correctAnswer: 1,
    explanation: "The Health and Safety (First-Aid) Regulations 1981 require employers to provide 'adequate and appropriate' first aid equipment, facilities and personnel. What is adequate depends on the first aid needs assessment. The regulations do not specify exact numbers of first aiders — this is determined by the assessment considering the nature of the work, the hazards, the number of workers and the location."
  }
];

const faqs = [
  {
    question: "Do I need to be a trained first aider to work as an electrical maintenance technician?",
    answer: "There is no legal requirement for every electrician to hold a first aid certificate. However, given the higher-risk nature of electrical work, it is strongly recommended that all electrical maintenance technicians hold at least an EFAW (Emergency First Aid at Work) certificate. Many employers make this mandatory. Your knowledge of CPR, AED use and electrical burn treatment could save a colleague's life. The 1-day EFAW course is a minimum — the 3-day FAW course provides more comprehensive skills."
  },
  {
    question: "How many first aiders does my workplace need?",
    answer: "The number depends on the first aid needs assessment. As a general guide from the HSE: low-risk workplaces (offices, shops) need at least one EFAW first aider per 25-50 employees; higher-risk workplaces (construction, manufacturing, electrical) need at least one FAW first aider per 5-50 employees, depending on the specific hazards. Additional provision may be needed for shift work, remote locations, and contractors. The assessment, not a formula, determines the actual requirement."
  },
  {
    question: "What is the difference between a defibrillator and an AED?",
    answer: "A defibrillator is the general term for any device that delivers an electric shock to the heart to restore normal rhythm. An AED (automated external defibrillator) is a specific type designed for use by non-medical personnel — it automatically analyses the heart rhythm and provides voice prompts. Manual defibrillators (used by paramedics and hospital staff) require the operator to interpret the ECG and decide whether to shock. In the workplace, AEDs are the standard type provided."
  },
  {
    question: "What is mental health first aid and is it a legal requirement?",
    answer: "Mental health first aid (MHFA) involves providing initial support to someone experiencing a mental health crisis or developing a mental health problem. It is not currently a specific legal requirement under the Health and Safety (First-Aid) Regulations 1981, but the HSE recognises that work-related stress, anxiety and depression are significant occupational health issues. Many employers now train mental health first aiders alongside physical first aiders as part of their duty of care. The construction and electrical industries have particularly high rates of mental health issues and suicide."
  },
  {
    question: "What should I do as a lone worker if I receive an electric shock and no one is around?",
    answer: "If you are conscious after a shock: move away from the source, call 999 immediately (or activate your personal alarm/man-down device), tell the operator your exact location and that you have had an electric shock, try to stay calm and still to minimise the risk of cardiac arrhythmia, and wait for help. This is why lone working arrangements must include reliable communications, regular welfare checks, and man-down devices that automatically alert emergency contacts if you become unresponsive. Prevention is always better — lone workers should have enhanced safe isolation procedures and never work live."
  }
];

const MOETModule1Section6_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 1.6.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Role of First Responders on Site
          </h1>
          <p className="text-white/80">
            First aid provision, qualifications, AED use and coordination with emergency services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Minimum:</strong> Appointed person + first aid kit in every workplace</li>
              <li className="pl-1"><strong>FAW:</strong> 3-day qualification, full first aid, valid 3 years</li>
              <li className="pl-1"><strong>EFAW:</strong> 1-day qualification, basic life-saving, valid 3 years</li>
              <li className="pl-1"><strong>AEDs:</strong> Accessible, signed, usable by anyone</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Higher risk:</strong> Enhanced first aid provision recommended</li>
              <li className="pl-1"><strong>Lone workers:</strong> Personal kit, comms, man-down devices</li>
              <li className="pl-1"><strong>Site access:</strong> Clear routes for ambulances to reach casualty</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to emergency response and wellbeing KSBs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Distinguish between the roles of appointed person, EFAW first aider and FAW first aider",
              "Explain the first aid needs assessment process for electrical maintenance workplaces",
              "Describe the requirements for first aid equipment, facilities and AED provision",
              "Coordinate effectively with emergency services during an electrical incident",
              "Identify additional considerations for lone workers and multi-site working",
              "Recognise the role of mental health first aid in the electrical industry"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 01: First Aid Roles and Qualifications */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            First Aid Roles and Qualifications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Health and Safety (First-Aid) Regulations 1981 require employers to provide adequate and appropriate
              first aid arrangements for their employees. The level of provision is determined by a first aid needs
              assessment and depends on the nature of the work, the hazards, the number of employees and the
              workplace location. Understanding the different first aid roles and qualifications is essential for
              every maintenance technician.
            </p>

            <div className="my-6">
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Role</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Training</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Scope</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Validity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Appointed Person</td>
                      <td className="border border-white/10 px-3 py-2">No formal qualification (awareness training recommended)</td>
                      <td className="border border-white/10 px-3 py-2">Takes charge in emergencies, calls 999, maintains first aid kit</td>
                      <td className="border border-white/10 px-3 py-2">N/A — employer designation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">EFAW First Aider</td>
                      <td className="border border-white/10 px-3 py-2">1-day course (6 hours regulated)</td>
                      <td className="border border-white/10 px-3 py-2">Basic life-saving: CPR, choking, bleeding, shock, unconsciousness</td>
                      <td className="border border-white/10 px-3 py-2">3 years</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">FAW First Aider</td>
                      <td className="border border-white/10 px-3 py-2">3-day course (18 hours regulated)</td>
                      <td className="border border-white/10 px-3 py-2">Full range: burns, fractures, eye injuries, poisoning, AED, medical emergencies</td>
                      <td className="border border-white/10 px-3 py-2">3 years</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Paediatric First Aider</td>
                      <td className="border border-white/10 px-3 py-2">2-day course (12 hours)</td>
                      <td className="border border-white/10 px-3 py-2">First aid for infants and children (schools, nurseries)</td>
                      <td className="border border-white/10 px-3 py-2">3 years</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Appointed Person Duties</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Take charge when someone is injured or ill</li>
                  <li className="pl-1">Call 999 and coordinate the emergency response</li>
                  <li className="pl-1">Look after and maintain the first aid equipment</li>
                  <li className="pl-1">Ensure the first aid kit is stocked and accessible</li>
                  <li className="pl-1">Record incidents in the accident book</li>
                  <li className="pl-1">They must NOT attempt to give first aid treatment</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">FAW First Aider Skills</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Primary survey (DR ABC) and CPR</li>
                  <li className="pl-1">AED use and defibrillation</li>
                  <li className="pl-1">Treatment of burns (thermal, electrical, chemical)</li>
                  <li className="pl-1">Management of fractures, sprains and dislocations</li>
                  <li className="pl-1">Control of bleeding (direct pressure, dressings, tourniquets)</li>
                  <li className="pl-1">Treatment of shock, poisoning, anaphylaxis</li>
                  <li className="pl-1">Eye injuries, head injuries, spinal injuries</li>
                  <li className="pl-1">Medical emergencies (heart attack, stroke, seizures, diabetes)</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Requalification and Refresher Training</p>
              <p className="text-sm text-white">
                FAW and EFAW certificates are valid for 3 years. First aiders must complete a requalification course
                before their certificate expires — they cannot simply re-register; they must attend the full course
                again. The HSE strongly recommends annual refresher training (typically a half-day) to maintain skills
                between requalification courses. Skills such as CPR deteriorate significantly within months if not
                practised. If a certificate lapses, the person is no longer a qualified first aider and cannot be
                counted in the first aid provision.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Recommendation for electricians:</strong> Given the specific risks of electrical work (shock, burns,
              arc flash), the 3-day FAW course is recommended over the 1-day EFAW. The additional training covers burns
              treatment, management of unconscious casualties and use of AEDs in much greater depth — all directly
              relevant to electrical incidents.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: First Aid Needs Assessment */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            First Aid Needs Assessment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The first aid needs assessment is the process by which an employer determines what first aid provision
              is required for their workplace. It is a legal requirement under the Health and Safety (First-Aid)
              Regulations 1981 and should be documented, reviewed regularly, and updated whenever circumstances
              change. For electrical maintenance operations, the assessment must reflect the higher-risk nature of
              the work.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Factors to Consider in the Assessment</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Nature of the work:</strong> Electrical maintenance involves risks of electric shock, arc flash burns, falls from height, manual handling injuries and cuts. These are higher-risk activities requiring enhanced first aid provision compared to office work</li>
                <li className="pl-1"><strong>Workplace hazards:</strong> Specific hazards at each site — HV equipment, confined spaces, remote locations, hazardous substances (SF6, transformer oil), working at height</li>
                <li className="pl-1"><strong>Number of employees:</strong> How many people are on site? Include contractors, visitors and members of the public who may be affected by the work</li>
                <li className="pl-1"><strong>Workforce distribution:</strong> Are workers spread across a large site, on different floors, in different buildings? First aid must be accessible from every work area</li>
                <li className="pl-1"><strong>Shift patterns:</strong> First aid provision must be maintained on all shifts, including nights and weekends. If your workforce reduces on night shifts, the first aid provision must still be adequate</li>
                <li className="pl-1"><strong>Lone workers:</strong> Special provision for those working alone — personal first aid kits, reliable communications, man-down devices, welfare check systems</li>
                <li className="pl-1"><strong>Location:</strong> Distance from the nearest hospital A&E, ambulance response times (rural sites may have 30+ minute response times), access difficulties</li>
                <li className="pl-1"><strong>Accident history:</strong> Review past accidents and near misses to identify specific first aid needs. If your site has a history of electrical burns, enhanced burns treatment provision is needed</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">First Aid Equipment and Facilities</h3>
              <p className="text-sm text-white mb-3">
                The assessment determines what equipment is needed. For electrical maintenance workplaces, this typically
                includes:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>First aid kits:</strong> BS 8599-1 compliant kits in fixed locations, plus personal kits for mobile workers. Contents should include burn dressings, eye wash and resuscitation face shields</li>
                <li className="pl-1"><strong>AED:</strong> One or more automated external defibrillators in accessible locations — essential for workplaces with electrical hazards due to the risk of cardiac arrest from electric shock</li>
                <li className="pl-1"><strong>Burns treatment:</strong> Burn gel sachets, burn dressings, cling film. Consider specialist burn kits for sites with significant arc flash risk</li>
                <li className="pl-1"><strong>Eye wash:</strong> Sterile eye wash stations or bottles — essential where there is risk of arc flash, chemical splash or debris in eyes</li>
                <li className="pl-1"><strong>First aid room:</strong> Required for larger workplaces (generally 150+ employees) or where the assessment identifies a need. Should include a couch, blankets, sink, telephone, record book</li>
                <li className="pl-1"><strong>Emergency shower:</strong> Required where hazardous substances (battery acid, transformer oil, SF6) may cause chemical burns</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">HSE Guidance on Numbers of First Aiders</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Risk Level</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Employees</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Suggested Minimum Provision</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Low risk (offices, shops)</td>
                      <td className="border border-white/10 px-3 py-2">Under 25</td>
                      <td className="border border-white/10 px-3 py-2">Appointed person + first aid kit</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Low risk</td>
                      <td className="border border-white/10 px-3 py-2">25-50</td>
                      <td className="border border-white/10 px-3 py-2">At least 1 EFAW first aider</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Higher risk (electrical, construction)</td>
                      <td className="border border-white/10 px-3 py-2">Under 5</td>
                      <td className="border border-white/10 px-3 py-2">Appointed person + first aid kit (consider EFAW)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Higher risk</td>
                      <td className="border border-white/10 px-3 py-2">5-50</td>
                      <td className="border border-white/10 px-3 py-2">At least 1 FAW first aider + additional based on assessment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Higher risk</td>
                      <td className="border border-white/10 px-3 py-2">50+</td>
                      <td className="border border-white/10 px-3 py-2">1 FAW first aider per 50 employees + additional based on assessment</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> These are guidelines, not absolute rules. The first aid needs assessment may
              determine that more (or fewer) first aiders are needed based on the specific circumstances. The assessment
              is the definitive document — not a table.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: AED Provision and Training */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            AED Provision and Training
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Automated external defibrillators (AEDs) are the single most important piece of equipment for improving
              survival from cardiac arrest — the primary cause of death from electric shock. For workplaces where
              electrical hazards are present, AED provision should be a priority. Since the Automated External
              Defibrillators (Public Access) Regulations, their use by the public has been actively encouraged.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">AED Placement Principles</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Accessibility:</strong> AEDs must be accessible 24/7, not locked away. Use wall-mounted cabinets with clear signage (green heart symbol)</li>
                <li className="pl-1"><strong>Proximity:</strong> The target is for an AED to be reachable within 3-5 minutes from any point in the workplace. For every minute without defibrillation, survival drops by 7-10%</li>
                <li className="pl-1"><strong>High-risk areas:</strong> Place AEDs near electrical switchrooms, substations, workshops, plant rooms and other areas where electric shock risk is highest</li>
                <li className="pl-1"><strong>High-traffic areas:</strong> Also place AEDs in reception areas, canteens and stairway landings where many people pass and they are likely to be seen and accessed quickly</li>
                <li className="pl-1"><strong>Multiple units:</strong> Large sites may need multiple AEDs to ensure coverage. Consider each floor of a multi-storey building, each wing of a large building, and separate outbuildings</li>
                <li className="pl-1"><strong>Signage:</strong> Standard green AED location signs visible from corridors and access routes. Include the AED location on site fire safety plans</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">AED Maintenance</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Daily visual check — green light/indicator showing ready status</li>
                  <li className="pl-1">Monthly check — battery level, pad expiry dates, cabinet condition</li>
                  <li className="pl-1">Replace pads before expiry (typically 2-5 years depending on manufacturer)</li>
                  <li className="pl-1">Replace battery according to manufacturer schedule (typically 3-5 years)</li>
                  <li className="pl-1">After use — replace pads immediately, check battery, clean unit</li>
                  <li className="pl-1">Record all checks in a maintenance log</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">AED Training</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">AEDs can be used by anyone — no formal training is legally required</li>
                  <li className="pl-1">Training significantly improves confidence and speed of use</li>
                  <li className="pl-1">AED awareness is included in both FAW and EFAW courses</li>
                  <li className="pl-1">Standalone AED courses are available (typically 2-4 hours)</li>
                  <li className="pl-1">Practice with training units improves real-world performance</li>
                  <li className="pl-1">All electrical maintenance technicians should be AED-trained</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">The Chain of Survival</p>
              <p className="text-sm text-white mb-2">
                The Resuscitation Council UK's Chain of Survival describes the critical links in surviving cardiac
                arrest. Each link must be strong for the chain to work:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Link 1 — Early recognition:</strong> Recognise cardiac arrest (unresponsive, not breathing normally) and call 999</li>
                <li className="pl-1"><strong>Link 2 — Early CPR:</strong> Start chest compressions immediately to maintain blood flow to the brain and heart</li>
                <li className="pl-1"><strong>Link 3 — Early defibrillation:</strong> Apply an AED as soon as possible to restore normal heart rhythm</li>
                <li className="pl-1"><strong>Link 4 — Early advanced care:</strong> Paramedics provide advanced life support, drugs and transport to hospital</li>
              </ul>
              <p className="text-sm text-white mt-2">
                In the workplace, you are responsible for the first three links. Having AEDs accessible and people
                trained to use them can increase survival from cardiac arrest from under 10% to over 70%.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Know the location of every AED on every site you work on. Check this during
              your site induction. In a cardiac arrest emergency, fetching the AED should happen simultaneously with
              starting CPR — send someone for the AED while you begin compressions.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Coordination with Emergency Services */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Coordination with Emergency Services
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When an electrical incident occurs, effective coordination with the emergency services can make the
              difference between life and death. The time between calling 999 and paramedics reaching the casualty
              is critical — every action you take to reduce that time and provide them with useful information
              improves the outcome.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Calling 999 — What to Say</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Service required:</strong> "Ambulance" (and "Fire" if there is an active fire)</li>
                <li className="pl-1"><strong>Location:</strong> Exact address, building name, floor, room number, what3words or grid reference for remote sites</li>
                <li className="pl-1"><strong>Nature of incident:</strong> "Electric shock" — state this clearly so the call is prioritised appropriately</li>
                <li className="pl-1"><strong>Casualty condition:</strong> Conscious/unconscious, breathing/not breathing, CPR in progress</li>
                <li className="pl-1"><strong>Voltage:</strong> "Low voltage, 230 volts" or "High voltage, 11,000 volts" — this affects the medical response</li>
                <li className="pl-1"><strong>Number of casualties:</strong> If multiple people are involved</li>
                <li className="pl-1"><strong>Access:</strong> Any access difficulties — locked gates, height barriers, one-way systems, construction site hazards</li>
                <li className="pl-1"><strong>Do not hang up:</strong> Stay on the line — the dispatcher will give you instructions</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Facilitating Site Access</h3>
              <p className="text-sm text-white mb-3">
                Delays in emergency vehicle access are a significant factor in poor outcomes. Plan for this in advance:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Gates and barriers:</strong> Ensure site gates are unlocked or someone is ready to open them. Note the location of gate keys/fobs in your site induction</li>
                <li className="pl-1"><strong>Height restrictions:</strong> Ambulances are typically 3+ metres tall. Identify any height barriers and alternative access routes</li>
                <li className="pl-1"><strong>Guide:</strong> Send someone to the site entrance to meet the ambulance and guide them directly to the casualty</li>
                <li className="pl-1"><strong>Clear route:</strong> Move vehicles, plant and materials to create a clear access route from the entrance to the casualty's location</li>
                <li className="pl-1"><strong>Stretcher access:</strong> Consider whether a stretcher can reach the casualty — narrow corridors, steep stairs, confined spaces may require rescue services</li>
                <li className="pl-1"><strong>what3words:</strong> This app provides a precise 3-metre square location that emergency services can use to navigate directly to you</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Information for Paramedics</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Voltage and supply type (AC/DC, single/three phase)</li>
                  <li className="pl-1">Estimated duration of electrical contact</li>
                  <li className="pl-1">Current pathway through the body</li>
                  <li className="pl-1">Whether the casualty lost consciousness</li>
                  <li className="pl-1">Falls or secondary injuries</li>
                  <li className="pl-1">CPR details — duration, compressions only or with breaths</li>
                  <li className="pl-1">AED use — number of shocks delivered, times</li>
                  <li className="pl-1">Casualty's name, age and any known medical conditions</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Post-Incident Actions</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Preserve the accident scene for investigation</li>
                  <li className="pl-1">Record everything — times, actions, observations</li>
                  <li className="pl-1">Notify your supervisor and the site manager</li>
                  <li className="pl-1">Complete accident book entry and internal report</li>
                  <li className="pl-1">Identify RIDDOR reporting requirements</li>
                  <li className="pl-1">Support for witnesses and colleagues (welfare)</li>
                  <li className="pl-1">Replace any first aid supplies used</li>
                  <li className="pl-1">Review and restock AED pads if used</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> In a serious electrical incident, multiple emergency services may be needed.
              Fire and rescue services may be required for HV incidents (they have specialist training and equipment
              for de-energisation), confined space rescue, or working at height rescue. Police may attend fatal or
              potentially fatal incidents. Coordinate all services through the 999 operator.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05: Mental Health, Lone Workers and Multi-Site Considerations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Mental Health, Lone Workers and Multi-Site Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              First aid provision extends beyond physical injuries. Mental health first aid, lone worker safety and
              the challenges of multi-site working all require specific consideration in the first aid needs assessment.
              The electrical and construction industries have some of the highest rates of mental health issues and
              suicide in the UK workforce — making mental health awareness a critical competence for all workers.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Mental Health First Aid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Prevalence:</strong> Mental health problems affect approximately 1 in 4 people in any given year. The construction and engineering sectors have disproportionately high rates of stress, anxiety, depression and suicide</li>
                <li className="pl-1"><strong>Risk factors in electrical maintenance:</strong> Long hours, time away from home, job insecurity, pressure to meet deadlines, physical demands, working in isolation, exposure to traumatic incidents</li>
                <li className="pl-1"><strong>Mental health first aiders:</strong> Trained to recognise signs of mental health difficulties, listen non-judgementally, provide reassurance and signpost to professional support (GP, counsellor, Employee Assistance Programme)</li>
                <li className="pl-1"><strong>They do NOT:</strong> Diagnose conditions, provide therapy, prescribe medication or force anyone to talk. They offer initial support — similar to physical first aid</li>
                <li className="pl-1"><strong>Training:</strong> MHFA England provides accredited courses (1-day or 2-day). Mates in Mind is a charity specifically supporting mental health in the construction and related industries</li>
                <li className="pl-1"><strong>Culture change:</strong> Encouraging open conversation about mental health, reducing stigma, and creating an environment where people feel safe to ask for help</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Lone Worker First Aid Considerations</h3>
              <p className="text-sm text-white mb-3">
                Many electrical maintenance technicians work alone — attending individual call-outs, carrying out
                periodic inspections, or working on remote sites. Lone working presents specific first aid challenges
                because there is no one nearby to provide assistance or summon help.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Personal first aid kit:</strong> Carry a compact first aid kit appropriate to the risks — burns dressings, bandages, wipes, gloves, eye wash</li>
                <li className="pl-1"><strong>Mobile phone:</strong> Always charged, with signal confirmed at the work location. Pre-programme 999 and your company's emergency number</li>
                <li className="pl-1"><strong>Man-down device:</strong> Wearable devices that detect lack of movement and automatically alert the monitoring centre. Essential for high-risk lone work</li>
                <li className="pl-1"><strong>Welfare check-ins:</strong> Regular scheduled check-ins with a nominated person (supervisor, office, monitoring centre). If a check-in is missed, escalation procedures are activated</li>
                <li className="pl-1"><strong>what3words:</strong> Know your what3words address so you can communicate your precise location to emergency services even if you are in an unfamiliar location</li>
                <li className="pl-1"><strong>Risk assessment:</strong> The lone working risk assessment should identify tasks that must NOT be carried out alone — typically any live working, work at height above 2 m, and work in confined spaces</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Multi-Site Working</h3>
              <p className="text-sm text-white mb-3">
                Electrical maintenance technicians who visit multiple sites face additional challenges for first aid provision:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Site induction:</strong> At every site, identify the first aider, first aid kit location, AED location and emergency procedures. Do not assume they are the same as the last site</li>
                <li className="pl-1"><strong>Personal kit:</strong> Carry your own first aid kit in your vehicle — you cannot rely on the host site's provision, especially if you are working in remote areas of the building</li>
                <li className="pl-1"><strong>Emergency contacts:</strong> Note the site emergency contact number, the nearest hospital A&E, and the access route for emergency vehicles at every site</li>
                <li className="pl-1"><strong>Coordination:</strong> On multi-contractor sites (CDM 2015), the principal contractor coordinates first aid. Ensure you know who they are and how to contact them</li>
                <li className="pl-1"><strong>Vehicle kit:</strong> Keep a comprehensive first aid kit, burn dressings, eye wash, high-visibility vest and a torch in your vehicle at all times</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Post-Incident Welfare</h3>
              <p className="text-sm text-white">
                Witnessing a serious incident — especially an electric shock or arc flash — can have significant
                psychological effects on colleagues and first responders. Post-incident welfare support should include:
                an immediate debrief (factual, not therapeutic) within 24 hours, access to counselling services through
                the Employee Assistance Programme, formal psychological support (e.g., critical incident stress
                debriefing) if needed, follow-up contact in the days and weeks after the incident, and recognition
                that delayed reactions are normal and help should be sought if symptoms persist.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Under ST1426, the maintenance technician standard includes behaviours relating to
              personal wellbeing and supporting colleagues. Demonstrating awareness of mental health, lone worker safety
              and first aid provision contributes to your professional competence and is assessed through workplace
              evidence and professional discussion.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">First Aid Roles</p>
                <ul className="space-y-0.5">
                  <li>Appointed person — takes charge, calls 999, maintains kit</li>
                  <li>EFAW — 1-day, basic life-saving, valid 3 years</li>
                  <li>FAW — 3-day, full first aid, valid 3 years</li>
                  <li>AEDs — accessible, signed, usable by anyone</li>
                  <li>Chain of survival — recognise, CPR, AED, advanced care</li>
                  <li>Lone workers — personal kit, comms, man-down device</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key References</p>
                <ul className="space-y-0.5">
                  <li>Health and Safety (First-Aid) Regulations 1981</li>
                  <li>BS 8599-1 — First aid kit contents</li>
                  <li>Resuscitation Council UK Guidelines</li>
                  <li>MHFA England / Mates in Mind</li>
                  <li>CDM 2015 — Multi-contractor first aid coordination</li>
                  <li>ST1426 — Emergency response and wellbeing KSBs</li>
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
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section6-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Reporting Incidents
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section6">
              Back to Section Overview
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule1Section6_5;
