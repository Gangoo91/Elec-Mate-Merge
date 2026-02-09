import {
  ArrowLeft,
  FlaskConical,
  CheckCircle,
  AlertTriangle,
  Shield,
  FileText,
  Skull,
  Wind,
  Droplets,
  Flame,
  Syringe,
  Zap,
  HardHat,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'poisoning-ingestion-vomiting',
    question:
      'A colleague has swallowed a corrosive cleaning chemical on site. They are conscious and asking you to help them vomit. What is the correct action?',
    options: [
      'Help them vomit immediately to remove the chemical from their stomach',
      'Give them a large glass of milk to dilute the chemical, then induce vomiting',
      'Do NOT induce vomiting — call 999, try to identify the substance, and take the container or SDS to hospital',
      'Give them activated charcoal to absorb the chemical',
    ],
    correctIndex: 2,
    explanation:
      'You must NEVER induce vomiting after ingestion of a corrosive substance. The chemical has already burned the oesophagus on the way down — vomiting will cause it to burn the oesophagus a second time on the way back up. There is also a serious risk of aspiration (inhaling vomit into the lungs). Call 999 immediately, try to identify what was swallowed, how much, and when, and take the container or Safety Data Sheet to hospital with the casualty.',
  },
  {
    id: 'inhalation-poisoning-scene',
    question:
      'You find a colleague collapsed in a plant room that smells strongly of gas. What is your FIRST action?',
    options: [
      'Rush in and drag them out immediately',
      'Call 999 from outside the room, do NOT enter without appropriate RPE, and prevent others from entering',
      'Open a window and then enter to help',
      'Start CPR where they are lying',
    ],
    correctIndex: 1,
    explanation:
      'Scene safety is ALWAYS the first priority with inhalation poisoning. You must NOT enter a contaminated atmosphere without appropriate respiratory protective equipment (RPE). Rushing in without protection will make you a second casualty — many rescuer deaths have occurred from entering gas-filled spaces without RPE. Call 999 from outside the room and prevent others from entering. If you can safely ventilate the area from outside (opening doors or windows without entering), do so, but your personal safety comes first.',
  },
  {
    id: 'carbon-monoxide-recognition',
    question:
      'Which of the following is NOT a recognised sign or symptom of carbon monoxide poisoning?',
    options: [
      'Headache, dizziness, and nausea',
      'Confusion and loss of consciousness',
      'Severe chest pain radiating to the left arm',
      'Cherry-red skin colour (late sign)',
    ],
    correctIndex: 2,
    explanation:
      'Severe chest pain radiating to the left arm is a classic sign of a heart attack (myocardial infarction), not carbon monoxide poisoning. CO poisoning typically presents with headache, dizziness, nausea, confusion, and eventually loss of consciousness. Cherry-red skin colour is a late and often post-mortem finding — you should not rely on it for early recognition. The insidious nature of CO is that early symptoms (headache, nausea) mimic common illnesses, so the gas goes undetected until serious exposure has occurred.',
  },
];

const faqs = [
  {
    question: 'Where should Safety Data Sheets be kept on a construction site?',
    answer:
      'Safety Data Sheets must be readily accessible to all workers who may be exposed to hazardous substances. On construction sites, they should be kept in a known, accessible location — typically the site office, welfare facility, or a dedicated COSHH folder on site. Many sites now keep SDS available digitally on tablets or through QR codes on product containers. First aiders should know exactly where the SDS are kept and be able to access Section 4 (First Aid Measures) quickly in an emergency. During the site induction, the location of SDS should be communicated to all workers.',
  },
  {
    question: 'What is the difference between COSHH and the Safety Data Sheet?',
    answer:
      'COSHH (Control of Substances Hazardous to Health Regulations 2002) is the law — it requires employers to assess and control the risks from hazardous substances in the workplace. A COSHH assessment is a risk assessment specific to each hazardous substance used on site, detailing what the hazard is, who is at risk, what controls are in place, and what to do in an emergency. A Safety Data Sheet (SDS) is a document provided by the manufacturer or supplier of the substance. It contains 16 sections covering identification, hazards, composition, first aid measures, firefighting, handling, exposure controls, and more. The SDS informs the COSHH assessment — it provides the data that the employer uses to assess risk and determine controls.',
  },
  {
    question:
      'Can a first aider administer naloxone (Narcan) for a suspected opioid overdose on site?',
    answer:
      "In the UK, naloxone can be supplied to anyone without a prescription for the purpose of saving a life in an opioid overdose. Since October 2023, the law allows wider access to naloxone. However, whether a first aider on a construction site would carry or administer naloxone depends on the site's specific risk assessment and the employer's first aid policy. Most construction site first aid kits do not currently include naloxone. If a first aider suspects an opioid overdose (pinpoint pupils, slow or stopped breathing, unconsciousness), the priority is to call 999, open the airway, and provide rescue breaths or CPR if breathing has stopped. Paramedics will administer naloxone on arrival.",
  },
  {
    question: 'If someone gets solvent on their skin at work, should I use a chemical neutraliser?',
    answer:
      'No. You should NEVER attempt to neutralise a chemical on the skin with another chemical. Neutralisation reactions are exothermic — they generate heat — which can cause a thermal burn on top of the chemical injury. The correct first aid is to flush the affected skin with copious running water for at least 20 minutes. Remove contaminated clothing while flushing, wearing gloves to protect yourself. Note the substance for medical staff. Check the Safety Data Sheet for any specific first aid guidance for that particular substance.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Under COSHH Regulations 2002, which of the following is an employer's duty regarding hazardous substances?",
    options: [
      'Provide hazardous substances free of charge to all employees',
      'Assess the risks from hazardous substances and prevent or control exposure',
      'Allow employees to choose their own level of protection',
      'Report all hazardous substance use to the HSE monthly',
    ],
    correctAnswer: 1,
    explanation:
      'COSHH requires employers to assess the risks from hazardous substances in the workplace and either prevent exposure entirely or, where this is not reasonably practicable, adequately control it. This includes identifying hazardous substances, conducting risk assessments, implementing control measures (following the hierarchy of control), providing information and training to employees, and carrying out health surveillance where required.',
  },
  {
    id: 2,
    question:
      'A casualty has swallowed an unknown chemical. Their lips and mouth show signs of chemical burns. What first aid should you provide?',
    options: [
      'Induce vomiting immediately to remove the chemical',
      'Give them a large glass of water to drink quickly',
      'Do NOT induce vomiting — if lips and mouth are burnt (suggesting a corrosive), give small sips of water or milk to dilute, call 999, and take the container to hospital',
      'Give them bread to absorb the chemical in their stomach',
    ],
    correctAnswer: 2,
    explanation:
      'When a corrosive substance has been swallowed (indicated by burns to the lips and mouth), you must NOT induce vomiting — the corrosive will burn the oesophagus again on the way back up and may be aspirated into the lungs. Small sips of water or milk may be given to dilute the substance in the stomach. Call 999 immediately and try to identify what was swallowed, how much, and when. Take the container or SDS to hospital so that medical staff know exactly what they are treating.',
  },
  {
    id: 3,
    question: 'What does Section 4 of a Safety Data Sheet provide?',
    options: [
      'Physical and chemical properties of the substance',
      'Transport and storage requirements',
      'First aid measures for inhalation, skin contact, eye contact, and ingestion',
      'Environmental disposal procedures',
    ],
    correctAnswer: 2,
    explanation:
      'Section 4 of the Safety Data Sheet is dedicated to First Aid Measures. It provides specific first aid information for each route of exposure: inhalation, skin contact, eye contact, and ingestion. It also describes the most important symptoms and effects (both acute and delayed) and indicates when immediate medical attention is needed. First aiders should be familiar with Section 4 for all hazardous substances used on their site.',
  },
  {
    id: 4,
    question:
      'You suspect a colleague is suffering from carbon monoxide poisoning in an enclosed plant room. What is the correct sequence of actions?',
    options: [
      'Enter the room, drag them out, then call 999',
      'Ensure your own safety first — do NOT enter without RPE, call 999, remove the casualty to fresh air only if safe to do so, monitor and be prepared for CPR',
      'Open all windows and doors, then enter to perform CPR in the room',
      'Call the gas company and wait for them to arrive before taking any action',
    ],
    correctAnswer: 1,
    explanation:
      'Carbon monoxide is an odourless, colourless gas — you cannot detect it without a CO monitor. Your own safety comes first. Do NOT enter a CO-contaminated space without appropriate RPE. Call 999 from outside. If you can safely remove the casualty to fresh air (for example, if the area has been ventilated or you have RPE), do so. Monitor the casualty — if they are not breathing, start CPR using a pocket mask or face shield. Paramedics will administer 100% oxygen on arrival.',
  },
  {
    id: 5,
    question: 'Which of the following substances is NOT covered by the COSHH Regulations 2002?',
    options: [
      'Cleaning solvents used on site',
      'Dust from cutting plasterboard',
      'Asbestos fibres',
      'Flux fumes from soldering',
    ],
    correctAnswer: 2,
    explanation:
      'Asbestos is NOT covered by COSHH — it has its own specific regulations: the Control of Asbestos Regulations 2012. Similarly, lead has the Control of Lead at Work Regulations 2002, and radioactive substances have their own legislation. COSHH covers the vast majority of other hazardous substances including chemicals, dusts, fumes, vapours, and biological agents.',
  },
  {
    id: 6,
    question:
      'A worker has got a solvent-based cleaning chemical on their forearm. The skin is red and irritated. What is the correct first aid?',
    options: [
      'Apply a neutralising chemical to counteract the solvent',
      'Wipe the area with a dry cloth and apply burn cream',
      'Remove contaminated clothing, flush the affected skin with copious running water for at least 20 minutes, and note the substance for medical staff',
      'Cover the area with cling film immediately without washing',
    ],
    correctAnswer: 2,
    explanation:
      'For chemical contact with the skin, the correct first aid is to remove contaminated clothing (wearing gloves to protect yourself) and flush the affected area with copious running water for at least 20 minutes. Do NOT attempt to neutralise the substance — neutralisation reactions generate heat and can worsen the injury. Note the name of the substance so that medical staff can provide specific treatment. Check the SDS for any additional guidance.',
  },
  {
    id: 7,
    question:
      'Which hazardous substance encountered by electricians can cause severe respiratory sensitisation and occupational asthma?',
    options: [
      'PVC cable insulation fumes',
      'Isocyanates (found in spray foam insulation)',
      'Battery acid (sulphuric acid)',
      'Flux residue from soldering',
    ],
    correctAnswer: 1,
    explanation:
      'Isocyanates, found in spray foam insulation and some paints and coatings, are potent respiratory sensitisers. Even very low levels of exposure can cause severe respiratory sensitisation, leading to occupational asthma that may be permanent and irreversible. Once sensitised, even tiny subsequent exposures can trigger a serious asthma attack. Electricians working in buildings where spray foam insulation is being applied must be aware of this risk and ensure appropriate controls are in place.',
  },
  {
    id: 8,
    question:
      'A person on site is found unconscious with pinpoint pupils and very slow breathing. A colleague mentions they saw the person acting strangely earlier. What should a first aider do?',
    options: [
      'Assume drug use and wait for them to recover on their own',
      'Call 999, open the airway, provide rescue breaths if breathing is inadequate, be prepared for CPR, and place in the recovery position if breathing improves',
      'Give them strong coffee to wake them up',
      'Search their pockets for medication before calling 999',
    ],
    correctAnswer: 1,
    explanation:
      "Pinpoint pupils and slow or stopped breathing are classic signs of opioid overdose. Regardless of the cause, the first aider must treat the symptoms: call 999 immediately, open the airway, and if breathing is inadequate or absent, provide rescue breaths and be prepared for full CPR. If the person is breathing, place them in the recovery position and monitor continuously. Do not judge — the first aider's role is to preserve life, not to determine the cause of the emergency. Paramedics will provide specific treatment on arrival.",
  },
];

export default function FirstAidModule5Section3() {
  useSEO({
    title: 'Poisoning, COSHH & Hazardous Substances | First Aid Module 5.3',
    description:
      'COSHH Regulations 2002, Safety Data Sheets, poisoning by ingestion, inhalation, and skin contact, carbon monoxide poisoning, NPIS/TOXBASE, site-specific hazards for electricians, and drug and alcohol emergencies.',
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
            <Link to="../first-aid-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <FlaskConical className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Poisoning, COSHH &amp; Hazardous Substances
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            COSHH Regulations 2002, Safety Data Sheets, poisoning by ingestion, inhalation, and skin
            contact, carbon monoxide poisoning, site-specific hazards for electricians, and drug and
            alcohol emergencies
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Ingestion:</strong> Do NOT induce vomiting &mdash; call 999, identify the
                substance
              </li>
              <li>
                <strong>Inhalation:</strong> Scene safety FIRST &mdash; do NOT enter without RPE
              </li>
              <li>
                <strong>Skin contact:</strong> Flush with water 20+ minutes, do NOT neutralise
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>COSHH:</strong> Employer must assess and control exposure to hazardous
                substances
              </li>
              <li>
                <strong>SDS:</strong> Section 4 has first aid measures &mdash; know where they are
                kept
              </li>
              <li>
                <strong>CO:</strong> Colourless, odourless &mdash; the &ldquo;silent killer&rdquo;
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain the key employer duties under the COSHH Regulations 2002 and what substances they cover',
              'Locate and interpret Section 4 (First Aid Measures) of a Safety Data Sheet',
              'Demonstrate correct first aid for poisoning by ingestion, inhalation, and skin contact',
              'Recognise the signs and symptoms of carbon monoxide poisoning and provide appropriate treatment',
              'Identify site-specific chemical hazards commonly encountered by electricians',
              'Respond appropriately to drug and alcohol emergencies on site without judgement',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: COSHH Regulations 2002 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">01</span>
            COSHH Regulations 2002
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Control of Substances Hazardous to Health Regulations 2002</strong>{' '}
                (COSHH) is the primary UK legislation governing workplace exposure to hazardous
                substances. COSHH places clear legal duties on employers to protect employees and
                others from the health risks caused by hazardous substances used at, or arising
                from, work activities.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Employer Duties Under COSHH</p>
                </div>
                <div className="space-y-2">
                  {[
                    'Identify all hazardous substances present in the workplace or generated by work activities',
                    'Assess the risks to health from those substances — who is exposed, how, how much, and how often',
                    'Prevent exposure entirely where reasonably practicable, or adequately control it where prevention is not possible',
                    'Provide information, instruction, and training to all employees who may be exposed',
                    'Provide and maintain appropriate control measures — ventilation, PPE, safe systems of work',
                    'Carry out health surveillance where the COSHH assessment identifies it as necessary',
                    'Plan for emergencies, accidents, and incidents involving hazardous substances',
                    'Review the COSHH assessment regularly and whenever circumstances change',
                  ].map((duty, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <p className="text-sm text-white/80">{duty}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-2">COSHH Applies To:</p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    {[
                      'Chemicals (cleaning agents, solvents, adhesives, paints)',
                      'Dusts (wood dust, plasterboard dust, silica dust)',
                      'Fumes (welding fumes, soldering flux fumes, exhaust fumes)',
                      'Vapours (solvent vapours, fuel vapours)',
                      'Biological agents (bacteria, viruses, fungi)',
                      'Any substance that can cause harm to health through exposure',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-2">COSHH Does NOT Cover:</p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Lead</strong> &mdash; covered by the Control
                        of Lead at Work Regulations 2002
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Asbestos</strong> &mdash; covered by the
                        Control of Asbestos Regulations 2012
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Radioactive substances</strong> &mdash;
                        covered by the Ionising Radiations Regulations 2017
                      </span>
                    </li>
                  </ul>
                  <p className="text-xs text-white/60 mt-3">
                    These substances have their own specific regulations because they present unique
                    risks that require specialised controls beyond the scope of COSHH.
                  </p>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Hierarchy of Control Under COSHH:</strong> COSHH
                  requires employers to follow the hierarchy of control: (1) eliminate the hazardous
                  substance entirely, (2) substitute with a less hazardous alternative, (3) enclose
                  the process, (4) provide local exhaust ventilation, (5) establish safe systems of
                  work, and (6) provide personal protective equipment as a last resort. PPE should
                  never be the primary control measure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Safety Data Sheets — Section 4: First Aid Measures */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">02</span>
            Safety Data Sheets &mdash; Section 4: First Aid Measures
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every hazardous substance placed on the market must be accompanied by a{' '}
                <strong>Safety Data Sheet (SDS)</strong>. The SDS is a standardised document
                containing 16 sections that provide comprehensive information about the substance,
                its hazards, safe handling, and emergency measures. For first aiders,{' '}
                <strong>Section 4</strong> is the most critical part of the SDS.
              </p>

              {/* SDS Section 4 Info Box */}
              <div className="bg-white/5 border-2 border-rose-500/30 rounded-lg overflow-hidden">
                <div className="bg-rose-500/10 px-4 py-3 border-b border-rose-500/20">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-rose-400" />
                    <p className="text-base font-semibold text-rose-400">
                      SDS Section 4 &mdash; First Aid Measures
                    </p>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  {[
                    {
                      route: 'Inhalation',
                      text: 'What to do if the substance is breathed in — move to fresh air, positioning, when to seek medical help',
                      colour: 'text-blue-400',
                      bg: 'bg-blue-500/10',
                      border: 'border-blue-500/30',
                    },
                    {
                      route: 'Skin Contact',
                      text: 'How to decontaminate the skin — flushing duration, clothing removal, specific instructions for that substance',
                      colour: 'text-green-400',
                      bg: 'bg-green-500/10',
                      border: 'border-green-500/30',
                    },
                    {
                      route: 'Eye Contact',
                      text: 'How to irrigate the eyes — duration of flushing, whether to remove contact lenses, when to seek medical attention',
                      colour: 'text-purple-400',
                      bg: 'bg-purple-500/10',
                      border: 'border-purple-500/30',
                    },
                    {
                      route: 'Ingestion',
                      text: 'What to do if the substance is swallowed — whether vomiting should or should not be induced, dilution, hospital referral',
                      colour: 'text-amber-400',
                      bg: 'bg-amber-500/10',
                      border: 'border-amber-500/30',
                    },
                  ].map((item, i) => (
                    <div key={i} className={`${item.bg} border ${item.border} p-3 rounded-lg`}>
                      <p className={`text-xs font-semibold ${item.colour} mb-1`}>{item.route}</p>
                      <p className="text-sm text-white/80">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Section 4 Also Provides:</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Symptoms of exposure:</strong> Both immediate
                      and delayed effects to watch for
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Immediate treatment:</strong> Specific first
                      aid actions for that particular substance
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">When to seek medical attention:</strong>{' '}
                      Criteria for hospital referral or emergency medical treatment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Antidotes:</strong> Whether specific antidotes
                      exist and should be available
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">First Aider Action:</strong> As a first aider,
                  you should know where the Safety Data Sheets are kept on your site and be able to
                  access Section 4 quickly in an emergency. During a poisoning incident, the SDS
                  provides substance-specific first aid instructions that may differ from general
                  guidance. If possible, take the SDS (or the product container with its label) with
                  the casualty to hospital so that medical staff can see exactly what the casualty
                  has been exposed to.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">All 16 Sections of an SDS</p>
                <div className="grid sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-white/60">
                  {[
                    '1. Identification',
                    '2. Hazard identification',
                    '3. Composition / ingredients',
                    '4. First aid measures',
                    '5. Firefighting measures',
                    '6. Accidental release measures',
                    '7. Handling and storage',
                    '8. Exposure controls / PPE',
                    '9. Physical / chemical properties',
                    '10. Stability and reactivity',
                    '11. Toxicological information',
                    '12. Ecological information',
                    '13. Disposal considerations',
                    '14. Transport information',
                    '15. Regulatory information',
                    '16. Other information',
                  ].map((section, i) => (
                    <p key={i} className={i === 3 ? 'text-rose-400 font-medium' : ''}>
                      {section}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: Routes of Exposure — Poisoning */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">03</span>
            Routes of Exposure &mdash; Poisoning First Aid
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Poisoning occurs when a harmful substance enters the body in sufficient quantity to
                cause damage. The three main routes of exposure on construction sites are{' '}
                <strong>ingestion</strong> (swallowing), <strong>inhalation</strong> (breathing in),
                and <strong>skin contact</strong> (absorption through the skin). Each route requires
                a different first aid approach.
              </p>

              {/* Routes of Exposure Grid */}
              <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
                {/* Ingestion */}
                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Skull className="h-5 w-5 text-amber-400" />
                    <p className="text-sm font-medium text-amber-400">Ingestion (Swallowing)</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        <strong className="text-red-300">Do NOT induce vomiting</strong> &mdash;
                        risk of further damage from corrosives and aspiration
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Do NOT give anything to drink unless instructed by poison centre or SDS
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        If lips/mouth are burnt (corrosive): sips of water or milk to dilute
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Identify what, how much, when &mdash; take container/SDS to hospital
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Call 999, recovery position if unconscious and breathing</span>
                    </li>
                  </ul>
                </div>

                {/* Inhalation */}
                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Wind className="h-5 w-5 text-blue-400" />
                    <p className="text-sm font-medium text-blue-400">Inhalation (Breathing In)</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>
                        <strong className="text-red-300">Scene safety FIRST</strong> &mdash; do NOT
                        enter without appropriate RPE
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Remove casualty to fresh air (only if safe to do so)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Call 999</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>
                        If not breathing: CPR with pocket mask/face shield to protect from
                        contamination
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>If breathing: monitor, comfortable position, keep warm</span>
                    </li>
                  </ul>
                </div>

                {/* Skin Contact */}
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Droplets className="h-5 w-5 text-green-400" />
                    <p className="text-sm font-medium text-green-400">Skin Contact (Absorption)</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Remove contaminated clothing (wear gloves to protect yourself)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">
                          Flush with copious running water for at least 20 minutes
                        </strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>
                        <strong className="text-red-300">Do NOT neutralise</strong> the substance
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>
                        Chemical burns: treat as burns (cool with water, cover with cling film)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Note the substance for medical staff</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Detailed: Poisoning by Ingestion */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Skull className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    Poisoning by Ingestion &mdash; Detailed Guidance
                  </p>
                </div>
                <div className="text-sm text-white/80 space-y-3">
                  <p>
                    Ingestion of hazardous substances on construction sites can occur through
                    contaminated food or drink, hand-to-mouth transfer after handling chemicals
                    without washing hands, or accidental consumption of chemicals stored in unmarked
                    containers (a common and entirely preventable cause of poisoning).
                  </p>
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <p className="text-sm font-medium text-red-300 mb-2">
                      Why NOT Induce Vomiting?
                    </p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                        <span>
                          <strong className="text-white">Corrosive substances:</strong> The chemical
                          has already burned the oesophagus on the way down &mdash; vomiting causes
                          a second burn on the way back up
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                        <span>
                          <strong className="text-white">Aspiration risk:</strong> Vomit containing
                          chemicals can be inhaled into the lungs, causing chemical pneumonitis
                          which can be fatal
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                        <span>
                          <strong className="text-white">Petroleum products:</strong> Solvents and
                          fuels are particularly dangerous if aspirated &mdash; they cause severe
                          chemical pneumonia
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Detailed: Poisoning by Inhalation */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Wind className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">
                    Poisoning by Inhalation &mdash; Detailed Guidance
                  </p>
                </div>
                <div className="text-sm text-white/80 space-y-3">
                  <p>
                    Inhalation is the most common route of occupational poisoning. Harmful gases,
                    vapours, fumes, and dusts can be breathed in without the worker being aware of
                    the exposure &mdash; particularly with odourless gases like carbon monoxide.
                  </p>
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <p className="text-sm font-medium text-red-300 mb-2">
                      Scene Safety is Non-Negotiable
                    </p>
                    <p className="text-sm text-white/80">
                      More rescuers have died entering toxic atmospheres than casualties they were
                      trying to save. You must <strong className="text-white">NEVER</strong> enter a
                      contaminated atmosphere without appropriate respiratory protective equipment
                      (RPE). If you do not have RPE, call 999 from a safe location and prevent
                      others from entering the area.
                    </p>
                  </div>
                  <p className="font-medium text-white">Specific inhalation hazards:</p>
                  <ul className="space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Solvent vapours:</strong> CNS depression,
                        dizziness, confusion, loss of consciousness in high concentrations
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Carbon monoxide:</strong> Odourless &mdash;
                        headache, nausea, confusion, collapse (see Section 04 below)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Chlorine gas:</strong> Pungent smell, severe
                        respiratory irritation, pulmonary oedema in high exposure
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Hydrogen sulphide:</strong> &ldquo;Rotten
                        eggs&rdquo; smell at low concentrations, but olfactory fatigue occurs
                        rapidly &mdash; at high concentrations it is odourless and instantly fatal
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Detailed: Poisoning by Skin Contact */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Droplets className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">
                    Poisoning by Skin Contact &mdash; Detailed Guidance
                  </p>
                </div>
                <div className="text-sm text-white/80 space-y-3">
                  <p>
                    Many hazardous substances can be absorbed through intact skin, entering the
                    bloodstream and causing systemic poisoning. Some substances cause local damage
                    (chemical burns) at the point of contact, while others pass through the skin
                    with little visible sign of injury.
                  </p>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">Never Neutralise:</strong> Do not attempt to
                      neutralise a chemical on the skin. Neutralisation reactions are exothermic
                      (they generate heat), which will cause a thermal burn on top of the chemical
                      injury. Always flush with copious running water.
                    </p>
                  </div>
                  <p>
                    If the substance has caused a chemical burn, treat it as you would a burn: cool
                    with running water for at least 20 minutes, then cover loosely with cling film.
                    Note the substance name for medical staff and take the SDS or container to
                    hospital if possible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 04: Carbon Monoxide Poisoning */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">04</span>
            Carbon Monoxide (CO) Poisoning
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Carbon monoxide (CO) is a <strong>colourless, odourless, tasteless gas</strong>{' '}
                &mdash; often called the &ldquo;silent killer&rdquo; because it is impossible to
                detect without a CO monitor. It is produced by the incomplete combustion of
                carbon-based fuels and is one of the most common causes of fatal poisoning in the
                UK.
              </p>

              <div className="bg-red-500/10 border-2 border-red-500/40 p-5 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                  <p className="text-base font-bold text-red-400">
                    The &ldquo;Silent Killer&rdquo;
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  CO binds to haemoglobin in the blood with an affinity approximately{' '}
                  <strong className="text-white">250 times greater than oxygen</strong>. This means
                  that even small concentrations of CO in the air can rapidly saturate the blood,
                  preventing oxygen from being carried to the body&rsquo;s tissues and organs. The
                  brain and heart are particularly vulnerable.
                </p>
                <p className="text-sm text-white/80">
                  Because CO is colourless, odourless, and tasteless, the casualty typically has no
                  warning. Early symptoms (headache, nausea) are often mistaken for flu or food
                  poisoning, allowing exposure to continue until the casualty collapses.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Sources of CO on Construction Sites
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  {[
                    'Faulty or poorly maintained gas appliances (boilers, heaters, water heaters)',
                    'Petrol or diesel generators used in enclosed or poorly ventilated spaces',
                    'Petrol or diesel engines (vehicles, compressors, pumps) running in enclosed spaces',
                    'Fires and combustion processes in confined areas',
                    'Gas-powered cutting and welding equipment in poorly ventilated areas',
                    'Propane or butane space heaters in enclosed site cabins',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-amber-400 mb-3">
                    Recognition &mdash; Signs &amp; Symptoms
                  </p>
                  <ul className="text-sm text-white/80 space-y-2">
                    {[
                      'Headache (often the first symptom)',
                      'Dizziness and lightheadedness',
                      'Nausea and vomiting',
                      'Tiredness and confusion',
                      'Shortness of breath',
                      'Difficulty thinking clearly',
                      'Loss of consciousness',
                      'Cherry-red skin colour (late sign — unreliable for early recognition)',
                      'Seizures (in severe cases)',
                      'Cardiac arrest (in extreme exposure)',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-rose-400 mb-3">Treatment</p>
                  <div className="space-y-2">
                    {[
                      'Ensure your OWN safety — do NOT enter the contaminated area without RPE or a CO monitor confirming safe levels',
                      'Remove the casualty to fresh air (only if safe to do so)',
                      'Call 999 immediately',
                      'If not breathing: start CPR (use a pocket mask or face shield)',
                      'If breathing: place in a comfortable position, keep warm, monitor continuously',
                      '100% oxygen will be administered by paramedics — this is the definitive pre-hospital treatment',
                      'Be prepared for the casualty to deteriorate — CO poisoning can cause delayed cardiac arrhythmias',
                    ].map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                          {i + 1}
                        </span>
                        <p className="text-sm text-white/80">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    CO Alarms on Construction Sites
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  CO alarms should be installed in any enclosed or semi-enclosed space where
                  combustion equipment is in use or where CO may accumulate. This includes plant
                  rooms, site cabins with gas heaters, and any space where generators or
                  fuel-powered equipment are operated. Personal CO monitors are available and should
                  be worn by workers entering potentially contaminated spaces. Alarms must be tested
                  regularly and batteries replaced as recommended by the manufacturer.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: NPIS & TOXBASE */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">05</span>
            National Poisons Information Service (NPIS)
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>National Poisons Information Service (NPIS)</strong> provides expert
                toxicology advice to healthcare professionals across the UK. It operates the{' '}
                <strong>TOXBASE</strong> database, which is the primary clinical toxicology resource
                used by NHS emergency departments and ambulance services.
              </p>

              <div className="bg-white/5 border-2 border-rose-500/30 rounded-lg overflow-hidden">
                <div className="bg-rose-500/10 px-4 py-3 border-b border-rose-500/20">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-rose-400" />
                    <p className="text-base font-semibold text-rose-400">
                      NPIS &mdash; Key Information
                    </p>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white mb-1">TOXBASE Database</p>
                    <p className="text-sm text-white/80">
                      The online clinical toxicology database used by healthcare professionals.
                      Contains detailed information on thousands of substances, including symptoms,
                      treatment protocols, and antidotes. First aiders do not have direct access,
                      but hospital staff and paramedics will consult TOXBASE when treating a
                      poisoning casualty.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white mb-1">Telephone Service</p>
                    <p className="text-sm text-white/80">
                      <strong className="text-rose-400">0344 892 0111</strong> &mdash; for
                      healthcare professionals only (doctors, nurses, paramedics). This is NOT a
                      public helpline. First aiders should call 999 for poisoning emergencies, and
                      the ambulance service will liaise with NPIS if specialist advice is needed.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">First Aider&rsquo;s Role:</strong> As a first
                  aider, your role in a poisoning emergency is to keep the casualty alive and gather
                  information for the ambulance service. Try to identify: what substance was
                  involved, how the exposure occurred (ingestion, inhalation, skin contact), how
                  much was involved, and when the exposure occurred. This information helps
                  paramedics and hospital staff provide the right treatment quickly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Site-Specific Hazards for Electricians */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">06</span>
            Site-Specific Hazards for Electricians
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                As an electrician, you encounter a range of hazardous substances that are specific
                to your trade. Understanding these hazards, how they enter the body, and what first
                aid is required is essential for protecting yourself and your colleagues.
              </p>

              {/* Electrician-Specific Hazards List */}
              <div className="space-y-3">
                <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FlaskConical className="h-5 w-5 text-purple-400" />
                    <p className="text-sm font-medium text-purple-400">
                      Solvents (Contact Cleaners, Degreasers)
                    </p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    Used for cleaning electrical contacts, degreasing components, and removing flux
                    residues. Common solvents include isopropyl alcohol, acetone, and proprietary
                    contact cleaners.
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Routes:</strong> Inhalation of vapours, skin
                        absorption
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Effects:</strong> CNS depression (dizziness,
                        drowsiness, confusion), skin defatting and dermatitis, respiratory
                        irritation
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Flame className="h-5 w-5 text-orange-400" />
                    <p className="text-sm font-medium text-orange-400">Flux Fumes (Soldering)</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    Soldering produces fumes from the flux (rosin-based or acid-based) and from the
                    solder itself. Lead-free solder still produces flux fumes that are harmful.
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Routes:</strong> Inhalation of fumes
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Effects:</strong> Respiratory irritation,
                        occupational asthma (rosin flux), metal fume fever (flu-like symptoms
                        4&ndash;8 hours after exposure)
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <HardHat className="h-5 w-5 text-slate-400" />
                    <p className="text-sm font-medium text-slate-400">
                      Lead (Older Installations, Solder)
                    </p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    Found in older solder (leaded solder), lead-sheathed cables in older buildings,
                    and lead paint on surfaces near electrical installations. Lead has its own
                    regulations (Control of Lead at Work Regulations 2002) separate from COSHH.
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Routes:</strong> Inhalation of lead
                        dust/fumes, ingestion through hand-to-mouth transfer
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Effects:</strong> Cumulative poisoning
                        &mdash; abdominal pain, fatigue, cognitive impairment, anaemia, kidney
                        damage
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <p className="text-sm font-medium text-red-400">
                      Isocyanates (Spray Foam Insulation)
                    </p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    Methylene diphenyl diisocyanate (MDI) is found in spray foam insulation used in
                    cavity walls and loft spaces. Electricians may be exposed when working in
                    buildings where spray foam is being applied or has been recently applied.
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Routes:</strong> Inhalation, skin contact
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        <strong className="text-red-300">Effects:</strong>{' '}
                        <strong className="text-white">Severe respiratory sensitisation</strong>{' '}
                        &mdash; can cause permanent occupational asthma that is irreversible. Once
                        sensitised, even tiny subsequent exposures trigger serious asthma attacks
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-teal-500/10 border border-teal-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-teal-400" />
                    <p className="text-sm font-medium text-teal-400">
                      Asbestos Dust (Older Buildings)
                    </p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    Electricians working in pre-2000 buildings are at particular risk of
                    encountering asbestos in floor tiles, ceiling tiles, textured coatings (Artex),
                    insulation board, pipe lagging, and fuse boxes. Asbestos has its own regulations
                    (Control of Asbestos Regulations 2012) separate from COSHH.
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-teal-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Route:</strong> Inhalation of microscopic
                        fibres
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-teal-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Effects:</strong> Mesothelioma (incurable
                        cancer of the lung lining), asbestosis, lung cancer &mdash; diseases develop
                        15&ndash;50 years after exposure
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-teal-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Requirement:</strong> Asbestos awareness
                        training is mandatory for all workers who may disturb asbestos-containing
                        materials
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-5 w-5 text-amber-400" />
                    <p className="text-sm font-medium text-amber-400">
                      Battery Acid (Sulphuric Acid)
                    </p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    Found in lead-acid batteries used in UPS systems, emergency lighting, and
                    battery backup installations. Sulphuric acid is highly corrosive and can cause
                    severe burns on contact.
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Routes:</strong> Skin contact, eye contact,
                        inhalation of acid mist
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Effects:</strong> Corrosive burns to skin and
                        eyes, severe eye damage including blindness, respiratory irritation
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Flame className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">PVC Cable Insulation Fumes</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    When PVC cable insulation is heated or burnt (for example, during a cable fire
                    or overheating from an overloaded circuit), it releases hydrogen chloride (HCl)
                    gas. This is a highly irritant and corrosive gas.
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Route:</strong> Inhalation
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Effects:</strong> Severe respiratory
                        irritation, chemical burns to the airway, pulmonary oedema in significant
                        exposure
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Drug and Alcohol Emergencies */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">&nbsp;</span>
            Drug &amp; Alcohol Emergencies on Site
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                First aiders may encounter drug and alcohol emergencies on construction sites.
                Regardless of the cause, the first aider&rsquo;s role is to{' '}
                <strong>treat the symptoms and preserve life</strong> &mdash; not to judge the
                casualty or determine the cause of their condition.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Recognition of Intoxication</p>
                <ul className="text-sm text-white/80 space-y-2">
                  {[
                    'Slurred speech and difficulty communicating',
                    'Unsteady gait (difficulty walking or standing)',
                    'Confusion, disorientation, or unusual behaviour',
                    'Strong smell of alcohol on the breath',
                    'Dilated or constricted pupils (depending on the substance)',
                    'Nausea and vomiting',
                    'Loss of consciousness',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Syringe className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Opioid Overdose &mdash; Recognise &amp; Respond
                  </p>
                </div>
                <div className="text-sm text-white/80 space-y-2">
                  <p className="font-medium text-white">Classic signs of opioid overdose:</p>
                  <ul className="space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Pinpoint pupils</strong> (very small,
                        constricted)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Slow or stopped breathing</strong>{' '}
                        (respiratory depression is the primary danger)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Unconsciousness</strong> or extreme
                        drowsiness
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Blue or grey lips and fingertips (cyanosis)</span>
                    </li>
                  </ul>
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg mt-2">
                    <p className="text-sm text-white">
                      <strong className="text-red-300">Action:</strong> Call 999 immediately. Open
                      the airway. If breathing is inadequate or absent, provide rescue breaths and
                      be prepared for full CPR. If the person is breathing, place in the recovery
                      position and monitor continuously. Paramedics will administer naloxone (the
                      opioid reversal agent) on arrival.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Position of Responsibility:</strong> As a first
                  aider, you have a duty to treat the symptoms you find, regardless of the cause. Do
                  not judge, do not lecture, and do not refuse treatment. The casualty may be
                  someone with a medical condition that mimics intoxication (diabetes, head injury,
                  stroke), or they may genuinely be affected by drugs or alcohol. Either way, your
                  role is to preserve life and hand over to the ambulance service with a clear
                  description of what you found and what you did.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* FAQ Section */}
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

        {/* Quiz */}
        <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../first-aid-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../first-aid-module-5-section-4">
              Next: Mental Health, Communication &amp; Wellbeing
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
