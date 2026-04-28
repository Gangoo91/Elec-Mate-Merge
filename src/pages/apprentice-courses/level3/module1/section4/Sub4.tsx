/**
 * Module 1 · Section 4 · Subsection 4 — Workplace hazard situations
 * Maps to City & Guilds 2365-03 / Unit 201 / LO4 / AC 4.4 + 4.5
 *   AC 4.4 — "describe situations which can constitute a hazard in the workplace"
 *   AC 4.5 — "explain practices and procedures for addressing hazards in the workplace"
 */
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import { TLDR, ConceptBlock, RegsCallout, CommonMistake, Scenario, KeyTakeaways, FAQ, LearningOutcomes, ContentEyebrow, SectionRule } from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Workplace hazard situations (4.4 / 4.5) | Level 3 Module 1.4.4 | Elec-Mate';
const DESCRIPTION = 'L3 workplace hazards — slips/trips, manual handling, working at height, confined spaces, weather. Supervisor framing and control hierarchies.';

const checks = [
  { id: 'l3-m1-s4-sub4-wah', question: 'Under WAH Regs 2005, what\'s the hierarchy of control?', options: ['Always use a harness.', 'Avoid working at height where reasonably practicable; if unavoidable, use collective protection (scaffold, MEWP, edge protection); if collective inadequate, use personal fall protection (harness + lanyard + anchor); minimise distance and consequences of falls.', 'Always use a ladder.', 'Always work at ground level.'], correctIndex: 1, explanation: 'WAH Regs 2005 Reg 6 hierarchy. Avoid → collective → personal → minimise. Apply on every height-related task.' },
  { id: 'l3-m1-s4-sub4-confined', question: 'What\'s a "confined space" under the Confined Spaces Regs 1997?', options: ['A small room.', 'Any place which is substantially enclosed and where there is a reasonably foreseeable specified risk — fire/explosion, asphyxiation, drowning, hyperthermia, entrapment with serious injury. Examples: tank, vessel, silo, sewer, chamber, ductwork, void, sometimes lofts and cellars depending on conditions.', 'Always a tank.', 'Anywhere small.'], correctIndex: 1, explanation: 'Confined space = enclosed AND foreseeable specified risk. Not all small spaces; not all enclosed spaces. The risk profile defines it.' },
  { id: 'l3-m1-s4-sub4-manual', question: 'Under Manual Handling Operations Regs 1992, what\'s the hierarchy?', options: ['Always lift.', 'Avoid hazardous manual handling where reasonably practicable; if not avoidable, assess (load, individual capability, task, environment); reduce risk to lowest reasonably practicable level (mechanical aids, team lift, training).', 'Always team lift.', 'Always use straps.'], correctIndex: 1, explanation: 'Avoid → assess → reduce. Mechanical handling preferred; team lift if needed; training to reduce technique-related injury.' },
];

const quizQuestions = [
  { id: 1, question: 'What\'s a "slip" hazard situation?', options: ['Wearing loose clothing.', 'Underfoot conditions (water, oil, dust, polished surface, weather) that reduce friction below safe level. Most common workplace injury cause; addressed by housekeeping, anti-slip surfaces, proper footwear, spillage clean-up.', 'Falling out of bed.', 'A computer error.'], correctAnswer: 1, explanation: 'Slips, trips and falls are the most common workplace injury category. Mostly preventable by housekeeping discipline.' },
  { id: 2, question: 'What does Working at Height Regs 2005 cover?', options: ['Only above 3m.', 'Any place where a person could fall a distance liable to cause personal injury. NO HEIGHT THRESHOLD (the old "above 2m" rule was abolished). Could be standing on a step, on a ladder, on a roof, on a stair, near an unprotected edge.', 'Only above 6m.', 'Only roofing.'], correctAnswer: 1, explanation: 'No height threshold under WAH 2005. Risk assessment based; even low-level falls can cause serious injury depending on landing.' },
  { id: 3, question: 'Under MHOR 1992 what\'s the maximum lifting weight for a worker?', options: ['25 kg.', 'No fixed maximum — assessed by load × frequency × posture × environment × individual capability. HSE filter values give "guideline weights" that depend on lift zone (close to body, near floor, above shoulder etc); typical guideline ~25kg lift from waist by an adult male in close hold.', '50 kg.', '5 kg.'], correctAnswer: 1, explanation: 'No legal maximum; risk assessment based. HSE filter values give starting points; assess and reduce as needed.' },
  { id: 4, question: 'What are the four "specified risks" defining a confined space?', options: ['Just one.', 'Fire / explosion, asphyxiation (oxygen deficiency or harmful atmosphere), drowning (free-flowing solid / liquid), hyperthermia (high temperature). Plus serious injury from entrapment. The Regs apply when the space is substantially enclosed AND any specified risk is foreseeable.', 'Just two.', 'Three.'], correctAnswer: 1, explanation: 'Four specified risks per the 1997 Regs. Enclosed + risk = confined space; full controls apply (permit, atmosphere monitoring, rescue plan, standby person).' },
  { id: 5, question: 'What\'s "weather-related hazard" for an electrician?', options: ['Just inconvenience.', 'Heat (lofts, plant rooms, summer outdoor — heat stress, dehydration, equipment overheat); cold (numb fingers, brittle PVC sheathing, slip risk on ice); rain (water tracking on first-fix, shock risk, slip); wind (working at height risk, dropped tools); lightning (outdoor work risk).', 'Always sunny.', 'Always rain.'], correctAnswer: 1, explanation: 'Weather is a real hazard category. Dynamic risk assessment includes the day\'s weather and how it affects the planned work.' },
  { id: 6, question: 'What\'s the "trip" hazard category?', options: ['A holiday.', 'Items projecting at low level that catch a foot — cables across walking routes, materials left out, raised flooring edges, uneven surfaces, doors that open into walkways. Particular issue on construction sites and during installation work.', 'A dance step.', 'A fall.'], correctAnswer: 1, explanation: 'Trip hazards = projecting at low level. Tripping electricians fall onto tools, into work areas, off edges. Major contributor to lost-time injuries.' },
  { id: 7, question: 'How does the L3 supervisor address site housekeeping?', options: ['Tell others to do it.', 'Lead by example, set expectations, schedule clean-up periods (end-of-day, after disruptive work), provide skips and bins, intervene when issues seen. Housekeeping is one of the easiest hazard reductions and one of the most consistently overlooked.', 'Hide the mess.', 'Blame the customer.'], correctAnswer: 1, explanation: 'Housekeeping is leadership behaviour. The L3 supervisor models it; the team follows.' },
  { id: 8, question: 'What\'s the L3 supervisor framing on workplace hazards generally?', options: ['Avoid all of them.', 'Identify, evaluate, control, monitor. Use the hazard categories as a framework; apply hierarchy of control; document on RAMS / dynamic assessment; observe in practice; intervene when issues seen. Same discipline across hazard types.', 'Random response.', 'Customer\'s problem.'], correctAnswer: 1, explanation: 'Same framework, applied across hazard categories. The L3 supervisor doesn\'t treat each hazard type as a separate art; the same disciplined approach applies.' },
];

const faqs = [
  { question: 'Is a step-up a "ladder" under WAH Regs?', answer: 'Yes — a step-up / podium / hop-up is work at height equipment subject to WAH Regs 2005 inspection regime. Pre-use check; periodic detailed inspection; replacement if damaged.' },
  { question: 'When does a loft become a "confined space"?', answer: 'When access is restricted AND foreseeable specified risk exists (asphyxiation from inadequate ventilation; entrapment; hyperthermia in summer). Most domestic lofts are tight access but not classed as confined unless specific risks present.' },
  { question: 'Can I refuse to work in adverse weather?', answer: 'Yes if the weather creates an unacceptable risk under MHSWR Reg 3. Document the assessment; escalate to supervisor; reschedule. ERA s.44 protection if pushback follows.' },
  { question: 'What\'s a "working platform" under WAH Regs?', answer: 'Any platform from which a person could fall — scaffold, MEWP, hop-up, ladder rung, roof. Regs apply different inspection regimes by platform type (e.g. weekly scaffold inspection by competent person under WAH Sched 7).' },
  { question: 'Are anti-slip mats required by law?', answer: 'No specific requirement; required where risk assessment identifies slip risk and mats reduce it (e.g. wet entrances, oil-prone areas, polished commercial floors).' },
  { question: 'How does the L3 supervisor balance speed and safety on housekeeping?', answer: 'End-of-day clean-up; mid-task tidies after disruptive work; route cables to avoid walking lines; remove materials from corridors. Five minutes of housekeeping prevents most trip incidents.' },
];

export default function Sub4() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);
  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section4')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"><ArrowLeft className="h-4 w-4" /> Section 4</button>
          <PageHero eyebrow="Module 1 · Section 4 · Subsection 4" title="Workplace hazard situations" description="Remember from L2 — slips, trips, manual handling, working at height. At L3 the supervisor framing — same hazards, deeper response, leadership on housekeeping and control hierarchies." tone="emerald" />
          <TLDR points={[
            "Slips/trips, manual handling, working at height, confined spaces, weather — the everyday workplace hazards. Each has its regulatory home.",
            "WAH Regs 2005 — no height threshold; hierarchy avoid → collective → personal → minimise. MHOR 1992 — avoid → assess → reduce. Confined Spaces 1997 — permit + atmosphere + rescue plan.",
            "L3 supervisor leads on housekeeping, models behaviour, intervenes when issues seen.",
          ]} />
          <LearningOutcomes outcomes={[
            "Describe situations that constitute a hazard in the workplace — slips, trips, manual handling, height, confined spaces, weather.",
            "Explain practices and procedures for addressing each hazard category.",
            "Apply Working at Height Regs 2005 hierarchy: avoid → collective → personal → minimise.",
            "Apply Manual Handling Operations Regs 1992 hierarchy: avoid → assess → reduce.",
            "Identify Confined Spaces Regs 1997 specified risks and required controls.",
            "Recognise weather as a hazard category with seasonal and daily variation.",
          ]} initialVisibleCount={3} />

          <ContentEyebrow>Headline workplace hazards</ContentEyebrow>
          <ConceptBlock title="Slips, trips and falls" plainEnglish="Most common workplace injury category. Slips (low friction), trips (low projection caught by foot), falls (loss of balance from height or level). Largely preventable by housekeeping, surface treatment, proper footwear and routing." onSite="L3 supervisor leads on housekeeping. End-of-day clean-up, mid-task tidies, cable routing away from walking lines, materials kept clear of corridors. Five minutes of preventive work saves most trip incidents.">
            <p>Common causes and controls:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Cable across walking routes</strong> → cable bridges, route over doorways, plan cable runs.</li>
              <li><strong>Tools / materials on floor</strong> → end-of-day clean-up, dedicated lay-down areas.</li>
              <li><strong>Wet floor</strong> → signage, anti-slip mats, immediate clean-up, footwear.</li>
              <li><strong>Damaged surface</strong> → barrier, signage, escalate for repair.</li>
              <li><strong>Lighting inadequate</strong> → temporary task lighting.</li>
              <li><strong>Footwear</strong> → safety footwear (EN ISO 20345) with appropriate sole.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Working at Height Regulations 2005 — Reg 6" clause={<>Hierarchy: "(2) Every employer shall ensure that work is not carried out at height where it is reasonably practicable to carry out the work safely otherwise than at height. (3) Where work is carried out at height, every employer shall take suitable and sufficient measures to prevent, so far as is reasonably practicable, any person falling a distance liable to cause personal injury."</>} meaning={<>The WAH hierarchy: avoid &gt; collective protection &gt; personal protection &gt; minimise. NO HEIGHT THRESHOLD — applies to any height where injury could result. The old &quot;above 2m&quot; rule was abolished in 2005.</>} cite="Source: Working at Height Regulations 2005 (SI 2005/735), Reg 6 — verbatim from legislation.gov.uk." />

          <InlineCheck {...checks[0]} />

          <SectionRule />
          <ContentEyebrow>Manual handling and confined spaces</ContentEyebrow>
          <ConceptBlock title="Manual Handling Operations Regs 1992" plainEnglish="No legal maximum lift weight — hierarchy is avoid → assess → reduce. HSE filter values give guideline weights for different lift zones; risk assessment uses TILE (Task, Individual, Load, Environment)." onSite="Common electrical-trade manual-handling hazards: cable drums, motors, switchgear, MCBs in bulk, ladders, platforms, tools. Mechanical handling preferred; team lifts where needed; training on technique reduces but doesn't eliminate risk.">
            <p>TILE assessment factors:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Task</strong> — frequency, distance, posture required, twisting, reaching.</li>
              <li><strong>Individual</strong> — capability, training, physical condition, age, prior injury.</li>
              <li><strong>Load</strong> — weight, size, shape, grip, stability, temperature.</li>
              <li><strong>Environment</strong> — space, surface, lighting, weather, obstructions.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Confined Spaces Regulations 1997" plainEnglish="A confined space is substantially enclosed AND has foreseeable specified risk (fire/explosion, asphyxiation, drowning, hyperthermia, entrapment with serious injury). Examples: tanks, vessels, sewers, ducts, chambers, some voids and lofts depending on conditions." onSite="Permit-to-work + atmosphere monitoring + rescue plan + standby person + training are the typical controls. Not many electrical-trade jobs hit confined-space classification, but lofts, cellars, plant rooms, underfloor voids and ductwork can in some cases.">
            <p>Confined space controls:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Avoid entry where reasonably practicable.</li>
              <li>If entry necessary — permit-to-work specifying access, work, time period, controls.</li>
              <li>Atmosphere monitoring before and during entry (oxygen, flammable, toxic).</li>
              <li>Rescue plan (NOT 999 — emergency services rescue is too slow; the rescue plan is in-house).</li>
              <li>Standby person outside the space, in communication with entrant.</li>
              <li>Trained personnel (Confined Space Awareness, sometimes Specialist depending on the space).</li>
              <li>Equipment — gas detector, harness with rescue line where appropriate, comms, PPE.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Confined Spaces Regulations 1997 — Reg 4(1)" clause={<>"No person at work shall enter a confined space to carry out work for any purpose unless it is not reasonably practicable to achieve that purpose without such entry."</>} meaning={<>Reg 4 — avoid entry where reasonably practicable. Where entry is necessary, Reg 4(2) requires a safe system of work; Reg 5 requires emergency arrangements (rescue plan). The Regs are absolute on the avoidance principle.</>} cite="Source: Confined Spaces Regulations 1997 (SI 1997/1713), Reg 4 — verbatim from legislation.gov.uk." />

          <RegsCallout source="Manual Handling Operations Regulations 1992 — Reg 4(1)" clause={<>"Each employer shall — (a) so far as is reasonably practicable, avoid the need for his employees to undertake any manual handling operations at work which involve a risk of their being injured; or (b) where it is not reasonably practicable to avoid the need for his employees to undertake any manual handling operations at work which involve a risk of their being injured — (i) make a suitable and sufficient assessment of all such manual handling operations to be undertaken by them, having regard to the factors which are specified in column 1 of Schedule 1 to these Regulations and considering the questions which are specified in the corresponding entry in column 2 of that Schedule, (ii) take appropriate steps to reduce the risk of injury to those employees arising out of their undertaking any such manual handling operations to the lowest level reasonably practicable, and (iii) take appropriate steps to provide any of those employees who are undertaking any such manual handling operations with general indications and, where it is reasonably practicable to do so, precise information on — (aa) the weight of each load, and (bb) the heaviest side of any load whose centre of gravity is not positioned centrally."</>} meaning={<>MHOR Reg 4 codifies the avoid → assess → reduce hierarchy for manual handling. The Schedule 1 factors are the TILE check (Task / Individual / Load / Environment) plus other factors. There is no fixed weight maximum in the Regs themselves — assessment is task-specific. The L3 supervisor uses TILE on every materials lift that is non-trivial: cable drums, CU enclosures, ladders, plant.</>} cite="Source: Manual Handling Operations Regulations 1992 (SI 1992/2793), Reg 4 — verbatim from legislation.gov.uk." />

          <InlineCheck {...checks[1]} />
          <InlineCheck {...checks[2]} />

          <SectionRule />
          <ContentEyebrow>Weather, lighting and miscellaneous</ContentEyebrow>
          <ConceptBlock title="Weather as a hazard category" plainEnglish="Heat (loft work in summer = heat stress; commercial plant rooms), cold (numb fingers, brittle PVC, ice slip), rain (first-fix in stud walls = water tracking, shock risk; outdoor work = slip), wind (height work risk, dropped tools), lightning (outdoor work)." onSite="Dynamic risk assessment on arrival should include the day's weather. Adapt scope or scheduling. Roofing in 30°C+ summer heat or in winter winds is rarely the right plan.">
            <p>Weather control responses:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Heat</strong> — hydration, breaks, lighter PPE where compatible, restrict loft work to cooler hours.</li>
              <li><strong>Cold</strong> — appropriate clothing, hand warmers, flexible PVC handling, ice / surface checks.</li>
              <li><strong>Rain</strong> — postpone outdoor first-fix, cover stud-wall openings, additional drying time.</li>
              <li><strong>Wind</strong> — check forecast for height work; postpone above wind thresholds (varies by platform but commonly 17-23 mph for MEWPs per manufacturer).</li>
              <li><strong>Lightning</strong> — postpone outdoor / roof work during nearby lightning.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Lighting and visibility" plainEnglish="Inadequate task lighting hides hazards (trip risks, services, structural defects) and increases error rates. The Workplace (HS&W) Regs 1992 Reg 8 requires suitable and sufficient lighting." onSite="Cellars, lofts, plant rooms, unfinished new-builds — all common locations where ambient light is inadequate. Bring temporary task lighting; record on dynamic assessment.">
            <p>Lighting standards:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>General task lighting — typically 200-500 lux for routine work.</li>
              <li>Detail work — 500-1,000 lux.</li>
              <li>Switchroom inspection — 500+ lux for accurate cable / termination identification.</li>
              <li>Emergency lighting (BS 5266) — separate from task lighting; provides escape route illumination on power failure.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Equipment, services and lone working</ContentEyebrow>
          <ConceptBlock title="PUWER 1998 — equipment provision and inspection" plainEnglish="Provision and Use of Work Equipment Regs 1998 require any equipment provided for work to be suitable, safe, properly maintained, used by trained operatives, with appropriate guards / safety devices, inspected periodically. Covers tools, ladders, MEWPs, podium steps, drills, test instruments — anything used at work." onSite="The L3 supervisor verifies PUWER compliance: pre-use checks done; periodic inspection records current; defects reported and equipment removed from service; substitute equipment available. PAT testing of portable electrical equipment is one specific PUWER discharge.">
            <p>PUWER inspection regimes:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Pre-use</strong> — operative checks before each use (visible damage, function).</li>
              <li><strong>Periodic detailed inspection</strong> — competent person at regular intervals (PAT, ladder inspection, MEWP LOLER 6-monthly).</li>
              <li><strong>Post-event</strong> — after damage, dropping, exposure to extreme conditions.</li>
              <li><strong>Records</strong> — inspection log per item; pass / fail / actions.</li>
              <li><strong>Defective</strong> — removed from service immediately; tagged out; repaired or scrapped.</li>
              <li><strong>LOLER 1998</strong> — additional duties for lifting equipment (MEWPs, harnesses, hoists).</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Buried services — strike avoidance" plainEnglish="Hitting buried services (electricity, gas, water, telecoms) causes injury, supply loss, prosecution and major commercial damage. HSG47 \&quot;Avoiding danger from underground services\&quot; sets the standard: drawings + detection + safe digging method." onSite="Before any excavation, drilling or fixing into walls / floors / ceilings of any age, services check. Drawings are starting point; CAT + Genny detection confirms; trial holes / hand-dig within 500mm of detected service. The L3 supervisor doesn&apos;t skip these steps even on small jobs.">
            <p>HSG47 sequence:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>Plan — drawings from utility companies, building surveys.</li>
              <li>Detect — CAT (cable) + Genny (signal generator) + GPR (ground radar) for complex sites.</li>
              <li>Identify — visual inspection of detected services where safely accessible.</li>
              <li>Mark — clear surface marking before work starts.</li>
              <li>Excavate safely — hand-dig within 500mm of any detected service; mechanical only beyond.</li>
              <li>Maintain awareness — re-detect as excavation progresses.</li>
              <li>Document — services found, marking, methods used.</li>
            </ol>
          </ConceptBlock>

          <ConceptBlock title="Lone working — the additional risk profile" plainEnglish="Working alone means no immediate help if something goes wrong. MHSWR Reg 3 risk assessment must specifically address lone working — what could happen, what&apos;s the response, how does help reach you. Common in domestic call-outs and small commercial jobs." onSite="The L3 supervisor sets up the lone-working system: regular check-ins, lone-worker app or buddy-call system, escalation if check missed, brief on hazards specific to lone work (no immediate first-aid response, no second person for live work / confined space)." >
            <p>Lone working controls:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Risk assessment</strong> — specifically addresses lone-working scenarios.</li>
              <li><strong>Check-in regime</strong> — periodic call to office / buddy; time-based or task-based.</li>
              <li><strong>Lone worker apps</strong> — GPS tracking, panic button, no-response escalation.</li>
              <li><strong>No-go activities</strong> — live working, confined space, working at height &gt;2m without second person.</li>
              <li><strong>Communication</strong> — phone signal verified at site; backup arranged.</li>
              <li><strong>Customer aware</strong> — domestic customer knows you&apos;re alone; can summon help if needed.</li>
              <li><strong>Vulnerable customer awareness</strong> — additional safeguarding; never lone with vulnerable persons without protocol.</li>
              <li><strong>Escalation</strong> — what happens if check-in is missed.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <CommonMistake title="Treating a customer's loft as 'just a loft' without confined-space check" whatHappens={<>Apprentice enters customer&apos;s loft to run cable in summer afternoon; loft is poorly ventilated; temperature 50°C+; apprentice becomes disoriented; fortunately escapes but reports near-miss. Hyperthermia risk + restricted access met confined-space criteria; entry was not properly assessed.</>} doInstead={<>Assess loft access on arrival. Ventilation? Temperature? Access route? Solo or accompanied? In summer, schedule loft work for cooler hours; carry water; brief on heat-stress signs; stay in communication.</>} />

          <CommonMistake title="Using a stepladder where a low-level platform would be safer" whatHappens={<>Apprentice uses a stepladder to fix a luminaire 2.4m off the floor; loses balance reaching sideways; falls onto tools below; ankle fracture. WAH Regs Reg 6 hierarchy not followed — collective protection (a wheeled platform with handrails) was reasonably practicable.</>} doInstead={<>WAH hierarchy applies even to low-level work. Wheeled platforms, podium steps with handrails, MEWPs all preferable to stepladders for any sustained work or where reaching is involved. Stepladder use should be brief and restricted.</>} />

          <Scenario title="Walking a domestic refurbishment for workplace hazards" situation={<>You arrive at a customer's home for a 3-day rewire. Walking through: damp recently treated in cellar (still drying); kitchen being decorated by another trade (paint solvents in air); customer has 3 children at school but home from 3:30pm; loft access via fold-down ladder, no permanent handrail; service void in floor between ground and first floor with joists at unknown spacing; outside it\'s raining and forecast for storms; nearest A&E 25 minutes drive.</>} whatToDo={<>Identify hazards systematically. Slips: wet kitchen (paint), damp cellar — keep clear of wet areas, anti-slip footwear, signage. Manual handling: cable drums, materials transport — plan routes, mechanical aids where possible. Working at height: loft access via ladder (WAH Regs apply), no handrail at top — set up additional fall arrest if extended loft work, brief team. Confined space: cellar may approach if ventilation poor — check before entering. Other trades: solvent fume from decoration — ventilation, PPE, scheduling to avoid overlap. Children: from 3:30pm, brief customer on exclusion of work areas; secure tools and live work before each break. Weather: storm forecast — cover stud-wall openings before storm, no outdoor work during lightning. Service void: unknown joist spacing — caution drilling, use detector, expect surprises. Document all on dynamic assessment. Brief team. Plan housekeeping rhythm.</>} whyItMatters={<>The systematic walk-through catches what a single-track mindset misses. Each hazard category contributes; together they shape the day&apos;s working pattern. The L3 supervisor&apos;s structured approach turns &quot;it&apos;ll be fine&quot; intuition into evidence-based control. The hazards aren&apos;t made up — they&apos;re a realistic mix that any apprentice will meet.</>} />

          <SectionRule />
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            "Remember from L2 — slips, trips, manual handling, height, confined spaces, weather are everyday hazards.",
            "Slips/trips = most common injury category; addressed mainly by housekeeping discipline.",
            "WAH Regs 2005 — no height threshold; hierarchy avoid → collective → personal → minimise.",
            "MHOR 1992 — no fixed weight maximum; hierarchy avoid → assess (TILE) → reduce.",
            "Confined Spaces Regs 1997 — substantial enclosure + specified risk = full controls (permit, atmosphere, rescue plan, standby).",
            "Weather is a real hazard category; dynamic assessment includes the day\'s weather.",
            "Lighting requirements (Workplace HS&W Regs 1992 Reg 8); temporary task lighting in cellars / lofts / plant rooms.",
            "L3 supervisor leads on housekeeping; intervenes when issues seen; documents in dynamic assessment.",
          ]} />
          <Quiz title="Workplace hazard situations — knowledge check" questions={quizQuestions} />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section4-3')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">4.3 Specific electrical hazards</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section4-5')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">4.5 Fire extinguishers</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
