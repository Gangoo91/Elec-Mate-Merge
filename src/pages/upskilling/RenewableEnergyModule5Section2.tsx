import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Air Source Heat Pumps - Renewable Energy Module 5";
const DESCRIPTION = "Learn about air source heat pump types, installation requirements, performance characteristics, and UK-specific considerations for ASHP systems.";

const quickCheckQuestions = [
  {
    id: "ashp-type-difference",
    question: "What is the main difference between air-to-water and air-to-air heat pumps?",
    options: ["Installation location", "Air-to-water heats water for radiators/UFH, air-to-air heats room air directly", "Efficiency rating", "Refrigerant type"],
    correctIndex: 1,
    explanation: "Air-to-water heat pumps heat water for use with radiators, underfloor heating, or hot water cylinders. Air-to-air systems heat room air directly via indoor fan coil units, like reversible air conditioning."
  },
  {
    id: "ashp-location",
    question: "What is the most important consideration for ASHP outdoor unit placement?",
    options: ["Aesthetic appearance", "Adequate airflow and noise considerations for neighbours", "Maximum sun exposure", "Minimum cable length"],
    correctIndex: 1,
    explanation: "Outdoor unit placement must ensure adequate airflow (not enclosed or blocked), consider noise impact on neighbours (1m from boundary), and allow for defrost water drainage."
  },
  {
    id: "ashp-defrost",
    question: "When does an ASHP typically need to defrost?",
    options: ["Only in sub-zero temperatures", "When outdoor humidity is high and temperature is 0-7C", "Only at night", "Never with modern units"],
    correctIndex: 1,
    explanation: "Defrost is most needed when humidity is high and temperatures are 0-7C, as moisture condenses and freezes on the evaporator coil. Sub-zero dry air causes less frosting than mild damp conditions."
  },
  {
    id: "ashp-sizing",
    question: "What happens if an ASHP is significantly oversized for the building?",
    options: ["Better efficiency", "Faster heating response", "Short cycling, reduced efficiency, and increased wear", "Lower running costs"],
    correctIndex: 2,
    explanation: "Oversized heat pumps short cycle (frequent on/off), reducing efficiency and increasing compressor wear. Variable speed units help but cannot compensate for significant oversizing."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the typical SCOP range for modern ASHPs in UK climate?",
    options: [
      "1.5-2.0",
      "2.8-4.0",
      "5.0-6.0",
      "7.0-8.0"
    ],
    correctAnswer: 1,
    explanation: "Modern ASHPs typically achieve SCOP of 2.8-4.0 in UK climate conditions, meaning they deliver 2.8-4.0 units of heat for every unit of electricity consumed over the heating season."
  },
  {
    id: 2,
    question: "What electrical supply is typically required for domestic ASHPs?",
    options: [
      "13A plug socket",
      "Single-phase 32A or three-phase supply",
      "Three-phase only",
      "Low voltage DC supply"
    ],
    correctAnswer: 1,
    explanation: "Most domestic ASHPs (up to 12kW) require a single-phase 32A supply. Larger units may need three-phase. Always verify supply capacity during survey."
  },
  {
    id: 3,
    question: "What is the minimum recommended distance from property boundary for ASHP?",
    options: [
      "No minimum",
      "1 metre under permitted development rules",
      "5 metres",
      "10 metres"
    ],
    correctAnswer: 1,
    explanation: "Under permitted development, ASHP outdoor units must be at least 1 metre from property boundary. Planning permission may be required if this cannot be achieved."
  },
  {
    id: 4,
    question: "How does ambient temperature affect ASHP capacity?",
    options: [
      "No effect",
      "Capacity reduces as ambient temperature drops",
      "Capacity increases in cold weather",
      "Only affects efficiency, not capacity"
    ],
    correctAnswer: 1,
    explanation: "ASHP capacity reduces as ambient temperature drops because less heat is available in colder air. A unit rated 10kW at A7 might deliver only 7kW at A-7."
  },
  {
    id: 5,
    question: "What is the purpose of a buffer tank in ASHP systems?",
    options: [
      "Hot water storage only",
      "Prevents short cycling and provides system water volume",
      "Backup heating",
      "Noise reduction"
    ],
    correctAnswer: 1,
    explanation: "Buffer tanks add thermal mass to prevent short cycling in low load conditions, ensure minimum flow rates, and improve defrost recovery. Size typically 20-50 litres."
  },
  {
    id: 6,
    question: "What noise level limit applies to ASHPs under permitted development?",
    options: [
      "No limit",
      "42 dB(A) at 1m from neighbour's window",
      "60 dB(A) at the unit",
      "35 dB(A) at property boundary"
    ],
    correctAnswer: 1,
    explanation: "Under MCS planning standards, ASHP noise must not exceed 42 dB(A) at 1 metre from the nearest part of a neighbouring property's habitable room window."
  },
  {
    id: 7,
    question: "Why is monobloc ASHP generally preferred over split systems in UK?",
    options: [
      "Higher efficiency",
      "Lower cost",
      "All refrigerant work at factory, simpler installation",
      "Better noise performance"
    ],
    correctAnswer: 2,
    explanation: "Monobloc units contain all refrigerant circuit in the outdoor unit, requiring only water connections indoors. This avoids F-Gas regulations for on-site refrigerant work."
  },
  {
    id: 8,
    question: "What is the maximum flow temperature for optimal ASHP efficiency?",
    options: [
      "65-75C",
      "55-60C",
      "35-45C",
      "25-30C"
    ],
    correctAnswer: 2,
    explanation: "ASHPs operate most efficiently at flow temperatures of 35-45C. Higher temperatures require more compressor work and reduce COP significantly."
  },
  {
    id: 9,
    question: "What weather compensation control does for ASHPs?",
    options: [
      "Increases output in cold weather",
      "Adjusts flow temperature based on outdoor temperature",
      "Controls defrost timing",
      "Manages fan speed"
    ],
    correctAnswer: 1,
    explanation: "Weather compensation automatically adjusts flow temperature based on outdoor temperature - higher flow temps in cold weather, lower when mild. This optimises efficiency and comfort."
  },
  {
    id: 10,
    question: "What is the typical condensate drainage requirement for ASHP outdoor units?",
    options: [
      "No drainage required",
      "Provision for defrost water drainage away from unit and walkways",
      "Connection to soil stack",
      "Pumped drainage only"
    ],
    correctAnswer: 1,
    explanation: "ASHPs produce significant defrost water (several litres per day in cold weather). Drainage must direct water away from the unit base and prevent ice formation on walkways."
  }
];

const faqs = [
  {
    question: "How noisy are modern ASHPs?",
    answer: "Modern units typically operate at 40-55 dB(A) at 1 metre, similar to a quiet conversation. Night mode reduces to 35-45 dB(A). Noise reduces with distance - at 5m it's typically background level. Proper placement and acoustic barriers can further reduce impact."
  },
  {
    question: "Can ASHPs provide hot water as well as heating?",
    answer: "Yes, most air-to-water ASHPs include domestic hot water capability via a separate cylinder coil or integrated tank. Hot water requires higher temperatures (50-55C) so efficiency is lower than space heating. Legionella control requires periodic 60C temperature."
  },
  {
    question: "Do ASHPs work with existing radiators?",
    answer: "Often yes, but radiators may need upsizing by 50-100% due to lower flow temperatures. Calculate heat output at 45C flow vs 70C original. Some rooms may need additional or replacement radiators. Underfloor heating is ideal for heat pumps."
  },
  {
    question: "What maintenance does an ASHP require?",
    answer: "Annual maintenance includes filter cleaning, checking refrigerant pressures, verifying defrost operation, inspecting electrical connections, and checking system pressures. The outdoor unit should be kept clear of debris and vegetation."
  },
  {
    question: "Is planning permission required for ASHP installation?",
    answer: "Most domestic installations qualify for permitted development if they meet conditions: 1m from boundary, noise limits met, volume less than 0.6m cubed, only one unit per property. Listed buildings, conservation areas, and flats may require permission."
  },
  {
    question: "How does ASHP running cost compare to gas boilers?",
    answer: "At typical electricity/gas prices and SCOP 3.0, ASHP running costs are similar to or slightly higher than gas. With time-of-use tariffs or solar self-consumption, ASHPs can be cheaper. Carbon emissions are typically 50-70% lower than gas."
  }
];

const RenewableEnergyModule5Section2 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/renewable-energy-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5 Section 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Air Source Heat Pumps
          </h1>
          <p className="text-white/80">
            ASHP types, installation requirements, and UK-specific considerations
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">ASHP Types</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Air-to-water:</strong> Heats water for wet systems</li>
              <li><strong>Air-to-air:</strong> Direct room heating/cooling</li>
              <li><strong>Monobloc:</strong> All-in-one outdoor unit</li>
              <li><strong>Split:</strong> Indoor and outdoor units</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">UK Requirements</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Noise:</strong> 42dB at neighbour window</li>
              <li><strong>Distance:</strong> 1m from boundary</li>
              <li><strong>Supply:</strong> Typically 32A single-phase</li>
              <li><strong>SCOP:</strong> 2.8-4.0 typical UK climate</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Compare ASHP types and configurations",
              "Apply UK installation requirements",
              "Assess site suitability for ASHP",
              "Understand defrost and cold weather operation",
              "Size systems for UK heating loads",
              "Address noise and planning considerations"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            ASHP Types and Configurations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Air source heat pumps come in various configurations suited to different applications, building types, and installation constraints.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Air-to-Water Heat Pumps:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Output:</strong> Heated water for hydronic systems</li>
                <li><strong>Applications:</strong> Radiators, underfloor heating, hot water</li>
                <li><strong>Flow temps:</strong> 35-55C typical, up to 65C some models</li>
                <li><strong>Integration:</strong> Replaces or supplements boiler</li>
                <li><strong>Dominance:</strong> Most common type in UK residential</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Air-to-Air Heat Pumps:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Output:</strong> Conditioned air directly to rooms</li>
                <li><strong>Applications:</strong> Heating and cooling (reversible)</li>
                <li><strong>Configuration:</strong> Single-split or multi-split systems</li>
                <li><strong>Hot water:</strong> Separate system required</li>
                <li><strong>Common use:</strong> Offices, retail, supplementary heating</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Monobloc vs Split Systems:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Monobloc:</strong> Complete refrigerant circuit in outdoor unit</li>
                <li><strong>Monobloc advantage:</strong> No F-Gas work on site</li>
                <li><strong>Split:</strong> Refrigerant piping between indoor/outdoor units</li>
                <li><strong>Split advantage:</strong> Greater installation flexibility</li>
                <li><strong>UK trend:</strong> Monobloc preferred for simplicity</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Installation Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Successful ASHP installation requires careful attention to siting, electrical supply, hydraulic integration, and regulatory compliance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Outdoor Unit Siting:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Airflow:</strong> Minimum clearances per manufacturer</li>
                <li><strong>Noise:</strong> Distance from neighbours, sleeping areas</li>
                <li><strong>Access:</strong> Space for maintenance and servicing</li>
                <li><strong>Drainage:</strong> Provision for defrost water</li>
                <li><strong>Foundation:</strong> Level base, vibration isolation</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Electrical Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Supply assessment:</strong> Check existing capacity</li>
                <li><strong>Typical domestic:</strong> 32A single-phase for up to 12kW</li>
                <li><strong>Larger systems:</strong> May need three-phase or upgrade</li>
                <li><strong>Protection:</strong> Type C MCB, appropriate RCD</li>
                <li><strong>Wiring:</strong> Adequately sized for full load current</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-white mb-2">Planning Conditions (Permitted Development):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Distance:</strong> 1m minimum from property boundary</li>
                <li><strong>Noise:</strong> 42dB(A) at neighbour habitable window</li>
                <li><strong>Volume:</strong> Maximum 0.6m3 per unit</li>
                <li><strong>Quantity:</strong> Only one installation per property</li>
                <li><strong>Location:</strong> Not on pitched roof fronting highway</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Cold Weather Operation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding cold weather operation, defrost cycles, and capacity variation is essential for setting realistic performance expectations and system sizing.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Defrost Operation:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Trigger:</strong> Ice accumulation detected on evaporator</li>
                <li><strong>Method:</strong> Reverse cycle - hot gas melts ice</li>
                <li><strong>Duration:</strong> 2-10 minutes typically</li>
                <li><strong>Frequency:</strong> Every 30-90 minutes in cold damp weather</li>
                <li><strong>Impact:</strong> Temporarily reduces heating output</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Capacity Variation:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>A7W35:</strong> Rated capacity at 7C ambient</li>
                <li><strong>A2W35:</strong> Typically 85-90% of rated capacity</li>
                <li><strong>A-7W35:</strong> Typically 65-75% of rated capacity</li>
                <li><strong>Design point:</strong> Size for coldest expected conditions</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">COP Variation with Temperature:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>A7W35:</strong> COP 4.0-5.0 typical</li>
                <li><strong>A2W35:</strong> COP 3.5-4.5 typical</li>
                <li><strong>A-7W35:</strong> COP 2.5-3.5 typical</li>
                <li><strong>A7W55:</strong> COP 2.5-3.5 (higher flow temp)</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            System Sizing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Accurate sizing balances heating demand with equipment capacity, avoiding both undersizing (inadequate heating) and oversizing (inefficiency and short cycling).
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Heat Loss Calculation:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Room-by-room:</strong> Calculate individual room heat losses</li>
                <li><strong>Fabric losses:</strong> Walls, floor, roof, windows, doors</li>
                <li><strong>Ventilation:</strong> Air change heat losses</li>
                <li><strong>Design temperature:</strong> -3C external, 21C internal typical</li>
                <li><strong>Total:</strong> Sum of all losses = design heat load</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Sizing Considerations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Match capacity:</strong> To calculated heat loss at design conditions</li>
                <li><strong>Avoid oversizing:</strong> Maximum 10-20% above calculated</li>
                <li><strong>Hot water:</strong> Add allowance if ASHP provides DHW</li>
                <li><strong>Variable speed:</strong> Better handles partial loads</li>
                <li><strong>Backup:</strong> Consider immersion or boiler backup strategy</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">UK Domestic Sizing Guide</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Well-insulated:</strong> 40-60 W/m2 floor area</li>
                <li><strong>Average insulation:</strong> 60-80 W/m2 floor area</li>
                <li><strong>Poor insulation:</strong> 80-120 W/m2 floor area</li>
                <li><strong>Example:</strong> 150m2 average = 9-12 kW heat pump</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Noise Management
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Noise is often the most significant planning and neighbour relations consideration for ASHP installations, requiring careful assessment and mitigation strategies.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Noise Sources:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Compressor:</strong> Main noise source, varies with load</li>
                <li><strong>Fan:</strong> Air movement noise, increases with speed</li>
                <li><strong>Defrost:</strong> Can be louder during cycle change</li>
                <li><strong>Vibration:</strong> Structure-borne through mounting</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Noise Assessment:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>MCS 020:</strong> Planning standard noise assessment method</li>
                <li><strong>Sound power:</strong> Manufacturer specification (LWA)</li>
                <li><strong>Distance decay:</strong> 6dB reduction per doubling of distance</li>
                <li><strong>Barriers:</strong> Solid barriers can reduce by 5-10dB</li>
                <li><strong>Limit:</strong> 42dB(A) at neighbour window</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Mitigation Strategies:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Distance:</strong> Maximise distance from sensitive locations</li>
                <li><strong>Quiet mode:</strong> Use night/quiet mode settings</li>
                <li><strong>Barriers:</strong> Acoustic enclosures or solid walls</li>
                <li><strong>Mounting:</strong> Anti-vibration mounts on base</li>
                <li><strong>Product selection:</strong> Choose quieter models</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Surveying for ASHP</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Assess outdoor unit location options and constraints</li>
                <li>Measure distances to boundaries and neighbour windows</li>
                <li>Check electrical supply capacity and upgrade requirements</li>
                <li>Evaluate existing heating system compatibility</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Installing</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Follow manufacturer installation instructions precisely</li>
                <li>Ensure adequate clearances for airflow</li>
                <li>Install proper condensate drainage</li>
                <li>Use anti-vibration mounts on base</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Poor location</strong> - restricted airflow or noise complaints</li>
                <li><strong>Oversizing</strong> - causes short cycling and inefficiency</li>
                <li><strong>High flow temps</strong> - negates efficiency benefits</li>
                <li><strong>Ignoring drainage</strong> - ice hazards from defrost water</li>
              </ul>
            </div>
          </div>
        </section>

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

        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default RenewableEnergyModule5Section2;
