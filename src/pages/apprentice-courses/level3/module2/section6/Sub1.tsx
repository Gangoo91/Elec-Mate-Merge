/**
 * Module 2 · Section 6 · Subsection 1 — F-Gas Regulations and the electrician trade boundary
 * City & Guilds 2365-03 / Unit 301 / Sustainable working practices
 *
 * Layered depth: 2357 Unit 602 ELTK02 / LO2 (legislation governing environmental tech)
 * supplementary — refrigerant handling competence boundary, EU 517/2014 (retained UK law),
 * F-Gas certification scheme.
 *
 * Section 6 focus: where the electrical scope of work ends and where F-Gas competence begins
 * on heat pumps, refrigeration and air-conditioning. Apprentice safety + compliance lens.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'F-Gas Regulations and the electrician trade boundary (6.1) | Level 3 Module 2.6.1 | Elec-Mate';
const DESCRIPTION =
  'F-Gas Regulation EU 517/2014 (retained as UK law post-Brexit) — refrigerant scope, GWP banding, certification requirements, and the firm trade boundary between F-Gas-certified refrigerant work and the electrician scope of supply, isolation, controls and bonding on heat pumps and AC units.';

const checks = [
  {
    id: 'l3-m2-s6-sub1-scope',
    question:
      "An ASHP install runs over and the F-Gas engineer has gone home. The customer asks if you can just connect the refrigerant pipework that the engineer left dangling so the unit can be commissioned tomorrow. What is the correct answer?",
    options: [
      "Yes, but only the final connection. Joining the two pipe ends with a flare nut and spanner isn't 'opening' the circuit, so it falls within the electrical scope as long as you don't braze. Making any refrigerant joint — flare or brazed — is regulated F-Gas work; a flare connection on a refrigerant line still opens the sealed circuit and is restricted to a certified engineer.",
      "No. Any work that opens, closes or charges a sealed refrigerant circuit is restricted to F-Gas-certified persons under the F-Gas Regulations (EU 517/2014, retained UK law). Brazing into a refrigerant circuit, evacuating, charging or recovering refrigerant all sit outside the electrical scope. Your scope is the electrical supply, isolation, controls and bonding. Politely refuse, document the request, and let the customer know the F-Gas engineer must complete the refrigerant side before the unit can run.",
      "Yes, provided you ring the F-Gas engineer first and they talk you through it over the phone. Verbal supervision does not transfer F-Gas competence; the work is legally restricted to a certified person physically carrying it out, so phone guidance does not make it lawful for you to connect the refrigerant pipework.",
      "Yes, as long as you don't add any refrigerant — connecting the pipework is mechanical work and only the charging step needs F-Gas certification. Connecting or sealing the refrigerant circuit is itself a regulated activity regardless of whether you charge it; the whole refrigerant side, not just charging, sits outside the electrical scope.",
    ],
    correctIndex: 1,
    explanation:
      "The trade boundary on a heat pump install is firm. F-Gas-certified personnel are the only people legally allowed to work on a sealed refrigerant circuit. Even brazing a copper pipe that forms part of the refrigerant loop is a regulated activity. Doing it yourself voids the manufacturer warranty, exposes you to a UK Environment Agency enforcement action, and breaches the F-Gas company-certification rules your employer signed up to. The right answer to a customer pressure request is always the same: document, refuse, escalate.",
  },
  {
    id: 'l3-m2-s6-sub1-gwp',
    question:
      "What does GWP mean in the context of F-Gas Regulations and why does it matter for refrigerant choice on modern heat pumps?",
    options: [
      "Gas Working Pressure — the pressure the refrigerant circuit runs at in bar, which determines the pipe wall thickness and the torque on the flare nuts. GWP in the F-Gas context stands for Global Warming Potential, a climate-impact figure, not a circuit pressure; pressure ratings are a separate consideration entirely.",
      "Guaranteed Warranty Period — the manufacturer's minimum cover on the refrigerant circuit, typically 5 years, after which F-Gas leak checks become the owner's responsibility. GWP is Global Warming Potential, a measure of climate impact relative to CO2, not a warranty term.",
      "Gross Wattage Performance — the heat output of the unit at full load, used to size the electrical supply and the emitters. GWP refers to Global Warming Potential of the refrigerant, not the unit's heat output; output rating is a different parameter on the data plate.",
      "Global Warming Potential — a multiplier expressing how much heat a refrigerant traps in the atmosphere relative to carbon dioxide over 100 years. CO2 = 1; R-410A around 2,088; R-32 around 675; R-290 (propane) around 3. The F-Gas Regulation phases down high-GWP HFCs by quota and bans certain high-GWP refrigerants in new equipment. That is why new domestic heat pumps in the UK have moved from R-410A to R-32 and increasingly to R-290.",
    ],
    correctIndex: 3,
    explanation:
      "GWP is the climate-impact multiplier that drives the F-Gas phase-down. The Regulation sets a tonnes-CO2-equivalent quota for HFC placing on the EU/UK market, shrinking each year. Manufacturers respond by switching to lower-GWP refrigerants. R-290 (propane) at GWP 3 is essentially climate-neutral on the F-Gas scale but introduces ATEX flammable-refrigerant handling rules. You will not choose the refrigerant — but you will see it on the data plate and you should know why a 2018 R-410A unit and a 2025 R-290 unit are not interchangeable.",
  },
  {
    id: 'l3-m2-s6-sub1-electrical-scope',
    question:
      "On a typical 8 kW air-source heat pump install in a UK semi, which of these activities sit firmly inside the electrician scope of work?",
    options: [
      "Sizing and installing the dedicated supply (typically 32 A or 40 A radial on a Type C MCB), providing a means of isolation outside, bonding the outdoor unit chassis where it is an extraneous-conductive-part, wiring the controls and any smart-export integration, verifying continuity and Zs at handover. The refrigerant circuit, vacuum, charge and leak test all sit outside the electrical scope.",
      "Evacuating the refrigerant lines to vacuum, weighing in the R-32 charge, and pressure-testing the circuit with nitrogen — the electrical install can't be signed off until these are done, so they fall to whoever is on site. Vacuum, charging and leak testing are all F-Gas-certified refrigerant activities, never the electrician's scope, regardless of who is on site.",
      "Brazing the copper refrigerant pipework between the indoor and outdoor units, then commissioning the refrigerant side, because the electrician owns all the copper on the job. Brazing into a refrigerant circuit is regulated F-Gas work; the electrician's copper-side scope is bonding and earthing conductors, not refrigerant pipework.",
      "Recovering the existing refrigerant from the old unit before it is removed, since the electrician disconnects the supply first. Refrigerant recovery is a certified F-Gas activity carried out by the engineer; the electrician only isolates and disconnects the electrical supply, not the refrigerant.",
    ],
    correctIndex: 0,
    explanation:
      "The electrical scope is supply, isolation, controls, bonding and verification. Everything refrigerant-side is F-Gas-certified work. Knowing the boundary protects your registration, the customer warranty and your employer F-Gas company certificate. On a mixed-trade site the install programme should sequence the F-Gas engineer in for the refrigerant work and you in for the electrical work, with neither stepping over the other.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Which piece of legislation forms the F-Gas regulatory framework in the UK after Brexit?",
    options: [
      "The Montreal Protocol 1987, which is directly enforced in UK law and bans all fluorinated refrigerants outright. The Montreal Protocol addresses ozone-depleting substances (CFCs/HCFCs), not the HFC phase-down, and it does not ban all fluorinated refrigerants; the UK F-Gas framework is the retained EU 517/2014.",
      "EU Regulation 517/2014 was retained as UK law under the European Union (Withdrawal) Act 2018 and continues to apply with minor UK-specific amendments. The UK F-Gas Regulation is enforced by the Environment Agency in England, SEPA in Scotland, NRW in Wales and the NIEA in Northern Ireland. It controls the placing on market, leak checking, recovery, certification of personnel and certification of companies handling fluorinated greenhouse gases.",
      "The Gas Safety (Installation and Use) Regulations 1998, which were extended after Brexit to cover refrigerant gases as well as natural gas. GSIUR 1998 covers combustible fuel gases and Gas Safe registration, not fluorinated refrigerants; F-Gas is governed by the retained EU 517/2014, a separate regime.",
      "The Environmental Protection Act 1990, Part II, which classifies spent refrigerant as controlled waste and forms the whole F-Gas framework. The EPA 1990 governs waste duty of care broadly, but the placing-on-market quota, certification and leak-check rules that make up the F-Gas framework come from the retained EU 517/2014.",
    ],
    correctAnswer: 1,
    explanation:
      "Retained EU law means the substantive rules of EU 517/2014 still apply in Great Britain almost unchanged. Northern Ireland follows the EU regime under the Windsor Framework. The Environment Agency enforces against unqualified work, missing logbook entries and excessive leakage. As an electrician you are not the duty holder for refrigerant work, but you are part of the install team that has to keep the boundary clean.",
  },
  {
    id: 2,
    question:
      "An employer wants you to top up the refrigerant on a customer split AC unit because the F-Gas engineer is booked out for a fortnight. What is the correct response?",
    options: [
      "Agree, because an instruction from your employer overrides the certification rules — the legal responsibility for the work transfers to them once they tell you to do it. An employer's instruction cannot make uncertified refrigerant work lawful, and you retain personal responsibility; an unlawful instruction should be declined and escalated.",
      "Agree, provided the top-up is under 3 kg of refrigerant — small charges are exempt from F-Gas certification. The old 3 kg charge-weight threshold no longer applies under EU 517/2014 (the trigger is now tonnes CO2 equivalent), and top-up is restricted regardless of charge size, so this exemption does not exist.",
      "Refuse politely and escalate. Refrigerant top-up is a regulated F-Gas activity that requires individual F-Gas certification (Category I covers stationary refrigeration, AC and heat pumps) and is only legal when the company also holds an F-Gas company certificate. Doing the work uncertified exposes you, your employer and the customer to enforcement action and voids the manufacturer warranty. The correct answer is to document the request, decline, and rebook the F-Gas engineer.",
      "Agree, as long as you isolate the unit electrically first and wear gloves — once it's dead the refrigerant side is safe to work on. Electrical isolation does not bring refrigerant work within your competence; charging a sealed circuit is regulated F-Gas activity whether or not the unit is electrically isolated.",
    ],
    correctAnswer: 2,
    explanation:
      "An apprentice or qualified electrician without F-Gas Category I certification is not legally allowed to add refrigerant to a sealed circuit. The 3 kg charge threshold from the older F-Gas regime no longer applies in the same way under EU 517/2014 — the trigger is now tonnes CO2 equivalent and sealed hermetic units. Either way, top-up work is restricted regardless of charge size. The boundary protects you and the customer.",
  },
  {
    id: 3,
    question:
      "Why has the UK domestic heat pump market shifted from R-410A to R-32 and increasingly to R-290 (propane) refrigerants?",
    options: [
      "Because R-410A was found to be ozone-depleting and was banned under the Montreal Protocol, forcing a switch to ozone-safe alternatives. R-410A is an HFC with zero ozone-depletion potential; the driver for the switch is its high Global Warming Potential under the F-Gas phase-down, not ozone depletion.",
      "Because R-32 and R-290 deliver a much higher COP, so installers switched purely to improve running costs and SCOP figures for customers. Efficiency differences are modest; the decisive driver is the F-Gas GWP phase-down quota that pushes manufacturers off high-GWP R-410A, not running-cost marketing.",
      "Because R-410A became scarce and expensive after Brexit border controls, so the market moved to cheaper refrigerants. The shift is driven by the regulatory GWP phase-down, not Brexit supply or price; R-32 and R-290 are chosen for their far lower Global Warming Potential.",
      "The F-Gas Regulation imposes a phased reduction in the tonnes-CO2-equivalent of HFCs placed on the EU/UK market each year and bans certain high-GWP refrigerants in new equipment categories. R-410A has a GWP of around 2,088. R-32 sits around 675 and is a single-component refrigerant making service easier. R-290 (propane) has a GWP of around 3 and is essentially climate-neutral on the F-Gas scale, but is A3 flammable and brings ATEX and minimum-room-volume rules with it.",
    ],
    correctAnswer: 3,
    explanation:
      "The phase-down quota is the regulatory engine driving refrigerant choice. Manufacturers will not place new high-GWP units on the market because the quota shrinks each year. R-290 monoblock heat pumps are now common in the UK because the entire refrigerant circuit is factory sealed inside the outdoor unit and only water pipes enter the building, neatly side-stepping the indoor minimum-room-volume rule. Knowing this lets you read a data plate and understand which install rules apply.",
  },
  {
    id: 4,
    question:
      "What is an F-Gas company certificate and why does the company you work for need one if it installs heat pumps?",
    options: [
      "A statutory certificate issued by an F-Gas certification body that authorises a company to carry out installation, maintenance, repair, decommissioning or leak checking on stationary refrigeration, AC and heat pump equipment containing fluorinated greenhouse gases. The company must also employ enough F-Gas Category I (or equivalent) certified individuals to cover the work. Without the company certificate, the firm cannot legally carry out refrigerant work even if individual engineers are certified.",
      "It is the same thing as the firm's NICEIC or NAPIT registration — a competent-person scheme membership that lets the company self-certify both electrical and refrigerant work under Part P. F-Gas company certification is a separate, statutory refrigerant scheme; NICEIC/NAPIT cover electrical work and Part P, not refrigerant handling.",
      "It is a one-off training certificate that the company's owner holds, proving they once attended an F-Gas awareness course; it does not need renewing. The company certificate is an organisational authorisation that must be maintained and is contingent on employing enough certified individuals, not a personal awareness course.",
      "It is the manufacturer's warranty document for the heat pump, confirming the unit was installed by an approved firm. The company certificate is a regulatory authorisation to handle refrigerants, issued by an F-Gas certification body, not a manufacturer warranty.",
    ],
    correctAnswer: 0,
    explanation:
      "Both certificates are required: individual (engineer) and company. The Environment Agency check both during enforcement visits. Many electrical contractors that sell heat pump installs subcontract the F-Gas work to a refrigerant company that holds the company cert, leaving the electrical contractor to handle the supply, isolation, controls and bonding within their own competence. The mixed-trade model is the norm in the UK domestic heat pump market.",
  },
  {
    id: 5,
    question:
      "Which UK regulator enforces the F-Gas Regulation in England and what do they typically take action on?",
    options: [
      "The Health and Safety Executive. The HSE inspects refrigerant work, audits F-Gas logbooks and prosecutes uncertified handling under the F-Gas Regulation. The HSE leads on workplace health and safety, but F-Gas environmental enforcement in England is the Environment Agency's responsibility, not the HSE's.",
      "The Environment Agency. Typical enforcement covers uncertified work on refrigerant circuits, missing or incomplete leak-check logbook entries, missing F-Gas company certification, failure to recover refrigerant during decommissioning, and placing prohibited high-GWP equipment on the market. Civil sanctions and criminal prosecution are both available. SEPA, NRW and NIEA enforce in the devolved nations.",
      "Ofgem. As the energy regulator it polices refrigerant handling alongside the heat pump grant schemes and can suspend installers who breach F-Gas rules. Ofgem regulates energy markets and administers grant schemes such as the Boiler Upgrade Scheme; F-Gas environmental enforcement sits with the Environment Agency, not Ofgem.",
      "The local authority Building Control department. It enforces the F-Gas Regulation as part of its Part P and Building Regulations inspection role. Building Control enforces the Building Regulations, not F-Gas; refrigerant compliance in England is enforced by the Environment Agency.",
    ],
    correctAnswer: 1,
    explanation:
      "The Environment Agency is the lead regulator. Their compliance team carries out site visits, audits company records and can issue civil sanctions including stop notices and variable monetary penalties. Criminal prosecution is reserved for more serious or repeated breaches. The chain of evidence runs: equipment data plate → service logbook → engineer certificate number → company certificate number. Missing any link makes enforcement easier, not harder.",
  },
  {
    id: 6,
    question:
      "A customer points at the outdoor heat pump unit and asks why the F-Gas label on the side of it matters. What is the right plain-English explanation?",
    options: [
      "It is the electrical rating plate — it tells you the supply current, voltage and MCB size you need to wire the unit, which is why it matters to the electrician. That information is on the unit's electrical data plate; the F-Gas label is a separate statutory label recording refrigerant type, GWP and charge.",
      "It is the manufacturer's serial-number and warranty label used to register the product online; without scanning it the warranty is void. The F-Gas label is a regulatory artefact recording refrigerant data and driving leak-check duties, not a warranty-registration sticker.",
      "The label records the refrigerant type, GWP value, charge weight in kilograms and the equivalent tonnes of CO2 the charge represents. The label is a statutory requirement under the F-Gas Regulation. It triggers leak-check frequency rules (typically once a year for charges over 5 tonnes CO2 equivalent without an automatic leak detection system, less often with one), drives the recovery requirements at end of life, and helps the F-Gas engineer choose the right recovery cylinder if the unit is decommissioned.",
      "It is the noise-rating label showing the unit's sound power level for planning permission under permitted-development rules. Sound data appears separately for planning purposes; the F-Gas label records refrigerant type, GWP and charge and underpins the leak-check and recovery regime.",
    ],
    correctAnswer: 2,
    explanation:
      "The F-Gas equipment label is a small but legally significant artefact. It feeds straight into the leak-check regime and the end-of-life refrigerant recovery duty. As the electrician on site you do not maintain the F-Gas log, but you will see the label and you should be able to explain to a curious customer what it means without making things up.",
  },
  {
    id: 7,
    question:
      "Why does an R-290 (propane) monoblock heat pump avoid the indoor minimum-room-volume rule that an R-290 split system has to comply with?",
    options: [
      "Because a monoblock holds a much smaller refrigerant charge than a split, and any charge below 150 g is exempt from the room-volume rule. The exemption here is about location, not charge size — a monoblock keeps all the refrigerant outdoors, so no flammable charge enters the occupied space at all.",
      "Because a monoblock uses non-flammable R-32 while only splits use flammable R-290, so the room-volume rule never applies to monoblocks. R-290 monoblocks exist and use the same flammable propane; the rule is avoided because the refrigerant stays in the outdoor unit, not because the refrigerant is non-flammable.",
      "Because the monoblock's refrigerant circuit is sealed under vacuum rather than positive pressure, so it cannot leak into the room. Sealing method is not the reason; the room-volume rule is sidestepped because only water pipes enter the building, keeping all refrigerant outdoors.",
      "On a monoblock unit the entire refrigerant circuit is contained inside the outdoor unit and only water pipes enter the building. The flammable-refrigerant indoor minimum-room-volume rule (under BS EN 378 and the F-Gas / refrigerant safety standards) only applies where flammable refrigerant is present in occupied indoor space. Splits that route refrigerant pipes indoors do trigger the rule and require detailed room-volume calculations.",
    ],
    correctAnswer: 3,
    explanation:
      "This is why R-290 monoblocks have taken off in UK retrofit. The wet system carries energy into the house instead of refrigerant, so the safety case for indoor flammable charge does not arise. As an electrician you will see more monoblocks than splits in the heat pump market for this reason, and the supply / isolation / bonding scope is identical between them.",
  },
  {
    id: 8,
    question:
      "What is the apprentice safe response when a customer asks at handover whether they should ever top up the refrigerant themselves if the unit feels less effective?",
    options: [
      "Explain clearly that refrigerant work is restricted by law to F-Gas-certified persons under the F-Gas Regulation. If the unit feels less effective they should call the original installer or an F-Gas certified service company who will leak-test and re-charge as needed. Topping up a refrigerant circuit DIY is illegal, dangerous (some refrigerants are A2L mildly flammable and R-290 is A3 flammable), and would void the warranty. The cost of professional service is small relative to the cost of an uncovered failure.",
      "Tell them a DIY top-up kit from a motor-factor is fine for occasional use, as long as they don't overfill it. DIY refrigerant top-up is unlawful for an uncertified person and unsafe; the honest advice is that only an F-Gas-certified engineer may leak-test and re-charge the unit.",
      "Tell them that as the homeowner they own the equipment, so they are allowed to top it up themselves — the F-Gas rules only apply to tradespeople working for payment. The F-Gas restrictions apply to anyone handling refrigerant regardless of ownership or payment; a homeowner may not lawfully charge a sealed circuit.",
      "Tell them to top it up only if the charge is under 3 kg, because small systems are exempt from the certification rules. The 3 kg threshold no longer governs F-Gas certification under EU 517/2014, and refrigerant top-up is restricted to certified persons regardless of charge size.",
    ],
    correctAnswer: 0,
    explanation:
      "Customer-facing safety advice is part of the apprentice job. The honest answer protects the customer, the warranty and the regulatory framework all at once. As the electrician on the install you have credibility with the customer at handover — a clear short explanation of the F-Gas trade boundary keeps everyone safe.",
  },
];

const faqs = [
  {
    question: "Is the F-Gas Regulation actually still in force in the UK after Brexit?",
    answer:
      "Yes. EU Regulation 517/2014 was retained as UK law under the European Union (Withdrawal) Act 2018. The substantive controls — placing-on-market quota, leak checking, recovery, individual and company certification, equipment labelling — continue to apply across Great Britain almost unchanged. Northern Ireland continues to follow the EU regime under the Windsor Framework. The Environment Agency, SEPA, NRW and NIEA enforce regionally. The label on the heat pump in the customer back garden is a UK statutory requirement, not an EU legacy.",
  },
  {
    question: "What is the difference between an F-Gas Category I and a Category II certificate?",
    answer:
      "Both are individual personal certificates. Category I covers all activities on stationary refrigeration, air-conditioning and heat pump equipment regardless of refrigerant charge — installation, maintenance, repair, leak checking, recovery, decommissioning. Category II is more restricted (typically below 3 kg of refrigerant for some activities and excludes certain types of work). For domestic heat pumps in the UK Category I is what the engineer needs. As an electrician you are not certified — you do not need the certificate to do your electrical scope of work, but you do need to know that anything refrigerant-side is restricted to a Category I engineer.",
  },
  {
    question: "Where does the electrical scope end and where does the F-Gas scope begin?",
    answer:
      "The electrical scope covers the dedicated supply, the means of isolation, the controls wiring and integration, the protective bonding of the outdoor unit chassis where required, the smart-export interface and the verification at handover (continuity, Zs, RCD test where fitted). The F-Gas scope covers the refrigerant pipework brazing, evacuation to vacuum, leak test with nitrogen, refrigerant charging by weight, on-going leak check during the unit life and refrigerant recovery at decommissioning. The two scopes meet at the data plate of the unit but never overlap.",
  },
  {
    question: "What happens if I open a sealed refrigerant circuit accidentally — for example clipping a pipe with a saw during a chase?",
    answer:
      "Stop work immediately, ventilate the area, leave the room, and notify your supervisor and the F-Gas engineer. Do not attempt to recover or top up. Released refrigerant is a regulated emission and the Environment Agency considers accidental release to be a notifiable event for charges above the threshold. The F-Gas engineer must repair the circuit, recover any remaining refrigerant, leak test, and re-charge. Document the incident in the job pack so the recovery and re-charge can be properly recorded in the unit logbook.",
  },
  {
    question: "Why are refrigerants like R-290 (propane) gaining ground if they are flammable?",
    answer:
      "R-290 has a Global Warming Potential of around 3 — essentially climate-neutral on the F-Gas scale — and so is unaffected by the HFC quota phase-down. The flammability is managed at the equipment design stage by sealing the refrigerant circuit inside an outdoor monoblock unit. From a building-safety perspective only water pipes enter the property, so the indoor flammable refrigerant case does not arise. The combination of low GWP, factory containment and proven thermodynamic performance has made R-290 the default for new UK domestic monoblock heat pumps.",
  },
  {
    question: "If I want to expand my scope to cover refrigerant work in future, what is the route?",
    answer:
      "You would need to complete an F-Gas Category I assessment with an approved certification body — typically City and Guilds 2079, BPEC F-Gas (Category I) or equivalent. The assessment is practical and theory based and lasts a day or two depending on prior knowledge. You would then need to be employed by a company that holds an F-Gas company certificate to legally carry out the work. Many UK electricians who specialise in heat pumps do hold both Category I and BS 7671 competence — but the routes are separate qualifications and the trade boundary is regulated either way.",
  },
];

export default function Sub1() {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module2-section6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>

          <PageHero
            eyebrow="Module 2 · Section 6 · Subsection 1"
            title="F-Gas Regulations and the electrician trade boundary"
            description="EU Regulation 517/2014 (retained as UK law) controls fluorinated greenhouse gas refrigerants. As the electrician on a heat pump or AC install your scope is supply, isolation, controls and bonding. Refrigerant work — brazing, evacuation, charging, leak check, recovery — is restricted to F-Gas-certified persons working under an F-Gas company certificate."
            tone="emerald"
          />

          <TLDR
            points={[
              "F-Gas Regulation EU 517/2014 was retained as UK law after Brexit. It controls fluorinated greenhouse gas refrigerants used in heat pumps, AC and refrigeration.",
              "Refrigerant work is restricted to F-Gas Category I certified persons working under an F-Gas company certificate. The Environment Agency (England), SEPA, NRW and NIEA enforce.",
              "The electrician scope on a heat pump install is supply, isolation, controls and bonding. The trade boundary at the data plate of the unit is firm and protects warranty, certification and legal compliance.",
              "GWP (Global Warming Potential) drives modern refrigerant choice: R-410A (~2,088) is being phased down, R-32 (~675) is now common, R-290 propane (~3) is the rising default for monoblock heat pumps.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "State the legal status of EU Regulation 517/2014 in the UK after Brexit and identify the regulators that enforce it across the four nations.",
              "Describe the trade boundary between F-Gas-certified refrigerant work and the electrician scope of supply, isolation, controls and bonding on a heat pump or AC install.",
              "Define Global Warming Potential (GWP) and explain why R-410A has been progressively replaced by R-32 and R-290 in new UK domestic heat pumps.",
              "Recognise the F-Gas equipment label and explain its role in leak-check frequency, recovery and end-of-life duties.",
              "Identify the difference between an individual F-Gas Category I certificate and an F-Gas company certificate, and explain why both are required for legal refrigerant work.",
              "Apply a safe response to customer or employer pressure to carry out refrigerant work outside your scope of competence.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why F-Gas matters on every heat pump install</ContentEyebrow>

          <ConceptBlock
            title="The F-Gas framework — what it controls and why"
            plainEnglish="Fluorinated greenhouse gases (HFCs and similar) trap heat in the atmosphere thousands of times more effectively than carbon dioxide on a per-kilogram basis. A small leak from a refrigerant circuit can have the climate impact of driving a car for a year. The F-Gas Regulation controls the placement on market, the handling, the leak checking, the recovery and the certification of the people doing the work, with the goal of cutting EU and UK refrigerant emissions on a published timetable."
            onSite="On every heat pump or AC install in the UK the F-Gas Regulation sits in the background. The data plate on the outdoor unit declares the refrigerant type, charge in kilograms and equivalent tonnes of CO2. That single label drives leak-check frequency, recovery cylinder choice at end of life, and the legal proof that the engineer who charged the system held the right certificate. Your job as the electrician is to recognise the label, respect the boundary, and never step over it under pressure."
          >
            <p>
              What the F-Gas Regulation controls in plain English:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Placing on market</strong> — manufacturers cannot sell new equipment
                using prohibited high-GWP refrigerants in defined product categories. The
                phase-down quota shrinks the tonnes-CO2-equivalent of HFC placed on the
                EU/UK market each year.
              </li>
              <li>
                <strong>Personal certification</strong> — anyone installing, servicing,
                repairing, leak-checking, decommissioning or recovering refrigerant from
                stationary refrigeration, AC or heat pump kit must hold an F-Gas Category I
                (or equivalent) personal certificate.
              </li>
              <li>
                <strong>Company certification</strong> — the employing company must hold an
                F-Gas company certificate for the activity. Both the individual and the
                company certificates have to be in place.
              </li>
              <li>
                <strong>Leak checking</strong> — equipment is leak-checked at intervals
                driven by the tonnes-CO2-equivalent of refrigerant charge. Above 5 tonnes
                CO2-eq once a year (less often with automatic leak detection), more
                frequently for higher charges.
              </li>
              <li>
                <strong>Recovery and labelling</strong> — refrigerant must be recovered at
                end of life, equipment must be labelled with the refrigerant data, and a
                logbook must be kept across the equipment service life.
              </li>
            </ul>
            <p>
              None of these duties fall on the apprentice electrician directly — but every
              one of them sits in the background of every heat pump and AC install you will
              ever attend. Recognising the framework is part of being a competent member of
              the install team.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Regulation (EU) No 517/2014 of the European Parliament and of the Council on fluorinated greenhouse gases (retained as UK law)"
            clause={
              <>
                <p className="mb-2">
                  &quot;Natural persons carrying out the following activities for stationary
                  refrigeration, air-conditioning and heat pump equipment containing
                  fluorinated greenhouse gases, shall be certified&quot;:
                </p>
                <ul className="space-y-1 list-disc pl-5">
                  <li>installation;</li>
                  <li>maintenance or servicing;</li>
                  <li>repair or decommissioning;</li>
                  <li>leakage checking;</li>
                  <li>recovery.</li>
                </ul>
              </>
            }
            meaning={
              <>
                The list is intentionally exhaustive. There is no &quot;just a little bit of
                refrigerant work&quot; carve-out for electricians, plumbers or general
                building tradespeople. If the activity touches a refrigerant circuit it
                requires an F-Gas Category I (or equivalent) personal certificate, and the
                employing company must hold an F-Gas company certificate. The trade
                boundary is set by statute, not by site convention. The duty falls on both
                the individual doing the work and the company employing them.
              </>
            }
            cite="Source: Regulation (EU) No 517/2014, Article 10(1) (paraphrased), retained as UK law under the European Union (Withdrawal) Act 2018; full text at legislation.gov.uk."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Refrigerants and Global Warming Potential</ContentEyebrow>

          <ConceptBlock
            title="GWP — why your 2018 R-410A heat pump and your 2025 R-290 heat pump are different beasts"
            plainEnglish="Global Warming Potential expresses how much heat a gas traps in the atmosphere over 100 years compared to the same mass of CO2. CO2 itself is the reference at GWP 1. Older HFC refrigerants like R-410A sit around 2,088 — releasing one kilogram of R-410A is climate-equivalent to 2,088 kilograms of CO2. Newer refrigerants are dramatically lower: R-32 around 675, R-454B around 466, R-290 (propane) around 3. The F-Gas Regulation drives the market toward lower GWP through a tonnes-CO2-equivalent placing-on-market quota that shrinks each year."
            onSite="You will see the refrigerant type on the data plate of every heat pump and AC unit you connect. The shift from R-410A to R-32 to R-290 has happened quickly in the UK domestic market. The supply, isolation, bonding and controls scope is essentially identical across the three — but the safety case behind the scenes is not. R-290 is A3 flammable and brings ATEX, ventilation and minimum-room-volume rules with it where the refrigerant enters occupied indoor space. R-32 is A2L mildly flammable. R-410A is A1 non-flammable. The F-Gas engineer manages the safety case; you should know which refrigerant you are working alongside so the right ATEX rules apply at handover."
          >
            <p>
              Refrigerants you will see on UK domestic heat pump data plates today:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>R-410A (GWP ~2,088, A1)</strong> — legacy HFC, common on 2010-2020
                installs, no longer offered in most new domestic units. Service work
                continues; gradually being decommissioned and recovered as units reach end
                of life.
              </li>
              <li>
                <strong>R-32 (GWP ~675, A2L)</strong> — single-component refrigerant,
                widely used in current splits and many monoblocks. Mildly flammable, lower
                indoor charge limits than A1 refrigerants.
              </li>
              <li>
                <strong>R-454B (GWP ~466, A2L)</strong> — newer blend used in some
                replacement-grade kit, similar handling rules to R-32.
              </li>
              <li>
                <strong>R-290 propane (GWP ~3, A3 flammable)</strong> — the rising default
                for monoblock heat pumps. Flammable, but contained inside the outdoor unit
                with only water pipes entering the building. Brings ATEX rules for the
                F-Gas engineer; electrical scope is standard.
              </li>
              <li>
                <strong>R-744 CO2 (GWP 1, A1)</strong> — used in some commercial
                refrigeration and a small number of high-temperature heat pumps. Operates
                at very high pressure; specialist kit and engineering.
              </li>
            </ul>
            <p>
              The F-Gas refrigerant choice is made at the equipment manufacturer level,
              constrained by the placing-on-market rules. As the apprentice you will not
              choose the refrigerant — but reading the data plate and understanding what is
              inside the unit is part of being a competent install team member.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The electrician scope of work — drawn precisely</ContentEyebrow>

          <ConceptBlock
            title="What you do, what you do not — the trade boundary at the data plate"
            plainEnglish="On a typical domestic air-source heat pump install the work splits cleanly into electrical and refrigerant scopes. The electrical scope is sized, designed and verified by you under BS 7671. The refrigerant scope is sized, brazed, evacuated, charged and leak-tested by an F-Gas Category I certified engineer working under an F-Gas company certificate. The two scopes meet at the data plate on the side of the outdoor unit and never overlap. Every install programme should sequence the two trades cleanly."
            onSite="The most common pressure point is sequencing. The customer wants the unit running by Friday. The F-Gas engineer is on another job. The temptation is to step over the boundary and connect a stub of refrigerant pipe so the unit can be commissioned. The answer is always the same: refuse, document, escalate. The trade boundary is set by the F-Gas Regulation and re-enforced by the warranty terms of every domestic heat pump on the UK market. Crossing it costs you everything and gains nothing."
          >
            <p>
              The electrician scope on a typical domestic ASHP install:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Supply design and installation</strong> — typically a 32 A or 40 A
                radial on a Type C MCB for a domestic 8-12 kW unit; cable size to suit
                load, length and installation method per BS 7671 Appendix 4 / Table 4D2A.
              </li>
                <li>
                <strong>Means of isolation outside</strong> — a weather-proof local
                isolator within sight of the outdoor unit, in line with the manufacturer
                installation manual and BS 7671 Section 537.
              </li>
              <li>
                <strong>Protective equipotential bonding</strong> — bond the outdoor unit
                chassis where it is an extraneous-conductive-part, in accordance with BS
                7671 Chapter 41 and the manufacturer instructions.
              </li>
              <li>
                <strong>Controls and integration</strong> — wiring of the room thermostat,
                weather compensation sensor, smart export integration with PV and battery
                where present, and any building management system handshake.
              </li>
              <li>
                <strong>Verification at handover</strong> — continuity of protective
                conductors, insulation resistance where appropriate, Zs at the unit, RCD
                test where fitted, and completion of an Electrical Installation Certificate
                (EIC) or Minor Works Certificate as appropriate.
              </li>
            </ul>
            <p>
              What you do not do under any circumstances:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Braze, cut into or otherwise mechanically alter the refrigerant pipework.</li>
              <li>Pressure test or leak test the refrigerant circuit with nitrogen.</li>
              <li>Evacuate the refrigerant circuit to vacuum.</li>
              <li>Add or remove refrigerant from the system.</li>
              <li>Recover refrigerant at end of life.</li>
              <li>Sign off the F-Gas logbook entries for any of the above activities.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Equipment labelling and the F-Gas logbook</ContentEyebrow>

          <ConceptBlock
            title="The F-Gas label is small, statutory and traceable"
            plainEnglish="Every piece of stationary refrigeration, AC or heat pump equipment containing fluorinated greenhouse gases must carry an F-Gas label. The label declares the refrigerant type, the GWP value, the refrigerant charge in kilograms and the equivalent tonnes of CO2. That data feeds directly into the leak-check frequency rules and the recovery duty at end of life. Together with the equipment service logbook the label forms a chain of evidence the Environment Agency can audit."
            onSite="As the electrician you will not maintain the F-Gas log, but you will see the label every time you handle a heat pump or AC unit. Reading it is straightforward and a useful skill. If a customer queries what the label means, a confident plain-English explanation is part of being a credible install professional. Do not write on the label, do not over-paint it, do not let it get damaged during electrical install. A missing or illegible label is itself a regulatory breach."
          >
            <p>
              What the label tells you and the F-Gas engineer:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Refrigerant designation</strong> — for example R-32, R-290, R-410A.
                Drives the safety case (flammability classification A1 / A2L / A3) and the
                recovery cylinder type.
              </li>
              <li>
                <strong>Charge in kilograms</strong> — the factory-charged mass of
                refrigerant in the sealed circuit. Drives the recovery duty and the
                replacement charge if the unit is recharged after a leak.
              </li>
              <li>
                <strong>Tonnes CO2 equivalent</strong> — charge in kg multiplied by GWP
                divided by 1,000. Drives leak-check frequency: above 5 tonnes CO2-eq
                annually, above 50 tonnes CO2-eq six-monthly, above 500 tonnes CO2-eq
                quarterly. Domestic heat pumps typically sit below the 5 tonnes threshold
                so leak checks are not statutorily required at fixed frequency but the
                manufacturer warranty often imposes its own service interval.
              </li>
              <li>
                <strong>Equipment hermetically sealed indication</strong> — where present,
                relaxes some of the certification rules at recovery (for very small charges
                in fully hermetic units).
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Regulation (EU) No 517/2014, Article 4 (Leakage checks) — paraphrased thresholds"
            clause={
              <>
                Operators of equipment containing fluorinated greenhouse gases in
                quantities of 5 tonnes of CO2 equivalent or more (and not contained in
                foams) shall ensure that the equipment is checked for leaks. Frequency
                rises with charge: 5 to 50 tonnes CO2-eq at least every 12 months; 50 to
                500 tonnes CO2-eq at least every 6 months; 500 tonnes CO2-eq or above at
                least every 3 months. Frequencies are halved where an automatic leak
                detection system is fitted and operational.
              </>
            }
            meaning={
              <>
                Most UK domestic heat pumps sit comfortably below the 5 tonnes CO2-eq
                threshold, so the statutory leak check frequency does not apply. That does
                not relieve the customer of the operator duty to keep the equipment in
                good order, and the manufacturer warranty often requires a service
                interval anyway. Larger commercial AC, heat pump and refrigeration plant
                routinely sits above the threshold and the leak check log becomes a
                serious regulatory artefact for the F-Gas engineer to maintain.
              </>
            }
            cite="Source: Regulation (EU) No 517/2014, Article 4, retained as UK law; full text at legislation.gov.uk."
          />

          <SectionRule />

          <ContentEyebrow>F-Gas certification — what the categories actually mean</ContentEyebrow>

          <ConceptBlock
            title="The four F-Gas certification categories — and where Category I sits"
            plainEnglish="Personal F-Gas certification under EU 517/2014 (retained UK law) is split into four categories that scope the activities a certified person is allowed to carry out. Category I is the broadest — it covers all activities (installation, maintenance, repair, decommissioning, leak checking, recovery) on stationary refrigeration, AC and heat pump equipment regardless of refrigerant charge. Categories II, III and IV cover progressively narrower scopes (typically smaller charges or specific activities like leak checking only, or recovery only). For the UK domestic heat pump market Category I is the working baseline because it covers all the activities the engineer needs to perform on a typical install."
            onSite="When you see an F-Gas engineer arrive at a site, the certificate they hold determines the work they can lawfully do. Most full-service engineers hold Category I; specialised technicians may hold Category III (recovery only) or similar narrower certificates. The certification is personal to the individual engineer and is held alongside the company certificate of the firm that employs them. As the electrician on site you are not the duty holder for any of this — but recognising the certification structure helps you understand why an engineer may decline to take on a task that you might assume is in their scope (e.g. a Category III recovery-only certified person cannot lawfully install or charge equipment)."
          >
            <p>
              The four F-Gas certification categories at a glance:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Category I</strong> — all activities on stationary refrigeration,
                AC and heat pump equipment regardless of refrigerant charge size. The
                broadest scope and the working baseline for the UK domestic heat pump
                market.
              </li>
              <li>
                <strong>Category II</strong> — narrower scope, typically restricted to
                equipment with refrigerant charges below specified thresholds and to
                certain activities. Less common in current UK practice.
              </li>
              <li>
                <strong>Category III</strong> — recovery-only certification. Allows
                refrigerant recovery from equipment but not installation, charging or
                leak checking. Used by specialist decommissioning operators.
              </li>
              <li>
                <strong>Category IV</strong> — leak-checking-only certification. Allows
                leak checking of equipment without intervention on the refrigerant
                circuit itself. Used by some inspection-only operators on large
                commercial estates.
              </li>
            </ul>
            <p>
              Mobile refrigeration in road vehicles, rail vehicles and ships sits under
              different certification routes. Stationary domestic and commercial
              equipment is what an electrical contractor will normally encounter.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Recovery duties at end of life</ContentEyebrow>

          <ConceptBlock
            title="Refrigerant recovery is a statutory duty — not an optional extra"
            plainEnglish="When a heat pump or AC unit reaches end of life — through age, failure, or replacement — the refrigerant inside it must be recovered, not vented. The F-Gas Regulation imposes a recovery duty on the operator of the equipment, exercised in practice by an F-Gas Category I (or Category III recovery-only) certified engineer. The recovered refrigerant is either reused, reclaimed (purified to virgin specification) or destroyed, and the recovery is logged. Venting refrigerant to atmosphere is a regulated emission and a criminal offence under the F-Gas Regulation; even small quantities of high-GWP refrigerant carry climate impact equivalent to thousands of times their mass in CO2."
            onSite="On a heat pump replacement job you will commonly see this in action. The F-Gas engineer arrives with refrigerant recovery cylinders sized for the charge of the old unit and the GWP of the refrigerant. They evacuate the old circuit into the cylinder, weigh and label it, and send it for reclaim or destruction at an authorised facility. Only after the recovery is complete does the dismantling and removal of the old outdoor unit happen. The electrical scope on the same job is to isolate the supply ahead of the recovery, then remove the supply cable and isolator after the unit has been physically removed. The two trades sequence cleanly when both understand the boundary."
          >
            <p>
              What the apprentice should recognise on a heat pump replacement:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Recovery cylinder</strong> — labelled with the refrigerant type,
                tare weight, gross weight and the engineer details. The weighed-in
                quantity is logged in the F-Gas paperwork.
              </li>
              <li>
                <strong>Vacuum confirmation</strong> — the engineer verifies that the old
                circuit has been evacuated (typically by vacuum gauge reading) before the
                pipework is mechanically dismantled.
              </li>
              <li>
                <strong>Pipework dismantling</strong> — once vacuum-confirmed, the
                pipework can be cut and the unit physically removed. The cut surfaces
                are taped to keep moisture out of the recovered cylinder pathway.
              </li>
              <li>
                <strong>Documentation</strong> — recovery quantity logged in the F-Gas
                logbook for the equipment, the recovery cylinder consigned to a permitted
                refrigerant treatment facility, and the certificate from the facility
                returned for the company records.
              </li>
            </ul>
            <p>
              You should never proceed with electrical removal of a unit before the
              F-Gas recovery is confirmed complete. Cutting refrigerant pipework on a
              still-charged unit releases refrigerant to atmosphere and is both a
              regulatory breach and a personal safety hazard depending on the
              refrigerant.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Hermetically sealed exemptions</ContentEyebrow>

          <ConceptBlock
            title="Pre-charged hermetically sealed equipment — what the relaxation actually allows"
            plainEnglish="Some smaller refrigeration and AC equipment is supplied factory-charged with refrigerant in a hermetically sealed circuit. For very small charges the F-Gas Regulation provides a partial relaxation — installation of pre-charged hermetically sealed equipment may not require the installer to hold full F-Gas Category I certification, provided the installation does not require the refrigerant circuit to be opened, charged or leak tested by the installer. The thresholds and conditions are tightly drawn and apply to specific equipment categories — typically small commercial refrigeration cabinets, some monoblock heat pumps, and split-free AC units."
            onSite="The relaxation does not turn into a general exemption for electricians to install AC or heat pump equipment without F-Gas certification. It applies only where the equipment is genuinely pre-charged and hermetically sealed and where the installation does not breach the refrigerant circuit. The moment a flare connection has to be made, a circuit opened, or a leak test carried out, the full F-Gas certification requirement reasserts. As the apprentice the safer working assumption is: if the equipment requires any work on the refrigerant circuit at install, an F-Gas-certified engineer must do that work. If you are unsure whether a specific installation falls within the hermetic exemption, the manufacturer technical guidance and the Environment Agency F-Gas guidance are the right references."
          >
            <p>
              Conditions that typically need to be met for the hermetic exemption to
              apply:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Equipment is hermetically sealed</strong> — the entire refrigerant
                circuit is factory-sealed and the manufacturer has labelled it as
                hermetically sealed for F-Gas purposes.
              </li>
              <li>
                <strong>Refrigerant charge is below the threshold</strong> — the
                threshold varies by equipment category and is set by the F-Gas
                Regulation. Always check the current threshold for the specific
                equipment.
              </li>
              <li>
                <strong>Installation does not breach the circuit</strong> — no flare
                connections to make, no charging required, no on-site leak test
                required.
              </li>
              <li>
                <strong>Equipment is supplied with valid F-Gas labelling</strong> —
                refrigerant type, charge in kg and tonnes CO2 equivalent already
                declared on the data plate.
              </li>
            </ul>
            <p>
              Most monoblock R-290 domestic heat pumps fall within or close to this
              hermetic relaxation because the entire refrigerant circuit is factory
              sealed inside the outdoor unit and only water pipes enter the building.
              However the manufacturer commissioning instructions still typically
              require an F-Gas-certified engineer to verify the refrigerant pressure,
              perform the initial vacuum check on the water side, and confirm
              first-fire performance — so in practice the F-Gas engineer is on site
              regardless. The relaxation matters more on much smaller equipment such as
              split-free AC and small commercial refrigeration cabinets.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Refrigerant climate impact in numbers</ContentEyebrow>

          <ConceptBlock
            title="Why a 1 kg refrigerant leak matters — the GWP arithmetic in plain English"
            plainEnglish="Refrigerants with high Global Warming Potential trap heat in the atmosphere thousands of times more effectively than the equivalent mass of CO2. A small leak that would be operationally trivial on a non-greenhouse fluid can have very large climate impact. The arithmetic is simple: kilograms of refrigerant lost, multiplied by the GWP of the refrigerant, equals kilograms of CO2 equivalent released. Translating that into something tangible: a 1 kg leak of R-410A (GWP 2,088) is climate-equivalent to over 2 tonnes of CO2 — roughly the same as driving an average UK petrol car for 10,000 miles. A 1 kg leak of R-290 (GWP 3) is equivalent to 3 kg of CO2 — about the same as a single short car journey."
            onSite="The GWP arithmetic explains why the F-Gas Regulation treats refrigerant leaks so seriously and why the leak-check regime layers up by tonnes CO2 equivalent rather than by mass. On any heat pump or AC install you will see the F-Gas engineer working carefully to avoid even small refrigerant losses — the climate cost of a venting incident is significant even where the operational impact is minimal. As the apprentice this matters at the electrical interface in two ways. First, do not let your work damage the refrigerant circuit (no chases through pipework runs, no fixings driven into outdoor unit casings). Second, support the F-Gas engineer in maintaining a clean working environment so leaks are spotted early."
          >
            <p>
              GWP arithmetic for the refrigerants you will see on UK domestic heat
              pumps:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>R-410A (GWP 2,088)</strong> — 1 kg leak = 2,088 kg CO2 eq =
                roughly the emissions of an average UK car driving 10,000 miles.
              </li>
              <li>
                <strong>R-32 (GWP 675)</strong> — 1 kg leak = 675 kg CO2 eq = roughly
                the emissions of an average UK car driving 3,200 miles.
              </li>
              <li>
                <strong>R-454B (GWP 466)</strong> — 1 kg leak = 466 kg CO2 eq.
              </li>
              <li>
                <strong>R-290 propane (GWP 3)</strong> — 1 kg leak = 3 kg CO2 eq =
                roughly a single short car journey. The shift to R-290 dramatically
                reduces the climate consequence of any leak.
              </li>
              <li>
                <strong>Equivalent context</strong> — a typical UK domestic ASHP holds
                1.5-3 kg of refrigerant. A single full-charge venting on a 2.5 kg R-410A
                unit equals around 5,200 kg CO2 — comparable to a year of typical UK
                household electricity emissions. The same venting on an R-290 unit equals
                7.5 kg CO2 — comparable to one drive to the supermarket.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The pressure points — where the boundary fails</ContentEyebrow>

          <CommonMistake
            title="Stepping over the trade boundary under customer or employer pressure"
            whatHappens={
              <>
                The F-Gas engineer does not turn up. The customer is on holiday next week
                and wants the system commissioned today. The employer is short-staffed and
                says &quot;just connect that last bit of pipework and we will send the
                F-Gas guy back to leak test next month&quot;. The apprentice does it because
                everyone above them in the chain is asking. The Environment Agency picks
                it up at a routine audit; the manufacturer voids the warranty because the
                circuit was opened by an uncertified person; the customer ends up with a
                very expensive failure that nobody insured for; the apprentice career and
                the employer F-Gas company certificate both take the hit.
              </>
            }
            doInstead={
              <>
                The trade boundary is statutory, not negotiable. Document the request in
                writing (text or email is fine), decline politely, and escalate to the
                contracts manager or business owner. Reschedule the F-Gas engineer for
                whatever date is available and accept the customer dissatisfaction in the
                short term. Honest scheduling failure is recoverable. F-Gas enforcement
                action and a voided warranty are not. The phrase to use with the customer
                is &quot;the law restricts refrigerant work to F-Gas certified engineers,
                so I cannot legally complete the install today, but I will get the
                refrigerant engineer back as soon as we can&quot;.
              </>
            }
          />

          <CommonMistake
            title="Mistaking water pipe brazing on a monoblock for refrigerant pipe brazing"
            whatHappens={
              <>
                On a monoblock R-290 heat pump only water pipes enter the building, with
                the entire refrigerant circuit sealed inside the outdoor unit. A confused
                installer assumes that any pipework on the system is &quot;heat pump
                pipework&quot; and is therefore F-Gas restricted. The wet system pipework
                stops getting connected and the install stalls unnecessarily. Or the
                opposite happens — a poorly-designed split unit with refrigerant pipes
                running through the loft is mistaken for water pipework and an unqualified
                installer puts a saw through it.
              </>
            }
            doInstead={
              <>
                Trace every pipe from the outdoor unit and identify whether it carries
                refrigerant or water before doing any work. A refrigerant pipe is normally
                copper, lagged with closed-cell foam, sized smaller than the wet circuit
                pipework, and connected to the outdoor unit at clearly-marked refrigerant
                ports. A water pipe is copper or composite, lagged for thermal loss, and
                connected to clearly-marked water ports. Where in doubt ask the F-Gas
                engineer or the design pack before touching anything. On a monoblock the
                rule is simple: if it carries water you can work on it under your normal
                competence; if it carries refrigerant you cannot.
              </>
            }
          />

          <Scenario
            title="Friday afternoon — the F-Gas engineer is stuck on the M25"
            situation={
              <>
                You are on a domestic ASHP install. The unit is mounted, the supply is in,
                the controls are wired and verified, and the wet system is filled. The
                F-Gas engineer was due at 1pm to evacuate and charge the circuit but is
                now stuck on the M25 and not arriving until Monday. The customer has
                guests coming Saturday and wants hot water. Your contracts manager phones
                and asks &quot;can you not just connect the last refrigerant flare and turn
                it on for the weekend, then he will leak test on Monday?&quot;. The
                customer is in the kitchen listening.
              </>
            }
            whatToDo={
              <>
                Decline clearly, in front of the customer if needed. Explain to the
                customer that refrigerant work is restricted by law to F-Gas certified
                engineers, that the manufacturer warranty would be voided if you opened
                the refrigerant circuit, and that the system cannot legally be charged or
                run without the F-Gas engineer present. Apologise for the inconvenience,
                offer to leave a temporary immersion heater connection if the cylinder has
                one, and confirm the Monday return slot in writing. Send a follow-up text
                to the contracts manager confirming the request and your refusal so there
                is a paper trail. The customer will be inconvenienced for two days; the
                alternative is illegal work and a voided warranty.
              </>
            }
            whyItMatters={
              <>
                The F-Gas trade boundary is the place where commercial pressure most often
                meets regulatory clarity. The pressure is real, the regulation is real,
                and the right answer is always the same. Apprentices are particularly
                vulnerable to this pressure because the contracts manager outranks them
                and the customer is right there. Practising the refusal in advance —
                literally rehearsing the sentence &quot;I cannot legally do that, and I am
                going to get the F-Gas engineer back as soon as possible&quot; — makes the
                real-world refusal easier when it matters.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 712 (PV) extensive revision"
            clause={
              <>
                Section 712 &apos;Solar photovoltaic (PV) power supply systems&apos; has been
                extensively revised and expanded in BS 7671:2018+A4:2026. The technical content
                of this section has been extensively revised and expanded and now contains
                updated requirements specific to PV systems.
              </>
            }
            meaning={
              <>
                Maintenance work on PV — replacing an isolator, swapping a faulty inverter,
                cleaning down a string — sits squarely under the revised Section 712. Pre-A4
                guidance on DC isolation methods or RCD type selection should be cross-checked
                against the published amendment text before being relied on.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Section 712."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "EU Regulation 517/2014 was retained as UK law after Brexit. The substantive F-Gas rules continue to apply across Great Britain, with NI under the Windsor Framework.",
              "The Environment Agency (England), SEPA, NRW and NIEA enforce. Civil sanctions and criminal prosecution are both available.",
              "Refrigerant work is restricted to F-Gas Category I certified persons working under an F-Gas company certificate. Both certificates are required.",
              "The electrician scope on a heat pump install is supply, isolation, controls, bonding and verification. Refrigerant pipework, evacuation, charging, leak test and recovery are out of scope.",
              "GWP drives modern refrigerant choice: R-410A (~2,088) is being phased down, R-32 (~675) is current, R-290 propane (~3) is the rising default for monoblock heat pumps.",
              "The F-Gas equipment label is statutory and feeds directly into the leak-check regime and the end-of-life recovery duty. Do not damage or obscure it.",
              "Customer or employer pressure to step over the trade boundary is the single biggest risk to apprentice compliance. Document, decline, escalate.",
              "On a monoblock R-290 heat pump only water pipes enter the building. Trace every pipe before touching it: water you can work on, refrigerant you cannot.",
            ]}
          />

          <Quiz title="F-Gas Regulations and the trade boundary — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module 2 home
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section6-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.2 WEEE Regs and lithium-ion battery safety
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
