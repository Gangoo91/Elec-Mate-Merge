import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Dangers of Electricity - MOET Module 1.2.1";
const DESCRIPTION = "Comprehensive guide to the dangers of electricity for maintenance technicians: electric shock mechanisms, current pathways, arc flash hazards, electrical burns, fire risks, voltage bands and UK accident statistics under BS 7671:2018+A3:2024 and EAWR 1989.";

const quickCheckQuestions = [
  {
    id: "shock-mechanism",
    question: "What is the primary factor that determines the severity of an electric shock injury?",
    options: [
      "The voltage of the supply",
      "The magnitude of current flowing through the body and its duration",
      "Whether the supply is AC or DC",
      "The type of footwear being worn"
    ],
    correctIndex: 1,
    explanation: "While voltage drives current, it is the magnitude of current flowing through the body and the duration of exposure that determine the severity of injury. As little as 30 mA AC for a few seconds can cause ventricular fibrillation. Voltage, frequency and pathway all influence the current, but current and time are the critical factors."
  },
  {
    id: "let-go-threshold",
    question: "At approximately what AC current level does a person lose the ability to release a conductor (the let-go threshold)?",
    options: [
      "1 mA",
      "5 mA",
      "10 mA",
      "50 mA"
    ],
    correctIndex: 2,
    explanation: "The let-go threshold for AC current is approximately 10 mA for most adults. Above this level, involuntary muscle contraction prevents the person from releasing the conductor, greatly increasing the duration of exposure and the risk of fatal injury. For women and children, the threshold may be lower — around 6-8 mA."
  },
  {
    id: "arc-flash-temp",
    question: "What temperature can an arc flash reach at its core?",
    options: [
      "Up to 1,000 °C",
      "Up to 5,000 °C",
      "Up to 20,000 °C",
      "Up to 100,000 °C"
    ],
    correctIndex: 2,
    explanation: "An arc flash can reach temperatures of up to 20,000 °C at its core — approximately four times the surface temperature of the sun. At these temperatures, copper conductors vaporise instantly, creating a superheated plasma and a pressure wave that can cause devastating blast injuries in addition to severe burns."
  },
  {
    id: "voltage-bands",
    question: "Under BS 7671:2018+A3:2024, what is the upper limit of Band I (extra-low voltage) for AC?",
    options: [
      "12 V",
      "25 V",
      "50 V",
      "120 V"
    ],
    correctIndex: 2,
    explanation: "Band I (extra-low voltage) for AC is defined as not exceeding 50 V AC (or 120 V ripple-free DC) under BS 7671. Above 50 V AC, the voltage is considered sufficient to drive a dangerous current through the human body under normal conditions, which is why 50 V AC is the recognised threshold for danger."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which of the following best describes the mechanism of electric shock?",
    options: [
      "Electricity burns the skin on contact, causing pain",
      "Current flows through the body between two points at different potential, disrupting normal biological function",
      "Voltage causes direct damage to nerve endings",
      "Magnetic fields from the conductor cause tissue heating"
    ],
    correctAnswer: 1,
    explanation: "Electric shock occurs when current flows through the body between two points at different electrical potential. The current disrupts the normal electrical signals in the body — particularly the heart's rhythm and the nervous system — and can cause involuntary muscle contraction, respiratory arrest and ventricular fibrillation."
  },
  {
    id: 2,
    question: "A current of 30 mA AC flowing through the chest for more than a few seconds is most likely to cause:",
    options: [
      "A mild tingling sensation",
      "Muscular pain but no lasting injury",
      "Ventricular fibrillation (cardiac arrest)",
      "Localised skin burns only"
    ],
    correctAnswer: 2,
    explanation: "30 mA AC (50 Hz) flowing through the chest for more than approximately 40 milliseconds can cause ventricular fibrillation — a chaotic, uncoordinated contraction of the heart muscle that is fatal without immediate defibrillation. This is the basis for the 30 mA RCD sensitivity required by BS 7671 for additional protection."
  },
  {
    id: 3,
    question: "The 'hand-to-hand' current pathway is particularly dangerous because:",
    options: [
      "The hands have low skin resistance",
      "The current path crosses the heart",
      "Both hands will be burned",
      "It causes the strongest muscle contraction"
    ],
    correctAnswer: 1,
    explanation: "The hand-to-hand pathway is extremely dangerous because the current flows directly across the chest, passing through the heart. This gives the highest probability of causing ventricular fibrillation. The hand-to-foot pathway also crosses the heart but typically with a slightly lower percentage of current through the cardiac region."
  },
  {
    id: 4,
    question: "Which of the following is NOT a recognised type of electrical burn?",
    options: [
      "Contact burn from touching a live conductor",
      "Arc burn from radiant heat of an electrical arc",
      "Flash burn from the ultraviolet radiation of an arc",
      "Induction burn from proximity to high-frequency conductors"
    ],
    correctAnswer: 3,
    explanation: "The three recognised types of electrical burn are contact burns (current flowing through tissue at the point of contact), arc burns (from the intense radiant heat of an electrical arc), and flash burns (from the ultraviolet and infrared radiation produced by an arc). 'Induction burn' is not a recognised classification of electrical burn injury."
  },
  {
    id: 5,
    question: "According to UK statistics, approximately how many people are killed by electricity at work each year?",
    options: [
      "1-2",
      "5-10",
      "50-60",
      "Over 100"
    ],
    correctAnswer: 1,
    explanation: "HSE statistics show that approximately 5-10 people are killed by electricity at work in the UK each year, with around 1,000 reportable electrical injuries. While the numbers are relatively low compared to other causes, electrical incidents have a very high fatality-to-injury ratio, meaning that when something goes wrong, the consequences are often fatal."
  },
  {
    id: 6,
    question: "An arc flash blast pressure wave can reach forces of:",
    options: [
      "Up to 100 Pa (similar to a strong breeze)",
      "Up to 1,000 Pa (similar to a gust of wind)",
      "Up to 100 kPa (similar to being hit by a car)",
      "Up to 70,000 Pa with forces exceeding 200 kg/m²"
    ],
    correctAnswer: 3,
    explanation: "Arc flash blast waves can generate pressures exceeding 70,000 Pa (approximately 10 psi) with forces that can throw a person across a room, rupture eardrums, and cause serious blunt-force trauma. The rapid expansion of vaporised copper can increase pressure by a factor of 67,000 within milliseconds. This is why arc flash is often more dangerous than the electrical shock itself."
  },
  {
    id: 7,
    question: "Under BS 7671:2018+A3:2024, Band II (low voltage) for AC ranges from:",
    options: [
      "0 V to 50 V",
      "50 V to 600 V",
      "50 V to 1000 V",
      "600 V to 1000 V"
    ],
    correctAnswer: 2,
    explanation: "Band II (low voltage) for AC is defined as exceeding 50 V but not exceeding 1000 V AC (or exceeding 120 V but not exceeding 1500 V ripple-free DC). This covers the standard 230 V single-phase and 400 V three-phase supplies found in most domestic, commercial and industrial installations in the UK."
  },
  {
    id: 8,
    question: "Electrical fires account for approximately what percentage of all fires in the UK?",
    options: [
      "Less than 5%",
      "Approximately 14-20%",
      "Approximately 50%",
      "Over 70%"
    ],
    correctAnswer: 1,
    explanation: "Electrical faults are responsible for approximately 14-20% of all fires in the UK, making electricity one of the most significant causes of fire. Common electrical causes include overloaded circuits, deteriorated insulation, loose connections causing arcing, and faulty appliances. Proper installation, maintenance and periodic inspection are critical fire prevention measures."
  },
  {
    id: 9,
    question: "Which secondary injury is MOST commonly associated with electric shock at height?",
    options: [
      "Hearing loss from arc flash noise",
      "Falls caused by involuntary muscle contraction or startle response",
      "Chemical burns from battery electrolyte",
      "Crush injuries from falling equipment"
    ],
    correctAnswer: 1,
    explanation: "Falls are the most common secondary injury from electric shock. Even a minor shock that causes a startle response or involuntary muscle contraction can cause a person to fall from a ladder, scaffold or roof. Secondary injuries from falls often cause more serious harm than the electrical contact itself, which is why working at height near electrical equipment requires careful risk assessment."
  },
  {
    id: 10,
    question: "At 50 Hz AC, the body is particularly vulnerable because:",
    options: [
      "50 Hz causes maximum skin heating",
      "50 Hz is close to the frequency range that most effectively causes ventricular fibrillation",
      "50 Hz penetrates deeper into the body than higher frequencies",
      "50 Hz causes the strongest sensation of pain"
    ],
    correctAnswer: 1,
    explanation: "The human heart is most vulnerable to frequencies in the range of 15-100 Hz, and 50 Hz falls squarely within this danger zone. At this frequency, the risk of ventricular fibrillation is at its maximum for a given current level. Higher frequencies (above 1 kHz) tend to cause more surface heating but less cardiac disruption, while DC requires roughly 3-4 times the current to cause the same fibrillation risk."
  },
  {
    id: 11,
    question: "The Electricity at Work Regulations 1989 place duties on:",
    options: [
      "Employers only",
      "Employers, self-employed persons and employees — all who may be affected",
      "Electrical contractors only",
      "The Health and Safety Executive"
    ],
    correctAnswer: 1,
    explanation: "The EAWR 1989 place duties on employers, self-employed persons and employees. Regulation 3 makes it clear that duties extend to all persons at work, including employees who must cooperate with their employer and not place themselves or others at risk. This means that as a maintenance technician, you have personal legal duties under the EAWR."
  },
  {
    id: 12,
    question: "Which of the following scenarios presents the HIGHEST immediate risk of fatal electrocution?",
    options: [
      "Touching a 230 V live conductor with dry hands while wearing insulated boots on a dry wooden floor",
      "Touching a 230 V live conductor with wet hands while standing on a damp concrete floor",
      "Working near a 12 V battery in a dry environment",
      "Using a double-insulated power tool on a 230 V supply"
    ],
    correctAnswer: 1,
    explanation: "Wet hands and damp concrete drastically reduce body resistance (from around 100 kΩ dry skin to as low as 1 kΩ wet), while the concrete floor provides a good earth return path. Under these conditions, 230 V could drive a current of 230 mA through the body — far exceeding the 30 mA ventricular fibrillation threshold. This scenario represents a very high risk of fatal electrocution."
  }
];

const faqs = [
  {
    question: "Can 230 V domestic voltage really kill?",
    answer: "Yes. 230 V is more than sufficient to drive a lethal current through the human body, particularly under adverse conditions such as wet skin, damp environments or when the current path crosses the heart. The majority of fatal electrical accidents in the UK involve 230 V supplies. Never underestimate the danger of 'ordinary' mains voltage."
  },
  {
    question: "What is the difference between electrocution and electric shock?",
    answer: "Electric shock is the physiological effect of current flowing through the body — it covers the full range from a mild tingle to fatal injury. Electrocution specifically means death caused by electric shock. The terms are often used interchangeably in casual speech, but technically electrocution always implies a fatal outcome."
  },
  {
    question: "Why does a 30 mA RCD not guarantee safety from electric shock?",
    answer: "A 30 mA RCD will disconnect the supply within 40 ms at 150 mA and within 300 ms at 30 mA. However, ventricular fibrillation can be initiated by 30 mA in as little as 40 ms if the current coincides with the vulnerable period of the cardiac cycle (the T-wave). An RCD significantly reduces the risk but cannot eliminate it entirely — which is why safe isolation and dead working remain the primary controls."
  },
  {
    question: "Is DC more or less dangerous than AC at the same voltage?",
    answer: "At typical power frequencies (50 Hz), AC is generally more dangerous for causing ventricular fibrillation because the alternating current repeatedly stimulates the heart. DC requires approximately 3-4 times the current to cause fibrillation. However, DC causes more severe electrolytic damage to tissue, makes it harder to release a conductor at the point of contact (due to sustained muscle contraction), and DC arcs are harder to extinguish. Neither should be considered safe."
  },
  {
    question: "What should I do if a colleague receives an electric shock?",
    answer: "Do NOT touch the casualty if they are still in contact with the source. Isolate the supply if possible — switch off, remove the plug, or use a non-conducting object to separate the casualty from the source. Call 999 immediately. If the casualty is not breathing or has no pulse, begin CPR and use an AED (automated external defibrillator) if available. Time is critical — brain damage begins within 3-4 minutes of cardiac arrest."
  }
];

const MOETModule1Section2_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 1.2.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Dangers of Electricity
          </h1>
          <p className="text-white/80">
            Understanding the mechanisms, effects and consequences of electrical hazards
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Shock:</strong> Current through body — as little as 30 mA can kill</li>
              <li className="pl-1"><strong>Arc flash:</strong> Up to 20,000 °C plasma, blast pressure, molten metal</li>
              <li className="pl-1"><strong>Burns:</strong> Contact, arc and flash burns — often deep tissue</li>
              <li className="pl-1"><strong>Fire:</strong> 14-20% of UK fires are electrical in origin</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Regulatory Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>EAWR 1989:</strong> Absolute duty to prevent danger from electricity</li>
              <li className="pl-1"><strong>BS 7671:2018+A3:2024:</strong> Voltage bands, protection measures</li>
              <li className="pl-1"><strong>HASAWA 1974:</strong> General duty of care to employees and others</li>
              <li className="pl-1"><strong>ST1426:</strong> Hazard awareness and risk control KSBs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the mechanism of electric shock and current pathways through the body",
              "State the let-go threshold and ventricular fibrillation threshold for AC current",
              "Describe arc flash hazards including temperatures, blast pressure and PPE categories",
              "Identify the three types of electrical burn and their characteristics",
              "Explain how electrical faults cause fires and cite UK statistics",
              "Define voltage bands (ELV, LV, HV) under BS 7671:2018+A3:2024"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 01: Electric Shock Mechanism */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Electric Shock — Mechanism and Effects
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electric shock occurs when current flows through the human body between two points at different
              electrical potential. The body acts as a conductor, and the resulting current disrupts the normal
              electrical signals that control the heart, respiratory system and nervous system. The severity
              of injury depends on four critical factors: the magnitude of current, the duration of exposure,
              the pathway through the body, and the frequency of the supply.
            </p>
            <p>
              It is a common misconception that voltage alone determines danger. While voltage is the driving
              force that pushes current through the body's resistance, it is the current that causes
              physiological damage. Ohm's Law applies: I = V / R. A higher voltage will drive more current
              through the same body resistance, but environmental conditions (wet skin, damp floors, conductive
              footwear) can dramatically reduce body resistance and allow dangerous currents to flow even at
              relatively low voltages.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Body Resistance Values</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Dry skin:</strong> 100,000 Ω (100 kΩ) — this is the primary protective barrier</li>
                <li className="pl-1"><strong>Wet or broken skin:</strong> 1,000 Ω (1 kΩ) — a 100-fold reduction in resistance</li>
                <li className="pl-1"><strong>Internal body (hand to foot):</strong> 300-500 Ω — once skin is breached, the body is highly conductive</li>
                <li className="pl-1"><strong>At 230 V with wet skin:</strong> I = 230 / 1000 = 230 mA — far above the lethal threshold</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Effects of AC Current on the Human Body (50 Hz)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Current (mA)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Effect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Duration Dependency</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0.5-2</td>
                      <td className="border border-white/10 px-3 py-2">Threshold of perception — tingling sensation</td>
                      <td className="border border-white/10 px-3 py-2">Immediate</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2-10</td>
                      <td className="border border-white/10 px-3 py-2">Painful sensation, involuntary muscle contraction begins</td>
                      <td className="border border-white/10 px-3 py-2">Immediate</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">10-15</td>
                      <td className="border border-white/10 px-3 py-2">Let-go threshold — cannot voluntarily release the conductor</td>
                      <td className="border border-white/10 px-3 py-2">Immediate</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">15-30</td>
                      <td className="border border-white/10 px-3 py-2">Muscular contraction, breathing difficulty, possible respiratory arrest</td>
                      <td className="border border-white/10 px-3 py-2">Minutes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">30-50</td>
                      <td className="border border-white/10 px-3 py-2">Ventricular fibrillation likely — potentially fatal</td>
                      <td className="border border-white/10 px-3 py-2">Seconds</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">50-100</td>
                      <td className="border border-white/10 px-3 py-2">Ventricular fibrillation certain, respiratory arrest</td>
                      <td className="border border-white/10 px-3 py-2">Fraction of a second</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">&gt;100</td>
                      <td className="border border-white/10 px-3 py-2">Cardiac arrest, severe burns, tissue destruction</td>
                      <td className="border border-white/10 px-3 py-2">Instantaneous</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Current Pathways Through the Body</p>
              <p className="text-sm text-white mb-3">
                The path that current takes through the body determines which organs are affected. The most
                dangerous pathways are those that cross the heart. IEC 60479-1 provides data on the percentage
                of total current that passes through the heart for different pathways.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Left hand to both feet:</strong> Heart current factor 1.0 (reference) — the benchmark pathway</li>
                <li className="pl-1"><strong>Left hand to right hand:</strong> Heart current factor 0.4 — 40% of current through the heart</li>
                <li className="pl-1"><strong>Right hand to both feet:</strong> Heart current factor 0.8 — still very dangerous</li>
                <li className="pl-1"><strong>Left foot to right foot:</strong> Heart current factor 0.04 — lower risk but still hazardous</li>
                <li className="pl-1"><strong>Both hands to both feet:</strong> Heart current factor 0.7 — common industrial scenario</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">AC vs DC — Key Differences</p>
              <p className="text-sm text-white mb-3">
                The frequency of the supply significantly affects the danger level. At 50 Hz AC (UK mains
                frequency), the risk of ventricular fibrillation is at its maximum for a given current level.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>50 Hz AC:</strong> Most dangerous for cardiac fibrillation — the heart is maximally susceptible in the 15-100 Hz range</li>
                <li className="pl-1"><strong>DC:</strong> Requires 3-4 times more current for fibrillation, but causes sustained muscle lock-on and severe electrolytic tissue damage</li>
                <li className="pl-1"><strong>High frequency (&gt;1 kHz):</strong> Less cardiac risk but increased surface heating (diathermy effect)</li>
                <li className="pl-1"><strong>DC arcs:</strong> More sustained and harder to extinguish than AC arcs — significant in battery and photovoltaic installations</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The 30 mA trip threshold of RCDs used for additional protection under
              BS 7671 is based directly on the ventricular fibrillation threshold. However, an RCD does not
              guarantee survival — it significantly reduces risk by limiting exposure time.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Arc Flash Hazards */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Arc Flash Hazards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              An arc flash is an explosive release of energy caused by an electrical arc between conductors
              or between a conductor and earth. Arc flash events produce extreme temperatures, intense light,
              a pressure wave, molten metal droplets and toxic gases. In many industrial electrical incidents,
              the arc flash causes more severe injuries than the electric shock itself.
            </p>
            <p>
              Arc flash occurs when the air gap between conductors or between a conductor and earth breaks down,
              allowing current to flow through the ionised air (plasma). This can be triggered by equipment
              failure, insulation breakdown, contamination (dust, moisture, vermin), dropped tools, or accidental
              contact during maintenance. The severity depends on the available fault current, the voltage,
              the arc gap distance, and the clearing time of protective devices.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Arc Flash Characteristics</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Temperature:</strong> Up to 20,000 °C at the arc core — four times the surface temperature of the sun</li>
                <li className="pl-1"><strong>Blast pressure:</strong> Exceeding 70 kPa (10 psi) — can throw a person across a room</li>
                <li className="pl-1"><strong>Sound:</strong> Up to 160 dB — can rupture eardrums and cause permanent hearing loss</li>
                <li className="pl-1"><strong>Light:</strong> Intense ultraviolet and infrared radiation — can cause arc eye (photokeratitis) and retinal damage</li>
                <li className="pl-1"><strong>Shrapnel:</strong> Molten copper and aluminium droplets, fragmented equipment and debris</li>
                <li className="pl-1"><strong>Toxic gases:</strong> Vaporised copper, ozone and other toxic by-products</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Arc Flash PPE Categories (IEEE 1584 / NFPA 70E)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Incident Energy (cal/cm²)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Required PPE</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CAT 1</td>
                      <td className="border border-white/10 px-3 py-2">4</td>
                      <td className="border border-white/10 px-3 py-2">Arc-rated shirt and trousers, safety glasses, hearing protection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CAT 2</td>
                      <td className="border border-white/10 px-3 py-2">8</td>
                      <td className="border border-white/10 px-3 py-2">Arc-rated shirt/trousers, face shield, arc-rated balaclava, leather gloves</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CAT 3</td>
                      <td className="border border-white/10 px-3 py-2">25</td>
                      <td className="border border-white/10 px-3 py-2">Arc flash suit with hood, arc-rated gloves, leather boots</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CAT 4</td>
                      <td className="border border-white/10 px-3 py-2">40</td>
                      <td className="border border-white/10 px-3 py-2">Multi-layer arc flash suit, arc-rated hood with face shield, heavy-duty leather gloves and boots</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">ATPV and EBT Ratings</p>
              <p className="text-sm text-white">
                Arc-rated PPE is tested and rated using two measures: <strong>ATPV (Arc Thermal Performance Value)</strong> — the
                incident energy level at which there is a 50% probability of the onset of a second-degree burn through
                the fabric; and <strong>EBT (Energy Breakopen Threshold)</strong> — the incident energy level at which there is a
                50% probability the fabric will break open, exposing skin directly to the arc. The lower of the two
                values determines the arc rating of the garment. Always select PPE with an arc rating that exceeds
                the calculated incident energy for the task.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Factors Affecting Arc Flash Severity</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Available fault current:</strong> Higher fault levels produce more severe arcs</li>
                <li className="pl-1"><strong>Clearing time:</strong> Slower protective devices allow more energy to be released</li>
                <li className="pl-1"><strong>Working distance:</strong> Energy decreases with the square of the distance</li>
                <li className="pl-1"><strong>Arc gap:</strong> The distance between conductors affects the arc characteristics</li>
                <li className="pl-1"><strong>Enclosure:</strong> Enclosed equipment can focus the blast energy towards the worker</li>
                <li className="pl-1"><strong>Voltage:</strong> Higher voltages sustain arcs across larger gaps</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Arc flash risk assessment should be carried out for all switchgear where
              live working or work near live conductors is anticipated. The incident energy calculation determines
              the arc flash boundary (the distance at which incident energy drops to 1.2 cal/cm²) and the
              required PPE category.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 03: Electrical Burns and Fire */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Electrical Burns, Fire and Secondary Injuries
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electrical injuries extend far beyond electric shock. Burns are one of the most common and
              devastating consequences of electrical contact, and electrical faults are a leading cause of
              fire in UK buildings. Understanding the mechanisms of these injuries is essential for
              maintenance technicians who work on energised or recently de-energised systems.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Three Types of Electrical Burn</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Contact burns:</strong> Caused by current flowing through the tissue at the point of contact with a live conductor. These burns are often deep, affecting muscle, nerve and bone tissue below the skin surface. The entry and exit wounds may appear small but mask extensive internal damage — the 'iceberg effect'</li>
                <li className="pl-1"><strong>Arc burns:</strong> Caused by the intense radiant heat from an electrical arc. The temperatures involved (up to 20,000 °C) can cause severe burns at distances of several metres. Arc burns are often full-thickness (third-degree) and may require extensive skin grafting</li>
                <li className="pl-1"><strong>Flash burns:</strong> Caused by the ultraviolet and infrared radiation emitted by an arc. Similar to severe sunburn, flash burns typically affect exposed skin and eyes. 'Arc eye' (photokeratitis) is a painful condition caused by UV exposure to the cornea and can result from even brief exposure to an electrical arc</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical Fires — Causes and Statistics</p>
              <p className="text-sm text-white mb-3">
                Electrical faults are responsible for approximately 14-20% of all fires in UK buildings —
                making electricity one of the most significant causes of fire. Common electrical causes include:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Overloaded circuits:</strong> Excessive current causes conductor and connection heating beyond safe limits</li>
                <li className="pl-1"><strong>Loose connections:</strong> High-resistance joints cause localised heating and arcing — a progressive fault that worsens over time</li>
                <li className="pl-1"><strong>Deteriorated insulation:</strong> Age, heat, UV exposure and mechanical damage degrade insulation, leading to tracking and eventually flashover</li>
                <li className="pl-1"><strong>Arcing faults:</strong> Intermittent arcing at damaged conductors can generate temperatures sufficient to ignite surrounding materials without tripping overcurrent protection</li>
                <li className="pl-1"><strong>Faulty appliances:</strong> Damaged flex, internal faults and inadequate protection cause fires in portable equipment</li>
                <li className="pl-1"><strong>Incorrect fuse or MCB rating:</strong> Oversized protection allows conductors to overheat without tripping</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Secondary Injuries</p>
              <p className="text-sm text-white mb-3">
                Electric shock and arc flash frequently cause secondary injuries that can be more severe
                than the primary electrical injury. Maintenance technicians must consider secondary injury
                risks in their work planning and risk assessments.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Falls from height:</strong> Involuntary muscle contraction or startle response causes falls from ladders, scaffolds and platforms — the most common secondary injury</li>
                <li className="pl-1"><strong>Impact injuries:</strong> Being thrown by an arc flash blast wave, or falling against equipment</li>
                <li className="pl-1"><strong>Hearing damage:</strong> Arc flash generates noise levels up to 160 dB — well above the threshold for permanent hearing damage</li>
                <li className="pl-1"><strong>Eye injuries:</strong> Arc flash UV radiation causes photokeratitis; debris and molten metal can cause direct eye injury</li>
                <li className="pl-1"><strong>Psychological trauma:</strong> Witnessing or experiencing an electrical incident can cause post-traumatic stress disorder (PTSD)</li>
                <li className="pl-1"><strong>Crush injuries:</strong> Contact with moving machinery activated by an electrical fault or short circuit</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">UK Electrical Accident Statistics</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Fatalities:</strong> Approximately 5-10 deaths from electricity at work per year (HSE RIDDOR data)</li>
                <li className="pl-1"><strong>Reportable injuries:</strong> Approximately 1,000 electrical injuries reported to the HSE annually</li>
                <li className="pl-1"><strong>Fatality ratio:</strong> Electrical incidents have one of the highest fatality-to-injury ratios of any workplace hazard</li>
                <li className="pl-1"><strong>Common scenarios:</strong> Contact with overhead power lines, work on 'supposedly dead' circuits, and use of unsuitable equipment are the most frequent causes of fatal incidents</li>
                <li className="pl-1"><strong>Domestic:</strong> Approximately 30-50 deaths from electricity in the home each year, with around 350,000 injuries</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard requires you to identify hazards,
              assess risks and implement appropriate controls. Understanding the full range of electrical dangers
              — not just electric shock — is fundamental to this competence.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Voltage Bands and Maintenance Scenarios */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Voltage Bands and Electrical Maintenance Scenarios
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671:2018+A3:2024 defines voltage bands that categorise electrical installations according
              to the level of danger they present. Understanding these bands is essential for selecting
              appropriate protection measures, PPE and working procedures. The Electricity at Work Regulations
              1989 apply to all voltages, but the level of precaution required increases with voltage.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS 7671 Voltage Bands</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Band</th>
                      <th className="border border-white/10 px-3 py-2 text-left">AC Voltage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">DC Voltage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Common Examples</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Band I (ELV)</td>
                      <td className="border border-white/10 px-3 py-2">Not exceeding 50 V</td>
                      <td className="border border-white/10 px-3 py-2">Not exceeding 120 V</td>
                      <td className="border border-white/10 px-3 py-2">SELV/PELV circuits, telecom, data, fire alarm, LED drivers, control circuits</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Band II (LV)</td>
                      <td className="border border-white/10 px-3 py-2">Exceeding 50 V up to 1000 V</td>
                      <td className="border border-white/10 px-3 py-2">Exceeding 120 V up to 1500 V</td>
                      <td className="border border-white/10 px-3 py-2">230 V single-phase, 400 V three-phase, motor drives, UPS systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">HV</td>
                      <td className="border border-white/10 px-3 py-2">Exceeding 1000 V</td>
                      <td className="border border-white/10 px-3 py-2">Exceeding 1500 V</td>
                      <td className="border border-white/10 px-3 py-2">11 kV distribution, 33 kV ring main, 132 kV transmission, 400 kV grid</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">SELV, PELV and FELV</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>SELV (Separated Extra-Low Voltage):</strong> Extra-low voltage supply from a safety source (e.g., safety isolating transformer) with no earth connection. Provides protection against electric shock without additional measures</li>
                <li className="pl-1"><strong>PELV (Protected Extra-Low Voltage):</strong> Similar to SELV but with an earth connection. Used where earthing is required for functional reasons (e.g., telecommunications)</li>
                <li className="pl-1"><strong>FELV (Functional Extra-Low Voltage):</strong> Extra-low voltage that does NOT meet SELV or PELV requirements (e.g., derived from a non-safety source such as an autotransformer). Requires the same protection measures as the primary circuit</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Maintenance Scenarios — LV</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Working in consumer units and distribution boards</li>
                  <li className="pl-1">Motor control centre (MCC) maintenance</li>
                  <li className="pl-1">Socket outlet and lighting circuit work</li>
                  <li className="pl-1">Variable speed drive (VSD) inspection</li>
                  <li className="pl-1">UPS and battery system maintenance</li>
                  <li className="pl-1">Cable termination and jointing</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Maintenance Scenarios — HV</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">11 kV switchgear maintenance and testing</li>
                  <li className="pl-1">Transformer oil sampling and testing</li>
                  <li className="pl-1">HV cable termination and jointing</li>
                  <li className="pl-1">Protection relay calibration and testing</li>
                  <li className="pl-1">Ring main unit (RMU) switching operations</li>
                  <li className="pl-1">CT and VT inspection and replacement</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Stored Energy Hazards</p>
              <p className="text-sm text-white">
                Even after isolation, significant electrical energy can be stored in capacitors, long cable
                runs, transformers and inductors. Capacitors in variable speed drives can retain a lethal
                charge for several minutes after disconnection. Always follow manufacturer's guidance on
                discharge times and verify with a suitable voltage indicator before touching any internal
                components. UPS batteries present a continuous DC hazard that cannot be simply 'switched off'
                — the battery must be physically disconnected.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Legal Framework — EAWR 1989 Key Regulations</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Reg 3:</strong> Duty on employers and employees — absolute duty to prevent danger</li>
                <li className="pl-1"><strong>Reg 4:</strong> Systems, work activities and protective equipment must be constructed and maintained to prevent danger</li>
                <li className="pl-1"><strong>Reg 12:</strong> Equipment must be made dead before work begins (where reasonably practicable)</li>
                <li className="pl-1"><strong>Reg 13:</strong> Adequate precautions to prevent re-energisation during work</li>
                <li className="pl-1"><strong>Reg 14:</strong> Live working only when unreasonable to work dead, reasonable to work live, and suitable precautions taken</li>
                <li className="pl-1"><strong>Reg 16:</strong> Persons working on electrical systems must be competent or supervised</li>
                <li className="pl-1"><strong>Reg 29:</strong> Defence of 'due diligence' — took all reasonable precautions and exercised all due diligence</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The EAWR 1989 duties under Regulations 4-16 are absolute — there is no
              'so far as is reasonably practicable' qualifier. If danger arises from a failure to comply, it is
              a criminal offence regardless of cost or convenience. Only Regulation 29 provides a defence of
              due diligence.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Key Thresholds (50 Hz AC)</p>
                <ul className="space-y-0.5">
                  <li>0.5 mA — perception threshold</li>
                  <li>10 mA — let-go threshold</li>
                  <li>30 mA — ventricular fibrillation risk (RCD threshold)</li>
                  <li>50 V AC — Band I/II boundary (danger threshold)</li>
                  <li>1000 V AC — LV/HV boundary</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key References</p>
                <ul className="space-y-0.5">
                  <li>EAWR 1989 — Electricity at Work Regulations</li>
                  <li>BS 7671:2018+A3:2024 — IET Wiring Regulations</li>
                  <li>IEC 60479-1 — Effects of current on human body</li>
                  <li>IEEE 1584 — Arc flash hazard calculations</li>
                  <li>ST1426 — Maintenance technician standard</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section2-2">
              Next: Safe Use of Tools
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule1Section2_1;
