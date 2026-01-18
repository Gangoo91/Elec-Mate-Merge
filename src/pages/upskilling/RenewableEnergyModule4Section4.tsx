import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "BESS Installation Requirements - Renewable Energy Module 4";
const DESCRIPTION = "Learn about battery energy storage system installation requirements including ventilation, fire safety, earthing, and compliance with UK regulations.";

const quickCheckQuestions = [
  {
    id: "bess-ventilation",
    question: "Why is ventilation critical for battery installations?",
    options: ["Only for cooling equipment", "To remove potentially flammable gases and manage heat", "For noise reduction", "Only required outdoors"],
    correctIndex: 1,
    explanation: "Ventilation serves dual purposes: removing hydrogen or other gases that may be emitted during charging/fault conditions, and managing heat to maintain safe operating temperatures."
  },
  {
    id: "bess-fire-rating",
    question: "What fire resistance rating is typically required for battery enclosures?",
    options: ["No rating required", "30 minutes minimum", "60 minutes minimum for larger systems", "Only exterior rated"],
    correctIndex: 2,
    explanation: "Larger BESS installations typically require 60-minute fire resistance rating for enclosures to contain any fire and allow evacuation. Requirements vary by size and location."
  },
  {
    id: "bess-earthing",
    question: "What earthing arrangement is commonly used for BESS installations?",
    options: ["No earthing required", "TN-C-S with separate battery earth", "Only protective earthing", "IT system only"],
    correctIndex: 1,
    explanation: "BESS installations typically use TN-C-S earthing with dedicated battery system earthing, ensuring all exposed metalwork is properly bonded and fault currents have a safe path."
  },
  {
    id: "bess-clearance",
    question: "What is the typical minimum clearance requirement around battery systems?",
    options: ["No clearance needed", "500mm for ventilation and maintenance access", "Only at front", "2 metres all sides"],
    correctIndex: 1,
    explanation: "Typically 500mm minimum clearance is required around battery systems for ventilation airflow and maintenance access. Check manufacturer requirements as this may vary."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What regulation covers electrical installation of BESS in the UK?",
    options: [
      "Only manufacturer guidelines",
      "BS 7671 (IET Wiring Regulations)",
      "Building regulations only",
      "No specific regulations"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 (IET Wiring Regulations) covers electrical installation requirements for BESS, supplemented by guidance in the IET Code of Practice for Energy Storage."
  },
  {
    id: 2,
    question: "Where should lithium batteries ideally NOT be installed?",
    options: [
      "In garages",
      "In utility rooms",
      "In main escape routes or under stairs",
      "In outbuildings"
    ],
    correctAnswer: 2,
    explanation: "Batteries should not be installed in main escape routes or under stairs due to fire safety concerns. Fire could block evacuation routes if batteries are in these locations."
  },
  {
    id: 3,
    question: "What environmental protection rating is typically required for outdoor BESS?",
    options: [
      "IP20",
      "IP44",
      "IP65 or higher",
      "No rating required"
    ],
    correctAnswer: 2,
    explanation: "Outdoor BESS installations typically require IP65 or higher protection against water ingress and dust to ensure safe operation in external conditions."
  },
  {
    id: 4,
    question: "What documentation is required for BESS installation handover?",
    options: [
      "No documentation needed",
      "Just the invoice",
      "Electrical installation certificate, user manual, and commissioning records",
      "Only warranty card"
    ],
    correctAnswer: 2,
    explanation: "Proper handover requires an Electrical Installation Certificate (BS 7671), user manual, commissioning records, warranty documentation, and G98/G99 commissioning form."
  },
  {
    id: 5,
    question: "What type of DC isolation is required for battery systems?",
    options: [
      "No isolation required",
      "Switch-disconnector accessible without opening enclosure",
      "Only fuse protection",
      "Automatic only"
    ],
    correctAnswer: 1,
    explanation: "A clearly marked DC switch-disconnector must be accessible without opening the battery enclosure, allowing safe isolation for maintenance and emergency response."
  },
  {
    id: 6,
    question: "What labelling is required at the main distribution board for BESS?",
    options: [
      "No labelling required",
      "Warning of dual supply and battery storage presence",
      "Only circuit number",
      "Manufacturer logo only"
    ],
    correctAnswer: 1,
    explanation: "Clear warning labels must indicate the presence of battery storage and dual supply (grid + battery), alerting anyone working on the installation to the additional hazards."
  },
  {
    id: 7,
    question: "What thermal management consideration applies to indoor installations?",
    options: [
      "No thermal management needed",
      "Room temperature must not exceed battery operating limits",
      "Only consider heating",
      "Thermal management is optional"
    ],
    correctAnswer: 1,
    explanation: "Room temperature must remain within battery operating limits (typically 0-45C). Heat generated by batteries and inverters must be managed through ventilation or cooling."
  },
  {
    id: 8,
    question: "What cable type should be used for battery DC connections?",
    options: [
      "Standard PVC cables",
      "Low smoke zero halogen (LSZH) or equivalent fire-rated cables",
      "Any cable type",
      "Only aluminium cables"
    ],
    correctAnswer: 1,
    explanation: "Battery DC connections should use LSZH or fire-rated cables to minimise toxic smoke and fire spread in the event of cable fire, particularly for indoor installations."
  },
  {
    id: 9,
    question: "What emergency response information should be provided?",
    options: [
      "None required",
      "System shutdown procedure, battery chemistry, and fire response guidance",
      "Only phone numbers",
      "Manufacturer website only"
    ],
    correctAnswer: 1,
    explanation: "Emergency response information should include shutdown procedures, battery chemistry type, fire response guidance, and emergency contact details for informed response."
  },
  {
    id: 10,
    question: "What structural consideration applies to floor-mounted batteries?",
    options: [
      "No structural requirements",
      "Floor must support battery weight, typically 50-100kg per kWh",
      "Only wall mounting allowed",
      "Suspended installation required"
    ],
    correctAnswer: 1,
    explanation: "Battery systems are heavy (typically 50-100kg per kWh plus enclosure). Floor structure must be assessed to ensure adequate load-bearing capacity, especially in domestic properties."
  }
];

const faqs = [
  {
    question: "Can I install batteries in an attached garage?",
    answer: "Yes, garages are often suitable locations. Ensure adequate ventilation, fire separation from habitable areas per Building Regulations, and protection from vehicle impact. The space should not be in the main escape route and temperature extremes should be considered."
  },
  {
    question: "What fire suppression is required for domestic BESS?",
    answer: "Domestic systems typically do not require dedicated fire suppression beyond standard smoke detection. However, larger commercial systems may require fire suppression systems. Follow manufacturer guidance and consult fire risk assessment for specific requirements."
  },
  {
    question: "How far should batteries be from the consumer unit?",
    answer: "There is no fixed distance requirement, but shorter cable runs reduce voltage drop and losses. Typically install within 10 metres where practical. Consider cable sizing for longer runs and ensure DC isolation is accessible."
  },
  {
    question: "Do I need Building Regulations approval for BESS installation?",
    answer: "BESS installation is notifiable electrical work under Part P where it forms part of a new circuit or alters the electrical installation. Additionally, structural and fire safety aspects may require Building Regulations consideration for larger systems."
  },
  {
    question: "What ventilation rate is required for lithium battery rooms?",
    answer: "Unlike lead-acid, lithium batteries do not emit hydrogen during normal operation. Ventilation requirements are primarily for thermal management. Follow manufacturer specifications, typically 2-4 air changes per hour for heat dissipation."
  },
  {
    question: "Can batteries be installed outdoors in the UK?",
    answer: "Yes, with appropriate IP rating (typically IP65+), temperature management (some batteries include heating for cold weather), and physical protection from impact and vandalism. Many manufacturers offer outdoor-rated enclosures specifically for UK climate."
  }
];

const RenewableEnergyModule4Section4 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/renewable-energy-module-4">
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
            <span>Module 4 Section 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            BESS Installation Requirements
          </h1>
          <p className="text-white/80">
            Ventilation, fire safety, earthing, and compliance for battery installations
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Key Requirements</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Ventilation:</strong> Heat and gas management</li>
              <li><strong>Fire safety:</strong> Enclosure, detection, separation</li>
              <li><strong>Earthing:</strong> TN-C-S with battery earth</li>
              <li><strong>Clearances:</strong> 500mm typical minimum</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Documentation</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>EIC:</strong> BS 7671 certificate</li>
              <li><strong>G98/G99:</strong> DNO notification</li>
              <li><strong>Commissioning:</strong> Test records</li>
              <li><strong>User manual:</strong> Operation guidance</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply ventilation requirements for BESS",
              "Implement fire safety measures",
              "Design appropriate earthing arrangements",
              "Specify correct location and clearances",
              "Complete required documentation",
              "Ensure regulatory compliance"
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
            Location Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Selecting the appropriate location for battery storage is critical for safety, performance, and compliance. The location affects ventilation, fire safety, and maintenance access requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Suitable Locations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Garages:</strong> Good ventilation, fire separation from house</li>
                <li><strong>Utility rooms:</strong> Indoor with adequate ventilation</li>
                <li><strong>Outbuildings:</strong> Dedicated space, weather protection</li>
                <li><strong>External:</strong> Purpose-built enclosures, IP65+ rated</li>
                <li><strong>Plant rooms:</strong> Commercial/industrial applications</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Locations to Avoid:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Escape routes:</strong> Hallways, under stairs, landings</li>
                <li><strong>Habitable rooms:</strong> Bedrooms, living areas (check guidance)</li>
                <li><strong>High temperature areas:</strong> Near boilers, in direct sunlight</li>
                <li><strong>Flood-prone areas:</strong> Basements without drainage</li>
                <li><strong>Limited access:</strong> Restricted maintenance access</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-white mb-2">Environmental Conditions:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Temperature:</strong> 0-45C typical operating range</li>
                <li><strong>Humidity:</strong> Below 90% non-condensing</li>
                <li><strong>Altitude:</strong> Derating may apply above 2000m</li>
                <li><strong>Dust/debris:</strong> Minimise contamination risk</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Fire Safety Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fire safety is paramount for battery installations due to the stored energy and potential for thermal events. Proper fire containment, detection, and response planning are essential.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Fire Containment:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Enclosure rating:</strong> 60-minute fire resistance for larger systems</li>
                <li><strong>Wall separation:</strong> Fire-rated construction to habitable spaces</li>
                <li><strong>Cable penetrations:</strong> Fire-stopped to maintain rating</li>
                <li><strong>Escape routes:</strong> Must not be compromised by installation location</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Detection and Warning:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Smoke detection:</strong> Early warning of thermal events</li>
                <li><strong>Heat detection:</strong> Rate-of-rise or fixed temperature</li>
                <li><strong>BMS alarms:</strong> Temperature monitoring and alerts</li>
                <li><strong>Integration:</strong> Link to building fire alarm where appropriate</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Fire Response Information</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Chemistry label:</strong> Clear indication of battery type</li>
                <li><strong>Isolation point:</strong> Marked DC and AC disconnection</li>
                <li><strong>Emergency contacts:</strong> Manufacturer and installer details</li>
                <li><strong>Fire service:</strong> Lithium battery fire requires water cooling</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Ventilation Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Adequate ventilation manages heat dissipation and removes any gases that may be emitted during operation or fault conditions, ensuring safe operating conditions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Thermal Management:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Heat generation:</strong> Batteries and inverters generate significant heat</li>
                <li><strong>Air changes:</strong> 2-4 per hour typical for heat dissipation</li>
                <li><strong>Natural ventilation:</strong> Low and high level vents for convection</li>
                <li><strong>Forced ventilation:</strong> Fans for high-power systems</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Ventilation Design:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Inlet:</strong> Low level, screened against pests</li>
                <li><strong>Outlet:</strong> High level for hot air exhaust</li>
                <li><strong>Sizing:</strong> Based on heat dissipation requirements</li>
                <li><strong>Outdoor termination:</strong> Away from openings and ignition sources</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Lead-Acid Specific:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Hydrogen emission:</strong> Requires calculated ventilation rate</li>
                <li><strong>LEL threshold:</strong> Keep hydrogen below 1% concentration</li>
                <li><strong>ATEX considerations:</strong> May apply for larger installations</li>
                <li><strong>No ignition sources:</strong> Within ventilation zone</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Electrical Installation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The electrical installation must comply with BS 7671 and manufacturer requirements, ensuring safe operation, protection coordination, and maintainability.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Earthing and Bonding:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Main earthing:</strong> Connected to installation earth</li>
                <li><strong>Battery earthing:</strong> Per manufacturer specification</li>
                <li><strong>Bonding:</strong> All exposed metalwork bonded</li>
                <li><strong>Earth fault protection:</strong> RCD or equivalent protection</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Circuit Protection:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>AC protection:</strong> MCB/RCBO sized for inverter rating</li>
                <li><strong>DC protection:</strong> Fuses or DC-rated MCBs</li>
                <li><strong>Surge protection:</strong> SPDs on AC and potentially DC side</li>
                <li><strong>Coordination:</strong> Selective tripping with main protection</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Isolation Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>AC isolation:</strong> Switch-disconnector at consumer unit</li>
                <li><strong>DC isolation:</strong> Adjacent to battery, accessible externally</li>
                <li><strong>Emergency stop:</strong> Consider for larger installations</li>
                <li><strong>Labelling:</strong> Clear identification of all isolation points</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-white mb-2">Cable Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Type:</strong> LSZH or fire-rated for indoor installations</li>
                <li><strong>DC cables:</strong> Double-insulated, UV resistant if exposed</li>
                <li><strong>Sizing:</strong> Per BS 7671 and manufacturer requirements</li>
                <li><strong>Support:</strong> Adequately supported and protected</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Documentation and Handover
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Complete documentation is essential for compliance, warranty validation, and ensuring the end user can operate and maintain the system safely.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Required Certificates:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>EIC:</strong> Electrical Installation Certificate per BS 7671</li>
                <li><strong>G98/G99:</strong> DNO commissioning confirmation form</li>
                <li><strong>MCS certificate:</strong> For SEG eligibility (if applicable)</li>
                <li><strong>Building control:</strong> Sign-off if notifiable work</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Handover Documentation:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>User manual:</strong> Operation and basic troubleshooting</li>
                <li><strong>System schematic:</strong> As-installed wiring diagram</li>
                <li><strong>Commissioning records:</strong> Test results and settings</li>
                <li><strong>Warranty documents:</strong> Equipment warranty information</li>
                <li><strong>Emergency procedures:</strong> Shutdown and response guidance</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Labelling Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Consumer unit:</strong> Warning of battery storage and dual supply</li>
                <li><strong>Isolation points:</strong> Clear marking of DC and AC disconnects</li>
                <li><strong>Battery enclosure:</strong> Chemistry type, capacity, emergency info</li>
                <li><strong>Inverter:</strong> Ratings and safety warnings</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Planning Installation</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Survey location for ventilation, fire safety, and access</li>
                <li>Check floor load capacity for battery weight</li>
                <li>Verify cable routes and isolation point locations</li>
                <li>Consider future maintenance access requirements</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Commissioning</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify all protection devices operate correctly</li>
                <li>Test isolation points function as intended</li>
                <li>Check BMS communication and alarms</li>
                <li>Document all settings and test results</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Installing in escape routes</strong> - fire safety breach</li>
                <li><strong>Inadequate ventilation</strong> - thermal issues and safety risk</li>
                <li><strong>Missing isolation</strong> - unsafe for maintenance</li>
                <li><strong>Incomplete documentation</strong> - warranty and compliance issues</li>
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
            <Link to="../section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
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

export default RenewableEnergyModule4Section4;
