import {
  ArrowLeft,
  Flame,
  CheckCircle,
  AlertTriangle,
  Zap,
  Thermometer,
  Droplets,
  ShieldAlert,
  HardHat,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'burn-cooling-time',
    question: 'For how long should a burn be cooled with running water as a minimum?',
    options: ['5 minutes', '10 minutes', '20 minutes', '30 minutes'],
    correctIndex: 2,
    explanation:
      'A burn should be cooled under cool running water for a minimum of 20 minutes. Cooling should ideally begin within the first 3 hours of the injury. This reduces tissue damage, pain, and swelling. The water should be cool but not ice cold, as iced water causes vasoconstriction and can worsen the injury.',
  },
  {
    id: 'electrical-burn-hospital',
    question:
      'A colleague receives an electrical burn from a faulty appliance. The entry wound on the hand appears small. What is the most important action?',
    options: [
      'Apply a cold compress and monitor for 24 hours',
      'Cool the wound for 20 minutes and cover with cling film',
      'ALWAYS send to hospital for cardiac monitoring — deep tissue damage is likely beyond what is visible',
      'Apply burn cream and cover with a sterile dressing',
    ],
    correctIndex: 2,
    explanation:
      'Electrical burns ALWAYS require hospital assessment. The visible entry wound may appear small, but electrical current travels through the body and can cause extensive deep tissue damage that is not visible on the surface. There is also a significant risk of cardiac arrhythmia, so cardiac monitoring is essential. The exit wound is often much larger than the entry wound.',
  },
  {
    id: 'burn-covering',
    question:
      'After cooling a burn on the forearm for 20 minutes, what is the best way to cover it?',
    options: [
      'Wrap cling film tightly around the arm to keep it secure',
      'Apply cling film lengthways over the burn, loosely — do NOT wrap circumferentially',
      'Apply a thick layer of burn cream and a cotton bandage',
      'Leave the burn uncovered and exposed to the air',
    ],
    correctIndex: 1,
    explanation:
      'Cling film should be applied lengthways over the burn, loosely — never wrapped circumferentially (all the way around) a limb. Wrapping tightly around a limb creates a tourniquet effect as the tissue swells, which can cut off blood supply and cause further damage. Cling film keeps the wound clean, reduces pain from air exposure, and allows medical staff to see the burn without removing the dressing.',
  },
];

const faqs = [
  {
    question: 'Why is running water better than ice or ice packs for cooling burns?',
    answer:
      'Running cool water at a comfortable temperature (around 15°C) is the gold-standard treatment for burns. Ice or iced water causes vasoconstriction — the blood vessels narrow, reducing blood flow to the injured area. This actually worsens the tissue damage and can cause frostbite on top of the burn injury. Cool running water gently removes heat from the tissue without causing further harm. The Resuscitation Council UK and NHS both recommend cool running water for a minimum of 20 minutes.',
  },
  {
    question: 'What is the difference between a scald and a burn?',
    answer:
      'A burn is caused by dry heat — fire, hot metal, friction, or radiation (including sunburn). A scald is caused by wet heat — steam, hot water, hot oil, or other hot liquids. The first aid treatment is identical for both: cool under running water for at least 20 minutes, remove clothing and jewellery (unless stuck to the skin), and cover loosely with cling film. Scalds are particularly common in domestic and catering environments, while electricians are more likely to encounter burns from arc flash, contact with hot surfaces, or chemical exposure.',
  },
  {
    question: 'How do I know if a burn needs hospital treatment?',
    answer:
      "Call 999 or go to hospital for: any burn larger than the casualty's palm, all full-thickness burns regardless of size, any burn to the face, hands, feet, genitals, or any major joint, circumferential burns (all the way around a limb or digit), all chemical burns, all electrical burns, any burn with suspected inhalation injury, burns in children or elderly people, and any burn where you are unsure of the severity. When in doubt, always seek medical attention — it is far better to have a minor burn assessed than to miss a serious one.",
  },
  {
    question: 'Can wet concrete really cause chemical burns?',
    answer:
      'Yes. Wet cement and concrete are highly alkaline, with a pH of 12 to 13. Prolonged contact with wet concrete causes alkali burns that penetrate deep into the skin. These burns are particularly dangerous because they may not cause immediate pain — the casualty may not realise they are being burned until significant tissue damage has already occurred. Construction workers who kneel in wet concrete, handle it without gloves, or allow it to enter their boots are at particular risk. The treatment is thorough washing with copious water and removal of all contaminated clothing. Seek medical attention even if the burn does not appear serious, as alkali burns continue to penetrate deeper over time.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which of the following correctly describes a full-thickness (third-degree) burn?',
    options: [
      'Red, painful, with blistering — affects the epidermis and dermis',
      'Red and painful with no blisters — affects the epidermis only',
      'White, waxy, or charred appearance — may be painless because nerve endings are destroyed',
      'Pink and slightly swollen — heals within 48 hours without treatment',
    ],
    correctAnswer: 2,
    explanation:
      'A full-thickness (third-degree) burn destroys all layers of the skin and may extend into the fat, muscle, or bone beneath. The appearance is typically white, waxy, leathery, or charred. Paradoxically, full-thickness burns may be painless because the nerve endings in the skin have been destroyed. These burns always require hospital treatment and usually need surgery or skin grafts.',
  },
  {
    id: 2,
    question: 'When cooling a burn with running water, what temperature should the water be?',
    options: [
      'As cold as possible — use ice water for maximum cooling effect',
      'Cool but not ice cold — comfortable to touch (approximately 15°C)',
      'Warm — to avoid the casualty getting cold',
      'It does not matter — any temperature is equally effective',
    ],
    correctAnswer: 1,
    explanation:
      'The water should be cool but not ice cold. Water at approximately 15°C is ideal. Ice or iced water causes vasoconstriction, which reduces blood flow to the injured tissue and can worsen the burn damage. The NHS and Resuscitation Council UK both explicitly advise against the use of ice on burns.',
  },
  {
    id: 3,
    question:
      'Using the Rule of Nines, what percentage of total body surface area does the front of the torso represent in an adult?',
    options: ['9%', '18%', '27%', '36%'],
    correctAnswer: 1,
    explanation:
      'Under the Rule of Nines, the front of the torso (chest and abdomen) represents 18% of total body surface area. The back of the torso is another 18%. The head and neck are 9%, each arm is 9%, each leg is 18%, and the perineum is 1%, totalling 100%.',
  },
  {
    id: 4,
    question:
      'A casualty has been splashed with a strong alkali chemical on their arm. What is the FIRST action?',
    options: [
      'Apply a neutralising acid to counteract the alkali',
      'Wipe the chemical off with a dry cloth, then apply a dressing',
      'Flush immediately with copious running water for at least 20 minutes',
      'Apply burn cream and cover with cling film',
    ],
    correctAnswer: 2,
    explanation:
      'The first action for a chemical burn is to flush the affected area immediately with copious running water for at least 20 minutes (longer for alkalis, which penetrate deeper than acids). You must NEVER attempt to neutralise a chemical with another chemical, as this can cause an exothermic reaction and worsen the injury. Remove contaminated clothing carefully while flushing, protecting yourself from exposure.',
  },
  {
    id: 5,
    question:
      'Why should cling film NOT be wrapped circumferentially (all the way around) a burned limb?',
    options: [
      'Because cling film is not sterile',
      'Because the limb will swell — circumferential wrapping creates a tourniquet effect that can cut off blood supply',
      'Because cling film does not stick to burned skin',
      'Because it prevents air from reaching the burn, which delays healing',
    ],
    correctAnswer: 1,
    explanation:
      'Burns cause significant tissue swelling (oedema). If cling film is wrapped tightly around a limb, it cannot expand as the tissue swells, creating a tourniquet effect that restricts blood flow. This can cause ischaemia (lack of blood supply) and further tissue damage. Cling film should be applied lengthways over the burn, loosely, so that it can accommodate swelling.',
  },
  {
    id: 6,
    question:
      'Which of the following signs would make you suspect an inhalation injury in a burn casualty?',
    options: [
      'Burns on the hands and wrists',
      'Blistering on the lower legs',
      'Singed nasal hair, soot around the nose and mouth, hoarse voice, and stridor',
      "A burn larger than the casualty's palm on the back",
    ],
    correctAnswer: 2,
    explanation:
      'Signs of inhalation injury include: fire in an enclosed space, singed nasal hair or eyebrows, soot deposits around the nose and mouth, a hoarse or changed voice, stridor (high-pitched breathing sound), difficulty breathing, and coughing. Inhalation injury is a medical emergency because the airway can swell rapidly and become completely obstructed. Call 999 immediately.',
  },
  {
    id: 7,
    question:
      'An electrician suffers an arc flash burn at work. The entry wound on the hand is approximately 2 cm across. The casualty says they feel fine. What should you do?',
    options: [
      'Cool the burn, apply cling film, and allow the casualty to continue working',
      'Cool the burn and send the casualty to hospital for cardiac monitoring — electrical burns always require hospital assessment',
      'Apply burn cream and monitor the casualty on site for 30 minutes',
      'Cool the burn and cover with a sterile dressing — hospital is only needed if the wound is larger than the palm',
    ],
    correctAnswer: 1,
    explanation:
      'ALL electrical burns must be assessed in hospital, regardless of the size of the visible wound. Electrical current passes through the body and can cause extensive internal tissue damage that is not visible on the surface. There is also a significant risk of cardiac arrhythmia (abnormal heart rhythm), which may not develop immediately. The casualty requires cardiac monitoring even if they currently feel well.',
  },
  {
    id: 8,
    question:
      'Wet concrete has a pH of approximately 12 to 13. What type of chemical burn does it cause?',
    options: [
      'Acid burn — treat with sodium bicarbonate solution',
      'Thermal burn — treat with cool water for 10 minutes',
      'Alkali burn — flush with copious water, and note that it penetrates deeper than acid burns',
      'Radiation burn — protect the area from further UV exposure',
    ],
    correctAnswer: 2,
    explanation:
      'Wet cement and concrete are highly alkaline (pH 12–13) and cause alkali chemical burns. Alkali burns are particularly dangerous because they penetrate deeper into the tissue than acid burns — alkalis saponify (dissolve) fats and proteins, allowing the chemical to continue burning into deeper layers. Treatment is thorough flushing with copious water. Seek medical attention even if the burn does not initially appear serious.',
  },
];

export default function FirstAidModule3Section3() {
  useSEO({
    title: 'Burns, Scalds & Electrical Burns | First Aid Module 3.3',
    description:
      'Burn depth classification, cooling and covering burns, chemical burns, electrical burns, the Rule of Nines, severity assessment, inhalation injury, what NOT to do, and construction site burn risks.',
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
            <Flame className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 3 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Burns, Scalds &amp; Electrical Burns
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Burn depth classification, cooling and covering burns, chemical and electrical burns,
            the Rule of Nines, severity assessment, inhalation injury, and construction site burn
            risks
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Cool:</strong> Running water for at least 20 minutes &mdash; not ice
              </li>
              <li>
                <strong>Cover:</strong> Cling film lengthways, loosely &mdash; never wrap around a
                limb
              </li>
              <li>
                <strong>Electrical:</strong> ALWAYS hospital &mdash; deep damage beyond what you can
                see
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Arc flash:</strong> Cool the burn, call 999, cardiac monitoring required
              </li>
              <li>
                <strong>Chemical:</strong> Flush with water 20+ minutes, check the SDS
              </li>
              <li>
                <strong>Cement:</strong> Highly alkaline (pH 12&ndash;13) &mdash; wash thoroughly
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Classify burns by depth: superficial, partial-thickness, and full-thickness',
              'Demonstrate the correct procedure for cooling and covering burns',
              'Explain the specific first aid management of chemical burns',
              'Describe why electrical burns always require hospital assessment and cardiac monitoring',
              'Use the Rule of Nines to estimate the percentage of body surface area affected by a burn',
              'Recognise the signs of inhalation injury and explain why it is a medical emergency',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Burn Depth Classification */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">01</span>
            Burn Depth Classification
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Burns are classified by how deeply they penetrate the layers of the skin. The depth
                of a burn determines its severity, the amount of pain the casualty experiences, the
                treatment required, and the likely outcome. Understanding burn depth is essential
                for assessing severity and communicating clearly with the emergency services.
              </p>

              <p>
                The skin has two main layers: the <strong>epidermis</strong> (outer protective
                layer) and the <strong>dermis</strong> (deeper layer containing blood vessels, nerve
                endings, sweat glands, and hair follicles). Beneath the dermis lies the{' '}
                <strong>subcutaneous tissue</strong> (fat), then muscle and bone. The deeper a burn
                penetrates, the more serious it is.
              </p>

              {/* Burn Depth Comparison Grid */}
              <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Thermometer className="h-5 w-5 text-amber-400" />
                    <p className="text-sm font-medium text-amber-400">Superficial (First-Degree)</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Depth:</strong> Epidermis only
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Appearance:</strong> Red, dry, no blisters
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Pain:</strong> Painful &mdash; nerve endings
                        intact
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Healing:</strong> Within 7 days, no scarring
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Example:</strong> Mild sunburn
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Flame className="h-5 w-5 text-orange-400" />
                    <p className="text-sm font-medium text-orange-400">
                      Partial-Thickness (Second-Degree)
                    </p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Depth:</strong> Epidermis and dermis
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Appearance:</strong> Red, wet, blistering
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Pain:</strong> Very painful &mdash; exposed
                        nerve endings
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Healing:</strong> 2&ndash;4 weeks, may scar
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Example:</strong> Contact with hot pipe or
                        spilt hot liquid
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <p className="text-sm font-medium text-red-400">
                      Full-Thickness (Third-Degree)
                    </p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Depth:</strong> All skin layers &mdash; may
                        extend to fat, muscle, bone
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Appearance:</strong> White, waxy, leathery,
                        or charred
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Pain:</strong> May be painless &mdash; nerve
                        endings destroyed
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Healing:</strong> Requires surgery / skin
                        grafts
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Example:</strong> Arc flash, prolonged flame
                        contact
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Paradox of Pain:</strong> A common misconception
                  is that the most painful burns are the most serious. In fact, full-thickness burns
                  may be <strong>painless</strong> because the nerve endings in the skin have been
                  destroyed. A casualty who reports no pain in a burn area that appears white, waxy,
                  or charred may have a very serious injury. Partial-thickness burns are typically
                  the most painful because the nerve endings are exposed but not destroyed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Cooling Burns */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">02</span>
            Cooling Burns
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Cooling a burn is the single most important first aid intervention. Prompt,
                effective cooling reduces the depth and severity of the burn, limits tissue damage,
                reduces pain, and decreases swelling. The current UK guidance from the NHS and
                Resuscitation Council UK is clear and consistent.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">Cooling Procedure</p>
                <div className="space-y-2">
                  {[
                    'Cool the burn under cool running water for a minimum of 20 minutes',
                    'Start cooling within the first 3 hours of the injury (the sooner the better — ideally immediately)',
                    'Use cool water — NOT ice, iced water, or frozen items (these cause vasoconstriction and worsen the injury)',
                    'Remove clothing and jewellery from the burn area — unless they are stuck to the skin',
                    'Continue cooling even after 999 has been called — do not stop to wait for the ambulance',
                    'If running water is not available, use any clean, cool liquid or a cool, wet cloth — but running water is far superior',
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

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Why 20 Minutes?</strong> Research shows that 20
                  minutes of cooling significantly reduces burn depth and improves healing outcomes.
                  Shorter cooling times are less effective. The 20-minute minimum applies regardless
                  of burn size &mdash; even small burns benefit from full cooling. For larger burns,
                  be mindful of hypothermia, particularly in children and elderly casualties: cool
                  the burn but keep the rest of the body warm.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    Hypothermia Risk in Large Burns
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  When a casualty has a large area of burned skin, prolonged cooling can cause
                  hypothermia &mdash; especially in children and elderly people. Cool the burn area
                  only, not the whole body. Keep unburned areas covered and warm. Monitor the
                  casualty for signs of hypothermia (shivering, confusion, pale skin) and be ready
                  to stop cooling if the casualty becomes dangerously cold. However, the burn should
                  still receive the full 20 minutes of cooling wherever possible.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Covering Burns */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">03</span>
            Covering Burns
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                After the burn has been cooled for a minimum of 20 minutes, it needs to be covered
                to protect it from contamination, reduce pain from air exposure, and prevent further
                fluid loss. The preferred covering in pre-hospital first aid is{' '}
                <strong>cling film</strong>, which is readily available, non-adherent, transparent
                (allowing medical staff to assess the burn without removing the dressing), and
                reduces pain on contact with air.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Covering Options</p>
                <div className="space-y-3">
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                    <p className="text-sm font-medium text-rose-400 mb-1">Cling Film (Preferred)</p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          Apply <strong className="text-white">lengthways</strong> over the burn
                          &mdash; layer it on top
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          Do <strong className="text-red-300">NOT</strong> wrap circumferentially
                          around a limb
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Discard the first few turns of the roll (may be contaminated)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          Transparent &mdash; lets medical staff see the burn without removing the
                          dressing
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white mb-1">Clean Plastic Bag</p>
                    <p className="text-sm text-white/80">
                      For burns to the hands or feet, a clean plastic bag can be placed loosely over
                      the affected area. This protects the burn while allowing the casualty to move
                      their fingers or toes.
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white mb-1">
                      Sterile Non-Adherent Dressing
                    </p>
                    <p className="text-sm text-white/80">
                      If cling film is not available, a sterile non-adherent dressing can be applied
                      loosely. Do not use adhesive dressings, cotton wool, or fluffy materials
                      directly on a burn &mdash; fibres will stick to the wound.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Why NOT Circumferentially?</p>
                </div>
                <p className="text-sm text-white/80">
                  Burns cause significant tissue swelling (oedema) in the hours following the
                  injury. If cling film is wrapped tightly around a limb like a bandage, it cannot
                  expand as the tissue swells. This creates a{' '}
                  <strong className="text-white">tourniquet effect</strong> that restricts blood
                  flow, potentially causing ischaemia (lack of blood supply) and further tissue
                  damage distal to the wrapping. Always apply cling film{' '}
                  <strong className="text-white">lengthways</strong>, loosely layered over the burn.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Chemical Burns */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">04</span>
            Chemical Burns
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Chemical burns are caused by contact with corrosive substances &mdash; acids,
                alkalis, solvents, and other reactive chemicals. They differ from thermal burns in
                one critical respect: the chemical <strong>continues to burn</strong> as long as it
                remains in contact with the skin. Rapid decontamination with copious water is
                therefore the priority.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Chemical Burn First Aid</p>
                </div>
                <div className="space-y-2">
                  {[
                    'Flush immediately with copious running water for at least 20 minutes (longer for alkalis — they penetrate deeper)',
                    'Remove contaminated clothing carefully while flushing — protect yourself from exposure (wear gloves if available)',
                    'Do NOT attempt to neutralise the chemical with another chemical — this can cause an exothermic reaction and worsen the burn',
                    'Check the Safety Data Sheet (SDS) for specific guidance on the chemical involved',
                    'Call 999 — all chemical burns require medical assessment',
                    'If the chemical is a powder or dry substance, brush off as much as possible before flushing with water',
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

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-orange-400 mb-2">Acid Burns</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Acids cause <strong className="text-white">coagulation necrosis</strong>{' '}
                        &mdash; the damaged tissue forms a barrier that limits penetration
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Tend to cause more superficial damage (though concentrated acids can be very
                        serious)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Examples: battery acid (sulphuric), hydrochloric acid, etching solutions
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-2">Alkali Burns</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Alkalis cause <strong className="text-white">liquefactive necrosis</strong>{' '}
                        &mdash; they dissolve fats and proteins, penetrating deeper
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Generally more dangerous than acids because they continue to penetrate into
                        deeper tissues
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Examples: wet cement (pH 12&ndash;13), caustic soda, bleach, oven cleaner
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Protect Yourself:</strong> Before treating a
                  chemical burn casualty, ensure your own safety. Wear gloves and eye protection if
                  available. Do not touch the chemical with bare skin. If you are contaminated
                  during the rescue, decontaminate yourself immediately. A contaminated rescuer
                  becomes a second casualty.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Electrical Burns */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">05</span>
            Electrical Burns
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Electrical burns are uniquely dangerous because the visible injury on the skin
                surface is often only a small fraction of the total damage. Electrical current
                travels through the body along the path of least resistance, damaging muscles,
                nerves, blood vessels, and organs as it passes. As electricians, you face a higher
                risk of electrical burns than almost any other trade &mdash; understanding these
                injuries is essential.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Critical: Always Send to Hospital
                  </p>
                </div>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    <strong className="text-red-300">
                      ALL electrical burns require hospital assessment, regardless of how minor the
                      visible injury appears.
                    </strong>
                  </p>
                  <p>
                    The visible entry wound may be small &mdash; sometimes no larger than a coin
                    &mdash; but extensive damage may exist deep within the body. The exit wound is
                    often much larger than the entry wound. Internal damage may include muscle
                    necrosis, nerve damage, and damage to internal organs.
                  </p>
                  <p>
                    There is a significant risk of{' '}
                    <strong className="text-white">cardiac arrhythmia</strong> (abnormal heart
                    rhythm) following electrical injury. This can occur immediately or may develop
                    hours after the initial shock. The casualty <strong>must</strong> receive
                    cardiac monitoring in hospital, even if they currently feel well.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Electrical Burn Characteristics
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Entry wound:</strong> Often small and
                      well-defined &mdash; may appear as a small burn or blister at the point of
                      contact
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Exit wound:</strong> Often much larger than the
                      entry wound &mdash; typically found where current left the body (often the
                      feet if the casualty was standing)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Deep tissue damage:</strong> Extensive damage
                      to muscles, nerves, and blood vessels along the current pathway &mdash; not
                      visible on the surface
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Cardiac risk:</strong> Risk of arrhythmia
                      (abnormal heart rhythm) &mdash; may develop hours after the injury
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Arc flash burns:</strong> Caused by the intense
                      heat of an electrical arc (up to 20,000°C) &mdash; can cause severe thermal
                      burns to exposed skin, ignite clothing, and cause flash blindness
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">Electrical Burn First Aid</p>
                <div className="space-y-2">
                  {[
                    'Ensure the electrical source is ISOLATED before touching the casualty — do NOT touch them if they are still in contact with a live source',
                    'For low voltage (below 1,000 V): isolate at the consumer unit or distribution board',
                    'For high voltage (above 1,000 V): stay at least 25 metres away, call 999, contact the network operator — do NOT attempt rescue',
                    'Once safe: check for response and breathing — be prepared to start CPR if the casualty is in cardiac arrest',
                    'Cool any visible burns with running water for 20 minutes',
                    'Call 999 — the casualty MUST go to hospital for cardiac monitoring, even if they feel well',
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
          </div>
        </section>

        {/* Section 06: Rule of Nines & Severity Assessment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">06</span>
            The Rule of Nines &amp; Severity Assessment
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Rule of Nines</strong> (Wallace Rule of Nines) is a rapid method for
                estimating the percentage of total body surface area (TBSA) affected by a burn. It
                divides the adult body into sections, each representing approximately 9% (or a
                multiple of 9%) of the total body surface area. This estimation helps determine the
                severity of the burn and guides treatment decisions.
              </p>

              {/* Rule of Nines Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-white mb-4 text-center">
                  Rule of Nines &mdash; Adult Body Surface Area
                </p>
                <div className="flex justify-center">
                  <div className="relative w-56 sm:w-64">
                    {/* Body outline using styled divs */}
                    <div className="flex flex-col items-center">
                      {/* Head */}
                      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-rose-500/15 border-2 border-rose-400/40 flex items-center justify-center mb-1">
                        <div className="text-center">
                          <p className="text-xs font-bold text-rose-400">9%</p>
                          <p className="text-[9px] text-white/60">Head &amp; neck</p>
                        </div>
                      </div>

                      {/* Torso + Arms row */}
                      <div className="flex items-start gap-0">
                        {/* Left arm */}
                        <div className="w-12 sm:w-14 h-28 sm:h-32 bg-amber-500/15 border-2 border-amber-400/40 rounded-lg flex items-center justify-center mt-2">
                          <div className="text-center -rotate-90 whitespace-nowrap">
                            <p className="text-xs font-bold text-amber-400">9%</p>
                            <p className="text-[8px] text-white/60">L. Arm</p>
                          </div>
                        </div>

                        {/* Torso */}
                        <div className="flex flex-col">
                          {/* Front torso */}
                          <div className="w-24 sm:w-28 h-16 sm:h-18 bg-blue-500/15 border-2 border-blue-400/40 border-b-0 rounded-t-lg flex items-center justify-center">
                            <div className="text-center">
                              <p className="text-xs font-bold text-blue-400">18%</p>
                              <p className="text-[8px] text-white/60">Front torso</p>
                            </div>
                          </div>
                          {/* Back torso */}
                          <div className="w-24 sm:w-28 h-16 sm:h-18 bg-purple-500/15 border-2 border-purple-400/40 rounded-b-lg flex items-center justify-center">
                            <div className="text-center">
                              <p className="text-xs font-bold text-purple-400">18%</p>
                              <p className="text-[8px] text-white/60">Back torso</p>
                            </div>
                          </div>
                        </div>

                        {/* Right arm */}
                        <div className="w-12 sm:w-14 h-28 sm:h-32 bg-amber-500/15 border-2 border-amber-400/40 rounded-lg flex items-center justify-center mt-2">
                          <div className="text-center rotate-90 whitespace-nowrap">
                            <p className="text-xs font-bold text-amber-400">9%</p>
                            <p className="text-[8px] text-white/60">R. Arm</p>
                          </div>
                        </div>
                      </div>

                      {/* Perineum */}
                      <div className="w-10 h-5 bg-white/10 border border-white/30 flex items-center justify-center">
                        <p className="text-[8px] font-bold text-white/60">1%</p>
                      </div>

                      {/* Legs row */}
                      <div className="flex gap-2">
                        {/* Left leg */}
                        <div className="w-14 sm:w-16 h-32 sm:h-36 bg-green-500/15 border-2 border-green-400/40 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <p className="text-xs font-bold text-green-400">18%</p>
                            <p className="text-[8px] text-white/60">L. Leg</p>
                          </div>
                        </div>

                        {/* Right leg */}
                        <div className="w-14 sm:w-16 h-32 sm:h-36 bg-green-500/15 border-2 border-green-400/40 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <p className="text-xs font-bold text-green-400">18%</p>
                            <p className="text-[8px] text-white/60">R. Leg</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-4 text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-rose-500/15 border border-rose-400/40 rounded" />
                    <span className="text-white/60">Head &amp; neck: 9%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-amber-500/15 border border-amber-400/40 rounded" />
                    <span className="text-white/60">Each arm: 9%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-blue-500/15 border border-blue-400/40 rounded" />
                    <span className="text-white/60">Front torso: 18%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-purple-500/15 border border-purple-400/40 rounded" />
                    <span className="text-white/60">Back torso: 18%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-green-500/15 border border-green-400/40 rounded" />
                    <span className="text-white/60">Each leg: 18%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-white/10 border border-white/30 rounded" />
                    <span className="text-white/60">Perineum: 1%</span>
                  </div>
                </div>
                <p className="text-[11px] text-white/40 text-center mt-2">
                  Total: 9 + 9 + 9 + 18 + 18 + 18 + 18 + 1 = 100%
                </p>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Palm Method:</strong> For quick estimation of
                  smaller or irregular burns, the casualty&rsquo;s palm (including fingers)
                  represents approximately <strong>1%</strong> of their total body surface area.
                  Count how many &ldquo;palms&rdquo; would cover the burned area to estimate the
                  TBSA affected. This is particularly useful for scattered or patchy burns where the
                  Rule of Nines is less practical.
                </p>
              </div>

              {/* Severity Assessment */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldAlert className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Call 999 For:</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Burns{' '}
                      <strong className="text-white">larger than the casualty&rsquo;s palm</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Full-thickness burns</strong> of any size
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Burns to the{' '}
                      <strong className="text-white">
                        face, hands, feet, genitals, or any major joint
                      </strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Circumferential burns</strong> (all the way
                      around a limb or digit)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      All <strong className="text-white">chemical burns</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      All <strong className="text-white">electrical burns</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Burns in <strong className="text-white">children or elderly people</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Burns with suspected <strong className="text-white">inhalation injury</strong>
                    </span>
                  </li>
                </ul>
              </div>

              {/* Inhalation Injury */}
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Inhalation Injury &mdash; Medical Emergency
                  </p>
                </div>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    An inhalation injury occurs when hot gases, smoke, or chemical fumes are
                    breathed in, causing burns and swelling to the airway. This is a{' '}
                    <strong className="text-red-300">medical emergency</strong> because the airway
                    can swell rapidly and become completely obstructed.
                  </p>
                  <p className="font-medium text-white">Suspect inhalation injury if:</p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        The fire occurred in an{' '}
                        <strong className="text-white">enclosed space</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Singed nasal hair</strong> or eyebrows
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Soot</strong> around the nose or mouth
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Hoarse voice</strong> or difficulty speaking
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Stridor</strong> (high-pitched breathing
                        sound on inspiration)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Difficulty breathing</strong>, coughing, or
                        wheezing
                      </span>
                    </li>
                  </ul>
                  <p className="text-red-300 font-medium mt-2">
                    Call 999 immediately. Sit the casualty upright to aid breathing. Monitor the
                    airway continuously &mdash; be prepared for rapid deterioration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* What NOT to Do — Warning Box */}
        <section className="mb-10">
          <div className="bg-red-500/10 border border-red-500/30 p-4 sm:p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-400" />
              <h2 className="text-lg font-semibold text-red-400">What NOT to Do</h2>
            </div>
            <p className="text-sm text-white/80 mb-4">
              The following common mistakes can significantly worsen a burn injury. Avoid all of
              these:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                {
                  action: 'Do NOT apply ice or iced water',
                  reason:
                    'Causes vasoconstriction, reduces blood flow, and can cause frostbite on top of the burn injury',
                },
                {
                  action: 'Do NOT apply butter, toothpaste, cream, or any home remedy',
                  reason:
                    'Traps heat in the tissue, increases infection risk, and must be painfully removed at hospital',
                },
                {
                  action: 'Do NOT burst blisters',
                  reason:
                    'Blisters are a natural protective barrier against infection — breaking them exposes the raw tissue beneath',
                },
                {
                  action: 'Do NOT use adhesive dressings directly on burns',
                  reason:
                    'They stick to the burn surface and cause further tissue damage when removed',
                },
                {
                  action: 'Do NOT remove clothing that is stuck to the burn',
                  reason:
                    'Pulling away stuck fabric tears the damaged tissue — cut around it and leave the stuck portion in place',
                },
                {
                  action: 'Do NOT wrap cling film tightly around a limb',
                  reason:
                    'Creates a tourniquet effect as the tissue swells, cutting off blood supply — apply lengthways, loosely',
                },
              ].map((item, i) => (
                <div key={i} className="bg-red-500/5 border border-red-500/20 p-3 rounded-lg">
                  <p className="text-sm font-medium text-red-300 mb-1">{item.action}</p>
                  <p className="text-xs text-white/70">{item.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Construction Site Burn Risks */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">&nbsp;</span>
            Construction Site Burn Risks
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Construction sites present a range of burn hazards that are specific to the
                industry. As an electrician working on construction sites, you should be aware of
                these risks and how to manage them.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <HardHat className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Common Construction Site Burn Hazards
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Arc flash:</strong> Electrical arcs can reach
                      temperatures of up to 20,000°C, causing severe thermal burns, igniting
                      clothing, and causing flash blindness. Arc-rated PPE is essential.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Cable burns:</strong> Contact with live cables
                      or overloaded circuits can cause both electrical and thermal burns.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Hot pipes and surfaces:</strong> Contact with
                      hot water pipes, steam pipes, recently soldered joints, or hot plant equipment
                      causes thermal contact burns.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Chemical exposure:</strong> Solvents,
                      adhesives, acids used in cleaning or descaling, and fluxes can cause chemical
                      burns on contact with skin.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Cement Burns */}
              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">
                    Cement Burns &mdash; A Specific Construction Risk
                  </p>
                </div>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    Wet cement and concrete are{' '}
                    <strong className="text-white">highly alkaline</strong>, with a pH of
                    approximately <strong className="text-white">12 to 13</strong>. Prolonged
                    contact with wet concrete causes alkali chemical burns that can be deceptively
                    serious.
                  </p>
                  <p>
                    Cement burns are particularly dangerous because they{' '}
                    <strong className="text-white">may not cause immediate pain</strong> &mdash; the
                    casualty may not realise they are being burned until significant tissue damage
                    has already occurred. Workers who kneel in wet concrete, handle it without
                    gloves, or allow it to enter their boots are at particular risk.
                  </p>
                  <p className="font-medium text-white">Treatment:</p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Wash thoroughly with copious running water</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Remove all contaminated clothing, including boots and socks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Seek medical attention even if the burn does not appear serious &mdash;
                        alkali burns penetrate deeper over time
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Prevention:</strong> The best treatment for
                  burns is prevention. Wear appropriate PPE for the hazard: arc-rated clothing for
                  electrical work, chemical-resistant gloves for handling corrosive substances, and
                  always ensure boots are in good condition when working with wet concrete. Know the
                  location of the nearest water supply and first aid kit before starting work.
                </p>
              </div>
            </div>
          </div>
        </section>

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
            <Link to="../first-aid-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../first-aid-module-3-section-4">
              Next: Shock &amp; Anaphylaxis
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
