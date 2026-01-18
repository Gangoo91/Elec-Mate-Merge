import { ArrowLeft, Zap, CheckCircle, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import useSEO from '@/hooks/useSEO';

const TITLE = "Cabling, Busbar Systems and Riser Design - Industrial Electrical Module 1.4";
const DESCRIPTION = "Master industrial cable types including SWA, MICC, and FP cables. Learn busbar trunking systems, vertical riser design, fire stopping requirements, and BS 7671 cable sizing with derating factors.";

const quickCheckQuestions = [
  {
    id: "qc1-s4-industrial-cables",
    question: "What is the minimum fire resistance duration required for FP200 cables in escape routes?",
    options: ["30 minutes", "60 minutes", "120 minutes", "240 minutes"],
    correctIndex: 2,
    explanation: "FP200 (Fire Performance) cables are designed to maintain circuit integrity for a minimum of 120 minutes during a fire, which is essential for emergency lighting and fire alarm circuits in escape routes as per BS 8519."
  },
  {
    id: "qc2-s4-busbar-ratings",
    question: "What IP rating is typically required for busbar trunking in an industrial environment with water spray risks?",
    options: ["IP20", "IP44", "IP55", "IP65"],
    correctIndex: 2,
    explanation: "IP55 provides protection against dust ingress and water jets from any direction, making it suitable for industrial environments where water spray or washdown may occur."
  },
  {
    id: "qc3-s4-derating",
    question: "When grouping 6 single-core cables in a cable tray (touching), what is the approximate derating factor from BS 7671 Table 4C1?",
    options: ["0.90", "0.72", "0.57", "0.45"],
    correctIndex: 1,
    explanation: "According to BS 7671 Table 4C1, grouping 6 cables together (touching) in a cable tray requires a derating factor of approximately 0.72. This accounts for mutual heating between conductors."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does SWA stand for in industrial cable terminology?",
    options: ["Steel Wire Armoured", "Single Wire Assembly", "Shielded Wire Armoured", "Steel Wrapped Aluminium"],
    correctAnswer: 0,
    explanation: "SWA stands for Steel Wire Armoured, describing cables with steel wire armouring for mechanical protection."
  },
  {
    id: 2,
    question: "According to BS 7671, what is the maximum ambient temperature assumption for standard cable ratings?",
    options: ["20 degrees C", "25 degrees C", "30 degrees C", "35 degrees C"],
    correctAnswer: 2,
    explanation: "BS 7671 assumes a standard ambient temperature of 30 degrees C for cable current ratings."
  },
  {
    id: 3,
    question: "What fire barrier rating is typically required for cables passing through compartment floors in risers?",
    options: ["30 minutes", "60 minutes", "Same as the floor rating", "240 minutes"],
    correctAnswer: 2,
    explanation: "Fire barriers must match the fire rating of the floor they penetrate, maintaining compartmentation integrity."
  },
  {
    id: 4,
    question: "MICC cable uses which material for its sheath?",
    options: ["PVC", "XLPE", "Copper", "Steel"],
    correctAnswer: 2,
    explanation: "MICC (Mineral Insulated Copper Clad) cable uses a seamless copper sheath providing excellent fire resistance."
  },
  {
    id: 5,
    question: "What is the minimum bending radius for SWA cable as a general rule?",
    options: ["4 times cable diameter", "6 times cable diameter", "8 times cable diameter", "12 times cable diameter"],
    correctAnswer: 1,
    explanation: "SWA cables require a minimum bending radius of 6 times the overall cable diameter to prevent damage."
  },
  {
    id: 6,
    question: "Which cable containment system provides the best ventilation for heat dissipation?",
    options: ["Cable trunking", "Cable ladder", "Conduit", "Cable basket"],
    correctAnswer: 1,
    explanation: "Cable ladder provides maximum ventilation due to its open rung construction, ideal for heat dissipation."
  },
  {
    id: 7,
    question: "What spacing is required between power cables and data/signal cables for EMC compliance?",
    options: ["50mm minimum", "150mm minimum", "300mm minimum", "No spacing required"],
    correctAnswer: 2,
    explanation: "A minimum of 300mm separation is required between unscreened power and data cables for EMC compliance."
  },
  {
    id: 8,
    question: "Busbar trunking rated at 3200A would typically be classified as:",
    options: ["Lighting busbar", "Distribution busbar", "Feeder busbar", "Earth busbar"],
    correctAnswer: 2,
    explanation: "Feeder busbars typically range from 800A to 6300A for main distribution from transformers."
  },
  {
    id: 9,
    question: "What correction factor applies when ambient temperature is 40 degrees C for thermoplastic (PVC) insulated cables?",
    options: ["0.87", "0.91", "0.94", "1.00"],
    correctAnswer: 0,
    explanation: "At 40 degrees C ambient temperature, PVC insulated cables require a derating factor of 0.87."
  },
  {
    id: 10,
    question: "When installing cables in vertical risers, at what intervals should cables be supported to prevent mechanical stress?",
    options: ["Every 0.5m", "Every 1m", "Every 3m", "Every 5m"],
    correctAnswer: 2,
    explanation: "Cables in vertical risers should be supported every 3m maximum to prevent mechanical stress."
  }
];

const faqs = [
  {
    question: "When should I use SWA cable versus MICC cable in industrial installations?",
    answer: "SWA (Steel Wire Armoured) cable is the workhorse for general industrial power distribution - it's cost-effective, mechanically protected, and suitable for direct burial or surface mounting. MICC (Mineral Insulated Copper Clad) is reserved for critical circuits requiring fire survival, extreme temperatures (-40 to +250 degrees C), or where space is limited. MICC is mandatory for fire alarm circuits in some applications and is preferred in hazardous areas."
  },
  {
    question: "How do I calculate cable size for industrial motor circuits?",
    answer: "For motor circuits, follow BS 7671 Section 552. Start with the motor full load current (FLC) from the nameplate. The cable must carry at least the FLC, then apply all derating factors (grouping, ambient temperature, thermal insulation), check voltage drop doesn't exceed 5% total, and verify the protective device can handle motor starting characteristics."
  },
  {
    question: "What are the fire stopping requirements for cables in risers?",
    answer: "Fire stopping in risers must maintain the fire compartmentation of the building. Requirements include: fire barriers must match the fire rating of the floor (typically 60-120 minutes), use tested and certified fire stopping systems, maintain clearances specified by the fire stop manufacturer, and document all penetrations. Re-certification is required if cables are added or removed."
  },
  {
    question: "How do I select the correct busbar trunking system?",
    answer: "Selection criteria include: current rating with 20-30% spare capacity, short-circuit withstand rating exceeding prospective fault current, IP rating (IP55 minimum for industrial), tap-off positions and spacing, fire rating if crossing compartments, and voltage drop (typically less than 1% for feeder busbars)."
  },
  {
    question: "What EMC considerations apply to industrial cable installations?",
    answer: "Segregate power and data cables by minimum 300mm or use metallic barriers. Cross power and signal cables at 90 degree angles where crossing is unavoidable. Use screened cables for sensitive circuits and ensure screens are properly earthed. Install VFD/inverter output cables in separate metallic containment and earth cable containment systems every 10m."
  },
  {
    question: "What derating factors must I apply for cables in industrial cable trays?",
    answer: "Multiple derating factors apply cumulatively: grouping factor (Table 4C1) for touching cables, ambient temperature factor (Table 4B1) if ambient exceeds 30 degrees C, and thermal insulation factor (Table 52.2) if cables are enclosed. Calculate: Effective rating = Base rating multiplied by Ca, Cg, Ci, and Cd."
  }
];

const IndustrialElectricalModule1Section4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/industrial-electrical-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1 Section 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Cabling, Busbar Systems, and Riser Design
          </h1>
          <p className="text-white/80">
            Industrial cable selection, containment systems, and vertical distribution design
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>SWA:</strong> Standard industrial power distribution cable</li>
              <li><strong>MICC:</strong> Fire survival and extreme temperature applications</li>
              <li><strong>FP200:</strong> 120 minutes fire resistance for escape routes</li>
              <li><strong>Busbars:</strong> 25A-6300A for efficient distribution</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Points</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Derating:</strong> Apply Ca, Cg, Ci factors cumulatively</li>
              <li><strong>EMC:</strong> 300mm minimum power/data separation</li>
              <li><strong>Fire stopping:</strong> Must match floor fire rating</li>
              <li><strong>Riser support:</strong> Every 3m for vertical cables</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Select appropriate industrial cable types (SWA, MICC, FP)",
              "Design cable containment systems (tray, ladder, trunking)",
              "Specify busbar trunking for high-current distribution",
              "Apply BS 7671 cable sizing with derating factors",
              "Design vertical risers with fire stopping requirements",
              "Implement EMC and cable segregation requirements"
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

        {/* Section 1: Industrial Cable Types */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Industrial Cable Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Industrial installations require cables that can withstand harsh conditions including mechanical damage, high temperatures, and fire exposure. Understanding the characteristics and applications of each cable type is essential for correct specification.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Steel Wire Armoured (SWA) Cable</p>
              <p className="text-sm text-white/90 mb-3">
                SWA cable is the most common choice for industrial power distribution. The steel wire armouring provides excellent mechanical protection against impact, crushing, and rodent attack.
              </p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Available in 2, 3, 4, and 5 core configurations</li>
                <li>Conductor sizes from 1.5mm sq to 400mm sq (and beyond for single core)</li>
                <li>Standard voltage ratings: 600/1000V (0.6/1kV)</li>
                <li>Minimum bending radius: 6 x overall cable diameter</li>
                <li>Operating temperature: -40 to +90 degrees C (XLPE insulation)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mineral Insulated Copper Clad (MICC) Cable</p>
              <p className="text-sm text-white/90 mb-3">
                MICC cable consists of copper conductors surrounded by compressed magnesium oxide insulation, enclosed in a seamless copper sheath. This provides exceptional fire resistance and durability.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-white mb-1">Advantages:</p>
                  <ul className="text-sm text-white/90 space-y-0.5">
                    <li>Indefinite fire survival (copper melts at 1083 degrees C)</li>
                    <li>Temperature range: -40 to +250 degrees C continuous</li>
                    <li>Small diameter for given current rating</li>
                    <li>Waterproof and oil-resistant</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-white mb-1">Limitations:</p>
                  <ul className="text-sm text-white/90 space-y-0.5">
                    <li>Higher cost than SWA</li>
                    <li>Requires special termination skills</li>
                    <li>Hygroscopic - seals must be perfect</li>
                    <li>Limited flexibility</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fire Performance (FP) Cables</p>
              <p className="text-sm text-white/90 mb-3">
                FP cables (such as FP200 Gold) provide circuit integrity during fire conditions while being easier to install than MICC. Designed to BS 8519 and tested to BS EN 50200.
              </p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>FP200:</strong> 120 minutes at 830 degrees C with mechanical shock</li>
                <li><strong>Standard FP:</strong> 30-60 minutes fire resistance</li>
                <li><strong>Enhanced FP:</strong> 120+ minutes with water spray test</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Cable Containment Systems */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Cable Containment Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Industrial environments require robust containment systems that provide mechanical protection, fire performance, and facilitate maintenance. The choice of containment affects cable ratings and installation costs.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Tray</p>
                <ul className="text-sm text-white space-y-0.5">
                  <li>Good for horizontal runs</li>
                  <li>Moderate ventilation</li>
                  <li>Medium load capacity</li>
                  <li>Cost-effective solution</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Ladder</p>
                <ul className="text-sm text-white space-y-0.5">
                  <li>Best heat dissipation</li>
                  <li>Highest load capacity</li>
                  <li>Ideal for large SWA runs</li>
                  <li>Vertical riser use</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Trunking</p>
                <ul className="text-sm text-white space-y-0.5">
                  <li>Full mechanical protection</li>
                  <li>Internal segregation possible</li>
                  <li>Neat appearance</li>
                  <li>Limited ventilation</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-400 mb-1">Installation Requirements (BS 7671)</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Cable tray fill factor: Maximum 45% of cross-sectional area</li>
                    <li>Support spacing: 3m maximum for horizontal runs</li>
                    <li>Earth bonding: Continuous earth path required throughout</li>
                    <li>Fixings: Fire-rated fixings where crossing fire barriers</li>
                    <li>Expansion joints: Required for runs exceeding 25m</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Containment Material Selection</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Hot-dip galvanised steel (HDG Z275):</strong> Standard industrial</li>
                <li><strong>Stainless steel (316):</strong> Corrosive/food processing environments</li>
                <li><strong>Aluminium (anodised):</strong> Lightweight/chemical plants</li>
                <li><strong>GRP/FRP:</strong> Highly corrosive environments</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: Busbar Trunking Systems */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Busbar Trunking Systems and Ratings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Busbar trunking systems provide efficient, flexible power distribution for industrial facilities. They offer advantages over traditional cable systems including lower installation time, easier modification, and better heat dissipation per amp.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Busbar Categories</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Feeder Busbar:</strong> 800A-6300A (main distribution)</li>
                  <li><strong>Distribution Busbar:</strong> 100A-1600A (secondary with tap-offs)</li>
                  <li><strong>Lighting Busbar:</strong> 25A-63A (final circuit distribution)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">IP Ratings for Busbar</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>IP20:</strong> Indoor, clean environments</li>
                  <li><strong>IP40:</strong> Indoor, minor dust</li>
                  <li><strong>IP55:</strong> Industrial, water jets</li>
                  <li><strong>IP65:</strong> Outdoor, dust-tight</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Technical Specifications</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Voltage rating:</strong> Up to 1000V AC / 1500V DC</li>
                <li><strong>Short-circuit withstand (Icw):</strong> 25kA-150kA for 1 second</li>
                <li><strong>Peak withstand (Ipk):</strong> 2.2 x Icw</li>
                <li><strong>Voltage drop:</strong> Less than 1% at rated current</li>
                <li><strong>Fire resistance:</strong> Up to 120 minutes (fire-rated types)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Busbar Advantages</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Faster installation (up to 50% time saving)</li>
                <li>Easy reconfiguration and tap-off additions</li>
                <li>Better thermal management than bundled cables</li>
                <li>Reduced fire load compared to PVC cables</li>
                <li>Lower impedance = better voltage regulation</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Vertical Riser Design */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Vertical Riser Design and Fire Stopping
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electrical risers provide the vertical backbone for power distribution in multi-storey buildings. Proper design must address cable support, fire compartmentation, accessibility, and future expansion requirements.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Riser Design Principles</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Size for 30-50% spare capacity</li>
                  <li>Minimum 600mm working space in front of equipment</li>
                  <li>Support cables every 3m vertically</li>
                  <li>Dedicated riser for each service type where possible</li>
                  <li>Adequate ventilation to prevent heat build-up</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fire Stopping Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Fire barrier rating:</strong> Must match floor rating (60-120 mins)</li>
                  <li><strong>Penetration sealing:</strong> All cable penetrations must be stopped</li>
                  <li><strong>Approved systems:</strong> Use tested/certified fire stop products</li>
                  <li><strong>Inspection:</strong> Third-party certification required</li>
                  <li><strong>Documentation:</strong> Maintain as-built records of all fire stops</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-400 mb-1">Critical Fire Safety Points</p>
                  <p className="text-sm text-white">
                    Fire stopping must be reinstated whenever cables are added or removed. Any breach in fire compartmentation can allow fire and smoke spread between floors, potentially with fatal consequences. Always use competent installers and ensure proper certification.
                  </p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Fire Stopping Methods</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Fire pillows:</strong> Removable, reusable for modifications</li>
                <li><strong>Intumescent sealants:</strong> Expand when heated to seal gaps</li>
                <li><strong>Fire batts:</strong> Mineral wool boards for larger openings</li>
                <li><strong>Ablative coatings:</strong> Applied to cables in fire-rated routes</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: Cable Sizing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Cable Sizing for Industrial Loads
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cable sizing in industrial installations must account for multiple derating factors and verify both current-carrying capacity and voltage drop requirements per BS 7671.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cable Sizing Formula</p>
              <p className="text-sm text-elec-yellow/90 font-mono text-center py-2">
                Iz greater than or equal to In greater than or equal to Ib
              </p>
              <p className="text-sm text-elec-yellow/90 font-mono text-center py-2">
                It = Ib / (Ca x Cg x Ci x Cc)
              </p>
              <ul className="text-sm text-white space-y-1 ml-4 mt-3">
                <li><strong>Ib:</strong> Design current of circuit</li>
                <li><strong>In:</strong> Nominal current of protective device</li>
                <li><strong>Iz:</strong> Current-carrying capacity of cable</li>
                <li><strong>It:</strong> Tabulated current rating required</li>
                <li><strong>Ca:</strong> Ambient temperature correction factor</li>
                <li><strong>Cg:</strong> Grouping correction factor</li>
                <li><strong>Ci:</strong> Thermal insulation factor</li>
                <li><strong>Cc:</strong> BS 3036 fuse factor (0.725) if applicable</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Table 4B1: Ambient Temperature (PVC)</p>
                <ul className="text-sm text-white space-y-0.5">
                  <li>25 degrees C: Factor 1.03</li>
                  <li>30 degrees C: Factor 1.00</li>
                  <li>35 degrees C: Factor 0.94</li>
                  <li>40 degrees C: Factor 0.87</li>
                  <li>45 degrees C: Factor 0.79</li>
                  <li>50 degrees C: Factor 0.71</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Table 4C1: Grouping (Touching on Tray)</p>
                <ul className="text-sm text-white space-y-0.5">
                  <li>1 cable: Factor 1.00</li>
                  <li>2 cables: Factor 0.80</li>
                  <li>3 cables: Factor 0.73</li>
                  <li>4 cables: Factor 0.72</li>
                  <li>6 cables: Factor 0.72</li>
                  <li>9 cables: Factor 0.70</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Voltage Drop Verification</p>
              <p className="text-sm text-white/90 mb-2">
                Maximum voltage drop (BS 7671): <strong>5%</strong> total (3% for lighting)
              </p>
              <p className="text-sm text-elec-yellow/90 font-mono text-center py-2">
                Voltage Drop = (mV/A/m x Ib x L) / 1000
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 6: EMC and Segregation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            EMC and Segregation Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Industrial environments contain many sources of electromagnetic interference (EMI) that can disrupt sensitive equipment. Proper cable segregation and installation practices are essential for EMC compliance and reliable system operation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cable Segregation Categories (BS 7671)</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Category 1 (Safety):</strong> Fire alarm, emergency lighting - must be segregated or use fire-rated cables</li>
                <li><strong>Category 2 (Mains Power):</strong> Power circuits, lighting, socket outlets</li>
                <li><strong>Category 3 (Telecommunications):</strong> Data cables, telephone, IT networks - require separation from power</li>
                <li><strong>Category 4 (Control):</strong> Analogue signals, sensors, PLCs - most sensitive to interference</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Segregation Distances</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Power to Data (unscreened):</strong> 300mm minimum</li>
                <li><strong>Power to Data (screened):</strong> 50mm minimum</li>
                <li><strong>VFD output to sensitive circuits:</strong> 500mm or screened conduit</li>
                <li><strong>Fire alarm to other circuits:</strong> Separate containment or FP cable</li>
                <li><strong>Crossing angle:</strong> 90 degree crossings only</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">EMC Best Practices</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Use screened cables for VFD motor connections</li>
                  <li>Earth cable screens at both ends (360 degree termination)</li>
                  <li>Bond metallic containment to earth every 10m</li>
                  <li>Use EMC glands for screened cable terminations</li>
                  <li>Install output filters on VFDs for long cable runs</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common EMC Issues</p>
                <ul className="text-sm text-white space-y-1">
                  <li>VFD switching noise on motor cables</li>
                  <li>Data errors from parallel power runs</li>
                  <li>Sensor drift from induced voltages</li>
                  <li>PLC communication failures</li>
                  <li>Nuisance tripping of RCDs</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Sizing Industrial Cables</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Calculate design current (Ib) accurately including power factor</li>
                <li>Apply ALL relevant derating factors cumulatively</li>
                <li>Select cable from appropriate BS 7671 table</li>
                <li>Verify voltage drop is within limits (5% power, 3% lighting)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Designing Riser Systems</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Allow 30-50% spare capacity for future growth</li>
                <li>Support vertical cables every 3m maximum</li>
                <li>Ensure fire stopping matches floor fire rating</li>
                <li>Document all penetrations and fire stop installations</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Ignoring derating factors</strong> - cables will overheat and fail</li>
                <li><strong>Inadequate cable segregation</strong> - EMC issues cause system failures</li>
                <li><strong>Breaching fire compartments</strong> - potentially fatal consequences</li>
                <li><strong>Under-sizing busbars</strong> - no spare capacity for future loads</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-3 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Cable Selection Checklist</p>
                <ul className="space-y-0.5">
                  <li>Calculate design current (Ib)</li>
                  <li>Select protective device (In)</li>
                  <li>Apply derating factors</li>
                  <li>Verify voltage drop</li>
                  <li>Check fault withstand</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key BS 7671 Tables</p>
                <ul className="space-y-0.5">
                  <li>4B1/4B2: Ambient temp factors</li>
                  <li>4C1/4C2: Grouping factors</li>
                  <li>4D1A-4D5: Current ratings</li>
                  <li>4E1A-4E4A: Voltage drop</li>
                  <li>54.7: Minimum CPC sizes</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Fire Rating Standards</p>
                <ul className="space-y-0.5">
                  <li>BS EN 50200: Fire resistance</li>
                  <li>BS 8519: Fire resistant cables</li>
                  <li>BS 476: Fire test methods</li>
                  <li>FP200: 120 mins at 830 deg C</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

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
            <Link to="/electrician/upskilling/industrial-electrical-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default IndustrialElectricalModule1Section4;
