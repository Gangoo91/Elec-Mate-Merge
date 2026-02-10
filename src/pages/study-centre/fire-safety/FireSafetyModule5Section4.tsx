import { ArrowLeft, ArrowRight, Shield, FileSearch, Radio, Landmark, HardHat, ClipboardCheck, RefreshCw, Heart, AlertTriangle, CheckCircle, BookOpen, Timer, Zap, Flame, Scale } from "lucide-react";
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
    id: "first-priority-after-all-clear",
    question: "What is the first priority after the fire service gives the all-clear?",
    options: [
      "Begin cleaning up fire damage immediately",
      "Account for all persons and provide welfare support",
      "Contact the insurer to discuss claims",
      "Start reinstating the electrical system"
    ],
    correctIndex: 1,
    explanation:
      "The first priority after the fire service gives the all-clear is to account for all persons and provide welfare support to evacuees. This means confirming that every individual has been accounted for through a thorough roll call, providing shelter from weather, arranging first aid for any injuries, and ensuring emotional support is available. No other recovery activity should take precedence over the safety and wellbeing of people. Only once all persons are confirmed safe and welfare needs are being addressed should attention turn to scene preservation, insurer notification, and reinstatement planning."
  },
  {
    id: "fra-review-after-fire",
    question: "When must the fire risk assessment be reviewed after a fire incident?",
    options: [
      "Within 28 days of the incident",
      "At the next scheduled annual review",
      "After any fire incident — it is mandatory",
      "Only if the fire caused structural damage"
    ],
    correctIndex: 2,
    explanation:
      "Under the Regulatory Reform (Fire Safety) Order 2005 (RRFSO), the fire risk assessment must be reviewed after any fire incident — this is mandatory, not optional. A fire incident demonstrates that the existing control measures were insufficient to prevent the fire from occurring or developing, and the risk assessment must be updated to reflect the lessons learned. The review must identify what failed or was inadequate, update the hazard register, revise control measures, and produce an action plan with clear timescales for implementation. Waiting until the next scheduled annual review would be a breach of the responsible person's duties under the RRFSO."
  },
  {
    id: "insurer-notification",
    question: "Who must be notified immediately after a fire, as per policy conditions?",
    options: [
      "The local council planning department",
      "The Health and Safety Executive",
      "The insurer, as per policy conditions",
      "The building's original architect"
    ],
    correctIndex: 2,
    explanation:
      "The insurer must be notified immediately after a fire, as per the conditions of the insurance policy. Most commercial insurance policies contain a condition requiring immediate notification of any loss or damage. Failure to notify promptly can jeopardise the claim and may even void the policy. The notification should include the date, time, and location of the fire, a brief description of the damage, the emergency services involved, and any immediate actions taken. The insurer will then appoint a loss adjuster to assess the damage and manage the claim. Early notification also allows the insurer to authorise interim measures such as emergency boarding-up, temporary weatherproofing, and salvage operations."
  }
];

/* ------------------------------------------------------------------ */
/*  FAQs (4)                                                          */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: "Can we re-enter the building before the fire investigation is complete?",
    answer:
      "No. You must not re-enter the building — or the specific area affected by the fire — until the fire investigation officer has formally released the scene. The fire investigation is conducted under the authority of the fire and rescue service, and in some cases the police (if arson is suspected). Entering the scene before it is released can destroy or contaminate evidence, obstruct the investigation, and may constitute a criminal offence. The fire investigation officer will assess the scene, collect evidence, take photographs, and determine the cause and origin of the fire. Only once the officer has completed their investigation and formally released the scene can access be restored. In practice, this can take anywhere from a few hours for a minor incident to several days or even weeks for a serious fire. During this period, alternative arrangements must be made for business continuity, including temporary premises, remote working, or relocation of critical operations."
  },
  {
    question: "What electrical re-certification is required after a fire?",
    answer:
      "After a fire, the entire electrical installation in the affected area must be re-certified to BS 7671 (the IET Wiring Regulations) before the building can be re-occupied. This is not simply an inspection — it is a full re-certification process. The fire may have damaged wiring, cables, switchgear, distribution boards, protective devices, earthing and bonding conductors, fire alarm circuits, and emergency lighting circuits. Heat can degrade cable insulation even if there is no visible damage, and water from firefighting operations can cause corrosion and short circuits. A competent electrician must carry out a thorough inspection and testing of the installation, including insulation resistance tests, earth fault loop impedance tests, RCD tests, and continuity tests. Any damaged or degraded components must be replaced. The fire alarm system and emergency lighting system must also be fully reinstated and tested. An Electrical Installation Certificate (EIC) or Electrical Installation Condition Report (EICR) must be issued confirming the installation is safe before re-occupation is permitted."
  },
  {
    question: "How do we maintain business continuity during reinstatement?",
    answer:
      "Business continuity during reinstatement requires planning and coordination across several areas. The business continuity plan (BCP) should have been prepared before any incident occurs as part of the organisation's overall risk management strategy. Key measures include: activating the BCP immediately after the fire, identifying critical business functions and their recovery time objectives, arranging temporary premises or remote working facilities, recovering or replacing essential equipment and IT systems, communicating with customers, suppliers, and stakeholders about the situation and expected recovery timeline, liaising with the insurer about business interruption cover, and maintaining payroll and employee support. The insurer's loss adjuster can often assist with identifying temporary premises and authorising expenditure on interim measures. Some insurance policies include access to specialist disaster recovery firms who can provide temporary accommodation, equipment, and IT infrastructure at short notice. Throughout the reinstatement period, regular communication with all stakeholders is essential to manage expectations and maintain confidence."
  },
  {
    question: "What support should be provided to staff after a fire incident?",
    answer:
      "Employers have a legal duty of care to support staff affected by a fire incident. The psychological impact of a fire can be significant, even for those who were not physically injured. Support measures should include: immediate post-incident debriefing conducted by a trained facilitator (not a blame session, but a structured opportunity to discuss what happened and how people are feeling), access to an Employee Assistance Programme (EAP) offering confidential counselling and support, individual welfare check-ins in the days and weeks following the incident, awareness training for managers on recognising signs of post-traumatic stress (flashbacks, anxiety, sleep disturbance, difficulty concentrating, avoidance behaviour), a phased return-to-work programme for those significantly affected, reasonable adjustments to duties or working environment if needed, and long-term monitoring for up to 12 months after the incident. Some staff may develop post-traumatic stress disorder (PTSD) or other mental health conditions, and early intervention significantly improves outcomes. The cost of providing support is far less than the cost of losing experienced staff to stress-related absence or resignation."
  }
];

/* ------------------------------------------------------------------ */
/*  End-of-Section Quiz (8 questions)                                 */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      "Why is scene preservation important after a fire incident?",
    options: [
      "To allow the building owner to begin repairs immediately",
      "To protect evidence for fire investigation and potential legal proceedings",
      "To prevent the insurer from inspecting the premises",
      "To allow employees to collect personal belongings"
    ],
    correctAnswer: 1,
    explanation:
      "Scene preservation is critically important to protect evidence for fire investigation and potential legal proceedings. The fire investigation officer needs to examine the scene undisturbed to determine the cause and origin of the fire. If evidence is moved, cleaned up, or contaminated, it may be impossible to determine the cause, which can affect insurance claims, criminal prosecutions (in the case of arson), and civil liability proceedings. The scene must be cordoned off, guarded, and left undisturbed until formally released by the fire investigation officer."
  },
  {
    id: 2,
    question:
      "When must the insurer be notified after a fire?",
    options: [
      "Within 7 working days",
      "Within 28 days",
      "Immediately, as per policy conditions",
      "Only if the damage exceeds the policy excess"
    ],
    correctAnswer: 2,
    explanation:
      "The insurer must be notified immediately after a fire, as per the conditions of the insurance policy. Most commercial insurance policies contain a condition precedent requiring immediate notification of any loss or damage. Failure to notify promptly can jeopardise the claim and may even void the policy entirely. Even if the full extent of the damage is not yet known, the insurer should be notified as soon as possible with whatever information is available. The insurer will then appoint a loss adjuster and provide guidance on interim measures."
  },
  {
    id: 3,
    question:
      "What triggers a mandatory review of the fire risk assessment?",
    options: [
      "A change in the building's insurance provider",
      "Any fire incident on the premises",
      "The annual review date only",
      "A request from the local authority planning department"
    ],
    correctAnswer: 1,
    explanation:
      "Any fire incident on the premises triggers a mandatory review of the fire risk assessment under the RRFSO. The fire risk assessment must also be reviewed if there is reason to suspect it is no longer valid, if there has been a significant change in the matters to which it relates (such as a change of use, structural alterations, or a change in the number of occupants), or at regular intervals as determined by the risk level. A fire incident is definitive evidence that the existing control measures were insufficient, and the risk assessment must be updated to address the failures identified."
  },
  {
    id: 4,
    question:
      "What standard must the electrical installation be re-certified to after a fire?",
    options: [
      "BS 5839",
      "BS 7671 (IET Wiring Regulations)",
      "BS 5266",
      "BS 9999"
    ],
    correctAnswer: 1,
    explanation:
      "After a fire, the electrical installation must be re-certified to BS 7671, the IET Wiring Regulations, which is the national standard for electrical installation in the UK. This involves a thorough inspection and testing of the entire installation in the affected area, including insulation resistance testing, earth fault loop impedance testing, RCD testing, and continuity testing. BS 5839 relates to fire detection and alarm systems, BS 5266 relates to emergency lighting, and BS 9999 relates to fire safety design — all of which may also need attention, but the core electrical installation standard is BS 7671."
  },
  {
    id: 5,
    question:
      "What is the correct approach to reinstating a building after fire damage?",
    options: [
      "Begin repairs immediately to minimise downtime",
      "Conduct a structural assessment first, then plan phased reinstatement",
      "Allow tenants to re-occupy while repairs are in progress",
      "Focus solely on cosmetic repairs to restore appearance"
    ],
    correctAnswer: 1,
    explanation:
      "The correct approach is to conduct a structural assessment first, then plan a phased reinstatement. A structural engineer must assess the building to determine whether the structure has been compromised by the fire. Heat can weaken steel, spall concrete, and damage masonry. Only once the structure is confirmed safe can reinstatement work begin. The reinstatement process should be phased: structural repairs first, then smoke and water damage remediation, then building services reinstatement (electrical, mechanical, fire alarm, emergency lighting), and finally decoration and fitting-out. Each phase should be signed off before the next begins, and the building should not be re-occupied until all systems are fully operational and certified."
  },
  {
    id: 6,
    question:
      "What welfare provision should be arranged for evacuees immediately after a fire?",
    options: [
      "A formal investigation interview with each person",
      "Shelter, first aid, emotional support, and communication",
      "A written statement from each evacuee for the insurer",
      "Immediate return to normal working duties"
    ],
    correctAnswer: 1,
    explanation:
      "Immediately after a fire, evacuees need shelter from the weather (especially in cold, wet, or extreme conditions), first aid for any injuries or smoke inhalation, emotional support and reassurance, and communication — both to inform them of what is happening and to allow them to contact family members. These welfare provisions are a duty of care owed by the employer and should be part of the emergency plan. Formal investigation interviews, written statements, and return to normal duties are all premature at this stage — the immediate priority is people's physical and emotional wellbeing."
  },
  {
    id: 7,
    question:
      "What information should the responsible person provide to the fire service on arrival?",
    options: [
      "The building's commercial value and insurance details",
      "Building plans, hazardous materials locations, and key holder access",
      "A list of employees' home addresses",
      "The architect's original design specifications"
    ],
    correctAnswer: 1,
    explanation:
      "When the fire service arrives, the responsible person (or their deputy) should provide building plans showing the layout, fire compartments, and escape routes; the location of any hazardous materials stored on the premises; key holder access information for locked areas; the location of fire alarm panels, sprinkler controls, and other fire protection systems; information about any persons unaccounted for and their likely location; and any known details about the fire's origin and development. This information helps the fire service mount an effective response and reduces the risk to firefighters. A premises information box containing building plans and hazard information should ideally be installed at the main entrance for fire service use."
  },
  {
    id: 8,
    question:
      "What is meant by 'chain of custody' in relation to fire investigation evidence?",
    options: [
      "The order in which insurance claims are processed",
      "A documented record of who has handled evidence and when",
      "The sequence of fire marshals responsible for the building",
      "The order in which utility services are reconnected"
    ],
    correctAnswer: 1,
    explanation:
      "Chain of custody refers to a documented record of who has handled a piece of evidence, when they handled it, and what they did with it. In a fire investigation, physical evidence (such as electrical components, accelerant residues, or damaged materials) must be carefully collected, labelled, stored, and transported with a continuous chain of custody record. This ensures the evidence is admissible in court if criminal proceedings follow (e.g., arson charges) or in civil proceedings (e.g., liability claims). If the chain of custody is broken — for example, if evidence is left unguarded or handled by unauthorised persons — its evidential value may be challenged or dismissed entirely."
  }
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
export default function FireSafetyModule5Section4() {
  useSEO({
    title: "Post-Incident Procedures | Fire Safety Module 5.4",
    description:
      "Learn about post-incident procedures including scene preservation, fire service liaison, insurer notification, reinstatement planning, fire risk assessment review, and staff welfare support after a fire.",
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
            <Link to="../fire-safety-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
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
            <Shield className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Post-Incident Procedures
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding the procedures that follow a fire incident &mdash; from immediate welfare and scene preservation through investigation, reinstatement, and long-term recovery
          </p>
        </header>

        {/* ============================================================ */}
        {/*  QUICK SUMMARY BOXES                                          */}
        {/* ============================================================ */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Welfare first:</strong> Account for all persons, shelter, first aid</li>
              <li><strong>Scene preservation:</strong> Cordon, guard, do not disturb evidence</li>
              <li><strong>Notify insurer:</strong> Immediately, as per policy conditions</li>
              <li><strong>Review FRA:</strong> Mandatory after any fire incident</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Key Standards</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>RRFSO:</strong> Mandatory FRA review after fire</li>
              <li><strong>BS 7671:</strong> Electrical re-certification</li>
              <li><strong>BS 5839:</strong> Fire alarm reinstatement</li>
              <li><strong>BS 5266:</strong> Emergency lighting restoration</li>
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
              "Describe the immediate post-incident actions required after a fire",
              "Explain the importance of scene preservation and evidence chain of custody",
              "Outline the process for liaising with the fire service and insurers",
              "Describe the reinstatement planning process including electrical re-certification",
              "Explain the mandatory requirement to review the fire risk assessment after a fire",
              "Identify the support measures required for staff affected by a fire incident"
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
        {/*  SECTION 01: Immediate Post-Incident Actions                  */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">01</span>
              Immediate Post-Incident Actions
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The period immediately following a fire is critical. Even after the fire itself has been extinguished, there are significant hazards and urgent responsibilities that the <strong>responsible person</strong> and their team must address. The first minutes and hours after an incident set the tone for the entire recovery process and can have lasting legal, financial, and human consequences.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Scene Security &amp; Cordoning</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Once the fire service has completed firefighting operations, the scene must be secured immediately. This involves:
                </p>
                <ul className="space-y-2 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>Establishing a cordon</strong> around the affected area using barrier tape, fencing, or other physical barriers to prevent unauthorised access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>Posting guards</strong> at entry points to ensure no one enters the cordoned area without authorisation from the fire investigation officer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>Preventing re-entry</strong> to the building or affected area until the fire service has given an explicit all-clear &mdash; this is essential for safety (structural instability, toxic gases, re-ignition risk) and for evidence preservation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>Isolating utilities</strong> &mdash; ensuring gas, electricity, and water supplies are isolated where necessary to prevent secondary hazards</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Welfare of Evacuees</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  The welfare of all evacuated persons is the absolute first priority once the scene is secure:
                </p>
                <ul className="space-y-2 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>Accounting for all persons</strong> &mdash; a thorough roll call must be conducted at the assembly point, cross-referenced with signing-in records, visitor logs, and contractor registers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>Shelter from weather</strong> &mdash; in cold, wet, or extreme conditions, evacuees may need to be moved to a nearby sheltered location such as a neighbouring building, community hall, or temporary structure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>First aid</strong> &mdash; immediate medical attention for any injuries, burns, or smoke inhalation; paramedic services should be requested if not already present</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>Emotional support</strong> &mdash; a fire can be a traumatic experience; trained first aiders and managers should provide immediate reassurance and support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>Communication</strong> &mdash; evacuees need information about what has happened, what is being done, and when they can expect updates; they also need to be able to contact family members</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Communication with Emergency Services</p>
                <p className="text-sm text-white/80">
                  The responsible person or their nominated deputy must liaise directly with the senior fire officer on scene, providing critical information including: the number and location of any persons unaccounted for, the building layout and any areas of particular concern, the location of hazardous materials, and any structural concerns known before the fire. This communication should be clear, factual, and ongoing throughout the incident response phase. A single point of contact should be established to avoid conflicting information being given to different emergency service personnel.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 02: Scene Preservation                                */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">02</span>
              Scene Preservation
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Scene preservation is one of the most important post-incident responsibilities. The fire scene is, in effect, a <strong>crime scene</strong> until the cause of the fire has been determined. Even if arson is not suspected, the scene must be treated with the same rigour, because the investigation may reveal evidence of criminal activity, negligence, or regulatory breaches that were not initially apparent.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <FileSearch className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Preservation Requirements</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Cordon &amp; Guard</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The scene must be physically cordoned off and guarded at all times. Access must be restricted to authorised personnel only &mdash; the fire investigation officer, police forensic teams (if applicable), and any specialists they authorise. No employee, manager, or building owner should enter the scene without explicit authorisation from the investigating officer.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Do Not Disturb Evidence</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Nothing should be moved, cleaned, removed, or altered within the cordoned area. This includes debris, damaged equipment, electrical components, furniture, and any materials that may appear to be rubbish. What looks like insignificant debris to a layperson may be a critical piece of evidence to an investigator &mdash; for example, the remains of an electrical fitting at the point of origin, or residues of accelerant.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Photography Before Any Cleanup</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Before any cleanup, remediation, or repair work begins (after the scene is released), comprehensive photographic and video documentation should be made. This should cover every area affected by the fire, smoke, and water damage, from multiple angles. These images form part of the evidence base for insurance claims and may be required in legal proceedings. Date-stamped photographs with a scale reference are best practice.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Evidence Chain of Custody</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Any physical evidence collected from the scene must have a continuous, documented chain of custody. This means recording who collected it, when, where, how it was stored, and who has had access to it at every stage. A broken chain of custody can render evidence inadmissible in court. Evidence bags must be sealed, labelled, and stored securely. The chain of custody record accompanies the evidence throughout its lifecycle.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Duration of Scene Preservation</p>
                <p className="text-sm text-white/80">
                  The scene must remain preserved and under guard <strong>until formally released by the fire investigation officer</strong>. There is no fixed timescale &mdash; it depends on the complexity of the investigation, whether criminal activity is suspected, and the extent of the damage. For a minor incident, this may be a matter of hours. For a serious fire, particularly one involving fatalities or suspected arson, the scene may be held for days or weeks. The fire investigation officer will issue a formal scene release notice when their investigation is complete.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check after Section 02 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/*  SECTION 03: Liaising with the Fire Service                    */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">03</span>
              Liaising with the Fire Service
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Effective liaison with the fire and rescue service is essential both during and after a fire incident. The responsible person (or their nominated representative) serves as the primary point of contact, and the quality of information provided can significantly affect the outcome of the incident response and subsequent investigation.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Radio className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Information to Provide</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { label: "Building plans", desc: "Floor plans showing layout, fire compartments, escape routes, and structural features" },
                    { label: "Hazardous materials", desc: "Location and type of any hazardous substances stored on the premises (COSHH data)" },
                    { label: "Key holder access", desc: "Details of key holders for locked areas, security codes, and access procedures" },
                    { label: "Utility isolation points", desc: "Location of gas, electricity, and water shut-off points and any specialist systems" },
                    { label: "Occupancy information", desc: "Number of persons normally present, shift patterns, and any unaccounted individuals" },
                    { label: "Fire protection systems", desc: "Location and type of fire alarm panels, sprinkler controls, suppression systems, and risers" }
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-3">
                      <p className="text-sm font-medium text-white">{item.label}</p>
                      <p className="text-xs text-white/70 mt-0.5">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <p>
                Following the initial emergency response, the fire service will conduct a <strong>fire investigation</strong> to determine the cause and origin of the fire. The responsible person should cooperate fully with this investigation, providing access to records, maintenance logs, fire risk assessments, and any other documentation requested.
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Structural engineer assessment</strong> &mdash; the fire service may request a structural engineer to assess the building's stability before firefighters can enter or continue operations. The responsible person should have a structural engineer on retainer or access to one through the insurer</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Post-investigation debriefing</strong> &mdash; once the investigation is complete, the fire service may offer a debrief to the responsible person, explaining the findings and any recommendations. This is a valuable learning opportunity</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Fire investigation report</strong> &mdash; the fire service will produce a report on the cause and origin of the fire. This report may be shared with the responsible person and will be essential evidence for insurance claims and any legal proceedings</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 04: Liaising with Insurers                            */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">04</span>
              Liaising with Insurers
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Insurance is a critical element of post-incident recovery. The relationship between the policyholder and the insurer is governed by the terms and conditions of the insurance policy, and <strong>failure to comply with policy conditions can jeopardise or void the entire claim</strong>. The responsible person must understand and follow the notification and claims procedures precisely.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Landmark className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Insurer Notification &amp; Claims Process</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Immediate Notification</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Most insurance policies contain a <strong>condition precedent</strong> requiring immediate notification of any loss or damage. This means the insurer must be informed as soon as reasonably practicable &mdash; ideally on the same day as the fire. Failure to notify promptly can give the insurer grounds to refuse the claim entirely. The notification should include the date, time, and location, a brief description of the incident, the emergency services involved, and any immediate actions taken.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Loss Adjuster Appointment</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The insurer will appoint a <strong>loss adjuster</strong> to visit the premises, assess the damage, and manage the claim. The loss adjuster acts on behalf of the insurer and will determine the extent of the loss, verify the claim against the policy terms, and agree the settlement amount. The policyholder may also appoint their own loss assessor to act on their behalf, particularly for large or complex claims.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Documenting Damage</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Thorough documentation of the damage is essential for the insurance claim. This includes: comprehensive photographs and video from all angles (taken before any cleanup), a detailed inventory of damaged or destroyed items with their approximate values, copies of purchase receipts or invoices where available, records of any temporary measures taken (boarding-up, weatherproofing, emergency repairs), and expert reports (structural engineer, electrical contractor, fire alarm specialist).
                    </p>
                  </div>
                </div>
              </div>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Interim measures</strong> &mdash; the insurer will typically authorise emergency interim measures such as boarding-up openings, temporary weatherproofing, emergency power supply, and security guarding. These costs are usually covered by the policy, but authorisation should be obtained before incurring significant expenditure</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Business continuity</strong> &mdash; business interruption insurance covers the loss of income and additional costs incurred while the business is unable to operate normally. The loss adjuster will assess the business interruption claim separately from the property damage claim</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Salvage operations</strong> &mdash; where possible, damaged stock, equipment, and materials should be salvaged rather than disposed of. The insurer will want to inspect salvageable items before disposal, as their residual value affects the claim settlement. Premature disposal of items can reduce the claim amount</span>
                </li>
              </ul>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Policy Conditions to Be Aware Of</p>
                <p className="text-sm text-white/80">
                  Insurance policies contain various conditions that the policyholder must comply with. Common conditions relevant to fire claims include: immediate notification of loss, cooperation with the insurer's investigation, maintaining the scene in its post-incident condition until inspected, not admitting liability to any third party, providing full and accurate information, and allowing the insurer access to the premises. Breach of any condition precedent can entitle the insurer to refuse the claim, regardless of the merits of the loss itself. It is strongly recommended that the responsible person familiarises themselves with these conditions <em>before</em> an incident occurs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check after Section 04 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/*  SECTION 05: Reinstatement Planning                            */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">05</span>
              Reinstatement Planning
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Reinstatement &mdash; the process of restoring the building and its systems to a safe, functional condition &mdash; is a complex, multi-phase undertaking that requires careful planning, coordination, and professional expertise. Reinstatement cannot begin until the fire investigation officer has released the scene and the insurer's loss adjuster has completed their initial assessment.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <HardHat className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Reinstatement Phases</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">1. Structural Assessment</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      A qualified structural engineer must assess the building before any remediation work begins. Fire can weaken structural steel (which loses approximately 50% of its strength at 600&deg;C), cause spalling of concrete (explosive surface flaking due to moisture within the concrete), crack masonry, and compromise foundations. The structural assessment will determine whether the building can be repaired or whether partial or complete demolition is required. This assessment is essential before anyone enters the building for remediation work.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">2. Smoke &amp; Water Damage Remediation</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Smoke and water damage can be as extensive as fire damage itself. Smoke penetrates every crevice, leaving acidic residues that corrode metals, discolour surfaces, and produce persistent odours. Water from firefighting operations causes immediate damage to electrical systems, plaster, timber, and furnishings, and creates long-term risks of mould growth. Professional remediation involves: initial decontamination and deodorisation, removal of water-damaged materials (plasterboard, insulation, carpet), industrial drying using dehumidifiers and air movers, and mould treatment if necessary.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">3. Electrical System Re-Certification (BS 7671)</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The entire electrical installation in the affected area must be inspected, tested, and re-certified to <strong>BS 7671</strong> (the IET Wiring Regulations) before re-occupation. Heat can degrade cable insulation even without visible damage, and water ingress causes corrosion and insulation breakdown. A competent electrician must carry out full inspection and testing including: insulation resistance tests, earth fault loop impedance tests, RCD tests, continuity of protective conductors, and polarity checks. All damaged or degraded components must be replaced. An Electrical Installation Certificate (EIC) or Electrical Installation Condition Report (EICR) must be issued.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">4. Fire Alarm &amp; Detection System (BS 5839)</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The fire alarm and fire detection system must be fully reinstated to <strong>BS 5839</strong>. This includes replacing any damaged detectors, sounders, call points, cabling, and control equipment. The entire system must be recommissioned and a commissioning certificate issued. If the fire revealed deficiencies in the detection coverage or alarm audibility, the system should be upgraded as part of the reinstatement. Cause and effect programming must be verified to ensure all devices operate correctly.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">5. Emergency Lighting Restoration (BS 5266)</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Emergency lighting must be fully restored to <strong>BS 5266</strong>. All luminaires in the affected area must be inspected, tested, and replaced where necessary. Battery condition must be verified (fire damage can degrade battery performance). The system must provide the required illumination levels on escape routes (minimum 1 lux at floor level) and in open areas (minimum 0.5 lux). A full 3-hour duration test must be conducted after reinstatement.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">6. Phased Re-Occupation</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Re-occupation should be phased, with each area signed off as safe before occupants return. A pre-occupation inspection should verify that all structural repairs are complete, building services are fully operational and certified, fire protection systems (alarm, detection, emergency lighting, signage, extinguishers) are in place and tested, escape routes are clear and compliant, and the fire risk assessment has been updated. A formal handover meeting should be held with all stakeholders before re-occupation commences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 06: Reviewing the Fire Risk Assessment                */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">06</span>
              Reviewing the Fire Risk Assessment
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Under the <strong>Regulatory Reform (Fire Safety) Order 2005</strong>, the fire risk assessment must be reviewed after any fire incident. This is not discretionary &mdash; it is a <strong>mandatory legal requirement</strong>. A fire incident is definitive evidence that the existing control measures were insufficient to prevent the fire from occurring or from developing to the extent that it did.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <ClipboardCheck className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">FRA Review Process</p>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Identifying what failed", desc: "Systematically analyse which control measures failed or were inadequate. Did the fire start because of a hazard that was not identified? Did the detection system respond quickly enough? Did compartmentation hold? Were evacuation procedures effective?" },
                    { label: "Updating the hazard register", desc: "Add any new hazards identified as a result of the fire. Update the risk ratings for existing hazards based on the evidence from the incident. Remove any hazards that no longer exist due to changes made during reinstatement." },
                    { label: "Revising control measures", desc: "For every inadequacy identified, specify new or improved control measures. These might include: additional detection, upgraded compartmentation, improved housekeeping procedures, additional training, revised evacuation procedures, or new equipment." },
                    { label: "Action plan with timescales", desc: "Each revised control measure must have a clear action plan: what needs to be done, who is responsible, the timescale for completion, and how completion will be verified. High-priority actions should have short timescales; lower-priority improvements can be programmed over a longer period." },
                    { label: "Communicating changes", desc: "All changes to the fire risk assessment and emergency procedures must be communicated to every person affected. This includes staff, contractors, visitors (through updated signage and induction), and any other relevant persons. Training may be required on revised procedures." }
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-3">
                      <p className="text-sm font-medium text-white">{item.label}</p>
                      <p className="text-xs text-white/70 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Competence of the Reviewer</p>
                <p className="text-sm text-white/80">
                  The post-incident review of the fire risk assessment should be conducted by a <strong>competent person</strong> &mdash; ideally someone with formal fire risk assessment qualifications and experience. Where the original fire risk assessment was carried out by an external fire risk assessor, they should be engaged to conduct the post-incident review. The reviewer should have access to the fire investigation report, the incident records, and any recommendations made by the fire service. In complex cases, it may be appropriate to engage a specialist fire safety consultant or engineer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check after Section 06 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ============================================================ */}
        {/*  SECTION 07: Updating Emergency Plans                          */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">07</span>
              Updating Emergency Plans
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The fire risk assessment review will almost certainly result in changes to the <strong>emergency plan</strong>. The emergency plan is a living document that must be updated whenever circumstances change, and a fire incident is one of the most compelling reasons for a thorough review and revision.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <RefreshCw className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Areas for Review</p>
                </div>
                <ul className="space-y-3 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>Revised evacuation procedures</strong> &mdash; if the fire revealed weaknesses in the evacuation procedure (slow response times, confusion about routes, congestion at exits), the procedure must be revised. This may involve changing evacuation routes, adding additional exits, modifying the alarm system, or changing the evacuation strategy entirely</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>Additional training requirements</strong> &mdash; the incident may have revealed gaps in staff knowledge or competence. Additional training should be identified and delivered, including: fire marshal refresher training, updated induction for new starters, specific training on revised procedures, and practical training on any new equipment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>Equipment replacement or upgrade</strong> &mdash; damaged fire safety equipment must be replaced, but the incident review may also identify opportunities for improvement. For example, upgrading from a conventional to an addressable fire alarm system, adding additional extinguishers, installing sprinklers, or providing evacuation chairs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>Assembly point review</strong> &mdash; was the assembly point appropriate? Was it far enough from the building? Did it become congested? Was there adequate shelter? Could the roll call be conducted effectively? If the assembly point was found wanting, an alternative must be identified</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>Communication improvements</strong> &mdash; the incident may have revealed communication failures: fire marshals unable to communicate with each other, the control point lacking information about the developing situation, evacuees not receiving timely updates. Solutions may include two-way radios for fire marshals, a dedicated incident communication channel, improved public address systems, or digital communication tools</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Testing Revised Procedures</p>
                <p className="text-sm text-white/80">
                  Any revised procedures must be tested through a <strong>fire drill</strong> as soon as practicable after implementation. This should not wait until the next scheduled drill date &mdash; a specific drill should be arranged to test the revised procedures and verify that they work as intended. The drill results should be carefully evaluated and any further adjustments made before the procedures are considered finalised. Staff confidence in the revised procedures is important for their effectiveness, and a well-run drill helps build that confidence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 08: Psychological Impact & Staff Support               */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">08</span>
              Psychological Impact &amp; Staff Support
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The psychological impact of a fire can be profound and long-lasting, affecting not only those who were directly involved but also witnesses, colleagues, and even family members. Employers have a <strong>legal duty of care</strong> under the Health and Safety at Work etc. Act 1974 and the Management of Health and Safety at Work Regulations 1999 to protect the mental health and wellbeing of their employees, and this duty extends to the aftermath of a traumatic incident.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Post-Incident Stress</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Following a fire, staff may experience a range of psychological responses. These are normal reactions to an abnormal event, but they require recognition and support:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { label: "Acute stress reactions", desc: "Anxiety, confusion, difficulty concentrating, sleep disturbance, irritability, and hypervigilance in the hours and days following the incident" },
                    { label: "Avoidance behaviour", desc: "Reluctance to return to the workplace, particularly to the area where the fire occurred; avoidance of fire safety activities such as drills" },
                    { label: "Flashbacks and intrusion", desc: "Involuntary, vivid recollections of the fire, triggered by sensory stimuli such as smoke smell, alarms, or visual cues similar to the incident" },
                    { label: "Physical symptoms", desc: "Headaches, fatigue, nausea, muscle tension, and other somatic complaints that may be stress-related rather than directly caused by the fire" }
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
                  <Scale className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Support Framework</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Debriefing Sessions</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      A structured debriefing session should be conducted within 48&ndash;72 hours of the incident. This is not a blame-finding exercise &mdash; it is a facilitated discussion where those involved can talk about what happened, how they felt, and what they are experiencing. The debrief should be led by a trained facilitator (occupational health professional, counsellor, or specially trained manager) and should normalise the range of reactions people may be experiencing. Participation should be encouraged but not mandatory.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Employee Assistance Programme (EAP)</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Access to a confidential Employee Assistance Programme should be made available to all affected staff. An EAP provides professional counselling, support, and signposting to specialist services. The EAP details should be actively communicated to all staff &mdash; not just mentioned in passing, but proactively promoted with clear information about how to access the service.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Return-to-Work Support</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      For staff who take time off following the incident, a phased return-to-work programme should be offered. This may involve: reduced hours initially, alternative duties away from the affected area, regular one-to-one check-ins with a manager, and flexibility to attend counselling appointments. Managers should be trained to recognise signs that an employee is struggling and to respond sensitively.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Long-Term Monitoring</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Post-traumatic stress disorder (PTSD) and other mental health conditions can develop weeks or months after the incident. Long-term monitoring for up to 12 months is recommended. This involves: periodic welfare check-ins, awareness among managers and colleagues, ongoing access to counselling services, and referral to occupational health or specialist mental health services if symptoms persist or worsen. Early intervention significantly improves outcomes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Legal Duty of Care</p>
                <p className="text-sm text-white/80">
                  The employer's duty of care to employees' mental health is well established in UK law. The Health and Safety at Work etc. Act 1974 requires employers to ensure, so far as is reasonably practicable, the health, safety, and welfare of employees &mdash; and "health" includes mental health. The Management of Health and Safety at Work Regulations 1999 require employers to assess risks to health, including psychological risks. Failure to provide adequate support after a traumatic incident could result in civil claims for negligence, constructive dismissal claims, and regulatory enforcement action. The cost of providing proactive support is a fraction of the cost of defending such claims and replacing experienced staff lost to stress-related absence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  POST-INCIDENT RECOVERY TIMELINE DIAGRAM                      */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="my-6 p-4 sm:p-6 rounded-xl bg-white/[0.02] border border-rose-500/20">
            <h3 className="text-sm font-semibold text-rose-400 mb-4 flex items-center gap-2">
              <Timer className="h-4 w-4" />
              Post-Incident Recovery Timeline
            </h3>
            <div className="space-y-3">
              {/* Phase 1: Immediate */}
              <div className="bg-rose-500/20 border border-rose-500/40 rounded-lg px-4 py-3 text-center">
                <p className="text-xs font-bold text-rose-400">PHASE 1: IMMEDIATE RESPONSE</p>
                <p className="text-[10px] text-white/50 mt-1">0 &ndash; 24 hours</p>
              </div>
              <div className="flex justify-center">
                <div className="w-px h-4 bg-rose-500/30" />
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                  <Heart className="h-4 w-4 text-rose-400 mx-auto mb-1" />
                  <p className="text-xs font-bold text-white">Welfare &amp; Accountability</p>
                  <p className="text-[10px] text-white/50">Roll call, shelter, first aid, emotional support</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                  <Shield className="h-4 w-4 text-rose-400 mx-auto mb-1" />
                  <p className="text-xs font-bold text-white">Scene Security</p>
                  <p className="text-[10px] text-white/50">Cordon, guard, prevent re-entry, isolate utilities</p>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-px h-4 bg-rose-500/30" />
              </div>

              {/* Phase 2: Investigation */}
              <div className="bg-rose-500/20 border border-rose-500/40 rounded-lg px-4 py-3 text-center">
                <p className="text-xs font-bold text-rose-400">PHASE 2: INVESTIGATION &amp; NOTIFICATION</p>
                <p className="text-[10px] text-white/50 mt-1">24 hours &ndash; 2 weeks</p>
              </div>
              <div className="flex justify-center">
                <div className="w-px h-4 bg-rose-500/30" />
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                  <FileSearch className="h-4 w-4 text-rose-400 mx-auto mb-1" />
                  <p className="text-xs font-bold text-white">Fire Investigation</p>
                  <p className="text-[10px] text-white/50">Scene examination, evidence collection, cause determination</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                  <Landmark className="h-4 w-4 text-rose-400 mx-auto mb-1" />
                  <p className="text-xs font-bold text-white">Insurer Notification</p>
                  <p className="text-[10px] text-white/50">Loss adjuster appointment, damage documentation</p>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-px h-4 bg-rose-500/30" />
              </div>

              {/* Phase 3: Reinstatement */}
              <div className="bg-rose-500/20 border border-rose-500/40 rounded-lg px-4 py-3 text-center">
                <p className="text-xs font-bold text-rose-400">PHASE 3: REINSTATEMENT</p>
                <p className="text-[10px] text-white/50 mt-1">2 weeks &ndash; 6 months+</p>
              </div>
              <div className="flex justify-center">
                <div className="w-px h-4 bg-rose-500/30" />
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg px-3 py-2 text-center">
                  <HardHat className="h-4 w-4 text-rose-400 mx-auto mb-1" />
                  <p className="text-xs font-bold text-rose-400">Structural Repair</p>
                  <p className="text-[10px] text-white/50">Assessment, remediation, smoke/water damage</p>
                </div>
                <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg px-3 py-2 text-center">
                  <Zap className="h-4 w-4 text-rose-400 mx-auto mb-1" />
                  <p className="text-xs font-bold text-rose-400">Services Re-Cert</p>
                  <p className="text-[10px] text-white/50">BS 7671, BS 5839, BS 5266</p>
                </div>
                <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg px-3 py-2 text-center">
                  <Flame className="h-4 w-4 text-rose-400 mx-auto mb-1" />
                  <p className="text-xs font-bold text-rose-400">FRA Review</p>
                  <p className="text-[10px] text-white/50">Mandatory update, revised controls</p>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-px h-4 bg-rose-500/30" />
              </div>

              {/* Phase 4: Recovery */}
              <div className="bg-rose-500/20 border border-rose-500/40 rounded-lg px-4 py-3 text-center">
                <p className="text-xs font-bold text-rose-400">PHASE 4: RECOVERY &amp; RETURN</p>
                <p className="text-[10px] text-white/50 mt-1">Ongoing &ndash; up to 12 months</p>
              </div>
              <div className="flex justify-center">
                <div className="w-px h-4 bg-rose-500/30" />
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                  <BookOpen className="h-4 w-4 text-rose-400 mx-auto mb-1" />
                  <p className="text-xs font-bold text-white">Updated Procedures</p>
                  <p className="text-[10px] text-white/50">Revised emergency plan, training, drills</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                  <Heart className="h-4 w-4 text-rose-400 mx-auto mb-1" />
                  <p className="text-xs font-bold text-white">Staff Wellbeing</p>
                  <p className="text-[10px] text-white/50">EAP, phased return, long-term monitoring</p>
                </div>
              </div>

              <p className="text-xs text-white/50 text-center mt-4">
                Timescales vary depending on the severity of the fire. Minor incidents may complete within weeks; major fires may take 12 months or longer to fully resolve.
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
            <Link to="../fire-safety-module-5-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Incident Reporting &amp; Investigation
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../fire-safety-module-6">
              You&rsquo;ve completed all modules! Ready for the mock exam?
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

      </article>
    </div>
  );
}
