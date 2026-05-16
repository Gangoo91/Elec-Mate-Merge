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
  { question: 'What is the "fire triangle" and why does it matter for extinguisher selection?', answer: 'The fire triangle is fuel + oxygen + heat. Each extinguisher type breaks one or more sides: water cools (removes heat); CO2 displaces oxygen; foam smothers and cools (removes oxygen and heat); dry powder breaks the chemical chain reaction; wet chemical saponifies cooking fats (removes fuel surface). Knowing which side the extinguisher attacks helps you select correctly.' },
  { question: 'What does "fire load" mean in fire risk assessment?', answer: 'Fire load is the total combustible material in a space, measured in MJ/m². High fire load (storage rooms, archives, workshops) requires more aggressive protection (sprinklers, more / larger extinguishers, compartmentation). The L3 supervisor on an EICR assessment notes the fire load when commenting on the protection arrangements.' },
  { question: 'When does a building need a sprinkler system?', answer: 'Approved Document B (Building Regs Part B) prescribes sprinklers for many tall residential, large commercial, and high-fire-load buildings. Post-Grenfell, residential buildings over 11 m have additional sprinkler requirements. The fire engineer specifies based on building type, height, occupancy and use.' },
  { question: 'Are firefighter lifts mandatory in tall buildings?', answer: 'BS EN 81-72 firefighter lifts are required in buildings with floors over 18 m from rescue level (Approved Document B). They are separate from passenger lifts; powered from secondary supply; operable in fire conditions to allow fire-service ascent. The L3 doing commissioning on these systems works closely with the fire engineer and the lift specialist.' },
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
            "RRFSO 2005 places fire-safety duties on the responsible person — fire risk assessment (Article 9), provision of fire-fighting equipment (Article 13), training (Article 21), maintenance (Article 17).",
            "Fire compartmentation under Building Regs Part B — penetrations through fire-rated walls / floors must be fire-stopped with appropriate intumescent product matching the rating.",
            "Emergency lighting (BS 5266), fire detection (BS 5839), and emergency-lighting test regime — monthly function, annual 3-hour discharge — are L3 supervisor verification items on any commercial install.",
          ]} />
          <LearningOutcomes outcomes={[
            "Identify the five fire classes (A/B/C/D/F) plus electrical and the appropriate extinguisher for each.",
            "Identify BS EN 3 colour codes (red/cream/black/blue/yellow).",
            "State the conditions under which extinguisher use is appropriate.",
            "Apply the PASS technique.",
            "Recognise when evacuation is the appropriate response (most cases).",
            "Identify lithium battery fires as requiring specialist response.",
            "Describe the RRFSO 2005 framework — Articles 9, 11, 13, 14, 17, 21, 22 — and the responsible-person duty.",
            "Recognise fire compartmentation principles and the L3 contribution to maintaining fire-rated penetrations.",
            "State BS 5266 emergency lighting requirements and the test regime.",
            "State BS 5839-1 fire detection categories and the false-alarm management framework.",
            "Recognise AFDD under BS 7671 Reg 421.1.7 and the wider electrical-fire prevention discipline.",
            "Recognise BSA 2022 HRB regime — gateways, golden thread, Accountable Person duties.",
          ]} initialVisibleCount={3} />

          <ContentEyebrow>Class and extinguisher mapping</ContentEyebrow>
          <ConceptBlock title="Five classes plus electrical" plainEnglish="Class A = solids (wood, paper, fabric). Class B = flammable liquids. Class C = flammable gases. Class D = metals. Class F = cooking oils. Plus electrical (no class letter — uses CO2 or dry powder). The classification system originates from BS EN 3 (European standard for portable fire extinguishers, harmonised with ISO 7165) and is mirrored in EN 2 (fire classes themselves). The class isn&apos;t about the size or location of the fire — it&apos;s about the fuel that&apos;s burning. Reading the burning material accurately is the first step in extinguisher selection." onSite="Memorise the mapping. The wrong extinguisher on the wrong class can make things worse — water on chip-pan oil = steam explosion; water on electrical = shock; foam on Class D = violent reaction. The L3 supervisor briefs the team on the mapping at induction; the team can read the colour band before pulling the pin. A common practical step is to keep a wallet card with the mapping in the toolbag — under stress the colour-class link sometimes slips.">
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

          <RegsCallout source="Regulatory Reform (Fire Safety) Order 2005 — Article 13" clause={<>"(1) Where necessary in order to safeguard the safety of relevant persons, the responsible person must ensure that — (a) the premises are, to the extent that it is appropriate, equipped with appropriate fire-fighting equipment and with fire detectors and alarms; and (b) any non-automatic fire-fighting equipment so provided is easily accessible, simple to use and indicated by signs."</>} meaning={<>RRFSO Article 13 places the duty to provide appropriate fire-fighting equipment on the responsible person (employer / building owner). Fire risk assessment (Article 9) determines what&apos;s appropriate. As an electrician you don&apos;t set the policy but you may be expected to use the kit if a fire breaks out from your work.</>} cite="Source: Regulatory Reform (Fire Safety) Order 2005 (SI 2005/1541), Article 13." />

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
          <ConceptBlock title="Fire prevention on electrical jobs" plainEnglish="The electrician&apos;s biggest contribution to fire safety isn&apos;t fighting fires — it&apos;s preventing them. Loose connections, overloaded circuits, damaged cables, hot work without controls, lithium battery storage, combustibles near heat sources — all common ignition sources. The L3 supervisor&apos;s installation discipline reduces fire risk at source. HSE statistics consistently show electrical faults among the top single-cause categories for non-domestic building fires. BS 7671:2018+A2:2022 has multiple regulation chapters (411, 422, 532) that exist specifically to address fire risk from electrical installations — AFDD requirements in residential premises (Reg 421.1.7), thermal management in CU enclosures, cable selection in escape routes (Reg 422.2.1)." onSite="Periodic re-tightening at high-current terminations, proper torque on every connection, cable damage avoided, hot work permits used, battery charging in fire-safe areas, combustibles cleared from work zones. Fire prevention is a daily practice, not a separate activity. On any EICR the L3 supervisor records every fire-risk observation as C1 (immediate danger) or C2 (potentially dangerous) — overloaded circuits, missing AFDD where mandatory under BS 7671, damaged sheath in escape routes, fire-stopping omissions at penetrations, sub-standard terminations at high-current points, combustible material in switchroom. The remedial discussion with the customer is framed in fire-prevention terms.">
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

          <ConceptBlock title="Fire compartmentation and the electrician&apos;s role" plainEnglish="Buildings are divided into fire compartments — walls, floors, doors rated for fire resistance (e.g. 30 / 60 / 90 minutes). Cables, conduits and trunking penetrating compartment lines must be fire-stopped to maintain the rating. Electricians regularly create penetrations; the responsibility to maintain compartmentation is real. Approved Document B (Volume 1: Dwellings; Volume 2: Buildings other than dwellings) is the headline Building Regs document on fire safety, and it includes compartmentation requirements specified in minutes of fire resistance. BS 476 series and BS EN 13501 series specify test methods and classifications for fire-rated materials." onSite="On any cable penetration of a compartment line: fire-stop with appropriate intumescent product. Don&apos;t leave penetrations unsealed. The Building Safety Act 2022 has elevated this duty significantly — the &apos;golden thread&apos; means penetrations and their fire-stopping are recorded for the life of the building. Higher-Risk Buildings (HRBs — over 18 m or 7 storeys with two or more residential units) have the most onerous regime — gateway approvals, named Accountable Person, recorded compliance, retention of documentary evidence for the life of the building. The L3 working on HRB projects records every penetration with photo before and after, product detail, installer signature.">
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

          <ConceptBlock title="Emergency lighting — BS 5266" plainEnglish="Emergency lighting illuminates escape routes when normal supply fails. BS 5266-1 sets standards: minimum illumination 1 lux on escape routes, 0.5 lux open area, 3 hours duration, periodic testing (monthly function, annual full discharge), recorded results. The standard covers both self-contained fittings (each fitting with its own battery, charger and inverter) and central battery systems (a single battery cabinet serving multiple fittings). The current BS 5266-1:2016+A1:2022 is harmonised with the European standards EN 1838 (lighting applications — emergency lighting) and EN 50172 (emergency escape lighting systems)." onSite="The L3 supervisor on any commercial install verifies emergency lighting design meets BS 5266 and the test regime is set up. After any electrical works affecting EM lighting circuits, post-works function test before handover. The L3 supervisor doing periodic inspection (EICR) on commercial premises checks the EM lighting test log — monthly entries showing brief test events, annual entries showing 3-hour discharge tests. Missing test log is itself a sign that the system isn&apos;t being maintained. Coordinated with the responsible person under RRFSO Article 17.">
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

          <RegsCallout source="Regulatory Reform (Fire Safety) Order 2005 — Article 9 (Risk assessment)" clause={<>"The responsible person must make a suitable and sufficient assessment of the risks to which relevant persons are exposed for the purpose of identifying the general fire precautions he needs to take to comply with the requirements and prohibitions imposed on him by or under this Order."</>} meaning={<>RRFSO Article 9 — fire risk assessment by the responsible person. Outputs identify required precautions including extinguishers, alarms, signage, evacuation procedures. The L3 supervisor reads the FRA before working in any commercial / non-domestic premises; aligns work with its findings.</>} cite="Source: Regulatory Reform (Fire Safety) Order 2005 (SI 2005/1541), Article 9." />

          <RegsCallout source="Regulatory Reform (Fire Safety) Order 2005 — Article 17 (Maintenance)" clause={<>"Where necessary in order to safeguard the safety of relevant persons the responsible person must ensure that the premises and any facilities, equipment and devices provided in respect of the premises under this Order or, subject to paragraph (6), under any other enactment, including any enactment repealed or revoked by this Order, are subject to a suitable system of maintenance and are maintained in an efficient state, in efficient working order and in good repair."</>} meaning={<>Article 17 — maintenance duty for fire safety equipment. Extinguishers (BS 5306-3), alarms (BS 5839), emergency lighting (BS 5266), fire doors all require periodic maintenance with records. The L3 supervisor on installs / EICRs verifies the regime exists and works.</>} cite="Source: Regulatory Reform (Fire Safety) Order 2005 (SI 2005/1541), Article 17." />

          <SectionRule />
          <CommonMistake title="Reaching for the nearest extinguisher without checking the label" whatHappens={<>Apprentice grabs a water extinguisher (the nearest available) for a small electrical fire in a CU. Discharges; gets a shock back through the water stream; secondary injury. The water also damages the CU and surrounding equipment more than the fire would have. PUWER + PPE Regs +PHASA s.7 implications.</>} doInstead={<>Read the colour band before discharge. Two seconds. Black = CO2 (electrical OK). Blue = dry powder (electrical OK). Red = water (NOT electrical). If only water available and you can&apos;t isolate the supply, evacuate.</>} />

          <CommonMistake title="Attempting an extinguisher attack with no escape route" whatHappens={<>Operative approaches a fire with the only exit BEYOND the fire. Discharge attempt fails; smoke spreads; operative is now trapped. Multi-prosecution event; preventable through evacuation thinking.</>} doInstead={<>Always have an escape route BEHIND you when approaching a fire. Don&apos;t advance into a position where you can&apos;t withdraw safely. If escape would require passing the fire, evacuate immediately.</>} />

          <RegsCallout
            source="Regulatory Reform (Fire Safety) Order 2005 — Article 14(1)"
            clause={
              <>
                &quot;Where necessary in order to safeguard the safety of relevant
                persons, the responsible person must ensure that routes to
                emergency exits from premises and the exits themselves are kept
                clear at all times.&quot;
              </>
            }
            meaning={
              <>
                Article 14 — emergency routes and exits. Linked Article 14(2)
                provides additional detail: routes must lead as directly as
                possible to a place of safety; sufficient in number and
                dimensions for evacuation of all persons; doors must open in the
                direction of escape where required; emergency lighting and
                signage as needed. The L3 supervisor working on commercial
                premises does not park materials in escape routes, does not
                obstruct fire doors, and challenges others who do.
              </>
            }
            cite="Source: Regulatory Reform (Fire Safety) Order 2005 (SI 2005/1541), Article 14."
          />

          <Scenario title="Small electrical fire in a customer's distribution board" situation={<>Mid-morning install at a small commercial unit. You're working on the supply side; isolation is already in place at the meter. As you work, you hear a crackle from the OTHER side of the building\'s main DB (separate circuit, not isolated). Walking over you see a small fire (size of a tennis ball) inside the lower portion of the DB; smoke starting to emerge.</>} whatToDo={<>Six-condition check: (1) trained — yes, EFAW + extinguisher use; (2) fire is small — yes; (3) correct extinguisher — building has CO2 nearby; (4) escape route behind — yes, corridor; (5) 999 — call now or have customer call; (6) can withdraw — yes. PROCEED with fire-fighting attempt. Step 1 — call 999 (or have customer do it). Step 2 — isolate the affected DB at the meter / cut-out (DNO consent for cut-out fuse withdrawal where applicable; if not possible safely, leave isolation to fire service). Step 3 — PASS technique with CO2 — pull pin, aim at base of fire (lower portion of DB), squeeze, sweep. Stay back (CO2 has short range; protect yourself). Step 4 — observe outcome. If extinguished, withdraw; do NOT restore power; await fire service to confirm. If not controlled within discharge time, withdraw and evacuate. Step 5 — evacuate the building regardless; call account-for, brief fire service on arrival. Step 6 — preserve scene; document; RIDDOR if any injury or 24+ hour plant stoppage.</>} whyItMatters={<>The L3 supervisor decision is structured — six conditions, decision, action, withdrawal trigger. The customer&apos;s site management may or may not be present; you may be the senior trade with a real fire. Your decision shapes whether the fire is controlled or escalates. The default is conservative — evacuate when in doubt — but a clear go-decision when conditions support it can stop a small fire before it becomes a large one.</>} />

          <SectionRule />
          <ContentEyebrow>BS 9999 / BS 9991 — fire safety in design</ContentEyebrow>

          <ConceptBlock
            title="How fire design choices shape the operative&apos;s daily decisions"
            plainEnglish="BS 9999 (commercial / industrial / mixed-use) and BS 9991 (residential) are the headline UK fire-design codes for buildings. They set out compartmentation, escape routes, alarm system design, suppression, smoke control. The L3 electrician working in occupied premises rarely designs to these standards but operates inside them: routing cables across compartment lines requires intumescent firestopping; service penetrations need correct fire-rated seals; alterations to escape lighting circuits affect a building&apos;s compliance with its FRA."
            onSite="The L3 supervisor reflex on any work involving service penetrations: how does this penetration affect compartmentation? Has the right fire-stopping product been specified? Is there documentation? The Hackitt review and the post-Grenfell regulatory tightening mean fire-stopping is now under serious scrutiny — Building Safety Act 2022 has extended this materially. A penetration left unsealed is a defect that may be discovered decades later under the 30-year retrospective limitation."
          >
            <p>Fire-design touchpoints that affect electrical work:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Compartmentation</strong> — walls / floors rated to contain fire
                for a specified period (typically 30 / 60 / 120 min); penetrations need
                matching fire-stopping.
              </li>
              <li>
                <strong>Fire-stopping products</strong> — intumescent pillows / collars,
                fire-rated mastics, batt + coating systems; product-specific to penetration
                size, substrate, services type.
              </li>
              <li>
                <strong>Cable types in escape routes</strong> — LSF / LSZH preferred for
                low smoke and low corrosivity; CPR classification under EN 13501-6 mandatory.
              </li>
              <li>
                <strong>FP200 / Mineral-insulated</strong> — for circuits required to
                function during fire (fire alarm, emergency lighting supply, smoke control).
              </li>
              <li>
                <strong>BS 5839</strong> — fire detection and alarm system design;
                categorised L1-L5 (life safety) and P1-P3 (property protection).
              </li>
              <li>
                <strong>BS 5266</strong> — emergency lighting (escape route, open area,
                high-risk task; 3 hour duration; monthly + annual tests).
              </li>
              <li>
                <strong>Smoke ventilation</strong> — natural / mechanical; control panel
                interlocks with fire alarm.
              </li>
              <li>
                <strong>Documentation</strong> — fire safety file under Building Regs
                Part B; retained for the life of the building.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="AFDD and the electrical-fire prevention shift"
            plainEnglish="Arc Fault Detection Devices (AFDDs) detect the high-frequency signatures of arc faults — series arcs from loose terminations, parallel arcs from damaged cables, ground arcs — that conventional MCB and RCD protection misses. AFDDs sit alongside MCB / RCBO at the consumer unit and disconnect the circuit if arc signatures are detected. BS 7671 Reg 421.1.7 (Amendment 2:2022) mandates AFDDs for socket-outlets up to 32 A in higher-risk locations — purpose-built student accommodation, care homes, certain HMOs, certain Building Safety Act 2022 higher-risk residential buildings — and recommends them more widely. The 2024-2026 BS 7671 update path is widening the scope."
            onSite="The L3 supervisor on installs in scope of Reg 421.1.7 verifies AFDD provision; on EICRs records absence of AFDD where mandatory as a code C2 (potentially dangerous) and where strongly recommended as C3 (improvement). The conversation with the customer about AFDD is grounded in real fire-risk evidence — arc faults from loose terminations are a known ignition source in fires of unknown electrical origin. AFDD adds cost (typically £40-£80 per circuit at trade) but provides protection that no other device delivers."
          >
            <p>AFDD considerations:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Detection technology</strong> — distinguishes arc
                signatures from normal switching transients using microprocessor
                analysis.
              </li>
              <li>
                <strong>Compatibility</strong> — verify with consumer unit
                manufacturer; not all devices interchangeable.
              </li>
              <li>
                <strong>Testing</strong> — built-in test button; periodic test
                similar to RCD test regime.
              </li>
              <li>
                <strong>BS 7671 requirements</strong> — Reg 421.1.7 mandates
                for specific occupancies; Reg 421.1.201 references the broader
                application.
              </li>
              <li>
                <strong>Building Safety Act 2022</strong> — interaction with
                HRB requirements increasingly significant.
              </li>
              <li>
                <strong>Cost vs benefit</strong> — significant cost vs serious
                fire-risk reduction; the L3 recommendation discussion is
                grounded in evidence.
              </li>
              <li>
                <strong>Existing installations</strong> — retrofit possible
                where consumer unit accepts the device; CU upgrade may be
                required.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Fire risk assessment and the responsible-person duty</ContentEyebrow>

          <ConceptBlock
            title="The RRFSO 2005 framework end-to-end"
            plainEnglish="The Regulatory Reform (Fire Safety) Order 2005 is the umbrella fire-safety statute for England and Wales (broadly equivalent regimes apply in Scotland and Northern Ireland). It places duties on the &apos;responsible person&apos; — typically the employer, building owner, or person in control of premises — for all non-domestic premises and the common parts of multi-occupied residential. The headline duties are Article 9 (fire risk assessment), Article 10 (principles of prevention from MHSWR Sched 1), Article 11 (fire safety arrangements), Article 13 (fire-fighting and detection equipment), Article 14 (emergency routes and exits), Article 15 (procedures for serious and imminent danger), Article 17 (maintenance), Article 18 (safety assistance from competent person), Article 19 (information to employees), Article 21 (training), and Article 22 (cooperation and coordination)."
            onSite="The L3 supervisor reading the fire risk assessment before working in any commercial / non-domestic premises: what hazards has the responsible person identified; what controls are in place; where are extinguishers located; what is the alarm system category; what is the evacuation procedure; who are the fire wardens. The FRA tells you how to work safely within the building&apos;s fire-safety arrangements. After your works are complete, the responsible person should review the FRA to reflect any changes — new socket layout, new equipment, modifications to compartmentation, changes to escape routes."
          >
            <p>RRFSO Article duties in summary:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Article 8</strong> — general duty of responsible person to
                take general fire precautions for safety of relevant persons.
              </li>
              <li>
                <strong>Article 9</strong> — suitable and sufficient fire risk
                assessment, kept under review.
              </li>
              <li>
                <strong>Article 10</strong> — principles of prevention (MHSWR
                Schedule 1 hierarchy applied to fire risk).
              </li>
              <li>
                <strong>Article 11</strong> — fire safety arrangements (planning,
                organisation, control, monitoring, review).
              </li>
              <li>
                <strong>Article 13</strong> — fire-fighting equipment and fire
                detection / warning.
              </li>
              <li>
                <strong>Article 14</strong> — emergency routes and exits
                (adequate, kept clear, illuminated, signposted).
              </li>
              <li>
                <strong>Article 15</strong> — procedures for serious and imminent
                danger (evacuation, assembly points, fire wardens).
              </li>
              <li>
                <strong>Article 17</strong> — maintenance of fire safety equipment
                and facilities.
              </li>
              <li>
                <strong>Article 18</strong> — appointment of competent person to
                assist in safety measures.
              </li>
              <li>
                <strong>Article 21</strong> — training of employees in fire safety
                procedures.
              </li>
              <li>
                <strong>Article 22</strong> — cooperation and coordination where
                multiple responsible persons share premises.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Fire wardens, evacuation and the L3 contribution"
            plainEnglish="On commercial premises the responsible person typically appoints fire wardens — designated employees trained to manage evacuation in their area, sweep their area for stragglers, count personnel at the assembly point, and liaise with the fire service on arrival. Fire warden training under Article 21 covers alarm activation, evacuation procedures, use of fire-fighting equipment, special-needs evacuation (mobility-impaired persons, PEEPs — Personal Emergency Evacuation Plans), and roles at assembly. The L3 supervisor working on site participates in the building&apos;s evacuation arrangements — knows the alarm tone, the muster point, the warden colours."
            onSite="Practical interaction: before starting work on a new site, ask the responsible person for the evacuation procedure briefing. Know the alarm sound, the route, the assembly point, the warden contact. If your work involves isolating fire-alarm zones (common during commissioning, maintenance, alterations), liaise with the responsible person to issue an &apos;impairment notice&apos; or fire-watch arrangement during the isolation. Don&apos;t silence an alarm panel without authorisation; don&apos;t leave a system in a disabled state at end of shift without explicit handover."
          >
            <p>L3 supervisor evacuation-arrangement checks:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Alarm tone identified; recognised by team.</li>
              <li>Primary and secondary evacuation routes from work area.</li>
              <li>Assembly point location.</li>
              <li>Fire warden identification on site.</li>
              <li>Special-needs evacuation arrangements (PEEPs) where relevant.</li>
              <li>Fire-fighting equipment locations.</li>
              <li>Out-of-hours arrangements if working outside normal occupancy.</li>
              <li>Impairment-notice procedure where the work disables fire systems.</li>
              <li>Re-instatement procedure end of shift / end of works.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Regulatory Reform (Fire Safety) Order 2005 — Article 21 (Training)"
            clause={
              <>
                &quot;(1) The responsible person must ensure that his employees are
                provided with adequate safety training — (a) at the time when they
                are first employed; and (b) on their being exposed to new or
                increased risks because of — (i) their being transferred or given a
                change of responsibilities within the responsible person&apos;s
                undertaking; (ii) the introduction of new work equipment into, or a
                change respecting work equipment already in use within, the
                responsible person&apos;s undertaking; (iii) the introduction of new
                technology into the responsible person&apos;s undertaking; or (iv)
                the introduction of a new system of work into, or a change
                respecting a system of work already in use within, the responsible
                person&apos;s undertaking.&quot;
              </>
            }
            meaning={
              <>
                Article 21 — the training duty for the responsible person. Triggers
                cover new starters, role changes, new equipment, new technology,
                new systems of work. Records of training retained as evidence of
                competence. For the L3 supervisor working on commercial premises,
                this is the article that explains why the customer&apos;s in-house
                staff have been to fire warden training — and why your team
                attending a brief site induction is built into the customer&apos;s
                arrangements.
              </>
            }
            cite="Source: Regulatory Reform (Fire Safety) Order 2005 (SI 2005/1541), Article 21."
          />

          <SectionRule />
          <ContentEyebrow>Fire detection and alarm systems — BS 5839 in depth</ContentEyebrow>

          <ConceptBlock
            title="Designing, commissioning and maintaining FDA systems"
            plainEnglish="BS 5839-1:2017+A2:2023 covers fire detection and fire alarm systems in non-domestic premises (and BS 5839-6:2019+A1:2020 covers domestic). The standard categorises systems by their primary purpose — L1-L5 for life protection and P1-P2 for property protection, with M (manual) where only call-points are provided. The category determines detector placement, audibility, alarm zones, fault response, monitoring. The standard sets out the duties of the designer, installer, commissioning engineer and maintainer — each role requires recorded competence."
            onSite="The L3 supervisor reading the FDA design before working: what category is specified; does the existing installation match; what zones cover the area I&apos;m working in; what is the impact of disabling a detector or zone during my work. Commissioning under BS 5839-1 requires a full system test, false-alarm management plan, log book, training of the user. Periodic maintenance under Article 17 RRFSO is typically quarterly servicing by competent specialist with annual full system test. Records retained in the system log book."
          >
            <p>BS 5839-1 system categories detail:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>L1</strong> — life safety throughout; detection in all
                areas including escape routes, plant rooms, voids, sleeping
                areas.
              </li>
              <li>
                <strong>L2</strong> — life safety in defined sleeping areas plus
                escape routes plus high-fire-risk rooms.
              </li>
              <li>
                <strong>L3</strong> — life safety in escape routes plus rooms
                opening onto them.
              </li>
              <li>
                <strong>L4</strong> — life safety in escape routes only.
              </li>
              <li>
                <strong>L5</strong> — life safety in specific defined locations
                only (typically supplementary to other protection).
              </li>
              <li>
                <strong>P1</strong> — property protection throughout the
                building (every room).
              </li>
              <li>
                <strong>P2</strong> — property protection in defined high-risk
                areas only.
              </li>
              <li>
                <strong>M</strong> — manual call points only; no automatic
                detection.
              </li>
              <li>
                <strong>Domestic LD1-LD3</strong> — under BS 5839-6, scaled
                versions for residential use.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="False alarm management — the BS 5839-1 framework"
            plainEnglish="False alarms are a major operational issue in FDA systems — they cause unnecessary evacuations, occupant complacency, and lost confidence in the system. BS 5839-1 sets out a false-alarm management framework: investigate causes, classify by category (genuine, unwanted (e.g. burnt toast), false (system fault), malicious), record in the log book, take remedial action. Where the false-alarm rate exceeds the standard&apos;s benchmark (1 per 100 detectors per year), system review is required."
            onSite="The L3 supervisor doing fire-alarm maintenance investigates each recent false-alarm log entry — what triggered it, what zone, what time, what category. Patterns indicate underlying causes: corridor detectors near kitchens going off at lunchtime suggest cooking-fume sensitivity; detectors in plant rooms going off during start-up suggest dust or steam issues; intermittent zone faults suggest cable or terminal degradation. Each pattern has a remedy — sensor relocation, sensor type change, addressable system reconfiguration. The L3 frames the customer conversation in terms of evacuation reliability."
          >
            <p>BS 5839-1 false-alarm categories:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Genuine fire</strong> — real fire detected; system
                worked.
              </li>
              <li>
                <strong>Unwanted fire signals</strong> — system detected a real
                event that was not a fire (cooking, dust, steam, aerosol,
                cigarette smoke).
              </li>
              <li>
                <strong>False alarm from system fault</strong> — detector
                failure, cable fault, loop fault, electromagnetic interference.
              </li>
              <li>
                <strong>Malicious false alarm</strong> — someone deliberately
                activated a manual call point.
              </li>
              <li>
                <strong>Good-intent false alarm</strong> — someone genuinely
                believed there was a fire (e.g. saw smoke that turned out to be
                steam).
              </li>
              <li>
                <strong>Reporting</strong> — record by category and zone in the
                system log book.
              </li>
              <li>
                <strong>Remedial action</strong> — sensor relocation, type
                change, addressable reconfiguration, training of occupants.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Regulatory Reform (Fire Safety) Order 2005 — Article 13(1)"
            clause={
              <>
                &quot;Where necessary in order to safeguard the safety of relevant
                persons, the responsible person must ensure that — (a) the
                premises are, to the extent that it is appropriate, equipped with
                appropriate fire-fighting equipment and with fire detectors and
                alarms; and (b) any non-automatic fire-fighting equipment so
                provided is easily accessible, simple to use and indicated by
                signs.&quot;
              </>
            }
            meaning={
              <>
                Article 13 — the duty to provide appropriate fire-fighting
                equipment, fire detectors and alarms. &quot;Appropriate&quot; is
                determined by the fire risk assessment under Article 9. For a
                small commercial premises this may be a basic L2 category alarm
                system with extinguishers on each floor; for a large healthcare
                building it may be an L1 addressable system with sprinkler
                protection, multiple alarm zones, voice alarm, and connection to
                a permanently-manned ARC.
              </>
            }
            cite="Source: Regulatory Reform (Fire Safety) Order 2005 (SI 2005/1541), Article 13."
          />

          <Scenario
            title="Fire alarm system in maintenance mode at end of shift"
            situation={
              <>
                You are part-way through a 3-day refurbishment of a small commercial
                fire alarm panel. The system is currently in maintenance mode with
                detection in zones 2 and 3 disabled while you complete cabling
                works. End of shift approaches at 17:00; the customer&apos;s offices
                will be occupied by cleaning staff overnight. You haven&apos;t
                completed the zone re-instatement.
              </>
            }
            whatToDo={
              <>
                Stop. The building cannot lawfully be left occupied with detection
                disabled — that&apos;s a clear breach of the customer&apos;s RRFSO
                Article 13 / 17 duties and exposes the cleaning staff to
                unprotected risk. Options: (1) Complete the re-instatement before
                leaving, even if it means working an extra hour and being late
                home. (2) If physically impossible to complete, agree with the
                customer&apos;s responsible person an &apos;impairment notice&apos;
                — fire watch by trained warden in the affected zones for the
                duration of the occupancy, with the watch ending only when zones
                are re-instated. Document the impairment notice in writing — start
                time, scope, fire-watch arrangement, expected end time. (3) If the
                responsible person can&apos;t arrange a fire watch, escalate up the
                chain or arrange one with the customer&apos;s consent — the L3
                supervisor doesn&apos;t leave a known unprotected risk because
                it&apos;s 17:00. (4) Brief the cleaning staff supervisor directly
                if no responsible person is on site at handover. (5) Document
                everything in the job pack. Next morning, complete the
                re-instatement first thing, lift the impairment, sign off, brief
                the customer.
              </>
            }
            whyItMatters={
              <>
                Multiple post-Grenfell fire-system prosecutions have featured exactly
                this fact pattern — engineers leaving systems in impaired states
                without proper handover or fire-watch arrangements. The HSE and the
                fire and rescue service (under FRS Act 2004 powers) both prosecute
                in this space. The L3 supervisor&apos;s discipline at the
                handover point — &apos;the system is impaired, here is the
                fire-watch, here is the expected re-instatement time, signed and
                dated&apos; — is the documentary defence. Without it, if a fire
                occurs in the impaired zones overnight, the prosecution path is
                straightforward and personal liability under HASAWA s.7 attaches.
              </>
            }
          />

          <SectionRule />
          <ContentEyebrow>Building Safety Act 2022 — the post-Grenfell regime</ContentEyebrow>

          <ConceptBlock
            title="Lithium battery safety — emerging fire risk"
            plainEnglish="Lithium-ion battery fires are an emerging and rapidly growing fire-risk category. e-bike and e-scooter battery fires alone cause multiple UK fatalities each year and substantial property losses. Battery storage systems (BESS) in residential and commercial premises are increasing as solar PV installations grow. Workshop power-tool batteries on charge represent direct workplace risk. The chemistry — thermal runaway, self-fuelled combustion, very high temperature, toxic smoke, re-ignition — makes lithium fires uniquely difficult to extinguish. Standard fire-fighting equipment is largely ineffective."
            onSite="The L3 supervisor on installs involving lithium batteries (PV+battery installs, EV charging, workshop charging) builds fire-prevention into the design. Manufacturer guidance on battery placement (compartment ventilation, distance from combustibles, fire-rated enclosures); charging infrastructure (correct charger, monitoring, isolation when not in use); occupancy controls (battery storage in fire-rated cabinet; charging in fire-safe area; never in escape route). On EICR the L3 records lithium-related fire risk as commentary when seen — daisy-chained extension leads charging multiple batteries, batteries stored in combustible enclosures, BESS without manufacturer-spec ventilation."
          >
            <p>Lithium battery fire-prevention practices:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Quality batteries</strong> — manufacturer-original;
                avoid counterfeits which lack thermal protection.
              </li>
              <li>
                <strong>Correct charger</strong> — matched to the battery
                chemistry and capacity; CE-marked.
              </li>
              <li>
                <strong>Charging area</strong> — fire-rated cabinet or open
                area; away from combustibles; supervised where possible.
              </li>
              <li>
                <strong>Damage protocol</strong> — damaged batteries removed
                from service immediately; quarantined in fire-rated container.
              </li>
              <li>
                <strong>BESS installations</strong> — manufacturer guidance on
                location, ventilation, fire separation; ESC IET Code of
                Practice for Electrical Energy Storage Systems.
              </li>
              <li>
                <strong>Smoke detection</strong> — coverage of charging areas;
                early warning critical given fast escalation.
              </li>
              <li>
                <strong>Specialist extinguishers</strong> — AVD-based or
                lithium-specific products where appropriate; standard
                extinguishers are not effective.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="HRBs, the golden thread and the L3 contribution"
            plainEnglish="The Building Safety Act 2022 created a new regulatory regime for higher-risk buildings (HRBs) — residential buildings at least 18 m or 7 storeys with two or more residential units. The Act establishes the Building Safety Regulator (within HSE), three-gateway approval process, named Accountable Persons with duty for safety case throughout occupation, mandatory occurrence reporting, and the &apos;golden thread&apos; — a digital information record covering design, construction, occupation, maintenance and any modifications for the life of the building. Fire safety information sits at the centre of the golden thread."
            onSite="The L3 contractor working on an HRB project (new build or major refurbishment) operates under significantly tighter regulation than typical commercial. Every penetration of compartmentation is recorded with product, installer, date, photo. Every change to fire-safety systems is reflected in the safety case. The Principal Contractor under BSA 2022 has elevated duties beyond CDM 2015. The L3 supervisor records their work in detail and submits to the golden-thread keeper — typically the Principal Contractor or, in occupation, the Accountable Person. Sloppy records on an HRB are a regulatory failure with personal-liability consequences extending decades into the future."
          >
            <p>Building Safety Act 2022 elements affecting electrical work:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>HRB definition</strong> — 18 m or 7 storeys minimum with
                2+ residential units; care home and hospital additions apply in
                Wales / Scotland equivalent regimes.
              </li>
              <li>
                <strong>Gateway 1</strong> — planning stage fire safety review.
              </li>
              <li>
                <strong>Gateway 2</strong> — pre-construction; BSR approval
                before any construction starts.
              </li>
              <li>
                <strong>Gateway 3</strong> — pre-occupation; BSR approval before
                occupation; full as-built compliance evidence.
              </li>
              <li>
                <strong>Golden thread</strong> — digital record of design,
                construction, maintenance, modification; retained for the life
                of the building.
              </li>
              <li>
                <strong>Accountable Person</strong> — named individual or
                organisation with safety duty during occupation.
              </li>
              <li>
                <strong>Safety case</strong> — documented case for the building&apos;s
                fire and structural safety; reviewed at intervals.
              </li>
              <li>
                <strong>Occurrence reporting</strong> — mandatory reporting of
                fire-safety occurrences to BSR.
              </li>
              <li>
                <strong>Principal Designer / Principal Contractor under
                BSA</strong> — additional duties beyond CDM 2015 for HRBs.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            "Remember from L2 — five fire classes plus electrical, colour-coded extinguishers.",
            "BS EN 3: A (water-red), B (foam-cream / CO2-black), C (powder-blue), D (specialist), F (wet chemical-yellow). Electrical = CO2 or dry powder.",
            "Default = evacuate. Six conditions for safe extinguisher use: trained, small, correct class, escape route behind, 999 called, can withdraw.",
            "PASS technique: Pull, Aim (at base), Squeeze, Sweep.",
            "Discharge times short — plan operation; don't waste.",
            "Lithium battery fires require specialist response; standard extinguishers ineffective.",
            "RRFSO 2005 places fire-fighting equipment duty on responsible person; fire risk assessment determines provision.",
            "L3 supervisor makes the fight-vs-evacuate call calmly and clearly; default conservative.",
            "RRFSO 2005 Articles 9 / 11 / 13 / 14 / 17 / 21 — responsible-person duties for FRA, arrangements, equipment, escape routes, maintenance, training.",
            "Fire compartmentation under Building Regs Part B — penetrations through compartment lines must be fire-stopped to the same rating.",
            "Emergency lighting BS 5266 — 1 lux on escape route centreline, 3-hour duration, monthly function test, annual 3-hour discharge.",
            "AFDD under BS 7671 Reg 421.1.7 — mandatory in specific higher-risk residential occupancies; recommended more widely.",
            "Impairment notice + fire watch where work disables fire systems during occupied periods.",
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
