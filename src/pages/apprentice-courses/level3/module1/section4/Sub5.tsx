/**
 * Module 1 · Section 4 · Subsection 5 — Fire extinguishers: selection and limits
 * Maps to City & Guilds 2365-03 / Unit 201 / LO4 / AC 4.6
 *   AC 4.6 — "identify the correct type of fire extinguisher for a particular type of fire"
 */
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import { TLDR, ConceptBlock, RegsCallout, CommonMistake, Scenario, KeyTakeaways, FAQ, LearningOutcomes, ContentEyebrow, SectionRule } from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Fire extinguishers — selection and limits (4.6) | Level 3 Module 1.4.5 | Elec-Mate';
const DESCRIPTION = 'L3 fire extinguisher selection — five classes plus electrical, when to fight vs evacuate, BS EN 3 colour codes.';

const checks = [
  { id: 'l3-m1-s4-sub5-electrical', question: 'What\'s the right extinguisher for a small live electrical fire?', options: ['Water.', 'CO2 (black label) or dry powder (blue label) — both safe on energised electrical equipment. NEVER water (red label) or foam (cream label) — both conduct and can shock the operator.', 'Foam.', 'Wet chemical.'], correctIndex: 1, explanation: 'Remember from L2 — CO2 or dry powder for electrical. Water and foam conduct.' },
  { id: 'l3-m1-s4-sub5-conditions', question: 'When is it safe to use an extinguisher?', options: ['Always.', 'Only when (a) trained; (b) fire is small (waste-bin size); (c) correct extinguisher class identified; (d) escape route behind you; (e) someone else has called 999; (f) you can withdraw safely if it fails. Otherwise EVACUATE.', 'Whenever you feel like it.', 'Only on Tuesdays.'], correctIndex: 1, explanation: 'Six conditions for safe extinguisher use. Default is evacuate; fight only when conditions met.' },
  { id: 'l3-m1-s4-sub5-class-f', question: 'What\'s a Class F fire and which extinguisher?', options: ['Furniture, water.', 'Cooking oils and fats — wet chemical extinguisher (yellow label). Don\'t use water (steam explosion); don\'t use foam (similar risk). Wet chemical creates a saponifying layer that smothers the fire.', 'Fish, foam.', 'Forest, dry powder.'], correctIndex: 1, explanation: 'Class F = cooking oils. Wet chemical specific. Common in commercial kitchens; not usually electrical-trade encounter but worth knowing.' },
];

const quizQuestions = [
  { id: 1, question: 'How many fire classes does BS EN 3 define?', options: ['Two.', 'Five — A (solids), B (flammable liquids), C (flammable gases), D (metals), F (cooking oils). Plus electrical (no class letter — uses CO2 or dry powder).', 'Ten.', 'Fifty.'], correctAnswer: 1, explanation: 'A, B, C, D, F + electrical. Six effective categories. Knowing all six is L3-essential.' },
  { id: 2, question: 'What does the "red label" extinguisher contain?', options: ['Foam.', 'Water — Class A only (solids: wood, paper, fabric). NEVER use on flammable liquids, electrical or cooking oil.', 'CO2.', 'Powder.'], correctAnswer: 1, explanation: 'Red = water = Class A only.' },
  { id: 3, question: 'What does the "cream label" extinguisher contain?', options: ['Powder.', 'Foam — Class A and Class B (flammable liquids). Some foams are dielectrically tested for incidental electrical contact but NOT a primary electrical extinguisher.', 'Water.', 'CO2.'], correctAnswer: 1, explanation: 'Cream = foam = Class A + B. Most foams are not safe on electrical.' },
  { id: 4, question: 'What does the "black label" extinguisher contain?', options: ['Water.', 'CO2 — safe on electrical equipment (no conductive residue), Class B (flammable liquids). NOT effective on Class A (solids) for fire knock-down (no cooling effect on embers).', 'Powder.', 'Foam.'], correctAnswer: 1, explanation: 'Black = CO2 = electrical + Class B. Limited on Class A because no cooling.' },
  { id: 5, question: 'What does the "blue label" extinguisher contain?', options: ['Water.', 'Dry powder — multi-purpose: Class A, B, C, electrical. Effective; messy aftermath; disrupts visibility (don\'t use in confined space if escape compromised). NOT for Class F (cooking oil).', 'CO2.', 'Wet chemical.'], correctAnswer: 1, explanation: 'Blue = dry powder = A/B/C/electrical. Mess and visibility issues; deploy carefully.' },
  { id: 6, question: 'What does the "yellow label" extinguisher contain?', options: ['Water.', 'Wet chemical — Class F only (cooking oils and fats). Creates saponifying layer that smothers fire. Common in commercial kitchens.', 'Foam.', 'CO2.'], correctAnswer: 1, explanation: 'Yellow = wet chemical = Class F.' },
  { id: 7, question: 'What\'s the PASS technique?', options: ['A type of cable.', 'Pull (pin), Aim (at base of fire), Squeeze (handle), Sweep (side to side). Standard extinguisher operation. Plus assess: am I trained, is the fire small enough, is escape behind me, is 999 being called?', 'A wiring colour.', 'A type of socket.'], correctAnswer: 1, explanation: 'PASS = the operating sequence. Plus the prior conditions assessment.' },
  { id: 8, question: 'When should you NOT attempt to use an extinguisher?', options: ['Always use one.', 'Untrained; fire larger than waste-bin; wrong class extinguisher; escape route compromised; fire spreading rapidly; smoke obscuring vision; ignition source unidentified; building fire alarm has sounded full evacuation. EVACUATE in any of these scenarios.', 'Never use one.', 'Only on Sundays.'], correctAnswer: 1, explanation: 'Multiple no-go conditions. Default to evacuate; only fight when ALL conditions safe.' },
];

const faqs = [
  { question: 'Are extinguishers required in domestic premises?', answer: 'Not typically by law for owner-occupied; rented properties have some duties via the LL/T arrangement. Recommended (smoke alarms required under Smoke and CO Alarms Regs).' },
  { question: 'How often should extinguishers be serviced?', answer: 'Annual visual / basic service per BS 5306-3; extended service every 5 years; replacement of CO2 / powder cylinders typically every 10 years. Service by competent person; record on service tag.' },
  { question: 'Can I use any extinguisher on electrical fire if it\'s the only one available?', answer: 'CO2 or dry powder = safe. Water or foam = NOT safe (conducts). If only water/foam available, isolate the supply first if you can do so safely; then water/foam may be used on the now-de-energised fire. Otherwise evacuate.' },
  { question: 'How long does an extinguisher last in operation?', answer: 'Brief — typical 9kg dry powder = 12-15 seconds; 5kg CO2 = 8-10 seconds; 9L water = 60 seconds. Plan operation; don\'t waste the discharge.' },
  { question: 'What about lithium battery fires?', answer: 'Specialist response required — most standard extinguishers ineffective. Lithium battery fires are self-fuelled (release oxygen) and extremely high-temperature. Class D dry powder or specialist Li-ion extinguishers; otherwise evacuate and fire-service deal. Drill battery on charge in a workshop is a real consideration.' },
  { question: 'Where should extinguishers be located?', answer: 'On escape routes (per RRFSO 2005), at fire points, near hazard zones (kitchen, switchroom). Building owner / responsible person determines via fire risk assessment.' },
];

export default function Sub5() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);
  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section4')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"><ArrowLeft className="h-4 w-4" /> Section 4</button>
          <PageHero eyebrow="Module 1 · Section 4 · Subsection 5" title="Fire extinguishers — selection and limits" description="Remember from L2 — five fire classes, colour-coded extinguishers, never water on electrical. At L3 you also know the conditions for safe use and when to evacuate instead." tone="emerald" />
          <TLDR points={[
            "BS EN 3 — five classes (A solids, B flammable liquids, C flammable gases, D metals, F cooking oils) plus electrical (CO2 or dry powder).",
            "Colour codes: red=water, cream=foam, black=CO2, blue=powder, yellow=wet chemical.",
            "Default = evacuate. Use extinguisher only when trained + small fire + correct class + escape route behind + 999 called + can withdraw safely.",
          ]} />
          <LearningOutcomes outcomes={[
            "Identify the five fire classes (A/B/C/D/F) plus electrical and the appropriate extinguisher for each.",
            "Identify BS EN 3 colour codes (red/cream/black/blue/yellow).",
            "State the conditions under which extinguisher use is appropriate.",
            "Apply the PASS technique.",
            "Recognise when evacuation is the appropriate response (most cases).",
            "Identify lithium battery fires as requiring specialist response.",
          ]} initialVisibleCount={3} />

          <ContentEyebrow>Class and extinguisher mapping</ContentEyebrow>
          <ConceptBlock title="Five classes plus electrical" plainEnglish="Class A = solids (wood, paper, fabric). Class B = flammable liquids. Class C = flammable gases. Class D = metals. Class F = cooking oils. Plus electrical (no class letter — uses CO2 or dry powder)." onSite="Memorise the mapping. The wrong extinguisher on the wrong class can make things worse — water on chip-pan oil = steam explosion; water on electrical = shock; foam on Class D = violent reaction.">
            <p>Class to extinguisher:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Class A (solids)</strong> — water (red), foam (cream), dry powder (blue), wet chemical (yellow if mixed with cooking oils).</li>
              <li><strong>Class B (flammable liquids)</strong> — foam (cream), CO2 (black), dry powder (blue).</li>
              <li><strong>Class C (flammable gases)</strong> — dry powder (blue). Also: isolate the gas supply first if possible.</li>
              <li><strong>Class D (metals)</strong> — specialist dry powder only.</li>
              <li><strong>Class F (cooking oils)</strong> — wet chemical (yellow).</li>
              <li><strong>Electrical</strong> — CO2 (black) or dry powder (blue). Never water or foam.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Regulatory Reform (Fire Safety) Order 2005 — Article 13" clause={<>"(1) Where necessary in order to safeguard the safety of relevant persons, the responsible person must ensure that — (a) the premises are, to the extent that it is appropriate, equipped with appropriate fire-fighting equipment and with fire detectors and alarms; and (b) any non-automatic fire-fighting equipment so provided is easily accessible, simple to use and indicated by signs."</>} meaning={<>RRFSO Article 13 places the duty to provide appropriate fire-fighting equipment on the responsible person (employer / building owner). Fire risk assessment (Article 9) determines what&apos;s appropriate. As an electrician you don&apos;t set the policy but you may be expected to use the kit if a fire breaks out from your work.</>} cite="Source: Regulatory Reform (Fire Safety) Order 2005 (SI 2005/1541), Article 13 — verbatim from legislation.gov.uk." />

          <InlineCheck {...checks[0]} />

          <SectionRule />
          <ContentEyebrow>When to fight, when to evacuate</ContentEyebrow>
          <ConceptBlock title="The conditions for safe extinguisher use" plainEnglish="Six conditions: trained, small fire (waste-bin size max), correct class extinguisher, escape route behind, 999 called, can withdraw safely. Default = evacuate; fight only when all conditions met." onSite="Most untrained extinguisher attempts make things worse — wrong class, splash spread, smoke into operator's face, missed firefighter response window. The L3 default is conservative — evacuate unless conditions clearly support a safe attempt.">
            <p>PASS technique:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>P</strong> — Pull the pin / safety tab.</li>
              <li><strong>A</strong> — Aim at the BASE of the fire (not the flames).</li>
              <li><strong>S</strong> — Squeeze the handle.</li>
              <li><strong>S</strong> — Sweep side to side at the base.</li>
              <li>Stay back appropriate distance (typically 1-2m for water/foam, slightly closer for CO2 due to short range).</li>
              <li>Withdraw if the fire isn&apos;t controlled within the discharge time.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="When evacuation is the right call" plainEnglish="Untrained, large fire, wrong extinguisher available, escape route compromised, smoke obscuring vision, full alarm sounded — all reasons to evacuate. Better to evacuate and let the fire service deal than to be the second casualty." onSite="The L3 supervisor's calmness in deciding 'this is too big for us — evacuate' is a leadership act that protects the team.">
            <p>Evacuation indicators:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Fire larger than waste-bin equivalent.</li>
              <li>Spreading rapidly.</li>
              <li>Wrong extinguisher available.</li>
              <li>Untrained personnel only.</li>
              <li>Escape route compromised.</li>
              <li>Smoke obscuring vision or making breathing difficult.</li>
              <li>Building alarm sounded — comply with evacuation.</li>
              <li>Multiple ignition points (suggests larger underlying fire).</li>
              <li>Lithium battery involvement (specialist response).</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />
          <InlineCheck {...checks[2]} />

          <SectionRule />
          <ContentEyebrow>Lithium and other special cases</ContentEyebrow>
          <ConceptBlock title="Lithium battery fires" plainEnglish="Self-fuelled (release oxygen), extreme temperatures, very difficult to extinguish, can re-ignite hours later. Most standard extinguishers ineffective. Specialist Li-ion extinguishers exist; Class D dry powder partially effective. Best response = evacuate and let the fire service deal." onSite="Drill batteries on charge are a real fire-load consideration. Workshop / van fires from charging batteries occur. Charge in fire-rated bag or open area; don't leave unattended; remove from areas of valuable / flammable material.">
            <p>Lithium fire considerations:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Self-fuelled — won&apos;t starve of oxygen.</li>
              <li>Re-ignition possible hours after apparent extinguishment.</li>
              <li>Specialist Li-ion extinguishers (often containing AVD or specific salts) increasingly available.</li>
              <li>Smoke is highly toxic — keep upwind.</li>
              <li>Standard Class B/electrical extinguishers may help adjacent fires but won&apos;t stop the lithium itself.</li>
              <li>Risk-management focus on PREVENTION — proper charging, storage, transport.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Fire prevention, alarms and the wider fire system</ContentEyebrow>
          <ConceptBlock title="Fire prevention on electrical jobs" plainEnglish="The electrician&apos;s biggest contribution to fire safety isn&apos;t fighting fires — it&apos;s preventing them. Loose connections, overloaded circuits, damaged cables, hot work without controls, lithium battery storage, combustibles near heat sources — all common ignition sources. The L3 supervisor&apos;s installation discipline reduces fire risk at source." onSite="Periodic re-tightening at high-current terminations, proper torque on every connection, cable damage avoided, hot work permits used, battery charging in fire-safe areas, combustibles cleared from work zones. Fire prevention is a daily practice, not a separate activity.">
            <p>Common electrical-trade fire-prevention practices:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Torque connections correctly</strong> — manufacturer torque values; calibrated torque driver.</li>
              <li><strong>Cable protection</strong> — chases &amp; depths to BS 7671; capping over cables in floor voids.</li>
              <li><strong>Hot work permit</strong> — for soldering, brazing, grinding, any spark-generating work.</li>
              <li><strong>Lithium battery storage</strong> — fire-rated bag or steel cabinet; charge in open / monitored area.</li>
              <li><strong>Combustibles clear</strong> — packaging, paper, rags away from heat sources.</li>
              <li><strong>Extension cord discipline</strong> — proper rating, not daisy-chained, not under carpets.</li>
              <li><strong>Periodic inspection</strong> — EICR catches developing faults before fire.</li>
              <li><strong>Smoke / CO alarm checks</strong> — part of routine domestic work; replacement on date.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Fire alarm systems — what to know" plainEnglish="BS 5839-1 (commercial) and BS 5839-6 (domestic) set standards for fire detection and alarm systems. Categories L1 (life protection, every space), L2-L5 (decreasing coverage), P1 / P2 (property protection). Maintenance is mandatory under RRFSO 2005 Article 17 — periodic test, annual full service." onSite="The L3 supervisor recognises fire-alarm system categories and the maintenance regime. Working in a building with active alarm system means coordinating with the responsible person about isolations / disablements; never silence an alarm without authorisation.">
            <p>BS 5839 system categories:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>L1</strong> — full life protection; detector in every space.</li>
              <li><strong>L2</strong> — defined sleeping areas + escape routes.</li>
              <li><strong>L3</strong> — escape routes only.</li>
              <li><strong>L4</strong> — escape routes; basic.</li>
              <li><strong>L5</strong> — local protection only.</li>
              <li><strong>P1</strong> — full property protection.</li>
              <li><strong>P2</strong> — defined high-risk areas.</li>
              <li><strong>Domestic LD1-LD3</strong> — under BS 5839-6.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Fire compartmentation and the electrician&apos;s role" plainEnglish="Buildings are divided into fire compartments — walls, floors, doors rated for fire resistance (e.g. 30 / 60 / 90 minutes). Cables, conduits and trunking penetrating compartment lines must be fire-stopped to maintain the rating. Electricians regularly create penetrations; the responsibility to maintain compartmentation is real." onSite="On any cable penetration of a compartment line: fire-stop with appropriate intumescent product. Don&apos;t leave penetrations unsealed. The Building Safety Act 2022 has elevated this duty significantly — the &apos;golden thread&apos; means penetrations and their fire-stopping are recorded for the life of the building.">
            <p>Fire-stopping considerations:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Identify the compartment</strong> — which walls / floors are fire-rated.</li>
              <li><strong>Match the rating</strong> — 30 / 60 / 90 minute equivalent product.</li>
              <li><strong>Approved products</strong> — third-party tested intumescent compound, collars, pillows, mortar.</li>
              <li><strong>Manufacturer&apos;s installation method</strong> — depth, support, sealing both sides.</li>
              <li><strong>Document</strong> — photo before close-up; record in golden thread / O&amp;M.</li>
              <li><strong>Don&apos;t use generic mastic</strong> — not fire-rated; not compartment-sealed.</li>
              <li><strong>Higher-Risk Buildings (HRB) under BSA 2022</strong> — additional regulatory regime; principal designer / contractor coordination.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Emergency lighting — BS 5266" plainEnglish="Emergency lighting illuminates escape routes when normal supply fails. BS 5266-1 sets standards: minimum illumination 1 lux on escape routes, 0.5 lux open area, 3 hours duration, periodic testing (monthly function, annual full discharge), recorded results." onSite="The L3 supervisor on any commercial install verifies emergency lighting design meets BS 5266 and the test regime is set up. After any electrical works affecting EM lighting circuits, post-works function test before handover.">
            <p>Emergency lighting requirements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Escape route</strong> — 1 lux minimum on the route centreline.</li>
              <li><strong>Open area</strong> — 0.5 lux minimum.</li>
              <li><strong>High-risk task area</strong> — 10% of normal task lighting (BS 5266-7).</li>
              <li><strong>Duration</strong> — 3 hours typical commercial / public.</li>
              <li><strong>Maintenance</strong> — monthly function test (briefly mains off), annual 3-hour discharge.</li>
              <li><strong>Records</strong> — log book retained on site under RRFSO Article 17.</li>
              <li><strong>Self-contained</strong> — battery in fitting (modern standard).</li>
              <li><strong>Central battery</strong> — older systems; battery room with maintenance regime.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Regulatory Reform (Fire Safety) Order 2005 — Article 9 (Risk assessment)" clause={<>"The responsible person must make a suitable and sufficient assessment of the risks to which relevant persons are exposed for the purpose of identifying the general fire precautions he needs to take to comply with the requirements and prohibitions imposed on him by or under this Order."</>} meaning={<>RRFSO Article 9 — fire risk assessment by the responsible person. Outputs identify required precautions including extinguishers, alarms, signage, evacuation procedures. The L3 supervisor reads the FRA before working in any commercial / non-domestic premises; aligns work with its findings.</>} cite="Source: Regulatory Reform (Fire Safety) Order 2005 (SI 2005/1541), Article 9 — verbatim from legislation.gov.uk." />

          <RegsCallout source="Regulatory Reform (Fire Safety) Order 2005 — Article 17 (Maintenance)" clause={<>"Where necessary in order to safeguard the safety of relevant persons the responsible person must ensure that the premises and any facilities, equipment and devices provided in respect of the premises under this Order or, subject to paragraph (6), under any other enactment, including any enactment repealed or revoked by this Order, are subject to a suitable system of maintenance and are maintained in an efficient state, in efficient working order and in good repair."</>} meaning={<>Article 17 — maintenance duty for fire safety equipment. Extinguishers (BS 5306-3), alarms (BS 5839), emergency lighting (BS 5266), fire doors all require periodic maintenance with records. The L3 supervisor on installs / EICRs verifies the regime exists and works.</>} cite="Source: Regulatory Reform (Fire Safety) Order 2005 (SI 2005/1541), Article 17 — verbatim from legislation.gov.uk." />

          <SectionRule />
          <CommonMistake title="Reaching for the nearest extinguisher without checking the label" whatHappens={<>Apprentice grabs a water extinguisher (the nearest available) for a small electrical fire in a CU. Discharges; gets a shock back through the water stream; secondary injury. The water also damages the CU and surrounding equipment more than the fire would have. PUWER + PPE Regs +PHASA s.7 implications.</>} doInstead={<>Read the colour band before discharge. Two seconds. Black = CO2 (electrical OK). Blue = dry powder (electrical OK). Red = water (NOT electrical). If only water available and you can&apos;t isolate the supply, evacuate.</>} />

          <CommonMistake title="Attempting an extinguisher attack with no escape route" whatHappens={<>Operative approaches a fire with the only exit BEYOND the fire. Discharge attempt fails; smoke spreads; operative is now trapped. Multi-prosecution event; preventable through evacuation thinking.</>} doInstead={<>Always have an escape route BEHIND you when approaching a fire. Don&apos;t advance into a position where you can&apos;t withdraw safely. If escape would require passing the fire, evacuate immediately.</>} />

          <Scenario title="Small electrical fire in a customer's distribution board" situation={<>Mid-morning install at a small commercial unit. You're working on the supply side; isolation is already in place at the meter. As you work, you hear a crackle from the OTHER side of the building\'s main DB (separate circuit, not isolated). Walking over you see a small fire (size of a tennis ball) inside the lower portion of the DB; smoke starting to emerge.</>} whatToDo={<>Six-condition check: (1) trained — yes, EFAW + extinguisher use; (2) fire is small — yes; (3) correct extinguisher — building has CO2 nearby; (4) escape route behind — yes, corridor; (5) 999 — call now or have customer call; (6) can withdraw — yes. PROCEED with fire-fighting attempt. Step 1 — call 999 (or have customer do it). Step 2 — isolate the affected DB at the meter / cut-out (DNO consent for cut-out fuse withdrawal where applicable; if not possible safely, leave isolation to fire service). Step 3 — PASS technique with CO2 — pull pin, aim at base of fire (lower portion of DB), squeeze, sweep. Stay back (CO2 has short range; protect yourself). Step 4 — observe outcome. If extinguished, withdraw; do NOT restore power; await fire service to confirm. If not controlled within discharge time, withdraw and evacuate. Step 5 — evacuate the building regardless; call account-for, brief fire service on arrival. Step 6 — preserve scene; document; RIDDOR if any injury or 24+ hour plant stoppage.</>} whyItMatters={<>The L3 supervisor decision is structured — six conditions, decision, action, withdrawal trigger. The customer&apos;s site management may or may not be present; you may be the senior trade with a real fire. Your decision shapes whether the fire is controlled or escalates. The default is conservative — evacuate when in doubt — but a clear go-decision when conditions support it can stop a small fire before it becomes a large one.</>} />

          <SectionRule />
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            "Remember from L2 — five fire classes plus electrical, colour-coded extinguishers.",
            "BS EN 3: A (water-red), B (foam-cream / CO2-black), C (powder-blue), D (specialist), F (wet chemical-yellow). Electrical = CO2 or dry powder.",
            "Default = evacuate. Six conditions for safe extinguisher use: trained, small, correct class, escape route behind, 999 called, can withdraw.",
            "PASS technique: Pull, Aim (at base), Squeeze, Sweep.",
            "Discharge times short — plan operation; don\'t waste.",
            "Lithium battery fires require specialist response; standard extinguishers ineffective.",
            "RRFSO 2005 places fire-fighting equipment duty on responsible person; fire risk assessment determines provision.",
            "L3 supervisor makes the fight-vs-evacuate call calmly and clearly; default conservative.",
          ]} />
          <Quiz title="Fire extinguishers — knowledge check" questions={quizQuestions} />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section4-4')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">4.4 Workplace hazards</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section4-6')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">4.6 Asbestos</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
