import { ArrowLeft, Bone, CheckCircle, AlertTriangle, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'fa-m5s1-open-fracture',
    question:
      'A worker has fallen from a scaffold and has a bone protruding through the skin of their lower leg. What is the correct first aid response?',
    options: [
      'Push the bone back into position, straighten the leg, and apply a splint',
      'Do NOT push the bone back in, cover the wound with a sterile dressing, immobilise the leg in the position found, treat for shock, and call 999',
      'Straighten the leg first, then apply direct pressure over the protruding bone to control bleeding',
      'Ask the casualty to stand up and test whether they can put weight on the leg',
    ],
    correctIndex: 1,
    explanation:
      'An open fracture is a serious emergency. You must NEVER push bone back through the skin — this introduces contamination and can cause catastrophic bleeding. Cover the wound with a sterile dressing, immobilise the limb in the position found (do NOT straighten it), treat for shock, and call 999 immediately.',
  },
  {
    id: 'fa-m5s1-price',
    question:
      "A colleague has twisted their ankle and it is swelling rapidly. Using the PRICE protocol, what does the 'C' stand for?",
    options: [
      'Cooling — apply cold water directly to the skin',
      'Compression — apply a very tight bandage to stop all blood flow',
      'Comfortable support — apply a supportive bandage that does not restrict circulation',
      'CPR — check whether the casualty needs resuscitation',
    ],
    correctIndex: 2,
    explanation:
      'In the PRICE protocol, C stands for Comfortable support. This means applying a supportive bandage (such as a crepe bandage) that provides gentle compression without restricting circulation. The bandage should be firm but not tight — you should be able to slide a finger underneath. Always check circulation beyond the bandage after application.',
  },
  {
    id: 'fa-m5s1-dislocation',
    question: 'A worker has dislocated their shoulder after a fall. What should a first aider do?',
    options: [
      'Attempt to push the shoulder back into the socket as quickly as possible to reduce pain',
      'Pull firmly on the arm to try to relocate the joint',
      'Support the arm in the position found, immobilise it, apply ice, and call 999',
      'Forcefully move the arm through its full range of motion to free the joint',
    ],
    correctIndex: 2,
    explanation:
      'A first aider must NEVER attempt to relocate a dislocated joint. Relocation requires medical training, imaging (to check for associated fractures), and often pain relief or sedation. Incorrect attempts can cause nerve damage, blood vessel injury, or worsen associated fractures. Support the arm in the position found, immobilise with padding and slings, apply a wrapped ice pack, and call 999.',
  },
];

const faqs = [
  {
    question: 'How can I tell the difference between a fracture and a sprain?',
    answer:
      'It can be very difficult to distinguish a fracture from a severe sprain without an X-ray. Both can cause pain, swelling, bruising, and reduced movement. However, certain signs are more suggestive of a fracture: visible deformity or abnormal angle of the limb, crepitus (grating sensation with movement), inability to bear any weight at all, and significant shortening or rotation of the limb. If you are unsure, always treat the injury as a fracture — immobilise the area, do not allow weight-bearing, and arrange for medical assessment. It is far better to immobilise a sprain unnecessarily than to fail to immobilise a fracture.',
  },
  {
    question: 'Should I try to straighten a broken limb before splinting it?',
    answer:
      'No. As a first aider, you should NEVER attempt to straighten, realign, or reposition a fractured limb. Moving the broken bone ends can cause further damage to muscles, nerves, and blood vessels, dramatically increase pain, and convert a closed fracture into an open one. Always immobilise the limb in the position found. Support it with padding and bandages above and below the fracture site to prevent movement. The only exception is if the limb is in a position that threatens circulation (cold, blue, no pulse beyond the fracture) — in that case, call 999 for immediate guidance, as gentle repositioning may be advised by the ambulance service over the phone.',
  },
  {
    question: 'What is the difference between RICE and PRICE for sprains?',
    answer:
      'RICE (Rest, Ice, Compression, Elevation) was the traditional protocol for managing soft tissue injuries. Current UK first aid guidance has updated this to PRICE, which adds Protection as the first step. Protection means preventing further injury to the area — for example, by stopping the activity that caused the injury, removing the casualty from the hazardous environment, and protecting the injured area from further knocks or impacts. The remaining steps are the same: Rest the injured area, apply Ice (wrapped in cloth, 15–20 minutes), provide Comfortable support with a bandage, and Elevate the limb above heart level where possible. Some newer guidelines also reference POLICE (Protection, Optimal Loading, Ice, Compression, Elevation), which encourages gentle, pain-free movement rather than complete rest, but PRICE remains the standard taught in UK first aid courses.',
  },
  {
    question: 'A femur fracture can cause 1–2 litres of blood loss — where does the blood go?',
    answer:
      'When the femur (thigh bone) fractures, the broken bone ends can sever or tear the large blood vessels in the thigh, including branches of the femoral artery. The bleeding occurs internally — the blood pools within the thigh muscles and surrounding tissues, causing the thigh to swell significantly. Because the thigh muscles are large and can expand considerably, it is possible to lose 1 to 2 litres of blood (or more) into the thigh without any external bleeding being visible. This is why femur fractures are treated as a serious emergency with a high risk of hypovolaemic shock. The casualty needs 999 activation, shock management, and urgent hospital treatment. Do not be reassured by the absence of visible bleeding — the blood loss is hidden.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What is the key difference between an open (compound) fracture and a closed fracture?',
    options: [
      'A closed fracture is more painful than an open fracture',
      'In an open fracture, the bone has broken through the skin or there is a wound at the fracture site; in a closed fracture, the skin is intact',
      'An open fracture only affects the arms, while a closed fracture only affects the legs',
      'A closed fracture always requires surgery, while an open fracture does not',
    ],
    correctAnswer: 1,
    explanation:
      'In an open (compound) fracture, the bone has broken through the skin or there is a wound communicating with the fracture site. This carries a significant risk of infection and is generally more serious. In a closed fracture, the bone is broken but the skin remains intact. Both types require immobilisation and medical treatment, but an open fracture is a 999 emergency due to the risk of infection, further damage, and significant bleeding.',
  },
  {
    id: 2,
    question: 'Which of the following is a sign of a fracture?',
    options: [
      'The casualty can move the limb freely and without pain',
      'The limb appears a normal shape with no swelling',
      'Deformity, swelling, bruising, loss of function, and tenderness at the injury site',
      'The casualty feels hungry and asks for food',
    ],
    correctAnswer: 2,
    explanation:
      'Signs of a fracture include pain at the site, swelling, bruising, deformity (abnormal shape or angle), loss of function (inability to use or move the limb), tenderness, crepitus (grating sensation — do NOT deliberately test for this), shortening of the limb, unnatural movement, and guarding (the casualty protects the injured area).',
  },
  {
    id: 3,
    question: 'When should you call 999 for a fracture?',
    options: [
      'Only for fractures of the fingers or toes',
      'For open fractures, femur/pelvis/spine fractures, fractures with severe bleeding, or when the casualty cannot be safely transported',
      'Only when the casualty specifically asks you to call an ambulance',
      'Only after you have attempted to straighten the limb',
    ],
    correctAnswer: 1,
    explanation:
      'Call 999 for: any open fracture (bone visible or wound at the fracture site), fractures of the femur, pelvis, or spine, any fracture accompanied by severe bleeding, and any fracture where the casualty cannot be safely transported to hospital. These injuries require paramedic assessment, pain relief, and often specialist immobilisation before the casualty can be moved.',
  },
  {
    id: 4,
    question: 'What is the correct use of an elevated sling?',
    options: [
      'To immobilise a fractured femur',
      'To support hand or finger injuries, or to reduce swelling by keeping the hand elevated to the opposite shoulder',
      'To splint a fractured pelvis',
      'To immobilise a fractured spine',
    ],
    correctAnswer: 1,
    explanation:
      "An elevated sling is used for hand or finger injuries, or when the hand needs to be elevated to reduce swelling. The casualty's hand is raised to the opposite shoulder, and a triangular bandage is draped over the forearm, tucked under the arm and around the back, and tied at the shoulder. This keeps the hand elevated above heart level.",
  },
  {
    id: 5,
    question:
      'A casualty has fallen and is complaining of severe hip pain. They cannot move their leg, and it appears shortened and rotated outwards. What should you suspect, and what is the correct action?',
    options: [
      'Suspect a hip dislocation or femur fracture — do NOT move the casualty, call 999, support the leg in the position found, and treat for shock',
      'Suspect a sprained ankle — apply an ice pack to the hip and ask them to walk it off',
      'Suspect a bruise — help them stand up and test whether they can walk',
      'Suspect a muscle strain — apply a crepe bandage to the hip and send them home',
    ],
    correctAnswer: 0,
    explanation:
      'Severe hip pain with inability to move the leg, shortening, and outward rotation strongly suggests a fracture of the neck of femur (hip fracture) or a hip dislocation. Do NOT attempt to move the casualty. Call 999 immediately. Support the leg in the position found using padding and rolled blankets. Treat for shock — femur and pelvic injuries can cause significant internal blood loss. Keep the casualty warm and reassured until the ambulance arrives.',
  },
  {
    id: 6,
    question: 'What does PRICE stand for in the treatment of sprains and strains?',
    options: [
      'Pain, Recovery, Injection, Compression, Exercise',
      'Protection, Rest, Ice, Comfortable support, Elevation',
      'Pressure, Rotation, Immobilisation, Cooling, Examination',
      'Prevention, Reassurance, Ice, Circulation, Elevation',
    ],
    correctAnswer: 1,
    explanation:
      'PRICE stands for Protection (prevent further injury), Rest (stop using the injured area), Ice (apply a wrapped ice pack for 15–20 minutes), Comfortable support (apply a supportive bandage), and Elevation (raise the injured area above heart level where possible). This is the current UK first aid standard for managing sprains, strains, and soft tissue injuries.',
  },
  {
    id: 7,
    question: 'Why must you NEVER attempt to relocate (push back in) a dislocated joint?',
    options: [
      'Because the joint will relocate itself naturally within a few hours',
      'Because relocation requires medical training, imaging to check for associated fractures, and often sedation — incorrect attempts can damage nerves and blood vessels',
      'Because dislocations are not serious injuries and do not need treatment',
      'Because you should always straighten the limb first before attempting relocation',
    ],
    correctAnswer: 1,
    explanation:
      'Attempting to relocate a dislocated joint without medical training is dangerous. There may be an associated fracture that imaging (X-ray) must identify first. Incorrect relocation attempts can damage nerves, blood vessels, and surrounding soft tissues. The procedure often requires pain relief or sedation. The correct first aid response is to support the joint in the position found, immobilise it, apply ice, and arrange urgent medical treatment.',
  },
  {
    id: 8,
    question:
      'A worker has fractured their ribs after being struck by a falling object. What is the correct first aid treatment?',
    options: [
      'Bandage the chest tightly to immobilise the ribs',
      'Ask the casualty to lie flat on their back and take deep breaths',
      'Help the casualty into a comfortable position (usually sitting, leaning towards the injured side), do NOT bandage the chest, and call 999 if they have difficulty breathing',
      'Apply a splint to the outside of the chest wall',
    ],
    correctAnswer: 2,
    explanation:
      'For fractured ribs, help the casualty into the most comfortable position — usually sitting up and leaning slightly towards the injured side, which allows the uninjured side of the chest to expand fully. Do NOT bandage the chest, as this restricts breathing and can worsen the situation. Call 999 if the casualty has difficulty breathing, if you suspect multiple rib fractures, or if there are signs of a chest injury (such as a sucking wound or coughing up blood).',
  },
];

export default function FirstAidModule5Section1() {
  useSEO({
    title: 'Fractures, Dislocations & Soft Tissue Injuries | First Aid Module 5.1',
    description:
      'Open and closed fractures, fracture recognition and treatment, sling techniques, splinting, specific fractures, sprains, strains, PRICE protocol, and dislocations for first aiders in UK workplaces.',
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
            <Bone className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Fractures, Dislocations &amp; Soft Tissue Injuries
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Recognising and treating fractures, applying slings and immobilisation, managing sprains
            and strains with the PRICE protocol, and responding to dislocations in the workplace
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Open fracture:</strong> Bone through skin &mdash; 999, do NOT push back in
              </li>
              <li>
                <strong>Closed fracture:</strong> Skin intact &mdash; immobilise in position found
              </li>
              <li>
                <strong>Sprains/strains:</strong> PRICE &mdash; Protection, Rest, Ice, Comfortable
                support, Elevation
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Do NOT move:</strong> Unless in immediate danger
              </li>
              <li>
                <strong>Dislocations:</strong> NEVER attempt to relocate &mdash; support in position
                found
              </li>
              <li>
                <strong>Femur fracture:</strong> 999 &mdash; can lose 1&ndash;2 litres of blood
                internally
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Distinguish between open and closed fractures and explain the different treatment priorities',
              'Recognise the signs and symptoms of a fracture and apply general fracture treatment principles',
              'Demonstrate the application of arm slings and elevated slings using a triangular bandage',
              'Describe the first aid treatment for specific fractures including collarbone, ribs, pelvis, and femur',
              'Apply the PRICE protocol for sprains and strains and advise on when to seek medical assessment',
              'Explain why a dislocated joint must never be relocated by a first aider and describe the correct management',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Open vs Closed Fractures */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">01</span>
            Open vs Closed Fractures
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A fracture is a break or crack in a bone. Fractures are classified as either{' '}
                <strong>closed</strong> (simple) or <strong>open</strong> (compound), depending on
                whether the skin has been broken at the fracture site. The distinction is critical
                because it determines the urgency and method of treatment.
              </p>

              {/* Two-column comparison grid */}
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-5 w-5 text-amber-400" />
                    <p className="text-sm font-medium text-amber-400">Closed Fracture</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        The bone is broken but the{' '}
                        <strong className="text-white">skin remains intact</strong> &mdash; there is
                        no wound at the fracture site
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Signs include swelling, bruising, deformity (abnormal shape), and pain at
                        the site
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Lower risk of infection because the skin barrier is intact</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Treatment: immobilise in the position found, support with padding and
                        bandages, and arrange transport to hospital or call 999 depending on
                        severity
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <p className="text-sm font-medium text-red-400">Open (Compound) Fracture</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        The bone has <strong className="text-white">broken through the skin</strong>{' '}
                        or there is a wound at the fracture site
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">High risk of infection</strong> &mdash; the
                        wound provides a direct route for bacteria to reach the bone
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        More serious than a closed fracture &mdash; often involves significant
                        bleeding and tissue damage
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Do NOT push the bone back in</strong> &mdash;
                        cover with a sterile dressing, immobilise, and call 999 immediately
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Critical Rule: NEVER Push Bone Back In
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  If a bone is protruding from a wound, you must{' '}
                  <strong className="text-white">
                    never attempt to push it back under the skin
                  </strong>
                  . Doing so introduces contamination from the skin surface into the wound and bone,
                  dramatically increasing the risk of osteomyelitis (bone infection). It can also
                  cause further damage to blood vessels, nerves, and soft tissues. Cover the wound
                  and protruding bone loosely with a sterile dressing, build padding around the bone
                  if possible, and wait for the ambulance service.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Fracture Recognition & General Treatment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">02</span>
            Fracture Recognition &amp; General Treatment
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Recognising a fracture promptly and treating it correctly can prevent further
                injury, reduce pain, and improve the casualty&rsquo;s outcome. Not all fractures are
                obvious &mdash; some may present with subtle signs, particularly in the elderly or
                in stress fractures.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Signs &amp; Symptoms of a Fracture
                </p>
                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                  {[
                    'Pain at the site of the injury, often severe and worsened by movement',
                    'Swelling around the injury, which may develop rapidly',
                    'Bruising — may appear immediately or develop over hours',
                    'Deformity — the limb appears an abnormal shape, angle, or length',
                    'Loss of function — the casualty cannot use or move the limb',
                    'Tenderness — the area is painful to touch',
                    'Crepitus — a grating sensation when the broken ends move (do NOT deliberately test for this)',
                    'Shortening of the limb compared to the uninjured side',
                    'Unnatural movement — the limb moves where it should not',
                    'Guarding — the casualty instinctively protects the injured area',
                  ].map((sign, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-white/80">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>{sign}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Important:</strong> Crepitus (the grating or
                  grinding sensation when broken bone ends rub together) is a reliable sign of a
                  fracture, but you must <strong>NEVER deliberately test for it</strong> by moving
                  the injured limb. If you feel or hear crepitus during your initial assessment,
                  note it &mdash; but do not attempt to reproduce it. Deliberately moving broken
                  bone ends causes severe pain and can cause further damage to surrounding tissue.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  General Fracture Treatment Principles
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Do NOT move the casualty</strong> unless they
                      are in immediate danger (e.g. fire, structural collapse, or traffic)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Support and immobilise</strong> the injured
                      area in the position found &mdash; do NOT straighten, realign, or reposition
                      the limb
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Prevent movement above and below</strong> the
                      fracture site using padding, bandages, slings, or the casualty&rsquo;s own
                      body as a splint
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Call 999</strong> for: open fractures,
                      femur/pelvis/spine fractures, any fracture with severe bleeding, or any
                      fracture where the casualty cannot be safely transported
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Treat for shock</strong> if the injury is
                      significant &mdash; keep the casualty warm, lie them down (if the fracture
                      allows), raise their legs (if no leg injury), and reassure them
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Check circulation beyond the fracture</strong>{' '}
                      &mdash; check for a pulse, sensation, colour, and warmth in the fingers or
                      toes distal to the injury. If circulation is compromised, call 999 urgently
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Apply ice wrapped in cloth</strong> to reduce
                      swelling &mdash; do NOT apply ice or frozen packs directly to the skin, as
                      this causes ice burns. Wrap in a towel or cloth and apply for 15&ndash;20
                      minutes
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Sling Techniques */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">03</span>
            Sling Techniques
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Slings are used to immobilise and support the upper limb following fractures,
                dislocations, and soft tissue injuries. The two main sling types use a triangular
                bandage and are selected based on the location of the injury and whether elevation
                is needed.
              </p>

              {/* Sling Types Diagram */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-rose-500/10 border-b border-rose-500/20 px-4 py-2">
                  <p className="text-sm font-semibold text-rose-400">
                    Sling Types &mdash; Visual Guide
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-0 md:gap-px bg-white/5">
                  {/* Arm Sling Panel */}
                  <div className="p-4 sm:p-5 bg-[#1a1a1a]">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                        <span className="text-blue-400 text-xs font-bold">1</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-blue-400">
                          Arm Sling (Broad Arm Sling)
                        </p>
                        <p className="text-xs text-white/50">Forearm, wrist, or hand injuries</p>
                      </div>
                    </div>
                    <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3 mb-3">
                      <div className="flex items-center justify-center py-4">
                        <div className="relative w-32 h-36">
                          {/* Body outline */}
                          <div className="absolute inset-x-6 top-0 bottom-4 border-2 border-dashed border-white/20 rounded-t-full" />
                          {/* Arm across chest — horizontal */}
                          <div className="absolute left-2 top-16 w-28 h-1.5 bg-blue-400/60 rounded-full transform -rotate-6" />
                          {/* Triangle bandage supporting arm */}
                          <div
                            className="absolute left-1 top-14 w-30 h-16 border-2 border-blue-400/40 rounded-b-xl"
                            style={{
                              clipPath: 'polygon(0% 0%, 100% 0%, 85% 100%, 15% 100%)',
                            }}
                          />
                          {/* Tie at neck */}
                          <div className="absolute top-4 right-6 w-3 h-3 rounded-full bg-blue-400/80" />
                          {/* Label */}
                          <p className="absolute -bottom-1 inset-x-0 text-center text-[10px] text-white/40">
                            Arm across chest, triangle supports weight
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed">
                      The arm rests across the chest at approximately a right angle. The triangular
                      bandage supports the weight of the forearm. The knot is tied at the hollow
                      above the collarbone on the <strong className="text-white">injured</strong>{' '}
                      side.
                    </p>
                  </div>

                  {/* Elevated Sling Panel */}
                  <div className="p-4 sm:p-5 bg-[#1a1a1a]">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                        <span className="text-emerald-400 text-xs font-bold">2</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-emerald-400">Elevated Sling</p>
                        <p className="text-xs text-white/50">
                          Hand/finger injuries or to reduce swelling
                        </p>
                      </div>
                    </div>
                    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3 mb-3">
                      <div className="flex items-center justify-center py-4">
                        <div className="relative w-32 h-36">
                          {/* Body outline */}
                          <div className="absolute inset-x-6 top-0 bottom-4 border-2 border-dashed border-white/20 rounded-t-full" />
                          {/* Arm elevated — hand at opposite shoulder */}
                          <div className="absolute left-4 top-6 w-24 h-1.5 bg-emerald-400/60 rounded-full transform rotate-45" />
                          {/* Triangle bandage wrapping */}
                          <div
                            className="absolute left-2 top-4 w-28 h-20 border-2 border-emerald-400/40 rounded-xl"
                            style={{
                              clipPath: 'polygon(10% 0%, 90% 0%, 100% 60%, 50% 100%, 0% 60%)',
                            }}
                          />
                          {/* Tie at shoulder */}
                          <div className="absolute top-2 right-4 w-3 h-3 rounded-full bg-emerald-400/80" />
                          {/* Label */}
                          <p className="absolute -bottom-1 inset-x-0 text-center text-[10px] text-white/40">
                            Hand at opposite shoulder, elevated
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed">
                      The hand is raised to the{' '}
                      <strong className="text-white">opposite shoulder</strong>. The triangular
                      bandage supports the forearm in an elevated position, keeping the hand above
                      heart level to reduce swelling.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Arm Sling Application &mdash; Step by Step
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">1.</strong> Support the injured arm with the
                      forearm across the chest, approximately level with the elbow
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">2.</strong> Slide the triangular bandage
                      between the chest and the forearm, with the point extending past the elbow on
                      the injured side
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">3.</strong> Bring the lower end of the bandage
                      up and over the forearm to the hollow above the collarbone on the injured side
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">4.</strong> Tie the two ends with a reef knot
                      at the hollow above the collarbone on the injured side &mdash; not over the
                      bone itself, as this causes discomfort
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">5.</strong> Secure the fabric at the elbow with
                      a safety pin or by twisting and tucking the excess material
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">6.</strong> Check circulation in the fingers
                      &mdash; they should be warm, with normal colour and sensation
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Elevated Sling Application &mdash; Step by Step
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">1.</strong> Place the casualty&rsquo;s forearm
                      across their chest with the fingers pointing towards the opposite shoulder
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">2.</strong> Drape the triangular bandage over
                      the forearm and hand, with the point extending past the elbow
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">3.</strong> Tuck the lower edge of the bandage
                      under the injured arm and bring it around the back
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">4.</strong> Tie the two ends together at the
                      shoulder on the injured side
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">5.</strong> Pin or twist the excess fabric at
                      the elbow to secure it
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">6.</strong> The hand should be higher than the
                      elbow, promoting drainage and reducing swelling
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Improvised Slings:</strong> If a triangular
                  bandage is not available, you can improvise a sling using a belt, a scarf, a
                  jacket hem, or by pinning the sleeve of the casualty&rsquo;s clothing to their
                  lapel or shirt. The key principle is to support the weight of the arm and prevent
                  movement. Even tucking the hand inside a buttoned-up jacket provides temporary
                  support.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Splinting &mdash; Key Principles
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Only apply a splint if you have been trained to do so</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Use padded, rigid support material (e.g. a padded board, rolled newspaper, or
                      a SAM splint)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Immobilise the joints above and below the fracture site</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Check circulation after application</strong>{' '}
                      &mdash; warmth, colour, sensation, and pulse distal to the splint
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Do NOT straighten a deformed limb</strong>{' '}
                      &mdash; splint in the position found
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Specific Fractures */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">04</span>
            Specific Fractures &amp; Their Treatment
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Different bones require different approaches. The following covers the specific
                fractures most likely to be encountered in a workplace setting, along with the
                correct first aid treatment for each.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-rose-400 mb-1">Collarbone (Clavicle)</p>
                  <p className="text-sm text-white/80">
                    Common in falls where the casualty lands on an outstretched hand or directly on
                    the shoulder. The casualty typically supports the arm on the injured side and
                    tilts their head towards the injury. Treatment:{' '}
                    <strong className="text-white">arm sling</strong> on the affected side, with
                    padding between the arm and the body for comfort. Arrange transport to hospital.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-rose-400 mb-1">Upper Arm (Humerus)</p>
                  <p className="text-sm text-white/80">
                    Often caused by a direct blow or a fall onto the arm. Significant pain and
                    swelling in the upper arm, with inability to use the arm. Treatment:{' '}
                    <strong className="text-white">arm sling</strong>, bandage the upper arm gently
                    to the body if needed for additional support. Check circulation in the hand.
                    Arrange transport to hospital.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-rose-400 mb-1">Forearm &amp; Wrist</p>
                  <p className="text-sm text-white/80">
                    Very common workplace fractures, especially from falls. The Colles&rsquo;
                    fracture (distal radius) produces a characteristic &ldquo;dinner fork&rdquo;
                    deformity at the wrist. Treatment:{' '}
                    <strong className="text-white">arm sling</strong>, pad around the forearm and
                    bandage gently. Do NOT attempt to straighten any deformity. Check circulation in
                    the fingers.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-rose-400 mb-1">Hand &amp; Fingers</p>
                  <p className="text-sm text-white/80">
                    Common from crushing injuries, machinery, and impacts. Treatment:{' '}
                    <strong className="text-white">elevated sling</strong> to keep the hand raised
                    and reduce swelling. Pad between injured fingers and bandage gently. Do not try
                    to straighten dislocated or deformed fingers. If a finger has been amputated,
                    wrap the severed part in damp gauze inside a sealed plastic bag, place the bag
                    on ice, and send it to hospital with the casualty.
                  </p>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-amber-400" />
                    <p className="text-sm font-medium text-amber-400">Ribs</p>
                  </div>
                  <p className="text-sm text-white/80">
                    Often caused by direct impacts or falls. The casualty will have sharp pain on
                    breathing and may be reluctant to take deep breaths. Treatment: help the
                    casualty into a <strong className="text-white">comfortable position</strong>{' '}
                    &mdash; usually sitting, leaning slightly towards the injured side to allow the
                    uninjured lung to expand fully.{' '}
                    <strong className="text-white">Do NOT bandage the chest</strong> &mdash; this
                    restricts breathing and is dangerous. Call 999 if the casualty has difficulty
                    breathing, if you suspect multiple rib fractures, or if there are signs of a
                    chest injury such as a sucking wound or coughing up blood.
                  </p>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <p className="text-sm font-medium text-red-400">Pelvis &mdash; Do NOT Move</p>
                  </div>
                  <p className="text-sm text-white/80">
                    Pelvic fractures are serious, life-threatening injuries caused by high-energy
                    impacts such as falls from height or vehicle collisions. The pelvis has a very
                    rich blood supply, and a fracture can cause massive internal bleeding.{' '}
                    <strong className="text-white">Do NOT move the casualty</strong>. Call 999
                    immediately. Support the legs in the position found with padding. Do NOT attempt
                    to test stability by pressing on the pelvis.{' '}
                    <strong className="text-white">Treat for shock</strong> &mdash; keep warm and
                    reassure.
                  </p>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <p className="text-sm font-medium text-red-400">
                      Femur (Thigh Bone) &mdash; 999 Emergency
                    </p>
                  </div>
                  <p className="text-sm text-white/80">
                    The femur is the largest and strongest bone in the body. A fracture requires
                    significant force and is always a serious emergency. A femur fracture can cause{' '}
                    <strong className="text-white">1 to 2 litres of blood loss</strong> internally
                    into the thigh muscles &mdash; the thigh will swell dramatically. The leg may
                    appear shortened and rotated outwards.{' '}
                    <strong className="text-white">Do NOT move the casualty</strong>. Call 999
                    immediately. Support the leg in the position found with padding and rolled
                    blankets on either side. <strong className="text-white">Treat for shock</strong>{' '}
                    aggressively &mdash; the casualty is losing a significant volume of blood even
                    though no external bleeding is visible.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-rose-400 mb-1">
                    Lower Leg (Tibia &amp; Fibula)
                  </p>
                  <p className="text-sm text-white/80">
                    The tibia (shin bone) is the most commonly fractured long bone. Treatment:
                    immobilise using padding and bandages placed above and below the fracture site.
                    If trained, apply a splint. Support the leg in the position found and do not
                    attempt to straighten it. Check circulation in the foot (pulse, colour, warmth,
                    sensation). Call 999 if the fracture is open, if the casualty cannot be safely
                    moved, or if circulation is compromised.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Sprains & Strains */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">05</span>
            Sprains &amp; Strains
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Sprains and strains are soft tissue injuries that are extremely common in the
                workplace. While they are generally less serious than fractures, they can cause
                significant pain and disability and must be treated correctly to promote healing and
                prevent complications.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-400 mb-2">Sprain</p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Stretching or tearing of ligaments</strong>{' '}
                        at a joint
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Ligaments connect bone to bone and stabilise joints</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Most common sites: ankle, knee, and wrist</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>
                        Caused by twisting, wrenching, or overstretching a joint beyond its normal
                        range
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-purple-400 mb-2">Strain</p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">
                          Stretching or tearing of muscle or tendon
                        </strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>Tendons connect muscle to bone</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>Most common in the back, hamstrings, and calf muscles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>
                        Caused by overexertion, lifting heavy loads, or sudden forceful movement
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Recognition: Signs Common to Sprains &amp; Strains
                </p>
                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                  {[
                    'Pain at the injury site, often immediate and worsened by movement',
                    'Swelling — may develop rapidly or gradually over hours',
                    'Bruising — may appear immediately or develop later',
                    'Reduced movement — the casualty has difficulty using the affected area',
                  ].map((sign, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-white/80">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>{sign}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* PRICE Treatment Boxes */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-rose-500/10 border-b border-rose-500/20 px-4 py-2">
                  <p className="text-sm font-semibold text-rose-400">
                    PRICE Protocol &mdash; Treatment for Sprains &amp; Strains
                  </p>
                </div>
                <div className="grid sm:grid-cols-5 gap-px bg-white/5">
                  <div className="p-3 sm:p-4 bg-[#1a1a1a] text-center">
                    <div className="w-10 h-10 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center mx-auto mb-2">
                      <span className="text-red-400 text-sm font-bold">P</span>
                    </div>
                    <p className="text-xs font-medium text-red-400 mb-1">Protection</p>
                    <p className="text-[11px] text-white/60 leading-relaxed">
                      Prevent further injury. Stop the activity. Remove from danger. Protect the
                      injured area from further knocks.
                    </p>
                  </div>
                  <div className="p-3 sm:p-4 bg-[#1a1a1a] text-center">
                    <div className="w-10 h-10 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center mx-auto mb-2">
                      <span className="text-orange-400 text-sm font-bold">R</span>
                    </div>
                    <p className="text-xs font-medium text-orange-400 mb-1">Rest</p>
                    <p className="text-[11px] text-white/60 leading-relaxed">
                      Stop using the injured area. Avoid weight-bearing on an injured leg. Rest the
                      arm if a wrist or hand is affected.
                    </p>
                  </div>
                  <div className="p-3 sm:p-4 bg-[#1a1a1a] text-center">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center mx-auto mb-2">
                      <span className="text-cyan-400 text-sm font-bold">I</span>
                    </div>
                    <p className="text-xs font-medium text-cyan-400 mb-1">Ice</p>
                    <p className="text-[11px] text-white/60 leading-relaxed">
                      Apply a wrapped ice pack or bag of frozen peas for 15&ndash;20 minutes. Wrap
                      in a cloth &mdash; NEVER apply ice directly to skin.
                    </p>
                  </div>
                  <div className="p-3 sm:p-4 bg-[#1a1a1a] text-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-2">
                      <span className="text-emerald-400 text-sm font-bold">C</span>
                    </div>
                    <p className="text-xs font-medium text-emerald-400 mb-1">Comfortable Support</p>
                    <p className="text-[11px] text-white/60 leading-relaxed">
                      Apply a supportive bandage (crepe bandage). Firm but not tight &mdash; check
                      circulation. Slide a finger underneath.
                    </p>
                  </div>
                  <div className="p-3 sm:p-4 bg-[#1a1a1a] text-center">
                    <div className="w-10 h-10 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center mx-auto mb-2">
                      <span className="text-violet-400 text-sm font-bold">E</span>
                    </div>
                    <p className="text-xs font-medium text-violet-400 mb-1">Elevation</p>
                    <p className="text-[11px] text-white/60 leading-relaxed">
                      Raise the injured area above heart level where possible. Use pillows, a chair,
                      or cushions to support the elevated limb.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    When to Seek Medical Assessment
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Refer the casualty for medical assessment (A&amp;E or minor injuries unit) if they
                  are <strong className="text-white">unable to bear weight</strong> on the injured
                  limb, if there is <strong className="text-white">significant swelling</strong>{' '}
                  that develops rapidly, if there is any{' '}
                  <strong className="text-white">deformity</strong> at the joint, if the pain is
                  severe and not improving, or if you cannot be certain whether the injury is a
                  sprain or a fracture. When in doubt, treat as a fracture and arrange for X-ray
                  assessment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Dislocations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">06</span>
            Dislocations
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A dislocation occurs when a bone is displaced from its normal position at a joint.
                The most commonly dislocated joints are the shoulder, fingers, kneecap, and hip.
                Dislocations are extremely painful and can be associated with fractures, nerve
                damage, and blood vessel injury.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Recognition: Signs of a Dislocation
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Severe pain</strong> at the joint, often worse
                      than a fracture
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Deformity at the joint</strong> &mdash; the
                      joint appears an abnormal shape. With a dislocated shoulder, the arm may hang
                      away from the body with a &ldquo;step&rdquo; visible in the shoulder contour
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Swelling</strong> around the affected joint
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Inability to move</strong> the joint or limb
                      &mdash; the casualty will resist any attempt to move it
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      The limb may appear{' '}
                      <strong className="text-white">shortened or rotated</strong> compared to the
                      uninjured side
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Critical Rule: NEVER Attempt to Relocate a Dislocated Joint
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  <strong className="text-white">
                    Do NOT attempt to push the bone back into the joint socket.
                  </strong>{' '}
                  Relocation requires medical training, imaging (X-ray to check for associated
                  fractures), and often pain relief or sedation. Incorrect attempts to relocate a
                  joint can cause serious damage to nerves, blood vessels, and surrounding soft
                  tissues. Even if you have seen videos or demonstrations of joint relocation, this
                  is a medical procedure that must only be carried out by trained healthcare
                  professionals in a clinical setting.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  First Aid Treatment for Dislocations
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Support in the position found</strong> &mdash;
                      use padding, cushions, rolled blankets, or slings to support the limb in its
                      current position
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Immobilise</strong> the joint and the limb
                      above and below it to prevent any movement
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Apply ice</strong> wrapped in cloth to reduce
                      swelling and pain &mdash; 15 to 20 minutes, never directly on the skin
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Call 999</strong> for dislocations of the
                      shoulder, hip, or knee &mdash; these cannot be safely transported without
                      paramedic assessment and pain relief
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Refer to A&amp;E</strong> for dislocated
                      fingers &mdash; these can usually be transported by car but still require
                      X-ray and professional relocation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Check circulation</strong> beyond the
                      dislocation &mdash; pulse, colour, warmth, and sensation in the fingers or
                      toes. If circulation is compromised, call 999 urgently
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Dislocated Shoulder:</strong> The shoulder is
                  the most commonly dislocated large joint. The casualty will typically hold the arm
                  slightly away from the body and resist any movement. There may be a visible
                  &ldquo;step&rdquo; or hollow in the shoulder contour where the head of the humerus
                  has moved out of the socket. Support the arm using padding (a folded towel or
                  clothing between the arm and the body) and a sling if tolerated. Call 999 &mdash;
                  shoulder dislocations require hospital treatment with X-ray, pain relief, and
                  controlled relocation under medical supervision.
                </p>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Construction Site Context:</strong> On
                  construction sites, fractures, sprains, and dislocations commonly result from
                  falls from height, slips and trips, struck-by incidents, manual handling injuries,
                  and machinery entanglement. As a first aider, your priorities are always the same:
                  assess the scene for further danger, call for help if needed, immobilise the
                  injury in the position found, treat for shock if the injury is significant, and
                  arrange appropriate medical care. Record the incident in the site accident book
                  and report to the supervisor.
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
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

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
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../first-aid-module-5-section-2">
              Next: Head, Spinal &amp; Eye Injuries
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
