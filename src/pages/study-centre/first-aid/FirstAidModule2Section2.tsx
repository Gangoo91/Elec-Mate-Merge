import { ArrowLeft, Zap, CheckCircle, AlertTriangle, Heart, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'aed-shockable-rhythms',
    question:
      "An AED analyses a casualty's heart rhythm and displays 'No shock advised'. What should you do?",
    options: [
      'Turn off the AED and check for a pulse',
      'Immediately resume CPR for 2 minutes',
      'Remove the pads and reposition them',
      'Wait for the AED to re-analyse before doing anything',
    ],
    correctIndex: 1,
    explanation:
      "'No shock advised' means the AED has detected a non-shockable rhythm (asystole or PEA). You must immediately resume CPR — 30 compressions to 2 rescue breaths. The AED will automatically re-analyse after 2 minutes. Do NOT remove the pads or turn off the AED.",
  },
  {
    id: 'aed-special-circumstances',
    question:
      'You arrive to find a casualty in cardiac arrest lying in a shallow puddle. What should you do before applying AED pads?',
    options: [
      'Use the AED in the water — modern AEDs are waterproof',
      'Move the casualty out of standing water and dry the chest',
      'Apply the pads over their wet clothing',
      'Do not use the AED — it is too dangerous near water',
    ],
    correctIndex: 1,
    explanation:
      'Water conducts electricity and can reduce the effectiveness of defibrillation or cause burns. Move the casualty out of any standing water and dry the chest before applying pads. You do NOT need to be on completely dry ground — just out of puddles or pooled water.',
  },
  {
    id: 'aed-survival-stats',
    question:
      'By how much does AED use within 3-5 minutes increase the chance of survival from cardiac arrest?',
    options: [
      '10-20% increase',
      '50% increase',
      '2 to 4 times (200-400%) increase',
      'No significant difference compared to CPR alone',
    ],
    correctIndex: 2,
    explanation:
      'Defibrillation within 3-5 minutes of cardiac arrest increases the chance of survival by 2 to 4 times compared with CPR alone. For every minute without defibrillation, survival drops by approximately 7-10%. This is why rapid access to an AED is critical.',
  },
];

const faqs = [
  {
    question: 'Can I use an AED on someone if I have no training?',
    answer:
      'Yes. AEDs are specifically designed to be used by untrained bystanders. The device provides clear voice prompts that guide you through every step, and it will NOT deliver a shock unless a shockable rhythm is detected. You cannot accidentally shock someone with a normal heart rhythm. However, formal training (such as this course) significantly increases your confidence and speed of response, which improves outcomes.',
  },
  {
    question: 'Can I be sued for using an AED on someone?',
    answer:
      'No one in the United Kingdom has ever been successfully sued for using an AED in good faith on a person in cardiac arrest. The Social Action, Responsibility and Heroism Act 2015 (SARAH Act) provides additional legal protection for people who act heroically in emergencies. The Resuscitation Council UK strongly encourages bystander defibrillation — the risk of NOT acting far outweighs any theoretical legal risk.',
  },
  {
    question: 'How do I find my nearest public AED?',
    answer:
      'The Circuit (thecircuit.uk) is the national AED database managed by the British Heart Foundation and NHS. It maps all registered public-access AEDs across the UK. When you call 999, the ambulance service can also direct you to the nearest AED and provide the cabinet access code. Many AEDs are located in heated outdoor cabinets at schools, sports centres, shopping centres, railway stations, and workplaces.',
  },
  {
    question: 'Should I use an AED on a casualty who has a pacemaker or implanted defibrillator?',
    answer:
      "Yes — you should still use the AED. Look for a scar or hard lump on the upper chest (usually below the left clavicle) that indicates a pacemaker or implanted cardioverter-defibrillator (ICD). Place the AED pad at least 8 cm (approximately 3 inches) away from the device to avoid interference. If the implanted device is delivering shocks (you may see the casualty's body twitch), wait 30-60 seconds for it to complete its cycle before applying the AED.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does an AED stand for?',
    options: [
      'Automatic Emergency Defibrillator',
      'Automated External Defibrillator',
      'Advanced Electrical Device',
      'Automated Electronic Defibrillator',
    ],
    correctAnswer: 1,
    explanation:
      "AED stands for Automated External Defibrillator. It is a portable device that analyses the heart's rhythm and, if necessary, delivers an electric shock (defibrillation) to attempt to restore a normal heart rhythm.",
  },
  {
    id: 2,
    question: "Which TWO heart rhythms are 'shockable' — meaning an AED will deliver a shock?",
    options: [
      'Asystole and pulseless electrical activity (PEA)',
      'Ventricular fibrillation (VF) and pulseless ventricular tachycardia (pVT)',
      'Sinus rhythm and atrial fibrillation',
      'Asystole and ventricular fibrillation (VF)',
    ],
    correctAnswer: 1,
    explanation:
      'The two shockable rhythms are ventricular fibrillation (VF) and pulseless ventricular tachycardia (pVT). Asystole (flatline) and PEA are non-shockable rhythms — the AED will NOT deliver a shock for these and CPR must be continued.',
  },
  {
    id: 3,
    question: 'Where should the two AED pads be placed on an adult casualty?',
    options: [
      'Both pads on the left side of the chest',
      'One pad on the forehead, one on the chest',
      'Right pad below the right clavicle, left pad on the left side below the armpit',
      'One pad on each side of the neck',
    ],
    correctAnswer: 2,
    explanation:
      'The right pad is placed below the right clavicle (collar bone), and the left pad is placed on the left side of the chest, below the armpit on the mid-axillary line. This positioning ensures the electrical current passes through the heart.',
  },
  {
    id: 4,
    question: 'After the AED delivers a shock, what should you do immediately?',
    options: [
      'Check for a pulse before doing anything else',
      'Wait for the AED to re-analyse',
      'Immediately resume CPR for 2 minutes',
      'Remove the pads and check for breathing',
    ],
    correctAnswer: 2,
    explanation:
      'Immediately resume CPR (30 compressions to 2 rescue breaths) for 2 minutes after the shock is delivered. Do NOT stop to check for a pulse. The AED will automatically prompt you to stop for re-analysis after 2 minutes. Every second without compressions reduces the chance of survival.',
  },
  {
    id: 5,
    question:
      "You find a medication patch (e.g. GTN patch) on a casualty's chest where you need to place an AED pad. What should you do?",
    options: [
      'Place the pad directly over the medication patch',
      'Do not use the AED — medication patches are a contraindication',
      'Remove the patch, wipe the area clean, then apply the AED pad',
      'Place both pads on the opposite side of the chest',
    ],
    correctAnswer: 2,
    explanation:
      "Remove the medication patch and wipe the area clean before placing the AED pad. Medication patches (GTN, nicotine, HRT) can block the electrical current, cause burns to the casualty's skin, and reduce the effectiveness of the shock.",
  },
  {
    id: 6,
    question:
      'For a child aged 1-8 years in cardiac arrest, what is the correct approach to AED use?',
    options: [
      'Never use an AED on a child under 8',
      'Use paediatric pads or a paediatric key if available; if not, use adult pads',
      'Only use an AED if a paramedic is present',
      'Use adult pads but only deliver half the number of shocks',
    ],
    correctAnswer: 1,
    explanation:
      'Use paediatric pads or a paediatric attenuator key if available, as these deliver a reduced energy dose appropriate for children. If paediatric pads are not available, use adult pads — it is better to deliver an adult-energy shock than no shock at all. The Resuscitation Council UK confirms that adult pads can be used safely on children.',
  },
  {
    id: 7,
    question:
      'By approximately how much does survival decrease for every minute without defibrillation?',
    options: ['1-2%', '3-5%', '7-10%', '15-20%'],
    correctAnswer: 2,
    explanation:
      'For every minute that defibrillation is delayed, the chance of survival from ventricular fibrillation decreases by approximately 7-10%. This is why early defibrillation is the third link in the Chain of Survival — rapid access to an AED can mean the difference between life and death.',
  },
  {
    id: 8,
    question:
      'What legislation provides legal protection for people who use an AED in good faith during an emergency in the UK?',
    options: [
      'Health and Safety at Work Act 1974',
      'First Aid at Work Regulations 1981',
      'Social Action, Responsibility and Heroism Act 2015 (SARAH Act)',
      'Automated External Defibrillators (Public Access) Act 2013',
    ],
    correctAnswer: 2,
    explanation:
      'The Social Action, Responsibility and Heroism Act 2015 (SARAH Act) requires courts to consider whether a person was acting heroically, for the benefit of society, or in a generally responsible way when determining negligence claims. No one in the UK has ever been successfully sued for using an AED in good faith.',
  },
];

export default function FirstAidModule2Section2() {
  useSEO({
    title: 'Using an Automated External Defibrillator (AED) | First Aid Module 2 Section 2',
    description:
      'How AEDs work, pad placement, step-by-step AED use, shockable vs non-shockable rhythms, special circumstances, public access AEDs, survival statistics, and legal protection.',
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
            <Link to="../first-aid-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Centred Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <Zap className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 2 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Using an Automated External Defibrillator (AED)
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            How to use an AED safely and effectively during cardiac arrest &mdash; including pad
            placement, special circumstances, and legal protection
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>AED:</strong> Analyses rhythm &rarr; shocks if needed
              </li>
              <li>
                <strong>Shockable:</strong> VF and pVT only
              </li>
              <li>
                <strong>After shock:</strong> Immediately resume CPR for 2 mins
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400/90 text-base font-medium mb-2">Key Facts</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Survival:</strong> AED within 3-5 mins = 2-4&times; better
              </li>
              <li>
                <strong>Delay:</strong> 7-10% drop per minute without defibrillation
              </li>
              <li>
                <strong>Legal:</strong> SARAH Act 2015 protects good-faith use
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain what an AED is and how it analyses heart rhythm',
              'Demonstrate correct AED pad placement on an adult',
              'Describe the step-by-step procedure for AED use',
              'Differentiate between shockable and non-shockable rhythms',
              'Manage special circumstances (water, pacemakers, children, medication patches)',
              'Explain the legal protections for AED use in the UK',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Is an AED? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">01</span>
            What Is an AED?
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                An <strong>Automated External Defibrillator (AED)</strong> is a portable electronic
                device that automatically analyses the heart&rsquo;s rhythm and, if it detects a
                life-threatening arrhythmia, delivers an electrical shock (defibrillation) to
                attempt to restore a normal heart rhythm. AEDs are designed to be used by anyone
                &mdash; you do not need medical training to operate one.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key Point:</strong> An AED is a{' '}
                  <strong>safe</strong> device. It will <strong>NOT</strong> deliver a shock unless
                  it detects a shockable rhythm. You cannot accidentally shock a person who has a
                  normal heartbeat. The device makes the decision &mdash; not you.
                </p>
              </div>

              <p>
                Modern AEDs are compact, lightweight, and found in workplaces, schools, shopping
                centres, sports facilities, railway stations, airports, and many public buildings
                across the UK. They are typically stored in clearly marked green or yellow cabinets,
                often with a heart symbol and the letters &ldquo;AED&rdquo;.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">AED Components</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Main unit</strong> &mdash; contains the
                      battery, processor, and shock delivery system
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Adhesive electrode pads</strong> &mdash; two
                      pads that stick to the casualty&rsquo;s bare chest; detect the heart rhythm
                      and deliver the shock
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Voice prompts</strong> &mdash; clear audio
                      instructions that guide you through every step
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Visual indicators</strong> &mdash; flashing
                      lights or screen prompts showing pad placement and shock status
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Accessories</strong> &mdash; many kits include
                      a razor, towel, scissors, and gloves
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: How AEDs Work */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">02</span>
            How AEDs Work &mdash; Shockable vs Non-Shockable Rhythms
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When the AED pads are attached to a casualty&rsquo;s chest, the device analyses the
                electrical activity of the heart. It is looking for two specific
                &ldquo;shockable&rdquo; rhythms that can be corrected by an electrical shock:
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-rose-500/10 border-2 border-rose-500/40 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-5 w-5 text-rose-400" />
                    <h3 className="font-bold text-rose-300 text-sm">Shockable Rhythms</h3>
                  </div>
                  <p className="text-white/70 text-xs mb-3">AED WILL deliver a shock</p>
                  <ul className="text-sm text-white space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        <strong>Ventricular Fibrillation (VF)</strong> &mdash; the heart quivers
                        chaotically and cannot pump blood effectively. This is the most common
                        initial rhythm in sudden cardiac arrest.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        <strong>Pulseless Ventricular Tachycardia (pVT)</strong> &mdash; the heart
                        beats dangerously fast but produces no effective pulse or cardiac output.
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border-2 border-white/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="h-5 w-5 text-white/60" />
                    <h3 className="font-bold text-white/80 text-sm">Non-Shockable Rhythms</h3>
                  </div>
                  <p className="text-white/70 text-xs mb-3">
                    AED will NOT deliver a shock &mdash; continue CPR
                  </p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Asystole (flatline)</strong> &mdash; no
                        electrical activity in the heart at all. A shock would have no effect.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Pulseless Electrical Activity (PEA)</strong>{' '}
                        &mdash; some electrical activity is present, but the heart is not
                        contracting effectively. A shock will not help.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white">
                    <strong className="text-rose-300">Important &mdash; TV vs Reality:</strong>{' '}
                    Television dramas often show defibrillators being used on &ldquo;flatline&rdquo;
                    (asystole) patients. This is <strong>medically incorrect</strong>. An AED will{' '}
                    <strong>never</strong> shock a flatline because there is no electrical activity
                    to reset. Defibrillation only works on VF and pVT, where the aim is to stop the
                    chaotic electrical activity and allow the heart&rsquo;s natural pacemaker to
                    restart a normal rhythm.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: AED Pad Placement Diagram */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">03</span>
            AED Pad Placement
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Correct pad placement ensures the electrical current passes through the heart. Most
                AED pads have diagrams printed on them showing exactly where to place each pad.
              </p>

              {/* AED Pad Placement Diagram */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-6">
                <h4 className="text-rose-400 font-semibold text-sm mb-4 text-center">
                  AED Pad Placement &mdash; Adult Casualty
                </h4>
                <div className="relative max-w-sm mx-auto">
                  {/* Torso outline */}
                  <div className="relative mx-auto w-48 sm:w-56 h-72 sm:h-80">
                    {/* Head */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full border-2 border-white/30 bg-white/5" />

                    {/* Neck */}
                    <div className="absolute top-[52px] left-1/2 -translate-x-1/2 w-6 h-4 bg-white/5 border-x-2 border-white/30" />

                    {/* Shoulders */}
                    <div className="absolute top-[68px] left-1/2 -translate-x-1/2 w-48 sm:w-56 h-4">
                      <div className="w-full h-full border-t-2 border-white/30 rounded-t-[100%]" />
                    </div>

                    {/* Torso body */}
                    <div className="absolute top-[72px] left-1/2 -translate-x-1/2 w-40 sm:w-48 h-48 sm:h-52 border-2 border-white/30 bg-white/5 rounded-b-3xl rounded-t-lg">
                      {/* Centre line (sternum) */}
                      <div className="absolute left-1/2 -translate-x-1/2 top-2 w-[1px] h-24 bg-white/15 border-dashed" />

                      {/* Clavicle lines */}
                      <div className="absolute top-3 left-4 right-4 h-[1px] bg-white/15" />
                      <p className="absolute top-0 left-1/2 -translate-x-1/2 text-[8px] text-white/30 whitespace-nowrap">
                        clavicle line
                      </p>

                      {/* RIGHT PAD (viewer's left) — below right clavicle */}
                      <div className="absolute top-6 left-2 sm:left-3 w-14 sm:w-16 h-8 sm:h-9 rounded-lg bg-rose-500/40 border-2 border-rose-400 flex items-center justify-center animate-pulse">
                        <span className="text-[9px] sm:text-[10px] font-bold text-rose-200 text-center leading-tight">
                          RIGHT
                          <br />
                          PAD
                        </span>
                      </div>

                      {/* Arrow and label for right pad */}
                      <div className="absolute top-5 -left-16 sm:-left-20 text-right">
                        <span className="text-[9px] sm:text-[10px] text-rose-300 font-medium block leading-tight">
                          Below right
                          <br />
                          clavicle
                        </span>
                        <div className="mt-0.5 ml-auto w-8 sm:w-12 h-[1px] bg-rose-400/60" />
                      </div>

                      {/* LEFT PAD (viewer's right) — left side below armpit */}
                      <div className="absolute top-20 sm:top-24 right-0 sm:-right-1 w-14 sm:w-16 h-8 sm:h-9 rounded-lg bg-rose-500/40 border-2 border-rose-400 flex items-center justify-center animate-pulse">
                        <span className="text-[9px] sm:text-[10px] font-bold text-rose-200 text-center leading-tight">
                          LEFT
                          <br />
                          PAD
                        </span>
                      </div>

                      {/* Arrow and label for left pad */}
                      <div className="absolute top-20 sm:top-24 -right-16 sm:-right-24 text-left">
                        <div className="mb-0.5 w-8 sm:w-12 h-[1px] bg-rose-400/60" />
                        <span className="text-[9px] sm:text-[10px] text-rose-300 font-medium block leading-tight">
                          Left side,
                          <br />
                          below armpit
                          <br />
                          (mid-axillary)
                        </span>
                      </div>

                      {/* Heart indicator */}
                      <div className="absolute top-12 sm:top-14 left-1/2 -translate-x-[30%]">
                        <Heart className="h-5 w-5 text-rose-400/50" />
                      </div>
                    </div>

                    {/* Arms */}
                    <div className="absolute top-[76px] -left-2 sm:-left-3 w-5 h-40 border-2 border-white/20 bg-white/5 rounded-b-full rounded-t-lg -rotate-6" />
                    <div className="absolute top-[76px] -right-2 sm:-right-3 w-5 h-40 border-2 border-white/20 bg-white/5 rounded-b-full rounded-t-lg rotate-6" />
                  </div>

                  {/* Current path indicator */}
                  <div className="mt-4 bg-rose-500/10 border border-rose-500/30 rounded-lg p-3 text-center">
                    <p className="text-rose-300 text-xs sm:text-sm font-semibold">
                      Electrical current passes diagonally through the heart between the two pads
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Pad Placement Rules</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Pads must be placed on <strong>bare, dry skin</strong> &mdash; cut or remove
                      clothing as needed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Peel the backing off each pad and press <strong>firmly</strong> to ensure good
                      skin contact
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Follow the diagram on the pads &mdash; most pads are clearly labelled with
                      placement positions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Do <strong>not</strong> place pads directly over metal jewellery, piercings,
                      or implanted devices
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Step-by-Step AED Use */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">04</span>
            Step-by-Step AED Use
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The AED provides voice prompts throughout the entire process. Follow these steps
                when an AED arrives during a cardiac arrest:
              </p>

              <div className="space-y-3">
                {[
                  {
                    step: 1,
                    title: 'Switch on the AED',
                    detail:
                      'Open the case and press the power button (some AEDs switch on automatically when the lid is opened). The AED will immediately begin giving clear voice prompts.',
                  },
                  {
                    step: 2,
                    title: 'Attach pads to bare chest',
                    detail:
                      "Expose the casualty's chest completely. Peel the backing from each pad and press firmly onto bare, dry skin in the positions shown on the pads — right pad below the right clavicle, left pad on the left side below the armpit.",
                  },
                  {
                    step: 3,
                    title: 'Ensure no one is touching the casualty',
                    detail:
                      'The AED needs to analyse the heart rhythm without interference. Tell everyone to "stand clear" and visually check that no one is in contact with the casualty.',
                  },
                  {
                    step: 4,
                    title: 'AED analyses the rhythm',
                    detail:
                      'The AED will say something like "Analysing — do not touch the patient". Keep still and ensure no one touches the casualty during analysis. This takes a few seconds.',
                  },
                  {
                    step: 5,
                    title: 'If shock advised — deliver the shock',
                    detail:
                      'The AED will charge and announce "Shock advised — stand clear". Perform a final visual check that no one is touching the casualty, then press the flashing shock button firmly. Some fully-automatic AEDs deliver the shock without pressing a button.',
                  },
                  {
                    step: 6,
                    title: 'Immediately resume CPR',
                    detail:
                      'As soon as the shock is delivered, immediately resume CPR — 30 chest compressions to 2 rescue breaths. Do NOT stop to check for a pulse. Continue CPR for 2 minutes.',
                  },
                  {
                    step: 7,
                    title: 'AED re-analyses after 2 minutes',
                    detail:
                      'After 2 minutes of CPR, the AED will prompt you to stop and will re-analyse the rhythm. Follow the voice prompts — it will either advise another shock or tell you to continue CPR.',
                  },
                  {
                    step: 8,
                    title: 'If no shock advised — continue CPR',
                    detail:
                      'If the AED says "No shock advised", this means it has detected a non-shockable rhythm (asystole or PEA). Immediately resume CPR. Leave the pads attached — the AED will re-analyse every 2 minutes.',
                  },
                ].map((item) => (
                  <div key={item.step} className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center">
                        <span className="text-sm font-bold text-rose-400">{item.step}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white text-sm sm:text-base mb-1">
                          {item.title}
                        </h4>
                        <p className="text-white/80 text-sm leading-relaxed">{item.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-rose-500/10 border-2 border-rose-500/40 p-4 sm:p-5 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-bold text-rose-300 text-base">Critical Reminder</h3>
                </div>
                <p className="text-white text-sm leading-relaxed">
                  <strong>Never delay CPR while waiting for an AED.</strong> If you are alone, start
                  CPR immediately and use the AED as soon as it arrives. If there are two or more
                  rescuers, one should continue CPR while the other prepares and attaches the AED.
                  Minimising interruptions to chest compressions is essential for survival.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 05: Safety During Defibrillation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">05</span>
            Safety During Defibrillation
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The electrical shock from an AED is powerful enough to affect anyone in contact with
                the casualty. Strict safety procedures must be followed every time a shock is
                delivered.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Before Every Shock</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">&ldquo;Stand clear&rdquo;</strong> &mdash;
                      announce loudly and clearly before pressing the shock button
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Visual check</strong> &mdash; look around to
                      confirm that no one is touching the casualty, the stretcher, or any connected
                      equipment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Remove supplemental oxygen</strong> &mdash; if
                      an oxygen mask is present, move it at least one metre from the
                      casualty&rsquo;s chest before shocking (oxygen supports combustion)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Dry environment check</strong> &mdash; ensure
                      the casualty&rsquo;s chest is dry and they are not lying in standing water
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Common Safety Mistakes</p>
                </div>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>Forgetting to visually check before pressing the shock button</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      Another rescuer still touching the casualty during analysis or shock
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      Leaving an oxygen mask on or near the casualty&rsquo;s chest during
                      defibrillation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      Shocking while the casualty is lying in a puddle or on a wet metal surface
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Special Circumstances */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">06</span>
            Special Circumstances
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Certain situations require adjustments to the standard AED procedure. Knowing how to
                handle these special circumstances quickly and confidently can save valuable time
                during a cardiac arrest.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                {/* Water */}
                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <h3 className="text-blue-300 font-semibold text-sm mb-2">
                    Water / Wet Environment
                  </h3>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Move the casualty out of any standing water</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Dry the chest thoroughly before applying pads</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>
                        You do <strong>not</strong> need to be on completely dry ground &mdash; just
                        out of puddles
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Rain alone is not a reason to withhold defibrillation</span>
                    </li>
                  </ul>
                </div>

                {/* Pacemaker / ICD */}
                <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                  <h3 className="text-purple-300 font-semibold text-sm mb-2">Pacemaker / ICD</h3>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>Look for a scar or hard lump on the upper chest</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>
                        Place the AED pad at least <strong>8 cm</strong> away from the device
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>
                        If the ICD is firing (body twitching), wait 30-60 seconds before applying
                        the AED
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>
                        <strong>Still use the AED</strong> &mdash; do not withhold defibrillation
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Medication Patches */}
                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                  <h3 className="text-amber-300 font-semibold text-sm mb-2">Medication Patches</h3>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Common patches: GTN (heart), nicotine, HRT (hormone)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        <strong>Remove the patch</strong> if it is where a pad needs to go
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Wipe the area clean before applying the AED pad</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Patches can block current and cause burns if left in place</span>
                    </li>
                  </ul>
                </div>

                {/* Excessive Chest Hair */}
                <div className="bg-teal-500/10 border border-teal-500/30 p-4 rounded-lg">
                  <h3 className="text-teal-300 font-semibold text-sm mb-2">Excessive Chest Hair</h3>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-teal-400 flex-shrink-0" />
                      <span>Chest hair can prevent good pad contact</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-teal-400 flex-shrink-0" />
                      <span>Use the razor in the AED kit to shave the pad areas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-teal-400 flex-shrink-0" />
                      <span>
                        Alternative: press a pad firmly onto hair and rip it off, then apply a fresh
                        pad to the now-clear area
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-teal-400 flex-shrink-0" />
                      <span>Do not delay excessively &mdash; some hair is acceptable</span>
                    </li>
                  </ul>
                </div>

                {/* Children (1-8 years) */}
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <h3 className="text-green-300 font-semibold text-sm mb-2">
                    Children (1&ndash;8 Years)
                  </h3>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>
                        Use <strong>paediatric pads</strong> or a paediatric attenuator key if
                        available
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>
                        Paediatric pads deliver a reduced energy dose suitable for smaller hearts
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>
                        If paediatric pads are <strong>not available</strong>, use adult pads
                        &mdash; a shock at adult energy is better than no shock
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Infants (<1 year) */}
                <div className="bg-pink-500/10 border border-pink-500/30 p-4 rounded-lg">
                  <h3 className="text-pink-300 font-semibold text-sm mb-2">Infants (&lt;1 Year)</h3>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-pink-400 flex-shrink-0" />
                      <span>Use paediatric pads if available</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-pink-400 flex-shrink-0" />
                      <span>
                        Place pads in the <strong>anterior-posterior position</strong> &mdash; one
                        pad on the front of the chest (over the breastbone) and one on the back
                        (between the shoulder blades)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-pink-400 flex-shrink-0" />
                      <span>
                        If only adult pads are available, use the anterior-posterior position to
                        avoid pads touching each other
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Pregnancy */}
                <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                  <h3 className="text-cyan-300 font-semibold text-sm mb-2">Pregnancy</h3>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                      <span>
                        <strong>Use the AED normally</strong> &mdash; do not withhold defibrillation
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                      <span>Pad position is the same as for any adult</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                      <span>Saving the mother gives the baby the best chance of survival</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                      <span>The energy from the AED will not harm the foetus</span>
                    </li>
                  </ul>
                </div>

                {/* Jewellery / Piercings */}
                <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                  <h3 className="text-slate-300 font-semibold text-sm mb-2">
                    Jewellery &amp; Piercings
                  </h3>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Avoid placing pads <strong>directly over</strong> metal jewellery or body
                        piercings
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        If jewellery cannot be quickly removed, place the pad next to it (not on
                        top)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>Metal can cause burns or reduce shock effectiveness</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Do <strong>not</strong> waste time removing necklaces that are not in the
                        pad area
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 07: Public Access AEDs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">07</span>
            Public Access AEDs
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Public access defibrillation is a national strategy to ensure AEDs are available in
                communities, workplaces, and public spaces so that bystanders can provide
                defibrillation before the ambulance service arrives. Every minute counts &mdash; the
                average ambulance response time in the UK is 7-8 minutes, but survival drops by
                7-10% for every minute without defibrillation.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Where Public AEDs Are Located</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Shopping centres, supermarkets, and retail parks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Railway stations, airports, and bus stations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Sports centres, leisure facilities, and gyms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Schools, colleges, and universities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Workplaces, offices, and construction sites</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Village halls, community centres, and places of worship</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Phone boxes (repurposed), parish council notice boards, and pub/restaurant
                      exteriors
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-300 mb-2">How to Access a Public AED</p>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-rose-400 text-base mt-0">1.</span>
                    <span>
                      <strong className="text-white">Call 999</strong> &mdash; the ambulance service
                      will tell you the location of the nearest AED
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-rose-400 text-base mt-0">2.</span>
                    <span>
                      The operator will provide the{' '}
                      <strong className="text-white">cabinet access code</strong> if the AED is in a
                      locked cabinet
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-rose-400 text-base mt-0">3.</span>
                    <span>Send a bystander to fetch the AED while you continue CPR</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  The Circuit &mdash; National AED Database
                </p>
                <p className="text-sm text-white/80 leading-relaxed">
                  <strong className="text-rose-300">The Circuit</strong> (thecircuit.uk) is the
                  national defibrillator network managed by the British Heart Foundation in
                  partnership with the NHS ambulance services. It maps every registered
                  public-access AED in the United Kingdom. When you call 999, the ambulance service
                  uses The Circuit to locate the nearest AED and direct you to it. If your workplace
                  has an AED, it should be registered on The Circuit so that it can be found in an
                  emergency.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Survival Statistics */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">08</span>
            Survival Statistics &mdash; Why AEDs Matter
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The evidence for early defibrillation is overwhelming. AED use is the single most
                effective intervention for improving survival from out-of-hospital cardiac arrest
                caused by a shockable rhythm.
              </p>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center bg-rose-500/10 border border-rose-500/30 rounded-lg p-3 sm:p-4">
                  <div className="text-2xl sm:text-3xl font-bold text-rose-400">2-4&times;</div>
                  <div className="text-xs text-white/60 mt-1">
                    survival increase with AED within 3-5 minutes
                  </div>
                </div>
                <div className="text-center bg-red-500/10 border border-red-500/30 rounded-lg p-3 sm:p-4">
                  <div className="text-2xl sm:text-3xl font-bold text-red-400">7-10%</div>
                  <div className="text-xs text-white/60 mt-1">
                    survival drop per minute without defibrillation
                  </div>
                </div>
                <div className="text-center bg-white/5 border border-white/10 rounded-lg p-3 sm:p-4">
                  <div className="text-2xl sm:text-3xl font-bold text-white">~30k</div>
                  <div className="text-xs text-white/60 mt-1">
                    out-of-hospital cardiac arrests per year in the UK
                  </div>
                </div>
                <div className="text-center bg-green-500/10 border border-green-500/30 rounded-lg p-3 sm:p-4">
                  <div className="text-2xl sm:text-3xl font-bold text-green-400">&lt;10%</div>
                  <div className="text-xs text-white/60 mt-1">
                    current overall survival rate &mdash; AEDs can change this
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-300 font-medium mb-3">The Chain of Survival</h3>
                <p className="text-white/80 text-sm mb-3">
                  Defibrillation is the <strong>third link</strong> in the Chain of Survival. Each
                  link must be strong for the best chance of survival:
                </p>
                <div className="grid sm:grid-cols-4 gap-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-rose-400 mb-1">1</div>
                    <p className="text-xs text-white font-medium">Early Recognition</p>
                    <p className="text-[10px] text-white/50 mt-1">
                      Recognise cardiac arrest &amp; call 999
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-rose-400 mb-1">2</div>
                    <p className="text-xs text-white font-medium">Early CPR</p>
                    <p className="text-[10px] text-white/50 mt-1">Start compressions immediately</p>
                  </div>
                  <div className="bg-rose-500/10 border-2 border-rose-500/40 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-rose-400 mb-1">3</div>
                    <p className="text-xs text-white font-medium">Early Defibrillation</p>
                    <p className="text-[10px] text-white/50 mt-1">AED use as soon as possible</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-rose-400 mb-1">4</div>
                    <p className="text-xs text-white font-medium">Post-Resuscitation Care</p>
                    <p className="text-[10px] text-white/50 mt-1">Advanced care by paramedics</p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white leading-relaxed">
                  <strong className="text-rose-300">The time factor is critical:</strong> If
                  defibrillation is delivered within <strong>1 minute</strong> of collapse, survival
                  rates can exceed <strong>90%</strong>. By 5 minutes, survival drops to around{' '}
                  <strong>50%</strong>. After 10 minutes without defibrillation, survival is less
                  than <strong>5%</strong>. This is why every workplace should have an AED and
                  trained first aiders who can use it without hesitation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 09: AED Maintenance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">09</span>
            AED Maintenance
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                An AED is only useful if it is in working order when needed. AEDs require minimal
                maintenance, but regular checks are essential to ensure readiness. In many
                workplaces, a designated person is responsible for AED checks.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Monthly AED Checks</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Status indicator</strong> &mdash; check the
                      green light or tick is showing (this means the AED has passed its self-test)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Pad expiry dates</strong> &mdash; electrode
                      pads have expiry dates (typically 2-5 years); replace before they expire
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Battery life</strong> &mdash; batteries
                      typically last 4-5 years; replace before the indicated date
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Physical condition</strong> &mdash; check the
                      case, pads packaging, and cable connections for visible damage
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Accessories</strong> &mdash; ensure the kit
                      includes a razor, towel, scissors, and disposable gloves
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Accessibility</strong> &mdash; the AED must be
                      clearly signed, unobstructed, and accessible 24/7
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Do Not Forget</p>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  After an AED has been used on a casualty, it must be restocked with new electrode
                  pads before being returned to service. The used pads cannot be reused. Many AEDs
                  also store data from the event (ECG recordings, shock delivery times) which may be
                  needed by the ambulance service or for incident reporting.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 10: Legal Protection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">10</span>
            Legal Protection for AED Users
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most common concerns people have about using an AED is whether they could
                face legal consequences if something goes wrong. The answer is clear: the law
                protects you.
              </p>

              <div className="bg-green-500/10 border-2 border-green-500/40 p-4 sm:p-5 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <Shield className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-bold text-green-300 text-base">Key Legal Fact</h3>
                </div>
                <p className="text-white text-sm leading-relaxed mb-3">
                  <strong>
                    No one in the United Kingdom has ever been successfully sued for using an AED in
                    good faith on a person in cardiac arrest.
                  </strong>
                </p>
                <p className="text-white/80 text-sm leading-relaxed">
                  The Resuscitation Council UK, the British Heart Foundation, and NHS England all
                  strongly encourage bystanders to use an AED without hesitation. A person in
                  cardiac arrest is clinically dead &mdash; you cannot make the situation worse by
                  attempting defibrillation.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Legislation That Protects You</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-rose-300">
                      Social Action, Responsibility and Heroism Act 2015 (SARAH Act)
                    </p>
                    <p className="text-sm text-white/80">
                      This Act requires courts to consider whether a person was acting for the
                      benefit of society, demonstrated a generally responsible approach, or acted
                      heroically by intervening in an emergency. It provides significant protection
                      for bystanders who provide emergency first aid, including AED use.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-rose-300">
                      Common Law &mdash; Duty of Care
                    </p>
                    <p className="text-sm text-white/80">
                      Under common law, a person who acts in good faith to assist someone in a
                      life-threatening emergency is judged against the standard of a reasonable
                      person in the same circumstances &mdash; not against the standard of a medical
                      professional. As long as you act reasonably and in good faith, you are
                      protected.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white leading-relaxed">
                  <strong className="text-rose-300">The Real Risk Is Not Acting:</strong> Without
                  CPR and defibrillation, a person in cardiac arrest will almost certainly die. The
                  survival rate for witnessed out-of-hospital cardiac arrest with bystander
                  defibrillation can exceed <strong>50-70%</strong>. Without any intervention,
                  survival is less than <strong>2%</strong>. The only wrong action is no action.
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
        <Quiz title="AED Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../first-aid-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../first-aid-module-2-section-3">
              Next: Unconsciousness &amp; the Recovery Position
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
