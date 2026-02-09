import { ArrowLeft, Scissors, CheckCircle, AlertTriangle, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'fa-embedded-object',
    question:
      'A colleague has a large shard of glass embedded in their forearm. What is the correct first aid response?',
    options: [
      'Carefully remove the glass, then apply direct pressure to the wound',
      'Leave the object in place, build dressings around it, apply indirect pressure either side, and call 999',
      'Pull the glass out quickly to minimise pain, then bandage tightly',
      'Ignore the object and apply a tourniquet above the wound',
    ],
    correctIndex: 1,
    explanation:
      'You must NEVER remove an embedded object. Removing it can cause further damage to blood vessels, nerves, and tissues, and may dramatically increase bleeding. Instead, leave the object in place, build dressings around it to stabilise it, apply indirect pressure either side of the object, and call 999 for large or deep objects.',
  },
  {
    id: 'fa-chest-wound-seal',
    question: 'When sealing an open (sucking) chest wound, how should the seal be applied?',
    options: [
      'Seal all four sides completely to make it airtight',
      'Leave all four sides open and just place a loose dressing over the wound',
      'Seal the dressing on three sides, leaving the fourth open to act as a flutter valve',
      'Do not cover the wound at all — let it breathe',
    ],
    correctIndex: 2,
    explanation:
      'An open chest wound must be sealed on three sides only. The open side acts as a flutter valve — when the casualty breathes out, air escapes through the open edge, but when they breathe in, the seal closes against the chest wall, preventing air from entering the chest cavity. This helps prevent a tension pneumothorax.',
  },
  {
    id: 'fa-infection-signs',
    question: 'Which of the following is a sign that a wound may be becoming infected?',
    options: [
      'The wound is dry and painless after 24 hours',
      'A thin scab has formed over the wound',
      'Increasing redness spreading from the wound edges, swelling, warmth, and pus',
      'The surrounding skin is the same colour as the rest of the arm',
    ],
    correctIndex: 2,
    explanation:
      'Signs of wound infection include increasing pain, redness spreading from the wound edges, swelling, warmth, pus or discharge, red streaks tracking from the wound (lymphangitis), fever, and feeling generally unwell. A dry, scabbed wound with no spreading redness is healing normally.',
  },
];

const faqs = [
  {
    question: 'Should I wash a wound with antiseptic solution?',
    answer:
      'Current best practice for most minor wounds is to clean them under running tap water. Antiseptic solutions are not routinely recommended for initial wound cleaning as they can damage healthy tissue and delay healing. Running water is effective at removing dirt and debris. If the wound is heavily contaminated (e.g. with soil or animal matter), irrigation with sterile saline is preferable. Antiseptic wipes or sprays may be used for surrounding skin but should not be poured directly into the wound.',
  },
  {
    question: 'What should I do if blood soaks through a dressing?',
    answer:
      'Do NOT remove the original dressing. Instead, apply a second dressing on top of the first and continue applying firm direct pressure. Removing the first dressing can disturb any clot that is forming and restart bleeding. If blood soaks through the second dressing as well, remove both dressings, repack the wound if possible, and apply a fresh dressing with firm pressure. If severe bleeding cannot be controlled, consider the use of a tourniquet (if trained) and call 999 immediately.',
  },
  {
    question: 'When should a casualty with a wound go to hospital?',
    answer:
      'A casualty should attend hospital (A&amp;E or minor injuries unit) if the wound is deep, long, or gaping and may need stitches or closure strips; if it was caused by a dirty or rusty object (tetanus risk); if there is an embedded object; if the wound is on the face, hand, or over a joint; if there are signs of infection; if bleeding cannot be controlled; if the wound involves the chest or abdomen; if there is numbness or loss of movement beyond the wound; or if the casualty has not had a tetanus booster within the last 10 years.',
  },
  {
    question: 'How do I dispose of blood-contaminated waste on a construction site?',
    answer:
      'Used dressings, gloves, and other materials contaminated with blood or bodily fluids should be placed in a clinical waste bag (yellow bag) if available, or in a sealed plastic bag if clinical waste disposal is not on site. Blood spillages should be cleaned using a 1:10 bleach solution while wearing nitrile gloves. Sharps must never be recapped and should be placed in a proper sharps container. All blood or bodily fluid exposures (including needle stick injuries) must be reported to the employer immediately under COSHH and workplace health and safety procedures.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the first step in treating a minor wound?',
    options: [
      'Apply an antiseptic cream immediately',
      'Clean the wound under running tap water',
      'Cover it with a dry bandage without cleaning',
      'Apply a tourniquet above the wound',
    ],
    correctAnswer: 1,
    explanation:
      'The first step for a minor wound is to clean it under running tap water to remove dirt and debris. This reduces the risk of infection. Antiseptic is not routinely recommended for wound cleaning, and tourniquets are only for life-threatening limb bleeding.',
  },
  {
    id: 2,
    question: 'A worker has a nail embedded in their hand. What should you do?',
    options: [
      'Pull the nail out and apply direct pressure',
      'Leave the nail in place, build dressings around it, apply indirect pressure, and seek medical help',
      'Push the nail further in to prevent it moving',
      'Bend the nail flat against the skin and bandage over it',
    ],
    correctAnswer: 1,
    explanation:
      'Never remove an embedded object. The object may be plugging a damaged blood vessel, and removal can cause catastrophic bleeding and further tissue damage. Build dressings around the object to stabilise it, apply indirect pressure either side, and arrange for medical treatment.',
  },
  {
    id: 3,
    question:
      'A casualty has an open abdominal wound with organs visible. What is the correct treatment?',
    options: [
      'Push the organs back into the abdomen and cover with a dressing',
      'Cover with cling film or a large sterile dressing moistened with clean water, do NOT push organs back, lie casualty on back with knees raised, and call 999',
      'Leave the wound uncovered and wait for the ambulance',
      'Give the casualty water to drink and sit them upright',
    ],
    correctAnswer: 1,
    explanation:
      'Never push exposed organs back into the abdomen. Cover the wound with cling film or a moistened sterile dressing to prevent the organs from drying out. Lie the casualty on their back with knees raised and supported to reduce tension on the abdominal muscles. Give nothing by mouth. Call 999 immediately.',
  },
  {
    id: 4,
    question: 'How should you seal an open (sucking) chest wound?',
    options: [
      'Seal all four sides of the dressing tightly',
      'Leave the wound completely uncovered',
      'Seal the dressing on three sides, leaving one side open as a flutter valve',
      'Pack the wound with gauze and seal completely',
    ],
    correctAnswer: 2,
    explanation:
      'An open chest wound should be sealed on three sides, leaving the fourth side open. This creates a flutter valve — air can escape from the chest cavity on exhalation through the open edge, but the seal closes on inhalation, preventing air from being sucked into the chest. This helps prevent a life-threatening tension pneumothorax.',
  },
  {
    id: 5,
    question:
      'A casualty has a scalp wound that is bleeding profusely. You suspect a possible skull fracture. What should you do?',
    options: [
      'Apply firm direct pressure to the wound to stop the bleeding',
      'Apply gentle pressure with a sterile pad — do not press hard if you suspect a fracture underneath — and call 999',
      'Tilt the head back to slow the bleeding',
      'Pack the wound tightly with cotton wool',
    ],
    correctAnswer: 1,
    explanation:
      'Scalp wounds bleed profusely due to the rich blood supply to the scalp. Apply gentle direct pressure with a sterile pad, but be cautious — if you suspect a skull fracture underneath, do not press hard as this could push broken bone into the brain. If clear fluid (CSF) is draining from the wound or ears, do NOT attempt to stop it. Call 999.',
  },
  {
    id: 6,
    question: 'Which type of dressing is most appropriate for a burn or weeping wound?',
    options: [
      'An adhesive plaster',
      'A crepe bandage applied directly to the wound',
      'A non-adherent dressing',
      'A conforming bandage applied directly to the wound',
    ],
    correctAnswer: 2,
    explanation:
      'Non-adherent dressings are specifically designed for burns and weeping wounds because they will not stick to the wound bed. This prevents further tissue damage and pain when the dressing is changed. Adhesive plasters, crepe bandages, and conforming bandages can all stick to a moist wound surface.',
  },
  {
    id: 7,
    question:
      'Red streaks tracking away from a wound along the skin are a sign of which condition?',
    options: [
      'Normal healing',
      'An allergic reaction to the dressing',
      'Lymphangitis — a sign of spreading infection',
      'A bruise forming under the skin',
    ],
    correctAnswer: 2,
    explanation:
      'Red streaks tracking from a wound (lymphangitis) indicate that infection is spreading along the lymphatic vessels. This is a serious sign that requires prompt medical attention — the casualty should see a GP or attend a minor injuries unit urgently, as untreated lymphangitis can progress to sepsis.',
  },
  {
    id: 8,
    question:
      'Which of the following is correct cross-contamination prevention when treating a bleeding wound?',
    options: [
      'Rinse used dressings under the tap and reuse them',
      'Wear nitrile gloves, wash hands before and after treatment, and dispose of dressings in a sealed bag or clinical waste',
      'Only wear gloves if the casualty has a known blood-borne disease',
      'Use your bare hands for better dexterity and wash them afterwards',
    ],
    correctAnswer: 1,
    explanation:
      "Cross-contamination prevention requires wearing nitrile gloves for ALL wound treatment (you cannot know a casualty's blood-borne infection status), washing hands before and after, disposing of used dressings in clinical waste (yellow bag) or a sealed plastic bag, covering your own cuts, and using a face shield for rescue breathing.",
  },
];

export default function FirstAidModule3Section2() {
  useSEO({
    title: 'Wound Management & Infection Prevention | First Aid Module 3.2',
    description:
      'Minor wound care, embedded objects, abdominal and chest wounds, scalp injuries, infection signs, dressing types, and cross-contamination prevention for first aiders in UK workplaces.',
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
            <Scissors className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 3 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Wound Management &amp; Infection Prevention
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Minor wound care, embedded objects, abdominal and chest wounds, scalp injuries,
            recognising infection, dressing selection, and preventing cross-contamination
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Minor wounds:</strong> Clean under running water, pat dry, sterile dressing
              </li>
              <li>
                <strong>Embedded objects:</strong> NEVER remove &mdash; build dressings around,
                indirect pressure
              </li>
              <li>
                <strong>Chest wound:</strong> Seal on 3 sides (flutter valve), sit upright
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Gloves:</strong> Nitrile gloves for ALL wound treatment
              </li>
              <li>
                <strong>Infection signs:</strong> Redness, swelling, warmth, pus, red streaks, fever
              </li>
              <li>
                <strong>Waste:</strong> Clinical waste bag (yellow) or sealed plastic bag
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Demonstrate correct treatment of a minor wound including cleaning and dressing',
              'Explain why an embedded object must never be removed and how to manage it',
              'Describe the first aid treatment for open and closed abdominal wounds',
              'Apply a three-sided seal to an open chest wound and explain the flutter valve principle',
              'Recognise the signs and symptoms of wound infection and advise the casualty appropriately',
              'Select appropriate dressings for different wound types and apply cross-contamination controls',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Minor Wound Care */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">01</span>
            Minor Wound Care
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The majority of wounds encountered in the workplace are minor &mdash; small cuts,
                grazes, scratches, and abrasions that do not involve significant bleeding or damage
                to deeper structures. Although these injuries are not life-threatening, correct
                treatment is important to prevent infection and promote healing.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key Principle:</strong> The aim of minor wound
                  care is to stop any bleeding, clean the wound to remove contaminants, protect it
                  from further contamination, and monitor for signs of infection. You are not trying
                  to close or stitch the wound &mdash; that is a medical procedure beyond the scope
                  of first aid.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Step-by-Step: Treating a Minor Wound
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">1. Wash your hands</strong> and put on nitrile
                      gloves before touching the wound or any dressings
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">2. Clean under running tap water</strong>{' '}
                      &mdash; hold the wound under gently running water for at least 1&ndash;2
                      minutes to flush out dirt, dust, and debris. Do not use antiseptic solution on
                      the wound itself as this can damage healthy tissue
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">3. Pat dry</strong> gently with a clean,
                      sterile gauze pad. Do not rub the wound as this can cause further tissue
                      damage
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">4. Apply a sterile dressing</strong>{' '}
                      appropriate to the wound size and location. For small cuts and grazes, an
                      adhesive dressing (plaster) is usually sufficient. Check for allergies before
                      applying adhesive dressings
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">5. Monitor for infection</strong> &mdash;
                      advise the casualty to watch for increasing pain, redness, swelling, warmth,
                      or discharge over the following days. If any of these develop, they should see
                      a GP or attend a minor injuries unit
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                For minor cuts with clean, straight edges (such as a clean knife cut), wound closure
                strips (Steri-Strips) may be used to hold the wound edges together, provided the
                wound is clean and not deep. Apply the strips across the wound, pulling the edges
                together gently. Do not use closure strips on wounds that are dirty, jagged, deep,
                or potentially contaminated &mdash; these require medical assessment.
              </p>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">Tetanus Risk</p>
                </div>
                <p className="text-sm text-white/80">
                  Any wound caused by a dirty or rusty object, a wound contaminated with soil or
                  manure, a deep puncture wound, or an animal bite carries a risk of tetanus
                  infection. If the casualty has not had a tetanus booster within the last 10 years
                  (or is unsure of their vaccination status), advise them to attend a GP surgery or
                  A&amp;E department for assessment. On construction sites, puncture wounds from
                  nails, wire, and contaminated metal are a particular risk.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Embedded Objects */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">02</span>
            Embedded Objects
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                An embedded object is any foreign body that has penetrated the skin and become
                lodged in the tissue beneath &mdash; for example, a knife, piece of glass, metal
                shard, nail, or splinter of wood. Embedded objects are common on construction sites
                and in industrial workplaces.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Critical Rule: NEVER Remove an Embedded Object
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Never attempt to remove an embedded object from a wound. The object may be
                  plugging a damaged blood vessel, and removing it can cause catastrophic bleeding.
                  It may also be pressing against nerves, tendons, or organs, and removal could
                  cause further damage. Only medical professionals in a hospital setting &mdash;
                  with imaging, surgical instruments, and the ability to control bleeding &mdash;
                  should remove embedded objects.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Step-by-Step: Managing an Embedded Object
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">1. Do NOT remove the object</strong> &mdash;
                      regardless of its size or how easy it looks to pull out, leave it in place
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">2. Build dressings around the object</strong>{' '}
                      &mdash; use rolled gauze, triangular bandage material, or any clean padding to
                      build up either side of the object, creating a &ldquo;nest&rdquo; that
                      prevents the object from moving
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">3. Apply indirect pressure</strong> &mdash;
                      press firmly on the tissue either side of the object to control bleeding, but
                      do NOT press on the object itself
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">4. Bandage around the object</strong> &mdash;
                      secure the padding in place with a bandage, taking care not to press on the
                      object or push it deeper. The bandage should hold the dressings firmly but not
                      constrict circulation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">5. Keep the casualty still</strong> &mdash;
                      movement can cause the object to shift and increase damage. Immobilise the
                      affected area if possible
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">6. Call 999</strong> for large, deep, or
                      dangerously located embedded objects. Small superficial splinters that are
                      clearly visible and just below the skin surface may be gently eased out with
                      clean tweezers, but if in doubt, leave it and seek medical advice
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                While waiting for the ambulance, monitor the casualty for signs of shock &mdash;
                pale, cold, clammy skin, rapid pulse, rapid breathing, and confusion. If the
                embedded object is in a limb, elevate the limb above the level of the heart (if this
                does not cause more pain or movement of the object) to help reduce bleeding.
                Reassure the casualty and keep them warm.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Construction Site Context:</strong> On building
                  sites, common embedded objects include nails (particularly from nail guns),
                  screws, metal shards from angle grinders, glass fragments, and splinters from
                  timber. The same rules apply regardless of the object &mdash; leave it in place,
                  build around it, control bleeding indirectly, and get the casualty to hospital.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Abdominal Wounds */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">03</span>
            Abdominal Wounds
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Abdominal injuries can be either <strong>open</strong> (where the skin is broken and
                internal organs may be visible or protruding) or <strong>closed</strong> (where the
                skin is intact but internal organs may be damaged by blunt force). Both types are
                serious, potentially life-threatening emergencies requiring immediate 999
                activation.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <p className="text-sm font-medium text-red-400">Open Abdominal Wound</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Call 999</strong> immediately &mdash; this is
                        a life-threatening emergency
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Do NOT push organs back in</strong> &mdash;
                        this risks contamination and further damage
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Cover the wound</strong> with cling film or a
                        large sterile dressing moistened with clean water to prevent the organs from
                        drying out
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Position:</strong> Lie the casualty on their
                        back with knees raised and supported (pillows, rolled blanket, or similar)
                        to reduce tension on the abdominal muscles
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Nil by mouth</strong> &mdash; do NOT give
                        food, drink, or medication. The casualty will almost certainly need surgery,
                        and an empty stomach reduces anaesthetic complications
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        Treat for shock &mdash; keep warm, reassure, and monitor breathing
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-5 w-5 text-amber-400" />
                    <p className="text-sm font-medium text-amber-400">Closed Abdominal Injury</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Call 999</strong> &mdash; internal bleeding
                        from damaged organs can be life-threatening even when no wound is visible
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Position:</strong> Lie the casualty flat on
                        their back, raise knees if comfortable
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Nil by mouth</strong> &mdash; give nothing to
                        eat or drink
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Treat for shock</strong> &mdash; keep warm
                        with a blanket, reassure the casualty, and monitor their level of
                        consciousness
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Signs to watch for:</strong> rigid or tender
                        abdomen, bruising, nausea, vomiting (possibly with blood), pale cold skin,
                        rapid weak pulse, increasing pain
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Do NOT apply pressure to the abdomen</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Why Knees Up?</strong> Raising and supporting
                  the casualty&rsquo;s knees takes tension off the abdominal wall muscles. This
                  reduces pain, makes breathing easier, and helps prevent further protrusion of
                  organs in an open wound. Use whatever is available &mdash; a rolled-up coat, a
                  pillow, a rucksack, or folded blankets &mdash; to support the knees in a
                  comfortable bent position.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Chest Wounds */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">04</span>
            Chest Wounds
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                An open chest wound &mdash; sometimes called a <strong>sucking chest wound</strong>{' '}
                &mdash; occurs when the chest wall is penetrated, creating a direct communication
                between the outside air and the space around the lungs (the pleural cavity). Air can
                be sucked into the chest cavity through the wound each time the casualty breathes
                in, but cannot easily escape. This causes the lung on the injured side to collapse
                (pneumothorax) and, if untreated, can progress to a life-threatening{' '}
                <strong>tension pneumothorax</strong> where pressure builds up in the chest,
                compressing the heart and the uninjured lung.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Open Chest Wound &mdash; Immediate Action
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  You will recognise an open chest wound by a wound to the chest that
                  &ldquo;sucks&rdquo; or &ldquo;bubbles&rdquo; as the casualty breathes. There may
                  be a hissing or sucking sound. Blood may be frothy or bubbly. The casualty will be
                  in severe pain and increasingly short of breath.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Step-by-Step: Treating an Open Chest Wound
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">1. Call 999</strong> immediately &mdash; this
                      is a life-threatening emergency
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">2. Cover the wound immediately</strong> with a
                      non-porous material &mdash; use a plastic bag, cling film, the foil wrapper
                      from a dressing pack, or a commercial chest seal if available
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">3. Seal on three sides only</strong> &mdash;
                      tape or hold the covering in place on three sides, leaving the{' '}
                      <strong className="text-white">bottom edge open</strong>. This creates a{' '}
                      <strong className="text-rose-400">flutter valve</strong>: when the casualty
                      breathes in, the seal is sucked against the chest wall and prevents air
                      entering; when they breathe out, the open edge lifts and allows trapped air to
                      escape
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">4. Sit the casualty upright</strong> and lean
                      them slightly towards the injured side. This uses gravity to help the
                      uninjured lung work and reduces pressure on the heart
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">5. Monitor breathing closely</strong> &mdash;
                      if the casualty&rsquo;s breathing deteriorates despite the flutter valve (they
                      become more breathless, their colour worsens, or they become confused),
                      briefly lift the seal to release any trapped air, then reseal
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">6. Treat for shock</strong> and be prepared to
                      commence CPR if the casualty becomes unresponsive and stops breathing normally
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Why Three Sides, Not Four?</strong> If the wound
                  is sealed completely on all four sides, any air already trapped in the chest
                  cavity &mdash; or air leaking from a damaged lung &mdash; has no way to escape.
                  Pressure builds up inside the chest (tension pneumothorax), compressing the heart
                  and great vessels, and the casualty can rapidly deteriorate and die. The open edge
                  of the three-sided seal prevents this by allowing air out but not in.
                </p>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    If Breathing Deteriorates After Sealing
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  If the casualty&rsquo;s condition worsens after applying the three-sided seal
                  &mdash; increasing breathlessness, worsening colour, distended neck veins, or the
                  trachea (windpipe) appearing to shift to one side &mdash; suspect a tension
                  pneumothorax developing. Briefly peel back the seal to allow trapped air to escape
                  (you may hear a rush of air), then reseal. Repeat as necessary. This is a
                  temporising measure only &mdash; definitive treatment requires paramedic or
                  hospital intervention.
                </p>
              </div>

              <p>
                If a commercial chest seal (such as an Asherman or HyFin chest seal) is available in
                the first aid kit, use this in preference to improvised materials. These devices are
                specifically designed with a built-in one-way valve that allows air out but not in,
                removing the need to tape on three sides manually. They are increasingly common in
                workplace first aid kits, particularly on high-risk sites.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Scalp Wounds */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">05</span>
            Scalp Wounds
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Scalp wounds bleed profusely &mdash; often alarmingly so &mdash; because the scalp
                has a very rich blood supply. Even a relatively small scalp laceration can produce a
                large amount of blood. This does not necessarily mean the injury is serious, but the
                primary concern with any scalp wound is the possibility of a{' '}
                <strong>skull fracture</strong> underneath.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Treating a Scalp Wound</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Apply gentle direct pressure</strong> with a
                      sterile pad or clean dressing over the wound
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Be cautious of skull fracture</strong> &mdash;
                      if you feel a soft or boggy area, a depression in the skull, or the casualty
                      has suffered a significant blow to the head, do NOT press hard. Firm pressure
                      on a fractured skull can push broken bone into the brain
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Clear fluid (cerebrospinal fluid)</strong>{' '}
                      draining from the wound, nose, or ears is a sign of a skull fracture. Do NOT
                      attempt to stop the flow of CSF &mdash; it needs to drain. Loosely cover the
                      wound to prevent contamination but allow drainage
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Call 999</strong> if you suspect a skull
                      fracture, if the casualty was unconscious at any point, if clear fluid is
                      draining, or if the wound is deep or bleeding cannot be controlled
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Signs of a Skull Fracture</p>
                </div>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>Depression, deformity, or soft/boggy area on the skull</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>Clear, watery fluid (CSF) draining from the wound, nose, or ears</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>Blood draining from the ears</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      Bruising around the eyes (&ldquo;raccoon eyes&rdquo;) or behind the ears
                      (Battle&rsquo;s sign) &mdash; these are late signs of a base of skull fracture
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      Altered level of consciousness, confusion, drowsiness, or loss of
                      consciousness
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>Unequal pupils (one larger than the other)</span>
                  </li>
                </ul>
              </div>

              <p>
                All head injuries should be taken seriously. Even if the scalp wound appears minor,
                the casualty should be advised to seek medical attention if they experience
                headache, nausea, vomiting, drowsiness, confusion, or visual disturbance in the
                hours following the injury. These may indicate a concussion or a developing
                intracranial bleed. On a construction site, any head injury should be recorded in
                the accident book and reported to the site supervisor.
              </p>
            </div>
          </div>
        </section>

        {/* Section 06: Dressing Types */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">06</span>
            Dressing Types &amp; Selection
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A first aider must be able to select the right dressing for the wound type. Using
                the wrong dressing can increase pain, delay healing, cause further tissue damage, or
                introduce infection. The following are the main dressing types you will find in a
                workplace first aid kit.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-rose-400 mb-1">Sterile Gauze Pads</p>
                  <p className="text-sm text-white/80">
                    General-purpose wound covering. Used to clean wounds, apply pressure, and cover
                    injuries of various sizes. Available in different sizes. Always use the sterile
                    (sealed) side against the wound. Can be layered for additional absorbency.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-rose-400 mb-1">
                    Adhesive Dressings (Plasters)
                  </p>
                  <p className="text-sm text-white/80">
                    For minor cuts, grazes, and small wounds. The adhesive edges hold the dressing
                    in place without additional bandaging. Available in various shapes including
                    strip, square, and fingertip designs.{' '}
                    <strong className="text-white">Always check for plaster/latex allergies</strong>{' '}
                    before applying &mdash; hypoallergenic alternatives should be available in the
                    first aid kit. Blue detectable plasters are required in food-handling
                    environments.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-rose-400 mb-1">Non-Adherent Dressings</p>
                  <p className="text-sm text-white/80">
                    Specifically designed for{' '}
                    <strong className="text-white">burns and weeping wounds</strong>. The contact
                    layer will not stick to the wound bed, preventing further tissue damage and pain
                    when the dressing is changed. Essential for any moist or exuding wound. Secured
                    in place with a bandage or tape around the edges.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-rose-400 mb-1">
                    Wound Closure Strips (Steri-Strips)
                  </p>
                  <p className="text-sm text-white/80">
                    Thin adhesive strips used to hold the edges of{' '}
                    <strong className="text-white">clean, straight cuts</strong> together. Applied
                    across the wound, pulling the edges into gentle contact. Not suitable for dirty,
                    jagged, deep, or heavily bleeding wounds. A temporary measure &mdash; the
                    casualty should still seek medical advice if the cut is significant.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-rose-400 mb-1">Triangular Bandages</p>
                  <p className="text-sm text-white/80">
                    Versatile multi-purpose items. Used as{' '}
                    <strong className="text-white">arm slings</strong> (broad arm sling or elevation
                    sling), for securing dressings in place, as padding around embedded objects, or
                    folded as a broad or narrow bandage. Every first aid kit should contain at least
                    two triangular bandages.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-rose-400 mb-1">Conforming Bandages</p>
                  <p className="text-sm text-white/80">
                    Lightweight, stretchy bandages used to{' '}
                    <strong className="text-white">hold dressings in place</strong> and provide
                    light support. They conform to the shape of the body and are comfortable to
                    wear. Not designed for compression &mdash; they provide retention only.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-rose-400 mb-1">Crepe Bandages</p>
                  <p className="text-sm text-white/80">
                    Heavier, elastic bandages providing{' '}
                    <strong className="text-white">support and compression</strong> for sprains,
                    strains, and soft tissue injuries. Applied in a spiral pattern, overlapping each
                    layer by half. Check circulation after application &mdash; the limb beyond the
                    bandage should remain warm, with normal colour and sensation.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-rose-400 mb-1">Tubular Bandages</p>
                  <p className="text-sm text-white/80">
                    Tubular-shaped bandages used primarily for{' '}
                    <strong className="text-white">finger and toe dressings</strong>. They hold a
                    small dressing securely in place without bulk. Applied using a tubular bandage
                    applicator. Also available in larger sizes for limb dressings.
                  </p>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Selection Tip:</strong> When choosing a
                  dressing, consider: Is the wound dry or weeping? Is it a burn? Does it need
                  compression or just covering? Is the casualty allergic to any adhesives? Will the
                  dressing need to stay on for a long period, or is it a temporary measure before
                  hospital treatment? Matching the dressing to the wound ensures comfort, promotes
                  healing, and reduces infection risk.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Infection Signs Warning Box */}
        <section className="mb-10">
          <div className="bg-red-500/10 border border-red-500/30 p-5 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <h2 className="text-lg font-semibold text-red-400">Recognising Wound Infection</h2>
            </div>
            <p className="text-sm text-white/80 mb-4">
              Advise every casualty to monitor their wound for signs of infection in the days
              following treatment. If any of the following develop, they should see a GP or attend a
              minor injuries unit promptly:
            </p>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
              {[
                'Increasing pain around the wound that is getting worse rather than better',
                'Redness spreading outward from the wound edges',
                'Swelling around the wound site',
                'Warmth when you touch the area around the wound',
                'Pus or cloudy/foul-smelling discharge from the wound',
                'Red streaks tracking away from the wound along the skin (lymphangitis) — a sign of spreading infection',
                'Fever, chills, or feeling generally unwell',
                'Swollen, tender lymph nodes (glands) near the wound — e.g. in the armpit for a hand wound, or in the groin for a leg wound',
              ].map((sign, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-white/80">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                  <span>{sign}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
              <p className="text-sm text-white/80">
                <strong className="text-red-400">Lymphangitis Warning:</strong> Red streaks tracking
                from a wound are a particularly concerning sign. This indicates infection is
                spreading through the lymphatic system and can progress to{' '}
                <strong className="text-white">sepsis</strong> (blood poisoning) if untreated. The
                casualty needs urgent medical attention.
              </p>
            </div>
          </div>
        </section>

        {/* Cross-Contamination Prevention */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <Shield className="h-5 w-5 text-rose-400" />
            Cross-Contamination Prevention
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When treating any wound, you must protect both yourself and the casualty from
                cross-contamination. Blood and bodily fluids can carry infectious diseases including
                hepatitis B, hepatitis C, and HIV. You cannot tell by looking at someone whether
                they carry a blood-borne infection, so you must treat all blood and bodily fluids as
                potentially infectious.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Standard Precautions for Every Wound Treatment
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Wear nitrile gloves</strong> &mdash; put gloves
                      on before touching the casualty, their blood, or any dressings. Check for
                      latex allergy (nitrile is latex-free). If gloves are not immediately
                      available, use a plastic bag as a barrier or ask the casualty to apply
                      pressure to their own wound
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Wash hands before and after treatment</strong>{' '}
                      &mdash; wash thoroughly with soap and warm water for at least 20 seconds, even
                      if you wore gloves. Use alcohol hand gel if soap and water are not immediately
                      available, but wash properly as soon as possible
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Dispose of used dressings safely</strong>{' '}
                      &mdash; place all used dressings, gloves, and contaminated materials in a{' '}
                      <strong className="text-white">clinical waste bag (yellow bag)</strong> if
                      available, or in a sealed plastic bag. Do not place blood-contaminated waste
                      in general rubbish bins
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Cover your own cuts and abrasions</strong>{' '}
                      &mdash; any broken skin on your own hands or arms must be covered with a
                      waterproof dressing before treating a casualty
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Use a CPR face shield</strong> for rescue
                      breathing &mdash; never perform mouth-to-mouth resuscitation without a barrier
                      device. A pocket mask with a one-way valve is the gold standard
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Blood Spillage &amp; Sharps Safety
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Blood spillage:</strong> Clean with a{' '}
                      <strong className="text-white">1:10 bleach solution</strong> (1 part bleach to
                      10 parts water). Wear nitrile gloves throughout. Wipe the area, dispose of
                      cleaning materials in clinical waste, and wash the area again with clean water
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Sharps (needles, blades, broken glass):
                      </strong>{' '}
                      Never recap needles. Never pick up broken glass with bare hands. Use a sharps
                      container if available. If no sharps container is on site, place the item in a
                      rigid, puncture-proof container (e.g. a heavy plastic bottle with a screw lid)
                      and label it clearly
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Needle stick / blood exposure:</strong> If you
                      are exposed to a casualty&rsquo;s blood or bodily fluids through a needle
                      stick injury, a splash to the eyes or mouth, or contact with broken skin, you
                      must{' '}
                      <strong className="text-white">report it to your employer immediately</strong>
                      . Wash the affected area thoroughly. Attend A&amp;E or occupational health as
                      soon as possible for assessment and potential post-exposure prophylaxis. Time
                      is critical &mdash; treatment is most effective within the first hour
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Legal Requirement:</strong> Under COSHH (Control
                  of Substances Hazardous to Health Regulations 2002) and the Health and Safety at
                  Work etc. Act 1974, employers must have procedures for dealing with blood
                  spillages and blood-borne infection exposure. All needle stick injuries and
                  blood/bodily fluid exposures must be recorded in the accident book and reported to
                  the employer. First aiders should know where the needle stick protocol is kept and
                  who to report to.
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
        <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

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
            <Link to="../first-aid-module-3-section-3">
              Next: Burns, Scalds &amp; Electrical Burns
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
