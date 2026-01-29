import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Building Services Compliance - HNC Module 6 Section 1.5";
const DESCRIPTION = "Master Part L building services compliance: minimum efficiencies for boilers, heat pumps, lighting and HVAC systems, controls requirements, metering obligations, and commissioning standards.";

const quickCheckQuestions = [
  {
    id: "minimum-boiler-efficiency",
    question: "What is the minimum ErP efficiency for a new gas boiler installed under Part L?",
    options: ["86%", "89%", "92%", "95%"],
    correctIndex: 2,
    explanation: "Part L requires new gas boilers to achieve a minimum ErP (Energy-related Products) seasonal efficiency of 92%. This applies to both regular and combination boilers in new and existing buildings."
  },
  {
    id: "heat-pump-scop",
    question: "What minimum SCOP must an air source heat pump achieve for Part L compliance?",
    options: ["2.0", "2.5", "2.8", "3.0"],
    correctIndex: 2,
    explanation: "Air source heat pumps must achieve a minimum Seasonal Coefficient of Performance (SCOP) of 2.8 under Part L. Ground source heat pumps require SCOP of 3.0 minimum."
  },
  {
    id: "lighting-efficacy",
    question: "What is the minimum luminaire efficacy required for general lighting in new non-domestic buildings?",
    options: ["60 lm/W", "80 lm/W", "95 lm/W", "100 lm/W"],
    correctIndex: 1,
    explanation: "Part L requires general lighting in new non-domestic buildings to achieve a minimum luminaire efficacy of 80 lumens per Watt (lm/W). Display lighting has a lower threshold of 60 lm/W."
  },
  {
    id: "metering-threshold",
    question: "At what heating/cooling system output is sub-metering required under Part L?",
    options: ["25 kW", "50 kW", "100 kW", "150 kW"],
    correctIndex: 1,
    explanation: "Part L requires sub-metering for heating and cooling systems with an output exceeding 50 kW. This enables energy consumption to be monitored and managed effectively."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Under Part L 2021, what is the minimum seasonal efficiency for a new oil-fired boiler?",
    options: [
      "88%",
      "90%",
      "92%",
      "93%"
    ],
    correctAnswer: 2,
    explanation: "Oil-fired boilers must achieve a minimum ErP seasonal efficiency of 92%, the same requirement as gas boilers. This ensures comparable performance standards across fuel types."
  },
  {
    id: 2,
    question: "What SCOP is required for a ground source heat pump to comply with Part L?",
    options: ["2.5", "2.8", "3.0", "3.5"],
    correctAnswer: 2,
    explanation: "Ground source heat pumps (GSHPs) must achieve a minimum SCOP of 3.0 under Part L. This is higher than air source heat pumps (2.8) due to the more stable ground temperatures enabling better performance."
  },
  {
    id: 3,
    question: "What minimum efficacy is required for display lighting in non-domestic buildings?",
    options: ["50 lm/W", "60 lm/W", "80 lm/W", "95 lm/W"],
    correctAnswer: 1,
    explanation: "Display lighting has a reduced minimum efficacy requirement of 60 lm/W compared to 80 lm/W for general lighting. This recognises the specific requirements of display applications."
  },
  {
    id: 4,
    question: "Which of the following is NOT a mandatory control for HVAC systems under Part L?",
    options: [
      "Zone controls for areas over 150 m²",
      "Weather compensation for wet heating systems",
      "Timed setback for heating systems",
      "Automatic monitoring of energy consumption"
    ],
    correctAnswer: 3,
    explanation: "Automatic monitoring is a requirement for larger systems (over 50 kW) but not a mandatory control for all HVAC systems. Zone controls, weather compensation, and timed setback are all required."
  },
  {
    id: 5,
    question: "What is the maximum specific fan power (SFP) for a supply and extract ventilation system in a new non-domestic building?",
    options: [
      "1.6 W/(l/s)",
      "1.8 W/(l/s)",
      "2.0 W/(l/s)",
      "2.2 W/(l/s)"
    ],
    correctAnswer: 1,
    explanation: "The maximum SFP for supply and extract mechanical ventilation systems is 1.8 W/(l/s). This limit ensures energy-efficient fan selection and ductwork design."
  },
  {
    id: 6,
    question: "When must commissioning be completed and certified under Part L?",
    options: [
      "Within 30 days of practical completion",
      "Before the building is occupied",
      "Within 6 months of handover",
      "Before the EPC is issued"
    ],
    correctAnswer: 1,
    explanation: "Part L requires commissioning to be completed before the building is occupied or the fixed building services are used. A commissioning certificate must be provided to the building control body."
  },
  {
    id: 7,
    question: "What EER (Energy Efficiency Ratio) must a new comfort cooling system achieve under Part L?",
    options: [
      "2.5 minimum",
      "2.8 minimum",
      "3.0 minimum",
      "Depends on system type and capacity"
    ],
    correctAnswer: 3,
    explanation: "Part L specifies different minimum EER values depending on the cooling system type (split, multi-split, VRF) and capacity. Values range from 2.5 to 3.3 depending on classification."
  },
  {
    id: 8,
    question: "What proportion of heated floor area must have individual room temperature controls?",
    options: [
      "All heated spaces",
      "At least 80%",
      "At least 90%",
      "Only spaces over 50 m²"
    ],
    correctAnswer: 0,
    explanation: "Part L requires all heated spaces to have individual room temperature controls (typically TRVs or room thermostats). The only exception is spaces where control would be impractical."
  },
  {
    id: 9,
    question: "What documentation must be provided to demonstrate Part L building services compliance?",
    options: [
      "Equipment specifications only",
      "Commissioning certificate only",
      "Building log book including commissioning records and operating instructions",
      "EPC certificate only"
    ],
    correctAnswer: 2,
    explanation: "Part L requires a building log book containing commissioning records, as-built drawings, operating and maintenance instructions, and energy consumption monitoring guidance."
  },
  {
    id: 10,
    question: "What minimum heat recovery efficiency is required for mechanical ventilation systems with heat recovery?",
    options: [
      "60%",
      "70%",
      "73%",
      "80%"
    ],
    correctAnswer: 2,
    explanation: "MVHR systems must achieve a minimum dry heat recovery efficiency of 73% under Part L. This ensures effective energy recovery from extract air to incoming supply air."
  },
  {
    id: 11,
    question: "At what lighting capacity must automatic controls be provided in non-domestic buildings?",
    options: [
      "All lighting installations",
      "Over 100 W installed capacity per room",
      "Over 250 W installed capacity per room",
      "Only in circulation spaces"
    ],
    correctAnswer: 0,
    explanation: "Part L requires automatic controls (occupancy detection, daylight dimming, or time scheduling) for all general lighting in non-domestic buildings, regardless of capacity."
  },
  {
    id: 12,
    question: "What is the maximum chiller COP for water-cooled systems with capacity over 750 kW?",
    options: [
      "4.5",
      "5.0",
      "5.5",
      "6.0"
    ],
    correctAnswer: 2,
    explanation: "Large water-cooled chillers (over 750 kW) must achieve a minimum full-load COP of 5.5. Smaller systems have proportionally lower requirements based on capacity."
  }
];

const faqs = [
  {
    question: "How do I demonstrate Part L compliance for a mixed-use building?",
    answer: "Mixed-use buildings require compliance assessment for each use type separately. Domestic portions follow Approved Document L Volume 1 (dwellings), while non-domestic areas follow Volume 2. Each building services system serving multiple uses must meet the requirements for all use types it serves. The commissioning certificate should clearly identify compliance for each area."
  },
  {
    question: "What happens if equipment cannot meet the minimum efficiency requirements?",
    answer: "If specific equipment cannot meet minimum efficiency targets, compensatory measures may be acceptable through the Notional Building methodology. This requires demonstrating that overall CO2 emissions are no greater than a compliant building. This approach requires SAP or SBEM calculations and agreement with building control before installation."
  },
  {
    question: "Are there exemptions for heritage buildings from Part L building services requirements?",
    answer: "Listed buildings and those in conservation areas may be exempt from requirements that would unacceptably alter their character or appearance. However, the exemption only applies where compliance would be impractical - not merely inconvenient. Building services improvements that do not affect historic fabric must still comply fully."
  },
  {
    question: "How often must sub-meters be read and data recorded?",
    answer: "Part L does not mandate specific reading frequencies, but recommends automatic meter reading (AMR) with at least half-hourly data collection for systems over 100 kW. For smaller systems (50-100 kW), monthly manual readings are considered adequate. Building log books should record consumption data and include targets for comparison."
  },
  {
    question: "What qualifications are required for commissioning engineers?",
    answer: "Part L requires commissioning to be carried out by competent persons. For most systems, this means engineers with relevant qualifications (e.g., BSRIA certification, manufacturer training) and demonstrated experience. Complex systems may require specialists. The commissioning certificate must confirm the competence of those carrying out the work."
  },
  {
    question: "Can existing systems be retained when extending a building?",
    answer: "Existing systems serving only existing areas can be retained unchanged. However, if extended to serve new areas, they may need upgrading to meet current standards. Any new equipment must fully comply with Part L. Where existing plant capacity is increased by more than 25%, the whole system may require review."
  }
];

const HNCModule6Section1_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6.1.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Building Services Compliance
          </h1>
          <p className="text-white/80">
            Minimum efficiencies, controls requirements, metering, lighting and HVAC system specifications under Part L
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Boilers:</strong> Minimum 92% ErP seasonal efficiency</li>
              <li className="pl-1"><strong>Heat pumps:</strong> ASHP 2.8 SCOP, GSHP 3.0 SCOP minimum</li>
              <li className="pl-1"><strong>Lighting:</strong> 80 lm/W general, 60 lm/W display</li>
              <li className="pl-1"><strong>Metering:</strong> Required above 50 kW system output</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Controls Requirements</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Zones:</strong> Areas over 150 m² need separate control</li>
              <li className="pl-1"><strong>TRVs:</strong> All heated spaces require individual control</li>
              <li className="pl-1"><strong>Lighting:</strong> Automatic control mandatory</li>
              <li className="pl-1"><strong>Commissioning:</strong> Before occupation, certified</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply minimum boiler and heat pump efficiency requirements",
              "Specify lighting systems meeting Part L efficacy standards",
              "Design HVAC systems with compliant controls and SFP values",
              "Implement metering strategies for energy monitoring",
              "Plan commissioning to achieve Part L certification",
              "Produce building log book documentation requirements"
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

        {/* Section 1: Heating System Efficiencies */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Heating System Efficiencies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Part L 2021 sets stringent minimum efficiency requirements for heating systems to reduce
              carbon emissions from buildings. These requirements apply to new installations and
              replacement systems in both domestic and non-domestic buildings.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Boiler Efficiency Requirements:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Gas boilers:</strong> Minimum 92% ErP seasonal efficiency</li>
                <li className="pl-1"><strong>Oil boilers:</strong> Minimum 92% ErP seasonal efficiency</li>
                <li className="pl-1"><strong>LPG boilers:</strong> Minimum 92% ErP seasonal efficiency</li>
                <li className="pl-1"><strong>Biomass boilers:</strong> Minimum 88% efficiency (domestic), 89% (non-domestic)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Heat Pump Performance Standards</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Heat Pump Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Minimum SCOP</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Flow Temperature Basis</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Air Source Heat Pump (ASHP)</td>
                      <td className="border border-white/10 px-3 py-2">2.8</td>
                      <td className="border border-white/10 px-3 py-2">55°C design flow</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ground Source Heat Pump (GSHP)</td>
                      <td className="border border-white/10 px-3 py-2">3.0</td>
                      <td className="border border-white/10 px-3 py-2">55°C design flow</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Water Source Heat Pump (WSHP)</td>
                      <td className="border border-white/10 px-3 py-2">3.0</td>
                      <td className="border border-white/10 px-3 py-2">55°C design flow</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Exhaust Air Heat Pump</td>
                      <td className="border border-white/10 px-3 py-2">2.5</td>
                      <td className="border border-white/10 px-3 py-2">55°C design flow</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Understanding SCOP</p>
              <p className="text-sm text-white">
                SCOP (Seasonal Coefficient of Performance) measures the ratio of heat output to electrical
                input over a typical heating season. A SCOP of 2.8 means the heat pump delivers 2.8 kW of
                heat for every 1 kW of electricity consumed. Higher SCOP values indicate better efficiency.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design consideration:</strong> Heat pump efficiency is highly dependent on flow temperature. Design for the lowest practical flow temperature to maximise SCOP.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Lighting Efficacy and Controls */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Lighting Efficacy and Controls
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Part L sets minimum luminaire efficacy requirements and mandates automatic controls
              for lighting in non-domestic buildings. These requirements significantly reduce energy
              consumption from lighting, which typically represents 20-40% of building energy use.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">General Lighting</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Minimum 80 lm/W efficacy</li>
                  <li className="pl-1">Automatic presence detection</li>
                  <li className="pl-1">Daylight dimming required</li>
                  <li className="pl-1">Timed switching zones</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Display Lighting</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Minimum 60 lm/W efficacy</li>
                  <li className="pl-1">Manual switching acceptable</li>
                  <li className="pl-1">Time control for retail</li>
                  <li className="pl-1">Separate metering advised</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Emergency Lighting</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Exempt from efficacy limits</li>
                  <li className="pl-1">LED preferred for efficiency</li>
                  <li className="pl-1">Self-test systems reduce energy</li>
                  <li className="pl-1">Central battery more efficient</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mandatory Lighting Controls</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Space Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Required Controls</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Additional Requirements</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Offices</td>
                      <td className="border border-white/10 px-3 py-2">Presence/absence, daylight dimming</td>
                      <td className="border border-white/10 px-3 py-2">Zone control per 6 m window depth</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Circulation areas</td>
                      <td className="border border-white/10 px-3 py-2">Presence detection, time scheduling</td>
                      <td className="border border-white/10 px-3 py-2">Maintained illuminance when unoccupied</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Toilets/ancillary</td>
                      <td className="border border-white/10 px-3 py-2">Absence detection</td>
                      <td className="border border-white/10 px-3 py-2">Auto-off after vacancy</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Retail</td>
                      <td className="border border-white/10 px-3 py-2">Time scheduling, zone control</td>
                      <td className="border border-white/10 px-3 py-2">Separate display lighting circuits</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">External lighting</td>
                      <td className="border border-white/10 px-3 py-2">Daylight sensing, time control</td>
                      <td className="border border-white/10 px-3 py-2">Dimming for overnight period</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Specify absence detection (manual on, auto off) rather than presence detection for maximum energy savings - occupants switch on only when needed.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: HVAC System Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            HVAC System Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Part L specifies detailed requirements for HVAC systems covering cooling equipment efficiency,
              ventilation system fan power, heat recovery effectiveness, and comprehensive controls.
              These requirements ensure building services systems operate at optimum efficiency.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Specific Fan Power (SFP) Limits</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white/60">Extract only:</span> <span className="text-white">0.5 W/(l/s)</span></p>
                <p><span className="text-white/60">Supply only:</span> <span className="text-white">1.1 W/(l/s)</span></p>
                <p><span className="text-white/60">Supply and extract:</span> <span className="text-white">1.8 W/(l/s)</span></p>
                <p><span className="text-white/60">With heating/cooling:</span> <span className="text-white">2.0 W/(l/s)</span></p>
                <p><span className="text-white/60">All air units:</span> <span className="text-white">2.2 W/(l/s)</span></p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cooling System Efficiency (Minimum EER/SEER)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Split systems &lt;12 kW:</strong> SEER 5.1 minimum</li>
                <li className="pl-1"><strong>Split systems 12-40 kW:</strong> SEER 4.6 minimum</li>
                <li className="pl-1"><strong>Multi-split systems:</strong> SEER 4.4 minimum</li>
                <li className="pl-1"><strong>VRF systems:</strong> SEER 5.0 minimum</li>
                <li className="pl-1"><strong>Air-cooled chillers &lt;400 kW:</strong> EER 2.8 minimum</li>
                <li className="pl-1"><strong>Water-cooled chillers &gt;750 kW:</strong> COP 5.5 minimum</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">HVAC Controls Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Required Controls</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Additional Features</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Wet heating systems</td>
                      <td className="border border-white/10 px-3 py-2">Weather compensation, room stat, TRVs</td>
                      <td className="border border-white/10 px-3 py-2">Optimum start/stop, night setback</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Warm air heating</td>
                      <td className="border border-white/10 px-3 py-2">Room thermostat, time control</td>
                      <td className="border border-white/10 px-3 py-2">Zone dampers for areas &gt;150 m²</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cooling systems</td>
                      <td className="border border-white/10 px-3 py-2">Zone control, time scheduling</td>
                      <td className="border border-white/10 px-3 py-2">Interlock with heating, free cooling</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ventilation</td>
                      <td className="border border-white/10 px-3 py-2">Variable speed drives, CO₂ control</td>
                      <td className="border border-white/10 px-3 py-2">Heat recovery bypass for summer</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Heat recovery</td>
                      <td className="border border-white/10 px-3 py-2">Minimum 73% efficiency, bypass</td>
                      <td className="border border-white/10 px-3 py-2">Frost protection, summer bypass</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Integration tip:</strong> Heating and cooling systems must be interlocked to prevent simultaneous operation - this is a mandatory Part L requirement.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Metering and Commissioning */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Metering and Commissioning
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Part L requires comprehensive metering to enable energy monitoring and management,
              plus detailed commissioning to ensure systems operate at design efficiency.
              Both requirements are essential for achieving real-world energy performance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Metering Requirements</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Systems &gt;50 kW Output</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Individual sub-metering required</li>
                    <li>Heating plant fuel consumption</li>
                    <li>Cooling system electricity</li>
                    <li>Humidification energy</li>
                    <li>Fans and pumps auxiliary</li>
                    <li>Lighting circuits</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Systems &gt;100 kW Output</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>All above requirements</li>
                    <li>Automatic meter reading (AMR)</li>
                    <li>Half-hourly data collection</li>
                    <li>BMS integration recommended</li>
                    <li>Tenant sub-metering</li>
                    <li>Data logging capability</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Commissioning Activities</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Documentation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Heating</td>
                      <td className="border border-white/10 px-3 py-2">Flow rates, temperatures, control response</td>
                      <td className="border border-white/10 px-3 py-2">BSRIA BG 2 commissioning records</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cooling</td>
                      <td className="border border-white/10 px-3 py-2">Capacity verification, EER measurement</td>
                      <td className="border border-white/10 px-3 py-2">Manufacturer commissioning sheets</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ventilation</td>
                      <td className="border border-white/10 px-3 py-2">Air flow rates, SFP measurement</td>
                      <td className="border border-white/10 px-3 py-2">CIBSE TM50 testing records</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lighting</td>
                      <td className="border border-white/10 px-3 py-2">Lux levels, control function testing</td>
                      <td className="border border-white/10 px-3 py-2">SLL commissioning sheets</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BMS/Controls</td>
                      <td className="border border-white/10 px-3 py-2">Setpoints, sequences, alarms</td>
                      <td className="border border-white/10 px-3 py-2">Point-to-point testing schedules</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Log Book Requirements</p>
              <div className="text-sm space-y-2">
                <p><strong>Part L requires a building log book containing:</strong></p>
                <ul className="text-sm text-white/80 space-y-1 ml-5 list-disc list-outside">
                  <li>As-built drawings and equipment schedules</li>
                  <li>Commissioning records and test certificates</li>
                  <li>Operating and maintenance instructions</li>
                  <li>Equipment manufacturer data</li>
                  <li>Design conditions and control setpoints</li>
                  <li>Energy consumption targets and monitoring guidance</li>
                  <li>Health and safety information (CDM requirements)</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Timing requirement:</strong> Commissioning must be complete before the building is occupied or any fixed building services are used. The commissioning certificate must be provided to building control.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Heat Pump Specification Check</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Verify if a proposed air source heat pump meets Part L requirements.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Proposed ASHP specification:</p>
                <p className="ml-4">Heating capacity: 45 kW at A7/W35</p>
                <p className="ml-4">SCOP (at 55°C flow): 2.9</p>
                <p className="ml-4">Design flow temperature: 55°C</p>
                <p className="mt-2 text-white/60">Part L requirement check:</p>
                <p className="ml-4">Minimum ASHP SCOP: 2.8</p>
                <p className="ml-4">Proposed SCOP: 2.9</p>
                <p className="mt-2 text-green-400">Result: COMPLIANT - SCOP exceeds minimum requirement</p>
                <p className="mt-2 text-white/60">Note: If design flow temp reduced to 45°C,</p>
                <p className="text-white/60">SCOP would improve to approximately 3.4</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Lighting Efficacy Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate whether a lighting scheme meets Part L requirements.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Office lighting scheme:</p>
                <p className="ml-4">Luminaire type: LED panel</p>
                <p className="ml-4">Light output: 4,000 lumens</p>
                <p className="ml-4">Power consumption: 36 W</p>
                <p className="mt-2">Efficacy calculation:</p>
                <p className="ml-4">Efficacy = Lumens ÷ Watts</p>
                <p className="ml-4">Efficacy = 4,000 ÷ 36</p>
                <p className="ml-4">Efficacy = 111 lm/W</p>
                <p className="mt-2">Part L requirement: 80 lm/W minimum</p>
                <p className="text-green-400">Result: COMPLIANT - exceeds requirement by 39%</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Ventilation SFP Verification</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Verify SFP for a supply and extract system with measured data.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Commissioning measurements:</p>
                <p className="ml-4">Supply fan power: 2.2 kW</p>
                <p className="ml-4">Supply air flow: 2,000 l/s</p>
                <p className="ml-4">Extract fan power: 1.8 kW</p>
                <p className="ml-4">Extract air flow: 1,900 l/s</p>
                <p className="mt-2">SFP calculation:</p>
                <p className="ml-4">Total fan power = 2.2 + 1.8 = 4.0 kW</p>
                <p className="ml-4">Design flow (higher of supply/extract) = 2,000 l/s</p>
                <p className="ml-4">SFP = 4,000 W ÷ 2,000 l/s = 2.0 W/(l/s)</p>
                <p className="mt-2">Part L limit for S&E: 1.8 W/(l/s)</p>
                <p className="text-red-400">Result: NON-COMPLIANT - exceeds limit by 11%</p>
                <p className="mt-2 text-white/60">Action: Review ductwork pressure drop,</p>
                <p className="text-white/60">consider larger ductwork or more efficient fans</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Part L Compliance Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Verify all heating equipment meets minimum efficiency (92% boilers, SCOP 2.8/3.0 heat pumps)</li>
                <li className="pl-1">Check lighting efficacy (80 lm/W general, 60 lm/W display) and specify automatic controls</li>
                <li className="pl-1">Calculate SFP for ventilation systems and verify compliance with limits</li>
                <li className="pl-1">Specify metering for systems over 50 kW, AMR for over 100 kW</li>
                <li className="pl-1">Plan commissioning activities and documentation from design stage</li>
                <li className="pl-1">Prepare building log book template for handover documentation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Efficiency Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Boiler efficiency: <strong>92% ErP minimum</strong></li>
                <li className="pl-1">ASHP SCOP: <strong>2.8 minimum</strong>, GSHP SCOP: <strong>3.0 minimum</strong></li>
                <li className="pl-1">General lighting: <strong>80 lm/W minimum</strong></li>
                <li className="pl-1">MVHR efficiency: <strong>73% minimum</strong></li>
                <li className="pl-1">Metering threshold: <strong>50 kW system output</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Compliance Issues</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Heat pump flow temperatures:</strong> Designing for high flow temps reduces SCOP below compliance</li>
                <li className="pl-1"><strong>Ductwork resistance:</strong> Poor ductwork design causes SFP failures at commissioning</li>
                <li className="pl-1"><strong>Lighting controls:</strong> Omitting daylight dimming or presence detection</li>
                <li className="pl-1"><strong>Documentation gaps:</strong> Incomplete commissioning records at handover</li>
              </ul>
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

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Heating Efficiency</p>
                <ul className="space-y-0.5">
                  <li>Gas/oil boilers: 92% ErP</li>
                  <li>ASHP: SCOP 2.8 at 55°C</li>
                  <li>GSHP: SCOP 3.0 at 55°C</li>
                  <li>Biomass: 88-89% efficiency</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Lighting & Ventilation</p>
                <ul className="space-y-0.5">
                  <li>General lighting: 80 lm/W</li>
                  <li>Display lighting: 60 lm/W</li>
                  <li>S&E ventilation: 1.8 W/(l/s)</li>
                  <li>MVHR: 73% recovery</li>
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
            <Link to="../h-n-c-module6-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section1-6">
              Next: Renewable Energy Integration
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule6Section1_5;
