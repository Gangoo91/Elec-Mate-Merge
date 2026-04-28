/**
 * Module 1 · Section 4 · Subsection 1 — CLP pictograms: hazardous substance labels
 * Maps to City & Guilds 2365-03 / Unit 201 / LO4 / AC 4.1
 *   AC 4.1 — "identify warning pictograms for hazardous substances, as defined by the
 *            GB CLP Regulation"
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import { TLDR, ConceptBlock, RegsCallout, CommonMistake, Scenario, KeyTakeaways, FAQ, LearningOutcomes, ContentEyebrow, SectionRule } from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'CLP pictograms (4.1) | Level 3 Module 1.4.1 | Elec-Mate';
const DESCRIPTION = 'L3 CLP pictograms — nine GHS / CLP hazard pictograms, what each means, and reading the SDS for the full picture beyond the label.';

const checks = [
  { id: 'l3-m1-s4-sub1-pictograms', question: 'How many CLP / GHS hazard pictograms exist?', options: ['Three.', 'Nine — explosive, flammable, oxidising, gas under pressure, corrosive, toxic, harmful / irritant, health hazard (long-term / chronic), environmental hazard. Each is red-bordered diamond. The label is supplemented by hazard statements (H-codes) and precautionary statements (P-codes).', 'Twenty.', 'Just one.'], correctIndex: 1, explanation: 'Nine pictograms in the GB CLP Regulation (UK\'s implementation post-Brexit; aligned with EU CLP). Knowing all nine and the headline meanings is L3-essential.' },
  { id: 'l3-m1-s4-sub1-sds', question: 'What\'s an SDS and why is the L3 reading it, not just the label?', options: ['Just a sticker.', 'Safety Data Sheet — 16-section document supplied by the manufacturer / supplier covering identification, hazard ID, composition, first aid, fire fighting, accidental release, handling and storage, exposure controls and PPE, physical and chemical properties, stability and reactivity, toxicology, ecology, disposal, transport, regulation, other. The label gives headlines; the SDS gives the operational detail.', 'Optional.', 'Customer-only.'], correctIndex: 1, explanation: 'The SDS is the operational reference. L3 supervisor reads it before substances come on site; ensures it\'s available to operatives.' },
  { id: 'l3-m1-s4-sub1-health', question: 'Which pictogram covers carcinogens, mutagens and reproductive toxins?', options: ['Skull.', 'Health hazard pictogram — silhouetted figure with star burst on chest. Covers carcinogenicity, mutagenicity, reproductive toxicity, respiratory sensitisation, target organ toxicity (single or repeated exposure), aspiration hazard. Distinguishes long-term / chronic risks from acute toxicity (skull).', 'Flame.', 'Tree.'], correctIndex: 1, explanation: 'Health hazard ≠ skull. Skull = acute toxicity (short-term). Silhouetted figure = chronic / long-term. Important distinction because the management strategy differs.' },
];

const quizQuestions = [
  { id: 1, question: 'What does GB CLP stand for?', options: ['General British Cleaning Products.', 'Great Britain Classification, Labelling and Packaging Regulation. UK\'s post-Brexit implementation of the CLP rules (formerly EU CLP). Aligned with the UN Globally Harmonised System (GHS). Defines how hazardous chemicals must be classified, labelled and packaged for supply.', 'Generic Label Product.', 'Government Lighting Plan.'], correctAnswer: 1, explanation: 'GB CLP is the UK regulation; aligns with EU CLP and GHS. Post-Brexit the UK retained the CLP framework.' },
  { id: 2, question: 'What does the "exploding bomb" pictogram indicate?', options: ['Birthday party.', 'Explosive substances and articles, self-reactive substances, organic peroxides — anything that can detonate or undergo violent self-reactive decomposition.', 'Loud noise.', 'Fast delivery.'], correctAnswer: 1, explanation: 'Explosives and self-reactives. Rare in electrical work but check labels.' },
  { id: 3, question: 'What does the "flame" pictogram indicate?', options: ['Hot food.', 'Flammable substances — gases, aerosols, liquids, solids; pyrophoric (catches fire on contact with air); self-heating; substances which in contact with water emit flammable gases.', 'Bright lights.', 'Fast cars.'], correctAnswer: 1, explanation: 'Flammables. Common in solvents, cleaners, contact sprays.' },
  { id: 4, question: 'What does the "flame over circle" pictogram indicate?', options: ['Sun.', 'Oxidisers — substances that release oxygen and can intensify fire. Includes oxidising gases, liquids, solids.', 'Cold.', 'Empty.'], correctAnswer: 1, explanation: 'Oxidisers feed fire. Stored separately from flammables.' },
  { id: 5, question: 'What does the "skull and crossbones" pictogram indicate?', options: ['Pirates.', 'Acute toxicity — substances harmful by single short-term exposure (oral, dermal, inhalation). Includes acutely toxic gases, liquids, solids. Distinguished from chronic / long-term toxicity.', 'Halloween.', 'Sport.'], correctAnswer: 1, explanation: 'Acute toxicity = short-term harm from a single or short exposure. Different management strategy from chronic.' },
  { id: 6, question: 'What does the "corrosion" pictogram indicate?', options: ['Rust on a car.', 'Corrosive substances — cause skin burns, eye damage, corrosive to metals. Includes strong acids and bases. Splash exposure or eye contact requires immediate eye-wash / shower response.', 'Old equipment.', 'Bad weather.'], correctAnswer: 1, explanation: 'Corrosives need immediate first-aid response. Eye-wash kit and emergency shower important for sites handling them.' },
  { id: 7, question: 'What does the "exclamation mark" pictogram indicate?', options: ['Surprise.', 'Harmful / irritant — acute toxicity (less severe than skull category), skin / eye irritation, skin sensitisation, respiratory tract irritation, narcotic effects. Lower-severity hazards than the more specific pictograms.', 'Important.', 'Loud.'], correctAnswer: 1, explanation: 'Lower-severity hazards. Still requires PPE and hierarchy of control; not "minor" because of the pictogram.' },
  { id: 8, question: 'What does the "environment" pictogram (dead tree and fish) indicate?', options: ['Nature reserve.', 'Hazardous to the aquatic environment — acute or chronic. Substances that cause death of aquatic life or long-term damage to aquatic ecosystems. Triggers waste-handling and discharge controls.', 'Park.', 'Garden.'], correctAnswer: 1, explanation: 'Environmental hazard pictogram. Disposal route critical; can\'t go to general drainage. EPA s.34 duty of care + Environmental Permitting Regs.'  },
];

const faqs = [
  { question: 'Where do I find the SDS for substances in the firm\'s van?', answer: 'Manufacturer / supplier provides — usually downloadable from supplier website. Firm should maintain a register of substances + current SDS. L3 supervisor verifies SDS available before substance is used.' },
  { question: 'Are old "orange square" symbols still valid?', answer: 'No — the old EU CHIP scheme orange-square symbols were replaced by CLP red-diamond pictograms from 2015. Anything still using the old symbols is out of date; treat with caution and verify the SDS.' },
  { question: 'What\'s the difference between "Danger" and "Warning" signal words?', answer: 'Both appear on CLP labels. Danger = more severe hazard categories. Warning = less severe. Plus the same pictogram can carry either signal word depending on category.' },
  { question: 'Do I need an SDS for a small quantity?', answer: 'Yes if it\'s a substance covered by CLP and used at work. The 16-section SDS is the standard regardless of quantity — it informs safe handling.' },
  { question: 'How does CLP interact with COSHH?', answer: 'CLP labels and classifies substances as supplied. COSHH controls exposure to those substances at work. CLP pictogram on the container is the trigger for COSHH risk assessment of how the substance will be used.' },
  { question: 'What pictograms are most common on electrical-trade products?', answer: 'Flame (solvents, contact sprays, lubricants), exclamation mark (cleaners, contact lubricant), corrosion (battery electrolyte), gas under pressure (aerosol cans, refrigerants), environment (some lubricants and cleaners).' },
];

export default function Sub1() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);
  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section4')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"><ArrowLeft className="h-4 w-4" /> Section 4</button>
          <PageHero eyebrow="Module 1 · Section 4 · Subsection 1" title="CLP pictograms — hazardous substance labels" description="Remember from L2 — pictograms warn you of hazard. At L3 you read the SDS too, and you ensure it's available before substances come on site." tone="emerald" />
          <TLDR points={[
            "Nine GB CLP pictograms — explosive, flammable, oxidising, gas under pressure, corrosive, acute toxicity (skull), health hazard (chronic), harmful (exclamation), environmental.",
            "Pictograms = headlines. Safety Data Sheet (16 sections) = operational detail. L3 reads both.",
            "CLP triggers COSHH risk assessment. Label tells you it's a hazardous substance; COSHH tells you how to use it safely.",
          ]} />
          <LearningOutcomes outcomes={[
            "Identify all nine GB CLP hazard pictograms and the categories each represents.",
            "Distinguish acute toxicity (skull) from chronic / long-term hazards (silhouetted figure).",
            "Read a Safety Data Sheet (16 sections) and identify operationally-relevant content.",
            "Recognise the relationship between CLP labelling and COSHH risk assessment.",
            "Identify common pictograms on electrical-trade substances.",
            "Apply L3 supervisor verification — SDS available before substance on site.",
          ]} initialVisibleCount={3} />

          <ContentEyebrow>The nine pictograms</ContentEyebrow>
          <ConceptBlock title="Red-bordered diamonds, white background, black symbol" plainEnglish="GB CLP pictograms are standardised across the world via the UN Globally Harmonised System (GHS). The same nine appear on chemical labels worldwide. UK's GB CLP Regulation is the post-Brexit implementation aligned with EU CLP." onSite="Recognise all nine on sight. The pictogram is the headline; supplementary text (signal word, hazard statement, precautionary statement) provides detail.">
            <p>The nine pictograms:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Exploding bomb (GHS01)</strong> — explosives, self-reactives, organic peroxides.</li>
              <li><strong>Flame (GHS02)</strong> — flammable gases, aerosols, liquids, solids; pyrophoric; self-heating.</li>
              <li><strong>Flame over circle (GHS03)</strong> — oxidisers.</li>
              <li><strong>Gas cylinder (GHS04)</strong> — gases under pressure (compressed, liquefied, refrigerated, dissolved).</li>
              <li><strong>Corrosion (GHS05)</strong> — corrosive to metals, skin burn, eye damage.</li>
              <li><strong>Skull and crossbones (GHS06)</strong> — acute toxicity (short-term high severity).</li>
              <li><strong>Exclamation mark (GHS07)</strong> — acute toxicity lower severity, irritation, sensitisation.</li>
              <li><strong>Health hazard (GHS08)</strong> — carcinogens, mutagens, reproductive toxins, target organ toxicity, respiratory sensitisers, aspiration.</li>
              <li><strong>Environment (GHS09)</strong> — hazardous to the aquatic environment.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="GB CLP Regulation — UK SI 2008/2852 as amended (UK retention of EU 1272/2008)" clause={<>Requires hazardous substances and mixtures to be classified into hazard classes; labelled with the appropriate pictogram, signal word ("Danger" or "Warning"), hazard statements (H-codes) and precautionary statements (P-codes); packaged safely. SDS to be supplied for substances classified as hazardous.</>} meaning={<>The labelling regulation. The pictogram is the visual headline; the SDS is the document. Both required for any substance classified as hazardous. CLP applies to manufacturers, importers, distributors and users.</>} cite="Source: GB Classification, Labelling and Packaging Regulation — UK retained EU 1272/2008 as amended; HSE guidance INDG350." />

          <InlineCheck {...checks[0]} />

          <SectionRule />
          <ContentEyebrow>The Safety Data Sheet (SDS)</ContentEyebrow>
          <ConceptBlock title="16-section operational document" plainEnglish="The Safety Data Sheet is the manufacturer / supplier's operational document accompanying the substance. 16 standardised sections cover everything from identification through first aid through disposal. The label is the headline; the SDS is the substance." onSite="L3 supervisor verifies SDS is available for any substance before it's used. Operatives should know where to find SDS quickly — in case of spillage, fire, exposure or first-aid event.">
            <p>SDS section structure:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1. Identification</strong> — product name, supplier, recommended use.</li>
              <li><strong>2. Hazard identification</strong> — classification, label elements, pictograms.</li>
              <li><strong>3. Composition / ingredients</strong> — substances, concentrations.</li>
              <li><strong>4. First-aid measures</strong> — routes of exposure, symptoms, treatment.</li>
              <li><strong>5. Fire-fighting measures</strong> — suitable extinguisher, hazardous combustion products.</li>
              <li><strong>6. Accidental release measures</strong> — containment, cleanup, environmental precautions.</li>
              <li><strong>7. Handling and storage</strong> — safe handling, incompatibilities, storage conditions.</li>
              <li><strong>8. Exposure controls / PPE</strong> — workplace exposure limits, engineering controls, recommended PPE.</li>
              <li><strong>9. Physical and chemical properties</strong>.</li>
              <li><strong>10. Stability and reactivity</strong>.</li>
              <li><strong>11. Toxicological information</strong>.</li>
              <li><strong>12. Ecological information</strong>.</li>
              <li><strong>13. Disposal considerations</strong> — waste handling, container disposal.</li>
              <li><strong>14. Transport information</strong> — UN number, transport class.</li>
              <li><strong>15. Regulatory information</strong>.</li>
              <li><strong>16. Other information</strong>.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />
          <InlineCheck {...checks[2]} />

          <SectionRule />
          <ContentEyebrow>Common substances on electrical sites</ContentEyebrow>
          <ConceptBlock title="What you'll meet and which pictograms" plainEnglish="Most electrical-trade substances carry one or more pictograms. Knowing which pictograms appear on the products you regularly handle lets you make quick risk-management decisions on site." onSite="The L3 supervisor maintains a substance register for the firm — what we use, what the pictograms are, what the SDS says, what controls apply. Reviewed periodically.">
            <p>Common products and headline pictograms:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Contact cleaner / electrical solvent</strong> — flame, exclamation, sometimes health hazard.</li>
              <li><strong>Lubricants and silicone sprays</strong> — flame (propellant), exclamation.</li>
              <li><strong>Copper grease</strong> — exclamation, sometimes health hazard.</li>
              <li><strong>Battery electrolyte (lead-acid)</strong> — corrosion, environment, possibly health hazard (lead).</li>
              <li><strong>Lithium battery cells</strong> — flame, gas under pressure (some), environment.</li>
              <li><strong>Refrigerants (F-Gas)</strong> — gas under pressure, environment, sometimes flame (HFO).</li>
              <li><strong>Solder and flux</strong> — health hazard (some lead-content), exclamation.</li>
              <li><strong>Mastic and adhesives</strong> — flame, exclamation, sometimes health hazard.</li>
              <li><strong>Insulating oils (transformer)</strong> — environment, sometimes health hazard.</li>
              <li><strong>Pump-out liquid (cleaning)</strong> — corrosion, environment.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Hazard statements, COSHH and operational management</ContentEyebrow>
          <ConceptBlock title="Hazard statements (H-codes) and precautionary statements (P-codes)" plainEnglish="CLP labels carry standardised hazard statements (H-codes) describing the hazard, and precautionary statements (P-codes) describing the response. The codes are the same internationally — H319 is &apos;causes serious eye irritation&apos; in any country. Knowing how to read them lets the L3 supervisor extract the operational meaning quickly." onSite="The H-codes give the &apos;what&apos;; the P-codes give the &apos;how to handle&apos;. Together with the pictogram they tell you what the substance does and what to do about it. Read them before sustained handling.">
            <p>Common H/P codes on electrical-trade products:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>H225</strong> — highly flammable liquid and vapour.</li>
              <li><strong>H304</strong> — may be fatal if swallowed and enters airways (aspiration hazard).</li>
              <li><strong>H315</strong> — causes skin irritation.</li>
              <li><strong>H319</strong> — causes serious eye irritation.</li>
              <li><strong>H335</strong> — may cause respiratory irritation.</li>
              <li><strong>H351</strong> — suspected of causing cancer.</li>
              <li><strong>H373</strong> — may cause damage to organs through prolonged exposure.</li>
              <li><strong>H410</strong> — very toxic to aquatic life with long lasting effects.</li>
              <li><strong>P210</strong> — keep away from heat / sparks / open flames.</li>
              <li><strong>P280</strong> — wear protective gloves / clothing / eye protection.</li>
              <li><strong>P305+P351+P338</strong> — IF IN EYES rinse cautiously with water for several minutes.</li>
              <li><strong>P501</strong> — dispose of contents / container in accordance with local regulations.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Workplace Exposure Limits (WELs)" plainEnglish="HSE EH40 lists Workplace Exposure Limits — concentrations of airborne substances above which exposure must not occur. Long-term (8-hour TWA) and short-term (15-minute) limits. The SDS section 8 references the relevant WEL where applicable." onSite="The L3 supervisor doesn&apos;t monitor air concentrations personally on every job, but knowing WELs exist informs the conversation about ventilation, extraction and PPE. For high-volume / high-frequency exposure, occupational hygiene monitoring may be required.">
            <p>Common substances with WELs relevant to electricians:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Respirable crystalline silica</strong> — 0.1 mg/m³ 8-hour TWA.</li>
              <li><strong>Lead (inorganic)</strong> — 0.15 mg/m³ 8-hour TWA + Control of Lead at Work Regs.</li>
              <li><strong>Solvent vapours (white spirit, IPA)</strong> — varies; commonly 100-500 ppm.</li>
              <li><strong>Solder fume (rosin-based)</strong> — 0.05 mg/m³ 8-hour TWA (very low; LEV typically required).</li>
              <li><strong>Wood dust (hard wood)</strong> — 3 mg/m³ 8-hour TWA.</li>
              <li><strong>Refrigerant gases</strong> — varies by gas; F-Gas Regs additional controls.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="COSHH risk assessment — operationalising CLP information" plainEnglish="COSHH Reg 6 requires assessment of substance hazards and adequate control. CLP labels and SDS provide the input; the COSHH assessment provides the operational output — what controls apply on this job, by whom, with what monitoring." onSite="The L3 supervisor often contributes to COSHH assessments for the firm or contributes the on-site verification. The assessment isn&apos;t a generic document; it&apos;s specific to the substances, the tasks and the persons exposed.">
            <p>COSHH assessment elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Substance identified</strong> — name, supplier, CLP classification.</li>
              <li><strong>How used</strong> — task, frequency, duration, quantity.</li>
              <li><strong>Who exposed</strong> — operatives, others (public, customers).</li>
              <li><strong>Route of exposure</strong> — inhalation, absorption, ingestion, injection.</li>
              <li><strong>WEL / health risk level</strong> — from SDS section 8 + EH40.</li>
              <li><strong>Control hierarchy applied</strong> — eliminate / substitute / engineer / administer / PPE.</li>
              <li><strong>Emergency response</strong> — first aid, spill, fire, eye exposure.</li>
              <li><strong>Health surveillance</strong> — required where exposure significant (Reg 11).</li>
              <li><strong>Records retained</strong> — for the period required by COSHH (40 years for some).</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Storage, transport and waste disposal" plainEnglish="CLP-classified substances trigger storage requirements (segregation by hazard, ventilation, secondary containment), transport requirements (ADR for road, segregation, documentation), and waste requirements (Hazardous Waste Regs 2005, EPA s.34 duty of care, consignment notes for hazardous, environment permits)." onSite="The L3 supervisor manages the operational side: van storage segregation, end-of-day return to compliant storage, used-substance disposal route. Mixing waste streams and routine van storage of incompatible products are common slippages.">
            <p>Storage / transport / waste essentials:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Segregation</strong> — flammables away from oxidisers; corrosives separated.</li>
              <li><strong>Ventilation</strong> — particularly for solvents and refrigerants.</li>
              <li><strong>Secondary containment</strong> — drip trays for liquids, sealed boxes for aerosols.</li>
              <li><strong>Van storage</strong> — typically a metal box for flammables, separate from passenger area.</li>
              <li><strong>Quantity limits</strong> — ADR limits when exceeded require driver training.</li>
              <li><strong>Hazardous waste</strong> — EPA s.34 duty of care; consignment notes; licensed carrier; permitted facility.</li>
              <li><strong>Empty containers</strong> — can still be hazardous (residue, vapour); dispose appropriately.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Health surveillance — when COSHH demands monitoring" plainEnglish="COSHH Reg 11 requires health surveillance where exposure to a hazardous substance presents an identified disease risk that monitoring can detect. Examples: lung function for silica / wood dust; skin checks for dermatitis-causing substances; biological monitoring for lead. Records retained 40 years (Reg 11(7))." onSite="The L3 supervisor doesn&apos;t arrange surveillance personally, but recognises when a job triggers it. Long-term silica chasing, repeated dermatitis-causing solvent contact, lead-paint disturbance — all warrant escalation to the firm&apos;s H&amp;S manager for surveillance setup.">
            <p>Common surveillance triggers in electrical trade:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Silica exposure</strong> — periodic lung function tests; HSE recommend.</li>
              <li><strong>Solder fume</strong> — respiratory health checks for high-frequency exposure.</li>
              <li><strong>Lead</strong> — biological monitoring under Control of Lead at Work Regs.</li>
              <li><strong>Asbestos</strong> — under CAR 2012 for licensed / NNLW workers.</li>
              <li><strong>Vibration</strong> — hand-arm vibration syndrome screening (Control of Vibration Regs).</li>
              <li><strong>Noise</strong> — audiometric testing where exposure exceeds upper action level (85dB).</li>
              <li><strong>Skin sensitisers</strong> — periodic skin checks where contact occurs.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="COSHH 2002 — Reg 6 (Assessment of risk to health)" clause={<>"An employer shall not carry out work which is liable to expose any employees to any substance hazardous to health unless he has — (a) made a suitable and sufficient assessment of the risk created by that work to the health of those employees and of the steps that need to be taken to meet the requirements of these Regulations; and (b) implemented the steps referred to in sub-paragraph (a)."</>} meaning={<>COSHH Reg 6 — the substance-specific risk assessment duty. CLP label provides the hazard input; Reg 6 assessment is the operational output. Without the assessment, the work cannot lawfully proceed.</>} cite="Source: Control of Substances Hazardous to Health Regulations 2002 (SI 2002/2677), Reg 6 — verbatim from legislation.gov.uk." />

          <RegsCallout source="COSHH 2002 — Reg 7(1) (Prevention or control of exposure)" clause={<>"Every employer shall ensure that the exposure of his employees to substances hazardous to health is either prevented or, where this is not reasonably practicable, adequately controlled."</>} meaning={<>COSHH Reg 7 — the substantive control duty. Prevention preferred; control where prevention not reasonably practicable. Reg 7(7) sets out the hierarchy of control explicitly: substitution, process design, engineering, work systems, PPE last. The hierarchy is a legal requirement, not best practice.</>} cite="Source: Control of Substances Hazardous to Health Regulations 2002 (SI 2002/2677), Reg 7 — verbatim from legislation.gov.uk." />

          <SectionRule />
          <CommonMistake title="Treating an unmarked container as 'safe'" whatHappens={<>Operative uses an unmarked container of liquid the previous tradesperson left behind; turns out to be a strong acid; skin burn and respiratory irritation. SDS not consulted because container had no label. COSHH Reg 12 breach (information &amp; instruction); CLP Reg breach (use of mis-labelled product); HASAWA s.7 personal duty failure.</>} doInstead={<>Unmarked = unknown = don&apos;t use. Either identify via SDS / supplier OR dispose as unknown hazardous waste. Never assume.</>} />

          <CommonMistake title="Reading the pictograms but not the SDS" whatHappens={<>Operative recognises the flame pictogram on a contact cleaner; takes appropriate fire precautions; doesn&apos;t read SDS section 8 (PPE) which specifies nitrile gloves AND respiratory protection for prolonged use. Repeated bare-hand exposure leads to occupational dermatitis. COSHH breach; reportable under RIDDOR Schedule 3.</>} doInstead={<>SDS section 8 (PPE) and section 4 (first aid) are the operationally-critical sections. Read them before sustained use of any hazardous substance.</>} />

          <Scenario title="L3 supervisor reviewing substances brought to a new project" situation={<>Your firm is starting a 6-week commercial fit-out. The team will bring contact cleaners, silicone sprays, mastics, copper grease, FR sealant, isopropyl alcohol cleaning wipes, lithium drill batteries, and a small bottle of solder flux. You're the L3 supervisor. The customer\'s site manager asks for your COSHH register before work starts.</>} whatToDo={<>Compile the substance register. List each product. For each: get current SDS from supplier (download or printout); note CLP pictograms (most will have flame, exclamation, some health hazard); identify exposure controls and PPE per SDS section 8; identify storage requirements per section 7; identify spillage / fire response per sections 5-6; identify disposal route per section 13. Aggregate into a COSHH risk assessment for the firm&apos;s use of these substances on this project — what hazards, who&apos;s exposed, what controls. Brief the team on the most-relevant items (FR sealant ventilation, lithium battery storage). Provide the COSHH register and SDS folder to the customer&apos;s site manager. Update as substances change. Maintain on site for the project duration. Inspector check during the project would expect to see the register and the SDS available.</>} whyItMatters={<>The COSHH register is the L3 supervisor&apos;s administrative responsibility on most projects. The customer&apos;s site manager is asking for it because their CDM principal-contractor duty includes coordinating COSHH across multiple trades. Providing it competently signals the firm runs its safety system properly; not having it signals the opposite. The 30 minutes of register-compilation up-front saves much greater pain after an incident.</>} />

          <SectionRule />
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            "Remember from L2 — pictograms warn of hazard. At L3 you read the SDS too.",
            "Nine GB CLP pictograms: explosive, flame, oxidiser, gas under pressure, corrosion, acute toxicity (skull), health hazard, harmful (exclamation), environment.",
            "Skull = acute toxicity (short-term). Silhouetted figure (health hazard) = chronic / long-term. Different management.",
            "SDS = 16-section document. Sections 4 (first aid), 5 (fire), 6 (spillage), 7 (handling/storage), 8 (PPE), 13 (disposal) are operationally critical.",
            "GB CLP triggers COSHH — label tells you it\'s hazardous; COSHH tells you how to use it safely.",
            "L3 supervisor maintains substance register and SDS folder. Updates as substances change. Available on site.",
            "Unmarked container = unknown = don\'t use. Dispose as unknown hazardous waste if necessary.",
            "Common electrical substances: contact cleaner (flame + exclamation), lithium batteries (flame + environment), refrigerants (gas + environment), battery electrolyte (corrosion + environment).",
          ]} />
          <Quiz title="CLP pictograms — knowledge check" questions={quizQuestions} />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section4')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Back</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">Section 4 — Landing</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section4-2')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">4.2 Hazard — the L3 definition</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
