/**
 * Module 1 · Section 3 · Subsection 4 — First-aid facilities and supervision
 * Maps to City & Guilds 2365-03 / Unit 201 / LO3 / AC 3.5 + AC 3.6
 *   AC 3.5 — "state the first aid facilities that must be available in the work area in
 *            accordance with Health and Safety regulations"
 *   AC 3.6 — "explain why it is important not to misuse first aid equipment/supplies and
 *            to replace first aid supplies once used"
 *
 * Layered depth (supplementary):
 *   - 2357 Unit 601 ELTK01 / AC 3.6 + 3.7 — first aid facilities; importance of restocking
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import { TLDR, ConceptBlock, RegsCallout, CommonMistake, Scenario, KeyTakeaways, FAQ, LearningOutcomes, ContentEyebrow, SectionRule } from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'First-aid facilities and supervision (3.5 / 3.6) | Level 3 Module 1.3.4 | Elec-Mate';
const DESCRIPTION = 'L3 first-aid provision — what\'s required, who decides, the EFAW vs FAW distinction, restocking discipline and the supervisor\'s maintenance role.';

const checks = [
  { id: 'l3-m1-s3-sub4-needs', question: 'Who decides what first-aid provision a workplace needs?', options: ['HSE.', 'The employer, via a first-aid needs assessment under the Health and Safety (First Aid) Regs 1981. HSE Approved Code of Practice L74 sets the framework. Factors: nature of work, hazards present, number of employees, accident history, distribution of workforce, presence of vulnerable persons, distance to medical services.', 'The first aider.', 'The customer.'], correctIndex: 1, explanation: 'The needs assessment is the employer\'s document. HSE doesn\'t mandate specific provision; it sets the framework and lets the employer judge. L3 supervisor often contributes the on-site reality input.' },
  { id: 'l3-m1-s3-sub4-restock', question: 'You\'ve used the last bandage from the van first-aid kit. What\'s the L3-grade response?', options: ['Tell no-one.', 'Restock immediately. Notify the firm\'s person responsible for kit maintenance. Do not continue to use the kit until restocked. Update the kit\'s contents log. The kit must be ready for the NEXT incident, which could happen this afternoon.', 'Wait until next month.', 'Buy from a supermarket.'], correctIndex: 1, explanation: 'Restock is non-negotiable. A first-aid kit that\'s been part-used and not restocked can fail at the next incident. The 1981 Regs require provision of first-aid; an empty box doesn\'t discharge the duty.' },
  { id: 'l3-m1-s3-sub4-faw', question: 'What\'s the difference between EFAW and FAW?', options: ['Same thing.', 'Emergency First Aid at Work (EFAW) — 1-day course, 3-year validity, covers immediate life-saving (CPR, AED, choking, bleeding, unconscious casualty, shock). First Aid at Work (FAW) — 3-day course, 3-year validity, EFAW content plus injuries, illness, more advanced response. Annual refresher recommended for both.', 'EFAW is for offices, FAW is for sites.', 'EFAW is shorter, FAW is longer.'], correctIndex: 1, explanation: 'EFAW + FAW are the standard certifications. Choice depends on the first-aid needs assessment outcome — typically FAW required for higher-hazard sites (construction, manufacturing).' },
];

const quizQuestions = [
  { id: 1, question: 'What does the Health and Safety (First Aid) Regulations 1981 require?', options: ['Nothing.', 'Employer to provide adequate and appropriate equipment, facilities and personnel for first aid to employees if injured or taken ill at work. Reg 3 main duty; ACOP L74 gives detail. Provision determined by needs assessment.', 'Everyone be a doctor.', 'A hospital on site.'], correctAnswer: 1, explanation: 'The 1981 Regs are the legal source. ACOP L74 is the practitioner reference.' },
  { id: 2, question: 'What\'s a "first-aid needs assessment"?', options: ['A medical exam.', 'Employer\'s assessment of the first-aid provision needed — kit, facilities, trained persons. Considers nature of work, hazards, employee numbers, accident history, location, vulnerable persons, distance to medical care. Documented; reviewed periodically and after changes.', 'A test for the first aider.', 'An inspection.'], correctAnswer: 1, explanation: 'The needs assessment is the structured way to decide provision. Output drives kit content, training, facilities.' },
  { id: 3, question: 'What does a typical workplace first-aid kit contain (BS 8599-1 small)?', options: ['Just plasters.', 'Per BS 8599-1 (small kit): guidance leaflet, medium dressings (4), large dressings (1), triangular bandages (2), safety pins (6), eye pads (2), adhesive plasters (40), assorted plasters (10), conforming bandages (3), microporous tape (1), disposable gloves (6 pairs), face shield (1), foil blanket (1), cleansing wipes (10), burn gel sachets (2), shears (1).', 'Just gloves.', 'Just bandages.'], correctAnswer: 1, explanation: 'BS 8599-1 is the standard for workplace first-aid kits. Three sizes (small / medium / large) per assessment outcome.' },
  { id: 4, question: 'How often should a first-aid kit be inspected?', options: ['Never.', 'Periodically (typically monthly) by a designated person — check contents against the kit list, replace expired or used items, verify integrity. After each use, immediate restock. Inspection record maintained.', 'Once a decade.', 'Only after use.'], correctAnswer: 1, explanation: 'Monthly inspection + post-use restock is the typical regime. Some items have expiry dates (burn gel, eye-wash); check at inspection.' },
  { id: 5, question: 'Why is misuse of first-aid supplies a problem?', options: ['It isn\'t.', 'Misuse depletes the kit (so it\'s unavailable when needed); risks contamination (single-use items used multiple times); breaches infection control; may cause harm if used inappropriately (e.g. burn gel applied incorrectly). Restocking and proper use are both required by the 1981 Regs duty to provide ADEQUATE first aid.', 'Only if expensive.', 'Only on weekends.'], correctAnswer: 1, explanation: 'Misuse = depletion + contamination + potential harm. The kit is for first aid, not for general convenience.' },
  { id: 6, question: 'What\'s an AED and where should it be?', options: ['A type of cable.', 'Automated External Defibrillator. Increasingly available on construction sites, in commercial premises, in public locations. Delivers electric shock to restart a fibrillating heart. AED units talk the user through the process; minimal training required. Not legally mandated in most workplaces but increasingly part of needs assessment outcomes.', 'A type of breaker.', 'A type of socket.'], correctAnswer: 1, explanation: 'AED + CPR is the survival pathway after cardiac arrest. Increasingly common in workplaces and public spaces. Identifying the nearest AED is part of the L3 dynamic site assessment.' },
  { id: 7, question: 'What\'s the L3 supervisor\'s role with first-aid provision?', options: ['Nothing.', 'Verify provision is adequate for the work; inspect kits before/during work; restock after use; ensure trained persons available; brief team on emergency procedures (location of kit, AED, trained persons, nearest A&E); maintain inspection records.', 'Wear plasters.', 'Eat the burn gel.'], correctAnswer: 1, explanation: 'L3 supervisor = first-aid provision custodian on site. Doesn\'t replace the firm\'s designated first aider but ensures the system is operational.' },
  { id: 8, question: 'What\'s the legal minimum first-aid provision?', options: ['Nothing required.', 'No fixed minimum in regulations — driven by needs assessment. HSE ACOP L74 gives indicative numbers (low-hazard: 1 appointed person for &lt;25 employees; 1 EFAW for 25-50; 1 FAW for &gt;50; high-hazard: more demanding). Construction and electrical work generally falls in higher-hazard band.', 'One plaster.', 'A whole hospital.'], correctAnswer: 1, explanation: 'Needs-driven, not fixed. ACOP L74 indicative ratios are starting point.' },
];

const faqs = [
  { question: 'Can I render first aid to a customer (non-employee)?', answer: 'Yes — first-aid kit duty is to employees but rendering aid to a non-employee in good faith is protected (Social Action, Responsibility and Heroism Act 2015). Document the use; restock; log.' },
  { question: 'Are the contents of the kit the same for all sites?', answer: 'No — needs assessment varies. Small kits for low-hazard small sites; large kits for high-hazard or high-headcount sites. BS 8599-1 specifies three sizes. Construction/industrial often add specific items (eye-wash, burn dressings, splints).' },
  { question: 'Who is the "appointed person" under the First Aid Regs?', answer: 'A designated person (not necessarily trained first aider) responsible for managing first-aid arrangements, calling emergency services, looking after the equipment. For very low-hazard sites with &lt;25 employees this can be the minimum provision.' },
  { question: 'Do I have to be trained to use a first-aid kit?', answer: 'For basic items (plasters, dressings) anyone can use them in good faith. For trained-first-aider equipment (AED, advanced dressings) the trained first aider should normally take the lead. EFAW or FAW certification is required for designated workplace first aiders.' },
  { question: 'What\'s the rule on prescription medicines in a first-aid kit?', answer: 'No prescription medicines in workplace first-aid kits — even paracetamol/aspirin are generally excluded under HSE guidance because individual fitness varies. Burn gel, dressings, eye-wash etc are non-medicinal first-aid items and are fine.' },
  { question: 'How is the L3 supervisor verified as discharging the first-aid duty?', answer: 'Inspection records signed and dated; kit contents log current; trained persons identified on the firm\'s training matrix; needs assessment current. After an incident, this evidence is what shows the duty was discharged.' },
];

export default function Sub4() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);
  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section3')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"><ArrowLeft className="h-4 w-4" /> Section 3</button>
          <PageHero eyebrow="Module 1 · Section 3 · Subsection 4" title="First-aid facilities and supervision" description="Remember from L2 — first-aid provision is required and you don't misuse it. At L3 you understand the needs-assessment framework, the EFAW vs FAW distinction and the supervisor's maintenance role." tone="emerald" />
          <TLDR points={[
            "Health and Safety (First Aid) Regs 1981 — adequate provision; needs-driven via employer assessment per HSE ACOP L74.",
            "Three trained tiers: Appointed Person (manages provision, no first-aid skills required), Emergency First Aid at Work (EFAW, 1-day), First Aid at Work (FAW, 3-day). Construction generally requires FAW.",
            "BS 8599-1 specifies workplace kit contents in three sizes. Inspection monthly; restock immediately after use.",
          ]} />
          <LearningOutcomes outcomes={[
            "State the first-aid facilities that must be available in the work area per the Health and Safety (First Aid) Regs 1981.",
            "Identify the three tiers of trained person — appointed, EFAW, FAW.",
            "Apply the first-aid needs assessment framework (ACOP L74).",
            "State why it's important not to misuse first-aid equipment / supplies and to restock after use.",
            "Identify BS 8599-1 kit content standards.",
            "Apply the L3 supervisor's first-aid provision verification routine.",
          ]} initialVisibleCount={3} />

          <ContentEyebrow>Legal framework</ContentEyebrow>
          <ConceptBlock title="The 1981 Regs and ACOP L74" plainEnglish="The Health and Safety (First Aid) Regulations 1981 require employers to provide adequate and appropriate equipment, facilities and personnel. Approved Code of Practice L74 (and HSE guidance INDG214) gives the practitioner detail. Provision is needs-driven, not fixed-by-law." onSite="At L3 you should know the framework and recognise that 'is our provision adequate?' is a real question, not a tick-box. Construction work generally sits in the higher-hazard band requiring more provision than office work.">
            <p>What 'adequate' provision typically includes:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Equipment</strong> — first-aid kit per BS 8599-1, sized to needs.</li>
              <li><strong>Facilities</strong> — somewhere to deliver first aid privately (where appropriate); first-aid room for larger sites.</li>
              <li><strong>Personnel</strong> — appointed person at minimum; EFAW or FAW trained for higher provision.</li>
              <li><strong>Information</strong> — notices indicating location of kit, identity of first aider, emergency numbers.</li>
              <li><strong>Vehicle kit</strong> — for mobile workforces (electricians) BS 8599-2 vehicle kit standard applies.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Health and Safety (First Aid) Regulations 1981 — Reg 3(1)" clause={<>"An employer shall provide, or ensure that there are provided, such equipment and facilities as are adequate and appropriate in the circumstances for enabling first-aid to be rendered to his employees if they are injured or become ill at work."</>} meaning={<>The Reg 3 duty. &quot;Adequate and appropriate&quot; is judged by the needs assessment. ACOP L74 gives indicative numbers but ultimately the employer&apos;s judgement of the workplace risk drives provision.</>} cite="Source: Health and Safety (First Aid) Regulations 1981 (SI 1981/917), Reg 3 — verbatim from legislation.gov.uk." />

          <InlineCheck {...checks[0]} />

          <SectionRule />
          <ContentEyebrow>The three tiers of trained person</ContentEyebrow>
          <ConceptBlock title="Appointed Person, EFAW, FAW" plainEnglish="Three tiers of training. Appointed Person — designated to manage provision (no medical skills required). EFAW — 1-day life-saving (CPR, AED, choking, bleeding, unconscious, shock). FAW — 3-day, EFAW content plus injuries and illness. All certifications run 3 years; annual refresher recommended." onSite="Most electrical-trade firms train all operatives to EFAW minimum and have FAW first aiders allocated across the team. L3 + EFAW is now the typical entry-level baseline; FAW is increasingly required for L3 supervisors.">
            <p>Indicative numbers from ACOP L74 (low-hazard band):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>&lt;25 employees — Appointed Person.</li>
              <li>25-50 employees — at least 1 EFAW or FAW.</li>
              <li>50+ employees — at least 1 FAW per 100 employees, plus more EFAW.</li>
              <li>Higher-hazard band (construction, electrical, manufacturing) — more demanding ratios; FAW preferred.</li>
              <li>Lone or remote working — additional considerations (response time, communications).</li>
              <li>Vulnerable persons or specific hazards — bespoke arrangements.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="BS 8599 kit standards" plainEnglish="BS 8599-1 covers workplace first-aid kits in three sizes (small / medium / large). BS 8599-2 covers vehicle (motor vehicle) first-aid kits. Both specify minimum contents and provide a recommended replacement / inspection regime." onSite="Replacing the firm\'s old generic kits with BS 8599-1 kits is a low-cost compliance win. Most suppliers stock them; £30-£60 per kit typical.">
            <p>BS 8599-1 small kit contents (illustrative):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Guidance leaflet × 1</li>
              <li>Medium dressings × 4</li>
              <li>Large dressings × 1</li>
              <li>Triangular bandages × 2</li>
              <li>Safety pins × 6</li>
              <li>Eye pads × 2</li>
              <li>Adhesive plasters (assorted) × 40-60</li>
              <li>Conforming bandages × 3</li>
              <li>Microporous tape × 1</li>
              <li>Disposable gloves × 6 pairs</li>
              <li>Face shield × 1</li>
              <li>Foil survival blanket × 1</li>
              <li>Cleansing wipes × 10</li>
              <li>Burn gel sachets × 2</li>
              <li>Shears × 1</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />
          <InlineCheck {...checks[2]} />

          <SectionRule />
          <ContentEyebrow>Supervision and maintenance</ContentEyebrow>
          <ConceptBlock title="Inspection regime" plainEnglish="Monthly inspection by a designated person. Check contents against the kit list. Replace expired or used items. Verify integrity (seals intact for sterile items). Log maintained." onSite="Most firms use a tear-off inspection card on the kit; some use digital systems. L3 supervisor verifies the system is operational, particularly on van kits where the operative is also the kit custodian.">
            <p>Inspection items:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Contents match kit list (no missing items).</li>
              <li>No expired items (burn gel, eye-wash, antiseptic wipes have expiry dates).</li>
              <li>Sterile-pack seals intact.</li>
              <li>Kit container undamaged and clearly identified.</li>
              <li>Log signed and dated.</li>
              <li>Recent uses recorded (date, what was used, refilled).</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Why misuse and non-restock matter" plainEnglish="A first-aid kit only discharges the legal duty if it\'s actually available when the next incident happens. Misuse (using sterile items twice, applying burn gel to non-burns, taking plasters home) depletes the kit. Failure to restock leaves a gap that can be fatal." onSite="Treat the first-aid kit as critical equipment. Same discipline as test instruments — checked, used as intended, replenished after use, inspected periodically.">
            <p>Common misuse / non-restock issues:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Plasters taken for general home use.</li>
              <li>Burn gel applied as a moisturiser.</li>
              <li>Sterile dressings used to wipe surfaces.</li>
              <li>Eye-wash used as drinking water.</li>
              <li>Used items not replaced.</li>
              <li>Expired items not removed.</li>
              <li>Kit raided for tools (scissors, tape).</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Incident response and the wider duty</ContentEyebrow>
          <ConceptBlock title="Calling 999 — when, what to say" plainEnglish="For any incident where life or limb is at risk, call 999 immediately. State location (precise — postcode, what3words, building name); state the casualty&apos;s condition (conscious / breathing); state the cause (electric shock, fall, burn, chemical); state any ongoing hazard (live equipment, fire, smoke); follow controller&apos;s instructions; stay on the line." onSite="The L3 supervisor decision to call 999 is conservative — call early, downgrade later if needed. Operatives sometimes hesitate (\&quot;they&apos;re probably OK\&quot;); the supervisor calls anyway. The few minutes of ambulance time saved by an early call can be the difference between recovery and worse.">
            <p>Information to give the controller:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Location — postcode, building name, access route, what3words.</li>
              <li>Casualty condition — conscious, breathing, bleeding, burns, fall.</li>
              <li>Cause — what happened (electric shock, fall from height, fire).</li>
              <li>Ongoing hazard — is the supply still live? is there fire? smoke?</li>
              <li>Number of casualties.</li>
              <li>Stay on line; let controller direct response.</li>
              <li>Send someone to meet ambulance at site entry to guide.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Electric shock first-aid response" plainEnglish="If casualty is in contact with live equipment, ISOLATE FIRST — never touch the casualty until current is removed (you become the second casualty). Then 999, ABC primary survey, CPR + AED if no breathing / no pulse. All electric shock casualties need A&amp;E assessment regardless of how they appear; cardiac arrhythmia can develop hours later." onSite="The L3 supervisor leads the response. Don&apos;t freeze; don&apos;t touch; isolate; 999; CPR / AED if needed. Brief the team in advance so they know not to touch the casualty before you confirm isolation.">
            <p>Electric shock response sequence:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>STOP — assess, don&apos;t become second casualty.</li>
              <li>ISOLATE the supply (cut-out fuse withdrawal, RCD, MCB, isolator — whatever is fastest and safest).</li>
              <li>If isolation impossible, separate casualty from source using INSULATING material (wooden broom handle, dry rope) — never bare hands.</li>
              <li>999 — describe as electric shock; state ongoing hazard.</li>
              <li>ABC primary survey — Airway, Breathing, Circulation.</li>
              <li>CPR / AED if no breathing or no pulse.</li>
              <li>Treat burns (cool water, cover loosely).</li>
              <li>Keep casualty warm; reassure; await ambulance.</li>
              <li>Mandatory A&amp;E assessment for ALL electric shock casualties.</li>
              <li>Preserve scene; RIDDOR if specified injury or 7+ day absence.</li>
            </ol>
          </ConceptBlock>

          <ConceptBlock title="RIDDOR — when reporting becomes a separate duty" plainEnglish="The Reporting of Injuries, Diseases and Dangerous Occurrences Regs 2013 require the responsible person to report specific incidents to HSE. Categories: fatalities, specified injuries (including electric shock causing unconsciousness, burns &gt;10% body, amputations), 7+ day absence injuries, occupational diseases, dangerous occurrences." onSite="The L3 supervisor often is first to recognise a RIDDOR-reportable event. Notification is via the F2508 online form; specified injuries must be phoned to HSE immediately. The reporting duty sits with the employer / responsible person but the operative supplies the contemporaneous account.">
            <p>Common electrical-trade RIDDOR triggers:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Electric shock causing unconsciousness or hospitalisation &gt;24h.</li>
              <li>Burn &gt;10% body or to eyes / vital organs.</li>
              <li>Amputation (e.g. crush from gear).</li>
              <li>Fall from height &gt;2m causing injury.</li>
              <li>Any 7+ day absence injury.</li>
              <li>Dangerous occurrence (electrical short circuit causing fire / explosion / failure of safety device).</li>
              <li>Occupational disease (silicosis, occupational dermatitis, hand-arm vibration syndrome, asthma).</li>
              <li>Notification within 10 days for 7-day injuries; immediate phone for fatal / specified.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Health and Safety (First Aid) Regulations 1981 — Reg 4 (Information for employees)" clause={<>"An employer shall inform his employees of the arrangements that have been made in connection with the provision of first-aid, including the location of equipment, facilities and personnel."</>} meaning={<>Reg 4 — operatives must KNOW where the kit is, who the first aiders are, what the procedure is. Posting notices at site entry, in the welfare room, in vehicles is the typical discharge. The L3 supervisor briefs the team on day 1 and refreshes when a site or arrangements change.</>} cite="Source: Health and Safety (First Aid) Regulations 1981 (SI 1981/917), Reg 4 — verbatim from legislation.gov.uk." />

          <RegsCallout source="RIDDOR 2013 — Reg 4 (Specified injuries)" clause={<>"Where any person dies as a result of a work-related accident, the responsible person must follow the reporting procedure. Where any person at work suffers any of the specified injuries (Schedule 1), the responsible person must follow the reporting procedure."</>} meaning={<>RIDDOR Reg 4 + Schedule 1 — the specified injury list. Electric shock causing unconsciousness, &gt;24h hospitalisation, &gt;10% burns, amputations, scalpings — all require immediate notification. The first-aid response and the RIDDOR notification are parallel duties: treat the casualty AND report the event.</>} cite="Source: Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (SI 2013/1471), Reg 4 + Sched 1 — verbatim from legislation.gov.uk." />

          <SectionRule />
          <CommonMistake title="Discovering the kit is empty when it\'s needed" whatHappens={<>Apprentice cuts hand badly on a sharp edge. Goes to the van first-aid kit; finds it&apos;s been raided over the last month and there are no dressings. Bleeding continues; trip to A&amp;E required for what could have been controlled on site. Firm prosecuted under First Aid Regs Reg 3 — provision was inadequate at the time of need.</>} doInstead={<>Monthly inspection + post-use restock. Don&apos;t use the kit for non-first-aid purposes. Treat it as critical equipment.</>} />

          <CommonMistake title="Assuming the customer\'s kit is available" whatHappens={<>Operative on customer site assumes the building&apos;s first-aid kit is accessible if needed. Has an injury; building first-aid kit is locked and the keyholder is off site. Delay in treatment. Firm hadn&apos;t provided own kit on the assumption customer&apos;s would be available; First Aid Regs Reg 3 breach.</>} doInstead={<>Always carry firm&apos;s own kit. Customer / building&apos;s kit may be available but isn&apos;t a substitute for the firm&apos;s own provision under Reg 3.</>} />

          <Scenario title="Setting up first-aid for a small refurbishment job" situation={<>You\'re leading a 3-week commercial refurbishment with 2 L2 apprentices and yourself. The site is a vacant unit you have keys to; no other contractors most days; nearest hospital A&E is 8 minutes drive. You need to set up first-aid arrangements for the project.</>} whatToDo={<>Apply the needs assessment. Three operatives, electrical-trade hazards (cuts, burns, falls, electrical shock potential), construction site, vacant unit (no on-site first-aider from customer), 8-minute drive to A&amp;E. Provision: (1) BS 8599-1 medium kit on site (more comfortable than small for 3 operatives); (2) BS 8599-2 vehicle kit in each van (in case of off-site response); (3) at least one FAW-trained operative on site daily — verify rotas; (4) AED location identified (nearest public AED via thecircuit.uk); (5) emergency contact list posted at site entry; (6) brief all operatives on day 1: kit location, FAW first aider, emergency procedure, A&amp;E address; (7) inspection schedule (weekly given small team and short project); (8) post-use restock discipline. Document the arrangements in the construction phase plan / RAMS. Review periodically through the project.</>} whyItMatters={<>The needs assessment is the structured way to discharge the Reg 3 duty. A 3-person small refurbishment is the kind of job where defaulting to &quot;just bring your van kit&quot; is the most common failure. The 8-minute A&amp;E proximity is a positive factor; the lack of on-site first-aider from customer is a negative factor that requires the firm to provide its own. Documentation of the assessment is what discharges the duty in the inspector&apos;s eyes after any incident.</>} />

          <SectionRule />
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            "Remember from L2 — first aid provision required, don\'t misuse, restock after use.",
            "Health and Safety (First Aid) Regs 1981 + ACOP L74 — needs-driven provision via employer assessment.",
            "Three tiers: Appointed Person, EFAW (1-day), FAW (3-day). 3-year validity; annual refresher.",
            "BS 8599-1 workplace kit contents (small/medium/large); BS 8599-2 vehicle kit.",
            "Construction generally requires FAW-level provision and BS 8599-1 medium+ kits.",
            "Monthly inspection + post-use restock + log. Treat kit as critical equipment.",
            "Misuse depletes the kit, risks contamination, may breach infection control. Discipline matters.",
            "L3 supervisor verifies provision adequate, kit inspected, FAW persons available, briefed.",
          ]} />
          <Quiz title="First-aid facilities — knowledge check" questions={quizQuestions} />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section3-3')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">3.3 PPE selection and verification</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section3-5')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">3.5 Safe practices supervision</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
