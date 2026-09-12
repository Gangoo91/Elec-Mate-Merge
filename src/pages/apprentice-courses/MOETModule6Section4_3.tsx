/**
 * MOET · Module 6 · Section 4 · Subsection 3 — Liaising with Non-Technical Staff
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs covered: no verified ST1426 KSB statement list for Module 6 was
 * available at conversion time (Modules 1–4 have verified lists; Module 6
 * does not). Rather than invent statements or borrow another module's list,
 * this header omits specific KSB quotes. Flagged for follow-up once a
 * verified Module 6 KSB list exists.
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  Bleed,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Liaising with Non-Technical Staff - MOET Module 6 Section 4.3';
const DESCRIPTION =
  'Communicating with building occupants, facilities managers, clients, and non-technical colleagues. Translating technical information, managing expectations, and maintaining professional relationships.';

const quickCheckQuestions = [
  {
    id: 'non-tech-language',
    question:
      'When explaining a power outage to a building manager, the most effective approach is to:',
    options: [
      'In plain language: what will happen, when, for how long, and which areas are affected',
      'The full technical detail, with circuit references and device ratings, as a complete record',
      'Only that there is a fault and that you will sort it out, without giving any timescale',
      'Refer them to your supervisor for any information, as the detail is not yours to share',
    ],
    correctIndex: 0,
    explanation:
      "Non-technical staff need to understand the impact on their operations, not the technical details. Focus on: what will be affected, when, for how long, and what they need to do. Use plain language — 'the power will be off in the east wing from 10am to 2pm' is more useful than 'we need to isolate the 400 A incomer on DB-E1 for busbar testing'.",
  },
  {
    id: 'managing-expectations',
    question:
      'A building tenant asks when their air conditioning will be fixed. You are not sure of the timescale. The best response is:',
    options: [
      'Give them a firm completion time so they stop asking, even though you are unsure',
      'Tell them you have no idea and it could take days, to lower their expectations',
      'Avoid committing to anything and suggest they raise it with the building manager',
      'Be honest: explain the fault simply, give a realistic estimate, or confirm later',
    ],
    correctIndex: 3,
    explanation:
      "Never promise what you cannot deliver. Honesty builds trust; false promises destroy it. If you are unsure of the timescale, say so: 'I have identified the fault. I need to order a part and confirm the delivery time. I will update you by 3pm today with a confirmed timescale.' Then make sure you follow through.",
  },
  {
    id: 'safety-communication',
    question:
      'You need to communicate a safety restriction to office staff who want to access a corridor near your work area. How should you approach this?',
    options: [
      'Simply put up a barrier without explanation, as staff need not know the technical reason',
      'Tell them the corridor is closed and that they must find their own way around it',
      'Explain the hazard simply, give an alternative route, and say when access returns',
      'Allow access if they are in a hurry, provided they keep clear of your work area',
    ],
    correctIndex: 2,
    explanation:
      "Non-technical staff are more likely to comply with safety restrictions when they understand why. Explain the hazard simply ('there are live electrical cables exposed'), describe the safety measures ('we have barriers and warning signs in place'), offer an alternative ('you can use the north corridor'), and give a timescale ('we expect to finish by 4pm').",
  },
  {
    id: 'complaint-handling',
    question:
      'A tenant complains angrily about repeated electrical faults in their office. The most professional response is to:',
    options: [
      'Listen, acknowledge their frustration, note the detail, and escalate — staying calm',
      'Defend the maintenance team and explain why the faults are not really your fault',
      'Tell them firmly that complaints should go through the building manager, not to you',
      'Promise the fault will never happen again to reassure them and end the conversation',
    ],
    correctIndex: 0,
    explanation:
      'Active listening and acknowledgement defuse frustration. Take their concern seriously, note the details, explain what action you will take, and follow through. Even if the complaint is not within your control to resolve, showing that you care and will escalate it appropriately maintains professional relationships.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "When explaining maintenance work to non-technical staff, 'jargon-free' communication means:",
    options: [
      'Avoiding all detail and giving only a one-word answer, so as not to confuse the listener',
      'Plain, everyday language for the work, impact and timescale, replacing technical terms',
      'Using the correct technical terms, but speaking slowly so they can follow along',
      'Writing the explanation down rather than speaking it, to avoid being misunderstood',
    ],
    correctAnswer: 1,
    explanation:
      "Jargon-free communication respects the audience. Non-technical staff are intelligent professionals in their own fields — they simply do not share your electrical vocabulary. Replace 'RCD tripping on 30 mA earth leakage' with 'a safety device is switching off the power because it has detected a fault. We need to find and fix the fault before we can restore power safely.'",
  },
  {
    id: 2,
    question:
      "A facilities manager asks you to 'just turn it back on' after you have isolated a faulty circuit. You should:",
    options: [
      'Turn it back on, since the facilities manager outranks you and takes responsibility',
      'Turn it on briefly to show willing, then isolate it again straight away afterwards',
      'Explain calmly why it was isolated, the risk, and what must happen before re-energising',
      'Refuse without any explanation and tell them to take it up with your supervisor',
    ],
    correctAnswer: 2,
    explanation:
      "Safety decisions must never be compromised by pressure from non-technical staff. Explain the situation: 'This circuit has been isolated because there is a fault that could cause a fire/electric shock. I cannot safely re-energise it until the fault is repaired. I understand this is inconvenient and I am working to resolve it as quickly as possible.'",
  },
  {
    id: 3,
    question:
      'Before starting noisy or disruptive maintenance work in an occupied building, you should:',
    options: [
      'Start as early as possible without warning, so the work finishes before most arrive',
      'Carry on quietly and apologise to anyone who happens to complain during the work',
      'Wait until the occupants notice the disruption, then explain what you are doing',
      'Notify occupants in advance: the work, timing, duration, disruption and a contact',
    ],
    correctAnswer: 3,
    explanation:
      'Advance notification shows professionalism and respect. People tolerate disruption much better when they know it is coming, how long it will last, and that it serves a necessary purpose. This is standard practice in occupied buildings and often a contractual requirement.',
  },
  {
    id: 4,
    question:
      "When a non-technical client asks 'is my building safe?', the appropriate response is to:",
    options: [
      'An honest, measured response from your findings, with issues and actions in plain terms',
      'Reassure them everything is completely safe, to avoid alarming them unnecessarily',
      'Avoid answering and tell them to wait for the formal written report instead',
      'List every minor observation in full technical detail so they can judge for themselves',
    ],
    correctAnswer: 0,
    explanation:
      "Honesty is essential but must be delivered with context. If there are issues, explain them in terms the client can understand, describe the severity, and outline the actions being taken. 'The electrical installation is generally in good condition. We have found one issue that needs attention — a safety device in the main panel needs replacing. I have isolated the affected circuit as a precaution and we can replace the device this week.'",
  },
  {
    id: 5,
    question:
      "A receptionist reports 'the lights are flickering'. To gather useful diagnostic information, you should ask:",
    options: [
      'Nothing — go straight to the distribution board and start testing without asking',
      'Which lights, when it started, constant or intermittent, timing, and any other issues',
      'Only whether the lights are LED or fluorescent, since that is all that matters here',
      'Whether they would prefer the lights left off until the fault is fully diagnosed',
    ],
    correctAnswer: 1,
    explanation:
      'Non-technical staff are your first line of fault detection. Their observations are valuable but need guided extraction. Asking structured questions helps you build a picture of the fault before you arrive: location, duration, pattern, and associated symptoms. This saves diagnostic time and shows you take their report seriously.',
  },
  {
    id: 6,
    question: 'Written communication to building occupants about planned maintenance should:',
    options: [
      'Include the full method statement and risk assessment so occupants have all the detail',
      'Be as short as possible, giving only the date so that occupants are not overloaded',
      'Be concise and impact-focused: what, when, how long, areas affected, and what to do',
      'Use technical terms throughout so the notice appears authoritative and professional',
    ],
    correctAnswer: 2,
    explanation:
      'Occupant communications should answer the five key questions: What is happening? When? How long? What is affected? What do I need to do? Keep it to one page or less. Use a clear heading, bullet points, and a contact name for queries. A well-written notice reduces the number of individual queries you have to answer.',
  },
  {
    id: 7,
    question: 'When working in an occupied office, you should:',
    options: [
      'Work as quickly as possible and ignore the occupants so the job is finished sooner',
      'Ask the occupants to leave the area entirely until the work has been completed',
      'Spread your tools and materials out widely so that everything is within easy reach',
      'Minimise disruption, keep the area tidy, explain if asked, and stay courteous',
    ],
    correctAnswer: 3,
    explanation:
      'You are a guest in their workplace. Professional behaviour in occupied spaces includes: minimising noise and dust, keeping your work area contained and tidy, covering surfaces where needed, explaining your work briefly if asked, and being courteous. Your behaviour reflects on your employer and the maintenance team.',
  },
  {
    id: 8,
    question:
      "A building manager asks for a written summary of today's maintenance work. You should:",
    options: [
      'A brief plain-language summary: done, found, repaired, outstanding and follow-ups',
      'Hand over the raw CMMS print-out with all circuit references and codes left intact',
      'Tell them the work is now finished and that a written summary is not necessary',
      'Provide only a verbal account, as a written summary takes far too long to produce',
    ],
    correctAnswer: 0,
    explanation:
      'Building managers need maintenance information translated into operational language. A summary for a building manager should focus on: systems affected, current status (working/not working), any ongoing risks, outstanding actions, and timescales. Avoid CMMS codes, circuit references, and technical specifications unless specifically requested.',
  },
  {
    id: 9,
    question:
      'When a non-technical person makes a suggestion about an electrical fault, you should:',
    options: [
      'Dismiss it politely, since they cannot understand the electrical cause anyway',
      'Listen respectfully — they may have seen something useful — then give your assessment',
      'Act on their suggestion immediately, since they know the building better than you',
      'Ignore it and continue your own diagnosis without acknowledging the suggestion',
    ],
    correctAnswer: 1,
    explanation:
      "Non-technical staff observe their environment every day. Their observations ('the lights always flicker when the kettle is on') can provide valuable diagnostic clues. Listen respectfully, consider whether their observation is useful, and explain your professional assessment. This builds mutual respect and encourages future fault reporting.",
  },
  {
    id: 10,
    question: 'If you cannot meet a promised deadline for completing work, you should:',
    options: [
      'Rush the remaining work, including safety-critical steps, to meet the original deadline',
      'Say nothing and simply hope the delay goes unnoticed by the building occupants',
      'Tell affected parties early, explain the reason, give a revised estimate and apologise',
      'Wait until the deadline has passed before mentioning that the work is not finished',
    ],
    correctAnswer: 2,
    explanation:
      'Early communication about delays maintains trust. People plan around your timescales — late notification causes more disruption than the delay itself. Provide: the reason (briefly), the revised timescale, and any interim measures. Never rush safety-critical work to meet a deadline.',
  },
  {
    id: 11,
    question: 'Under ST1426, effective liaison with non-technical staff demonstrates:',
    options: [
      'That a technician can complete jobs without ever speaking to building occupants',
      'A purely technical skill that has no real bearing on the end-point assessment',
      'The ability to give occupants the full technical detail of every fault encountered',
      'Professional behaviour and customer service, representing the function while keeping safe',
    ],
    correctAnswer: 3,
    explanation:
      'ST1426 assesses professional behaviours including customer interaction, communication skills, and the ability to represent your organisation. Effective liaison with non-technical staff demonstrates all of these — plus the critical ability to maintain safety standards while being responsive to operational needs.',
  },
];

const faqs = [
  {
    question: 'How do I explain a technical issue to someone with no electrical knowledge?',
    answer:
      "Use analogies and focus on impact. Instead of 'the RCD is tripping due to earth leakage on the ring final circuit', try 'a safety device is detecting a fault and switching off the power to protect people. Think of it like a smoke detector for electricity — it has detected something wrong and is doing its job. We need to find the fault before we can restore power safely.' Focus on what they need to know: what is affected, how long it will take, and what to do in the meantime.",
  },
  {
    question: 'What if a tenant insists I do something I know is unsafe?',
    answer:
      'Be polite but firm. Explain the safety risk in terms they can understand and explain that you have a legal obligation not to carry out unsafe work. Offer an alternative where possible. If they persist, escalate to your supervisor and document the conversation. Never compromise safety to please a client — the law protects you in this situation under HASAWA 1974 Section 7.',
  },
  {
    question: 'How do I handle multiple people asking me questions while I am trying to work?',
    answer:
      'Be polite but set boundaries. Acknowledge each person, give a brief answer or explain that you need to concentrate on the task in hand, and suggest they contact the building manager or helpdesk for updates. If interruptions become a safety issue (e.g., while working on live detection or testing), explain that you need to focus for safety reasons and will be available to answer questions shortly.',
  },
  {
    question: 'Should I give non-technical staff technical details about faults?',
    answer:
      'Provide enough information for them to understand the impact on their operations, but do not overwhelm them with technical detail. A facilities manager may want more detail than a receptionist. Match the level of detail to the person and the situation. When in doubt, explain the impact (what is affected and for how long) rather than the cause (which circuit, what component).',
  },
  {
    question:
      'How do I communicate with people who are frustrated or angry about a maintenance issue?',
    answer:
      "Listen first. Acknowledge their frustration without being defensive. Use phrases like 'I understand this is disruptive' and 'I appreciate your patience.' Then focus on the solution: what you are doing, when it will be resolved, and what to do in the meantime. Avoid blame or excuses. If the person is abusive, remain calm and professional, and escalate to your supervisor.",
  },
];

const MOETModule6Section4_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 6 · Section 6.4 · Subsection 3"
        title="Liaising with Non-Technical Staff"
        backTo="/study-centre/apprentice/m-o-e-t-module6-section4"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Communicating effectively with building occupants, facilities managers, and clients
          </p>

          <TLDR
            points={[
              'Audience: Building managers, tenants, receptionists, clients',
              'Language: Plain English — no jargon, focus on impact',
              'Key skill: Translating technical information into operational terms',
              'Professionalism: Courteous, honest, and responsive',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Translate technical electrical information into plain language for non-technical audiences',
              'Manage expectations regarding timescales, disruption, and outcomes',
              'Communicate safety restrictions clearly and gain compliance from building occupants',
              'Handle complaints and difficult conversations with professionalism',
              'Write effective notices and updates for building occupants and clients',
              'Represent your organisation positively in all interactions with non-technical staff',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Maintenance Context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Notifications:</strong> Advance warning of planned disruption
              </li>
              <li>
                <strong>Safety communication:</strong> Explaining restrictions and hazards
              </li>
              <li>
                <strong>Expectation management:</strong> Honest timescales and follow-up
              </li>
              <li>
                <strong>ST1426:</strong> Maps to customer service and behaviour KSBs
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Understanding your audience</ContentEyebrow>

          <ConceptBlock title="Understanding Your Audience">
            <p>
              As a maintenance technician, you will regularly interact with people who have no
              electrical training. Building managers, office workers, receptionists, security
              guards, cleaners, tenants, and clients all need to understand aspects of your work —
              but they do not share your technical vocabulary. Your ability to bridge this gap is a
              core professional skill.
            </p>
            <p>
              The key principle is simple: communicate the impact, not the cause. A building manager
              does not need to know that a 63 A MCCB has tripped on overload — they need to know
              that power to the east wing is off, that you are investigating, and that you expect to
              restore it within two hours. The technical detail matters to you and your supervisor;
              the operational impact matters to everyone else.
            </p>
            <div className="my-6 rounded-lg bg-white/5 p-4">
              <p className="mb-2 text-sm font-medium text-elec-yellow/80">
                Common Non-Technical Contacts
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-2 pr-4 font-medium text-elec-yellow/80">Contact</th>
                      <th className="py-2 pr-4 font-medium text-elec-yellow/80">What They Need</th>
                      <th className="py-2 font-medium text-elec-yellow/80">Communication Style</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 font-medium">Facilities manager</td>
                      <td className="py-2 pr-4">Operational status, timescales, costs</td>
                      <td className="py-2">Semi-technical, detail-oriented</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 font-medium">Building tenant</td>
                      <td className="py-2 pr-4">When their space will be affected or restored</td>
                      <td className="py-2">Plain language, empathetic</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 font-medium">Receptionist / security</td>
                      <td className="py-2 pr-4">What to tell people who ask, safety info</td>
                      <td className="py-2">Brief, clear, actionable</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 font-medium">Client / building owner</td>
                      <td className="py-2 pr-4">Overall condition, compliance, costs</td>
                      <td className="py-2">Professional, summary-level</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-medium">Cleaning / catering staff</td>
                      <td className="py-2 pr-4">Access restrictions, safety precautions</td>
                      <td className="py-2">Simple, direct, visual where possible</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Translating technical information</ContentEyebrow>

          <ConceptBlock title="Translating Technical Information">
            <p>
              Translating technical information does not mean dumbing it down — it means reframing
              it so the listener can make informed decisions relevant to their role. A facilities
              manager making decisions about building operations needs different information from a
              design engineer diagnosing a fault.
            </p>
            <div className="my-6 rounded-lg bg-white/5 p-4">
              <h3 className="mb-2 text-sm font-medium text-elec-yellow/80">Translation Examples</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-2 pr-4 font-medium text-elec-yellow/80">
                        Technical Version
                      </th>
                      <th className="py-2 font-medium text-elec-yellow/80">
                        Plain Language Version
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        &quot;The RCD is tripping on 30 mA earth leakage from the ring final
                        circuit&quot;
                      </td>
                      <td className="py-2">
                        &quot;A safety device is detecting a fault and switching off the power. We
                        need to find and fix the fault before we can restore power safely&quot;
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        &quot;The busbar trunking requires thermographic survey&quot;
                      </td>
                      <td className="py-2">
                        &quot;We need to check the main power cables for overheating using a thermal
                        camera. This is a routine safety check&quot;
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        &quot;The Zs readings exceed Table 41.3 maximum values&quot;
                      </td>
                      <td className="py-2">
                        &quot;The safety testing has shown that the protection for this circuit may
                        not operate quickly enough in a fault. We need to investigate and correct
                        this before the circuit can be used&quot;
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">&quot;C1 observation — danger present&quot;</td>
                      <td className="py-2">
                        &quot;We have found a serious electrical fault that poses an immediate risk.
                        The affected area has been made safe and isolated. A repair is needed
                        urgently&quot;
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </ConceptBlock>

          <ConceptBlock title="The Five Questions Technique">
            <p>
              When communicating with non-technical staff, answer their five unspoken questions: (1)
              What is wrong? (2) Am I safe? (3) What are you doing about it? (4) How long will it
              take? (5) What do I need to do? If you address all five, most people will be satisfied
              and cooperative.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Managing expectations and disruption</ContentEyebrow>

          <ConceptBlock title="Managing Expectations and Disruption">
            <p>
              Maintenance work inevitably causes disruption. The key to maintaining good
              relationships with building occupants is managing their expectations honestly. People
              tolerate inconvenience much better when they understand why it is necessary, how long
              it will last, and what measures are being taken to minimise the impact.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Pre-Work Notification Checklist">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>What:</strong> Brief description of the work in plain language
              </li>
              <li>
                <strong>Why:</strong> Reason for the work (safety compliance, fault repair,
                improvement)
              </li>
              <li>
                <strong>When:</strong> Date and time, including start and expected finish
              </li>
              <li>
                <strong>Where:</strong> Specific areas affected — be precise
              </li>
              <li>
                <strong>Impact:</strong> What will be disrupted (power, lighting, access, noise)
              </li>
              <li>
                <strong>Mitigations:</strong> What you are doing to minimise disruption
              </li>
              <li>
                <strong>Contact:</strong> Who to contact with questions or concerns
              </li>
            </ul>
            <p>
              Timing is important. For planned shutdowns in commercial buildings, 48 hours advance
              notice is typical. For emergency work, provide as much notice as practically possible
              — even 30 minutes is better than none. Always communicate through the building manager
              or facilities team unless you have a direct relationship with tenants.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Under-Promise, Over-Deliver">
            <p>
              If a repair might take 2-4 hours, tell the occupants 4 hours. If you finish early,
              they are pleased. If you said 2 hours and it takes 4, they are frustrated. Realistic
              timescales build trust; optimistic ones destroy it. Never promise a timescale you are
              not confident you can meet.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Handling complaints and difficult conversations</ContentEyebrow>

          <ConceptBlock title="Handling Complaints and Difficult Conversations">
            <p>
              Complaints and difficult conversations are a normal part of working in occupied
              buildings. Equipment failures cause genuine inconvenience, and people have a right to
              be frustrated. How you handle these situations reflects on you, your team, and your
              organisation.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The LAST Framework for Complaint Handling">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>L — Listen:</strong> Let the person speak without interruption. Show you are
                listening through body language and verbal acknowledgement
              </li>
              <li>
                <strong>A — Acknowledge:</strong> Validate their frustration: &quot;I understand
                this is causing problems for your team. I appreciate your patience&quot;
              </li>
              <li>
                <strong>S — Solve:</strong> Explain what you can do: &quot;I am going to investigate
                the cause now. I expect to have an update for you within the hour&quot;
              </li>
              <li>
                <strong>T — Thank:</strong> Thank them for reporting the issue: &quot;Thank you for
                letting us know. Early reports help us fix problems faster&quot;
              </li>
            </ul>
            <p>
              Never become defensive, blame others, or argue with a complaint. Even if the complaint
              seems unreasonable, the person&apos;s frustration is real. Your job is to acknowledge
              their experience, explain what you can do, and follow through. If a complaint is
              beyond your ability to resolve, explain that you will escalate it to your supervisor
              and make sure you actually do.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Difficult Situations">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Refusing unsafe requests:</strong> &quot;I understand you need this done
                quickly, but I cannot safely re-energise this circuit until the fault is repaired.
                Doing so could cause a fire. I am working as fast as safely possible.&quot;
              </li>
              <li>
                <strong>Repeated faults:</strong> &quot;I understand this is frustrating. I have
                recorded the pattern and will be raising it with our engineering team to find a
                permanent solution, rather than just fixing the same fault again.&quot;
              </li>
              <li>
                <strong>Access denied:</strong> &quot;I appreciate this is inconvenient timing.
                However, this maintenance is required by law and the inspection is due. Could we
                agree a time this week that works for both of us?&quot;
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Professional conduct in occupied spaces</ContentEyebrow>

          <ConceptBlock title="Professional Conduct in Occupied Spaces">
            <p>
              Working in occupied buildings requires a level of professionalism that goes beyond
              technical competence. You are representing your employer and the maintenance
              profession in someone else&apos;s workplace. First impressions matter, and repeated
              interactions build (or erode) the reputation of the entire maintenance team.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Professional Conduct Checklist">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Appearance:</strong> Clean PPE, identification badge visible, professional
                appearance
              </li>
              <li>
                <strong>Arrival:</strong> Report to reception or building management on arrival
              </li>
              <li>
                <strong>Work area:</strong> Keep contained, use dust sheets, minimise mess
              </li>
              <li>
                <strong>Noise:</strong> Schedule noisy work for least-disruptive times where
                possible
              </li>
              <li>
                <strong>Communication:</strong> Greet people, explain what you are doing if asked
              </li>
              <li>
                <strong>Departure:</strong> Leave the work area clean, remove all debris, sign out
              </li>
              <li>
                <strong>Follow-up:</strong> Honour any commitments you made regarding updates or
                completion
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="ST1426 Professional Behaviour">
            <p>
              The ST1426 standard explicitly assesses professional behaviours in the end-point
              assessment. This includes: personal presentation, customer interaction,
              responsibility, working with others, and representing the organisation. How you
              interact with non-technical staff is directly assessed — it is not a soft skill that
              can be overlooked.
            </p>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="Explaining a shutdown to the production manager"

            situation={
              <>
                <p>
                  You have found a badly overheated connection in a distribution board feeding a
                  production line. It needs isolating and repairing now. The production manager
                  wants to finish a run first, and asks how long it can wait.
                </p>

                <p>
                  They are not an electrician and have a genuine commercial pressure they are
                  accountable for.
                </p>
              </>
            }

            whatToDo={
              <>
                <p>
                  Lead with the consequence, not the mechanism. "This connection is hot enough to be
                  degrading its own insulation, and if it fails it will do so as an arcing fault
                  inside a live board" lands where "the ΔT is 60 °C over ambient" does not.
                </p>

                <p>
                  Give a straight answer on time. Say what the repair involves and how long the line
                  will be down — a specific number is what lets them make a decision, and refusing
                  to give one makes you look evasive rather than careful.
                </p>

                <p>
                  Be clear about what is and is not your call. You are telling them the condition of
                  the equipment and what you are prepared to leave energised; the production
                  decision is theirs, within that.
                </p>

                <p>
                  Put the same thing in writing straight afterwards, briefly. A verbal warning about
                  an electrical risk that later causes an incident is worth very little to anyone,
                  including you.
                </p>
              </>
            }

            whyItMatters={
              <p>
                Technical people often mistake explaining for justifying, and answer a commercial
                question with a technical one. The manager does not need to understand thermography;
                they need to know what happens if they wait, how long the alternative takes, and who
                decides. Being able to move between those registers is a genuine skill, and it is
                assessed in the professional discussion — being right is not the same as being
                understood.
              </p>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Communicate the impact, not the cause: what is affected, when, for how long, and what to do.',
              'The Five Questions Technique: what is wrong, am I safe, what are you doing about it, how long will it take, what do I need to do.',
              'Pre-work notifications cover what, why, when, where, impact, mitigations and contact.',
              'Under-promise, over-deliver: realistic timescales build trust; optimistic ones destroy it.',
              'The LAST framework for complaints: Listen, Acknowledge, Solve, Thank.',
              'Professional conduct in occupied spaces covers appearance, arrival, work area, noise, communication, departure and follow-up.',
              'ST1426 explicitly assesses professional behaviour: personal presentation, customer interaction, responsibility, working with others, and representing the organisation.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module6-section4-2')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Communicating with Supervisors and Engineers
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module6-section4-4')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Professional Behaviour and Teamwork
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule6Section4_3;
