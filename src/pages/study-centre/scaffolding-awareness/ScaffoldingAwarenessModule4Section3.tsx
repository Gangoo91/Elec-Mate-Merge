import { ArrowLeft, ArrowRight, Tag, AlertTriangle, CheckCircle, ShieldAlert, ClipboardCheck, Eye, CircleSlash, FileCheck, BadgeCheck } from "lucide-react";
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
    id: "scaffolding-awareness-tag-yellow-meaning",
    question: "You arrive at a scaffold and see a yellow (amber) tag displayed at the access point. What does this mean and what should you do?",
    options: [
      "The scaffold is fully complete and safe to use without restriction",
      "The scaffold has restrictions in place — read the tag carefully before use, do not access restricted areas",
      "The scaffold is unsafe and must not be used under any circumstances",
      "The scaffold is being dismantled and you should wait until a green tag is displayed"
    ],
    correctIndex: 1,
    explanation:
      "A yellow (amber) scaffold tag indicates that the scaffold is partially complete or has specific restrictions that apply. This does not mean the scaffold is unsafe in its entirety — it means that certain areas, levels, or bays may not be used. The tag will specify which areas are restricted and the nature of the restrictions. Before accessing a scaffold with a yellow tag, you must read the tag information carefully to confirm which areas are available for use and which are off limits. You must never access any area identified as restricted on the tag. If you are unsure about the restrictions, do not use the scaffold and speak to the scaffolding contractor, site supervisor, or the person responsible for scaffold management on site. Using a restricted area of a yellow-tagged scaffold is a serious safety breach that could result in a fall from height or structural collapse."
  },
  {
    id: "scaffolding-awareness-no-tag-action",
    question: "You arrive at a scaffold and there is no tag displayed at the access point. What is the correct course of action?",
    options: [
      "Use the scaffold if it looks safe — the tag may have blown off in the wind",
      "Ask a colleague if they have used it recently and proceed if they have",
      "Do NOT use the scaffold — report the missing tag to your supervisor immediately",
      "Attach your own handwritten tag to allow other workers to use the scaffold"
    ],
    correctIndex: 2,
    explanation:
      "If there is no scaffold tag displayed at the access point, you must NOT use the scaffold under any circumstances. The absence of a tag means the scaffold has not been inspected and confirmed as safe, or the tag has been removed or lost. In either case, the status of the scaffold is unknown — it may be incomplete, damaged, structurally compromised, or in the process of being erected or dismantled. You must report the missing tag to your supervisor, site manager, or the scaffolding contractor immediately so that a competent person can inspect the scaffold and attach the appropriate tag. Never assume that a scaffold without a tag is safe because it was previously tagged or because it appears to be in good condition. Visual appearance alone cannot confirm structural integrity, and internal defects such as weakened ties, missing bracing, or inadequate foundations may not be visible from the access point."
  },
  {
    id: "scaffolding-awareness-tag-information",
    question: "Which of the following pieces of information must be recorded on a scaffold tag?",
    options: [
      "The name of the scaffold hire company and the rental cost per week",
      "The date of inspection, the name of the inspector, the next inspection date, and any restrictions",
      "Only the colour status (green, yellow, or red) — no other information is required",
      "The names of all workers who are permitted to use the scaffold"
    ],
    correctIndex: 1,
    explanation:
      "A scaffold tag must contain sufficient information for anyone accessing the scaffold to understand its status, who inspected it, when the inspection took place, when the next inspection is due, and whether any restrictions apply. At minimum, the tag must include: the date of the most recent inspection, the name (and often the signature and CISRS card number) of the competent person who carried out the inspection, the date the next inspection is due (scaffolds must be inspected at least every seven days), a clear statement of any restrictions or limitations on use, the scaffold location or identification reference, and the status colour (green, yellow, or red). Some tag systems, particularly the NASC/CISRS Scafftag system, also include fields for the scaffolding contractor's name, the scaffold design reference, the maximum permitted loading, and a unique tag serial number for traceability. The tag must be legible, weather-resistant, and securely attached at every access point."
  }
];

/* ------------------------------------------------------------------ */
/*  FAQs (4)                                                          */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: "Who is responsible for attaching scaffold tags and can anyone remove or change them?",
    answer:
      "Scaffold tags must be attached by or under the authority of the competent person who carried out the inspection. In practice, this is usually the scaffolding contractor's appointed competent person — typically a CISRS-qualified scaffolding inspector or scaffold supervisor. Only a competent person authorised by the scaffolding contractor or the principal contractor should remove, change, or replace a scaffold tag. An operative, trade worker, or site visitor must never remove, alter, or deface a scaffold tag, even if they believe the tag is incorrect. If you believe a tag is missing, damaged, incorrect, or does not reflect the current condition of the scaffold, you must report it to your supervisor or the scaffolding contractor immediately. Interfering with scaffold tags is a serious disciplinary matter and potentially a criminal offence under the Health and Safety at Work etc. Act 1974 if it leads to someone using an unsafe scaffold."
  },
  {
    question: "How often must scaffold tags be updated, and what triggers a new tag?",
    answer:
      "Scaffold tags must be updated every time the scaffold is inspected. Under the Work at Height Regulations 2005 and the Construction (Design and Management) Regulations 2015, scaffolds must be inspected before first use, at least every seven days thereafter, and after any event that could affect stability (such as high winds, heavy rain, impact damage, ground movement, or any alteration to the scaffold). Each inspection triggers a new or updated tag reflecting the current status. If the scaffold is altered — for example, a new lift is added, a section is struck (partially dismantled), or ties are temporarily removed — the scaffold must be re-inspected and a new tag issued before any work is carried out from the altered scaffold. The old tag must be removed and replaced with the current one to prevent confusion. On busy construction sites where scaffolds are frequently altered, this means tags may change several times per week. It is essential that only the most current tag is displayed and that superseded tags are removed and archived as part of the inspection record trail."
  },
  {
    question: "What is the difference between the NASC/CISRS Scafftag system and a site-specific tagging system?",
    answer:
      "The NASC (National Access and Scaffolding Confederation) and CISRS (Construction Industry Scaffolders Record Scheme) jointly developed the Scafftag system as a standardised, industry-recognised scaffold tagging system used across the United Kingdom. The Scafftag system uses a durable, weather-resistant tag holder with interchangeable colour-coded inserts (green, yellow/amber, red) and provides a structured format for recording inspection information, including the inspection date, inspector name and CISRS card number, next inspection due date, scaffold location, any restrictions, and maximum permitted loading. It is widely adopted by major contractors and scaffolding companies and is recognised as best practice by the HSE. Site-specific tagging systems are bespoke systems developed by individual contractors or sites. These may use different formats, different colour codes, or different levels of detail. While they can be effective, they introduce variability that can cause confusion when workers move between sites. The NASC/CISRS Scafftag system is preferred because it provides a consistent, universally understood standard that all construction workers can recognise. Many principal contractors now mandate the use of the NASC/CISRS system in their site rules."
  },
  {
    question: "Can a scaffold with a green tag ever be unsafe, and should I still check it before use?",
    answer:
      "Yes — a green tag does not guarantee that the scaffold is safe at the exact moment you step onto it. The green tag confirms that the scaffold was inspected and found to be safe at the time of the most recent inspection. However, conditions can change between inspections. For example, high winds, heavy rain, frost, vehicle impacts, overloading by other workers, or unauthorised modifications can all compromise the scaffold's integrity after the tag was issued. This is why every person who uses a scaffold has a personal duty to carry out a basic visual check before stepping onto the scaffold each time they use it. You should check that: the tag is current (the inspection date is within seven days), the platform is fully boarded with no gaps, guardrails and toe boards are in place, the scaffold appears plumb and level, there is no visible damage to standards, ledgers, or braces, access ladders are secure, and there is no debris or overloading on the platform. If you notice anything that concerns you, do not use the scaffold — report it to your supervisor immediately. A green tag is the starting point, not a substitute for your own judgement and observation."
  }
];

/* ------------------------------------------------------------------ */
/*  End-of-Section Quiz (8 questions)                                 */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      "What does a GREEN scaffold tag indicate?",
    options: [
      "The scaffold is partially erected and has restricted access",
      "The scaffold has been inspected, is complete, and is safe to use without restriction",
      "The scaffold is being dismantled and must not be accessed",
      "The scaffold requires further inspection before use"
    ],
    correctAnswer: 1,
    explanation:
      "A green scaffold tag indicates that the scaffold has been inspected by a competent person, has been found to comply with the design specification and relevant regulations, is complete in all respects (including guardrails, toe boards, full boarding, access, and bracing), and is safe to use without restriction. The green tag is effectively a certificate of fitness confirming that the scaffold meets the required standards at the time of inspection. However, users must still carry out a basic visual check before each use, as conditions can change between inspections."
  },
  {
    id: 2,
    question:
      "What colour scaffold tag indicates that restrictions apply and certain areas must not be accessed?",
    options: [
      "Green",
      "Blue",
      "Yellow (Amber)",
      "Red"
    ],
    correctAnswer: 2,
    explanation:
      "A yellow (amber) scaffold tag indicates that the scaffold is partially complete, has specific restrictions on use, or has areas that must not be accessed. The tag will specify exactly which areas are restricted and why. Common reasons for a yellow tag include: a scaffold that is only partially erected (for example, lower lifts are complete but upper lifts are still under construction), areas where guardrails or platforms are not yet installed, sections that have been struck (partially dismantled), or areas where the scaffold does not comply with the full specification due to site constraints. Workers must read the yellow tag carefully and only use the areas identified as available. Entering a restricted area on a yellow-tagged scaffold is a serious safety violation."
  },
  {
    id: 3,
    question:
      "What is the ONLY correct action when you encounter a scaffold with a RED tag?",
    options: [
      "Use the scaffold briefly if the task is urgent and there is no alternative",
      "Use the scaffold if you are wearing a harness",
      "Do NOT use the scaffold under any circumstances — it is unsafe",
      "Use only the lower levels of the scaffold, as they are likely complete"
    ],
    correctAnswer: 2,
    explanation:
      "A red scaffold tag means the scaffold is unsafe and must NOT be used under any circumstances, by any person, for any reason. A red tag is displayed when the scaffold is in the process of being erected or dismantled, when a significant defect has been identified that renders the scaffold unsafe, when the scaffold has been damaged (for example, by vehicle impact, wind, or overloading), or when the scaffold has been condemned following an inspection. No exceptions apply — even if the task is urgent, even if you are wearing a harness, and even if only a small part of the scaffold appears affected. Access to a red-tagged scaffold must be physically prevented where reasonably practicable (for example, by removing ladders or installing barriers), and clear signage must be displayed warning that the scaffold must not be used."
  },
  {
    id: 4,
    question:
      "Where must scaffold tags be placed?",
    options: [
      "At the top level of the scaffold only",
      "In the site office for safekeeping",
      "At every access point to the scaffold",
      "Only at the main entrance to the construction site"
    ],
    correctAnswer: 2,
    explanation:
      "Scaffold tags must be placed at every access point to the scaffold. This is critical because scaffolds often have multiple access points — for example, ground-level ladder access, intermediate access from an adjacent building, access from an adjoining scaffold, or access from a loading bay. If a tag is only placed at one access point, workers entering through other points will not see the tag and will have no information about the scaffold's status. Every person approaching a scaffold must be able to see and read the tag before they step onto the scaffold. Tags must be positioned at a height and location where they are clearly visible and easily readable — typically at or near eye level adjacent to the access ladder or entrance. Tags must be securely attached so they cannot be blown away or accidentally dislodged, and they must be protected from weather damage to remain legible."
  },
  {
    id: 5,
    question:
      "What must be recorded on a scaffold tag at minimum?",
    options: [
      "Only the colour of the tag (green, yellow, or red)",
      "The date of inspection, inspector's name, next inspection date, and any restrictions",
      "The name of the building owner and the insurance policy number",
      "The total weight of materials stored on the scaffold"
    ],
    correctAnswer: 1,
    explanation:
      "A scaffold tag must record at minimum: the date of the most recent inspection, the name (and usually the signature and CISRS card number) of the competent person who carried out the inspection, the date the next inspection is due, and a clear statement of any restrictions or limitations on use. Additional information commonly recorded includes the scaffold location or identification reference, the scaffolding contractor's name, the maximum permitted loading class, the scaffold design reference, and a unique tag serial number. The tag must provide enough information for any worker to determine at a glance whether the scaffold is safe to use, when it was last checked, when it will be checked next, and whether any restrictions apply. Without this information, the tag serves no useful purpose and the scaffold should be treated as untagged."
  },
  {
    id: 6,
    question:
      "What does the NASC/CISRS Scafftag system provide that a handwritten sign does not?",
    options: [
      "Legal permission to exceed the seven-day inspection interval",
      "A standardised, industry-recognised format with colour-coded inserts, weather-resistant holders, and traceability through unique serial numbers",
      "An automatic alarm system that warns workers if the scaffold becomes unsafe",
      "A guarantee that the scaffold will never require re-inspection"
    ],
    correctAnswer: 1,
    explanation:
      "The NASC/CISRS Scafftag system is a standardised, industry-recognised scaffold tagging system developed jointly by the National Access and Scaffolding Confederation (NASC) and the Construction Industry Scaffolders Record Scheme (CISRS). It provides durable, weather-resistant tag holders with interchangeable colour-coded inserts (green, yellow/amber, red), a structured format for recording all required inspection information in a consistent manner, unique serial numbers on each tag for traceability and audit purposes, and a universally recognised appearance that all construction workers can identify regardless of which site they are working on. A handwritten sign, while better than nothing, offers no standardisation, no weather resistance, no traceability, and no assurance that all required information has been recorded. Handwritten signs can also be easily forged, damaged, or rendered illegible by weather."
  },
  {
    id: 7,
    question:
      "Under the advanced scaffolding inspection scheme, who can carry out a detailed scaffold inspection?",
    options: [
      "Any labourer who has worked on construction sites for more than five years",
      "Only the site manager, regardless of their qualifications",
      "A competent person with appropriate training, knowledge, and experience — typically CISRS-qualified",
      "Any person who holds a valid CSCS card of any type"
    ],
    correctAnswer: 2,
    explanation:
      "Under the Work at Height Regulations 2005, scaffold inspections must be carried out by a competent person — defined as someone with sufficient training, experience, knowledge, and other qualities to carry out the inspection properly. In practice, for tube and fitting and system scaffolds, this means a person who holds a relevant CISRS qualification such as a CISRS Scaffolding Inspector card, a CISRS Advanced Scaffolder card, or an equivalent qualification recognised by the industry. The advanced scaffolding inspection scheme requires the inspector to have detailed knowledge of scaffold design, structural principles, loading calculations, and the specific requirements of the Work at Height Regulations and the relevant British and European Standards (BS EN 12811, BS 5975). A general CSCS card or a long period of site experience alone is not sufficient — the inspector must have specific scaffolding competence."
  },
  {
    id: 8,
    question:
      "A scaffold was inspected and tagged green on Monday. On Wednesday evening, the site experiences winds exceeding 50 mph. What should happen on Thursday morning?",
    options: [
      "Nothing — the scaffold still has a valid green tag and the next inspection is not due until the following Monday",
      "Workers should visually check the scaffold before use but the green tag remains valid",
      "The scaffold must be re-inspected by a competent person before use, and the tag updated to reflect the new inspection",
      "The scaffold should be dismantled immediately as it will certainly be damaged"
    ],
    correctAnswer: 2,
    explanation:
      "Scaffolds must be re-inspected after any event that could have affected their stability, strength, or rigidity — and high winds (typically defined as sustained winds exceeding approximately 30 mph or gusts exceeding 50 mph, although specific thresholds may vary by scaffold type and site conditions) are one of the most common triggering events. The existing green tag is no longer valid because conditions have changed since the inspection was carried out. The scaffold must be inspected by a competent person before anyone is permitted to use it on Thursday morning. The inspector will check for wind damage including displaced or missing components, loosened ties, displaced base plates, twisted or buckled standards, dislodged toe boards and guardrails, and sheeting or debris damage. If the scaffold passes the post-weather inspection, a new green tag is issued with Thursday's date. If defects are found, a yellow or red tag is issued as appropriate. Until the inspection is complete, the scaffold must not be used."
  }
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
export default function ScaffoldingAwarenessModule4Section3() {
  useSEO({
    title: "Scaffold Tags & Status | Scaffolding Awareness Module 4.3",
    description:
      "Learn the scaffold tag colour system (green, yellow/amber, red), tag placement requirements, what information must be recorded on tags, the NASC/CISRS Scafftag system, and the advanced scaffolding inspection scheme.",
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
            <Link to="../scaffolding-awareness-module-4">
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
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-500/20 to-slate-400/20 border border-slate-500/30 mb-4">
            <Tag className="h-7 w-7 text-slate-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 mb-3 mx-auto">
            <span className="text-slate-400 text-xs font-semibold">MODULE 4 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Scaffold Tags &amp; Status
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding the scaffold tag colour system, what information tags must contain,
            where they must be placed, and why you must never use a scaffold that does not
            have a valid, current tag displayed
          </p>
        </header>

        {/* ============================================================ */}
        {/*  QUICK SUMMARY BOXES                                          */}
        {/* ============================================================ */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-slate-500/5 border-l-2 border-slate-500/50">
            <p className="text-slate-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>GREEN tag:</strong> Safe to use &mdash; inspected, complete, no restrictions</li>
              <li><strong>YELLOW tag:</strong> Restrictions apply &mdash; read tag, avoid restricted areas</li>
              <li><strong>RED tag:</strong> Do NOT use &mdash; unsafe, under erection or dismantling</li>
              <li><strong>No tag:</strong> Do NOT use &mdash; treat as unsafe, report immediately</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-slate-500/5 border-l-2 border-slate-500/50">
            <p className="text-slate-400 text-base font-medium mb-2">Key Standards</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>NASC/CISRS Scafftag:</strong> Industry-standard tagging system</li>
              <li><strong>Work at Height Regs 2005:</strong> Inspection &amp; tag requirements</li>
              <li><strong>BS 5975:2019:</strong> Code of practice for temporary works</li>
              <li><strong>CDM Regulations 2015:</strong> Inspection record duties</li>
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
              "Identify and explain the meaning of each scaffold tag colour: green, yellow (amber), and red",
              "State where scaffold tags must be placed and why every access point must be tagged",
              "Describe the information that must be recorded on a scaffold tag and why each item is essential",
              "Explain the NASC/CISRS Scafftag system and its advantages over site-specific alternatives",
              "Describe the requirements of the advanced scaffolding inspection scheme and who can carry out inspections",
              "State the correct action when a scaffold has no tag, a damaged tag, or an expired tag"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-slate-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ============================================================ */}
        {/*  SECTION 01: The Scaffold Tag System — Overview                */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-500/10 text-slate-400 text-sm font-bold border border-slate-500/20">01</span>
              The Scaffold Tag System &mdash; Overview
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>scaffold tag system</strong> is a colour-coded visual communication system used on construction sites throughout the United Kingdom to indicate the current status of a scaffold. Its purpose is simple but critical: to ensure that <strong>every person approaching a scaffold can immediately determine whether it is safe to use</strong>, whether restrictions apply, or whether it must not be accessed at all. The tag system is the primary interface between the scaffolding contractor (who erects, inspects, and maintains the scaffold) and the trade workers, site personnel, and visitors who need to use it.
              </p>

              <p>
                Without a clear, standardised tagging system, workers would have no reliable way of knowing whether a scaffold has been inspected, whether it is complete, or whether it is in the process of being erected or dismantled. This lack of information creates an unacceptable risk of <strong>falls from height</strong> &mdash; the single largest cause of fatal and serious injuries in the UK construction industry. The Health and Safety Executive (HSE) reports that falls from height account for approximately 40% of all fatal injuries in construction, and a significant proportion of these involve scaffolds.
              </p>

              <p>
                The scaffold tag system uses three colours, each with a clear, unambiguous meaning that all construction workers must understand:
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>GREEN</strong> &mdash; the scaffold has been inspected, is complete, complies with the design specification, and is safe to use without restriction. A green tag is a positive confirmation that the scaffold meets all applicable standards at the time of the most recent inspection</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>YELLOW (AMBER)</strong> &mdash; the scaffold is partially complete, or has specific restrictions on use. Certain areas, lifts, bays, or features may not be used. The tag will specify exactly what the restrictions are. Workers must read the tag carefully and only access permitted areas</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>RED</strong> &mdash; the scaffold is unsafe and must not be used by any person for any reason. The scaffold may be under erection, under dismantling, damaged, condemned, or otherwise unfit for use. No exceptions apply</span>
                </li>
              </ul>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white">
                    <strong className="text-slate-400">Critical Rule:</strong> If there is <strong>no tag</strong> displayed at the access point of a scaffold, you must treat it as if it has a <strong>red tag</strong>. Do NOT use the scaffold. Report the absence of the tag to your supervisor, site manager, or the scaffolding contractor immediately. A scaffold without a tag is a scaffold of unknown status, and using it puts your life at risk.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 02: Green Tag — Safe to Use                          */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-500/10 text-slate-400 text-sm font-bold border border-slate-500/20">02</span>
              Green Tag &mdash; Safe to Use
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A <strong>green scaffold tag</strong> is the positive confirmation that a scaffold has been inspected by a competent person and found to be safe for use without restriction. When you see a green tag at the access point, it tells you that at the time of the most recent inspection, the scaffold met all of the following criteria:
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Fully erected and complete</strong> &mdash; all lifts, bays, platforms, guardrails, toe boards, bracing, and ties have been installed in accordance with the scaffold design specification. No components are missing, incomplete, or temporarily absent</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Inspected by a competent person</strong> &mdash; a person with the appropriate qualifications, training, knowledge, and experience (typically CISRS-qualified) has carried out a thorough inspection and confirmed compliance with the design and with the Work at Height Regulations 2005</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Structurally sound</strong> &mdash; foundations are adequate, standards are plumb, ledgers are level, bracing is correctly installed, ties are secure and at the correct spacing, and the scaffold is capable of supporting the intended loads</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Safe access and egress</strong> &mdash; access ladders are correctly positioned, secured at the top, and extend at least 1 metre above the landing platform. Access points are clear and unobstructed</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Compliant with regulations</strong> &mdash; the scaffold meets the requirements of the Work at Height Regulations 2005, BS EN 12811-1 (temporary works equipment), BS 5975:2019 (code of practice for temporary works procedures), and any site-specific requirements</span>
                </li>
              </ul>

              <p>
                Even with a green tag displayed, <strong>every user has a personal responsibility</strong> to carry out a brief visual check before each use. This is not a formal inspection — it is a quick, common-sense assessment to confirm that nothing has changed since the tag was issued. Check that the tag date is current (within seven days), platforms are fully boarded, guardrails and toe boards are in place, ladders are secure, and there is no visible damage, debris, or overloading. If anything appears wrong, do not use the scaffold — report it immediately.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white">
                    <strong className="text-green-400">Green Tag Summary:</strong> Inspected, complete, compliant, safe to use without restriction. The green tag is valid from the date of inspection until the next scheduled inspection (maximum seven days) or until an event occurs that could affect the scaffold&rsquo;s stability (such as high winds, impact, or alteration).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/*  SECTION 03: Yellow (Amber) Tag — Restrictions Apply          */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-500/10 text-slate-400 text-sm font-bold border border-slate-500/20">03</span>
              Yellow (Amber) Tag &mdash; Restrictions Apply
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A <strong>yellow (amber) scaffold tag</strong> indicates that the scaffold is available for use but with <strong>specific restrictions</strong>. This is perhaps the most misunderstood tag colour because it requires workers to read and understand the restrictions stated on the tag before deciding whether they can safely access the scaffold. A yellow tag does not mean the scaffold is unsafe — it means that certain areas, levels, or configurations are not available for use, and the permitted areas are defined on the tag.
              </p>

              <p>
                <strong>Common reasons for a yellow tag include:</strong>
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Partial scaffold erection</strong> &mdash; the lower lifts of the scaffold have been completed and inspected, but the upper lifts are still under construction. The yellow tag will specify which levels are safe to use and which must not be accessed because they are incomplete</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Partial dismantling (striking)</strong> &mdash; part of the scaffold has been removed (for example, an upper lift has been struck while the lower lifts remain in use). The yellow tag will identify the remaining usable areas and the areas that no longer exist or are no longer safe</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Loading restrictions</strong> &mdash; the scaffold has been designed or inspected for a specific loading class, and the yellow tag states the maximum permitted load. For example, the scaffold may be suitable for inspection use only (Light Duty, Loading Class 2 — maximum 1.5 kN/m&sup2;) but not for heavy material storage (Heavy Duty, Loading Class 4 — maximum 3.0 kN/m&sup2;)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Access restrictions</strong> &mdash; certain access points may not be used, or access may be restricted to specific trades or personnel. For example, a scaffold may have one face that is too close to live overhead power lines, and the yellow tag will prohibit access to that face</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Temporary modifications</strong> &mdash; a section of guardrail may have been temporarily removed to allow material loading, or a platform may be incomplete in a specific bay. The yellow tag will identify the affected areas and any additional precautions required (such as the use of a safety harness in the modified area)</span>
                </li>
              </ul>

              <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <ShieldAlert className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white">
                    <strong className="text-yellow-400">Yellow Tag Rule:</strong> You <strong>must</strong> read the yellow tag in full before stepping onto the scaffold. If the tag does not clearly state which areas are available, or if you do not understand the restrictions, do not use the scaffold. Ask the scaffolding contractor, site supervisor, or scaffold coordinator for clarification. <strong>Never assume that an area is safe simply because it looks complete.</strong> Restricted areas on a yellow-tagged scaffold may have hidden deficiencies such as missing ties, inadequate bracing, or unboarded platforms that are not visible from the access point.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 04: Red Tag — Do Not Use                             */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-500/10 text-slate-400 text-sm font-bold border border-slate-500/20">04</span>
              Red Tag &mdash; Do Not Use
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A <strong>red scaffold tag</strong> is the most serious status indicator. It means the scaffold is <strong>unsafe and must not be used by any person for any reason</strong>. There are no exceptions, no qualifications, and no circumstances in which it is acceptable to access a red-tagged scaffold. The red tag is a clear, absolute prohibition.
              </p>

              <p>
                <strong>Situations that require a red tag include:</strong>
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Scaffold under erection</strong> &mdash; the scaffold is currently being built. Scaffolders are working at height to install standards, ledgers, braces, ties, and platforms. The scaffold is incomplete and does not have the safety features (guardrails, toe boards, full boarding) required for safe use by non-scaffolding personnel. Only trained scaffolders working under a safe system of work are permitted on the scaffold during erection</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Scaffold under dismantling</strong> &mdash; the scaffold is being taken down. Components are being removed from the top down, and at any point during dismantling, the scaffold may lack guardrails, platforms, bracing, or ties. The structural integrity of the scaffold changes continuously during dismantling, and it is not safe for anyone other than the scaffolding gang to be on or near the scaffold</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Significant structural defect</strong> &mdash; an inspection has revealed a defect that renders the scaffold unsafe. This could include settlement or failure of foundations, buckled or damaged standards, missing or inadequate ties, broken or absent bracing, overloading, or any other condition that compromises the scaffold&rsquo;s ability to support its intended loads</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Damage from external event</strong> &mdash; the scaffold has been damaged by a vehicle impact, falling materials, ground movement, or any other external force. Even if the damage appears minor, the scaffold must be treated as unsafe until it has been inspected by a competent person</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Condemned scaffold</strong> &mdash; the scaffold has been formally condemned by an inspector (internal or HSE) and must not be used until the identified deficiencies have been rectified and the scaffold has been re-inspected and re-tagged by a competent person</span>
                </li>
              </ul>

              <p>
                When a red tag is displayed, additional physical measures should be taken to prevent unauthorised access. These include <strong>removing the access ladders</strong>, <strong>installing physical barriers</strong> across access points, and displaying <strong>warning signs</strong> (in addition to the red tag) that clearly state the scaffold must not be used. On larger sites, the red-tagged scaffold may be fenced off entirely to create an exclusion zone.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <CircleSlash className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white">
                    <strong className="text-red-400">Absolute Rule:</strong> If you see a red tag, <strong>walk away</strong>. Do not climb onto the scaffold for any reason. Do not assume that the red tag is a mistake or that the scaffold &ldquo;looks fine&rdquo;. Structural deficiencies that render a scaffold unsafe are often invisible to the untrained eye &mdash; missing ties, inadequate bracing, or compromised foundations may not be apparent from the ground or the access point. Using a red-tagged scaffold is a dismissible offence on most construction sites and may also constitute a criminal offence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/*  SECTION 05: Tag Placement Requirements                       */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-500/10 text-slate-400 text-sm font-bold border border-slate-500/20">05</span>
              Tag Placement Requirements
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The effectiveness of the scaffold tag system depends entirely on whether workers can <strong>see and read the tag before they step onto the scaffold</strong>. A tag that is missing, hidden, illegible, or placed in an obscure location is worse than useless &mdash; it may give a false sense that no tagging system is in operation and encourage workers to use the scaffold without checking its status.
              </p>

              <p>
                <strong>Tag placement rules:</strong>
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>At every access point</strong> &mdash; a scaffold tag must be displayed at every point where a person could access the scaffold. This includes every ground-level ladder access, every internal ladder access between lifts (where the scaffold connects to a building and workers could step onto it from inside), every loading bay, every bridge or link to an adjacent scaffold, and every access point from an adjacent structure. On a large scaffold, there may be numerous access points, and every one must be tagged</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>At or near eye level</strong> &mdash; the tag must be positioned where it is easily visible and can be read without having to climb, reach, or move other objects. Typically, this means attaching the tag to a standard, ledger, or dedicated tag holder at approximately 1.5 to 1.8 metres above the access point &mdash; the natural eye level of a person about to step onto the scaffold</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Before the point of no return</strong> &mdash; the tag must be visible before the worker steps onto the scaffold or begins to climb the access ladder. The worker must be able to read the tag and make a decision about whether to proceed while still standing on safe ground. A tag placed halfway up a ladder or on an upper platform is too late &mdash; the worker is already on the scaffold before they see it</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Securely attached</strong> &mdash; the tag must be fixed firmly so that it cannot be blown away by wind, knocked off by passing workers or materials, or accidentally dislodged. Tags should be attached using cable ties, clips, or dedicated tag holders that keep them secure in all weather conditions. Loose tags that fall off create a dangerous situation where the scaffold appears untagged</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Protected from weather</strong> &mdash; tags must remain legible throughout their validity period (up to seven days between inspections). They must be weather-resistant or protected from rain, snow, and UV degradation. The NASC/CISRS Scafftag system uses plastic holders and inserts specifically designed for outdoor use. Handwritten tags on paper or card are particularly vulnerable to weather damage and should be laminated or placed in waterproof holders</span>
                </li>
              </ul>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-slate-400">Multiple Tags:</strong> Every access point must display its own tag. It is not acceptable to tag only the &ldquo;main&rdquo; access point and assume that workers will walk around to check it before using a different access point. Each tag must be identical in information and status &mdash; a scaffold cannot be green at one access point and yellow at another (the overall status applies to the whole scaffold, with restrictions detailed on the yellow tag).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 06: Tag Information Fields                           */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-500/10 text-slate-400 text-sm font-bold border border-slate-500/20">06</span>
              Tag Information Fields
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A scaffold tag is not simply a coloured card. It must contain <strong>specific, detailed information</strong> that allows any person to understand the scaffold&rsquo;s status, verify when it was last inspected, confirm who inspected it, and determine when the next inspection is due. The information on the tag forms part of the inspection record trail and may be examined by HSE inspectors during site visits.
              </p>

              {/* ── Tag Information Fields Diagram ── */}
              <div className="bg-gradient-to-br from-slate-500/10 to-slate-400/5 border border-slate-500/20 rounded-xl p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FileCheck className="h-5 w-5 text-slate-400" />
                  <p className="text-sm font-medium text-slate-400">Tag Information Fields</p>
                </div>
                <p className="text-xs text-white/50 mb-4">All fields required on a properly completed scaffold tag</p>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-500/20 border border-slate-500/30">
                        <span className="text-[10px] font-bold text-slate-400">1</span>
                      </div>
                      <p className="text-sm font-bold text-slate-400">Status Colour</p>
                    </div>
                    <p className="text-xs text-white/70">Green (safe to use), Yellow/Amber (restrictions apply), or Red (do not use). The colour must be immediately visible and unambiguous &mdash; this is the first thing a worker should see when approaching the scaffold.</p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-500/20 border border-slate-500/30">
                        <span className="text-[10px] font-bold text-slate-400">2</span>
                      </div>
                      <p className="text-sm font-bold text-slate-400">Date of Inspection</p>
                    </div>
                    <p className="text-xs text-white/70">The exact date on which the most recent inspection was carried out. This allows anyone to verify that the inspection is current (within seven days). If the inspection date is more than seven days old, the scaffold must be treated as overdue for inspection and should not be used until re-inspected.</p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-500/20 border border-slate-500/30">
                        <span className="text-[10px] font-bold text-slate-400">3</span>
                      </div>
                      <p className="text-sm font-bold text-slate-400">Inspector&rsquo;s Name &amp; Credentials</p>
                    </div>
                    <p className="text-xs text-white/70">The full name, signature, and CISRS card number (or equivalent qualification reference) of the competent person who carried out the inspection. This establishes personal accountability and allows the inspection to be traced back to a specific individual with verified competence.</p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-500/20 border border-slate-500/30">
                        <span className="text-[10px] font-bold text-slate-400">4</span>
                      </div>
                      <p className="text-sm font-bold text-slate-400">Next Inspection Due Date</p>
                    </div>
                    <p className="text-xs text-white/70">The date by which the next inspection must be carried out &mdash; no later than seven days after the most recent inspection. This allows workers and supervisors to verify that the scaffold remains within its inspection validity period. If the current date exceeds the next inspection due date, the scaffold must not be used.</p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-500/20 border border-slate-500/30">
                        <span className="text-[10px] font-bold text-slate-400">5</span>
                      </div>
                      <p className="text-sm font-bold text-slate-400">Restrictions (if applicable)</p>
                    </div>
                    <p className="text-xs text-white/70">For yellow (amber) tags, a clear and specific statement of which areas, levels, bays, or features are restricted. Must describe the restriction in plain language that any worker can understand. For example: &ldquo;Lifts 1&ndash;3 safe to use. Lift 4 under construction &mdash; DO NOT ACCESS.&rdquo;</p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-500/20 border border-slate-500/30">
                        <span className="text-[10px] font-bold text-slate-400">6</span>
                      </div>
                      <p className="text-sm font-bold text-slate-400">Additional Information</p>
                    </div>
                    <p className="text-xs text-white/70">Scaffold location or identification reference, scaffolding contractor&rsquo;s name, maximum permitted loading class, scaffold design reference number, and unique tag serial number (for traceability). Some tags also include the scaffold duty classification (e.g., Light Duty, General Purpose, Heavy Duty, Special Duty) and emergency contact details.</p>
                  </div>
                </div>
              </div>

              <p>
                The <strong>quality and completeness of the tag information</strong> is not optional. A tag that only shows a colour without supporting information provides insufficient assurance. Workers need to be able to verify the date, the inspector, and the next inspection due date to have confidence that the tag is current and valid. A tag dated more than seven days ago is expired and the scaffold should not be used. A tag with no inspector name provides no accountability. A yellow tag with no description of restrictions is useless because the worker has no way of knowing which areas are safe.
              </p>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-slate-400">Legibility:</strong> All information on the tag must be clearly legible. If the tag has been damaged by weather, handling, or UV exposure to the point where any field is unreadable, the tag must be replaced immediately. An illegible tag is functionally equivalent to no tag at all &mdash; the scaffold should not be used until a new, legible tag is attached following a fresh inspection.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ============================================================ */}
        {/*  DIAGRAM: Scaffold Tag Colour Reference                       */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="bg-gradient-to-br from-slate-500/10 to-slate-400/5 border border-slate-500/20 rounded-xl p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="h-5 w-5 text-slate-400" />
              <p className="text-sm font-medium text-slate-400">Scaffold Tag Colour Reference</p>
            </div>
            <p className="text-xs text-white/50 mb-4">Quick-reference guide to the three tag colours and the correct response for each</p>
            <div className="space-y-3">
              {/* Green */}
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500/20 border-2 border-green-500/50">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-green-400">GREEN &mdash; Safe to Use</p>
                    <p className="text-xs text-white/60">Inspected &bull; Complete &bull; No restrictions</p>
                  </div>
                </div>
                <ul className="space-y-1 text-xs text-white/70 ml-13">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Scaffold has been inspected by a competent person and found compliant</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>All components installed, all platforms fully boarded, all guardrails in place</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong>Your action:</strong> Carry out a brief visual check, then proceed to use the scaffold</span>
                  </li>
                </ul>
              </div>

              {/* Yellow */}
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-500/20 border-2 border-yellow-500/50">
                    <ShieldAlert className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-yellow-400">YELLOW (AMBER) &mdash; Restrictions Apply</p>
                    <p className="text-xs text-white/60">Partial scaffold &bull; Read the tag &bull; Avoid restricted areas</p>
                  </div>
                </div>
                <ul className="space-y-1 text-xs text-white/70 ml-13">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-yellow-400" />
                    <span>Some areas are safe to use, others are restricted or incomplete</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-yellow-400" />
                    <span>Tag details which areas are available and which must not be accessed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-yellow-400" />
                    <span><strong>Your action:</strong> Read the tag carefully. Only access permitted areas. If unsure, ask</span>
                  </li>
                </ul>
              </div>

              {/* Red */}
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500/20 border-2 border-red-500/50">
                    <CircleSlash className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-red-400">RED &mdash; Do Not Use</p>
                    <p className="text-xs text-white/60">Unsafe &bull; Under erection/dismantling &bull; Condemned</p>
                  </div>
                </div>
                <ul className="space-y-1 text-xs text-white/70 ml-13">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>Scaffold is unsafe, incomplete, damaged, or being erected/dismantled</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>No exceptions — not for urgent work, not with a harness, not briefly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span><strong>Your action:</strong> Walk away. Report to your supervisor. Find an alternative</span>
                  </li>
                </ul>
              </div>

              {/* No Tag */}
              <div className="bg-white/5 border border-white/20 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border-2 border-white/30">
                    <AlertTriangle className="h-5 w-5 text-white/70" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white/80">NO TAG &mdash; Do Not Use</p>
                    <p className="text-xs text-white/60">Unknown status &bull; Uninspected &bull; Treat as RED</p>
                  </div>
                </div>
                <ul className="space-y-1 text-xs text-white/70 ml-13">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-white/50" />
                    <span>The scaffold&rsquo;s status is unknown — it may be unsafe</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-white/50" />
                    <span>Never assume it is safe because it was previously tagged or looks fine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-white/50" />
                    <span><strong>Your action:</strong> Do NOT use. Report the missing tag immediately</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 07: NASC/CISRS Scafftag System                       */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-500/10 text-slate-400 text-sm font-bold border border-slate-500/20">07</span>
              NASC/CISRS Scafftag System
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>NASC/CISRS Scafftag system</strong> is the industry-standard scaffold tagging system used throughout the United Kingdom. It was developed jointly by the <strong>National Access and Scaffolding Confederation (NASC)</strong> &mdash; the UK trade body for scaffolding contractors &mdash; and the <strong>Construction Industry Scaffolders Record Scheme (CISRS)</strong> &mdash; the industry-recognised training and card scheme for scaffolders. The Scafftag system is endorsed by the Health and Safety Executive (HSE) as a best-practice approach to scaffold status communication and is now mandated by many principal contractors in their site rules.
              </p>

              <p>
                <strong>Key features of the NASC/CISRS Scafftag system:</strong>
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Durable tag holders</strong> &mdash; the system uses robust, weather-resistant plastic tag holders that are designed for outdoor use on construction sites. The holders protect the tag inserts from rain, snow, UV exposure, dust, and physical damage. They are designed to remain legible for extended periods even in harsh weather conditions</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Interchangeable colour-coded inserts</strong> &mdash; the tag holder accepts colour-coded insert cards (green, yellow/amber, red) that can be swapped quickly when the scaffold&rsquo;s status changes. This means the tag holder stays in place at the access point, and only the insert is changed when a new inspection is carried out or the status changes. This is faster and more reliable than removing and replacing an entire tag</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Structured information format</strong> &mdash; the insert cards have pre-printed fields for all required information: inspection date, inspector name, CISRS card number, inspector signature, next inspection due date, scaffold location/reference, scaffolding contractor name, maximum permitted loading, restrictions (for yellow tags), and a unique tag serial number. This standardised format ensures that no critical information is omitted</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Unique serial numbers</strong> &mdash; every Scafftag insert carries a unique serial number that provides full traceability. The serial number links the tag at the access point to the inspection record held by the scaffolding contractor and/or the principal contractor. This means that every inspection can be traced back to a specific tag, a specific inspector, and a specific date. Serial numbers are also useful for auditing tag management and detecting tampering or unauthorised tag changes</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Universal recognition</strong> &mdash; because the NASC/CISRS Scafftag system is used across the UK construction industry, workers moving between sites can immediately recognise and understand the tagging system. This consistency reduces the risk of confusion or misinterpretation that can occur with site-specific bespoke systems</span>
                </li>
              </ul>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-slate-500/10 border border-slate-500/30 rounded-lg p-4">
                  <BadgeCheck className="h-6 w-6 text-slate-400 mb-2" />
                  <p className="text-sm font-semibold text-slate-400 mb-1">Advantages Over Bespoke Systems</p>
                  <ul className="space-y-1 text-xs text-white/70">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                      <span>Standardised format prevents omission of critical information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                      <span>Weather-resistant materials outlast paper or card alternatives</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                      <span>Serial numbers provide audit trail and prevent forgery</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                      <span>Recognised by all construction workers across all sites</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-slate-500/10 border border-slate-500/30 rounded-lg p-4">
                  <ClipboardCheck className="h-6 w-6 text-slate-400 mb-2" />
                  <p className="text-sm font-semibold text-slate-400 mb-1">HSE &amp; Industry Endorsement</p>
                  <ul className="space-y-1 text-xs text-white/70">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                      <span>Endorsed by the HSE as best-practice scaffold status communication</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                      <span>Required in site rules by most major principal contractors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                      <span>Aligned with NASC guidance documents (TG20, SG4, SG6)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                      <span>Integrated with CISRS card scheme for inspector competence verification</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 08: Advanced Scaffolding Inspection Scheme            */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-500/10 text-slate-400 text-sm font-bold border border-slate-500/20">08</span>
              Advanced Scaffolding Inspection Scheme
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>advanced scaffolding inspection scheme</strong> refers to the formal, structured approach to scaffold inspection that goes beyond the basic visual check carried out by everyday users. It is the inspection regime required by the <strong>Work at Height Regulations 2005</strong> (Schedule 7) and the <strong>Construction (Design and Management) Regulations 2015</strong>, and it must be carried out by a <strong>competent person</strong> with specific training, knowledge, and experience in scaffold inspection.
              </p>

              <p>
                <strong>Who can carry out a formal scaffold inspection?</strong>
              </p>

              <p>
                The regulations require the inspector to be a &ldquo;competent person&rdquo; &mdash; someone with sufficient training, practical experience, knowledge, and other qualities to carry out the inspection properly. In the UK scaffolding industry, this typically means a person who holds one of the following CISRS qualifications:
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>CISRS Scaffolding Inspector</strong> &mdash; the primary qualification for scaffold inspection. Holders have completed a dedicated scaffold inspection training course covering structural principles, inspection methodology, defect identification, reporting requirements, and the relevant legislation and standards. This is the most appropriate qualification for carrying out statutory scaffold inspections</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>CISRS Advanced Scaffolder</strong> &mdash; advanced scaffolders who have completed additional training in scaffold inspection may also carry out inspections. Their advanced training covers complex scaffold configurations, design interpretation, and structural assessment, which provides the knowledge base needed for thorough inspections</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Equivalent qualifications</strong> &mdash; persons with equivalent qualifications and demonstrable competence may also be accepted, but they must be able to demonstrate that their training, knowledge, and experience are sufficient for the type of scaffold being inspected. A generic construction qualification (such as a standard CSCS card) is not sufficient on its own</span>
                </li>
              </ul>

              <p>
                <strong>What the advanced inspection covers:</strong>
              </p>

              <p>
                The advanced inspection is a systematic, thorough examination of every component and aspect of the scaffold. It is not a quick walk-around — it requires the inspector to physically access all parts of the scaffold, check every element, and record the findings in a written report. The inspection covers:
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Foundations and base plates</strong> &mdash; adequacy of the ground conditions, sole boards (if required), base plates correctly positioned and in good condition, standards centrally located on base plates, no settlement or movement</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Standards (uprights)</strong> &mdash; plumb, correctly spaced, in good condition (not bent, cracked, or corroded), couplers tight, joints correctly staggered, vertical alignment maintained throughout the full height</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Ledgers (horizontal tubes)</strong> &mdash; level, correctly coupled to standards, at the correct spacing and heights, not bent or damaged</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Bracing</strong> &mdash; diagonal and plan bracing in place in accordance with the design, couplers tight, bracing continuous and not interrupted by missing sections</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Ties</strong> &mdash; correct type, spacing, and number as specified in the design. Ties secure, not loose or missing. Tie fixings into the building adequate and not pulling out. Tie tubes correctly positioned and coupled</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Platforms and boarding</strong> &mdash; fully boarded, boards in good condition (not split, warped, or weakened), boards correctly supported and secured, no gaps exceeding 25 mm, boards extending beyond the supporting ledger by at least 50 mm but no more than four times the board thickness</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Guardrails and toe boards</strong> &mdash; guardrails at the correct height (minimum 950 mm above the working platform), intermediate guardrails or brick guards in place to prevent falls through the gap, toe boards at least 150 mm high, all components secure and not damaged</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span><strong>Access and egress</strong> &mdash; ladders correctly positioned, secured at the top, extending at least 1 metre above the landing platform, access gates or trap doors functioning correctly, internal stairways or ladder access safe and unobstructed</span>
                </li>
              </ul>

              <p>
                Following the inspection, the competent person must <strong>issue a written inspection report</strong> within 24 hours. This report becomes part of the statutory inspection record and must be kept on site until the scaffold is dismantled, then retained by the employer for a minimum of three months after that. The report must identify any defects found, the action taken or recommended, and must be provided to the person on whose behalf the inspection was carried out (typically the principal contractor). If the scaffold passes the inspection, the appropriate tag (green or yellow) is attached at every access point. If the scaffold fails, a red tag is attached and the scaffold must not be used until the defects are rectified and a re-inspection is carried out.
              </p>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white">
                    <strong className="text-slate-400">What To Do If There Is No Tag:</strong> If you arrive at a scaffold and there is no tag displayed at the access point, you must <strong>NOT use the scaffold</strong>. Treat it exactly as you would a red-tagged scaffold. Do not assume the tag has blown off, that someone forgot to put it up, or that the scaffold is safe because it was tagged yesterday. Report the missing tag to your supervisor, site manager, or scaffolding contractor immediately. The scaffold must be inspected by a competent person and a valid tag attached before anyone is permitted to use it. Using an untagged scaffold is a disciplinary offence on most sites and a serious risk to your life.
                  </p>
                </div>
              </div>
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
          title="Section 3 Knowledge Check"
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
            <Link to="../scaffolding-awareness-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-slate-500 text-white hover:bg-slate-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../scaffolding-awareness-module-4-section-4">
              Inspection Records &amp; Reporting
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

      </article>
    </div>
  );
}
