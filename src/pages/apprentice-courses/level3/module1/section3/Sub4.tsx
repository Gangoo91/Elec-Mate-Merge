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
  { question: 'What is the relationship between the first-aid needs assessment and the firm\'s MHSWR Reg 3 risk assessment?', answer: 'The MHSWR Reg 3 risk assessment identifies hazards and the harms they could cause; the first-aid needs assessment then asks "given those harms, what provision do we need to respond?". So a hazard register that lists "electric shock" feeds a needs assessment that includes AED location and trained CPR responder; a register listing "chemical splash" feeds a needs assessment that includes eye-wash provision. They are complementary documents not duplicates.' },
  { question: 'How long should first-aid records be kept?', answer: 'HSE recommends retaining accident-book entries for at least 3 years from date of the entry. Records of treatment given (the firm\'s incident report; first-aider\'s notes) should be retained on the same basis. Where the casualty was under 18 at the time of injury, records should be kept until they reach the age of 21 plus 3 years. Personal data within records is also subject to GDPR retention principles — keep no longer than necessary.' },
  { question: 'What is "psychological first aid" and is it required in workplace provision?', answer: 'Psychological first aid (PFA) is short-term support for someone experiencing acute distress after an incident. Not legally required as a separate provision in most workplaces, but increasingly seen as good practice particularly after serious incidents. Mental Health First Aiders (MHFA-qualified) are increasingly part of larger firms\' provision; the L3 supervisor recognising someone in shock and signposting to appropriate support is part of mature post-incident care.' },
  { question: 'Does the customer\'s "appointed first aider" cover my employees on their site?', answer: 'No. The First Aid Regs duty is to your own employees; it is not transferable to the customer. The customer may have their own provision for their staff and for visitors, but your employees remain your responsibility. On commercial sites coordination with the customer\'s arrangements is sensible (joint procedures, mutual aid agreements) but the legal duty stays with the employer.' },
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
            "Chain of survival — recognition, CPR, defibrillation, advanced care. First three sit with the on-site responder; minute-by-minute action determines outcome.",
            "Burns: cool under cool running water for 20 minutes (even up to 3 hours later); cover loosely; call. All electrical burns require A&E assessment regardless of size.",
            "RIDDOR triggers parallel to first-aid response — specified injuries notifiable immediately; F2508 within 10 days for 7-day absence injuries.",
          ]} />
          <LearningOutcomes outcomes={[
            "State the first-aid facilities that must be available in the work area per the Health and Safety (First Aid) Regs 1981.",
            "Identify the three tiers of trained person — appointed, EFAW, FAW.",
            "Apply the first-aid needs assessment framework (ACOP L74).",
            "State why it's important not to misuse first-aid equipment / supplies and to restock after use.",
            "Identify BS 8599-1 kit content standards.",
            "Apply the L3 supervisor's first-aid provision verification routine.",
            "Apply the Resuscitation Council UK chain of survival in a workplace cardiac-arrest event.",
            "Apply the burns 20-minute cooling rule and recognise the A&E criteria for burns.",
            "Apply the chemical eye-splash flushing protocol (15-minute minimum).",
            "Recognise RIDDOR triggers running in parallel to first-aid response.",
            "Preserve the incident scene appropriately for subsequent investigation.",
            "Apply bespoke first-aid arrangements for lone working, work at height, confined space and remote sites.",
            "Maintain contemporaneous notes after any incident as the foundation of subsequent investigation.",
            "Coordinate first-aid arrangements with customers and other contractors on shared sites.",
          ]} initialVisibleCount={3} />

          <ContentEyebrow>Legal framework</ContentEyebrow>
          <ConceptBlock title="The 1981 Regs and ACOP L74" plainEnglish="The Health and Safety (First Aid) Regulations 1981 require employers to provide adequate and appropriate equipment, facilities and personnel. Approved Code of Practice L74 (and HSE guidance INDG214) gives the practitioner detail. Provision is needs-driven, not fixed-by-law." onSite="At L3 you should know the framework and recognise that 'is our provision adequate?' is a real question, not a tick-box. Construction work generally sits in the higher-hazard band requiring more provision than office work.">
            <p>What 'adequate' provision typically includes:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Equipment</strong> — first-aid kit per BS 8599-1, sized to needs; eye-wash provision where chemical or dust contact is foreseeable; additional dressings for high-risk activities.</li>
              <li><strong>Facilities</strong> — somewhere to deliver first aid privately (where appropriate); first-aid room for larger sites with examination couch, washing facilities, clinical waste container.</li>
              <li><strong>Personnel</strong> — appointed person at minimum; EFAW or FAW trained for higher provision; consideration of mental-health first aiders for larger workforces.</li>
              <li><strong>Information</strong> — notices indicating location of kit, identity of first aider, emergency numbers, what3words location and nearest A&amp;E address.</li>
              <li><strong>Vehicle kit</strong> — for mobile workforces (electricians) BS 8599-2 vehicle kit standard applies; one kit per vehicle treated as the operative&apos;s &apos;moving workplace&apos; provision.</li>
              <li><strong>AED access plan</strong> — where the needs assessment supports, location of on-site AED or identification of the nearest accessible public AED via thecircuit.uk.</li>
              <li><strong>Communications</strong> — phone signal coverage on site; backup arrangements for lone or remote workers (radio, satellite, sat-phone).</li>
              <li><strong>Review trigger</strong> — provision reviewed after significant change to workforce, premises, equipment or following any incident.</li>
              <li><strong>Records</strong> — needs assessment signed and dated; inspection logs; training records of first aiders held current.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Health and Safety (First Aid) Regulations 1981 — Reg 3(1)" clause={<>"An employer shall provide, or ensure that there are provided, such equipment and facilities as are adequate and appropriate in the circumstances for enabling first-aid to be rendered to his employees if they are injured or become ill at work."</>} meaning={<>The Reg 3 duty. &quot;Adequate and appropriate&quot; is judged by the needs assessment. ACOP L74 gives indicative numbers but ultimately the employer&apos;s judgement of the workplace risk drives provision.</>} cite="Source: Health and Safety (First Aid) Regulations 1981 (SI 1981/917), Reg 3." />

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
              <li>Kit located where it can be reached within seconds (not behind locked doors during working hours).</li>
              <li>Signage to kit current and visible from key working positions.</li>
              <li>AED battery indicator green (where on-site AED held); pad expiry checked.</li>
              <li>Eye-wash bottle within seal date and not previously opened.</li>
              <li>Disposable items (gloves, face shields) sufficient for the current team size.</li>
              <li>Burn-gel stock current — short shelf life (typically 24-36 months) means frequent rotation.</li>
              <li>Foil blanket sealed pack intact — single-use item easily depleted.</li>
              <li>Vehicle kit secured against theft and protected from extreme heat / cold.</li>
              <li>Inspection findings actioned within working week — not deferred to &apos;next month&apos;.</li>
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
              <li>Sterile gloves used for tasks other than first-aid response (e.g. mucky job protection).</li>
              <li>Triangular bandages used as makeshift dust filters or scarves.</li>
              <li>Whole sub-kits transferred from van to van without restocking the donor.</li>
              <li>Burn-gel sachets opened to test consistency, then re-bagged.</li>
              <li>Single-use face shields wiped and returned to box for next use.</li>
              <li>Foil blanket used to wrap food / parcels and disposed of.</li>
              <li>Cleansing wipes pocketed for personal hand-cleaning between tasks.</li>
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
              <li>Death of a self-employed person on a workplace (still reportable).</li>
              <li>Member of the public taken to hospital as a result of work activity.</li>
              <li>Specified injury to a member of the public (fractures, amputations, loss of consciousness).</li>
              <li>Member-of-public RIDDOR triggers often missed by firms used to thinking only about employees.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Eye injury, chemical splash and emergency washing</ContentEyebrow>

          <ConceptBlock
            title="Eye-wash provision and the chemical-splash response"
            plainEnglish="Chemical splash to the eye is one of the most time-critical first-aid scenarios — corneal damage occurs within seconds for strong acids and bases, and the only effective intervention is immediate copious flushing with sterile saline or clean water. Sterile saline pods in the workplace first-aid kit are intended for foreign-body removal and short-duration irrigation; for serious chemical contact, plumbed-in or large-volume emergency eye-wash provision is needed for the recommended 15-minute continuous flush. The provision required depends on the COSHH risk assessment of substances handled. After flushing, the casualty needs urgent A&E review — corneal damage that looks superficial at first can deteriorate over the following hours."
            onSite="On any project involving cement, concrete, alkaline cleaners, battery electrolyte, solvents or refrigerant gases, the L3 supervisor verifies the eye-wash provision is appropriate for what could happen, not just for the trivial &apos;something in the eye&apos; case. Plumbed-in emergency eye-wash stations in plant rooms; portable squeeze-bottle stations on van kits; clear signage to nearest station; expiry dates checked at inspection. Operatives briefed: if chemical hits the eye, flush IMMEDIATELY, keep flushing for the full 15 minutes, then 999 / A&amp;E."
          >
            <p>Eye-injury first-aid essentials:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Remove contact lenses</strong> if worn — they trap chemical against the
                cornea and worsen damage.
              </li>
              <li>
                <strong>Flush immediately</strong> — copious clean / saline water; hold eyelid
                open; flush from inner corner outward so contaminated water doesn&apos;t enter
                the other eye.
              </li>
              <li>
                <strong>Continue for at least 15 minutes</strong> — chemicals especially
                alkalis penetrate fast; ongoing flushing limits the depth of injury.
              </li>
              <li>
                <strong>Do not rub the eye</strong> — adds mechanical injury to chemical.
              </li>
              <li>
                <strong>Cover the eye loosely with a sterile pad after flushing</strong> —
                avoid pressure.
              </li>
              <li>
                <strong>Identify the substance</strong> — bring SDS or container to A&amp;E if
                possible.
              </li>
              <li>
                <strong>Transport to A&amp;E or call 999</strong> — depending on severity; all
                chemical splash should be assessed by an ophthalmologist.
              </li>
              <li>
                <strong>Penetrating foreign body</strong> — do NOT attempt to remove; stabilise
                with padding around the object; cover with cup or eye shield; urgent A&amp;E.
              </li>
              <li>
                <strong>Arc-flash / UV exposure</strong> — &apos;welder&apos;s flash&apos;,
                photokeratitis; symptoms hours later (gritty, painful, light-sensitive); cool
                dark room and A&amp;E if persistent.
              </li>
              <li>
                <strong>Documentation</strong> — RIDDOR specified injury if loss of sight (even
                temporary) for &gt;24h; F2508 plus incident investigation.
              </li>
            </ol>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Specific high-risk scenarios — lone working, work at height, confined space</ContentEyebrow>

          <ConceptBlock
            title="Why standard first-aid provision fails on non-standard sites"
            plainEnglish="Standard workplace first-aid provision assumes a multi-person team with mutual aid, road access for the ambulance and reasonable communications. Several common electrical-trade scenarios break those assumptions. Lone working — no colleague to render aid; communications may be the only lifeline. Work at height — casualty may be suspended in a harness with the additional risk of suspension trauma; recovery requires specific equipment and training. Confined space — atmosphere may be hazardous to the rescuer; the standard reflex to enter the space is wrong without breathing apparatus. Remote sites — ambulance response time may be 30 minutes plus. Each of these scenarios needs the needs assessment to address it explicitly with bespoke arrangements."
            onSite="The L3 supervisor on any non-standard site asks: what does our first-aid arrangement look like when the worst credible event happens here? If the answer is &apos;we rely on the standard van kit and 999&apos; the assessment may be inadequate. The answer might be: lone-worker check-in regime via app or scheduled call; harness with quick-release plus colleague available within rescue window for at-height work; confined-space permit with trained attendant outside and recovery equipment; satellite communications for remote sites. The bespoke provision flows from the bespoke risk."
          >
            <p>Non-standard scenarios and bespoke first-aid considerations:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Lone working</strong> — scheduled check-ins, lone-worker app with
                automatic alert if missed, satellite communications where signal absent,
                personal panic alarm, daily plan shared with someone who will notice an
                absence.
              </li>
              <li>
                <strong>Work at height with harness</strong> — suspension trauma risk
                (unconscious harness suspension can be fatal within 15-20 minutes from
                venous pooling); rescue plan with trained colleague and equipment available
                within rescue window; never harness-only without an active recovery plan.
              </li>
              <li>
                <strong>Confined space entry</strong> — Confined Spaces Regulations 1997
                require emergency arrangements in addition to the permit; trained attendant
                outside; recovery equipment (harness, tripod, davit, winch); never rely on
                fire and rescue service alone for the rescue; gas detection continuous.
              </li>
              <li>
                <strong>Remote sites (rural, offshore, island)</strong> — extended ambulance
                response means first aiders must hold the casualty stable for longer; FAW
                training rather than EFAW; better equipped kit; helicopter-medivac
                arrangements where appropriate.
              </li>
              <li>
                <strong>Multi-occupancy sites</strong> — coordinate provision across
                employers via principal contractor; shared first-aid room where appropriate;
                joint exercises and familiarity with each other&apos;s procedures.
              </li>
              <li>
                <strong>Customer-premises occupied with vulnerable persons</strong> — care
                home, school, hospital; provision must consider the customer&apos;s
                arrangements but cannot rely on them for the firm&apos;s employees; vulnerable
                non-employees expand the s.3 duty.
              </li>
              <li>
                <strong>Night work</strong> — fewer colleagues on site; reduced support;
                fatigue increases incident risk; first-aid arrangements must function with
                skeleton crew.
              </li>
              <li>
                <strong>Working in extreme weather</strong> — hypothermia / heatstroke risk
                added to other hazards; provision includes thermal blankets, warm drinks,
                cooling provision where appropriate.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Cross-reference table — first-aid response by injury type</ContentEyebrow>

          <ConceptBlock
            title="Quick-reference response framework the L3 supervisor can apply under pressure"
            plainEnglish="Different injury types need different immediate responses. The pattern is consistent — protect the casualty from further harm, manage the airway-breathing-circulation, treat the specific injury, call appropriate help, document — but the specifics shift for each injury type. Memorising the patterns means the L3 supervisor can act fast rather than scrambling to recall what to do."
            onSite="The reference framework lives in your head before the incident, not in a manual you have to find afterwards. Practice the responses during quiet times — table-top exercises with the team go a long way. Most first-aid courses include scenario rehearsal precisely because muscle memory matters when seconds count."
          >
            <p>Cross-reference of common workplace injuries and their priority responses:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Electric shock with unconsciousness</strong> — isolate; 999; CPR + AED;
                A&amp;E mandatory; RIDDOR specified injury; preserve scene.
              </li>
              <li>
                <strong>Electric shock conscious but symptomatic</strong> — isolate; sit
                casualty down; monitor; A&amp;E mandatory (arrhythmia can develop hours later);
                document.
              </li>
              <li>
                <strong>Thermal burn</strong> — cool 20 mins under cool running water; cover
                loosely; A&amp;E if &gt; palm size, deep, face / hands / feet / genitals, or any
                electrical burn.
              </li>
              <li>
                <strong>Chemical burn or splash</strong> — flush 15 mins minimum; identify
                substance from SDS; A&amp;E with SDS info; cover loosely after flushing.
              </li>
              <li>
                <strong>Eye injury — chemical</strong> — flush 15 mins; remove contact lenses;
                cover loosely after flushing; A&amp;E ophthalmology.
              </li>
              <li>
                <strong>Eye injury — foreign body or penetrating</strong> — do NOT remove
                embedded object; stabilise with padding; eye shield; A&amp;E.
              </li>
              <li>
                <strong>Severe bleeding</strong> — direct pressure; elevate; tourniquet if
                catastrophic limb bleed (above injury, tighten until bleeding stops, note
                time, never release without medical supervision); 999.
              </li>
              <li>
                <strong>Suspected fracture</strong> — do not move unnecessarily; support in
                position found; cold pack to reduce swelling; A&amp;E.
              </li>
              <li>
                <strong>Suspected spinal injury</strong> — do not move; immobilise head if
                you must; 999 immediately; speak to maintain conscious state.
              </li>
              <li>
                <strong>Choking — adult conscious</strong> — encourage cough; 5 back blows; 5
                abdominal thrusts; alternate; 999 if not cleared.
              </li>
              <li>
                <strong>Heart attack — chest pain plus other signs</strong> — 999; sit
                casualty down in &apos;W&apos; position; aspirin 300 mg if conscious and not
                allergic; reassure; AED ready in case of arrest.
              </li>
              <li>
                <strong>Stroke — FAST signs</strong> — Face drop, Arm weakness, Speech
                difficulty, Time-critical; 999; note time of onset.
              </li>
              <li>
                <strong>Seizure</strong> — protect from injury (move objects, cushion head);
                do not restrain; do not put anything in mouth; time the seizure; 999 if
                &gt;5 minutes or first-time.
              </li>
              <li>
                <strong>Severe allergic reaction (anaphylaxis)</strong> — 999; epi-pen if
                prescribed and available; sit / lie casualty; monitor airway.
              </li>
              <li>
                <strong>Suspected hypothermia</strong> — gentle re-warming; remove wet
                clothing; insulate; warm sweet drinks if conscious; A&amp;E.
              </li>
              <li>
                <strong>Suspected heat-stroke</strong> — move to cool area; cool with damp
                cloths and fanning; sip water if conscious; 999 if confused / unconscious.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Health and Safety (First Aid) Regulations 1981 — Reg 4 (Information for employees)" clause={<>"An employer shall inform his employees of the arrangements that have been made in connection with the provision of first-aid, including the location of equipment, facilities and personnel."</>} meaning={<>Reg 4 — operatives must KNOW where the kit is, who the first aiders are, what the procedure is. Posting notices at site entry, in the welfare room, in vehicles is the typical discharge. The L3 supervisor briefs the team on day 1 and refreshes when a site or arrangements change.</>} cite="Source: Health and Safety (First Aid) Regulations 1981 (SI 1981/917), Reg 4." />

          <RegsCallout source="RIDDOR 2013 — Reg 4 (Specified injuries)" clause={<>"Where any person dies as a result of a work-related accident, the responsible person must follow the reporting procedure. Where any person at work suffers any of the specified injuries (Schedule 1), the responsible person must follow the reporting procedure."</>} meaning={<>RIDDOR Reg 4 + Schedule 1 — the specified injury list. Electric shock causing unconsciousness, &gt;24h hospitalisation, &gt;10% burns, amputations, scalpings — all require immediate notification. The first-aid response and the RIDDOR notification are parallel duties: treat the casualty AND report the event.</>} cite="Source: Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (SI 2013/1471), Reg 4 + Sched 1." />

          <SectionRule />
          <CommonMistake title="Discovering the kit is empty when it\'s needed" whatHappens={<>Apprentice cuts hand badly on a sharp edge. Goes to the van first-aid kit; finds it&apos;s been raided over the last month and there are no dressings. Bleeding continues; trip to A&amp;E required for what could have been controlled on site. Firm prosecuted under First Aid Regs Reg 3 — provision was inadequate at the time of need.</>} doInstead={<>Monthly inspection + post-use restock. Don&apos;t use the kit for non-first-aid purposes. Treat it as critical equipment.</>} />

          <CommonMistake title="Assuming the customer\'s kit is available" whatHappens={<>Operative on customer site assumes the building&apos;s first-aid kit is accessible if needed. Has an injury; building first-aid kit is locked and the keyholder is off site. Delay in treatment. Firm hadn&apos;t provided own kit on the assumption customer&apos;s would be available; First Aid Regs Reg 3 breach.</>} doInstead={<>Always carry firm&apos;s own kit. Customer / building&apos;s kit may be available but isn&apos;t a substitute for the firm&apos;s own provision under Reg 3.</>} />

          <Scenario title="Setting up first-aid for a small refurbishment job" situation={<>You\'re leading a 3-week commercial refurbishment with 2 L2 apprentices and yourself. The site is a vacant unit you have keys to; no other contractors most days; nearest hospital A&E is 8 minutes drive. You need to set up first-aid arrangements for the project.</>} whatToDo={<>Apply the needs assessment. Three operatives, electrical-trade hazards (cuts, burns, falls, electrical shock potential), construction site, vacant unit (no on-site first-aider from customer), 8-minute drive to A&amp;E. Provision: (1) BS 8599-1 medium kit on site (more comfortable than small for 3 operatives); (2) BS 8599-2 vehicle kit in each van (in case of off-site response); (3) at least one FAW-trained operative on site daily — verify rotas; (4) AED location identified (nearest public AED via thecircuit.uk); (5) emergency contact list posted at site entry; (6) brief all operatives on day 1: kit location, FAW first aider, emergency procedure, A&amp;E address; (7) inspection schedule (weekly given small team and short project); (8) post-use restock discipline. Document the arrangements in the construction phase plan / RAMS. Review periodically through the project.</>} whyItMatters={<>The needs assessment is the structured way to discharge the Reg 3 duty. A 3-person small refurbishment is the kind of job where defaulting to &quot;just bring your van kit&quot; is the most common failure. The 8-minute A&amp;E proximity is a positive factor; the lack of on-site first-aider from customer is a negative factor that requires the firm to provide its own. Documentation of the assessment is what discharges the duty in the inspector&apos;s eyes after any incident.</>} />

          <SectionRule />
          <ContentEyebrow>The chain of survival — what determines whether a cardiac arrest casualty walks out</ContentEyebrow>

          <ConceptBlock
            title="Time is heart muscle — and every minute matters"
            plainEnglish="When a casualty is in cardiac arrest, the chance of survival falls by approximately 10% for every minute that elapses without CPR and defibrillation. After 10 minutes without intervention, the survival chance is essentially zero. The Resuscitation Council UK &apos;chain of survival&apos; identifies four links that determine outcome: early recognition and call for help; early CPR; early defibrillation; early advanced care. The first three sit with the first aider on site. The L3 supervisor reflex is to act in seconds, not minutes."
            onSite="The practical implication: knowing where the nearest AED is, before you need it, is a critical pre-job task. The Circuit (thecircuit.uk) is the national AED location database; British Heart Foundation and ambulance services keep maps. Many commercial premises and public spaces now have AEDs in the foyer. On any new site the L3 supervisor adds &apos;nearest AED location&apos; to the dynamic risk assessment alongside &apos;nearest A&amp;E&apos;."
          >
            <p>The chain of survival in detail:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Recognition and call for help</strong> — unresponsive casualty,
                not breathing normally; 999 / 112 immediately; ask for AED location from
                ambulance controller if not known.
              </li>
              <li>
                <strong>Early CPR</strong> — chest compressions at 100-120/minute, depth
                5-6 cm; minimal interruption; rescue breaths only if trained and willing.
              </li>
              <li>
                <strong>Early defibrillation</strong> — AED applied as soon as available;
                pads as marked; device delivers shocks if shockable rhythm detected.
              </li>
              <li>
                <strong>Early advanced care</strong> — paramedic arrival; advanced airway,
                drugs, transport to cardiac centre.
              </li>
              <li>
                <strong>Post-resuscitation care</strong> — hospital management of cooling,
                cardiac angiography, neurological assessment.
              </li>
              <li>
                <strong>Long-term recovery</strong> — cardiac rehab, return to work
                consideration.
              </li>
              <li>
                <strong>The first three links are time-critical</strong> — every minute
                matters and they sit with the first responder.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Burns first-aid — the 20-minute cooling rule</ContentEyebrow>

          <ConceptBlock
            title="Why the &apos;cool, cover, call&apos; sequence determines burn outcome"
            plainEnglish="Burns continue to damage tissue after the heat source is removed because heat held in the skin keeps cooking deeper tissue. Cooling under cool running water for at least 20 minutes within the first 3 hours dramatically reduces depth of injury, scarring and need for surgery. The 20-minute rule applies even if it means using the casualty&apos;s shower / kitchen tap / hosepipe. After cooling, the burn is covered loosely with cling film or a sterile burn dressing — not creams, ointments or burst-blister interventions. Hospital assessment is required for any burn larger than the casualty&apos;s palm, any deep burn, any burn to face / hands / feet / genitals, and any electrical burn regardless of size."
            onSite="The L3 supervisor reflex on a burn: cool first, then call. A small electrical burn that &apos;looks fine&apos; can disguise deeper tissue damage (electricity travels through tissue, damaging structures along its path). All electrical burns require hospital assessment. The Resuscitation Council UK and British Burn Association both publish the cool-cover-call protocol."
          >
            <p>Burns first-aid sequence:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Stop the burning</strong> — remove source; if clothing on fire,
                stop-drop-roll; if chemical, remove contaminated clothing.
              </li>
              <li>
                <strong>Cool under cool running water for at least 20 minutes</strong> —
                tap water; not ice; even if delayed, cooling within 3 hours has benefit.
              </li>
              <li>
                <strong>Remove jewellery, watches, tight clothing</strong> while cooling
                (swelling will follow).
              </li>
              <li>
                <strong>Cover with cling film loosely or sterile burn dressing</strong> —
                no creams, no butter, no burst-blister interventions.
              </li>
              <li>
                <strong>Call for medical help</strong> — 999 for severe burns; A&amp;E for
                all electrical burns and burns to face / hands / feet / genitals; minor
                injuries unit for small burns.
              </li>
              <li>
                <strong>Treat for shock</strong> — keep casualty warm (foil blanket;
                avoid cooling the rest of the body), lie down, reassure.
              </li>
              <li>
                <strong>Monitor breathing</strong> — particularly for inhalation burns or
                facial / airway involvement.
              </li>
              <li>
                <strong>Document</strong> — time of incident, time of cooling start,
                substance involved, casualty condition.
              </li>
            </ol>
          </ConceptBlock>

          <RegsCallout
            source="Health and Safety (First Aid) Regulations 1981 — Reg 3(2)"
            clause={
              <>
                &quot;Where, having regard to — (a) the nature of the undertaking; and (b) the
                number of his employees; and (c) the location of the establishment, it is
                appropriate to do so for the purpose of rendering first-aid to his employees,
                an employer shall provide, or ensure that there is provided, such number of
                suitable persons as is adequate and appropriate in the circumstances for
                rendering first-aid to his employees if they are injured or become ill at
                work.&quot;
              </>
            }
            meaning={
              <>
                The Reg 3(2) personnel duty. &quot;Suitable persons&quot; means appropriately
                trained — EFAW for life-saving first aid; FAW for the broader scope; possibly
                higher (e.g. mental health first aider, advanced first responder) where the
                needs assessment supports. The combination of trained persons, kit and
                facilities forms the &quot;adequate and appropriate&quot; provision required
                by Reg 3(1). All three elements need to align; trained persons with no kit,
                or kit with no trained persons, fail the test.
              </>
            }
            cite="Source: Health and Safety (First Aid) Regulations 1981 (SI 1981/917), Reg 3."
          />

          <SectionRule />
          <ContentEyebrow>HSE prosecution patterns — what inadequate first-aid provision actually costs</ContentEyebrow>

          <ConceptBlock
            title="Worked example — a firm prosecuted for inadequate provision on a small commercial site"
            plainEnglish="A small electrical contractor was prosecuted under HSWA s.2 and the Health and Safety (First Aid) Regulations 1981 after an apprentice suffered a deep laceration on site and the firm could not produce a kit, a trained first aider, or a needs assessment. The apprentice was driven 18 minutes to A&E by the supervisor who was not trained; an ambulance was not called. Investigation revealed no first-aid needs assessment had been carried out for the project; van kits had been depleted over months with no inspection; the firm had a single FAW-trained operative who was on another site that week. The court found this an aggravating-features case under the Sentencing Council Definitive Guideline (2016) — failure of basic duty + failure to take reasonable steps + previous warnings ignored. The firm received a six-figure fine plus costs; the director was personally fined under s.37."
            onSite="The lessons for the L3 supervisor: the needs assessment is the document that protects everyone; periodic inspection prevents the empty-kit scenario; one trained first aider on the firm's books is not the same as one on every site every day; the supervisor's reflex to call 999 (rather than self-drive to A&E) is correct in serious-injury cases because the ambulance crew bring advanced care and the journey is monitored. Most prosecutions of this kind reveal not one big failure but several small ones aligned."
          >
            <p>Common aggravating features in first-aid prosecutions:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>No documented needs assessment</strong> — the foundational document the
                court asks for first.
              </li>
              <li>
                <strong>Empty or depleted kits</strong> — provision on paper but not in reality.
              </li>
              <li>
                <strong>No trained person on site</strong> — single FAW operative covering
                multiple sites without rotation discipline.
              </li>
              <li>
                <strong>No incident communication plan</strong> — operatives didn&apos;t know
                where the kit was, who the first aider was, or what the address was for the
                ambulance.
              </li>
              <li>
                <strong>Self-drive to A&amp;E in serious cases</strong> — depriving the casualty
                of ambulance crew care during transit.
              </li>
              <li>
                <strong>Previous incident not learned from</strong> — the &apos;repeat
                offender&apos; pattern weighs heavily in sentencing.
              </li>
              <li>
                <strong>Records reconstructed post-incident</strong> — paper trail created after
                the event is treated as evidence of culture problem, not as defence.
              </li>
              <li>
                <strong>Operative not briefed on emergency procedure</strong> — Reg 4
                information duty breach in addition to Reg 3 provision breach.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>The needs assessment — drafting the document an inspector will read</ContentEyebrow>

          <ConceptBlock
            title="What goes in a defensible first-aid needs assessment"
            plainEnglish="The first-aid needs assessment is the legal anchor for everything that follows. ACOP L74 sets the framework; the document needs to demonstrate that the employer considered the nature of work, the hazards present, the number of employees and any vulnerable persons, the distribution of the workforce, the accident and ill-health history, the distance to medical services, the requirements of travelling, remote and lone workers, the use of work experience or trainees, and any pattern of vulnerable occupants on customer premises. It then concludes with the provision decision — kit type and quantity, trained persons (Appointed Person, EFAW, FAW), facilities, signage and emergency procedures. The document is signed and dated by the responsible person and reviewed periodically or after any significant change."
            onSite="At L3 you may not draft the firm-wide needs assessment but you will frequently contribute project-specific addenda — a one-page note that addresses how the firm's provision applies on this particular contract. Construction sites, healthcare premises, schools, retail and customer-occupied premises each pull the assessment in different directions. The addendum demonstrates that the firm-level document was read and adapted rather than copied across."
          >
            <p>Needs-assessment input factors per ACOP L74:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Nature of work and workplace hazards</strong> — electrical, mechanical,
                manual handling, chemicals, working at height, confined spaces.
              </li>
              <li>
                <strong>Nature of the workforce</strong> — number, age range, fitness, special
                needs, languages, shift patterns, lone or remote workers.
              </li>
              <li>
                <strong>History of incidents and ill-health</strong> — accident book entries,
                near-miss reports, occupational health referrals, RIDDOR notifications.
              </li>
              <li>
                <strong>Distribution of the workforce</strong> — single building, multiple
                sites, mobile fleet of vans.
              </li>
              <li>
                <strong>Remoteness from emergency medical services</strong> — distance and
                travel time to nearest A&amp;E and minor injuries unit.
              </li>
              <li>
                <strong>Employees travelling for work</strong> — kits in vehicles, mobile
                workers&apos; arrangements.
              </li>
              <li>
                <strong>Employees working on shared or multi-occupancy sites</strong> —
                coordination with other employers; reciprocal arrangements where appropriate.
              </li>
              <li>
                <strong>Annual leave and absence cover</strong> — provision should be available
                during normal sickness / holiday cover not just on full-attendance days.
              </li>
              <li>
                <strong>Members of the public</strong> — although not strictly required by Reg
                3 the HSE strongly recommends provision for non-employees as part of the s.3
                duty under HSWA.
              </li>
              <li>
                <strong>First-aid room</strong> — required for larger sites, hazardous work or
                where the assessment supports.
              </li>
              <li>
                <strong>Review trigger events</strong> — change of work, change of premises,
                significant incident, periodic cycle.
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="Responding to a serious electrical incident — the first 10 minutes"
            situation={<>You are L3-supervising a small commercial fit-out. Your L2 apprentice is on the floor at the foot of a partially-completed sub-board, unresponsive, with a charred contact-burn mark on the right hand. The MCB has tripped. Another operative is shouting for you. No-one else in the team has FAW training; you do. The customer&apos;s site manager is at the other end of the building.</>}
            whatToDo={<>The sequence has to be near-automatic because the chain of survival closes within minutes. (1) STOP. Do not touch the casualty until you are certain the supply is isolated. (2) ISOLATE — the MCB tripping is suggestive but not proof; open the main switch of the sub-board, lock it off, mark it isolated. (3) Approach the casualty; check for response (shake-and-shout); check breathing for 10 seconds. (4) If not breathing normally, send the other operative to call 999 — state &quot;electric shock, not breathing, send AED&quot;, give the precise address and a meeting point at the building entrance; tell them to stay on the line. (5) Begin chest compressions at 100-120/minute, depth 5-6 cm, in the centre of the chest, minimising interruption. (6) If AED is accessible (check the building foyer; ask the site manager) get it as fast as possible; switch on; follow voice prompts; expose chest; apply pads as marked; allow shock if advised. (7) Continue until paramedic arrival or the casualty shows signs of life. (8) When paramedics arrive, hand over with a clear contemporaneous summary — time of incident, what was happening, supply isolated at time X, CPR started at time Y, AED applied / shocks delivered at time Z. (9) After handover preserve the scene — do not restore power; do not move equipment; photograph; secure access; brief the customer&apos;s site manager. (10) RIDDOR — this is an immediately-notifiable specified injury under Reg 4 + Schedule 1; phone HSE on the next available moment; F2508 follows within the deadline. Document everything contemporaneously — your notes from this incident will form the investigation evidence.</>}
            whyItMatters={<>This is the scenario every L3 supervisor should be able to walk through in their head before it happens, because if you have to think it through during the event you will lose minutes that the casualty cannot afford. The Resuscitation Council UK chain of survival is unforgiving — every minute without CPR and defibrillation reduces survival probability by approximately 10%. The supervisor&apos;s reflex needs to be ISOLATE then act, never act before isolation. Self-drive to A&amp;E in a cardiac-arrest case is the wrong answer; ambulance crew can deliver advanced care en route. The post-incident sequence — preserve scene, RIDDOR, brief firm — runs in parallel to the casualty care and must not be forgotten. Contemporaneous notes are the difference between a clean investigation and a contested one.</>}
          />

          <SectionRule />
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            "Remember from L2 — first aid provision required, don't misuse, restock after use.",
            "Health and Safety (First Aid) Regs 1981 + ACOP L74 — needs-driven provision via employer assessment.",
            "Three tiers: Appointed Person, EFAW (1-day), FAW (3-day). 3-year validity; annual refresher.",
            "BS 8599-1 workplace kit contents (small/medium/large); BS 8599-2 vehicle kit.",
            "Construction generally requires FAW-level provision and BS 8599-1 medium+ kits.",
            "Monthly inspection + post-use restock + log. Treat kit as critical equipment.",
            "Misuse depletes the kit, risks contamination, may breach infection control. Discipline matters.",
            "L3 supervisor verifies provision adequate, kit inspected, FAW persons available, briefed.",
            "Chain of survival — every minute without CPR and defibrillation reduces survival by ~10%.",
            "Burns cool for 20 minutes; all electrical burns to A&E regardless of size.",
            "Chemical eye splash flush 15 minutes minimum; remove contact lenses first.",
            "RIDDOR runs in parallel — specified injury immediate phone; F2508 within 10 days for 7-day absence.",
            "Preserve the scene after any serious incident — don't restore power, don't tidy, photograph.",
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
