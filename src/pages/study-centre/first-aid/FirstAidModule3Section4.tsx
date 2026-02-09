import {
  ArrowLeft,
  Activity,
  CheckCircle,
  AlertTriangle,
  Heart,
  Shield,
  Syringe,
  Link2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'fa-shock-legs',
    question:
      'A casualty is showing signs of shock after a fall. You want to raise their legs, but they are complaining of severe pain in their right thigh. What should you do?',
    options: [
      'Raise both legs anyway — treating shock takes priority',
      'Raise only the uninjured leg',
      'Do NOT raise the legs — keep the casualty flat and warm, as raising the legs could worsen a fracture',
      'Sit the casualty upright to help them breathe more easily',
    ],
    correctIndex: 2,
    explanation:
      'You should NOT raise the legs if there is a suspected fracture, spinal injury, or if it causes pain. In this case, the severe pain in the thigh suggests a possible fracture. Keep the casualty lying flat on their back, keep them warm with blankets, and monitor continuously while waiting for emergency services.',
  },
  {
    id: 'fa-anaphylaxis-position',
    question:
      'A casualty is having a severe anaphylactic reaction. They are conscious, wheezing badly and struggling to breathe, but their blood pressure seems stable. What position should you place them in?',
    options: [
      'Lie them flat with legs raised',
      'Sit them upright to ease breathing difficulty',
      'Place them in the recovery position',
      'Stand them up and walk them to fresh air',
    ],
    correctIndex: 1,
    explanation:
      'When breathing difficulty is the predominant symptom of anaphylaxis, the casualty should be sat upright. This position uses gravity to help reduce the workload on the respiratory muscles. If the casualty were feeling faint or dizzy (low blood pressure), you would lie them flat with legs raised instead. NEVER stand a casualty with anaphylaxis up — this can cause fatal cardiac arrest.',
  },
  {
    id: 'fa-aai-second-dose',
    question:
      "You have administered an adrenaline auto-injector to a casualty experiencing anaphylaxis. After 5 minutes, the casualty's symptoms have not improved. What should you do?",
    options: [
      'Wait another 10 minutes before considering a second dose',
      'Administer a second dose using a second auto-injector device',
      'Remove the first injector and re-inject with the same device',
      'Do not give a second dose — only one dose can ever be given',
    ],
    correctIndex: 1,
    explanation:
      'If there is no improvement after 5 minutes, a second dose of adrenaline should be administered using a second auto-injector device. Auto-injectors are single-use — you cannot re-use the first device. Most people prescribed auto-injectors are advised to carry two devices for this reason. Always call 999 even if symptoms improve, as biphasic reactions can occur hours later.',
  },
];

const faqs = [
  {
    question: 'Is shock the same as feeling shocked or upset after an accident?',
    answer:
      "No. Clinical shock is a life-threatening medical emergency where the circulatory system fails to deliver enough oxygenated blood to the body's organs and tissues. It is entirely different from emotional shock or distress. A casualty in clinical shock requires urgent medical treatment — call 999 immediately. While emotional distress is understandable after a traumatic event, it does not carry the same immediate threat to life.",
  },
  {
    question:
      'Can I give an adrenaline auto-injector to someone who has never been prescribed one?',
    answer:
      "In an emergency where you believe someone is having a life-threatening anaphylactic reaction, UK law (the Human Medicines (Amendment) Regulations 2017) allows spare adrenaline auto-injectors to be used in certain settings such as schools. For workplace first aiders, if the casualty's own prescribed auto-injector is available, use that. If you carry a spare as part of your first aid kit (as permitted in some workplaces), you may use it in a genuine life-threatening emergency. Always call 999 and explain what has been administered.",
  },
  {
    question: 'What is a biphasic anaphylactic reaction and why does it matter?',
    answer:
      'A biphasic reaction is a second wave of anaphylactic symptoms that occurs hours after the initial reaction appeared to have resolved — typically within 4 to 12 hours, but sometimes up to 72 hours later. This is why every casualty who has experienced anaphylaxis must go to hospital, even if their symptoms improve after adrenaline. The biphasic reaction can be equally severe or even more severe than the original episode. Hospital observation allows prompt treatment if symptoms return.',
  },
  {
    question: 'How do I recognise shock in someone with darker skin tones?',
    answer:
      "In darker skin tones, pallor and cyanosis (blue colouration) may not be visible on the skin surface. Instead, check the mucous membranes: look inside the lower eyelids (pulling the lid down gently), inside the lips, at the nail beds, and at the palms of the hands. In shock, these areas will appear pale, grey or ashen rather than their normal pink colour. Also rely on other signs: cold and clammy skin to touch, rapid weak pulse, rapid breathing, confusion, and the casualty's own description of how they feel.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which type of shock is most commonly encountered by first aiders in the workplace?',
    options: ['Cardiogenic shock', 'Hypovolaemic shock', 'Neurogenic shock', 'Septic shock'],
    correctAnswer: 1,
    explanation:
      'Hypovolaemic shock — caused by severe blood or fluid loss — is the most common type encountered by first aiders. It can result from external or internal bleeding, severe burns, dehydration, and prolonged vomiting or diarrhoea. First aiders are most likely to encounter this type because workplace injuries involving bleeding and burns are relatively common.',
  },
  {
    id: 2,
    question:
      'A casualty in shock is pale, cold, clammy, and has a rapid weak pulse. You have called 999 and controlled the bleeding. What should you do next?',
    options: [
      'Give them a hot drink to warm them up',
      'Sit them upright in a chair',
      'Lie them flat on their back and raise their legs 15-30cm, keeping them warm with blankets',
      'Walk them around to keep their circulation moving',
    ],
    correctAnswer: 2,
    explanation:
      'The correct treatment is to lie the casualty flat on their back and raise their legs 15-30cm to improve venous return to the heart. Keep them warm with blankets or coats to prevent heat loss. Do NOT give food or drink (risk of vomiting and potential surgery), do NOT sit them upright (reduces blood flow to the brain), and do NOT walk them around (increases oxygen demand).',
  },
  {
    id: 3,
    question: 'Which of the following is NOT a recognised sign of shock?',
    options: [
      'Pale, cold, clammy skin',
      'Rapid, weak pulse',
      'High temperature and flushed red face',
      'Anxiety, restlessness and confusion',
    ],
    correctAnswer: 2,
    explanation:
      'A high temperature and flushed red face are NOT typical signs of shock. Shock causes pale, cold, clammy skin (or grey/ashen in darker skin tones) because blood is being diverted away from the skin to protect vital organs. The other options — rapid weak pulse, and anxiety/restlessness/confusion — are all classic signs of shock.',
  },
  {
    id: 4,
    question:
      'A colleague is stung by a wasp and within minutes develops widespread hives, swelling of the lips, and difficulty breathing. What is the most likely condition?',
    options: [
      'A mild localised allergic reaction',
      'Hypovolaemic shock from the sting',
      'Anaphylaxis — a severe systemic allergic reaction',
      'A panic attack caused by fear of wasps',
    ],
    correctAnswer: 2,
    explanation:
      'The rapid onset of widespread hives (urticaria), swelling of the lips (angioedema), and difficulty breathing after an insect sting are classic signs of anaphylaxis. This is a life-threatening emergency requiring immediate administration of adrenaline (if available) and calling 999. A localised reaction would only affect the area around the sting site.',
  },
  {
    id: 5,
    question: 'What is the correct injection site for an adrenaline auto-injector?',
    options: [
      'The upper arm (deltoid muscle)',
      'The outer mid-thigh (vastus lateralis muscle)',
      'The buttock (gluteal muscle)',
      'The abdomen (stomach area)',
    ],
    correctAnswer: 1,
    explanation:
      'All three UK auto-injector brands (EpiPen, Jext, and Emerade) are injected into the outer mid-thigh (vastus lateralis muscle). This site provides rapid absorption of adrenaline into the bloodstream. The injection can be given through clothing if necessary — do not waste time removing trousers in an emergency.',
  },
  {
    id: 6,
    question:
      'After using an adrenaline auto-injector on a casualty whose symptoms then improve, what should you do?',
    options: [
      'Send the casualty home as the emergency is over',
      'Always call 999 — even if symptoms improve, biphasic reactions can occur hours later',
      'Give the casualty antihistamine tablets and monitor for 30 minutes',
      'Only call 999 if the symptoms return within 10 minutes',
    ],
    correctAnswer: 1,
    explanation:
      "You must ALWAYS call 999 after using an adrenaline auto-injector, even if the casualty's symptoms improve completely. Biphasic anaphylactic reactions can occur 4 to 12 hours (sometimes up to 72 hours) after the initial episode. The casualty needs hospital observation to ensure they receive prompt treatment if symptoms return.",
  },
  {
    id: 7,
    question:
      'A casualty with known anaphylaxis is feeling very faint and dizzy after being stung. They are conscious. What position should they be placed in?',
    options: [
      'Sit them upright in a chair',
      'Stand them up and walk them to the first aid room',
      'Lie them flat with their legs raised',
      'Place them in the recovery position immediately',
    ],
    correctAnswer: 2,
    explanation:
      'When the predominant symptom of anaphylaxis is feeling faint or dizzy (indicating low blood pressure), the casualty should be laid flat with their legs raised. This improves venous return and blood pressure. If breathing difficulty were the main problem, sitting upright would be preferred. NEVER stand a casualty with anaphylaxis up — the sudden change to an upright position can cause fatal cardiac arrest due to the already low blood pressure.',
  },
  {
    id: 8,
    question:
      'Which of the following is the correct adult dose of adrenaline in a standard auto-injector?',
    options: [
      '150 micrograms',
      '300 micrograms',
      '500 micrograms',
      '1000 micrograms (1 milligram)',
    ],
    correctAnswer: 1,
    explanation:
      'The standard adult dose of adrenaline in an auto-injector is 300 micrograms. This applies to adults and children weighing over 30kg. Children weighing 15-30kg receive the junior dose of 150 micrograms. All three UK brands (EpiPen, Jext, and Emerade) use these same dosages.',
  },
];

export default function FirstAidModule3Section4() {
  useSEO({
    title: 'Shock & Anaphylaxis | First Aid Module 3.4',
    description:
      'Recognition and treatment of shock, types of shock, anaphylaxis signs and symptoms, adrenaline auto-injectors (EpiPen, Jext, Emerade), positioning, and UK Resuscitation Council anaphylaxis guidelines.',
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
            <Activity className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 3 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Shock &amp; Anaphylaxis
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Recognising and treating circulatory shock, understanding the different types of shock,
            managing anaphylaxis, and using adrenaline auto-injectors in line with UK Resuscitation
            Council guidelines
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Shock:</strong> Circulatory failure &mdash; pale, cold, clammy, rapid weak
                pulse
              </li>
              <li>
                <strong>Treatment:</strong> Lie flat, raise legs 15&ndash;30cm, keep warm, call 999
              </li>
              <li>
                <strong>Anaphylaxis:</strong> Adrenaline auto-injector + 999 &mdash; always
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Do NOT:</strong> Give food or drink to a casualty in shock
              </li>
              <li>
                <strong>Position:</strong> Breathing difficulty = sit up; faint/dizzy = legs raised
              </li>
              <li>
                <strong>Second dose:</strong> After 5 mins if no improvement &mdash; use a new
                device
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain what shock is and why it is life-threatening',
              'Identify the five main types of shock and their causes',
              'Recognise the signs and symptoms of circulatory shock',
              'Demonstrate the correct treatment sequence for a casualty in shock',
              'Recognise the signs and symptoms of anaphylaxis',
              'Describe how to use the three UK adrenaline auto-injector brands correctly',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Is Shock */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">01</span>
            What Is Shock?
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Shock</strong> is a life-threatening medical condition in which the
                circulatory system fails to supply enough oxygenated blood to the body&rsquo;s
                organs and tissues. When the organs are starved of oxygen, they begin to fail
                &mdash; and without treatment, shock will lead to organ damage, loss of
                consciousness, and ultimately cardiac arrest and death.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Key Definition &mdash; Clinical Shock
                </p>
                <p className="text-sm text-white">
                  Clinical shock (also called circulatory shock) is <strong>NOT</strong> the same as
                  emotional shock. A person who witnesses a traumatic event may feel
                  &ldquo;shocked&rdquo; or distressed, but this is an emotional response. Clinical
                  shock is a{' '}
                  <strong>
                    failure of the cardiovascular system to deliver adequate oxygen to the tissues
                  </strong>
                  . It is a medical emergency that requires urgent intervention and always warrants
                  a 999 call.
                </p>
              </div>

              <p>
                The circulatory system needs three things to function: a working pump (the heart),
                an adequate volume of fluid (blood), and intact blood vessels to carry it. Shock
                occurs when any one of these three components fails. The body&rsquo;s initial
                response is to compensate &mdash; increasing the heart rate, constricting blood
                vessels, and diverting blood away from the skin and extremities to protect vital
                organs. This is why a casualty in shock appears pale, cold and clammy. However,
                these compensatory mechanisms can only sustain the casualty for a limited time
                before they are overwhelmed.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">
                    The Three Requirements of Circulation
                  </p>
                </div>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="bg-black/30 rounded-lg p-3 text-center">
                    <p className="text-rose-400 font-semibold text-sm mb-1">The Pump</p>
                    <p className="text-xs text-white/70">
                      The heart must beat effectively to push blood around the body. If the heart
                      fails (cardiogenic shock), circulation collapses.
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3 text-center">
                    <p className="text-rose-400 font-semibold text-sm mb-1">The Volume</p>
                    <p className="text-xs text-white/70">
                      There must be enough blood in the system. Severe bleeding, burns or fluid loss
                      reduces blood volume (hypovolaemic shock).
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3 text-center">
                    <p className="text-rose-400 font-semibold text-sm mb-1">The Vessels</p>
                    <p className="text-xs text-white/70">
                      Blood vessels must maintain tone and integrity. If they dilate excessively
                      (anaphylaxis, sepsis), blood pressure drops catastrophically.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Types of Shock */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">02</span>
            Types of Shock
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                There are several types of shock, each caused by a different failure within the
                circulatory system. Understanding the type helps you identify the underlying cause
                and provide the most effective first aid treatment.
              </p>

              {/* Shock Types Comparison Grid */}
              <div className="space-y-3">
                {/* Hypovolaemic */}
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-red-500/30 text-red-300 text-xs font-bold">
                      MOST COMMON
                    </span>
                    <p className="text-sm font-medium text-red-400">Hypovolaemic Shock</p>
                  </div>
                  <p className="text-sm text-white/80 mb-3">
                    Caused by severe loss of blood or body fluids, reducing the volume of
                    circulating blood below what is needed to maintain adequate perfusion. This is
                    the type of shock most commonly encountered by first aiders.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {[
                      'Severe external or internal bleeding',
                      'Major burns (plasma loss through damaged skin)',
                      'Severe dehydration',
                      'Prolonged vomiting or diarrhoea',
                    ].map((cause, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-white/70">
                        <span className="mt-1 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>{cause}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cardiogenic */}
                <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Heart className="h-4 w-4 text-purple-400" />
                    <p className="text-sm font-medium text-purple-400">Cardiogenic Shock</p>
                  </div>
                  <p className="text-sm text-white/80 mb-3">
                    The heart fails to pump blood effectively, so despite adequate blood volume and
                    intact vessels, circulation is insufficient. The pump itself has failed.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {[
                      'Heart attack (myocardial infarction)',
                      'Heart failure',
                      'Serious cardiac arrhythmia',
                      'Cardiac tamponade',
                    ].map((cause, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-white/70">
                        <span className="mt-1 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>{cause}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Anaphylactic */}
                <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="h-4 w-4 text-orange-400" />
                    <p className="text-sm font-medium text-orange-400">Anaphylactic Shock</p>
                  </div>
                  <p className="text-sm text-white/80 mb-3">
                    A severe, life-threatening allergic reaction causes widespread vasodilation
                    (blood vessels relax and widen) and swelling of the airway. Blood pressure drops
                    catastrophically because the vessels can no longer maintain adequate tone.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {[
                      'Insect stings (bees, wasps)',
                      'Nuts (peanuts, tree nuts)',
                      'Medications (antibiotics, NSAIDs)',
                      'Latex, shellfish, certain foods',
                    ].map((cause, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-white/70">
                        <span className="mt-1 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                        <span>{cause}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Neurogenic */}
                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-4 w-4 text-blue-400" />
                    <p className="text-sm font-medium text-blue-400">Neurogenic Shock</p>
                  </div>
                  <p className="text-sm text-white/80 mb-3">
                    A spinal cord injury disrupts the nervous system&rsquo;s control of blood vessel
                    tone. Without sympathetic nerve signals, blood vessels below the injury dilate
                    uncontrollably, causing blood pressure to drop.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {[
                      'Spinal cord injury (trauma to spine)',
                      'Severe head injury affecting brainstem',
                    ].map((cause, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-white/70">
                        <span className="mt-1 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>{cause}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Septic */}
                <div className="bg-teal-500/10 border border-teal-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-4 w-4 text-teal-400" />
                    <p className="text-sm font-medium text-teal-400">Septic Shock</p>
                  </div>
                  <p className="text-sm text-white/80 mb-3">
                    An overwhelming infection triggers a massive systemic inflammatory response.
                    Toxins released by bacteria cause widespread vasodilation and damage to blood
                    vessel walls, leading to dangerously low blood pressure.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {['Severe bacterial infection (sepsis)', 'Infected wounds, pneumonia, UTI'].map(
                      (cause, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-white/70">
                          <span className="mt-1 w-1 h-1 rounded-full bg-teal-400 flex-shrink-0" />
                          <span>{cause}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Comparison Table */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-rose-500/20 border-b border-rose-500/30 px-4 py-3">
                  <p className="text-sm font-semibold text-rose-300">
                    Shock Types &mdash; Quick Comparison
                  </p>
                </div>
                <div className="grid grid-cols-3 text-xs sm:text-sm">
                  <div className="p-3 bg-white/10 font-medium text-white border-b border-white/10">
                    Type
                  </div>
                  <div className="p-3 bg-white/10 font-medium text-white border-b border-l border-white/10">
                    Mechanism
                  </div>
                  <div className="p-3 bg-white/10 font-medium text-white border-b border-l border-white/10">
                    Common Cause
                  </div>

                  <div className="p-3 text-red-300 border-b border-white/10">Hypovolaemic</div>
                  <div className="p-3 text-white/80 border-b border-l border-white/10">
                    Low blood volume
                  </div>
                  <div className="p-3 text-white/80 border-b border-l border-white/10">
                    Bleeding, burns
                  </div>

                  <div className="p-3 text-purple-300 border-b border-white/10">Cardiogenic</div>
                  <div className="p-3 text-white/80 border-b border-l border-white/10">
                    Heart pump failure
                  </div>
                  <div className="p-3 text-white/80 border-b border-l border-white/10">
                    Heart attack
                  </div>

                  <div className="p-3 text-orange-300 border-b border-white/10">Anaphylactic</div>
                  <div className="p-3 text-white/80 border-b border-l border-white/10">
                    Vessel dilation + airway swelling
                  </div>
                  <div className="p-3 text-white/80 border-b border-l border-white/10">
                    Allergic reaction
                  </div>

                  <div className="p-3 text-blue-300 border-b border-white/10">Neurogenic</div>
                  <div className="p-3 text-white/80 border-b border-l border-white/10">
                    Loss of vessel tone
                  </div>
                  <div className="p-3 text-white/80 border-b border-l border-white/10">
                    Spinal injury
                  </div>

                  <div className="p-3 text-teal-300">Septic</div>
                  <div className="p-3 text-white/80 border-l border-white/10">
                    Infection &rarr; inflammation
                  </div>
                  <div className="p-3 text-white/80 border-l border-white/10">Severe infection</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Recognising Shock */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">03</span>
            Recognising Shock
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The signs and symptoms of shock develop as the body attempts to compensate for
                failing circulation. Early recognition is critical &mdash; the sooner shock is
                identified and treated, the better the outcome. As a first aider, you should suspect
                shock in any casualty with significant blood loss, burns, severe injury, or who has
                suffered a medical emergency such as a heart attack.
              </p>

              {/* Signs Recognition Box */}
              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Activity className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Signs &amp; Symptoms of Shock</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      sign: 'Pale, cold, clammy skin',
                      detail:
                        'Grey or ashen appearance in darker skin tones. Check mucous membranes (inside lips, lower eyelids, nail beds).',
                    },
                    {
                      sign: 'Rapid, weak pulse',
                      detail:
                        'The heart beats faster to try to compensate. The pulse becomes thready and difficult to feel as shock worsens.',
                    },
                    {
                      sign: 'Rapid, shallow breathing',
                      detail:
                        'The body increases respiratory rate to try to take in more oxygen to compensate for poor circulation.',
                    },
                    {
                      sign: 'Dizziness and lightheadedness',
                      detail:
                        'Reduced blood flow to the brain causes the casualty to feel faint or unsteady.',
                    },
                    {
                      sign: 'Nausea, possibly vomiting',
                      detail:
                        'Blood is diverted away from the digestive system, causing nausea. Vomiting is a risk if the casualty is given food or drink.',
                    },
                    {
                      sign: 'Thirst',
                      detail:
                        'The body recognises fluid loss and triggers a strong urge to drink. Do NOT give fluids despite this.',
                    },
                    {
                      sign: 'Anxiety, restlessness, confusion',
                      detail:
                        'Reduced oxygen supply to the brain causes agitation, confusion and irrational behaviour.',
                    },
                    {
                      sign: 'Yawning and sighing (air hunger)',
                      detail:
                        'The body attempts to increase oxygen intake through deep involuntary breaths.',
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-rose-400 mb-1">{item.sign}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Late Signs &mdash; Shock Is Worsening
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  If the following signs develop, the casualty&rsquo;s condition is deteriorating
                  rapidly. CPR may be needed at any moment.
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Grey/blue discolouration</strong> (cyanosis) of
                      lips, earlobes and fingertips
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Decreasing level of consciousness</strong>{' '}
                      &mdash; drowsiness, unresponsive to voice
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Loss of consciousness</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Cardiac arrest</strong> &mdash; no pulse, no
                      breathing. Begin CPR immediately.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-white/60" />
                  <p className="text-sm font-medium text-white">
                    Recognising Shock in Darker Skin Tones
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Pallor and cyanosis may not be visible on the skin surface in people with darker
                  skin tones. Instead, check the{' '}
                  <strong className="text-white">mucous membranes</strong>: gently pull down the
                  lower eyelid (the conjunctiva should appear pink, not pale), look inside the lips,
                  check the nail beds, and examine the palms of the hands. In shock, these areas
                  will appear pale, grey or ashen rather than their normal healthy pink colour. Also
                  rely on <strong className="text-white">tactile signs</strong> &mdash; cold, clammy
                  skin is equally reliable regardless of skin tone.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Treatment of Shock */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">04</span>
            Treatment of Shock
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The treatment of shock focuses on maximising the blood supply to the vital organs
                while addressing the underlying cause. Time is critical &mdash; shock can
                deteriorate rapidly, so early intervention and a 999 call are essential.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Treatment Sequence &mdash; Step by Step
                </p>
                <div className="space-y-3">
                  {[
                    {
                      step: '1',
                      title: 'Call 999 immediately',
                      desc: 'Shock is a life-threatening emergency. Request an ambulance and state that the casualty is showing signs of shock.',
                    },
                    {
                      step: '2',
                      title: 'Treat the underlying cause',
                      desc: 'If possible, address what is causing the shock: control bleeding with direct pressure and dressings, cool burns with running water, etc.',
                    },
                    {
                      step: '3',
                      title: 'Lie the casualty flat on their back',
                      desc: 'A supine (lying flat) position helps maintain blood flow to the brain and vital organs. Use a blanket or coat underneath them if on cold ground.',
                    },
                    {
                      step: '4',
                      title: 'Raise their legs 15-30cm',
                      desc: 'Elevating the legs above the level of the heart improves venous return — helping blood flow back to the heart and brain. Support the legs on a bag, box, or rolled blanket.',
                    },
                    {
                      step: '5',
                      title: 'Keep the casualty warm',
                      desc: "Cover with blankets, coats or a foil blanket to prevent heat loss. Shock impairs the body's ability to regulate temperature. Do NOT overheat — just prevent cooling.",
                    },
                    {
                      step: '6',
                      title: 'Reassure and monitor continuously',
                      desc: 'Talk to the casualty calmly. Monitor breathing, pulse and level of consciousness. Note any changes to report to the ambulance crew.',
                    },
                    {
                      step: '7',
                      title: 'Be prepared for CPR',
                      desc: 'If the casualty loses consciousness but is breathing, place them in the recovery position. If they stop breathing, begin CPR immediately.',
                    },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                        {item.step}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">{item.title}</p>
                        <p className="text-sm text-white/80">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Do / Don't Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-3">DO</p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Call 999 immediately</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Control any bleeding</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Lie flat, raise legs 15&ndash;30cm</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Keep warm with blankets</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Reassure and keep talking to them</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Monitor continuously until help arrives</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-3">DO NOT</p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Give food or drink (risk of vomiting; may need surgery)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Raise legs if fracture, spinal injury, or it causes pain</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Overheat the casualty (prevent cooling only)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Move the casualty unnecessarily</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Leave the casualty unattended</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Allow them to smoke (reduces oxygen in the blood)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Link2 className="h-5 w-5 text-white/60" />
                  <p className="text-sm font-medium text-white">
                    If the Casualty Becomes Unconscious
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Unconscious but breathing:</strong> Place in
                      the recovery position to protect the airway. Continue to monitor breathing
                      until the ambulance arrives.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Unconscious and not breathing:</strong> Begin
                      CPR immediately. Send someone to fetch an AED (defibrillator) if available.
                      Continue CPR until the ambulance service takes over.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Anaphylaxis */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">05</span>
            Anaphylaxis &mdash; Recognition &amp; Treatment
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Anaphylaxis</strong> is a severe, life-threatening allergic reaction that
                develops rapidly &mdash; typically within minutes of exposure to a trigger allergen.
                It affects multiple body systems simultaneously and can cause death if not treated
                promptly with adrenaline. Anaphylaxis is one of the few first aid emergencies where
                a specific medication (adrenaline) may need to be administered by a first aider.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Key Definition &mdash; Anaphylaxis
                </p>
                <p className="text-sm text-white">
                  A severe systemic allergic reaction involving two or more body systems (skin,
                  respiratory, cardiovascular, gastrointestinal). It is characterised by a rapid
                  onset, airway compromise and/or breathing difficulty and/or circulatory collapse.
                  The UK Resuscitation Council defines anaphylaxis as{' '}
                  <strong>
                    &ldquo;a severe, life-threatening, generalised or systemic hypersensitivity
                    reaction&rdquo;
                  </strong>
                  .
                </p>
              </div>

              {/* Common Triggers */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Common Triggers of Anaphylaxis
                </p>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-orange-400 mb-2">Insect Stings</p>
                    <ul className="text-xs text-white/70 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                        <span>Bee stings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                        <span>Wasp stings</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-amber-400 mb-2">Foods</p>
                    <ul className="text-xs text-white/70 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Peanuts &amp; tree nuts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Shellfish</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Milk, eggs, soya</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-purple-400 mb-2">Other</p>
                    <ul className="text-xs text-white/70 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Latex</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Antibiotics, NSAIDs</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Recognition by System */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-rose-500/20 border-b border-rose-500/30 px-4 py-3">
                  <p className="text-sm font-semibold text-rose-300">
                    Recognition of Anaphylaxis &mdash; by Body System
                  </p>
                </div>

                <div className="p-4 border-b border-white/5">
                  <div className="grid md:grid-cols-[140px_1fr] gap-3">
                    <div>
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-red-500/30 text-red-300 text-xs font-bold">
                        AIRWAY
                      </span>
                    </div>
                    <div>
                      <ul className="text-sm text-white/80 space-y-1">
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                          <span>Swelling of the tongue and/or throat</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                          <span>Hoarse voice, difficulty speaking</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                          <span>Stridor (high-pitched inspiratory noise)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                          <span>Difficulty swallowing</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-b border-white/5">
                  <div className="grid md:grid-cols-[140px_1fr] gap-3">
                    <div>
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-orange-500/30 text-orange-300 text-xs font-bold">
                        BREATHING
                      </span>
                    </div>
                    <div>
                      <ul className="text-sm text-white/80 space-y-1">
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                          <span>Wheeze (bronchospasm)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                          <span>Shortness of breath</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                          <span>Increased respiratory rate</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                          <span>Respiratory distress, use of accessory muscles</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-b border-white/5">
                  <div className="grid md:grid-cols-[140px_1fr] gap-3">
                    <div>
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-purple-500/30 text-purple-300 text-xs font-bold">
                        CIRCULATION
                      </span>
                    </div>
                    <div>
                      <ul className="text-sm text-white/80 space-y-1">
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                          <span>Dizziness, feeling faint</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                          <span>Pale, cold, clammy skin</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                          <span>Low blood pressure, rapid weak pulse</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                          <span>Collapse, cardiac arrest</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-b border-white/5">
                  <div className="grid md:grid-cols-[140px_1fr] gap-3">
                    <div>
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-pink-500/30 text-pink-300 text-xs font-bold">
                        SKIN
                      </span>
                    </div>
                    <div>
                      <ul className="text-sm text-white/80 space-y-1">
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-pink-400 flex-shrink-0" />
                          <span>
                            Widespread urticaria (hives) &mdash; raised, itchy red welts across the
                            body
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-pink-400 flex-shrink-0" />
                          <span>Generalised flushing and itching</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-pink-400 flex-shrink-0" />
                          <span>Angioedema (swelling of lips, eyelids, face)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="grid md:grid-cols-[140px_1fr] gap-3">
                    <div>
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-teal-500/30 text-teal-300 text-xs font-bold">
                        GI / OTHER
                      </span>
                    </div>
                    <div>
                      <ul className="text-sm text-white/80 space-y-1">
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-teal-400 flex-shrink-0" />
                          <span>Abdominal pain, nausea, vomiting</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-teal-400 flex-shrink-0" />
                          <span>Diarrhoea</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-teal-400 flex-shrink-0" />
                          <span>Anxiety, sense of impending doom</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Adrenaline Auto-Injectors & Positioning */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">06</span>
            Adrenaline Auto-Injectors &amp; Positioning
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Adrenaline (epinephrine) is the first-line treatment for anaphylaxis. It works by
                reversing the effects of the allergic reaction: constricting blood vessels to raise
                blood pressure, relaxing the airway muscles to ease breathing, and reducing
                swelling. In the UK, adrenaline auto-injectors are available in three brands, all
                delivering the same drug but with slightly different operating mechanisms.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Syringe className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Key Facts &mdash; Adrenaline Auto-Injectors
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Injection site:</strong> Outer mid-thigh
                      (vastus lateralis muscle) &mdash; can be given through clothing
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Adult dose:</strong> 300 micrograms (adults and
                      children over 30kg)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Junior dose:</strong> 150 micrograms (children
                      15&ndash;30kg)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Second dose:</strong> If no improvement after 5
                      minutes, give a second dose using a <strong>second device</strong>{' '}
                      (auto-injectors are single-use)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">ALWAYS call 999</strong> after using an
                      auto-injector, even if symptoms improve &mdash; biphasic reactions can occur
                      hours later
                    </span>
                  </li>
                </ul>
              </div>

              {/* Auto-Injector Comparison Table */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-rose-500/20 border-b border-rose-500/30 px-4 py-3">
                  <p className="text-sm font-semibold text-rose-300">UK Auto-Injector Comparison</p>
                </div>
                <div className="grid grid-cols-4 text-xs sm:text-sm">
                  {/* Header Row */}
                  <div className="p-3 bg-white/10 font-medium text-white border-b border-white/10">
                    &nbsp;
                  </div>
                  <div className="p-3 bg-white/10 font-medium text-amber-400 border-b border-l border-white/10 text-center">
                    EpiPen
                  </div>
                  <div className="p-3 bg-white/10 font-medium text-blue-400 border-b border-l border-white/10 text-center">
                    Jext
                  </div>
                  <div className="p-3 bg-white/10 font-medium text-green-400 border-b border-l border-white/10 text-center">
                    Emerade
                  </div>

                  {/* Safety Cap */}
                  <div className="p-3 text-white/80 border-b border-white/10">Safety cap</div>
                  <div className="p-3 text-white/80 border-b border-l border-white/10 text-center">
                    Blue cap (pull off)
                  </div>
                  <div className="p-3 text-white/80 border-b border-l border-white/10 text-center">
                    Yellow cap (pull off)
                  </div>
                  <div className="p-3 text-white/80 border-b border-l border-white/10 text-center">
                    Needle shield cap (pull off)
                  </div>

                  {/* Activation */}
                  <div className="p-3 text-white/80 border-b border-white/10">Activation</div>
                  <div className="p-3 text-white/80 border-b border-l border-white/10 text-center">
                    Press orange tip firmly against thigh
                  </div>
                  <div className="p-3 text-white/80 border-b border-l border-white/10 text-center">
                    Press black tip firmly against thigh
                  </div>
                  <div className="p-3 text-white/80 border-b border-l border-white/10 text-center">
                    Press needle end firmly against thigh
                  </div>

                  {/* Hold Time */}
                  <div className="p-3 text-white/80 border-b border-white/10">Hold time</div>
                  <div className="p-3 text-amber-300 font-medium border-b border-l border-white/10 text-center">
                    10 seconds
                  </div>
                  <div className="p-3 text-blue-300 font-medium border-b border-l border-white/10 text-center">
                    10 seconds
                  </div>
                  <div className="p-3 text-green-300 font-medium border-b border-l border-white/10 text-center">
                    5 seconds
                  </div>

                  {/* Adult Dose */}
                  <div className="p-3 text-white/80 border-b border-white/10">Adult dose</div>
                  <div className="p-3 text-white/80 border-b border-l border-white/10 text-center">
                    300&micro;g
                  </div>
                  <div className="p-3 text-white/80 border-b border-l border-white/10 text-center">
                    300&micro;g
                  </div>
                  <div className="p-3 text-white/80 border-b border-l border-white/10 text-center">
                    300&micro;g
                  </div>

                  {/* Junior Dose */}
                  <div className="p-3 text-white/80">Junior dose</div>
                  <div className="p-3 text-white/80 border-l border-white/10 text-center">
                    150&micro;g
                  </div>
                  <div className="p-3 text-white/80 border-l border-white/10 text-center">
                    150&micro;g
                  </div>
                  <div className="p-3 text-white/80 border-l border-white/10 text-center">
                    150&micro;g
                  </div>
                </div>
              </div>

              {/* Administration Steps */}
              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  How to Use an Auto-Injector &mdash; General Steps
                </p>
                <div className="space-y-3">
                  {[
                    {
                      step: '1',
                      title: 'Remove the safety cap',
                      desc: 'Pull off the safety cap as instructed on the device. Do not touch the injection end.',
                    },
                    {
                      step: '2',
                      title: 'Position against outer mid-thigh',
                      desc: 'Hold the auto-injector in your fist. Place the injection end (tip) firmly against the outer mid-thigh. Can be given through clothing — do not waste time removing trousers.',
                    },
                    {
                      step: '3',
                      title: 'Press firmly and hold',
                      desc: 'Press the device firmly into the thigh until it clicks (activating the needle). Hold in place for the required time: 10 seconds (EpiPen and Jext) or 5 seconds (Emerade).',
                    },
                    {
                      step: '4',
                      title: 'Remove and massage the site',
                      desc: 'Remove the auto-injector from the thigh. Gently massage the injection site for 10 seconds to aid absorption of the adrenaline.',
                    },
                    {
                      step: '5',
                      title: 'Call 999 and monitor',
                      desc: 'Call 999 immediately if not already done. Note the time of the injection. If no improvement after 5 minutes, administer a second dose with a new device.',
                    },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                        {item.step}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">{item.title}</p>
                        <p className="text-sm text-white/80">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Positioning for Anaphylaxis */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Positioning the Casualty in Anaphylaxis
                </p>
                <p className="text-sm text-white/80 mb-4">
                  The correct position depends on the casualty&rsquo;s predominant symptoms. Getting
                  the position wrong can worsen their condition.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-lg">
                    <p className="text-xs font-medium text-blue-400 mb-2">
                      Breathing Difficulty Predominant
                    </p>
                    <p className="text-xs text-white/70">
                      <strong className="text-white">Sit upright.</strong> This position reduces the
                      work of breathing and uses gravity to help keep the airway open. Support the
                      casualty in a comfortable sitting position.
                    </p>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/30 p-3 rounded-lg">
                    <p className="text-xs font-medium text-purple-400 mb-2">
                      Feeling Faint or Dizzy
                    </p>
                    <p className="text-xs text-white/70">
                      <strong className="text-white">Lie flat with legs raised.</strong> Low blood
                      pressure is the predominant problem. Raising the legs improves venous return
                      and helps maintain blood flow to the brain.
                    </p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                    <p className="text-xs font-medium text-green-400 mb-2">
                      Unconscious but Breathing
                    </p>
                    <p className="text-xs text-white/70">
                      <strong className="text-white">Recovery position.</strong> Protect the airway
                      by placing the casualty on their side. Continue to monitor breathing closely.
                    </p>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg">
                    <p className="text-xs font-medium text-amber-400 mb-2">Pregnant Casualty</p>
                    <p className="text-xs text-white/70">
                      <strong className="text-white">Left lateral position.</strong> Lie on the left
                      side to prevent the weight of the uterus from compressing the inferior vena
                      cava, which would further reduce blood return to the heart.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    NEVER Stand a Casualty with Anaphylaxis Up
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Standing or sitting upright suddenly (when the casualty is hypotensive) can cause
                  a fatal cardiac arrest. The already dangerously low blood pressure drops further
                  when the casualty stands, as blood pools in the legs due to gravity and the
                  dilated blood vessels cannot compensate. This is sometimes referred to as{' '}
                  <strong className="text-white">&ldquo;empty ventricle syndrome&rdquo;</strong>. If
                  the casualty asks to stand or walk, calmly explain that they must remain lying
                  down until the ambulance arrives.
                </p>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Why ALWAYS Call 999 After Using an Auto-Injector?
                </p>
                <p className="text-sm text-white/80">
                  Even if the adrenaline works and the casualty&rsquo;s symptoms resolve completely,
                  a <strong className="text-white">biphasic reaction</strong> can occur &mdash; a
                  second wave of anaphylaxis that returns hours later (typically 4&ndash;12 hours,
                  sometimes up to 72 hours). The biphasic reaction can be equally severe or more
                  severe than the original episode. Hospital observation is essential to ensure the
                  casualty receives prompt treatment if symptoms return.
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
        <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />

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
            <Link to="../first-aid-module-4">
              Next: Module 4 &mdash; Medical Emergencies
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
