import { ArrowLeft, Droplets, CheckCircle, AlertTriangle, Shield, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'fa-bleeding-arterial',
    question:
      'A casualty has a wound that is spurting bright red blood in time with their heartbeat. What type of bleeding is this?',
    options: ['Capillary bleeding', 'Venous bleeding', 'Arterial bleeding', 'Internal bleeding'],
    correctIndex: 2,
    explanation:
      'Bright red blood spurting in time with the heartbeat is arterial bleeding — the most dangerous type. Arteries carry oxygenated blood under high pressure directly from the heart, so blood loss is rapid and life-threatening without immediate intervention.',
  },
  {
    id: 'fa-tourniquet-removal',
    question:
      'Once a tourniquet has been applied to control catastrophic bleeding, who should remove it?',
    options: [
      'The first aider who applied it, after 15 minutes',
      'Any trained first aider on scene',
      'Only medical professionals (paramedics, doctors, hospital staff)',
      'The casualty themselves once the bleeding stops',
    ],
    correctIndex: 2,
    explanation:
      'NEVER remove a tourniquet once applied. Only medical professionals (paramedics, doctors, or hospital staff) should remove a tourniquet in a controlled clinical environment. Removing it in the field can cause a sudden, fatal drop in blood pressure or release toxins from damaged tissue.',
  },
  {
    id: 'fa-cabc-first-step',
    question:
      "In the C-ABC approach to major trauma, what does the first 'C' stand for and why does it come before Airway?",
    options: [
      'Circulation — because checking the pulse is always the first priority',
      'Catastrophic haemorrhage — because uncontrolled massive bleeding can kill in minutes, faster than airway obstruction',
      'Consciousness — because you must check if the casualty is alert first',
      'Cervical spine — because spinal injuries must be stabilised first',
    ],
    correctIndex: 1,
    explanation:
      'The first C stands for Catastrophic haemorrhage. In major trauma, a casualty can bleed to death from a catastrophic haemorrhage in under three minutes — faster than they would die from an obstructed airway. This is why modern trauma protocols place haemorrhage control before Airway, Breathing, and Circulation.',
  },
];

const faqs = [
  {
    question:
      'How long should I apply direct pressure before lifting the dressing to check the wound?',
    answer:
      'You should maintain continuous, firm direct pressure for at least 10 minutes without lifting the dressing to check. Lifting the dressing disrupts the clotting process and can restart bleeding. If blood soaks through, add another dressing on top of the first — do not remove the original dressing. Only after 10 minutes of sustained pressure should you assess whether the bleeding has slowed or stopped.',
  },
  {
    question: 'Are tourniquets safe for first aiders to use? I thought they caused amputations.',
    answer:
      'Modern tourniquets are safe and effective when used correctly. The old belief that tourniquets cause amputations is largely a myth — tourniquets save lives. Current UK first aid guidance (including from the Resuscitation Council UK and JRCALC) supports tourniquet use for catastrophic limb bleeding when direct pressure alone is insufficient. A properly applied tourniquet can be left in place for several hours without causing permanent damage. The risk of not applying a tourniquet to catastrophic bleeding — death from blood loss — far outweighs any risk from the tourniquet itself.',
  },
  {
    question:
      'What is the difference between a haemostatic dressing and a normal sterile dressing?',
    answer:
      'A haemostatic dressing is impregnated with clotting agents such as kaolin or chitosan that actively promote rapid blood clotting when they come into contact with blood. A normal sterile dressing simply provides a clean, absorbent barrier over the wound. Haemostatic dressings are used for severe or catastrophic bleeding where direct pressure alone is insufficient — particularly for wounds in areas where a tourniquet cannot be applied, such as the neck, groin, or armpit (junctional areas). They are now included in many high-risk workplace first aid kits.',
  },
  {
    question: "If a colleague's finger is amputated on site, should I put it directly on ice?",
    answer:
      "No — never place an amputated part directly on ice, as this causes frostbite and destroys the tissue, making replantation impossible. The correct procedure is: wrap the amputated part in damp gauze or a clean, damp cloth, place it inside a sealed plastic bag, then place that bag on or in ice (indirect cooling). Label it with the casualty's name and the time of amputation. Send it with the casualty to hospital. The best chance of successful replantation is within 6 hours, so time is critical.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which type of bleeding is characterised by dark red blood flowing steadily from the wound?',
    options: ['Arterial bleeding', 'Venous bleeding', 'Capillary bleeding', 'Internal bleeding'],
    correctAnswer: 1,
    explanation:
      'Venous bleeding produces dark red blood that flows steadily from the wound. The blood is darker because it is deoxygenated, returning to the heart via the veins. Although less immediately dramatic than arterial bleeding, venous bleeding from a large vein can still be life-threatening.',
  },
  {
    id: 2,
    question:
      'When applying direct pressure to a wound, blood soaks through the first dressing. What should you do?',
    options: [
      'Remove the soaked dressing and replace it with a fresh one',
      'Add a second dressing on top of the first and continue pressure',
      'Release the pressure and elevate the limb instead',
      'Apply a tourniquet immediately',
    ],
    correctAnswer: 1,
    explanation:
      'If blood soaks through the first dressing, add a second dressing on top — do NOT remove the original. Removing the first dressing disturbs any clots that have begun to form and can worsen the bleeding. Continue applying firm, direct pressure through both dressings.',
  },
  {
    id: 3,
    question: 'A tourniquet should be placed:',
    options: [
      'Directly over the wound',
      'Below the wound (further from the heart)',
      '5–7 cm above the wound, not over a joint',
      'Over the nearest joint above the wound',
    ],
    correctAnswer: 2,
    explanation:
      'A tourniquet must be placed 5–7 cm above the wound (between the wound and the heart) and NOT over a joint. Placing it over a joint makes it ineffective because the bones prevent adequate compression of the blood vessels.',
  },
  {
    id: 4,
    question: 'In the C-ABC approach to major trauma, what is the correct sequence?',
    options: [
      'Circulation → Airway → Breathing → Catastrophic haemorrhage',
      'Catastrophic haemorrhage → Airway → Breathing → Circulation',
      'Consciousness → Airway → Breathing → CPR',
      'Cervical spine → Airway → Breathing → Circulation',
    ],
    correctAnswer: 1,
    explanation:
      'The C-ABC sequence is: Catastrophic haemorrhage (control first), then Airway, Breathing, and Circulation. This replaces the traditional ABC in major trauma because uncontrolled catastrophic bleeding can kill faster than airway obstruction.',
  },
  {
    id: 5,
    question: 'Which of the following is a sign of internal bleeding?',
    options: [
      'Bright red blood spurting from a wound',
      'A graze that is oozing small amounts of blood',
      'Pain, tenderness, swelling, and signs of shock without visible blood loss',
      'A nosebleed that stops after 10 minutes of pressure',
    ],
    correctAnswer: 2,
    explanation:
      'Internal bleeding is not visible externally. Signs include pain, tenderness, guarding (tensing) over the affected area, swelling, bruising that develops over time, and symptoms of shock (pale, cold, clammy skin, rapid pulse, confusion) without an obvious external cause of blood loss.',
  },
  {
    id: 6,
    question: 'When treating a nosebleed, which position should the casualty adopt?',
    options: [
      'Lie flat on their back with their head tilted back',
      'Sit upright and lean forward, pinching the soft part of the nose',
      'Stand up and tilt the head as far back as possible',
      'Lie on their side in the recovery position',
    ],
    correctAnswer: 1,
    explanation:
      'The casualty should sit upright and lean forward while pinching the soft part of the nose firmly for 10–15 minutes. Leaning forward prevents blood running down the throat (which can cause nausea and vomiting). Tilting the head back is incorrect — it does not stop the bleeding and can cause the casualty to swallow or inhale blood.',
  },
  {
    id: 7,
    question: 'An amputated finger should be preserved for hospital by:',
    options: [
      'Placing it directly on ice in an open container',
      'Wrapping it in damp gauze, sealing it in a plastic bag, and placing the bag on ice',
      'Submerging it in warm water to keep the tissue alive',
      'Leaving it at room temperature and wrapping it in cling film',
    ],
    correctAnswer: 1,
    explanation:
      'The correct preservation method is: wrap in damp gauze or clean damp cloth, place in a sealed plastic bag, then place the bag on or in ice (indirect cooling). Never place directly on ice (causes frostbite damage) or in water (causes waterlogging). Send with the casualty to hospital — replantation is most successful within 6 hours.',
  },
  {
    id: 8,
    question:
      'A casualty has been struck by a heavy object and is showing signs of shock but has no visible wound. You suspect internal bleeding. What is your priority action?',
    options: [
      'Give them water to drink and keep them walking to maintain circulation',
      'Apply a tourniquet to the limb nearest the impact site',
      'Call 999, lie them flat, raise their legs (if no spinal injury), keep warm, and give nothing by mouth',
      'Sit them upright and apply cold compresses to the abdomen',
    ],
    correctAnswer: 2,
    explanation:
      'For suspected internal bleeding: call 999 immediately, lie the casualty flat, raise their legs to improve blood flow to vital organs (only if no spinal injury is suspected), keep them warm with blankets or coats, and give nothing by mouth (nil by mouth) as they may need surgery. Monitor and reassure them while waiting for the ambulance.',
  },
];

export default function FirstAidModule3Section1() {
  useSEO({
    title: 'Severe Bleeding & Haemorrhage Control | First Aid Module 3.1',
    description:
      'Types of bleeding, direct pressure, tourniquets, haemostatic dressings, catastrophic bleeding C-ABC protocol, amputations, internal bleeding, and nosebleed management for UK first aiders.',
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
            <Link to="../first-aid-module-3">
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
            <Droplets className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 3 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Severe Bleeding &amp; Haemorrhage Control
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            How to recognise, assess, and control all types of bleeding &mdash; from minor capillary
            oozing to life-threatening catastrophic haemorrhage
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Arterial:</strong> Bright red, spurting &mdash; most dangerous
              </li>
              <li>
                <strong>Direct pressure:</strong> Firm, continuous, 10+ minutes
              </li>
              <li>
                <strong>Tourniquet:</strong> 5&ndash;7 cm above wound, note the time
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>C-ABC:</strong> Catastrophic bleed first, then Airway, Breathing,
                Circulation
              </li>
              <li>
                <strong>Amputations:</strong> Damp gauze &rarr; bag &rarr; on ice (not directly)
              </li>
              <li>
                <strong>Internal:</strong> 999, lie flat, raise legs, keep warm, nil by mouth
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Identify arterial, venous, and capillary bleeding by their characteristics',
              'Apply correct direct pressure and elevation techniques',
              'Explain when and how to use haemostatic dressings',
              'Demonstrate correct tourniquet placement and documentation',
              'Apply the C-ABC approach in major trauma situations',
              'Manage amputations, internal bleeding, and nosebleeds appropriately',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Types of Bleeding */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">01</span>
            Types of Bleeding
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Understanding the type of bleeding is essential because it determines the urgency of
                your response and the techniques you need to use. There are three main types of
                external bleeding, each with distinct characteristics that you can identify
                visually.
              </p>

              <p>
                The human body contains approximately <strong>5&ndash;6 litres of blood</strong> in
                an average adult. Losing more than <strong>40%</strong> of total blood volume
                (around 2 litres) is usually fatal without immediate medical intervention. Arterial
                bleeding can reach this threshold in just a few minutes, which is why rapid
                identification and treatment is critical.
              </p>

              {/* 3-Column Bleeding Type Comparison */}
              <div className="grid sm:grid-cols-3 gap-4">
                {/* Arterial */}
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <p className="text-sm font-semibold text-red-400">Arterial</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Bright red (oxygenated) blood</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Spurts in time with the heartbeat</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>High-pressure flow &mdash; rapid blood loss</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        <strong className="text-red-300">Most dangerous</strong> &mdash; can be
                        fatal in under 3 minutes
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Requires immediate, aggressive intervention</span>
                    </li>
                  </ul>
                </div>

                {/* Venous */}
                <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full bg-purple-500" />
                    <p className="text-sm font-semibold text-purple-400">Venous</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>Dark red (deoxygenated) blood</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>Flows steadily rather than spurting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>Lower pressure than arterial</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>
                        <strong className="text-purple-300">Still life-threatening</strong> from
                        large veins
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>Responds well to direct pressure</span>
                    </li>
                  </ul>
                </div>

                {/* Capillary */}
                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <p className="text-sm font-semibold text-amber-400">Capillary</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Oozes slowly from grazes and minor wounds</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>No spurting or steady flow</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Very low pressure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        <strong className="text-amber-300">Usually stops on its own</strong> within
                        minutes
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Clean and dress to prevent infection</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Key Point</p>
                </div>
                <p className="text-sm text-white/80">
                  In practice, many wounds involve a{' '}
                  <strong className="text-white">mixture of bleeding types</strong>. A deep
                  laceration may damage arteries, veins, and capillaries simultaneously. Always
                  treat based on the{' '}
                  <strong className="text-white">most severe type of bleeding present</strong>{' '}
                  &mdash; if you see any spurting, treat it as arterial bleeding regardless of what
                  else is happening.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Direct Pressure & Elevation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">02</span>
            Direct Pressure &amp; Elevation
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Direct pressure is the{' '}
                <strong>first-line treatment for all external bleeding</strong>. It works by
                physically compressing the damaged blood vessels, slowing blood flow, and allowing
                the body&rsquo;s natural clotting mechanisms to form a seal over the wound. It is
                simple, effective, and requires no special equipment.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Direct Pressure Technique &mdash; Step by Step
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Wear Gloves If Available</p>
                      <p className="text-sm text-white/80">
                        Put on disposable gloves to protect yourself from blood-borne infections. If
                        no gloves are available, use a plastic bag, cling film, or ask the casualty
                        to apply pressure themselves if they are able.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Apply a Sterile Dressing or Clean Cloth
                      </p>
                      <p className="text-sm text-white/80">
                        Place a sterile dressing pad directly over the wound. If no sterile dressing
                        is available, use the cleanest material at hand &mdash; a clean cloth,
                        clothing, or towel. The priority is stopping the bleeding, not achieving
                        perfect sterility.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Apply Firm, Direct Pressure</p>
                      <p className="text-sm text-white/80">
                        Press firmly over the wound using the flat of your hand or fingers
                        (depending on the wound size). Use your body weight if necessary. The
                        pressure must be firm enough to compress the blood vessels beneath the
                        wound.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Maintain Pressure for at Least 10 Minutes
                      </p>
                      <p className="text-sm text-white/80">
                        Do <strong>not</strong> lift the dressing to check the wound. Continuous,
                        uninterrupted pressure is essential for clot formation. Lifting the dressing
                        disrupts the clotting process and can restart bleeding.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        If Blood Soaks Through &mdash; Add, Do Not Remove
                      </p>
                      <p className="text-sm text-white/80">
                        If blood soaks through the first dressing, place a second dressing on top of
                        the first and continue pressing. Never remove the original dressing &mdash;
                        doing so pulls away the forming clot.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Activity className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">Elevation</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Where possible, raise the injured limb{' '}
                  <strong className="text-white">above the level of the heart</strong> while
                  maintaining direct pressure. This uses gravity to reduce blood flow to the wound,
                  helping to slow the bleeding.
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Only elevate</strong> if there is no suspected
                      fracture in the injured limb
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      Elevation is an <strong>adjunct</strong> to direct pressure, not a replacement
                      for it
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      Support the limb comfortably &mdash; use pillows, blankets, or your own body
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Haemostatic Dressings */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">03</span>
            Haemostatic Dressings
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Haemostatic dressings are specialist dressings impregnated with agents that actively
                promote rapid blood clotting. They are used when direct pressure alone is not
                sufficient to control severe or catastrophic bleeding &mdash; particularly in wounds
                where a tourniquet cannot be applied, such as junctional areas (neck, groin,
                armpit).
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white mb-3">
                  <strong className="text-rose-400">How They Work:</strong>
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Kaolin-Based</p>
                    <p className="text-sm text-white/80">
                      Kaolin (a natural mineral clay) activates clotting Factor XII in the blood,
                      triggering the body&rsquo;s intrinsic clotting cascade. When the dressing
                      contacts blood, it rapidly accelerates clot formation at the wound site.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Chitosan-Based</p>
                    <p className="text-sm text-white/80">
                      Chitosan (derived from crustacean shells) carries a positive electrical charge
                      that attracts negatively charged red blood cells, causing them to bind
                      together and form a seal. Effective even in casualties taking blood-thinning
                      medication.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  How to Use a Haemostatic Dressing:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Pack the dressing into the wound cavity
                      </strong>{' '}
                      &mdash; push it firmly into the deepest point of the wound, filling the entire
                      cavity. Do not just lay it on the surface.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Apply firm direct pressure</strong> on top of
                      the packed dressing for a minimum of 3 minutes (follow manufacturer&rsquo;s
                      instructions as timing varies by product).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Do not remove</strong> the haemostatic dressing
                      once packed &mdash; leave it in place for hospital staff to manage.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      These dressings are now included in{' '}
                      <strong className="text-white">high-risk workplace first aid kits</strong> and
                      many public-access trauma kits (bleed control kits).
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Tourniquet Use */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">04</span>
            Tourniquet Use
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A tourniquet is a constricting device applied around a limb to cut off arterial
                blood flow distal to the device. It is used for{' '}
                <strong>
                  catastrophic limb bleeding that cannot be controlled by direct pressure alone
                </strong>
                . Modern commercial tourniquets (such as the CAT &mdash; Combat Application
                Tourniquet) are safe, effective, and now recommended by UK first aid guidelines for
                use by trained first aiders.
              </p>

              {/* Tourniquet Placement Diagram */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-6">
                <p className="text-sm font-medium text-rose-400 mb-4 text-center">
                  Tourniquet Placement Diagram
                </p>
                <div className="relative mx-auto max-w-md">
                  {/* Limb representation */}
                  <div className="relative">
                    {/* Upper limb (toward heart) */}
                    <div className="flex items-center justify-center mb-2">
                      <span className="text-xs text-white/50 mr-3">&uarr; Toward heart</span>
                    </div>

                    {/* Limb body */}
                    <div className="relative mx-auto w-24 sm:w-28">
                      {/* Limb shaft - upper */}
                      <div className="bg-gradient-to-b from-amber-800/40 to-amber-700/40 border border-amber-600/30 rounded-t-lg h-16 w-full" />

                      {/* Tourniquet band */}
                      <div className="relative">
                        <div className="bg-rose-500/30 border-2 border-rose-500 h-6 w-full flex items-center justify-center">
                          <span className="text-[10px] sm:text-xs font-bold text-rose-300 uppercase tracking-wider">
                            Tourniquet
                          </span>
                        </div>
                        {/* Label arrow - left */}
                        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 sm:ml-3 flex items-center gap-1">
                          <div className="w-6 sm:w-8 h-px bg-rose-400" />
                          <div className="text-xs text-rose-400 whitespace-nowrap max-w-[120px] sm:max-w-none">
                            5&ndash;7 cm above wound
                          </div>
                        </div>
                      </div>

                      {/* Gap between tourniquet and wound */}
                      <div className="bg-gradient-to-b from-amber-700/40 to-amber-700/30 border-x border-amber-600/30 h-10 w-full relative">
                        {/* Distance marker */}
                        <div className="absolute right-full top-0 bottom-0 mr-2 sm:mr-3 flex flex-col items-center justify-center">
                          <div className="h-full w-px bg-white/30 relative">
                            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-px bg-white/30" />
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-px bg-white/30" />
                          </div>
                          <span className="text-[10px] text-white/50 absolute -left-4 top-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap">
                            5&ndash;7 cm
                          </span>
                        </div>
                      </div>

                      {/* Wound area */}
                      <div className="relative">
                        <div className="bg-red-600/40 border-2 border-red-500/60 h-8 w-full flex items-center justify-center rounded-sm">
                          <span className="text-[10px] sm:text-xs font-bold text-red-300 uppercase tracking-wider">
                            Wound
                          </span>
                        </div>
                        {/* Label arrow - left */}
                        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 sm:ml-3 flex items-center gap-1">
                          <div className="w-6 sm:w-8 h-px bg-red-400" />
                          <div className="text-xs text-red-400 whitespace-nowrap">
                            Wound location
                          </div>
                        </div>
                      </div>

                      {/* Limb shaft - lower */}
                      <div className="bg-gradient-to-b from-amber-700/30 to-amber-800/20 border border-amber-600/30 rounded-b-lg h-12 w-full" />
                    </div>

                    {/* Lower limb (away from heart) */}
                    <div className="flex items-center justify-center mt-2">
                      <span className="text-xs text-white/50 mr-3">&darr; Away from heart</span>
                    </div>
                  </div>

                  {/* Note below diagram */}
                  <div className="mt-4 bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg">
                    <p className="text-xs sm:text-sm text-amber-300 text-center font-medium">
                      Write the time of application on the tourniquet or on the casualty&rsquo;s
                      forehead with a marker pen
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Tourniquet Application &mdash; Key Rules:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Apply 5&ndash;7 cm above the wound</strong>{' '}
                      (between the wound and the heart), never directly over a joint
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Tighten until the bleeding stops</strong>{' '}
                      &mdash; the tourniquet must be tight enough to occlude arterial blood flow,
                      not just venous
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Note the time of application</strong> &mdash;
                      write it on the tourniquet itself, on the casualty&rsquo;s skin (forehead is
                      traditional), or tell the ambulance crew clearly
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Apply over clothing or skin</strong> &mdash; do
                      not waste time removing clothing if the bleeding is catastrophic
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Critical Warnings</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-red-300">
                        NEVER remove a tourniquet once applied
                      </strong>{' '}
                      &mdash; only medical professionals (paramedics, doctors, hospital staff)
                      should remove it in a controlled clinical environment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      If bleeding continues despite the tourniquet, apply a{' '}
                      <strong className="text-white">second tourniquet</strong> above the first one
                      (closer to the heart)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      Tourniquets <strong className="text-white">cause pain</strong> &mdash; this is
                      expected and normal. Reassure the casualty that the pain means the tourniquet
                      is working. Do not loosen it because of complaints of pain.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Catastrophic Bleeding & C-ABC in Trauma */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">05</span>
            Catastrophic Bleeding &amp; C-ABC in Trauma
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Catastrophic bleeding is defined as{' '}
                <strong>
                  massive, uncontrolled external haemorrhage that will rapidly lead to death if not
                  immediately controlled
                </strong>
                . It is most commonly caused by traumatic amputations, deep lacerations severing
                major arteries, blast injuries, and industrial machinery accidents. On construction
                and electrical sites, catastrophic bleeding can result from contact with power
                tools, machinery entanglement, or falls onto sharp objects.
              </p>

              <p>
                Modern trauma protocols now use <strong>&lt;C&gt;ABC</strong> instead of the
                traditional ABC approach. The addition of &ldquo;C&rdquo; for Catastrophic
                haemorrhage at the start reflects the evidence that uncontrolled massive bleeding
                can kill a casualty in under three minutes &mdash; faster than an obstructed airway.
              </p>

              {/* C-ABC Step Boxes */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 text-sm font-bold flex-shrink-0">
                    C
                  </span>
                  <div className="flex-1 bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-red-400 mb-1">
                      Catastrophic Haemorrhage
                    </p>
                    <p className="text-sm text-white/80">
                      Control life-threatening external bleeding{' '}
                      <strong className="text-white">first</strong>, before anything else. Use
                      direct pressure, tourniquets, and haemostatic dressings as needed. This takes
                      absolute priority in major trauma.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-400 text-sm font-bold flex-shrink-0">
                    A
                  </span>
                  <div className="flex-1 bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-orange-400 mb-1">Airway</p>
                    <p className="text-sm text-white/80">
                      Once catastrophic bleeding is controlled, open and maintain the
                      casualty&rsquo;s airway. Use head-tilt chin-lift (or jaw thrust if spinal
                      injury is suspected). Check for and remove any visible obstructions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-400 text-sm font-bold flex-shrink-0">
                    B
                  </span>
                  <div className="flex-1 bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-blue-400 mb-1">Breathing</p>
                    <p className="text-sm text-white/80">
                      Assess breathing &mdash; look for chest rise and fall, listen for breath
                      sounds, feel for air on your cheek. If the casualty is not breathing, commence
                      CPR. If they are breathing, monitor rate and depth.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 text-sm font-bold flex-shrink-0">
                    C
                  </span>
                  <div className="flex-1 bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-purple-400 mb-1">Circulation</p>
                    <p className="text-sm text-white/80">
                      Assess circulation &mdash; check for signs of shock (pale, cold, clammy skin,
                      rapid weak pulse, confusion). Control any remaining non-catastrophic bleeding.
                      Keep the casualty warm.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Why C-ABC Replaced ABC</p>
                </div>
                <p className="text-sm text-white/80">
                  Traditional ABC (Airway, Breathing, Circulation) was developed for medical
                  emergencies. In <strong className="text-white">major trauma</strong>, military and
                  civilian evidence showed that casualties were dying from massive haemorrhage
                  before rescuers reached the &ldquo;C&rdquo; step. Adding Catastrophic haemorrhage
                  control as the very first step has significantly improved survival rates in trauma
                  incidents. This approach is now standard in UK ambulance services (JRCALC
                  guidelines) and first aid training.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Amputations, Internal Bleeding & Nosebleeds */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">06</span>
            Amputations, Internal Bleeding &amp; Nosebleeds
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              {/* Amputations */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Amputations</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Traumatic amputations can occur on electrical and construction sites from power
                  tools, machinery, or crush injuries. The immediate priorities are controlling
                  bleeding from the stump and preserving the amputated part for potential
                  replantation.
                </p>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-white mb-2">Treating the Stump:</p>
                    <ul className="text-sm text-white/80 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          Control bleeding from the stump using direct pressure and a sterile
                          dressing
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          If direct pressure is insufficient, apply a tourniquet above the
                          amputation site
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          Call 999 immediately &mdash; amputations are always a medical emergency
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          Treat for shock &mdash; lie flat, raise legs (if no spinal injury), keep
                          warm
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white mb-2">
                      Preserving the Amputated Part:
                    </p>
                    <ul className="text-sm text-white/80 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Recover the amputated part if it is safe to do so</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          Wrap in{' '}
                          <strong className="text-white">damp gauze or clean damp cloth</strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          Place inside a <strong className="text-white">sealed plastic bag</strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          Place the bag <strong className="text-white">on ice</strong> &mdash;{' '}
                          <strong className="text-red-300">NOT directly on ice</strong> (indirect
                          cooling only)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Label with the casualty&rsquo;s name and time of injury</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          Send with the casualty to hospital &mdash;{' '}
                          <strong className="text-white">
                            best chance of replantation within 6 hours
                          </strong>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Internal Bleeding */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Activity className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">Internal Bleeding</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Internal bleeding occurs when blood vessels are damaged inside the body without an
                  external wound. It is not visible but can be just as life-threatening as external
                  bleeding. Common causes on site include blunt trauma, falls from height, and crush
                  injuries.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-white mb-2">Signs &amp; Symptoms:</p>
                    <ul className="text-sm text-white/80 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Pain, tenderness, or guarding (tensing) over the affected area</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Swelling or distension of the abdomen</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Bruising that develops or worsens over time</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>
                          Signs of shock without visible blood loss (pale, cold, clammy, rapid
                          pulse, confusion, thirst)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Blood in vomit, urine, or from ears/nose after head injury</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white mb-2">Treatment:</p>
                    <ul className="text-sm text-white/80 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>
                          <strong className="text-white">Call 999</strong> immediately &mdash;
                          internal bleeding requires hospital treatment
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>
                          Lie the casualty flat and raise their legs (only if no spinal injury is
                          suspected)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Keep the casualty warm with blankets or coats</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>
                          <strong className="text-white">Nil by mouth</strong> &mdash; give nothing
                          to eat or drink as they may need emergency surgery
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>
                          Monitor consciousness, breathing, and pulse continuously while waiting for
                          the ambulance
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Nosebleeds */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Droplets className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Nosebleeds (Epistaxis)</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Nosebleeds are common and usually minor, but they require correct treatment to
                  stop effectively. On site, they can result from a blow to the face, dry air, or
                  occur spontaneously.
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Sit the casualty down and lean them forward
                      </strong>{' '}
                      &mdash; leaning forward prevents blood running down the back of the throat
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Pinch the soft part of the nose</strong> firmly
                      (just below the bony bridge) for{' '}
                      <strong className="text-white">10&ndash;15 minutes</strong> continuously
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-red-300">Do NOT tilt the head back</strong> &mdash;
                      this causes blood to run down the throat, which can cause nausea, vomiting, or
                      inhalation of blood
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      After 10 minutes, release the pressure and check whether the bleeding has
                      stopped. If not, pinch for another 10 minutes.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Advise the casualty to breathe through their mouth, spit out any blood rather
                      than swallowing it, and avoid blowing their nose for several hours afterwards
                    </span>
                  </li>
                </ul>

                <div className="mt-3 bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg">
                  <p className="text-sm text-amber-300">
                    <strong>Seek medical advice</strong> if the nosebleed lasts longer than 30
                    minutes, occurs after a head injury, the casualty is taking blood-thinning
                    medication, or nosebleeds are recurrent.
                  </p>
                </div>
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
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../first-aid-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../first-aid-module-3-section-2">
              Next: Wound Management &amp; Infection Prevention
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
