import { ArrowLeft, Thermometer, CheckCircle, AlertTriangle, Sun, Snowflake } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

/* ------------------------------------------------------------------ */
/*  Quick-check questions (3) — placed after sections 2, 4, 6         */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: 'heat-exhaustion-treatment-check',
    question:
      'A colleague on a construction site has been working in direct sun for several hours. They complain of a headache and dizziness, their skin is pale and clammy, and they are sweating heavily. What is the most appropriate first aid action?',
    options: [
      'Tell them to carry on working but drink more water',
      'Move them to a cool/shaded area, lie them down with legs raised, remove excess clothing, cool the skin, and give sips of cool water',
      'Call 999 immediately — this is heat stroke',
      'Apply ice packs directly to the chest and abdomen',
    ],
    correctIndex: 1,
    explanation:
      'These are the classic signs of heat exhaustion: headache, dizziness, pale/clammy skin, and heavy sweating. The correct treatment is to move to a cool/shaded area, lie down with legs raised, remove excess clothing, cool the skin with tepid water or damp cloths, and give sips of cool water if conscious. Monitor for 30 minutes — if they do not improve, call 999 as they may be progressing to heat stroke.',
  },
  {
    id: 'hypothermia-severity-check',
    question:
      'A casualty found outdoors in winter has stopped shivering, is increasingly drowsy, and has a slow pulse. Their core temperature is estimated at around 30\u00B0C. What severity of hypothermia does this indicate?',
    options: [
      'Mild hypothermia (35\u201332\u00B0C) — shivering is the main sign',
      'Moderate hypothermia (32\u201328\u00B0C) — shivering may stop, increasing drowsiness',
      'Severe hypothermia (<28\u00B0C) — shivering stops completely, may appear dead',
      'This is not hypothermia — the casualty is simply tired from the cold',
    ],
    correctIndex: 1,
    explanation:
      'A core temperature of approximately 30\u00B0C falls within the moderate hypothermia range (32\u201328\u00B0C). Key indicators at this stage include cessation of shivering (an ominous sign — the body has lost the ability to generate heat through shivering), increasing drowsiness, irrational behaviour, slow breathing, and a slow pulse. This casualty requires 999 to be called and careful, gentle warming.',
  },
  {
    id: 'frostbite-treatment-check',
    question:
      'A worker on a construction site has been outside in sub-zero temperatures. Their fingers are white, waxy, and numb. What is the correct first aid treatment?',
    options: [
      'Rub their hands vigorously to restore circulation',
      'Plunge their hands into hot water to rewarm quickly',
      'Warm the affected area gently using body heat (e.g. tuck hands under armpits), do not rub, do not use direct heat, and seek medical attention',
      'Apply a heat pack directly to the affected fingers',
    ],
    correctIndex: 2,
    explanation:
      'Frostbite should be rewarmed gently using body heat — for example, tucking hands under the armpits or holding fingers around a warm (not hot) mug. Do NOT rub the affected area (this damages the frozen tissue), do NOT use direct heat sources (risk of burns to numb skin), and do NOT burst any blisters that form as the tissue thaws. Seek medical attention. If there is a risk of the tissue refreezing, do not attempt to rewarm — refreezing causes significantly worse tissue damage.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQs (4)                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'Can someone have heat stroke even if they are still sweating?',
    answer:
      'Yes. Classic heat stroke (non-exertional) typically presents with hot, dry skin because the sweating mechanism has failed. However, exertional heat stroke — which occurs in people doing strenuous physical work in hot conditions, such as construction workers — can present with profuse sweating. The key distinguishing features of heat stroke are confusion, altered consciousness, and a core temperature above 40\u00B0C, regardless of whether sweating is present. If a worker is confused, aggressive, or disoriented in a hot environment, treat as heat stroke and call 999 immediately.',
  },
  {
    question: 'Why should you NOT give alcohol to a hypothermic casualty?',
    answer:
      'Alcohol causes vasodilation — it widens the blood vessels near the skin surface. This has two dangerous effects in hypothermia: firstly, it increases heat loss from the body by bringing warm blood to the cold skin surface, further dropping the core temperature. Secondly, it can cause a false sensation of warmth, leading the casualty to believe they are recovering when they are actually getting worse. Alcohol also impairs judgement and coordination, making the casualty less likely to recognise their own deterioration. Warm, non-alcoholic, non-caffeinated drinks are appropriate for a conscious hypothermic casualty.',
  },
  {
    question: "What is 'afterdrop' and why is it dangerous?",
    answer:
      'Afterdrop is a phenomenon where the core body temperature continues to fall even after the casualty has been removed from the cold environment. It occurs because cold blood from the extremities returns to the core when circulation improves. This is why rapid external warming (such as placing a hypothermic casualty directly next to a heater or in a hot bath) is dangerous — it causes peripheral vasodilation, increasing blood flow from the cold extremities to the core and potentially triggering a further drop in core temperature. This sudden further cooling of the heart can trigger fatal cardiac arrhythmias. Gradual, gentle warming with blankets and warm drinks is much safer.',
  },
  {
    question: 'What PPE adjustments should be made for workers in extreme heat?',
    answer:
      'Full PPE in hot conditions significantly increases the risk of heat illness because it traps heat and prevents sweat evaporation. Employers should consider: scheduling heavy work for cooler parts of the day (early morning, late afternoon), providing frequent rest breaks in shaded or air-conditioned areas, ensuring cool drinking water is readily accessible at all times, adjusting work/rest cycles based on the temperature and humidity, allowing removal of non-essential PPE layers during rest breaks, using cooling vests or neck wraps where practical, and monitoring workers for early signs of heat exhaustion. Under CDM 2015, the principal contractor must ensure adequate welfare facilities including shade and cool water.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (8)                                                 */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      'Which of the following is the KEY difference between heat exhaustion and heat stroke?',
    options: [
      'Heat exhaustion causes sweating; heat stroke never causes sweating',
      'Heat exhaustion involves confusion and altered consciousness; heat stroke does not',
      'Heat stroke involves confusion, altered consciousness, and a core temperature above 40\u00B0C — it is always a medical emergency',
      'There is no significant difference — they are different names for the same condition',
    ],
    correctAnswer: 2,
    explanation:
      'The critical distinction is that heat stroke involves confusion, disorientation, altered consciousness, and a core temperature exceeding 40\u00B0C. Heat stroke is ALWAYS a medical emergency requiring immediate 999 and rapid cooling. Heat exhaustion, while serious, typically responds to basic cooling measures and does not involve significant confusion or altered consciousness. Note that both conditions can involve sweating — exertional heat stroke in particular may present with profuse sweating.',
  },
  {
    id: 2,
    question:
      'A casualty with suspected heat stroke is conscious but confused. While waiting for the ambulance, what is the priority action?',
    options: [
      'Give them paracetamol to reduce their temperature',
      'Rapid cooling — remove clothing, apply cold water, cold packs to neck/armpits/groin, and fan the casualty',
      'Keep them warm with a blanket to prevent shock',
      'Sit them upright and give them hot tea',
    ],
    correctAnswer: 1,
    explanation:
      'Rapid cooling is the single most important intervention for heat stroke. Every minute of delay in cooling increases mortality. Remove clothing, apply cold water (immersion if possible), place cold packs against the neck, armpits, and groin (where large blood vessels are close to the surface), and use a fan to increase evaporative cooling. Do NOT give paracetamol — heat stroke is not caused by the same mechanism as a fever and paracetamol is ineffective. Do NOT give hot drinks or wrap in blankets.',
  },
  {
    id: 3,
    question:
      'A casualty with heat exhaustion has been resting in the shade, drinking water, and being cooled with damp cloths for 40 minutes. They are not improving and are becoming more confused. What should you do?',
    options: [
      'Continue the same treatment — it can take up to 2 hours to recover',
      'Call 999 — failure to improve within 30 minutes suggests progression to heat stroke',
      'Give them an energy drink instead of water',
      'Move them back into the sun to help them acclimatise',
    ],
    correctAnswer: 1,
    explanation:
      'Heat exhaustion should improve within 30 minutes of appropriate treatment (shade, cooling, fluids). If the casualty is NOT improving within 30 minutes, or is getting worse (especially if confusion develops), this suggests progression to heat stroke. Call 999 immediately. Increasing confusion is a particularly concerning sign as it indicates the brain is being affected by the elevated temperature.',
  },
  {
    id: 4,
    question: 'At what core body temperature is hypothermia defined?',
    options: ['Below 37\u00B0C', 'Below 36\u00B0C', 'Below 35\u00B0C', 'Below 32\u00B0C'],
    correctAnswer: 2,
    explanation:
      'Hypothermia is defined as a core body temperature below 35\u00B0C. Normal body temperature is approximately 37\u00B0C. Hypothermia is classified as mild (35\u201332\u00B0C), moderate (32\u201328\u00B0C), and severe (below 28\u00B0C). Each stage has progressively more dangerous symptoms, with severe hypothermia carrying a significant risk of cardiac arrest.',
  },
  {
    id: 5,
    question:
      'Why is the cessation of shivering in a hypothermic casualty considered an ominous sign?',
    options: [
      'It means the casualty is warming up and no longer needs to shiver',
      'It indicates the body has exhausted its ability to generate heat — hypothermia is progressing to moderate or severe',
      'It means the casualty has warmed their muscles sufficiently',
      'Shivering always stops naturally after 10 minutes regardless of temperature',
    ],
    correctAnswer: 1,
    explanation:
      "Shivering is the body's primary mechanism for generating heat when cold. When shivering stops in a hypothermic casualty, it means the body has exhausted its ability to generate heat through muscle contractions. This indicates progression from mild to moderate hypothermia and is an ominous sign of deterioration. The casualty will continue to cool and, without intervention, will progress to severe hypothermia with risk of cardiac arrest.",
  },
  {
    id: 6,
    question:
      'Why should you NOT apply direct heat (hot water bottles on bare skin, sitting close to a heater) to a hypothermic casualty?',
    options: [
      'It will burn their skin because they cannot feel the heat',
      'Rapid external warming causes peripheral vasodilation, leading to afterdrop — cold blood from the extremities rushes to the core, further dropping core temperature and risking cardiac arrest',
      'Direct heat has no effect on hypothermia',
      'It will cause the casualty to sweat, making them colder',
    ],
    correctAnswer: 1,
    explanation:
      "Applying direct heat to a hypothermic casualty causes peripheral vasodilation — the blood vessels near the skin open up, increasing blood flow from the cold extremities to the warm core. This cold blood returning to the core causes 'afterdrop' — a further drop in core temperature that can trigger fatal cardiac arrhythmias. Gradual warming with blankets, dry clothing, and warm drinks (if conscious) is safer because it allows the body to warm evenly without sudden circulatory changes.",
  },
  {
    id: 7,
    question:
      'A worker with frostbitten fingers has been brought indoors. The fingers are white, waxy, and numb. There is a risk they may need to go back outside before rescue arrives. Should you rewarm the fingers?',
    options: [
      'Yes — always rewarm frostbite as quickly as possible',
      'No — do NOT rewarm if there is a risk of refreezing, as refreezing causes significantly worse tissue damage',
      'Yes — but only using hot water above 40\u00B0C',
      'It does not matter — frostbite damage is permanent regardless of treatment',
    ],
    correctAnswer: 1,
    explanation:
      'If there is any risk that the frostbitten tissue may refreeze, you should NOT attempt to rewarm it. Refreezing after thawing causes dramatically worse tissue damage than leaving the tissue frozen. It is better to keep the tissue frozen and get the casualty to definitive medical care where controlled rewarming can take place in a safe environment. Only rewarm frostbite if you are certain the tissue will remain warm once thawed.',
  },
  {
    id: 8,
    question:
      'On a construction site in summer, which of the following is the most effective strategy for preventing heat illness?',
    options: [
      'Providing salt tablets to all workers at the start of the shift',
      'Scheduling heavy work during the coolest parts of the day, providing frequent rest breaks in shade, ensuring cool water is readily available, and monitoring workers for early signs',
      'Telling workers to remove all PPE during hot weather',
      'Providing energy drinks instead of water to replace electrolytes',
    ],
    correctAnswer: 1,
    explanation:
      'The most effective prevention strategy combines multiple measures: scheduling heavy or physically demanding work for cooler parts of the day (early morning, late afternoon), providing frequent rest breaks in shaded or cool areas, ensuring cool drinking water is readily available at all times, adjusting work/rest cycles, and actively monitoring workers for early signs of heat exhaustion. Salt tablets are not recommended as standard practice. PPE should not be removed where it is required for safety — instead, work patterns should be adjusted. Water is the best fluid for hydration in most circumstances.',
  },
];

/* ------------------------------------------------------------------ */
/*  Border colours for alternating sections                            */
/* ------------------------------------------------------------------ */
const borderColours = [
  'border-rose-500/50',
  'border-blue-500/50',
  'border-green-500/50',
  'border-purple-500/50',
  'border-cyan-500/50',
  'border-amber-500/50',
];

const numColours = [
  'text-rose-400/80',
  'text-blue-400/80',
  'text-green-400/80',
  'text-purple-400/80',
  'text-cyan-400/80',
  'text-amber-400/80',
];

const headingColours = [
  'text-rose-300',
  'text-blue-300',
  'text-green-300',
  'text-purple-300',
  'text-cyan-300',
  'text-amber-300',
];

/* ================================================================== */
/*  Component                                                          */
/* ================================================================== */
const FirstAidModule4Section4 = () => {
  useSEO({
    title: 'Heat Exhaustion, Heat Stroke & Hypothermia | First Aid Module 4 Section 4',
    description:
      'Heat exhaustion recognition and treatment, heat stroke emergency management, hypothermia severity stages and rewarming, frostbite first aid, and construction site considerations for temperature extremes.',
  });

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* -- Header ------------------------------------------------- */}
      <div className="border-b border-white/10 bg-[#1a1a1a]/95 sticky top-0 z-50 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../first-aid-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* -- Main Content ------------------------------------------- */}
      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Centred Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <Thermometer className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 4 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Heat Exhaustion, Heat Stroke &amp; Hypothermia
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Recognising and treating temperature-related emergencies &mdash; from overheating on
            summer sites to hypothermia during winter outdoor work
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <div className="flex items-center gap-2 mb-2">
              <Sun className="h-5 w-5 text-amber-400" />
              <p className="text-amber-400 text-base font-medium">Heat Emergencies</p>
            </div>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Heat exhaustion:</strong> Body overheating &mdash; sweating, pale, clammy
              </li>
              <li>
                <strong>Heat stroke:</strong> Temperature regulation fails &mdash; confusion,
                &gt;40&deg;C
              </li>
              <li>
                <strong>Heat stroke = 999:</strong> Rapid cooling is critical
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <div className="flex items-center gap-2 mb-2">
              <Snowflake className="h-5 w-5 text-blue-400" />
              <p className="text-blue-400 text-base font-medium">Cold Emergencies</p>
            </div>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Hypothermia:</strong> Core temp &lt;35&deg;C &mdash; shivering, confusion,
                drowsiness
              </li>
              <li>
                <strong>Frostbite:</strong> Frozen tissue &mdash; numbness, waxy skin
              </li>
              <li>
                <strong>Warm gently:</strong> Do NOT use direct heat or rub limbs
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-rose-400" />
            Learning Outcomes
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Recognise the signs and symptoms of heat exhaustion and provide appropriate first aid treatment',
              'Distinguish between heat exhaustion and heat stroke, and explain why heat stroke is a medical emergency',
              'Classify hypothermia by severity (mild, moderate, severe) and describe the treatment for each stage',
              'Explain the dangers of afterdrop and why direct heat must not be applied to a hypothermic casualty',
              'Recognise and treat frostbite, including when NOT to rewarm frozen tissue',
              'Apply temperature-related safety measures to construction site scenarios including PPE considerations',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* -------------------------------------------------------- */}
        {/* SECTION 01 — Heat Exhaustion                              */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className={`${numColours[0]} text-sm font-normal`}>01</span>
            Heat Exhaustion
          </h2>
          <div className={`border-l-2 ${borderColours[0]} pl-4 sm:pl-6`}>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Heat exhaustion occurs when the body overheats, usually as a result of prolonged
                exposure to high temperatures or strenuous physical activity in hot conditions. It
                is not immediately life-threatening if treated promptly, but if left untreated it
                can progress to heat stroke, which is a medical emergency.
              </p>

              <div className="bg-white/5 border border-rose-400/30 p-4 rounded-lg">
                <h3 className={`${headingColours[0]} font-medium mb-3`}>Causes</h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    'Hot environment — direct sunlight, enclosed spaces, poor ventilation',
                    'Strenuous physical work — digging, lifting, carrying materials',
                    'Dehydration — insufficient fluid intake during hot weather',
                    'Heavy PPE/clothing — trapping heat and preventing sweat evaporation',
                    'Poor ventilation — working in confined spaces or enclosed areas',
                    'Lack of acclimatisation — workers new to hot conditions or returning after time off',
                  ].map((cause, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0" />
                      <span className="text-white/80">{cause}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-300 font-medium mb-3">Recognition</h3>
                <p className="text-white/60 text-sm mb-3">
                  A casualty suffering from heat exhaustion may display some or all of the following
                  signs and symptoms:
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    'Headache',
                    'Dizziness and lightheadedness',
                    'Nausea and possible vomiting',
                    'Heavy sweating',
                    'Pale, cool, clammy skin',
                    'Muscle cramps (especially legs, abdomen)',
                    'Fast, weak pulse',
                    'Fatigue and weakness',
                    'Intense thirst',
                    'Dark-coloured urine (sign of dehydration)',
                  ].map((sign, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span className="text-white/80">{sign}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-rose-500/30 p-4 rounded-lg">
                <h3 className="text-rose-300 font-medium mb-3">Treatment</h3>
                <ul className="text-white space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      1
                    </span>
                    <span>
                      <strong>Move to a cool or shaded area</strong> &mdash; indoors with air
                      conditioning is ideal, otherwise any shaded spot away from direct sunlight
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      2
                    </span>
                    <span>
                      <strong>Lie the casualty down with legs raised</strong> &mdash; this helps
                      blood return to the vital organs
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      3
                    </span>
                    <span>
                      <strong>Remove excess clothing</strong> &mdash; take off heavy PPE, hi-vis,
                      overalls, boots. Loosen any tight clothing around the neck and waist
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      4
                    </span>
                    <span>
                      <strong>Cool the skin with tepid water, damp cloths, or a fan</strong> &mdash;
                      sponge or spray the skin with cool (not ice cold) water and fan them to
                      increase evaporative cooling
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      5
                    </span>
                    <span>
                      <strong>Give sips of cool water</strong> (if conscious and able to swallow)
                      &mdash; small, frequent sips rather than large gulps
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      6
                    </span>
                    <span>
                      <strong>Monitor closely</strong> &mdash; the casualty should begin to improve
                      within 30 minutes with appropriate treatment
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">If NOT Improving Within 30 Minutes</h3>
                </div>
                <p className="text-white/80 text-sm">
                  If the casualty does not improve within 30 minutes of starting treatment, or if
                  they deteriorate (especially developing confusion or altered consciousness),{' '}
                  <strong className="text-white">call 999 immediately</strong>. They may be
                  progressing to heat stroke, which is a life-threatening emergency. Do not wait
                  &mdash; early escalation saves lives.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/* SECTION 02 — Heat Stroke                                  */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className={`${numColours[1]} text-sm font-normal`}>02</span>
            Heat Stroke &mdash; A Medical Emergency
          </h2>
          <div className={`border-l-2 ${borderColours[1]} pl-4 sm:pl-6`}>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Heat stroke is a life-threatening medical emergency that occurs when the
                body&rsquo;s temperature regulation system fails completely. The core body
                temperature exceeds 40&deg;C, and without rapid cooling, the brain, heart, kidneys,
                and muscles suffer progressive damage. Delay in treatment significantly increases
                mortality.
              </p>

              <div className="bg-white/5 border border-blue-400/30 p-4 rounded-lg">
                <h3 className={`${headingColours[1]} font-medium mb-3`}>Recognition</h3>
                <p className="text-white/60 text-sm mb-3">
                  Heat stroke may develop from worsening heat exhaustion or present suddenly. Key
                  signs include:
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    'Hot, dry skin (sweating may have stopped) — OR profuse sweating in exertional heat stroke',
                    'Confusion, disorientation, or aggressive/irrational behaviour',
                    'Severe headache',
                    'Rapid, strong (bounding) pulse',
                    'Rapid, shallow breathing',
                    'Core temperature above 40\u00B0C',
                    'Seizures (fits)',
                    'Loss of consciousness',
                    'Skin may appear red or flushed',
                    'Nausea and vomiting',
                  ].map((sign, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span className="text-white/80">{sign}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    Treatment &mdash; Call 999 Immediately
                  </h3>
                </div>
                <ul className="text-white space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      1
                    </span>
                    <span>
                      <strong>Call 999 immediately</strong> &mdash; heat stroke requires hospital
                      treatment. Do not delay this step
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      2
                    </span>
                    <span>
                      <strong>Move to the coolest area possible</strong> &mdash; air-conditioned
                      room, deep shade, or indoors
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      3
                    </span>
                    <span>
                      <strong>Remove clothing</strong> &mdash; strip to underwear to maximise skin
                      exposure for cooling
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      4
                    </span>
                    <span>
                      <strong>Rapid cooling by any available means:</strong>
                    </span>
                  </li>
                </ul>
                <div className="ml-10 mt-2 space-y-1 text-sm text-white/80">
                  <p>&bull; Cold water immersion if possible (most effective method)</p>
                  <p>
                    &bull; Cold/ice packs to the neck, armpits, and groin (large blood vessels near
                    the surface)
                  </p>
                  <p>&bull; Wet sheets or towels over the body, fanned continuously</p>
                  <p>&bull; Spray or sponge with cold water and fan vigorously</p>
                  <p>
                    &bull; Any cold fluid &mdash; pour water over them if nothing else is available
                  </p>
                </div>
                <ul className="text-white space-y-3 text-sm mt-3">
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      5
                    </span>
                    <span>
                      <strong>Monitor temperature</strong> if a thermometer is available &mdash;
                      continue cooling until below 38&deg;C or until the ambulance arrives
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      6
                    </span>
                    <span>
                      <strong>Be prepared for CPR</strong> &mdash; heat stroke can cause cardiac
                      arrest. If the casualty becomes unresponsive and stops breathing normally,
                      start CPR immediately
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-rose-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-rose-400">Why Rapid Cooling Is Critical</h3>
                <p className="text-white/80 text-sm">
                  Every minute of elevated core temperature above 40&deg;C causes progressive damage
                  to the brain and internal organs. Studies show that cooling within 30 minutes of
                  collapse reduces mortality from heat stroke to near zero, while delays beyond this
                  time increase mortality significantly. On a construction site, where ambulance
                  access may take time, starting cooling immediately with whatever is available can
                  be the difference between life and death.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* -------------------------------------------------------- */}
        {/* SECTION 03 — Heat Exhaustion vs Heat Stroke Comparison    */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className={`${numColours[2]} text-sm font-normal`}>03</span>
            Heat Exhaustion vs Heat Stroke &mdash; Comparison
          </h2>
          <div className={`border-l-2 ${borderColours[2]} pl-4 sm:pl-6`}>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                It is essential to distinguish between heat exhaustion and heat stroke, as the
                management is different and heat stroke requires immediate emergency treatment. The
                following comparison highlights the key differences.
              </p>

              {/* 2-column comparison grid: amber vs red */}
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Heat Exhaustion — amber */}
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Sun className="h-5 w-5 text-amber-400" />
                    <h3 className="font-semibold text-amber-300 text-base">Heat Exhaustion</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-white/80">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Skin:</strong> Pale, cool, clammy &mdash;
                        sweating heavily
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Temperature:</strong> Below 40&deg;C
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Consciousness:</strong> Alert, may feel dizzy
                        or faint but orientated
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Pulse:</strong> Fast, weak
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Response:</strong> Usually responds to
                        cooling within 30 minutes
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Emergency?</strong> Usually NOT an emergency
                        if treated promptly
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Heat Stroke — red */}
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <h3 className="font-semibold text-red-300 text-base">Heat Stroke</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-white/80">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Skin:</strong> Hot, dry (OR profuse sweating
                        in exertional) &mdash; red/flushed
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Temperature:</strong> Above 40&deg;C
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Consciousness:</strong> Confused,
                        disoriented, aggressive, or unconscious
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Pulse:</strong> Rapid, strong (bounding)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Response:</strong> Does NOT respond to simple
                        cooling measures
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Emergency?</strong> ALWAYS an emergency
                        &mdash; call 999 immediately
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    When in Doubt &mdash; Treat as Heat Stroke
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  If you are unsure whether a casualty has heat exhaustion or heat stroke, always
                  treat as heat stroke. Start rapid cooling and call 999. It is far better to
                  over-treat heat exhaustion than to under-treat heat stroke. The presence of
                  confusion or altered consciousness should always be treated as heat stroke until
                  proven otherwise.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/* SECTION 04 — Hypothermia                                  */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className={`${numColours[3]} text-sm font-normal`}>04</span>
            Hypothermia
          </h2>
          <div className={`border-l-2 ${borderColours[3]} pl-4 sm:pl-6`}>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Hypothermia occurs when the core body temperature drops below 35&deg;C. Normal body
                temperature is approximately 37&deg;C. As the core temperature falls, the
                body&rsquo;s functions slow progressively, and without treatment, hypothermia can be
                fatal. Construction workers are at particular risk during winter months when working
                outdoors in cold, wet, or windy conditions.
              </p>

              <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                <h3 className={`${headingColours[3]} font-medium mb-3`}>Causes</h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    'Cold environment — outdoor work in winter, unheated buildings',
                    'Wet clothing — rain, sweat, or water exposure',
                    'Immersion in cold water — falls into water on site',
                    'Prolonged exposure — extended periods in cold without adequate breaks',
                    'Outdoor work in winter — especially in wind and rain',
                    'Inadequate clothing — insufficient layers or waterproofing',
                    'Elderly or very young casualties — less efficient temperature regulation',
                    'Alcohol consumption — causes vasodilation and impaired judgement',
                    'Certain medications — some drugs impair the body\u2019s thermoregulation',
                    'Exhaustion — tired workers generate less body heat',
                  ].map((cause, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                      <span className="text-white/80">{cause}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hypothermia severity scale — 3 coloured boxes */}
              <div className="space-y-4">
                <h3 className="text-purple-300 font-medium">Hypothermia Severity Scale</h3>

                {/* Mild — blue */}
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center">
                      <span className="text-blue-400 text-xs font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="text-blue-300 font-semibold text-sm">Mild Hypothermia</h4>
                      <span className="text-blue-400/70 text-xs">35&deg;C &ndash; 32&deg;C</span>
                    </div>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>
                        Shivering (the body&rsquo;s primary mechanism for generating heat)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Cold, pale skin with goosebumps</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Fast breathing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Tiredness and fatigue</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Mild confusion and poor coordination</span>
                    </li>
                  </ul>
                </div>

                {/* Moderate — indigo */}
                <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center">
                      <span className="text-indigo-400 text-xs font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="text-indigo-300 font-semibold text-sm">
                        Moderate Hypothermia
                      </h4>
                      <span className="text-indigo-400/70 text-xs">32&deg;C &ndash; 28&deg;C</span>
                    </div>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-indigo-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Shivering may stop</strong> &mdash; this is
                        an ominous sign indicating the body has exhausted its ability to generate
                        heat
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-indigo-400 flex-shrink-0" />
                      <span>Increasing drowsiness and lethargy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-indigo-400 flex-shrink-0" />
                      <span>Irrational behaviour and confusion</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-indigo-400 flex-shrink-0" />
                      <span>Slow, shallow breathing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-indigo-400 flex-shrink-0" />
                      <span>Slow, weak pulse</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-indigo-400 flex-shrink-0" />
                      <span>Slurred speech, loss of coordination</span>
                    </li>
                  </ul>
                </div>

                {/* Severe — purple */}
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
                      <span className="text-purple-400 text-xs font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="text-purple-300 font-semibold text-sm">Severe Hypothermia</h4>
                      <span className="text-purple-400/70 text-xs">Below 28&deg;C</span>
                    </div>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Shivering stops completely</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>Very slow, barely detectable pulse</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>
                        The casualty may <strong className="text-white">appear dead</strong> &mdash;
                        but do NOT assume death until the casualty has been rewarmed and assessed in
                        hospital
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>Loss of consciousness</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Significant risk of cardiac arrest</strong>{' '}
                        &mdash; the hypothermic heart is extremely irritable
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Treatment */}
              <div className="bg-white/5 border border-purple-500/30 p-4 rounded-lg">
                <h3 className="text-purple-300 font-medium mb-3">Treatment</h3>
                <ul className="text-white space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      1
                    </span>
                    <span>
                      <strong>Move to shelter or a warm environment if possible</strong> &mdash;
                      handle the casualty gently (rough handling can trigger cardiac arrhythmia in a
                      hypothermic heart)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      2
                    </span>
                    <span>
                      <strong>Remove wet clothing</strong> and replace with dry clothing if
                      available
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      3
                    </span>
                    <span>
                      <strong>Wrap in blankets, a sleeping bag, or a foil blanket</strong> &mdash;
                      use layers to trap warmth. Cover the head as significant heat is lost from the
                      head
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      4
                    </span>
                    <span>
                      <strong>If conscious:</strong> give warm drinks (NOT alcohol, NOT caffeine)
                      &mdash; warm water, warm squash, or warm milk are appropriate
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      5
                    </span>
                    <span>
                      <strong>If unconscious and breathing:</strong> place in the recovery position
                      and continue warming
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      6
                    </span>
                    <span>
                      <strong>Call 999 for moderate or severe hypothermia</strong> &mdash; any
                      casualty who has stopped shivering, is confused, drowsy, or unresponsive
                      requires emergency medical treatment
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck after Section 04 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* -------------------------------------------------------- */}
        {/* SECTION 05 — Do NOT Warnings (Heat Stroke & Hypothermia) */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className={`${numColours[4]} text-sm font-normal`}>05</span>
            Critical &ldquo;Do NOT&rdquo; Warnings
          </h2>
          <div className={`border-l-2 ${borderColours[4]} pl-4 sm:pl-6`}>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Incorrect treatment of temperature-related emergencies can worsen the
                casualty&rsquo;s condition or even cause death. The following actions must be
                avoided.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">Hypothermia &mdash; Do NOT</h3>
                </div>
                <ul className="text-white space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-400 text-xs font-bold">&times;</span>
                    </div>
                    <div>
                      <strong>Do NOT apply direct heat</strong> (hot water bottles directly on skin,
                      sitting right next to a heater, hot bath) &mdash; this causes peripheral
                      vasodilation, leading to <strong>afterdrop</strong>: cold blood from the
                      extremities rushes to the core, further dropping core temperature and
                      potentially causing cardiac arrest
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-400 text-xs font-bold">&times;</span>
                    </div>
                    <div>
                      <strong>Do NOT rub limbs vigorously</strong> &mdash; this can damage frozen
                      tissue and force cold blood back to the core, worsening afterdrop
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-400 text-xs font-bold">&times;</span>
                    </div>
                    <div>
                      <strong>Do NOT give alcohol</strong> &mdash; alcohol causes vasodilation
                      (increasing heat loss from the body), creates a false sense of warmth, and
                      impairs judgement
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-400 text-xs font-bold">&times;</span>
                    </div>
                    <div>
                      <strong>Do NOT handle roughly</strong> &mdash; the hypothermic heart is
                      irritable and prone to arrhythmia with sudden movements or rough handling.
                      Move the casualty gently and avoid unnecessary jostling
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-400 text-xs font-bold">&times;</span>
                    </div>
                    <div>
                      <strong>Do NOT assume the casualty is dead</strong> &mdash; severely
                      hypothermic casualties can appear dead (very slow pulse, minimal breathing).
                      The medical maxim is: &ldquo;Nobody is dead until they are warm and
                      dead.&rdquo; Continue CPR and warming until emergency services take over
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-amber-300">Heat Stroke &mdash; Do NOT</h3>
                </div>
                <ul className="text-white space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-400 text-xs font-bold">&times;</span>
                    </div>
                    <div>
                      <strong>Do NOT delay cooling</strong> &mdash; every minute of elevated core
                      temperature increases organ damage and mortality. Start cooling immediately
                      with whatever is available
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-400 text-xs font-bold">&times;</span>
                    </div>
                    <div>
                      <strong>Do NOT give paracetamol or ibuprofen</strong> &mdash; heat stroke is
                      not caused by the same mechanism as a fever and these medications are
                      ineffective. They may also cause harm to an already compromised liver and
                      kidneys
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-400 text-xs font-bold">&times;</span>
                    </div>
                    <div>
                      <strong>Do NOT give fluids to a confused or unconscious casualty</strong>{' '}
                      &mdash; they cannot swallow safely and may choke or aspirate fluid into the
                      lungs
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-400 text-xs font-bold">&times;</span>
                    </div>
                    <div>
                      <strong>Do NOT wrap in blankets or give hot drinks</strong> &mdash; this traps
                      heat and worsens the condition. The casualty needs to be cooled, not warmed
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-cyan-400/30 p-4 rounded-lg">
                <h3 className={`${headingColours[4]} font-medium mb-2`}>Understanding Afterdrop</h3>
                <p className="text-white/80 text-sm mb-3">
                  Afterdrop is the phenomenon where core body temperature continues to fall even
                  after the casualty has been removed from the cold. It occurs because:
                </p>
                <ul className="text-white/80 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      1
                    </span>
                    <span>
                      When the body is cold, blood vessels in the extremities constrict
                      (vasoconstriction) to preserve heat in the core
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      2
                    </span>
                    <span>
                      If direct heat is applied to the skin, these vessels dilate (vasodilation),
                      allowing cold blood from the extremities to flow back to the core
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      3
                    </span>
                    <span>
                      This cold blood reaching the heart can cause a further drop in core
                      temperature and trigger fatal cardiac arrhythmias (particularly ventricular
                      fibrillation)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      4
                    </span>
                    <span>
                      <strong className="text-white">
                        This is why gradual, gentle warming with blankets is safer
                      </strong>{' '}
                      &mdash; it allows the body to warm evenly without sudden circulatory changes
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/* SECTION 06 — Frostbite & Construction Site Considerations */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className={`${numColours[5]} text-sm font-normal`}>06</span>
            Frostbite &amp; Construction Site Considerations
          </h2>
          <div className={`border-l-2 ${borderColours[5]} pl-4 sm:pl-6`}>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Frostbite is the freezing of body tissues, usually affecting the extremities &mdash;
                fingers, toes, ears, and nose. These areas are most vulnerable because they have a
                large surface area relative to their volume and are furthest from the body&rsquo;s
                core. Outdoor workers in winter, particularly those handling cold metal tools or
                materials, are at increased risk.
              </p>

              <div className="bg-white/5 border border-amber-400/30 p-4 rounded-lg">
                <h3 className={`${headingColours[5]} font-medium mb-3`}>Recognition</h3>
                <p className="text-white/60 text-sm mb-3">
                  Frostbite develops progressively through the following stages:
                </p>
                <ul className="text-white space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-amber-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      1
                    </span>
                    <span>
                      <strong>Pins and needles</strong> &mdash; tingling sensation in the affected
                      area, the first warning sign
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      2
                    </span>
                    <span>
                      <strong>Numbness</strong> &mdash; loss of sensation in the affected area. The
                      casualty may not be aware of the severity
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      3
                    </span>
                    <span>
                      <strong>Hard, waxy, pale skin</strong> &mdash; the tissue feels solid to the
                      touch and appears white or greyish-yellow
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      4
                    </span>
                    <span>
                      <strong>Blistering as tissue thaws</strong> &mdash; when the frozen tissue
                      begins to rewarm, fluid-filled blisters may form. Do NOT burst these blisters
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-amber-500/30 p-4 rounded-lg">
                <h3 className="text-amber-300 font-medium mb-3">Treatment</h3>
                <ul className="text-white space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-amber-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      1
                    </span>
                    <span>
                      <strong>Remove the casualty from the cold environment</strong> &mdash; move
                      indoors or to shelter
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      2
                    </span>
                    <span>
                      <strong>Warm the affected area gently using body heat</strong> &mdash; tuck
                      hands under armpits, hold fingers around a warm (not hot) mug, cup hands over
                      ears
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      3
                    </span>
                    <span>
                      <strong>Do NOT rub</strong> the affected area &mdash; rubbing damages the
                      frozen tissue cells
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      4
                    </span>
                    <span>
                      <strong>Do NOT use direct heat</strong> (hot water, heater, hairdryer) &mdash;
                      the numb skin cannot feel the heat and burns easily
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      5
                    </span>
                    <span>
                      <strong>Do NOT burst blisters</strong> that form as the tissue thaws &mdash;
                      blisters provide a sterile covering over the damaged tissue
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      6
                    </span>
                    <span>
                      <strong>Seek medical attention</strong> &mdash; frostbite can cause permanent
                      tissue damage and may require specialist treatment
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    Do NOT Rewarm If Risk of Refreezing
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  If there is any possibility that the frostbitten tissue may refreeze (for example,
                  if the casualty may need to go back outside before rescue arrives), do NOT attempt
                  to rewarm it. Refreezing after thawing causes dramatically worse tissue damage
                  than leaving the tissue frozen. It is better to keep the tissue frozen and
                  transport the casualty to definitive medical care where controlled rewarming can
                  take place safely.
                </p>
              </div>

              {/* Construction site considerations */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-amber-300 font-medium mb-4">
                  Construction Site Considerations
                </h3>

                <div className="space-y-4">
                  {/* Summer */}
                  <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Sun className="h-5 w-5 text-amber-400" />
                      <h4 className="text-amber-300 font-semibold text-sm">
                        Summer &mdash; Preventing Heat Illness
                      </h4>
                    </div>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>
                          Schedule heavy work during the coolest parts of the day (early morning,
                          late afternoon)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>
                          Provide scheduled rest breaks in shaded areas with cool water readily
                          available
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>
                          Adjust work patterns to avoid prolonged exposure to direct midday sun
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>
                          Monitor colleagues for early signs of heat exhaustion &mdash; buddy system
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>
                          <strong className="text-white">PPE and heat stress:</strong> Full PPE in
                          summer can accelerate heat illness &mdash; adjust work/rest cycles
                          accordingly. Consider lighter materials where safety permits
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Winter */}
                  <div className="bg-blue-500/5 border border-blue-500/20 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Snowflake className="h-5 w-5 text-blue-400" />
                      <h4 className="text-blue-300 font-semibold text-sm">
                        Winter &mdash; Preventing Cold Injury
                      </h4>
                    </div>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>
                          Appropriate clothing layers &mdash; base layer (wicking), insulating
                          layer, waterproof outer layer
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>
                          Provide warm rest areas with hot drinks &mdash; CDM 2015 requires adequate
                          heated welfare facilities
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>
                          Buddy system &mdash; workers should monitor each other for signs of
                          hypothermia
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>
                          Awareness of wind chill &mdash; wind significantly increases the rate of
                          heat loss from the body
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>
                          <strong className="text-white">Welfare facilities:</strong> Heated rest
                          areas are a legal requirement under CDM 2015 for construction sites
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck after Section 06 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* -------------------------------------------------------- */}
        {/* FAQs                                                      */}
        {/* -------------------------------------------------------- */}
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

        {/* -------------------------------------------------------- */}
        {/* Quiz                                                      */}
        {/* -------------------------------------------------------- */}
        <Quiz title="Heat Exhaustion, Heat Stroke & Hypothermia Quiz" questions={quizQuestions} />

        {/* -------------------------------------------------------- */}
        {/* Navigation                                                */}
        {/* -------------------------------------------------------- */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../first-aid-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../first-aid-module-5">
              Next: Module 5 &mdash; Injuries &amp; Workplace Protocol
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default FirstAidModule4Section4;
