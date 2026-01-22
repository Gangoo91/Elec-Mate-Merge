import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Outdoor Installations and External Influences - Level 3 Module 6 Section 4.2";
const DESCRIPTION = "Comprehensive guide to designing outdoor electrical installations including IP ratings, UV protection, weatherproofing, and environmental considerations under BS 7671.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What does the first digit in an IP rating (e.g., IP65) represent?",
    options: [
      "Water ingress protection level",
      "Solid particle and dust protection level",
      "UV resistance rating",
      "Temperature resistance level"
    ],
    correctIndex: 1,
    explanation: "The first digit (0-6) indicates protection against solid objects and dust. IP6X means dust-tight (no ingress of dust). The second digit (0-9) indicates water protection level. IP65 therefore means dust-tight and protected against water jets."
  },
  {
    id: "check-2",
    question: "Why must outdoor cables be UV resistant or protected from direct sunlight?",
    options: [
      "UV light causes cables to change colour which looks unprofessional",
      "UV radiation degrades PVC and other plastics, causing brittleness and insulation failure over time",
      "UV light makes cables too hot to touch",
      "Building regulations require all outdoor cables to be black"
    ],
    correctIndex: 1,
    explanation: "Ultraviolet radiation breaks down polymer chains in PVC and other cable sheaths, causing them to become brittle, crack, and eventually fail. This exposes conductors to moisture and creates shock and fire hazards. Black PVC or LSF cables have better UV resistance, or cables should be run in conduit."
  },
  {
    id: "check-3",
    question: "What additional protection is required for socket outlets installed outdoors?",
    options: [
      "No additional protection - standard domestic sockets are acceptable",
      "30mA RCD protection and a minimum IP rating of IP44 when the socket lid is closed",
      "Only Type C MCB protection",
      "The socket must be made of stainless steel"
    ],
    correctIndex: 1,
    explanation: "Outdoor socket outlets must have 30mA RCD protection (Regulation 411.3.3) and meet IP44 minimum when closed. Many outdoor sockets achieve higher ratings. When in use with a plug inserted, IP protection is typically reduced, which is why RCD protection is critical."
  },
  {
    id: "check-4",
    question: "What is the purpose of drip loops and cable entry positions on outdoor equipment?",
    options: [
      "To make the installation look professional",
      "To prevent water tracking along cables into enclosures",
      "To allow easier cable pulling during installation",
      "To reduce voltage drop"
    ],
    correctIndex: 1,
    explanation: "Drip loops create a low point in the cable run before it enters an enclosure, so water runs off rather than following the cable sheath into the equipment. Cable entries should be at the bottom of enclosures where possible, with glands providing both mechanical retention and water sealing."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "An external light fitting is to be installed at 2.5m height on a house wall. What minimum IP rating is typically required?",
    options: [
      "IP20 - basic protection",
      "IP44 - splash proof",
      "IP65 - dust-tight and jet-proof",
      "IP68 - immersion rated"
    ],
    correctAnswer: 1,
    explanation: "For general outdoor use where driving rain and splashing water are expected, IP44 is typically the minimum. Higher ratings (IP65) are preferable and often specified. The specific location and exposure level should guide the final selection."
  },
  {
    id: 2,
    question: "What BS 7671 classification system describes environmental conditions affecting installations?",
    options: [
      "IP classification",
      "External influences classification (Appendix 5)",
      "Cable current ratings",
      "Protection device characteristics"
    ],
    correctAnswer: 1,
    explanation: "Appendix 5 of BS 7671 provides the external influences classification using a three-character code. The first letter indicates the environment category (A-ambient, B-utilisation, C-building structure), the second indicates the specific influence, and the number indicates severity."
  },
  {
    id: 3,
    question: "Why is steel wire armoured (SWA) cable commonly specified for outdoor underground installations?",
    options: [
      "It is the cheapest cable type available",
      "It provides mechanical protection, can be directly buried, and the armour can serve as the CPC",
      "It has better current carrying capacity than other cables",
      "Building regulations mandate its use"
    ],
    correctAnswer: 1,
    explanation: "SWA cable's steel wire armour provides excellent mechanical protection for direct burial, resistance to impact and rodent damage, and can serve as the circuit protective conductor (though a separate CPC is often included). It's suitable for outdoor and underground applications without additional conduit."
  },
  {
    id: 4,
    question: "At what minimum depth should cables be buried when installed directly in the ground?",
    options: [
      "150mm below surface",
      "450mm minimum (500mm in roads/driveways)",
      "1 metre in all locations",
      "Depth is not regulated - any depth is acceptable"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 requires minimum 450mm depth in private locations (600mm recommended) and 500mm under vehicular areas. This provides protection from normal gardening activities and light loads. Cable route markers or warning tape should be installed above the cable."
  },
  {
    id: 5,
    question: "What consideration applies to cable current ratings for outdoor installations in direct sunlight?",
    options: [
      "Cables in sunlight have increased capacity due to lower resistance",
      "Solar radiation can significantly increase ambient temperature, requiring derating",
      "Sunlight has no effect on cable ratings",
      "Only affects cables installed horizontally"
    ],
    correctAnswer: 1,
    explanation: "Direct sunlight can raise cable surface temperature significantly above ambient air temperature. This must be considered in the cable sizing calculation - effectively treating the installation as having a higher ambient temperature. Black surfaces absorb more heat than white."
  },
  {
    id: 6,
    question: "What does external influence classification 'AD4' indicate?",
    options: [
      "High ambient temperature",
      "Presence of water - splashing water",
      "Presence of corrosive substances",
      "High altitude location"
    ],
    correctAnswer: 1,
    explanation: "The 'AD' prefix indicates water presence (A=environment, D=water). AD4 specifically means 'splashing water' - equivalent to IPX4 protection requirements. This classification helps designers select appropriate equipment ratings for the conditions."
  },
  {
    id: 7,
    question: "Why should stainless steel or hot-dip galvanised fixings be used for outdoor electrical installations?",
    options: [
      "They look more professional than standard fixings",
      "Standard steel fixings corrode in outdoor conditions, potentially causing equipment to fall and creating electrical faults",
      "They are required by building control",
      "They are easier to install"
    ],
    correctAnswer: 1,
    explanation: "Standard zinc-plated fixings corrode quickly outdoors, especially in coastal or industrial areas. Corroded fixings can fail, allowing equipment to fall, and rust can track into enclosures. Stainless steel (A2 or A4 grade) or hot-dip galvanised fixings provide long-term durability."
  },
  {
    id: 8,
    question: "A garden lighting circuit uses 12V LED fittings. Is RCD protection still required?",
    options: [
      "No - SELV circuits do not require RCD protection",
      "Yes - all outdoor circuits require 30mA RCD protection for the 230V supply to the transformer",
      "Only if the transformer is installed outdoors",
      "Only if the cable exceeds 30 metres"
    ],
    correctAnswer: 1,
    explanation: "While the SELV circuit itself doesn't require RCD protection, the 230V supply feeding the transformer must have 30mA RCD protection as it's an outdoor installation. The transformer provides the separation, but the mains supply side remains a standard outdoor circuit."
  },
  {
    id: 9,
    question: "What special consideration applies to outdoor installations in coastal locations?",
    options: [
      "Higher wind loading only",
      "Increased corrosion from salt-laden air requiring higher grade materials and finishes",
      "Reduced lightning protection requirements",
      "Lower IP ratings are acceptable"
    ],
    correctAnswer: 1,
    explanation: "Coastal installations face accelerated corrosion from salt spray and salt-laden air. This requires stainless steel (marine grade A4/316), special anti-corrosion finishes, sealed enclosures, and potentially more frequent maintenance schedules. Standard galvanised or aluminium components may fail prematurely."
  },
  {
    id: 10,
    question: "How does ambient temperature affect cable installation in outdoor locations?",
    options: [
      "It only affects cables in conduit",
      "Cable current ratings must be adjusted using correction factors for temperatures different from the standard 30 degrees C reference",
      "It only matters below freezing",
      "Modern cables are unaffected by temperature"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 cable ratings are based on 30 degrees C ambient. Higher temperatures require derating (lower current capacity); lower temperatures allow increased ratings. Outdoor installations must consider seasonal extremes and localised heating from solar gain."
  },
  {
    id: 11,
    question: "What requirement applies to the junction boxes used in outdoor lighting circuits?",
    options: [
      "Any junction box is suitable if inside an enclosure",
      "Junction boxes must have appropriate IP ratings for their location and be accessible for inspection",
      "Junction boxes are prohibited outdoors",
      "Only metal junction boxes may be used"
    ],
    correctAnswer: 1,
    explanation: "Outdoor junction boxes must achieve the IP rating required for their exposure level (typically IP65 or higher), be suitable for the temperature range, and remain accessible for inspection and maintenance. Gel-filled or resin-filled junction boxes provide excellent protection for buried connections."
  },
  {
    id: 12,
    question: "What does the 'IK' rating system measure?",
    options: [
      "Insulation resistance",
      "Impact resistance - the mechanical protection level of an enclosure",
      "Ingress protection",
      "Installation category"
    ],
    correctAnswer: 1,
    explanation: "The IK rating (IK00 to IK10) measures impact resistance - how well an enclosure withstands mechanical impacts measured in joules. Outdoor installations in public areas or at low level may need higher IK ratings (IK07 to IK10) to resist vandalism and accidental damage."
  }
];

const faqs = [
  {
    question: "Can I use standard PVC conduit outdoors?",
    answer: "Standard white PVC conduit degrades in UV light within a few years, becoming brittle and yellowed. For outdoor use, specify UV-stabilised conduit (usually black or grey) or use galvanised steel conduit. Alternative options include UV-resistant heavy-gauge conduit or painting standard conduit with UV-protective paint as a temporary measure."
  },
  {
    question: "How do I protect underground cable routes from accidental damage?",
    answer: "Install cable at minimum 450mm depth (600mm preferred, 500mm under driveways). Place yellow warning tape 150mm above the cable. Consider cable tiles or protective covers for additional mechanical protection. Mark the cable route at each end and at changes of direction. Keep accurate as-built records showing the exact route for future reference."
  },
  {
    question: "What's the difference between weatherproof and watertight?",
    answer: "Weatherproof typically means protected against normal weather conditions - rain, snow, humidity - usually to IP44 or IP54 standard. Watertight implies higher protection levels (IP66, IP67, IP68) suitable for direct water contact, jet washing, or immersion. The terms are sometimes used loosely; always check the actual IP rating rather than relying on marketing descriptions."
  },
  {
    question: "Do outdoor circuits need surge protection?",
    answer: "Outdoor circuits are more exposed to transient overvoltages from lightning and switching events. BS 7671 requires risk assessment for surge protection device (SPD) installation. Long outdoor cable runs, rural locations, and installations with sensitive electronics benefit from SPD protection. Type 2 SPDs at the consumer unit protect against most induced surges."
  },
  {
    question: "How should cables enter outdoor enclosures?",
    answer: "Cables should enter from the bottom where possible, using properly sized compression glands that provide mechanical retention and IP sealing. Create drip loops before entry points. Use glands rated for the cable type (different for SWA, flex, etc.). Seal unused entries with blanking plugs rated to match the enclosure IP rating."
  },
  {
    question: "What maintenance considerations apply to outdoor installations?",
    answer: "Outdoor installations need periodic inspection for corrosion, seal deterioration, UV damage, vegetation encroachment, and vermin damage. Enclosure seals may need replacement over time. Test RCDs regularly as outdoor circuits face higher fault risks. Clean solar-heated surfaces to prevent overheating. Document all maintenance for compliance records."
  }
];

const Level3Module6Section4_2 = () => {
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
        

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>IP Ratings:</strong> First digit = solids (0-6), second = water (0-9)</li>
              <li><strong>UV Protection:</strong> Standard PVC degrades - use UV-stable materials</li>
              <li><strong>RCD Required:</strong> All outdoor circuits need 30mA RCD protection</li>
              <li><strong>Burial Depth:</strong> 450mm minimum, 500mm under roads</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Cracked brittle conduit and yellowed enclosures from UV damage</li>
              <li><strong>Use:</strong> External influence codes from Appendix 5 in specifications</li>
              <li><strong>Apply:</strong> Drip loops and bottom-entry glands for water protection</li>
            </ul>
          </div>
        </div>

        

        

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding IP Ratings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The IP (Ingress Protection) rating system, defined in BS EN 60529, provides a standardised method of describing the level of protection an enclosure offers against the intrusion of solid objects and water. Understanding this system is essential for specifying outdoor electrical equipment correctly.
            </p>
            <p>
              The IP code consists of two digits: the first indicates solid particle protection (0-6), and the second indicates water protection (0-9). An 'X' replaces either digit when that protection level is not specified or tested.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-3">First Digit - Solid Object Protection:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                <div className="p-2 bg-white/5 rounded">
                  <span className="font-mono text-elec-yellow/80">0</span>
                  <p className="text-white/80 text-xs">No protection</p>
                </div>
                <div className="p-2 bg-white/5 rounded">
                  <span className="font-mono text-elec-yellow/80">1</span>
                  <p className="text-white/80 text-xs">Objects greater than 50mm</p>
                </div>
                <div className="p-2 bg-white/5 rounded">
                  <span className="font-mono text-elec-yellow/80">2</span>
                  <p className="text-white/80 text-xs">Objects greater than 12.5mm (fingers)</p>
                </div>
                <div className="p-2 bg-white/5 rounded">
                  <span className="font-mono text-elec-yellow/80">3</span>
                  <p className="text-white/80 text-xs">Objects greater than 2.5mm (tools)</p>
                </div>
                <div className="p-2 bg-white/5 rounded">
                  <span className="font-mono text-elec-yellow/80">4</span>
                  <p className="text-white/80 text-xs">Objects greater than 1mm (wires)</p>
                </div>
                <div className="p-2 bg-white/5 rounded">
                  <span className="font-mono text-elec-yellow/80">5</span>
                  <p className="text-white/80 text-xs">Dust protected (limited ingress)</p>
                </div>
                <div className="p-2 bg-white/5 rounded">
                  <span className="font-mono text-elec-yellow/80">6</span>
                  <p className="text-white/80 text-xs">Dust tight (no ingress)</p>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-3">Second Digit - Water Protection:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                <div className="p-2 bg-white/5 rounded">
                  <span className="font-mono text-elec-yellow/80">0</span>
                  <p className="text-white/80 text-xs">No protection</p>
                </div>
                <div className="p-2 bg-white/5 rounded">
                  <span className="font-mono text-elec-yellow/80">1</span>
                  <p className="text-white/80 text-xs">Vertical dripping water</p>
                </div>
                <div className="p-2 bg-white/5 rounded">
                  <span className="font-mono text-elec-yellow/80">2</span>
                  <p className="text-white/80 text-xs">Dripping at 15 degree tilt</p>
                </div>
                <div className="p-2 bg-white/5 rounded">
                  <span className="font-mono text-elec-yellow/80">3</span>
                  <p className="text-white/80 text-xs">Spraying water (60 degree angle)</p>
                </div>
                <div className="p-2 bg-white/5 rounded">
                  <span className="font-mono text-elec-yellow/80">4</span>
                  <p className="text-white/80 text-xs">Splashing from all directions</p>
                </div>
                <div className="p-2 bg-white/5 rounded">
                  <span className="font-mono text-elec-yellow/80">5</span>
                  <p className="text-white/80 text-xs">Low pressure water jets</p>
                </div>
                <div className="p-2 bg-white/5 rounded">
                  <span className="font-mono text-elec-yellow/80">6</span>
                  <p className="text-white/80 text-xs">High pressure water jets</p>
                </div>
                <div className="p-2 bg-white/5 rounded">
                  <span className="font-mono text-elec-yellow/80">7</span>
                  <p className="text-white/80 text-xs">Temporary immersion (1m, 30 mins)</p>
                </div>
                <div className="p-2 bg-white/5 rounded">
                  <span className="font-mono text-elec-yellow/80">8</span>
                  <p className="text-white/80 text-xs">Continuous immersion</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> IP ratings are tested under specific laboratory conditions. Real-world performance may vary with age, installation quality, and maintenance. Always select a higher rating than the minimum required for critical applications.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            UV Radiation and Material Degradation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Ultraviolet radiation from sunlight is one of the most destructive environmental factors for electrical installation materials. UV radiation breaks down polymer chains in plastics, causing them to become brittle, discoloured, and eventually fail. This process is called photo-degradation.
            </p>
            <p>
              Standard PVC cable sheathing and white conduit are particularly vulnerable. In direct sunlight, these materials can show significant degradation within 3-5 years, potentially exposing conductors or allowing water ingress through cracks.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">UV-Vulnerable Materials</p>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>Standard white PVC conduit</li>
                  <li>White or light-coloured cable sheaths</li>
                  <li>Standard cable ties (especially white)</li>
                  <li>Clear or translucent enclosures</li>
                  <li>Rubber seals and gaskets</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-green-400/80 mb-2">UV-Resistant Alternatives</p>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>Black UV-stabilised conduit</li>
                  <li>Black or grey LSF/LSZH cables</li>
                  <li>UV-resistant (black) cable ties</li>
                  <li>Fibreglass or metal enclosures</li>
                  <li>EPDM or silicone seals</li>
                </ul>
              </div>
            </div>

            <p>
              The colour of materials affects UV resistance - black materials contain carbon black which absorbs UV radiation and protects the underlying polymer. This is why black conduit and cable ties are specified for outdoor use rather than white alternatives.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A garden lighting installation uses white PVC conduit for cable protection. After three summers of sun exposure, the conduit becomes yellow and brittle. A section cracks during routine gardening, exposing the cable. The correct specification would have been black UV-stabilised conduit or galvanised steel conduit with proper fixings.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Outdoor Protection Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 Regulation 411.3.3 requires socket outlets rated up to 32A for use outdoors to have additional protection by means of a 30mA RCD. This applies whether the socket is wall-mounted, in a dedicated outdoor enclosure, or installed in an outbuilding.
            </p>
            <p>
              The combination of higher moisture levels, reduced footwear protection, and the likelihood of using portable equipment outdoors creates elevated shock risk compared to indoor locations. RCD protection provides rapid disconnection for earth faults before dangerous shock can occur.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-3">Socket Outlet IP Requirements:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 pr-4 text-white/80">Location</th>
                      <th className="text-left py-2 pr-4 text-white/80">Minimum IP (closed)</th>
                      <th className="text-left py-2 text-white/80">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/90">
                    <tr className="border-b border-white/10">
                      <td className="py-2 pr-4">Covered/sheltered</td>
                      <td className="py-2 pr-4 font-mono">IP44</td>
                      <td className="py-2">Under porch or similar protection</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 pr-4">Exposed to weather</td>
                      <td className="py-2 pr-4 font-mono">IP55 or IP66</td>
                      <td className="py-2">Fully exposed wall mounting</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Subject to jet washing</td>
                      <td className="py-2 pr-4 font-mono">IP66</td>
                      <td className="py-2">Driveways, car wash areas</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p>
              External distribution equipment and isolators must also be appropriately rated. Outdoor consumer units and switchgear should achieve IP65 or IP66 ratings, with gasket seals and cable entries properly maintained to preserve the protection level.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Additional Outdoor Equipment Considerations:</p>
              <ul className="text-sm text-white/90 space-y-1 ml-4">
                <li>Use lockable enclosures in public or accessible areas</li>
                <li>Specify IK-rated enclosures where impact damage is possible</li>
                <li>Include adequate drainage for any condensation</li>
                <li>Position enclosures to minimise direct sun exposure where practical</li>
                <li>Allow for thermal expansion in plastic enclosures</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Underground and Buried Cable Installations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Underground cable installation is common for outdoor supplies to outbuildings, garden lighting, and external equipment. Proper installation protects cables from mechanical damage, provides a neat appearance, and enables maintenance access through the structure above.
            </p>
            <p>
              Steel wire armoured (SWA) cable is the standard choice for underground installation. The armour provides mechanical protection allowing direct burial, and the steel wires can serve as the circuit protective conductor (CPC) - though many designers include an additional copper CPC for belt-and-braces protection.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-3">Underground Installation Depths:</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-white/5 rounded">
                  <p className="font-medium text-elec-yellow/80 mb-1">Private land (gardens, drives)</p>
                  <ul className="text-white/90 space-y-1">
                    <li>Minimum: 450mm</li>
                    <li>Recommended: 600mm</li>
                    <li>Under patios/drives: 500mm+</li>
                  </ul>
                </div>
                <div className="p-3 bg-white/5 rounded">
                  <p className="font-medium text-elec-yellow/80 mb-1">Public/agricultural land</p>
                  <ul className="text-white/90 space-y-1">
                    <li>Footpaths: 600mm+</li>
                    <li>Roads: 750mm+</li>
                    <li>Agricultural: 1000mm</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Installation Procedure:</p>
              <ul className="text-sm text-white/90 space-y-1 ml-4">
                <li>1. Excavate trench to required depth plus 50-100mm for sand bed</li>
                <li>2. Lay 50mm sand or fine soil bed (free of stones/sharp objects)</li>
                <li>3. Install cable with appropriate slack for thermal movement</li>
                <li>4. Cover with 50mm sand or fine soil</li>
                <li>5. Install cable tiles or covers for additional protection (optional but recommended)</li>
                <li>6. Install warning tape 150mm above cable</li>
                <li>7. Backfill in layers, compacting as you go</li>
                <li>8. Install surface markers at cable route changes and endpoints</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Always record the actual route of buried cables with measurements from permanent features. As-built drawings are essential for future work and avoiding accidental damage. Consider using a GPS record for accuracy.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Equipment and Material Selection</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Specify IP ratings based on location exposure - IP44 minimum, IP65/66 for exposed positions</li>
                <li>Use stainless steel (A2/A4) or hot-dip galvanised fixings for all outdoor applications</li>
                <li>Select UV-stabilised conduit, trunking and accessories (usually black or grey)</li>
                <li>Choose EPDM or silicone gaskets that maintain flexibility in temperature extremes</li>
                <li>Consider IK ratings for accessible locations and public areas</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Water Ingress Prevention</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Position cable entries at bottom of enclosures where possible</li>
                <li>Create drip loops before all entries - cables should rise before entering</li>
                <li>Use correctly sized compression glands - too large allows water ingress</li>
                <li>Seal unused entries with blanking plugs matching enclosure IP rating</li>
                <li>Ensure enclosure lids and doors seat properly on gaskets</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Wrong IP specification</strong> - Using IP44 equipment where IP65 is needed</li>
                <li><strong>Standard fixings</strong> - Using zinc-plated screws that corrode within months</li>
                <li><strong>White conduit outdoors</strong> - Becomes brittle from UV within 2-3 years</li>
                <li><strong>Shallow cable burial</strong> - Cables damaged by gardening or ground settlement</li>
                <li><strong>Missing drip loops</strong> - Water follows cables directly into enclosures</li>
                <li><strong>No cable route records</strong> - Future excavations damage unknown cable routes</li>
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
                <p className="font-medium text-white mb-1">Common IP Ratings for Outdoors</p>
                <ul className="space-y-0.5">
                  <li>IP44 - Minimum for sheltered outdoor use</li>
                  <li>IP55 - General outdoor equipment</li>
                  <li>IP65 - Dust-tight, water jet protection</li>
                  <li>IP66 - Dust-tight, high-pressure jets</li>
                  <li>IP67 - Temporary immersion rated</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key BS 7671 References</p>
                <ul className="space-y-0.5">
                  <li>Regulation 411.3.3 - RCD protection for outdoor sockets</li>
                  <li>Appendix 5 - External influences classification</li>
                  <li>Section 522 - Environmental conditions</li>
                  <li>Regulation 522.8 - Underground cables</li>
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
            <Link to="/study-centre/apprentice/level3-module6-section4-4-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Bathrooms
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module6-section4-4-3">
              Next: Agricultural & Industrial
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module6Section4_2;
