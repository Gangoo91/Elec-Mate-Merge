import {
  ArrowLeft,
  CheckCircle,
  Zap,
  AlertTriangle,
  Shield,
  Cable,
  Radio,
  Gauge,
  Phone,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'eawr-reg12',
    question:
      'Under Regulation 12 of the Electricity at Work Regulations 1989, when is it permissible to work on or near live electrical equipment?',
    options: [
      'Whenever the work needs to be completed quickly',
      'Only when it is unreasonable in all circumstances for the equipment to be made dead',
      'When the worker holds a valid ECS card',
      'When a risk assessment has been completed and filed',
    ],
    correctIndex: 1,
    explanation:
      'Regulation 12 prohibits working on or near live equipment except where it is unreasonable in all the circumstances for it to be dead. This is a very narrow exception — the default position is always that equipment must be made dead before work begins. Even when live working is justified, additional precautions such as insulated tools, barriers, and accompaniment by a competent person are required.',
  },
  {
    id: 'pat-testing',
    question:
      'How often should portable electrical equipment on a construction site typically undergo formal PAT inspection?',
    options: [
      'Once per year',
      'Every 6 months',
      'Every 3 months (typically)',
      'Only when damage is visible',
    ],
    correctIndex: 2,
    explanation:
      'On construction sites, the harsh environment means portable appliances are at greater risk of damage. Formal PAT inspection is typically carried out every 3 months, although this can vary depending on the risk assessment and the type of equipment. Crucially, a visual inspection by the user should also be carried out before every use — checking the cable, plug, and body for damage.',
  },
  {
    id: 'underground-cables',
    question:
      'Within what distance of a known underground service should you use hand digging only (no mechanical excavators)?',
    options: [
      '200mm',
      '500mm',
      '1 metre',
      '2 metres',
    ],
    correctIndex: 1,
    explanation:
      'HSE guidance (HSG47) states that hand digging should be used within 500mm of a known underground service. Mechanical excavators must not be used within this zone because of the risk of striking and damaging the service, which could result in electrocution, gas explosion, or flooding. Cable positions indicated by locating equipment are approximate, so careful hand excavation is essential in this zone.',
  },
];

const faqs = [
  {
    question: 'Why is 110V used on construction sites instead of 230V?',
    answer:
      'Construction sites use 110V with a Centre Tapped Earth (CTE) transformer because it significantly reduces the risk of fatal electric shock. With a CTE system, the maximum voltage to earth is only 55V — well below the level that would normally cause ventricular fibrillation (the heart rhythm disturbance that kills). The harsh conditions on construction sites — wet environments, damaged equipment, trailing cables, metallic structures — make the risk of electric shock much higher than in normal domestic or commercial settings. The 110V CTE system has been standard on UK construction sites for decades and has been credited with dramatically reducing electrical fatalities in the industry.',
  },
  {
    question: 'What should I do if I discover an underground cable while digging?',
    answer:
      'If you discover an underground cable while digging, stop work immediately and do not touch or disturb the cable. Mark the location clearly and inform your supervisor or site manager at once. Do not attempt to move, cut, or work around the cable yourself. The area should be secured and the relevant utility company contacted to identify the cable and advise on safe working procedures. Even cables that appear to be disused or abandoned may still be live. Never assume a cable is dead — treat every cable as live until confirmed otherwise by the utility company.',
  },
  {
    question: 'Can I use 230V equipment on a construction site?',
    answer:
      'In general, 230V portable equipment should not be used on construction sites. The standard is 110V CTE for portable tools and equipment. However, 230V may still be present on site for fixed installations (such as site offices, welfare facilities, and fixed plant) where the installation has been carried out by a competent electrician and is protected by appropriate RCDs (30mA for socket outlets). Any 230V equipment on site must be subject to a specific risk assessment, and additional precautions such as RCD protection are mandatory. Battery-powered cordless tools are increasingly common and avoid the voltage issue entirely.',
  },
  {
    question: 'What is the difference between a CAT scanner and a Genny?',
    answer:
      'A CAT (Cable Avoidance Tool) is a hand-held device that detects electromagnetic signals emitted by buried cables and metal pipes. It can detect signals in three modes: Power mode (detects mains electricity cables), Radio mode (detects long metallic services that re-radiate radio signals), and Genny mode (detects signals applied by a Genny). A Genny (Signal Generator) is a separate transmitter that is connected to a known service (such as a pipe or cable at an access point) and applies a signal that the CAT can then trace. Using a CAT and Genny together gives the most accurate results for locating buried services. A CAT alone will detect live cables and some metallic services, but using the Genny allows you to trace specific services more precisely.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'At what level of current can electric shock cause ventricular fibrillation and death?',
    options: [
      'As little as 10mA',
      'As little as 50mA',
      'As little as 500mA',
      'Only above 1A',
    ],
    correctAnswer: 1,
    explanation:
      'Ventricular fibrillation — the uncoordinated quivering of the heart that prevents it from pumping blood — can occur at currents as low as 50mA (0.05A) passing through the body. This is a tiny fraction of the current flowing through a typical domestic circuit. The severity of electric shock depends on the current magnitude, the path through the body (particularly if it crosses the heart), and the duration of exposure.',
  },
  {
    id: 2,
    question: 'What is the maximum voltage to earth in a 110V Centre Tapped Earth (CTE) system?',
    options: [
      '110V',
      '55V',
      '25V',
      '12V',
    ],
    correctAnswer: 1,
    explanation:
      'In a 110V CTE system, the secondary winding of the transformer has its centre point connected to earth. This means that the maximum voltage between any single conductor and earth is only 55V (half of 110V). This significantly reduces the danger of electric shock compared to a standard 230V supply, where the full 230V exists between line and earth.',
  },
  {
    id: 3,
    question: 'Which regulation of the Electricity at Work Regulations 1989 deals with the duty holder?',
    options: [
      'Regulation 3',
      'Regulation 4',
      'Regulation 12',
      'Regulation 14',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 3 of the Electricity at Work Regulations 1989 establishes the duty holder — the person (employer, self-employed person, or employee) who has a duty to comply with the regulations. It places responsibilities on employers to ensure the health and safety of their employees in relation to electrical systems, and on employees to cooperate with their employer and not place themselves or others at risk.',
  },
  {
    id: 4,
    question: 'What colour connector identifies 110V equipment on a construction site?',
    options: [
      'Blue',
      'Red',
      'Yellow',
      'Black',
    ],
    correctAnswer: 2,
    explanation:
      'Yellow connectors and plugs identify 110V equipment on construction sites. This colour coding is standardised across the UK construction industry: yellow for 110V, blue for 230V single phase, red for 415V three phase. The colour coding allows instant visual identification of the voltage, helping to prevent the accidental connection of equipment to the wrong supply.',
  },
  {
    id: 5,
    question: 'What is the minimum safe distance from overhead power lines carrying 132kV?',
    options: [
      '1 metre',
      '3 metres',
      '6 metres',
      '9 metres',
    ],
    correctAnswer: 1,
    explanation:
      'The minimum safe distance from overhead power lines carrying up to 132kV is at least 3 metres. For higher voltages (275kV and 400kV), the minimum safe distance increases to 6 metres. These distances must be maintained by all persons, vehicles, plant, and materials at all times. Goal posts, barriers, and banksmen may be used to enforce these exclusion zones.',
  },
  {
    id: 6,
    question: 'What colour coding identifies underground electricity cables?',
    options: [
      'Blue',
      'Yellow',
      'Green',
      'Black',
    ],
    correctAnswer: 3,
    explanation:
      'Underground electricity cables are identified by black colour coding. The standard colour coding for underground services is: black for electricity, blue for water, yellow for gas, and green for telecommunications. However, not all cables are colour-coded (especially older installations), and some may have faded or been damaged, so cable locating equipment should always be used before excavation.',
  },
  {
    id: 7,
    question: 'What rating of RCD protection is required for socket outlets on a construction site distribution board?',
    options: [
      '10mA',
      '30mA',
      '100mA',
      '300mA',
    ],
    correctAnswer: 1,
    explanation:
      'Socket outlets on construction site distribution boards must be protected by 30mA RCDs (Residual Current Devices). The 30mA trip rating provides additional protection against electric shock — it will disconnect the supply within approximately 40 milliseconds if a fault current of 30mA or more flows to earth. This is fast enough to prevent fatal electric shock in most circumstances. BS 7671 and the relevant site distribution standards require this level of protection.',
  },
  {
    id: 8,
    question: 'If someone is receiving an electric shock from a live source, what should you do FIRST?',
    options: [
      'Pull them away from the source using your bare hands',
      'Begin CPR immediately',
      'Isolate the electrical supply if it is safe to do so — do NOT touch the person',
      'Pour water over the person to reduce the current',
    ],
    correctAnswer: 2,
    explanation:
      'The first action is to isolate the electrical supply if it is safe to do so — switch off, unplug, or trip the circuit breaker. You must NOT touch the person while they are in contact with the live source, as you will also receive a shock. If you cannot isolate the supply, use a dry non-conductive object (such as a wooden broom handle or dry clothing) to push the person clear. Only once the person is free from the electrical source should you assess their condition and begin CPR if needed. Call emergency services immediately.',
  },
];

export default function CscsCardModule5Section3() {
  useSEO({
    title: 'Electrical Safety on Site | CSCS Card Module 5.3',
    description:
      'Electrical hazards on construction sites, 110V reduced voltage systems, PAT testing, overhead power lines, underground cables, temporary installations, and emergency response to electrical incidents.',
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
            <Link to="../cscs-card-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-400/20 border border-green-500/30 mb-4">
            <Zap className="h-7 w-7 text-green-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-3 mx-auto">
            <span className="text-green-400 text-xs font-semibold">MODULE 5 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Electrical Safety on Site
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            How electricity kills, the regulations that protect workers, reduced voltage systems,
            PAT testing, overhead and underground hazards, temporary installations, and emergency
            response to electrical incidents on construction sites
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
            <p className="text-green-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Electricity kills</strong> &mdash; ventricular fibrillation at as little as 50mA
              </li>
              <li>
                <strong>110V CTE</strong> is the standard on UK construction sites (max 55V to earth)
              </li>
              <li>
                <strong>Never work live</strong> unless it is unreasonable to make the equipment dead
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
            <p className="text-green-400/90 text-base font-medium mb-2">Key Facts</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Electricity at Work Regulations 1989</strong> govern all electrical safety
              </li>
              <li>
                <strong>PAT testing:</strong> visual check every use, formal test every 3 months on site
              </li>
              <li>
                <strong>Overhead lines:</strong> at least 3m (132kV), 6m (275/400kV) safe distance
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain how electricity kills and identify the factors affecting shock severity',
              'State the key regulations of the Electricity at Work Regulations 1989',
              'Describe the 110V CTE reduced voltage system and why it is used on construction sites',
              'Explain PAT testing requirements and the difference between Class I and Class II equipment',
              'State the minimum safe distances from overhead power lines and the precautions required',
              'Describe safe digging practices and the use of CAT and Genny for cable detection',
              'Identify the requirements for temporary electrical installations on site',
              'Explain the correct emergency response to electrical incidents',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-green-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Electrical Hazards */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">01</span>
            Electrical Hazards
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Electricity is one of the most dangerous hazards on construction sites. Contact with
                live conductors can cause death or serious injury within seconds. Unlike many other
                hazards, electricity is invisible &mdash; you cannot see, hear, or smell it. Workers
                must rely on safe systems of work, proper equipment, and vigilance to protect themselves
                and others.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Critical Fact:</strong> Electricity kills
                  approximately 10&ndash;15 construction workers per year in the UK and causes many more
                  serious injuries including severe burns. Contact with overhead power lines and
                  underground cables accounts for a significant proportion of electrical fatalities on
                  construction sites.
                </p>
              </div>

              <p>
                The five main electrical hazards on construction sites are:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Types of Electrical Hazard</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Electric shock</strong> &mdash; current passing
                      through the body. Even a brief contact can cause involuntary muscle contraction,
                      loss of consciousness, cardiac arrest, or death. The heart is particularly
                      vulnerable &mdash; ventricular fibrillation (uncoordinated quivering of the heart
                      muscle) can occur at currents as low as 50mA
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Electrical burns</strong> &mdash; current flowing
                      through body tissue generates intense heat, causing deep tissue burns that are often
                      far more severe than they appear on the surface. Entry and exit wound burns can
                      cause permanent damage to muscles, nerves, and internal organs
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Arcing</strong> &mdash; an electrical discharge
                      through air between conductors, producing intense light, heat (temperatures
                      exceeding 20,000&deg;C), molten metal splatter, and a pressure blast wave. Arc
                      flash incidents can cause severe burns, blindness, and hearing damage even without
                      direct contact
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Fire</strong> &mdash; faulty electrical equipment,
                      overloaded cables, poor connections, and damaged insulation can all ignite
                      surrounding materials. Electrical fires on construction sites are particularly
                      dangerous due to the presence of combustible materials, solvents, and limited
                      escape routes in partially completed structures
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Explosion</strong> &mdash; electrical sparks in the
                      presence of flammable gases, vapours, or dust can cause catastrophic explosions.
                      This is a particular risk in confined spaces, near fuel stores, and during work
                      involving solvents or gas supplies
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">How Electricity Kills &mdash; Severity Factors</p>
                <p className="text-sm text-white/80 mb-3">
                  Whether an electric shock is fatal depends on three key factors:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Current magnitude</strong> &mdash; the amount of
                      current flowing through the body. As little as 50mA (0.05A) can cause ventricular
                      fibrillation. Higher currents cause respiratory arrest, severe burns, and cardiac
                      arrest. Current is determined by voltage and resistance (I = V/R) &mdash; wet skin,
                      cuts, or metal jewellery reduce resistance and increase current flow
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Path through the body</strong> &mdash; current
                      flowing hand-to-hand or hand-to-foot passes through the chest and across the heart,
                      which is the most dangerous path. A current path that avoids the heart (e.g.,
                      finger to the same hand) is less likely to be fatal but can still cause severe burns
                      and tissue damage
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Duration of exposure</strong> &mdash; the longer the
                      current flows through the body, the greater the damage. Muscular contraction
                      (&ldquo;cannot let go&rdquo; effect) can prevent the victim from releasing the live
                      conductor, prolonging exposure. This is why fast-acting protective devices (RCDs,
                      fuses, circuit breakers) are so important
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Electricity at Work Regulations 1989 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">02</span>
            Electricity at Work Regulations 1989
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Electricity at Work Regulations 1989 (EAWR) are the primary legislation governing
                electrical safety in the workplace. They apply to all work activities involving
                electrical systems and equipment, from low-voltage battery systems to high-voltage
                power lines. The regulations place duties on employers, the self-employed, and
                employees to prevent danger from electricity.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Key Principle:</strong> The overarching principle
                  of the EAWR is that electrical systems must be constructed, maintained, and used so
                  as to prevent danger. &ldquo;Danger&rdquo; is defined as the risk of injury from
                  electric shock, burn, fire, or explosion arising from the use of electricity.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Key Regulations You Must Know</p>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="h-4 w-4 text-green-400" />
                      <p className="text-sm font-medium text-green-400">Regulation 3 &mdash; Duty Holder</p>
                    </div>
                    <p className="text-sm text-white/80">
                      Establishes who has a duty to comply with the regulations. Duties are placed on
                      employers (to protect employees and others), the self-employed (to protect themselves
                      and others), and employees (to cooperate with safety measures and not place themselves
                      or others at risk). Every person at work has a responsibility to comply so far as it
                      relates to matters within their control.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="h-4 w-4 text-green-400" />
                      <p className="text-sm font-medium text-green-400">Regulation 4 &mdash; Systems to Prevent Danger</p>
                    </div>
                    <p className="text-sm text-white/80">
                      All electrical systems must be constructed and maintained so as to prevent danger, so
                      far as is reasonably practicable. This covers the design, installation, maintenance,
                      and use of all electrical systems. Work activities on or near electrical systems must
                      be carried out in a manner that does not give rise to danger. This regulation
                      underpins all other electrical safety requirements.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                      <p className="text-sm font-medium text-red-400">Regulation 12 &mdash; Live Working Prohibited</p>
                    </div>
                    <p className="text-sm text-white/80">
                      No person shall work on or near any live conductor (other than one suitably covered
                      with insulation) unless it is <strong className="text-white">unreasonable in all the
                      circumstances</strong> for it to be dead, it is reasonable in all the circumstances
                      for the person to be at work on or near it whilst live, and suitable precautions
                      (including the provision of protective equipment) have been taken to prevent injury.
                      All three conditions must be met. The default is always: <strong className="text-white">make
                      it dead first</strong>.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="h-4 w-4 text-green-400" />
                      <p className="text-sm font-medium text-green-400">Regulation 14 &mdash; Working Space, Access &amp; Lighting</p>
                    </div>
                    <p className="text-sm text-white/80">
                      Adequate working space, adequate means of access, and adequate lighting must be
                      provided at all electrical equipment on which or near which work is being done, so
                      that the work can be carried out safely. Cramped, poorly lit, or difficult-to-access
                      electrical equipment significantly increases the risk of accidental contact with live
                      parts.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                The EAWR applies to all workplaces and all voltages. On construction sites, compliance
                is particularly important because temporary electrical installations, portable
                equipment, and the harsh environment all increase the risk. The Health and Safety
                Executive (HSE) can prosecute under these regulations, and failure to comply is a
                criminal offence. The HSE publishes guidance in the form of the Memorandum of Guidance
                on the Electricity at Work Regulations (HSR25) which provides detailed interpretation
                and practical advice.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: 110V Reduced Voltage System */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">03</span>
            110V Reduced Voltage System
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The 110V Centre Tapped Earth (CTE) system is the standard for portable electrical
                equipment on UK construction sites. It is the single most effective measure for
                reducing the risk of fatal electric shock from portable tools and equipment in the
                harsh construction environment.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Why 110V CTE?</strong> In a 110V CTE system, the
                  secondary winding of the step-down transformer has its centre point connected to
                  earth. This means the maximum voltage between any single conductor and earth is only
                  55V &mdash; far less than the 230V that exists in a standard domestic supply. At 55V,
                  the current that can flow through the human body (given typical skin resistance) is
                  well below the level that causes ventricular fibrillation, dramatically reducing the
                  risk of death from electric shock.
                </p>
              </div>

              {/* 110V CTE System Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-white mb-4 text-center">
                  110V Centre Tapped Earth (CTE) System
                </p>
                <p className="text-xs text-white/50 text-center mb-6">
                  How the centre tap limits voltage to earth
                </p>

                <div className="flex flex-col items-center gap-0">
                  {/* 230V Mains Supply */}
                  <div className="w-full max-w-[300px] bg-gradient-to-r from-red-500/15 to-red-400/10 border border-red-500/30 rounded-t-xl p-3 text-center">
                    <p className="text-xs font-bold text-red-400">230V MAINS SUPPLY</p>
                    <p className="text-[10px] text-white/60">Incoming site supply (line to earth = 230V)</p>
                  </div>
                  <div className="flex flex-col items-center py-1">
                    <div className="w-0.5 h-4 bg-white/20" />
                    <div className="text-[10px] text-white/40">&#9660;</div>
                  </div>

                  {/* Transformer */}
                  <div className="w-full max-w-[360px] bg-gradient-to-r from-yellow-500/20 to-yellow-400/10 border-2 border-yellow-500/40 p-4 text-center">
                    <p className="text-xs font-bold text-yellow-400">STEP-DOWN TRANSFORMER</p>
                    <p className="text-[10px] text-white/60 mt-1">230V primary &rarr; 110V secondary</p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-0.5 bg-green-400" />
                        <p className="text-[10px] text-green-400 mt-0.5">55V</p>
                      </div>
                      <div className="w-3 h-3 rounded-full bg-green-500/30 border border-green-400 flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-green-400" />
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-0.5 bg-green-400" />
                        <p className="text-[10px] text-green-400 mt-0.5">55V</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-white/50 mt-1">Centre Tap &rarr; Earth</p>
                  </div>
                  <div className="flex flex-col items-center py-1">
                    <div className="w-0.5 h-4 bg-white/20" />
                  </div>

                  {/* Earth Connection */}
                  <div className="w-full max-w-[200px] bg-gradient-to-r from-green-500/15 to-green-400/10 border border-green-500/30 p-3 text-center">
                    <p className="text-xs font-bold text-green-400">CENTRE TAP TO EARTH</p>
                    <p className="text-[10px] text-white/60">0V reference point</p>
                  </div>
                  <div className="flex flex-col items-center py-1">
                    <div className="w-0.5 h-4 bg-white/20" />
                  </div>

                  {/* Output */}
                  <div className="w-full max-w-[420px] bg-gradient-to-r from-green-500/10 to-green-400/5 border border-green-500/20 rounded-b-xl p-3 text-center">
                    <p className="text-xs font-bold text-green-400">110V OUTPUT (55V TO EARTH)</p>
                    <p className="text-[10px] text-white/60">
                      Maximum 55V between any conductor and earth &bull; Yellow connectors
                    </p>
                  </div>
                </div>

                <p className="text-xs text-white/40 text-center mt-4 italic">
                  The centre tap earthing arrangement halves the voltage to earth, reducing shock risk significantly.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Key Features of the 110V CTE System</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Yellow connectors and equipment</strong> &mdash;
                      all 110V plugs, sockets, extension leads, and equipment casings are coloured
                      yellow for instant identification. Blue identifies 230V and red identifies 415V
                      three-phase
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Transformer requirements</strong> &mdash; a
                      step-down transformer converts the 230V mains supply to 110V. The transformer
                      must be correctly rated for the load, positioned on a firm, level surface away
                      from traffic and weather, and regularly inspected. The earth connection must be
                      secure at all times
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Maximum 55V to earth</strong> &mdash; with the
                      centre tap earthed, the highest voltage that can exist between any conductor and
                      earth is 55V. This is the key safety feature. Even if a fault develops and a
                      worker touches a live conductor whilst standing on earth, the voltage driving
                      current through their body is limited to 55V
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">When 230V is still used on site</strong> &mdash;
                      230V may be present for fixed installations such as site offices, canteens,
                      drying rooms, and welfare facilities. These must be installed by a competent
                      electrician, protected by 30mA RCDs, and clearly identified. Battery-powered
                      cordless tools are increasingly common and avoid the voltage risk entirely
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Portable Appliance Testing (PAT) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">04</span>
            Portable Appliance Testing (PAT)
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Portable Appliance Testing (PAT) is a process of checking electrical equipment for
                safety through a combination of visual inspection and electrical testing. On
                construction sites, where equipment is subjected to rough handling, dust, moisture, and
                impact damage, regular PAT testing is essential to prevent electrical accidents.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Two-Stage Process:</strong> PAT involves two
                  levels of checking: (1) a <strong>visual inspection by the user before every use</strong>,
                  and (2) a <strong>formal PAT inspection and test</strong> at regular intervals
                  (typically every 3 months on construction sites). The user check is the first line of
                  defence and catches the majority of dangerous faults.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">User Visual Inspection &mdash; Before Every Use</p>
                <p className="text-sm text-white/80 mb-3">
                  Every worker should carry out a quick visual check of any portable electrical
                  equipment before using it. Look for:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Cable condition</strong> &mdash; check for cuts,
                      abrasion, kinks, exposed inner conductors, taped-up repairs (never acceptable on
                      site), and damage near the plug or equipment entry point where flexing causes the
                      most wear
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Plug condition</strong> &mdash; check for cracks,
                      burn marks, bent or damaged pins, loose cable grip, and that the plug casing is
                      intact with no parts missing. The cable should be firmly secured in the plug
                      with no inner conductors visible
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Equipment body</strong> &mdash; check for cracks,
                      dents, missing parts, signs of overheating (discolouration, melted plastic),
                      water ingress, and that all guards and covers are in place. Any tool that shows
                      signs of internal damage or has been dropped heavily should be withdrawn from use
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">PAT test label</strong> &mdash; check that the
                      equipment has a current PAT test label showing the date of last test and the
                      next test due date. If the label is missing, expired, or shows a &ldquo;fail&rdquo;
                      result, do not use the equipment
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Formal PAT Testing Schedule</p>
                <p className="text-sm text-white/80 mb-3">
                  On construction sites, the recommended schedule for formal PAT testing is:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Every 3 months (typically)</strong> for portable
                      tools used on the construction site. This frequency reflects the harsh conditions
                      and rough handling that site equipment experiences
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">More frequently</strong> if the risk assessment
                      indicates that conditions are particularly harsh, or if the equipment type is
                      prone to damage (e.g., extension leads, hand-held power tools)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">After any incident</strong> that may have damaged
                      the equipment, such as being dropped, run over, immersed in water, or involved
                      in a trip or short circuit
                    </span>
                  </li>
                </ul>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Gauge className="h-4 w-4 text-blue-400" />
                    <p className="text-sm font-medium text-blue-400">Class I Equipment</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    Has basic insulation plus an earth connection for safety.
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Metal casing connected to earth via the earth pin in the plug</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>If a live conductor touches the metal casing, current flows to earth and trips the protective device</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>PAT test includes earth continuity test, insulation resistance test, and functional check</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Three-core cable (line, neutral, earth)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-amber-400" />
                    <p className="text-sm font-medium text-amber-400">Class II Equipment (Double Insulated)</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    Has reinforced or double insulation &mdash; no earth connection needed.
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Marked with the double square symbol (&#9633; inside &#9633;)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>No earth pin in the plug (or earth pin present but not connected)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>PAT test includes insulation resistance test and functional check (no earth continuity test)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Two-core cable (line and neutral only)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Overhead Power Lines */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">05</span>
            Overhead Power Lines
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Overhead power lines are one of the most dangerous electrical hazards on and around
                construction sites. Contact with overhead lines &mdash; whether by cranes, scaffolding,
                tipper lorries, excavator booms, or even long materials being carried &mdash; has
                caused numerous fatalities. Electricity can arc across gaps without direct contact,
                meaning it is not necessary to touch the line itself to receive a fatal shock.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Fatal Statistics:</strong> Contact with overhead
                  power lines accounts for a significant number of electrical deaths in the construction
                  and agricultural industries each year. Many of these fatalities involve crane or plant
                  operations where the boom or jib contacts or comes too close to an overhead line.
                  HSE guidance GS6 provides detailed advice on avoiding danger from overhead power lines.
                </p>
              </div>

              {/* Safe Distances Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-white mb-4 text-center">
                  Safe Distances from Overhead Power Lines
                </p>
                <p className="text-xs text-white/50 text-center mb-6">
                  Minimum clearance zones that must be maintained at all times
                </p>

                <div className="space-y-3">
                  {/* Low voltage */}
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <div className="flex-shrink-0 w-16 text-center">
                      <p className="text-lg font-bold text-yellow-400">1m</p>
                      <p className="text-[10px] text-white/50">minimum</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">Low Voltage (up to 1kV)</p>
                      <p className="text-xs text-white/60">
                        Local distribution lines &bull; minimum 1m clearance &bull; additional precautions still required
                      </p>
                    </div>
                  </div>

                  {/* 11kV - 33kV */}
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                    <div className="flex-shrink-0 w-16 text-center">
                      <p className="text-lg font-bold text-orange-400">3m</p>
                      <p className="text-[10px] text-white/50">minimum</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">High Voltage (up to 132kV)</p>
                      <p className="text-xs text-white/60">
                        Typical pylon lines &bull; at least 3m clearance from conductors &bull; barriers and goal posts required
                      </p>
                    </div>
                  </div>

                  {/* 275kV / 400kV */}
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <div className="flex-shrink-0 w-16 text-center">
                      <p className="text-lg font-bold text-red-400">6m</p>
                      <p className="text-[10px] text-white/50">minimum</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">Extra High Voltage (275kV / 400kV)</p>
                      <p className="text-xs text-white/60">
                        National Grid transmission lines &bull; at least 6m clearance &bull; no work without specific authorisation
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-white/40 text-center mt-4 italic">
                  These are minimum distances. Always follow the specific distances agreed with the
                  Distribution Network Operator (DNO) or National Grid for the site.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Precautions for Working Near Overhead Lines</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Goal posts and barriers</strong> &mdash; physical
                      height restrictors (goal posts) should be erected on access routes passing under
                      or near overhead lines. These prevent tall vehicles and plant from entering the
                      danger zone. The crossbar must be set at a safe height below the minimum clearance
                      distance
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Crane and vehicle restrictions</strong> &mdash;
                      cranes, excavators with raised booms, tipper lorries with raised bodies, and
                      concrete pump booms must all be kept well clear of overhead lines. A banksman
                      should be appointed to monitor clearances. Crane slew and height limiters may be
                      needed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Warning signs and markings</strong> &mdash; clear
                      warning signs must be displayed at all points where vehicles or plant could approach
                      overhead lines. Ground markings may be used to indicate exclusion zones
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">HSE guidance GS6</strong> &mdash; &ldquo;Avoiding
                      Danger from Overhead Power Lines&rdquo; provides detailed guidance on risk
                      assessment, safe clearance distances, protective measures, and emergency procedures.
                      It is the primary reference document for work near overhead lines
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Diversion or disconnection</strong> &mdash; where
                      possible, the power company should be asked to divert the line underground or
                      temporarily disconnect and earth it for the duration of the works. This eliminates
                      the risk entirely and is always the preferred option
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-red-400">Emergency:</strong> If a vehicle or piece of plant
                  contacts an overhead power line, the operator must stay in the cab, warn others to
                  stay clear, and call the emergency services. Do not attempt to leave the vehicle
                  unless it is on fire &mdash; in which case, jump well clear (do not step down, as
                  this creates a path to earth). Anyone on the ground near the contact point is at risk
                  of electrocution from step potential (voltage gradients in the ground).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Underground Cables */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">06</span>
            Underground Cables
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Underground cables present a serious hazard during any excavation work on construction
                sites. Striking an underground electricity cable with a mechanical excavator, hand
                tool, or even a fence post can result in fatal electrocution, severe burns, or
                explosion. The HSE publication HSG47 (&ldquo;Avoiding Danger from Underground
                Services&rdquo;) provides comprehensive guidance on safe excavation practices.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Key Principle:</strong> Before any excavation work
                  begins, the location of all underground services must be established. This involves
                  three steps: (1) obtaining up-to-date plans from utility companies, (2) using cable
                  locating equipment (CAT and Genny) to scan the area, and (3) hand digging trial
                  holes to confirm locations before using mechanical plant.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Cable Detection &mdash; CAT and Genny</p>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <Radio className="h-4 w-4 text-blue-400" />
                      <p className="text-sm font-medium text-blue-400">CAT (Cable Avoidance Tool)</p>
                    </div>
                    <p className="text-sm text-white/80">
                      A hand-held receiver that detects electromagnetic signals from buried services.
                      Operates in three modes: <strong className="text-white">Power mode</strong>
                      (detects 50Hz signals from live mains cables), <strong className="text-white">Radio
                      mode</strong> (detects radio frequency signals re-radiated by long metallic
                      services), and <strong className="text-white">Genny mode</strong> (detects the
                      specific signal applied by a paired signal generator). The CAT should always be
                      used in all three modes for a thorough survey.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <Cable className="h-4 w-4 text-amber-400" />
                      <p className="text-sm font-medium text-amber-400">Genny (Signal Generator)</p>
                    </div>
                    <p className="text-sm text-white/80">
                      A separate transmitter that is connected to a known service at an access point
                      (e.g., a valve, junction box, or exposed section). It applies a distinct signal
                      that the CAT can detect and trace in Genny mode. Using a CAT and Genny together
                      gives the most accurate results because the Genny signal is specific to the
                      targeted service, allowing it to be traced individually even where multiple
                      services run close together.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Underground Service Colour Coding</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 p-2 rounded bg-gray-900/50 border border-white/10">
                    <div className="w-6 h-4 rounded bg-black border border-white/30 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-white">Black</p>
                      <p className="text-[10px] text-white/60">Electricity</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded bg-gray-900/50 border border-white/10">
                    <div className="w-6 h-4 rounded bg-blue-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-white">Blue</p>
                      <p className="text-[10px] text-white/60">Water</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded bg-gray-900/50 border border-white/10">
                    <div className="w-6 h-4 rounded bg-yellow-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-white">Yellow</p>
                      <p className="text-[10px] text-white/60">Gas</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded bg-gray-900/50 border border-white/10">
                    <div className="w-6 h-4 rounded bg-green-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-white">Green</p>
                      <p className="text-[10px] text-white/60">Telecommunications</p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-white/50 mt-3 italic">
                  Not all underground services are colour-coded &mdash; older installations may have
                  different colours or no colour coding at all. Always use locating equipment.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Safe Digging Practices</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Hand digging within 500mm</strong> &mdash;
                      mechanical excavators must not be used within 500mm of a known underground
                      service. Within this zone, only hand digging with insulated hand tools (spades
                      with fibreglass handles, not pickaxes) should be used
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Dig alongside, not directly above</strong> &mdash;
                      wherever possible, approach cables from the side rather than from directly above
                      to reduce the risk of striking them with a downward blow
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">No power tools near cables</strong> &mdash;
                      pneumatic picks, breakers, and other percussive power tools must not be used near
                      known cable routes. These can easily puncture cable insulation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Support exposed cables</strong> &mdash; any cables
                      exposed during excavation must be properly supported to prevent damage from
                      sagging, being stood on, or having spoil heaps placed on them. Cable supports
                      (sandbags, timber cradles) should be used
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Treat all cables as live</strong> &mdash; never
                      assume a cable is dead or disused. Even cables that appear old, damaged, or
                      abandoned may still be energised. Only the utility company can confirm whether
                      a cable is live or dead
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Temporary Electrical Installations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">07</span>
            Temporary Electrical Installations
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Construction sites rely on temporary electrical installations to power tools,
                equipment, lighting, welfare facilities, and site offices. These installations must be
                designed, installed, maintained, and used with the same care as permanent installations
                &mdash; the temporary nature of the work does not reduce the safety requirements.
                BS 7671 (IET Wiring Regulations) Section 704 covers the specific requirements for
                construction and demolition site installations.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Site Distribution Boards</p>
                <p className="text-sm text-white/80 mb-3">
                  Electricity on a construction site is distributed through a hierarchy of distribution
                  boards, from the main incoming supply down to individual socket outlets:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Main distribution board</strong> &mdash; receives
                      the incoming supply from the utility company or on-site generator. Contains the
                      main isolator and distribution equipment. Must be locked and access restricted to
                      competent persons only
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Sub-distribution boards</strong> &mdash; fed from
                      the main board and positioned around the site to provide power where it is needed.
                      Each sub-board should have its own isolator and protective devices
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">110V transformer outlets</strong> &mdash;
                      step-down transformers fed from the distribution system provide 110V CTE supplies
                      for portable tools and equipment via yellow socket outlets
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">RCD Protection Requirements</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">30mA RCD protection</strong> is required for all
                      socket outlets up to 32A on construction site distribution boards. This provides
                      additional protection against electric shock and will disconnect the supply within
                      approximately 40 milliseconds if a fault current of 30mA or more flows to earth
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">RCD testing</strong> &mdash; RCDs on site
                      distribution boards should be tested at regular intervals using the built-in test
                      button. Formal testing with calibrated instruments should be carried out as part of
                      the periodic inspection schedule. A failed RCD must be replaced immediately
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">IP Ratings for Outdoor Equipment</p>
                <p className="text-sm text-white/80 mb-3">
                  Electrical equipment used outdoors on construction sites must have an appropriate
                  Ingress Protection (IP) rating to withstand the conditions:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">IP44 minimum</strong> for distribution boards and
                      equipment exposed to weather &mdash; protected against objects greater than 1mm
                      and splashing water from any direction
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Higher ratings</strong> may be needed for
                      equipment in particularly exposed or wet locations (e.g., IP55 or IP65 for
                      equipment subject to water jets or heavy rain)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Cable Routing, Protection &amp; Generator Safety</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Cable routing</strong> &mdash; cables should be
                      routed to avoid damage from vehicles, pedestrians, plant, and falling objects.
                      Overhead routing on catenary wires, buried in ducts, or protected by heavy-duty
                      cable covers (ramps) are all acceptable methods
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Cable protection</strong> &mdash; cables must not
                      be run across roadways without protection, draped over sharp edges, or left in
                      standing water. Damaged cables must be replaced, not repaired with tape
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Generator safety</strong> &mdash; portable
                      generators must be correctly earthed, positioned outdoors (never in enclosed
                      spaces due to carbon monoxide risk), refuelled only when the engine is off and
                      cool, and regularly inspected. The generator output must be protected by
                      appropriate circuit breakers or RCDs
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Connection and disconnection</strong> &mdash;
                      only competent persons (qualified electricians) should make or break connections
                      to the site electrical system. All connections must be made using proper
                      connectors &mdash; never by twisting bare wires together. Isolation procedures
                      must be followed before any work on the distribution system
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Inspection Schedule:</strong> Temporary electrical
                  installations on construction sites should be inspected and tested at intervals not
                  exceeding 3 months. This is more frequent than for permanent installations because
                  of the harsher conditions and greater risk of damage. Records of all inspections and
                  tests must be kept on site and available for examination by the HSE, client, or
                  principal contractor.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Emergency Response to Electrical Incidents */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">08</span>
            Emergency Response to Electrical Incidents
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Knowing how to respond correctly to an electrical incident can save lives. The wrong
                response &mdash; particularly touching a person who is still in contact with a live
                source &mdash; can result in the rescuer also becoming a casualty. Speed is critical,
                but safety must come first.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-red-400">Critical Warning:</strong> Do NOT touch a person
                  who is receiving an electric shock or who is in contact with a live conductor. If you
                  touch them, the current will flow through you as well. This is one of the most common
                  causes of multiple casualties in electrical incidents.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Step-by-Step Emergency Response</p>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                    <p className="text-xs font-bold text-red-400 mb-1">STEP 1 &mdash; Do NOT Touch</p>
                    <p className="text-sm text-white/80">
                      Do not touch the person. Do not use your bare hands or any conductive material to
                      attempt to move them. Assess the situation from a safe distance and identify the
                      electrical source.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-orange-500/5 border border-orange-500/20">
                    <p className="text-xs font-bold text-orange-400 mb-1">STEP 2 &mdash; Isolate the Supply</p>
                    <p className="text-sm text-white/80">
                      If it is safe to do so, isolate the electrical supply. Switch off at the socket,
                      unplug the equipment, or trip the circuit breaker/RCD at the distribution board.
                      For high-voltage incidents (overhead lines, substations), do not approach &mdash;
                      call the emergency services and the electricity company immediately.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
                    <p className="text-xs font-bold text-yellow-400 mb-1">STEP 3 &mdash; Separate if Cannot Isolate</p>
                    <p className="text-sm text-white/80">
                      If you cannot isolate the supply, use a dry non-conductive object to push the
                      person clear of the live source. A wooden broom handle, a dry length of timber,
                      dry clothing, or a rubber mat can be used. Stand on a dry, non-conductive surface.
                      Do not use anything wet, metallic, or damp.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <Phone className="h-4 w-4 text-green-400" />
                      <p className="text-xs font-bold text-green-400">STEP 4 &mdash; Call Emergency Services</p>
                    </div>
                    <p className="text-sm text-white/80">
                      Call 999 immediately (or the site emergency number). State that it is an electrical
                      incident, give the location, the number of casualties, and their condition. Do not
                      delay calling &mdash; even if the person appears to recover, they must be assessed
                      by paramedics as cardiac complications can develop later.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
                    <p className="text-xs font-bold text-blue-400 mb-1">STEP 5 &mdash; Administer First Aid</p>
                    <p className="text-sm text-white/80">
                      Once the person is free from the electrical source and it is safe to touch them,
                      assess their condition. If they are not breathing and have no pulse, begin CPR
                      immediately. If available, use an AED (Automated External Defibrillator). Place
                      the casualty in the recovery position if they are breathing but unconscious. Treat
                      any burns by cooling with clean water (do not apply creams, lotions, or adhesive
                      dressings directly to electrical burns).
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Reporting &amp; Investigation</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">RIDDOR reporting</strong> &mdash; electrical
                      incidents that result in death, major injury, or incapacitation for more than
                      7 consecutive days must be reported under the Reporting of Injuries, Diseases
                      and Dangerous Occurrences Regulations 2013 (RIDDOR). Dangerous occurrences
                      involving electricity (such as short circuits causing fires, or incidents
                      involving overhead lines) must also be reported even if no one is injured
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Scene preservation</strong> &mdash; the area
                      around an electrical incident should be secured and preserved as far as possible
                      for investigation. Do not disturb equipment, tools, or cables unless it is
                      necessary to make the area safe or to administer first aid
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Investigation process</strong> &mdash; the
                      employer, principal contractor, and (in serious cases) the HSE will investigate
                      the incident. The investigation will examine the root cause, whether safe systems
                      of work were in place and followed, whether equipment was properly maintained and
                      tested, and whether competent persons were supervising the work. Findings will
                      inform corrective actions to prevent recurrence
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Recording and lessons learnt</strong> &mdash; all
                      electrical incidents, including near misses, should be recorded in the site
                      accident book and discussed at the next toolbox talk or site safety meeting. Near
                      misses are particularly valuable as learning opportunities because they highlight
                      weaknesses in the system before someone is hurt
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Remember:</strong> All workers on construction
                  sites should know the location of the nearest first aid kit, the site emergency
                  number, the nearest AED (if available), and the evacuation assembly point. This
                  information is typically covered in the site induction and should be displayed on
                  notice boards throughout the site.
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
            <Link to="../cscs-card-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-green-500 text-white hover:bg-green-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cscs-card-module-5-section-4">
              Next: Demolition &amp; Emergency Procedures
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
