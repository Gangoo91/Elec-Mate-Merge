import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Offshore Wind Technology - Renewable Energy Module 3";
const DESCRIPTION = "Explore offshore wind farm technologies, foundation systems, floating platforms, marine installation, and grid integration for UK offshore wind development.";

const quickCheckQuestions = [
  {
    id: "offshore-foundation-type",
    question: "What is the most common foundation type for offshore wind turbines in water depths up to 60m?",
    options: ["Gravity-base foundation", "Jacket foundation", "Monopile foundation", "Floating platform"],
    correctIndex: 2,
    explanation: "Monopile foundations dominate offshore wind with over 80% market share for water depths up to 60m. They are cost-effective, proven technology using large steel piles driven into the seabed."
  },
  {
    id: "offshore-floating-depth",
    question: "At what water depth does floating offshore wind typically become more economical than fixed foundations?",
    options: ["30-40 metres", "50-60 metres", "60-80 metres", "100+ metres"],
    correctIndex: 2,
    explanation: "Floating wind becomes competitive at 60-80m+ water depths where fixed-bottom foundations become prohibitively expensive due to structural requirements and installation challenges."
  },
  {
    id: "offshore-advantage",
    question: "What is a key advantage of offshore wind compared to onshore?",
    options: ["Lower installation costs", "Higher and more consistent wind speeds", "Simpler maintenance", "No environmental considerations"],
    correctIndex: 1,
    explanation: "Offshore wind benefits from 20-40% higher wind speeds than onshore, with lower turbulence due to smooth sea surface, resulting in 40-55% capacity factors compared to 25-35% onshore."
  },
  {
    id: "offshore-transmission",
    question: "Why is HVDC transmission often used for offshore wind farms?",
    options: ["Lower cable costs", "Efficient power transfer over long distances with lower losses", "Simpler installation", "No offshore substation required"],
    correctIndex: 1,
    explanation: "HVDC transmission is preferred for distances over 80km as it has lower losses than HVAC for long subsea cables. It requires converter stations but provides more efficient power transfer to shore."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What are the main foundation types used for offshore wind turbines?",
    options: [
      "Only concrete foundations",
      "Monopile, jacket, gravity-base, and floating foundations",
      "Only floating platforms",
      "Only steel pile foundations"
    ],
    correctAnswer: 1,
    explanation: "Offshore wind uses various foundation types: monopiles for shallow water (up to 60m), jackets for medium depth, gravity-base for hard seabeds, and floating platforms for deep water applications."
  },
  {
    id: 2,
    question: "What typical capacity factor do UK offshore wind farms achieve?",
    options: [
      "20-30%",
      "30-40%",
      "40-55%",
      "60-70%"
    ],
    correctAnswer: 2,
    explanation: "UK offshore wind farms typically achieve 40-55% capacity factors due to consistent, strong offshore winds. Best-in-class sites can exceed 55%, with winter months often reaching 60%+."
  },
  {
    id: 3,
    question: "What is the typical rated capacity of modern offshore wind turbines?",
    options: [
      "3-5 MW",
      "6-8 MW",
      "12-15 MW",
      "20-25 MW"
    ],
    correctAnswer: 2,
    explanation: "Modern offshore wind turbines typically range from 12-15 MW, with the latest generation reaching 14-15MW. Turbines up to 18MW are entering service, with larger designs in development."
  },
  {
    id: 4,
    question: "What are the three main types of floating platform designs?",
    options: [
      "Monopile, jacket, and tripod",
      "Spar, semi-submersible, and tension leg platform (TLP)",
      "Fixed, floating, and hybrid",
      "Steel, concrete, and composite"
    ],
    correctAnswer: 1,
    explanation: "The three main floating concepts are: spar (ballast-stabilised), semi-submersible (buoyancy-stabilised), and tension leg platforms (mooring-stabilised), each suited to different conditions."
  },
  {
    id: 5,
    question: "What is the typical collection voltage for offshore wind farm array cables?",
    options: [
      "11kV",
      "33kV or 66kV",
      "132kV",
      "275kV"
    ],
    correctAnswer: 1,
    explanation: "Offshore wind farms typically use 33kV or increasingly 66kV for array cables connecting turbines to the offshore substation. Higher voltages reduce losses and allow fewer cables."
  },
  {
    id: 6,
    question: "What installation vessel type is primarily used for fixed-bottom turbine installation?",
    options: [
      "Cable laying vessel",
      "Jack-up installation vessel",
      "Heavy lift crane ship",
      "Service operation vessel"
    ],
    correctAnswer: 1,
    explanation: "Jack-up installation vessels are the primary vessels for fixed-bottom turbine installation. They provide stable platforms by raising themselves above the water on extendable legs."
  },
  {
    id: 7,
    question: "What weather limitation typically constrains offshore wind installation?",
    options: [
      "Temperature below 0C",
      "Significant wave height greater than 1.5m",
      "Wind speed below 5 m/s",
      "Visibility less than 1km"
    ],
    correctAnswer: 1,
    explanation: "Significant wave height greater than 1.5m typically prevents heavy lift operations. Wind speeds above 12 m/s also limit crane work. These constraints create seasonal installation windows."
  },
  {
    id: 8,
    question: "What is the purpose of an Offshore Transmission Owner (OFTO)?",
    options: [
      "Turbine manufacturing",
      "Regulated ownership and operation of offshore transmission assets",
      "Wind resource assessment",
      "Marine wildlife protection"
    ],
    correctAnswer: 1,
    explanation: "OFTOs are regulated entities that own and operate offshore transmission assets (substations and export cables) under licence from Ofgem, providing a competitive framework for transmission investment."
  },
  {
    id: 9,
    question: "What environmental protection is required during offshore wind pile driving?",
    options: [
      "No specific protection required",
      "Marine mammal mitigation including soft-start procedures",
      "Only visual monitoring",
      "Pile driving is prohibited"
    ],
    correctAnswer: 1,
    explanation: "Marine mammal mitigation is mandatory during pile driving, including soft-start procedures (gradually increasing hammer energy), acoustic deterrent devices, and marine mammal observers."
  },
  {
    id: 10,
    question: "What is the UK government target for offshore wind capacity by 2030?",
    options: [
      "20 GW",
      "30 GW",
      "40-50 GW",
      "60 GW"
    ],
    correctAnswer: 2,
    explanation: "The UK targets 40-50 GW of offshore wind by 2030, including 5 GW of floating wind. This represents a major expansion from approximately 14 GW installed capacity in 2024."
  }
];

const faqs = [
  {
    question: "At what water depth does floating wind become more cost-effective than fixed foundations?",
    answer: "Floating wind typically becomes competitive at 60-80m+ water depths, where fixed foundations become prohibitively expensive. However, this varies by site conditions - in hard rock seabeds or challenging soil conditions, floating may be viable at shallower depths (50m+)."
  },
  {
    question: "How do maintenance operations differ for offshore wind farms?",
    answer: "Offshore maintenance requires weather windows with wave heights less than 1.5m for boat access or less than 2.5m for helicopter operations. Crew transfer vessels (CTVs) are used for routine maintenance, while heavy-lift vessels are needed for major repairs. This weather dependency significantly increases operational costs and planning complexity."
  },
  {
    question: "What are the main environmental considerations for offshore wind development?",
    answer: "Key environmental impacts include construction noise affecting marine mammals, seabed disturbance during installation, electromagnetic fields from cables affecting fish migration, and potential collision risks for seabirds. However, offshore wind farms can also create artificial reef effects that benefit marine ecosystems."
  },
  {
    question: "How do wind speeds offshore compare to onshore locations?",
    answer: "Offshore wind speeds are typically 20-40% higher than equivalent onshore sites due to lower surface roughness and reduced topographical interference. This, combined with lower turbulence (6-10% vs 15-20% onshore), results in capacity factors of 40-55% offshore compared to 25-35% onshore."
  },
  {
    question: "What are the challenges of grid integration for offshore wind?",
    answer: "Offshore wind requires expensive submarine cables (GBP 1-3M per km) and offshore substations (GBP 100-300M). Long transmission distances cause voltage drops and reactive power requirements. Large offshore wind farms can also cause grid stability issues requiring sophisticated power electronics and grid management systems."
  },
  {
    question: "What role does the UK play in global offshore wind development?",
    answer: "The UK leads global offshore wind deployment with approximately 40% of total installed capacity. UK waters have optimal wind resources, shallow North Sea areas suitable for current technology, and a strong supply chain. The government targets 40-50GW offshore wind by 2030, including 5GW of floating wind."
  }
];

const RenewableEnergyModule3Section5 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
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
            <span>Module 3 Section 5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Offshore Wind Technology
          </h1>
          <p className="text-white/80">
            Advanced offshore systems, floating platforms, and marine installation technologies
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Offshore Advantages</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Wind speeds:</strong> 20-40% higher than onshore</li>
              <li><strong>Capacity factor:</strong> 40-55% typical UK</li>
              <li><strong>Turbine size:</strong> 12-15MW+ modern units</li>
              <li><strong>UK target:</strong> 40-50GW by 2030</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Foundation Types</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Monopile:</strong> Up to 60m depth (80%+ share)</li>
              <li><strong>Jacket:</strong> 40-80m depth</li>
              <li><strong>Floating:</strong> 60m+ depth</li>
              <li><strong>Gravity-base:</strong> Hard seabed sites</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand offshore wind advantages and challenges",
              "Compare fixed-bottom foundation systems",
              "Evaluate floating wind platform technologies",
              "Assess marine installation requirements",
              "Understand offshore transmission and grid integration",
              "Explore UK offshore wind development plans"
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
            Offshore Wind Advantages and Challenges
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Offshore wind represents the next frontier of wind energy development, offering access to stronger, more consistent wind resources and the potential for much larger installations than onshore sites allow.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Offshore Advantages:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Higher wind speeds:</strong> 20-40% higher than equivalent onshore sites</li>
                <li><strong>Lower turbulence:</strong> Smooth sea surface reduces fatigue loads</li>
                <li><strong>Consistent winds:</strong> More stable diurnal and seasonal patterns</li>
                <li><strong>Larger turbines:</strong> No transport constraints allow 15MW+ turbines</li>
                <li><strong>Reduced visual impact:</strong> Located beyond visual horizon from shore</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Offshore Challenges:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Higher costs:</strong> 2-3x onshore costs due to marine environment</li>
                <li><strong>Harsh conditions:</strong> Salt corrosion, wave loading, extreme weather</li>
                <li><strong>Installation complexity:</strong> Specialised vessels and weather windows</li>
                <li><strong>Grid connection:</strong> Expensive submarine cables and offshore substations</li>
                <li><strong>Maintenance access:</strong> Weather-dependent boat/helicopter access</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-white mb-2">Offshore Wind Resource Characteristics:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Wind shear:</strong> Lower (alpha = 0.08-0.12) due to smooth surface</li>
                <li><strong>Capacity factors:</strong> 40-55% typical, &gt;55% at best sites</li>
                <li><strong>Turbulence intensity:</strong> 6-10% typical (vs 15-20% onshore)</li>
                <li><strong>Seasonal patterns:</strong> Winter maxima, summer minima</li>
                <li><strong>Design conditions:</strong> 50-year return period for extreme events</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Fixed-Bottom Foundation Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fixed-bottom foundations dominate current offshore wind deployment, with different designs optimised for specific water depths and seabed conditions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Monopile Foundations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Water depth:</strong> 20-60m optimal range</li>
                <li><strong>Design:</strong> Large diameter steel pile (6-10m) driven into seabed</li>
                <li><strong>Advantages:</strong> Simple design, proven technology, cost-effective</li>
                <li><strong>Installation:</strong> Impact or vibratory piling from jack-up vessels</li>
                <li><strong>Market share:</strong> 80%+ of current offshore wind foundations</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Jacket Foundations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Water depth:</strong> 40-80m typical range</li>
                <li><strong>Design:</strong> Steel lattice structure with multiple piles</li>
                <li><strong>Advantages:</strong> Suitable for harder seabeds, reduced scour</li>
                <li><strong>Complexity:</strong> More complex fabrication and installation</li>
                <li><strong>Applications:</strong> Deeper water and challenging soil conditions</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Gravity-Base Foundations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Design:</strong> Large concrete or steel structure relying on weight</li>
                <li><strong>Seabed requirements:</strong> Hard, flat seabed with good bearing capacity</li>
                <li><strong>Installation:</strong> No piling required, positioned by crane vessels</li>
                <li><strong>Environmental:</strong> Reduced noise during installation</li>
                <li><strong>Limitations:</strong> Suitable sites limited by seabed conditions</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Floating Offshore Wind Technology
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Floating wind technology opens vast deep-water resources, with various platform designs providing stable foundations for large turbines in waters 60m+ deep.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Spar Platforms:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Design principle:</strong> Ballast-stabilised deep-draft cylinder</li>
                <li><strong>Stability:</strong> Low centre of gravity provides inherent stability</li>
                <li><strong>Draft:</strong> 100-150m deep draft for stability</li>
                <li><strong>Advantages:</strong> Simple, proven technology from oil/gas industry</li>
                <li><strong>Limitations:</strong> Requires deep water ports for assembly</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Semi-Submersible Platforms:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Design principle:</strong> Buoyancy-stabilised multi-column platform</li>
                <li><strong>Stability:</strong> Large waterplane area provides restoring forces</li>
                <li><strong>Draft:</strong> 15-30m moderate draft</li>
                <li><strong>Assembly:</strong> Can be assembled in shallower ports</li>
                <li><strong>Motion characteristics:</strong> Higher motion response than spar</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Tension Leg Platforms (TLP):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Design principle:</strong> Mooring-stabilised with vertical tendons</li>
                <li><strong>Stability:</strong> Pre-tensioned moorings provide restoring forces</li>
                <li><strong>Motion:</strong> Very low heave, pitch, and roll motions</li>
                <li><strong>Complexity:</strong> More complex mooring and installation</li>
                <li><strong>Benefits:</strong> Excellent motion performance for turbine operation</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">UK Floating Wind Development</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Target:</strong> 5GW floating capacity by 2030</li>
                <li><strong>ScotWind:</strong> Major leasing round includes floating areas</li>
                <li><strong>Celtic Sea:</strong> Identified for floating wind development</li>
                <li><strong>Innovation:</strong> Offshore Wind Growth Partnership support</li>
                <li><strong>Cost reduction:</strong> Target 50% reduction by 2030</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Marine Installation and Logistics
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Offshore wind installation requires specialised vessels, careful weather planning, and complex logistics coordination to safely install large turbines in marine environments.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Installation Vessels:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Jack-up vessels:</strong> Self-elevating platforms for foundation and turbine installation</li>
                <li><strong>Heavy lift vessels:</strong> Large crane capacity (1000+ tonnes) for components</li>
                <li><strong>Cable laying vessels:</strong> Specialised for submarine cable installation</li>
                <li><strong>Service operation vessels:</strong> Crew transfer and maintenance support</li>
                <li><strong>Floating installation:</strong> Dynamic positioning vessels for floating turbines</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Installation Sequence:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Foundation installation:</strong> Pile driving or gravity-base placement</li>
                <li><strong>Transition piece:</strong> Interface between foundation and turbine</li>
                <li><strong>Turbine assembly:</strong> Tower, nacelle, and rotor installation</li>
                <li><strong>Cable installation:</strong> Array and export cable laying</li>
                <li><strong>Commissioning:</strong> Testing and grid connection</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Weather and Environmental Constraints:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Wind limits:</strong> &lt;12 m/s for crane operations</li>
                <li><strong>Wave limits:</strong> &lt;1.5m significant wave height for lifts</li>
                <li><strong>Seasonal patterns:</strong> Summer installation campaigns preferred</li>
                <li><strong>Marine mammals:</strong> Soft-start procedures and mitigation measures</li>
                <li><strong>Fishing coordination:</strong> Managing interactions with fishing activities</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Grid Integration and Transmission
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Offshore wind requires sophisticated electrical infrastructure including offshore substations and submarine cables to transmit power to shore efficiently and reliably.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Offshore Substations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>AC collection:</strong> 33kV or 66kV turbine outputs collected</li>
                <li><strong>Voltage transformation:</strong> Step-up to 132kV or 275kV for transmission</li>
                <li><strong>HVDC conversion:</strong> AC-DC conversion for long-distance transmission</li>
                <li><strong>Platform design:</strong> Topside modules on jacket or gravity foundations</li>
                <li><strong>Redundancy:</strong> Backup systems for critical electrical equipment</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Submarine Cables:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Array cables:</strong> Inter-turbine connections within wind farm</li>
                <li><strong>Export cables:</strong> High-voltage transmission to shore</li>
                <li><strong>HVAC vs HVDC:</strong> HVDC for distances &gt;80km or large capacity</li>
                <li><strong>Cable protection:</strong> Burial or rock placement for damage prevention</li>
                <li><strong>Repair capability:</strong> Spare cable capacity and repair vessels</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">UK Offshore Grid Development</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>OFTO regime:</strong> Regulated transmission asset ownership</li>
                <li><strong>Offshore coordination:</strong> Integrated offshore network planning</li>
                <li><strong>Interconnection:</strong> Multi-purpose interconnectors with wind farms</li>
                <li><strong>Grid reinforcement:</strong> Onshore network upgrades for offshore capacity</li>
                <li><strong>Holistic Network Design:</strong> National Grid ESO coordination</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Evaluating Offshore Wind Projects</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Consider water depth for foundation type selection and cost implications</li>
                <li>Assess distance to shore for transmission technology choice (HVAC vs HVDC)</li>
                <li>Evaluate port infrastructure for construction and maintenance access</li>
                <li>Review seabed conditions for foundation suitability and cable burial</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Assessing Floating Wind</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Floating becomes competitive at 60-80m+ water depths</li>
                <li>Semi-submersible designs allow shallower port assembly</li>
                <li>Dynamic cables for floating platforms require special design</li>
                <li>Consider station-keeping requirements and mooring system costs</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Underestimating installation costs</strong> - vessels and weather windows are major factors</li>
                <li><strong>Ignoring marine conditions</strong> - wave loading and corrosion affect design life</li>
                <li><strong>Oversimplifying grid connection</strong> - offshore substations add significant cost</li>
                <li><strong>Neglecting maintenance access</strong> - weather constraints affect availability</li>
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
            <Link to="../section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              Complete Module
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default RenewableEnergyModule3Section5;
