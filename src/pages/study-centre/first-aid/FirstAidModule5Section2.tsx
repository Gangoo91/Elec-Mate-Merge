import { ArrowLeft, Brain, CheckCircle, AlertTriangle, Eye, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'head-injury-csf-leak',
    question:
      'A colleague falls from a stepladder and hits their head. Ten minutes later, you notice clear fluid draining from their ear. What does this suggest and what should you do?',
    options: [
      'Ear wax has been dislodged — clean the ear and monitor',
      'This may be cerebrospinal fluid (CSF), indicating a skull fracture — call 999 immediately and do NOT plug the ear',
      'Water from a nearby spill has entered the ear — dry it and continue monitoring',
      'This is a normal stress response — reassure the casualty and offer water',
    ],
    correctIndex: 1,
    explanation:
      'Clear fluid draining from the ear or nose after a head injury may be cerebrospinal fluid (CSF), which surrounds and protects the brain. A CSF leak indicates a skull fracture and is a medical emergency. Call 999 immediately. Do NOT plug the ear or attempt to stop the flow — allow it to drain freely. Cover the ear loosely with a sterile pad to absorb the fluid, and position the casualty with the leaking ear downwards if possible.',
  },
  {
    id: 'spinal-injury-priority',
    question:
      'A casualty has fallen from scaffolding. You suspect a spinal injury, but the casualty is unconscious and not breathing. What takes priority?',
    options: [
      'Spinal immobilisation — do NOT move the casualty under any circumstances',
      'Wait for the ambulance — only trained paramedics should manage this situation',
      'Airway and breathing take priority — open the airway using a jaw thrust if possible, and begin CPR if needed',
      'Place the casualty in the recovery position immediately without any spinal precautions',
    ],
    correctIndex: 2,
    explanation:
      'The airway ALWAYS takes priority over spinal immobilisation. A casualty who is not breathing will die within minutes without intervention, whereas a spinal injury — while extremely serious — is not immediately fatal. Open the airway using a jaw thrust (which minimises neck movement) if possible, or a head tilt-chin lift if a jaw thrust is ineffective. If the casualty is not breathing normally, begin CPR. The Resuscitation Council UK is clear: do not withhold life-saving airway management because of a suspected spinal injury.',
  },
  {
    id: 'eye-chemical-splash',
    question:
      'A colleague gets a chemical splash of drain cleaner (strong alkali) in their right eye. What is the correct immediate action?',
    options: [
      'Cover both eyes with sterile pads and transport to hospital',
      'Irrigate the affected eye immediately with clean running water for at least 20 minutes, holding the eyelids open, with the affected eye lower than the unaffected eye',
      'Ask the casualty to blink rapidly to flush the chemical out naturally',
      'Apply a neutralising acid solution to counteract the alkali',
    ],
    correctIndex: 1,
    explanation:
      'Chemical splashes to the eye require immediate irrigation with clean running water for a minimum of 20 minutes. Hold the eyelids open to ensure thorough flushing. Tilt the head so the affected eye is lower than the unaffected eye — this prevents contaminated water from flowing into the good eye. Never attempt to neutralise a chemical with another chemical. Identify the substance (bring the Safety Data Sheet or container to hospital). Call 999 or transport to A&E urgently after flushing.',
  },
];

const faqs = [
  {
    question: 'How long should you monitor someone after a head injury, even if they seem fine?',
    answer:
      'After any head injury, the casualty should be monitored for at least 24 hours, even if they initially appear well. Symptoms of a serious brain injury — such as a subdural haematoma (bleeding between the brain and the skull) — may not develop for hours or even days after the initial injury. During the monitoring period, watch for: worsening headache, repeated vomiting, increasing drowsiness or difficulty waking, confusion or unusual behaviour, seizures, weakness in limbs, or unequal pupils. If any of these signs develop, call 999 immediately. The NHS advises that the casualty should not be left alone during this period, and a responsible adult should check on them regularly — including waking them during the night.',
  },
  {
    question: 'Why must you bandage BOTH eyes when there is an embedded object in one eye?',
    answer:
      'When one eye moves, the other eye moves with it — this is called sympathetic eye movement (or conjugate gaze). Even if the uninjured eye is the only one open, every time it moves, the injured eye moves as well. If there is an embedded object in one eye, this movement can cause the object to shift, causing further damage to the delicate structures within the eye. By covering both eyes, you minimise all eye movement and reduce the risk of additional injury. Explain this to the casualty clearly, as covering both eyes can be frightening — they need to understand why it is necessary and that you will stay with them and guide them.',
  },
  {
    question: 'Can you remove a motorcycle helmet from a casualty with a suspected spinal injury?',
    answer:
      'In general, do NOT remove a motorcycle helmet from a casualty with a suspected spinal injury. The helmet helps to stabilise the head and neck. Removing it requires two trained rescuers and careful technique to avoid moving the cervical spine. The only reason to remove a helmet is if the airway is compromised and you cannot manage it with the helmet in place — for example, if the casualty is vomiting and you need to clear the airway, or if the casualty stops breathing and you need to perform CPR. If the helmet must be removed, one person should stabilise the head and neck from below while the second person carefully expands and lifts the helmet off. Paramedics are trained in this procedure and have the equipment to do it safely.',
  },
  {
    question: "What is arc eye (welder's flash) and why does it not cause symptoms immediately?",
    answer:
      "Arc eye — also called welder's flash or ultraviolet keratitis — is a painful condition caused by exposure to ultraviolet (UV) radiation from welding arcs, sun lamps, or reflected sunlight (such as off snow or water). The UV radiation damages the cornea (the clear front surface of the eye). Symptoms typically do not appear until 6 to 12 hours after exposure, which means electricians and other workers may not realise they have been injured until they wake in the night with severe eye pain. Symptoms include: intense pain, a gritty or sandy sensation (as if something is in the eye), watering, redness, sensitivity to light, and blurred vision. First aid: cover both eyes with cool, damp pads to reduce pain and light sensitivity, take paracetamol, and attend A&E. The condition usually resolves within 24 to 48 hours, but severe or repeated exposure can cause permanent corneal damage.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which of the following is a late sign of a skull base fracture?',
    options: [
      'A headache that improves with paracetamol',
      "Bruising behind the ears (Battle's sign) or around both eyes (raccoon/panda eyes)",
      'A small bump on the forehead that is tender to touch',
      'Temporary dizziness that resolves within two minutes',
    ],
    correctAnswer: 1,
    explanation:
      "Battle's sign (bruising behind the ears) and raccoon eyes/panda eyes (bilateral periorbital bruising — bruising around both eyes) are late signs of a skull base fracture. They typically develop hours after the injury as blood tracks along tissue planes from the fracture site. Other signs of a skull base fracture include: clear fluid (CSF) from the ear or nose, and blood from the ear. These signs indicate a serious injury requiring emergency hospital treatment.",
  },
  {
    id: 2,
    question:
      'A casualty has a suspected concussion after being struck on the head by a falling tool. They did not lose consciousness but are confused and dizzy. What should you do?',
    options: [
      'Allow them to rest for 15 minutes and then return to work if they feel better',
      'Give them strong painkillers and monitor them on site',
      'All suspected concussions should be assessed by a medical professional — do not allow the casualty to return to safety-critical work',
      'Concussion without loss of consciousness is minor — no medical assessment is needed',
    ],
    correctAnswer: 2,
    explanation:
      'All suspected concussions should be assessed by a medical professional, regardless of whether there was loss of consciousness. Concussion is a temporary disruption of brain function, and symptoms can worsen over time. The casualty should not return to safety-critical tasks (working at height, operating machinery, driving, electrical work) until fully recovered and cleared by a medical professional. A graded return to work is recommended.',
  },
  {
    id: 3,
    question:
      'When performing manual inline stabilisation (MILS) of the cervical spine, where should you position yourself?',
    options: [
      'Standing beside the casualty, holding their chin with one hand and the back of their head with the other',
      "Kneeling behind the casualty's head, hands placed on either side of the head covering the ears, holding the head in neutral alignment",
      "Kneeling at the casualty's side, with one hand on the forehead and one under the neck",
      "Standing at the casualty's feet, directing others to hold the head",
    ],
    correctAnswer: 1,
    explanation:
      "For manual inline stabilisation (MILS), kneel behind the casualty's head. Place your hands on either side of the head, covering the ears, with your fingers spread. Hold the head still in the neutral position — nose in line with the navel. Apply gentle traction (slight upward pull) to decompress the cervical spine. Maintain this position until the ambulance arrives — do NOT let go. This technique prevents any movement of the cervical spine that could worsen a spinal cord injury.",
  },
  {
    id: 4,
    question:
      'A casualty has a piece of metal embedded in their eye after an angle grinder incident. What is the correct first aid?',
    options: [
      'Remove the metal fragment carefully with clean tweezers and flush the eye with water',
      'Do NOT remove the object, pad around it with a ring pad, bandage BOTH eyes, and call 999',
      'Cover the affected eye only with a sterile pad and transport to the nearest walk-in centre',
      'Flush the eye vigorously with water to dislodge the metal fragment',
    ],
    correctAnswer: 1,
    explanation:
      'Never attempt to remove an embedded object from the eye. Doing so can cause catastrophic further damage to the delicate structures within the eye. Instead: do NOT press on the object, build up padding around it using a ring pad (donut-shaped pad) to prevent anything from pressing on the object, bandage BOTH eyes to prevent sympathetic eye movement, and call 999. Reassure the casualty and explain why both eyes must be covered.',
  },
  {
    id: 5,
    question: 'When should you move a casualty with a suspected spinal injury?',
    options: [
      'Never — spinal injury casualties must never be moved under any circumstances',
      'Only if their airway is compromised or they are in immediate danger (such as fire or structural collapse)',
      'Whenever you need to make them more comfortable',
      'Only if you have a spinal board and cervical collar available',
    ],
    correctAnswer: 1,
    explanation:
      'A casualty with a suspected spinal injury should only be moved if their airway is compromised (airway takes priority over spinal immobilisation) or they are in immediate danger — such as fire, flooding, structural collapse, or exposure to hazardous substances. If the casualty must be moved, use a log roll with as many rescuers as possible to maintain spinal alignment. The principle is: the risk of NOT moving the casualty must outweigh the risk of moving them.',
  },
  {
    id: 6,
    question:
      'A colleague gets a small metal filing in their eye from drilling. The object is visible on the white of the eye. What should you try first?',
    options: [
      'Remove it with the corner of a clean, damp cloth',
      'Try to float it off by irrigating with clean water from the inner corner outwards',
      'Leave it in place, pad both eyes, and call 999',
      'Ask the casualty to rub their eye vigorously to dislodge it',
    ],
    correctAnswer: 1,
    explanation:
      'For a foreign object (such as a metal filing, dust, or grit) resting on the surface of the eye (not embedded), try to flush it out by irrigating with clean water or sterile eyewash from the inner corner outwards. If the object is on the white of the eye and will not flush out, you may try to lift it off gently with the corner of a damp, clean cloth or cotton bud. Never rub the eye, as this can scratch the cornea. If the object is embedded, on the coloured part of the eye (iris), or will not come out with gentle irrigation, seek medical attention.',
  },
  {
    id: 7,
    question:
      'Which of the following is NOT a red flag sign that requires calling 999 after a head injury?',
    options: [
      'Clear fluid leaking from the ear',
      'A brief headache that resolves with paracetamol within 30 minutes',
      'Repeated vomiting',
      'Seizures following the injury',
    ],
    correctAnswer: 1,
    explanation:
      'A brief, mild headache that resolves quickly with paracetamol is not in itself a red flag. However, a persistent headache that worsens over time IS a red flag. The other options are all serious warning signs: clear fluid from the ear (possible CSF leak indicating skull fracture), repeated vomiting (sign of raised intracranial pressure), and seizures (indicate significant brain injury). Any casualty with one or more red flag signs needs emergency assessment — call 999.',
  },
  {
    id: 8,
    question:
      "When irrigating a chemical splash from the right eye, which way should you tilt the casualty's head?",
    options: [
      'Tilt the head back (face up) so water pools in the eye socket',
      'Tilt the head to the right so the affected eye is lower — preventing contaminated water from flowing into the left eye',
      'Tilt the head to the left so the unaffected eye is lower',
      'Keep the head level — the direction does not matter',
    ],
    correctAnswer: 1,
    explanation:
      'When irrigating a chemical splash from the right eye, tilt the head to the right so that the affected (right) eye is lower than the unaffected (left) eye. This ensures that contaminated water drains away from the good eye, preventing the chemical from being washed across into it. Hold the eyelids open during irrigation to ensure thorough flushing. Continue for at least 20 minutes with clean running water.',
  },
];

export default function FirstAidModule5Section2() {
  useSEO({
    title: 'Head Injuries, Spinal Injuries & Eye Injuries | First Aid Module 5.2',
    description:
      'Head injury red flags, concussion recognition, spinal immobilisation technique, manual inline stabilisation, eye injuries including foreign objects, chemical splashes, embedded objects, and arc eye.',
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
            <Brain className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Head Injuries, Spinal Injuries &amp; Eye Injuries
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Head injury red flags, concussion recognition and management, spinal immobilisation,
            manual inline stabilisation, and eye injury first aid including foreign objects,
            chemical splashes, and embedded objects
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Head injury:</strong> Call 999 for red flags &mdash; loss of consciousness,
                vomiting, CSF leak, seizures
              </li>
              <li>
                <strong>Spinal:</strong> Hold head still in neutral alignment &mdash; do NOT move
                unless airway compromised
              </li>
              <li>
                <strong>Eyes:</strong> Irrigate chemical splashes 20+ minutes &mdash; never remove
                embedded objects
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Falls from height:</strong> Always suspect spinal injury &mdash; immobilise
                immediately
              </li>
              <li>
                <strong>Grinding/drilling:</strong> Eye foreign bodies are common &mdash; irrigate
                from inner corner outwards
              </li>
              <li>
                <strong>Concussion:</strong> No return to safety-critical tasks until medically
                cleared
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Recognise red flag signs following a head injury and know when to call 999',
              'Describe the signs and management of concussion, including graded return to work',
              'Demonstrate manual inline stabilisation (MILS) of the cervical spine',
              'Explain when it is appropriate to move a casualty with a suspected spinal injury',
              'Manage eye injuries including foreign objects, chemical splashes, and embedded objects',
              "Describe arc eye (welder's flash) and explain why symptoms are delayed",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Head Injury Red Flags */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">01</span>
            Head Injury Red Flags &mdash; When to Call 999
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Head injuries are common on construction sites &mdash; falls from height, being
                struck by falling objects, and collisions with low beams or scaffolding poles all
                pose a risk. Most head injuries are minor and resolve without treatment, but some
                can be life-threatening. As a first aider, your most important role is to recognise
                the <strong>red flag signs</strong> that indicate a serious brain injury requiring
                emergency treatment.
              </p>

              <p>
                A head injury becomes a medical emergency when there is damage to the brain itself
                &mdash; either from direct trauma (bruising or bleeding within the brain) or from
                secondary effects such as raised intracranial pressure (pressure building up inside
                the skull as blood or fluid accumulates). The skull is a rigid container: any
                swelling or bleeding inside it compresses the brain, and this can be fatal if not
                treated.
              </p>

              {/* Red Flags Warning Box */}
              <div className="bg-red-500/10 border border-red-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                  <p className="text-lg font-semibold text-red-400">Call 999 Immediately If:</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      sign: 'Loss of consciousness',
                      detail:
                        'Even briefly — any loss of consciousness after a head injury indicates significant force and possible brain injury',
                    },
                    {
                      sign: 'Amnesia',
                      detail:
                        'The casualty cannot remember the event, or has gaps in memory before or after the injury',
                    },
                    {
                      sign: 'Persistent headache that worsens',
                      detail:
                        'A headache that gets progressively worse (not better) may indicate bleeding inside the skull',
                    },
                    {
                      sign: 'Repeated vomiting',
                      detail:
                        'Vomiting more than once after a head injury suggests raised intracranial pressure',
                    },
                    {
                      sign: 'Clear fluid from ear or nose',
                      detail:
                        'Cerebrospinal fluid (CSF) leak — indicates a skull fracture. Do NOT plug the ear or nose',
                    },
                    {
                      sign: 'Blood from the ear',
                      detail:
                        'May indicate a skull base fracture — allow to drain freely, cover loosely with a sterile pad',
                    },
                    {
                      sign: "Battle's sign / Raccoon eyes",
                      detail:
                        "Bruising behind ears (Battle's sign) or around both eyes (raccoon/panda eyes) — late signs of skull base fracture",
                    },
                    {
                      sign: 'Seizures',
                      detail:
                        'Any seizure following a head injury indicates significant brain injury',
                    },
                    {
                      sign: 'Visual disturbance',
                      detail: 'Blurred or double vision, or loss of part of the visual field',
                    },
                    {
                      sign: 'Difficulty speaking or understanding',
                      detail:
                        'Slurred speech, inability to find words, or not understanding what is being said to them',
                    },
                    {
                      sign: 'Weakness or numbness in limbs',
                      detail:
                        'One-sided weakness or numbness may indicate brain injury or spinal cord involvement',
                    },
                    {
                      sign: 'Drowsiness or difficulty staying awake',
                      detail:
                        'Increasing drowsiness or being unable to be roused — a serious warning sign',
                    },
                    {
                      sign: 'Unequal pupils',
                      detail:
                        'One pupil larger than the other — indicates pressure on the brain (uncal herniation)',
                    },
                    {
                      sign: 'Irritability or behaviour changes',
                      detail:
                        'Unusual aggression, confusion, or personality changes — especially significant in children',
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-red-500/5 border border-red-500/20 p-3 rounded-lg">
                      <p className="text-sm font-medium text-red-300 mb-1">{item.sign}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">First Aid for Head Injuries:</strong> If the
                  casualty is conscious and alert with no red flag signs: sit them down, apply a
                  cold compress to reduce swelling, and monitor closely for at least 30 minutes.
                  Advise them to attend A&amp;E if any red flag signs develop. Ensure a responsible
                  adult monitors them for 24 hours. If <strong>any</strong> red flag sign is present
                  &mdash; call 999 immediately. If the casualty is unconscious but breathing: place
                  them in the recovery position (with spinal precautions if a fall was involved) and
                  call 999.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Concussion */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">02</span>
            Concussion
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Concussion is a <strong>temporary disruption of brain function</strong> caused by a
                blow or jolt to the head. It is the most common type of traumatic brain injury.
                Concussion may or may not involve loss of consciousness &mdash; many concussions
                occur without any loss of consciousness at all, which is why they are often
                underestimated.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Concussion Symptoms</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    'Headache (most common symptom)',
                    "Confusion or feeling 'foggy'",
                    'Dizziness and balance problems',
                    'Nausea or vomiting',
                    'Sensitivity to light and noise',
                    'Memory problems (especially of the event)',
                    'Difficulty concentrating',
                    "Feeling slowed down or 'not right'",
                    'Blurred vision',
                    'Fatigue or low energy',
                  ].map((symptom, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400/60 flex-shrink-0" />
                      <p className="text-sm text-white/80">{symptom}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">
                    All Suspected Concussions Must Be Medically Assessed:
                  </strong>{' '}
                  Even if the casualty insists they are fine, all suspected concussions should be
                  assessed by a medical professional. Symptoms can worsen over hours or days, and
                  there is no reliable way for a first aider to distinguish a simple concussion from
                  a more serious brain injury without medical imaging.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Post-Concussion Syndrome &amp; Return to Work
                  </p>
                </div>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    <strong className="text-white">Post-concussion syndrome</strong> occurs when
                    concussion symptoms persist for weeks or even months after the initial injury.
                    Symptoms may include persistent headaches, difficulty concentrating, memory
                    problems, irritability, sleep disturbance, and sensitivity to light or noise.
                    This can significantly affect a person&rsquo;s ability to work, particularly in
                    safety-critical roles.
                  </p>
                  <p>
                    <strong className="text-white">Graded return to work:</strong> After a
                    concussion, the casualty should follow a graded return to work &mdash; starting
                    with light duties and progressively increasing activity over days or weeks as
                    symptoms allow. They must <strong className="text-red-300">NOT</strong> return
                    to safety-critical tasks (working at height, operating machinery, driving, or
                    electrical work) until fully recovered and cleared by a medical professional.
                    Returning too soon risks a second concussion, which can have severe consequences
                    (second impact syndrome).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: Scalp Wounds */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">03</span>
            Scalp Wounds
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The scalp has an extremely rich blood supply, which means that even minor scalp
                wounds can bleed profusely. A scalp wound can look far worse than it actually is due
                to the sheer volume of blood &mdash; but it can also look minor while concealing a
                serious skull fracture beneath. Always take scalp wounds seriously.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">Managing Scalp Wounds</p>
                <div className="space-y-2">
                  {[
                    'Apply a sterile pad and apply gentle, direct pressure to control bleeding',
                    'If you suspect a skull fracture (deformity, depression, or boggy swelling beneath the wound), do NOT press hard — apply light pressure around the edges only',
                    'Look for signs of skull fracture: visible deformity, depression in the skull, bone fragments, or CSF leaking from the wound',
                    'If a skull fracture is suspected, cover the wound loosely with a sterile dressing, call 999, and monitor for deterioration',
                    'For simple scalp wounds without skull fracture signs: control bleeding with direct pressure, clean the wound if possible, and refer for medical assessment if the wound is deep or gaping',
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

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">Skull Fracture Suspicion</p>
                </div>
                <p className="text-sm text-white/80">
                  If the mechanism of injury was significant (fall from height, struck by heavy
                  object), always suspect a possible skull fracture even if the wound appears
                  superficial. A depressed skull fracture may be felt as a &ldquo;boggy&rdquo; or
                  spongy area beneath the scalp &mdash; do NOT press on this area. Treat as a
                  serious head injury: call 999, monitor red flags, and keep the casualty still.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 04: Spinal Injuries */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">04</span>
            Spinal Injuries
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The spinal cord is a bundle of nerves that runs from the brain down through the
                vertebral column (backbone). It carries all the messages between the brain and the
                body. Damage to the spinal cord can cause <strong>permanent paralysis</strong>{' '}
                &mdash; the level and extent of paralysis depends on where the cord is damaged.
                Injuries to the cervical spine (neck) can cause quadriplegia (paralysis of all four
                limbs) or death if the damage is high enough to affect breathing.
              </p>

              <p>
                On construction sites, spinal injuries most commonly result from falls from height,
                being struck by heavy objects, and road traffic collisions. The single most
                important principle is:{' '}
                <strong>if in doubt, treat as a spinal injury until proven otherwise.</strong>
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Suspect a Spinal Injury If:</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    'Fall from height (any height — even standing height in elderly casualties)',
                    'Diving accident or heavy impact to head',
                    'Road traffic collision',
                    'Heavy object falling on head or back',
                    'Violent mechanism of injury (assault, explosion)',
                    'Casualty complains of neck or back pain',
                    'Tingling, numbness, or weakness in limbs',
                    'Loss of sensation below a certain level',
                    'Loss of bladder or bowel control',
                    'The casualty is unconscious after a traumatic event',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400/60 flex-shrink-0" />
                      <p className="text-sm text-white/80">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* DIAGRAM: Spinal Immobilisation */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-white mb-4 text-center">
                  Manual Inline Stabilisation (MILS)
                </p>
                <div className="flex justify-center">
                  <div className="relative w-64 sm:w-72">
                    <div className="flex flex-col items-center">
                      {/* Rescuer's hands */}
                      <div className="relative mb-2">
                        <p className="text-[10px] text-rose-400 font-medium text-center mb-2">
                          Rescuer kneels behind casualty&rsquo;s head
                        </p>
                        <div className="flex items-center justify-center gap-0">
                          {/* Left hand */}
                          <div className="w-16 sm:w-20 h-20 sm:h-24 bg-rose-500/15 border-2 border-rose-400/40 rounded-l-2xl flex items-center justify-center relative">
                            <div className="text-center">
                              <p className="text-[10px] font-medium text-rose-400">Left</p>
                              <p className="text-[9px] text-white/50">hand</p>
                            </div>
                            {/* Fingers spread indicator */}
                            <div className="absolute -top-1 left-1 right-1 flex justify-between">
                              <div className="w-1 h-3 bg-rose-400/30 rounded-full" />
                              <div className="w-1 h-4 bg-rose-400/30 rounded-full" />
                              <div className="w-1 h-3 bg-rose-400/30 rounded-full" />
                              <div className="w-1 h-2 bg-rose-400/30 rounded-full" />
                            </div>
                          </div>

                          {/* Head (casualty) */}
                          <div className="w-20 sm:w-24 h-20 sm:h-24 rounded-full bg-blue-500/10 border-2 border-blue-400/30 flex items-center justify-center z-10">
                            <div className="text-center">
                              <p className="text-[10px] font-bold text-blue-400">Head</p>
                              <p className="text-[8px] text-white/40">neutral</p>
                              <p className="text-[8px] text-white/40">position</p>
                            </div>
                          </div>

                          {/* Right hand */}
                          <div className="w-16 sm:w-20 h-20 sm:h-24 bg-rose-500/15 border-2 border-rose-400/40 rounded-r-2xl flex items-center justify-center relative">
                            <div className="text-center">
                              <p className="text-[10px] font-medium text-rose-400">Right</p>
                              <p className="text-[9px] text-white/50">hand</p>
                            </div>
                            {/* Fingers spread indicator */}
                            <div className="absolute -top-1 left-1 right-1 flex justify-between">
                              <div className="w-1 h-2 bg-rose-400/30 rounded-full" />
                              <div className="w-1 h-3 bg-rose-400/30 rounded-full" />
                              <div className="w-1 h-4 bg-rose-400/30 rounded-full" />
                              <div className="w-1 h-3 bg-rose-400/30 rounded-full" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Alignment arrows */}
                      <div className="flex items-center gap-2 my-2">
                        <div className="h-px w-8 bg-amber-400/50" />
                        <p className="text-[9px] text-amber-400 font-medium whitespace-nowrap">
                          &#8593; Maintain alignment &#8593;
                        </p>
                        <div className="h-px w-8 bg-amber-400/50" />
                      </div>

                      {/* Body indicator */}
                      <div className="w-24 sm:w-28 h-12 bg-blue-500/5 border-2 border-blue-400/20 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-[9px] text-white/40">Nose in line with navel</p>
                        </div>
                      </div>

                      {/* Arrow down for gentle traction */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="h-px w-6 bg-green-400/50" />
                        <p className="text-[9px] text-green-400 font-medium whitespace-nowrap">
                          &#8593; Gentle traction (slight upward pull)
                        </p>
                        <div className="h-px w-6 bg-green-400/50" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Diagram legend */}
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-4 text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-rose-500/15 border border-rose-400/40 rounded" />
                    <span className="text-white/60">Rescuer&rsquo;s hands (covering ears)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-blue-500/10 border border-blue-400/30 rounded-full" />
                    <span className="text-white/60">Casualty&rsquo;s head (neutral)</span>
                  </div>
                </div>
                <p className="text-[11px] text-white/40 text-center mt-2">
                  Hold until ambulance arrives &mdash; do NOT let go
                </p>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Manual Inline Stabilisation (MILS) Procedure
                </p>
                <div className="space-y-2">
                  {[
                    "Kneel behind the casualty's head — approach from behind, NOT from the side",
                    'Place your hands on either side of the head, covering the ears, with your fingers spread',
                    'Hold the head in the neutral position — nose in line with the navel, looking straight ahead',
                    'Apply gentle traction — a slight upward pull along the axis of the spine to decompress the vertebrae',
                    'Maintain this position continuously until the ambulance arrives — do NOT let go, do NOT allow anyone to move the casualty',
                    'Talk to the casualty calmly: explain what you are doing, ask them not to move, and reassure them that help is coming',
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

              {/* Do NOT Move Unless... */}
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Do NOT Move the Casualty Unless:
                  </p>
                </div>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    The default position is clear:{' '}
                    <strong className="text-red-300">
                      do NOT move a casualty with a suspected spinal injury.
                    </strong>{' '}
                    Any movement of the spine risks converting an incomplete spinal cord injury
                    (some function preserved) into a complete injury (total paralysis below the
                    level of damage).
                  </p>
                  <p className="font-medium text-white">The only exceptions are:</p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Airway compromise:</strong> The airway ALWAYS
                        takes priority. If the casualty is not breathing or their airway is blocked,
                        you must manage the airway even if this requires movement. Use a jaw thrust
                        to open the airway if possible (minimises neck movement). If CPR is needed,
                        begin CPR.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Immediate danger:</strong> Fire, structural
                        collapse, flooding, exposure to hazardous substances, or any situation where
                        leaving the casualty in place poses a greater risk than moving them.
                      </span>
                    </li>
                  </ul>
                  <p>
                    If the casualty must be moved, use a{' '}
                    <strong className="text-white">log roll</strong> with as many rescuers as
                    possible (ideally four or more) to maintain spinal alignment throughout the
                    move. One person must control the head at all times.
                  </p>
                </div>
              </div>

              {/* Helmets */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Casualties Wearing Helmets</p>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    If a casualty with a suspected spinal injury is wearing a helmet (motorcycle,
                    bicycle, or hard hat):{' '}
                    <strong className="text-red-300">do NOT remove it</strong> unless the airway is
                    compromised and cannot be managed with the helmet in place. The helmet helps
                    stabilise the head and removing it can cause dangerous movement of the cervical
                    spine.
                  </p>
                  <p>
                    If the helmet <strong>must</strong> be removed (airway compromise, need for
                    CPR): two rescuers are required. One person stabilises the head and neck from
                    below while the second person carefully expands and lifts the helmet off. This
                    is a trained skill &mdash; paramedics have the equipment and training to do this
                    safely.
                  </p>
                </div>
              </div>

              {/* Cervical Collar */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Cervical Collar</p>
                <p className="text-sm text-white/80">
                  Cervical collars are only applied by trained personnel &mdash; paramedics,
                  advanced first aiders, or other healthcare professionals. An incorrectly sized or
                  incorrectly applied cervical collar can worsen a spinal injury by causing
                  misalignment or increased pressure on the cervical spine. As a workplace first
                  aider, your role is to perform manual inline stabilisation until the ambulance
                  crew arrives and takes over.
                </p>
              </div>

              {/* Recovery Position with Spinal Injury */}
              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    Recovery Position with Suspected Spinal Injury
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  If a casualty is unconscious with a suspected spinal injury and needs to be placed
                  in the recovery position (for example, if they are at risk of vomiting and choking
                  and you must leave to call for help), use a modified recovery position with inline
                  stabilisation. One rescuer maintains the head in neutral alignment while others
                  log-roll the casualty onto their side. Only do this if you{' '}
                  <strong className="text-white">absolutely must</strong> &mdash; the ideal approach
                  is to maintain inline stabilisation with the casualty on their back and manage the
                  airway with a jaw thrust.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Eye Injuries */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">05</span>
            Eye Injuries
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Eye injuries are common on construction sites and can range from minor irritation to
                sight-threatening emergencies. The eyes are delicate structures, and even apparently
                minor injuries can cause permanent damage if not managed correctly. Electricians
                face specific eye risks including grinding sparks, drilling debris, cable dust,
                chemical splashes, and arc flash.
              </p>

              {/* Eye Injury Types Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Foreign Object */}
                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Eye className="h-5 w-5 text-blue-400" />
                    <p className="text-sm font-medium text-blue-400">
                      Foreign Object (Dust, Grit, Metal Filings)
                    </p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Irrigate with clean water or sterile eyewash from the{' '}
                        <strong className="text-white">inner corner outwards</strong> to flush the
                        object out
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        If the object is on the white of the eye, try to float it off with gentle
                        irrigation
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        If under the upper lid: ask the casualty to look down, gently grasp the
                        upper lashes, and pull the upper lid down over the lower lashes to dislodge
                        the object
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Do NOT rub the eye &mdash; this can scratch the cornea</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        If the object will not come out, or is on the coloured part of the eye, seek
                        medical attention
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Chemical Splash */}
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <p className="text-sm font-medium text-red-400">Chemical Splash</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Irrigate immediately</strong> with clean
                        running water for at least{' '}
                        <strong className="text-white">20 minutes</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Tilt the head so the{' '}
                        <strong className="text-white">affected eye is lower</strong> than the
                        unaffected eye &mdash; prevents contamination spreading
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Hold the eyelids open during flushing to ensure thorough irrigation
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Identify the chemical &mdash; bring the Safety Data Sheet (SDS) or container
                        to hospital
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Call 999 or go to A&amp;E urgently after flushing</span>
                    </li>
                  </ul>
                </div>

                {/* Embedded Object */}
                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-5 w-5 text-amber-400" />
                    <p className="text-sm font-medium text-amber-400">
                      Embedded Object (Glass, Metal)
                    </p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Do <strong className="text-red-300">NOT</strong> remove the object &mdash;
                        removal can cause catastrophic further damage
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Do <strong className="text-red-300">NOT</strong> press on the eye or allow
                        anything to touch the object
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Build up padding around the object using a{' '}
                        <strong className="text-white">ring pad (donut)</strong> to protect it
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Bandage <strong className="text-white">BOTH</strong> eyes &mdash; this
                        prevents sympathetic eye movement from causing further damage
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Call 999 &mdash; the casualty needs specialist ophthalmic treatment
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Blunt Trauma & Arc Eye */}
                <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Eye className="h-5 w-5 text-purple-400" />
                    <p className="text-sm font-medium text-purple-400">
                      Blunt Trauma &amp; Arc Eye
                    </p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Blunt trauma:</strong> Apply a cold compress
                        (not directly on the eye), check vision, refer to A&amp;E for assessment
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">
                          Arc eye (welder&rsquo;s flash / UV keratitis):
                        </strong>{' '}
                        Symptoms appear 6&ndash;12 hours after exposure &mdash; intense pain, gritty
                        sensation, watering, light sensitivity
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Arc eye first aid: cover both eyes with cool, damp pads, take paracetamol
                        for pain, attend A&amp;E
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Usually resolves in 24&ndash;48 hours, but repeated exposure can cause
                        permanent corneal damage
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Why Bandage Both Eyes?</strong> When one eye
                  moves, the other moves with it &mdash; this is called{' '}
                  <strong>sympathetic eye movement</strong> (conjugate gaze). If an embedded object
                  is in one eye, every movement of the other eye causes the injured eye to move as
                  well, risking further damage. Covering both eyes minimises all eye movement.
                  Explain this to the casualty &mdash; having both eyes covered is frightening, so
                  reassure them and stay with them at all times.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Construction Site Eye Risks */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">06</span>
            Construction Site Eye Risks &amp; Prevention
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Eye injuries are among the most common workplace injuries on construction sites.
                Many are entirely preventable with the correct use of personal protective equipment
                (PPE). As an electrician, you face specific risks that other trades may not
                encounter.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Common Eye Hazards for Electricians
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Grinding sparks:</strong> Hot metal fragments
                      from angle grinders, bench grinders, and cutting discs. These can embed in the
                      cornea and cause a rust ring if not removed promptly.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Drilling debris:</strong> Concrete dust, brick
                      dust, plaster particles, and metal swarf from drilling into walls, ceilings,
                      and steelwork. Particularly hazardous when drilling overhead.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Cable dust:</strong> Fibrous dust from cutting
                      or stripping cables, insulation material, and trunking/conduit filings.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Chemical splash:</strong> Solvents, adhesives,
                      PVC cement, flux, and cleaning chemicals used during electrical installation.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Arc flash:</strong> Intense UV radiation from
                      electrical arcs can cause flash blindness and arc eye. Arc flash PPE including
                      face shields is essential when working on live or recently-isolated equipment.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Prevention:</strong> Always wear appropriate eye
                  protection for the task: safety glasses for general work, safety goggles for
                  grinding, drilling overhead, or chemical handling, and arc-rated face shields for
                  electrical work near live equipment. Know the location of the nearest eyewash
                  station before starting work. If eyewash stations are not available, carry a
                  sterile eyewash bottle in your tool bag.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    If In Doubt &mdash; Seek Medical Attention
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Any eye injury that does not resolve quickly with simple first aid (irrigation for
                  foreign bodies, cold compress for blunt trauma) should be assessed at A&amp;E or
                  by an optician. Persistent pain, blurred vision, sensitivity to light, sensation
                  of something still in the eye, or any visible damage to the eye all require
                  professional assessment. It is far better to have a minor injury checked than to
                  risk permanent damage to your sight.
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
        <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

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
            <Link to="../first-aid-module-5-section-3">
              Next: Poisoning, COSHH &amp; Hazardous Substances
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
