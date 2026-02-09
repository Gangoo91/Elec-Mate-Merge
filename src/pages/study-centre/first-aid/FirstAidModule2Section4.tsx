import { ArrowLeft, AlertTriangle, CheckCircle, Shield, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'choking-mild-vs-severe',
    question:
      'A colleague is eating lunch on site and suddenly starts coughing forcefully, clutching their throat. They are still able to speak between coughs and their face is flushed but not turning blue. What should you do?',
    options: [
      'Immediately give 5 back blows between the shoulder blades',
      'Encourage them to keep coughing and do NOT interfere with their efforts',
      'Perform abdominal thrusts (Heimlich manoeuvre) straight away',
      'Call 999 immediately as all choking is life-threatening',
    ],
    correctIndex: 1,
    explanation:
      'This person has a MILD airway obstruction — they can still cough effectively and speak. The correct action is to encourage them to keep coughing, as a forceful cough is the most effective way to clear the obstruction. Do NOT interfere with their efforts by slapping their back or performing thrusts. Only intervene with back blows and abdominal thrusts if the obstruction becomes severe (unable to cough, speak, or breathe).',
  },
  {
    id: 'choking-unconscious',
    question:
      'You have been alternating back blows and abdominal thrusts on a choking casualty for 2 minutes. The casualty suddenly becomes limp and loses consciousness. What is your IMMEDIATE next action?',
    options: [
      'Continue giving abdominal thrusts with the casualty on the ground',
      'Place them in the recovery position and wait for the ambulance',
      'Lower them carefully to the ground and begin CPR — 30 compressions, then check the mouth before giving breaths',
      'Attempt to sweep the object from their throat with your finger',
    ],
    correctIndex: 2,
    explanation:
      'When a choking casualty becomes unconscious, you must lower them carefully to the ground and begin CPR immediately. Give 30 chest compressions, then each time you open the airway to give breaths, quickly look in the mouth and remove any visible object. The chest compressions may help dislodge the obstruction. Call 999 if not already done. Do NOT perform blind finger sweeps — only remove objects you can clearly see.',
  },
  {
    id: 'choking-infant',
    question:
      'A 7-month-old baby at a site welfare room is choking and cannot cry or make any sound. Which technique should you use?',
    options: [
      '5 back blows then 5 abdominal thrusts (Heimlich manoeuvre)',
      '5 back blows then 5 chest thrusts using 2 fingers on the lower breastbone',
      'Abdominal thrusts only — they are most effective for infants',
      'Turn the baby upside down and shake gently to dislodge the object',
    ],
    correctIndex: 1,
    explanation:
      'For infants under 1 year, give 5 back blows (baby face-down, head lower than chest, on your forearm) then 5 chest thrusts using 2 fingers on the lower half of the breastbone. Do NOT use abdominal thrusts on infants — their internal organs are too fragile. Alternate back blows and chest thrusts until the obstruction clears or the infant becomes unconscious. If the infant becomes unconscious, begin infant CPR.',
  },
];

const faqs = [
  {
    question: 'Should I perform abdominal thrusts on a pregnant woman who is choking?',
    answer:
      'No. Abdominal thrusts must NOT be used on pregnant women as they risk injury to the mother and unborn child. Instead, use CHEST thrusts: stand behind the casualty, place your arms under their armpits and around the chest, position your fist on the lower half of the breastbone (sternum), and pull sharply inwards. Alternate 5 back blows with 5 chest thrusts. The same approach applies to anyone where you cannot get your arms around the abdomen.',
  },
  {
    question:
      'After I successfully clear a choking obstruction with abdominal thrusts, does the casualty need to go to hospital?',
    answer:
      'Yes — if abdominal thrusts were used, the casualty MUST be sent to hospital for assessment, even if they feel fine. Abdominal thrusts can cause internal injuries including damage to the stomach, spleen, liver, and blood vessels that may not be immediately apparent. All casualties who have experienced choking should be advised to seek medical attention, but hospital attendance is mandatory after abdominal thrusts.',
  },
  {
    question: 'What is the difference between back blows for adults and infants?',
    answer:
      'For adults and children over 1 year: stand to the side and slightly behind, support the chest with one hand, lean the casualty well forward, and deliver sharp blows between the shoulder blades with the heel of your hand. For infants under 1 year: lay the baby face-down along your forearm with the head lower than the chest, support the head and jaw, and deliver up to 5 back blows between the shoulder blades. The key difference is the infant must be in a head-down position on your forearm, and you must support the head throughout.',
  },
  {
    question: 'How can choking risks be reduced on construction sites?',
    answer:
      'Prevention measures include: eating only in designated welfare areas (not while walking around site or working at height), not rushing meals during short breaks, cutting food into smaller pieces, being aware that small objects such as screws, cable ties, pen caps, and washers pose a choking risk if placed in the mouth, keeping the welfare area clean and free of construction debris, and ensuring all workers know the location of the nearest trained first aider. Site inductions should cover choking awareness as part of general first aid.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the universal choking sign that a first aider should recognise?',
    options: [
      'The casualty points at their chest and coughs loudly',
      'The casualty clutches their throat with one or both hands',
      'The casualty waves their arms above their head',
      'The casualty lies down on the floor',
    ],
    correctAnswer: 1,
    explanation:
      'The universal choking sign is the casualty clutching their throat with one or both hands. This instinctive gesture indicates airway obstruction. Other signs include sudden onset during eating or drinking, inability to speak, cough or breathe, and progressive cyanosis (blue discolouration of the lips and face). The casualty may also look panicked and distressed.',
  },
  {
    id: 2,
    question:
      "A choking casualty is coughing forcefully and can say 'I'm choking' between coughs. This is classified as:",
    options: [
      'Severe obstruction — immediate intervention required',
      'Complete obstruction — begin CPR',
      'Mild obstruction — encourage coughing, do NOT interfere',
      'Partial obstruction — give 5 back blows',
    ],
    correctAnswer: 2,
    explanation:
      "If the casualty can cough effectively and speak, this is a MILD obstruction. The airway is partially blocked but air is still passing. An effective cough is the body's best mechanism for clearing the obstruction. The first aider should encourage the casualty to keep coughing and must NOT interfere by giving back blows or abdominal thrusts — intervention at this stage could make the obstruction worse.",
  },
  {
    id: 3,
    question: 'When performing back blows on a choking adult, where should you deliver the blows?',
    options: [
      'On the lower back, above the hips',
      'On the back of the head to stimulate the cough reflex',
      'Between the shoulder blades with the heel of your hand',
      'On the side of the ribcage',
    ],
    correctAnswer: 2,
    explanation:
      'Back blows are delivered between the shoulder blades using the heel of the hand. The casualty should be leaning well forward (so the obstruction can move outwards rather than further down the airway). Stand to the side and slightly behind, support the chest with one hand, and give up to 5 sharp blows. Check after each blow whether the obstruction has cleared — if it clears, stop immediately.',
  },
  {
    id: 4,
    question: 'Where should you position your fist when performing abdominal thrusts?',
    options: [
      'On the chest, over the breastbone',
      'On the stomach, below the navel',
      'Between the navel and the bottom of the breastbone',
      'On the side of the abdomen, below the ribs',
    ],
    correctAnswer: 2,
    explanation:
      'When performing abdominal thrusts (Heimlich manoeuvre), place your fist between the navel (belly button) and the bottom of the breastbone (sternum). This position allows the upward thrust to compress the diaphragm and force air from the lungs, creating an artificial cough to dislodge the obstruction. Placing the fist too low risks injury to internal organs; too high risks fracturing the xiphoid process.',
  },
  {
    id: 5,
    question: 'After 5 back blows fail to clear a severe obstruction, what do you do next?',
    options: [
      'Give 5 more back blows with greater force',
      'Give 5 abdominal thrusts',
      'Call 999 and wait for the ambulance',
      'Place the casualty in the recovery position',
    ],
    correctAnswer: 1,
    explanation:
      'The Resuscitation Council UK protocol is to alternate 5 back blows with 5 abdominal thrusts. If 5 back blows do not clear the obstruction, immediately move to 5 abdominal thrusts. If the obstruction still has not cleared, repeat the cycle: 5 back blows then 5 abdominal thrusts. Continue this alternating pattern until the obstruction clears, the casualty becomes unconscious, or emergency services arrive.',
  },
  {
    id: 6,
    question: 'Why must abdominal thrusts NOT be used on infants under 1 year?',
    options: [
      'Infants are too small to get your arms around',
      'Abdominal thrusts are not effective on infants',
      'The risk of internal organ damage is too high in infants',
      'It is easier to turn infants upside down instead',
    ],
    correctAnswer: 2,
    explanation:
      'Abdominal thrusts must NOT be used on infants under 1 year because their internal organs (liver, spleen, stomach) are very fragile and the force of abdominal thrusts could cause serious internal injuries. Instead, use chest thrusts: place 2 fingers on the lower half of the breastbone and push sharply inwards and upwards. Alternate 5 back blows with 5 chest thrusts.',
  },
  {
    id: 7,
    question:
      'A choking casualty becomes unconscious during your treatment. You begin CPR. Each time you open the airway to give breaths, you should:',
    options: [
      'Give 2 breaths immediately without looking in the mouth',
      'Perform a blind finger sweep to check for objects',
      'Quickly look in the mouth and remove any visible object before giving breaths',
      'Skip the breaths and only give compressions',
    ],
    correctAnswer: 2,
    explanation:
      'Each time you open the airway to give rescue breaths during CPR for an unconscious choking casualty, you should quickly look in the mouth for any visible obstruction. If you can see an object, carefully remove it. Do NOT perform blind finger sweeps — you risk pushing the object further into the airway. The chest compressions themselves may help dislodge the obstruction, so continue the 30:2 cycle.',
  },
  {
    id: 8,
    question:
      'After a choking incident where abdominal thrusts were used, the casualty says they feel fine and wants to go back to work. What should you advise?',
    options: [
      'If they feel fine, they can return to work immediately',
      'Rest for 30 minutes then return to work if no symptoms develop',
      'They MUST go to hospital — abdominal thrusts can cause internal injuries that are not immediately apparent',
      'Apply an ice pack to the abdomen and monitor for 1 hour',
    ],
    correctAnswer: 2,
    explanation:
      'If abdominal thrusts were used, the casualty MUST attend hospital for medical assessment, even if they feel completely fine. Abdominal thrusts can cause damage to the stomach, spleen, liver, and abdominal blood vessels that may not produce symptoms immediately but could become life-threatening. This is a non-negotiable requirement. Document the incident and ensure the casualty is transported to hospital.',
  },
];

const FirstAidModule2Section4 = () => {
  useSEO({
    title: 'Choking Management | First Aid Module 2 Section 4',
    description:
      'Learn to recognise choking, perform back blows and abdominal thrusts, manage unconscious choking, and treat special populations including infants, children, and pregnant women.',
  });

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* Sticky Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a]/95 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../first-aid-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-rose-500/20 to-rose-600/20 border border-rose-500/30 mb-4">
            <AlertTriangle className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-block bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full text-sm font-semibold mb-4 ml-0">
            <span className="text-rose-400">MODULE 2</span>
            <span className="text-white/40 mx-2">&middot;</span>
            <span className="text-white/60">SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">Choking Management</h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Recognising airway obstruction and intervening effectively with back blows, abdominal
            thrusts, and CPR for unconscious choking casualties
          </p>
        </div>

        {/* Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <div className="rounded-lg p-4 bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="font-semibold text-rose-400 mb-2">In 30 Seconds</p>
            <ul className="text-white/80 text-base space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Mild:</strong> effective cough, can speak —
                  encourage coughing, do NOT interfere
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Severe:</strong> no effective cough, cannot speak —
                  5 back blows then 5 abdominal thrusts
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Unconscious:</strong> begin CPR, check mouth each
                  time you open the airway
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">After:</strong> ALWAYS advise medical review —
                  hospital if thrusts were used
                </span>
              </li>
            </ul>
          </div>
          <div className="rounded-lg p-4 bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="font-semibold text-rose-400/90 mb-2">Key Protocol</p>
            <ul className="text-white/80 text-base space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Assess:</strong> mild or severe? Can they cough,
                  speak, breathe?
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Act:</strong> 5 back blows &rarr; 5 abdominal
                  thrusts &rarr; repeat cycle
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Infants:</strong> back blows + chest thrusts —
                  NEVER abdominal thrusts
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Pregnant:</strong> chest thrusts instead of
                  abdominal thrusts
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
          <p className="text-white/70 mb-4">By the end of this section, you will be able to:</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              'Recognise the signs and symptoms of choking and differentiate between mild and severe obstruction',
              'Perform up to 5 back blows correctly, checking after each blow for clearance',
              'Perform up to 5 abdominal thrusts (Heimlich manoeuvre) with correct hand positioning',
              'Manage an unconscious choking casualty using CPR with airway checks',
              'Adapt choking management for special populations including infants, children, and pregnant women',
              'Explain the importance of post-choking medical review and when hospital attendance is mandatory',
            ].map((outcome, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-rose-400/70 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Recognising Choking */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400/80 text-sm font-normal">01</span>
              Recognising Choking
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Choking occurs when a foreign object partially or completely blocks the airway,
                preventing normal breathing. In adults, choking most commonly happens during eating
                or drinking. On construction sites, small objects such as screws, cable ties, or pen
                caps can also pose a risk if placed in the mouth. Rapid recognition is essential — a
                completely blocked airway can lead to unconsciousness within minutes and death
                within 4&ndash;5 minutes if not cleared.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-rose-400">Signs and Symptoms of Choking</h3>
                <div className="space-y-2 text-sm text-white/70">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Universal choking sign:</strong> the casualty
                      clutches their throat with one or both hands — this is an instinctive,
                      internationally recognised gesture
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Sudden onset:</strong> symptoms begin abruptly
                      during eating, drinking, or while small objects are in the mouth
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Inability to speak:</strong> the casualty may
                      be unable to answer when asked &ldquo;Are you choking?&rdquo;
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Inability to cough or breathe:</strong> the
                      casualty may attempt to cough but produce no sound, or may not be able to draw
                      breath
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Distress and panic:</strong> the casualty
                      appears frightened, may be wide-eyed, and may grab at people nearby
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Cyanosis:</strong> blue discolouration of the
                      lips, face, earlobes, and fingernails — indicates severe oxygen deprivation
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-2">Ask the Question</h3>
                <p className="text-white/70 text-sm">
                  If you suspect someone is choking, ask them clearly:{' '}
                  <strong className="text-white">&ldquo;Are you choking?&rdquo;</strong> If they can
                  answer verbally, the obstruction is mild. If they cannot speak, nod, point to
                  their throat, or show obvious distress, the obstruction is likely severe and you
                  must act immediately.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Mild vs Severe Obstruction */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400/80 text-sm font-normal">02</span>
              Mild vs Severe Obstruction
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                The Resuscitation Council UK classifies choking into two categories based on the
                effectiveness of the casualty&rsquo;s cough. The distinction between mild and severe
                obstruction determines your entire course of action — getting this assessment right
                is the most critical first step.
              </p>

              {/* Two-column comparison grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Mild obstruction - green */}
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <h3 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Mild Obstruction
                  </h3>
                  <div className="space-y-2 text-sm text-white/70 mb-4">
                    <p className="font-medium text-green-300">Signs:</p>
                    <div className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Effective cough — loud, forceful</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Able to speak or cry</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Able to breathe (may be wheezy)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Fully conscious and responsive</span>
                    </div>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
                    <p className="font-medium text-green-300 text-sm mb-1">Action:</p>
                    <p className="text-white/80 text-sm">
                      Encourage the casualty to keep coughing.{' '}
                      <strong className="text-white">Do NOT interfere</strong> with their efforts —
                      no back blows, no thrusts. Stay with them and monitor. If the cough becomes
                      ineffective, treat as severe.
                    </p>
                  </div>
                </div>

                {/* Severe obstruction - red */}
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <h3 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Severe Obstruction
                  </h3>
                  <div className="space-y-2 text-sm text-white/70 mb-4">
                    <p className="font-medium text-red-300">Signs:</p>
                    <div className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Ineffective cough or no cough at all</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Unable to speak — silent or whispering</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Unable to breathe or breathing very quietly</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                      <span>May become unconscious</span>
                    </div>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
                    <p className="font-medium text-red-300 text-sm mb-1">Action:</p>
                    <p className="text-white/80 text-sm">
                      <strong className="text-white">Immediate intervention required.</strong> Give
                      up to 5 back blows. If unsuccessful, give up to 5 abdominal thrusts. Alternate
                      until cleared. Call 999 if not clearing.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-rose-300">Critical Distinction</h3>
                </div>
                <p className="text-white/70 text-sm">
                  The key question is:{' '}
                  <strong className="text-white">can the casualty cough effectively?</strong> An
                  effective cough means the body is clearing the obstruction itself — your
                  intervention could make it worse. An ineffective or absent cough means the body
                  cannot clear the obstruction and the casualty will deteriorate rapidly without
                  your help. Mild obstruction can progress to severe obstruction at any moment, so
                  never leave a choking casualty unattended.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Choking Technique — Back Blows & Abdominal Thrusts */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400/80 text-sm font-normal">03</span>
              Back Blows &amp; Abdominal Thrusts
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                For a conscious casualty with severe airway obstruction, the Resuscitation Council
                UK recommends alternating between back blows and abdominal thrusts. Each technique
                creates a different type of pressure to dislodge the obstruction. Always start with
                back blows.
              </p>

              {/* Choking Technique Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-4 text-center">
                  Choking Technique Overview
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Panel 1: Back Blows */}
                  <div className="bg-rose-500/5 border border-rose-500/20 rounded-lg p-4">
                    <h4 className="text-rose-300 font-semibold text-sm mb-3 text-center">
                      Back Blows Position
                    </h4>
                    <div className="relative w-full max-w-[200px] mx-auto aspect-[3/4] mb-3">
                      {/* Casualty figure - leaning forward */}
                      <div className="absolute bottom-[10%] left-[20%] w-[35%] h-[75%]">
                        {/* Body - angled forward */}
                        <div
                          className="absolute bottom-0 left-[30%] w-3 bg-rose-300/40 rounded-full origin-bottom"
                          style={{ height: '55%', transform: 'rotate(30deg)' }}
                        />
                        {/* Head */}
                        <div className="absolute top-[8%] left-[5%] w-6 h-6 bg-rose-300/40 rounded-full" />
                        {/* Legs */}
                        <div
                          className="absolute bottom-0 left-[25%] w-2.5 bg-rose-300/30 rounded-full"
                          style={{ height: '40%' }}
                        />
                        <div
                          className="absolute bottom-0 left-[50%] w-2.5 bg-rose-300/30 rounded-full"
                          style={{ height: '40%' }}
                        />
                      </div>
                      {/* Rescuer figure - standing behind */}
                      <div className="absolute bottom-[10%] right-[10%] w-[35%] h-[80%]">
                        {/* Body */}
                        <div
                          className="absolute bottom-0 left-[40%] w-3 bg-rose-400/50 rounded-full"
                          style={{ height: '55%' }}
                        />
                        {/* Head */}
                        <div className="absolute top-0 left-[30%] w-7 h-7 bg-rose-400/50 rounded-full" />
                        {/* Arm delivering blow */}
                        <div
                          className="absolute top-[30%] left-0 w-[60%] h-2 bg-rose-400/60 rounded-full origin-right"
                          style={{ transform: 'rotate(-20deg)' }}
                        />
                        {/* Legs */}
                        <div
                          className="absolute bottom-0 left-[30%] w-2.5 bg-rose-400/30 rounded-full"
                          style={{ height: '40%' }}
                        />
                        <div
                          className="absolute bottom-0 left-[55%] w-2.5 bg-rose-400/30 rounded-full"
                          style={{ height: '40%' }}
                        />
                      </div>
                      {/* Impact point */}
                      <div className="absolute top-[35%] left-[42%] w-5 h-5 rounded-full bg-rose-500/30 border-2 border-rose-400 animate-pulse" />
                      {/* Arrow showing blow direction */}
                      <div className="absolute top-[28%] left-[44%] text-rose-400 text-lg font-bold">
                        &darr;
                      </div>
                    </div>
                    <div className="text-center text-xs text-white/50 space-y-1">
                      <p className="text-rose-300 font-medium">Between shoulder blades</p>
                      <p>Casualty leaning well forward</p>
                      <p>Rescuer to the side and behind</p>
                    </div>
                  </div>

                  {/* Panel 2: Abdominal Thrusts */}
                  <div className="bg-rose-500/5 border border-rose-500/20 rounded-lg p-4">
                    <h4 className="text-rose-300 font-semibold text-sm mb-3 text-center">
                      Abdominal Thrusts Position
                    </h4>
                    <div className="relative w-full max-w-[200px] mx-auto aspect-[3/4] mb-3">
                      {/* Casualty figure - standing */}
                      <div className="absolute bottom-[10%] left-[25%] w-[30%] h-[80%]">
                        {/* Body */}
                        <div
                          className="absolute bottom-0 left-[35%] w-3 bg-rose-300/40 rounded-full"
                          style={{ height: '55%' }}
                        />
                        {/* Head */}
                        <div className="absolute top-0 left-[25%] w-6 h-6 bg-rose-300/40 rounded-full" />
                        {/* Legs */}
                        <div
                          className="absolute bottom-0 left-[25%] w-2.5 bg-rose-300/30 rounded-full"
                          style={{ height: '40%' }}
                        />
                        <div
                          className="absolute bottom-0 left-[50%] w-2.5 bg-rose-300/30 rounded-full"
                          style={{ height: '40%' }}
                        />
                      </div>
                      {/* Rescuer figure - behind */}
                      <div className="absolute bottom-[10%] right-[8%] w-[35%] h-[80%]">
                        {/* Body */}
                        <div
                          className="absolute bottom-0 left-[40%] w-3 bg-rose-400/50 rounded-full"
                          style={{ height: '55%' }}
                        />
                        {/* Head */}
                        <div className="absolute top-0 left-[30%] w-7 h-7 bg-rose-400/50 rounded-full" />
                        {/* Arms wrapping around */}
                        <div className="absolute top-[38%] left-[-30%] w-[80%] h-2 bg-rose-400/60 rounded-full" />
                        {/* Legs */}
                        <div
                          className="absolute bottom-0 left-[30%] w-2.5 bg-rose-400/30 rounded-full"
                          style={{ height: '40%' }}
                        />
                        <div
                          className="absolute bottom-0 left-[55%] w-2.5 bg-rose-400/30 rounded-full"
                          style={{ height: '40%' }}
                        />
                      </div>
                      {/* Fist position marker */}
                      <div className="absolute top-[48%] left-[32%] w-5 h-5 rounded-full bg-rose-500/30 border-2 border-rose-400 animate-pulse" />
                      {/* Arrow showing thrust direction */}
                      <div className="absolute top-[50%] left-[22%] text-rose-400 text-sm font-bold">
                        &larr;
                      </div>
                      <div className="absolute top-[44%] left-[34%] text-rose-400 text-lg font-bold">
                        &uarr;
                      </div>
                    </div>
                    <div className="text-center text-xs text-white/50 space-y-1">
                      <p className="text-rose-300 font-medium">Between navel &amp; breastbone</p>
                      <p>Rescuer behind, arms around abdomen</p>
                      <p>Pull sharply inwards and upwards</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center gap-6 mt-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-rose-300/40 rounded-full" />
                    <span className="text-white/60">Casualty</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-rose-400/50 rounded-full" />
                    <span className="text-white/60">Rescuer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-rose-500/30 rounded-full border-2 border-rose-400" />
                    <span className="text-white/60">Point of action</span>
                  </div>
                </div>
              </div>

              {/* 5 Back Blows - Step by Step */}
              <div className="bg-white/5 border border-rose-500/30 p-4 rounded-lg">
                <h3 className="text-rose-400 font-semibold mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5" />5 Back Blows — Step by Step
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      step: 1,
                      title: 'Position yourself',
                      detail:
                        'Stand to the side and slightly behind the casualty. If they are standing, you should be able to reach their upper back comfortably.',
                    },
                    {
                      step: 2,
                      title: 'Support and lean forward',
                      detail:
                        "Support the casualty's chest with one hand and lean them well forward so that when the obstruction is dislodged, it comes out of the mouth rather than falling further down the airway.",
                    },
                    {
                      step: 3,
                      title: 'Deliver up to 5 sharp blows',
                      detail:
                        'Using the heel of your hand, give up to 5 sharp blows between the shoulder blades. Each blow should be a separate, distinct strike aimed at dislodging the obstruction.',
                    },
                    {
                      step: 4,
                      title: 'Check after each blow',
                      detail:
                        'After each back blow, check whether the obstruction has been cleared. Look for signs that the casualty can breathe, cough, or speak again.',
                    },
                    {
                      step: 5,
                      title: 'Stop when cleared',
                      detail:
                        'If the obstruction clears after 1, 2, 3, or 4 blows, STOP — do not give all 5 if the airway is already clear. If 5 back blows fail to clear the obstruction, move to abdominal thrusts.',
                    },
                  ].map(({ step, title, detail }) => (
                    <div key={step} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-rose-400 text-sm font-bold">{step}</span>
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{title}</p>
                        <p className="text-white/60 text-sm">{detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5 Abdominal Thrusts - Step by Step */}
              <div className="bg-white/5 border border-rose-500/30 p-4 rounded-lg">
                <h3 className="text-rose-400 font-semibold mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5" />5 Abdominal Thrusts (Heimlich Manoeuvre) — Step by
                  Step
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      step: 1,
                      title: 'Stand behind the casualty',
                      detail:
                        'Position yourself directly behind the casualty and wrap both arms around their upper abdomen. The casualty should be leaning slightly forward.',
                    },
                    {
                      step: 2,
                      title: 'Make a fist',
                      detail:
                        'Make a fist with one hand and place it between the navel (belly button) and the bottom of the breastbone (sternum). This is the correct position for maximum effectiveness.',
                    },
                    {
                      step: 3,
                      title: 'Grasp the fist',
                      detail:
                        "Grasp your fist with your other hand, locking both hands together firmly. Ensure your thumb is on the inside of the fist against the casualty's abdomen.",
                    },
                    {
                      step: 4,
                      title: 'Pull sharply inwards and upwards',
                      detail:
                        'Pull sharply inwards and upwards — this compresses the diaphragm and forces air from the lungs, creating an artificial cough to dislodge the obstruction. Give up to 5 thrusts.',
                    },
                    {
                      step: 5,
                      title: 'Check after each thrust',
                      detail:
                        'Check after each thrust whether the obstruction has cleared. If it clears, stop immediately. If 5 abdominal thrusts fail, return to 5 back blows and continue the cycle.',
                    },
                  ].map(({ step, title, detail }) => (
                    <div key={step} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-rose-400 text-sm font-bold">{step}</span>
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{title}</p>
                        <p className="text-white/60 text-sm">{detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cycle explanation */}
              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-rose-400">The Alternating Cycle</h3>
                <div className="flex flex-col sm:flex-row items-center gap-3 text-center py-3">
                  <div className="bg-rose-500/20 border border-rose-500/30 rounded-lg px-4 py-2">
                    <p className="text-rose-300 font-bold text-lg">5</p>
                    <p className="text-white/60 text-xs">Back Blows</p>
                  </div>
                  <span className="text-rose-400 text-2xl">&rarr;</span>
                  <div className="bg-rose-500/20 border border-rose-500/30 rounded-lg px-4 py-2">
                    <p className="text-rose-300 font-bold text-lg">5</p>
                    <p className="text-white/60 text-xs">Abdominal Thrusts</p>
                  </div>
                  <span className="text-rose-400 text-2xl">&rarr;</span>
                  <div className="bg-rose-500/20 border border-rose-500/30 rounded-lg px-4 py-2">
                    <p className="text-rose-300 font-bold text-lg">&orarr;</p>
                    <p className="text-white/60 text-xs">Repeat Cycle</p>
                  </div>
                </div>
                <p className="text-white/70 text-sm text-center mt-2">
                  Continue alternating until the obstruction clears, the casualty becomes
                  unconscious, or emergency services arrive.
                  <strong className="text-white">
                    {' '}
                    Call 999 if the obstruction does not clear after the first cycle.
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Unconscious Choking — CPR */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400/80 text-sm font-normal">04</span>
              Unconscious Choking &mdash; CPR
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                If a choking casualty becomes unconscious, the situation has escalated to a
                life-threatening emergency. The muscles around the airway may relax when
                consciousness is lost, which can sometimes allow the obstruction to be cleared with
                chest compressions. You must begin CPR immediately.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">Unconscious Choking Protocol</h3>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      step: 1,
                      text: 'Lower the casualty carefully to the ground — support their head and body to prevent injury',
                    },
                    {
                      step: 2,
                      text: 'Call 999 immediately (or instruct a bystander to call) if not already done',
                    },
                    {
                      step: 3,
                      text: 'Begin CPR — give 30 chest compressions at a rate of 100-120 per minute, depth of 5-6 cm',
                    },
                    {
                      step: 4,
                      text: 'Open the airway (head tilt, chin lift) and quickly look in the mouth for any visible obstruction',
                    },
                    {
                      step: 5,
                      text: 'If you can see an object, carefully remove it — do NOT perform blind finger sweeps',
                    },
                    {
                      step: 6,
                      text: 'Attempt 2 rescue breaths, then continue with 30 compressions',
                    },
                    {
                      step: 7,
                      text: 'Each time you open the airway for breaths, check the mouth again for visible objects',
                    },
                    {
                      step: 8,
                      text: 'Continue CPR (30:2) until the obstruction clears, the casualty recovers, or emergency services take over',
                    },
                  ].map(({ step, text }) => (
                    <div key={step} className="flex items-start gap-3 text-sm">
                      <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-red-400 text-xs font-bold">{step}</span>
                      </div>
                      <p className="text-white/70">{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-2">
                  Why CPR Works for Unconscious Choking
                </h3>
                <p className="text-white/70 text-sm">
                  Chest compressions generate pressure within the chest cavity that can help
                  dislodge a foreign body from the airway — effectively acting as both back blows
                  and abdominal thrusts combined. When the casualty loses consciousness, the muscle
                  tone around the airway reduces, which may allow the object to move. The
                  compressions can then push air past or around the obstruction. This is why CPR is
                  the recommended treatment for unconscious choking, not continued abdominal
                  thrusts.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Post-Choking Medical Review */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400/80 text-sm font-normal">05</span>
              Post-Choking Medical Review
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                After any choking incident, the casualty should be advised to seek medical
                attention. Even when the obstruction has been cleared successfully, there may be
                residual damage to the throat, airway, or internal organs that requires professional
                assessment.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">Mandatory Hospital Attendance</h3>
                </div>
                <p className="text-white/70 text-sm mb-3">
                  If <strong className="text-white">abdominal thrusts were used</strong>, the
                  casualty <strong className="text-white">MUST</strong> attend hospital for medical
                  assessment. This is non-negotiable, even if the casualty feels completely fine.
                </p>
                <div className="space-y-2 text-sm text-white/70">
                  <p className="font-medium text-red-300">Abdominal thrusts can cause:</p>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>Damage to the stomach and intestines</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>Rupture or bruising of the spleen</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>Liver damage</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>Damage to abdominal blood vessels</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>Rib fractures (particularly in elderly casualties)</span>
                  </div>
                </div>
                <p className="text-white/50 text-xs mt-3 italic">
                  These injuries may not produce symptoms immediately but can become
                  life-threatening hours later. Always err on the side of caution.
                </p>
              </div>

              <div className="bg-white/5 border border-rose-500/30 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  Post-Choking Advice for All Casualties
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-1 flex-shrink-0" />
                    <div>
                      Advise the casualty to see a doctor or attend A&amp;E, even if they feel well
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-1 flex-shrink-0" />
                    <div>
                      Watch for persistent sore throat, difficulty swallowing, or coughing after the
                      incident
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-1 flex-shrink-0" />
                    <div>
                      Parts of the obstruction may remain in the airway even after the main blockage
                      is cleared
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-1 flex-shrink-0" />
                    <div>
                      Record the incident in the site accident book and complete an incident report
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-1 flex-shrink-0" />
                    <div>
                      If abdominal thrusts were used, arrange transport to hospital — do not let the
                      casualty drive themselves
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Special Populations */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400/80 text-sm font-normal">06</span>
              Choking in Special Populations
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                The standard back blows and abdominal thrusts technique must be adapted for certain
                groups. Understanding these modifications ensures you can help anyone who is
                choking, regardless of their age, size, or condition.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Pregnant Women */}
                <div className="bg-white/5 border border-rose-400/30 p-4 rounded-lg">
                  <h3 className="text-rose-300 font-medium mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Pregnant Women
                  </h3>
                  <p className="text-white/70 text-sm mb-2">
                    <strong className="text-white">Chest thrusts</strong> replace abdominal thrusts:
                  </p>
                  <ul className="text-white/70 space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Give 5 back blows as normal</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Stand behind, arms under the armpits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Place hands on the lower half of the breastbone</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Pull sharply inwards (chest thrusts)</span>
                    </li>
                  </ul>
                </div>

                {/* Obese Casualties */}
                <div className="bg-white/5 border border-rose-400/30 p-4 rounded-lg">
                  <h3 className="text-rose-300 font-medium mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Obese Casualties
                  </h3>
                  <p className="text-white/70 text-sm mb-2">
                    If you <strong className="text-white">cannot reach around the abdomen</strong>:
                  </p>
                  <ul className="text-white/70 space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Give 5 back blows as normal</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Use chest thrusts instead of abdominal thrusts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Same technique as for pregnant women</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Hands on lower breastbone, pull inwards</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Children (1-12 years) */}
                <div className="bg-white/5 border border-rose-400/30 p-4 rounded-lg">
                  <h3 className="text-rose-300 font-medium mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Children (1&ndash;12 Years)
                  </h3>
                  <p className="text-white/70 text-sm mb-2">
                    <strong className="text-white">Same technique, adjusted force:</strong>
                  </p>
                  <ul className="text-white/70 space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>5 back blows — use less force than for an adult</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>5 abdominal thrusts — reduced force, same position</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>You may need to kneel for smaller children</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Adjust your body position to the child&rsquo;s height</span>
                    </li>
                  </ul>
                </div>

                {/* Infants (<1 year) */}
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <h3 className="text-red-300 font-medium mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Infants (Under 1 Year)
                  </h3>
                  <p className="text-white/70 text-sm mb-2">
                    <strong className="text-white">
                      Different technique — NO abdominal thrusts:
                    </strong>
                  </p>
                  <ul className="text-white/70 space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Lay baby face-down on your forearm, head lower than chest</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Support the head and jaw with your hand</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>5 back blows between the shoulder blades</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        Turn baby face-up, give 5 chest thrusts (2 fingers, lower breastbone)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span className="text-red-300 font-medium">
                        NEVER use abdominal thrusts on infants
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Wheelchair users */}
              <div className="bg-white/5 border border-rose-400/30 p-4 rounded-lg">
                <h3 className="text-rose-300 font-medium mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Wheelchair Users
                </h3>
                <p className="text-white/70 text-sm">
                  Back blows and abdominal thrusts{' '}
                  <strong className="text-white">can be performed with the casualty seated</strong>{' '}
                  in their wheelchair. Lock the wheelchair brakes first. For back blows, lean the
                  casualty forward in the chair as far as is safely possible. For abdominal thrusts,
                  stand behind the wheelchair and perform the technique as normal. If the wheelchair
                  has a high back that prevents access, lean the casualty to one side to deliver
                  back blows. Do NOT attempt to lift the casualty from the wheelchair unless it is
                  essential and safe to do so.
                </p>
              </div>

              {/* Prevention on construction sites */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">Prevention on Construction Sites</h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <Shield className="h-4 w-4 text-rose-400 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Eat in designated welfare areas only</strong> —
                      not while walking around site or working at height
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="h-4 w-4 text-rose-400 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Do not rush meals</strong> during short breaks
                      — take time to chew food thoroughly
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="h-4 w-4 text-rose-400 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Cut food into smaller pieces</strong> —
                      particularly hard or chewy foods like meat, bread rolls, and raw vegetables
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="h-4 w-4 text-rose-400 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Awareness of small objects:</strong> screws,
                      cable ties, pen caps, washers, and electrical connectors should never be
                      placed in the mouth
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="h-4 w-4 text-rose-400 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Keep welfare areas clean</strong> and free from
                      construction debris that could contaminate food
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="h-4 w-4 text-rose-400 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Know the nearest first aider</strong> — ensure
                      all workers know who the trained first aiders are and where they are located
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <div className="mt-12">
          <Quiz title="Choking Management Quiz" questions={quizQuestions} />
        </div>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../first-aid-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../first-aid-module-3">
              Next: Module 3 — Bleeding, Burns &amp; Shock
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default FirstAidModule2Section4;
