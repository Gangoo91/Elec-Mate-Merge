import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Bathrooms and Locations Containing a Bath/Shower - Level 3 Module 6 Section 4.1";
const DESCRIPTION = "Understanding special design requirements for electrical installations in bathrooms and wet locations, including zones, IP ratings, and supplementary bonding under BS 7671.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the primary reason bathrooms require special electrical installation requirements?",
    options: [
      "To save money on installation costs",
      "The combination of water, steam and reduced body resistance creates elevated shock risk",
      "Building regulations require it for aesthetic reasons",
      "To allow more electrical equipment in bathrooms"
    ],
    correctIndex: 1,
    explanation: "Bathrooms are special locations because water and steam reduce skin resistance, wet skin provides better contact with conductive surfaces, and people may be unclothed - all factors that significantly increase the risk of electric shock at lower voltages."
  },
  {
    id: "check-2",
    question: "What are the dimensions of Zone 1 in a bathroom?",
    options: [
      "Within the bath or shower basin",
      "Above the bath/shower to 2.25m height, extending to the fixed showerhead boundary",
      "0.6m horizontally from Zone 1 to 2.25m height",
      "The entire bathroom ceiling area"
    ],
    correctIndex: 1,
    explanation: "Zone 1 extends from the finished floor level to 2.25m height above the floor, bounded by the vertical plane at the edge of the bath or shower basin, or for showers without a basin, 1.2m from the showerhead fixing point."
  },
  {
    id: "check-3",
    question: "What IP rating is required for electrical equipment installed in Zone 1?",
    options: [
      "IPX0 minimum",
      "IPX2 minimum",
      "IPX4 minimum (or IPX5 where water jets may be used)",
      "IP65 mandatory for all equipment"
    ],
    correctIndex: 2,
    explanation: "Equipment in Zone 1 must be at least IPX4 (protection against water splashing from all directions). Where water jets are likely to be used for cleaning, this increases to IPX5. The 'X' means the solid particle rating isn't specifically required."
  },
  {
    id: "check-4",
    question: "Under BS 7671:2018+A2, when is supplementary bonding NOT required in bathrooms?",
    options: [
      "Supplementary bonding is always mandatory in all bathrooms",
      "When all circuits are RCD protected at 30mA or less, and main protective bonding is in place",
      "When the bathroom has no metallic pipework",
      "When the bathroom is on the ground floor"
    ],
    correctIndex: 1,
    explanation: "Regulation 701.415.2 permits omission of supplementary bonding where all final circuits in the location comply with automatic disconnection requirements using 30mA RCDs, AND all extraneous-conductive-parts are connected to the protective bonding."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "According to BS 7671, what is Zone 0 in a bathroom?",
    options: [
      "The area outside the bathroom door",
      "The interior of the bath tub or shower basin where water can collect",
      "The ceiling area above the shower",
      "The area behind the washbasin"
    ],
    correctAnswer: 1,
    explanation: "Zone 0 is the interior of the bath tub or shower basin - essentially where water is intended to collect. Only SELV at 12V AC or 30V DC maximum is permitted here, with the safety source located outside Zones 0, 1 and 2."
  },
  {
    id: 2,
    question: "A client wants to install a standard 13A socket outlet 2.5m from the edge of their shower tray. Is this permitted?",
    options: [
      "No, socket outlets are banned in all bathrooms",
      "Yes, provided it is RCD protected at 30mA - it is outside Zone 2",
      "Only if it is a shaver socket",
      "Only if it has an IP68 rating"
    ],
    correctAnswer: 1,
    explanation: "Zone 2 extends only 0.6m horizontally from Zone 1. At 2.5m from the shower, the socket is outside the zones (provided the room has fixed partition walls defining the bathroom). Socket outlets outside the zones must still be RCD protected at 30mA."
  },
  {
    id: 3,
    question: "What special consideration applies to heating elements embedded in the floor of a bathroom?",
    options: [
      "They are prohibited in all bathroom zones",
      "They may be installed in any zone provided they have an earthed metallic sheath or grid, or are SELV",
      "They can only use 12V supply",
      "They must be controlled from outside the bathroom"
    ],
    correctAnswer: 1,
    explanation: "Regulation 701.753 permits floor heating systems in any zone provided they are covered by an earthed metallic sheath connected to the protective conductor, or have an earthed metallic grid connected to the protective conductor, or are supplied by SELV/PELV."
  },
  {
    id: 4,
    question: "Why is a metal bath considered an extraneous-conductive-part requiring bonding consideration?",
    options: [
      "Because it holds water",
      "Because it could introduce earth potential from building structure into the location",
      "Because it is shiny and conducts heat",
      "Because the regulations specifically name baths as requiring bonding"
    ],
    correctAnswer: 1,
    explanation: "An extraneous-conductive-part is one not forming part of the electrical installation but liable to introduce a potential (generally earth potential). A metal bath connected to metal pipework could introduce a potential difference during a fault elsewhere in the building."
  },
  {
    id: 5,
    question: "What is the maximum disconnection time for a 230V circuit in a bathroom under TN systems?",
    options: [
      "5 seconds",
      "0.4 seconds",
      "0.2 seconds",
      "0.1 seconds"
    ],
    correctAnswer: 1,
    explanation: "The maximum disconnection time of 0.4s applies to all 230V circuits in TN systems as standard (Regulation 411.3.2.2). However, the 30mA RCD requirement for bathroom circuits provides much faster disconnection in most earth fault conditions."
  },
  {
    id: 6,
    question: "A shower pump is to be installed in a cupboard adjacent to but not within the bathroom. What requirements apply?",
    options: [
      "Full bathroom zone requirements apply to the cupboard",
      "The pump must meet IPX4 rating",
      "Standard requirements apply as the cupboard is not within the bathroom location",
      "The pump must be SELV only"
    ],
    correctAnswer: 2,
    explanation: "Equipment located in a separate room/cupboard outside the bathroom is not subject to bathroom zone requirements. However, circuits supplying bathroom equipment still require RCD protection at 30mA, and the pump should be suitable for its environment."
  },
  {
    id: 7,
    question: "What IP rating must luminaires have in Zone 2 of a bathroom?",
    options: [
      "No specific IP requirement",
      "IPX2 minimum",
      "IPX4 minimum",
      "IP65 mandatory"
    ],
    correctAnswer: 2,
    explanation: "Luminaires in Zone 2 must have a minimum rating of IPX4 (same as Zone 1). This protects against water splashing which can occur from shower use even at the Zone 2 distances."
  },
  {
    id: 8,
    question: "Can a washing machine be installed in a bathroom?",
    options: [
      "No, it is prohibited by regulations",
      "Yes, but only if supplied by SELV",
      "Yes, if located outside Zones 0, 1 and 2, with 30mA RCD protection",
      "Only in commercial premises"
    ],
    correctAnswer: 2,
    explanation: "Socket outlets for equipment like washing machines can be installed outside Zone 2 (greater than 0.6m from the edge of Zone 1) provided they have 30mA RCD protection. Many bathrooms are too small for this, which is why washing machines are more commonly in kitchens."
  },
  {
    id: 9,
    question: "The zone above a bath extends to 2.25m. What applies to the area above this height?",
    options: [
      "Zone 3 requirements apply",
      "It becomes Zone 1 if a shower is installed",
      "Standard requirements apply - it is outside the zones",
      "Zone 2 requirements extend upwards indefinitely"
    ],
    correctAnswer: 2,
    explanation: "The zones are bounded at 2.25m height. Above this level, and outside the horizontal zone boundaries, standard installation requirements apply (though circuits still need 30mA RCD protection as they are in the bathroom location)."
  },
  {
    id: 10,
    question: "What type of cable is recommended for circuits in bathroom walls where zone locations may change?",
    options: [
      "Standard PVC twin and earth only",
      "Mineral insulated or cable run in steel conduit providing mechanical protection",
      "Rubber sheathed flex",
      "Coaxial cable"
    ],
    correctAnswer: 1,
    explanation: "Where circuits must pass through zones, mechanical protection using steel conduit or MICC provides long-term reliability. Future bathroom alterations might change zone boundaries, so robust installation methods provide better future-proofing."
  },
  {
    id: 11,
    question: "A hotel is designing bathrooms for guest rooms. What additional considerations apply beyond domestic requirements?",
    options: [
      "No additional requirements - same rules apply",
      "Emergency lighting paths, central switching capability, and higher reliability standards",
      "Only 12V systems are permitted in hotels",
      "Each bathroom requires its own distribution board"
    ],
    correctAnswer: 1,
    explanation: "Commercial bathroom installations must consider emergency escape lighting, fire alarm integration, management controls for maintenance access, and potentially higher reliability requirements. Guest safety and operational needs add complexity to the design."
  },
  {
    id: 12,
    question: "What is the purpose of the equipotential zone created by bathroom bonding?",
    options: [
      "To make the bathroom more efficient for heating",
      "To ensure all simultaneously accessible conductive parts are at the same potential, preventing shock from potential differences",
      "To improve the earth connection for fault protection",
      "To comply with water regulations"
    ],
    correctAnswer: 1,
    explanation: "The equipotential zone ensures that during a fault, all metal parts a person could simultaneously touch remain at approximately the same voltage. This prevents dangerous potential differences that could cause current to flow through the body."
  }
];

const faqs = [
  {
    question: "Do electric showers require their own dedicated circuit?",
    answer: "Yes, electric showers draw substantial current (typically 30-50A for modern units) and require a dedicated radial circuit from the consumer unit. The circuit must be protected by a suitable overcurrent device (often a 40A or 50A MCB) and a 30mA RCD. Cable sizing must account for the route length, grouping, and installation method - commonly 6mm or 10mm twin and earth depending on power rating and circuit length."
  },
  {
    question: "Can I install a TV in my bathroom?",
    answer: "Dedicated bathroom TVs designed for wet locations can be installed, typically in Zone 2 or outside the zones. They must have appropriate IP ratings (IPX4 minimum in Zone 2), be fed by SELV (typically 12V) with the transformer outside the zones, or be specifically designed and tested for bathroom use. Standard domestic TVs are not suitable for any bathroom zone."
  },
  {
    question: "What about extractor fans in bathrooms?",
    answer: "Extractor fans must meet the IP rating requirements for their installed zone (IPX4 for Zones 1 and 2). The switching can be done via a pull-cord within the bathroom or a plate switch outside. Many are wired to operate with the lighting circuit using timer run-on functionality. Fans in Zone 1 positions require Class II (double insulated) construction or connection to the protective conductor if Class I."
  },
  {
    question: "Is underfloor heating safe in bathrooms?",
    answer: "Yes, when correctly installed. Electric underfloor heating in bathrooms must have either: an earthed metallic sheath or covering connected to the circuit protective conductor, an earthed metallic grid above the elements also connected to the CPC, or be supplied by SELV at maximum 12V AC. The heating circuit requires 30mA RCD protection like all bathroom circuits."
  },
  {
    question: "How do I determine if supplementary bonding is required?",
    answer: "Supplementary bonding can be omitted if ALL of the following conditions are met: all circuits in the bathroom have 30mA RCD protection, automatic disconnection times are achieved, and all extraneous-conductive-parts (metal pipes, baths etc.) are connected to main protective bonding. If any doubt exists about the main bonding, or if the installation cannot meet all conditions, install supplementary bonding connections within the bathroom."
  },
  {
    question: "What about en-suite bathrooms attached to bedrooms?",
    answer: "En-suite bathrooms are treated the same as any other bathroom under BS 7671. The zones are measured from the bath or shower location. However, careful attention is needed at the door opening - socket outlets in the bedroom immediately adjacent to the en-suite door may still be outside bathroom zones but consideration of splash risk is sensible."
  }
];

const Level3Module6Section4_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module6-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6.4.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Bathrooms and Locations Containing a Bath/Shower
          </h1>
          <p className="text-white/80">
            Designing safe electrical installations for wet locations under BS 7671 Section 701
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Zone System:</strong> Three zones (0, 1, 2) with different equipment requirements</li>
              <li><strong>RCD Protection:</strong> All bathroom circuits require 30mA RCD protection</li>
              <li><strong>IP Ratings:</strong> IPX4 minimum in Zones 1 and 2; IPX7 in Zone 0</li>
              <li><strong>Bonding:</strong> Supplementary bonding may be omitted if conditions met</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Inadequate IP ratings on bathroom luminaires causing corrosion</li>
              <li><strong>Use:</strong> Always measure zone dimensions from bath/shower edge</li>
              <li><strong>Apply:</strong> Document bonding decisions and RCD protection status</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "The bathroom zone system and boundary dimensions",
              "IP rating requirements for each zone",
              "When supplementary bonding can be omitted",
              "Equipment selection for wet locations",
              "Electric shower circuit design requirements",
              "Special considerations for commercial bathrooms"
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
            Why Bathrooms Are Special Locations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Bathrooms present unique electrical hazards that require specific design measures. The combination of water, steam, reduced clothing, and conductive surfaces creates conditions where electric shock is more likely and more dangerous than in normal dry locations.
            </p>
            <p>
              BS 7671 Section 701 addresses these risks through a zone-based approach. The closer to water sources, the stricter the requirements. This graduated approach allows practical use of electricity in bathrooms whilst maintaining safety margins appropriate to the risk.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-3">Key Risk Factors in Bathrooms:</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-elec-yellow/80 font-medium mb-1">Reduced Body Resistance</p>
                  <p className="text-white/90">Wet skin can have resistance as low as 1,000 ohms compared to 100,000+ ohms when dry. This dramatically increases current flow for any given voltage.</p>
                </div>
                <div>
                  <p className="text-elec-yellow/80 font-medium mb-1">Increased Contact Area</p>
                  <p className="text-white/90">Standing in water or on wet conductive floors provides excellent earth contact, making it easier for current to flow through the body.</p>
                </div>
                <div>
                  <p className="text-elec-yellow/80 font-medium mb-1">Multiple Conductive Surfaces</p>
                  <p className="text-white/90">Metal baths, taps, pipes, radiators and towel rails provide numerous paths for fault currents and potential differences.</p>
                </div>
                <div>
                  <p className="text-elec-yellow/80 font-medium mb-1">Steam and Condensation</p>
                  <p className="text-white/90">Even above the direct water zone, steam deposits moisture on surfaces, potentially bridging insulation and corroding equipment.</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The danger isn't just direct contact with water. A person standing in a bath touching a faulty appliance has near-ideal conditions for a fatal shock - wet skin, bare feet in water, excellent earth contact through pipes.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The Zone System Explained
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 divides bathrooms into three zones based on proximity to water sources. Each zone has specific requirements for what equipment can be installed and what protection levels apply. Understanding these zones is fundamental to bathroom electrical design.
            </p>

            <div className="grid gap-4 my-6">
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <p className="text-sm font-medium text-red-400 mb-2">Zone 0 - Inside the Bath/Shower</p>
                <p className="text-sm text-white mb-2">
                  The interior of the bath tub or shower basin itself - where water is intended to collect during normal use.
                </p>
                <ul className="text-sm text-white/90 space-y-1 ml-4">
                  <li>Only SELV equipment at maximum 12V AC or 30V DC ripple-free</li>
                  <li>Safety source must be located outside Zones 0, 1 and 2</li>
                  <li>Equipment must be rated IPX7 (protected against immersion)</li>
                  <li>Switches and controls generally not permitted</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
                <p className="text-sm font-medium text-orange-400 mb-2">Zone 1 - Immediately Above Bath/Shower</p>
                <p className="text-sm text-white mb-2">
                  From finished floor level to 2.25m height, bounded by the vertical plane at the bath/shower edge (or 1.2m from fixed showerhead if no tray).
                </p>
                <ul className="text-sm text-white/90 space-y-1 ml-4">
                  <li>Minimum IPX4 rating (IPX5 where cleaning jets used)</li>
                  <li>Only fixed, permanently connected equipment</li>
                  <li>Suitable items: showers, SELV luminaires, fixed instantaneous water heaters</li>
                  <li>No socket outlets except SELV or specifically designed shaver units</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                <p className="text-sm font-medium text-yellow-400 mb-2">Zone 2 - Adjacent to Zone 1</p>
                <p className="text-sm text-white mb-2">
                  Extends 0.6m horizontally from the outer edge of Zone 1, also to 2.25m height.
                </p>
                <ul className="text-sm text-white/90 space-y-1 ml-4">
                  <li>Minimum IPX4 rating (same as Zone 1)</li>
                  <li>Shaver supply units to BS EN 61558-2-5 permitted</li>
                  <li>Luminaires, fans and heating appliances permitted with correct ratings</li>
                  <li>All equipment must be fixed and suitably rated</li>
                </ul>
              </div>
            </div>

            <p>
              Beyond Zone 2 (more than 0.6m from Zone 1 boundary), standard installation practices apply within the bathroom - though all circuits must still have 30mA RCD protection and socket outlets should be sited sensibly away from splash zones.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> In a typical bathroom with a 1700mm x 700mm bath against one wall, Zone 1 extends from the bath edge to the ceiling and along the bath length. Zone 2 extends a further 600mm from each exposed edge of Zone 1. A wall-mounted cabinet mirror light positioned 800mm from the bath edge would be in Zone 2 and require IPX4 rating.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            IP Ratings and Equipment Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              IP (Ingress Protection) ratings define how well an enclosure protects against solid objects and water. In bathroom design, the second digit (water protection) is critical. The format IPX4 indicates the solid particle rating is not specified ('X') but water protection level 4 is required.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-3">Water Protection Ratings for Bathroom Zones:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 pr-4 text-white/80">Rating</th>
                      <th className="text-left py-2 pr-4 text-white/80">Protection Level</th>
                      <th className="text-left py-2 text-white/80">Application</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/90">
                    <tr className="border-b border-white/10">
                      <td className="py-2 pr-4 font-mono">IPX4</td>
                      <td className="py-2 pr-4">Splash-proof from all directions</td>
                      <td className="py-2">Minimum for Zones 1 and 2</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 pr-4 font-mono">IPX5</td>
                      <td className="py-2 pr-4">Protected against water jets</td>
                      <td className="py-2">Where cleaning jets may be used</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 pr-4 font-mono">IPX7</td>
                      <td className="py-2 pr-4">Protected against temporary immersion</td>
                      <td className="py-2">Required for Zone 0 equipment</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-mono">IPX8</td>
                      <td className="py-2 pr-4">Protected against continuous immersion</td>
                      <td className="py-2">Underwater lighting applications</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p>
              Equipment selection goes beyond IP ratings. Class II (double insulated) equipment is preferred in zones as it doesn't require a protective conductor connection, eliminating one potential fault path. Where Class I equipment is used, robust protective conductor connections are essential.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-3 rounded bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Suitable Equipment Examples</p>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>Enclosed IPX4+ rated luminaires</li>
                  <li>Sealed fan units with integral motors</li>
                  <li>Shower units designed to BS EN specifications</li>
                  <li>Shaver sockets to BS EN 61558-2-5</li>
                  <li>SELV downlighters with remote transformers</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="text-sm font-medium text-red-400/80 mb-2">Unsuitable Equipment Examples</p>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>Standard domestic light fittings</li>
                  <li>Open ventilation grilles with exposed wiring</li>
                  <li>Socket outlets (except specific exceptions)</li>
                  <li>Plug-in appliances in zones</li>
                  <li>Consumer electronics not rated for wet areas</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> IP ratings address water ingress protection but not necessarily the safety of internal components in damp conditions. Always select equipment specifically designed and tested for bathroom use, not just items with matching IP ratings.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Supplementary Bonding Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Supplementary bonding in bathrooms creates a local equipotential zone by connecting all extraneous-conductive-parts (metal pipes, baths, radiators) to each other and to the circuit protective conductors. This ensures that during a fault, all touchable metal parts rise to approximately the same voltage, preventing dangerous potential differences.
            </p>

            <p>
              The 18th Edition and Amendment 2 modified these requirements. Regulation 701.415.2 now permits supplementary bonding to be omitted where all final circuits in the location meet specific conditions - a significant change from previous editions that mandated supplementary bonding in all bathrooms.
            </p>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">Conditions for Omitting Supplementary Bonding:</p>
              <ul className="text-sm text-white/90 space-y-2 ml-4">
                <li><strong>Condition 1:</strong> All circuits supplying the bathroom have 30mA RCD protection</li>
                <li><strong>Condition 2:</strong> Automatic disconnection times per Section 411 are achieved</li>
                <li><strong>Condition 3:</strong> All extraneous-conductive-parts are connected to the main protective bonding</li>
              </ul>
            </div>

            <p>
              Where these conditions cannot be confirmed - particularly the main bonding status in older properties - supplementary bonding should be installed. When in doubt, bond. The cost of bonding conductors is minimal compared to the potential consequences of an uncontrolled fault.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Supplementary Bonding Conductor Sizing:</p>
              <ul className="text-sm text-white/90 space-y-1 ml-4">
                <li>Between extraneous-conductive-parts: minimum 4mm<sup>2</sup></li>
                <li>To circuit protective conductors: at least equal to the smallest CPC of circuits in the location (minimum 2.5mm<sup>2</sup> if mechanically protected)</li>
                <li>Connections must be accessible for inspection and testing where practicable</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> In a bathroom with copper pipes, metal bath, and towel radiator, supplementary bonding (if required) would connect: incoming water pipe, bath waste connection, radiator pipework, and these to the circuit protective conductor of the bathroom lighting or shower circuit. Use 4mm<sup>2</sup> earth cable with suitable clamps for pipe connections.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Electric Shower Circuit Design</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Determine shower unit power rating (7.5kW to 10.8kW typical for modern units)</li>
                <li>Calculate design current: I = P / V (e.g., 10.5kW / 230V = 45.6A)</li>
                <li>Select cable size accounting for route length, grouping, insulation contact, and ambient temperature</li>
                <li>Typical cables: 10mm<sup>2</sup> for units up to 9.5kW, verify for longer runs</li>
                <li>Provide double-pole isolator accessible from outside the bathroom</li>
                <li>Ensure 30mA RCD protection at the consumer unit</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Lighting Circuit Considerations</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Select luminaires with appropriate IP ratings for their zone locations</li>
                <li>Consider GU10 or integrated LED downlighters with sealed bezels</li>
                <li>For ceiling luminaires above baths, ensure IPX4 minimum even if outside zones by height</li>
                <li>Pull-cord switches within zones must be insulated and non-metallic</li>
                <li>Plate switches must be located outside the bathroom or in zone 2 minimum (3m from Zone 1)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Wrong IP ratings</strong> - Using IPX2 luminaires in zones requiring IPX4</li>
                <li><strong>Zone measurement errors</strong> - Measuring from wall not bath edge, forgetting 2.25m height limit</li>
                <li><strong>Omitting RCD protection</strong> - All bathroom circuits need 30mA RCDs, not just shower</li>
                <li><strong>Inadequate bonding assessment</strong> - Assuming supplementary bonding not needed without verifying conditions</li>
                <li><strong>Socket outlet placement</strong> - Installing sockets within Zone 2 boundaries</li>
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

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Zone Requirements Summary</p>
                <ul className="space-y-0.5">
                  <li>Zone 0: SELV max 12V, IPX7, inside basin</li>
                  <li>Zone 1: IPX4, fixed equipment only, to 2.25m</li>
                  <li>Zone 2: IPX4, 0.6m from Zone 1, to 2.25m</li>
                  <li>Outside zones: 30mA RCD still required</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key BS 7671 References</p>
                <ul className="space-y-0.5">
                  <li>Section 701 - Bathroom requirements</li>
                  <li>Regulation 701.415.2 - Bonding</li>
                  <li>Regulation 701.512.3 - Equipment selection</li>
                  <li>Appendix A - IP rating definitions</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module6-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 4
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module6-section4-4-2">
              Next: Outdoor Installations
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module6Section4_1;
