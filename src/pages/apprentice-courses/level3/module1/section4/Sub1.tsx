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
  { question: 'What is the GB CLP Regulation\'s relationship with EU CLP after Brexit?', answer: 'GB CLP is the UK\'s retained version of the EU 1272/2008 CLP Regulation. Substantively very similar but with separate UK governance — HSE now publishes the GB Mandatory Classification and Labelling list (formerly CLP Annex VI). For substances supplied in Great Britain, GB CLP applies; for those supplied into Northern Ireland, EU CLP applies under the Windsor Framework. Most SDS now address both regimes in section 15.' },
  { question: 'When does a substance trigger formal COSHH assessment beyond just reading the SDS?', answer: 'COSHH Reg 6 requires a "suitable and sufficient" assessment of risk to health for any work liable to expose employees to hazardous substances. The threshold is low — any classified hazardous substance used at work needs an assessment, but proportionality applies: a small bottle of contact cleaner used occasionally needs a simple assessment; a large-volume bonded-acid cleaning operation needs a much more detailed one with potentially monitoring and surveillance.' },
  { question: 'How are workplace exposure limits set and what does "TWA" mean?', answer: 'WELs are set in EH40 (HSE annual publication). TWA = Time-Weighted Average; the average concentration over a stated period. Long-term TWA is the 8-hour reference period; short-term limit is the 15-minute reference period. Both must not be exceeded. Some substances also have a peak limit that cannot be exceeded for any duration.' },
  { question: 'What happens with substances that don\'t have a WEL?', answer: 'COSHH still applies. Reg 7 requires exposure to be adequately controlled; absence of a specific WEL doesn\'t mean unlimited exposure. The duty is to control to a level "compatible with what is known of the substance" — manufacturer\'s recommendations, scientific literature, occupational hygiene judgement.' },
  { question: 'How does waste segregation work for hazardous waste from electrical work?', answer: 'Hazardous Waste Regulations 2005 + EPA s.34 duty of care. Identify the waste stream (oils, batteries, fluorescent tubes containing mercury, asbestos, paint, solvents). Separate at source — don\'t mix waste streams. Use licensed carrier with consignment notes. Permitted facility for treatment / disposal. Records retained for 3 years (consignor); 2 years (carrier and consignee). Penalties for breach include unlimited fines and custody.' },
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
            "H-codes describe the hazard (H225 highly flammable; H319 serious eye irritation); P-codes describe the response (P280 wear gloves; P305 if in eyes rinse).",
            "Workplace Exposure Limits (HSE EH40) set TWA 8-hour and 15-minute short-term limits; absent WEL doesn't mean unlimited exposure.",
            "Hazardous waste from electrical work — Hazardous Waste Regulations 2005, EPA s.34 duty of care, consignment notes, licensed carrier, permitted facility.",
          ]} />
          <LearningOutcomes outcomes={[
            "Identify all nine GB CLP hazard pictograms and the categories each represents.",
            "Distinguish acute toxicity (skull) from chronic / long-term hazards (silhouetted figure).",
            "Read a Safety Data Sheet (16 sections) and identify operationally-relevant content.",
            "Recognise the relationship between CLP labelling and COSHH risk assessment.",
            "Identify common pictograms on electrical-trade substances.",
            "Apply L3 supervisor verification — SDS available before substance on site.",
            "Read CLP hazard statements (H-codes) and precautionary statements (P-codes).",
            "Apply Workplace Exposure Limits from HSE EH40 to assess adequacy of control.",
            "Recognise health-surveillance triggers under COSHH Reg 11 in electrical-trade work.",
            "Apply storage segregation rules for incompatible substance classes.",
            "Identify the COSHH hierarchy of control (eliminate → substitute → engineer → administer → PPE).",
            "Apply the pre-2000 building asbestos protocol — register, survey, disturbance avoidance, escalation.",
            "Draft and maintain a substance register sufficient for HSE inspection.",
            "Apply the unknown-substance protocol for unlabelled materials found on site.",
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
              <li>Signal words — &quot;Danger&quot; for more severe categories; &quot;Warning&quot; for less severe.</li>
              <li>The same pictogram can carry either signal word depending on the assigned category.</li>
              <li>A label can carry multiple pictograms — combination of hazards.</li>
              <li>Pictogram size minimum specified in CLP — must be readable.</li>
              <li>Old EU CHIP orange-square symbols obsolete from 2015; encountered material with those should be treated cautiously.</li>
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
              <li>SDS version date — older than 2 years should be replaced with current version.</li>
              <li>Supplier signature / emergency contact details.</li>
              <li>UK English version required for substances supplied in Great Britain.</li>
              <li>Digital library acceptable; must be accessible at point of use not just at office.</li>
              <li>SDS used as the source document for COSHH risk assessment and substance register entries.</li>
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
              <li><strong>Aerosol propellants</strong> — flame; gas under pressure; can rupture if heated.</li>
              <li><strong>Cable lubricants</strong> — exclamation; sometimes flame; environment for some.</li>
              <li><strong>Plumber&apos;s flux paste</strong> — exclamation; corrosion in higher-acid formulations.</li>
              <li><strong>Penetrating oil (rust-release)</strong> — flame; exclamation; aspiration hazard (H304).</li>
              <li><strong>Anti-seize compounds</strong> — exclamation; health hazard for some metallic powder formulations.</li>
              <li><strong>Spray paints / markers</strong> — flame; exclamation; environment for some.</li>
              <li><strong>Insulation foam / FR sealant</strong> — flame propellant; isocyanate sensitiser (health hazard); ventilation required.</li>
              <li><strong>Isopropyl alcohol cleaning wipes</strong> — flame.</li>
              <li><strong>Heatshrink adhesive lined</strong> — exclamation; thermal hazard during installation.</li>
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
              <li><strong>H222</strong> — extremely flammable aerosol.</li>
              <li><strong>H229</strong> — pressurised container; may burst if heated.</li>
              <li><strong>H332</strong> — harmful if inhaled.</li>
              <li><strong>H334</strong> — may cause allergy or asthma symptoms or breathing difficulties if inhaled (respiratory sensitiser).</li>
              <li><strong>H340 / H341</strong> — may cause / suspected of causing genetic defects (mutagenic).</li>
              <li><strong>H350 / H351</strong> — may cause / suspected of causing cancer.</li>
              <li><strong>H360 / H361</strong> — may damage / suspected of damaging fertility or the unborn child (reprotoxic).</li>
              <li><strong>H370 / H371</strong> — causes / may cause damage to organs.</li>
              <li><strong>P102</strong> — keep out of reach of children.</li>
              <li><strong>P260</strong> — do not breathe dust / fume / gas / mist / vapours / spray.</li>
              <li><strong>P301+P310</strong> — IF SWALLOWED immediately call poison centre / doctor.</li>
              <li><strong>P370+P378</strong> — in case of fire use dry sand / dry chemical / alcohol-resistant foam.</li>
              <li><strong>P403+P233</strong> — store in a well-ventilated place. Keep container tightly closed.</li>
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
              <li><strong>Isocyanates</strong> — 0.02 mg/m³ 8-hour TWA (respiratory sensitiser; LEV essential).</li>
              <li><strong>Welding fume</strong> — group control limit; HSE issued safety alert 2019 — all welding fume now treated as carcinogen.</li>
              <li><strong>Diesel engine exhaust emissions</strong> — IARC Group 1 carcinogen; control to ALARP.</li>
              <li><strong>Hand-arm vibration</strong> — exposure action value 2.5 m/s² A(8); limit value 5 m/s² A(8) — Control of Vibration at Work Regs.</li>
              <li><strong>Noise</strong> — first action 80 dB(A); second action 85 dB(A); limit 87 dB(A) — Control of Noise at Work Regs.</li>
              <li><strong>Carbon monoxide</strong> — 20 ppm 8-hour TWA; 100 ppm 15-min STEL.</li>
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
              <li><strong>Review triggers</strong> — substance change, process change, new operative, incident, periodic cycle.</li>
              <li><strong>Significant findings recorded</strong> — where 5+ employees; under Reg 6(3).</li>
              <li><strong>Operatives informed</strong> — assessment outcomes communicated to those affected (Reg 12).</li>
              <li><strong>Effectiveness monitored</strong> — controls actually achieving the intended exposure level; LEV examined Reg 9.</li>
              <li><strong>Special groups</strong> — young persons, expectant mothers, those with specific health conditions; bespoke considerations.</li>
              <li><strong>Mixed exposure</strong> — multiple substances; effects may be additive or interactive; consider combinations.</li>
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
              <li><strong>Lithium battery waste</strong> — Battery Regulations 2009; specialist disposal route; never landfill or general waste.</li>
              <li><strong>Refrigerant waste (F-Gas)</strong> — F-Gas Regulations; only certified technicians can recover; refrigerant recovered into approved cylinders.</li>
              <li><strong>Fluorescent tube waste</strong> — mercury content; WEEE + Hazardous Waste; special tube containers.</li>
              <li><strong>Asbestos waste</strong> — red double-bag; permitted facility; consignment note; never mixed with other waste.</li>
              <li><strong>Lead waste</strong> — old solder, lead sheath cable; specialist scrap dealer; consignment note for hazardous fraction.</li>
              <li><strong>Cable scrap with insulation</strong> — sorted by material; copper / aluminium recycled; PVC may need specialist disposal.</li>
              <li><strong>Container labelling</strong> — waste containers labelled with contents, hazard, generator; chain of custody maintained.</li>
              <li><strong>Mixed waste</strong> — once mixed, the highest-hazard categorisation applies; segregate at source.</li>
              <li><strong>Pre-acceptance notice</strong> — some waste facilities require advance notification of waste type and quantity.</li>
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
              <li><strong>Isocyanates</strong> — respiratory health surveillance for any exposed operative.</li>
              <li><strong>Welding fume</strong> — respiratory function monitoring for frequent welders.</li>
              <li><strong>Diesel engine exhaust</strong> — health surveillance considered for high-exposure operatives.</li>
              <li><strong>Night-shift work</strong> — under Working Time Regs 1998; statutory health assessment.</li>
              <li><strong>Driving for work</strong> — eyesight checks; occupational health where driving is significant.</li>
              <li><strong>Records retained</strong> — 40 years minimum for COSHH; longer for some substances; survives employee leaving firm.</li>
              <li><strong>Pre-employment baseline</strong> — taken on joining for benchmark against later surveillance.</li>
              <li><strong>Findings communicated</strong> — to operative (always) and to employer (anonymised aggregate or with consent for individual).</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="COSHH 2002 — Reg 6 (Assessment of risk to health)" clause={<>"An employer shall not carry out work which is liable to expose any employees to any substance hazardous to health unless he has — (a) made a suitable and sufficient assessment of the risk created by that work to the health of those employees and of the steps that need to be taken to meet the requirements of these Regulations; and (b) implemented the steps referred to in sub-paragraph (a)."</>} meaning={<>COSHH Reg 6 — the substance-specific risk assessment duty. CLP label provides the hazard input; Reg 6 assessment is the operational output. Without the assessment, the work cannot lawfully proceed.</>} cite="Source: Control of Substances Hazardous to Health Regulations 2002 (SI 2002/2677), Reg 6." />

          <RegsCallout source="COSHH 2002 — Reg 7(1) (Prevention or control of exposure)" clause={<>"Every employer shall ensure that the exposure of his employees to substances hazardous to health is either prevented or, where this is not reasonably practicable, adequately controlled."</>} meaning={<>COSHH Reg 7 — the substantive control duty. Prevention preferred; control where prevention not reasonably practicable. Reg 7(7) sets out the hierarchy of control explicitly: substitution, process design, engineering, work systems, PPE last. The hierarchy is a legal requirement, not best practice.</>} cite="Source: Control of Substances Hazardous to Health Regulations 2002 (SI 2002/2677), Reg 7." />

          <RegsCallout
            source="COSHH 2002 — Reg 9(1) (Maintenance, examination and test of control measures)"
            clause={
              <>
                &quot;Every employer who provides any control measure to meet the requirements of
                regulation 7 shall ensure that — (a) in the case of plant and equipment,
                including engineering controls and personal protective equipment, it is
                maintained in an efficient state, in efficient working order, in good repair
                and in a clean condition.&quot;
              </>
            }
            meaning={
              <>
                Reg 9 — the maintenance duty for control measures. LEV systems must be
                thoroughly examined and tested at least every 14 months (HSE HSG258); PPE must
                be maintained, cleaned and replaced. Controls only work when maintained — the
                L3 supervisor verifies the LEV is functioning before allowing the work that
                relies on it, and verifies operatives&apos; RPE has been face-fit tested and is
                within its inspection cycle.
              </>
            }
            cite="Source: Control of Substances Hazardous to Health Regulations 2002 (SI 2002/2677), Reg 9."
          />

          <RegsCallout
            source="Hazardous Waste Regulations 2005 — Reg 23 (Consignment notes)"
            clause={
              <>
                &quot;Where hazardous waste is to be removed from any premises in England, the
                consignor shall ensure that there is delivered, before the waste is removed or
                at the time of its removal, a consignment note for the consignment.&quot;
              </>
            }
            meaning={
              <>
                The consignment-note duty. Hazardous waste leaving the firm&apos;s control must
                be accompanied by a properly-completed consignment note identifying the
                waste, the consignor, the carrier and the consignee. Records retained 3 years
                by the consignor. Operatives generating hazardous waste from electrical work
                (used solvent, fluorescent tubes, batteries, asbestos, oil) feed into this
                regime; the firm&apos;s waste manager handles the paperwork but the L3
                supervisor identifies the waste correctly at source.
              </>
            }
            cite="Source: Hazardous Waste (England and Wales) Regulations 2005 (SI 2005/894), Reg 23 (separate equivalent regulations apply in Scotland and Wales)."
          />

          <SectionRule />
          <CommonMistake title="Treating an unmarked container as 'safe'" whatHappens={<>Operative uses an unmarked container of liquid the previous tradesperson left behind; turns out to be a strong acid; skin burn and respiratory irritation. SDS not consulted because container had no label. COSHH Reg 12 breach (information &amp; instruction); CLP Reg breach (use of mis-labelled product); HASAWA s.7 personal duty failure.</>} doInstead={<>Unmarked = unknown = don&apos;t use. Either identify via SDS / supplier OR dispose as unknown hazardous waste. Never assume.</>} />

          <CommonMistake title="Reading the pictograms but not the SDS" whatHappens={<>Operative recognises the flame pictogram on a contact cleaner; takes appropriate fire precautions; doesn&apos;t read SDS section 8 (PPE) which specifies nitrile gloves AND respiratory protection for prolonged use. Repeated bare-hand exposure leads to occupational dermatitis. COSHH breach; reportable under RIDDOR Schedule 3.</>} doInstead={<>SDS section 8 (PPE) and section 4 (first aid) are the operationally-critical sections. Read them before sustained use of any hazardous substance.</>} />

          <Scenario title="L3 supervisor reviewing substances brought to a new project" situation={<>Your firm is starting a 6-week commercial fit-out. The team will bring contact cleaners, silicone sprays, mastics, copper grease, FR sealant, isopropyl alcohol cleaning wipes, lithium drill batteries, and a small bottle of solder flux. You're the L3 supervisor. The customer\'s site manager asks for your COSHH register before work starts.</>} whatToDo={<>Compile the substance register. List each product. For each: get current SDS from supplier (download or printout); note CLP pictograms (most will have flame, exclamation, some health hazard); identify exposure controls and PPE per SDS section 8; identify storage requirements per section 7; identify spillage / fire response per sections 5-6; identify disposal route per section 13. Aggregate into a COSHH risk assessment for the firm&apos;s use of these substances on this project — what hazards, who&apos;s exposed, what controls. Brief the team on the most-relevant items (FR sealant ventilation, lithium battery storage). Provide the COSHH register and SDS folder to the customer&apos;s site manager. Update as substances change. Maintain on site for the project duration. Inspector check during the project would expect to see the register and the SDS available.</>} whyItMatters={<>The COSHH register is the L3 supervisor&apos;s administrative responsibility on most projects. The customer&apos;s site manager is asking for it because their CDM principal-contractor duty includes coordinating COSHH across multiple trades. Providing it competently signals the firm runs its safety system properly; not having it signals the opposite. The 30 minutes of register-compilation up-front saves much greater pain after an incident.</>} />

          <SectionRule />
          <ContentEyebrow>Lithium battery thermal runaway — the L3 working hazard</ContentEyebrow>

          <ConceptBlock
            title="Why lithium-ion batteries get their own risk profile"
            plainEnglish="Lithium-ion batteries — in tools, in vehicles, in PV / ESS installations — are a relatively new hazard class in the trade. Damaged, overheated, overcharged or punctured cells can enter thermal runaway: a self-sustaining exothermic reaction that releases flammable electrolyte vapour, heats neighbouring cells, propagates through the pack, and can result in a deep-seated fire that water alone cannot extinguish. Once thermal runaway is in progress, evacuation and dousing-with-water-only-from-distance is generally the response — the fire will burn until the energy is exhausted. Prevention is the only effective control."
            onSite="The L3 supervisor reflex on lithium kit: store correctly (cool, dry, in fire-rated container for charging), handle carefully (no impact, no puncture), inspect routinely (any swelling, discolouration, smell, heat = remove from service immediately), charge under supervision (not overnight, not unattended, not in escape routes), dispose properly (Battery Regs 2009, never landfill, take to permitted recycling). New BS / IEC standards (BS EN IEC 63056, BS 8643) cover ESS installations; the L3 supervisor on any ESS work follows the system manufacturer&apos;s requirements and the standards strictly."
          >
            <p>Lithium battery safe-handling essentials:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Storage</strong> — cool, dry, separate from flammables; fire-rated
                charging cabinets for higher-energy packs.
              </li>
              <li>
                <strong>Inspection</strong> — visual check before each use; swelling /
                discolouration / heat / smell = remove from service.
              </li>
              <li>
                <strong>Charging</strong> — manufacturer&apos;s charger only; supervised;
                not in escape routes; not on combustible surfaces.
              </li>
              <li>
                <strong>Mechanical protection</strong> — no impacts, no puncture, no
                stacking heavy loads on packs.
              </li>
              <li>
                <strong>Temperature</strong> — operate within manufacturer&apos;s range;
                damaged at extremes (high or low).
              </li>
              <li>
                <strong>Disposal</strong> — Battery Regs 2009 + Hazardous Waste Regs 2005;
                never landfill; permitted recycler with consignment note for hazardous
                fraction.
              </li>
              <li>
                <strong>Damaged-pack response</strong> — quarantine in metal container away
                from combustibles; report to manufacturer / supplier for return.
              </li>
              <li>
                <strong>Fire response</strong> — evacuate; raise alarm; if trained and
                equipped, use class-F or specialist Li-ion extinguisher; water sprays from
                distance can help cool surrounding materials; do not attempt to smother an
                established Li-ion fire.
              </li>
              <li>
                <strong>Vehicle transport</strong> — ADR Special Provision 188 for
                small-quantity tool batteries; quantity limits apply; damaged batteries
                under Special Provision 376 require specialist packaging.
              </li>
              <li>
                <strong>End-of-life identification</strong> — batteries that have reached
                rated cycle count or showing performance decline removed from service
                proactively rather than at failure.
              </li>
              <li>
                <strong>Domestic / commercial ESS installation</strong> — BS EN IEC 63056;
                BS 8643; manufacturer&apos;s installation manual; location restrictions
                (no habitable rooms in some standards; minimum separation distances).
              </li>
              <li>
                <strong>Fire ventilation in ESS</strong> — venting design for off-gas
                products of thermal runaway; specific to system manufacturer&apos;s
                requirements.
              </li>
              <li>
                <strong>Emergency response plan for ESS</strong> — agreed with local fire
                service for larger installations; isolation procedure for emergency
                services to apply.
              </li>
              <li>
                <strong>Off-gassing precursor</strong> — many lithium fires produce visible
                vapour and detectable smell before thermal runaway becomes visible flame;
                if observed evacuate immediately.
              </li>
              <li>
                <strong>Re-ignition risk</strong> — Li-ion fires can re-ignite hours or
                days later after apparent extinguishment; long-term monitoring required.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Hierarchy of control applied to substance hazards</ContentEyebrow>

          <ConceptBlock
            title="COSHH Reg 7(7) — the statutory hierarchy applied to chemical hazards"
            plainEnglish="COSHH Reg 7(7) sets out the hierarchy of control specifically for substance exposure in priority order. Substitution by a less hazardous substance or method; control of exposure at source (LEV, enclosure, process change); reduction of the number of employees exposed and the duration of exposure; suitable workplace conditions including hygiene; control of exposure to a specified level via collective measures; and personal protective equipment as the last resort. The hierarchy is the LEGAL approach to substance control, not a guideline. An RAMS that goes straight to PPE without addressing the higher levels is COSHH-non-compliant."
            onSite="Practical L3 application. Substitution: water-based contact cleaner instead of solvent where the application permits; cordless instead of corded tools in environments where flammable atmosphere risk exists; lead-free solder instead of leaded for general electronics work. Engineering at source: LEV for solder fume bench; on-tool dust extraction for chasing; sealed solvent containers with dispensing nozzles. Reduce exposure: limit batch size of solvent use; rotate operatives on heavy-exposure tasks; schedule high-emission work for end-of-day with overnight ventilation. Hygiene: separate eating area; hand-washing before food; change of clothing after dirty work. PPE: face-fit-tested FFP3 for dust; nitrile gloves for solvent contact; eye protection for splash risk."
          >
            <p>COSHH hierarchy of control with examples at each level:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Elimination</strong> — avoid the substance entirely; redesign the
                task so the substance is not needed.
              </li>
              <li>
                <strong>Substitution</strong> — replace with a less hazardous substance
                (water-based for solvent; lower-GWP refrigerant for high-GWP).
              </li>
              <li>
                <strong>Control at source</strong> — engineering measures that capture or
                contain the substance before it reaches the operative (LEV, on-tool
                extraction, enclosed process, dust suppression).
              </li>
              <li>
                <strong>Reduce exposure</strong> — limit numbers exposed; limit duration;
                rotate operatives; schedule for low-occupancy periods.
              </li>
              <li>
                <strong>Hygiene and welfare</strong> — washing facilities, separate eating
                area, no eating / drinking / smoking in work zone, change of clothing.
              </li>
              <li>
                <strong>Administrative controls</strong> — training, supervision, briefing,
                signage, restricted access.
              </li>
              <li>
                <strong>Personal Protective Equipment</strong> — RPE for inhalation, gloves
                for absorption, eye protection for splash, coveralls for skin contact.
              </li>
              <li>
                <strong>Maintenance of controls</strong> — engineering controls require
                periodic examination and test (LEV: COSHH Reg 9 + HSE HSG258 thorough
                examination and test at least every 14 months).
              </li>
              <li>
                <strong>Health surveillance</strong> — where exposure is residual and
                substance presents detectable health risk (COSHH Reg 11).
              </li>
              <li>
                <strong>Documentation</strong> — assessment, control selection rationale,
                monitoring results, surveillance records.
              </li>
            </ol>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Refrigerants and F-Gas — the L3 supervisor&apos;s coordination role</ContentEyebrow>

          <ConceptBlock
            title="Why refrigerant work needs a specific compliance pathway and what the L3 supervisor must know"
            plainEnglish="Refrigerants (HFCs, HFOs, ammonia, CO2) are F-Gas-regulated under the GB F-Gas Regulation (UK retained EU 517/2014). The high-GWP HFCs in particular face phase-down targets — the trade is shifting toward low-GWP HFOs and natural refrigerants. Electrical work in or near refrigeration equipment — HVAC plant rooms, heat pumps, refrigerated stores, EV battery cooling systems — can intersect with refrigerant containment. The L3 supervisor doesn&apos;t need to be a refrigeration technician but should know that breaking into a refrigerant-containing system requires F-Gas certification (Reg (EU) 517/2014 / GB F-Gas), that refrigerant cannot be vented to atmosphere (offence under the Regulations), and that recovered refrigerant must be consigned to certified handlers for reclaim or destruction. Heat-pump installations (now a major growth area) brought refrigerant exposure to general electrical operatives in new ways; the L3 supervisor coordinates between the electrical work and the refrigerant work."
            onSite="On any installation involving refrigeration equipment, the L3 supervisor verifies that the operatives doing refrigerant-related work hold the appropriate F-Gas qualification (Cat I-IV per the regulations). If breaking into pipework is required, the F-Gas operative takes the lead; electrical operatives stay clear of refrigerant exposure. Heat pump installations increasingly bundle electrical and refrigerant work in one contract — the firm needs both competences or partners with a sub-contractor who holds the refrigerant side. Pump-down, recovery, leak-test and recharge are F-Gas-regulated activities with documentation requirements."
          >
            <p>F-Gas key points for the L3 supervisor:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>F-Gas certification required</strong> for installation, service,
                maintenance, repair, decommissioning of stationary refrigeration / AC / heat
                pumps containing fluorinated greenhouse gases.
              </li>
              <li>
                <strong>Categories I-IV</strong> — based on scope of work; firm certification
                separate from personnel certification.
              </li>
              <li>
                <strong>Leak-checking</strong> — mandatory at intervals depending on charge
                size; documented.
              </li>
              <li>
                <strong>Recovery only into approved cylinders</strong> — never vent;
                tracking via consignment.
              </li>
              <li>
                <strong>Labelling</strong> — equipment containing fluorinated gases labelled
                with type and quantity.
              </li>
              <li>
                <strong>Records retained</strong> — 5 years minimum for service, leak-test,
                recovery records.
              </li>
              <li>
                <strong>GWP awareness</strong> — Global Warming Potential of refrigerant;
                phase-down driving migration to low-GWP refrigerants.
              </li>
              <li>
                <strong>Flammable refrigerants</strong> — HFOs (R32, R454B), hydrocarbons
                (R290 propane); fire considerations during work; appropriate detection /
                ventilation.
              </li>
              <li>
                <strong>Toxic refrigerants</strong> — ammonia (R717), CO2 (R744 — asphyxiant
                at high concentration); specific PPE and ventilation.
              </li>
              <li>
                <strong>Electrical-side competence sufficient for the electrical scope</strong>
                — heat-pump electrical install can be done by competent electrician with
                F-Gas operative handling refrigerant interface.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Asbestos — the L3 working-environment hazard pre-2000 buildings retain</ContentEyebrow>

          <ConceptBlock
            title="Why every electrical task in a pre-2000 building starts with an asbestos check"
            plainEnglish="The Control of Asbestos Regulations 2012 (CAR 2012) impose a duty to manage asbestos in non-domestic premises. The duty-holder for the premises (owner, occupier, person in control) is required to find out if asbestos-containing materials (ACMs) are present, assess their condition, manage the risk and make information available to anyone whose work could disturb them. For an electrical contractor that means: before drilling, chasing, lifting floorboards or removing ceiling tiles in any building built or refurbished before 2000, the L3 supervisor MUST consult the asbestos register and the refurbishment / demolition survey. Without the register and survey, the work cannot proceed in disturbance scope. Common ACM locations in buildings: AIB (asbestos insulation board) in soffits, ceilings, partition walls, fire-stopping, panels behind heaters and boilers; sprayed coatings; lagging on pipes and boilers; cement products (corrugated sheets, gutters, downpipes); textured coatings (Artex); floor tiles and bitumen adhesives; gaskets and rope seals around boilers. Asbestos kills around 5,000 people per year in the UK — more than road traffic accidents. Electricians, plumbers, joiners and other trades feature prominently in occupational mortality statistics."
            onSite="The L3 supervisor reflex on any pre-2000 building: ask the customer / dutyholder for the asbestos register before quoting let alone working. No register = do not proceed in disturbance scope until a refurbishment / demolition survey is commissioned. Any unidentified material that could be ACM is treated as ACM until tested. The HSE has prosecuted firms repeatedly for disturbing asbestos without checking; ignorance is not a defence under CAR 2012. Where the register identifies ACMs the L3 supervisor plans the work to avoid disturbance, uses minimum-disturbance techniques (low-speed drilling, water suppression, cordless tools), and where any disturbance is unavoidable refers to a licensed asbestos contractor for the licensed work (or to a Non-Notifiable Non-Licensed Work / Notifiable Non-Licensed Work regime for less hazardous categories)."
          >
            <p>Pre-work asbestos protocol for the L3 supervisor:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Building age check</strong> — pre-2000 build = ACM possible until
                ruled out; pre-1985 = ACMs likely.
              </li>
              <li>
                <strong>Asbestos register</strong> — request from dutyholder; review before
                pricing or scheduling work.
              </li>
              <li>
                <strong>Refurbishment / demolition survey</strong> — required where work
                will disturb fabric; commissioned by dutyholder if not already in place.
              </li>
              <li>
                <strong>Disturbance scope check</strong> — identify whether the proposed
                work will disturb ACMs or surfaces concealing them.
              </li>
              <li>
                <strong>Avoid disturbance where reasonably practicable</strong> — alter
                cable route, surface-mount instead of chase, lift different ceiling tile.
              </li>
              <li>
                <strong>NNLW / Notifiable NLW / Licensed work categorisation</strong> —
                depending on type and condition of ACM; licensed work goes to licensed
                contractor only.
              </li>
              <li>
                <strong>Training</strong> — Asbestos Awareness (Cat A) required for all
                operatives in trade roles; NNLW or Notifiable NLW training for those
                doing the specific work; CAR 2012 Reg 10.
              </li>
              <li>
                <strong>PPE for any limited disturbance work</strong> — disposable coveralls
                (Type 5), FFP3 respirator (face-fit tested), gloves, boots; decontamination
                arrangements.
              </li>
              <li>
                <strong>Stop work if suspect material discovered</strong> — do not continue;
                evacuate area; report to dutyholder; arrange sampling; HSE notification if
                exposure may have occurred.
              </li>
              <li>
                <strong>Health surveillance</strong> — CAR 2012 Reg 22 for licensed and
                notifiable work; biological monitoring records retained 40 years.
              </li>
              <li>
                <strong>Disposal</strong> — asbestos waste under Hazardous Waste Regs;
                consignment note; permitted facility; double-bagged in red asbestos bags.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Substance register and on-site COSHH compliance</ContentEyebrow>

          <ConceptBlock
            title="Drafting a substance register that survives an HSE inspection"
            plainEnglish="A substance register lists every hazardous substance the firm holds and uses, with the current SDS, the CLP classification, the COSHH risk assessment, the storage location, the disposal route and the date of last review. It is the operational expression of COSHH Reg 6 (assessment) plus Reg 12 (information). The L3 supervisor maintaining the register at project level demonstrates the firm has thought about its substances rather than simply accumulated them. The register is one of the documents an HSE inspector commonly asks for during a site visit."
            onSite="Build the register from the bottom up — every substance on site goes on. Common omissions: aerosols (which are CLP-classified as flammable and pressurised), small adhesive tubes, sealant cartridges, marker pens with solvent bases, white spirit, brake cleaner if vehicle work also done. Each entry needs the SDS to hand — usually a folder on site or a digital library accessible from each van. Register reviewed at project start and updated when substances change."
          >
            <p>Substance register fields:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Product name and supplier</strong> — exact name as on the SDS.
              </li>
              <li>
                <strong>SDS version and date</strong> — current SDS attached or linked.
              </li>
              <li>
                <strong>CLP classification</strong> — pictograms, signal word, hazard
                statements.
              </li>
              <li>
                <strong>Quantity held</strong> — typical stock on site / per van.
              </li>
              <li>
                <strong>Use case</strong> — what task the substance is used for.
              </li>
              <li>
                <strong>Frequency and duration</strong> — how often and for how long
                operatives are exposed.
              </li>
              <li>
                <strong>Routes of exposure</strong> — inhalation, absorption, ingestion,
                injection.
              </li>
              <li>
                <strong>Control measures</strong> — engineering, administrative, PPE.
              </li>
              <li>
                <strong>Workplace Exposure Limit</strong> — from EH40 where applicable;
                referenced to SDS section 8.
              </li>
              <li>
                <strong>Storage</strong> — location, segregation, secondary containment,
                quantity limit.
              </li>
              <li>
                <strong>Transport</strong> — ADR considerations; any vehicle-load limits.
              </li>
              <li>
                <strong>Spillage and emergency</strong> — response procedure from SDS
                sections 5-6.
              </li>
              <li>
                <strong>First aid</strong> — from SDS section 4.
              </li>
              <li>
                <strong>Disposal route</strong> — waste category, carrier, facility.
              </li>
              <li>
                <strong>Health surveillance trigger</strong> — yes / no per COSHH Reg 11.
              </li>
              <li>
                <strong>Review date</strong> — annual minimum; sooner on substance change.
              </li>
              <li>
                <strong>Owner</strong> — who in the firm holds the register; who signs the
                assessments.
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="A substance discovered without a label — the L3 response"
            situation={<>You are on a domestic install. A previous trades-person left a small unmarked plastic bottle in the cupboard under the sink. The contents look like clear liquid. The customer doesn&apos;t know what it is. Your L2 mate asks &quot;can we just throw it down the drain?&quot;.</>}
            whatToDo={<>No, you cannot. Without identification, the substance could be anything — strong acid (battery electrolyte), solvent (paint thinner), pesticide, biocide, prescription medication. The drain disposal is potentially an Environment Agency offence under the Environmental Protection Act 1990 Part II / the Hazardous Waste Regulations 2005 / the Environmental Permitting Regulations 2016. The substance is also potentially a hazard to the operative who handles it. Step 1: do not handle without nitrile gloves and eye protection. Step 2: do not transfer to another container. Step 3: photograph in situ; note location, container size and condition. Step 4: ask the customer whether they recall who left it or what it might be; if so consult that information. Step 5: if unidentified, treat as unknown hazardous waste; place in a sealed secondary container; label &quot;UNKNOWN — DO NOT OPEN&quot; with date and contact. Step 6: notify the firm; arrange collection by a licensed hazardous-waste carrier; the waste will be analysed and consigned to a permitted facility. Step 7: document for the firm&apos;s records — substance found, action taken, customer advised. Step 8: brief the customer not to handle unidentified substances they find in future and to contact the firm or local authority hazardous-waste service.</>}
            whyItMatters={<>The throw-it-down-the-drain reflex is one of the highest-consequence shortcuts in the trade because it can trigger an Environment Agency prosecution that runs alongside the HSE health-and-safety side. Pouring strong acid into a domestic drain can damage pipework, treatment plants and watercourses; the offence carries unlimited fines. Untraced chemical disposal is one of the patterns the Environment Agency actively prosecutes. The unknown-substance protocol — do not handle, do not transfer, do not dispose informally — protects both the operative and the firm. The L2 mate asking the question is doing the right thing; the L3 supervisor providing the right answer is the system working as intended.</>}
          />

          <SectionRule />
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            "Remember from L2 — pictograms warn of hazard. At L3 you read the SDS too.",
            "Nine GB CLP pictograms: explosive, flame, oxidiser, gas under pressure, corrosion, acute toxicity (skull), health hazard, harmful (exclamation), environment.",
            "Skull = acute toxicity (short-term). Silhouetted figure (health hazard) = chronic / long-term. Different management.",
            "SDS = 16-section document. Sections 4 (first aid), 5 (fire), 6 (spillage), 7 (handling/storage), 8 (PPE), 13 (disposal) are operationally critical.",
            "GB CLP triggers COSHH — label tells you it's hazardous; COSHH tells you how to use it safely.",
            "L3 supervisor maintains substance register and SDS folder. Updates as substances change. Available on site.",
            "Unmarked container = unknown = don't use. Dispose as unknown hazardous waste if necessary.",
            "Common electrical substances: contact cleaner (flame + exclamation), lithium batteries (flame + environment), refrigerants (gas + environment), battery electrolyte (corrosion + environment).",
            "H-codes (hazard) and P-codes (precautionary) standardised internationally — read them on the label.",
            "Workplace Exposure Limits (EH40) — TWA 8-hour and 15-minute short-term; absent WEL doesn't mean unlimited.",
            "Health surveillance triggers (Reg 11) — silica, solder fume, lead, asbestos, vibration, noise, sensitisers.",
            "Hazardous waste disposal — Hazardous Waste Regs 2005, EPA s.34, consignment notes, licensed carrier, permitted facility.",
            "Pre-2000 building protocol — asbestos register and survey BEFORE drill / chase / lift; CAR 2012 duty.",
            "Unknown-substance protocol — do not handle without PPE; do not transfer or dispose informally; treat as hazardous waste until identified.",
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
