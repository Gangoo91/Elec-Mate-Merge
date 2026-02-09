import {
  ArrowLeft,
  Zap,
  CheckCircle,
  AlertTriangle,
  Shield,
  Activity,
  Link as LinkIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'high-voltage-distance',
    question:
      'You arrive at an incident where a casualty is lying near a downed overhead power line. What is the minimum safe distance you should maintain?',
    options: ['5 metres', '10 metres', '25 metres', '50 metres'],
    correctIndex: 2,
    explanation:
      'You must stay at least 25 metres away from any high-voltage source (overhead power lines, substations, railway lines). High-voltage electricity can arc through the air over significant distances. Call 999 AND the Distribution Network Operator (DNO). Do NOT approach until the DNO has confirmed the supply is isolated and earthed.',
  },
  {
    id: 'low-voltage-separation',
    question:
      'A colleague is in contact with a live 230V cable and cannot release their grip. You cannot find the isolator. What should you use to separate them from the source?',
    options: [
      'A metal bar wrapped in a cloth',
      'A damp towel',
      'A dry wooden broom handle',
      'Your gloved hands',
    ],
    correctIndex: 2,
    explanation:
      "Use a non-conductive object such as a dry wooden broom handle, dry rope, rolled-up newspaper, or a rubber/plastic mat to push or pull the casualty away from the source. Never use anything wet or metallic. Do not touch the casualty's bare skin until the contact is broken. Stand on dry insulating material (rubber mat, dry wood) if possible.",
  },
  {
    id: 'post-shock-treatment',
    question:
      'After safely separating a casualty from an electrical source, they appear conscious and say they feel fine. What should you do?',
    options: [
      'Let them return to work if they can move normally',
      'Monitor them for 10 minutes, then allow them to continue',
      'Call 999 &mdash; ALL electrical casualties must go to hospital',
      'Apply a cold compress to the contact point and monitor',
    ],
    correctIndex: 2,
    explanation:
      'ALL electrical casualties should be assessed at hospital, even if they appear well. Electric shock can cause cardiac arrhythmias (abnormal heart rhythms) that may not be immediately apparent and can develop hours after the initial shock. There may also be internal tissue damage that is not visible externally. Call 999 for every electric shock casualty.',
  },
];

const faqs = [
  {
    question: 'Is it safe to touch someone who has been struck by lightning?',
    answer:
      'Yes. It is safe to touch a lightning strike casualty immediately. There is no residual electrical charge in their body. Lightning strikes should be treated as high-voltage injuries. Assess the casualty using DR ABC and be prepared to start CPR, as cardiac arrest is a significant risk. Call 999 immediately. Lightning can cause burns, cardiac arrest, respiratory arrest, neurological damage, and temporary or permanent hearing/vision loss.',
  },
  {
    question: 'Why is AC (alternating current) generally more dangerous than DC (direct current)?',
    answer:
      'AC causes involuntary muscle contraction (tetanic spasm) that can prevent the casualty from releasing their grip on the electrical source. This prolongs the duration of contact, which significantly increases the severity of injury. AC at 50 Hz (the UK mains frequency) is particularly effective at causing ventricular fibrillation. DC is more likely to cause a single muscle contraction that throws the casualty away from the source, potentially reducing contact time but causing secondary injuries from the fall.',
  },
  {
    question: 'What is the HSE Electric Shock Poster, and where should it be displayed?',
    answer:
      "The HSE Electric Shock Poster (also known as the 'Electric Shock: First Aid Procedures' poster) is a guidance document published by the Health and Safety Executive that sets out the emergency procedure for dealing with electric shock casualties. It is required to be displayed in all electrical workplaces, switchrooms, substations, and any area where there is a risk of electric shock. It is available from HSE Books. Employers have a duty to ensure it is prominently displayed and that workers know where it is.",
  },
  {
    question: 'Can 110V construction site supplies cause death?',
    answer:
      'Yes. Although 110V centre-tapped earth systems (which provide only 55V to earth) are significantly safer than 230V, they can still cause injury and death, particularly in wet conditions. Water drastically reduces the resistance of the skin, allowing more current to flow through the body. Wet environments (rain, standing water, damp clothing, sweating) increase the risk considerably. Reduced-voltage systems reduce the risk but do not eliminate it. Safe working practices, RCDs, and proper equipment maintenance are still essential.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What is the FIRST action you should take when you discover a casualty in contact with an electrical source?',
    options: [
      'Pull the casualty away from the source',
      'Call 999 immediately',
      'Ensure your own safety &mdash; do NOT approach until you are certain the power is off',
      'Start CPR straight away',
    ],
    correctAnswer: 2,
    explanation:
      'Your own safety comes first. A dead rescuer cannot help anyone. You must ensure the power source is isolated before approaching the casualty. For high voltage (>1000V), stay at least 25 metres away and call 999 AND the DNO. For low voltage (<1000V), switch off at the mains, socket, or isolator before approaching.',
  },
  {
    id: 2,
    question: 'Which of the following is classified as HIGH voltage?',
    options: [
      'A 230V domestic socket',
      'A 400V three-phase industrial supply',
      'A 110V construction site transformer',
      'An 11,000V overhead power line',
    ],
    correctAnswer: 3,
    explanation:
      'High voltage is defined as greater than 1,000V (1kV). Overhead power lines typically carry 11,000V (11kV) or higher. Domestic supplies (230V), three-phase industrial supplies (400V), and construction site 110V supplies are all classified as low voltage. The distinction is critical because high-voltage incidents require a completely different response &mdash; stay 25 metres away and wait for the DNO.',
  },
  {
    id: 3,
    question:
      'A vehicle has driven into a power line and the cable is draped across the vehicle. The driver is conscious. What should you tell them?',
    options: [
      'Get out of the vehicle immediately and run to safety',
      'Stay inside the vehicle &mdash; they are safer inside',
      'Try to push the cable off the vehicle with a long stick',
      'Turn off the vehicle engine and wait for you to help them out',
    ],
    correctAnswer: 1,
    explanation:
      'Tell the occupants to stay inside the vehicle. The vehicle body acts as a Faraday cage, and they are safer inside than attempting to exit. If they step out while the vehicle is in contact with a live cable, current could flow through their body to earth. Call 999 and the DNO. Only the DNO can confirm the supply is isolated and earthed. The occupants should only exit if the vehicle is on fire, in which case they must jump clear (not step out) and land with both feet together, then shuffle away.',
  },
  {
    id: 4,
    question: 'Electrical burns often have a characteristic pattern. What should you look for?',
    options: [
      'A single large burn on the chest',
      'An entry wound AND an exit wound, often on opposite limbs or the feet',
      'Uniform redness across the entire body',
      'Burns only on the hands',
    ],
    correctAnswer: 1,
    explanation:
      'Electrical burns typically have an entry point (where the current entered the body) and an exit point (where the current left the body to reach earth), often on the opposite limb or the feet. The entry wound may appear small, but the internal damage between entry and exit can be severe &mdash; electricity follows the path of least resistance through nerves, blood vessels, and muscle, causing extensive deep tissue damage that is not visible externally.',
  },
  {
    id: 5,
    question: 'Which pathway of electric current through the body is considered MOST dangerous?',
    options: [
      'Foot to foot',
      'Hand to hand (across the chest)',
      'Hand to elbow on the same arm',
      'Finger to finger on the same hand',
    ],
    correctAnswer: 1,
    explanation:
      'A hand-to-hand pathway is the most dangerous because the current passes directly across the chest, through the heart. This dramatically increases the risk of ventricular fibrillation (a life-threatening cardiac arrhythmia). Hand-to-foot pathways are also dangerous if the current passes through the torso. Foot-to-foot pathways are less likely to affect the heart but can still cause serious injury.',
  },
  {
    id: 6,
    question: 'What is an arc flash?',
    options: [
      'A type of static electricity discharge that is harmless',
      'A slow electrical leak from damaged insulation',
      'An explosive release of energy from an electrical fault, causing thermal burns, blast injuries, and UV radiation',
      'The visible spark when plugging in a device',
    ],
    correctAnswer: 2,
    explanation:
      'An arc flash is an explosive release of energy that occurs when an electrical fault creates an arc between conductors or between a conductor and earth. The temperature at the arc can exceed 20,000&deg;C. Arc flash causes thermal burns (from the intense heat), blast injuries (from the pressure wave), UV radiation burns, temporary or permanent blindness, hearing damage, and can ignite clothing. Arc flash is a significant hazard for electricians working on or near live equipment.',
  },
  {
    id: 7,
    question: 'Why do UK construction sites use 110V centre-tapped earth systems instead of 230V?',
    options: [
      'Because 110V equipment is cheaper to purchase',
      'Because it reduces the maximum voltage to earth to 55V, significantly reducing the risk of fatal electric shock',
      'Because 110V tools are lighter and easier to carry',
      'Because 230V is not available on construction sites',
    ],
    correctAnswer: 1,
    explanation:
      'The 110V centre-tapped earth system provides a maximum of 55V to earth (because the secondary winding of the transformer has a centre tap connected to earth, splitting the 110V equally). At 55V to earth, the current that can flow through the body is significantly lower than at 230V, reducing the risk of fatal electric shock. However, 110V supplies can still cause injury and death, especially in wet conditions, so safe working practices remain essential.',
  },
  {
    id: 8,
    question:
      'Approximately how many UK workplace fatalities per year are caused by electrical incidents?',
    options: ['Approximately 5', 'Approximately 15', 'Approximately 30', 'Approximately 100'],
    correctAnswer: 2,
    explanation:
      'Approximately 30 UK workplace fatalities per year are caused by electrical incidents. Around 10% of construction industry fatalities are electrical. Electricians, electrical engineers, and construction workers are at the highest risk. The most common scenarios include contact with overhead power lines, contact with underground cables, use of faulty equipment, and working on or near live equipment.',
  },
];

export default function FirstAidModule4Section3() {
  useSEO({
    title: 'Electric Shock & Electrical Injuries | First Aid Module 4.3',
    description:
      'Learn scene safety for electrical incidents, high-voltage and low-voltage emergency procedures, treatment of electrical burns, types of electrical injury, arc flash, and first aid response to electric shock casualties.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../first-aid-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centred Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <Zap className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 4 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Electric Shock &amp; Electrical Injuries
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Scene safety for electrical incidents, emergency procedures for high-voltage and
            low-voltage contact, treatment of electrical burns, and first aid response to electric
            shock casualties
          </p>
        </div>

        {/* Quick Summary */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-rose-400/80 text-sm font-normal">00</span>
            Quick Summary
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-rose-500/10 border-l-2 border-l-rose-500/50 border border-rose-500/30">
              <p className="font-semibold text-base text-rose-400 mb-2">In 30 Seconds</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>YOUR safety first:</strong> Never approach an electrical casualty until
                    you are certain the power is off.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>High voltage (&gt;1kV):</strong> Stay 25&nbsp;m away. Call 999 AND the
                    DNO. Do NOT approach.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Low voltage (&lt;1kV):</strong> Switch off at mains/isolator. If not
                    possible, use a dry non-conductive object to separate.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>After separation:</strong> DR ABC, prepare for CPR, treat burns (entry +
                    exit wounds).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>ALL casualties to hospital:</strong> Even if they appear well &mdash;
                    arrhythmias can develop hours later.
                  </span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-rose-500/10 border-l-2 border-l-rose-500/50 border border-rose-500/30">
              <p className="font-semibold text-base text-rose-400 mb-2">For Electricians</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>~30 UK deaths/year:</strong> Electrical incidents cause approximately 30
                    workplace fatalities annually.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Construction risk:</strong> ~10% of construction fatalities are
                    electrical. Overhead lines and underground cables are the most common scenarios.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>110V sites:</strong> Reduced voltage reduces risk but does NOT eliminate
                    it &mdash; especially in wet conditions.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>HSE poster:</strong> The Electric Shock Poster must be displayed in
                    every electrical workplace.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-rose-400/80 text-sm font-normal">&nbsp;</span>
            Learning Outcomes
          </h2>
          <p className="text-white mb-4">By the end of this section, you will be able to:</p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Explain why scene safety is critical before approaching an electrical casualty
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Describe the correct emergency procedures for high-voltage (&gt;1kV) and low-voltage
                (&lt;1kV) incidents
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>Treat electrical burns, identifying both entry and exit wounds</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>List the five types of electrical injury and factors affecting severity</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Explain why ALL electrical casualties must go to hospital, even if they appear well
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Describe the purpose of 110V centre-tapped earth systems on UK construction sites
              </span>
            </li>
          </ul>
        </section>

        <hr className="border-white/10 mb-10" />

        {/* Section 01: Scene Safety */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400/80 text-sm font-normal">01</span>
              Scene Safety &mdash; Your Safety Comes First
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Electric shock incidents present a unique and serious danger to rescuers. Unlike
                most first aid scenarios, the hazard that injured the casualty may still be actively
                present and can injure or kill you if you approach without ensuring the scene is
                safe. <strong>A dead rescuer cannot help anyone.</strong>
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    CRITICAL: Never Approach Until Safe
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  <strong className="text-white">
                    NEVER touch or approach an electrical casualty until you are absolutely certain
                    the power source is off.
                  </strong>{' '}
                  Electricity can arc through the air (especially at high voltages), conduct through
                  wet surfaces, and pass through the casualty&rsquo;s body into yours if you touch
                  them while they are still in contact with the source. Your natural instinct will
                  be to rush in and help &mdash; resist that instinct. Assess the scene first.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-2">
                  <Shield className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Before You Approach &mdash; Ask Yourself:
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Is it high voltage or low voltage?</strong> Overhead lines,
                      substations, and railway lines are high voltage (&gt;1000V) and require a
                      completely different response.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Can I see the source?</strong> Is the casualty still in contact with
                      the electrical source? Is a cable visible? Is equipment still energised?
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Is the ground wet?</strong> Water is a conductor. Wet floors, puddles,
                      and damp surfaces can conduct electricity to you even if you do not touch the
                      casualty directly.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Can I isolate the supply safely?</strong> For low voltage, switch off
                      at the mains, socket, or isolator. For high voltage, do NOT attempt to isolate
                      &mdash; call the DNO.
                    </div>
                  </li>
                </ul>
              </div>

              <p>
                The decision of whether you are dealing with high voltage or low voltage determines
                your entire response. Getting this wrong can cost your life.
              </p>
            </div>
          </div>
        </section>

        {/* Electric Shock Response Flowchart */}
        <section className="mb-10">
          <div className="bg-white/5 border border-rose-400/30 p-4 sm:p-6 rounded-lg">
            <h3 className="text-rose-400 font-medium mb-4 text-center text-sm uppercase tracking-wider">
              Electric Shock Response Flowchart
            </h3>

            {/* START node */}
            <div className="flex flex-col items-center">
              <div className="bg-rose-500/20 border-2 border-rose-400/60 rounded-lg px-6 py-3 text-center mb-3">
                <p className="text-rose-300 font-bold text-sm">START</p>
                <p className="text-white/80 text-xs mt-1">
                  Is it HIGH voltage (&gt;1000V) or LOW voltage?
                </p>
              </div>

              {/* Branch arrows */}
              <div className="flex items-start justify-center gap-4 sm:gap-8 w-full max-w-2xl">
                {/* HIGH VOLTAGE path */}
                <div className="flex flex-col items-center w-1/2">
                  <div className="h-4 w-0.5 bg-red-400/60" />
                  <div className="bg-red-500/20 border border-red-500/40 rounded-lg p-3 w-full text-center mb-2">
                    <p className="text-red-300 font-bold text-xs sm:text-sm">HIGH VOLTAGE</p>
                    <p className="text-white/60 text-[10px] sm:text-xs">
                      Overhead lines, substations, railways
                    </p>
                  </div>
                  <div className="h-3 w-0.5 bg-red-400/40" />
                  <div className="bg-red-500/10 border border-red-500/30 rounded p-2 w-full text-center mb-2">
                    <p className="text-white/80 text-[10px] sm:text-xs">
                      Stay at least <strong className="text-red-300">25 metres</strong> away
                    </p>
                  </div>
                  <div className="h-3 w-0.5 bg-red-400/40" />
                  <div className="bg-red-500/10 border border-red-500/30 rounded p-2 w-full text-center mb-2">
                    <p className="text-white/80 text-[10px] sm:text-xs">
                      Call <strong className="text-red-300">999</strong> AND the{' '}
                      <strong className="text-red-300">DNO</strong>
                    </p>
                  </div>
                  <div className="h-3 w-0.5 bg-red-400/40" />
                  <div className="bg-red-500/10 border border-red-500/30 rounded p-2 w-full text-center mb-2">
                    <p className="text-white/80 text-[10px] sm:text-xs">
                      <strong className="text-red-300">Do NOT approach</strong> until confirmed safe
                      by DNO
                    </p>
                  </div>
                  <div className="h-3 w-0.5 bg-green-400/40" />
                  <div className="bg-green-500/10 border border-green-500/30 rounded p-2 w-full text-center">
                    <p className="text-green-300 text-[10px] sm:text-xs font-medium">
                      Once safe: Assess casualty
                    </p>
                  </div>
                </div>

                {/* LOW VOLTAGE path */}
                <div className="flex flex-col items-center w-1/2">
                  <div className="h-4 w-0.5 bg-amber-400/60" />
                  <div className="bg-amber-500/20 border border-amber-500/40 rounded-lg p-3 w-full text-center mb-2">
                    <p className="text-amber-300 font-bold text-xs sm:text-sm">LOW VOLTAGE</p>
                    <p className="text-white/60 text-[10px] sm:text-xs">
                      Domestic &amp; workplace (230V/400V)
                    </p>
                  </div>
                  <div className="h-3 w-0.5 bg-amber-400/40" />
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded p-2 w-full text-center mb-2">
                    <p className="text-white/80 text-[10px] sm:text-xs">
                      Switch off at{' '}
                      <strong className="text-amber-300">mains/socket/isolator</strong>
                    </p>
                  </div>
                  <div className="h-3 w-0.5 bg-amber-400/40" />
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded p-2 w-full text-center mb-2">
                    <p className="text-white/80 text-[10px] sm:text-xs">
                      If can&rsquo;t switch off: use{' '}
                      <strong className="text-amber-300">dry non-conductive object</strong> to
                      separate
                    </p>
                  </div>
                  <div className="h-3 w-0.5 bg-amber-400/40" />
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded p-2 w-full text-center mb-2">
                    <p className="text-white/80 text-[10px] sm:text-xs">
                      <strong className="text-amber-300">Do NOT touch</strong> casualty&rsquo;s skin
                      until separated
                    </p>
                  </div>
                  <div className="h-3 w-0.5 bg-green-400/40" />
                  <div className="bg-green-500/10 border border-green-500/30 rounded p-2 w-full text-center">
                    <p className="text-green-300 text-[10px] sm:text-xs font-medium">
                      Once safe: Assess casualty
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-white/50 text-xs text-center mt-4 italic">
              The response depends entirely on whether the source is high or low voltage. Assess
              first, then act.
            </p>
          </div>
        </section>

        {/* Section 02: High Voltage Incidents */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400/80 text-sm font-normal">02</span>
              High Voltage Incidents (&gt;1000V)
            </h2>
            <div className="space-y-4 text-white">
              <p>
                High-voltage sources include <strong>overhead power lines</strong> (typically
                11,000V&ndash;400,000V),
                <strong> substations</strong>, <strong>railway lines</strong> (25,000V on
                electrified rail), and some <strong>industrial supplies</strong>. These incidents
                require an entirely different response from low-voltage incidents because the danger
                zone extends far beyond the casualty.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">Stay at Least 25 Metres Away</h3>
                </div>
                <p className="text-white/80 text-sm">
                  High-voltage electricity can{' '}
                  <strong className="text-white">arc through the air</strong> over significant
                  distances. At 11kV, the arcing distance can be several metres. At 400kV (National
                  Grid transmission lines), the danger zone is even greater. The 25-metre minimum
                  distance is a safety buffer &mdash; do not assume that because you cannot see a
                  spark, the area is safe.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">High-Voltage Emergency Procedure</h3>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-sm">1</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-rose-300 font-medium mb-1">
                          Stop &mdash; Maintain Distance
                        </h4>
                        <p className="text-white/80 text-sm">
                          Stay at least <strong className="text-white">25 metres</strong> away from
                          the source and the casualty. Keep other people away from the area. Do not
                          allow anyone to approach.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-sm">2</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-rose-300 font-medium mb-1">Call 999 AND the DNO</h4>
                        <p className="text-white/80 text-sm">
                          Call 999 for emergency services. Also call the{' '}
                          <strong className="text-white">
                            Distribution Network Operator (DNO)
                          </strong>{' '}
                          or <strong className="text-white">National Grid</strong> to report the
                          incident. Only the DNO can isolate and earth the supply.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-sm">3</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-rose-300 font-medium mb-1">Wait for Confirmation</h4>
                        <p className="text-white/80 text-sm">
                          <strong className="text-white">Do NOT approach</strong> until the DNO has
                          confirmed the supply is isolated and earthed. Do not assume that fallen
                          wires are dead &mdash; they may still be live. Do not touch fences, metal
                          structures, or vehicles that may be in contact with the source.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-green-300 font-bold text-sm">4</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-green-300 font-medium mb-1">
                          Once Safe &mdash; Assess the Casualty
                        </h4>
                        <p className="text-white/80 text-sm">
                          Only when the DNO confirms the area is safe should you approach. Assess
                          using DR ABC. Be prepared to start CPR &mdash; cardiac arrest is a
                          significant risk with high-voltage shock.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-rose-400">
                  Vehicle in Contact with Power Lines
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  If a vehicle has driven into or is in contact with an overhead power line:
                </p>
                <ul className="text-white/80 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Tell the occupants to stay inside</strong>{' '}
                      &mdash; the vehicle body acts as a Faraday cage and they are safer inside than
                      attempting to exit
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Call 999 and the DNO immediately</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Wait for the DNO to confirm the supply is isolated</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      If the vehicle is on fire and occupants must exit: they should{' '}
                      <strong className="text-white">jump clear</strong> (not step out), land with
                      both feet together, and shuffle away without lifting their feet
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: Low Voltage Incidents */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400/80 text-sm font-normal">03</span>
              Low Voltage Incidents (&lt;1000V)
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Low-voltage sources include <strong>domestic supplies</strong> (230V single phase),
                <strong> workplace supplies</strong> (400V three phase), and{' '}
                <strong>construction site supplies</strong> (110V). While low voltage is less likely
                to arc through the air, it is still capable of causing serious injury and death. The
                majority of workplace electrical fatalities involve low-voltage supplies.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">Low-Voltage Emergency Procedure</h3>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-sm">1</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-rose-300 font-medium mb-1">Isolate the Supply</h4>
                        <p className="text-white/80 text-sm">
                          Switch off at the <strong className="text-white">mains</strong>,{' '}
                          <strong className="text-white">socket</strong>, or{' '}
                          <strong className="text-white">isolator</strong>. Remove the plug from the
                          socket if accessible. This is the quickest and safest way to make the
                          scene safe.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-sm">2</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-rose-300 font-medium mb-1">
                          If You Cannot Isolate &mdash; Separate the Casualty
                        </h4>
                        <p className="text-white/80 text-sm">
                          Use a <strong className="text-white">non-conductive object</strong> to
                          push or pull the casualty away from the source. Suitable objects include:
                        </p>
                        <ul className="text-white/80 text-sm mt-2 space-y-1">
                          <li className="flex items-start gap-2">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                            <span>
                              A <strong className="text-white">dry wooden broom handle</strong>
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                            <span>
                              A <strong className="text-white">dry rope</strong>
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                            <span>
                              Rolled-up <strong className="text-white">dry newspaper</strong>
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                            <span>
                              A <strong className="text-white">rubber or plastic mat</strong>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-sm">3</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-rose-300 font-medium mb-1">Protect Yourself</h4>
                        <p className="text-white/80 text-sm">
                          Stand on <strong className="text-white">dry insulating material</strong>{' '}
                          (rubber mat, dry wood, dry newspaper) while attempting to separate the
                          casualty. Do NOT use anything{' '}
                          <strong className="text-white">wet or metallic</strong>. Do NOT touch the
                          casualty&rsquo;s bare skin until the contact is broken.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-green-300 font-bold text-sm">4</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-green-300 font-medium mb-1">
                          Once Safe &mdash; Assess the Casualty
                        </h4>
                        <p className="text-white/80 text-sm">
                          Only when the contact is broken should you assess the casualty using DR
                          ABC. Be prepared to start CPR. Call 999 &mdash; all electrical casualties
                          must go to hospital.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">Never Use Wet or Metallic Objects</h3>
                </div>
                <p className="text-white/80 text-sm">
                  Water is a conductor. Wet wood, damp rope, or any metallic object will conduct
                  electricity to you.
                  <strong className="text-white">
                    {' '}
                    Only use dry, non-conductive materials.
                  </strong>{' '}
                  If nothing suitable is available and you cannot isolate the supply,{' '}
                  <strong className="text-white">
                    do not attempt to separate the casualty
                  </strong>{' '}
                  &mdash; call 999 and wait for professional help.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* High vs Low Voltage Comparison */}
        <section className="mb-10">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-5 w-5 text-red-400" />
                <h3 className="text-red-300 font-semibold text-sm">High Voltage (&gt;1000V)</h3>
              </div>
              <ul className="text-white/80 text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                  <span>Overhead lines, substations, railways, industrial HV supplies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                  <span>Can arc through the air over several metres</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                  <span>Stay 25&nbsp;m away minimum</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                  <span>Call 999 AND the DNO/National Grid</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                  <span>Do NOT approach until DNO confirms safe</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                  <span>Fallen wires may still be live</span>
                </li>
              </ul>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-5 w-5 text-amber-400" />
                <h3 className="text-amber-300 font-semibold text-sm">Low Voltage (&lt;1000V)</h3>
              </div>
              <ul className="text-white/80 text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Domestic (230V), workplace (400V), construction (110V)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Less likely to arc but still lethal</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Switch off at mains/socket/isolator</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Remove the plug from the socket</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>If can&rsquo;t isolate: dry non-conductive object to separate</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Do not touch casualty until contact is broken</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 04: Treatment After Contact Is Broken */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400/80 text-sm font-normal">04</span>
              Treatment After Contact Is Broken
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Once the casualty has been safely separated from the electrical source, your
                response follows the standard first aid assessment &mdash; but with specific
                awareness of the injuries that electric shock can cause.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  <Activity className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Post-Separation Treatment Steps
                </h3>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-sm">1</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-rose-300 font-medium mb-1">Assess Using DR ABC</h4>
                        <p className="text-white/80 text-sm">
                          <strong className="text-white">D</strong>anger (confirmed clear),{' '}
                          <strong className="text-white">R</strong>esponse (check for
                          responsiveness), <strong className="text-white">A</strong>irway (open the
                          airway),
                          <strong className="text-white"> B</strong>reathing (check for normal
                          breathing),
                          <strong className="text-white"> C</strong>irculation (check for signs of
                          life).
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-sm">2</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-rose-300 font-medium mb-1">Be Prepared to Start CPR</h4>
                        <p className="text-white/80 text-sm">
                          <strong className="text-white">
                            Cardiac arrest is a significant risk
                          </strong>{' '}
                          with electric shock. The current can disrupt the heart&rsquo;s electrical
                          system, causing ventricular fibrillation. If the casualty is unresponsive
                          and not breathing normally, start CPR immediately (30 compressions, 2
                          rescue breaths). Send someone to fetch the nearest AED.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-sm">3</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-rose-300 font-medium mb-1">
                          Treat Burns &mdash; Entry and Exit Wounds
                        </h4>
                        <p className="text-white/80 text-sm">
                          Electrical burns often have a small{' '}
                          <strong className="text-white">entry wound</strong> where the current
                          entered the body and an <strong className="text-white">exit wound</strong>{' '}
                          where it left (often on the opposite limb or the feet). The internal
                          damage between entry and exit can be
                          <strong className="text-white"> far more severe</strong> than the surface
                          burns suggest. Cool the burns with cool running water for at least 20
                          minutes. Cover loosely with cling film or a clean, non-fluffy dressing.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-sm">4</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-rose-300 font-medium mb-1">
                          Call 999 &mdash; ALL Casualties to Hospital
                        </h4>
                        <p className="text-white/80 text-sm">
                          <strong className="text-white">
                            Every electrical casualty should go to hospital
                          </strong>
                          , even if they appear well. Electric shock can cause cardiac arrhythmias
                          (abnormal heart rhythms) that may not be immediately apparent and can
                          develop{' '}
                          <strong className="text-white">hours after the initial shock</strong>.
                          Hospital cardiac monitoring is essential.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-rose-400">Delayed Cardiac Effects</h3>
                <p className="text-white/80 text-sm">
                  Electric shock can cause <strong className="text-white">arrhythmias</strong>{' '}
                  (abnormal heart rhythms) that may not present immediately. A casualty who appears
                  completely well after an electric shock may develop a life-threatening arrhythmia
                  hours later. This is why hospital assessment and cardiac monitoring is essential
                  for <strong className="text-white">every</strong> electric shock casualty,
                  regardless of how minor the incident appears.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-2">
                  <LinkIcon className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  HSE Electric Shock Poster
                </h3>
                <p className="text-white/80 text-sm">
                  The <strong className="text-white">HSE Electric Shock Poster</strong>{' '}
                  (&ldquo;Electric Shock: First Aid Procedures&rdquo;) is required to be displayed
                  in all electrical workplaces, switchrooms, substations, and any area where there
                  is a risk of electric shock. It shows the emergency procedure for dealing with
                  electric shock casualties. Available from HSE Books. Employers have a legal duty
                  to ensure it is prominently displayed and that workers know its location.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Types of Electrical Injury */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400/80 text-sm font-normal">05</span>
              Types of Electrical Injury
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Electrical incidents can cause a range of injuries, from minor burns to death.
                Understanding the different types helps you assess what has happened and anticipate
                what treatment may be needed.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">Five Types of Electrical Injury</h3>
                <div className="space-y-4">
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium mb-1">1. Electrocution</h4>
                    <p className="text-white/80 text-sm">
                      <strong className="text-white">Death</strong> caused by electric shock. The
                      term &ldquo;electrocution&rdquo; specifically means death &mdash; it is not a
                      synonym for electric shock. Electrocution most commonly results from cardiac
                      arrest caused by ventricular fibrillation.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium mb-1">2. Electric Shock</h4>
                    <p className="text-white/80 text-sm">
                      Electric current passing through the body. Effects range from a mild tingling
                      sensation to cardiac arrest, depending on the voltage, current, pathway, and
                      duration of contact. Even a brief shock can cause arrhythmias that develop
                      later.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium mb-1">3. Electrical Burns</h4>
                    <p className="text-white/80 text-sm">
                      Tissue damage from current flowing through the body or from an arc flash.
                      Electrical burns are deceptive &mdash; the{' '}
                      <strong className="text-white">entry wound may appear small</strong>, but the
                      internal damage along the current pathway can be extensive. The current
                      follows the path of least resistance through nerves, blood vessels, and
                      muscles, destroying tissue internally.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium mb-1">4. Arc Flash</h4>
                    <p className="text-white/80 text-sm">
                      An <strong className="text-white">explosive release of energy</strong> from an
                      electrical fault, where an arc forms between conductors or between a conductor
                      and earth. Temperatures at the arc can exceed 20,000&deg;C. Arc flash causes:
                    </p>
                    <ul className="text-white/80 text-sm mt-2 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          <strong className="text-white">Thermal burns</strong> from the intense
                          heat
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          <strong className="text-white">Blast injuries</strong> from the pressure
                          wave
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          <strong className="text-white">UV radiation burns</strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          <strong className="text-white">Temporary or permanent blindness</strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Hearing damage from the blast</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Ignition of clothing</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium mb-1">5. Secondary Injuries</h4>
                    <p className="text-white/80 text-sm">
                      Injuries that result from the electric shock but are not directly caused by
                      the current itself. Common secondary injuries include{' '}
                      <strong className="text-white">falls from height</strong> after shock
                      (particularly relevant for electricians working on ladders or MEWPs), being
                      <strong className="text-white"> thrown against objects</strong> by muscle
                      contraction, and
                      <strong className="text-white"> head injuries</strong> from falling.
                    </p>
                  </div>
                </div>
              </div>

              {/* Factors Affecting Severity */}
              <div className="bg-white/5 border border-rose-400/30 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  Factors Affecting Severity of Electric Shock
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-300 font-medium text-sm mb-1">Voltage</p>
                    <p className="text-white/70 text-xs">
                      Higher voltage = greater force driving current through the body
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-300 font-medium text-sm mb-1">Current (Amperage)</p>
                    <p className="text-white/70 text-xs">
                      Current kills, not voltage. As little as 50mA across the heart can be fatal
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-300 font-medium text-sm mb-1">Body/Skin Resistance</p>
                    <p className="text-white/70 text-xs">
                      Wet skin has much lower resistance, allowing more current to flow
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-300 font-medium text-sm mb-1">Pathway Through Body</p>
                    <p className="text-white/70 text-xs">
                      Hand-to-hand (across heart) is the most dangerous pathway
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-300 font-medium text-sm mb-1">Duration of Contact</p>
                    <p className="text-white/70 text-xs">
                      Longer contact = more energy transferred = greater tissue damage
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-300 font-medium text-sm mb-1">AC vs DC</p>
                    <p className="text-white/70 text-xs">
                      AC (50Hz) causes muscle contraction preventing release; generally more
                      dangerous than DC
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    AC Muscle Contraction (&ldquo;Can&rsquo;t Let Go&rdquo;)
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  Alternating current (AC) at 50&nbsp;Hz (UK mains frequency) causes involuntary
                  muscle contraction known as <strong className="text-white">tetanic spasm</strong>.
                  This can prevent the casualty from releasing their grip on the electrical source,
                  dramatically increasing the duration of contact and the severity of injury. If you
                  see someone &ldquo;stuck&rdquo; to an electrical source, they are experiencing
                  tetanic spasm &mdash; they cannot release their grip voluntarily. You must isolate
                  the supply or use a non-conductive object to separate them.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Statistics, 110V Sites & Lightning */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400/80 text-sm font-normal">06</span>
              Statistics, 110V Construction Sites &amp; Lightning
            </h2>
            <div className="space-y-4 text-white">
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  <LinkIcon className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  UK Electrical Injury Statistics
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mb-4">
                  <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-3">
                    <p className="text-rose-400 font-bold text-xl sm:text-2xl">~30</p>
                    <p className="text-white/60 text-xs mt-1">
                      UK workplace
                      <br />
                      deaths/year
                    </p>
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-3">
                    <p className="text-rose-400 font-bold text-xl sm:text-2xl">~10%</p>
                    <p className="text-white/60 text-xs mt-1">
                      Of construction
                      <br />
                      fatalities
                    </p>
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-3">
                    <p className="text-rose-400 font-bold text-xl sm:text-2xl">230V</p>
                    <p className="text-white/60 text-xs mt-1">
                      Most common
                      <br />
                      fatal voltage
                    </p>
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-3">
                    <p className="text-rose-400 font-bold text-xl sm:text-2xl">50mA</p>
                    <p className="text-white/60 text-xs mt-1">
                      Can be fatal
                      <br />
                      across heart
                    </p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white font-medium text-sm mb-2">Highest Risk Groups</p>
                    <ul className="text-white/80 text-sm space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Electricians and electrical engineers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Construction workers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Maintenance and facilities staff</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm mb-2">Most Common Scenarios</p>
                    <ul className="text-white/80 text-sm space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Contact with overhead power lines</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Contact with underground cables</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Use of faulty equipment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Working on or near live equipment</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 110V Construction Sites */}
              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-rose-400">
                  110V Centre-Tapped Earth on UK Construction Sites
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  UK construction sites use a{' '}
                  <strong className="text-white">110V centre-tapped earth system</strong> instead of
                  230V. The secondary winding of the transformer has a centre tap connected to
                  earth, which splits the 110V equally &mdash; providing a maximum of{' '}
                  <strong className="text-white">55V to earth</strong>.
                </p>
                <ul className="text-white/80 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      At 55V to earth, the current that can flow through the body is significantly
                      lower than at 230V
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      This <strong className="text-white">reduces the risk</strong> of fatal
                      electric shock but does{' '}
                      <strong className="text-white">NOT eliminate it</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Wet conditions (rain, standing water, damp clothing, sweating) drastically
                      reduce skin resistance, increasing the danger even at 55V
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Safe working practices, RCDs, PAT testing, and proper equipment maintenance
                      remain essential
                    </span>
                  </li>
                </ul>
              </div>

              {/* Lightning */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-2">
                  <Zap className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Lightning Strikes
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  Lightning delivers a massive but extremely brief pulse of current (up to 200,000
                  amperes, lasting milliseconds). Treat a lightning strike casualty as a{' '}
                  <strong className="text-white">high-voltage injury</strong>.
                </p>
                <ul className="text-white/80 text-sm space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        It IS safe to touch the casualty immediately
                      </strong>{' '}
                      after a lightning strike &mdash; there is no residual electrical charge in
                      their body
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Cardiac arrest</strong> is a common result
                      &mdash; be prepared to start CPR immediately
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      Can cause burns, neurological damage, temporary or permanent hearing loss, and
                      temporary or permanent vision loss
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      Call 999 immediately. Lightning strike casualties require hospital assessment.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">Key Message for Electricians</h3>
                </div>
                <p className="text-white/80 text-sm">
                  As an electrician, you work with electricity every day. This familiarity can breed
                  complacency.
                  <strong className="text-white">
                    {' '}
                    Approximately 30 people die from electrical causes in UK workplaces each year
                  </strong>{' '}
                  &mdash; and many more suffer serious injuries. The knowledge in this section is
                  not theoretical for you; it is directly relevant to your working life. Know the
                  emergency procedures. Know where the HSE Electric Shock Poster is displayed on
                  your site. Know how to isolate supplies quickly. And never, ever work live unless
                  there is absolutely no alternative and a formal risk assessment is in place.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-rose-400/80 text-sm font-normal">&nbsp;</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <div className="mt-12">
          <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../first-aid-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../first-aid-module-4-section-4">
              Next: Heat Exhaustion, Heat Stroke &amp; Hypothermia
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
}
